# Estratégia de Cor e Surfaces — Rede de Apoio

Status: **CANÔNICO PARA MIGRAÇÕES VISUAIS APÓS O PILOTO T03**  
Data: **2026-09-14**

Este documento transforma o feedback visual do piloto T03 em uma gramática de cor replicável para T01–T17. Ele complementa `MATERIAL3_VISUAL_DIRECTION.md` e `DESIGN_TOKENS.md`.

A intenção não é “colocar mais cor”. A intenção é usar cor e surface para comunicar **hierarquia, estado, prioridade e agrupamento**, preservando Material Design 3, acessibilidade e a identidade calma/acolhedora da Rede de Apoio.

---

## 1. Diagnóstico do piloto T03

A T03 migrada está estruturalmente correta, porém visualmente subexpressiva.

O problema não é falta de saturação. O problema é que a maior parte da tela ocupa papéis quase neutros e muito próximos entre si:

- page background muito claro;
- header em `Surface Container Low`, quase indistinguível do page background;
- cards majoritariamente em `Surface` branco;
- bordas repetidas como principal mecanismo de separação;
- Navigation Bar ativa já usa `Secondary Container`, mas em área pequena;
- cores de estado aparecem apenas em badges/ícones isolados;
- seções funcionalmente diferentes repetem a mesma fórmula visual: título → card branco com borda → texto preto/cinza.

Resultado percebido: a tela é correta, legível e limpa, mas **monocromática, plana e simples demais para servir como linguagem final do produto**.

### O que deve ser preservado

- contraste alto de `On Surface` e `On Surface Variant`;
- Navigation Bar selecionada com `Secondary Container` + `On Secondary Container`;
- estados semânticos reais (`success`, `warning`, `danger`, etc.) somente quando o estado funcional existir;
- ausência de backgrounds saturados gratuitos;
- baixa dependência de sombra;
- uso de tokens/papéis semânticos em vez de hex solto.

---

## 2. Princípio central

A regra canônica passa a ser:

`NEUTRO PARA ESTRUTURA → CONTAINER TONAL PARA ÊNFASE → STATUS PARA ESTADO REAL`

Cor deve responder a uma pergunta semântica.

Antes de aplicar cor, classificar a região em uma destas categorias:

1. **estrutura/shell** — organiza a página;
2. **ênfase operacional primária** — informação mais importante/agora;
3. **ênfase secundária/planejada** — informação relevante, mas não dominante;
4. **ênfase contextual/terciária** — histórico, apoio, contexto complementar;
5. **estado funcional** — sucesso, alerta, erro, pendência, ativo etc.;
6. **seleção/navegação** — destino/elemento selecionado.

Se nenhuma categoria justificar cor, usar surface neutra.

---

## 3. Gramática replicável de cor

### 3.1 Camada 0 — Page Background

Função: base contínua da tela.

Papel preferencial:

- `Color/Background` ou papel local equivalente.

Regra:

- não usar accent color como fundo de página inteira;
- o background deve permitir que containers tonais sejam percebidos sem competir com eles.

### 3.2 Camada 1 — Shell / Header / Navigation

Função: estruturar a navegação global e o contexto.

Header Root:

- normal: `Surface Container Low` ou `Surface Container`;
- escolher o nível que realmente produza separação visual em relação ao page background;
- `On Surface` para título;
- `On Surface Variant` para contexto;
- ação global em `On Surface` salvo acento semanticamente justificado.

Navigation Bar:

- base em surface neutra;
- item ativo: `Secondary Container` + `On Secondary Container` enquanto esta combinação continuar aprovada.

Regra importante:

- se `Surface Container Low` for visualmente indistinguível do background, **não insistir nele por purismo**; usar o próximo papel de surface adequado (`Surface Container`) antes de recorrer a accent container.

### 3.3 Camada 2 — Ênfase operacional primária

