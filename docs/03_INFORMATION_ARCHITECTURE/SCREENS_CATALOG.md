# Catálogo de Telas T01–T17 — Estado Atual

Última auditoria conjunta GitHub + Figma: **2026-09-13**.

Este catálogo explica **o que cada T## significa, como a tela se comporta hoje, quais estados existem no Figma e quais limites funcionais ainda estão abertos**. A fonte de comportamento funcional continua sendo RF/RNF/US e regras do GitHub. O Figma documenta o visual vigente e o wiring atual; reações conhecidamente incorretas estão em `docs/05_FIGMA/PROTOTYPE_INTEGRITY.yaml`.

## Regras de leitura

- `T##` = tela principal do Site Map.
- `E##` = ação/elemento transversal; não é uma nova tela.
- `N##` = evento/notificação.
- Estados como Loading, Empty, Success, Validation Error e Forbidden são variações da mesma tela.
- `STATE = PAGE BASE + DELTA MÍNIMO`.
- Frame `LEGADO —` nunca é base quando existe frame atual.
- Um estado existente no Figma pode estar marcado como `proposal_only` ou `visual_candidate_only`; isso impede o Codex de promovê-lo a requisito aprovado.

## T01 — Login
**Responsável:** David · **US:** US-002 · **Origem:** RF02

Autentica uma conta válida. O estado padrão permite entrar e também alcançar T02. Credenciais inválidas permanecem na mesma estrutura com feedback de erro; Loading representa o envio da autenticação.

**Figma atual:** Default `5189:730`; Credenciais inválidas `5189:800`; Loading `5189:870`.

**Wiring observado:** Entrar leva ao Loading; Criar conta leva a T02. O Figma não deve ser usado para inventar o destino pós-autenticação quando esse destino não estiver explicitamente decidido pelo requisito/fluxo.

## T02 — Cadastro de Conta
**Responsável:** David · **US:** US-001 · **Origem:** RF01

Cria a conta de acesso de um usuário autorizado. Possui Default, Validation Error e Loading.

**Figma atual:** Default `5189:938`; Validation Error `5189:1043`; Loading `5189:1152`.

**Wiring observado:** ação primária leva ao Loading; “Entrar” retorna para T01.

## T03 — Home / Visão Geral do Cuidado
**Responsável:** Rhuan · **US:** US-009, US-020, US-029, US-030 · **Origens relacionadas:** RF07, RF17, RF25, RF26

É o resumo operacional pós-autenticação. Mostra atalhos para o que importa no momento: plantonista/agenda, tarefa pendente e próximo compromisso.

**Figma atual:** Default `5435:1222`; Loading `5436:1616`; Lembrete obrigatório `5436:18023`; Cuidado registrado `5436:18343`; Atraso `5436:18445`.

**Wiring observado no Default:** Plantonista atual → T04; Tarefa pendente → T09; Próximo compromisso → T11.

**Gate importante:** os três estados de aviso são **evidência visual/candidatos** para N02/N03/N04. P04/#76 ainda decide formalmente em que superfície N01–N04 devem aparecer. O Codex não pode fechar P04 apenas porque esses frames existem.

## T04 — Calendário de Cuidados
**Responsável:** Rhuan · **US:** US-008, US-009, US-011, US-012, US-013, US-014 · **RF:** RF06–RF10 conforme rastreabilidade

Organiza e consulta a escala de cuidado/plantões. “Plantonista Atual” é condição temporária, nunca perfil de usuário.

**Figma atual:** Semana `5122:1870`; Dia `5122:2031`.

**Wiring observado:** a visão Semana alterna para Dia e Dia retorna para Semana. E03–E07 representam operações de plantão/troca e permanecem ações da T04, não novas telas do Site Map.

## T05 — Detalhamento do Dia
**Responsável:** Henrique · **US principal:** US-010 · **Contexto:** US-019, US-020, US-021, US-023, US-025, US-030, US-034

Consolida o que estava planejado e o que foi registrado em um dia: plantões, medicações, tarefas, compromissos, sintomas/intercorrências e estados relevantes do cuidado.

**Figma atual:** Default `5344:1413`; Empty `5346:1256`; Loading `5346:1403`; Atraso `5346:1504`; Corrigido `5346:1592`; Detalhe `5346:1686`.

“Atrasado” só se aplica a ação com horário programado após 15 minutos sem registro. Sintoma/intercorrência espontânea não fica atrasado. “Corrigido” preserva o original.

## T06 — Diário de Cuidados
**Responsável:** Kauã · **US:** US-015, US-021, US-027 · **RF:** RF11, RF18, RF23

