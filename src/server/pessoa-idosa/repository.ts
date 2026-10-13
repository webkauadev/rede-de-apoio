import "server-only";
import type { SqlExecutor } from "@/server/db";
import type { PendingProfileInput } from "@/domains/pessoa-idosa/schema";
/** Preparado para transacao de servico apos prova canonica de elegibilidade. Nunca exposto em HTTP.
 * Testes fisicos deste adaptador NAO sao cadastro autorizado; actorId vem do servidor.
 * Nao cria rede, papel, titular ou exclusividade de perfil por cuidador. Sem retry automatico. */
export async function insertPendingProfile(
  sql: SqlExecutor,
  input: PendingProfileInput,
  actorId: string,
): Promise<string> {
  const result = await sql.execute(
    "INSERT INTO pessoa_idosa (nome, data_nascimento, cadastrado_por_usuario_id, usuario_titular_id) VALUES (?, ?, ?, NULL)",
    [input.name, input.birthDate, actorId],
  );
  // mysql2 insertId pode exceder precisao JS; LAST_INSERT_ID na mesma conexao e string segura.
  if (result.affectedRows !== 1)
    throw new Error("Não foi possível confirmar o perfil.");
  const rows = await sql.select<import("mysql2/promise").RowDataPacket>(
    "SELECT CAST(LAST_INSERT_ID() AS CHAR) AS id",
    [],
  );
  if (!rows[0] || !/^[1-9][0-9]*$/.test(String(rows[0].id)))
    throw new Error("Não foi possível confirmar o perfil.");
  const id = String(rows[0].id);
  await sql.execute(
    "INSERT INTO auditoria (ator_usuario_id, operacao, recurso_tipo, recurso_id_opaco, categoria_snapshot, resultado) VALUES (?, 'CADASTRO_PESSOA_IDOSA', 'pessoa_idosa', ?, 'CUIDADOR', 'PERMITIDO')",
    [actorId, id],
  );
  return id;
}
