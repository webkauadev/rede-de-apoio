# Revalidação focalizada de P1 — CL-01, SQ-01, CL-02, SQ-02 e DB-C2

**Escopo da leitura:** contratos canônicos da `main`, SQL `01_schema_completo_v1.sql` e **capturas atuais do Figma** dos frames CL-01, SQ-01, CL-02, SQ-02 e DB-C2. Esta verificação é independente do relatório original, mas **limitada aos achados específicos abaixo**. Não é teste de execução da aplicação, apresentação projetada ou homologação acadêmica.

## Resultados por achado

| ID | Teste realizado (contrato × imagem × SQL) | Resultado rigoroso |
|---|---|---|
| **AUD-M2-001 / CL-02** | No contrato CL02-R03a/b/c, SolicitacaoTrocaPlantao `0..*` e MembroRede `1` para solicitante/destinatário, `0..1` para respondente. A captura do frame [CL-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484) exibe três linhas separadas com `1/1/0..1` junto a MembroRede e `0..*` junto a Solicitação, com nomes dos três papéis. O SQL demonstra FKs de membro solicitante/destinatário **NOT NULL** e respondente **NULL**. | **CONFORME NO ESCOPO VERIFICADO** para a inversão específica e a opcionalidade de respondente; não aprova todas as associações CL-02. |
| **AUD-M2-002 / DB-C2** | O SQL `anexo` tem `registro_id`, `consulta_id`, `administracao_id` anuláveis e `ck_anexo_pai` impõe soma de exatamente um ID não nulo. A captura [DB-C2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484) exibe `0..1` nos pais e `0..*` junto a `anexo`, além do rodapé «Anexo: exatamente um pai». | **CONFORME NO ESCOPO VERIFICADO** para representação de opcionalidade/XOR; verificação de todas as FKs do recorte ainda é separada. |
| **AUD-M2-005 / CL-01 × SQ-01** | Contrato CL-01 diz que `Usuario` não tem `autenticar()` e SQ-01 envia `autenticar(credenciais)` à lifeline `Serviço de Autenticação`. Capturas [CL-01](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484) e [SQ-01](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484) mostram exatamente essa separação. | **CONFORME NO ESCOPO VERIFICADO** para responsabilidade de autenticação; serviço continua abstração arquitetural [INFERÊNCIA]. |
| **AUD-M2-006 / SQ-02** | Contrato SQ-02 inclui revalidar `versaoPlantaoEsperada` e elegibilidade ao receber resposta; `alt` para aceitar, recusar, conflito 409. Captura [SQ-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484) mostra anotação de revalidação, `resultadoResposta [CONFLITO 409]` no terceiro ramo, e ausência de `aceitar()`, `recusar()`, `atribuirResponsavel` ou N01 nesse ramo. | **CONFORME NO ESCOPO VERIFICADO** da modelagem lógica da concorrência; **não** comprova transação atômica em runtime. |
| **AUD-M2-007 / CL-01** | A captura de CL-01 exibe `ContatoImportante.telefone: String` **sem** marcador de opcionalidade; contrato canônico tem `- telefone: String`. O SQL usa `telefone VARCHAR(32) NOT NULL`. | **CONFORME NO ESCOPO VERIFICADO** para nulidade/atributo modelado; não valida interação de cadastro. |

## Limites explícitos

- Os cinco testes acima se referem **somente às falhas identificadas pelos respectivos IDs**, não convertem todo o artefato UML em PASS ou a M2 em homologada.
- Para AUD-001, a imagem 1300 px permite ler as multiplicidades relevantes; a legibilidade a distância em projetor continua não verificada.
- Para AUD-006, a notação descreve a revalidação atômica como **contrato pretendido**, não evidência de implementação/concorrência real.
- Não foi feito merge, edição do Figma, SQL ou Workbench para realizar os testes.
- Restam **AUD-M2-003/004** em revisão completa dos P1, mais P2 relevantes e a revalidação integrada.

## Impacto na transição

Os cinco achados foram classificados como **CONFORME NO ESCOPO VERIFICADO** após cotejo contrato–imagem–DDL quando aplicável. **A aprovação acadêmica permanece não verificada**, e a decisão final de prontidão da M2 exige a análise dos demais achados e o parecer da equipe.
