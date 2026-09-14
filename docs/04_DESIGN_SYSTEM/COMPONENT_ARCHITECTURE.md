# Component Architecture

## Princípio

Componentes devem nascer de necessidades reais do domínio.

Regra:

`Material 3 UX principles → shadcn/Obra primitives → componentes Rede de Apoio`

Material 3 orienta **uso e hierarquia de UX**. shadcn/Obra continuam fornecendo primitives. Rede de Apoio fornece composição visual, identidade e componentes de negócio.

## Primitives shadcn/Obra

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

## Componentes globais TARGET

### AppHeader / Root

Cabeçalho global das páginas autenticadas de nível raiz.

Responsabilidades:

- mostrar o título da página como informação principal;
- mostrar contexto da Pessoa Idosa de forma secundária quando aplicável;
- oferecer ação global deliberada de Configurações;
- manter targets >= 48 × 48 px;
- preservar padding/safe area nas bordas.

O padrão antigo `T06 / Header / Pessoa` continua existindo como CURRENT, mas está `DEPRECATED_FOR_NEW_MIGRATIONS` como referência global.

### AppHeader / Back

Cabeçalho de subpágina.

Responsabilidades:

- ação voltar com target >= 48 × 48 px;
- título explícito;
- contexto secundário apenas quando ajuda orientação;
- ação adicional apenas quando autorizada e necessária.

### NavigationBar / Primary

Navegação primária mobile TARGET:

`Home · Agenda · Diário · Saúde`

Regras:

- quatro destinos primários de importância equivalente;
- cada item representa um destino singular;
- `Mais` não pertence ao TARGET;
- ícone + label sempre;
- estado ativo usa indicador/surface além da cor;
- targets >= 48 × 48 px;
- distribuição equilibrada e safe area.

O `compFooter` atual de cinco destinos continua CURRENT, porém está `DEPRECATED_FOR_NEW_MIGRATIONS`.

### LocalSubnav / Tabs

Navegação local para destinos irmãos dentro da seção primária ativa.

Exemplo Saúde:

`Medicamentos · Tarefas · Consultas · Compromissos`

Responsabilidades:

- ficar imediatamente abaixo do AppHeader e acima do conteúdo rolável;
- não competir espacialmente com a NavigationBar inferior;
- usar linguagem de Material 3 Tabs, com indicador inferior e estado selecionado não dependente somente de cor;
- usar `PrimaryTabRow` quando os labels couberem confortavelmente e comportamento equivalente a `PrimaryScrollableTabRow` quando não couberem;
- preservar target vertical >=48 px;
- recolher no scroll para baixo e retornar no scroll para cima conforme a adaptação Rede de Apoio do comportamento M3 `enterAlways`;
- manter seleção e posição horizontal do strip quando escondido/reexibido.

`LocalSubnav` não é filtro, chip, ordenação ou controle de modo de visualização. `Dia / Semana` da T04, por exemplo, continua sendo view-mode control.

Contrato completo: `LOCAL_SUBNAVIGATION_PATTERN.md`.

#### Foundation promovida — Saúde

O padrão T09/T11 foi aprovado humanamente e o PR #95 foi mergeado. A implementação reutilizável está promovida para Foundation:

- component set: `Rede de Apoio / Foundation / LocalSubnav / Saúde` (`5810:1005`);
- `Active=Medicamentos` (`5810:968`);
- `Active=Tarefas` (`5810:980`);
- `Active=Consultas` (`5810:992`);
- `Active=Compromissos` (`5810:1004`);
- shell example: `AppShell / Root + LocalSubnav / Saúde — Example` (`5811:986`).

Regra de reuse: em telas Saúde com essa taxonomia, instanciar `5810:1005` e mudar somente `Active`. Não duplicar, redesenhar ou detachar a barra apenas para trocar a seleção.

O hide-on-down / reveal-on-up pertence ao shell/runtime. Não criar variante `Expanded/Collapsed` e não modelar essa condição transitória como estado da página.

### Settings / Management Sheet

Superfície secundária acionada por `Configurações` no `AppHeader / Root`.

Base preferencial: primitive `Sheet` local/Obra/shadcn.

