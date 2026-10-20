# Aula UML — Transcrição dos 60 slides

Fonte: apresentação "UML — Modelagem do Sistema" (Engenharia de Software · Unidade 4 · IFRO 2026/2), leitor de slides da disciplina, arquivo `unidade-04-uml/02-slides.md`.

Complemento de acessibilidade ao PDF `Aula_UML_60_Slides_Integral.pdf`. O texto abaixo foi extraído diretamente do código HTML/SVG dos slides (não por OCR), preservando a redação original. Trechos marcados como **[DIAGRAMA]** indicam figuras: os rótulos listados são os textos que existem dentro de cada diagrama; títulos/descrições de diagramas vêm de metadados escritos pelo próprio autor no SVG. Setas, linhas, multiplicidades posicionais e a geometria dos diagramas só podem ser lidas visualmente no PDF.

---

## Slide 1 / 60  ·  tipo: title

[Rótulo do slide] Engenharia de Software · Unidade 4

# UML — Modelagem do Sistema

Cinco diagramas, cinco perguntas diferentes sobre o mesmo sistema.

Aulas 27 a 37 (8ª a 11ª semana) · CST em ADS · IFRO · 2026/2

---

## Slide 2 / 60  ·  tipo: normal

[Rótulo do slide] Roteiro

# O percurso da unidade

| Aulas | Diagrama | Pergunta que responde |
| --- | --- | --- |
| 27 | Panorama | Que diagramas existem, e quando cada um serve? |
| 28 | **Casos de uso** | Quem usa o sistema, e para quê? |
| 29–31 | **Classes** | Que conceitos existem no domínio, e como se ligam? |
| 32 | **Sequência** | Em que ordem os objetos conversam? |
| 33 | **Atividades** | Qual é o fluxo do processo? |
| 34 | **Estados** | Por quais situações um objeto passa? |
| 35–37 | Laboratório e revisão cruzada | Tudo isso é consistente entre si? |

[Caixa: callout bad]

No **Milestone 2**, os diagramas UML valem **20 dos 100 pontos** — e seguem valendo 20 no Milestone 3.

---

## Slide 3 / 60  ·  tipo: normal

[Rótulo do slide] O caso que atravessa a unidade

# Um sistema real: o Vez resolve a fila e a senha

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "O Vez numa tela"
> - Descrição acessível embutida no SVG (aria-label): "O Vez numa tela: cidadão, atendente, gestor e administrador usam o app, o painel web e o painel na TV, ligados a uma API que guarda filas e senhas e avisa o cidadão."
> - Descrição embutida no SVG (desc): "Quatro tipos de usuário do Vez (cidadão, atendente, gestor e administrador da plataforma) usam três telas de acesso (app no celular, painel web e painel na TV), todas ligadas a uma API que guarda as filas e as senhas e avisa o cidadão quando a vez dele chega."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `O problema: filas físicas, senha de papel e ninguém sabe quando é a sua vez.`
>   - `O Vez emite a senha (no app, por QR Code ou no guichê), organiza a fila da instituição e avisa quando chega a vez.`
>   - `QUEM USA`
>   - `POR ONDE ENTRA`
>   - `O QUE GUARDA E DECIDE`
>   - `Cidadão`
>   - `pega senha, espera, é avisado`
>   - `Atendente`
>   - `chama, rechama e finaliza senhas`
>   - `Gestor`
>   - `configura filas e vê métricas`
>   - `Administrador`
>   - `cuida da plataforma toda`
>   - `App no celular`
>   - `Android: retirar senha,`
>   - `acompanhar posição`
>   - `Painel web`
>   - `guichê: chamar senhas`
>   - `gestão: filas, usuários,`
>   - `dashboard e auditoria`
>   - `Painel na TV`
>   - `senha chamada e QR Code`
>   - `para o salão de espera`
>   - `API do Vez`
>   - `Instituições (cada uma isolada)`
>   - `Filas e senhas`
>   - `Papéis e permissões`
>   - `Auditoria`
>   - `Notificações ao cidadão`
>   - `Toda regra de negócio`
>   - `mora aqui.`
>   - `As telas só pedem e mostram.`
>   - `aviso`

[Fonte] 📖 Exemplo: projeto Vez — docs/01-visao-geral.md e docs/03-acesso-rbac.md (esboço livre, não é UML)

---

## Slide 4 / 60  ·  tipo: normal

[Rótulo do slide] O caso que atravessa a unidade

# O Vez dá requisitos reais aos cinco diagramas

[Caixa: card good]

### Funcionais

- **V-RF-01** emitir senha
- **V-RF-02** chamar, rechamar e finalizar
- **V-RF-03** cancelar (só se aguardando)
- **V-RF-04** notificar o cidadão
- **V-RF-05** avaliar o atendimento

[Caixa: card neutral]

### Não funcionais

- **V-RNF-01** cada instituição só vê os seus dados
- **V-RNF-02** sem o serviço de notificações, o resto continua

[Caixa: callout]

Real, em produção e pequeno o bastante para caber na cabeça: cada requisito reaparece nos diagramas.

[Fonte] 📖 Exemplo: projeto Vez — docs/01-visao-geral.md (§2, §4, §6) e docs/03-acesso-rbac.md

---

## Slide 5 / 60  ·  tipo: normal

[Rótulo do slide] Motivação

# Três modos de usar UML

[Caixa: card good]

### Esboço

**É o nosso caso.** Desenho seletivo e informal, feito para **conversar**. Mostra só o que importa naquela discussão.

[Caixa: card neutral]

### Planta

Modelo detalhado e completo, para outra pessoa implementar sem ambiguidade. Times grandes, contratos.

[Caixa: card neutral]

### Linguagem

O modelo é executável e gera o sistema. Abordagens de MDA — fora do escopo daqui.

[Caixa: callout ok]

**Consequência prática:** diagrama **incompleto não é defeito**, desde que o que está lá esteja certo e responda a alguma pergunta. O defeito é desenhar tudo sem saber por quê.

[Fonte] 📖 FOWLER · UML Essencial · Cap. 1 (p. 25) e Cap. 2 (p. 39)

---

## Slide 6 / 60  ·  tipo: normal

[Rótulo do slide] Panorama

# 14 diagramas — usamos cinco

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Descrição acessível embutida no SVG (aria-label): "Panorama dos diagramas UML divididos em estruturais e comportamentais, destacando os cinco estudados na disciplina e a pergunta que cada um responde."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Os diagramas da UML — e os cinco que vamos usar`
>   - `A UML 2 define 14 diagramas. Ninguém usa todos. Fowler: use o que ajuda a pensar e comunicar; o resto é peso morto.`
>   - `ESTRUTURAIS`
>   - `o que o sistema É — as peças e como se ligam`
>   - `Diagrama de Classes`
>   - `Que conceitos existem no domínio e como se relacionam?`
>   - `Objetos`
>   - `Pacotes`
>   - `Componentes`
>   - `Instalação (deployment)`
>   - `Estruturas compostas`
>   - `Perfis`
>   - `Os cinco em cinza existem e são úteis em outros contextos —`
>   - `não fazem parte desta disciplina.`
>   - `No Milestone 2 e 3 você entrega:`
>   - `classes + casos de uso + sequência + atividades/estados`
>   - `COMPORTAMENTAIS`
>   - `o que o sistema FAZ — ao longo do tempo`
>   - `Diagrama de Casos de Uso`
>   - `Quem usa o sistema, e para quê?`
>   - `Diagrama de Sequência`
>   - `Em que ordem os objetos conversam, para realizar um caso de uso?`
>   - `Diagrama de Atividades`
>   - `Qual é o fluxo do processo, com decisões e paralelismo?`
>   - `Diagrama de Máquina de Estados`
>   - `Por quais estados um objeto passa, e o que provoca a transição?`
>   - `Comunicação`
>   - `Temporização`
>   - `Visão geral da interação`
>   - `Casos de uso (detalhe)`
>   - `Um diagrama existe para responder a uma pergunta. Se você não sabe qual pergunta ele responde, provavelmente não precisa dele.`
>   - `FOWLER, UML Essencial, cap. 1 · SOMMERVILLE 10ed · §5.2 a §5.4 · VALENTE · §4.2.2 Diagramas UML · OMG, UML 2.5.1`

[Fonte] 📖 FOWLER · Cap. 1 · VALENTE · §4.2.2 · SOMMERVILLE 10ed · §5.1 a §5.4

---

## Slide 7 / 60  ·  tipo: divider

[Rótulo do slide] Aula 28

# Casos de uso

---

## Slide 8 / 60  ·  tipo: normal

[Rótulo do slide] Notação

# Ator, caso de uso e fronteira

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de casos de uso de um sistema de atendimento, com atores munícipe, atendente e coordenação, casos de uso dentro da fronteira do sistema, e relações include e extend."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Diagrama de casos de uso — quem usa, e para quê`
>   - `Ele não descreve fluxo nem tela: dá o mapa de quem interage com o sistema e do que cada um consegue fazer.`
>   - `Sistema de Atendimento`
>   - `Munícipe`
>   - `Atendente`
>   - `Coordenação`
>   - `Abrir solicitação`
>   - `Acompanhar solicitação`
>   - `Atender solicitação`
>   - `do seu setor`
>   - `Encerrar atendimento`
>   - `Autenticar`
>   - `Avaliar`
>   - `atendimento`
>   - `Extrair`
>   - `relatório`
>   - `«include»`
>   - `«include»`
>   - `«extend»`
>   - `«include» — sempre acontece`
>   - `O caso de uso incluído é parte obrigatória do que inclui.`
>   - `Abrir solicitação sempre exige autenticar.`
>   - `«extend» — só às vezes`
>   - `O caso de uso estendido acrescenta comportamento opcional.`
>   - `Ao encerrar, o munícipe pode avaliar — ou não.`
>   - `FOWLER, UML Essencial, cap. 9 (p. 104) · SOMMERVILLE 10ed · §5.2.1 · VALENTE · §3.4 · PRESSMAN 9ed · §7.4`

[Fonte] 📖 FOWLER · Cap. 9 (p. 104) · SOMMERVILLE 10ed · §5.2.1

---

## Slide 9 / 60  ·  tipo: normal

