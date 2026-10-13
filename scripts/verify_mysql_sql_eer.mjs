#!/usr/bin/env node
// QA SOMENTE LEITURA do esquema completo importado em MySQL 8.4 local descartavel.
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const manifest = JSON.parse(readFileSync(
  resolve(root, "entrega/sql-eer/02_manifest_estrutura.json"), "utf8"
));
const host = process.env.DATABASE_HOST;
const port = Number(process.env.DATABASE_PORT || 3306);
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;
if (process.env.SQL_EER_DISPOSABLE_CONFIRMED !== "YES" ||
    !["localhost", "127.0.0.1", "::1"].includes(host) ||
    !user || !password || !Number.isInteger(port) || port < 1 || port > 65535) {
  throw Error("Verificacao apenas em recurso MySQL 8.4 descartavel, loopback, autorizado.");
}
const schema = "rede_de_apoio";
let connection;
const reject = (condition, why) => { if (condition) throw Error(why); };
try {
  connection = await mysql.createConnection({
    host, port, user, password, database: schema, connectTimeout: 5000
  });
  const [[v]] = await connection.query("SELECT VERSION() AS version");
  reject(!/^8\.4\./.test(v.version), "Versao nao e MySQL 8.4");
  const [tables] = await connection.execute(
    "SELECT TABLE_NAME AS t, ENGINE AS e FROM information_schema.tables WHERE TABLE_SCHEMA=? AND TABLE_TYPE='BASE TABLE'",
    [schema]
  );
  reject(JSON.stringify(tables.map((x) => x.t).sort()) !==
    JSON.stringify(manifest.tables), "Tabela ausente ou extra");
  reject(tables.some((x) => x.e !== "InnoDB"), "Tabela fora de InnoDB");
  const [pks] = await connection.execute(
    "SELECT TABLE_NAME AS t, COUNT(*) AS n FROM information_schema.table_constraints WHERE CONSTRAINT_SCHEMA=? AND CONSTRAINT_TYPE='PRIMARY KEY' GROUP BY TABLE_NAME",
    [schema]
  );
  reject(pks.length !== 34 || pks.some((x) => Number(x.n) !== 1), "PK ausente");
  const [fks] = await connection.execute(
    "SELECT TABLE_NAME AS t, CONSTRAINT_NAME AS n, REFERENCED_TABLE_NAME AS p FROM information_schema.key_column_usage WHERE TABLE_SCHEMA=? AND REFERENCED_TABLE_NAME IS NOT NULL GROUP BY TABLE_NAME, CONSTRAINT_NAME, REFERENCED_TABLE_NAME",
    [schema]
  );
  const actualFK = new Set(fks.map((x) => x.t + "/" + x.n + "/" + x.p));
  reject(actualFK.size !== manifest.foreign_keys.length ||
    manifest.foreign_keys.some((x) => !actualFK.has(
      x.table + "/" + x.name + "/" + x.parent
    )), "FK divergente");
  const [cs] = await connection.execute(
    "SELECT TABLE_NAME AS t, CONSTRAINT_NAME AS n FROM information_schema.table_constraints WHERE CONSTRAINT_SCHEMA=? AND CONSTRAINT_TYPE='CHECK'",
    [schema]
  );
  const cc = new Set(cs.map((x) => x.t + "/" + x.n));
  reject(manifest.checks.some((x) => !cc.has(x.table + "/" + x.name)), "CHECK ausente");
  const [is] = await connection.execute(
    "SELECT TABLE_NAME AS t, INDEX_NAME AS n FROM information_schema.statistics WHERE TABLE_SCHEMA=? AND NON_UNIQUE=0 GROUP BY TABLE_NAME, INDEX_NAME",
    [schema]
  );
  const uu = new Set(is.map((x) => x.t + "/" + x.n));
  reject(manifest.unique_indexes.some((x) => !uu.has(x.table + "/" + x.name)),
    "UNIQUE ausente");
  console.log("PASS MySQL " + v.version + ": 34 tabelas, 34 PK, " +
    actualFK.size + " FKs, todas UNIQUE/CHECK conferidas; somente leitura.");
} catch (error) {
  console.error("FAIL QA fisico:", error.message);
  process.exitCode = 1;
} finally {
  if (connection) await connection.end();
}
