# 15 — Plano de execução futuro, sem executar

## Estado atual: ESTUDO + DOCUMENTAÇÃO

**Não há implementação de banco neste PR.** Não criar serviço de produção, instância, usuário real, script de criação ou migração até revisão.

### Fase A — Leitura e consolidação (esta entrega)
- [x] Localizar repositório operacional canônico e priorizar seus requisitos.
- [x] Levantar RN-001–RN-011, N01–N04, RF01–RF30, RNF01–RNF03 e US-001–US-036.
- [x] Produzir modelo conceitual e dicionário preliminar com proveniência.
- [x] Documentar decisões não resolvidas sem inventar novas regras.
- [x] Produzir cenários positivos, negativos e de concorrência para revisão.
- [x] Consultar referências externas de MySQL, OWASP e ANPD.
- [ ] Revisar em PR com a equipe; resolver inconsistências do levantamento.

### Fase B — Fechar modelo conceitual (DEPOIS)
1. Resolver DB-001–DB-024 conforme impacto; registrar ADRs revisadas, com veto às que conflitam com regras canônicas.
2. Homologar entidades, atributos, relacionamentos com 0/1/N e participação obrigatória/opcional.
3. Homologar ciclos de vida de vínculo, papel, plantão, troca, tarefa, medicina e correção.
4. Homologar diagramas conceituais e narrativas de integridade.
5. Revisar cenários T01–T42: cada um precisa do invariante protetor.

### Fase C — Modelo lógico (DEPOIS)
1. Relacionamentos N:M viram tabelas associativas sem perda de histórico.
2. Chaves alternativas, PKs e FKs reais (incluindo as compostas de escopo).
3. Tipos lógicos, nulidade, domínios de status, estados e versões.
4. Normalização 1FN/2FN/3FN; revisão de redundância nas views.
5. Testes de consistência de dependências, conflitos de exclusividade/temporalidade e modelo de permissão.

### Fase D — Script físico MySQL (DEPOIS, somente após aprovação)
1. Fixar MySQL patch, charset, collation e UTC/timezone.
2. Escrever DDL com InnoDB, PKs, FKs, UNIQUE, CHECK e índices justificados.
3. Especificar transações críticas (transferência Principal, troca, correção, auditoria) e mecanismo de autorização.
4. Criar migrations versionadas, seeds **sintéticos** e rollback explícito.
5. Diferenciar testes automatizados de unitário, integração MySQL, segurança, concorrência e regressão.

### Fase E — Execução, diagramas e evidências (DEPOIS)
1. Provisionar instância descartável de teste, nunca conectada a dados reais.
2. Executar migrations e seeds; verificar SHOW CREATE TABLE e INFORMATION_SCHEMA.
3. Rodar testes T01–T42 adaptados para SQL/serviço e validar duas transações concorrentes de verdade.
4. Validar recorrências com relógio/fuso explícitos, notificações N01–N04 e CSV restrito.
5. Usar MySQL Workbench para engenharia reversa; comparar DER físico com modelo conceitual, descrever diferenças.
6. Executar EXPLAIN, backup/restore, privacidade e desempenho em dados sintéticos.
7. Registrar evidências de versão, comandos, saídas, status e PR de homologação.

## Critérios de aceitação do pacote de conhecimento (não do produto)

- Cada uma das 36 US aparece no mapa de rastreabilidade.
- Invariantes de Principal, Profissional, categorias, permissão temporal e correção possuem cenário contrário.
- Cada entidade candidata possui justificativa e PK/FKs candidatas ou dúvida formal.
- O diagrama não introduz tabela para tela T03/T04/T05/T07.
- Nenhuma regra oficial é substituída por hipótese silenciosa.
- Documento de segurança não contém dados reais de saúde.
- Não afirmar “passou no MySQL” antes de testes executados.
- Alterações são revisadas por PR; merge requer aprovação humana segundo AGENTS.md.

## Ordem de review sugerida

**Primeiro:** modelo de identidade/rede/papéis/Principal/profissional. **Segundo:** plantões e autorização temporal. **Terceiro:** definição do envelope de registros imutáveis. **Quarto:** medicamentos/recorrência/atraso. **Quinto:** anexos/auditoria/CSV/notificações. **Por fim:** fixação de chaves/tipos e DDL.

Essa ordem reduz o retrabalho porque outras relações dependem de identidades, contexto e restrições temporais.


## Gate adicional aberto pela revisão temporal (2026-10-09)

Antes do modelo lógico/DDL, resolver em conjunto com identidade DB-001–DB-004 as dependências temporais **DB-005/007/010/011/014/015/021/029/030/031/032/033**, sem contrariar RF17/26. Exigir plano de idempotência, identidade de ocorrência, autorização por vínculo vigente e formato de timezone.

Casos L-T01–L-T42 (documento 26) precisam de execução física posteriormente. Casos de borda de DST exigem dados de zona nomeada; trocas/conclusões concorrentes e o worker de alerta exigem pelo menos duas conexões SQL reais. Nenhum destes testes foi executado no banco nesta fase.


