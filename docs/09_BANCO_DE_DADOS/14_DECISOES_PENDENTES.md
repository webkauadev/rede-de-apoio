# 14 — Registro de decisões de modelagem (pendências, resoluções parciais e histórico)

**Estes itens são dúvidas de projeto de dados, não reabertura automática de decisões funcionais aprovadas.** Quando a decisão alterar RN/RF/US, encaminhar revisão humana formal em fonte canônica antes de adotá-la. Toda decisão deve ter autor, data, alternativas, evidência, consequência no DDL e casos de teste.

| ADR | Pergunta/alternativas a fechar | Consequência técnica | Status |
|---|---|---|---|
| DB-001 | Uma pessoa idosa tem uma única rede de cuidado ou pode ter várias? | UNIQUE(pessoa_idosa_id) na rede vs. múltiplas redes e escolha de contexto | PENDENTE |
| DB-002 | Como se cria uma rede que exige Principal e ao menos um Profissional, se nasce vazia? Setup transacional ou estado de ativação | garantir invariantes sem bloquear bootstrap nem liberar rede incompleta | PENDENTE |
| DB-003 | Um usuário desvinculado pode reingressar na mesma rede? Novo vínculo temporal ou reativação? | UNIQUE composta, autoria e vigência | PENDENTE |
| DB-004 | Principal ativo: índice/flag derivado, travamento de rede, operação de transferência? | concorrência, histórico, inexistência de 0/2 Principais observáveis | PENDENTE |
| DB-005 | Plantões de intervalos sobrepostos são permitidos por decisão do solicitante (DEC-S01). | por rede/instante há 0..N Plantonistas Atuais; N02 permanece DB-030 | APROVADO PELO SOLICITANTE; migration_required |
| DB-006 | Troca de plantão é transferência unilateral ou permuta entre duas escalas? | solicitações, referência a plantões e transação | PENDENTE |
| DB-007 | Tarefa reabre? Pode ter múltiplos responsáveis/execuções? | 1:N responsáveis/conclusões ou 1:1, histórico | PENDENTE |
| DB-008 | Escopo de RNF02: quais tipos de registros recebem correção? Envelope comum tipado ou revisões específicas? | topologia das tabelas e FKs de revisão/anexo | PENDENTE |
| DB-009 | Uma consulta precisa nascer de compromisso? Uma recomendação pode existir sem consulta? | FK opcional vs. obrigatória, modelagem temporal | PENDENTE |
| DB-010 | Posologia: regras de recorrência, unidade/dose, PRN, mudança temporal? | tabelas de frequência, fuso, chave de execução programada | PENDENTE |
| DB-011 | Administração: registrada, omitida, adiada, parcial? Como distinguir realizada de sem registro? | domínio de estados e N04 | PENDENTE |
| DB-012 | Informação de emergência é uma ficha única atual, itens tipados, ou versões históricas? | coluna UNIQUE, revisões e política de acesso | PENDENTE |
| DB-013 | Anexos permitidos em quais tipos de registros, inclusive versões? | FK para envelope comum ou associativas com FKs íntegras | PENDENTE |
| DB-014 | Notificações: somente feedback online ou transporte assíncrono com outbox? | tabela técnica de entrega (não inbox), retenção e idempotência | PENDENTE |
| DB-015 | Hora: timezone padrão por rede/idoso, UTC, mudanças de fuso, recurrences? | DATETIME/TIMESTAMP/TIME, N02/N04, calendário | PENDENTE |
| DB-016 | Autenticação: provedor próprio ou identidade externa? | senha_hash vs. external_subject, confirmação e recuperação | PENDENTE |
| DB-017 | Convite/ativação da conta Pessoa Idosa: persistência, validade e estados T12? | habilitacao_acesso_idoso vs. estado em pessoa_idosa | PENDENTE |
| DB-018 | Prazo de retenção/desativação/anonimização do dado sensível? | restrições DELETE, backup, auditoria e direitos do titular | PENDENTE |
| DB-019 | Quem exatamente edita dados de emergência? | matriz de permissão por entidade | PENDENTE |
| DB-020 | Multiusuário simultâneo em mesma Pessoa Idosa/rede e cardinalidade de profissional | vínculos e contexto de acesso | A regra de ao menos um Profissional está CONFIRMADA; operacionalização PENDENTE |
| DB-021 | Como verificar duplicidade de administração/ação programada? | ocorrência temporal, UNIQUES e correção | PENDENTE |
| DB-022 | Eventos históricos de plantão em entidade própria ou cobertos por auditoria? | histórico operacional vs. log de segurança | PENDENTE |
| DB-023 | Tempo máximo de permanência de outbox/log e SLA de notificações | volume, TTL, auditoria e privacidade | PENDENTE |
| DB-024 | Como guardar snapshot de categoria/papel do autor em log sem duplicar dados sensíveis? | projeção histórica e minimização | PENDENTE |

