# T16 + T17 — Material 3 full-state migration — 2026-09-14

## Status

**FULL STATE SET MATERIALIZED — PENDING FINAL HUMAN REVIEW — DO NOT MERGE YET**

Branch: `design/t16-t17-material3-migration`

PR: `#101`

The T16/T17 baselines were explicitly approved before state propagation. All sibling states follow `STATE = PAGE BASE + DELTA MÍNIMO`.

## Foundation

The approved fixed local navigation is now reusable:

- Component set: `5912:1699` — `Rede de Apoio / Foundation / LocalSubnav / Controle e Privacidade`
- `Active=Preferências`: `5912:1677`
- `Active=Auditoria`: `5912:1698`
- Behavior: fixed primary tabs
- Applicable screens: T16, T17

## T16

Current → migrated:

- Default: `5211:966` → `5907:1765`
- Alteração salva: `5212:432` → `5914:1991`

Review board: `5915:2122`

Saved is the approved Default page base plus the supported visual delta: the overdue-care switch becomes checked and the transient success feedback says `Preferências atualizadas.`. P04 remains open and is not resolved through design.

## T17

Current → migrated:

- Default: `5445:915` → `5909:28315`
- Loading: `5445:1033` → `5914:28551`
- Empty: `5445:18015` → `5914:28600`
- Detalhe: `5445:18109` → `5914:28689`
- Forbidden: `5445:18234` → `5914:28815`

Review board: `5915:2200`

Loading replaces only the event list with linked Skeleton instances. Empty replaces the event list with the linked Empty component. Detail preserves the existing event-detail fields and moves back navigation responsibility to `AppHeader / Back`. Forbidden preserves the existing E27 visual scope without adding new product rules.

## Architecture

All seven migrated roots use:

`AppHeader / Back → LocalSubnav / Controle e Privacidade → content`

They exclude legacy `Mais`, `compFooter`, the five-item bottom navigation, `NavigationBar / Primary`, and the deprecated `T06 / Header / Pessoa` shell.

Result styling uses canonical semantic roles: `Realizada` uses `Status/Completed`; `Acesso negado` uses `Status/Error` rather than legacy Destructive styling.

## Final audit

Audited roots:

- `5907:1765`
- `5914:1991`
- `5909:28315`
- `5914:28551`
- `5914:28600`
- `5914:28689`
- `5914:28815`

All roots are `390 × 844`, parented to page `Kauã`, with zero findings for legacy shell, header/subnav violations, Inter typography, structural text below 14 px, unbound semantic colors outside linked internals, audited targets below 48 px, detached expected components, or overflow.

## Traceability

Updated:

- `docs/05_FIGMA/FIGMA_REGISTRY.yaml`
- `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
- `docs/04_DESIGN_SYSTEM/COMPONENT_MAP.yaml`
- `docs/07_AI_CONTEXT/T16_T17_BASE_MIGRATION_2026-09-14.md`
- this report.

Current/source nodes remain registered alongside migrated nodes while PR #101 is open.

## Final gate

PR #101 remains open until the final review boards are accepted, the final branch head passes `Validate agent context`, and explicit merge authorization is given.
