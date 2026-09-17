# ES-03 — Plano de Entregas Individuais (Parte C)

Material acadêmico individual. Não é documentação canônica de produto — fica em `ES-03/` para não se misturar com `docs/`.

Gerado a partir de:
- **Funcional:** GitHub `webkauadev/rede-de-apoio`, branch `main` (`docs/03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`, `docs/05_FIGMA/FIGMA_REGISTRY.yaml`, `AGENTS.md`).
- **Visual:** Figma `tcyj2fkTXei2CJbqaRxqCp`, página `Fluxo Final` (`5926:1014`), Site Map definitivo (página `SiteMap`, frame `5003:42`).
- **Enunciado:** `tmp/es03-fontes/FireShot Capture 020 - Atividade ES-03 — Prototipação, Site Map e IFML - [200.129.130.145].pdf`, Parte C.

Data da auditoria: 2026-09-17.

---

## Checklist literal da Parte C (extraída do enunciado, não parafraseada em requisitos novos)

> Aviso do próprio enunciado: "As partes A e B usam o caso fictício de reserva de laboratórios... A parte C usa o projeto do seu grupo FS-I. Não misture." — Parte C usa exclusivamente o projeto Rede de Apoio.

**C1 — Site Map do projeto (10 pts).** Construir o Site Map a partir das Histórias de Usuário do grupo. Deve conter:
- [ ] Home e as áreas de primeiro nível;
- [ ] no mínimo 3 níveis de profundidade;
- [ ] perfil de acesso marcado em cada área;
- [ ] uma tabela de rastreabilidade tela – US, mostrando de qual história cada tela nasceu.

**C2 — Wireframes de duas telas (24 pts).** Desenhar no Figma, **em média fidelidade**, duas telas do projeto: **uma de listagem e uma de formulário**. Cada tela deve ter:
- [ ] hierarquia visual clara, com a ação principal em destaque;
- [ ] conteúdo realista do domínio do projeto (nada de lorem ipsum);
- [ ] ao menos **dois componentes reutilizáveis criados como Component no Figma**;
- [ ] pelo menos **um estado de exceção** desenhado (vazio, erro ou sem permissão).

**C3 — Modelo IFML (6 pts).** Para a navegação entre as duas telas de C2, desenhar um modelo IFML simples contendo:
- [ ] duas Páginas (ViewContainer);
- [ ] o componente de visão da tela (ViewComponent);
- [ ] um evento que dispare a navegação;
- [ ] o fluxo (NavigationFlow);
- [ ] o vínculo de parâmetros (ParameterBinding), quando aplicável.
- Pode ser feito no Figma ou à mão.

**Entrega:** PDF individual com A, B e as evidências de C1 (imagem do Site Map) e C3 (imagem do IFML); link do Figma com permissão de visualização contendo os wireframes de C2. Nome de arquivo e prazo conforme publicado no AVA — **não confirmados neste plano** (ver Pendências).

> Nota de leitura: a tabela "Critérios de correção" do enunciado (pontuação por subitem de C1/C2/C3) foi extraída por OCR de um PDF de captura de tela; os itens ✔ acima são de leitura inequívoca e foram usados como a checklist operacional. A quebra fina de pontos por subcritério não é necessária para produzir a entrega e não foi usada para decidir nada abaixo.

---

## Resultado da auditoria Figma (Etapa 3)

Todas as 4 páginas individuais foram auditadas node a node (Sections 00–04, frames de tela, frames de estado, textos da tabela de rastreabilidade) contra `TRACEABILITY_MATRIX.md` atual.

- Estrutura Section 00–04 presente e íntegra nas 4 páginas.
- Distribuição de telas por responsável confere exatamente com `AGENTS.md` §6 e com o Site Map.
- Todos os frames em Section 02/03 carregam o prefixo de origem `[FLUXO FINAL]`, `[PROTO STATE]` ou `[OVERLAY]` — nenhum frame `LEGADO —` ou "SUPERSEDED BY BOTTOM SHEET" foi encontrado em nenhuma das 4 páginas.
- Bottom Sheets canônicos (`PAGE BASE + SCRIM + BOTTOM SHEET`) confirmados como `[OVERLAY]` em T06, T08, T09, T10, T11 — nenhum formulário full-page legado substituiu esses estados.
- Rastreabilidade da Section 04 conferida célula a célula contra `TRACEABILITY_MATRIX.md`: nenhuma relação incorreta ou inventada encontrada.
- Site Map: as 4 páginas referenciam a mesma cópia estrutural do artefato definitivo (`5003:42`), com badges de destaque discretos apenas nas telas do responsável da página; T01–T17 aparecem sem omissão; estados/overlays/ações não foram tratados como páginas do Site Map.
- **Erro objetivo encontrado e corrigido:** a página do Rhuan havia revertido o nome para "Ruan" (grafia antiga) desde a etapa anterior. Renomeada para "Rhuan" e verificada nesta sessão.
- Nenhuma outra divergência de nomenclatura, tela na página errada, US/RF incorretos, duplicação ou link quebrado foi encontrada.
- `Fluxo Final` (`5926:1014`) e a página `SiteMap` (`5003:3`) não foram alterados nesta etapa — apenas lidos.

