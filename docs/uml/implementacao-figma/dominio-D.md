# Domínio D — Governança e Rastreabilidade

**Estado:** documentação do DB-D verificada no SQL V1; **frames DB-D/EER-D ainda não construídos no Figma** por bloqueio técnico da integração de gravação em 2026-10-16. Não marcar como implementado.

## Escopo aprovado

Governança é **transversal**: não criar novos diagramas de casos de uso, classes ou sequência. Representar somente:
- **DB-D:** recorte físico editável de governança no Figma, 1920 × 1080, identidade da apresentação, fiel ao SQL.
- **EER-D:** imagem/vetores da vista canônica `entrega/sql-eer/diagrama_suporte_tecnico.svg` inseridos em slide, identificada como exportação real do MySQL Workbench.
- Não duplicar requisitos, não criar centro de notificações e não modificar o esquema MySQL V1.

Fontes: [governança transversal](../especificacao-para-figma/00-governanca-transversal.md), [mapeamento EER](../especificacao-para-figma/00-mapeamento-eer.md), `entrega/sql-eer/01_schema_completo_v1.sql`, `entrega/sql-eer/rede_de_apoio_v1.mwb`, [SVG original](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/entrega/sql-eer/diagrama_suporte_tecnico.svg).

## Catálogo físico para DB-D (campos de apresentação)

| Tabela | Campos selecionados, exatamente conforme SQL V1 | Papel |
|---|---|---|
| `auditoria` | `auditoria_id BIGINT UNSIGNED PK`; `rede_id BIGINT UNSIGNED NULL FK`; `pessoa_idosa_id BIGINT UNSIGNED NULL FK`; `ator_usuario_id BIGINT UNSIGNED NULL FK`; `evento_em DATETIME(6)`; `operacao VARCHAR(80)`; `resultado VARCHAR(12)` | Evidência de operação e acesso, inclusive negado |
| `preferencia_notificacao` | `preferencia_id BIGINT UNSIGNED PK`; `rede_id BIGINT UNSIGNED FK`; `usuario_id BIGINT UNSIGNED FK`; `tipo_evento VARCHAR(3)`; `receber BOOLEAN`; `atualizado_em DATETIME(6)` | Preferências opcionais **somente N03 e N04** |
| `entrega_tecnica_notificacao` | `entrega_id BIGINT UNSIGNED PK`; `rede_id BIGINT UNSIGNED FK`; `usuario_destinatario_id BIGINT UNSIGNED FK`; `tipo_evento VARCHAR(3)`; `chave_evento CHAR(64)`; `estado_transporte VARCHAR(16)`; `tentativas INT UNSIGNED` | Fila/entrega técnica **N01–N04**, não central de notificações |
| `idempotencia_comando` | `comando_id BIGINT UNSIGNED PK`; `rede_id BIGINT UNSIGNED FK`; `ator_usuario_id BIGINT UNSIGNED FK`; `chave_cliente VARCHAR(100)`; `payload_sha256 CHAR(64)`; `estado VARCHAR(16)` | Integridade contra duplicação de comandos |
| `usuario` (referência Domínio A) | `usuario_id BIGINT UNSIGNED PK` | Identidade referenciada; não criar tabela nova |
| `rede_cuidado` (referência Domínio A) | `rede_id BIGINT UNSIGNED PK` | Escopo referenciado; não criar tabela nova |

### Ligações físicas que o DB-D deverá representar

| ID | FK na tabela filha → PK da tabela referenciada | Cardinalidade filha → pai, conforme nulidade | Leitura inversa pai → filhas |
|---|---|---|---|
| D-FK01 | `auditoria.ator_usuario_id → usuario.usuario_id` | `0..1` (FK opcional) | `0..*` auditorias |
| D-FK02 | `auditoria.rede_id → rede_cuidado.rede_id` | `0..1` (FK opcional) | `0..*` auditorias |
| D-FK03 | `preferencia_notificacao.usuario_id → usuario.usuario_id` | `1` | `0..*` preferências |
| D-FK04 | `preferencia_notificacao.rede_id → rede_cuidado.rede_id` | `1` | `0..*` preferências |
| D-FK05 | `entrega_tecnica_notificacao.usuario_destinatario_id → usuario.usuario_id` | `1` | `0..*` entregas |
| D-FK06 | `entrega_tecnica_notificacao.rede_id → rede_cuidado.rede_id` | `1` | `0..*` entregas |
| D-FK07 | `idempotencia_comando.ator_usuario_id → usuario.usuario_id` | `1` | `0..*` comandos |
| D-FK08 | `idempotencia_comando.rede_id → rede_cuidado.rede_id` | `1` | `0..*` comandos |

Também existe `auditoria.pessoa_idosa_id → pessoa_idosa.pessoa_idosa_id` (FK opcional); na vista seletiva pode constar em nota ou referência externa, **sem omitir que ela existe no SQL**.

**Convenção de cardinalidades:** escreva `[1]` ou `[0..1]` junto ao pai referenciado, e `[0..*]` junto à tabela filha, sem inverter extremidades. Para a exportação nativa do Workbench, preserve a notação original integral.

