# CL-G — Núcleo conceitual integrado de classes

[Figma: diagrama editável CL-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6434-3326) · Frame `6434:3326`, 4930×3780 px · 16 classes com atributos e operações essenciais, 13 associações com multiplicidades reposicionadas junto aos extremos.

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

**Revisão aplicada em 2026-10-27:** os 13 rótulos compostos foram substituídos por **26 valores junto às extremidades** das 13 relações, e os agrupamentos B/C foram renomeados para não classificar `ConclusaoTarefa` como medicação. A revisão visual confirmou posições sem sobrepor atributos. **Ressalva remanescente [AG3-006]:** além de outras exclusões do recorte, **5 relações canônicas entre classes que já constam no CL-G continuam sem ligação**: CL01-R04 (`Usuario–MembroRede`), CL02-R03a/b/c (`SolicitacaoTrocaPlantao–MembroRede`, papéis solicitante/destinatário/respondente) e CL02-R06 (`MembroRede–ConclusaoTarefa`). Não confundir essa ausência com inexistência conceitual, nem adicionar linhas sem multiplicidades comprovadas; detalhes em [matriz](MATRIZ-RASTREABILIDADE-2026-10-27.md). `RedeCuidado` não possui todos os vínculos transversais graficamente representados. Avaliar inclusão desses vínculos com base em regras/SQL antes da defesa final. Não equivale a prova de integridade em runtime.
