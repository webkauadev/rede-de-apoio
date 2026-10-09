import { describe, expect, it } from "vitest";
import { readDatabaseConfig } from "@/server/db/config";
const synthetic = {
  DATABASE_HOST: "localhost",
  DATABASE_NAME: "synthetic",
  DATABASE_USER: "synthetic",
  DATABASE_PASSWORD: "synthetic-test-only",
};
describe("configuração MySQL sob demanda", () => {
  it("aceita a porta padrão e preserva BIGINT e DATETIME sem perda", () => {
    expect(readDatabaseConfig(synthetic)).toMatchObject({
      port: 3306,
      bigNumberStrings: true,
      dateStrings: true,
      timezone: "Z",
      multipleStatements: false,
    });
  });
  it.each(["", "0", "65536", "abc", "1.5"])(
    "rejeita porta inválida %s",
    (port) => {
      expect(() =>
        readDatabaseConfig({ ...synthetic, DATABASE_PORT: port }),
      ).toThrow("Configuração MySQL ausente ou inválida.");
    },
  );
  it("rejeita ambiente ausente sem divulgar valores", () => {
    expect(() => readDatabaseConfig({})).toThrow(
      "Configuração MySQL ausente ou inválida.",
    );
    expect(() =>
      readDatabaseConfig({ ...synthetic, DATABASE_HOST: "" }),
    ).toThrow(/^Configuração MySQL ausente ou inválida\.$/);
  });
});
