# T03 Human Approval — Canonical Override

Date: **2026-09-14**  
Status: **CANONICAL ON MERGE OF PR #93**

This file records the final human approval of the T03 Material 3 pilot and has precedence over stale `migrated_pending_human_review` wording that may still exist in protected AI-context registries on this branch.

It does **not** override functional requirements, permissions, open pending items, or proposal-only scope.

## Approved T03 state

- Screen: `T03 — Home / Visão Geral`.
- Default migrated node: `5684:1407`.
- Loading migrated node: `5684:22165`.
- A/B review: `5684:22217`.
- Component color/header review: `5700:1688`.
- Migration status: `MIGRATED_HUMAN_APPROVED`.
- Approval date: `2026-09-14`.

## Canonical Foundation references

- `AppHeader / Root / Tinted`: `5746:157`.
- `AppShell / Root`: `5652:528`.
- `NavigationBar / Primary`: `5652:442`.
- Root header gradient: `#EEF2F8 → #DCEBF4`.
- Settings: 48 × 48 hit target, approximately 40 × 40 perceived visual treatment.
- Contextual avatar: original image preserved, 2 px `Feature/Home/Accent` ring.
- No Liquid Glass, blur, translucency, glow, or heavy shadow.

The `AppShell / Root` already consumes the canonical `AppHeader / Root / Tinted`. New Root migrations must reuse the Foundation instead of rebuilding the shell treatment per screen.

## Approved color grammar

Canonical after the T03 human review:

- `Color/Primary Container`: `#D0E9F3` (`VariableID:5700:269`).
- `Color/On Primary Container`: `#003D59` (`VariableID:5700:270`).
- `Feature/*`, `Category/*`, and `Status/*` families in `Rede de Apoio / Semantic`.
- `Status/Scheduled`: `#EEEAF8 / #5B4A7D`.
- Hydration: `#D7EEF7 / #147A96 / #0B5268`.
- Diary: `#F0E4F1 / #875985 / #563751`.
- Pending uses Warning semantics.

`Color/Tertiary Container` and `Color/On Tertiary Container` remain **pending**. T03 did not validate them.

## Functional preservation

T03 still preserves RF07, RF17, RF25, RF26 and US-009, US-020, US-029, US-030.

Destinations remain:

- Plantonista atual → T04 `5122:1870`.
- Tarefa pendente → T09 `5360:348`.
- Próximo compromisso → T11 `5416:937`.

N02/N03/N04 remain blocked by P04.

RF30/US-036 remain proposal-only.

FI-001–FI-008 remain separate integrity debt and are not reinterpreted by this approval.

## State rule

Loading continues to obey:

`STATE = PAGE BASE + DELTA MÍNIMO`

Default and Loading use the same approved shell.

## Migration strategy consequence

The T03 pilot completed:

`PILOT → HUMAN REVIEW → PATTERN EXTRACTION`

Do not start another T## on the PR #93 branch. PR #93 must be merged only after explicit user authorization. The next migration starts from updated `main` in a new branch.

Per `SCREEN_MIGRATION_STRATEGY.md`, the next architectural pilot is T01 + T02 as `AuthShell`.

## Precedence rule

Until protected AI-context registries are normalized, agents must interpret these stale values as superseded **only for T03 visual migration status**:

- `migrated_pending_human_review` → `migrated_human_approved`;
- old Root header candidate wording → canonical `5746:157`;
- old T03 migration gate → completed.

All unrelated fields in `CURRENT_PROJECT_STATE.md`, `SCREEN_REGISTRY.yaml`, `STATE_MATRIX.yaml`, and `FIGMA_REGISTRY.yaml` remain authoritative.

This override is intentionally narrow. It cannot approve requirements, permissions, P-items, RF30/US-036, or any other T##.
