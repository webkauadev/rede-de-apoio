-- Validacao do ESQUEMA COMPLETO de 34 tabelas, apenas leitura.
-- O arquivo 002_validar_estrutura.sql ORIGINAL verifica so o baseline de 30.
SELECT VERSION() AS mysql_version;
SELECT COUNT(*) AS total_tabelas,
  IF(COUNT(*) = 34, 'PASS', 'FAIL') AS contagem_34
FROM information_schema.tables
WHERE table_schema = 'rede_de_apoio' AND table_type = 'BASE TABLE';
SELECT table_name, engine
FROM information_schema.tables WHERE table_schema = 'rede_de_apoio'
ORDER BY table_name;
SELECT constraint_type, COUNT(*) AS total
FROM information_schema.table_constraints
WHERE constraint_schema = 'rede_de_apoio'
GROUP BY constraint_type;
SELECT table_name, constraint_name, referenced_table_name
FROM information_schema.key_column_usage
WHERE table_schema = 'rede_de_apoio' AND referenced_table_name IS NOT NULL
GROUP BY table_name, constraint_name, referenced_table_name
ORDER BY table_name, constraint_name;
SHOW CREATE TABLE rede_de_apoio.rede_cuidado;
SHOW CREATE TABLE rede_de_apoio.membro_rede;
SHOW CREATE TABLE rede_de_apoio.atribuicao_papel_familiar;
SHOW CREATE TABLE rede_de_apoio.conclusao_tarefa;
SHOW CREATE TABLE rede_de_apoio.administracao_medicamento;
SHOW CREATE TABLE rede_de_apoio.convite_cadastro_cuidador;
SHOW CREATE TABLE rede_de_apoio.sessao_usuario;
SHOW CREATE TABLE rede_de_apoio.login_rate_limit;
