import "server-only";
import { hasSameOrigin } from "./origin";
import { auditDenied } from "@/server/auth/sessions";
export function privateResponse(
  body: object,
  status = 200,
  headers: Record<string, string> = {},
) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, private",
      Vary: "Cookie",
      ...headers,
    },
  });
}
export async function checkMutationOrigin(
  request: Request,
  operation: "LOGIN" | "LOGOUT",
) {
  if (
    hasSameOrigin(request) &&
    request.headers.get("sec-fetch-site") !== "cross-site"
  )
    return true;
  await auditDenied(operation);
  return false;
}
export async function readLoginBody(request: Request): Promise<unknown> {
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  )
    throw new Error();
  const reader = request.body?.getReader();
  if (!reader) throw new Error();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) {
        await reader.cancel();
        throw new Error();
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  return JSON.parse(
    new TextDecoder("utf-8", { fatal: true }).decode(Buffer.concat(chunks)),
  );
}
