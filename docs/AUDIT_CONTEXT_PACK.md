# Auditoria do Context Pack — Rede de Apoio

Repositório auditado: `webkauadev/rede-de-apoio`
Commit: `08887ec` — *docs: expand project decisions register*
Escopo: 27 arquivos `.md`, 874 linhas. Nenhum código-fonte, nenhum arquivo de protótipo.
Data da auditoria: 2026-09-05

Método: leitura integral do repositório na ordem obrigatória. Nada foi completado com conhecimento externo. Onde uma informação é citada mas não existe no repositório, está classificada como **ausência documental**.

---

## 1. Status geral do Context Pack

### Classificação: **PARCIAL COM INCONSISTÊNCIAS**

Os 10 itens da ordem de leitura agora existem — houve avanço real desde a versão anterior. Mas o pack **não está apto a sustentar prototipação rastreável**, por três motivos estruturais:

**a) A camada US é uma referência, não um catálogo.**
`01_REQUIREMENTS/REQUIREMENTS.md` resolve a camada RF (RF01–RF29 + RF30 em formalização), mas a camada US é resolvida por uma única linha:

> "US-001 a US-035 seguem o catálogo aprovado do projeto."

Nenhuma das 35 US possui enunciado, ator, critério de aceite ou RF de origem declarado neste repositório. Apenas US-036 está escrita. O documento aponta para um catálogo externo que não está no pack.

**b) A camada RNF não existe.**
A cadeia exigida na auditoria é `RF → RNF → US → RN → Site Map → Tela → Estado → Componente`. Não há nenhum RNF documentado. Ainda assim, **RNF01** é usado na matriz de rastreabilidade e **RNF03** é citado como origem do `AuditEntryCard`. São referências a documentos inexistentes.

**c) A matriz de rastreabilidade é uma amostra rotulada como completa.**
O arquivo se chama `TRACEABILITY_MATRIX.md` e o título interno é "Matriz de Rastreabilidade Completa", mas o conteúdo é uma seção chamada "Exemplos consolidados" com 10 linhas. Cobre 9 dos 29 RF (31%) e 9 das 17 telas (53%).

**Consequência prática:** hoje é impossível responder, para a maioria das telas, a pergunta que `SCREEN_STANDARDS.md` torna obrigatória antes de aprovar qualquer design — *"existe requisito para cada ação?"*.

---

## 2. Auditoria de rastreabilidade

### 2.1 Matriz declarada no repositório

| RF | US | Tela | Estado | Componente | Status da auditoria |
|---|---|---|---|---|---|
| RF01 | US001 | T02 Cadastro | Default/Validation | Input, Button, **Field** | ⚠️ `Field` não existe no Design System |
| RF02 | US002 | T01 Login | Default/Error/Loading | Input, Button, **AuthCard** | ⚠️ `AuthCard` não existe no Design System |
| RF06 | US008 | T04 Calendário | Lista/Criação | Calendar, ShiftCard | ✅ consistente |
| RF07 | US009 | T04/T05 | Dia/Semana/Detalhe | Calendar, **DayDetail** | ⚠️ `DayDetail` não existe no Design System |
| RF11 | US015 | T06 Diário | Novo registro/Timeline | CareRecordCard | ✅ consistente |
| RF14 | US017 | T08 Medicamentos | Cadastro/Consulta | MedicationCard | ⚠️ componente ausente da árvore Figma |
| RF21 | US024 | T09 Tarefas | Criar/Concluir | TaskCard | ⚠️ componente ausente da árvore Figma |
| RF22 | US026 | T14 Contatos | Lista/Edição | EmergencyContactCard | ⚠️ componente ausente da árvore Figma |
| RF29 | US033 | T17 Auditoria | Consulta | AuditEntryCard | ⚠️ componente ausente da árvore Figma |
| **RNF01** | US035 | T17/Todas | Acesso negado | AccessStatusCard | 🔴 RNF01 não existe em nenhum documento |

Nenhuma das US citadas (US001, US002, US008, US009, US015, US017, US024, US026, US033, US035) tem enunciado no repositório. A coluna US é, hoje, uma coluna de identificadores sem conteúdo.

### 2.2 RF sem US ou tela rastreada — 21 de 30 (70%)

```
RF03  RF04  RF05  RF08  RF09  RF10  RF12  RF13  RF15  RF16  RF17
RF18  RF19  RF20  RF23  RF24  RF25  RF26  RF27  RF28  RF30
```

Alguns têm correspondência óbvia (RF03 → T12, RF12 → T07, RF20 → T11, RF27 → T16), mas **estabelecer essa ligação seria eu completando o pack**, o que a regra da auditoria proíbe. Registro como ausência documental.

### 2.3 US sem RF

