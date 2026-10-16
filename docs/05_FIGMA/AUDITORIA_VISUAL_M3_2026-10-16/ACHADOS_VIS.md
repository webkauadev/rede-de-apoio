# Inventário de achados visuais

Cada VIS representa um padrão/causa, não cada instância repetida. Evidências estáticas atuais; nenhuma reação foi acionada. A prioridade é visual e não reclassifica a gravidade dos AUDs anteriores.

## VIS-001

**P1 — Grupo de ações estreito corta rótulos de operações críticas**

**Tela/estado:** T04, T08, T13 — 15 overlays novos de plantão, posologia/administração e constituição da rede.

**Node ID real:** [`8016:14070`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-14070). **Elemento:** Actions e instâncias dos dois botões.

**Problema observado:** O container de duas ações mede somente 157 px, embora os campos disponham de 326 px. Os botões ficaram com 73,5 e 71,5 px. Há rótulos cortados/que ultrapassam o próprio container em Criar plantão, Salvar plano e Confirmar registro; o pior exemplo é Confirmar cancelamento.

**Medidas/propriedades:** Actions 157×48; filhos 73,5×48 e 71,5×48; gap 12. O texto Confirmar cancelamento mede 163×20 e começa em x=−45,75 dentro do botão de 71,5 px. Não é uma falha de alvo mínimo: os botões ainda superam 48×48.

**Esperado:** Rótulos completos e alinhados, com ações distribuídas pela largura útil do Sheet e hierarquia primária/secundária preservada.

**Como reproduzir a inspeção:** abrir o nó acima na página 6223:6270, renderizar o estado sem editá-lo e comparar a região indicada com as capturas e propriedades registradas. Isso reproduz a evidência visual; não é relato de cliques no Presentation.

**Evidência visual:** [T04_shift_cancel](capturas/T04_shift_cancel.png), [T08_administration_A](capturas/T08_administration_A.png), [T13_constitution](capturas/T13_constitution.png). Referência comparativa: [T09_sheet_verified](capturas/T09_sheet_verified.png).

**Regra:** AI_DESIGN_CONTRACT §§3–4; ENTITY_ENTRY_BOTTOM_SHEET_PATTERN: zero clipping e CTAs legíveis; DESIGN_TOKENS: grid e composição de controles. M3: identificação clara da ação.

**Correção recomendada:** Usar a largura útil de 326 px para Actions. Preservar gap 12 e altura mínima 48; reservar largura suficiente ao texto de cada botão (secundário Hug, primário Fill, ou empilhar os rótulos longos). Dois botões iguais de 157 px ainda não acomodam o rótulo de 163 px mais padding: não limitar a correção a dividir a linha ao meio.

**Risco de regressão:** Baixo a médio: ajustar somente layout dos containers na página de trabalho, preservando IDs, instâncias e reactions. Conferir que nenhum hotspot herdado muda de posição ou cobre o irmão.

**Componentes/propagação:** Padrão repetido em 15 overlays. Button - Nova 1953:29720 está reutilizado; o problema está na composição local. Não editar o master ou a Foundation.

**Relação com a auditoria anterior:** Problema visual atual nos elementos acrescentados para AUD-002/003/004. Nenhum desses fluxos foi reprovado funcionalmente nesta auditoria.

**Justificativa da prioridade:** O corte impede identificar integralmente ações de confirmação; merece correção imediata. **Micro-lote:** MV-01.

Ocorrências medidas (todas Actions 157×48; filhos 73,5/71,5×48):

