# Banco de Dados — Cérebro de Modelagem | Rede de Apoio

**NOVIDADE POSTERIOR ÀS 7 REVISÕES DOCUMENTAIS:** foi autorizado um protótipo SQL V0.1 separado, disponível em [`database/mysql/001_rede_de_apoio_schema.sql`](../../database/mysql/001_rede_de_apoio_schema.sql), com [guia Workbench/EER](../../database/mysql/README.md) e [hipóteses explícitas](../../database/mysql/DECISOES_E_LIMITES.md). O SQL **não foi executado**, não altera RF/US canônicos nem resolve automaticamente DB-001/002/030. As notas anteriores de “nenhum SQL criado” descrevem o estado histórico de cada revisão e não o estado atual desta branch experimental.

**Estado:** `PROPOSTA DE MODELAGEM / DOCUMENTACAO` • **Data:** 2026-10-09 • **Nenhuma tabela, migração, procedure ou banco foi criado.**

Este diretório é o contrato de análise para a futura modelagem conceitual, lógica e física MySQL da aplicação. Integra-se à fonte única operacional `webkauadev/rede-de-apoio`, mas não altera nem reinterpreta unilateralmente RF/RNF/US aprovados.

**Painel atual:** 51 arquivos de modelagem/documentação; 38 ADRs cadastradas (DB-005 já resolvida quanto à sobreposição); sem DDL ou MySQL executado. Para decisões pendentes, comece pelo [Gate G1](48_GATE_G1_DECISOES_PARA_REVISAO_HUMANA.md), conferindo primeiro a [auditoria de fontes](47_AUDITORIA_FONTES_APROVACOES.md).

## Como navegar

| Leitura | Conteúdo |
|---|---|
| [01 — Fontes e status](01_FONTES_E_ESCOPO.md) | Hierarquia de autoridade; confirmado vs. hipótese; correção de rascunhos |
| [02 — Domínio e modelo conceitual](02_MODELO_CONCEITUAL.md) | Entidades de negócio; relacionamentos e cardinalidades; decisões em aberto |
| [03 — Dicionário de dados](03_DICIONARIO_DE_DADOS.md) | Candidatas a tabelas, atributos, PK/FK, restrições e ciclo de vida |
| [04 — Regras e invariantes](04_INVARIANTES_E_INTEGRIDADE.md) | Invariantes formais, unicidade contextual, coerência referencial |
| [05 — Acesso e identidades](05_IDENTIDADE_PAPEIS_E_ACESSO.md) | Papéis acumulados, Principal único, Profissional, Pessoa Idosa |
| [06 — Planejamento temporal](06_AGENDA_PLANTOES_TAREFAS.md) | Intervalos, trocas, tarefas, calendário, atrasos |
| [07 — Medicamentos e saúde](07_MEDICAMENTOS_E_REGISTROS.md) | Posologia, administração, consultas, sintomas, histórico |
| [08 — Correções e auditoria](08_IMUTABILIDADE_ANEXOS_AUDITORIA.md) | Imutabilidade, revisões, anexos e exportação |
| [09 — Notificações](09_NOTIFICACOES.md) | N01–N04, destinatários, deduplicação, ausência de central |
| [10 — Segurança e LGPD](10_SEGURANCA_PRIVACIDADE.md) | Proteção de dados sensíveis e ameaça entre redes |
| [11 — Contrato MySQL](11_CONTRATO_TECNICO_MYSQL.md) | Tipos e mecanismos avaliados; ainda **sem** SQL de criação |
| [12 — Rastreabilidade](12_RASTREABILIDADE_REQUISITOS.md) | 36 US e RF/RNF → responsabilidades de persistência |
| [13 — Exercícios e testes](13_CENARIOS_TESTE_DE_MESA.md) | Cenários positivos/negativos, concorrência e verificações |
| [14 — ADRs/decisões pendentes](14_DECISOES_PENDENTES.md) | Alternativas, bloqueios e critérios de decisão |
| [15 — Roteiro de construção](15_ROTEIRO_DE_IMPLEMENTACAO.md) | Ordem de trabalho, gates e entregáveis futuros |
| [16 — Referências técnicas](16_REFERENCIAS_TECNICAS.md) | Fontes externas oficiais e motivo da consulta |
| [Rascunho conceitual Mermaid](DIAGRAMA_CONCEITUAL_RASCUNHO.mmd) | Grafo ilustrativo, deliberadamente não físico |

