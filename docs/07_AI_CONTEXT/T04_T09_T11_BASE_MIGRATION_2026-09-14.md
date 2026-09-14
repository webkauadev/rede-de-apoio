# T04 + T09 + T11 — Material 3 Migration

Status: **LOCAL SUBNAVIGATION READY FOR HUMAN VISUAL REVIEW — DO NOT MERGE**  
Date: **2026-09-14**  
Branch: `design/t04-t09-t11-material3-migration`

## 1. Objective

Apply the approved post-T03 migration pattern to the coherent micro-batch T04 + T09 + T11 without expanding functional scope.

`STATE = PAGE BASE + DELTA MÍNIMO` remains mandatory.

## 2. Human-approved base direction

The first visual gate approved the base candidates as excellent:

- T04 / Semana `5771:23011`;
- T04 / Dia `5777:2174`;
- T09 / Default `5766:2027`;
- T11 / Default `5772:2132`.

The visual system remains:

- canonical tinted Root Header;
- four global destinations only: `Home · Agenda · Diário · Saúde`;
- T04 active global destination = Agenda;
- T09/T11 active global destination = Saúde;
- semantic Feature/Status color grammar;
- 390×844 viewport;
- >=48 px click/tap targets;
- structural text >=14 px.

## 3. Registered migrated states

### T04

- Semana `5771:23011`
- Dia `5777:2174`

T04 `Dia / Semana` is a view-mode control, not LocalSubnav.

### T09 — Tarefas

- Default `5766:2027`
- Empty `5789:2512`
- Loading `5789:2618`
- Nova tarefa `5789:2720`
- Validation Error `5789:2815`
- Tarefa criada `5789:2913`
- Tarefa concluída `5789:3039`

### T11 — Compromissos

- Default `5772:2132`
- Empty `5789:3157`
- Loading `5789:3249`
- Novo compromisso `5789:3335`
- Validation Error `5789:3419`
- Success `5789:3507`

## 4. Human feedback — LocalSubnav supersedes the previous bottom placement

After the base approval, human review identified that the Saúde sibling destinations should not remain at the end of page content near the global bottom navigation.

Canonical hierarchy is now:

`AppHeader / Root → LocalSubnav / Tabs → Scroll Content → NavigationBar / Primary`

Local Saúde destinations:

`Medicamentos · Tarefas · Consultas · Compromissos`

This decision is canonicalized in:

- `docs/04_DESIGN_SYSTEM/LOCAL_SUBNAVIGATION_PATTERN.md`
- `docs/04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md`
- `docs/04_DESIGN_SYSTEM/DESIGN_SYSTEM.md`

Material 3 basis:

- primary tabs belong at the top of the content pane under the top app bar;
- scrollable primary tabs are appropriate when labels cannot fit comfortably;
- the project's hide-on-down / reveal-on-up behavior is a controlled adaptation inspired by Material 3 `enterAlwaysScrollBehavior`, not a claim that Material 3 provides a stock `TabRow + enterAlways` component.

## 5. Figma LocalSubnav materialization

All migrated T09/T11 states now place LocalSubnav directly below the 80 px Root Header.

Expanded state contract:

- Header y=0, h=80;
- LocalSubnav y=80, h=56;
- Scroll Content y=136, h=628;
- global NavigationBar y=764, h=80.

Visual rules:

- Surface structural row;
- one line;
- horizontal scrolling;
- no individual pill/card containers;
- active tab has semantic Health text + bottom indicator;
- inactive tabs use On Surface Variant;
- subtle bottom divider;
- 56 px tab hit height.

T09 keeps `Tarefas` selected.  
T11 keeps `Compromissos` selected.

## 6. Scroll motion contract

- at top: LocalSubnav visible;
- scroll down: LocalSubnav retracts and content reclaims the 56 px;
- scroll up: LocalSubnav returns immediately;
- bottom NavigationBar remains fixed;
- selection and horizontal strip position are preserved.

Figma cannot reproduce the runtime nested-scroll direction trigger faithfully. The behavior is therefore documented and represented by a static non-canonical motion-contract board rather than a fake functional prototype.

Review board:

- `5801:4193` — `LocalSubnav — enterAlways Motion Contract Review (NON-CANONICAL)`.

The previous remaining-state boards:

- `5791:3087`
- `5791:3463`

are explicitly renamed `SUPERSEDED — pre LocalSubnav` and must not be used as current visual truth.

Detailed application record:

- `docs/07_AI_CONTEXT/T04_T09_T11_LOCAL_SUBNAVIGATION_2026-09-14.md`

## 7. Structural audit after LocalSubnav migration

Across the migrated T09/T11 roots:

- 0 detached instances;
- 0 structural text below 14 px;
- 0 click/tap reaction targets below 48 px;
- LocalSubnav = 56 px high;
- global NavigationBar remains at y=764;
- expected horizontal overflow only on LocalSubnav;
- LocalSubnav semantic fills/text/indicator/divider are variable-bound.

Any residual component-internal styling in reused Button/Badge instances predates this LocalSubnav change and is not a new navigation color decision.

## 8. Functional scope preserved

T04 retains RF06–RF10 and US-008/009/011/012/013/014 scope.  
T09 retains RF21 / US-024/025 and documented contextual continuity.  
T11 retains RF20 / US-023.

No new scheduling, task, appointment, permission or role behavior was introduced.

## 9. Protected scope

Unchanged:

- P01;
- P03;
- P04;
- P05;
- P06;
- RF30;
- US-036;
- FI-001–FI-008;
- unrelated T## screens;
- global permission questions;
- proposal-only states.

## 10. Review gate

Current gate:

1. human visual review of T09 Default `5766:2027`, T11 Default `5772:2132` and motion-contract board `5801:4193`;
2. if approved, promote `LocalSubnav / Tabs` from architectural rule + pilot materialization to a reusable Foundation component;
3. refresh final review artifacts/registries if necessary;
4. merge PR #95 only after explicit authorization.

**LOCAL SUBNAVIGATION READY FOR HUMAN VISUAL REVIEW — DO NOT MERGE**
