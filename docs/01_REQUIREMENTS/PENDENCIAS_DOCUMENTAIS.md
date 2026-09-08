# Pendências Documentais

Registra o que **falta no GitHub** para que este repositório seja uma fonte de verdade completa para pessoas e agentes. Nada aqui autoriza preencher lacunas por inferência ou consultar tracker externo.

Enquanto um item funcional estiver aberto, telas que dependem dele não podem ser consideradas funcionalmente aprovadas. Correções puramente visuais/estruturais podem prosseguir quando não alterarem comportamento.

---

## P01 — Catálogo completo de User Stories (BLOQUEADOR)

`USER_STORIES_INDEX.yaml` já registra US-001 a US-035, responsáveis e as relações/títulos que o material atual permite confirmar. Porém, o GitHub ainda não contém o catálogo completo dessas 35 histórias.

Faltam, para cada US quando ainda não documentado:

- enunciado `Como <ator>, quero <ação>, para <objetivo>`;
- RF/RNF de origem explícito;
- critérios de aceite;
- ator e permissão;
- Issue/referência canônica no GitHub.

As histórias incompletas permanecem com `content_status: migration_required` em `USER_STORIES_INDEX.yaml`.

**Ação:** trazer o conteúdo original aprovado para o próprio GitHub e substituir `migration_required` por dados canônicos revisados. O agente não consulta sistema legado para isso durante a execução normal.

---

## P02 — Requisitos Não Funcionais canônicos (BLOQUEADOR)

O GitHub referencia RNFs sem possuir suas definições canônicas:

| Referência | Onde aparece | Situação no GitHub |
|---|---|---|
| RNF01 | `TRACEABILITY_MATRIX.md`, acesso negado | `migration_required` |
| RNF03 | `04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md`, origem do `AuditEntryCard` | `migration_required` |

`REQUIREMENTS_INDEX.yaml` registra explicitamente a lacuna.

**Ação:** migrar o texto original aprovado desses RNFs para o GitHub e revisar as referências. Até lá, `RNF_PROPOSTA.md` cobre apenas hipóteses controladas, sem valor de requisito aprovado.

---

## P03 — Permissão de escrita por categoria (BLOQUEADOR)

`02_BUSINESS_RULES/PERMISSIONS_MATRIX.md` responde a coluna "Alterar" com "Conforme regra", "Conforme permissão", "Limitado" e "Conforme escopo".

Nenhuma dessas expressões permite decidir de forma determinística se um botão aparece na tela.

**Perguntas em aberto que afetam T06:**

1. Familiar de Apoio pode criar registro de cuidado a qualquer momento, ou apenas durante plantão ativo atribuído a ele?
2. Familiar de Emergência pode criar registro de cuidado?
3. Profissional da Saúde pode criar registro de cuidado?
4. Quem pode criar um registro de **correção** (RN-006) — qualquer pessoa com permissão de escrita, ou apenas o autor do registro original?

**Ação:** registrar e aprovar a decisão no GitHub, atualizando a matriz com verbos decidíveis e vinculando a RF/US correspondente.

---

## P04 — Superfície de exibição das notificações

`NOTIFICATIONS_RULES.md` define N01–N04 e proíbe Central de Notificações fora do Site Map. Nenhuma tela T01–T17 declara ser a superfície onde o usuário lê essas notificações. Também não há ligação declarada entre N01–N04 e RF10 / RF17 / RF25 / RF26.

**Impacto em T06:** N03 (registro realizado gera comunicação) e N04 (atraso de 15 minutos) citam o diário, mas não está documentado se algo aparece em T06. Nada deve ser adicionado à tela sem origem no GitHub.

---

## P05 — Permissão de exportação (RF28)

RF28 e `SCREENS_CATALOG.md` T07 (consulta e exportação) não têm regra de permissão decidível. Exportar dados de saúde é uma operação sensível. **Bloqueia decisões funcionais de T07, não bloqueia T06.**

---

## P06 — Acumulação de papéis (RN-002)

RN-002 diz "conforme regras definidas", sem definir. Em aberto: existe combinação proibida de papéis? No acúmulo, a permissão efetiva é a união das permissões ou a mais permissiva?

`NOTIFICATIONS_RULES.md` já trata do efeito colateral do acúmulo antes da regra existir.

---

## P07 — Fonte operacional e Figma (RESOLVIDO EM 2026-09-08)

A arquitetura foi simplificada:

- GitHub `webkauadev/rede-de-apoio` = fonte única operacional;
- Figma = fonte visual, registrado em `docs/05_FIGMA/FIGMA_REGISTRY.yaml`;
- `docs/06_GITHUB/` documenta Issues e workflow;
- agentes não dependem de tracker externo.

---

## P08 — RF sem US ou tela rastreada

21 de 30 RF ainda não possuem linha confirmada na matriz de rastreabilidade:

```
RF03 RF04 RF05 RF08 RF09 RF10 RF12 RF13 RF15 RF16 RF17
RF18 RF19 RF20 RF23 RF24 RF25 RF26 RF27 RF28 RF30
```

Correspondências prováveis não devem ser criadas por inferência. A ligação precisa ser migrada/aprovada no GitHub.

**Impacto imediato:** T16 é associada conceitualmente a RF27 nos documentos de tela, mas ainda falta cadeia US/rastreabilidade completa no GitHub. P01 e P08 precisam ser resolvidos antes de decisões funcionais autônomas nessa tela.

---

## P09 — Telas sem origem funcional completa

T03 · T07 · T10 · T11 · T12 · T13 · T15 · T16

T03 Home é o caso mais crítico: é a raiz da área autenticada e é descrita como "Resumo do cuidado e acessos principais", sem definição completa de conteúdo rastreável no GitHub.

---

## Regra operacional para agentes

Para qualquer item acima:

- usar `migration_required` quando faltar origem funcional;
- não consultar tracker externo;
- não inventar comportamento;
- registrar a pendência no PR quando ela afetar a entrega.
