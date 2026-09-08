# Autonomous Design Workflow — Guia de operação

Este arquivo traduz a infraestrutura de contexto em comandos simples de operação usando **GitHub + Figma**, sem dependência de tracker externo.

## Comando: `execute T##`

O agente deve:

1. localizar T## em `SCREEN_REGISTRY.yaml`;
2. consultar RF/RNF/US, critérios e Issue oficial no próprio GitHub;
3. se alguma informação funcional necessária estiver ausente, registrar `migration_required` e não buscá-la fora do GitHub;
4. localizar a página/nodes em `FIGMA_REGISTRY.yaml`;
5. se o Figma estiver `discovery_required`, descobrir e registrar antes de editar;
6. ler os estados em `STATE_MATRIX.yaml`;
7. pesquisar componentes em `COMPONENT_MAP.yaml` e no Figma;
8. criar/corrigir usando o estado-base e delta mínimo;
9. auditar visual e estruturalmente;
10. atualizar os registries;
11. commitar em branch dedicada e abrir PR.

## Comando: `faça a próxima tela do <responsável>`

O agente deve:

1. filtrar `SCREEN_REGISTRY.yaml` pelo responsável;
2. consultar prioridades, Issues e requisitos no próprio GitHub;
3. na ausência de prioridade explícita, escolher primeiro uma tela com `figma_discovery_required` ou estado incompleto que tenha base funcional suficiente no GitHub;
4. não selecionar silenciosamente uma tela que dependa de conteúdo `migration_required` para decisões funcionais;
5. executar o fluxo completo de `execute T##`.

O agente deve informar no PR por que aquela tela foi selecionada.

## Comando: `audite T##`

O agente não deve redesenhar por preferência estética. Deve:

1. localizar base e states irmãos;
2. comparar estrutura e dimensões;
3. verificar instâncias/componentes;
4. verificar tokens e Auto Layout;
5. verificar overflow, clipping, contraste, tipografia, espaçamento e touch targets;
6. confrontar com requisitos e regras existentes no GitHub;
7. corrigir apenas problemas demonstráveis;
8. registrar alterações e abrir PR.

## Comando: `corrija o state X da T##`

O agente deve localizar o `base_state` e aplicar somente o delta necessário ao state X. É proibido refazer shell, navegação ou identidade visual do state isoladamente sem requisito que justifique a diferença.

## Quando o agente deve parar e marcar pendência

Marcar `migration_required` ou outra pendência, sem inventar solução funcional, quando:

- o GitHub não contém o RF/RNF/US ou critério necessário;
- duas fontes canônicas dentro do GitHub se contradizem;
- permissão de usuário não está formalizada;
- um novo fluxo muda escopo ou requisitos;
- não é possível identificar qual frame vigente substitui um `LEGADO —`.

O agente **não consulta tracker externo para resolver essas lacunas**.

Pendência documental não impede correções puramente estruturais/visuais que não alterem comportamento, desde que isso fique explícito no PR.

## Gate humano

O agente pode autonomamente chegar até:

`GitHub → Figma corrigido → documentação atualizada → commits → Pull Request`

O merge permanece humano por padrão.
