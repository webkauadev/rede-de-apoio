# Notification Rules

## N01 — Mudança em plantão

Dispara em atribuição, alteração, cancelamento ou troca.

Recebem obrigatoriamente:

- usuário afetado;
- Familiar Principal.

Origem funcional: RF10 / US-014.

Superfície canônica:

- feedback transitório global no AppShell (Snackbar/Sonner);
- quando houver ação de navegação, abrir **T04 — Calendário de Cuidados** no contexto correspondente.

## N02 — Lembrete de cuidado programado

Dispara no horário previsto.

Recebe:

- somente o usuário que estiver ocupando a condição de Plantonista Atual naquele momento.

É obrigatório e não pode ser desativado.

A condição “Plantonista Atual” não é destinatária; o destinatário é o usuário que ocupa a condição naquele instante.

Origem funcional: RF17 / US-020.

Superfície canônica:

- feedback transitório global obrigatório no AppShell;
- quando houver ação de navegação, abrir **T05 — Detalhamento do Dia** no cuidado programado correspondente.

## N03 — Cuidado registrado como realizado

Recebimento:

- Familiar Principal: obrigatório;
- demais usuários elegíveis: configurável.

Origem funcional: RF25 / US-029.

Superfície canônica:

- feedback transitório global no AppShell;
- quando houver ação de navegação, abrir **T05 — Detalhamento do Dia** ou **T07 — Histórico de Cuidados**, conforme o registro apresentado.

## N04 — Atraso após 15 minutos

Dispara quando ação programada com horário permanecer sem registro após 15 minutos.

Recebimento:

- Familiar Principal: obrigatório;
- demais usuários elegíveis: configurável.

“Sem registro” significa ausência de registro no sistema e não comprova que o cuidado não aconteceu.

Sintomas/intercorrências espontâneas não são classificados como atraso.

Origem funcional: RF26 / US-030.

Superfície canônica:

- feedback transitório global no AppShell;
- quando houver ação de navegação, abrir **T05 — Detalhamento do Dia**;
- o atraso também pode ser refletido em **T03 — Home** como resumo operacional, sem criar uma nova área de notificações.

## Regras gerais

- não duplicar notificações por acúmulo de papéis;
- notificações obrigatórias não podem ser desligadas por RF27/US-031;
- T16 configura somente notificações opcionais permitidas;
- não criar Central de Notificações, sino dedicado ou área principal nova fora do Site Map;
- a superfície transitória não cria histórico próprio de notificações;
- uma ação de notificação deve navegar somente para telas já existentes no Site Map;
- permissões e destinatários continuam sujeitos a RNF01 e às regras efetivas de papéis/categoria.
