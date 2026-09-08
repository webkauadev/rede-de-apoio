# CLAUDE.md — Rede de Apoio

Antes de propor requisitos, telas, fluxos ou alterações no Figma, leia primeiro `AGENTS.md` e depois os arquivos canônicos em `docs/`.

`AGENTS.md` define o contrato operacional comum entre agentes. Para trabalho de design/Figma, siga também `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md` e os registries YAML indicados nele.

## Regras fundamentais

- Não inventar funcionalidades fora do escopo sem marcar como proposta.
- Cada User Story possui exatamente um requisito de origem.
- Estados são derivados de uma Page Base: **STATE = PAGE BASE + DELTA MÍNIMO**.
- Plantonista Atual é condição temporária, não perfil.
- Familiar possui papéis acumuláveis: Principal, Apoio e Emergência.
- Existe exatamente um Familiar Principal ativo por rede.
- Profissional da Saúde é categoria separada.
- Não existe chat no escopo.
- Registros de cuidado são imutáveis; correções geram novo registro vinculado.
- Dados de saúde exigem controle de acesso e auditoria.
- shadcn/ui é base de componentes; a identidade visual pertence ao Rede de Apoio.
- Mobile first: referência 390 px.
- Frames `LEGADO —` não são base de implementação quando houver equivalente vigente.
- Alterações de design por agente terminam em Pull Request para revisão humana, não em auto-merge.

## Pessoa Idosa

Acesso próprio somente leitura está em formalização. Deve ser tratado como extensão controlada até atualização oficial no GitLab.

## Fontes de verdade

- GitLab canônico: `https://gitlab.fslab.dev/fabrica-de-software-i-2026/projeto6` — requisitos, rastreabilidade e aprovação.
- Figma: protótipo visual.
- Este repositório: contexto consolidado e contratos operacionais para IA e equipe.
