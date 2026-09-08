# CLAUDE.md — Rede de Apoio

Antes de propor requisitos, telas, fluxos ou alterações no Figma, leia primeiro `AGENTS.md` e depois os arquivos canônicos em `docs/`.

`AGENTS.md` define o contrato operacional comum entre agentes. Para trabalho de design/Figma, siga também `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md` e os registries YAML indicados nele.

## Regras fundamentais

- O GitHub `webkauadev/rede-de-apoio` é a fonte única operacional para RF, RNF, US, Issues, tarefas, critérios de aceitação e contexto do agente.
- Não consultar trackers externos para completar lacunas; conteúdo ausente vira `migration_required`.
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

Acesso próprio somente leitura permanece como proposta controlada enquanto RF30/US-036 não forem aprovados no próprio GitHub.

## Fontes de verdade

- GitHub `webkauadev/rede-de-apoio`: requisitos, rastreabilidade, Issues, tarefas, aprovação e contexto operacional.
- Figma: protótipo e design visual vigente.

Se uma informação funcional não estiver no GitHub, ela ainda não é canônica para o agente.
