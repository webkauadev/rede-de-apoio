# Caderno de verificação — evidências e cobertura

Data: 2026-10-16. Leitura independente do estado atual do Figma e do commit-base `88302e793d7a29cd60cad60483c6aaca357113e1`. Os catálogos abaixo são contratos confrontados com os nós e capturas, não aprovação por transcrição. Resultado de cada exceção vem do diagnóstico e da fonte funcional/física.

## 1. Casos de uso: elementos e cada conexão

Todos os atores e objetivos das tabelas abaixo estão presentes nos frames atuais com nomes correspondentes. Os atores representam papéis externos; nenhum ator foi criado para banco, serviço de notificação ou regra automática. As três fronteiras são únicas. Não há include/extend/generalização sem fundamento. Notas automáticas não foram contadas como objetivos.

### UC-01

Fonte: [docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md). Evidência: [UC-01 — 6250:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6250-3484); [captura](evidencias/6250-3484.png); [nós](evidencias/6250-3484.json).


#### Atores

| ID | Ator | Participação / casos | Evidência |
|---|---|---|---|
| A-01 | Pessoa Elegível ao Cadastro | Cadastrar a própria conta quando elegível; ainda não é uma conta autenticada. | US-001. |
| A-02 | Usuário Cadastrado | Autenticar-se. | US-002. |
| A-03 | Familiar Principal | Perfil, membros, papéis, contatos e emergência. | US-003–007, 026; RN-001/RN-002. |
| A-04 | Usuário Autorizado | Manter contato importante ou consultar emergência, conforme permissão/contexto. | US-026/US-028. |
| A-06 | Pessoa Idosa | Consultar o próprio cuidado, somente leitura. | US-036/RN-009. |

Não desenhar generalização: nenhuma fonte prova que qualquer ator especializado herda **todos** os casos de um ator geral. A-01/A-02 são rótulos de papel da US, não hierarquia.

#### Casos de uso

| ID | Nome / ator | Objetivo, pré/pós-condição e regras | RF/US/CA |
|---|---|---|---|
| U-01 | Cadastrar conta — A-01 | Criar conta para uso posterior; não concede papel/permissão por si. | RF01/US-001; CA #5673832998. |
| U-02 | Autenticar-se — A-02, A-06 | Validar identidade; acesso posterior continua limitado a categoria, vínculo, papel e contexto. | RF02/US-002 CA #5673834103; US-036 CA #5673868957. |
| U-03 | Cadastrar perfil da Pessoa Idosa — A-03 | Criar perfil/contexto; bootstrap segue decisão V1 B3, sem criar Principal antes da constituição válida. | RF03/US-003 CA #5673834995; RN-001/RN-004. |
| U-04 | Atualizar perfil da Pessoa Idosa — A-03 | Manter dados atuais autorizados. | RF03/US-004 CA #5673835827. |
| U-05 | Vincular membro à rede — A-03 | Criar vínculo sem violar Principal único ou misturar categoria Profissional e papéis familiares. | RF04/US-005 CA #5673836678. |
| U-06 | Desvincular membro da rede — A-03 | Revogar acesso futuro preservando histórico. | RF04/US-006 CA #5673837538. |
| U-07 | Gerenciar papéis familiares — A-03 | Atribuir/revogar papéis acumuláveis; preservar restrições e Principal único. | RF05/US-007 CA #5673838448. |
| U-08 | Transferir Familiar Principal — A-03 | Transferir a responsabilidade de Principal de forma atômica, mantendo exatamente um Principal ativo. É objetivo próprio de gestão, sem ponto de extensão documentado em U-07. | US-007, RN-001. |
| U-09 | Manter contato importante — A-04 | Consultar e incluir/alterar contato segundo contexto autorizado. | RF22/US-026 CA #5673857040. |
| U-10 | Consultar informações de emergência — A-04, A-06 | Consultar informação autorizada; não amplia edição/administração. | RF24/US-028 CA #5673860524; US-036. |
| U-11 | Consultar o próprio cuidado — A-06 | Consultar somente recursos autorizados do próprio perfil, sem escrita, administração ou CSV. | RF30/US-036 CA #5673868957. |

#### Catálogo de conexões e símbolos

| ID | Origem → destino | Tipo / símbolo / direção | Rótulo e significado | Evidência |
|---|---|---|---|---|
| UC01-C01 | A-01 → U-01 | Associação; linha contínua, sem ponta, sem multiplicidade. | Participa de cadastrar conta. | Slide 8; US-001. |
| UC01-C02 | A-02 → U-02 | Associação contínua sem ponta. | Participa de autenticar-se. | Slide 8; US-002. |
| UC01-C03 | A-06 → U-02 | Associação contínua sem ponta. | Pessoa Idosa usa autenticação comum. | Slide 8; US-036. |
| UC01-C04 | A-03 → U-03 | Associação contínua sem ponta. | Cadastra perfil. | Slide 8; US-003. |
| UC01-C05 | A-03 → U-04 | Associação contínua sem ponta. | Atualiza perfil. | Slide 8; US-004. |
| UC01-C06 | A-03 → U-05 | Associação contínua sem ponta. | Vincula membro. | Slide 8; US-005. |
| UC01-C07 | A-03 → U-06 | Associação contínua sem ponta. | Desvincula membro. | Slide 8; US-006. |
| UC01-C08 | A-03 → U-07 | Associação contínua sem ponta. | Gerencia papéis. | Slide 8; US-007. |
| UC01-C09 | A-04 → U-09 | Associação contínua sem ponta. | Mantém contato. | Slide 8; US-026. |
| UC01-C10 | A-04 → U-10 | Associação contínua sem ponta. | Consulta emergência no contexto autorizado. | Slide 8; US-028. |
| UC01-C11 | A-06 → U-10 | Associação contínua sem ponta. | Consulta emergência em modo permitido. | Slide 8; US-036. |
| UC01-C12 | A-06 → U-11 | Associação contínua sem ponta. | Consulta o próprio cuidado. | Slide 8; US-036. |
| UC01-C13 | A-03 → U-08 | Associação contínua, sem ponta, sem multiplicidade. | Familiar Principal transfere essa responsabilidade conforme a regra de Principal único. | Slide 8; US-007/RN-001. |

Não há `include` ou `extend`: autenticação, auditoria e validação são precondições/obrigações transversais, e US-007 não documenta ponto de extensão que justifique relacionar U-08 a U-07. Não há composição, multiplicidade ou setas de herança neste tipo de diagrama.


**Confronto individual das associações:**

| ID | Destino/ator | Resultado semântico | Apresentação |
|---|---|---|---|
| UC01-C01 | A-01 → U-01 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C02 | A-02 → U-02 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C03 | A-06 → U-02 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C04 | A-03 → U-03 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C05 | A-03 → U-04 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C06 | A-03 → U-05 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C07 | A-03 → U-06 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C08 | A-03 → U-07 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C09 | A-04 → U-09 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C10 | A-04 → U-10 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C11 | A-06 → U-10 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C12 | A-06 → U-11 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC01-C13 | A-03 → U-08 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |

Nomes/objetivos e permissões: PASS no recorte aprovado. Transferir Principal é objetivo próprio associado a Familiar Principal; não há extend. Pessoa Idosa somente consulta e autentica.

### UC-02

Fonte: [docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md). Evidência: [UC-02 — 6262:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6262-3484); [captura](evidencias/6262-3484.png); [nós](evidencias/6262-3484.json).


#### Atores e casos

| Ator | Casos associados | Condição / fonte |
|---|---|---|
| Usuário Autorizado | Gerenciar plantões; consultar calendário/dia; atribuir responsável; registrar compromisso; criar/atribuir tarefa. | US-008–011, 023–024. |
| Usuário Vinculado | Solicitar troca de plantão. | US-012. |
| Usuário Envolvido | Responder troca de plantão. | US-013. |
| Usuário Responsável | Concluir tarefa. | US-025. |

| ID | Caso de uso | Objetivo e regras | RF/US/CA |
|---|---|---|---|
| U-12 | Gerenciar plantões | Criar, alterar ou cancelar plantão; escala reflete operação. | RF06/US-008 CA #5673839281. |
| U-13 | Consultar escala de cuidados | Ver responsáveis por período autorizado. | RF07/US-009 CA #5673840437. |
| U-14 | Consultar detalhamento do dia | Ver plantões, cuidados planejados e execuções autorizadas. | RF07/US-010 CA #5673841344. |
| U-15 | Atribuir responsável ao plantão | Associar responsável ao intervalo; condição Plantonista Atual existe só enquanto ativo. | RF08/US-011 CA #5673842203; RN-003. |
| U-16 | Solicitar troca de plantão | Solicitar reorganização de responsabilidade vinculada ao plantão. | RF09/US-012 CA #5673843194. |
| U-17 | Responder troca de plantão | Aceitar ou recusar solicitação; só aceite aplica troca. | RF09/US-013 CA #5673844056. |
| U-19 | Registrar compromisso | Registrar compromisso planejado do cuidado. | RF20/US-023 CA #5673853886. |
| U-20 | Criar e atribuir tarefa | Criar tarefa e atribuir responsável elegível. | RF21/US-024 CA #5673855243. |
| U-21 | Concluir tarefa | Responsável registra conclusão. | RF21/US-025 CA #5673856095. |
| NT-01 | Nota de sistema: N01 — mudança de plantão | Evento automático após atribuição, alteração, cancelamento ou troca, conforme destinatários obrigatórios; não é objetivo selecionado pelo destinatário. | RF10/US-014 CA #5673845199. |

#### Catálogo de conexões e símbolos

| ID | Origem → destino | Tipo/símbolo/direção | Significado e fonte |
|---|---|---|---|
| UC02-C01 | Usuário Autorizado → U-12 | Associação contínua, sem ponta. | Gerencia plantões; slide 8/US-008. |
| UC02-C02 | Usuário Autorizado → U-13 | Associação contínua, sem ponta. | Consulta escala; slide 8/US-009. |
| UC02-C03 | Usuário Autorizado → U-14 | Associação contínua, sem ponta. | Consulta dia; slide 8/US-010. |
| UC02-C04 | Usuário Autorizado → U-15 | Associação contínua, sem ponta. | Atribui responsável; slide 8/US-011. |
| UC02-C05 | Usuário Vinculado → U-16 | Associação contínua, sem ponta. | Solicita troca; slide 8/US-012. |
| UC02-C06 | Usuário Envolvido → U-17 | Associação contínua, sem ponta. | Responde troca; slide 8/US-013. |
| UC02-C09 | Usuário Autorizado → U-19 | Associação contínua, sem ponta. | Registra compromisso; slide 8/US-023. |
| UC02-C10 | Usuário Autorizado → U-20 | Associação contínua, sem ponta. | Cria/atribui tarefa; slide 8/US-024. |
| UC02-C11 | Usuário Responsável → U-21 | Associação contínua, sem ponta. | Conclui tarefa; slide 8/US-025. |

Não há `include`/`extend`: N01 é consequência de eventos e não subobjetivo escolhido pelo ator; responder troca pressupõe solicitação existente, mas não é extensão UML de U-16. NT-01 é nota UML com linha de anotação tracejada e sem ponta quando a proximidade não bastar. Não desenhar o Serviço de Notificação como ator de negócio.


**Confronto individual das associações:**

| ID | Destino/ator | Resultado semântico | Apresentação |
|---|---|---|---|
| UC02-C01 | Usuário Autorizado → U-12 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC02-C02 | Usuário Autorizado → U-13 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC02-C03 | Usuário Autorizado → U-14 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC02-C04 | Usuário Autorizado → U-15 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC02-C05 | Usuário Vinculado → U-16 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC02-C06 | Usuário Envolvido → U-17 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC02-C09 | Usuário Autorizado → U-19 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC02-C10 | Usuário Autorizado → U-20 | PASS: emissor e destino final correspondem | FAIL: passagem por elemento alheio; AUD-M2-008 |
| UC02-C11 | Usuário Responsável → U-21 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |

Nomes/objetivos e permissões: PASS no recorte aprovado. N01 é nota, não novo ator/objetivo. Solicitante, envolvido e responsável têm associações diferentes.

### UC-03

Fonte: [docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md). Evidência: [UC-03 — 6270:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6270-3484); [captura](evidencias/6270-3484.png); [nós](evidencias/6270-3484.json).


#### Casos e atores

