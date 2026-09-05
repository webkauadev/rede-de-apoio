# T06 — Diário de Cuidados

Responsável: **Kauã**
Status: **implementada no Figma** (página `Kauã`) · P03 ainda bloqueia a aprovação

---

## 1. Rastreamento

| Campo | Valor | Fonte |
|---|---|---|
| **RF** | RF11 — Diário de cuidados | `REQUIREMENTS.md` |
| **RF de apoio** | RF13 — Autoria e data/hora | `REQUIREMENTS.md` |
| **US** | US015 — ⚠️ **texto ausente** | pendência P01 |
| **Tela** | T06, nó de "Registros de Cuidado" | `SITEMAP.md` |
| **Descrição** | "Registro cronológico de cuidados" | `SCREENS_CATALOG.md` |
| **Estados** | Default · Loading · Empty · Error · Success | `SCREEN_STATES.md` |
| **Componente principal** | `CareRecordCard` | `TRACEABILITY_MATRIX.md` |
| **Regras aplicáveis** | RN-005, RN-006, RN-007, RN-008 | `BUSINESS_RULES.md` |

### Usuário e permissão

**Leitura:** todas as categorias com vínculo, conforme `PERMISSIONS_MATRIX.md`.

**Escrita:** ⚠️ **indefinida** — a matriz responde "Conforme regra / Conforme permissão / Limitado / Conforme escopo".

Enquanto P03 não for decidido, a tela é construída com o botão de novo registro
controlado por uma propriedade de variante `canWrite: true | false`. O protótipo
mostra os dois casos. **A regra que define quem recebe `true` não é decisão de
prototipação.**

**Pessoa Idosa:** RF30 é proposta controlada. **Nenhuma variante, nenhum frame e
nenhum componente da jornada da Pessoa Idosa foi criado.**

---

## 2. Objetivo da tela

Exibir cronologicamente os registros de cuidado da pessoa idosa e permitir
o registro de um novo cuidado, preservando autoria, data/hora e imutabilidade.

---

## 3. Consequências das regras de negócio no desenho

Esta seção existe porque as regras mudam a interface de forma não óbvia.

### RN-005 — registros imutáveis
**Não existe ação de editar. Não existe ação de excluir.**
Nenhum ícone de lápis, nenhum ícone de lixeira, nenhum swipe-to-delete, nenhum
menu de contexto com essas opções em `CareRecordCard`. Este é o ponto em que
T06 mais se afasta de um app de notas convencional, e é o erro mais provável
de um integrante que desenhe a tela sem ler as regras.

### RN-006 — correção versionada
A única forma de corrigir é **criar um novo registro vinculado**.
- ação `Corrigir` no card;
- o registro original **permanece visível** na cronologia;
- o original ganha badge `Corrigido` e link para a correção;
- a correção ganha badge `Correção de <hora do original>` e link de volta.

Nenhum dos dois some. Isso gera as variantes `superseded` e `correction` do card.

### RF13 — autoria e data/hora
Todo card exibe autor e horário. Não é opcional e não fica escondido em detalhe.

### RN-007 / RN-008
A tela não expõe controle de auditoria — isso é T17. T06 apenas gera os eventos.

### RNF-P11 (proposta)
Como a criação é irreversível, o formulário confirma antes de salvar.

---

## 4. Estrutura — Page Base

