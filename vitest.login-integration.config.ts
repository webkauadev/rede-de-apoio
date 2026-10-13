import { defineConfig } from "vitest/config";
import base from "./vitest.integration.config";
export default defineConfig({
  ...base,
  test: { ...base.test, include: ["tests/integration/login.mysql.test.ts"] },
});