| ID | Caso / ator principal | Objetivo e regra essencial | RF/US |
|---|---|---|---|
| U-22 | Registrar ocorrência no diário — Usuário com Permissão Efetiva | Registrar autoria/data-hora; original imutável. | RF11/US-015. |
| U-23 | Consultar histórico de cuidados — Usuário Autorizado/Pessoa Idosa | Consultar registros autorizados sem alterá-los. | RF12/US-016, US-036. |
| U-24 | Cadastrar medicamento — Usuário com Permissão Efetiva | Incluir medicamento no cuidado autorizado. | RF14/US-017. |
| U-25 | Registrar posologia e horários — Usuário com Permissão Efetiva | Associar posologia/horários a medicamento. | RF15/US-018. |
| U-26 | Registrar administração de medicamento — Usuário com Permissão Efetiva | Registrar fato realizado com autoria/data-hora e imutabilidade. | RF16/US-019. |
| U-28 | Registrar sintoma ou intercorrência — Usuário com Permissão Efetiva | Registrar fato espontâneo sem classificá-lo como atraso. | RF18/US-021. |
| U-29 | Registrar consulta ou recomendação — Usuário com Permissão Efetiva | Registrar informação de saúde preservada. | RF19/US-022. |
| U-30 | Anexar documento ou imagem — Usuário com Permissão Efetiva | Anexar a registro compatível com mesma autorização. | RF23/US-027. |
| U-33 | Configurar notificações opcionais — Usuário Autorizado | Não desliga eventos obrigatórios. | RF27/US-031. |
| U-34 | Exportar histórico em CSV — Familiar Principal | Exportar contexto autorizado, com auditoria. | RF28/US-032. |
| U-35 | Consultar auditoria — Familiar Principal Autorizado | Consultar trilha no escopo permitido. | RF29/US-033. |
| U-36 | Corrigir registro — Usuário com Permissão Efetiva | Criar nova versão vinculada, nunca sobrescrever. | RNF02/US-034. |
| NT-01 | Nota de sistema: N02 — lembrete programado | Evento automático no horário previsto ao responsável designado/elegível; não é objetivo escolhido pelo destinatário nem caso de uso. | RF17/US-020. |
| NT-02 | Nota de sistema: N03 — cuidado realizado | Evento automático após registro de cuidado realizado; Principal recebe obrigatoriamente e demais destinatários elegíveis seguem preferência. Não é caso de uso do destinatário. | RF25/US-029. |
| NT-03 | Nota de sistema: N04 — atraso | Evento automático após H+15 sem execução registrada confirmada; não prova omissão clínica. Não é caso de uso do destinatário. | RF26/US-030. |
| NT-04 | Nota de restrição: bloquear e registrar acesso não autorizado | Antes de expor qualquer recurso protegido, bloquear contexto negado e auditar a negação. É obrigação interna transversal, não ator nem caso de uso. | RNF01/US-035. |

NT-01–NT-04 devem ser desenhadas como notas UML, nunca como elipses ou atores. NT-01 fica perto de U-25; NT-02 perto de U-26; NT-03 perto do grupo de programação; NT-04 como nota transversal junto à fronteira do sistema, listando U-22–U-36 como recursos protegidos. Pessoa Idosa só associa U-23 em leitura; não associar U-22/U-24…U-36.

#### Catálogo de conexões e símbolos

| ID | Origem → destino | Tipo/símbolo/direção | Significado / evidência |
|---|---|---|---|
| UC03-C01 | Usuário com Permissão Efetiva → U-22 | Associação contínua; diário. | Slide 8/US-015. |
| UC03-C02 | Usuário Autorizado → U-23 | Associação contínua; histórico. | Slide 8/US-016. |
| UC03-C03 | Pessoa Idosa → U-23 | Associação contínua; leitura própria. | Slide 8/US-036. |
| UC03-C04 | Usuário com Permissão Efetiva → U-24 | Associação contínua; medicamento. | Slide 8/US-017. |
| UC03-C05 | Usuário com Permissão Efetiva → U-25 | Associação contínua; posologia/horários. | Slide 8/US-018. |
| UC03-C06 | Usuário com Permissão Efetiva → U-26 | Associação contínua; administração. | Slide 8/US-019. |
| UC03-C08 | Usuário com Permissão Efetiva → U-28 | Associação contínua; sintoma/intercorrência. | Slide 8/US-021. |
| UC03-C09 | Usuário com Permissão Efetiva → U-29 | Associação contínua; consulta/recomendação. | Slide 8/US-022. |
| UC03-C10 | Usuário com Permissão Efetiva → U-30 | Associação contínua; anexo. | Slide 8/US-027. |
| UC03-C15 | Usuário Autorizado → U-33 | Associação contínua; preferências. | Slide 8/US-031. |
| UC03-C16 | Familiar Principal → U-34 | Associação contínua; CSV. | Slide 8/US-032. |
| UC03-C17 | Familiar Principal Autorizado → U-35 | Associação contínua; auditoria. | Slide 8/US-033. |
| UC03-C18 | Usuário com Permissão Efetiva → U-36 | Associação contínua; correção. | Slide 8/US-034. |

Não usar `include` para auditoria, validação de permissão ou notificação: são regras de consequência/segurança, não objetivos reutilizáveis de ator. Não usar `extend` para anexo/correção sem prova de que se inserem em ponto de extensão de outro objetivo. NT-01–NT-04 são notas com linha de anotação tracejada e sem ponta quando a proximidade não bastar; a linha não é associação, `include` ou `extend`.


**Confronto individual das associações:**

| ID | Destino/ator | Resultado semântico | Apresentação |
|---|---|---|---|
| UC03-C01 | Usuário com Permissão Efetiva → U-22 | PASS: emissor e destino final correspondem | FAIL: passagem por elemento alheio; AUD-M2-008 |
| UC03-C02 | Usuário Autorizado → U-23 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC03-C03 | Pessoa Idosa → U-23 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC03-C04 | Usuário com Permissão Efetiva → U-24 | PASS: emissor e destino final correspondem | FAIL: passagem por elemento alheio; AUD-M2-008 |
| UC03-C05 | Usuário com Permissão Efetiva → U-25 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC03-C06 | Usuário com Permissão Efetiva → U-26 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC03-C08 | Usuário com Permissão Efetiva → U-28 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC03-C09 | Usuário com Permissão Efetiva → U-29 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC03-C10 | Usuário com Permissão Efetiva → U-30 | PASS: emissor e destino final correspondem | FAIL: passagem por elemento alheio; AUD-M2-008 |
| UC03-C15 | Usuário Autorizado → U-33 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC03-C16 | Familiar Principal → U-34 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC03-C17 | Familiar Principal Autorizado → U-35 | PASS: emissor e destino final correspondem | PASS: destino ancorado e identificável |
| UC03-C18 | Usuário com Permissão Efetiva → U-36 | PASS: emissor e destino final correspondem | FAIL: passagem por elemento alheio; AUD-M2-008 |

Nomes/objetivos e permissões: PASS no recorte aprovado. Registrar e consultar são objetivos distintos. Correção exige permissão efetiva; CSV e auditoria ficam com Principal; Pessoa Idosa só consulta histórico. N02/N03/N04 e bloqueio são notas internas.

## 2. Classes: catálogo e 24 associações

7 + 9 + 8 relações desenhadas. Todas são associações contínuas, sem seta de navegabilidade ou losango; o contrato não determina direção de navegação. Nenhuma composição foi presumida da existência de FK. Nomes, atributos, tipos conceituais, sinais de visibilidade, operações e retornos foram confrontados com os três contratos. Os tipos enumerados são referências textuais, não classes omitidas. Assinaturas sem parâmetros/retornos completos têm limite explicitado em AUD-M2-010.

### CL-01

[CL-01 — 6255:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484); [captura](evidencias/6255-3484.png); [nós](evidencias/6255-3484.json). Fonte: [docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md).

#### Catálogo de classes

| ID / classe | Responsabilidade e atributos exibidos | Operações exibidas | Evidência |
|---|---|---|---|
| C-A01 `Usuario` | Identidade de acesso. `- nome: String`; `- email: String`; `- tipoAcesso: TipoAcesso`; `- ativo: Boolean`. | `+ autenticar(): ResultadoAutenticacao` [INFERENCIA de RF02]. | RF01/RF02/RF30; `usuario`. |
| C-A02 `PessoaIdosa` | Perfil atendido. `- nome: String`; `- dataNascimento: Date [0..1]`; `- ativo: Boolean`. | `+ atualizarPerfil(): ResultadoAtualizacao` [INFERENCIA de RF03]. | RF03/RF30; `pessoa_idosa`. |
| C-A03 `RedeCuidado` | Contexto operacional de cuidado. `- nome: String`; `- situacao: SituacaoRede`; `- versao: Integer`. | `+ vincularMembro()`; `+ desvincularMembro()`. | RF03/RF04; V1 DB-001/002; `rede_cuidado`. |
| C-A04 `MembroRede` | Vínculo histórico de cuidador à rede. `- categoria: CategoriaMembro`; `- vinculadoEm: DateTime`; `- desvinculadoEm: DateTime [0..1]`. | `+ estaVigente(): Boolean` [INFERENCIA de vigência]. | RF04/RN-004; `membro_rede`. |
| C-A05 `AtribuicaoPapelFamiliar` | Concessão temporal de papel familiar. `- papel: PapelFamiliar`; `- concedidoEm: DateTime`; `- revogadoEm: DateTime [0..1]`. | `+ revogar()`; `+ estaVigente(): Boolean`. | RF05/RN-001/RN-002; `atribuicao_papel_familiar`. |
| C-A06 `ContatoImportante` | Contato contextual ao cuidado. `- nome: String`; `- tipo: String`; `- telefone: String [0..1]`. | `+ atualizarDados()` [INFERENCIA de US-026]. | RF22/US-026; `contato_importante`. |
| C-A07 `InformacaoEmergencia` | Ficha vigente de emergência. `- informacao: String`; `- atualizadaEm: DateTime`. | `+ atualizar()` [INFERENCIA limitada à V1]. | RF24; V1 DB-012/019; `informacao_emergencia`. |

`TipoAcesso`, `CategoriaMembro`, `PapelFamiliar` e `SituacaoRede` são tipos enumerados exibidos como texto, não caixas separadas. Não desenhar herança `Usuario→PessoaIdosa` ou `Usuario→MembroRede`: são papéis/contextos diferentes, sem especialização comprovada.


**Confronto das classes:** 7 presentes. Atributos/operações reproduzem o contrato; responsabilidade de Usuario e opcionalidade de telefone falham na comparação cruzada (005/007). R05 e quebras de texto: 008.

| Relação | Contrato: extremidades, símbolos e leitura nos dois sentidos | Figma encontrado / resultado |
|---|---|---|
| CL01-R01 | `Usuario` — `PessoaIdosa` — Associação contínua, sem ponta. — perto de Usuario `0..1`; perto de PessoaIdosa `0..1`. Uma Pessoa Idosa pode ter conta; uma conta Pessoa Idosa vincula-se a no máximo um perfil. — `titular da conta`; RF30, `uq_pessoa_titular`. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL01-R02 | `PessoaIdosa` — `RedeCuidado` — Associação contínua, sem losango. `PessoaIdosa` **[1] — [0..1]** `RedeCuidado`. — Leitura PessoaIdosa→RedeCuidado: uma Pessoa Idosa pode ainda não ter rede ou ter uma rede V1. Leitura RedeCuidado→PessoaIdosa: cada RedeCuidado pertence a exatamente uma Pessoa Idosa. — `contexto de cuidado`; V1 DB-001/002 e FK `fk_rede_pessoa`; slides 18/24. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL01-R03 | `RedeCuidado` — `MembroRede` — Associação contínua. — perto de Rede `1`; perto de Membro `1..*` quando operacional. Cada membro pertence a uma rede; rede operacional exige Principal e Profissional, não só a multiplicidade visual. — `possui vínculo`; RF04/RN-004/V1 DB-002. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL01-R04 | `Usuario` — `MembroRede` — Associação contínua. — perto de Usuario `1`; perto de Membro `0..*`. Cada episódio pertence a um usuário; um usuário pode ter episódios. — `participa por`; `membro_rede`. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL01-R05 | `MembroRede` — `AtribuicaoPapelFamiliar` — Associação contínua; sem composição. — perto de Membro `1`; perto de Atribuição `0..*`. Cada atribuição é de um membro familiar; membro pode acumular papéis. — `recebe`; RF05/RN-002. | Valores do contrato presentes; leitura exige ajuste geométrico — 008. Não diagnosticada inversão adicional. |
| CL01-R06 | `RedeCuidado` — `ContatoImportante` — Associação contínua. — perto de Rede `1`; perto de Contato `0..*`. — `mantém`; RF22. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL01-R07 | `RedeCuidado` — `InformacaoEmergencia` — Associação contínua. — perto de Rede `1`; perto de Informação `0..1` vigente. — `possui ficha vigente`; V1 DB-012. | PASS: valores nas extremidades correspondem; leitura preservada. |

### CL-02

[CL-02 — 6263:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484); [captura](evidencias/6263-3484.png); [nós](evidencias/6263-3484.json). Fonte: [docs/uml/especificacao-para-figma/dominio-B-organizacao/CL-02.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-B-organizacao/CL-02.md).

#### Catálogo de classes

| ID / classe | Responsabilidade; atributos exibidos | Operações exibidas | Fonte |
|---|---|---|---|
| C-B01 `Plantao` | Intervalo de responsabilidade. `- inicioEm: DateTime`; `- fimEm: DateTime`; `- situacao: SituacaoPlantao`; `- versao: Integer`. | `+ obterContextoDeTroca(): ContextoTroca` [INFERENCIA]; `+ atribuirResponsavel(membro: MembroRede)`; `+ alterar()`; `+ cancelar()`. | RF06/RF08; `plantao`. |
| C-B02 `SolicitacaoTrocaPlantao` | Pedido de reorganização de um plantão. `- status: StatusTroca`; `- solicitadaEm: DateTime`; `- respondidaEm: DateTime [0..1]`; `- versaoPlantaoEsperada: Integer`. | `+ aceitar()`; `+ recusar()`. | RF09; V1 DB-006; `solicitacao_troca_plantao`. |
| C-B03 `Tarefa` | Trabalho de cuidado. `- titulo: String`; `- descricao: String [0..1]`; `- previstoEm: DateTime [0..1]`; `- prazoEm: DateTime [0..1]`; `- status: StatusTarefa`. | `+ atribuirResponsavel()`; `+ concluir()`. | RF21/US-024/025; `tarefa`. |
| C-B04 `ConclusaoTarefa` | Fato de conclusão da tarefa. `- concluidaEm: DateTime`; `- observacao: String [0..1]`. | Sem operação de domínio exibida. | US-025; V1 DB-007/032; `conclusao_tarefa`. |
| C-B05 `Compromisso` | Evento planejado do cuidado. `- titulo: String`; `- detalhes: String [0..1]`; `- local: String [0..1]`; `- inicioEm: DateTime`; `- fimEm: DateTime [0..1]`. | `+ registrar()` [INFERENCIA de RF20]. | RF20/US-023; `compromisso`. |
| C-B06 `MembroRede` | Referência compartilhada de CL-01: responsável, solicitante/destinatário ou executor. | `+ estaVigente(): Boolean`. | CL-01/RN-003. |