## Decisões já CANÔNICAS — não rediscutir como se fossem lacunas

- RN-001: um Principal ativo, transferência atômica.
- RN-002: papéis familiares acumuláveis, união positiva com restrições.
- RN-003: Plantonista Atual é condição temporária.
- RN-004: ≥1 Profissional vinculado; categoria independente.
- RN-005/RN-006: original preservado e correção versionada.
- RN-009/RF30: Pessoa Idosa somente leitura, não familiar.
- P03: quem escreve/corrige por categoria/contexto.
- P04: feedback transitório, sem Central de Notificações.
- P05: CSV só Familiar Principal, com auditoria.
- P06: não duplicar notificações por múltiplos papéis.
- RF26: 15 minutos para ação programada sem registro; não concluir que cuidado não ocorreu.

## Registro padronizado para cada ADR futura

- ID; título; problema e origem; decisões canônicas que restringem a solução;
- alternativas A/B/C com trade-offs; decisão de arquitetura aprovada por quem/quando;
- relações, cardinalidades, nullable, chaves afetadas;
- invariantes satisfeitas e mecanismos (FK, CHECK, transação, aplicação);
- cenários de teste alterados; migração necessária; riscos e plano de reversão.

**Regra de bloqueio:** não congelar DDL de entidade cujas FKs/cardinalidades dependem de uma ADR pendente.


## ADRs adicionais abertas pela revisão aprofundada — 2026-10-09

| ADR | Pergunta/alternativas a fechar | Impacto técnico | Status |
|---|---|---|---|
| DB-025 | Uma mesma conta pode acumular a condição de Pessoa Idosa titular e vínculo familiar/profissional em outro contexto? Um titular pode vincular múltiplos perfis? | unicidade do titular, autorização contextual e prevenção de escalada | PENDENTE, requer decisão funcional |
| DB-026 | Garantia estrutural de que papéis familiares só apontam para participação Familiar: subtipo ou FK composta com categoria? Pode mudar categoria do membro? | integridade de categoria mesmo por escrita SQL direta | PENDENTE, decisão técnica sujeita à prova no MySQL |
| DB-027 | Semântica exata de vigente: revogação instantânea, início futuro, expiração e múltiplos episódios de vínculo/papel | índice de unicidade ativa, busca temporal e histórico | PENDENTE, decisão técnica/funcional |
| DB-028 | O que acontece com plantões/tarefas futuros de membro desvinculado e com desvínculo do último profissional/principal? | transações de saída e reatribuição; sem excluir histórico | PENDENTE, exige regra de comportamento |

**Consulta obrigatória:** [18_REVISAO_CRITICA_NUCLEO_IDENTIDADE.md](18_REVISAO_CRITICA_NUCLEO_IDENTIDADE.md) e [19_ALTERNATIVAS_E_TRANSACOES_NUCLEO.md](19_ALTERNATIVAS_E_TRANSACOES_NUCLEO.md). Não há ADR adotada automaticamente nesta revisão.


