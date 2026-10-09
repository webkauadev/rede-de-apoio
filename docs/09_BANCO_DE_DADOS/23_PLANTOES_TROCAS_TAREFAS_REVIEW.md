# 23 — Revisão lógica rigorosa: plantões, trocas, tarefas e compromissos

**Não há DDL.** Esta especificação deriva dos RF06–RF10, RF20/21/26 e US-008–US-014/US-023–US-025/US-030. Hipóteses são rotuladas PROPOSTA ou PENDENTE. Ver [22](22_REGRAS_TEMPORAIS_E_RECURRENCIA.md) para relógio.

## P1. Plantão é responsabilidade temporal, não papel

Objeto candidato: identificador, rede, membro atribuído, instante previsto de início/fim, estado, criador, versão de modificação. “Plantonista Atual” não é coluna, mas resultado de consulta contextual a t:
- vínculo do usuário na mesma rede está vigente em t;
- membro pertence à categoria Familiar ou Profissional, não à própria conta de titular;
- plantão está ativo e intervalo [início,fim) contém t;
- autorização da ação ainda depende da matriz de permissões.

**HISTÓRICO anterior a DEC-S01:** DB-005 estava pendente. Em 2026-10-09 foi APROVADO pelo solicitante que podem existir vários plantonistas em plantões distintos sobrepostos; a seleção de destinatário N02 permanece DB-030. NÃO proibir sobreposições arbitrariamente nem selecionar primeiro membro do banco. Uma UNIQUE(rede_id,inicio) não proíbe sobreposição de intervalos de comprimentos diferentes.

### História de alteração

RF06 exige editar e cancelar; RF04/RN-008 exigem histórico relevante e auditoria. Alternativas:
1. estado atual de plantao + historico_plantao append-only para mudança de responsável/horário/cancelamento;
2. versões de plantao com intervalos de validade administrativa e uma projeção da versão vigente;
3. estado corrente e auditoria com snapshot suficientemente completo para reconstruir a escala (avaliar custo/necessidade).
**Decisão ainda DB-022.** Nunca sobrescrever uma troca passada de modo que perda de rastreabilidade ocorra. Cancelamento não apaga plantão anterior do histórico.

## P2. Troca de plantão: duas máquinas distintas

A. **Pedido**: SOLICITADO → ACEITO ou RECUSADO; cancelamento, expiração e múltiplas respostas são PENDENTES. Uma solicitação deve guardar pedido original, participantes envolvidos, plantão alvo, instante de solicitação, decisão e autor/horário da resposta.

B. **Escala**: no aceite, o plantão é atualizado/versão criada de forma atômica; na recusa a escala não muda. RF09/US-012/013 não define se troca significa substituição de responsável ou permuta de dois plantões: DB-006.

**OP-P1 (proposta para futuro serviço transacional):**
1. begin transação; bloquear agregador estável da rede/plantão e solicitação em ordem determinada;
2. checar ator, participantes, categoria, vínculo e pertença à rede **agora**;
3. exigir pedido ainda pendente e versão do plantão coerente com a versão quando o pedido foi criado;
4. confirmar se o alvo continua elegível no período e política de sobreposição permitiria resultado;
5. gravar nova atribuição/versão e decisão uma única vez, mais auditoria/outbox se necessário;
6. commit; gerar N01 só após o commit; recusa só grava decisão.
7. falha/conflicto: rollback, retorno sem alteração parcial; retries de deadlock previstos.

**Ponto crítico:** duas solicitações antigas podem disputar o mesmo plantão. O uso de versionamento otimista do plantão + lock transacional é proposta para rejeitar um segundo aceite obsoleto, não regra adicional de produto. Não considerar UPDATE sequencial na tela uma transação suficiente.

## P3. Tarefas: plano versus execução

Tarefa: rede, texto, responsável elegível, instante de vencimento/previsto se houver, estado de planejamento, criador. Conclusão: ação de responsabilidade, autor, instante de conclusão real e instante de registro. Consulta “tarefa concluída?” deve considerar o fato de conclusão válido, não apenas flag arbitrária sem auditoria.

- US-024: criar e atribuir.
- US-025: **responsável** marca como concluída; não permitir a qualquer membro sem validar responsabilidade e permissão.
- RF26: ação com horário programado sem registro após 15 min fica atrasada; tarefas sem hora definida não recebem atraso automático por essa regra.
- PENDENTE DB-007: múltiplos responsáveis, reabertura e revisões. A versão inicial deve evitar afirmar “somente 1 conclusão para sempre” sem decisão.
- PENDENTE DB-028: tarefa ou plantão futuro quando responsável perde vínculo; desligamento não deve criar autorização residual.

**OP-P2 (proposta de conclusão):** localizar tarefa no contexto correto; bloquear estado/versionamento; conferir responsável e elegibilidade efetivos; conferir se já houve conclusão para a mesma ocorrência; inserir fato de conclusão e auditar; confirmar. Repetição com a mesma chave de pedido deve retornar efeito idempotente ou conflito coerente. Não tratar dois cliques como duas execuções distintas sem justificação.

