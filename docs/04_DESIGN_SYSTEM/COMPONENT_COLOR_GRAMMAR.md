# Component Color Grammar

Status: **CANÔNICO — APROVADO NO PILOTO T03 E ESTENDIDO NO LOTE T05/T07**  
Data: **2026-09-14**

Este documento define a gramática de cor reutilizável dos componentes do produto. O piloto T03 foi aprovado visualmente e as famílias `Feature/*`, `Category/*` e `Status/*` abaixo são regras canônicas para novas migrações. O lote T05/T07 acrescentou, sem criar paleta bruta nova, os papéis `Delayed` e `Corrected`. Estas regras não autorizam mudança funcional nem substituem requisitos.

## Principle

Use esta cadeia para todo componente colorido:

`component → semantic variant → token → value`

Nunca escolher cor porque um componente aparece em determinada tela. A estrutura permanece baseada em surfaces; containers tonais fornecem ênfase; status comunica somente um estado funcional real.

**Regra de equivalência:** mesmo papel visual/semântico = mesmo token canônico, independentemente da tela ou do estado. Uma instância clonada não pode manter overrides cromáticos antigos quando o mesmo componente já possui contrato semântico aprovado.

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

Quando um primitive Obra/shadcn é reutilizado no produto, seus paints podem ser semanticamente rebindados na instância quando o componente do produto exigir um papel canônico mais específico. Isso não autoriza detach nem recriação da primitive.

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
| `CareRecordCard` | `sourceFeature`, `category`, `status?` | neutral record surface; Feature identifica origem; Category identifica assunto; Status só aparece quando houver estado funcional real |
| `OutlineAction` | neutral action | `Color/Surface` + `Color/Border Subtle` quando não for input/controle interativo delimitado por contraste obrigatório |

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

### Regra explícita de Medicação

Qualquer `CategoryBadge`, `CategoryIcon` ou tratamento categórico cujo assunto seja **Medicação** deve usar `Category/Medication/*` em todas as telas e estados.

Não usar verde de Saúde, amarelo de Warning ou outra Feature para representar Medicação. Feature e Category são eixos independentes.

## Status rules

Status é funcional, nunca decorativo.

| Status | Container role | Foreground role | Uso |
|---|---|---|---|
| Scheduled | `Status/Scheduled/Container` `#EEEAF8` | `Status/Scheduled/Foreground` `#5B4A7D` | item programado/futuro |
| Pending | `Status/Pending/Container` → Warning Surface | `Status/Pending/Foreground` → Warning | pendência real |
| Completed | `Status/Completed/Container` → Success Surface | `Status/Completed/Foreground` → Success | conclusão real |
| Delayed | `Status/Delayed/Container` → Warning Surface | `Status/Delayed/Foreground` → Warning | atraso operacional; **não é destructive** |
| Corrected | `Status/Corrected/Container` → Surface Container | `Status/Corrected/Foreground` → On Surface Variant | registro histórico substituído/corrigido; neutro |
| Error | Danger Surface | Danger | erro/destrutivo real |
| Disabled | Surface | Disabled | indisponibilidade semântica |

Feature e Category nunca implicam Status. Por exemplo, Mobility verde não significa sucesso e Nutrition âmbar não significa warning.

`Status/Scheduled/*` é uma família dedicada, em vez de alias de Secondary Container. Secondary permanece reservado ao papel da Foundation, incluindo seleção da Navigation Bar.

### Delayed

`Atrasado` comunica atraso, não destruição, falha irreversível ou erro crítico. Portanto:

- usar `Status/Delayed/*`;
- não usar `Destructive`/Danger apenas porque o estado exige atenção;
- manter a Category do item independente do status. Ex.: `Medicação` continua violeta enquanto `Atrasado` usa warning tonal.

### Corrected

`Corrigido` comunica histórico/versionamento, não sucesso, warning ou erro. Portanto:

