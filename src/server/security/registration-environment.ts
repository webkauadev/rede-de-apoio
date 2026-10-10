import "server-only";
/** Restricao operacional local; nunca substitui prova do convite. Publicacao aguarda gates. */
export function assertLocalRegistrationEnvironment(): void {
  const env = process.env;
  try {
    const origin = new URL(env.APPLICATION_ORIGIN || "");
    if (
      env.REGISTRATION_ENVIRONMENT !== "local-disposable" ||
      env.DATABASE_HOST !== "127.0.0.1" ||
      env.DATABASE_NAME !== "rede_de_apoio" ||
      !["localhost", "127.0.0.1"].includes(origin.hostname) ||
      origin.origin !== env.APPLICATION_ORIGIN
    )
      throw new Error();
  } catch {
    throw new Error("Cadastro não habilitado neste ambiente.");
  }
}
