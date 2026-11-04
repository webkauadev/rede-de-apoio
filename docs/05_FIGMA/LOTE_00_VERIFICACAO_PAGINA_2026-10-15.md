# LOTE 00 — Verificação da página duplicada — 15/10/2026

**Status do gate: BLOQUEADO / NÃO APROVADO. Verificação encerrada sem correções.**

Registro: 2026-10-15T21:26:07+00:00 (UTC; 15/10/2026 em America/Manaus). Executor: ChatGPT Work. Plano vigente lido no head cd8b04fc84e80906062b62d6afdf240348ba191e do PR #127; base canônica GitHub 4712047e4550e4504b213e638aaf8a17310f4935.

## 1. Escopo e mudança de estratégia

A revisão do solicitante substituiu a duplicação de arquivo inteiro pela duplicação nativa, feita manualmente pelo solicitante, somente da página Fluxo Final no mesmo arquivo. O bloqueio anterior de acesso ao comando Duplicate não é mais o motivo deste gate. Esta execução verificou a página já existente: não criou outra cópia, não alterou o Figma e não executou LOTE 01.

O inventário foi preservado, porém a duplicação deixou destinos de Prototype para a página original. Foram confirmadas **26 actions ON_CLICK → NAVIGATE visíveis**: **17 no recorte canônico** e **9 no quadro de revisão não canônico**. Portanto, **não é possível confirmar ausência de navegação indevida para a original**.

## 2. Manifesto das páginas

| Papel | Nome real | FileKey | Page node ID | Link |
|---|---|---|---|---|
| Baseline/backup preservado | Fluxo Final | tcyj2fkTXei2CJbqaRxqCp | 5926:1014 | [5926:1014](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1014) |
| Trabalho experimental | Fluxo Final — CORREÇÕES AUDITORIA | tcyj2fkTXei2CJbqaRxqCp | 6223:6270 | [6223:6270](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6270) |

O nó fornecido 6223:6270 foi resolvido como PAGE, descendente direto do Document 0:0. Os IDs das páginas são distintos. O nome real da cópia não inclui a data; não foi renomeado, pois a execução é somente de verificação.

Nenhuma alteração em FIGMA_REGISTRY.yaml, PROTOTYPE_INTEGRITY.yaml ou STATE_MATRIX.yaml. A página original continua canônica; a cópia não foi promovida.

## 3. Fontes consultadas

AGENTS.md; FIGMA_REGISTRY.yaml; PROTOTYPE_INTEGRITY.yaml; STATE_MATRIX.yaml; WORKFLOW.md; plano atualizado e Conversation do PR #127. Foram usados também os inventários da auditoria de 15/10/2026, sempre confrontados com as duas páginas vivas.

## 4. Método e alcance

Leitura programática das duas páginas pelo conector Figma, com travessia da hierarquia e resolução dos IDs reais. Foram comparados os mesmos caminhos estruturais, tipos, dimensões/layout, texto e estilos, fills/strokes/effects, clipping/scroll, variant/component properties, mainComponent, bindings, imagens e reactions. A ordem/hierarquia foi comparada após normalizar referências internas por caminho; variantes externas CHANGE_TO foram separadas da navegação entre telas.

As projeções foram comparadas por comprimento e dois hashes FNV de 32 bits; são fingerprints de comparação, não assinatura criptográfica do arquivo Figma. SHA-256 das exportações textuais está no apêndice. Não se alega equivalência de todos os campos internos não expostos pela API ou renderização pixel a pixel.

Metadados de overrides mudam com a identidade dos nós duplicados e foram retirados da comparação de conteúdo após inspeção direcionada. Reactions foram comparadas separadamente, mantendo todos os destinos reais. Assim, uma diferença de ID não foi automaticamente classificada como perda visual.

**Nenhum clique/jornada em Presentation foi executado.** Os resultados de interações são configurações verificadas, não execução manual. Back/CLOSE com histórico, temporização e scroll real não foram homologados nesta etapa.

## 5. Resultado de integridade