Função: destacar a informação que exige reconhecimento mais rápido na tarefa atual.

Papel TARGET:

- `Primary Container` + `On Primary Container`.

Exemplos possíveis:

- situação “agora”;
- item operacional corrente;
- resumo prioritário da tela;
- CTA/container de maior relevância quando a função exigir.

Não significa que toda primeira seção da página recebe Primary Container. O uso depende da semântica, não da posição.

### 3.4 Camada 3 — Ênfase secundária/planejada

Função: destacar uma informação relevante de segundo nível, planejamento ou seleção tonal.

Papel preferencial:

- `Secondary Container` + `On Secondary Container`.

Usos possíveis:

- item planejado;
- seleção;
- agrupamento secundário importante;
- estado de navegação já aprovado.

Evitar reutilizar o mesmo Secondary Container em tantas regiões que o indicador de navegação perca distinção.

### 3.5 Camada 4 — Ênfase contextual/terciária

Função: equilibrar primary/secondary e dar identidade a conteúdos contextuais sem competir com a ação principal.

Papel TARGET:

- `Tertiary Container` + `On Tertiary Container`.

Usos possíveis:

- conteúdo recente/histórico;
- apoio/contexto;
- categoria complementar;
- ícone/container informativo que precise de distinção visual.

`Tertiary` não é “cor livre”. É um papel de acento contrastante controlado.

### 3.6 Camada 5 — Estado funcional

Função: comunicar significado real de negócio ou feedback.

Usar apenas os papéis semânticos correspondentes:

- success;
- warning;
- danger/error;
- active;
- disabled;
- demais estados formalizados.

Regra:

**status color nunca deve ser usada apenas para decorar uma seção.**

---

## 4. Orçamento de cor por viewport

Para evitar tanto monocromia quanto “carnaval visual”, cada viewport deve respeitar um orçamento de expressão.

Padrão recomendado para telas mobile Root:

- 1 família neutra de surfaces;
- 1 família de acento dominante (`Primary Container`);
- até 1 família complementar (`Secondary Container` OU `Tertiary Container`) em regiões relevantes;
- status colors apenas onde o estado real exigir;
- Navigation Bar pode manter seu papel tonal aprovado mesmo quando outro container tonal existir no conteúdo.

A presença de Primary + Secondary + Tertiary simultaneamente é permitida somente quando cada papel tiver função clara e o conjunto continuar visualmente calmo.

Não buscar uma quantidade fixa de cores. Buscar **funções claramente diferentes**.

---

## 5. Regra de área, não apenas de presença

Um app pode tecnicamente “ter cores” e ainda parecer monocromático quando os acentos ocupam apenas pequenos badges/ícones.

Por isso, a revisão visual deve avaliar também **área tonal**.

Uma cor de container pode ocupar uma região relevante quando ela comunica prioridade ou agrupamento. O objetivo é criar ritmo visual perceptível sem pintar todos os cards.

Evitar dois extremos:

- **subexpressão**: 90% da tela em branco/off-white e cor apenas em chips minúsculos;
- **sobreexpressão**: cada card com uma família de cor diferente.

---

## 6. Cards e agrupamento

A linguagem futura não deve repetir automaticamente:

`título da seção → card branco com borda → título → meta`

para toda informação.

Antes de usar borda, perguntar se a hierarquia pode ser resolvida por:

- diferença de surface;
- container tonal;
- spacing;
- shape;
- icon container;
- tipografia;
- agrupamento.

### Regra

- cards neutros: `Surface`/`Surface Container` conforme hierarquia;
- cards prioritários: container tonal semântico quando justificado;
- bordas fortes apenas quando a boundary é necessária;
- não adicionar sombra pesada como compensação para falta de hierarchy.

---

## 7. Aplicação planejada na T03

A próxima refação visual da T03 deve usar o piloto para validar esta gramática.

### Header

Problema atual: `Surface Container Low` é correto semanticamente, mas pouco perceptível sobre o background.

