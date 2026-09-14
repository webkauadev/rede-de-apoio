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

## Material 3 — expansão de papéis semânticos

A partir da Decisão 007 e de `MATERIAL3_VISUAL_DIRECTION.md`, o sistema de cores deve distinguir **acento** de **container tonal**.

Regra obrigatória:

`papel M3 → token semântico local → valor Rede de Apoio`

Não copiar valores baseline do Google. Copiar a **função semântica**.

Papéis TARGET na collection `Rede de Apoio / Semantic`:

| Papel local TARGET | Função M3 equivalente | Uso esperado | Status |
|---|---|---|---|
| `Color/On Surface` | `onSurface` | texto/ícone primário sobre surfaces | materializado: `VariableID:5673:560` → `Color/Foreground` |
| `Color/On Surface Variant` | `onSurfaceVariant` | texto/ícone secundário sobre containers | materializado: `VariableID:5673:561` → `Color/Muted Foreground` |
| `Color/Primary Container` | `primaryContainer` | container tonal associado ao primary | pendente de calibração |
| `Color/On Primary Container` | `onPrimaryContainer` | conteúdo sobre Primary Container | pendente de calibração |
| `Color/Secondary Container` | `secondaryContainer` | seleção/ênfase tonal, incluindo indicador de navegação quando adequado | materializado: `VariableID:5673:562` → `color/secondary-container` (`VariableID:5673:557`, `#EBE8FA`) |
| `Color/On Secondary Container` | `onSecondaryContainer` | conteúdo sobre Secondary Container | materializado: `VariableID:5673:563` → `Color/Primary` (`#00567C`) |
| `Color/Surface Container` | `surfaceContainer` | cards/sheets/menus com hierarquia tonal | materializado: `VariableID:5673:564` → `color/surface-container` (`VariableID:5673:558`, `#F3F0F7`) |
| `Color/Surface Container Low` | `surfaceContainerLow` | camada tonal de baixa ênfase | materializado: `VariableID:5673:565` → `color/surface-container-low` (`VariableID:5673:559`, `#F8F5FA`) |
| `Color/Scrim` | `scrim` | obscurecimento atrás de modal/sheet | materializado: `VariableID:5673:566` → primitive Obra preta (`VariableID:1953:9376`); opacidade é propriedade do paint |

### Regra de uso

- `Color/Primary` e `Color/Secondary` são cores de acento/conteúdo; não são substitutos universais para containers.
- quando um elemento é um **container tonal**, preferir o papel `* Container` correspondente.
- conteúdo dentro de um container tonal deve usar o papel `On * Container` compatível.
- rows de navegação em `Surface Container Low` permanecem transparentes por padrão e herdam a continuidade visual da surface; container tonal persistente é reservado a uma seleção semanticamente real.
- não vincular um papel errado só para eliminar hardcode.
- se o papel correto ainda estiver `pendente de calibração`, a Foundation deve primeiro calibrá-lo e registrar o valor/variable ID antes de propagá-lo para T##.

### Navigation Bar — calibração materializada

O indicador ativo da Foundation usa `Color/Secondary Container` e o ícone/label ativo usam `Color/On Secondary Container`. `Color/Secondary` continua sendo acento, não fundo de container.

A versão anterior utilizava um indicador tonal claro aproximadamente `#EBE8FA`. A calibração confirmou este valor como primitive `color/secondary-container`, exclusivamente por meio do alias semântico `Color/Secondary Container`.

Qualquer valor final deve:

- manter contraste adequado com `Color/On Secondary Container`;
- preservar a sensação acolhedora/calma do produto;
- evitar saturação desnecessária;
- ser registrado como token/variable antes de propagação.

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
Origem: RNF-P02 (proposta) e alinhamento com a orientação oficial Material/Android para interação touch.

Esse token descreve o **alvo de interação do produto**, não a altura visual de uma primitive. Na foundation, `Button - Nova` preserva 32 px visuais em `Size=Default` e `Input - Nova`/`Select - Nova` preservam 36 px visuais em `Size=Large`; a composição externa de 48 px centraliza a instance e garante a área interativa mobile. O component set Obra/shadcn não é redimensionado nem alterado.

## Grid mobile

Largura de referência 390 px · margem lateral 16 px · largura útil 358 px.

## Foundation canônica no Figma — 2026-09-13

O arquivo Figma canônico possui a página `Design Foundation` (`5639:21448`) como contrato visual para migrações futuras. Ela não substitui nem altera os frames atuais T01–T17.

### CURRENT

- telas atuais ainda contêm margens 24/342, raios e headers fragmentados;
- há texto abaixo de 14 px em frames canônicos ainda não migrados;
- componentes existentes não receberam bindings novos por esta criação.

### TARGET FOUNDATION

- coleções isoladas: `Rede de Apoio / Primitives` (`VariableCollectionId:5639:154`) e `Rede de Apoio / Semantic` (`VariableCollectionId:5639:155`);
- aliases semânticos para cor, spacing e radius, sem efeito automático sobre telas existentes;
- estilos `Rede de Apoio / Type / Brand`, `Page Title`, `Section Title`, `Card Title`, `Body`, `Label` e `Badge`;
- grid obrigatório para novas refatorações: 390 px, margem 16 px e conteúdo útil 358 px;
- `Color/Disabled` referencia `Color/Muted Foreground`; componentes aplicam a redução de opacidade quando adequada, sem introduzir nova cor não documentada;
- papéis M3 materializados permanecem limitados à Foundation até a aprovação visual humana do PR #91; nenhuma T## foi migrada.

As primitives do Obra/shadcn preservam suas geometrias internas quando necessário. A foundation define o padrão do produto para a composição e não reescreve o kit.

Os componentes `Action / Touch Target 48` e `Field / Control / Touch Target 48` tornam essa diferença explícita: 48 px é o contrato de interação da Rede de Apoio; 32/36 px são dimensões visuais das instances Obra usadas internamente.
