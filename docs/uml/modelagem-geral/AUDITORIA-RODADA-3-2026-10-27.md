# AUDITORIA 3 — Leitura literal dos contratos, correção de segurança e rastreabilidade

**Data:** 27/10/2026 · **PR:** [#134 (Draft)](https://github.com/webkauadev/rede-de-apoio/pull/134) · **Projeto:** Rede de Apoio a Cuidadores de Idosos.  
**Natureza:** auditoria técnica interna baseada em fontes versionadas e inspeção do Figma. **Não é homologação docente ou teste funcional do aplicativo.**

## Critério e fontes efetivamente comparadas

- [UC-01](../especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md), [UC-02](../especificacao-para-figma/dominio-B-organizacao/UC-02.md), [UC-03](../especificacao-para-figma/dominio-C-registros/UC-03.md).
- [CL-01](../especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md), [CL-02](../especificacao-para-figma/dominio-B-organizacao/CL-02.md), [CL-03](../especificacao-para-figma/dominio-C-registros/CL-03.md), [SQ-03](../especificacao-para-figma/dominio-C-registros/SQ-03.md).
- [Matriz de permissões](../../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md) e [DB-001–038](../../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md).
- [DDL concatenada](../../../entrega/sql-eer/01_schema_completo_v1.sql), [matriz original de rastreabilidade](../especificacao-para-figma/00-matriz-rastreabilidade.md), [governança](../especificacao-para-figma/00-governanca-transversal.md).
- Inspeção textual de conteúdo de nós Figma em 27/10 e captura do AT-G corrigido. [Matriz pontual dos 16 UC, 13 CL, SQ e DB](MATRIZ-RASTREABILIDADE-2026-10-27.md).

## Novas constatações — não sobrescrevem a auditoria anterior

| ID | Severidade | Constatação observável | Decisão / medida |
|---|---|---|---|
| AG3-001 | **ALTA** | O AT-G colocava “Consultar detalhamento do dia e realizar o cuidado previsto” **antes** da decisão “Permissão e contexto válidos?”, sugerindo exposição de informações protegidas a usuário ainda não autorizado (RNF01/RNF03). | **CORRIGIDO NO FIGMA:** A05 agora é *solicitar acesso*, D02 valida antes de exposição/escrita, A06 só consulta e informa após autorização, E02 bloqueia e audita, A07 revalida o contexto ao persistir e confirmar. |
| AG3-002 | **ALTA** | No caminho de correção do AT-G havia apenas decisão “Correção necessária?”, sem mostrar que o ator precisa de permissão atual para produzir o mesmo tipo de registro (RNF02/US-034). | **CORRIGIDO NO FIGMA:** A09 exige permissão efetiva atual; A10 revalida escrita ao criar versão e auditar. |
| AG3-003 | MÉDIA | Nome de atributo de CL-G `versaoEsperada` divergia da fonte `SolicitacaoTrocaPlantao.versaoPlantaoEsperada`; operações `atualizarPerfil`, `estaVigente`, `atribuirResponsavel`, `registrar` apareciam sem seus tipos/argumentos canônicos. | **CORRIGIDO NO FIGMA:** nome de atributo e quatro assinaturas alinhados aos catálogos CL-01/02/03. São projeções seletivas; outros atributos continuam omitidos por decisão editorial. |
| AG3-004 | MÉDIA | Um vínculo de DB-G agrupava FK simples `fk_pessoa_cadastrante` e FK composta `fk_pessoa_conta_tipo` sob descrição pouco clara. | **CORRIGIDO NO FIGMA:** distinção nominal explícita entre as duas FKs; não inferir cardinalidade a partir de uma linha comum. |
| AG3-005 | MÉDIA | SQ-G mostra `Serviço de Agenda`, `Autorização Contextual` e `Serviço de Auditoria`, inexistentes como participantes no SQ-03. | **ANOTADO NO FIGMA:** são **inferências arquiteturais**, não operações implementadas comprovadas. O SQ-03 original usa quatro participantes; o SQ-G é ampliação técnica ainda sujeita a revisão. |
| AG3-006 | **ALTA / COBERTURA** | O CL-G omite cinco relações que constam explicitamente dos catálogos e envolvem classes **já presentes**: CL01-R04, CL02-R03a, R03b, R03c e R06. | **PENDENTE** redesenho das ligações com papéis separados e sem sobreposição; *não declarar completude da rede conceitual*. Relações e multiplicidades individualizadas na nova matriz. |
| AG3-007 | MÉDIA / COBERTURA | UC-G contém 16 objetivos executivos, mas não mostra `Autenticar-se` (UC01 U-02) nem todos os casos e atores UC-01/02/03. UCG-13 “Consultar próprio perfil” decorre de whitelist T12, não caso U-xx exclusivo no UC-01. | **DOCUMENTADO:** mapa 16×origem; diagrama continua *seletivo*, não prova cobertura total de RF/US e não substitui UC-01/02/03. |
| AG3-008 | MÉDIA / COBERTURA | SQ-G não trata separadamente a negação de **leitura inicial**, replay idempotente, 409, DST inválido ou falha de auditoria. | **PENDENTE POR ESCOPO:** cenários complementares ou guardas explícitas antes de expor como comportamento completo; negar qualquer equivalência com testes reais. |
| AG3-009 | BAIXA / EVIDÊNCIA | Busca ingênua por `CREATE TABLE IF NOT EXISTS` no SQL encontraria 32 tabelas, embora existam 34 no consolidado. | **VERIFICADO:** 32 declarações com `IF NOT EXISTS` + 2 `CREATE TABLE` em `005_sessoes_login.sql` = **34**; também **79 cláusulas FOREIGN KEY**. O modelo físico não foi modificado. |
| AG3-010 | MÉDIA / APRESENTAÇÃO | EER-G no Figma é uma **prancha-índice**, sem conter o SVG físico integral, cuja fonte está no GitHub/Workbench. | **PENDENTE** se a rubrica requer um EER geral embutido no mesmo arquivo; jamais redesenhar manualmente as 79 FKs sem conferir origem. |
| AG3-011 | MÉDIA / MODELAGEM | O SQL permite ocorrência gerada a partir de `tarefa` ou `horario_regime` (XOR), mas o CL03-R03 documenta apenas `HorarioRegime—OcorrenciaProgramada`. | **DOCUMENTADO:** qualquer novo vínculo de `Tarefa—OcorrenciaProgramada` no CL-G deve ser marcado como relacionamento derivado do SQL/decisão DB-029, não falsamente atribuído a CL03-R03. |
| AG3-012 | BAIXA / NOMENCLATURA | “11 FKs desenhadas” simplifica indevidamente o DB-G: um segmento agrupa mais de uma FK e muitas FKs reais ficam só em texto. | **CORRIGIR NO DISCURSO:** chamar de **11 trechos de relacionamento físico exemplificativos**. O EER original é a referência integral. |

## Julgamento por disciplina

**Casos de uso:** os perfis e permissões exemplificados estão amparados por contratos e whitelist, desde que o diagrama seja apresentado como **amostragem**. Não foram validadas as 36 US em um único desenho.

**Classes:** os 13 pares de multiplicidade desenhados correspondem às referências canônicas (ver matriz). A ausências de 5 relações pertinentes aos 16 nós faz do CL-G um *recorte parcial*, não modelo integrado completo. As multiplicidades do CL-03 e as regras clínicas não devem ser inferidas por aparência.

**Sequência:** o SQ-G é composição de dois objetivos (consultar dia + registrar administração) e inferências técnicas. Se exigido rigor de métodos implementados, o SQ-03 de 4 linhas de vida é a referência mais estrita. A auditoria não executou a aplicação nem validou os serviços.

**Atividades:** sequência de autorização foi corrigida em layout e semântica; o recorte descreve uma jornada **de escrita autorizada**, não o fluxo isolado de leitura da Pessoa Idosa. Horário DST ambíguo e usuário que só consulta são cenários fora da trilha principal.

**Banco:** das 34 tabelas e 79 FKs do SQL, o DB-G exibe 17 tabelas e apenas exemplos de ligação física; não pode ser declarado equivalente ao EER íntegro. O `.mwb` original permanece preservado.

## Gate de saída para os professores

1. Corrigir/complementar cinco vínculos canônicos entre classes já exibidas, ou **renomear oficialmente** CL-G como “recorte central seletivo” com justificativa visível na prancha.
2. Conferir todas as participações do UC-G com os CA aprovados, inclusive restrições por papel/contexto, antes de expor “16 funcionalidades do sistema” como se fossem a cobertura total.
3. Se a banca solicitar sequência integral, separar negação de leitura, replay/409, fallbacks (ou ausência deles) e indisponibilidade de trilha de auditoria.
4. Apresentar EER-G pelo **SVG/MWB canônico**, não pela prancha de índice como se contivesse tabelas.
5. Testar leitura/zoom em projetor e colher aprovação docente/humana. **PR #134 permanece Draft; não fazer merge automaticamente.**

**Status nesta rodada:** AG3-001–005 e 009 tiveram correção ou verificação direta; AG3-006–008/010–012 foram expostos e rastreados. Isso é evidência técnica interna, não parecer de homologação independente.
