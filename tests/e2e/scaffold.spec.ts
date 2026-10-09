import { expect, test } from "@playwright/test";
test("página técnica renderiza sem MySQL e preserva shell ao rolar", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(
    page.getByRole("heading", { name: "Base pronta para desenvolvimento" }),
  ).toBeVisible();
  await expect(page.getByText("DEMONSTRAÇÃO TÉCNICA PROVISÓRIA")).toBeVisible();
  await expect(page.locator("form")).toHaveCount(0);
  const nav = page.getByRole("navigation", { name: "Navegação principal" });
  await expect(nav.locator('[aria-disabled="true"]')).toHaveCount(4);
  for (const item of await nav.locator(".nav-item").all()) {
    const box = await item.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(48);
    expect(box?.width).toBeGreaterThanOrEqual(48);
  }
  await page.screenshot({
    path: testInfo.outputPath("scaffold.png"),
    fullPage: true,
  });
  const headerBefore = await page.locator("header").boundingBox();
  const navBefore = await nav.boundingBox();
  // Estressa conteúdo longo sem introduzir uma rota ou dados de domínio de teste.
  await page.locator("main").evaluate((element) => {
    const content = document.createElement("p");
    content.textContent = "Conteúdo técnico para teste de rolagem.";
    content.style.height = "2000px";
    element.append(content);
    element.scrollTop = 1000;
  });
  await expect
    .poll(() => page.locator("main").evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0);
  expect(await page.locator("header").boundingBox()).toEqual(headerBefore);
  expect(await nav.boundingBox()).toEqual(navBefore);
  const geometry = await page.evaluate(() => {
    const main = document.querySelector("main")!;
    const header = document.querySelector("header")!;
    const nav = document.querySelector("nav")!;
    return {
      mainTop: main.getBoundingClientRect().top,
      headerBottom: header.getBoundingClientRect().bottom,
      mainBottom: main.getBoundingClientRect().bottom,
      navTop: nav.getBoundingClientRect().top,
      overflow: getComputedStyle(main).overflowY,
      horizontalOverflow: document.documentElement.scrollWidth > innerWidth,
      bodyScroll: scrollY,
    };
  });
  expect(geometry.mainTop).toBeGreaterThanOrEqual(geometry.headerBottom);
  expect(geometry.mainBottom).toBeLessThanOrEqual(geometry.navTop);
  expect(geometry.overflow).toBe("auto");
  expect(geometry.horizontalOverflow).toBe(false);
  expect(geometry.bodyScroll).toBe(0);
  expect(errors).toEqual([]);
});
