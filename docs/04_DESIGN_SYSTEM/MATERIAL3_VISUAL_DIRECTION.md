# Material 3 Visual Direction — Rede de Apoio

Status: **CANÔNICO PARA UX E DESIGN VISUAL**  
Data: **2026-09-14**

Este documento formaliza a leitura de Material Design 3 que deve governar o Rede de Apoio daqui em diante.

## 1. Autoridade de design

Dentro do domínio de UX e design visual, **Material Design 3 é a referência de maior prioridade do projeto**.

A ordem de decisão é:

1. requisitos funcionais, regras de negócio e permissões aprovadas no GitHub;
2. princípios oficiais do Material Design 3 para UX, hierarquia, navegação, ergonomia, estados, cor semântica, acessibilidade e adaptação;
3. identidade Rede de Apoio, expressa por tokens próprios, Geist, iconografia local e linguagem de cuidado;
4. Obra/shadcn/componentes locais como meios de implementação no Figma;
5. aparência histórica de frames CURRENT/LEGADO somente como referência de conteúdo e continuidade.

Material 3 não pode criar requisito funcional. Porém, quando duas soluções visuais atendem ao mesmo requisito, a solução mais coerente com Material 3 deve prevalecer, salvo exceção documentada.

## 2. Regra central

`Requisito aprovado → padrão/role M3 → token semântico Rede de Apoio → primitive Obra/shadcn/local → tela`

Não inverter essa ordem.

Em especial:

- uma primitive disponível não define a UX por si só;
- um token existente não deve ser usado apenas porque existe se seu **papel semântico** estiver errado;
- tokenização tecnicamente válida não compensa uma decisão visual semanticamente incorreta;
- se o papel M3 correto ainda não existir no design system, registrar a lacuna e criar/mapear o papel correto antes de forçar outro token.

## 3. Material 3 não significa copiar Android

Adotar Material 3 significa seguir seus princípios e papéis, não importar sua aparência baseline.

Não adotar por obrigação:

- SDK Material;
- Jetpack Compose;
- Google Sans/Roboto Flex como identidade do produto;
- paleta baseline Google;
- Dynamic Color automático;
- componentes Google no lugar de Obra/shadcn;
- aparência genérica de Android.

A identidade permanece Rede de Apoio. Material 3 governa a lógica visual e de interação; a marca governa a expressão final.

## 4. Fontes oficiais obrigatórias

Antes de decisões globais de design, consultar fontes oficiais atuais:

- Material Design 3: https://m3.material.io/
- Navigation Bar: https://developer.android.com/develop/ui/compose/components/navigation-bar
- Layouts and navigation patterns: https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns
- Top/App Bars: https://developer.android.com/develop/ui/compose/components/app-bars
- Material 3 theming: https://developer.android.com/develop/ui/compose/designsystems/material3
- ColorScheme / color roles: https://developer.android.com/reference/kotlin/androidx/compose/material3/ColorScheme
- Accessibility / touch targets: https://developer.android.com/guide/topics/ui/accessibility/apps

M3 atual também evolui na direção **Expressive**, enfatizando produtos mais utilizáveis e envolventes por meio de cor, forma, tipografia, movimento e adaptação. No Rede de Apoio, essa expressividade deve ser aplicada com contenção: acolhedora, confiável e calma, nunca chamativa de forma gratuita.

## 5. Review da Foundation Material 3 atual

### 5.1 Estrutura correta e preservada

A revisão atual acertou estruturalmente:

- `AppHeader / Root` com título primário, contexto da Pessoa Idosa e ação de Configurações;
- `AppHeader / Back` para telas filhas;
- Navigation Bar com exatamente quatro destinos primários: `Home · Agenda · Diário · Saúde`;
- remoção de `Mais` da navegação primária;
- T12–T17 movidos para uma superfície secundária de Configurações;
- item ativo com indicador além de simples troca de cor;
- targets de interação >= 48 × 48 px;
- reutilização de Avatar e Sheet Obra quando compatíveis;
- propriedades/componentização em vez de duplicação local.

Essas decisões permanecem TARGET.

### 5.2 Calibração de navegação

Material 3 diferencia cores de acento (`primary`, `secondary`, `tertiary`) de seus papéis de container (`primaryContainer`, `secondaryContainer`, `tertiaryContainer`) e respectivos papéis `on*Container`.

Portanto:

- `Color/Secondary` **não deve ser usado automaticamente como fundo de um indicador/container ativo**;
- o estado selecionado da Navigation Bar deve usar um papel tonal equivalente a `secondaryContainer`/`onSecondaryContainer` ou papel local semanticamente equivalente;
- o resultado visual deve preservar contraste e indicação de seleção sem excesso de saturação.

A calibração aprovada usa `Color/Secondary Container` (`#EBE8FA`) no indicador e `Color/On Secondary Container` no conteúdo ativo.

### 5.3 Calibração materializada — PR #91

Em `Design Foundation`, a calibração aprovada ficou materializada assim:

- o indicador ativo da Navigation Bar usa `Color/Secondary Container` (`VariableID:5673:562`), alias de `color/secondary-container` (`VariableID:5673:557`, `#EBE8FA`);
- ícone e label ativos usam `Color/On Secondary Container` (`VariableID:5673:563`), alias de `Color/Primary` (`#00567C`);
- o Settings Sheet usa `Color/Surface Container Low` (`VariableID:5673:565`, `#F8F5FA`); Destination Rows padrão são transparentes e preservam a continuidade da surface, sem formar uma pilha de cards;
- o scrim usa `Color/Scrim` (`VariableID:5673:566`) com opacidade de paint de 32%, preservando o shell reconhecível e inativo;
- `M3 Visual Calibration Review` (`5674:559`) mantém snapshots A congelados e referências B calibradas. É uma área temporária de revisão, não componente canônico.

Os pares de conteúdo relevantes foram verificados: `On Secondary Container` sobre `Secondary Container` tem contraste de 6.66:1; `On Surface` e `On Surface Variant` sobre `Surface Container Low` têm, respectivamente, 15.07:1 e 6.60:1.

Um container tonal persistente em Destination Row é reservado a uma seleção semanticamente real. A Foundation não inventa esse estado para destinos secundários sem destino atual definido.

### 5.4 Header — hierarquia sem redundância

A hierarquia TARGET é:

`Título específico da página/tarefa → contexto da Pessoa Idosa → ação global relevante`.

**Regra canônica de não redundância:** o destino selecionado da Navigation Bar já comunica a localização primária. O `AppHeader / Root` não deve repetir mecanicamente o mesmo rótulo quando isso não acrescenta informação.

Assim:

- Navigation Bar comunica **onde** o usuário está no mapa primário (`Home`, `Agenda`, `Diário`, `Saúde`);
- App Header comunica **qual página/visão/tarefa** está aberta naquele destino;
- conteúdo não deve repetir imediatamente o mesmo título do App Header como um segundo H1;
- deve existir uma única âncora de título de página por viewport, salvo necessidade semântica/documentada.

Exemplo canônico do piloto T03:

- Navigation Bar ativa: `Home`;
- App Header title: `Visão Geral`;
- App Header context: nome da Pessoa Idosa;
- remover do corpo o H1 redundante `Visão Geral do Cuidado`; o corpo começa pela introdução/primeira seção (`Agora`) conforme a composição final.

O avatar é contextual e não substitui o título. A ação de Configurações deve permanecer deliberada, com target >=48 × 48 px e padding seguro.

O `AppHeader / Back` deve manter voltar + título; ações secundárias são opcionais e somente aparecem quando autorizadas pelo fluxo.

### 5.5 Cor e profundidade do App Header

Material 3 não exige cabeçalho branco/chapado e também não recomenda cor forte gratuita. Top App Bars possuem papéis separados para `containerColor` e `scrolledContainerColor`, permitindo que a superfície responda ao estado de rolagem e ganhe separação tonal quando conteúdo passa por trás dela.

No Rede de Apoio:

- o header normal deve usar um **papel semântico de surface tonal**, preferencialmente `Surface` ou `Surface Container Low`, conforme contraste e continuidade da página;
- quando houver estado de rolagem materializado, o estado scrolled deve evoluir para um papel de maior separação tonal, preferencialmente `Surface Container` ou equivalente local;
- título usa `On Surface`;
- contexto/subtítulo usa `On Surface Variant`;
- ícones de ação usam `On Surface` ou papel de acento somente quando houver razão semântica;
- não usar `Primary`/`Secondary` saturados como fundo do header apenas para “ter cor”;
- uma tonalidade brand-tinted é permitida se for mapeada a um papel semântico de surface/container e mantiver contraste adequado;
- a expressividade deve vir de **hierarquia tonal, estados, shape, tipografia e acentos controlados**, não de decoração arbitrária.

Para telas Root, a meta visual é evitar um bloco neutro indiferenciado: header, conteúdo e Navigation Bar devem formar uma hierarquia de surfaces reconhecível, suave e coerente com a identidade de cuidado.

## 6. Política de papéis de cor M3

O design system Rede de Apoio deve evoluir de uma lista curta de cores para **papéis semânticos compatíveis com a lógica M3**.

Papéis TARGET a mapear/criar quando necessários:

- `Color/On Surface`;
- `Color/On Surface Variant`;
- `Color/Primary Container`;
- `Color/On Primary Container`;
- `Color/Secondary Container`;
- `Color/On Secondary Container`;
- `Color/Surface Container`;
- `Color/Surface Container Low` quando a hierarquia exigir;
- `Color/Scrim`.

Esses nomes representam funções, não obrigação de copiar valores baseline do Google.

### Regra de compatibilidade

Usar sempre pares coerentes:

- `Primary` + `On Primary`;
- `Primary Container` + `On Primary Container`;
- `Secondary Container` + `On Secondary Container`;
- `Surface/Surface Container` + `On Surface/On Surface Variant`.

Não misturar papéis apenas para obter uma cor visualmente próxima.

### Dynamic Color versus cor responsiva do produto

`Dynamic Color` automático do ecossistema Android **não é obrigação** do Rede de Apoio.

Entretanto, a interface deve ser semanticamente responsiva ao estado:

