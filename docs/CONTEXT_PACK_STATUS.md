# Context Pack Status

## Fonte operacional

O GitHub `webkauadev/rede-de-apoio` é a fonte única operacional para requisitos, RF/RNF, US, Issues/tarefas, decisões, rastreabilidade e contexto de agentes. O Figma é a fonte visual.

Agentes não consultam tracker externo. Informação funcional ausente é marcada como `migration_required`; correspondência provável pode ser `candidate_origin`, sem virar fato canônico.

## Estrutura disponível

A base agent-first contém:

- `AGENTS.md` e `CLAUDE.md`;
- contratos de design/autonomia;
- `SCREEN_REGISTRY.yaml` e `STATE_MATRIX.yaml`;
- `FIGMA_REGISTRY.yaml`;
- `COMPONENT_MAP.yaml`;
- `REQUIREMENTS_INDEX.yaml` com RF01–RF30 e RNF canônicos;
- `USER_STORIES_INDEX.yaml` com US-001–US-036, owners, Issues e rastreabilidade;
- `docs/06_GITHUB/ISSUE_REGISTRY.yaml` com todas as referências canônicas;
- Issues individuais para RF01–RF30, RNF01–RNF03 e US-001–US-036;
- Issues P01–P09 para pendências/decisões documentais;
- Issue Forms para requisito, User Story e tarefa;
- validação automática via `scripts/validate_agent_context.py`.

## Cobertura de backlog

**Cobertura estrutural de Issues: completa para os identificadores conhecidos.**

- RF: 30/30 com Issue;
- RNF referenciados: RNF01–RNF03 registrados;
- US oficiais: 36/36 com Issue;
- pendências: P01–P09 com Issue.

## Decisões consolidadas em 2026-09-14

- P03 / #75 — permissões de escrita e correção versionada tornadas decidíveis;
- P04 / #76 — superfície formal de N01–N04 definida sem criar Central de Notificações;
- P05 / #77 — exportação CSV restrita ao Familiar Principal na primeira versão;
- P06 / #78 — composição de papéis acumulados definida por união de permissões positivas, preservando condições contextuais e restrições explícitas;
- RF30 / #34 — acesso read-only da Pessoa Idosa aprovado;
- US-036 / #72 — história de acesso ao próprio cuidado aprovada e atribuída a David.

## Decisão consolidada em 2026-09-15

- P01 / #73 — RESOLVIDO. Critérios individuais de aceite de US-001–US-036 aprovados explicitamente e promovidos para `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml` e para as Issues correspondentes.

Nenhum gate documental P01–P09 permanece aberto no GitHub. Agentes não devem inventar critérios além dos já aprovados sem nova decisão explícita.

## Protótipo

A página Figma `Fluxo Final` (`5926:1014`) é o protótipo canônico de usuário final.

A aprovação de RF30/US-036 autoriza agora a migração dos estados read-only da Pessoa Idosa para o fluxo aprovado. Até que essa migração visual seja concluída e auditada, os nodes históricos anteriormente marcados como `proposal_only` devem ser tratados como fonte de design, não como implementação final por si só.
