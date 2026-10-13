#!/usr/bin/env node
// Reproduz o pacote SQL+EER da issue #124. Sem npm, MySQL ou app.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  "001_rede_de_apoio_schema.sql", "003_convite_cadastro_cuidador.sql",
  "004_cadastro_rate_limit.sql", "005_sessoes_login.sql"
];
const expected = [30, 1, 1, 2];
const scan = (s) => [...s.matchAll(
  /\bCREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-z_][a-z0-9_]*)\s*\(/gi
)].map((x) => x[1].toLowerCase());
const sources = files.map((name, i) => {
  const body = readFileSync(resolve(root, "database/mysql", name), "utf8");
  if (scan(body).length !== expected[i] || !body.endsWith("\n")) {
    throw Error("Fonte SQL inesperada: " + name);
  }
  if (/\b(?:DROP\s+(?:DATABASE|TABLE)|TRUNCATE\s+TABLE)\b/i.test(
    body.replace(/^\s*--[^\n]*$/gm, "")
  )) throw Error("Operacao destrutiva proibida em " + name);
  return { name, body };
});
const all = sources.flatMap((x) => scan(x.body));
if (all.length !== 34 || new Set(all).size !== 34) throw Error("Esperadas 34 tabelas");
const fk = [], checks = [], unique = [];
for (const s of sources) {
  const code = s.body.replace(/^\s*--[^\n]*$/gm, "");
  const blocks = [...code.matchAll(
    /\bCREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-z_][a-z0-9_]*)\s*\(/gi
  )];
  for (let k = 0; k < blocks.length; k++) {
    const table = blocks[k][1].toLowerCase();
    const body = code.slice(blocks[k].index, k + 1 < blocks.length ?
      blocks[k + 1].index : code.length);
    for (const m of body.matchAll(
      /\bCONSTRAINT\s+(\w+)\s+FOREIGN\s+KEY\s*\(([^)]+)\)\s*REFERENCES\s+(\w+)\s*\(([^)]+)\)/gi
    )) fk.push({ table, name: m[1], parent: m[3].toLowerCase() });
    for (const m of body.matchAll(/\bCONSTRAINT\s+(\w+)\s+CHECK\b/gi))
      checks.push({ table, name: m[1] });
    for (const m of body.matchAll(/\bUNIQUE\s+KEY\s+(\w+)\s*\(/gi))
      unique.push({ table, name: m[1] });
  }
}
if (fk.length < 70 || fk.some((x) => !all.includes(x.parent))) {
  throw Error("Inventario inesperado de FKs");
}
const sql = "-- ENTREGA SQL+EER V1 / Issue #124 / MySQL 8.4 / APENAS BANCO NOVO DESCARTAVEL\n" +
  "-- Arquivo GERADO de 001, 003, 004, 005. Nunca edite este arquivo manualmente.\n" +
  "-- Nao executa DML, nao concede papeis, nao implanta aplicativo, nao libera producao.\n" +
  "-- Avisos historicos de 'nao executado' nos SQL fonte nao descrevem o ensaio atual.\n\n" +
  sources.map((x) => "-- INICIO " + x.name + "\n" + x.body +
    "-- FIM " + x.name + "\n\n").join("");
const ordered = (xs) => xs.sort((a, b) =>
  (a.table + a.name).localeCompare(b.table + b.name));
const manifest = {
  schema: "rede_de_apoio", mysql_required: "8.4.x",
  sources: sources.map((s) => ({
    path: "database/mysql/" + s.name, tables: scan(s.body)
  })),
  table_count: 34, tables: [...all].sort(), fk_count: fk.length,
  foreign_keys: ordered(fk), checks: ordered(checks),
  unique_indexes: ordered(unique),
  evidence: "estrutura SQL; nao comprova autorizacao de negocio ou EER Workbench"
};
const dot = [
  "digraph rede_de_apoio {",
  '  graph [rankdir=LR, overlap=false, splines=true, nodesep=0.25, ranksep=1];',
  '  node [shape=box, fontsize=10];',
  ...manifest.tables.map((t) => "  " + JSON.stringify(t) + ";"),
  ...manifest.foreign_keys.map((f) => "  " + JSON.stringify(f.table) +
    " -> " + JSON.stringify(f.parent) + " [label=" +
    JSON.stringify(f.name) + ", fontsize=7];"),
  "}", ""
].join("\n");
const output = [
  ["entrega/sql-eer/01_schema_completo_v1.sql", sql],
  ["entrega/sql-eer/02_manifest_estrutura.json", JSON.stringify(manifest, null, 2) + "\n"],
  ["entrega/sql-eer/03_relacionamentos_referencia.dot", dot]
];
for (const [name, content] of output) {
  const file = resolve(root, name);
  if (process.argv.includes("--check")) {
    if (readFileSync(file, "utf8") !== content) throw Error("Drift: " + name);
  } else {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, content);
  }
}
console.log("PASS SQL+EER: 34 tabelas, " + fk.length + " FKs; modo " +
  (process.argv.includes("--check") ? "check" : "write"));
