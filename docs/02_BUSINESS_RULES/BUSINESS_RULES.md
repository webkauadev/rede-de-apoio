# Business Rules — Rede de Apoio

## RN-001 — Familiar Principal único

Deve existir exatamente um Familiar Principal ativo por pessoa idosa/rede de cuidado.

A transferência de Principal deve ser atômica: não pode existir intervalo com dois Principais nem com nenhum Principal.

## RN-002 — Papéis familiares acumuláveis

Familiar é a categoria. Os papéis Principal, Apoio e Emergência são acumuláveis.

- Principal pode acumular Apoio;
- Emergência pode acumular Principal ou Apoio;
- pode existir zero ou mais Apoios e Emergências;
- permissões familiares são derivadas dos papéis acumulados;
- a permissão efetiva é a **união das permissões positivas** concedidas pelos papéis acumulados;
- restrições explícitas de segurança, privacidade, escopo do recurso e condições operacionais prevalecem sobre a união;
- acumular papéis não elimina condições contextuais da operação;
- não duplicar notificações por acúmulo de papéis.

## RN-003 — Plantonista Atual não é usuário

Plantonista Atual é condição operacional temporária baseada no intervalo de plantão ativo.

Um Familiar vinculado ou Profissional da Saúde pode ocupar essa condição. Ao terminar o plantão, a condição deixa de existir.

Quando uma permissão de escrita exigir a condição de Plantonista Atual, acumular papéis familiares não remove essa exigência.

## RN-004 — Profissional da Saúde separado

Profissional da Saúde é categoria independente e não recebe papéis familiares. Pode existir mais de um e deve existir ao menos um profissional vinculado à rede.

Pode produzir registros de saúde do seu domínio enquanto estiver vinculado e autorizado para o recurso correspondente.

## RN-005 — Registros de cuidado imutáveis

Após criação, um registro não deve ser apagado, sobrescrito ou alterado diretamente para correção.

## RN-006 — Correção versionada

Correções criam novo registro vinculado ao original, preservando o registro original, autoria, data/hora e histórico.

Origem canônica da US-034: RNF02 — Imutabilidade e correção versionada.

Pode criar correção qualquer usuário que possua, naquele momento, permissão efetiva para produzir o mesmo tipo de registro. A correção não é restrita ao autor original. Permissão apenas de leitura não concede permissão de correção.

## RN-007 — Dados sensíveis

Dados pessoais e de saúde exigem controle de acesso e rastreabilidade conforme RNF01.

## RN-008 — Auditoria

Operações relevantes devem registrar usuário, categoria/papéis quando aplicável, pessoa idosa, data/hora, operação, recurso e resultado.

RNF03 é transversal. RF29 permanece origem única da US-033.

Exportações CSV e tentativas de acesso negadas são operações auditáveis.

## RN-009 — Pessoa Idosa read-only

RF30/US-036 estão aprovados canonicamente.

A Pessoa Idosa:

- usa a mesma autenticação do aplicativo;
- possui conta vinculada ao próprio perfil;
- acessa somente informações autorizadas relacionadas ao próprio cuidado;
- possui acesso somente leitura;
- não recebe papéis familiares;
- não é Plantonista Atual;
- não cria, corrige, conclui ou altera registros;
- não administra membros, papéis, plantões, tarefas ou demais estruturas da rede;
- não exporta CSV na primeira versão;
- define a própria senha; familiar não deve visualizar nem definir sua senha em texto aberto;
- tem acessos e tentativas negadas sujeitos a RNF01 e à trilha de auditoria.

Não criar aplicativo separado para essa categoria de acesso.

## RN-010 — Escrita por categoria e contexto

- Familiar Principal pode criar registros compatíveis com o cuidado.
- Familiar de Apoio e Familiar de Emergência podem criar registros somente quando forem Plantonista Atual ou possuírem responsabilidade operacional explicitamente atribuída para a ação correspondente.
- Profissional da Saúde pode criar registros de saúde do seu domínio enquanto estiver vinculado e autorizado para o recurso.
- A permissão de correção segue RN-006.
- A composição de papéis familiares segue RN-002.