**Confronto das classes:** 6 presentes. Plantao.obterContextoDeTroca e atribuirResponsavel correspondem a SQ02-M03/M10; aceitar/recusar pertencem à solicitação. Não há entidade PlantonistaAtual. Inversão de três papéis: 001.

| Relação | Contrato: extremidades, símbolos e leitura nos dois sentidos | Figma encontrado / resultado |
|---|---|---|
| CL02-R01 | `MembroRede` — `Plantao` — Associação contínua, sem ponta. `MembroRede` **[1] — [0..*]** `Plantao`. — Leitura Membro→Plantão: um membro pode ser responsável por zero ou vários plantões. Leitura Plantão→Membro: cada plantão tem exatamente um responsável. — `responsável`; RF08/V1 DB-005; slides 18/24. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL02-R02 | `Plantao` — `SolicitacaoTrocaPlantao` — Associação contínua, sem ponta. `Plantao` **[1] — [0..*]** `SolicitacaoTrocaPlantao`. — Leitura Plantão→Solicitação: um plantão pode ter zero ou várias solicitações. Leitura Solicitação→Plantão: cada solicitação refere-se a exatamente um plantão. — `é objeto de`; RF09/US-012; slides 18/24. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL02-R03a | `SolicitacaoTrocaPlantao` — `MembroRede` — Associação contínua, sem ponta; papel `solicitante` junto a `MembroRede`. `SolicitacaoTrocaPlantao` **[0..*] — [1]** `MembroRede`. — Leitura Solicitação→Membro: cada solicitação tem exatamente um solicitante. Leitura Membro→Solicitação: um membro pode solicitar zero ou várias trocas. — `solicitante`; FK `solicitante_membro_id`; US-012; slides 18/24. | FAIL: 0..* junto a Membro, 1/1/0..1 junto a Solicitação; leitura invertida — 001. |
| CL02-R03b | `SolicitacaoTrocaPlantao` — `MembroRede` — Associação contínua, sem ponta; papel `destinatário` junto a `MembroRede`. `SolicitacaoTrocaPlantao` **[0..*] — [1]** `MembroRede`. — Leitura Solicitação→Membro: cada solicitação tem exatamente um destinatário. Leitura Membro→Solicitação: um membro pode ser destinatário de zero ou várias trocas. — `destinatário`; FK `destinatario_membro_id`; US-012/013; slides 18/24. | FAIL: 0..* junto a Membro, 1/1/0..1 junto a Solicitação; leitura invertida — 001. |
| CL02-R03c | `SolicitacaoTrocaPlantao` — `MembroRede` — Associação contínua, sem ponta; papel `respondente` junto a `MembroRede`. `SolicitacaoTrocaPlantao` **[0..*] — [0..1]** `MembroRede`. — Leitura Solicitação→Membro: solicitação pendente pode não ter respondente; após resposta há no máximo um. Leitura Membro→Solicitação: um membro pode responder zero ou várias trocas. — `respondente`; FK anulável `respondido_por_membro_id`; US-013; slides 18/24. | FAIL: 0..* junto a Membro, 1/1/0..1 junto a Solicitação; leitura invertida — 001. |
| CL02-R04 | `MembroRede` — `Tarefa` — Associação contínua, sem ponta. `MembroRede` **[0..1] — [0..*]** `Tarefa`. — Leitura Membro→Tarefa: um membro pode responder por zero ou várias tarefas. Leitura Tarefa→Membro: uma tarefa pode estar sem responsável ou ter um responsável. — `responsável`; RF21/V1 DB-007; slides 18/24. | Valores do contrato presentes; leitura exige ajuste geométrico — 008. Não diagnosticada inversão adicional. |
| CL02-R05 | `Tarefa` — `ConclusaoTarefa` — Associação contínua, sem ponta, não composição. `Tarefa` **[1] — [0..1]** `ConclusaoTarefa`. — Leitura Tarefa→Conclusão: uma tarefa pode não ter conclusão ou ter uma na V1. Leitura Conclusão→Tarefa: cada conclusão é de uma tarefa. — `é concluída por`; US-025/V1 DB-007; slides 18/24. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL02-R06 | `MembroRede` — `ConclusaoTarefa` — Associação contínua, sem ponta. `MembroRede` **[1] — [0..*]** `ConclusaoTarefa`. — Leitura Membro→Conclusão: um membro pode executar zero ou várias conclusões. Leitura Conclusão→Membro: cada conclusão tem exatamente um executor. — `executa`; US-025/`executor_membro_id`; slides 18/24. | Valores do contrato presentes; leitura exige ajuste geométrico — 008. Não diagnosticada inversão adicional. |
| CL02-R07 | `MembroRede` — `Compromisso` — Associação contínua, sem ponta. `MembroRede` **[0..1] — [0..*]** `Compromisso`. — Leitura Membro→Compromisso: um membro pode responder por zero ou vários compromissos. Leitura Compromisso→Membro: um compromisso pode estar sem responsável ou ter um responsável. — `responsável`; SQL V1, RF20; slides 18/24. | PASS: valores nas extremidades correspondem; leitura preservada. |

### CL-03

[CL-03 — 6272:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6272-3484); [captura](evidencias/6272-3484.png); [nós](evidencias/6272-3484.json). Fonte: [docs/uml/especificacao-para-figma/dominio-C-registros/CL-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/CL-03.md).

#### Catálogo de classes

| ID/classe | Responsabilidade; atributos exibidos | Operações exibidas | Fonte |
|---|---|---|---|
| C-C01 `RegistroCuidado` | Original de diário/sintoma/intercorrência. `- tipo: TipoRegistro`; `- descricaoOriginal: String`; `- ocorridoEm: DateTime`; `- registradoEm: DateTime`. | `+ registrar()`; `+ criarCorrecao()`. | RF11/RF18/RNF02; `registro_cuidado`. |
| C-C02 `CorrecaoRegistro` | Versão vinculada ao original. `- numeroVersao: Integer`; `- descricaoCorrigida: String`; `- ocorridoEmCorrigido: DateTime`; `- justificativa: String`; `- corrigidoEm: DateTime`. | Sem operação exibida. | RN-006/US-034; `correcao_registro_cuidado`. |
| C-C03 `Medicamento` | Medicamento contextual. `- nome: String`; `- apresentacao: String [0..1]`; `- ativo: Boolean`. | `+ cadastrar()` [INFERENCIA de RF14]. | RF14; `medicamento`. |
| C-C04 `RegimeMedicamento` | Plano versionado de posologia. `- posologiaTextual: String`; `- inicioVigencia: Date`; `- fimVigencia: Date [0..1]`; `- versaoPlano: Integer`. | `+ definirHorario()`. | RF15; `regime_medicamento`. |
| C-C05 `HorarioRegime` | Horário civil do regime. `- horaLocal: Time`; `- fusoIana: String`; `- regraRecorrencia: String [0..1]`. | Sem operação exibida. | RF15/V1 DB-010/015; `horario_regime`. |
| C-C06 `OcorrenciaProgramada` | Instância prevista de tarefa ou horário. `- previstoEm: DateTime`; `- canceladaEm: DateTime [0..1]`. | `+ designarResponsavel()` [INFERENCIA de DB-030]. | RF17/RF26; `ocorrencia_programada`. |
| C-C07 `AdministracaoMedicamento` | Fato realizado, distinto do previsto. `- realizadaEm: DateTime`; `- registradaEm: DateTime`; `- observacaoOriginal: String [0..1]`. | `+ registrar()`; `+ criarCorrecao()`. | RF16/RNF02; `administracao_medicamento`. |
| C-C08 `Consulta` | Consulta realizada. `- realizadaEm: DateTime`; `- observacaoOriginal: String [0..1]`; `- registradaEm: DateTime`. | `+ registrar()`; `+ criarCorrecao()`. | RF19/RNF02; `consulta`. |
| C-C09 `Recomendacao` | Recomendação de saúde, contextualmente vinculável a consulta. `- descricao: String`; `- registradaEm: DateTime`. | `+ registrar()` [INFERENCIA de RF19]. | RF19; `recomendacao`. |
| C-C10 `Anexo` | Documento/imagem de um original compatível. `- nomeSanitizado: String`; `- mimeValidado: String`; `- tamanhoBytes: Integer`; `- estadoTecnico: EstadoAnexo`. | `+ anexar()` [INFERENCIA de RF23]. | RF23; `anexo`. |
| C-C11 `Auditoria` | Evidência de operação relevante. `- dataHora: DateTime`; `- operacao: String`; `- recurso: String`; `- resultado: ResultadoOperacao`. | `+ registrarEvento()` [INFERENCIA de RN-008]. | RF29/RNF03; `auditoria`. |


**Confronto das classes:** 11 presentes. Original e correção separados; Auditoria é transversal sem associação estrutural inventada. Anexo apresenta exatamente um pai elegível. Geometria/assinaturas: 008/010.

| Relação | Contrato: extremidades, símbolos e leitura nos dois sentidos | Figma encontrado / resultado |
|---|---|---|
| CL03-R01 | `Medicamento` — `RegimeMedicamento` — Associação contínua, sem ponta. `Medicamento` **[1] — [0..*]** `RegimeMedicamento`. — Leitura Medicamento→Regime: um medicamento pode ter zero ou vários regimes. Leitura Regime→Medicamento: cada regime pertence a um medicamento. — `possui plano`; RF15 / `regime_medicamento`; slides 18/24. | Valores do contrato presentes; leitura exige ajuste geométrico — 008. Não diagnosticada inversão adicional. |
| CL03-R02 | `RegimeMedicamento` — `HorarioRegime` — Associação contínua, sem ponta. `RegimeMedicamento` **[1] — [0..*]** `HorarioRegime`. — Leitura Regime→Horário: um regime pode definir zero ou vários horários. Leitura Horário→Regime: cada horário pertence a um regime. — `define horários`; RF15; slides 18/24. | Valores do contrato presentes; leitura exige ajuste geométrico — 008. Não diagnosticada inversão adicional. |
| CL03-R03 | `HorarioRegime` — `OcorrenciaProgramada` — Associação contínua, sem ponta. `HorarioRegime` **[0..1] — [0..*]** `OcorrenciaProgramada`. — Leitura Horário→Ocorrência: um horário pode gerar zero ou várias ocorrências. Leitura Ocorrência→Horário: uma ocorrência pode não ter horário quando sua origem é tarefa; quando medicamentosa, tem um horário. — `gera programação`; [PERSISTENCIA] `ck_ocorrencia_origem`; slides 18/24. | Valores do contrato presentes; leitura exige ajuste geométrico — 008. Não diagnosticada inversão adicional. |
| CL03-R04 | `OcorrenciaProgramada` — `AdministracaoMedicamento` — Associação contínua, sem ponta. `OcorrenciaProgramada` **[0..1] — [0..1]** `AdministracaoMedicamento`. — Leitura Ocorrência→Administração: uma ocorrência pode ainda não ter administração ou ter no máximo uma. Leitura Administração→Ocorrência: administração avulsa não tem ocorrência; a vinculada tem uma. — `é executada por`; V1 DB-011/021; slides 18/24. | Valores do contrato presentes; leitura exige ajuste geométrico — 008. Não diagnosticada inversão adicional. |
| CL03-R05 | `RegistroCuidado` — `CorrecaoRegistro` — Associação contínua, sem ponta, não composição. `RegistroCuidado` **[1] — [0..*]** `CorrecaoRegistro`. — Leitura Registro→Correção: um original pode ter zero ou várias correções. Leitura Correção→Registro: cada correção refere-se a um original. — `é corrigido por`; RN-005/RN-006; slides 18/24. | Valores do contrato presentes; leitura exige ajuste geométrico — 008. Não diagnosticada inversão adicional. |
| CL03-R06 | `Consulta` — `Recomendacao` — **Não desenhar**. — [PENDENTE] consulta pode ser independente e recommendation é opcional no SQL; multiplicidade de domínio não confirmada. — P-UML-05. | NÃO APLICÁVEL à montagem: ausência deliberada confirmada. |
| CL03-R07 | `RegistroCuidado` — `Anexo` — Associação contínua, sem ponta. `RegistroCuidado` **[0..1] — [0..*]** `Anexo`; restrição textual obrigatória. — Leitura Registro→Anexo: um registro pode ter zero ou vários anexos. Leitura Anexo→Registro: por este caminho, um anexo referencia zero ou um registro; ele só pode existir se este for o único pai escolhido pela restrição global. — `anexo de`; RF23 e `ck_anexo_pai`; slides 18/24. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL03-R08 | `Consulta` — `Anexo` — Associação contínua, sem ponta. `Consulta` **[0..1] — [0..*]** `Anexo`; restrição textual obrigatória. — Leitura Consulta→Anexo: uma consulta pode ter zero ou vários anexos. Leitura Anexo→Consulta: por este caminho, um anexo referencia zero ou uma consulta; ele só pode existir se este for o único pai escolhido pela restrição global. — `anexo de`; RF23 e `ck_anexo_pai`; slides 18/24. | PASS: valores nas extremidades correspondem; leitura preservada. |
| CL03-R09 | `AdministracaoMedicamento` — `Anexo` — Associação contínua, sem ponta. `AdministracaoMedicamento` **[0..1] — [0..*]** `Anexo`; restrição textual obrigatória. — Leitura Administração→Anexo: uma administração pode ter zero ou vários anexos. Leitura Anexo→Administração: por este caminho, um anexo referencia zero ou uma administração; ele só pode existir se este for o único pai escolhido pela restrição global. — `anexo de`; RF23 e `ck_anexo_pai`; slides 18/24. | Valores do contrato presentes; leitura exige ajuste geométrico — 008. Não diagnosticada inversão adicional. |
| CL03-R10 | `Auditoria` — demais classes — Dependência tracejada **não desenhar no CL-03**; referência transversal. — N/A. — Auditoria registra operações, não é posse estrutural de cada entidade. Ver governança. | NÃO APLICÁVEL à montagem: ausência deliberada confirmada. |

