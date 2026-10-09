# 25 — Motor conceitual de lembretes/atrasos: N02 e N04, idempotência e segurança

**Não é implementação nem autorização de nova tela.** Fontes canônicas: RF17/US-020; RF25/US-029; RF26/US-030; RF27/US-031; RN-002/003/008/009/010; docs/02_BUSINESS_RULES/NOTIFICATIONS_RULES.md. N01–N04 são feedback transitório AppShell, sem Central de Notificações ou histórico consultável de avisos.

## E1. Contrato distinto para N02 e N04

**N02 — lembrete obrigatório:** disparar no horário previsto de cuidado programado e enviar **somente ao usuário que ocupa Plantonista Atual naquele instante**. Destinatário real é uma identidade usuária, não o papel virtual “PLANTONISTA_ATUAL”.

**N04 — alerta de ausência de registro após 15 minutos:** disparar quando ação *programada com horário* estiver sem registro após o limiar. Familiar Principal deve receber, outros elegíveis conforme opção. **Não** equivale a diagnóstico de não execução ou falta de cuidado. Sintomas/intercorrências espontâneas não são atrasados.

**N03 — cuidado realizado:** fato de execução registrada, Principal obrigatório e outros elegíveis opcionais. N03 não deve nascer de simples agendamento. **N01 — mudança de plantão:** modificação efetiva, não necessariamente tentativa de pedido/recusa. Regras completas em 09_NOTIFICACOES.md.

## E2. Identidade de evento e destinatário

Os mesmos agendamentos podem ser processados diversas vezes por jobs, sessão reconectada ou timeout. A chave proposta de evento precisa identificar:
- escopo de rede/pessoa (quando necessário e seguro);
- origem lógica do cuidado (tarefa, ocorrência de medicação ou outra fonte);
- **ocorrência datada específica** e versão de plano relevante;
- tipo N01/N02/N03/N04;
- usuário destinatário efetivo;
- revisão/geração do evento para não tratar reagendamento como repetição antiga.

**PROPOSTA:** chave de deduplicação técnica baseada nesses componentes, estável para reprocessamento do mesmo evento. Deduplicar N02 de segunda-feira separadamente do N02 de terça para a mesma regra diária.

A acumulação de papéis não cria vários avisos: unir destinatários pelo **usuario_id no contexto e no evento**. Se membro acumula Principal + Emergência, N04 para ele deve ter 1 entrega obrigatória, não 2.

## E3. Processamento esperado, conceitual (sem SQL)

**N02:**
1. Identificar ocorrência programada elegível e instante previsto pelo relógio confiável.
2. Resolver rede/pessoa idosa do fato. Verificar se o plano continua vigente na versão pertinente e não foi cancelado.
3. Consultar Plantonista Atual efetivo nesse instante conforme estado confirmado do plantão e vínculo.
4. **Se 0 ou vários candidatos e não houver política canônica:** registrar falha de resolução, não escolher arbitrariamente; DB-030.
5. Criar feedback/entrega técnica para o usuário autorizado, com chave idempotente e apresentação sem dado sensível.
6. Se usar outbox, garantir que o evento de domínio e sua emissão sejam consistentes após commit. Nunca anunciar troca que sofreu rollback.

**N04:**
1. Encontrar ocorrência programada com horário previsto + limite completo, excluindo espontâneos.
2. Verificar ausência de registro de execução **na base no instante da avaliação**.
3. Selecionar Principal vigente (obrigatório) e elegíveis adicionais autorizados/preferências vigentes.
4. Deduplicar por ocorrência/tipo/usuário para evitar 1 N04 a cada poll.
5. Registrar apenas o mínimo operacional/auditável necessário, sem criar Central ou histórico de mensagens.
6. Registro posterior/correção não reinterpreta retrospectivamente o fato “estava sem registro em T”; a UI atual pode atualizar projeção, preservando auditoria de disparo.

**ATENÇÃO:** leitura e gravação separadas podem competir com conclusão ou alteração. Precisa uma estratégia atômica/versão e observação consistente; DB-031. Não equiparar “processamento exatamente no horário” à garantia de entrega em tempo real sem arquitetura de mensageria.

## E4. Falhas e recuperação

| Cenário | Tratamento proposto/pendente |
|---|---|
| N02 tenta resolver instante sem Plantonista Atual | status de exceção técnica; destinatário alternativo NÃO aprovado |
| N02 encontra dois plantonistas | não selecionar o primeiro; DB-005/DB-030 |
| N02 disparou e escala mudou em seguida | evento já emitido não pode ser silenciosamente removido; avaliar notificação N01 |
| N04 executa em 10:15:00 e conclusão entra ao mesmo tempo | decidir ordem linearizável de verificação/registro, DB-031 |
| N04 já enviado, registro aparece às 10:20 com executado_em alegado 10:05 | manter trilha do que se conhecia às 10:15; não marcar falha clínica |
| Principal+Emergência é mesma conta | 1 usuário destinatário |
| Cliente offline quando N02 dispara | sem canal offline definido, não afirmar entrega confiável; DB-014 |
| Retry após timeout de entrega | idempotência de evento, mas exactly-once externo não está comprovado |
| Alteração de horário gera nova ocorrência | nova versão/generation para impedir reaproveitar chave inválida |
| Usuário perde autorização enquanto mensagem está pendente | revalidar permissão e minimizar conteúdo antes de exibição |
| Pessoa Idosa read-only tenta alterar preferência opcional | negar; T16 indisponível |
| Feedback global histórico solicitado | não criar inbox, requisito proíbe Central |

## E5. Distinção entre outbox e inbox

- **Outbox técnico** (C03 condicional): fila de trabalho interna, com retries, status de transporte, expiração, chave deduplicadora e acesso reservado. Pode ser necessária se usar worker/serviço assíncrono.
- **Inbox de produto**: central/histórico de notificações consultável pelo usuário — **fora de escopo** conforme P04.
- **Auditoria**: eventos relevantes mínimos de segurança/negócio, não histórico completo de mensagens com conteúdo de saúde.
- **Snackbar/sonner**: componente visual transitório, não implica tabela nem fila permanente.

A documentação do MySQL Event Scheduler mostra que eventos recorrentes podem se sobrepor se a execução durar mais que o intervalo. Um agendador SQL não substitui locks e deduplicação; a decisão de tecnologia permanece DB-014.

## E6. Critérios para aceite técnico futuro

- N02 somente usuário vigente Plantonista Atual, sem vazamento para Principal por conveniência.
- N04 somente ação programada no limiar e sem execução registrada; nenhum espontâneo.
- N03 somente fato de realização registrada, não criação de plano.
- Obrigatórios não podem ser desligados por preferências opcionais.
- Sem duplicação de destinatário por acumulação de papéis nem por retries idempotentes.
- Destinatários resolvidos no contexto/instante correto, considerando troca/desvinculação.
- Ausência de Plantonista ou superposição não recebe destinatário inventado.
- Auditabilidade mínima do processamento sem exposição clínica.
- Nenhuma evidência de SQL ou entrega confiável alegada antes do teste de integração.

## Fontes

https://dev.mysql.com/doc/refman/8.4/en/events-overview.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html ; docs/02_BUSINESS_RULES/NOTIFICATIONS_RULES.md.
