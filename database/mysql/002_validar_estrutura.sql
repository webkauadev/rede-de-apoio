-- Consultas SOMENTE LEITURA. Executar somente DEPOIS do arquivo 001 no MySQL local.
-- MySQL Workbench: Database > Reverse Engineer para gerar o EER.
SELECT VERSION() AS mysql_version;
SELECT
  COUNT(*) AS total_tabelas,
  (COUNT(*) = 30) AS corresponde_a_v1
FROM information_schema.tables
WHERE table_schema = 'rede_de_apoio' AND table_type = 'BASE TABLE';

SELECT
  table_name,
  table_comment
FROM information_schema.tables
WHERE table_schema = 'rede_de_apoio'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

SELECT
  table_name,
  constraint_type,
  COUNT(*) AS quantidade
FROM information_schema.table_constraints
WHERE constraint_schema = 'rede_de_apoio'
GROUP BY table_name, constraint_type
ORDER BY table_name, constraint_type;

SELECT
  table_name,
  constraint_name,
  referenced_table_name
FROM information_schema.key_column_usage
WHERE table_schema = 'rede_de_apoio'
  AND referenced_table_name IS NOT NULL
GROUP BY table_name, constraint_name, referenced_table_name
ORDER BY table_name, constraint_name;

-- Conferir regras especiais no SHOW CREATE TABLE:
SHOW CREATE TABLE rede_de_apoio.membro_rede;
SHOW CREATE TABLE rede_de_apoio.atribuicao_papel_familiar;
SHOW CREATE TABLE rede_de_apoio.plantao;
SHOW CREATE TABLE rede_de_apoio.conclusao_tarefa;
SHOW CREATE TABLE rede_de_apoio.ocorrencia_programada;
SHOW CREATE TABLE rede_de_apoio.administracao_medicamento;

-- Novas estruturas do prototipo V1:
SHOW CREATE TABLE rede_de_apoio.habilitacao_acesso_idoso;
SHOW CREATE TABLE rede_de_apoio.historico_plantao;
-- Conferir rede UNIQUE(pessoa_idosa_id) e administracao UNIQUE(rede_id,ocorrencia_id):
SHOW CREATE TABLE rede_de_apoio.rede_cuidado;
