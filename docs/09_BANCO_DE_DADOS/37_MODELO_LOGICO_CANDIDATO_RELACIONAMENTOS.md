# 37 — Modelo lógico candidato por relação, chave e nível de garantia

**Status:** estudo de modelo lógico, **não** esquema homologado e **não** SQL. Data: 2026-10-09. Elaboração a partir dos RF/RNF/US canônicos da `main`, das regras RN-001–RN-011 e das decisões DEC-S01–S03 registradas no PR #115. O inventário D01–D23/C01–C04 em [03](03_DICIONARIO_DE_DADOS.md) continua um catálogo preliminar, **não contagem final de tabelas**.

## 1. As três camadas de garantia — não misturar

| Camada | Pode demonstrar | NÃO demonstra sozinha |
|---|---|---|
| **Estrutural (PK, FK, UNIQUE, CHECK, NOT NULL)** | Existência da referência, identidade estável, chaves candidatas, domínio da linha, compatibilidade de escopo com FK composta | Autorização de hoje, pelo menos um Profissional por rede, intervalo temporal válido, titular autorizado a ler, cardinalidade mínima entre linhas |
| **Operacional/transacional (backend + InnoDB)** | Versão não obsoleta, vínculo vigente, titular/ator corretos, uma única conclusão por tarefa+ciclo, transferência atômica, bloqueio após desvínculo | Definição funcional ausente: destinatário N02 quando há múltiplos plantonistas; regra de reabertura; dose PRN |
| **Decisão funcional (RF/US/ADR homologada)** | Qual regra o sistema **deve** cumprir, quem recebe avisos, permissões, limites de cardinalidade e semântica de dados | Segurança física/concorrência sem implementação e testes |

**Atenção MySQL:** uma FK composta pode não ser aplicada quando parte dos campos da FK filha é NULL; não usar campos de escopo anuláveis quando a referência deveria ser obrigatória. Referências a chave pai devem possuir índice estável/único adequado; conferir restrições do MySQL 8.4 na prova real. A FK não confere vigência; um membro historicamente desligado continua existindo.

## 2. Identidade, rede e autorização (D01–D05)

| Candidata | Identidade lógica | FKs e relações candidatas | Garantia necessária / restrição |
|---|---|---|---|
| D01 `usuario` | `usuario_id` | titular idoso, membros, autores e auditoria referenciam | Identidade de login única segundo provedor DB-016; autenticação != papel |
| D02 `pessoa_idosa` | `pessoa_idosa_id` | `usuario_titular_id` opcional → D01 | Acesso próprio read-only; cardinalidade usuário/titular DB-025; não exigir credencial antes de cadastrar perfil |
| D03 `rede_cuidado` | `rede_id` | `pessoa_idosa_id` → D02 | DB-001 (uma ou várias redes por idoso); em operação exatamente um Principal + ≥1 Profissional; bootstrap DB-002 |
| D04 `membro_rede` | `membro_id` | (`rede_id`→D03, `usuario_id`→D01); chave candidata (`rede_id,membro_id`) | categoria Familiar/Profissional, vínculo temporal; reingresso DB-003; categoria não se troca retroativamente |
| D05 `atribuicao_papel_familiar` | `atribuicao_id` | membro Familiar real, com integridade por subtipo ou (`membro_id,categoria`) composta | múltiplos papéis acumuláveis; 1 Principal vigente por rede; FK simples a membro não barra Profissional; DB-004/026/027 |

**Ligação cruzada imprescindível:** um registro que aponta a `rede_id=R1` e `membro_responsavel_id=X` só pode aceitar X se a participação também contém `rede_id=R1`. FK candidata composta (rede_id,membro_id) ou outra garantia estrutural equivalente, além da checagem de acesso ativo. Não permitir papel familiar por apenas possuir D01.

## 3. Plantões, trocas, tarefas e compromissos (D06–D10)

| Candidata | Identidade lógica | Relações candidatas | Integridade / concorrência |
|---|---|---|---|
| D06 `plantao` | `plantao_id`; versão candidata | D03 e D04 da mesma rede | **DEC-S01:** intervalos de plantões diferentes podem coincidir. Não criar índice de exclusão temporal. Um comando incompatível por P+versão (DEC-S03). Responsável por um plantão continua hipótese 1 |
| D07 `solicitacao_troca_plantao` | `troca_id` | D06 alvo, solicitante/destinatário/respondente da mesma rede | pedido/histórico separado de estado atual do plantão; versão esperada da escala; aceite/cancelamento concorrente serializado; tipo de troca DB-006 |
| D08 `tarefa` | `tarefa_id`; versão e ciclo candidatos | D03 e D04 responsável (quando definido) | autoriza concluinte **responsável** efetivo; programação pode ter horário; reabertura DB-007 |
| D09 `conclusao_tarefa` | `conclusao_id` | D08 tarefa+ciclo; executor dentro da rede | **DEC-S03:** no máximo uma conclusão confirmada por tarefa+ciclo; replay idempotente e conflito para segundo comando; se reabrir, novo ciclo sujeito a DB-007 |
| D10 `compromisso` | `compromisso_id` | pessoa/rede do mesmo contexto, autor, responsável opcional | consulta médica não é obrigatoriamente compromisso (DB-009); escopo de pessoa idosa/rede precisa ser inequívoco |

