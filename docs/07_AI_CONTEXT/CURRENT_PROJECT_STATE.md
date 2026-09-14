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

Material Design 3 é agora a **autoridade máxima no domínio de UX/design visual**, subordinada somente aos requisitos funcionais e regras de negócio aprovados no GitHub.

Documento canônico:

`docs/04_DESIGN_SYSTEM/MATERIAL3_VISUAL_DIRECTION.md`

Regra vigente:

`Requisito aprovado → padrão/role M3 → token semântico Rede de Apoio → Obra/shadcn/local primitive → tela`

Isso significa que Material 3 não é apenas uma referência genérica de interação: ele governa hierarquia, navegação, app bars, estados, papéis de cor/surface, ergonomia, acessibilidade e adaptação. Obra/shadcn continuam sendo meios de implementação. A identidade continua Rede de Apoio.

Não adotar SDK Material, Google Sans, paleta baseline Google ou componentes Google apenas para copiar aparência Android.

### TARGET de navegação/header

- `AppHeader / Root`: título da página como informação primária, contexto da Pessoa Idosa como secundário quando aplicável e ação global deliberada de Configurações;
- `AppHeader / Back`: voltar + título explícito + contexto/ação opcional quando necessário e autorizado;
- Navigation Bar primária mobile: `Home · Agenda · Diário · Saúde`;
- `Mais` é removido do TARGET da Navigation Bar;
- T12–T17 passam a ser organizadas como destinos secundários acessíveis por `Settings / Management Sheet`, disparado pelo header;
- targets de interação permanecem >= 48 × 48 px.

### Achado do review aprofundado do PR #91

A arquitetura do novo AppShell e sua calibração tonal estão materializadas. O PR permanece bloqueado para revisão visual humana e merge.

O problema anterior era semântico/tonal: o active indicator da Navigation Bar estava vinculado diretamente a `Color/Secondary`, produzindo um container saturado. A Foundation agora usa `Color/Secondary Container`/`Color/On Secondary Container`; `M3 Visual Calibration Review` (`5674:559`) preserva a comparação A/B para avaliação humana.

Regra nova:

- não usar um token de papel diferente apenas para eliminar hardcode;
- se o papel M3 correto não existir, criar/mapear o papel semântico adequado;
- tokenização não pode piorar a hierarquia visual;
- a aparência suave anterior do indicador permanece como baseline A congelado;
- o Settings Sheet usa `Color/Surface Container Low`; o scrim semântico mantém o conteúdo reconhecível e inativo.

### Gate temporário de migração

A `Design Foundation` atual continua válida para:

- grid 390/16/358;
- Geist e escala tipográfica;
- Buttons/Fields e wrappers de 48 px;
- BaseCard;
- feedback;
- `STATE = PAGE BASE + DELTA MÍNIMO`;
- arquitetura estrutural de `AppHeader / Root`, `AppHeader / Back`, Navigation Bar de quatro destinos e Settings Sheet criada no PR #91.

Porém, a migração efetiva de telas autenticadas continua **BLOQUEADA** até:

1. obter revisão humana do resultado visual comparativo;
2. mergear o PR #91.

Não iniciar T03, T01 ou qualquer outra T## antes disso.

## Fontes de autoridade

1. Issues/requisitos aprovados e documentos canônicos do GitHub.
2. Registries estruturados do repositório.
3. `MATERIAL3_VISUAL_DIRECTION.md` + fontes oficiais Material 3 para UX/design visual.
4. Figma atual para a implementação visual vigente, desde que não contradiga uma decisão de design mais nova já documentada.
5. Inferência somente quando inevitável e marcada.

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

A ordem acima governa **implementação**, não a decisão de UX. Antes dela, o agente deve resolver o padrão e o papel semântico M3 aplicável.

Tokens oficiais estão em `docs/04_DESIGN_SYSTEM/DESIGN_TOKENS.md`, com grid mobile 390 px, margem 16 px, Geist/Inter, touch target mínimo 48x48 e cores semânticas de estado.

## Preflight obrigatório do Codex

Antes de qualquer alteração:
1. ler `AGENTS.md`;
2. ler este arquivo;
3. ler `PROJECT_DECISIONS.md`, especialmente a Decisão 007;
4. ler `docs/04_DESIGN_SYSTEM/MATERIAL3_VISUAL_DIRECTION.md`;
5. resolver requisitos e Issues;
6. ler `SCREEN_REGISTRY.yaml` + `STATE_MATRIX.yaml`;
7. ler `FIGMA_REGISTRY.yaml` + `PROTOTYPE_INTEGRITY.yaml`;
8. consultar `SITEMAP.md`, `SCREENS_CATALOG.md` e `TRACEABILITY_MATRIX.md`;
9. consultar tokens/component map;
10. inspecionar a `Design Foundation`;
11. somente então editar.

## Estratégia atual de refatoração

Ordem obrigatória:

1. direção M3 documentada no GitHub;
2. arquitetura estrutural Material 3 da Foundation criada;
3. review aprofundado M3 documentado;
4. calibrar roles tonais e surfaces do PR #91 sem desfazer melhorias estruturais;
5. auditar screenshots e roles semânticos;
6. revisão humana;
7. merge do PR #91;
8. usar T03 como primeira prova real do novo `AppShell / Root`;
9. tratar T01/T02 separadamente como `AuthShell`;
10. refatorar uma T## e seus states irmãos por vez.

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
- [x] Material 3 elevado a autoridade máxima de UX/design visual;
- [x] Foundation estrutural de header/navigation criada no Figma;
- [x] novos nodes registrados;
- [ ] calibração visual M3 do PR #91 aprovada;
- [ ] PR #91 mergeado;
- [ ] Issue #84 corrigida no Figma;
- [ ] P03/P04/P05/P06 resolvidas quando forem necessárias para uma entrega específica.

O próximo trabalho visual correto é **revisar visualmente a calibração da Foundation no PR #91**, não migrar uma T##.