Plano:

1. comparar `Surface Container Low` e `Surface Container` no estado normal;
2. preferir `Surface Container` se produzir melhor separação sem parecer pesado;
3. não usar `Primary`/`Secondary` sólidos no header;
4. não criar estado scrolled inexistente.

### Agora / Plantonista atual

Função: contexto operacional corrente.

Plano:

- testar como principal região de ênfase tonal;
- candidato semântico: `Primary Container` + `On Primary Container`;
- manter o significado de “Plantonista atual” como condição temporária, não perfil/role.

### Próximo cuidado

Função: informação planejada de alta relevância, porém abaixo do “agora”.

Plano:

- manter estrutura clara;
- usar `Secondary Container` somente se não competir com o indicador Home da Navigation Bar;
- alternativa: `Surface Container` com badge/status tonal, se o uso de Secondary Container duplicar ênfase demais.

### Na rotina

Função: conjunto operacional recorrente.

Plano:

- manter majoritariamente neutro;
- diferenciar agrupamento por surface/spacing em vez de colorir cada item;
- status `Pendente` usa papel próprio somente se semântica aprovada justificar.

### Recentemente

Função: histórico/contexto complementar.

Plano:

- candidato natural para expressão `Tertiary Container` em icon container ou região limitada;
- não transformar histórico em foco principal.

### Loading

Loading deve manter exatamente a mesma arquitetura de surfaces e containers do Default.

`Loading = Default visual hierarchy + skeleton delta`

Skeleton não remove a hierarquia cromática da página.

---

## 8. Papéis que precisam de calibração antes de propagação

O sistema já possui `Secondary Container`, `Surface Container` e `Surface Container Low` materializados.

Para executar a estratégia completa, devem ser calibrados e registrados antes de uso em escala:

- `Color/Primary Container`;
- `Color/On Primary Container`;
- `Color/Tertiary Container`;
- `Color/On Tertiary Container`.

### Regra de calibração

1. derivar da identidade Rede de Apoio, não da paleta baseline Google;
2. manter baixa/média cromaticidade adequada a um produto de cuidado;
3. garantir contraste do par `On * Container`;
4. criar comparação visual no Figma;
5. aprovar humanamente no piloto T03;
6. só então registrar os valores/Variable IDs como canônicos e propagar.

Não hardcodar candidatos diretamente nas telas finais.

---

## 9. Matriz de decisão para próximas telas

Para cada região visual, o agente deve responder nesta ordem:

| Pergunta | Se sim | Papel esperado |
|---|---|---|
| É estado funcional real? | aplicar status semântico | success/warning/danger/etc. |
| É seleção/navegação? | aplicar selection role | Secondary Container ou papel aprovado |
| É a informação operacional dominante? | criar ênfase principal | Primary Container |
| É informação importante de segundo nível? | criar ênfase secundária | Secondary Container ou Surface Container |
| É contexto complementar/histórico? | criar acento contextual | Tertiary Container limitado |
| É apenas estrutura/agrupamento? | permanecer neutro | Surface family |
| Nenhuma das anteriores? | não adicionar cor | Surface/Background |

Esta matriz deve evitar decisões do tipo “essa seção ficou sem graça, então pinte de verde”.

---

## 10. Critérios de revisão visual

Uma tela não passa apenas porque todos os fills estão tokenizados.

Antes da aprovação, verificar:

1. existe hierarquia perceptível entre page, shell e conteúdo?
2. a cor explica prioridade/estado ou é decoração?
3. a distribuição cromática é suficiente para evitar monocromia?
4. existe um foco visual dominante?
5. secondary/tertiary competem com primary?
6. status colors mantêm significado exclusivo?
7. cards dependem excessivamente de bordas?
8. o resultado ainda parece calmo, acolhedor e profissional?
9. Default e estados irmãos mantêm a mesma gramática?
10. a tela parece um produto acabado, e não apenas primitives organizadas?

