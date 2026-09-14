# Design Tokens

Versão 4. Substitui a versão anterior.
Motivo da revisão: registra os papéis `Status/Delayed/*` e `Status/Corrected/*`, a promoção do LocalSubnav Diário e a normalização de scopes/uso semântico validada no lote T05/T07 em 2026-09-14.

Fonte oficial de tokens. `05_FIGMA` referencia, não redefine.

---

## Cor — base

| Token | Valor | Uso |
|---|---|---|
| `color-background` | `#FBF8FF` | fundo da tela |
| `color-surface` | `#FFFFFF` | cards, sheets, campos |
| `color-primary` | `#00567C` | ação principal, texto de destaque |
| `color-brand` | `#2A6F97` | apoio de marca, links |

Contraste verificado: `primary` 8.01:1 sobre surface e 7.62:1 sobre background.
`brand` 5.50:1 e 5.23:1. Ambos aprovados em AA.

## Cor — texto

| Token | Valor | Contraste sobre surface |
|---|---|---|
| `color-text-primary` | `#12222B` | 15.9:1 |
| `color-text-secondary` | `#4A5A66` | 7.13:1 |
| `color-text-on-primary` | `#FFFFFF` | 8.01:1 sobre primary |

## Cor — borda (revisado)

| Token | Valor | Uso | Contraste |
|---|---|---|---|
| `color-border-subtle` | `#E5E5E5` | divisores decorativos e limites neutros de cards não dependentes de contraste | 1.26:1 — fora do escopo de 1.4.11 quando puramente decorativo |
| `color-border-interactive` | `#6E8496` | inputs, campos e controles em que a própria borda comunica affordance | 3.89:1 sobre surface / 3.70:1 sobre background |

`color-border-subtle` não pode substituir `color-border-interactive` em inputs/campos cuja identificação dependa da borda.

## Cor — semântica de estado

| Token | Valor | Superfície | Contraste |
|---|---|---|---|
| `color-danger` | `#B3261E` | `color-danger-surface` `#FDECEA` | 5.72:1 |
| `color-success` | `#256B4D` | `color-success-surface` `#E6F4EE` | 5.64:1 |
| `color-warning` | `#7A5000` | `color-warning-surface` `#FFF6E5` | 6.58:1 |
| `color-active` | `#256B4D` | `#E6F4EE` | corresponde a "verde suave para estados ativos" de `DESIGN_SYSTEM.md` |
| `color-focus-ring` | `#00567C` | — | anel de 2px, offset 2px |

## Material 3 — expansão de papéis semânticos

Regra obrigatória:

`papel M3 → token semântico local → valor Rede de Apoio`

Não copiar valores baseline do Google. Copiar a **função semântica**.

Papéis na collection `Rede de Apoio / Semantic`:

| Papel local | Função M3 equivalente | Uso esperado | Status |
|---|---|---|---|
| `Color/On Surface` | `onSurface` | texto/ícone primário sobre surfaces | `VariableID:5673:560` → `Color/Foreground` |
| `Color/On Surface Variant` | `onSurfaceVariant` | texto/ícone secundário | `VariableID:5673:561` → `Color/Muted Foreground` |
| `Color/Primary Container` | `primaryContainer` | foco operacional dominante | **canônico**: `VariableID:5700:269` → `#D0E9F3` |
| `Color/On Primary Container` | `onPrimaryContainer` | conteúdo sobre Primary Container | **canônico**: `VariableID:5700:270` → `#003D59` |
| `Color/Secondary Container` | `secondaryContainer` | seleção/ênfase tonal | `VariableID:5673:562` → `#EBE8FA` |
| `Color/On Secondary Container` | `onSecondaryContainer` | conteúdo sobre Secondary Container | `VariableID:5673:563` → `#00567C` |
| `Color/Surface Container` | `surfaceContainer` | cards/sheets/menus com hierarquia tonal | `VariableID:5673:564` → `#F3F0F7` |
| `Color/Surface Container Low` | `surfaceContainerLow` | camada tonal de baixa ênfase | `VariableID:5673:565` → `#F8F5FA` |
| `Color/Scrim` | `scrim` | obscurecimento atrás de modal/sheet | `VariableID:5673:566` |

