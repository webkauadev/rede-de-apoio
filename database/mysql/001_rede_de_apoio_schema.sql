-- Rede de Apoio a Cuidadores de Idosos
-- MySQL 8.4 / InnoDB / utf8mb4 - PROTOTIPO V1 CONSOLIDADO (homologacao delegada 2026-10-09)
-- Fonte: docs/09_BANCO_DE_DADOS/ (PR #115), RF01-RF30, US-001-US-036, RN-001..011
-- INSTRUCAO: executar SOMENTE em banco NOVO e descartavel pelo MySQL Workbench.
-- NUNCA executar contra producao. Nenhum dado pessoal real e inserido por este arquivo.
-- CONTRATO: SQL e desenho estrutural CANDIDATOS; nao substituem regras RN/US.
-- V1 DELEGADA / FONTE: docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md
--  * DB-001: uma unica rede historica por pessoa idosa (UNIQUE).
--  * DB-002: perfil primeiro; rede criada OPERACIONAL com Principal=1
--    e Profissional>=1 NA MESMA TRANSACAO. DDL nao consegue assegurar minimo.
--  * DB-003: membro_rede representa episodio historico de vinculacao.
--  * DB-004: unicidade maxima de Principal indexada; existencia minima
--    e serializacao dependem da transacao do backend.
--  * DB-005: plantoes distintos PODEM se sobrepor.
--  * DB-007/032: sem reabertura de tarefa na V1; uma conclusao por tarefa.
--  * DB-021: no maximo uma administracao por ocorrencia programada,
--    mas administracao avulsa explicitamente autorizada e evento distinto.
--  * DB-030: N02 enviado somente ao membro responsavel designado na
--    ocorrencia quando estiver realmente de plantao; caso contrario,
--    NAO usar fallback e registrar anomalIa operacional.
--  * DB-008/034/035: correcoes tipadas por dominio, snapshots completos.
--  * DB-018/033/038: cuidados LGPD, DST e auditabilidade precisam
--    validacao em ambiente real antes de dados pessoais reais.
--  * No grants, triggers, stored procedures, data fixtures ou seed.
--  * Esquema nao substitui autorizacao atual e auditabilidade na API.
--
-- Compatibilidade minima: MySQL >= 8.0.16 (CHECK validado); recomendado 8.4.
-- Para EER SEM subir servidor, Workbench: File > Import > Reverse Engineer MySQL Create Script.
-- Para criar de fato, importar este arquivo em uma instancia local descartavel.
--
CREATE DATABASE IF NOT EXISTS rede_de_apoio
  CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE rede_de_apoio;

-- =========================================================
-- 01 IDENTIDADES E REDE
-- =========================================================

CREATE TABLE IF NOT EXISTS usuario (
  usuario_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  nome VARCHAR(160) NOT NULL,
  email_normalizado VARCHAR(254) NOT NULL,
  senha_hash VARCHAR(255) NULL COMMENT 'Argon2id; NULL enquanto conta por convite nao for ativada',
  tipo_acesso VARCHAR(16) NOT NULL DEFAULT 'CUIDADOR',
  telefone VARCHAR(32) NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (usuario_id),
  UNIQUE KEY uq_usuario_email (email_normalizado),
  UNIQUE KEY uq_usuario_tipo (usuario_id, tipo_acesso),
  CONSTRAINT ck_usuario_tipo CHECK (tipo_acesso IN ('CUIDADOR','PESSOA_IDOSA'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Identidade de autenticacao; nao substitui o membro contextual da rede';

CREATE TABLE IF NOT EXISTS pessoa_idosa (
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  usuario_titular_id BIGINT UNSIGNED NULL,
  tipo_titular_exigido VARCHAR(16) NOT NULL DEFAULT 'PESSOA_IDOSA',
  nome VARCHAR(160) NOT NULL,
  data_nascimento DATE NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  cadastrado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (pessoa_idosa_id),
  UNIQUE KEY uq_pessoa_titular (usuario_titular_id),
  UNIQUE KEY uq_pessoa_titular_par (pessoa_idosa_id, usuario_titular_id),
  KEY ix_pessoa_cadastrante (cadastrado_por_usuario_id),
  CONSTRAINT ck_pessoa_titular_tipo CHECK (tipo_titular_exigido = 'PESSOA_IDOSA'),
  CONSTRAINT fk_pessoa_conta_tipo FOREIGN KEY (usuario_titular_id, tipo_titular_exigido)
    REFERENCES usuario (usuario_id, tipo_acesso),
  CONSTRAINT fk_pessoa_cadastrante FOREIGN KEY (cadastrado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Perfil pode existir sem conta propria; titular e exclusivamente de leitura';

CREATE TABLE IF NOT EXISTS rede_cuidado (
  rede_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL,
  nome VARCHAR(160) NOT NULL,
  situacao VARCHAR(20) NOT NULL DEFAULT 'OPERACIONAL',
  versao INT UNSIGNED NOT NULL DEFAULT 1,
  criada_por_usuario_id BIGINT UNSIGNED NOT NULL,
  criada_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  ativada_em DATETIME(6) NULL,
  PRIMARY KEY (rede_id),
  UNIQUE KEY uq_rede_pessoa (rede_id, pessoa_idosa_id),
  UNIQUE KEY uq_rede_idoso_v1 (pessoa_idosa_id),
  KEY ix_rede_pessoa_situacao (pessoa_idosa_id, situacao),
  KEY ix_rede_criador (criada_por_usuario_id),
  CONSTRAINT ck_rede_situacao CHECK (situacao IN ('OPERACIONAL','ENCERRADA')),
  CONSTRAINT ck_rede_versao CHECK (versao >= 1),
  CONSTRAINT fk_rede_pessoa FOREIGN KEY (pessoa_idosa_id)
    REFERENCES pessoa_idosa (pessoa_idosa_id),
  CONSTRAINT fk_rede_criador FOREIGN KEY (criada_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='V1: no maximo uma rede por pessoa. Bootstrap completo na transacao (Principal+Profissional)';

CREATE TABLE IF NOT EXISTS membro_rede (
  membro_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  usuario_id BIGINT UNSIGNED NOT NULL,
  tipo_usuario_exigido VARCHAR(16) NOT NULL DEFAULT 'CUIDADOR',
  categoria VARCHAR(24) NOT NULL,
  vinculado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  desvinculado_em DATETIME(6) NULL,
  vinculado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  usuario_vinculado_ativo BIGINT UNSIGNED GENERATED ALWAYS AS (
    CASE WHEN desvinculado_em IS NULL THEN usuario_id ELSE NULL END
  ) STORED,
  PRIMARY KEY (membro_id),
  UNIQUE KEY uq_membro_escopo (rede_id, membro_id),
  UNIQUE KEY uq_membro_escopo_categoria (rede_id, membro_id, categoria),
  UNIQUE KEY uq_membro_usuario_ativo (rede_id, usuario_vinculado_ativo),
  KEY ix_membro_usuario_hist (usuario_id, rede_id, vinculado_em),
  KEY ix_membro_registrador (vinculado_por_usuario_id),
  CONSTRAINT ck_membro_tipo_usuario CHECK (tipo_usuario_exigido = 'CUIDADOR'),
  CONSTRAINT ck_membro_categoria CHECK (categoria IN ('FAMILIAR','PROFISSIONAL_SAUDE')),
  CONSTRAINT ck_membro_periodo CHECK (
    desvinculado_em IS NULL OR desvinculado_em >= vinculado_em
  ),
  CONSTRAINT fk_membro_rede FOREIGN KEY (rede_id)
    REFERENCES rede_cuidado (rede_id),
  CONSTRAINT fk_membro_usuario_tipo FOREIGN KEY (usuario_id, tipo_usuario_exigido)
    REFERENCES usuario (usuario_id, tipo_acesso),
  CONSTRAINT fk_membro_vinculador FOREIGN KEY (vinculado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Vinculo historico por episodio; usuario nao deve ganhar acesso depois do fim';

CREATE TABLE IF NOT EXISTS atribuicao_papel_familiar (
  atribuicao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  membro_id BIGINT UNSIGNED NOT NULL,
  categoria_exigida VARCHAR(24) NOT NULL DEFAULT 'FAMILIAR',
  papel VARCHAR(16) NOT NULL,
  concedido_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  revogado_em DATETIME(6) NULL,
  concedido_por_usuario_id BIGINT UNSIGNED NOT NULL,
  principal_ativo_rede BIGINT UNSIGNED GENERATED ALWAYS AS (
    CASE WHEN papel = 'PRINCIPAL' AND revogado_em IS NULL
      THEN rede_id ELSE NULL END
  ) STORED,
  papel_ativo_membro BIGINT UNSIGNED GENERATED ALWAYS AS (
    CASE WHEN revogado_em IS NULL THEN membro_id ELSE NULL END
  ) STORED,
  PRIMARY KEY (atribuicao_id),
  UNIQUE KEY uq_papel_principal_rede (principal_ativo_rede),
  UNIQUE KEY uq_papel_vigente_membro (rede_id, papel, papel_ativo_membro),
  KEY ix_papel_membro_hist (rede_id, membro_id, concedido_em),
  KEY ix_papel_concedente (concedido_por_usuario_id),
  CONSTRAINT ck_papel_categoria CHECK (categoria_exigida = 'FAMILIAR'),
  CONSTRAINT ck_papel_tipo CHECK (papel IN ('PRINCIPAL','APOIO','EMERGENCIA')),
  CONSTRAINT ck_papel_periodo CHECK (revogado_em IS NULL OR revogado_em >= concedido_em),
  CONSTRAINT fk_papel_membro_familiar FOREIGN KEY (rede_id, membro_id, categoria_exigida)
    REFERENCES membro_rede (rede_id, membro_id, categoria),
  CONSTRAINT fk_papel_concedente FOREIGN KEY (concedido_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='UNIQUE assegura no maximo 1 Principal; pelo menos 1 depende da transacao';

-- =========================================================
-- 02 PLANTOES, TROCAS, TAREFAS, COMPROMISSOS
-- =========================================================

CREATE TABLE IF NOT EXISTS plantao (
  plantao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  membro_responsavel_id BIGINT UNSIGNED NOT NULL,
  inicio_em DATETIME(6) NOT NULL,
  fim_em DATETIME(6) NOT NULL,
  situacao VARCHAR(16) NOT NULL DEFAULT 'AGENDADO',
  versao INT UNSIGNED NOT NULL DEFAULT 1,
  criado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  atualizado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (plantao_id),
  UNIQUE KEY uq_plantao_escopo (rede_id, plantao_id),
  KEY ix_plantao_rede_tempo (rede_id, inicio_em, fim_em),
  KEY ix_plantao_responsavel (rede_id, membro_responsavel_id, inicio_em),
  KEY ix_plantao_criador (criado_por_usuario_id),
  CONSTRAINT ck_plantao_periodo CHECK (inicio_em < fim_em),
  CONSTRAINT ck_plantao_versao CHECK (versao >= 1),
  CONSTRAINT ck_plantao_situacao CHECK (situacao IN ('AGENDADO','CANCELADO','CONCLUIDO')),
  CONSTRAINT fk_plantao_rede FOREIGN KEY (rede_id) REFERENCES rede_cuidado (rede_id),
  CONSTRAINT fk_plantao_membro FOREIGN KEY (rede_id, membro_responsavel_id)
    REFERENCES membro_rede (rede_id, membro_id),
  CONSTRAINT fk_plantao_criador FOREIGN KEY (criado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Permite plantões de intervalos sobrepostos; Plantonista Atual é derivado';

CREATE TABLE IF NOT EXISTS solicitacao_troca_plantao (
  troca_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  plantao_id BIGINT UNSIGNED NOT NULL,
  versao_plantao_esperada INT UNSIGNED NOT NULL,
  solicitante_membro_id BIGINT UNSIGNED NOT NULL,
  destinatario_membro_id BIGINT UNSIGNED NOT NULL,
  respondido_por_membro_id BIGINT UNSIGNED NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'PENDENTE',
  justificativa TEXT NULL,
  solicitada_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  respondida_em DATETIME(6) NULL,
  PRIMARY KEY (troca_id),
  KEY ix_troca_plantao_status (rede_id, plantao_id, status),
  KEY ix_troca_solicitante (rede_id, solicitante_membro_id),
  KEY ix_troca_destinatario (rede_id, destinatario_membro_id),
  KEY ix_troca_respondente (rede_id, respondido_por_membro_id),
  CONSTRAINT ck_troca_status CHECK (status IN ('PENDENTE','ACEITA','RECUSADA','CANCELADA')),
  CONSTRAINT ck_troca_versao CHECK (versao_plantao_esperada >= 1),
  CONSTRAINT fk_troca_plantao FOREIGN KEY (rede_id, plantao_id)
    REFERENCES plantao (rede_id, plantao_id),
  CONSTRAINT fk_troca_solicitante FOREIGN KEY (rede_id, solicitante_membro_id)
    REFERENCES membro_rede (rede_id, membro_id),
  CONSTRAINT fk_troca_destinatario FOREIGN KEY (rede_id, destinatario_membro_id)
    REFERENCES membro_rede (rede_id, membro_id),
  CONSTRAINT fk_troca_respondente FOREIGN KEY (rede_id, respondido_por_membro_id)
    REFERENCES membro_rede (rede_id, membro_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='V1: troca de responsavel de um unico plantao, sem permuta bilateral';

CREATE TABLE IF NOT EXISTS tarefa (
  tarefa_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  responsavel_membro_id BIGINT UNSIGNED NULL,
  titulo VARCHAR(180) NOT NULL,
  descricao TEXT NULL,
  previsto_em DATETIME(6) NULL,
  prazo_em DATETIME(6) NULL,
  status VARCHAR(16) NOT NULL DEFAULT 'PENDENTE',
  ciclo_atual INT UNSIGNED NOT NULL DEFAULT 1,
  versao INT UNSIGNED NOT NULL DEFAULT 1,
  criado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (tarefa_id),
  UNIQUE KEY uq_tarefa_escopo (rede_id, tarefa_id),
  KEY ix_tarefa_rede_prazo (rede_id, prazo_em, status),
  KEY ix_tarefa_responsavel (rede_id, responsavel_membro_id),
  KEY ix_tarefa_criador (criado_por_usuario_id),
  CONSTRAINT ck_tarefa_status CHECK (status IN ('PENDENTE','CONCLUIDA','CANCELADA')),
  CONSTRAINT ck_tarefa_ciclo CHECK (ciclo_atual = 1 AND versao >= 1),
  CONSTRAINT fk_tarefa_rede FOREIGN KEY (rede_id) REFERENCES rede_cuidado (rede_id),
  CONSTRAINT fk_tarefa_responsavel FOREIGN KEY (rede_id, responsavel_membro_id)
    REFERENCES membro_rede (rede_id, membro_id),
  CONSTRAINT fk_tarefa_criador FOREIGN KEY (criado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='V1 nao reabre: ciclo unico=1; unica conclusao por tarefa';

CREATE TABLE IF NOT EXISTS conclusao_tarefa (
  conclusao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  tarefa_id BIGINT UNSIGNED NOT NULL,
  ciclo_numero INT UNSIGNED NOT NULL,
  executor_membro_id BIGINT UNSIGNED NOT NULL,
  autor_usuario_id BIGINT UNSIGNED NOT NULL,
  concluida_em DATETIME(6) NOT NULL,
  registrada_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  observacao TEXT NULL,
  chave_idempotencia VARCHAR(100) NULL,
  PRIMARY KEY (conclusao_id),
  UNIQUE KEY uq_conclusao_ciclo (rede_id, tarefa_id, ciclo_numero),
  UNIQUE KEY uq_conclusao_comando (rede_id, autor_usuario_id, chave_idempotencia),
  KEY ix_conclusao_executor (rede_id, executor_membro_id),
  KEY ix_conclusao_autor (autor_usuario_id),
  CONSTRAINT ck_conclusao_ciclo CHECK (ciclo_numero = 1),
  CONSTRAINT fk_conclusao_tarefa FOREIGN KEY (rede_id, tarefa_id)
    REFERENCES tarefa (rede_id, tarefa_id),
  CONSTRAINT fk_conclusao_executor FOREIGN KEY (rede_id, executor_membro_id)
    REFERENCES membro_rede (rede_id, membro_id),
  CONSTRAINT fk_conclusao_autor FOREIGN KEY (autor_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='DEC-S03: unica conclusao por tarefa/ciclo; conflito e rollback na API';

CREATE TABLE IF NOT EXISTS compromisso (
  compromisso_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL,
  responsavel_membro_id BIGINT UNSIGNED NULL,
  titulo VARCHAR(180) NOT NULL,
  detalhes TEXT NULL,
  local VARCHAR(240) NULL,
  inicio_em DATETIME(6) NOT NULL,
  fim_em DATETIME(6) NULL,
  criado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (compromisso_id),
  UNIQUE KEY uq_compromisso_escopo (rede_id, compromisso_id),
  KEY ix_compromisso_pessoa_tempo (rede_id, pessoa_idosa_id, inicio_em),
  KEY ix_compromisso_responsavel (rede_id, responsavel_membro_id),
  KEY ix_compromisso_criador (criado_por_usuario_id),
  CONSTRAINT ck_compromisso_periodo CHECK (fim_em IS NULL OR inicio_em < fim_em),
  CONSTRAINT fk_compromisso_contexto FOREIGN KEY (rede_id, pessoa_idosa_id)
    REFERENCES rede_cuidado (rede_id, pessoa_idosa_id),
  CONSTRAINT fk_compromisso_responsavel FOREIGN KEY (rede_id, responsavel_membro_id)
    REFERENCES membro_rede (rede_id, membro_id),
  CONSTRAINT fk_compromisso_criador FOREIGN KEY (criado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS consulta (
  consulta_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL,
  compromisso_id BIGINT UNSIGNED NULL,
  realizada_em DATETIME(6) NOT NULL,
  observacao_original TEXT NULL,
  autor_usuario_id BIGINT UNSIGNED NOT NULL,
  registrada_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (consulta_id),
  UNIQUE KEY uq_consulta_escopo (rede_id, consulta_id),
  KEY ix_consulta_pessoa_data (rede_id, pessoa_idosa_id, realizada_em),
  KEY ix_consulta_compromisso (rede_id, compromisso_id),
  KEY ix_consulta_autor (autor_usuario_id),
  CONSTRAINT fk_consulta_contexto FOREIGN KEY (rede_id, pessoa_idosa_id)
    REFERENCES rede_cuidado (rede_id, pessoa_idosa_id),
  CONSTRAINT fk_consulta_compromisso FOREIGN KEY (rede_id, compromisso_id)
    REFERENCES compromisso (rede_id, compromisso_id),
  CONSTRAINT fk_consulta_autor FOREIGN KEY (autor_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='V1: consulta pode ser independente de compromisso';

CREATE TABLE IF NOT EXISTS recomendacao (
  recomendacao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL,
  consulta_id BIGINT UNSIGNED NULL,
  descricao TEXT NOT NULL,
  autor_usuario_id BIGINT UNSIGNED NOT NULL,
  registrada_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (recomendacao_id),
  KEY ix_recomendacao_consulta (rede_id, consulta_id),
  KEY ix_recomendacao_pessoa (rede_id, pessoa_idosa_id),
  KEY ix_recomendacao_autor (autor_usuario_id),
  CONSTRAINT fk_recomendacao_contexto FOREIGN KEY (rede_id, pessoa_idosa_id)
    REFERENCES rede_cuidado (rede_id, pessoa_idosa_id),
  CONSTRAINT fk_recomendacao_consulta FOREIGN KEY (rede_id, consulta_id)
    REFERENCES consulta (rede_id, consulta_id),
  CONSTRAINT fk_recomendacao_autor FOREIGN KEY (autor_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =========================================================
-- 03 MEDICAMENTOS E PROGRAMAÇÃO
-- =========================================================

CREATE TABLE IF NOT EXISTS medicamento (
  medicamento_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL,
  nome VARCHAR(180) NOT NULL,
  apresentacao VARCHAR(180) NULL,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  cadastrado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  cadastrado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (medicamento_id),
  UNIQUE KEY uq_medicamento_escopo (rede_id, medicamento_id),
  KEY ix_medicamento_pessoa (rede_id, pessoa_idosa_id, ativo),
  KEY ix_medicamento_autor (cadastrado_por_usuario_id),
  CONSTRAINT fk_medicamento_contexto FOREIGN KEY (rede_id, pessoa_idosa_id)
    REFERENCES rede_cuidado (rede_id, pessoa_idosa_id),
  CONSTRAINT fk_medicamento_autor FOREIGN KEY (cadastrado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Recurso contextual por rede; nao criar catalogo clinico global';

CREATE TABLE IF NOT EXISTS regime_medicamento (
  regime_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  medicamento_id BIGINT UNSIGNED NOT NULL,
  versao_plano INT UNSIGNED NOT NULL DEFAULT 1,
  posologia_textual TEXT NOT NULL,
  inicio_vigencia DATE NOT NULL,
  fim_vigencia DATE NULL,
  criado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (regime_id),
  UNIQUE KEY uq_regime_escopo (rede_id, regime_id),
  UNIQUE KEY uq_regime_versao (rede_id, medicamento_id, versao_plano),
  KEY ix_regime_medicamento (rede_id, medicamento_id, inicio_vigencia),
  KEY ix_regime_autor (criado_por_usuario_id),
  CONSTRAINT ck_regime_vigencia CHECK (
    fim_vigencia IS NULL OR fim_vigencia >= inicio_vigencia
  ),
  CONSTRAINT ck_regime_versao CHECK (versao_plano >= 1),
  CONSTRAINT fk_regime_medicamento FOREIGN KEY (rede_id, medicamento_id)
    REFERENCES medicamento (rede_id, medicamento_id),
  CONSTRAINT fk_regime_autor FOREIGN KEY (criado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Atualizacoes de regime criam novo registro/versionamento do plano';

CREATE TABLE IF NOT EXISTS horario_regime (
  horario_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  regime_id BIGINT UNSIGNED NOT NULL,
  hora_local TIME NOT NULL,
  fuso_iana VARCHAR(64) NOT NULL,
  regra_recorrencia VARCHAR(255) NULL,
  inicio_data DATE NOT NULL,
  fim_data DATE NULL,
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (horario_id),
  UNIQUE KEY uq_horario_escopo (rede_id, horario_id),
  UNIQUE KEY uq_horario_regime_triplo (rede_id, regime_id, horario_id),
  KEY ix_horario_regime (rede_id, regime_id, hora_local),
  CONSTRAINT ck_horario_vigencia CHECK (fim_data IS NULL OR fim_data >= inicio_data),
  CONSTRAINT fk_horario_regime FOREIGN KEY (rede_id, regime_id)
    REFERENCES regime_medicamento (rede_id, regime_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='V1: horario local e fuso IANA; DST ambiguo exige resolucao manual; sem PRN automatico';

CREATE TABLE IF NOT EXISTS ocorrencia_programada (
  ocorrencia_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  tarefa_id BIGINT UNSIGNED NULL,
  horario_regime_id BIGINT UNSIGNED NULL,
  responsavel_membro_id BIGINT UNSIGNED NULL COMMENT 'N02 V1 somente ao designado elegivel; NULL exige auditoria e nenhum envio',
  previsto_em DATETIME(6) NOT NULL COMMENT 'Instante absoluto UTC; converter a partir da agenda civil',
  geracao_origem INT UNSIGNED NOT NULL DEFAULT 1,
  cancelada_em DATETIME(6) NULL,
  criada_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (ocorrencia_id),
  UNIQUE KEY uq_ocorrencia_escopo (rede_id, ocorrencia_id),
  UNIQUE KEY uq_ocorrencia_medicacao_triplo (rede_id, horario_regime_id, ocorrencia_id),
  UNIQUE KEY uq_ocorrencia_tarefa (rede_id, tarefa_id, previsto_em, geracao_origem),
  UNIQUE KEY uq_ocorrencia_horario (rede_id, horario_regime_id, previsto_em, geracao_origem),
  KEY ix_ocorrencia_rede_previsto (rede_id, previsto_em),
  KEY ix_ocorrencia_designado (rede_id, responsavel_membro_id),
  CONSTRAINT ck_ocorrencia_origem CHECK (
    (tarefa_id IS NOT NULL AND horario_regime_id IS NULL)
    OR (tarefa_id IS NULL AND horario_regime_id IS NOT NULL)
  ),
  CONSTRAINT ck_ocorrencia_geracao CHECK (geracao_origem >= 1),
  CONSTRAINT fk_ocorrencia_rede FOREIGN KEY (rede_id)
    REFERENCES rede_cuidado (rede_id),
  CONSTRAINT fk_ocorrencia_tarefa FOREIGN KEY (rede_id, tarefa_id)
    REFERENCES tarefa (rede_id, tarefa_id),
  CONSTRAINT fk_ocorrencia_horario FOREIGN KEY (rede_id, horario_regime_id)
    REFERENCES horario_regime (rede_id, horario_id),
  CONSTRAINT fk_ocorrencia_designado FOREIGN KEY (rede_id, responsavel_membro_id)
    REFERENCES membro_rede (rede_id, membro_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='V1: ocorrencia prevista de tarefa OU horario; N02 exige responsavel designado elegivel';

CREATE TABLE IF NOT EXISTS administracao_medicamento (
  administracao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  regime_id BIGINT UNSIGNED NOT NULL,
  horario_regime_id BIGINT UNSIGNED NULL,
  ocorrencia_id BIGINT UNSIGNED NULL,
  executor_membro_id BIGINT UNSIGNED NULL,
  autor_usuario_id BIGINT UNSIGNED NOT NULL,
  realizada_em DATETIME(6) NOT NULL COMMENT 'Instante declarado da execucao; nao e instante do alerta',
  registrada_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  observacao_original TEXT NULL,
  chave_idempotencia VARCHAR(100) NULL,
  PRIMARY KEY (administracao_id),
  UNIQUE KEY uq_administracao_escopo (rede_id, administracao_id),
  UNIQUE KEY uq_administracao_ocorrencia_v1 (rede_id, ocorrencia_id),
  UNIQUE KEY uq_administracao_comando (rede_id, autor_usuario_id, chave_idempotencia),
  KEY ix_administracao_regime (rede_id, regime_id, realizada_em),
  KEY ix_administracao_horario_fk (rede_id, regime_id, horario_regime_id),
  KEY ix_administracao_ocorrencia_fk (rede_id, horario_regime_id, ocorrencia_id),
  KEY ix_administracao_executor (rede_id, executor_membro_id),
  KEY ix_administracao_autor (autor_usuario_id),
  CONSTRAINT ck_administracao_ocorrencia CHECK (
    ocorrencia_id IS NULL OR horario_regime_id IS NOT NULL
  ),
  CONSTRAINT fk_administracao_regime FOREIGN KEY (rede_id, regime_id)
    REFERENCES regime_medicamento (rede_id, regime_id),
  CONSTRAINT fk_administracao_horario FOREIGN KEY (rede_id, regime_id, horario_regime_id)
    REFERENCES horario_regime (rede_id, regime_id, horario_id),
  CONSTRAINT fk_administracao_ocorrencia FOREIGN KEY (rede_id, horario_regime_id, ocorrencia_id)
    REFERENCES ocorrencia_programada (rede_id, horario_regime_id, ocorrencia_id),
  CONSTRAINT fk_administracao_executor FOREIGN KEY (rede_id, executor_membro_id)
    REFERENCES membro_rede (rede_id, membro_id),
  CONSTRAINT fk_administracao_autor FOREIGN KEY (autor_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='V1: maximo 1 administracao por ocorrencia (NULL permite avulsa autorizada); original imutavel';

-- =========================================================
-- 04 DIARIO, CORRECOES IMUTAVEIS E ANEXOS
-- =========================================================

CREATE TABLE IF NOT EXISTS registro_cuidado (
  registro_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL,
  tipo VARCHAR(20) NOT NULL,
  descricao_original TEXT NOT NULL,
  ocorrido_em DATETIME(6) NOT NULL,
  registrado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  autor_usuario_id BIGINT UNSIGNED NOT NULL,
  PRIMARY KEY (registro_id),
  UNIQUE KEY uq_registro_escopo (rede_id, registro_id),
  KEY ix_registro_historico (rede_id, pessoa_idosa_id, ocorrido_em),
  KEY ix_registro_autor (autor_usuario_id),
  CONSTRAINT ck_registro_tipo CHECK (tipo IN ('DIARIO','SINTOMA','INTERCORRENCIA')),
  CONSTRAINT fk_registro_contexto FOREIGN KEY (rede_id, pessoa_idosa_id)
    REFERENCES rede_cuidado (rede_id, pessoa_idosa_id),
  CONSTRAINT fk_registro_autor FOREIGN KEY (autor_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='RN-005/006: registro de cuidado original preservado';

CREATE TABLE IF NOT EXISTS correcao_registro_cuidado (
  correcao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  registro_id BIGINT UNSIGNED NOT NULL,
  numero_versao INT UNSIGNED NOT NULL,
  descricao_corrigida TEXT NOT NULL,
  ocorrido_em_corrigido DATETIME(6) NOT NULL,
  justificativa TEXT NOT NULL,
  autor_correcao_usuario_id BIGINT UNSIGNED NOT NULL,
  corrigido_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (correcao_id),
  UNIQUE KEY uq_correcao_registro_versao (rede_id, registro_id, numero_versao),
  KEY ix_correcao_registro_autor (autor_correcao_usuario_id),
  CONSTRAINT ck_correcao_registro_versao CHECK (numero_versao >= 1),
  CONSTRAINT fk_correcao_registro FOREIGN KEY (rede_id, registro_id)
    REFERENCES registro_cuidado (rede_id, registro_id),
  CONSTRAINT fk_correcao_registro_autor FOREIGN KEY (autor_correcao_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Versoes completas de Diario; INSERT only pela politica de servico';

CREATE TABLE IF NOT EXISTS correcao_consulta (
  correcao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  consulta_id BIGINT UNSIGNED NOT NULL,
  numero_versao INT UNSIGNED NOT NULL,
  realizada_em_corrigida DATETIME(6) NOT NULL,
  observacao_corrigida TEXT NULL,
  justificativa TEXT NOT NULL,
  autor_correcao_usuario_id BIGINT UNSIGNED NOT NULL,
  corrigido_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (correcao_id),
  UNIQUE KEY uq_correcao_consulta_versao (rede_id, consulta_id, numero_versao),
  KEY ix_correcao_consulta_autor (autor_correcao_usuario_id),
  CONSTRAINT ck_correcao_consulta_versao CHECK (numero_versao >= 1),
  CONSTRAINT fk_correcao_consulta FOREIGN KEY (rede_id, consulta_id)
    REFERENCES consulta (rede_id, consulta_id),
  CONSTRAINT fk_correcao_consulta_autor FOREIGN KEY (autor_correcao_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS correcao_administracao_medicamento (
  correcao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  administracao_id BIGINT UNSIGNED NOT NULL,
  numero_versao INT UNSIGNED NOT NULL,
  realizada_em_corrigida DATETIME(6) NOT NULL,
  observacao_corrigida TEXT NULL,
  justificativa TEXT NOT NULL,
  autor_correcao_usuario_id BIGINT UNSIGNED NOT NULL,
  corrigido_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (correcao_id),
  UNIQUE KEY uq_correcao_administracao_versao (rede_id, administracao_id, numero_versao),
  KEY ix_correcao_administracao_autor (autor_correcao_usuario_id),
  CONSTRAINT ck_correcao_administracao_versao CHECK (numero_versao >= 1),
  CONSTRAINT fk_correcao_administracao FOREIGN KEY (rede_id, administracao_id)
    REFERENCES administracao_medicamento (rede_id, administracao_id),
  CONSTRAINT fk_correcao_administracao_autor FOREIGN KEY (autor_correcao_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS anexo (
  anexo_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  registro_id BIGINT UNSIGNED NULL,
  consulta_id BIGINT UNSIGNED NULL,
  administracao_id BIGINT UNSIGNED NULL,
  enviado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  nome_sanitizado VARCHAR(240) NOT NULL,
  mime_validado VARCHAR(120) NOT NULL,
  tamanho_bytes BIGINT UNSIGNED NOT NULL,
  checksum_sha256 CHAR(64) NOT NULL,
  storage_key_opaca VARCHAR(500) NOT NULL,
  estado_tecnico VARCHAR(16) NOT NULL DEFAULT 'PENDENTE',
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (anexo_id),
  UNIQUE KEY uq_anexo_storage (storage_key_opaca),
  KEY ix_anexo_registro (rede_id, registro_id),
  KEY ix_anexo_consulta (rede_id, consulta_id),
  KEY ix_anexo_administracao (rede_id, administracao_id),
  KEY ix_anexo_autor (enviado_por_usuario_id),
  CONSTRAINT ck_anexo_pai CHECK (
    (registro_id IS NOT NULL) + (consulta_id IS NOT NULL) + (administracao_id IS NOT NULL) = 1
  ),
  CONSTRAINT ck_anexo_estado CHECK (estado_tecnico IN ('PENDENTE','VALIDADO','REJEITADO')),
  CONSTRAINT fk_anexo_registro FOREIGN KEY (rede_id, registro_id)
    REFERENCES registro_cuidado (rede_id, registro_id),
  CONSTRAINT fk_anexo_consulta FOREIGN KEY (rede_id, consulta_id)
    REFERENCES consulta (rede_id, consulta_id),
  CONSTRAINT fk_anexo_administracao FOREIGN KEY (rede_id, administracao_id)
    REFERENCES administracao_medicamento (rede_id, administracao_id),
  CONSTRAINT fk_anexo_autor FOREIGN KEY (enviado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='V1: anexo aponta para exatamente um registro original, nunca para correcao';

-- =========================================================
-- 05 APOIO, PREFERENCIAS, AUDITORIA E INFRAESTRUTURA
-- =========================================================

CREATE TABLE IF NOT EXISTS contato_importante (
  contato_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL,
  nome VARCHAR(160) NOT NULL,
  relacao VARCHAR(100) NULL,
  telefone VARCHAR(32) NOT NULL,
  prioridade INT UNSIGNED NOT NULL DEFAULT 1,
  ativo BOOLEAN NOT NULL DEFAULT TRUE,
  registrado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  atualizado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (contato_id),
  KEY ix_contato_pessoa (rede_id, pessoa_idosa_id, prioridade),
  KEY ix_contato_autor (registrado_por_usuario_id),
  CONSTRAINT ck_contato_prioridade CHECK (prioridade >= 1),
  CONSTRAINT fk_contato_contexto FOREIGN KEY (rede_id, pessoa_idosa_id)
    REFERENCES rede_cuidado (rede_id, pessoa_idosa_id),
  CONSTRAINT fk_contato_autor FOREIGN KEY (registrado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE IF NOT EXISTS informacao_emergencia (
  emergencia_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL,
  orientacoes TEXT NOT NULL,
  observacoes TEXT NULL,
  atualizado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  atualizado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (emergencia_id),
  UNIQUE KEY uq_emergencia_ficha (rede_id, pessoa_idosa_id),
  KEY ix_emergencia_autor (atualizado_por_usuario_id),
  CONSTRAINT fk_emergencia_contexto FOREIGN KEY (rede_id, pessoa_idosa_id)
    REFERENCES rede_cuidado (rede_id, pessoa_idosa_id),
  CONSTRAINT fk_emergencia_autor FOREIGN KEY (atualizado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='V1: uma ficha atual por rede; edicao Familiar Principal e acesso conforme permissoes';

CREATE TABLE IF NOT EXISTS preferencia_notificacao (
  preferencia_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  usuario_id BIGINT UNSIGNED NOT NULL,
  tipo_evento VARCHAR(3) NOT NULL,
  receber BOOLEAN NOT NULL DEFAULT TRUE,
  atualizado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (preferencia_id),
  UNIQUE KEY uq_preferencia_notificacao (rede_id, usuario_id, tipo_evento),
  KEY ix_preferencia_usuario (usuario_id),
  CONSTRAINT ck_preferencia_tipo CHECK (tipo_evento IN ('N03','N04')),
  CONSTRAINT fk_preferencia_rede FOREIGN KEY (rede_id) REFERENCES rede_cuidado (rede_id),
  CONSTRAINT fk_preferencia_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Preferencia dos receptores opcionais, NAO desliga N01/N02/N03/N04 obrigatorios';

CREATE TABLE IF NOT EXISTS auditoria (
  auditoria_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NULL,
  pessoa_idosa_id BIGINT UNSIGNED NULL,
  ator_usuario_id BIGINT UNSIGNED NULL,
  evento_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  operacao VARCHAR(80) NOT NULL,
  recurso_tipo VARCHAR(70) NULL,
  recurso_id_opaco VARCHAR(120) NULL,
  categoria_snapshot VARCHAR(32) NULL,
  papeis_snapshot JSON NULL,
  resultado VARCHAR(12) NOT NULL,
  correlacao_id CHAR(36) NULL,
  detalhe_sanitizado VARCHAR(500) NULL,
  PRIMARY KEY (auditoria_id),
  KEY ix_auditoria_rede_tempo (rede_id, evento_em),
  KEY ix_auditoria_pessoa_tempo (pessoa_idosa_id, evento_em),
  KEY ix_auditoria_ator_tempo (ator_usuario_id, evento_em),
  KEY ix_auditoria_correlacao (correlacao_id),
  CONSTRAINT ck_auditoria_resultado CHECK (resultado IN ('PERMITIDO','NEGADO','ERRO')),
  CONSTRAINT fk_auditoria_rede FOREIGN KEY (rede_id) REFERENCES rede_cuidado (rede_id),
  CONSTRAINT fk_auditoria_pessoa FOREIGN KEY (pessoa_idosa_id)
    REFERENCES pessoa_idosa (pessoa_idosa_id),
  CONSTRAINT fk_auditoria_ator FOREIGN KEY (ator_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Append only na aplicacao; DENY precisa sobreviver ao rollback de negocio';

CREATE TABLE IF NOT EXISTS entrega_tecnica_notificacao (
  entrega_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  usuario_destinatario_id BIGINT UNSIGNED NOT NULL,
  tipo_evento VARCHAR(3) NOT NULL,
  chave_evento CHAR(64) NOT NULL,
  estado_transporte VARCHAR(16) NOT NULL DEFAULT 'PENDENTE',
  tentativas INT UNSIGNED NOT NULL DEFAULT 0,
  disponivel_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  entregue_em DATETIME(6) NULL,
  expira_em DATETIME(6) NULL,
  PRIMARY KEY (entrega_id),
  UNIQUE KEY uq_entrega_evento_destinatario (rede_id, tipo_evento, chave_evento, usuario_destinatario_id),
  KEY ix_entrega_fila (estado_transporte, disponivel_em),
  KEY ix_entrega_destinatario (usuario_destinatario_id),
  CONSTRAINT ck_entrega_tipo CHECK (tipo_evento IN ('N01','N02','N03','N04')),
  CONSTRAINT ck_entrega_estado CHECK (
    estado_transporte IN ('PENDENTE','PROCESSANDO','ENTREGUE','CANCELADA','FALHA')
  ),
  CONSTRAINT fk_entrega_rede FOREIGN KEY (rede_id) REFERENCES rede_cuidado (rede_id),
  CONSTRAINT fk_entrega_destinatario FOREIGN KEY (usuario_destinatario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Outbox tecnica; NAO e Central de Notificacoes, nem comprova entrega offline';

CREATE TABLE IF NOT EXISTS idempotencia_comando (
  comando_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  ator_usuario_id BIGINT UNSIGNED NOT NULL,
  chave_cliente VARCHAR(100) NOT NULL,
  payload_sha256 CHAR(64) NOT NULL,
  estado VARCHAR(16) NOT NULL DEFAULT 'EM_ANDAMENTO',
  resultado_minimo JSON NULL,
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  finalizado_em DATETIME(6) NULL,
  PRIMARY KEY (comando_id),
  UNIQUE KEY uq_idempotencia_ator_chave (rede_id, ator_usuario_id, chave_cliente),
  KEY ix_idempotencia_criado (criado_em),
  CONSTRAINT ck_idempotencia_estado CHECK (
    estado IN ('EM_ANDAMENTO','CONCLUIDO','FALHOU')
  ),
  CONSTRAINT fk_idempotencia_rede FOREIGN KEY (rede_id) REFERENCES rede_cuidado (rede_id),
  CONSTRAINT fk_idempotencia_ator FOREIGN KEY (ator_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Comparar payload hash no servico e serializar recurso para no duplicate effect';

-- =========================================================
-- 06 AVISOS DE INTEGRIDADE QUE O SQL NAO GARANTE SOZINHO
-- =========================================================
-- [V1 DB-001] UNIQUE pessoa_idosa_id garante uma rede por perfil.
-- [V1 DB-002] situacao OPERACIONAL somente com Principal=1 e Profissional>=1.
-- Impor na transacao com lock no agregado rede_cuidado; UNIQUE resolve apenas <=1.
-- [V1 DB-003] reingresso e novo episodio autorizado; indice gerado impede
-- 2 episodios nao encerrados; revogar papeis antigos em transacao.
-- [V1 DB-004] transferir Principal com ordem de travas e UNIQUE imediata.
-- [V1 DB-028] revogar membro apenas depois da reatribuicao/cancelamento
-- explicito dos recursos futuros, mantendo historico e auditoria.
-- [V1 DB-030] N02 somente para responsavel explicito se plantonista atual;
-- sem elegivel, falha auditada e nenhum fallback/destinatario inventado.
-- [V1 DB-021] UNIQUE por ocorrencia; replay igual nao e segundo fato;
-- evento avulso precisa comando novo e permissao expressa.
-- [GATE RNF02] negar UPDATE/DELETE destrutivo de originais via service privileges
-- e rotinas transacionais; sem GRANT/TRIGGER automatico neste arquivo.
-- [GATE SEGURANCA] todas as consultas devem escopar rede+ator+permissao vigente.
-- [GATE RECORRENCIA] converter instante UTC e fuso IANA de modo deterministico.
-- [GATE WORKBENCH] script CREATE-only, sem DROP; importar por Reverse Engineer
-- MySQL Create Script para montar EER sem executar numa instancia.

-- =========================================================
-- 07 EPISODIO DE ATIVACAO DA PESSOA IDOSA / HISTORICO ESCALA
-- =========================================================
-- Definidos apos entidades principais para evitar dependencias circulares.
CREATE TABLE IF NOT EXISTS habilitacao_acesso_idoso (
  habilitacao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  pessoa_idosa_id BIGINT UNSIGNED NOT NULL,
  usuario_titular_id BIGINT UNSIGNED NOT NULL,
  solicitada_por_usuario_id BIGINT UNSIGNED NOT NULL,
  token_hash CHAR(64) NOT NULL COMMENT 'Somente SHA-256 do token de alta entropia; nunca texto em claro',
  criada_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  expira_em DATETIME(6) NOT NULL,
  usada_em DATETIME(6) NULL,
  revogada_em DATETIME(6) NULL,
  convite_corrente_pessoa_id BIGINT UNSIGNED GENERATED ALWAYS AS (
    CASE WHEN usada_em IS NULL AND revogada_em IS NULL
      THEN pessoa_idosa_id ELSE NULL END
  ) STORED,
  PRIMARY KEY (habilitacao_id),
  UNIQUE KEY uq_habilitacao_token_hash (token_hash),
  UNIQUE KEY uq_convite_aberto_pessoa (convite_corrente_pessoa_id),
  KEY ix_habilitacao_titular (usuario_titular_id),
  KEY ix_habilitacao_autor (solicitada_por_usuario_id),
  CONSTRAINT ck_habilitacao_prazo CHECK (expira_em > criada_em),
  CONSTRAINT ck_habilitacao_usada CHECK (usada_em IS NULL OR usada_em >= criada_em),
  CONSTRAINT ck_habilitacao_revogada CHECK (revogada_em IS NULL OR revogada_em >= criada_em),
  CONSTRAINT ck_habilitacao_nao_ambos CHECK (usada_em IS NULL OR revogada_em IS NULL),
  CONSTRAINT fk_habilitacao_pessoa_titular FOREIGN KEY (pessoa_idosa_id, usuario_titular_id)
    REFERENCES pessoa_idosa (pessoa_idosa_id, usuario_titular_id),
  CONSTRAINT fk_habilitacao_titular FOREIGN KEY (usuario_titular_id)
    REFERENCES usuario (usuario_id),
  CONSTRAINT fk_habilitacao_solicitante FOREIGN KEY (solicitada_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Convite de uso unico ao titular; app verifica titular da pessoa e expira_em sob lock';

CREATE TABLE IF NOT EXISTS historico_plantao (
  evento_plantao_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  rede_id BIGINT UNSIGNED NOT NULL,
  plantao_id BIGINT UNSIGNED NOT NULL,
  membro_anterior_id BIGINT UNSIGNED NULL,
  membro_novo_id BIGINT UNSIGNED NULL,
  versao_anterior INT UNSIGNED NOT NULL,
  versao_nova INT UNSIGNED NOT NULL,
  tipo_evento VARCHAR(22) NOT NULL,
  operado_por_usuario_id BIGINT UNSIGNED NOT NULL,
  ocorrido_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  operacao_correlacao_id CHAR(36) NULL,
  PRIMARY KEY (evento_plantao_id),
  UNIQUE KEY uq_historico_plantao_versao (rede_id, plantao_id, versao_nova),
  KEY ix_historico_plantao (rede_id, plantao_id, ocorrido_em),
  KEY ix_historico_membro_antes (rede_id, membro_anterior_id),
  KEY ix_historico_membro_depois (rede_id, membro_novo_id),
  KEY ix_historico_ator (operado_por_usuario_id),
  CONSTRAINT ck_historico_plantao_evento CHECK (
    tipo_evento IN ('CRIADO','ATRIBUIDO','ALTERADO','CANCELADO','TROCA_ACEITA')
  ),
  CONSTRAINT ck_historico_plantao_versao CHECK (
    versao_anterior >= 0 AND versao_nova = versao_anterior + 1
  ),
  CONSTRAINT fk_historico_plantao FOREIGN KEY (rede_id, plantao_id)
    REFERENCES plantao (rede_id, plantao_id),
  CONSTRAINT fk_historico_membro_antes FOREIGN KEY (rede_id, membro_anterior_id)
    REFERENCES membro_rede (rede_id, membro_id),
  CONSTRAINT fk_historico_membro_depois FOREIGN KEY (rede_id, membro_novo_id)
    REFERENCES membro_rede (rede_id, membro_id),
  CONSTRAINT fk_historico_ator FOREIGN KEY (operado_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Historico append only de escala distinto da auditoria de seguranca';

-- V1 NOTAS DE CONTRATO:
-- 1. habilitacao: exigir pessoa.usuario_titular_id = usuario_titular_id
--    no app transacional; FK a usuario valida existencia, nao equivalencia.
-- 2. historico: evento CRIADO deve usar versao_anterior=0, nova=1.
--    Mudancas efetivas do plantao devem registrar historico na mesma transacao.
-- 3. Políticas RN/US de autorizacao, token, LGPD e horario nao sao
--    asseguradas apenas por CHECK/FK/UNIQUE.

-- FIM DO PROTOTIPO FISICO V1 CONSOLIDADO. NAO EXECUTADO EM MYSQL.
