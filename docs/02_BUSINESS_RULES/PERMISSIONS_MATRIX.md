# Matriz de Permissões

Esta matriz registra as regras canônicas aprovadas em 2026-09-14 para P03, P05, P06 e RF30/US-036.

| Categoria / papel efetivo | Consultar | Criar registros | Corrigir registro (RN-006) | Administrar rede | Exportar CSV |
|---|---|---|---|---|---|
| Pessoa Idosa | Sim, somente informações autorizadas do próprio cuidado | Não | Não | Não | Não |
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

## Regras gerais

- Plantonista Atual é condição operacional temporária, não categoria de usuário.
- Profissional da Saúde é categoria independente dos familiares.
- Acesso negado deve ser bloqueado e auditado.
