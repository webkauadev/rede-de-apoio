# Catálogo de inconsistências e correções — Milestone 2

Data: 2026-10-16. Base documental: `88302e793d7a29cd60cad60483c6aaca357113e1`. Estado: diagnóstico; nenhuma correção aplicada.

13 achados agrupados: **0 P0, 7 P1, 6 P2, 0 P3**. As pendências não equivalem a defeitos de implementação. P1 impede homologação. Cada ID representa uma causa/correção comum, mesmo que afete vários frames.

## AUD-M2-001 — P1 — Multiplicidades invertidas nos três papéis da troca

- **Domínio / diagramas / Node IDs:** B / CL-02 / `6263:3484`
- **Origem:** [REQUISITO] [PERSISTENCIA] [ACADEMICO]
- **Elemento:** CL02-R03a/R03b/R03c; rótulos 6263:3646–3651; linhas 6263:3581–3583
- **Situação encontrada:** Junto a MembroRede consta 0..*; junto a SolicitacaoTrocaPlantao constam 1, 1 e 0..1. Leitura encontrada: cada solicitação admite zero ou muitos membros em cada papel; cada membro está limitado a uma solicitação como solicitante/destinatário e a zero ou uma como respondente.
- **Situação esperada:** R03a/b: SolicitacaoTrocaPlantao [0..*] — [1] MembroRede. Cada solicitação tem um solicitante e um destinatário; cada membro pode participar de muitas solicitações. R03c: SolicitacaoTrocaPlantao [0..*] — [0..1] MembroRede. Cada solicitação tem zero ou um respondente; cada membro pode responder a muitas. SQL: solicitante_membro_id e destinatario_membro_id NOT NULL; respondido_por_membro_id NULL; FKs compostas (rede_id, membro) para membro_rede(rede_id,membro_id), sem UNIQUE limitando o membro a uma solicitação.
- **Impacto e justificativa da criticidade:** Inverte o modelo de participação, não é mero deslocamento estético.
- **Correção mínima recomendada:** Trocar os valores de extremidade dessas três relações e manter os papéis separados. Não alterar o SQL.
- **Validação humana / dependência:** Não para a leitura UML; revisão humana da correção antes da homologação.
- **Critério objetivo de resolução:** Ler as três relações nos dois sentidos e reproduzir exatamente as seis multiplicidades esperadas.
- **Fonte documental:** [docs/uml/especificacao-para-figma/dominio-B-organizacao/CL-02.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-B-organizacao/CL-02.md); [entrega/sql-eer/01_schema_completo_v1.sql](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/01_schema_completo_v1.sql)
- **Evidência Figma:** [CL-02 — 6263:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484); [captura](evidencias/6263-3484.png); [nós](evidencias/6263-3484.json)

## AUD-M2-002 — P1 — Anexo indevidamente obrigado a ter RegistroCuidado

- **Domínio / diagramas / Node IDs:** C / DB-C2 / `6276:3484`
- **Origem:** [PERSISTENCIA] [REQUISITO]
- **Elemento:** R03; rótulo 6277:32767; anexo.registro_id
- **Situação encontrada:** A relação exibe registro_cuidado [1] — [0..*] anexo, embora a própria tabela exiba registro_id NULL. Leitura: cada anexo precisa de um registro; um registro pode ter muitos anexos.
- **Situação esperada:** registro_cuidado [0..1] — [0..*] anexo. Cada anexo pode ter zero ou um registro por essa FK; cada registro pode ter zero ou muitos anexos. fk_anexo_registro: (rede_id,registro_id) → registro_cuidado(rede_id,registro_id); registro_id BIGINT UNSIGNED NULL. ck_anexo_pai obriga exatamente UM dos três IDs registro/consulta/administração. Um anexo de consulta não exige registro de diário.
- **Impacto e justificativa da criticidade:** Contradiz a exclusividade dos pais e o CL-03; exclui conceitualmente anexos válidos de consulta/administração.
- **Correção mínima recomendada:** Alterar somente a multiplicidade próxima de registro_cuidado para 0..1, preservando a nota de exclusividade.
- **Validação humana / dependência:** Não para a cardinalidade; conferir visualmente depois.
- **Critério objetivo de resolução:** Os três caminhos de pai têm máximo um e mínimo zero individualmente, sujeitos ao XOR global; exemplo de anexo só de consulta é representável.
- **Fonte documental:** [entrega/sql-eer/01_schema_completo_v1.sql](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/01_schema_completo_v1.sql); [docs/uml/especificacao-para-figma/dominio-C-registros/CL-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/CL-03.md)
- **Evidência Figma:** [DB-C2 — 6276:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484); [captura](evidencias/6276-3484.png); [nós](evidencias/6276-3484.json)

