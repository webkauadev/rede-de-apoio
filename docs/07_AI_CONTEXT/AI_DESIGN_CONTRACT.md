# AI Design Contract

Contrato operacional para agentes que criam, corrigem ou auditam telas do projeto Rede de Apoio.

## Objetivo

Permitir comandos de alto nível como `execute T14` ou `faça a próxima tela do David` sem depender de mega-prompts e sem perder consistência entre requisitos, estados, design system, Figma e GitHub.

## Fonte única e pipeline obrigatório

O GitHub `webkauadev/rede-de-apoio` é a fonte única operacional para RF, RNF, US, Issues, tarefas e critérios de aceitação. O Figma é a fonte visual/prototípica.

`GitHub → Context Pack → Fluxo Final → Componentes/tokens → Construção → Auditoria → Registry → Commit → Pull Request`

Se um requisito necessário não estiver no GitHub, marcar `migration_required`. O agente não consulta tracker externo e não inventa conteúdo ausente.

## 1. Resolver a entrega antes de editar

Determinar no GitHub:

- tela `T##` e owner;
- RF/RNF/US e Issues relacionados;
- critérios de aceite realmente disponíveis;
- regras de negócio/permissões aplicáveis;
- estados necessários;
- node canônico no `Fluxo Final`;
- componentes/tokens disponíveis;
- direção Material 3 vigente.

P03/P04/P05/P06 foram resolvidos canonicamente em 2026-09-14. RF30/US-036 foram aprovados canonicamente na mesma data. P01/#73 foi resolvido em 2026-09-15; critérios individuais de aceite de US-001–US-036 estão em `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml`.

## 2. Inspecionar antes de desenhar

Ordem visual:

1. node canônico no `Fluxo Final` (`5926:1014`);
2. estados canônicos da mesma T##;
3. `Design Foundation` e componentes Foundation;
4. `MATERIAL3_VISUAL_DIRECTION.md`;
5. componentes locais reutilizáveis;
6. Obra/shadcn e libraries disponíveis;
7. owner pages apenas como histórico/fonte de migração;
8. novo componente apenas como último recurso.

Frames `LEGADO —` e `prototypeIA` não são referência primária quando existir equivalente canônico.

## 3. Regra de consistência entre estados

Um estado não é uma nova tela.

**STATE = PAGE BASE + DELTA MÍNIMO**

- Default/Normal: estrutura canônica.
- Loading: preserva shell/geometria e troca só conteúdo dependente de carregamento.
- Empty: preserva contexto e substitui região de dados por empty state/CTA aplicável.
- Validation Error/Error: preserva formulário e altera apenas controles/feedback envolvidos.
- Success: preserva tela e adiciona somente resultado/feedback necessário.
- Forbidden/Access denied: preserva orientação sem expor conteúdo protegido.
- Notificação transitória: usa feedback do AppShell sem criar tela/central dedicada.
- Estado de configuração RF30: permanece estado de T12, não nova tela.

Todo estado canônico deve estar em `STATE_MATRIX.yaml` e `FIGMA_REGISTRY.yaml`.

## 4. Componentes e Design System

- reutilizar instance existente sempre que possível;
- não redesenhar componente com equivalente semântico;
- usar Obra/shadcn quando adequado;
- componentes próprios do domínio devem ser locais/reutilizáveis;
- não detachar instances sem necessidade documentada;
- usar Auto Layout para relações estruturais;
- usar tokens semânticos existentes;
- touch targets >=48 × 48 px;
- tipografia estrutural >=14 px salvo exceção explicitamente aprovada;
- novo componente exige propósito semântico e reutilização plausível.

Consultar `COMPONENT_MAP.yaml` antes de criar primitive equivalente a Button, Input, Select, Textarea, Dialog, Sonner/Toast, Badge, Switch, Card, Navigation, Sheet ou componente de domínio já mapeado.

## 5. Material Design 3 — autoridade UX/design

Material Design 3 é a referência de maior prioridade para UX/design visual, subordinada à verdade funcional aprovada no GitHub.

Regra:

`Requisito aprovado → padrão/role M3 → token semântico Rede de Apoio → Obra/shadcn/local primitive → tela`

Não importar SDK Material, Google Sans ou paleta baseline Google apenas para imitar Android.

Antes de escolher cor/surface/container/navegação:

1. identificar padrão/papel M3;
2. escolher papel semântico correto;
3. mapear para token Rede de Apoio;
4. escolher primitive existente.

Não usar token de função diferente apenas para eliminar hardcode.

