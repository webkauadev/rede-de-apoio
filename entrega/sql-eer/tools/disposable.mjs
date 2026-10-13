// Issue #124 only: new loopback MySQL; private state outside the repository.
import { spawnSync } from "node:child_process";
import { mkdtemp, readFile, writeFile, rm } from "node:fs/promises";
import { randomBytes } from "node:crypto";
import { createServer } from "node:net";
import mysql from "mysql2/promise";
import { loadState } from "./load-state.mjs";
const podman = (args) => {
  const r = spawnSync("podman", args, { encoding: "utf8" });
  if (r.status !== 0) throw Error("Podman failed; preserve existing resources");
  return r.stdout.trim();
};
const [action, path] = process.argv.slice(2);
if (action === "start") {
  if (podman(["info", "--format", "{{.Host.Security.Rootless}}"]) !== "true")
    throw Error("Rootless required");
  const dir = await mkdtemp("/tmp/rede-apoio-sql-eer-");
  const name = "rede-apoio-sql-eer-" + randomBytes(6).toString("hex");
  const s = createServer();
  await new Promise((r) => s.listen(0, "127.0.0.1", r));
  const port = s.address().port;
  await new Promise((r) => s.close(r));
  const password = randomBytes(32).toString("hex");
  await writeFile(
    dir + "/mysql.env",
    `MYSQL_ROOT_PASSWORD=${password}\nMYSQL_ROOT_HOST=%\n`,
    { mode: 0o600 },
  );
  const id = podman([
    "run",
    "-d",
    "--name",
    name,
    "--label",
    "rede-apoio.sql-eer.disposable=true",
    "--env-file",
    dir + "/mysql.env",
    "-p",
    `127.0.0.1:${port}:3306`,
    "docker.io/library/mysql:8.4",
  ]);
  await writeFile(
    dir + "/state.json",
    JSON.stringify({ name, id, port, password }),
    { mode: 0o600 },
  );
  console.log(dir + "/state.json");
} else {
  const state = await loadState(path);
  if (
    !state.name.startsWith("rede-apoio-sql-eer-") ||
    podman([
      "inspect",
      "--format",
      '{{index .Config.Labels "rede-apoio.sql-eer.disposable"}}',
      state.id,
    ]) !== "true"
  )
    throw Error("Ownership mismatch");
  if (action === "stop") {
    podman(["rm", "-f", "-v", state.id]);
    await rm(path.replace(/\/state.json$/, ""), { recursive: true });
    console.log("Own MySQL and private state removed");
  } else if (action === "import") {
    let c;
    for (let i = 0; i < 600; i++) {
      try {
        c = await mysql.createConnection({
          host: "127.0.0.1",
          port: state.port,
          user: "root",
          password: state.password,
          multipleStatements: true,
          connectTimeout: 1000,
        });
        break;
      } catch {
        if (i % 20 === 0) console.log("Waiting for new MySQL");
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
    if (!c) throw Error("New MySQL unavailable");
    try {
      const [[v]] = await c.query("SELECT VERSION() AS version");
      if (!v.version.startsWith("8.4.")) throw Error("Version mismatch");
      const [[before]] = await c.query(
        "SELECT COUNT(*) AS n FROM information_schema.schemata WHERE schema_name='rede_de_apoio'",
      );
      if (before.n !== 0) throw Error("Not an empty new database");
      const sql = await readFile(
        "entrega/sql-eer/01_schema_completo_v1.sql",
        "utf8",
      );
      await c.query(sql);
      const validation = await c.query(
        await readFile("entrega/sql-eer/02_validar_34_tabelas.sql", "utf8"),
      );
      await writeFile(
        "entrega/sql-eer/validacao_sql_real.json",
        JSON.stringify(
          {
            executedAt: new Date().toISOString(),
            version: v.version,
            importedFile: "01_schema_completo_v1.sql",
            imports: 1,
            emptySchemaBefore: true,
            validation: validation[0],
          },
          null,
          2,
        ) + "\n",
      );
      console.log("Single consolidated import PASS MySQL " + v.version);
      const r = spawnSync("node", ["scripts/verify_mysql_sql_eer.mjs"], {
        encoding: "utf8",
        env: {
          ...process.env,
          SQL_EER_DISPOSABLE_CONFIRMED: "YES",
          DATABASE_HOST: "127.0.0.1",
          DATABASE_PORT: String(state.port),
          DATABASE_USER: "root",
          DATABASE_PASSWORD: state.password,
        },
      });
      console.log(r.stdout);
      if (r.status !== 0) throw Error("Physical verifier failed");
    } finally {
      await c.end();
    }
  } else throw Error("Unknown action");
}
