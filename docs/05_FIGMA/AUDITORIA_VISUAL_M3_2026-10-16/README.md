# Auditoria visual Material Design 3 — 16/10/2026

> **TERMO FINAL — 16/10/2026:** após aplicar VIS-001–VIS-008 e conferir as composições corrigidas, o solicitante aprovou o acabamento e solicitou encerramento/homologação. Consulte [Homologação final do protótipo](../HOMOLOGACAO_FINAL_PROTOTIPO_2026-10-16.md). O relatório abaixo descreve a **auditoria anterior às correções**; a execução está em [Execução das microcorreções](EXECUCAO_MICROCORRECOES_2026-10-16.md). A homologação é por aceite humano para demonstração, com ressalva sobre testes interativos exaustivos.

> **Atualização de execução — 16/10/2026:** após autorização explícita do solicitante, as microcorreções VIS-001–VIS-008 foram aplicadas na página experimental do Figma, com verificações estruturais e capturas direcionadas. **Não há edição no original; a regressão interativa curta continua pendente.** Consulte [Execução das microcorreções](EXECUCAO_MICROCORRECOES_2026-10-16.md). O restante deste documento permanece como registro histórico da auditoria feita antes das alterações.

**Somente leitura no Figma. Diagnóstico entregue para aprovação; nenhuma microcorreção foi executada.**

**8 padrões de defeito visual confirmados: 1 P1, 5 P2 e 2 P3.** O principal é o recorte de rótulos no rodapé de novos formulários. A mesma composição estreita foi medida em **15 overlays**. Não são 15 defeitos independentes.

Auditoria das **17 bases T01–T17**, com **63 capturas selecionadas de 63 nós distintos**, incluindo estados, painéis e referências da Foundation. As 15 composições de ações receberam medição direcionada; seis tiveram render completo nesta família. Não foi comparado indiscriminadamente todo o universo de estados.

A aprovação manual de Login, quatro abas, Settings e retornos permanece preservada conforme [validação manual](../EXECUCAO_2026-10-15/HOMOLOGACAO_2026-10-16/VALIDACAO_MANUAL_FLUXO_2026-10-16.md). Esta missão não repetiu testes de autenticação, navegação, permissões ou reactions e não emite nova reprovação funcional.

| Prioridade | Padrões | Consequência |
|---|---:|---|
| P1 | 1 | Rótulos de confirmação ilegíveis/truncados em botões |
| P2 | 5 | Texto de contexto cortado, contornos fracos, Rows e grid inconsistentes |
| P3 | 2 | Rótulo auxiliar muda no Loading; opacidade de scrim divergente |

