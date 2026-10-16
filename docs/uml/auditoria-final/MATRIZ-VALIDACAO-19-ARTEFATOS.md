# Matriz de validação dos 19 artefatos

Data: 2026-10-16. PASS significa conformidade no critério e recorte examinados; não é homologação acadêmica formal. FAIL inclui P2 material de apresentação/documentação e não significa que todo o artefato esteja errado. Havendo FAIL e pendência na mesma linha, o resultado agregado é FAIL. SQL direto não foi forçado em casos de uso; serviços de sequência não são tabelas.

**19 inspecionados diretamente; 1 PASS, 18 FAIL, 0 exclusivamente pendentes.** Os 13 achados são agrupados, não 13 diagramas.

| Domínio | Artefato / Node | Conformidade UML | Lógica funcional | Relações/cardinalidades | SQL/EER | Apresentação | Consistência cruzada | Resultado | Achados |
|---|---|---|---|---|---|---|---|---|---|
| A | [UC-01](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6250-3484) `6250:3484` | PASS | PASS | PASS | NÃO APLICÁVEL | PASS | PASS | PASS | 011 |
| A | [CL-01](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484) `6255:3484` | FAIL | FAIL | PASS | FAIL | FAIL | FAIL | FAIL | 005, 007, 008, 011 |
| A | [SQ-01](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484) `6257:3484` | FAIL | PASS | PASS | NÃO APLICÁVEL | PASS | FAIL | FAIL | 004, 005, 010, 011 |
| A | [DB-A](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6259-3484) `6259:3484` | NÃO APLICÁVEL | PASS | PASS | FAIL | PASS | PASS | FAIL | 009, 011 |
| A | [EER-A](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6238-3578) `6238:3578` | NÃO APLICÁVEL | FAIL | FAIL | FAIL | FAIL | FAIL | FAIL | 003, 008 |
| B | [UC-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6262-3484) `6262:3484` | PASS | PASS | PASS | NÃO APLICÁVEL | FAIL | PENDENTE DE EVIDÊNCIA | FAIL | 008, 013 |
| B | [CL-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484) `6263:3484` | FAIL | FAIL | FAIL | PASS | FAIL | FAIL | FAIL | 001, 008 |
| B | [SQ-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484) `6265:3484` | FAIL | FAIL | PASS | NÃO APLICÁVEL | PASS | PENDENTE DE EVIDÊNCIA | FAIL | 004, 006, 013 |
| B | [DB-B](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6266-3484) `6266:3484` | NÃO APLICÁVEL | PASS | PASS | FAIL | PASS | PASS | FAIL | 009 |
| B | [EER-B](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6268-3484) `6268:3484` | NÃO APLICÁVEL | FAIL | FAIL | FAIL | PASS | FAIL | FAIL | 003 |
| C | [UC-03](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6270-3484) `6270:3484` | PASS | PASS | PASS | NÃO APLICÁVEL | FAIL | PENDENTE DE EVIDÊNCIA | FAIL | 008, 013 |
| C | [CL-03](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6272-3484) `6272:3484` | PASS | PASS | PASS | PASS | FAIL | FAIL | FAIL | 008, 010 |
| C | [SQ-03](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6273-3484) `6273:3484` | FAIL | PASS | PASS | PASS | PASS | PENDENTE DE EVIDÊNCIA | FAIL | 004, 010, 013 |
| C | [DB-C1](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6275-3484) `6275:3484` | NÃO APLICÁVEL | PASS | PASS | FAIL | PASS | PASS | FAIL | 009 |
| C | [EER-C1](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3484) `6278:3484` | NÃO APLICÁVEL | FAIL | FAIL | FAIL | PASS | FAIL | FAIL | 003 |
| C | [DB-C2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484) `6276:3484` | NÃO APLICÁVEL | FAIL | FAIL | FAIL | PASS | FAIL | FAIL | 002, 009, 012 |
| C | [EER-C2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3565) `6278:3565` | NÃO APLICÁVEL | FAIL | FAIL | FAIL | PASS | FAIL | FAIL | 003 |
| D | [DB-D](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6287-3485) `6287:3485` | NÃO APLICÁVEL | PASS | PASS | FAIL | PASS | PASS | FAIL | 009 |
| D | [EER-D](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6288-3484) `6288:3484` | NÃO APLICÁVEL | FAIL | FAIL | FAIL | PASS | FAIL | FAIL | 003 |

