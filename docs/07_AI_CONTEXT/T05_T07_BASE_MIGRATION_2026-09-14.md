# T05 + T07 — Material 3 Migration

Status: **BASELINES HUMAN-APPROVED — FULL STATE SET MATERIALIZED AND AUDITED — PENDING FINAL HUMAN REVIEW / PR MERGE**  
Data: **2026-09-14**  
Branch: `design/t05-t07-material3-migration`

## Escopo

Este registro cobre a migração visual completa dos estados atualmente registrados de T05 e T07 para a arquitetura Material 3 / Rede de Apoio.

A migração foi executada após aprovação humana dos baselines. Os estados derivados seguem:

`STATE = PAGE BASE + DELTA MÍNIMO`

Nenhuma permissão pendente foi resolvida por design e nenhuma funcionalidade nova foi inventada.

## T05 — Detalhamento do Dia

### CURRENT anterior

- Default: `5344:1413`
- Empty: `5346:1256`
- Loading: `5346:1403`
- Atraso: `5346:1504`
- Corrigido: `5346:1592`
- Detalhe: `5346:1686`

### MIGRATED

- Default: `5815:1652`
- Empty: `5837:341`
- Loading: `5838:438`
- Atraso: `5839:559`
- Corrigido: `5841:469`
- Detalhe: `5841:25983`

### Arquitetura

`AppHeader / Back → Scroll Content → NavigationBar / Primary (Agenda)`

Todos os estados preservam o mesmo shell:

- AppHeader Back: `64 px`;
- região rolável: `700 px`;
- NavigationBar: `80 px`;
- viewport: `390 × 844`.

### Decisões preservadas

- T05 é filha de T04 na seção Agenda e usa `AppHeader / Back` canônico;
- `Detalhamento do Dia` fica somente no header;
- o antigo CTA textual `‹ Calendário` no fim do conteúdo não é repetido;
- NavigationBar global permanece com `Agenda` ativa;
- navegação temporal da data é controle contextual, não LocalSubnav;
- `Plantonista atual` continua sendo condição operacional, não role/perfil nem status de sucesso;
- conteúdo funcional existente foi preservado por estado.

Escopo funcional preservado: `RF07`, `US-010`. Context stories não autorizam expansão funcional.

## T05 — deltas de estado

### Empty

Página-base + estado vazio existente. Shell permanece idêntico ao Default.

### Loading

Página-base + skeletons. Nenhum shell é duplicado ou redesenhado.

### Atraso

Página-base + evento afetado em atraso.

Gramática:

- Category `Medicação` continua `Category/Medication/*`;
- badge `Atrasado` usa `Status/Delayed/*`;
- atraso usa Warning tonal, não `Destructive`/Danger.

### Corrigido

Página-base + Care Record corrigido/vinculado.

`Corrigido` usa `Status/Corrected/*`, semanticamente neutro.

### Detalhe

Página-base + delta aprovado:

- título `Detalhe do registro`;
- registro de sintoma;
- nota contextual.

O primeiro frame migrado de Detalhe ainda continha conteúdo de Default; isso foi detectado na inspeção e corrigido antes da auditoria final.

## T07 — Histórico de Cuidados

### CURRENT anterior

- Default: `5334:756`
- Empty: `5335:831`
- Loading: `5335:948`
- Detalhe: `5336:895`
- Correção: `5336:977`
- Correção concluída: `5337:15296`
- Exportando: `5337:15310`
- Exportação concluída: `5337:15330`

### MIGRATED

- Default: `5815:1770`
- Empty: `5844:568`
- Loading: `5844:26005`
- Detalhe: `5844:26067`
- Correção: `5844:26149`
- Correção concluída: `5844:26238`
- Exportando: `5844:26343`
- Exportação concluída: `5844:26446`

### Arquitetura

`AppHeader / Root / Tinted → LocalSubnav Diário/Histórico → Scroll Content → NavigationBar / Primary (Diário)`

Todos os estados preservam o mesmo shell:

- Root Header: `80 px`;
- LocalSubnav: `56 px`;
- região rolável: `628 px`;
- NavigationBar: `80 px`;
- viewport: `390 × 844`.

## LocalSubnav Diário — promovida para Foundation

O antigo piloto local foi substituído por um master reutilizável.

Component set:

- `5830:358` — `Rede de Apoio / Foundation / LocalSubnav / Diário`

Variants:

- `5830:357` — `Active=Diário`
- `5830:348` — `Active=Histórico`

T07 usa `Active=Histórico` em todos os estados migrados.

Contrato:

- `390 × 56`;
- duas fixed tabs de largura equivalente;
- item ativo usa `Feature/Diary/Foreground` + indicador `Feature/Diary/Accent`;
- item inativo usa `Color/On Surface Variant`;
- hide-on-down / reveal-on-up pertence ao shell/runtime, não a variantes do componente;
- posição não muda entre Default/Empty/Loading/Form/Success.

