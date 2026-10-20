import "server-only";
import type { Identity } from "@/server/auth/sessions";
export class BootstrapDecisionRequiredError extends Error {
  readonly code = "BLOCKED_BY_DECISION";
  constructor() {
    super("Cadastro ainda não liberado para esta conta.");
  }
}
/** DB-002 permite um ator designado, mas nenhuma fonte ratifica como provar a designacao.
 * DEC-AUTH-001 concede identidade, nunca esta permissao. Sem fallback por primeiro usuario/convite/flag.
 * Substituir somente apos decisao canonica de origem, escopo, revogacao e idempotencia da prova. */
export async function requireBootstrapEligibility(
  identity: Identity,
): Promise<never> {
  void identity;
  throw new BootstrapDecisionRequiredError();
}
