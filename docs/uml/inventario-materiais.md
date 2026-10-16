# Inventário dos materiais acadêmicos de UML

Data da inspeção: 2026-10-15. Os arquivos de aula permanecem locais em `diagramas/` e **não** foram adicionados ao Git, pois não há confirmação de licença para redistribuição em repositório público.

| Arquivo | Formato e acesso | Leitura realizada | Finalidade e assuntos | Limitações |
|---|---|---|---|---|
| `diagramas/Aula_UML_60_Slides_Integral.pdf` | PDF, 60 páginas, acessível; texto extraível | PDF completo processado página a página; páginas de notação e revisão verificadas visualmente | Unidade 4, aulas 27–37: os cinco diagramas, notação, exemplos Vez, rastreabilidade e checklist da monitoria | A extração de texto não preserva toda a geometria; a interpretação de setas, losangos, barras e multiplicidades foi confirmada nas páginas visuais pertinentes. |
| `diagramas/Aula_UML_Transcricao.md` | Markdown, acessível (60 seções identificadas) | Integral | Transcrição estruturada e descrições acessíveis dos desenhos do PDF. Índice textual, exemplos e fontes por slide. | Complementa, não substitui, o PDF visual. |
| `diagramas/FireShot Capture 048 - UML — Modelagem do Sistema - [200.129.130.145].png` | PNG, acessível | Integral, por leitura visual | Página da aula com notação, explicações e exemplos dos cinco diagramas. Confirma a apresentação didática do PDF. | Captura longa e resolução variável; texto miúdo não foi usado como evidência quando ilegível. |
| `diagramas/FireShot Capture 051 - Laboratório — UML na prática com o Vez - [200.129.130.145].png` | PNG, acessível | Integral, por leitura visual | Laboratório: leitura e correção de classes, casos de uso, sequência, estados, atividades, Gherkin e escolha de diagrama. | Alguns detalhes de labels são pequenos; foram registrados somente os exercícios e defeitos identificáveis. |
| `diagramas/FireShot Capture 052 - Unidade 4 — UML (Aulas 27–37) - [200.129.130.145].pdf` | PDF-captura, acessível; sem camada textual extraível | Leitura visual do artefato, correlacionada ao PDF/transcrição | Página de Unidade 4, útil para contexto de navegação e identificação da aula. | Sem texto extraível; não é fonte suficiente para afirmações que dependam de letras pequenas. |

## Material duplicado e referência de origem

O PDF de 60 slides e a transcrição Markdown são o mesmo conteúdo em mídias complementares: o primeiro foi a fonte visual; a segunda foi usada para localizar texto, descrições e citações. A FireShot 048 é uma apresentação web do mesmo tema, não uma segunda fonte de requisitos acadêmicos. O laboratório (FireShot 051) é material prático distinto. Nenhum conteúdo do sistema didático Vez foi transferido como requisito deste projeto.

## Cobertura do PDF de 60 slides

| Faixa | Conteúdo |
|---|---|
| 1–6 | objetivo da unidade, Vez como caso didático, três modos de UML e escopo dos cinco diagramas |
| 7–14 | casos de uso: atores, fronteira, associação, `include`, `extend` e generalização |
| 15–26 | classes: notação, domínio versus banco, multiplicidade, herança, dependência, agregação e composição |
| 27–39 | sequência: linhas de vida, ativações, mensagens, retornos, `alt`, `loop`, `opt`, `par` e ligação com classes/Gherkin |
| 40–51 | atividades e estados: fluxo, guardas, fork/join, partições, ciclo de vida e tabela de transições |
| 52–60 | rastreabilidade, matriz, checklist da monitoria, referências e ES-04 |

## Exercícios do laboratório Vez

| Exercício | Ensinamento / defeitos observáveis | Prevenção no projeto |
|---|---|---|
| 1–2, Classes | Ler multiplicidades nos dois sentidos; distinguir associação, composição e dados do domínio. Pontos A–F trazem erros deliberados. A dica diz que senha cancelada ou não comparecida é histórica, portanto não pode ser tratada como composição descartável. | Declarar cardinalidade e ciclo de vida a partir das regras aprovadas; não desenhar o schema como classe UML. |
| 3, Casos de uso | Corrigir direção de `include`/`extend`, ator autorizado e casos que expõem implementação (`Gravar status no MongoDB`). Completar um caso de negócio e sua pré-condição. | Casos terão objetivos do ator; persistência, telas e botões não serão casos de uso. |
| 4–5, Sequência | Ler iniciador, participantes, primeiro comportamento e caminhos de `alt`; cada mensagem a `Senha` deve ser operação da classe. | Cada mensagem planejada terá dono e operação/contrato correspondente; alternativas dos aceites irão para guardas/fragmentos. |
| 6–7, Estados | Separar estado de ação, nomear evento/guarda/ação e completar transições segundo regras explícitas. | Só entidades com ciclo relevante terão máquina; transições serão justificadas por regra/aceite. |
| 8, Atividades | Completar guardas mutuamente compreensíveis e ações de fim de fluxo; decidir se duas verificações cabem em um losango. | Fluxos do cuidado usarão ações e guardas cobrindo caminhos aceitos/recusados, sem estados disfarçados. |
| 9, Gherkin | Cada operando de `alt` gera um cenário verificável, em vocabulário de negócio, sem rota/método. | Critérios aprovados orientarão os cenários de sequência/atividade sem criar critérios novos. |
| 10, Escolha | Escolher o diagrama pela pergunta: perfil/ações, ordem interna, ciclo, cardinalidade ou fluxo. | Diagramas serão seletivos e cada um declarará a pergunta que responde. |

O laboratório pede que cada correção seja expressa como **defeito, onde está, por que é problema e como corrigir**, usando o vocabulário da unidade. Ele também instrui escrever “não dá para saber” quando o desenho não dá evidência suficiente.

## Exigências acadêmicas identificadas

O slide 6 afirma para Milestones 2 e 3: **classes + casos de uso + sequência + atividades/estados**. A barra “atividades/estados” é ambígua quanto a exigir ambos em toda entrega; slides 47–51 tornam máquina de estados condicional a objeto com ciclo de vida/status. A confirmação de formato/quantidade para a equipe deve vir do enunciado da Milestone, que não está entre os materiais locais. O slide 60 define ES-04 separadamente como entrega individual de 100 pontos: revisar um diagrama de classes defeituoso e modelar o próprio projeto em UML. Não há evidência para equiparar ES-04 integralmente à entrega coletiva da Milestone 2.
