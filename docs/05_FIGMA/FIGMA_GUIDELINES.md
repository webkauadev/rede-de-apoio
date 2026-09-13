# Figma Guidelines

## Organização

Todas as telas devem seguir o Design System do projeto.

## Estrutura

Preferir:

Screen
- Header
- Content
- Components
- Actions
- Navigation

## Regras

- Usar Auto Layout.
- Evitar posicionamento absoluto para estrutura.
- Reutilizar componentes.
- Criar variantes para estados.
- Não duplicar componentes visualmente equivalentes.

## Fluxo de validação

RF → US → Tela → Estado → Componente.

## Foundation canônica

`Design Foundation` (`5639:21448`) é a página de referência visual para novas refatorações. Ela contém tokens, shells e componentes compartilhados e não é uma T## nem uma fonte funcional.

- manter a foundation isolada de David, Rhuan, Henrique, Kauã, `prototypeIA`, `siteMap` e `LEGADO —`;
- aplicar grid 390/16/358, tipografia mínima 14 px, target de toque 48 px e `STATE = PAGE BASE + DELTA MÍNIMO` nas migrações futuras;
- usar instances de primitives locais antes de criar equivalentes;
- a existência da foundation não resolve P01, P03–P06, RF30/US-036 ou qualquer FI-###.
