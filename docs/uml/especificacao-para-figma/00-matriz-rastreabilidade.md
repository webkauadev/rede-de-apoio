# Matriz de rastreabilidade dos elementos

Esta matriz aponta para os catálogos individuais; não duplica as definições. A referência acadêmica comum é: UC slides 8–14; CL slides 16–26; SQ slides 28–39; revisão slides 53–58.

| Escopo canônico | Diagramas / elementos | Critério aprovado / fonte | Tela / EER |
|---|---|---|---|
| RF01/RF02; US-001/002 | UC-01 U-01/U-02; CL-01 C-A01; SQ-01 M-01–M-05 | Issues #37/#38, comments #5673832998/#5673834103 | T02/T01; `usuario`, `sessao_usuario`. |
| RF03–05; US-003–007 | UC-01 U-03–U-08; CL-01 C-A02–C-A05, R02–R05 | Issues #39–43, comments #5673834995–8448; RN-001/002 | T12/T13; identidade/rede EER. |
| RF22/RF24/RF30; US-026/028/036 | UC-01 U-09–U-11; CL-01 C-A06/C-A07; SQ-01 F-02 | #62/#64/#72; comments #5673857040/#5673860524/#5673868957; RN-009 | T14/T15, T01–T15 read-only. |
| RF06–10; US-008–014 | UC-02 U-12–U-18; CL-02 C-B01/B02; SQ-02 | #44–50; N01/RN-003 | T04/E06/E07; agenda EER. |
| RF20–21; US-023–025 | UC-02 U-19–U-21; CL-02 C-B03–B05 | #59–61; V1 DB-007/032 | T11/T09; agenda EER. |
| RF11/12/18; US-015/016/021 | UC-03 U-22/U-23/U-28; CL-03 C-C01/C-C02 | #51/#52/#57; RN-005/006 | T06/T07/T05; registro/correção EER. |
| RF14–17; US-017–020 | UC-03 U-24–U-27; CL-03 C-C03–C-C07; SQ-03 | #53–56; N02, RN-010 | T08/T05; medicação EER. |
| RF19/RF23; US-022/027 | UC-03 U-29/U-30; CL-03 C-C08–C-C10 | #58/#63; RNF01 | T10/E10; consulta/anexo EER. |
| RF25–29; US-029–033 | UC-03 U-31–U-35; CL-03 C-C11; SQ-03 M-09 | #65–69; N03/N04, RN-008/011 | T03/T05/T07/T16/T17; suporte EER. |
| RNF01–03; US-034/035 | UC-03 U-36/U-37; CL-03 R05/C-C11; SQ-01 F-02, SQ-03 nota | #70/#71; RN-005–008 | E12/E27/T17; correções/auditoria EER. |

Cobertura: RF01–RF30 e RNF01–RNF03 são cobertos quando aplicáveis; RF13/RNF03 são transversais e aparecem em autoria/auditoria, não como origem adicional de US. Cada atributo/relação/mensagem tem fonte no arquivo individual. Itens P-UML permanecem sem decisão visual semântica.