## AUD-M2-003 — P1 — Cardinalidades nativas do Workbench não refletem UNIQUE e nulidade

- **Domínio / diagramas / Node IDs:** A / EER-A / `6238:3578`; B / EER-B / `6268:3484`; C / EER-C1 / `6278:3484`; C / EER-C2 / `6278:3565`; D / EER-D / `6288:3484`
- **Origem:** [PERSISTENCIA]
- **Elemento:** fk_rede_pessoa, comum às cinco vistas; demais FKs enumeradas no caderno
- **Situação encontrada:** No XML do .mwb, as 79 FKs têm many=1, mandatory=1 e referencedMandatory=1. A exportação mostra pé de galinha na extremidade rede_cuidado de fk_rede_pessoa. A conferência visual da exportação identidade_rede confirma a marca de muitos; todas as cinco vistas contêm essa FK. O problema já está na fonte nativa, não foi causado pela importação Figma.
- **Situação esperada:** Cada rede pertence a exatamente uma pessoa; cada pessoa tem zero ou uma rede V1: pessoa_idosa [1] — [0..1] rede_cuidado. rede_cuidado.pessoa_idosa_id é NOT NULL e UNIQUE uq_rede_idoso_v1(pessoa_idosa_id). A presença de uq_rede_pessoa(rede_id,pessoa_idosa_id), sozinha, não provaria esse máximo. FKs anuláveis, como anexo.registro_id e auditoria.ator_usuario_id, não tornam obrigatório o pai individual. Consultar o inventário XML/SQL para cada caso.
- **Impacto e justificativa da criticidade:** Uma exportação fiel de um modelo graficamente incorreto continua transmitindo relações incorretas; afeta os cinco EER.
- **Correção mínima recomendada:** Em rodada autorizada, revisar propriedades de cardinalidade/obrigatoriedade no modelo e reexportar as cinco vistas, preservando o DDL homologado. Se o Workbench não representar uma restrição, explicitá-la em nota em vez de afirmar fidelidade integral.
- **Validação humana / dependência:** Sim: revisão do responsável pelo modelo e autorização para alterar apenas a representação; não executar nesta missão.
- **Critério objetivo de resolução:** fk_rede_pessoa mostra máximo um na extremidade rede; FKs opcionais e máximos únicos revisados individualmente; comparação estrutural com SQL continua sem divergência.
- **Fonte documental:** [entrega/sql-eer/01_schema_completo_v1.sql](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/01_schema_completo_v1.sql); [entrega/sql-eer/rede_de_apoio_v1.mwb](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/rede_de_apoio_v1.mwb); [entrega/sql-eer/diagrama_identidade_rede.svg](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/diagrama_identidade_rede.svg)
- **Evidência Figma:** [EER-A — 6238:3578](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6238-3578); [captura](evidencias/6238-3578.png); [nós](evidencias/6238-3578.json); [EER-B — 6268:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6268-3484); [captura](evidencias/6268-3484.png); [nós](evidencias/6268-3484.json); [EER-C1 — 6278:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3484); [captura](evidencias/6278-3484.png); [nós](evidencias/6278-3484.json); [EER-C2 — 6278:3565](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6278-3565); [captura](evidencias/6278-3565.png); [nós](evidencias/6278-3565.json); [EER-D — 6288:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6288-3484); [captura](evidencias/6288-3484.png); [nós](evidencias/6288-3484.json)

