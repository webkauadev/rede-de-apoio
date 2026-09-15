# Acesso da Pessoa Idosa — Modo Somente Leitura

Status: **canônico** a partir de 2026-09-14.

Origem: RF30 / US-036.

## Princípio

A Pessoa Idosa usa o mesmo aplicativo e a mesma autenticação, com conta vinculada ao próprio perfil. O modo é estritamente de consulta: nenhuma ação de escrita, correção, conclusão, administração ou exportação CSV é concedida.

A autorização continua subordinada ao próprio perfil e a RNF01. Estar na whitelist de telas não significa acesso a dados de outra pessoa idosa nem a recursos fora do escopo autorizado.

## Whitelist de telas

### Autenticação

- T01 Login.
- T02 Cadastro, quando aplicável à criação da própria conta.

### Leitura do próprio cuidado

- T03 Home / Visão Geral do Cuidado.
- T04 Calendário de Cuidados.
- T05 Detalhamento do Dia.
- T06 Diário de Cuidados.
- T07 Histórico de Cuidados e detalhe.
- T08 Medicamentos.
- T09 Tarefas.
- T10 Consultas e Recomendações.
- T11 Compromissos.
- T12 Perfil da Pessoa Idosa.
- T13 Rede de Cuidado, somente para consultar quem compõe a própria rede.
- T14 Contatos Importantes.
- T15 Informações de Emergência.

### Fora da whitelist

- T16 Preferências de Notificações.
- T17 Auditoria.

## Ações indisponíveis

- T04: criar, trocar ou administrar plantões.
- T06: Novo Registro e Corrigir.
- T07: Corrigir e Exportar CSV.
- T08: cadastrar/editar medicamento.
- T09: criar, atribuir e concluir tarefa.
- T10: criar registro ou anexar em contexto de escrita.
- T11: criar/editar compromisso.
- T12: editar perfil administrativamente ou gerenciar o acesso ao aplicativo.
- T13: vincular/desvincular membro, gerenciar papéis ou transferir Principal.
- T14: adicionar/editar contato.

## Navegação

A Navigation Bar permanece `Home · Agenda · Diário · Saúde`.

O `Settings / Management Sheet` é filtrado no contexto Pessoa Idosa e exibe apenas:

- T12 Pessoa Idosa;
- T13 Rede de Cuidado;
- T14 Contatos Importantes;
- T15 Informações de Emergência.

T16 e T17 ficam ausentes e qualquer tentativa direta de atingir rota não autorizada deve ser bloqueada e auditada.

## Figma

Registry do fluxo visual read-only:

`docs/05_FIGMA/ELDERLY_READ_ONLY_FLOW.yaml`

A implementação visual segue `STATE = PAGE BASE + DELTA MÍNIMO`: os baselines canônicos do `Fluxo Final` foram clonados e apenas as affordances incompatíveis com somente leitura foram removidas/desativadas.

## Segurança

- conta vinculada ao próprio perfil;
- sem papéis familiares;
- nunca Plantonista Atual;
- sem exportação CSV;
- senha definida pelo próprio titular;
- tentativa não autorizada bloqueada e registrada conforme RNF01/RNF03;
- consulta de auditoria não é concedida à Pessoa Idosa apenas pelo fato de sua tentativa negada ser auditada.
