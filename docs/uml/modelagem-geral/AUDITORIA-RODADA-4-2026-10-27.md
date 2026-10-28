# AUDITORIA — Rodada 4: CL-G / SQ-G e controle de cobertura

**Data:** 2026-10-27  
**Escopo:** [CL-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6434-3326) e [SQ-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6433-3326); auditoria das limitações UC-G/DB-G/EER-G.  
**PR:** [#134 (Draft)](https://github.com/webkauadev/rede-de-apoio/pull/134).  
**Natureza:** revisão técnica interna com correção e inspeção visual dos frames. **Não é homologação acadêmica.**

## Fontes contratuais desta rodada

- [CL-01 — relações R01–R07](../especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md), especialmente `CL01-R04`.
- [CL-02 — relações e papéis](../especificacao-para-figma/dominio-B-organizacao/CL-02.md), especialmente `CL02-R03a/b/c` e `CL02-R06`.
- [CL-03](../especificacao-para-figma/dominio-C-registros/CL-03.md) e [SQ-03](../especificacao-para-figma/dominio-C-registros/SQ-03.md).
- [Diretrizes do professor](../diretrizes-professor.md): slide 16 (caixas UML), 18/24 (multiplicidades), slides 28/37 (linhas de vida, barras de ativação, mensagens e retornos), slide 34 (coerência de operações), slides 53–58 (rastreabilidade).
- [Auditoria rodada 3](AUDITORIA-RODADA-3-2026-10-27.md), [matriz já atualizada](MATRIZ-RASTREABILIDADE-2026-10-27.md), [decisões V1](../../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md) e [permissões](../../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md).

## A4-001 — Resolvida omissão de cinco conexões canônicas no CL-G

No mesmo frame CL-G (`6434:3326`), foram adicionados cinco traços de associação **contínua, sem ponta nem losango**, com dois valores de multiplicidade cada, conectando as classes correspondentes:

| Relação | Classe 1 — Classe 2 | Multiplicidade junto à classe 1 | Multiplicidade junto à classe 2 | Estado |
|---|---|---|---|---|
| `CL01-R04` | Usuario — MembroRede | 1 | 0..* | Inserida e conferida |
| `CL02-R03a` | SolicitacaoTrocaPlantao — MembroRede (*solicitante*) | 0..* | 1 | Inserida e conferida |
| `CL02-R03b` | SolicitacaoTrocaPlantao — MembroRede (*destinatário*) | 0..* | 1 | Inserida e conferida |
| `CL02-R03c` | SolicitacaoTrocaPlantao — MembroRede (*respondente*) | 0..* | 0..1 | Inserida e conferida |
| `CL02-R06` | MembroRede — ConclusaoTarefa (*executor*) | 1 | 0..* | Inserida e conferida |

Os papéis `solicitante`, `destinatário` e `respondente` foram mantidos **separadamente**, com legenda visual e rótulos junto às extremidades; o respondente é opcional em solicitação ainda não respondida.

**Conferência estrutural feita após as alterações:** 13 traços anteriores + **5 novos** = **18 associações**. **26 valores anteriores + 10 novos** = **36 multiplicidades**. Cada conexão acrescentada tem exatamente um traço e exatamente dois valores junto às pontas, sem duplicatas. Evidência visual conferida em screenshot do frame `6434:3326`. `AG3-006` passa a **RESOLVIDO NO RECORTE**.

**Limite importante:** permanecem **16 classes selecionadas**, não todas as classes do sistema; não se pode afirmar que todas as relações das classes excluídas estejam cobertas. Uma eventual nova relação `Tarefa — OcorrenciaProgramada` exigirá status `[DERIVAÇÃO DO SQL/DECISÃO DB-029]`, pois CL-03 só formaliza relação a `HorarioRegime` e as ocorrências têm origem XOR. Por prudência ela **não** foi acrescentada sob falsa atribuição.

## A4-002 — Barras de ativação UML no SQ-G

A auditoria das [diretrizes do professor](../diretrizes-professor.md) mostrou que a notação de sequência inclui **barra de ativação durante execução** (slide 28). O SQ-G já tinha sete lifelines e mensagens, mas não mostrava barras.

Foram adicionadas **9 barras**, nos participantes:
- Interface de Cuidados: duas, consulta e registro;
- Serviço de Agenda: uma;
- Autorização Contextual: duas, leitura e escrita;
- Serviço de Administração: uma atravessando o fragmento alternativo, representando duração de execução em **um dos ramos**, não execução simultânea;
- AdministracaoMedicamento: uma, **apenas no ramo de sucesso**;
- Serviço de Auditoria: duas, uma em cada ramo `alt`.

As **15 mensagens-base M01–M15 e o retorno adicional M09R** foram mantidos. Nenhuma operação de domínio foi inventada para criar as barras.

**Verificação:** inspeção estrutural confirmou 9 nós retangulares de ativação únicos com alturas positivas; screenshot de `6433:3326` mostrou barras alinhadas às lifelines e às mensagens. A nota de rodapé explicita controladores `[INFERÊNCIA]` arquitetural, porque sua existência no código não foi verificada. **A4-002 resolvido graficamente**, sem declarar a semântica completa da implementação.

## A4-003 — Prevenção de alegações de completude

As observações no rodapé de CL-G, UC-G e DB-G foram atualizadas para deixar claras as limitações:

- **CL-G:** 18 associações entre 16 classes selecionadas; não equivale a catálogo total de classes.
- **UC-G:** 16 objetivos de atores como amostra; cadastro/autenticação e outras US têm diagramas de domínio próprios.
- **DB-G:** 17 tabelas de 34 e **11 trechos físicos selecionados**, que não equivalem a 11 FKs únicas; as FKs interdomínios só aparecem em texto. EER original é fonte para 79 FKs.

A precisão é essencial para a banca: ausência no recorte ≠ ausência no produto.

## Limitações que permanecem abertas

1. **A4-P01 / UML conceitual:** CL-G não cobre classes externas à seleção nem o vínculo derivado `Tarefa — OcorrenciaProgramada`; não inferir completude sistêmica.
2. **A4-P02 / SQ-G:** participantes de controle são inferências arquiteturais; retorno de leitura negada, falha de auditoria (fail-closed), replay idempotente e conflito 409 não foram desenhados como cenários específicos; não supor runtime.
3. **A4-P03 / EER no Figma:** prancha EER-G é acesso/indexação da fonte Workbench já produzida, não SVG integral embutido. Para apresentar EER integral, abrir [SVG](../../../entrega/sql-eer/diagrama_geral.svg) ou [MWB](../../../entrega/sql-eer/rede_de_apoio_v1.mwb).
4. **A4-P04 / Projeção:** o teste foi por screenshot, não por projetor 16:9 na sala; validar zoom, contraste e legibilidade em apresentação real.
5. **A4-P05 / Governança:** aguardar revisão humana, critérios de aceite da Milestone final e parecer dos professores. Nenhum merge para `main` está autorizado por este relatório.

**Parecer atualizado:** a omissão crítica `AG3-006` foi corrigida e a convenção visual do SQ-G ficou mais próxima das diretrizes do professor. Os artefatos estão mais preparados para apresentação de caráter seletivo, mas permanecem **em revisão**, não homologados. Preservados os 19 modelos originais, SQL e `.mwb`.