| Verificação | Original | Cópia | Resultado |
|---|---|---|---|
| Seções de primeiro nível | 6 | 6 | Preservadas, mesma ordem, nome e geometria; novos IDs abaixo |
| Raízes nas seis seções | 142 | 142 | Preservadas; inclui 29 raízes não canônicas |
| Descendentes inventariados (sem PAGE/SECTION) | 8789 | 8789 | Mesmos tipos e contagens |
| Recorte canônico | 113 | 113 | 17 bases + 68 estados + 12 overlays/Settings + 16 nós RO |
| T01–T17 | 17 | 17 | Todos encontrados com novos IDs reais |
| Cadastros Bottom Sheet | 5 | 5 | T06/T08/T09/T10/T11; create/erro e anexo T10 presentes |
| Nós com reactions no recorte canônico | 301 | 301 | 293 visíveis em cada página |
| Nós com reactions na página inteira | 461 | 461 | Contagem preservada; destinos não integralmente remapeados |
| Instâncias | 1603 | 1603 | 1.603 em cada; conjunto/contagens de mainComponents idênticos |
| Masters referenciados distintos | 79 | 79 | 79 IDs resolvidos, mesmos vínculos; dependências compartilhadas |
| Hashes de imagem distintos | 4 | 4 | 4, mesmo conjunto observado |
| IDs de variável referenciados | 139 | 139 | 139, mesmo conjunto observado |
| Coleções locais no arquivo | 13 | 13 | 13 compartilhadas; mesmos IDs, modos e contagens |
| Flow starting points | 18 | 18 | 18 remapeados para nós da cópia, inclusive T01; marcadores históricos preservados |
| Projeções de conteúdo/estrutura sem overrides | 142 | 142 | 141 idênticas; 1 diferença submilésima de coordenada, detalhada abaixo |
| Projeções de reactions por raiz | 142 | 142 | 133 equivalentes; 9 diferem, contendo os 26 desvios listados |
| Destinos de navegação da cópia na original | 0 | 26 | REPROVADO: 17 canônicos + 9 de revisão, todos visíveis |

### Diferença geométrica localizada

No cadastro T12, o nó Background+Border original 5926:35578 e sua cópia 6223:8048 diferem apenas na coordenada Y/translação Y: 64.33349609375 → 64.333984375, delta **+0.00048828125 px**. Não houve alteração de texto, largura, altura, imagem ou demais propriedades extraídas desse cadastro. Trata-se de diferença submilésima de serialização/coordenada; não foi tratada como perda estrutural relevante nem corrigida.

### Estrutura das seções

| Seção | Original | Cópia | Filhos |
|---|---|---|---|
| MAIN FLOW — T01–T17 — CANONICAL MIGRATED BASELINES | [5926:1015](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1015) | [6223:6271](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6271) | 17 |
| STATE FLOWS — APPROVED MIGRATED STATES | [5926:32075](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32075) | [6223:6862](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6862) | 81 |
| OVERLAYS — CANONICAL | [5932:4923](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5932-4923) | [6223:8964](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8964) | 12 |
| PESSOA IDOSA — READ ONLY | [5948:5316](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-5316) | [6223:9196](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9196) | 16 |
| PILOTO — PADRÃO DE CADASTRO EM BOTTOM SHEET — T08 | [5959:6208](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5959-6208) | [6223:9765](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9765) | 4 |
| Entity Entry Bottom Sheet — Propagation Review (NON-CANONICAL) | [5976:7063](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5976-7063) | [6223:9967](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9967) | 12 |

Os 13 formulários full-page superados, o piloto e o quadro de revisão foram preservados como parte da página inteira. Não foram promovidos a estados canônicos nem removidos. Seus defeitos preexistentes não foram reabertos como falha nova da cópia.

## 6. Inventário experimental — 113 nós canônicos

Esta tabela é a correspondência observada nesta duplicação; não reutilizar os IDs da origem para editar o trabalho. O rótulo é o estado correspondente do inventário canônico. Não transforma a cópia em fonte canônica.

