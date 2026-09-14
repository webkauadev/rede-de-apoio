# T12 + T13 — Material 3 base migration — 2026-09-14

## Status

**BASELINES MATERIALIZED — PENDING HUMAN VISUAL REVIEW — DO NOT PROPAGATE STATES YET**

Branch: `design/t12-t13-material3-migration`

This checkpoint records only the human-review baselines for T12 and T13. It does not approve the migration, derive sibling states, alter permissions, resolve open gates, or promote proposal-only states.

## Authority and method

Migration order remains:

`approved GitHub requirements → approved Material 3/Foundation pattern → Rede de Apoio semantic token → Obra/shadcn/local primitive → screen`

State propagation remains blocked until the baseline gate passes:

`STATE = PAGE BASE + DELTA MÍNIMO`

## Architecture decision

T12–T17 are secondary management destinations exposed through `Settings / Management Sheet`; they are not a fifth primary navigation section.

Therefore the T12/T13 baselines use:

`AppHeader / Back → content`

and intentionally do **not** carry `NavigationBar / Primary`.

The legacy `Mais`, `compFooter`, `Bottom Navigation / Mais` and the duplicated management destination list are not TARGET patterns.

## T12 — Pessoa Idosa / Visualização

- Current: `5125:2719`
- Migrated baseline: `5876:3950`
- Owner page: `David`

Preserved approved scope:

- profile photo;
- full name;
- date of birth;
- access to T13 Rede de Cuidado;
- Editar perfil action.

Deliberately excluded from the baseline:

- legacy `Mais opções` destination list, because those destinations now live in the canonical Settings Sheet;
- legacy five-destination footer;
- `Perfil Ativo` as a functional status, because RF03/RF04 do not define it as product state;
- RF30/US-036 access states and invitation states, which remain `proposal_only`.

Visual structure:

`AppHeader / Back — Pessoa Idosa → Profile Hero → Informações pessoais → Rede de Cuidado → Editar perfil`

The real Clodoaldo image is preserved. The Rede de Cuidado artwork is reused from the existing screen and rebound to semantic roles rather than keeping legacy raw colors.

## T13 — Rede de Cuidado / Default

- Current: `5367:1631`
- Migrated baseline: `5876:3951`
- Owner page: `David`

Preserved approved scope:

- Clodoaldo context;
- Vincular membro;
- family members;
- visible role badges;
- Gerenciar / Desvincular actions already present in current scope;
- health professional grouping.

Visual structure:

`AppHeader / Back — Rede de Cuidado → supporting context → Pessoa Idosa context row → Vincular membro → Familiares → Profissionais da Saúde`

The duplicated body H1 was removed because the canonical Back Header already provides the page title.

The calibrated existing linked Avatar and primary Button instances were reused after visual QA. No new member-management permission was introduced.

## Open functional gates preserved

- P03 remains unresolved and is not decided by this visual migration.
- P06 remains unresolved for Principal transfer acceptance details. Baseline T13 does not reinterpret or complete the transfer contract.
- Exactly one active Principal remains a business invariant; this baseline does not alter it.
- RF30/US-036 remains proposal-only and is excluded from canonical T12 baseline propagation.

## Baseline audit

Both candidate roots are `390 × 844` and physically parented to page `David`.

Post-cleanup audit:

- wrong owner page: **0**
- wrong root size: **0**
- legacy `Mais` / `compFooter` / old bottom navigation residue: **0**
- custom structural text below 14 px: **0**
- custom solid semantic colors without variable binding: **0**
- unexpected primary NavigationBar instances: **0**
- missing canonical AppHeader / Back: **0**
- content overflow in the current baselines: **0**

## Human review board

`5883:3993` — `T12 + T13 — Material 3 Base Migration Review (NON-CANONICAL)`

It shows, at full mobile size:

`T12 CURRENT | T12 MIGRATED | T13 CURRENT | T13 MIGRATED`

The board is a raster review artifact only. The canonical candidates remain `5876:3950` and `5876:3951`.

## Next step after explicit approval

If and only if the baselines are approved:

1. derive the remaining approved T12 states from `5876:3950` by minimum delta;
2. keep all RF30/US-036 proposal-only states outside canonical propagation;
3. derive the remaining T13 states from `5876:3951` by minimum delta;
4. preserve P06 on role/principal-transfer states without inventing acceptance criteria;
5. run full-state visual and structural audit;
6. update `FIGMA_REGISTRY.yaml` and `STATE_MATRIX.yaml` with the complete candidate set;
7. update this PR for final human review;
8. do not merge without explicit authorization.
