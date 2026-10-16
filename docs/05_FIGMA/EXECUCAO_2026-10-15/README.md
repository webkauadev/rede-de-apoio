# Execução das correções da auditoria Figma

> **ENCERRAMENTO DESTE MARCO — 16/10/2026:** o solicitante aprovou o protótipo corrigido para demonstração/entrega acadêmica, **com ressalva documental de cobertura de testes**. Consulte o [Termo de homologação final](../HOMOLOGACAO_FINAL_PROTOTIPO_2026-10-16.md). O parecer histórico do browser remoto permanece válido *para aquela rodada* e não foi convertido artificialmente em 39 testes aprovados. A execução visual posterior está registrada em [VIS-001–008](../AUDITORIA_VISUAL_M3_2026-10-16/EXECUCAO_MICROCORRECOES_2026-10-16.md). A página original externa permanece protegida.

**Situação: correções aplicadas na cópia experimental; homologação por execução no Presentation pendente.**

Referência funcional: `main` em `4712047e4550e4504b213e638aaf8a17310f4935`. Auditoria e plano de 15/10/2026. Registro final gerado em `2026-10-16T03:08:24+00:00` / `2026-10-15T23:08:24-04:00`. PR [#127](https://github.com/webkauadev/rede-de-apoio/pull/127), branch `docs/figma-plano-correcao-20261015`, mantido em Draft e sem merge.

## Atualização LOTE 07 — 16/10/2026

**NÃO APROVADO para homologação funcional:** uma tentativa de Presentation retornou Site Unavailable antes de carregar a primeira tela. Nenhum cenário interativo foi executado. O roteiro preserva os 39 cenários operacionais do checklist: **0 aprovados, 0 reprovados por defeito observado e 39 não verificáveis**. Os 3 gates são separados.

[Parecer desta rodada](HOMOLOGACAO_2026-10-16/PARECER.md) · [Execução assistida local](HOMOLOGACAO_2026-10-16/ROTEIRO_ASSISTIDO.md) · [Resultados e status dos 28 AUDs](HOMOLOGACAO_2026-10-16/RESULTADOS.json) · [Evidência do bloqueio](HOMOLOGACAO_2026-10-16/evidencias/EV07-ENV-001.jpg). Nenhuma escrita no Figma ou repetição dos lotes anteriores. PR #127 permanece Draft e sem merge.

---

## Ambiente e preservação

| Ambiente | FileKey | Página | Operação realizada |
|---|---|---|---|
| Original externo | `tcyj2fkTXei2CJbqaRxqCp` | `5926:1014` | Nenhuma escrita enviada |
| Baseline dentro da cópia | `ljFSoPfNcvDgZtdR2sHmti` | `5926:1014` | Somente leitura de conferência |
| [Página corrigida](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6270) | `ljFSoPfNcvDgZtdR2sHmti` | `6223:6270` | Destino exclusivo das correções |

Nenhum arquivo ou página adicional foi criado. Não houve edição de masters, styles ou variables fora da página autorizada. Foram usados componentes existentes, overrides locais, novos estados e overlays nessa página. Não houve alteração de app, SQL, requisitos ou publicação. O registry canônico continua apontando ao original.

A página-base interna mantém as mesmas contagens estruturais e fingerprints de reactions em 142 raízes comparadas com o checkpoint anterior. Os hashes de propriedades entre arquivos diferem em 142 raízes; essa comparação **não prova identidade visual** após a duplicação nativa e não foi usada para afirmar isso. A confirmação de ausência de edição se baseia no destino e nos guards das operações: nenhuma escrita foi enviada a essa página ou ao arquivo externo.

## Lotes executados

| Lote | Resultado | Registro |
|---|---|---|
| 00.1 | Dez links de Settings, cinco de tarefas, dois de contatos e nove do quadro de revisão remapeados. Tarefas e contatos receberam também destinos semanticamente próprios. | [Evidência inicial](../EXECUCAO_AUDITORIA_2026-10-15.json) |
| 01–02 | Autenticação, papéis, preferências, correções por registro, conclusões por tarefa, contatos, detalhes de auditoria e navegação dos estados. | [JSON](LOTE_01_02_EVIDENCIAS.json) |
| 03 | Plantões E03–E07, posologia/horário/administração, bootstrap e N01–N04; preenchimento válido dos cinco Sheets. | [JSON](LOTE_03_EVIDENCIAS.json) |
| 04 | Inclusões, autoria, cronologia, anexos e identidade das entidades. | [JSON](LOTE_04_EVIDENCIAS.json) |
| 05–06 | Viewports, reflow, tokens, tipografia, contraste, targets e LocalSubnav. | [JSON](LOTE_05_06_EVIDENCIAS.json) |
| 07 | Configurações e capturas verificadas anteriormente; nova tentativa em 16/10 sem acesso ao Presentation. Homologação interativa bloqueada. | [Verificações](LOTE_07_VERIFICACOES.json) · [Retomada e captura](LOTE_07_RETOMADA_2026-10-16.md) |
| 08 | Registro experimental, evidências e checklist entregues no PR; sem promoção canônica. | [Registry](FIGMA_CORRECOES_EXPERIMENTAL.json) |

Os JSONs registram IDs criados/modificados, cenários e destinos. Os mapas de tarefas, contatos, registros, medicamentos, papéis e preferências detalham as variantes; os links abaixo são âncoras representativas. Dois exemplos antigos da cópia (`6223:7460`, `6223:8612`) foram identificados como referências substituídas, sem exclusão. Formulários full-page legados mantêm suas ações históricas e não recebem entradas do fluxo canônico. Estados condicionais têm starting points de QA, sem seletor de papel ou novo menu de produto.

## Resultado por achado

As alterações dos **28 achados** foram realizadas. Para AUD-001–AUD-014, a configuração foi inspecionada, mas o comportamento interativo ainda depende da homologação no Presentation. AUD-015–AUD-028 foram conferidos por propriedades, dados e/ou composição renderizada. Essa distinção não equivale a declarar 28 testes manuais aprovados.

| Achado | P | Alteração efetiva | Verificação | Nós representativos |
|---|---|---|---|---|
| AUD-001 | P1 | Convite individual explícito; cadastro cria identidade sem sessão e retorna ao login. Credenciais inválidas não concedem Home. | Aplicado; runtime pendente | [6223:6961](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6961) · [8009:11294](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8009-11294) |
| AUD-002 | P1 | Menu contextual e Sheets para criar, alterar, cancelar, atribuir e solicitar troca; resposta de Marina em cenário próprio, aceitação e recusa distintas, N01 e retorno. | Aplicado; runtime pendente | [8016:13806](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-13806) · [8016:15427](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-15427) |
| AUD-003 | P1 | Detalhe por medicamento, posologia, agenda e responsável explícito; administração vinculada à ocorrência e fato em T05. Novo Item A mantém identidade própria. | Aplicado; runtime pendente | [8017:14336](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-14336) · [8017:14668](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-14668) · [8025:16674](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8025-16674) |
| AUD-004 | P1 | Entrada de QA por autenticação de identidade elegível; validação, perfil pendente e constituição conjunta com Principal e Profissional. Sem acesso antecipado ao cuidado. | Aplicado; runtime pendente | [6223:8040](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8040) · [8018:15769](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8018-15769) · [8018:15830](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8018-15830) |
| AUD-005 | P1 | Headers, Back, quatro destinos primários, subnavegação e saídas dos estados religados; resultados permitem continuar. Estados condicionais têm entradas de QA. | Aplicado; runtime pendente | [6223:6270](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6270) |
| AUD-006 | P1 | Oito contextos de correção preservam tipo, data, horário, conteúdo e autor originais; nova versão tem autoria e horário próprios e vínculo consultável. | Aplicado; runtime pendente | [8012:11874](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8012-11874) · [8012:11970](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8012-11970) |
| AUD-007 | P1 | Doze estados de tarefas cobrem combinações de conclusão das listas com e sem tarefa recém-criada. Somente a tarefa selecionada muda; nenhuma reabertura foi criada. | Aplicado; runtime pendente | [6223:6630](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6630) · [8005:9666](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8005-9666) · [8005:10762](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8005-10762) |
| AUD-008 | P1 | Cinco cenários de edição por contato e lista; formulário, telefone alterado e resultado correspondem a Maria Helena, Carlos ou Hospital. | Aplicado; runtime pendente | [8006:33693](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8006-33693) · [8006:33819](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8006-33819) |
| AUD-009 | P1 | Registro criado, tarefa concluída e acesso bloqueado abrem detalhes próprios de ator, operação, horário, recurso e resultado. | Aplicado; runtime pendente | [6223:8715](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8715) · [8011:11419](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8011-11419) · [8011:11492](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8011-11492) |
| AUD-010 | P1 | Quatro seleções de papéis e quatro resultados correspondentes; checkbox alternável, Principal preservado e saída de cancelamento. | Aplicado; runtime pendente | [6223:8289](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8289) · [8010:12352](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8010-12352) |
| AUD-011 | P1 | Quatro combinações opcionais para Apoio, alvos de 48 px e feedback de salvamento; contexto Principal mantém N03/N04 obrigatórias. | Aplicado; runtime pendente | [6223:6800](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6800) · [8010:12439](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8010-12439) · [8010:12788](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8010-12788) |
| AUD-012 | P2 | Credenciais válidas/inválidas, validação de cadastro, autenticação compartilhada da Pessoa Idosa e negação com retorno seguro; cenários de QA fora dos menus de produto. | Aplicado; runtime pendente | [8009:11349](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8009-11349) · [8009:11459](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8009-11459) |
| AUD-013 | P2 | N01–N04 com entrada de evento, aviso transitório, timeout e destinos T04/T05/T07; N04 não afirma omissão; nenhuma central ou sino foi criado. | Aplicado; runtime pendente | [8022:17499](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8022-17499) · [6223:8744](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8744) · [6223:8771](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8771) · [6223:8798](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8798) |
| AUD-014 | P2 | Ver correção abre a versão vinculada; detalhe comum e somente leitura separados, com retorno e sem escrita no grafo da Pessoa Idosa. | Aplicado; runtime pendente | [8012:14839](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8012-14839) · [8012:14929](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8012-14929) |
| AUD-015 | P2 | Viewport da semana read-only com clipping, rolagem vertical e conteúdo abaixo do header na ordem de desenho. | Corrigido por propriedades/dados/composição | [6223:9225](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9225) |
| AUD-016 | P2 | Imagem opaca removida da região de conteúdo da Home; surface semântica aplicada, avatar preservado. | Corrigido por propriedades/dados/composição | [6223:6340](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6340) |
| AUD-017 | P2 | Padding horizontal dos formulários de erro/anexo em T10 zerado internamente; campos com Fill dentro dos 326 px disponíveis. | Corrigido por propriedades/dados/composição | [6223:9074](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9074) · [6223:9092](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9092) |
| AUD-018 | P2 | Mensagens de acesso com altura dinâmica, card em Hug e viewport rolável; CTA permanece alcançável. | Corrigido por propriedades/dados/composição | [6223:8849](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8849) · [6223:8884](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8884) · [6223:8919](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8919) |
| AUD-019 | P2 | Links de autenticação com altura 48, cadastro em T08 no container 358×48 e ações de tarefa/contato com altura 48; switches usam o wrapper 48×48. | Corrigido por propriedades/dados/composição | [6223:6297](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6297) · [6223:6598](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6598) |
| AUD-020 | P2 | Textos visíveis uniformes menores que 14 px normalizados; checagem final não encontrou ocorrências abaixo do limite no recorte canônico experimental. | Corrigido por propriedades/dados/composição | [6223:6270](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6270) |
| AUD-021 | P2 | Texto secundário e contornos essenciais vinculados a tokens locais. Medição com resolução de variáveis e camadas de fundo; 4.656 textos avaliados, 346 excluídos da medição. | Corrigido por propriedades/dados/composição | [6223:6270](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6270) |
| AUD-022 | P2 | Cópias manuais de LocalSubnav substituídas por instâncias da Foundation; viewport horizontal local conserva acesso a Compromissos sem editar o master. | Corrigido por propriedades/dados/composição | [8029:17003](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8029-17003) · [8029:17004](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8029-17004) |
| AUD-023 | P2 | Categorias/status e margens de tarefas normalizados. Valores resolvidos também aplicados ao paint para renderizar cores iguais com a mesma variável. | Corrigido por propriedades/dados/composição | [8005:9666](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8005-9666) |
| AUD-024 | P2 | Cards T10 comuns/read-only e novos resultados mostram autor e data/hora de registro; a descrição da nova consulta distingue horário clínico e horário de registro. | Corrigido por propriedades/dados/composição | [6223:6663](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6663) · [6223:9627](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9627) · [6223:7849](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-7849) |
| AUD-025 | P2 | Resultados mostram a nova hidratação às 13:01, Item A, consulta de acompanhamento e Dr. Renato Costa, mantendo itens anteriores. | Corrigido por propriedades/dados/composição | [8021:15992](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8021-15992) · [8021:16049](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8021-16049) · [8021:16090](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8021-16090) · [8021:16249](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8021-16249) |
| AUD-026 | P2 | Erro de nome obrigatório mostra placeholder de campo vazio; preenchimento válido tem caminho próprio e envio inválido fica bloqueado. | Corrigido por propriedades/dados/composição | [6223:8992](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8992) · [8021:16015](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8021-16015) |
| AUD-027 | P3 | A tentativa de acesso é registrada na trilha de auditoria substitui o texto condicional, sem alegar teste real de backend. | Corrigido por propriedades/dados/composição | [6223:8743](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8743) |
| AUD-028 | P2 | Ontem corresponde a 7 de setembro quando Hoje é 8 de setembro, inclusive em estados irmãos e read-only. | Corrigido por propriedades/dados/composição | [6223:6576](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6576) · [6223:9529](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9529) |

A origem funcional de cada item está em [STATUS_28_ACHADOS.json](STATUS_28_ACHADOS.json), preservando RF/US/RN/decisões da auditoria. Não foram criadas permissões ou regras clínicas novas.

## Verificações concluídas

- T01–T17 presentes e registry experimental com 247 raízes de telas/estados/overlays. Isso não significa 247 testes executados.
- 1.488 referências de navegação inspecionadas, 1.478 com origem visível: nenhum destino inexistente ou fora da página de trabalho, nenhuma URL externa e nenhuma entrada canônica para formulário legado.
- Grafo Pessoa Idosa a partir da Home: 17 destinos alcançáveis, sem saída ao grafo de escrita e sem ação visível de escrita/CSV no recorte verificado.
- Navigation Bars inspecionadas com Home, Agenda, Diário e Saúde; nenhuma quinta aba.
- Seis registros do Diário apontam a seis formulários próprios de correção; casos de Medicação têm contextos adicionais. Original e versão preservam identificação e autoria separadas.
- Nenhum texto visível com tamanho uniforme inferior a 14 px no recorte canônico experimental. Masters, referências e quadros históricos ficaram fora dessa normalização.
- Contraste calculado em 4.656 textos com paints/variáveis e camadas de fundo resolvidos: nenhuma violação encontrada nesse conjunto. Outros 346 casos foram excluídos por opacidade, estado desabilitado, pintura não sólida ou composição não determinável pelo método; isso não certifica todo o arquivo.
- Alvos apontados de autenticação/cadastro/conclusão e wrappers de switches conferidos em pelo menos 48×48. Não é certificação de todos os possíveis alvos da aplicação.
- Nenhuma cópia manual `LocalSubnav / Saúde / Scrollable Tabs` permaneceu no recorte; variantes da Foundation são preservadas em viewports horizontais locais.
- Viewport read-only T04 com clipping explícito e conteúdo abaixo do header; T06 e listas alteradas tiveram reflow e clipping conferidos. T10 erro/anexo cabe nos 326 px internos.
- Casos de regressão relacionados a FI-001–FI-008: sem saída ao original/legado, cinco entradas operacionais continuam em Sheets, T10 abre seu cadastro, Preferências chega a T16 e Settings usa a arquitetura atual. A comprovação é de configuração, não de cliques executados.

[Galeria de capturas](evidencias/README.md). Foram inspecionadas composições representativas de cada família alterada e feitos ajustes pontuais quando a renderização divergiu das propriedades. Não foi repetida a auditoria visual integral dos 247 roots.

## Limitações e próximo lote

O endereço de Presentation da cópia retornou **Site Unavailable — Unable to access this site** neste navegador. Nenhum cenário foi marcado como aprovado por clique, gesto ou scroll em runtime. A indisponibilidade do navegador não impediu as alterações via conector.

**Atualização de 16/10/2026:** uma nova abertura e uma única recarga mantiveram esse erro. A integração Figma não disponibilizou aba controlável alternativa. [Registro da retomada e captura real](LOTE_07_RETOMADA_2026-10-16.md). Nesta retomada não houve escrita no Figma nem nova validação das configurações; o LOTE 07 permanece bloqueado.

As fixtures do Figma demonstram entradas e transições predefinidas; não simulam armazenamento ilimitado, autenticação real, concorrência, entrega de notificações ou geração real de CSV. A identidade/contexto de QA é explícita nos starting points. Leitores de tela, foco, teclado e acessibilidade nativa dependem da aplicação. O recolhimento da LocalSubnav por direção do scroll continua especificado, sem simulação desse gesto, e não foi classificado como defeito do produto.

Não há versão nomeada criada pela API: esse recurso não foi disponibilizado. Os commits do PR, o registry e as capturas formam o checkpoint rastreável desta execução.

**Próximo lote: LOTE 07 — homologação integrada no Presentation**, usando [CHECKLIST_HOMOLOGACAO.md](CHECKLIST_HOMOLOGACAO.md). Até essa execução, não declarar o protótipo integralmente homologado nem os P1 aprovados em runtime. Merge, promoção do registry e substituição da referência canônica permanecem dependentes de revisão humana.


## Commits rastreáveis

| Lote | Commit |
|---|---|
| 00.1 / correções iniciais de tarefas e contatos | [5876f58](https://github.com/webkauadev/rede-de-apoio/commit/5876f582f50d7de7ce41580509daeddc6ca66ed3) |
| 01–02 | [2a09748](https://github.com/webkauadev/rede-de-apoio/commit/2a09748efaed03bcc5912168eec559085e5290fa) |
| 03–04 | [0bf5249](https://github.com/webkauadev/rede-de-apoio/commit/0bf5249ce345ce0b0ad15e3046185c70414f4809) |
| 05–06 | [688a834](https://github.com/webkauadev/rede-de-apoio/commit/688a834c6982b8c783c89caadc1d44b78683dee8) |

O commit desta consolidação adiciona o relatório, registry experimental, checklist e verificações. Todos pertencem ao PR #127; nenhum merge foi executado.