- usar `Status/Corrected/*`;
- manter tratamento visual neutro e secundário;
- não usar amarelo/Pending;
- não usar verde/Completed;
- não usar `Feature/Diary/*` como se fosse status.

Links/vínculos que pertencem ao contexto Diário podem continuar usando `Feature/Diary/Foreground` ou Accent; isso não muda o status do registro.

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

A precedência não significa substituir todos os sinais cromáticos pelo primeiro item. Um `CareRecordCard` pode ter superfície neutra, Category violeta para Medicação e um `StatusBadge` neutro para Corrigido simultaneamente, desde que cada cor esteja presa ao seu papel.

## T03 — exemplo canônico

`Agora` usa `SummaryCard(tone=primary)` porque expressa a condição operacional atual do cuidador. O piloto aprovou:

- `Color/Primary Container` `#D0E9F3` (`VariableID:5700:269`);
- `Color/On Primary Container` `#003D59` (`VariableID:5700:270`).

`Próximo cuidado` permanece neutro e usa `StatusBadge(status=scheduled)` para `Programado`. Como o título já é `Hidratação`, a categoria aparece diretamente no título/leading treatment, sem badge textual duplicado.

`Na rotina` permanece neutro, com `StatusBadge(status=pending)` somente para o estado real pendente.

O registro recente de hidratação permanece estruturalmente neutro: Diary é sua Feature de origem (plum) e Hydration é sua Category (cyan). São significados independentes.

## T05/T07 — extensão canônica

O lote T05/T07 materializou e auditou os papéis que faltavam:

- T05 `Atraso`: `Status/Delayed/*` com Warning tonal, mantendo a categoria independente;
- T05/T07 `Corrigido`: `Status/Corrected/*` neutro;
- T07 `Medicação`: `Category/Medication/*` em Default, Detalhe, Correção, Correção concluída, Exportando e Exportação concluída;
- `CareRecordCard`: Surface + Border Subtle, Category do assunto e Status apenas quando aplicável;
- botão `Exportar histórico em CSV`: mesma Surface/Border Subtle em todos os estados; `Show spinner` é delta de Exportando, não uma nova cor.

Regra extraída do lote:

> **Clonar um estado não autoriza clonar sua gramática antiga de cor. O estado herda a página-base e reaplica os contratos semânticos canônicos aos componentes equivalentes.**

## Materialization and approval

A collection Figma `Rede de Apoio / Semantic` contém agora **50 variables** da gramática de domínio:

- 12 `Feature/*`;
- 24 `Category/*`;
- 14 `Status/*`.

Os quatro papéis acrescentados no lote T05/T07 são:

- `Status/Delayed/Container` — `VariableID:5835:341`;
- `Status/Delayed/Foreground` — `VariableID:5835:342`;
- `Status/Corrected/Container` — `VariableID:5835:343`;
- `Status/Corrected/Foreground` — `VariableID:5835:344`.

Os scopes permanecem limitados a fills/text relevantes, nunca `ALL_SCOPES`.

As famílias-base foram aprovadas pela revisão humana do piloto T03 em 2026-09-14. A extensão Delayed/Corrected foi materializada no lote T05/T07 após aprovação estrutural humana e está registrada no PR de migração para revisão final do conjunto de estados.

Isso não significa usar todas as cores em todas as telas. A regra é reutilizar os papéis quando o componente tiver aquele significado semântico.

## Tertiary remains gated

Os candidatos `Color/Tertiary Container` e `Color/On Tertiary Container` não foram validados pelo piloto T03 e continuam pendentes. Nenhum agente deve promovê-los ou usá-los para `tone=context` apenas para adicionar variedade cromática.

Quando uma futura tela realmente exigir esse papel, calibrar e revisar antes de propagá-lo.

## Agent rule

> **Não escolha a cor na tela. Resolva primeiro o significado do componente e então aplique a família semântica canônica. Reutilize Feature, Category e Status de forma consistente; preserve surfaces neutras para estrutura; não converta cor em decoração. Mesmo papel = mesmo token em qualquer tela.**