Indeterminável. Sem catálogo de US, não é possível verificar a regra "cada US possui exatamente um requisito de origem" — que é declarada em três documentos (`REQUIREMENTS.md`, `GITLAB.md`, `ISSUE_STRUCTURE.md`) e não é verificável em nenhum.

### 2.4 Telas sem origem funcional declarada — 8 de 17 (47%)

`T03 Home` · `T07 Histórico` · `T10 Consultas` · `T11 Compromissos` · `T12 Perfil` · `T13 Rede de Cuidado` · `T15 Emergência` · `T16 Preferências`

`T03 Home` é o caso mais sério: é a raiz de toda a área autenticada no Site Map, é descrita apenas como "Resumo do cuidado e acessos principais", e não tem RF, US, nem definição de quais dados o resumo exibe. Cada integrante que desenhar a Home vai inventar o conteúdo dela.

### 2.5 Componentes sem finalidade rastreável

| Componente | Situação |
|---|---|
| `AppTopBar` | Obrigatório em toda tela autenticada por `SCREEN_STANDARDS`, mas não aparece em nenhuma linha da matriz. Sem RF de origem. |
| `BottomNavigation` | Idem. Define 5 destinos (Home, Agenda, Diário, Saúde, Mais) que **não correspondem à estrutura do Site Map** — "Saúde" e "Mais" não são nós do Site Map. |
| `AppointmentCard` | Declarado com origem RF19-RF20, mas sem linha na matriz e sem tela atribuída (T10/T11 estão descobertas). |
| `AuthCard`, `Field`, `DayDetail` | Citados na matriz. **Não existem em nenhum documento de Design System.** |

### 2.6 Estado tratado como tela independente

**Não encontrado.** A regra `STATE = PAGE BASE + DELTA MÍNIMO` é declarada de forma consistente em 5 documentos (`CLAUDE.md`, `STATE_MANAGEMENT.md`, `SITEMAP.md`, `SCREEN_STANDARDS.md`, `PROJECT_DECISIONS.md`, `STITCH_PROMPT_RULES.md`) e o Site Map não contém nenhum nó que seja estado disfarçado de tela. Este é o ponto mais forte do pack.

**Porém:** `SCREENS_CATALOG.md` declara estados apenas para T01 e T02. **15 das 17 telas não têm estados declarados**, incluindo empty state — que `SCREEN_STANDARDS.md` cita explicitamente como caso a não duplicar. A regra está protegida, mas não tem o que proteger.

---

## 3. Auditoria de regras de negócio

### 3.1 Familiar — ✅ consistente, com uma lacuna

| Aspecto | RN | USERS_AND_ROLES | PERMISSIONS_MATRIX | Veredito |
|---|---|---|---|---|
| Principal único | RN-001 | "exactly one active" | "Principal é único" | ✅ triplamente consistente |
| Apoio múltiplo | — | "zero or more" | "podem ser múltiplos" | ✅ |
| Emergência múltiplo | — | "zero or more" | "podem ser múltiplos" | ✅ |
| Acumulação | RN-002 | "Roles can accumulate" | "podem acumular" | ⚠️ ver abaixo |

**Lacuna em RN-002.** O texto é circular: *"Um Familiar pode possuir Principal, Apoio e Emergência conforme regras definidas."* — "conforme regras definidas" não define. Não há resposta documentada para: existe combinação proibida? A acumulação altera permissão efetiva (união das permissões? a mais permissiva?)? Isso importa porque `NOTIFICATIONS_RULES.md` já prevê o efeito colateral — "evitar duplicidade por acúmulo de papéis" — sem que a regra de acúmulo esteja definida.

### 3.2 Profissional da Saúde — ✅ separação confirmada, ❌ nomenclatura divergente

A separação está corretamente afirmada em 4 documentos: não recebe papéis familiares. Consistente.

Mas `USERS_AND_ROLES.md` chama a categoria de **"Professional Health User"**, enquanto todos os outros documentos usam **"Profissional da Saúde"**. Nome de ator é chave de rastreabilidade — duas grafias significam duas buscas diferentes no GitLab.

### 3.3 Plantonista Atual — ✅ confirmado, sem violação

| Documento | Afirmação |
|---|---|
| `CLAUDE.md` | "condição temporária, não perfil" |
| `00_PROJECT_CONTEXT.md` | "não é usuário. É uma condição operacional temporária do plantão" |
| `RN-003` | "condição operacional temporária baseada no plantão ativo" |
| `USERS_AND_ROLES.md` | "Not a user category, profile or permanent role" |
| `PERMISSIONS_MATRIX.md` | "não é categoria de usuário" (e corretamente **ausente** das linhas da tabela) |
| `AI_CONTEXT_RULES.md` | listado em "Nunca fazer" |

**Verificação negativa aprovada:** Plantonista Atual não aparece como linha na matriz de permissões, não aparece como categoria no Site Map, e não tem tela própria. Nenhuma violação encontrada.

