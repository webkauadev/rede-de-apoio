# Component Architecture

## Princípio

Componentes devem nascer de necessidades reais do domínio.

Regra:

shadcn/ui fornece primitives.
Rede de Apoio fornece componentes de negócio.

## Primitives shadcn

- Button
- Input
- Card
- Badge
- Avatar
- Switch
- Dialog
- Sheet
- Calendar
- Toast
- Separator

## Componentes de domínio

### AppTopBar
Cabeçalho global autenticado.

### BottomNavigation
Navegação principal:
Home, Agenda, Diário, Saúde, Mais.

### ShiftCard
Representa plantões.
Origem:
RF06-RF10.

### CareRecordCard
Representa registros de cuidado.
Origem:
RF11-RF12.

### MedicationCard
Representa medicamentos e administração.
Origem:
RF14-RF17.

### TaskCard
Representa tarefas de cuidado.
Origem:
RF21.

### AppointmentCard
Representa consultas e compromissos.
Origem:
RF19-RF20.

### EmergencyContactCard
Representa contatos importantes e emergência.
Origem:
RF22-RF24.

### AuditEntryCard
Representa eventos de auditoria.
Origem:
RF29/RNF03.

### AccessStatusCard
Representa estado de acesso/permissão.
Status: componente controlado enquanto RF30 estiver em formalização.

## Regra

Nenhuma tela deve criar um card isolado sem avaliar reutilização no domínio.

## Foundation canônica — migração gradual

A página Figma `Design Foundation` materializa a base para futuras refatorações. Ela não representa migração concluída de T01–T17.

### Componentes foundation

- `Rede de Apoio / Foundation / BaseCard` (`5640:21509`): infraestrutura visual de superfície, padding 16, radius 12 e hierarquia vertical. Cards de domínio continuam semânticos e independentes.
- `Rede de Apoio / Foundation / AppHeader / Back` (`5640:21512`): header de 64 px com voltar em alvo de 48 px, título e espaço para ação secundária autorizada.
- `AppHeader / Contextual`: usa como referência a instância local aprovada `T06 / Header / Pessoa` (`5201:13483`) até sua promoção formal.
- `BottomNavigation`: reutiliza `compFooter` (`5116:13047`) com a única variante permitida por item ativo.

### Shells alvo

- `AuthShell`: autenticação sem navegação inferior.
- `AppShell / Contextual`: header de pessoa 80 px, conteúdo rolável e bottom navigation 80 px.
- `AppShell / Back`: header de 64 px; bottom navigation somente quando a arquitetura vigente da tela exigir.

O campo reutilizável é a composição `label + hint + control + error`. Validation Error é estado do controle e da página-base, nunca uma tela estruturalmente independente.
