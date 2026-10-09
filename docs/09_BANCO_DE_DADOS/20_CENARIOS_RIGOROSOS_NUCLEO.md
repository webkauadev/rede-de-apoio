# 20 — Caderno de prova conceitual: identidade, rede, papéis e permissões

**Sem SQL.** Esta matriz especializa T01–T42 do documento 13 e não duplica os identificadores das US/RF. Códigos **K-T01…K-T36** são testes propostos do núcleo, com resultados esperados. Cenários condicionados a ADR não são requisitos aprovados.

## Dados sintéticos e abstração temporal

R1 acompanha Pessoa Idosa E1; R2 acompanha E2. Usuários fictícios: Alice (Familiar Principal+Emergência R1); Bruno (Familiar de Apoio R1); Camila (Familiar de Apoio R1); Dora (Profissional da Saúde R1); Elisa (Familiar Principal R2); Fabio (Profissional da Saúde R2); E1 tem conta própria, somente leitura. Sempre que for preciso registrar instante, usar t explícito, não relógio implícito.

**Definições de teste do estado OPERACIONAL (propostas para operações do banco):**
- conta autenticável U e contexto R são entidades distintas;
- participação ativa significa usuário vinculado em R no instante t e não revogado;
- papel vigente depende do membro familiar e da vigência aprovada;
- soma dos Principais vigentes da rede = 1;
- soma dos Profissionais vigentes da rede >=1;
- Pessoa Idosa não participa como Familiar/Profissional por sua conta de titular;
- permissões sempre condicionadas a contexto e recurso.

## Grupo 1 — Identidade, titular e rede

| Código | Entrada | Saída esperada | Base |
|---|---|---|---|
| K-T01 | Usuário criado, ainda não vinculado a rede | Conta pode existir sem papel concedido | RF01/RF04 |
| K-T02 | Pessoa Idosa cadastrada, sem conta própria | Perfil existe sem credencial criada pelo familiar | RF03/RF30 |
| K-T03 | Pessoa Idosa define credencial própria e ativa acesso | Autenticação compartilhada, permissão só de consulta da própria pessoa | RF30/US-036 |
| K-T04 | Pessoa Idosa tenta assumir Principal/Apoio/Emergência | Negar no modo titular, sem gravar papel | RN-009 |
| K-T05 | Titular E1 solicita dados de E2 mudando identificador | Negar e auditar sem revelar E2 | RNF01/RNF03 |
| K-T06 | Titular E1 tenta consultar T17 ou exportar CSV | Negar e auditar | RF30/RF28 |
| K-T07 | Usuário é Principal em R1 e não é membro de R2 | Acesso não se propaga de R1 a R2 | RNF01 |
| K-T08 | Cadastro de Pessoa Idosa sem Profissional ainda definido | **Resultado funcional da preparação depende DB-002**; jamais liberar rede como operacional incompleta | RN-001/RN-004 |
| K-T09 | Um mesmo usuário é titular E1 e tenta entrar como Familiar em R2 | **Resultado depende DB-025**, não presumir permissão | RF30/RN-009 |

## Grupo 2 — Participações e categorias

| Código | Entrada | Saída esperada | Base |
|---|---|---|---|
| K-T10 | Alice com Principal+Emergência | Uma participação de Alice, duas concessões simultâneas | RN-002 |
| K-T11 | Bruno recebe Apoio, depois Emergência | União positiva, sem criar segundo usuário | RN-002 |
| K-T12 | Dora, Profissional, recebe papel Principal | Rejeitar, pois a categoria não é Familiar | RN-004 |
| K-T13 | Fabio da R2 é selecionado para plantão/tarefa da R1 | Rejeitar referência cruzada | RNF01 |
| K-T14 | Desvincular Bruno e consultar sua autoria passada por outro usuário autorizado | Autoria histórica permanece | RF04/US-006 |
| K-T15 | Desvincular Bruno e tentar nova escrita | Negar e auditar | RNF01 |
| K-T16 | Bruno é desvinculado e vinculado novamente | **Forma de armazenar episódio depende DB-003**; história anterior não é apagada | RF04 |
| K-T17 | Alguém altera categoria de Dora de Profissional para Familiar mantendo registros | Não aceitar alteração silenciosa que quebre a validade histórica; fluxo depende DB-026 | RN-004/RNF03 |
| K-T18 | Usuário tenta executar operação com vínculo da rede errada | Negar mesmo que referência FK simples exista | RNF01 |

