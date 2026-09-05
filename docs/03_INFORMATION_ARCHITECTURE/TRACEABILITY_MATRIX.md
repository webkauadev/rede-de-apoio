# Matriz de Rastreabilidade

Objetivo:

Manter a cadeia oficial:

RF → US → Tela → Estado → Componente

> ⚠️ **Cobertura parcial: 9 de 30 RF e 9 de 17 telas.**
> Os RF e telas sem linha estão listados em
> `../01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md` (P08, P09).
> Nenhuma US citada abaixo possui texto no repositório (P01).

## Linhas consolidadas

| RF | US | Tela | Estado | Componente |
|---|---|---|---|---|
| RF01 | US-001 | T02 Cadastro | Default/Validation | Input, Button |
| RF02 | US-002 | T01 Login | Default/Error/Loading | Input, Button, Card |
| RF06 | US-008 | T04 Calendário | Lista/Criação | Calendar, ShiftCard |
| RF07 | US-009 | T04/T05 | Dia/Semana/Detalhe | Calendar, CareRecordCard |
| RF11 | US-015 | T06 Diário | Default/Loading/Empty/Error/Success | CareRecordCard |
| RF11 | US-015 | T06 › Novo Registro (sub-tela) | Default/Validation Error | Select, Textarea, DatePicker, Button |
| RF14 | US-017 | T08 Medicamentos | Cadastro/Consulta | MedicationCard |
| RF21 | US-024 | T09 Tarefas | Criar/Concluir | TaskCard |
| RF22 | US-026 | T14 Contatos | Lista/Edição | EmergencyContactCard |
| RF29 | US-033 | T17 Auditoria | Consulta | AuditEntryCard |
| RNF01 ⚠️ *inexistente (P02)* | US-035 | T17/Todas | Acesso negado | AccessStatusCard |

> Correção aplicada: `Field`, `AuthCard` e `DayDetail` foram removidos.
> Não existiam no Design System e duplicavam `Input`, `Card` e `CareRecordCard`.

## Regras

- Nenhuma tela deve existir sem origem funcional ou justificativa documentada.
- Nenhum componente de domínio deve existir sem uso rastreável.
- Estados devem ser derivados da página base usando STATE = PAGE BASE + DELTA MÍNIMO.
