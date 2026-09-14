# Component Color Grammar

Status: **TARGET CANDIDATE — PENDING HUMAN REVIEW**

This document defines the reusable colour grammar for product components. It
does not promote the values below to final design tokens; that decision remains
subject to human review of the T03 pilot.

## Principle

Use this chain for every coloured component:

`component → semantic variant → token → value`

Never choose a colour because of the screen where a component happens to be
used. Structural UI remains neutral; tonal containers provide emphasis; status
colour communicates a real state only.

## Base primitive mapping

The existing shadcn/Obra roles continue to implement generic component
structure:

| Primitive role | Purpose |
|---|---|
| `background` / `foreground` | page and default content |
| `card` / `card-foreground` | neutral card structure |
| `muted` / `muted-foreground` | supporting information |
| `primary` / `primary-foreground` | primary action/emphasis |
| `secondary` / `secondary-foreground` | secondary emphasis |
| `accent` / `accent-foreground` | generic component accent, never a category substitute |
| `destructive`, `border`, `ring` | destructive, boundary and focus roles |

`Feature/*`, `Category/*` and `Status/*` are domain extensions. They do not
replace or overload those primitive roles.

## Component contracts

| Component | Semantic property | Binding contract |
|---|---|---|
| `SummaryCard` | `tone=neutral` | Surface / Surface Container + On Surface |
| `SummaryCard` | `tone=primary` | Primary Container + On Primary Container |
| `SummaryCard` | `tone=secondary` | Secondary Container + On Secondary Container |
| `SummaryCard` | `tone=context` | Tertiary Container + On Tertiary Container |
| `CategoryIcon` | `category` | Category Container background + Category Accent icon |
| `CategoryBadge` | `category` | Category Container background + Category Foreground text |
| `StatusBadge` | `status` | Status Container background + Status Foreground text |
| `CareRecordCard` | `sourceFeature`, `category` | neutral record surface; Feature identifies origin and Category identifies care subject |

## Feature candidates

| Feature | Container | Accent | Foreground |
|---|---:|---:|---:|
| Home | `#D0E9F3` | `#2A6F97` | `#003D59` |
| Agenda | `#E5E9F7` | `#5567A6` | `#35466E` |
| Diary | `#F0E4F1` | `#875985` | `#563751` |
| Health | `#DFF0E9` | `#3E7B68` | `#285244` |

## Category candidates

| Category | Container | Accent | Foreground |
|---|---:|---:|---:|
| Hydration | `#D7EEF7` | `#147A96` | `#0B5268` |
| Medication | `#EEE3F7` | `#7A4D91` | `#5C376E` |
| Nutrition | `#FFF0D6` | `#A06A00` | `#63450C` |
| Mobility | `#E2F1E7` | `#4A7C59` | `#2F573D` |
| Hygiene | `#F9E5ED` | `#A45878` | `#68394D` |
| Sleep | `#E7E9F8` | `#5965A3` | `#3F486C` |
| Appointment | `#E5EBF6` | `#4F6F9C` | `#344E72` |
| General | `#EEF1F3` | `#60717B` | `#3C4B54` |

## Status rules

Status is functional, never decorative. The T03 candidate mappings expose
existing semantic roles through `Status/*` variables:

| Status | Container role | Foreground role |
|---|---|---|
| Scheduled | Secondary Container | On Secondary Container |
| Pending | Warning Surface | Warning |
| Completed | Success Surface | Success |
| Error | Danger Surface | Danger |
| Disabled | Surface | Disabled |

Feature and Category colour never imply a Status. For example, Mobility green
is not success and Nutrition amber is not warning.

## Precedence

When a component carries multiple meanings, apply the highest applicable
meaning first:

1. critical real state;
2. functional status;
3. category;
4. feature/source;
5. neutral structure.

Feature must not hide a more useful Category. If there is room for only one
coloured cue on a care record, show Category.

## T03 pilot example

`Agora` is a `SummaryCard(tone=primary)` because it expresses the caregiver's
current operational condition. `Próximo cuidado` remains neutral, with
`StatusBadge(status=scheduled)` for Programado and
`CategoryBadge(category=hydration)` for Hidratação. `Na rotina` remains
neutral, with `StatusBadge(status=pending)` only for the real pending state.
The recent hydration record remains neutral: Diary is its source Feature
(plum icon) while Hydration is its Category (cyan badge). These are independent
meanings.

## Candidate materialization and approval gate

The Figma collection `Rede de Apoio / Semantic` contains 46 variables created
for this pilot: 12 `Feature/*`, 24 `Category/*`, and 10 `Status/*`. Their
scopes are limited to relevant fill/text use, never `ALL_SCOPES`. They are
**TARGET CANDIDATE — PENDING HUMAN REVIEW** and must not be copied to other
T## screens or promoted into `DESIGN_TOKENS.md` until the human visual review
approves the T03 pilot.
