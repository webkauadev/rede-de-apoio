# LOTE 07 — roteiro para homologação assistida

**Execução interativa pendente. Nenhum cenário abaixo foi aprovado por execução nesta rodada.**

O Presentation não carregou neste navegador. Este roteiro operacionaliza os 39 itens de teste do checklist anterior; CH-40–42 são gates de encerramento. As variantes dentro de cada cenário precisam de registros próprios e não aumentam a contagem de testes realizados.

## Preparação no navegador local

1. Abra o [arquivo de trabalho](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6270) e selecione `Fluxo Final — CORREÇÕES AUDITORIA` (`6223:6270`). Não edite o arquivo.
2. Selecione o frame de partida indicado e use Present. Não selecione a página-base `5926:1014` nem o arquivo original externo. Para demonstrar uma jornada, comece pela tela-base e use seus controles; abrir um resultado diretamente só prepara uma fixture.
3. Registre data/hora, navegador, viewport, modo de escala do Presentation, starting point e ator/papel mostrados. Use apenas dados sintéticos predefinidos; os campos do protótipo podem alternar fixtures ao toque. Não inserir credenciais reais ou enviar convites reais.
4. Reinicie a fixture entre alternativas mutuamente exclusivas, como aceite/recusa, cancelar/salvar e diferentes combinações. Não exigir persistência entre starting points ou sincronização real entre contas.
5. Execute P1 antes de P2. Para cada variante, registre ações realmente realizadas, resultado observado, captura/vídeo e status. Só aprove o cenário quando todas as variantes aplicáveis tiverem sido percorridas.
6. Capture origem → ação → resultado → retorno. Use gravação para Loading, timeout, gesto e scroll. Nome sugerido: `H07-016-V01-AAAA-MM-DD-HHMM.mp4`; não marque como evidência uma captura prévia de configuração.
7. Se uma limitação do Figma impedir parte essencial, mantenha NÃO VERIFICÁVEL e descreva a limitação. Falha reproduzível recebe REPROVADO com passos, nó e evidência; somente então corrigir dentro do escopo na página autorizada e reexecutar os cenários afetados.

## Registro de resultado

O arquivo [RESULTADOS.json](RESULTADOS.json) contém um registro por cenário e por variante, com status inicial NÃO VERIFICÁVEL. `planned_actions` é planejamento; `executed_actions` começa vazio. A evidência de bloqueio ambiental não é evidência de execução de nenhum cenário.

| Campo | Preenchimento após execução observável |
|---|---|
| Teste / AUD | H07-### e AUD relacionado abaixo |
| Ator / fixture / partida | Nome/papel realmente mostrado e Node ID inicial |
| Execução | Data/hora, executor, navegador, viewport, ações realizadas |
| Esperado / observado | Manter o esperado; descrever o resultado visível sem inferir backend |
| Evidência | Captura/vídeo com nome/URL e trecho relevante |
| Status | APROVADO, REPROVADO ou NÃO VERIFICÁVEL |
| Variante | Registrar separadamente cada V##; reiniciar entre alternativas |

## Limites da comprovação

As medidas anteriores de targets, tipografia, contraste, componentes e isolamento estrutural continuam atribuídas ao commit `925b19e`. Não foram reexecutadas. Medidas numéricas não podem ser certificadas por um screenshot escalado. FI-008 trata nomes de layers e fica separado da regressão interativa. Recolhimento da LocalSubnav por direção do scroll segue especificado sem gesto prototipado; isso não é reprovação automática. Autenticação real, auditoria persistida, CSV real, concorrência, entrega de notificações, foco, teclado e leitor de tela dependem da aplicação.

Os links de nós abaixo usam IDs do registry experimental existente, não novos IDs resolvidos nesta rodada. Servem para preparar a execução local; a acessibilidade dos links não foi verificada pelo Presentation indisponível.

## Ordem de execução

