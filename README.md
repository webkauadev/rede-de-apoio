# Rede de Apoio — Context Pack

Documentação central do projeto **Rede de Apoio a Cuidadores de Idosos**.

Este repositório GitHub (`webkauadev/rede-de-apoio`) é a **fonte única de verdade operacional** para RF/RNF, User Stories, Issues/tarefas, critérios, rastreabilidade, decisões e contexto de IA. O Figma é a fonte do protótipo e do design visual vigente.

Informação funcional ausente no GitHub é marcada como `migration_required`; inferências úteis podem ser registradas como `candidate_origin`, nunca como requisito confirmado.

## Estado consolidado — 2026-09-13

- RF01–RF29: canônicos.
- RF30: proposta controlada.
- RNF01–RNF03: canônicos.
- US-001–US-035: conteúdo canônico de história, origem, owner e rastreabilidade.
- US-036: proposta controlada.
- T01–T17: rastreabilidade funcional **e nodes Figma atuais mapeados (17/17)**.
- T08: ambiguidade resolvida; `5235:924` é lista atual e `5048:644` é LEGADO.
- `prototypeIA`: referência histórica, não base atual quando houver frame nas páginas dos responsáveis.
- Integridade do protótipo: Issue #84 + `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`.

Leia primeiro `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md`.

## Catálogo operacional

O mapeamento de RF/RNF/US/P## está em `docs/06_GITHUB/ISSUE_REGISTRY.yaml`.

Pendências ainda reais:
- P01/#73 — critérios individuais de aceite;
- P03/#75 — permissões de escrita;
- P04/#76 — superfície das notificações;
- P05/#77 — permissão de exportação CSV;
- P06/#78 — composição de permissões.

Essas pendências são gates explícitos e nunca devem ser resolvidas por inferência do Figma.

## O pack contém

- `docs/01_REQUIREMENTS/` — requisitos, US e pendências;
- `docs/02_BUSINESS_RULES/` — regras e permissões;
- `docs/03_INFORMATION_ARCHITECTURE/` — Site Map, catálogo detalhado de T01–T17 e rastreabilidade;
- `docs/04_DESIGN_SYSTEM/` — tokens, arquitetura e component map;
- `docs/05_FIGMA/` — registry de nodes, auditoria e integridade do protótipo;
- `docs/06_GITHUB/` — workflow, estrutura e registry de Issues;
- `docs/07_AI_CONTEXT/` — estado atual, contratos operacionais, screens/states e setup Codex;
- `AGENTS.md` / `CLAUDE.md` — contratos de execução para agentes;
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
17. `docs/05_FIGMA/FIGMA_AUDIT_2026-09-13.md`
18. `docs/06_GITHUB/`
19. `docs/CHANGELOG.md`

## Fluxo de design por agente

`GitHub Issue → RF/RNF/US → Context Pack → Figma atual → Integridade do protótipo → Componentes/tokens → Construção → Auditoria → Registry → Commit → Pull Request → Revisão humana`

## Codex

Use `docs/07_AI_CONTEXT/CODEX_SETUP.md`.

O Codex deve:
- resolver comportamento no GitHub;
- usar o Figma para estrutura/visual;
- ignorar wiring registrado como FI-###;
- não usar `LEGADO —`;
- não promover RF30/US-036;
- não fechar P03/P04/P05/P06 por inferência;
- rodar `python scripts/validate_agent_context.py`;
- trabalhar em branch e deixar PR para revisão humana.

O workflow **Validate agent context** valida os registries em Pull Requests.
