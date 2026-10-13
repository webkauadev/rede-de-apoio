# Cérebro operacional — entrega de banco SQL + EER V1 (#124)

**Escopo aprovado para 13/10/2026: SOMENTE SQL MySQL 8.4 + modelo EER, não aplicativo.**

## Prioridade e limites

Esta entrega é **um trabalho transversal de banco**, independente das 34 US ainda abertas. **Não** criar telas, APIs, US, deploy, hospedagem, seed clínico ou execução de Playwright. Preservar os scripts históricos, decisões DB-001–DB-038, regras de segurança e o histórico do GitLab/GitHub.

**"Banco funcional completo" no escopo entregue:** SQL importável em **instância MySQL 8.4 NOVA**, 34 tabelas com PK/FK/CHECK/UNIQUE/índices testados, modelo Workbench nativo `.mwb`, imagem legível e instrução de reprodução. Isso **não** significa aplicativos ou regras dinâmicas de autorização concluídos.

**PR #123 e DB-002:** falta evidência de elegibilidade do Familiar que será Principal inicial. O cadastro via API continua BLOQUEADO. A coluna/tabela `pessoa_idosa` pertence ao esquema e pode ser importada e diagramada; não inventar autorização, Principal fictício ou rede operacional inválida.

## Hierarquia para Codex

1. `AGENTS.md` e este arquivo, [RUNBOOK_CODEX.md](RUNBOOK_CODEX.md), [CHECKLIST.md](CHECKLIST.md).
2. `docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md` (DB-001–038), `database/mysql/DECISOES_E_LIMITES.md`, matriz de permissões.
3. SQL fontes imutáveis `database/mysql/001_rede_de_apoio_schema.sql`, `003_convite_cadastro_cuidador.sql`, `004_cadastro_rate_limit.sql`, `005_sessoes_login.sql`.
4. Evidências US-001/002/003 são histórico de importação **separada**. Não substituem teste novo do **pacote único**.

## Artefatos versionados

| Arquivo | Função |
| --- | --- |
| [01_schema_completo_v1.sql](../../entrega/sql-eer/01_schema_completo_v1.sql) | Único SQL importável em base nova, derivado 001→003→004→005 |
| [02_manifest_estrutura.json](../../entrega/sql-eer/02_manifest_estrutura.json) | Inventário 34 tabelas e 79 FKs de origem, CHECKs e UNIQUEs para conferir |
| [02_validar_34_tabelas.sql](../../entrega/sql-eer/02_validar_34_tabelas.sql) | Consultas SQL somente leitura (34, não 30) |
| [03_relacionamentos_referencia.dot](../../entrega/sql-eer/03_relacionamentos_referencia.dot) | Grafo provisório; não substitui EER Workbench |
| [prepare_sql_eer_delivery.mjs](../../scripts/prepare_sql_eer_delivery.mjs) | Regeneração deterministicamente verificável `--check` |
| [verify_mysql_sql_eer.mjs](../../scripts/verify_mysql_sql_eer.mjs) | QA de MySQL físico **read-only**, confrontando manifesto |

**Entrega ainda pendente:** `entrega/sql-eer/rede_de_apoio_v1.mwb`, exportação visual PNG/SVG, relatório novo com comando importação SQL único e validação da mesma instância. Não alegar que estes artefatos existem sem verificar no repositório.

`database/mysql/002_validar_estrutura.sql` só verifica 30 tabelas do 001 e deve permanecer histórico. A migração 005 usa `CREATE TABLE` sem `IF NOT EXISTS`: **importar o arquivo consolidado uma única vez sobre banco vazio**; não tentar “verificar” repetindo DDL na mesma base.

## Regras de operação

Somente **novo** recurso MySQL 8.4 local/descartável Fedora, rootless se viável, loopback, usuário e senha sintéticos fora do Git; não reaproveitar, apagar ou inspecionar MySQL de terceiros, `mysql-workbench`/`compat` preexistentes, banco remoto ou produção. Confirmar nome/ID/label antes de limpeza e remover só recursos criados no ensaio. Não armazenar dumps/linhas clínicas/tokens.

Gates de SQL/EER da [checklist](CHECKLIST.md) são independentes de G-APP, G-PRIV, G-REL. Não declarar SQL totalmente funcional em regras de negócio se testes de transação que dependem da aplicação não foram implementados. Não aprovar PR funcional bloqueado para cumprir entrega.
