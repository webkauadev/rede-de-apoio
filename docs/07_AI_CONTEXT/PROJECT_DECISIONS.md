# Decisões do Projeto

## Decisão 001 — Estados de tela

Estados não são telas independentes.

Regra:

`STATE = PAGE BASE + DELTA MÍNIMO`

## Decisão 002 — shadcn

Usar shadcn como base de primitives e variantes, mantendo identidade visual própria do Rede de Apoio.

## Decisão 003 — Pessoa Idosa

Acesso próprio somente leitura é uma evolução de escopo.

Enquanto RF30/US-036 não forem aprovados no GitHub, tratar como proposta controlada.

## Decisão 004 — Plantonista Atual

Não é usuário nem perfil. É condição operacional temporária.

## Decisão 005 — Rastreabilidade

Toda alteração de tela deve conseguir responder:

`RF/RNF → US → Tela → Estado → Componente → Entrega/PR`

Caso não exista origem canônica, registrar como proposta de mudança de escopo ou `migration_required` conforme o caso.

## Decisão 006 — GitHub como fonte única operacional

O repositório `webkauadev/rede-de-apoio` é a única fonte operacional para:

- RF e RNF;
- User Stories;
- Issues e tarefas;
- critérios de aceitação;
- responsáveis, prioridades e status;
- regras/decisões versionadas;
- contexto consumido por agentes de IA;
- commits e Pull Requests.

O Figma permanece canônico somente para o design visual vigente.

Sistemas legados ou trackers externos não fazem parte do fluxo dos agentes. Se uma informação funcional ainda não estiver no GitHub, ela deve ser marcada `migration_required` até ser migrada e revisada aqui. O agente não pode consultar outro tracker nem preencher a lacuna por inferência.

## Decisão 007 — Material Design 3 como referência de UX

A partir de 2026-09-13, Material Design 3 passa a orientar decisões de **UX, hierarquia, navegação, app bars, acessibilidade, estados selecionados e prevenção de acionamento acidental**.

Referências oficiais:

- Material Design 3: https://m3.material.io/
- Navigation Bar: https://developer.android.com/develop/ui/compose/components/navigation-bar
- App Bars: https://developer.android.com/develop/ui/compose/components/app-bars
- Navigation Drawer: https://developer.android.com/develop/ui/compose/components/drawer
- Core app quality / touch targets: https://developer.android.com/develop/adaptive-apps/quality-guidelines/core-app-quality

Essas referências orientam boas práticas; não são dependências de implementação do projeto.

Regra de implementação:

`Material 3 UX principles → Obra/shadcn/local primitives → identidade Rede de Apoio`

Isto não autoriza adotar SDK Material, Jetpack Compose, Google Sans, paleta Google ou componentes Material prontos. A implementação visual continua usando os componentes disponíveis no arquivo Figma e os tokens próprios do projeto.

### Header autenticado alvo

O padrão atual baseado principalmente em `T06 / Header / Pessoa` deixa de ser referência global TARGET. O novo direcionamento exige:

- `AppHeader / Root`: título da página como informação primária, contexto da Pessoa Idosa como informação secundária quando aplicável e ação global deliberada de Configurações;
- `AppHeader / Back`: voltar + título explícito da subpágina + contexto/ação secundária apenas quando necessário e autorizado;
- avatar pode permanecer como contexto, mas não pode ser o único conteúdo que define o cabeçalho;
- qualquer ação de app bar deve possuir target mínimo de 48 × 48 px e padding seguro em relação à borda física da tela.

### Navigation Bar alvo

A navegação primária mobile passa a ter quatro destinos:

`Home · Agenda · Diário · Saúde`

`Mais` deixa de fazer parte do TARGET porque é um agrupador de destinos secundários, não um destino singular de importância equivalente.

Regras:

- Configurações não substitui `Mais` na Navigation Bar;
- cada destino usa ícone + label;
- o estado selecionado deve ser perceptível por indicador/surface + ícone/label, não somente por cor;
- targets mínimos de 48 × 48 px;
- distribuição equilibrada e respeito a safe areas.

### Configurações e gestão

T12–T17 continuam existindo com o mesmo escopo funcional. O que muda é a superfície de acesso.

A entrada TARGET é uma ação `Configurações` no `AppHeader / Root`, abrindo uma superfície secundária inspirada em modal navigation drawer do Material 3 e implementada com `Sheet` local/Obra/shadcn quando adequado.

Destinos a organizar nesse Sheet:

- T12 — Pessoa Idosa;
- T13 — Rede de Cuidado;
- T14 — Contatos Importantes;
- T15 — Informações de Emergência;
- T16 — Preferências;
- T17 — Auditoria.

Essa decisão muda UX/IA visual; não cria RF/RNF/US, não altera permissões e não fecha P01/P03/P04/P05/P06, RF30/US-036 ou FI-001–FI-008.

### Bloqueio de migração

Até a `Design Foundation` ser revisada no Figma:

- tokens, tipografia, grid, fields, buttons, BaseCard e state architecture atuais continuam válidos;
- `AppHeader / Contextual` baseado em T06 e `BottomNavigation` atual de cinco itens ficam `DEPRECATED_FOR_NEW_MIGRATIONS`;
- nenhuma tela autenticada deve ser migrada usando esses dois padrões antigos como TARGET;
- a próxima alteração visual deve primeiro materializar `AppHeader / Root`, Navigation Bar de quatro destinos e Settings/Management Sheet na Foundation;
- T03 deve ser usada depois como primeira prova do novo `AppShell / Root`; T01/T02 permanecem o fluxo separado de `AuthShell`.
