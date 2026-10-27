# Auditoria técnica e de rastreabilidade — Modelagem Geral

**Data da rodada:** 2026-10-27  
**Escopo:** AT-G, UC-G, CL-G, SQ-G, DB-G e referência EER-G na página do Figma `6430:3326`.  
**PR documental:** [#134 — Draft](https://github.com/webkauadev/rede-de-apoio/pull/134).  
**Conclusão:** **correções aplicadas e verificadas visualmente; homologação acadêmica ainda não concedida**. Não houve execução de MySQL, validação de app em runtime, projeção real, nem alteração de fonte `.mwb`.

## Método / fontes
1. Releitura dos contratos [UC-01/02/03](../especificacao-para-figma/README.md), [CL-01](../especificacao-para-figma/dominio-A-pessoas-rede/CL-01.md), [CL-02](../especificacao-para-figma/dominio-B-organizacao/CL-02.md), [CL-03](../especificacao-para-figma/dominio-C-registros/CL-03.md), [SQ-03](../especificacao-para-figma/dominio-C-registros/SQ-03.md).
2. Comparação textual de `CREATE TABLE IF NOT EXISTS`, `CONSTRAINT FOREIGN KEY`, UNIQUE e CHECK nas **17 tabelas selecionadas**, usando [01_schema_completo_v1.sql](../../../entrega/sql-eer/01_schema_completo_v1.sql). A fonte física tem **34 tabelas e 79 FKs**; isso já estava demonstrado na entrega SQL/EER, não é um resultado novo do recorte.
3. Inspeção dos nodes editáveis no Figma, correção pontual de textos/guardas/FKs/multiplicidades sem apagar/recriar os frames.
4. Inspeção visual por captura dos frames em escala reduzida; **não** foi teste real em projetor.

## Achados e intervenções verificadas

| ID | Área | Problema da primeira versão | Intervenção efetuada no Figma | Situação após intervenção |
|---|---|---|---|---|
| AG-01 | UC-G | `Usuário com Permissão Efetiva` como ator genérico abstrato, confundindo papel e condição | Substituído por `Familiar de Apoio / Emergência`, condição contextual explícita. `Criar / atribuir tarefa` substituído por `Solicitar troca de plantão`, conforme UC-02 e vínculo; registro/correção sujeitos a permissão efetiva | Corrigido no recorte; cobertura integral não reivindicada |
| AG-02 | CL-G | Os 13 rótulos de multiplicidade exibiam pares no meio das relações, não nos extremos | Removidos 13 rótulos compostos; criados **26 rótulos**, um por extremo, com reposicionamento para evitar sobreposição de atributos | Corrigido visualmente; verificar leitura 100% e semântica antes de homologar |
| AG-03 | CL-G | Grupo `C — Medicação` continha `ConclusaoTarefa` e estava funcionalmente impreciso | Renomeado `B/C — Conclusão e Medicação`; outra faixa renomeada `C/D — Execução e Rastreabilidade` | Corrigido na apresentação |
| AG-04 | SQ-G | Retorno de autorização omitido após `verificarEscritaEContexto()` | Inserido `M09R: resultadoAutorizacao`, retorno tracejado do verificador ao serviço | Corrigido no desenho |
| AG-05 | SQ-G | N03 era descrito junto ao resultado devolvido à interface, podendo sugerir notificação como retorno | `M13` reduzido a `resultadoRegistro` e N03 representado por nota pós-confirmação | Corrigido |
| AG-06 | SQ-G | `registrarNegacao()` era operação inventada e `acessoNegado()/conflito` misturava cenários | M14 substituída por `registrarEvento(NEGADO, contextoSanitizado)`; M15 por `acessoNegado()`; guarda restringida a negação/contexto inválido. Reprocessamento idempotente e 409 ficam como cenários separados | Corrigido, com inferência de serviço explicitada |
| AG-07 | DB-G | Algumas FKs compostas eram apresentadas como se fossem simples; ocorrências e papéis precisavam ser precisados | Conferidas e revisadas colunas compostas, três papéis da solicitação de troca, ligações contexto/rede e FK opcional para ocorrência | Corrigido no recorte |
| AG-08 | DB-G | Linhas verticais sem identificação confundiam relações com alinhamento de colunas | Onze relações físicas selecionadas passaram a exibir nomes reais de FK e o marcador textual `↑` para referência do filho ao pai | Corrigido como *amostra*, não como EER completo |
| AG-09 | AT-G | O papel `Familiar Principal` aparecia antes do bootstrap | A raia ficou `Familiar Iniciador / Principal` e recebeu pré-condição de conta autenticada, sem pressupor papel antecipado | Corrigido |
| AG-10 | EER-G | O Figma contém somente a prancha-índice, não o EER panorâmico incorporado | Mantidos links ao [SVG nativo](../../../entrega/sql-eer/diagrama_geral.svg) e [MWB original](../../../entrega/sql-eer/rede_de_apoio_v1.mwb) sem redigitalização | **Pendente** apenas caso a apresentação exija EER embutido no Figma |

## Matriz de conformidade resumida

| Artefato | Estrutura/UML | Regras e rastreabilidade | Estado |
|---|---|---|---|
| [AT-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6431-3326) | 3 partições, 3 decisões com guardas, início e fins | Bootstrap B3, Principal único, Profissional mínimo, autorização, original e versão | **Revisado com ressalvas**; não comprova navegação do protótipo |
| [UC-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6432-3326) | 4 categorias de ator, 16 objetivos, fronteira | Atividades seletivas em UC-01/02/03 e permissões; não representar N02/N04 como ator | **Revisado com ressalvas**; não substitui catálogo RF/US completo |
| [CL-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6434-3326) | 16 classes, 13 relações, 26 multiplicidades nos extremos | Correspondência aos três contratos CL e preservação do limite domínio x físico | **Parcial**: relações transversais entre grupos foram selecionadas; não há todas as relações de rede |
| [SQ-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6433-3326) | 7 lifelines, M01–M15 + M09R, `alt` com 2 guardas | Operações de criação/auditoria, N03 não é retorno, DB-038 negações | **Revisado com ressalvas**: inferências de arquitetura e casos especiais não cobertos |
| [DB-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6435-3326) | 17 tabelas / 4 grupos e 11 vínculos amostrais | FKs compostas e CHECK XOR confrontados textualmente contra DDL | **Parcial por design**: as demais FKs não estão desenhadas |
| [EER-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6438-3326) | Prancha de referência a modelo externo | Fonte nativa tem 34 tabelas/79 FKs e 6 vistas | **Fonte física disponível**, mas não incorporada integralmente no Figma |

## Riscos ainda abertos — não converter em PASS

- **AG-P01 — Relações transversais de classes:** CL-G é um subgrafo do domínio; não desenha, por exemplo, todos os vínculos `RedeCuidado → Plantao/Tarefa/Medicamento/RegistroCuidado`. A apresentação deve tratá-lo como núcleo *seletivo* ou derivar e validar esses vínculos antes de representar um domínio fechado.
- **AG-P02 — Cobertura funcional:** UC-G não mostra todos os 36 US/objetivos, e a organização em quatro linhas não demonstra todos os atores habilitados para cada caso. Os diagramas UC-01/02/03 e a matriz continuam canônicos.
- **AG-P03 — Sequência e implementação:** a existência dos participantes inferidos `Serviço de Agenda`, `Autorização Contextual`, `Serviço de Administração`, `Serviço de Auditoria` é conceitual; não prova que seus métodos/API reais estão implementados. `resultadoAutorizacao` e outras mensagens dependem de revisão final de critério de aceite/Gherkin. Replay idempotente e conflito 409 devem ser documentados como cenários separados se exigidos na rubrica.
- **AG-P04 — Banco integrado:** DB-G mantém FKs interdomínio em campos textuais, sem desenhar todas as conexões ou cardinalidades físicas. Usar `.mwb`/SVG nativo como prova. Não converter DB-G em EER fiel automaticamente.
- **AG-P05 — EER incorporado:** a prancha EER-G não possui o SVG geral completo dentro do frame; fonte pode ser aberta diretamente no GitHub/Workbench, não foi perdida nem modificada.
- **AG-P06 — Testes acadêmicos:** falta projeção 16:9 e revisão externa de legibilidade; não há parecer do professor, homologação de PR, prova de navegação de protótipo ou testes end-to-end relativos aos novos diagramas.

## Critérios para futura homologação

1. Todo papel e objetivo do UC-G deve ter US/RF/CA explícito e satisfazer [matriz de permissões](../../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md).
2. Para cada relação do CL-G, localizar duas classes, duas pontas e multiplicidades na documentação canônica; vínculos transversais não desenhados devem ser classificados como omissão seletiva.
3. Toda mensagem síncrona do SQ-G que represente domínio precisa corresponder a contrato ou receber marca `[INFERÊNCIA]`; só no sucesso ocorre criação de Administração; toda negação com trilha requerida é auditada.
4. PK/FK/CHECK representadas no DB-G têm de coincidir com o SQL V1; EER-G não pode ser substituído por representação manual parcial.
5. Conferência de fonte física em Workbench, teste de leitura em projetor e aprovação acadêmica explícita precedem qualquer declaração de versão homologada.

**Parecer:** material mais preciso para estudo e apresentação preliminar; **não aprovado academicamente**. O PR #134 deve continuar Draft.