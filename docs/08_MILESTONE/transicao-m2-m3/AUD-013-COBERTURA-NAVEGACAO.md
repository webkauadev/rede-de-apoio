# AUD-M2-013 — Auditoria real de navegação do Fluxo Final

**Escopo:** [Figma Fluxo Final 5926:1014](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=5926-1014), leitura de reações e dos nós existentes. **Não** equivale a execução de backend ou teste funcional da aplicação.

## Regras e expectativas documentais

- [Rastreabilidade de interface](../../03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md): RF09/US-012/013 → E06 Solicitar troca / E07 Responder troca no contexto T04; RF16/US-019 → E16 Administração de medicamento no contexto T08.
- [Protótipo e integridade histórica](../../05_FIGMA/PROTOTYPE_INTEGRITY.yaml): 17 baselines e prova de integridade geral de navegação em setembro, mas não prova dos cenários E06/E07/E16.
- [SQ-02](../../uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md): aceite, recusa e conflito 409 distinguíveis.
- [SQ-03](../../uml/especificacao-para-figma/dominio-C-registros/SQ-03.md): administração confirmada não é apenas cadastro de medicamento.

## Caminhos que o Figma realmente expõe

| Fonte (Node ID) | Reação e destino confirmados | Conclusão |
|---|---|---|
| T03 (5926:1151) | Plantonista atual → T04 (5926:1261); cuidado programado → T05 (5926:1420); Saúde → T08 (5926:1801) | Entradas de leitura confirmadas |
| T04 (5926:1261) | View Dia → T04/day (5926:32402) | Alternância de calendário |
| T04/day (5926:32402) | Plantão ativo → T05 (5926:1420); View Semana → T04 | Navegação calendário→dia |
| T05 (5926:1420) | Voltar → T04; navegação comum T03/T06/T08 | Nenhum comando de administração constatado |
| T08 (5926:1801) | E14 Cadastrar → overlay 5967:6307 | **Cadastro**, não administração |
| Overlay T08 (5967:6307) | Salvar medicamento → validação 5967:6333 → estado criado 5926:34369 | Cadastro possui estados navegáveis, distintos de E16 |

**Nós reativos nos frames baseline examinados:** T03 9, T04 5, T05 4 e T08 8. T04/day 2; overlay de cadastro T08 3. O texto informativo “Administração registrada” existe em um evento de T05, mas não constitui uma ação de registrar administração.

**Pesquisa adicional na página canônica:** nenhum nome de camada corresponde a E06/E07/E16 ou a troca/administração como controle; nenhum texto que constitua botão “Solicitar troca”, “Responder troca” ou “Registrar administração” foi localizado nos estados canônicos examinados. As menções encontradas referem-se a fatos já registrados e à configuração de notificações.

## Lacunas e extensão mínima proposta (ainda não implementada)

| Cenário | Entrada sugerida | Estados mínimos e invariantes |
|---|---|---|
| E06 Solicitar troca | T04, plantão selecionado e usuário vinculado | Destinatário elegível, envio, estado pendente; **solicitar não altera plantão** |
| E07 Responder troca | Solicitação recebida em estado de T04 | Aceitar (altera responsável e gera N01); recusar (sem troca); conflito de versão/contexto 409 (sem troca nem N01) |
| E16 Administração | T08 medicamento/regime ou T05 ocorrência | Registrar horário/fato autorizado; confirmar original imutável; negar sem gravar; N03 somente pós-confirmação |

A modelagem da extensão não autoriza novos endpoints ou migrações. Exigir antes de promover os estados: permissão contextual, autoria/instante, histórico/correções versionadas, ausência de fallback indevido para N02, e auditoria da negação.

## Parecer

AUD-M2-013: **LACUNA DE COBERTURA NAVEGÁVEL CONFIRMADA NO PROTÓTIPO CANÔNICO EXAMINADO; PENDENTE DE PROTOTIPAÇÃO OU ACEITE EXPRESSO DA LIMITAÇÃO**. A existência das 17 telas não basta para provar E06/E07/E16. Nenhuma tela, reação ou protótipo original foi alterado.
