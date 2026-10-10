import { assertLocalRegistrationEnvironment } from "@/server/security/registration-environment";
import {
  InvitationRejectedError,
  InvitationUsedError,
} from "@/server/auth/invitations";
import { RegistrationRateLimitError } from "@/server/security/registration-rate-limit";
import { hasSameOrigin } from "@/server/security/origin";
import {
  registrationSchema,
  fieldErrors,
} from "@/domains/auth/registration/schema";
import {
  registerAccount,
  registrationDependencies,
  RegistrationConflictError,
} from "@/server/auth/registration";

const MAX_BODY_BYTES = 8192;
function response(body: object, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}
/** Body limitado antes de decodificar; não registra senha, payload ou erro do driver. */
async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("body");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) {
        await reader.cancel();
        throw new Error("limit");
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
}
export async function POST(request: Request) {
  if (!hasSameOrigin(request))
    return response({ message: "Solicitação não autorizada." }, 403);
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    return response({ message: "Formato de solicitação inválido." }, 415);
  let input: unknown;
  try {
    input = await readBody(request);
  } catch {
    return response(
      { message: "Solicitação inválida ou excede o limite permitido." },
      400,
    );
  }
  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success)
    return response(
      {
        message: "Revise os dados informados.",
        errors: fieldErrors(parsed.error),
      },
      422,
    );
  try {
    assertLocalRegistrationEnvironment();
  } catch {
    return response({ message: "Cadastro indisponível neste ambiente." }, 403);
  }
  try {
    await registerAccount(parsed.data, registrationDependencies);
    return response({ created: true }, 201);
  } catch (error) {
    if (error instanceof RegistrationRateLimitError)
      return response({ message: error.message }, 429);
    if (
      error instanceof RegistrationConflictError ||
      error instanceof InvitationUsedError
    )
      return response({ message: error.message }, 409);
    if (error instanceof InvitationRejectedError)
      return response({ message: error.message }, 403);
    return response(
      {
        message:
          "Não foi possível confirmar o cadastro. Não repita automaticamente a solicitação.",
      },
      503,
    );
  }
}
