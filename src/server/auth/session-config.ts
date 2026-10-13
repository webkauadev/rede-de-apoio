import "server-only";
export const SESSION_SECONDS = 8 * 60 * 60; // parametro tecnico, nao criterio funcional
export function sessionConfig(env: NodeJS.ProcessEnv = process.env) {
  const origin = new URL(env.APPLICATION_ORIGIN ?? "");
  if (
    origin.origin !== env.APPLICATION_ORIGIN ||
    origin.username ||
    origin.password ||
    !["http:", "https:"].includes(origin.protocol) ||
    !env.SESSION_SECRET ||
    Buffer.byteLength(env.SESSION_SECRET) < 32
  )
    throw new Error("Autenticação indisponível.");
  // Gates publicos ainda abertos. HTTP permitido exclusivamente em loopback explicitamente local.
  if (
    env.AUTH_ENVIRONMENT !== "local" ||
    !["localhost", "127.0.0.1"].includes(origin.hostname)
  )
    throw new Error("Autenticação indisponível.");
  const secure = origin.protocol === "https:";
  return {
    secure,
    cookieName: secure ? "__Host-rede_apoio_session" : "rede_apoio_session",
    secret: env.SESSION_SECRET,
  };
}
export function sessionCookie(token: string, clear = false) {
  if (!clear && !/^[A-Za-z0-9_-]{43}$/.test(token))
    throw new Error("Sessão inválida.");
  const config = sessionConfig();
  return `${config.cookieName}=${clear ? "" : token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${clear ? 0 : SESSION_SECONDS}${config.secure ? "; Secure" : ""}`;
}
export function readSessionToken(cookieHeader: string | null): string | null {
  const { cookieName } = sessionConfig();
  const matches = (cookieHeader ?? "")
    .split(";")
    .map((v) => v.trim())
    .filter((v) => v.startsWith(`${cookieName}=`));
  if (matches.length !== 1) return null;
  const value = matches[0].slice(cookieName.length + 1);
  return /^[A-Za-z0-9_-]{43}$/.test(value) ? value : null;
}
