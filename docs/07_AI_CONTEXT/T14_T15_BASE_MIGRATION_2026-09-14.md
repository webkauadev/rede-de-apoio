# T14 + T15 — Material 3 base migration — 2026-09-14

## Status

**BASELINES MATERIALIZED — PENDING HUMAN VISUAL REVIEW — DO NOT PROPAGATE STATES YET**

Branch: `design/t14-t15-material3-migration`

This checkpoint records only the human-review baselines for T14 and T15. It does not approve the migration, derive sibling states, alter permissions, reinterpret current prototype wiring, or promote any new functional scope.

## Authority and method

Migration order remains:

`approved GitHub requirements → approved Material 3/Foundation pattern → Rede de Apoio semantic token → Obra/shadcn/local primitive → screen`

State propagation remains blocked until the baseline gate passes:

`STATE = PAGE BASE + DELTA MÍNIMO`

## Architecture decision

T12–T17 remain secondary management destinations exposed through `Settings / Management Sheet`; they are not a fifth primary navigation section.

Therefore both baselines use:

`AppHeader / Back → content`

and intentionally do **not** carry `NavigationBar / Primary`, legacy `Mais`, `compFooter`, or the five-item bottom navigation.

## T14 — Contatos Importantes / Default

- Current: `5387:2703`
- Migrated baseline: `5899:4780`
- Owner page: `David`
- Approved scope: US-026 / RF22

Preserved:

- description of the contacts area;
- Clodoaldo Oliveira context;
- `Adicionar contato` action;
- registered contacts;
- existing `Editar` actions.

Normalized:

- canonical `AppHeader / Back — Contatos Importantes`;
- duplicated body H1 removed because the Back Header already supplies the page title;
- content uses the 16 px mobile content margin / 358 px content width;
- context supporting text is no longer structural text below 14 px;
- semantic colors are bound to the existing Rede de Apoio variables or remain inside linked Obra/shadcn component instances;
- legacy `Mais` navigation and prototype-only helper rectangles are excluded from the migrated baseline.

Visual structure:

`AppHeader / Back → description → Pessoa Idosa context → Adicionar contato → Contatos cadastrados`

## T15 — Informações de Emergência / Default

- Current: `5404:2664`
- Migrated baseline: `5899:4857`
- Owner page: `David`
- Approved scope: US-028 / RF24

Preserved:

- read-only emergency-information purpose;
- Clodoaldo Oliveira context;
- Alergias;
- Tipo sanguíneo.

Normalized:

- canonical `AppHeader / Back — Informações de Emergência`;
- duplicated body H1 removed because the Back Header already supplies the page title;
- content uses the 16 px mobile content margin / 358 px content width;
- context supporting text is no longer structural text below 14 px;
- semantic colors are bound to the existing Rede de Apoio variables or remain inside linked Obra/shadcn component instances;
- legacy `Mais` navigation is excluded;
- no editing affordance was introduced because T15 is not an unrestricted edit surface.

Visual structure:

`AppHeader / Back → description → Pessoa Idosa context → Informações principais`

## Baseline audit

Both candidate roots are `390 × 844` and physically parented to page `David`.

Post-migration audit:

- wrong owner page: **0**
- wrong viewport size: **0**
- legacy `Mais` / `compFooter` / old bottom navigation residue: **0**
- missing/duplicate canonical AppHeader / Back: **0**
- unexpected primary NavigationBar: **0**
- custom structural text below 14 px: **0**
- unbound custom semantic solid colors outside linked component internals: **0**
- content overflow: **0**

## Human review board

`5899:4915` — `T14 + T15 — Material 3 Base Migration Review (NON-CANONICAL)`

The board shows:

`T14 CURRENT | T14 MIGRATED | T15 CURRENT | T15 MIGRATED`

The canonical migration candidates remain `5899:4780` and `5899:4857`; the board is review-only.

## Next step after explicit approval

If and only if these baselines are approved:

1. derive the remaining T14 states from `5899:4780` by minimum delta: Empty, Loading, Success, Adicionar, Validation Error, Editar, Alteração salva;
2. preserve E26 scope and existing add/edit behavior without creating new contact-management rules;
3. derive the remaining T15 states from `5899:4857` by minimum delta: Loading and Empty;
4. keep T15 read-oriented and do not infer edit permissions or new emergency fields;
5. run full-state visual and structural audit;
6. update `FIGMA_REGISTRY.yaml` and `STATE_MATRIX.yaml` with the complete candidate set;
7. update the PR for final human review;
8. do not merge without explicit authorization.