---

## Links individuais definitivos

**KAUÃ**
Página: Kauã
Page ID: `5054:211`
Link direto: https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/Rede-de-Apoio?node-id=6080-6427

**RHUAN**
Página: Rhuan
Page ID: `5044:164`
Link direto: https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/Rede-de-Apoio?node-id=6082-7346

**HENRIQUE**
Página: Henrique
Page ID: `5048:190`
Link direto: https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/Rede-de-Apoio?node-id=6082-39223

**DAVID**
Página: David
Page ID: `5019:279`
Link direto: https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/Rede-de-Apoio?node-id=6082-40653

Cada link aponta diretamente para a Section 00 (bloco de identificação) da respectiva página organizada — não para o arquivo Figma genericamente. **Pendência:** confirmar manualmente no Figma que o link de compartilhamento do arquivo está configurado com permissão de visualização (view-only) antes do envio, conforme exigido pelo enunciado.

---

# Kauã

**Dados acadêmicos**
- Aluno: Kauã da Silva Fernandes
- Matrícula: 2025103070028
- Instituição: Instituto Federal de Educação, Ciência e Tecnologia de Rondônia — IFRO
- Campus: Vilhena
- Curso: Análise e Desenvolvimento de Sistemas
- Disciplina: Engenharia de Software
- Professor: Gilberto Pereira da Silva
- Semestre: 2026/2
- Local: Vilhena/RO
- Ano: 2026

**Link Figma:** https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/Rede-de-Apoio?node-id=6080-6427

**Telas responsáveis:** T06 — Diário de Cuidados · T16 — Preferências de Notificações · T17 — Auditoria

**C1:** Usar a Section 01 da página Kauã (cópia controlada do Site Map definitivo, `5003:42`), que já mostra T01–T17 completos, os 3+ níveis de profundidade (Home → 5 áreas → telas), perfil de acesso por card (NA/FP/FA·FE/PS) e a tabela de rastreabilidade tela–US embutida no próprio artefato. T06, T16 e T17 aparecem destacados com badge discreto. Nenhuma adaptação adicional é necessária além de recortar essa Section para o PDF.

**C2:**
- Tela escolhida 1 (listagem): T06 — Diário de Cuidados / Normal (`5926:1542`)
- Tela escolhida 2 (formulário): T06 — Novo Registro / Bottom Sheet (`5977:7182`)
- Motivo técnico: mesma tela pai, relação lista→criação mais direta do conjunto de Kauã; demonstra o padrão canônico PAGE BASE + SCRIM + BOTTOM SHEET (RN de cadastro operacional contextual).
- Relação navegacional: botão "+ Novo Registro" na listagem abre o Bottom Sheet (overlay, sem troca de página); ao salvar, o Bottom Sheet fecha e o novo registro aparece na lista (feedback "Registro salvo").
- Componentes reutilizáveis demonstráveis: Card de registro de cuidado, Badge de categoria (Mobilidade/Alimentação/Hidratação), Botão primário, campo Select/Field do formulário.
- Estado de exceção a apresentar: Validation Error do Bottom Sheet "Novo Registro" (`5977:7249`) — campo obrigatório não preenchido.
- Necessidade de derivação medium-fi: **sim** — telas de origem são alta fidelidade (Material 3); C2 exige média fidelidade. Derivação ainda não produzida (fora do escopo desta etapa), deve preservar estrutura/conteúdo/navegação exatos das telas acima, sem inventar campos.

**C3:**
- ENTRADA: T06 — Diário de Cuidados (ViewContainer "Diário"; ViewComponents: List "Registros do dia", Button "+ Novo Registro")
- EVENTO: tap em Button "+ Novo Registro" → abre overlay (Bottom Sheet)
- DESTINO: T06 — Novo Registro (ViewContainer "Novo Registro"; ViewComponents: Field categoria, Field horário, Field observação, Button "Salvar")
- PARÂMETROS: ParameterBinding do contexto (Pessoa Idosa ativa) para o formulário; no retorno, ParameterBinding do registro criado (categoria, horário, autor) para a List do T06.

**Evidências:** Section 01 (Site Map) e Section 02/03 (T06 normal/empty/novo registro/validation/success) da página Kauã, `5054:211`.
**Estado de exceção:** Validation Error — Novo Registro (`5977:7249`).
**Componentes reutilizáveis:** Card de registro, Badge de categoria, Botão primário, Bottom Sheet.

