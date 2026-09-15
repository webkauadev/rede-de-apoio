# Users and Roles

## Familiar

“Familiar” é a categoria. Os papéis familiares são acumuláveis:

- Familiar Principal
- Familiar de Apoio
- Familiar de Emergência

Regras:

- deve existir exatamente um Familiar Principal ativo por pessoa idosa/rede;
- pode existir zero ou mais Familiares de Apoio;
- pode existir zero ou mais Familiares de Emergência;
- o Principal também pode acumular Apoio;
- Emergência pode acumular Principal ou Apoio;
- a permissão efetiva é a união das permissões positivas dos papéis acumulados, preservadas as condições contextuais e restrições explícitas de segurança/privacidade;
- uma transferência de Principal deve ser atômica: não pode existir intervalo com dois Principais nem com nenhum Principal;
- não duplicar notificações quando a mesma pessoa se qualificar por mais de um papel.

## Profissional da Saúde

Categoria independente dos familiares.

- pode haver mais de um profissional vinculado;
- deve existir ao menos um Profissional da Saúde vinculado à rede;
- não recebe papéis familiares;
- não deve ser representado como Principal, Apoio ou Emergência;
- pode produzir registros de saúde do seu domínio enquanto estiver vinculado e autorizado para o recurso correspondente.

## Plantonista Atual

Não é categoria de usuário, perfil permanente nem papel familiar.

É uma condição operacional temporária determinada pelo intervalo de um plantão.

Um Familiar vinculado ou um Profissional da Saúde pode ocupar a condição de Plantonista Atual durante determinado intervalo. Ao terminar o plantão, essa condição deixa de existir.

Quando uma ação exigir ser Plantonista Atual, acumular papéis familiares não elimina essa condição.

## Pessoa Idosa

RF30/US-036 estão aprovados canonicamente desde 2026-09-14.

A Pessoa Idosa é uma categoria de acesso própria, vinculada ao próprio perfil, e não recebe papéis familiares.

Regras:

- usa a mesma autenticação do aplicativo;
- não existe app separado;
- consulta apenas informações autorizadas relacionadas ao próprio cuidado;
- o acesso é somente leitura;
- não recebe papéis Principal, Apoio ou Emergência;
- não pode ser Plantonista Atual;
- não cria, corrige, conclui ou altera registros;
- não administra membros, papéis, plantões, tarefas ou demais estruturas da rede;
- não exporta CSV na primeira versão;
- a senha é definida pelo próprio titular; familiar não visualiza nem define essa senha em texto aberto;
- tentativas não autorizadas devem ser bloqueadas e registradas conforme RNF01/RNF03.

### Superfícies permitidas

- Autenticação: T01/T02.
- Leitura do próprio cuidado: T03–T15.
- T13 é permitido apenas para consultar quem compõe a própria rede; todas as ações administrativas ficam indisponíveis.
- T16 e T17 não fazem parte do modo Pessoa Idosa.

### Navegação

- a Navigation Bar permanece `Home · Agenda · Diário · Saúde`;
- Configurações, quando aberta pela Pessoa Idosa, mostra somente `Pessoa Idosa · Rede de Cuidado · Contatos · Emergência` (T12–T15);
- Preferências e Auditoria (T16/T17) ficam ausentes/inacessíveis;
- a indisponibilidade de uma ação deve ser representada por omissão ou estado desabilitado coerente com o padrão visual, sem criar uma nova função.
