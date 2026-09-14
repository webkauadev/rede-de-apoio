# App Header Visual Grammar — Rede de Apoio

Status: **CANÔNICO PARA MIGRAÇÕES VISUAIS APÓS O PILOTO T03**  
Data: **2026-09-14**

Este documento define a linguagem visual reutilizável dos cabeçalhos do Rede de Apoio. Ele complementa `MATERIAL3_VISUAL_DIRECTION.md`, `COLOR_SURFACE_STRATEGY.md` e `COMPONENT_COLOR_GRAMMAR.md`.

A meta é evitar dois extremos: um App Header neutro/chapado que pareça apenas uma faixa de protótipo e um efeito decorativo de moda que entre em conflito com Material 3 e com a identidade de cuidado do produto.

## 1. Princípio central

`estrutura M3 → surface semântica → tint de marca controlado → primitive shadcn/Obra → tela`

O cabeçalho deve participar da identidade do produto, mas continuar sendo estrutura. Cor no header deve reforçar contexto e hierarquia, não disputar com o conteúdo operacional.

## 2. Liquid Glass / glassmorphism

**NÃO usar Liquid Glass / glassmorphism como linguagem padrão do App Header.**

Motivos:

- aproxima a interface de uma linguagem Apple/iOS que não é a autoridade visual do projeto;
- depende de blur/transparência sobre conteúdo para produzir o efeito completo;
- pode prejudicar contraste, consistência e previsibilidade em estados diferentes;
- cria uma assinatura visual mais decorativa do que semântica;
- é difícil de manter de forma consistente entre T01–T17 sem virar efeito gratuito.

Blur/transparência podem ser usados futuramente em superfícies transitórias específicas se houver função clara, mas não são o padrão do cabeçalho persistente.

## 3. Direção aprovada para Root Header

Telas Root devem usar uma variante **soft brand-tinted**.

Ela é composta por:

1. base neutra de `Surface Container Low` ou `Surface Container`;
2. tint muito suave derivado da família de marca / `Feature/Home`;
3. título em `On Surface`;
4. contexto em `On Surface Variant`;
5. ação Settings como `IconButton` semântico;
6. avatar contextual com ring sutil de marca;
7. separação inferior discreta, sem sombra pesada.

A percepção desejada é: o usuário sente que o header pertence à Rede de Apoio, mas não identifica um “efeito de gradiente chamativo”.

## 4. Gradiente tonal de marca

Gradiente é permitido como **receita visual semântica do Root Header**, desde que sutil e derivado de tokens existentes.

### Receita preferencial

`Surface Container Low → blend suave com Feature/Home/Container`

Valores de referência do piloto:

- base: `Surface Container Low` `#F8F5FA`;
- tint de marca: `Feature/Home/Container` `#D0E9F3`;
- força visual do tint: aproximadamente 8–15% na percepção final, não uma transição saturada;
- direção preferencial: diagonal ou horizontal muito suave; evitar banding e hotspots;
- resultado deve permanecer legível como surface clara estrutural.

Não hardcodar uma segunda paleta apenas para o gradiente. Se a implementação exigir stops intermediários, derivá-los da mistura dos papéis semânticos aprovados e documentar o mapeamento.

### Proibido

- azul forte → roxo;
- teal → pink;
- gradiente multicolorido;
- neon;
- glow;
- mesh gradient decorativo;
- gradiente que compete com `Primary Container` do conteúdo;
- opacidade que prejudique contraste do título/contexto.

## 5. Variantes do AppHeader

O componente deve evoluir para variantes semânticas reutilizáveis, sem decisões por tela.

### `Root / Tinted`

Uso: telas Root autenticadas.

- soft brand-tinted surface;
- avatar contextual opcional;
- Settings global;
- title específico da visão;
- context da Pessoa Idosa;
- sem blur/glass.

### `Root / Default`

Uso: quando a tela Root não comportar tint por motivo documentado.

- `Surface Container Low` ou `Surface Container`;
- mesma estrutura e propriedades da variante Tinted.

### `Root / Scrolled`

Uso: somente quando houver estado de rolagem materializado.

- aumentar separação tonal em relação ao conteúdo;
- preferir `Surface Container` ou papel local equivalente;
- pode reduzir a influência do tint para priorizar legibilidade;
- não inventar este estado quando a tela não possui comportamento scrolled.

### `Back / Default`

Uso: telas filhas.

- neutro;
- voltar + título;
- ação secundária somente quando funcionalmente autorizada;
- não herdar automaticamente o gradiente do Root Header.

## 6. Hierarquia e não redundância

A Navigation Bar informa **onde** o usuário está no mapa primário.

O App Header informa **qual visão/página/tarefa** está aberta.

Portanto:

- não repetir mecanicamente `Home`, `Agenda`, `Diário` ou `Saúde` como título se houver nome de visão mais informativo;
- não repetir o título do header como segundo H1 imediato no corpo;
- contexto da Pessoa Idosa permanece secundário ao título;
- uma única âncora principal de título por viewport, salvo exceção documentada.

Exemplo T03:

- Navigation: `Home` ativa;
- Header title: `Visão Geral`;
- Header context: `Clodoaldo Oliveira`;
- corpo inicia pela introdução e primeira seção, sem `Visão Geral do Cuidado` redundante.

## 7. Settings IconButton