É a linha cronológica de ocorrências/registros de cuidado. Um novo registro preserva autoria e data/hora; correções não sobrescrevem o original.

**Figma atual:** Normal `5201:13491`; Empty `5201:13490`; Loading `5288:14618`; Novo Registro `5201:13488`; Validation Error `5203:300`; Success `5288:14482`.

**Componentes locais verificados:** `T06 / Header / Pessoa` `5201:13483`; `T06 / Care Record Card` `5204:318`.

**Wiring observado:** Normal/Empty abrem Novo Registro; salvar leva a Success; cancelar volta para Normal.

## T07 — Histórico de Cuidados
**Responsável:** Henrique · **US:** US-016, US-032, US-034 · **Origem:** RF12, RF28, RNF02

Consulta o histórico preservado, abre detalhes, permite registrar uma correção vinculada e oferece exportação CSV contextual quando houver autorização.

**Figma atual:** Default `5334:756`; Empty `5335:831`; Loading `5335:948`; Detalhe `5336:895`; Correção `5336:977`; Correção concluída `5337:15296`; Exportando `5337:15310`; Exportação concluída `5337:15330`.

**Wiring observado:** cards → Detalhe; Corrigir → formulário de Correção; registrar correção → Correção concluída; Exportar → Exportando.

**Gates:** P03/#75 afeta quem pode corrigir; P05/#77 decide quem pode exportar. A presença do botão no Figma não concede permissão.

## T08 — Medicamentos
**Responsável:** Henrique · **US:** US-017–US-020 · **RF:** RF14–RF17

Consulta medicamentos e cadastra dados de medicamento/rotina conforme requisitos.

**Frame de lista canônico:** `5235:924`. **Outros estados:** Empty `5118:838`; Cadastrar `5123:1291`; erros `5130:4159`, `5130:4204`, `5130:4263`; Cadastrado `5141:2758`.

**Importante:** `5048:644` está explicitamente nomeado `LEGADO — [Henrique] T08 — Medicamentos (Lista)` e nunca deve ser base.

**Wiring observado:** lista/empty → Cadastrar; salvar → Cadastrado; voltar → Lista; tab Consultas → T10.

**Dívida:** FI-001/#84 — um hotspot do Empty ainda aponta para o frame legado.

## T09 — Tarefas
**Responsável:** Rhuan · **US:** US-024, US-025 · **Contexto:** US-020, US-030 · **RF:** RF21

Organiza tarefas de cuidado, criação/atribuição e conclusão.

**Figma atual:** Default `5360:348`; Empty `5361:419`; Loading `5361:475`; Nova tarefa `5361:518`; Validation Error `5361:601`; Tarefa criada `5361:707`; Tarefa concluída `5361:741`.

**Wiring observado:** Nova tarefa → formulário; salvar → Tarefa criada; concluir → Tarefa concluída; tab Compromissos → T11.

## T10 — Consultas e Recomendações
**Responsável:** Henrique · **US:** US-022, US-027 · **RF:** RF19, RF23

Registra consultas realizadas, recomendações de saúde e anexos contextuais E10.

**Figma atual:** Default `5321:411`; Empty `5323:489`; Loading `5323:558`; Success `5323:627`; Novo registro `5323:696`; Validation Error `5323:855`; Anexo contextual `5323:885`.

**Fluxo correto já existente:** Default → Novo registro; anexar → E10; salvar → Success; cancelar → Default; tab Medicamentos → T08.

