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

## Decisão 007 — Material Design 3 como referência máxima de UX e design visual

A partir de 2026-09-13, Material Design 3 passa a orientar decisões de **UX, hierarquia, navegação, app bars, acessibilidade, estados selecionados, papéis semânticos de cor, ergonomia, adaptação e prevenção de acionamento acidental**.

Dentro do domínio de UX/design visual, Material 3 é a referência de maior prioridade do projeto. Isto não o coloca acima de RF/RNF/US, regras de negócio ou permissões aprovadas: requisito funcional continua sendo autoridade funcional; Material 3 é autoridade de design para decidir como esse requisito deve ser apresentado e operado.

Documento canônico detalhado:

`docs/04_DESIGN_SYSTEM/MATERIAL3_VISUAL_DIRECTION.md`

Referências oficiais:

- Material Design 3: https://m3.material.io/
- Navigation Bar: https://developer.android.com/develop/ui/compose/components/navigation-bar
- Layouts and navigation patterns: https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns
- App Bars: https://developer.android.com/develop/ui/compose/components/app-bars
- Material 3 theming: https://developer.android.com/develop/ui/compose/designsystems/material3
- ColorScheme / color roles: https://developer.android.com/reference/kotlin/androidx/compose/material3/ColorScheme
- Accessibility / touch targets: https://developer.android.com/guide/topics/ui/accessibility/apps

Essas referências orientam boas práticas; não são dependências de implementação do projeto.

Regra de implementação:

`Requisito aprovado → padrão/role M3 → token semântico Rede de Apoio → Obra/shadcn/local primitives → tela`

Isto não autoriza adotar SDK Material, Jetpack Compose, Google Sans, paleta Google ou componentes Material prontos. A implementação visual continua usando os componentes disponíveis no arquivo Figma e os tokens próprios do projeto.

### Regra de precedência visual

- M3 define o padrão de UX, a hierarquia e o papel semântico.
- A identidade Rede de Apoio define valores, tom visual, Geist, iconografia e expressão.
- Obra/shadcn/componentes locais materializam a decisão; não devem ditar a UX quando conflitarem com o padrão escolhido.
- Frames históricos/CURRENT não prevalecem sobre a direção M3 aprovada.
- Tokenização tecnicamente válida não é suficiente: o papel semântico precisa estar correto.
- Se o papel M3 correto não existir, deve-se criar/mapear um token semântico apropriado em vez de vincular um token de função diferente apenas para eliminar hardcode.

### Papéis de cor e containers

Material 3 diferencia cores de acento de papéis tonais de container. Por isso, `Primary`/`Secondary` não devem ser usados automaticamente como backgrounds de containers que pedem papéis equivalentes a `Primary Container`/`Secondary Container`.

O design system deve mapear, quando aplicável:

- `On Surface` / `On Surface Variant`;
- `Primary Container` / `On Primary Container`;
- `Secondary Container` / `On Secondary Container`;
- `Surface Container` e níveis necessários;
- `Scrim`.

Os valores continuam próprios do Rede de Apoio; não copiar paleta baseline Google.

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
- o indicador selecionado deve usar papel tonal de container semanticamente adequado, não uma cor de acento forte por conveniência;
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

A superfície do Sheet pode usar papel tonal equivalente a `Surface Container` quando isso melhorar hierarquia/modalidade; branco puro não é requisito M3.

Essa decisão muda UX/IA visual; não cria RF/RNF/US, não altera permissões e não fecha P01/P03/P04/P05/P06, RF30/US-036 ou FI-001–FI-008.

### Gate obrigatório de review M3

Toda mudança visual global ou de componente compartilhado deve ser auditada contra `MATERIAL3_VISUAL_DIRECTION.md` antes do merge.

A revisão deve verificar, no mínimo:

- padrão M3 aplicado;
- papel semântico de cor/surface;
- identidade Rede de Apoio preservada;
- uso de Obra/shadcn como implementação, não como autoridade de UX;
- targets/safe areas;
- estado selecionado/feedback;
- comparação visual com a versão anterior;
- aprovação humana quando a mudança altera a linguagem global.

Um componente pode estar corretamente componentizado e tokenizado e ainda reprovar por hierarquia, tonalidade ou experiência visual.

### Bloqueio de migração

Até a `Design Foundation` ser revisada no Figma e o PR #91 passar pela calibração visual M3:

- tokens, tipografia, grid, fields, buttons, BaseCard e state architecture atuais continuam válidos;
- `AppHeader / Contextual` baseado em T06 e `BottomNavigation` atual de cinco itens ficam `DEPRECATED_FOR_NEW_MIGRATIONS`;
- nenhuma tela autenticada deve ser migrada usando esses dois padrões antigos como TARGET;
- nenhuma tela autenticada deve receber o novo AppShell enquanto o PR #91 estiver pendente de calibração/revisão humana;
- a Foundation deve preservar a arquitetura já definida e calibrar papéis tonais, especialmente o active indicator da Navigation Bar e surfaces secundárias;
- T03 deve ser usada depois como primeira prova do novo `AppShell / Root`; T01/T02 permanecem o fluxo separado de `AuthShell`.