### Restrições importantes já verificadas no SQL

- `auditoria.resultado IN ('PERMITIDO','NEGADO','ERRO')`.
- `preferencia_notificacao.tipo_evento IN ('N03','N04')`; `UNIQUE(rede_id, usuario_id, tipo_evento)`.
- `entrega_tecnica_notificacao.tipo_evento IN ('N01','N02','N03','N04')`; `estado_transporte IN ('PENDENTE','PROCESSANDO','ENTREGUE','CANCELADA','FALHA')`.
- `entrega_tecnica_notificacao` possui chave de unicidade por rede, evento, chave e destinatário (`uq_entrega_evento_destinatario`).
- `idempotencia_comando.estado IN ('EM_ANDAMENTO','CONCLUIDO','FALHOU')`; `UNIQUE(rede_id, ator_usuario_id, chave_cliente)`.
- Os campos técnicos, colunas adicionais, todas as FKs, índices e checks restantes permanecem integralmente no SQL/EER nativo; o slide DB-D pode selecionar campos, mas **não pode alterar seus nomes nem significados**.

## Contrato de apresentação no Figma

Usar 16:9 / **1920 × 1080**, padrão visual da apresentação Fábrica de Software: fundo claro, azul institucional, Geist e rodapé com ID + fonte.

DB-D: 4 tabelas centrais editáveis (`auditoria`, `preferencia_notificacao`, `entrega_tecnica_notificacao`, `idempotencia_comando`) e referências externas visuais para `usuario` e `rede_cuidado`. Colocar PK, FK, multiplicidades e oito vínculos D-FK01–08 com âncoras verdadeiras. Repetição visual de caixa de referência é permitida por legibilidade **desde que não sugira duplicação física de tabela**. Reservar nota legível para `pessoa_idosa` e para a distinção N01–N04 versus N03/N04.

EER-D: incorporar **a exportação SVG original** `diagrama_suporte_tecnico.svg`, não uma reconstrução aproximada; facilitar a leitura com zoom/enquadramento do conteúdo e link ao arquivo original. Não alterar `.mwb`, SQL ou exportação de origem.

### Impedimento operacional constatado

Em 2026-10-16, a ferramenta de escrita no Figma retornou `The tool failed internally` para a tentativa de construir o DB-D, depois também para **a criação de frame vazio** e **um teste mínimo não destrutivo**, embora as leituras do documento tenham funcionado. Uma inspeção posterior não encontrou frame DB-D criado parcialmente.

**Situação real:** DB-D e EER-D pendentes de execução no Figma. Node IDs não atribuídos; não inventar links.

**Próximo passo após recuperação da integração:** construir DB-D a partir deste catálogo; conferir captura; importar SVG original no EER-D; validar ambos; atualizar esta página com links reais, Node IDs e resultado da revisão. Não iniciar auditoria geral nova nem refazer a documentação acadêmica.

## Artefato contingencial gerado enquanto o Figma bloqueia gravações

[**Prévia vetorial DB-D em SVG (1920 × 1080)**](./previews/DB-D-governanca-preview.svg) — arquivo criado no GitHub como **representação auxiliar**, com quatro tabelas centrais, referências `usuario`/`rede_cuidado`, oito linhas de FK e legenda de escopo. O arquivo vetorial é adequado para importação posterior; não é um frame Figma, não substitui a vista nativa EER-D e não deve ser marcado como diagrama editável no arquivo oficial até ser importado e validado.

**Importante:** o SVG serve para preservar o trabalho gráfico durante a indisponibilidade. Conferir na importação a posição final das ancoragens, múltiplos vínculos e cardinalidades antes de aceitar a apresentação. O SQL canônico mantém precedência sobre quaisquer abreviações desta prévia.

A [exportação nativa do Workbench — suporte técnico](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/entrega/sql-eer/diagrama_suporte_tecnico.svg) já existe e permanece disponível, sem alterações. Falta somente incorporá-la no slide EER-D da apresentação.

## Preparação para apresentação — 2026-10-16

A lâmina [**EER-D Workbench — prévia SVG**](./previews/EER-D-workbench-preview.svg) foi criada em **1920 × 1080**, preservando os vetores da exportação canônica de suporte técnico no interior de um novo layout de apresentação. A exportação nativa [`diagrama_suporte_tecnico.svg`](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/entrega/sql-eer/diagrama_suporte_tecnico.svg) continua intacta. A prévia aplica um enquadramento visual para slide e **não substitui a fonte completa para inspeção de campos**.

Está disponível também o [**índice de montagem da apresentação**](./INDICE-APRESENTACAO-MILESTONE-2.md), com 19 posições propostas: 17 frames Figma conhecidos dos domínios A/B/C e 2 lâminas pendentes de importação (DB-D, EER-D).

**Importante:** o arquivo Figma continua sem escrita nesta sessão. O preparo dos SVGs e o planejamento no GitHub não significam importação, posicionamento ou aprovação visual dentro do Figma. A execução dessas duas importações, seguida da verificação de conexões e legibilidade, permanece necessária.
