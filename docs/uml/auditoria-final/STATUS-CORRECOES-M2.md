# Execução dos achados AUD-M2 — Milestone 2

**Data:** 2026-10-16. **Branch de trabalho:** `fix/m2-workbench-reexport-final` (derivada de `main` em `6f604f9`). **Estado:** correções executadas, **homologação ainda NÃO aprovada**. O diagnóstico independente e as capturas originais da auditoria foram preservados.

**Figma oficial:** [arquivo](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/), página `6103:3636`. Os Node IDs correntes permanecem os mesmos da [matriz original](MATRIZ-VALIDACAO-19-ARTEFATOS.md).

## Quadro de execução

| ID | Resultado desta rodada | Evidência e ressalva |
|---|---|---|
| AUD-M2-001 — P1 | **Correção aplicada no Figma** | [CL-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484): solicitante/destinatário, junto a MembroRede `1` e junto a Solicitação `0..*`; respondente, junto a MembroRede `0..1` e junto a Solicitação `0..*`. Conferido por captura. |
| AUD-M2-002 — P1 | **Correção aplicada no Figma** | [DB-C2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484): multiplicidade pai `registro_cuidado` agora `0..1`; XOR de exatamente um dos três pais permanece. |
| AUD-M2-003 — P1 | **Correção técnica concluída (Workbench + 5 EER no Figma); revalidação acadêmica independente pendente** | [PR #132](https://github.com/webkauadev/rede-de-apoio/pull/132): Workbench CE 8.0.47 executado, modelo salvo/reaberto, 34 tabelas, 305 colunas, 79 FKs, seis vistas SVG/PNG nativas, SQL V1 preservado, sem divergências na comparação. Flags validados pelo renderer nativo: `many=0` em quatro FKs únicas, `mandatory=0` em 79 FKs e `referencedMandatory=1` em 58 FKs obrigatórias (21 opcionais com `0`). Para `fk_rede_pessoa`: `many=0, mandatory=0, referencedMandatory=1`, representando PessoaIdosa `[1]` — `[0..1]` RedeCuidado. Os cinco SVG temáticos foram importados nos frames canônicos do Figma e conferidos por captura real; cinco alertas AUD-M2-003 e imagens antigas foram removidos, sem mudar os Node IDs. [Relatório nativo](../../../entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md). |
| AUD-M2-004 — P1 | **Correção aplicada no Figma** | [SQ-01](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484), [SQ-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484), [SQ-03](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6273-3484): 16 pontas de chamada fechadas e preenchidas; retornos tracejados não foram alterados. |
| AUD-M2-005 — P1 | **Correção aplicada no Figma e contrato** | [CL-01](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484): removida a operação inferida `Usuario.autenticar()`, mantendo autenticação no serviço em SQ-01. Contrato `CL-01.md` atualizado nesta branch. |
| AUD-M2-006 — P1 | **Correção aplicada no Figma e contrato** | [SQ-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484): revalidação de versão/contexto na resposta e novo operando `alt` de conflito 409 sem M-09/M-10/N01; mantém seis lifelines e versão esperada. Contrato `SQ-02.md` atualizado. Validação ainda é de modelagem, não prova de concorrência de backend. |
| AUD-M2-007 — P1 | **Correção aplicada no Figma e contrato** | `ContatoImportante.telefone: String` obrigatório no CL-01, alinhado à persistência `VARCHAR(32) NOT NULL`, sem alterar o SQL. |
| AUD-M2-008 — P2 | **Correção visual parcial** | Desvios de UC02-C10 e quatro relações do UC-03, CL02-R04 ancorado, ajustes de rótulos CL-01/CL-02 e EER-A. Verificação de projetor e desalinhamentos residuais do CL-03 ainda sujeitos a conferência. |
| AUD-M2-009 — P2 | **Correção aplicada e comparada ao SQL** | 72 campos físicos exibidos nos cinco DB tiveram `UNSIGNED` ou tipo numérico explicitado conforme origem. DB-A e DB-B receberam largura adicional nos pontos de quebra de linha. |
| AUD-M2-010 — P2 | **Correção aplicada no Figma e contrato** | Assinaturas de `AdministracaoMedicamento.registrar(realizadaEm, autor)` e `Auditoria.registrarEvento(resultado, contextoSanitizado)` reconciliadas com SQ-03 e SQ-01 em CL-03. Tipos conceituais detalhados no contrato atualizado. |
| AUD-M2-011 — P2 | **Correção aplicada no Figma** | Os 19 frames atuais foram posicionados em sequência `13–31` após os slides originais `01–12`. Quatro versões antigas do Domínio A foram movidas para a faixa de arquivo em `y=1450`, sem exclusão; nomes experimentais foram removidos dos frames oficiais. |
| AUD-M2-012 — P2 | **Correção aplicada no Figma** | Rodapé do DB-C2 passou a explicar que CHECKs/XOR/restrições detalhadas devem ser consultados no SQL, e o EER é uma vista temática. |
| AUD-M2-013 — P2 | **Limite documentado — não implementado no protótipo** | A auditoria não demonstrou fluxos navegáveis de solicitar/responder troca e registrar administração. As telas T04, T05 e T08 não são prova suficiente; não se inventaram interações nem se alterou o protótipo. Depende de confirmar a rubrica e, se a entrega exigir navegação, executar rodada de protótipo separada. |

## Integridade e decisões preservadas

- O SQL `entrega/sql-eer/01_schema_completo_v1.sql` **não foi alterado** e seu blob SHA `f08430d741d25f5c9445f9383c05938e01be5f4c` confere com a branch de auditoria.
- O `.mwb` é alterado **somente nesta branch de correções**. O modelo original, de 70.501 bytes, permanece recuperável pela branch `audit/uml-milestone2-final`. O novo ZIP tem 1.860.015 bytes porque o XML foi armazenado sem compressão; isso pode limitar a visualização pela API GitHub Contents, mas não significa mudança do esquema.
- Não houve modificação de telas do protótipo, fontes dos SVG nativos do Workbench ou requisitos funcionais.
- **Atualização posterior (PR #132):** o modelo Workbench foi efetivamente aberto, salvo e reaberto no Workbench CE 8.0.47; as seis vistas nativas foram reexportadas e verificadas. A fonte de evidência vigente é o relatório `entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md`.
- Os textos de alerta nos cinco EER são provisórios e devem ser removidos **somente após** as novas exportações terem sido incorporadas e validadas.
- Nada foi mesclado à branch `docs/estudo-uml-milestone2` ou `main`.

## Execução final de integridade e CI — 2026-10-16

- Cópia preservada antes da execução: `/tmp/rede_de_apoio_v1.pre-workbench-reexport.mwb`, SHA-256 idêntico ao arquivo de trabalho. Não foi realizada mutação adicional do `.mwb` nem do SQL V1.
- `node scripts/prepare_sql_eer_delivery.mjs --check`: **PASS**, 34 tabelas e 79 FKs. O gerador foi ajustado apenas para emitir o `02_manifest_estrutura.json` na mesma formatação do Prettier, preservando o conteúdo e permitindo que os dois checks convivam.
- `python3 entrega/sql-eer/tools/verify-artifacts.py`: **PASS**, MWB nativo estruturalmente íntegro, seis diagramas e PNG/SVG válidos.
- `python3 docs/uml/auditoria-final/evidencias/comparar_sql_mwb.py`: **PASS**, sem divergências SQL↔MWB; a evidência `sql-mwb-comparacao.json` foi regenerada para os indicadores gráficos atuais.
- `python3 scripts/validate_sql_prototype.py`: **PASS estático**, com a limitação já declarada de não executar MySQL.
- A correção de formatação dos oito arquivos reportados foi aplicada seletivamente. `npx prettier@3.6.2 --check` passou nesses arquivos. `npm run format:check` não pode ser executado neste ambiente: o projeto exige Node `>=24 <25` e npm `>=11 <12`, enquanto o ambiente disponibiliza Node `20.19.2` e npm `9.2.0`; `npm ci` foi recusado pelo gate de engine. A confirmação ocorreu no runner compatível do GitHub Actions: no PR #131, `application`, `sql-eer-static` e `validate-agent-context` concluíram como **SUCCESS** (execuções `38973994691`, `38973994848` e `38973994945`).

## Portões restantes para a homologação

1. **CONCLUÍDO TECNICAMENTE — AUD-M2-003:** Workbench CE 8.0.47 abriu/salvou/reabriu o `.mwb` do PR #132; as seis vistas SVG/PNG nativas foram exportadas; os cinco EER canônicos foram substituídos no Figma e fotografados pelo conector; cardinalidade `PessoaIdosa [1] — [0..1] RedeCuidado` comprovada pelo diagnóstico nativo. **Não constitui parecer acadêmico independente.**
2. **Obrigatório:** fazer verificação focada dos P1 corrigidos em capturas finais e na documentação, sem declarar homologação retroativa.
3. **Condição acadêmica:** esclarecer PE-01–04 (rubrica, prova de navegação, assinatura de criação e seis lifelines). O protótipo pode ficar com ressalva somente se a rubrica permitir.
4. **P2:** verificar legibilidade final em projeção e resolver eventuais colisões remanescentes.

**Parecer técnico atualizado (2026-10-16):** os sete achados P1 receberam intervenções; AUD-M2-003 foi concluído no Workbench real e nos cinco EER no Figma. **Homologação acadêmica final continua pendente** de verificação integrada das correções P1, eventual legibilidade em projeção e definição formal das ressalvas/protótipo/rubrica docente.

## Finalização dos EER no Figma oficial — 2026-10-16, após PR #132

O repositório `main` já contém as seis exportações **nativas** do Workbench CE 8.0.47 e o relatório `entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md`. A implementação visual posterior **substituiu efetivamente** os cinco diagramas dentro dos mesmos frames 1920×1080, corrigindo as margens internas da exportação pelo conteúdo vetorial, mantendo a fonte SQL V1 e os textos principais dos slides. Foram inspecionadas capturas reais individualmente e, após a conferência, removidas as cinco versões antigas, os cinco pares de avisos `ALERTA AUD-M2-003` e os contêineres temporários.

| Artefato | Frame canônico preservado | Novo nó SVG nativo (PR #132) | Resultado |
|---|---|---|---|
| EER-A | [`6238:3578`](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6238-3578) | `6321:3565` | Importado e conferido; alerta removido |
| EER-B | [`6268:3484`](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6268-3484) | `6322:3567` | Importado e conferido; alerta removido |
| EER-C1 | [`6278:3484`](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3484) | `6322:38168` | Importado e conferido; alerta removido |
| EER-C2 | [`6278:3565`](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3565) | `6322:42750` | Importado e conferido; alerta removido |
| EER-D | [`6288:3484`](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6288-3484) | `6322:47790` | Importado e conferido; alerta removido |

**Verificação estrutural final no Figma:** cada um dos cinco frames tem exatamente um novo objeto `SVG Nativo ... PR132`, nenhum objeto de importação anterior e zero `ALERTA AUD-M2-003`. Todos preservam a dimensão 1920×1080. Essas evidências confirmam a entrega técnica do AUD-M2-003; **não anulam os resultados históricos da auditoria**, nem provam, isoladamente, a homologação acadêmica global.

### Observação de CI após PR #132

Ao abrir o PR documental de sincronização com o Figma, o check `application` falhou na etapa `npm run format:check` por **quatro artefatos de evidência criados no PR #132**, não por uma alteração nos frames ou no SQL: `entrega/sql-eer/evidencias-workbench/native-correction.json`, `native-export.json`, `sql-mwb-comparacao.json` e `entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md`. Os checks `sql-eer-static` e `validate-agent-context` do PR #132 haviam passado. O reparo de formatação dessas evidências deve preservar integridade SHA-256, regenerando os hashes correspondentes quando necessário; **não alterar conteúdos semânticos, imagens nativas ou o modelo `.mwb`**. Esse ponto não invalida a atualização Figma concluída, mas impede declarar todos os checks verdes sem nova execução.
