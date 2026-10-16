# Índice de montagem da apresentação — Milestone 2

**Projeto:** Rede de Apoio a Cuidadores de Idosos.
**Arquivo Figma:** [PROJETO REDE DE APOIO](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/) — página `Apresentação — Milestone 2 · Protótipo e Modelagem`.
**Base de modelagem:** `docs/uml/especificacao-para-figma/`, domínios A/B/C, governança D transversal, e banco SQL/EER V1 existente.
**Data da consolidação documental:** 2026-10-16.

## Estado atual

- **17 dos 19** artefatos planejados estão criados no Figma e possuem Node IDs confirmados nos registros das implementações. Estão distribuídos pela página e **não necessariamente ordenados como apresentação final**.
- **2 dos 19** artefatos (DB-D e EER-D) só existem como prévias SVG no GitHub. **Não existem frames oficiais destes dois** porque não havia ferramenta de escrita do Figma disponível nesta sessão.
- Avaliação visual preliminar foi feita nas rodadas anteriores, mas **não equivale a aprovação acadêmica final** nem garante legibilidade de cada campo dos EER panorâmicos.
- Nenhum novo diagrama de atividades ou máquinas de estados está previsto; governança D não gera UC/CL/SQ próprios.

## Ordem recomendada de apresentação

> Esta é uma ordem de montagem, **não** uma alegação de que os frames já foram movidos. O objetivo é apresentar cada domínio em ordem UC → CL → SQ → DB físico editável → EER Workbench, seguindo as regras existentes de identidade visual 16:9.

| Ordem | Domínio | ID | Conteúdo | Localização | Estado |
|---:|:---:|---|---|---|---|
| 01 | A | UC-01 | Casos de Uso — Pessoas, Identidade e Rede | [Frame 6250-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6250-3484) | Figma; revisado |
| 02 | A | CL-01 | Classes — Pessoas, Identidade e Rede | [Frame 6255-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484) | Figma; revisado |
| 03 | A | SQ-01 | Sequência — Autenticação e autorização | [Frame 6257-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484) | Figma; revisado |
| 04 | A | DB-A | Banco físico editável — Identidade e Rede | [Frame 6259-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6259-3484) | Figma; recorte seletivo |
| 05 | A | EER-A | Workbench original — Identidade e Rede | [Frame 6238-3578](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6238-3578) | Figma; exportação original |
| 06 | B | UC-02 | Casos de Uso — Organização dos Cuidados | [Frame 6262-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6262-3484) | Figma |
| 07 | B | CL-02 | Classes — Organização dos Cuidados | [Frame 6263-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484) | Figma |
| 08 | B | SQ-02 | Sequência — Troca de plantão | [Frame 6265-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484) | Figma |
| 09 | B | DB-B | Banco físico editável — Agenda, Plantões e Tarefas | [Frame 6266-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6266-3484) | Figma; recorte seletivo |
| 10 | B | EER-B | Workbench original — Agenda e Tarefas | [Frame 6268-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6268-3484) | Figma; exportação original |
| 11 | C | UC-03 | Casos de Uso — Registros e Acompanhamento | [Frame 6270-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6270-3484) | Figma |
| 12 | C | CL-03 | Classes — Registros, Saúde e Rastreabilidade | [Frame 6272-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6272-3484) | Figma |
| 13 | C | SQ-03 | Sequência — Administração de medicamento | [Frame 6273-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6273-3484) | Figma |
| 14 | C | DB-C1 | Banco físico editável — Medicação e Programação | [Frame 6275-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6275-3484) | Figma; recorte seletivo |
| 15 | C | EER-C1 | Workbench original — Medicação | [Frame 6278-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3484) | Figma; exportação original |
| 16 | C | DB-C2 | Banco físico editável — Diário, Consultas e Anexos | [Frame 6276-3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484) | Figma; recorte seletivo |
| 17 | C | EER-C2 | Workbench original — Diário e Consultas | [Frame 6278-3565](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3565) | Figma; exportação original |
| 18 | D | DB-D | Banco físico de Governança (recorte editável) | [Prévia SVG](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/docs/uml/implementacao-figma/previews/DB-D-governanca-preview.svg) | **Importação no Figma pendente** |
| 19 | D | EER-D | Workbench original — Suporte Técnico | [Lâmina de prévia](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/docs/uml/implementacao-figma/previews/EER-D-workbench-preview.svg) · [Fonte nativa](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/entrega/sql-eer/diagrama_suporte_tecnico.svg) | **Importação no Figma pendente** |

