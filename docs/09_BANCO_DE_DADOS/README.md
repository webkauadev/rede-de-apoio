# Banco de Dados — Cérebro de Modelagem | Rede de Apoio

**Estado:** `PROPOSTA DE MODELAGEM / DOCUMENTACAO` • **Data:** 2026-10-09 • **Nenhuma tabela, migração, procedure ou banco foi criado.**

Este diretório é o contrato de análise para a futura modelagem conceitual, lógica e física MySQL da aplicação. Integra-se à fonte única operacional `webkauadev/rede-de-apoio`, mas não altera nem reinterpreta unilateralmente RF/RNF/US aprovados.

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
