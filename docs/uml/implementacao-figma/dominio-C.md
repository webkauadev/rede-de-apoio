# Implementação no Figma — Domínio C: Registros e Acompanhamento

**Status:** diagramas e vistas físicas criados no Figma e conferidos visualmente; **validação acadêmica final e ordenação na apresentação ainda pendentes**.

**Data:** 2026-10-16. **Repositório:** `webkauadev/rede-de-apoio`. **Branch:** `docs/estudo-uml-milestone2`.
**Arquivo Figma:** `tcyj2fkTXei2CJbqaRxqCp`, página `Apresentação — Milestone 2 · Protótipo e Modelagem`.
Formato nativo: **1920 × 1080 (16:9)**, mantendo a identidade visual da apresentação (Geist, azul, base clara, cabeçalho e rodapé).

## Diagramas editáveis e vistas originais

| ID | Conteúdo | Node ID | Link direto | Verificação |
|---|---|---|---|---|
| UC-03 | Casos de Uso — Registros e Governança | `6270:3484` | [Figma — UC-03](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6270-3484) | 5 papéis de atores, **12** casos de uso, 13 associações, 4 notas (N02/N03/N04 e bloqueio/auditoria). Notificações automáticas não são casos de uso. |
| CL-03 | Classes — Registros, Saúde e Rastreabilidade | `6272:3484` | [Figma — CL-03](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6272-3484) | 11 classes e **8 associações** aprovadas; R06 e R10 propositalmente omitidas conforme contrato. Anexo possui a restrição de exatamente um pai. |
| SQ-03 | Sequência — Registrar Administração de Medicamento | `6273:3484` | [Figma — SQ-03](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6273-3484) | 4 participantes, 6 mensagens e 1 `alt`. No caminho negado, não há administração nem N03; a nota N03 foi posicionada exclusivamente junto ao caminho autorizado. |
| DB-C1 | Banco Físico editável — Medicação e Programação | `6275:3484` | [Figma — DB-C1](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6275-3484) | 5 tabelas físicas; FKs principais entre medicamento, regime, horário, ocorrência e administração. Apresenta a possibilidade de administração avulsa e origem exclusiva de ocorrência. |
| DB-C2 | Banco Físico editável — Diário, Consultas e Anexos | `6276:3484` | [Figma — DB-C2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484) | 7 tabelas físicas; relações internas principais entre originais/correções, recomendações e anexos. Relações externas permanecem indicadas em nota. |
| EER-C1 | **SVG original** MySQL Workbench — Medicação | `6278:3484` | [Figma — EER-C1](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3484) | Fonte [`diagrama_medicacao.svg`](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/entrega/sql-eer/diagrama_medicacao.svg) incorporada como vetores por `createNodeFromSvg`. |
| EER-C2 | **SVG original** MySQL Workbench — Diário e Consultas | `6278:3565` | [Figma — EER-C2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3565) | Fonte [`diagrama_diario_consultas.svg`](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/entrega/sql-eer/diagrama_diario_consultas.svg) incorporada como vetores por `createNodeFromSvg`. |

## Fontes e rastreabilidade acadêmica

- **UC-03:** `../especificacao-para-figma/dominio-C-registros/UC-03.md`; RF11–19, RF23, RF25–29, RNF01–03; US-015–022, US-027, US-029–036. Aulas: slides 8–14 e 53–58.
- **CL-03:** `../especificacao-para-figma/dominio-C-registros/CL-03.md`; RF11–19, RF23, RF25–29, RN-005–011 e RNF01–03; conceitos de composição não presumidos. Aulas: slides 16–26 e 34.
- **SQ-03:** `../especificacao-para-figma/dominio-C-registros/SQ-03.md`; US-019, US-029; mensagens M-01–M-06 e `alt` permitido/negado. Aulas: slides 28–39 e 34.
- **Persistência:** `entrega/sql-eer/rede_de_apoio_v1.mwb`, `entrega/sql-eer/01_schema_completo_v1.sql` e exportações citadas. FKs e campos foram consultados no SQL consolidado. **O SQL físico não se confunde com o diagrama de classes UML.**
- **DB-C1/DB-C2 são recortes seletivos** com tabelas e vínculos físicos relevantes para apresentação, não diagramas exaustivos de todas as FKs. Consultar as exportações EER originais e o SQL para o modelo completo.

## Integridade das exportações originais

O conteúdo original SVG foi transportado do GitHub ao Figma, conferido e importado sem redesenho semântico:

- `diagrama_medicacao.svg`: 259.422 caracteres de conteúdo SVG original; importação vetorial preservada no EER-C1.
- `diagrama_diario_consultas.svg`: 280.979 caracteres de conteúdo SVG original; importação vetorial preservada no EER-C2.
- A área utilizada pelo SVG foi medida para ajustar o zoom, evitando apresentação minúscula em razão de margens internas da exportação.
- Os quadros temporários utilizados somente para transferência foram **removidos**. Permanecem os SVGs importados nos slides finais.
- Os modelos `.mwb`, as exportações em `entrega/sql-eer` e o SQL V1 **não foram alterados**.

## Verificação visual e limitações

Foram inspecionadas capturas reais dos slides de UC-03, CL-03, SQ-03, DB-C1, DB-C2, EER-C1 e EER-C2. As associações foram traçadas considerando os contornos dos elementos e reduzindo entrelaçamento de conexões. A técnica foi baseada na revisão geométrica já utilizada nos domínios A e B.

**Pendências:**
1. Aprovação acadêmica final pela equipe/professor e leitura em tamanho de apresentação.
2. Os frames foram adicionados à página existente, mas **não foram colocados automaticamente na ordem definitiva** da apresentação; os anteriores foram preservados.
3. Os EER-C1 e EER-C2 são vistas panorâmicas: a inspeção de cada campo pequeno deve ser feita em zoom no SVG integral/Workbench.
4. DB-C1 e DB-C2 omitem campos e FKs menos relevantes para garantir legibilidade; não são substitutos do esquema SQL completo.
5. Qualquer inconsistência posterior observada entre um campo exibido e o SQL deve ser corrigida no recorte Figma sem alterar a fonte canônica.

Não há diagramas de atividades ou de máquinas de estados nesta entrega. Não foi criado banco independente para o Domínio C. A etapa D (governança transversal) deve ser tratada separadamente.
