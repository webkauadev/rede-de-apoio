# Auditoria do Figma Canônico — 2026-09-13

## Escopo

Arquivo canônico: `tcyj2fkTXei2CJbqaRxqCp`.

A auditoria foi feita diretamente no Figma, inspecionando páginas registradas, frames atuais por responsável, frames `LEGADO —`, estados T01–T17, reações de protótipo e diferenças entre o canvas e os registries do GitHub.

O objetivo foi preparar o contexto para Codex. **Nenhuma lacuna funcional foi preenchida a partir do Figma.**

## Resultado executivo

- T01–T17: **17/17 com nodes atuais mapeados**.
- A antiga ambiguidade T08 foi resolvida: `5235:924` é a lista atual; `5048:644` é `LEGADO`.
- `prototypeIA` (`5030:154`) contém versões antigas/experimentais de T01/T04/T06/T08 e passa a ser classificada como **referência histórica**, não como fonte atual quando existem frames nas páginas dos responsáveis.
- Foram confirmadas 8 classes de dívida de integridade do protótipo, registradas em `PROTOTYPE_INTEGRITY.yaml` e na Issue #84.
- P03/P04/P05/P06 continuam decisões do GitHub; o Figma não as resolve.
- Estados T12 relacionados ao acesso próprio da Pessoa Idosa continuam `proposal_only` por RF30/US-036.

## Páginas e papéis

| Página | Node | Papel atual |
|---|---|---|
| siteMap | `5003:3` | referência de arquitetura/T01–T17 |
| prototypeIA | `5030:154` | histórico/experimentos; não canônico para frames atuais |
| David | `5019:279` | T01, T02, T12, T13, T14, T15 |
| Rhuan | `5044:164` | T03, T04, T09, T11 |
| Henrique | `5048:190` | T05, T07, T08, T10 |
| Kauã | `5054:211` | T06, T16, T17 |

## Página prototypeIA

Frames top-level encontrados: T01 Login, duas variações T04, três T06 e três T08. Esses frames não usam a convenção atual `[RESPONSÁVEL] T## — Nome / Estado` e já têm equivalentes atuais nas páginas dos responsáveis. Agentes devem tratá-los apenas como referência histórica.

## David

### T01
`5189:730` Default · `5189:800` Credenciais inválidas · `5189:870` Loading.

### T02
`5189:938` Default · `5189:1043` Validation Error · `5189:1152` Loading.

### T12
`5125:2567` Cadastro · `5125:2649` Edição · `5125:2719` Visualização · `5125:2799` Success · `5125:2888` Validation Error.

Também existem `5125:2408`, `5125:2981`, `5125:3069`, `5125:3151` ligados visualmente ao acesso próprio da Pessoa Idosa. Eles permanecem bloqueados por RF30/US-036 e não são escopo aprovado.

A Visualização navega para T13, T14 e T15. Entradas visuais para T16/T17 existem, mas hoje só têm reação de hover: FI-006/FI-007.

### T13
11 frames atuais cobrindo Default, Loading, vínculo, erro, conclusão, papéis, transferência de Principal e desvinculação. O fluxo básico existe, mas vários layers têm nomes semanticamente herdados de outras ações (FI-008).

### T14
8 frames atuais: Default, Empty, Loading, Success, Adicionar, Validation Error, Editar e Alteração salva. Fluxo de formulário/retorno está estruturado.

### T15
3 frames atuais: Default, Loading, Empty.

### Legados
A página ainda guarda versões antigas de Login/Criar conta, todas com prefixo `LEGADO —` e sem autoridade atual.

## Rhuan

### T04
Semana `5122:1870` e Dia `5122:2031`; os hotspots alternam corretamente entre as duas visualizações.

### T09
7 frames atuais: Default, Empty, Loading, Nova tarefa, Validation Error, Tarefa criada e Tarefa concluída. T09 e T11 possuem tabs recíprocas.

### T11
6 frames atuais: Default, Empty, Loading, Novo compromisso, Validation Error e Success.

### T03
5 frames atuais: Default, Loading, Lembrete obrigatório, Cuidado registrado e Atraso. No Default, os cards levam a T04, T09 e T11. Os três frames de aviso são candidatos visuais enquanto P04 permanecer aberta.

## Henrique

### T08
Lista atual `5235:924`; Empty `5118:838`; Cadastrar `5123:1291`; sucesso `5141:2758`; três erros de validação `5130:4159`, `5130:4204`, `5130:4263`.

`5048:644` é explicitamente `LEGADO — [Henrique] T08 — Medicamentos (Lista)`. Um hotspot no Empty ainda navega para ele (FI-001).

### T10
7 frames atuais cobrindo lista, empty/loading/success, novo registro, validation error e E10. O fluxo Default → Novo registro está correto, mas os CTAs “Novo registro” de Empty, Loading e Success apontam para T08/Cadastrar medicamento (FI-002–FI-004).

### T07
8 frames atuais: Default, Empty, Loading, Detalhe, Correção, Correção concluída, Exportando, Exportação concluída. O fluxo de correção preserva o original conceitualmente; permissão continua P03. Exportação está representada visualmente, mas autorização continua P05.

### T05
6 frames atuais: Default, Empty, Loading, Atraso, Corrigido, Detalhe. Nenhuma reação explícita relevante foi detectada na auditoria; os frames funcionam principalmente como estados de visualização.

## Kauã

### T06
6 frames atuais cobrindo Normal/Empty/Loading, Novo Registro/Validation Error e Success. Componentes locais reutilizáveis continuam registrados.

### T16
Default `5211:966` e Alteração salva `5212:432`. Default salva corretamente; o estado salvo contém um salto acidental para T06 (FI-005).

### T17
Default, Loading, Empty, Detalhe e Forbidden. Eventos do Default abrem Detalhe; T16/T17 possuem tabs recíprocas.

## Dívida de integridade confirmada

A lista machine-readable oficial é `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`; a Issue operacional é #84.

- FI-001: T08 Empty → frame LEGADO.
- FI-002/FI-003/FI-004: três estados T10 → T08/Cadastrar medicamento.
- FI-005: T16 Saved → T06/Novo Registro.
- FI-006/FI-007: entradas T12 para T16/T17 sem navegação de clique.
- FI-008: nomes de layers/hotspots de T13 não representam corretamente E22–E25.

## Regra para Codex

Antes de implementar ou redesenhar uma T##:
1. resolver RF/RNF/US no GitHub;
2. abrir `SCREEN_REGISTRY.yaml`;
3. abrir `STATE_MATRIX.yaml`;
4. localizar nodes em `FIGMA_REGISTRY.yaml`;
5. verificar `PROTOTYPE_INTEGRITY.yaml`;
6. tratar Figma como referência visual, nunca como autoridade para fechar lacunas funcionais;
7. auditar screenshot/estrutura depois da alteração;
8. atualizar registries e abrir PR.
