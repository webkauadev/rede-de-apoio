# Fechamento técnico independente da Milestone 2 — 09/11/2026

**Projeto:** Rede de Apoio a Cuidadores de Idosos · **Disciplina:** Fábrica de Software I / ADS-IFRO.  
**Escopo:** Somente Milestone 2 (M2). **Nenhum artefato gerado para a M3 integra as evidências deste relatório.**  
**Natureza do parecer:** conferência técnica dos originais M2 do Figma e do acervo canônico do GitHub; não é homologação do professor.

## Decisão

**AVANÇO TÉCNICO SUBSTANCIAL; PRONTA PARA REVISÃO FINAL DA M2, MAS NÃO FORMALMENTE HOMOLOGADA.**

O relatório histórico de 16/10/2026 (1 PASS e 18 FAIL, antes das correções) é preservado. Ele **não** representa o estado corrigido de 09/11/2026. Nesta rodada houve correção de legibilidade em CL-03 e prototipação dos cenários E06/E07/E16 na página **de correções da própria M2**, com inspeção estrutural das 10 rotas previstas. Todavia, aprovação docente, verificação física no projetor e ensaio manual no modo apresentação **não foram demonstrados**. Não atribuir nota ou aceite.

## 1. Fontes canônicas e limites

- [Relatório independente original](RELATORIO-AUDITORIA-M2.md) de 16/10/2026; [13 achados](INCONSISTENCIAS-E-CORRECOES.md); [matriz de 19 artefatos](MATRIZ-VALIDACAO-19-ARTEFATOS.md).
- [Registro de correções M2](STATUS-CORRECOES-M2.md) e [contratos para Figma](../especificacao-para-figma).
- [Figma, apresentação oficial M2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6103-3636).
- [Figma, Fluxo Final — CORREÇÕES AUDITORIA](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6223-6270), com 17 telas e estados herdados da entrega M2.
- [SQL físico](../../../entrega/sql-eer/01_schema_completo_v1.sql) e [evidência Workbench nativo](../../../entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md).
- Os dados pessoais/exemplos (Juliana/Bruno/medicamento A/datas) são demonstrativos.
- A fonte `Fluxo Final` anterior (`5926:1014`) e a modelagem SQL/MWB não foram alteradas nesta rodada. A página M2 de correções é a apresentação de trabalho vigente proposta para navegação; a promoção formal da versão final exige revisão da equipe.

## 2. Integridade dos 19 artefatos no Figma

A leitura direta dos Node IDs da apresentação M2 identificou **19/19 quadros presentes**, todos **1920×1080**, em sequência crescente de x na apresentação oficial (slides 13–31), incluindo UC-01/02/03, CL-01/02/03, SQ-01/02/03, DB-A/B/C1/C2/D e EER-A/B/C1/C2/D. Nos cinco quadros EER foram localizados os **cinco objetos SVG nativos correspondentes ao PR #132**, nos seus pais corretos.

O relatório prévio do Workbench declara reabertura independente, seis exportações nativas, 34 tabelas, 305 colunas e 79 FKs. **Nesta rodada houve conferência da incorporação dos SVG no Figma; não houve reexecução do Workbench nem de SQL.**

## 3. Achados AUD-M2 — decisão focal

| ID | Prioridade | Evidência de correção na entrega M2 | Estado de fechamento |
|---|---|---|---|
| AUD-M2-001 | P1 | CL-02 corrigido no Figma; multiplicidades dos três papéis conforme relatório M2, desenho inspecionado | **Correção verificada no escopo dos papéis; aceite docente pendente** |
| AUD-M2-002 | P1 | DB-C2 com 0..1 para pai opcional e XOR dos três vínculos, texto inspecionado | **Correção focal verificada** |
| AUD-M2-003 | P1 | Workbench nativo reaberto e 5 SVG importados nos EER canônicos conforme PR #132; vínculos nativos conferidos | **Entrega técnica comprovada, sem reexecução nesta data** |
| AUD-M2-004 | P1 | SQ-01/02/03 corrigidos conforme histórico da M2; conferência focal dos textos/mensagens; pontas de seta já auditadas na correção anterior | **Correção documentada; prova anterior preservada** |
| AUD-M2-005 | P1 | CL-01 não expõe `Usuario.autenticar()`; serviço responsável aparece em SQ-01 | **Conforme no critério focal** |
| AUD-M2-006 | P1 | SQ-02 mostra alternativa 409 e revalidação de versão/contexto no instante da resposta, N01 restrito ao aceite | **Conforme no critério focal de modelagem** |
| AUD-M2-007 | P1 | CL-01 mostra `ContatoImportante.telefone: String` obrigatório | **Conforme no critério focal** |
| AUD-M2-008 | P2 | CL-03 original `6272:3484` recebeu novo roteamento de 8 associações e 16 rótulos; quadro anterior arquivado `6488:3484`; UC-02/03, CL-02 e EER-A vistos em capturas atuais | **Sobreposição principal do CL-03 corrigida; teste físico em projetor pendente e legibilidade residual CL-02/EER a conferir** |
| AUD-M2-009 | P2 | Histórico da M2 atesta 72 tipos numéricos ajustados ao SQL, sem mudanças adicionais nesta rodada | **Correção anterior documentada; sem novo cotejo integral** |
| AUD-M2-010 | P2 | CL-03 registra assinaturas de `AdministracaoMedicamento.registrar(...)` e `Auditoria.registrarEvento(...)`; SQ-03 contém chamada correspondente | **Conforme no critério focal** |
| AUD-M2-011 | P2 | Ordem oficial slides 13–31/19 frames verificáveis; link da demonstração 04 atualizado para a página M2 corrigida | **Correção verificada** |
| AUD-M2-012 | P2 | DB-C2 explica XOR/CHECK como autoridade do SQL, EER apenas vista temática | **Correção verificada** |
| AUD-M2-013 | P2 | Criados fluxos E06/E07/E16 **com componentes e estados da M2**, 5 CTAs e 28 rotas internas; inspeção programática de 10 percursos | **10/10 verificações estruturais PASS; falta teste manual clicado e revisão cruzada; não confundir com prova de backend** |

