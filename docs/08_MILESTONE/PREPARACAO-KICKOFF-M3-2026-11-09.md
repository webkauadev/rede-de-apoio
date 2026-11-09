# Preparação para o kickoff da Milestone 3 — Rede de Apoio a Cuidadores de Idosos

**Data da preparação:** 09/11/2026 · **Fase:** Fábrica de Software I (2º semestre ADS)  
**Status:** **PLANEJAMENTO PREPARADO — EXECUÇÃO DA M3 AINDA NÃO INICIADA**  
**Pré-condição:** a M2 foi **encerrada operacionalmente por confirmação da equipe após apresentação**, registrada no [PR #137](https://github.com/webkauadev/rede-de-apoio/pull/137), ainda sujeito ao fluxo de revisão/merge. A ausência de nota/ata formal docente não é transformada em homologação assinada.

> **Separação obrigatória:** este documento foi elaborado após o encerramento operacional da M2, com base nas diretrizes gerais de FS I e nos artefatos canônicos do projeto. **Não reutiliza, não reconhece nem incorpora os trabalhos/rascunhos anteriores de M3 associados ao PR #136** (fechado sem merge). Não cria novos requisitos, não altera Figma/SQL/MWB e não inicia codificação.

## 1. Objetivo acadêmico correto

A Milestone 3 é a **apresentação final da Fábrica de Software I**, cujo núcleo é análise de requisitos, modelagem, banco de dados e documentação, com métricas do processo e evidências de participação.

**Não há exigência de implementar uma API REST, WebApp, deploy de produção ou testes de integração de backend como condição da FS I.** Esses elementos pertencem às fases subsequentes; eventuais experimentos existentes não substituem os artefatos acadêmicos.

Pelas Diretrizes Gerais, a etapa ocupa **semanas 13–18**, com **monitoria na semana 16** e **apresentação na semana 18**, de **10 a 15 minutos** em FS I. As **datas de calendário** e a **diretriz específica da turma/AVA** precisam ser confirmadas; não inventar datas absolutas.

### Rubrica geral FS I — 100 pontos

| Critério | Pontuação | Prioridade |
|---|---:|---|
| Documentação do Projeto | **40** | Máxima — maior parcela |
| Diagramas UML | **20** | Alta — qualidade semântica e rastreabilidade |
| Modelagem do Banco de Dados | **10** | Alta — demonstrar integridade e explicação |
| Processos | **5** | Obrigatória — GitLab e Kanban |
| Apresentação | **15** | Obrigatória — demonstrar e defender evidências |
| Autoavaliação | **5** | Obrigatória |
| Nota do Cliente | **5** | Dependente da avaliação |
| **Total** | **100** | |

**Atenção:** a rubrica geral não substitui instruções específicas do professor. Confirmar inclusive se diagramas de atividades e estados são exigidos e com qual abrangência; documentar justificativas de escopo seletivo quando aceitas.

## 2. Baseline técnico disponível para a M3

| Fonte existente | Baseline comprovado nas entregas anteriores | Conduta na M3 |
|---|---|---|
| Requisitos | RF01–RF30, RNF01–RNF03, US-001–US-036, critérios de aceite registrados | **Congelar IDs e textos aprovados**; novas interpretações exigem decisão |
| Equipe/US | David 10, Rhuan 9, Henrique 9, Kauã 8 | Responsabilidade de histórias não significa exclusividade em toda tarefa documental |
| Protótipo | T01–T17 + componentes/estados; página M2 corrigida | Citar evidências e exemplos, sem reconstruir telas por causa da M3 |
| UML detalhada | 19 artefatos M2: 3 UC, 3 CL, 3 SQ, 5 DB e 5 EER | Manter semântica auditada; revisar rastreabilidade e explicações, não redesenhar indiscriminadamente |
| Perspectivas integradas | AT-G, UC-G, CL-G, SQ-G, DB-G, EER-G, aceitas **documentalmente** com ressalvas | São recortes seletivos complementares, **não** substituem todo o acervo nem representam 6 novos EER |
| Banco | MySQL V1: 34 tabelas, 79 FKs, modelo `.mwb`, seis vistas; evidência MySQL e Workbench nativa anterior | Demonstrar coerência físico-conceitual, UNIQUE/CHECK/FK/nulidade; **não reescrever SQL** sem inconsistência real |
| M2 — encerramento | Confirmação de apresentação satisfatória e testes finais aceitos; PR #137 pronto para revisão | Usar **termo de aceite operacional**, sem criar nota/ata docente inexistente |
| CI experimental | Falha de auditoria de dependências na issue #135 | Acompanhar separadamente; não transformar correção de app em escopo obrigatório de FS I |

**Fontes recomendadas:** [AGENTS.md](../../../AGENTS.md), [índice de US](../../01_REQUIREMENTS/USER_STORIES_INDEX.yaml), [critérios](../../01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml), [diretrizes do professor](../../uml/diretrizes-professor.md), [modelagem geral](../../uml/modelagem-geral/README.md), [status M2](../../uml/auditoria-final/STATUS-CORRECOES-M2.md), [SQL e Workbench](../../../entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md).

## 3. Decisões obrigatórias antes de iniciar a execução

- [ ] Revisar e, após validação humana, integrar o [PR #137 da M2](https://github.com/webkauadev/rede-de-apoio/pull/137) em `main`, garantindo que a versão aceita seja rastreável.
- [ ] Obter a **diretriz específica de FS I e cronograma do AVA** para M3 (apresentação, monitoria, formatos e pesos efetivos); registrar divergências frente à diretriz geral.
- [ ] Identificar o projeto acadêmico **GitLab institucional** em `gitlab.fslab.dev`, confirmar o Board, milestone e participação de cada membro; GitHub continua base canônica operacional do produto, mas **não substitui** registro acadêmico obrigatório.
- [ ] Registrar decisão de metodologia **Kanban**; convenção de workflow mínimo `Opened → Doing → Closed` e definição de pronto/fechado. **Throughput mede fechamento real**, não a aplicação da label `workflow::Closed`.
- [ ] Congelar a versão de referência da M2 (commit/PR, Figma, SQL/MWB) e coletar **links exatos**, sem confiar em links de rascunhos anteriores M3.
- [ ] Distribuir tarefas entre os **quatro membros**, cada um criando e movimentando seus próprios itens no GitLab; nomear revisores cruzados.
- [ ] Definir o índice do dossiê de documentação e o roteiro de apresentação de 10–15 min antes de gerar novos diagramas.
- [ ] Classificar cada lacuna como `EVIDÊNCIA AUSENTE`, `NÃO APLICÁVEL JUSTIFICADO`, `LACUNA REAL` ou `CONFORME`, para não prometer cobertura inexistente.

## 4. Trilhas de trabalho da M3

### Trilha A — Dossiê documental (40 pontos)

Entregar um documento consistente e navegável contendo: visão/problema/objetivos do produto, equipe, stakeholders, RF/RNF e US aprovadas, critérios de aceite, regras de negócio, autorização contextual, jornadas/fluxos, domínio e arquitetura de modelagem, glossário, decisões de design e dados, rastreabilidade, protótipo, evidências de banco/UML, limitações, histórico de revisão e referência de processos. Priorizar referências para arquivos existentes com atualização de conteúdos comprovadamente desatualizados; evitar duplicação sem rastreio de versões.

Critério de pronto: afirmações referenciam uma fonte e não confundem **artefato entregue** com **comportamento de aplicativo implementado**.

### Trilha B — UML e rastreabilidade (20 pontos)

Cruzar US-001–US-036 → RF/RNF → critérios → casos de uso/notas → classes/operações → cenários/seqüências → atividades/estados quando aplicáveis → estrutura SQL → T/E do protótipo. Os 19 diagramas detalhados e seis perspectivas gerais já existem; revisar precisão e cobertura **sem impor classe=tabela nem um caso de uso por US quando nota sistêmica é a representação adequada**.

Verificar especificamente: condicionais de troca de plantão e versão 409; administração e N03; correções imutáveis; pai exclusivo de anexo; bootstrap de Familiar Principal; Pessoa Idosa read-only; auditoria e autorização contextual. Propor novos artefatos somente se o escopo oficial exigir e se houver lacuna real comprovada.

Critério de pronto: nenhum cenário apresentado como PASS sem evidência ou justificativa de recorte.

### Trilha C — Banco de dados (10 pontos)

Consolidar demonstração da V1 física: **34 tabelas**, **79 FKs**, tipos/nulidade, cardinalidades, PK/UNIQUE/CHECK, integridade da rede de cuidados, restrições de anexos e registros imutáveis. Usar `entrega/sql-eer/01_schema_completo_v1.sql`, `rede_de_apoio_v1.mwb`, os seis SVG/PNG e os relatórios de execução MySQL/Workbench.

Critério de pronto: documento explica **por que** o modelo corresponde às regras de negócio; contém links/hashes/versões; nenhuma hipótese sobre comportamento de runtime é tratada como teste real.

### Trilha D — Processo, apresentação e avaliações (25 pontos)

- Processo: GitLab institucional e **Cycle Time, Lead Time, Throughput e WIP** com fonte/período; nenhuma métrica inventada. Registrar dificuldades, retrabalho e aprendizado.
- Apresentação: 10–15 minutos com problema, solução, objetivos, processo, documentação, banco, UML, telas selecionadas, riscos/limites e conclusão. Treinar cronômetro e legibilidade no projetor antes da semana 18.
- Autoavaliação 360° da equipe: fatos e contribuições por pessoa, sem simular participação.
- Nota do cliente: agendar coleta/registro quando professor exigir, não antecipar avaliação.

## 5. Divisão proposta e revisão cruzada (16 itens candidatos de backlog)

**Importante:** distribuição *proposta* para debate coletivo; não são issues já abertas no GitLab. Cada integrante deverá criar seus próprios itens.

| Item | Owner proposto | Entrega candidata | Critério de pronto |
|---|---|---|---|
| M3-DAV-01 | David | Revisão de rastreabilidade do Domínio A (identidade/rede) | RF/US/UC/CL/SQ e protótipo com evidências |
| M3-DAV-02 | David | Integridade SQL de pessoa, usuário, rede, vínculo e bootstrap | PK/FK/UNIQUE/nulidade evidenciados |
| M3-DAV-03 | David | Documentação do Domínio A | Texto revisado, regras e fontes canônicas |
| M3-DAV-04 | David | Revisão independente do Domínio B | Comentários fundamentados, aceite ou lacunas |
| M3-RHU-01 | Rhuan | Rastreabilidade do Domínio B (agenda/plantões/tarefas) | Casos, classes, seqüências e T04/T05 |
| M3-RHU-02 | Rhuan | Validação de contexto temporal e troca de plantão | Versão 409, aceite/recusa/N01 corretamente explicados |
| M3-RHU-03 | Rhuan | Documentação do Domínio B e dados associados | Decisões auditáveis, sem criar RF novo |
| M3-RHU-04 | Rhuan | Revisão independente do Domínio C | Evidências e não conformidades registradas |
| M3-HEN-01 | Henrique | Rastreabilidade do Domínio C (medicamentos/registros) | UC/CL/SQ ↔ telas e regras aprovadas |
| M3-HEN-02 | Henrique | Integridade de medicação e histórico versionado | Imutabilidade, N03, autoria e permissões explicitadas |
| M3-HEN-03 | Henrique | Revisão do DB-C1/DB-C2 e documentação | XOR de anexo, nulidade, FKs e CHECK confrontados |
| M3-HEN-04 | Henrique | Revisão independente do Domínio D | Conformidade de auditoria/governança |
| M3-KAU-01 | Kauã | Domínio D: governança, permissões e auditoria | Leitura de acessos, notificações e segurança no escopo FS I |
| M3-KAU-02 | Kauã | Matriz global de 36 US com classificação de evidências | Nenhuma linha vazia aceita como conformidade |
| M3-KAU-03 | Kauã | Integração editorial do dossiê, versão e roteiro | Contribuições dos quatro membros e índice coerente |
| M3-KAU-04 | Kauã | Revisão independente do Domínio A | Concordância ou achados por linha/diagrama |

**Regra transversal:** o responsável do domínio escreve suas seções de documentação; Kauã atua apenas como integrador editorial, não como autor exclusivo da entrega.

## 6. Sequência de execução após o kickoff

| Ordem | Marco | Produto/decisão |
|---|---|---|
| 0 | Pré-kickoff | Fechar fluxo de revisão da M2; validar AVA e GitLab; aprovar responsabilidades |
| 1 | Início da M3 / semana 13 | Baseline e backlog nas quatro trilhas; matriz de lacunas e prioridades |
| 2 | Semanas 13–15 | Revisões por domínio, banco e dossiê; primeira versão auditável |
| 3 | Semana 16 | **Monitoria**, registrar correções do professor em issues |
| 4 | Semanas 16–17 | Corrigir apontamentos; revisão cruzada; métricas e roteiro |
| 5 | Semana 18 | **Apresentação final**, avaliações e fechamento institucional |

**Datas absolutas não definidas neste plano:** preencher somente após consulta ao cronograma específico do AVA.

## 7. Critério de pronto para considerar o kickoff realizado

- [ ] M2 registrada como encerrada operacionalmente, com link ao PR/termo de aceite.
- [ ] Equipe de quatro membros aprova plano e responsabilidade por revisão cruzada.
- [ ] Diretrizes específicas/AVA e GitLab institucional conferidos.
- [ ] 16 tarefas candidatas revisadas pela equipe e criadas pelos próprios responsáveis.
- [ ] Baseline de 36 US, 19 diagramas e SQL V1 fixada.
- [ ] Quatro trilhas, critérios e evidências de cada entrega publicados.
- [ ] Prazos de monitoria/apresentação preenchidos sem inferência.
- [ ] Nenhuma execução de artefato M3 iniciada sem aceite do plano.

## 8. Riscos e proibições

1. **Não reaproveitar materiais antigos da M3:** o conteúdo do PR #136 não pode ser citado como base técnica.
2. **Não inventar homologação acadêmica:** registro de sucesso da apresentação M2 é evidência declaratória, não documento de nota ou ata do professor.
3. **Não inflar escopo FS I:** implementação Next.js, correção de CI e endpoints não substituem documentação/UML/banco.
4. **Não substituir GitLab por GitHub:** GitLab é obrigatório para comprovação acadêmica do processo; GitHub mantém documentação técnica do projeto.
5. **Não fechar itens apenas por label nem produzir métricas sem eventos reais.**
6. **Não romper baseline sem decisão:** qualquer alteração de SQL V1, critérios ou fluxos canônicos exige justificativa, impacto e aprovação.

## 9. Referências primárias

- [Termo de fechamento M2, PR #137](https://github.com/webkauadev/rede-de-apoio/pull/137)
- [19 artefatos M2](../../uml/implementacao-figma/INDICE-APRESENTACAO-MILESTONE-2.md)
- [Modelagem geral integrada](../../uml/modelagem-geral/README.md)
- [Registry das 36 US](../../01_REQUIREMENTS/USER_STORIES_INDEX.yaml)
- [Diagrama/contratos do professor](../../uml/diretrizes-professor.md)
- [V1 SQL e Workbench](../../../entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md)
- **Diretrizes Gerais de Trabalho em Equipe — Fábrica de Software ADS I–IV**, fornecidas à equipe: FS I = Kanban; M3 semanas 13–18; rubrica acima; GitLab institucional obrigatório. O documento não substitui a diretriz específica da turma.

**Parecer:** M2 possui **aceite operacional suficiente para preparar a M3**. O próximo passo correto é uma **reunião breve de kickoff com aprovação coletiva do backlog**, não implementar imediatamente novos diagramas ou uma aplicação.
