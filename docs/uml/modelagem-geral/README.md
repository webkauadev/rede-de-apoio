# Modelagem Geral — Entrega Final aos Professores

**Projeto:** Rede de Apoio a Cuidadores de Idosos  
**Status geral:** **seis perspectivas catalogadas**, das quais cinco pranchas novas no Figma (AT-G, UC-G, SQ-G, CL-G, DB-G) e uma prancha-indexadora do **EER-G original**. **Não homologadas academicamente**.  
**Figma oficial — [página Modelagem Geral](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6430-3326)**.
**GitHub:** documentação sob `docs/uml/modelagem-geral/` em branch própria / PR Draft. Não houve mudança na `main`, SQL, MWB ou 19 artefatos existentes.

## Índice de acesso

| Ordem sugerida | ID | Finalidade | Figma / fonte | Especificação |
|---|---|---|---|---|
| 1 | AT-G | Fluxo de ponta a ponta do cuidado, com partições e decisões | [AT-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6431-3326) | [AT-G.md](AT-G.md) |
| 2 | UC-G | Quem participa de quais objetivos selecionados | [UC-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6432-3326) | [UC-G.md](UC-G.md) |
| 3 | CL-G | Vocabulário, operações e associações essenciais de domínio | [CL-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6434-3326) | [CL-G.md](CL-G.md) |
| 4 | SQ-G | Como os serviços colaboram no registro de administração | [SQ-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6433-3326) | [SQ-G.md](SQ-G.md) |
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

## Checklist para homologação e uso na apresentação

- [x] Cinco pranchas Figma novas em página isolada, sem substituir os 19 diagramas anteriores.
- [x] Prancha EER-G com referência ao `.mwb` e ao SVG geral canônicos.
- [x] Especificação rastreável por artefato e fonte em arquivos dedicados.
- [x] Correção de referência temporal de Familiar Iniciador / Principal e de FKs compostas no DB-G.
- [ ] **Revisar correspondência integral** de UC-G com papéis/US, inclusive o fato de casos serem compartilhados fora das linhas de apresentação.
- [ ] **Revisar multiplicidades nos extremos** do CL-G e coerência entre os 3 contratos CL e contexto V1.
- [ ] **Revisar SQ-G**: operação de auditoria, retornos, parâmetros e guardas/ramo negado contra DB-038 e CL-03.
- [ ] Projetar em tela/monitor e validar leitura das pranchas grandes por zoom.
- [ ] Se houver exigência de EER geral incorporado **dentro do Figma**, importar **o SVG canônico** (não o redesenhar) e registrar Node ID.
- [ ] Obter validação final da equipe/professor; não declarar homologação por inferência.

**Estado de entrega:** pranchas produzidas e conferidas visualmente em capturas de inspeção; revisão acadêmica e técnica independente permanece pendente. O registro não equivale a validação formal de implementação, CI ou MySQL em runtime.
