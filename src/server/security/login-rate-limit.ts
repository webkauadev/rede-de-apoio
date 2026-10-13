import "server-only";
import { createHmac } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { withTransaction, type SqlExecutor } from "@/server/db";
import { sessionConfig } from "@/server/auth/session-config";
export class LoginRateLimitError extends Error {
  constructor() {
    super("Muitas tentativas. Aguarde antes de tentar novamente.");
  }
}
export async function countLoginAttempts(
  sql: SqlExecutor,
  email: string,
  secret: string,
): Promise<boolean> {
  // Coleta tecnica limitada; nunca apagar auditoria/clinica. Global primeiro limita novos buckets.
  await sql.execute(
    "DELETE FROM login_rate_limit WHERE janela_em < TIMESTAMPADD(DAY, -1, UTC_TIMESTAMP(6)) LIMIT 100",
    [],
  );
  for (const bucket of [
    { key: "login:global", seconds: 60, max: 60 },
    { key: `login:email:${email}`, seconds: 900, max: 5 },
  ]) {
    const key = createHmac("sha256", secret).update(bucket.key).digest("hex");
    await sql.execute(
      "INSERT INTO login_rate_limit (chave, janela_em, tentativas) VALUES (?, UTC_TIMESTAMP(6), 1) ON DUPLICATE KEY UPDATE tentativas = IF(janela_em <= TIMESTAMPADD(SECOND, -?, UTC_TIMESTAMP(6)), 1, LEAST(tentativas + 1, 1000000)), janela_em = IF(janela_em <= TIMESTAMPADD(SECOND, -?, UTC_TIMESTAMP(6)), UTC_TIMESTAMP(6), janela_em)",
      [key, bucket.seconds, bucket.seconds],
    );
    const rows = await sql.select<RowDataPacket>(
      "SELECT tentativas FROM login_rate_limit WHERE chave = ? FOR UPDATE",
      [key],
    );
    if (Number(rows[0].tentativas) > bucket.max) return false;
  }
  return true;
}
export async function limitLoginAttempts(email: string) {
  const { secret } = sessionConfig();
  const allowed = await withTransaction((sql) =>
    countLoginAttempts(sql, email, secret),
  );
  if (!allowed) throw new LoginRateLimitError();
}
