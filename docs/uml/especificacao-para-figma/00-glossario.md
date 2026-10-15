# Glossário canônico para os diagramas

| Termo | Definição e domínio | Não usar como equivalente | Representação | Fonte |
|---|---|---|---|---|
| Usuário | Identidade de acesso; não concede por si só participação ou permissão na rede. A. | Membro da Rede; Familiar. | `Usuario`; ator somente quando a US usa papel genérico. | [REQUISITO] RF01/RF02, RN-010; [PERSISTENCIA] `usuario`. |
| Pessoa Idosa | Perfil da pessoa atendida; pode ter conta própria read-only. A. | Familiar Principal; Usuário cuidador. | `PessoaIdosa`; ator `Pessoa Idosa`. | [REQUISITO] RF03/RF30, RN-009. |
| Rede de Cuidado | Contexto que reúne pessoa idosa, participantes e recursos do cuidado. A. | Grupo informal; usuário. | `RedeCuidado`. | [REQUISITO] RF03–05; [PERSISTENCIA] `rede_cuidado`. |
| Membro da Rede | Episódio de vínculo de usuário cuidador a uma rede, com categoria e vigência. A. | Usuário; papel familiar. | `MembroRede`. | [REQUISITO] RF04, RN-004; [PERSISTENCIA] `membro_rede`. |
| Papel familiar | Principal, Apoio ou Emergência, acumulável para membro familiar. A/D. | Categoria de usuário; Plantonista Atual. | `AtribuicaoPapelFamiliar`. | [REQUISITO] RF05, RN-001/RN-002. |
| Plantonista Atual | Condição temporária derivada de intervalo de plantão ativo. B/D. | Ator; perfil; subclasse. | Nota/guarda, nunca classe/ator. | [REQUISITO] RF08, RN-003. |
| Plantão | Intervalo de responsabilidade com um membro responsável. B. | Tarefa; papel. | `Plantao`. | [REQUISITO] RF06/RF08; [PERSISTENCIA] `plantao`. |
| Troca de Plantão | Solicitação para reorganizar responsabilidade de um plantão; V1 não é permuta bilateral. B. | Novo plantão; transferência de papel. | `SolicitacaoTrocaPlantao`. | [REQUISITO] RF09; V1 DB-006. |
| Tarefa | Atividade de cuidado, opcionalmente atribuída; uma conclusão e sem reabertura V1. B. | Plantão; ocorrência programada. | `Tarefa`, `ConclusaoTarefa`. | [REQUISITO] RF21; V1 DB-007/032. |
| Ocorrência Programada | Instância prevista oriunda de tarefa ou horário de regime, nunca ambos. C/D. | Administração realizada; atraso clínico. | `OcorrenciaProgramada`. | [PERSISTENCIA] `ocorrencia_programada`; V1 DB-029/030. |
| Administração | Fato registrado de execução de medicamento. C. | Horário previsto; ocorrência programada. | `AdministracaoMedicamento`. | [REQUISITO] RF16; V1 DB-011/021. |
| Registro de Cuidado | Diário, sintoma ou intercorrência original, preservado após criação. C. | Correção; histórico de auditoria. | `RegistroCuidado`. | [REQUISITO] RF11/RF18, RN-005. |
| Correção | Nova versão vinculada ao original, sem sobrescrita. D. | Edição; exclusão. | `CorrecaoRegistro`. | [REQUISITO] RNF02, RN-006. |
| Histórico de Cuidados | Consulta temporal de registros autorizados. C. | Auditoria. | caso `Consultar histórico de cuidados`; não é classe. | [REQUISITO] RF12. |
| Auditoria | Trilha de operações relevantes, inclusive negações e CSV. D. | Histórico de cuidado; notificação. | `Auditoria`. | [REQUISITO] RF29, RNF03/RN-008. |
| Notificação | Feedback transitório N01–N04; não existe central/inbox. D. | Auditoria; tela. | evento/participante técnico, não classe de domínio obrigatória. | [REQUISITO] RF10/RF17/RF25–27. |
