import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => {
  const connection = {
    execute: vi.fn(),
    beginTransaction: vi.fn(),
    commit: vi.fn(),
    rollback: vi.fn(),
    release: vi.fn(),
    destroy: vi.fn(),
  };
  const pool = { execute: vi.fn(), getConnection: vi.fn(), end: vi.fn() };
  return { connection, pool, createPool: vi.fn() };
});
vi.mock("server-only", () => ({}));
vi.mock("mysql2/promise", () => ({ createPool: mocks.createPool }));
import {
  closeDatabase,
  database,
  DatabaseUnavailableError,
  TransactionOutcomeUnknownError,
  withTransaction,
  type SqlExecutor,
} from "@/server/db";

describe("acesso a dados sem servidor MySQL (driver simulado)", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mocks.createPool.mockReturnValue(mocks.pool);
    mocks.pool.getConnection.mockResolvedValue(mocks.connection);
    mocks.connection.execute.mockResolvedValue([{ affectedRows: 1 }, []]);
    for (const key of [
      "DATABASE_HOST",
      "DATABASE_NAME",
      "DATABASE_USER",
      "DATABASE_PASSWORD",
    ])
      vi.stubEnv(key, "synthetic-test-only");
  });
  afterEach(async () => {
    await closeDatabase();
    vi.unstubAllEnvs();
  });
  it("não cria pool ao importar o módulo", () => {
    expect(mocks.createPool).not.toHaveBeenCalled();
  });
  it("falha de configuração não abre conexão nem expõe valores", async () => {
    vi.stubEnv("DATABASE_HOST", "");
    await expect(database.select("SELECT ? AS value", [1])).rejects.toThrow(
      DatabaseUnavailableError,
    );
    expect(mocks.createPool).not.toHaveBeenCalled();
  });
  it("envia valores por parâmetros e reutiliza o pool", async () => {
    mocks.pool.execute.mockResolvedValue([[{ value: "synthetic" }], []]);
    const value = "' OR 1=1 --";
    await expect(
      database.select("SELECT ? AS value", [value]),
    ).resolves.toEqual([{ value: "synthetic" }]);
    await database.execute("UPDATE synthetic SET value = ?", [1]);
    expect(mocks.pool.execute).toHaveBeenNthCalledWith(1, "SELECT ? AS value", [
      value,
    ]);
    expect(mocks.createPool).toHaveBeenCalledTimes(1);
  });
  it("sanitiza erros do driver", async () => {
    mocks.pool.execute.mockRejectedValue(
      new Error("driver-error-with-sensitive-value"),
    );
    await expect(database.execute("SELECT ?", [1])).rejects.toThrow(
      /^Operação de dados indisponível\.$/,
    );
  });
  it("confirma e libera uma transação bem-sucedida", async () => {
    await expect(
      withTransaction(async (tx) => {
        await tx.execute("UPDATE synthetic SET value = ?", [1]);
        return "ok";
      }),
    ).resolves.toBe("ok");
    expect(mocks.connection.beginTransaction).toHaveBeenCalledOnce();
    expect(mocks.connection.commit).toHaveBeenCalledOnce();
    expect(mocks.connection.rollback).not.toHaveBeenCalled();
    expect(mocks.connection.release).toHaveBeenCalledOnce();
    expect(mocks.connection.execute).toHaveBeenCalledWith(
      "UPDATE synthetic SET value = ?",
      [1],
    );
  });
  it("preserva erro de domínio e reverte sem commit", async () => {
    const conflict = new Error("Conflito de versão sintético");
    await expect(
      withTransaction(async () => {
        throw conflict;
      }),
    ).rejects.toBe(conflict);
    expect(mocks.connection.rollback).toHaveBeenCalledOnce();
    expect(mocks.connection.release).toHaveBeenCalledOnce();
    expect(mocks.connection.commit).not.toHaveBeenCalled();
  });
  it.each(["beginTransaction", "execute"] as const)(
    "sanitiza falha de %s e reverte",
    async (stage) => {
      mocks.connection[stage].mockRejectedValue(
        new Error("driver-error-with-sensitive-value"),
      );
      await expect(
        withTransaction((tx) => tx.execute("SELECT ?", [1])),
      ).rejects.toThrow(/^Operação de dados indisponível\.$/);
      expect(mocks.connection.rollback).toHaveBeenCalledOnce();
      expect(mocks.connection.release).toHaveBeenCalledOnce();
    },
  );
  it("descarta conexão e sinaliza resultado desconhecido quando COMMIT falha", async () => {
    mocks.connection.commit.mockRejectedValue(
      new Error("driver-error-with-sensitive-value"),
    );
    const operation = vi.fn(async (tx: SqlExecutor) => {
      await tx.execute("UPDATE synthetic SET value = ?", [1]);
      return "tentativa-unica";
    });
    await expect(withTransaction(operation)).rejects.toThrow(
      TransactionOutcomeUnknownError,
    );
    expect(operation).toHaveBeenCalledOnce();
    expect(mocks.connection.beginTransaction).toHaveBeenCalledOnce();
    expect(mocks.connection.execute).toHaveBeenCalledOnce();
    expect(mocks.connection.commit).toHaveBeenCalledOnce();
    expect(mocks.connection.rollback).not.toHaveBeenCalled();
    expect(mocks.connection.destroy).toHaveBeenCalledOnce();
    expect(mocks.connection.release).not.toHaveBeenCalled();
  });
  it("descarta conexão cujo rollback falha", async () => {
    mocks.connection.rollback.mockRejectedValue(
      new Error("driver-error-with-sensitive-value"),
    );
    await expect(
      withTransaction(async () => {
        throw new Error("synthetic domain error");
      }),
    ).rejects.toThrow("synthetic domain error");
    expect(mocks.connection.destroy).toHaveBeenCalledOnce();
    expect(mocks.connection.release).not.toHaveBeenCalled();
  });
  it("sanitiza falha ao obter conexão", async () => {
    mocks.pool.getConnection.mockRejectedValue(
      new Error("driver-error-with-sensitive-value"),
    );
    await expect(withTransaction(async () => "never")).rejects.toThrow(
      DatabaseUnavailableError,
    );
    expect(mocks.connection.beginTransaction).not.toHaveBeenCalled();
  });

  it("preserva somente a classificação ER_DUP_ENTRY, sem SQL/e-mail", async () => {
    const db = await import("@/server/db");
    const connection = mocks.connection;
    connection.execute.mockRejectedValueOnce({
      code: "ER_DUP_ENTRY",
      sqlMessage: "senha secreta teste@example.invalid",
      sql: "INSERT...",
    });
    await expect(
      db.withTransaction((sql) =>
        sql.execute("INSERT INTO usuario VALUES (?)", ["synthetic"]),
      ),
    ).rejects.toBeInstanceOf(db.DatabaseConflictError);
  });
});
