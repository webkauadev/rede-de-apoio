/** Ensaio autorizado DEC-AUTH-001. Recursos novos, loopback, segredos fora de logs/Git. */
import { spawnSync } from "node:child_process";
import { mkdtemp, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, dirname, basename } from "node:path";
import { randomBytes } from "node:crypto";
import { createServer } from "node:net";
import mysql from "mysql2/promise";

function podman(args) {
  const result = spawnSync("podman", args, { encoding: "utf8" });
  if (result.status !== 0)
    throw new Error(
      "Podman falhou; nenhum recurso preexistente pode ser removido.",
    );
  return result.stdout.trim();
}
async function initialize(path) {
  const { name, id, env } = JSON.parse(await readFile(path, "utf8"));
  if (
    !name.startsWith("rede-apoio-us001-") ||
    podman([
      "inspect",
      "--format",
      '{{index .Config.Labels "rede-apoio.us001.disposable"}}',
      id,
    ]) !== "true"
  )
    throw new Error("Identificacao do ensaio nao confere.");
  const dir = join(path, "..");
  const port = Number(env.DATABASE_PORT);
  const password = env.DATABASE_PASSWORD;
  let connection;
  for (let i = 0; i < 300; i++) {
    try {
      connection = await mysql.createConnection({
        host: "127.0.0.1",
        port,
        database: env.DATABASE_NAME,
        user: env.DATABASE_USER,
        password,
        multipleStatements: true,
        connectTimeout: 1000,
      });
      break;
    } catch {
      if (i % 15 === 0) process.stdout.write("Aguardando MySQL novo...\n");
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
  if (!connection)
    throw new Error(
      "MySQL nao iniciou; estado privado permite cleanup identificado.",
    );
  try {
    const [version] = await connection.query("SELECT VERSION() AS version");
    if (!version[0].version.startsWith("8.4."))
      throw new Error("Versao nao autorizada.");
    const count = async () =>
      (
        await connection.query(
          "SELECT COUNT(*) AS total FROM information_schema.tables WHERE table_schema='rede_de_apoio' AND table_type='BASE TABLE'",
        )
      )[0][0].total;
    if ((await count()) !== 0)
      throw new Error("Schema precisa ser novo e vazio.");
    const results = {
      version: version[0].version,
      resource: {
        name,
        image: podman(["inspect", "--format", "{{.Image}}", id]),
        host: "127.0.0.1",
        port,
      },
      tableCounts: {},
    };
    for (const file of [
      "001_rede_de_apoio_schema.sql",
      "002_validar_estrutura.sql",
      "003_convite_cadastro_cuidador.sql",
      "004_cadastro_rate_limit.sql",
    ]) {
      await connection.query(
        await readFile(join("database/mysql", file), "utf8"),
      );
      results.tableCounts[file] = await count();
      const expected = file.startsWith("003")
        ? 31
        : file.startsWith("004")
          ? 32
          : 30;
      if (results.tableCounts[file] !== expected)
        throw new Error("Contagem de tabelas inesperada.");
      process.stdout.write(`${file}: executado; ${await count()} tabelas\n`);
    }
    results.ddl = {};
    for (const table of [
      "usuario",
      "convite_cadastro_cuidador",
      "cadastro_rate_limit",
      "auditoria",
    ])
      results.ddl[table] = (
        await connection.query(`SHOW CREATE TABLE ${table}`)
      )[0][0]["Create Table"];
    await writeFile(
      join(dir, "structure-evidence.json"),
      JSON.stringify(results, null, 2),
      { mode: 0o600 },
    );
    process.stdout.write(
      `MySQL ${results.version}: estrutura validada; segredos nao publicados.\n`,
    );
  } finally {
    await connection.end();
  }
}
const [action, path] = process.argv.slice(2);
try {
  if (action === "start") {
    if (podman(["info", "--format", "{{.Host.Security.Rootless}}"]) !== "true")
      throw new Error("Podman precisa ser rootless.");
    const dir = await mkdtemp(join(tmpdir(), "rede-apoio-us001-"));
    const name = `rede-apoio-us001-${randomBytes(6).toString("hex")}`;
    const server = createServer();
    await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
    const port = server.address().port;
    await new Promise((resolve) => server.close(resolve));
    const password = randomBytes(32).toString("hex");
    const env = {
      DATABASE_HOST: "127.0.0.1",
      DATABASE_PORT: String(port),
      DATABASE_NAME: "rede_de_apoio",
      DATABASE_USER: "us001_test",
      DATABASE_PASSWORD: password,
      REGISTRATION_ENVIRONMENT: "local-disposable",
      APPLICATION_ORIGIN: "http://127.0.0.1:3100",
      US001_INTEGRATION: "authorized-disposable",
    };
    const envFile = join(dir, "mysql.env");
    await writeFile(
      envFile,
      `MYSQL_ROOT_PASSWORD=${randomBytes(32).toString("hex")}\nMYSQL_DATABASE=rede_de_apoio\nMYSQL_USER=us001_test\nMYSQL_PASSWORD=${password}\n`,
      { mode: 0o600 },
    );
    const id = podman([
      "run",
      "-d",
      "--name",
      name,
      "--label",
      "rede-apoio.us001.disposable=true",
      "--env-file",
      envFile,
      "-p",
      `127.0.0.1:${port}:3306`,
      "docker.io/library/mysql:8.4",
    ]);
    await writeFile(
      join(dir, "state.json"),
      JSON.stringify({ name, id, env }),
      { mode: 0o600 },
    );
    process.stdout.write(
      `Estado privado: ${join(dir, "state.json")}\nContainer novo: ${name}; loopback:${port}\n`,
    );
    await initialize(join(dir, "state.json"));
  } else if (action === "initialize") {
    await initialize(path);
  } else if (action === "stop") {
    if (
      basename(path) !== "state.json" ||
      !basename(dirname(path)).startsWith("rede-apoio-us001-") ||
      dirname(dirname(path)) !== tmpdir()
    )
      throw new Error("Diretorio privado do ensaio nao confere.");
    const state = JSON.parse(await readFile(path, "utf8"));
    if (
      !state.name.startsWith("rede-apoio-us001-") ||
      !/^[a-f0-9]{64}$/.test(state.id) ||
      podman([
        "inspect",
        "--format",
        '{{index .Config.Labels "rede-apoio.us001.disposable"}}',
        state.id,
      ]) !== "true" ||
      podman(["inspect", "--format", "{{.Name}}", state.id]) !== state.name
    )
      throw new Error("Identificacao do ensaio nao confere.");
    podman(["rm", "-f", "-v", state.id]);
    await rm(dirname(path), { recursive: true });
    process.stdout.write(
      "Somente container e volume anonimo deste ensaio foram removidos.\n",
    );
  } else throw new Error("Use start ou stop <state.json>.");
} catch {
  process.stderr.write(
    "Ensaio MySQL nao confirmado. Confira prontidao/identidade/versao; segredos nao sao registrados.\n",
  );
  process.exitCode = 1;
}
