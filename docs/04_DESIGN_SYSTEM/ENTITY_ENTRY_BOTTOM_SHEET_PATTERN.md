# Padrão Canônico — Cadastro Operacional em Bottom Sheet

Status: **CANÔNICO / APROVADO**  
Aprovado por decisão humana em 2026-09-15.

## Objetivo

Padronizar toda criação/cadastro de **entidade operacional contextual** no aplicativo Rede de Apoio sem abrir uma nova página de formulário quando a tarefa pode ser concluída mantendo o contexto atual.

Referência visual e comportamental: `T06 — Diário de Cuidados / Novo Registro`.

## Regra principal

Para criação/registro de entidade operacional contextual à tela atual, usar obrigatoriamente:

`PAGE BASE + SCRIM + BOTTOM SHEET ANCORADO NA BORDA INFERIOR`

O Bottom Sheet:

- **abre de baixo para cima**;
- permanece ancorado na borda inferior do viewport;
- mantém a tela atual reconhecível no fundo;
- usa `Color/Scrim` atrás do Sheet;
- possui handle/alça de arraste no topo;
- fecha ao arrastar o handle para baixo em runtime quando o framework suportar o gesto;
- oferece `Cancelar` como saída explícita equivalente;
- não cria rota/página-base artificial apenas para o formulário;
- usa estado de validação como **delta mínimo do mesmo Sheet**;
- retorna à página-base ou ao estado de sucesso da própria tela após salvar.

### Proibições explícitas

Este padrão **NÃO** é:

- drawer lateral;
- menu lateral;
- side sheet;
- painel que entra da direita/esquerda;
- modal central genérico;
- página inteira de cadastro com `AppHeader / Back`, quando a criação é contextual.

A direção de entrada/saída é vertical: **bottom → up** para abrir e **down → bottom** para dismiss.

## Escopo

### Deve usar Bottom Sheet

- T06 — Diário / Novo Registro;
- T08 — Medicamentos / Cadastrar medicamento;
- T09 — Tarefas / Nova tarefa;
- T10 — Consultas e Recomendações / Novo registro contextual;
- T11 — Compromissos / Novo compromisso;
- outros cadastros futuros de entidade operacional contextual que preservem a mesma lógica.

### Fora deste padrão

- T01/T02 — autenticação e cadastro de conta;
- criação/vinculação de pessoas;
- T12 — dados da Pessoa Idosa;
- T13 — gestão da Rede de Cuidado;
- T14 — contatos/pessoas;
- fluxos de configuração que não representam criação de entidade operacional contextual.

## Cards, Rows e Fields

Aplicar a seguinte regra de decisão:

`ENTIDADE/CONTEÚDO → CARD`

`DESTINO/AÇÃO DE MENU → ROW`

`ENTRADA DE DADO → FIELD / SELECT`

### Card

Usar Card quando o conteúdo representa uma unidade de domínio ou bloco informacional que precisa de contenção própria, por exemplo medicamento, tarefa, compromisso ou registro de cuidado.

Não usar Card apenas para transformar uma ação simples de navegação em um bloco elevado.

### Row

Usar Navigation/Action Row quando o elemento é principalmente destino, escolha ou ação de menu.

- target mínimo 48 px;
- superfície herdada/transparent por padrão;
- trailing chevron quando indicar navegação/abertura de escolha;
- não encapsular cada row em Card sem justificativa semântica.

### Field / Select

Input, Select, Textarea, Date e Time são controles de formulário, não Cards.

- usar primitive/instance existente;
- trailing chevron em Select quando apropriado;
- não adicionar Card decorativo externo apenas para contorno;
- surface de agrupamento só quando houver significado real de seção.

## Regra de scroll e stacking do AppShell

Conteúdo rolável nunca pode atravessar visualmente o `AppHeader`, `LocalSubnav` ou `NavigationBar`.

Para telas Root com subnav:

`AppHeader → LocalSubnav → CLIPPED CONTENT VIEWPORT → NavigationBar`

Obrigatório:

- conteúdo começa abaixo do Header/Subnav aplicável;
- conteúdo termina acima da NavigationBar;
- viewport de conteúdo possui clipping explícito;
- scroll vertical ocorre somente dentro dessa janela;
- Header/Subnav/Nav permanecem acima do conteúdo rolável;
- nenhuma timeline/card/lista pode aparecer sobre o Header ao rolar.

### Bugs explicitamente cobertos

- T04 — Agenda/Calendário: corrigir invasão visual do conteúdo sobre o cabeçalho;
- T06 — Diário: corrigir timeline/elementos roláveis passando por cima do cabeçalho;
- propagar a mesma correção para qualquer root que apresente o mesmo defeito estrutural.

## Execução segura

Mudança profunda de padrão deve seguir:

`PILOTO → REVISÃO → PROPAGAÇÃO EM MICRO-LOTE → AUDITORIA FINAL`

Piloto vigente: **T08 — Medicamentos**.

Depois de validado visual e prototipicamente, propagar para T09/T10/T11 sem alterar conteúdo funcional ou regras de negócio.

## Critérios mínimos do Bottom Sheet

- abre de baixo para cima;
- handle visível no topo;
- Sheet ancorado na borda inferior;
- fundo reconhecível sob scrim;
- largura respeita viewport/margens/safe area;
- target mínimo 48 × 48 px;
- `Cancelar` fecha/retorna ao page-base;
- validação permanece no mesmo Sheet;
- salvar leva ao estado de sucesso existente;
- não existe `AppHeader / Back` exclusivo do formulário;
- zero overflow/clipping acidental;
- campos não usam Card decorativo;
- screenshot e Prototype auditados antes da propagação.

## Proteção de escopo

Esta regra é visual/estrutural e não autoriza:

- alterar requisitos;
- alterar permissões;
- adicionar/remover campos funcionais;
- inventar novas entidades;
- modificar regras de negócio;
- reinterpretar cadastro de pessoa como cadastro operacional.
