# Rede de Apoio — Context Pack

**Protótipo SQL MySQL V0.1:** [script de criação](database/mysql/001_rede_de_apoio_schema.sql) · [passo a passo Workbench/EER](database/mysql/README.md) · [limites e decisões abertas](database/mysql/DECISOES_E_LIMITES.md) · [Playbook Codex](docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md).

Documentação central do projeto **Rede de Apoio a Cuidadores de Idosos**.

Este repositório GitHub (`webkauadev/rede-de-apoio`) é a **fonte única de verdade operacional** para RF/RNF, User Stories, Issues/tarefas, critérios, rastreabilidade, decisões e contexto de IA. O Figma é a fonte do protótipo e do design visual vigente.

Informação funcional ausente no GitHub é marcada como `migration_required`; inferências úteis podem ser registradas como `candidate_origin`, nunca como requisito confirmado.

## Estado consolidado — 2026-09-14

- RF01–RF30: canônicos.
- RNF01–RNF03: canônicos.
- US-001–US-036: conteúdo canônico de história, origem, owner e rastreabilidade.
- US-036 / RF30: acesso próprio read-only da Pessoa Idosa aprovado; owner US-036 = David.
- T01–T17: protótipo canônico consolidado no Figma `Fluxo Final` (`5926:1014`).
- Material Design 3: autoridade de UX/design visual sob os requisitos aprovados.
- Navigation Bar: `Home · Agenda · Diário · Saúde`.
- T12–T17: destinos secundários por `Settings / Management Sheet`.
- Integridade do protótipo: Issue #84 encerrada; FI-001–FI-008 resolvidos/superados no `Fluxo Final`.
- Auditoria final: T01 alcança T01–T17, 0 destinos quebrados e 0 navegação/overlay nocivo para outra página.
- P03/#75, P04/#76, P05/#77 e P06/#78: resolvidos canonicamente.
- P01/#73: resolvido em 2026-09-15 (aprovação humana explícita); critérios individuais de aceite de US-001–US-036 aprovados e promovidos. Nenhum gate P01–P09 permanece aberto.

Leia primeiro `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md`.

## Decisões funcionais recentes

- **P03:** escrita e correção são decidíveis por categoria, vínculo e condição operacional; correção exige permissão efetiva para produzir o mesmo tipo de registro.
- **P04:** N01–N04 usam feedback transitório global e telas já existentes; não há Central de Notificações dedicada.
- **P05:** CSV na primeira versão é exclusivo do Familiar Principal, contextual em T07 e auditado.
- **P06:** papéis acumulados compõem permissão pela união das permissões positivas, preservando restrições/contextos explícitos.
- **RF30/US-036:** Pessoa Idosa usa a mesma autenticação em modo somente leitura do próprio cuidado, sem papéis, Plantonista Atual, escrita, administração ou CSV.

## O pack contém

- `docs/01_REQUIREMENTS/` — requisitos, US e pendências;
- `docs/02_BUSINESS_RULES/` — regras e permissões;
- `docs/03_INFORMATION_ARCHITECTURE/` — Site Map, catálogo T01–T17 e rastreabilidade;
- `docs/04_DESIGN_SYSTEM/` — tokens, arquitetura e component map;
- `docs/05_FIGMA/` — registry de nodes, auditoria e integridade do protótipo;
- `docs/06_GITHUB/` — workflow, estrutura e registry de Issues;
- `docs/07_AI_CONTEXT/` — estado atual, contratos, screens/states e setup Codex;
- `docs/08_MILESTONE/` — status consolidado, métricas com fonte e evidências da entrega;
- `AGENTS.md` / `CLAUDE.md` — contratos de execução;
- `scripts/validate_agent_context.py` — validação de consistência.

## Ordem de leitura para agentes

