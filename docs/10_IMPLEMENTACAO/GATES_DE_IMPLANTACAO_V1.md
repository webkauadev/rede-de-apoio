# Gates restantes após homologação V1 — não são alternativas de arquitetura

**Status:** DB-001–DB-038 têm escopo V1 determinado em [ratificação](DECISOES_V1_HOMOLOGADAS.md) e stack definida. A V1 está **especificada para começar a programar**. O que falta agora são **provas de execução, conformidade e integração**, e não escolher A1/A2/B outra vez.

| Gate | Condição de saída verificável | Estado em 2026-10-09 |
|---|---|---|
| **G-DB** MySQL físico | importar SQL V1 no MySQL 8.4 descartável, executar consultas do 002, validar 30 tabelas/FKs/constraints, `SHOW CREATE TABLE`, 2 sessões concorrentes para Principal/tarefa/plantão | **NÃO EXECUTADO** (solicitante pediu arquivo SQL para importar posteriormente) |
| **G-AUTH** autenticação | Argon2id, convite único, sessão httpOnly/SameSite/CSRF, expiração, rate limit, recuperação, provas de bloqueio | **AINDA NÃO IMPLEMENTADO** |
| **G-PRIV** dados pessoais | revisão LGPD do controlador, base legal, retenção e descarte, backups, acesso, registro de incidente, ambiente de segurança | **NÃO VALIDADO — sem produção com dados reais** |
| **G-CLIN** automação de cuidados | agenda diária/semanal e fuso DST validado, regras de administração atômica; PRN/dose extra fora de escopo V1, cuidado no horário ambíguo exige intervenção | **AINDA NÃO IMPLEMENTADO/TESTADO** |
| **G-APP** integração | testes servidor das 36 US por RF, autorização negativa, Pessoa Idosa read-only, multirrede vedada, correção versionada, N01–N04, CSV/auditoria | **AINDA NÃO IMPLEMENTADO** |
| **G-UI** interface | comparar T01–T17 com PNGs versionados, estados, bottom sheet, interações, clipped viewport, 48×48 | **AINDA NÃO IMPLEMENTADO** |
| **G-SEC** defesa em profundidade | FKs + integridade real, transações, logs sem conteúdo clínico, sem injeção de CSV, segregação de ambientes, storage privado | **AINDA NÃO TESTADO** |
| **G-REL** publicação | checks verdes, revisão/merge PR por US, staging, backup, rollback, configuração de domínio e segredos | **SEM APP A PUBLICAR** |

## Escopo liberado agora

- Iniciar scaffold de aplicação e arquitetura de código conforme `STACK_V1_HOMOLOGADA.md` em PR separado, sem provisionar banco real nesta etapa.
- Implementar RF/US onde regras V1 estão determinadas, com testes e simulações locais que não usem dados pessoais reais.
- Leitura exclusiva do GitHub pelo Codex — 26 snapshots e 36 US versionados são suficientes para o design base; o Figma live será necessário só ao atualizar a baseline.
- Importar EER diretamente do script MySQL no Workbench sem executar servidor, por ação do solicitante.

**Não são liberados:** uso de dados clínicos reais, conexão de produção, promessas de entrega offline para alertas, decisões clínicas adicionais ou mudança das regras RN/US sem outra aprovação.

## Ordem prática de execução

1. Incorporar PR #115 (conhecimento de modelagem) e PR #116 (SQL+Codex) à `main`, depois de CI e conferência.
2. Codex abre PR de scaffold de stack sem segredos/ambiente real.
3. Quando o usuário importar SQL em MySQL 8.4 descartável, registrar logs/erros de Workbench e fazer correções se necessárias em novo PR.
4. Testar por US, segurança e concorrência; liberar staging somente com evidência.
5. Produção com dados reais somente após G-PRIV/G-SEC/G-REL concluídos.

**Importante:** a autorização atual para consolidar SQL e PRs documentais não é autorização para provisionar um MySQL por conta própria.

## Evidência posterior parcial — US-001 / DEC-AUTH-001

A autorização específica da DEC-AUTH-001 permitiu o ensaio **local descartável**, registrado no [handoff US-001](US001_CADASTRO_CONTA_V1.md). MySQL 8.4.11 executou baseline 001/validação 002 (30 tabelas), convite 003 (31) e buckets técnicos 004 (32), com persistência/concorrência de convite, bootstrap e rollback comprovados. A indicação histórica “NÃO EXECUTADO” não descreve mais essa parte do ensaio. **G-DB global permanece aberto** para as demais transações de Principal/tarefa/plantão e domínios. G-AUTH possui Argon2id/convite/limitação/auditoria de cadastro local implementados, mas login, sessão, recuperação e liberação pública continuam pendentes. Não implica fechamento de US, merge ou deploy.
