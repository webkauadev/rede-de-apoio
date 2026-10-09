# 07 — Saúde, medicação, diário e registros

## Requisitos canônicos

RF11–RF19, RF23; US-015–022, US-027, US-034; RF13 autoria/data-hora; RN-005/006, RN-007/010 e RNF02. **O sistema registra informações de cuidado, não toma decisões clínicas.**

## Separar três fatos distintos

1. **Medicamento cadastrado**: rótulo/informação vinculada à Pessoa Idosa. Não é necessariamente uma prescrição clínica verificada.
2. **Regime/posologia**: instrução e horários previstos com período de validade (proposta de versionamento de regime).
3. **Administração**: declaração histórica de realização/omissão quando aplicável, executada por usuário autorizado e registrada num instante. Não confundir cadastro de horário com execução real.

Campos propostos: medicamento_id, regime_id, horario_id, administracao_id, pessoa_idosa_id, executor_usuario_id, previsto_em, realizado_em, registrado_em; campos de posologia podem ser texto até padronização segura de dose/unidade.

## Decisões não resolvidas

- O regime pode ser diário, semanal, em dias alternados, condicionado ou “se necessário” (PRN)? RF15 não define todos os casos.
- Quem está autorizado a cadastrar/alterar posologia além da regra geral de escrita por categoria? Não inferir poder de prescrição médica.
- É permitida administração adiantada, atrasada, parcial, omitida ou duplicada? A especificação não enumera esses estados.
- Mudança de regime afeta eventos passados? Proposta: nunca reescrever histórico da posologia usada no instante original.
- Doses sem horário programado entram em N02 ou N04? Não presumir; os gatilhos se aplicam a ações programadas com horário.
- Como a aplicação lida com horário de verão, timezone local, horário ambíguo e passagem da meia-noite?

## Integridade mínima proposta

- Identificar pessoa idosa e vínculo de cada regime/registro sem ambiguidade.
- Se administracao referencia horario_id, o horário precisa pertencer ao mesmo regime_id; FK composta candidata.
- “Um horário para dois dias” não deve virar lista separada por vírgulas em uma coluna.
- Data/hora **ocorrida** pode ser anterior à data/hora **registrada**; guardar ambas quando existir valor próprio.
- Não sobrescrever ou apagar fatos históricos de administração como estratégia de correção; aplicar RNF02 e registro de versões.
- Registrar autoria real (usuário autenticado), categoria e contexto, não uma string inventada de executor.
- Atualização futura de medicamento/regime não altera a interpretação histórica das administrações anteriores.

## Diário, sintomas e intercorrências

Registros espontâneos podem ser classificados em tipos de evento para consulta T06/T07, com autoria, ocorrência, gravação e correções. **Não são ações programadas** e não entram na regra de atraso apenas por não existir horário.

### Consulta e recomendação

Uma consulta realizada e uma recomendação são registros relacionados, mas com ciclos de vida diferentes. A entidade “consulta” pode existir sem compromisso planejado; recomendação pode ser ligada à consulta. Não anexar uma recomendação a pessoa idosa errada ou profissional desvinculado.

## Histórico e visão do dia

T05/T07 integram informações autorizadas de diário, administração, compromissos, tarefas e consultas conforme origem e seleção. A visão “atual” de um conteúdo corrigido aponta para a última versão **sem eliminar** registros anteriores. Não gravar o resultado desse JOIN como novo fato permanente sem necessidade auditada.

## Checklist de validação futura

- [ ] Uma pessoa idosa não vê doses de outra.
- [ ] Administrações correspondem ao regime e horário do próprio idoso.
- [ ] Regime vencido não gera automaticamente próxima dose sem regra de reativação.
- [ ] Ator da administração e instante real permanecem disponíveis.
- [ ] Registro espontâneo não produz N04.
- [ ] Histórico original/correções podem ser reconstituídos em ordem.
- [ ] Acesso somente-leitura da pessoa idosa não permite registrar administração.
- [ ] Não inferir recomendações médicas, diagnósticos nem alteração de dose por algoritmo.


## Revisão aprofundada — versão de posologia e ocorrência datada

Ver [22 — tempo e recorrência](22_REGRAS_TEMPORAIS_E_RECURRENCIA.md), [24 — medicamento/posologia/execução](24_MEDICAMENTOS_OCORRENCIAS_VERSIONAMENTO.md), [25 — notificações N02/N04](25_N02_N04_EVENTOS_IDEMPOTENCIA.md) e [26 — cenários L-T23–L-T32](26_TESTES_MESA_DOMINIO_TEMPORAL.md).

**Distinção mandatória para a futura arquitetura:** uma linha de medicamento, a versão do regime, um horário de repetição, uma ocorrência **datada** e o fato de administração NÃO são o mesmo registro. Não inferir número de doses, recomendação médica, status clínico ou regra de horário de verão do RF15/16. Alterações preservam fatos históricos e exigem decisões DB-010/011/021/029/033.


## Confirmação do solicitante — fatos distintos

A decisão DEC-S02 confirma a separação dos modelos: medicação agendada/regime e ocorrência prevista, administração informada por ator autorizado com tempo real/registro, e N04 emitido apenas por ausência de **registro no sistema** após 15 min (não prova que a medicação não ocorreu). Retificação versionada segue RNF02.

Uma execução adicional genuinamente distinta e duas gravações/retry da **mesma** dose não têm a mesma semântica; mecanismos de unicidade e casos de dose extra continuam DB-011/021. Consultar [32](32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md) e [34](34_CASOS_PLANTOES_SIMULTANEOS_CONFLITOS.md).
