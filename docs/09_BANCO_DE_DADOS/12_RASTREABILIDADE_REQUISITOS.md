# 12 — Matriz de rastreabilidade funcional para dados

O vínculo abaixo é de **responsabilidade de persistência proposta**, não de colunas aprovadas. Origem RF/RNF de cada US: docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml. Requisitos transversais RF13 e RNF03 não ganham segunda origem.

| US | Origem canônica | Operação/fato | Área/entidade candidata |
|---|---|---|---|
| US-001 | RF01 | cadastrar conta | usuario |
| US-002 | RF02 | autenticar-se | usuario / credencial conforme provedor |
| US-003 | RF03 | cadastrar pessoa idosa | pessoa_idosa, rede_cuidado |
| US-004 | RF03 | atualizar perfil | pessoa_idosa; auditar atualização |
| US-005 | RF04 | vincular membro | membro_rede e categoria |
| US-006 | RF04 | desvincular sem perder história | membro_rede (vigência), auditoria |
| US-007 | RF05 | gerir papéis acumuláveis | atribuicao_papel_familiar |
| US-008 | RF06 | criar/alterar/cancelar plantão | plantao, evento histórico se necessário |
| US-009 | RF07 | calendário | consulta sobre plantao/tarefa/compromisso |
| US-010 | RF07 | detalhes de um dia | consulta temporal sobre fontes de cuidado |
| US-011 | RF08 | atribuir plantonista | plantao+vinculo; condição calculada |
| US-012 | RF09 | solicitar troca | solicitacao_troca_plantao |
| US-013 | RF09 | responder troca | solicitacao_troca + atualização de plantao |
| US-014 | RF10 | avisar mudança N01 | evento de plantão; deduplicação N01 |
| US-015 | RF11 | registrar diário | registro_cuidado; autoria |
| US-016 | RF12 | consultar histórico | projeção autorizada; versões |
| US-017 | RF14 | cadastrar medicamento | medicamento |
| US-018 | RF15 | posologia e horário | regime_medicamento; horario_regime |
| US-019 | RF16 | registrar administração | administracao_medicamento, autor/hora |
| US-020 | RF17 | lembrete N02 | fontes programadas+plantão atual |
| US-021 | RF18 | sintomas/intercorrências | registro_cuidado (espontâneo) |
| US-022 | RF19 | consulta/recomendação | consulta; recomendacao |
| US-023 | RF20 | registrar compromisso | compromisso |
| US-024 | RF21 | criar/atribuir tarefa | tarefa e membro responsável |
| US-025 | RF21 | concluir tarefa | conclusao_tarefa |
| US-026 | RF22 | manter contatos | contato_importante |
| US-027 | RF23 | anexo contextual | anexo com destino por FK real |
| US-028 | RF24 | consultar emergência | informacao_emergencia |
| US-029 | RF25 | notificação N03 | evento de conclusão/registro; preferência opcional |
| US-030 | RF26 | atraso 15min N04 | evento previsto sem registro; projeção de atraso |
| US-031 | RF27 | preferências opcionais | preferencia_notificacao |
| US-032 | RF28 | CSV apenas Principal | consulta contextual + auditoria; não exige tabela própria |
| US-033 | RF29 | consultar log | auditoria |
| US-034 | RNF02 | corrigir sem apagar original | correcao_registro/versão |
| US-035 | RNF01 | bloquear e registrar negado | autorização por escopo; auditoria |
| US-036 | RF30 | acesso idoso read-only | usuario→pessoa_idosa, sem papéis, autorização |

## Cobertura transversal

- RF13 → autoria e data/hora em registros relevantes (não uma tabela RF13).
- RNF01 → controle de acesso a dados pessoais/de saúde em TODAS as leituras/gravações; negados auditados.
- RNF02 → imutabilidade e correção transversal; escopo de subtipos a fechar em ADR.
- RNF03 → trilha de auditoria para operações relevantes, independentemente da origem da US.
- RN-001–RN-011 → invariantes documentadas em [04](04_INVARIANTES_E_INTEGRIDADE.md).
- N01–N04 → gatilhos e destinatários em [09](09_NOTIFICACOES.md).
- T01–T17 → são superfícies, não uma tabela por tela.

## Rastreabilidade futura bidirecional

Durante implementação, cada tabela/coluna, constraint e rotina deverá possuir: justificativa/US/RF/RN, regra de integridade, cenário positivo/negativo que valida e evidência da execução. Se um campo não possui justificativa nem necessidade técnica documentada, classificá-lo como proposta e remover/adiar.


## Rastreabilidade da revisão DEC-S01–S03 (`migration_required`)

| Decisão | RF/US de origem a reconciliar | Resultado de modelagem / teste |
|---|---|---|
| DEC-S01: plantões simultâneos | RF06/US-008 e RF08/US-011 | `plantao` aceita intervalos sobrepostos; `Plantonistas Atuais` conjunto 0..N por rede/instante; C-T01–C-T07 |
| DEC-S03: alteração do mesmo plantão | RF09/US-012 e US-013; RF06/US-008 | travamento/versão por P, primeira confirmação válida, outra conflito; C-T09–C-T18 |
| DEC-S03: mesma tarefa/ciclo | RF21/US-025 | único registro de `conclusao_tarefa` por ciclo, idempotência e conflito; C-T19–C-T27 |
| DEC-S02: plano/execução/alerta distintos | RF15/US-018, RF16/US-019 e RF26/US-030 | `horario_regime`/ocorrência (candidata) ≠ `administracao_medicamento` ≠ evento N04; C-T28–C-T30 |
| LACUNA N02 em múltiplos plantonistas | RF17/US-020, regra N02 | DB-030 aberta; C-T08 e C-T31 não podem ser marcados como aprovados |

Estas linhas **não substituem nem criam origem de US**; são itens propostos para revisão das Issues e critério de aceite. Detalhe em [36](36_PLANO_MIGRACAO_REQUISITOS_DECISOES.md).
