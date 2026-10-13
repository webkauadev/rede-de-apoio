import { beforeEach, describe, expect, it, vi } from "vitest";
import { verify } from "argon2";
vi.mock("server-only", () => ({}));
const mocks = vi.hoisted(() => ({
  select: vi.fn(),
  execute: vi.fn(),
  transaction: vi.fn(),
}));
vi.mock("@/server/db", () => ({
  database: { select: mocks.select, execute: mocks.execute },
  withTransaction: mocks.transaction,
}));
vi.mock("mysql2/promise", () => ({
  createPool: () => {
    throw new Error("MySQL real proibido neste teste");
  },
}));
import { loginSchema } from "@/domains/auth/login/schema";
import { hashPassword } from "@/server/auth/password";
import {
  loginAccount,
  loginDependencies,
  verifyLoginPassword,
  type LoginDependencies,
} from "@/server/auth/login";
import {
  AuthenticationDeniedError,
  AccessDeniedError,
  auditDenied,
  auditAuthentication,
  persistSession,
  resolveIdentity,
  requireIdentity,
  denyCareAccess,
  logout,
  secretHash,
  newSessionToken,
  type Account,
  type GuardDependencies,
} from "@/server/auth/sessions";
import {
  readSessionToken,
  SESSION_SECONDS,
  sessionConfig,
  sessionCookie,
} from "@/server/auth/session-config";
import {
  countLoginAttempts,
  limitLoginAttempts,
  LoginRateLimitError,
} from "@/server/security/login-rate-limit";
import { POST as loginPOST } from "@/app/api/auth/login/route";
import { POST as logoutPOST } from "@/app/api/auth/logout/route";
import { GET as identityGET } from "@/app/api/auth/sessao/route";
const sql = { select: mocks.select, execute: mocks.execute };
const input = {
  email: "  SINTETICA@EXAMPLE.INVALID  ",
  password: " senha sintética ",
};
const account = {
  usuario_id: "42",
  tipo_acesso: "CUIDADOR",
  senha_hash: "$argon2id$synthetic",
  ativo: 1,
} as Account;
function deps(): LoginDependencies {
  return {
    limit: vi.fn(async () => {}),
    find: vi.fn(async () => account),
    verify: vi.fn(async () => true),
    persist: vi.fn(async () => {}),
    deny: vi.fn(async () => {}),
  };
}
function guards(): GuardDependencies {
  return {
    resolve: vi.fn(async () => ({
      userId: "42",
      category: "CUIDADOR" as const,
    })),
    deny: vi.fn(async () => {}),
  };
}
function request(
  path = "login",
  body: unknown = input,
  origin: string | null = "http://127.0.0.1:3100",
) {
  return new Request(`http://127.0.0.1:3100/api/auth/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(origin ? { Origin: origin } : {}),
    },
    body: JSON.stringify(body),
  });
}
beforeEach(() => {
  vi.restoreAllMocks();
  vi.clearAllMocks();
  vi.stubEnv("APPLICATION_ORIGIN", "http://127.0.0.1:3100");
  vi.stubEnv("SESSION_SECRET", "synthetic-unit-test-key-at-least-32-bytes");
  vi.stubEnv("AUTH_ENVIRONMENT", "local");
  mocks.select.mockResolvedValue([]);
  mocks.execute.mockResolvedValue({ affectedRows: 1 });
  mocks.transaction.mockImplementation(async (callback) => callback(sql));
});
describe("US-002 contrato", () => {
  it("normaliza email e preserva senha literalmente", () =>
    expect(loginSchema.parse(input)).toEqual({
      email: "sintetica@example.invalid",
      password: input.password,
    }));
  it.each([
    {},
    { email: "bad", password: "x" },
    { ...input, password: "" },
    { ...input, password: "á".repeat(513) },
    { ...input, roles: ["PRINCIPAL"] },
    { ...input, tipo_acesso: "PESSOA_IDOSA" },
  ])("rejeita payload invalido/privilegios %j", (value) =>
    expect(loginSchema.safeParse(value).success).toBe(false),
  );
  it("Argon2id real: valida e rejeita senha sem rehash ou trim", async () => {
    const encoded = await hashPassword(input.password);
    expect(await verify(encoded, input.password)).toBe(true);
    expect(await verifyLoginPassword(encoded, input.password)).toBe(true);
    expect(await verifyLoginPassword(encoded, "incorreta")).toBe(false);
  });
  it.each([null, "$bcrypt$nao-suportado", "$argon2id$malformado"])(
    "ausente/nao ativada/hash invalido passa por Argon2id e nega (%s)",
    async (value) =>
      expect(await verifyLoginPassword(value, input.password)).toBe(false),
  );
});
describe("login de servidor com dependencias simuladas", () => {
  it("limita antes de consultar e verificar; persiste antes de retornar token imprevisivel", async () => {
    const d = deps();
    const token = await loginAccount(input, null, d);
    expect(token).toMatch(/^[A-Za-z0-9_-]{43}$/);
    expect(d.limit).toHaveBeenCalledWith("sintetica@example.invalid");
    expect(vi.mocked(d.limit).mock.invocationCallOrder[0]).toBeLessThan(
      vi.mocked(d.verify).mock.invocationCallOrder[0],
    );
    expect(d.persist).toHaveBeenCalledWith(account, token, null);
    expect(d.deny).not.toHaveBeenCalled();
  });
  it("Pessoa Idosa autentica na mesma infraestrutura sem papel familiar", async () => {
    const d = deps();
    vi.mocked(d.find).mockResolvedValue({
      ...account,
      tipo_acesso: "PESSOA_IDOSA",
    });
    await loginAccount(input, null, d);
    expect(vi.mocked(d.persist).mock.calls[0][0].tipo_acesso).toBe(
      "PESSOA_IDOSA",
    );
  });
  it.each([null, { ...account, ativo: 0 }, { ...account, senha_hash: null }])(
    "conta ausente/inativa/nao ativada nao persiste sessao (%j)",
    async (value) => {
      const d = deps();
      vi.mocked(d.find).mockResolvedValue(value);
      vi.mocked(d.verify).mockResolvedValue(false);
      await expect(loginAccount(input, null, d)).rejects.toThrow(
        AuthenticationDeniedError,
      );
      expect(d.verify).toHaveBeenCalledWith(null, input.password);
      expect(d.persist).not.toHaveBeenCalled();
      expect(d.deny).toHaveBeenCalledWith("LOGIN");
    },
  );
  it("senha incorreta tem mesma mensagem generica", async () => {
    const d = deps();
    vi.mocked(d.verify).mockResolvedValue(false);
    await expect(loginAccount(input, null, d)).rejects.toThrow(
      "E-mail ou senha inválidos.",
    );
  });
  it("limite negado audita, sem Argon", async () => {
    const d = deps();
    vi.mocked(d.limit).mockRejectedValue(new LoginRateLimitError());
    await expect(loginAccount(input, null, d)).rejects.toThrow(
      LoginRateLimitError,
    );
    expect(d.verify).not.toHaveBeenCalled();
    expect(d.deny).toHaveBeenCalled();
  });
  it("COMMIT incerto nao retorna token nem tenta novamente", async () => {
    const d = deps();
    vi.mocked(d.persist).mockRejectedValue(new Error("commit sem confirmacao"));
    await expect(loginAccount(input, null, d)).rejects.toThrow();
    expect(d.persist).toHaveBeenCalledTimes(1);
    expect(d.deny).toHaveBeenCalledTimes(1);
  });
  it("falha de auditoria nao concede acesso", async () => {
    const d = deps();
    vi.mocked(d.verify).mockResolvedValue(false);
    vi.mocked(d.deny).mockRejectedValue(new Error("auditoria indisponivel"));
    await expect(loginAccount(input, null, d)).rejects.toThrow(
      "auditoria indisponivel",
    );
    expect(d.persist).not.toHaveBeenCalled();
  });
});
describe("repositorio SQL simulado e guardas", () => {
  it("sessao usa somente hashes; revalida conta com lock, rotaciona cookie anterior e audita atomicamente", async () => {
    mocks.select.mockResolvedValue([account]);
    const token = newSessionToken(),
      previous = newSessionToken();
    await persistSession(sql, account, token, previous);
    expect(mocks.select.mock.calls[0][0]).toContain("FOR UPDATE");
    const insert = mocks.execute.mock.calls.find((call) =>
      call[0].startsWith("INSERT INTO sessao_usuario"),
    )!;
    expect(insert[1]).toEqual([
      secretHash(token),
      "42",
      secretHash(account.senha_hash!),
      SESSION_SECONDS,
    ]);
    expect(JSON.stringify(mocks.execute.mock.calls)).not.toContain(token);
    expect(JSON.stringify(mocks.execute.mock.calls)).not.toContain(previous);
    expect(mocks.execute.mock.calls.at(-1)?.[0]).toContain("auditoria");
    expect(mocks.execute.mock.calls).toHaveLength(3);
  });
  it.each([
    { ...account, ativo: 0 },
    { ...account, senha_hash: "mudou" },
    { ...account, tipo_acesso: "PESSOA_IDOSA" },
    null,
  ])(
    "corrida de mudanca da conta e negada antes de INSERT %j",
    async (value) => {
      mocks.select.mockResolvedValue(value ? [value] : []);
      await expect(
        persistSession(sql, account, newSessionToken(), null),
      ).rejects.toThrow(AuthenticationDeniedError);
      expect(mocks.execute).not.toHaveBeenCalled();
    },
  );
  it("erro de insert propaga antes de audit/sucesso (rollback pertence ao adaptador)", async () => {
    mocks.select.mockResolvedValue([account]);
    mocks.execute.mockRejectedValue(new Error("insert"));
    await expect(
      persistSession(sql, account, newSessionToken(), null),
    ).rejects.toThrow();
  });
  it("lookup parametrizado por email nao interpolado", async () => {
    await loginDependencies.find("synthetic@example.invalid");
    expect(mocks.select).toHaveBeenCalledWith(
      expect.stringContaining("email_normalizado = ?"),
      ["synthetic@example.invalid"],
    );
  });
  it("guarda revalida expiração, revogação, ativo e mudanca de credencial a cada chamada", async () => {
    mocks.select.mockResolvedValue([
      { usuario_id: "42", tipo_acesso: "PESSOA_IDOSA" },
    ]);
    const token = newSessionToken();
    expect(await resolveIdentity(token)).toEqual({
      userId: "42",
      category: "PESSOA_IDOSA",
    });
    await resolveIdentity(token);
    expect(mocks.select).toHaveBeenCalledTimes(2);
    const query = mocks.select.mock.calls[0][0];
    for (const condition of [
      "revogado_em IS NULL",
      "expira_em > UTC_TIMESTAMP(6)",
      "u.ativo = TRUE",
      "senha_hash IS NOT NULL",
      "SHA2(u.senha_hash, 256)",
    ])
      expect(query).toContain(condition);
    expect(mocks.select.mock.calls[0][1]).toEqual([secretHash(token)]);
  });
  it.each([
    "expirada",
    "revogada",
    "alterada",
    "forjada",
    "ativo=false",
    "credencial alterada",
  ])(
    "nenhuma linha elegivel (%s): nega; resultado simulado, nao prova MySQL",
    async () => {
      expect(await resolveIdentity(newSessionToken())).toBeNull();
    },
  );
  it("token malformado nao chega ao SQL", async () => {
    expect(await resolveIdentity("forjado")).toBeNull();
    expect(mocks.select).not.toHaveBeenCalled();
  });
  it("anonimo e negado com auditoria independente", async () => {
    const d = guards();
    vi.mocked(d.resolve).mockResolvedValue(null);
    await expect(requireIdentity(null, d)).rejects.toThrow(AccessDeniedError);
    expect(d.deny).toHaveBeenCalledWith("ACESSO_IDENTIDADE");
  });
  it.each(["CUIDADOR", "PESSOA_IDOSA"] as const)(
    "identidade %s nao libera cuidado por papel inferido",
    async (category) => {
      const d = guards();
      vi.mocked(d.resolve).mockResolvedValue({ userId: "42", category });
      await expect(
        denyCareAccess(`rede_apoio_session=${newSessionToken()}`, d),
      ).rejects.toThrow(AccessDeniedError);
      expect(d.deny).toHaveBeenCalledWith("ACESSO_CUIDADO", {
        userId: "42",
        category,
      });
    },
  );
  it("auditoria de negacao usa transacao propria, sem email/token/senha", async () => {
    await auditDenied("LOGIN");
    expect(mocks.transaction).toHaveBeenCalledTimes(1);
    expect(mocks.execute.mock.calls[0][1]).toEqual([
      null,
      "LOGIN",
      null,
      "NEGADO",
      "Autenticacao ou autorizacao negada",
    ]);
  });
  it("logout revoga somente hash apresentado e e repetivel", async () => {
    const token = newSessionToken();
    await logout(token);
    await logout(token);
    expect(mocks.transaction).toHaveBeenCalledTimes(2);
    expect(mocks.execute.mock.calls[0][1]).toEqual([secretHash(token)]);
    expect(mocks.execute.mock.calls[0][0]).toContain("revogado_em IS NULL");
  });
  it("falha de escrita da auditoria propaga", async () => {
    mocks.execute.mockRejectedValue(new Error("auditoria"));
    await expect(
      auditAuthentication(sql, "LOGIN", true, {
        userId: "42",
        category: "CUIDADOR",
      }),
    ).rejects.toThrow();
  });
});
describe("cookie e configuracao", () => {
  it("cookie HttpOnly SameSite Path absoluto sem Domain; HTTP somente loopback local", () => {
    const token = newSessionToken();
    expect(sessionCookie(token)).toBe(
      `rede_apoio_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=28800`,
    );
    expect(sessionCookie("", true)).toContain("Max-Age=0");
  });
  it("HTTPS usa Secure e prefixo __Host", () => {
    vi.stubEnv("APPLICATION_ORIGIN", "https://localhost:3100");
    expect(sessionCookie(newSessionToken())).toMatch(
      /^__Host-rede_apoio_session=.*; Secure$/,
    );
  });
  it.each([undefined, "short"])("sem segredo adequado nega %s", (value) => {
    vi.stubEnv("SESSION_SECRET", value);
    expect(() => sessionConfig()).toThrow();
  });
  it.each([
    "http://example.invalid",
    "ftp://localhost",
    "http://localhost/path",
    "https://usuario:senha@localhost",
  ])("configuracao insegura/publica rejeitada %s", (origin) => {
    vi.stubEnv("APPLICATION_ORIGIN", origin);
    expect(() => sessionConfig()).toThrow();
  });
  it("sem ativacao local nega", () => {
    vi.stubEnv("AUTH_ENVIRONMENT", "");
    expect(() => sessionConfig()).toThrow();
  });
  it("cookies duplicados, malformados, ausentes rejeitados", () => {
    const token = newSessionToken();
    expect(readSessionToken(null)).toBeNull();
    expect(readSessionToken("rede_apoio_session=bad")).toBeNull();
    expect(
      readSessionToken(
        `rede_apoio_session=${token}; rede_apoio_session=${token}`,
      ),
    ).toBeNull();
    expect(readSessionToken(`outro=x; rede_apoio_session=${token}`)).toBe(
      token,
    );
  });
});
describe("limite persistente de login simulado", () => {
  it("buckets separados, HMAC de email, cleanup apenas tecnico", async () => {
    mocks.select.mockResolvedValue([{ tentativas: "1" }]);
    expect(
      await countLoginAttempts(
        sql,
        "synthetic@example.invalid",
        "synthetic-secret",
      ),
    ).toBe(true);
    expect(mocks.execute.mock.calls[0][0]).toContain(
      "DELETE FROM login_rate_limit",
    );
    expect(JSON.stringify(mocks.execute.mock.calls)).not.toContain(
      "synthetic@example.invalid",
    );
    expect(mocks.execute.mock.calls).toHaveLength(3);
  });
  it("limite global nega antes de criar bucket arbitrario", async () => {
    mocks.select.mockResolvedValue([{ tentativas: 61 }]);
    expect(await countLoginAttempts(sql, "a@example.invalid", "secret")).toBe(
      false,
    );
    expect(mocks.execute).toHaveBeenCalledTimes(2);
  });
  it("limite de email nega depois do commit dos contadores", async () => {
    mocks.select
      .mockResolvedValueOnce([{ tentativas: 1 }])
      .mockResolvedValueOnce([{ tentativas: 6 }]);
    await expect(limitLoginAttempts("a@example.invalid")).rejects.toThrow(
      LoginRateLimitError,
    );
    expect(mocks.transaction).toHaveReturned();
  });
});
describe("HTTP real handler com SQL mock, sem MySQL", () => {
  it("sem configuracao nao conecta e nao cria cookie", async () => {
    vi.stubEnv("AUTH_ENVIRONMENT", "");
    const result = await loginPOST(request());
    expect(result.status).toBe(503);
    expect(result.headers.get("set-cookie")).toBeNull();
    expect(mocks.select).not.toHaveBeenCalled();
  });
  it.each([null, "null", "https://evil.example.invalid"])(
    "CSRF origem invalida %s auditada e negada",
    async (origin) => {
      const result = await loginPOST(request("login", input, origin));
      expect(result.status).toBe(403);
      expect(mocks.execute.mock.calls[0][1][1]).toBe("LOGIN");
      expect(mocks.select).not.toHaveBeenCalled();
    },
  );
  it("cross-site apesar de Origin valido nega", async () => {
    const r = request();
    r.headers.set("sec-fetch-site", "cross-site");
    expect((await loginPOST(r)).status).toBe(403);
  });
  it("falha de auditoria de CSRF falha fechado", async () => {
    mocks.execute.mockRejectedValue(new Error());
    expect((await loginPOST(request("login", input, null))).status).toBe(503);
  });
  it("DTO de privilegio rejeitado", async () => {
    expect(
      (await loginPOST(request("login", { ...input, role: "PRINCIPAL" })))
        .status,
    ).toBe(422);
    expect(mocks.select).not.toHaveBeenCalled();
  });
  it("body excessivo/malformado rejeitado", async () => {
    expect(
      (
        await loginPOST(
          request("login", { ...input, password: "x".repeat(9000) }),
        )
      ).status,
    ).toBe(400);
  });
  it("conta ausente 401 sem token/cache e com auditoria", async () => {
    mocks.select
      .mockResolvedValueOnce([{ tentativas: 1 }])
      .mockResolvedValueOnce([{ tentativas: 1 }])
      .mockResolvedValueOnce([]);
    const result = await loginPOST(request());
    expect(result.status).toBe(401);
    expect(await result.json()).toEqual({
      message: "E-mail ou senha inválidos.",
    });
    expect(result.headers.get("set-cookie")).toBeNull();
    expect(result.headers.get("cache-control")).toContain("no-store");
  });
  it("login HTTP bem sucedido entrega token apenas no cookie apos persistencia mock", async () => {
    vi.spyOn(loginDependencies, "limit").mockResolvedValue();
    vi.spyOn(loginDependencies, "find").mockResolvedValue(account);
    vi.spyOn(loginDependencies, "verify").mockResolvedValue(true);
    vi.spyOn(loginDependencies, "persist").mockResolvedValue();
    const result = await loginPOST(request());
    expect(result.status).toBe(200);
    expect(await result.json()).toEqual({ authenticated: true });
    expect(result.headers.get("set-cookie")).toContain("HttpOnly");
  });
  it("logout CSRF negado nao revoga nem limpa cookie", async () => {
    const result = await logoutPOST(request("logout", {}, null));
    expect(result.status).toBe(403);
    expect(result.headers.get("set-cookie")).toBeNull();
    expect(
      mocks.execute.mock.calls.every((c) => !c[0].startsWith("UPDATE")),
    ).toBe(true);
  });
  it("logout confirmado limpa cookie", async () => {
    const result = await logoutPOST(request("logout", {}));
    expect(result.status).toBe(200);
    expect(result.headers.get("set-cookie")).toContain("Max-Age=0");
  });
  it("guarda HTTP anonima nega e nao vaza identidade", async () => {
    const result = await identityGET(
      new Request("http://127.0.0.1:3100/api/auth/sessao"),
    );
    expect(result.status).toBe(401);
    expect(await result.json()).not.toHaveProperty("identity");
  });
  it("guarda HTTP identidade retorna somente id/categoria da conta atual", async () => {
    mocks.select.mockResolvedValue([
      { usuario_id: "42", tipo_acesso: "PESSOA_IDOSA" },
    ]);
    const result = await identityGET(
      new Request("http://127.0.0.1:3100/api/auth/sessao", {
        headers: { Cookie: `rede_apoio_session=${newSessionToken()}` },
      }),
    );
    expect(await result.json()).toEqual({
      identity: { userId: "42", category: "PESSOA_IDOSA" },
    });
  });
});

describe("regressoes de sessao e falha fechada", () => {
  it("tokens novos distintos em cada login, cookie anterior nunca reaproveitado", async () => {
    const d = deps(),
      old = newSessionToken();
    const first = await loginAccount(input, old, d),
      second = await loginAccount(input, old, d);
    expect(first).not.toBe(old);
    expect(second).not.toBe(first);
    expect(d.persist).toHaveBeenCalledWith(account, first, old);
  });
  it("sem senha ativada nega mesmo se dependencia de verificacao incorreta retorna true", async () => {
    const d = deps();
    vi.mocked(d.find).mockResolvedValue({ ...account, senha_hash: null });
    await expect(loginAccount(input, null, d)).rejects.toThrow(
      AuthenticationDeniedError,
    );
    expect(d.persist).not.toHaveBeenCalled();
  });
  it("erro no banco da guarda nao libera identidade", async () => {
    mocks.select.mockRejectedValue(new Error("driver indisponivel"));
    const result = await identityGET(
      new Request("http://127.0.0.1:3100/api/auth/sessao", {
        headers: { Cookie: `rede_apoio_session=${newSessionToken()}` },
      }),
    );
    expect(result.status).toBe(503);
    expect(await result.text()).not.toContain("driver");
  });
  it("falha de COMMIT de logout nao limpa cookie ou afirma saida", async () => {
    mocks.transaction.mockRejectedValue(new Error("commit incerto"));
    const result = await logoutPOST(request("logout", {}));
    expect(result.status).toBe(503);
    expect(result.headers.get("set-cookie")).toBeNull();
  });
  it("auditoria de logout associa ator conhecido sem aceitar ID do cliente", async () => {
    mocks.select.mockResolvedValue([
      { usuario_id: "42", tipo_acesso: "PESSOA_IDOSA" },
    ]);
    await logout(newSessionToken());
    expect(mocks.execute.mock.calls.at(-1)?.[1]).toEqual([
      "42",
      "LOGOUT",
      "PESSOA_IDOSA",
      "PERMITIDO",
      null,
    ]);
  });
  it("rate limit sem banco nao usa contador em memoria", async () => {
    mocks.transaction.mockRejectedValue(new Error("banco indisponivel"));
    await expect(limitLoginAttempts("a@example.invalid")).rejects.toThrow();
  });
  it("request URL e forwarded headers nao substituem Origin configurada", async () => {
    const r = request("login", input, "http://evil.example.invalid");
    r.headers.set("x-forwarded-host", "127.0.0.1:3100");
    expect((await loginPOST(r)).status).toBe(403);
  });
  it("token forjado e alterado de formato valido retorna mesmo erro de anonimo no handler mock", async () => {
    for (const token of [newSessionToken(), "a".repeat(43)]) {
      const result = await identityGET(
        new Request("http://127.0.0.1:3100/api/auth/sessao", {
          headers: { Cookie: `rede_apoio_session=${token}` },
        }),
      );
      expect(result.status).toBe(401);
      expect(await result.json()).not.toHaveProperty("identity");
    }
  });
});

describe("idempotencia de revogacao com SQL simulado", () => {
  it("repetir logout de token revogado nao duplica evento de efeito", async () => {
    mocks.select.mockResolvedValue([
      { usuario_id: "42", tipo_acesso: "CUIDADOR" },
    ]);
    mocks.execute
      .mockResolvedValueOnce({ affectedRows: 1 })
      .mockResolvedValueOnce({ affectedRows: 1 })
      .mockResolvedValueOnce({ affectedRows: 0 });
    const token = newSessionToken();
    await logout(token);
    await logout(token);
    expect(
      mocks.execute.mock.calls.filter((call) =>
        call[0].startsWith("INSERT INTO auditoria"),
      ),
    ).toHaveLength(1);
  });
  it("logout anonimo nao registra efeito de sessao inexistente", async () => {
    await logout(null);
    expect(mocks.execute).not.toHaveBeenCalled();
  });
});