**Ressalva:** `N02` diz que "o Plantonista Atual recebe lembrete obrigatório". Uma condição não recebe notificação — quem recebe é o usuário que ocupa a condição. É imprecisão de redação, não violação conceitual, mas convida à interpretação errada.

### 3.4 Pessoa Idosa — ⚠️ status divergente entre documentos

**Status correto ("proposta controlada") em 5 documentos:**

| Documento | Marcação |
|---|---|
| `CLAUDE.md` | "está em formalização... extensão controlada até atualização oficial no GitLab" |
| `REQUIREMENTS.md` | RF30 "proposta de evolução até formalização no GitLab"; US-036 "proposta vinculada ao RF30" |
| `RN-009` | "permanece como evolução de escopo até formalização no GitLab" |
| `PROJECT_DECISIONS.md` | Decisão 003 — "tratar como proposta controlada" |
| `CHANGELOG.md` | "permanece marcada como extensão em formalização" |

**Status incorreto em 2 documentos:**

- 🔴 `PERMISSIONS_MATRIX.md` — Pessoa Idosa é a **primeira linha da tabela**, sem qualquer marcação de proposta, apresentada com a mesma autoridade das categorias aprovadas. Um integrante que consulte a matriz para saber "quem pode ver o quê" concluirá que o acesso da Pessoa Idosa é requisito aprovado.
- ⚠️ `00_PROJECT_CONTEXT.md` — lista a Pessoa Idosa dentro de "Categorias" ao lado de Familiar e Profissional. Tem parêntese explicativo ("extensão em formalização"), mas a hierarquia visual a coloca como categoria estabelecida.

**Confirmação solicitada:** o status oficial é **proposta controlada**. RF30 e US-036 **não devem originar tela, componente ou frame no Figma** até formalização no GitLab. Isso torna o `AccessStatusCard` um componente condicional (ver §4.3).

---

## 4. Auditoria do Design System

### 4.1 Uso de shadcn — ✅ estratégia correta e consistente

A separação "shadcn = estrutura / Rede de Apoio = identidade" é afirmada de forma idêntica em `CLAUDE.md`, `DESIGN_SYSTEM.md`, `COMPONENT_ARCHITECTURE.md` (04 e 05), `AI_CONTEXT_RULES.md` e Decisão 002. Sem divergência.

### 4.2 🔴 Existem dois `COMPONENT_ARCHITECTURE.md` divergentes

Este é o achado mais grave da seção.

| | `docs/04_DESIGN_SYSTEM/` | `docs/05_FIGMA/` |
|---|---|---|
| Primitives | 11 | 6 |
| Componentes de domínio | 10 | 5 |

Presentes no Design System e **ausentes da árvore de componentes do Figma**:

```
Primitives:  Avatar · Sheet · Calendar · Toast · Separator
Domínio:     MedicationCard · TaskCard · AppointmentCard
             EmergencyContactCard · AuditEntryCard
```

Dois arquivos com o mesmo nome, em pastas diferentes, com listas diferentes, sem nenhum indicando qual prevalece. E a versão desatualizada é a que está em `05_FIGMA` — a fonte oficial de prototipação.

**Efeito prático:** o integrante que for desenhar T08 Medicamentos abre a árvore do Figma, não encontra `MedicationCard`, e cria um card próprio. O mesmo vale para T09, T10/T11, T14 e T17. **Cinco das dezessete telas induzem à criação de componente duplicado.** É exatamente o risco que `COMPONENT_ARCHITECTURE.md` tenta impedir com a regra "Nenhuma tela deve criar um card isolado".

### 4.3 Componentes — origem declarada

Positivo: `04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md` declara origem RF para 7 dos 10 componentes de domínio. É a melhor prática do pack. Sem origem: `AppTopBar`, `BottomNavigation` e `AccessStatusCard` (este declarado como "componente controlado enquanto RF30 estiver em formalização" — coerente com §3.4, mas note que `AccessStatusCard` **também** é usado na linha RNF01 da matriz, para "acesso negado", que é RN-008/AUDIT_RULES e não RF30. O componente está servindo a dois propósitos com status diferentes).

### 4.4 🔴 Tokens insuficientes para garantir consistência

`DESIGN_TOKENS.md` tem 5 cores, 1 família tipográfica e 1 escala de espaçamento. Faltam tokens para elementos que os próprios documentos exigem:

| Exigido por | Token necessário | Existe? |
|---|---|---|
| `DESIGN_SYSTEM.md` — "Verde suave para estados ativos" | cor de estado ativo | ❌ |
| `DESIGN_SYSTEM.md` — "Sombras leves" | elevação/sombra | ❌ |
| `STATE_MANAGEMENT.md` — estado Error com "mensagem de erro" | cor semântica de erro | ❌ |
| `SCREENS_CATALOG.md` T02 — estado "validação" | cores de sucesso/aviso | ❌ |
| `DESIGN_TOKENS.md` — "Títulos com alta hierarquia" | escala de tamanho, peso, line-height | ❌ |
| `SCREEN_STANDARDS.md` — cards e inputs | raio de borda | ❌ |

