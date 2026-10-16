// Read-only capture of the actual imported schema, for Workbench relationship verification.
import mysql from "mysql2/promise";
import { writeFile } from "node:fs/promises";
import { loadState } from "./load-state.mjs";
const s = await loadState(process.argv[2]);
const c = await mysql.createConnection({
  host: "127.0.0.1",
  port: s.port,
  user: "root",
  password: s.password,
  database: "rede_de_apoio",
});
try {
  const [foreignKeys] = await c.execute(
    `SELECT k.TABLE_NAME AS child, k.CONSTRAINT_NAME AS name, k.COLUMN_NAME AS childColumn, k.REFERENCED_TABLE_NAME AS parent, k.REFERENCED_COLUMN_NAME AS parentColumn, k.ORDINAL_POSITION AS position, r.UPDATE_RULE AS updateRule, r.DELETE_RULE AS deleteRule FROM information_schema.key_column_usage k JOIN information_schema.referential_constraints r ON r.CONSTRAINT_SCHEMA=k.CONSTRAINT_SCHEMA AND r.CONSTRAINT_NAME=k.CONSTRAINT_NAME AND r.TABLE_NAME=k.TABLE_NAME WHERE k.CONSTRAINT_SCHEMA=? ORDER BY k.TABLE_NAME,k.CONSTRAINT_NAME,k.ORDINAL_POSITION`,
    ["rede_de_apoio"],
  );
  const [checks] = await c.execute(
    "SELECT CONSTRAINT_NAME AS name, CHECK_CLAUSE AS clause FROM information_schema.check_constraints WHERE CONSTRAINT_SCHEMA=? ORDER BY CONSTRAINT_NAME",
    ["rede_de_apoio"],
  );
  const [indexes] = await c.execute(
    "SELECT TABLE_NAME AS tableName,INDEX_NAME AS name,COLUMN_NAME AS columnName,SEQ_IN_INDEX AS position FROM information_schema.statistics WHERE TABLE_SCHEMA=? AND NON_UNIQUE=0 ORDER BY TABLE_NAME,INDEX_NAME,SEQ_IN_INDEX",
    ["rede_de_apoio"],
  );
  await writeFile(
    "entrega/sql-eer/estrutura_fisica.json",
    JSON.stringify({ foreignKeys, checks, indexes }, null, 2) + "\n",
  );
  console.log(
    "Captured actual FK columns, rules, CHECK and UNIQUE/PK metadata",
  );
} finally {
  await c.end();
}
