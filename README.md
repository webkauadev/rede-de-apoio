# Rede de Apoio — Context Pack

Documentação central de contexto do projeto **Rede de Apoio a Cuidadores de Idosos**.

Este repositório concentra contexto para equipe e agentes de IA. O **GitLab canônico do projeto** é `https://gitlab.fslab.dev/fabrica-de-software-i-2026/projeto6` e continua sendo a fonte oficial de requisitos, Issues e rastreabilidade; o Figma continua sendo a fonte do protótipo visual.

O pack contém:

- requisitos e User Stories consolidados;
- regras de negócio;
- Site Map T01–T17;
- rastreabilidade;
- Design System baseado em shadcn/ui;
- decisões e registry do Figma;
- contratos operacionais para agentes;
- registry de telas e matriz de estados em YAML;
- mapa de componentes reutilizáveis;
- gestão GitLab;
- changelog de decisões.

## Ordem de leitura para agentes

1. `AGENTS.md`
2. `CLAUDE.md` quando estiver usando Claude/Claude Code
3. `docs/00_PROJECT_CONTEXT.md`
4. `docs/07_AI_CONTEXT/AI_CONTEXT_RULES.md`
5. `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md` para tarefas de design/Figma
6. `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`
7. `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
8. `docs/01_REQUIREMENTS/`
9. `docs/02_BUSINESS_RULES/`
10. `docs/03_INFORMATION_ARCHITECTURE/`
11. `docs/04_DESIGN_SYSTEM/`
12. `docs/05_FIGMA/`
13. `docs/06_GITLAB/`
14. `docs/CHANGELOG.md`

## Fluxo de design por agente

`GitLab FSLab → Context Pack → Figma → Auditoria → Registry → Commit → Pull Request → Revisão humana`

A infraestrutura estruturada é validada automaticamente pelo workflow **Validate agent context** em Pull Requests.

## Comandos de alto nível esperados

Com a camada de contexto atual, um agente pode receber solicitações como:

- `execute a T06`;
- `corrija o Loading da T01`;
- `faça a próxima tela do David`;
- `audite os states da T12`.

O agente deve resolver requisitos no GitLab canônico, reutilizar componentes/tokens existentes, alterar o Figma, auditar e registrar os node IDs/estados antes de abrir o PR.

## Estado atual

Ver `docs/AUDIT_CONTEXT_PACK.md` para a auditoria de consistência do pack e `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md` para lacunas que ainda exigem formalização.
