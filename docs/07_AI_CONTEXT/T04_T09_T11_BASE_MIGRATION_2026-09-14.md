# T04 + T09 + T11 — Material 3 Migration

Status: **BASE STATES HUMAN-APPROVED — REMAINING T09/T11 STATES READY FOR HUMAN REVIEW — DO NOT MERGE**  
Date: **2026-09-14**  
Branch: `design/t04-t09-t11-material3-migration`

## 1. Objective

Apply the approved post-T03 migration pattern to the coherent micro-batch:

- T04 — Calendário de Cuidados;
- T09 — Tarefas;
- T11 — Compromissos.

The base states were reviewed and approved by the human reviewer on 2026-09-14. That approval authorized deriving the remaining registered T09/T11 states with the mandatory rule:

`STATE = PAGE BASE + DELTA MÍNIMO`.

No functional scope was expanded.

## 2. Functional scope preserved

### T04 — Calendário de Cuidados

Canonical scope remains tied to:

- RF06, RF07, RF08, RF09, RF10;
- US-008, US-009, US-011, US-012, US-013, US-014.

The existing Week and Day views are preserved. No new scheduling behavior, permission, role, or destination was invented.

### T09 — Tarefas

Canonical scope remains tied to:

- RF21;
- US-024, US-025;
- contextual continuity with US-020 and US-030 where already documented.

No new task behavior was introduced. The remaining states preserve the existing empty, loading, create, validation, created and completed deltas.

### T11 — Compromissos

Canonical scope remains tied to:

- RF20;
- US-023.

No new appointment behavior was introduced. The remaining states preserve the existing empty, loading, create, validation and success deltas.

## 3. Current → migrated Figma nodes

### Base states — human approved

| Screen/state | Current reference | Migrated |
|---|---:|---:|
| T04 / Semana | `5122:1870` | `5771:23011` |
| T04 / Dia | `5122:2031` | `5777:2174` |
| T09 / Default | `5360:348` | `5766:2027` |
| T11 / Default | `5416:937` | `5772:2132` |

Base A/B review board:

- `5786:2202` — `T04 + T09 + T11 — Material 3 Migration Review (NON-CANONICAL)`.

Human decision: **APPROVED**.

### T09 remaining states — derived by minimum delta

| State | Current reference | Migrated |
|---|---:|---:|
| Empty | `5361:419` | `5789:2512` |
| Loading | `5361:475` | `5789:2618` |
| Nova tarefa | `5361:518` | `5789:2720` |
| Validation Error | `5361:601` | `5789:2815` |
| Tarefa criada | `5361:707` | `5789:2913` |
| Tarefa concluída | `5361:741` | `5789:3039` |

Review board:

- `5791:3087` — `T09 — Remaining States Migration Review (NON-CANONICAL)`.

### T11 remaining states — derived by minimum delta

| State | Current reference | Migrated |
|---|---:|---:|
| Empty | `5417:1037` | `5789:3157` |
| Loading | `5417:1099` | `5789:3249` |
| Novo compromisso | `5418:1039` | `5789:3335` |
| Validation Error | `5419:1113` | `5789:3419` |
| Success | `5419:1226` | `5789:3507` |

Review board:

- `5791:3463` — `T11 — Remaining States Migration Review (NON-CANONICAL)`.

All review boards are non-canonical visual review artifacts only.

## 4. Shell and navigation

All migrated states reuse the approved authenticated Root-shell direction established by T03 and approved again in this batch:

- canonical tinted Root Header;
- explicit page/task title in the header;
- context `Clodoaldo Oliveira`;
- Settings action preserved;
- exactly four primary destinations: `Home · Agenda · Diário · Saúde`;
- no `Mais` destination in migrated Navigation Bars.

Active primary navigation:

- T04 → `Agenda`;
- T09 → `Saúde`;
- T11 → `Saúde`.

Local Saúde navigation remains:

- T09 → `Tarefas` active;
- T11 → `Compromissos` active.

## 5. State derivation contract

The remaining states were not redesigned independently.

Each state is the approved Default page shell plus only its registered delta:

### T09

- Empty → empty task surface;
- Loading → task skeletons only;
- Nova tarefa → creation form;
- Validation Error → same form + validation/error feedback;
- Tarefa criada → list delta + success Sonner;
- Tarefa concluída → completion delta + success Sonner.

### T11

- Empty → empty appointment surface;
- Loading → appointment skeletons only;
- Novo compromisso → creation form;
- Validation Error → same form + validation/error feedback;
- Success → list delta + success Sonner.

Header, global navigation, local Saúde taxonomy, margins and semantic color grammar remain stable across states.

## 6. Color grammar

No new global color family was created.

### T04

Uses the existing Agenda roles:

- `Feature/Agenda/Container`;
- `Feature/Agenda/Accent`;
- `Feature/Agenda/Foreground`.

Supporting status roles include `Status/Scheduled/*` and `Status/Disabled/*`.

### T09 / T11

Uses the existing Health roles for local Saúde selection:

- `Feature/Health/Container`;
- `Feature/Health/Foreground`.

Task/appointment state and validation feedback reuse existing semantic roles, including:

- `Status/Pending/*`;
- `Status/Completed/*`;
- `Color/Danger`;
- `Color/On Surface`;
- `Color/On Surface Variant`.

No decorative color was added.

## 7. Layout and ergonomics

The migrated states follow the mobile contract:

- viewport: `390 × 844`;
- content margin: `16 px`;
- useful width: `358 px`;
- Geist typography;
- Root Header: `80 px`;
- primary Navigation Bar: `80 px`;
- click/tap target rule: `>= 48 × 48 px`.

T04 keeps explicit 48 px touch wrappers for Dia, Semana, previous date, next date and Hoje.

Form labels and validation messages in migrated T09/T11 states were normalized to at least `14 px` structural typography. Mini status/meta text may remain at `12 px` when it is not structural hierarchy.

Hover-only component variant interactions are not counted as click/tap target violations.

## 8. Visual review

### Base review

The human reviewer approved the base migration board `5786:2202` and described the result as excellent.

That approval covers the visual language and page-base architecture for this batch.

### Remaining-state review

The derived-state boards are ready for the next human gate:

- T09: `5791:3087`;
- T11: `5791:3463`.

They show `CURRENT` versus `MIGRATED / PAGE BASE + DELTA MÍNIMO` for every remaining registered state.

## 9. Structural audit

After state derivation and semantic normalization:

- `0` detached instances across the remaining states;
- `0` unexplained visible hardcoded semantic colors after normalization;
- `0` structural text below `14 px`;
- `0` click/tap reaction targets below `48 px`;
- intended vertical content scrolling only;
- horizontal local-section scrolling remains intentional where the four Saúde destinations share one row;
- Root shell remains `390 × 844`;
- current/reference screens remain untouched.

The 44 px `E18 — Concluir tarefa` nested reactions that remain are hover-only `CHANGE_TO` interactions of the underlying component and therefore are not tap targets.

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

Prototype wiring is not treated as a source of functional truth.

## 11. Review gate

Current gate:

1. base states — **HUMAN APPROVED**;
2. remaining T09/T11 states — **MIGRATED AND READY FOR HUMAN VISUAL REVIEW**;
3. CI must remain green after this documentation update;
4. merge requires explicit human authorization after the remaining-state review.

Until that final review is complete:

**DO NOT MERGE PR #95.**