`Color/On Primary Container` sobre `Color/Primary Container` tem contraste aproximado de 9.18:1.

Os candidatos `Color/Tertiary Container` e `Color/On Tertiary Container` continuam **pendentes**. O piloto T03 não os validou; não usar `tone=context` até calibração e aprovação específica.

### Scopes semânticos

Os papéis Material 3 existentes foram normalizados para scopes coerentes; nenhum deles permanece em `ALL_SCOPES`:

- `Color/On Surface`, `Color/On Surface Variant`, `Color/On Secondary Container` → fills de conteúdo/texto;
- `Color/Secondary Container`, `Color/Surface Container`, `Color/Surface Container Low`, `Color/Scrim` → fills de frame/shape conforme o papel.

A normalização alterou somente scope, nunca valor resolvido.

### Regra de uso

- `Color/Primary` e `Color/Secondary` são cores de acento/conteúdo; não são substitutos universais para containers.
- quando um elemento é um container tonal, preferir o papel `* Container` correspondente.
- conteúdo dentro de um container tonal deve usar o papel `On * Container` compatível.
- rows de navegação em `Surface Container Low` permanecem transparentes por padrão; container tonal persistente é reservado a uma seleção semanticamente real.
- não vincular um papel errado só para eliminar hardcode.
- se o papel correto estiver pendente, calibrar antes de propagar.

### Navigation Bar — calibração canônica

O indicador ativo usa `Color/Secondary Container` e o ícone/label ativo usam `Color/On Secondary Container`.

Destinos primários: `Home · Agenda · Diário · Saúde`. `Mais` não pertence à Navigation Bar canônica.

## Component Color Grammar — domínio

As famílias `Feature/*`, `Category/*` e `Status/*` na collection `Rede de Apoio / Semantic` são canônicas para novas migrações. A regra completa está em `COMPONENT_COLOR_GRAMMAR.md`.

Regra resumida:

`COMPONENT → SEMANTIC VARIANT → TOKEN → VALUE`

- Feature identifica área/origem;
- Category identifica assunto do cuidado;
- Status representa somente estado funcional real;
- mesmo papel = mesmo token em qualquer tela/estado;
- precedência: `critical real state → functional status → category → feature/source → neutral structure`.

Exemplos aprovados/validados:

- Home: `#D0E9F3 / #2A6F97 / #003D59`;
- Diary: `#F0E4F1 / #875985 / #563751`;
- Hydration: `#D7EEF7 / #147A96 / #0B5268`;
- Medication: `#EEE3F7 / #7A4D91 / #5C376E`;
- Scheduled: `#EEEAF8 / #5B4A7D`;
- Pending usa Warning semantics.

### Status acrescentados no lote T05/T07

| Token Figma | ID | Alias/valor funcional | Regra |
|---|---|---|---|
| `Status/Delayed/Container` | `VariableID:5835:341` | `color-warning-surface` | atraso operacional, não destructive |
| `Status/Delayed/Foreground` | `VariableID:5835:342` | `Color/Warning` | conteúdo de atraso |
| `Status/Corrected/Container` | `VariableID:5835:343` | `Color/Surface Container` | histórico corrigido neutro |
| `Status/Corrected/Foreground` | `VariableID:5835:344` | `Color/On Surface Variant` | conteúdo do estado corrigido |

Regras:

- `Atrasado` não usa Danger/Destructive apenas para chamar atenção;
- `Corrigido` não usa Warning, Success nem Feature/Diary como status;
- Category permanece independente do Status: uma Medicação atrasada continua usando `Category/Medication/*` para categoria e `Status/Delayed/*` para estado.

A gramática de domínio possui agora 50 variables: 12 Feature, 24 Category e 14 Status.

## Root Header Tinted — aprovado no piloto T03

Tokens do shell:

| Token | Figma ID | Valor |
|---|---|---|
| `Shell/Header/RootTint/Start` | `VariableID:5731:166` | `#EEF2F8` |
| `Shell/Header/RootTint/End` | `VariableID:5731:167` | `#DCEBF4` |

