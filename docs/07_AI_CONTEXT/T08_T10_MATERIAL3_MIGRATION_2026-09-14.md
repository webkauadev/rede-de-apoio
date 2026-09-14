# T08 + T10 — Material 3 migration — 2026-09-14

## Status

**MIGRATED — PENDING HUMAN REVIEW / PR REVIEW**

Branch: `design/t08-t10-material3-migration`

This document records the visual migration of T08 and T10. It does not approve new functional scope, alter permissions, resolve open functional gates, or close prototype-integrity defects.

## Authority and scope

The migration follows the canonical project order:

`approved GitHub requirements → Material 3 role/pattern → Rede de Apoio semantic token → Obra/shadcn/local primitive → screen`

The state rule remains:

`STATE = PAGE BASE + DELTA MÍNIMO`

Functional scope preserved:

- T08: RF14–RF17 / US-017–US-020, including E14 where applicable.
- T10: RF19 + RF23 / US-022 + US-027, including E19 and contextual E10.
- RF23 remains contextual. This migration does not create a top-level Documents area.

The T08/T10 baseline gate was explicitly authorized in the project chat before state propagation. This authorization did not authorize final merge.

## T08 migrated states

| State | Current node | Migrated node |
| --- | --- | --- |
| List | `5235:924` | `5850:2696` |
| Empty | `5118:838` | `5865:1014` |
| Create | `5123:1291` | `5866:1100` |
| Create error — name | `5130:4159` | `5866:26583` |
| Create error — concentration | `5130:4204` | `5866:26607` |
| Create error — form | `5130:4263` | `5866:26631` |
| Created | `5141:2758` | `5865:1051` |

T08 root/list states reuse:

- approved tinted Root Header;
- `LocalSubnav / Saúde`, `Medicamentos` active (`5810:968`);
- four-destination `NavigationBar / Primary`, Saúde active.

T08 create/validation states use the canonical `AppHeader / Back` and do not carry the primary NavigationBar into the nested form.

## T10 migrated states

| State | Current node | Migrated node |
| --- | --- | --- |
| Default | `5321:411` | `5857:2744` |
| Empty | `5323:489` | `5866:26673` |
| Loading | `5323:558` | `5866:26692` |
| Success | `5323:627` | `5866:26711` |
| New record | `5323:696` | `5868:1239` |
| Validation error | `5323:855` | `5868:26715` |
| Attachment context | `5323:885` | `5868:26730` |

T10 root/list states reuse:

- approved tinted Root Header;
- `LocalSubnav / Saúde`, `Consultas` active (`5810:992`);
- four-destination `NavigationBar / Primary`, Saúde active.

T10 form/validation/attachment states use the canonical `AppHeader / Back`. The attachment state reuses the existing Obra `Attachment Card Horizontal - Nova` instance rather than recreating or detaching it.

## Visual and structural decisions

- `Mais` and the old five-item `compFooter` are absent from all migrated targets.
- The legacy notification/avatar header is not used as a target shell.
- Root states keep Health local navigation immediately below the Root Header.
- Nested form states use Back Header and do not duplicate primary navigation.
- Success states are expressed as minimal semantic feedback deltas rather than replacing the whole page with an unrelated full-screen confirmation.
- Empty and loading states preserve the same shell and route context as their base page.
- Validation states change only the affected field and helper feedback.
- Controls used as primary actions are 48 px high.
- Structural custom text is at least 14 px. File metadata at 12 px belongs to the linked Obra attachment component and is not structural page text.

## Final Figma audit

Final structural audit on all 14 migrated frames returned:

- `0` missing target frames;
- `0` wrong owner-page roots after final correction;
- `0` roots with wrong `390 × 844` viewport size;
- `0` legacy `compFooter` / old notification header residues;
- `0` detached instances;
- `0` structural custom text below 14 px;
- `0` clipped child overflow violations;
- `0` custom solid semantic fills/strokes left unbound outside linked library instances.

Final screenshots were inspected for every materially different state. During QA, two visual regressions were found and corrected before registry update:

1. T08 validation helpers were initially clipped by fixed-height field wrappers; the affected fields now auto-size and show border + helper feedback.
2. T10 Empty initially wrapped its heading into the supporting text; the heading box was resized and revalidated.

A final cross-page ownership verification also found that ten derived T08/T10 frames had accidentally been parented to the `siteMap` page while keeping owner-page coordinates. Before the final gate they were moved atomically to the canonical owner page `Henrique`, with every existing node ID preserved. The complete set of 14 migrated states was then arranged into contiguous T08/T10 review rows and re-audited. The post-correction audit returned `wrongParent=0` and did not introduce any detached instance, color-token, typography, shell, size, or LocalSubnav regression.

Representative post-correction screenshots were directly reviewed for T08 `Create Error Form` / `Created` and T10 `Validation Error` / `Attachment Context`.

## Prototype-integrity protections

The migration does **not** resolve or close issue `#84`.

- FI-001 remains tracked for the old T08 Empty legacy navigation.
- FI-002 remains tracked for the old T10 Empty wrong cross-feature navigation.
- FI-003 remains tracked for the old T10 Loading wrong cross-feature navigation.
- FI-004 remains tracked for the old T10 Success wrong cross-feature navigation.

The migrated visual frames do not copy those defective reactions and must not be interpreted as a silent functional resolution. Intended navigation continues to be governed by GitHub requirements and explicit product decisions.

## Human gate

All migrated nodes remain candidates while this branch/PR is open. Human approval and explicit merge authorization are still required before the migration becomes canonical in `main`.
