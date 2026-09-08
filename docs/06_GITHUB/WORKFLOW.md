# Workflow GitHub

Fluxo recomendado para Issues/entregas:

`Open / Backlog → Doing → Review/Validation → Closed`

A visualização pode ser feita com GitHub Projects/labels, preservando a semântica dos quatro estados.

## Regras

- não mover Issues apenas para maquiar métricas;
- manter histórico de trabalho real;
- toda entrega deve ter origem rastreável;
- Pull Request é o gate de revisão para alterações versionadas;
- alterações de design por agente não fazem auto-merge;
- requisito ou US ausente no GitHub é `migration_required`, não uma autorização para consultar sistema externo.

## Definition of Done

Antes de fechar uma entrega:

- requisito/US relacionados estão presentes e referenciados no GitHub;
- critérios de aceitação aplicáveis foram verificados;
- protótipo/Figma foi atualizado quando aplicável;
- registries foram atualizados;
- auditoria relevante passou;
- PR foi revisado quando houve mudança versionada;
- rastreabilidade permaneceu preservada.

## Métricas

Quando o time usar GitHub Projects, acompanhar sem movimentações artificiais:

- Lead Time;
- Cycle Time;
- Throughput;
- WIP.
