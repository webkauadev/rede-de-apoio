# Estados por Tela

Complementa `SCREENS_CATALOG.md`, que declarava estados apenas para T01 e T02.

## Regra

`STATE = PAGE BASE + DELTA MÍNIMO`

Estado não é tela. No Figma, estado é **variante ou frame derivado** da página base,
nomeado `Txx / Estado`. Nunca um design independente.

## Conjunto canônico

| Estado | Quando aplicar | Delta permitido |
|---|---|---|
| `Default` | conteúdo presente | — (é a página base) |
| `Loading` | busca inicial de dados | área de conteúdo vira skeleton; shell intacto |
| `Empty` | consulta válida, zero resultados | área de conteúdo vira bloco de ausência; shell intacto |
| `Error` | falha de carga ou validação | mensagem + campo afetado, ou bloco de falha na área de conteúdo |
| `Success` | confirmação de ação | Toast sobre a página base; nada mais muda |

`Success` é sempre Toast, nunca tela. `Empty` só existe onde a lista pode estar vazia.

## Aplicação

Preenchido apenas para telas com origem funcional rastreada.
Telas em P08/P09 ficam em branco até terem RF/US — declarar estado antes de
existir requisito seria inventar comportamento.

| Tela | Default | Loading | Empty | Error | Success | Origem |
|---|---|---|---|---|---|---|
| T01 Login | ✓ | ✓ | — | ✓ | — | catálogo existente |
| T02 Cadastro | ✓ | ✓ | — | ✓ | ✓ | catálogo existente |
| T06 Diário | ✓ | ✓ | ✓ | ✓ | ✓ | RF11 / RF13 |
| T16 Preferências | pendente P08 | | | | | RF27 sem US |
| T17 Auditoria | pendente P01 | | | | | RF29 / US033 sem texto |
| Demais | pendente P09 | | | | | sem origem |
