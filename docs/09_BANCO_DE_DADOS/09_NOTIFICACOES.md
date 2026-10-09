# 09 — N01–N04: eventos, destinatários e persistência mínima

## Matriz canônica

| Evento | Gatilho | Destinatário obrigatório | Outros | Navegação |
|---|---|---|---|---|
| N01 | atribuir/alterar/cancelar/trocar plantão | afetado + Familiar Principal | não especificado | T04 |
| N02 | horário de cuidado programado | usuário que é Plantonista Atual **naquele instante** | ninguém pela regra atual | T05 |
| N03 | cuidado registrado como realizado | Familiar Principal | demais elegíveis conforme preferência | T05 ou T07 |
| N04 | ação programada ainda sem registro após 15 min | Familiar Principal | demais elegíveis conforme preferência | T05 (resumo possível T03) |

**Todas usam feedback transitório global (AppShell Snackbar/Sonner). Não existe Central de Notificações, sino nem histórico próprio acessível ao usuário**. T16 configura apenas eventos opcionais; obrigatórios não desligam.

## Estruturas de banco justificáveis

1. **preferencia_notificacao**: dado de negócio persistente para escolha de eventos opcionais (usuário, rede/contexto, tipo permitido, ativo). Não cadastrar “opt-out” para uma obrigação.
2. **evento de domínio**: fato gerador já existe em plantão, tarefa, registro, administração e auditoria. N01–N04 podem ser derivados desse fato.
3. **entrega_tecnica_notificacao** (condicional): outbox para reentrega/idempotência quando a arquitetura de mensageria exigir. Dado de infraestrutura temporário, nunca histórico de notificações do usuário.

PENDENTE: canal/infra de entrega, offline, retry, persistência de transporte; feedback local na tela pode não requerer tabela. Não adicionar tabela de inbox por conveniência.

## Resolução de destinatários (contrato)

- Calcular destinatários por **usuários únicos**, não por concessão de papel; uma pessoa Principal+Apoio recebe uma vez.
- Em N01, considerar quem foi afetado e Principal no contexto da operação aprovada.
- Em N02, resolver membro efetivamente de plantão no instante planejado, após eventuais trocas e cancelamentos; não notificar papel fictício “PLANTONISTA”.
- Em N03/N04, Principal obrigatório, elegíveis adicionais somente se opção ativa e permissão contextual.
- Não vazar dados sensíveis na mensagem de prévia; texto e ação precisam de autorização na abertura.
- Eventos emitidos por transação só devem ser entregues após confirmação para evitar alerta de operação revertida.

## Idempotência e relógio

Chave candidata (evento_origem_id, tipo N##, usuario_destinatario_id, ocorrencia_temporal). Reprocessamento do mesmo evento não gera dois avisos. Evitar disparo N04 em loop a cada verificação do relógio; registrar deduplicação técnica somente se realmente necessário.

## Testes de mesa

1. A é Principal+Apoio: N03 uma vez, não duas.
2. B é Plantonista Atual: N02 somente B.
3. Plantão B→C trocado antes de hora: N02 só C no momento do disparo.
4. Tarefa com hora 10:00 e execução registrada 10:14:59: N04 não dispara.
5. Tarefa com hora 10:00 e ainda sem registro às 10:15: N04 dispara conforme política exata de borda.
6. Sintoma espontâneo às 10:00 não cria N04.
7. Preferência desligada para N03 de Apoio não remove N03 obrigatório do Principal.
8. Mensagem persistida tecnicamente no outbox não é acessível por tela de histórico inexistente.
