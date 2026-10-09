# 34 — Testes de aceitação e concorrência: plantões simultâneos e comando único

**Status:** matriz de cenários e resultados esperados derivados das decisões DEC-S01–S03 (documento 32). A futura execução real no MySQL deve obter evidência de duas sessões concorrentes. **Nenhum destes testes foi executado no banco nesta fase.** Casos `C-T01–C-T32` complementam testes L-T; os anteriores marcados PENDENTE DB-005 precisam ser reinterpretados conforme DEC-S01.

## Plantões simultâneos — C-T01…C-T08

| ID | Entrada | Resultado esperado |
|---|---|---|
| C-T01 | Plantão P1 (Ana, 10–12), P2 (Bruno, 11–13), rede R1 | Ambos podem existir/ficar ativos: a sobreposição não é motivo para negar |
| C-T02 | P1 [10–12), P2 [12–14) | Continuam válidos; fronteira exata sob convenção temporal ainda candidata |
| C-T03 | P1 e P2 idênticos em intervalo, com diferentes membros da rede | Não rejeitar apenas pelo mesmo horário |
| C-T04 | P1/P2 válidos e simultâneos, consulta em 11:30 | Consulta de plantonistas atuais devolve os dois membros elegíveis, não um aleatório |
| C-T05 | P2 responsável desvinculado às 11:15, consulta 11:30 | P2 deixa de conferir condição de Plantonista Atual; P1 preservado |
| C-T06 | Ana é Plantonista Atual de P1 e Bruno de P2; Ana tem responsabilidade da tarefa X | Bruno não ganha automaticamente responsabilidade sobre X |
| C-T07 | Editar P1 enquanto P2 sobrepõe o novo intervalo | Pode editar P1, desde que regras de P1 e permissão sejam satisfeitas; não barrar por P2 |
| C-T08 | N02 no instante 11:30 com dois plantonistas e cuidado sem destinatário definido | **PENDENTE DB-030**: não escolher arbitrariamente; exigir política funcional, não alegar entrega N02 validada |

## Trocas e cancelamentos — C-T09…C-T18

| ID | Entrada | Resultado esperado |
|---|---|---|
| C-T09 | Pedidos diferentes A e B tentam aceitar troca de P1 versão 2 | Uma mudança confirma; outra conflito sem gravar |
| C-T10 | A aceita troca P1, B cancela P1 a partir da mesma versão | Um efeito confirma; outro versão obsoleta |
| C-T11 | A e B repetem o mesmo pedido com a mesma chave e payload | Efeito único, replay do resultado sem N01 duplicado |
| C-T12 | Reutilizar mesma chave com destinatário diferente | Erro de reutilização; nenhuma troca extra |
| C-T13 | Trocar P1 e P2 (se permuta for aprovada), uma versão já mudou | Abortam-se ambas as alterações |
| C-T14 | Pedido de troca já RECUSADO recebe tentativa de ACEITE | Rejeitar, sem nova mudança de plantão |
| C-T15 | Pedido de troca já ACEITO recebe RECUSA | Rejeitar sem alterar efeito confirmado |
| C-T16 | Solicitante em R2 tenta aceitar troca em P1 da R1 | Negar por autorização/escopo, auditar |
| C-T17 | P1 e P2 se sobrepõem mas alterações referem plantões diferentes | Ambas podem confirmar independentemente |
| C-T18 | Primeiro comando confirmado em P1, segundo chega com version antiga | Segundo recebe conflito e estado atual seguro para refresh |

## Conclusão de tarefas — C-T19…C-T27

| ID | Entrada | Resultado esperado |
|---|---|---|
| C-T19 | Ana e Bruno pressionam concluir T1/ciclo 1 quase ao mesmo tempo | Um único fato de conclusão; segundo conflito/JA_CONCLUIDA |
| C-T20 | Ana envia mesmo comando duas vezes por timeout | Retorno idempotente, 1 conclusão |
| C-T21 | Bruno envia mesma chave de Ana com payload diferente | Não aceitar replay; validar escopo/ator/chave |
| C-T22 | T1/ciclo 1 concluída, outro usuário tenta concluir de novo | Negar segunda conclusão independente da UI |
| C-T23 | T1 e T2 são tarefas distintas, ambas elegíveis | Podem ser concluídas em paralelo |
| C-T24 | Usuário é Plantonista Atual, mas não é responsável por T1 | Não ganha automaticamente US-025; checar responsabilidade |
| C-T25 | O responsável perde autorização antes do commit | Revalidar permissão no commit/transação; negar se já revogada |
| C-T26 | N03 enviado após conclusão confirmada; outro clique concorrente perde | Somente conclusão real emite evento, sem N03 duplicado |
| C-T27 | T1 é reaberta no futuro | **PENDENTE DB-007**: se autorizado, novo ciclo distinto, sem apagar conclusão antiga |

## Plano, administração e avisos — C-T28…C-T32

| ID | Entrada | Resultado esperado |
|---|---|---|
| C-T28 | Dose programada D1, administração E1 e alerta N04 A1 | Três fatos distintos, sem reinterpretar execução como plano ou alerta |
| C-T29 | N04 foi emitido pela ausência de registro às 08:15, execução informada às 08:05 mas lançada às 09:00 | Preservar histórico do que o sistema sabia em 08:15; sem afirmar omissão clínica |
| C-T30 | Mesma ação D1 é submetida duas vezes por retry | Não criar segunda execução apenas por retry idêntico; legitimidade de execuções distintas permanece DB-011/021 |
| C-T31 | Dois plantonistas estão ativos; um deles tem responsabilidade explícita por D1 | **Proposta DB-030:** N02 de D1 para responsável ativo da ação; não homologado até mudança da regra |
| C-T32 | Mesmo fato de cuidado e evento N03 com Principal+Emergência acumulados | Notificar usuário uma vez, não por papel |

## Execução física obrigatória quando SQL for autorizado

1. Fixar versão MySQL/InnoDB, isolamento, índices e seeds sem dados reais.
2. Criar dois clientes/transações e barreiras para reproduzir interleavings: A bloqueia P1; B tenta aceitar/cancelar; comparar commits, erros e auditoria.
3. Repetir para concluir T1/ciclo 1 e criar fato único por UNIQUE/lock; validar replay com a mesma chave e chave nova obsoleta.
4. Executar simultaneamente P1 e P2 sobrepostos, mas distintos: ambos devem confirmar; não bloquear por índice único de intervalo.
5. Testar deadlock e retry integral, observando que conflito de versão nunca vira sobrescrita automática.
6. Validar N01/N03 uma vez por evento/destinatário na estratégia de outbox escolhida.
7. Resolver e homologar DB-030 **antes** de afirmar que N02 atende todos os casos de múltiplos plantonistas.

Nenhum SQL, migration ou banco criado neste documento.
