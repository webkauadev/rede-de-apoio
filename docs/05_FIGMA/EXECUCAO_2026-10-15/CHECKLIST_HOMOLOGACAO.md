# Checklist de homologação do protótipo corrigido

> **LOTE 07 — 16/10/2026:** Presentation retornou Site Unavailable. Nenhum item foi marcado como aprovado. Os 39 cenários operacionais e os 3 gates receberam IDs CH-01–42; ver [roteiro assistido](HOMOLOGACAO_2026-10-16/ROTEIRO_ASSISTIDO.md), [resultado por caso/AUD](HOMOLOGACAO_2026-10-16/RESULTADOS.json) e [parecer](HOMOLOGACAO_2026-10-16/PARECER.md).

Registrar por caso: data, ator/fixture, node inicial, passos, resultado observado, captura e aprovado/reprovado/não verificável. Esta execução validou configurações; os campos abaixo continuam pendentes de execução no Presentation.

**Retomada em 16/10/2026:** Presentation retornou `Site Unavailable` também após uma recarga. Zero jornadas executadas; nenhum item aprovado nesta tentativa. Ver [registro e captura do impedimento](LOTE_07_RETOMADA_2026-10-16.md). Os itens abaixo continuam pendentes.

## Entrada e permissão

- [ ] **CH-01** T01: sem credenciais válidas, Entrar mostra erro e não abre conteúdo protegido; tocar o campo permite demonstrar credenciais válidas, Loading e Home autorizada.
- [ ] **CH-02** T01 → Usar convite → T02: preencher a fixture válida, criar a identidade, ver confirmação e retornar ao login; nenhuma Home automática.
- [ ] **CH-03** T02: erro de confirmação permanece sem submissão; corrigir o campo habilita o caminho válido.
- [ ] **CH-04** QA Pessoa Idosa: autenticar pelo AuthShell comum e chegar somente ao próprio grafo de leitura.
- [ ] **CH-05** Pessoa Idosa: navegar T03–T15 e Settings; não encontrar escrita, correção, conclusão, administração, CSV, T16 ou T17.
- [ ] **CH-06** QA acesso direto negado: nenhum dado protegido é exibido; retorno permanece seguro e texto exige auditoria da tentativa.
- [ ] **CH-07** QA US-003: cadastro vazio dá erro; nome/data válidos produzem perfil pendente sem acesso ao cuidado.
- [ ] **CH-08** Constituir rede: confirmar um Principal e ao menos um Profissional; resultado mostra a mesma Pessoa Idosa e os vínculos definidos.

## Navegação e estados

- [ ] **CH-09** De T01, alcançar as 17 telas pelo fluxo aprovado; ir e voltar, inclusive depois de rolar.
- [ ] **CH-10** Navigation Bar mostra exatamente Home · Agenda · Diário · Saúde e indica o destino ativo.
- [ ] **CH-11** Settings comum chega aos seis destinos administrativos corretos; Settings read-only apenas aos quatro permitidos.
- [ ] **CH-12** LocalSubnav Saúde rola horizontalmente até Compromissos e preserva destino/estado ativo.
- [ ] **CH-13** Loading/Empty/Detail/Delayed/Corrected/Forbidden abertos pelos starting points de QA têm saída funcional e shell coerente.
- [ ] **CH-14** Exportação CSV, somente na fixture Principal, tem resultado e permite continuar; nenhum loop obrigatório de exportação.
- [ ] **CH-15** Nenhuma navegação abre a página-base 5926:1014, o arquivo externo ou formulários LEGACY full-page.

## Operações

