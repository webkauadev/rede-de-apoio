# Implementação no Figma — Domínio A

Status: **revisão geométrica 05A.2 construída e inspecionada; integração dos novos frames à sequência principal de slides ainda pendente**.

Data: 2026-10-15
Referência das especificações: commit `d5be5a0` na branch `docs/estudo-uml-milestone2`.

## Frames implementados

| ID | Artefato | Frame no Figma | Node ID | Especificação / fonte | Validação |
|---|---|---|---|---|---|
| UC-01 | Casos de Uso — Pessoas, Identidade e Rede | [abrir frame](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6250-3484) | `6250:3484` | `../especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md` | 13 associações ator–caso, fronteira única, sem `include`, `extend` ou generalização. |
| CL-01 | Classes — Pessoas, Identidade e Rede | [abrir frame](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484) | `6255:3484` | `../especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md` | 7 associações, atributos/operações selecionados e multiplicidade corrigida `PessoaIdosa [1] — [0..1] RedeCuidado`. |
| SQ-01 | Sequência — Autenticação e Autorização Contextual | [abrir frame](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484) | `6257:3484` | `../especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md` | 5 linhas de vida, 7 mensagens, retornos tracejados e fragmentos `alt` para credenciais e contexto. |
| DB-A | Banco de Dados — Pessoas, Identidade e Rede | [abrir frame](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6259-3484) | `6259:3484` | EER/SQL V1, fontes abaixo | Recorte físico editável com tabelas, PKs, FKs, relações e dependências interdomínios sinalizadas. |
| EER-A | Vista MySQL Workbench — Identidade e Rede | [abrir frame](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6238-3578) | `6238:3578` | Vista nativa exportada, fontes abaixo | Referência editável de apresentação; o `.mwb` e sua exportação temática continuam canônicos. |

## Fontes físicas e fidelidade

O esquema **não foi alterado**. A conferência utilizou:

- `entrega/sql-eer/rede_de_apoio_v1.mwb` — modelo MySQL Workbench canônico;
- `entrega/sql-eer/01_schema_completo_v1.sql` — SQL consolidado V1;
- `entrega/sql-eer/diagrama_identidade_rede.svg` e `entrega/sql-eer/diagrama_identidade_rede.png` — exportações temáticas existentes.

DB-A mostra `usuario`, `pessoa_idosa`, `rede_cuidado`, `membro_rede`, `atribuicao_papel_familiar`, `contato_importante` e `informacao_emergencia`. As estruturas de acesso relacionadas, mas externas ao recorte, são identificadas no frame como dependências. EER-A é uma vista de apresentação rastreável às exportações existentes; não substitui nem modifica o arquivo Workbench nativo.

## Montagem e conferência

Os cinco frames usam a página oficial da apresentação, formato `1920 × 1080`, tipografia Geist, base clara e a paleta azul observada no slide S05 (`6013:1166`). Cada frame contém título, subtítulo, área diagramática editável, legenda compacta e rodapé com referências.

Foi renderizada uma captura real de cada frame e revisados: presença dos elementos e conexões especificados, títulos e nomenclatura, orientação das mensagens e retornos de SQ-01, multiplicidade de CL01-R02, e identificação de PK/FK no recorte físico. Não foram gerados arquivos achatados para substituir os elementos editáveis de UC-01, CL-01, SQ-01 ou DB-A; EER-A incorpora deliberadamente a exportação nativa do Workbench.

## Correção visual e semântica — 05A.1

Os IDs dos cinco frames foram preservados. A correção foi limitada à apresentação e às conexões, sem mudança de requisitos, contratos de modelagem ou esquema físico.

