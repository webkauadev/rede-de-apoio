import "server-only";
import { createHash, randomBytes } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { database, withTransaction, type SqlExecutor } from "@/server/db";
import { readSessionToken, SESSION_SECONDS } from "./session-config";
export type AccessCategory = "CUIDADOR" | "PESSOA_IDOSA";
export interface Identity {
  userId: string;
  category: AccessCategory;
}
export interface Account extends RowDataPacket {
  usuario_id: string;
  tipo_acesso: AccessCategory;
  senha_hash: string | null;
  ativo: number | string;
}
export const secretHash = (value: string) =>
  createHash("sha256").update(value).digest("hex");
export const newSessionToken = () => randomBytes(32).toString("base64url");
export class AuthenticationDeniedError extends Error {
  constructor() {
    super("E-mail ou senha inválidos.");
  }
}
export class AccessDeniedError extends Error {
  constructor() {
    super("Acesso não autorizado.");
  }
}
export async function auditAuthentication(
  sql: SqlExecutor,
  operation: "LOGIN" | "LOGOUT" | "ACESSO_IDENTIDADE" | "ACESSO_CUIDADO",
  permitted: boolean,
  identity?: Identity,
) {
  await sql.execute(
    "INSERT INTO auditoria (ator_usuario_id, operacao, recurso_tipo, categoria_snapshot, resultado, detalhe_sanitizado) VALUES (?, ?, 'sessao_usuario', ?, ?, ?)",
    [
      identity?.userId ?? null,
      operation,
      identity?.category ?? null,
      permitted ? "PERMITIDO" : "NEGADO",
      permitted ? null : "Autenticacao ou autorizacao negada",
    ],
  );
}
export async function auditDenied(
  operation: "LOGIN" | "LOGOUT" | "ACESSO_IDENTIDADE" | "ACESSO_CUIDADO",
  identity?: Identity,
) {
  // Transacao independente: falha de auditoria impede resposta de sucesso/acesso.
  await withTransaction((sql) =>
    auditAuthentication(sql, operation, false, identity),
  );
}
export async function persistSession(
  sql: SqlExecutor,
  account: Account,
  token: string,
  previousToken: string | null,
) {
  const rows = await sql.select<Account>(
    "SELECT usuario_id, tipo_acesso, senha_hash, ativo FROM usuario WHERE usuario_id = ? FOR UPDATE",
    [account.usuario_id],
  );
  const current = rows[0];
  if (
    !current ||
    Number(current.ativo) !== 1 ||
    current.senha_hash !== account.senha_hash ||
    current.tipo_acesso !== account.tipo_acesso
  )
    throw new AuthenticationDeniedError();
  if (previousToken)
    await sql.execute(
      "UPDATE sessao_usuario SET revogado_em = UTC_TIMESTAMP(6) WHERE token_hash = ? AND usuario_id = ? AND revogado_em IS NULL",
      [secretHash(previousToken), account.usuario_id],
    );
  await sql.execute(
    "INSERT INTO sessao_usuario (token_hash, usuario_id, credencial_hash, criado_em, expira_em) VALUES (?, ?, ?, UTC_TIMESTAMP(6), TIMESTAMPADD(SECOND, ?, UTC_TIMESTAMP(6)))",
    [
      secretHash(token),
      account.usuario_id,
      secretHash(account.senha_hash!),
      SESSION_SECONDS,
    ],
  );
  await auditAuthentication(sql, "LOGIN", true, {
    userId: account.usuario_id,
    category: account.tipo_acesso,
  });
}
interface SessionRow extends RowDataPacket {
  usuario_id: string;
  tipo_acesso: AccessCategory;
}
export async function resolveIdentity(
  token: string | null,
  sql: SqlExecutor = database,
): Promise<Identity | null> {
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) return null;
  const rows = await sql.select<SessionRow>(
    "SELECT u.usuario_id, u.tipo_acesso FROM sessao_usuario s JOIN usuario u ON u.usuario_id = s.usuario_id WHERE s.token_hash = ? AND s.revogado_em IS NULL AND s.expira_em > UTC_TIMESTAMP(6) AND u.ativo = TRUE AND u.senha_hash IS NOT NULL AND s.credencial_hash = SHA2(u.senha_hash, 256)",
    [secretHash(token)],
  );
  const row = rows[0];
  if (!row || !["CUIDADOR", "PESSOA_IDOSA"].includes(row.tipo_acesso))
    return null;
  return { userId: String(row.usuario_id), category: row.tipo_acesso };
}
export interface GuardDependencies {
  resolve: typeof resolveIdentity;
  deny: typeof auditDenied;
}
export const guardDependencies: GuardDependencies = {
  resolve: resolveIdentity,
  deny: auditDenied,
};
/** Identidade nao concede permissao de dominio. Revalidar a cada chamada; sem cache. */
export async function requireIdentity(
  cookieHeader: string | null,
  dependencies = guardDependencies,
) {
  const identity = await dependencies.resolve(readSessionToken(cookieHeader));
  if (!identity) {
    await dependencies.deny("ACESSO_IDENTIDADE");
    throw new AccessDeniedError();
  }
  return identity;
}
/** Care routes remain closed until resource/context authorization is implemented by their US. */
export async function denyCareAccess(
  cookieHeader: string | null,
  dependencies = guardDependencies,
): Promise<never> {
  const identity = await requireIdentity(cookieHeader, dependencies);
  await dependencies.deny("ACESSO_CUIDADO", identity);
  throw new AccessDeniedError();
}
export async function logout(token: string | null) {
  await withTransaction(async (sql) => {
    // Revogacao idempotente: nao duplica o evento de efeito em repeticao/COMMIT incerto.
    if (!token) return;
    const rows = await sql.select<SessionRow>(
      "SELECT u.usuario_id, u.tipo_acesso FROM sessao_usuario s JOIN usuario u ON u.usuario_id = s.usuario_id WHERE s.token_hash = ?",
      [secretHash(token)],
    );
    // Mesma ordem de locks do login: usuario antes da sessao.
    if (rows[0])
      await sql.select<Account>(
        "SELECT usuario_id FROM usuario WHERE usuario_id = ? FOR UPDATE",
        [String(rows[0].usuario_id)],
      );
    const revoked = await sql.execute(
      "UPDATE sessao_usuario SET revogado_em = UTC_TIMESTAMP(6) WHERE token_hash = ? AND revogado_em IS NULL",
      [secretHash(token)],
    );
    if (revoked.affectedRows === 1) {
      const row = rows[0];
      await auditAuthentication(
        sql,
        "LOGOUT",
        true,
        row
          ? { userId: String(row.usuario_id), category: row.tipo_acesso }
          : undefined,
      );
    }
  });
}
