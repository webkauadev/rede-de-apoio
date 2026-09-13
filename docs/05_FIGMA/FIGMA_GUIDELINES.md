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

A foundation atual continua válida para:

- grid 390/16/358;
- tipografia Geist, mínimo estrutural de 14 px;
- tokens de cor, spacing e radius;
- BaseCard;
- Button/Input/Select/Textarea via primitives locais/Obra;
- wrappers de interação de 48 px;
- feedbacks;
- `STATE = PAGE BASE + DELTA MÍNIMO`.

## Direção Material Design 3

Material Design 3 é referência de **UX e interação**, não kit de componentes do projeto.

Regra:

`Material 3 UX principles → Obra/shadcn/local primitives → identidade Rede de Apoio`

Aplicar Material 3 para decidir:

- função e hierarquia de Top App Bar;
- separação entre navegação primária e secundária;
- quantidade e peso dos destinos na Navigation Bar;
- estado selecionado;
- touch targets;
- ergonomia e prevenção de acionamento acidental.

Não usar:

- SDK Material;
- Google Sans;
- paleta Google;
- componentes Material importados apenas para copiar aparência Android.

## Header TARGET

### AppHeader / Root

Deve conter:

- título da página como informação primária;
- contexto da Pessoa Idosa como informação secundária quando aplicável;
- ação global deliberada de Configurações à direita;
- target >= 48 × 48 px para cada ação;
- padding/safe area que evite ação colada na borda física.

O avatar pode continuar existindo, mas não deve ser o único conteúdo do cabeçalho.

### AppHeader / Back

Deve conter:

- voltar com target >= 48 × 48 px;
- título explícito;
- contexto secundário quando realmente necessário;
- ação opcional apenas quando funcionalmente autorizada.

## Navigation Bar TARGET

Destinos primários:

`Home · Agenda · Diário · Saúde`

Regras:

- `Mais` não pertence ao TARGET;
- Configurações não deve ocupar um quinto slot;
- cada item usa ícone + label;
- item ativo usa indicador/surface além da cor;
- targets >= 48 × 48 px;
- itens distribuídos de forma equilibrada;
- respeitar safe area inferior.

## Settings / Management Sheet

A ação Configurações do `AppHeader / Root` deve abrir uma superfície secundária baseada em `Sheet` local/Obra/shadcn quando possível.

Organizar destinos existentes:

- T12 Pessoa Idosa;
- T13 Rede de Cuidado;
- T14 Contatos;
- T15 Emergência;
- T16 Preferências;
- T17 Auditoria.

Não criar funcionalidade nova nem inferir permissão a partir da presença do item no Sheet.

## Gate temporário de migração

Até a próxima revisão da `Design Foundation`:

- `T06 / Header / Pessoa` como referência global = `DEPRECATED_FOR_NEW_MIGRATIONS`;
- `compFooter`/BottomNavigation atual de cinco itens = `DEPRECATED_FOR_NEW_MIGRATIONS`;
- nenhuma tela autenticada deve usar esses dois padrões antigos como TARGET;
- a próxima mutação no Figma deve ocorrer na própria Foundation;
- T03 somente deve ser migrada depois que o novo `AppShell / Root` estiver materializado.

## Regras permanentes

- distinguir a altura visual da primitive Obra do alvo interativo: `Button - Nova / Default` é visualmente 32 px e `Input - Nova`/`Select - Nova / Large` são visualmente 36 px; usar as composições foundation de 48 px sem alterar o component set original;
- usar instances de primitives locais antes de criar equivalentes;
- manter a foundation isolada de David, Rhuan, Henrique, Kauã, `prototypeIA`, `siteMap` e `LEGADO —`;
- a existência da foundation não resolve P01, P03–P06, RF30/US-036 ou qualquer FI-###.
