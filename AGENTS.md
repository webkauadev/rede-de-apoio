# AGENTS.md — Contrato de execução para agentes

Este repositório GitHub (`webkauadev/rede-de-apoio`) é a **fonte única de verdade operacional** do projeto Rede de Apoio a Cuidadores de Idosos para requisitos, RF/RNF, User Stories, Issues, tarefas, status, critérios de aceitação, contexto de IA e versionamento.

O Figma é a fonte canônica **somente do design visual/prototípico vigente**. A página `Fluxo Final` (`5926:1014`) é o protótipo canônico de usuário final quando houver equivalente às owner pages.

## 1. Ordem de autoridade

1. **GitHub deste repositório**: Issues aprovadas + documentos canônicos versionados na branch principal.
2. Registries estruturados deste repositório, que devem espelhar o item 1.
3. `Fluxo Final` no Figma para decisões visuais/prototípicas vigentes.
4. Owner pages do Figma como histórico/fonte de migração quando houver equivalente no `Fluxo Final`.
5. Inferências do agente apenas quando inevitáveis e sempre marcadas como `não especificado`, `hipótese`, `candidate_origin` ou `migration_required`.

Nunca criar RF, RNF, US, regra de negócio, permissão ou critério de aceitação que não esteja documentado no GitHub.

**Regra de migração:** se um dado funcional necessário não existir no GitHub, marcar `migration_required`.

**Regra de protótipo:** uma reaction do Figma documenta o wiring atual, mas não é autoridade funcional.

## 2. Leitura mínima antes de atuar

Antes de criar ou alterar tela/fluxo:

1. `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md`
2. `CLAUDE.md` quando aplicável
3. `docs/00_PROJECT_CONTEXT.md`
4. `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml`
5. `docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml`
6. `docs/06_GITHUB/ISSUE_REGISTRY.yaml`
7. `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md`
8. `docs/07_AI_CONTEXT/AI_CONTEXT_RULES.md`
9. `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`
10. `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`
11. `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
12. `docs/03_INFORMATION_ARCHITECTURE/SCREENS_CATALOG.md`
13. `docs/03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`
14. `docs/04_DESIGN_SYSTEM/DESIGN_TOKENS.md`
15. `docs/04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md`
16. `docs/04_DESIGN_SYSTEM/COMPONENT_MAP.yaml`
17. `docs/04_DESIGN_SYSTEM/ENTITY_ENTRY_BOTTOM_SHEET_PATTERN.md`
18. `docs/05_FIGMA/FIGMA_GUIDELINES.md`
19. `docs/05_FIGMA/FIGMA_REGISTRY.yaml`
20. `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`
21. `docs/06_GITHUB/`

## 3. Regras de telas e estados

- Toda tela mantém identificador `T##`.
- Todo elemento transversal mantém `E##` quando existir.
- Estados aplicáveis são variações da mesma estrutura-base: **STATE = PAGE BASE + DELTA MÍNIMO**.
- Loading, Error, Validation Error, Empty, Success e Forbidden preservam shell, navegação, largura, hierarquia e componentes que não mudam semanticamente.
- Estados canônicos estão em `STATE_MATRIX.yaml` e, visualmente, no `Fluxo Final`.
- `proposal_only` e `visual_candidate_only` só podem existir para novas decisões ainda não aprovadas; não usar esses marcadores para P03/P04/P05/P06 ou RF30/US-036, que já foram resolvidos/aprovados em 2026-09-14.

## 4. Figma

- Arquivo canônico: `tcyj2fkTXei2CJbqaRxqCp`.
- Protótipo canônico de usuário final: `Fluxo Final` (`5926:1014`).
- T01–T17 possuem baselines canônicos e states aprovados em `FIGMA_REGISTRY.yaml`.
- Usar componentes/instances existentes antes de criar componente novo.
- Prioridade: componente local aprovado → Obra/shadcn → library vinculada → novo componente local apenas sem equivalente.
- Material Design 3 governa UX/papéis semânticos; a identidade visual continua Rede de Apoio.
- Targets de interação >= 48×48 px.
- Frames `LEGADO —` são referência histórica.
- `prototypeIA` é referência histórica/experimental.
- Estados de RF30/US-036 estão aprovados e devem ser implementados em modo read-only, sem app separado.
- Estados T03 de N02/N03/N04 estão aprovados como feedback transitório global conforme P04.
- Sempre auditar visual e estruturalmente após alterações.

### 4.1 Cadastro operacional contextual — regra canônica

- Documento obrigatório: `docs/04_DESIGN_SYSTEM/ENTITY_ENTRY_BOTTOM_SHEET_PATTERN.md`.
- T06 / Novo Registro é a referência comportamental aprovada.
- Cadastro de entidade operacional contextual usa **Bottom Sheet ancorado na borda inferior**, nunca drawer/menu lateral.
- Abertura: **bottom → up**.
- Fechamento/dismiss: **down → bottom**, por gesto quando suportado e sempre por ação `Cancelar` equivalente.
- Arquitetura: `PAGE BASE + SCRIM + BOTTOM SHEET`.
- Não criar página inteira com `AppHeader / Back` apenas para cadastro operacional contextual.
- Escopo aprovado: T06, T08, T09, T10 e T11; novas ocorrências equivalentes seguem o mesmo padrão.
- Não aplicar a cadastro de conta, criação/vinculação de pessoas ou configurações sem equivalência semântica.

