# Métricas da Milestone — Snapshot com Fonte

Data da coleta: **2026-09-16**. Fonte: GitHub CLI (`gh`) autenticado como `webkauadev`, contra `webkauadev/rede-de-apoio`, e `git log` local (branch `main`, HEAD `75d2dee` no início desta auditoria).

Não há GitLab neste projeto — o `AGENTS.md`/histórico antigo menciona GitLab apenas como tracker legado descartado (ver `scripts/validate_agent_context.py`, que falha se `docs/06_GITLAB` existir ou se arquivos operacionais mencionarem "gitlab"/"fslab"). Todas as métricas abaixo são GitHub + Git local; nenhuma vem de outra plataforma.

## Commits (Git, branch `main`)

| Métrica | Valor | Comando |
|---|---:|---|
| Commits totais em `main` | 285 | `git log main --oneline \| wc -l` |
| Commits por `Kauã Fernandes <jupterkaua@icloud.com>` | 273 | `git shortlog -sne main` |
| Commits por identidade `webkauadev <jupterkaua@icloud.com>` | 12 | `git shortlog -sne main` |

**Limitação:** as duas identidades de commit resolvem para o mesmo e-mail (`jupterkaua@icloud.com`) — é um único contribuidor humano usando duas configurações de `user.name` (provavelmente commits feitos via agente/CLI vs. manuais), não dois desenvolvedores distintos. Não inflar "número de contribuidores" a partir disso.

### Distribuição de commits por dia (`git log --format=%ad --date=short main`)

| Data | Commits |
|---|---:|
| 2026-09-04 | 2 |
| 2026-09-05 | 31 |
| 2026-09-08 | 73 |
| 2026-09-13 | 44 |
| 2026-09-14 | 132 |
| 2026-09-15 | 4 (após este ponto, nada até 2026-09-16, quando esta auditoria começa) |

## Issues (GitHub)

| Métrica | Valor | Comando |
|---|---:|---|
| Issues totais | 85 | `gh issue list --state all` |
| Issues abertas | 70 | `gh issue list --state open` |
| Issues fechadas | 15 | `gh issue list --state closed` |

**Definição:** "issue fechada" é um estado do GitHub, não sinônimo de "US funcional concluída". As 70 issues abertas incluem RF01–RF30, RNF01–RNF03 e US-001–US-036 — que **permanecem abertas por design** como issues de rastreamento vivo do requisito/história, não porque estejam pendentes. As 15 fechadas são as decisões documentais/de integridade (P01–P09, Issue #84 de integridade do protótipo, Issue #83/RNF02 duplicada, Issue #89 de reorientação Material 3, Issues #106/#107 de decisão/cancelamento). Não confundir "issue de requisito aberta" com "requisito não implementado".

## Pull Requests (GitHub)

| Métrica | Valor | Comando |
|---|---:|---|
| PRs totais | 28 | `gh pr list --state all` |
| PRs mergeados | 28 | `gh pr list --state merged` |
| PRs abertos | 0 | `gh pr list --state open` |

Todos os PRs até `#113` (o HEAD conhecido no início desta auditoria) foram mergeados; nenhum PR está pendente de revisão.

## Requisitos e histórias (registries)

| Métrica | Valor | Fonte |
|---|---:|---|
| RF canônicos | 30 (RF01–RF30) | `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml` |
| RNF canônicos | 3 (RNF01–RNF03) | idem |
| US oficiais | 36 (US-001–US-036) | `docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml` |
| US com conteúdo `complete` | 36/36 | idem — validado por `scripts/validate_agent_context.py` |
| Gates documentais P## | 9 (P01–P09), todos `closed` | `docs/06_GITHUB/ISSUE_REGISTRY.yaml`, confirmado via `gh issue view 73` para P01 |
| Telas T## | 17 (T01–T17), todas `canonical_in_fluxo_final` | `docs/05_FIGMA/FIGMA_REGISTRY.yaml` |

## Validação automática

`python scripts/validate_agent_context.py` — executado em 2026-09-16 após as correções desta auditoria: **passou**, reportando 17 telas, 17 telas com node Figma conhecido, 17 entradas de estado, 36 US oficiais indexadas, 36 US com Issue canônica, 0 US aguardando migração de conteúdo, 30 RF indexados, 78 referências de Issue canônicas registradas.

## Apresentação/monitoria

Não foi encontrado no repositório nenhum material de slides, apresentação ou monitoria (`rg -ni "monitoria|apresenta|slide"` não retornou artefato de apresentação, apenas menções textuais nas próprias regras de auditoria). Nenhuma métrica de "apresentação da milestone" pode ser afirmada com evidência neste repositório — se esse material existir, está fora do repositório GitHub e não pode ser citado aqui sem virar `migration_required`.
