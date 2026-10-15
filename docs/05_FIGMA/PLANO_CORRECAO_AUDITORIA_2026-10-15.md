# Plano de correção pós-auditoria — Protótipo Figma Rede de Apoio

**Data do plano:** 2026-10-15  
**Situação:** planejamento para revisão; nenhuma correção aplicada ao Figma  
**Auditoria de origem:** `Relatorio_auditoria_Figma.md` (fornecido pelo solicitante nesta etapa; relatório completo e seus anexos externos não estão incorporados aqui)  
**Base da auditoria:** `main` em `4712047e4550e4504b213e638aaf8a17310f4935`  
**Origem Figma intocável:** `tcyj2fkTXei2CJbqaRxqCp`, página `Fluxo Final`, node `5926:1014`  
**Autoridade funcional:** RF/RNF/US, critérios aprovados, BUSINESS_RULES/DEC-AUTH-001 e demais decisões em `main`.  
**Design:** Figma canônico/Design Foundation + Material Design 3 subordinado às regras aprovadas.

> Este plano não é homologação, não cria novo RF/RNF/US, não substitui a matriz de permissões, não autoriza promover a cópia como canônica. É o backlog executável dos 28 achados da auditoria: **11 P1, 16 P2, 1 P3, nenhum P0 demonstrado**. A auditoria não conseguiu executar nenhum cenário no Figma Presentation: `Não testado em runtime` não pode ser chamado de `Passou`.

## 0. Regra de preservação e checkpoints

1. **Não modificar** o arquivo Figma original nem a página canônica. Se a ferramenta de edição usar `fileKey` da origem, cancelar antes de qualquer escrita.
2. Antes de editar, usar a operação nativa **Duplicate** do arquivo Figma inteiro, preservando componentes, componentes locais, instâncias, imagens, variáveis e Prototype reactions. Criar:
   - `Rede de Apoio — BACKUP — 2026-10-15 — SOMENTE LEITURA` (arquivo congelado, sem alterações).
   - `Rede de Apoio — CORRECOES AUDITORIA — 2026-10-15` (arquivo de trabalho independente; duplicado do mesmo estado).
   - Caso a duplicação nativa não seja disponível no ambiente automatizado, **não** substituir por PNGs, reconstrução ou importação parcial. Registrar bloqueio e executar o passo via Figma UI/Work.
3. Registrar no GitHub **URLs e fileKeys reais** dos três arquivos, IDs de páginas/nós após duplicação, data/hora e quem verificou. Nunca presumir que o `node-id` da origem permanece igual na cópia.
4. Gate de integridade na cópia: 17 bases T01–T17, inventário de estados canônicos conforme registries (113 nós no recorte auditado), 5 cadastros por Bottom Sheet e grafo RO/Settings preservados; links de navegação não podem continuar apontando à origem; confrontar amostra de telas/prototype links.
5. Antes da primeira alteração, abrir e salvar um **checkpoint de versão nomeado** dentro da cópia de trabalho e registrar no GitHub. Se disponível, usar nova versão nomeada após cada lote concluído.
6. A origem permanece pronta para demonstração nos limites do estado atual; não atualizar `FIGMA_REGISTRY.yaml` para apontar para a cópia durante o trabalho. Manter registro separado do arquivo experimental.
7. Correções apenas em Figma de trabalho; documentação em branch, commits e PRs pequenos; **merge somente com revisão humana**, respeitando `AGENTS.md`. Não alterar app, MySQL, código, deploy ou critérios de aceitação nesta missão.

## 1. Inventário dos 28 defeitos e solução exigida

Legenda: P1 = prioridade alta; P2 = relevante; P3 = polimento. Todos os itens começam **PENDENTE**, sem presumir correção/execução.

