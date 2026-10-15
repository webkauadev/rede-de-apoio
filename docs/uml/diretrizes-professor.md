# Diretrizes do professor — Unidade 4 UML

Fonte principal: `diagramas/Aula_UML_60_Slides_Integral.pdf`, conferida com `Aula_UML_Transcricao.md`. As referências abaixo são aos slides do PDF. “Explícito” é o que a aula diz; “aplicação” é uma consequência técnica para a próxima etapa, não uma nova exigência atribuída ao professor.

## Enquadramento

Os slides 1–6 situam as aulas 27–37 e selecionam cinco dos 14 diagramas UML. O slide 5 recomenda UML como **esboço seletivo** para pensar e comunicar: incompletude não é defeito quando o recorte responde uma pergunta; desenhar tudo sem propósito é. O slide 6 declara para M2/M3 “classes + casos de uso + sequência + atividades/estados”; UML executável/MDA fica fora do escopo.

## Casos de uso — quem usa o sistema e para quê

| Aspecto | Diretriz explícita | Origem |
|---|---|---|
| Escopo | Mapa de interações entre ator externo e objetivo dentro da fronteira do sistema; não descreve fluxo nem tela. | 8 |
| Elementos | Ator (papel externo), elipse para objetivo, retângulo de fronteira e associação ator–caso. | 8 |
| História | Da US: “Como” sugere ator, “Quero” o caso; “Para” é justificativa, não elemento automático. | 9 |
| `include` | Parte obrigatória: seta tracejada sai do caso-base e aponta ao incluído. | 8, 10, 13 |
| `extend` | Acréscimo opcional/condicional: seta tracejada sai de quem estende e chega ao caso-base. | 8, 10, 13 |
| Generalização | Só usar se o ator especializado realmente herda todos os casos do ator geral. | 14 |
| Erros | Usar tela/botão/rota ou persistência como caso; inverter setas; conectar ator sem autorização demonstrada; usar generalização por aparência. | 8–14; laboratório ex. 3 |

Aplicação: nomear objetivos completos de negócio e manter o vínculo RF/US; autenticação pode ser `include` somente se aquela execução a exigir. Papéis e condições temporárias devem seguir a matriz aprovada, não uma hierarquia inventada.

## Classes — que conceitos existem e como se ligam

| Aspecto | Diretriz explícita | Origem |
|---|---|---|
| Classe | Retângulo com nome, atributos e operações; `+`, `-`, `#`, `~` indicam visibilidade. | 16 |
| Relações | Associação estrutural; generalização com triângulo vazado à superclasse; dependência tracejada; agregação com losango vazio; composição com losango cheio. | 16, 20–25 |
| Multiplicidade | `1`, `0..1`, `*`, `1..*`, intervalos; ler nos dois sentidos. | 16, 18, 24 |
| Domínio | Nome de classe é substantivo do vocabulário do cliente. Classe de domínio é do cliente; classes de projeto são escolha da equipe. | 17, 19, 26 |
| Banco | “Diagrama de classes não é diagrama de tabelas disfarçado”; campos técnicos não entram por existirem no banco. | 17, 26 |
| Composição | Só quando a parte deixa de existir com o todo; agregação quando a parte sobrevive. | 25 |
| Erros | Losango para qualquer FK, multiplicidade unilateral, herança para compartilhar só um atributo, dependência desenhada como associação. | 18, 20–25; laboratório ex. 1–2 |

Aplicação: modelo de domínio terá somente atributos e operações que expliquem os casos e cenários selecionados. Modelo físico/EER será uma visão separada, embora reconciliada.

## Sequência — em que ordem participantes conversam

| Aspecto | Diretriz explícita | Origem |
|---|---|---|
| Notação | Tempo de cima para baixo; ator/participantes, linhas de vida tracejadas, barra de ativação durante execução. | 28 |
| Mensagens | Síncrona espera; assíncrona prossegue; retorno tracejado devolve. Automensagem mostra chamada interna. | 28, 37 |
| Fragmentos | `alt` para alternativas com guardas, `opt` para opcional, `loop` para repetição, `par` para execução paralela. | 28, 30–39 |
| Cenários | Um cenário Gherkin pode orientar um diagrama; cenário principal e alternativos devem ser legíveis. | 29, 36 |
| Coerência | Toda seta é uma operação; se a sequência chama operação ausente na classe, um dos dois diagramas está errado. Tela sem função no meio não explica colaboração. | 34; laboratório ex. 4–5 |

Aplicação: selecionar cenários de colaboração significativa, não um diagrama por clique. Guardas virão de critérios de aceite/regras aprovadas.

## Atividades — como o trabalho flui

| Aspecto | Diretriz explícita | Origem |
|---|---|---|
| Notação | Nó inicial/final, ações, decisão com guardas, fluxos, fork e join. | 41–44 |
| Decisão | Todo losango precisa de guardas que cobrem as alternativas. | 42 |
| Paralelismo | Fork abre trilhas; join aguarda todas. | 43 |
| Responsáveis | Partições mostram quem executa cada ação. | 44 |
| Limite | Atividade mostra fluxo/processo; sequência mostra conversa. Ação não é estado. | 45–46 |
| Gherkin | Condições `Dado/E` tornam-se decisões e cada cenário pode ser um caminho. | 45 |

## Máquina de estados — por quais situações um objeto passa

| Aspecto | Diretriz explícita | Origem |
|---|---|---|
| Quando usar | Procurar `status`, `situação` ou `estado`; há máquina se as regras dependem do estado atual e existe ciclo de vida. Não criar se isso não existir. | 47 |
| Notação | Estado inicial/final, estados arredondados e transições nomeadas por evento; forma completa: evento `[guarda] / ação`. | 48–51 |
| Verificação | Tabela de transições transforma cada seta em linha/teste; confirmar alcançabilidade e terminação. | 49 |
| Erros | Ação não é estado; toda seta precisa evento; não confundir estado do domínio com estado da tela. | 50–51; laboratório ex. 6–7 |

## Revisão cruzada e legibilidade

Os slides 53–58 ligam requisito → US → caso de uso → classes → sequência → atividades/estados → wireframe/teste. Antes da monitoria o professor pergunta: toda US tem caso de uso; todo dado da tela é atributo; todo cenário principal tem sequência; toda classe com status tem estados; toda classe aparece em tela ou sequência (slide 58). A matriz deve fazer lacunas visíveis (slide 57), mas a equipe deve distinguir “não aplicável” de “evidência ausente”.

### Convenção visual para a futura montagem no Figma

Usar símbolos acima, setas no sentido semântico, multiplicidades junto à extremidade que qualificam e guardas entre colchetes. Preservar leitura esquerda→direita e tempo cima→baixo; subdividir por domínio/caso quando o conjunto perder legibilidade. O conteúdo semântico será fechado no GitHub antes do desenho.
