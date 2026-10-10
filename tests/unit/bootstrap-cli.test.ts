import { spawnSync } from "node:child_process";
import { expect, it } from "vitest";

it("CLI nativa carrega TypeScript/server-only e nega ambiente nao autorizado", () => {
  const result = spawnSync(
    process.execPath,
    [
      "--conditions=react-server",
      "--import",
      "tsx",
      "scripts/invite-bootstrap.ts",
      "--email",
      "synthetic@example.invalid",
    ],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        REGISTRATION_ENVIRONMENT: "",
        APPLICATION_ORIGIN: "",
      },
    },
  );
  expect(result.status).toBe(1);
  expect(result.stderr).toContain("Operação de convite não confirmada.");
  expect(result.stdout).toBe("");
});
