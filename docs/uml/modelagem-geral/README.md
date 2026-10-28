# Modelagem Geral — Entrega Final aos Professores

**Projeto:** Rede de Apoio a Cuidadores de Idosos  
**Status geral:** **DOCUMENTAÇÃO HOMOLOGADA PELO SOLICITANTE COM RESSALVAS**, conforme [termo de aceite documental de 27/10/2026](HOMOLOGACAO-DOCUMENTAL-2026-10-27.md). Seis perspectivas catalogadas: cinco pranchas novas no Figma (AT-G, UC-G, SQ-G, CL-G, DB-G) e uma prancha-indexadora do EER-G original. **Não equivale a homologação acadêmica ou funcional.**  
**Figma oficial — [página Modelagem Geral](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6430-3326)**.
**GitHub:** documentação sob `docs/uml/modelagem-geral/` aceita para incorporação na `main` pelo [PR #134](https://github.com/webkauadev/rede-de-apoio/pull/134). SQL, MWB e 19 artefatos originais permanecem preservados.

## Índice de acesso

| Ordem sugerida | ID | Finalidade | Figma / fonte | Especificação |
|---|---|---|---|---|
| 1 | AT-G | Fluxo de ponta a ponta do cuidado, com partições e decisões | [AT-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6431-3326) | [AT-G.md](AT-G.md) |
| 2 | UC-G | Quem participa de quais objetivos selecionados | [UC-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6432-3326) | [UC-G.md](UC-G.md) |
| 3 | CL-G | 16 classes e **18 associações** entre classes selecionadas | [CL-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6434-3326) | [CL-G.md](CL-G.md) |
| 4 | SQ-G | Sequência integrada com 7 lifelines e **9 barras de ativação** | [SQ-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6433-3326) | [SQ-G.md](SQ-G.md) |
| 5 | DB-G | Recorte de 17 tabelas reais, PKs e FKs prioritárias | [DB-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6435-3326) | [DB-G.md](DB-G.md) |
| 6 | EER-G | Modelo Workbench integral **já existente**: 34 tabelas, 79 FKs, 6 vistas | [Prancha de referência](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6438-3326) · [SVG nativo geral](../../../entrega/sql-eer/diagrama_geral.svg) · [MWB](../../../entrega/sql-eer/rede_de_apoio_v1.mwb) | [EER-G.md](EER-G.md) |

**Regra de contagem:** cinco desenhos gerais novos; o EER-G é a vista geral **preexistente**, não uma nova modelagem; a prancha de referência não contém o EER completo embutido. Os 19 diagramas existentes da M2 foram preservados como detalhamento.

## Hierarquia de autoridade

1. Notação e escopo acadêmico: [diretrizes do professor](../diretrizes-professor.md), [contextualização](../contextualizacao-projeto.md) e contratos dos [domínios A/B/C](../especificacao-para-figma/README.md).
2. Semântica: [requisitos](../../01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml), [US](../../01_REQUIREMENTS/USER_STORIES_INDEX.yaml), [regras](../../02_BUSINESS_RULES/BUSINESS_RULES.md), [permissões](../../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md), [decisões V1](../../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md).
3. Persistência: [SQL consolidado](../../../entrega/sql-eer/01_schema_completo_v1.sql), [Workbench](../../../entrega/sql-eer/rede_de_apoio_v1.mwb), [relatório Workbench nativo](../../../entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md).
4. Histórico e ressalvas: [índice M2](../implementacao-figma/INDICE-APRESENTACAO-MILESTONE-2.md), [auditoria](../auditoria-final/MATRIZ-VALIDACAO-19-ARTEFATOS.md), [status de correções](../auditoria-final/STATUS-CORRECOES-M2.md).

## Invariantes que devem permanecer verdadeiros

- Bootstrap de perfil não concede Principal antecipadamente nem acesso aos cuidados; rede operacional constituída atomicamente com exatamente um Principal e ao menos um Profissional.
- Plantonista Atual é condição temporal, não ator/conta; plantões simultâneos são possíveis.
- Autorização depende de categoria, vínculo vigente, papel, contexto, ação e, quando aplicável, responsabilidade/plantão.
- Pessoa Idosa somente consulta o próprio contexto; CSV somente Familiar Principal.
- Ocorrência programada, administração confirmada e alertas são fatos diferentes; N02 não tem fallback automático; N04 não é prova de omissão.
- Originais clínicos imutáveis; correções versionadas, anexo no original e auditoria, inclusive das negações.
- O modelo físico único permanece com **34 tabelas/79 FKs**; DB-G é amostra didática.

## Auditoria subsequente

Em 2026-10-27 foram executadas revisões técnicas sucessivas, com [relatório da segunda passagem](AUDITORIA-2026-10-27.md), [auditoria de terceira rodada](AUDITORIA-RODADA-3-2026-10-27.md), [auditoria de quarta rodada](AUDITORIA-RODADA-4-2026-10-27.md), [matriz de rastreabilidade literal UC/CL/SQ/DB](MATRIZ-RASTREABILIDADE-2026-10-27.md) e [manifesto estrutural dos seis frames](MANIFESTO-FIGMA.json), lido diretamente da página após a revisão. As mudanças no Figma foram aplicadas a UC-G, CL-G, SQ-G, DB-G e AT-G sem alterar os 19 diagramas anteriores. O **solicitante autorizou o merge e homologou o acervo documental com ressalvas** no [termo](HOMOLOGACAO-DOCUMENTAL-2026-10-27.md). A auditoria é interna ao processo de modelagem e **não constitui parecer acadêmico independente**. O job `application` da CI segue com vulnerabilidades runtime abertas em [#135](https://github.com/webkauadev/rede-de-apoio/issues/135); aprovação da documentação não valida o aplicativo.

## Checklist para apresentação e validação acadêmica

- [x] [Aceite documental do solicitante](HOMOLOGACAO-DOCUMENTAL-2026-10-27.md) e autorização expressa para merge do PR #134; pendências técnicas explicitadas.

- [x] Cinco pranchas Figma novas em página isolada, sem substituir os 19 diagramas anteriores.
- [x] Prancha EER-G com referência ao `.mwb` e ao SVG geral canônicos.
- [x] Especificação rastreável por artefato e fonte em arquivos dedicados.
- [x] Correção de referência temporal de Familiar Iniciador / Principal e de FKs compostas no DB-G.
- [x] Substituir ator genérico de UC-G por Familiar de Apoio/Emergência, com autorização explícita e solicitação de troca baseada em UC-02.
- [ ] **Revisar correspondência integral** de UC-G com papéis/US, inclusive o fato de casos serem compartilhados fora das linhas de apresentação.
- [x] Reposicionar e conferir visualmente os **26 valores de multiplicidade** nas 13 associações do CL-G.
- [x] Incluir no CL-G as cinco relações canônicas antes ausentes (CL01-R04; CL02-R03a/b/c; CL02-R06), preservando três papéis distintos de troca; **18 associações, 36 rótulos de multiplicidade** (A4-001).
- [ ] Revisão acadêmica externa da semântica de todas as multiplicidades e das classes omitidas do recorte.
- [x] Ajustar SQ-G: M09R, M12/M14 com assinatura CL-03, N03 como nota, M15 exclusivamente de negação e guardas do cenário coberto.
- [x] Inserir **9 barras de ativação** no SQ-G, alinhadas às mensagens existentes (A4-002).
- [ ] Revisão independente de SQ-G, especialmente serviços inferidos e casos idempotentes/409 não desenhados.
- [x] Corrigir a ordem da autorização no AT-G para impedir leitura/escrita antes da validação; revalidar escrita no commit e na correção (AG3-001/002).
- [ ] Projetar em tela/monitor e validar leitura das pranchas grandes por zoom.
- [ ] Se houver exigência de EER geral incorporado **dentro do Figma**, importar **o SVG canônico** (não o redesenhar) e registrar Node ID.
- [ ] Obter validação final da equipe/professor; não declarar homologação por inferência.

**Estado de entrega:** documentação **homologada pelo solicitante para versionamento e uso como base de apresentação, com ressalvas**; pranchas conferidas visualmente em capturas de inspeção. Validação acadêmica dos professores, revisão técnica independente e testes da aplicação permanecem pendentes. O registro não equivale a validação da CI ou MySQL em runtime.
