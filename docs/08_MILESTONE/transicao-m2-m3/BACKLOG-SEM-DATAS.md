# Backlog executivo — M3 sem dependências de datas

**Estado:** propostas técnicas documentais; ninguém foi atribuído unilateralmente no GitLab. A divisão nominal é uma sugestão alinhada aos owners do registry (David 10 US, Rhuan 9, Henrique 9, Kauã 8). Não autoriza reatribuição de trabalho.

## Visão de priorização

| ID | Atividade | Owner sugerido | Prioridade | Esforço relativo | Depende de |
|---|---|---|---|---|---|
| M3-01 | Fechar inventário e mapa de fontes | Kauã (consolidação), todos (revisão) | P1 | M | Nenhuma técnica |
| M3-02 | Revalidar sete achados P1 dos diagramas M2 | David (A), Rhuan (B), Henrique (C); Kauã integra | P1 | L | M3-01 + contratos UML, CA e AUD-M2 |
| M3-03 | Revalidar P2 e integridade de apresentação da M2 | Cada domínio com coordenação Kauã | P1 | M | M3-02 |
| M3-04 | Auditar modelagem geral e coerência entre domínios | Kauã + revisores A/B/C | P1 | M | M3-02; matriz original |
| M3-05 | Fechar prova acadêmica do banco sem modificar schema | Kauã (coordenação); Henrique (crítica técnica) | P1 | M | M3-02/04 e fonte SQL |
| M3-06 | Completar cadeia de rastreabilidade das 36 US | Kauã + revisores por domínio | P1 | L | M3-02–05 |
| M3-07 | Organizar evidência de Kanban e autoria individual | Cada integrante, sob revisão coletiva | P1 | M por integrante | Conexão com GitLab institucional / URL de projeto |
| M3-08 | Montar índice final, pacote de exposição e checklist | Kauã integra; David/Rhuan/Henrique validam seus domínios | P1 | L | M3-01–07 (pode montar esqueleto antes) |

## Especificação das atividades

### M3-01 — Fechar inventário e mapa de fontes

**Responsável sugerido:** Kauã (consolidação), todos (revisão). **Revisor:** Henrique. **Prioridade:** P1. **Esforço:** M.

**Por que fazer:** Evitar reconstrução e uso de versões históricas.

**Escopo exato:** Identificar PM Canvas original, versão final do Site Map, 19 diagramas, gerais, critérios, dicionário, Workbench e fontes M1.

**Fontes/artefatos:** INVENTARIO-M1-M2.md; GitHub main; Figma 19+6+17.

**Dependências:** Nenhuma técnica.

**Resultado esperado/critério objetivo:** Cada item tem URL/Node ID, estado permitido, escopo, versão e ausência explicitada; sem inventar arquivo de M1.

**Evidências requeridas:** Matriz revisada por alguém diferente do autor.

### M3-02 — Revalidar sete achados P1 dos diagramas M2

**Responsável sugerido:** David (A), Rhuan (B), Henrique (C); Kauã integra. **Revisor:** Revisão cruzada entre domínios. **Prioridade:** P1. **Esforço:** L.

**Por que fazer:** Não transformar correção visual em aprovação técnica.

**Escopo exato:** Inspecionar AUD-M2-001–007: cardinalidades, XOR, setas síncronas, autenticação, concorrência e atributo obrigatório.

**Fontes/artefatos:** Frames UC/CL/SQ; RECONCILIACAO-AUD-M2.md; DDL.

**Dependências:** M3-01 + contratos UML, CA e AUD-M2.

**Resultado esperado/critério objetivo:** Cada achado contém prova de extremidades/mensagem/SQL, conclusão e assinatura de revisor técnico; sem P1 material silencioso.

**Evidências requeridas:** Capturas Figma atuais, seções de contrato, diff/critério e parecer por achado.

### M3-03 — Revalidar P2 e integridade de apresentação da M2

**Responsável sugerido:** Cada domínio com coordenação Kauã. **Revisor:** Revisor diferente do owner. **Prioridade:** P1. **Esforço:** M.

**Por que fazer:** Resolver geometria residual, tipagem e prova navegável sem refazer partes conformes.

**Escopo exato:** Checar UNSIGNED, assinaturas, rodapé e ordenação; classificar AUD-013 como prova faltante ou fluxo a corrigir.

**Fontes/artefatos:** AUD-M2-008–013; slides 13–31; Fluxo Final.

**Dependências:** M3-02.

**Resultado esperado/critério objetivo:** Todas as pendências P2 têm resultado específico, não somente «corrigido»; roteiro reprodutível para 2 fluxos críticos.

**Evidências requeridas:** Capturas/textos, rastreio de link/ação e relatório de limitações.

### M3-04 — Auditar modelagem geral e coerência entre domínios

**Responsável sugerido:** Kauã + revisores A/B/C. **Revisor:** David (UC) / Rhuan (troca) / Henrique (saúde). **Prioridade:** P1. **Esforço:** M.

**Por que fazer:** Garantir que o diagrama panorâmico não contradiga os recortes canônicos.

**Escopo exato:** Conferir 18 relações CL-G e 36 multiplicidades, permissões UC-G, 9 ativações SQ-G e FKs DB-G; reforçar natureza seletiva.

**Fontes/artefatos:** Modelagem Geral AT-G/UC-G/CL-G/SQ-G/DB-G/EER-G.

**Dependências:** M3-02; matriz original.

**Resultado esperado/critério objetivo:** Cada ligação/papel/mensagem de risco tem contrato e definição de escopo; não reivindicar completude UML ou EER incorporado.

**Evidências requeridas:** Matriz de 18 relações e correspondência UC/CL/SQ/SQL com referências.

