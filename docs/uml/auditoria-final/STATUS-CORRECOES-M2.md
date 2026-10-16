# Execução dos achados AUD-M2 — Milestone 2

**Data:** 2026-10-16. **Branch de trabalho:** `fix/uml-milestone2-homologacao` (derivada de `audit/uml-milestone2-final`). **Estado:** correções executadas, **homologação ainda NÃO aprovada**. O diagnóstico independente e as capturas originais da auditoria foram preservados.

**Figma oficial:** [arquivo](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/), página `6103:3636`. Os Node IDs correntes permanecem os mesmos da [matriz original](MATRIZ-VALIDACAO-19-ARTEFATOS.md).

## Quadro de execução

| ID | Resultado desta rodada | Evidência e ressalva |
|---|---|---|
| AUD-M2-001 — P1 | **Correção aplicada no Figma** | [CL-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484): solicitante/destinatário, junto a MembroRede `1` e junto a Solicitação `0..*`; respondente, junto a MembroRede `0..1` e junto a Solicitação `0..*`. Conferido por captura. |
| AUD-M2-002 — P1 | **Correção aplicada no Figma** | [DB-C2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484): multiplicidade pai `registro_cuidado` agora `0..1`; XOR de exatamente um dos três pais permanece. |
| AUD-M2-003 — P1 | **Fonte MWB atualizada; EERs ainda pendentes** | [Modelo `.mwb` desta branch](https://github.com/webkauadev/rede-de-apoio/blob/fix/uml-milestone2-homologacao/entrega/sql-eer/rede_de_apoio_v1.mwb): propriedades gráficas de 79 FKs derivadas do SQL V1 (4 `many` alterados para 0; 21 `mandatory` alterados para 0; 79 `referencedMandatory` alterados para 0), total 104 alterações. CRC original validado; ZIP reempacotado com integridade estrutural e modelo XML preservado salvo esses indicadores. **Ainda falta validar abertura no aplicativo Workbench e reexportar as cinco vistas nativas**, depois substituí-las no GitHub e no Figma. SVGs anteriores continuam exibidos com alerta corretivo nos slides. |
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

## Portões restantes para a homologação

1. **Obrigatório:** abrir `rede_de_apoio_v1.mwb` desta branch no MySQL Workbench, verificar FKs e cardinalidades, confirmar que o esquema físico e as 34 tabelas permanecem iguais ao SQL, exportar os cinco SVG/PNG temáticos e substituir os EER correspondentes no Figma. Em particular `PessoaIdosa [1] — [0..1] RedeCuidado`, considerando `uq_rede_idoso_v1`. Se uma restrição não for representável, documentar essa limitação em nota.
2. **Obrigatório:** fazer verificação focada dos P1 corrigidos em capturas finais e na documentação, sem declarar homologação retroativa.
3. **Condição acadêmica:** esclarecer PE-01–04 (rubrica, prova de navegação, assinatura de criação e seis lifelines). O protótipo pode ficar com ressalva somente se a rubrica permitir.
4. **P2:** verificar legibilidade final em projeção e resolver eventuais colisões remanescentes.

**Parecer atual:** correção substantiva avançou, porém **reprovado / homologação pendente** enquanto AUD-M2-003 não tiver EERs nativos reexportados e inspecionados.