UC-01 passa no conteúdo do frame atual; AUD-M2-011 é problema da sequência de apresentação, não das 13 associações atuais. CL-01: sete associações preservadas, mas responsabilidade de autenticação e telefone reprovam os demais critérios. CL-03: oito relações sem inversão comprovada, porém geometria e compatibilidade de assinaturas impedem conclusão sem ressalvas. Nos EER, tipos/colunas/FKs estruturais conferem; FAIL SQL/EER refere-se à cardinalidade gráfica, não à existência física das tabelas.

## Cobertura e evidências por artefato

| Artefato | Escopo verificado | Evidência |
|---|---|---|
| UC-01 | 5 atores, 11 objetivos, 13 associações; transferência independente; nenhum include/extend | [PNG](evidencias/6250-3484.png), [dados](evidencias/6250-3484.json) |
| CL-01 | 7 classes, atributos/visibilidades/operações, 7 associações nos dois sentidos | [PNG](evidencias/6255-3484.png), [dados](evidencias/6255-3484.json) |
| SQ-01 | 5 participantes, 7 mensagens lógicas, alt aninhado, negativa auditada antes do retorno | [PNG](evidencias/6257-3484.png), [dados](evidencias/6257-3484.json) |
| DB-A | 7 tabelas, todos os campos exibidos, 7 relações | [PNG](evidencias/6259-3484.png), [dados](evidencias/6259-3484.json) |
| EER-A | Vista temática nativa, fonte SVG/PNG, XML do MWB, tabelas/FKs, enquadramento e leitura panorâmica | [PNG](evidencias/6238-3578.png), [dados](evidencias/6238-3578.json) |
| UC-02 | 4 atores, 9 objetivos, 9 associações; N01 como consequência | [PNG](evidencias/6262-3484.png), [dados](evidencias/6262-3484.json) |
| CL-02 | 6 classes, operações, 9 associações incluindo os três papéis da troca | [PNG](evidencias/6263-3484.png), [dados](evidencias/6263-3484.json) |
| SQ-02 | 6 participantes distintos, 11 mensagens lógicas, criação temporal, aceite/recusa, N01 | [PNG](evidencias/6265-3484.png), [dados](evidencias/6265-3484.json) |
| DB-B | 6 tabelas, todos os campos exibidos, 3 relações internas e FKs externas listadas | [PNG](evidencias/6266-3484.png), [dados](evidencias/6266-3484.json) |
| EER-B | Vista temática nativa, fonte SVG/PNG, XML do MWB, tabelas/FKs, enquadramento e leitura panorâmica | [PNG](evidencias/6268-3484.png), [dados](evidencias/6268-3484.json) |
| UC-03 | 5 papéis, 12 objetivos, 13 associações; N02–N04 e bloqueio como notas | [PNG](evidencias/6270-3484.png), [dados](evidencias/6270-3484.json) |
| CL-03 | 11 classes, 8 associações, XOR Anexo; R06/R10 omitidas deliberadamente | [PNG](evidencias/6272-3484.png), [dados](evidencias/6272-3484.json) |
| SQ-03 | 4 participantes, 6 mensagens, alt válido/negado; realização, imutabilidade e N03 | [PNG](evidencias/6273-3484.png), [dados](evidencias/6273-3484.json) |
| DB-C1 | 5 tabelas, todos os campos exibidos, 5 relações; origem exclusiva e avulsa | [PNG](evidencias/6275-3484.png), [dados](evidencias/6275-3484.json) |
| EER-C1 | Vista temática nativa, fonte SVG/PNG, XML do MWB, tabelas/FKs, enquadramento e leitura panorâmica | [PNG](evidencias/6278-3484.png), [dados](evidencias/6278-3484.json) |
| DB-C2 | 7 tabelas, todos os campos exibidos, 5 relações internas; correções e XOR | [PNG](evidencias/6276-3484.png), [dados](evidencias/6276-3484.json) |
| EER-C2 | Vista temática nativa, fonte SVG/PNG, XML do MWB, tabelas/FKs, enquadramento e leitura panorâmica | [PNG](evidencias/6278-3565.png), [dados](evidencias/6278-3565.json) |
| DB-D | 4 tabelas e referências repetidas; 8 relações; UNIQUE/CHECK e FKs opcionais | [PNG](evidencias/6287-3485.png), [dados](evidencias/6287-3485.json) |
| EER-D | Vista temática nativa, fonte SVG/PNG, XML do MWB, tabelas/FKs, enquadramento e leitura panorâmica | [PNG](evidencias/6288-3484.png), [dados](evidencias/6288-3484.json) |

O [caderno analítico](CADERNO-DE-VERIFICACAO.md) contém as listas por elemento, leituras das associações, conferência física, 17 cenários e limites. Não se usa contagem gráfica como prova semântica. Todas as dimensões foram avaliadas; os limites estão explicitados, não convertidos em aprovação.
