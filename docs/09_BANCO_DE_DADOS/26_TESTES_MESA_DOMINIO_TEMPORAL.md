# 26 — Caderno de testes de mesa para tempo, escalas, tarefas e medicação

**Testes projetados, ainda não executados em MySQL.** As condições com marca PENDENTE não têm resposta funcional aprovada; a equipe deverá decidir sem extrapolar RF/RNF/US. Não confundir estes casos L-T com T01–T42 do documento 13, nem K-T01–K-T36 do núcleo. Pessoas e medicamentos inteiramente fictícios.

## Base sintética

R1 com Pessoa Idosa E1, Ana Principal, Bruno Apoio e Carla Profissional; R2/E2 com Diego Principal e Eva Profissional. Plantões candidatos P1 Bruno 10–12 e P2 Carla 12–14, conforme intervalos semiabertos propostos. Tarefa TX prevista às 10:00. Regime de medicamento M1 ligado E1 com doses candidatas 08:00 e 20:00. Instantes devem ser interpretados em zona/relógio definidos por DB-015.

## Série L-T01 a L-T12 — Plantão e troca

| ID | Exercício | Resultado esperado/status |
|---|---|---|
| L-T01 | P1 termina 12:00; P2 inicia 12:00 | contiguidade sem sobreposição **se** [inicio,fim) aprovado |
| L-T02 | P1 [10,12), P2 [11,13) | **PERMITIR** plantões simultâneos (DEC-S01); detectar sobreposição sem rejeitar |
| L-T03 | P1 com fim igual a início | rejeitar por intervalo vazio (proposta de validação) |
| L-T04 | P1 cancelado às 11:00, consulta 11:30 | não considerar Bruno Plantonista pelo P1 após cancelamento |
| L-T05 | Bruno é membro somente R2 e plantão está em R1 | rejeitar por escopo de rede |
| L-T06 | Membro desvinculado 11:00 ainda consta em plantão futuro 12:00 | negar escrita futura; reparação de escala depende DB-028 |
| L-T07 | Pedido de troca P1 pendente, depois aceito | alterar escala atomicamente, preservar decisão |
| L-T08 | Pedido de troca P1 recusado | nenhuma alteração de responsável |
| L-T09 | Reprocessar aceite de mesmo pedido e chave | não aplicar duas vezes |
| L-T10 | Dois pedidos para versão 3 de P1; um confirmado e ele vira versão 4 | segundo conflito/reavaliação; não sobrescrever |
| L-T11 | Cancelamento e aceite de troca concorrem no P1 | um resultado coerente, rollback de perdedor |
| L-T12 | Duas pessoas ativas em plantões sobrepostos 11:30 | **ESTADO VÁLIDO**; destino N02 ainda DB-030; não escolher destinatário aleatório |

## Série L-T13 a L-T22 — Tarefa, histórico e recorrência

| ID | Exercício | Resultado esperado/status |
|---|---|---|
| L-T13 | TX 10:00 sem conclusão às 10:14:59 | não atrasada |
| L-T14 | TX 10:00 sem conclusão às 10:15:00 | atrasada sob convenção >= H+15 proposta; borda DB-031 |
| L-T15 | TX não tem horário de execução programado | não marcar N04 apenas pelo prazo inespecífico |
| L-T16 | TX concluída por pessoa sem ser responsável nem autorizada | negar, auditar |
| L-T17 | Duas conclusões concorrentes de TX no mesmo ciclo | **UMA conclusão confirmada**; outra conflito/replay, sem segundo N03 (DEC-S03) |
| L-T18 | Conclusão às 10:05 registrada às 10:40 | preservar ambas as horas; efeito retrospectivo N04 depende DB-031 |
| L-T19 | Consulta realizada sem compromisso anterior | não exigir FK compromisso sem DB-009 |
| L-T20 | Novo regime começa no dia seguinte | preservar ocorrências/execuções anteriores no regime original |
| L-T21 | Regra semanal com dias úteis | gerar apenas dias escolhidos, calendário e fuso definidos |
| L-T22 | Dose às 08:00 todo dia | ocorrência do dia 01 não pode ser confundida com dia 02 |

## Série L-T23 a L-T32 — Medicamentos e versão

