# 19 — Alternativas de modelo lógico e contratos transacionais do núcleo

**Status de TODAS as alternativas: propostas não aprovadas.** A arquitetura física será congelada após ADRs e testes reais MySQL. A documentação oficial de MySQL 8.4 comprova que CHECK é local à linha, não inclui colunas de outras tabelas/subqueries; FKs não são deferidas; locking reads InnoDB exigem transação.

## 1. Alternativas para fazer Papéis pertencerem apenas a Familiares

### Padrão A — Um membro_rede com categoria + guarda composta

- membro_rede tem (membro_id, rede_id, categoria), categoria imutável, e chave candidata no par (membro_id,categoria).
- concessão de papel carrega membro_id e constante/coluna categoria_exigida=FAMILIAR; FK composta para membro_rede e CHECK local categoria_exigida=FAMILIAR.
- Garantia desejada: nenhuma concessão familiar apontará para Profissional, mesmo por INSERT direto.
- Vantagens: poucas tabelas, escopo de vínculo centralizado. Custos: coluna categoria redundante, atenção a CHECK/FK e atualização categoria; verificar no MySQL-alvo.

### Padrão B — Subtipo membro_familiar e membro_profissional

- participação base contém identidade+rede+vigência; membro_familiar (PK/FK do base) e membro_profissional (PK/FK do base); concessão de papel FK somente no subtipo familiar.
- Vantagem: FK forte entre papéis e Familiar; Profissional não é aceito pelo FK de papel.
- Desvantagem: garantir que cada membro pertença a exatamente um subtipo exige operação transacional; FK dupla não prova disjunção/exaustividade.
- **Recomendação para comparar primeiro:** Padrão A por simplicidade, mas **não aprovado** e dependente de prova da garantia DB no MySQL-alvo.

### Antipadrões descartados por incompatibilidade canônica

- Usar enum único perfil=PRINCIPAL/APOIO/EMERGENCIA/PROFISSIONAL.
- Atribuir familiaridade por nome ou email da Pessoa Idosa.
- Registrar papéis como lista textual ou array JSON como única fonte de autorização.
- Salvar PLANTONISTA_ATUAL como valor permanente de categoria.

## 2. Principal único: duas técnicas com limites distintos

**Técnica U1 — vínculo único de Principal vigente representado por índice de unicidade condicional**: em atribuição_papel_familiar, incluir rede_id com FK íntegra para participação e expressar coluna calculada do escopo apenas quando papel=PRINCIPAL e concessão vigente (sem revogação); UNIQUE nessa coluna permite muitos registros históricos com NULL e no máximo um Principal ativo por rede. Atenção:
- “Ativo” só deve depender de atributos determinísticos persistidos, não de NOW() no índice gerado.
- Atributos de vigência com futuro agendado podem fazer “vigente” diferir de “sem revogação”; resolver temporalidade do papel.
- UNIQUE assegura **no máximo um** Principal, nunca **pelo menos um**; a exigência de exatamente um ainda precisa de operação transacional e bootstrap.
- Revogar antiga atribuição e conceder nova são alterações na mesma transação, com estado intermediário não exposto aos demais leitores; testar as garantias observáveis e retries.
- Validar suporte da versão MySQL a índice funcional/coluna gerada e combinação com FK.

**Técnica U2 — rede_cuidado tem referência de membro Principal atual**: um único campo principal_membro_id aponta para membro familiar vigente; transação atualiza ponteiro e grava eventos de concessão/revogação. Vantagem: estruturalmente um slot atual. Riscos: **duas fontes de verdade** se também existir papel Principal ativo na tabela de concessões; ponteiro nulo durante configuração e coerência da categoria ainda exigem mecanismos. Não implantar duas representações divergentes.

**Preferência a avaliar:** U1 (unicidade condicional) com transação serializada sobre rede, desde que prova física e regras de bootstrap estejam concluídas. A preferência NÃO configura aprovação de DB-004.

## 3. Bootstrap (DB-002): o paradoxo de criar a primeira rede

RN-001 e RN-004 exigem 1 Principal e ≥1 Profissional vinculados na rede. Um INSERT isolado de rede começa sem ambos. O frontend T12 permite cadastrar Pessoa Idosa; isso não especifica criação atômica de profissional.

- **B1 — Rede em configuração:** status CONFIGURACAO, não autoriza operações de cuidado; transição única para OPERACIONAL quando existe exatamente um Principal e ≥1 Profissional. A rede pode permanecer incompleta, mas nunca ser apresentada como operacional. Requer aprovação de ciclo de vida.
- **B2 — Inicialização na mesma transação:** criar rede e vínculos Principal/Profissional antes de COMMIT; só commit completo libera. Se profissional ainda não estiver definido, cadastro precisa esperar — confirmar UX/fluxo.
- **B3 — Sem rede até vínculo completo:** criar Pessoa Idosa primeiro e constituir rede posteriormente em ato único, mantendo dados do perfil sem rede; complexo para telas intermediárias.

Não afirmar que B1 está aprovado. Critério obrigatório: uma rede operacional jamais pode tornar observável 0 Principal ou 0 Profissionais.