| Tela/estado | Nó original | Nó real de trabalho | Descendentes | Reactions (nós) |
|---|---|---|---|---|
| [FLUXO FINAL] T01 — Login / default | [5926:1016](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1016) | [6223:6272](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6272) | 41 | 2 |
| [FLUXO FINAL] T02 — Cadastro / default | [5926:1070](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1070) | [6223:6301](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6301) | 58 | 2 |
| [FLUXO FINAL] T03 — Home / default | [5926:1151](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1151) | [6223:6338](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6338) | 83 | 9 |
| [FLUXO FINAL] T04 — Calendário de Cuidados / week | [5926:1261](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1261) | [6223:6364](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6364) | 159 | 5 |
| [FLUXO FINAL] T05 — Detalhamento do Dia / default | [5926:1420](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1420) | [6223:6495](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6495) | 109 | 4 |
| [FLUXO FINAL] T06 — Diário de Cuidados / normal | [5926:1542](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1542) | [6223:6562](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6562) | 156 | 12 |
| [FLUXO FINAL] T07 — Histórico de Cuidados / default | [5926:1712](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1712) | [6223:6581](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6581) | 84 | 9 |
| [FLUXO FINAL] T08 — Medicamentos / list | [5926:1801](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1801) | [6223:6593](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6593) | 81 | 8 |
| [FLUXO FINAL] T09 — Tarefas / default | [5926:1886](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1886) | [6223:6630](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6630) | 80 | 10 |
| [FLUXO FINAL] T10 — Consultas e Recomendações / default | [5926:1993](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-1993) | [6223:6663](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6663) | 63 | 8 |
| [FLUXO FINAL] T11 — Compromissos / default | [5926:2060](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2060) | [6223:6682](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6682) | 57 | 8 |
| [FLUXO FINAL] T12 — Perfil da Pessoa Idosa / view | [5926:2126](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2126) | [6223:6704](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6704) | 39 | 4 |
| [FLUXO FINAL] T13 — Rede de Cuidado / default | [5926:2160](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2160) | [6223:6738](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6738) | 47 | 4 |
| [FLUXO FINAL] T14 — Contatos Importantes / default | [5926:2229](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2229) | [6223:6773](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6773) | 33 | 4 |
| [FLUXO FINAL] T15 — Informações de Emergência / default | [5926:2278](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2278) | [6223:6788](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6788) | 23 | 1 |
| [FLUXO FINAL] T16 — Preferências de Notificações / default | [5926:2310](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2310) | [6223:6800](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6800) | 59 | 3 |
| [FLUXO FINAL] T17 — Auditoria / default | [5926:2379](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2379) | [6223:6836](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6836) | 48 | 5 |
| [PROTO STATE] T01 — Login / invalid_credentials | [5926:32076](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32076) | [6223:6863](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6863) | 43 | 0 |
| [PROTO STATE] T01 — Login / loading | [5926:32132](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32132) | [6223:6894](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6894) | 43 | 1 |
| [PROTO STATE] T02 — Cadastro / validation_error | [5926:32187](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32187) | [6223:6923](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6923) | 59 | 0 |
| [PROTO STATE] T02 — Cadastro / loading | [5926:32269](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32269) | [6223:6961](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6961) | 60 | 1 |
| [PROTO STATE] T03 — Home / loading | [5926:32351](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32351) | [6223:6998](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6998) | 51 | 0 |
| [PROTO STATE] T04 — Calendário de Cuidados / day | [5926:32402](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32402) | [6223:7016](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7016) | 123 | 2 |
| [PROTO STATE] T05 — Detalhamento do Dia / empty | [5926:32525](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32525) | [6223:7111](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7111) | 45 | 0 |
| [PROTO STATE] T05 — Detalhamento do Dia / loading | [5926:32574](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32574) | [6223:7129](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7129) | 55 | 0 |
| [PROTO STATE] T05 — Detalhamento do Dia / delay | [5926:32630](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32630) | [6223:7154](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7154) | 109 | 0 |
| [PROTO STATE] T05 — Detalhamento do Dia / corrected | [5926:32752](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32752) | [6223:7221](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7221) | 112 | 0 |
| [PROTO STATE] T05 — Detalhamento do Dia / detail | [5926:32875](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32875) | [6223:7288](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7288) | 59 | 0 |
| [PROTO STATE] T06 — Diário de Cuidados / empty | [5926:32938](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32938) | [6223:7308](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7308) | 45 | 1 |
| [PROTO STATE] T06 — Diário de Cuidados / loading | [5926:32989](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-32989) | [6223:7315](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7315) | 47 | 0 |
| [PROTO STATE] T06 — Diário de Cuidados / success | [5926:33509](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-33509) | [6223:7413](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7413) | 158 | 2 |
| [PROTO STATE] T07 — Histórico de Cuidados / empty | [5926:33682](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-33682) | [6223:7432](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7432) | 46 | 0 |
| [PROTO STATE] T07 — Histórico de Cuidados / loading | [5926:33734](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-33734) | [6223:7440](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7440) | 46 | 0 |
| [PROTO STATE] T07 — Histórico de Cuidados / detail | [5926:33783](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-33783) | [6223:7449](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7449) | 66 | 2 |
| [PROTO STATE] T07 — Histórico de Cuidados / correction | [5926:33852](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-33852) | [6223:7460](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7460) | 67 | 2 |
| [PROTO STATE] T07 — Histórico de Cuidados / correction_complete | [5926:33928](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-33928) | [6223:7474](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7474) | 87 | 2 |
| [PROTO STATE] T07 — Histórico de Cuidados / exporting | [5926:34020](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34020) | [6223:7487](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7487) | 86 | 1 |
| [PROTO STATE] T07 — Histórico de Cuidados / export_complete | [5926:34110](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34110) | [6223:7499](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7499) | 87 | 1 |
| [PROTO STATE] T08 — Medicamentos / empty | [5926:34202](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34202) | [6223:7512](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7512) | 48 | 1 |
| [PROTO STATE] T08 — Medicamentos / created | [5926:34369](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34369) | [6223:7621](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7621) | 83 | 1 |
| [PROTO STATE] T09 — Tarefas / empty | [5926:34452](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34452) | [6223:7660](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7660) | 51 | 1 |
| [PROTO STATE] T09 — Tarefas / loading | [5926:34512](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34512) | [6223:7679](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7679) | 53 | 0 |
| [PROTO STATE] T09 — Tarefas / task_created | [5926:34727](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34727) | [6223:7755](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7755) | 95 | 4 |
| [PROTO STATE] T09 — Tarefas / task_completed | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) | 80 | 1 |
| [PROTO STATE] T10 — Consultas e Recomendações / empty | [5926:34962](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34962) | [6223:7828](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7828) | 49 | 1 |
| [PROTO STATE] T10 — Consultas e Recomendações / loading | [5926:35011](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35011) | [6223:7839](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7839) | 48 | 0 |
| [PROTO STATE] T10 — Consultas e Recomendações / success | [5926:35059](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35059) | [6223:7849](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7849) | 65 | 1 |
| [PROTO STATE] T11 — Compromissos / empty | [5926:35192](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35192) | [6223:7915](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7915) | 51 | 1 |
| [PROTO STATE] T11 — Compromissos / loading | [5926:35252](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35252) | [6223:7934](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7934) | 51 | 0 |
| [PROTO STATE] T11 — Compromissos / success | [5926:35494](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35494) | [6223:8016](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8016) | 64 | 1 |
| [PROTO STATE] T12 — Perfil da Pessoa Idosa / registration | [5926:35570](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35570) | [6223:8040](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8040) | 50 | 0 |
| [PROTO STATE] T12 — Perfil da Pessoa Idosa / edit | [5926:35621](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35621) | [6223:8086](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8086) | 42 | 2 |
| [PROTO STATE] T12 — Perfil da Pessoa Idosa / success | [5926:35664](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35664) | [6223:8124](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8124) | 33 | 1 |
| [PROTO STATE] T12 — Perfil da Pessoa Idosa / validation_error | [5926:35701](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35701) | [6223:8150](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8150) | 50 | 2 |
| [PROTO STATE] T13 — Rede de Cuidado / loading | [5926:35752](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35752) | [6223:8196](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8196) | 24 | 0 |
| [PROTO STATE] T13 — Rede de Cuidado / link_member | [5926:35780](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35780) | [6223:8211](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8211) | 33 | 2 |
| [PROTO STATE] T13 — Rede de Cuidado / validation_error | [5926:35824](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35824) | [6223:8231](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8231) | 38 | 2 |
| [PROTO STATE] T13 — Rede de Cuidado / link_complete | [5926:35876](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35876) | [6223:8253](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8253) | 50 | 3 |
| [PROTO STATE] T13 — Rede de Cuidado / manage_roles | [5926:35948](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-35948) | [6223:8289](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8289) | 42 | 3 |
| [PROTO STATE] T13 — Rede de Cuidado / roles_updated | [5926:36009](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36009) | [6223:8310](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8310) | 52 | 0 |
| [PROTO STATE] T13 — Rede de Cuidado / transfer_principal | [5926:36086](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36086) | [6223:8347](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8347) | 67 | 2 |
| [PROTO STATE] T13 — Rede de Cuidado / transfer_complete | [5926:36186](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36186) | [6223:8392](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8392) | 50 | 0 |
| [PROTO STATE] T13 — Rede de Cuidado / unlink_member | [5926:36258](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36258) | [6223:8428](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8428) | 61 | 2 |
| [PROTO STATE] T13 — Rede de Cuidado / unlinked | [5926:36350](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36350) | [6223:8472](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8472) | 40 | 1 |
| [PROTO STATE] T14 — Contatos Importantes / empty | [5926:36406](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36406) | [6223:8500](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8500) | 21 | 0 |
| [PROTO STATE] T14 — Contatos Importantes / loading | [5926:36437](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36437) | [6223:8512](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8512) | 21 | 0 |
| [PROTO STATE] T14 — Contatos Importantes / success | [5926:36462](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36462) | [6223:8525](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8525) | 44 | 3 |
| [PROTO STATE] T14 — Contatos Importantes / add_contact | [5926:36528](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36528) | [6223:8543](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8543) | 41 | 2 |
| [PROTO STATE] T14 — Contatos Importantes / validation_error | [5926:36591](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36591) | [6223:8565](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8565) | 44 | 2 |
| [PROTO STATE] T14 — Contatos Importantes / edit_contact | [5926:36657](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36657) | [6223:8590](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8590) | 41 | 2 |
| [PROTO STATE] T14 — Contatos Importantes / edit_saved | [5926:36720](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36720) | [6223:8612](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8612) | 36 | 3 |
| [PROTO STATE] T15 — Informações de Emergência / loading | [5926:36772](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36772) | [6223:8628](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8628) | 19 | 1 |
| [PROTO STATE] T15 — Informações de Emergência / empty | [5926:36792](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36792) | [6223:8640](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8640) | 19 | 0 |
| [PROTO STATE] T16 — Preferências de Notificações / saved | [5926:36818](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36818) | [6223:8651](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8651) | 61 | 0 |
| [PROTO STATE] T17 — Auditoria / loading | [5926:36889](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36889) | [6223:8689](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8689) | 27 | 1 |
| [PROTO STATE] T17 — Auditoria / empty | [5926:36917](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36917) | [6223:8703](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8703) | 25 | 0 |
| [PROTO STATE] T17 — Auditoria / detail | [5926:36946](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36946) | [6223:8715](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8715) | 53 | 1 |
| [PROTO STATE] T17 — Auditoria / forbidden | [5926:37017](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-37017) | [6223:8736](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8736) | 21 | 0 |
| [PROTO STATE] T03 — Home / notification_n02_reminder | [5941:5280](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5941-5280) | [6223:8744](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8744) | 86 | 5 |
| [PROTO STATE] T03 — Home / notification_n03_registered | [5941:5316](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5941-5316) | [6223:8771](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8771) | 86 | 5 |
| [PROTO STATE] T03 — Home / notification_n04_delayed | [5941:5352](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5941-5352) | [6223:8798](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8798) | 86 | 5 |
| [PROTO STATE] T12 — Perfil da Pessoa Idosa / access_not_configured | [5944:1014](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5944-1014) | [6223:8825](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8825) | 41 | 2 |
| [PROTO STATE] T12 — Perfil da Pessoa Idosa / invitation_sent | [5944:1068](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5944-1068) | [6223:8860](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8860) | 41 | 2 |
| [PROTO STATE] T12 — Perfil da Pessoa Idosa / access_active | [5944:1122](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5944-1122) | [6223:8895](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8895) | 39 | 1 |
| [PROTO STATE] T12 — Perfil da Pessoa Idosa / access_invitation | [5944:1171](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5944-1171) | [6223:8929](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8929) | 39 | 2 |
| [OVERLAY] Settings / Management Sheet | [5932:4924](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5932-4924) | [6223:8965](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8965) | 53 | 7 |
| [OVERLAY] T08 — Medicamentos / create_sheet | [5967:6307](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5967-6307) | [6223:8966](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8966) | 28 | 3 |
| [OVERLAY] T08 — Medicamentos / create_sheet_error | [5967:6333](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5967-6333) | [6223:8992](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8992) | 29 | 3 |
| [OVERLAY] T09 — Tarefas / new_task | [5974:6252](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5974-6252) | [6223:9019](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9019) | 26 | 3 |
| [OVERLAY] T09 — Tarefas / validation_error | [5974:6312](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5974-6312) | [6223:9034](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9034) | 28 | 3 |
| [OVERLAY] T10 — Consultas e Recomendações / new_record | [5974:35902](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5974-35902) | [6223:9051](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9051) | 19 | 4 |
| [OVERLAY] T10 — Consultas e Recomendações / validation_error | [5974:35948](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5974-35948) | [6223:9068](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9068) | 20 | 4 |
| [OVERLAY] T10 — Consultas e Recomendações / attachment_context | [5974:35996](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5974-35996) | [6223:9086](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9086) | 24 | 3 |
| [OVERLAY] T11 — Compromissos / new_appointment | [5974:36062](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5974-36062) | [6223:9102](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9102) | 32 | 3 |
| [OVERLAY] T11 — Compromissos / validation_error | [5974:36136](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5974-36136) | [6223:9120](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9120) | 35 | 3 |
| [OVERLAY] T06 — Diário de Cuidados / new_record | [5977:7182](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5977-7182) | [6223:9141](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9141) | 50 | 3 |
| [OVERLAY] T06 — Diário de Cuidados / validation_error | [5977:7249](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5977-7249) | [6223:9168](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9168) | 51 | 3 |
| [READONLY Pessoa Idosa] T03 — default | [5948:5317](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-5317) | [6223:9197](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9197) | 83 | 9 |
| [READONLY Pessoa Idosa] T04 — week | [5948:5423](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-5423) | [6223:9223](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9223) | 159 | 5 |
| [READONLY Pessoa Idosa] T04 — day | [5948:5582](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-5582) | [6223:9354](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9354) | 123 | 2 |
| [READONLY Pessoa Idosa] T05 — default | [5948:5705](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-5705) | [6223:9449](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9449) | 109 | 4 |
| [READONLY Pessoa Idosa] T06 — normal | [5948:5827](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-5827) | [6223:9516](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9516) | 142 | 5 |
| [READONLY Pessoa Idosa] T07 — default | [5948:5997](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-5997) | [6223:9534](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9534) | 79 | 7 |
| [READONLY Pessoa Idosa] T07 — detail | [5948:6086](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6086) | [6223:9546](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9546) | 63 | 1 |
| [READONLY Pessoa Idosa] T08 — list | [5948:6155](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6155) | [6223:9557](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9557) | 81 | 7 |
| [READONLY Pessoa Idosa] T09 — default | [5948:6236](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6236) | [6223:9594](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9594) | 73 | 7 |
| [READONLY Pessoa Idosa] T10 — default | [5948:6343](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6343) | [6223:9627](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9627) | 57 | 7 |
| [READONLY Pessoa Idosa] T11 — default | [5948:6407](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6407) | [6223:9646](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9646) | 56 | 7 |
| [READONLY Pessoa Idosa] T12 — view | [5948:6473](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6473) | [6223:9668](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9668) | 38 | 4 |
| [READONLY Pessoa Idosa] T13 — default | [5948:6516](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6516) | [6223:9702](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9702) | 44 | 4 |
| [READONLY Pessoa Idosa] T14 — default | [5948:6585](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6585) | [6223:9737](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9737) | 26 | 2 |
| [READONLY Pessoa Idosa] T15 — default | [5948:6634](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6634) | [6223:9752](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9752) | 23 | 1 |
| [READONLY Pessoa Idosa] Settings / Management Sheet | [5948:36255](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-36255) | [6223:9764](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9764) | 38 | 5 |

