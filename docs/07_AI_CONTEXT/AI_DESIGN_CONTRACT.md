# AI Design Contract

Contrato operacional para agentes que criam, corrigem ou auditam telas do projeto.

## Objetivo

Permitir comandos de alto nível como `execute a T14` ou `faça a próxima tela do David` sem depender de mega-prompts e sem perder consistência entre telas, estados, requisitos e Figma.

## Fonte única e pipeline obrigatório

O GitHub `webkauadev/rede-de-apoio` é a fonte única operacional para RF, RNF, US, Issues, tarefas e critérios de aceitação. O Figma é a fonte visual.

`GitHub → Context Pack → Figma existente → Componentes/tokens → Construção → Auditoria → Registry → Commit → Pull Request`

Se um requisito necessário não estiver no GitHub, marcar `migration_required`. O agente **não consulta tracker externo** e **não inventa** o conteúdo ausente.

### 1. Resolver a entrega

Antes de editar o Figma, o agente deve determinar no GitHub:

- identificador da tela (`T##`);
- responsável atual;
- RF/RNF/US e GitHub Issues relacionados;
- critérios de aceitação disponíveis;
- regras de negócio aplicáveis;
- estados necessários;
- página/node atual no Figma;
- telas aprovadas que servem de referência;
- componentes e tokens disponíveis;
- direção Material 3 vigente registrada em `PROJECT_DECISIONS.md` e `SITEMAP.md`.

Se RF/RNF/US, permissão ou critério crítico estiver ausente, registrar `migration_required` e não preencher a lacuna por inferência. Correções puramente visuais/estruturais podem continuar quando não alterarem comportamento.

### 2. Inspecionar antes de desenhar

A ordem de descoberta visual é:

1. frame vigente da própria tela;
2. estados vigentes da mesma tela;
3. `Design Foundation` e direção TARGET vigente;
4. telas aprovadas do mesmo responsável/fluxo;
5. componentes locais reutilizáveis;
6. componentes Obra/shadcn e bibliotecas disponíveis;
7. criação de novo componente, somente como último recurso.

Frames com `LEGADO —` não são referência principal quando houver frame vigente.

### 3. Regra de consistência entre estados

Um estado **não é uma nova tela**.

Sempre definir um estado-base e herdar dele. O agente deve comparar estados irmãos antes e depois da alteração.

- **Default/Normal**: estrutura canônica.
- **Loading**: preservar shell e geometria; substituir apenas conteúdo dependente de carregamento por skeleton/progress apropriado.
- **Empty**: preservar navegação, cabeçalho, largura e contexto; trocar apenas a região de dados por empty state e CTA aplicável.
- **Validation Error/Error**: preservar formulário e valores válidos; alterar somente controles/feedback relacionados ao erro.
- **Success**: preservar a tela após a ação e adicionar/alterar somente feedback e conteúdo realmente afetado.
- **Forbidden/Access denied**: preservar contexto suficiente para orientação sem expor ações/dados não autorizados.

Quando um novo estado for necessário, registrá-lo em `STATE_MATRIX.yaml` junto do node do Figma.

### 4. Componentes e Design System

Regras obrigatórias:

- reutilizar instance existente sempre que possível;
- não redesenhar um componente que já possui equivalente semântico;
- usar shadcn/Obra quando houver equivalente adequado;
- componentes próprios do domínio devem ser locais e reutilizáveis;
- não detachar instances sem necessidade documentada;
- usar Auto Layout para relações estruturais;
- usar tokens existentes para cor, espaçamento, raio e tipografia;
- manter áreas de toque e legibilidade adequadas ao contexto mobile;
- componentes novos devem ter propósito claro, nome semântico e reutilização plausível.

Consultar `COMPONENT_MAP.yaml` antes de criar qualquer primitive equivalente a Button, Input, Select, Textarea, Dialog, Sonner/Toast, Badge, Switch, Card, navigation, Sheet ou componente de domínio já mapeado.

### 4.1 Foundation canônica e transição

Antes de migrar uma tela, inspecionar a página Figma `Design Foundation` (`5639:21448`) e o bloco `foundation` de `COMPONENT_MAP.yaml`.

A foundation continua TARGET para:

- grid 390/16/358;
- tipografia Geist sem texto estrutural abaixo de 14 px;
- controls com target >= 48 × 48 px;
- `BaseCard`;
- feedbacks;
- state architecture.

O alvo de 48 px é uma composição do produto, não uma alegação sobre a primitive: `Button - Nova / Default` mantém 32 px visuais e `Input - Nova`/`Select - Nova / Large` mantêm 36 px visuais. Usar `Action / Touch Target 48` e `Field / Control / Touch Target 48` para centralizar as instances Obra sem modificar seus component sets.

### 4.2 Material Design 3 — direção obrigatória de UX

Material Design 3 é referência para **decisões de UX**, não biblioteca visual do projeto.

Regra:

`Material 3 UX principles → Obra/shadcn/local primitives → identidade Rede de Apoio`

