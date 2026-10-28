# Banco de dados — garantia física versus regra transacional

**Status do estudo:** CONFORME NO ESCOPO VERIFICADO para a existência do pacote físico **34 tabelas / 79 FKs**, com evidências versionadas de MySQL 8.4.11. A semântica operacional geral requer serviços/contexto e não é certificada por esse pacote.

## Evidência física realmente existente

- [Validação em MySQL 8.4.11](https://github.com/webkauadev/rede-de-apoio/blob/main/entrega/sql-eer/validacao_sql_real.json) — importação única em schema inicialmente vazio; 34 PK, 44 UNIQUE, 79 FK, 50 CHECK, 34 tabelas InnoDB.
- [Testes estruturais executados](https://github.com/webkauadev/rede-de-apoio/blob/main/entrega/sql-eer/testes_estruturais.json) — 8 casos PASS, rollback executado e 34 tabelas vazias ao final. Testes usam dados sintéticos.
- [Modelo nativo Workbench](https://github.com/webkauadev/rede-de-apoio/blob/main/entrega/sql-eer/rede_de_apoio_v1.mwb), [relatório de reabertura](https://github.com/webkauadev/rede-de-apoio/blob/main/entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md) — 34 tabelas, 305 colunas, 79 FKs e seis vistas.
- [SQL consolidado](https://github.com/webkauadev/rede-de-apoio/blob/main/entrega/sql-eer/01_schema_completo_v1.sql) — autoridade dos CHECKs, que não foram representados por objetos `db.CheckConstraint` no XML do Workbench.

## Matriz de garantias

| Regra do domínio | Mecanismo demonstrado no banco | Limite técnico / propriedade não comprovada só com DDL | Classificação |
|---|---|---|---|
| Uma rede por Pessoa Idosa | UNIQUE e teste negativo `ER_DUP_ENTRY` | Não obriga que perfil recém-criado tenha rede operacional | DDL comprovado para **no máximo uma** |
| No máximo um Principal ativo | UNIQUE condicional + teste negativo `ER_DUP_ENTRY` | **Exatamente um** Principal exige protocolo transacional de bootstrap/transferência | DDL comprova somente máximo |
| Pelo menos um Profissional na rede operacional | Não há CHECK simples que conte membros em outras linhas | Exige lógica transacional e critérios de ativação/vínculo | EVIDÊNCIA AUSENTE de enforcement somente DDL |
| Pessoa Idosa sem vínculo de cuidador | FK/regra física testada com `ER_NO_REFERENCED_ROW_2` | Não comprova whitelist read-only em serviço, rota e aplicação | DDL parcial + app pendente |
| Papel familiar exige membro de categoria familiar | FK composta testada com `ER_NO_REFERENCED_ROW_2` | Concessões vigentes e condições temporais ainda exigem autorização contextual | DDL parcial + app pendente |
| Uma conclusão de tarefa por ciclo V1 | UNIQUE e CHECK; dois testes negativos | Não comprova decisão de autorização, idempotência e auditoria em concorrência real | DDL parcial + app pendente |
| Uma administração por ocorrência | UNIQUE negativa demonstrada | Administração avulsa e confirmação clínica não são garantidas por constraint; ocorrência não implica execução | DDL parcial + app pendente |
| FKs de contexto rede/idoso/membro | 79 FKs físicas exportadas | FK impede referência inválida, mas não comprova vínculo **vigente**, plantão ou permissão do autor | DDL para referência, app para política |
| Anexo com pai único | Colunas/FKs e CHECK devem ser conferidos individualmente no SQL; DB-C2 é recorte | Não concluir autorização herdada de um FK nem presumir que três pais são simultâneos | Revisão cruzada pendente |
| Correção imutável e versionada | Estruturas de correções/UNIQUE de versão presentes | Proibição de UPDATE/DELETE corretivo, autorização e atomicidade dependem de contratos, privilégios e testes | DDL parcial + serviço pendente |
| N02/N04 temporais | Ocorrência e entrega técnica têm estruturas no banco | Cálculo H+15, destinatário elegível, DST e deduplicação não decorrem da presença da tabela | Regras de aplicação pendentes |
| Sessão com expiração posterior | CHECK testado `ER_CHECK_CONSTRAINT_VIOLATED` | Não comprova que autenticação/runtime rejeita sessão expirada | DDL parcial + app pendente |
| Auditoria de acesso negado/CSV | Tabela e vínculos de auditoria presentes | Evento no rollback negado e ausência de exposição exigem contrato de serviço e prova | EVIDÊNCIA AUSENTE de execução funcional |

## Divergência histórica reconciliada

Documentos iniciais de planejamento em `docs/09_BANCO_DE_DADOS/11_CONTRATO_TECNICO_MYSQL.md` e `17_VALIDACAO_DOCUMENTAL.md` dizem corretamente que **naquele estágio** não havia DDL ou MySQL executado. **Isso não é o estado posterior de 13/10**: os JSONs em `entrega/sql-eer/` comprovam importação única e testes estruturais numa instância descartável MySQL 8.4.11. Os dois fatos coexistem como etapas históricas; não é necessário sobrescrever os documentos antigos.

## Gate técnico acadêmico

- [x] Pacote físico com 34 tabelas e 79 FKs documentado.
- [x] Evidência de execução MySQL 8.4.11, UNIQUE/PK/FK/CHECK e rollback.
- [x] Workbench nativo aberto/salvo/reaberto e seis vistas exportadas.
- [ ] Reconciliar invariantes entre modelo conceitual, lógico, DDL e diagramas seletivos por exemplos.
- [ ] Distinguir garantias atestadas do DDL de autorização/concorrência de serviço durante a apresentação.
- [ ] Anexar parecer independente de revisão dos vínculos e cardinalidades críticos.
- [ ] Homologação acadêmica (não demonstrada).

**Não realizar mudança de schema durante esta transição.**
