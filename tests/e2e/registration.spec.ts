import { expect, test, type Page } from "@playwright/test";

async function fillValid(page: Page) {
  await page
    .getByLabel("Código de convite", { exact: true })
    .fill("a".repeat(43));
  await page
    .getByLabel("Nome completo", { exact: true })
    .fill("Conta sintética");
  await page.getByLabel("E-mail", { exact: true }).fill("test@example.invalid");
  await page.getByLabel("Senha", { exact: true }).fill("senha sintética");
  await page
    .getByLabel("Confirmar senha", { exact: true })
    .fill("senha sintética");
}

test("T02 preserva shell, campos, targets e separação da navegação autenticada", async ({
  page,
}, testInfo) => {
  await page.goto("/cadastro");
  await expect(
    page.getByRole("heading", { name: "Criar sua conta" }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Navegação principal" }),
  ).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Entrar" })).toBeDisabled();
  for (const control of await page.locator("input, button").all()) {
    const bounds = await control.boundingBox();
    expect(bounds?.height).toBeGreaterThanOrEqual(48);
    expect(bounds?.width).toBeGreaterThanOrEqual(48);
  }
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
  await page.screenshot({
    path: testInfo.outputPath("T02-default.png"),
    fullPage: true,
    scale: "css",
  });
});

test("validação acessível mantém T02 e não envia dados inválidos", async ({
  page,
}, testInfo) => {
  let requests = 0;
  page.on("request", (request) => {
    if (request.url().endsWith("/api/auth/cadastro")) requests++;
  });
  await page.goto("/cadastro");
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await expect(
    page.getByLabel("Código de convite", { exact: true }),
  ).toBeFocused();
  await expect(
    page.getByLabel("Nome completo", { exact: true }),
  ).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByText("Informe seu nome completo.")).toBeVisible();
  await fillValid(page);
  await page.getByLabel("E-mail", { exact: true }).fill("email inválido");
  await page.getByLabel("Confirmar senha", { exact: true }).fill("diferente");
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
  await expect(page.getByText("As senhas devem ser iguais.")).toBeVisible();
  expect(requests).toBe(0);
  await page.screenshot({
    path: testInfo.outputPath("T02-validation.png"),
    fullPage: true,
    scale: "css",
  });
});

test("visibilidade de senha tem nome acessível e preserva valor", async ({
  page,
}) => {
  await page.goto("/cadastro");
  await fillValid(page);
  const password = page.getByLabel("Senha", { exact: true });
  await page
    .getByRole("button", { name: "Mostrar senha", exact: true })
    .click();
  await expect(password).toHaveAttribute("type", "text");
  await expect(password).toHaveValue("senha sintética");
  await page
    .getByRole("button", { name: "Ocultar senha", exact: true })
    .click();
  await expect(password).toHaveAttribute("type", "password");
});

test("loading bloqueia reenvio e mantém a estrutura (resposta atrasada simulada)", async ({
  page,
}, testInfo) => {
  let release!: () => void;
  const waiting = new Promise<void>((resolve) => {
    release = resolve;
  });
  let requests = 0;
  await page.route("**/api/auth/cadastro", async (route) => {
    requests++;
    await waiting;
    await route.fulfill({
      status: 403,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Cadastro temporariamente indisponível.",
      }),
    });
  });
  await page.goto("/cadastro");
  await fillValid(page);
  await page
    .getByRole("button", { name: "Criar conta", exact: true })
    .scrollIntoViewIfNeeded();
  const before = await page.locator('[data-screen="T02"]').boundingBox();
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  try {
    await expect(
      page.getByRole("button", { name: "Criando conta…" }),
    ).toBeDisabled();
    await expect(
      page.getByLabel("Nome completo", { exact: true }),
    ).toBeDisabled();
    expect(await page.locator('[data-screen="T02"]').boundingBox()).toEqual(
      before,
    );
    await page.screenshot({
      path: testInfo.outputPath("T02-loading-simulated.png"),
      fullPage: true,
      scale: "css",
    });
  } finally {
    release();
  }
  await expect(page.locator("form").getByRole("alert")).toHaveText(
    "Cadastro temporariamente indisponível.",
  );
  expect(requests).toBe(1);
});

test("handler real nega cadastro pendente sem criar sessão e sem MySQL", async ({
  page,
}, testInfo) => {
  await page.goto("/cadastro");
  await fillValid(page);
  const response = page.waitForResponse((result) =>
    result.url().endsWith("/api/auth/cadastro"),
  );
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  expect((await response).status()).toBe(403);
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Cadastro indisponível neste ambiente",
  );
  expect(await page.context().cookies()).toEqual([]);
  await expect(page.getByText("Conta criada.", { exact: false })).toHaveCount(
    0,
  );
  await page.screenshot({
    path: testInfo.outputPath("T02-authorization-pending.png"),
    fullPage: true,
    scale: "css",
  });
});

test("API real recusa injeção de papel e requisições sem origem", async ({
  request,
  baseURL,
}) => {
  const data = {
    invitationToken: "a".repeat(43),
    name: "Conta sintética",
    email: "test@example.invalid",
    password: "senha sintética",
    confirmPassword: "senha sintética",
  };
  expect((await request.post("/api/auth/cadastro", { data })).status()).toBe(
    403,
  );
  const invalid = await request.post("/api/auth/cadastro", {
    headers: { Origin: baseURL! },
    data: { ...data, tipo_acesso: "PESSOA_IDOSA" },
  });
  expect(invalid.status()).toBe(422);
  expect(await invalid.text()).not.toContain(data.password);
});

test("viewport curto mantém scroll abaixo do header sem clipping de controles", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/cadastro");
  await page
    .getByRole("button", { name: "Criar conta", exact: true })
    .scrollIntoViewIfNeeded();
  const header = await page.locator("header").boundingBox();
  const button = await page
    .getByRole("button", { name: "Criar conta", exact: true })
    .boundingBox();
  expect(button!.y).toBeGreaterThanOrEqual(header!.y + header!.height);
  expect(button!.y + button!.height).toBeLessThanOrEqual(568);
  await expect(page.locator("header")).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    320,
  );
});

test("fragmento de convite e removido sem envio ao servidor (codigo sintetico invalido)", async ({
  page,
}) => {
  const requested: string[] = [];
  page.on("request", (r) => requested.push(r.url()));
  await page.goto("/cadastro#convite=" + "a".repeat(43));
  await expect(page).toHaveURL(/\/cadastro$/);
  expect(
    (await page
      .getByLabel("Código de convite", { exact: true })
      .inputValue()) === "a".repeat(43),
  ).toBe(true);
  expect(requested.some((url) => url.includes("convite="))).toBe(false);
});
