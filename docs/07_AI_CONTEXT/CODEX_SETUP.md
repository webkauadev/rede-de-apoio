# Codex + Figma — Setup Operacional

Última atualização: **2026-09-13**.

## Identidade do projeto

- Repositório canônico: `webkauadev/rede-de-apoio`
- Figma canônico: `tcyj2fkTXei2CJbqaRxqCp`
- Contrato principal: `AGENTS.md`
- Estado atual: `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md`
- Registry de telas: `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`
- Registry de estados: `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
- Registry do Figma: `docs/05_FIGMA/FIGMA_REGISTRY.yaml`
- Integridade do protótipo: `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`
- Auditoria humana: `docs/05_FIGMA/FIGMA_AUDIT_2026-09-13.md`
- Contrato de design: `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`

## Fonte de verdade

GitHub = comportamento, escopo, requisitos, Issues, regras e rastreabilidade.  
Figma = design visual vigente.

Quando o wiring do Figma conflitar com o GitHub, não “seguir o clique”: consultar `PROTOTYPE_INTEGRITY.yaml` e resolver pelo requisito canônico.

## Preflight no início de uma sessão Codex

1. Ler `AGENTS.md`.
2. Ler `CURRENT_PROJECT_STATE.md`.
3. Rodar `python scripts/validate_agent_context.py`.
4. Confirmar que existem 17 telas e 17 entradas em `FIGMA_REGISTRY.known_current_nodes`.
5. Consultar Issue #84 / `PROTOTYPE_INTEGRITY.yaml`.
6. Para a T## escolhida, resolver RF/RNF/US e gates.
7. Inspecionar o node atual no Figma antes de qualquer escrita.
8. Não usar `prototypeIA` como base quando houver frame atual na página do responsável.
9. Não usar frame `LEGADO —`.
10. Trabalhar em branch específica e abrir PR; não fazer merge automático.

## Teste de leitura sugerido

Peça ao Codex para:
- identificar owners T01–T17;
- informar os nodes do frame solicitado;
- listar estados irmãos;
- listar RF/RNF/US;
- listar gates P##;
- listar defeitos FI-### aplicáveis;
- informar componentes/tokens a reutilizar;
- não modificar nada.

Se a resposta tratar RF30/US-036 como aprovado, usar frame LEGADO como base ou tratar FI-### como comportamento esperado, o preflight falhou.

## Regra para alterações severas de design

Uma grande refatoração deve preservar:
- identificadores T##/E##;
- rastreabilidade RF/RNF→US→Tela→Estado→Componente;
- estados irmãos com a mesma estrutura-base;
- regras de papéis/permissões;
- semântica de Loading/Empty/Error/Success/Forbidden;
- componentes e tokens existentes quando adequados;
- arquitetura do Site Map.

Pode mudar fortemente composição visual, hierarquia, layout, densidade, navegação visual já autorizada, uso de componentes e consistência entre estados, desde que não crie nova funcionalidade por conta própria.

## Gates que exigem decisão humana/canônica

- P01/#73 — critérios individuais.
- P03/#75 — permissões de escrita.
- P04/#76 — superfície de notificações.
- P05/#77 — permissão CSV.
- P06/#78 — composição de permissões.
- RF30/#34 + US-036/#72 — proposta de acesso read-only.

## Dívida visual/navegacional

Issue #84 cobre a integridade atual do protótipo. Corrigi-la é uma tarefa de design/protótipo, não uma nova funcionalidade.

## Saída esperada de cada tarefa Codex

- T## afetada;
- Issues/RF/RNF/US resolvidos;
- nodes Figma alterados;
- estados alterados;
- componentes/tokens reutilizados;
- gates encontrados;
- FI-### resolvidos ou ainda abertos;
- auditoria visual/estrutural;
- registries atualizados;
- commits;
- PR aberto para revisão humana.