Se a resposta ao item 10 for “não”, a migração visual ainda não está aprovada.

---

## 11. Regra de propagação

A T03 continua sendo piloto.

A gramática acima só vira padrão de implementação para os próximos micro-lotes depois de:

`calibração dos containers faltantes → refação T03 → review visual humano → aprovação → propagação`

Não propagar uma paleta experimental para T01–T17 antes desse gate.

Após T03 aprovada, próximos agentes devem reutilizar a **gramática semântica**, não copiar literalmente quais seções receberam azul/roxo/verde na T03.

O que se replica é a lógica:

`estrutura neutra + ênfase tonal semanticamente justificada + status real`

---

## 12. Fontes Material 3

Referências oficiais para esta estratégia:

- Material 3 theming: https://developer.android.com/develop/ui/compose/designsystems/material3
- `ColorScheme`: https://developer.android.com/reference/kotlin/androidx/compose/material3/ColorScheme
- Top App Bar colors: https://developer.android.com/reference/kotlin/androidx/compose/material3/TopAppBarColors
- Material Design 3: https://m3.material.io/

Princípios utilizados:

- primary, secondary e tertiary possuem funções distintas de expressão e ênfase;
- `primaryContainer`, `secondaryContainer` e `tertiaryContainer` são papéis tonais de container;
- `surfaceContainer*` estabelece níveis de ênfase entre surfaces;
- `on*` deve permanecer emparelhado ao container correspondente;
- customização de componentes é permitida, desde que preserve papéis e contraste.

---

## 13. Princípio resumido para agentes

> **Não pinte componentes; atribua papéis. Não deixe a tela monocromática por medo de cor e não use cor para compensar falta de hierarquia. Estruture com surfaces neutras, destaque o que importa com containers tonais e reserve cores de status para estados reais.**

---

## 14. Pilot calibration candidates — T03

Os valores abaixo existem somente no Figma, na collection `Rede de Apoio /
Semantic`, e foram usados para a comparação não canônica
`T03 — Color & Surface Calibration Review` (`5700:1688`). Eles não são
tokens canônicos finais e não devem ser propagados antes da revisão humana.

| Papel | Figma Variable ID | Valor | Contraste do par | Status |
|---|---|---|---:|---|
| Primary Container — Candidate A | `VariableID:5700:269` | `#D0E9F3` | 9.18:1 com On Primary A | PENDING HUMAN REVIEW |
| On Primary Container — Candidate A | `VariableID:5700:270` | `#003D59` | 9.18:1 sobre Primary A | PENDING HUMAN REVIEW |
| Primary Container — Candidate B | `VariableID:5700:271` | `#C4E0EE` | 8.78:1 com On Primary B | PENDING HUMAN REVIEW |
| On Primary Container — Candidate B | `VariableID:5700:272` | `#003A55` | 8.78:1 sobre Primary B | PENDING HUMAN REVIEW |
| Tertiary Container — Candidate A | `VariableID:5700:273` | `#EDE4F2` | 8.77:1 com On Tertiary A | PENDING HUMAN REVIEW |
| On Tertiary Container — Candidate A | `VariableID:5700:274` | `#4B3554` | 8.77:1 sobre Tertiary A | PENDING HUMAN REVIEW |
| Tertiary Container — Candidate B | `VariableID:5700:275` | `#E8E2EE` | 8.92:1 com On Tertiary B | PENDING HUMAN REVIEW |
| On Tertiary Container — Candidate B | `VariableID:5700:276` | `#47334F` | 8.92:1 sobre Tertiary B | PENDING HUMAN REVIEW |

O Candidate A é a proposta aplicada localmente no piloto T03: Primary para o
contexto operacional `Agora` e Tertiary limitado ao conteúdo contextual
`Recentemente`. Essa aplicação continua `PENDING HUMAN REVIEW`.
