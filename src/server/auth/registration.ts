import "server-only";
import {
  registrationSchema,
  type RegistrationInput,
} from "@/domains/auth/registration/schema";
import {
  DatabaseConflictError,
  withTransaction,
  type SqlExecutor,
} from "@/server/db";
import { hashPassword } from "./password";

export class RegistrationAuthorizationPendingError extends Error {
  constructor() {
    super(
      "Cadastro temporariamente indisponível. A autorização para criar contas está em definição.",
    );
  }
}
export class RegistrationConflictError extends Error {
  constructor() {
    super("Não foi possível criar a conta com os dados informados.");
  }
}
export interface AccountRepository {
  create(account: {
    name: string;
    email: string;
    passwordHash: string;
  }): Promise<void>;
}
/** Apenas usuario. Nenhum vínculo, papel, rede, sessão ou acesso clínico é criado. */
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
  /** Decisão exclusivamente do servidor, nunca um campo do DTO ou flag pública. */
  authorize: (email: string) => Promise<void>;
  hashPassword: (password: string) => Promise<string>;
  accounts: AccountRepository;
}
export async function registerAccount(
  input: unknown,
  dependencies: RegistrationDependencies,
): Promise<void> {
  const account: RegistrationInput = registrationSchema.parse(input);
  await dependencies.authorize(account.email);
  const passwordHash = await dependencies.hashPassword(account.password);
  await dependencies.accounts.create({
    name: account.name,
    email: account.email,
    passwordHash,
  });
}
/** BLOCKED_BY_DECISION: RF01/US-001 dizem autorizado sem definir como comprovar. */
export async function authorizeRegistration(): Promise<never> {
  throw new RegistrationAuthorizationPendingError();
}
export const registrationDependencies: RegistrationDependencies = {
  authorize: authorizeRegistration,
  hashPassword,
  accounts: {
    create: (account) =>
      withTransaction((sql) => accountRepository(sql).create(account)),
  },
};