## RN-011 — Exportação CSV

Na primeira versão, somente o Familiar Principal pode exportar histórico CSV.

A exportação:

- é contextual em T07 — Histórico de Cuidados;
- limita-se ao histórico autorizado da Pessoa Idosa selecionada;
- não é concedida a Apoio, Emergência, Profissional da Saúde ou Pessoa Idosa;
- deve ser registrada na trilha de auditoria.

## Estados de cuidado

Estados reconhecidos:

- Programado
- Pendente
- Atrasado
- Concluído
- Sem registro de execução
- Corrigido

Regras:

- “Atrasado” ocorre após 15 minutos sem registro quando existe ação com horário programado;
- “Sem registro” significa somente ausência de registro no sistema e não prova que o cuidado não aconteceu;
- sintomas/intercorrências espontâneas não são classificados como atrasados;
- “Corrigido” deve preservar o original conforme RN-005/RN-006/RNF02.

## Ratificação operacional da V1 — 2026-10-09

**Autorização explícita do solicitante para decidir e homologar as alternativas pendentes.** Registro completo com 38 ADRs: [DECISOES_V1_HOMOLOGADAS.md](../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md). Este adendo não remove nem altera os critérios aprovados P01/#73.

- **Pessoa Idosa ↔ Rede:** uma rede por perfil na V1; perfil pode existir antes da rede. A constituição da rede com **um Familiar Principal e ao menos um Profissional** ocorre de modo **atômico**, sem estado operacional incompleto; se falhar, rollback.
- **Participação:** desvínculo revoga futuro acesso e papéis; reingresso exige novo episódio/concessão, preservando histórico. Não desvincular último Principal/Profissional sem substituição atômica. Pendências futuras de plantões/tarefas são resolvidas expressamente antes da saída; sem atribuição silenciosa.
- **Escalas:** plantões distintos podem se sobrepor; cada plantão tem um responsável. Trocas V1 são de responsável de um plantão com controle de versão; não permuta bilateral.
- **Tarefa:** uma conclusão por tarefa; não reabrir na V1. Reenvio de comando idêntico não duplica resultado.
- **Saúde:** cuidado programado, fato de execução e alerta são distintos. Por ocorrência programada, no máximo uma administração registrada na V1; administração avulsa exige autorização e evento distinto. Não interpretar ausência de registro como não realização; PRN e agendamento DST ambíguo não são automatizados.
- **Correções/anexos:** original imutável, correções por domínio com snapshot completo/justificativa e autoria atual; anexo vinculado ao original e controle de leitura na API.
- **Segurança/retention:** nenhuma exclusão automática de dado de saúde; prazo legal/retention depende de revisão específica antes de produção. Acessos negados auditados mesmo em rollback de negócio, sem conteúdo clínico em logs.
- **Pessoa Idosa:** conta própria do tipo somente leitura, com senha definida pelo próprio titular via convite temporário de uso único, sem papel familiar. Categoria de conta não mistura Pessoa Idosa e Cuidador.
- **Emergência T15:** edição somente pelo Principal vigente na V1; leitura conforme as restrições da matriz. Essa decisão restringe edição e não amplifica outros privilégios.

**Limite da homologação:** é autorização para implementação técnica V1, não prova de conformidade LGPD nem de funcionamento MySQL/integração. Para decisões posteriores fora da V1, criar nova ADR.

## Exceção controlada de constituição inicial — US-003/RN-001

O cadastro T12 no **bootstrap** pode ser iniciado por cuidador autenticado que será o primeiro Principal, mesmo antes do vínculo operacional existir. Esse cadastro não concede papel nem leitura de cuidado; o Principal efetivo só surge na transação que cria a rede juntamente com ao menos um Profissional. Perfil sem rede não é rede operacional. Ver [decisão B3](../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md).