| Teste | Prioridade de execução | Caso | AUD | Situação nesta rodada |
|---|---|---|---|---|
| [H07-001](#h07-001) | P1 | Login inválido, válido e Loading | AUD-001, AUD-012 | NÃO VERIFICÁVEL |
| [H07-002](#h07-002) | P1 | Cadastro por convite sem sessão automática | AUD-001 | NÃO VERIFICÁVEL |
| [H07-003](#h07-003) | P1 | Validação do cadastro | AUD-001, AUD-012 | NÃO VERIFICÁVEL |
| [H07-004](#h07-004) | P1 | Autenticação compartilhada da Pessoa Idosa | AUD-012 | NÃO VERIFICÁVEL |
| [H07-005](#h07-005) | P1 | Isolamento do ramo somente leitura | AUD-005, AUD-012, AUD-014 | NÃO VERIFICÁVEL |
| [H07-006](#h07-006) | P1 | Acesso direto negado e texto de auditoria | AUD-012, AUD-027 | NÃO VERIFICÁVEL |
| [H07-007](#h07-007) | P1 | Cadastro da Pessoa Idosa e perfil pendente | AUD-004 | NÃO VERIFICÁVEL |
| [H07-008](#h07-008) | P1 | Constituição conjunta da rede | AUD-004 | NÃO VERIFICÁVEL |
| [H07-009](#h07-009) | P1 | Jornada entre T01–T17 com retornos | AUD-005 | NÃO VERIFICÁVEL |
| [H07-010](#h07-010) | P1 | Quatro destinos primários e estado ativo | AUD-005 | NÃO VERIFICÁVEL |
| [H07-011](#h07-011) | P1 | Settings comum e somente leitura | AUD-005 | NÃO VERIFICÁVEL |
| [H07-013](#h07-013) | P1 | Saídas de estados condicionais | AUD-005 | NÃO VERIFICÁVEL |
| [H07-014](#h07-014) | P1 | CSV contextual restrito ao Principal | AUD-005 | NÃO VERIFICÁVEL |
| [H07-015](#h07-015) | P1 | Isolamento de navegação da página de trabalho | AUD-005 | NÃO VERIFICÁVEL |
| [H07-016](#h07-016) | P1 | Criar, alterar, cancelar e atribuir plantão | AUD-002 | NÃO VERIFICÁVEL |
| [H07-017](#h07-017) | P1 | Solicitação, aceite e recusa de troca | AUD-002 | NÃO VERIFICÁVEL |
| [H07-018](#h07-018) | P1 | Plantonista Atual como condição temporal | AUD-002, AUD-010 | NÃO VERIFICÁVEL |
| [H07-019](#h07-019) | P1 | Posologia e administração por medicamento | AUD-003 | NÃO VERIFICÁVEL |
| [H07-020](#h07-020) | P1 | Prevenção de administração duplicada | AUD-003 | NÃO VERIFICÁVEL |
| [H07-021](#h07-021) | P1 | Correção da ocorrência certa e original preservado | AUD-006, AUD-028 | NÃO VERIFICÁVEL |
| [H07-022](#h07-022) | P1 | Ver correção comum e somente leitura | AUD-014 | NÃO VERIFICÁVEL |
| [H07-023](#h07-023) | P1 | Conclusão de tarefas por item e combinação | AUD-007 | NÃO VERIFICÁVEL |
| [H07-024](#h07-024) | P1 | Edição do contato selecionado | AUD-008 | NÃO VERIFICÁVEL |
| [H07-025](#h07-025) | P1 | Detalhes próprios dos eventos de auditoria | AUD-009 | NÃO VERIFICÁVEL |
| [H07-026](#h07-026) | P1 | Quatro seleções de papéis | AUD-010 | NÃO VERIFICÁVEL |
| [H07-027](#h07-027) | P1 | Preferências opcionais e entregas obrigatórias | AUD-011 | NÃO VERIFICÁVEL |
| [H07-012](#h07-012) | P2 | LocalSubnav de Saúde no mobile | AUD-022 | NÃO VERIFICÁVEL |
| [H07-028](#h07-028) | P2 | Inclusões e identidade dos resultados | AUD-024, AUD-025, AUD-028 | NÃO VERIFICÁVEL |
| [H07-029](#h07-029) | P2 | Cinco Bottom Sheets completos | AUD-005, AUD-025, AUD-026 | NÃO VERIFICÁVEL |
| [H07-030](#h07-030) | P2 | Validações dentro dos cinco Sheets | AUD-017, AUD-026 | NÃO VERIFICÁVEL |
| [H07-031](#h07-031) | P2 | Handle, gesto e Back dos Sheets | AUD-005, AUD-015 | NÃO VERIFICÁVEL |
| [H07-032](#h07-032) | P2 | T10 erro e anexo sem overflow | AUD-017, AUD-024 | NÃO VERIFICÁVEL |
| [H07-033](#h07-033) | P2 | N01–N04, timeout, dismiss e destino | AUD-013 | NÃO VERIFICÁVEL |
| [H07-034](#h07-034) | P2 | Destinatário N02 e linguagem N04 | AUD-013 | NÃO VERIFICÁVEL |
| [H07-035](#h07-035) | P2 | Scroll, clipping e retorno de T04/T06 | AUD-015, AUD-022 | NÃO VERIFICÁVEL |
| [H07-036](#h07-036) | P2 | Mensagens de acesso próprio em T12 | AUD-018 | NÃO VERIFICÁVEL |
| [H07-037](#h07-037) | P2 | Leitura visual e padrões entre estados | AUD-016, AUD-019, AUD-020, AUD-021, AUD-023 | NÃO VERIFICÁVEL |
| [H07-038](#h07-038) | P2 | Feedback não encobre ações críticas | AUD-013, AUD-018 | NÃO VERIFICÁVEL |
| [H07-039](#h07-039) | P2 | Regressões FI-001–FI-008 e viewports | AUD-005, AUD-015, AUD-022 | NÃO VERIFICÁVEL |

Prioridade de execução não altera a gravidade original do AUD. Não há nova classificação de defeitos nesta rodada.

## H07-001

**Login inválido, válido e Loading** · execução P1 · origem CH-01 · AUD-001, AUD-012

Ator/fixture: Identidade autorizada da fixture de login.

Partida: [`6223:6272`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6272).

1. Acionar Entrar sem credenciais válidas e registrar a mensagem.
2. Tocar os campos previstos na fixture para demonstrar o preenchimento válido; acionar Entrar.
3. Observar Loading e destino final; tentar retornar.

**Esperado:** Erro não abre conteúdo protegido; a fixture válida passa por Loading e chega à Home autorizada.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-002

**Cadastro por convite sem sessão automática** · execução P1 · origem CH-02 · AUD-001

Ator/fixture: Convidado individual da fixture.

Partida: [`6223:6272`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6272).

1. Acionar Usar convite e conferir o contexto individual do convite.
2. Usar os campos predefinidos para a fixture válida e enviar.
3. Observar confirmação; continuar e conferir o retorno ao Login.

**Esperado:** A identidade é criada na simulação, sem sessão ou Home automática; o próximo passo é autenticar.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-003

**Validação do cadastro** · execução P1 · origem CH-03 · AUD-001, AUD-012

Ator/fixture: Convidado individual da fixture.

Partida: [`6223:6301`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6301).

1. Submeter a fixture inválida de confirmação.
2. Conferir erro e ausência de submissão autenticada.
3. Corrigir pela interação de campo da fixture e submeter o caminho válido.

**Esperado:** O erro corresponde aos campos mostrados e não concede acesso; a correção permite apenas o caminho de cadastro sem sessão.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-004

**Autenticação compartilhada da Pessoa Idosa** · execução P1 · origem CH-04 · AUD-012

Ator/fixture: Pessoa Idosa do próprio perfil autorizado.

Partida: [`8009:11349`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8009-11349).

1. Iniciar o QA Login Pessoa Idosa.
2. Preencher pela interação predefinida e Entrar.
3. Observar Loading e conferir a Home de leitura e o perfil apresentado.

**Esperado:** O AuthShell é compartilhado e o destino é o cuidado próprio autorizado em modo somente leitura.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-005

**Isolamento do ramo somente leitura** · execução P1 · origem CH-05 · AUD-005, AUD-012, AUD-014

Ator/fixture: Pessoa Idosa autenticada.

Partida: [`6223:9197`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9197).

1. Percorrer as quatro áreas, submenus e Settings; abrir e voltar de cada destino de leitura.
2. Procurar ações de criar, editar, corrigir, concluir, administrar, exportar e gerenciar a rede.
3. Percorrer Ver correção; tentar somente os acessos negados previstos pela fixture.

**Esperado:** Apenas leitura do próprio cuidado; nenhuma operação de escrita/CSV nem entrada funcional em T16/T17; os retornos permanecem no ramo de leitura.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-006

**Acesso direto negado e texto de auditoria** · execução P1 · origem CH-06 · AUD-012, AUD-027

Ator/fixture: Pessoa Idosa na fixture de acesso negado.

Partida: [`8009:11485`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8009-11485).

1. Acionar a tentativa de acesso direto prevista no QA.
2. Conferir o conteúdo e a mensagem de negação.
3. Usar a saída disponível e conferir o destino seguro.

**Esperado:** Dados protegidos não são exibidos; retorno seguro; a mensagem afirma o registro da tentativa, sem alegar comprovação de backend.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-007

**Cadastro da Pessoa Idosa e perfil pendente** · execução P1 · origem CH-07 · AUD-004

Ator/fixture: Identidade elegível da fixture US-003.

Partida: [`8018:15612`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8018-15612).

1. Autenticar na fixture elegível e abrir o cadastro da Pessoa Idosa.
2. Submeter vazio; registrar validação.
3. Preencher nome/data pela fixture e enviar; tentar os caminhos disponíveis no resultado pendente.

**Esperado:** Nome/data e perfil correspondem; o perfil pendente não libera cuidado antes da constituição exigida da rede.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-008

**Constituição conjunta da rede** · execução P1 · origem CH-08 · AUD-004

Ator/fixture: Identidade elegível; rede pendente de Antônio Oliveira.

Partida: [`8018:15769`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8018-15769).

1. Partindo do perfil pendente, abrir Constituir rede.
2. Conferir um Familiar Principal e ao menos um Profissional e confirmar.
3. Conferir o resultado, os vínculos e a pessoa exibida; continuar pelo retorno disponível.

**Esperado:** A mesma Pessoa Idosa é preservada e os vínculos exigidos aparecem; nenhum acesso antecipado é criado.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-009

**Jornada entre T01–T17 com retornos** · execução P1 · origem CH-09 · AUD-005

Ator/fixture: Fixture autorizada; Principal nos destinos restritos.

Partida: [`6223:6272`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6272).

1. Autenticar e, pela navegação do produto, visitar cada T01–T17 aplicável.
2. Em cada destino, registrar origem, elemento acionado, tela alcançada e retorno.
3. Repetir os retornos após scroll nas telas com lista.

**Esperado:** As 17 telas são alcançáveis pelos caminhos aprovados para os atores elegíveis, com retornos funcionais; abertura direta de um frame não comprova alcance.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-009-V01 | `{"screen": "T01", "node_id": "6223:6272", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V02 | `{"screen": "T02", "node_id": "6223:6301", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V03 | `{"screen": "T03", "node_id": "6223:6338", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V04 | `{"screen": "T04", "node_id": "6223:6364", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V05 | `{"screen": "T05", "node_id": "6223:6495", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V06 | `{"screen": "T06", "node_id": "6223:6562", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V07 | `{"screen": "T07", "node_id": "6223:6581", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V08 | `{"screen": "T08", "node_id": "6223:6593", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V09 | `{"screen": "T09", "node_id": "6223:6630", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V10 | `{"screen": "T10", "node_id": "6223:6663", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V11 | `{"screen": "T11", "node_id": "6223:6682", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V12 | `{"screen": "T12", "node_id": "6223:6704", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V13 | `{"screen": "T13", "node_id": "6223:6738", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V14 | `{"screen": "T14", "node_id": "6223:6773", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V15 | `{"screen": "T15", "node_id": "6223:6788", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V16 | `{"screen": "T16", "node_id": "6223:6800", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-009-V17 | `{"screen": "T17", "node_id": "6223:6836", "role": "ator elegível pela matriz; não aplicar todos os destinos a Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-010

**Quatro destinos primários e estado ativo** · execução P1 · origem CH-10 · AUD-005

Ator/fixture: Identidade autorizada da fixture.

Partida: [`6223:6338`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6338).

1. Acionar Home, Agenda, Diário e Saúde em sequência e voltar.
2. Conferir rótulo ativo e permanência do shell em cada destino.

**Esperado:** Exatamente quatro destinos; nenhum Mais; cada seleção abre a área correspondente e indica o estado ativo.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-011

**Settings comum e somente leitura** · execução P1 · origem CH-11 · AUD-005

Ator/fixture: Fixture autorizada comum e Pessoa Idosa, em execuções separadas.

Partida: [`6223:6338`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6338), [`6223:9197`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9197).

1. Abrir Settings pelo header e visitar cada destino permitido; voltar ao contexto anterior.
2. Reiniciar na Pessoa Idosa e repetir somente nos quatro destinos de leitura.

**Esperado:** Settings comum leva a T12–T17, conforme permissão; Settings de leitura somente a T12–T15, sem troca acidental de ramo.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-013

**Saídas de estados condicionais** · execução P1 · origem CH-13 · AUD-005

Ator/fixture: Ator indicado por cada starting point de QA.

Partida: [`6223:6998`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6998), [`6223:7111`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-7111), [`6223:7154`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-7154), [`6223:7221`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-7221), [`6223:8736`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8736).

1. Usar os starting points de QA documentados para Loading, Empty, Detail, Delayed, Corrected e Forbidden.
2. Executar as saídas e botões disponíveis; testar header, Back e navegação quando presentes.
3. Registrar individualmente os estados efetivamente percorridos.

**Esperado:** Cada estado demonstrável tem saída coerente e mantém shell/permissões da base; não aprovar toda a família por um único exemplo.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-013-V01 | `{"node_id": "6223:6894", "state": "[PROTO STATE] T01 — Login / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V02 | `{"node_id": "6223:6961", "state": "[PROTO STATE] T02 — Cadastro / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V03 | `{"node_id": "6223:6998", "state": "[PROTO STATE] T03 — Home / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V04 | `{"node_id": "6223:7111", "state": "[PROTO STATE] T05 — Detalhamento do Dia / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V05 | `{"node_id": "6223:7129", "state": "[PROTO STATE] T05 — Detalhamento do Dia / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V06 | `{"node_id": "6223:7154", "state": "[PROTO STATE] T05 — Detalhamento do Dia / delay"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V07 | `{"node_id": "6223:7221", "state": "[PROTO STATE] T05 — Detalhamento do Dia / corrected"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V08 | `{"node_id": "6223:7288", "state": "[PROTO STATE] T05 — Detalhamento do Dia / detail"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V09 | `{"node_id": "6223:7308", "state": "[PROTO STATE] T06 — Diário de Cuidados / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V10 | `{"node_id": "6223:7315", "state": "[PROTO STATE] T06 — Diário de Cuidados / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V11 | `{"node_id": "6223:7432", "state": "[PROTO STATE] T07 — Histórico de Cuidados / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V12 | `{"node_id": "6223:7440", "state": "[PROTO STATE] T07 — Histórico de Cuidados / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V13 | `{"node_id": "6223:7449", "state": "[PROTO STATE] T07 — Histórico de Cuidados / detail"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V14 | `{"node_id": "6223:7474", "state": "[PROTO STATE] T07 — Histórico de Cuidados / correction_complete"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V15 | `{"node_id": "6223:7512", "state": "[PROTO STATE] T08 — Medicamentos / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V16 | `{"node_id": "6223:7660", "state": "[PROTO STATE] T09 — Tarefas / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V17 | `{"node_id": "6223:7679", "state": "[PROTO STATE] T09 — Tarefas / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V18 | `{"node_id": "6223:7828", "state": "[PROTO STATE] T10 — Consultas e Recomendações / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V19 | `{"node_id": "6223:7839", "state": "[PROTO STATE] T10 — Consultas e Recomendações / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V20 | `{"node_id": "6223:7915", "state": "[PROTO STATE] T11 — Compromissos / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V21 | `{"node_id": "6223:7934", "state": "[PROTO STATE] T11 — Compromissos / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V22 | `{"node_id": "6223:8196", "state": "[PROTO STATE] T13 — Rede de Cuidado / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V23 | `{"node_id": "6223:8500", "state": "[PROTO STATE] T14 — Contatos Importantes / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V24 | `{"node_id": "6223:8512", "state": "[PROTO STATE] T14 — Contatos Importantes / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V25 | `{"node_id": "6223:8628", "state": "[PROTO STATE] T15 — Informações de Emergência / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V26 | `{"node_id": "6223:8640", "state": "[PROTO STATE] T15 — Informações de Emergência / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V27 | `{"node_id": "6223:8689", "state": "[PROTO STATE] T17 — Auditoria / loading"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V28 | `{"node_id": "6223:8703", "state": "[PROTO STATE] T17 — Auditoria / empty"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V29 | `{"node_id": "6223:8715", "state": "[PROTO STATE] T17 — Auditoria / detail"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V30 | `{"node_id": "6223:8736", "state": "[PROTO STATE] T17 — Auditoria / forbidden"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V31 | `{"node_id": "6223:8798", "state": "[PROTO STATE] T03 — Home / notification_n04_delayed"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V32 | `{"node_id": "8009:11403", "state": "[PROTO STATE] T01 — Login / loading Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-013-V33 | `{"node_id": "8009:11459", "state": "[PROTO STATE] T17 — Forbidden / Pessoa Idosa"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-014

**CSV contextual restrito ao Principal** · execução P1 · origem CH-14 · AUD-005

Ator/fixture: Familiar Principal; repetir a busca da ação na Pessoa Idosa.

Partida: [`6223:6581`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6581), [`6223:9534`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9534).

1. No Histórico do Principal, acionar CSV e observar progresso e resultado simulado.
2. Continuar e retornar sem ser obrigado a exportar novamente.
3. Na leitura, conferir ausência da ação de exportação.

**Esperado:** Somente o Principal demonstra exportação; resultado permite continuar; não exigir arquivo CSV real do protótipo.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-015

**Isolamento de navegação da página de trabalho** · execução P1 · origem CH-15 · AUD-005

Ator/fixture: Todos os atores usados nos demais cenários.

Partida: [`6223:6338`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6338), [`6223:9197`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9197).

1. Durante as jornadas, registrar arquivo/frame de destino quando exposto pelo Presentation.
2. Revisitar Concluir de T09, Editar de T14 e os destinos dos dois Settings.
3. Registrar qualquer mudança para baseline, original ou formulário LEGACY.

**Esperado:** Nenhum destino indevido observado. Se a interface não expuser identificação suficiente, registrar essa parcela como não verificável; não substituir cliques por inspeção do grafo.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-016

**Criar, alterar, cancelar e atribuir plantão** · execução P1 · origem CH-16 · AUD-002

Ator/fixture: Ator com permissão operacional na fixture de Agenda.

Partida: [`6223:6364`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6364).

1. Abrir Gerenciar plantões; criar pela fixture e conferir intervalo e demais itens.
2. Reiniciar a fixture; alterar o plantão selecionado e conferir apenas o intervalo alvo.
3. Reiniciar; abrir cancelamento, desistir e depois confirmar, conferindo cada resultado.
4. Reiniciar; atribuir responsável e conferir plantão e pessoa selecionados.

**Esperado:** Cada operação preserva entidade e dados não afetados; Cancelar mantém o plantão até a confirmação. Registrar as quatro operações separadamente.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-016-V01 | `{"operation": "create", "form": "8016:13861"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-016-V02 | `{"operation": "edit", "form": "8016:13952"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-016-V03 | `{"operation": "cancel", "form": "8016:14055"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-016-V04 | `{"operation": "assign", "form": "8016:14158"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-017

**Solicitação, aceite e recusa de troca** · execução P1 · origem CH-17 · AUD-002

Ator/fixture: Juliana solicitante e Marina destinatária; fixtures separadas.

Partida: [`6223:6364`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6364), [`8016:15263`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-15263).

1. Como Juliana, solicitar a troca para Marina e conferir a responsável antes da resposta.
2. No QA Marina, abrir a solicitação e aceitar; conferir a responsável.
3. Reiniciar o QA Marina e recusar; conferir a responsável e retornar.

**Esperado:** Pedido pendente mantém Juliana; aceite muda somente a responsabilidade esperada; recusa mantém Juliana. Não inferir execução simultânea entre fixtures.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-017-V01 | `{"operation": "responseScenario", "node_id": "8016:15263"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-017-V02 | `{"operation": "accepted", "node_id": "8016:15530"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-017-V03 | `{"operation": "refused", "node_id": "8016:15694"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-018

**Plantonista Atual como condição temporal** · execução P1 · origem CH-18 · AUD-002, AUD-010

Ator/fixture: Ator da fixture de plantão; Principal na gestão de papéis.

Partida: [`6223:6364`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6364), [`6223:6738`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6738).

1. Conferir condição operacional e intervalo nos cenários de plantão.
2. Abrir a gestão de papéis e verificar os rótulos de seleção.

**Esperado:** Plantonista Atual não é concedido como papel permanente; permissões contextuais e papéis aprovados são preservados.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-019

**Posologia e administração por medicamento** · execução P1 · origem CH-19 · AUD-003

Ator/fixture: Ator autorizado para a operação clínica demonstrada.

Partida: [`6223:6593`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6593).

1. Para A/B/C, abrir o card selecionado, detalhar e configurar posologia, agenda e responsável pela fixture.
2. Registrar administração da ocorrência e conferir o resultado e T05.
3. Criar Item A pelo Sheet e repetir no item recém-incluído.

**Esperado:** Nome, ocorrência, horários e responsável acompanham cada medicamento; T05 reflete o fato certo. Valores são fixtures de protótipo, não orientação clínica.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-019-V01 | `{"medication": "Medicamento A", "listCard": "6223:6600", "detail": "8017:14336", "plan": "8017:14551", "planned": "8017:14464", "administration": "8017:14668", "result": "8017:14771", "day": "8017:14877"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-019-V02 | `{"medication": "Medicamento B", "listCard": "6223:6611", "detail": "8017:15040", "plan": "8017:15253", "planned": "8017:15166", "administration": "8017:15370", "result": "8017:15473", "day": "8017:15579"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-019-V03 | `{"medication": "Medicamento C", "listCard": "6223:6620", "detail": "8017:15742", "plan": "8017:15955", "planned": "8017:15868", "administration": "8017:16072", "result": "8017:16175", "day": "8017:16281"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-019-V04 | `{"medication": "Item A", "detail": "8025:16674", "plan": "8025:16751", "planned": "8025:16817", "administration": "8025:16905", "result": "8025:16971", "day": "8025:17066"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-020

**Prevenção de administração duplicada** · execução P1 · origem CH-20 · AUD-003

Ator/fixture: Mesmo ator e ocorrência do cenário de medicamento.

Partida: [`8017:14771`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-14771), [`8017:15473`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-15473), [`8017:16175`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-16175), [`8025:16971`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8025-16971).

1. Chegar a cada resultado por administração real na fixture.
2. Tentar as ações de continuação/retorno disponíveis e conferir se há nova conclusão da mesma ocorrência.

**Esperado:** Não há repetição da mesma administração, reabertura, dose extra ou afirmação automática de omissão clínica.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-020-V01 | `{"medication": "Medicamento A", "node_id": "8017:14771"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-020-V02 | `{"medication": "Medicamento B", "node_id": "8017:15473"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-020-V03 | `{"medication": "Medicamento C", "node_id": "8017:16175"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-020-V04 | `{"medication": "Item A", "node_id": "8025:16971"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-021

**Correção da ocorrência certa e original preservado** · execução P1 · origem CH-21 · AUD-006, AUD-028

Ator/fixture: Juliana Ferreira com permissão efetiva da fixture.

Partida: [`6223:6562`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6562), [`6223:6581`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6581).

1. Para cada uma das oito ocorrências da tabela, acionar Corrigir a partir do registro.
2. Conferir tipo/data/hora/texto/autor antes de salvar; cancelar e conferir retorno sem alteração.
3. Repetir, usar a correção predefinida e salvar; conferir original e nova versão com autoria e horário próprios.

**Esperado:** Cada ação usa sua própria ocorrência; o original permanece íntegro e vinculado à nova versão; Hoje 8/9 e Ontem 7/9 são coerentes.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-021-V01 | `{"source": "6223:6562", "record": "6223:6571", "key": "Mobilidade 8 de setembro 15:20", "form": "8012:11874", "result": "8012:11970", "version": "8012:12162", "original": {"time": "15:20", "category": "Mobilidade", "body": "“Fez uma caminhada curta pela casa.”", "author": "Carlos Souza"}, "correction": "Correção do registro de 8 de setembro às 15:20: Fez uma caminhada curta pela casa.", "actor": "Juliana Ferreira", "time": "8 de setembro 16:00"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-021-V02 | `{"source": "6223:6562", "record": "6223:6572", "key": "Alimentação 8 de setembro 12:40", "form": "8012:12260", "result": "8012:12356", "version": "8012:12548", "original": {"time": "12:40", "category": "Alimentação", "body": "“Almoçou normalmente e descansou após a refeição.”", "author": "Ana Ferreira"}, "correction": "Correção do registro de 8 de setembro às 12:40: Almoçou normalmente e descansou após a refeição.", "actor": "Juliana Ferreira", "time": "8 de setembro 16:00"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-021-V03 | `{"source": "6223:6562", "record": "6223:6573", "key": "Hidratação 8 de setembro 10:35", "form": "8012:12646", "result": "8012:12742", "version": "8012:12934", "original": {"time": "10:35", "category": "Hidratação", "body": "“Bebeu um copo de água durante a manhã.”", "author": "João Martins"}, "correction": "Correção do registro de 8 de setembro às 10:35: Bebeu um copo de água durante a manhã.", "actor": "Juliana Ferreira", "time": "8 de setembro 16:00"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-021-V04 | `{"source": "6223:6562", "record": "6223:6574", "key": "Alimentação 8 de setembro 08:10", "form": "8012:13032", "result": "8012:13128", "version": "8012:13320", "original": {"time": "08:10", "category": "Alimentação", "body": "“Tomou café, comeu uma fatia de pão e uma banana.”", "author": "Ana Ferreira"}, "correction": "Correção do registro de 8 de setembro às 08:10: Tomou café, comeu uma fatia de pão e uma banana.", "actor": "Juliana Ferreira", "time": "8 de setembro 16:00"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-021-V05 | `{"source": "6223:6562", "record": "6223:6578", "key": "Alimentação 7 de setembro 19:15", "form": "8012:13418", "result": "8012:13514", "version": "8012:13706", "original": {"time": "19:15", "category": "Alimentação", "body": "“Jantou sopa de legumes e tomou suco.”", "author": "Ana Ferreira"}, "correction": "Correção do registro de 7 de setembro às 19:15: Jantou sopa de legumes e tomou suco.", "actor": "Juliana Ferreira", "time": "8 de setembro 16:00"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-021-V06 | `{"source": "6223:6562", "record": "6223:6579", "key": "Descanso 7 de setembro 16:30", "form": "8012:13804", "result": "8012:13900", "version": "8012:14092", "original": {"time": "16:30", "category": "Descanso", "body": "“Descansou um pouco no sofá assistindo TV.”", "author": "Carlos Souza"}, "correction": "Correção do registro de 7 de setembro às 16:30: Descansou um pouco no sofá assistindo TV.", "actor": "Juliana Ferreira", "time": "8 de setembro 16:00"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-021-V07 | `{"source": "6223:6581", "record": "6223:6590", "key": "Medicação 8 de setembro 09:20", "form": "8012:14190", "result": "8012:14287", "version": "8012:14397", "original": {"time": "09:20", "category": "Medicação", "body": "“Medicação registrada conforme orientação anterior.”", "author": "Marina Souza"}, "correction": "Correção do registro de 8 de setembro às 09:20: Medicação registrada conforme orientação anterior.", "actor": "Juliana Ferreira", "time": "8 de setembro 16:00"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-021-V08 | `{"source": "6223:6581", "record": "6223:6591", "key": "Medicação 8 de setembro 11:20", "form": "8012:14495", "result": "8012:14591", "version": "8012:14701", "original": {"time": "11:20", "category": "Medicação", "body": "“Correção do registro das 09:20: medicação administrada após o café da manhã.”", "author": "Marina Souza"}, "correction": "Correção do registro de 8 de setembro às 11:20: Correção do registro das 09:20: medicação administrada após o café da manhã.", "actor": "Juliana Ferreira", "time": "8 de setembro 16:00"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-022

**Ver correção comum e somente leitura** · execução P1 · origem CH-22 · AUD-014

Ator/fixture: Ator autorizado comum e Pessoa Idosa, separadamente.

Partida: [`6223:6581`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6581), [`6223:9534`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9534).

1. Abrir Ver correção na ocorrência vinculada do Histórico.
2. Conferir a versão aberta e voltar.
3. Repetir no ramo somente leitura, procurando indevidamente ações de escrita.

**Esperado:** A versão corresponde ao vínculo e o retorno preserva contexto; na leitura não aparece ação de correção.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-022-V01 | `{"branch": "comum", "version": "8012:14929"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-022-V02 | `{"branch": "Pessoa Idosa", "version": "8012:14839"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-023

**Conclusão de tarefas por item e combinação** · execução P1 · origem CH-23 · AUD-007

Ator/fixture: Ator autorizado para concluir as tarefas da fixture.

Partida: [`6223:6630`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6630), [`6223:7755`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-7755).

1. Na lista sem nova tarefa, concluir cada pendente separadamente, reiniciando entre as escolhas.
2. Repetir na lista com Acompanhar hidratação criada.
3. Percorrer as combinações documentadas até todas concluídas e conferir os itens restantes em cada passo.

**Esperado:** Somente o item acionado muda; tarefa criada e itens anteriores permanecem; não aparece reabertura. Cada combinação precisa de observação própria.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-023-V01 | `{"id": "6223:6630", "mask": 0, "added": false, "pending": ["Separar documentos para consulta", "Organizar itens para o atendimento"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V02 | `{"id": "6223:7794", "mask": 1, "added": false, "pending": ["Organizar itens para o atendimento"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V03 | `{"id": "8005:9666", "mask": 2, "added": false, "pending": ["Separar documentos para consulta"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V04 | `{"id": "8005:9781", "mask": 3, "added": false, "pending": []}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V05 | `{"id": "6223:7755", "mask": 0, "added": true, "pending": ["Separar documentos para consulta", "Organizar itens para o atendimento", "Acompanhar hidratação"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V06 | `{"id": "8005:9904", "mask": 1, "added": true, "pending": ["Organizar itens para o atendimento", "Acompanhar hidratação"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V07 | `{"id": "8005:10043", "mask": 2, "added": true, "pending": ["Separar documentos para consulta", "Acompanhar hidratação"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V08 | `{"id": "8005:10182", "mask": 3, "added": true, "pending": ["Acompanhar hidratação"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V09 | `{"id": "8005:10329", "mask": 4, "added": true, "pending": ["Separar documentos para consulta", "Organizar itens para o atendimento"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V10 | `{"id": "8005:10468", "mask": 5, "added": true, "pending": ["Organizar itens para o atendimento"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V11 | `{"id": "8005:10615", "mask": 6, "added": true, "pending": ["Separar documentos para consulta"]}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-023-V12 | `{"id": "8005:10762", "mask": 7, "added": true, "pending": []}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-024

**Edição do contato selecionado** · execução P1 · origem CH-24 · AUD-008

Ator/fixture: Ator autorizado para gerenciar contatos.

Partida: [`6223:6773`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6773), [`6223:8525`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8525).

1. Para cada contato/lista da tabela, acionar Editar e conferir identidade e telefone inicial.
2. Cancelar; depois salvar sem mudança, quando oferecido, e conferir que não inventa alteração.
3. Reabrir, acionar o telefone da fixture editada e salvar; conferir identidade, telefone final e demais contatos.

**Esperado:** Maria Helena, Carlos e Hospital mantêm dados próprios; somente o telefone selecionado é atualizado.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-024-V01 | `{"source": "6223:6773", "contact": "Maria Helena Silva", "form": "6223:8590", "edited": "8006:33567", "result": "8006:33630", "phoneBefore": "(69) 98765-4321", "phoneAfter": "(69) 98765-4322"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-024-V02 | `{"source": "6223:6773", "contact": "Dr. Carlos Mendes", "form": "8006:33693", "edited": "8006:33756", "result": "8006:33819", "phoneBefore": "(69) 3456-7890", "phoneAfter": "(69) 3456-7891"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-024-V03 | `{"source": "6223:8525", "contact": "Maria Helena Silva", "form": "8006:33881", "edited": "8006:33944", "result": "8006:34007", "phoneBefore": "(69) 98765-4321", "phoneAfter": "(69) 98765-4322"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-024-V04 | `{"source": "6223:8525", "contact": "Dr. Carlos Mendes", "form": "8006:34086", "edited": "8006:34149", "result": "8006:34212", "phoneBefore": "(69) 3456-7890", "phoneAfter": "(69) 3456-7891"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-024-V05 | `{"source": "6223:8525", "contact": "Hospital São Lucas", "form": "8006:34291", "edited": "8006:34354", "result": "8006:34417", "phoneBefore": "(69) 3222-1180", "phoneAfter": "(69) 3222-1181"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-025

**Detalhes próprios dos eventos de auditoria** · execução P1 · origem CH-25 · AUD-009

Ator/fixture: Ator autorizado a T17.

Partida: [`6223:6836`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6836).

1. Abrir os eventos Registro criado, Tarefa concluída e Acesso bloqueado.
2. Comparar ator, recurso, horário, operação e resultado com o evento escolhido.
3. Voltar à lista entre as escolhas.

**Esperado:** Os três detalhes são distintos e correspondem à linha acionada; retorno funcional.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-025-V01 | `{"event": "Registro criado", "detail": "6223:8715"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-025-V02 | `{"event": "Tarefa concluída 13:02", "detail": "8011:11419"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-025-V03 | `{"event": "Acesso bloqueado 11:18", "detail": "8011:11492"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-026

**Quatro seleções de papéis** · execução P1 · origem CH-26 · AUD-010

Ator/fixture: Familiar Principal da fixture; membro alvo explícito.

Partida: [`6223:6738`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6738).

1. Abrir Gerenciar papéis e alternar Apoio/Emergência para cada uma das quatro combinações.
2. Cancelar uma alteração e conferir preservação da seleção anterior.
3. Salvar cada combinação e conferir o membro alvo, o resultado e o Principal da rede.

**Esperado:** Resultado espelha exatamente a combinação mostrada; um único Principal é mantido; nenhuma permissão nova é inventada.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-026-V01 | `{"mask": 0, "form": "8010:11973", "result": "8010:12034"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-026-V02 | `{"mask": 1, "form": "6223:8289", "result": "8010:12119"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-026-V03 | `{"mask": 2, "form": "8010:12196", "result": "8010:12257"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-026-V04 | `{"mask": 3, "form": "8010:12352", "result": "6223:8310"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-027

**Preferências opcionais e entregas obrigatórias** · execução P1 · origem CH-27 · AUD-011

Ator/fixture: Apoio nas quatro fixtures; Principal em execução separada.

Partida: [`8010:12439`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8010-12439), [`6223:6800`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6800).

1. Como Apoio, alternar os dois switches opcionais nas quatro combinações, salvar e aguardar o feedback.
2. Conferir seleção após timeout e retorno.
3. Na fixture Principal, tentar desligar N03/N04.

**Esperado:** As quatro seleções opcionais persistem nos estados demonstrados; feedback desaparece; Principal não desliga entregas obrigatórias.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-027-V01 | `{"mask": 0, "form": "8010:12508", "result": "8010:12577"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-027-V02 | `{"mask": 1, "form": "8010:12439", "result": "8010:12650"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-027-V03 | `{"mask": 2, "form": "8010:12719", "result": "8010:12788"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-027-V04 | `{"mask": 3, "form": "8010:12865", "result": "8010:12934"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-027-V05 | `{"actor": "Principal", "form": "6223:6800", "expected": "N03/N04 obrigatórias não podem ser desligadas"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-012

**LocalSubnav de Saúde no mobile** · execução P2 · origem CH-12 · AUD-022

Ator/fixture: Identidade autorizada da fixture.

Partida: [`6223:6593`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6593).

1. Rolar horizontalmente a LocalSubnav até Compromissos.
2. Acionar Medicamentos, Tarefas, Consultas e Compromissos e retornar.
3. Rolar o conteúdo vertical e observar posicionamento e estado ativo.

**Esperado:** Abas alcançáveis, destinos e seleção corretos; conteúdo não invade elementos fixos. Recolhimento por direção não prototipado é limitação declarada, não reprovação automática.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-028

**Inclusões e identidade dos resultados** · execução P2 · origem CH-28 · AUD-024, AUD-025, AUD-028

Ator/fixture: Ator autorizado por operação; membro novo Dr. Renato Costa.

Partida: [`6223:6562`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6562), [`6223:6593`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6593), [`6223:6663`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6663), [`6223:6738`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6738).

1. Criar pela fixture de cada fluxo: hidratação, Item A, consulta e membro.
2. Comparar nome, autoria e horários com o formulário; conferir presença dos itens anteriores.
3. Em T10, distinguir horário clínico do horário de registro e conferir também o ramo de leitura.

**Esperado:** Os resultados demonstram a inclusão real na lista simulada, sem só exibir toast; T10 conserva autoria/data/hora e Diário conserva cronologia coerente.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-029

**Cinco Bottom Sheets completos** · execução P2 · origem CH-29 · AUD-005, AUD-025, AUD-026

Ator/fixture: Ator autorizado para cada criação contextual.

Partida: [`6223:6562`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6562), [`6223:6593`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6593), [`6223:6630`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6630), [`6223:6663`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6663), [`6223:6682`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6682).

1. Partindo de cada base, abrir o cadastro por seu CTA.
2. Observar abertura bottom→up, base, scrim e dimensões.
3. Preencher pela fixture, salvar e continuar; reiniciar e cancelar; conferir a tela-base após fechar.

**Esperado:** T06/T08/T09/T10/T11 usam Sheet contextual e não formulário full-page; salvar/cancelar/back têm contexto coerente.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-029-V01 | `{"screen": "T06", "base": "6223:6562", "sheet": "6223:9141", "validation_error": "6223:9168"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-029-V02 | `{"screen": "T08", "base": "6223:6593", "sheet": "6223:8966", "validation_error": "6223:8992"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-029-V03 | `{"screen": "T09", "base": "6223:6630", "sheet": "6223:9019", "validation_error": "6223:9034"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-029-V04 | `{"screen": "T10", "base": "6223:6663", "sheet": "6223:9051", "validation_error": "6223:9068"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-029-V05 | `{"screen": "T11", "base": "6223:6682", "sheet": "6223:9102", "validation_error": "6223:9120"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-030

**Validações dentro dos cinco Sheets** · execução P2 · origem CH-30 · AUD-017, AUD-026

Ator/fixture: Ator autorizado para cada criação contextual.

Partida: [`6223:6562`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6562), [`6223:6593`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6593), [`6223:6630`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6630), [`6223:6663`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6663), [`6223:6682`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6682).

1. Em cada Sheet, submeter vazio ou inválido.
2. Conferir mensagem e conteúdo do campo dentro do Sheet.
3. Acionar o preenchimento válido da fixture e repetir o envio.

**Esperado:** Erro permanece no Sheet e corresponde ao valor exibido; T08 não mostra nome preenchido com erro de nome obrigatório; o caminho corrigido funciona.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-030-V01 | `{"screen": "T06", "base": "6223:6562", "sheet": "6223:9141", "validation_error": "6223:9168"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-030-V02 | `{"screen": "T08", "base": "6223:6593", "sheet": "6223:8966", "validation_error": "6223:8992"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-030-V03 | `{"screen": "T09", "base": "6223:6630", "sheet": "6223:9019", "validation_error": "6223:9034"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-030-V04 | `{"screen": "T10", "base": "6223:6663", "sheet": "6223:9051", "validation_error": "6223:9068"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-030-V05 | `{"screen": "T11", "base": "6223:6682", "sheet": "6223:9102", "validation_error": "6223:9120"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-031

**Handle, gesto e Back dos Sheets** · execução P2 · origem CH-31 · AUD-005, AUD-015

Ator/fixture: Ator autorizado nas cinco bases.

Partida: [`6223:6562`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6562), [`6223:6593`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6593), [`6223:6630`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6630), [`6223:6663`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6663), [`6223:6682`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6682).

1. Abrir cada Sheet e tentar handle, gesto previsto, Cancelar e Back em execuções independentes.
2. Repetir após rolar a tela-base e conferir posição/contexto ao fechar.

**Esperado:** Fechamento não troca indevidamente a base. Se o gesto não estiver disponível no protótipo, registrar limitação específica; Cancelar continua obrigatório.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-031-V01 | `{"screen": "T06", "base": "6223:6562", "sheet": "6223:9141", "validation_error": "6223:9168"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-031-V02 | `{"screen": "T08", "base": "6223:6593", "sheet": "6223:8966", "validation_error": "6223:8992"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-031-V03 | `{"screen": "T09", "base": "6223:6630", "sheet": "6223:9019", "validation_error": "6223:9034"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-031-V04 | `{"screen": "T10", "base": "6223:6663", "sheet": "6223:9051", "validation_error": "6223:9068"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-031-V05 | `{"screen": "T11", "base": "6223:6682", "sheet": "6223:9102", "validation_error": "6223:9120"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-032

**T10 erro e anexo sem overflow** · execução P2 · origem CH-32 · AUD-017, AUD-024

Ator/fixture: Ator autorizado para consulta.

Partida: [`6223:6663`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6663).

1. Abrir Novo registro, provocar erro e percorrer todos os campos e CTAs.
2. No cenário de anexo, acionar o anexo predefinido e salvar.
3. Comparar resultado com/sem anexo, autoria e horários.

**Esperado:** Nada excede a largura disponível; mensagens e CTAs acessíveis; o arquivo só aparece no resultado correspondente ao cenário com anexo.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-033

**N01–N04, timeout, dismiss e destino** · execução P2 · origem CH-33 · AUD-013

Ator/fixture: Atores elegíveis por evento; fixtures N02/N03/N04 explícitas.

Partida: [`6223:6364`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6364), [`8022:18663`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8022-18663), [`8022:18772`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8022-18772), [`8022:18881`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8022-18881).

1. Gerar os cinco eventos N01 documentados e observar o aviso.
2. Nos QA N02/N03/N04, acionar o evento precondicionado.
3. Para cada aviso, reiniciar e testar destino, dismiss quando oferecido e timeout; conferir o contexto preservado.

**Esperado:** Avisos transitórios abrem T04/T05/T07 contextual; timeout/dismiss não desfaz o fato; nenhuma central de notificações é criada.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-033-V01 | `{"notification": "N01", "event": "created", "notice": "8022:17315", "persistentResult": "8016:14352", "destination": "8016:14352"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-033-V02 | `{"notification": "N01", "event": "edited", "notice": "8022:17499", "persistentResult": "8016:14525", "destination": "8016:14525"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-033-V03 | `{"notification": "N01", "event": "cancelled", "notice": "8022:17669", "persistentResult": "8016:14684", "destination": "8016:14684"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-033-V04 | `{"notification": "N01", "event": "assigned", "notice": "8022:17839", "persistentResult": "8016:14843", "destination": "8016:14843"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-033-V05 | `{"notification": "N01", "event": "accepted", "notice": "8022:18009", "persistentResult": "8016:15530", "destination": "8016:15530"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-033-V06 | `{"notification": "N2", "entry": "8022:18663", "notice": "6223:8744", "destination": "8022:18200", "dismiss": "6223:6338"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-033-V07 | `{"notification": "N3", "entry": "8022:18772", "notice": "6223:8771", "destination": "8022:18444", "dismiss": "6223:6338"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-033-V08 | `{"notification": "N4", "entry": "8022:18881", "notice": "6223:8798", "destination": "8022:18322", "dismiss": "8022:18552"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## H07-034

**Destinatário N02 e linguagem N04** · execução P2 · origem CH-34 · AUD-013

Ator/fixture: Responsável explicitamente elegível em N02; Principal em N04.

Partida: [`8022:18663`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8022-18663), [`8022:18881`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8022-18881).

1. Acionar N02 e conferir a responsável/ocorrência mostradas.
2. Acionar o cenário N04 H+15 e ler integralmente a mensagem e o destino.

**Esperado:** N02 corresponde à designação explícita; N04 informa falta de registro, sem afirmar falta de cuidado. Não inferir envio real, concorrência ou fallback de backend.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-035

**Scroll, clipping e retorno de T04/T06** · execução P2 · origem CH-35 · AUD-015, AUD-022

Ator/fixture: Ator autorizado comum e Pessoa Idosa.

Partida: [`6223:6364`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6364), [`6223:9223`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9223), [`6223:6562`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6562), [`6223:9516`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9516).

1. Rolar as listas até o fim e voltar, observando header, LocalSubnav e Navigation Bar.
2. Abrir detalhe e retornar após scroll.
3. Nas bases com escrita autorizada, abrir e fechar overlays após scroll.

**Esperado:** Conteúdo fica no viewport; elementos fixos não são invadidos; retorno e overlays preservam contexto. Read-only não recebe ações de escrita.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-036

**Mensagens de acesso próprio em T12** · execução P2 · origem CH-36 · AUD-018

Ator/fixture: Ator elegível para administrar acesso; Pessoa Idosa somente leitura.

Partida: [`6223:6704`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6704), [`6223:8825`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8825), [`6223:8860`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8860), [`6223:8895`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8895).

1. Pelo fluxo ou starting points de QA, abrir os estados de acesso próprio.
2. Rolar e ler as mensagens completas; alcançar Editar perfil quando permitido.
3. Repetir em viewport local menor, registrando tamanho e modo de escala do Presentation.

**Esperado:** Nenhum texto/CTA cortado; acesso a edição existe somente para o ator autorizado. Reduzir a janela não comprova responsividade de uma aplicação implementada.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-037

**Leitura visual e padrões entre estados** · execução P2 · origem CH-37 · AUD-016, AUD-019, AUD-020, AUD-021, AUD-023

Ator/fixture: Atores dos cenários funcionais; comparação dos estados percorridos.

Partida: [`6223:6338`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6338), [`6223:6630`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6630), [`6223:6800`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6800).

1. Observar Home, alvos, rótulos, cores, categorias, margens e texto nos estados realmente percorridos.
2. Comparar antes/depois de cada transição e registrar diferenças concretas.
3. Consultar separadamente as medidas estáticas anteriores de 48×48, 14 px e contraste, sem promovê-las a testes runtime.

**Esperado:** Home usa a surface prevista, conteúdo legível e estados consistentes. Screenshot não certifica dimensões/contraste; valores estáticos têm proveniência própria, sem nova auditoria estrutural.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-038

**Feedback não encobre ações críticas** · execução P2 · origem CH-38 · AUD-013, AUD-018

Ator/fixture: Ator do evento e operação demonstrados.

Partida: [`6223:6338`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6338), [`6223:6800`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6800).

1. Disparar feedback e localizar o conteúdo e CTA subjacentes.
2. Aguardar o timeout previsto ou usar dismiss oferecido.
3. Acionar a próxima ação e conferir seleção/contexto.

**Esperado:** Nenhuma ação crítica permanece permanentemente encoberta; o feedback desaparece sem perda indevida de estado.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

## H07-039

**Regressões FI-001–FI-008 e viewports** · execução P2 · origem CH-39 · AUD-005, AUD-015, AUD-022

Ator/fixture: Ator elegível por fluxo; Pessoa Idosa para regressão de leitura.

Partida: [`6223:6593`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6593), [`6223:6663`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6663), [`6223:6800`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6800), [`6223:6738`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6738), [`6223:9223`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9223), [`6223:6562`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6562).

1. FI-001: abrir criação de T08 e voltar, sem legado.
2. FI-002–FI-004: testar CTAs de T10 Empty, Loading e cadastro; não abrir medicamento.
3. FI-005: salvar Preferências e continuar em T16. FI-006/007: abrir Perfil/Auditoria via Settings conforme permissão.
4. Reexecutar T04/T06 após scroll. FI-008: consultar o registro histórico de nomes E22/E24/E25/E23, separado dos testes interativos.

**Esperado:** As regressões interativas são comprovadas pelo uso; FI-008 é metadado estático e não pode ser aprovado por clique. Não reabrir defeitos históricos sem nova evidência.

**Execução nesta rodada:** nenhuma ação do cenário; resultado NÃO VERIFICÁVEL por EV07-ENV-001. Evidência do produto: pendente.

Variantes documentadas a executar separadamente:

| Variante | Fixture / IDs esperados | Resultado observado / evidência / status |
|---|---|---|
| H07-039-V01 | `{"regression": "FI-001", "mode": "INTERATIVO", "prior_result": "resolvido ou superado; não revalidado nesta rodada"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-039-V02 | `{"regression": "FI-002", "mode": "INTERATIVO", "prior_result": "resolvido ou superado; não revalidado nesta rodada"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-039-V03 | `{"regression": "FI-003", "mode": "INTERATIVO", "prior_result": "resolvido ou superado; não revalidado nesta rodada"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-039-V04 | `{"regression": "FI-004", "mode": "INTERATIVO", "prior_result": "resolvido ou superado; não revalidado nesta rodada"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-039-V05 | `{"regression": "FI-005", "mode": "INTERATIVO", "prior_result": "resolvido ou superado; não revalidado nesta rodada"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-039-V06 | `{"regression": "FI-006", "mode": "INTERATIVO", "prior_result": "resolvido ou superado; não revalidado nesta rodada"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-039-V07 | `{"regression": "FI-007", "mode": "INTERATIVO", "prior_result": "resolvido ou superado; não revalidado nesta rodada"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |
| H07-039-V08 | `{"regression": "FI-008", "mode": "ESTATICO_HISTORICO", "prior_result": "resolvido ou superado; não revalidado nesta rodada"}` | Não executado / sem evidência / NÃO VERIFICÁVEL |

## Encerramento da execução assistida

CH-40: nenhum P0/P1 funcional pendente e decisões humanas para P2 residuais. Um caso não verificável crítico mantém o gate aberto. CH-41: limitações e dependências da aplicação permanecem documentadas. CH-42: revisão humana antes de qualquer decisão de merge ou promoção.

Consolidar contagens a partir dos resultados observados, atualizar o status de cada AUD com os cenários efetivamente aprovados e registrar o parecer no PR #127. A conclusão documental desta rodada não encerra a homologação funcional.