| Overlay | Raiz | Actions | Secundário | Primário |
|---|---|---|---|---|
| [OVERLAY] T04 / E03 — Novo plantão | [`8016:13861`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-13861) | [`8016:13876`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-13876) | `8016:15161` · Action / Cancelar | `8016:15167` · Action / Criar plantão |
| [OVERLAY] T04 / E04 — Alterar plantão | [`8016:13952`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-13952) | [`8016:13967`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-13967) | `8016:15173` · Action / Cancelar | `8016:15179` · Action / Salvar alteração |
| [OVERLAY] T04 / E04 — Cancelar plantão | [`8016:14055`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-14055) | [`8016:14070`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-14070) | `8016:15185` · Action / Cancelar | `8016:15191` · Action / Confirmar cancelamento |
| [OVERLAY] T04 / E05 — Atribuir responsável | [`8016:14158`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-14158) | [`8016:14173`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-14173) | `8016:15197` · Action / Cancelar | `8016:15203` · Action / Confirmar atribuição |
| [OVERLAY] T04 / E06 — Solicitar troca | [`8016:14249`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-14249) | [`8016:14264`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-14264) | `8016:15209` · Action / Cancelar | `8016:15215` · Action / Enviar solicitação |
| [OVERLAY] T04 / E07 — Responder à troca | [`8016:15427`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-15427) | [`8016:15442`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-15442) | `8016:15858` · Action / Recusar | `8016:15864` · Action / Aceitar |
| [OVERLAY] T08 / E15 — Posologia e horário / Medicamento A | [`8017:14551`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-14551) | [`8017:14566`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-14566) | `8017:14654` · Action / Cancelar | `8017:14660` · Action / Salvar plano |
| [OVERLAY] T08 / E16 — Registrar administração / Medicamento A | [`8017:14668`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-14668) | [`8017:14683`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-14683) | `8017:14864` · Action / Cancelar | `8017:14870` · Action / Confirmar registro |
| [OVERLAY] T08 / E15 — Posologia e horário / Medicamento B | [`8017:15253`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-15253) | [`8017:15268`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-15268) | `8017:15356` · Action / Cancelar | `8017:15362` · Action / Salvar plano |
| [OVERLAY] T08 / E16 — Registrar administração / Medicamento B | [`8017:15370`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-15370) | [`8017:15385`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-15385) | `8017:15566` · Action / Cancelar | `8017:15572` · Action / Confirmar registro |
| [OVERLAY] T08 / E15 — Posologia e horário / Medicamento C | [`8017:15955`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-15955) | [`8017:15970`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-15970) | `8017:16058` · Action / Cancelar | `8017:16064` · Action / Salvar plano |
| [OVERLAY] T08 / E16 — Registrar administração / Medicamento C | [`8017:16072`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-16072) | [`8017:16087`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-16087) | `8017:16268` · Action / Cancelar | `8017:16274` · Action / Confirmar registro |
| [OVERLAY] T13 / Constituir rede | [`8018:15830`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8018-15830) | [`8018:15845`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8018-15845) | `8018:16031` · Action / Cancelar | `8018:16037` · Action / Constituir |
| [OVERLAY] T08 / E15 — Posologia e horário / Item A | [`8025:16751`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8025-16751) | [`8025:16770`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8025-16770) | `8025:16771` · Action / Cancelar | `8025:16772` · Action / Salvar plano |
| [OVERLAY] T08 / E16 — Registrar administração / Item A | [`8025:16905`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8025-16905) | [`8025:16924`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8025-16924) | `8025:16925` · Action / Cancelar | `8025:16926` · Action / Confirmar registro |

As 15 linhas comprovam a composição estreita. Não se afirma que os rótulos curtos Aceitar/Recusar sofram o mesmo recorte dos rótulos longos. Seis overlays dessa família foram renderizados; o pior caso teve o texto medido diretamente.

## VIS-002

**P2 — Mensagem de confirmação de cancelamento fica truncada**

**Tela/estado:** T04 — Cancelar plantão.

**Node ID real:** [`8016:14147`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-14147). **Elemento:** Campo de contexto Confirmação; texto I8016:14147;1953:18941.

**Problema observado:** A mensagem sobre o cancelamento e a preservação do histórico foi colocada em controle de linha única, com overflow/clipping e sem acesso visual ao final da frase.

**Medidas/propriedades:** Controle 326×48; padding horizontal 10 px; texto intrínseco 346×20 e whitespace-nowrap. O texto excede a área útil de cerca de 306 px.

**Esperado:** A frase atual O plantão será cancelado; o histórico será preservado. deve ser lida integralmente antes da confirmação.

