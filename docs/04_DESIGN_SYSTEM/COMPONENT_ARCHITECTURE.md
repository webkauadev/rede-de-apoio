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
