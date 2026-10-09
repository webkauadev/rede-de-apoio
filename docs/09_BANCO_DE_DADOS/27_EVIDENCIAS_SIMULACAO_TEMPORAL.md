# 27 — Evidências de simulação lógica do domínio temporal

**Data:** 2026-10-09. **Ambiente:** avaliação em memória de expressões JavaScript temporárias por agente, com dados artificiais. **Não houve MySQL, schema, instância, triggers, procedures, migrações nem concorrência de verdade.** Evidência resumida, não scripts de teste de produção.

## Resultado observado: 17.774 / 17.774 expressões satisfeitas

| Classe de verificação | Quantidade aproximada de instâncias avaliada | O que de fato foi verificado |
|---|---:|---|
| Pares de intervalos [início,fim) | 784 pares, 1.568 asserções | predicado A.inicio<B.fim E B.inicio<A.fim comparado a amostragem de pontos internos + simetria |
| Fronteiras de plantão com responsabilidade | 50 fronteiras, 250 asserções | fim exclusivo/início inclusivo, cancelamento e vínculo removido no predicado simplificado |
| Versão/troca/replay | 100 instâncias, 400 asserções | aceite uma vez, replay idempotente, expectativa obsoleta gera conflito, cópia não muta original |
| Limiar N04, com variação em segundos | 3.601 instantes, 10.803 asserções | antes/depois de +15 min, exclusão quando existe execução, exclusão de espontâneos |
| Destinatários N03 | 128 combinações, 256 asserções | conjunto único de usuários e nenhuma inclusão de destinatário não autorizado B |
| Máscaras semanais | 128 máscaras × 7 dias, 896 asserções | inclusão coerente com dias selecionados |
| Associação medicação-regime/titular | 20² × 3² = 3.600 asserções | igualdade de regime e pessoa evita referência cruzada no predicado |
| Deduplicação por evento/tipo/ocorrência/usuário | 1 asserção | replay de evento não duplica chave; ocorrência/usuário distintos preservados |
| **Total** | **17.774 asserções** | **17.774 conforme esperado; 0 falhas** |

**Correção importante:** as verificações anteriores de 560 predicados sobre papéis do documento 21 são independentes desta rodada; não somá-las como “18.334 testes independentes”. Predicados enumerados repetem a mesma fórmula em múltiplas entradas e não equivalem a provas de implementação.

## Interpretação estrita

Os predicados testados são **hipóteses de referência** que ajudam a revisar lógica de fronteira, nunca uma prova de que o MySQL tratará corretamente concorrência, timezone/DST, idempotência cross-service ou isolamento de dados. A simulação NÃO testou:
- queries SQL, tipo DATETIME/TIMESTAMP, FK composta nem CHECK;
- sobreposição autorizada/proibida (DB-005 ainda pendente);
- interpretação canônica do instante exato H+15;
- recorrência real com timezone/DST nem mudanças de fuso;
- durabilidade após crash, locks em InnoDB e transações paralelas;
- administrador/plantonista autênticos do backend ou outbox real.

## Especificação das expressões de referência (para futura conversão a testes reais)

- overlap(A,B) = A.inicio < B.fim E B.inicio < A.fim.
- active(P,t) = P.status=ATIVO E P.membroAtivo E P.inicio <= t < P.fim.
- transfer(state,request) = se key previamente aplicada, replay; senão se request.versao != state.versao, conflito; senão novo estado com versão +1.
- late(event,t) = programado E sem execução registrada E t >= previsto+15min (**borda proposta**).
- recipients = conjunto dos usuario_id elegíveis, não conjunto de papéis.
- occurrenceWeek(mask,day) = bit de dia pertence à máscara de recorrência (apenas ilustração, não mecanismo aprovado).
- adminBelongs = regime da administração = regime do horário E pessoa da administração = pessoa do horário.
- dedupe = identidade por evento, tipo, ocorrência e usuário.

## Pontos que podem invalidar hipóteses

1. **DB-005/030** permitir dois plantonistas torna a seleção singular N02 não resolvida, mesmo que intervalo seja matematicamente correto.
2. **DB-015/033** pular/repetir hora local torna inviável usar simplesmente segundos UTC para recorrência.
3. **DB-007/032** permitir múltiplas conclusões faz uma UNIQUE de execução não servir como regra geral.
4. **DB-011/021** permitir várias administrações justificadas exige diferenciar duplicata involuntária de fatos distintos.
5. **DB-031** exige definir se uma execução registrada no exato instante +15 impede ou não a notificação N04, inclusive sob corrida.
6. **DB-014** snackbar transitório não equivale a entrega assíncrona garantida sem infraestrutura definida.

## Testes físicos necessários no próximo estágio

Conexões paralelas MySQL: mesmo plantão trocado duas vezes, troca x cancelamento, último profissional/vínculo x nova atribuição, duas conclusões da mesma tarefa, duas administrações mesma dose e worker N04 x gravação; confirmar locks, rollback e idempotência de outbox. Timezone: teste nomeado com dia sem hora local e dia com hora duplicada. Verificar FK de escopo entre redes e regimes; registrar versões MySQL, scripts e saídas. Até então status global = **NÃO HOMOLOGADO PARA SQL**.

## Referências

https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html ; https://dev.mysql.com/doc/refman/8.4/en/time-zone-support.html ; https://dev.mysql.com/doc/refman/8.4/en/events-overview.html .