Sem cor de erro definida, cada integrante escolherá o próprio vermelho. Isso não é hipótese: é o resultado determinístico de 6 pessoas desenhando estados de erro com um token ausente.

### 4.5 🔴 Contraste — `Border` reprova em WCAG

Cálculo sobre os tokens declarados:

| Combinação | Razão | WCAG |
|---|---|---|
| Primary `#00567C` sobre Surface `#FFFFFF` | **8.01:1** | ✅ AAA |
| Primary `#00567C` sobre Background `#FBF8FF` | **7.62:1** | ✅ AAA |
| Brand `#2A6F97` sobre Surface `#FFFFFF` | **5.50:1** | ✅ AA |
| Brand `#2A6F97` sobre Background `#FBF8FF` | **5.23:1** | ✅ AA |
| **Border `#E5E5E5` sobre Background `#FBF8FF`** | **1.20:1** | 🔴 falha (mín. 3:1 — WCAG 1.4.11) |
| **Border `#E5E5E5` sobre Surface `#FFFFFF`** | **1.26:1** | 🔴 falha |

As cores de texto estão boas. O problema é a borda: `#E5E5E5` é aceitável como divisor decorativo, mas **reprova como borda de componente de interface** (input, card clicável, campo de formulário) — WCAG 2.1 critério 1.4.11 exige 3:1. Num aplicativo cujo usuário final declarado inclui pessoa idosa, borda de input com 1.26:1 é falha de produto, não detalhe estético.

Nota secundária: `Background #FBF8FF` tem matiz lilás (hue ≈ 270°) contra uma paleta declarada como "azul institucional/petróleo" (hue ≈ 200°). Contraste Surface/Background é 1.05:1 — na prática, card branco sobre fundo quase não se distingue.

### 4.6 🔴 Ausência documental: nenhum requisito de acessibilidade

Não há **nenhum** documento no pack que trate de:

- conformidade WCAG (nível alvo);
- tamanho mínimo de fonte;
- tamanho mínimo de alvo de toque;
- suporte a escala de fonte do sistema operacional;
- contraste mínimo;
- leitor de tela / rótulos acessíveis.

`SCREEN_STANDARDS.md` não inclui acessibilidade nos critérios de revisão de tela. Não existe RNF de acessibilidade — não existem RNF, ponto.

Este é o achado de maior risco de produto do pack inteiro: **um aplicativo de cuidado a idosos, com acesso previsto para a própria pessoa idosa, sem um único requisito de acessibilidade documentado.**

### 4.7 Riscos declarados na auditoria — veredito

| Risco | Situação |
|---|---|
| Cada integrante criar seu próprio componente | 🔴 **Alto e já materializado.** Árvore do Figma desatualizada em 8 componentes (§4.2). |
| Telas visualmente incompatíveis | 🔴 **Alto.** Tokens ausentes para erro, sucesso, ativo, sombra, raio, tipografia (§4.4). |
| States tratados como páginas independentes | 🟢 **Baixo.** Regra bem documentada e repetida (§2.6). Mas 15 telas sem estados declarados. |

---

## 5. Auditoria do Figma

### Pergunta da auditoria: existe documentação suficiente para validar telas?
### Resposta: **Não.**

| Item a validar | Documentação | Suficiente? |
|---|---|---|
| Estrutura de camadas | `FIGMA_GUIDELINES.md`: Screen → Header / Content / Components / Actions / Navigation | ⚠️ parcial — é sugestão ("Preferir"), não norma |
| Auto Layout | Exigido em 4 documentos | ✅ |
| Componentes | Duas listas conflitantes | 🔴 §4.2 |
| Variantes | "Criar variantes para estados" | ⚠️ nenhuma variante específica é enumerada; nenhum componente tem seu conjunto de variantes definido |
| Nomenclatura | — | 🔴 **ausência documental**: não há convenção de nome de frame, de variante, de página ou de arquivo. `SCREEN_STANDARDS` pede "responsável" no título sem definir formato |
| Responsividade | "largura 390px, altura adaptável, conteúdo pode rolar" | 🔴 **ausência documental**: sem breakpoints, sem comportamento fora de 390px, sem escala de fonte do sistema |

### 🔴 Ausência documental crítica: o arquivo Figma não está referenciado

Nenhum documento do pack contém link, chave ou identificação do arquivo Figma do projeto. A "fonte oficial de prototipação visual" é, a partir deste repositório, **inauditável**. Não é possível verificar se a árvore de componentes descrita em `05_FIGMA/COMPONENT_ARCHITECTURE.md` corresponde ao que existe no Figma real.

