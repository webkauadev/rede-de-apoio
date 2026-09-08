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

> Os títulos acima estão documentados no GitHub, mas não equivalem automaticamente ao texto detalhado/critério de aceite de cada requisito. Quando a implementação depender de detalhe ausente, tratar como `migration_required`.

## Extensão em formalização

RF30 — Permitir acesso de consulta à Pessoa Idosa.

Status: proposta de evolução até aprovação no GitHub.

## User Stories

US-001 a US-035 são os identificadores oficiais atualmente conhecidos. A distribuição por responsável, relações já confirmadas e lacunas de conteúdo estão em `USER_STORIES_INDEX.yaml`.

O texto completo de US-001 a US-035 ainda não está presente no repositório; portanto, o catálogo está em **migração** e não deve ser inventado pelo agente.

### Proposta

US-036 — Consultar o próprio cuidado.

Como Pessoa Idosa, quero acessar informações relacionadas ao meu cuidado para acompanhar minha rotina sem alterar registros existentes.

Status: proposta vinculada ao RF30, ainda não aprovada como escopo canônico.
