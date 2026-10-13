-- US-002 / RF02 / Issue #38. Aditiva, aplicar manualmente APOS 001, 003 e 004.
-- NAO executada neste incremento. UTC, token CSPRNG apenas SHA-256, expiracao absoluta.
USE rede_de_apoio;
CREATE TABLE sessao_usuario (
  token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  usuario_id BIGINT UNSIGNED NOT NULL,
  credencial_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  criado_em DATETIME(6) NOT NULL,
  expira_em DATETIME(6) NOT NULL,
  revogado_em DATETIME(6) NULL,
  PRIMARY KEY (token_hash),
  KEY ix_sessao_usuario (usuario_id, revogado_em, expira_em),
  KEY ix_sessao_expira (expira_em),
  CONSTRAINT fk_sessao_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id),
  CONSTRAINT ck_sessao_expira CHECK (expira_em > criado_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
-- Buckets exclusivos de login; HMAC de email, nunca email/IP/token em texto.
CREATE TABLE login_rate_limit (
  chave CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  janela_em DATETIME(6) NOT NULL,
  tentativas INT UNSIGNED NOT NULL,
  PRIMARY KEY (chave),
  KEY ix_login_janela (janela_em)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
