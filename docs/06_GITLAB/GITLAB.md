# GitLab Workflow

## Modelo

GitLab representa a rastreabilidade oficial do trabalho.

Estrutura:

RF/RNF
↓
US
↓
Issue
↓
Tela/protótipo

## Regras

- RF e RNF são Issues de requisito.
- US são Issues de história.
- Cada US possui um requisito de origem.
- Um requisito pode possuir várias US.
- Não criar Tasks para substituir US.

## Workflow

Estados:

- Opened
- Doing
- Closed

Uma issue só deve ser fechada após validação da entrega.

## Métricas

Controlar:

- Lead Time
- Cycle Time
- Throughput
- WIP

Evitar movimentações artificiais para não contaminar métricas.

## Relacionamentos

Usar links entre issues para manter:

RF → US → entrega.
