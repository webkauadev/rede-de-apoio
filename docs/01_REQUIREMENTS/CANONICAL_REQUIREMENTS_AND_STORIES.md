# Catálogo Canônico de Requisitos e User Stories

Fonte de consolidação: `GUIA_MESTRE_GITLAB_REDE_DE_APOIO.txt`, incorporado ao GitHub em 2026-09-08.

A partir desta incorporação, o GitHub é a fonte operacional canônica. O conteúdo abaixo substitui lacunas anteriormente marcadas como `migration_required` quando houver correspondência explícita.

## Regras estruturais

- RF, RNF e US são Issues.
- User Story não é Task.
- Cada US possui exatamente um requisito de origem.
- Um RF/RNF pode originar 1..N US.
- Requisitos/regras transversais podem influenciar aceite/DoD, mas não são segunda origem.
- Plantonista Atual é condição operacional temporária, não usuário, perfil ou papel.
- Profissional da Saúde é categoria independente e não acumula papel familiar.
- O projeto não possui chat.
- RF30/US-036 continuam como proposta controlada.

## RF canônicos

| ID | Título | Responsável | US de origem |
|---|---|---|---|
| RF01 | Cadastrar conta de acesso | David | US-001 |
| RF02 | Autenticar-se | David | US-002 |
| RF03 | Manter perfil da pessoa idosa | David | US-003, US-004 |
| RF04 | Vincular/desvincular membros | David | US-005, US-006 |
| RF05 | Gerenciar papéis acumuláveis e permissões | David | US-007 |
| RF06 | Gerenciar plantões | Rhuan | US-008 |
| RF07 | Consultar calendário e histórico diário | Rhuan | US-009, US-010 |
| RF08 | Atribuir plantonista | Rhuan | US-011 |
| RF09 | Solicitar/registrar troca de plantão | Rhuan | US-012, US-013 |
| RF10 | Notificar eventos de plantão | Rhuan | US-014 |
| RF11 | Registrar diário | David | US-015 |
| RF12 | Consultar histórico | David | US-016 |
| RF13 | Identificar autoria e data/hora | Henrique | transversal |
| RF14 | Cadastrar medicamentos | Henrique | US-017 |
| RF15 | Registrar posologia e horários | Henrique | US-018 |
| RF16 | Registrar administração de medicamento | Henrique | US-019 |
| RF17 | Lembrete obrigatório de cuidado programado ao plantonista | Henrique | US-020 |
| RF18 | Registrar sintomas e intercorrências | Henrique | US-021 |
| RF19 | Registrar consultas e recomendações | Rhuan | US-022 |
| RF20 | Registrar compromissos | Rhuan | US-023 |
| RF21 | Gerenciar tarefas | Rhuan | US-024, US-025 |
| RF22 | Manter contatos importantes | David | US-026 |
| RF23 | Anexar documentos e imagens | Henrique | US-027 |
| RF24 | Consultar informações de emergência | David | US-028 |
| RF25 | Notificar registros/ações realizados | Kauã | US-029 |
| RF26 | Alertar atraso após 15 minutos | Kauã | US-030 |
| RF27 | Preferências de notificações opcionais | Kauã | US-031 |
| RF28 | Exportar históricos em CSV | Kauã | US-032 |
| RF29 | Consultar log de auditoria | Kauã | US-033 |
| RF30 | Permitir acesso de consulta à Pessoa Idosa | proposta | US-036 proposta |

### Descrições

