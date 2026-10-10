-- DEC-AUTH-001 / US-001 / RF01. MIGRACAO ADITIVA V1, apos 001_rede_de_apoio_schema.sql.
-- SOMENTE MySQL 8.4 de desenvolvimento NOVO, local e descartavel; dados sintéticos.
-- NAO rodar em producao, banco existente, ambiente real ou sem aprovacao especifica.
-- Autorizacao canônica: docs/10_IMPLEMENTACAO/DEC_AUTH_001_CONVITES_CUIDADORES.md
-- SEM seed, DROP, usuario novo, GRANT, token puro ou dados pessoais reais.
-- IMPORTANTE: esquema ainda requer validacao de execução no MySQL 8.4 no gate G-DB.
USE rede_de_apoio;

CREATE TABLE IF NOT EXISTS convite_cadastro_cuidador (
  convite_id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email_normalizado VARCHAR(254) NOT NULL,
  token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL
    COMMENT 'SHA-256 hexadecimal do token aleatorio; nunca token em claro',
  origem_emissao VARCHAR(24) NOT NULL,
  emitido_por_usuario_id BIGINT UNSIGNED NULL,
  criado_em DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  expira_em DATETIME(6) NOT NULL,
  usado_em DATETIME(6) NULL,
  revogado_em DATETIME(6) NULL,
  email_convite_aberto VARCHAR(254) GENERATED ALWAYS AS (
    CASE WHEN usado_em IS NULL AND revogado_em IS NULL
      THEN email_normalizado ELSE NULL END
  ) STORED,
  bootstrap_aberto TINYINT GENERATED ALWAYS AS (
    CASE WHEN origem_emissao = 'OPERADOR_BOOTSTRAP'
      AND usado_em IS NULL AND revogado_em IS NULL
      THEN 1 ELSE NULL END
  ) STORED,
  PRIMARY KEY (convite_id),
  UNIQUE KEY uq_convite_cuidador_token (token_hash),
  UNIQUE KEY uq_convite_cuidador_email_aberto (email_convite_aberto),
  UNIQUE KEY uq_convite_cuidador_bootstrap_aberto (bootstrap_aberto),
  KEY ix_convite_cuidador_emitente (emitido_por_usuario_id),
  KEY ix_convite_cuidador_email_historico (email_normalizado, criado_em),
  CONSTRAINT ck_convite_cuidador_origem
    CHECK (origem_emissao IN ('OPERADOR_BOOTSTRAP', 'PRINCIPAL')),
  CONSTRAINT ck_convite_cuidador_emitente CHECK (
    (origem_emissao = 'OPERADOR_BOOTSTRAP' AND emitido_por_usuario_id IS NULL)
    OR
    (origem_emissao = 'PRINCIPAL' AND emitido_por_usuario_id IS NOT NULL)
  ),
  CONSTRAINT ck_convite_cuidador_expiracao CHECK (expira_em > criado_em),
  CONSTRAINT ck_convite_cuidador_uso CHECK (usado_em IS NULL OR usado_em >= criado_em),
  CONSTRAINT ck_convite_cuidador_revogacao CHECK (revogado_em IS NULL OR revogado_em >= criado_em),
  CONSTRAINT ck_convite_cuidador_exclusividade CHECK (usado_em IS NULL OR revogado_em IS NULL),
  CONSTRAINT fk_convite_cuidador_emitente FOREIGN KEY (emitido_por_usuario_id)
    REFERENCES usuario (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  COMMENT='Identidade CUIDADOR por convite individual; nunca concede papel/vinculo automaticamente';