A engrenagem não deve parecer um glyph preto solto.

Contrato:

- target mínimo: `48 × 48`;
- glyph visual: aproximadamente 20–24 px;
- container visual pode permanecer transparente em repouso;
- hover/pressed/focus usa `Secondary Container`, `Surface Container` ou papel local equivalente conforme estado;
- icon repouso: `On Surface`;
- focus ring: `ring` / papel de foco shadcn equivalente;
- não usar bolha Primary sólida em repouso sem motivo funcional.

Usar primitive shadcn/Obra de IconButton quando disponível; M3 define papel/estado, shadcn/Obra materializa.

## 8. Avatar contextual

O avatar deve preservar a imagem real/contextual quando disponível.

Tratamento recomendado para Root/Tinted:

- avatar existente/Obra preservado;
- ring de aproximadamente 2 px;
- ring usa `Feature/Home/Accent` ou token de marca semanticamente equivalente com presença discreta;
- não adicionar glow;
- não usar ring de status para representar a Pessoa Idosa;
- o ring é identidade/contexto, nunca sucesso/erro/alerta.

## 9. Borda / edge inferior

O header pode usar uma separação inferior muito discreta para não se fundir ao conteúdo.

Preferências:

1. diferença de surface/tint resolve sozinha;
2. se necessário, linha de 1 px usando `Border` ou uma mistura de `Primary` com baixa presença;
3. evitar sombra pesada;
4. evitar elevation decorativa quando não houver sobreposição/scroll que justifique profundidade.

## 10. Compatibilidade shadcn / Obra

A estrutura genérica continua baseada em papéis equivalentes a:

- `background` / `foreground`;
- `card` / `card-foreground`;
- `muted` / `muted-foreground`;
- `primary` / `primary-foreground`;
- `secondary` / `secondary-foreground`;
- `accent` / `accent-foreground`;
- `border`;
- `ring`.

O Root/Tinted é uma composição de surface + tint semântico; não criar um componente paralelo fora do design system se `AppHeader / Root` puder receber uma variante/propriedade sem detach.

## 11. Relação com Component Color Grammar

Header pertence à **estrutura/shell**. Ele não deve consumir `Category/*` ou `Status/*`.

- `Feature/*` pode fornecer identidade/tint discreto;
- `Category/*` pertence ao conteúdo categorizável;
- `Status/*` pertence a estado funcional real;
- `Primary Container` do conteúdo continua reservado ao foco operacional dominante.

Logo, o header não deve competir com o card `Agora` da T03.

## 12. T03 — target visual do piloto

Preservar:

- `Agora` como maior bloco tonal Primary;
- `Programado` lavanda de `Status/Scheduled`;
- `Hidratação` cyan de Category;
- `Pendente` âmbar de Status;
- Diário plum como Feature de origem;
- Navigation Bar com Secondary Container na seleção.

Alterar apenas o shell superior para validar o novo padrão:

- `AppHeader / Root` → variante `Root / Tinted`;
- soft tonal gradient derivado de surface + Home tint;
- Settings → IconButton semântico;
- avatar → ring de marca sutil;
- sem Liquid Glass;
- sem alterar conteúdo ou destinations.

## 13. Gate de aprovação

Antes de propagar o header para próximas telas, revisar:

1. o tint é percebido como identidade e não como decoração?
2. o header continua estrutural e menos dominante que o conteúdo Primary?
3. título/contexto mantêm contraste adequado?
4. o Settings parece um controle e não um glyph perdido?
5. o avatar mantém a identidade real da Pessoa Idosa?
6. o ring não parece status?
7. o efeito continua consistente no Loading?
8. não houve blur/glassmorphism?
9. a versão Root/Tinted pode ser reutilizada sem definir cor tela por tela?
10. a tela ficou mais acabada sem parecer Android baseline ou iOS clone?

A variante só vira padrão global após aprovação humana no piloto T03.

## 14. Princípio resumido para agentes

> **O header é estrutura com identidade: surface semântica primeiro, tint de marca depois. Use um gradiente tonal sutil e replicável, nunca vidro/blur como linguagem padrão. Settings deve ser um IconButton real, avatar pode receber ring discreto de marca e o conteúdo continua sendo o principal portador de cor semântica.**

## 15. Pilot T03 implementation

The following local candidates were created in the Figma collection `Rede de
Apoio / Semantic` for the T03 `Root / Tinted` pilot. They are **TARGET
CANDIDATE — PENDING HUMAN REVIEW**, not final `DESIGN_TOKENS.md` values.

| Variable | Figma Variable ID | Value | Derivation and use |
|---|---|---|---|
| `Shell/Header/RootTint/Start` | `VariableID:5731:166` | `#F8F5FA` | `Surface Container Low`; first stop of the local Default/Loading header gradient. |
| `Shell/Header/RootTint/End` | `VariableID:5731:167` | `#F2F3F9` | approximately 15% perceptual blend of `Feature/Home/Container` over `Surface Container Low`; final stop of the same gradient. |

The gradient is horizontal and fully opaque: it has no blur, backdrop effect,
translucency, glow, mesh, or shadow. The local Settings target keeps its
48 × 48 px target with a `Surface` circular container and `On Surface` glyph.
The contextual avatar keeps the original image and receives a 2 px
`Feature/Home/Accent` ring as identity/context, never as a status indicator.
