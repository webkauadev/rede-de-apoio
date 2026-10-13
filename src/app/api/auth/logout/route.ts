import { logout } from "@/server/auth/sessions";
import {
  readSessionToken,
  sessionConfig,
  sessionCookie,
} from "@/server/auth/session-config";
import {
  checkMutationOrigin,
  privateResponse,
} from "@/server/security/auth-http";
export async function POST(request: Request) {
  try {
    sessionConfig();
    if (!(await checkMutationOrigin(request, "LOGOUT")))
      return privateResponse({ message: "Solicitação não autorizada." }, 403);
    await logout(readSessionToken(request.headers.get("cookie")));
    return privateResponse({ signedOut: true }, 200, {
      "Set-Cookie": sessionCookie("", true),
    });
  } catch {
    return privateResponse(
      { message: "Não foi possível confirmar a saída." },
      503,
    );
  }
}
