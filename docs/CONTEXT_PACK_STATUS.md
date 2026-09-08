# Context Pack Status

## Fonte operacional

O GitHub `webkauadev/rede-de-apoio` é a fonte única operacional para requisitos, RF/RNF, US, Issues/tarefas, decisões, rastreabilidade e contexto de agentes. O Figma é a fonte visual.

Agentes não consultam tracker externo. Informação funcional ausente é marcada como `migration_required`; correspondência provável pode ser `candidate_origin`, sem virar fato canônico.

## Estrutura disponível

A base agente-first contém:

- `AGENTS.md` e `CLAUDE.md`;
- contratos de design/autonomia;
- `SCREEN_REGISTRY.yaml` e `STATE_MATRIX.yaml`;
- `FIGMA_REGISTRY.yaml`;
- `COMPONENT_MAP.yaml`;
- `REQUIREMENTS_INDEX.yaml` com RF01–RF30, RNF01/RNF03 e Issues;
- `USER_STORIES_INDEX.yaml` com US-001–US-035, owners, Issues e rastreabilidade conhecida;
- `docs/06_GITHUB/ISSUE_REGISTRY.yaml` com todas as referências canônicas;
- Issues individuais para RF01–RF30, RNF01/RNF03, US-001–US-035 e US-036 proposta;
- Issues P01–P09 para as pendências; P07 encerrada como resolvida;
- Issue Forms para requisito, User Story e tarefa;
- validação automática via `scripts/validate_agent_context.py`.

## Cobertura de backlog

**Cobertura estrutural de Issues: completa para os identificadores conhecidos.**

- RF: 30/30 com Issue;
- RNF referenciados: RNF01 e RNF03 com Issue de lacuna;
- US oficiais: 35/35 com Issue;
- proposta: US-036 com Issue;
- pendências: P01–P09 com Issue.

## O que ainda falta funcionalmente

A migração de **conteúdo original** ainda não está completa porque as fontes atualmente disponíveis não contêm todos os textos aprovados.

Bloqueadores principais:

- P01 / #73 — textos Como/Quero/Para, atores, critérios e algumas origens das US;
- P02 / #74 — definições canônicas de RNF01 e RNF03;
- P03 / #75 — permissão de escrita por categoria;
- P04 / #76 — superfície de notificações;
- P05 / #77 — permissão de exportação;
- P06 / #78 — acumulação de papéis;
- P08 / #80 e P09 / #81 — cadeias funcionais ainda incompletas.

Essas lacunas são agora **visíveis e rastreáveis dentro do próprio GitHub**. O agente pode trabalhar autonomamente até onde a documentação permite e deve bloquear apenas decisões funcionais que dependam dessas lacunas.