### Mapa específico dos cinco Bottom Sheets

| Tela | Base de trabalho | Cadastro | Erro | Sucesso | Anexo |
|---|---|---|---|---|---|
| T06 | [6223:6562](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6562) | [6223:9141](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9141) | [6223:9168](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9168) | [6223:7413](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7413) | — |
| T08 | [6223:6593](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6593) | [6223:8966](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8966) | [6223:8992](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8992) | [6223:7621](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7621) | — |
| T09 | [6223:6630](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6630) | [6223:9019](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9019) | [6223:9034](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9034) | [6223:7755](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7755) | — |
| T10 | [6223:6663](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6663) | [6223:9051](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9051) | [6223:9068](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9068) | [6223:7849](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7849) | [6223:9086](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9086) |
| T11 | [6223:6682](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6682) | [6223:9102](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9102) | [6223:9120](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9120) | [6223:8016](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8016) | — |

Os pares de reactions dos overlays são equivalentes após normalização para a cópia: OVERLAY/MOVE_IN BOTTOM, SWAP de validação, CLOSE de Cancelar, ON_DRAG/MOVE_OUT BOTTOM e saída de sucesso. A base continua como contexto do overlay na configuração. Isso não certifica Cancelar/gesto/Back executados no player.

A Navigation Bar mantém Home · Agenda · Diário · Saúde, quatro destinos, e a arquitetura de Settings permanece presente. As falhas de destino abaixo afetam as linhas do Settings; não representam ausência do componente.

