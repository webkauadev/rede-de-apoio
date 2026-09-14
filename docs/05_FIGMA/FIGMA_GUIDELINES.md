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

A foundation atual continua válida para grid 390/16/358, Geist >=14 px, tokens, BaseCard, primitives Obra, wrappers de 48 px, feedbacks e `STATE = PAGE BASE + DELTA MÍNIMO`.

## Direção Material Design 3

Material Design 3 é a autoridade máxima no domínio de UX/design visual, subordinada somente à verdade funcional aprovada no GitHub.

Ler obrigatoriamente:

`docs/04_DESIGN_SYSTEM/MATERIAL3_VISUAL_DIRECTION.md`

Regra:

`Requisito aprovado → padrão/role M3 → token semântico Rede de Apoio → Obra/shadcn/local primitive → tela`

Não copiar SDK, Google Sans, paleta baseline Google ou aparência Android por si só.

## Regra semântica de tokens

Não usar token de função errada apenas para eliminar hardcode.

- accent colors não substituem containers tonais;
- containers devem usar papel `* Container` equivalente quando aplicável;
- conteúdo usa `On * Container` equivalente;
- surfaces secundárias podem usar `Surface Container`;
- se o papel correto não existir, criar/mapear na Foundation antes de propagar para T##.

O active indicator do PR #91 ligado diretamente a `Color/Secondary` está pendente de calibração e não deve ser canonizado assim.

## Header TARGET

`AppHeader / Root`: título primário, contexto da Pessoa Idosa secundário, Configurações como ação deliberada, avatar contextual e targets >=48 px.

`AppHeader / Back`: voltar + título; ação secundária somente quando necessária e autorizada.

## Navigation Bar TARGET

`Home · Agenda · Diário · Saúde`

- `Mais` não pertence ao TARGET;
- Configurações não ocupa quinto slot;
- ícone + label;
- estado ativo usa container tonal + conteúdo de maior ênfase;
- seleção não depende só de cor;
- targets >=48 px e safe area.

A aparência suave anterior do indicador é baseline comparativa para a calibração visual.

## Settings / Management Sheet

Configurações abre Sheet secundário para T12–T17. Reutilizar Sheet local/Obra/shadcn quando possível. `Surface Container`/equivalente local pode ser usado para hierarquia tonal; branco puro não é requisito M3.

## Review visual M3 obrigatório

Antes de promover Foundation ou T##:

1. screenshot do resultado;
2. comparação com versão anterior quando a linguagem global mudou;
3. princípio/padrão M3 declarado;
4. papéis semânticos de surfaces/cores validados;
5. Obra/shadcn confirmado como implementação, não autoridade de UX;
6. targets/safe areas/toque acidental auditados;
7. hierarquia, densidade, legibilidade e sensação de cuidado avaliadas;
8. aprovação humana para mudanças globais.

Um node com Auto Layout, tokens e zero overflow ainda pode reprovar visualmente.

## Gate temporário

Até o PR #91 passar pela calibração M3 e revisão humana:

- header T06 e footer de cinco itens continuam `DEPRECATED_FOR_NEW_MIGRATIONS`;
- não propagar os componentes TARGET para T##;
- não iniciar T03;
- preservar a arquitetura do PR #91 e corrigir apenas calibração tonal/pendências aprovadas.

Nodes TARGET: `5652:350`, `5640:21512`, `5652:442`, `5652:443`.

## Regras permanentes

- primitive visual pode ser menor que o target interativo >=48 px;
- usar instances antes de criar equivalentes;
- manter Foundation isolada das páginas de owners, `prototypeIA`, `siteMap` e `LEGADO —`;
- Foundation não resolve P01, P03–P06, RF30/US-036 ou FI-###.
