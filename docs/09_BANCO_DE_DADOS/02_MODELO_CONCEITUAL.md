# 02 — Visão conceitual e relacionamentos

## Agregados de domínio

**Identidade e cuidado:** Usuário; Pessoa Idosa; Rede de Cuidado; Participação na Rede; Papel Familiar atribuído; habilitação de acesso da própria Pessoa Idosa (condicional). Usuário é identidade autenticável; participação representa autorização num contexto; Papel é uma concessão sobre a participação, não atributo global de usuário.

**Escala e rotina:** Plantão; Troca solicitada; Evento de alteração do plantão (candidato); Tarefa; Conclusão; Compromisso. Plantonista Atual é predicado derivado do intervalo, não entidade.

**Registros e saúde:** Registro de Cuidado; Revisão/Correção; Medicamento; Regime/Posologia; Horário; Administração; Consulta; Recomendação; Anexo. Conteúdo específico não deve perder origem, autor e registro temporal.

**Apoio e proteção:** Contato Importante; Informação de Emergência; Preferência Opcional; Evento de Auditoria. Entrega/transporte de notificação é infraestrutura condicional e não inbox.

## Relacionamentos (propostas até homologação)

| A ↔ B | A possui B | Obrigatoriedade e notas |
|---|---|---|
| Usuário ↔ Pessoa Idosa (conta própria) | 1 : 0..1 | associação opcional/única; idosa não tem papel familiar |
| Pessoa Idosa ↔ Rede | 1 : 0..N **ou** 1 : 0..1 | **PENDENTE**; escolher antes de UNIQUE |
| Rede ↔ Participação | 1 : N após ativação | pode existir setup provisório, sem liberar operação |
| Usuário ↔ Participação | 1 : 0..N | um usuário em múltiplas redes, permissões isoladas |
| Participação Familiar ↔ Papel | 1 : 0..N vigentes/históricos | acumulação positiva; incompatível com Profissional |
| Participação ↔ Plantão | 1 : 0..N | pertencem à mesma rede; tempo de vigência determina atual |
| Plantão ↔ Pedido de Troca | 1 : 0..N | múltiplas solicitações históricas, resultado por solicitação |
| Rede ↔ Tarefa | 1 : 0..N | responsável pode ser membro elegível, mesmo escopo |
| Tarefa ↔ Conclusão | 1 : 0..1 **ou** 1 : 0..N | **PENDENTE** reabertura e retentativa |
| Pessoa Idosa ↔ Compromisso | 1 : 0..N | datas relacionadas ao cuidado |
| Compromisso ↔ Consulta | 1 : 0..1 ou relacionamento independente | **PENDENTE**; não pressupor que toda consulta foi compromisso |
| Consulta ↔ Recomendação | 1 : 0..N quando origem em consulta | recomendações independentes dependem de definição |
| Pessoa Idosa ↔ Medicamento | 1 : 0..N | medicamento contextual, não prontuário global |
| Medicamento ↔ Regime/Posologia | 1 : 0..N histórico | regime pode evoluir sem apagar histórico |
| Regime ↔ Horários | 1 : 0..N | horário especifica recorrência |
| Regime ↔ Administração | 1 : 0..N | executor/autoria/horário real |
| Pessoa Idosa ↔ Registro de Cuidado | 1 : 0..N | diário e sintomas; definição do envelope em aberto |
| Registro ↔ Correção | 1 : 0..N | originais e versões append-only |
| Registro ↔ Anexo | 1 : 0..N | ao menos um alvo de FK real, sem vínculo ambíguo |
| Pessoa Idosa ↔ Contato Importante | 1 : 0..N | contato externo não exige conta |
| Pessoa Idosa ↔ Informação Emergência | 1 : 0..1 **ou** 1 : 0..N revisões | **PENDENTE** temporalização |
| Participação/Usuário ↔ Preferência | 1 : 0..N | somente eventos configuráveis |
| Usuário ↔ Auditoria | 1 : 0..N | ator opcional para erro anônimo, com contexto quando conhecido |

### Relações importantes que não viram tabela por padrão

- Calendário T04 = projeção da escala, compromissos, tarefas e cuidado programado.
- Detalhamento T05 = visão por pessoa idosa, intervalo temporal, permissões e eventos.
- Home T03 = resumo de consultas; Histórico T07 = projeção de eventos/versões; T17 = consultas à auditoria.
- Estado `Atrasado` = hora prevista ultrapassada por 15 minutos e ausência de registro; **não** prova falha de cuidado.
- Plantonista Atual = participação elegível + `inicio <= agora < fim` + situação ativa + rede.
- Redirecionamento N01–N04 = navegação e feedback no frontend, não entidade de mensagem em caixa de entrada.

## Pontos arquiteturais sensíveis

**Invariante global vs. local:** exatamente um Principal e ao menos um Profissional vinculados são propriedades da **rede inteira**, não de linha individual. É preciso especificar onboarding/estado de ativação e transações de transferência; FK ou CHECK isolado não comprovam a regra.

**Segurança contra “vazamento entre redes”:** qualquer referência de um registro a um membro responsável deve assegurar que o membro pertence à mesma rede do registro, por FK composta quando viável ou validação transacional central (não mera checagem de tela).

**Correção transversal:** os requisitos incluem diário, administração de medicamentos, consultas e outros registros. Antes de escolher `correcao_registro` universal, definir envelope comum e payload tipado ou revisões separadas por domínio. Não registrar correção com ponteiro textual `tipo+id` se for possível preservá-la por FK real.

**Temporalidade:** usar intervalos semiabertos `[inicio, fim)` como **proposta**, permitindo troca de responsável às 12:00 sem ambiguidade. Definir timezone antes do DDL.

Veja [03](03_DICIONARIO_DE_DADOS.md), [04](04_INVARIANTES_E_INTEGRIDADE.md) e [14](14_DECISOES_PENDENTES.md).
