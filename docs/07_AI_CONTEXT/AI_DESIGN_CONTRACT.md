# AI Design Contract

Contrato operacional para agentes que criam, corrigem ou auditam telas do projeto.

## Objetivo

Permitir comandos de alto nível como `execute a T14` ou `faça a próxima tela do David` sem depender de mega-prompts e sem perder consistência entre telas, estados, requisitos e Figma.

## Pipeline obrigatório

`GitLab → Context Pack → Figma existente → Componentes/tokens → Construção → Auditoria → Registry → Commit → Pull Request`

### 1. Resolver a entrega

Antes de editar o Figma, o agente deve determinar:

- identificador da tela (`T##`);
- responsável atual;
- RF/RNF/US relacionados no GitLab;
- regras de negócio aplicáveis;
- estados necessários;
- página/node atual no Figma;
- telas aprovadas que servem de referência;
- componentes e tokens disponíveis.

Se qualquer item crítico estiver indefinido, buscar a informação nas fontes existentes. Não preencher lacunas com requisitos inventados.

### 2. Inspecionar antes de desenhar

A ordem de descoberta visual é:

1. frame vigente da própria tela;
2. estados vigentes da mesma tela;
3. telas aprovadas do mesmo responsável/fluxo;
4. componentes locais reutilizáveis;
5. componentes Obra/shadcn e bibliotecas disponíveis;
6. criação de novo componente, somente como último recurso.

Frames com `LEGADO —` não são referência principal quando houver frame vigente.

### 3. Regra de consistência entre estados

Um estado **não é uma nova tela**.

Sempre definir um estado-base e herdar dele. O agente deve comparar estados irmãos antes e depois da alteração.

- **Default/Normal**: estrutura canônica.
- **Loading**: preservar shell e geometria; substituir apenas conteúdo dependente de carregamento por skeleton/progress apropriado.
- **Empty**: preservar navegação, cabeçalho, largura e contexto; trocar apenas a região de dados por empty state e CTA aplicável.
- **Validation Error/Error**: preservar formulário e valores válidos; alterar somente controles/feedback relacionados ao erro.
- **Success**: preservar a tela após a ação e adicionar/alterar somente feedback e conteúdo realmente afetado.
- **Forbidden/Access denied**: preservar o contexto suficiente para o usuário compreender onde está, sem expor ações não autorizadas.

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

Consultar `COMPONENT_MAP.yaml` antes de criar qualquer primitive equivalente a Button, Input, Select, Textarea, Dialog, Sonner/Toast, Badge, Switch, Card, navigation ou componente de domínio já mapeado.

### 5. Auditoria obrigatória

Após cada alteração relevante:

#### Auditoria estrutural

- componentes corretos são instances?
- Auto Layout está sendo usado onde há relação estrutural?
- há overflow ou clipping acidental?
- estados irmãos mantêm dimensões e hierarquia coerentes?
- existem valores visuais fora dos tokens sem justificativa?
- algum frame legado foi alterado por engano?

#### Auditoria visual

Gerar screenshot do frame final e verificar:

- alinhamento;
- hierarquia visual;
- legibilidade;
- contraste;
- densidade;
- espaçamento;
- consistência com telas de referência;
- feedback de loading/error/success/empty;
- áreas de toque e ações principais.

Encontrando problema, corrigir e auditar novamente.

### 6. Registro da alteração

Toda tela criada/corrigida deve deixar contexto suficiente para o próximo agente:

- `SCREEN_REGISTRY.yaml`: identidade, owner, estado de mapeamento e referências.
- `STATE_MATRIX.yaml`: estados e nodes vigentes.
- `FIGMA_REGISTRY.yaml`: arquivo/página/nodes e convenções.
- `COMPONENT_MAP.yaml`: novos componentes reutilizáveis ou mapeamentos descobertos.
- documentação canônica relevante quando houver decisão nova.

### 7. Git workflow

Branch sugerida:

`design/t##-slug` ou `chore/ai-design-*` para infraestrutura.

Commits devem representar mudanças lógicas pequenas, por exemplo:

- `design(t06): normalize diary loading state`
- `docs(figma): register t06 state nodes`
- `docs(design): map care record card`

O Pull Request deve ficar aberto para revisão humana. Não fazer merge automático por padrão.

## Critério para comando autônomo

Ao receber `faça a próxima tela de <responsável>`:

1. consultar `SCREEN_REGISTRY.yaml`;
2. selecionar a próxima tela desse responsável com trabalho pendente ou estado incompleto;
3. confirmar os requisitos no GitLab;
4. executar todo este contrato;
5. entregar Figma + branch/commits + PR para revisão.

Ao receber `execute T##`, usar exatamente a tela solicitada e não expandir escopo funcional sem requisito oficial.
