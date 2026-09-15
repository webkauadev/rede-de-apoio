# Estado Atual do Projeto — Readiness para Codex

Data de consolidação: **2026-09-14**.

## Veredito

O repositório `webkauadev/rede-de-apoio` permanece a **fonte operacional única** para requisitos, User Stories, regras de negócio, decisões, rastreabilidade e contexto de agentes. O Figma `tcyj2fkTXei2CJbqaRxqCp` é a fonte visual canônica.

O ciclo de consolidação visual/prototípica T01–T17 foi concluído. A página **`Fluxo Final`** (`5926:1014`) é agora o protótipo canônico de usuário final; owner pages permanecem como histórico/fonte de migração quando houver equivalente no `Fluxo Final`.

Situação confirmada:

- RF01–RF29 canônicos; RF30 permanece proposta controlada;
- RNF01–RNF03 canônicos;
- US-001–US-035 oficiais; US-036 permanece proposta;
- T01–T17 rastreadas e mapeadas;
- Design Foundation Material 3 aprovada e usada como base visual;
- Navigation Bar principal: `Home · Agenda · Diário · Saúde`;
- T12–T17 acessíveis pela arquitetura `Settings / Management Sheet`;
- LocalSubnav reutilizável consolidada para Saúde, Diário e Controle/Privacidade;
- Issue #84 de integridade do protótipo encerrada como concluída;
- PR #103 consolidou documentalmente o protótipo final;
- PR #104 resolveu a dívida semântica FI-008 em T13.

## Protótipo canônico final

Página Figma: `Fluxo Final` (`5926:1014`).

Estrutura:

- seção de baselines canônicos T01–T17: `5926:1015`;
- seção de estados aprovados/migrados necessários ao fluxo: `5926:32075`;
- seção de overlays canônicos: `5932:4923`;
- `Settings / Management Sheet`: `5932:4924`.

### Auditoria final do grafo — 2026-09-14

Auditoria direta pelo Plugin API, usando roots semânticos `[FLUXO FINAL]`, `[PROTO STATE]` e `[OVERLAY]`:

- T01–T17 alcançáveis a partir de T01: **sim**;
- roots/estados alcançados a partir de T01: **66**;
- reaction nodes encontrados no `Fluxo Final`: **186**;
- destinos `NODE` quebrados: **0**;
- `NAVIGATE`/`OVERLAY` nocivo para outra página: **0**;
- FI-001–FI-007: superados no protótipo canônico pela consolidação/migração e pela arquitetura vigente;
- FI-008: resolvido no `Fluxo Final` com hotspots T13 renomeados semanticamente para E22–E25, sem alterar reactions ou escopo.

O Figma mantém alguns flow starting points herdados que a Plugin API atual expõe como read-only. Isso não bloqueia o protótipo: T01 é um start válido e alcança todo o fluxo canônico.

## Direção visual vigente — Material Design 3

Material Design 3 governa UX/design visual, subordinado aos requisitos funcionais e regras de negócio aprovados no GitHub.

Documento canônico:

`docs/04_DESIGN_SYSTEM/MATERIAL3_VISUAL_DIRECTION.md`

Regra vigente:

`Requisito aprovado → padrão/role M3 → token semântico Rede de Apoio → Obra/shadcn/local primitive → tela`

Material 3 é referência de UX e papéis semânticos; não significa adotar SDK Material, Google Sans ou paleta baseline Google. A implementação continua baseada em componentes locais, Obra/shadcn e identidade Rede de Apoio.

### Arquitetura visual consolidada

- `AppHeader / Root`: título da página como informação primária, contexto da Pessoa Idosa como secundário quando aplicável e ação global deliberada de Configurações;
- `AppHeader / Back`: voltar + título explícito + contexto/ação opcional quando necessário e autorizado;
- Navigation Bar primária mobile: `Home · Agenda · Diário · Saúde`;
- `Mais` não faz parte do TARGET da Navigation Bar;
- T12–T17 são destinos secundários acessíveis pelo `Settings / Management Sheet`;
- subnavegação local fica imediatamente abaixo do header nas famílias de telas que exigem troca contextual;
- touch targets mínimos: **48 × 48 px**;
- `STATE = PAGE BASE + DELTA MÍNIMO` permanece a regra de estados.

## Fontes de autoridade

1. Issues/requisitos aprovados e documentos canônicos do GitHub.
2. Registries estruturados do repositório.
3. `MATERIAL3_VISUAL_DIRECTION.md` + princípios oficiais Material 3 para UX/design visual.
4. `Fluxo Final` no Figma para implementação visual/prototípica vigente, desde que não contradiga decisão funcional aprovada.
5. Owner pages somente como histórico/fonte de migração quando existir equivalente canônico no `Fluxo Final`.
6. Inferência somente quando inevitável e explicitamente marcada.

O Figma nunca aprova requisito, permissão, papel, critério de aceite ou evolução de escopo.

## Escopo principal

17 telas:

- David: T01, T02, T12, T13, T14, T15;
- Rhuan: T03, T04, T09, T11;
- Henrique: T05, T07, T08, T10;
- Kauã: T06, T16, T17.

35 US aprovadas:

- David 9;
- Rhuan 9;
- Henrique 9;
- Kauã 8.

## Gates funcionais/documentais que continuam abertos

Os itens abaixo **não podem ser resolvidos por inferência do Figma**:

- **P01 / #73:** critérios de aceite individuais por US ainda exigem consolidação documental;
- **P03 / #75:** permissões de escrita não são completamente determinísticas. A matriz ainda usa `Conforme regra`, `Conforme permissão`, `Limitado` e `Conforme escopo`;
- **P04 / #76:** destinatários N01–N04 estão definidos, mas as superfícies/telas em que cada aviso aparece ainda precisam de decisão formal, sem criar Central de Notificações fora do Site Map;
- **P05 / #77:** RF28 autoriza exportação contextual em CSV, porém quem pode exportar dados de saúde e sob quais condições ainda precisa ser decidido;
- **P06 / #78:** papéis familiares são acumuláveis, mas a composição da permissão efetiva em capacidades diferentes/conflitantes ainda precisa de regra determinística.

### Consequência operacional

Agentes podem continuar trabalhando autonomamente em tarefas que não dependam desses gates. Quando uma implementação depender de P03/P04/P05/P06, deve bloquear a decisão funcional específica em vez de inventar uma regra.

## Proposta controlada

RF30/#34 + US-036/#72 = acesso próprio somente leitura da Pessoa Idosa.

Status: **proposta controlada / não aprovada**.

Já existem explorações visuais T12 registradas como `proposal_only`, mas elas não integram o fluxo canônico aprovado e não autorizam implementação.

Se a proposta vier a ser aprovada, as regras já registradas incluem:

- mesma autenticação do aplicativo;
- acesso somente leitura ao próprio cuidado autorizado;
- nenhum papel familiar;
- não pode ser Plantonista Atual;
- nenhuma administração da rede ou alteração de registros;
- senha definida pelo próprio titular;
- sem app separado.

## Integridade do protótipo

Issue #84: **CLOSED / COMPLETED**.

Registro canônico:

`docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`

A issue histórica preserva FI-001–FI-008 e suas origens; o `Fluxo Final` registra as resoluções sem apagar evidência das owner pages antigas.

## Design system vigente

Ordem de implementação de primitives:

1. componente local aprovado;
2. Obra/shadcn existente;
3. library vinculada;
4. componente local novo somente quando não houver equivalente.

A ordem acima governa implementação, não a decisão de UX. Antes dela, o agente deve resolver o padrão e o papel semântico M3 aplicável.

Tokens oficiais: `docs/04_DESIGN_SYSTEM/DESIGN_TOKENS.md`.

Foundation/registries relevantes:

- `docs/04_DESIGN_SYSTEM/MATERIAL3_VISUAL_DIRECTION.md`;
- `docs/04_DESIGN_SYSTEM/LOCAL_SUBNAVIGATION_PATTERN.md`;
- `docs/04_DESIGN_SYSTEM/APP_HEADER_VISUAL_GRAMMAR.md`;
- `docs/04_DESIGN_SYSTEM/COLOR_SURFACE_STRATEGY.md`;
- `docs/05_FIGMA/FIGMA_REGISTRY.yaml`;
- `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`;
- `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`.

## Preflight obrigatório do Codex

Antes de qualquer alteração:

1. ler `AGENTS.md`;
2. ler este arquivo;
3. ler `PROJECT_DECISIONS.md`;
4. ler `docs/04_DESIGN_SYSTEM/MATERIAL3_VISUAL_DIRECTION.md`;
5. resolver requisitos e Issues aplicáveis;
6. ler `SCREEN_REGISTRY.yaml` + `STATE_MATRIX.yaml`;
7. ler `FIGMA_REGISTRY.yaml` + `PROTOTYPE_INTEGRITY.yaml`;
8. consultar `SITEMAP.md`, `SCREENS_CATALOG.md` e `TRACEABILITY_MATRIX.md`;
9. consultar tokens/component map;
10. inspecionar `Design Foundation` e o `Fluxo Final`;
11. somente então editar.

## Definition of Ready do ambiente

- [x] fonte operacional única definida;
- [x] RF/RNF/US indexados;
- [x] owner de cada T## definido;
- [x] T01–T17 mapeadas no Figma;
- [x] estados inventariados;
- [x] frames legados distinguidos;
- [x] proposal-only explicitado;
- [x] tokens e component map disponíveis;
- [x] direction Material 3 documentada e aprovada;
- [x] Foundation estrutural de header/navigation criada;
- [x] padrões de LocalSubnav consolidados;
- [x] `Fluxo Final` T01–T17 consolidado e funcionalmente conectado;
- [x] audit de integridade do protótipo concluído;
- [x] Issue #84 encerrada;
- [ ] P01/P03/P04/P05/P06 resolvidas quando uma entrega funcional depender delas;
- [ ] RF30/US-036 aprovada ou rejeitada explicitamente antes de qualquer implementação definitiva.

## Próximo trabalho correto

O gargalo principal deixou de ser visual. O protótipo canônico T01–T17 está consolidado.

O próximo trabalho deve ser escolhido entre:

1. resolver um gate funcional/documental explicitamente necessário à próxima entrega (P01/P03/P04/P05/P06);
2. deliberar RF30/US-036, se a evolução de acesso somente leitura da Pessoa Idosa fizer parte do escopo desejado;
3. iniciar implementação/código a partir do `Fluxo Final`, respeitando os gates ainda abertos e a rastreabilidade RF/RNF → US → Tela/Ação.

Não reabrir redesign geral das telas sem um requisito, defeito ou gate concreto que justifique a alteração.