## 7. L00-INT-001 — Navegação da cópia ainda aponta para a original

**Impacto no gate:** impede considerar a página de trabalho isolada. Uma demonstração iniciada na cópia pode entrar na baseline original. Isso não é uma edição automática da original, mas viola a condição de preparação e torna inseguro confundir o contexto das páginas nas próximas etapas.

Os 26 casos são ON_CLICK → NODE/NAVIGATE. Não são CHANGE_TO de variantes, setas desenhadas no canvas ou hotspots invisíveis. Todos os 13 destinos externos de navegação pertencem à PAGE 5926:1014, conforme resolução de ancestrais.

### 7.1 Dezessete casos no recorte canônico

| Origem/estado | Raiz de trabalho | Hotspot real | Destino atual indevido (original) | Equivalente na cópia, somente referência |
|---|---|---|---|---|
| [FLUXO FINAL] T09 — Tarefas / default | [6223:6630](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6630) | I6223:6651;1999:10276;6223:10381 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [FLUXO FINAL] T09 — Tarefas / default | [6223:6630](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6630) | I6223:6661;1999:10276;6223:10384 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [FLUXO FINAL] T14 — Contatos Importantes / default | [6223:6773](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6773) | I6223:6785;1999:10276;6223:10388 | [5926:36657](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36657) | [6223:8590](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8590) |
| [FLUXO FINAL] T14 — Contatos Importantes / default | [6223:6773](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6773) | I6223:6787;1999:10276;6223:10390 | [5926:36657](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36657) | [6223:8590](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8590) |
| [PROTO STATE] T09 — Tarefas / task_created | [6223:7755](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7755) | I6223:7776;1999:10276;6223:10405 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [PROTO STATE] T09 — Tarefas / task_created | [6223:7755](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7755) | I6223:7781;1999:10276;6223:10407 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [PROTO STATE] T09 — Tarefas / task_created | [6223:7755](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7755) | I6223:7791;1999:10276;6223:10410 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [OVERLAY] Settings / Management Sheet | [6223:8965](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8965) | I6223:8965;5662:21924;1953:14741;6223:10467 | [5926:2126](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2126) | [6223:6704](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6704) |
| [OVERLAY] Settings / Management Sheet | [6223:8965](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8965) | I6223:8965;5662:21924;1953:14741;6223:10468 | [5926:2160](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2160) | [6223:6738](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6738) |
| [OVERLAY] Settings / Management Sheet | [6223:8965](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8965) | I6223:8965;5662:21924;1953:14741;6223:10469 | [5926:2229](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2229) | [6223:6773](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6773) |
| [OVERLAY] Settings / Management Sheet | [6223:8965](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8965) | I6223:8965;5662:21924;1953:14741;6223:10470 | [5926:36772](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36772) | [6223:8628](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8628) |
| [OVERLAY] Settings / Management Sheet | [6223:8965](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8965) | I6223:8965;5662:21924;1953:14741;6223:10472 | [5926:2310](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-2310) | [6223:6800](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-6800) |
| [OVERLAY] Settings / Management Sheet | [6223:8965](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8965) | I6223:8965;5662:21924;1953:14741;6223:10473 | [5926:36889](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-36889) | [6223:8689](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-8689) |
| [READONLY Pessoa Idosa] Settings / Management Sheet | [6223:9764](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9764) | I6223:9764;5662:21924;1953:14741;6223:10503 | [5948:6473](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6473) | [6223:9668](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9668) |
| [READONLY Pessoa Idosa] Settings / Management Sheet | [6223:9764](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9764) | I6223:9764;5662:21924;1953:14741;6223:10504 | [5948:6516](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6516) | [6223:9702](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9702) |
| [READONLY Pessoa Idosa] Settings / Management Sheet | [6223:9764](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9764) | I6223:9764;5662:21924;1953:14741;6223:10505 | [5948:6585](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6585) | [6223:9737](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9737) |
| [READONLY Pessoa Idosa] Settings / Management Sheet | [6223:9764](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9764) | I6223:9764;5662:21924;1953:14741;6223:10506 | [5948:6634](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5948-6634) | [6223:9752](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9752) |

