# AGENTS.md — Contrato de execução para agentes

Este repositório é o **Context Pack** do projeto Rede de Apoio a Cuidadores de Idosos. Ele orienta agentes de IA, mas **não substitui o GitLab como fonte oficial de requisitos e rastreabilidade**.

## 1. Ordem de autoridade

Quando houver conflito, usar esta prioridade:

1. **GitLab oficial**: RF/RNF, US, Issues, status, responsáveis e critérios de aceitação.
2. Documentos canônicos deste repositório.
3. Figma atual, considerando somente frames vigentes/aprovados.
4. Inferências do agente, apenas quando inevitáveis e sempre marcadas como `não especificado` ou `hipótese`.

Nunca criar RF, RNF, US, regra de negócio, permissão ou critério de aceitação que não esteja documentado.

## 2. Leitura mínima antes de atuar

Antes de criar ou alterar uma tela, ler:

1. `CLAUDE.md`
2. `docs/00_PROJECT_CONTEXT.md`
3. `docs/07_AI_CONTEXT/AI_CONTEXT_RULES.md`
4. `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`
5. `docs/07_AI_CONTEXT/SCREEN_REGISTRY.yaml`
6. `docs/07_AI_CONTEXT/STATE_MATRIX.yaml`
7. `docs/03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`
8. `docs/04_DESIGN_SYSTEM/DESIGN_TOKENS.md`
9. `docs/04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md`
10. `docs/04_DESIGN_SYSTEM/COMPONENT_MAP.yaml`
11. `docs/05_FIGMA/FIGMA_GUIDELINES.md`
12. `docs/05_FIGMA/FIGMA_REGISTRY.yaml`

Se algum dado necessário estiver ausente, descobrir no GitLab/Figma antes de inventar.

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

## 5. Git e Pull Request

Para trabalho de design automatizado:

1. Criar branch específica.
2. Fazer commits pequenos e descritivos.
3. Atualizar os registries afetados.
4. Abrir Pull Request.
5. Não fazer merge automático sem validação humana.

O PR deve informar: T##, RF/RNF/US relacionados no GitLab, nodes do Figma, estados alterados, componentes reutilizados, decisões novas e resultado da auditoria.

## 6. Responsáveis atuais por tela

- David: T01, T02, T12, T13, T14, T15
- Rhuan: T03, T04, T09, T11
- Henrique: T05, T07, T08, T10
- Kauã: T06, T16, T17

A lista acima é contexto operacional. Se divergir do GitLab, o GitLab prevalece e este arquivo deve ser atualizado.

## 7. Definition of Done para alteração visual por agente

Uma alteração de design só está pronta para revisão quando:

- requisitos envolvidos foram identificados;
- tela e estados aplicáveis foram mapeados;
- componentes existentes foram priorizados;
- estrutura entre estados foi comparada;
- layout, overflow, tipografia, espaçamento e tokens foram auditados;
- Figma ficou sem regressões evidentes;
- registries/documentação afetados foram atualizados;
- branch e PR foram criados;
- o merge ficou pendente de revisão humana.