[Rótulo do slide] Ponte

# Da História de Usuário ao caso de uso

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Descrição acessível embutida no SVG (aria-label): "Tradução de uma história de usuário em caso de uso: o Como vira o ator, o Quero vira o caso de uso, e a menção a autenticado gera uma relação include."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Como`
>   - `munícipe autenticado,`
>   - `Quero`
>   - `abrir uma solicitação escolhendo o serviço,`
>   - `Para`
>   - `registrar minha demanda sem ir ao balcão.`
>   - `→ ator: Munícipe`
>   - `→ caso de uso: Abrir solicitação`
>   - `→ «include» Autenticar`
>   - `porque a história diz "autenticado"`
>   - `O "Para" não vira nada no diagrama — mas é o que permite questionar se o caso de uso deve existir.`

---

## Slide 10 / 60  ·  tipo: normal

[Rótulo do slide] Relações

# «include» × «extend»

[Caixa: card good]

### «include» — sempre acontece

- O caso incluído é **parte obrigatória** do que o inclui.
- Serve para fatorar comportamento repetido.
- *Abrir solicitação **sempre** inclui autenticar.*

[Caixa: card neutral]

### «extend» — só às vezes

- Acrescenta comportamento **opcional**, sob condição.
- A seta aponta *para* o caso estendido.
- *Ao encerrar, o munícipe **pode** avaliar.*

[Caixa: callout bad]

**Erro clássico:** decompor casos de uso em passos. "Preencher formulário" e "Clicar em salvar" não são casos de uso — são passos de um. Caso de uso é um **objetivo completo**.

[Fonte] 📖 FOWLER · Cap. 9 (p. 104)

---

## Slide 11 / 60  ·  tipo: normal

[Rótulo do slide] Caso real: Vez

# Quem faz o quê: só o Operador chama senha

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Visão geral dos casos de uso do Vez"
> - Descrição acessível embutida no SVG (aria-label): "Casos de uso do Vez: quatro atores fora da fronteira e oito casos de uso dentro dela."
> - Descrição embutida no SVG (desc): "Fronteira do sistema Vez com quatro atores (Cidadão, Operador, Admin da Instituição e Admin da Plataforma) e oito casos de uso: retirar e cancelar senha, chamar, finalizar e emitir senha presencial, gerenciar filas e flows, consultar auditoria, aprovar instituição."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Vez`
>   - `Cidadão`
>   - `Operador`
>   - `Admin da`
>   - `Instituição`
>   - `Admin da`
>   - `Plataforma`
>   - `Retirar senha`
>   - `em uma fila`
>   - `Cancelar a`
>   - `própria senha`
>   - `Chamar`
>   - `próxima senha`
>   - `Finalizar`
>   - `atendimento`
>   - `Emitir senha`
>   - `presencial`
>   - `Gerenciar`
>   - `filas e flows`
>   - `Consultar`
>   - `auditoria`
>   - `Aprovar ou rejeitar`
>   - `instituição`

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md (diagrama de casos de uso) e docs/03-acesso-rbac.md. FOWLER · Cap. 9

---

## Slide 12 / 60  ·  tipo: normal

[Rótulo do slide] Ponte

# Cada história vira um caso de uso rastreável

| História (Como / Quero) | Ator | Caso de uso | Relação |
| --- | --- | --- | --- |
| US-V01 · retirar senha pelo celular | Cidadão | Retirar senha (UC06) | «include» Validar QR Code |
| US-V02 · chamar a próxima senha | Operador | Chamar próxima senha (UC12) | «include» Emitir evento |
| US-V03 · avaliar o atendimento | Cidadão | Avaliar atendimento (UC10) | «extend» Finalizar |

[Caixa: callout bad]

**Erro comum:** o caso de uso virou **tela ou botão** ("Tela de fila", "Clicar em Chamar"). O caso de uso é o objetivo: *Chamar próxima senha*.

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md. US-V0x escritas para a aula.

---

## Slide 13 / 60  ·  tipo: normal

[Rótulo do slide] Caso real: Vez

# include sai do caso-base; extend chega nele

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "«include» e «extend» nos casos de uso do Vez"
> - Descrição acessível embutida no SVG (aria-label): "Recorte do Vez: Retirar senha inclui Validar QR Code e Verificar prioridade; Avaliar atendimento e Marcar não compareceu estendem Finalizar atendimento e Chamar próxima senha."
> - Descrição embutida no SVG (desc): "Cidadão e Operador dentro da fronteira Vez. Retirar senha inclui Validar QR Code e Verificar prioridade. Chamar próxima senha e Finalizar atendimento incluem Emitir evento em tempo real. Marcar não compareceu estende Chamar próxima senha quando as rechamadas se esgotam. Avaliar atendimento estende Finalizar atendimento quando a senha está finalizada e dentro de 48 horas."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Vez`
>   - `Operador`
>   - `Cidadão`
>   - `Marcar não`
>   - `compareceu`
>   - `Chamar`
>   - `próxima senha`
>   - `Finalizar`
>   - `atendimento`
>   - `Emitir evento`
>   - `em tempo real`
>   - `Retirar senha`
>   - `Validar QR Code`
>   - `Verificar prioridade`
>   - `Avaliar atendimento`
>   - `«include»`
>   - `«include»`
>   - `«include»`
>   - `«include»`
>   - `«extend»`
>   - `[rechamadas esgotadas]`
>   - `«extend»`
>   - `[senha FINALIZADA, até 48 h]`
>   - `Seta tracejada: «include» sai do caso-base para o incluído; «extend» sai de quem estende para o caso-base.`

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md. FOWLER · Cap. 9 (p. 104)

---

## Slide 14 / 60  ·  tipo: normal

[Rótulo do slide] Atores

# Generalização: só se o ator herda tudo

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Generalização de atores no Vez"
> - Descrição acessível embutida no SVG (aria-label): "Admin da Instituição herda do Operador por generalização; Admin da Plataforma não herda."
> - Descrição embutida no SVG (desc): "Admin da Instituição é uma especialização de Operador: herda chamar próxima senha, finalizar atendimento e emitir senha presencial, e acrescenta gerenciar filas e flows e consultar auditoria. Admin da Plataforma não é especialização de Operador e só aprova ou rejeita instituições."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Vez`
>   - `Operador`
>   - `Admin da`
>   - `Instituição`
>   - `Admin da`
>   - `Plataforma`
>   - `Chamar próxima senha`
>   - `Finalizar atendimento`
>   - `Emitir senha presencial`
>   - `Gerenciar filas e flows`
>   - `Consultar auditoria`
>   - `Aprovar ou rejeitar`
>   - `instituição`
>   - `herda tudo`
>   - `do Operador`
>   - `sem seta de herança:`
>   - `não opera filas (403)`

[Fonte] 📖 Exemplo: projeto Vez — docs/03-acesso-rbac.md e matriz de permissões em docs/06-api.md. FOWLER · Cap. 9

---

## Slide 15 / 60  ·  tipo: divider

[Rótulo do slide] Aulas 29 a 31

# Classes

---

## Slide 16 / 60  ·  tipo: normal

[Rótulo do slide] Notação

# Anatomia e relacionamentos

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Descrição acessível embutida no SVG (aria-label): "Anatomia de uma classe UML com visibilidade de atributos e métodos, e os cinco tipos de relacionamento: associação com multiplicidade, agregação, composição, herança e dependência."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Diagrama de classes — os conceitos do domínio`
>   - `Modele o domínio do problema, não as tabelas do banco. Nome de classe é substantivo do vocabulário do cliente.`
>   - `Anatomia de uma classe`
>   - `Solicitação`
>   - `-`
>   - `protocolo: String`
>   - `-`
>   - `abertaEm: Date`
>   - `#`
>   - `status: Status`
>   - `+`
>   - `encerrar(): void`
>   - `+`
>   - `tempoAberto(): int`
>   - `-`
>   - `gerarProtocolo(): String`
>   - `nome · atributos · operações, separados por linha`
>   - `Visibilidade`
>   - `+`
>   - `pública — qualquer classe acessa`
>   - `-`
>   - `privada — só a própria classe`
>   - `#`
>   - `protegida — a classe e`
>   - `suas subclasses`
>   - `~`
>   - `pacote — classes do`
>   - `mesmo pacote`
>   - `Multiplicidade`
>   - `1`
>   - `exatamente um`
>   - `0..1`
>   - `nenhum ou um`
>   - `*`
>   - `zero ou muitos`
>   - `1..*`
>   - `um ou muitos`
>   - `2..5`
>   - `entre dois e cinco`
>   - `Leia sempre nos dois sentidos.`
>   - `Os cinco relacionamentos`
>   - `Associação`
>   - `Munícipe`
>   - `1`
>   - `*`
>   - `abre`
>   - `Solicitação`
>   - `Vínculo estrutural. Um munícipe abre várias solicitações.`
>   - `Herança (generalização)`
>   - `Usuário`
>   - `Atendente`
>   - `Triângulo vazado apontando para a superclasse. Atendente é um Usuário.`
>   - `Agregação`
>   - `Setor`
>   - `*`
>   - `Atendente`
>   - `Losango vazado: o todo agrupa as partes, mas elas existem sem ele.`
>   - `Composição`
>   - `Solicitação`
>   - `*`
>   - `Mensagem`
>   - `Losango preenchido: apagou a solicitação, apagou as mensagens.`
>   - `Dependência`
>   - `Relatório`
>   - `Solicitação`
>   - `Tracejada: uma classe usa a outra sem guardá-la.`
>   - `FOWLER, UML Essencial, cap. 3 (p. 52) e cap. 5 (p. 77) · SOMMERVILLE 10ed · §5.3.1, §5.3.2 e §5.3.3 · VALENTE · §4.3`

[Fonte] 📖 FOWLER · Cap. 3 (p. 52) e Cap. 5 (p. 77) · SOMMERVILLE 10ed · §5.3

---

## Slide 17 / 60  ·  tipo: normal

[Rótulo do slide] Alerta

# Domínio, não banco de dados

[Caixa: card bad]

### ✗ Modelo de tabelas disfarçado

- Todos os atributos **públicos**, com get/set para cada um.
- `idProfessor: int` em vez de **associação** com Professor.
- Nomes como `tb_reserva`, `ReservaDTO`.
- Operações como `salvarNoBanco()`.