Agrupamento: 5 Concluir em T09 (2 na base e 3 em tarefa criada), 2 Editar na base T14, 6 destinos do Settings comum e 4 do Settings somente leitura.

### 7.2 Nove casos no quadro de revisão não canônico

| Origem/estado | Raiz de trabalho | Hotspot real | Destino atual indevido (original) | Equivalente na cópia, somente referência |
|---|---|---|---|---|
| [REVIEW] T09 / baseline | [6223:9968](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9968) | I6223:9989;1999:10276;6223:10511 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [REVIEW] T09 / baseline | [6223:9968](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-9968) | I6223:9999;1999:10276;6223:10514 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [REVIEW] T09 / sheet | [6223:10001](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-10001) | I6223:10022;1999:10276;6223:10516 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [REVIEW] T09 / sheet | [6223:10001](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-10001) | I6223:10032;1999:10276;6223:10519 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [REVIEW] T09 / validation | [6223:10048](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-10048) | I6223:10069;1999:10276;6223:10521 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [REVIEW] T09 / validation | [6223:10048](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-10048) | I6223:10079;1999:10276;6223:10524 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [REVIEW] T09 / success | [6223:10097](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-10097) | I6223:10118;1999:10276;6223:10526 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [REVIEW] T09 / success | [6223:10097](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-10097) | I6223:10123;1999:10276;6223:10528 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |
| [REVIEW] T09 / success | [6223:10097](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-10097) | I6223:10133;1999:10276;6223:10531 | [5926:34858](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=5926-34858) | [6223:7794](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp?node-id=6223-7794) |