**Leituras adicionais CL-01:** R04: usuário pode ter muitos episódios; cada episódio tem um usuário. R05: membro pode ter muitas atribuições; cada atribuição tem um membro. R06: rede pode ter muitos contatos; cada contato pertence a uma rede. R07: rede pode não ter ficha vigente ou ter uma; cada ficha pertence a uma rede. R03: rede operacional tem membros; cada membro pertence a uma rede. O mínimo 1..* não substitui a restrição textual de Principal + Profissional nem pretende que o SQL imponha presença de filhos.

**Omissões CL-03:** R10 é transversal: correta ausência estrutural. R06 remete a P-UML-05; a montagem seguiu o contrato e não deve receber linha adicional automaticamente. A decisão DB-009 já permite recomendação independente e SQL consulta_id NULL; o status antigo da pendência pode ser atualizado futuramente, sem transformar uma relação não aprovada para montagem em obrigação gráfica. A nota do contrato diz “do lado de Anexo”, mas os 0..1 estão corretamente junto aos três pais no diagrama: leia-se número de pais por anexo.

## 3. Sequências: cada mensagem, participante e condição

As mensagens abaixo foram comparadas com posição temporal, origem/destino e texto dos vetores reais. IDs são lógicos: repetições de retornos nos operandos são legítimas. Nenhum retorno foi contado como chamada de negócio nova.

### SQ-01

[SQ-01 — 6257:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484); [captura](evidencias/6257-3484.png); [nós](evidencias/6257-3484.json). Fonte: [docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md).

#### Participantes

| ID | Participante / natureza | Responsabilidade | Relação ao modelo |
|---|---|---|---|
| P-01 | Usuário ou Pessoa Idosa / ator | Informa credenciais e solicita recurso. | A-02/A-06 de UC-01. |
| P-02 | Interface de Autenticação / interface | Coleta credenciais, encaminha solicitação e mostra resposta. | T01; não é classe de domínio. |
| P-03 | Serviço de Autenticação / serviço [INFERENCIA] | Verifica identidade na fonte persistida e estabelece sessão. | Implementa RF02; não é operação de `Usuario`. |
| P-04 | Serviço de Autorização / serviço [INFERENCIA] | Avalia categoria, vínculo, papel e escopo do recurso. | Regras RN-009/RN-010; não é CL-01. |
| P-05 | Auditoria / serviço técnico | Registra negação sanitizada. | C-C11/RNF01/RNF03. |

Abstração deliberada: `Usuario` não recebe linha de vida. Sua consulta é interna ao P-03/P-04 e não é mensagem entre objetos de domínio; assim, não se atribui a `Usuario.verificarIdentidade()` ou `Usuario.avaliarContexto()` responsabilidade sem evidência.


| ID | Emissor → receptor | Mensagem, argumentos e tipo esperado | Condição / consequência | Confronto |
|---|---|---|---|---|
| M-01 | P-01 → P-02 | `informarCredenciais(email, senha)`; síncrona, linha contínua/ponta cheia. | Início. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-02 | P-02 → P-03 | `autenticar(credenciais)`; síncrona. | P-03 verifica identidade e estado internamente. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-03 | P-03 → P-02 | `resultadoAutenticacao`; retorno tracejado. | No sucesso há sessão identificada, sem concessão de acesso de cuidado. | PASS: ordem/destino e retorno tracejado. |
| M-04 | P-02 → P-04 | `solicitarAcesso(recurso, sessao)`; síncrona. | Somente depois de autenticação válida. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-05 | P-04 → P-05 | `registrarEvento(NEGADO, contextoSanitizado)`; síncrona, apenas na guarda negada. | Registra antes da resposta negada. | Ordem/destino PASS; ponta da chamada FAIL (004). Assinatura: 010. |
| M-06 | P-05 → P-04 | `negacaoRegistrada`; retorno tracejado. | Confirma trilha. | PASS: ordem/destino e retorno tracejado. |
| M-07 | P-04 → P-02 | `acessoPermitido()` ou `acessoNegado()`; retorno tracejado. | A interface não expõe conteúdo quando negado. | PASS: ordem/destino e retorno tracejado. |

F01: válidas/inválidas ou conta inativa; F02 aninhado no caminho válido: autorizado/não autorizado. M02 antecede M03; M04 somente depois de identidade válida; M05 e confirmação M06 antecedem M07 negado. Caminho inválido não chama autorização nem expõe recurso. Barras/linhas de vida presentes. Autenticação não concede acesso irrestrito. Conflito de responsabilidade com CL01: 005.

### SQ-02

[SQ-02 — 6265:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484); [captura](evidencias/6265-3484.png); [nós](evidencias/6265-3484.json). Fonte: [docs/uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md).

#### Participantes

| ID | Participante / natureza | Responsabilidade |
|---|---|---|
| P-01 | Usuário Vinculado / ator | **Solicitante** da troca; inicia a reorganização de responsabilidade. |
| P-02 | Interface de Plantão / interface | Inicia solicitação, recebe resposta e mostra resultado. |
| P-03 | Serviço de Troca de Plantão / serviço [INFERENCIA] | Coordena regras de vínculo, versão e resposta. |
| P-04 | `Plantao` / domínio | Expõe contexto de troca e, somente no aceite, recebe novo responsável. |
| P-05 | `SolicitacaoTrocaPlantao` / domínio | Preserva solicitação e recebe aceite ou recusa. |
| P-06 | Usuário Envolvido / ator | **Destinatário/respondente**; aceita ou recusa a solicitação recebida. |

Abstração deliberada: N01 é consequência anotada no operando de aceite, sem linha técnica de notificação. O cenário exige seis linhas de vida porque solicitante e destinatário/respondente são pessoas distintas, com responsabilidades e mensagens diferentes; fundi-los violaria a correção semântica. A exceção à recomendação do slide 36 é limitada a uma linha adicional e preserva legibilidade por manter os seis participantes diretamente envolvidos.


| ID | Emissor → receptor | Mensagem, argumentos e tipo esperado | Condição / consequência | Confronto |
|---|---|---|---|---|
| M-01 | P-01 → P-02 | `solicitarTroca(plantao, destinatario)`; síncrona. | Início pelo solicitante. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-02 | P-02 → P-03 | `registrarSolicitacao(plantao, destinatario)`; síncrona. | Ativa serviço. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-03 | P-03 → P-04 | `obterContextoDeTroca()`; síncrona. | Confirma plantão e versão para a solicitação; não decide permissão no objeto. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-04 | P-04 → P-03 | `contextoDoPlantao`; retorno tracejado. | Contexto disponível para vínculo. | PASS: ordem/destino e retorno tracejado. |
| M-05 | P-03 → P-05 | `«create» SolicitacaoTrocaPlantao(solicitante, destinatario, plantao)`; criação síncrona. | Solicitação pendente fica vinculada. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-06 | P-05 → P-03 | `solicitacaoPendente`; retorno tracejado. | Solicitação registrada. | PASS: ordem/destino e retorno tracejado. |
| M-07 | P-06 → P-02 | `responderTroca(decisao)`; síncrona. | Aceitar ou recusar pelo destinatário/respondente. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-08 | P-02 → P-03 | `processarResposta(decisao)`; síncrona. | Encaminha decisão ao domínio. | Ordem/destino PASS; ponta da chamada FAIL (004). Versão/contexto na resposta: 006. |
| M-09 | P-03 → P-05 | `aceitar()` ou `recusar()`; síncrona. | Atualiza o status da solicitação. | Ordem/destino PASS; ponta da chamada FAIL (004). Versão/contexto na resposta: 006. |
| M-10 | P-03 → P-04 | `atribuirResponsavel(destinatario)`; síncrona, só no aceite. | Reorganiza plantão sem permuta bilateral. | Ordem/destino PASS; ponta da chamada FAIL (004). Versão/contexto na resposta: 006. |
| M-11 | P-03 → P-02 | `resultadoResposta`; retorno tracejado. | Mostra aceite ou recusa. | PASS: ordem/destino e retorno tracejado. |

Seis lifelines preservam duas pessoas; exceção didática justificada. P05 começa na cabeça atingida por «create» em M05; não existe antes da criação. M06 retorna pendente. M07 parte do destinatário, não do solicitante. Alt aceitar contém M09/M10/M11 e N01; recusar contém M09/M11 sem M10/N01. Não é permuta bilateral. Versão é consultada antes da criação, mas validação ao responder não está demonstrada (006). Ativações representam processamento em fases; não presumir sessão humana contínua.

### SQ-03

[SQ-03 — 6273:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6273-3484); [captura](evidencias/6273-3484.png); [nós](evidencias/6273-3484.json). Fonte: [docs/uml/especificacao-para-figma/dominio-C-registros/SQ-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/SQ-03.md).

#### Participantes

| ID | Participante / natureza | Responsabilidade |
|---|---|---|
| P-01 | Usuário com Permissão Efetiva / ator | Informa administração. |
| P-02 | Interface de Medicamentos / interface | Submete dados e mostra resultado. |
| P-03 | Serviço de Administração / serviço [INFERENCIA] | Verifica permissão/contexto, inclusive regime e ocorrência quando recebidos; coordena registro imutável. |
| P-04 | `AdministracaoMedicamento` / domínio | Preserva o fato realizado e sua autoria/data-hora. |

Abstrações deliberadas: serviço de autorização, `RegimeMedicamento`, `OcorrenciaProgramada` e infraestrutura de N03 não recebem linhas de vida. A validação de permissão, vínculo de regime e compatibilidade de ocorrência é responsabilidade técnica interna de P-03, não operação inventada nesses objetos. N03 aparece como consequência anotada. O roteiro reduz para quatro linhas de vida sem omitir essas regras.


| ID | Emissor → receptor | Mensagem, argumentos e tipo esperado | Condição / consequência | Confronto |
|---|---|---|---|---|
| M-01 | P-01 → P-02 | `informarAdministracao(dados)`; síncrona. | Início. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-02 | P-02 → P-03 | `registrarAdministracao(dados)`; síncrona. | P-03 valida internamente permissão e contexto. | Ordem/destino PASS; ponta da chamada FAIL (004). |
| M-03 | P-03 → P-04 | `registrar(realizadaEm, autor)`; síncrona. | Cria fato original imutável após validação; ligação com ocorrência só quando informada. | Ordem/destino PASS; ponta da chamada FAIL (004). Assinatura: 010. |
| M-04 | P-04 → P-03 | `administracaoRegistrada`; retorno tracejado. | Disponível no histórico autorizado. | PASS: ordem/destino e retorno tracejado. |
| M-05 | P-03 → P-02 | `resultadoRegistro`; retorno tracejado. | Confirma sucesso. | PASS: ordem/destino e retorno tracejado. |
| M-06 | P-03 → P-02 | `acessoNegado()`; retorno tracejado. | Retorna negação sem criar Administração nem emitir N03. | PASS: ordem/destino e retorno tracejado. |

Quatro lifelines; F01 ocorre depois de M02. [permissão e contexto válidos] contém M03–M05 e N03; [sem permissão ou contexto válido] contém só M06 acessoNegado. P04 só ativa no caminho autorizado. realizadaEm é argumento explícito; registradaEm distinto no CL03/SQL. Nota conserva original e cria versão na correção. Ocorrência opcional não exige novo opt; ausência pode representar avulsa. Não representa lembrete nem prova de ingestão. Auditoria negativa é obrigação transversal em UC03/governança; sua linha de vida não é exigida no recorte seletivo SQ03.

## 4. Campos físicos exibidos: confronto integral

Nomes físicos e marcas PK/FK foram localizados na tabela indicada. Tipos ausentes não foram inventados; ausência de NULL/NOT NULL no slide é informação omitida, não declaração NOT NULL. Todos os DB declaram recorte seletivo. FKs compostas aparecem resumidas por campos de identificação: a origem completa está na seção seguinte. BOOLEAN no SQL e TINYINT no MWB são equivalentes para esta comparação; UNSIGNED não é descartado.

### DB-A: campos

