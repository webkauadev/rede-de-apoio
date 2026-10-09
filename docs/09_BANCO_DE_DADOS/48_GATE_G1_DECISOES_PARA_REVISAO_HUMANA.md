# 48 — Gate G1: decisões funcionais que precisam de resposta antes do DDL

**Este arquivo é um roteiro de deliberação e não uma deliberação.** Nenhuma escolha abaixo foi ratificada nesta rodada. O objetivo é apresentar ao time decisões mutuamente excludentes e a consequência de cada escolha, sem reiniciar P01/P03/P04/P05/P06 já aprovadas.

## 1. Primeiro bloco — definição de rede

### DB-001: Quantas redes a mesma Pessoa Idosa pode ter?

- **A1:** uma única rede em toda a vida do perfil.
- **A2:** várias redes históricas, mas no máximo uma **operacional de cada vez**.
- **B:** várias redes **operacionais ao mesmo tempo**.

**Fonte:** RF03/US-003, RF04/US-005/006 e RN-001/RN-004 não escolhem A1/A2/B. **Saída esperada:** alternativa com autor/data e justificativa + política sobre registros/medicamentos pertencentes à pessoa versus à rede. [41](41_DB001_CARDINALIDADE_E_ESCOPO_REDES.md).

### DB-002: Como constituir a primeira rede mantendo RN-001/RN-004?

- **B1:** registro não-operacional EM_CONFIGURACAO; requer **decisão funcional expressa** sobre sua existência com 0 Principal/Profissional.
- **B2:** perfil/rede/Principal/Profissional criados numa operação transacional completa; precisa satisfazer fluxo T12/T13.
- **B3:** primeiro perfil, depois constituir rede com todos os vínculos numa operação completa.

**Fonte:** critério aprovado US-003/#39 diz que perfil é contexto ao qual rede será vinculada; não especifica a transação. **Saída esperada:** alternativa + quem tem poder de criar primeiro Principal/Profissional e o que é possível antes da operação. [42](42_DB002_CONSTITUICAO_E_ATIVACAO_REDE.md).

## 2. Segundo bloco — vínculos e integridade

### DB-003/027: histórico e reingresso

- **Pergunta 1:** após desvínculo, usuário pode voltar à mesma rede? (sim/não).
- **Se sim:** **E1** novo `membro_id` por episódio, ou **E2** participação estável e períodos separados.
- **Condição inalterável:** US-006/#42 preserva registros antigos e revoga acesso futuro. Papéis antigos não devem reaparecer por acidente.
- **Saída esperada:** semântica de `ativo` e do instante de término, com casos na fronteira. [43](43_DB003_004_EPISODIOS_PRINCIPAL_AUDITORIA.md).

### DB-004/026/028: Principal, categoria, último Profissional e saída

- **Pergunta estrutural:** como representar a fonte única do Principal vigente: concessão única condicional U1 ou ponteiro de rede U2? Não escolher dois campos que divergem.
- **Pergunta de negócio:** como agir se alguém tentar sair sendo único Principal ou último Profissional? Devolver recusa, exigir substituição atômica, ou suspender rede por estado formalmente aprovado?
- **Pergunta operacional:** tarefas/plantões futuros de pessoa desvinculada devem ser reatribuídos, suspensos ou cancelados? Não usar “delete cascade” de histórico.
- **Condições inalteráveis:** exatamente um Principal ativo por rede operacional e >=1 Profissional, categoria Profissional não familiar. [19](19_ALTERNATIVAS_E_TRANSACOES_NUCLEO.md), [43](43_DB003_004_EPISODIOS_PRINCIPAL_AUDITORIA.md).

## 3. Terceiro bloco — N02 com vários plantonistas (DB-030)

**DEC-S01 já aprovou** a validade de plantões distintos e simultâneos. **A regra canônica N02 continua singular:** “somente o usuário que estiver ocupando a condição de Plantonista Atual naquele momento”.

- **A (recomendação técnica NÃO aprovada):** cada ocorrência programada tem responsável explicitamente designado dentre os Plantonistas Atuais elegíveis; N02 vai apenas a essa conta.
- **B:** N02 vai a todos os Plantonistas Atuais elegíveis; altera a semântica de destinatários singular e exige revisão explícita.
- **C:** uma política de designação/rodízio aprovada escolhe destinatário único; requer especificar critérios/escopo/auditoria.

**Além de A/B/C:** responder ao caso sem plantonista e ao caso em que o responsável inicialmente designado perdeu o plantão. Nenhuma seleção aleatória, “primeiro do banco” ou fallback ao Principal está autorizada. [38](38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md).

## 4. Critério de saída do Gate G1

O Gate G1 só está concluído quando:
1. DB-001 e DB-002 registram escolha explícita e compatível, sem deixar rede operacional com zero Principal ou Profissional.
2. DB-003/027/004/026/028 têm interpretação suficiente para chaves de participação, histórias e ações de saída. A evidência de autorização atual precisa ser testável.
3. DB-030 tem política explícita validada pela equipe em RF17/US-020/N02 e exceções para falta de destinatário.
4. As mudanças do solicitante DEC-S01/02/03 são reconciliadas na fonte de RF/US e critérios, quando acrescentarem comportamento.
5. Há revisão humana das questões antes de congelar o modelo lógico ou pedir permissão para SQL.

**Não criar automaticamente novas RF/US para cada pergunta:** os RF/US aprovados seguem únicos; quando a regra muda, editar sua origem e registrar decisão conforme `AGENTS.md`.

## 5. Pares de decisões que não podem ser tomados isoladamente

| Par | Armadilha se decidir isoladamente | Como conferir |
|---|---|---|
| DB-001 + DB-002 | permitir B várias redes e assumir uma rede por perfil no bootstrap | simular duas redes de E1 com Principais e Profissionais independentes |
| DB-002 + RN-001/RN-004 | aprovar B1 e chamar rede vazia de OPERACIONAL | validar estado, contagem e restrições nas operações |
| DB-003 + DB-027 | reutilizar vínculo encerrado e reativar papel antigo | checar datas, revogações e autoria anterior |
| DB-004 + DB-028 | remover Principal/último Profissional deixando rede ativa | prova de transação indivisível ou suspensão decidida |
| DEC-S01 + DB-030 | selecionar arbitrariamente N02 quando P1/P2 coincidem | caso N2-04 do documento 38 |
| DEC-S03 + DB-007 | criar duas conclusões de tarefa na mesma ocorrência | lock/versão/idempotência e restrição por ciclo |
| DB-001 + RNF01 | usuário da R1 enxergar R2 por ambos terem mesma E1 | consulta com scoping contextual + teste negativo |

## 6. Resultado do trabalho nesta rodada

Preparação/documentação das alternativas e fontes **completada**; **nenhuma decisão adicional tomada**; **nenhum teste físico executado**. A auditoria dos critérios de aceite de P01 está no [47](47_AUDITORIA_FONTES_APROVACOES.md).
