# 06 — Planejamento temporal: plantões, trocas, tarefas e compromissos

## Fontes canônicas

RF06–RF10, RF20–RF21, RF26; US-008–014, US-023–025, US-030; RN-003, RN-010 e NOTIFICATIONS_RULES.md.

## Plantão

**Origem:** intervalo de plantão com responsável elegível e situação. **Destino:** T04 e T05, com reflexos em T03.

Campos sugeridos: plantao_id, rede_id, responsavel_membro_id, inicio_programado, fim_programado, status, criado_por, criado_em e revisão de operação. Datas em instante preciso, com timezone definido; evitar um campo textual “12h às 14h”.

Regra lógica **proposta**: intervalo semiaberto [início,fim). Com um plantão terminando às 12:00 e outro iniciando às 12:00, às 12:00 apenas o segundo estará ativo. Exigir início < fim. O término do intervalo revoga a condição de Plantonista Atual, mesmo que o cadastro do membro siga ativo.

**Ainda não decidido:** pode haver sobreposição de plantões? Várias pessoas simultaneamente Plantonista Atual? Escala 24h ou períodos opcionais? Plantão sem responsável? Alteração retroativa? Essas escolhas afetam cardinalidade, índice temporal, N02 e segurança de escrita.

## Troca solicitada

Ciclo candidato: SOLICITADA → ACEITA ou RECUSADA; cancelamento/expiração depende de decisão. A solicitação referencia plantão, solicitante, envolvido(s), instantes e resultado. Só usuários envolvidos elegíveis respondem; resposta é idempotente quanto ao efeito.

Operação de aceite (contrato, não SQL):
1. transação inicia, bloqueia plantão e solicitação ainda pendente;
2. confere vínculo e autorização atuais de todos os envolvidos na mesma rede;
3. confere que pedido está pendente e plantão não foi cancelado/alterado incompativelmente;
4. troca responsável/intervalo conforme política aprovada, preservando histórico;
5. grava evento de auditoria e evento N01;
6. confirma operação; qualquer falha faz rollback.
Recusa apenas registra decisão e aviso aplicável; nunca transfere responsável.

## Tarefa, responsabilidade, conclusão

- Tarefa pertence à rede/contexto da pessoa idosa; pode ter responsável atribuído e instante previsto.
- Conclusão é fato distinto de previsão. Quem conclui, quando concluiu e quando registrou são conceitos diferentes.
- **US-025 diz usuário responsável conclui tarefa**; reabertura e múltiplos executores não estão definidos, não presumir.
- Tarefa programada sem conclusão/registro depois do limiar de 15 minutos é candidata a atraso; tarefa sem horário não pode ser marcada atrasada apenas por ter sido criada.
- Atribuição operacional explícita pode conferir condição de escrita ao Apoio/Emergência para ação correspondente; evitar generalizar essa autorização para todos os tipos de registro.

## Compromisso e consulta

Compromisso é item planejado de calendário T11. Consulta RF19 registra encontro/recomendação relacionado à saúde. **Não pressupor** que toda consulta tenha compromisso anterior, nem que qualquer compromisso seja consulta. A relação opcional consulta→compromisso permanece ADR.

## Agregação para calendário, Home e Detalhamento

T03, T04, T05 e T07 são projeções por pessoa idosa/data autorizadas sobre múltiplas fontes, não duplicações de dados. Cada linha projetada deve fornecer: fonte real (tabela e ID), tipo, inicio/previsto, executor esperado/registrado, estado derivado e permissão. A consulta não pode misturar dados de outra rede nem perder eventos corrigidos.

### Critério de atraso N04

No instante T, um evento programado de horário H está atrasado se T >= H+15 minutos E ainda não há registro válido de execução para ele. **Não** classificar sintomas espontâneos. “Sem registro” não significa necessariamente não realizado. É obrigatório especificar fuso, latência, tolerância de relógio e idempotência para não disparar N04 repetidamente.

## Casos limites para modelagem

- Tarefa concluída aos 14min59s: não deve atrasar.
- Registro exatamente em H+15min: depende do instante do registro e semântica de concorrência; a política precisa ser aprovada.
- Plantão encerrado antes de disparar N02: usuário não é mais Plantonista Atual.
- Troca aceita durante a execução de lembrete N02: destinatário deve ser resolvido no instante do disparo, após ler estado confirmado.
- Responsável desvinculado: preserva histórico mas perde autorização futura; reatribuição pendente.
- Dois pedidos de troca sobre o mesmo plantão: só se aplica um efeito consistente, sem resposta duplicada.


## Revisão aprofundada — máquinas de estado e concorrência

O detalhamento de primeira rodada permanece base de contexto. A segunda revisão formalizou os **contratos propostos** de intervalo, responsável e versionamento e está em:
- [22 — Regras temporais](22_REGRAS_TEMPORAIS_E_RECURRENCIA.md);
- [23 — Plantões, trocas e tarefas](23_PLANTOES_TROCAS_TAREFAS_REVIEW.md);
- [26 — Cenários de mesa L-T01–L-T22](26_TESTES_MESA_DOMINIO_TEMPORAL.md).

**Observação de escopo:** o cálculo “Atrasado se T>=H+15 minutos” presente acima é uma convenção de implementação CANDIDATA. O requisito aprovado diz “após 15 minutos”; tratamento da igualdade e da corrida entre registro/worker precisa de DB-031. Sobreposição de plantões e múltiplos responsáveis também não foi decidida no RF.


## Orientação aprovada pelo solicitante — plantões simultâneos/concorrência

DB-005 foi resolvida para permitir **plantões distintos sobrepostos**. O calendário T04/T05 deve representar mais de um Plantonista Atual no mesmo intervalo, sem fundi-los ou rejeitar os plantões. A regra de destinatário N02 quando há múltiplos plantonistas é **DB-030 pendente** e não autoriza seleção aleatória ou envio obrigatório ao Principal.

Alterações conflitantes no mesmo plantão/versão e dupla conclusão da mesma tarefa/ciclo seguem o contrato proposto de primeiro COMMIT válido, versão esperada, lock e idempotência, conforme [33](33_CONTRATO_CONCORRENCIA_ATOMICA.md). Não confundir duas atividades simultâneas legítimas com dois comandos concorrentes sobre a mesma entidade. Ver [32](32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md).