[Caixa: card good]

### ✓ Modelo de domínio

- Atributos **privados**; a classe tem comportamento próprio.
- Relacionamento desenhado como **linha**, com multiplicidade.
- Nomes do **vocabulário do cliente**.
- Operações que **fazem sentido no domínio**.

[Caixa: callout warn]

Teste rápido: **o cliente reconheceria o nome da classe?** Se não, provavelmente não é classe de domínio.

---

## Slide 18 / 60  ·  tipo: normal

[Rótulo do slide] Multiplicidade

# Leia sempre nos dois sentidos

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Descrição acessível embutida no SVG (aria-label): "Leitura de multiplicidade nos dois sentidos entre as classes Munícipe e Solicitação, mostrando que a segunda leitura é a que revela erro de modelagem."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Munícipe`
>   - `1`
>   - `*`
>   - `Solicitação`
>   - `→ Um munícipe abre muitas solicitações.`
>   - `← Cada solicitação pertence a um munícipe.`
>   - `A segunda leitura é a que revela erro — é ela que faz perguntar:`
>   - `"duas pessoas podem compartilhar a mesma solicitação?"`

[Fonte] 📖 FOWLER · Cap. 3 (p. 52) · SOMMERVILLE 10ed · §5.3.1

---

## Slide 19 / 60  ·  tipo: normal

[Rótulo do slide] Do domínio ao projeto

# Classe de domínio é do cliente; classe de projeto é da equipe

[Caixa: card good]

### Domínio

Fila, Senha, Instituição. **O cliente reconhece o nome.** Serve para conversar sobre o problema.

[Caixa: card neutral]

### Projeto

FilaService, FilaRepository, CustomError. **Existe para organizar o código.** Serve para conversar com a equipe.

[Caixa: callout warn]

Erro comum: desenhar **todas** as classes do código. Escolha só as que respondem à pergunta do diagrama.

[Fonte] 📖 Exemplo: projeto Vez · docs/06-api.md (Apêndice D) · FOWLER · Cap. 3 e 5

---

## Slide 20 / 60  ·  tipo: normal

[Rótulo do slide] Herança

# O que é comum sobe para a classe abstrata

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Herança com classe abstrata: BaseRepository e quatro repositórios do Vez"
> - Descrição acessível embutida no SVG (aria-label): "BaseRepository abstrata e quatro repositórios do Vez que herdam o CRUD e acrescentam consultas próprias."
> - Descrição embutida no SVG (desc): "Diagrama de classes de projeto. A classe abstrata BaseRepository define o CRUD comum (buscarPorId, criar, atualizar, deletar, listarComPaginacao). UsuarioRepository, FilaRepository, SenhaRepository e InstituicaoRepository herdam dela por generalização e acrescentam consultas próprias."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Repositórios do Vez: o que é comum fica no pai, o que é específico fica no filho`
>   - `BaseRepository`
>   - `{abstract}`
>   - `# model : Model`
>   - `+ buscarPorId(id) : Promise`
>   - `+ criar(dados) : Promise`
>   - `+ atualizar(id, dados) : Promise`
>   - `+ deletar(id) : Promise`
>   - `+ listarComPaginacao(filtro) : Promise`
>   - `UsuarioRepository`
>   - `+ buscarPorEmail(email)`
>   - `+ buscarPorGoogleId(id)`
>   - `+ atualizarSenha(id, hash)`
>   - `FilaRepository`
>   - `+ listarPorInstituicao(id)`
>   - `+ buscarComMesas(id)`
>   - `SenhaRepository`
>   - `+ listarPorFila(filaId)`
>   - `+ buscarProximaSenha(filaId)`
>   - `+ contarPorStatus(filaId)`
>   - `InstituicaoRepository`
>   - `+ buscarPorNome(nome)`
>   - `+ listarProximas(lat, lng, raio)`
>   - `Herdado: os quatro já têm buscarPorId, criar, atualizar, deletar e listarComPaginacao, sem repetir.`
>   - `Específico: só o que o negócio daquela entidade pede. {abstract} (itálico): ninguém faz «new BaseRepository»; só os filhos existem.`

[Fonte] 📖 Exemplo: projeto Vez — docs/diagramas/api-uml-2.svg · FOWLER · Cap. 5 (p. 77)

---

## Slide 21 / 60  ·  tipo: normal

[Rótulo do slide] Dependência

# Entre camadas, uma classe usa a outra: tracejada, não losango

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Dependência entre camadas: FilaController usa FilaService, que usa FilaRepository"
> - Descrição acessível embutida no SVG (aria-label): "FilaController usa FilaService, que usa FilaRepository: dependência, não composição."
> - Descrição embutida no SVG (desc): "Diagrama de classes de projeto. FilaController depende de FilaService, que depende de FilaRepository, por setas tracejadas com ponta aberta (dependência). Nenhuma delas é composição. FilaService também usa AuditoriaService."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Quem conhece quem: a seta aponta para a classe que é usada`
>   - `Camada de controle`
>   - `Camada de serviço`
>   - `Camada de dados`
>   - `FilaController`
>   - `- filaService`
>   - `+ listar(req, res, next)`
>   - `+ criar(req, res, next)`
>   - `+ ativar(req, res, next)`
>   - `FilaService`
>   - `- filaRepository`
>   - `- auditoriaService`
>   - `+ listar(instituicaoId, filtros)`
>   - `+ criar(dados, actor)`
>   - `+ ativar(id, actor)`
>   - `FilaRepository`
>   - `+ listarPorInstituicao(id)`
>   - `+ buscarComMesas(id)`
>   - `«usa»`
>   - `«usa»`
>   - `(herda de BaseRepository: figura anterior)`
>   - `✓ Dependência (usada no Vez)`
>   - `tracejada, ponta aberta: «A usa B».`
>   - `O Controller recebe o Service pronto, no construtor`
>   - `(injeção de dependência); não o cria nem o apaga.`
>   - `✗ Composição (não é o caso)`
>   - `losango cheio: o todo é dono das partes.`
>   - `Composição diria: apagou o Controller, apagou o Service.`
>   - `Mas FilaService existe sem ele, e o mesmo AuditoriaService`
>   - `atende vários serviços.`

[Fonte] 📖 Exemplo: projeto Vez — docs/diagramas/api-uml-3.svg e api-uml-4.svg · SOMMERVILLE 10ed · §5.3

---

## Slide 22 / 60  ·  tipo: normal

[Rótulo do slide] Dependência de erro

# Quatro guardas dependem de um único CustomError

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Cadeia de proteção: middlewares que lançam CustomError"
> - Descrição acessível embutida no SVG (aria-label): "Quatro middlewares do Vez com seta tracejada «lança» para CustomError."
> - Descrição embutida no SVG (desc): "Diagrama de classes de projeto. Quatro middlewares do Vez (AuthMiddleware, AuthorizeMiddleware, EnsureInstituicaoMiddleware, AuthorizeFilaAccessMiddleware) dependem de CustomError: cada um o lança quando a requisição não pode seguir, com um código HTTP."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Quatro guardas, um só tipo de erro`
>   - `«middleware»`
>   - `AuthMiddleware`
>   - `+ verificarToken(req, res, next)`
>   - `«lança» 401`
>   - `«middleware»`
>   - `AuthorizeMiddleware`
>   - `+ porPapeis(papeis) : Function`
>   - `«lança» 403`
>   - `«middleware»`
>   - `EnsureInstituicaoMiddleware`
>   - `+ verificar(req, res, next)`
>   - `«lança» 403`
>   - `«middleware»`
>   - `AuthorizeFilaAccessMiddleware`
>   - `+ verificarAcesso(req, res, next)`
>   - `«lança» 400, 404 ou 403`
>   - `CustomError`
>   - `+ statusCode : Number`
>   - `+ errorType : String`
>   - `+ customMessage : String`
>   - `(o Vez ainda guarda field, details e isOperational)`
>   - `Isto é um diagrama de classes: mostra quem depende de quem, não a ordem de execução.`
>   - `A ordem (Auth, depois papel, depois instituição ou fila) é comportamento: pertence a um diagrama de sequência ou de atividades.`

[Fonte] 📖 Exemplo: projeto Vez — docs/diagramas/api-uml-5.svg e docs/03-acesso-rbac.md

---

## Slide 23 / 60  ·  tipo: normal

[Rótulo do slide] Exemplo real: projeto Vez

