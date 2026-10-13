// Minimal structural cases for #124. Synthetic fixtures in one rolled-back transaction.
import mysql from "mysql2/promise";
import { readFile, writeFile } from "node:fs/promises";
import { loadState } from "./load-state.mjs";
const state = await loadState(process.argv[2]);
const c = await mysql.createConnection({
  host: "127.0.0.1",
  port: state.port,
  user: "root",
  password: state.password,
  database: "rede_de_apoio",
});
const cases = [];
const insert = async (sql, args = []) => {
  const [r] = await c.execute(sql, args);
  return r.insertId;
};
const reject = async (name, sql, args, code) => {
  let got;
  try {
    await c.execute(sql, args);
  } catch (e) {
    got = e.code;
  }
  if (got !== code) throw Error(name + ": unexpected result " + got);
  cases.push({ name, status: "PASS", mysqlError: got });
};
try {
  await c.beginTransaction();
  const users = [];
  for (let i = 0; i < 4; i++)
    users.push(
      await insert(
        "INSERT INTO usuario(nome,email_normalizado,tipo_acesso) VALUES(?,?,?)",
        [
          "Fixture estrutural " + i,
          `sql-eer-${i}@example.invalid`,
          i === 3 ? "PESSOA_IDOSA" : "CUIDADOR",
        ],
      ),
    );
  const elder = await insert(
    "INSERT INTO pessoa_idosa(nome,cadastrado_por_usuario_id) VALUES(?,?)",
    ["Perfil sintético estrutural", users[0]],
  );
  const network = await insert(
    "INSERT INTO rede_cuidado(pessoa_idosa_id,nome,criada_por_usuario_id) VALUES(?,?,?)",
    [elder, "Fixture descartável", users[0]],
  );
  await reject(
    "Uma rede por pessoa idosa",
    "INSERT INTO rede_cuidado(pessoa_idosa_id,nome,criada_por_usuario_id) VALUES(?,?,?)",
    [elder, "Duplicada", users[0]],
    "ER_DUP_ENTRY",
  );
  const members = [];
  for (let i = 0; i < 3; i++)
    members.push(
      await insert(
        "INSERT INTO membro_rede(rede_id,usuario_id,categoria,vinculado_por_usuario_id) VALUES(?,?,?,?)",
        [
          network,
          users[i],
          i === 2 ? "PROFISSIONAL_SAUDE" : "FAMILIAR",
          users[0],
        ],
      ),
    );
  await reject(
    "Pessoa idosa não ganha vínculo cuidador",
    "INSERT INTO membro_rede(rede_id,usuario_id,categoria,vinculado_por_usuario_id) VALUES(?,?,?,?)",
    [network, users[3], "FAMILIAR", users[0]],
    "ER_NO_REFERENCED_ROW_2",
  );
  await reject(
    "Papel familiar requer categoria familiar",
    "INSERT INTO atribuicao_papel_familiar(rede_id,membro_id,papel,concedido_por_usuario_id) VALUES(?,?,?,?)",
    [network, members[2], "APOIO", users[0]],
    "ER_NO_REFERENCED_ROW_2",
  );
  await insert(
    "INSERT INTO atribuicao_papel_familiar(rede_id,membro_id,papel,concedido_por_usuario_id) VALUES(?,?,?,?)",
    [network, members[0], "PRINCIPAL", users[0]],
  );
  await reject(
    "No máximo um Principal ativo",
    "INSERT INTO atribuicao_papel_familiar(rede_id,membro_id,papel,concedido_por_usuario_id) VALUES(?,?,?,?)",
    [network, members[1], "PRINCIPAL", users[0]],
    "ER_DUP_ENTRY",
  );
  const task = await insert(
    "INSERT INTO tarefa(rede_id,titulo,criado_por_usuario_id) VALUES(?,?,?)",
    [network, "Tarefa sintética", users[0]],
  );
  const conclusion =
    "INSERT INTO conclusao_tarefa(rede_id,tarefa_id,ciclo_numero,executor_membro_id,autor_usuario_id,concluida_em) VALUES(?,?,?,?,?,?)";
  const ca = [network, task, 1, members[0], users[0], "2026-10-13 10:00:00"];
  await insert(conclusion, ca);
  await reject(
    "Uma conclusão por tarefa/ciclo",
    conclusion,
    ca,
    "ER_DUP_ENTRY",
  );
  await reject(
    "Sem segundo ciclo V1",
    conclusion,
    [network, task, 2, members[0], users[0], "2026-10-13 10:00:00"],
    "ER_CHECK_CONSTRAINT_VIOLATED",
  );
  const medication = await insert(
    "INSERT INTO medicamento(rede_id,pessoa_idosa_id,nome,cadastrado_por_usuario_id) VALUES(?,?,?,?)",
    [network, elder, "Fixture sem uso clínico", users[0]],
  );
  const regime = await insert(
    "INSERT INTO regime_medicamento(rede_id,medicamento_id,posologia_textual,inicio_vigencia,criado_por_usuario_id) VALUES(?,?,?,?,?)",
    [network, medication, "Fixture estrutural", "2026-10-13", users[0]],
  );
  const time = await insert(
    "INSERT INTO horario_regime(rede_id,regime_id,hora_local,fuso_iana,inicio_data) VALUES(?,?,?,?,?)",
    [network, regime, "10:00:00", "Etc/UTC", "2026-10-13"],
  );
  const occurrence = await insert(
    "INSERT INTO ocorrencia_programada(rede_id,horario_regime_id,previsto_em) VALUES(?,?,?)",
    [network, time, "2026-10-13 10:00:00"],
  );
  const administration =
    "INSERT INTO administracao_medicamento(rede_id,regime_id,horario_regime_id,ocorrencia_id,autor_usuario_id,realizada_em) VALUES(?,?,?,?,?,?)";
  const aa = [
    network,
    regime,
    time,
    occurrence,
    users[0],
    "2026-10-13 10:00:00",
  ];
  await insert(administration, aa);
  await reject(
    "Uma administração por ocorrência",
    administration,
    aa,
    "ER_DUP_ENTRY",
  );
  await reject(
    "Sessão exige expiração posterior",
    "INSERT INTO sessao_usuario(token_hash,usuario_id,credencial_hash,criado_em,expira_em) VALUES(?,?,?,?,?)",
    [
      "a".repeat(64),
      users[0],
      "b".repeat(64),
      "2026-10-13 10:00:00",
      "2026-10-13 10:00:00",
    ],
    "ER_CHECK_CONSTRAINT_VIOLATED",
  );
  await c.rollback();
  const manifest = JSON.parse(
    await readFile("entrega/sql-eer/02_manifest_estrutura.json", "utf8"),
  );
  for (const t of manifest.tables) {
    const [[r]] = await c.query("SELECT COUNT(*) AS n FROM `" + t + "`");
    if (r.n !== 0) throw Error("Residual fixture rows");
  }
  await writeFile(
    "entrega/sql-eer/testes_estruturais.json",
    JSON.stringify(
      {
        executedAt: new Date().toISOString(),
        cases,
        rolledBack: true,
        all34TablesEmpty: true,
        limits: [
          "DDL validates at most one Principal, not minimum members or application authorization",
          "Session CHECK validates timestamps, not runtime authentication expiry",
        ],
      },
      null,
      2,
    ) + "\n",
  );
  console.log(
    "PASS " +
      cases.length +
      " structural negative cases; rollback; all 34 tables empty",
  );
} finally {
  await c.rollback();
  await c.end();
}
