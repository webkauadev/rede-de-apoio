# Gate P0 da entrega SQL + EER (Issue #124)

- [ ] SQL completo gerado na ordem 001→003→004→005; `node scripts/prepare_sql_eer_delivery.mjs --check` PASS sem drift.
- [ ] Importação **do arquivo único** em MySQL 8.4 local, novo, isolado; **34 tabelas**.
- [ ] `02_validar_34_tabelas.sql` + `verify_mysql_sql_eer.mjs` aprovados na MESMA importação (PK, FK, UNIQUE, CHECK, InnoDB).
- [ ] Casos negativos principais de integridade verificados com dados sintéticos e rollback, ou limitações qualificadas.
- [ ] Workbench **`.mwb` real** salvo e reaberto, com 34 tabelas e seus relacionamentos.
- [ ] Imagem EER legível produzida; diagrama completo ou visão geral + vistas temáticas.
- [ ] `RELATORIO_FINAL.md` comprova o realizado e distingue de evidências antigas; sem segredos.
- [ ] Checks GitHub SQL de PR verdes; revisão humana. Sem produção/deploy.

**P1 opcional:** diagramas por módulos e legenda melhorada. **Não são bloqueio:** User Stories restantes, UI, PR #123 bloqueado por elegibilidade (não implica resolver DB-002 por suposição), implantação produtiva e integridade que só a API garante.

**Estado inicial correto:** 34 tabelas e MySQL 8.4.11 comprovados em ensaios US-002/003; o pacote SQL único e `.mwb` final ainda **não** foram verificados juntos. Não declarar DONE até ter os artefatos físicos deste checklist.