**Como reproduzir a inspeção:** abrir o nó acima na página 6223:6270, renderizar o estado sem editá-lo e comparar a região indicada com as capturas e propriedades registradas. Isso reproduz a evidência visual; não é relato de cliques no Presentation.

**Evidência visual:** [T04_shift_cancel](capturas/T04_shift_cancel.png). Referência comparativa: [T09_sheet_verified](capturas/T09_sheet_verified.png).

**Regra:** AI_DESIGN_CONTRACT: legibilidade e ausência de clipping; ENTITY_ENTRY_BOTTOM_SHEET_PATTERN: informações e CTAs íntegros. M3: clareza em decisões de ação.

**Correção recomendada:** Dar quebra de linha e altura dinâmica ao conteúdo de confirmação, mantendo o texto aprovado e o mesmo estado; ajustar o bloco para caber acima das ações. Não encurtar o conteúdo funcional para esconder o problema.

**Risco de regressão:** Baixo: a região pode crescer verticalmente. Validar a distância ao rodapé após MV-01.

**Componentes/propagação:** Composição local que reutiliza um Input; não há prova de problema em todas as instâncias de Input.

**Relação com a auditoria anterior:** Nova evidência visual do overlay criado para AUD-002; sem reexecução de cancelamento.

**Justificativa da prioridade:** A ação permanece identificável pelo título; o texto de apoio perde parte da informação. **Micro-lote:** MV-02.

## VIS-003

**P2 — Estado de acesso ativo corta a última linha de orientação**

**Tela/estado:** T12 — access_active.

**Node ID real:** [`6223:8927`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8927). **Elemento:** Supporting do card Acesso ao aplicativo 6223:8919.

**Problema observado:** O texto que esclarece o acesso somente leitura ocupa três linhas no render. Sua caixa permanece com altura de duas linhas, e a última linha alcança o limite inferior do card.

**Medidas/propriedades:** Supporting 326×40, fonte 14 e line-height 20; conteúdo renderizado em três linhas, cerca de 60 px. Card com 230 px; Supporting começa em y=174. Com três linhas, o conteúdo alcança y≈234, além do card.

**Esperado:** Orientação completa, incluindo a palavra concedida., com padding inferior; Editar perfil permanece alcançável pelo viewport rolável.

**Como reproduzir a inspeção:** abrir o nó acima na página 6223:6270, renderizar o estado sem editá-lo e comparar a região indicada com as capturas e propriedades registradas. Isso reproduz a evidência visual; não é relato de cliques no Presentation.

**Evidência visual:** [T12_access_active](capturas/T12_access_active.png). Referência comparativa: [T12_access_not_configured](capturas/T12_access_not_configured.png).

**Regra:** AI_DESIGN_CONTRACT §§3–4; DESIGN_TOKENS: texto legível e altura adequada; regra de layout sem clipping.

**Correção recomendada:** Usar altura automática no texto e Hug no card, preservando o padding. Reposicionar a ação seguinte pelo Auto Layout e manter o scroll existente.

**Risco de regressão:** Baixo a médio: o card crescerá aproximadamente 20 px. Conferir footer/scroll sem mudar acesso ou permissão.

**Componentes/propagação:** Confirmado somente em access_active. access_not_configured e invitation_sent foram renderizados e suas mensagens de duas linhas cabem; não generalizar a falha a esses estados.

**Relação com a auditoria anterior:** Recorte residual confirmado agora, relacionado ao tema de AUD-018. O status anterior não foi usado como prova; os outros dois estados não foram reprovados.

**Justificativa da prioridade:** Há recorte de orientação, mas o CTA não foi demonstrado inacessível. **Micro-lote:** MV-02.

## VIS-004

**P2 — Contornos de campos ainda usam borda decorativa de baixo contraste**

**Tela/estado:** T06, T14 — Novo registro do Diário; edição de Dr. Carlos Mendes.

**Node ID real:** [`6223:9150`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9150). **Elemento:** Categoria/Data/Hora e inputs do contato.

**Problema observado:** Parte dos controles mantém shadcn colors/general/input #E5E5E5 como contorno, mesmo com o contrato local exigindo o papel de borda interativa. A diferença é visível ao lado dos controles já normalizados.

