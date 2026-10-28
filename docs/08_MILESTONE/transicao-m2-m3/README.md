# Transição M2 → M3 — Controle operacional sem cronograma

**Projeto:** Rede de Apoio a Cuidadores de Idosos · **Disciplina:** Fábrica de Software I (ADS/IFRO).  
**Escopo:** auditoria e preparação acadêmica, **sem** criação de API, WebApp, deploy, funcionalidades ou diagrama novo.  
**Situação:** EM AUDITORIA. Documento proposto em branch específica; não afeta a `main` enquanto PR Draft não for revisado.

## O que foi executado nesta rodada

| Frente | Evidência criada | Situação |
|---|---|---|
| Inventário M1/M2 | [INVENTARIO-M1-M2.md](INVENTARIO-M1-M2.md): 19 diagramas originais, 6 perspectivas gerais, 17 telas e demais acervos | **Consolidação inicial realizada**; revisão cruzada pendente |
| Rastreabilidade das US | [MATRIZ-36-US.md](MATRIZ-36-US.md): 36/36 histórias reconciliadas aos owners/origens/telas; conceitos candidatos preservados como candidatos | **Consolidação inicial realizada**; vínculos UML reais ainda por validar |
| Auditoria M2 histórica × corrigida | [RECONCILIACAO-AUD-M2.md](RECONCILIACAO-AUD-M2.md): 13 achados, P1/P2, correções e verificação que falta | **Classificação realizada**; não homologada automaticamente |
| Rascunho CL-03 / AUD-008 | [AUD-008-REVISAO-CL03.md](AUD-008-REVISAO-CL03.md): cópia de revisão 6466:3327, 8 associações e 16 multiplicidades; original preservado | **Rascunho produzido, não promovido** |
| Fluxos do protótipo / AUD-013 | [AUD-013-COBERTURA-NAVEGACAO.md](AUD-013-COBERTURA-NAVEGACAO.md): T04/day e cadastro E14 navegáveis; E06/E07/E16 não demonstrados | **Lacuna canônica confirmada** |
| Revalidação focal P1 | [REVALIDACAO-FOCAL-P1.md](REVALIDACAO-FOCAL-P1.md): contrato × Figma × SQL para 001, 002, 005, 006, 007 | **Conforme no escopo verificado** desses defeitos; não da M2 inteira |
| Sequências e EER | [REVALIDACAO-AUD-003-004.md](REVALIDACAO-AUD-003-004.md): setas/retornos e 79/79 FKs conferidas no renderer Workbench | **Conforme no escopo verificado** |
| Banco DB e assinaturas P2 | [REVALIDACAO-AUD-008-012.md](REVALIDACAO-AUD-008-012.md): 158 campos SQL 100% compatíveis; 010–012 conferidos; CL-03 legibilidade pendente | **AUD-008 permanece aberto** |
| Rastreabilidade por caso de uso | [MATRIZ-UC-VERIFICADOS.md](MATRIZ-UC-VERIFICADOS.md): 31 US ligadas literalmente a U-xx; 5 por regras N01–N04 e RNF | **Comprovação documental do elo US↔UC** |
| Banco DDL × regras | [BANCO-GARANTIAS.md](BANCO-GARANTIAS.md): evidência MySQL real 34/79/50/44 e limites transacionais | **Conforme no escopo de estrutura física**, sem afirmar serviço concluído |
| Backlog e gates | [BACKLOG-SEM-DATAS.md](BACKLOG-SEM-DATAS.md): oito atividades, owners sugeridos, revisão, critérios e dependências | **Planejado**; não criar/atribuir issues institucionalmente sem contexto da equipe |

## Descobertas consolidadas (não extrapolar)