Não foi detectado novo P1 na inspeção focal; isso **não** é certificação integral de todas as relações dos 19 diagramas. A correção geométrica não autoriza substituir o status histórico sem nova matriz assinada.

## 4. AUD-M2-008 — reparo no CL-03 oficial

- [CL-03 corrigido, ID preservado `6272:3484`](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6272-3484).
- [Versão arquivada antes da edição, `6488:3484`](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6488-3484).
- Foram reposicionadas **oito** rotas vetoriais (R01–R05 e R07–R09) e **16** etiquetas de multiplicidade, preservando os **11** conceitos/classes, os mesmos oito pares, os valores `1`, `0..1`, `0..*`, a anotação de exatamente um pai de `Anexo` e omissões deliberadas R06/R10.
- A nova captura foi lida visualmente: a cadeia superior não invade campos de classe e as três rotas de Anexo passam pelo espaço sobre a segunda fileira.
- Nenhuma ampliação arbitrária de classe ou alteração do modelo SQL foi necessária.
- **Ressalva:** teste com projetor/zoom real, com a equipe, e leitura de rotas densas de CL-02 e EER panorâmico ainda não registrados.

## 5. AUD-M2-013 — fluxos navegáveis no acervo CORRIGIDO DA PRÓPRIA M2

[Relatório dos cenários e IDs](TESTES-NAVEGACAO-M2-2026-11-09.md).

- Origem: a **página M2 de correções existente** `6223:6270`, não laboratório ou rascunho posterior.
- Seção adicional M2 `6495:9547` gerada de uma cópia do **Bottom Sheet M2 preexistente** `6223:8966` (mantidos padrão Geist, componentes, scrim).
- Entradas nas telas de calendário semanal e diário `6223:6364`/`6223:7016` e medicamentos `6223:6593` com 5 CTAs.
- 3 formulários originais M2 clonados + 10 estados/resultados M2 clonados + 1 quadro calendário pós-aceite baseado no T04 M2, total **14 estados adicionais**; **33 ações/reações configuradas** (5 acessos + 28 botões internos).
- A solicitação preserva o responsável até aceite. Aceite muda responsável de Juliana para Bruno, **não atribui automaticamente papel Familiar Principal ao destinatário**, e representa N01. Recusa e conflito 409 preservam responsável e não geram N01 pelo aceite.
- Administração autorizada representa fato realizado, autoria, instante, histórico, correção versionada, consequência N03 somente após confirmação. Caminho sem permissão não cria administração nem N03.
- **10/10 PASS na inspeção estática de reações, destinos e textos**; teste manual do modo apresentação, persistência, permissão real e atomicidade transacional **não executados**, não pertencem à prova do Figma.
- A demonstração oficial do [slide 04 da M2](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6103-3699) agora aponta para a [página M2 de correções](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6223-6270), não para o protótipo original desatualizado.

## 6. Gates antes de declarar a Milestone 2 encerrada

| Gate | Status | Ação restante |
|---|---|---|
| G1 — Existência e ordem 19 artefatos | **CONFORME** | Nenhuma |
| G2 — Falhas P1 originais | **CORRIGIDAS NO ESCOPO DOCUMENTADO** | Revisor técnico diferente do autor confirma a matriz integral |
| G3 — Erros P2 geométricos | **CORREÇÃO CL-03 REALIZADA** | Teste em projetor; verificar CL-02/EER e apresentação completa |
| G4 — Navegação E06/E07/E16 | **10/10 PASS ESTRUTURAL** | Clicar manualmente em modo apresentação, capturar estados e revisar regras |
| G5 — Fontes SQL/EER | **EVIDÊNCIA PRÉVIA FORTE** | Reproduzir checagens no momento da entrega se exigido |
| G6 — Escopo UML acadêmico | **NÃO CONFIRMADO** | Professor/especificação docente: PE-01–04; revisar atividades/estados quando explicitamente exigidos |
| G7 — Homologação docente | **NÃO COMPROVADA** | Obter parecer/aceite formal do professor |

**Parecer final:** a M2 conta agora com correções concretas nos dois achados residuais mais evidentes e está **apta à revisão independente de encerramento**, mas **ainda não pode ser carimbada como homologada academicamente** sem gates G3/G4/G6/G7. Não confundir esta conclusão técnica com abertura ou execução da M3.