**Medidas/propriedades:** T06: 6223:9150, 6223:9158 e 6223:9162; T14: 8006:33705, 8006:33708 e 8006:33711. Definições atuais confirmam #E5E5E5. Contraste do contorno: 1,166:1 sobre #F8F5FA; 1,139:1 sobre #F4F2FF; 1,198:1 sobre #FBF8FF. Referência #6E8496 produz 3,596:1, 3,514:1 e 3,696:1, respectivamente.

**Esperado:** Limites de campos identificáveis, com Border Interactive, distinguindo controles de divisores decorativos. A primitive visual de 36 px no Diário pode permanecer dentro do wrapper de 48 px.

**Como reproduzir a inspeção:** abrir o nó acima na página 6223:6270, renderizar o estado sem editá-lo e comparar a região indicada com as capturas e propriedades registradas. Isso reproduz a evidência visual; não é relato de cliques no Presentation.

**Evidência visual:** [T06_sheet](capturas/T06_sheet.png), [T14_edit_Carlos](capturas/T14_edit_Carlos.png). Referência comparativa: [T01_default](capturas/T01_default.png).

**Regra:** DESIGN_TOKENS: Cor — borda e piso 3:1 quando o limite é essencial à identificação; FIGMA_GUIDELINES: composição pode adaptar a primitive preservada. Referência Google/WCAG usada no contexto do controle, sem alegar certificação da aplicação.

**Correção recomendada:** Aplicar override semântico do contorno nas composições locais ou em wrapper apropriado, mantendo geometria e targets existentes. Não recolorir globalmente o kit Obra/shadcn nem alterar a Foundation protegida nesta missão.

**Risco de regressão:** Baixo localmente, alto se houver edição global indevida do kit. Conferir Error/Disabled e preservar a borda decorativa de cards.

**Componentes/propagação:** A primitive da Foundation Field 5644:330 também preserva #E5E5E5. Isso não revoga o contrato do produto: o override deve ocorrer na composição. A edição de outros contatos não foi inteiramente renderizada.

**Relação com a auditoria anterior:** Divergência residual de contorno, não uma reabertura genérica de AUD-021. As medições anteriores de milhares de textos não comprovavam todos os contornos.

**Justificativa da prioridade:** A legibilidade do texto é boa; a affordance dos campos é fraca e contraria o papel semântico documentado. **Micro-lote:** MV-03.

## VIS-005

**P2 — Destinos do perfil são desenhados como cards manuais**

**Tela/estado:** T12 — view; também observado no destino Rede de Cuidado dos estados de acesso.

**Node ID real:** [`6223:6719`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6719). **Elemento:** Destination / Rede de Cuidado e Destination / Acesso ao aplicativo 6223:6728.

**Problema observado:** As duas ações de navegação são frames manuais, preenchidos de branco, com borda e raio 16, visualmente equivalentes aos cards de informação. O padrão aprovado define destinos como Rows e reserva Card para entidade/conteúdo.

**Medidas/propriedades:** Frames 358×72, fill Surface, stroke Border Subtle e radius 16. Foundation Destination Row 5662:21869 existe no arquivo e o Settings 5652:443 demonstra rows transparentes sobre a surface, sem card individual.

**Esperado:** Superfície e componente de destino coerentes com a gramática de Rows, preservando título, apoio, ícone, chevron e área interativa.

**Como reproduzir a inspeção:** abrir o nó acima na página 6223:6270, renderizar o estado sem editá-lo e comparar a região indicada com as capturas e propriedades registradas. Isso reproduz a evidência visual; não é relato de cliques no Presentation.

**Evidência visual:** [T12_default](capturas/T12_default.png), [T12_access_active](capturas/T12_access_active.png). Referência comparativa: [REF_Settings](capturas/REF_Settings.png).

**Regra:** ENTITY_ENTRY_BOTTOM_SHEET_PATTERN: ENTIDADE/CONTEÚDO→CARD; DESTINO/AÇÃO DE MENU→ROW; COMPONENT_ARCHITECTURE: reutilização; MATERIAL3_VISUAL_DIRECTION §5.3.