Não importar SDK Material, Google Sans, paleta Google ou substituir primitives locais por componentes Google apenas para imitar Material.

#### Header TARGET

- `AppHeader / Root`: título da página como informação primária; contexto da Pessoa Idosa como secundário quando aplicável; ação global deliberada de Configurações à direita.
- `AppHeader / Back`: voltar + título explícito + contexto/ação opcional quando necessário e autorizado.
- avatar pode permanecer como contexto, mas não pode ser o único conteúdo que define o header.
- ações de app bar devem possuir target >= 48 × 48 px e padding seguro da borda.

#### Navigation Bar TARGET

Destinos primários:

`Home · Agenda · Diário · Saúde`

Regras:

- `Mais` não pertence ao TARGET;
- Configurações não substitui `Mais` na Navigation Bar;
- cada item é um destino singular, com ícone + label;
- item ativo usa indicador/surface + ícone/label, não apenas cor;
- targets >= 48 × 48 px;
- distribuição equilibrada e safe area obrigatórias.

#### Configurações e gestão

T12–T17 continuam funcionais e não mudam de escopo.

O TARGET de acesso global é:

`AppHeader / Root → Configurações → Settings / Management Sheet`

O Sheet deve reutilizar `Sheet` local/Obra/shadcn quando adequado e organizar:

- T12 Pessoa Idosa;
- T13 Rede de Cuidado;
- T14 Contatos;
- T15 Emergência;
- T16 Preferências;
- T17 Auditoria.

Essa organização é UX/IA visual. Não concede permissões e não cria RF/RNF/US.

### 4.3 Gate temporário para novas migrações

Até o PR da revisão Material 3 da `Design Foundation` receber revisão humana:

- `T06 / Header / Pessoa` como referência global = `DEPRECATED_FOR_NEW_MIGRATIONS`;
- `compFooter`/BottomNavigation atual de cinco itens = `DEPRECATED_FOR_NEW_MIGRATIONS`;
- nenhuma tela autenticada pode usar esses padrões antigos como TARGET;
- nenhuma tela autenticada pode receber os componentes TARGET recém-criados;
- depois da revisão humana, T03 deve validar o novo `AppShell / Root`;
- T01/T02 continuam como fluxo independente de `AuthShell`.

Não aplicar essa mudança como alteração funcional: RF30/US-036, P01, P03–P06 e FI-001–FI-008 continuam governados pelos documentos e Issues canônicos.

### 5. Auditoria obrigatória

Após cada alteração relevante:

#### Auditoria estrutural

- componentes corretos são instances?
- Auto Layout está sendo usado onde há relação estrutural?
- há overflow ou clipping acidental?
- estados irmãos mantêm dimensões e hierarquia coerentes?
- existem valores visuais fora dos tokens sem justificativa?
- algum frame legado foi alterado por engano?
- algum header/footer deprecated foi propagado por engano?

#### Auditoria visual

Gerar screenshot do frame final e verificar alinhamento, hierarquia visual, legibilidade, contraste, densidade, espaçamento, consistência com telas de referência, feedback de estados, áreas de toque, safe areas e risco de toque acidental.

Encontrando problema, corrigir e auditar novamente.

### 6. Registro da alteração

Toda tela criada/corrigida deve deixar contexto suficiente para o próximo agente:

- `SCREEN_REGISTRY.yaml`: identidade, owner, estado de mapeamento e referências;
- `STATE_MATRIX.yaml`: estados e nodes vigentes;
- `FIGMA_REGISTRY.yaml`: arquivo/página/nodes e convenções;
- `COMPONENT_MAP.yaml`: novos componentes reutilizáveis ou mapeamentos descobertos;
- documentação de requisitos/Issues no GitHub quando houver mudança funcional aprovada;
- `migration_required` explícito para qualquer lacuna funcional ainda não migrada.

### 7. GitHub workflow

Branch sugerida: `design/t##-slug` ou `chore/ai-design-*` para infraestrutura.

Commits devem representar mudanças lógicas pequenas, por exemplo:

- `design(t06): normalize diary loading state`
- `docs(figma): register t06 state nodes`
- `docs(design): map care record card`

O Pull Request deve ficar aberto para revisão humana. Não fazer merge automático por padrão.

## Critério para comando autônomo

Ao receber `faça a próxima tela de <responsável>`:

1. consultar `CURRENT_PROJECT_STATE.md` e verificar se há gate global de Foundation;
2. consultar `SCREEN_REGISTRY.yaml`;
3. consultar as Issues/requisitos do próprio GitHub;
4. selecionar a próxima tela desse responsável somente se a Foundation vigente autorizar migração;
5. se houver dado funcional ausente, marcar `migration_required` e não buscar fora do GitHub;
6. executar todo este contrato;
7. entregar Figma + branch/commits + PR para revisão.

Ao receber `execute T##`, usar exatamente a tela solicitada e não expandir escopo funcional sem requisito canônico no GitHub. Se a Foundation estiver bloqueada por revisão global, primeiro informar o bloqueio e executar somente a revisão de Foundation autorizada.
