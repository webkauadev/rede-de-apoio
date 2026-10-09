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