**Correção recomendada:** Reutilizar/adaptar uma Row aprovada para comportar as duas linhas existentes, com surface herdada e sem card decorativo. Preservar destinos e permissões. Não mudar o card informacional de acesso ativo.

**Risco de regressão:** Médio: adaptar a primitive com texto de apoio pode exigir decisão sobre variante; não editar o master compartilhado ou remover conteúdo sem aprovação.

**Componentes/propagação:** Não foi alegado detach: o que foi comprovado é a presença de frames manuais. A referência de Row foi verificada no arquivo duplicado.

**Relação com a auditoria anterior:** Novo achado de semântica visual/reuse; não se questiona o funcionamento dos destinos aprovado pelo solicitante.

**Justificativa da prioridade:** A inconsistência é demonstrável pelo contrato de composição; não é preferência por outro arredondamento. **Micro-lote:** MV-04.

## VIS-006

**P2 — Gerenciar papéis troca o grid externo de 16 por 24 px**

**Tela/estado:** T13 — quatro seleções de papéis.

**Node ID real:** [`8010:12354`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8010-12354). **Elemento:** Main Content / Scroll e seus grupos.

**Problema observado:** Introdução, contexto, campos e CTAs da gestão de papéis usam margem de 24 px e largura 342 px. A base da mesma T13 e o grid canônico usam 16/358. Não há um card externo ou diálogo que justifique essa contração da página.

**Medidas/propriedades:** Seleções 0/1/2/3: 8010:11973, 6223:8289, 8010:12196, 8010:12352. Os grupos começam em x=24 e medem 342 px. Base 6223:6738: x=16 e largura 358 px. Diferença de 8 px por borda.

**Esperado:** Mesmo grid de página entre lista e estado de gestão; paddings internos de cards/rows continuam independentes.

**Como reproduzir a inspeção:** abrir o nó acima na página 6223:6270, renderizar o estado sem editá-lo e comparar a região indicada com as capturas e propriedades registradas. Isso reproduz a evidência visual; não é relato de cliques no Presentation.

**Evidência visual:** [T13_roles](capturas/T13_roles.png). Referência comparativa: [T13_default](capturas/T13_default.png).

**Regra:** DESIGN_TOKENS: grid 390/16/358; AI_DESIGN_CONTRACT: STATE = PAGE BASE + DELTA MÍNIMO.

**Correção recomendada:** Normalizar o padding externo da composição para 16 px, usando Fill nos grupos/ações. Manter checkbox, seleção, Principal e textos aprovados.

**Risco de regressão:** Baixo a médio: revisar reflow dos quatro estados e o alinhamento de Transferir Principal; preservar reactions e campos.

**Componentes/propagação:** O desvio é da composição da página; não alterar o master Checkbox. As quatro seleções foram medidas, sem extrapolar para todas as telas de gestão.

**Relação com a auditoria anterior:** Inconsistência visual atual de estado ligado a AUD-010; seleção e permissões não foram reavaliadas.

**Justificativa da prioridade:** Desvio mensurável de grid e consistência entre estados da mesma tela. **Micro-lote:** MV-04.

## VIS-007

**P3 — Link auxiliar muda de nome durante Loading do Login**

**Tela/estado:** T01 — default/invalid_credentials versus loading.

**Node ID real:** [`6223:6919`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6919). **Elemento:** Account Link / Action link.

**Problema observado:** O Login default e o erro mostram Usar convite; Loading mostra Criar conta. O carregamento não justifica trocar o rótulo desse destino auxiliar.

**Medidas/propriedades:** 6223:6297: Usar convite; 6223:6919: Criar conta. Capturas dos três estados confirmam a diferença. O alvo continua com 48 px de altura.

**Esperado:** Manter o rótulo aprovado Usar convite durante Loading, alterando apenas o feedback da ação de entrar.

**Como reproduzir a inspeção:** abrir o nó acima na página 6223:6270, renderizar o estado sem editá-lo e comparar a região indicada com as capturas e propriedades registradas. Isso reproduz a evidência visual; não é relato de cliques no Presentation.