---

## 6. Auditoria GitLab

### 6.1 Modelo documentado — ✅ correto e consistente

`GITLAB.md`, `ISSUE_STRUCTURE.md` e `WORKFLOW.md` descrevem um modelo sólido: RF/RNF como issue de requisito, US como issue de história, cardinalidade 1 requisito → N US, Linked items, proibição de substituir US por Task, DoD que exige validação e não apenas criação de protótipo, e preocupação legítima com contaminação de métricas (Lead Time, Cycle Time, Throughput, WIP).

### 6.2 Divergência entre `GITLAB.md` e `WORKFLOW.md`

Dois fluxos diferentes no mesmo pack:

```
GITLAB.md    →  Opened → Doing → Closed
WORKFLOW.md  →  Opened → Doing → Review/Validation → Closed
```

`GITLAB.md` compensa com o texto "só deve ser fechada após validação", mas a lista de estados é de 3 e não de 4. Quem configurar o board seguindo `GITLAB.md` cria 3 colunas e perde a etapa de validação — que é justamente o que a DoD exige.

### 6.3 🔴 Ausência documental: estrutura RF/RNF não é verificável

| Verificação pedida | Possível? |
|---|---|
| Estrutura RF/RNF existe no GitLab? | ❌ sem link do projeto, sem IDs de issue |
| Estrutura US existe? | ❌ o próprio catálogo de US não está no pack |
| Relação requisito → história está aplicada? | ❌ sem mapeamento RF → issue ID em nenhum documento |
| Rastreabilidade preservada? | ❌ não verificável |

O pack declara o GitLab como fonte de verdade nível 1 na hierarquia de conflitos e como local onde RF30/US-036 serão formalizados — mas não fornece nenhum meio de alcançá-lo. **A seção 6 desta auditoria não pode ser executada de fato**; o que está acima é auditoria do *modelo descrito*, não do GitLab real.

---

## 7. Lista de inconsistências

### 🔴 Críticos

**C1 — Catálogo de User Stories ausente**
- **Local:** `docs/01_REQUIREMENTS/REQUIREMENTS.md`, linha "US-001 a US-035 seguem o catálogo aprovado do projeto"
- **Impacto:** o elo US da cadeia obrigatória não existe. Nenhuma tela pode ser rastreada até um comportamento esperado. A regra "cada US possui um RF de origem" — declarada em 3 documentos — é inverificável.
- **Severidade:** Crítico

**C2 — RNF não existem, mas são referenciados**
- **Local:** `TRACEABILITY_MATRIX.md` (RNF01) e `04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md` (RNF03)
- **Impacto:** um componente inteiro (`AccessStatusCard`) e um estado global ("acesso negado") derivam de requisitos que não existem. A cadeia auditada `RF → RNF → US` não tem camada intermediária.
- **Severidade:** Crítico

**C3 — Dois `COMPONENT_ARCHITECTURE.md` divergentes, e a versão do Figma é a desatualizada**
- **Local:** `docs/04_DESIGN_SYSTEM/` vs `docs/05_FIGMA/`
- **Impacto:** 8 componentes existem no Design System e não na árvore do Figma. Cinco telas (T08, T09, T10/T11, T14, T17) induzem à criação de componente duplicado. É o risco nº 1 do projeto se materializando por erro documental.
- **Severidade:** Crítico

**C4 — Nenhum requisito de acessibilidade em um produto para pessoas idosas**
- **Local:** ausência documental — todo o pack
- **Impacto:** sem nível WCAG alvo, sem tamanho mínimo de fonte, sem alvo de toque, sem suporte a escala de fonte do SO. Somado a C5, produz protótipos inacessíveis para o usuário final declarado. Requisito legalmente relevante em produto de saúde.
- **Severidade:** Crítico

**C5 — Token `Border #E5E5E5` reprova em contraste**
- **Local:** `docs/04_DESIGN_SYSTEM/DESIGN_TOKENS.md`
- **Impacto:** 1.20:1 sobre Background e 1.26:1 sobre Surface, contra mínimo de 3:1 (WCAG 1.4.11) para bordas de componente de interface. Inputs e cards clicáveis ficarão imperceptíveis. Contamina todas as 17 telas por ser token global.
- **Severidade:** Crítico

**C6 — Matriz de permissões não é decidível**
- **Local:** `docs/02_BUSINESS_RULES/PERMISSIONS_MATRIX.md`, coluna "Alterar"
- **Impacto:** as células "Conforme regra", "Conforme permissão", "Limitado" e "Conforme escopo" não permitem responder à pergunta que `SCREEN_STANDARDS.md` torna obrigatória antes de aprovar uma tela: *"Usuário possui permissão?"*. O documento que deveria responder, não responde. Bloqueia a decisão de exibir ou ocultar cada botão de ação do aplicativo.
- **Severidade:** Crítico

