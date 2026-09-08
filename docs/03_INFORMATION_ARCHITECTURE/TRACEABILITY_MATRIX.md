# Matriz de Rastreabilidade

Fonte canônica incorporada ao GitHub em 2026-09-08 a partir do Guia Mestre do projeto.

Cadeia oficial:

`RF/RNF → US → Tela/Ação → Estado → Componente`

## Requisitos e User Stories

| Requisito | User Stories | Tela/Ação principal |
|---|---|---|
| RF01 | US-001 | T02 |
| RF02 | US-002 | T01 |
| RF03 | US-003, US-004 | T12 |
| RF04 | US-005, US-006 | T13 |
| RF05 | US-007 | T13 |
| RF06 | US-008 | T04 |
| RF07 | US-009, US-010 | T04, T05 |
| RF08 | US-011 | T04/E05 |
| RF09 | US-012, US-013 | E06, E07 |
| RF10 | US-014 | N01 |
| RF11 | US-015 | T06 |
| RF12 | US-016 | T07 |
| RF13 | transversal | todos os registros relevantes |
| RF14 | US-017 | T08 |
| RF15 | US-018 | T08 |
| RF16 | US-019 | T08/E16 |
| RF17 | US-020 | N02 |
| RF18 | US-021 | T06/T05 |
| RF19 | US-022 | T10 |
| RF20 | US-023 | T11 |
| RF21 | US-024, US-025 | T09 |
| RF22 | US-026 | T14 |
| RF23 | US-027 | E10 |
| RF24 | US-028 | T15 |
| RF25 | US-029 | N03 |
| RF26 | US-030 | N04 |
| RF27 | US-031 | T16 |
| RF28 | US-032 | T07/E13 |
| RF29 | US-033 | T17 |
| RNF01 | US-035 | E27/T17 |
| RNF02 | US-034 | E12 |
| RNF03 | transversal / influencia RF29 | T17 / auditoria |
| RF30 (proposta) | US-036 (proposta) | estados read-only autorizados |

## Tela → User Stories

| Tela | Histórias principais |
|---|---|
| T01 | US-002 |
| T02 | US-001 |
| T03 | US-009, US-020, US-029, US-030 |
| T04 | US-008, US-009, US-011, US-012, US-013, US-014 |
| T05 | US-010; contexto US-019, US-020, US-021, US-023, US-025, US-030, US-034 |
| T06 | US-015, US-021, US-027 |
| T07 | US-016, US-032, US-034 |
| T08 | US-017, US-018, US-019, US-020 |
| T09 | US-024, US-025; lembrete/atraso quando aplicável |
| T10 | US-022, US-027 |
| T11 | US-023 |
| T12 | US-003, US-004 |
| T13 | US-005, US-006, US-007; suporte US-011 |
| T14 | US-026 |
| T15 | US-028 |
| T16 | US-031 |
| T17 | US-033, US-035 |

## Ações/estados não tratados como telas principais

E01 Credenciais inválidas; E02 Validação do cadastro; E03 Novo plantão; E04 Editar/cancelar plantão; E05 Atribuir plantonista; E06 Solicitar troca; E07 Aceitar/recusar troca; E08 Estados do dia; E09 Novo registro de cuidado; E10 Anexar documento/imagem; E11 Detalhe de registro; E12 Correção; E13 Exportação CSV; E14 Cadastro de medicamento; E15 Posologia/horários; E16 Administração de medicamento; E17 Criar/atribuir tarefa; E18 Concluir tarefa; E19 Consulta/recomendação; E20 Compromisso; E21 Cadastrar/atualizar pessoa idosa; E22 Vincular membro; E23 Desvincular membro; E24 Gerenciar papéis; E25 Transferir Principal; E26 Manter contato; E27 Acesso negado.

## Regra de estados

`STATE = PAGE BASE + DELTA MÍNIMO`

Erro, loading, empty, success, forbidden e demais estados não viram páginas independentes do Site Map.

## Regras

- Cada US tem exatamente um requisito de origem.
- Requisitos transversais podem influenciar critérios/DoD sem virar segunda origem.
- Nenhuma tela deve adicionar funcionalidade fora dessa cadeia sem nova decisão registrada no GitHub.
- Nenhum componente de domínio deve existir sem uso rastreável.
