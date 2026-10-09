# 16 — Fontes técnicas e distinção de autoridade

Pesquisadas para orientar as **decisões técnicas**, não para inventar RF/US nem sobrepor o GitHub canônico. Links consultados em 2026-10-09.

## MySQL (fonte primária técnica)

- [InnoDB — boas práticas, PK, FK e JOIN](https://dev.mysql.com/doc/refman/8.4/en/innodb-best-practices.html): chave para cada tabela, integridade e alinhamento de tipos.
- [CHECK constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html): validações de linha permitidas, limites de expressões, ausência de subqueries em CHECK. NÃO resolve invariantes entre várias linhas/tabelas.
- [FOREIGN KEY constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html): coerência referencial, índices, ações ON DELETE/UPDATE e mecanismos de verificação.
- [Compatibilidade e semântica de FKs](https://dev.mysql.com/doc/refman/8.4/en/constraint-foreign-key.html): NO ACTION se comporta como RESTRICT no InnoDB; não tratar FKs como adiáveis.
- [Locking reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html): SELECT ... FOR UPDATE em transações, necessário para avaliar concorrência da transferência de Principal/troca/versões.
- [Minimizar deadlocks](https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html): ordem fixa de locks, transações curtas, índices e retry de erros concorrentes.
- [Date/time types](https://dev.mysql.com/doc/refman/8.4/en/date-and-time-type-syntax.html): DATETIME/TIMESTAMP/TIME com semânticas distintas; avaliar limites e UTC.
- [Metadados e UNIQUE NULL](https://dev.mysql.com/doc/refman/8.4/en/information-schema-columns-table.html): UNIQUE permite múltiplos NULL e exige atenção às unicidades ativas.

## OWASP (fonte de segurança)

- [Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html): negar por padrão e validar permissão a cada requisição/recurso.
- [Password Storage Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html): algoritmos lentos apropriados, nunca senha em claro.
- [Logging Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html): não copiar credenciais, tokens e dados sensíveis de saúde aos logs.

## ANPD / LGPD (orientação, requer decisão jurídica)

- [ANPD — dados pessoais sensíveis e saúde](https://www.gov.br/anpd/pt-br/canais_atendimento/cidadao-titular-de-dados/denuncia-peticao-de-titular-referente-lgpd): dados de saúde recebem proteção especial.
- [ANPD — Guia de segurança da informação para pequenos agentes](https://www.gov.br/anpd/pt-br/assuntos/noticias/anpd-publica-guia-de-seguranca-para-agentes-de-tratamento-de-pequeno-porte): medidas técnicas/administrativas e checklist.
- [ANPD — materiais educativos e publicações](https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes): catálogos de guias e orientações.

## Material acadêmico (referência secundária, não escopo do produto)

- [Banco de Dados II — exemplos da disciplina](https://github.com/webkauadev/banco-de-dados-ii-material-prova): padrões de PK/FK, chaves compostas, JOIN, views, procedures e triggers.
- [Branch de exercícios resolvidos](https://github.com/webkauadev/banco-de-dados-ii-material-prova/tree/teste-codex-solucoes): resoluções como exercício, não fonte para adicionar entidade/negócio.

## Autoridade

**GitHub rede-de-apoio** define o que o produto faz. **MySQL** define capacidades/limites técnicos. **OWASP/ANPD** ajudam a proteger dados e informar decisões. **Professor** fornece padrões didáticos úteis. Divergências funcionais permanecem em ADR pendente até decisão humana; não devem ser “resolvidas” com conhecimento externo sem autorização.


## Complemento consultado — temporalidade e concorrência

- https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html — bloqueios para range scans e efeito de índices.
- https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html — modelo transacional, snapshots e locking reads.
- https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html — ordem de lock, EXPLAIN e retry.
- https://dev.mysql.com/doc/refman/8.4/en/date-and-time-types.html — distinção DATE/TIME/DATETIME/TIMESTAMP.
- https://dev.mysql.com/doc/refman/8.4/en/time-zone-support.html — fuso servidor/sessão e tabelas para timezones nomeadas.
- https://dev.mysql.com/doc/refman/8.4/en/create-event.html — CREATE EVENT, agendamento e fuso.
- https://dev.mysql.com/doc/refman/8.4/en/events-overview.html — Event Scheduler, eventos recorrentes e possibilidade de instâncias sobrepostas.

Estas fontes dão sustentação técnica à análise 22–27; não redefinem o produto.


## Complemento sobre imutabilidade, upload e auditoria — 2026-10-09

- https://dev.mysql.com/doc/refman/8.4/en/stored-program-restrictions.html — restrições de triggers, incluindo não modificar livremente tabela que disparou trigger.
- https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html — snapshots não substituem locking reads para decisão de escrita.
- https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html — FK real, ações referenciais e índices.
- https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html — allowlist de tipos, validação de conteúdo, arquivo privado e limites.
- https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html — minimizar e proteger eventos de log.
- https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html — decisão de autorização por recurso e requisição.


## Complemento para decisão de concorrência por recurso

- https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html — leitura com lock na mesma transação para estado/versão atual.
- https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html — indexação/predicado alteram locks efetivos.
- https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html — deadlock reverte transação inteira e orienta retry; timeout pode reverter apenas statement.
- https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html — ordenar locks, diminuir janela e reexecutar transação abortada.
- [Contrato interno de concorrência](33_CONTRATO_CONCORRENCIA_ATOMICA.md) e [casos C-T](34_CASOS_PLANTOES_SIMULTANEOS_CONFLITOS.md).


## Referências verificadas na revisão de chaves e bloqueios — 2026-10-09

- [MySQL 8.4 — FOREIGN KEY Constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html): FKs compostas, requisitos de índice/tipos e limites de referência. FK não comprova vigência de membro.
- [MySQL 8.4 — Diferenças de FOREIGN KEY](https://dev.mysql.com/doc/refman/8.4/en/constraint-foreign-key.html): `NO ACTION` não é avaliação deferida na InnoDB.
- [MySQL 8.4 — Locking Reads](https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html): `SELECT FOR UPDATE` dentro de transação e proteção de read-modify-write.
- [MySQL 8.4 — Locks por índice e predicado](https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html): índices, busca única e faixa afetam extensão e conflito de locks.

Aplicação ao desenho [37](37_MODELO_LOGICO_CANDIDATO_RELACIONAMENTOS.md): níveis estrutural/transacional/funcional não são substituíveis entre si. Esses links são fontes de comportamento do MySQL, não da política do produto.
