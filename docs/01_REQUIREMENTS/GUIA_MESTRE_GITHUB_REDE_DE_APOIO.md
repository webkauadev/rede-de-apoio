# Guia Mestre do GitHub — Rede de Apoio a Cuidadores de Idosos

Este documento incorpora ao GitHub, como fonte operacional única do projeto, o conteúdo funcional do Guia Mestre anteriormente usado para reconstruir o tracker. As regras abaixo preservam o conteúdo funcional e a rastreabilidade, mas substituem a dependência de tracker externo pela política GitHub-only.

## Autoridade

1. GitHub `webkauadev/rede-de-apoio`: requisitos, RNF, US, Issues, decisões e rastreabilidade.
2. Figma: design visual vigente.
3. RF30/US-036 permanecem proposta controlada até aprovação explícita no GitHub.

## Regras fundamentais

- RF, RNF e US são Issues.
- User Story não é Task.
- Cada US possui exatamente um requisito de origem.
- Um RF/RNF pode originar uma ou mais US.
- Requisitos/regras transversais podem influenciar critérios e DoD, mas não viram segunda origem.
- Plantonista Atual é condição operacional temporária, não usuário, perfil ou papel.
- Profissional da Saúde não recebe papéis familiares.
- Não existe chat.
- Não criar Central de Notificações, área principal de Documentos ou Exportações sem decisão de escopo.
- Registros não são sobrescritos para correção; a correção gera novo registro vinculado ao original.
- RF30/US-036 são proposta read-only para a Pessoa Idosa; não criar app separado.

## Responsáveis por telas

- David: T01, T02, T12, T13, T14, T15
- Rhuan: T03, T04, T09, T11
- Henrique: T05, T07, T08, T10
- Kauã: T06, T16, T17

## Responsáveis por requisitos aprovados

- David: RF01, RF02, RF03, RF04, RF05, RF11, RF12, RF22, RF24
- Rhuan: RF06, RF07, RF08, RF09, RF10, RF19, RF20, RF21
- Henrique: RF13, RF14, RF15, RF16, RF17, RF18, RF23
- Kauã: RF25, RF26, RF27, RF28, RF29, RNF01, RNF02, RNF03

## Catálogo RF/RNF/US

Os catálogos máquina completos estão em:

- `REQUIREMENTS_INDEX.yaml`
- `USER_STORIES_INDEX.yaml`
- `../06_GITHUB/ISSUE_REGISTRY.yaml`
- `../03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`

## Regra de estado

`STATE = PAGE BASE + DELTA MÍNIMO`

Erro, loading, empty, success, acesso negado e demais estados não criam páginas independentes no Site Map.

## Site Map oficial

T01 Login → T02 Cadastro → T03 Home.

Área autenticada:
- A1 Agenda e Plantões: T04, T05
- A2 Registros de Cuidado: T06, T07
- A3 Rotina e Saúde: T08, T09, T10, T11
- A4 Rede e Apoio: T12, T13, T14, T15
- A5 Controle e Privacidade: T16, T17

## Notificações

- N01: mudança de plantão → usuário afetado + Familiar Principal.
- N02: lembrete obrigatório → somente o usuário que ocupa Plantonista Atual naquele momento; não desativável.
- N03: cuidado registrado → Familiar Principal obrigatório; demais elegíveis configuráveis.
- N04: atraso após 15 min → Familiar Principal obrigatório; demais elegíveis configuráveis.
- Não duplicar notificações por acúmulo de papéis.

## Estados de cuidado

Programado, Pendente, Atrasado, Concluído, Sem registro de execução e Corrigido.

Atrasado exige ação programada com horário e 15 minutos sem registro. “Sem registro” não prova que o cuidado não ocorreu. Sintomas/intercorrências espontâneas não são atraso.

## Definition of Done de uma US

- critérios de aceite atendidos;
- origem RF/RNF correta;
- regras de negócio respeitadas;
- estados necessários revisados;
- componentes reutilizados quando possível;
- consistência visual validada;
- rastreabilidade atualizada;
- validação/monitoria realizada quando aplicável;
- Issue encerrada apenas quando realmente validada.