**Dívida crítica:** FI-002/FI-003/FI-004 (#84). Em Empty, Loading e Success, “Novo registro” está ligado por engano a **T08/Cadastrar medicamento**. O Codex deve ignorar esse wiring como intenção funcional.

## T11 — Compromissos
**Responsável:** Rhuan · **US:** US-023 · **RF:** RF20

Consulta e registra compromissos planejados relacionados ao cuidado.

**Figma atual:** Default `5416:937`; Empty `5417:1037`; Loading `5417:1099`; Novo compromisso `5418:1039`; Validation Error `5419:1113`; Success `5419:1226`.

**Wiring observado:** Novo compromisso → formulário; salvar → Success; cancelar → Default; tab Tarefas → T09.

## T12 — Perfil da Pessoa Idosa
**Responsável:** David · **US aprovadas:** US-003, US-004 · **RF aprovado:** RF03

Cadastra, visualiza e edita o perfil da pessoa idosa. A Visualização também é a entrada atual da área “Mais” para Rede de Cuidado, Contatos e Emergência.

**Estados aprovados visualmente ligados a RF03:** Cadastro `5125:2567`; Edição `5125:2649`; Visualização `5125:2719`; Success `5125:2799`; Validation Error `5125:2888`.

**Estados visuais condicionados à proposta RF30/US-036:** Convite enviado `5125:2408`; Acesso ativo `5125:2981`; Acesso não configurado `5125:3069`; Convite de acesso `5125:3151`. Enquanto RF30/#34 e US-036/#72 não forem aprovados, esses frames são **proposal_only**.

**Wiring observado na área Mais:** Rede de Cuidado → T13; Contatos → T14; Emergência → T15. Preferências e Auditoria hoje têm apenas hover, sem navegação de clique (FI-006/FI-007, #84).

## T13 — Rede de Cuidado
**Responsável:** David · **US:** US-005, US-006, US-007 · **Contexto:** US-011 · **RF:** RF04, RF05

Gerencia membros da rede, papéis familiares acumuláveis e transferência do Familiar Principal. Deve existir exatamente um Principal ativo; transferência é atômica. Profissional da Saúde não recebe papel familiar.

**Figma atual:** Default `5367:1631`; Loading `5369:2130`; Vincular `5370:1705`; Validation Error `5370:16302`; Vínculo concluído `5370:16523`; Gerenciar papéis `5371:1875`; Papéis atualizados `5371:16499`; Transferir Principal `5371:16617`; Transferência concluída `5371:16756`; Desvincular `5372:2181`; Desvinculado `5372:16816`.

**Wiring observado:** Default abre Vincular/Gerenciar/Desvincular e retorna para T12. Os subfluxos voltam/cancelam para Default e possuem estados de conclusão.

**Gates:** P03/#75 e P06/#78 ainda limitam decisões de permissão. **Dívida semântica:** FI-008/#84 — alguns layers reutilizam nomes E17/E22 ou “Desvincular” em contextos errados. O nome do layer não altera a rastreabilidade correta E22–E25.

## T14 — Contatos Importantes
**Responsável:** David · **US:** US-026 · **RF:** RF22

Consulta e mantém contatos importantes relacionados ao cuidado.

**Figma atual:** Default `5387:2703`; Empty `5387:17293`; Loading `5387:17356`; Success `5387:17388`; Adicionar `5390:154`; Validation Error `5392:276`; Editar `5390:253`; Alteração salva `5392:418`.

**Wiring observado:** adicionar/editar abrem formulários; salvar leva ao respectivo estado de sucesso; cancelar volta ao Default; voltar retorna para T12.

## T15 — Informações de Emergência
**Responsável:** David · **US:** US-028 · **RF:** RF24

Mostra rapidamente informações importantes autorizadas para agir em emergência. Não é uma área de edição livre.

**Figma atual:** Default `5404:2664`; Loading `5405:2696`; Empty `5405:2752`.

**Wiring observado:** Default possui retorno para T12.

## T16 — Preferências de Notificações
**Responsável:** Kauã · **US:** US-031 · **RF:** RF27

Configura **somente notificações opcionais**. Eventos obrigatórios não podem ser desligados e papéis acumulados não devem duplicar notificações.

**Figma atual:** Default `5211:966`; Alteração salva `5212:432`.

**Wiring observado:** Default → Alteração salva; tab Auditoria → T17.

**Dívida crítica:** FI-005/#84 — no estado Alteração salva, a ação “Salvar preferências” salta por engano para T06/Novo Registro. **Gate:** P04/#76 continua aberto sobre superfícies de notificação.

## T17 — Auditoria
**Responsável:** Kauã · **US:** US-033, US-035 · **RF/RNF:** RF29, RNF01; RNF03 transversal

Exibe trilha de auditoria autorizada, com usuário, categoria/papéis quando aplicável, pessoa idosa, data/hora, operação, recurso e resultado. Também representa bloqueio de acesso não autorizado.

**Figma atual:** Default `5445:915`; Loading `5445:1033`; Empty `5445:18015`; Detalhe `5445:18109`; Forbidden `5445:18234`.

**Wiring observado:** eventos de auditoria → Detalhe; Voltar → Default; tab Preferências → T16.

## Fluxos conceituais por responsável

- **David:** autenticação e Rede/Apoio — `T01/T02 → T12 → T13/T14/T15`.
- **Rhuan:** organização operacional — `T03 ↔ T04/T09/T11`.
- **Henrique:** registros e saúde — `T05/T07/T08/T10`, com integração de E10.
- **Kauã:** diário, notificações e governança — `T06/T16/T17`, com E12, exportação e acesso negado como temas transversais.

A distribuição atual de trabalho é 9 US David / 9 Rhuan / 9 Henrique / 8 Kauã e preserva a coerência funcional definida no projeto.
