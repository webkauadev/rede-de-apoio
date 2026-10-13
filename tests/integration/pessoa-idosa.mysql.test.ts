import {
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  it,
  expect,
  vi,
} from "vitest";
import mysql, { type Connection, type RowDataPacket } from "mysql2/promise";
vi.mock("server-only", () => ({}));
const fault = vi.hoisted(() => ({ armed: false, commits: 0 }));
vi.mock("mysql2/promise", async (original) => {
  const actual = await original<typeof import("mysql2/promise")>();
  return {
    ...actual,
    createPool: (...args: Parameters<typeof actual.createPool>) => {
      const pool = actual.createPool(...args),
        get = pool.getConnection.bind(pool);
      pool.getConnection = async () => {
        const c = await get();
        if (fault.armed) {
          fault.armed = false;
          const commit = c.commit.bind(c);
          c.commit = async () => {
            await commit();
            fault.commits++;
            throw new Error("Falha de confirmacao injetada apos COMMIT real");
          };
        }
        return c;
      };
      return pool;
    },
  };
});
import { readDatabaseConfig } from "@/server/db/config";
import {
  withTransaction,
  closeDatabase,
  TransactionOutcomeUnknownError,
} from "@/server/db";
import { insertPendingProfile } from "@/server/pessoa-idosa/repository";
import { createPendingProfile } from "@/server/pessoa-idosa/service";
import { BootstrapDecisionRequiredError } from "@/server/pessoa-idosa/bootstrap";
import { hashPassword } from "@/server/auth/password";
import { loginAccount } from "@/server/auth/login";
import { POST, GET } from "@/app/api/pessoas-idosas/route";
let connection: Connection, other: Connection, actor: string, encoded: string;
const input = {
  name: "Perfil sintético ' parametrizado",
  birthDate: "1947-03-18",
};
async function rows(q: string, p: (string | number)[] = []) {
  return (await connection.execute<RowDataPacket[]>(q, p))[0];
}
async function count(table: string) {
  return Number((await rows(`SELECT COUNT(*) total FROM ${table}`))[0].total);
}
function request(
  token?: string,
  inputValue: unknown = input,
  origin = "http://127.0.0.1:3100",
) {
  return new Request("http://127.0.0.1:3100/api/pessoas-idosas", {
    method: "POST",
    headers: {
      Origin: origin,
      "Content-Type": "application/json",
      ...(token ? { Cookie: `rede_apoio_session=${token}` } : {}),
    },
    body: JSON.stringify(inputValue),
  });
}
beforeAll(async () => {
  if (
    process.env.US003_INTEGRATION !== "authorized-disposable" ||
    process.env.DATABASE_HOST !== "127.0.0.1" ||
    process.env.DATABASE_USER !== "us003_test"
  )
    throw new Error("Ensaio US003 novo autorizado necessario");
  connection = await mysql.createConnection(readDatabaseConfig(process.env));
  other = await mysql.createConnection(readDatabaseConfig(process.env));
  expect(
    String((await rows("SELECT VERSION() version"))[0].version).startsWith(
      "8.4.",
    ),
  ).toBe(true);
  expect(
    Number(
      (
        await rows(
          "SELECT COUNT(*) total FROM information_schema.tables WHERE table_schema='rede_de_apoio'",
        )
      )[0].total,
    ),
  ).toBe(34);
  encoded = await hashPassword("senha sintética");
});
beforeEach(async () => {
  await closeDatabase();
  for (const table of [
    "auditoria",
    "pessoa_idosa",
    "sessao_usuario",
    "convite_cadastro_cuidador",
    "usuario",
    "login_rate_limit",
  ])
    await connection.execute(`DELETE FROM ${table}`);
  await connection.execute(
    "INSERT INTO usuario (nome,email_normalizado,senha_hash) VALUES ('Ator sintetico','actor@example.invalid',?)",
    [encoded],
  );
  actor = String((await rows("SELECT usuario_id FROM usuario"))[0].usuario_id);
  fault.armed = false;
  fault.commits = 0;
});
afterAll(async () => {
  await closeDatabase();
  await connection?.end();
  await other?.end();
});
describe("US003 SQL real de adaptador, SEM prova de bootstrap autorizado", () => {
  it("metadados/FKs de pessoa_idosa existentes, sem migracao nova", async () => {
    const ddl = String(
      (
        await connection.query<RowDataPacket[]>(
          "SHOW CREATE TABLE pessoa_idosa",
        )
      )[0][0]["Create Table"],
    );
    for (const field of [
      "fk_pessoa_cadastrante",
      "fk_pessoa_conta_tipo",
      "data_nascimento",
      "usuario_titular_id",
    ])
      expect(ddl.includes(field)).toBe(true);
  });
  it("adaptador em transacao grava perfil pendente e auditoria, sem titular/rede/papel", async () => {
    const id = await withTransaction((sql) =>
      insertPendingProfile(sql, input, actor),
    );
    const row = (
      await rows("SELECT * FROM pessoa_idosa WHERE pessoa_idosa_id=?", [id])
    )[0];
    expect(row.nome === input.name).toBe(true);
    expect(row.data_nascimento).toBe(input.birthDate);
    expect(row.usuario_titular_id).toBeNull();
    expect(String(row.cadastrado_por_usuario_id) === actor).toBe(true);
    for (const table of [
      "rede_cuidado",
      "membro_rede",
      "atribuicao_papel_familiar",
    ])
      expect(await count(table)).toBe(0);
    expect(await count("auditoria")).toBe(1);
  });
  it("FK rejeita cadastrante inexistente sem perfil ou evento", async () => {
    await expect(
      withTransaction((sql) => insertPendingProfile(sql, input, "999999")),
    ).rejects.toThrow();
    expect(await count("pessoa_idosa")).toBe(0);
    expect(await count("auditoria")).toBe(0);
  });
  it("rollback depois do INSERT desfaz perfil e auditoria", async () => {
    await expect(
      withTransaction(async (sql) => {
        await insertPendingProfile(sql, input, actor);
        throw new Error("falha sintetica de negocio");
      }),
    ).rejects.toThrow();
    expect(await count("pessoa_idosa")).toBe(0);
    expect(await count("auditoria")).toBe(0);
  });
  it("falha de auditoria fisica desfaz INSERT", async () => {
    await connection.execute(
      "RENAME TABLE auditoria TO auditoria_test_unavailable",
    );
    try {
      await expect(
        withTransaction((sql) => insertPendingProfile(sql, input, actor)),
      ).rejects.toThrow();
      expect(await count("pessoa_idosa")).toBe(0);
    } finally {
      await connection.execute(
        "RENAME TABLE auditoria_test_unavailable TO auditoria",
      );
    }
  });
  it("COMMIT real sem confirmacao propaga incerteza sem repetir INSERT", async () => {
    fault.armed = true;
    await expect(
      withTransaction((sql) => insertPendingProfile(sql, input, actor)),
    ).rejects.toThrow(TransactionOutcomeUnknownError);
    expect(fault.commits).toBe(1);
    expect(await count("pessoa_idosa")).toBe(1);
    expect(await count("auditoria")).toBe(1);
  });
  it("duas conexoes SQL concorrentes nao inventam exclusividade de perfil por ator", async () => {
    const first = Number((await rows("SELECT CONNECTION_ID() id"))[0].id),
      second = Number(
        (await other.query<RowDataPacket[]>("SELECT CONNECTION_ID() id"))[0][0]
          .id,
      );
    expect(first !== second).toBe(true);
    await Promise.all([
      connection.execute(
        "INSERT INTO pessoa_idosa (nome,cadastrado_por_usuario_id) VALUES ('Fixture A',?)",
        [actor],
      ),
      other.execute(
        "INSERT INTO pessoa_idosa (nome,cadastrado_por_usuario_id) VALUES ('Fixture B',?)",
        [actor],
      ),
    ]);
    expect(await count("pessoa_idosa")).toBe(2);
    expect(await count("rede_cuidado")).toBe(0);
  });
  it("sessao CUIDADOR real nao passa gate, repeticao concorrente tem zero efeitos de perfil", async () => {
    const token = await loginAccount(
      { email: "actor@example.invalid", password: "senha sintética" },
      null,
    );
    const outcomes = await Promise.allSettled([
      createPendingProfile(`rede_apoio_session=${token}`, input),
      createPendingProfile(`rede_apoio_session=${token}`, input),
    ]);
    expect(
      outcomes.every(
        (o) =>
          o.status === "rejected" &&
          o.reason instanceof BootstrapDecisionRequiredError,
      ),
    ).toBe(true);
    expect(await count("pessoa_idosa")).toBe(0);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) total FROM auditoria WHERE operacao='CADASTRO_PESSOA_IDOSA' AND resultado='NEGADO'",
          )
        )[0].total,
      ),
    ).toBe(2);
  });
  it("HTTP real: tentativa de elevar privilegio, Origin, leitura de terceiro e gravacao negadas", async () => {
    await connection.execute(
      "INSERT INTO usuario (nome,email_normalizado,senha_hash) VALUES ('Terceiro sintetico','third@example.invalid',?)",
      [encoded],
    );
    const thirdActor = String(
      (
        await rows(
          "SELECT usuario_id FROM usuario WHERE email_normalizado='third@example.invalid'",
        )
      )[0].usuario_id,
    );
    const thirdProfile = await withTransaction((sql) =>
      insertPendingProfile(
        sql,
        { name: "Perfil terceiro sintético", birthDate: null },
        thirdActor,
      ),
    );
    const token = await loginAccount(
      { email: "actor@example.invalid", password: "senha sintética" },
      null,
    );
    expect(
      (await POST(request(token, { ...input, principal: true }))).status,
    ).toBe(422);
    expect(
      (await POST(request(token, input, "https://evil.example.invalid")))
        .status,
    ).toBe(403);
    const write = await POST(request(token));
    expect(write.status).toBe(403);
    expect((await write.json()).code).toBe("BLOCKED_BY_DECISION");
    const read = await GET(
      new Request(
        `http://127.0.0.1:3100/api/pessoas-idosas?id=${thirdProfile}`,
        {
          headers: { Cookie: `rede_apoio_session=${token}` },
        },
      ),
    );
    expect(read.status).toBe(403);
    expect(await read.text()).not.toContain("Perfil terceiro sintético");
    expect(await count("pessoa_idosa")).toBe(1);
  });
  it("Pessoa Idosa autenticada nao cadastra perfil", async () => {
    await connection.execute("UPDATE usuario SET tipo_acesso='PESSOA_IDOSA'");
    const token = await loginAccount(
      { email: "actor@example.invalid", password: "senha sintética" },
      null,
    );
    expect((await POST(request(token))).status).toBe(403);
    expect(await count("pessoa_idosa")).toBe(0);
  });
});
