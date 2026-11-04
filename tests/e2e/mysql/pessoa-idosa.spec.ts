import { test, expect } from "@playwright/test";
import mysql, { type Connection, type RowDataPacket } from "mysql2/promise";
import { hash, argon2id } from "argon2";
import { readDatabaseConfig } from "../../../src/server/db/config";
let connection: Connection;
test.beforeAll(async () => {
  if (
    process.env.US003_INTEGRATION !== "authorized-disposable" ||
    process.env.DATABASE_USER !== "us003_test" ||
    process.env.DATABASE_HOST !== "127.0.0.1"
  )
    throw new Error("Ensaio US003 necessario");
  connection = await mysql.createConnection(readDatabaseConfig(process.env));
  for (const table of [
    "auditoria",
    "pessoa_idosa",
    "sessao_usuario",
    "usuario",
    "login_rate_limit",
  ])
    await connection.execute(`DELETE FROM ${table}`);
  const encoded = await hash("senha sintética", {
    type: argon2id,
    memoryCost: 19456,
    timeCost: 2,
    parallelism: 1,
  });
  await connection.execute(
    "INSERT INTO usuario (nome,email_normalizado,senha_hash) VALUES ('Browser sintetico','browser@example.invalid',?)",
    [encoded],
  );
});
test.afterAll(async () => {
  await connection?.end();
});
test("T12 + sessao/MySQL reais: gate bloqueado, nenhum perfil ou rede criado", async ({
  page,
}) => {
  await page.goto("/login");
  await page
    .getByLabel("E-mail", { exact: true })
    .fill("browser@example.invalid");
  await page.getByLabel("Senha", { exact: true }).fill("senha sintética");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page).toHaveURL(/\/sessao$/);
  await page.goto("/pessoa-idosa/cadastro");
  await page.getByLabel("Nome completo").fill("Perfil sintético");
  await page.getByLabel("Data de nascimento").fill("1947-03-18");
  const response = page.waitForResponse((r) =>
    r.url().endsWith("/api/pessoas-idosas"),
  );
  await page.getByRole("button", { name: "Cadastrar pessoa idosa" }).click();
  const r = await response;
  expect(r.status()).toBe(403);
  expect((await r.json()).code).toBe("BLOCKED_BY_DECISION");
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Cadastro ainda não liberado",
  );
  for (const table of [
    "pessoa_idosa",
    "rede_cuidado",
    "membro_rede",
    "atribuicao_papel_familiar",
  ])
    expect(
      Number(
        (
          await connection.query<RowDataPacket[]>(
            `SELECT COUNT(*) total FROM ${table}`,
          )
        )[0][0].total,
      ),
    ).toBe(0);
  expect(
    (await page.request.get("/api/pessoas-idosas?id=third-party")).status(),
  ).toBe(403);
  await page.locator("input").evaluateAll((elements) =>
    elements.forEach((e) => {
      if (e instanceof HTMLInputElement) e.value = "";
    }),
  );
});
