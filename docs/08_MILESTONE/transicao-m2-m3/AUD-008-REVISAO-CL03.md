# AUD-M2-008 — Revisão geométrica isolada do CL-03

**Resultado:** cópia revisada no Figma, **sem promover à apresentação canônica nem homologar academicamente**.

## Referências e preservação

- [CL-03 original — 6272:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6272-3484), preservado na apresentação M2.
- [Página independente de revisão — 6466:3326](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6466-3326).
- [CL-03 rascunho corrigido — 6466:3327](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6466-3327).

**Conferência estrutural:** a cópia é distinta do original e preserva 11 classes, oito associações de domínio (R01–R05/R07–R09) e 16 valores de multiplicidade. R06/R10 permanecem excluídas conforme o contrato original.

## Correções realizadas no rascunho

| Relações | Revisão efetuada | Semântica |
|---|---|---|
| R01 Medicamento–Regime | Trilho superior e multiplicidades sobre pontas distintas | Preservada |
| R02 Regime–Horário | Trilho superior sem cobrir atributos | Preservada |
| R03 Horário–Ocorrência | Trilho superior, rótulos removidos das caixas | Preservada |
| R04 Ocorrência–Administração | Trilho superior com dois valores 0..1 | Preservada |
| R05 Registro–Correção | Trilho superior à segunda fileira | Preservada |
| R07/R08/R09 | Valores deslocados da sobreposição entre linhas e caixas | Preservada |

**Operação realizada exclusivamente na cópia:** 16 rótulos reposicionados, cinco links roteados acima das caixas; inclusão de aviso visível “RASCUNHO M3 — NÃO HOMOLOGADO”. Resultado conferido em duas capturas, inclusive ajuste do aviso para evitar a nota XOR.

## Restrições de adoção

A conferência visual por captura não é teste em projetor. Cabe revisão cruzada das multiplicidades com o [contrato CL-03](../../uml/especificacao-para-figma/dominio-C-registros/CL-03.md), inclusive clareza das conexões pela borda superior. O AUD-M2-008 permanece **PENDENTE DE APROVAÇÃO/PROMOÇÃO** e de verificações geométricas residuais nos demais modelos. Não houve edição do frame original, da SQL ou do Workbench.