---

# Rhuan

**Dados acadêmicos:** PENDENTE (nome completo e matrícula ainda não documentados no GitHub/AVA).

**Link Figma:** https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/Rede-de-Apoio?node-id=6082-7346

**Telas responsáveis:** T03 — Home · T04 — Calendário de Cuidados · T09 — Tarefas · T11 — Compromissos

**C1:** Usar a Section 01 da página Rhuan — mesma cópia estrutural do Site Map definitivo das demais páginas, com T03, T04, T09 e T11 destacados. Mesmo raciocínio de C1 do Kauã: nenhuma adaptação estrutural adicional necessária.

**C2:**
- Tela escolhida 1 (listagem): T09 — Tarefas / Default (`5926:1886`)
- Tela escolhida 2 (formulário): T09 — Nova Tarefa / Bottom Sheet (`5974:6252`)
- Motivo técnico: mesmo padrão de cadastro operacional contextual do T06 de Kauã, aplicado a um domínio diferente (tarefas); relação lista→formulário mais direta entre as 4 telas de Rhuan.
- Relação navegacional: botão "+ Nova tarefa" abre o Bottom Sheet; ao salvar, tarefa nova aparece na lista com status "Pendente".
- Componentes reutilizáveis demonstráveis: Row de tarefa com Badge de status (Pendente/Concluída), Botão "Concluir", Botão primário "+ Nova tarefa", Bottom Sheet.
- Estado de exceção a apresentar: Empty de T09 (`5926:34452`) — "nenhuma tarefa hoje".
- Necessidade de derivação medium-fi: **sim**, mesmo racional do Kauã.

**C3:**
- ENTRADA: T09 — Tarefas (ViewContainer "Tarefas"; ViewComponents: LocalSubnav Saúde, List "Tarefas de cuidado", Button "+ Nova tarefa")
- EVENTO: tap em Button "+ Nova tarefa" → abre overlay
- DESTINO: T09 — Nova Tarefa (ViewContainer "Nova Tarefa"; ViewComponents: Field título, Select responsável, Field prazo, Button "Salvar")
- PARÂMETROS: ParameterBinding do responsável/prazo selecionados para o objeto Tarefa; no retorno, ParameterBinding da tarefa criada para a List do T09.

**Evidências:** Section 01 e Section 02/03 (T09 default/empty/nova tarefa/concluída) da página Rhuan, `5044:164`.
**Estado de exceção:** Empty — Tarefas (`5926:34452`).
**Componentes reutilizáveis:** Row de tarefa, Badge de status, Botão primário, Bottom Sheet.

---

# Henrique

**Dados acadêmicos:** PENDENTE (nome completo e matrícula ainda não documentados no GitHub/AVA).

**Link Figma:** https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/Rede-de-Apoio?node-id=6082-39223

**Telas responsáveis:** T05 — Detalhamento do Dia · T07 — Histórico de Cuidados · T08 — Medicamentos · T10 — Consultas e Recomendações

**C1:** Usar a Section 01 da página Henrique — mesma cópia estrutural do Site Map definitivo, com T05, T07, T08 e T10 destacados.

**C2:**
- Tela escolhida 1 (listagem): T08 — Medicamentos / Lista (`5926:1801`)
- Tela escolhida 2 (formulário): T08 — Cadastrar medicamento / Bottom Sheet (`5967:6307`)
- Motivo técnico: cadastro operacional contextual mais representativo do domínio de saúde entre as 4 telas de Henrique; formulário com múltiplos campos reais (nome, concentração, forma), bom para demonstrar validação.
- Relação navegacional: botão "+ Cadastrar" na lista abre o Bottom Sheet; ao salvar, medicamento aparece na lista ("Medicamento cadastrado").
- Componentes reutilizáveis demonstráveis: Card de medicamento com ícone e Tag de forma farmacêutica (Comprimido/Cápsula), Botão primário "+ Cadastrar", Bottom Sheet com Fields.
- Estado de exceção a apresentar: Validation Error unificado do Bottom Sheet "Cadastrar medicamento" (`5967:6333`) — nome/concentração/forma inválidos.
- Necessidade de derivação medium-fi: **sim**, mesmo racional das demais.

**C3:**
- ENTRADA: T08 — Medicamentos (ViewContainer "Medicamentos"; ViewComponents: List "Itens cadastrados", Button "+ Cadastrar")
- EVENTO: tap em Button "+ Cadastrar" → abre overlay
- DESTINO: T08 — Cadastrar medicamento (ViewContainer "Cadastrar medicamento"; ViewComponents: Field nome, Field concentração, Select forma, Button "Salvar")
- PARÂMETROS: ParameterBinding dos campos preenchidos para o objeto Medicamento; em erro, ParameterBinding de mensagens de validação para os Fields; em sucesso, ParameterBinding do medicamento criado para a List do T08.

