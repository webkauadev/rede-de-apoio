# Notification Rules

## N01 — Mudança em plantão

Dispara em atribuição, alteração, cancelamento ou troca.

Recebem obrigatoriamente:

- usuário afetado;
- Familiar Principal.

Origem funcional: RF10 / US-014.

## N02 — Lembrete de cuidado programado

Dispara no horário previsto.

Recebe:

- somente o usuário que estiver ocupando a condição de Plantonista Atual naquele momento.

É obrigatório e não pode ser desativado.

A condição “Plantonista Atual” não é destinatária; o destinatário é o usuário que ocupa a condição naquele instante.

Origem funcional: RF17 / US-020.

## N03 — Cuidado registrado como realizado

Recebimento:

- Familiar Principal: obrigatório;
- demais usuários elegíveis: configurável.

Origem funcional: RF25 / US-029.

## N04 — Atraso após 15 minutos

Dispara quando ação programada com horário permanecer sem registro após 15 minutos.

Recebimento:

- Familiar Principal: obrigatório;
- demais usuários elegíveis: configurável.

“Sem registro” significa ausência de registro no sistema e não comprova que o cuidado não aconteceu.

Sintomas/intercorrências espontâneas não são classificados como atraso.

Origem funcional: RF26 / US-030.

## Regras gerais

- não duplicar notificações por acúmulo de papéis;
- notificações obrigatórias não podem ser desligadas por RF27/US-031;
- não criar Central de Notificações dedicada fora do Site Map sem nova decisão formal;
- a superfície visual onde cada aviso é apresentado ainda deve respeitar o Site Map e as telas aprovadas.
