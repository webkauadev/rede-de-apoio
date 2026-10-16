# Matriz inicial de rastreabilidade UML

Fontes canônicas: `REQUIREMENTS_INDEX.yaml` (2026-09-14), `USER_STORIES_INDEX.yaml` e `ACCEPTANCE_CRITERIA.yaml` (2026-09-15), `TRACEABILITY_MATRIX.md`, regras de negócio e decisões V1 (2026-10-09). `CA` significa a seção de critério aprovado `ACCEPTANCE_CRITERIA.yaml#US-xxx`. “Candidato” é proposta de cobertura a validar na segunda missão, não um novo requisito ou diagrama já criado.

| RF/RNF → US | Objetivo / ator | Caso de uso candidato | Classes/conceitos candidatos | Cenário / atividade ou estado candidato | Dados persistentes candidatos | Tela | CA / situação |
|---|---|---|---|---|---|---|---|
| RF01 → US-001 | usuário autorizado cadastra conta | Cadastrar conta | Conta, Usuário, convite | sequência cadastro/validação; atividade de cadastro | usuário, convite, rate limit | T02 | CA US-001; sequência candidata |
| RF02 → US-002 | usuário cadastrado entra | Autenticar-se | Conta, Credencial, Sessão | sequência login: válido/inválido; estado de sessão é técnico a avaliar | usuário, sessão, rate limit | T01 | CA US-002; sequência candidata |
| RF03 → US-003 | Principal cadastra Pessoa Idosa | Cadastrar perfil da Pessoa Idosa | Pessoa Idosa, Rede, Membro | sequência bootstrap; atividade constituição da rede | pessoa idosa, rede, membro | T12 | CA US-003; V1 B3 exige validação |
| RF03 → US-004 | Principal atualiza perfil | Atualizar perfil | Pessoa Idosa | sequência/atividade de atualização se relevante | pessoa idosa, auditoria | T12 | CA US-004 |
| RF04 → US-005 | Principal vincula membro | Vincular membro | Membro, vínculo, categoria, papel | sequência vínculo/autorização; atividade de constituição | membro, atribuição de papel | T13 | CA US-005 |
| RF04 → US-006 | Principal desvincula membro | Desvincular membro | Membro, vínculo, plantão/tarefa futuros | sequência com restrições; estado do vínculo candidato | membro, histórico/auditoria | T13 | CA US-006; regras V1 |
| RF05 → US-007 | Principal gerencia papéis | Gerenciar papéis familiares | Papel, atribuição, Membro | sequência transferência/validação; estado não presumido | atribuição de papel, auditoria | T13 | CA US-007; RN-001/RN-002 |
| RF06 → US-008 | autorizado cria/altera/cancela plantão | Gerenciar plantões | Plantão, responsável, histórico | atividade agenda; máquina de Plantão candidata | plantão, histórico plantão | T04 | CA US-008 |
| RF07 → US-009 | autorizado consulta escala | Consultar calendário | Plantão, calendário | sequência de consulta seletiva | plantão | T04, T03 | CA US-009; leitura pode não exigir sequência própria |
| RF07 → US-010 | autorizado consulta dia | Consultar detalhe do dia | Plantão, tarefa, cuidado programado, execução | sequência composição do dia | dados de agenda/cuidado | T05 | CA US-010 |
| RF08 → US-011 | autorizado atribui plantonista | Atribuir responsável a plantão | Plantão, Membro, condição temporal | sequência elegibilidade; atividade de atribuição | plantão, histórico | T04, T13 | CA US-011; Plantonista Atual não é classe de papel |
| RF09 → US-012 | vinculado solicita troca | Solicitar troca de plantão | Solicitação de troca, Plantão, Membro | sequência solicitar; máquina da Solicitação candidata | solicitação de troca | E06 | CA US-012 |
| RF09 → US-013 | envolvido aceita/recusa | Responder troca de plantão | Solicitação de troca, Plantão | sequência `alt` aceitar/recusar/conflito; máquina candidata | solicitação, histórico plantão | E07 | CA US-013 |
| RF10 → US-014 | afetado recebe aviso | Notificar mudança de plantão | Evento de notificação, Plantão | sequência de disparo; atividade se paralelismo for documentado | outbox técnica/auditoria candidata | N01→T04 | CA US-014; sem inbox |
| RF11 → US-015 | autorizado registra ocorrência | Registrar no diário | Registro de Cuidado, Autor | sequência registro/autorização; atividade de validação | registro cuidado, auditoria | T06 | CA US-015 |
| RF12 → US-016 | autorizado consulta histórico | Consultar histórico | Registro de Cuidado, correção | sequência consulta seletiva | registros/correções | T07 | CA US-016 |
| RF14 → US-017 | autorizado cadastra medicamento | Cadastrar medicamento | Medicamento, regime | atividade/seq. cadastro se selecionado | medicamento, regime | T08 | CA US-017 |
| RF15 → US-018 | autorizado registra posologia | Definir posologia e horários | Regime, Horário, ocorrência programada | atividade de agendamento; estados só se regra justificar | regime, horário, ocorrência | T08 | CA US-018 |
| RF16 → US-019 | autorizado registra administração | Registrar administração | Administração, ocorrência, Medicamento | sequência fato realizado; atividade de autorização | administração, correção | T08, T05 | CA US-019; ausência ≠ não realização |
| RF17 → US-020 | Plantonista Atual recebe lembrete | Receber lembrete programado | Ocorrência, responsável designado, entrega técnica | sequência resolução N02; atividade temporal candidata | ocorrência, outbox/auditoria | N02→T05 | CA US-020; V1 DB-030 |
| RF18 → US-021 | autorizado registra sintoma/intercorrência | Registrar sintoma/intercorrência | Registro de Cuidado | sequência de registro pode compartilhar US-015 | registro cuidado | T06, T05 | CA US-021; espontâneo não é atraso |
| RF19 → US-022 | autorizado registra consulta/recomendação | Registrar consulta/recomendação | Consulta, Recomendação | atividade/seq. de registro seletiva | consulta, recomendação, correção | T10 | CA US-022 |
| RF20 → US-023 | autorizado registra compromisso | Registrar compromisso | Compromisso | atividade agenda candidata | compromisso | T11, T05 | CA US-023 |
| RF21 → US-024 | autorizado cria/atribui tarefa | Gerenciar tarefas | Tarefa, responsável, conclusão | atividade criação/atribuição; ciclo candidato | tarefa | T09 | CA US-024 |
| RF21 → US-025 | responsável conclui tarefa | Concluir tarefa | Tarefa, Conclusão | sequência idempotente; máquina Tarefa candidata | conclusão, idempotência | T09, T05 | CA US-025; V1 sem reabertura |
| RF22 → US-026 | autorizado mantém contatos | Manter contato importante | Contato Importante | sequência só se houver colaboração relevante | contato | T14 | CA US-026 |
| RF23 → US-027 | autorizado anexa arquivo | Anexar documento/imagem | Anexo, registro/consulta/administração | sequência upload/autorização | anexo/metadados | E10/T06/T10 | CA US-027 |
| RF24 → US-028 | autorizado consulta emergência | Consultar emergência | Informação de Emergência | leitura; edição tem regra V1 separada | informação emergência | T15 | CA US-028 |
| RF25 → US-029 | membro elegível recebe aviso | Notificar cuidado realizado | Registro/Evento, entrega técnica | sequência disparo N03 | outbox/auditoria candidata | N03→T05/T07 | CA US-029; sem central |
| RF26 → US-030 | membro elegível recebe alerta | Alertar atraso de cuidado | Ocorrência, alerta, entrega técnica | atividade temporal/seq. N04; status candidato | ocorrência, outbox/auditoria | N04→T05/T03 | CA US-030; H+15 e sem inferência clínica |
| RF27 → US-031 | autorizado configura opcionais | Configurar preferências | Preferência de Notificação | atividade simples; sem desligar obrigatórias | preferências | T16 | CA US-031 |
| RF28 → US-032 | Principal exporta CSV | Exportar histórico CSV | Exportação, Registro, Auditoria | sequência autorização/exportação/auditoria | auditoria, dados exportados conforme política | T07/E13 | CA US-032; exclusivo Principal |
| RF29 → US-033 | Principal autorizado consulta log | Consultar auditoria | Evento de Auditoria | sequência consulta/autorização | auditoria | T17 | CA US-033 |
| RNF02 → US-034 | autorizado corrige sem apagar | Corrigir registro | Original, Correção, versão | sequência correção; ciclo de versão candidato | correções tipadas, auditoria | T06/T07/E12 | CA US-034; RN-005/RN-006 |
| RNF01 → US-035 | segurança bloqueia e registra | Bloquear acesso não autorizado | Autorização, Auditoria | sequência acesso negado/auditoria | auditoria de negação | T17/E27 | CA US-035; ator da US é formulação de requisito, não necessariamente ator externo |
| RF30 → US-036 | Pessoa Idosa consulta próprio cuidado | Consultar próprio cuidado | Pessoa Idosa, Conta, autorização | sequência login/autorização read-only; sem máquina assumida | conta, habilitação, auditoria | T01/T02/T12 + T03–T15 | CA US-036; V1 read-only |

## Leitura da cobertura

1. A coluna “caso de uso candidato” é a cobertura a transformar em diagrama de casos, podendo consolidar várias US em um objetivo compartilhado.
2. A coluna de classes enumera conceitos para análise, não garante classe final, atributo, cardinalidade ou tabela.
3. Sequências/atividades/estados são selecionados por risco de colaboração, critérios de aceite e ciclo de vida; “candidato” não significa obrigatório para cada US.
4. Dados candidatos apontam a persistência já documentada, mas o EER futuro deve conferir PK/FK/obrigatoriedade no modelo/SQL vigente.
5. Onde há regra ainda sem expressão inequívoca nas fontes canônicas, a modelagem deve marcar `migration_required`; não preencher por analogia.