Os destinos equivalentes da última coluna são apenas a correspondência estrutural para uma futura decisão de remapeamento. **Nenhuma reaction foi alterada.** Apontar para o estado equivalente na cópia não resolve, por si só, o contexto de entidade dos AUD-007/AUD-008; os 28 achados continuam pendentes.

### Passos de reprodução/verificação no editor

1. Abrir a página de trabalho 6223:6270.
2. Inspecionar um dos hotspots listados, por exemplo Concluir na T09 6223:6630 ou uma linha do Settings 6223:8965.
3. Conferir ON_CLICK → NAVIGATE e o destinationId.
4. Resolver o destino: ele pertence à página original 5926:1014, e não à cópia 6223:6270.
5. Repetir em Settings RO 6223:9764: quatro linhas visíveis também levam ao ramo RO da original.

Não se declarou que esses cliques foram executados em Presentation. A configuração é suficiente para reprovar a condição de não possuir ligações para a original.

## 8. Dependências compartilhadas e proteção da baseline

Duplicar uma página no mesmo arquivo conserva dependências globais. A Foundation 5639:21448, primitives Obra/shadcn, componentes locais de outras páginas, estilos e variáveis continuam compartilhados. Os **79 masters referenciados e suas contagens são iguais** nas duas páginas; não há evidência de perda de referência de mainComponent na duplicação.

