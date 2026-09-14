# Design Tokens

Versão 3. Substitui a versão anterior.
Motivo da revisão: além da correção histórica de borda/estados, esta versão registra a Foundation Material 3 já aprovada e os papéis semânticos validados no piloto T03 em 2026-09-14.

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
| `color-border-subtle` | `#E5E5E5` | divisores **decorativos** apenas | 1.26:1 — fora do escopo de 1.4.11 |
| `color-border-interactive` | `#6E8496` | inputs, cards acionáveis, controles | 3.89:1 sobre surface / 3.70:1 sobre background |

`color-border-subtle` não pode ser usado em nenhum elemento acionável ou em campo de formulário.

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

## Component Color Grammar — aprovada no piloto T03

As famílias `Feature/*`, `Category/*` e `Status/*` na collection `Rede de Apoio / Semantic` são canônicas para novas migrações. A regra completa está em `COMPONENT_COLOR_GRAMMAR.md`.

Regra resumida:

`COMPONENT → SEMANTIC VARIANT → TOKEN → VALUE`

- Feature identifica área/origem;
- Category identifica assunto do cuidado;
- Status representa somente estado funcional real;
- precedência: `critical real state → functional status → category → feature/source → neutral structure`.

Exemplos aprovados no T03:

- Home: `#D0E9F3 / #2A6F97 / #003D59`;
- Diary: `#F0E4F1 / #875985 / #563751`;
- Hydration: `#D7EEF7 / #147A96 / #0B5268`;
- Scheduled: `#EEEAF8 / #5B4A7D`;
- Pending usa Warning semantics.

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
- Component Color Grammar aprovada no T03.

O PR #91 da Foundation está mergeado. A T03 é a primeira prova real aprovada do AppShell Root. Essa aprovação visual autoriza reutilizar os padrões acima, mas não resolve P03/P04/P05/P06 nem aprova RF30/US-036.

As primitives Obra/shadcn preservam suas geometrias internas quando necessário. A Foundation define o padrão do produto para composição e não reescreve o kit.
