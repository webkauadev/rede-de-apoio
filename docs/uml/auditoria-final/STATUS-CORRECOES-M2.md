# Execução dos achados AUD-M2 — Milestone 2

**Data:** 2026-10-16. **Branch de trabalho:** `fix/m2-workbench-reexport-final` (derivada de `main` em `6f604f9`). **Estado:** correções executadas, **homologação ainda NÃO aprovada**. O diagnóstico independente e as capturas originais da auditoria foram preservados.

**Figma oficial:** [arquivo](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/), página `6103:3636`. Os Node IDs correntes permanecem os mesmos da [matriz original](MATRIZ-VALIDACAO-19-ARTEFATOS.md).

## Quadro de execução

| ID | Resultado desta rodada | Evidência e ressalva |
|---|---|---|
| AUD-M2-001 — P1 | **Correção aplicada no Figma** | [CL-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484): solicitante/destinatário, junto a MembroRede `1` e junto a Solicitação `0..*`; respondente, junto a MembroRede `0..1` e junto a Solicitação `0..*`. Conferido por captura. |
| AUD-M2-002 — P1 | **Correção aplicada no Figma** | [DB-C2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484): multiplicidade pai `registro_cuidado` agora `0..1`; XOR de exatamente um dos três pais permanece. |
| AUD-M2-003 — P1 | **Validação estática atualizada; Workbench/EER/Figma ainda pendentes** | O `.mwb` atual tem SHA-256 `f8454746ffae0d408b37f9ce87a51eddf9d61fbf4fafe5bb2a41230801f5a120`; o manifesto de integridade foi atualizado com esse valor. A comparação atual SQL↔MWB passou sem divergências estruturais: 34 tabelas, 305 colunas, 79 FKs, 6 vistas, 50 CHECKs no SQL e 44 UNIQUEs. Os flags atuais são 4 `many=0`, 21 `mandatory=0` e 79 `referencedMandatory=0`; `fk_rede_pessoa` está com `many=0`, `mandatory=1`, `referencedMandatory=0`, coerente com máximo `0..1` de rede por pessoa. O ambiente desta execução não possui binário/pacote/Flatpak/Snap/imagem local do MySQL Workbench; portanto **não houve abertura, salvamento nativo, reexportação ou atualização dos cinco frames do Figma**. SVGs/PNGs e alertas existentes permanecem pendentes de substituição real. |
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
- O arquivo Workbench nativo ainda deve ser aberto no aplicativo para certificar leitura e exportação; o comparador da auditoria deve ser executado novamente depois da reexportação.
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

1. **Obrigatório:** abrir `rede_de_apoio_v1.mwb` desta branch no MySQL Workbench, verificar FKs e cardinalidades, confirmar que o esquema físico e as 34 tabelas permanecem iguais ao SQL, exportar os cinco SVG/PNG temáticos e substituir os EER correspondentes no Figma. Em particular `PessoaIdosa [1] — [0..1] RedeCuidado`, considerando `uq_rede_idoso_v1`. Se uma restrição não for representável, documentar essa limitação em nota.
2. **Obrigatório:** fazer verificação focada dos P1 corrigidos em capturas finais e na documentação, sem declarar homologação retroativa.
3. **Condição acadêmica:** esclarecer PE-01–04 (rubrica, prova de navegação, assinatura de criação e seis lifelines). O protótipo pode ficar com ressalva somente se a rubrica permitir.
4. **P2:** verificar legibilidade final em projeção e resolver eventuais colisões remanescentes.

**Parecer atual:** correção substantiva avançou, porém **reprovado / homologação pendente** enquanto AUD-M2-003 não tiver EERs nativos reexportados e inspecionados.
