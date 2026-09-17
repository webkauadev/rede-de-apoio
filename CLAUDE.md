# CLAUDE.md — Rede de Apoio

Antes de propor requisitos, telas, fluxos ou alterações no Figma, leia primeiro `AGENTS.md` e depois os arquivos canônicos em `docs/`.

`AGENTS.md` define o contrato operacional comum entre agentes. Para trabalho de design/Figma, siga também `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`, `CURRENT_PROJECT_STATE.md` e os registries YAML.

## Regras fundamentais

- O GitHub `webkauadev/rede-de-apoio` é a fonte única operacional para RF, RNF, US, Issues, tarefas, critérios de aceitação e contexto do agente.
- O Figma `Fluxo Final` é a fonte visual/prototípica vigente quando existir equivalente final.
- Não consultar trackers externos para completar lacunas; conteúdo ausente vira `migration_required`.
- Não inventar funcionalidades fora do escopo.
- Cada User Story possui exatamente um requisito de origem.
- Estados são derivados de uma Page Base: **STATE = PAGE BASE + DELTA MÍNIMO**.
- Plantonista Atual é condição temporária, não perfil.
- Familiar possui papéis acumuláveis: Principal, Apoio e Emergência.
- A permissão efetiva dos papéis familiares acumulados é a união das permissões positivas, preservadas restrições explícitas e condições contextuais.
- Existe exatamente um Familiar Principal ativo por rede.
- Profissional da Saúde é categoria separada.
- Registros de cuidado são imutáveis; correções geram novo registro vinculado.
- Pode corrigir quem possuir permissão efetiva para produzir o mesmo tipo de registro; leitura isolada não concede correção.
- CSV na primeira versão é exclusivo do Familiar Principal e deve ser auditado.
- N01–N04 usam feedback transitório global e telas existentes; não criar Central de Notificações dedicada.
- Dados de saúde exigem controle de acesso e auditoria.
- Material 3 governa UX/papéis semânticos; Obra/shadcn e componentes locais implementam a interface com identidade Rede de Apoio.
- Mobile first: referência 390 px e touch target mínimo 48×48 px.
- Frames `LEGADO —` não são base de implementação quando houver equivalente vigente.
- Alterações de design por agente terminam em Pull Request para revisão humana, não em auto-merge não autorizado.

## Pessoa Idosa

RF30/US-036 foram aprovados canonicamente em 2026-09-14.

Regras:
- usa a mesma autenticação do aplicativo;
- conta vinculada ao próprio perfil;
- consulta somente informações autorizadas do próprio cuidado;
- acesso somente leitura;
- sem papéis familiares;
- não é Plantonista Atual;
- sem criação, correção, conclusão ou alteração de registros;
- sem administração da rede;
- sem exportação CSV na primeira versão;
- senha definida pelo próprio titular;
- acessos negados são bloqueados e auditados;
- não criar aplicativo separado.

US-036 pertence a David.

## Gates documentais — histórico

P01/#73 foi resolvido em 2026-09-15 (aprovação humana explícita); critérios individuais de aceite de US-001–US-036 estão em `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml`. P02–P09 também estão fechados. Nenhum gate documental permanece aberto no momento. Não inventar critério novo além do aprovado sem decisão explícita registrada no GitHub.

## Fontes de verdade

- GitHub `webkauadev/rede-de-apoio`: requisitos, rastreabilidade, Issues, tarefas, aprovação e contexto operacional.
- Figma `Fluxo Final`: protótipo e design visual vigente.

Se uma informação funcional não estiver no GitHub, ela ainda não é canônica para o agente.