- [ ] **CH-16** Agenda: criar, alterar, cancelar com confirmação e atribuir responsável; o resultado preserva o intervalo/entidade e as demais informações.
- [ ] **CH-17** Troca: Juliana solicita para Marina; antes da aceitação a responsável original permanece. No QA Marina, aceitar altera somente essa responsabilidade; recusar preserva Juliana.
- [ ] **CH-18** Plantonista Atual aparece como condição do intervalo, nunca como novo papel permanente.
- [ ] **CH-19** Medicamentos A/B/C e Item A: detalhe, posologia/agenda, responsável, administração e T05 mantêm a identidade selecionada.
- [ ] **CH-20** Administração registrada não oferece conclusão duplicada da mesma ocorrência no estado de resultado; não surge dose extra ou omissão clínica automática.
- [ ] **CH-21** Diário: cada Corrigir abre o próprio registro; cancelar retorna sem alteração; salvar cria nova versão com autoria/hora próprias e mantém o original.
- [ ] **CH-22** Ver correção abre a versão certa tanto no fluxo comum quanto no read-only; retornar conserva o contexto.
- [ ] **CH-23** Tarefas: concluir cada pendente nas listas com e sem a tarefa criada; somente o item acionado muda e os demais permanecem, sem reabertura.
- [ ] **CH-24** Contatos: Maria Helena, Carlos e Hospital abrem os próprios campos; alteração de telefone corresponde ao resultado; cancelar/salvar sem mudança não inventa alterações.
- [ ] **CH-25** Auditoria: os três eventos mostram atores, recursos, horários e resultados correspondentes, com retorno funcional.
- [ ] **CH-26** Papéis: testar quatro seleções; resultados refletem Apoio/Emergência escolhidos e preservam um único Principal.
- [ ] **CH-27** Preferências Apoio: testar quatro combinações opcionais, salvar e aguardar o feedback desaparecer sem perder seleção. Principal não desliga entregas obrigatórias.
- [ ] **CH-28** Inclusões T06/T08/T10/T13: novo registro, medicamento, consulta e membro aparecem mantendo os itens anteriores; nome, autoria e horários batem com o formulário.

## Sheets, notificações e mobile

- [ ] **CH-29** T06/T08/T09/T10/T11: abrir de baixo para cima com tela-base e scrim, preencher, salvar, cancelar e voltar.
- [ ] **CH-30** Em cada Sheet: envio vazio permanece em erro, o campo corrigido leva à fixture válida, e o erro permanece dentro do Sheet.
- [ ] **CH-31** Testar handle/gesto e Back no Presentation; conferir fechamento sem trocar acidentalmente a tela-base.
- [ ] **CH-32** T10 erro/anexo: nenhum campo, CTA ou mensagem ultrapassa a largura; arquivo aparece apenas no resultado com anexo.
- [ ] **CH-33** N01–N04: evento → aviso transitório → timeout/dismiss ou destino T04/T05/T07; não aparece central de notificações.
- [ ] **CH-34** N02 usa a responsável explícita elegível; N04 em H+15 informa ausência de registro sem afirmar que o cuidado não ocorreu.
- [ ] **CH-35** T04 comum/read-only e T06: rolar listas sem invadir header, LocalSubnav ou Navigation Bar; voltar e testar overlays após scroll.
- [ ] **CH-36** T12 acesso: mensagens completas e Editar perfil alcançável, inclusive em viewport pequeno.
- [ ] **CH-37** Targets apontados têm 48×48; tipografia estrutural tem pelo menos 14 px; status, categorias e margens mantêm os tokens entre estados irmãos.
- [ ] **CH-38** Inspecionar conteúdo sob feedback e confirmar que nenhuma ação crítica fica permanentemente encoberta.

## Gate final

- [ ] **CH-39** Casos FI-001–FI-008 reexecutados com evidência atual, incluindo T04/T06 viewport, T10 e Preferências.
- [ ] **CH-40** Nenhum P0/P1 funcional pendente; P2 residual com decisão humana registrada.
- [ ] **CH-41** Limitações de Figma e testes dependentes de backend/aplicação permanecem claramente separados de defeitos do protótipo.
- [ ] **CH-42** Revisão humana aprova homologação; somente depois decidir eventual merge/promoção canônica.
