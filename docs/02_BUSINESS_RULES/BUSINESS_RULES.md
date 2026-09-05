# Business Rules — Rede de Apoio

## RN-001 — Familiar Principal único
Deve existir exatamente um Familiar Principal ativo por pessoa idosa/rede de cuidado.

## RN-002 — Papéis familiares acumuláveis
Um Familiar pode possuir Principal, Apoio e Emergência conforme regras definidas.

## RN-003 — Plantonista Atual não é usuário
Plantonista Atual é uma condição operacional temporária baseada no plantão ativo.

## RN-004 — Profissional da Saúde separado
Profissional da Saúde não recebe papéis familiares.

## RN-005 — Registros de cuidado imutáveis
Após criação, um registro não deve ser apagado ou alterado diretamente.

## RN-006 — Correção versionada
Correções criam novo registro vinculado preservando o original.

## RN-007 — Dados sensíveis
Dados de saúde exigem controle de acesso e rastreabilidade.

## RN-008 — Auditoria
Operações relevantes devem registrar usuário, data/hora, recurso e resultado.

## RN-009 — Pessoa Idosa read-only
Acesso próprio da Pessoa Idosa permanece como evolução de escopo até formalização no GitLab.
