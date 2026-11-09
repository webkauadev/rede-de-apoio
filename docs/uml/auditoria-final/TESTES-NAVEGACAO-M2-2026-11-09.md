# Auditoria de navegação do protótipo — AUD-M2-013

**Data:** 09/11/2026 · **Escopo:** Milestone 2 exclusivamente.  
**Status de evidência:** modelos visuais construídos e testados estruturalmente, não homologados por teste manual.  
**Página de origem:** [Fluxo Final — CORREÇÕES AUDITORIA](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6223-6270), ID `6223:6270`.  
**Seção nova para correção da M2:** [M2 · FECHAMENTO AUD-M2-013 — E06 E07 E16](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6495-9547).  
**Padrão de componentes:** clones do Bottom Sheet canônico de cadastro E14 `6223:8966`; CTAs existentes do Design Foundation (via instâncias). **Nenhum frame da Milestone 3 foi utilizado.**

## Referências de requisitos

- RF09 / [US-012](https://github.com/webkauadev/rede-de-apoio/issues/48) — solicitar troca de plantão sem alterar responsabilidade antes da resposta.
- RF09 / [US-013](https://github.com/webkauadev/rede-de-apoio/issues/49) — aceitar ou recusar a solicitação; aceite altera o responsável.
- RF16 / [US-019](https://github.com/webkauadev/rede-de-apoio/issues/55) — registrar administração com autoria, tempo e histórico imutável; correção versionada.
- SQ-02: proteção de versão esperada e 409 sem alteração/N01.
- SQ-03: acesso negado não registra administração nem N03; N03 somente após sucesso.
- Apenas exemplos ilustrativos; sem transação, API, autorização real, histórico persistido ou notificação entregue.

## Frames e entradas

| Papel | Node ID | Descrição |
|---|---|---|
| T04 semana | `6223:6364` | Calendário M2 corrigido, CTAs de troca |
| T04 dia | `6223:7016` | Calendário diário M2 corrigido, CTAs de troca |
| T08 medicamentos | `6223:6593` | Lista M2 corrigida, CTA de administração |
| E06 | `6495:9548` | Formulário solicitar troca |
| E06-P | `6497:9613` | Solicitação pendente; responsável original |
| E07-R | `6497:9647` | Solicitações recebidas |
| E07 | `6495:9582` | Formulário aceitar/recusar/contexto v4 |
| E07-A | `6497:9681` | Aceite, Bruno assume e N01 |
| T04 pós-aceite | `6499:9691` | Calendário M2 clonado com responsável Bruno; papel `Membro vinculado`, sem inventar Familiar Principal |
| E07-D | `6497:9715` | Recusa, sem mudar responsável |
| E07-409 | `6497:9749` | Versão inválida, não altera escala e não emite N01 |
| E16 | `6495:9616` | Administração com autoria e data/hora |
| E16-S | `6497:9783` | Confirmação e N03 ilustrativo |
| E16-H | `6497:9817` | Histórico com original preservado |
| E16-Co | `6497:9851` | Criar correção versionada |
| E16-V | `6497:9885` | Histórico original v1 mais correção v2 |
| E16-N | `6497:9919` | Permissão negada, sem escrita e sem N03 |

## Ações configuradas (Figma `ON_CLICK`)

Cinco CTAs de entrada nas telas-base:
- `6499:9660` T04 semanal → E06
- `6499:9665` T04 semanal → E07-R
- `6499:9671` T04 diário → E06
- `6499:9676` T04 diário → E07-R
- `6499:9681` T08 lista → E16

Ações internas: 28 reações nos formulários/estados acima, tipo `SWAP`, `NAVIGATE` ou `CLOSE`; `OVERLAY` na abertura dos três formulários, transição `MOVE_IN BOTTOM`.

## Dez verificações estruturais realizadas

Inspeção programática usando os Node IDs M2 acima: para cada botão, verificou-se que `reactions[0].trigger.type === ON_CLICK`, que `action.destinationId` corresponde ao quadro destino, que `action.navigation` preserva a intenção do protótipo, e que o texto do estado de chegada representa a pós-condição esperada.

| Teste | Percurso estrutural validado | Pós-condição textual | Resultado |
|---|---|---|---|
| PT-01 | T04 `6499:9660` → E06 `6495:9548` → E06-P `6497:9613` | PENDENTE, escala inalterada | **PASS** |
| PT-02 | E06-P → E07-R → E07 | Solicitação recebida e passível de resposta | **PASS** |
| PT-03 | E07 → E07-A → T04 pós-aceite | Novo responsável Bruno; papel membro, N01 anotado após aceite | **PASS** |
| PT-04 | E07 → E07-D | Recusa, Juliana continua responsável | **PASS** |
| PT-05 | E07 → E07-409 | 409, nenhum novo responsável e nenhum N01 | **PASS** |
| PT-06 | T08 → E16 → E16-S | ADM-001 confirmada, autoria e N03 | **PASS** |
| PT-07 | E16-S → E16-H | Administração original preservada | **PASS** |
| PT-08 | E16-H → E16-Co → E16-V | Original v1 preservado, correção v2 vinculada | **PASS** |
| PT-09 | E16 → E16-N | Sem permissão, sem administração nem N03 | **PASS** |
| PT-10 | E16 → E16-S | N03 somente no estado de confirmação | **PASS** |

**Resultado da inspeção estrutural:** 10/10 PASS.

**O que NÃO foi testado:** cliques físicos no modo apresentação, estados dinâmicos de uma única solicitação, backend, autenticação real, persistência, transações, versionamento concorrente de verdade, envio de N01/N03 ou trilha de auditoria real. Estados positivos/negativos são trajetórias alternativas com dados fictícios. O teste afirma somente que o **protótipo acadêmico tem destinos e mensagens navegáveis coerentes no recorte inspecionado**.

## Evidência visual

Capturas Figma verificaram T04 com dois botões sem obstruir cartões, T08 com CTA acima da navegação, os 3 formulários com campos e controles completos e o quadro pós-aceite com novo responsável (sem atribuição indevida de Familiar Principal). A apresentação oficial da M2, [slide 04](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6103-3699), teve seu botão de demonstração apontado para a página M2 corrigida.

## Critérios de aceite ainda pendentes antes de homologar AUD-M2-013

1. Teste de cliques manual dos 10 percursos em protótipo, anotando se `OVERLAY`/`SWAP`/`CLOSE` produzem os destinos esperados.
2. Revisão cruzada por responsável de US-012, US-013, US-019 e responsável pela apresentação.
3. Conferir na versão usada perante professor as condições visuais de permissão, autoria, histórico e troca e documentar os limites de simulação.
4. Registro de aceite expresso da revisão do protótipo; não declarar controle de concorrência/segurança efetivamente implementado.

**Conclusão:** a lacuna de elementos navegáveis foi **atacada com artefatos concretos da M2**, mas o achado permanece **AGUARDANDO TESTE MANUAL E REVISÃO CRUZADA**.