| Achado | Telas | Problema |
|---|---|---|
| [VIS-001](ACHADOS_VIS.md#vis-001) · P1 | T04, T08, T13 | Grupo de ações estreito corta rótulos de operações críticas |
| [VIS-002](ACHADOS_VIS.md#vis-002) · P2 | T04 | Mensagem de confirmação de cancelamento fica truncada |
| [VIS-003](ACHADOS_VIS.md#vis-003) · P2 | T12 | Estado de acesso ativo corta a última linha de orientação |
| [VIS-004](ACHADOS_VIS.md#vis-004) · P2 | T06, T14 | Contornos de campos ainda usam borda decorativa de baixo contraste |
| [VIS-005](ACHADOS_VIS.md#vis-005) · P2 | T12 | Destinos do perfil são desenhados como cards manuais |
| [VIS-006](ACHADOS_VIS.md#vis-006) · P2 | T13 | Gerenciar papéis troca o grid externo de 16 por 24 px |
| [VIS-007](ACHADOS_VIS.md#vis-007) · P3 | T01 | Link auxiliar muda de nome durante Loading do Login |
| [VIS-008](ACHADOS_VIS.md#vis-008) · P3 | T06, T08, T09, T10, T11 | Scrim operacional está mais opaco que a referência aprovada |

## Prioridade prática

Corrigir primeiro a distribuição das ações de plantão, posologia/administração e constituição da rede (VIS-001). O alvo de toque mínimo é atendido, mas isso não garante largura suficiente para ler o rótulo. O texto Confirmar cancelamento tem 163 px, dentro de botão com 71,5 px. A simples adoção de dois botões de 157 px tampouco resolve esse rótulo mais padding.

Em seguida, ajustar as alturas dos textos de cancelamento/acesso ativo, os contornos locais de campos, a composição dos destinos de T12 e o grid de T13. Os P3 podem ficar para o acabamento após os problemas de legibilidade.

## O que está consistente na amostra

- Bases 390×844 e navegação Home · Agenda · Diário · Saúde, com indicador tonal e label visível; Settings permanece separado.
- Headers da Foundation, Geist, CTAs primários em Primary e ações secundárias de menor ênfase nas composições inspecionadas.
- Os cinco cadastros operacionais preservam geometria de Bottom Sheet e campos/ações dentro da largura útil de 326 px nas composições canônicas.
- Loading/Disabled e mensagens de erro estão representados sem redução dos alvos inspecionados abaixo de 48 px; os textos de erro verificados usam o papel Danger vigente.
- LocalSubnav de Saúde usa faixa horizontal de 424 px em viewport de 390 px. A parte de Compromissos fora do primeiro recorte é compatível com esse padrão e não foi classificada como clipping defeituoso.

Esses resultados são do recorte inspecionado, sem certificação de todos os alvos, contrastes ou estados do arquivo.

## Entregas

- [Inventário VIS-001–008 e medidas](ACHADOS_VIS.md).
- [Galeria de capturas e comparações](GALERIA.md).
- [Matriz Material 3 e cobertura por T01–T17](MATRIZ_M3.md).
- [Plano de microcorreções e critérios de aceite](PLANO_MICROCORRECOES.md).
- [Índice de evidências, hashes, IDs e resultados](COBERTURA_E_EVIDENCIAS.json).
- [Propriedades, variáveis resolvidas e referências documentais](PROPRIEDADES.json).

## Método, limites e falsos positivos descartados

Foi feita leitura do estado atual por metadata, contexto de design, definições de variáveis e capturas do Figma. O conector desta sessão não expõe use_figma; não foram executados scripts de Plugin API, setters ou inspeção de reactions. Foram consultados somente o arquivo de trabalho e sua Foundation. Não foi acessado ou alterado o original externo.

Alguns exports omitiram ícones/avatares/fills de containers. A consulta do contexto e o render alternativo de T15/T17 e dos painéis mostraram os elementos completos; essas omissões não entraram como defeitos. Nos overlays, foram usados painéis isolados quando necessário. Isso não reconstrói a composição nem comprova por interação a tela-base sob o scrim. Capturas selecionadas não foram retocadas ou montadas para simular uso.

A posição inicial do CTA de T16 junto ao limite do viewport não foi tratada como inacessibilidade: a composição tem viewport rolável e padding; não houve prova de bloqueio. Espaço preservado após ocultar ações no ramo somente leitura também não foi classificado como defeito por si só. O recolhimento da LocalSubnav, gestos, foco, leitor de tela e comportamento real de scroll ficam fora desta auditoria estática.

Metadata/contexto comprovam dimensões e estruturas, mas não fornecem histórico de detach ou vínculo mainComponent completo para todas as instâncias. Não foi alegado detach sem prova. As referências de componentes foram verificadas no arquivo duplicado, sem reutilização cega dos IDs documentais.

## Fontes e precedência

Base documental: `2d4eb7a3526bcb6bc1e2c90a23a2d27a0fc07705`, PR [#127](https://github.com/webkauadev/rede-de-apoio/pull/127), branch `docs/figma-plano-correcao-20261015`. Geração: `2026-10-16T09:40:31.275794-04:00`. Figma: [página experimental](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6270). Requisitos aprovados → M3 → Foundation/identidade → tokens → primitives → tela.

- [AGENTS.md](../../../AGENTS.md).
- [AI_DESIGN_CONTRACT.md](../../07_AI_CONTEXT/AI_DESIGN_CONTRACT.md).
- [MATERIAL3_VISUAL_DIRECTION.md](../../04_DESIGN_SYSTEM/MATERIAL3_VISUAL_DIRECTION.md).
- [DESIGN_TOKENS.md](../../04_DESIGN_SYSTEM/DESIGN_TOKENS.md).
- [COMPONENT_ARCHITECTURE.md](../../04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md).
- [COMPONENT_MAP.yaml](../../04_DESIGN_SYSTEM/COMPONENT_MAP.yaml).
- [ENTITY_ENTRY_BOTTOM_SHEET_PATTERN.md](../../04_DESIGN_SYSTEM/ENTITY_ENTRY_BOTTOM_SHEET_PATTERN.md).
- [FIGMA_GUIDELINES.md](../FIGMA_GUIDELINES.md).
- [README.md](../EXECUCAO_2026-10-15/README.md).
- [VALIDACAO_MANUAL_FLUXO_2026-10-16.md](../EXECUCAO_2026-10-15/HOMOLOGACAO_2026-10-16/VALIDACAO_MANUAL_FLUXO_2026-10-16.md).

Referências externas primárias consultadas em 16/10/2026:

- [Material 3 — Buttons](https://m3.material.io/components/buttons/guidelines): o acesso textual retornou exigência de JavaScript; não foi usado mirror não oficial como autoridade.
- [Material Web — documentação oficial de botões](https://github.com/material-components/material-web/blob/main/docs/components/button.md): distinção de Filled, Tonal, Outlined e Text por ênfase.
- [Google Accessibility — touch target size](https://support.google.com/accessibility/android/answer/7101858?hl=en): alvo e elemento visual são distintos; recomenda 48 dp e separação de 8 dp. O contrato do projeto adota 48×48 **px no Figma**, sem equiparar fisicamente px a dp.
- [Android Design — layout/navigation patterns](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns): hierarquia de ações e navegação em telas compactas.

## Preservação e decisão

Zero alterações no Figma, na Foundation, na página-base interna 5926:1014 e no original externo tcyj2fkTXei2CJbqaRxqCp. Zero mudança de reactions, requisitos ou registries canônicos; nenhuma promoção, Issue nova ou merge. O PR deve continuar Draft.

**O relatório está pronto para análise humana. As correções ficam condicionadas à aprovação dos achados e dos micro-lotes; esta execução termina no diagnóstico.**
