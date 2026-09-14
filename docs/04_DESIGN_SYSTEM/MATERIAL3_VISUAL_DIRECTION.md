# Material 3 Visual Direction — Rede de Apoio

Status: **CANÔNICO PARA UX E DESIGN VISUAL**  
Data: **2026-09-13**

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

### 5.2 Problema visual identificado

A correção técnica do PR #91 vinculou o `Active indicator` da Navigation Bar diretamente a `Color/Secondary`.

Isso é semanticamente mais forte do que o papel de **container tonal** recomendado pelo modelo de cores do Material 3 e tornou a barra visualmente mais pesada do que a versão anterior.

Material 3 diferencia cores de acento (`primary`, `secondary`, `tertiary`) de seus papéis de container (`primaryContainer`, `secondaryContainer`, `tertiaryContainer`) e respectivos papéis `on*Container`.

Portanto:

- `Color/Secondary` **não deve ser usado automaticamente como fundo de um indicador/container ativo**;
- o estado selecionado da Navigation Bar deve usar um papel tonal equivalente a `secondaryContainer`/`onSecondaryContainer` ou papel local semanticamente equivalente;
- o resultado visual deve preservar contraste e indicação de seleção sem excesso de saturação.

A aparência suave anterior do indicador é uma referência visual melhor para a próxima calibração do que o container azul forte atual.

### 5.3 Calibração materializada — PR #91

Em `Design Foundation`, a calibração ficou pronta para revisão humana, sem migrar T##:

- o indicador ativo da Navigation Bar usa `Color/Secondary Container` (`VariableID:5673:562`), alias de `color/secondary-container` (`VariableID:5673:557`, `#EBE8FA`);
- ícone e label ativos usam `Color/On Secondary Container` (`VariableID:5673:563`), alias de `Color/Primary` (`#00567C`);
- o Settings Sheet usa `Color/Surface Container Low` (`VariableID:5673:565`, `#F8F5FA`), mantendo rows em Surface para uma camada leve;
- o scrim usa `Color/Scrim` (`VariableID:5673:566`) com opacidade de paint de 32%, preservando o shell reconhecível e inativo;
- `M3 Visual Calibration Review` (`5674:559`) mantém snapshots A congelados e referências B calibradas. É uma área temporária de revisão, não componente canônico.

Os pares de conteúdo relevantes foram verificados: `On Secondary Container` sobre `Secondary Container` tem contraste de 6.66:1; `On Surface` e `On Surface Variant` sobre `Surface Container Low` têm, respectivamente, 15.07:1 e 6.60:1.

### 5.4 Header

A hierarquia TARGET está correta:

`Título da página → contexto da Pessoa Idosa → ação global relevante`.

O avatar é contextual e não substitui o título. A ação de Configurações deve permanecer deliberada, com target >=48 × 48 px e padding seguro.

O `AppHeader / Back` deve manter voltar + título; ações secundárias são opcionais e somente aparecem quando autorizadas pelo fluxo.

### 5.5 Settings / Management Sheet

O padrão de Sheet/Drawer secundário é coerente para reunir T12–T17, mas sua superfície não precisa ser branco absoluto por regra.

Quando a hierarquia visual se beneficiar, usar um papel tonal equivalente a `surfaceContainer`/`surfaceContainerLow` da identidade Rede de Apoio. O objetivo é comunicar camada/modalidade e profundidade sem depender de sombra pesada.

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

### Calibração visual

O antigo indicador claro da Foundation, aproximadamente `#EBE8FA`, é **referência/candidato de calibração**, não hardcode autorizado.

Se aprovado visualmente, ele deve virar valor de um papel semântico de container tonal, nunca permanecer solto no componente.

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

- título é a informação primária;
- contexto da Pessoa Idosa é secundário;
- avatar é apoio contextual;
- Configurações é ação global explícita;
- evitar excesso de ícones/ações concorrentes.

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
- componentes visualmente “Material baseline” que apaguem a identidade do produto.

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

## 13. Gate atual do PR #91

O PR #91 **não está pronto para merge** enquanto a Foundation não passar por calibração visual M3.

Pendências de design:

- trocar o uso de `Color/Secondary` como container ativo por papel tonal semanticamente correto;
- revisar conteúdo ativo (`on*Container`/papel local equivalente);
- revisar surface do Settings Sheet para hierarquia tonal coerente;
- preservar todas as melhorias estruturais do Prompt 04B;
- corrigir os bloqueios técnicos já identificados no `AppHeader / Back` e na ação secundária;
- atualizar o body do PR para refletir a reutilização real da Obra Sheet.

Nenhuma T## deve ser migrada antes dessa calibração e revisão humana.
