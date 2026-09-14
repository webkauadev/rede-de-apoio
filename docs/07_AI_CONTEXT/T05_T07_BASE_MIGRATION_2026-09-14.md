# T05 + T07 — Base Material 3 Migration

Status: **BASE STATES MATERIALIZED — PENDING HUMAN VISUAL REVIEW**  
Data: **2026-09-14**  
Branch: `design/t05-t07-material3-migration`

## Escopo

Este registro cobre somente os estados-base de T05 e T07. Nenhum estado restante deve ser propagado antes da revisão humana destes dois baselines.

## T05 — Detalhamento do Dia

CURRENT:
- `5344:1413`

MIGRATED DEFAULT:
- `5815:1652`

Arquitetura aplicada:

`AppHeader / Back → Scroll Content → NavigationBar / Primary (Agenda)`

Decisões:
- usa `AppHeader / Back` canônico porque T05 é filha de T04 na seção Agenda;
- `Detalhamento do Dia` fica somente no header;
- o antigo CTA textual `‹ Calendário` no fim do conteúdo não é repetido na composição migrada, evitando redundância com a ação Voltar do header;
- NavigationBar global permanece visível com `Agenda` ativa;
- a navegação temporal do próprio dia continua sendo controle contextual, não LocalSubnav;
- `Feature/Agenda/*`, `Category/*` e `Status/*` seguem a gramática cromática aprovada;
- `Plantonista atual` continua sendo condição operacional, não role/perfil nem status de sucesso.

Escopo funcional preservado: `RF07`, `US-010`; demais stories do contexto não autorizam expansão funcional.

## T07 — Histórico de Cuidados

CURRENT:
- `5334:756`

MIGRATED DEFAULT:
- `5815:1770`

LOCAL SUBNAV PILOT — Diário:
- `5815:1780`

Arquitetura aplicada:

`AppHeader / Root / Tinted → LocalSubnav Diário/Histórico → Scroll Content → NavigationBar / Primary (Diário)`

Decisões:
- `Diário · Histórico` é navegação entre destinos irmãos da seção Diário, portanto sai do fim do conteúdo e passa para imediatamente abaixo do header;
- por caber confortavelmente em 390 px, este piloto usa tabs fixas de duas opções, não scrollable tabs;
- `Histórico` é o destino ativo;
- a família `Feature/Diary/*` identifica a seção; `Category/Medication/*` identifica Medicação;
- `Corrigido` permanece visualmente neutro nesta fase porque ainda não existe família canônica `Status/Corrected`; não reutilizar Warning/Pending nem Feature/Diary como se fossem status;
- exportação CSV permanece visualmente presente apenas porque já existe no baseline CURRENT; permissões continuam bloqueadas por P05;
- ação Corrigir permanece visualmente presente no baseline, mas permissão de escrita continua bloqueada por P03.

Escopo funcional preservado: `RF12`, `RF28`, `RNF02`, `US-016`, `US-032`, `US-034`.

## Gates preservados

- P03 — permissões de escrita/correção continuam abertas;
- P05 — permissão de exportação CSV continua aberta;
- nenhum desses pontos foi resolvido por design.

## Review

Board comparativo:
- `5822:1787` — `T05 + T07 — Material 3 Base Migration Review (NON-CANONICAL)`

Critério para seguir:
1. revisão humana dos dois baselines;
2. se aprovados, derivar os demais estados com `STATE = PAGE BASE + DELTA MÍNIMO`;
3. T07 poderá então promover um `LocalSubnav / Diário` reutilizável, se a revisão humana confirmar o padrão;
4. não mergear a branch antes da revisão dos estados-base e dos estados derivados.

## Proteções

Não tocar por inferência em P03, P05, RF30/US-036 ou FI-001–FI-008.
