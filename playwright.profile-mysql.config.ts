import { defineConfig } from "@playwright/test";
import base from "./playwright.mysql.config";
export default defineConfig({
  ...base,
  testMatch: "pessoa-idosa.spec.ts",
  projects: base.projects?.filter((p) => p.name === "mobile-mysql"),
});
