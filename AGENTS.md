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

**Regra de protótipo:** uma reação do Figma documenta o wiring atual, mas não é autoridade funcional. Se estiver registrada em `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`, deve ser tratada como defeito conhecido e nunca copiada para implementação/refatoração como comportamento pretendido.

## 2. Leitura mínima antes de atuar

Antes de criar ou alterar uma tela, ler:

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
17. `docs/05_FIGMA/FIGMA_GUIDELINES.md`
18. `docs/05_FIGMA/FIGMA_REGISTRY.yaml`
19. `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`
20. `docs/05_FIGMA/FIGMA_AUDIT_2026-09-13.md`
21. `docs/06_GITHUB/`

Se algum dado funcional necessário estiver ausente, registrar `migration_required`. O Figma pode resolver somente dúvidas visuais, nunca lacunas de requisito.

## 3. Regra para telas e estados

- Toda tela deve manter o identificador `T##`.
- Todo elemento transversal deve manter o identificador `E##` quando existir.
- Criar todos os estados aplicáveis como variações da **mesma estrutura-base**, não como telas independentes.
- `Loading`, `Error`, `Validation Error`, `Empty`, `Success` e `Forbidden` devem preservar shell, navegação, largura, hierarquia e componentes que não mudam semanticamente.
- Um estado só pode alterar o necessário para comunicar a mudança de comportamento.
- `proposal_only` significa que o frame existe visualmente, mas depende de proposta não aprovada e não pode ser propagado para escopo atual.
- `visual_candidate_only` significa que o frame é evidência visual, mas uma pendência funcional/documental ainda decide seu uso.
- Se o estado ainda não estiver mapeado em `STATE_MATRIX.yaml`, primeiro inspecionar a tela-base e registrar a decisão.

## 4. Figma

- Arquivo canônico: `tcyj2fkTXei2CJbqaRxqCp`.
- T01–T17 possuem nodes atuais mapeados em `FIGMA_REGISTRY.yaml` desde a auditoria de 2026-09-13.
- Usar componentes/instances existentes antes de criar qualquer componente novo.
- Prioridade: componentes locais aprovados → Obra/shadcn disponível → novo componente local apenas quando não existir equivalente.
- Preferir Auto Layout para relações estruturais; evitar posicionamento absoluto interno sem necessidade.
- Reutilizar tokens e estilos existentes; não hardcodar valores quando houver token equivalente.
- Frames com prefixo `LEGADO —` são somente referência histórica e não devem ser alterados ou usados como base se existir equivalente vigente.
- A página `prototypeIA` é referência histórica/experimental e não é fonte primária quando existir frame atual na página do responsável.
- Frames vigentes seguem preferencialmente o padrão `[RESPONSÁVEL] T## — Nome / Estado`.
- Consultar `PROTOTYPE_INTEGRITY.yaml` antes de confiar em qualquer reação de protótipo.
- Estados T12 relacionados a RF30/US-036 permanecem `proposal_only` enquanto a proposta não for aprovada.
- Estados T03 ligados à superfície N02/N03/N04 permanecem `visual_candidate_only` enquanto P04 estiver aberta.
- Sempre auditar a tela visualmente e estruturalmente após alterações.

## 5. GitHub e Pull Request

Para trabalho de design automatizado:

1. Resolver RF/RNF/US/P## através de `ISSUE_REGISTRY.yaml` e das Issues correspondentes.
2. Verificar Issue #84 / `PROTOTYPE_INTEGRITY.yaml` quando a tela possuir dívida de protótipo.
3. Criar branch específica.
4. Fazer commits pequenos e descritivos.
5. Atualizar registries afetados.
6. Rodar `python scripts/validate_agent_context.py`.
7. Abrir Pull Request.
8. Não fazer merge automático sem validação humana.

O PR deve informar: T##, GitHub Issues e RF/RNF/US relacionados, nodes do Figma, estados alterados, componentes reutilizados, decisões novas, pendências `migration_required`, FI-### afetados e resultado da auditoria.

## 6. Responsáveis atuais por tela

- David: T01, T02, T12, T13, T14, T15
- Rhuan: T03, T04, T09, T11
- Henrique: T05, T07, T08, T10
- Kauã: T06, T16, T17

Distribuição das US aprovadas: David 9, Rhuan 9, Henrique 9, Kauã 8.

A lista acima é contexto operacional. Se divergir de uma Issue/requisito aprovado no próprio GitHub, a fonte aprovada prevalece e os registries devem ser atualizados.

## 7. Gates que agentes não podem fechar por inferência

- P01/#73 — critérios individuais de aceite ausentes nas fontes.
- P03/#75 — permissões de escrita ainda não totalmente determinísticas.
- P04/#76 — superfície formal das notificações N01–N04.
- P05/#77 — permissão de exportação CSV.
- P06/#78 — composição de permissões para papéis acumulados.
- RF30/#34 + US-036/#72 — proposta de acesso read-only da Pessoa Idosa.

A presença de um frame, CTA, estado ou reação no Figma não fecha nenhum desses gates.

## 8. Definition of Done para alteração visual por agente

Uma alteração de design só está pronta para revisão quando:

- requisitos envolvidos foram identificados no GitHub;
- Issues canônicas foram resolvidas pelo registry;
- nenhuma dependência funcional externa permanece oculta;
- lacunas foram marcadas como `migration_required`;
- tela e estados aplicáveis foram mapeados;
- `PROTOTYPE_INTEGRITY.yaml` foi consultado;
- componentes existentes foram priorizados;
- estrutura entre estados foi comparada;
- layout, overflow, tipografia, espaçamento e tokens foram auditados;
- nenhuma reação conhecida como defeituosa foi propagada;
- proposals/candidates não foram promovidos indevidamente;
- Figma ficou sem regressões evidentes;
- registries/documentação afetados foram atualizados;
- validação de contexto passou;
- branch e PR foram criados;
- o merge ficou pendente de revisão humana.
