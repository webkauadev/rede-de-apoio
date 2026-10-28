# Plano de testes de protótipo — E06, E07, E16

**Status:** PLANO DOCUMENTAL. Nenhum teste de navegação E06/E07/E16 foi marcado como executado.  
**Origem da necessidade:** [auditoria AUD-013](AUD-013-COBERTURA-NAVEGACAO.md), [rastreabilidade de tela](../../03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md).

## Fontes de aceitação realmente aprovadas

- [US-012 / issue #48 — comentário CA canônico](https://github.com/webkauadev/rede-de-apoio/issues/48#issuecomment-5673843194): usuário vinculado solicita troca, ligada ao plantão, passível de resposta posterior.
- [US-013 / issue #49 — comentário CA canônico](https://github.com/webkauadev/rede-de-apoio/issues/49#issuecomment-5673844056): usuário envolvido aceita ou recusa; aceite aplica reorganização e recusa não aplica.
- [US-019 / issue #55 — comentário CA canônico](https://github.com/webkauadev/rede-de-apoio/issues/55#issuecomment-5673849778): usuário com permissão efetiva registra administração, preservando autoria/data-hora, histórico e imutabilidade com correção versionada.
- [SQ-02](../../uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md) e [SQ-03](../../uml/especificacao-para-figma/dominio-C-registros/SQ-03.md): cenários/guardas complementares de modelagem; não alterar o texto dos CA aprovados.

## Roteiro e critérios de verificação

| ID | Caso e origem | Pré-condições | Procedimento visual planejado | Resultado esperado | Natureza do requisito | Evidência |
|---|---|---|---|---|---|---|
| PT-01 | E06 Solicitar troca (US-012) | Usuário vinculado e plantão identificado | T04 → selecionar plantão → E06 → informar destinatário → solicitar | Solicitação fica pendente e associada ao plantão; responsabilidade ainda não muda | **CA APROVADO** | Capturas da origem, formulário e pendência |
| PT-02 | E06 Preparar resposta (US-012) | Solicitação pendente gerada | Abrir estado de solicitações recebidas | Solicitação continua identificável e respondível posteriormente | **CA APROVADO** | Captura de estado pendente e entrada E07 |
| PT-03 | E07 Aceitar (US-013) | Usuário envolvido elegível, solicitação pendente | E07 → Aceitar | Estado aceito, organização do plantão reflete mudança | **CA APROVADO** | Antes/depois do responsável e status |
| PT-04 | E07 Recusar (US-013) | Usuário envolvido, solicitação pendente | E07 → Recusar | Status recusado; responsável original permanece | **CA APROVADO** | Antes/depois do plantão |
| PT-05 | E07 Versão obsoleta (DB-006/SQ-02) | Plantão mudou após criar solicitação | Responder pedido com versão antiga | Conflito 409; não alterar responsabilidade nem produzir N01 | **CENÁRIO COMPLEMENTAR DO CONTRATO**, não novo CA | Imagem da guarda/feedback e plantão intocado |
| PT-06 | E16 Registrar administração (US-019) | Usuário com permissão efetiva, medicamento selecionado | T08 ou T05 → E16 → indicar instante/fato → confirmar | Registro criado; autoria e hora demonstradas | **CA APROVADO** | Sequência visual de entrada, dados e confirmação |
| PT-07 | E16 Histórico (US-019) | Registro confirmado em PT-06 | Abrir histórico autorizado | Nova administração aparece no histórico | **CA APROVADO** | Tela T07/histórico coerente com registro |
| PT-08 | E16 Imutabilidade/correção (US-019) | Administração original existente | Abrir ação de correção autorizada | Original preservado; nova versão identificada e vinculada | **CA APROVADO** | Histórico original+versão |
| PT-09 | E16 Negação (RNF01/SQ-03) | Usuário sem permissão efetiva | Tentar registrar administração | Nenhum registro, feedback de negação, auditoria exigida conforme contrato | **CENÁRIO COMPLEMENTAR DE SEGURANÇA** | Estado negado e representação da trilha |
| PT-10 | E16 Evento N03 (RF25/SQ-03) | Administração confirmada | Concluir PT-06 | N03 somente após sucesso e apenas destinatários aprovados; não emitir após PT-09 | **CENÁRIO COMPLEMENTAR DE NOTIFICAÇÃO** | Estado transitório pós-confirmação e ausência no negado |

**Nota sobre o nível de teste:** neste ciclo de documentação, a evidência aceita é a **coerência navegável do protótipo Figma com os cenários descritos**, não prova de banco de dados ou transporte de notificação. A exigência de atomicidade/transação pertence ao modelo e à implementação, não pode ser declarada testada por mudança visual de tela.

## Gates sem data nem professor

- [x] Origem documental de US-012/013/019 e critérios canônicos localizados.
- [x] Mapeamento de E06/E07/E16 e lacunas de navegação realizado.
- [ ] Estados de E06/E07/E16 criados **em página de desenvolvimento isolada** e identificados como rascunho.
- [ ] Reações e destinos verificados por inspeção estrutural e teste de clique/protótipo.
- [ ] Dez roteiros têm captura de resultado, inclusive os negativos sem escrita/N01/N03.
- [ ] Revisão cruzada das permissões e da coerência com SQ-02/SQ-03.
- [ ] Promoção versionada para página canônica somente após revisão; preservar o histórico e Node IDs relevantes.

**Decisão de proteção:** nenhum estado foi criado ou alterado no Fluxo Final pelo presente documento. Não homologar AUD-M2-013 antes dos roteiros serem efetivamente executados.
