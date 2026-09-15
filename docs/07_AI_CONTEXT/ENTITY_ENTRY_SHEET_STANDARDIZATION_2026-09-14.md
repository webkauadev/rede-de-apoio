# Padronização de Entrada de Entidades — Piloto

Status: **PILOTO EM EXECUÇÃO — NÃO PROPAGAR SEM REVISÃO HUMANA**

Data: 2026-09-14

## Objetivo

Padronizar fluxos de criação/cadastro de **entidades operacionais do aplicativo** sem transformar cada criação em uma nova tela de página inteira.

A referência aprovada é o comportamento de `Novo Registro` em T06 — Diário de Cuidados: a página-base permanece reconhecível e a entrada de dados acontece em um **modal bottom Sheet ancorado na borda inferior do viewport**, sobre `Color/Scrim`.

O bottom Sheet **entra de baixo para cima** e fecha no sentido inverso. Deve possuir handle/alça visível no topo e permitir dismiss ao arrastar essa região para baixo na implementação/protótipo quando tecnicamente suportado.

**Não confundir este padrão com drawer/menu lateral, painel lateral, dialog central ou nova página de formulário. Nenhum destes substitui o bottom Sheet neste fluxo.**

Esta regra não se aplica a cadastro/autenticação de conta nem a criação/vinculação de pessoas.

## Escopo inicial

### Referência já existente

- T06 — Diário de Cuidados / Novo Registro

### Piloto

- **T08 — Medicamentos / Cadastrar medicamento**

### Candidatas à propagação após aprovação do piloto

- T09 — Tarefas / Nova tarefa
- T10 — Consultas e Recomendações / Novo registro
- T11 — Compromissos / Novo compromisso

### Fora deste padrão

- T01/T02 — autenticação/cadastro de conta
- T12 — dados da Pessoa Idosa
- T13 — vínculo/gestão de membros da Rede de Cuidado
- T14 — contatos/pessoas
- fluxos de configuração que não criam entidade operacional

## Regra de arquitetura

Para criação/registro de entidade operacional contextual à tela atual:

`PAGE BASE + SCRIM + BOTTOM SHEET ANCORADO EMBAIXO`

Não criar novo page-base apenas para o formulário quando a tarefa é contextual e pode ser concluída sem perder o contexto da lista atual.

O Sheet deve:

- nascer visualmente da borda inferior e ocupar apenas a altura necessária/permitida do viewport;
- manter a página-base reconhecível atrás do scrim;
- usar `Color/Scrim` no plano de fundo;
- usar `Color/Surface Container Low` ou papel semântico equivalente na superfície;
- possuir handle/alça visual de arraste no topo;
- respeitar largura, margem e safe area do viewport;
- permitir saída por `Cancelar`, gesto de arrastar para baixo e ação de salvar;
- manter validação como **delta mínimo do mesmo Sheet**;
- retornar para a página-base/estado de sucesso sem criar rota nova artificial;
- nunca abrir pela lateral e nunca substituir o page-base por uma tela integral de formulário.

No protótipo Figma, o comportamento esperado é bottom-up/down-dismiss. Se alguma limitação técnica impedir a física completa do gesto, a composição visual e os destinos de `Cancelar`/Salvar ainda devem preservar esse contrato; a limitação deve ser registrada, não reinterpretada como drawer lateral ou página cheia.

## Regra de Cards, Rows e Fields

### Card

Usar Card quando o conteúdo é uma **unidade de domínio ou bloco informacional** que precisa de contenção visual própria, por exemplo:

- medicamento cadastrado;
- tarefa;
- compromisso;
- registro de cuidado;
- resumo/status com múltiplos atributos relacionados.

Cards não devem ser usados apenas para transformar uma ação simples de navegação em um bloco elevado.

### Navigation/Action Row

Usar row sem Card persistente quando o elemento é principalmente uma **destinação, escolha ou ação de menu**, com label e eventual supporting text/trailing icon.

Padrão:

- superfície herdada/transparent na área de menu;
- target mínimo 48 px;
- trailing chevron apenas quando indica navegação/abertura de escolha;
- não envolver cada row em Card individual sem justificativa semântica.

### Form Field / Select

Campos e selects são controles de formulário, não Cards.

- Input/Select/Textarea/Date/Time devem usar o primitive/instance apropriado;
- Select pode usar trailing chevron como affordance;
- não colocar o campo dentro de um Card decorativo só para criar contorno adicional;
- agrupamento de campos pode usar seção/surface quando houver significado de agrupamento, não por padrão.

### Regra de decisão curta

`ENTIDADE/CONTEÚDO → CARD`

`DESTINO/AÇÃO DE MENU → ROW`

`ENTRADA DE DADO → FIELD/SELECT`

## Regra de scroll e stacking

Conteúdo rolável nunca pode atravessar visualmente AppHeader, LocalSubnav ou NavigationBar.

Para telas Root com subnav:

`AppHeader → LocalSubnav → CLIPPED CONTENT VIEWPORT → NavigationBar`

O viewport de conteúdo deve:

- começar abaixo do LocalSubnav;
- terminar acima da NavigationBar;
- ter clipping explícito;
- conter o scroll vertical dentro dessa janela;
- preservar a camada de Header/Subnav/Nav acima do conteúdo rolável;
- impedir que cards/timeline/listas sejam desenhados sobre o AppHeader durante a rolagem.

**T04 — Calendário de Cuidados e T06 — Diário de Cuidados são casos confirmados para revisão deste invariant**, pois o defeito foi observado durante a rolagem e não deve ser tratado como exceção local.

## Método de execução

Seguir obrigatoriamente:

`PILOTO T08 → REVISÃO HUMANA → EXTRAÇÃO/CONFIRMAÇÃO DO PADRÃO → MICRO-LOTE T09/T10/T11 → AUDITORIA FINAL`

Não propagar o Sheet para todas as telas antes da aprovação do piloto.

A correção do invariant de scroll pode ser auditada em T04/T06 durante o piloto, mas só deve ser promovida como regra global depois de validada sem regressão de Header/Subnav/NavigationBar.

## Critérios de aceite do piloto T08

- cadastro de medicamento abre como bottom Sheet ancorado na borda inferior;
- animação/direção conceitual de abertura é de baixo para cima;
- handle/alça no topo comunica que o Sheet pode ser arrastado para baixo para fechar;
- T08 permanece reconhecível no fundo;
- não existe AppHeader/Back exclusivo do formulário;
- não existe drawer/menu lateral;
- não existe página integral exclusiva para o formulário;
- campos existentes e conteúdo funcional são preservados;
- validações continuam como delta mínimo;
- Cancelar retorna ao T08 page-base;
- salvar segue para estado de sucesso existente;
- target mínimo de interação = 48 px;
- nenhum overflow/clipping acidental;
- padrão visual de Field/Select não usa Card decorativo;
- screenshot/review board produzido antes da propagação.

## Proteções de escopo

Esta padronização é visual/estrutural e não autoriza:

- alterar requisitos ou permissões;
- adicionar campos não existentes;
- remover validações funcionais;
- inventar novas entidades;
- mudar regras de negócio;
- transformar vínculo de pessoa em cadastro operacional.

## Gate

Até revisão humana do piloto T08, este documento registra uma **direção de padronização em validação**. A promoção para regra global em `COMPONENT_MAP.yaml`/estratégia de migração deve acontecer somente após o piloto ser aprovado.
