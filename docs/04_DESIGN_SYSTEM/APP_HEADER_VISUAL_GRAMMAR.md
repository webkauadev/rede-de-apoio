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

Telas Root devem usar a variante canônica **soft brand-tinted**.

Ela é composta por:

1. base tonal clara derivada da família de surface;
2. tint suave derivado da família de marca / `Feature/Home`;
3. título em `On Surface`;
4. contexto em `On Surface Variant`;
5. ação Settings como `IconButton` semântico;
6. avatar contextual com ring sutil de marca;
7. separação tonal suficiente para distinguir o shell do conteúdo, sem sombra pesada.

A percepção desejada é: o usuário sente que o header pertence à Rede de Apoio, mas o conteúdo operacional continua sendo o principal portador de cor e atenção.

## 4. Gradiente tonal de marca

Gradiente é permitido como **receita visual semântica do Root Header**, desde que sutil, replicável e derivado dos papéis aprovados.

### Receita canônica aprovada no piloto T03

`Shell/Header/RootTint/Start → Shell/Header/RootTint/End`

Valores aprovados:

- início: `#EEF2F8`;
- fim: `#DCEBF4`;
- direção: horizontal suave;
- ambos os stops são totalmente opacos;
- a presença cromática deve ser perceptível no viewport completo, mas permanecer abaixo do destaque do `Primary Container` operacional.

As variables canônicas no Figma são:

- `Shell/Header/RootTint/Start` — `VariableID:5731:166` — `#EEF2F8`;
- `Shell/Header/RootTint/End` — `VariableID:5731:167` — `#DCEBF4`.

Não hardcodar uma segunda paleta por tela. Novas telas Root reutilizam a receita canônica do shell; se uma futura direção exigir outro papel semântico, isso deve ser decidido no design system antes de ser propagado.

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

O componente usa variantes/masters semânticos reutilizáveis, sem decisões por tela.

### `Root / Tinted` — CANÔNICO

Uso: telas Root autenticadas.

- master Figma: `Rede de Apoio / Foundation / AppHeader / Root / Tinted` (`5746:157`);
- soft brand-tinted surface `#EEF2F8 → #DCEBF4`;
- avatar contextual opcional;
- Settings global;
- title específico da visão;
- context da Pessoa Idosa;
- sem blur/glass.

O `AppShell / Root` (`5652:528`) já consome esse master. Portanto novas migrações Root devem reutilizar o shell em vez de reconstruir o tratamento visual localmente.

### `Root / Default`

Uso: exceção documentada quando uma tela Root não comportar tint.

- `Surface Container Low` ou `Surface Container`;
- mesma estrutura e propriedades da variante Tinted;
- não é o padrão de novas migrações autenticadas.

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

A engrenagem não deve parecer um glyph preto solto nem uma bolha preenchida do tamanho integral do hit target.

Contrato canônico:

- target mínimo: `48 × 48`;
- container visual percebido: aproximadamente `40 × 40`, centralizado dentro do target;
- glyph visual: aproximadamente 20–24 px;
- no master aprovado, o tratamento visual é obtido por borda interna tonal semanticamente vinculada, preservando o hit target de 48 px;
- icon usa acento/foreground semanticamente compatível com o shell;
- hover/pressed/focus deve continuar usando papel de estado compatível quando esses estados forem materializados;
- focus ring usa `ring` / papel de foco shadcn equivalente;
- não usar bolha Primary sólida em repouso sem motivo funcional.

Usar primitive shadcn/Obra de IconButton quando disponível; M3 define papel/estado, shadcn/Obra materializa.

## 8. Avatar contextual

O avatar deve preservar a imagem real/contextual quando disponível.

Tratamento canônico para Root/Tinted:

- avatar existente/Obra preservado;
- ring de aproximadamente 2 px;
- ring usa `Feature/Home/Accent` ou token de marca semanticamente equivalente com presença discreta;
- não adicionar glow;
- não usar ring de status para representar a Pessoa Idosa;
- o ring é identidade/contexto, nunca sucesso/erro/alerta.

## 9. Borda / edge inferior