## ADRs temporais adicionadas na segunda revisão — 2026-10-09

| ADR | Pergunta que precisa de resposta | Efeito na modelagem | Status |
|---|---|---|---|
| DB-029 | Ocorrências programadas (tarefa/dose/outro cuidado) serão geradas sob consulta, persistidas ou híbridas? Qual sua identidade estável por data/versão? | C04, calendário, N02/N04, registro de execução e deduplicação | PENDENTE |
| DB-030 | O que fazer quando no horário de N02 não houver Plantonista Atual, ou houver mais de um? | cardinalidade, sobreposição e eventual protocolo de exceção sem criar destinatário não aprovado | PENDENTE |
| DB-031 | Como tratar igualdade em H+15, concorrência entre execução e N04, e registro posterior alegando execução anterior? | estado observado, auditabilidade, temporalidade de alertas | PENDENTE |
| DB-032 | Mesma tarefa+ciclo: apenas uma conclusão confirmada; replay do mesmo comando sem duplicação. Administração extra/reabertura ainda em discussão. | cardinalidades D09/D16, chaves de ocorrência e operação | PARCIAL: decisão DEC-S03; complementos pendentes |
| DB-033 | Em recorrência local, qual política para hora inexistente/duplicada na mudança de fuso ou DST? | geração de ocorrência, DATE/TIME/DATETIME, data histórica | PENDENTE |

Estas ADRs refinam DB-005/007/010/011/014/015/021, sem substituí-las. Não se pode escolher destinatário alternativo, impor proibição de plantão simultâneo, prescrever intervalo clínico ou reprocessar execução “omitida” sem decisão funcional documentada. **Total atual: 33 ADRs, todas pendentes.**

Documentação: [22](22_REGRAS_TEMPORAIS_E_RECURRENCIA.md), [23](23_PLANTOES_TROCAS_TAREFAS_REVIEW.md), [24](24_MEDICAMENTOS_OCORRENCIAS_VERSIONAMENTO.md), [25](25_N02_N04_EVENTOS_IDEMPOTENCIA.md) e [27](27_EVIDENCIAS_SIMULACAO_TEMPORAL.md).


## ADRs de correção e anexos adicionadas na terceira revisão — 2026-10-09

| ADR | Pergunta que precisa de resposta | Consequência | Status |
|---|---|---|---|
| DB-034 | Correções de quais tipos de cuidado usam envelope universal com subtipo versus versões separadas por domínio? | integridade de FKs, consulta de histórico e abrangência RNF02; detalha DB-008 | PENDENTE |
| DB-035 | Cada correção guarda snapshot completo tipado ou delta de alterações? Como reconstruir e validar versão atual? | tamanho, migração, controle de conflito e consulta | PENDENTE |
| DB-036 | Pode corrigir data/hora de ocorrência, justificativa, referência clínica ou somente conteúdo? Há versão revogada/retificada? | domínio de campos editáveis, histórico e regras de autorização | PENDENTE |
| DB-037 | Anexo pertence ao registro original ou versão? Quais tipos, limite, storage e reconciliação? | estrutura de FKs, vida útil e privacidade; detalha DB-013 | PENDENTE |
| DB-038 | Como persistir auditoria de acesso negado quando transação de cuidado dá rollback, e validar permissão/CSV assíncrono? | arquitetura de log, transação/outbox, falha parcial, revalidação contextual | PENDENTE |

Nenhuma opção técnica foi aprovada pela escrita destes documentos. **Inventário de 38 ADRs DB-001–DB-038 na terceira revisão; status posterior atualizado por DEC-S01–S03 abaixo.** Ler [28](28_ARQUITETURAS_CORRECAO_VERSIONADA.md), [29](29_ANEXOS_AUDITORIA_EXPORTACAO.md) e [30](30_CASOS_DE_MESA_HISTORICO_PRIVACIDADE.md).


## Registro de resolução orientada pelo solicitante — 2026-10-09 (DEC-S01–S03)

