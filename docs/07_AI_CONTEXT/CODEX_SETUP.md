# Codex + Figma — Setup Operacional

Última atualização: **2026-09-14**.

## Identidade do projeto

- Repositório canônico: `webkauadev/rede-de-apoio`
- Figma canônico: `tcyj2fkTXei2CJbqaRxqCp`
- Protótipo canônico: `Fluxo Final` (`5926:1014`)
- Contrato principal: `AGENTS.md`
- Estado atual: `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md`
- Registry de telas: `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`
- Registry de estados: `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
- Registry do Figma: `docs/05_FIGMA/FIGMA_REGISTRY.yaml`
- Integridade do protótipo: `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`
- Contrato de design: `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`

## Fonte de verdade

GitHub = comportamento, escopo, requisitos, Issues, regras e rastreabilidade.  
Figma `Fluxo Final` = design/protótipo vigente.

Owner pages e `prototypeIA` são evidência histórica quando existe equivalente em `Fluxo Final`.

## Preflight no início de uma sessão Codex

1. Ler `AGENTS.md`.
2. Ler `CURRENT_PROJECT_STATE.md`.
3. Rodar `python scripts/validate_agent_context.py`.
4. Confirmar T01–T17 e `FIGMA_REGISTRY.known_current_nodes`.
5. Consultar `PROTOTYPE_INTEGRITY.yaml`.
6. Resolver RF/RNF/US e decisões P## aplicáveis.
7. Inspecionar o node do `Fluxo Final` antes de escrita.
8. Não usar `prototypeIA` ou `LEGADO —` como base quando houver equivalente final.
9. Trabalhar em branch específica e abrir PR.

## Teste de leitura sugerido

Peça ao Codex para, sem modificar nada:

- identificar owners T01–T17;
- informar nodes canônicos da tela solicitada;
- listar estados irmãos;
- listar RF/RNF/US;
- listar decisões/gates P## aplicáveis;
- informar componentes/tokens a reutilizar.

A leitura está incorreta se o agente:

- tratar RF30/US-036 como proposta;
- tratar P03/P04/P05/P06 como ainda abertos;
- usar frame `LEGADO —` como base apesar de existir equivalente final;
- inventar critérios individuais ausentes em P01.

## Decisões atuais que Codex deve conhecer

- P03/#75: escrita/correção determinística por categoria e contexto.
- P04/#76: N01–N04 em feedback transitório global, sem Central de Notificações.
- P05/#77: CSV exclusivo do Familiar Principal na primeira versão.
- P06/#78: união de permissões positivas em papéis acumulados, preservando restrições/contextos.
- RF30/#34 + US-036/#72: acesso próprio da Pessoa Idosa aprovado em modo read-only, owner David.
- P01/#73: único gate documental ainda aberto para critérios individuais não enumerados.

## Regra para alterações severas de design

Preservar:

- T##/E##;
- rastreabilidade RF/RNF→US→Tela→Estado→Componente;
- `STATE = PAGE BASE + DELTA MÍNIMO`;
- regras canônicas de papéis/permissões;
- semântica Loading/Empty/Error/Success/Forbidden;
- componentes/tokens existentes quando adequados;
- Site Map e arquitetura M3 aprovada.

Pode mudar composição visual apenas quando houver requisito, defeito, decisão canônica ou tarefa explícita que justifique a alteração.

## Pessoa Idosa read-only

RF30/US-036 reutilizam a mesma autenticação e telas autorizadas.

No contexto Pessoa Idosa:

- somente próprio cuidado autorizado;
- sem escrita/correção/conclusão/administração;
- sem papéis familiares;
- sem Plantonista Atual;
- sem CSV;
- sem app separado;
- tentativas não autorizadas são bloqueadas/auditadas.

## Integridade do protótipo

Issue #84 está encerrada. FI-001–FI-008 permanecem como histórico em `PROTOTYPE_INTEGRITY.yaml`; o `Fluxo Final` contém as resoluções vigentes.

## Saída esperada de tarefa Codex

- T## afetada;
- Issues/RF/RNF/US resolvidos;
- nodes Figma alterados;
- estados alterados;
- componentes/tokens reutilizados;
- decisões/gates encontrados;
- auditoria visual/estrutural;
- registries atualizados;
- commits;
- PR para revisão humana.
