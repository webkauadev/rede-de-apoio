# Pendências Documentais

Registra o que **ainda falta no GitHub** após a incorporação do Guia Mestre em 2026-09-08.

RF/RNF/US, origens, responsáveis e rastreabilidade de telas agora estão canônicos no GitHub. Nada aqui autoriza inventar detalhe funcional que o Guia Mestre não fornece.

---

## P01 — Critérios de aceite individuais das User Stories — Issue #73 — ABERTO

O Guia Mestre resolveu para US-001–US-035:

- título;
- ator;
- enunciado Como/Quero/Para;
- exatamente um RF/RNF de origem;
- responsável;
- tela/ação relacionada.

O guia **não enumera um checklist de critérios de aceite específico para cada uma das 35 US**. As Issues individuais já registram essa limitação.

**Ação restante:** quando houver critérios individuais aprovados, incorporá-los às Issues sem extrapolar o RF/RNF de origem e as regras de negócio.

---

## P02 — Requisitos Não Funcionais canônicos — Issue #74 — RESOLVIDO

Resolvido pelo Guia Mestre:

- RNF01 — Controle de acesso a dados pessoais e de saúde — Issue #35;
- RNF02 — Imutabilidade e correção versionada — Issue #82;
- RNF03 — Trilha de auditoria rastreável e preservada — Issue #36.

RNF02 é a origem única da US-034. RNF03 é transversal e influencia RF29/US-033 sem virar segunda origem.

---

## P03 — Permissão de escrita por categoria — Issue #75 — ABERTO

O Guia Mestre confirma a estrutura de categorias/papéis, mas não responde de forma totalmente determinística todas as permissões de escrita.

Decisões ainda abertas que afetam T06/E12:

1. Familiar de Apoio pode criar registro a qualquer momento ou apenas em plantão ativo atribuído?
2. Familiar de Emergência pode criar registro de cuidado?
3. Profissional da Saúde pode criar registro de cuidado em quais contextos?
4. Quem pode criar correção RN-006/RNF02: qualquer pessoa com escrita ou apenas o autor original?

---

## P04 — Superfície de exibição das notificações — Issue #76 — ABERTO

A origem e os destinatários agora estão definidos:

- N01 → RF10 / US-014;
- N02 → RF17 / US-020;
- N03 → RF25 / US-029;
- N04 → RF26 / US-030.

O que ainda falta é a decisão visual/arquitetural de **onde** cada aviso é lido/apresentado nas telas existentes.

**Restrição:** não criar Central de Notificações fora do Site Map nem nova área por preferência estética.

---

## P05 — Permissão de exportação (RF28) — Issue #77 — ABERTO

RF28 / US-032 / T07 / E13 estão totalmente rastreados, mas o Guia Mestre diz apenas “históricos autorizados”. Ainda falta definir de forma determinística quem pode exportar dados de saúde e em quais condições.

---

## P06 — Composição de permissões em papéis acumulados — Issue #78 — PARCIAL

O Guia Mestre resolveu:

- papéis familiares são acumuláveis;
- Principal pode acumular Apoio;
- Emergência pode acumular Principal ou Apoio;
- permissões são derivadas dos papéis acumulados;
- notificações não podem duplicar por acúmulo.

Ainda falta formalizar a regra de composição quando permissões dos papéis entrarem em conflito (união, precedência ou condição específica).

---

## P07 — Fonte operacional e Figma — Issue #79 — RESOLVIDO

- GitHub = fonte única operacional;
- Figma = fonte visual;
- agentes não dependem de tracker externo.

---

## P08 — Rastreabilidade RF/RNF → US → Tela — Issue #80 — RESOLVIDO

Resolvido pelo catálogo completo do Guia Mestre e registrado em:

- `REQUIREMENTS_INDEX.yaml`;
- `USER_STORIES_INDEX.yaml`;
- `../03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`;
- `../07_AI_CONTEXT/SCREEN_REGISTRY.yaml`.

RF13 e RNF03 permanecem transversais; RF30/US-036 permanecem proposta.

---

## P09 — Telas sem origem funcional completa — Issue #81 — RESOLVIDO

T01–T17 agora possuem mapeamento de User Stories/origens no `SCREEN_REGISTRY.yaml` e na matriz de rastreabilidade.

T03 Home está explicitamente ligada a US-009, US-020, US-029 e US-030 e continua sendo recomendada como última tela de Rhuan na ordem de prototipação.

---

## Regra operacional para agentes

- resolver RF/RNF/US pelo `ISSUE_REGISTRY.yaml`;
- respeitar exatamente uma origem por US;
- não promover RF30/US-036 enquanto proposta;
- não inventar critérios individuais ausentes;
- registrar P03/P04/P05/P06 no PR quando afetarem uma entrega;
- Figma resolve somente design visual, nunca lacuna funcional.
