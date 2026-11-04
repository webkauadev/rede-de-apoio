import { test, expect } from "@playwright/test";
test("T12 cadastro baseline e targets @responsive", async ({ page }, info) => {
  await page.goto("/pessoa-idosa/cadastro");
  await expect(
    page.getByRole("heading", { name: "Cadastrar pessoa idosa" }),
  ).toBeVisible();
  await expect(
    page.getByText("Cadastro ainda indisponível:", { exact: false }),
  ).toBeVisible();
  for (const element of await page
    .locator("input,button,a:not(.skip-link)")
    .all()) {
    const box = await element.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(48);
    expect(box!.height).toBeGreaterThanOrEqual(48);
  }
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
  ).toBe(false);
  await expect(page.getByRole("navigation")).toHaveCount(0);
  await page.screenshot({
    path: info.outputPath("T12-registration.png"),
    fullPage: true,
  });
});
test("T12 validacao e foco @responsive", async ({ page }, info) => {
  let sent = 0;
  page.on("request", (r) => {
    if (r.url().endsWith("/api/pessoas-idosas")) sent++;
  });
  await page.goto("/pessoa-idosa/cadastro");
  await page.getByRole("button", { name: "Cadastrar pessoa idosa" }).click();
  await expect(page.getByLabel("Nome completo")).toBeFocused();
  await expect(page.getByText("Informe o nome completo.")).toBeVisible();
  expect(sent).toBe(0);
  await page.screenshot({
    path: info.outputPath("T12-validation.png"),
    fullPage: true,
  });
});
test("T12 handler real fechado sem ambiente nao declara sucesso", async ({
  page,
}) => {
  await page.goto("/pessoa-idosa/cadastro");
  await page.getByLabel("Nome completo").fill("Perfil sintético");
  const response = page.waitForResponse((r) =>
    r.url().endsWith("/api/pessoas-idosas"),
  );
  await page.getByRole("button", { name: "Cadastrar pessoa idosa" }).click();
  expect((await response).status()).toBe(503);
  await expect(page.locator("form").getByRole("alert")).toBeFocused();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Não foi possível confirmar",
  );
  expect((await page.context().cookies()).length).toBe(0);
});
test("T12 loading simulado impede duplicacao", async ({ page }) => {
  let release!: () => void;
  const waiting = new Promise<void>((r) => (release = r));
  let sent = 0;
  await page.route("**/api/pessoas-idosas", async (route) => {
    sent++;
    await waiting;
    await route.fulfill({
      status: 403,
      contentType: "application/json",
      body: '{"code":"BLOCKED_BY_DECISION"}',
    });
  });
  await page.goto("/pessoa-idosa/cadastro");
  await page.getByLabel("Nome completo").fill("Perfil sintético");
  await page.getByRole("button", { name: "Cadastrar pessoa idosa" }).click();
  try {
    await expect(
      page.getByRole("button", { name: "Verificando autorização…" }),
    ).toBeDisabled();
    await page
      .locator("form")
      .evaluate((f) =>
        f.dispatchEvent(
          new Event("submit", { bubbles: true, cancelable: true }),
        ),
      );
    expect(sent).toBe(1);
  } finally {
    release();
  }
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Cadastro ainda não liberado",
  );
});
