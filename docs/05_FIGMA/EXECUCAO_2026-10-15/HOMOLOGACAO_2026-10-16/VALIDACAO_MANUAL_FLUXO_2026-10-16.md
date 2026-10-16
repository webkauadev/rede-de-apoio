# Validação manual do fluxo de usuário — 16/10/2026

**Status:** FLUXO PRINCIPAL APROVADO PELO SOLICITANTE EM NAVEGAÇÃO MANUAL; HOMOLOGAÇÃO EXAUSTIVA H07 EM ANDAMENTO.

**Origem da evidência:** confirmação textual expressa do solicitante no ChatGPT em 16/10/2026, no navegador local. A confirmação cobre o fluxo de login e a rodada de navegação padrão orientada no chat. **Não foi fornecido vídeo/captura desta execução ou inventário separado de variantes**. Portanto, este documento registra **aceite humano do comportamento observado**, sem alegar evidência automatizada ou cobertura de todos os 39 cenários.

## Ambiente

- **Arquivo Figma de trabalho:** `ljFSoPfNcvDgZtdR2sHmti`
- **Página autorizada:** `Fluxo Final — CORREÇÕES AUDITORIA`, `6223:6270`
- **Login T01:** `6223:6272`
- **Home T03:** `6223:6338`
- **Arquivo original protegido:** `tcyj2fkTXei2CJbqaRxqCp`; nenhuma escrita foi executada neste registro.
- PR de rastreabilidade: [#127](https://github.com/webkauadev/rede-de-apoio/pull/127).

## Declarações do solicitante

1. Confirmação inicial após executar o Presentation local: **"O login chat deu 100%, tá? Deu o resultado esperado"**.
2. Após a rodada de navegação indicada no chat, que compreendia as abas **Home, Agenda, Diário, Saúde**, o **Settings**, a ação de **Voltar** e a **ausência de navegação involuntária para a baseline**, declarou: **"o fluxo tá funcionando padrão, perfeito, como deveria funcionar. Testei isso tudo aqui, tá ótimo"**.
3. Orientou encerrar a discussão sobre falhas funcionais do fluxo demonstrado e abrir uma **nova auditoria visual de diagramação, botões e aderência ao Material Design 3 / Design Foundation**, para decidir correções somente após ver o relatório.

## Consolidação por escopo

| Escopo | Veredito humano | Limite da evidência |
|---|---|---|
| T01 — Login (jornada experimentada) | APROVADO PELO SOLICITANTE | Não há discriminação documental de todas as variantes de credencial inválida, Loading e retorno de H07-001 |
| Navegação inferior Home · Agenda · Diário · Saúde | APROVADA PELO SOLICITANTE | Usuário relatou ter testado todos os pontos da rodada; não implica cobertura exaustiva de T01–T17 |
| Settings / destinos administrativos da rodada | APROVADOS PELO SOLICITANTE | Confirmação de uso manual sem vídeos individuais dos seis/quatro destinos |
| Back/retornos da rodada | APROVADOS PELO SOLICITANTE | Não implica testar cada estado condicional e cada resultado |
| Isolamento durante navegação demonstrada | APROVADO PELO SOLICITANTE | Sem saída observada no caminho experimentado; inspeção estática de 1.478 referências visíveis consta do relatório de execução |

**Importante:** o parecer `PARECER.md` da tentativa de homologação pelo navegador remoto tinha **39 cenários não verificáveis por bloqueio de acesso ao Presentation**. Esta nova validação humana resolve o bloqueio ambiental **para as jornadas experimentadas no navegador local**, mas não converte retroativamente todas as 39 linhas e variantes em `APROVADO`. Os itens não percorridos devem continuar pendentes de evidência, sem novas suspeitas funcionais inventadas.

## Próxima missão autorizada: AUDITORIA VISUAL M3 — somente leitura

- **Objetivo:** detectar divergências reais de composição/diagramação, sobretudo botões, CTAs, espaçamentos, alinhamento, área de toque, conteúdo cortado, escala tipográfica, tokens e hierarquia visual, inclusive em estados/sheets e no ramo read-only.
- **Autoridade:** `AGENTS.md`, `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`, `docs/04_DESIGN_SYSTEM/DESIGN_TOKENS.md`, `docs/04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md`, `docs/04_DESIGN_SYSTEM/COMPONENT_MAP.yaml`, `docs/04_DESIGN_SYSTEM/MATERIAL3_VISUAL_DIRECTION.md`, `docs/05_FIGMA/FIGMA_GUIDELINES.md`.
- **Figma visual:** página experimental `6223:6270`; Foundation no novo arquivo, a partir do registro `5639:21448`, com verificação dos IDs reais antes de referenciar.
- **Hierarquia:** requisitos aprovados → padrão/papel Material Design 3 (Google) → tokens Rede de Apoio → Obra/shadcn ou componentes locais → UI existente.
- **Não presumir:** que ausência de falhas estáticas em lote anterior comprova fidelidade visual de todas as variantes; nem que um screenshot dimensionado certifica área de toque ou contraste de todos os nodes.
- **Proibições nesta rodada:** **nenhum set de propriedades/reactions, nenhuma edição Figma, nenhum redesenho, nenhuma reabertura arbitrária de AUD-001–028, nenhuma alteração funcional, nenhuma promoção canônica, nenhum merge**. Em vez disso, apresentar achados comprovados, com node ID do arquivo novo, tela, prova visual/propriedade, impacto e proposta de microcorreção.
- **Gate:** só após análise e aprovação humana do relatório de auditoria visual executar as correções P1/P2 estéticas aprovadas, em micro-lotes, na página experimental. Manter PR Draft e original externo protegido.

Não produzir neste estágio um novo parecer de reprovação funcional. A aceitação humana do fluxo experimentado e as pendências técnicas de cobertura de testes H07 devem permanecer rastreáveis separadamente.
