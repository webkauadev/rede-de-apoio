import { test, expect } from "@playwright/test";
import mysql, { type Connection, type RowDataPacket } from "mysql2/promise";
import { hash, argon2id } from "argon2";
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { readDatabaseConfig } from "../../../src/server/db/config";
let connection: Connection, privateDir: string;
const email = "browser-login@example.invalid",
  password = "senha sintética do ensaio";
async function count(table: string, where = "") {
  return Number(
    (
      await connection.query<RowDataPacket[]>(
        `SELECT COUNT(*) total FROM ${table} ${where}`,
      )
    )[0][0].total,
  );
}
async function fixture(category = "CUIDADOR") {
  const encoded = await hash(password, {
    type: argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
  await connection.execute(
    "INSERT INTO usuario (nome,email_normalizado,senha_hash,tipo_acesso) VALUES ('Browser sintetico',?,?,?)",
    [email, encoded, category],
  );
}
test.beforeAll(async () => {
  if (
    process.env.US002_INTEGRATION !== "authorized-disposable" ||
    process.env.DATABASE_HOST !== "127.0.0.1" ||
    process.env.DATABASE_USER !== "us002_test"
  )
    throw new Error("Ensaio novo US002 autorizado necessario");
  connection = await mysql.createConnection(readDatabaseConfig(process.env));
  expect(
    String(
      (
        await connection.query<RowDataPacket[]>("SELECT VERSION() version")
      )[0][0].version,
    ).startsWith("8.4."),
  ).toBe(true);
  privateDir = await mkdtemp(join(tmpdir(), "us002-browser-private-"));
});
test.beforeEach(async () => {
  for (const table of [
    "auditoria",
    "sessao_usuario",
    "convite_cadastro_cuidador",
    "usuario",
    "login_rate_limit",
    "cadastro_rate_limit",
  ])
    await connection.execute(`DELETE FROM ${table}`);
});
test.afterEach(async ({ page }) => {
  await page
    .locator("input")
    .evaluateAll((elements) =>
      elements.forEach((e) => {
        if (e instanceof HTMLInputElement) e.value = "";
      }),
    )
    .catch(() => {});
});
test.afterAll(async () => {
  await connection?.end();
  if (privateDir) await rm(privateDir, { recursive: true });
});
test("cadastro por convite -> T01 -> sessao persistida -> logout, nenhum cuidado", async ({
  page,
}) => {
  const path = join(privateDir, `invite-${Date.now()}`);
  const cli = spawnSync(
    "npm",
    [
      "run",
      "invite:bootstrap",
      "--",
      "--email",
      email,
      "--token-file",
      path,
      "--confirm-local-disposable",
    ],
    { env: process.env, encoding: "utf8" },
  );
  expect(cli.status).toBe(0);
  const token = await readFile(path, "utf8");
  await page.goto("/cadastro");
  await page
    .getByLabel("Código de convite", { exact: true })
    .evaluate((e, t) => {
      (e as HTMLInputElement).value = t;
    }, token);
  await page
    .getByLabel("Nome completo", { exact: true })
    .fill("Browser sintetico");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByLabel("Confirmar senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await expect(page.locator("form").getByRole("status")).toContainText(
    "Conta criada",
  );
  await page.getByRole("link", { name: "Entrar", exact: true }).click();
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page).toHaveURL(/\/sessao$/);
  await expect(
    page.getByRole("heading", { name: "Sessão autenticada" }),
  ).toBeVisible();
  const cookies = await page.context().cookies();
  expect(cookies.length).toBe(1);
  expect(cookies[0].httpOnly).toBe(true);
  expect(cookies[0].sameSite).toBe("Lax");
  expect(cookies[0].path).toBe("/");
  expect(cookies[0].secure).toBe(false);
  expect(
    (await page.evaluate(() => document.cookie)).includes("rede_apoio_session"),
  ).toBe(false);
  expect(
    await page.evaluate(() => [localStorage.length, sessionStorage.length]),
  ).toEqual([0, 0]);
  const identity = await page.request.get("/api/auth/sessao");
  expect(identity.status()).toBe(200);
  expect((await identity.json()).identity.category).toBe("CUIDADOR");
  expect(identity.headers()["cache-control"].includes("no-store")).toBe(true);
  expect(await count("sessao_usuario")).toBe(1);
  for (const table of [
    "membro_rede",
    "atribuicao_papel_familiar",
    "rede_cuidado",
    "plantao",
  ])
    expect(await count(table)).toBe(0);
  await page.getByRole("button", { name: "Sair", exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
  expect((await page.context().cookies()).length).toBe(0);
  expect(await count("sessao_usuario", "WHERE revogado_em IS NOT NULL")).toBe(
    1,
  );
  expect((await page.request.get("/api/auth/sessao")).status()).toBe(401);
});
test("Pessoa Idosa fixture: mesma T01, categoria preservada e sem papel", async ({
  page,
}) => {
  await fixture("PESSOA_IDOSA");
  await page.goto("/login");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Sessão autenticada" }),
  ).toBeVisible();
  await expect(page.getByText(/Categoria: Pessoa Idosa/)).toBeVisible();
  expect(
    (await (await page.request.get("/api/auth/sessao")).json()).identity
      .category,
  ).toBe("PESSOA_IDOSA");
  expect(await count("membro_rede")).toBe(0);
  await page.getByRole("button", { name: "Sair" }).click();
  await expect(page).toHaveURL(/\/login$/);
});
test("HTTP real: credenciais invalidas e CSRF nao criam cookie", async ({
  request,
  baseURL,
}) => {
  await fixture();
  for (const data of [
    { email, password: "errada" },
    { email: "absent@example.invalid", password },
  ]) {
    const r = await request.post("/api/auth/login", {
      headers: { Origin: baseURL! },
      data,
    });
    expect(r.status()).toBe(401);
    expect(r.headers()["set-cookie"] === undefined).toBe(true);
  }
  const csrf = await request.post("/api/auth/login", {
    headers: { Origin: "https://evil.example.invalid" },
    data: { email, password },
  });
  expect(csrf.status()).toBe(403);
  expect(await count("sessao_usuario")).toBe(0);
});
for (const condition of [
  "expirada",
  "revogada",
  "credencial",
  "inativa",
  "forjada",
]) {
  test(`guarda HTTP real nega ${condition}`, async ({ request, baseURL }) => {
    await fixture();
    const login = await request.post("/api/auth/login", {
      headers: { Origin: baseURL! },
      data: { email, password },
    });
    expect(login.status()).toBe(200);
    if (condition === "expirada")
      await connection.execute(
        "UPDATE sessao_usuario SET criado_em=TIMESTAMPADD(HOUR,-9,UTC_TIMESTAMP(6)), expira_em=TIMESTAMPADD(SECOND,-1,UTC_TIMESTAMP(6))",
      );
    if (condition === "revogada")
      await connection.execute(
        "UPDATE sessao_usuario SET revogado_em=UTC_TIMESTAMP(6)",
      );
    if (condition === "credencial")
      await connection.execute("UPDATE usuario SET senha_hash=NULL");
    if (condition === "inativa")
      await connection.execute("UPDATE usuario SET ativo=FALSE");
    const r = await request.get(
      "/api/auth/sessao",
      condition === "forjada"
        ? { headers: { Cookie: "rede_apoio_session=" + "a".repeat(43) } }
        : {},
    );
    expect(r.status()).toBe(401);
    expect((await r.json()).identity === undefined).toBe(true);
  });
}
test("dois POST login reais concorrentes geram duas sessoes independentes", async ({
  request,
  baseURL,
}) => {
  await fixture();
  const responses = await Promise.all(
    [1, 2].map(() =>
      request.post("/api/auth/login", {
        headers: { Origin: baseURL! },
        data: { email, password },
      }),
    ),
  );
  expect(responses.map((r) => r.status())).toEqual([200, 200]);
  expect(await count("sessao_usuario")).toBe(2);
});
test("auditoria indisponivel no banco real: API nao confirma login ou cookie", async ({
  request,
  baseURL,
}) => {
  await fixture();
  await connection.execute(
    "RENAME TABLE auditoria TO auditoria_test_unavailable",
  );
  try {
    const r = await request.post("/api/auth/login", {
      headers: { Origin: baseURL! },
      data: { email, password },
    });
    expect(r.status()).toBe(503);
    expect(r.headers()["set-cookie"] === undefined).toBe(true);
    expect(await count("sessao_usuario")).toBe(0);
  } finally {
    await connection.execute(
      "RENAME TABLE auditoria_test_unavailable TO auditoria",
    );
  }
});