# Seis classes do Vez já contam o negócio

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Recorte do domínio do Vez: seis classes e suas associações"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de classes com Instituição, Fila, QrCode, Usuário, Senha e ChatMensagem, com multiplicidade e papéis nas duas pontas de cada associação."
> - Descrição embutida no SVG (desc): "Diagrama de classes com Instituição, Fila, QrCode, Usuário, Senha e ChatMensagem. Instituição 1 possui 0..* Filas; Fila 1 gera 0..* Senhas e vincula 0..* QrCodes; Usuário 0..1 retira 0..* Senhas; Senha 1 tem 0..* ChatMensagens."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Instituição`
>   - `− nome : Texto`
>   - `− status : StatusCadastro`
>   - `+ aprovar()`
>   - `Fila`
>   - `− nome : Texto`
>   - `− tipoAtendimento : Tipo`
>   - `− ativa : Booleano`
>   - `+ emitirSenha()`
>   - `+ chamarProxima()`
>   - `QrCode`
>   - `− token : Texto`
>   - `− ativo : Booleano`
>   - `Usuário`
>   - `− nome : Texto`
>   - `− papeis : Papel[]`
>   - `Senha`
>   - `− numero : Inteiro`
>   - `− status : StatusSenha`
>   - `− prioridade : Prioridade`
>   - `+ chamar(mesa)`
>   - `+ cancelar()`
>   - `+ finalizar()`
>   - `ChatMensagem`
>   - `− mensagem : Texto`
>   - `− remetente : Remetente`
>   - `1`
>   - `dona`
>   - `0..*`
>   - `filas`
>   - `possui`
>   - `1`
>   - `fila`
>   - `0..*`
>   - `qrcodes`
>   - `vincula`
>   - `0..1`
>   - `cidadão`
>   - `0..*`
>   - `senhas`
>   - `retira`
>   - `1`
>   - `senha`
>   - `0..*`
>   - `mensagens`
>   - `tem`
>   - `gera`
>   - `1`
>   - `fila`
>   - `0..*`
>   - `senhas`
>   - `0..1 e não 1: a senha presencial pode ficar`
>   - `sem usuário (campo usuarioId nulo).`

[Fonte] 📖 Exemplo: projeto Vez — docs/diagramas/api-uml-1.svg e docs/06-api.md (§7 e D.1) · FOWLER · Cap. 3 (p. 52)

---

## Slide 24 / 60  ·  tipo: normal

[Rótulo do slide] Multiplicidade

# O "1" do diagrama escondia um "0..1"

[Caixa: card bad]

### Lida num sentido só

"Um Usuário retira *muitas* Senhas." Parece certo, e o diagrama original do Vez parou aí, com `1` na ponta do Usuário.

[Caixa: card good]

### Lida também no outro

"Cada Senha tem *quantos* Usuários?" No Vez, a senha **presencial** pode não ter usuário (`usuarioId` nulo). Logo: `0..1`.

[Caixa: callout]

A pergunta de negócio **"toda senha tem dono?"** decide o número. O que a tabela permite ou o que parece óbvio não decide.

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md §7.4 (Senhas) · FOWLER · Cap. 3 (p. 52)

---

## Slide 25 / 60  ·  tipo: normal

[Rótulo do slide] Relacionamentos

# Composição some com o todo; agregação, não

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Agregação, composição e herança no domínio do Vez"
> - Descrição acessível embutida no SVG (aria-label): "Fila agrega Usuários autorizados (losango vazado); Senha compõe EventoHistórico e Avaliação (losango cheio); Operador e Cidadão especializam Usuário (hipótese didática)."
> - Descrição embutida no SVG (desc): "Fila agrega Usuários autorizados (losango vazado); Senha compõe EventoHistórico e Avaliação (losango cheio); Operador e Cidadão especializam Usuário (triângulo vazado, hipótese didática, pois no Vez papeis é um atributo)."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Fila`
>   - `− nome : Texto`
>   - `− ativa : Booleano`
>   - `Usuário`
>   - `− nome : Texto`
>   - `− papeis : Papel[]`
>   - `Senha`
>   - `− numero : Inteiro`
>   - `− status : StatusSenha`
>   - `EventoHistórico`
>   - `− tipo : Tipo`
>   - `− descricao : Texto`
>   - `Avaliação`
>   - `− nota : 1 a 5`
>   - `− comentario : Texto`
>   - `Operador`
>   - `+ chamarSenha()`
>   - `Cidadão`
>   - `+ retirarSenha()`
>   - `1`
>   - `0..*`
>   - `autorizados`
>   - `agregação`
>   - `1`
>   - `0..*`
>   - `gera`
>   - `1`
>   - `1`
>   - `0..*`
>   - `0..1`
>   - `composição`
>   - `herança (hipótese didática)`
>   - `Como distinguir`
>   - `Agregação`
>   - `A parte existe sem o todo.`
>   - `Apagar a Fila não apaga os`
>   - `Usuários que a operam.`
>   - `Composição`
>   - `Apagou o todo, apagou a parte.`
>   - `Sem a Senha, o histórico e a`
>   - `avaliação não existem.`
>   - `Herança`
>   - `A subclasse é um tipo do pai.`
>   - `No Vez real, papeis é um atributo:`
>   - `não há subclasses de Usuário.`

[Fonte] 📖 Exemplo: projeto Vez — api-fila/src/models (Fila, Senha) e docs/06-api.md · SOMMERVILLE 10ed · §5.3.2 e §5.3.3

---

## Slide 26 / 60  ·  tipo: normal

[Rótulo do slide] Modele o domínio

# A Senha no banco tem campos que o cliente nunca citou

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Modele o domínio, não o banco: a Senha do Vez"
> - Descrição acessível embutida no SVG (aria-label): "Comparação entre a classe de domínio Senha, com atributos, operações e regras, e a coleção senhas do banco, com campos técnicos como _id e createdAt que ficam fora do diagrama."
> - Descrição embutida no SVG (desc): "À esquerda, a classe de domínio Senha com atributos, operações e regras. À direita, a coleção senhas do banco: _id, instituicaoId, idClienteOffline, carimbos e índices ficam fora do diagrama; filaId e usuarioId viram associações."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Domínio: classe Senha`
>   - `Banco: coleção senhas (MongoDB)`
>   - `Senha`
>   - `− numero : Inteiro`
>   - `− status : StatusSenha`
>   - `− prioridade : Prioridade`
>   - `− presencial : Booleano`
>   - `+ chamar(mesa)`
>   - `+ cancelar()`
>   - `+ finalizar()`
>   - `Associações: Fila [1] · Usuário [0..1]`
>   - `Regra: o cidadão só cancela senha`
>   - `com status AGUARDANDO.`
>   - `Regra: um operador atende uma`
>   - `senha por vez.`
>   - `_id : ObjectId`
>   - `fora: chave do banco`
>   - `filaId : ObjectId`
>   - `vira associação com Fila`
>   - `usuarioId : ObjectId | null`
>   - `vira associação 0..1 com Usuário`
>   - `instituicaoId : ObjectId`
>   - `fora: repete a Instituição da Fila`
>   - `numero · status · prioridade`
>   - `fica: atributos do domínio`
>   - `idClienteOffline : String`
>   - `fora: sincronização do totem`
>   - `createdAt · updatedAt`
>   - `fora: carimbos automáticos`
>   - `índices (filaId, status…)`
>   - `fora: desempenho de consulta`
>   - `Pergunta de ouro: o cliente reconheceria isso? Fila, Usuário e “cancelar a senha” sim; _id e createdAt não.`

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md §7.4 e api-fila/src/models/Senha.js · VALENTE · §4.3

---

## Slide 27 / 60  ·  tipo: divider

[Rótulo do slide] Aula 32

# Sequência

---

## Slide 28 / 60  ·  tipo: normal

[Rótulo do slide] Notação

# A ordem da conversa

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência da abertura de uma solicitação, com ator, três participantes, linhas de vida, barras de ativação, mensagens síncronas, retornos e um fragmento alternativo."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Diagrama de sequência — a ordem da conversa`
>   - `Mostra um cenário: quais objetos trocam mensagens, em que ordem, para realizar um caso de uso. O tempo corre de cima para baixo.`
>   - `Munícipe`
>   - `:TelaSolicitacao`
>   - `:ServicoSolicitacao`
>   - `:RepositorioSolicitacao`
>   - `enviarSolicitacao(dados)`
>   - `criar(dados)`
>   - `buscarServico(id)`
>   - `servico`
>   - `alt`
>   - `[serviço ativo]`
>   - `[serviço inativo]`
>   - `salvar(solicitacao)`
>   - `protocolo`
>   - `erro("serviço indisponível")`
>   - `resultado`
>   - `protocolo ou mensagem de erro`
>   - `Barra de ativação`
>   - `O retângulo na linha de vida marca quando o objeto está executando.`
>   - `Fragmento alt`
>   - `Caminhos alternativos: a guarda entre colchetes decide qual ocorre.`
>   - `FOWLER, UML Essencial, cap. 4 (p. 67) · SOMMERVILLE 10ed · §5.2.2 · VALENTE · §4.5`

[Fonte] 📖 FOWLER · Cap. 4 (p. 67) · SOMMERVILLE 10ed · §5.2.2 · VALENTE · §4.5

---

## Slide 29 / 60  ·  tipo: normal

[Rótulo do slide] Ponte

# Um cenário Gherkin = um diagrama

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Descrição acessível embutida no SVG (aria-label): "Correspondência entre as cláusulas Dado, Quando e Então de um cenário Gherkin e os elementos do diagrama de sequência: estado inicial, mensagem que inicia e resultado final."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Dado`
>   - `que estou autenticado e escolhi um serviço`
>   - `→`
>   - `estado inicial dos participantes`
>   - `Quando`
>   - `envio a solicitação`
>   - `→`
>   - `a mensagem que inicia a sequência`
>   - `Então`
>   - `recebo um protocolo`
>   - `→`
>   - `o retorno ao final do diagrama`
>   - `O cenário de exceção vira o outro ramo do fragmento alt.`

[Caixa: callout warn]

**Não desenhe sequência para tudo.** Vale a pena para cenários com colaboração interessante. Escolha os **dois ou três cenários principais** do projeto.

---

## Slide 30 / 60  ·  tipo: normal

[Rótulo do slide] Exemplo: projeto Vez · 1 de 4

# Retirar senha: o `alt` guarda as recusas

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Retirar senha: o cidadão entra na fila"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência de retirar senha no Vez: cidadão, app, SenhaService, QrCodeService e SenhaRepository, com fragmento alt para fila inativa, senha ativa e QR inválido."
> - Descrição embutida no SVG (desc): "Diagrama de sequência da retirada de senha: cidadão, app, SenhaService, QrCodeService e SenhaRepository, com fragmento alt para fila inativa, senha ativa, QR inválido e caminho feliz."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Cidadão`
>   - `:App`
>   - `:SenhaService`
>   - `:QrCodeService`
>   - `:SenhaRepository`
>   - `alt`
>   - `[fila inativa]`
>   - `[já tem senha ativa]`
>   - `[PRESENCIAL e QR inválido]`
>   - `[QR válido ou fila sem QR]`
>   - `1. escolher fila e ler QR`
>   - `2. criar(filaId, qrCode)`
>   - `3. 400`
>   - `4. 409`
>   - `5. validar(filaId, qrCode)`
>   - `6. inválido`
>   - `7. 409`
>   - `8. validar(...) se PRESENCIAL`
>   - `9. válido`
>   - `10. criar(senha AGUARDANDO)`
>   - `11. 201 { id, posicao }`
>   - `síncrona`
>   - `assíncrona`
>   - `retorno`

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md §8.1 (regras de criação) e §8.2 (QR Code); docs/diagramas/api-uml-10.svg · FOWLER · Cap. 4 (p. 67)

---

## Slide 31 / 60  ·  tipo: normal

[Rótulo do slide] Exemplo: projeto Vez · 2 de 4

