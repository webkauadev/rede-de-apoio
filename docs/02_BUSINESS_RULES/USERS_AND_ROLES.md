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
- permissões familiares são derivadas dos papéis acumulados;
- uma transferência de Principal deve ser atômica: não pode existir intervalo com dois Principais nem com nenhum Principal.

## Profissional da Saúde

Categoria independente dos familiares.

- pode haver mais de um profissional vinculado;
- deve existir ao menos um Profissional da Saúde vinculado à rede;
- não recebe papéis familiares;
- não deve ser representado como Principal, Apoio ou Emergência.

## Plantonista Atual

Não é categoria de usuário, perfil permanente nem papel familiar.

É uma condição operacional temporária determinada pelo intervalo de um plantão.

Um Familiar vinculado ou um Profissional da Saúde pode ocupar a condição de Plantonista Atual durante determinado intervalo. Ao terminar o plantão, essa condição deixa de existir.

## Pessoa Idosa — proposta controlada

RF30/US-036 propõem acesso próprio somente de leitura.

Enquanto a proposta não for aprovada explicitamente no GitHub:

- não tratar a Pessoa Idosa como usuário aprovado do escopo;
- não criar app separado nem conjunto principal de telas;
- não criar permissões funcionais definitivas a partir da proposta.

Se aprovada, a proposta determina:

- conta própria usando a mesma autenticação do aplicativo;
- visualização apenas dos dados referentes ao próprio cuidado;
- nenhuma alteração de registros;
- nenhuma administração da rede;
- nenhum papel familiar;
- não pode ser Plantonista Atual;
- senha definida pela própria Pessoa Idosa, nunca exibida nem definida em texto aberto por familiar.
