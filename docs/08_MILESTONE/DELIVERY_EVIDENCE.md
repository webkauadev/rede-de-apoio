# Delivery Evidence — Afirmação → Evidência

Referências, não cópias. Cada linha aponta para o registro/Issue/PR que sustenta a afirmação. Atualizado em 2026-09-16.

| Afirmação | Evidência |
|---|---|
| T01–T17 canônicos no `Fluxo Final` | `docs/05_FIGMA/FIGMA_REGISTRY.yaml` § `known_current_nodes` / `final_prototype`; confirmado ao vivo via Figma MCP `get_metadata` em 2026-09-16 |
| Bottom Sheet T06/T08/T09/T10/T11 canônico | `docs/04_DESIGN_SYSTEM/ENTITY_ENTRY_BOTTOM_SHEET_PATTERN.md`; `docs/05_FIGMA/ENTITY_ENTRY_BOTTOM_SHEET_FLOW.yaml`; PRs #111, #112, #113 (mergeados); nomes `[LEGACY PROTO STATE] ... SUPERSEDED BY BOTTOM SHEET` confirmados ao vivo em 2026-09-16 |
| Pessoa Idosa read-only aprovada (RF30/US-036) | Issue #34 (RF30) e #72 (US-036), ambas com aprovação registrada; `docs/02_BUSINESS_RULES/ELDERLY_READ_ONLY_ACCESS.md`; `docs/05_FIGMA/ELDERLY_READ_ONLY_FLOW.yaml`; overlay `5948:36255` confirmado ao vivo |
| Permissões (P03/P06) | `docs/02_BUSINESS_RULES/PERMISSIONS_MATRIX.md`; Issues #75 (P03) e #78 (P06), ambas `closed/completed` |
| Exportação CSV (P05) | `docs/02_BUSINESS_RULES/PERMISSIONS_MATRIX.md` § Exportação CSV; Issue #77, `closed/completed` |
| Notificações (P04) | `docs/02_BUSINESS_RULES/NOTIFICATIONS_RULES.md`; Issue #76, `closed/completed` |
| P01 (critérios de aceite) resolvido | `gh issue view 73` → `state: CLOSED`, `closedAt: 2026-09-15T02:47:48Z`, comentário de fechamento com aprovação humana explícita; `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml`; PR #110 |
| US → RF/RNF → Tela → Estado → Componente | `docs/03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`; `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`; `docs/07_AI_CONTEXT/STATE_MATRIX.yaml` |
| Responsáveis por tela/US | `docs/06_GITHUB/ISSUE_REGISTRY.yaml` § `user_stories` (owner por US); `AGENTS.md` § 6 |
| Integridade do protótipo (FI-001–FI-008) resolvida | Issue #84, `CLOSED`; `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml` § `historical_defects` |
| Design Foundation Material 3 aprovada | PR #91 (mergeado); `docs/07_AI_CONTEXT/T03_HUMAN_APPROVAL_2026-09-14.md`; `docs/04_DESIGN_SYSTEM/COMPONENT_MAP.yaml` (status corrigido nesta auditoria para `canonical_after_pr91`) |
| Métrica de commits/issues/PRs | `docs/08_MILESTONE/METRICS_SNAPSHOT.md`, com comando `gh`/`git` exato por linha |
| Decisões de fechamento de gate | commits/PRs referenciados em cada seção de `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md` |

## Divergências corrigidas nesta auditoria (2026-09-16)

| Divergência | Antes | Depois | Evidência da correção |
|---|---|---|---|
| Status de P01/#73 | 12 arquivos diziam "P01 permanece aberto" | Alinhados a "P01 resolvido em 2026-09-15" | commit `docs(audit): reconcile P01/#73 closure across governance docs`; `gh issue view 73` |
| Estados canônicos T06/T08/T09/T10/T11 | `STATE_MATRIX.yaml`/`FIGMA_REGISTRY.yaml` apontavam para os 13 nodes full-page superseded como canônicos | Apontam para os 10 overlays de Bottom Sheet; full-page preservados como `legacy_full_page_states` | commit `docs(state): sync canonical entity-entry states to Bottom Sheet pattern`; confirmado ao vivo no Figma |
| `SCREENS_CATALOG.md` | Datado 2026-09-13, nodes de owner-page pré-migração, RF30/US-036 como proposta, FI-001–008 como dívida aberta, distribuição de US 9/9/9/8=35 | Reescrito contra `Fluxo Final`, RF30/US-036 aprovados, FI-001–008 históricos resolvidos, distribuição 10/9/9/8=36 | commit `docs(ia): rewrite screens catalog against Fluxo Final and current gates` |
| Status de componentes Foundation | `COMPONENT_MAP.yaml` (04_DESIGN_SYSTEM) ainda dizia `pending_pr_review`/`pending_human_visual_review`/`migration_blocked` para componentes já aprovados no PR #91 | Alinhado a `canonical_after_pr91`/`canonical_reusable`, migration_gate `unblocked` | commit `docs(design): reconcile foundation component statuses with PR #91 approval` |
| Gate temporário PR #91 em `FIGMA_GUIDELINES.md` | Descrito como bloqueio ativo de T03/propagação | Marcado como histórico resolvido em 2026-09-14 | commit `docs(figma): close stale PR #91 calibration gate in Figma guidelines` |

## Preservado como histórico (não alterado)

- `docs/AUDIT_CONTEXT_PACK.md` — auditoria datada de 2026-09-05, pré-existência de RF/RNF/US completos no GitHub.
- `docs/03_INFORMATION_ARCHITECTURE/T06_DIARIO_DE_CUIDADOS.md` e `SCREEN_STATES.md` — specs iniciais pré-consolidação, não fazem parte da ordem de leitura de `AGENTS.md`/`README.md`.
- `docs/07_AI_CONTEXT/T0*_2026-09-14.md` (migrações por tela) e `AUTHSHELL_T01_T02_PILOT_2026-09-14.md` — registros datados do dia da migração; `MIGRATED_PENDING_HUMAN_REVIEW`/"P01 permanece aberto" refletem o estado real naquele dia, anterior à aprovação humana subsequente.
- `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA_DRAFT.yaml` (`status: pending_human_review`) — snapshot histórico deliberado do conjunto submetido à aprovação, conforme `PENDENCIAS_DOCUMENTAIS.md`.
- Os 13 nodes Figma full-page superseded (T06/T08/T09/T10/T11) — mantidos no Figma e nos registries como `legacy_full_page_states`/`[LEGACY PROTO STATE]`, nunca apagados.