```
T06 / Default                                    390 × altura adaptável
┌────────────────────────────────────────────┐
│ AppTopBar                              56  │  ← título "Diário de Cuidados"
├────────────────────────────────────────────┤
│                                            │
│  Hoje · 5 de setembro          text-meta   │  ← Separator + rótulo de data
│                                            │
│  ┌ CareRecordCard ─────────────────────┐   │
│  │ 14:30   Medicação administrada      │   │  ← título + hora
│  │ Observação em text-body             │   │
│  │ ─────────────────────────────────   │   │
│  │ Avatar  Maria Souza · Familiar      │   │  ← RF13 autoria
│  │                        [Corrigir]   │   │  ← RN-006, sem editar/excluir
│  └─────────────────────────────────────┘   │
│                                            │
│  ┌ CareRecordCard · superseded ────────┐   │
│  │ 11:00   Aferição de pressão         │   │
│  │ [Badge: Corrigido]                  │   │
│  │ ↳ Ver correção das 11:20            │   │
│  └─────────────────────────────────────┘   │
│                                            │
│  Ontem · 4 de setembro                     │
│  ┌ CareRecordCard ─────────────────────┐   │
│  └─────────────────────────────────────┘   │
│                                            │
│              [ + Registrar cuidado ]       │  ← visível só se canWrite
├────────────────────────────────────────────┤
│ BottomNavigation                       64  │  ← "Diário" ativo
└────────────────────────────────────────────┘
```

Layout: Auto Layout vertical · padding lateral `space-screen-x` 16 ·
gap `space-stack` 12 entre cards · gap `space-section` 24 entre grupos de data.

### Novo registro — sub-tela navegada

**Decisão tomada:** Novo Registro é sub-tela navegada, não estado nem Sheet.
Tem page base própria (TopAppBar com voltar + área de ações fixa) e entra no
Site Map com linha tracejada. Seus dois estados — Default e Validation Error —
derivam dessa base, respeitando o delta mínimo dentro dela.

A proposta anterior de Sheet foi descartada.

```
T06 / Sheet — Novo registro
┌────────────────────────────────────────────┐
│  ▬▬▬  (grabber)                            │
│  Registrar cuidado            text-heading │
│                                            │
│  Tipo de cuidado                           │
│  [ Input ]                                 │
│                                            │
│  Observação                                │
│  [ Textarea, 4 linhas ]                    │
│                                            │
│  Data e hora                               │
│  [ Input · pré-preenchido com agora ]      │
│                                            │
│  ⓘ Registros não podem ser editados nem    │  ← RNF-P11
│    excluídos. Correções criam um novo      │
│    registro vinculado a este.              │
│                                            │
│  [ Cancelar ]      [ Salvar registro ]     │
└────────────────────────────────────────────┘
```

---

## 5. Estados

| Estado | Delta em relação à base | Shell |
|---|---|---|
| `Default` | — | intacto |
| `Loading` | 3 skeletons no lugar dos cards | AppTopBar + BottomNav intactos |
| `Empty` | bloco de ausência: ícone Lucide `notebook-pen`, "Nenhum registro ainda", texto de apoio. Botão permanece se `canWrite` | intacto |
| `Error` | bloco de falha em `color-danger-surface` + botão "Tentar novamente" | intacto |
| `Success` | Toast `color-success-surface` "Registro salvo" sobre a base; o novo card aparece no topo | intacto |
| `Sheet / validação` | campo obrigatório vazio ganha `color-danger` na borda + mensagem `text-meta`; o restante do Sheet não muda | intacto |
| `Sheet / salvando` | botão em loading, campos desabilitados | intacto |

Nenhum estado altera grid, tipografia, navegação ou espaçamento.

---

## 6. Componentes

### Reutilizados de `04_DESIGN_SYSTEM`
`AppTopBar` · `BottomNavigation` · `CareRecordCard` · `Button` · `Badge` ·
`Avatar` · `Separator` · `Sheet` · `Input` · `Toast`

### `CareRecordCard` — variantes definidas nesta tela

| Propriedade | Valores | Origem |
|---|---|---|
| `state` | `default` · `superseded` · `correction` | RN-005, RN-006 |
| `canCorrect` | `true` · `false` | P03 em aberto |

Conteúdo fixo em todas as variantes: hora, tipo de cuidado, observação,
autor + categoria (RF13). **Sem ação de editar ou excluir em nenhuma variante.**

### Novos primitives solicitados

