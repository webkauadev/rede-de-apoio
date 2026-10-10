import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { verify } from "argon2";
vi.mock("server-only", () => ({}));
const driver = vi.hoisted(() => ({ createPool: vi.fn() }));
vi.mock("mysql2/promise", () => ({ createPool: driver.createPool }));
import { registrationSchema } from "@/domains/auth/registration/schema";
import { hashPassword } from "@/server/auth/password";
import {
  accountRepository,
  registerAccount,
  RegistrationConflictError,
  type RegistrationDependencies,
} from "@/server/auth/registration";
import {
  createInvitationToken,
  tokenHash,
  requireInvitation,
  InvitationRejectedError,
} from "@/server/auth/invitations";
import { RegistrationRateLimitError } from "@/server/security/registration-rate-limit";
import {
  DatabaseConflictError,
  TransactionOutcomeUnknownError,
  type SqlExecutor,
} from "@/server/db";
import { POST } from "@/app/api/auth/cadastro/route";
const valid = {
  invitationToken: "a".repeat(43),
  name: "  Conta sintética  ",
  email: "  TESTE@EXAMPLE.INVALID ",
  password: " senha sintética ",
  confirmPassword: " senha sintética ",
};
const invite = {
  convite_id: "1",
  email_normalizado: "teste@example.invalid",
  usado_em: null,
  revogado_em: null,
  vigente: 1,
};
function sql() {
  return {
    select: vi.fn().mockResolvedValue([invite]),
    execute: vi.fn().mockResolvedValue({ affectedRows: 1 }),
  } as unknown as SqlExecutor;
}
function deps(executor = sql()): RegistrationDependencies {
  return {
    limitAttempts: vi.fn(async () => {}),
    preflight: vi.fn(async () => invite),
    hashPassword: vi.fn(async () => "$argon2id$synthetic"),
    transaction: vi.fn(async (operation) => operation(executor)),
    reconcile: vi.fn(async () => false),
    auditDenied: vi.fn(async () => {}),
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
  vi.stubEnv("APPLICATION_ORIGIN", "http://localhost:3000");
  vi.stubEnv("REGISTRATION_ENVIRONMENT", "");
});
afterEach(() => vi.unstubAllEnvs());
describe("contrato estrito", () => {
  it("normaliza identidade e preserva senha/token", () => {
    expect(registrationSchema.parse(valid)).toEqual({
      ...valid,
      name: "Conta sintética",
      email: "teste@example.invalid",
    });
  });
  it.each([
    { ...valid, name: " " },
    { ...valid, name: "a".repeat(161) },
    { ...valid, email: "invalido" },
    { ...valid, email: "a".repeat(255) },
    { ...valid, password: "", confirmPassword: "" },
    { ...valid, confirmPassword: "outra" },
    { ...valid, password: "á".repeat(513), confirmPassword: "á".repeat(513) },
    { ...valid, invitationToken: "" },
    { ...valid, invitationToken: "a".repeat(42) },
    { ...valid, role: "PRINCIPAL" },
    { ...valid, tipo_acesso: "PESSOA_IDOSA" },
    { ...valid, authorized: true },
    { ...valid, invite_issuer: 1 },
  ])("rejeita entrada ou privilegio adulterado %#", (input) => {
    expect(registrationSchema.safeParse(input).success).toBe(false);
  });
  it("nao inventa composicao de senha", () => {
    expect(
      registrationSchema.safeParse({
        ...valid,
        password: "x",
        confirmPassword: "x",
      }).success,
    ).toBe(true);
  });
});
it("Argon2id real: salt aleatorio, parametros, senha verificavel", async () => {
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
it("token CSPRNG de 32 bytes com SHA256, sem persistir bruto", () => {
  const first = createInvitationToken();
  const second = createInvitationToken();
  expect(first.length).toBe(43);
  expect(first === second).toBe(false);
  expect(Buffer.from(first, "base64url").length).toBe(32);
  expect(tokenHash(first).length).toBe(64);
});
it.each([
  undefined,
  { ...invite, vigente: 0 },
  { ...invite, vigente: "0" },
  { ...invite, revogado_em: "date" },
  { ...invite, usado_em: "date" },
  { ...invite, email_normalizado: "other@example.invalid" },
])("convite invalido antes do hash %#", async (row) => {
  const executor = sql();
  vi.mocked(executor.select).mockResolvedValue((row ? [row] : []) as never);
  await expect(
    requireInvitation(executor, "hash", "teste@example.invalid"),
  ).rejects.toBeInstanceOf(InvitationRejectedError);
});
it("limite antes de validar convite/Argon2", async () => {
  const dependencies = deps();
  vi.mocked(dependencies.limitAttempts).mockRejectedValue(
    new RegistrationRateLimitError(),
  );
  await expect(registerAccount(valid, dependencies)).rejects.toBeInstanceOf(
    RegistrationRateLimitError,
  );
  expect(dependencies.preflight).not.toHaveBeenCalled();
  expect(dependencies.hashPassword).not.toHaveBeenCalled();
});
it("preflight nega antes de Argon2 e registra DENY independente", async () => {
  const dependencies = deps();
  vi.mocked(dependencies.preflight).mockRejectedValue(
    new InvitationRejectedError(),
  );
  await expect(registerAccount(valid, dependencies)).rejects.toBeInstanceOf(
    InvitationRejectedError,
  );
  expect(dependencies.hashPassword).not.toHaveBeenCalled();
  expect(dependencies.transaction).not.toHaveBeenCalled();
  expect(dependencies.auditDenied).toHaveBeenCalledOnce();
});
it("cria somente CUIDADOR, lock, consumo e auditoria na mesma transacao", async () => {
  const executor = sql();
  await registerAccount(valid, deps(executor));
  expect(executor.select).toHaveBeenCalledWith(
    expect.stringContaining("FOR UPDATE"),
    [tokenHash(valid.invitationToken)],
  );
  expect(executor.execute).toHaveBeenCalledWith(
    "INSERT INTO usuario (nome, email_normalizado, senha_hash, tipo_acesso) VALUES (?, ?, ?, 'CUIDADOR')",
    ["Conta sintética", "teste@example.invalid", "$argon2id$synthetic"],
  );
  expect(executor.execute).toHaveBeenCalledTimes(3); // usuario, consumo, auditoria. Zero rede/papeis.
});
it("mudanca de convite entre preflight e transacao nega insercao", async () => {
  const executor = sql();
  vi.mocked(executor.select).mockResolvedValue([
    { ...invite, usado_em: "date" },
  ] as never);
  await expect(registerAccount(valid, deps(executor))).rejects.toBeInstanceOf(
    InvitationRejectedError,
  );
  expect(executor.execute).not.toHaveBeenCalled();
});
it("consumo precisa alterar exatamente uma linha", async () => {
  const executor = sql();
  vi.mocked(executor.execute)
    .mockResolvedValueOnce({ affectedRows: 1 } as never)
    .mockResolvedValueOnce({ affectedRows: 0 } as never);
  await expect(registerAccount(valid, deps(executor))).rejects.toBeInstanceOf(
    InvitationRejectedError,
  );
});
it("UNIQUE vira conflito sanitizado, sem retry", async () => {
  const executor = sql();
  vi.mocked(executor.execute).mockRejectedValue(new DatabaseConflictError());
  await expect(
    accountRepository(executor).create({
      name: "Sintetico",
      email: "test@example.invalid",
      passwordHash: "hash",
    }),
  ).rejects.toBeInstanceOf(RegistrationConflictError);
  expect(executor.execute).toHaveBeenCalledOnce();
});
it.each([true, false])(
  "COMMIT indeterminado reconcilia apenas o proprio hash, confirmado=%s",
  async (confirmed) => {
    const dependencies = deps();
    vi.mocked(dependencies.transaction).mockRejectedValue(
      new TransactionOutcomeUnknownError(),
    );
    vi.mocked(dependencies.reconcile).mockResolvedValue(confirmed);
    const result = registerAccount(valid, dependencies);
    if (confirmed) await expect(result).resolves.toBeUndefined();
    else
      await expect(result).rejects.toBeInstanceOf(
        TransactionOutcomeUnknownError,
      );
    expect(dependencies.transaction).toHaveBeenCalledOnce();
    expect(dependencies.reconcile).toHaveBeenCalledWith(
      tokenHash(valid.invitationToken),
      "teste@example.invalid",
      "$argon2id$synthetic",
    );
  },
);
it("handler sem ambiente habilitado nega sem MySQL/cookies", async () => {
  const result = await POST(request(valid));
  expect(result.status).toBe(403);
  expect(driver.createPool).not.toHaveBeenCalled();
  expect(result.headers.get("set-cookie")).toBeNull();
  expect(result.headers.get("cache-control")).toBe("no-store");
});
it.each([null, "https://evil.example.invalid", "null"])(
  "nega Origin %s",
  async (origin) => {
    expect((await POST(request(valid, origin))).status).toBe(403);
  },
);
it("origem configurada e obrigatoria, nao usa URL derivada", async () => {
  vi.stubEnv("APPLICATION_ORIGIN", "");
  expect((await POST(request(valid))).status).toBe(403);
});
it.each([
  "https://app.example.invalid/path",
  "https://user:password@app.example.invalid",
  "invalid",
])("origem invalida %s", async (origin) => {
  vi.stubEnv("APPLICATION_ORIGIN", origin);
  expect((await POST(request(valid))).status).toBe(403);
});
it("DTO com papel rejeitado sem revelar valores", async () => {
  const result = await POST(request({ ...valid, admin: true }));
  expect(result.status).toBe(422);
  expect(JSON.stringify(await result.json())).not.toContain(valid.password);
});
it("corpo excessivo ou malformado falha", async () => {
  expect(
    (await POST(request({ ...valid, name: "x".repeat(9000) }))).status,
  ).toBe(400);
  const malformed = new Request("http://localhost:3000/api/auth/cadastro", {
    method: "POST",
    headers: {
      Origin: "http://localhost:3000",
      "Content-Type": "application/json",
    },
    body: "{",
  });
  expect((await POST(malformed)).status).toBe(400);
});
