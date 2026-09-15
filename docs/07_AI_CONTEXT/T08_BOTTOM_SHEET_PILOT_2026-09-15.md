# T08 — Piloto de Bottom Sheet para Cadastro Operacional

Status: **IMPLEMENTADO NO FIGMA — PENDENTE REVISÃO HUMANA PARA PROPAGAÇÃO T09/T10/T11**

Data: 2026-09-15

Regra canônica aplicada:

`docs/04_DESIGN_SYSTEM/ENTITY_ENTRY_BOTTOM_SHEET_PATTERN.md`

## Objetivo

Validar em T08 — Medicamentos o padrão aprovado de cadastro operacional contextual usando Bottom Sheet ancorado embaixo, antes de propagar para T09/T10/T11.

## Figma

Arquivo: `tcyj2fkTXei2CJbqaRxqCp`

Página canônica: `Fluxo Final` (`5926:1014`).

### T08 base

- baseline: `5926:1801`
- CTA `E14 — Cadastrar`: `5926:1806`

O CTA deixou de navegar para a antiga página inteira `5926:34250` e agora abre o Bottom Sheet como overlay real.

### Bottom Sheet real

- overlay create: `5967:6307`
- sheet create: `5967:6309`
- handle row create: `5967:6310`
- Cancelar: `5967:6331`
- Salvar medicamento: `5967:6332`

### Validation Error

- overlay error: `5967:6333`
- sheet error: `5967:6335`
- handle row error: `5967:6336`
- Cancelar: `5967:6358`
- Salvar medicamento: `5967:6359`

### Success existente preservado

- T08 created/success: `5926:34369`
- CTA `+ Cadastrar` no success: `5926:34375`

## Prototype real

Fluxo implementado:

`T08 base → OVERLAY bottom sheet → validation error sheet → T08 created/success`

Comportamento:

- `5926:1806` abre `5967:6307` via `OVERLAY + MOVE_IN / BOTTOM`;
- `5926:34375` abre o mesmo overlay via `OVERLAY + MOVE_IN / BOTTOM`;
- `Cancelar` usa `CLOSE`;
- handle row usa `ON_DRAG` com `MOVE_OUT / BOTTOM` para retornar ao T08 base;
- Save do default usa `SWAP` para o overlay de Validation Error;
- Save do error usa `MOVE_OUT / BOTTOM` para o estado `created` existente.

Observação de ferramenta: o runtime do Plugin API rejeitou `ON_DRAG + CLOSE` diretamente. O protótipo materializa o mesmo comportamento perceptível usando `ON_DRAG → NAVIGATE T08 base + MOVE_OUT/BOTTOM`. O requisito de runtime continua sendo dismiss por arraste para baixo quando suportado pela implementação real.

## Visual do piloto

Review board existente:

- section: `5959:6208`
- base/list: `5959:6209`
- create_sheet: `5959:6246`
- create_sheet_error: `5959:6283`
- success: `5959:6320`

O board mostra:

- página T08 reconhecível atrás do scrim;
- Sheet subindo a partir de baixo;
- handle no topo;
- fields sem Card decorativo;
- validação como delta mínimo;
- success retornando ao page-base.

## Correção global de scroll/stacking aplicada no mesmo piloto

### T04 — Calendário/Agenda

- root: `5926:1261`
- content viewport: `5926:1263`

Correções:

- `clipsContent = true`;
- `overflowDirection = VERTICAL`;
- Header e NavigationBar movidos para frente no stacking do root.

Resultado estrutural:

`Header → clipped scrolling content → NavigationBar`, sem conteúdo poder invadir o header.

### T06 — Diário

- root: `5926:1542`
- content viewport: `5962:6236`
- scroll content: `5926:1545`

Correções:

- viewport com `clipsContent = true`;
- viewport com `overflowDirection = VERTICAL`;
- conteúdo interno redimensionado para sua altura real (`1169 px`);
- overflow do conteúdo interno removido, deixando o viewport externo controlar o scroll.

Resultado estrutural:

`AppHeader → LocalSubnav → 628 px clipped content viewport → NavigationBar`.

## Auditoria

T08:

- abertura usa `OVERLAY` real: sim;
- transição de entrada: `MOVE_IN / BOTTOM`;
- handle drag-down prototipado: sim;
- Cancelar fecha overlay: sim;
- Validation Error permanece no Sheet: sim;
- sucesso preserva estado existente: sim;
- página inteira de cadastro ainda existe apenas como estado histórico não mais usado pelo CTA canônico.

T04/T06:

- viewport rolável com clipping: sim;
- conteúdo não pode renderizar fora da janela central: sim;
- NavigationBar preservada: sim;
- screenshots pós-ajuste revisados sem regressão visual no estado inicial: sim.

## Gate

**NÃO PROPAGAR para T09/T10/T11 antes de revisão humana do piloto T08.**

Após aprovação:

1. converter T09 — Nova tarefa;
2. converter T10 — Novo registro contextual;
3. converter T11 — Novo compromisso;
4. remover/despromover states de página inteira que deixarem de ser canônicos;
5. atualizar registries globais;
6. auditar Prototype completo e todos os botões ainda sem wiring.
