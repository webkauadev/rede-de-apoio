# 38 — Pacote de decisão DB-030: N02 com plantões simultâneos

**Status:** proposta de análise para deliberação; **DB-030 NÃO está decidida**. Não alterar RF17/US-020/N02 sem aprovação explícita de mudança de comportamento. Fonte funcional: `docs/02_BUSINESS_RULES/NOTIFICATIONS_RULES.md`, RF17, US-020, critérios aprovados em `ACCEPTANCE_CRITERIA.yaml` (snapshot histórico aprovado). Fonte de sobreposição: **DEC-S01**, aprovada pelo solicitante e em migração formal.

## 1. Fatos conhecidos

- A mesma rede pode ter P1 e P2 ativos com intervalos sobrepostos; seus responsáveis podem ocupar simultaneamente condição de Plantonista Atual. DEC-S01.
- N02 é lembrete **obrigatório** para cuidado programado no horário previsto e a regra canônica atual diz que recebe **somente o usuário que estiver ocupando a condição de Plantonista Atual naquele momento**.
- A redação anterior considerava destinatário singular e não esclarece o caso de vários plantonistas simultâneos.
- Não há Central de Notificações; N02 é feedback transitório global com destino contextual T05.
- Estar de plantão não confere permissão geral para concluir toda tarefa atribuída a outro membro (US-025/RN-010).

## 2. Problema verificável

Às 11h, P1 de Ana (10–12) e P2 de Bruno (11–13) estão ativos para a Pessoa Idosa E1. Um medicamento tem lembrete 11h (N02), mas não existe responsável individual especificado para essa ocorrência. Uma consulta que escolhe `LIMIT 1` retorna alguém arbitrário; enviar a ambos altera o conjunto de destinatários. **Qual é a regra de negócio pretendida?** Ainda não foi respondida pelo solicitante.

## 3. Alternativas compatíveis com o contexto

| Alternativa | Resolução de N02 | Vantagem | Custo/risco |
|---|---|---|---|
| **A (recomendada para avaliar): responsável da ocorrência** | O cuidado programado aponta a um membro específico; quando chegar a hora, o destinatário é **somente essa pessoa**, após confirmar que é Plantonista Atual e tem vínculo/permissão de leitura no contexto | mantém destinatário singular e respeita responsabilidade específica, evita avisar cuidador errado | exige associar explicitamente ação→responsável no planejamento e definir o que fazer se esse membro perder plantão/vínculo |
| **B: todos os plantonistas atuais** | conjunto de usuários únicos em plantões simultâneos da rede, com mínimo de autorização | evita escolha arbitrária e permite colaboração | **altera o N02 singular atual**; múltiplos alertas e possíveis conflitos de responsabilidade; exige revisão formal RF17/US-020 |
| **C: designação determinística por regra de alocação** | seleciona um plantonista do conjunto por prioridade/rodízio/política | remove cadastro manual em muitos casos | cria regra nova não prevista e pode não corresponder a quem de fato executará cuidado; necessita gestão de política, auditoria e nova aprovação |

**A é apenas recomendação técnica de compatibilidade; não configura decisão funcional do solicitante.** Não confundir “pessoa responsável da ocorrência” com Familiar Principal. Principal só recebe N02 se ele próprio for o responsável e estiver Plantonista Atual, pela alternativa A.

## 4. Fluxo de validação da alternativa A (PROPOSTA)

1. No ato de programar um cuidado com N02, referenciar a **ocorrência programada específica** e membro da **mesma rede** designado para aquela ação; esta associação pode ser campo ou relação, ainda não há aprovação física de entidade C04.
2. Antes de afirmar entrega, verificar no instante de disparo se membro designado mantém vínculo, se ocupa Plantonista Atual em pelo menos um dos plantões ativos e se possui acesso ao recurso.
3. Havendo exatamente um membro designado e elegível, N02 apenas para o respectivo `usuario_id`, mesmo se o usuário tiver dois plantões ou vários papéis familiares.
4. Se o membro designado perdeu vínculo ou não está mais em plantão: não escolher outro automaticamente; registrar erro operacional/situação de atribuição inválida e encaminhar a uma estratégia de resolução humana **a ser homologada**. Sem essa estratégia, a obrigatoriedade de N02 ainda não está atendida.
5. Se duas solicitações tentarem alterar responsável da mesma ocorrência/versão: aplicar DEC-S03 por analogia **como proposta técnica**, nunca sobrescrever silenciosamente; exige validação de escopo temporal por serviço.
6. Notificações repetidas ao mesmo destinatário por retry e mesmo evento devem ser deduplicadas; uma dose diária nova mantém identidade distinta da de ontem.
7. Uma troca de plantão confirmada antes do disparo demanda revalidar a elegibilidade do responsável do cuidado; não inferir que troca de plantão transfere automaticamente responsabilidade de tarefa/medicação sem política própria.

