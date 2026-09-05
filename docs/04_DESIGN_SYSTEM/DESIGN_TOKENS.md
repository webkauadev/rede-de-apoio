# Design Tokens

Versão 2. Substitui a versão anterior.
Motivo da revisão: o token `Border #E5E5E5` reprovava em WCAG 1.4.11
(1.26:1 sobre Surface, mínimo exigido 3:1) e não existiam tokens semânticos
para os estados que `STATE_MANAGEMENT.md` já exigia.

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

`color-border-subtle` não pode ser usado em nenhum elemento acionável ou em
campo de formulário. Essa é a correção do achado C5 da auditoria.

## Cor — semântica de estado

| Token | Valor | Superfície | Contraste |
|---|---|---|---|
| `color-danger` | `#B3261E` | `color-danger-surface` `#FDECEA` | 5.72:1 |
| `color-success` | `#256B4D` | `color-success-surface` `#E6F4EE` | 5.64:1 |
| `color-warning` | `#7A5000` | `color-warning-surface` `#FFF6E5` | 6.58:1 |
| `color-active` | `#256B4D` | `#E6F4EE` | corresponde a "verde suave para estados ativos" de `DESIGN_SYSTEM.md` |
| `color-focus-ring` | `#00567C` | — | anel de 2px, offset 2px |

## Tipografia

Família: **Geist**. Fallback: Inter.

| Token | Tamanho | Peso | Line-height |
|---|---|---|---|
| `text-title` | 24 px | 600 | 32 px |
| `text-heading` | 20 px | 600 | 28 px |
| `text-subheading` | 17 px | 600 | 24 px |
| `text-body` | 16 px | 400 | 24 px |
| `text-meta` | 14 px | 400 | 20 px |

Piso de 14 px conforme RNF-P03 (proposta). Nenhum texto abaixo disso.

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
Origem: RNF-P02 (proposta).

## Grid mobile

Largura de referência 390 px · margem lateral 16 px · largura útil 358 px.
