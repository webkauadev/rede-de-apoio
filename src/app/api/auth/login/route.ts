import { loginSchema } from "@/domains/auth/login/schema";
import { loginAccount } from "@/server/auth/login";
import { AuthenticationDeniedError, auditDenied } from "@/server/auth/sessions";
import {
  readSessionToken,
  sessionConfig,
  sessionCookie,
} from "@/server/auth/session-config";
import { LoginRateLimitError } from "@/server/security/login-rate-limit";
import {
  checkMutationOrigin,
  privateResponse,
  readLoginBody,
} from "@/server/security/auth-http";
export async function POST(request: Request) {
  try {
    sessionConfig();
    if (!(await checkMutationOrigin(request, "LOGIN")))
      return privateResponse({ message: "Solicitação não autorizada." }, 403);
    let input: unknown;
    try {
      input = await readLoginBody(request);
    } catch {
      await auditDenied("LOGIN");
      return privateResponse({ message: "Solicitação inválida." }, 400);
    }
    const parsed = loginSchema.safeParse(input);
    if (!parsed.success) {
      await auditDenied("LOGIN");
      return privateResponse(
        { message: "Revise o e-mail e a senha informados." },
        422,
      );
    }
    const token = await loginAccount(
      parsed.data,
      readSessionToken(request.headers.get("cookie")),
    );
    return privateResponse({ authenticated: true }, 200, {
      "Set-Cookie": sessionCookie(token),
    });
  } catch (error) {
    if (error instanceof AuthenticationDeniedError)
      return privateResponse({ message: error.message }, 401);
    if (error instanceof LoginRateLimitError)
      return privateResponse({ message: error.message }, 429);
    return privateResponse(
      {
        message:
          "Login indisponível. Não repita automaticamente a solicitação.",
      },
      503,
    );
  }
}
