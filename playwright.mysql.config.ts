import { defineConfig, devices } from "@playwright/test";
// Diagnosticos DOM de falha poderiam persistir o token de capacidade.
process.env.PLAYWRIGHT_NO_COPY_PROMPT = "1";
export default defineConfig({
  testDir: "./tests/e2e/mysql",
  outputDir: "./test-results/mysql",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "off",
    screenshot: "off",
    video: "off",
  },
  projects: [
    {
      name: "mobile-mysql",
      use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } },
    },
    { name: "desktop-mysql", use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: "npm run start -- --hostname 127.0.0.1 --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 60000,
    env: { APPLICATION_ORIGIN: "http://127.0.0.1:3100" },
  },
});