| ID | P | Onde | Ação corretiva específica | Critério de aceite da correção |
|---|---|---|---|---|
| AUD-001 | P1 | T02 / T01 | Reescrever simulação de cadastro conforme DEC-AUTH-001: convite individual autorizado, criação de identidade CUIDADOR sem sessão/rede/papel automáticos; saída de onboarding coerente | O clique em Criar conta não concede Home de cuidado automaticamente; fluxo tem início/retorno e rótulos coerentes |
| AUD-002 | P1 | T04, E03–E07 | Criar estados/Sheets contextuais para criar, alterar, cancelar, atribuir plantão e solicitar/responder troca, com fixtures permitidas | Toda operação aprovada tem entrada, escolha/confirmar, resultado e saída; preserva Semana/Dia e Plantonista Atual como condição, não papel |
| AUD-003 | P1 | T08/T05, E15/E16 | Acrescentar representação de posologia/horários e registro de administração com medicamento, executor e horário da ocorrência | Planejamento e administração são operações distintas e navegáveis; não inventar regra clínica, dose ou fallback |
| AUD-004 | P1 | T12 registration | Ligar cenário de constituição/cadastro da Pessoa Idosa com validação, sucesso e retorno autorizado | Cadastro deixa de ser frame órfão e demonstra a US-003 sem concessão implícita de Principal/rede |
| AUD-005 | P1 | Estados T01–T17/RO | Repor reactions de Back, Navigation Bar, LocalSubnav e saídas de resultados preservando shell e contexto | Todos os resultados/detalhes permitem continuar/retornar sem reiniciar; remover loop exportação→exportação |
| AUD-006 | P1 | T06→T07 | Separar correção por registro/fixture ou usar variáveis contextuais mantendo tipo e identidade | Corrigir Mobilidade/Alimentação/etc. abre a própria ocorrência e vincula nova versão, nunca medicação de outra pessoa |
| AUD-007 | P1 | T09 | Vincular Concluir ao ID da tarefa acionada, preservando lista e recém-criada | Só a tarefa selecionada muda; restantes permanecem; não incluir reabertura na V1 |
| AUD-008 | P1 | T14 | Mapear Editar ao contato selecionado e respectivo formulário/resultado | Editar o médico abre identidade e relação do médico; não os dados de Maria Helena |
| AUD-009 | P1 | T17 | Associar cada item do log ao detalhe correto com ator, operação, horário e resultado | Eventos distintos abrem detalhes distintos, inclusive tentativa negada |
| AUD-010 | P1 | T13 | Permitir alternância demonstrativa de checkbox de papel e resultado correspondente; contexto do Principal inequívoco | Emergência só aparece salvo quando selecionado; mantém exatamente um Principal |
| AUD-011 | P1 | T16 | Switches opcionais efetivamente interativos na simulação; resultado espelha seleção; configurar cenário Principal | Itens opcionais respondem ao clique; obrigatórios não podem ser desligados no contexto aprovado |
| AUD-012 | P2 | T01/T02/RO/Forbidden | Criar ramificações de QA de credenciais inválidas, acesso Pessoa Idosa e bloqueio, sem criar seletor de papel de produto | Entradas e saídas demonstráveis; RO permanece no próprio grafo; negação não abre escrita |
| AUD-013 | P2 | N01–N04 | Conectar feedback transitório global a jornadas/fixtures com entrada, saída/timeout e destinos aprovados | N01→T04, N02→T05, N03→T05/T07 e N04→T05; sem central/sino |
| AUD-014 | P2 | T07/RO | Conectar “Ver correção” à versão vinculada em consulta, com retorno ao original/lista | Abre a versão certa sem oferecer escrita no contexto read-only |
| AUD-015 | P2 | T04 RO Semana | Alinhar viewport/clipping/ordem do header à T04 base | Scroll contido no viewport central; conteúdo não invade header/footer |
| AUD-016 | P2 | T03 default | Remover retrato opaco do content region; reaplicar surface semântica | Foto só em contexto/avatar aprovado; fundo consistente com estados irmãos |
| AUD-017 | P2 | T10 Sheet erro/anexo | Corrigir padding/Fill/Auto Layout das variantes para eliminar overflow horizontal | Campos, mensagens, anexo e textarea cabem inteiros no Sheet |
| AUD-018 | P2 | T12 acesso | Altura dinâmica de textos, ajuste de cards, viewport rolável e CTA acessível | Mensagens completas e Editar perfil alcançável nos estados convite/inativo/ativo |
| AUD-019 | P2 | Auth, T08, T09 | Mover hotspots para wrappers de no mínimo 48×48 px, não só labels | Oito alvos apontados pela auditoria têm área real de toque ≥48×48 |
| AUD-020 | P2 | Tipografia em 29 roots | Normalizar 108 textos estruturais de 12/13 px para ≥14 ou exceção explícita aprovada | Estilos de produto consistentes e reflow sem clipping, inclusive RO |
| AUD-021 | P2 | Contraste/fields | Corrigir tokens efetivos de texto e borda nas composições locais, não paleta genérica Obra | Texto normal ≥4,5:1 e contorno essencial ≥3:1 nas ocorrências apontadas |
| AUD-022 | P2 | T09/T11/RO | Trocar 11 LocalSubnav Saúde FRAME por INSTANCE do master `5810:1005` com Active e wiring contextuais | Instâncias canônicas, selecionado correto e navegação preservada |
| AUD-023 | P2 | T05/T09 | Normalizar tokens de badge/status e grid dos estados irmãos | Mesma semântica = mesmo token; margens consistentes, CTA sem extrapolar largura |
| AUD-024 | P2 | T10/RO | Mostrar autor e data/hora do registro de consulta/recomendação em card/detalhe autorizado | Metadados consultáveis sem confundir data da consulta com data do registro |
| AUD-025 | P2 | T06/T08/T10/T13 | Ajustar fixtures de sucesso para exibir entidade/registro/membro realmente incluído | Antes/depois coerentes, itens prévios preservados |
| AUD-026 | P2 | T08 erro | Ajustar nome preenchido vs “Campo obrigatório” para simulação coerente | A condição descrita no erro corresponde ao campo mostrado |
| AUD-027 | P3 | T17 Forbidden | Trocar mensagem “pode ser registrada” pela obrigatoriedade de trilha aprovada | Mensagem aderente à RNF01/RNF03/US-035, sem afirmar teste real de log |
| AUD-028 | P2 | T06/RO | Corrigir datas relativas Hoje/Ontem nas fixtures e replicar estados irmãos | 8 de setembro e 31 de agosto não aparecem como dias consecutivos |

