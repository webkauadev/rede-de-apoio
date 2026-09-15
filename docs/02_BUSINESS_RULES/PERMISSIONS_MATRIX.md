# Matriz de Permissões

Esta matriz registra as regras canônicas aprovadas em 2026-09-14 para P03, P05, P06 e RF30/US-036.

| Categoria / papel efetivo | Consultar | Criar registros | Corrigir registro (RN-006) | Administrar rede | Exportar CSV |
|---|---|---|---|---|---|
| Pessoa Idosa | Sim, somente informações autorizadas do próprio cuidado e somente nas superfícies autorizadas | Não | Não | Não | Não |
| Familiar Principal | Sim | Sim, para registros compatíveis com o cuidado | Sim, quando possuir permissão efetiva para produzir o mesmo tipo de registro | Sim, na própria rede | Sim, somente histórico autorizado da Pessoa Idosa selecionada |
| Familiar de Apoio | Sim, conforme vínculo | Sim, somente quando for Plantonista Atual ou possuir responsabilidade operacional explicitamente atribuída | Sim, somente se a condição de escrita para o mesmo tipo de registro estiver satisfeita | Não | Não |
| Familiar de Emergência | Sim, conforme vínculo | Sim, somente quando for Plantonista Atual ou possuir responsabilidade operacional explicitamente atribuída | Sim, somente se a condição de escrita para o mesmo tipo de registro estiver satisfeita | Não | Não |
| Profissional da Saúde | Sim, conforme vínculo e autorização ao recurso | Sim, para registros de saúde do seu domínio enquanto vinculado e autorizado | Sim, para o mesmo tipo de registro de saúde quando mantiver a permissão efetiva correspondente | Não | Não |

## Regras de composição de papéis familiares

- Principal, Apoio e Emergência são papéis acumuláveis de uma mesma categoria **Familiar**.
- A permissão efetiva é a **união das permissões positivas** concedidas pelos papéis acumulados.
- Restrições explícitas de segurança, privacidade, escopo do recurso e condições operacionais prevalecem sobre a união.
- Acumular papéis não elimina uma condição contextual. Ex.: se a operação exige ser Plantonista Atual ou possuir responsabilidade operacional atribuída, essa condição continua obrigatória.
- Não duplicar notificações quando a mesma pessoa se qualificar por mais de um papel.
- Deve existir exatamente um Familiar Principal ativo por rede.

## Correção versionada

- Correção nunca sobrescreve nem apaga o registro original.
- Pode corrigir quem possuir, no momento da correção, permissão efetiva para produzir o mesmo tipo de registro.
- A correção gera novo registro vinculado ao original e preserva autoria, data/hora e histórico.
- Permissão apenas de leitura não concede permissão de correção.

## Exportação CSV

- Na primeira versão, somente o **Familiar Principal** pode exportar CSV.
- A exportação é contextual em T07 e limitada ao histórico autorizado da Pessoa Idosa selecionada.
- Toda exportação deve ser auditada conforme RF29/RNF03.

## Pessoa Idosa

RF30/US-036 estão aprovados canonicamente.

- usa a mesma autenticação do aplicativo;
- acessa somente informações autorizadas do próprio cuidado;
- possui acesso somente leitura;
- não recebe papéis familiares;
- não é Plantonista Atual;
- não cria, corrige, conclui ou altera registros;
- não administra a rede;
- não exporta CSV.

### Whitelist de leitura por tela

A whitelist abaixo é a superfície máxima de UI que pode ser apresentada à Pessoa Idosa. Dentro dessas telas, o backend/controle de acesso continua filtrando para o próprio perfil e para os recursos autorizados por RNF01.

| Tela | Pessoa Idosa | Restrições no modo read-only |
|---|---|---|
| T01 Login | Permitido | Autenticação compartilhada com o restante do app |
| T02 Cadastro | Permitido quando aplicável ao fluxo da própria conta | Não concede papel familiar |
| T03 Home | Leitura | Sem CTA administrativo |
| T04 Calendário | Leitura | Sem criar, trocar ou administrar plantão |
| T05 Detalhamento do Dia | Leitura | Sem ação de escrita |
| T06 Diário | Leitura | Sem Novo Registro e sem Corrigir |
| T07 Histórico | Leitura/detalhe | Sem Corrigir e sem Exportar CSV |
| T08 Medicamentos | Leitura | Sem cadastrar/editar |
| T09 Tarefas | Leitura | Sem criar, atribuir ou concluir |
| T10 Consultas e Recomendações | Leitura | Sem novo registro/anexo de escrita |
| T11 Compromissos | Leitura | Sem criar/editar |
| T12 Perfil da Pessoa Idosa | Leitura do próprio perfil | Sem edição administrativa |
| T13 Rede de Cuidado | Leitura da composição da própria rede | Sem vincular/desvincular/gerenciar papéis/transferir Principal |
| T14 Contatos Importantes | Leitura | Sem adicionar/editar |
| T15 Informações de Emergência | Leitura | Sem edição |
| T16 Preferências de Notificações | Não disponível | Configuração fora do modo estritamente read-only |
| T17 Auditoria | Não disponível | RF30/US-036 não concedem consulta de logs |

### Navegação no modo Pessoa Idosa

- a Navigation Bar continua `Home · Agenda · Diário · Saúde`;
- Configurações não vira uma área separada: quando aberta no contexto Pessoa Idosa, expõe somente T12, T13, T14 e T15;
- T16 e T17 devem ficar ausentes/inacessíveis nesse contexto;
- qualquer tentativa de atingir rota não autorizada deve ser bloqueada e auditada conforme RNF01/RNF03.

## Regras gerais

- Plantonista Atual é condição operacional temporária, não categoria de usuário.
- Profissional da Saúde é categoria independente dos familiares.
- Acesso negado deve ser bloqueado e auditado.