O header pode usar separação inferior discreta quando necessário, mas o padrão aprovado do piloto resolve a separação principalmente pelo próprio tint.

Preferências:

1. diferença de surface/tint resolve sozinha;
2. se necessário, linha de 1 px usando `Border` ou papel equivalente;
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

O Root/Tinted é uma composição de surface + tint semântico dentro da Foundation; não criar um componente paralelo por tela.

## 11. Relação com Component Color Grammar

Header pertence à **estrutura/shell**. Ele não deve consumir `Category/*` ou `Status/*`.

- `Feature/*` pode fornecer identidade/tint discreto;
- `Category/*` pertence ao conteúdo categorizável;
- `Status/*` pertence a estado funcional real;
- `Primary Container` do conteúdo continua reservado ao foco operacional dominante.

Logo, o header não deve competir com o card `Agora` da T03.

## 12. T03 — visual aprovado do piloto

Preservar:

- `Agora` como maior bloco tonal Primary;
- `Programado` lavanda de `Status/Scheduled`;
- `Hidratação` cyan de Category;
- `Pendente` âmbar de Status;
- Diário plum como Feature de origem;
- Navigation Bar com Secondary Container na seleção.

Shell aprovado:

- `AppHeader / Root / Tinted` (`5746:157`);
- gradiente `#EEF2F8 → #DCEBF4`;
- Settings com target 48 × 48 e visual percebido ~40 × 40;
- avatar com ring de 2 px em `Feature/Home/Accent`;
- sem Liquid Glass;
- sem alterar conteúdo ou destinations.

T03 Default (`5684:1407`) e Loading (`5684:22165`) usam esse mesmo master.

## 13. Gate de aprovação — CONCLUÍDO

A revisão humana do piloto T03 aprovou o Candidate B em 2026-09-14.

Resultado do gate:

1. tint percebido como identidade sem virar decoração — aprovado;
2. header estrutural e menos dominante que o Primary operacional — aprovado;
3. título/contexto legíveis — aprovado;
4. Settings reconhecível como controle — aprovado;
5. avatar contextual preservado — aprovado;
6. ring não representa status — aprovado;
7. Loading mantém exatamente o mesmo shell — aprovado;
8. sem blur/glassmorphism — aprovado;
9. Root/Tinted reutilizável sem definir cor tela por tela — aprovado;
10. direção visual consistente com M3 + identidade Rede de Apoio — aprovado.

A partir deste gate, `Root / Tinted` é padrão canônico das novas migrações Root autenticadas. Qualquer desvio exige justificativa documentada.

## 14. Princípio resumido para agentes

> **O header é estrutura com identidade: use o `AppHeader / Root / Tinted` canônico e o `AppShell / Root`; não redesenhe o header por tela. O gradiente aprovado é `#EEF2F8 → #DCEBF4`, Settings mantém 48 × 48 de hit target com presença visual ~40 × 40, avatar contextual recebe ring discreto de marca e o conteúdo continua sendo o principal portador de cor semântica.**

## 15. Implementação canônica do piloto T03

As variables do header foram promovidas após aprovação humana:

| Variable | Figma Variable ID | Valor | Uso |
|---|---|---|---|
| `Shell/Header/RootTint/Start` | `VariableID:5731:166` | `#EEF2F8` | primeiro stop do Root/Tinted |
| `Shell/Header/RootTint/End` | `VariableID:5731:167` | `#DCEBF4` | segundo stop do Root/Tinted |

O gradiente é horizontal e totalmente opaco: não possui blur, backdrop effect, translucência, glow, mesh ou sombra pesada.

O componente canônico é `Rede de Apoio / Foundation / AppHeader / Root / Tinted` (`5746:157`). O `AppShell / Root` (`5652:528`) consome esse componente, de modo que as próximas telas Root devem herdar a mesma estrutura.

O Settings preserva target 48 × 48 e aproximadamente 40 × 40 de presença visual. O avatar contextual preserva a imagem original e recebe ring de 2 px em `Feature/Home/Accent` como identidade/contexto, nunca como indicador de status.
