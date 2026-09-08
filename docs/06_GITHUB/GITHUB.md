# GitHub Workflow — Fonte Única Operacional

## Modelo

O repositório `webkauadev/rede-de-apoio` representa a fonte única operacional do projeto para:

- RF e RNF;
- User Stories;
- Issues e tarefas;
- responsáveis e prioridades;
- critérios de aceitação;
- decisões e rastreabilidade;
- contexto para agentes de IA;
- commits e Pull Requests.

O Figma é canônico apenas para o design visual vigente.

## Registry canônico de Issues

`ISSUE_REGISTRY.yaml` é a ponte máquina entre identificadores do projeto e as Issues reais do GitHub:

`RF/RNF/US/P## → GitHub Issue`

Antes de procurar por texto livre, um agente deve consultar:

1. `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml`;
2. `docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml`;
3. `docs/06_GITHUB/ISSUE_REGISTRY.yaml`;
4. a Issue canônica indicada;
5. `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md` quando houver bloqueio.

Cobertura atual:

- RF01–RF30: Issues #5–#34;
- RNF01/RNF03: Issues #35/#36;
- US-001–US-035: Issues #37–#71;
- US-036 proposta: #72;
- P01–P09: Issues #73–#81, com P07/#79 fechada.

## Cadeia de rastreabilidade

`RF/RNF → US → Issue/Entrega → Tela → Estado → Componente → PR`

Regras:

- cada RF/RNF usado pelo projeto deve ter Issue canônica no registry;
- cada US oficial deve ter Issue canônica;
- cada US possui exatamente um requisito de origem quando essa origem estiver canonicamente definida;
- um RF/RNF pode originar várias US;
- `candidate_origin` significa hipótese rastreada e nunca substitui origem confirmada;
- uma entrega deve referenciar US/Requisitos/Issues que atende;
- não criar Task para substituir uma User Story;
- Pull Requests de design devem referenciar Issues e nodes do Figma envolvidos.

## Política de lacunas

Se um agente precisar de requisito, RNF, US ou critério cujo conteúdo não está documentado:

1. resolver o identificador/Issue existente pelo registry;
2. marcar o campo ausente como `migration_required`;
3. não consultar tracker externo;
4. não reconstruir texto de memória;
5. não inventar critérios;
6. permitir somente decisões visuais/estruturais que não dependam da lacuna funcional;
7. referenciar a pendência P## aplicável no PR.

Ter uma Issue `migration_required` significa que a **entidade e a dívida existem no GitHub**; não significa que o conteúdo faltante foi aprovado.

## Pull Requests

Alterações automatizadas podem chegar até Pull Request, mas o merge continua humano por padrão.

O PR deve registrar:

- T## e responsável;
- RF/RNF/US/P## e Issues relacionados;
- nodes do Figma;
- estados alterados;
- componentes reutilizados/criados;
- `migration_required` e `candidate_origin` relevantes;
- resultado da auditoria visual/estrutural.
