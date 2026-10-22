# CL-G — Núcleo conceitual integrado de classes

[Figma: diagrama editável CL-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6434-3326) · Frame `6434:3326`, 4930×3780 px · 16 classes com atributos e operações essenciais, 13 associações anotadas.

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

**Não conectar por semelhança ou por coincidência de FK**: o diagrama de classes não é o DER. As associações são seletivas. `Tarefa` também pode gerar `OcorrenciaProgramada`, mas o relacionamento opcional XOR precisa de contrato/rotulagem antes de adicionar mais um traço. Não representar Auditoria como posse estrutural de todas as classes; sua responsabilidade é transversal.

Fonte: [CL-01](../especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md), [CL-02](../especificacao-para-figma/dominio-B-organizacao/CL-02.md), [CL-03](../especificacao-para-figma/dominio-C-registros/CL-03.md), [regras de domínio](../../02_BUSINESS_RULES/BUSINESS_RULES.md), [aulas 16–26](../diretrizes-professor.md).

**Ressalvas:** as multiplicidades estão descritas por rótulos complementares nas ligações, mas antes da aprovação devem ser revisadas quanto a posição exata das extremidades, legibilidade e vínculo entre domínios. Modelagem conceitual, não prova de integridade de runtime.
