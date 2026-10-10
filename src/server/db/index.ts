import "server-only";
import {
  createPool,
  type Pool,
  type PoolConnection,
  type RowDataPacket,
  type ResultSetHeader,
} from "mysql2/promise";
import { readDatabaseConfig } from "./config";
let pool: Pool | undefined;
export class DatabaseUnavailableError extends Error {
  constructor() {
    super("Operação de dados indisponível.");
    this.name = "DatabaseUnavailableError";
  }
}
export class DatabaseConflictError extends Error {
  constructor() {
    super("Conflito de unicidade nos dados.");
    this.name = "DatabaseConflictError";
  }
}
function sanitizedError(error: unknown): Error {
  if (error instanceof DatabaseConflictError) return error;
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ER_DUP_ENTRY"
  )
    return new DatabaseConflictError();
  return new DatabaseUnavailableError();
}
/**
 * O COMMIT foi tentado, mas não recebemos confirmação confiável.
 * O banco pode ter confirmado a transação: nunca repetir automaticamente
 * o comando sem reconciliação/idempotência no serviço de domínio.
 */
export class TransactionOutcomeUnknownError extends Error {
  constructor() {
    super("Não foi possível confirmar o resultado da transação.");
    this.name = "TransactionOutcomeUnknownError";
  }
}
/** Importar este módulo não cria pool nem abre conexão. */
function getPool(): Pool {
  return (pool ??= createPool(readDatabaseConfig(process.env)));
}
export type SqlParameter = string | number | boolean | null | Date | Buffer;
export interface SqlExecutor {
  select<T extends RowDataPacket>(
    sql: string,
    parameters: readonly SqlParameter[],
  ): Promise<T[]>;
  execute(
    sql: string,
    parameters: readonly SqlParameter[],
  ): Promise<ResultSetHeader>;
}
function executor(connection: Pool | PoolConnection): SqlExecutor {
  return {
    async select<T extends RowDataPacket>(
      sql: string,
      parameters: readonly SqlParameter[],
    ) {
      try {
        const [rows] = await connection.execute<T[]>(sql, [...parameters]);
        return rows;
      } catch (error) {
        throw sanitizedError(error);
      }
    },
    async execute(sql, parameters) {
      try {
        const [result] = await connection.execute<ResultSetHeader>(sql, [
          ...parameters,
        ]);
        return result;
      } catch (error) {
        throw sanitizedError(error);
      }
    },
  };
}
/** SQL estático no repositório; valores sempre por placeholders, nunca interpolação. */
export const database: SqlExecutor = {
  async select<T extends RowDataPacket>(
    sql: string,
    parameters: readonly SqlParameter[],
  ) {
    try {
      return await executor(getPool()).select<T>(sql, parameters);
    } catch (error) {
      throw sanitizedError(error);
    }
  },
  async execute(sql, parameters) {
    try {
      return await executor(getPool()).execute(sql, parameters);
    } catch (error) {
      throw sanitizedError(error);
    }
  },
};
/** Sem retry automático: serviços futuros definem locks, idempotência e autorização. */
export async function withTransaction<T>(
  operation: (transaction: SqlExecutor) => Promise<T>,
): Promise<T> {
  let connection: PoolConnection;
  try {
    connection = await getPool().getConnection();
  } catch {
    throw new DatabaseUnavailableError();
  }
  let reusable = true;
  let commitAttempted = false;
  try {
    try {
      await connection.beginTransaction();
    } catch {
      throw new DatabaseUnavailableError();
    }
    const result = await operation(executor(connection));
    commitAttempted = true;
    try {
      await connection.commit();
    } catch {
      // A confirmação pode ter ocorrido no servidor antes da falha de rede.
      // ROLLBACK agora não prova reversão: descarte e exija reconciliação.
      reusable = false;
      connection.destroy();
      throw new TransactionOutcomeUnknownError();
    }
    return result;
  } catch (error) {
    if (!commitAttempted) {
      try {
        await connection.rollback();
      } catch {
        reusable = false;
        connection.destroy();
      }
    }
    throw error;
  } finally {
    if (reusable) connection.release();
  }
}
export async function closeDatabase(): Promise<void> {
  const current = pool;
  pool = undefined;
  if (current) {
    try {
      await current.end();
    } catch {
      throw new DatabaseUnavailableError();
    }
  }
}