## Organização visual obrigatória

Os frames devem permanecer em 1920 × 1080 (16:9), adotando a identidade visual dos slides oficiais e Design Foundation: base clara, azul institucional, tipografia Geist confirmada nos desenhos, hierarquia de títulos, rodapé de fontes e legendas técnicas pequenas porém legíveis. Organizar os 19 artefatos em uma sequência única, sem interferir nos slides preexistentes do protótipo ou fazer alterações na página `Fluxo Final`.

### Diferença essencial: DB versus EER

- **DB-A/B/C/D**: diagramas editáveis de apresentação, seletivos, construídos a partir de tabelas físicas do SQL V1. Seleção de campos/FKs não altera o esquema real; cardinalidades físicas nas extremidades corretas.
- **EER-A/B/C/D**: exportações originais do Workbench, incorporadas aos slides como evidência nativa. Não redigitalizar nem criar um banco novo. Visão panorâmica pode exigir zoom no arquivo original.

## Fonte acadêmica e rastreabilidade

- Casos de Uso: aulas sobre atores, fronteira, objetivos e relacionamentos (slides 8–14), regras e RF/US do projeto.
- Classes: notação, operações, associações, multiplicidades e distinção domínio versus persistência (slides 16–26).
- Sequência: derivação de critérios Gherkin, linhas de vida, mensagens, guardas e fragmentos (slides 28–39).
- Revisão cruzada: coerência US → UC → classes → sequências → telas e dados (slides 53–58).
- Os contratos individuais canônicos permanecem em [especificacao-para-figma](../especificacao-para-figma/). Questões não comprovadas são pendências, não fatos aprovados.

## Checklist de fechamento (não marcar concluído por inferência)

- [ ] Importar DB-D como **objetos editáveis**, verificar oito vínculos de FK e textos contra o SQL V1.
- [ ] Importar EER-D usando a exportação nativa `diagrama_suporte_tecnico.svg`, conferir renderização e registrar Node ID real.
- [ ] Reorganizar os 19 frames no Figma na ordem acima, mantendo originais/backup preservados até a aprovação.
- [ ] Conferir a apresentação em 16:9: evitar setas soltas, cruzamentos indevidos, sobreposição de títulos/rótulos, fontes diminutas e fragmentos UML ambíguos.
- [ ] Conferir semântica de multiplicidades, papéis e mensagens contra os roteiros textuais, inclusive UC-03/CL-03/SQ-03 e a separação solicitante/destinatário no SQ-02.
- [ ] Conferir títulos/IDs, links e referências do rodapé.
- [ ] Manter EER completo como referência da persistência; prévias DB seletivas não substituem SQL canônico.
- [ ] Obter aprovação acadêmica final com a equipe/professor antes de declarar os diagramas prontos para monitoria.
- [ ] Registrar Node IDs definitivos e status no GitHub após importação/ordenação.

## Evidências e acompanhamento

- [Relatório Domínio A](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/docs/uml/implementacao-figma/dominio-A.md) · [Relatório Domínio B](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/docs/uml/implementacao-figma/dominio-B.md) · [Relatório Domínio C](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/docs/uml/implementacao-figma/dominio-C.md) · [Relatório Domínio D](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/docs/uml/implementacao-figma/dominio-D.md).
- Fonte de persistência: `entrega/sql-eer/rede_de_apoio_v1.mwb` e `entrega/sql-eer/01_schema_completo_v1.sql` (sem modificações).
- **Impedimento:** integração corrente com Figma sem capacidade de escrita; até restabelecimento, não atribuir Node ID fictício ao Domínio D, nem declarar a ordenação feita.
