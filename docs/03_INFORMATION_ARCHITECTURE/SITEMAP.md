# Site Map Consolidado

## Pré autenticação
- T01 Login
- T02 Cadastro de Conta

## Área autenticada

T03 Home

├── Agenda e Plantões
│   ├── T04 Calendário de Cuidados
│   └── T05 Detalhamento do Dia
│
├── Registros de Cuidado
│   ├── T06 Diário de Cuidados
│   │   └╌╌ Novo Registro (sub-tela navegada)
│   └── T07 Histórico
│
├── Rotina e Saúde
│   ├── T08 Medicamentos
│   ├── T09 Tarefas
│   ├── T10 Consultas e Recomendações
│   └── T11 Compromissos
│
├── Rede e Apoio
│   ├── T12 Perfil da Pessoa Idosa
│   ├── T13 Rede de Cuidado
│   ├── T14 Contatos Importantes
│   └── T15 Informações de Emergência
│
└── Controle e Privacidade
    ├── T16 Preferências
    └── T17 Auditoria

## Sub-telas

Sub-tela navegada tem page base própria e entra no Site Map com linha tracejada.
Não é estado. Estado altera a página base; sub-tela substitui a página base.

| Sub-tela | Origem | Base própria |
|---|---|---|
| T06 › Novo Registro | RF11 | TopAppBar com voltar + área de ações fixa |

## Regra
Estados não são novas telas. São variações da página base.
STATE = PAGE BASE + DELTA MÍNIMO.
