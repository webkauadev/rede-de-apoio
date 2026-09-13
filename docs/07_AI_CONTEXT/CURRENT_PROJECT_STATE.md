# Estado Atual do Projeto — Readiness para Codex

Data de consolidação: **2026-09-13**.

## Veredito

O repositório está estruturado para ser a **fonte operacional única** do trabalho com agentes. O Figma é a fonte visual vigente.

Depois da auditoria de 2026-09-13:
- RF01–RF29 estão canônicos; RF30 permanece proposta;
- RNF01–RNF03 estão canônicos;
- US-001–US-035 têm título, ator, enunciado, origem única, owner e rastreabilidade;
- US-036 permanece proposta;
- T01–T17 têm rastreabilidade funcional;
- T01–T17 agora têm nodes Figma atuais mapeados (**17/17**);
- estados atuais foram inventariados;
- `prototypeIA` foi classificada como histórica;
- dívida de wiring/nomenclatura do protótipo foi isolada na Issue #84 e em `PROTOTYPE_INTEGRITY.yaml`.

Isso deixa o GitHub **ideal para iniciar a refatoração severa de design com Codex**, desde que os gates abertos sejam respeitados. “Ideal para começar” não significa que todas as decisões de produto estejam resolvidas.

## Fontes de autoridade

1. Issues/requisitos aprovados e documentos canônicos do GitHub.
2. Registries estruturados do repositório.
3. Figma atual para decisões visuais.
4. Inferência somente quando inevitável e marcada.

O Figma nunca aprova requisito, permissão, papel ou critério de aceite.

## Escopo principal

17 telas:
- David: T01, T02, T12, T13, T14, T15.
- Rhuan: T03, T04, T09, T11.
- Henrique: T05, T07, T08, T10.
- Kauã: T06, T16, T17.

35 US aprovadas:
- David 9;
- Rhuan 9;
- Henrique 9;
- Kauã 8.

## Gates funcionais/documentais que continuam abertos

- **P01 / #73:** checklist individual de critérios de aceite por US não existe nas fontes canônicas.
- **P03 / #75:** permissões de escrita ainda não são completamente determinísticas.
- **P04 / #76:** superfície formal das notificações N01–N04 ainda não está decidida.
- **P05 / #77:** quem pode exportar CSV ainda precisa ser decidido.
- **P06 / #78:** composição efetiva de permissões quando papéis acumulam ainda precisa ser formalizada.

Nenhum agente deve “resolver” esses itens pelo desenho.

## Proposta controlada

RF30/#34 + US-036/#72 = acesso próprio somente leitura da Pessoa Idosa.

Existem frames T12 que exploram visualmente essa proposta. Eles estão registrados como `proposal_only`. Não devem ser propagados para produto/implementação até aprovação explícita.

## Integridade do protótipo

Issue #84 acompanha erros confirmados no Figma:
- referência a frame LEGADO em T08;
- três CTAs T10 ligados a T08;
- salto T16 → T06;
- entradas T12 → T16/T17 sem click;
- nomes semânticos incorretos em layers T13.

Esses defeitos devem ser corrigidos antes de qualquer decisão baseada em wiring do protótipo.

## Design system vigente

Primitives devem seguir a ordem:
1. componente local aprovado;
2. Obra/shadcn existente;
3. library vinculada;
4. componente local novo somente quando não houver equivalente.

Tokens oficiais estão em `docs/04_DESIGN_SYSTEM/DESIGN_TOKENS.md`, com grid mobile 390 px, margem 16 px, Geist/Inter, touch target mínimo 48x48 e cores semânticas de estado.

## Preflight obrigatório do Codex

Antes de qualquer alteração:
1. ler `AGENTS.md`;
2. ler este arquivo;
3. resolver requisitos e Issues;
4. ler `SCREEN_REGISTRY.yaml` + `STATE_MATRIX.yaml`;
5. ler `FIGMA_REGISTRY.yaml` + `PROTOTYPE_INTEGRITY.yaml`;
6. consultar `SCREENS_CATALOG.md` e `TRACEABILITY_MATRIX.md`;
7. consultar tokens/component map;
8. inspecionar o frame atual no Figma;
9. só então editar.

## Estratégia recomendada para a grande refatoração

Não redesenhar T01–T17 de uma vez.

Ordem segura:
1. corrigir/neutralizar dívida de integridade #84;
2. auditar shell, navegação, tokens e primitives;
3. eleger telas-base de referência por fluxo;
4. normalizar componentes;
5. refatorar uma T## e seus estados irmãos por vez;
6. validar visualmente;
7. atualizar registries;
8. commit pequeno + PR;
9. revisão humana.

## Definition of Ready do ambiente

- [x] fonte operacional única definida;
- [x] RF/RNF/US indexados;
- [x] owner de cada T## definido;
- [x] T01–T17 mapeadas no Figma;
- [x] estados atuais inventariados;
- [x] frames legados distinguidos;
- [x] ambiguidades T08 resolvidas;
- [x] proposal-only explicitado;
- [x] defeitos de protótipo registrados;
- [x] design tokens e component map disponíveis;
- [x] CI de contexto existente;
- [ ] Issue #84 corrigida no Figma;
- [ ] P03/P04/P05/P06 resolvidas quando forem necessárias para uma entrega específica.

O ambiente está pronto para **começar** a refatoração; os itens não marcados não bloqueiam auditoria visual/estrutural, mas bloqueiam decisões funcionais específicas.
