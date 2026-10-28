# Matriz de rastreabilidade verificável — diagramas gerais

**Rodada:** 2026-10-27 · **Fonte:** contratos originais de UC-01/02/03 e CL-01/02/03, SQ-03, permissões e SQL consolidado.  
**Escopo:** mapeamento da **seleção do diagrama geral**, não da totalidade do sistema. Requisitos e IDs são preservados como documentados.

## UC-G — 16 objetivos selecionados

| UC-G | Ator exibido | Caso exibido | Fonte verificável | Ressalva |
|---|---|---|---|---|
| UCG-01 | Familiar Principal | Cadastrar / manter perfil | UC01 U-03/U-04; RF03/US-003/004 | Cadastro inicial exige bootstrap restrito DB-002; papel Principal ainda não existe na constituição prévia |
| UCG-02 | Familiar Principal | Constituir e gerir rede | UC01 U-05/U-06/U-07/U-08; DB-002/004 | Caso resumido, não substitui vínculo, desvínculo, papel e transferência atômica em separado |
| UCG-03 | Familiar Principal | Gerenciar plantões | UC02 U-12; RF06/US-008 | UC02 define «Usuário Autorizado»: aqui é uma participação autorizada, não exclusividade do Principal |
| UCG-04 | Familiar Principal | Exportar histórico CSV | UC03 U-34; RF28/US-032; matriz de permissões | Exclusivo do Principal vigente; auditar e limitar histórico |
| UCG-05 | Familiar Apoio/Emergência | Consultar calendário | UC02 U-13/U-14; RF07/US-009/010 | Só com vínculo e contexto de leitura autorizados |
| UCG-06 | Familiar Apoio/Emergência | Solicitar troca de plantão | UC02 U-16; RF09/US-012 | Deve ser Usuário Vinculado ao plantão do pedido; não é acesso irrestrito por categoria |
| UCG-07 | Familiar Apoio/Emergência | Registrar cuidado | UC03 U-22/U-28; RF11/18, US-015/021 | Exige Plantonista Atual ou atribuição operacional explícita e autorização ao tipo |
| UCG-08 | Familiar Apoio/Emergência | Corrigir registro | UC03 U-36; RNF02/US-034 | Exige na hora da correção a permissão efetiva de produzir mesmo tipo |
| UCG-09 | Profissional da Saúde | Cadastrar medicamento | UC03 U-24; RF14/US-017 | Profissional precisa estar vinculado/autorizado e respeitar domínio do recurso |
| UCG-10 | Profissional da Saúde | Registrar administração | UC03 U-26; RF16/US-019 | Não inferir que só Profissional pode registrar; permissionamento é contextual |
| UCG-11 | Profissional da Saúde | Registrar consulta | UC03 U-29; RF19/US-022 | Caso integral é «consulta ou recomendação»; assinatura visual é abreviada |
| UCG-12 | Profissional da Saúde | Anexar documento | UC03 U-30; RF23/US-027; DB-013/037 | Anexo a original compatível, um pai global e permissões do recurso |
| UCG-13 | Pessoa Idosa | Consultar próprio perfil | Matriz de permissões T12/RF30/US-036; UC01 U-11 como leitura genérica | Não há caso U-xx exclusivo «Consultar próprio perfil» em UC01; é refinamento seletivo da whitelist |
| UCG-14 | Pessoa Idosa | Consultar próprio cuidado | UC01 U-11; RF30/US-036 | Somente seu próprio contexto e leitura |
| UCG-15 | Pessoa Idosa | Consultar histórico | UC03 U-23; RF12/US-016 e US-036 | Sem exportar nem corrigir |
| UCG-16 | Pessoa Idosa | Consultar emergência | UC01 U-10; RF24/US-028; US-036/T15 | Somente leitura e escopo próprio |

**Lacunas conscientes:** autenticar-se U-02 não está no UC-G, embora seja pré-condição técnica de utilização; cadastro elegível U-01 não é mostrado. Transferência de Principal U-08, preferência de notificações U-33, consulta de auditoria U-35 e conclusão de tarefa U-21 também não aparecem como elipses próprias. Não usar UC-G para provar cobertura integral dos RF01–RF30/US-001–036. A posição das elipses por grupo representa *exemplos de participação*, não herança, exclusividade ou autorização automática.

## CL-G — 18 relações selecionadas (13 originais + 5 integradas)

| Rel. | Fonte | Representação atual | Verificação e limite |
|---|---|---|---|
| R01 | CL01-R01 | Usuario [0..1] — [0..1] PessoaIdosa | Conta de titular idoso opcional |
| R02 | CL01-R02 | PessoaIdosa [1] — [0..1] RedeCuidado | Perfil sem rede possível; rede aponta a um perfil |
| R03 | CL01-R03 | RedeCuidado [1] — [1..*] MembroRede | 1..* **somente para rede operacional**; mínimo de Principal e Profissional é restrição de negócio, não capturável por essa multiplicidade |
| R04 | CL01-R05 | MembroRede [1] — [0..*] AtribuicaoPapelFamiliar | Apenas membro familiar recebe papel |
| R05 | CL02-R01 | MembroRede [1] — [0..*] Plantao | Responsável único por plantão; sobreposição entre plantões permitida |
| R06 | CL02-R04 | MembroRede [0..1] — [0..*] Tarefa | Responsável opcional antes de atribuição |
| R07 | CL02-R02 | Plantao [1] — [0..*] SolicitacaoTrocaPlantao | Uma solicitação refere-se a um plantão |
| R08 | CL02-R05 | Tarefa [1] — [0..1] ConclusaoTarefa | Ciclo único da V1 |
| R09 | CL03-R01 | Medicamento [1] — [0..*] RegimeMedicamento | Um medicamento pode ter planos versionados |
| R10 | CL03-R02 | RegimeMedicamento [1] — [0..*] HorarioRegime | Zero ou mais horários prescritos |
| R11 | CL03-R03 | HorarioRegime [0..1] — [0..*] OcorrenciaProgramada | Quando origem é tarefa, horário ausente |
| R12 | CL03-R04 | OcorrenciaProgramada [0..1] — [0..1] AdministracaoMedicamento | Avulsa permitida, vinculação em até uma ocorrência |
| R13 | CL03-R05 | RegistroCuidado [1] — [0..*] CorrecaoRegistro | Correção versão ligada ao original; não é composição |