**C7 — Pessoa Idosa apresentada como aprovada na matriz de permissões**
- **Local:** `docs/02_BUSINESS_RULES/PERMISSIONS_MATRIX.md`, primeira linha
- **Impacto:** contradiz RN-009, RF30, Decisão 003, `CLAUDE.md` e `CHANGELOG.md`. Risco concreto de alguém prototipar a jornada da Pessoa Idosa como escopo aprovado. Como a matriz é o documento mais consultado durante o desenho de tela, o erro tem alta probabilidade de propagação.
- **Severidade:** Crítico

### 🟠 Altos

**A1 — 21 de 30 RF sem US ou tela rastreada (70%)**
- **Local:** `TRACEABILITY_MATRIX.md`
- **Impacto:** a matriz cobre 31% dos requisitos e se declara "Completa". Quem consultá-la concluirá que a rastreabilidade está resolvida.
- **Severidade:** Alto

**A2 — 8 de 17 telas sem origem funcional, incluindo T03 Home**
- **Local:** `SITEMAP.md` × `TRACEABILITY_MATRIX.md`
- **Impacto:** T03 é a raiz da área autenticada e não tem RF, US, nem definição de conteúdo. Será desenhada por improviso.
- **Severidade:** Alto

**A3 — 15 de 17 telas sem estados declarados**
- **Local:** `SCREENS_CATALOG.md` — apenas T01 e T02 declaram estados
- **Impacto:** a regra `STATE = PAGE BASE + DELTA MÍNIMO` está bem protegida, mas não há o que derivar. Empty state, error e loading ficarão a critério de cada integrante — ou serão esquecidos.
- **Severidade:** Alto

**A4 — Componentes citados na matriz que não existem no Design System**
- **Local:** `TRACEABILITY_MATRIX.md` — `AuthCard`, `Field`, `DayDetail`
- **Impacto:** três componentes serão criados sem passar pela avaliação de reutilização exigida por `COMPONENT_ARCHITECTURE.md`. `Field` provavelmente duplica `Input`.
- **Severidade:** Alto

**A5 — `BottomNavigation` não corresponde ao Site Map**
- **Local:** `04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md` — destinos "Home, Agenda, Diário, Saúde, Mais"
- **Impacto:** "Saúde" e "Mais" não são nós do Site Map. A navegação principal do aplicativo tem uma arquitetura de informação diferente da arquitetura oficial. Ou o Site Map está errado, ou a navegação está.
- **Severidade:** Alto

**A6 — RF28 (Exportação CSV) sem regra de permissão**
- **Local:** `REQUIREMENTS.md` RF28, `SCREENS_CATALOG.md` T07, `PERMISSIONS_MATRIX.md`
- **Impacto:** exportação de dados de saúde é a operação de maior risco de privacidade do produto e nenhum documento declara quem pode executá-la. RN-007 exige controle de acesso a dados sensíveis, sem operacionalizar. A Pessoa Idosa (proposta read-only) pode exportar? Um Familiar de Apoio? Indefinido.
- **Severidade:** Alto

**A7 — Arquivo Figma e projeto GitLab não referenciados**
- **Local:** ausência documental — `05_FIGMA/` e `06_GITLAB/`
- **Impacto:** as duas fontes de verdade declaradas (níveis 1 e 5 da hierarquia de conflitos) são inalcançáveis a partir do pack. Nenhuma auditoria de conformidade real é possível.
- **Severidade:** Alto

**A8 — Tokens ausentes para estados semânticos**
- **Local:** `DESIGN_TOKENS.md` × `DESIGN_SYSTEM.md` × `STATE_MANAGEMENT.md`
- **Impacto:** sem cor de erro, sucesso, aviso, ativo, sombra, raio ou escala tipográfica, os estados exigidos por `STATE_MANAGEMENT.md` não têm como ser desenhados de forma consistente entre integrantes.
- **Severidade:** Alto

### 🟡 Médios

**M1 — `README.md` aponta para 9 caminhos inexistentes**
- **Local:** `README.md`, seção "Ordem de leitura" (`docs/PROJECT_CONTEXT.md`, `docs/REQUIREMENTS.md`, etc.)
- **Impacto:** é o primeiro arquivo lido por qualquer integrante novo e por qualquer IA. Todos os 9 caminhos estão errados; a estrutura real é numerada em pastas.
- **Severidade:** Médio

**M2 — `CONTEXT_PACK_STATUS.md` obsoleto e contraditório**
- **Local:** `docs/CONTEXT_PACK_STATUS.md`
- **Impacto:** afirma que o pack "recebeu a primeira camada" e que "a próxima etapa é sincronizar os documentos completos", quando o `CHANGELOG.md` de 2026-09-05 registra a sincronização como concluída. O CHANGELOG tem prioridade 2 na hierarquia de conflitos; este arquivo o contradiz.
- **Severidade:** Médio

