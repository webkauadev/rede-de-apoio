import "server-only";
import { createHash } from "node:crypto";
import type { RowDataPacket } from "mysql2/promise";
import { withTransaction } from "@/server/db";
export class RegistrationRateLimitError extends Error {
  constructor() {
    super("Muitas tentativas. Aguarde antes de tentar novamente.");
  }
}
/** Janela UTC no banco, compartilhada entre processos/restarts. Negacao nao faz rollback dos contadores. */
export async function limitRegistrationAttempts(
  invitationHash: string,
): Promise<void> {
  const allowed = await withTransaction(async (sql) => {
    let accepted = true;
    for (const bucket of [
      { key: "global", seconds: 60, max: 30 },
      { key: `convite:${invitationHash}`, seconds: 900, max: 5 },
    ]) {
      const key = createHash("sha256").update(bucket.key).digest("hex");
      await sql.execute(
        "INSERT INTO cadastro_rate_limit (chave, janela_em, tentativas) VALUES (?, UTC_TIMESTAMP(6), 1) ON DUPLICATE KEY UPDATE tentativas = IF(janela_em <= TIMESTAMPADD(SECOND, -?, UTC_TIMESTAMP(6)), 1, LEAST(tentativas + 1, 1000000)), janela_em = IF(janela_em <= TIMESTAMPADD(SECOND, -?, UTC_TIMESTAMP(6)), UTC_TIMESTAMP(6), janela_em)",
        [key, bucket.seconds, bucket.seconds],
      );
      const rows = await sql.select<RowDataPacket>(
        "SELECT tentativas FROM cadastro_rate_limit WHERE chave = ? FOR UPDATE",
        [key],
      );
      accepted &&= Number(rows[0].tentativas) <= bucket.max;
      // Bucket global negado: nao permitir crescimento ilimitado por tokens aleatorios.
      if (!accepted) break;
    }
    return accepted;
  });
  if (!allowed) throw new RegistrationRateLimitError();
}
