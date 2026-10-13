import {
  beforeAll,
  beforeEach,
  afterAll,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import mysql, { type Connection, type RowDataPacket } from "mysql2/promise";
vi.mock("server-only", () => ({}));
const fault = vi.hoisted(() => ({ armed: false, destroyed: 0, rolledBack: 0 }));
vi.mock("mysql2/promise", async (original) => {
  const actual = await original<typeof import("mysql2/promise")>();
  return {
    ...actual,
    createPool: (...args: Parameters<typeof actual.createPool>) => {
      const pool = actual.createPool(...args),
        acquire = pool.getConnection.bind(pool);
      pool.getConnection = async () => {
        const c = await acquire();
        if (fault.armed) {
          fault.armed = false;
          const commit = c.commit.bind(c),
            destroy = c.destroy.bind(c),
            rollback = c.rollback.bind(c);
          c.commit = async () => {
            await commit();
            throw new Error("Falha de confirmacao injetada apos COMMIT real");
          };
          c.destroy = () => {
            fault.destroyed++;
            destroy();
          };
          c.rollback = async () => {
            fault.rolledBack++;
            await rollback();
          };
        }
        return c;
      };
      return pool;
    },
  };
});
import { readDatabaseConfig } from "@/server/db/config";
import { closeDatabase, TransactionOutcomeUnknownError } from "@/server/db";
import { loginAccount, loginDependencies } from "@/server/auth/login";
import { hashPassword } from "@/server/auth/password";
import {
  resolveIdentity,
  logout,
  secretHash,
  requireIdentity,
  denyCareAccess,
  AuthenticationDeniedError,
} from "@/server/auth/sessions";
import { sessionConfig } from "@/server/auth/session-config";
import {
  limitLoginAttempts,
  LoginRateLimitError,
} from "@/server/security/login-rate-limit";
import { POST as loginPOST } from "@/app/api/auth/login/route";
import { POST as logoutPOST } from "@/app/api/auth/logout/route";
let connection: Connection, other: Connection, encoded: string;
const email = "integration@example.invalid",
  password = "senha sintética";
const input = { email, password };
async function rows(query: string, params: (string | number)[] = []) {
  return (await connection.execute<RowDataPacket[]>(query, params))[0];
}
async function count(
  table: "sessao_usuario" | "auditoria" | "login_rate_limit",
) {
  return Number((await rows(`SELECT COUNT(*) total FROM ${table}`))[0].total);
}
async function fixture(
  category = "CUIDADOR",
  address = email,
  hash: string | null = encoded,
  active = true,
) {
  await connection.execute(
    "INSERT INTO usuario (nome,email_normalizado,senha_hash,tipo_acesso,ativo) VALUES ('Fixture sintetica',?,?,?,?)",
    [address, hash, category, active],
  );
  return String(
    (
      await rows("SELECT usuario_id FROM usuario WHERE email_normalizado=?", [
        address,
      ])
    )[0].usuario_id,
  );
}
const cookie = (token: string) => `${sessionConfig().cookieName}=${token}`;
const pause = () => new Promise((r) => setTimeout(r, 100));
function request(
  path = "login",
  origin: string | null = "http://127.0.0.1:3100",
  token?: string,
) {
  return new Request(`http://127.0.0.1:3100/api/auth/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(origin ? { Origin: origin } : {}),
      ...(token ? { Cookie: cookie(token) } : {}),
    },
    body: JSON.stringify(input),
  });
}
beforeAll(async () => {
  if (
    process.env.US002_INTEGRATION !== "authorized-disposable" ||
    process.env.DATABASE_HOST !== "127.0.0.1" ||
    process.env.DATABASE_USER !== "us002_test"
  )
    throw new Error("Ensaio US002 novo autorizado necessario");
  sessionConfig();
  connection = await mysql.createConnection(readDatabaseConfig(process.env));
  other = await mysql.createConnection(readDatabaseConfig(process.env));
  encoded = await hashPassword(password);
  expect(
    String((await rows("SELECT VERSION() version"))[0].version).startsWith(
      "8.4.",
    ),
  ).toBe(true);
  expect(
    Number(
      (
        await rows(
          "SELECT COUNT(*) total FROM information_schema.tables WHERE table_schema='rede_de_apoio' AND table_type='BASE TABLE'",
        )
      )[0].total,
    ),
  ).toBe(34);
  const first = Number((await rows("SELECT CONNECTION_ID() id"))[0].id);
  const second = Number(
    (await other.query<RowDataPacket[]>("SELECT CONNECTION_ID() id"))[0][0].id,
  );
  expect(first !== second).toBe(true);
});
beforeEach(async () => {
  await closeDatabase();
  for (const table of [
    "auditoria",
    "sessao_usuario",
    "convite_cadastro_cuidador",
    "usuario",
    "login_rate_limit",
    "cadastro_rate_limit",
  ])
    await connection.execute(`DELETE FROM ${table}`);
  fault.armed = false;
  fault.destroyed = 0;
  fault.rolledBack = 0;
});
afterAll(async () => {
  await closeDatabase();
  await connection?.end();
  await other?.end();
});
describe("US002 MySQL real descartavel", () => {
  it("limite global real restringe emails distintos e preserva contadores", async () => {
    const outcomes: PromiseSettledResult<void>[] = [];
    // Concorrencia real em lotes dentro da fila limitada (20) do pool; medir quota, nao saturacao.
    for (let offset = 0; offset < 64; offset += 8)
      outcomes.push(
        ...(await Promise.allSettled(
          Array.from({ length: 8 }, (_, i) =>
            limitLoginAttempts(`global-${offset + i}@example.invalid`),
          ),
        )),
      );
    expect(outcomes.filter((r) => r.status === "fulfilled").length).toBe(60);
    expect(await count("login_rate_limit")).toBe(61);
    await closeDatabase();
    await expect(limitLoginAttempts("next@example.invalid")).rejects.toThrow(
      LoginRateLimitError,
    );
  });
  it("revogacao espera lock da conta em outra conexao e permanece efetiva apos desativacao", async () => {
    const id = await fixture();
    const token = await loginAccount(input, null);
    await other.beginTransaction();
    await other.execute(
      "SELECT usuario_id FROM usuario WHERE usuario_id=? FOR UPDATE",
      [id],
    );
    let ended = false;
    const pending = logout(token).finally(() => (ended = true));
    try {
      await pause();
      expect(ended).toBe(false);
      await other.execute("UPDATE usuario SET ativo=FALSE WHERE usuario_id=?", [
        id,
      ]);
      await other.commit();
      await pending;
      expect(await resolveIdentity(token)).toBeNull();
      expect(
        Number(
          (
            await rows(
              "SELECT COUNT(*) total FROM sessao_usuario WHERE revogado_em IS NOT NULL",
            )
          )[0].total,
        ),
      ).toBe(1);
    } finally {
      await other.rollback();
      await pending;
    }
  });

  it("005: indices FK e CHECK de expiracao fisicos", async () => {
    const ddl = String(
      (
        await connection.query<RowDataPacket[]>(
          "SHOW CREATE TABLE sessao_usuario",
        )
      )[0][0]["Create Table"],
    );
    for (const name of [
      "fk_sessao_usuario",
      "ck_sessao_expira",
      "ix_sessao_expira",
      "ix_sessao_usuario",
    ])
      expect(ddl.includes(name)).toBe(true);
    for (const kind of ["fk", "expiry"]) {
      let denied = false;
      try {
        if (kind === "fk")
          await connection.execute(
            "INSERT INTO sessao_usuario VALUES (?,999999,?,UTC_TIMESTAMP(6),TIMESTAMPADD(HOUR,1,UTC_TIMESTAMP(6)),NULL)",
            ["a".repeat(64), "b".repeat(64)],
          );
        else {
          const id = await fixture();
          await connection.execute(
            "INSERT INTO sessao_usuario VALUES (?,?,?,UTC_TIMESTAMP(6),UTC_TIMESTAMP(6),NULL)",
            ["a".repeat(64), id, "b".repeat(64)],
          );
        }
      } catch {
        denied = true;
      }
      expect(denied).toBe(true);
    }
    expect(await count("sessao_usuario")).toBe(0);
  });
  it.each(["CUIDADOR", "PESSOA_IDOSA"])(
    "persistencia de identidade %s sem papeis/vinculos",
    async (category) => {
      const id = await fixture(category);
      const token = await loginAccount(input, null);
      expect((await resolveIdentity(token))?.userId === id).toBe(true);
      expect((await requireIdentity(cookie(token))).category).toBe(category);
      const stored = (
        await rows(
          "SELECT token_hash,credencial_hash, TIMESTAMPDIFF(SECOND,criado_em,expira_em) ttl FROM sessao_usuario",
        )
      )[0];
      expect(stored.token_hash === secretHash(token)).toBe(true);
      expect(stored.credencial_hash === secretHash(encoded)).toBe(true);
      expect(Number(stored.ttl)).toBe(28800);
      for (const table of [
        "membro_rede",
        "atribuicao_papel_familiar",
        "rede_cuidado",
        "plantao",
      ])
        expect(
          Number((await rows(`SELECT COUNT(*) total FROM ${table}`))[0].total),
        ).toBe(0);
      await expect(denyCareAccess(cookie(token))).rejects.toThrow();
      expect(await count("sessao_usuario")).toBe(1);
    },
  );
  it.each(["senha", "ausente", "inativa", "null"])(
    "credenciais %s negam com auditoria independente",
    async (kind) => {
      if (kind !== "ausente")
        await fixture(
          "CUIDADOR",
          email,
          kind === "null" ? null : encoded,
          kind !== "inativa",
        );
      await expect(
        loginAccount(
          { ...input, password: kind === "senha" ? "incorreta" : password },
          null,
        ),
      ).rejects.toThrow(AuthenticationDeniedError);
      expect(await count("sessao_usuario")).toBe(0);
      expect(
        Number(
          (
            await rows(
              "SELECT COUNT(*) total FROM auditoria WHERE operacao='LOGIN' AND resultado='NEGADO'",
            )
          )[0].total,
        ),
      ).toBe(1);
    },
  );
  it.each([
    "expirada",
    "revogada",
    "credencial",
    "inativa",
    "forjada",
    "ausente",
  ])("guarda nega sessao %s", async (kind) => {
    await fixture();
    const token = await loginAccount(input, null);
    if (kind === "expirada")
      await connection.execute(
        "UPDATE sessao_usuario SET criado_em=TIMESTAMPADD(HOUR,-9,UTC_TIMESTAMP(6)),expira_em=TIMESTAMPADD(SECOND,-1,UTC_TIMESTAMP(6))",
      );
    if (kind === "revogada") await logout(token);
    if (kind === "credencial")
      await connection.execute("UPDATE usuario SET senha_hash=?", [
        await hashPassword("outra senha sintetica"),
      ]);
    if (kind === "inativa")
      await connection.execute("UPDATE usuario SET ativo=FALSE");
    await expect(
      requireIdentity(
        kind === "ausente"
          ? null
          : cookie(kind === "forjada" ? "a".repeat(43) : token),
      ),
    ).rejects.toThrow();
  });
  it("logout e repeticao: revogacao persistida, somente um evento", async () => {
    await fixture();
    const token = await loginAccount(input, null);
    await Promise.all([logout(token), logout(token)]);
    expect(await resolveIdentity(token)).toBeNull();
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) total FROM auditoria WHERE operacao='LOGOUT' AND resultado='PERMITIDO'",
          )
        )[0].total,
      ),
    ).toBe(1);
  });
  it("troca de conta preserva sessao de terceiro; rotacao propria revoga somente a propria", async () => {
    await fixture();
    await fixture("CUIDADOR", "other@example.invalid");
    const first = await loginAccount(input, null);
    const second = await loginAccount(
      { email: "other@example.invalid", password },
      first,
    );
    expect((await resolveIdentity(first)) !== null).toBe(true);
    expect((await resolveIdentity(second)) !== null).toBe(true);
    const rotated = await loginAccount(input, first);
    expect(await resolveIdentity(first)).toBeNull();
    expect((await resolveIdentity(second)) !== null).toBe(true);
    expect((await resolveIdentity(rotated)) !== null).toBe(true);
  });
  it("dois logins simultaneos persistem tokens distintos, sem impor sessao unica inventada", async () => {
    await fixture();
    const results = await Promise.allSettled([
      loginAccount(input, null),
      loginAccount(input, null),
    ]);
    expect(results.every((r) => r.status === "fulfilled")).toBe(true);
    const tokens = results.map((r) =>
      r.status === "fulfilled" ? r.value : "",
    );
    expect(tokens[0] !== tokens[1]).toBe(true);
    expect(await count("sessao_usuario")).toBe(2);
    for (const t of tokens)
      expect((await resolveIdentity(t)) !== null).toBe(true);
  });
  it("login/logout concorrentes serializam usuario e sessao", async () => {
    await fixture();
    const old = await loginAccount(input, null);
    const outcomes = await Promise.allSettled([
      loginAccount(input, old),
      logout(old),
    ]);
    expect(outcomes.every((r) => r.status === "fulfilled")).toBe(true);
    const fresh =
      outcomes[0].status === "fulfilled" ? (outcomes[0].value as string) : "";
    expect(await resolveIdentity(old)).toBeNull();
    expect((await resolveIdentity(fresh)) !== null).toBe(true);
  });
  it("duas conexoes: alteracao de conta bloqueia login ate COMMIT e revalidacao nega", async () => {
    const id = await fixture();
    await other.beginTransaction();
    await other.execute(
      "SELECT usuario_id FROM usuario WHERE usuario_id=? FOR UPDATE",
      [id],
    );
    let ended = false;
    const pending = loginAccount(input, null)
      .then(
        () => "allowed",
        () => "denied",
      )
      .finally(() => (ended = true));
    try {
      await pause();
      expect(ended).toBe(false);
      await other.execute("UPDATE usuario SET ativo=FALSE WHERE usuario_id=?", [
        id,
      ]);
      await other.commit();
      expect(await pending).toBe("denied");
      expect(await count("sessao_usuario")).toBe(0);
    } finally {
      await other.rollback();
      await pending;
    }
  });
  it("mudanca de hash durante verificacao impede criacao", async () => {
    await fixture();
    const d = {
      ...loginDependencies,
      verify: async (hash: string | null, value: string) => {
        const valid = await loginDependencies.verify(hash, value);
        await other.execute("UPDATE usuario SET senha_hash=?", [
          await hashPassword("alterada sintética"),
        ]);
        return valid;
      },
    };
    await expect(loginAccount(input, null, d)).rejects.toThrow(
      AuthenticationDeniedError,
    );
    expect(await count("sessao_usuario")).toBe(0);
  });
  it("limites concorrentes persistem e sobrevivem pool novo", async () => {
    const results = await Promise.allSettled(
      Array.from({ length: 8 }, () => limitLoginAttempts(email)),
    );
    expect(results.filter((r) => r.status === "fulfilled").length).toBe(5);
    await closeDatabase();
    await expect(limitLoginAttempts(email)).rejects.toThrow(
      LoginRateLimitError,
    );
  });
  it("buckets antigos removidos, recentes preservados e expiracao da janela permite nova tentativa", async () => {
    await connection.execute(
      "INSERT INTO login_rate_limit VALUES (?,TIMESTAMPADD(DAY,-2,UTC_TIMESTAMP(6)),1),(?,UTC_TIMESTAMP(6),1)",
      ["a".repeat(64), "b".repeat(64)],
    );
    await limitLoginAttempts(email);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) total FROM login_rate_limit WHERE chave=?",
            ["a".repeat(64)],
          )
        )[0].total,
      ),
    ).toBe(0);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) total FROM login_rate_limit WHERE chave=?",
            ["b".repeat(64)],
          )
        )[0].total,
      ),
    ).toBe(1);
    for (let i = 0; i < 4; i++) await limitLoginAttempts(email);
    await expect(limitLoginAttempts(email)).rejects.toThrow();
    await connection.execute(
      "UPDATE login_rate_limit SET janela_em=TIMESTAMPADD(HOUR,-1,UTC_TIMESTAMP(6))",
    );
    await limitLoginAttempts(email);
  });
  it("CSRF e Origin invalida auditam sem criar sessao/cookie", async () => {
    await fixture();
    for (const origin of [null, "https://evil.example.invalid"]) {
      const response = await loginPOST(request("login", origin));
      expect(response.status).toBe(403);
      expect(response.headers.has("set-cookie")).toBe(false);
    }
    expect(await count("sessao_usuario")).toBe(0);
    expect(await count("auditoria")).toBe(2);
  });
  it("falha real de auditoria (tabela renomeada no ensaio) faz rollback da sessao e nega cookie", async () => {
    await fixture();
    await connection.execute(
      "RENAME TABLE auditoria TO auditoria_test_unavailable",
    );
    try {
      const r = await loginPOST(request());
      expect(r.status).toBe(503);
      expect(r.headers.has("set-cookie")).toBe(false);
      expect(await count("sessao_usuario")).toBe(0);
    } finally {
      await connection.execute(
        "RENAME TABLE auditoria_test_unavailable TO auditoria",
      );
    }
  });
  it("rollback real de revogacao quando auditoria indisponivel", async () => {
    await fixture();
    const token = await loginAccount(input, null);
    await connection.execute(
      "RENAME TABLE auditoria TO auditoria_test_unavailable",
    );
    try {
      const r = await logoutPOST(
        request("logout", "http://127.0.0.1:3100", token),
      );
      expect(r.status).toBe(503);
      expect(r.headers.has("set-cookie")).toBe(false);
      expect((await resolveIdentity(token)) !== null).toBe(true);
    } finally {
      await connection.execute(
        "RENAME TABLE auditoria_test_unavailable TO auditoria",
      );
    }
  });
  it("COMMIT real com confirmacao injetada perdida: nenhum token retornado ou INSERT repetido", async () => {
    await fixture();
    const d = {
      ...loginDependencies,
      persist: async (
        ...args: Parameters<typeof loginDependencies.persist>
      ) => {
        fault.armed = true;
        return loginDependencies.persist(...args);
      },
    };
    let returned = false;
    await expect(
      loginAccount(input, null, d).then(() => (returned = true)),
    ).rejects.toThrow(TransactionOutcomeUnknownError);
    expect(returned).toBe(false);
    expect(await count("sessao_usuario")).toBe(1);
    expect(fault.destroyed).toBe(1);
    expect(fault.rolledBack).toBe(0);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) total FROM auditoria WHERE operacao='LOGIN' AND resultado='PERMITIDO'",
          )
        )[0].total,
      ),
    ).toBe(1);
  });
  it("COMMIT real de logout sem confirmacao: repeticao nao duplica efeito", async () => {
    await fixture();
    const token = await loginAccount(input, null);
    fault.armed = true;
    await expect(logout(token)).rejects.toThrow(TransactionOutcomeUnknownError);
    await logout(token);
    expect(await resolveIdentity(token)).toBeNull();
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) total FROM auditoria WHERE operacao='LOGOUT'",
          )
        )[0].total,
      ),
    ).toBe(1);
  });
  it("sanitizacao da auditoria nao armazena senha, token, email ou hashes", async () => {
    await fixture();
    const token = await loginAccount(input, null);
    await expect(
      loginAccount({ ...input, password: "errada" }, null),
    ).rejects.toThrow();
    const audit = JSON.stringify(
      await rows(
        "SELECT operacao,recurso_tipo,detalhe_sanitizado,categoria_snapshot,resultado FROM auditoria",
      ),
    );
    for (const secret of [password, token, encoded, secretHash(token), email])
      expect(audit.includes(secret)).toBe(false);
  });
  it("banco indisponivel de verdade (porta local fechada) falha sem cookie", async () => {
    await closeDatabase();
    const original = process.env.DATABASE_PORT;
    process.env.DATABASE_PORT = "1";
    try {
      const r = await loginPOST(request());
      expect(r.status).toBe(503);
      expect(r.headers.has("set-cookie")).toBe(false);
    } finally {
      await closeDatabase();
      process.env.DATABASE_PORT = original;
    }
  });
});
