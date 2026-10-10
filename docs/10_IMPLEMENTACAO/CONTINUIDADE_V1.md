# Sequência incremental após infraestrutura #117

Planejamento derivado de [IMPLEMENTATION_BACKLOG.json](IMPLEMENTATION_BACKLOG.json),
sem novo tracker, novos aceites ou autorização para iniciar US nesta branch.
Cada US terá testes e PR próprios, consultando Issue, origem única, `decision_dependencies`,
comentário aprovado em `ACCEPTANCE_CRITERIA.yaml`, telas/estados e gates de execução.
Os grupos abaixo ordenam dependências técnicas; não prometem data nem completude funcional.

| Ordem | Incremento e Issues oficiais | Dependências para iniciar |
|---|---|---|
| 1 | Identidade: US-001 #37, US-002 #38; fundação de bloqueio/auditoria US-035 #71 | Scaffold revisado/merge humano; DB-016/025/038; ambiente de persistência autorizado antes de integrar sessões; G-AUTH/G-DB |
| 2 | Perfil: US-003 #39, US-004 #40 | Identidade; bootstrap restrito DB-002, perfil sem rede não concede acesso |
| 3 | Rede/papéis: US-005 #41, US-006 #42, US-007 #43; acesso titular US-036 #72 | Perfil e identidade; DB-001/002/003/004/017/027/028; constituição atômica com Principal e Profissional; titular depende de vínculo/convite |
| 4 | Composição Home e navegação T03 | Usar escopos das US existentes RF07/17/25/26, sem criar US de Home; mostrar somente dados já implementados e autorizados |
| 5 | Escala/dia/troca: US-008 #44, US-009 #45, US-010 #46, US-011 #47, US-012 #48, US-013 #49, US-014 #50 | Rede e autorização; DB-005/006/015/022; concorrência real; N01 contextual em T04 |
| 6 | Tarefas: US-024 #60, US-025 #61 | Rede/escala; DB-007/032; uma conclusão, idempotência e conflito |
| 7 | Diário/sintomas: US-015 #51, US-021 #57 | Escrita contextual P03; autoria/instante; original preservado; Bottom Sheet T06 |
| 8 | Histórico/correção: US-016 #52, US-034 #70 | Originais de cuidado; DB-008/034/035/036; autorização por tipo, versões imutáveis |
| 9 | Medicamentos: US-017 #53, US-018 #54, US-019 #55 | Rede, agenda e autorização; DB-010/011/015/021/029/033; horários civis/DST, fato realizado distinto de previsto |
| 10 | Consultas/anexos: US-022 #58, US-027 #63 | Rede e registros; DB-009/013/037; storage privado autorizado, tipo/conteúdo/escopo validados |
| 11 | Compromissos/contatos/emergência: US-023 #59, US-026 #62, US-028 #64 | Rede/agenda; DB-009/012/019; T15 edição só Principal |
| 12 | N02–N04/preferências/log: US-020 #56, US-029 #65, US-030 #66, US-031 #67, US-033 #69 | Escala, tarefas/medicações e registros; DB-014/023/024/030/031/038; N02 singular elegível, sem fallback/inbox; auditoria transversal já requerida nas operações anteriores |
| 13 | CSV: US-032 #68 | Histórico/autorização/auditoria; P05, somente Principal; testes negativos por ator/escopo e proteção de CSV |
| 14 | Revisão integrada | 36 US verificadas, G-UI/G-SEC/G-APP; acessibilidade, responsividade, read-only em T03–T15 e negação T16/T17/CSV; produção só após demais gates |

Todas as 36 US aparecem uma vez como incremento principal; identidade/autorização/auditoria
continuam transversais às etapas seguintes. Não adiar testes negativos para a revisão final.
O acesso titular US-036 exige identidade e rede, portanto a preparação ocorre desde o primeiro
incremento, mas sua conclusão ponta a ponta segue o bootstrap de rede.

Próximo PR: US-001/#37 (RF01→T02). Antes de iniciar, esperar revisão e merge humano de #117,
ler o comentário aprovado `5673832998`, confirmar ambiente MySQL descartável autorizado para
testes de persistência e delimitar o que o PR comprovará. Nenhum banco foi autorizado nesta missão.
Se integração real não estiver liberada, registrar G-DB pendente e não declarar cadastro persistente
concluído apenas com mocks. Nenhuma US foi marcada como iniciada/concluída pelo scaffold.
