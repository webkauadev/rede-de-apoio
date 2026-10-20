# Matriz RF / RNF / US × Tabelas MySQL — Rede de Apoio

> Congelada em `4712047e4550e4504b213e638aaf8a17310f4935` (13/10/2026). **Rastreabilidade analítica construída a partir de fontes canônicas**, não nova decisão de produto nem substituição das Issues. **Tabelas relacionadas não significam que toda US esteja implementada.**

## A. Requisitos e US que os originam × persistência

| Requisito | Objetivo | US (origem única) | Tabelas concretas envolvidas |
|---|---|---|---|
| **[RF01](https://github.com/webkauadev/rede-de-apoio/issues/5)** | Conta por convite | [US-001](https://github.com/webkauadev/rede-de-apoio/issues/37) | `usuario`, `convite_cadastro_cuidador`, `cadastro_rate_limit`, `auditoria` |
| **[RF02](https://github.com/webkauadev/rede-de-apoio/issues/6)** | Login e sessão | [US-002](https://github.com/webkauadev/rede-de-apoio/issues/38) | `usuario`, `sessao_usuario`, `login_rate_limit`, `auditoria` |
| **[RF03](https://github.com/webkauadev/rede-de-apoio/issues/7)** | Perfil da pessoa idosa | [US-003](https://github.com/webkauadev/rede-de-apoio/issues/39) · [US-004](https://github.com/webkauadev/rede-de-apoio/issues/40) | `pessoa_idosa`, `usuario`, `rede_cuidado`, `auditoria` |
| **[RF04](https://github.com/webkauadev/rede-de-apoio/issues/8)** | Vínculo e desligamento | [US-005](https://github.com/webkauadev/rede-de-apoio/issues/41) · [US-006](https://github.com/webkauadev/rede-de-apoio/issues/42) | `rede_cuidado`, `membro_rede`, `atribuicao_papel_familiar`, `auditoria` |
| **[RF05](https://github.com/webkauadev/rede-de-apoio/issues/9)** | Papéis acumuláveis | [US-007](https://github.com/webkauadev/rede-de-apoio/issues/43) | `membro_rede`, `atribuicao_papel_familiar` |
| **[RF06](https://github.com/webkauadev/rede-de-apoio/issues/10)** | Plantões | [US-008](https://github.com/webkauadev/rede-de-apoio/issues/44) | `plantao`, `historico_plantao` |
| **[RF07](https://github.com/webkauadev/rede-de-apoio/issues/11)** | Calendário e detalhe do dia | [US-009](https://github.com/webkauadev/rede-de-apoio/issues/45) · [US-010](https://github.com/webkauadev/rede-de-apoio/issues/46) | `plantao`, `tarefa`, `ocorrencia_programada`, `compromisso`, `registro_cuidado`, `administracao_medicamento` |
| **[RF08](https://github.com/webkauadev/rede-de-apoio/issues/12)** | Designar responsável de plantão | [US-011](https://github.com/webkauadev/rede-de-apoio/issues/47) | `plantao`, `membro_rede` |
| **[RF09](https://github.com/webkauadev/rede-de-apoio/issues/13)** | Solicitação/resposta de troca | [US-012](https://github.com/webkauadev/rede-de-apoio/issues/48) · [US-013](https://github.com/webkauadev/rede-de-apoio/issues/49) | `solicitacao_troca_plantao`, `plantao`, `historico_plantao` |
| **[RF10](https://github.com/webkauadev/rede-de-apoio/issues/14)** | Avisos de plantão N01 | [US-014](https://github.com/webkauadev/rede-de-apoio/issues/50) | `plantao`, `historico_plantao`, `entrega_tecnica_notificacao` |
| **[RF11](https://github.com/webkauadev/rede-de-apoio/issues/15)** | Diário de cuidados | [US-015](https://github.com/webkauadev/rede-de-apoio/issues/51) | `registro_cuidado`, `usuario` |
| **[RF12](https://github.com/webkauadev/rede-de-apoio/issues/16)** | Histórico de cuidados | [US-016](https://github.com/webkauadev/rede-de-apoio/issues/52) | `registro_cuidado`, `correcao_registro_cuidado`, `consulta`, `administracao_medicamento` |
| **[RF13](https://github.com/webkauadev/rede-de-apoio/issues/17)** | Autoria/data/hora, transversal | Transversal, sem US de origem | `registro_cuidado`, `consulta`, `administracao_medicamento`, `conclusao_tarefa`, `auditoria` |
| **[RF14](https://github.com/webkauadev/rede-de-apoio/issues/18)** | Medicamentos | [US-017](https://github.com/webkauadev/rede-de-apoio/issues/53) | `medicamento` |
| **[RF15](https://github.com/webkauadev/rede-de-apoio/issues/19)** | Posologia/horários | [US-018](https://github.com/webkauadev/rede-de-apoio/issues/54) | `regime_medicamento`, `horario_regime`, `ocorrencia_programada` |
| **[RF16](https://github.com/webkauadev/rede-de-apoio/issues/20)** | Administração registrada | [US-019](https://github.com/webkauadev/rede-de-apoio/issues/55) | `administracao_medicamento`, `ocorrencia_programada` |
| **[RF17](https://github.com/webkauadev/rede-de-apoio/issues/21)** | Lembrete N02 | [US-020](https://github.com/webkauadev/rede-de-apoio/issues/56) | `ocorrencia_programada`, `plantao`, `membro_rede`, `entrega_tecnica_notificacao` |
| **[RF18](https://github.com/webkauadev/rede-de-apoio/issues/22)** | Sintomas/intercorrências | [US-021](https://github.com/webkauadev/rede-de-apoio/issues/57) | `registro_cuidado` |
| **[RF19](https://github.com/webkauadev/rede-de-apoio/issues/23)** | Consultas/recomendações | [US-022](https://github.com/webkauadev/rede-de-apoio/issues/58) | `consulta`, `recomendacao` |
| **[RF20](https://github.com/webkauadev/rede-de-apoio/issues/24)** | Compromissos | [US-023](https://github.com/webkauadev/rede-de-apoio/issues/59) | `compromisso` |
| **[RF21](https://github.com/webkauadev/rede-de-apoio/issues/25)** | Tarefas e conclusão | [US-024](https://github.com/webkauadev/rede-de-apoio/issues/60) · [US-025](https://github.com/webkauadev/rede-de-apoio/issues/61) | `tarefa`, `conclusao_tarefa`, `ocorrencia_programada` |
| **[RF22](https://github.com/webkauadev/rede-de-apoio/issues/26)** | Contatos importantes | [US-026](https://github.com/webkauadev/rede-de-apoio/issues/62) | `contato_importante` |
| **[RF23](https://github.com/webkauadev/rede-de-apoio/issues/27)** | Documentos/imagens | [US-027](https://github.com/webkauadev/rede-de-apoio/issues/63) | `anexo`, `registro_cuidado`, `consulta`, `administracao_medicamento` |
| **[RF24](https://github.com/webkauadev/rede-de-apoio/issues/28)** | Informações de emergência | [US-028](https://github.com/webkauadev/rede-de-apoio/issues/64) | `informacao_emergencia` |
| **[RF25](https://github.com/webkauadev/rede-de-apoio/issues/29)** | Notificação de cuidado registrado N03 | [US-029](https://github.com/webkauadev/rede-de-apoio/issues/65) | `entrega_tecnica_notificacao`, `preferencia_notificacao`, `registro_cuidado`, `administracao_medicamento`, `conclusao_tarefa` |
| **[RF26](https://github.com/webkauadev/rede-de-apoio/issues/30)** | Aviso após H+15 N04 | [US-030](https://github.com/webkauadev/rede-de-apoio/issues/66) | `ocorrencia_programada`, `entrega_tecnica_notificacao`, `preferencia_notificacao` |
| **[RF27](https://github.com/webkauadev/rede-de-apoio/issues/31)** | Preferências opcionais N03/N04 | [US-031](https://github.com/webkauadev/rede-de-apoio/issues/67) | `preferencia_notificacao` |
| **[RF28](https://github.com/webkauadev/rede-de-apoio/issues/32)** | Exportação autorizada CSV | [US-032](https://github.com/webkauadev/rede-de-apoio/issues/68) | `auditoria`, `registro_cuidado`, `correcao_registro_cuidado` |
| **[RF29](https://github.com/webkauadev/rede-de-apoio/issues/33)** | Consulta de auditoria | [US-033](https://github.com/webkauadev/rede-de-apoio/issues/69) | `auditoria` |
| **[RF30](https://github.com/webkauadev/rede-de-apoio/issues/34)** | Leitura própria do idoso | [US-036](https://github.com/webkauadev/rede-de-apoio/issues/72) | `usuario`, `pessoa_idosa`, `habilitacao_acesso_idoso`, `membro_rede`, `auditoria` |
| **[RNF01](https://github.com/webkauadev/rede-de-apoio/issues/35)** | Controle de acesso e negações | [US-035](https://github.com/webkauadev/rede-de-apoio/issues/71) | `usuario`, `membro_rede`, `atribuicao_papel_familiar`, `auditoria` |
| **[RNF02](https://github.com/webkauadev/rede-de-apoio/issues/82)** | Imutabilidade/correção | [US-034](https://github.com/webkauadev/rede-de-apoio/issues/70) | `registro_cuidado`, `correcao_registro_cuidado`, `consulta`, `correcao_consulta`, `administracao_medicamento`, `correcao_administracao_medicamento` |
| **[RNF03](https://github.com/webkauadev/rede-de-apoio/issues/36)** | Auditoria transversal | Transversal, sem US de origem | `auditoria`, `usuario`, `rede_cuidado` |

**Observações:** RF13 e RNF03 são transversais e **não** originam outra US. RNF02 é a origem única de US-034; RNF01 de US-035. RF30 origina US-036. `T03`–`T17` são superfícies de interface e não precisam de tabela própria.

## B. Inventário de todas as 34 tabelas com finalidade de negócio

### Identidade, acesso e rede — 10 tabelas

| Tabela física | Por que existe | Ligações canônicas | Distinção crítica |
|---|---|---|---|
| **`usuario`** | Identidade autenticável, email normalizado, categoria CUIDADOR/PESSOA_IDOSA, hash de senha. | RF01 RF02 RF30; RN-009; DB-016/025 | identidade não atribui papel |
| **`convite_cadastro_cuidador`** | Convite individual para criar conta CUIDADOR, de uso único e token em hash. | RF01; DEC-AUTH-001 | convite ≠ autorização de cuidado |
| **`cadastro_rate_limit`** | Contador técnico de tentativas no cadastro. | RF01; DEC-AUTH-001 | não é domínio clínico |
| **`sessao_usuario`** | Sessão temporária, hash de token, expiração e revogação. | RF02; DB-016 | cookie seguro no app |
| **`login_rate_limit`** | Contador técnico de tentativas de login. | RF02; DB-016 | bloqueio no servidor |
| **`pessoa_idosa`** | Perfil da pessoa cuidada, possível vínculo a conta própria. | RF03 RF30; RN-009; DB-001/017 | pode preceder rede |
| **`rede_cuidado`** | Unidade de contexto do cuidado; uma por pessoa na V1. | RF04; RN-001/004; DB-001/002 | estado operacional mínimo depende de transação |
| **`membro_rede`** | Participação/episódio de CUIDADOR na rede, categoria e vigência. | RF04; RN-003/004/010; DB-003/027 | não confundir pessoa com vínculo |
| **`atribuicao_papel_familiar`** | Concessão de papéis familiares por vínculo, com histórico e Principal único vigente. | RF05; RN-001/002; DB-004/026 | FK bloqueia papel de profissional |
| **`habilitacao_acesso_idoso`** | Convite de ativação da conta titular, separada da conta CUIDADOR. | RF30; RN-009; DB-017 | senha pelo próprio titular |

### Escala e atividades — 6 tabelas

| Tabela física | Por que existe | Ligações canônicas | Distinção crítica |
|---|---|---|---|
| **`plantao`** | Escala, intervalo, responsável, versão e situação. | RF06 RF08; RN-003; DB-005/006 | sobreposição permitida |
| **`solicitacao_troca_plantao`** | Pedido/resposta de mudança de responsável e versão esperada. | RF09; DB-006 | aceitar/refusar é serviço transacional |
| **`historico_plantao`** | Histórico de alterações efetivas dos plantões. | RF06 RF09; DB-022 | fato de negócio ≠ log técnico |
| **`tarefa`** | Tarefa de cuidado com responsável opcional e dados de programação. | RF21; DB-007 | não reabre na V1 |
| **`conclusao_tarefa`** | Fato imutável de conclusão, executor e ciclo único. | RF21; DB-007/032 | UNIQUE impede dupla conclusão |
| **`compromisso`** | Evento de agenda vinculado à rede, independente de consulta. | RF20; DB-009 | não é sempre consulta |

### Saúde e histórico — 12 tabelas

| Tabela física | Por que existe | Ligações canônicas | Distinção crítica |
|---|---|---|---|
| **`medicamento`** | Cadastro contextual de medicamento da pessoa idosa. | RF14; DB-010 | não é prescrição automatizada |
| **`regime_medicamento`** | Plano/posologia textual com versões e vigência. | RF15; DB-010 | vigência do regime |
| **`horario_regime`** | Recorrência e fuso IANA de horários de medicamento. | RF15; DB-015/033 | DST validado fora do DDL |
| **`ocorrencia_programada`** | Ocorrência prevista de tarefa OU regime, com responsável e geração. | RF15 RF17 RF21 RF26; DB-029/030 | planejamento ≠ realização |
| **`administracao_medicamento`** | Registro de fato realmente informado, com executor e horário real. | RF16; DB-011/021 | ausência não prova omissão |
| **`registro_cuidado`** | Diário, sintoma e intercorrência com autor e tempo. | RF11 RF18; RN-005; DB-008 | sem atraso para sintoma espontâneo |
| **`correcao_registro_cuidado`** | Nova versão de registro de cuidado, com justificativa. | RNF02; RN-006; DB-034/035 | preserva original |
| **`consulta`** | Consulta realizada com possível compromisso de origem. | RF19; DB-009 | independente de compromisso |
| **`recomendacao`** | Recomendação de saúde, opcionalmente ligada à consulta. | RF19; DB-009 | pode existir sem consulta |
| **`correcao_consulta`** | Correções tipadas do fato consulta. | RNF02; DB-034/035 | versão mantém FK de original |
| **`correcao_administracao_medicamento`** | Correções tipadas de administração. | RNF02; DB-034/035 | não muda regime de origem |
| **`anexo`** | Metadados do arquivo privado com FK para exatamente um fato original. | RF23; DB-013/037 | arquivo físico fica fora do SQL |

### Apoio e emergência — 2 tabelas

| Tabela física | Por que existe | Ligações canônicas | Distinção crítica |
|---|---|---|---|
| **`contato_importante`** | Contatos úteis de referência para a rede. | RF22 | contato não exige conta |
| **`informacao_emergencia`** | Ficha rápida de emergência única por rede/idoso. | RF24; DB-012/019 | edição Principal atual |

### Infraestrutura e governança — 4 tabelas

| Tabela física | Por que existe | Ligações canônicas | Distinção crítica |
|---|---|---|---|
| **`preferencia_notificacao`** | Configuração de eventos opcionais N03/N04 por usuário/rede. | RF27; N03/N04 | N01/N02 não são desligáveis |
| **`entrega_tecnica_notificacao`** | Outbox/deduplicação técnica N01–N04, não inbox. | RF10 RF17 RF25 RF26; DB-014/023 | sem central de notificações |
| **`idempotencia_comando`** | Chave/resultado técnico de comando para evitar replay. | DB-032 | não substitui transação |
| **`auditoria`** | Trilha auditável mínima para ações e negações. | RF29 RNF01 RNF03; RN-008; DB-024/038 | registro da negação em transação separada |

## C. Exemplos das verificações mais defensáveis em banca

| Cenário | Estruturas examinadas | Resultado que o DDL permite afirmar | O que exige backend |
|---|---|---|---|
| Tentar duas redes para mesma pessoa idosa | `rede_cuidado`, `uq_rede_idoso_v1` | A segunda associação viola unicidade. | Autorização da criação. |
| Tentar dois Principais ativos | `atribuicao_papel_familiar`, `uq_papel_principal_rede` | A duplicidade é restringida. | Assegurar existência mínima e transferência atômica. |
| Tentar atribuir papel Familiar a Profissional | `membro_rede`, `atribuicao_papel_familiar` | FK categoria/atribuição impede referência incompatível. | Identidade/contexto atual do autor. |
| Reenviar conclusão da mesma tarefa | `conclusao_tarefa`, `uq_conclusao_ciclo`, `idempotencia_comando` | Segundo fato no mesmo ciclo não pode coexistir. | Determinar se replay retorna mesmo resultado ou 409. |
| Informar administração duas vezes para a mesma ocorrência | `administracao_medicamento`, `uq_administracao_ocorrencia_v1` | Duas linhas referindo mesma ocorrência não coexistem (V1). | Uso clínico e validação de horário real. |
| Corrigir diário apagando original | `registro_cuidado`, `correcao_registro_cuidado` | Relação FK/UNIQUE e campos para versões existem. | Bloquear UPDATE/DELETE no original; autorizar correção. |
| Anexar arquivo a múltiplos fatos ao mesmo tempo | `anexo`, `ck_anexo_pai` | CHECK exige exatamente um destino de FK. | Validação do arquivo, storage e controle de leitura. |
| Repetir entrega do mesmo evento/destinatário | `entrega_tecnica_notificacao`, `uq_entrega_evento_destinatario` | Duplicidade lógica da entrega é restringida. | Disparo/entrega/superfície de aviso. |
| Acesso idoso tentar gravar | `usuario`, `pessoa_idosa`, `membro_rede`, `auditoria` | Estrutura separa conta idosa da participação de cuidador. | API bloqueia gravação e registra negação. |

## D. Regras de interpretação e fontes

1. **Não existe uma correspondência 1:1 entre RN e tabela.** RN atravessam várias tabelas, e algumas (autorização, H+15, DST) dependem da aplicação.
2. **Não confundir restrição estrutural com garantia operacional.** PK/FK/CHECK/UNIQUE não executam sozinhas transações de bootstrap, nem protegem conteúdo contra clientes SQL privilegiados.
3. **`auditoria` é transversal**: aparecer em matriz não significa implementar auditoria completa em toda rota.
4. **Duas linhas de regra diferentes podem usar a mesma tabela** — isso é normalização do modelo, não redundância.
5. **Nenhuma regra adicional está sendo criada neste documento.** Cada vínculo aqui é justificativa de persistência e deverá ser confrontado com testes do respectivo serviço/US.

### Fontes fixadas

- [Índice RF/RNF](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml)
- [Índice US](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml)
- [Aceites aprovados](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml)
- [RN-001–RN-011](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/docs/02_BUSINESS_RULES/BUSINESS_RULES.md)
- [Matriz de permissões](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/docs/02_BUSINESS_RULES/PERMISSIONS_MATRIX.md)
- [N01–N04](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/docs/02_BUSINESS_RULES/NOTIFICATIONS_RULES.md)
- [DB-001–DB-038](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md)
- [DEC-AUTH-001](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/docs/10_IMPLEMENTACAO/DEC_AUTH_001_CONVITES_CUIDADORES.md)
- [SQL consolidado](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/entrega/sql-eer/01_schema_completo_v1.sql)
- [Manifesto de FKs/CHECK/UNIQUE](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/entrega/sql-eer/02_manifest_estrutura.json)
- [Evidência SQL/EER](https://github.com/webkauadev/rede-de-apoio/blob/4712047e4550e4504b213e638aaf8a17310f4935/entrega/sql-eer/RELATORIO_FINAL.md)