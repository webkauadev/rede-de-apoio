# Local Subnavigation Pattern — Rede de Apoio

Status: **CANÔNICO PARA NOVAS MIGRAÇÕES**  
Data: **2026-09-14**

Este documento define a regra de navegação local/submenu para telas que pertencem a uma seção primária do aplicativo, como Saúde.

## 1. Decisão

Quando uma tela possuir destinos irmãos dentro da mesma seção primária, a navegação local deve aparecer **imediatamente abaixo do App Header e acima do conteúdo rolável**.

Exemplo atual em Saúde:

`Medicamentos · Tarefas · Consultas · Compromissos`

A Navigation Bar inferior continua sendo a navegação primária global:

`Home · Agenda · Diário · Saúde`

Logo:

- navegação global = bottom Navigation Bar;
- navegação local da seção = topo, logo abaixo do header;
- conteúdo da página = abaixo da navegação local.

Não posicionar a navegação local perto da Navigation Bar inferior, pois isso mistura dois níveis de hierarquia no mesmo polo visual.

## 2. Base Material 3

A decisão é alinhada ao Material 3, com uma adaptação controlada do comportamento de scroll.

Referências oficiais consultadas:

- Material 3 Tabs / Android Developers: https://developer.android.com/develop/ui/compose/components/tabs
- Material 3 layout and navigation patterns: https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns
- Material 3 `PrimaryTabRow`: https://developer.android.com/reference/kotlin/androidx/compose/material3/PrimaryTabRow.composable
- Material 3 `PrimaryScrollableTabRow`: https://developer.android.com/reference/kotlin/androidx/compose/material3/PrimaryScrollableTabRow.composable
- Material 3 `TopAppBarDefaults.enterAlwaysScrollBehavior`: https://developer.android.com/reference/kotlin/androidx/compose/material3/TopAppBarDefaults

O Material 3 orienta que primary tabs sejam colocadas no topo do content pane, abaixo de uma top app bar, e que tabs sejam usadas para alternar rapidamente entre conteúdos relacionados.

No Rede de Apoio, os destinos locais de uma seção usam esse papel visual de tabs, mesmo que sejam secundários na arquitetura global do produto.

### Importante sobre nomenclatura

`PrimaryTabRow` em Material 3 significa o primeiro nível de tabs dentro do content pane. Isso não significa que essas tabs substituem a Navigation Bar global do aplicativo.

Portanto:

- Navigation Bar = navegação primária do app;
- Local Subnavigation = primeiro nível de tabs dentro da seção ativa.

Se futuramente uma tela tiver um segundo nível de tabs dentro desse submenu, usar papel equivalente a `SecondaryTabRow` para esse nível adicional.

## 3. Fixed vs scrollable tabs

Usar `PrimaryTabRow` quando todos os destinos couberem confortavelmente sem truncar ou comprimir labels.

Usar comportamento equivalente a `PrimaryScrollableTabRow` quando os labels não couberem com ergonomia.

Para Saúde, o conjunto:

`Medicamentos · Tarefas · Consultas · Compromissos`

é considerado **scrollable local subnavigation**, porque `Medicamentos` e `Compromissos` tornam uma distribuição fixa de quatro itens excessivamente comprimida em 390 px.

Regras:

- uma única linha;
- labels não devem quebrar em duas linhas;
- scroll horizontal permitido;
- item selecionado deve permanecer visível;
- target de cada destino >= 48 px de altura;
- não usar chips/pills independentes como padrão estrutural do submenu;
- preferir linguagem de tabs com indicador de seleção.

## 4. Posição canônica

Ordem vertical para telas Root com navegação local:

1. `AppHeader / Root / Tinted`;
2. `LocalSubnav / Tabs`;
3. conteúdo vertical rolável;
4. `NavigationBar / Primary` fixa no rodapé.

Representação:

```text
┌─────────────────────────────┐
│ App Header                  │
├─────────────────────────────┤
│ Medicamentos  Tarefas ...   │  ← LocalSubnav
│              ━━━━━          │  ← indicador ativo
├─────────────────────────────┤
│                             │
│ conteúdo rolável            │
│                             │
├─────────────────────────────┤
│ Home Agenda Diário Saúde    │  ← NavigationBar global
└─────────────────────────────┘
```

O submenu não pertence ao conteúdo da página e não deve reaparecer no final da lista/formulário.

## 5. Comportamento de scroll — `enterAlways` local

A navegação local deve maximizar espaço de conteúdo sem perder acesso rápido à troca de destino.

Contrato de comportamento:

### No topo

- App Header visível;
- LocalSubnav visível;
- conteúdo começa imediatamente abaixo.

### Scroll para baixo / conteúdo sobe

- LocalSubnav recolhe progressivamente e sai do viewport;
- o conteúdo ganha o espaço vertical liberado;
- não esconder a Navigation Bar inferior por causa desse comportamento;
- o App Header segue seu próprio contrato de scroll, quando houver estado scrolled materializado.

### Scroll para cima / conteúdo desce

- LocalSubnav retorna imediatamente, antes de o usuário precisar chegar ao topo;
- comportamento inspirado no `TopAppBarDefaults.enterAlwaysScrollBehavior` do Material 3: chrome superior desaparece com scroll ascendente do conteúdo e reaparece quando a direção é invertida.

