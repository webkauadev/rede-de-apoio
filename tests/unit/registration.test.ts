import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { verify } from "argon2";
vi.mock("server-only", () => ({}));
const driver = vi.hoisted(() => ({ createPool: vi.fn() }));
vi.mock("mysql2/promise", () => ({ createPool: driver.createPool }));
import { registrationSchema } from "@/domains/auth/registration/schema";
import { hashPassword } from "@/server/auth/password";
import {
  accountRepository,
  authorizeRegistration,
  registerAccount,
  RegistrationAuthorizationPendingError,
  RegistrationConflictError,
} from "@/server/auth/registration";
import {
  DatabaseConflictError,
  DatabaseUnavailableError,
  type SqlExecutor,
} from "@/server/db";
import { POST } from "@/app/api/auth/cadastro/route";

const valid = {
  name: "  Conta sintética  ",
  email: "  TESTE@EXAMPLE.INVALID ",
  password: " senha sintética ",
  confirmPassword: " senha sintética ",
};
function dependencies() {
  return {
    authorize: vi.fn(async () => {}),
    hashPassword: vi.fn(async () => "$argon2id$synthetic"),
    accounts: { create: vi.fn(async () => {}) },
  };
}
function request(
  body: unknown,
  origin: string | null = "http://localhost:3000",
) {
  return new Request("http://localhost:3000/api/auth/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(origin ? { Origin: origin } : {}),
    },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("APPLICATION_ORIGIN", "");
});
afterEach(() => vi.unstubAllEnvs());
describe("contrato de cadastro", () => {
  it("normaliza nome/e-mail e preserva a senha byte a byte", () => {
    expect(registrationSchema.parse(valid)).toEqual({
      ...valid,
      name: "Conta sintética",
      email: "teste@example.invalid",
    });
  });
  it.each([
    { ...valid, name: " " },
    { ...valid, name: "a".repeat(161) },
    { ...valid, email: "inválido" },
    { ...valid, email: "a".repeat(255) },
    { ...valid, password: "", confirmPassword: "" },
    { ...valid, confirmPassword: "diferente" },
    { ...valid, password: "á".repeat(513), confirmPassword: "á".repeat(513) },
    { ...valid, role: "PRINCIPAL" },
    { ...valid, tipo_acesso: "PESSOA_IDOSA" },
    { ...valid, rede_id: 1 },
  ])(
    "rejeita entrada inválida ou tentativa de atribuição de privilégio %#",
    (input) => {
      expect(registrationSchema.safeParse(input).success).toBe(false);
    },
  );
  it("não inventa política de composição ou mínimo de oito caracteres", () => {
    expect(
      registrationSchema.safeParse({
        ...valid,
        password: "x",
        confirmPassword: "x",
      }).success,
    ).toBe(true);
  });
});
describe("Argon2id real", () => {
  it("gera salts distintos e verifica sem armazenar plaintext", async () => {
    const [first, second] = await Promise.all([
      hashPassword(valid.password),
      hashPassword(valid.password),
    ]);
    expect(first.split("$").slice(1, 3)).toEqual(["argon2id", "v=19"]);
    expect(new Set(first.split("$")[3].split(","))).toEqual(
      new Set(["m=19456", "t=2", "p=1"]),
    );
    expect(first).not.toEqual(second);
    expect(first).not.toContain(valid.password);
    expect(first.length).toBeLessThanOrEqual(255);
    expect(await verify(first, valid.password)).toBe(true);
    expect(await verify(first, "incorreta")).toBe(false);
  });
});
describe("serviço sem concessão de privilégios", () => {
  it("nega no resolver oficial antes de hash/persistência", async () => {
    const deps = dependencies();
    deps.authorize = vi.fn(authorizeRegistration);
    await expect(registerAccount(valid, deps)).rejects.toBeInstanceOf(
      RegistrationAuthorizationPendingError,
    );
    expect(deps.hashPassword).not.toHaveBeenCalled();
    expect(deps.accounts.create).not.toHaveBeenCalled();
  });
  it("valida novamente no servidor e não chama autorização com DTO adulterado", async () => {
    const deps = dependencies();
    await expect(
      registerAccount({ ...valid, admin: true }, deps),
    ).rejects.toThrow();
    expect(deps.authorize).not.toHaveBeenCalled();
  });
  it("prepara uma identidade somente após autorização injetada em teste", async () => {
    const deps = dependencies();
    await registerAccount(valid, deps);
    expect(deps.authorize).toHaveBeenCalledWith("teste@example.invalid");
    expect(deps.accounts.create).toHaveBeenCalledExactlyOnceWith({
      name: "Conta sintética",
      email: "teste@example.invalid",
      passwordHash: "$argon2id$synthetic",
    });
    expect(deps.hashPassword).toHaveBeenCalledWith(valid.password);
  });
});
describe("repositório SQL (executor simulado, não integração MySQL)", () => {
  function sql() {
    return {
      select: vi.fn(),
      execute: vi.fn().mockResolvedValue({ affectedRows: 1 }),
    } as unknown as SqlExecutor;
  }
  const account = {
    name: "Conta sintética",
    email: "teste@example.invalid",
    passwordHash: "$argon2id$synthetic",
  };
  it("faz apenas INSERT parametrizado de CUIDADOR, sem persistir senha ou confirmação", async () => {
    const executor = sql();
    await accountRepository(executor).create(account);
    expect(executor.execute).toHaveBeenCalledExactlyOnceWith(
      "INSERT INTO usuario (nome, email_normalizado, senha_hash, tipo_acesso) VALUES (?, ?, ?, 'CUIDADOR')",
      [account.name, account.email, account.passwordHash],
    );
    expect(executor.select).not.toHaveBeenCalled();
  });
  it("saneia conflito da restrição UNIQUE sem consultar e depois inserir", async () => {
    const executor = sql();
    vi.mocked(executor.execute).mockRejectedValue(new DatabaseConflictError());
    await expect(
      accountRepository(executor).create(account),
    ).rejects.toBeInstanceOf(RegistrationConflictError);
    expect(executor.execute).toHaveBeenCalledTimes(1);
  });
  it("não repete automaticamente falhas", async () => {
    const executor = sql();
    vi.mocked(executor.execute).mockRejectedValue(
      new DatabaseUnavailableError(),
    );
    await expect(
      accountRepository(executor).create(account),
    ).rejects.toBeInstanceOf(DatabaseUnavailableError);
    expect(executor.execute).toHaveBeenCalledTimes(1);
  });
  it("trata duas chamadas com resultado UNIQUE simulado; concorrência real continua pendente", async () => {
    const executor = sql();
    vi.mocked(executor.execute)
      .mockResolvedValueOnce({ affectedRows: 1 } as Awaited<
        ReturnType<SqlExecutor["execute"]>
      >)
      .mockRejectedValueOnce(new DatabaseConflictError());
    const results = await Promise.allSettled([
      accountRepository(executor).create(account),
      accountRepository(executor).create(account),
    ]);
    expect(results.map((result) => result.status)).toEqual([
      "fulfilled",
      "rejected",
    ]);
    expect((results[1] as PromiseRejectedResult).reason).toBeInstanceOf(
      RegistrationConflictError,
    );
  });
});
describe("handler real: fechado sem decisão de autorização e sem MySQL", () => {
  it("nega payload válido sem cookies nem indicação de conta criada", async () => {
    const result = await POST(request(valid));
    expect(result.status).toBe(403);
    expect(result.headers.get("set-cookie")).toBeNull();
    expect(driver.createPool).not.toHaveBeenCalled();
    expect(result.headers.get("cache-control")).toBe("no-store");
    expect(await result.json()).toEqual({
      message: new RegistrationAuthorizationPendingError().message,
    });
  });
  it.each([null, "https://evil.example.invalid", "null"])(
    "nega origem %s",
    async (origin) => {
      expect((await POST(request(valid, origin))).status).toBe(403);
    },
  );
  it("rejeita atribuição de papel e preserva mensagens sem payload", async () => {
    const result = await POST(request({ ...valid, role: "ADMIN" }));
    expect(result.status).toBe(422);
    expect(JSON.stringify(await result.json())).not.toContain(valid.password);
  });
  it("rejeita corpo excessivo", async () => {
    expect(
      (await POST(request({ ...valid, name: "x".repeat(9000) }))).status,
    ).toBe(400);
  });
  it("rejeita JSON malformado e media type", async () => {
    const malformed = new Request("http://localhost:3000/api/auth/cadastro", {
      method: "POST",
      headers: {
        Origin: "http://localhost:3000",
        "Content-Type": "application/json",
      },
      body: "{",
    });
    expect((await POST(malformed)).status).toBe(400);
    const type = new Request("http://localhost:3000/api/auth/cadastro", {
      method: "POST",
      headers: { Origin: "http://localhost:3000" },
      body: "text",
    });
    expect((await POST(type)).status).toBe(415);
  });
});

describe("origem pública configurada", () => {
  it("valida origem externa mesmo com URL interna diferente", async () => {
    vi.stubEnv("APPLICATION_ORIGIN", "https://app.example.invalid");
    expect(
      (await POST(request(valid, "https://app.example.invalid"))).status,
    ).toBe(403);
    const result = await POST(request(valid, "https://app.example.invalid"));
    expect(await result.json()).toEqual({
      message: new RegistrationAuthorizationPendingError().message,
    });
  });
  it.each([
    "https://app.example.invalid/path",
    "https://user:password@app.example.invalid",
    "invalid",
  ])("nega configuração de origem inválida %s", async (origin) => {
    vi.stubEnv("APPLICATION_ORIGIN", origin);
    const result = await POST(request(valid));
    expect(await result.json()).toEqual({
      message: "Solicitação não autorizada.",
    });
  });
});