Evidência adicional de AUD-M2-003: [detalhe da exportação original](evidencias/eer-identidade-detalhe-fonte.png), recorte superior do PNG `entrega/sql-eer/diagrama_identidade_rede.png`. A cardinalidade de rede aparece junto à caixa rede_cuidado.

## AUD-M2-004 — P1 — Chamadas síncronas desenhadas com ponta aberta

- **Domínio / diagramas / Node IDs:** A / SQ-01 / `6257:3484`; B / SQ-02 / `6265:3484`; C / SQ-03 / `6273:3484`
- **Origem:** [ACADEMICO] [REQUISITO]
- **Elemento:** SQ01 M01/M02/M04/M05; SQ02 M01/M02/M03/M07/M08/M09/M10; SQ03 M01/M02/M03
- **Situação encontrada:** As chamadas usam chevron aberto, como os retornos. Exemplo verificável: 6257:3738, vetor M 0 0 L 10 6 L 0 12, fills=[]; 6257:3741 repete a construção. Legendas dizem chamada síncrona. M05 de criação em SQ02 também diverge da ponta cheia expressamente prescrita pelo contrato.
- **Situação esperada:** Chamadas síncronas comuns com linha contínua e ponta triangular preenchida; retornos tracejados com ponta aberta. Criação deve conservar chegada à cabeça de P05 e início da vida nesse ponto; revisar sua convenção específica com o professor, sem classificá-la automaticamente como chamada comum.
- **Impacto e justificativa da criticidade:** Símbolo de mensagem incompatível com o tipo declarado em todos os roteiros.
- **Correção mínima recomendada:** Corrigir pontas das chamadas síncronas e a legenda. Preservar retornos e a criação temporal de SQ02.
- **Validação humana / dependência:** Não para chamadas síncronas comuns; sim para confirmar a convenção didática da mensagem de criação.
- **Critério objetivo de resolução:** Pontas preenchidas nas chamadas comuns listadas, retornos tracejados distintos, sem mudar direção, ordem ou guardas.
- **Fonte documental:** [docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md); [docs/uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md); [docs/uml/especificacao-para-figma/dominio-C-registros/SQ-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/SQ-03.md); [docs/uml/diretrizes-professor.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/diretrizes-professor.md)
- **Evidência Figma:** [SQ-01 — 6257:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484); [captura](evidencias/6257-3484.png); [nós](evidencias/6257-3484.json); [SQ-02 — 6265:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484); [captura](evidencias/6265-3484.png); [nós](evidencias/6265-3484.json); [SQ-03 — 6273:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6273-3484); [captura](evidencias/6273-3484.png); [nós](evidencias/6273-3484.json)

## AUD-M2-005 — P1 — Autenticação atribuída simultaneamente à entidade e ao serviço

- **Domínio / diagramas / Node IDs:** A / CL-01 / `6255:3484`; A / SQ-01 / `6257:3484`
- **Origem:** [INFERENCIA] [REQUISITO]
- **Elemento:** Usuario.autenticar(): ResultadoAutenticacao; nó 6255:3605
- **Situação encontrada:** CL-01 contém + autenticar(): ResultadoAutenticacao. SQ-01 atribui autenticar(credenciais) ao Serviço de Autenticação; seu contrato declara expressamente que não é operação de Usuario. A incompatibilidade já existe entre os contratos, não é desvio exclusivo do desenho.
- **Situação esperada:** Uma responsabilidade coerente e documentada. O contrato de CL-01 marca essa operação como INFERENCIA de RF02, portanto ela não pode prevalecer sobre a separação explicitada no SQ-01.
- **Impacto e justificativa da criticidade:** O leitor não consegue determinar qual participante realiza a autenticação nem como a operação da entidade participa do fluxo.
- **Correção mínima recomendada:** Reconciliar a inferência do CL-01 com o serviço já previsto no SQ-01; retirar ou justificar a operação na entidade e atualizar o contrato correspondente após decisão.
- **Validação humana / dependência:** Sim: escolha de modelagem e atualização do contrato; não inventar nova classe de domínio.
- **Critério objetivo de resolução:** Contrato CL-01 e roteiro SQ-01 deixam de afirmar responsabilidades incompatíveis; receptor da mensagem é o responsável definido.
- **Fonte documental:** [docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md); [docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md)
- **Evidência Figma:** [CL-01 — 6255:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484); [captura](evidencias/6255-3484.png); [nós](evidencias/6255-3484.json); [SQ-01 — 6257:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484); [captura](evidencias/6257-3484.png); [nós](evidencias/6257-3484.json)

