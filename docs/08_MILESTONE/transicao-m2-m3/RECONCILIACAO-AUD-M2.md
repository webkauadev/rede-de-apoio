# Reconciliação dos 13 achados AUD-M2 — Controle de transição

**Estado do conjunto:** EM AUDITORIA. A auditoria histórica teve 1 PASS/18 FAIL; não se pode transportar esse número automaticamente após as correções. Correção aplicada, revalidação independente e homologação acadêmica são atos diferentes.

**Fontes:** [relatório original](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/auditoria-final/RELATORIO-AUDITORIA-M2.md), [status pós-correção](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/auditoria-final/STATUS-CORRECOES-M2.md), [MWB nativo](https://github.com/webkauadev/rede-de-apoio/blob/main/entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md) e [matriz dos 19](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/auditoria-final/MATRIZ-VALIDACAO-19-ARTEFATOS.md).

## Matriz de reconciliação

| ID | P | Artefatos | Achado original | Evidência atual e limite | Status específico | Revisor sugerido |
|---|---|---|---|---|---|---|
| AUD-M2-001 | P1 | CL-02 | papéis e multiplicidades da troca | correções no Figma relatadas, com captura; precisa de leitura bilateral de cada extremo | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | Rhuan → David |
| AUD-M2-002 | P1 | DB-C2 | FK opcional de anexo e XOR de exatamente um pai | captura mostra pai 0..1; conferir CHECK e FK originais no DDL | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | Henrique → Kauã |
| AUD-M2-003 | P1 | EER-A/B/C1/C2/D | cardinalidades Workbench versus NOT NULL/UNIQUE | MWB reaberto/exportado, 5 SVGs nativos em Figma; não certifica todos os rótulos na banca | **CONFORME NO ESCOPO VERIFICADO** | Kauã → Henrique |
| AUD-M2-004 | P1 | SQ-01/02/03 | pontas de chamada síncrona versus retorno | 16 pontas corrigidas conforme relatório; revisar visualmente cada trecho | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | Domínios A/B/C → Kauã |
| AUD-M2-005 | P1 | CL-01 × SQ-01 | autenticação com responsabilidade conflitante | operação inferida removida do domínio; conferir contratos e mensagens finais | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | David → Rhuan |
| AUD-M2-006 | P1 | SQ-02 | versão concorrente/contexto no aceitar/recusar | alt com 409 e revalidação desenhado; examinar guardas e ausência de N01 em conflito | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | Rhuan → David |
| AUD-M2-007 | P1 | CL-01 | ContatoImportante.telefone obrigatório | contrato e Figma alterados; confirmar NOT NULL no SQL e multiplicidade | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | David → Henrique |
| AUD-M2-008 | P2 | UC-02/03; CL-01/02/03; EER-A | geometria, rótulos e legibilidade | revisão parcial; possíveis cruzamentos residuais de CL-03 e projeção pendente | **PENDENTE DE CORREÇÃO** | Domínios A/B/C → Kauã |
| AUD-M2-009 | P2 | DB-A/B/C1/C2/D | tipos físicos parciais, UNSIGNED | 72 campos corrigidos conforme histórico; comparar texto atual com DDL | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | Domínios A/B/C/D → Henrique |
| AUD-M2-010 | P2 | CL-03 × SQ-03 | assinaturas das operações e mensagens | assinaturas compatibilizadas; inspecionar parâmetro e receptor de cada chamada | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | Henrique → Kauã |
| AUD-M2-011 | P2 | Apresentação M2 | ordem de slides e versões históricas | frames oficiais reposicionados 13–31; verificar caminho da apresentação | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | Kauã → David |
| AUD-M2-012 | P2 | DB-C2 | autoridade do SQL sobre CHECK/XOR | rodapé já ressalva limites; conferir semântica do vínculo no DDL | **CORRIGIDO AGUARDANDO REVALIDAÇÃO** | Henrique → Kauã |
| AUD-M2-013 | P2 | Fluxo Final T04/T05/T08 | fluxo navegável de troca e administração | limite de evidência documentado, não defeito UML automático | **EM AUDITORIA** | Rhuan/Henrique → David |

## Critérios de revalidação sem calendário

- **AUD-M2-001/002:** conferir as multiplicidades e a nulidade junto aos extremos efetivos, lendo nos dois sentidos e confrontando SQL/contratos.
- **AUD-M2-003:** o fato de existir um SVG nativo, em Figma, é verificável; a correspondência semântica de todas as cardinalidades a ser apresentada exige conferência independente de fonte.
- **AUD-M2-004–007:** validar ponta de seta/guarda/operação/atributo pelos contratos correspondentes, com captura da versão corrigida.
- **AUD-M2-008–012:** validar geometria, tipos SQL e assinatura das chamadas sem refazer diagramas corretos.
- **AUD-M2-013:** obter prova de navegação ou classificar como limitação explícita do protótipo; não converter o SQ em alegação de comportamento navegável.
- **PE-01–04:** continuam questões para conferência no enunciado e fontes docentes. Não inferir resposta ou concordância acadêmica.

## Evidência por etapa

1. Para cada linha, salvar link de captura atual e seção do contrato.
2. Para cada associação, documentar classe em cada ponta, multiplicidade lida nos dois sentidos e regra que a suporta.
3. Para cada sequência, verificar emissor, receptor, assinatura, guarda, ativação e retorno; distinguir arquitetura inferida.
4. Para cada DB/EER, confrontar PK/FK, nulidade, UNIQUE e CHECK contra o DDL; não exigir CHECK exibido pelo Workbench.
5. Marcar **CONFORME NO ESCOPO VERIFICADO** somente com conclusão fundamentada do revisor independente. A ausência de defeito visível não basta.

**Status de gate:** correções P1 aplicadas segundo relatório; revalidação independente integral **ainda não demonstrada**. Não alterar artefatos ou parecer histórico nesta fase.
