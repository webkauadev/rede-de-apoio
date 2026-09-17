# Catálogo de Telas T01–T17 — Estado Atual

Última auditoria conjunta GitHub + Figma: **2026-09-16** (reauditoria completa; a versão anterior deste arquivo, de 2026-09-13, ficou defasada em relação à consolidação do `Fluxo Final`, ao padrão de Bottom Sheet e às decisões P01–P06/RF30/US-036 aprovadas em 2026-09-14/15).

Este catálogo explica **o que cada T## significa, como a tela se comporta hoje, quais estados existem no Figma canônico e o que já foi resolvido**. A fonte de comportamento funcional é RF/RNF/US e as regras de negócio do GitHub. O Figma documenta o visual/wiring vigente na página `Fluxo Final` (`5926:1014`, file `tcyj2fkTXei2CJbqaRxqCp`); owner pages (`david`, `rhuan`, `henrique`, `kaua`) permanecem como histórico/fonte de migração e não são mais base de implementação.

## Regras de leitura

- `T##` = tela principal do Site Map. `E##` = ação/elemento transversal, não é uma nova tela. `N##` = evento/notificação.
- Estados (Loading, Empty, Success, Validation Error, Forbidden) são variações da mesma tela: `STATE = PAGE BASE + DELTA MÍNIMO`.
- Frame `LEGADO —` e owner pages nunca são base quando existe equivalente no `Fluxo Final`.
- Cadastro operacional contextual (T06/T08/T09/T10/T11) usa **Bottom Sheet** (`PAGE BASE + SCRIM + BOTTOM SHEET`), não página inteira. Os antigos formulários full-page existem apenas como `[LEGACY PROTO STATE] ... SUPERSEDED BY BOTTOM SHEET` — confirmado ao vivo no Figma em 2026-09-16. Ver `docs/04_DESIGN_SYSTEM/ENTITY_ENTRY_BOTTOM_SHEET_PATTERN.md` e `docs/05_FIGMA/ENTITY_ENTRY_BOTTOM_SHEET_FLOW.yaml`.
- P01–P06 (#73–#78) estão todos **resolvidos/fechados** no GitHub (P01 em 2026-09-15, P02–P06 em 2026-09-08/2026-09-14). RF30/#34 e US-036/#72 estão **aprovados**, não são mais proposta.
- FI-001–FI-008 (Issue #84) estão **resolvidos/superados** no `Fluxo Final`; preservados apenas como histórico em `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`.

## T01 — Login
**Responsável:** David · **US:** US-002 (+ autenticação compartilhada com US-036) · **Origem:** RF02

Autentica uma conta válida, incluindo a Pessoa Idosa com conta própria (RF30/US-036).

**Figma canônico (Fluxo Final):** Default `5926:1016`; Credenciais inválidas `5926:32076`; Loading `5926:32132`.

**Wiring:** Entrar → Loading → T03; Criar conta → T02.

## T02 — Cadastro de Conta
**Responsável:** David · **US:** US-001 (+ ativação compartilhada com US-036) · **Origem:** RF01

Cria a conta de acesso. Para a Pessoa Idosa, a senha é definida pelo próprio titular e a conta é vinculada ao próprio perfil (RF30).

**Figma canônico:** Default `5926:1070`; Validation Error `5926:32187`; Loading `5926:32269`.

**Wiring:** ação primária → Loading; "Entrar" retorna a T01.

## T03 — Home / Visão Geral do Cuidado
**Responsável:** Rhuan · **US:** US-009, US-020, US-029, US-030 · **Origens:** RF07, RF17, RF25, RF26

Resumo operacional pós-autenticação.

**Figma canônico:** Default `5926:1151`; Loading `5926:32351`; N02 (lembrete obrigatório) `5941:5280`; N03 (cuidado registrado) `5941:5316`; N04 (atraso) `5941:5352`.

**Wiring:** Plantonista atual → T04; Tarefa pendente → T09; Próximo compromisso → T11.

**P04/#76 (resolvido):** N02/N03/N04 usam feedback transitório global (Snackbar/Sonner) no AppShell, não uma Central de Notificações. N02 → T05; N03 → T05/T07; N04 → T05, com resumo possível em T03; N01 → T04.

## T04 — Calendário de Cuidados
**Responsável:** Rhuan · **US:** US-008, US-009, US-011, US-012, US-013, US-014 · **RF:** RF06–RF10

Organiza e consulta a escala de cuidado/plantões. "Plantonista Atual" é condição temporária, nunca perfil.

**Figma canônico:** Semana `5926:1261`; Dia `5926:32402`.

**Wiring:** Semana ↔ Dia. E03–E07 (plantão/troca) são ações da T04, não telas novas.

**Correção estrutural aplicada (2026-09-15):** viewport `5926:1263` com `clipsContent=true` e `overflowDirection=VERTICAL` — o bug de conteúdo invadindo o header foi corrigido.

## T05 — Detalhamento do Dia
**Responsável:** Henrique · **US principal:** US-010 · **Contexto:** US-019, US-020, US-021, US-023, US-025, US-030, US-034

Consolida o planejado e o registrado em um dia.

**Figma canônico:** Default `5926:1420`; Empty `5926:32525`; Loading `5926:32574`; Atraso `5926:32630`; Corrigido `5926:32752`; Detalhe `5926:32875`.

"Atrasado" só se aplica a ação programada após 15 min sem registro. "Corrigido" preserva o original (RN-006/P03).

## T06 — Diário de Cuidados
**Responsável:** Kauã · **US:** US-015, US-021, US-027 · **RF:** RF11, RF18, RF23

Linha cronológica de ocorrências/registros de cuidado. Novo registro preserva autoria e data/hora; correções não sobrescrevem o original.

**Figma canônico:** Normal `5926:1542`; Empty `5926:32938`; Loading `5926:32989`; Success `5926:33509`.

**Cadastro operacional contextual — Bottom Sheet (canônico desde 2026-09-15):**
- Overlay de novo registro: `5977:7182` (sheet `5977:7184`, handle `5977:7185`);
- Overlay de validação: `5977:7249` (sheet `5977:7251`);
- CTAs canônicos: `5926:1549`, `5926:32943`, `5926:33516`, todos abrindo o overlay.

**Legado preservado (não canônico):** `5926:33036` (novo registro full-page) e `5926:33272` (validação full-page), renomeados no Figma `[LEGACY PROTO STATE] ... SUPERSEDED BY BOTTOM SHEET`.

**Correção estrutural aplicada (2026-09-15):** viewport `5962:6236` com `clipsContent=true`, conteúdo `5926:1545` redimensionado para 1169 px — timeline não invade mais o header.

**Correção permitida (P03):** pode corrigir quem possuir permissão efetiva para produzir o mesmo tipo de registro.

## T07 — Histórico de Cuidados
**Responsável:** Henrique · **US:** US-016, US-032, US-034 · **Origem:** RF12, RF28, RNF02

Consulta o histórico preservado, abre detalhes, permite correção vinculada e exportação CSV contextual.

**Figma canônico:** Default `5926:1712`; Empty `5926:33682`; Loading `5926:33734`; Detalhe `5926:33783` (E11); Correção `5926:33852` (E12); Correção concluída `5926:33928`; Exportando `5926:34020` (E13, Familiar Principal); Exportação concluída `5926:34110`.

**P03/#75 (resolvido):** correção exige permissão efetiva para produzir o mesmo tipo de registro. **P05/#77 (resolvido):** exportação CSV é exclusiva do Familiar Principal na primeira versão, contextual em T07 e auditada.

## T08 — Medicamentos
**Responsável:** Henrique · **US:** US-017–US-020 · **RF:** RF14–RF17

Consulta e cadastra medicamentos/rotina.

**Figma canônico:** Lista `5926:1801`; Empty `5926:34202`; Cadastrado `5926:34369`.

**Cadastro operacional contextual — Bottom Sheet (piloto do padrão, 2026-09-15):**
- Overlay de cadastro: `5967:6307` (sheet `5967:6309`, handle `5967:6310`);
- Overlay de validação: `5967:6333` (sheet `5967:6335`);
- CTAs canônicos: `5926:1806`, `5926:34209` (empty), `5926:34375` (a partir do success).

**Legado preservado:** `5926:34250`, `5926:34279`, `5926:34309`, `5926:34339` (cadastro e três variações de erro full-page), renomeados `[LEGACY PROTO STATE] ... SUPERSEDED BY BOTTOM SHEET`.

**FI-001 (histórico, #84 — resolvido):** o antigo hotspot do Empty que apontava para o frame `LEGADO — [Henrique] T08 — Medicamentos (Lista)` (`5048:644`) não existe mais como destino no `Fluxo Final`.

## T09 — Tarefas
**Responsável:** Rhuan · **US:** US-024, US-025 · **Contexto:** US-020, US-030 · **RF:** RF21

Organiza tarefas de cuidado, criação/atribuição e conclusão.

**Figma canônico:** Default `5926:1886`; Empty `5926:34452`; Loading `5926:34512`; Tarefa criada `5926:34727`; Tarefa concluída `5926:34858` (E18).

**Bottom Sheet:** overlay de nova tarefa `5974:6252` (sheet `5974:6254`); validação `5974:6312` (sheet `5974:6314`); CTAs `5926:1901`, `5926:34467`, `5926:34742`.

**Legado preservado:** `5926:34568` (nova tarefa full-page), `5926:34646` (validação full-page).

## T10 — Consultas e Recomendações
**Responsável:** Henrique · **US:** US-022, US-027 · **RF:** RF19, RF23

Registra consultas realizadas, recomendações de saúde e anexos contextuais (E10).

**Figma canônico:** Default `5926:1993`; Empty `5926:34962`; Loading `5926:35011`; Success `5926:35059`.

**Bottom Sheet:** overlay de novo registro `5974:35902` (sheet `5974:35904`); validação `5974:35948` (sheet `5974:35950`); anexo `5974:35996` (sheet `5974:35998`); CTAs `5926:1998`, `5926:34967`, `5926:35064`.

**Legado preservado:** `5926:35125` (novo registro), `5926:35145` (validação), `5926:35166` (anexo) — todos full-page.

**FI-002/FI-003/FI-004 (histórico, #84 — resolvido):** os antigos hotspots de Empty/Loading/Success que abriam por engano T08/Cadastrar medicamento não existem no `Fluxo Final`; T10 permanece dentro do próprio fluxo.

## T11 — Compromissos
**Responsável:** Rhuan · **US:** US-023 · **RF:** RF20

Consulta e registra compromissos planejados relacionados ao cuidado.

**Figma canônico:** Default `5926:2060`; Empty `5926:35192`; Loading `5926:35252`; Success `5926:35494`.

**Bottom Sheet:** overlay de novo compromisso `5974:36062` (sheet `5974:36064`); validação `5974:36136` (sheet `5974:36138`); CTAs `5926:2065`, `5926:35197`, `5926:35499`.

**Legado preservado:** `5926:35306` (novo compromisso), `5926:35398` (validação) — full-page.

## T12 — Perfil da Pessoa Idosa
**Responsável:** David · **US:** US-003, US-004, US-036 · **RF:** RF03, RF30

Cadastra, visualiza e edita o perfil da pessoa idosa; entrada do `Settings / Management Sheet` para Rede de Cuidado, Contatos e Emergência; e ponto de configuração do acesso próprio da Pessoa Idosa (RF30/US-036).

**Figma canônico:** Visualização `5926:2126`; Cadastro `5926:35570`; Edição `5926:35621`; Success `5926:35664`; Validation Error `5926:35701`.

**RF30/US-036 (aprovado 2026-09-14):** Acesso não configurado `5944:1014`; Convite de acesso `5944:1171`; Convite enviado `5944:1068`; Acesso ativo `5944:1122`; linha de destino `5944:1227`. Esses estados deixaram de ser `proposal_only`.

**Wiring no Settings:** Rede de Cuidado → T13; Contatos → T14; Emergência → T15.

**FI-006/FI-007 (histórico, #84 — resolvido):** a navegação de Preferências/Auditoria por `Mais` foi substituída pela arquitetura `Settings / Management Sheet`, que já resolve o problema original.

## T13 — Rede de Cuidado
**Responsável:** David · **US:** US-005, US-006, US-007 · **Contexto:** US-011 · **RF:** RF04, RF05

Gerencia membros, papéis familiares acumuláveis (P06) e transferência do Familiar Principal (único ativo por rede).

**Figma canônico:** Default `5926:2160`; Loading `5926:35752`; Vincular `5926:35780` (E22); Validation Error `5926:35824`; Vínculo concluído `5926:35876`; Gerenciar papéis `5926:35948` (E24); Papéis atualizados `5926:36009`; Transferir Principal `5926:36086` (E25); Transferência concluída `5926:36186`; Desvincular `5926:36258` (E23); Desvinculado `5926:36350`.

**FI-008 (histórico, #84 — resolvido):** os layers foram renomeados semanticamente para E22–E25 no `Fluxo Final` (`5926:35799`, `5926:35845`, `5926:35968`, `5926:36130`, `5926:36301`), sem alterar reactions ou escopo.

## T14 — Contatos Importantes
**Responsável:** David · **US:** US-026 · **RF:** RF22

**Figma canônico:** Default `5926:2229`; Empty `5926:36406`; Loading `5926:36437`; Success `5926:36462`; Adicionar `5926:36528`; Validation Error `5926:36591`; Editar `5926:36657`; Alteração salva `5926:36720`.

## T15 — Informações de Emergência
**Responsável:** David · **US:** US-028 · **RF:** RF24

Consulta rápida, não é área de edição livre.

**Figma canônico:** Default `5926:2278`; Loading `5926:36772`; Empty `5926:36792`.

## T16 — Preferências de Notificações
**Responsável:** Kauã · **US:** US-031 · **RF:** RF27

Configura **somente notificações opcionais**; eventos obrigatórios não podem ser desligados; papéis acumulados não duplicam notificações (P06).

**Figma canônico:** Default `5926:2310`; Alteração salva `5926:36818`.

**FI-005 (histórico, #84 — resolvido):** o salto indevido de "Salvar preferências" para T06/Novo Registro não existe no `Fluxo Final`; o fluxo permanece dentro de T16.

## T17 — Auditoria
**Responsável:** Kauã · **US:** US-033, US-035 · **RF/RNF:** RF29, RNF01; RNF03 transversal

Exibe trilha de auditoria autorizada e representa bloqueio de acesso não autorizado.

**Figma canônico:** Default `5926:2379`; Loading `5926:36889`; Empty `5926:36917`; Detalhe `5926:36946`; Forbidden `5926:37017` (E27).

## Pessoa Idosa — leitura somente (RF30/US-036)

T03–T15 compõem a experiência read-only autorizada da Pessoa Idosa (whitelist completa em `docs/02_BUSINESS_RULES/PERMISSIONS_MATRIX.md` e `docs/05_FIGMA/ELDERLY_READ_ONLY_FLOW.yaml`, section `5948:5316`). T16 e T17 **não** são destinos disponíveis nesse modo. Nenhuma ação de escrita, correção, conclusão, administração ou exportação é exposta; auditado ao vivo no Figma em 2026-09-16 (Settings read-only `5948:36255`).

## Fluxos conceituais por responsável

- **David:** T01, T02, T12, T13, T14, T15 — autenticação e Rede/Apoio, incluindo RF30/US-036 (T12).
- **Rhuan:** T03, T04, T09, T11 — organização operacional.
- **Henrique:** T05, T07, T08, T10 — registros e saúde, com E10.
- **Kauã:** T06, T16, T17 — diário, notificações e governança, com E12/E13 e auditoria.

## Distribuição de User Stories (36 US oficiais — `docs/06_GITHUB/ISSUE_REGISTRY.yaml`)

- **David: 10** — US-001–US-007, US-026, US-028, **US-036**.
- **Rhuan: 9** — US-008, US-009, US-011–US-014, US-023–US-025.
- **Henrique: 9** — US-010, US-016–US-022, US-027.
- **Kauã: 8** — US-015, US-029–US-035.

A distribuição anterior deste arquivo (9/9/9/8 = 35) não incluía US-036, aprovada em 2026-09-14 e atribuída a David.