# Chamar a próxima: avisos assíncronos em paralelo

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Chamar próxima senha"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência de chamar a próxima senha no Vez: SenhaService com self-messages, notificação push e evento Socket.IO enviados em paralelo ao app do cidadão e ao painel da TV."
> - Descrição embutida no SVG (desc): "Diagrama de sequência da chamada da próxima senha: o atendente aciona SenhaService, que escolhe e atualiza a senha, e a notificação chega ao app do cidadão e ao painel da TV em paralelo, de forma assíncrona."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Atendente`
>   - `:SenhaService`
>   - `:NotificacaoService`
>   - `:AppCidadão`
>   - `:PainelTV`
>   - `par`
>   - `[push ao app]`
>   - `[painel da TV]`
>   - `alt`
>   - `[pausa ou ocupado]`
>   - `[caso contrário]`
>   - `1. chamarProxima(filaId?, mesa)`
>   - `2. 409`
>   - `3. escolherSenha()`
>   - `4. atualizar(EM_ATENDIMENTO)`
>   - `5. enviar(SENHA_CHAMADA)`
>   - `6. push: senha chamada`
>   - `7. senha:chamada (Socket.IO)`
>   - `8. 200 senha chamada`
>   - `síncrona`
>   - `assíncrona`
>   - `retorno`

[Caixa: callout]

**Assíncrona** (6, 7): dispare e siga. **Self-message** (3, 4): a seta volta à própria linha de vida.

[Fonte] 📖 Exemplo: projeto Vez — docs/25-operacao-atendimento.md ("Chamar a próxima: o fluxo único"); docs/08-notificacoes.md; docs/diagramas/api-uml-10.svg

---

## Slide 32 / 60  ·  tipo: normal

[Rótulo do slide] Exemplo: projeto Vez · 3 de 4

# Várias etapas: `loop` e `alt`

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Atendimento em etapas (flow)"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência de um atendimento em duas etapas no Vez: ingresso no flow e um loop em que cada chamada termina em encaminhar para a próxima etapa ou dar alta."
> - Descrição embutida no SVG (desc): "Diagrama de sequência de um atendimento em duas etapas, como triagem e consulta: ingresso no flow, laço de chamadas com alt entre encaminhar para a próxima etapa e dar alta."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Cidadão`
>   - `:SenhaService`
>   - `:FlowService`
>   - `:SenhaFlowTrackingRepository`
>   - `Operador`
>   - `alt`
>   - `[há próxima etapa]`
>   - `[última etapa]`
>   - `loop`
>   - `[até a alta]`
>   - `1. criar(filaId)`
>   - `2. ingressarSenha(senhaId, flowId)`
>   - `3. criar(step1, EM_ANDAMENTO)`
>   - `4. 201 { senha, tokenPublico }`
>   - `5. chamar(senhaId)`
>   - `6. encaminhar(senhaId, step2, resultado)`
>   - `7. atualizarStepAtual(step2)`
>   - `8. darAlta(senhaId, resultado)`
>   - `9. finalizarTracking()`
>   - `síncrona`
>   - `assíncrona`
>   - `retorno`

[Caixa: callout]

O `loop` repete **até a alta**; o `alt` decide: **encaminhar** à próxima etapa ou **dar alta**. (UPA: Triagem → Consulta)

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md (Flow de atendimento, §A e E.7); docs/diagramas/api-uml-12.svg

---

## Slide 33 / 60  ·  tipo: normal

[Rótulo do slide] Exemplo: projeto Vez · 4 de 4

# Sistemas também trocam mensagens

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Projeção na TV (Cast)"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência da projeção do painel na TV: o navegador do operador reenvia init ao receiver até receber ready; o receiver busca a fila na API e exibe a chamada recebida por Socket.IO."
> - Descrição embutida no SVG (desc): "Diagrama de sequência da projeção do painel na TV: o operador aciona o Cast, o navegador reenvia a mensagem init ao receiver até receber ready, o receiver busca a fila na API e, quando uma senha é chamada, recebe o evento por Socket.IO e exibe a chamada."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Operador`
>   - `:useChromecast`
>   - `:cast-receiver`
>   - `:API (api-fila)`
>   - `loop`
>   - `[até ready, máx. 15×]`
>   - `1. castSolicitar(params)`
>   - `2. requestSession()`
>   - `3. init(filaId, …) a cada 2 s`
>   - `4. ready`
>   - `5. GET /display/:filaId`
>   - `6. fila, QR ativo e senhas (DTO público)`
>   - `7. join fila:<id> (Socket.IO)`
>   - `8. POST /senhas/:id/chamar`
>   - `9. senha:chamada (Socket.IO)`
>   - `10. exibirChamada()`
>   - `síncrona`
>   - `assíncrona`
>   - `retorno`

[Caixa: callout]

Participantes **componentes**, não classes de domínio. O `loop` repete `init` até a TV responder `ready`.

[Fonte] 📖 Exemplo: projeto Vez — docs/10-projecao-tv.md (§3.5, §7); docs/diagramas/projecao-tv-2.svg

---

## Slide 34 / 60  ·  tipo: normal

[Rótulo do slide] Regra de ouro

# O diagrama de sequência valida a classe

[Caixa: card good]

### ✓ Toda seta é uma operação

A mensagem `chamarProxima(filaId, mesa)` obriga a classe **`SenhaService`** a ter essa operação. Se ela não existe no diagrama de classes, **um dos dois está errado**.

[Caixa: card bad]

### ✗ Tela no meio, sem função

`:TelaFila → :TelaSenha: mostrar()`. Tela que só repassa e não decide nada não ajuda a validar classe nenhuma.

[Caixa: callout ok]

**Mini-exercício.** No diagrama de retirar senha, a mensagem 5 é `validar(...)`. De qual classe é essa operação? **Resposta:** de `QrCodeService`, quem **recebe** a seta (e `SenhaService` passa a depender dela).

---

## Slide 35 / 60  ·  tipo: normal

[Rótulo do slide] Exemplo real: Vez

# O login do Vez em uma conversa de cinco participantes

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Login por e-mail e senha: caminho feliz"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência do login do Vez: Usuário, LoginScreen, AuthViewModel, API Vez e Banco de Dados, com mensagens síncronas, retornos tracejados e barras de ativação."
> - Descrição embutida no SVG (desc): "Diagrama de sequência com o Usuário, a tela LoginScreen, o AuthViewModel, a API Vez e o Banco de Dados. O usuário toca em Entrar, o ViewModel chama POST /auth/login, a API consulta o banco, confere a senha, guarda os tokens e responde 200; a tela mostra a Home."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Usuário`
>   - `LoginScreen`
>   - `AuthViewModel`
>   - `API Vez`
>   - `Banco de Dados`
>   - `toca em Entrar`
>   - `loginUser(email, senha)`
>   - `POST /auth/login {email, senha}`
>   - `buscarPorEmailComSenha(email)`
>   - `usuário`
>   - `confere ativo e senha`
>   - `armazenarTokens`
>   - `200 {token, refresh, usuario}`
>   - `AuthState.Success(user)`
>   - `mostra a Home`

[Fonte] 📖 Exemplo: projeto Vez, docs/13-mobile-v1a-auth-api.md e docs/06-api.md §9.1. FOWLER · Cap. 4 (p. 67)

---

## Slide 36 / 60  ·  tipo: normal

[Rótulo do slide] Fragmento alt

# O `alt` põe o segundo cenário no mesmo diagrama

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Login por e-mail e senha: caminhos alternativos"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência do login do Vez com fragmento alt: credenciais corretas (200), e-mail inexistente ou senha incorreta (401) e usuário inativo (403)."
> - Descrição embutida no SVG (desc): "Mesmo login, agora com fragmento alt de três operandos: usuário ativo com senha correta recebe 200 e tokens; e-mail inexistente ou senha incorreta recebe 401; usuário inativo recebe 403."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Usuário`
>   - `LoginScreen`
>   - `AuthViewModel`
>   - `API Vez`
>   - `Banco de Dados`
>   - `toca em Entrar`
>   - `loginUser(email, senha)`
>   - `POST /auth/login {email, senha}`
>   - `buscarPorEmailComSenha(email)`
>   - `usuário`
>   - `alt`
>   - `[usuário ativo e senha confere]`
>   - `[e-mail inexistente ou senha incorreta]`
>   - `[usuário inativo]`
>   - `armazenarTokens`
>   - `200 {token, refresh, usuario}`
>   - `401 Credenciais inválidas`
>   - `403`
>   - `Na tela: 200 vira AuthState.Success; 401 e 403 viram AuthState.Error com a mensagem.`

[Caixa: callout warn]

**Erro comum:** uma lifeline para cada classe do código. Mantenha **até 5 lifelines e ~12 mensagens**.

---

## Slide 37 / 60  ·  tipo: normal

[Rótulo do slide] Tipos de seta

# Síncrona espera, assíncrona segue, retorno devolve

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Logout: mensagem síncrona, assíncrona e retorno"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência do logout do Vez, com mensagens síncronas, uma mensagem assíncrona de ponta aberta e um retorno tracejado, e legenda dos três tipos."
> - Descrição embutida no SVG (desc): "Diagrama de sequência do logout: a tela chama logout() no AuthViewModel; o ViewModel limpa os tokens no TokenManager (síncrono), dispara POST /auth/logout para a API Vez sem esperar resposta (assíncrono), devolve AuthState.Idle e a tela navega para o login. Uma legenda mostra os três tipos de seta."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Tela (menu)`
>   - `AuthViewModel`
>   - `TokenManager`
>   - `API Vez`
>   - `logout()`
>   - `clearTokens()`
>   - `POST /auth/logout`
>   - `AuthState.Idle`
>   - `navega para o login`
>   - `síncrona: quem chama espera`
>   - `assíncrona: quem chama segue sem esperar`
>   - `retorno: a resposta volta`
>   - `API sem retorno desenhado: erros são ignorados.`

[Fonte] 📖 Exemplo: projeto Vez, diagrama mobile-v1a-auth-api-fluxo-7. FOWLER · Cap. 4 (p. 67)

---

## Slide 38 / 60  ·  tipo: normal

[Rótulo do slide] Renovação de sessão

