# CLAUDE.md — Rede de Apoio

Antes de propor requisitos, telas, fluxos ou alterações no Figma, leia os arquivos em `docs/`.

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

## Pessoa Idosa

Acesso próprio somente leitura está em formalização. Deve ser tratado como extensão controlada até atualização oficial no GitLab.

## Fontes de verdade

- GitLab: requisitos e aprovação.
- Figma: protótipo visual.
- Este repositório: contexto consolidado para IA e equipe.
