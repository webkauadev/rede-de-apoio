import { requireIdentity, AccessDeniedError } from "@/server/auth/sessions";
import { privateResponse } from "@/server/security/auth-http";
export const dynamic = "force-dynamic";
/** Prova tecnica de identidade; nao retorna rede, papeis, permissoes ou dados de cuidado. */
export async function GET(request: Request) {
  try {
    return privateResponse({
      identity: await requireIdentity(request.headers.get("cookie")),
    });
  } catch (error) {
    return privateResponse(
      { message: "Acesso não autorizado ou indisponível." },
      error instanceof AccessDeniedError ? 401 : 503,
    );
  }
}