## Grupo 3 — Principal e profissionais

| Código | Entrada | Saída esperada | Base |
|---|---|---|---|
| K-T19 | R1 operacional tem Alice Principal e Dora Profissional | Válido | RN-001/RN-004 |
| K-T20 | Registrar segundo Principal Alice+Bruno em R1 | Rejeitar | RN-001 |
| K-T21 | R1 operacional sem Principal | Inválido | RN-001 |
| K-T22 | R1 operacional sem Profissional | Inválido | RN-004 |
| K-T23 | Transferência Alice→Bruno na mesma transação | Depois do COMMIT: Bruno é único Principal; Alice conserva Emergência | RN-001/RN-002 |
| K-T24 | Transferência Alice→Dora Profissional | Rejeitar, não pode ser Principal | RN-004 |
| K-T25 | Transferência Alice→Bruno e Alice→Camila ao mesmo tempo | Apenas um destino aprovado, segundo conflito; jamais dois Principais | RN-001 |
| K-T26 | Desvincular a única Principal Alice sem transferência | Rejeitar em rede operacional | RN-001 |
| K-T27 | Desvincular Dora, única Profissional de R1 | Rejeitar em rede operacional, ou seguir estado de transição se DB-002 o permitir formalmente | RN-004 |
| K-T28 | Vincular segundo Profissional e remover Dora | Permitido se ao final resta ≥1 Profissional; preservar autoria de Dora | RN-004/US-006 |
| K-T29 | Alice é Principal em R1; Elisa em R2 | Válido: exclusividade é por rede | RN-001 |

## Grupo 4 — Permissões, temporalidade e auditoria

| Código | Entrada | Saída esperada | Base |
|---|---|---|---|
| K-T30 | Bruno Apoio fora de plantão, sem atribuição | Negar escrita de cuidado | RN-010 |
| K-T31 | Bruno Apoio como Plantonista Atual | Permitir escrita compatível e autorizada | RN-010/RN-003 |
| K-T32 | Bruno com responsabilidade explicitamente atribuída, sem plantão | Permitir apenas operação atribuída, não tudo | RN-010 |
| K-T33 | Dora Profissional escreve registro fora de seu domínio de saúde | Negar | RN-004/RN-010 |
| K-T34 | Alice transfere Principal; tenta CSV depois da perda do papel | Negar à antiga Principal; novo Principal elegível após transação, sempre no contexto autorizado | RF28/RN-011 |
| K-T35 | Alice é Principal+Emergência e recebe N03 | Uma entrega por usuário/evento, não uma por papel | RN-002/N03 |
| K-T36 | Papel/vínculo revogado; auditoria do evento anterior consultada pelo Principal atual | Preservar categoria/papéis e identidade históricos de modo mínimo e coerente | RNF03 |

## Exercícios de concorrência que **não** podem ser aprovados por simulação

**C1 — transferências simultâneas:** duas conexões DB de verdade iniciam na mesma rede; T1 candidata Bruno, T2 candidata Camila. T2 deve aguardar ou falhar após T1; nenhum commit inválido. Repetir sob REPEATABLE READ e configuração decidida.

**C2 — último Profissional:** transações independentes tentam remover profissionais distintos quando existem exatamente dois; serialização deve impedir que ambas confirmem e deixem zero.

**C3 — conceder segundo Principal:** uma sessão tenta conceder para Bruno enquanto outra revoga Alice; testar ordem e proteção de unicidade incluindo falha/rollback.

**C4 — reingresso durante desvinculação:** usuário que sai tenta iniciar novo episódio ao mesmo tempo; deve ficar uma participação vigente autorizada ou zero conforme operação, sem dois vínculos conflitantes.

**C5 — autorização revogada entre consulta e gravação:** checagem anterior ao lock não basta; a escrita deve verificar autorização de novo na transação.

**C6 — snapshot vs. estado atual:** um cliente retém snapshot antigo após transferência; nova tentativa de escrita/exportação deve ser autorizada com base no estado efetivo atual, não no snapshot.

## Checklist de promoção dos testes para MySQL

Para cada K-T ou C: fixar versão do MySQL; preparar seed sintético; definir pré-condições e comandos; garantir rollback; produzir resultado observável e consulta de auditoria; salvar saída real, erro real e duração; revisar divergências com requisitos; vincular PR de implementação futura. Este documento não contém SQL nem evidência física.