### No topo novamente

- LocalSubnav totalmente expandida/visível.

Este comportamento de hide-on-down / reveal-on-up é uma **adaptação Rede de Apoio** baseada no padrão M3 `enterAlways`; o Material 3 não define `PrimaryTabRow` com esse scroll behavior como um componente único pronto. Não registrar essa adaptação como se fosse uma regra textual oficial de Tabs do Google.

## 6. Motion

A transição deve ser curta, funcional e sem efeito decorativo.

Regras:

- movimento vertical simples;
- preferir snap/settle suave;
- sem spring exagerado;
- sem fade dramático;
- sem blur/glass;
- sem deslocar horizontalmente as tabs durante o hide/reveal;
- ao retornar, manter o destino selecionado e a posição horizontal do tab strip.

O objetivo é liberar viewport, não chamar atenção para a animação.

## 7. Visual grammar

A LocalSubnav pertence à estrutura, não ao conteúdo operacional.

Surface preferida:

- `Color/Surface` ou `Color/Surface Container Low`, conforme contraste com o header;
- divider inferior discreto opcional;
- sem card externo;
- sem sombra pesada.

Itens inativos:

- texto: `Color/On Surface Variant`;
- fundo estrutural transparente/neutro.

Item ativo:

- texto/indicador usa a família semântica da seção;
- Saúde → `Feature/Health/Foreground` / `Feature/Health/Accent` ou papel equivalente;
- Agenda → `Feature/Agenda/*` quando existir navegação local real de destinos da Agenda;
- não usar `Status/*` para seleção de navegação.

Indicador:

- preferir indicador M3 de tab na borda inferior;
- active state não pode depender apenas de cor de texto;
- evitar pill preenchida por item como padrão global do submenu.

## 8. Relação com shadcn / Obra

O M3 define papel, hierarquia e comportamento. shadcn/Obra continuam sendo fonte de primitives locais.

Se não existir primitive de Tabs adequada no kit local:

1. procurar primeiro shadcn/Obra/local library;
2. compor `LocalSubnav / Tabs` reutilizável;
3. manter Auto Layout;
4. manter targets >=48 px;
5. não criar uma implementação diferente por tela.

Não importar SDK ou componente Android/Google para o produto.

## 9. Distinção obrigatória: submenu vs controle de visão

Nem todo controle horizontal é LocalSubnav.

É LocalSubnav quando:

- troca entre destinos irmãos da mesma seção;
- muda a tela/rota ou o conteúdo principal equivalente a destino;
- precisa permanecer disponível como orientação local.

Não é LocalSubnav quando:

- alterna somente modo de visualização da mesma tela (`Dia / Semana`);
- é filtro;
- é segmented control de estado;
- é chip de categoria;
- é ordenação.

Exemplo:

- Saúde `Medicamentos / Tarefas / Consultas / Compromissos` → LocalSubnav;
- T04 `Dia / Semana` → view-mode control, não LocalSubnav.

Isso evita aplicar a regra indiscriminadamente.

## 10. Acessibilidade

- todos os destinos >=48 px de target vertical;
- label selecionada precisa ter estado não dependente só de cor;
- ordem de foco segue ordem visual;
- scroll horizontal não pode impedir acesso ao último item;
- o retorno da LocalSubnav no scroll reverso não deve roubar foco;
- preservar destino ativo ao esconder/reexibir;
- respeitar preferências de redução de movimento na implementação;
- não usar hide/reveal de forma que torne a navegação inacessível por teclado/leitor de tela.

## 11. Aplicação imediata — Saúde

Esta regra substitui o padrão experimental dos frames T09/T11 em que o submenu de Saúde aparecia no final do conteúdo.

A partir desta decisão:

- T09: `Tarefas` ativo imediatamente abaixo do header;
- T11: `Compromissos` ativo imediatamente abaixo do header;
- futuros T08/T10 equivalentes em Saúde devem reutilizar o mesmo componente/posição quando a taxonomia canônica confirmar esses destinos;
- todos os estados de uma mesma T## preservam a mesma posição de LocalSubnav;
- `STATE = PAGE BASE + DELTA MÍNIMO`: Empty/Loading/Form/Error/Success não reposicionam o submenu.

## 12. Shell atualizado

Quando houver navegação local:

`AppShell / Root + LocalSubnav`

é semanticamente:

`AppHeader / Root → LocalSubnav / Tabs → Scroll Content → NavigationBar / Primary`

Sem LocalSubnav:

`AppHeader / Root → Scroll Content → NavigationBar / Primary`

A Navigation Bar inferior não se move para acomodar o submenu.

## 13. Regra para agentes

> **Se uma tela tiver destinos irmãos dentro da seção primária atual, materialize uma LocalSubnav em linguagem Material 3 Tabs imediatamente abaixo do header. Use fixed tabs apenas se os labels couberem; caso contrário use scrollable tabs. A LocalSubnav recolhe ao scroll para baixo e retorna ao scroll para cima seguindo uma adaptação `enterAlways`; não coloque esse submenu junto à Navigation Bar inferior e não confunda tabs de destino com filtros ou segmented controls.**
