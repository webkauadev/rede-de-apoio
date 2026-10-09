# 32 — Registro explícito das decisões do solicitante: plantões e concorrência

**Data da decisão:** 2026-10-09. **Origem:** orientação direta do solicitante nesta conversa de desenvolvimento, após leitura do resultado da revisão da modelagem. **Status:** APROVADO PELO SOLICITANTE para aprofundamento da modelagem; **migration_required** para incorporação formal às Issues/RF/US e à documentação canônica da `main`. Esta nota **não altera sozinha** os textos funcionais aprovados na `main`, conforme AGENTS.md, nem libera SQL/merge.

## DEC-S01 — Plantões simultâneos permitidos (DB-005 resolvida quanto à sobreposição)

**Decisão explícita:** "vai ter plantão simultâneo sim, tá? Pode ter plantão simultâneo".

**Regra comportamental aprovada pelo solicitante:** plantões cujos períodos se cruzam são válidos e não devem ser rejeitados somente porque ocorrem no mesmo intervalo. Há possibilidade de **mais de um Plantonista Atual por rede em um instante**. Isso respeita RN-003, pois a condição continua derivada do tempo e vínculo, e não vira papel permanente.

**Limites desta aprovação:**
- Fica aprovado o **cruzamento entre plantões** e a coexistência de plantonistas em horários coincidentes.
- Não foi explicitamente decidido se **um mesmo plantão** pode possuir múltiplos responsáveis. Modelagem atual D06 sugere um responsável por registro de plantão; não expandir automaticamente a cardinalidade interna.
- Não implica que cada plantonista atual possa alterar/concluir qualquer tarefa: permissões RN-010, responsabilidade explícita e escopo continuam valendo.
- Não define por si só **qual** dos vários plantonistas recebe N02 para uma ação programada. DB-030 permanece pendente, pois RF17/US-020 e NOTIFICATIONS_RULES.md dizem "somente o usuário que estiver ocupando a condição de Plantonista Atual naquele momento". É necessário preservar esta regra e decidir atribuição inequívoca por ação/ocorrência ou política de múltiplos destinatários formalmente aprovada. Não inventar fallback ao Principal e não escolher o primeiro resultado SQL.

**Implica para o modelo lógico:** não criar UNIQUE ou validação que proíba a sobreposição temporal de plantões na mesma rede. Cada plantão conserva sua identidade/versão, membro responsável e histórico. A detecção de sobreposição pode ser útil para visualização/atribuição N02, mas não é critério de invalidação.

## DEC-S02 — Plano, execução real e alerta são fatos diferentes

**Decisão explícita:** confirmou que "uma medicação programada, ... [uma execução registrada], um aviso de atraso são fatos diferentes" e autorizou seguir a distinção já documentada nos capítulos 22, 24 e 25.

**Consequências para a modelagem:**
1. **Plano/ocorrência programada:** intenção de cuidado em data/hora e versão de regime/tarefa.
2. **Registro de execução/administração:** fato declarado de realização, com autor, instante real quando aplicável e instante de persistência.
3. **Alerta N04 por ausência de registro no instante de verificação:** evento informacional derivado do estado conhecido naquele instante, NÃO evidência de omissão clínica.
4. **Alteração/correção de execução:** nova versão histórica preserva o original conforme RNF02.

**Cuidado de escopo:** a conversa **não aprovou** múltiplas administrações da mesma dose por pessoas diferentes. Administração adicional legitimamente distinta precisa identificação e regra própria (DB-011/021), sem converter repetição de comando em um novo cuidado. Recorrência, dose e horário ainda dependem DB-010/015/029/033. A decisão fecha a distinção conceitual, não todos os detalhes físicos.

## DEC-S03 — Proibir duplo efeito de operações concorrentes

**Decisão explícita:** quando duas pessoas tentam trocar o **mesmo plantão** ou concluir a **mesma tarefa** simultaneamente, "não, não pode ... Tem que ter uma regra muito clara ... pode elaborar essa regra".

