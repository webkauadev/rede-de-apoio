# 39 — Matriz de bloqueios e plano de prova antes de desenhar SQL

**Estado:** priorização técnica, não aprovação automática das ADRs. Data: 2026-10-09. Consolidação das 38 ADRs DB-001–DB-038, dos riscos de D01–D23 e das decisões DEC-S01–DEC-S03. Diferenciar **regra aprovada pelo solicitante**, **hipótese arquitetural** e **prova futura no MySQL**.

## 1. Decisões que precisam ser resolvidas primeiro

| Prioridade | ADR | Dependência e por quê | Status atual |
|---|---|---|---|
| 1 | **DB-001** | 1:1 versus 1:N pessoa idosa/rede afeta praticamente todas as FKs, autorização e UNIQUE | PENDENTE |
| 1 | **DB-002** | inicialização de rede com exatamente 1 Principal e ≥1 Profissional; evitar rede operacional incompleta | PENDENTE |
| 1 | **DB-003/027** | episódios históricos de vínculo e vigência definem identidade da participação e acesso atual | PENDENTE |
| 1 | **DB-004/026** | Principal único sob concorrência, papéis apenas para Familiar e integridade do modelo | PENDENTE |
| 1 | **DB-008/034/035** | universo de registros imutáveis, envelope vs. domínios, forma da correção; muda D17–D19 | PENDENTE |
| 1 | **DB-030** | múltiplos plantonistas coexistem, mas N02 tem destinatário singular na regra atual; sem resposta não há desenho seguro da agenda/lembretes | PENDENTE |
| 2 | DB-006/007/032 | tipo de troca, reabertura de tarefa e ciclo; **conflito do mesmo recurso já está decidido** por DEC-S03 | PARCIAL |
| 2 | DB-010/011/015/021/029/031/033 | dose, recorrência, ocorrência, zona e atraso; DEC-S02 fechou apenas identidade de fatos distintos | PARCIAL/PENDENTE |
| 2 | DB-013/017/018/037/038 | vínculo de anexo a versão, convite de titular, retenção e auditoria de rollback | PENDENTE |
| 3 | DB-009/012/019/022/023/024/028 | conexão consulta/compromisso, emergência, histórico de escala, TTL e alterações após desvínculo | PENDENTE |
| confirmado | **DB-005** | **permitir plantões distintos sobrepostos**, sem unicidade temporal impeditiva | DEC-S01 aprovada pelo solicitante; migration_required |

### Distinguir "decisão funcional" de "proposta técnica"

- **CONFIRMADO PELO SOLICITANTE:** sobreposição; plano≠execução≠alerta; conflito por mesmo plantão/versão e mesma tarefa/ciclo.
- **APROVADO NA `main`:** RF01–RF30, RNF01–RNF03, US-001–US-036, RN-001–RN-011, N01–N04, P03/P04/P05/P06. Não alterar origem nesta PR de estudo sem revisão funcional.
- **PROPOSTA:** FK composta para rede/membro, versões otimistas, idempotency key, subtipos, envelope, outbox, timezone IANA, seleção N02 por responsável de ocorrência.
- **PENDENTE:** os itens da matriz até ratificação/decisão; evitar marcar uma ADR "fechada" só porque há um caminho técnico recomendado.

## 2. Provas de integridade previstas na fase SQL (NÃO REALIZADAS)

| Prova | Semente sintética e comando | Expectativa | Mecanismo candidato |
|---|---|---|---|
| P-S01 | inserir membro R2 em plantão R1 | rejeitar | FK composta de escopo |
| P-S02 | membro desligado de R1 tenta escrever | negar e auditar | autorização vigente transacional |
| P-S03 | conferir ausência de papéis familiares de Profissional | rejeitar concessão | subtipo/FK com categoria |
| P-S04 | criar segundo Principal em R1 | rejeitar | unicidade condicional + transação |
| P-S05 | desvincular último Profissional de rede operacional | rejeitar ou suspender conforme DB-002 homologada | lock e protocolo de estado |
| P-S06 | plantões P1 [10,12) e P2 [11,13) em R1 | ambos podem existir | ausência de exclusão temporal |
| P-S07 | duas transações alteram P1 na mesma versão | um sucesso e um conflito | versionamento + locking reads |
| P-S08 | alterar P1 e P2 independentes/sobrepostos | ambos podem confirmar | locks por recurso, sem bloquear por horário |
| P-S09 | duas transações concluem tarefa T1/ciclo1 | uma conclusão | unicidade por tarefa+ciclo + transação |
| P-S10 | replay exato de comando de conclusão | uma gravação, retorno do mesmo efeito | idempotência persistente |
| P-S11 | administração E1 apontando horário E2 | rejeitar | mesma pessoa/regime/horário por FK íntegra |
| P-S12 | registro de medicação 08:05 lançado 08:40, N04 já emitido 08:15 | preservar histórico do que era conhecido em 08:15 | modelo bitemporal/semântica de auditabilidade |
| P-S13 | outro usuário autorizado corrige registro original | nova versão, original preservado | append-only, permissão atual e lock de versão |
| P-S14 | terceiro não autorizado corrige por ID adivinhado | negar e auditar | ACL de recurso, auditoria |
| P-S15 | baixar anexo E2 usando sessão autorizada a E1 | negar, sem expor bytes | ACL herdada + armazenamento privado |
| P-S16 | Principal R1 tenta CSV de E2/R2 | negar e auditar | escopo por titular/rede |
| P-S17 | gerar N02 com dois plantonistas | resultado definido **somente após DB-030 aprovada** | regra de alocação específica |
| P-S18 | arquivo no storage gravado mas FK/metadado falha | não publicar objeto órfão | reconciliação de storage |
| P-S19 | operação de escrita aborta por falta de permissão | trilha sanitizada continua disponível | DB-038/auditoria fora da transação abortada |
| P-S20 | execução/correção conflitante gera N03 ou N01 | não emitir aviso como se houve sucesso | transação/outbox técnica condicional |