## AUD-M2-006 — P1 — Resposta à troca não demonstra proteção contra versão obsoleta

- **Domínio / diagramas / Node IDs:** B / SQ-02 / `6265:3484`
- **Origem:** [REQUISITO]
- **Elemento:** M08 → M09 aceitar/recusar → M10 atribuirResponsavel; alt F01
- **Situação encontrada:** Após processarResposta(decisao), as únicas guardas são decisão=aceitar/recusar. M03/M04 consultam o contexto antes da criação do pedido; não há guarda, nota ou caminho de conflito na resposta. A responsabilidade textual do serviço menciona versão, mas não mostra quando o resultado é validado.
- **Situação esperada:** DB-006 determina aceitar/recusar com versão esperada e conflito 409 se stale. A validação deve anteceder a aplicação da decisão e a mudança do responsável. Uma pré-condição de vínculo na solicitação não demonstra revalidação no instante da resposta.
- **Impacto e justificativa da criticidade:** O roteiro não distingue decisão válida de resposta a plantão alterado concorrentemente. Não se afirma uma vulnerabilidade do backend: o achado é insuficiência do modelo de execução.
- **Correção mínima recomendada:** Acrescentar condição explícita de versão/contexto válidos na resposta e resultado de conflito sem M09/M10/N01; documentar atomicidade da mudança. A alteração exige revisão do contrato, sem novas lifelines obrigatórias.
- **Validação humana / dependência:** Sim: aprovar o ajuste do roteiro seletivo e a representação do caminho de conflito.
- **Critério objetivo de resolução:** Um pedido criado em versão v não pode alterar plantão em v+1; caminho obsoleto é reconhecível e não emite N01 nem muda responsável.
- **Fonte documental:** [docs/uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md); [docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md); [docs/02_BUSINESS_RULES/PERMISSIONS_MATRIX.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/02_BUSINESS_RULES/PERMISSIONS_MATRIX.md)
- **Evidência Figma:** [SQ-02 — 6265:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484); [captura](evidencias/6265-3484.png); [nós](evidencias/6265-3484.json)

## AUD-M2-007 — P1 — Telefone opcional de ContatoImportante incompatível com persistência

- **Domínio / diagramas / Node IDs:** A / CL-01 / `6255:3484`
- **Origem:** [PERSISTENCIA] [INFERENCIA]
- **Elemento:** ContatoImportante.telefone: String [0..1]
- **Situação encontrada:** O CL-01 admite ausência de telefone. contato_importante.telefone é VARCHAR(32) NOT NULL. O modelo não diferencia contato em preparação de contato válido persistido.
- **Situação esperada:** Uma instância persistível deve fornecer telefone; se a opcionalidade representar estado transitório, essa condição e sua validação precisam estar documentadas. US-026, por si, não estabelece telefone opcional.
- **Impacto e justificativa da criticidade:** Estado admitido pelo modelo de domínio não possui representação persistente equivalente sem decisão adicional.
- **Correção mínima recomendada:** Alinhar a multiplicidade do atributo à V1 ou explicitar o estado transitório e a validação antes de persistir. Não relaxar a coluna SQL.
- **Validação humana / dependência:** Sim: esclarecer intenção do atributo opcional; a nulidade física é comprovada.
- **Critério objetivo de resolução:** Nenhum contato tratado como válido/persistido é modelado sem telefone, ou a fronteira de validação fica expressa.
- **Fonte documental:** [docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md); [entrega/sql-eer/01_schema_completo_v1.sql](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/01_schema_completo_v1.sql); [docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml)
- **Evidência Figma:** [CL-01 — 6255:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484); [captura](evidencias/6255-3484.png); [nós](evidencias/6255-3484.json)

