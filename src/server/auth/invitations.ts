import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { registrationSchema } from "@/domains/auth/registration/schema";
import type { RowDataPacket } from "mysql2/promise";
import { database, withTransaction, type SqlExecutor } from "@/server/db";

export const BOOTSTRAP_LOCK = "rede-apoio:cadastro-bootstrap:v1";
export class InvitationRejectedError extends Error {
  constructor() {
    super("Não foi possível cadastrar com o convite e os dados informados.");
  }
}
export class InvitationUsedError extends InvitationRejectedError {}
export function tokenHash(token: string): string {
  return createHash("sha256").update(token, "utf8").digest("hex");
}
export function createInvitationToken(): string {
  return randomBytes(32).toString("base64url");
}
interface Invitation extends RowDataPacket {
  convite_id: string;
  email_normalizado: string;
  usado_em: string | null;
  revogado_em: string | null;
  vigente: number | string;
}
export async function requireInvitation(
  sql: SqlExecutor,
  hash: string,
  email: string,
  lock = false,
): Promise<Invitation> {
  const rows = await sql.select<Invitation>(
    `SELECT convite_id, email_normalizado, usado_em, revogado_em, (expira_em > UTC_TIMESTAMP(6)) AS vigente FROM convite_cadastro_cuidador WHERE token_hash = ?${lock ? " FOR UPDATE" : ""}`,
    [hash],
  );
  const invite = rows[0];
  if (
    !invite ||
    invite.email_normalizado !== email ||
    invite.revogado_em ||
    Number(invite.vigente) !== 1
  )
    throw new InvitationRejectedError();
  if (invite.usado_em) throw new InvitationUsedError();
  return invite;
}
export async function consumeInvitation(
  sql: SqlExecutor,
  id: string,
): Promise<void> {
  const result = await sql.execute(
    "UPDATE convite_cadastro_cuidador SET usado_em = UTC_TIMESTAMP(6) WHERE convite_id = ? AND usado_em IS NULL AND revogado_em IS NULL AND expira_em > UTC_TIMESTAMP(6)",
    [id],
  );
  if (result.affectedRows !== 1) throw new InvitationRejectedError();
}
/** Reconciliacao somente leitura; o hash aleatorio desta operacao identifica seu efeito. */
export async function reconcileRegistration(
  sql: SqlExecutor,
  hash: string,
  email: string,
  passwordHash: string,
): Promise<boolean> {
  const rows = await sql.select<RowDataPacket>(
    "SELECT u.email_normalizado, u.senha_hash FROM convite_cadastro_cuidador c JOIN usuario u ON u.email_normalizado = c.email_normalizado WHERE c.token_hash = ? AND c.usado_em IS NOT NULL AND c.revogado_em IS NULL AND u.tipo_acesso = 'CUIDADOR'",
    [hash],
  );
  return (
    rows.length === 1 &&
    rows[0].email_normalizado === email &&
    rows[0].senha_hash === passwordHash
  );
}
export async function writeRegistrationAudit(
  sql: SqlExecutor,
  result: "PERMITIDO" | "NEGADO",
  email?: string,
) {
  if (result === "PERMITIDO") {
    await sql.execute(
      "INSERT INTO auditoria (ator_usuario_id, operacao, recurso_tipo, categoria_snapshot, resultado) SELECT usuario_id, 'CADASTRO_CONTA', 'usuario', 'CUIDADOR', 'PERMITIDO' FROM usuario WHERE email_normalizado = ?",
      [email!],
    );
  } else {
    await sql.execute(
      "INSERT INTO auditoria (operacao, recurso_tipo, resultado, detalhe_sanitizado) VALUES ('CADASTRO_CONTA', 'usuario', 'NEGADO', 'Convite ou dados indisponiveis')",
      [],
    );
  }
}
/** Operador local autenticado pelo SO/credenciais; nenhum emissor HTTP nesta US. */
export async function issueBootstrapInvitation(
  email: string,
  revokePrevious = false,
  hours = 24,
): Promise<string> {
  if (!Number.isInteger(hours) || hours < 1 || hours > 168)
    throw new Error("Validade operacional inválida.");
  email = registrationSchema.shape.email.parse(email);
  const token = createInvitationToken();
  await withTransaction(async (sql) => {
    const users = await sql.select<RowDataPacket>(
      "SELECT COUNT(*) AS total FROM usuario WHERE tipo_acesso = 'CUIDADOR'",
      [],
    );
    if (Number(users[0].total) !== 0) throw new InvitationRejectedError();
    const open = await sql.select<RowDataPacket>(
      "SELECT convite_id FROM convite_cadastro_cuidador WHERE bootstrap_aberto = 1 FOR UPDATE",
      [],
    );
    if (open.length && !revokePrevious) throw new InvitationRejectedError();
    if (open.length) {
      const result = await sql.execute(
        "UPDATE convite_cadastro_cuidador SET revogado_em = UTC_TIMESTAMP(6) WHERE convite_id = ? AND usado_em IS NULL AND revogado_em IS NULL",
        [String(open[0].convite_id)],
      );
      if (result.affectedRows !== 1) throw new InvitationRejectedError();
    }
    await sql.execute(
      "INSERT INTO convite_cadastro_cuidador (email_normalizado, token_hash, origem_emissao, expira_em) VALUES (?, ?, 'OPERADOR_BOOTSTRAP', TIMESTAMPADD(HOUR, ?, UTC_TIMESTAMP(6)))",
      [email, tokenHash(token), hours],
    );
  }, BOOTSTRAP_LOCK);
  return token;
}
export async function revokeBootstrapInvitation(): Promise<void> {
  await withTransaction(async (sql) => {
    const result = await sql.execute(
      "UPDATE convite_cadastro_cuidador SET revogado_em = UTC_TIMESTAMP(6) WHERE bootstrap_aberto = 1 AND usado_em IS NULL AND revogado_em IS NULL",
      [],
    );
    if (result.affectedRows !== 1) throw new InvitationRejectedError();
  }, BOOTSTRAP_LOCK);
}
export const invitationPreflight = (hash: string, email: string) =>
  requireInvitation(database, hash, email);
