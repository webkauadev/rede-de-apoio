# Auditoria V1 — Regras de negócio × modelo MySQL
> **Projeto:** Rede de Apoio a Cuidadores de Idosos. **Baseline auditada:** [main `4712047e`](https://github.com/webkauadev/rede-de-apoio/commit/4712047e4550e4504b213e638aaf8a17310f4935), 13/10/2026.
>
> **Natureza:** documentação de rastreabilidade e auditoria. Não cria nem altera RN, RF, RNF, US, critérios, decisões, DDL, permissões ou estados de implementação.

## Por onde começar

1. [Auditoria das regras de negócio e suas garantias](AUDITORIA_REGRAS_NEGOCIO.md): RN-001–011; N01–N04; DB-001–038; DEC-AUTH-001; distinção SQL versus aplicação e ressalvas.
2. [Matriz RF/RNF → US → tabelas e inventário das 34 tabelas](MATRIZ_RF_RNF_US_TABELAS.md): rastreabilidade por requisito, função e evidência física.
3. [Matriz estruturada JSON](MATRIZ_RASTREABILIDADE.json): consumo por diagramas, revisão automatizada e slides; os vínculos são **analíticos**, não alterações no registro canônico.
4. [SQL consolidado](../../../entrega/sql-eer/01_schema_completo_v1.sql), [manifesto físico](../../../entrega/sql-eer/02_manifest_estrutura.json) e [provas MySQL/EER](../../../entrega/sql-eer/RELATORIO_FINAL.md): fontes técnicas com 34 tabelas, 79 FKs, 50 CHECKs e 44 UNIQUE secundárias.

## Regra → RF/RNF → US → tabelas

A lista abaixo é um **índice de vínculos relevantes**, não uma declaração de que cada RN tenha uma única US de origem. Requisitos transversais **RF13** e **RNF03** não originam US adicional; os detalhes e os limites de garantia estão na auditoria.

| Regra | Sentido de negócio | RF/RNF relacionados | US relacionadas | Tabelas ligadas |
|---|---|---|---|---|
| **RN-001** | Exatamente um Familiar Principal ativo por rede operacional; transferência atômica. | RF04, RF05 | US-005, US-006, US-007 | `rede_cuidado`, `membro_rede`, `atribuicao_papel_familiar` |
| **RN-002** | Papéis familiares Principal/Apoio/Emergência são acumuláveis; permissões positivas se somam, sem superar restrições; avisos não duplicam. | RF05, RF25, RF27 | US-007, US-029, US-031 | `membro_rede`, `atribuicao_papel_familiar`, `entrega_tecnica_notificacao` |
| **RN-003** | Plantonista Atual é condição temporária calculada pelo turno, não perfil nem categoria; sobreposições entre plantões diferentes são permitidas. | RF06, RF08, RF17 | US-008, US-011, US-020 | `plantao`, `membro_rede`, `historico_plantao` |
| **RN-004** | Profissional da Saúde é categoria independente, sem papel familiar; ao menos um por rede operacional. | RF04, RF05 | US-005, US-006, US-007 | `usuario`, `membro_rede`, `atribuicao_papel_familiar`, `rede_cuidado` |
| **RN-005** | Fatos de cuidado originais não podem ser apagados ou sobrescritos para corrigir. | RF11, RF12, RNF02 | US-015, US-016, US-034 | `registro_cuidado`, `consulta`, `administracao_medicamento`, `correcao_registro_cuidado`, `correcao_consulta`, `correcao_administracao_medicamento` |
| **RN-006** | Correção versionada vinculada ao original, com justificativa, autoria e instante; quem corrige deve poder criar aquele tipo de fato. | RNF02, RF13 (transversal) | US-034 | `registro_cuidado`, `consulta`, `administracao_medicamento`, `correcao_registro_cuidado`, `correcao_consulta`, `correcao_administracao_medicamento`, `usuario` |
| **RN-007** | Dados pessoais e de saúde são restritos a usuários autorizados; proteção e rastreabilidade. | RNF01 | US-035 (transversal às demais operações) | `usuario`, `pessoa_idosa`, `rede_cuidado`, `membro_rede`, `registro_cuidado`, `consulta`, `administracao_medicamento`, `anexo`, `auditoria` |
| **RN-008** | Auditar usuário, categoria/papéis, idoso, tempo, ação, recurso e resultado; inclusive CSV e negações. | RF29, RF28, RNF03 (transversal) | US-033, US-032 | `auditoria`, `usuario`, `pessoa_idosa`, `rede_cuidado` |
| **RN-009** | Pessoa Idosa possui conta própria vinculada ao perfil, acesso somente leitura e sem papéis/plantões/CSV. | RF30, RF02 | US-036, US-002 | `usuario`, `pessoa_idosa`, `habilitacao_acesso_idoso`, `membro_rede`, `atribuicao_papel_familiar`, `auditoria` |
| **RN-010** | Criar/corrigir registros depende da categoria, papel, vínculo e responsabilidade contextual na ação. | RF11, RF16, RF18, RNF01 | US-015, US-019, US-021, US-035 (exemplos) | `usuario`, `membro_rede`, `atribuicao_papel_familiar`, `plantao`, `tarefa`, `registro_cuidado`, `consulta`, `administracao_medicamento`, `auditoria` |
| **RN-011** | Somente Familiar Principal vigente exporta CSV de histórico autorizado; operação auditada. | RF28, RNF03 (transversal) | US-032 | `registro_cuidado`, `correcao_registro_cuidado`, `consulta`, `administracao_medicamento`, `atribuicao_papel_familiar`, `auditoria` |

### Eventos N01–N04

| Evento | Requisito de origem | US de origem | Principais tabelas |
|---|---|---|---|
| **N01** | RF10 | US-014 | `plantao`, `historico_plantao`, `atribuicao_papel_familiar`, `entrega_tecnica_notificacao` |
| **N02** | RF17 | US-020 | `ocorrencia_programada`, `plantao`, `membro_rede`, `entrega_tecnica_notificacao` |
| **N03** | RF25 | US-029 | `registro_cuidado`, `administracao_medicamento`, `conclusao_tarefa`, `preferencia_notificacao`, `entrega_tecnica_notificacao` |
| **N04** | RF26 | US-030 | `ocorrencia_programada`, `administracao_medicamento`, `conclusao_tarefa`, `preferencia_notificacao`, `entrega_tecnica_notificacao` |

## Como interpretar as garantias

- **Garantia estrutural do MySQL:** PK/FK, UNIQUE, CHECK, colunas geradas e relacionamentos efetivamente presentes no DDL.
- **Garantia de serviço:** autorização por identidade, rede e momento, vigência de papéis/plantões, transação do primeiro Principal e Profissional, processamento de eventos, bloqueio de UPDATE/DELETE e auditabilidade de operações negadas. O SQL sozinho **não** prova que esses comportamentos funcionam.
- **Resultado de teste da Issue #124:** importação em MySQL 8.4.11 descartável, restrições físicas e EER conferidos. Os testes da Issue #124 **não** certificam aplicação ponta a ponta, LGPD, operação clínica ou implantação.

## Fontes de autoridade

- [Regras RN-001–011](../../02_BUSINESS_RULES/BUSINESS_RULES.md), [notificações N01–N04](../../02_BUSINESS_RULES/NOTIFICATIONS_RULES.md) e [matriz de permissões](../../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md).
- [Requisitos RF/RNF](../../01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml), [US](../../01_REQUIREMENTS/USER_STORIES_INDEX.yaml) e [critérios canônicos](../../01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml).
- [Decisões V1](../../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md), [convites DEC-AUTH-001](../../10_IMPLEMENTACAO/DEC_AUTH_001_CONVITES_CUIDADORES.md) e [limites do banco](../../../database/mysql/DECISOES_E_LIMITES.md).

## Apreciação humana / atualização

Esta pasta é uma fotografia rastreável da V1, criada para estudo, revisão de regras e preparação da apresentação acadêmica. **Não substitui** os arquivos canônicos acima. Mudança funcional real exige ADR/Issue, critério aprovado quando aplicável e PR próprio. Revalidar estas matrizes sempre que DDL, regras ou US mudarem.

### Validação documental desta entrega

- 11 RN, 4 notificações, 38 ADRs e DEC-AUTH-001 presentes.
- 30 RF, 3 RNF e 36 US relacionados.
- 34 tabelas cobertas uma vez por grupo; referências de tabelas verificadas contra o inventário.
- Baseline e limites das evidências explicitados, sem se declarar conformidade regulatória ou software completo.
