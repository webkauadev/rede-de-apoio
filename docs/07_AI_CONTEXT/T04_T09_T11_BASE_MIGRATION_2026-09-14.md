# T04 + T09 + T11 — Material 3 Base-State Migration

Status: **PENDING HUMAN VISUAL REVIEW — DO NOT MERGE**  
Date: **2026-09-14**  
Branch: `design/t04-t09-t11-material3-migration`

## 1. Objective

Apply the approved post-T03 migration pattern to the next coherent micro-batch without expanding functional scope:

- T04 — Calendário de Cuidados;
- T09 — Tarefas;
- T11 — Compromissos.

This batch intentionally migrates only the base/reference states needed for human visual review before scaling the pattern to the remaining Empty / Loading / Form / Validation / Success states.

`STATE = PAGE BASE + DELTA MÍNIMO` remains mandatory when the remaining states are migrated.

## 2. Functional scope preserved

### T04 — Calendário de Cuidados

Canonical scope remains tied to:

- RF06, RF07, RF08, RF09, RF10;
- US-008, US-009, US-011, US-012, US-013, US-014.

The existing Week and Day views are preserved. No new scheduling behavior, permission, role, or prototype destination was invented.

### T09 — Tarefas

Canonical scope remains tied to:

- RF21;
- US-024, US-025;
- contextual continuity with US-020 and US-030 where already documented.

No new task behavior was introduced.

### T11 — Compromissos

Canonical scope remains tied to:

- RF20;
- US-023.

No new appointment behavior was introduced.

## 3. Current → migrated Figma nodes

| Screen/state | Current reference | Migrated candidate |
|---|---:|---:|
| T04 / Semana | `5122:1870` | `5771:23011` |
| T04 / Dia | `5122:2031` | `5777:2174` |
| T09 / Default | `5360:348` | `5766:2027` |
| T11 / Default | `5416:937` | `5772:2132` |

Human A/B review board:

- `5786:2202` — `T04 + T09 + T11 — Material 3 Migration Review (NON-CANONICAL)`.

The review board is not a canonical product frame and must not be used as a functional source of truth.

## 4. Shell and navigation

All migrated candidates use the approved authenticated Root-shell direction established by the T03 pilot:

- canonical tinted Root Header family;
- explicit page/task title in the header;
- context `Clodoaldo Oliveira`;
- Settings action preserved;
- exactly four primary destinations: `Home · Agenda · Diário · Saúde`;
- no `Mais` destination in the migrated Navigation Bar.

Active primary navigation:

- T04 → `Agenda`;
- T09 → `Saúde`;
- T11 → `Saúde`.

T09 and T11 preserve the existing Saúde section navigation and make the active local destination explicit:

- T09 → `Tarefas`;
- T11 → `Compromissos`.

## 5. Color grammar applied

The batch reuses the semantic color grammar already approved after T03. No new global token family was created for this batch.

### T04 — Agenda

Agenda-specific structure uses the existing roles:

- `Feature/Agenda/Container`;
- `Feature/Agenda/Accent`;
- `Feature/Agenda/Foreground`.

They are applied to selection, timeline emphasis, current-shift emphasis, date controls, and other Agenda-specific hierarchy.

Supporting roles use existing semantic tokens such as:

- `Color/Background`;
- `Color/Surface`;
- `Color/Surface Container Low`;
- `Color/On Surface`;
- `Color/On Surface Variant`;
- `Color/Primary Container` / `Color/On Primary Container` for the current-state pill;
- `Status/Scheduled/*` for `Próximo`;
- `Status/Disabled/*` for `Encerrado`.

### T09 / T11 — Saúde

The Saúde local-section selection uses:

- `Feature/Health/Container`;
- `Feature/Health/Foreground`.

Global creation CTAs continue using the canonical Primary role. Task status badges use the existing semantic status families (`Pending`, `Completed`).

Color is used to communicate hierarchy, domain, status and selection; it is not decorative.

## 6. Layout and ergonomics

The migrated base states follow the current mobile contract:

- viewport: `390 × 844`;
- canonical content margin: `16 px`;
- useful content width: `358 px`;
- Geist typography;
- Root Header: `80 px`;
- primary Navigation Bar: `80 px`;
- interaction target rule: `>= 48 × 48 px`.

T04 keeps the compact visible segmented/temporal controls while materializing explicit `48 px` touch-target wrappers for:

- Dia;
- Semana;
- previous date;
- next date;
- Hoje.

Weekday labels were raised to `14 px` because they are structural navigation labels, not mini metadata.

The T09 `Concluir` actions now satisfy the `48 px` target requirement without detaching the underlying component instances.

## 7. Human visual review performed before PR

The following final candidates were visually inspected after migration:

- T04 / Semana — `5771:23011`;
- T04 / Dia — `5777:2174`;
- T09 / Default — `5766:2027`;
- T11 / Default — `5772:2132`;
- A/B review board — `5786:2202`.

Observed direction:

- migrated headers are materially clearer and remove the deprecated legacy header/footer architecture;
- T04 gains a coherent Agenda-specific lavender/blue hierarchy while preserving readability and care context;
- T09/T11 use Health-green selection only where the local Saúde taxonomy needs it, while Primary remains the action color;
- the four-item Navigation Bar is visibly calmer and less crowded than the current five-item footer;
- no second redundant H1 remains in T09/T11 after the page title moves into the Root Header;
- T04 retains the calendar date heading because it describes the selected day, not the primary navigation destination.

## 8. Structural audit

Final base-state audit result:

- `0` detached instances;
- `0` unexplained visible hardcoded semantic SOLID fills/strokes;
- `0` structural text below `14 px`;
- `0` reaction targets below `48 px`;
- T04 explicit control hit areas are `>=48 px`;
- T09 task-completion reaction targets are `48 px` high;
- scrolling is limited to intended content regions;
- the Root shell remains 390×844;
- current/proposal screens outside the batch are untouched.

Mini status labels and supporting role metadata may remain at `12 px` where they are not structural hierarchy, consistent with the existing semantic badge/meta treatment.

## 9. Explicitly not done yet

This PR must **not** be interpreted as approval to migrate all states automatically.

Not yet migrated in this branch:

- T09 Empty;
- T09 Loading;
- T09 New Task;
- T09 Validation Error;
- T09 Task Created;
- T09 Task Completed;
- T11 Empty;
- T11 Loading;
- T11 New Appointment;
- T11 Validation Error;
- T11 Success.

Those states should be generated only after human approval of these base-state candidates, using `PAGE BASE + DELTA MÍNIMO`.

T04 has only the registered Week and Day views in the current State Matrix, so both registered T04 base views are represented in this review.

## 10. Protected scope

This migration does not resolve, reinterpret, or approve:

- P01;
- P03;
- P04;
- P05;
- P06;
- RF30;
- US-036;
- FI-001 through FI-008;
- any unrelated T## screen;
- any global permission question;
- any proposal-only state.

Prototype wiring is visual evidence only and is not used here as a functional acceptance criterion.

## 11. Review gate

Required next step:

1. human visual review of `5786:2202` and the four migrated roots;
2. if approved, extract the batch pattern and migrate T09/T11 remaining states by minimum delta;
3. run screenshots and structural audit on materially different states;
4. update the PR record;
5. merge only after explicit human authorization.

Until that review is complete:

**PENDING HUMAN VISUAL REVIEW — DO NOT MERGE**
