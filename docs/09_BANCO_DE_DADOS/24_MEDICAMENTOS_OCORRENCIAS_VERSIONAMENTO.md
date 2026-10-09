# 24 — Medicamentos: esquema conceitual temporal e integridade de execução

**Fatos aprovados:** RF14 cadastra medicamento, RF15 registra posologia/horários, RF16 registra administração com executor e horário real quando aplicável; RF17/N02 lembrete de cuidado programado ao Plantonista Atual, RF26/N04 atraso de 15 minutos sem registro; RF13 registra autoria e data/hora, RNF02 preserva registros de cuidado e correções. **Não existe nesta documentação uma nova regra de prescrição clínica.**

## M1. Quatro identidades semânticas (propostas)

1. **Medicamento do contexto:** identificação de medicamento ligado à pessoa idosa (D13).
2. **Regime/posologia versionado:** instruções/quantidades eventualmente estruturadas e período de validade, com vínculo ao medicamento (D14).
3. **Regra de horário/recorrência:** repetição ligada a uma versão do regime (D15).
4. **Registro de administração:** quem declarou, quando ocorreu, quando foi registrado e a qual ocorrência/regime estava associado (D16).

**Ocorrência de dose prevista** é ainda uma identidade **candidata condicional** (C04) que pode existir como projeção ou entidade, conforme DB-021 e DB-029. Não confundir um mesmo horário local repetido em datas diferentes com a mesma execução.

## M2. Validações estruturais e de escopo

- Um regime só pertence a um medicamento; o medicamento pertence a uma pessoa idosa, cujo acesso depende da rede autorizada.
- Um horário de regime deve apontar para seu próprio regime (FK real). Uma administração não pode indicar regime da pessoa A e horário da pessoa B.
- Se houver ocorrência materializada, a execução de uma ocorrência deve referenciar a mesma pessoa/regime/horário. Considerar FK composta (regime_id, horario_id) com UNIQUE correspondente no lado pai, não somente IDs avulsos.
- Administração **real** exige autoria verificável; executado_em pode ser data/hora alegada e registrado_em deve refletir persistência real. O sistema não certifica o fato clínico apenas por declarações.
- Mudança de posologia/horário deve preservar o contexto histórico do registro anterior, sem reescrever conteúdo de administração passada para novo regime.
- Execução sem ocorrência programada (por exemplo eventual PRN) depende de DB-010/DB-011. Não criar falsos agendamentos para encaixá-la.

## M3. Recorrência: alternativas, sem congelar implementação

A. **Diário simples:** horário local repetido todo dia enquanto regra válida. Não assumir que é o único comportamento permitido.

B. **Dias da semana:** máscara/lista de dias + hora; cada par data/hora dentro da vigência gera uma ocorrência candidata. Precisar decidir semana civil, timezone e exceções.

C. **Intervalos/PRN:** “a cada N horas” ou “quando necessário” têm semânticas diferentes de horário fixo; não usar ambos com a mesma fórmula sem decisão clínica/produto.

D. **Interrupção/substituição de regime:** final da vigência de V1 + início de V2, mantendo referências históricas para V1 e futuras conforme decisão. Uma administração antiga ligada a V1 não deve migrar para V2 só porque o medicamento é o mesmo.

### Tabela comparativa de fonte da verdade

| Fato | Fonte proposta | Não confundir com |
|---|---|---|
| Medicamento associado ao idoso | medicamento_id + pessoa_idosa_id | nome do remédio isolado |
| Posologia válida em determinado intervalo | regime_id + vigência | dado atual mutável que reinterpreta o passado |
| Hora pretendida | horario_id + regra temporal + zona | timestamp UTC sem data |
| Dose prevista no dia X | ocorrência com identidade distinta (candidata) | execução já realizada |
| Administração registrada | administracao_id + autor + tempos | ausência/presença de envio de N02 |
| Alerta N04 emitido | evento técnico com chave de deduplicação | prova de negligência ou omissão |

## M4. Problemas de horário e versões a resolver

