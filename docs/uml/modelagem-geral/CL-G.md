# CL-G — Núcleo conceitual integrado de classes

[Figma: diagrama editável CL-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6434-3326) · Frame `6434:3326`, 4930×3780 px · 16 classes com atributos e operações essenciais, **18 associações canônicas** e multiplicidades junto aos extremos.

## Inventário
`Usuario`, `PessoaIdosa`, `RedeCuidado`, `MembroRede`, `AtribuicaoPapelFamiliar`, `Plantao`, `SolicitacaoTrocaPlantao`, `Tarefa`, `ConclusaoTarefa`, `Medicamento`, `RegimeMedicamento`, `HorarioRegime`, `OcorrenciaProgramada`, `AdministracaoMedicamento`, `RegistroCuidado`, `CorrecaoRegistro`.

## Relações representadas (sujeitas à conferência nos extremos)
| ID | Classe 1 — Classe 2 | Multiplicidades 1 / 2 | Origem |
|---|---|---|---|
| R01 | Usuario — PessoaIdosa | 0..1 / 0..1 | CL01-R01 |
| R02 | PessoaIdosa — RedeCuidado | 1 / 0..1 | CL01-R02 |
| R03 | RedeCuidado — MembroRede | 1 / 1..* **operacional** | CL01-R03 |
| R04 | MembroRede — AtribuicaoPapelFamiliar | 1 / 0..* | CL01-R05 |
| R05 | MembroRede — Plantao | 1 / 0..* | CL02-R01 |
| R06 | MembroRede — Tarefa | 0..1 / 0..* | CL02-R04 |
| R07 | Plantao — SolicitacaoTrocaPlantao | 1 / 0..* | CL02-R02 |
| R08 | Tarefa — ConclusaoTarefa | 1 / 0..1 | CL02-R05 |
| R09 | Medicamento — RegimeMedicamento | 1 / 0..* | CL03-R01 |
| R10 | RegimeMedicamento — HorarioRegime | 1 / 0..* | CL03-R02 |
| R11 | HorarioRegime — OcorrenciaProgramada | 0..1 / 0..* | CL03-R03 |
| R12 | OcorrenciaProgramada — AdministracaoMedicamento | 0..1 / 0..1 | CL03-R04 |
| R13 | RegistroCuidado — CorrecaoRegistro | 1 / 0..* | CL03-R05 |

## Cinco conexões acrescentadas na auditoria 4 (2026-10-27)

Foram corrigidas as **cinco omissões AG3-006** no próprio frame CL-G, **sem modificar CL-01 e CL-02 originais**. As linhas são contínuas, sem seta/losango, e os rótulos de multiplicidade foram colocados junto a ambas as extremidades.

| ID geral | Contrato original | Associação / papéis | Multiplicidade junto a cada extremo | Evidência |
|---|---|---|---|---|
| R14 | CL01-R04 | `Usuario — MembroRede` | Usuario **1**; MembroRede **0..*** | CL-01; `membro_rede.usuario_id` |
| R15 | CL02-R03a | `SolicitacaoTrocaPlantao — MembroRede` (**solicitante**) | Solicitação **0..***; MembroRede **1** | CL-02; `solicitante_membro_id` |
| R16 | CL02-R03b | `SolicitacaoTrocaPlantao — MembroRede` (**destinatário**) | Solicitação **0..***; MembroRede **1** | CL-02; `destinatario_membro_id` |
| R17 | CL02-R03c | `SolicitacaoTrocaPlantao — MembroRede` (**respondente**) | Solicitação **0..***; MembroRede **0..1** | CL-02; FK anulável `respondido_por_membro_id` |
| R18 | CL02-R06 | `MembroRede — ConclusaoTarefa` (**executor**) | MembroRede **1**; ConclusaoTarefa **0..*** | CL-02; `executor_membro_id` |

**Observação sobre a dupla de classes da troca:** existem **três associações distintas** entre os mesmos dois nós; não se deve somar as três como uma única relação sem papel. O *solicitante*, o *destinatário* e o *respondente* podem referir-se a membros diferentes. O terceiro papel é opcional enquanto o pedido está pendente. As cores e a pequena legenda de papéis são auxiliares de leitura, não notações de herança UML.

**Contagem atual:** **16 classes, 18 associações e 36 valores de multiplicidade** (13 relações preexistentes + 5 incluídas, 2 extremidades por relação). O modelo segue seletivo: `ContatoImportante`, `Compromisso`, `Consulta`, `Anexo` e outras classes do catálogo original não foram incorporadas; seus vínculos não são reivindicados como representados. Relação adicional `Tarefa–OcorrenciaProgramada` depende de decisão de derivação conceitual (DB-029), não consta literalmente do CL-03.

**Não conectar por semelhança ou por coincidência de FK**: o diagrama de classes não é o DER. As associações são seletivas. `Tarefa` também pode gerar `OcorrenciaProgramada`, mas o relacionamento opcional XOR precisa de contrato/rotulagem antes de adicionar mais um traço. Não representar Auditoria como posse estrutural de todas as classes; sua responsabilidade é transversal.

Fonte: [CL-01](../especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md), [CL-02](../especificacao-para-figma/dominio-B-organizacao/CL-02.md), [CL-03](../especificacao-para-figma/dominio-C-registros/CL-03.md), [regras de domínio](../../02_BUSINESS_RULES/BUSINESS_RULES.md), [aulas 16–26](../diretrizes-professor.md).

**Histórico e validação:** as primeiras 13 associações foram ajustadas para os extremos em 27/10 e cinco vínculos faltantes foram introduzidos nesta rodada. [Auditoria terceira rodada](AUDITORIA-RODADA-3-2026-10-27.md) registra o achado inicial, que passa a constar como **resolvido pela auditoria quarta rodada**. A completude relativa aos 16 nós exibidos não implica completude de todos os conceitos do produto nem homologação acadêmica.
