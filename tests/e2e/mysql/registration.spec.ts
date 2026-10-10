import { test, expect } from "@playwright/test";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import mysql, { type Connection, type RowDataPacket } from "mysql2/promise";
import { readDatabaseConfig } from "../../../src/server/db/config";

let connection: Connection;
let privateDir: string;
const email = "browser-synthetic@example.invalid";
const password = "senha sintética do navegador";
async function issue(): Promise<string> {
  const path = join(privateDir, `invite-${Date.now()}`);
  const result = spawnSync(
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
    { encoding: "utf8", env: process.env },
  );
  expect(result.status).toBe(0);
  expect((await stat(path)).mode & 0o077).toBe(0);
  return readFile(path, "utf8"); // Nunca stdout/trace/captura/URL com token real.
}
async function count(sql: string): Promise<number> {
  return Number((await connection.query<RowDataPacket[]>(sql))[0][0].total);
}
test.beforeAll(async () => {
  if (
    process.env.US001_INTEGRATION !== "authorized-disposable" ||
    process.env.DATABASE_HOST !== "127.0.0.1" ||
    process.env.DATABASE_NAME !== "rede_de_apoio"
  )
    throw new Error("MySQL descartável autorizado necessário.");
  connection = await mysql.createConnection(readDatabaseConfig(process.env));
  expect(
    String(
      (
        await connection.query<RowDataPacket[]>("SELECT VERSION() AS version")
      )[0][0].version,
    ).startsWith("8.4."),
  ).toBe(true);
  privateDir = await mkdtemp(join(tmpdir(), "us001-browser-private-"));
});
test.beforeEach(async () => {
  await connection.execute("DELETE FROM auditoria");
  await connection.execute("DELETE FROM convite_cadastro_cuidador");
  await connection.execute("DELETE FROM usuario");
  await connection.execute("DELETE FROM cadastro_rate_limit");
});
// Limpar capacidades antes de diagnosticos automaticos de falha do navegador.
test.afterEach(async ({ page }) => {
  await page
    .locator("input")
    .evaluateAll((controls) =>
      controls.forEach((control) => {
        if (control instanceof HTMLInputElement) control.value = "";
      }),
    )
    .catch(() => {});
});
test.afterAll(async () => {
  await connection?.end();
  if (privateDir) await rm(privateDir, { recursive: true });
});
test("T02 -> API -> MySQL: convite CLI, conta criada e nenhuma sessao/vinculo", async ({
  page,
}) => {
  const token = await issue();
  await page.goto("/cadastro");
  await page
    .getByLabel("Código de convite", { exact: true })
    .evaluate((control, value) => {
      (control as HTMLInputElement).value = value;
      control.dispatchEvent(new Event("input", { bubbles: true }));
    }, token);
  await page
    .getByLabel("Nome completo", { exact: true })
    .fill("Conta sintética navegador");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByLabel("Confirmar senha", { exact: true }).fill(password);
  const response = page.waitForResponse((r) =>
    r.url().endsWith("/api/auth/cadastro"),
  );
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  expect((await response).status()).toBe(201);
  await expect(page.locator("form").getByRole("status")).toHaveText(
    "Conta criada. O acesso depende das permissões atribuídas.",
  );
  expect(await page.context().cookies()).toEqual([]);
  expect(
    await count(
      "SELECT COUNT(*) AS total FROM usuario WHERE tipo_acesso='CUIDADOR'",
    ),
  ).toBe(1);
  expect(
    await count(
      "SELECT COUNT(*) AS total FROM convite_cadastro_cuidador WHERE usado_em IS NOT NULL",
    ),
  ).toBe(1);
  for (const table of [
    "membro_rede",
    "atribuicao_papel_familiar",
    "rede_cuidado",
    "plantao",
  ])
    expect(await count(`SELECT COUNT(*) AS total FROM ${table}`)).toBe(0);
});
test("HTTP real: 403 token/email incorreto, 422 sem convite, 409 repeticao, 429 limite", async ({
  request,
  baseURL,
}) => {
  const token = await issue();
  const data = {
    invitationToken: token,
    name: "Conta sintética",
    email,
    password,
    confirmPassword: password,
  };
  const send = (body: object) =>
    request.post("/api/auth/cadastro", {
      headers: { Origin: baseURL! },
      data: body,
    });
  expect(
    (await send({ ...data, invitationToken: "a".repeat(43) })).status(),
  ).toBe(403);
  expect(
    (await send({ ...data, email: "other@example.invalid" })).status(),
  ).toBe(403);
  expect((await send({ ...data, invitationToken: undefined })).status()).toBe(
    422,
  );
  expect((await send(data)).status()).toBe(201);
  expect((await send(data)).status()).toBe(409);
  expect((await send(data)).status()).toBe(409);
  expect((await send(data)).status()).toBe(409);
  expect((await send(data)).status()).toBe(429);
  expect(await count("SELECT COUNT(*) AS total FROM usuario")).toBe(1);
});
test("duas requisicoes HTTP concorrentes: um efeito e um consumo", async ({
  request,
  baseURL,
}) => {
  const token = await issue();
  const data = {
    invitationToken: token,
    name: "Conta sintética",
    email,
    password,
    confirmPassword: password,
  };
  const results = await Promise.all([
    request.post("/api/auth/cadastro", { headers: { Origin: baseURL! }, data }),
    request.post("/api/auth/cadastro", {
      headers: { Origin: baseURL! },
      data: { ...data, email: email.toUpperCase() },
    }),
  ]);
  expect(results.map((result) => result.status()).sort()).toEqual([201, 409]);
  expect(await count("SELECT COUNT(*) AS total FROM usuario")).toBe(1);
  expect(
    await count(
      "SELECT COUNT(*) AS total FROM convite_cadastro_cuidador WHERE usado_em IS NOT NULL",
    ),
  ).toBe(1);
});
