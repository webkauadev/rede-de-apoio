# LocalSubnav Foundation Promotion — 2026-09-14

Status: **FOUNDATION MATERIALIZED — READY FOR HUMAN REVIEW — DO NOT MERGE THIS PR WITHOUT EXPLICIT AUTHORIZATION**

Branch: `design/local-subnav-foundation`

## Objective

Promote the human-approved Saúde local-subnavigation pattern from T09/T11 into one reusable Figma Foundation component so future screen migrations do not redraw or reinterpret the submenu.

## Canonical architecture

For Root screens that have sibling destinations inside the active primary section:

`AppHeader / Root → LocalSubnav / Tabs → Scroll Content → NavigationBar / Primary`

For secondary management screens that form an internal sibling pair, the same navigation role may appear under `AppHeader / Back` without primary bottom navigation.

The bottom Navigation Bar remains global app navigation.

The LocalSubnav remains section-local navigation and must not be placed near the bottom Navigation Bar.

## Material 3 role

The visual role is equivalent to Material 3 primary tabs at the top of the content pane.

Saúde uses a scrollable-tabs treatment because the labels do not fit comfortably as four equal fixed tabs in a 390 px viewport.

Two-label families such as Diário/Histórico and Preferências/Auditoria use fixed tabs because the labels fit comfortably as equal destinations.

The hide-on-down / reveal-on-up behavior remains a Rede de Apoio shell/runtime adaptation inspired by M3 `enterAlwaysScrollBehavior`. It is **not** represented as a LocalSubnav component variant and is not a separate page state.

## Figma Foundation

Design Foundation section:

- `5808:957` — `10 — Local Subnavigation`

### Saúde — scrollable tabs

Reusable component set:

- `5810:1005` — `Rede de Apoio / Foundation / LocalSubnav / Saúde`

Variants:

- `5810:968` — `Active=Medicamentos`
- `5810:980` — `Active=Tarefas`
- `5810:992` — `Active=Consultas`
- `5810:1004` — `Active=Compromissos`

Component property:

`Active = Medicamentos | Tarefas | Consultas | Compromissos`

Shell example:

- `5811:986` — `AppShell / Root + LocalSubnav / Saúde — Example`

### Diário — fixed tabs

Reusable component set:

- `5830:358` — `Rede de Apoio / Foundation / LocalSubnav / Diário`

Variants:

- `5830:357` — `Active=Diário`
- `5830:348` — `Active=Histórico`

Applicable routes: T06 and T07.

### Controle e Privacidade — fixed tabs

After the T16/T17 baseline gate was explicitly approved, the approved pilot was promoted to:

- `5912:1699` — `Rede de Apoio / Foundation / LocalSubnav / Controle e Privacidade`

Variants:

- `5912:1677` — `Active=Preferências`
- `5912:1698` — `Active=Auditoria`

Component property:

`Active = Preferências | Auditoria`

Applicable routes: T16 and T17. The component is part of the T16/T17 migration PR and remains a migration candidate until that PR is explicitly approved and merged.

## Component contract

- viewport: `390 × 56`;
- tabs are one horizontal row;
- tab target height: `56 px`;
- use scrollable tabs when the destination labels do not fit comfortably as fixed equal tabs;
- use fixed tabs for small sibling sets whose labels fit comfortably;
- active destination remains visible;
- active selection uses label + bottom indicator, not color alone;
- no pills/cards per destination;
- no new color family;
- the component itself is stateless except for `Active`;
- hide/reveal belongs to shell/runtime behavior.

## Semantic bindings

The Saúde master reuses the existing semantic roles already validated in the T09/T11 pilot:

- `Color/Surface`;
- `Color/On Surface Variant`;
- `Feature/Health/Foreground`;
- `Feature/Health/Accent`;
- `Color/Border Subtle`.

The fixed-tab families reuse the corresponding approved semantic roles for active/inactive content and indicator without introducing a new color family.

No new design token was created for the T16/T17 promotion.

## Reuse rule

Future Saúde screens with this sibling-destination taxonomy must instantiate `5810:1005` and change only the `Active` variant.

T06/T07 use `5830:358`; T16/T17 use `5912:1699` while that migration candidate is under review and after merge becomes the canonical reusable master.

Do not recreate a local tab row per screen.

Do not detach the component merely to change the selected destination.

Do not create an `Expanded/Collapsed` variant to model scroll direction. Runtime/shell behavior owns that transition.

## Scope distinction

This Foundation component applies to sibling destinations in one section or one secondary-management pair.

It does not apply to:

- T04 `Dia / Semana`;
- filters;
- chips;
- sort controls;
- segmented view-mode controls.

Those controls remain page-local interaction patterns.

## Immediate migration guidance

T09 and T11 remain the original visual proof of the scrollable pattern.

T07 validates the two-destination fixed-tab treatment. T16/T17 extend that approved fixed-tab grammar to the secondary-management pair `Preferências | Auditoria`.

Future T08/T10 Saúde work should reuse the Saúde master when the canonical screen taxonomy confirms those routes as `Medicamentos` and `Consultas` respectively. Do not infer route semantics from the component alone; GitHub requirements/registries remain functional truth.

For every state of a screen:

`STATE = PAGE BASE + DELTA MÍNIMO`

The LocalSubnav position and variant remain part of the page base unless the route itself changes.

## QA

Validated visually in the Foundation section and migrated screens.

Validated component-set structure:

- Saúde: four `Active` variants, each `390 × 56`;
- Diário: two fixed variants, each `390 × 56`;
- Controle e Privacidade: two fixed variants, each `390 × 56`;
- active indicators remain visible and semantically bound;
- semantic variables resolve to existing Rede de Apoio tokens;
- no additional token collection introduced.

## Protected scope

These promotions do not change functional requirements, permissions, pending items, RF30/US-036, FI-001–FI-008, or prototype wiring requirements.

They only promote already approved navigation patterns into reusable visual infrastructure.
