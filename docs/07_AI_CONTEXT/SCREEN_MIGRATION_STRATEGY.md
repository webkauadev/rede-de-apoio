# Estratégia Operacional de Migração de Telas

Este documento define a metodologia canônica para agentes de IA durante a migração visual das telas T01–T17.

A meta é maximizar qualidade, consistência e rastreabilidade com o menor custo de contexto, chamadas e retrabalho possível. Economia de créditos **nunca** autoriza perda de qualidade, inferência funcional ou atalhos que prejudiquem o design.

## Regra central

`PILOTO → REVISÃO HUMANA → EXTRAÇÃO DO PADRÃO → MICRO-LOTE → REVISÃO`

Não migrar todas as telas de uma vez e não tratar cada tela como um projeto isolado que exige redescobrir o repositório inteiro.

## 1. Pilot-first

A primeira tela de uma nova arquitetura visual deve ser migrada isoladamente como prova real do padrão.

Para a Foundation Material 3 atual:

- **T03 é o primeiro piloto autenticado** do novo `AppShell / Root`;
- T03 deve ser revisada antes de ampliar a migração para outras telas autenticadas;
- T01/T02 formam um piloto separado de `AuthShell` e não devem ser misturadas à validação do AppShell autenticado.

Uma decisão visual global descoberta no piloto deve ser corrigida na Foundation/contrato apropriado antes de ser propagada.

## 2. Depois do piloto, usar micro-lotes coerentes

Após o piloto ser aprovado, telas com estrutura, fluxo ou shell semelhantes podem ser tratadas em micro-lotes pequenos.

Objetivo:

- reaproveitar contexto válido;
- evitar releitura completa do projeto;
- reduzir chamadas repetidas ao Figma/GitHub;
- preservar revisão humana antes que um erro se espalhe.

Não existe obrigação de um PR por tela. O tamanho do lote deve ser definido pela similaridade real e pelo risco de propagação.

Se surgir decisão arquitetural nova, conflito entre requisitos ou mudança global de linguagem visual, reduzir novamente o lote para uma tela até estabilizar o padrão.

## 3. Contexto mínimo suficiente

Antes de cada migração, o agente deve ler **somente o conjunto canônico necessário para executar a tela corretamente**.

Prioridade:

1. `AGENTS.md`;
2. `CURRENT_PROJECT_STATE.md`;
3. `PROJECT_DECISIONS.md`;
4. `MATERIAL3_VISUAL_DIRECTION.md`;
5. este documento;
6. registries e requisitos diretamente relacionados à T## atual;
7. component map/tokens necessários;
8. nodes Figma da própria tela, seus states e Foundation aplicável.

Não reauditar o Figma inteiro, todas as T01–T17 ou todos os requisitos em cada execução sem motivo concreto.

Não repetir pesquisa web sobre Material 3 quando a regra necessária já estiver canonizada no repositório. Consultar fonte oficial externa apenas quando houver decisão M3 ainda não resolvida pelos documentos atuais.

GitHub é a memória canônica entre sessões. Uma sessão de agente não precisa carregar histórico gigantesco quando o conhecimento necessário já está versionado.

## 4. Inspeção Figma enxuta

Para uma T##:

`metadata/estrutura → states relevantes → screenshot do baseline → edição → screenshots finais materially different`

Evitar:

- screenshots redundantes de todos os nodes antes de entender a estrutura;
- chamadas pequenas repetidas que podem ser agrupadas com segurança;
- reinspecionar componentes já registrados sem sinal de inconsistência;
- varrer páginas de outros responsáveis sem necessidade.

A economia de chamadas não autoriza edição cega. Toda alteração visual relevante continua exigindo screenshot final e inspeção visual.

## 5. PAGE BASE + DELTA MÍNIMO

A regra da Decisão 001 continua obrigatória:

`STATE = PAGE BASE + DELTA MÍNIMO`

Migrar primeiro a estrutura canônica da página e derivar os estados irmãos pela menor mudança necessária.

Não redesenhar `default`, `loading`, `empty`, `error`, `success` etc. como telas independentes quando compartilham o mesmo shell e estrutura.

Isso é simultaneamente uma regra de qualidade e de eficiência.

## 6. Migração visual não autoriza melhoria funcional

Durante uma migração Material 3, o agente deve preservar:

- RF/RNF/US aprovados;
- regras de negócio;
- permissões;
- conteúdo funcional;
- estados canônicos;
- destinos e relações já aprovados.

É proibido usar a migração visual para:

- inventar funcionalidade;
- adicionar CTA sem requisito;
- alterar permissão;
- resolver P01/P03/P04/P05/P06 por desenho;
- aprovar RF30/US-036 implicitamente;
- reinterpretar FI-001–FI-008 como intenção funcional;
- "melhorar" produto além do escopo canônico.

Se a experiência atual revelar um problema funcional real, registrar a lacuna/proposta separadamente e continuar apenas com a parte visual que não depende dessa decisão.

## 7. M3-first continua acima da otimização

Eficiência nunca supera a direção de design.

Pipeline obrigatório:

`Requisito aprovado → padrão/role M3 → token semântico Rede de Apoio → Obra/shadcn/local primitive → tela`