Referência para links de cada tela: `docs/05_FIGMA/FIGMA_REGISTRY.yaml` no original e links diretos de nodes no relatório de auditoria.

## 2. Plano de execução por lotes pequenos

**LOTE 00 — Preparação (gate bloqueante).** Backup inteiro + cópia de trabalho + checkpoint, manifesto de fileKeys/links e evidência de que o original não foi alterado. Sem essas provas, parar. *Entrega:* registro do backup e identidade do arquivo de trabalho.

**LOTE 01 — Contratos, permissões e fixtures.** Resolver o roteiro de T01/T02/T13/T16, atores e mudanças de papéis; definir fixtures por entidade para T06/T07/T09/T14/T17. AUD-001, AUD-006–011, parte AUD-012. *Entrega:* matriz de cenários com ator, seleção, entidade, antes/depois e destinos esperados. NÃO reabrir decisões funcionais aprovadas.

**LOTE 02 — Reparar as operações já existentes.** Aplicar identidade da entidade às ações de T06/T07, T09, T14, T17; checkbox T13; switches T16; metadados e versão de correção. AUD-005–011, AUD-014, AUD-024. *Entrega:* cada ação abre/altera só o item acionado, com retorno; após mudanças conferir os estados irmãos tocados.

**LOTE 03 — Cobertura funcional ausente.** T04 E03–E07; T08/T05 E15/E16; T12 registration; caminhos de erro/RO e notificações N01–N04. AUD-002, AUD-003, AUD-004, AUD-012, AUD-013. Dividir em sublotes por domínio e evitar grandes edições de uma vez. *Entrega:* início→ação→estado/resultado→retorno para cada cenário exigido.

**LOTE 04 — Integridade de conteúdo/estados.** Reparar resultados de inclusão, cronologia, erros e dados de consulta; preservar `STATE = PAGE BASE + DELTA MÍNIMO`. AUD-024–026/028 e correções colaterais AUD-005. *Entrega:* fixtures/variações coerentes; não remover itens por acidente.

**LOTE 05 — Estrutura e componentes.** Corrigir viewport RO T04, T10, T12; padronizar LocalSubnav e tokens/grid T05/T09. AUD-015/017/018/022/023. *Entrega:* sem clipping, instâncias reaproveitadas, wiring nos estados afetados.

**LOTE 06 — Acessibilidade/polimento.** Fundo T03, targets, tipografia, contraste, texto Forbidden e revisão de reflow. AUD-016/019–021/027. *Entrega:* medidas e screenshots comparativos mostrando correções, sem redesign generalizado.

