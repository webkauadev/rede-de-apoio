# Matriz de Rastreabilidade Completa

Objetivo:

Manter a cadeia oficial:

RF → US → Tela → Estado → Componente

## Exemplos consolidados

| RF | US | Tela | Estado | Componente |
|---|---|---|---|---|
| RF01 | US001 | T02 Cadastro | Default/Validation | Input, Button, Field |
| RF02 | US002 | T01 Login | Default/Error/Loading | Input, Button, AuthCard |
| RF06 | US008 | T04 Calendário | Lista/Criação | Calendar, ShiftCard |
| RF07 | US009 | T04/T05 | Dia/Semana/Detalhe | Calendar, DayDetail |
| RF11 | US015 | T06 Diário | Novo registro/Timeline | CareRecordCard |
| RF14 | US017 | T08 Medicamentos | Cadastro/Consulta | MedicationCard |
| RF21 | US024 | T09 Tarefas | Criar/Concluir | TaskCard |
| RF22 | US026 | T14 Contatos | Lista/Edição | EmergencyContactCard |
| RF29 | US033 | T17 Auditoria | Consulta | AuditEntryCard |
| RNF01 | US035 | T17/Todas | Acesso negado | AccessStatusCard |

## Regras

- Nenhuma tela deve existir sem origem funcional ou justificativa documentada.
- Nenhum componente de domínio deve existir sem uso rastreável.
- Estados devem ser derivados da página base usando STATE = PAGE BASE + DELTA MÍNIMO.
