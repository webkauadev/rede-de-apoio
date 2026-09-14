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

O componente foundation atual deve ser revisado na próxima etapa para ficar coerente com essa arquitetura.

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

O `compFooter` atual de cinco destinos continua CURRENT, porém está `DEPRECATED_FOR_NEW_MIGRATIONS` até ser normalizado.

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

### Componentes foundation válidos

- `Rede de Apoio / Foundation / BaseCard` (`5640:21509`): infraestrutura visual de superfície, padding 16, radius 12 e hierarquia vertical. Cards de domínio continuam semânticos e independentes.
- `Rede de Apoio / Foundation / Action / Touch Target 48` (`5644:324`): composição local de acessibilidade que centraliza uma instance `Button - Nova` Obra/shadcn em 48 px de altura. A primitive continua com sua altura visual nativa.
- `Rede de Apoio / Foundation / Field / Control / Touch Target 48` (`5644:330`): composição local que centraliza `Input - Nova` ou `Select - Nova` em área de 48 px. A primitive continua visualmente com 36 px em Large; textarea já possui altura superior ao mínimo.

### Componentes foundation materializados — revisão Material 3

- `Rede de Apoio / Foundation / AppHeader / Root` (`5652:350`): 390 × 80 px; `Title`, `Context`, `Show avatar`, `Show settings` e swap de Avatar. Usa Avatar Obra `1953:32196`.
- `Rede de Apoio / Foundation / AppHeader / Back` (`5640:21512`): revisado para 390 × 64 px; voltar, título explícito e ação secundária opcional, ambos em targets de 48 px.
- `Rede de Apoio / Foundation / NavigationBar / Primary` (`5652:442`): component set com `Active=Home|Agenda|Diário|Saúde`; quatro itens de 89,5 × 64 px, ícone de 24 px, label de 14 px e indicador de surface para seleção.
- `Rede de Apoio / Foundation / Settings / Management Sheet` (`5652:443`): 358 × 700 px, lateral à direita, composta por instance Obra Sheet `Scrollable=True` via Slot (`5662:21924`), sem detach.
- `Rede de Apoio / Foundation / Settings / Destination Row` (`5662:21869`): 326 × 56 px, com `Label`, swap de leading icon e `Show chevron`; as seis rows da Sheet são instances.
- `Rede de Apoio / Foundation / AppShell / Root` (`5652:528`) e `AppShell / Back` (`5652:560`): referências estruturais de 390 × 700 px. `AppShell / Root / Settings Open` (`5652:592`) demonstra apenas a sobreposição visual.

### Referências deprecated
- `AppHeader / Contextual` baseado em `T06 / Header / Pessoa` (`5201:13483`): `DEPRECATED_FOR_NEW_MIGRATIONS` como header global.
- `BottomNavigation` baseado em `compFooter` (`5116:13047`): `DEPRECATED_FOR_NEW_MIGRATIONS` por conter `Mais` e arquitetura de cinco itens não alinhada ao TARGET atual.

Não propagar os componentes materializados para uma T## antes da revisão humana do PR desta Foundation.

### Shells alvo revisados

- `AuthShell`: autenticação sem Navigation Bar.
- `AppShell / Root`: `AppHeader / Root + scroll content + NavigationBar / Primary`.
- `AppShell / Back`: `AppHeader / Back + scroll content + NavigationBar` somente quando a hierarquia atual justificar persistência da seção primária.
- `Settings Overlay`: acionado pelo `AppHeader / Root` e organizado via Sheet.

O campo reutilizável é a composição `label + hint + control + error`. Input e Select usam `Field / Control / Touch Target 48`; textarea mantém altura visual superior a 48 px. Validation Error é estado do controle e da página-base, nunca uma tela estruturalmente independente.

## Gate de migração

Até a revisão humana do PR desta Foundation, nenhuma tela autenticada deve receber os componentes TARGET. `T06 / Header / Pessoa` e `compFooter` atual continuam `DEPRECATED_FOR_NEW_MIGRATIONS`.
