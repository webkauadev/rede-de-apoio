import { pendingProfileSchema } from "@/domains/pessoa-idosa/schema";
import { BootstrapDecisionRequiredError } from "@/server/pessoa-idosa/bootstrap";
import {
  createPendingProfile,
  denyProfileRead,
  auditProfileDenied,
} from "@/server/pessoa-idosa/service";
import { AccessDeniedError } from "@/server/auth/sessions";
import { hasSameOrigin } from "@/server/security/origin";
import { sessionConfig } from "@/server/auth/session-config";
import { privateResponse, readLoginBody } from "@/server/security/auth-http";
export const dynamic = "force-dynamic";
function failure(error: unknown) {
  if (error instanceof BootstrapDecisionRequiredError)
    return privateResponse({ message: error.message, code: error.code }, 403);
  if (error instanceof AccessDeniedError)
    return privateResponse({ message: "Acesso não autorizado." }, 403);
  return privateResponse(
    {
      message:
        "Não foi possível confirmar a operação. Não repita automaticamente a solicitação.",
    },
    503,
  );
}
export async function POST(request: Request) {
  try {
    sessionConfig();
    if (
      !hasSameOrigin(request) ||
      request.headers.get("sec-fetch-site") === "cross-site"
    ) {
      await auditProfileDenied();
      return privateResponse({ message: "Solicitação não autorizada." }, 403);
    }
    let input: unknown;
    try {
      input = await readLoginBody(request);
    } catch {
      await auditProfileDenied();
      return privateResponse({ message: "Solicitação inválida." }, 400);
    }
    const parsed = pendingProfileSchema.safeParse(input);
    if (!parsed.success) {
      await auditProfileDenied();
      return privateResponse({ message: "Revise os dados informados." }, 422);
    }
    // Passa forma de entrada original para evitar reparse de birthDate normalizada NULL.
    await createPendingProfile(request.headers.get("cookie"), input);
    return privateResponse({ message: "Cadastro indisponível." }, 403);
  } catch (error) {
    return failure(error);
  }
}
export async function GET(request: Request) {
  try {
    await denyProfileRead(request.headers.get("cookie"));
    return privateResponse({}, 403);
  } catch (error) {
    return failure(error);
  }
}
