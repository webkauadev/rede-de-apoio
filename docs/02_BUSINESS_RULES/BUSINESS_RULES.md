# Business Rules — Rede de Apoio

## RN-001 — Familiar Principal único

Deve existir exatamente um Familiar Principal ativo por pessoa idosa/rede de cuidado.

A transferência de Principal deve ser atômica: não pode existir intervalo com dois Principais nem com nenhum Principal.

## RN-002 — Papéis familiares acumuláveis

Familiar é a categoria. Os papéis Principal, Apoio e Emergência são acumuláveis.

- Principal pode acumular Apoio;
- Emergência pode acumular Principal ou Apoio;
- pode existir zero ou mais Apoios e Emergências;
- permissões familiares são derivadas dos papéis acumulados;
- não duplicar notificações por acúmulo de papéis.

A composição exata de permissão efetiva em conflitos entre papéis deve permanecer decidível na matriz de permissões; não inferir comportamento além do documentado.

## RN-003 — Plantonista Atual não é usuário

Plantonista Atual é condição operacional temporária baseada no intervalo de plantão ativo.

Um Familiar vinculado ou Profissional da Saúde pode ocupar essa condição. Ao terminar o plantão, a condição deixa de existir.

## RN-004 — Profissional da Saúde separado

Profissional da Saúde é categoria independente e não recebe papéis familiares. Pode existir mais de um e deve existir ao menos um profissional vinculado à rede.

## RN-005 — Registros de cuidado imutáveis

Após criação, um registro não deve ser apagado, sobrescrito ou alterado diretamente para correção.

## RN-006 — Correção versionada

Correções criam novo registro vinculado ao original, preservando o registro original, autoria, data/hora e histórico.

Origem canônica da US-034: RNF02 — Imutabilidade e correção versionada.

## RN-007 — Dados sensíveis

Dados pessoais e de saúde exigem controle de acesso e rastreabilidade conforme RNF01.

## RN-008 — Auditoria

Operações relevantes devem registrar usuário, categoria/papéis quando aplicável, pessoa idosa, data/hora, operação, recurso e resultado.

RNF03 é transversal. RF29 permanece origem única da US-033.

## RN-009 — Pessoa Idosa read-only — proposta

Acesso próprio da Pessoa Idosa permanece como evolução de escopo até aprovação explícita de RF30/US-036 no GitHub.

Se aprovado: somente leitura, sem administração da rede, sem papéis familiares, sem Plantonista Atual e sem app separado.

## Estados de cuidado

Estados reconhecidos:

- Programado
- Pendente
- Atrasado
- Concluído
- Sem registro de execução
- Corrigido

Regras:

- “Atrasado” ocorre após 15 minutos sem registro quando existe ação com horário programado;
- “Sem registro” significa somente ausência de registro no sistema e não prova que o cuidado não aconteceu;
- sintomas/intercorrências espontâneas não são classificados como atrasados;
- “Corrigido” deve preservar o original conforme RN-005/RN-006/RNF02.