- **RF01:** Permitir o cadastro de uma conta de acesso ao sistema para usuários autorizados. A conta deve permitir autenticação posterior e não deve expor informações sensíveis.
- **RF02:** Permitir que um usuário com conta válida se autentique no aplicativo. Credenciais inválidas devem gerar feedback sem revelar dados sensíveis.
- **RF03:** Permitir cadastrar e atualizar os dados do perfil da pessoa idosa vinculada à rede de cuidado.
- **RF04:** Permitir vincular e desvincular membros da rede de cuidado sem apagar o histórico de ações já registradas.
- **RF05:** Permitir gerenciar os papéis familiares de Principal, Apoio e Emergência, respeitando a existência de exatamente um Principal ativo.
- **RF06:** Permitir criar, alterar e cancelar plantões.
- **RF07:** Permitir consultar a escala por calendário e acessar os detalhes/histórico de determinado dia.
- **RF08:** Permitir atribuir o responsável por um intervalo de plantão. Plantonista Atual é uma condição temporária, não um papel permanente.
- **RF09:** Permitir solicitar, aceitar/recusar e registrar a troca de plantões entre usuários elegíveis.
- **RF10:** Notificar usuário afetado e Familiar Principal quando houver atribuição, alteração, cancelamento ou troca de plantão.
- **RF11:** Permitir registrar ocorrências no Diário de Cuidados, com autoria, data/hora e preservação histórica.
- **RF12:** Permitir consultar o histórico de registros de cuidado.
- **RF13:** Todo registro relevante deve identificar autor e data/hora. É requisito transversal e não deve ser usado como segunda origem de uma US.
- **RF14:** Permitir cadastrar medicamentos relacionados ao cuidado.
- **RF15:** Permitir registrar posologia e horários previstos de medicamentos.
- **RF16:** Permitir registrar uma administração de medicamento, incluindo executor e horário real quando aplicável.
- **RF17:** Enviar lembrete obrigatório no horário previsto ao usuário que estiver ocupando a condição de Plantonista Atual.
- **RF18:** Permitir registrar sintomas e intercorrências espontâneas. Sintoma espontâneo não é classificado como atraso.
- **RF19:** Permitir registrar consultas realizadas e recomendações relacionadas à saúde.
- **RF20:** Permitir registrar compromissos planejados relacionados ao cuidado.
- **RF21:** Permitir criar, atribuir e concluir tarefas de cuidado.
- **RF22:** Permitir cadastrar e manter contatos importantes relacionados ao cuidado.
- **RF23:** Permitir anexar documentos/imagens de forma contextual. Não criar área principal “Documentos”.
- **RF24:** Permitir consultar rapidamente informações importantes em situação de emergência.
- **RF25:** Notificar que um cuidado/ação foi registrado. Principal obrigatório; demais elegíveis configuráveis.
- **RF26:** Alertar quando ação programada permanecer sem registro por 15 minutos. “Sem registro” não comprova que não ocorreu.
- **RF27:** Permitir configurar apenas notificações opcionais. Eventos obrigatórios não podem ser desligados.
- **RF28:** Permitir exportar históricos autorizados em CSV. A exportação é contextual, não uma área principal.
- **RF29:** Permitir consultar o log de auditoria conforme permissão, registrando usuário, categoria/papéis, pessoa idosa, data/hora, operação, recurso e resultado.

## RNF canônicos

- **RNF01 — Controle de acesso a dados pessoais e de saúde (Kauã):** Garantir que informações pessoais e de saúde sejam acessadas somente por usuários autorizados conforme categoria, vínculo, papéis e permissões. Tentativas de acesso não autorizado devem ser bloqueadas e registradas. Origem: US-035.
- **RNF02 — Imutabilidade e correção versionada (Kauã):** Registros de cuidado não devem ser sobrescritos nem apagados após criação. Uma correção deve gerar novo registro vinculado ao original, preservando autoria, data/hora e histórico. Origem: US-034.
- **RNF03 — Trilha de auditoria rastreável e preservada (Kauã):** Operações relevantes devem produzir trilha de auditoria preservada e rastreável. RNF03 influencia RF29/US-033, mas não é segunda origem de US-033.

## User Stories canônicas

| US | Título | Origem | Responsável | Tela/Ação |
|---|---|---|---|---|
| US-001 | Cadastrar conta | RF01 | David | T02 |
| US-002 | Entrar | RF02 | David | T01 |
| US-003 | Cadastrar pessoa idosa | RF03 | David | T12 |
| US-004 | Atualizar perfil | RF03 | David | T12 |
| US-005 | Vincular membro | RF04 | David | T13 |
| US-006 | Desvincular membro | RF04 | David | T13 |
| US-007 | Gerenciar papéis acumuláveis | RF05 | David | T13 |
| US-008 | Criar/alterar/cancelar plantão | RF06 | Rhuan | T04 |
| US-009 | Consultar escala calendário | RF07 | Rhuan | T04 |
| US-010 | Consultar detalhes/histórico de um dia | RF07 | Henrique | T05 |
| US-011 | Atribuir plantonista | RF08 | Rhuan | T04/E05 |
| US-012 | Solicitar troca | RF09 | Rhuan | E06 |
| US-013 | Responder troca | RF09 | Rhuan | E07 |
| US-014 | Receber avisos de mudanças no plantão | RF10 | Rhuan | N01 |
| US-015 | Registrar ocorrência no diário | RF11 | Kauã | T06 |
| US-016 | Consultar histórico | RF12 | Henrique | T07 |
| US-017 | Cadastrar medicamento | RF14 | Henrique | T08 |
| US-018 | Registrar posologia/horários | RF15 | Henrique | T08 |
| US-019 | Registrar administração de medicamento | RF16 | Henrique | T08/E16 |
| US-020 | Receber lembrete obrigatório | RF17 | Henrique | N02 |
| US-021 | Registrar sintoma/intercorrência | RF18 | Henrique | T06/T05 |
| US-022 | Registrar consulta/recomendação | RF19 | Henrique | T10 |
| US-023 | Registrar compromisso | RF20 | Rhuan | T11 |
| US-024 | Criar/atribuir tarefa | RF21 | Rhuan | T09 |
| US-025 | Concluir tarefa | RF21 | Rhuan | T09 |
| US-026 | Manter contatos importantes | RF22 | David | T14 |
| US-027 | Anexar documento/imagem | RF23 | Henrique | E10 |
| US-028 | Consultar informações de emergência | RF24 | David | T15 |
| US-029 | Receber notificação de cuidado realizado | RF25 | Kauã | N03 |
| US-030 | Receber alerta de atraso após 15 min | RF26 | Kauã | N04 |
| US-031 | Configurar notificações opcionais | RF27 | Kauã | T16 |
| US-032 | Exportar históricos CSV | RF28 | Kauã | T07/E13 |
| US-033 | Consultar log de auditoria | RF29 | Kauã | T17 |
| US-034 | Corrigir registro sem apagar original | RNF02 | Kauã | E12 |
| US-035 | Bloquear e registrar acesso não autorizado | RNF01 | Kauã | E27/T17 |

