# T06 — Material 3 full-state migration — 2026-09-14

## Status

**FULL STATE SET MATERIALIZED — PENDING FINAL HUMAN REVIEW — DO NOT MERGE WITHOUT EXPLICIT AUTHORIZATION**

Branch: `design/t06-material3-migration`

Final review board:

`5924:3392` — `T06 — Material 3 Full State Set Review (NON-CANONICAL)`

The T06 baseline was explicitly human-approved before propagation.

## Authority and protected scope

T06 remains governed by RF11 and RF13, with RN-005/RN-006 preserving immutability and versioned correction semantics. P03 remains open. The visual presence of `Novo Registro` and `Corrigir` does not define write permission.

No edit/delete action was introduced. No filter, attachment, symptom/intercurrence workflow or Pessoa Idosa proposal scope was added.

State derivation follows:

`STATE = PAGE BASE + DELTA MÍNIMO`

## Canonical page-base architecture

All T06 page-base states use:

`AppHeader / Root / Tinted → LocalSubnav / Diário (Active=Diário) → Scroll Content → NavigationBar / Primary (Active=Diário)`

The old T06 person header, handmade `Diário | Histórico` row and five-item footer containing `Mais` are absent from every migrated root.

## Current → migrated state map

- Normal `5201:13491` → `5917:2409`
- Empty `5201:13490` → `5922:3893`
- Loading `5288:14618` → `5922:30572`
- Novo Registro / Default `5201:13488` → `5922:30922`
- Novo Registro / Validation Error `5203:300` → `5922:31158`
- Success `5288:14482` → `5922:30746`

Final review board: `5924:3392`.

Historical baseline comparison board: `5920:2476`.

## State deltas

### Normal

Human-approved page base. Preserves day summary, chronological care records, authorship/time, `Novo Registro`, `Corrigir`, previous-day section and intentional vertical scroll.

Category grammar:

- Mobilidade → `Category/Mobility/*`
- Alimentação → `Category/Nutrition/*`
- Hidratação → `Category/Hydration/*`
- Descanso → `Category/Sleep/*`

### Empty

Keeps the approved shell and replaces the timeline region with the linked Obra Empty pattern:

- `Nenhum registro no diário ainda.`
- `Registre acontecimentos do cuidado para manter a rede informada.`
- `Novo Registro` remains available visually without resolving P03.

### Loading

Keeps the approved shell and replaces only content with canonical linked skeleton instances. No navigation or layout grammar changes.

### Novo Registro / Default

Registration is modeled as a modal bottom Sheet over the T06 page base rather than as a second page base.

The underlying T06 remains recognizable behind semantic `Color/Scrim`. The Sheet uses `Color/Surface Container Low` and preserves the registered fields:

- Categoria
- Descrição
- Data
- Hora

Select, Textarea and date/time controls remain linked to Obra/shadcn instances and are wrapped by 48 px interaction regions. Actions are `Cancelar` and `Salvar registro`.

The Sheet includes the existing immutability guidance without creating a new rule: records are not edited/deleted and corrections create a linked record.

### Novo Registro / Validation Error

True minimum delta of the default Sheet. It preserves structure and entered values, changes the description control to its linked Error state and adds `Descreva o que aconteceu.` using canonical `Color/Danger`.

### Success

Keeps the approved Normal state and adds linked Sonner feedback:

`Registro salvo às 15:20`

No navigation or timeline structure is changed by the feedback state.

## Color and component normalization

- `Novo Registro` and `Salvar registro` → canonical `Color/Primary`;
- Sheet → `Color/Surface Container Low`;
- modal scrim → `Color/Scrim` with node opacity preserving background recognition;
- Select surface → `Color/Surface Container Low`;
- informational card → `Color/Surface` + `Color/Border Subtle`;
- validation copy → `Color/Danger`;
- care-record category colors remain semantic Category roles;
- linked kit internals remain instances; no detached component was required.

## Final technical audit

The six migrated roots are all `390 × 844` on page `Kauã`.

Across Normal, Empty, Loading, Novo Registro, Validation Error and Success:

- legacy T06 person header / old bottom navigation / `Mais`: **0**;
- canonical AppHeader / Root / Tinted per root: **1**;
- canonical LocalSubnav / Diário per root: **1**, `Active=Diário`;
- canonical NavigationBar / Primary per root: **1**, `Active=Diário`;
- Inter legacy typography: **0**;
- structural custom text below 14 px: **0**;
- unbound semantic solid fills/strokes outside linked internals: **0**;
- audited interactive targets below 48 px: **0**;
- Sheet overflow: **0**;
- unintended root/content overflow: **0**.

Normal, Loading, the two Sheet states and Success retain vertical content overflow only where the underlying T06 timeline intentionally scrolls. Empty does not require vertical scrolling.

## Human review gate

Review `5924:3392`, especially:

- Empty hierarchy + CTA;
- Loading density;
- Novo Registro Sheet ergonomics;
- Validation Error delta;
- Success Sonner placement.

The full-state set must receive explicit user approval before PR #102 is merged.
