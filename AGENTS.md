# AGENTS.md — Contrato de execução para agentes

Este repositório GitHub (`webkauadev/rede-de-apoio`) é a **fonte única de verdade operacional** do projeto Rede de Apoio a Cuidadores de Idosos para requisitos, RF/RNF, User Stories, Issues, tarefas, status, critérios de aceitação, contexto de IA e versionamento.

O Figma é a fonte canônica **somente do design visual vigente**. Nenhum agente deve depender de tracker externo para executar o projeto.

## 1. Ordem de autoridade

Quando houver conflito, usar esta prioridade:

1. **GitHub deste repositório**: Issues aprovadas + documentos canônicos versionados na branch principal.
2. Registries estruturados deste repositório, que devem espelhar o item 1.
3. Figma atual, considerando somente frames vigentes/aprovados, para decisões visuais.
4. Inferências do agente, apenas quando inevitáveis e sempre marcadas como `não especificado`, `hipótese`, `candidate_origin` ou `migration_required`.

Nunca criar RF, RNF, US, regra de negócio, permissão ou critério de aceitação que não esteja documentado no GitHub.

**Regra de migração:** se um dado funcional necessário não existir no GitHub, marcar `migration_required`. Não procurar em tracker externo, não reconstruir de memória e não inventar conteúdo.

**Regra de inferência:** `candidate_origin` pode registrar uma correspondência provável para investigação, mas nunca equivale a `confirmed_in_github_traceability`.

## 2. Leitura mínima antes de atuar

Antes de criar ou alterar uma tela, ler:

1. `CLAUDE.md`
2. `docs/00_PROJECT_CONTEXT.md`
3. `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml`
4. `docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml`
5. `docs/06_GITHUB/ISSUE_REGISTRY.yaml`
6. `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md`
7. `docs/07_AI_CONTEXT/AI_CONTEXT_RULES.md`
8. `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`
9. `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`
10. `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
11. `docs/03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`
12. `docs/04_DESIGN_SYSTEM/DESIGN_TOKENS.md`
13. `docs/04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md`
14. `docs/04_DESIGN_SYSTEM/COMPONENT_MAP.yaml`
15. `docs/05_FIGMA/FIGMA_GUIDELINES.md`
16. `docs/05_FIGMA/FIGMA_REGISTRY.yaml`
17. `docs/06_GITHUB/`

Se algum dado funcional necessário estiver ausente, registrar `migration_required`. O Figma pode resolver somente dúvidas visuais, nunca lacunas de requisito.

## 3. Regra para telas e estados

- Toda tela deve manter o identificador `T##`.
- Todo elemento transversal deve manter o identificador `E##` quando existir.
- Criar todos os estados aplicáveis como variações da **mesma estrutura-base**, não como telas independentes.
- `Loading`, `Error`, `Validation Error`, `Empty`, `Success` e `Forbidden` devem preservar shell, navegação, largura, hierarquia e componentes que não mudam semanticamente.
- Um estado só pode alterar o necessário para comunicar a mudança de comportamento.
- Se o estado ainda não estiver mapeado em `STATE_MATRIX.yaml`, primeiro inspecionar a tela-base e registrar a decisão.

## 4. Figma

- Usar componentes/instances existentes antes de criar qualquer componente novo.
- Prioridade: componentes locais aprovados → Obra/shadcn disponível → novo componente local apenas quando não existir equivalente.
- Preferir Auto Layout para relações estruturais; evitar posicionamento absoluto interno sem necessidade.
- Reutilizar tokens e estilos existentes; não hardcodar valores quando houver token equivalente.
- Frames com prefixo `LEGADO —` são somente referência histórica e não devem ser alterados ou usados como base se existir equivalente vigente.
- Frames vigentes seguem preferencialmente o padrão `[RESPONSÁVEL] T## — Nome / Estado`.
- Sempre auditar a tela visualmente e estruturalmente após alterações.

## 5. GitHub e Pull Request

Para trabalho de design automatizado:

1. Resolver RF/RNF/US/P## através de `ISSUE_REGISTRY.yaml` e das Issues correspondentes.
2. Criar branch específica.
3. Fazer commits pequenos e descritivos.
4. Atualizar registries afetados.
5. Abrir Pull Request.
6. Não fazer merge automático sem validação humana.

O PR deve informar: T##, GitHub Issues e RF/RNF/US relacionados, nodes do Figma, estados alterados, componentes reutilizados, decisões novas, pendências `migration_required` e resultado da auditoria.

## 6. Responsáveis atuais por tela

- David: T01, T02, T12, T13, T14, T15
- Rhuan: T03, T04, T09, T11
- Henrique: T05, T07, T08, T10
- Kauã: T06, T16, T17

A lista acima é contexto operacional. Se divergir de uma Issue/requisito aprovado no próprio GitHub, a fonte aprovada prevalece e os registries devem ser atualizados.

## 7. Definition of Done para alteração visual por agente

Uma alteração de design só está pronta para revisão quando:

- requisitos envolvidos foram identificados no GitHub;
- Issues canônicas foram resolvidas pelo registry;
- nenhuma dependência funcional externa permanece oculta;
- lacunas foram marcadas como `migration_required`;
- tela e estados aplicáveis foram mapeados;
- componentes existentes foram priorizados;
- estrutura entre estados foi comparada;
- layout, overflow, tipografia, espaçamento e tokens foram auditados;
- Figma ficou sem regressões evidentes;
- registries/documentação afetados foram atualizados;
- branch e PR foram criados;
- o merge ficou pendente de revisão humana.