## AUD-M2-008 — P2 — Rotas e rótulos prejudicam a leitura inequívoca

- **Domínio / diagramas / Node IDs:** B / UC-02 / `6262:3484`; C / UC-03 / `6270:3484`; A / CL-01 / `6255:3484`; B / CL-02 / `6263:3484`; C / CL-03 / `6272:3484`; A / EER-A / `6238:3578`
- **Origem:** [ACADEMICO] [INFERENCIA]
- **Elemento:** UC02-C10; UC03-C01/C04/C10/C18; CL01-R05; CL02-R04/R06; cadeia superior de CL03; rodapé EER-A
- **Situação encontrada:** UC02-C10 cruza a elipse de compromisso; rotas UC03 atravessam elipses intermediárias. Os destinos finais são os previstos, mas as passagens sugerem vínculos extras. CL01-R05 comprime multiplicidades em vão curto; atributos quebram perto de divisórias. CL02-R04 inicia 15 px abaixo da caixa de MembroRede (fim y571; linha y586); R06 disputa espaço com Tarefa. CL03 comprime rótulos/multiplicidades entre caixas. EER-A tem texto do rodapé sobreposto à parte inferior da imagem.
- **Situação esperada:** Rotas fora de elementos não relacionados, pontas ancoradas nos contornos, multiplicidades próximas apenas da extremidade correspondente e rodapé fora da exportação.
- **Impacto e justificativa da criticidade:** Aumenta risco de leitura falsa em apresentação, mesmo onde os valores e destinos estão corretos. Não é contagem de associações adicionais.
- **Correção mínima recomendada:** Reencaminhar só os segmentos afetados, ampliar vãos e reposicionar rótulos/rodapé; manter associações e conteúdo.
- **Validação humana / dependência:** Revisão visual humana em projeção recomendada.
- **Critério objetivo de resolução:** Nenhuma linha cruza elipse/caixa alheia; R04 toca MembroRede; rótulos e rodapé não encobrem conteúdo.
- **Fonte documental:** [docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md); [docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md); [docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md); [docs/uml/especificacao-para-figma/dominio-B-organizacao/CL-02.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-B-organizacao/CL-02.md); [docs/uml/especificacao-para-figma/dominio-C-registros/CL-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/CL-03.md)
- **Evidência Figma:** [UC-02 — 6262:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6262-3484); [captura](evidencias/6262-3484.png); [nós](evidencias/6262-3484.json); [UC-03 — 6270:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6270-3484); [captura](evidencias/6270-3484.png); [nós](evidencias/6270-3484.json); [CL-01 — 6255:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484); [captura](evidencias/6255-3484.png); [nós](evidencias/6255-3484.json); [CL-02 — 6263:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484); [captura](evidencias/6263-3484.png); [nós](evidencias/6263-3484.json); [CL-03 — 6272:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6272-3484); [captura](evidencias/6272-3484.png); [nós](evidencias/6272-3484.json); [EER-A — 6238:3578](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6238-3578); [captura](evidencias/6238-3578.png); [nós](evidencias/6238-3578.json)

## AUD-M2-009 — P2 — Tipos físicos omitem UNSIGNED sem convenção explícita