## P4. Compromisso x consulta

RF20 corresponde a compromisso planejado em T11 e RF19 a consulta/recomendação realizada em T10. **Não forçar herança ou FK obrigatória entre eles** até DB-009. Uma consulta pode ser registrada sem compromisso anterior segundo o conteúdo atual; não inferir que todas as consultas exigem agendamento.

## P5. Chaves, FKs e escopo

- FKs concretas (rede_id,membro_responsavel_id) para mesmo escopo quando possível.
- Troca referenciando plantão de R1 não pode conter respondente que só participa de R2.
- FK de responsável prova existência, não que vínculo está ATIVO naquela hora.
- FK status “ACEITA” não prova consistência com estado do plantão se duas alterações competiram: transação deve impor acoplamento.
- Versão de plantão ou hash de estado anterior é candidata à prevenção de aceite atrasado.
- Nenhum ON DELETE CASCADE em plantão, histórico de troca ou conclusão sem análise formal de retenção.

## P6. Matriz de transições e efeitos

| Operação | Pré-condições mínimas | Efeito aprovado | Evento |
|---|---|---|---|
| Criar plantão | ator autorizado, rede/contexto, intervalos válidos segundo ADR | novo plantão consultável | N01 |
| Alterar plantão | ator autorizado, estado elegível | calendário reflete alteração preservando trilha | N01 |
| Cancelar plantão | ator autorizado | não ser Plantonista Atual depois, preservar histórico | N01 |
| Solicitar troca | participante elegível e plantão referenciado | pedido persistido, escala ainda não alterada | N01 não afirmado apenas pelo pedido |
| Aceitar troca | participante envolvido e pedido pendente | escala reflete troca | N01 |
| Recusar troca | participante envolvido e pedido pendente | escala fica como estava | N01 não afirmado apenas pela recusa |
| Criar tarefa | ator autorizado | tarefa visível, responsável se atribuído | sem novo tipo de alerta inferido |
| Concluir tarefa | usuário responsável e autorizado | fato de conclusão/histórico | N03 se enquadrado como cuidado registrado |

*As linhas de N01 interpretam RF10 (atribuição, alteração, cancelamento ou troca efetiva); disparos de pedido/recusa não são afirmados como novos gatilhos. O detalhe de notificações depende da superfície permitida e do backend.*

## P7. Testes de concorrência obrigatórios posteriormente

- Duas trocas aceitas para mesma versão do plantão: apenas uma aplica.
- Troca aceita ao mesmo tempo que cancelamento: resultado serializado, não dois estados contraditórios.
- Desvinculação concorre com atribuição: não gerar atribuição nova a membro sem autorização vigente.
- Duas conclusões concorrentes da mesma ocorrência: uma gravação ou política de múltiplas conclu­sões expressamente aprovada.
- Dois plantões com intervalos parcialmente sobrepostos: resultado depende DB-005; ainda não classificar “válido” automaticamente.
- Leitura do Plantonista Atual em fronteira exata e perto da troca deve usar estado confirmado do banco e relógio aprovado.

## Fontes técnicas

https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html

O lock em faixa depende do índice/predicado percorrido: serializar em linha estável da rede/plantão pode ser necessário. MySQL/InnoDB não tem constraint declarativa de exclusão genérica de sobreposição equivalente a tipos range de outros bancos; não afirmar que uma UNIQUE simples faz esse serviço.


## Atualização posterior do solicitante — 2026-10-09

**Esta seção substitui a dúvida de DB-005 sobre SOBREPOSIÇÃO escrita nas seções P1/P7 acima.** DEC-S01 aprova mais de um plantão simultâneo na mesma rede: sobreposição entre P1/P2 não impede criação, alteração ou coexistência de Plantonistas Atuais. Cada plantão mantém o próprio ID/responsável/versão; não criar validação temporal de exclusão. Veja [32](32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md).

**DEC-S03:** uma versão de **um mesmo plantão** não pode ter duas alterações conflitantes efetivas. Um aceite de troca, cancelamento ou alteração vence por confirmação transacional válida; outro comando baseado na versão anterior retorna conflito/refresh. Tarefas: uma conclusão por `tarefa+ciclo`; duas solicitações concorrentes não geram duas conclusões. Ver [33](33_CONTRATO_CONCORRENCIA_ATOMICA.md) e [34](34_CASOS_PLANTOES_SIMULTANEOS_CONFLITOS.md).

**Separação:** não confundir (a) duas equipes trabalhando em plantões diferentes mas simultâneos, situação permitida, com (b) duas pessoas alterando o mesmo P1, situação de conflito. A reabertura da mesma tarefa em novo ciclo e a escolha de destinatário N02 em multilateralidade continuam pendentes DB-007/030.
