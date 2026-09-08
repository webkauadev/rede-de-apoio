# Context Pack Status

## Fonte operacional

O GitHub `webkauadev/rede-de-apoio` é a fonte única operacional do projeto para requisitos, RF/RNF, US, Issues/tarefas, critérios, decisões e contexto de agentes. O Figma é a fonte visual.

Agentes não consultam tracker externo. Informação funcional ausente é marcada como `migration_required`.

## Estrutura disponível

A base agente-first já contém:

- `AGENTS.md` e `CLAUDE.md`;
- contratos de design/autonomia;
- `SCREEN_REGISTRY.yaml` e `STATE_MATRIX.yaml`;
- `FIGMA_REGISTRY.yaml`;
- `COMPONENT_MAP.yaml`;
- `REQUIREMENTS_INDEX.yaml` com RF01–RF30 e RNFs referenciados;
- `USER_STORIES_INDEX.yaml` com US-001–US-035 e responsáveis;
- `docs/06_GITHUB/` com workflow e estrutura de Issues;
- validação automática via `scripts/validate_agent_context.py`.

## Estado de consistência

A infraestrutura está estruturada, mas a **migração de conteúdo funcional ainda não está completa**.

Bloqueadores principais:

- P01 — textos completos, critérios e origens de US-001 a US-035 ainda não estão integralmente no GitHub;
- P02 — definições canônicas de RNF01 e RNF03 ainda não estão no GitHub;
- P03 — permissão de escrita por categoria ainda não é decidível;
- P08/P09 — rastreabilidade funcional ainda é parcial para vários RF/telas.

Ver:

- `AUDIT_CONTEXT_PACK.md` — auditoria histórica de 2026-09-05;
- `01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md` — situação operacional atual.

Até essas lacunas serem migradas/aprovadas no GitHub, agentes podem executar correções visuais/estruturais seguras, mas não devem inventar decisões funcionais dependentes das lacunas.
