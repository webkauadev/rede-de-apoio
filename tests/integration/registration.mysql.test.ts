import { spawnSync } from "node:child_process";
import { mkdtemp, rm, writeFile, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";
import mysql, { type Connection, type RowDataPacket } from "mysql2/promise";
import { verify } from "argon2";
vi.mock("server-only", () => ({}));
const commitFault = vi.hoisted(() => ({
  next: false,
  destroyed: 0,
  rollback: 0,
}));
vi.mock("mysql2/promise", async (importOriginal) => {
  const actual = await importOriginal<typeof import("mysql2/promise")>();
  return {
    ...actual,
    createPool: (...args: Parameters<typeof actual.createPool>) => {
      const pool = actual.createPool(...args);
      const acquire = pool.getConnection.bind(pool);
      pool.getConnection = async () => {
        const connection = await acquire();
        if (commitFault.next) {
          commitFault.next = false;
          const commit = connection.commit.bind(connection);
          const destroy = connection.destroy.bind(connection);
          const rollback = connection.rollback.bind(connection);
          connection.commit = async () => {
            await commit();
            throw new Error(
              "Confirmacao de COMMIT perdida: falha injetada apos commit real",
            );
          };
          connection.destroy = () => {
            commitFault.destroyed++;
            destroy();
          };
          connection.rollback = async () => {
            commitFault.rollback++;
            await rollback();
          };
        }
        return connection;
      };
      return pool;
    },
  };
});
import { readDatabaseConfig } from "@/server/db/config";
import {
  closeDatabase,
  database,
  TransactionOutcomeUnknownError,
  withTransaction,
} from "@/server/db";
import {
  BOOTSTRAP_LOCK,
  createInvitationToken,
  issueBootstrapInvitation,
  revokeBootstrapInvitation,
  tokenHash,
  requireInvitation,
} from "@/server/auth/invitations";
import {
  registerAccount,
  registrationDependencies,
} from "@/server/auth/registration";
import { limitRegistrationAttempts } from "@/server/security/registration-rate-limit";
import { assertLocalRegistrationEnvironment } from "@/server/security/registration-environment";

let connection: Connection;
const email = "synthetic@example.invalid";
const input = (token: string) => ({
  invitationToken: token,
  name: "Conta sintética",
  email,
  password: "senha sintética",
  confirmPassword: "senha sintética",
});
async function rows(sql: string, parameters: (string | number)[] = []) {
  return (await connection.execute<RowDataPacket[]>(sql, parameters))[0];
}
async function total(
  table:
    | "usuario"
    | "convite_cadastro_cuidador"
    | "membro_rede"
    | "atribuicao_papel_familiar"
    | "rede_cuidado"
    | "plantao"
    | "auditoria",
) {
  return Number(
    (await rows(`SELECT COUNT(*) AS total FROM ${table}`))[0].total,
  );
}
beforeAll(async () => {
  if (process.env.US001_INTEGRATION !== "authorized-disposable")
    throw new Error(
      "Integração exige ambiente descartável explicitamente autorizado.",
    );
  assertLocalRegistrationEnvironment();
  connection = await mysql.createConnection(readDatabaseConfig(process.env));
  expect(
    String((await rows("SELECT VERSION() AS version"))[0].version).startsWith(
      "8.4.",
    ),
  ).toBe(true);
  expect(
    Number(
      (
        await rows(
          "SELECT COUNT(*) AS total FROM information_schema.tables WHERE table_schema = 'rede_de_apoio' AND table_type = 'BASE TABLE'",
        )
      )[0].total,
    ),
  ).toBe(32);
  for (const table of [
    "membro_rede",
    "atribuicao_papel_familiar",
    "rede_cuidado",
    "plantao",
  ] as const)
    expect(await total(table)).toBe(0);
});
beforeEach(async () => {
  await connection.execute("DELETE FROM auditoria");
  await connection.execute("DELETE FROM convite_cadastro_cuidador");
  await connection.execute("DELETE FROM usuario");
  await connection.execute("DELETE FROM cadastro_rate_limit");
});
afterAll(async () => {
  await closeDatabase();
  await connection?.end();
});
describe("MySQL 8.4 real: identidade por convite", () => {
  it("persiste Argon2id, consumo unico e auditoria; nenhum vinculo/papel", async () => {
    const token = await issueBootstrapInvitation(email);
    await registerAccount(input(token));
    const user = (await rows("SELECT * FROM usuario"))[0];
    expect(user.email_normalizado).toBe(email);
    expect(user.tipo_acesso).toBe("CUIDADOR");
    expect(await verify(user.senha_hash, input(token).password)).toBe(true);
    expect(user.senha_hash.startsWith("$argon2id$")).toBe(true);
    const invite = (await rows("SELECT * FROM convite_cadastro_cuidador"))[0];
    expect(invite.usado_em !== null).toBe(true);
    expect(invite.token_hash).toBe(tokenHash(token));
    expect(JSON.stringify(invite).includes(token)).toBe(false);
    for (const table of [
      "membro_rede",
      "atribuicao_papel_familiar",
      "rede_cuidado",
      "plantao",
    ] as const)
      expect(await total(table)).toBe(0);
    expect(
      (
        await rows(
          "SELECT resultado, categoria_snapshot, papeis_snapshot FROM auditoria",
        )
      )[0],
    ).toMatchObject({
      resultado: "PERMITIDO",
      categoria_snapshot: "CUIDADOR",
      papeis_snapshot: null,
    });
    await expect(
      issueBootstrapInvitation("other@example.invalid"),
    ).rejects.toThrow();
  });
  it("duas requisicoes concorrentes, mesmo convite/email: uma conta e um consumo", async () => {
    const token = await issueBootstrapInvitation(email);
    const results = await Promise.allSettled([
      registerAccount(input(token)),
      registerAccount({
        ...input(token),
        email: " SYNTHETIC@EXAMPLE.INVALID ",
      }),
    ]);
    expect(
      results.filter((result) => result.status === "fulfilled").length,
    ).toBe(1);
    expect(await total("usuario")).toBe(1);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) AS total FROM convite_cadastro_cuidador WHERE usado_em IS NOT NULL",
          )
        )[0].total,
      ),
    ).toBe(1);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) AS total FROM auditoria WHERE resultado = 'PERMITIDO'",
          )
        )[0].total,
      ),
    ).toBe(1);
    await expect(registerAccount(input(token))).rejects.toThrow();
    expect(await total("usuario")).toBe(1);
  });
  it("FOR UPDATE bloqueia uma segunda conexao ate liberar a primeira", async () => {
    const token = await issueBootstrapInvitation(email);
    const second = await mysql.createConnection(
      readDatabaseConfig(process.env),
    );
    try {
      const firstId = (await rows("SELECT CONNECTION_ID() AS id"))[0].id;
      const secondId = (
        await second.query<RowDataPacket[]>("SELECT CONNECTION_ID() AS id")
      )[0][0].id;
      expect(firstId).not.toBe(secondId);
      await connection.beginTransaction();
      await connection.execute(
        "SELECT convite_id FROM convite_cadastro_cuidador WHERE token_hash = ? FOR UPDATE",
        [tokenHash(token)],
      );
      await second.beginTransaction();
      let completed = false;
      const waiting = second
        .execute(
          "SELECT convite_id FROM convite_cadastro_cuidador WHERE token_hash = ? FOR UPDATE",
          [tokenHash(token)],
        )
        .then(() => {
          completed = true;
        });
      await new Promise((resolve) => setTimeout(resolve, 100));
      expect(completed).toBe(false);
      await connection.commit();
      await waiting;
      await second.rollback();
    } finally {
      await connection.rollback();
      await second.end();
    }
  });
  it.each(["wrong-token", "wrong-email", "revoked", "expired"])(
    "nega %s antes de Argon2 e mantem auditoria NEGADO",
    async (kind) => {
      const token = await issueBootstrapInvitation(email);
      if (kind === "revoked") await revokeBootstrapInvitation();
      if (kind === "expired")
        await connection.execute(
          "UPDATE convite_cadastro_cuidador SET criado_em = TIMESTAMPADD(DAY,-2,UTC_TIMESTAMP(6)), expira_em = TIMESTAMPADD(DAY,-1,UTC_TIMESTAMP(6))",
        );
      const hash = vi.fn(registrationDependencies.hashPassword);
      const data = {
        ...input(kind === "wrong-token" ? createInvitationToken() : token),
        email: kind === "wrong-email" ? "other@example.invalid" : email,
      };
      await expect(
        registerAccount(data, {
          ...registrationDependencies,
          hashPassword: hash,
        }),
      ).rejects.toThrow();
      expect(hash).not.toHaveBeenCalled();
      expect(await total("usuario")).toBe(0);
      expect(
        Number(
          (
            await rows(
              "SELECT COUNT(*) AS total FROM auditoria WHERE resultado = 'NEGADO'",
            )
          )[0].total,
        ),
      ).toBe(1);
    },
  );
  it("UNIQUE de usuario causa rollback de convite e nao cria auditoria PERMITIDO", async () => {
    const token = await issueBootstrapInvitation(email);
    await connection.execute(
      "INSERT INTO usuario (nome,email_normalizado,senha_hash,tipo_acesso) VALUES ('Fixture',?,'fixture','CUIDADOR')",
      [email],
    );
    await expect(registerAccount(input(token))).rejects.toThrow();
    expect(await total("usuario")).toBe(1);
    expect(
      (await rows("SELECT usado_em FROM convite_cadastro_cuidador"))[0]
        .usado_em,
    ).toBeNull();
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) AS total FROM auditoria WHERE resultado='PERMITIDO'",
          )
        )[0].total,
      ),
    ).toBe(0);
  });
  it("falha depois do consumo reverte usuario, convite e auditoria juntos", async () => {
    const token = await issueBootstrapInvitation(email);
    await expect(
      registerAccount(input(token), {
        ...registrationDependencies,
        transaction: (operation) =>
          withTransaction(async (sql) => {
            await operation(sql);
            throw new Error("Falha sintetica apos consumo");
          }),
      }),
    ).rejects.toThrow();
    expect(await total("usuario")).toBe(0);
    expect(await total("auditoria")).toBe(0);
    expect(
      (await rows("SELECT usado_em FROM convite_cadastro_cuidador"))[0]
        .usado_em,
    ).toBeNull();
  });
  it("COMMIT confirmado no MySQL com confirmacao perdida simulada: reconcilia sem reinsert", async () => {
    const token = await issueBootstrapInvitation(email);
    const transaction = vi.fn(
      async (
        operation: (sql: typeof database) => Promise<void>,
      ): Promise<void> => {
        await withTransaction(operation);
        throw new TransactionOutcomeUnknownError();
      },
    );
    await registerAccount(input(token), {
      ...registrationDependencies,
      transaction,
    });
    expect(transaction).toHaveBeenCalledOnce();
    expect(await total("usuario")).toBe(1);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) AS total FROM auditoria WHERE resultado='PERMITIDO'",
          )
        )[0].total,
      ),
    ).toBe(1);
  });
  it("driver real confirma COMMIT e perde resposta injetada: destroi conexao e reconcilia", async () => {
    const token = await issueBootstrapInvitation(email);
    commitFault.destroyed = 0;
    commitFault.rollback = 0;
    await registerAccount(input(token), {
      ...registrationDependencies,
      transaction: async (operation) => {
        commitFault.next = true;
        await withTransaction(operation, BOOTSTRAP_LOCK);
      },
    });
    expect(commitFault.destroyed).toBe(1);
    expect(commitFault.rollback).toBe(0);
    expect(await total("usuario")).toBe(1);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) AS total FROM auditoria WHERE resultado='PERMITIDO'",
          )
        )[0].total,
      ),
    ).toBe(1);
  });
  it("COMMIT incerto sem efeito confirmado nunca declara sucesso", async () => {
    const token = await issueBootstrapInvitation(email);
    await expect(
      registerAccount(input(token), {
        ...registrationDependencies,
        transaction: async () => {
          throw new TransactionOutcomeUnknownError();
        },
      }),
    ).rejects.toBeInstanceOf(TransactionOutcomeUnknownError);
    expect(await total("usuario")).toBe(0);
  });
  it("bootstrap concorrente emite somente um convite aberto; reemissao exige revogacao", async () => {
    const results = await Promise.allSettled([
      issueBootstrapInvitation(email),
      issueBootstrapInvitation("second@example.invalid"),
    ]);
    expect(
      results.filter((result) => result.status === "fulfilled").length,
    ).toBe(1);
    expect(await total("convite_cadastro_cuidador")).toBe(1);
    await expect(issueBootstrapInvitation(email)).rejects.toThrow();
    await issueBootstrapInvitation(email, true);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) AS total FROM convite_cadastro_cuidador WHERE bootstrap_aberto=1",
          )
        )[0].total,
      ),
    ).toBe(1);
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) AS total FROM convite_cadastro_cuidador WHERE revogado_em IS NOT NULL",
          )
        )[0].total,
      ),
    ).toBe(1);
  });
  it("indices unicos de token/email/bootstrapping realmente rejeitam colisao", async () => {
    const token = await issueBootstrapInvitation(email);
    for (const [target, digest] of [
      [email, tokenHash(createInvitationToken())],
      ["other@example.invalid", tokenHash(token)],
      ["other@example.invalid", tokenHash(createInvitationToken())],
    ]) {
      const result = await connection
        .execute(
          "INSERT INTO convite_cadastro_cuidador (email_normalizado,token_hash,origem_emissao,expira_em) VALUES (?,?,'OPERADOR_BOOTSTRAP',TIMESTAMPADD(HOUR,24,UTC_TIMESTAMP(6)))",
          [target, digest],
        )
        .then(
          () => "unexpected",
          (error: { code: string }) => error.code,
        );
      expect(result).toBe("ER_DUP_ENTRY");
    }
  });
  it("rate limit persistente suporta processos/conexoes, janela UTC e corrida", async () => {
    const key = tokenHash(createInvitationToken());
    const attempts = await Promise.allSettled(
      Array.from({ length: 8 }, () => limitRegistrationAttempts(key)),
    );
    expect(
      attempts.filter((result) => result.status === "fulfilled").length,
    ).toBe(5);
    await closeDatabase(); // Novo pool/processo nao zera contador.
    await expect(limitRegistrationAttempts(key)).rejects.toThrow();
    await connection.execute(
      "UPDATE cadastro_rate_limit SET janela_em=TIMESTAMPADD(HOUR,-1,UTC_TIMESTAMP(6))",
    );
    await expect(limitRegistrationAttempts(key)).resolves.toBeUndefined();
    for (let i = 0; i < 29; i++)
      await limitRegistrationAttempts(tokenHash(createInvitationToken()));
    await expect(
      limitRegistrationAttempts(tokenHash(createInvitationToken())),
    ).rejects.toThrow();
  });
  it("preflight sem token elegivel nao cria efeitos no executor real", async () => {
    await expect(
      requireInvitation(database, tokenHash(createInvitationToken()), email),
    ).rejects.toThrow();
    expect(await total("usuario")).toBe(0);
  });
  it("CLI nao sobrescreve arquivo e exige confirmacao local e diretorio privado", async () => {
    const dir = await mkdtemp(join(tmpdir(), "us001-cli-private-"));
    const file = join(dir, "reserved");
    await writeFile(file, "reserved-marker", { mode: 0o600 });
    const execute = (args: string[]) =>
      spawnSync(
        process.execPath,
        [
          "--conditions=react-server",
          "--import",
          "tsx",
          "scripts/invite-bootstrap.ts",
          "--email",
          email,
          ...args,
        ],
        { encoding: "utf8", env: process.env },
      );
    try {
      expect(
        execute(["--token-file", join(dir, "without-confirmation")]).status,
      ).toBe(1);
      expect(
        execute(["--confirm-local-disposable", "--token-file", file]).status,
      ).toBe(1);
      expect(await readFile(file, "utf8")).toBe("reserved-marker");
      expect(
        execute([
          "--confirm-local-disposable",
          "--token-file",
          join(tmpdir(), "us001-forbidden-global-output"),
        ]).status,
      ).toBe(1);
      expect(await total("convite_cadastro_cuidador")).toBe(0);
    } finally {
      await rm(dir, { recursive: true });
    }
  });
  it("convite vencido ocupa unico aberto ate revogacao explicita", async () => {
    await issueBootstrapInvitation(email);
    await connection.execute(
      "UPDATE convite_cadastro_cuidador SET criado_em=TIMESTAMPADD(DAY,-2,UTC_TIMESTAMP(6)), expira_em=TIMESTAMPADD(DAY,-1,UTC_TIMESTAMP(6))",
    );
    await expect(issueBootstrapInvitation(email)).rejects.toThrow();
    await expect(issueBootstrapInvitation(email, true)).resolves.toBeTypeOf(
      "string",
    );
    expect(
      Number(
        (
          await rows(
            "SELECT COUNT(*) AS total FROM convite_cadastro_cuidador WHERE bootstrap_aberto=1",
          )
        )[0].total,
      ),
    ).toBe(1);
  });
});
