# SQ-G — Sequência integrada do registro do cuidado

[Figma: diagrama editável SQ-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6433-3326) · Frame `6433:3326`, 4850×3600 px · 7 participantes, 15 mensagens e um fragmento `alt`.

## Cenário e pré-condições
Rede operacional e leitura do detalhamento de dia autorizada. Este diagrama **não** é a criação da rede nem toda a utilização do sistema; é uma interação focal que atravessa agenda, autorização, administração de medicação e governança.

Participantes: Responsável autorizado (actor); Interface de Cuidados (boundary); Serviço de Agenda (control/inferido); Autorização Contextual (control/inferido); Serviço de Administração (control/inferido); AdministraçãoMedicamento (entity); Serviço de Auditoria (control/inferido).

## Contrato visual de mensagens
| Ordem | Envio / retorno | Caráter |
|---|---|---|
| M01 | Responsável → UI: abrirDetalhamento(data) | solicitação |
| M02 | UI → Agenda: obterDia(rede,data) | solicitação |
| M03 | Agenda → Autorização: verificarLeitura(contexto) | solicitação |
| M04 | Autorização → Agenda: acessoPermitido | retorno |
| M05 | Agenda → UI: programaçãoAutorizada | retorno |
| M06 | UI → Responsável: exibirCuidadosDoDia() | retorno conceitual |
| M07 | Responsável → UI: informarAdministracao(dados) | solicitação |
| M08 | UI → Administração: registrarAdministracao(dados) | solicitação |
| M09 | Administração → Autorização: verificarEscritaEContexto() | solicitação |
| M10 | Administração → AdministracaoMedicamento: registrar(realizadaEm, autor) | ramo válido; operação CL-03 |
| M11 | AdministracaoMedicamento → Administração: administracaoRegistrada | retorno |
| M12 | Administração → Auditoria: registrarEvento(resultado, contextoSanitizado) | ramo válido; assinatura CL-03 |
| M13 | Administração → UI: resultadoRegistro + nota N03 | retorno de sucesso |
| M14 | Administração → Auditoria: registrarNegacao() | ramo negado; serviço técnico inferido |
| M15 | Administração → UI: acessoNegado()/conflito | retorno negado |

Fragmento `alt`: guarda permitida (permissão/rede/ocorrência/idempotência) e guarda negada. **O ramo negado não cria administração nem dispara N03.** A auditabilidade da negação exige preservação mesmo se a transação de domínio é revertida (DB-038). N02/N04 são outros fluxos temporais.

## Limitações e conformidade
- As responsabilidades dos serviços são `[INFERÊNCIA]` arquitetural, **não** classe SQL nova, operação já implementada ou comportamento de produção comprovado.
- M09 não exibe retorno explícito de autorização; os dois operandos do `alt` resumem seu resultado. Verificar se a rubrica do professor exige explicitar esse retorno.
- M06 é efeito de interface conceitual; se a notação pedir retorno estrito do mesmo tipo, revisar.
- Referências: [SQ-03](../especificacao-para-figma/dominio-C-registros/SQ-03.md), [CL-03](../especificacao-para-figma/dominio-C-registros/CL-03.md), [autorização](../../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md), [DB-038](../../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md), [aulas 28–39](../diretrizes-professor.md).

**Pendente:** revisão cruzada de todas as mensagens versus assinaturas, guardas e abstrações. Não homologar automaticamente.
