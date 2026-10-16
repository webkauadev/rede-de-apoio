# Checklist de homologação do protótipo corrigido

Registrar por caso: data, ator/fixture, node inicial, passos, resultado observado, captura e aprovado/reprovado/não verificável. Esta execução validou configurações; os campos abaixo continuam pendentes de execução no Presentation.

## Entrada e permissão

- [ ] T01: sem credenciais válidas, Entrar mostra erro e não abre conteúdo protegido; tocar o campo permite demonstrar credenciais válidas, Loading e Home autorizada.
- [ ] T01 → Usar convite → T02: preencher a fixture válida, criar a identidade, ver confirmação e retornar ao login; nenhuma Home automática.
- [ ] T02: erro de confirmação permanece sem submissão; corrigir o campo habilita o caminho válido.
- [ ] QA Pessoa Idosa: autenticar pelo AuthShell comum e chegar somente ao próprio grafo de leitura.
- [ ] Pessoa Idosa: navegar T03–T15 e Settings; não encontrar escrita, correção, conclusão, administração, CSV, T16 ou T17.
- [ ] QA acesso direto negado: nenhum dado protegido é exibido; retorno permanece seguro e texto exige auditoria da tentativa.
- [ ] QA US-003: cadastro vazio dá erro; nome/data válidos produzem perfil pendente sem acesso ao cuidado.
- [ ] Constituir rede: confirmar um Principal e ao menos um Profissional; resultado mostra a mesma Pessoa Idosa e os vínculos definidos.

## Navegação e estados

- [ ] De T01, alcançar as 17 telas pelo fluxo aprovado; ir e voltar, inclusive depois de rolar.
- [ ] Navigation Bar mostra exatamente Home · Agenda · Diário · Saúde e indica o destino ativo.
- [ ] Settings comum chega aos seis destinos administrativos corretos; Settings read-only apenas aos quatro permitidos.
- [ ] LocalSubnav Saúde rola horizontalmente até Compromissos e preserva destino/estado ativo.
- [ ] Loading/Empty/Detail/Delayed/Corrected/Forbidden abertos pelos starting points de QA têm saída funcional e shell coerente.
- [ ] Exportação CSV, somente na fixture Principal, tem resultado e permite continuar; nenhum loop obrigatório de exportação.
- [ ] Nenhuma navegação abre a página-base 5926:1014, o arquivo externo ou formulários LEGACY full-page.

## Operações

- [ ] Agenda: criar, alterar, cancelar com confirmação e atribuir responsável; o resultado preserva o intervalo/entidade e as demais informações.
- [ ] Troca: Juliana solicita para Marina; antes da aceitação a responsável original permanece. No QA Marina, aceitar altera somente essa responsabilidade; recusar preserva Juliana.
- [ ] Plantonista Atual aparece como condição do intervalo, nunca como novo papel permanente.
- [ ] Medicamentos A/B/C e Item A: detalhe, posologia/agenda, responsável, administração e T05 mantêm a identidade selecionada.
- [ ] Administração registrada não oferece conclusão duplicada da mesma ocorrência no estado de resultado; não surge dose extra ou omissão clínica automática.
- [ ] Diário: cada Corrigir abre o próprio registro; cancelar retorna sem alteração; salvar cria nova versão com autoria/hora próprias e mantém o original.
- [ ] Ver correção abre a versão certa tanto no fluxo comum quanto no read-only; retornar conserva o contexto.
- [ ] Tarefas: concluir cada pendente nas listas com e sem a tarefa criada; somente o item acionado muda e os demais permanecem, sem reabertura.
- [ ] Contatos: Maria Helena, Carlos e Hospital abrem os próprios campos; alteração de telefone corresponde ao resultado; cancelar/salvar sem mudança não inventa alterações.
- [ ] Auditoria: os três eventos mostram atores, recursos, horários e resultados correspondentes, com retorno funcional.
- [ ] Papéis: testar quatro seleções; resultados refletem Apoio/Emergência escolhidos e preservam um único Principal.
- [ ] Preferências Apoio: testar quatro combinações opcionais, salvar e aguardar o feedback desaparecer sem perder seleção. Principal não desliga entregas obrigatórias.
- [ ] Inclusões T06/T08/T10/T13: novo registro, medicamento, consulta e membro aparecem mantendo os itens anteriores; nome, autoria e horários batem com o formulário.

## Sheets, notificações e mobile

- [ ] T06/T08/T09/T10/T11: abrir de baixo para cima com tela-base e scrim, preencher, salvar, cancelar e voltar.
- [ ] Em cada Sheet: envio vazio permanece em erro, o campo corrigido leva à fixture válida, e o erro permanece dentro do Sheet.
- [ ] Testar handle/gesto e Back no Presentation; conferir fechamento sem trocar acidentalmente a tela-base.
- [ ] T10 erro/anexo: nenhum campo, CTA ou mensagem ultrapassa a largura; arquivo aparece apenas no resultado com anexo.
- [ ] N01–N04: evento → aviso transitório → timeout/dismiss ou destino T04/T05/T07; não aparece central de notificações.
- [ ] N02 usa a responsável explícita elegível; N04 em H+15 informa ausência de registro sem afirmar que o cuidado não ocorreu.
- [ ] T04 comum/read-only e T06: rolar listas sem invadir header, LocalSubnav ou Navigation Bar; voltar e testar overlays após scroll.
- [ ] T12 acesso: mensagens completas e Editar perfil alcançável, inclusive em viewport pequeno.
- [ ] Targets apontados têm 48×48; tipografia estrutural tem pelo menos 14 px; status, categorias e margens mantêm os tokens entre estados irmãos.
- [ ] Inspecionar conteúdo sob feedback e confirmar que nenhuma ação crítica fica permanentemente encoberta.

## Gate final

- [ ] Casos FI-001–FI-008 reexecutados com evidência atual, incluindo T04/T06 viewport, T10 e Preferências.
- [ ] Nenhum P0/P1 funcional pendente; P2 residual com decisão humana registrada.
- [ ] Limitações de Figma e testes dependentes de backend/aplicação permanecem claramente separados de defeitos do protótipo.
- [ ] Revisão humana aprova homologação; somente depois decidir eventual merge/promoção canônica.