- **Domínio / diagramas / Node IDs:** A / DB-A / `6259:3484`; B / DB-B / `6266:3484`; C / DB-C1 / `6275:3484`; C / DB-C2 / `6276:3484`; D / DB-D / `6287:3485`
- **Origem:** [PERSISTENCIA]
- **Elemento:** Campos BIGINT/INT discriminados no caderno de campos
- **Situação encontrada:** Exibem BIGINT ou INT onde o SQL especifica BIGINT UNSIGNED/INT UNSIGNED, enquanto outros campos do mesmo slide exibem o modificador. Exemplos: pessoa_idosa_id em DB-A, versao_plantao_esperada em DB-B, versao_plano em DB-C1 e usuario_destinatario_id em DB-D (6287:3622).
- **Situação esperada:** Todo tipo físico exibido deve ser exato ou ter abreviação inequívoca declarada. Campo omitido é simplificação legítima; um tipo parcial apresentado ao lado de tipos completos é ambíguo.
- **Impacto e justificativa da criticidade:** Sugere domínio numérico com sinal diferente da fonte canônica; prejudica comparação FK/PK.
- **Correção mínima recomendada:** Exibir UNSIGNED nos campos afetados ou declarar convenção única e inequívoca que preserve a informação física.
- **Validação humana / dependência:** Não: comparação textual objetiva.
- **Critério objetivo de resolução:** Todos os tipos explícitos conferem com o SQL ou seguem convenção documentada sem exceções implícitas.
- **Fonte documental:** [entrega/sql-eer/01_schema_completo_v1.sql](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/01_schema_completo_v1.sql)
- **Evidência Figma:** [DB-A — 6259:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6259-3484); [captura](evidencias/6259-3484.png); [nós](evidencias/6259-3484.json); [DB-B — 6266:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6266-3484); [captura](evidencias/6266-3484.png); [nós](evidencias/6266-3484.json); [DB-C1 — 6275:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6275-3484); [captura](evidencias/6275-3484.png); [nós](evidencias/6275-3484.json); [DB-C2 — 6276:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484); [captura](evidencias/6276-3484.png); [nós](evidencias/6276-3484.json); [DB-D — 6287:3485](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6287-3485); [captura](evidencias/6287-3485.png); [nós](evidencias/6287-3485.json)

## AUD-M2-010 — P2 — Assinaturas abreviadas não reconciliadas entre classes e sequências

- **Domínio / diagramas / Node IDs:** C / CL-03 / `6272:3484`; A / SQ-01 / `6257:3484`; C / SQ-03 / `6273:3484`
- **Origem:** [ACADEMICO] [INFERENCIA]
- **Elemento:** AdministracaoMedicamento.registrar e Auditoria.registrarEvento
- **Situação encontrada:** CL-03 exibe registrar() e registrarEvento(), enquanto SQ03-M03 envia registrar(realizadaEm, autor) e SQ01-M05 registrarEvento(NEGADO, contextoSanitizado). Não há convenção explícita dizendo que parênteses vazios suprimem parâmetros.
- **Situação esperada:** Assinaturas compatíveis com os argumentos das mensagens, ou nota de abstração indicando que o catálogo não especifica assinatura completa. Não inferir que todos os métodos sem parâmetros são implementação final.
- **Impacto e justificativa da criticidade:** Impossibilita conferir rigorosamente parâmetros, tipos e retornos entre diagramas.
- **Correção mínima recomendada:** Documentar parâmetros/retornos dessas operações ou uniformizar explicitamente a notação resumida.
- **Validação humana / dependência:** Sim para escolher nível de detalhe; não requer nova funcionalidade.
- **Critério objetivo de resolução:** É possível mapear cada argumento de M03/M05 à operação receptora ou a uma convenção de abstração publicada.
- **Fonte documental:** [docs/uml/especificacao-para-figma/dominio-C-registros/CL-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/CL-03.md); [docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md); [docs/uml/especificacao-para-figma/dominio-C-registros/SQ-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/SQ-03.md)
- **Evidência Figma:** [CL-03 — 6272:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6272-3484); [captura](evidencias/6272-3484.png); [nós](evidencias/6272-3484.json); [SQ-01 — 6257:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484); [captura](evidencias/6257-3484.png); [nós](evidencias/6257-3484.json); [SQ-03 — 6273:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6273-3484); [captura](evidencias/6273-3484.png); [nós](evidencias/6273-3484.json)

