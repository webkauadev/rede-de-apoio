import { describe, it, expect, vi, beforeEach } from "vitest";
vi.mock("server-only", () => ({}));
const mock = vi.hoisted(() => ({
  identity: vi.fn(),
  execute: vi.fn(),
  select: vi.fn(),
  transaction: vi.fn(),
}));
vi.mock("@/server/auth/sessions", () => ({
  requireIdentity: mock.identity,
  AccessDeniedError: class extends Error {},
}));
vi.mock("@/server/db", () => ({ withTransaction: mock.transaction }));
import { pendingProfileSchema } from "@/domains/pessoa-idosa/schema";
import {
  requireBootstrapEligibility,
  BootstrapDecisionRequiredError,
} from "@/server/pessoa-idosa/bootstrap";
import { insertPendingProfile } from "@/server/pessoa-idosa/repository";
import {
  createPendingProfile,
  denyProfileRead,
} from "@/server/pessoa-idosa/service";
import { POST, GET } from "@/app/api/pessoas-idosas/route";
const input = { name: "  Pessoa sintética  ", birthDate: "1947-03-18" };
const sql = { execute: mock.execute, select: mock.select };
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("APPLICATION_ORIGIN", "http://127.0.0.1:3100");
  vi.stubEnv("AUTH_ENVIRONMENT", "local");
  vi.stubEnv("SESSION_SECRET", "synthetic-secret-at-least-32-bytes-long");
  mock.identity.mockResolvedValue({ userId: "42", category: "CUIDADOR" });
  mock.execute.mockResolvedValue({ affectedRows: 1 });
  mock.select.mockResolvedValue([{ id: "9007199254740993" }]);
  mock.transaction.mockImplementation(async (op) => op(sql));
});
describe("RF03/US003/T12", () => {
  it("nome normalizado, data civil opcional, sem impor idade/rede exclusiva", () => {
    expect(pendingProfileSchema.parse(input)).toEqual({
      name: "Pessoa sintética",
      birthDate: "1947-03-18",
    });
    expect(
      pendingProfileSchema.parse({ ...input, birthDate: "" }).birthDate,
    ).toBeNull();
  });
  it.each([
    { ...input, name: "" },
    { ...input, birthDate: "2025-02-29" },
    { ...input, birthDate: "1947-02-30" },
    { ...input, principal: true },
    { ...input, rede_id: 1 },
    { ...input, cadastrado_por_usuario_id: 1 },
    { ...input, usuario_titular_id: 1 },
  ])("DTO invalido/privilegios rejeitados %j", (value) =>
    expect(pendingProfileSchema.safeParse(value).success).toBe(false),
  );
  it("identidade CUIDADOR nunca vira prova de bootstrap", async () => {
    await expect(
      requireBootstrapEligibility({ userId: "42", category: "CUIDADOR" }),
    ).rejects.toThrow(BootstrapDecisionRequiredError);
  });
  it("servico oficial nao insere e audita NEGADO", async () => {
    await expect(createPendingProfile(null, input)).rejects.toThrow(
      BootstrapDecisionRequiredError,
    );
    expect(
      mock.execute.mock.calls.every((c) =>
        c[0].startsWith("INSERT INTO auditoria"),
      ),
    ).toBe(true);
    expect(mock.execute.mock.calls[0][1]).toEqual([
      "42",
      "CADASTRO_PESSOA_IDOSA",
      "CUIDADOR",
    ]);
  });
  it("Pessoa Idosa nao escreve", async () => {
    mock.identity.mockResolvedValue({ userId: "43", category: "PESSOA_IDOSA" });
    await expect(createPendingProfile(null, input)).rejects.toThrow();
    expect(
      mock.execute.mock.calls.every(
        (c) => !c[0].includes("INSERT INTO pessoa_idosa"),
      ),
    ).toBe(true);
  });
  it("leitura permanece fechada inclusive para o criador, sem consulta de perfil", async () => {
    await expect(denyProfileRead(null)).rejects.toThrow();
    expect(mock.select).not.toHaveBeenCalled();
    expect(mock.execute.mock.calls[0][1][1]).toBe("LEITURA_PESSOA_IDOSA");
  });
  it("adaptador parametrizado e ID string sem perda de precisao, sem rede/titular", async () => {
    const parsed = pendingProfileSchema.parse(input);
    expect(await insertPendingProfile(sql, parsed, "42")).toBe(
      "9007199254740993",
    );
    expect(mock.execute.mock.calls[0][1]).toEqual([
      parsed.name,
      parsed.birthDate,
      "42",
    ]);
    expect(mock.execute.mock.calls[0][0]).toContain("NULL)");
    expect(mock.execute.mock.calls).toHaveLength(2);
    expect(mock.execute.mock.calls[1][0]).toContain("auditoria");
  });
  it("adaptador propaga falha para rollback do chamador, sem retry", async () => {
    mock.execute.mockRejectedValue(new Error("driver"));
    await expect(
      insertPendingProfile(sql, pendingProfileSchema.parse(input), "42"),
    ).rejects.toThrow();
    expect(mock.execute).toHaveBeenCalledTimes(1);
  });
  it("HTTP bloqueado nao simula 201 e preserva no-store", async () => {
    const request = new Request("http://127.0.0.1:3100/api/pessoas-idosas", {
      method: "POST",
      headers: {
        Origin: "http://127.0.0.1:3100",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const r = await POST(request);
    expect(r.status).toBe(403);
    expect((await r.json()).code).toBe("BLOCKED_BY_DECISION");
    expect(r.headers.get("cache-control")).toContain("no-store");
  });
  it("CSRF e negado antes de consultar identidade", async () => {
    const r = await POST(
      new Request("http://127.0.0.1:3100/api/pessoas-idosas", {
        method: "POST",
      }),
    );
    expect(r.status).toBe(403);
    expect(mock.identity).not.toHaveBeenCalled();
  });
  it("falha de auditoria nega sem exposicao de erro do driver", async () => {
    mock.execute.mockRejectedValue(new Error("driver secret"));
    const r = await GET(
      new Request("http://127.0.0.1:3100/api/pessoas-idosas?id=other"),
    );
    expect(r.status).toBe(503);
    expect(await r.text()).not.toContain("driver");
  });
});