## Regras de leitura e alteração

- **CANONICO:** fatos explicitados no GitHub existente, com arquivo e RF/US quando pertinente.
- **PROPOSTA:** desenho técnico inferido para satisfazer o canônico; sujeito a revisão.
- **PENDENTE:** não inferir decisão funcional, cardinalidade, formato de dados ou permissão ausente.
- **NAO IMPLEMENTADO:** nenhuma evidência de funcionamento real em MySQL; exercícios neste pacote são testes de mesa, não execuções em banco.
- Não duplicar os requisitos aqui: links para fontes canônicas; se divergirem, prevalecem documentos/Issues aprovados.
- Não gerar migrations/DDL sem fechar decisões bloqueantes e obter revisão. Mudanças em permissões/RF/US exigem aprovação em sua origem.
- Testes incluem **resultado esperado proposto**, não alegação de execução real.
- Repositório público: nunca inserir dados reais de saúde, credenciais, tokens ou dumps pessoais.

## Artefatos anteriores

O pacote local `PLANO_MESTRE_MODELAGEM_BANCO_REDE_APOIO_v0_1.md` foi um levantamento inicial parcial; **não é fonte canônica** e não corresponde ao estado completo atual (o GitHub possui US-001–US-036). Este diretório substitui suas suposições como base de planejamento e corrige o modelo inadequado de um único campo para papéis familiares acumuláveis.

## Definition of Ready — liberar implementação apenas quando

- [ ] Dicionário e modelo conceitual revisados por integrantes da equipe;
- [ ] decisões bloqueantes de [14](14_DECISOES_PENDENTES.md) deliberadas, com origem registrada;
- [ ] invariantes e cardinalidades aprovados sem violar RN-001–RN-011;
- [ ] casos críticos de [13](13_CENARIOS_TESTE_DE_MESA.md) têm resultados esperados revisados;
- [ ] privacidade, retenção e estratégia de autorização definidas;
- [ ] plano de execução e rollback aprovado. 

## Validação documental desta proposta

Consulte [17_VALIDACAO_DOCUMENTAL.md](17_VALIDACAO_DOCUMENTAL.md) para as verificações de cobertura de RF/US, inventário, exercícios e simulações ilustrativas executadas sem banco.

## Revisão aprofundada do núcleo — 2026-10-09

| Arquivo | Finalidade |
|---|---|
| [18 — Auditoria crítica](18_REVISAO_CRITICA_NUCLEO_IDENTIDADE.md) | Achados A01–A14, fontes, entidades e cardinalidades |
| [19 — Alternativas e transações](19_ALTERNATIVAS_E_TRANSACOES_NUCLEO.md) | Duas estratégias de categoria, duas de Principal, bootstrap e OP-01–OP-06 |
| [20 — Provas conceituais](20_CENARIOS_RIGOROSOS_NUCLEO.md) | 36 casos K-T e 6 roteiros de concorrência para execução futura |
| [21 — Evidências do review](21_EVIDENCIAS_REVIEW_NUCLEO.md) | 560 asserções de modelos em memória, limites metodológicos e gates |

Foram acrescentadas as decisões DB-025–DB-028 para análise humana (total na revisão anterior: **28 ADRs abertas**, ampliadas para **33** no refinamento temporal). As simulações não são execução MySQL e as preferências técnicas não são decisões aprovadas.


## Segunda revisão — domínio temporal, 2026-10-09

| Documento | Conteúdo novo |
|---|---|
| [22 — Regras de tempo e recorrência](22_REGRAS_TEMPORAIS_E_RECURRENCIA.md) | instante vs. horário local, intervalos, ocorrências e zonas |
| [23 — Plantões/trocas/tarefas](23_PLANTOES_TROCAS_TAREFAS_REVIEW.md) | máquinas de estados, transações, escopo e conflitos |
| [24 — Medicamentos e versões](24_MEDICAMENTOS_OCORRENCIAS_VERSIONAMENTO.md) | regime, dose prevista x administração, recorrência e histórico |
| [25 — Lembretes e alertas N02/N04](25_N02_N04_EVENTOS_IDEMPOTENCIA.md) | destinatários efetivos, deduplicação, atraso e outbox |
| [26 — Testes temporais de mesa](26_TESTES_MESA_DOMINIO_TEMPORAL.md) | 42 cenários L-T, sem MySQL |
| [27 — Evidências da simulação temporal](27_EVIDENCIAS_SIMULACAO_TEMPORAL.md) | 17.774 verificações em memória, limitações expressas |

