import { expect, test, type Page } from "@playwright/test";
async function credentials(page: Page) {
  await page
    .getByLabel("E-mail", { exact: true })
    .fill("synthetic@example.invalid");
  await page.getByLabel("Senha", { exact: true }).fill("senha sintética");
}
test("T01 baseline: AuthShell, campos, targets e convite restrito", async ({
  page,
}, info) => {
  await page.goto("/login");
  await expect(
    page.getByRole("heading", { name: "Entrar na sua conta" }),
  ).toBeVisible();
  await expect(page.getByRole("navigation")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Esqueci minha senha" }),
  ).toBeDisabled();
  for (const control of await page
    .locator("input,button,a:not(.skip-link)")
    .all()) {
    const b = await control.boundingBox();
    expect(b!.width).toBeGreaterThanOrEqual(48);
    expect(b!.height).toBeGreaterThanOrEqual(48);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
  await page.screenshot({
    path: info.outputPath("T01-default.png"),
    fullPage: true,
    scale: "css",
  });
  await page.getByRole("link", { name: "Criar conta" }).click();
  await expect(
    page.getByLabel("Código de convite", { exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Entrar", exact: true }).click();
  await expect(page).toHaveURL(/\/login$/);
});
test("validacao local acessivel nao envia payload invalido", async ({
  page,
}, info) => {
  let count = 0;
  page.on("request", (r) => {
    if (r.url().endsWith("/api/auth/login")) count++;
  });
  await page.goto("/login");
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page.getByLabel("E-mail", { exact: true })).toBeFocused();
  await expect(page.getByLabel("Senha", { exact: true })).toHaveAttribute(
    "aria-invalid",
    "true",
  );
  expect(count).toBe(0);
  await page.screenshot({
    path: info.outputPath("T01-validation.png"),
    fullPage: true,
  });
});
test("senha pode ser mostrada sem storage", async ({ page }) => {
  await page.goto("/login");
  await credentials(page);
  await page.getByRole("button", { name: "Mostrar senha" }).click();
  await expect(page.getByLabel("Senha", { exact: true })).toHaveAttribute(
    "type",
    "text",
  );
  await page.getByRole("button", { name: "Ocultar senha" }).click();
  await expect(page.getByLabel("Senha", { exact: true })).toHaveAttribute(
    "type",
    "password",
  );
  expect(
    await page.evaluate(() => [localStorage.length, sessionStorage.length]),
  ).toEqual([0, 0]);
});
test("invalid_credentials simulado mantem shell, limpa senha e foca feedback generico", async ({
  page,
}, info) => {
  await page.route("**/api/auth/login", (route) =>
    route.fulfill({
      status: 401,
      contentType: "application/json",
      body: JSON.stringify({ message: "E-mail ou senha inválidos." }),
    }),
  );
  await page.goto("/login");
  await credentials(page);
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page.locator("form").getByRole("alert")).toHaveText(
    "E-mail ou senha inválidos.",
  );
  await expect(page.locator("form").getByRole("alert")).toBeFocused();
  await expect(page.getByLabel("Senha", { exact: true })).toHaveValue("");
  await expect(page.locator('[data-screen="T01"]')).toBeVisible();
  await page.screenshot({
    path: info.outputPath("T01-invalid-credentials-simulated.png"),
    fullPage: true,
  });
  expect(await page.context().cookies()).toEqual([]);
});
test("loading simulado impede envio duplo e preserva geometria", async ({
  page,
}, info) => {
  let release!: () => void;
  let count = 0;
  const wait = new Promise<void>((r) => (release = r));
  await page.route("**/api/auth/login", async (route) => {
    count++;
    await wait;
    await route.fulfill({
      status: 401,
      contentType: "application/json",
      body: '{"message":"E-mail ou senha inválidos."}',
    });
  });
  await page.goto("/login");
  await credentials(page);
  const before = await page.locator('[data-screen="T01"]').boundingBox();
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  try {
    await expect(
      page.getByRole("button", { name: "Entrando…" }),
    ).toBeDisabled();
    await expect(page.getByLabel("Senha", { exact: true })).toBeDisabled();
    expect(await page.locator('[data-screen="T01"]').boundingBox()).toEqual(
      before,
    );
    await page
      .locator("form")
      .evaluate((form) =>
        form.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        ),
      );
    expect(count).toBe(1);
    await page.screenshot({
      path: info.outputPath("T01-loading-simulated.png"),
      fullPage: true,
    });
  } finally {
    release();
  }
  await expect(page.locator("form").getByRole("alert")).toHaveText(
    "E-mail ou senha inválidos.",
  );
});
test("handler real sem configuracao MySQL falha fechado sem sessao", async ({
  page,
}) => {
  await page.goto("/login");
  await credentials(page);
  const response = page.waitForResponse((r) =>
    r.url().endsWith("/api/auth/login"),
  );
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  expect((await response).status()).toBe(503);
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Login indisponível",
  );
  expect(await page.context().cookies()).toEqual([]);
  await expect(page).toHaveURL(/\/login$/);
});
test("sucesso de API simulado encaminha apenas a prova tecnica; guarda real continua fechada sem banco", async ({
  page,
}) => {
  await page.route("**/api/auth/login", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"authenticated":true}',
    }),
  );
  await page.goto("/login");
  await credentials(page);
  await page.getByRole("button", { name: "Entrar", exact: true }).click();
  await expect(page).toHaveURL(/\/sessao$/);
  await expect(
    page.getByRole("heading", {
      name: "Acesso não autorizado ou indisponível",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Sessão autenticada", { exact: true }),
  ).toHaveCount(0);
});
test("anonimo/token forjado nao acessam identidade nem cuidado (handler real sem banco)", async ({
  page,
  request,
}) => {
  const anonymous = await request.get("/api/auth/sessao");
  expect(anonymous.status()).toBe(503);
  expect(await anonymous.json()).not.toHaveProperty("identity");
  expect(anonymous.headers()["cache-control"]).toContain("no-store");
  const forged = await request.get("/api/auth/sessao", {
    headers: { Cookie: "rede_apoio_session=" + "a".repeat(43) },
  });
  expect(forged.status()).toBe(503);
  await page.goto("/sessao");
  await expect(
    page.getByRole("heading", {
      name: "Acesso não autorizado ou indisponível",
    }),
  ).toBeVisible();
});
test("viewport curto contem scroll abaixo do header", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/login");
  const enter = page.getByRole("button", { name: "Entrar", exact: true });
  await enter.scrollIntoViewIfNeeded();
  const h = await page.locator("header").boundingBox(),
    b = await enter.boundingBox();
  expect(b!.y).toBeGreaterThanOrEqual(h!.y + h!.height);
  expect(b!.y + b!.height).toBeLessThanOrEqual(568);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  );
});
