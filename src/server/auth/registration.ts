import "server-only";
import { registrationSchema } from "@/domains/auth/registration/schema";
import {
  database,
  DatabaseConflictError,
  TransactionOutcomeUnknownError,
  withTransaction,
  type SqlExecutor,
} from "@/server/db";
import { hashPassword } from "./password";
import {
  BOOTSTRAP_LOCK,
  consumeInvitation,
  invitationPreflight,
  InvitationRejectedError,
  reconcileRegistration,
  requireInvitation,
  tokenHash,
  writeRegistrationAudit,
} from "./invitations";
import { limitRegistrationAttempts } from "@/server/security/registration-rate-limit";

export class RegistrationConflictError extends InvitationRejectedError {}
export interface AccountRepository {
  create(account: {
    name: string;
    email: string;
    passwordHash: string;
  }): Promise<void>;
}
export function accountRepository(sql: SqlExecutor): AccountRepository {
  return {
    async create(account) {
      try {
        await sql.execute(
          "INSERT INTO usuario (nome, email_normalizado, senha_hash, tipo_acesso) VALUES (?, ?, ?, 'CUIDADOR')",
          [account.name, account.email, account.passwordHash],
        );
      } catch (error) {
        if (error instanceof DatabaseConflictError)
          throw new RegistrationConflictError();
        throw error;
      }
    },
  };
}
export interface RegistrationDependencies {
  limitAttempts: (hash: string) => Promise<void>;
  preflight: (hash: string, email: string) => Promise<unknown>;
  hashPassword: (password: string) => Promise<string>;
  transaction: (
    operation: (sql: SqlExecutor) => Promise<void>,
  ) => Promise<void>;
  reconcile: (
    hash: string,
    email: string,
    passwordHash: string,
  ) => Promise<boolean>;
  auditDenied: () => Promise<void>;
}
export const registrationDependencies: RegistrationDependencies = {
  limitAttempts: limitRegistrationAttempts,
  preflight: invitationPreflight,
  hashPassword,
  transaction: (operation) => withTransaction(operation, BOOTSTRAP_LOCK),
  reconcile: (hash, email, passwordHash) =>
    reconcileRegistration(database, hash, email, passwordHash),
  auditDenied: () => writeRegistrationAudit(database, "NEGADO"),
};
export async function registerAccount(
  input: unknown,
  dependencies = registrationDependencies,
): Promise<void> {
  const account = registrationSchema.parse(input);
  const hash = tokenHash(account.invitationToken);
  // Limitador separado: tentativas permanecem contadas mesmo com rollback de negocio.
  await dependencies.limitAttempts(hash);
  let passwordHash: string | undefined;
  try {
    await dependencies.preflight(hash, account.email);
    passwordHash = await dependencies.hashPassword(account.password);
    const encoded = passwordHash;
    await dependencies.transaction(async (sql) => {
      const invite = await requireInvitation(sql, hash, account.email, true);
      await accountRepository(sql).create({
        name: account.name,
        email: account.email,
        passwordHash: encoded,
      });
      await consumeInvitation(sql, invite.convite_id);
      await writeRegistrationAudit(sql, "PERMITIDO", account.email);
    });
  } catch (error) {
    if (error instanceof TransactionOutcomeUnknownError && passwordHash) {
      if (await dependencies.reconcile(hash, account.email, passwordHash))
        return;
      throw error; // Nao repetir INSERT nem relatar sucesso sem confirmar o efeito desta operacao.
    }
    if (error instanceof InvitationRejectedError)
      await dependencies.auditDenied();
    throw error;
  }
}