Receita canônica:

- gradiente horizontal suave `#EEF2F8 → #DCEBF4`;
- sem Liquid Glass, blur, translucência, glow ou sombra pesada;
- Settings com target 48 × 48 e presença visual aproximada de 40 × 40;
- avatar contextual com ring de 2 px em `Feature/Home/Accent`;
- header menos dominante que o Primary Container operacional.

Componentes Figma:

- `AppHeader / Root / Tinted`: `5746:157`;
- `AppShell / Root`: `5652:528`, já consumindo o Root/Tinted.

Novas telas Root devem reutilizar o shell em vez de reconstruir o tratamento por tela. Ver `APP_HEADER_VISUAL_GRAMMAR.md`.

## LocalSubnav — Foundation

A seleção de navegação local usa a família Feature da seção, nunca Status.

Masters atuais:

- Saúde scrollable: `5810:1005`, `Active=Medicamentos|Tarefas|Consultas|Compromissos`;
- Diário fixed: `5830:358`, `Active=Diário|Histórico`.

Diário usa:

- surface: `Color/Surface`;
- inativo: `Color/On Surface Variant`;
- ativo: `Feature/Diary/Foreground`;
- indicador: `Feature/Diary/Accent`;
- divisor: `Color/Border Subtle`.

O hide-on-down / reveal-on-up é comportamento do shell/runtime e não cria token nem variante Expanded/Collapsed.

## Tipografia

Família: **Geist**. Fallback: Inter.

| Token | Tamanho | Peso | Line-height |
|---|---|---|---|
| `text-title` | 24 px | 600 | 32 px |
| `text-heading` | 20 px | 600 | 28 px |
| `text-subheading` | 17 px | 600 | 24 px |
| `text-body` | 16 px | 400 | 24 px |
| `text-meta` | 14 px | 400 | 20 px |

Piso estrutural de 14 px. Nenhum texto estrutural abaixo disso.

## Espaçamento

Escala: `4 · 8 · 12 · 16 · 20 · 24 · 32`

| Token | Valor |
|---|---|
| `space-screen-x` | 16 px |
| `space-section` | 24 px |
| `space-card-inner` | 16 px |
| `space-stack` | 12 px |

## Raio e elevação

| Token | Valor |
|---|---|
| `radius-card` | 12 px |
| `radius-control` | 8 px |
| `radius-pill` | 999 px |
| `elevation-card` | `0 1px 2px rgba(18,34,43,.06)` |
| `elevation-overlay` | `0 8px 24px rgba(18,34,43,.14)` |

## Alvo de toque

`touch-target-min` = **48 × 48 px**, espaçamento mínimo de 8 px entre alvos.

Esse token descreve o alvo de interação do produto, não a altura visual de uma primitive. Wrappers externos preservam as primitives Obra/shadcn e garantem a área interativa mobile.

## Grid mobile

Largura de referência 390 px · margem lateral 16 px · largura útil 358 px.

## Foundation canônica no Figma — 2026-09-14

Página: `Design Foundation` (`5639:21448`).

Contratos vigentes:

- collections `Rede de Apoio / Primitives` (`VariableCollectionId:5639:154`) e `Rede de Apoio / Semantic` (`VariableCollectionId:5639:155`);
- grid 390/16/358;
- Geist e escala tipográfica;
- touch target mínimo 48 × 48;
- `STATE = PAGE BASE + DELTA MÍNIMO`;
- Navigation Bar com quatro destinos;
- Settings / Management Sheet;
- `AppHeader / Root / Tinted` (`5746:157`);
- `AppShell / Root` (`5652:528`) usando Root/Tinted;
- Component Color Grammar;
- LocalSubnav Saúde `5810:1005`;
- LocalSubnav Diário `5830:358`.

O PR #91 da Foundation está mergeado. A T03 é a primeira prova real aprovada do AppShell Root. As migrações posteriores extraem e promovem padrões reutilizáveis, mas não resolvem P03/P04/P05/P06 nem aprovam RF30/US-036.

As primitives Obra/shadcn preservam suas geometrias internas quando necessário. A Foundation define o padrão do produto para composição e não reescreve o kit.