**M3 — Fluxo GitLab divergente entre dois documentos**
- **Local:** `GITLAB.md` (3 estados) vs `WORKFLOW.md` (4 estados)
- **Impacto:** board configurado sem a coluna Review/Validation não consegue cumprir a própria DoD.
- **Severidade:** Médio

**M4 — RN-002 é circular**
- **Local:** `BUSINESS_RULES.md`
- **Impacto:** "conforme regras definidas" não define acumulação. `NOTIFICATIONS_RULES.md` já trata do efeito colateral do acúmulo sem que a regra exista.
- **Severidade:** Médio

**M5 — Notificações N01–N04 sem ligação declarada com RF**
- **Local:** `NOTIFICATIONS_RULES.md` × `REQUIREMENTS.md`
- **Impacto:** N01–N04 correspondem aparentemente a RF10, RF17, RF25 e RF26, mas nenhum documento estabelece a ligação. Além disso, `NOTIFICATIONS_RULES` proíbe Central de Notificações "fora do Site Map" — e **nenhuma tela do Site Map declara ser a superfície de exibição das notificações**. Onde o usuário as vê? Ausência documental.
- **Severidade:** Médio

**M6 — Nomenclatura de US inconsistente**
- **Local:** `REQUIREMENTS.md` usa `US-001`; `TRACEABILITY_MATRIX.md` usa `US001`
- **Impacto:** duas grafias quebram busca e Linked items no GitLab.
- **Severidade:** Médio

**M7 — Nome da categoria "Professional Health User"**
- **Local:** `USERS_AND_ROLES.md`
- **Impacto:** divergente de "Profissional da Saúde" usado nos outros 5 documentos. Nome de ator é chave de rastreabilidade.
- **Severidade:** Médio

**M8 — `AUDIT_RULES` exige "historical roles" sem requisito de origem**
- **Local:** `AUDIT_RULES.md` × `REQUIREMENTS.md` RF05
- **Impacto:** auditar papéis históricos implica versionamento de papéis ao longo do tempo. RF05 é "Papéis e permissões", sem menção a histórico. É requisito implícito sem RF.
- **Severidade:** Médio

**M9 — `N02` atribui recebimento de notificação ao "Plantonista Atual"**
- **Local:** `NOTIFICATIONS_RULES.md`
- **Impacto:** uma condição operacional não recebe notificação; quem recebe é o usuário que a ocupa. Imprecisão que convida a tratar Plantonista Atual como destinatário, ou seja, como usuário.
- **Severidade:** Médio

**M10 — `AccessStatusCard` serve a dois propósitos com status diferentes**
- **Local:** `COMPONENT_ARCHITECTURE.md` ("controlado enquanto RF30 estiver em formalização") × `TRACEABILITY_MATRIX.md` (linha RNF01, "acesso negado")
- **Impacto:** acesso negado (RN-008/AUDIT_RULES, aprovado) e restrição da Pessoa Idosa (RF30, proposta) são coisas distintas. Um componente marcado como condicional está sendo usado em cenário aprovado — ou o inverso.
- **Severidade:** Médio

**M11 — Responsividade não especificada**
- **Local:** `SCREEN_STANDARDS.md`
- **Impacto:** "390px, altura adaptável" não define comportamento fora dessa largura nem suporte a escala de fonte do sistema — que é o principal recurso de acessibilidade usado por pessoas idosas.
- **Severidade:** Médio

**M12 — Nomenclatura de camadas do Figma não definida**
- **Local:** `FIGMA_GUIDELINES.md`, `SCREEN_STANDARDS.md`
- **Impacto:** o item "nomenclatura" da auditoria de Figma não tem norma contra a qual validar. `SCREEN_STANDARDS` pede o nome do responsável no título sem definir o formato.
- **Severidade:** Médio

### 🔵 Baixos

**B1 — Idioma misto no pack** — `USERS_AND_ROLES.md`, `AUDIT_RULES.md` e `STITCH_PROMPT_RULES.md` em inglês; restante em português. `USERS_AND_ROLES.md` mistura os dois no mesmo arquivo (cabeçalhos em pt, corpo em en).

**B2 — Matiz do background divergente da paleta** — `#FBF8FF` é lilás (hue ≈ 270°) contra identidade declarada "azul institucional/petróleo" (hue ≈ 200°). Contraste Surface/Background de 1.05:1 torna a distinção card/fundo quase imperceptível.

**B3 — `TRACEABILITY_MATRIX.md` se autodenomina "Completa"** enquanto sua seção interna se chama "Exemplos consolidados". Título contradiz conteúdo.

