# Padronização de Entrada de Entidades — Execução

Status: **REGRA CANÔNICA APROVADA — PILOTO T08 EM EXECUÇÃO**

Data da aprovação humana: 2026-09-15.

Documento canônico de regra:

`docs/04_DESIGN_SYSTEM/ENTITY_ENTRY_BOTTOM_SHEET_PATTERN.md`

## Decisão aprovada

Cadastros de **entidades operacionais contextuais** não devem abrir uma nova página inteira de formulário quando podem ser concluídos preservando o contexto atual.

A referência aprovada é `T06 — Diário de Cuidados / Novo Registro`.

Arquitetura obrigatória:

`PAGE BASE + SCRIM + BOTTOM SHEET ANCORADO NA BORDA INFERIOR`

O Sheet:

- abre **de baixo para cima**;
- fica ancorado na borda inferior;
- mantém a página-base reconhecível;
- possui handle/alça de arraste no topo;
- fecha para baixo por gesto/dismiss em runtime quando suportado;
- possui `Cancelar` como saída explícita;
- usa validação como delta mínimo do mesmo Sheet;
- retorna ao page-base/estado de sucesso existente.

## Proibição explícita

Não interpretar este padrão como:

- menu lateral;
- drawer lateral;
- side sheet;
- formulário lateral;
- painel vindo da direita/esquerda;
- página inteira com AppHeader/Back para cadastro operacional contextual.

A direção de movimento é vertical: **bottom → up** na abertura e **down → bottom** no fechamento.

## Escopo

### Referência

- T06 — Diário / Novo Registro.

### Piloto

- T08 — Medicamentos / Cadastrar medicamento.

### Propagação após validação do piloto

- T09 — Tarefas / Nova tarefa;
- T10 — Consultas e Recomendações / Novo registro contextual;
- T11 — Compromissos / Novo compromisso.

### Fora do padrão

- T01/T02 — autenticação/cadastro de conta;
- T12 — dados da Pessoa Idosa;
- T13 — vínculo/gestão da Rede de Cuidado;
- T14 — contatos/pessoas;
- cadastros/vínculos de pessoas;
- configurações que não criam entidade operacional contextual.

## Regra de Cards, Rows e Fields

`ENTIDADE/CONTEÚDO → CARD`

`DESTINO/AÇÃO DE MENU → ROW`

`ENTRADA DE DADO → FIELD / SELECT`

Cards representam unidades de domínio/blocos informacionais. Rows representam navegação/ação. Fields/Selects são controles de formulário e não devem receber Card decorativo externo sem necessidade semântica.

## Regra global de scroll/stacking

Conteúdo rolável nunca pode atravessar visualmente `AppHeader`, `LocalSubnav` ou `NavigationBar`.

Estrutura obrigatória:

`AppHeader → LocalSubnav (quando houver) → CLIPPED CONTENT VIEWPORT → NavigationBar`

O conteúdo deve rolar somente dentro do viewport central, com clipping explícito.

Bugs confirmados a corrigir:

- T04 — Calendário/Agenda: conteúdo invadindo visualmente o cabeçalho;
- T06 — Diário: timeline/elementos roláveis passando sobre o cabeçalho.

A mesma correção deve ser aplicada em qualquer root com o mesmo defeito estrutural.

## Método de execução

`PILOTO T08 → REVISÃO VISUAL/PROTOTÍPICA → MICRO-LOTE T09/T10/T11 → AUDITORIA FINAL`

A regra global já está aprovada; o gate do piloto serve para validar a implementação concreta antes da propagação visual.

## Critérios do piloto T08

- cadastro abre como Bottom Sheet real sobre T08;
- Sheet entra de baixo para cima;
- handle no topo;
- Sheet ancorado embaixo;
- base continua reconhecível sob scrim;
- nenhum AppHeader/Back exclusivo do formulário;
- campos/conteúdo funcional preservados;
- validação = delta mínimo do mesmo Sheet;
- Cancelar retorna ao T08 base;
- salvar leva ao estado de sucesso existente;
- targets >= 48 px;
- zero overflow/clipping acidental;
- fields/selects não usam Card decorativo;
- Prototype e screenshots auditados antes da propagação.

## Proteções

Esta padronização não altera requisitos, permissões, regras de negócio, campos funcionais nem ownership.
