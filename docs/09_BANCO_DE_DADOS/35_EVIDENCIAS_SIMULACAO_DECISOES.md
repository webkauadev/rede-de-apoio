# 35 — Evidência de análise dos comandos concorrentes (sem banco)

**Data:** 2026-10-09. **Método:** funções puras e estados em memória num avaliador JS temporário, exercitando ordens seriais alternativas, versões esperadas, chaves de idempotência, conclusão de tarefa e dois plantões com horários sobrepostos. **Resultado: 6.020 / 6.020 asserções ilustrativas correspondentes ao modelo de referência. Não houve SQL, MySQL, duas conexões nem threads reais.**

## Regras representadas no modelo simplificado

- `plantao` possui `id, membro, inicio, fim, revisao, status`. Dois plantões diferentes de R1 podem ter intervalos sobrepostos e dois membros em condição de Plantonista Atual, sem conflito por sobreposição.
- `applyChange` altera um plantão se `expectedVersion == version` e plantão ainda ativo. Usa chave `plantao_id|idempotency_key`; replay do mesmo comando/payload não reaplica, mudança de payload com mesma chave é rejeitada. Comando baseado em revisão antiga é conflito.
- `completeTask` usa `tarefa_id|idempotency_key`, `expectedVersion`, autorização fictícia, `completed` e contador de conclusões. Uma vez concluída no ciclo, outro comando não acrescenta segunda conclusão.
- Modelos de autorização e transação **não** foram implementados; `authorized` foi um valor de teste, não controle real de sessão.

## Contagem auditável

| Grupo | Repetições | Asserções por repetição | Total |
|---|---:|---:|---:|
| Plantões sobrepostos e alteração do mesmo P1 | 400 | 8 | 3.200 |
| Dupla conclusão da mesma tarefa e idempotência | 400 | 7 | 2.800 |
| Dois plantonistas simultâneos no instante consultado | 20 | 1 | 20 |
| **TOTAL** | | | **6.020** |

**Oito predicados da série de plantões:** (1) P1/P2 estão ativos em 11:30; (2) aceite A e comando B no mesmo P1/versão: A confirma, B obsoleto; (3) ordem invertida: B confirma, A obsoleto; (4) mesma chave+payload retorna replay; (5) mesma chave+payload diferente é rejeitada; (6) P2 independente pode ser atualizado; (7) cancelamento de P1 não modifica P2; (8) após cancelamento de P1 um aceite baseado na versão anterior é rejeitado.

**Sete predicados da série de tarefas:** (1) primeira conclusão confirmada; (2) segundo comando recebe conflito e contador continua 1; (3) ordem inversa também deixa só 1; (4) retry idempotente; (5) autor não autorizado fictício é rejeitado; (6) outra tarefa T2 pode concluir separadamente; (7) chave reutilizada com payload alterado é rejeitada.

## O que permanece a provar

1. Sob duas transações reais InnoDB, o SELECT/UPDATE com locks e condicionais de versão garante que não haja dois commits conflitantes.
2. UNIQUE ou mecanismo transacional real impede duas conclusões para tarefa+ciclo **mesmo se chamadas usarem chaves de idempotência diferentes**.
3. Um deadlock ou timeout faz rollback corretamente e retry não duplica evento N01/N03.
4. Operações de plantões simultâneos distintos não são bloqueadas erroneamente por um único índice de tempo ou um lock de rede excessivo.
5. Idempotência do mesmo comando depende de persistir a chave de operação ou tecnologia equivalente; `Map` JS não representa durabilidade.
6. A autorização RN-010 e a condição temporal de plantonista foram apenas abstraídas, não integradas à sessão/provedor de identidade.
7. Regra N02 de vários plantonistas permanece **DB-030**, sem prova de destinatário.

**Não somar esta contagem a simulações anteriores como um conjunto de 6.020 testes de integração independentes.** Os 6.020 são predicados repetidos em entradas artificiais para reduzir erro de raciocínio.

Referências: [32](32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md), [33](33_CONTRATO_CONCORRENCIA_ATOMICA.md), [34](34_CASOS_PLANTOES_SIMULTANEOS_CONFLITOS.md).