### Enunciados

- **US-001:** Como usuário autorizado, quero cadastrar uma conta de acesso para utilizar o aplicativo conforme minhas permissões.
- **US-002:** Como usuário cadastrado, quero entrar no aplicativo para acessar os recursos permitidos da rede de cuidado.
- **US-003:** Como Familiar Principal, quero cadastrar a pessoa idosa para criar o contexto de cuidado da rede.
- **US-004:** Como Familiar Principal, quero atualizar o perfil da pessoa idosa para manter seus dados atuais.
- **US-005:** Como Familiar Principal, quero vincular um membro à rede para que ele participe do cuidado conforme suas permissões.
- **US-006:** Como Familiar Principal, quero desvincular um membro para retirar seu acesso futuro sem apagar seu histórico anterior.
- **US-007:** Como Familiar Principal, quero gerenciar os papéis familiares para controlar responsabilidades e permissões.
- **US-008:** Como usuário autorizado, quero criar, alterar ou cancelar um plantão para manter a escala atualizada.
- **US-009:** Como usuário autorizado, quero consultar a escala por calendário para visualizar os responsáveis por período.
- **US-010:** Como usuário autorizado, quero consultar os detalhes de um dia para verificar plantões, cuidados planejados e execuções.
- **US-011:** Como usuário autorizado, quero atribuir um responsável a um plantão para definir quem ficará responsável naquele intervalo.
- **US-012:** Como usuário vinculado, quero solicitar uma troca de plantão para reorganizar uma responsabilidade atribuída.
- **US-013:** Como usuário envolvido, quero aceitar ou recusar uma troca para confirmar a nova organização do plantão.
- **US-014:** Como usuário afetado, quero ser avisado de mudanças no plantão para saber que minha escala foi alterada.
- **US-015:** Como usuário autorizado, quero registrar uma ocorrência no Diário de Cuidados para compartilhar informação relevante com a rede.
- **US-016:** Como usuário autorizado, quero consultar o histórico de cuidados para acompanhar os registros ao longo do tempo.
- **US-017:** Como usuário autorizado, quero cadastrar um medicamento para incluí-lo na rotina de cuidado.
- **US-018:** Como usuário autorizado, quero registrar posologia e horários para planejar corretamente a administração do medicamento.
- **US-019:** Como usuário autorizado, quero registrar uma administração de medicamento para manter o histórico real do cuidado.
- **US-020:** Como usuário que ocupa a condição de Plantonista Atual, quero receber lembrete de cuidado programado para realizá-lo no horário previsto.
- **US-021:** Como usuário autorizado, quero registrar sintoma/intercorrência para manter a rede informada.
- **US-022:** Como usuário autorizado, quero registrar consultas e recomendações para preservar orientações relevantes.
- **US-023:** Como usuário autorizado, quero registrar um compromisso para mantê-lo visível na rotina.
- **US-024:** Como usuário autorizado, quero criar e atribuir uma tarefa para organizar ações de cuidado.
- **US-025:** Como usuário responsável, quero registrar uma tarefa como concluída para atualizar o histórico.
- **US-026:** Como usuário autorizado, quero consultar e manter contatos importantes para encontrá-los rapidamente.
- **US-027:** Como usuário autorizado, quero anexar documento/imagem a um registro compatível para preservar informação contextual.
- **US-028:** Como usuário autorizado, quero consultar informações de emergência para agir rapidamente quando necessário.
- **US-029:** Como membro elegível, quero ser avisado quando um cuidado for registrado para acompanhar a execução da rotina.
- **US-030:** Como membro elegível, quero receber alerta quando um cuidado programado permanecer sem registro após 15 minutos para verificar a situação.
- **US-031:** Como usuário autorizado, quero configurar notificações opcionais para controlar alertas não obrigatórios.
- **US-032:** Como usuário autorizado, quero exportar um histórico em CSV para utilizar dados permitidos fora do aplicativo.
- **US-033:** Como Familiar Principal autorizado, quero consultar o log de auditoria para verificar operações realizadas na rede.
- **US-034:** Como usuário com permissão para correção, quero registrar uma correção vinculada para corrigir informação sem apagar o original.
- **US-035:** Como responsável pela segurança da rede, quero que acessos não autorizados sejam bloqueados e registrados para proteger os dados.

## Proposta RF30 / US-036

RF30 e US-036 permanecem `proposal` até formalização. US-036: Como Pessoa Idosa, quero acessar as informações relacionadas ao meu cuidado para acompanhar minha rotina e a rede responsável por mim sem alterar os registros existentes.
