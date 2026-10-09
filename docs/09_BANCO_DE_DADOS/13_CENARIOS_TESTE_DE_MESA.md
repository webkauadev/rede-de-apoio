# 13 — Laboratório de teste **sem banco**: exercícios de mesa

**IMPORTANTE:** cenários escritos e raciocinados; **não foram executados em MySQL**, não há testes de integração nem garantia de sistema perfeito. Objetivo: capturar erros lógicos antes de desenhar SQL. Dados fictícios: Pessoa A, Pessoa B, Rede R1/R2; nunca dados reais de saúde.

## Miniuniverso sintético

- R1 cuida da Pessoa A. Ana: Familiar Principal+Emergência de R1. Bruno: Familiar Apoio de R1. Carla: Profissional Saúde de R1.
- R2 cuida da Pessoa B. Diego: Familiar Principal de R2. Eva: Profissional Saúde de R2.
- Plantão P1, R1, Bruno, 10:00–12:00. Plantão P2, R1, Carla, 12:00–14:00.
- Tarefa X de R1 tem horário previsto 10:00, atribuída a Bruno; Evento clínico Y de R1 é sintoma espontâneo.
- Todos os vínculos estão ativos salvo quando cenário disser o contrário.

## Testes de lógica (resultado esperado, ainda não medido)

| ID | Ação/condição | Esperado | Regra |
|---|---|---|---|
| T01 | Ana tenta acumular Principal+Emergência | permitido | RN-002 |
| T02 | Inserir segundo Principal ativo em R1 | rejeitar | RN-001 |
| T03 | Transferir Principal Ana→Bruno | transação termina com exatamente um Principal; nenhuma janela exposta | RN-001 |
| T04 | Duas transferências concorrentes Ana→Bruno e Ana→Carla | uma consistente; outra conflito; nunca 0 ou 2 Principais | RN-001/RN-004 |
| T05 | Carla Profissional recebe papel Principal | rejeitar | RN-004 |
| T06 | Remover Carla como último Profissional de rede operacional | rejeitar ou suspender sob decisão; nunca continuar ativa sem Profissional | RN-004 |
| T07 | Desvincular Bruno e consultar autoria antiga | autoria permanece; Bruno não pode mais acessar | RF04/RNF01 |
| T08 | Associar tarefa R1 a membro R2 | rejeitar | integridade de escopo |
| T09 | Plantonista 11:59:59 | Bruno em R1 | RN-003 |
| T10 | Plantonista exatamente 12:00:00 | Carla em R1, se intervalos [inicio,fim) aprovados | temporal PROPOSTO |
| T11 | Pessoa Idosa tenta criar tarefa | negar e auditar | RN-009/RNF01 |
| T12 | Pessoa Idosa consulta seu histórico T07 | permitir apenas registros autorizados do próprio perfil | RF30 |
| T13 | Pessoa A tenta GET da Pessoa B | negar e auditar, sem payload de B | RNF01 |
| T14 | Bruno fora de plantão e sem atribuição escreve diário | negar | RN-010 |
| T15 | Bruno Plantonista Atual escreve registro compatível | permitir se condições atuais e categoria autorizarem | RN-010 |
| T16 | Carla escreve registro fora de saúde | negar | RN-004/RN-010 |
| T17 | Outra pessoa com permissão atual corrige registro de Ana | permitir, inserir nova versão | RN-006 |
| T18 | Autor original sem permissão atual corrige | negar; original intacto | RN-006 |
| T19 | Duas correções tentam gravar mesma versão | apenas uma versão N+1 válida | RNF02 |
| T20 | Tentar UPDATE/DELETE corretivo sobre original | rejeitar; histórico preservado | RN-005 |
| T21 | Aceitar pedido de troca de P1 | atribuição muda atomicamente; log/evento coerentes | RF09 |
| T22 | Recusar troca de P1 | atribuição não muda | RF09 |
| T23 | Reenviar aceite já aplicado | não efetuar a troca duas vezes | RF09 |
| T24 | N02 às 11:00 em R1 | somente Bruno, não Ana nem “Plantonista” fictício | RF17 |
| T25 | N02 às 12:00 em R1 | somente Carla se P2 ativo e política temporal aprovada | RF17 |
| T26 | X prevista 10:00, registro às 10:14:59 | não atrasada | RF26 |
| T27 | X prevista 10:00, sem registro às 10:15 | atrasada, sujeito à regra de borda aprovada | RF26 |
| T28 | Y sintoma espontâneo sem registro agendado | nunca atraso N04 | RF26 |
| T29 | Ana Principal+Emergência recebe N03 | exatamente uma notificação pelo mesmo evento | P06 |
| T30 | Bruno desabilita N03 opcional | preferência não altera entrega obrigatória à Ana | RF27 |
| T31 | Ana tenta desligar N02 para plantonista | rejeitar; obrigatório | RF17 |
| T32 | Diego tenta exportar CSV da Pessoa A | negar e auditar | RF28/RNF01 |
| T33 | Ana exporta CSV da Pessoa A | permitir somente campos autorizados e auditar | RF28 |
| T34 | Bruno sem papel Principal tenta exportar CSV | negar mesmo que Apoio+Emergência | P05 |
| T35 | Administracao de regime A com horario do regime B | rejeitar | FK composta |
| T36 | Anexo de consulta da Pessoa A acessado por Diego | negar, sem URL utilizável | RF23/RNF01 |
| T37 | Alterar regime de medicamento após administração antiga | administração mantém contexto/posologia histórica | RNF02 |
| T38 | Acesso negado em recurso sensível | gravar evento auditável sanitizado; nenhum dado sensível no log | RNF03 |
| T39 | Remover autor de evento de saúde via CASCADE | impedir apagamento de histórico | RN-005/RN-008 |
| T40 | Inserir rede ainda sem Principal/Profissional | somente em bootstrap não operacional, se ADR aprovar | RN-001/RN-004 |
| T41 | Consulta tem recomendação mas não compromisso anterior | não rejeitar sem requisito que exija compromisso | RF19/RF20 |
| T42 | Reprocessar N04 da mesma ocorrência | não duplicar aviso ao mesmo destinatário/evento | proposta idempotência |