## AUD-M2-011 — P2 — Versões antigas ainda estão na faixa principal da apresentação

- **Domínio / diagramas / Node IDs:** A / UC-01 / `6250:3484`; A / CL-01 / `6255:3484`; A / SQ-01 / `6257:3484`; A / DB-A / `6259:3484`
- **Origem:** [PENDENTE] [INFERENCIA]
- **Elemento:** Página 6103:3636; frames antigos 6231:3484, 6234:3484, 6235:3484, 6238:3484
- **Situação encontrada:** Os quatro frames antigos continuam visible=true, y=0, x24960/27040/29120/31200; as versões atuais ficam à direita com prefixo TESTE ChatGPT. EER-A permanece na posição anterior. Inventário direto salvo em inventario-pagina.json.
- **Situação esperada:** Sequência de apresentação deve apontar inequivocamente aos 19 IDs atuais; versões antigas não devem se confundir com slides finais.
- **Impacto e justificativa da criticidade:** Risco de apresentar modelos superados mesmo após corrigir os atuais. Não se afirma que um player específico executou essa ordem: a evidência é a faixa visual.
- **Correção mínima recomendada:** Após aprovação, arquivar/ocultar os quatro antigos, ordenar os atuais e retirar TESTE do nome. Preservar o EER-A atual 6238:3578.
- **Validação humana / dependência:** Sim: organização da apresentação, expressamente fora da execução desta missão.
- **Critério objetivo de resolução:** Área principal e roteiro de apresentação contêm somente os 19 IDs atuais; antigos continuam preservados em área histórica.
- **Fonte documental:** [docs/uml/implementacao-figma/INDICE-APRESENTACAO-MILESTONE-2.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/implementacao-figma/INDICE-APRESENTACAO-MILESTONE-2.md); [docs/uml/implementacao-figma/dominio-A.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/implementacao-figma/dominio-A.md)
- **Evidência Figma:** [UC-01 — 6250:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6250-3484); [captura](evidencias/6250-3484.png); [nós](evidencias/6250-3484.json); [CL-01 — 6255:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484); [captura](evidencias/6255-3484.png); [nós](evidencias/6255-3484.json); [SQ-01 — 6257:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484); [captura](evidencias/6257-3484.png); [nós](evidencias/6257-3484.json); [DB-A — 6259:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6259-3484); [captura](evidencias/6259-3484.png); [nós](evidencias/6259-3484.json)

## AUD-M2-012 — P2 — Promessa de todas as restrições no EER é incorreta

- **Domínio / diagramas / Node IDs:** C / DB-C2 / `6276:3484`
- **Origem:** [PERSISTENCIA]
- **Elemento:** Rodapé técnico 6277:3542
- **Situação encontrada:** O texto afirma que a exportação original preserva todas as chaves, campos e restrições. O SQL tem 50 CHECKs; o XML .mwb não possui objetos db.CheckConstraint, e as exportações não demonstram esses CHECKs. As vistas temáticas também são seletivas.
- **Situação esperada:** Identificar SQL como referência para CHECKs/regras não expressas na vista e .mwb/SVG como representação temática; separar fidelidade de colunas/FKs da cobertura de restrições.
- **Impacto e justificativa da criticidade:** Leitor pode presumir garantias como XOR dos anexos e ciclo único de tarefa apenas a partir do EER.
- **Correção mínima recomendada:** Substituir a promessa absoluta por referência explícita ao SQL e aos limites da vista. Não é necessário materializar cada CHECK como caixa.
- **Validação humana / dependência:** Não para retirar a afirmação comprovadamente excessiva.
- **Critério objetivo de resolução:** Rodapé não promete cobertura integral; ck_anexo_pai, ck_ocorrencia_origem e demais CHECKs ficam rastreáveis ao SQL.
- **Fonte documental:** [entrega/sql-eer/01_schema_completo_v1.sql](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/01_schema_completo_v1.sql); [entrega/sql-eer/rede_de_apoio_v1.mwb](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/entrega/sql-eer/rede_de_apoio_v1.mwb)
- **Evidência Figma:** [DB-C2 — 6276:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6276-3484); [captura](evidencias/6276-3484.png); [nós](evidencias/6276-3484.json)