**Estado após revisão temporal (histórico):** 29 documentos no diretório; 33 ADRs DB-001–DB-033 ainda abertas; 42 cenários gerais T, 36 de identidade K-T e 42 temporais L-T, todos como planejamento sem execução de banco. Total de simulações registrado separadamente em 21 e 27, sem falsa equivalência a testes independentes de integração.


## Terceira revisão — imutabilidade, anexos, auditoria e CSV

| Arquivo | Novo aprofundamento |
|---|---|
| [28 — Correções versionadas](28_ARQUITETURAS_CORRECAO_VERSIONADA.md) | Envelope comum vs. entidades específicas; versões, transações e autorização P03 |
| [29 — Anexos, auditoria e CSV](29_ANEXOS_AUDITORIA_EXPORTACAO.md) | Associação íntegra ao recurso, uploads privados, trilhas e exportação contextual |
| [30 — Testes V-T](30_CASOS_DE_MESA_HISTORICO_PRIVACIDADE.md) | 36 cenários de versões, anexos, auditoria e CSV |
| [31 — Evidências de simulação](31_EVIDENCIAS_SIMULACAO_CORRECOES.md) | 20.300 verificações simples em memória, limites explicitados |

**Estado após três revisões:** 33 documentos no diretório; **38 ADRs abertas** (DB-001–DB-038); 42 testes gerais T, 36 de núcleo K-T, 42 temporais L-T e 36 de histórico V-T, todos ainda de mesa. Nenhum esquema SQL, migrations ou banco criados.

**Bloqueio central:** escolha de envelope universal versus entidades especializadas, política para correção e relação de anexos, e auditoria de negações após rollback. Sem essas decisões, não produzir DDL com falsas garantias de integridade.


## Evidências e migração formal após as decisões do solicitante

| Documento | Uso |
|---|---|
| [35 — Evidências da simulação de concorrência](35_EVIDENCIAS_SIMULACAO_DECISOES.md) | 6.020 asserções ilustrativas em memória; não prova concorrência real |
| [36 — Plano de migração às Issues RF/US](36_PLANO_MIGRACAO_REQUISITOS_DECISOES.md) | proposta de atualização das fontes oficiais, incluindo RF06/RF08/RF09/RF21; DB-030 aguardando decisão |

**Contagem verificada na branch após estas alterações:** **38 arquivos** no diretório (antes 33; novos 32–36). A última revisão contabiliza **188 cenários de mesa**: 42 T + 36 K-T + 42 L-T + 36 V-T + 32 C-T. **Os 6.020 predicados em memória não são testes físicos.**

**Status:** DEC-S01 e DEC-S02 foram confirmadas expressamente pelo solicitante; DEC-S03 detalha a regra de impedir duplo efeito concorrente. DB-005 foi resolvida quanto à SOBREPOSIÇÃO, DB-007/032 parcialmente; **DB-030 permanece aberta** sobre destinatário N02 com vários plantonistas. O termo "aprovado" refere-se à decisão do solicitante neste PR, não ao merge ou às Issues da `main`.


## Quinta revisão — modelo lógico candidato e decisões estruturais

| Documento | Conteúdo e situação |
|---|---|
| [37 — Relações, chaves e garantias](37_MODELO_LOGICO_CANDIDATO_RELACIONAMENTOS.md) | Cobertura D01–D23/C01–C04 com FK/UNIQUE propostos, escopo, autorização e bloqueios |
| [38 — DB-030: N02 com vários plantonistas](38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md) | Alternativas A/B/C, recomendação A apenas para avaliação, **18 cenários condicionais** e estratégia de exceção ainda não aprovada |
| [39 — Priorização e provas](39_GATES_E_PLANO_DE_PROVA_LOGICA.md) | G1/G2/G3/G4 e matriz de **20 provas SQL futuras, não executadas** |
| [40 — Diagramas alternativos](40_DIAGRAMAS_ALTERNATIVOS_REDE.md) | Variante 1 rede por idoso vs. várias redes — **DB-001 ainda em aberto**, nenhum desenho homologado |

