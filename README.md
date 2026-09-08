# Rede de Apoio — Context Pack

Documentação central de contexto do projeto **Rede de Apoio a Cuidadores de Idosos**.

Este repositório GitHub (`webkauadev/rede-de-apoio`) é a **fonte única de verdade operacional** para requisitos, RF/RNF, User Stories, Issues, tarefas, critérios de aceitação, rastreabilidade, decisões e contexto de IA. O Figma é a fonte do protótipo e do design visual vigente.

O fluxo dos agentes **não depende de tracker externo**. Se uma informação funcional ainda não estiver no GitHub, ela deve ser marcada como `migration_required` até ser migrada para cá.

O pack contém:

- requisitos e User Stories consolidados ou explicitamente marcados como pendentes de migração;
- regras de negócio;
- Site Map T01–T17;
- rastreabilidade;
- Design System baseado em shadcn/ui;
- decisões e registry do Figma;
- contratos operacionais para agentes;
- registry de telas e matriz de estados em YAML;
- mapa de componentes reutilizáveis;
- workflow e estrutura de Issues no GitHub;
- changelog de decisões.

## Ordem de leitura para agentes

1. `AGENTS.md`
2. `CLAUDE.md` quando estiver usando Claude/Claude Code
3. `docs/00_PROJECT_CONTEXT.md`
4. `docs/01_REQUIREMENTS/`
5. `docs/07_AI_CONTEXT/AI_CONTEXT_RULES.md`
6. `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md` para tarefas de design/Figma
7. `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`
8. `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
9. `docs/02_BUSINESS_RULES/`
10. `docs/03_INFORMATION_ARCHITECTURE/`
11. `docs/04_DESIGN_SYSTEM/`
12. `docs/05_FIGMA/`
13. `docs/06_GITHUB/`
14. `docs/CHANGELOG.md`

## Fluxo de design por agente

`GitHub → requisitos/Issue → Context Pack → Figma → Auditoria → Registry → Commit → Pull Request → Revisão humana`

A infraestrutura estruturada é validada automaticamente pelo workflow **Validate agent context** em Pull Requests.

## Comandos de alto nível esperados

Com a camada de contexto atual, um agente pode receber solicitações como:

- `execute a T06`;
- `corrija o Loading da T01`;
- `faça a próxima tela do David`;
- `audite os states da T12`.

O agente deve resolver requisitos no próprio GitHub, reutilizar componentes/tokens existentes, alterar o Figma, auditar e registrar os node IDs/estados antes de abrir o PR.

## Estado atual

O GitHub já possui a fundação para agentes, mas ainda existem lacunas documentais herdadas, especialmente textos completos das US-001 a US-035 e RNFs citados sem definição. Essas lacunas devem ser migradas para o GitHub e ficam visíveis em `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md`; o agente não deve buscá-las fora do repositório.
