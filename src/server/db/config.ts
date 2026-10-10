import { z } from "zod";
const databaseEnvironment = z.object({
  DATABASE_HOST: z.string().trim().min(1),
  DATABASE_PORT: z.coerce.number().int().min(1).max(65535).default(3306),
  DATABASE_NAME: z.string().trim().min(1),
  DATABASE_USER: z.string().trim().min(1),
  DATABASE_PASSWORD: z.string().min(1),
});
/** Valida somente quando chamado; nunca expõe valores de ambiente. */
export function readDatabaseConfig(
  environment: Record<string, string | undefined>,
) {
  const result = databaseEnvironment.safeParse(environment);
  if (!result.success)
    throw new Error("Configuração MySQL ausente ou inválida.");
  const env = result.data;
  return {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    database: env.DATABASE_NAME,
    user: env.DATABASE_USER,
    password: env.DATABASE_PASSWORD,
    charset: "utf8mb4",
    timezone: "Z",
    supportBigNumbers: true,
    bigNumberStrings: true,
    dateStrings: true,
    connectionLimit: 5,
    waitForConnections: true,
    queueLimit: 20,
    connectTimeout: 10000,
    multipleStatements: false,
  };
}
