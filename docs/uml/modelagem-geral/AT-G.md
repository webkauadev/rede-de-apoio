# AT-G — Atividades gerais do cuidado colaborativo

[Figma: diagrama editável AT-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6431-3326) · Frame `6431:3326`, 3800×3920 px · 3 partições, 10 ações principais, 3 decisões, 2 ações de saída alternativa.

## Objetivo e fronteira
Da criação pendente do perfil até acompanhamento e eventual correção versionada de uma execução de cuidado. **É um recorte de processo; não equivale a todas as telas nem a ciclo de estados de um objeto.**

Partições: Familiar Iniciador / Principal; Sistema / Serviços; Responsável Autorizado. O primeiro nome expressa que o bootstrap antecede a concessão persistida do papel Principal.

## Grafo de ações
- `A01` cadastrar perfil pendente.
- `D01` mínimos de constituição? **Sim:** `A02` constituir rede operacional com exatamente um Familiar Principal vigente e pelo menos um Profissional, de forma atômica; **não:** `E01` manter perfil pendente e sem acesso ao cuidado → fim alternativo.
- `A03` organizar plantões, tarefas e regime.
- `A04` gerar programação validando horário/responsável conforme as regras de recorrência.
- `A05` consultar dia e executar cuidado real.
- `D02` autorização/contexto válido? **Sim:** `A06` informar execução; **não:** `E02` negar e auditar, sem fato clínico criado → fim alternativo.
- `A07` persistir original imutável, autoria e tempo.
- `A08` acompanhar histórico autorizado.
- `D03` correção necessária? **Não:** fim; **sim:** `A09` criar correção justificada sob permissão efetiva → `A10` persistir nova versão preservando original e auditar → fim.

## Ressalvas auditáveis
- N02 só é dirigido ao responsável *designado e elegível* no instante. Não é um ator nem uma ação exigida para todo cuidado; N04 em H+15 na ausência de confirmação não demonstra omissão clínica (DB-030/031).
- A proposta representa o fluxo principal **sem prometer** que todos esses caminhos estão navegáveis no protótipo atual (ver AUD-M2-013).
- Fontes: [regras RN-001/003/004/005/006/008/010](../../02_BUSINESS_RULES/BUSINESS_RULES.md), [decisões DB-001/002/008/011/021/030/031/034/035/038](../../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md), UC-01/02/03, aulas atividades 41–46.
- **Inspeção visual 2026-10-27:** legenda da pré-condição e três raias conferidas em captura do frame após alteração.

**Pendente:** validar com equipe/professor semântica das raias, realização de cuidado versus registro de fato, e visibilidade em projetor.
