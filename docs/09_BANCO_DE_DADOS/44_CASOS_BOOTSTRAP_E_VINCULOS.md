# 44 — Caderno de mesa: redes, constituição inicial e vínculos históricos

**Status:** 36 cenários de **planejamento**, não executados em MySQL. As linhas condicionais dependem das ADRs DB-001/002/003/004/027/028. Não devem virar critério de aceite sem decisão humana de sua origem. Identificadores **B-T01–B-T36** (diferentes de T, K-T, L-T, V-T e C-T). Fontes canônicas: RF03/RF04/RF05/RF30; US-003/005/006/007/036; RN-001/002/004/008/009/010; RNF01/RNF03.

## Ambiente sintético

E1 e E2 são pessoas fictícias. R1 cuida E1; R2 pode também cuidar E1 **somente se** DB-001 permitir. Ana é Familiar Principal da R1, Bruno é Familiar Apoio, Carla é Profissional da Saúde; Diego é Familiar Principal de eventual R2, Eva é Profissional da R2. Tempos `t0<t1<t2` são instantes simulados.

### DB-001 — Escopo de Rede e Pessoa Idosa

| ID | Cenário | Resultado esperado/status |
|---|---|---|
| B-T01 | E1 possui R1 e tenta criar R2 simultânea sob A1 | **CONDICIONAL A1:** rejeitar segunda rede |
| B-T02 | E1 possui R1 e tenta criar R2 simultânea sob A2 | **CONDICIONAL A2:** não permitir duas redes operacionais |
| B-T03 | R1 encerrada e E1 cria R2 sob A2 | **CONDICIONAL A2:** permitir nova R2, preservar R1 |
| B-T04 | E1 possui R1 e R2 simultâneas sob alternativa B | **CONDICIONAL B:** permitir redes distintas |
| B-T05 | Ana Principal de R1 tenta ler cuidado exclusivo de R2 apenas por conhecer E1 | Negar se não há concessão/autorização a R2; não inferir acesso entre redes |
| B-T06 | E1 titular consulta dados autorizados do próprio cuidado | Read-only; escopo de múltiplas redes depende decisão de compartilhamento |
| B-T07 | Registro de E1 criado por R1 consultado por membro só da R2 | **PENDENTE DB-001:** não compartilhar automaticamente |
| B-T08 | Mesmo medicamento de E1 está listado por R1 e R2 | **PENDENTE DB-001/021:** não duplicar administração nem deduzir compartilhamento |
| B-T09 | Uma única rede R1 tem duas escalas simultâneas P1/P2 | PERMITIR (DEC-S01), independentemente de DB-001 |
| B-T10 | Cada R de E1 tem Familiar Principal diferente, se alternativa B | RN-001 exige exatamente um Principal **em cada R** |
| B-T11 | R1 é encerrada e autor Bruno perdeu vínculo | Consulta por novo autorizado preserva autoria histórica |
| B-T12 | D03 possui `pessoa_idosa_id` e D04 usuário de outra rede | Rejeitar associação cruzada por escopo independente de opção A/B |

### DB-002 — Constituir sem rede operacional inválida

| ID | Cenário | Resultado esperado/status |
|---|---|---|
| B-T13 | Perfil de E1 cadastrado sem login próprio | Não criar senha fictícia para titular; habilitação posterior permitida |
| B-T14 | Tentativa de operar rede com zero Principal | Rejeitar operação; não expor como operacional |
| B-T15 | Tentativa de operar rede com dois Principais | Rejeitar/evitar transação inválida |
| B-T16 | Tentativa de operar rede com um Principal e zero Profissionais | Rejeitar operação; RN-004 |
| B-T17 | Rede com um Principal e um Profissional elegível | Requisitos mínimos de composição satisfeitos; ainda precisa autorização da ação |
| B-T18 | Criar D03 vazio como rede operacional | Proibir, não basta INSERT de rede |
| B-T19 | Estratégia B1 com status EM_CONFIGURACAO e sem Profissional | **CONDICIONAL B1:** não dar permissão operacional; a própria existência dessa fase depende aprovação |
| B-T20 | Estratégia B2 com falha antes de vincular Profissional | **CONDICIONAL B2:** rollback da criação operacional completa |
| B-T21 | Estratégia B3 só tem perfil E1, sem D03 | **CONDICIONAL B3:** perfil existe, rede só nasce em constituição completa |
| B-T22 | Duas ativações concorrentes da mesma rede | Exigir um estado final consistente, sem duplo Principal; validar em duas sessões futuras |
| B-T23 | Dois membros tentam criar Principal no mesmo bootstrap | Não confirmar dois Principais vigentes |
| B-T24 | Remover último Profissional de rede operacional | Bloquear ou alterar estado se procedimento aprovado; nunca manter rede operacional sem Profissional |

### DB-003/004/027/028 — Histórico e papéis

| ID | Cenário | Resultado esperado/status |
|---|---|---|
| B-T25 | Bruno desligado em t1 tenta escrever em t2 | Negar escrita futura; auditar; conservar autoria anterior |
| B-T26 | Bruno era autor de registro em t0; agora desligado | Autor t0 permanece rastreável; não apagar histórico |
| B-T27 | Reingresso de Bruno via episódio novo E1 | **CONDICIONAL DB-003 E1:** novo membro_id e vigência; antigo não é apagado |
| B-T28 | Reingresso de Bruno via E2 (membro estável) | **CONDICIONAL DB-003 E2:** novo episódio_id, sem apagar primeiro |
| B-T29 | Reingresso tenta restaurar automaticamente papel antigo | Não autorizar por simples existência histórica; política de concessão pendente |
| B-T30 | Transferir Principal Ana→Bruno (Familiar) | Após COMMIT único Principal; Ana preserva Emergência, Bruno preserva Apoio |
| B-T31 | Transferir Principal Ana→Carla (Profissional) | Rejeitar categoria incompatível |
| B-T32 | Transferências Ana→Bruno e Ana→Diego concorrentes na R1 | Somente uma transação válida; nenhuma janela commitada com zero ou dois |
| B-T33 | Ana desvinculada enquanto era único Principal | Bloquear desvínculo isolado; transferência/fluxo excepcional requer aprovação |
| B-T34 | Carla removida quando é único Profissional | Não manter rede operacional sem Profissional |
| B-T35 | Desvincular Bruno com tarefa/plantão futuro pendente | Acesso de Bruno revogado; política de reatribuição/cancelamento **PENDENTE DB-028** |
| B-T36 | Usuário desligado tenta ler arquivo que ele próprio anexou no passado | Autoridade antiga não dá acesso atual; negar e auditar |

## Gate de aprovação dos roteiros

**Não sinalizar "36 testes aprovados pelo banco".** Eles são resultados esperados documentados e alguns dependem expressamente de A1/A2/B, B1/B2/B3 e E1/E2. Antes de promover para MySQL, o time deve selecionar variantes DB-001/002/003/004/027/028, conferir critérios canônicos aprovados e escrever fixtures, transações e logs reproduzíveis. Nenhum destes comandos foi executado em MySQL. 