**Infra requerida nessa fase posterior:** MySQL com versão fixada, fixtures com dados inventados, duas sessões para casos concorrentes, relógio/fuso controlado, privilégio mínimo, script reproduzível e evidence logging. Este PR não cria essa infraestrutura.

## 3. O que já pode avançar sem decisões novas

1. Elaborar diagramas conceituais **alternativos**, mostrando 1:1 e 1:N na Pessoa Idosa/Rede sem fingir unicidade decidida.
2. Revisar as chaves de contexto entre `membro_rede`, plantão e tarefa; especificar as condições de FK composta com colunas NOT NULL quando aplicável.
3. Preparar critérios de aceite da transação de troca e conclusão, conforme DEC-S03, mantendo hipótese de reabertura separada.
4. Preparar o pacote de decisão DB-030 e fluxos de exceção sem criar destinatário ou tela adicional.
5. Manter rastreabilidade para RF/US e PR review. Somente após ADRs bloqueantes aprovadas produzir DDL, índices e migrations.

## 4. Trilhas e próximos portões

- **Gate G1 / Funcional:** homologar DB-001, DB-002, DB-030 e semânticas operacionais DB-007/011/028; origem em RF/US caso alterem comportamento.
- **Gate G2 / Lógico:** aprovar cardinalidades, subtipo de membro, vínculos históricos, estratégia de versões e relações de anexo; atualizar dicionário com tipos/nullable/UNIQUE candidatos sem SQL.
- **Gate G3 / Físico:** só após G1+G2, autorizar DDL em banco descartável, concorrência real, prova de FKs e de rollback e auditoria, então migrar.
- **Gate G4 / Produção:** revisão de privacidade/retenção, privilégios, backup/restauração e observabilidade, com evidência e aprovação.

## 5. Referências internas

[03_DICIONARIO_DE_DADOS.md](03_DICIONARIO_DE_DADOS.md), [14_DECISOES_PENDENTES.md](14_DECISOES_PENDENTES.md), [32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md](32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md), [36_PLANO_MIGRACAO_REQUISITOS_DECISOES.md](36_PLANO_MIGRACAO_REQUISITOS_DECISOES.md), [37_MODELO_LOGICO_CANDIDATO_RELACIONAMENTOS.md](37_MODELO_LOGICO_CANDIDATO_RELACIONAMENTOS.md), [38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md](38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md).


## Prioridade funcional G1 aprofundada — 2026-10-09

A G1 precisa de resolução explícita e rastreável sobre:
1. **DB-001:** A1 versus A2 versus B: uma rede histórica, uma operacional por vez, ou várias operacionais ([41](41_DB001_CARDINALIDADE_E_ESCOPO_REDES.md)).
2. **DB-002:** B1/B2/B3: rede em configuração, transação completa ou perfil sem rede ([42](42_DB002_CONSTITUICAO_E_ATIVACAO_REDE.md)).
3. **DB-003/004/027:** episódios e autorização atual sem perder autoria anterior, Principal único com transação ([43](43_DB003_004_EPISODIOS_PRINCIPAL_AUDITORIA.md)).
4. **DB-028:** plantões/tarefas futuros após desligamento, sem deixar autorização residual ou excluir histórico ([43](43_DB003_004_EPISODIOS_PRINCIPAL_AUDITORIA.md)).
5. **DB-030:** remetente N02 com vários Plantonistas Atuais continua em aberto ([38](38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md)).

**Provas complementares**: B-T01–B-T36 planejados em [44](44_CASOS_BOOTSTRAP_E_VINCULOS.md). Não incluí-los retroativamente no grupo P-S01–P-S20 como se tivessem sido executados. A evidência em [46](46_EVIDENCIAS_SIMULACAO_REDES_VINCULOS.md) é apenas lógica em memória.