### 4.2 Cards, Rows e Fields — regra canônica

- `ENTIDADE/CONTEÚDO → CARD`.
- `DESTINO/AÇÃO DE MENU → ROW`.
- `ENTRADA DE DADO → FIELD / SELECT`.
- Não envolver Rows ou Fields em Cards decorativos sem justificativa semântica.

### 4.3 Scroll e stacking — regra canônica

- Conteúdo rolável não pode atravessar `AppHeader`, `LocalSubnav` ou `NavigationBar`.
- Estrutura: `AppHeader → LocalSubnav (quando houver) → CLIPPED CONTENT VIEWPORT → NavigationBar`.
- O scroll vertical fica contido no viewport central com clipping explícito.
- T04 e T06 têm bugs confirmados de invasão visual do conteúdo sobre o cabeçalho e devem ser corrigidos; o mesmo defeito, se encontrado em outra Root, recebe a mesma correção estrutural.

## 5. GitHub e Pull Request

1. Resolver RF/RNF/US/P## através do registry e Issues correspondentes.
2. Consultar `PROTOTYPE_INTEGRITY.yaml`.
3. Criar branch específica.
4. Fazer commits pequenos/descritivos.
5. Atualizar registries afetados.
6. Rodar `python scripts/validate_agent_context.py`.
7. Abrir Pull Request.
8. Merge apenas após revisão/validação humana explícita.

## 6. Responsáveis atuais

Telas:
- David: T01, T02, T12, T13, T14, T15
- Rhuan: T03, T04, T09, T11
- Henrique: T05, T07, T08, T10
- Kauã: T06, T16, T17

User Stories aprovadas:
- David: 10 — inclui US-036
- Rhuan: 9
- Henrique: 9
- Kauã: 8

## 7. Decisões funcionais canônicas relevantes

### P03 / #75 — escrita e correção
- Principal pode criar registros compatíveis com o cuidado.
- Apoio/Emergência escrevem quando forem Plantonista Atual ou tiverem responsabilidade operacional explicitamente atribuída.
- Profissional da Saúde escreve registros de saúde do seu domínio enquanto vinculado/autorizado.
- RN-006 pode ser corrigida por quem tiver permissão efetiva para produzir o mesmo tipo de registro.

### P04 / #76 — notificações
- Não existe Central de Notificações dedicada.
- N01–N04 usam feedback transitório global e destinos existentes: N01→T04; N02→T05; N03→T05/T07; N04→T05, com resumo possível em T03.

### P05 / #77 — CSV
- Primeira versão: somente Familiar Principal.
- Contextual em T07, limitado ao histórico autorizado e auditado.

### P06 / #78 — papéis acumulados
- União das permissões positivas, preservando restrições explícitas e condições contextuais.
- Não duplicar notificações por acúmulo.

### RF30/#34 + US-036/#72 — Pessoa Idosa
- Aprovados canonicamente em 2026-09-14.
- Owner US-036: David.
- Mesma autenticação do app; somente leitura do próprio cuidado autorizado.
- Sem papéis familiares, Plantonista Atual, escrita, correção, administração ou CSV.
- Sem aplicativo separado.

## 8. Gates documentais — status