| Nó | Tabela.campo | Texto efetivamente exibido | SQL canônico | Resultado |
|---|---|---|---|---|
| 6259:3596 | `usuario.usuario_id` | `PK usuario_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6259:3597 | `usuario.nome` | `nome VARCHAR(160)` | `VARCHAR(160) NOT NULL` | PASS: nome/tipo exibidos |
| 6259:3598 | `usuario.email_normalizado` | `email_normalizado VARCHAR(254)` | `VARCHAR(254) NOT NULL` | PASS: nome/tipo exibidos |
| 6259:3599 | `usuario.tipo_acesso` | `tipo_acesso VARCHAR(16)` | `VARCHAR(16) NOT NULL DEFAULT 'CUIDADOR'` | PASS: nome/tipo exibidos |
| 6259:3600 | `usuario.ativo` | `ativo BOOLEAN` | `BOOLEAN NOT NULL DEFAULT TRUE` | PASS: nome/tipo exibidos |
| 6259:3604 | `pessoa_idosa.pessoa_idosa_id` | `PK pessoa_idosa_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6259:3605 | `pessoa_idosa.usuario_titular_id` | `FK usuario_titular_id BIGINT` | `BIGINT UNSIGNED NULL` | FAIL: tipo parcial; 009 |
| 6259:3606 | `pessoa_idosa.cadastrado_por_usuario_id` | `FK cadastrado_por_usuario_id` | `BIGINT UNSIGNED NOT NULL` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6259:3607 | `pessoa_idosa.nome` | `nome VARCHAR(160)` | `VARCHAR(160) NOT NULL` | PASS: nome/tipo exibidos |
| 6259:3608 | `pessoa_idosa.data_nascimento` | `data_nascimento DATE` | `DATE NULL` | PASS: nome/tipo exibidos |
| 6259:3612 | `rede_cuidado.rede_id` | `PK rede_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6259:3613 | `rede_cuidado.pessoa_idosa_id` | `FK pessoa_idosa_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6259:3614 | `rede_cuidado.criada_por_usuario_id` | `FK criada_por_usuario_id` | `BIGINT UNSIGNED NOT NULL` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6259:3615 | `rede_cuidado.situacao` | `situacao VARCHAR(20)` | `VARCHAR(20) NOT NULL DEFAULT 'OPERACIONAL'` | PASS: nome/tipo exibidos |
| 6259:3616 | `rede_cuidado.versao` | `versao INT UNSIGNED` | `INT UNSIGNED NOT NULL DEFAULT 1` | PASS: nome/tipo exibidos |
| 6259:3620 | `membro_rede.membro_id` | `PK membro_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6259:3621 | `membro_rede.rede_id` | `FK rede_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6259:3622 | `membro_rede.usuario_id` | `FK usuario_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6259:3623 | `membro_rede.categoria` | `categoria VARCHAR(24)` | `VARCHAR(24) NOT NULL` | PASS: nome/tipo exibidos |
| 6259:3624 | `membro_rede.vinculado_em` | `vinculado_em DATETIME(6)` | `DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)` | PASS: nome/tipo exibidos |
| 6259:3625 | `membro_rede.desvinculado_em` | `desvinculado_em DATETIME(6)` | `DATETIME(6) NULL` | PASS: nome/tipo exibidos |
| 6259:3629 | `atribuicao_papel_familiar.atribuicao_id` | `PK atribuicao_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6259:3630 | `atribuicao_papel_familiar.rede_id` | `FK rede_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6259:3631 | `atribuicao_papel_familiar.membro_id` | `FK membro_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6259:3632 | `atribuicao_papel_familiar.papel` | `papel VARCHAR(16)` | `VARCHAR(16) NOT NULL` | PASS: nome/tipo exibidos |
| 6259:3633 | `atribuicao_papel_familiar.revogado_em` | `revogado_em DATETIME(6)` | `DATETIME(6) NULL` | PASS: nome/tipo exibidos |
| 6259:3637 | `contato_importante.contato_id` | `PK contato_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6259:3638 | `contato_importante.rede_id` | `FK rede_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6259:3639 | `contato_importante.pessoa_idosa_id` | `FK pessoa_idosa_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6259:3640 | `contato_importante.telefone` | `telefone VARCHAR(32) NOT NULL` | `VARCHAR(32) NOT NULL` | PASS: nome/tipo exibidos |
| 6259:3641 | `contato_importante.ativo` | `ativo BOOLEAN` | `BOOLEAN NOT NULL DEFAULT TRUE` | PASS: nome/tipo exibidos |
| 6259:3645 | `informacao_emergencia.emergencia_id` | `PK emergencia_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6259:3646 | `informacao_emergencia.rede_id` | `FK rede_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6259:3647 | `informacao_emergencia.pessoa_idosa_id` | `FK pessoa_idosa_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6259:3648 | `informacao_emergencia.orientacoes` | `orientacoes TEXT NOT NULL` | `TEXT NOT NULL` | PASS: nome/tipo exibidos |
| 6259:3649 | `informacao_emergencia.atualizado_em` | `atualizado_em DATETIME(6)` | `DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)` | PASS: nome/tipo exibidos |

### DB-B: campos