Não escolher um atalho visual só porque consome menos chamadas ou tokens.

Não trocar um papel semântico correto por primitive/token incorreto para acelerar.

## 8. Regra de não redundância em telas Root

Em telas com `AppShell / Root`, Navigation Bar e App Header possuem funções distintas e não devem repetir informação sem ganho semântico.

Contrato obrigatório:

- Navigation Bar responde **onde** o usuário está entre os destinos primários;
- App Header responde **qual página/visão/tarefa** está aberta naquele destino;
- o primeiro bloco de conteúdo não repete novamente o mesmo título do App Header como H1;
- somente uma âncora principal de título deve dominar o topo do viewport, salvo exceção documentada.

Exemplo aprovado para o piloto T03:

- Navigation Bar ativa: `Home`;
- App Header title: `Visão Geral`;
- App Header context: nome da Pessoa Idosa;
- remover do corpo o H1 redundante `Visão Geral do Cuidado`.

Para as próximas telas, não copiar mecanicamente o label do footer para o header. Resolver o título específico a partir do papel da tela no sitemap/registry/requisitos.

## 9. Regra de cor e surface em Root Header

O agente não deve interpretar Material 3 como obrigação de manter header branco/neutro nem como licença para usar cor saturada decorativa.

Aplicar:

- header normal em papel semântico de `Surface`/`Surface Container Low` ou equivalente local;
- quando houver estado scrolled real, usar `Surface Container` ou papel local de maior separação tonal;
- título em `On Surface`;
- contexto em `On Surface Variant`;
- ações em `On Surface` ou acento semanticamente justificado;
- brand tint somente via papel semântico e contraste verificado;
- evitar `Primary`/`Secondary` sólidos como background estrutural sem motivo funcional/semântico.

O objetivo é criar hierarquia tonal, profundidade leve e resposta a estado sem transformar o app em cópia Android ou em composição colorida arbitrariamente.

## 10. Reutilizar antes de criar

Em cada tela:

1. componente local aprovado;
2. Obra/shadcn existente;
3. library vinculada;
4. componente local novo apenas sem equivalente adequado.

Não reconstruir o que a Foundation já resolveu.

Componentes descobertos durante uma migração devem ser registrados para que os próximos lotes não repitam a descoberta.

## 11. Escalonamento de esforço

Usar esforço alto apenas quando o problema realmente envolver:

- nova arquitetura;
- conflito entre múltiplas telas;
- decisão M3 não canonizada;
- mudança de componente compartilhado;
- ambiguidade funcional relevante;
- regressão estrutural difícil de isolar.

Migrações já cobertas por padrão aprovado devem usar esforço normal, mantendo as mesmas auditorias obrigatórias.

A regra é: **mais raciocínio onde há incerteza; mais reutilização onde o padrão já foi aprovado**.

## 12. Sessões do agente

Para uma nova fase arquitetural, preferir sessão limpa com GitHub como contexto canônico.

Depois de um piloto aprovado, a mesma sessão pode continuar por um pequeno conjunto de telas relacionadas enquanto o contexto permanecer útil e controlado.

Quando a sessão acumular muito histórico irrelevante, iniciar nova sessão em vez de carregar centenas de milhares de tokens apenas por continuidade conversacional.

## 13. Branch/PR

Nunca trabalhar diretamente em `main`.

Fluxo:

`main atualizada → branch da entrega → Figma/docs → auditoria → PR → revisão humana → merge autorizado → próxima branch`

Não empilhar várias branches dependentes sem necessidade.

Primeiro piloto após a Foundation M3:

`design/t03-material3-migration`

## 14. Sequência de migração recomendada

A sequência pode ser ajustada após cada revisão humana, mas o plano inicial é:

1. **T03 isolada** — piloto de `AppShell / Root`;
2. **T01 + T02** — piloto de `AuthShell`;
3. **T04 + T09 + T11** — grupo operacional de Rhuan;
4. **T05 + T07** — saúde/leitura/histórico;
5. **T08 + T10** — saúde/cadastro e registros;
6. **T12 + T13** — pessoa/rede;
7. **T14 + T15** — contatos/emergência;
8. **T16 + T17** — preferências/auditoria;
9. **T06** — manter isolada se sua complexidade de estados justificar.

Essa lista é uma estratégia de execução, não nova regra funcional nem alteração de ownership.

## 15. Critério de saída de cada unidade/lote

Antes do PR ficar pronto para revisão:

- requisitos/escopo preservados;
- M3 review realizado;
- Foundation/componentes reutilizados corretamente;
- estados irmãos consistentes;
- header/content/navigation sem redundância desnecessária;
- hierarchy de surface/cor semanticamente justificada;
- zero overflow/clipping acidental;
- targets e safe areas auditados;
- screenshots finais inspecionados;
- registries atualizados somente quando necessário;
- validator/diff/YAML executados quando aplicável;
- nenhuma funcionalidade nova inferida.

## Princípio resumido para agentes

> **Não gaste contexto redescobrindo o que o GitHub já canonizou. Não economize contexto sacrificando inspeção visual, M3, requisitos ou auditoria. Valide um piloto, transforme o aprendizado em padrão e só então escale para micro-lotes coerentes.**