## AUD-M2-013 — P2 — Rastreabilidade ao protótipo não demonstra os fluxos de troca e administração

- **Domínio / diagramas / Node IDs:** B / UC-02 / `6262:3484`; B / SQ-02 / `6265:3484`; C / UC-03 / `6270:3484`; C / SQ-03 / `6273:3484`
- **Origem:** [REQUISITO] [PENDENTE]
- **Elemento:** Fluxo Final 5926:1014; T04 5926:1261; T08 5926:1801; T05 5926:1420
- **Situação encontrada:** T04 apresenta consulta de escala; suas actions lidas não iniciam solicitar/responder troca. T08 oferece Cadastrar, abrindo 5967:6307, com nome/concentração/forma/observação, sem administração ou regime. T05 mostra administração já registrada e horários de realização/registro distintos, mas não a ação de registrá-la. Busca estrutural na página não encontrou textos/frames específicos desses fluxos. As correspondências documentais T04/T08 não provam sua execução.
- **Situação esperada:** Identificar entrada e estados verificáveis de US-012/013/018/019, inclusive recusa, negativa e administração avulsa quando demonstrada. Se fora do alcance do protótipo atual, declarar a lacuna; não inventar uma reação equivalente.
- **Impacto e justificativa da criticidade:** A cadeia RF→US→CA→UML→persistência tem correspondência conceitual, mas seu último elo não pode receber PASS completo.
- **Correção mínima recomendada:** Documentar links de ações/estados existentes ou delimitar formalmente a demonstração. Eventual implementação no protótipo exige rodada separada autorizada.
- **Validação humana / dependência:** Sim: confirmar eventual fluxo em outra superfície e seu caráter canônico.
- **Critério objetivo de resolução:** Há roteiro navegável comprovado nos IDs canônicos ou ressalva acadêmica explícita sobre cobertura do protótipo; não basta screenshot da lista.
- **Fonte documental:** [docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml); [docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml); [docs/uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md); [docs/uml/especificacao-para-figma/dominio-C-registros/SQ-03.md](https://github.com/webkauadev/rede-de-apoio/blob/88302e793d7a29cd60cad60483c6aaca357113e1/docs/uml/especificacao-para-figma/dominio-C-registros/SQ-03.md)
- **Evidência Figma:** [UC-02 — 6262:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6262-3484); [captura](evidencias/6262-3484.png); [nós](evidencias/6262-3484.json); [SQ-02 — 6265:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484); [captura](evidencias/6265-3484.png); [nós](evidencias/6265-3484.json); [UC-03 — 6270:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6270-3484); [captura](evidencias/6270-3484.png); [nós](evidencias/6270-3484.json); [SQ-03 — 6273:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6273-3484); [captura](evidencias/6273-3484.png); [nós](evidencias/6273-3484.json)

## Pendências de evidência sem severidade artificial

- **PE-01 — Rubrica efetiva da entrega:** a transcrição da aula menciona outros tipos de diagrama; confirmar com o professor se o recorte de 19 artefatos satisfaz a Milestone 2. Não solicitar nem gerar atividades/estados nesta missão.
- **PE-02 — Demonstração dinâmica:** inspeção estática de textos, estados e reactions não certifica interação completa, autorização real, entrega, transação, concorrência ou idempotência em execução. AUD-M2-013 registra o elo visual ausente, sem converter hipótese em funcionalidade inventada.
- **PE-03 — Convenções didáticas:** confirmar assinatura resumida, mensagem de criação e exceção justificada de seis lifelines; recomendação aproximada de cinco não autoriza fundir solicitante e destinatário.
- **PE-04 — Autoria acadêmica:** materiais originais foram parcialmente acessados; enunciado específico/rubrica não foi localizado. Não se declara homologação pelo professor.
