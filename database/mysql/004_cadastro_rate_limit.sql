-- Controle tecnico persistente de abuso DEC-AUTH-001; aditivo apos 003.
-- Apenas instancia NOVA MySQL 8.4 local descartavel autorizada. Nao altera 001.
USE rede_de_apoio;
CREATE TABLE IF NOT EXISTS cadastro_rate_limit (
  chave CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  janela_em DATETIME(6) NOT NULL,
  tentativas INT UNSIGNED NOT NULL,
  PRIMARY KEY (chave)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  COMMENT='Buckets tecnicos sem IP/email/token puro; global e por hash de convite';