# Token expirou? 401, refresh e nova tentativa, uma vez só

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Renovação de sessão: 401, refresh e nova tentativa"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência da renovação de sessão do Vez: OkHttp recebe 401, TokenAuthenticator chama POST /auth/refresh; alt: refresh aceito repete o pedido, refresh recusado leva a onSessionExpired."
> - Descrição embutida no SVG (desc): "Diagrama de sequência da renovação em 401: o OkHttp recebe 401 da API Vez e chama o TokenAuthenticator, que faz POST /auth/refresh. Fragmento alt: se o refresh for aceito, o pedido é repetido com o novo token e a resposta 200 chega à tela; se for recusado, a sessão expira e o usuário volta ao login."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Tela / ViewModel`
>   - `OkHttp`
>   - `TokenAuthenticator`
>   - `API Vez`
>   - `GET /recurso`
>   - `GET /recurso (Bearer antigo)`
>   - `401 Unauthorized`
>   - `authenticate(response)`
>   - `POST /auth/refresh {token}`
>   - `alt`
>   - `[refresh aceito]`
>   - `[refresh recusado]`
>   - `200 {novo token, novo refresh}`
>   - `request com novo Bearer`
>   - `GET /recurso (nova tentativa)`
>   - `200 OK`
>   - `resposta`
>   - `401`
>   - `null + onSessionExpired`
>   - `Segunda falha seguida, ou ausência de refresh token, também termina em onSessionExpired (volta ao login).`

[Caixa: callout]

O Vez tenta **no máximo 1 refresh** por pedido: por isso é `alt`, não `loop`.

---

## Slide 39 / 60  ·  tipo: normal

[Rótulo do slide] Fragmento opt

# O `opt` guarda o que só acontece às vezes

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Login com Google no app Android"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de sequência do login com Google no Vez: a API valida o idToken com o Google; alt para token inválido ou válido; opt para procurar por e-mail quando não achou pelo googleId."
> - Descrição embutida no SVG (desc): "Diagrama de sequência do login com Google: o AuthViewModel envia POST /auth/google; a API valida o token com o Google. Fragmento alt: token inválido recebe 401; token válido segue para a busca no banco, com fragmento opt para procurar por e-mail quando não achou pelo googleId, e responde 200 com os tokens."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `AuthViewModel`
>   - `API Vez`
>   - `Banco de Dados`
>   - `Google`
>   - `POST /auth/google {idToken, ...}`
>   - `verifyIdToken(idToken)`
>   - `payload {sub, email, nome}`
>   - `alt`
>   - `[token inválido]`
>   - `[token válido]`
>   - `401 Token Google inválido`
>   - `buscarPorGoogleId(sub)`
>   - `usuário ou nulo`
>   - `opt`
>   - `[não achou pelo googleId]`
>   - `buscarPorEmail(email)`
>   - `usuário ou nulo`
>   - `armazenarTokens`
>   - `200 {token, refresh, usuario}`

[Fonte] 📖 Exemplo: projeto Vez, docs/04-login-google.md (login Google, só no app Android). FOWLER · Cap. 4 (p. 67)

---

## Slide 40 / 60  ·  tipo: divider

[Rótulo do slide] Aulas 33 e 34

# Atividades e estados

---

## Slide 41 / 60  ·  tipo: normal

[Rótulo do slide] Comparação

# Dois olhares sobre o comportamento

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Descrição acessível embutida no SVG (aria-label): "Comparação entre diagrama de atividades, com nó inicial, decisão, bifurcação paralela e junção, e diagrama de máquina de estados de uma solicitação, com estados e transições nomeadas por evento."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Atividades × Estados — dois olhares sobre o comportamento`
>   - `Atividades seguem o processo. Estados seguem um objeto. Confundir os dois é o erro mais comum desta unidade.`
>   - `Diagrama de Atividades`
>   - `Segue o fluxo do processo: quem faz o quê, em que ordem`
>   - `Receber solicitação`
>   - `setor?`
>   - `[interno]`
>   - `[externo]`
>   - `Atribuir ao setor`
>   - `Encaminhar externo`
>   - `Notificar munícipe`
>   - `Registrar log`
>   - `Máquina de Estados`
>   - `Segue um objeto: por quais estados passa e o que`
>   - `provoca cada mudança`
>   - `criar()`
>   - `Aberta`
>   - `atribuir()`
>   - `Em atendimento`
>   - `encerrar()`
>   - `Encerrada`
>   - `avaliar()`
>   - `Avaliada`
>   - `devolver()`
>   - `cancelar()`
>   - `Use atividades quando a pergunta for "como o trabalho`
>   - `flui?" — há decisões, paralelismo e vários papéis.`
>   - `Use estados quando um objeto tiver ciclo de vida`
>   - `rico — e regras que dependem do estado atual.`
>   - `FOWLER, UML Essencial, cap. 11 atividades (p. 118) e cap. 10 máquina de estados (p. 110) · SOMMERVILLE 10ed · §5.4 · VALENTE · §4.6`

[Fonte] 📖 FOWLER · Cap. 11 (p. 118) e Cap. 10 (p. 110) · SOMMERVILLE 10ed · §5.4

---

## Slide 42 / 60  ·  tipo: normal

[Rótulo do slide] Atividades · exemplo Vez

# Cada losango precisa de guardas que cobrem tudo

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Atividades: criação de senha no Vez"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de atividades da criação de senha com quatro decisões e guardas sim/não."
> - Descrição embutida no SVG (desc): "Diagrama de atividades UML. Do nó inicial, a API recebe o pedido e testa quatro decisões com guardas: fila ativa, sem senha ativa do cidadão na fila, fila presencial e QR Code válido. Se alguma falha, o pedido é recusado; se todas passam, a senha é gravada com status AGUARDANDO."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Criação de senha (POST /filas/{id}/senhas): o fluxo de decisões`
>   - `Pergunta: em que ordem a API decide se a senha pode ser criada?`
>   - `Receber pedido`
>   - `fila`
>   - `ativa?`
>   - `[sim]`
>   - `sem senha`
>   - `ativa?`
>   - `[sim]`
>   - `presencial?`
>   - `[sim]`
>   - `[não: não exige QR Code]`
>   - `QR Code`
>   - `válido?`
>   - `[sim]`
>   - `Gravar a senha`
>   - `(AGUARDANDO)`
>   - `senha criada`
>   - `[não]`
>   - `[não]`
>   - `[não]`
>   - `Recusar o pedido (400 ou 409)`
>   - `pedido recusado`
>   - `Cada decisão tem duas guardas que não se sobrepõem e cobrem todos os casos.`

[Fonte] 📖 Exemplo: projeto Vez, docs/06-api.md §8.1 e §8.2 · FOWLER · Cap. 11 (p. 118)

---

## Slide 43 / 60  ·  tipo: normal

[Rótulo do slide] Paralelismo

# Fork abre caminhos; join espera todos

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Atividades: notificação com fork e join"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de atividades da notificação do Vez com fork, três ações paralelas e join."
> - Descrição embutida no SVG (desc): "Diagrama de atividades UML. Depois de gerar a notificação, uma barra de bifurcação (fork) dispara três ações em paralelo: persistir no MongoDB, emitir no Socket.IO e pedir o push ao Tocca. Uma barra de união (join) espera as três e leva ao nó final."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Notificação no Vez: três ações em paralelo`
>   - `Pergunta: o que acontece ao mesmo tempo, e quando o fluxo continua?`
>   - `Gerar a notificação`
>   - `(NotificacaoService.criar)`
>   - `fork`
>   - `Persistir no MongoDB`
>   - `(histórico e badge)`
>   - `Emitir no Socket.IO`
>   - `(notificacao:nova)`
>   - `Pedir o push ao Tocca`
>   - `(sem aguardar a entrega)`
>   - `join`
>   - `Fork: as três ações começam juntas, sem ordem entre elas.`
>   - `Join: o fluxo só segue quando as três terminam (aqui, quando o pedido de push foi enviado).`
>   - `Se o Tocca cair, as outras duas ações continuam.`

[Fonte] 📖 Exemplo: projeto Vez, docs/08-notificacoes.md · FOWLER · Cap. 11 (p. 118)

---

## Slide 44 / 60  ·  tipo: normal

[Rótulo do slide] Responsáveis

