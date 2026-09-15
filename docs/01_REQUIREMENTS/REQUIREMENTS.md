# Requisitos — Rede de Apoio

Este diretório no GitHub é a fonte operacional dos requisitos do projeto. Consulte também:

- `REQUIREMENTS_INDEX.yaml` — inventário estruturado de RF/RNF;
- `USER_STORIES_INDEX.yaml` — inventário estruturado das US e estado de migração;
- `PENDENCIAS_DOCUMENTAIS.md` — lacunas que ainda impedem afirmar cobertura completa.

## Regra de rastreabilidade

Cada US possui exatamente um requisito de origem.
Um RF/RNF pode originar várias US.

Se o conteúdo canônico necessário não estiver no GitHub, marcar `migration_required`. Não consultar tracker externo nem completar por inferência.

## RF consolidados

RF01 Conta de acesso
RF02 Autenticação
RF03 Perfil da pessoa idosa
RF04 Vincular/desvincular membros
RF05 Papéis e permissões
RF06 Plantões
RF07 Calendário e histórico diário
RF08 Atribuição de plantonista
RF09 Trocas de plantão
RF10 Notificações de plantão
RF11 Diário de cuidados
RF12 Histórico de cuidados
RF13 Autoria e data/hora
RF14 Medicamentos
RF15 Posologia
RF16 Administração de medicamento
RF17 Lembretes obrigatórios
RF18 Sintomas/intercorrências
RF19 Consultas e recomendações
RF20 Compromissos
RF21 Tarefas
RF22 Contatos importantes
RF23 Anexos
RF24 Emergência
RF25 Notificações de registros
RF26 Atraso de 15 minutos
RF27 Preferências de notificações
RF28 Exportação CSV
RF29 Auditoria
RF30 Acesso de consulta à Pessoa Idosa

> Os títulos acima estão documentados no GitHub, mas não equivalem automaticamente ao texto detalhado/critério de aceite de cada requisito. Quando a implementação depender de detalhe ausente, tratar como `migration_required`.

## RF30 — acesso read-only da Pessoa Idosa

RF30 foi aprovado canonicamente em 2026-09-14.

Diretrizes principais:

- mesma autenticação do aplicativo;
- conta vinculada ao próprio perfil;
- somente leitura de informações autorizadas do próprio cuidado;
- sem papéis familiares;
- sem condição de Plantonista Atual;
- sem escrita, correção, conclusão ou administração;
- sem exportação CSV na primeira versão;
- acessos negados sujeitos a RNF01/RNF03;
- não criar aplicativo separado.

## User Stories

US-001 a US-036 são os identificadores oficiais atualmente aprovados.

A distribuição por responsável, relações confirmadas e rastreabilidade estão em `USER_STORIES_INDEX.yaml`.

O texto Como/Quero/Para, origem, owner e rastreabilidade conhecidos estão consolidados no índice. A ausência de checklist individual de critérios de aceite para todas as US continua acompanhada por P01/#73 e não deve ser preenchida por inferência.

### US-036 — Consultar o próprio cuidado

Como Pessoa Idosa, quero acessar informações relacionadas ao meu cuidado para acompanhar minha rotina sem alterar registros existentes.

Origem: RF30.
Owner: David.
Status: aprovado canonicamente.
