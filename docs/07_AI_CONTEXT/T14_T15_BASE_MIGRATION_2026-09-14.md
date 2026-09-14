# T14 + T15 — Material 3 base migration — 2026-09-14

## Status

**BASELINES APPROVED — FULL-STATE PROPAGATION COMPLETED IN FOLLOW-UP REPORT**

Branch: `design/t14-t15-material3-migration`

This file remains as the historical baseline checkpoint. The completed full-state propagation is recorded in:

`docs/07_AI_CONTEXT/T14_T15_FULL_STATE_MIGRATION_2026-09-14.md`

## Architecture decision

T14–T15 are secondary management destinations exposed through `Settings / Management Sheet`; they are not a fifth primary navigation section.

Therefore the approved baselines use:

`AppHeader / Back → content`

and intentionally do **not** carry `NavigationBar / Primary`.

The legacy `Mais`, `compFooter`, `Bottom Navigation / Mais` and duplicated body H1 are not TARGET patterns.

## Approved baselines

- T14 Current: `5387:2703`
- T14 Migrated baseline: `5899:4780`
- T15 Current: `5404:2664`
- T15 Migrated baseline: `5899:4857`
- Baseline comparison board: `5899:4915`

The user explicitly approved these baselines before sibling-state propagation.

## Preserved scope

T14 preserves the contacts-area description, Clodoaldo context, Adicionar contato, registered contacts and existing Editar actions.

T15 preserves emergency-information purpose, Clodoaldo context, Alergias and Tipo sanguíneo. It remains read-only; no edit affordance or new emergency field was introduced.

## Baseline audit

At approval time both candidate roots were `390 × 844`, parented to page `David`, with one canonical `AppHeader / Back`, no legacy bottom navigation, no primary NavigationBar, no structural custom text below 14 px, no unbound custom semantic solid color outside linked component internals, and no root overflow.

## Follow-up

The approved sibling states, final boards, registry/state-matrix entries and final technical audit are documented in `T14_T15_FULL_STATE_MIGRATION_2026-09-14.md`.
