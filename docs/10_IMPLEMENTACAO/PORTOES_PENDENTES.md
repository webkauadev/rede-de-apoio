# Portões finais para Codex implementar produto sem alucinar

**Status:** tarefas de aprovação específicas; **não são reprovação do trabalho documental homologado** nem novo requisito funcional. A equipe aprovou o avanço da prototipação e autorizou produzir SQL para importação futura. Porém a documentação de origem conserva alternativas mutuamente excludentes não resolvidas, e as escolhas de produto precisam ser concretas.

## O que está pronto para trabalhar usando só GitHub

- Contrato agente `AGENTS.md`, playbook Codex, backlog 36 US, RF/RNF/US + critérios aprovados P01, regras de acesso e notificações.
- Capturas reais em PNG dos **17 frames-base** + **9 estados** no snapshot versionado; matrizes T##/E##/estado/tokens seguem disponíveis.
- Modelo conceitual/lógico extensivo do PR #115; SQL MySQL 8.4 **V0.1 em PR #116**, diagramável no Workbench, validado apenas estaticamente.
- CI `validate_agent_context.py`, `validate_sql_prototype.py`, `validate_visual_snapshot.py` e `validate_implementation_backlog.py` (após conclusão do PR).

## Quatro decisões de produto que ainda bloqueiam casos de uso reais

| Portão | Alternativas descritas (nenhuma selecionada pela fonte) | Escolha técnica recomendada para debate |
|---|---|---|
| **DB-001** Redes por Pessoa Idosa | A1: uma rede na vida; A2: uma operacional por vez, outras históricas; B: várias ativas | avaliar A1 para V1 simples, **não aprovar implicitamente** |
| **DB-002** Primeiro cadastro/rede | B1: rede EM_CONFIGURACAO; B2: tudo em transação; B3: pessoa cadastrada, depois rede completa | avaliar B3 para cumprir RN-001/RN-004 com clareza |
| **DB-003/027 e DB-028** Reingresso/saída | permitir reingresso por novo episódio (E1) ou participação estável + episódios (E2); definir futuras tarefas/plantões | avaliar E1, exigir reatribuição/suspensão explícita após desvínculo |
| **DB-030** N02 com múltiplos plantonistas | A: responsável da ocorrência; B: todos os plantonistas; C: política de seleção | avaliar A **mais uma contingência explícita** quando não existe designado elegível, sem fallback automático |

**Outras ADRs pendentes**, como medicação PRN, dose clínica duplicada, versão por domínio, anexos corrigidos, retenção, auditoria de rollback, devem ser respondidas **antes do respectivo módulo**. Elas não impedem escrever o guia Codex nem importar o protótipo SQL para desenhar EER, mas impedem tratar esse SQL como produção.

## Duas confirmações técnicas

1. Aprovar plataforma/stack de aplicativo (web/PWA/Next.js ou outra) e autenticação (DB-016).
2. Autorizar local/ambiente para executar realmente o SQL, se desejar prova MySQL; **o pedido atual é só prototipação SQL e importação posterior pelo usuário**.

## Processo de homologação por escolha

- Registrar opção concreta, data e decisão explícita de quem aprova.
- Conferir RF/US/critério aprovados e atualizar as Issues afetadas quando uma regra mudar (`migration_required`).
- Consolidar o ADR na origem canônica, atualizar SQL/diagramas/snapshot se necessário.
- Para merge: revisar PR #115 (modelagem documental) primeiro, depois PR #116 (SQL+Codex) que depende dele; CI verde **não** equivale a revisão humana.
- Codex pode executar tarefas com escopo resolvido, mas deve registrar `BLOCKED_BY_DECISION` na parte que depender de escolha pendente.

**Risco explícito:** “fazer tudo” significa concluir as atividades técnicas possíveis, **não transformar A1/B3/E1/N02-A em decisões do usuário sem que ele escolha**. A equipe pode homologá-las em uma única deliberação clara, registrada no GitHub.