## Gate de modelagem imutável e armazenamento (2026-10-09)

Antes de desenhar DDL de D17/D18/D19/D23, resolver DB-008/013/018 e DB-034–038; homologar tipo de correção, vínculo de anexo ao original/versão e arquitetura de trilha negada após rollback. Revisar os 36 casos V-T01–V-T36, incluindo falhas entre armazenamento de objetos e banco. A etapa futura deve demonstrar bloqueio de UPDATE/DELETE destrutivos com privilégio real, JOINs com FK, duas conexões concorrentes, auditoria e CSV contextual.


## Desbloqueio de regras e gate atualizado em 2026-10-09

- **DB-005 resolvida parcialmente pelo solicitante:** sobreposição de plantões distintos é permitida, sem UNIQUE de período ou rejeição por interseção; registrar `migration_required` nos RF06/RF08 e US correspondentes.
- **Concorrência elaborada e acordada no escopo pedido:** troca/alteração de **mesmo** plantão+versão e conclusão de **mesma** tarefa+ciclo são operações de efeito único; mecanismos [33](33_CONTRATO_CONCORRENCIA_ATOMICA.md) e teste físico [34](34_CASOS_PLANTOES_SIMULTANEOS_CONFLITOS.md). Não simular garantia com botão desabilitado.
- **DB-030 bloqueio remanescente importante:** N02 em plantões simultâneos. Necessita decisão de destinatário e alteração canônica RF17/US-020/NOTIFICATIONS_RULES.md antes do SQL/alertas; proposta de destinatário por ação em documento 25.
- Reabertura da tarefa, troca envolvendo dois plantões, administração adicional, recorrência, estado de rede e outras ADRs continuam com seus bloqueios.
- Não produzir DDL até resolver as dependências de cardinalidade/permite acesso e revisão humana do PR.


## Gate priorizado após revisão lógica — sem antecipar SQL

**G1 Funcional:** DB-001/002/030 e tratamentos de desvinculação, tarefa reaberta e dose programada. Consolidar migração `migration_required` nas Issues quando aprovada. **G2 Lógico:** revisar [37](37_MODELO_LOGICO_CANDIDATO_RELACIONAMENTOS.md) e escolher entre os diagramas de [40](40_DIAGRAMAS_ALTERNATIVOS_REDE.md), FKs reais, vínculos históricos e versão de registro. **G3 Físico (somente após autorização):** executar as 20 provas planejadas em [39](39_GATES_E_PLANO_DE_PROVA_LOGICA.md), incluindo 2 conexões concorrentes, isolamentos, locks, FKs compostas e auditoria. **G4:** segurança/privacidade, política de retenção, backup e operação.

**Ponto impeditivo explícito:** o N02 é obrigatório; não implementar "primeiro plantonista encontrado" como solução técnica. Ver [38](38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md). A migração formal das decisões DEC-S01–S03 tem plano em [36](36_PLANO_MIGRACAO_REQUISITOS_DECISOES.md), não executada.


## Roteiro de revisão humana da constituição e participação (2026-10-09)

**Antes de congelar D01–D05/D06–D09:** rever [41](41_DB001_CARDINALIDADE_E_ESCOPO_REDES.md) e escolher A1/A2/B (DB-001); revisar [42](42_DB002_CONSTITUICAO_E_ATIVACAO_REDE.md) e escolher B1/B2/B3 ou solução expressa (DB-002); validar se reingresso é admitido e escolher E1/E2 (DB-003/027); selecionar a fonte única de verdade do Principal e integridade Familiar (DB-004/026); decidir tarefas/plantões futuros após desvinculação (DB-028).

**Evidências para futura fase autorizada:** executar [44](44_CASOS_BOOTSTRAP_E_VINCULOS.md) em banco MySQL descartável com dados fictícios, inclusive duas sessões para ativação/Principal/desvínculo, logs e rollback. A revisão em memória [46](46_EVIDENCIAS_SIMULACAO_REDES_VINCULOS.md) **não** cumpre esse gate. A agenda de revisão [45](45_ROTEIRO_DELIBERACAO_PRIORIDADES.md) delimita quais escolhas exigem migração de texto funcional às Issues.

**Controle de escopo:** PR #115 permanece documentação, sem SQL/migrations/merge.


## Checklist adicional de aceitação documental (2026-10-09)

A revisão [47](47_AUDITORIA_FONTES_APROVACOES.md) encontrou comentário de critério aprovado em 9 US conferidas e reforçou a precedência P01/#73. Antes de alterar qualquer regra, consultar **comentário de aceitação e snapshot aprovado**, não apenas texto do corpo antigo. Debater [48](48_GATE_G1_DECISOES_PARA_REVISAO_HUMANA.md), documentar escolha funcional e seguir [49](49_PLANO_REVISAO_REGISTROS_E_CI.md).

**Nenhum novo bloqueio técnico foi artificialmente resolvido por esta auditoria**; gates de autorização de SQL e de merge permanecem intactos. Validadores CI/agent context ainda precisam execução no ambiente completo após as decisões.