**Estado atual da pasta:** **42 arquivos**, **38 ADRs catalogadas** (não são todas pendentes: DB-005 tem decisão do solicitante; outras estão parcialmente resolvidas), **188 cenários anteriores de mesa** e mais 18 cenários condicionais N02 para futura decisão. **Nenhuma tabela, script de criação, migration ou banco MySQL executado**.

**Não confundir:** a alternativa A do N02 (responsável explícito por ocorrência) é **minha recomendação para revisão**, e **não** foi aprovada pelo solicitante. Mantêm-se os RF/RNF/US canônicos da `main` até sua atualização formal. O modo Pessoa Idosa permanece estritamente read-only; nenhuma Central de Notificações é criada.


## Sexta revisão — decisão da rede, constituição inicial e vínculos (2026-10-09)

| Documento | Objetivo |
|---|---|
| [41 — DB-001: cardinalidade e escopo](41_DB001_CARDINALIDADE_E_ESCOPO_REDES.md) | **A1** uma rede histórica, **A2** uma rede operacional por vez com históricos, **B** várias redes simultâneas; nenhuma aprovada |
| [42 — DB-002: constituir a rede](42_DB002_CONSTITUICAO_E_ATIVACAO_REDE.md) | **B1** estado de configuração, **B2** transação completa, **B3** perfil antes da rede; conflito RN-001/RN-004 explicado |
| [43 — DB-003/004: vínculos e Principal](43_DB003_004_EPISODIOS_PRINCIPAL_AUDITORIA.md) | episódios de vínculo, histórico, transferência atômica e saída de membro sem perder autoria |
| [44 — Cenários de mesa B-T](44_CASOS_BOOTSTRAP_E_VINCULOS.md) | 36 cenários de cardinalidade, bootstrap, Principal, histórico e concorrência; alguns condicionais |
| [45 — Agenda de deliberação](45_ROTEIRO_DELIBERACAO_PRIORIDADES.md) | ordem e critérios para decidir DB-001/002/003/004/027/028/030 com a equipe |
| [46 — Evidência ilustrativa](46_EVIDENCIAS_SIMULACAO_REDES_VINCULOS.md) | 700 predicados em memória, 700 conforme referência; não são testes MySQL |

**Inventário atual:** 48 arquivos nesta pasta; 38 ADRs DB-001–DB-038 catalogadas, DB-005 confirmada pelo solicitante quanto à sobreposição, várias outras parcialmente especificadas. **224 cenários de mesa T/K-T/L-T/V-T/C-T/B-T** e 18 cenários condicionais N02, que aguardam DB-030. Nenhuma ADR adicional homologada nesta rodada. **Zero SQL, zero banco criado e nenhum merge.**


## Sétima revisão — auditoria da origem dos critérios e Gate G1

| Documento | Resultado |
|---|---|
| [47 — Auditoria de fontes aprovadas](47_AUDITORIA_FONTES_APROVACOES.md) | Verificação direta de 9 comentários canônicos de US e 7 Issues RF, P01/#73, mais fonte indexada; **corpos antigos de algumas Issues não refletem a promoção dos critérios em comentários** |
| [48 — Decisões do Gate G1](48_GATE_G1_DECISOES_PARA_REVISAO_HUMANA.md) | Roteiro objetivo de A1/A2/B, B1/B2/B3, reingresso, Principal, saída e N02; **todas essas escolhas permanecem pendentes** |
| [49 — Reconciliação e verificação](49_PLANO_REVISAO_REGISTROS_E_CI.md) | Procedimento para atualizar fontes após aprovação e conferir integridade documental, sem mexer nas Issues ou refazer P01 |

**Estado atual após publicação:** 51 arquivos de documentação/diagrama, inventário DB-001–DB-038 com status de decisão/resolução parcial, 224 cenários de mesa T/K-T/L-T/V-T/C-T/B-T mais 18 cenários condicionais N02. A análise não criou novos casos numerados nem fechou novas ADRs. **Nenhum SQL, banco, migration, alteração na `main` ou merge.**

**Regra de precedência para critérios de aceite:** `ACCEPTANCE_CRITERIA.yaml` registra a aprovação de P01/#73 e os `comment_id` por US; os textos aprovados foram promovidos como comentários nas Issues; `ACCEPTANCE_CRITERIA_DRAFT.yaml` é o snapshot histórico aprovado e contém a antiga etiqueta `pending_human_review`. Não interpretar corpo de Issue ou status legado do snapshot como ausência de aprovação.