**Evidência visual:** [T01_loading](capturas/T01_loading.png). Referência comparativa: [T01_default](capturas/T01_default.png).

**Regra:** AI_DESIGN_CONTRACT: STATE = PAGE BASE + DELTA MÍNIMO; consistência de rótulos entre estados.

**Correção recomendada:** Alinhar somente o texto auxiliar no Loading ao estado-base. Não mudar seu destino, sua reaction ou o fluxo de convite.

**Risco de regressão:** Baixo: conferir a largura do rótulo e seu alvo de 48 px após ajustar o texto.

**Componentes/propagação:** Texto local do AuthShell; nenhuma necessidade de editar Button ou autenticação.

**Relação com a auditoria anterior:** Achado de coerência de apresentação. A aprovação manual do Login é preservada; não houve alegação de falha de autenticação ou de cadastro.

**Justificativa da prioridade:** Rótulo compreensível e não bloqueante; ajuste de consistência de baixo impacto. **Micro-lote:** MV-05.

## VIS-008

**P3 — Scrim operacional está mais opaco que a referência aprovada**

**Tela/estado:** T06, T08, T09, T10, T11 — cadastros operacionais — comparação representativa.

**Node ID real:** [`6223:8967`](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8967). **Elemento:** Modal Scrim / Cadastrar medicamento.

**Problema observado:** O scrim do overlay usa aproximadamente 36%, enquanto o padrão aprovado da Foundation estabelece 32%. O escurecimento do fundo fica diferente do Settings de referência.

**Medidas/propriedades:** Export isolado de 6223:8967: RGBA (0,0,0,92), alpha 92/255≈36,08%; referência 5652:625: (0,0,0,82), alpha≈32,16%. O contexto do overlay confirma opacity-36. Valores quantizados do PNG, compatíveis com 36% e 32%.

**Esperado:** Mesmo papel Scrim e opacidade aprovada, preservando a hierarquia do overlay e o reconhecimento do fundo.

**Como reproduzir a inspeção:** abrir o nó acima na página 6223:6270, renderizar o estado sem editá-lo e comparar a região indicada com as capturas e propriedades registradas. Isso reproduz a evidência visual; não é relato de cliques no Presentation.

**Evidência visual:** [T08_sheet_context](capturas/T08_sheet_context.png). Referência comparativa: [REF_Settings](capturas/REF_Settings.png).

**Regra:** MATERIAL3_VISUAL_DIRECTION §5.3 e COMPONENT_MAP.foundation.material3_color_roles.scrim: paint opacity 0.32.

**Correção recomendada:** Após aprovação, uniformizar a opacidade local dos scrims operacionais ao padrão de 32%, verificando os equivalentes antes de propagar. Não alterar o token ou o master da Foundation.

**Risco de regressão:** Baixo: ajuste visual local; confirmar que não há opacidades multiplicadas. A captura isolada não comprova a composição real do Presentation sobre a tela-base.

**Componentes/propagação:** Comparação medida em T08; contextos representativos dos outros Sheets também expõem opacity-36. Não foi calculado alpha individual de todos os overlays do arquivo.

**Relação com a auditoria anterior:** Calibração local remanescente; não há alegação de falha funcional de abertura/fechamento.

**Justificativa da prioridade:** Diferença de cerca de quatro pontos percentuais, sem bloqueio demonstrado; refinamento de consistência. **Micro-lote:** MV-05.

## Sugestões opcionais — fora da contagem de 8 defeitos

- **SUG-01:** avaliar altura mais compacta para Sheets muito curtos, como Nova tarefa. A altura fixa de 704 px deixa grande espaço livre após o formulário; não há regra aprovada que torne essa altura um defeito obrigatório. Alterar o padrão global exige decisão própria.
- **SUG-02:** considerar reduzir a repetição de Acesso negado entre título de seção e card no estado Forbidden. Trata-se de acabamento de hierarquia textual, sem nova falha de permissão ou de navegação.

Não foram recomendadas substituição da Geist, paleta Google, troca do kit Obra/shadcn, criação de quinta aba, mudanças de permissão ou preenchimento de todas as ações como Primary.
