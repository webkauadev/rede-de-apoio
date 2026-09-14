# T06 — Material 3 base migration — 2026-09-14

## Status

**BASELINE HUMAN-APPROVED — FULL-STATE PROPAGATION COMPLETED IN FOLLOW-UP REPORT**

Branch: `design/t06-material3-migration`

This file remains the historical checkpoint for the T06 `Normal` / page-base migration. The completed sibling-state propagation is recorded in:

`docs/07_AI_CONTEXT/T06_FULL_STATE_MIGRATION_2026-09-14.md`

## Authority and scope

T06 is owned by Kauã and is the chronological care-record screen for RF11, with RF13 authorship/date-time support. RN-005 keeps records immutable; RN-006 models correction as a new linked record rather than edit/delete. P03 remains open, so the presence of `Novo Registro` and `Corrigir` is visual evidence only and does not decide who may write.

Migration rule remains:

`STATE = PAGE BASE + DELTA MÍNIMO`

## Approved architecture

The human-approved T06 page base uses:

`AppHeader / Root / Tinted → LocalSubnav / Diário (Active=Diário) → Scroll Content → NavigationBar / Primary (Active=Diário)`

The legacy contextual `T06 / Header / Pessoa`, handmade `Diário | Histórico` row and five-destination bottom navigation containing `Mais` are not TARGET patterns.

## Approved baseline nodes

- Current T06 Normal: `5201:13491`
- Migrated T06 Normal: `5917:2409`
- Owner page: `Kauã`
- AppHeader / Root / Tinted instance: `5917:2410`
- LocalSubnav / Diário — Active Diário: `5917:2411`
- Scroll content: `5917:2412`
- NavigationBar / Primary — Active Diário: `5917:2420`
- Baseline comparison board: `5920:2476` — `T06 — Material 3 Base Migration Review (NON-CANONICAL)`

The user explicitly approved this baseline before sibling-state propagation.

## Content preservation and normalization

The baseline preserves the current day summary, `Novo Registro` action, chronological care records, authorship, time, `Corrigir` affordances and previous-day section.

Care records continue to use the linked `T06 / Care Record Card` component. Their surfaces/borders follow the token grammar already approved in T07, while care subjects use canonical category roles:

- Mobilidade → `Category/Mobility/*`;
- Alimentação → `Category/Nutrition/*`;
- Hidratação → `Category/Hydration/*`;
- Descanso → `Category/Sleep/*`.

`Corrigir` remains Diary-context styling. No edit/delete action was introduced. The primary `Novo Registro` CTA is bound to canonical `Color/Primary`.

## Baseline audit

At approval time the migrated root was `390 × 844`, parented to `Kauã`, with zero legacy shell residues, exactly one canonical Root header, one `LocalSubnav / Diário`, one primary NavigationBar, zero Inter typography, zero structural text below 14 px, zero unbound semantic colors, zero audited targets below 48 px and no unintended overflow.

The content scrolls vertically by design.

## Follow-up

The approved sibling states, final review board, state-level audit and full migration details are documented in `T06_FULL_STATE_MIGRATION_2026-09-14.md`.

Do not merge the branch until the final full-state set receives explicit user authorization.