### Header canônico

- `AppHeader / Root`: título primário + contexto da Pessoa Idosa quando aplicável + ação global deliberada de Configurações.
- `AppHeader / Back`: voltar + título explícito + contexto/ação opcional quando necessário.
- ações de app bar >=48×48 px.

### Navigation Bar canônica

`Home · Agenda · Diário · Saúde`

- `Mais` não pertence ao TARGET;
- Configurações vive no header, não como quinta aba;
- item ativo usa container/ênfase semântica apropriada;
- targets >=48×48 px;
- safe area obrigatória.

### Configurações e gestão

`AppHeader / Root → Configurações → Settings / Management Sheet`

Destinos: T12, T13, T14, T15, T16, T17.

A organização não concede permissão; comportamento segue GitHub.

## 6. Decisões funcionais que afetam design

### P03 — escrita/correção

- Principal pode criar registros compatíveis.
- Apoio/Emergência escrevem quando Plantonista Atual ou quando possuírem responsabilidade operacional explicitamente atribuída.
- Profissional da Saúde escreve registros do próprio domínio enquanto vinculado/autorizado.
- correção RN-006 exige permissão efetiva para produzir o mesmo tipo de registro e sempre cria nova versão vinculada.

O design pode ocultar/desabilitar ações conforme a permissão decidida; não pode ampliar acesso.

### P04 — notificações

Não criar Central de Notificações/sino dedicado.

- N01 → feedback transitório global → T04;
- N02 → feedback transitório global obrigatório → T05;
- N03 → feedback transitório global → T05/T07;
- N04 → feedback transitório global → T05, com resumo possível em T03.

T16 configura somente notificações opcionais.

### P05 — exportação CSV

Na primeira versão, E13/T07 é exclusivo do Familiar Principal e a operação é auditada.

### P06 — papéis acumulados

Permissão efetiva = união das permissões positivas, preservando restrições explícitas de segurança/privacidade/escopo e condições contextuais. Não duplicar notificações por acúmulo.

### RF30 / US-036 — Pessoa Idosa

Escopo aprovado:

- mesma autenticação do aplicativo;
- conta vinculada ao próprio perfil;
- consulta somente do próprio cuidado autorizado;
- somente leitura;
- sem papéis familiares;
- nunca Plantonista Atual;
- sem criar/corrigir/concluir/alterar;
- sem administrar rede;
- sem CSV;
- senha definida pelo titular;
- acesso negado bloqueado/auditado;
- sem aplicativo separado.

Na interface, ações de escrita/administração devem ser omitidas ou desabilitadas no contexto Pessoa Idosa, conforme o padrão visual aplicável, sem criar função nova.

## 7. Auditoria obrigatória

Após alteração:

### Estrutural
- instances corretas?
- Auto Layout adequado?
- overflow/clipping acidental?
- estados irmãos coerentes?
- tokens corretos semanticamente?
- algum legado alterado por engano?
- targets <48 px?
- reaction aponta para node canônico?

### Visual
Gerar screenshot e verificar hierarquia, legibilidade, contraste, densidade, espaçamento, feedback, áreas de toque, safe areas e coerência M3/Rede de Apoio.

Encontrando problema, corrigir e auditar novamente.

## 8. Registro da alteração

Atualizar quando aplicável:

- `SCREEN_REGISTRY.yaml`;
- `STATE_MATRIX.yaml`;
- `FIGMA_REGISTRY.yaml`;
- `PROTOTYPE_INTEGRITY.yaml`;
- `COMPONENT_MAP.yaml`;
- Issues/requisitos afetados;
- `CURRENT_PROJECT_STATE.md` quando a mudança alterar o preflight.

## 9. GitHub workflow

- branch específica (`design/t##-*`, `feat/*`, `docs/*` ou `chore/*`);
- commits lógicos pequenos;
- `python scripts/validate_agent_context.py`;
- Pull Request para revisão humana;
- merge somente após gate acordado/revisão explícita.

## 10. Comando autônomo

Ao receber `faça a próxima tela de <responsável>`:

1. ler `CURRENT_PROJECT_STATE.md`;
2. consultar `SCREEN_REGISTRY.yaml`/`STATE_MATRIX.yaml`;
3. resolver Issues/requisitos;
4. inspecionar `Fluxo Final`;
5. executar este contrato;
6. entregar Figma + registries + PR.

Ao receber `execute T##`, usar exatamente a tela solicitada e não expandir escopo funcional sem requisito canônico.
