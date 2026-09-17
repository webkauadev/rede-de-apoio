# Milestone Status — Rede de Apoio a Cuidadores de Idosos

Data desta consolidação: **2026-09-16**.
Auditoria anterior mais recente: 2026-09-15 (`docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md`).

Este documento é uma fotografia point-in-time. Para o estado vivo, sempre preferir o GitHub (`gh issue`/`gh pr`) e os registries em `docs/`. Ver `DELIVERY_EVIDENCE.md` para o mapeamento afirmação → evidência e `METRICS_SNAPSHOT.md` para números com fonte/data/limitação.

## Escopo

- **RF:** RF01–RF30, todos canônicos (Issues #5–#34).
- **RNF:** RNF01, RNF02, RNF03 (Issues #35, #82, #36).
- **US:** US-001–US-036 (Issues #37–#72), todas com conteúdo `complete` em `USER_STORIES_INDEX.yaml`.
- **Telas:** T01–T17, todas `canonical_in_fluxo_final` em `FIGMA_REGISTRY.yaml`.

## T01–T17

Mapeadas em `docs/03_INFORMATION_ARCHITECTURE/SCREENS_CATALOG.md` (reescrito nesta auditoria) contra a página `Fluxo Final` (`5926:1014`, file `tcyj2fkTXei2CJbqaRxqCp`). Owners:

| Owner | Telas | US (36 no total) |
|---|---|---|
| David | T01, T02, T12, T13, T14, T15 | 10 (US-001–007, US-026, US-028, US-036) |
| Rhuan | T03, T04, T09, T11 | 9 (US-008, US-009, US-011–014, US-023–025) |
| Henrique | T05, T07, T08, T10 | 9 (US-010, US-016–022, US-027) |
| Kauã | T06, T16, T17 | 8 (US-015, US-029–035) |

## Figma

- Página canônica: `Fluxo Final` (`5926:1014`).
- Sections confirmadas ao vivo via Figma MCP em 2026-09-16: `MAIN FLOW` (`5926:1015`), `STATE FLOWS — APPROVED MIGRATED STATES` (`5926:32075`), `OVERLAYS — CANONICAL` (`5932:4923`), `PESSOA IDOSA — READ ONLY` (`5948:5316`), `PILOTO — BOTTOM SHEET T08` (`5959:6208`), `Propagation Review (NON-CANONICAL)` (`5976:7063`).
- Design Foundation (`5639:21448`): componentes TARGET (`AppHeader/Root`, `AppHeader/Back`, `NavigationBar/Primary`, `Settings/Management Sheet`, `Settings/Destination Row`, `AppShell/Root`, `AppShell/Back`, LocalSubnav Saúde/Diário/Controle e Privacidade) confirmados `canonical_after_pr91`/`canonical_reusable` — status corrigido nesta auditoria em `COMPONENT_MAP.yaml`, que ainda dizia `pending_pr_review`.

## Bottom Sheets (T06/T08/T09/T10/T11)

Padrão `PAGE BASE + SCRIM + BOTTOM SHEET` aprovado em 2026-09-15, propagado em PRs #111–#113. Confirmado ao vivo em 2026-09-16: os 13 nodes full-page antigos estão renomeados `[LEGACY PROTO STATE] ... SUPERSEDED BY BOTTOM SHEET` e os 10 overlays canônicos existem exatamente como documentado. `STATE_MATRIX.yaml` e `FIGMA_REGISTRY.yaml` foram corrigidos nesta auditoria — ainda listavam os nodes full-page como canônicos.

## Pessoa Idosa (RF30/US-036)

Aprovada canonicamente em 2026-09-14. Owner: David. Modo somente leitura, mesma autenticação, T03–T15 disponíveis, T16/T17 indisponíveis, sem escrita/CSV/administração/papéis familiares. Confirmado ao vivo: `Settings / Management Sheet` filtrado (`5948:36255`) existe no Figma com o nome esperado.

## Gates documentais (P01–P09)

**Todos fechados.** P01/#73 foi resolvido em 2026-09-15 com aprovação humana explícita (verificado via `gh issue view 73`) — 12 arquivos ainda declaravam P01 aberto e foram corrigidos nesta auditoria (ver `DELIVERY_EVIDENCE.md`).

## Integridade do protótipo (Issue #84)

Fechada em 2026-09-15. FI-001–FI-008 resolvidos/superados no `Fluxo Final`; preservados como histórico em `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`.

## Dívidas reais restantes

Nenhum gate funcional ou documental (P01–P09, RF30/US-036, FI-001–FI-008) permanece aberto no GitHub no momento desta auditoria. Pendências residuais são de **implementação** (código), não de documentação/design, listadas em `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md` § "Próximo trabalho correto":

1. implementar em código a resolução de sessão/categoria Pessoa Idosa e o vínculo obrigatório ao próprio perfil;
2. aplicar a whitelist T03–T15 e bloquear T16/T17 em rota/autorização (não só UI);
3. garantir que CTAs de escrita/administração sejam omitidos/desabilitados no runtime conforme a matriz;
4. implementar teste de acesso indevido com bloqueio + evento de auditoria (RNF01/RNF03);
5. validar US-036 ponta a ponta antes de fechar US-036/RF30 como "implementado" (a aprovação de design/requisito já existe; a implementação de produto ainda não foi auditada por este pack, que cobre apenas documentação/design).

## Última auditoria

2026-09-16 — esta auditoria de fechamento de milestone (`docs/milestone-canonical-audit-2026-09-16`).
