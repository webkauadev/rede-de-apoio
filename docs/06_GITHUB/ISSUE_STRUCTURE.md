# Estrutura de Issues no GitHub

## Modelo oficial

A rastreabilidade operacional deve permanecer dentro do GitHub:

`RF/RNF → US → Entrega/PR`

### Requisito

RF e RNF aprovados devem possuir identidade estável (`RF##` / `RNF##`) e referência canônica no repositório. Quando forem acompanhados por Issue, usar título/label que preserve o identificador.

### User Story

Cada US deve manter o identificador `US-0NN` e conter, no mínimo:

- enunciado `Como / Quero / Para`;
- exatamente um RF ou RNF de origem;
- ator;
- critérios de aceitação;
- responsável;
- links para entregas/PRs quando existirem.

Um requisito pode originar várias US. Uma US não pode ter dois requisitos de origem.

### Entrega / tarefa

Uma tarefa de implementação, design ou documentação pode existir como Issue própria, mas não substitui a US. Deve referenciar a US/requisito que atende.

## Relacionamento

Preferir links explícitos no corpo das Issues/PRs e labels/Projects para permitir busca automática.

Exemplo:

`RF11 → US-015 → T06 → design/t06-* → PR`

## Conteúdo ainda não migrado

Se o texto canônico de uma US/RNF não existir no GitHub, o item deve aparecer nos registries como `migration_required`. O agente não deve usar outra plataforma para preencher a lacuna.

## Critério de conclusão

Uma Issue de entrega só deve ser fechada após validação da entrega e preservação da rastreabilidade. Uma lacuna de migração não é considerada resolvida até o conteúdo canônico estar no GitHub.