# Partições mostram quem faz cada ação

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Atividades com partições: criação de senha"
> - Descrição acessível embutida no SVG (aria-label): "Diagrama de atividades da criação de senha com partições Cidadão, App e API."
> - Descrição embutida no SVG (desc): "Diagrama de atividades UML com três partições: Cidadão, App e API. O cidadão escolhe a fila; o app decide se a fila é presencial, e nesse caso o cidadão lê o QR Code; o app envia POST /filas/{filaId}/senhas; a API valida o pedido e, se válido, grava a senha e o app a mostra; se inválido, o app mostra o motivo da recusa."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Criação de senha com partições: quem faz o quê`
>   - `Cidadão`
>   - `App`
>   - `API`
>   - `Escolher a fila`
>   - `presencial?`
>   - `[sim]`
>   - `Ler o QR Code`
>   - `[não]`
>   - `Enviar POST`
>   - `/filas/{id}/senhas`
>   - `Validar o pedido`
>   - `(fila, senha, QR)`
>   - `válido?`
>   - `[sim]`
>   - `Gravar a senha`
>   - `(AGUARDANDO)`
>   - `Mostrar a senha`
>   - `[não]`
>   - `Mostrar a recusa`
>   - `A raia diz quem executa a ação. As setas que cruzam a linha entre raias são as trocas entre quem faz o quê.`

[Fonte] 📖 Exemplo: projeto Vez, docs/06-api.md §8.1 · FOWLER · Cap. 11 (p. 118)

---

## Slide 45 / 60  ·  tipo: normal

[Rótulo do slide] Não confunda

# Atividade mostra o fluxo; sequência mostra a conversa

[Caixa: card good]

### Atividades

"Se a fila está ativa **e** o QR é válido, grava a senha."

Pergunta: quais passos e decisões, em que ordem?

[Caixa: card good]

### Sequência

App → API: `POST /filas/{filaId}/senhas`; API → Fila: consultar; API → App: `201`.

Pergunta: quem envia qual mensagem a quem?

[Caixa: callout]

**Ligação com Gherkin:** cenário com várias condições (`Dado … E …`) vira decisões no diagrama de atividades; cada cenário é um caminho.

[Fonte] 📖 Exemplo: projeto Vez, caso de uso Criar senha · FOWLER · Cap. 4 e Cap. 11

---

## Slide 46 / 60  ·  tipo: normal

[Rótulo do slide] Alerta

# A confusão que derruba a nota

[Caixa: card bad]

### ✗ Atividades com estados dentro

Caixas escritas:

*"Aberta" → "Em atendimento" → "Encerrada"*

Isso é máquina de estados desenhada com a notação errada.

[Caixa: card good]

### ✓ Atividades com ações

Caixas escritas:

*"Receber solicitação" → "Atribuir ao setor" → "Notificar munícipe"*

Verbo no infinitivo: alguém **faz** aquilo.

[Caixa: callout ok]

**Teste:** ação é o que **alguém faz**; estado é como o objeto **fica**. Se cabe um verbo no infinitivo, é ação.

---

## Slide 47 / 60  ·  tipo: normal

[Rótulo do slide] Decisão

# Preciso de máquina de estados?

Procure no seu diagrama de classes um atributo chamado `status`, `situacao` ou `estado`.

[Caixa: card good]

### Existe

Aquela classe tem **ciclo de vida** — e merece uma máquina de estados. As regras de transição precisam ser definidas.

[Caixa: card neutral]

### Não existe em nenhuma

Provavelmente o sistema **não precisa** do diagrama. Não force.

[Caixa: callout]

Estado é **situação**, não ação: "Em atendimento", não "Atender". A seta é rotulada com o **evento** que dispara a transição.

[Fonte] 📖 FOWLER · Cap. 10 (p. 110)

---

## Slide 48 / 60  ·  tipo: normal

[Rótulo do slide] Exemplo: projeto Vez

# A Senha tem cinco estados, e só três terminam o ciclo

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Máquina de estados da Senha no Vez"
> - Descrição acessível embutida no SVG (aria-label): "Máquina de estados da Senha no Vez."
> - Descrição embutida no SVG (desc): "Estado inicial leva a AGUARDANDO pelo evento criar. AGUARDANDO vai a EM_ATENDIMENTO por chamar e a CANCELADA por cancelar. EM_ATENDIMENTO tem transição interna rechamar, vai a FINALIZADA por finalizar, volta a AGUARDANDO na primeira ausência, vai a NAO_COMPARECEU na segunda ausência e a CANCELADA por cancelamento da equipe. FINALIZADA, NAO_COMPARECEU e CANCELADA são estados finais."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Ciclo de vida da Senha (estado de domínio)`
>   - `Transição = evento [guarda] / ação`
>   - `criar`
>   - `[sem senha ativa na fila]`
>   - `/ gera número e posição`
>   - `AGUARDANDO`
>   - `EM_ATENDIMENTO`
>   - `chamar`
>   - `[operador livre, fora de pausa]`
>   - `/ notifica o cidadão`
>   - `não compareceu`
>   - `[1ª ausência; rechamadas ≥ tolerância]`
>   - `/ vai para o fim da fila`
>   - `rechamar [operador responsável]`
>   - `/ reenvia o aviso (o estado não muda)`
>   - `finalizar`
>   - `[operador responsável ou admin]`
>   - `/ gera protocolo`
>   - `FINALIZADA`
>   - `não compareceu`
>   - `[2ª ausência; rechamadas ≥ tol.]`
>   - `/ libera o operador`
>   - `NAO_COMPARECEU`
>   - `cancelar`
>   - `[dono da senha ou equipe]`
>   - `cancelar`
>   - `[só a equipe da fila]`
>   - `CANCELADA`

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md (Apêndice A) e SenhaService.js . FOWLER · Cap. 10.

---

## Slide 49 / 60  ·  tipo: normal

[Rótulo do slide] Tabela de transições

# Cada seta vira uma linha e cada linha vira um teste

| Origem | Evento [guarda] | Destino |
| --- | --- | --- |
| (inicial) | criar [sem senha ativa na fila] | AGUARDANDO |
| AGUARDANDO | chamar [operador livre] | EM\_ATENDIMENTO |
| EM\_ATENDIMENTO | finalizar [operador responsável] | FINALIZADA |
| EM\_ATENDIMENTO | não compareceu [2ª ausência] | NAO\_COMPARECEU |

[Caixa: callout]

Teste também o que é **proibido**: finalizar uma senha `AGUARDANDO` deve dar 409.

[Fonte] 📖 Exemplo: projeto Vez — AusenciaService.js . A tabela completa tem 8 linhas.

---

## Slide 50 / 60  ·  tipo: normal

[Rótulo do slide] Dois níveis

# Estado de domínio e estado de tela usam a mesma notação

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Estados de tela no app do Vez: AuthState e FilasState"
> - Descrição acessível embutida no SVG (aria-label): "AuthState e FilasState."
> - Descrição embutida no SVG (desc): "Parte de cima, AuthState: Idle vai a Loading ao tocar Entrar; Loading vai a Success se a API responde 2xx ou a Error se falha; Error volta a Idle quando o usuário corrige os campos. Parte de baixo, FilasState: começa em Loading; vai a Success se a API devolve dados ou a Error se falha; de Success ou Error, refresh volta a Loading; buscar e filtrar mantêm Success."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `AuthState (tela de login)`
>   - `Idle`
>   - `toca Entrar`
>   - `/ chama loginUser`
>   - `Loading`
>   - `API responde 2xx`
>   - `Success(user)`
>   - `Home`
>   - `[credencial errada ou falha de rede]`
>   - `Error(message)`
>   - `usuário corrige os campos / clearError()`
>   - `FilasState (tela de listagem de filas)`
>   - `Loading`
>   - `ao abrir a tela:`
>   - `setAccessToken`
>   - `[API ok, com dados]`
>   - `Success(filas, total, ativas)`
>   - `[exceção ou`
>   - `resposta sem dados]`
>   - `Error(message)`
>   - `refresh()`
>   - `search() / filterByStatus()`

[Caixa: callout]

`Senha` vive no banco por dias. `Loading` vive milissegundos. Pergunte: o estado é de **quem**?

[Fonte] 📖 Exemplo: projeto Vez — AuthViewModel.kt e FilasViewModel.kt (app Android).

---

## Slide 51 / 60  ·  tipo: normal

[Rótulo do slide] Erro comum e exercício

# Estado não é ação, e toda seta tem evento

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Máquina de estados da Senha: errado e certo"
> - Descrição acessível embutida no SVG (aria-label): "Errado e certo."
> - Descrição embutida no SVG (desc): "Metade esquerda, errada: um estado chamado Chamar senha, que é uma ação; setas sem evento; e um estado Suspensa que nenhuma seta alcança. Metade direita, certa: criar leva a AGUARDANDO, chamar leva a EM_ATENDIMENTO, finalizar leva a FINALIZADA, e todas as setas têm evento."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Errado: três defeitos`
>   - `O que o aluno costuma desenhar`
>   - `Chamar senha`
>   - `1`
>   - `Ação, não estado`
>   - `cabe verbo: "chamar"`
>   - `2`
>   - `Seta sem evento`
>   - `o que dispara a mudança?`
>   - `EM_ATENDIMENTO`
>   - `FINALIZADA`
>   - `Suspensa`
>   - `3`
>   - `Inalcançável`
>   - `nenhuma seta chega a ele`
>   - `Teste: se cabe verbo no infinitivo, é ação.`
>   - `Certo: situação + evento`
>   - `Estados são como a Senha fica; a seta diz o que a muda`
>   - `criar`
>   - `AGUARDANDO`
>   - `chamar`
>   - `[operador livre]`
>   - `EM_ATENDIMENTO`
>   - `finalizar`
>   - `[operador responsável]`
>   - `FINALIZADA`
>   - `Todo estado é alcançável e toda seta tem evento.`

[Caixa: callout]

**Exercício.** O evento é `finalizar`. De quais estados da Senha ele é possível?   
**Resposta:** só de `EM_ATENDIMENTO`; dos demais, 409.

[Fonte] 📖 Exemplo: projeto Vez. FOWLER · Cap. 10 (p. 110).

---

## Slide 52 / 60  ·  tipo: divider

[Rótulo do slide] Aula 37

# Fechando a malha

---

## Slide 53 / 60  ·  tipo: normal

[Rótulo do slide] Rastreabilidade

# De onde sai cada diagrama

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Descrição acessível embutida no SVG (aria-label): "Cadeia de rastreabilidade do requisito ao diagrama: história de usuário gera caso de uso, substantivos viram classes, o cenário vira diagrama de sequência e o wireframe deve conter os dados das classes."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `De onde sai cada diagrama`
>   - `Nenhum diagrama nasce do nada. Se você não sabe de qual requisito ele veio, provavelmente inventou escopo.`
>   - `História de Usuário`
>   - `Como… Quero… Para…`
>   - `Unidade 2`
>   - `o "Quero"`
>   - `Caso de Uso`
>   - `o ator vem do "Como"`
>   - `a meta vem do "Quero"`
>   - `substantivos`
>   - `Diagrama de Classes`
>   - `os substantivos do domínio`
>   - `viram classes e atributos`
>   - `cenário Gherkin`
>   - `Sequência`
>   - `um cenário de aceite`
>   - `= um diagrama`
>   - `Máquina de Estados`
>   - `para a classe que tem`
>   - `atributo "status"`
>   - `Atividades`
>   - `o processo que a`
>   - `observação revelou`
>   - `Wireframe`
>   - `Unidade 3`
>   - `as telas do Site Map`
>   - `verificação cruzada: todo dado exibido no wireframe existe como atributo de alguma classe?`
>   - `e toda classe do modelo aparece em alguma tela — ou é estrutura interna justificada?`
>   - `Aula 37 — revisão cruzada UML × protótipo × requisitos`
>   - `É o momento de fechar a malha. Quatro perguntas que a monitoria do Milestone 2 vai fazer:`
>   - `1. Toda US tem caso de uso? 2. Todo dado da tela existe no modelo de classes?`
>   - `3. Todo cenário principal tem sequência? 4. Toda classe com "status" tem máquina de estados?`
>   - `SOMMERVILLE 10ed · §5.2 a §5.4 · FOWLER, UML Essencial, cap. 2 · rastreabilidade: PRESSMAN 9ed · §7.2.6`

[Fonte] 📖 SOMMERVILLE 10ed · §5.2 a §5.4 · rastreabilidade: PRESSMAN 9ed · §7.2.6

---

## Slide 54 / 60  ·  tipo: normal

[Rótulo do slide] Rastreabilidade · caso Vez

# Uma funcionalidade, seis elos: retirar senha

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Malha de rastreabilidade do Vez: retirar senha"
> - Descrição acessível embutida no SVG (aria-label): "Malha de rastreabilidade do Vez para retirar senha, do requisito V-RF-01 ao cenário de teste V-CT-01."
> - Descrição embutida no SVG (desc): "Cadeia de seis elos com IDs do Vez: requisito V-RF-01, história US-V01, caso de uso UC06, classes Fila e Senha, mensagem V-SQ-01 do diagrama de sequência e cenário de teste V-CT-01."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Malha do Vez: retirar senha, do requisito ao teste`
>   - `Cada elo cita o anterior pelo ID. Se você não sabe de onde um diagrama veio, ele é órfão.`
>   - `V-RF-01`
>   - `Requisito`
>   - `O cidadão retira uma senha em uma fila ativa da instituição.`
>   - `06-api.md §8.1 · POST /filas/{filaId}/senhas`
>   - `US-V01`
>   - `História de usuário`
>   - `Como cidadão, quero retirar uma senha, para esperar sem ficar de pé no balcão.`
>   - `Unidade 2`
>   - `UC06`
>   - `Caso de uso`
>   - `Retirar senha em fila (ator: Cidadão).`
>   - `Diagrama de casos de uso`
>   - `Classes`
>   - `Diagrama de classes`
>   - `Fila (ativa) 1 — 0..* Senha (numero, posicao, status).`
>   - `Substantivos do requisito`
>   - `V-SQ-01`
>   - `Sequência`
>   - `criar(filaId, qrCode?) → Senha {AGUARDANDO}; retorno 201.`
>   - `Cenário principal do caso de uso`
>   - `V-CT-01`
>   - `Cenário de teste`
>   - `Dado fila ativa e sem senha ativa, quando retira, então AGUARDANDO + 201.`
>   - `Também V-CT-02: já tem senha ativa → 409`
>   - `detalha`
>   - `vira a meta`
>   - `substantivos`
>   - `realiza`
>   - `verifica`
>   - `Dados do Vez (docs/06-api.md §8.1, docs/diagramas/api-uml-1, -6, -10). IDs V-… são didáticos, escolhidos para esta aula.`

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md §8.1 e diagramas api-uml-1, -6, -10 · IDs V-… didáticos · PRESSMAN 9ed · §7.2.6

