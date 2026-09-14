# LocalSubnav Foundation Promotion — 2026-09-14

Status: **FOUNDATION MATERIALIZED — READY FOR HUMAN REVIEW — DO NOT MERGE THIS PR WITHOUT EXPLICIT AUTHORIZATION**

Branch: `design/local-subnav-foundation`

## Objective

Promote the human-approved Saúde local-subnavigation pattern from T09/T11 into one reusable Figma Foundation component so future screen migrations do not redraw or reinterpret the submenu.

## Canonical architecture

For Root screens that have sibling destinations inside the active primary section:

`AppHeader / Root → LocalSubnav / Tabs → Scroll Content → NavigationBar / Primary`

The bottom Navigation Bar remains global app navigation.

The LocalSubnav remains section-local navigation and must not be placed near the bottom Navigation Bar.

## Material 3 role

The visual role is equivalent to Material 3 primary tabs at the top of the content pane.

Saúde uses a scrollable-tabs treatment because the labels do not fit comfortably as four equal fixed tabs in a 390 px viewport.

The hide-on-down / reveal-on-up behavior remains a Rede de Apoio shell/runtime adaptation inspired by M3 `enterAlwaysScrollBehavior`. It is **not** represented as a LocalSubnav component variant and is not a separate page state.

## Figma Foundation

Design Foundation section:

- `5808:957` — `10 — Local Subnavigation`

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

## Component contract

- viewport: `390 × 56`;
- tabs are one horizontal row;
- tab target height: `56 px`;
- horizontal overflow is intentional;
- active destination remains visible;
- active selection uses label + bottom indicator, not color alone;
- no pills/cards per destination;
- no new color family;
- the component itself is stateless except for `Active`;
- hide/reveal belongs to shell/runtime behavior.

## Semantic bindings

The promoted master reuses the existing semantic roles already validated in the T09/T11 pilot:

- `Color/Surface`;
- `Color/On Surface Variant`;
- `Feature/Health/Foreground`;
- `Feature/Health/Accent`;
- `Color/Border Subtle`.

No new design token was created.

## Reuse rule

Future Saúde screens with this sibling-destination taxonomy must instantiate `5810:1005` and change only the `Active` variant.

Do not recreate a local tab row per screen.

Do not detach the component merely to change the selected destination.

Do not create an `Expanded/Collapsed` variant to model scroll direction. Runtime/shell behavior owns that transition.

## Scope distinction

This Foundation component applies to sibling destinations in one section.

It does not apply to:

- T04 `Dia / Semana`;
- filters;
- chips;
- sort controls;
- segmented view-mode controls.

Those controls remain page-local interaction patterns.

## Immediate migration guidance

T09 and T11 remain the visual proof of the pattern.

Future T08/T10 Saúde work should reuse the master when the canonical screen taxonomy confirms those routes as `Medicamentos` and `Consultas` respectively. Do not infer route semantics from the component alone; GitHub requirements/registries remain functional truth.

For every state of a screen:

`STATE = PAGE BASE + DELTA MÍNIMO`

The LocalSubnav position and variant remain part of the page base unless the route itself changes.

## QA

Validated visually in the Foundation section and shell example.

Validated component-set structure:

- four `Active` variants;
- each variant `390 × 56`;
- `Compromissos` variant uses an intentional horizontal-strip offset to keep the active destination visible;
- semantic variables resolve to existing Rede de Apoio tokens;
- no additional token collection introduced.

## Protected scope

This promotion does not change functional requirements, permissions, pending items, RF30/US-036, FI-001–FI-008, or prototype wiring requirements.

It only promotes an already approved navigation pattern into reusable visual infrastructure.
