import "server-only";
import { withTransaction } from "@/server/db";
import {
  requireIdentity,
  AccessDeniedError,
  type Identity,
} from "@/server/auth/sessions";
import { pendingProfileSchema } from "@/domains/pessoa-idosa/schema";
import { requireBootstrapEligibility } from "./bootstrap";
export async function auditProfileDenied(
  identity?: Identity,
  operation:
    "CADASTRO_PESSOA_IDOSA" | "LEITURA_PESSOA_IDOSA" = "CADASTRO_PESSOA_IDOSA",
) {
  // Separada da operacao rejeitada: nenhum nome, nascimento, senha ou token no detalhe.
  await withTransaction((sql) =>
    sql.execute(
      "INSERT INTO auditoria (ator_usuario_id, operacao, recurso_tipo, categoria_snapshot, resultado, detalhe_sanitizado) VALUES (?, ?, 'pessoa_idosa', ?, 'NEGADO', 'Autorizacao de perfil indisponivel')",
      [identity?.userId ?? null, operation, identity?.category ?? null],
    ),
  );
}
export async function createPendingProfile(
  cookieHeader: string | null,
  input: unknown,
): Promise<never> {
  pendingProfileSchema.parse(input);
  const identity = await requireIdentity(cookieHeader);
  if (identity.category !== "CUIDADOR") {
    await auditProfileDenied(identity);
    throw new AccessDeniedError();
  }
  try {
    await requireBootstrapEligibility(identity);
  } catch (error) {
    await auditProfileDenied(identity);
    throw error;
  }
  // O resolver oficial retorna never. Nao conectar INSERT enquanto faltar decisao funcional.
  throw new AccessDeniedError();
}
export async function denyProfileRead(
  cookieHeader: string | null,
): Promise<never> {
  const identity = await requireIdentity(cookieHeader);
  await auditProfileDenied(identity, "LEITURA_PESSOA_IDOSA");
  throw new AccessDeniedError();
}