```
Nome: Textarea
Origem: primitive shadcn/ui — Decisão 002, não é escopo novo
RF: RF11 (campo de observação do registro)
Uso: T06 Sheet; provável reuso em T09, T10, T18
Variantes: default · focus · error · disabled
Justificativa de não reuso: Input é linha única; observação de cuidado é multilinha

Nome: Skeleton
Origem: primitive shadcn/ui — Decisão 002
RF: nenhum. Atende ao estado Loading exigido por STATE_MANAGEMENT.md
Uso: qualquer tela com lista
Variantes: text · card
```

Ambos são primitives shadcn, cobertos pela Decisão 002. Não são componentes
de domínio e não introduzem funcionalidade.

---

## 7. Acessibilidade aplicada

| Item | Aplicação |
|---|---|
| Alvo de toque | 48 px em "Registrar cuidado", "Corrigir", itens da BottomNavigation |
| Texto | corpo 16 px; hora e autoria em 14 px, nunca abaixo |
| Contraste | `text-primary` 15.9:1 · `text-secondary` 7.13:1 · borda de campo `border-interactive` 3.89:1 |
| Cor isolada | badge `Corrigido` tem texto, não só cor (RNF-P04) |
| Foco | anel `color-focus-ring` 2 px com offset 2 px |
| Ordem de leitura | data → registros do dia → ação |

---

## 8. Mudanças proibidas nesta tela

Cada item abaixo é uma ideia razoável de UX que **não tem origem em requisito**:

| Ideia | Por que está proibida |
|---|---|
| Editar ou excluir registro | viola RN-005 |
| Filtro por tipo, autor ou período | RF11 não prevê; filtro/exportação é RF12/RF28 → T07 |
| Anexar foto ao registro | RF23 (Anexos) existe, mas não está ligado a T06 na matriz |
| Marcar sintoma/intercorrência | RF18 existe, mas sem US e sem tela atribuída |
| Badge de atraso de 15 min | N04/RF26 não declaram T06 como superfície (P04) |
| Sino de notificações no AppTopBar | `NOTIFICATIONS_RULES.md` proíbe central fora do Site Map (P04) |
| Busca no diário | sem RF |
| Qualquer variante da Pessoa Idosa | RF30 é proposta controlada |

---

## 9. Pendências que bloqueiam a aprovação de T06

| # | Pendência | Efeito |
|---|---|---|
| P01 | US015 sem texto | rastreabilidade incompleta; critérios de aceite ausentes |
| P03 | permissão de escrita indefinida | `canWrite` fica como variante até haver regra |
| P07 | arquivo Figma não referenciado | implementação não pode ser executada |

O desenho pode ser construído. A **aprovação** depende de P01 e P03.


---

## 10. Implementação no Figma

Arquivo `PROJETO-REDE-DE-APOIO`, página `Kauã`.

| Frame | Base |
|---|---|
| `[KAUÃ] T06 — Diário de Cuidados / Normal` | Diário |
| `[KAUÃ] T06 — Diário de Cuidados / Empty` | Diário |
| `[KAUÃ] T06 — Diário de Cuidados / Loading` | Diário |
| `[KAUÃ] T06 — Diário de Cuidados / Success` | Diário |
| `[KAUÃ] T06 — Diário / Novo Registro / Default` | Novo Registro (sub-tela) |
| `[KAUÃ] T06 — Diário / Novo Registro / Validation Error` | Novo Registro (sub-tela) |

Componente `T06 / Care Record Card` — 342 × 132, Auto Layout.

| Propriedade | Tipo | Padrão | Origem |
|---|---|---|---|
| `canCorrect` | boolean | `true` | RN-006 · valor real depende de P03 |
| `isSuperseded` | boolean | `false` | RN-006 · exibe badge Corrigido e link |

Sem ação de editar ou excluir em nenhuma variante (RN-005).

## 11. Pendências remanescentes

- **P03** — permissão de escrita indefinida. `canCorrect` fica como propriedade até haver regra.
- **P01** — US015 sem texto.
- **P10** — cor de marca não existe como variável no Figma; telas usam hex direto.
- Estado `Error` da base Diário (falha de carga) ainda não construído.
