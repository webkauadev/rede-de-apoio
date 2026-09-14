# T06 — Material 3 base migration — 2026-09-14

## Status

**BASELINE MATERIALIZED — PENDING HUMAN VISUAL REVIEW — DO NOT PROPAGATE SIBLING STATES YET**

Branch: `design/t06-material3-migration`

This checkpoint records only the T06 `Normal` / page-base migration. It does not approve the migration, resolve P03, redefine write permissions, promote proposal-only scope, or derive Empty/Loading/New Record/Validation Error/Success before human review.

## Authority and scope

T06 is owned by Kauã and is the chronological care-record screen for RF11, with RF13 authorship/date-time support. RN-005 keeps records immutable; RN-006 models correction as a new linked record rather than edit/delete. P03 remains open, so the presence of `Novo Registro` and `Corrigir` is visual evidence only and does not decide who may write.

Migration rule remains:

`STATE = PAGE BASE + DELTA MÍNIMO`

## Architecture decision

The migrated T06 page base uses the already-approved Registros de Cuidado architecture:

`AppHeader / Root / Tinted → LocalSubnav / Diário (Active=Diário) → Scroll Content → NavigationBar / Primary (Active=Diário)`

The legacy contextual `T06 / Header / Pessoa`, handmade `Diário | Histórico` row and five-destination bottom navigation containing `Mais` are not TARGET patterns.

## Baseline nodes

- Current T06 Normal: `5201:13491`
- Migrated T06 Normal: `5917:2409`
- Owner page: `Kauã`
- AppHeader / Root / Tinted instance: `5917:2410`
- LocalSubnav / Diário — Active Diário: `5917:2411`
- Scroll content: `5917:2412`
- NavigationBar / Primary — Active Diário: `5917:2420`
- Human review board: `5920:2476` — `T06 — Material 3 Base Migration Review (NON-CANONICAL)`

## Content preservation and normalization

The baseline preserves the current day summary, `Novo Registro` action, chronological care records, authorship, time, `Corrigir` affordances and previous-day section.

Care records continue to use the linked `T06 / Care Record Card` component. Their surfaces/borders follow the token grammar already approved in T07, while care subjects use canonical category roles:

- Mobilidade → `Category/Mobility/*`;
- Alimentação → `Category/Nutrition/*`;
- Hidratação → `Category/Hydration/*`;
- Descanso → `Category/Sleep/*`.

`Corrigir` remains Diary-context styling. No edit/delete action was introduced. The primary `Novo Registro` CTA is bound to canonical `Color/Primary` rather than inheriting its old local fill.

## Baseline audit

The migrated root is `390 × 844` and parented to page `Kauã`.

Audit result:

- legacy T06 person header / old bottom navigation / `Mais` / handmade section nav: **0**;
- canonical AppHeader / Root / Tinted: **1**;
- canonical LocalSubnav / Diário: **1**, `Active=Diário`;
- canonical NavigationBar / Primary: **1**, `Active=Diário`;
- detached instances: **0**;
- Inter legacy typography: **0**;
- structural text below 14 px: **0**;
- unbound custom semantic solid colors outside linked component internals: **0**;
- audited interactive targets below 48 px: **0**;
- unintended overflow: **0**.

The content extends beyond the 628 px content viewport by design; this is intentional vertical scrolling, not clipping.

## Human gate

Review `5920:2476` before sibling-state propagation. The board shows:

`T06 CURRENT / Normal | T06 MIGRATED / Normal`

If the baseline is approved, derive the registered T06 states from this page base by minimum delta. The New Record interaction must continue to respect the T06 architecture specification that treats registration as an overlay/Sheet rather than inventing a second page base. P03 remains unresolved throughout.

Do not merge this branch until the final full-state set receives explicit authorization.
