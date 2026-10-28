# Revalidação focal AUD-M2-003 e AUD-M2-004 — EER físico e sequência UML

**Projeto:** Rede de Apoio a Cuidadores de Idosos · **Status:** conforme nos defeitos específicos verificados, **não** homologação UML/acadêmica integral.
**Procedimento:** leitura dos contratos SQ-01/02/03, inspeção atual das três capturas Figma, leitura dos arquivos de execução nativa do Workbench e comparação SQL↔MWB já versionada. **Não** houve execução nova do Workbench nem alteração dos originais.

## AUD-M2-004 — tipos de seta e retornos nos SQ-01/02/03

| Artefato | Nó Figma e fonte canônica | Chamadas / retornos examinados | Resultado e limite |
|---|---|---|---|
| SQ-01 | [6257:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484) · [contrato SQ-01](../../uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md) | M01, M02, M04 e M05 são chamadas contínuas direcionadas; M03, M06, M07 têm retorno tracejado. A imagem mostra M07 autorizado e negado nos operandos diferentes do `alt`. | **CONFORME NO ESCOPO VERIFICADO:** correspondência de tipo de linha e ponta nas mensagens M01–M07. |
| SQ-02 | [6265:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484) · [contrato SQ-02](../../uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md) | Chamadas M01/02/03/05/07/08/09/10 têm linha contínua com ponta de chamada; M04/06/11 retornam tracejado. M09 aparece nos operandos de aceite e recusa, enquanto o terceiro ramo só devolve M11 conflito 409. `«create»` M05 é chamada ao objeto gerado. | **CONFORME NO ESCOPO VERIFICADO** das setas, ramificações e retorno; não atesta concorrência real. |
| SQ-03 | [6273:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6273-3484) · [contrato SQ-03](../../uml/especificacao-para-figma/dominio-C-registros/SQ-03.md) | M01–M03 chamadas contínuas com ponta preenchida; M04–M06 retornos tracejados. No ramo negado não há envio de M03 nem N03. | **CONFORME NO ESCOPO VERIFICADO** da semântica das setas. |

**Explicação para a contagem histórica:** o status de correção menciona **16 pontas de chamada** editadas no Figma. O contrato contém mensagens **lógicas** M01–M07 (7), M01–M11 (11) e M01–M06 (6), com algumas chamadas repetidas visualmente em operandos `alt`; não tratar o número 16 como 16 requisitos, 16 operações únicas ou 16 mensagens contratuais.

**Limitação:** o exame é de captura Figma em alta resolução e contratos. Não é revisão de código executável, medição de ativação em runtime ou homologação acadêmica de cada elemento de UML.

## AUD-M2-003 — 79 chaves estrangeiras / cardinalidade na fonte nativa

**Fontes:** [native-export.json](../../../entrega/sql-eer/evidencias-workbench/native-export.json), [native-correction.json](../../../entrega/sql-eer/evidencias-workbench/native-correction.json), [sql-mwb-comparacao.json](../../../entrega/sql-eer/evidencias-workbench/sql-mwb-comparacao.json), [relatório de Workbench](../../../entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md).

A conferência automatizada do **registro pós-reabertura** (`native-export.json`) encontrou:

| Propriedade | Resultado registrado |
|---|---:|
| Modelo aberto em Workbench / exportação com status PASS | Sim |
| Tabelas do modelo | 34 |
| FKs cadastradas / registros de cardinalidade | 79 / 79 |
| Diagramas nativos exportados | 6 |
| Erros entre `many` e `expectedMany` | **0** |
| Erros entre `referencedMandatory` e `expectedParentMandatory` | **0** |
| Flags `mandatory=0` esperados após correção | **79/79** |
| `referencedMandatory=1` / `0` | **58 / 21** |
| `many=0` (relações com máximo um) | **4** |
| Divergências de comparação SQL↔MWB | **0** |
| Colunas MWB / CHECKs no SQL | 305 / 50 |
| CHECKs na estrutura MWB | 0 (consulte o DDL) |

**Vínculo crítico:** `fk_rede_pessoa` preserva `PessoaIdosa [1] — [0..1] RedeCuidado`, comprovado pelo diagnóstico do renderer e pelo contrato SQL. Há seis exportações SVG e PNG de origem Workbench real; cinco recortes temáticos foram colocados nos mesmos frames Figma M2 e conferidos estruturalmente na transição anterior. Não somar as conexões das vistas temáticas como novas FKs, pois algumas aparecem em mais de uma vista.

**Parecer AUD-M2-003:** **CONFORME NO ESCOPO VERIFICADO** no que tange às flags nativas e ao confronto estrutural com DDL. Não afirmar que cada curva do EER panorâmico será legível em projeção, nem que o professor aprovou a notação.

## Saída da rodada

- **AUD-M2-003:** conforme no escopo físico e do renderer; apresentação e aprovação acadêmica ainda abertas.
- **AUD-M2-004:** conforme na notação de linhas/chamadas/retornos para as três pranchas SQ; outras questões semânticas continuam sujeitas à matriz de rastreabilidade.

**Preservação:** nenhum Node ID, SQL, MWB, exportação ou artefato original foi alterado.