| Nó | Tabela.campo | Texto efetivamente exibido | SQL canônico | Resultado |
|---|---|---|---|---|
| 6266:3578 | `plantao.plantao_id` | `PK plantao_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6266:3579 | `plantao.rede_id` | `FK rede_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3580 | `plantao.membro_responsavel_id` | `FK membro_responsavel_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6266:3581 | `plantao.inicio_em` | `inicio_em DATETIME(6)` | `DATETIME(6) NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3582 | `plantao.fim_em` | `fim_em DATETIME(6)` | `DATETIME(6) NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3583 | `plantao.situacao` | `situacao VARCHAR(16)` | `VARCHAR(16) NOT NULL DEFAULT 'AGENDADO'` | PASS: nome/tipo exibidos |
| 6266:3584 | `plantao.versao` | `versao INT UNSIGNED` | `INT UNSIGNED NOT NULL DEFAULT 1` | PASS: nome/tipo exibidos |
| 6266:3588 | `solicitacao_troca_plantao.troca_id` | `PK troca_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6266:3589 | `solicitacao_troca_plantao.plantao_id` | `FK plantao_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3590 | `solicitacao_troca_plantao.solicitante_membro_id` | `FK solicitante_membro_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6266:3591 | `solicitacao_troca_plantao.destinatario_membro_id` | `FK destinatario_membro_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6266:3592 | `solicitacao_troca_plantao.respondido_por_membro_id` | `FK respondido_por_membro_id NULL` | `BIGINT UNSIGNED NULL` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6266:3593 | `solicitacao_troca_plantao.status` | `status VARCHAR(16)` | `VARCHAR(16) NOT NULL DEFAULT 'PENDENTE'` | PASS: nome/tipo exibidos |
| 6266:3594 | `solicitacao_troca_plantao.versao_plantao_esperada` | `versao_plantao_esperada INT` | `INT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6266:3598 | `historico_plantao.evento_plantao_id` | `PK evento_plantao_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6266:3599 | `historico_plantao.plantao_id` | `FK plantao_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6266:3600 | `historico_plantao.membro_anterior_id` | `FK membro_anterior_id BIGINT NULL` | `BIGINT UNSIGNED NULL` | FAIL: tipo parcial; 009 |
| 6266:3601 | `historico_plantao.membro_novo_id` | `FK membro_novo_id BIGINT NULL` | `BIGINT UNSIGNED NULL` | FAIL: tipo parcial; 009 |
| 6266:3602 | `historico_plantao.tipo_evento` | `tipo_evento VARCHAR(22)` | `VARCHAR(22) NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3603 | `historico_plantao.versao_nova` | `versao_nova INT UNSIGNED` | `INT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3607 | `tarefa.tarefa_id` | `PK tarefa_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6266:3608 | `tarefa.rede_id` | `FK rede_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3609 | `tarefa.responsavel_membro_id` | `FK responsavel_membro_id NULL` | `BIGINT UNSIGNED NULL` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6266:3610 | `tarefa.titulo` | `titulo VARCHAR(180)` | `VARCHAR(180) NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3611 | `tarefa.status` | `status VARCHAR(16)` | `VARCHAR(16) NOT NULL DEFAULT 'PENDENTE'` | PASS: nome/tipo exibidos |
| 6266:3612 | `tarefa.prazo_em` | `prazo_em DATETIME(6) NULL` | `DATETIME(6) NULL` | PASS: nome/tipo exibidos |
| 6266:3616 | `conclusao_tarefa.conclusao_id` | `PK conclusao_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6266:3617 | `conclusao_tarefa.tarefa_id` | `FK tarefa_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6266:3618 | `conclusao_tarefa.executor_membro_id` | `FK executor_membro_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6266:3619 | `conclusao_tarefa.concluida_em` | `concluida_em DATETIME(6)` | `DATETIME(6) NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3620 | `conclusao_tarefa.ciclo_numero` | `ciclo_numero INT UNSIGNED` | `INT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3624 | `compromisso.compromisso_id` | `PK compromisso_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6266:3625 | `compromisso.rede_id` | `FK rede_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6266:3626 | `compromisso.pessoa_idosa_id` | `FK pessoa_idosa_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6266:3627 | `compromisso.responsavel_membro_id` | `FK responsavel_membro_id NULL` | `BIGINT UNSIGNED NULL` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6266:3628 | `compromisso.inicio_em` | `inicio_em DATETIME(6)` | `DATETIME(6) NOT NULL` | PASS: nome/tipo exibidos |
| 6266:3629 | `compromisso.fim_em` | `fim_em DATETIME(6) NULL` | `DATETIME(6) NULL` | PASS: nome/tipo exibidos |

### DB-C1: campos

| Nó | Tabela.campo | Texto efetivamente exibido | SQL canônico | Resultado |
|---|---|---|---|---|
| 6275:3561 | `medicamento.medicamento_id` | `PK medicamento_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6275:3562 | `medicamento.rede_id` | `FK rede_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6275:3563 | `medicamento.pessoa_idosa_id` | `FK pessoa_idosa_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6275:3564 | `medicamento.nome` | `nome VARCHAR(180)` | `VARCHAR(180) NOT NULL` | PASS: nome/tipo exibidos |
| 6275:3565 | `medicamento.ativo` | `ativo BOOLEAN` | `BOOLEAN NOT NULL DEFAULT TRUE` | PASS: nome/tipo exibidos |
| 6275:3569 | `regime_medicamento.regime_id` | `PK regime_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6275:3570 | `regime_medicamento.medicamento_id` | `FK medicamento_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6275:3571 | `regime_medicamento.posologia_textual` | `posologia_textual TEXT` | `TEXT NOT NULL` | PASS: nome/tipo exibidos |
| 6275:3572 | `regime_medicamento.versao_plano` | `versao_plano INT` | `INT UNSIGNED NOT NULL DEFAULT 1` | FAIL: tipo parcial; 009 |
| 6275:3573 | `regime_medicamento.inicio_vigencia` | `inicio_vigencia DATE` | `DATE NOT NULL` | PASS: nome/tipo exibidos |
| 6275:3577 | `horario_regime.horario_id` | `PK horario_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6275:3578 | `horario_regime.regime_id` | `FK regime_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6275:3579 | `horario_regime.hora_local` | `hora_local TIME` | `TIME NOT NULL` | PASS: nome/tipo exibidos |
| 6275:3580 | `horario_regime.fuso_iana` | `fuso_iana VARCHAR(64)` | `VARCHAR(64) NOT NULL` | PASS: nome/tipo exibidos |
| 6275:3584 | `ocorrencia_programada.ocorrencia_id` | `PK ocorrencia_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6275:3585 | `ocorrencia_programada.tarefa_id` | `FK tarefa_id BIGINT NULL` | `BIGINT UNSIGNED NULL` | FAIL: tipo parcial; 009 |
| 6275:3586 | `ocorrencia_programada.horario_regime_id` | `FK horario_regime_id NULL` | `BIGINT UNSIGNED NULL` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6275:3587 | `ocorrencia_programada.responsavel_membro_id` | `FK responsavel_membro_id NULL` | `BIGINT UNSIGNED NULL COMMENT 'N02 V1 somente ao designado elegivel; NULL exige auditoria e nenhum envio'` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6275:3588 | `ocorrencia_programada.previsto_em` | `previsto_em DATETIME(6)` | `DATETIME(6) NOT NULL COMMENT 'Instante absoluto UTC; converter a partir da agenda civil'` | PASS: nome/tipo exibidos |
| 6275:3592 | `administracao_medicamento.administracao_id` | `PK administracao_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6275:3593 | `administracao_medicamento.regime_id` | `FK regime_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6275:3594 | `administracao_medicamento.horario_regime_id` | `FK horario_regime_id NULL` | `BIGINT UNSIGNED NULL` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6275:3595 | `administracao_medicamento.ocorrencia_id` | `FK ocorrencia_id BIGINT NULL` | `BIGINT UNSIGNED NULL` | FAIL: tipo parcial; 009 |
| 6275:3596 | `administracao_medicamento.executor_membro_id` | `FK executor_membro_id NULL` | `BIGINT UNSIGNED NULL` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6275:3597 | `administracao_medicamento.realizada_em` | `realizada_em DATETIME(6)` | `DATETIME(6) NOT NULL COMMENT 'Instante declarado da execucao; nao e instante do alerta'` | PASS: nome/tipo exibidos |

### DB-C2: campos

| Nó | Tabela.campo | Texto efetivamente exibido | SQL canônico | Resultado |
|---|---|---|---|---|
| 6277:3487 | `registro_cuidado.registro_id` | `PK registro_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6277:3488 | `registro_cuidado.rede_id` | `FK rede_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6277:3489 | `registro_cuidado.pessoa_idosa_id` | `FK pessoa_idosa_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6277:3490 | `registro_cuidado.tipo` | `tipo VARCHAR(20)` | `VARCHAR(20) NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3491 | `registro_cuidado.descricao_original` | `descricao_original TEXT` | `TEXT NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3492 | `registro_cuidado.ocorrido_em` | `ocorrido_em DATETIME(6)` | `DATETIME(6) NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3496 | `correcao_registro_cuidado.correcao_id` | `PK correcao_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6277:3497 | `correcao_registro_cuidado.registro_id` | `FK registro_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6277:3498 | `correcao_registro_cuidado.descricao_corrigida` | `descricao_corrigida TEXT` | `TEXT NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3499 | `correcao_registro_cuidado.ocorrido_em_corrigido` | `ocorrido_em_corrigido DATETIME(6)` | `DATETIME(6) NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3500 | `correcao_registro_cuidado.autor_correcao_usuario_id` | `autor_correcao_usuario_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6277:3504 | `consulta.consulta_id` | `PK consulta_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6277:3505 | `consulta.pessoa_idosa_id` | `FK pessoa_idosa_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6277:3506 | `consulta.compromisso_id` | `FK compromisso_id NULL` | `BIGINT UNSIGNED NULL` | PASS: nome; tipo/nulidade omitidos quando não exibidos |
| 6277:3507 | `consulta.realizada_em` | `realizada_em DATETIME(6)` | `DATETIME(6) NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3508 | `consulta.observacao_original` | `observacao_original TEXT` | `TEXT NULL` | PASS: nome/tipo exibidos |
| 6277:3512 | `correcao_consulta.correcao_id` | `PK correcao_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6277:3513 | `correcao_consulta.consulta_id` | `FK consulta_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6277:3514 | `correcao_consulta.realizada_em_corrigida` | `realizada_em_corrigida DATETIME(6)` | `DATETIME(6) NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3515 | `correcao_consulta.autor_correcao_usuario_id` | `autor_correcao_usuario_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6277:3519 | `anexo.anexo_id` | `PK anexo_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6277:3520 | `anexo.registro_id` | `FK registro_id BIGINT NULL` | `BIGINT UNSIGNED NULL` | FAIL: tipo parcial; 009 |
| 6277:3521 | `anexo.consulta_id` | `FK consulta_id BIGINT NULL` | `BIGINT UNSIGNED NULL` | FAIL: tipo parcial; 009 |
| 6277:3522 | `anexo.administracao_id` | `FK administracao_id BIGINT NULL` | `BIGINT UNSIGNED NULL` | FAIL: tipo parcial; 009 |
| 6277:3523 | `anexo.mime_validado` | `mime_validado VARCHAR(120)` | `VARCHAR(120) NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3524 | `anexo.tamanho_bytes` | `tamanho_bytes BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3528 | `recomendacao.recomendacao_id` | `PK recomendacao_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6277:3529 | `recomendacao.consulta_id` | `FK consulta_id BIGINT NULL` | `BIGINT UNSIGNED NULL` | FAIL: tipo parcial; 009 |
| 6277:3530 | `recomendacao.pessoa_idosa_id` | `FK pessoa_idosa_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6277:3531 | `recomendacao.descricao` | `descricao TEXT NOT NULL` | `TEXT NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3535 | `correcao_administracao_medicamento.correcao_id` | `PK correcao_id BIGINT` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | FAIL: tipo parcial; 009 |
| 6277:3536 | `correcao_administracao_medicamento.administracao_id` | `FK administracao_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6277:3537 | `correcao_administracao_medicamento.realizada_em_corrigida` | `realizada_em_corrigida DATETIME(6)` | `DATETIME(6) NOT NULL` | PASS: nome/tipo exibidos |
| 6277:3538 | `correcao_administracao_medicamento.autor_correcao_usuario_id` | `autor_correcao_usuario_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |

### DB-D: campos

| Nó | Tabela.campo | Texto efetivamente exibido | SQL canônico | Resultado |
|---|---|---|---|---|
| 6287:3592 | `auditoria.auditoria_id` | `PK auditoria_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6287:3593 | `auditoria.rede_id` | `FK rede_id BIGINT UNSIGNED NULL` | `BIGINT UNSIGNED NULL` | PASS: nome/tipo exibidos |
| 6287:3594 | `auditoria.pessoa_idosa_id` | `FK pessoa_idosa_id BIGINT UNSIGNED NULL` | `BIGINT UNSIGNED NULL` | PASS: nome/tipo exibidos |
| 6287:3595 | `auditoria.ator_usuario_id` | `FK ator_usuario_id BIGINT UNSIGNED NULL` | `BIGINT UNSIGNED NULL` | PASS: nome/tipo exibidos |
| 6287:3596 | `auditoria.evento_em` | `evento_em DATETIME(6)` | `DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)` | PASS: nome/tipo exibidos |
| 6287:3597 | `auditoria.operacao` | `operacao VARCHAR(80)` | `VARCHAR(80) NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3598 | `auditoria.resultado` | `resultado VARCHAR(12)` | `VARCHAR(12) NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3602 | `preferencia_notificacao.preferencia_id` | `PK preferencia_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6287:3603 | `preferencia_notificacao.rede_id` | `FK rede_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3604 | `preferencia_notificacao.usuario_id` | `FK usuario_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3605 | `preferencia_notificacao.tipo_evento` | `tipo_evento VARCHAR(3) [N03,N04]` | `VARCHAR(3) NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3606 | `preferencia_notificacao.receber` | `receber BOOLEAN` | `BOOLEAN NOT NULL DEFAULT TRUE` | PASS: nome/tipo exibidos |
| 6287:3607 | `preferencia_notificacao.atualizado_em` | `atualizado_em DATETIME(6)` | `DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)` | PASS: nome/tipo exibidos |
| 6287:3611 | `idempotencia_comando.comando_id` | `PK comando_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6287:3612 | `idempotencia_comando.rede_id` | `FK rede_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3613 | `idempotencia_comando.ator_usuario_id` | `FK ator_usuario_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3614 | `idempotencia_comando.chave_cliente` | `chave_cliente VARCHAR(100)` | `VARCHAR(100) NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3615 | `idempotencia_comando.payload_sha256` | `payload_sha256 CHAR(64)` | `CHAR(64) NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3616 | `idempotencia_comando.estado` | `estado VARCHAR(16)` | `VARCHAR(16) NOT NULL DEFAULT 'EM_ANDAMENTO'` | PASS: nome/tipo exibidos |
| 6287:3620 | `entrega_tecnica_notificacao.entrega_id` | `PK entrega_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT` | PASS: nome/tipo exibidos |
| 6287:3621 | `entrega_tecnica_notificacao.rede_id` | `FK rede_id BIGINT UNSIGNED` | `BIGINT UNSIGNED NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3622 | `entrega_tecnica_notificacao.usuario_destinatario_id` | `FK usuario_destinatario_id BIGINT` | `BIGINT UNSIGNED NOT NULL` | FAIL: tipo parcial; 009 |
| 6287:3623 | `entrega_tecnica_notificacao.tipo_evento` | `tipo_evento VARCHAR(3) [N01,N02,N03,N04]` | `VARCHAR(3) NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3624 | `entrega_tecnica_notificacao.chave_evento` | `chave_evento CHAR(64)` | `CHAR(64) NOT NULL` | PASS: nome/tipo exibidos |
| 6287:3625 | `entrega_tecnica_notificacao.estado_transporte` | `estado_transporte VARCHAR(16)` | `VARCHAR(16) NOT NULL DEFAULT 'PENDENTE'` | PASS: nome/tipo exibidos |
| 6287:3626 | `entrega_tecnica_notificacao.tentativas` | `tentativas INT UNSIGNED` | `INT UNSIGNED NOT NULL DEFAULT 0` | PASS: nome/tipo exibidos |

**Balanço:** 158 ocorrências de campos confrontadas; 62 ocorrências com tipo parcial (achado agrupado 009); demais nomes/tipos explicitamente exibidos sem divergência identificada. Repetições de usuario/rede no DB-D são referências, não novas tabelas. Campos de autoria exibidos sem marca FK continuam campos reais; a legenda não promete exaustividade.

## 5. Cada FK desenhada nos DB e leitura bidirecional

Na notação pai [p] — [c] filha: cada filha aponta a p pais; cada pai pode ter c filhas. O mínimo de filhos é zero na estrutura física; FK NOT NULL obriga pai para a filha, não obriga cada pai a possuir filha. Índices únicos e CHECKs foram considerados para o máximo.

### DB-A

| Relação | Origem física → alvo | Nulidade | Cardinalidades esperadas pai / filha | Fundamento do máximo | Confronto visual |
|---|---|---|---|---|---|
| R01 `fk_pessoa_conta_tipo` | `pessoa_idosa(usuario_titular_id,tipo_titular_exigido)` → `usuario(usuario_id,tipo_acesso)` | usuario_titular_id: NULL, tipo_titular_exigido: NOT NULL | 0..1 / 0..1 | uq_pessoa_titular | PASS: ponta e valores correspondem |
| R02 `fk_rede_pessoa` | `rede_cuidado(pessoa_idosa_id)` → `pessoa_idosa(pessoa_idosa_id)` | pessoa_idosa_id: NOT NULL | 1 / 0..1 | uq_rede_idoso_v1 | PASS: ponta e valores correspondem |
| R03 `fk_membro_rede` | `membro_rede(rede_id)` → `rede_cuidado(rede_id)` | rede_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R04 `fk_papel_membro_familiar` | `atribuicao_papel_familiar(rede_id,membro_id,categoria_exigida)` → `membro_rede(rede_id,membro_id,categoria)` | rede_id: NOT NULL, membro_id: NOT NULL, categoria_exigida: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R05 `fk_contato_contexto` | `contato_importante(rede_id,pessoa_idosa_id)` → `rede_cuidado(rede_id,pessoa_idosa_id)` | rede_id: NOT NULL, pessoa_idosa_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R06 `fk_emergencia_contexto` | `informacao_emergencia(rede_id,pessoa_idosa_id)` → `rede_cuidado(rede_id,pessoa_idosa_id)` | rede_id: NOT NULL, pessoa_idosa_id: NOT NULL | 1 / 0..1 | uq_emergencia_ficha | PASS: ponta e valores correspondem |
| R07 `fk_membro_usuario_tipo` | `membro_rede(usuario_id,tipo_usuario_exigido)` → `usuario(usuario_id,tipo_acesso)` | usuario_id: NOT NULL, tipo_usuario_exigido: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |

### DB-B

| Relação | Origem física → alvo | Nulidade | Cardinalidades esperadas pai / filha | Fundamento do máximo | Confronto visual |
|---|---|---|---|---|---|
| R01 `fk_troca_plantao` | `solicitacao_troca_plantao(rede_id,plantao_id)` → `plantao(rede_id,plantao_id)` | rede_id: NOT NULL, plantao_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R02 `fk_historico_plantao` | `historico_plantao(rede_id,plantao_id)` → `plantao(rede_id,plantao_id)` | rede_id: NOT NULL, plantao_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R03 `fk_conclusao_tarefa` | `conclusao_tarefa(rede_id,tarefa_id)` → `tarefa(rede_id,tarefa_id)` | rede_id: NOT NULL, tarefa_id: NOT NULL | 1 / 0..1 | uq_conclusao_ciclo(rede_id,tarefa_id,ciclo_numero) + ck_conclusao_ciclo: ciclo_numero=1 | PASS: ponta e valores correspondem |

### DB-C1

| Relação | Origem física → alvo | Nulidade | Cardinalidades esperadas pai / filha | Fundamento do máximo | Confronto visual |
|---|---|---|---|---|---|
| R01 `fk_regime_medicamento` | `regime_medicamento(rede_id,medicamento_id)` → `medicamento(rede_id,medicamento_id)` | rede_id: NOT NULL, medicamento_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R02 `fk_horario_regime` | `horario_regime(rede_id,regime_id)` → `regime_medicamento(rede_id,regime_id)` | rede_id: NOT NULL, regime_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R03 `fk_ocorrencia_horario` | `ocorrencia_programada(rede_id,horario_regime_id)` → `horario_regime(rede_id,horario_id)` | rede_id: NOT NULL, horario_regime_id: NULL | 0..1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R04 `fk_administracao_regime` | `administracao_medicamento(rede_id,regime_id)` → `regime_medicamento(rede_id,regime_id)` | rede_id: NOT NULL, regime_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R05 `fk_administracao_ocorrencia` | `administracao_medicamento(rede_id,horario_regime_id,ocorrencia_id)` → `ocorrencia_programada(rede_id,horario_regime_id,ocorrencia_id)` | rede_id: NOT NULL, horario_regime_id: NULL, ocorrencia_id: NULL | 0..1 / 0..1 | uq_administracao_ocorrencia_v1 | PASS: ponta e valores correspondem |

### DB-C2

| Relação | Origem física → alvo | Nulidade | Cardinalidades esperadas pai / filha | Fundamento do máximo | Confronto visual |
|---|---|---|---|---|---|
| R01 `fk_correcao_registro` | `correcao_registro_cuidado(rede_id,registro_id)` → `registro_cuidado(rede_id,registro_id)` | rede_id: NOT NULL, registro_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R02 `fk_correcao_consulta` | `correcao_consulta(rede_id,consulta_id)` → `consulta(rede_id,consulta_id)` | rede_id: NOT NULL, consulta_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R03 `fk_anexo_registro` | `anexo(rede_id,registro_id)` → `registro_cuidado(rede_id,registro_id)` | rede_id: NOT NULL, registro_id: NULL | 0..1 / 0..* | sem chave única limitando essa FK | FAIL: pai está 1 em vez de 0..1 (002) |
| R04 `fk_anexo_consulta` | `anexo(rede_id,consulta_id)` → `consulta(rede_id,consulta_id)` | rede_id: NOT NULL, consulta_id: NULL | 0..1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R05 `fk_recomendacao_consulta` | `recomendacao(rede_id,consulta_id)` → `consulta(rede_id,consulta_id)` | rede_id: NOT NULL, consulta_id: NULL | 0..1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |

### DB-D

| Relação | Origem física → alvo | Nulidade | Cardinalidades esperadas pai / filha | Fundamento do máximo | Confronto visual |
|---|---|---|---|---|---|
| R01 `fk_auditoria_ator` | `auditoria(ator_usuario_id)` → `usuario(usuario_id)` | ator_usuario_id: NULL | 0..1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R02 `fk_auditoria_rede` | `auditoria(rede_id)` → `rede_cuidado(rede_id)` | rede_id: NULL | 0..1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R03 `fk_preferencia_usuario` | `preferencia_notificacao(usuario_id)` → `usuario(usuario_id)` | usuario_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R04 `fk_preferencia_rede` | `preferencia_notificacao(rede_id)` → `rede_cuidado(rede_id)` | rede_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R05 `fk_idempotencia_ator` | `idempotencia_comando(ator_usuario_id)` → `usuario(usuario_id)` | ator_usuario_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R06 `fk_idempotencia_rede` | `idempotencia_comando(rede_id)` → `rede_cuidado(rede_id)` | rede_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R07 `fk_entrega_destinatario` | `entrega_tecnica_notificacao(usuario_destinatario_id)` → `usuario(usuario_id)` | usuario_destinatario_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |
| R08 `fk_entrega_rede` | `entrega_tecnica_notificacao(rede_id)` → `rede_cuidado(rede_id)` | rede_id: NOT NULL | 1 / 0..* | sem chave única limitando essa FK | PASS: ponta e valores correspondem |

**Dependências B:** solicitante/destinatário obrigatórios e respondente opcional foram conferidos em fk_troca_solicitante/destinatario/respondente; responsável de plantão obrigatório, de tarefa/compromisso opcional; executor da conclusão obrigatório. O DB-B não desenha essas linhas externas e avisa a omissão; isso não é erro adicional. Histórico preserva membro anterior/novo opcionais e versão nova.

**C1:** ck_ocorrencia_origem exige tarefa XOR horário. fk_ocorrencia_horario é opcional individualmente. Administração avulsa significa sem ocorrência programada; não significa sem regime: regime_id é NOT NULL. ck_administracao_ocorrencia mantém horario_regime_id e ocorrencia_id ambos nulos ou ambos informados. UNIQUE uq_administracao_ocorrencia_v1 limita execução por ocorrência; NULL permite múltiplas avulsas. A ausência da FK para tarefa no recorte é declarada, não relação inventada.

**C2:** correções têm original obrigatório e autor/versão; não representam UPDATE do original. A imutabilidade operacional não é garantida só por FK/CHECK: o SQL e decisões a atribuem à aplicação. Correção de administração referencia C1 fora da vista. Recomendação.consulta_id é NULL; consulta pode ser independente. Anexo só aponta aos originais, nunca às correções, e exatamente um pai deve ser escolhido (002).

**D:** preferências são opcionais por contexto e só N03/N04 (ck_preferencia_tipo); UNIQUE(rede_id,usuario_id,tipo_evento). Obrigatoriedade do Principal e elegibilidade são regras da aplicação, não permissão criada pela presença de preferência. Entrega aceita N01–N04, com estados PENDENTE/PROCESSANDO/ENTREGUE/CANCELADA/FALHA e UNIQUE(rede_id,tipo_evento,chave_evento,usuario_destinatario_id), prevenindo duplicação por papéis acumulados. Auditoria permite ator/rede/pessoa NULL; resultado PERMITIDO/NEGADO/ERRO; negação deve sobreviver ao rollback do negócio. Idempotência: UNIQUE(rede_id,ator_usuario_id,chave_cliente), hash obrigatório, estados EM_ANDAMENTO/CONCLUIDO/FALHOU. Comparação de hash e serialização são responsabilidade do serviço: a caixa não prova eficácia em execução. As 8 conexões de D são semanticamente corretas; tipo parcial do destinatário é 009.

## 6. Workbench e exportações: origem e fidelidade

Comparação reproduzível em [comparar_sql_mwb.py](evidencias/comparar_sql_mwb.py) (Python + lxml), resultado [sql-mwb-comparacao.json](evidencias/sql-mwb-comparacao.json). Foram comparados nomes, tipos/UNSIGNED, nulidade não gerada, composição de PK/UNIQUE e colunas-alvo das FKs. **34 tabelas, 305 colunas e 79 FKs, sem divergências nesses atributos estruturais.** Não é comparação completa de defaults, expressões geradas, collation ou todas as propriedades de execução. Não foi iniciado banco nem testado DDL em servidor nesta auditoria.

O XML contém zero objetos db.CheckConstraint e SQL contém 50 CHECKs. Ausência no modelo não significa ausência no SQL/servidor. O achado 012 é a promessa de cobertura, não obrigação de desenhar todos os CHECKs.

| Vista | Fonte | Tabelas / FKs no MWB | Importação e apresentação | Resultado |
|---|---|---|---|---|
| EER-A | [SVG integral](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/diagrama_identidade_rede.svg) | 10 / 14 | PNG nativo incorporado; rodapé disputa espaço (008) | FAIL: cardinalidade 003 |
| EER-B | [SVG integral](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/diagrama_agenda_tarefas.svg) | 11 / 30 | Vetores importados; panorama completo; detalhamento exige SVG/zoom | FAIL: cardinalidade 003 |
| EER-C1 | [SVG integral](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/diagrama_medicacao.svg) | 10 / 22 | Vetores importados; panorama completo; detalhamento exige SVG/zoom | FAIL: cardinalidade 003 |
| EER-C2 | [SVG integral](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/diagrama_diario_consultas.svg) | 11 / 25 | Vetores importados; panorama completo; detalhamento exige SVG/zoom | FAIL: cardinalidade 003 |
| EER-D | [SVG integral](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/diagrama_suporte_tecnico.svg) | 10 / 20 | Vetores importados; panorama completo; detalhamento exige SVG/zoom | FAIL: cardinalidade 003 |

As cinco vistas incluem o núcleo usuario/pessoa_idosa/rede_cuidado/membro_rede e fk_rede_pessoa. Identidade/rede inclui também estruturas de acesso; contato/emergência estão na vista suporte técnico, portanto a divisão temática não é cópia exata dos recortes DB. Os nomes das vistas e tabelas são compatíveis com a organização do MWB. Capturas dos frames foram confrontadas com as exportações; não foi observado corte ou distorção global dos panoramas B/C/D. O tamanho local dos grupos vetoriais antes de transformação não prova corte. Não se certifica identidade binária entre SVG e árvore importada: a conferência é estrutural e visual.

A documentação oficial do Workbench informa que `many=false` representa 1:1, e que as opções Mandatory controlam obrigatoriedade nas extremidades: [propriedades](https://dev.mysql.com/doc/workbench/en/wb-connection-properties.html), [editor de relações](https://dev.mysql.com/doc/workbench/en/wb-relationship-editor.html). A inspeção do desenho confirma o pé de galinha indevido em fk_rede_pessoa; os flags não foram usados isoladamente para presumir renderização.

### FKs de maior risco no EER

| FK | Leitura física esperada pai / filha | Motivo | XML |
|---|---|---|---|
| fk_rede_pessoa | 1 / 0..1 | uq_rede_idoso_v1 | many=1; mandatory=1; referencedMandatory=1 |
| fk_pessoa_conta_tipo | 0..1 / 0..1 | uq_pessoa_titular | many=1; mandatory=1; referencedMandatory=1 |
| fk_emergencia_contexto | 1 / 0..1 | uq_emergencia_ficha | many=1; mandatory=1; referencedMandatory=1 |
| fk_conclusao_tarefa | 1 / 0..1 | uq_conclusao_ciclo(rede_id,tarefa_id,ciclo_numero) + ck_conclusao_ciclo: ciclo_numero=1 | many=1; mandatory=1; referencedMandatory=1 |
| fk_administracao_ocorrencia | 0..1 / 0..1 | uq_administracao_ocorrencia_v1 | many=1; mandatory=1; referencedMandatory=1 |
| fk_troca_respondente | 0..1 / 0..* | sem chave única limitando essa FK | many=1; mandatory=1; referencedMandatory=1 |
| fk_anexo_registro | 0..1 / 0..* | sem chave única limitando essa FK | many=1; mandatory=1; referencedMandatory=1 |
| fk_anexo_consulta | 0..1 / 0..* | sem chave única limitando essa FK | many=1; mandatory=1; referencedMandatory=1 |
| fk_anexo_administracao | 0..1 / 0..* | sem chave única limitando essa FK | many=1; mandatory=1; referencedMandatory=1 |
| fk_auditoria_ator | 0..1 / 0..* | sem chave única limitando essa FK | many=1; mandatory=1; referencedMandatory=1 |
| fk_auditoria_rede | 0..1 / 0..* | sem chave única limitando essa FK | many=1; mandatory=1; referencedMandatory=1 |

Apenas presença de UNIQUE em tabela não limita qualquer FK; foram comparadas as colunas da chave. Campos gerados de vínculo vigente limitam episódios ativos, não todo o histórico de membro/papel. A contagem 79 de flags uniformes não significa 79 novos achados: uma correção de propriedades de modelo cobre a causa comum.

### Inventário das 79 FKs: existência e origem conferidas

| FK | Filha(colunas) → pai(colunas) | Pai por filha | Filhas por pai | Estrutura SQL×MWB |
|---|---|---|---|---|
| fk_administracao_autor | administracao_medicamento(autor_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_administracao_executor | administracao_medicamento(rede_id,executor_membro_id) → membro_rede(rede_id,membro_id) | 0..1 | 0..* | PASS |
| fk_administracao_horario | administracao_medicamento(rede_id,regime_id,horario_regime_id) → horario_regime(rede_id,regime_id,horario_id) | 0..1 | 0..* | PASS |
| fk_administracao_ocorrencia | administracao_medicamento(rede_id,horario_regime_id,ocorrencia_id) → ocorrencia_programada(rede_id,horario_regime_id,ocorrencia_id) | 0..1 | 0..1 | PASS |
| fk_administracao_regime | administracao_medicamento(rede_id,regime_id) → regime_medicamento(rede_id,regime_id) | 1 | 0..* | PASS |
| fk_anexo_administracao | anexo(rede_id,administracao_id) → administracao_medicamento(rede_id,administracao_id) | 0..1 | 0..* | PASS |
| fk_anexo_autor | anexo(enviado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_anexo_consulta | anexo(rede_id,consulta_id) → consulta(rede_id,consulta_id) | 0..1 | 0..* | PASS |
| fk_anexo_registro | anexo(rede_id,registro_id) → registro_cuidado(rede_id,registro_id) | 0..1 | 0..* | PASS |
| fk_papel_concedente | atribuicao_papel_familiar(concedido_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_papel_membro_familiar | atribuicao_papel_familiar(rede_id,membro_id,categoria_exigida) → membro_rede(rede_id,membro_id,categoria) | 1 | 0..* | PASS |
| fk_auditoria_ator | auditoria(ator_usuario_id) → usuario(usuario_id) | 0..1 | 0..* | PASS |
| fk_auditoria_pessoa | auditoria(pessoa_idosa_id) → pessoa_idosa(pessoa_idosa_id) | 0..1 | 0..* | PASS |
| fk_auditoria_rede | auditoria(rede_id) → rede_cuidado(rede_id) | 0..1 | 0..* | PASS |
| fk_compromisso_contexto | compromisso(rede_id,pessoa_idosa_id) → rede_cuidado(rede_id,pessoa_idosa_id) | 1 | 0..* | PASS |
| fk_compromisso_criador | compromisso(criado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_compromisso_responsavel | compromisso(rede_id,responsavel_membro_id) → membro_rede(rede_id,membro_id) | 0..1 | 0..* | PASS |
| fk_conclusao_autor | conclusao_tarefa(autor_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_conclusao_executor | conclusao_tarefa(rede_id,executor_membro_id) → membro_rede(rede_id,membro_id) | 1 | 0..* | PASS |
| fk_conclusao_tarefa | conclusao_tarefa(rede_id,tarefa_id) → tarefa(rede_id,tarefa_id) | 1 | 0..1 | PASS |
| fk_consulta_autor | consulta(autor_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_consulta_compromisso | consulta(rede_id,compromisso_id) → compromisso(rede_id,compromisso_id) | 0..1 | 0..* | PASS |
| fk_consulta_contexto | consulta(rede_id,pessoa_idosa_id) → rede_cuidado(rede_id,pessoa_idosa_id) | 1 | 0..* | PASS |
| fk_contato_autor | contato_importante(registrado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_contato_contexto | contato_importante(rede_id,pessoa_idosa_id) → rede_cuidado(rede_id,pessoa_idosa_id) | 1 | 0..* | PASS |
| fk_convite_cuidador_emitente | convite_cadastro_cuidador(emitido_por_usuario_id) → usuario(usuario_id) | 0..1 | 0..* | PASS |
| fk_correcao_administracao | correcao_administracao_medicamento(rede_id,administracao_id) → administracao_medicamento(rede_id,administracao_id) | 1 | 0..* | PASS |
| fk_correcao_administracao_autor | correcao_administracao_medicamento(autor_correcao_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_correcao_consulta | correcao_consulta(rede_id,consulta_id) → consulta(rede_id,consulta_id) | 1 | 0..* | PASS |
| fk_correcao_consulta_autor | correcao_consulta(autor_correcao_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_correcao_registro | correcao_registro_cuidado(rede_id,registro_id) → registro_cuidado(rede_id,registro_id) | 1 | 0..* | PASS |
| fk_correcao_registro_autor | correcao_registro_cuidado(autor_correcao_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_entrega_destinatario | entrega_tecnica_notificacao(usuario_destinatario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_entrega_rede | entrega_tecnica_notificacao(rede_id) → rede_cuidado(rede_id) | 1 | 0..* | PASS |
| fk_habilitacao_pessoa_titular | habilitacao_acesso_idoso(pessoa_idosa_id,usuario_titular_id) → pessoa_idosa(pessoa_idosa_id,usuario_titular_id) | 1 | 0..* | PASS |
| fk_habilitacao_solicitante | habilitacao_acesso_idoso(solicitada_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_habilitacao_titular | habilitacao_acesso_idoso(usuario_titular_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_historico_ator | historico_plantao(operado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_historico_membro_antes | historico_plantao(rede_id,membro_anterior_id) → membro_rede(rede_id,membro_id) | 0..1 | 0..* | PASS |
| fk_historico_membro_depois | historico_plantao(rede_id,membro_novo_id) → membro_rede(rede_id,membro_id) | 0..1 | 0..* | PASS |
| fk_historico_plantao | historico_plantao(rede_id,plantao_id) → plantao(rede_id,plantao_id) | 1 | 0..* | PASS |
| fk_horario_regime | horario_regime(rede_id,regime_id) → regime_medicamento(rede_id,regime_id) | 1 | 0..* | PASS |
| fk_idempotencia_ator | idempotencia_comando(ator_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_idempotencia_rede | idempotencia_comando(rede_id) → rede_cuidado(rede_id) | 1 | 0..* | PASS |
| fk_emergencia_autor | informacao_emergencia(atualizado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_emergencia_contexto | informacao_emergencia(rede_id,pessoa_idosa_id) → rede_cuidado(rede_id,pessoa_idosa_id) | 1 | 0..1 | PASS |
| fk_medicamento_autor | medicamento(cadastrado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_medicamento_contexto | medicamento(rede_id,pessoa_idosa_id) → rede_cuidado(rede_id,pessoa_idosa_id) | 1 | 0..* | PASS |
| fk_membro_rede | membro_rede(rede_id) → rede_cuidado(rede_id) | 1 | 0..* | PASS |
| fk_membro_usuario_tipo | membro_rede(usuario_id,tipo_usuario_exigido) → usuario(usuario_id,tipo_acesso) | 1 | 0..* | PASS |
| fk_membro_vinculador | membro_rede(vinculado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_ocorrencia_designado | ocorrencia_programada(rede_id,responsavel_membro_id) → membro_rede(rede_id,membro_id) | 0..1 | 0..* | PASS |
| fk_ocorrencia_horario | ocorrencia_programada(rede_id,horario_regime_id) → horario_regime(rede_id,horario_id) | 0..1 | 0..* | PASS |
| fk_ocorrencia_rede | ocorrencia_programada(rede_id) → rede_cuidado(rede_id) | 1 | 0..* | PASS |
| fk_ocorrencia_tarefa | ocorrencia_programada(rede_id,tarefa_id) → tarefa(rede_id,tarefa_id) | 0..1 | 0..* | PASS |
| fk_pessoa_cadastrante | pessoa_idosa(cadastrado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_pessoa_conta_tipo | pessoa_idosa(usuario_titular_id,tipo_titular_exigido) → usuario(usuario_id,tipo_acesso) | 0..1 | 0..1 | PASS |
| fk_plantao_criador | plantao(criado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_plantao_membro | plantao(rede_id,membro_responsavel_id) → membro_rede(rede_id,membro_id) | 1 | 0..* | PASS |
| fk_plantao_rede | plantao(rede_id) → rede_cuidado(rede_id) | 1 | 0..* | PASS |
| fk_preferencia_rede | preferencia_notificacao(rede_id) → rede_cuidado(rede_id) | 1 | 0..* | PASS |
| fk_preferencia_usuario | preferencia_notificacao(usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_recomendacao_autor | recomendacao(autor_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_recomendacao_consulta | recomendacao(rede_id,consulta_id) → consulta(rede_id,consulta_id) | 0..1 | 0..* | PASS |
| fk_recomendacao_contexto | recomendacao(rede_id,pessoa_idosa_id) → rede_cuidado(rede_id,pessoa_idosa_id) | 1 | 0..* | PASS |
| fk_rede_criador | rede_cuidado(criada_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_rede_pessoa | rede_cuidado(pessoa_idosa_id) → pessoa_idosa(pessoa_idosa_id) | 1 | 0..1 | PASS |
| fk_regime_autor | regime_medicamento(criado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_regime_medicamento | regime_medicamento(rede_id,medicamento_id) → medicamento(rede_id,medicamento_id) | 1 | 0..* | PASS |
| fk_registro_autor | registro_cuidado(autor_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_registro_contexto | registro_cuidado(rede_id,pessoa_idosa_id) → rede_cuidado(rede_id,pessoa_idosa_id) | 1 | 0..* | PASS |
| fk_sessao_usuario | sessao_usuario(usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_troca_destinatario | solicitacao_troca_plantao(rede_id,destinatario_membro_id) → membro_rede(rede_id,membro_id) | 1 | 0..* | PASS |
| fk_troca_plantao | solicitacao_troca_plantao(rede_id,plantao_id) → plantao(rede_id,plantao_id) | 1 | 0..* | PASS |
| fk_troca_respondente | solicitacao_troca_plantao(rede_id,respondido_por_membro_id) → membro_rede(rede_id,membro_id) | 0..1 | 0..* | PASS |
| fk_troca_solicitante | solicitacao_troca_plantao(rede_id,solicitante_membro_id) → membro_rede(rede_id,membro_id) | 1 | 0..* | PASS |
| fk_tarefa_criador | tarefa(criado_por_usuario_id) → usuario(usuario_id) | 1 | 0..* | PASS |
| fk_tarefa_rede | tarefa(rede_id) → rede_cuidado(rede_id) | 1 | 0..* | PASS |
| fk_tarefa_responsavel | tarefa(rede_id,responsavel_membro_id) → membro_rede(rede_id,membro_id) | 0..1 | 0..* | PASS |

## 7. Rastreabilidade dos 17 cenários prioritários

CA: os critérios são os promovidos por ACCEPTANCE_CRITERIA.yaml em 2026-09-15; o arquivo DRAFT é snapshot histórico, não fonte de nova aprovação. A auditoria leu os critérios preservados e o registry de promoção; não revalidou cada comentário remoto de Issue. RF/US de cada cenário vêm dos contratos e USER_STORIES_INDEX, sem inventar cobertura em SQ não selecionado. Protótipo: arquivo indicado pelo usuário, página Fluxo Final 5926:1014; variantes somente de leitura são consideradas, sem assumir outro arquivo corrigido.

| Cenário | RF/US/critério essencial | UC / classe / sequência | Persistência | Protótipo e conclusão cruzada |
|---|---|---|---|---|
| 1 Cadastro e formação | RF01/03; US001/003: cadastro não concede papel; contexto de cuidado | UC01 U01/U03; Usuario/PessoaIdosa/RedeCuidado; SQ01 só autenticação | usuario/pessoa_idosa/rede_cuidado; DB001/002 | T02 5926:1070; T12 5926:2126 e cadastro 5926:35570. Correspondência estática; elegibilidade/atomicidade não demonstradas por tela. |
| 2 Vínculo/desvínculo | RF04 US005/006: retirar acesso futuro, manter histórico | UC01 U05/U06; MembroRede; fora dos SQ escolhidos | membro_rede.desvinculado_em e episódios | T13 5926:2160; vincular 5926:35780/desvincular 5926:36258. PASS conceitual; revogação real não testada. |
| 3 Transferência Principal | RF05 US007/RN001: exatamente um, transferência atômica | UC01 U08 independente; AtribuicaoPapelFamiliar; sem SQ dedicado | papel vigente + decisão transacional DB004 | T13 transferência 5926:36086 e concluída 5926:36186. PASS conceitual; telas não provam transação. |
| 4 Autenticação/contexto | RF02/30 RNF01 US002/036: identidade não dá acesso irrestrito | UC01 U02/U11; CL01 + SQ01 | usuario, sessao_usuario, vínculo, auditoria | T01 5926:1016; inválidas 5926:32076; read-only T03–T15. FAIL cruzado responsabilidade 005; ordem SQ preservada. |
| 5 Criar/atribuir plantão | RF06/08 US008/011: intervalo e responsável elegível | UC02 U12/U15; Plantao/Membro; SQ02 somente troca | plantao.membro_responsavel_id NOT NULL; histórico | T04 5926:1261 mostra escala; criação/atribuição navegáveis não demonstradas. PENDENTE DE EVIDÊNCIA. |
| 6 Solicitar troca | RF09 US012: pedido vinculado ao plantão | UC02 U16; SolicitacaoTrocaPlantao; SQ02 M01–M06 | fk_troca_plantao/solicitante/destinatario | T04: nenhum destino de troca nas actions lidas. FAIL CL02-001; elo UI pendente 013. |
| 7 Aceitar/recusar | RF09/10 US013/014: só aceite altera e N01 | UC02 U17; SQ02 M07–M11 | status/versao_plantao_esperada, histórico, entrega | Recusa representada no SQ sem alteração; resposta UI não demonstrada. FAIL 006/013. |
| 8 Tarefa/conclusão | RF21 US024/025: responsável conclui | UC02 U20/U21; Tarefa/Conclusao; SQ não selecionado | uq_conclusao_ciclo + ciclo=1 | T09 5926:1886, concluída 5926:34858; criação 5974:6252. PASS conceitual; persistência não executada. |
| 9 Medicamento/regime | RF14/15 US017/018: posologia e horários contextualizados | UC03 U24/U25; Medicamento/Regime/Horario | regime_medicamento/horario_regime | T08 criar 5967:6307 existe; regime/horários não demonstrados. PENDENTE 013. |
| 10 Administração realizada | RF16 US019: autoria/data/hora e imutabilidade | UC03 U26; AdministracaoMedicamento; SQ03 | realizada_em distinta de registrada_em | T05 5926:1420 distingue 08:05 e registro08:07; ação de registrar ausente nos destinos T08 lidos. Lógica positiva/negativa SQ PASS; notação/assinatura FAIL 004/010; UI pendente. |
| 11 Administração avulsa | DB021: sem ocorrência; regime obrigatório | CL03 R04; SQ03 valida dados opcionais, sem opt artificial | ocorrencia/horario NULL em conjunto; regime_id NOT NULL | Nenhum fluxo avulso demonstrado. PENDENTE; não equivale a administração sem medicamento/regime. |
| 12 Histórico/correções | RF12 RNF02 US016/034: nova versão, mesmo escopo de escrita | UC03 U23/U36; Registro/Correcao; nota SQ03 | correções tipadas e originais preservados | T07 5926:1712, correção 5926:33852/33928; CSV 34020/34110. PASS conceitual. Código de imutabilidade não auditado. |
| 13 Consulta/recomendação | RF19 US022; DB009: recomendação pode ser independente | UC03 U29; Consulta/Recomendacao; R06 omitida por contrato | consulta, recomendacao.consulta_id NULL | T10 5926:1993 e overlay 5974:35902. PASS correspondência geral; associação CL06 não deve ser inventada. |
| 14 Anexos | RF23 US027: pai compatível e mesma autorização | UC03 U30; CL03 R07–R09 XOR | anexo e ck_anexo_pai | T10 overlay 5974:35996; três tipos de pai não demonstrados integralmente. FAIL DB-C2 002; cobertura específica pendente. |
| 15 Auditoria de negadas | RNF01/03 US035: bloquear antes do recurso e registrar | UC03 NT04; SQ01 M05/M06; Auditoria transversal | auditoria NULL contexto permitido; retenção fora rollback | T17 5926:2379, detalhe36946/forbidden37017. PASS lógica SQ; assinatura 010. Runtime não testado. |
| 16 Preferências/notificações | RF10/17/25/26/27 US014/020/029/030/031: obrigatórias preservadas | UC02 N01; UC03 N02–N04/U33; notas SQ02/SQ03 | preferencia N03/N04; entrega N01–N04, unique destinatário | T16 5926:2310; feedback 5941:5280/5316/5352. PASS correspondência estática; entrega e elegibilidade não certificadas por tela. |
| 17 Idempotência | DB020/028/032 e restrições V1; sem US nova inventada | Governança transversal; não exigir nova classe/caso/SQ | idempotencia_comando UNIQUE ator/rede/chave + payload; dedup administra/conclusao/entrega | Sem ação de usuário independente esperada; UI não prova prevenção. SQL estrutural PASS; comportamento concorrente NÃO AUDITADO. |

## 8. Apresentação e limites de encerramento

Todos os 19 frames têm 1920×1080. Capturas reais mostram base clara, azul institucional, hierarquia e títulos/IDs correspondentes. A tipografia registrada/identidade é Geist, com textos técnicos menores nos diagramas densos. Não houve ensaio em projetor: adequação perceptiva em sala fica sujeita à revisão humana. Não foi detectada inversão adicional apenas por valores visualmente isolados. As cardinalidades foram lidas junto às entidades e aos trajetos.

EERs são panoramas: não se promete leitura de todos os campos no slide. Fontes integrais permanecem no repositório. Duplicação física de usuario/rede não foi inferida das caixas repetidas de referência no DB-D. Versões antigas: inventário da página comprova 4 frames A antigos na mesma faixa; manter os IDs atuais da matriz e arquivar/ocultar os antigos somente após autorização (011).

| Critério de encerramento solicitado | Estado / limite |
|---|---|
| 19 artefatos examinados | Concluído: 19 capturas + nós + leitura por domínio |
| UC associações | Concluído: 35 associações, destinos e papéis |
| CL associações/multiplicidades | Concluído: 24 relações e omissões R06/R10 justificadas |
| SQ mensagens/guardas | Concluído: 24 mensagens lógicas, participantes e alternativas; erros catalogados |
| 5 DB × SQL | Concluído: todos os campos exibidos e 28 relações |
| 5 EER × origem/SQL/MWB | Concluído no nível estrutural/visual descrito; não certificação completa de execução DDL |
| Regras críticas e dependências | Concluído: 17 cenários; falhas e limites explícitos |
| RF/US/CA/protótipo | Avaliado; cobertura navegável parcial, PE02/013 pendentes |
| Evidências/correções/resultados | Concluído: matriz, catálogo e capturas |
| Homologação acadêmica formal | PENDENTE: rubrica efetiva e revisão humana; não concedida |

A auditoria encerra com diagnóstico utilizável e pendências identificadas, não com declaração de cumprimento integral dos fluxos não demonstrados. Nenhuma limitação foi convertida em PASS implícito.
