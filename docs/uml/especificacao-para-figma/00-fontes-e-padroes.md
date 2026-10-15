# Fontes e padrões de modelagem

## Autoridade e classificação

| Marca | Uso |
|---|---|
| **[ACADEMICO]** | Notação e princípio expressos nas aulas, consolidados em `../diretrizes-professor.md`. |
| **[REQUISITO]** | RF/RNF/US, critério aprovado em comentário de Issue, regra ou decisão V1 canônica. |
| **[PERSISTENCIA]** | Estrutura verificada no SQL consolidado/EER de 2026-10-13; não cria regra funcional. |
| **[INFERENCIA]** | Recorte ou participante técnico proposto para explicar uma colaboração; nunca equivale a requisito. |
| **[PENDENTE]** | Informação sem prova suficiente; não desenhar como decisão fechada. |

Fontes funcionais prioritárias: `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml` (2026-09-14), `USER_STORIES_INDEX.yaml` e `ACCEPTANCE_CRITERIA.yaml` (2026-09-15, com `comment_id` das Issues), `docs/02_BUSINESS_RULES/`, `docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md` (2026-10-09). A transcrição/rótulo dos slides só sustenta notação: slides 5, 8–14, 16–26, 28–39 e 53–58.

## Nomenclatura

| Elemento | Padrão |
|---|---|
| Ator | papel externo singular em português: `Familiar Principal`, `Usuário Cadastrado`, `Pessoa Idosa`; condição `Plantonista Atual` nunca é ator. |
| Caso de uso | infinitivo + objeto de negócio: `Solicitar troca de plantão`. |
| Classe | PascalCase, singular, vocabulário de domínio: `RedeCuidado`, `RegistroCuidado`. |
| Atributo | `camelCase`, tipo UML simples (`String`, `Boolean`, `Date`, `DateTime`, `Integer`, enumeração). |
| Operação | `camelCase`, comportamento de domínio; `+` pública quando exibida. Assinatura `+ operacao(param: Tipo): Retorno`. |
| Elemento interno | `A-xx` ator, `U-xx` caso, `C-xx` classe, `R-xx` relação, `P-xx` participante, `M-xx` mensagem, `F-xx` fragmento. |

## Convenções UML aplicáveis

| Uso | Símbolo e direção | Base acadêmica |
|---|---|---|
| Associação ator–caso | linha contínua sem ponta; sem multiplicidade. | Slides 8–14. |
| `include` | tracejada, ponta aberta, do caso-base ao caso incluído. | Slides 8, 10 e 13. |
| `extend` | tracejada, ponta aberta, do caso que estende ao caso-base. | Slides 8, 10 e 13. |
| Associação de classes | linha contínua; multiplicidade em ambas extremidades se comprovada. | Slides 16, 18 e 24. |
| Generalização | linha contínua com triângulo vazado apontando à superclasse. | Slides 16 e 20. |
| Composição/agregação | losango preenchido/vazio no todo; só com semântica de ciclo de vida comprovada. | Slides 16 e 25. |
| Dependência | tracejada, ponta aberta apontando ao elemento usado. | Slides 16 e 21. |
| Sequência síncrona/retorno | chamada com ponta cheia; retorno tracejado. Tempo flui de cima para baixo. | Slides 28, 34 e 37. |
| Sequência assíncrona | linha contínua com ponta aberta; emissor não espera. | Slide 37. |
| Fragmento `alt` | moldura `alt`, guardas entre colchetes. | Slides 28–39. |

Nenhuma composição, agregação, generalização, `include` ou `extend` foi incluído por ornamentação. Onde o projeto não prova a semântica, a especificação usa associação ou pendência.
