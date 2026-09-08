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
