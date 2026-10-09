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
      } catch {
        throw new DatabaseUnavailableError();
      }
    },
    async execute(sql, parameters) {
      try {
        const [result] = await connection.execute<ResultSetHeader>(sql, [
          ...parameters,
        ]);
        return result;
      } catch {
        throw new DatabaseUnavailableError();
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
    } catch {
      throw new DatabaseUnavailableError();
    }
  },
  async execute(sql, parameters) {
    try {
      return await executor(getPool()).execute(sql, parameters);
    } catch {
      throw new DatabaseUnavailableError();
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
  try {
    try {
      await connection.beginTransaction();
    } catch {
      throw new DatabaseUnavailableError();
    }
    const result = await operation(executor(connection));
    try {
      await connection.commit();
    } catch {
      throw new DatabaseUnavailableError();
    }
    return result;
  } catch (error) {
    try {
      await connection.rollback();
    } catch {
      reusable = false;
      connection.destroy();
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
