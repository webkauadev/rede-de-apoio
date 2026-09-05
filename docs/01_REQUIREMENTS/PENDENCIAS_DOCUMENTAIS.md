# Pendências Documentais

Gerado na Fase 2 do Modo Agente Executor. Registra o que **falta** no Context Pack.
Nada aqui foi inventado. Nenhuma US, RF ou permissão foi criada.

Enquanto um item estiver aberto, nenhuma tela dependente dele pode ser considerada aprovada.

---

## P01 — Catálogo de User Stories (BLOQUEADOR)

`01_REQUIREMENTS/REQUIREMENTS.md` resolve as US com a frase
*"US-001 a US-035 seguem o catálogo aprovado do projeto"*.

O catálogo não está no repositório. Faltam, para cada US de 001 a 035:

- enunciado (Como <ator>, quero <ação>, para <objetivo>);
- RF de origem explícito;
- critérios de aceite;
- ator e permissão.

**US citadas na matriz de rastreabilidade e sem texto no pack:**
US001 · US002 · US008 · US009 · US015 · US017 · US024 · US026 · US033 · US035

**Impacto imediato:** US015 é a origem declarada de T06. A tela está sendo construída
a partir de RF11 + RF13 + RN-005 + RN-006, com US015 marcada como pendente.

**Ação:** exportar o catálogo do GitLab para `01_REQUIREMENTS/USER_STORIES.md`.

---

## P02 — Requisitos Não Funcionais (BLOQUEADOR)

Não existe documento de RNF. Mesmo assim:

| Referência | Onde aparece | Situação |
|---|---|---|
| RNF01 | `TRACEABILITY_MATRIX.md`, linha "Acesso negado" | não existe |
| RNF03 | `04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md`, origem do `AuditEntryCard` | não existe |

**Ação:** localizar RNF01 e RNF03 no GitLab e trazer o texto original.
Até lá, `RNF_PROPOSTA.md` cobre a lacuna **apenas como proposta**, sem valor de requisito.

---

## P03 — Permissão de escrita por categoria (BLOQUEADOR)

`02_BUSINESS_RULES/PERMISSIONS_MATRIX.md` responde a coluna "Alterar" com
"Conforme regra", "Conforme permissão", "Limitado" e "Conforme escopo".

Nenhuma dessas expressões permite decidir se um botão aparece na tela.

**Perguntas em aberto que bloqueiam T06:**

1. Familiar de Apoio pode criar registro de cuidado a qualquer momento, ou apenas durante plantão ativo atribuído a ele?
2. Familiar de Emergência pode criar registro de cuidado?
3. Profissional da Saúde pode criar registro de cuidado?
4. Quem pode criar um registro de **correção** (RN-006) — qualquer pessoa com permissão de escrita, ou apenas o autor do registro original?

**Ação:** decisão formal no GitLab, refletida em nova versão da matriz com verbos decidíveis.

---

## P04 — Superfície de exibição das notificações

`NOTIFICATIONS_RULES.md` define N01–N04 e proíbe Central de Notificações
"fora do Site Map". Nenhuma tela T01–T17 declara ser a superfície onde o
usuário lê essas notificações. Também não há ligação declarada entre
N01–N04 e RF10 / RF17 / RF25 / RF26.

**Impacto em T06:** N03 ("registro realizado gera comunicação") e N04
("atraso de 15 minutos") citam o diário, mas não está documentado se algo
aparece em T06. Nada foi adicionado à tela por causa disso.

---

## P05 — Permissão de exportação (RF28)

RF28 e `SCREENS_CATALOG.md` T07 ("consulta e exportação") não têm regra de
permissão. Exportar dados de saúde é a operação de maior risco de privacidade
do produto. **Bloqueia T07, não bloqueia T06.**

---

## P06 — Acumulação de papéis (RN-002)

RN-002 diz "conforme regras definidas", sem definir. Em aberto:
existe combinação proibida de papéis? No acúmulo, a permissão efetiva é a
união das permissões ou a mais permissiva?

`NOTIFICATIONS_RULES.md` já trata do efeito colateral do acúmulo antes da regra existir.

---

## P07 — Links das fontes de verdade

Nem o arquivo Figma nem o projeto GitLab estão referenciados em nenhum
documento do pack. As duas fontes de verdade declaradas são inalcançáveis
a partir do repositório.

**Ação:** adicionar as URLs em `05_FIGMA/FIGMA_GUIDELINES.md` e `06_GITLAB/GITLAB.md`.

---

## P08 — RF sem US ou tela rastreada

21 de 30 RF não possuem linha na matriz de rastreabilidade:

```
RF03 RF04 RF05 RF08 RF09 RF10 RF12 RF13 RF15 RF16 RF17
RF18 RF19 RF20 RF23 RF24 RF25 RF26 RF27 RF28 RF30
```

Correspondências prováveis (RF03→T12, RF12→T07, RF20→T11, RF27→T16)
**não foram criadas aqui** — estabelecer a ligação é decisão de requisitos.

**Impacto imediato:** T16 é a 2ª tela da fila e sua origem declarada é RF27,
que não tem US nem linha na matriz. P01 e P08 precisam ser resolvidos antes de T16.

---

## P09 — Telas sem origem funcional

T03 · T07 · T10 · T11 · T12 · T13 · T15 · T16

T03 Home é a raiz da área autenticada e é descrita apenas como
"Resumo do cuidado e acessos principais", sem definição de conteúdo.