- seleção ativa pode alterar container + conteúdo;
- App Bar pode alterar `containerColor` no estado scrolled;
- feedback/status usa papéis próprios quando definidos;
- tema/brand pode recalibrar valores mantendo os mesmos papéis semânticos.

“Mais cor” não significa mais saturação. O objetivo é usar cor para explicar estrutura, estado e prioridade.

## 7. Navigation Bar — contrato visual

Para mobile compacto:

- 3–5 destinos de importância semelhante são apropriados; o Rede de Apoio usa 4;
- cada item representa um único destino;
- labels permanecem visíveis;
- ícone visual pode ser ~24 px dentro de target >=48 px;
- estado ativo deve combinar forma/container + conteúdo de maior ênfase;
- seleção não depende somente de cor;
- o indicador deve ser tonal e proporcional, evitando um bloco saturado dominante;
- safe area inferior e prevenção de toque acidental são obrigatórias.

TARGET Rede de Apoio:

`Home · Agenda · Diário · Saúde`

`Mais` e `Configurações` não pertencem à Navigation Bar.

## 8. App Bar — contrato visual

### Root

- o rótulo da Navigation Bar identifica o destino primário; não repetir esse rótulo no header sem ganho de informação;
- título do header nomeia a página/visão/tarefa específica;
- contexto da Pessoa Idosa é secundário;
- avatar é apoio contextual;
- Configurações é ação global explícita;
- evitar segundo H1 idêntico no corpo;
- evitar excesso de ícones/ações concorrentes;
- surface do header deve participar da hierarquia tonal da tela e pode responder ao scroll por papéis semânticos distintos.

### Back

- voltar;
- título da tela filha;
- ação secundária somente se necessária e funcionalmente autorizada;
- sem menu overflow vazio ou decorativo.

## 9. Surface, shape e densidade

O produto deve transmitir cuidado e confiança.

Aplicar M3 de forma expressiva, porém contida:

- superfícies tonais suaves para hierarquia;
- formas arredondadas com função, não decoração excessiva;
- contraste de shape/container para seleção e agrupamento;
- menos bordas quando a diferença de surface já comunica hierarquia;
- densidade confortável em mobile;
- movimento somente quando explica transição, causalidade ou mudança de estado.

Evitar:

- saturação forte usada como substituto de hierarquia;
- cards para todo conteúdo;
- sombras pesadas;
- excesso de chips/pills;
- componentes visualmente “Material baseline” que apaguem a identidade do produto;
- telas inteiramente brancas/cinza sem hierarquia tonal quando papéis semânticos existentes podem comunicar melhor estrutura e estado.

## 10. Regra para Obra/shadcn

Obra/shadcn continuam sendo a base de primitives.

Porém:

- M3 decide **qual padrão, papel e hierarquia** precisamos;
- Obra/shadcn decide **como materializar** esse padrão com os componentes disponíveis;
- se uma primitive não expressar o comportamento/hierarquia M3 corretamente, compor/adaptar externamente sem detach quando possível;
- não sacrificar uma decisão M3 correta para usar uma primitive “do jeito que veio”.

## 11. Gate obrigatório de review M3

Toda alteração visual relevante precisa responder, antes de merge:

1. qual princípio/padrão oficial M3 está sendo aplicado?
2. qual papel semântico M3/local corresponde a cada cor/surface crítica?
3. a identidade Rede de Apoio foi preservada?
4. Obra/shadcn foi usado como implementação, sem ditar a UX?
5. o estado ativo/feedback depende de mais de um sinal quando necessário?
6. targets, safe areas e prevenção de acionamento acidental foram auditados?
7. a comparação visual com a versão anterior melhorou ou piorou legibilidade, hierarquia e sensação de cuidado?
8. houve aprovação visual humana quando a mudança altera linguagem global?
9. header e conteúdo evitam redundância com o destino selecionado da Navigation Bar?
10. surfaces e cor possuem papel semântico ou foram usadas apenas como decoração?

Um componente pode estar tecnicamente tokenizado e ainda **reprovar** no review M3/visual.

## 12. Exceções

Desviar de um padrão Material 3 é permitido somente quando:

- requisito funcional exigir;
- acessibilidade exigir;
- contexto específico do domínio justificar;
- primitive/limitação técnica impedir a implementação após tentativa comprovada.

A exceção deve registrar:

- padrão M3 considerado;
- motivo do desvio;
- impacto;
- alternativa escolhida.

Nunca registrar “preferência estética” isolada como justificativa suficiente.

## 13. Estado atual

O PR #91 foi mergeado e a Foundation Material 3 foi aprovada.

A T03 é o piloto ativo de validação do `AppShell / Root`. Durante a revisão humana do piloto foram acrescentadas duas regras globais antes de escalar para outras telas autenticadas:

1. reduzir redundância entre Navigation Bar, App Header e primeiro H1 do conteúdo;
2. usar hierarquia tonal/estado de surface no App Header, em vez de manter a experiência inteira neutra e chapada ou adicionar cor saturada sem função.

Essas regras devem ser aplicadas primeiro à T03 e, após aprovação humana, extraídas para os próximos micro-lotes.