**Regra operativa proposta pelo arquiteto e autorizada pela instrução de elaborar o mecanismo:**
- Para **um mesmo plantão + versão**, somente uma alteração conflitante (aceite de troca, cancelamento, mudança de responsável/horário) pode confirmar. A segunda solicitação fundada na versão obsoleta **não grava** e retorna conflito; nenhuma alteração parcial.
- Para **a mesma tarefa + mesmo ciclo/ocorrência de conclusão**, somente um fato de conclusão pode confirmar no fluxo comum. Uma tentativa distinta subsequente recebe estado "já concluída"/conflito, não produz segunda conclusão nem dispara novo N03. Reabertura para novo ciclo continua DB-007: se aprovada no futuro, terá identidade de ciclo distinta.
- **Mesmo pedido reenviado** com chave de idempotência idêntica e payload compatível devolve o resultado já confirmado, sem novo efeito, evento N01/N03 ou alteração de versão.
- Conflitos não atingem recursos independentes: dois plantões P1/P2, mesmo com horários sobrepostos, e duas tarefas T1/T2 podem avançar em paralelo.
- O comportamento determina **unicidade de efeito**, não impossibilidade física de dois aparelhos pressionarem um botão; o backend decide na transação e a UI mostra conflito amigável.

**Detalhes técnicos para futura implementação:** [33_CONTRATO_CONCORRENCIA_ATOMICA.md](33_CONTRATO_CONCORRENCIA_ATOMICA.md). Casos de mesa: [34_CASOS_PLANTOES_SIMULTANEOS_CONFLITOS.md](34_CASOS_PLANTOES_SIMULTANEOS_CONFLITOS.md).

## Impacto das decisões existentes

| ADR | O que mudou | O que continua pendente |
|---|---|---|
| DB-005 | **RESOLVIDA por decisão direta**: permitir sobreposição de plantões | cardinalidade de vários responsáveis dentro do mesmo plantão e detalhes de visualização |
| DB-030 | **Continua aberta** com múltiplos plantonistas legitimamente ativos | escolha do N02 por ação quando >1, caso nenhum plantonista |
| DB-006 | Concorrência do mesmo plantão deve ser serializada | troca unilateral vs. permuta em 2 plantões |
| DB-007 | Uma conclusão por tarefa/ciclo no fluxo comum | reabertura e eventual novo ciclo, múltiplos responsáveis |
| DB-032 | **Parcialmente resolvida**: repetição não pode criar segunda conclusão para o mesmo ciclo | aplicação detalhada a administrações distintas e reabertura |
| DB-021 | Distinção entre dose prevista e execução confirmada reconhecida | deduplicação/legitimidade de múltiplas administrações |
| DB-029 | Identidade de ocorrência separada do fato executado | gerar ocorrência virtual/persistida/híbrida |
| DB-031 | Alerta N04 separado da execução é confirmado | fronteira H+15, disputa com registro e registro retroativo |

## Migração necessária ao registro canônico

**migration_required** — antes de considerar estas decisões exigíveis por todas as equipes:
1. Documentar aceitação de plantões simultâneos na origem RF06/RF08 e critérios de US-008/US-011, ou regra de negócio correlata;
2. Registrar proteção contra operações conflitantes na origem RF09/US-013 e RF21/US-025; não criar nova US/RF sem decisão humana;
3. Reconciliar RF17/N02/US-020 com a possibilidade de múltiplos plantonistas e aprovar política de destinatário;
4. Rastrear a distinção plano/execução/alerta em RF15/16/17/26 e respectivos critérios sem alterar semântica clínica.
5. Fazer review do PR, executar validadores obrigatórios quando disponíveis e efetuar merge somente após aprovação humana.

**Fontes de referência na `main`**: docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml, docs/02_BUSINESS_RULES/BUSINESS_RULES.md, docs/02_BUSINESS_RULES/NOTIFICATIONS_RULES.md e docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml.