> **Esta seção modifica o status de itens acima:** os quadros anteriores representam histórico de levantamento; não interpretar a expressão "todas pendentes" como status atualizado. A decisão do solicitante é registrada nesta branch/PR e requer `migration_required` nas fontes oficiais antes de entrar em `main`. Ver [32](32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md) e [33](33_CONTRATO_CONCORRENCIA_ATOMICA.md).

| ADR | Status atualizado | Diretriz ou lacuna restante |
|---|---|---|
| DB-005 | **RESOLVIDA quanto à sobreposição; aprovado pelo solicitante** | Plantões com sobreposição são permitidos. Não bloquear dois plantões distintos com horas coincidentes. Cardinalidade dentro de *um* plantão não foi decidida. |
| DB-030 | **PENDENTE** | Multiplos Plantonistas Atuais coexistirão; RF17/US-020/N02 singular exige resolver destinatário por ação, ou aprovar regra de múltiplos, sem escolher arbitrariamente. |
| DB-007 | **PARCIAL** | A mesma tarefa, no mesmo ciclo/ocorrência, só pode ser concluída uma vez. Reabertura/ciclo novo e múltiplos responsáveis permanecem pendentes. |
| DB-032 | **PARCIALMENTE RESOLVIDA** | Reenvio do mesmo comando não duplica efeito; dois comandos distintos concorrentes para mesma tarefa/ciclo produzem um sucesso e outro conflito. Administração extra/distinta e reabertura permanecem abertos. |
| DB-006 | **PARCIAL** | Conflitos sobre o mesmo plantão+versão: no máximo um efeito válido. Troca unilateral vs permuta de dois plantões ainda pendente. |
| DB-021 | **PARCIAL** | Plano de medicação, fato de administração e alerta distintos; duplicidade de administração verdadeira continua pendente. |
| DB-029 | **PARCIAL conceitual** | Identidade da ocorrência programada distinta de execução/alerta; representação virtual/materializada/híbrida pendente. |
| DB-031 | **PENDENTE** | Alerta por ausência de registro é distinto de realização; regra de borda H+15 e corrida entre N04 e registro ainda pendentes. |

**Demais ADRs DB-001–DB-038 continuam com o status anterior.** Não se criou decisão de destinatário N02, dose extra, reabertura de tarefa, execução paralela real de MySQL ou alteração dos RF/RNF/US na `main`.


## Painel de prioridades da quinta revisão — sem criar novas ADRs

O detalhamento por entidade e a ordem recomendada constam em [39_GATES_E_PLANO_DE_PROVA_LOGICA.md](39_GATES_E_PLANO_DE_PROVA_LOGICA.md). **Decisões de maior efeito no desenho físico:** DB-001 (uma/várias redes), DB-002 (bootstrap), DB-003/027 (vigência), DB-004/026 (Principal/categoria), DB-008/034/035 (correção e envelope), e **DB-030 (destinatário N02 com plantões simultâneos)**.

**DB-005:** sobreposição entre plantões distintos PERMITIDA por decisão direta DEC-S01; essa parte não deve ser reaberta como PENDENTE por causa das tabelas históricas do início deste arquivo.

**DB-030:** permanece **PENDENTE**. [38](38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md) documenta três alternativas e 18 cenários de mesa. A alternativa A é recomendada, não homologada. Não escolher destinatário aleatório, ampliar aviso para todos ou criar fallback ao Principal sem decisão de origem RF17/US-020/N02.

**DB-032/007:** apenas uma conclusão para cada tarefa/ciclo na operação normal foi confirmada; reabertura e ciclo novo continuam questões distintas.

**Controle de escopo:** [37](37_MODELO_LOGICO_CANDIDATO_RELACIONAMENTOS.md) especifica PK/FK candidatas, não cria novas entidades obrigatórias. [40](40_DIAGRAMAS_ALTERNATIVOS_REDE.md) expõe as duas cardinalidades DB-001 sem fechá-la.
