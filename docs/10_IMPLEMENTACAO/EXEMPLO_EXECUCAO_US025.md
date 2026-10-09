# Exemplo de tarefa autônoma do Codex: US-025 sem extrapolar RF21

**Exemplo de planejamento de execução, não implementação e não teste real.** Demonstra como Codex executará uma tarefa concreta usando apenas fontes do GitHub. Owner/issue/origem da US obtidos de `USER_STORIES_INDEX.yaml`.

**Issue:** [US-025 — Concluir tarefa, #61](https://github.com/webkauadev/rede-de-apoio/issues/61) • **Origem única:** RF21/#25 • **Owner:** Rhuan • **Telas:** T09 e T05 • **Critérios aprovados:** consultar comentário da Issue indicado por `ACCEPTANCE_CRITERIA.yaml` (P01/#73).

## Caminho de leitura e execução

1. Ler `AGENTS.md`, `CODEX_PLAYBOOK.md`, `IMPLEMENTATION_BACKLOG.json` e localizar US-025.
2. Ler RF21/US-025, RN-010, matriz de permissões e RNF03; reconhecer que **usuário responsável** pode concluir, não qualquer usuário da rede.
3. Abrir `FIGMA_SNAPSHOT/assets/T09.png` e `FIGMA_SNAPSHOT/assets/T05.png`, `STATE_MATRIX.yaml`, componentes de tarefa e tokens; estado de conclusão herda PAGE BASE e muda só o necessário.
4. Examinar SQL experimental `tarefa` + `conclusao_tarefa`. O `UNIQUE(rede_id,tarefa_id,ciclo_numero)` modela efeito único por tarefa+ciclo, mas **não** verifica responsável, vínculo atual ou reabertura.
5. Examinar DEC-S03: duas requisições incompatíveis para o mesmo recurso/ciclo, uma confirmação e um conflito, com reprocessamento idempotente. Não gerar N03 se operação não foi confirmada.
6. Examinar **DB-007**: reabertura ainda não foi decidida. **Não** inventar botão de reabrir nem incrementar ciclo sem decisão.
7. Definir handler/API só após a escolha de stack: autenticar, verificar mesmo escopo, vínculo efetivo e responsabilidade operacional, serializar estado da tarefa, validar versão/ciclo, gravar uma conclusão com data de ocorrência e registro, confirmar auditoria e evento somente após commit.
8. Escrever testes positivos/negativos, incl. duas conexões no DB autorizado e `409 CONFLICT` com uma conclusão para disputa. Testes de mesa existentes não contam como testes reais.
9. Abrir PR rastreado RF21→US-025→T09/T05→testes, citando decisões pendentes; não auto-mergear.

## Casos de aceite técnico de referência (não são novos critérios canônicos)

| Caso | Resultado esperado |
|---|---|
| responsável ativo, tarefa pendente, versão atual | conclusão única + histórico |
| outra pessoa conhece o ID da tarefa | acesso negado, auditável |
| membro de outra rede envia requisição | negado por contexto |
| dois comandos na mesma tarefa/ciclo | somente um COMMIT válido, outro conflito |
| repetição exata da mesma chave/payload | mesmo resultado lógico, sem nova conclusão |
| repetição da chave com payload diferente | conflito de idempotência, não reutilizar resultado |
| Pessoa Idosa tenta concluir | negado sem escrita, mesmo quando vê a tarefa |
| comando concorrente a desvínculo | revalidar participação e locks; nunca confirmar com permissão revogada |
| tarefa concluída e alguém tenta reabrir | `BLOCKED_BY_DECISION: DB-007` |

**Saída do Codex:** PR com arquivos, comandos reais de teste, prints/CI, segurança e exclusões explícitas. A documentação atual não fornece uma API ou app implementado; são contratos para a futura fase autorizada.