---

## Slide 55 / 60  ·  tipo: normal

[Rótulo do slide] Panorama

# Cada diagrama responde a uma pergunta

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "Qual diagrama responde a qual pergunta, com o Vez"
> - Descrição acessível embutida no SVG (aria-label): "Mapa dos cinco diagramas UML com a pergunta de cada um e o exemplo do Vez."
> - Descrição embutida no SVG (desc): "Cinco diagramas UML (casos de uso, classes, sequência, atividades e estados), cada um com uma miniatura, a pergunta que responde e um exemplo do sistema Vez."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `Qual diagrama responde a qual pergunta? Exemplo: Vez`
>   - `Cinco diagramas, cinco perguntas, um só sistema.`
>   - `Casos de uso`
>   - `Quem faz o quê?`
>   - `No Vez`
>   - `Cidadão retira senha; Operador chama senha.`
>   - `Classes`
>   - `Como as peças se relacionam?`
>   - `No Vez`
>   - `Instituição 1—0..* Fila 1—0..* Senha.`
>   - `Sequência`
>   - `Em que ordem as peças conversam?`
>   - `No Vez`
>   - `Cidadão → API → SenhaService → repositório.`
>   - `Atividades`
>   - `Qual o fluxo, com decisões?`
>   - `No Vez`
>   - `Fila ativa? Já tem senha ativa? QR válido?`
>   - `Estados`
>   - `Em que estados a coisa vive?`
>   - `No Vez`
>   - `Senha: AGUARDANDO → EM_ATENDIMENTO → FINALIZADA.`
>   - `Os outros nove diagramas da UML existem, mas não fazem parte desta disciplina.`

[Fonte] 📖 Exemplo: projeto Vez — docs/06-api.md · FOWLER · Cap. 1

---

## Slide 56 / 60  ·  tipo: normal

[Rótulo do slide] Análise de impacto

# Com a malha, mudar um requisito vira roteiro

> **[DIAGRAMA 1 — figura vetorial (SVG) preservada visualmente no PDF]**
> - Título embutido no SVG: "O que acontece quando muda um requisito"
> - Descrição acessível embutida no SVG (aria-label): "Impacto de uma mudança do requisito V-RF-01 descendo a cadeia até os testes."
> - Descrição embutida no SVG (desc): "Impacto de uma mudança hipotética do requisito V-RF-01 do Vez descendo a cadeia: história, caso de uso, classes, sequência e testes, cada um marcado como alterado, a revisar, a conferir ou a testar."
> - Rótulos de texto presentes no diagrama (na ordem do código-fonte, não necessariamente a ordem visual):
>   - `O que acontece quando muda um requisito`
>   - `A malha vira mapa de impacto: a mudança desce a cadeia, e cada elo diz o que rever. Mudança hipotética, para estudo.`
>   - `V-RF-01`
>   - `Requisito`
>   - `MUDOU: máx. 1 senha ativa por instituição (hoje, por fila).`
>   - `ALTERADO`
>   - `US-V01`
>   - `História`
>   - `Critério de aceite novo: recusar se já tem senha em outra fila.`
>   - `REVISAR`
>   - `UC06`
>   - `Caso de uso`
>   - `Novo fluxo alternativo: cidadão já tem senha ativa na instituição.`
>   - `REVISAR`
>   - `Classes`
>   - `Diagrama`
>   - `Fila e Senha já se ligam à instituição; confirmar se falta algo.`
>   - `CONFERIR`
>   - `V-SQ-01`
>   - `Sequência`
>   - `Novo fragmento alt [já tem senha ativa na instituição] → 409.`
>   - `REVISAR`
>   - `V-CT-02`
>   - `Teste`
>   - `V-CT-02 (409 na mesma fila) é reescrito; V-CT-03 é novo.`
>   - `TESTAR`
>   - `Sem IDs ligando os elos, ninguém sabe o que revisar: o erro aparece depois, como defeito.`

[Fonte] 📖 Mudança hipotética sobre o exemplo do Vez (docs/06-api.md §8.1)

---

## Slide 57 / 60  ·  tipo: normal

[Rótulo do slide] Matriz de rastreabilidade

# Célula vazia na matriz é defeito à vista

| Requisito | US | UC | Classes | Seq. | Teste |
| --- | --- | --- | --- | --- | --- |
| V-RF-01 Retirar senha | US-V01 | UC06 | Fila, Senha | V-SQ-01 | V-CT-01, 02 |
| V-RF-02 Chamar/finalizar | US-V04 | UC24 | Senha | V-SQ-03 | **vazio** |
| V-RF-03 Cancelar senha | US-V05 | UC09 | Senha | **vazio** | V-CT-04 |
| V-RF-99 *(didático)* | US-V99 | **vazio** | — | — | — |

  

[Caixa: card bad]

**Requisito sem caso de uso**: a funcionalidade sumiu na modelagem.

[Caixa: card bad]

**Diagrama órfão**: nenhum requisito o pede; é escopo inventado.

[Fonte] 📖 Exemplo didático sobre o Vez — docs/01-visao-geral.md §4 e docs/06-api.md §8.1

---

## Slide 58 / 60  ·  tipo: normal

[Rótulo do slide] Checklist

# Antes da monitoria do Milestone 2

| # | Verificação | O que o defeito indica |
| --- | --- | --- |
| 1 | Toda US tem caso de uso? | Funcionalidade que sumiu na modelagem |
| 2 | Todo dado da tela existe como atributo? | A tela promete o que o modelo não entrega |
| 3 | Todo cenário principal tem sequência? | Ninguém pensou em como aquilo funciona por dentro |
| 4 | Toda classe com status tem máquina de estados? | As regras de transição não foram definidas |
| 5 | Toda classe aparece em alguma tela ou sequência? | Escopo inventado, ou estrutura interna não justificada |

[Caixa: callout warn]

A monitoria é o momento de descobrir o que falta — não a apresentação.

---

## Slide 59 / 60  ·  tipo: normal

[Rótulo do slide] Fontes

# Onde estudar

| Tópico | Fonte |
| --- | --- |
| Os três modos de usar UML | FOWLER · Cap. 1 (p. 25) e Cap. 2 (p. 39) |
| Casos de uso, «include», «extend» | FOWLER · Cap. 9 (p. 104) · SOMMERVILLE 10ed · §5.2.1 |
| Classes — básico e avançado | FOWLER · Cap. 3 (p. 52) e Cap. 5 (p. 77) |
| Generalização e agregação | SOMMERVILLE 10ed · §5.3.2 e §5.3.3 · VALENTE · §4.3 |
| Sequência | FOWLER · Cap. 4 (p. 67) · SOMMERVILLE 10ed · §5.2.2 |
| Atividades | FOWLER · Cap. 11 (p. 118) · VALENTE · §4.6 |
| Máquina de estados | FOWLER · Cap. 10 (p. 110) · SOMMERVILLE 10ed · §5.4 |
| Notação normativa | OMG · *UML* 2.5.1 · omg.org/spec/UML — em inglês |

[Fonte] 📖 A unidade mais bem servida do semestre: o Fowler cobre os cinco diagramas com capítulo e página conferidos.

---

## Slide 60 / 60  ·  tipo: title

[Rótulo do slide] Unidade 4 · encerramento

# Atividade ES-04

Revisar um diagrama de classes defeituoso e modelar o seu projeto em UML.

Entrega individual pelo AVA · 100 pontos

---