A regra geral está em `docs/04_DESIGN_SYSTEM/LOCAL_SUBNAVIGATION_PATTERN.md`.

## Care Record — reuse semântico

O `Care Record Card` local (`5204:318`) foi validado e reutilizado em T05/T07.

Contrato aplicado:

- superfície neutra: `Color/Surface`;
- borda: `Color/Border Subtle`;
- Category: família do assunto do cuidado;
- Medicação: sempre `Category/Medication/*`;
- registro substituído/corrigido: `Status/Corrected/*`;
- Feature Diary só identifica origem/contexto ou vínculos, nunca substitui Category/Status.

Durante a derivação, clones antigos preservaram overrides que faziam `Medicação` voltar verde e `Corrigido` voltar âmbar. A regressão foi detectada por screenshot e eliminada substituindo os cards derivados por instâncias clonadas do Care Record canônico já normalizado.

Instâncias canônicas derivadas relevantes:

- T07 Detalhe: `5846:26400`;
- T07 Correção / registro preservado: `5846:26421`;
- T07 Correção concluída: `5846:26441`, `5846:26462`;
- T07 Exportando: `5846:26482`, `5846:26503`;
- T07 Exportação concluída: `5846:26523`, `5846:26544`.

## Status semânticos adicionados

Sem criação de paleta bruta nova:

- `Status/Delayed/Container` — `VariableID:5835:341` → Warning Surface;
- `Status/Delayed/Foreground` — `VariableID:5835:342` → Warning;
- `Status/Corrected/Container` — `VariableID:5835:343` → Surface Container;
- `Status/Corrected/Foreground` — `VariableID:5835:344` → On Surface Variant.

Regras:

- Atrasado ≠ destructive;
- Corrigido ≠ pending/warning;
- Corrigido ≠ completed/success;
- Category e Status permanecem eixos independentes.

## Exportação CSV

O mesmo primitive `E13 — Exportar histórico em CSV` é preservado.

Todas as instâncias migradas foram normalizadas para:

- fill `Color/Surface`;
- stroke `Color/Border Subtle`.

`Exportando` altera somente o delta funcional visual já existente: `Show spinner=true`.

Isso não resolve P05.

## Feedbacks

Sonner permanece overlay e não altera o fluxo do shell:

- Correção concluída: `5844:26340`;
- Exportação concluída: `5844:26548`.

Ambos estão posicionados como overlays absolutos sobre o conteúdo, sem empurrar LocalSubnav ou NavigationBar.

## Tipografia

Piso estrutural da Foundation: `14 px / 20 px`.

Foram normalizados para 14/20 os últimos textos herdados a 12 px:

- contexto temporal em Detalhe;
- nota RNF/RF13 em Correção;
- contadores `2 registros` em estados de sucesso/exportação.

Nenhum texto estrutural <14 px permanece no conjunto migrado.

## Semantic scopes

Sete roles Material 3 antigas ainda estavam com `ALL_SCOPES`. Foram normalizadas para scopes compatíveis com seu uso, sem alterar valores resolvidos:

- `Color/On Surface`;
- `Color/On Surface Variant`;
- `Color/Secondary Container`;
- `Color/On Secondary Container`;
- `Color/Surface Container`;
- `Color/Surface Container Low`;
- `Color/Scrim`.

## Gates funcionais preservados

- P03 — permissões de escrita/correção continuam abertas;
- P05 — permissão de exportação CSV continua aberta;
- os estados visuais existentes não definem quem pode executar a ação;
- RF30/US-036 não foram tocados;
- FI-001–FI-008 não foram reinterpretados como requisito.

## Auditoria final Figma

Roots auditados: 14 estados migrados T05/T07.

Resultado final automático:

- missing: `0`;
- legacy shell remnants: `0`;
- unbound semantic colors fora de componentes externos: `0`;
- structural text abaixo de 14 px: `0`;
- shell height/order violations: `0`;
- LocalSubnav master/Active violations: `0`.

Screenshots representativos revisados após as correções:

- T05 Atraso;
- T05 Corrigido;
- T05 Detalhe;
- T07 Empty;
- T07 Loading;
- T07 Correção;
- T07 Exportação concluída.

A inspeção visual final confirma:

- Agenda mantém índigo;
- Diário mantém plum;
- Medicação mantém violeta;
- Atrasado usa warning tonal;
- Corrigido permanece neutro;
- surfaces/borders equivalentes não divergem entre estados.

## Review

Board comparativo existente:

- `5822:1787` — `T05 + T07 — Material 3 Base Migration Review (NON-CANONICAL)`.

Os baselines foram aprovados humanamente. O conjunto completo derivado está agora pronto para revisão humana final antes do merge do PR.

## Proteções

- Não mergear automaticamente.
- Não resolver P03/P05 pelo design.
- Não mudar requisito para justificar o visual.
- Não redesenhar outra T## dentro deste PR.
- Não inferir prototype wiring como requisito.
