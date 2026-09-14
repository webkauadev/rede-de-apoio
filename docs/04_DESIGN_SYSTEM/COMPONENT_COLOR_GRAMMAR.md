# Component Color Grammar

Status: **CANÔNICO — APROVADO NO PILOTO T03**  
Data: **2026-09-14**

Este documento define a gramática de cor reutilizável dos componentes do produto. O piloto T03 foi aprovado visualmente e, a partir deste gate, as famílias `Feature/*`, `Category/*` e `Status/*` abaixo são regras canônicas para novas migrações. Elas não autorizam mudança funcional nem substituem requisitos.

## Principle

Use esta cadeia para todo componente colorido:

`component → semantic variant → token → value`

Nunca escolher cor porque um componente aparece em determinada tela. A estrutura permanece baseada em surfaces; containers tonais fornecem ênfase; status comunica somente um estado funcional real.

## Base primitive mapping

Os papéis existentes de shadcn/Obra continuam implementando a estrutura genérica:

| Primitive role | Purpose |
|---|---|
| `background` / `foreground` | page and default content |
| `card` / `card-foreground` | neutral card structure |
| `muted` / `muted-foreground` | supporting information |
| `primary` / `primary-foreground` | primary action/emphasis |
| `secondary` / `secondary-foreground` | secondary emphasis |
| `accent` / `accent-foreground` | generic component accent, never a category substitute |
| `destructive`, `border`, `ring` | destructive, boundary and focus roles |

`Feature/*`, `Category/*` e `Status/*` são extensões de domínio. Elas não substituem nem sobrecarregam os papéis primitivos.

## Component contracts

| Component | Semantic property | Binding contract |
|---|---|---|
| `SummaryCard` | `tone=neutral` | Surface / Surface Container + On Surface |
| `SummaryCard` | `tone=primary` | Primary Container + On Primary Container |
| `SummaryCard` | `tone=secondary` | Secondary Container + On Secondary Container |
| `SummaryCard` | `tone=context` | **PENDENTE**: só pode usar Tertiary Container após calibração e aprovação específica do papel |
| `CategoryIcon` | `category` | Category Container background + Category Accent icon |
| `CategoryBadge` | `category` | Category Container background + Category Foreground text |
| `StatusBadge` | `status` | Status Container background + Status Foreground text |
| `CareRecordCard` | `sourceFeature`, `category` | neutral record surface; Feature identifies origin and Category identifies care subject |

## Feature — canonical palette

| Feature | Container | Accent | Foreground |
|---|---:|---:|---:|
| Home | `#D0E9F3` | `#2A6F97` | `#003D59` |
| Agenda | `#E5E9F7` | `#5567A6` | `#35466E` |
| Diary | `#F0E4F1` | `#875985` | `#563751` |
| Health | `#DFF0E9` | `#3E7B68` | `#285244` |

Feature identifica a área/origem do produto. Não usar Feature como sinônimo de status.

## Category — canonical palette

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

Category identifica o assunto do cuidado. A categoria deve ser estável entre telas; não redefinir Hidratação, Medicação etc. tela por tela.

## Status rules

Status é funcional, nunca decorativo.

| Status | Container role | Foreground role |
|---|---|---|
| Scheduled | Status/Scheduled Container `#EEEAF8` | Status/Scheduled Foreground `#5B4A7D` |
| Pending | Warning Surface | Warning |
| Completed | Success Surface | Success |
| Error | Danger Surface | Danger |
| Disabled | Surface | Disabled |

Feature e Category nunca implicam Status. Por exemplo, Mobility verde não significa sucesso e Nutrition âmbar não significa warning.

`Status/Scheduled/*` é uma família dedicada, em vez de alias de Secondary Container. Secondary permanece reservado ao papel da Foundation, incluindo seleção da Navigation Bar.

## Category label redundancy

Quando `itemTitle == categoryLabel`, não renderizar um `CategoryBadge` textual duplicado. Expressar Category por `CategoryIcon`, leading affordance, accent ou tratamento semântico do título existente.

Quando `itemTitle != categoryLabel`, `CategoryBadge` pode ser renderizado normalmente.

## Precedence

Quando um componente carrega mais de um significado, aplicar a prioridade:

1. critical real state;
2. functional status;
3. category;
4. feature/source;
5. neutral structure.

Feature não deve esconder uma Category mais útil. Se houver espaço para apenas uma pista cromática em um registro de cuidado, mostrar Category.

## T03 — exemplo canônico

`Agora` usa `SummaryCard(tone=primary)` porque expressa a condição operacional atual do cuidador. O piloto aprovou:

- `Color/Primary Container` `#D0E9F3` (`VariableID:5700:269`);
- `Color/On Primary Container` `#003D59` (`VariableID:5700:270`).

`Próximo cuidado` permanece neutro e usa `StatusBadge(status=scheduled)` para `Programado`. Como o título já é `Hidratação`, a categoria aparece diretamente no título/leading treatment, sem badge textual duplicado.

`Na rotina` permanece neutro, com `StatusBadge(status=pending)` somente para o estado real pendente.

O registro recente de hidratação permanece estruturalmente neutro: Diary é sua Feature de origem (plum) e Hydration é sua Category (cyan). São significados independentes.

## Materialization and approval

A collection Figma `Rede de Apoio / Semantic` contém 46 variables da gramática:

- 12 `Feature/*`;
- 24 `Category/*`;
- 10 `Status/*`.

Os scopes permanecem limitados a fills/text relevantes, nunca `ALL_SCOPES`.

**Essas famílias foram aprovadas pela revisão humana do piloto T03 em 2026-09-14 e podem ser reutilizadas nas próximas T##.**

Isso não significa usar todas as cores em todas as telas. A regra é reutilizar os papéis quando o componente tiver aquele significado semântico.

## Tertiary remains gated

Os candidatos `Color/Tertiary Container` e `Color/On Tertiary Container` não foram validados pelo piloto T03 e continuam pendentes. Nenhum agente deve promovê-los ou usá-los para `tone=context` apenas para adicionar variedade cromática.

Quando uma futura tela realmente exigir esse papel, calibrar e revisar antes de propagá-lo.

## Agent rule

> **Não escolha a cor na tela. Resolva primeiro o significado do componente e então aplique a família semântica canônica. Reutilize Feature, Category e Status de forma consistente; preserve surfaces neutras para estrutura; não converta cor em decoração.**
