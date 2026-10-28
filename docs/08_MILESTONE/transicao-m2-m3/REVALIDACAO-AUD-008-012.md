# Revalidação dos achados P2 AUD-M2-008–012

**Escopo:** comparar os frames atuais do Figma, os contratos originais e a DDL do repositório. Esta rodada **não** altera nenhuma prancha e não homologa notas acadêmicas.

## Matriz de resultados

| ID | Evidência verificada | Resultado |
|---|---|---|
| **AUD-M2-008 — geometria/apresentação** | Capturas atuais UC-02, UC-03, CL-03 e DB-C2 verificadas visualmente. UC-02/UC-03 preservam fronteira, atores e objetivos. CL-03 continua com **multiplicidades próximas/colidentes com textos e traços cruzados** na região entre `Medicamento`, `RegimeMedicamento`, `HorarioRegime` e `Anexo`; a escala projetada ainda não foi testada. | **PENDENTE DE CORREÇÃO/LEGIBILIDADE** no recorte CL-03; não declarar geometria integral conforme. |
| **AUD-M2-009 — tipagem física** | Extração read-only de todos os campos visíveis com tipo nos frames DB-A, DB-B, DB-C1, DB-C2, DB-D; comparação automática por `tabela + coluna + tipo` contra cada `CREATE TABLE` de `01_schema_completo_v1.sql`. **158/158** concordam em nome e tipo; **0 divergências**. Inclui tipos `UNSIGNED` que geraram o achado histórico. | **CONFORME NO ESCOPO VERIFICADO** para os **158 campos exibidos**; não certifica colunas omitidas, nulidade de campos sem marca, CHECK, cardinalidades nem todas as FKs do sistema. |
| **AUD-M2-010 — assinatura de operações** | No CL-03 está `AdministracaoMedicamento.registrar(realizadaEm: DateTime, autor: Usuario)`; SQ-03 M03 é `registrar(realizadaEm, autor)`. CL-03 traz `Auditoria.registrarEvento(resultado: ResultadoOperacao, contextoSanitizado: String)` e SQ-01 M05 usa `registrarEvento(NEGADO, contextoSanitizado)`. | **CONFORME NO ESCOPO VERIFICADO** dessas duas operações e chamadas; as demais operações CL-03 não foram certificadas. |
| **AUD-M2-011 — ordem da apresentação** | Leitura direta das coordenadas dos 19 frames oficiais: x=24960,27040,…,62400 em incrementos de **2080 px**, todos em **y=0** e dimensão **1920×1080**; sequência canônica UC-01, CL-01, SQ-01, DB-A, EER-A, UC-02,…,EER-D. | **CONFORME NO ESCOPO VERIFICADO** para a sequência dos 19 slides, sem afirmar que as versões arquivadas são invisíveis ao exportador nem que ensaio de apresentação foi realizado. |
| **AUD-M2-012 — rodapé de DB-C2** | Captura `6276:3484` e conteúdo Figma incluem: “Recorte físico seletivo. CHECKs, XOR e demais restrições têm como fonte o SQL V1; EER é vista temática.” O DDL `anexo` usa `ck_anexo_pai` com soma de três opções igual a um. | **CONFORME NO ESCOPO VERIFICADO** do aviso de autoridade do SQL. |

## Inventário dos campos extraídos de DB (tipos exibidos)

| Frame | Campos com tipos confrontados | Divergências |
|---|---:|---:|
| DB-A (`6259:3484`) | 36 | 0 |
| DB-B (`6266:3484`) | 37 | 0 |
| DB-C1 (`6275:3484`) | 25 | 0 |
| DB-C2 (`6276:3484`) | 34 | 0 |
| DB-D (`6287:3485`) | 26 | 0 |
| **Total** | **158** | **0** |

**Método reprodutível:** identificar nós `TEXT` cujo nome da camada é `<tabela> · campo N` ou `<tabela> • campo N`; extrair `coluna TIPO` removendo prefixos visuais `PK`/`FK`, descrição em colchetes e sufixo de nulidade; comparar com declarações de coluna por tabela em `CREATE TABLE [IF NOT EXISTS]` da DDL. **Nenhuma transformação semântica nem correspondência por aproximação foi usada.**

**Limites desta extração:** são os campos com tipo visível, não o catálogo completo de 305 colunas do banco. A conferência de 158 tipos não é prova de 158 FKs, 158 campos `NOT NULL` ou 158 atributos obrigatórios.

## Pendência importante

**CL-03** deve receber revisão de legibilidade por zoom e possível redistribuição geométrica dos rótulos de multiplicidade. Não alterar CL-03 durante a transição sem revisão do contrato: qualquer movimento deve manter sua associação e extremidades exatas. Conservar captura antes/depois da intervenção para comparação e registrar a versão de produção.

**Conclusão:** quatro achados P2 **conformes em escopo delimitado** (009–012). **AUD-008 continua pendente** e não deve ser tratado como PASS apenas porque o conteúdo funcional dos diagramas parece coerente.