## CL-G — Cinco relações canônicas integradas na quarta rodada

A auditoria terceira rodada identificou cinco ausências (**AG3-006**). Elas **foram desenhadas e verificadas visualmente** em 2026-10-27, no próprio CL-G, preservando as 13 associações preexistentes.

| Relação acrescentada | Fonte original | Multiplicidade em cada ponta | Papel de associação |
|---|---|---|---|
| R14 Usuario — MembroRede | CL01-R04 | perto de Usuario **1**, MembroRede **0..*** | participa por |
| R15 SolicitacaoTrocaPlantao — MembroRede | CL02-R03a | perto de Solicitação **0..***, MembroRede **1** | solicitante |
| R16 SolicitacaoTrocaPlantao — MembroRede | CL02-R03b | perto de Solicitação **0..***, MembroRede **1** | destinatário |
| R17 SolicitacaoTrocaPlantao — MembroRede | CL02-R03c | perto de Solicitação **0..***, MembroRede **0..1** | respondente (opcional) |
| R18 MembroRede — ConclusaoTarefa | CL02-R06 | perto de MembroRede **1**, ConclusaoTarefa **0..*** | executa |

**Contagem visual conferida:** 18 linhas de associação e **36 valores de multiplicidade** (2 por associação). As três relações da troca são três conexões diferentes, não uma generalização, classe nova ou uma tripla associação multiplicativa. A legenda cromática tem valor didático; a semântica reside nas relações e nos papéis. O vínculo `Tarefa — OcorrenciaProgramada` é suportado pelo SQL (`fk_ocorrencia_tarefa` e XOR), porém não é relação CL03-R03 e deve ser modelado conceitualmente como relação **derivada**, nunca atribuído falsamente a um contrato existente.


Há ainda classes excluídas deliberadamente: `ContatoImportante`, `InformacaoEmergencia`, `Compromisso`, `Consulta`, `Recomendacao`, `Anexo`, `Auditoria`. Suas relações não podem aparecer como se os nós estivessem presentes.

## SQ-G — natureza das mensagens

Os contratos SQ-03 existentes utilizam *quatro participantes e seis mensagens* para o registro de administração. O SQ-G incorpora uma consulta do dia e serviços intermediários **[INFERÊNCIA ARQUITETURAL]**; por isso, somente as equivalências abaixo podem ser apresentadas como derivadas diretamente de SQ-03:

| SQ-G | Equivalência | Situação |
|---|---|---|
| M07 `informarAdministracao(dados)` | SQ03 M-01 | Correspondência direta |
| M08 `registrarAdministracao(dados)` | SQ03 M-02 | Correspondência direta |
| M10 `registrar(realizadaEm, autor)` | SQ03 M-03 / CL03 C-C07 | Correspondência direta |
| M11 `administracaoRegistrada` | SQ03 M-04 | Correspondência direta |
| M13 `resultadoRegistro` | SQ03 M-05 | Correspondência direta |
| M15 `acessoNegado()` | SQ03 M-06 | Correspondência direta |

**M01–M06**, **M09/M09R** e **M12/M14** são composição técnica e extensão arquitetural do SQ-G. `registrarEvento(...)` tem assinatura baseada em CL03 C-C11, mas a lifeline do `Serviço de Auditoria` é inferida. A realização efetiva de N03 depende dos critérios de RF25/US-029 e não é demonstrada por chamada concreta do SQ-G. Separar cenários de leitura negada, idempotência/replay, conflito 409, falta de auditoria fail-closed e outras exceções, sem colocá-los no caminho feliz.

## DB-G — fidelidade física

No SQL consolidado, a contagem foi verificada por busca de **34 declarações `CREATE TABLE`**: 32 usam `IF NOT EXISTS`; 2 aditivas (`sessao_usuario`, `login_rate_limit`) não usam. Existem **79 cláusulas `FOREIGN KEY`** no texto consolidado. Uma busca restrita a `CREATE TABLE IF NOT EXISTS` retorna 32 e seria uma contagem incorreta do banco completo.

A prancha DB-G seleciona 17 tabelas e **11 trechos de vínculo** internos (um deles agrupa duas FKs distintas de `pessoa_idosa` para `usuario`). Esses trechos **não** equivalem a «11 FKs de todo o recorte»: várias relações, sobretudo entre domínios, são exibidas apenas textualmente. Somente [SQL físico](../../../entrega/sql-eer/01_schema_completo_v1.sql) / [EER geral nativo](../../../entrega/sql-eer/diagrama_geral.svg) comprova as 79 FKs.

Fontes relacionadas: [contratos individuais](../especificacao-para-figma/00-matriz-rastreabilidade.md), [governança](../especificacao-para-figma/00-governanca-transversal.md), [matriz de permissões](../../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md), [decisões V1](../../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md).

**Status:** matriz atualizada após auditoria 4; recortes não constituem cobertura integral do produto. Nem cobertura integral dos requisitos, nem aprovação acadêmica independente.