1. **A fonte operacional é GitHub `main`**, com RF01–30, RNF01–03, US-001–036 e critérios de aceite aprovados pelo solicitante.
2. **O Figma contém 19/19 frames** de apresentação M2, seis pranchas gerais e 17/17 baselines do `Fluxo Final`. Sua existência não comprova navegação/permissão de aplicação.
3. **Cinco EER temáticos contêm SVG nativo**, com MWB reaberto e seis exportações versionadas; o EER-G no Figma é só a prancha que remete à fonte física integral.
4. **O SQL real já foi testado:** a entrega relata 34 tabelas, 44 UNIQUE, 79 FK, 50 CHECK, MySQL 8.4.11 e oito testes estruturais; regras de autorização e transação continuam externas à prova DDL.
5. **A modelagem geral tem aceite documental com ressalvas**, concedido pelo solicitante no PR #134. Isso não é parecer acadêmico sobre a M2 inteira.
6. **O GitLab institucional é uma exigência das Diretrizes Gerais de FS I**, mas não há projeto institucional ligado às ferramentas deste chat. Evidência de board e métricas: **NÃO VERIFICADO**, não «inexistente».
7. **O PM Canvas canônico da M1 não apareceu como artefato explícito na árvore GitHub examinada**. Precisará ser localizado no acervo da equipe; o Site Map tem documento e SVG versionados.
8. **A segurança do app continua questão separada**: issue [#135](https://github.com/webkauadev/rede-de-apoio/issues/135), sem confundir CI verde/vermelho com avaliação da modelagem.

## Etapas que podem prosseguir aqui, sem confirmação de datas/professores

**A — Executáveis agora com as ferramentas conectadas**

- Auditar o conteúdo de cada frame Figma com os contratos originais e corrigir **documentação**, não o original gráfico, até localizar divergência provada.
- Testar rastreabilidade documental com o registry e o SQL, classificar correspondências candidatas e registrar prova específica.
- Construir versão única do índice acadêmico, comparando os documentos existentes antes de copiar.
- Auditar o modelo físico e os testes **já versionados**, distinguindo prova de MySQL de regra transacional sem execução.
- Produzir checkpoints de revisor por domínio, plano de apresentação e checklist técnico.
- Trabalhar em branches e PRs Draft no GitHub sem modificar `main`, SQL, MWB ou protótipos.

**B — Necessitam evidência adicional de plataforma ou pessoa, mas não impedem A**

- GitLab `gitlab.fslab.dev`: conectar ou fornecer o projeto institucional para ler issues, MRs, board e movimentações; não forjar retrospectivas.
- PM Canvas original e evidências individuais da M1: localizar documento de versão final.
- Critérios específicos de professor/AVA, homologação acadêmica, nota do cliente, autoavaliação e teste físico de projeção: não inferir nem marcar concluídos.

## Controle dos gates sem datas

**G1 (inventário):** em auditoria; **G2 (pendências):** em auditoria; **G3 (UML/banco):** em auditoria com **AUD-M2-008 aberto**; **G4 (integração documental):** em auditoria; **G5/G6/G7:** não verificados. A execução de artefato não fecha gate sem revisor e evidência.

## Regra de proteção

- Não refazer diagramas por estética; usar recortes seletivos como previsto na aula.
- Não fazer merge automático deste PR; revisão humana e evidência determinam promoção.
- Não alterar `main` diretamente, nem mudar dados/esquema do banco.
- Não interpretar corrigido, auditado ou aceito pelo solicitante como homologado academicamente.
- A elaboração desta documentação **não** movimenta tarefa, issue ou métrica no GitLab.

## Fontes primárias

- [`AGENTS.md`](https://github.com/webkauadev/rede-de-apoio/blob/main/AGENTS.md), [estado do projeto](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md), [M2 e AUD](https://github.com/webkauadev/rede-de-apoio/tree/main/docs/uml/auditoria-final).
- [Contratos UML](https://github.com/webkauadev/rede-de-apoio/tree/main/docs/uml/especificacao-para-figma), [Modelagem Geral](https://github.com/webkauadev/rede-de-apoio/tree/main/docs/uml/modelagem-geral).
- [Projeto físico](https://github.com/webkauadev/rede-de-apoio/tree/main/entrega/sql-eer), [proposta conceitual](https://github.com/webkauadev/rede-de-apoio/tree/main/docs/09_BANCO_DE_DADOS).
- [Telas do Figma](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=5926-1014), [apresentação M2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6103-3636).
- [Diretrizes da aula](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/diretrizes-professor.md) e Diretrizes Gerais de trabalho em equipe fornecidas pelo solicitante.

## Segunda passagem de revalidação documentada

Os relatórios adicionais encerram **no escopo específico** AUD-M2-003/004 e AUD-M2-009/010/011/012, mantendo AUD-M2-008 pendente de correção geométrica do CL-03, AUD-M2-013 pendente de prova navegável e a aprovação docente fora do escopo. A [matriz UC verificada](MATRIZ-UC-VERIFICADOS.md) resolve referências literais para 31 US e fundamenta as 5 sem elipse individual.

### Nova evidência focal no Figma

A [cópia geométrica CL-03](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6466-3327) é um rascunho isolado e não altera a apresentação M2. A análise da árvore de reações [Fluxo Final](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=5926-1014) confirmou ausência de E06/E07/E16 como interações navegáveis nos estados canônicos auditados. Essas constatações atualizam os bloqueios sem simularem a aprovação dos professores.
