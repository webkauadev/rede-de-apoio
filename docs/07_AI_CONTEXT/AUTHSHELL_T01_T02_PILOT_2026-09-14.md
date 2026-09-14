# AuthShell Pilot — T01 + T02

Data: **2026-09-14**  
Branch: `design/authshell-t01-t02-migration`  
Status: **MIGRATED_PENDING_HUMAN_REVIEW**

Este arquivo registra, de forma estreita, o piloto visual AuthShell de T01 + T02. Ele não substitui requisitos, não aprova funcionalidade e não autoriza propagação para outras T## antes da revisão humana.

## Autoridade funcional preservada

- T01 / Login: RF02 + US-002.
- T02 / Cadastro de Conta: RF01 + US-001.
- P01 permanece aberto: não inventar checklists individuais de aceite.
- Nenhuma regra de negócio, permissão ou requisito foi criada pelo desenho.

## Baselines atuais

### T01

- Default: `5189:730`
- Credenciais inválidas: `5189:800`
- Loading: `5189:870`

### T02

- Default: `5189:938`
- Validation Error: `5189:1043`
- Loading: `5189:1152`

## Piloto AuthShell migrado

### T01

- Default: `5751:2795`
- Credenciais inválidas: `5752:22480`
- Loading: `5752:22536`

### T02

- Default: `5753:208`
- Validation Error: `5754:252`
- Loading: `5754:328`

Review A/B não canônico: `5758:3168`.

## Estrutura visual testada

O piloto usa:

- viewport `390 × 844`;
- margem lateral canônica de `16 px` e largura útil `358 px`;
- Geist e escala tipográfica da Foundation;
- topo de marca reutilizando a família cromática aprovada do shell: `#EEF2F8 → #DCEBF4`;
- `Color/Background` para página;
- `Color/Surface` para Auth Card;
- `Color/Border` para controles interativos;
- `Color/Border Subtle` para limites decorativos;
- `Color/Surface Container Low` para apoio/superfícies secundárias;
- `Color/Primary` para CTA principal;
- `Color/Danger` e superfície semântica de erro para feedback negativo;
- primitives Obra/shadcn existentes (`Input - Nova`, `Button - Nova`, Lucide icons), sem detach.

O topo de marca AuthShell é deliberadamente diferente do `AppHeader / Root / Tinted`: ele comunica identidade antes da autenticação e não contém contexto de Pessoa Idosa, Navigation Bar ou Settings.

## State rule

Regra preservada:

`STATE = PAGE BASE + DELTA MÍNIMO`

- T01 Invalid mantém o shell do Default e acrescenta valores digitados + feedback sem revelar qual credencial falhou.
- T01 Loading mantém o shell e valores digitados, alterando somente o CTA para estado de carregamento.
- T02 Validation Error mantém o shell e valores digitados, alterando a confirmação de senha + mensagem `As senhas não coincidem.`.
- T02 Loading mantém o shell e valores digitados, alterando somente o CTA para estado de carregamento.

A região de body do T02 Validation Error usa rolagem vertical intencional porque a mensagem de erro acrescenta altura ao conteúdo.

## Prototype / navigation

Os frames CURRENT permanecem intactos e preservam o comportamento prototipado atual.

No piloto migrado:

- não há reações `NAVIGATE` de tela copiadas dos frames antigos;
- submit buttons são novas instances vinculadas de `Button - Nova`, mantendo apenas estados/interações do componente;
- links visuais `Criar conta` / `Entrar` foram preservados visualmente;
- o conector Figma bloqueou a escrita de novas reações de navegação durante esta sessão;
- portanto, **wiring do piloto migrado não está sendo apresentado como critério de aprovação funcional**.

Isso não altera requisitos nem redefine destinos. Figma prototype wiring não é fonte de verdade funcional.

## Auditoria estrutural

Nos seis roots migrados:

- `0` detached instances;
- `0` textos estruturais abaixo de `14 px`;
- `0` targets interativos abaixo de `48 px`;
- `0` cores SOLID locais não vinculadas a papel semântico, excluindo internals de instances do kit;
- `0` reações `NAVIGATE` herdadas para telas CURRENT;
- `0` overflow não intencional;
- única rolagem: T02 Validation Error / `AuthShell / Body`, intencional.

## Gate humano

Antes de extrair um componente/grammar AuthShell para a Foundation, revisar visualmente:

1. T01 Default / Invalid / Loading;
2. T02 Default / Validation Error / Loading;
3. consistência entre os dois formulários;
4. identidade visual pré-autenticação;
5. legibilidade e densidade em 390 × 844;
6. feedback de erro sem exposição de informação sensível;
7. clareza de CTA e links de alternância entre Login/Cadastro.

Somente após aprovação humana:

`PILOTO → REVISÃO HUMANA → EXTRAÇÃO DO PADRÃO`

Até lá, **não criar Foundation AuthShell global e não iniciar outra T## a partir deste padrão**.
