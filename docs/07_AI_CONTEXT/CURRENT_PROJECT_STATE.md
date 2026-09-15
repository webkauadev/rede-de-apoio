# Estado Atual do Projeto — Readiness para Codex

Data de consolidação: **2026-09-14**.

## Veredito

O repositório `webkauadev/rede-de-apoio` permanece a **fonte operacional única** para requisitos, User Stories, regras de negócio, decisões, rastreabilidade e contexto de agentes. O Figma `tcyj2fkTXei2CJbqaRxqCp` é a fonte visual canônica.

O ciclo de consolidação visual/prototípica T01–T17 foi concluído. A página **`Fluxo Final`** (`5926:1014`) é o protótipo canônico de usuário final; owner pages permanecem como histórico/fonte de migração quando houver equivalente no `Fluxo Final`.

Situação confirmada:

- RF01–RF30 canônicos;
- RNF01–RNF03 canônicos;
- US-001–US-036 oficiais;
- US-036 atribuída a David;
- T01–T17 rastreadas e mapeadas;
- Design Foundation Material 3 aprovada e usada como base visual;
- Navigation Bar principal: `Home · Agenda · Diário · Saúde`;
- T12–T17 acessíveis pela arquitetura `Settings / Management Sheet`;
- LocalSubnav reutilizável consolidada para Saúde, Diário e Controle/Privacidade;
- Issue #84 de integridade do protótipo encerrada como concluída;
- PR #103 consolidou documentalmente o protótipo final;
- PR #104 resolveu a dívida semântica FI-008 em T13;
- P03/P04/P05/P06 foram resolvidas canonicamente em 2026-09-14;
- RF30/US-036 foram aprovados canonicamente em 2026-09-14.

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

A aprovação posterior de RF30/US-036 exige agora incorporar o acesso read-only da Pessoa Idosa ao protótipo canônico, usando os estados históricos já explorados apenas como fonte de design até sua migração Material 3 e auditoria.

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

O Figma nunca aprova requisito, permissão, papel ou critério de aceite.

## Escopo principal

17 telas:

- David: T01, T02, T12, T13, T14, T15;
- Rhuan: T03, T04, T09, T11;
- Henrique: T05, T07, T08, T10;
- Kauã: T06, T16, T17.

36 US aprovadas:

- David 10;
- Rhuan 9;
- Henrique 9;
- Kauã 8.

## Decisões funcionais canônicas — 2026-09-14

### P03 / #75 — escrita e correção

- Familiar Principal pode criar registros compatíveis com o cuidado.
- Familiar de Apoio e Familiar de Emergência podem criar registros quando forem Plantonista Atual ou possuírem responsabilidade operacional explicitamente atribuída.
- Profissional da Saúde pode criar registros de saúde do seu domínio enquanto estiver vinculado e autorizado.
- Correção RN-006 pode ser criada por quem possuir permissão efetiva para produzir o mesmo tipo de registro; não é restrita ao autor original.
- Correção sempre gera nova versão vinculada e preserva o original.

### P04 / #76 — superfície de notificações

Não existe Central de Notificações dedicada.

N01–N04 usam feedback transitório global no AppShell (Snackbar/Sonner) e, quando houver ação, levam a telas já existentes:

- N01 → T04;
- N02 → T05;
- N03 → T05 ou T07 conforme o registro;
- N04 → T05, podendo também refletir resumo operacional em T03.

T16 configura somente notificações opcionais.

### P05 / #77 — exportação CSV

Na primeira versão, somente o Familiar Principal pode exportar CSV.

A exportação é contextual em T07, limitada ao histórico autorizado da Pessoa Idosa selecionada e auditada conforme RF29/RNF03.

### P06 / #78 — papéis acumulados

A permissão efetiva resulta da união das permissões positivas dos papéis familiares acumulados.

Restrições explícitas de segurança, privacidade, escopo e condições contextuais prevalecem. Acumular papéis não elimina uma condição operacional exigida. Notificações não são duplicadas por acúmulo.

## RF30 / US-036 — Pessoa Idosa read-only

Status: **aprovado canonicamente**.

Owner da US-036: **David**.

Regras:

- mesma autenticação do aplicativo;
- conta vinculada ao próprio perfil;
- consulta somente informações autorizadas do próprio cuidado;
- acesso somente leitura;
- nenhum papel familiar;
- não pode ser Plantonista Atual;
- nenhuma criação, correção, conclusão ou alteração de registros;
- nenhuma administração da rede;
- nenhuma exportação CSV na primeira versão;
- senha definida pelo próprio titular;
- acessos negados sujeitos a RNF01/RNF03;
- sem app separado.

## Gate documental ainda aberto

- **P01 / #73:** checklist individual de critérios de aceite por US ainda exige consolidação documental.

Agentes não devem inventar critérios ausentes. Critérios podem ser derivados somente quando estiverem diretamente suportados pelo requisito de origem, regras de negócio e decisões canônicas.

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
- [x] RF01–RF30 indexados;
- [x] US-001–US-036 indexadas;
- [x] owner de cada T## definido;
- [x] T01–T17 mapeadas no Figma;
- [x] estados inventariados;
- [x] frames legados distinguidos;
- [x] tokens e component map disponíveis;
- [x] direção Material 3 documentada e aprovada;
- [x] Foundation estrutural de header/navigation criada;
- [x] padrões de LocalSubnav consolidados;
- [x] `Fluxo Final` T01–T17 consolidado e conectado;
- [x] audit de integridade do protótipo concluído;
- [x] Issue #84 encerrada;
- [x] P03/P04/P05/P06 resolvidas;
- [x] RF30/US-036 aprovados;
- [ ] P01 resolvida quando critérios individuais completos forem necessários.

## Próximo trabalho correto

1. migrar e auditar no Figma os estados read-only necessários à US-036, agora que RF30/US-036 foram aprovados;
2. refletir no protótipo as superfícies de N01–N04 e as permissões decididas em P03/P05/P06 sem criar novas áreas;
3. iniciar implementação/código a partir do `Fluxo Final` e das regras canônicas;
4. resolver P01 quando uma entrega exigir critérios individuais não suportados diretamente pelas fontes atuais.

Não reabrir redesign geral das telas sem requisito, defeito ou decisão canônica que justifique a alteração.