**Atenção de UX:** T04/T05 podem mostrar vários cuidadores sem alterar a arquitetura visual; o modo Pessoa Idosa permanece somente leitura. Não criar novas telas, inbox nem controles sem mapeamento de requisito.

## 5. Cenários DB30 de aceite futuro (todos como roteiro de mesa)

| Caso | Plantões no instante t | Designação da ocorrência | Esperado segundo alternativa A |
|---|---|---|---|
| N2-01 | P1 Ana | Ana | N02 só Ana se autorizada |
| N2-02 | P1 Ana + P2 Bruno | Ana | N02 só Ana |
| N2-03 | P1 Ana + P2 Bruno | Bruno | N02 só Bruno |
| N2-04 | P1 Ana + P2 Bruno | Sem designação | **PENDENTE**, não escolher aleatoriamente |
| N2-05 | P1 Ana + P2 Bruno | Carla não plantonista | Sem entrega inventada; exigir resolução |
| N2-06 | P1 Ana encerrado, P2 Bruno ativo | Ana | Sem entrega inventada; reatribuição não é automática |
| N2-07 | P1 Ana + P2 Bruno | Bruno possui dois papéis | N02 **uma vez** para usuário Bruno |
| N2-08 | P1 Ana + P2 Bruno | mesmo usuário responsável pelos dois | N02 **uma vez** para o usuário, não por plantão |
| N2-09 | P1 Ana + P2 Bruno | titular idoso | **Inválido:** Pessoa Idosa não é Plantonista Atual |
| N2-10 | P1 Ana + P2 Bruno | membro da rede E2 | **Inválido:** escopo de rede |
| N2-11 | nenhum plantão | Ana | **PENDENTE**: falta destinatário válido, definir contingência |
| N2-12 | P1 Ana + P2 Bruno | Ana, mas foi desvinculada | Sem entrega a Ana; requer resolução sem vazamento |
| N2-13 | P1 Ana + P2 Bruno | Ana, confirmação de alteração para Bruno antes do horário | Destinatário segundo estado confirmado que for homologado; não usar cache antigo |
| N2-14 | P1 Ana + P2 Bruno | Bruno designado, reenvio do mesmo evento | Apenas um evento lógico por ocorrência/usuário |
| N2-15 | P1 Ana + P2 Bruno | Bruno para dose de hoje e amanhã | N02 separado por ocorrência datada |
| N2-16 | P1 Ana + P2 Bruno | Bruno, mas operação de cuidado fora do domínio autorizado | Rever permissão de ação; notificação não concede escrita |
| N2-17 | P1 Ana + P2 Bruno | Ana, N04 depois de 15min sem execução | N04 vai a Principal + opcionais pela regra própria, **não** herda destinatário N02 |
| N2-18 | P1 Ana + P2 Bruno | Bruno, horário não definido (PRN) | Não gerar horário/aviso fictício; DB-010 |

**Não tratar os resultados da coluna alternativa A como critérios canônicos aprovados.** Testar B/C apenas após mudança explícita de RF17/US-020.

## 6. Gate funcional exato para fechar DB-030

A equipe precisa aprovar, **antes da implementação de N02**:
- se destinatário é o responsável designado pelo cuidado/ocorrência (A), todos os plantonistas (B) ou outra política específica;
- como o responsável é atribuído sem bloquear indevidamente o cadastro da pessoa idosa ou agenda;
- como proceder quando não existe plantonista, o responsável não está mais escalado ou há substituição de última hora;
- se ações de medicação e tarefas seguem a mesma política ou tratamentos específicos, e quais mudanças de UI/RF/US seriam exigidas.

**Fonte oficial prevalecente:** RF17/US-020/N02 no GitHub. **DEC-S01** não foi autorização para expandir automaticamente N02 para todos os plantonistas.
