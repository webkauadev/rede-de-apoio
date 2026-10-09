# 33 — Contrato de serialização por recurso e rejeição de conflitos

**Escopo:** operações sobre o mesmo plantão e conclusão da mesma tarefa, conforme DEC-S03 do documento 32. **Modelo proposto para implementação posterior; não é SQL, não executa banco e não altera RN/RF sozinho.** Requisitos relacionados RF06/09/21, US-008/013/025, RNF01/RNF02/RNF03.

## 1. Regra de negócio operativa, independente de framework

> Duas solicitações podem chegar juntas à API, mas **não podem produzir dois efeitos conflitantes confirmados sobre a mesma versão do plantão ou o mesmo ciclo de conclusão de tarefa**. A confirmação é atômica por recurso. Quem apresenta estado desatualizado recebe conflito; quem repete exatamente a mesma solicitação recebe o resultado previamente confirmado, sem segundo efeito.

**Escopos de serialização distintos:**
- Edição, aceite de troca ou cancelamento de um plantão P: escopo `plantao_id=P` + `versao_atual`, sempre dentro da rede/contexto permitido.
- Se DB-006 resultar numa permuta de **dois plantões**, bloquear/verificar **ambos** em ordem estável de IDs na mesma transação; se qualquer um mudou, cancelar tudo.
- Conclusão de tarefa T: escopo `tarefa_id=T` + `ciclo_de_conclusao` (primeiro ciclo implícito para tarefa sem reabertura). Reabertura, se aprovada, exige novo ciclo identificável e nunca remove o fato de conclusão antigo.
- **Plantonistas diferentes com plantões que se sobrepõem não conflitam por si só**. Não serializar exclusivamente por rede+horário; o conflito relevante é a alteração do mesmo recurso.

## 2. Contrato de comando recebido

Candidatos lógicos para um pedido:
- identidade autenticada derivada da sessão (não confiar em autor fornecido pelo cliente);
- rede e recurso lidos/validados pelo servidor (contexto e ID);
- operação permitida (ACEITAR_TROCA, CANCELAR_PLANTAO, ALTERAR_PLANTAO ou CONCLUIR_TAREFA);
- `versao_esperada` que a interface consultou, ou token ETag equivalente;
- `idempotency_key` única por intenção operacional, combinada a escopo/comando/ator; mesma chave com payload diferente **é erro**, não segunda operação;
- dados de alteração estritamente válidos (destinatário elegível, justificativa quando aplicável, assinatura da conclusão).

Um cliente não escolhe "quem vence" por timestamp próprio; quem confirmou COMMIT válido primeiro define o estado observável, respeitando locks e versões.

## 3. Protocolo para alteração de plantão

1. Autenticar e conferir rede/autor/scope; resolver P a partir de ID autenticado.
2. Abrir uma única transação. Bloquear `plantao P` (`SELECT ... FOR UPDATE` ou UPDATE condicional equivalente na futura fase SQL). Se permuta, bloquear P1/P2 em ordem global.
3. Revalidar autorização **vigente**, status e responsável, estado de solicitação (quando houver), e comparar `versao_esperada` com `versao_atual`.
4. Repetição do mesmo comando confirmado e payload compatível: retornar resultado anterior sem reaplicar. Uma tentativa diferente com versão antiga: **CONFLITO_DESATUALIZADO**, rollback; nenhuma alteração de outra pessoa apagada.
5. Se válido, alterar responsável/estado/intervalo respeitando demais regras, incrementar versão, registrar mudança histórica/auditoria e efeito técnico N01 idempotente.
6. COMMIT total; N01 de alteração efetiva apenas após confirmação. Se erro/deadlock: rollback completo e retry técnico apenas quando seguro com rechecagem de estado; jamais sobrescrever aceitação anterior.

**Se múltiplos plantões se cruzam**: P1 e P2 coexistem e podem ser operados independentemente. Um segundo plantonista não dá direito automático de aceitar a troca de P1.

## 4. Protocolo para conclusão da mesma tarefa

1. Autenticar ator, tarefa T e ciclo/ocorrência; resolver responsável elegível a partir da tarefa e regras RN-010; não aceitar indicação forjada de "sou responsável".
2. Abrir transação e bloquear T/ciclo estável; validar que T está aberta no ciclo, que não foi concluída e que a versão esperada confere.
3. Inserir **um** fato de conclusão com autoria, ocorrido_em e registrado_em; impor **uma chave única** por (tarefa, ciclo), ou mecanismo equivalente comprovado (sem assumir DDL fixo).
4. Marcar projeção de estado concluída, incrementando versão de T, preservando fato histórico.
5. Emitir N03 da conclusão confirmada **uma vez por evento/destinatário**, conforme RF25; registrar auditoria mínima; COMMIT.
6. Outra pessoa que também apertou "concluir" com versão anterior recebe `409 CONFLICT` ou resposta de domínio equivalente `JA_CONCLUIDA`, com dados mínimos atuais para atualização; **não** insere segunda conclusão, não cria segundo N03.
7. Repetição exata do **mesmo pedido** retorna resultado lógico original via idempotência e não cria execução nova. Chave igual com payload diferente causa erro.
8. Se a tarefa for reaberta futuramente por regra aprovada, criar **novo ciclo** sem apagar o anterior; DB-007 ainda aberto sobre quem reabre, quando e quantas vezes.