**LOTE 07 — Homologação integrada.** Executar **no Presentation**, não só inspecionar reactions: T01→Home comum e RO, destinos primários/Settings, cinco Sheets, E03–E07, E15/E16, tarefas, contato, correções versionadas, auditoria, permissões, N01–N04, Back, scroll e casos FI-001–FI-008. *Entrega:* checklist com prova por cenário; zero P0/P1 aberto; P2 residual apenas com aceite humano explícito. P3 decidido.

**LOTE 08 — Entrega e congelamento.** Consolidar PR documental, links do protótipo corrigido, registry de trabalho, relatório antes/depois e parecer de homologação. **Não substituir o Figma original ou o `FIGMA_REGISTRY.yaml` canônico automaticamente.** A promoção depende de decisão humana posterior.

## 3. Protocolo obrigatório para TODOS os prompts de execução

- Cada prompt deve referenciar um lote e seus AUD-IDs exatos; informar arquivo de trabalho `fileKey` obtido no LOTE 00. Nunca editar o arquivo original.
- Antes de escrever, ler documentos/Issues relevantes, localizar no arquivo de trabalho os novos node IDs e confirmar o escopo de telas/overlays tocados.
- Fazer uma edição funcional pequena, mantendo decisões, componentes, variáveis, estados, quatro destinos primários, Settings e Bottom Sheets.
- Verificar localmente apenas os riscos afetados (navegação, estado, shell, overflow, permissão). Evitar auditorias integrais repetitivas; fazer uma regressão integrada no LOTE 07.
- Documentar num PR: data, AUD-ID, estado anterior, nodes antes/depois (na cópia), alteração realizada, screenshots ou evidências, acceptance checks, limitações e checkpoint Figma.
- Atualizar os registries apropriados **sem trocar a referência do original** até homologação; caso schema não suporte variante experimental, criar registry separado de trabalho.
- Rodar `python scripts/validate_agent_context.py` para alterações de contexto/registries; não declarar o check aprovado sem executá-lo.
- Commits e PRs pequenos; nunca mergear sem revisão humana.
- Não executar SQL, alterar aplicação, implantar nada ou incorporar dados pessoais reais.

## 4. Gate final e matriz de responsabilidade

| Verificação | Exigência |
|---|---|
| Preservação | FileKey de origem intocado; backup congelado; trabalho em fileKey diferente |
| Rastreabilidade | 28 AUDs com estado Aberto/Em execução/Corrigido/Verificado/Aceito, evidência e link do nó de trabalho |
| Navegação | Cada fluxo obrigatório com entrada, resultado, saída/retorno; zero destination legado/inexistente ou semanticamente errado |
| Estados | Shell, navegação, dados e tokens preservados, salvo delta aprovado |
| Permissões | Cenários Principal, Apoio/Emergência, Profissional da Saúde e Pessoa Idosa, com permissões contextuais do GitHub |
| Qualidade visual | 48×48, 14px ou exceção, contrastes, clipping e reflow auditados |
| Runtime | Presentation executado efetivamente; quaisquer limitações classificadas Não verificável |
| Escopo | Sem novos T##, central de notificações, papel Plantonista, reabertura de tarefa ou autorização inventada |
| Homologação | Zero P0/P1 pendente; P2 com correção ou aceite explícito; PR/documentos revisados por humano |

**Observação de governança:** a auditoria comprova falhas de representação/prototipação, não prova falhas reais de autenticação, banco, logs ou LGPD. Não transferir automaticamente um defeito de Figma para o backend.

## 5. Modelo de registro por lote

```yaml
lote: LOTE-XX
status: planejado # planejado | em_execucao | corrigido | verificado | aceito | bloqueado
aud_ids: []
figma_original_file_key: tcyj2fkTXei2CJbqaRxqCp
figma_backup_file_key: PREENCHER_APOS_DUPLICACAO
figma_trabalho_file_key: PREENCHER_APOS_DUPLICACAO
checkpoint_figma: PREENCHER
git_branch: PREENCHER
git_commit: PREENCHER
git_pr: PREENCHER
nodes_de_trabalho: []
evidencias: []
validacoes_executadas: []
limitacoes: []
aprovacao_humana: pendente
```

**Próximo passo operacional:** executar somente o LOTE 00 no Work/Figma com duplicação nativa de arquivo; voltar com os URLs e fileKeys verificados. Correções começam no LOTE 01, somente na cópia.
