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

## Arquitetura de navegação TARGET — revisão Material 3

A árvore funcional T01–T17 acima não muda. O que muda é **como as áreas são expostas na navegação do protótipo**.

### Navegação primária mobile

TARGET:

`Home · Agenda · Diário · Saúde`

- Home usa T03 como referência de entrada.
- Agenda representa a seção de agenda/calendário; T04 é a referência atual dessa seção.
- Diário usa T06 como referência de entrada.
- Saúde representa a seção de saúde; T08/T10 são telas irmãs atuais dentro dessa área.
- `Mais` não pertence mais ao TARGET de navegação primária.

O mapeamento final de prototype wiring deve ser validado contra os frames atuais antes de qualquer mutação; esta seção define hierarquia visual/IA, não cria requisito funcional.

### Navegação secundária — Configurações e gestão

T12–T17 continuam no Site Map, porém deixam de depender de `Mais` como entrada global.

TARGET:

`AppHeader / Root → Configurações → Settings / Management Sheet`

Destinos organizados no Sheet:

- T12 Perfil da Pessoa Idosa
- T13 Rede de Cuidado
- T14 Contatos Importantes
- T15 Informações de Emergência
- T16 Preferências
- T17 Auditoria

Essa alteração muda a superfície de acesso e a hierarquia de navegação, não o escopo funcional das telas.

### Headers alvo

- `AppHeader / Root`: título da página + contexto da Pessoa Idosa quando aplicável + ação global de Configurações.
- `AppHeader / Back`: voltar + título explícito + contexto/ação opcional quando necessário e autorizado.

## Regra

Estados não são novas telas. São variações da página base.

`STATE = PAGE BASE + DELTA MÍNIMO`.

Material 3 orienta a lógica de UX; Obra/shadcn e componentes locais continuam sendo a implementação visual do projeto.