**Evidências:** Section 01 e Section 02/03 (T08 lista/cadastrar/cadastrado) da página Henrique, `5048:190`.
**Estado de exceção:** Validation Error — Cadastrar medicamento (`5967:6333`).
**Componentes reutilizáveis:** Card de medicamento, Tag de forma farmacêutica, Botão primário, Bottom Sheet.

---

# David

**Dados acadêmicos:** PENDENTE (nome completo e matrícula ainda não documentados no GitHub/AVA).

**Link Figma:** https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/Rede-de-Apoio?node-id=6082-40653

**Telas responsáveis:** T01 — Login · T02 — Cadastro · T12 — Perfil da Pessoa Idosa · T13 — Rede de Cuidado · T14 — Contatos Importantes · T15 — Informações de Emergência

**C1:** Usar a Section 01 da página David — mesma cópia estrutural do Site Map definitivo, com T01, T02, T12, T13, T14 e T15 destacados (o maior número de telas destacadas entre os 4 integrantes).

**C2:**
- Tela escolhida 1 (listagem): T14 — Contatos Importantes / Default (`5926:2229`)
- Tela escolhida 2 (formulário): T14 — Adicionar contato (`5926:36528`)
- Motivo técnico: entre as 6 telas de David, é o par com relação listagem→formulário mais literal e direta (as demais — T01/T02, T12, T13, T15 — são autenticação, perfil ou não têm um formulário de criação de item de lista tão claro). Ao contrário dos pares dos colegas, aqui a navegação é por página cheia (não Bottom Sheet), o que também demonstra variação de NavigationFlow no IFML.
- Relação navegacional: botão "Adicionar contato" navega para a página de formulário (não overlay); ao salvar, retorna a T14 com o contato listado e feedback "Alteração salva".
- Componentes reutilizáveis demonstráveis: Card/Row de contato com Avatar e ação "Editar", Botão primário "Adicionar contato", AppHeader/Back, Fields de nome/telefone/tipo.
- Estado de exceção a apresentar: Validation Error de "Adicionar contato" (`5926:36591`) — telefone/nome obrigatório.
- Necessidade de derivação medium-fi: **sim**, mesmo racional das demais.

**C3:**
- ENTRADA: T14 — Contatos Importantes (ViewContainer "Contatos Importantes"; ViewComponents: List "Contatos cadastrados", Button "Adicionar contato")
- EVENTO: tap em Button "Adicionar contato" → NavigationFlow para nova página (não overlay)
- DESTINO: T14 — Adicionar contato (ViewContainer "Adicionar contato"; ViewComponents: Field nome, Field telefone, Select tipo de contato, Button "Salvar")
- PARÂMETROS: ParameterBinding dos dados do formulário para o objeto Contato; no retorno, ParameterBinding do contato criado para a List do T14.

**Evidências:** Section 01 e Section 02/03 (T14 default/empty/adicionar contato/validation) da página David, `5019:279`.
**Estado de exceção:** Validation Error — Adicionar contato (`5926:36591`).
**Componentes reutilizáveis:** Card de contato, Avatar, Botão primário, Field com validação.

---

## Pendências que impedem gerar os PDFs agora

1. **Derivações medium-fi de C2** (8 telas, 2 por integrante) ainda não produzidas — o enunciado exige média fidelidade explicitamente e as telas canônicas do Fluxo Final são alta fidelidade. As derivações devem preservar estrutura/conteúdo/navegação exatos, sem substituir as telas canônicas.
2. **Componentes Figma reais** (`COMPONENT`/`COMPONENT_SET`) para os ≥2 componentes reutilizáveis exigidos por tela em C2 ainda não foram criados como tal nas derivações medium-fi (hoje são instances do design system dentro do Fluxo Final).
3. **Diagramas IFML de C3** ainda não desenhados (nem no Figma nem à mão) — apenas planejados textualmente acima.
4. **Dados acadêmicos** de Rhuan, Henrique e David (nome completo, matrícula) — PENDENTES, não documentados no GitHub nem fornecidos nesta sessão.
5. **Permissão de visualização do link Figma** — não verificada/confirmada nesta sessão; precisa ser conferida manualmente antes do envio (o enunciado pede para abrir o link em janela anônima antes de enviar).
6. **Nome do arquivo PDF exigido pelo AVA** e **prazo de entrega** — o texto extraído do PDF do enunciado ficou ambíguo por OCR nesse trecho específico; confirmar literalmente no AVA antes de nomear os arquivos finais.
7. Nenhum PDF, commit, push ou PR foi realizado nesta etapa, conforme solicitado.
