# T16 + T17 — Material 3 base migration — 2026-09-14

## Status

**BASELINES MATERIALIZED — PENDING HUMAN VISUAL REVIEW — DO NOT PROPAGATE STATES YET**

Branch: `design/t16-t17-material3-migration`

This checkpoint records only the human-review baselines for T16 and T17. It does not approve the migration, derive sibling states, resolve P04, reinterpret current prototype wiring, expand T17 permissions, or promote the LocalSubnav pilot to Foundation.

## Authority and method

Migration order remains:

`approved GitHub requirements → approved Material 3/Foundation pattern → Rede de Apoio semantic token → Obra/shadcn/local primitive → screen`

State propagation remains blocked until the baseline gate passes:

`STATE = PAGE BASE + DELTA MÍNIMO`

## Architecture decision

T16 and T17 remain secondary management destinations exposed through `Settings / Management Sheet`; they are not a fifth primary navigation section.

They also form the local `Controle e Privacidade` pair, so both baselines use:

`AppHeader / Back → fixed LocalSubnav (Preferências | Auditoria) → content`

They intentionally do **not** carry `NavigationBar / Primary`, legacy `Mais`, `compFooter`, the five-item bottom navigation, or the deprecated `T06 / Header / Pessoa` shell.

The LocalSubnav is currently a review pilot instantiated from the already-approved fixed-tabs architecture. Its labels are `Preferências | Auditoria` and its active semantics were retokened to generic Primary / On Secondary Container roles instead of Diary feature colors. It must not be promoted as a reusable Foundation component before human approval.

## T16 — Preferências de Notificações / Default

- Current: `5211:966`
- Migrated baseline: `5907:1765`
- Owner page: `Kauã`
- LocalSubnav pilot: `5907:28266`
- Functional gate preserved: `P04`

Preserved:

- explanation that optional notifications can be configured;
- mandatory notification for shift changes;
- mandatory notification for reminders while on duty;
- optional notification for registered care;
- optional notification for overdue care;
- save-preferences action.

Normalized:

- canonical `AppHeader / Back — Preferências de Notificações`;
- fixed local navigation immediately under the header;
- mandatory cards expose neutral mandatory badges, lock icon and checked-disabled switch state;
- optional switches have explicit 48 px interaction targets while preserving the linked visual switch primitive;
- structural/supporting text is at least 14 px outside linked component internals;
- primary save action uses the canonical Primary-bound paint;
- legacy `Mais` navigation is excluded.

No decision from P04 was inferred or resolved through design.

## T17 — Auditoria / Default

- Current: `5445:915`
- Migrated baseline: `5909:28315`
- Owner page: `Kauã`
- LocalSubnav pilot: `5909:28322`

Preserved:

- audit purpose and recent operations;
- Clodoaldo Oliveira context;
- `Registro criado` by Marina Souza;
- `Tarefa concluída` by Rafael Lima;
- `Acesso bloqueado` by Marcos Almeida;
- date/time and result semantics.

Normalized:

- deprecated contextual person header replaced by canonical `AppHeader / Back — Auditoria`;
- person context is preserved in page content instead of acting as the global header;
- fixed local navigation immediately under the header;
- audit event rows remain linked `Item - Nova` instances with left/right slots disabled through component properties;
- `Realizada` uses canonical `Status/Completed` container/foreground;
- `Acesso negado` uses canonical `Status/Error` container/foreground rather than the legacy destructive treatment;
- legacy `Mais` navigation is excluded.

The baseline does not add new audit permissions or resolve the behavior represented by the existing T17 Forbidden state.

## Baseline audit

Both candidate roots are `390 × 844` and physically parented to page `Kauã`.

Post-migration audit on both roots returned:

- wrong owner page: **0**
- wrong viewport size: **0**
- legacy `Mais` / `compFooter` / old bottom navigation: **0**
- deprecated `T06 / Header / Pessoa`: **0**
- missing/duplicate canonical `AppHeader / Back`: **0**
- unexpected primary NavigationBar: **0**
- missing/duplicate local subnav pilot: **0**
- detached instances: **0**
- Inter legacy typography: **0**
- custom structural text below 14 px: **0**
- unbound custom semantic solid colors outside linked component internals: **0**
- audited interactive controls below 48 px: **0**
- root/content overflow: **0**

## Human review board

`5911:1834` — `T16 + T17 — Material 3 Base Migration Review (NON-CANONICAL)`

The board shows:

`T16 CURRENT | T16 MIGRATED | T17 CURRENT | T17 MIGRATED`

Canonical migration candidates remain `5907:1765` and `5909:28315`; the board contains review-only snapshots.

## Next step after explicit approval

If and only if these baselines are approved:

1. promote `LocalSubnav / Controle e Privacidade` to a reusable Foundation component with `Active=Preferências` and `Active=Auditoria` variants;
2. derive T16 `Saved` from the approved T16 page base by minimum delta while preserving P04;
3. derive T17 `Loading`, `Empty`, `Detail`, and `Forbidden` from the approved T17 page base by minimum delta;
4. keep E27/Forbidden semantics within approved scope and do not infer permission rules;
5. run the full-state visual and structural audit;
6. update `FIGMA_REGISTRY.yaml` and `STATE_MATRIX.yaml` with current + migrated candidates;
7. update the PR for final human review;
8. do not merge without explicit authorization.
