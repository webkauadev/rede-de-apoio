# Autonomous Design Workflow — Guia de operação

Este arquivo traduz a infraestrutura de contexto em comandos simples de operação.

## Comando: `execute T##`

O agente deve:

1. localizar T## em `SCREEN_REGISTRY.yaml`;
2. consultar requisitos e Issue oficial no GitLab;
3. localizar a página/nodes em `FIGMA_REGISTRY.yaml`;
4. se o Figma estiver `discovery_required`, descobrir e registrar antes de editar;
5. ler os estados em `STATE_MATRIX.yaml`;
6. pesquisar componentes em `COMPONENT_MAP.yaml` e no Figma;
7. criar/corrigir usando o estado-base e delta mínimo;
8. auditar visual e estruturalmente;
9. atualizar os registries;
10. commitar em branch dedicada e abrir PR.

## Comando: `faça a próxima tela do <responsável>`

O agente deve:

1. filtrar `SCREEN_REGISTRY.yaml` pelo responsável;
2. respeitar qualquer prioridade oficial do GitLab;
3. na ausência de prioridade explícita, escolher primeiro uma tela com `figma_discovery_required` ou estado incompleto;
4. executar o fluxo completo de `execute T##`.

O agente deve informar no PR por que aquela tela foi selecionada.

## Comando: `audite T##`

O agente não deve redesenhar por preferência estética. Deve:

1. localizar base e states irmãos;
2. comparar estrutura e dimensões;
3. verificar instâncias/componentes;
4. verificar tokens e Auto Layout;
5. verificar overflow, clipping, contraste, tipografia, espaçamento e touch targets;
6. confrontar com requisitos e regras do projeto;
7. corrigir apenas problemas demonstráveis;
8. registrar alterações e abrir PR.

## Comando: `corrija o state X da T##`

O agente deve localizar o `base_state` e aplicar somente o delta necessário ao state X. É proibido refazer shell, navegação ou identidade visual do state isoladamente sem requisito que justifique a diferença.

## Quando o agente deve parar e marcar pendência

Marcar pendência, sem inventar solução funcional, quando:

- o GitLab não define comportamento necessário;
- duas fontes oficiais se contradizem;
- permissão de usuário não está formalizada;
- um novo fluxo muda escopo ou requisitos;
- não é possível identificar qual frame vigente substitui um `LEGADO —`.

Pendência documental não impede correções puramente estruturais/visuais que não alterem comportamento, desde que isso fique explícito no PR.

## Gate humano

O agente pode autonomamente chegar até:

`Figma corrigido → documentação atualizada → commits → Pull Request`

O merge permanece humano por padrão.