## Exercícios dirigidos de modelagem (sem SQL)

### E01 — Unicidade contextual
Desenhar registros de vinculação e papéis para Ana (Principal+Emergência) e Bruno (Apoio), mantendo uma só pessoa usuária para Ana. **Resposta esperada:** uma participação familiar de Ana em R1 com duas concessões simultâneas; não criar “Ana Principal” e “Ana Emergência” como usuários distintos.

### E02 — FK de escopo
Tarefa da R1 aponta para membro da R2. Como detectar? **Resposta esperada:** chave composta (rede_id,membro_id) validada na persistência ou validação transacional equivalente, não só id do membro.

### E03 — Versão concorrente
Original V0, correções V1; duas solicitações querem V2. **Resposta esperada:** lock/UNIQUE por registro+versão e uma política de retentativa; original e V1 intactos. Não afirmar que CHECK sozinho soluciona corrida.

### E04 — Relógio e ausência de execução
Previsto 08:00, sem registro às 08:14, 08:15 e 08:20. **Esperado:** antes do limiar não atrasado; depois atrasado; ausência de registro nunca prova cuidado não prestado; notificações sem duplicar por execução periódica.

### E05 — Permissão temporal
Bruno é Plantonista até 12:00; tenta escrever 12:01 sem atribuição explícita. **Esperado:** negar; associação histórica ao plantão terminado não concede permissão atual.

### E06 — Histórico vs auditoria
Diário “paciente comeu”, corrigido para “comeu metade”; o log guarda mudança. **Esperado:** histórico de cuidado conserva original e versão; auditoria registra ação e autor sem duplicar texto clínico.

## Gate para futura etapa SQL

Todos os cenários críticos T01–T42 precisam de: modelagem final, responsável técnico, restrição/contrato que protege, execução positiva/negativa, saída MySQL e evidência. Nesta etapa possuem somente resultados **esperados**, não passaram em banco.