## 4. Reingresso (DB-003)

- **R1 — participação por episódio:** após desvínculo preservado, novo membro_id para nova vigência, mesmo usuário+rede. Favorece autoria histórica e acoplamento temporal, exige unicidade apenas para episódio ativo.
- **R2 — participação fixa + históricos de vigência:** um membro_id por usuário+rede e vários períodos de atividade em entidade separada. Facilita referências estáveis, mas adiciona tabela de episódios e consultas temporais.
- **Preferência exploratória:** R1, se US-006 exige preservação histórica e nenhum requisito proíbe reingresso. Ainda precisa decisão de negócio.

## 5. Operações transacionais — contratos de comportamento, NÃO SQL

### OP-01: constituir rede operável

**Pré:** titular/id do perfil conhecido, conta de familiar Principal válida, Profissional autorizado/participante definido de modo permitido. **Dentro de transação serializada por rede:** criar contexto, associação, vínculos/categorias e concessão Principal; verificar contagem Principais=1 e Profissionais>=1; marcar OPERACIONAL somente se a estratégia de bootstrap exigir. **Pós:** rede publicada completa, sem papéis misturados. **Falha:** rollback; perfil independente pode existir se ciclo de vida permitir.

### OP-02: transferir Principal de A para B

**Pré:** ator tem permissão de administração da rede, A é único Principal atual, B está vinculado como Familiar elegível da mesma rede, estado da rede permite operação. **Lock em linha de rede** para serializar qualquer operação que muda vínculos/papéis, seguida de locks em ordem estável. **Transação:** revogar concessão Principal de A e ativar concessão Principal de B, preservando demais papéis; verificar exatamente um Principal ao estado final; gravar auditoria; confirmar. **Pós:** A deixa de ser Principal mas mantém Apoio/Emergência se possuía; B recebe Principal mesmo que já tivesse outro papel familiar. Nenhuma transação concorrente pode publicar dois Principais ou deixar zero. **Falha:** rollback integral.

**ATENÇÃO:** se existir UNIQUE condicional, a ordem de revogação/concessão deve respeitar verificação imediata (FKs/UNIQUE não são deferred no MySQL). Só usar a estratégia depois de prova concreta do isolamento/indice na versão escolhida.

### OP-03: desvincular membro X

**Pré:** ator administra rede; X participa de R. **Transação:** validar que X não é o único Principal (ou transferir no mesmo fluxo), que não é último Profissional em rede operacional, e que referências de tarefas/plantões pendentes foram tratadas segundo ADR; encerrar acesso a partir de t, não apagar vínculo histórico; auditar. **Pós:** leituras e escritas futuras negadas a X, registros históricos permanecem.

### OP-04: conceder/revogar papel não Principal

**Pré:** membro é Familiar ativo da mesma rede. **Transação:** serializar estado da rede, validar inexistência de concessão ativa duplicada do mesmo papel, gravar/revogar concessão, auditar. **Pós:** união de permissões imediatamente refletida, sem papel duplicado nem notificações duplicadas.

### OP-05: vincular Profissional

**Pré:** usuário válido e categoria profissional sem conflito; regras de habilitação ainda a definir. **Transação:** criar episódio de participação e vinculação correta; auditar. **Pós:** consulta de profissionais ativos refletida. Não atribuir papel familiar para “completar” Principal.

### OP-06: habilitar acesso da Pessoa Idosa

**Pré:** perfil com titular identificado, credencial definida pelo próprio titular, mecanismo de ativação autorizado. **Transação:** vincular a conta própria ao perfil com cardinalidade definida; jamais copiar a senha do Familiar; auditar habilitação sem segredos. **Pós:** conta só consulta T03–T15 do próprio cuidado; T16/T17/CSV/POST negados. **PENDENTE:** protocolo de convite/expiração e identidade híbrida DB-025.

## 6. Transação, isolamento, concorrência e recuperação

- Toda operação que lê condição e depois escreve deve fazê-lo na **mesma transação**, com locks apropriados no agregador estável (rede), não apenas SELECT normal seguido de UPDATE.
- Ordenar locks de forma estável: rede → membros → concessões/histórico. Reduz mas não elimina deadlocks; implementar retry apenas para erros transitórios conhecidos.
- Semântica de autorização deve ser checada dentro da transação, não apenas no clique anterior.
- Reprocessamento com chave de idempotência evita transferência duplicada, reentrada e evento N01 duplicado (quando aplicável).
- Falha após gravar regra mas antes de auditoria obrigatória requer política de transação/outbox; não declarar atomicidade cross-service sem desenho.
- Leitura autorizada à rede após COMMIT deve ver estado consistente. Não assumir que um teste sequencial em memória prova garantia entre conexões reais.

## 7. Referências técnicas

MySQL 8.4: https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html ; https://dev.mysql.com/doc/refman/8.4/en/constraint-foreign-key.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html ; https://dev.mysql.com/doc/refman/8.4/en/create-table-generated-columns.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html .

**Próximo gate:** selecionar alternativas em ADR com revisão; então construir modelo lógico tipado, testar MySQL descartável e só depois fornecer DDL de produção.