1. `AGENTS.md`
2. `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md`
3. `docs/00_PROJECT_CONTEXT.md`
4. `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml`
5. `docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml`
6. `docs/06_GITHUB/ISSUE_REGISTRY.yaml`
7. `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md`
8. `docs/07_AI_CONTEXT/AI_CONTEXT_RULES.md`
9. `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`
10. `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`
11. `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
12. `docs/03_INFORMATION_ARCHITECTURE/SCREENS_CATALOG.md`
13. `docs/03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`
14. `docs/04_DESIGN_SYSTEM/`
15. `docs/05_FIGMA/FIGMA_REGISTRY.yaml`
16. `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`
17. `docs/06_GITHUB/`

## Fluxo de design por agente

`GitHub Issue → RF/RNF/US → Context Pack → Fluxo Final → Componentes/tokens → Construção → Auditoria → Registry → Commit → Pull Request → Revisão humana`

## Codex

**Handoff autossuficiente:** [docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md](docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md) e [database/mysql/README.md](database/mysql/README.md) explicam como executar tarefas usando apenas o repositório, respeitando decisões ainda pendentes.


Use `docs/07_AI_CONTEXT/CODEX_SETUP.md`.

O Codex deve:
- resolver comportamento no GitHub;
- usar o `Fluxo Final` para estrutura/visual vigente;
- ignorar frames `LEGADO —` quando houver equivalente final;
- tratar P01/P03/P04/P05/P06 como decisões fechadas;
- tratar RF30/US-036 como escopo aprovado read-only;
- não inventar critérios além dos aprovados em `ACCEPTANCE_CRITERIA.yaml`;
- rodar `python scripts/validate_agent_context.py`;
- trabalhar em branch e deixar PR para revisão humana.

O workflow **Validate agent context** valida os registries em Pull Requests.


## Modelagem de Banco de Dados — conhecimento + protótipo SQL

A base de conhecimento da modelagem está em [docs/09_BANCO_DE_DADOS/](docs/09_BANCO_DE_DADOS/README.md). Reúne modelo conceitual, dicionário de dados candidato, cardinalidades, regras de acesso e integridade, 36 US rastreadas, exercícios de mesa, ADRs pendentes e roteiro da futura implementação MySQL. **A documentação de análise segue em revisão; o protótipo SQL V0.1 fica em `database/mysql/` e não foi executado/implantado.** As regras funcionais canônicas deste repositório continuam prevalecendo sobre propostas técnicas.


## Autonomia do Codex somente com GitHub — snapshot de 2026-10-09

O **[índice de implementação](docs/10_IMPLEMENTACAO/README.md)** reúne: [playbook](docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md), [26 capturas canônicas](docs/10_IMPLEMENTACAO/FIGMA_SNAPSHOT/README.md), [backlog das 36 US](docs/10_IMPLEMENTACAO/BACKLOG_CODEX.md), [protocolo de PR](docs/10_IMPLEMENTACAO/PROTOCOLO_PR_CODEX.md), [stack candidata](docs/10_IMPLEMENTACAO/STACK_CANDIDATA.md) e [decisões pendentes](docs/10_IMPLEMENTACAO/PORTOES_PENDENTES.md). O Codex pode ler esses arquivos no GitHub sem depender de conversa nem de acesso live ao Figma.

**Limites:** as imagens são fotografia estática (17 bases + 9 estados), não todos os protótipos; as ADRs que permanecem abertas e a stack de app não devem ser inventadas. A V0.1 SQL do [Workbench](database/mysql/README.md) **ainda não foi executada** em MySQL. O código da aplicação será uma etapa separada.

## V1 homologada — SQL consolidado e Codex autossuficiente (2026-10-09)

Por aprovação explícita do solicitante, as 38 ADRs de modelagem têm escolha V1 em [DECISOES_V1_HOMOLOGADAS.md](docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md); a plataforma de desenvolvimento foi definida em [STACK_V1_HOMOLOGADA.md](docs/10_IMPLEMENTACAO/STACK_V1_HOMOLOGADA.md). O [SQL MySQL V1](database/mysql/001_rede_de_apoio_schema.sql) para Workbench inclui **30 tabelas** e o [guia de importação/EER](database/mysql/README.md).

Para Codex, iniciar por [AGENTS.md](AGENTS.md) → [hubs de implementação](docs/10_IMPLEMENTACAO/README.md) → [36 US e capturas Figma no GitHub](docs/10_IMPLEMENTACAO/FIGMA_SNAPSHOT/README.md). O banco físico **não foi criado/executado**. A homologação não dispensa teste real MySQL e controle LGPD antes da produção. As menções V0.1/PENDENTE abaixo pertencem ao histórico de preparação.

## Aplicação V1 — infraestrutura da Issue #117

Base Next.js executável: `npm ci` e `npm run dev` (Node 24; sem MySQL).
Consulte [runbook local](docs/10_IMPLEMENTACAO/RUNBOOK_LOCAL_V1.md) para arquitetura, checks, evidências e limites; [continuidade](docs/10_IMPLEMENTACAO/CONTINUIDADE_V1.md) para os próximos PRs por US. A página inicial é demonstração técnica provisória; autenticação e cuidados ainda não foram implementados.
