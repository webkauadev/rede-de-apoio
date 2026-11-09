# Termo de encerramento operacional — Milestone 2

**Projeto:** Rede de Apoio a Cuidadores de Idosos  
**Data do registro da confirmação:** 09/11/2026  
**Disciplina:** Fábrica de Software I  
**Decisão:** **M2 ENCERRADA OPERACIONALMENTE PELA EQUIPE — PREPARAÇÃO DA M3 LIBERADA**.

## 1. Declaração de encerramento recebida

Em 09/11/2026, o solicitante, como interlocutor da equipe, confirmou nesta conversa que **a apresentação da Milestone 2 já ocorreu e transcorreu satisfatoriamente** e solicitou expressamente que **os testes finais anteriormente pendentes sejam marcados como concluídos e comprovados**.

Esta é uma **confirmação declaratória do responsável pela entrega**. O registro não deve ser descrito como gravação de sessão, captura de projetor, ata assinada pelo docente ou execução independente do assistente. A **data exata da apresentação** não foi informada, portanto não foi presumida.

## 2. Consolidação das evidências

| Verificação | Resultado em 09/11/2026 | Natureza da evidência |
|---|---|---|
| Integridade da apresentação M2 | **CONFORME** — 19/19 quadros, ordenação 13–31, cinco EER nativos | Conferência estrutural direta no Figma; [relatório M2](FECHAMENTO-TECNICO-M2-2026-11-09.md) |
| Correções dos achados P1 e P2 | **CONCLUÍDAS NO ESCOPO REGISTRADO** | Revisões e documentação de correções existentes, sem alegar nova auditoria exaustiva |
| AUD-M2-008 — legibilidade/projeção final | **ACEITO / CONCLUÍDO POR CONFIRMAÇÃO DA EQUIPE** | Relato de que a apresentação ocorreu e correu bem; não há laudo fotométrico ou foto de projeção anexada |
| AUD-M2-013 — 10 testes de rotas | **10/10 PASS ESTRUTURAL DOCUMENTADO** | Leitura programática de `ON_CLICK`, destinos e pós-condições; [testes](TESTES-NAVEGACAO-M2-2026-11-09.md) |
| AUD-M2-013 — validação manual dos fluxos | **CONCLUÍDA / ACEITA POR CONFIRMAÇÃO DA EQUIPE** | Confirmação expressa do solicitante de que os testes finais podem ser dados como concluídos; não há log individual de cliques anexado |
| Apresentação Milestone 2 | **REALIZADA COM RESULTADO SATISFATÓRIO, CONFORME RELATO** | Confirmação expressa do solicitante |
| Revisão final / decisão interna de transição | **APROVADA PELO INTERLOCUTOR DA EQUIPE** | Solicitação de encerramento e preparação para a M3 nesta conversa |
| Nota, aprovação formal do professor ou rubrica corrigida | **NÃO DISPONIBILIZADAS DOCUMENTALMENTE** | Não presumir nota, assinatura, data exata ou homologação institucional formal |

**Conclusão dos gates de transição:** as pendências operacionais de demonstração/projeção/navegação ficam **encerradas por aceite declaratório da equipe**, em conjunto com as evidências técnicas previamente registradas. A ausência de nota/ata oficial **não é transformada em reprovação nem em aprovação formal inventada**.

## 3. Limites técnicos que continuam valendo

- Testes no Figma provam **a navegação acadêmica desenhada**; não demonstram execução de backend, autorização real, envio de N01/N03, controle de concorrência ou persistência MySQL.
- O relatório de auditoria pré-correções com **1 PASS/18 FAIL**, datado de 16/10/2026, permanece como **histórico** e não representa o estado de encerramento.
- O `application` CI do PR #137 falhou em auditoria de dependências, assunto de [issue #135](https://github.com/webkauadev/rede-de-apoio/issues/135), separado da prova de diagramas e apresentação da M2.
- Não há alterações novas no SQL V1 ou no arquivo `.mwb`; os EER baseiam-se em prova nativa anterior.
- Material criado em rascunhos/PRs da M3 antes desta decisão está **expressamente desconsiderado**; não integra nem prova o fechamento da M2.

## 4. Decisão e governança da transição

**A equipe pode iniciar o planejamento da Milestone 3 com a M2 operacionalmente encerrada.** A documentação deste termo deve ser revisada e promovida pelo fluxo normal de branch → PR → revisão → merge; não se deve mesclar automaticamente em `main` nem afirmar que uma aprovação docente escrita foi obtida sem comprovante.

Se a nota, a avaliação FSQA, a ata do professor ou a data precisa da apresentação forem fornecidas posteriormente, anexar como evidência adicional, **sem reabrir automaticamente as correções técnicas**.

**Fontes:** [parecer de fechamento técnico](FECHAMENTO-TECNICO-M2-2026-11-09.md), [testes de navegação](TESTES-NAVEGACAO-M2-2026-11-09.md), [status AUD-M2](STATUS-CORRECOES-M2.md), [Figma da apresentação](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6103-3636).
