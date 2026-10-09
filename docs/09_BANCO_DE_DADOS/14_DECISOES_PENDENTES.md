# 14 — Registro de decisões de modelagem (ADRs pendentes)

**Estes itens são dúvidas de projeto de dados, não reabertura automática de decisões funcionais aprovadas.** Quando a decisão alterar RN/RF/US, encaminhar revisão humana formal em fonte canônica antes de adotá-la. Toda decisão deve ter autor, data, alternativas, evidência, consequência no DDL e casos de teste.

| ADR | Pergunta/alternativas a fechar | Consequência técnica | Status |
|---|---|---|---|
| DB-001 | Uma pessoa idosa tem uma única rede de cuidado ou pode ter várias? | UNIQUE(pessoa_idosa_id) na rede vs. múltiplas redes e escolha de contexto | PENDENTE |
| DB-002 | Como se cria uma rede que exige Principal e ao menos um Profissional, se nasce vazia? Setup transacional ou estado de ativação | garantir invariantes sem bloquear bootstrap nem liberar rede incompleta | PENDENTE |
| DB-003 | Um usuário desvinculado pode reingressar na mesma rede? Novo vínculo temporal ou reativação? | UNIQUE composta, autoria e vigência | PENDENTE |
| DB-004 | Principal ativo: índice/flag derivado, travamento de rede, operação de transferência? | concorrência, histórico, inexistência de 0/2 Principais observáveis | PENDENTE |
| DB-005 | Podem existir plantões sobrepostos com responsáveis distintos? | cardinalidade de Plantonista Atual, N02 e regras de escrita | PENDENTE |
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
