# Pendências Documentais

Registra o que **ainda falta no GitHub** para que o repositório seja uma fonte de verdade funcionalmente completa. Todas as pendências P01–P09 agora possuem Issue canônica em `docs/06_GITHUB/ISSUE_REGISTRY.yaml`.

Nada aqui autoriza preencher lacunas por inferência ou consultar tracker externo. Correções puramente visuais/estruturais podem prosseguir quando não alterarem comportamento.

---

## P01 — Catálogo completo de User Stories (BLOQUEADOR) — Issue #73

US-001 a US-035 **já possuem Issues canônicas no GitHub** e estão registradas em `USER_STORIES_INDEX.yaml`. O que ainda falta, quando não documentado, é conteúdo funcional original:

- enunciado `Como <ator>, quero <ação>, para <objetivo>`;
- RF/RNF de origem explícito;
- critérios de aceite;
- ator e permissão.

As histórias incompletas permanecem com `content_status: migration_required`.

**Ação:** completar Issue #73 e as Issues individuais das US somente com conteúdo canônico aprovado incorporado ao GitHub.

---

## P02 — Requisitos Não Funcionais canônicos (BLOQUEADOR) — Issue #74

RNF01 e RNF03 agora possuem Issues canônicas de lacuna:

| Referência | Issue | Situação |
|---|---:|---|
| RNF01 | #35 | definição `migration_required` |
| RNF03 | #36 | definição `migration_required` |

`RNF_PROPOSTA.md` continua sendo apenas catálogo de propostas RNF-P e não substitui esses requisitos.

**Ação:** incorporar as definições originais aprovadas e atualizar `REQUIREMENTS_INDEX.yaml`.

---

## P03 — Permissão de escrita por categoria (BLOQUEADOR) — Issue #75

`PERMISSIONS_MATRIX.md` ainda usa expressões não decidíveis para `Alterar`.

Decisões abertas que afetam T06/E12:

1. Familiar de Apoio pode criar registro a qualquer momento ou apenas em plantão ativo atribuído?
2. Familiar de Emergência pode criar registro?
3. Profissional da Saúde pode criar registro?
4. Quem pode criar correção RN-006: qualquer pessoa com escrita ou apenas o autor original?

**Ação:** decidir na Issue #75 e atualizar a matriz com condições determinísticas.

---

## P04 — Superfície de exibição das notificações — Issue #76

N01–N04 existem, mas a superfície onde o usuário lê essas notificações ainda não está formalizada e a ligação com RF10/RF17/RF25/RF26 está incompleta.

**Restrição:** não criar Central de Notificações fora do Site Map nem inserir sino/área nova por preferência estética.

---

## P05 — Permissão de exportação (RF28) — Issue #77

RF28 (#32) e T07 preveem exportação, mas não há regra decidível de quem pode exportar dados de saúde.

**Impacto:** bloqueia a decisão funcional da ação de exportar em T07.

---

## P06 — Acumulação de papéis (RN-002) — Issue #78

RN-002 ainda não define combinações proibidas nem como compor a permissão efetiva quando um Familiar acumula Principal/Apoio/Emergência.

Também precisa ser reconciliado com a regra de evitar duplicidade de notificações.

---

## P07 — Fonte operacional e Figma — RESOLVIDO — Issue #79 (closed)

Resolvido em 2026-09-08:

- GitHub `webkauadev/rede-de-apoio` = fonte única operacional;
- Figma = fonte visual registrada em `FIGMA_REGISTRY.yaml`;
- `docs/06_GITHUB/` = workflow/estrutura de Issues;
- `ISSUE_REGISTRY.yaml` = referências canônicas das Issues;
- agentes não dependem de tracker externo.

---

## P08 — Completar rastreabilidade RF/RNF → US → Tela — Issue #80

Ainda faltam cadeias confirmadas para:

`RF03 RF04 RF05 RF08 RF09 RF10 RF12 RF13 RF15 RF16 RF17 RF18 RF19 RF20 RF23 RF24 RF25 RF26 RF27 RF28 RF30`

Algumas correspondências funcionais evidentes estão registradas como `candidate_origin` em `USER_STORIES_INDEX.yaml`, nunca como origem confirmada.

---

## P09 — Telas sem origem funcional completa — Issue #81

Telas afetadas:

`T03 · T07 · T10 · T11 · T12 · T13 · T15 · T16`

T03 Home continua sendo o caso mais crítico: o conteúdo do resumo ainda não tem cadeia funcional completa no GitHub.

---

## Regra operacional para agentes

- usar `migration_required` quando faltar origem/conteúdo funcional;
- usar `candidate_origin` somente para inferência explicitamente marcada;
- não consultar tracker externo;
- não inventar comportamento;
- registrar no PR a Issue P## que bloqueia a entrega;
- usar `docs/06_GITHUB/ISSUE_REGISTRY.yaml` para resolver RF/RNF/US/P## → Issue.