Organiza destinos existentes de gestão/configuração:

- T12 Pessoa Idosa;
- T13 Rede de Cuidado;
- T14 Contatos Importantes;
- T15 Informações de Emergência;
- T16 Preferências;
- T17 Auditoria.

Não cria funcionalidade, permissão ou requisito. Apenas reorganiza a superfície de acesso.

## Componentes de domínio

### ShiftCard
Representa plantões. Origem: RF06-RF10.

### CareRecordCard
Representa registros de cuidado. Origem: RF11-RF12.

### MedicationCard
Representa medicamentos e administração. Origem: RF14-RF17.

### TaskCard
Representa tarefas de cuidado. Origem: RF21.

### AppointmentCard
Representa consultas e compromissos. Origem: RF19-RF20.

### EmergencyContactCard
Representa contatos importantes e emergência. Origem: RF22-RF24.

### AuditEntryCard
Representa eventos de auditoria. Origem: RF29/RNF03.

### AccessStatusCard
Representa estado de acesso/permissão. Status: componente controlado enquanto RF30 estiver em formalização.

## Regra

Nenhuma tela deve criar um card isolado sem avaliar reutilização no domínio.

## Foundation canônica — migração gradual

A página Figma `Design Foundation` materializa a base para futuras refatorações. Ela não representa migração concluída de T01–T17.

### Componentes foundation válidos

- `Rede de Apoio / Foundation / BaseCard` (`5640:21509`).
- `Rede de Apoio / Foundation / Action / Touch Target 48` (`5644:324`).
- `Rede de Apoio / Foundation / Field / Control / Touch Target 48` (`5644:330`).
- `Rede de Apoio / Foundation / AppHeader / Root / Tinted` (`5746:157`).
- `Rede de Apoio / Foundation / AppHeader / Back` (`5640:21512`).
- `Rede de Apoio / Foundation / NavigationBar / Primary` (`5652:442`).
- `Rede de Apoio / Foundation / LocalSubnav / Saúde` (`5810:1005`).
- `Rede de Apoio / Foundation / Settings / Management Sheet` (`5652:443`).
- `Rede de Apoio / Foundation / Settings / Destination Row` (`5662:21869`).
- `Rede de Apoio / Foundation / AppShell / Root` (`5652:528`) e `AppShell / Back` (`5652:560`).
- exemplo de composição `AppShell / Root + LocalSubnav / Saúde` (`5811:986`).

### Referências deprecated

- `AppHeader / Contextual` baseado em `T06 / Header / Pessoa` (`5201:13483`): `DEPRECATED_FOR_NEW_MIGRATIONS`.
- `BottomNavigation` baseado em `compFooter` (`5116:13047`): `DEPRECATED_FOR_NEW_MIGRATIONS`.

### Shells alvo revisados

- `AuthShell`: autenticação sem Navigation Bar.
- `AppShell / Root` sem navegação local: `AppHeader / Root → scroll content → NavigationBar / Primary`.
- `AppShell / Root + LocalSubnav`: `AppHeader / Root → LocalSubnav / Tabs → scroll content → NavigationBar / Primary`.
- `AppShell / Back`: `AppHeader / Back → scroll content → NavigationBar` somente quando a hierarquia justificar persistência da seção primária.
- `Settings Overlay`: acionado pelo `AppHeader / Root` e organizado via Sheet.

A NavigationBar inferior permanece fixa no contrato visual e não se move para acomodar LocalSubnav.

O campo reutilizável é a composição `label + hint + control + error`. Input e Select usam `Field / Control / Touch Target 48`; textarea mantém altura visual superior a 48 px. Validation Error é estado do controle e da página-base, nunca uma tela estruturalmente independente.

## Gate de migração

Padrões já aprovados de Foundation devem ser reutilizados em micro-lotes coerentes. `LocalSubnav / Saúde` já passou pelo piloto T09/T11 e está promovido: novas telas com a mesma taxonomia devem reutilizar `5810:1005` em vez de criar variações concorrentes.

Novos padrões compartilhados diferentes deste continuam seguindo o fluxo: piloto → revisão humana → promoção para Foundation.
