# 03 — Dicionário preliminar de dados

**PROPOSTA, não DDL.** Nomes/atributos/PK/FK são hipóteses técnicas a confirmar. Inventário de **23 núcleos candidatos + 4 extensões condicionais = 27 entidades candidatas**; quantidade final não está homologada. Autoria, identificação de contexto, criação e situação de vínculo são campos transversais onde fizer sentido. Tipos SQL/NULL/índices ficam para a fase física.

## Identidade e rede

**D01 — usuario.** PK: usuario_id. Candidatos: nome, email_normalizado, hash_credencial_ou_id_provedor, telefone, ativo, criado_em. Chave alternativa: email único conforme política de login. FKs recebidas: pessoa_idosa, membro_rede, auditoria e autores de registros. Nunca armazenar senha em texto puro. RF01, RF02.

**D02 — pessoa_idosa.** PK: pessoa_idosa_id. FK opcional: usuario_titular_id → usuario (UNIQUE quando vinculado). Campos: nome, data_nascimento opcional, ativo, cadastrado_por, criado_em. Perfil pode existir antes do login próprio; titular não recebe papéis familiares. RF03, RF30. PENDENTE: atributos exatos do perfil.

**D03 — rede_cuidado.** PK: rede_id; FK pessoa_idosa_id → pessoa_idosa. Campos candidatos: nome, criador_id, criada_em, estado_operacional somente se for necessário controlar bootstrap. Cada rede operacional deve ter um Principal e ≥1 Profissional. PENDENTE: 1 ou N redes por pessoa idosa; nenhum UNIQUE em pessoa_idosa_id sem decisão.

**D04 — membro_rede.** PK: membro_id; FKs: rede_id, usuario_id; UNIQUE candidata (rede_id,membro_id) para FK de escopo. Campos: categoria FAMILIAR ou PROFISSIONAL_SAUDE, inicio_vinculo, fim_vinculo, estado_vinculo, vinculado_por. Preservar histórico, não deletar por desvinculação. PENDENTE: reingresso de usuário (não criar UNIQUE permanente rede+usuário sem considerar períodos).

**D05 — atribuicao_papel_familiar.** PK: atribuicao_id; FK membro_id → membro_rede. Campos: papel PRINCIPAL/APOIO/EMERGENCIA, concedido_em, revogado_em, concedido_por. Permite papéis simultâneos e histórico. Proibir papéis de Profissional ou conta de Pessoa Idosa. Exclusividade de Principal ativo é invariante transacional entre linhas, não CHECK local. RF05, RN-001/002.

## Plantões, trocas, rotina

**D06 — plantao.** PK plantao_id; FKs rede_id, membro_responsavel_id, criado_por; associação membro/rede com FK composta candidata. Campos inicio, fim, estado, criado_em, alterado_em. Plantonista Atual = intervalo ativo, não coluna permanente. RF06, RF08.

**D07 — solicitacao_troca_plantao.** PK troca_id; FKs plantao_id, solicitante_membro_id, destinatario_membro_id, respondido_por_membro_id opcional. Campos solicitada_em, respondida_em, status, justificativa. Aceite é atômico; recusa preserva atribuição anterior. RF09. PENDENTE: troca de responsável por plantão ou permuta de dois intervalos.

**D08 — tarefa.** PK tarefa_id; FKs rede_id, responsavel_membro_id opcional, criado_por. Campos titulo, descricao, horario_previsto opcional, prazo, estado, criado_em. Não persistir atraso como fato eterno. RF21, RF26.

**D09 — conclusao_tarefa.** PK conclusao_id; FKs tarefa_id, executor_membro_id, autor_usuario_id. Campos concluida_em, registrada_em, observacao. PENDENTE: cardinalidade 0..1 ou 0..N em caso de reabertura; histórico imutável quando aplicável. US-025.

**D10 — compromisso.** PK compromisso_id; FKs pessoa_idosa_id/rede_id conforme cardinalidade final, criado_por e responsável opcional. Campos titulo, inicio, fim opcional, local opcional, detalhes. Não confundir automaticamente com consulta. RF20.

## Saúde e registros

**D11 — consulta.** PK consulta_id; FK pessoa_idosa_id, autor_usuario_id, compromisso_id opcional se confirmado. Campos realizada_em, observacao, registrada_em. Pode ser independente do compromisso. RF19, RF13.

**D12 — recomendacao.** PK recomendacao_id; FK consulta_id condicional, pessoa_idosa_id, autor_usuario_id. Campos descricao, registrada_em. PENDENTE: recomendação sem consulta e revisão histórica. RF19.

**D13 — medicamento.** PK medicamento_id; FK pessoa_idosa_id. Campos nome, apresentacao opcional, ativo, cadastrado_por/em. Não presumir catálogo farmacológico global ou autorização clínica para prescrever. RF14.