**Duas operações distintas:** criar P1 10h–12h e P2 11h–13h é permitido. Alterar duas vezes **P1 na mesma versão** é conflito. Não serializar plantões somente por rede+horário. N02 é separadamente DB-030: múltiplos Plantonistas Atuais podem ser verdadeiros no instante do evento.

## 4. Saúde, previsão e histórico (D11–D19)

| Candidata | Identidade lógica | Relações candidatas | Integridade / histórico |
|---|---|---|---|
| D11 `consulta` | `consulta_id` | idoso/rede, autor, compromisso opcional | não forçar compromisso como origem (DB-009); RNF02 escopo DB-008 |
| D12 `recomendacao` | `recomendacao_id` | consulta opcional + idoso, autor | FK para consulta deve comprovar **mesmo idoso** se estiver preenchida; origem independente DB-009 |
| D13 `medicamento` | `medicamento_id` | D02 titular e escopo autorizado | medicamento contextual não é prescrição verificada automaticamente |
| D14 `regime_medicamento` | `regime_id` | D13, vigência e versão do plano | plano anterior preservado, dose/recorrência DB-010 |
| D15 `horario_regime` | `horario_id` | D14 regime; data/hora local + calendário/zona por ADR | ocorrências recorrentes datadas são diferentes de horário-base; DB-015/029/033 |
| D16 `administracao_medicamento` | `administracao_id` | D14 regime, D15 horário opcional, executor e ocorrência candidata | garantir que regime/horário/idoso sejam compatíveis por caminho ou FK composta, não cruzar E1/E2; duplicidade clínica DB-011/021; RNF02 |
| D17 `registro_cuidado` | `registro_id` | D02/D03, autor D01, escopo | diário, sintomas, intercorrências; imutável; envelope transversal DB-008/034 |
| D18 `correcao_registro` | `correcao_id` + (`registro_id,versao`) única candidata | referência ao original e mesmo domínio | append-only; permissão atual criar mesmo tipo; versão completa vs delta DB-035; correção de conteúdo/hora DB-036 |
| D19 `anexo` | `anexo_id` | FK real para recurso/versão; storage privado | não usar `tipo+id` textual sem FK; escopo de leitura herda pai; tipo/versão DB-013/037 |

**DEC-S02** confirma identidades distintas: regime/horário/ocorrência planejada, declaração de administração, alerta N04 de ausência de registro. Uma ocorrência prevista em um dia não pode ser confundida com a do dia seguinte. N04 não é prova clínica de que a dose não foi dada.

## 5. Apoio, comunicação e trilha (D20–D23; C01–C04)

| Candidata | Identidade / relações candidatas | Decisão ou invariante |
|---|---|---|
| D20 `contato_importante` | `contato_id`, D02 pessoa | contato externo não precisa de D01 |
| D21 `informacao_emergencia` | `emergencia_id`, D02 pessoa | uma ficha ou várias revisões DB-012/019 |
| D22 `preferencia_notificacao` | `preferencia_id`, D01 + escopo D03 quando relevante | opcionais apenas; obrigações N01/N02/N03/N04 não podem ser desabilitadas |
| D23 `auditoria` | `auditoria_id`, autor D01 nullable se desconhecido, escopo | operação, resultado e snapshot mínimo; sem texto clínico/senha; negação após rollback DB-038 |
| C01 `historico_plantao` | evento_id e FK D06 | condicional DB-022; histórico de negócio != log de segurança |
| C02 `habilitacao_acesso_idoso` | id, FK D02/D01 quando aplicável | condicional DB-017; não criar credencial por familiar |
| C03 `entrega_tecnica_notificacao` | evento+destinatário e deduplicação | outbox condicional DB-014; **não** inbox/histórico para usuário |
| C04 `ocorrencia_programada` | referência íntegra à origem, versão e dia/hora | persistência condicional DB-029; não confundir agendamento com execução |

## 6. Riscos de integridade que ainda impedem DDL

- Sem DB-001, não impor UNIQUE em `rede.pessoa_idosa_id`.
- Sem DB-002, não permitir ativar rede sem Principal e Profissional; criação em etapas deve permanecer distinta de operação.
- Sem DB-003/027, não criar UNIQUE vitalícia no par rede/usuário; um reingresso legítimo poderia ser bloqueado.
- Sem DB-008/034, não apontar correção universal apenas para tabela do Diário se RNF02 se aplica a outros registros.
- Sem DB-013/037, não usar anexo com `tipo_recurso` e `id_recurso` sem FK íntegra.
- Sem DB-030, não implementar N02 como `LIMIT 1` entre vários plantonistas, nem redirecionar a todos sem revisão canônica.
- Sem DB-021/029/031, não declarar chave única final de dose/ocorrência/N04.
- O mecanismo de versão e lock por recurso precisa do serviço/DB real; o documento 33 é contrato conceitual, não prova transacional.

## 7. Estado e referências

Todas as linhas D/C são **candidatas**, mesmo quando o comportamento é canônico. DEC-S01–S03 estão aprovadas diretamente pelo solicitante para a modelagem, mas ainda `migration_required` nas fontes oficiais (docs 32/36). Conferir [38](38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md) e [39](39_GATES_E_PLANO_DE_PROVA_LOGICA.md).

MySQL 8.4: https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html ; https://dev.mysql.com/doc/refman/8.4/en/constraint-foreign-key.html .
