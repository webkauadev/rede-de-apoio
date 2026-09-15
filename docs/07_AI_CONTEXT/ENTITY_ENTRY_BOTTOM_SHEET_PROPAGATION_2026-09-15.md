# Propagação — Cadastro Operacional em Bottom Sheet

Data: 2026-09-15  
Status: **PROPAGAÇÃO MATERIALIZADA E AUDITADA — APROVADA HUMANAMENTE**

## Origem

A regra canônica foi aprovada humanamente e mergeada no PR #111. O piloto T08 foi materializado no PR #112 e aprovado explicitamente antes da propagação.

Fonte de padrão:

- `docs/04_DESIGN_SYSTEM/ENTITY_ENTRY_BOTTOM_SHEET_PATTERN.md`
- T06 / Novo Registro como referência de linguagem visual;
- T08 como piloto de implementação via Prototype `OVERLAY` real.

## Resultado

O padrão foi aplicado a todos os cadastros operacionais contextuais definidos no escopo:

| Tela | Operação | Create overlay | Validation overlay | Success existente |
|---|---|---:|---:|---:|
| T06 | Novo registro do Diário | `5977:7182` | `5977:7249` | `5926:33509` |
| T08 | Cadastrar medicamento | `5967:6307` | `5967:6333` | `5926:34369` |
| T09 | Nova tarefa | `5974:6252` | `5974:6312` | `5926:34727` |
| T10 | Novo registro | `5974:35902` | `5974:35948` | `5926:35059` |
| T11 | Novo compromisso | `5974:36062` | `5974:36136` | `5926:35494` |

T10 também preserva o contexto de anexo dentro do mesmo Sheet:

- attachment overlay: `5974:35996`.

## Prototype

Contrato implementado:

- CTA de criação → `OVERLAY`;
- transição de abertura → `MOVE_IN / BOTTOM`;
- `Cancelar` → `CLOSE`;
- alça → `ON_DRAG` + `MOVE_OUT / BOTTOM` para o page-base;
- validação → `SWAP` do mesmo overlay;
- sucesso → estado de sucesso já aprovado da própria tela.

A limitação da Plugin API do Figma impede combinar diretamente `ON_DRAG` e `CLOSE`. Por isso o protótipo usa `ON_DRAG + MOVE_OUT/BOTTOM → page-base`, visualmente equivalente ao dismiss. O contrato de runtime permanece dismiss real.

## CTAs canônicos cobertos

T06:
- `5926:1549`
- `5926:32943`
- `5926:33516`

T08:
- `5926:1806`
- empty action `5926:34209`
- `5926:34375`

T09:
- `5926:1901`
- `5926:34467`
- `5926:34742`

T10:
- `5926:1998`
- `5926:34967`
- `5926:35064`

T11:
- `5926:2065`
- `5926:35197`
- `5926:35499`

Todos abrem os respectivos Bottom Sheets canônicos.

## Estados antigos

Os antigos formulários full-page foram preservados como evidência histórica, mas renomeados no Figma como:

`[LEGACY PROTO STATE] ... — SUPERSEDED BY BOTTOM SHEET`

Eles não são mais destinos de caminhos canônicos.

Nodes históricos preservados:

- T06: `5926:33036`, `5926:33272`;
- T08: `5926:34250`, `5926:34279`, `5926:34309`, `5926:34339`;
- T09: `5926:34568`, `5926:34646`;
- T10: `5926:35125`, `5926:35145`, `5926:35166`;
- T11: `5926:35306`, `5926:35398`.

Auditoria final: **0 caminhos canônicos apontando para esses estados legados**.

## Touch target da alça

A alça visual permanece 40×4, porém a área interativa do handle passou a **326×48** em todos os Sheets, satisfazendo o target mínimo de 48 px sem aumentar visualmente a barra.

Auditoria: **0 handle targets abaixo de 48 px**.

## Overflow e shell

Todos os overlays:

- root 390×844;
- Sheet x=16, y=124, 358×704;
- zero overflow de conteúdo do Sheet.

Correções estruturais preservadas:

### T04 — Agenda

- root `5926:1261`;
- viewport `5926:1263`;
- `clipsContent=true`;
- `overflowDirection=VERTICAL`;
- conteúdo permanece abaixo do header e acima da NavigationBar.

### T06 — Diário

- root `5926:1542`;
- viewport `5962:6236`;
- conteúdo `5926:1545`, altura real 1169;
- `clipsContent=true`;
- `overflowDirection=VERTICAL` no viewport;
- timeline não invade Header/LocalSubnav.

## Pessoa Idosa read-only

Foram removidas reactions antigas de ações de escrita ocultas nos variants read-only de T06/T08/T09/T10/T11. As ações já estavam invisíveis, e agora também não mantêm destinos prototípicos de escrita legados.

## Review board

`5976:7063` — `Entity Entry Bottom Sheet — Propagation Review (NON-CANONICAL)`

O board apresenta T09, T10 e T11 em quatro colunas por tela:

1. baseline;
2. Bottom Sheet default;
3. Validation Error;
4. Success.

## Registro estruturado

Mapeamento canônico detalhado:

`docs/05_FIGMA/ENTITY_ENTRY_BOTTOM_SHEET_FLOW.yaml`

## Proteção de escopo

Não foram alterados requisitos, permissões, entidades ou campos funcionais. T01/T02 e cadastros/vinculações de pessoas permanecem fora deste padrão, conforme regra canônica.