**B4 — `05_FIGMA/COMPONENT_ARCHITECTURE.md` duplica nome de arquivo** com `04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md`, dificultando referência inequívoca em revisões e commits.

---

## 8. Próximos passos recomendados

### 8.1 Correções obrigatórias antes de qualquer prototipação

Bloqueiam a prototipação porque, sem elas, toda tela desenhada nascerá sem rastreabilidade ou com componente duplicado.

| # | Ação | Resolve |
|---|---|---|
| 1 | **Importar o catálogo completo de US** (US-001 a US-035) para `01_REQUIREMENTS/`, cada uma com enunciado, ator, RF de origem e critério de aceite | C1 |
| 2 | **Criar `RNF.md`** com os RNF reais, incluindo obrigatoriamente RNF01 e RNF03 já referenciados | C2 |
| 3 | **Unificar os dois `COMPONENT_ARCHITECTURE.md`** — manter um único arquivo canônico; `05_FIGMA/` deve referenciar, não duplicar | C3 |
| 4 | **Criar RNF de acessibilidade** — nível WCAG alvo, fonte mínima, alvo de toque mínimo, suporte a escala de fonte do SO | C4 |
| 5 | **Substituir `Border #E5E5E5`** por um valor com no mínimo 3:1 sobre Surface e Background | C5 |
| 6 | **Reescrever a coluna "Alterar" da matriz de permissões** com verbos decidíveis (ex.: *"Familiar de Apoio pode criar registro de cuidado apenas durante plantão ativo atribuído a ele"*) | C6 |
| 7 | **Marcar a linha Pessoa Idosa como proposta** na matriz de permissões, com referência explícita a RF30 e Decisão 003 | C7 |
| 8 | **Definir tokens semânticos** — erro, sucesso, aviso, ativo, sombra, raio, escala tipográfica | A8 |

### 8.2 Melhorias recomendadas — antes de fechar a primeira sprint de telas

9. Completar a matriz de rastreabilidade para os 21 RF descobertos e as 8 telas sem origem, começando por **T03 Home** (A1, A2)
10. Declarar estados de T03 a T17 em `SCREENS_CATALOG.md`, incluindo empty state (A3)
11. Resolver `AuthCard`, `Field` e `DayDetail`: promover a componente do Design System ou substituir por primitive existente (A4)
12. Reconciliar `BottomNavigation` com o Site Map — decidir qual dos dois é a arquitetura oficial (A5)
13. Definir permissão de exportação de dados de saúde para RF28 (A6)
14. Adicionar link do arquivo Figma e do projeto GitLab ao pack (A7)
15. Corrigir os caminhos do `README.md` (M1) e arquivar ou atualizar `CONTEXT_PACK_STATUS.md` (M2)
16. Unificar o fluxo GitLab em 4 estados (M3)
17. Detalhar RN-002 com combinações permitidas e permissão efetiva no acúmulo (M4)
18. Ligar N01–N04 aos RF correspondentes e definir a superfície de exibição das notificações (M5)
19. Padronizar `US-0NN` e "Profissional da Saúde" em todo o pack (M6, M7)

### 8.3 Itens opcionais

20. Criar RF para versionamento de papéis, exigido implicitamente por `AUDIT_RULES` (M8)
21. Reescrever N02 para atribuir a notificação ao usuário que ocupa a condição de plantão (M9)
22. Separar `AccessStatusCard` em dois componentes ou esclarecer o duplo propósito (M10)
23. Especificar responsividade e escala de fonte do sistema (M11)
24. Definir convenção de nomenclatura de camadas, variantes e páginas no Figma (M12)
25. Padronizar o idioma do pack (B1)
26. Reavaliar a matiz do background frente à identidade azul/petróleo (B2)
27. Renomear a seção interna de `TRACEABILITY_MATRIX.md` ou o título (B3)

---

## Recomendação final

**Não iniciar prototipação de telas** até que os itens 1 a 8 estejam concluídos.

Justificativa: `SCREEN_STANDARDS.md` define cinco critérios obrigatórios de aprovação de tela. Com o pack no estado atual, **três deles não podem ser respondidos**:

| Critério de `SCREEN_STANDARDS` | Respondível hoje? |
|---|---|
| Existe requisito para cada ação? | ❌ 70% dos RF sem US/tela; catálogo de US ausente |
| Usuário possui permissão? | ❌ matriz de permissões não decidível |
| Componente já existe? | ❌ duas listas conflitantes de componentes |
| O estado altera somente o necessário? | ✅ regra bem documentada |
| Mantém identidade visual? | ⚠️ parcial — tokens incompletos |

O pack tem uma base conceitual sólida: a regra de estados, a separação shadcn/identidade, o tratamento de Plantonista Atual e o modelo GitLab estão corretos e consistentes. O que falta é a camada intermediária — US, RNF e permissões operacionais — que transforma princípio em critério verificável.