| Frame | Correções realizadas | Resultado da validação visual |
|---|---|---|
| UC-01 | Atores redesenhados com cabeça, corpo, braços e pernas; rótulos separados; fronteira única; as 13 associações foram roteadas para os contornos dos respectivos casos de uso. | 11 casos de uso, 5 atores e 13 associações. Não há `include`, `extend` ou generalização. |
| CL-01 | Sete classes redistribuídas em torno de `RedeCuidado`; relações roteadas fora dos compartimentos; atributos/operações ampliados; rótulos e multiplicidades recolocados nas extremidades. | Sete associações presentes. CL01-R02 aparece como `PessoaIdosa [1] — [0..1] RedeCuidado`. |
| SQ-01 | Cinco linhas de vida tracejadas reforçadas; barras de ativação desenhadas; fragmentos `alt` divididos em operandos e guardas; chamadas e retornos reposicionados. | Cinco participantes, sete mensagens e os dois caminhos de `alt` preservados; M-05/M-06 ocorrem apenas no operando não autorizado. |
| DB-A | Tabelas físicas reorganizadas; PK/FK destacadas; vínculos roteados fora de atributos; legenda ajustada para `PK`, `FK`, vínculo FK→PK e cardinalidades. | Mantém elementos editáveis e o recorte V1 sem criar ou modificar tabela, chave ou relação. |
| EER-A | A reconstrução manual foi removida. O frame agora contém a exportação nativa incorporada, identificada como tal. | Imagem inserida: `entrega/sql-eer/diagrama_identidade_rede.png`, exportação temática do modelo `entrega/sql-eer/rede_de_apoio_v1.mwb`. |

As cinco lâminas foram renderizadas após os ajustes. A imagem de EER-A é intencionalmente rasterizada por ser a exportação real do Workbench; DB-A é a representação física complementar que preserva tabelas e conexões individualmente editáveis no Figma.

## Escopo e pendências

Esta implementação abrange somente o Domínio A. Não houve alteração de requisitos, código, SQL, `.mwb`, Figma de telas do produto ou artefatos dos domínios B, C e D. A aprovação acadêmica final dos diagramas continua pendente de validação da equipe/professor.

## Revisão geométrica por ChatGPT — 05A.2 (2026-10-15)

Status: **novos frames editáveis criados e inspecionados em capturas reais; não substituíram ainda os frames antigos na faixa principal da apresentação**.

Os modelos e roteiros permanecem os definidos nos contratos UML. Não houve modificação do esquema SQL, modelo Workbench, requisitos ou protótipo de aplicativo.

| Tipo | Frame revisado | Node ID | Evidência e limites |
|---|---|---|---|
| UC-01 | [Abrir revisão](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6250-3484) | `6250:3484` | 5 atores, 11 casos de uso, 13 associações editáveis. A ancoragem das associações foi calculada geometricamente no contorno das elipses e houve ajuste de rotas para diminuir cruzamentos. |
| CL-01 | [Abrir revisão](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6255-3484) | `6255:3484` | 7 classes e 7 associações. Conexões e multiplicidades foram reposicionadas, preservando CL01-R02 `PessoaIdosa [1] — [0..1] RedeCuidado`. |
| SQ-01 | [Abrir revisão](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6257-3484) | `6257:3484` | 5 linhas de vida, 2 fragmentos `alt`, 7 mensagens lógicas. As alternativas reproduzem visualmente ocorrências distintas de M-03 e M-07; as mensagens continuam as previstas pelo contrato, sem novas operações. |
| DB-A | [Abrir revisão](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6259-3484) | `6259:3484` | Recorte físico editável de 7 tabelas e 7 vínculos principais. PK/FK selecionadas verificadas contra `01_schema_completo_v1.sql`. Outras chaves, FKs de autoria e restrições permanecem exclusivamente na fonte SQL canônica e estão declaradas como omitidas na lâmina por legibilidade. |
| EER-A | [Abrir exportação preservada](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6238-3578) | `6238:3578` | Imagem real do Workbench preservada; não foi reconstruída nem editada nesta revisão. |

**Versões anteriores preservadas (não apagadas):** UC-01 `6231:3484`; CL-01 `6234:3484`; SQ-01 `6235:3484`; DB-A `6238:3484`. Os frames revisados foram criados à direita, no mesmo arquivo e página da apresentação, para permitir comparação e reversão.

**Pendência operacional:** a tentativa de mover em lote os slides antigos para uma área de arquivo e inserir as revisões nas posições originais foi bloqueada pelas configurações de segurança da integração Figma. Nenhuma substituição deve ser presumida. Antes de apresentar, mover/ordenar visualmente as quatro revisões na sequência oficial (13–16), preservando o EER-A (17), e confirmar os links finais. Este bloqueio não altera as conexões ou os elementos dos frames revisados.

**Pendência acadêmica:** validação final pela equipe/professor continua em aberto; os resultados acima são de verificação de implementação e legibilidade, não aprovação acadêmica automática.