Em 53 instâncias, o mainComponent tem ID resolvido, porém seu ancestor PAGE não é exposto pela API. Essa limitação ocorre igualmente na origem e na cópia; não foi classificada como master perdido. Não se pressupõe independência desses componentes.

Para qualquer correção futura, não editar master, token, estilo ou biblioteca global que altere a original. Trabalhar em instâncias/elementos da cópia; se indispensável, isolar uma variante/master local com autorização e registro. **Nada disso foi executado no LOTE 00.**

## 9. Preservação do original e checkpoint

Nenhuma chamada de escrita de conteúdo Figma foi realizada: não houve setReactions, edição de texto, criação/remoção/movimento de nó, alteração de variável/estilo/master ou renomeação de página. Foram feitas apenas leituras e seleção de contexto de página para inspeção. Portanto, **esta execução não editou a página original nem a cópia**. Isso descreve as ações deste executor, não monitoramento de edições simultâneas por terceiros.

Checkpoint de nome previsto BASELINE — PRE CORRECAO — 2026-10-15: **não criado**. Não há operação de versão nomeada exposta pelo conector utilizado; a interface nativa não esteve disponível na tentativa anterior. Não foi invocado método não documentado, nem uma exportação foi apresentada como versão Figma. A limitação é registrada conforme a seção 0.6 do plano.

Este registro e o manifesto de IDs são evidência de observação, não substituto de versão nomeada do Figma. O versionamento nativo, quando disponível, é do arquivo inteiro e precisa ser identificado como tal.

## 10. Conclusão e condição para liberar o gate

**LOTE 00 NÃO APROVADO / BLOQUEADO POR L00-INT-001.** Estrutura presente, porém navegação não isolada. A execução de verificação está encerrada, sem autorização presumida para corrigir os desvios.

Condição para nova validação: ajustar, exclusivamente na cópia e mediante autorização específica, as referências indevidas; conferir novamente todos os destinos canônicos e os casos de revisão; manter a original e dependências globais intocadas; registrar checkpoint quando disponível. Não reabrir nem resolver os 28 AUDs nesta etapa.

LOTE 01 não iniciado. Nenhum merge; PR #127 deve permanecer em Draft para revisão humana. Alterações desta entrega são exclusivamente este documento experimental, sem troca dos registries canônicos.

## 11. Evidência de comparação

[Evidências estruturais completas desta verificação](LOTE_00_EVIDENCIAS_2026-10-15.json). O JSON experimental contém as quatro projeções, a lista completa das 26 ligações e a diferença de coordenada de T12. Não altera o registry canônico.

Projeções utilizadas: original.json / copy.json (estrutura, conjuntos e navegação); original-core.json / copy-core.json (conteúdo sem metadados de overrides e lista completa dos desvios). Os hashes abaixo identificam as capturas textuais locais usadas na análise; não são hashes binários do arquivo Figma.

| Captura textual | SHA-256 |
|---|---|
| original.json | b8d98b2c2401803d54110a15c5b4535b911ec71b833b53fb83d75069e481102c |
| copy.json | 9f8ba7895354b992e29fe0dada386371bc9f1f1ab4c1301e45ffdb259874ba02 |
| original-core.json | 4d1b5546519fd3fcdf3b363ce4988b394da0055b2881ef8ef5e865259e3963c3 |
| copy-core.json | c0db1b3cf6162d70b4df92fb3452191d21b10ad5def25fddb3aeda5e641a9416 |

A leitura inicial da cópia excedeu o limite de retorno por 77 bytes; foi repetida com resumo mais compacto, sem escrita no canvas. Não houve perda de dados validada a partir de resposta truncada.

## 12. Validação documental

Executado no checkout da branch docs/figma-plano-correcao-20261015, base cd8b04fc84e80906062b62d6afdf240348ba191e, com os documentos desta entrega: python scripts/validate_agent_context.py. Resultado: **PASSOU (exit code 0)**; 17 telas, 36 US, 30 RF e 78 referências de Issues no catálogo. Esse check valida contexto documental; não aprova isolamento da cópia, runtime ou os 28 AUDs.