### M3-05 — Fechar prova acadêmica do banco sem modificar schema

**Responsável sugerido:** Kauã (coordenação); Henrique (crítica técnica). **Revisor:** Rhuan. **Prioridade:** P1. **Esforço:** M.

**Por que fazer:** Rubrica requer modelo defensável e limites de MySQL reais.

**Escopo exato:** Explicar 34 tabelas/79 FKs/50 CHECKs/44 UNIQUE, ler chaves compostas e exemplos de DDL versus aplicação.

**Fontes/artefatos:** BANCO-GARANTIAS.md; docs/09_BANCO_DE_DADOS; SQL; MWB; 6 SVG.

**Dependências:** M3-02/04 e fonte SQL.

**Resultado esperado/critério objetivo:** Dicionário, modelos e SQL coerentes no recorte; 0 regra de negócio dinâmica apresentada como CHECK automático.

**Evidências requeridas:** Saída MySQL real versionada, screenshot/reabertura Workbench, prova de cardinalidade, tabela de garantias.

### M3-06 — Completar cadeia de rastreabilidade das 36 US

**Responsável sugerido:** Kauã + revisores por domínio. **Revisor:** David. **Prioridade:** P1. **Esforço:** L.

**Por que fazer:** Trocar «candidato» por referência real, sem inventar um diagrama por US.

**Escopo exato:** 36 linhas RF/RNF→US→CA→UC→CL→SQ/AT/estado→dados→tela→prova; classificar todas as lacunas.

**Fontes/artefatos:** MATRIZ-36-US.md; critérios/issues; UML, Figma e banco.

**Dependências:** M3-02–05.

**Resultado esperado/critério objetivo:** 36/36 canônicas, 3 RNF e RF13 tratados, toda cadeia parcial marcada; nenhuma coluna falsa «PASS».

**Evidências requeridas:** Links verificáveis a contrato, frame, SQL e evidência ou indicador de ausência.

### M3-07 — Organizar evidência de Kanban e autoria individual

**Responsável sugerido:** Cada integrante, sob revisão coletiva. **Revisor:** Outro integrante por contribuição. **Prioridade:** P1. **Esforço:** M por integrante.

**Por que fazer:** Requisito institucional de processo, sem métricas retrofabricadas.

**Escopo exato:** Mapear Issues/MRs/board reais e observar timestamps do período; diferenciar GitHub operacional de GitLab exigido.

**Fontes/artefatos:** GitLab fslab.dev; docs/08_MILESTONE/METRICS_SNAPSHOT.md (histórico GitHub).

**Dependências:** Conexão com GitLab institucional / URL de projeto.

**Resultado esperado/critério objetivo:** Lead/Cycle/Throughput/WIP com fórmula, fonte temporal, escopo e evidência por integrante; Throughput = issue efetivamente fechada.

**Evidências requeridas:** Links originais de MRs/Issues e exportações do board; não imputar autoria de terceiros.

### M3-08 — Montar índice final, pacote de exposição e checklist

**Responsável sugerido:** Kauã integra; David/Rhuan/Henrique validam seus domínios. **Revisor:** Equipe. **Prioridade:** P1. **Esforço:** L.

**Por que fazer:** Dar ao avaliador percurso documental único sem cópias divergentes.

**Escopo exato:** Sumário produto→requisitos→protótipo→UML→banco→processo→evidência; preparar sequência falada e perguntas por domínio.

**Fontes/artefatos:** README de transição, relatórios, fontes M1/M2, Figma, MWB, matriz e métricas.

**Dependências:** M3-01–07 (pode montar esqueleto antes).

**Resultado esperado/critério objetivo:** Todos os links abrem, não há versão histórica apresentada como atual, limitações aparecem visivelmente e a equipe revisou a autoria.

**Evidências requeridas:** Índice navegável, sumário testado, roteiro e checklist documental.

## Gates sem datas

| Gate | Condição para aceitar | Estado nesta preparação |
|---|---|---|
| G1 — Inventário | 19+6+17 + acervo M1 com fontes e lacunas; revisão cruzada | **EM AUDITORIA**: inventário inicial estruturado e versionado |
| G2 — Pendências classificadas | AUD-001–013 e outras lacunas com impacto, ação, owner e evidência | **EM AUDITORIA**: classificação inicial publicada |
| G3 — Modelagem revisada | P1 e P2 relevantes revalidados; banco reconciliado | **EM AUDITORIA**: ainda sem revalidação independente completa |
| G4 — Documentação integrada | 36 US com evidência por elo e índice único sem contradições | **EM AUDITORIA**: primeira matriz consolidada, ainda com candidatos |
| G5 — Pacote pronto | Narrativa, diagramas, evidência de processo e inspeção visual | **NÃO VERIFICADO** |
| G6 — Ajustes externos | Objeções/observações aplicadas e revalidadas | **NÃO VERIFICADO** |
| G7 — Entrega final | Submissão e evidências; homologação acadêmica somente se emitida | **NÃO VERIFICADO** |

## O que NÃO bloquear por calendário ou aprovação docente

1. Reconciliar os **13 AUD-M2** por prova de contrato, SQL e Figma.
2. Consolidar as **36 US** em um mapa com indicadores explícitos de ausência.
3. Reconciliar as **34 tabelas/79 FKs** com garantias reais do MySQL e regras de aplicação.
4. Ordenar a documentação e estruturar um índice navegável.
5. Levantar métricas **somente quando existir evidência real de board**; registrar falta de acesso sem adivinhar.

**Fora do objetivo da M3 FS I:** API, WebApp, deploy, correção automática de segurança da aplicação (#135), testes end-to-end do produto experimental ou movimentação artificial de issues históricas.