| ID | Exercício | Resultado esperado/status |
|---|---|---|
| L-T23 | Administração da Pessoa E1 aponta a horário da E2 | rejeitar FK/escopo, nunca cruzar titular |
| L-T24 | Regime M1 e horário pertencente a M2 | rejeitar por integridade composta |
| L-T25 | Dose prevista M1 às 08:00; administração às 08:06 | manter horário real distinto do previsto |
| L-T26 | Dose prevista M1 às 08:00 mas sem registro às 08:16 | N04 somente se ocorrer sem registro e política considerar essa ocorrência programada |
| L-T27 | Regime suspenso antes do horário previsto | não gerar novo N02 a partir do regime inativo |
| L-T28 | Duas gravações de administração da mesma ocorrência | detectar colisão; regra de múltiplas execuções depende DB-011/021 |
| L-T29 | Versão V1 do regime substituída por V2 | fato histórico continua apontando para V1 |
| L-T30 | Dosagem “quando necessário” sem hora prevista | não classificar ausência como atraso automaticamente |
| L-T31 | Horário de verão salta local 02:30 | horário local inexistente; tratamento depende DB-015/033 |
| L-T32 | Horário de verão repete local 01:30 | instante ambíguo; nunca duplicar execução automaticamente sem política |

## Série L-T33 a L-T42 — Notificação, replay, privacidade

| ID | Exercício | Resultado esperado/status |
|---|---|---|
| L-T33 | N02 11:00 com Bruno único Plantonista Atual | somente Bruno é destinatário obrigatório |
| L-T34 | Troca Bruno→Carla confirmada antes de N02 | resolver destinatário com escala confirmada |
| L-T35 | N02 sem Plantonista no horário | sem destinatário inventado; procedimento contingencial DB-030 |
| L-T36 | N04 em 10:15, worker repete 10:16 e 10:17 | não criar 3 alertas para mesmo evento/usuário |
| L-T37 | Ana é Principal+Emergência, N04 emitido | apenas um destinatário Ana no evento |
| L-T38 | Preferência opcional de Bruno para N03 desligada | Ana Principal continua recebendo obrigatório |
| L-T39 | Execução concluída mas cliente offline antes do envio | durabilidade de feedback depende DB-014; não afirmar entrega |
| L-T40 | N04 disparou 10:15, registro retroativo chega 10:40 alegando execução 10:05 | preservar semântica da ausência de registro às 10:15 |
| L-T41 | Pessoa Idosa tenta consultar evento interno de outbox | negar acesso, não existe inbox |
| L-T42 | Trabalhador N02 entrega com detalhe sensível a usuário desvinculado | bloquear/revalidar autorização e sanitizar mensagem |

## Planejamento de execução verdadeira (não nesta fase)

- Cada caso L-T terá fixture SQL sintética, pré-condição, comando, expected/actual, erro/código, log e evidência em PR futuro.
- Concorrência L-T10/L-T11/L-T17/L-T28/L-T36 exige pelo menos duas sessões reais e barreiras de sincronização, não apenas teste unitário.
- Timezone L-T31/32 requer zonas IANA e tzdata atualizadas; testes não podem assumir sempre UTC-3.
- L-T03, L-T01, L-T14 e respostas de sobreposição são hipóteses técnicas claramente identificadas.


## Retificação posterior dos resultados esperados — DEC-S01/DEC-S03

- **L-T02:** a detecção de sobreposição permanece; **a coexistência dos plantões está agora APROVADA pelo solicitante**. Não rejeitar P1/P2 apenas por horários cruzados.
- **L-T12:** dois plantonistas simultâneos são válidos; destinatário N02 ainda **DB-030 PENDENTE**; não escolher o primeiro do banco.
- **L-T10/L-T11:** colisões de alteração do **mesmo plantão+versão**: somente uma transação efetiva; conflito para comando obsoleto.
- **L-T17:** duas conclusões do **mesmo ciclo de tarefa** não são permitidas: um registro confirmado e outro conflito/replay, sem segunda conclusão.
- **L-T23–L-T30:** ocorrência programada, administração registrada e N04 são fatos distintos; um replay idêntico não cria nova execução. Política de dose clínica adicional distinta continua DB-011/021.
- Casos [C-T01–C-T32](34_CASOS_PLANTOES_SIMULTANEOS_CONFLITOS.md) consolidam os resultados confirmados e os aspectos ainda não aprovados.

O cabeçalho original é histórico; não ler `DB-005 PENDENTE` nos quadros acima como decisão atual.
