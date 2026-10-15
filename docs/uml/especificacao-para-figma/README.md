# Especificação UML para montagem no Figma

Status global: **PRONTA PARA VALIDAÇÃO**. Esta pasta é o contrato textual dos nove diagramas aprovados para a Milestone 2. Ela não é um diagrama, não altera RF/RNF/US e não substitui o EER existente.

## Leitura e ordem de uso

1. [Fontes e padrões](00-fontes-e-padroes.md), [glossário](00-glossario.md) e [governança transversal](00-governanca-transversal.md).
2. A especificação do diagrama a montar.
3. [Matriz de rastreabilidade](00-matriz-rastreabilidade.md), [mapeamento EER](00-mapeamento-eer.md) e [pendências](00-pendencias.md).

Cada especificação individual termina em **Contrato de montagem visual** e **Mapa integral de elementos e conexões**. A montagem visual pode decidir apenas disposição, hierarquia e tamanho; não pode criar semântica nova.

## Portfólio

| Domínio | Casos de uso | Classes | Sequência |
|---|---|---|---|
| A — Pessoas, Identidade e Rede | [UC-01](dominio-A-pessoas-rede/UC-01.md) | [CL-01](dominio-A-pessoas-rede/CL-01.md) | [SQ-01](dominio-A-pessoas-rede/SQ-01.md) |
| B — Organização dos Cuidados | [UC-02](dominio-B-organizacao/UC-02.md) | [CL-02](dominio-B-organizacao/CL-02.md) | [SQ-02](dominio-B-organizacao/SQ-02.md) |
| C — Registros, Saúde e Rastreabilidade | [UC-03](dominio-C-registros/UC-03.md) | [CL-03](dominio-C-registros/CL-03.md) | [SQ-03](dominio-C-registros/SQ-03.md) |

O DER/EER complementar canônico é `entrega/sql-eer/rede_de_apoio_v1.mwb`; sua correspondência está em [00-mapeamento-eer.md](00-mapeamento-eer.md).
