# Rede de Apoio — Context Pack

Documentação central do projeto **Rede de Apoio a Cuidadores de Idosos**.

Este repositório GitHub (`webkauadev/rede-de-apoio`) é a **fonte única de verdade operacional** para RF/RNF, User Stories, Issues/tarefas, critérios, rastreabilidade, decisões e contexto de IA. O Figma é a fonte do protótipo e do design visual vigente.

O fluxo dos agentes **não depende de tracker externo**. Informação funcional ausente no GitHub é marcada como `migration_required`; inferências úteis podem ser registradas como `candidate_origin`, nunca como requisito confirmado.

## Catálogo operacional no GitHub

Todas as entidades conhecidas possuem Issue canônica:

- RF01–RF29: requisitos funcionais atuais;
- RF30: proposta controlada de acesso somente leitura da Pessoa Idosa;
- RNF01 e RNF03: Issues de lacuna até suas definições canônicas serem incorporadas;
- US-001–US-035: catálogo oficial conhecido, com responsáveis atuais;
- US-036: proposta controlada vinculada a RF30;
- P01–P09: pendências documentais/funcionais; P07 está resolvida e fechada.

O mapeamento está em `docs/06_GITHUB/ISSUE_REGISTRY.yaml`.

## O pack contém

- `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml` — RF/RNF + Issues;
- `docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml` — US + owners + Issues + rastreabilidade conhecida;
- `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md` — backlog de lacunas P01–P09;
- `docs/02_BUSINESS_RULES/` — regras e permissões;
- `docs/03_INFORMATION_ARCHITECTURE/` — Site Map, telas e rastreabilidade;
- `docs/04_DESIGN_SYSTEM/` — tokens/componentes shadcn/Obra;
- `docs/05_FIGMA/` — registro do arquivo/páginas/nodes vigentes;
- `docs/06_GITHUB/` — workflow, estrutura e registry de Issues;
- `docs/07_AI_CONTEXT/` — contratos operacionais, screens/states e decisões;
- `AGENTS.md` / `CLAUDE.md` — contrato de execução para agentes.

## Ordem de leitura para agentes

1. `AGENTS.md`
2. `CLAUDE.md` quando estiver usando Claude/Claude Code
3. `docs/00_PROJECT_CONTEXT.md`
4. `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml`
5. `docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml`
6. `docs/06_GITHUB/ISSUE_REGISTRY.yaml`
7. `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md`
8. `docs/07_AI_CONTEXT/AI_CONTEXT_RULES.md`
9. `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`
10. `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`
11. `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
12. `docs/02_BUSINESS_RULES/`
13. `docs/03_INFORMATION_ARCHITECTURE/`
14. `docs/04_DESIGN_SYSTEM/`
15. `docs/05_FIGMA/`
16. `docs/06_GITHUB/`
17. `docs/CHANGELOG.md`

## Fluxo de design por agente

`GitHub Issue → RF/RNF/US → Context Pack → Figma → Auditoria → Registry → Commit → Pull Request → Revisão humana`

Exemplos de comando:

- `execute T06`;
- `corrija o Loading da T01`;
- `faça a próxima tela do David`;
- `audite os states da T12`.

O agente resolve tudo no próprio GitHub, reutiliza componentes/tokens existentes, altera o Figma, audita e registra nodes/estados antes do PR.

## Estado atual

A **estrutura de backlog e rastreabilidade já está toda no GitHub**: RF/RNF/US/P## possuem Issues canônicas. O que permanece incompleto é conteúdo original que não aparece nas fontes disponíveis, principalmente textos/atores/critérios de várias US e as definições de RNF01/RNF03. Essas lacunas estão visíveis nas próprias Issues e nunca devem ser preenchidas por invenção.

O workflow **Validate agent context** valida automaticamente os registries em Pull Requests.
