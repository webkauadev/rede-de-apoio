import "server-only";
import { verify } from "argon2";
import { randomBytes } from "node:crypto";
import { loginSchema } from "@/domains/auth/login/schema";
import { database, withTransaction } from "@/server/db";
import { hashPassword } from "./password";
import {
  auditDenied,
  AuthenticationDeniedError,
  newSessionToken,
  persistSession,
  type Account,
} from "./sessions";
import { limitLoginAttempts } from "@/server/security/login-rate-limit";
let dummy: Promise<string> | undefined;
export async function verifyLoginPassword(
  encoded: string | null,
  password: string,
) {
  // Uma verificacao Argon2id tambem para ausentes/inativas/nao ativadas. Dummy nao e conta/sessao.
  const validHash = encoded?.startsWith("$argon2id$");
  const target = validHash
    ? encoded!
    : await (dummy ??= hashPassword(randomBytes(32).toString("base64url")));
  try {
    return (await verify(target, password)) && !!validHash;
  } catch {
    if (validHash)
      await verify(
        await (dummy ??= hashPassword(randomBytes(32).toString("base64url"))),
        password,
      );
    return false;
  }
}
export interface LoginDependencies {
  limit: typeof limitLoginAttempts;
  find: (email: string) => Promise<Account | null>;
  verify: typeof verifyLoginPassword;
  persist: (
    account: Account,
    token: string,
    previousToken: string | null,
  ) => Promise<void>;
  deny: typeof auditDenied;
}
export const loginDependencies: LoginDependencies = {
  limit: limitLoginAttempts,
  find: async (email) =>
    (
      await database.select<Account>(
        "SELECT usuario_id, tipo_acesso, senha_hash, ativo FROM usuario WHERE email_normalizado = ? AND ativo = TRUE AND senha_hash IS NOT NULL",
        [email],
      )
    )[0] ?? null,
  verify: verifyLoginPassword,
  persist: (account, token, previous) =>
    withTransaction((sql) => persistSession(sql, account, token, previous)),
  deny: auditDenied,
};
export async function loginAccount(
  input: unknown,
  previousToken: string | null,
  dependencies = loginDependencies,
) {
  const { email, password } = loginSchema.parse(input);
  try {
    await dependencies.limit(email);
    const account = await dependencies.find(email);
    const eligible =
      account &&
      Number(account.ativo) === 1 &&
      !!account.senha_hash &&
      ["CUIDADOR", "PESSOA_IDOSA"].includes(account.tipo_acesso);
    const verified = await dependencies.verify(
      eligible ? account.senha_hash : null,
      password,
    );
    if (!eligible || !verified) throw new AuthenticationDeniedError();
    const token = newSessionToken();
    await dependencies.persist(account, token, previousToken);
    return token; // Somente servidor/Set-Cookie. Nunca JSON.
  } catch (error) {
    await dependencies.deny("LOGIN");
    throw error; // Sem retry: COMMIT ambiguo nunca entrega cookie sem confirmacao.
  }
}
