# Design Tokens

Versão 3. **Espelha as variáveis reais do arquivo Figma.**

A versão 2 continha hexadecimais que não existiam no projeto — eram invenção da
auditoria, feita antes de o arquivo Figma ser inspecionado. Foi removida.

Fonte de verdade: coleções de variáveis do arquivo `PROJETO-REDE-DE-APOIO`.
Este documento descreve; não define. Divergência entre os dois = o Figma vence.

---

## Base

O projeto usa o kit **Obra Shadcn/ui Pro**, já instalado no arquivo, com as
coleções abaixo. A convenção de nomes é a do shadcn, conforme Decisão 005.

| Coleção | Modos | Variáveis |
|---|---|---|
| `shadcn colors` | `shadcn`, `shadcn-dark` | 104 |
| `theme` | `shadcn` | 24 |
| `raw tailwind colors` | — | 288 |
| `typography` | `shadcn` | 66 |
| `spacing` | `shadcn` | 28 |
| `shadows` | `shadcn` | 51 |
| `border radii` | `shadcn` | 13 |

Existe modo escuro (`shadcn-dark`) disponível e ainda **não usado** em nenhuma tela.
Decisão pendente: entra no escopo ou não.

## Espaçamento

```
3xs 2 · 2xs 4 · xs 8 · sm 12 · md 16 · lg 20 · xl 24
2xl 32 · 3xl 40 · 4xl 48 · 5xl 64 · 6xl 80 …
```

Há um grupo `out-of-scale/` com valores fora da escala (3, 5.5, 6, 7, 9.5, 14…).
**Não usar em telas do Rede de Apoio.** Existe para compatibilidade do kit.

## Raio

```
radius-none 0 · radius-sm 6 · radius-md 8 · radius-lg 10 (padrão)
radius-xl 14 · radius-2xl 16 · radius-3xl 22 · radius-4xl 26 · radius-full 999
```

## Tipografia

Família **Geist**, confirmada disponível no arquivo.
Text styles publicados: `heading 1–4`, `caption`, `paragraph large/`, `paragraph/`,
`paragraph small/`, `paragraph mini/` e `monospace/`, cada um em `normal`, `medium` e `bold`.

**Piso do projeto: 14px** (RNF-P03, proposta). `paragraph mini` fica abaixo disso —
não usar em conteúdo, apenas em rótulo auxiliar se houver decisão específica.

## Cor de marca

`theme` traz apenas neutros (`neutrals/0` a `neutrals/1000`), `destructive` em
vermelho e `chart colors` em azul. **O kit ainda não foi tematizado como coleção.**

As telas de T06 e T16 já aplicam a identidade do `DESIGN_SYSTEM.md` — azul petróleo
`#2a6f97` — mas por valor direto, não por variável.

> ⚠️ **Pendência P10.** Enquanto a marca não existir como variável, cada integrante
> vai digitar o hex à mão e a identidade vai divergir entre telas. Criar em `theme`:
> `primary`, `primary-foreground`, `accent` e um verde de estado ativo.

## Contraste verificado nas telas existentes

| Uso | Cores | Razão | WCAG |
|---|---|---|---|
| Descrição do registro | `#161a32` sobre `#ffffff` | 16.4:1 | ✅ AAA |
| Autoria e hora | `#40484e` sobre `#ffffff` | 9.0:1 | ✅ AAA |
| Badge de categoria | `#00734d` sobre `#92f7c3` | 4.6:1 | ✅ AA |
| Ação Corrigir | `#2a6f97` sobre `#ffffff` | 5.5:1 | ✅ AA |
| Título do topo | `#2a6f97` sobre `#f4f2ff` | 5.2:1 | ✅ AA |

Nenhuma reprovação. O achado C5 da auditoria (`#E5E5E5` a 1.26:1) era sobre um
token que eu próprio havia inventado e não existe no projeto.
