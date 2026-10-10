import "server-only";

/** Origem canônica configurada no servidor; não confia em X-Forwarded-Host. */
export function hasSameOrigin(request: Request): boolean {
  try {
    const configured = process.env.APPLICATION_ORIGIN;
    const expected = configured || new URL(request.url).origin;
    const origin = new URL(expected);
    if (
      origin.origin !== expected ||
      !["http:", "https:"].includes(origin.protocol)
    )
      return false;
    return request.headers.get("origin") === origin.origin;
  } catch {
    return false;
  }
}