- **P01/#73** — RESOLVIDO em 2026-09-15 (aprovação humana explícita, Issue fechada). Critérios individuais de aceite de US-001–US-036 estão em `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml`; `ACCEPTANCE_CRITERIA_DRAFT.yaml` é snapshot histórico do conjunto submetido à aprovação.
- P02–P09 (#74–#81) também estão fechados. Não há gate documental aberto no momento.

Isso não autoriza inventar novo critério além do aprovado. Qualquer critério, RF, RNF, US, regra ou permissão fora do que já está aprovado nas fontes exige nova decisão explícita no GitHub antes de virar base de trabalho de um agente.

## 9. Definition of Done para alteração por agente

Uma alteração está pronta para revisão quando:

- requisitos/Issues envolvidos foram identificados;
- nenhuma dependência funcional externa permanece oculta;
- lacunas reais foram marcadas como `migration_required`;
- estados aplicáveis foram mapeados;
- `PROTOTYPE_INTEGRITY.yaml` foi consultado;
- componentes existentes foram priorizados;
- layout, overflow, tipografia, espaçamento, tokens e targets foram auditados;
- reactions funcionais foram verificadas quando aplicável;
- registries/documentação foram atualizados;
- validação de contexto passou;
- branch/PR foram criados;
- merge depende de revisão humana explícita.


## 10. Planejamento de Banco de Dados — leitura obrigatória para agentes de dados

Antes de propor schema, DDL, migrações, dados de teste, autenticação/autorizações persistidas ou engenharia reversa, ler [docs/09_BANCO_DE_DADOS/README.md](docs/09_BANCO_DE_DADOS/README.md) e seus documentos de domínio, [docs/02_BUSINESS_RULES/BUSINESS_RULES.md](docs/02_BUSINESS_RULES/BUSINESS_RULES.md), a matriz de permissões e RF/RNF/US canônicos. O dicionário e o diagrama em 09 são **propostas**, não requisitos aprovados. ADRs bloqueantes devem ser resolvidas antes da implementação operacional. A partir da autorização expressa do solicitante para a prototipação MySQL, é PERMITIDO criar **arquivo SQL de desenho V0.1**, para importação posterior no Workbench; continua PROIBIDO executar ou provisionar banco nesta entrega, usar dados pessoais reais ou inferir novas permissões/regras a partir de DDL candidato. A publicação de modelos físicos futuros exige branch, testes e PR com revisão humana, seguindo a seção 5.


## 11. Handoff para Codex e protótipo MySQL — 2026-10-09

**Primeiro documento de execução para Codex:** [docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md](docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md). Esse contrato orienta ordem de leitura, fontes canônicas de critérios, `BLOCKED_BY_DECISION`, commits, testes e PR. O agente deve conseguir trabalhar a partir de **arquivos do GitHub**, sem depender do histórico de conversa.

**SQL autorizado para desenho:** [database/mysql/001_rede_de_apoio_schema.sql](database/mysql/001_rede_de_apoio_schema.sql). O arquivo é **protótipo físico experimental**, não schema canônico homologado para backend ou produção; está separado das ADRs e das regras já aprovadas na `main`. Consultar [database/mysql/DECISOES_E_LIMITES.md](database/mysql/DECISOES_E_LIMITES.md) antes de criar qualquer serviço. Algumas escolhas foram necessárias só para materializar um EER e estão marcadas como hipóteses técnicas.

**Não antecipar decisões funcionais:** DB-001 (uma/várias redes), DB-002 (bootstrap), DB-003 (reingresso), DB-030 (N02 vários plantonistas), entre outras, permanecem `PENDENTE` até confirmação de opção específica e eventual `migration_required` nos RF/US. A autorização de prototipar SQL **não aprova por si só** todos os ramos do Gate G1.

**Validação estática sem MySQL:** `python scripts/validate_sql_prototype.py`. O resultado deste script não certifica sintaxe/semântica no MySQL nem substitui testes de integração/concorrência reais. Importar o SQL e gerar EER é ação manual posterior de quem controla o Workbench. Codex deve registrar evidências quando houver execução real autorizada.

**Regra de publicação:** PR de SQL é dependente do PR documental #115. Não mesclar o PR SQL na `main` antes do PR base e da revisão humana. Não iniciar frontend/backend por suposição de stack.


## 12. Codex GitHub-only — referência visual congelada e backlog operacional

**Modo sem Figma:** o pacote `docs/10_IMPLEMENTACAO/FIGMA_SNAPSHOT/` contém **17 PNGs dos baselines T01–T17 e 9 estados críticos exportados diretamente do `Fluxo Final`**, mais `SCREENSHOTS_INDEX.json`, todos versionados no GitHub. É **snapshot estático** de 2026-10-09. Para estados não capturados, consultar `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`, `docs/05_FIGMA/FIGMA_REGISTRY.yaml`, componentes/tokens e as regras `STATE = PAGE BASE + DELTA MÍNIMO`. O Figma continua origem visual para revisões futuras; **não é necessário acessá-lo para ler o estado visual congelado de V1**.

**Backlog:** `docs/10_IMPLEMENTACAO/IMPLEMENTATION_BACKLOG.json` é projeção verificável das 36 US com Issue, origem única, owner, tela e dependências a consultar, não um segundo tracker. Protocolo: `docs/10_IMPLEMENTACAO/PROTOCOLO_PR_CODEX.md`. Stack candidata: `STACK_CANDIDATA.md` (**não homologada**). Bloqueios reais: `PORTOES_PENDENTES.md`.

**Fluxo verificável offline:** `python scripts/validate_agent_context.py` (requer PyYAML), `python scripts/validate_sql_prototype.py`, `python scripts/validate_visual_snapshot.py` e `python scripts/validate_implementation_backlog.py`. Checks do GitHub Actions não provam execução MySQL, backend, segurança em produção ou equivalência pixel-perfect com Figma.

**Não tratar `screenshots`, `DDL V0.1` ou `decision_dependencies` como novas permissões ou critérios aprovados.** Caso exista conflito com RF/US/RN/aceite, prevalece o texto canônico e registra-se `BLOCKED_BY_DECISION` no PR. O usuário não pediu código de frontend/backend nesta fase; **não iniciar aplicação automaticamente por uma stack suposta**.