**D14 — regime_medicamento.** PK regime_id; FK medicamento_id. Campos posologia_textual, inicio_vigencia, fim_vigencia opcional, unidade/dose somente após decisão. Alterar regime não deve apagar plano antigo. RF15.

**D15 — horario_regime.** PK horario_id; FK regime_id. Campos horario_local, recorrencia, dia_semana se aplicável, inicio/fim opcional. Evitar listas de horários em texto. PENDENTE: dias fixos, PRN/sob demanda, exceções e fuso. RF15.

**D16 — administracao_medicamento.** PK administracao_id; FKs regime_id, horario_id opcional (mesmo regime), executor_usuario_id, registro_base_id se escolhido envelope. Campos prevista_em, realizada_em, registrada_em, observacoes e situação. Separar dose prevista de dose efetivamente registrada. Correção versionada, se aplicável, sem UPDATE destrutivo. RF16, RF13, RNF02.

**D17 — registro_cuidado.** PK registro_id; FKs pessoa_idosa_id, rede_id quando aplicável, autor_usuario_id. Campos tipo (DIARIO/SINTOMA/INTERCORRENCIA conforme escopo), descricao_original, ocorrido_em, registrado_em. Imutável. PENDENTE: registro-base transversal para outros domínios vs. apenas diário. RF11/RF18.

**D18 — correcao_registro.** PK correcao_id; FKs registro_id e autor_correcao_id; UNIQUE candidata (registro_id,numero_versao). Campos numero_versao, conteudo_revisto_ou_snapshot, justificativa, corrigido_em. Somente INSERT; nenhuma sobrescrita do original. PENDENTE: extensões para consulta e administração. RNF02/US-034.

**D19 — anexo.** PK anexo_id; FKs recurso_pai por relacionamento íntegro a definir, enviado_por. Campos nome, mime_verificado, tamanho_bytes, checksum, storage_key_opaca, criado_em. Arquivos em armazenamento privado é proposta; nunca acesso público irrestrito. Evitar vínculo apenas tipo+id sem FK. RF23/US-027.

## Apoio e proteção

**D20 — contato_importante.** PK contato_id; FK pessoa_idosa_id. Campos nome, relação, telefone, prioridade, ativo, modificado_em/por. Contato externo não exige login. RF22.

**D21 — informacao_emergencia.** PK emergencia_id; FK pessoa_idosa_id; UNIQUE somente se for um agregado único vigente. Campos orientacoes, anotacoes_autorizadas, modificado_em/por. PENDENTE: quem edita, campos e versionamento. RF24.

**D22 — preferencia_notificacao.** PK preferencia_id; FKs usuario_id, rede_id quando contextual. UNIQUE candidata (usuario_id,rede_id,tipo_evento). Campos tipo_evento_opcional, habilitado, alterado_em. Não permitir desligar regras obrigatórias N01–N04. RF27.

**D23 — auditoria.** PK auditoria_id; FKs usuario_ator_id opcional, rede_id/pessoa_idosa_id quando conhecidos. Campos instante, operacao, recurso_tipo, recurso_id_opaco, categoria_snapshot, papeis_snapshot_minimos, resultado, correlacao_operacao, detalhe_sanitizado. Append-only, jamais gravar senha/token/conteúdo clínico livre. RF29/RNF03.

## Quatro extensões condicionais (somente com justificativa)

**C01 — historico_plantao:** PK evento_id; FK plantao_id, ator_id; tipo_alteracao, referencia antiga/nova por FKs, instante. Para reconstruir decisões de escala se auditoria genérica não for suficiente.

**C02 — habilitacao_acesso_idoso:** PK habilitacao_id; FK pessoa_idosa_id; estados de convite/ativação, momento, expiração, token_convite_hash. A UI T12 possui estados, mas o mecanismo de token e entidade separada são PENDENTES.

**C03 — entrega_tecnica_notificacao:** PK entrega_id; FKs evento_referente, usuario_destinatario_id; tipo N01–N04, estado_de_transporte, chave_deduplicacao, expiração. Apenas infraestrutura interna, NÃO central/histórico consultável no app.

**C04 — ocorrencia_programada:** PK ocorrencia_id; referência íntegra para tarefa/dose/outro cuidado previsto, tempo previsto e execução associada. Somente se consultas às fontes não atenderem a consistência de N02/N04; nunca usar tipo+id desprovido de FK real.

## Política de identificadores

- PK estável e opaca; chaves naturais específicas apenas por regra aprovada.
- FKs de membro, regime, consulta e contexto precisam impedir cruzamento indevido de rede/pessoa.
- Desvinculação/desativação não deve apagar linhas históricas.
- Política DELETE/UPDATE, NULL, índices e tipos serão decididos por entidade na fase física, nunca copiados sem avaliação.
- Não armazenar na base entidades artificiais apenas porque há tela Home/Calendário/Histórico ou status visual Loading/Empty.
