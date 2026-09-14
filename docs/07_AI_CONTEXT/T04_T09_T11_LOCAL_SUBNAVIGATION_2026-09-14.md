# T09 + T11 — Saúde Local Subnavigation Migration

Date: **2026-09-14**  
Branch: `design/t04-t09-t11-material3-migration`  
PR: `#95`  
Status: **READY FOR HUMAN VISUAL REVIEW — DO NOT MERGE**

## Human feedback incorporated

The local Saúde navigation must not live at the bottom of the page content near the global bottom Navigation Bar.

Canonical hierarchy is now:

`AppHeader / Root → LocalSubnav / Tabs → Scroll Content → NavigationBar / Primary`

Global navigation remains:

`Home · Agenda · Diário · Saúde`

Local Saúde navigation remains:

`Medicamentos · Tarefas · Consultas · Compromissos`

## Material 3 basis

Official Material 3 Compose guidance states that primary tabs are placed at the top of the content pane under a top app bar and that scrollable primary tabs should be used when the set cannot fit comfortably on screen.

Official references:

- https://developer.android.com/develop/ui/compose/components/tabs
- https://developer.android.com/reference/kotlin/androidx/compose/material3/PrimaryScrollableTabRow.composable
- https://developer.android.com/reference/kotlin/androidx/compose/material3/TopAppBarDefaults

The Rede de Apoio hide-on-down / reveal-on-up behavior is a controlled adaptation inspired by Material 3 `enterAlwaysScrollBehavior`. Material 3 defines `enterAlways` for Top App Bars; it does not define a single stock `PrimaryTabRow + enterAlways` component. Do not misrepresent this project adaptation as an official tab behavior.

Canonical design rule:

- `docs/04_DESIGN_SYSTEM/LOCAL_SUBNAVIGATION_PATTERN.md`

## Applied Figma hierarchy

### T09 — Tarefas

All migrated states now use LocalSubnav immediately below the header with `Tarefas` selected:

- Default `5766:2027`
- Empty `5789:2512`
- Loading `5789:2618`
- Nova tarefa `5789:2720`
- Validation Error `5789:2815`
- Tarefa criada `5789:2913`
- Tarefa concluída `5789:3039`

### T11 — Compromissos

All migrated states now use LocalSubnav immediately below the header with `Compromissos` selected:

- Default `5772:2132`
- Empty `5789:3157`
- Loading `5789:3249`
- Novo compromisso `5789:3335`
- Validation Error `5789:3419`
- Success `5789:3507`

## Layout contract materialized

Expanded/top state:

- AppHeader: y=0, h=80
- LocalSubnav: y=80, h=56
- Scroll Content: y=136, h=628
- Primary NavigationBar: y=764, h=80

LocalSubnav:

- surface-based structural row;
- one line only;
- horizontal scrolling;
- inactive text uses `Color/On Surface Variant`;
- active text uses `Feature/Health/Foreground`;
- active indicator uses `Feature/Health/Accent`;
- subtle semantic divider;
- no per-item pill/card containers;
- tab targets are 56 px high.

## Scroll behavior contract

At top:

- LocalSubnav visible.

Scrolling down:

- LocalSubnav retracts and gives its 56 px back to content.

Scrolling up:

- LocalSubnav returns immediately without requiring the user to reach the top.

This behavior is documented for implementation. Figma does not provide the same nested-scroll direction trigger as the runtime Material 3 API, so the behavior is represented by a non-canonical static motion-contract board rather than falsely presented as a functional prototype.

Motion contract review board:

- `5801:4193` — `LocalSubnav — enterAlways Motion Contract Review (NON-CANONICAL)`

The previous remaining-state review boards are explicitly marked `SUPERSEDED — pre LocalSubnav` because their snapshots froze the older bottom-of-content placement.

## Distinction preserved

T04 `Dia / Semana` is **not** LocalSubnav. It is a view-mode control inside the same calendar screen and remains governed by its own segmented/temporal control semantics.

## Structural audit after migration

Across all migrated T09/T11 roots:

- 0 detached instances;
- 0 structural text below 14 px;
- 0 click/tap reaction targets below 48 px;
- LocalSubnav height = 56 px;
- content begins at y=136 when LocalSubnav is expanded;
- global NavigationBar remains fixed at y=764;
- horizontal overflow exists only where expected for the scrollable local tab strip;
- local submenu uses semantic bindings rather than new hardcoded colors.

Existing component-internal styling inside reused Button/Badge instances is not reinterpreted as a new LocalSubnav color decision.

## Protected scope

This change does not resolve or alter:

- P01, P03, P04, P05, P06;
- RF30 / US-036;
- FI-001–FI-008;
- unrelated T## screens;
- permissions;
- proposal-only states.

## Next gate

Human visual review must approve the LocalSubnav materialization before it is extracted/promoted as a reusable Foundation component.

Do not merge PR #95 before that review and explicit merge authorization.
