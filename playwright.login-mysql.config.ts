import { defineConfig } from "@playwright/test";
import base from "./playwright.mysql.config";
export default defineConfig({ ...base, testMatch: "login.spec.ts" });