**Atenção:** uma tarefa sem horário programado não vira atraso apenas por concorrência. Duas pessoas em plantões diferentes podem concluir tarefas diferentes no mesmo minuto normalmente.

## 5. Respostas e UX sugeridos (sem tela nova)

| Condição | Resposta de domínio proposta | Tratamento na UI |
|---|---|---|
| Sucesso gravado pela primeira transação | OK / nova versão | Atualizar estado e exibir sucesso usual |
| Mesma chave com payload idêntico e já confirmado | REPLAY_OK (mesmo resultado) | Não repetir animação de conclusão ou notificação externa |
| Comando diferente sobre versão anterior | CONFLITO_DESATUALIZADO / 409 | Atualizar dados e mostrar "Este item foi atualizado por outra pessoa. Confira o estado atual." |
| Concluir tarefa já concluída por outro comando | JA_CONCLUIDA / 409 | Mostrar responsável/horário permitido, sem segunda gravação |
| Chave repetida com conteúdo diferente | CHAVE_REUTILIZADA_INDEVIDAMENTE | Solicitar novo comando/atualização; não alterar |
| Sem autorização atual | FORBIDDEN / 403 | Não expor dados protegidos; auditar tentativa |
| Falha transacional/deadlock | ERRO_TRANSITORIO | Retry técnico seguro ou mensagem, nunca commit parcial |

**Status HTTP e mensagens são recomendações de implementação**, não novos critérios aprovados; a UX deve manter padrão visual do Figma, sem inventar tela.

## 6. Invariantes testáveis

- CI01: para um dado (plantao_id,versao), no máximo um comando de mudança incompatível confirma.
- CI02: permuta envolvendo P1/P2 é totalmente aplicada ou totalmente revertida.
- CI03: solicitação de troca pendente responde no máximo uma vez com efeito, sem aceite e recusa simultâneos.
- CI04: para (tarefa_id,ciclo), no máximo uma conclusão válida confirmada no fluxo normal.
- CI05: comandos idempotentes repetidos não criam segunda versão/conclusão/evento N01/N03.
- CI06: mesmo idempotency_key + payload diferente é conflito, não replay silencioso.
- CI07: autorização e versão são conferidas **na transação**; checagem anterior de UI não autoriza gravação.
- CI08: duas operações em plantões diferentes sobrepostos não conflitam por sobreposição.
- CI09: duas tarefas diferentes podem ser concluídas independentemente sem bloqueio de recurso global.
- CI10: todos os efeitos confirmados são atômicos e rastreáveis, originais preservados quando exigido.
- CI11: alterações de estado negadas por conflito não geram N01/N03 como se concluídas.
- CI12: resultados são determinados pelo estado commitado, nunca por timestamp enviado pelo cliente.

## 7. Riscos/garantias reais do MySQL

- **Locks de linha e SELECT ... FOR UPDATE** podem serializar por recurso se usados na **mesma transação e conexão**. Apenas leitura comum seguida de escrita é insuficiente.
- **Controle de versão otimista** evita last-write-wins sem verificar versão; útil junto com lock e chaves únicas. Sem persistir versão/estado coerente, check na aplicação isolado não prova nada.
- **UNIQUE por tarefa+ciclo** impede segundo fato da mesma ocorrência; chave de idempotência previne replay do mesmo comando; são proteções diferentes.
- **Deadlock** continua possível. InnoDB pode abortar uma transação; retry deve reler estado e evitar renovar uma troca já aplicada como se fosse nova.
- Manter ordem de locks: rede/contexto quando indispensável → plantões por ID ascendente → solicitações → tarefa/ciclo quando aplicável. Nunca travar a rede inteira apenas por horários simultâneos se isolamento por recurso basta; avaliar regras cruzadas (permissão/desvínculo).
- **Não existe prevenção literal de cliques simultâneos de múltiplos aparelhos**; a propriedade exigida é **um efeito persistido**. A interface pode desabilitar seu botão localmente e mostrar loading, mas a garantia é do backend.
- A entrega externa "exatamente uma vez" de N01/N03 não é garantida só por commit do MySQL; deduplicação na outbox e no consumidor é técnica condicional DB-014.

Fontes oficiais MySQL 8.4:
https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html ;
https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html ;
https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html ;
https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html .
