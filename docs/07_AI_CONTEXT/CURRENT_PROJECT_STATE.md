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
- T01–T17 têm nodes Figma atuais mapeados (**17/17**);
- estados atuais foram inventariados;
- `prototypeIA` foi classificada como histórica;
- dívida de wiring/nomenclatura do protótipo foi isolada na Issue #84 e em `PROTOTYPE_INTEGRITY.yaml`;
- a foundation global de tokens, grid, typography, controls e states foi criada e mergeada pelo PR #88.

## Mudança de direção visual — Material Design 3

Após feedback de usabilidade, o direcionamento visual foi revisado.

A Decisão 007 em `PROJECT_DECISIONS.md` estabelece:

`Material 3 UX principles → Obra/shadcn/local primitives → identidade Rede de Apoio`

Material Design 3 passa a ser **referência de UX**, não biblioteca de implementação. O projeto não adota SDK Material, Google Sans, paleta Google ou componentes Google prontos.

### TARGET de navegação/header

- `AppHeader / Root`: título da página como informação primária, contexto da Pessoa Idosa como secundário quando aplicável e ação global deliberada de Configurações;
- `AppHeader / Back`: voltar + título explícito + contexto/ação opcional quando necessário e autorizado;
- Navigation Bar primária mobile: `Home · Agenda · Diário · Saúde`;
- `Mais` é removido do TARGET da Navigation Bar;
- T12–T17 passam a ser organizadas como destinos secundários acessíveis por `Settings / Management Sheet`, disparado pelo header;
- targets de interação permanecem >= 48 × 48 px.

### Gate temporário de migração

A `Design Foundation` atual continua válida para:

- tokens;
- tipografia;
- grid 390/16/358;
- Buttons/Fields e wrappers de 48 px;
- BaseCard;
- feedback;
- `STATE = PAGE BASE + DELTA MÍNIMO`.

Porém, dois padrões ficam **DEPRECATED_FOR_NEW_MIGRATIONS** até revisão no Figma:

- `AppHeader / Contextual` baseado em `T06 / Header / Pessoa`;
- `BottomNavigation`/`compFooter` atual de cinco itens com `Mais`.

Portanto o ambiente está **READY para revisar a Foundation**, mas a migração efetiva de telas autenticadas fica pausada até essa revisão. Não iniciar T01/T03 como próximo passo de Figma antes de materializar a nova arquitetura de navegação.

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

Esses defeitos continuam separados da mudança Material 3 e não podem ser reinterpretados como intenção funcional.

## Design system vigente

Primitives seguem a ordem:
1. componente local aprovado;
2. Obra/shadcn existente;
3. library vinculada;
4. componente local novo somente quando não houver equivalente.

Tokens oficiais estão em `docs/04_DESIGN_SYSTEM/DESIGN_TOKENS.md`, com grid mobile 390 px, margem 16 px, Geist/Inter, touch target mínimo 48x48 e cores semânticas de estado.

Material 3 governa a **decisão de UX**; Obra/shadcn e componentes locais continuam governando a **materialização visual**.

## Preflight obrigatório do Codex

Antes de qualquer alteração:
1. ler `AGENTS.md`;
2. ler este arquivo;
3. ler `PROJECT_DECISIONS.md`, especialmente a Decisão 007;
4. resolver requisitos e Issues;
5. ler `SCREEN_REGISTRY.yaml` + `STATE_MATRIX.yaml`;
6. ler `FIGMA_REGISTRY.yaml` + `PROTOTYPE_INTEGRITY.yaml`;
7. consultar `SITEMAP.md`, `SCREENS_CATALOG.md` e `TRACEABILITY_MATRIX.md`;
8. consultar tokens/component map;
9. inspecionar a `Design Foundation`;
10. somente então editar.

## Estratégia atual de refatoração

Ordem obrigatória após esta decisão:

1. documentar a direção Material 3 no GitHub;
2. revisar `Design Foundation` no Figma;
3. materializar `AppHeader / Root`;
4. revisar `AppHeader / Back`;
5. materializar Navigation Bar de quatro destinos, sem `Mais`;
6. materializar `Settings / Management Sheet` usando Sheet local/Obra quando possível;
7. validar touch targets, safe areas, seleção e prevenção de toque acidental;
8. registrar novos node IDs e atualizar registries;
9. abrir PR da Foundation revisada;
10. após revisão/merge, usar T03 como primeira prova do novo `AppShell / Root`;
11. tratar T01/T02 separadamente como `AuthShell`;
12. refatorar uma T## e seus states irmãos por vez.

## Definition of Ready do ambiente

- [x] fonte operacional única definida;
- [x] RF/RNF/US indexados;
- [x] owner de cada T## definido;
- [x] T01–T17 mapeadas no Figma;
- [x] estados atuais inventariados;
- [x] frames legados distinguidos;
- [x] proposal-only explicitado;
- [x] defeitos de protótipo registrados;
- [x] tokens e component map disponíveis;
- [x] foundation base criada;
- [x] direção Material 3 documentada;
- [ ] Foundation de header/navigation atualizada no Figma;
- [ ] novos nodes `AppHeader / Root`, Navigation Bar e Settings Sheet registrados;
- [ ] Issue #84 corrigida no Figma;
- [ ] P03/P04/P05/P06 resolvidas quando forem necessárias para uma entrega específica.

O próximo trabalho visual correto é **revisar a Foundation**, não migrar uma T## com o header/footer antigos.