- **Data civil:** “às 08:00” pertence ao calendário/fuso da pessoa idosa; timezone da conexão SQL não deve decidir por omissão.
- **Mudança de zona ou horário de verão:** hora pode não existir ou aparecer duplicada; política explícita em DB-015, sem inventar duplicação/perda de dose.
- **Mudança de regra às 07:59 quando há dose 08:00:** quem define se a ocorrência das 08:00 pertence a V1 ou V2? Precisar registrar versão/instante de efetivação e teste de fronteira.
- **Registro retroativo:** se dose 08:00 registrada 09:00 com execução alegada 08:05, estado N04 emitido 08:15 permanece como evento histórico de ausência de registro no momento, sem virar alegação clínica de omissão.
- **Múltiplas administrações:** duas pessoas registram mesma dose; até DB-011/021 não considerar duplicidade necessariamente permitida nem automaticamente corrigível; serviço deve detectar conflito e preservar tentativas auditáveis.
- **Cancelamento/suspensão de regime:** não gerar lembretes futuros da versão suspensa; não apagar administrações antigas.
- **Regra PRN:** não gerar “atraso” por dose sem horário previsto; cuidado programado sem execução continua tendo regra própria N04 quando aplicável.

## M5. Máquina de registro proposta (não criar enum fechado ainda)

Fatos distintos:
- plano/ocorrência prevista (não é execução);
- execução registrada como realizada;
- ausência de registro após limiar (classificação temporal);
- correção versionada de execução anterior (RNF02);
- cancelamento/alteração do plano para o futuro.

Estados como “omissão confirmada”, “administrado em parte” ou “reabertura” não estão definidos em RF16/RNF02; DB-011 exige regra aprovada. Evitar campo status genérico com significados misturados.

## M6. Diferença de programação por medicamento x cuidado genérico

RF17 fala em **cuidado programado**, não exclusivamente medicação. N02 pode referenciar outras fontes de cuidado. Não construir um gerador universal de dosagens para qualquer tarefa: é preciso uma identidade de ocorrência/cuidado comum íntegra ou estratégia de agregação tipada validada.

## M7. Roteiro de testes MySQL futuro (neste momento testes de mesa)

1. Regime/horário errados no mesmo registro devem falhar por integridade.
2. Mesmo usuário autorizado tenta registrar a mesma execução duas vezes na mesma ocorrência: política de idempotência/duplicidade deve ser formalizada.
3. Trocar regime após administração não altera vínculo e conteúdo originais.
4. Pessoa Idosa acessa informação do próprio medicamento read-only, sem POST.
5. Um Profissional desvinculado não pode registrar/alterar dose nova.
6. Dose espontânea/PRN sem tempo previsto não é classificada N04 por ausência.
7. Instante H+15 e registro em fronteira precisam de ordem transacional clara.
8. Recorrência de domingo a sábado gera ocorrências únicas nas datas apropriadas, com fuso aprovado.
9. Troca de timezone exige caso DST inexistente e ambíguo, sem duplicidade silenciosa.
10. Duas execuções concorrentes para ocorrência devem ser resolvidas por decisão DB-021, não por primeira que chegou sem auditoria.

## Fontes

Docs canônicos RF14–RF17/RF26, ACCEPTANCE_CRITERIA.yaml e snapshots aprovados US-017–020/US-030, RNF02; MySQL https://dev.mysql.com/doc/refman/8.4/en/date-and-time-types.html e https://dev.mysql.com/doc/refman/8.4/en/time-zone-support.html . 


## Confirmação DEC-S02 e limite sobre administração duplicada

O solicitante confirmou que plano/ocorrência de medicação, administração/execução e aviso de atraso são **fatos separados**. A distinção dos itens M1–M5 permanece válida. Um registro de execução exige autoria/instantes e associação íntegra à pessoa, sem transformar N04 em fato clínico.

O solicitante **não aprovou** automaticamente múltiplas administrações da mesma dose, tampouco dose adicional clinicamente adequada. Não inferir que a regra de uma conclusão por ciclo de tarefa cria proibição genérica de administrações legitimamente distintas: DB-011/021 continuam pendentes nesse ponto. Replay do mesmo comando deve ser idempotente.
