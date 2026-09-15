# Pendências Documentais

Registra o que **ainda falta no GitHub** após as consolidações de 2026-09-08 e as decisões canônicas de 2026-09-14.

RF/RNF/US, origens, responsáveis e rastreabilidade de telas estão canônicos no GitHub. Nada aqui autoriza inventar detalhe funcional que as fontes aprovadas não fornecem.

---

## P01 — Critérios de aceite individuais das User Stories — Issue #73 — ABERTO

O catálogo canônico resolve para US-001–US-036:

- título;
- ator;
- enunciado Como/Quero/Para;
- exatamente um RF/RNF de origem;
- responsável;
- tela/ação relacionada.

As fontes **não enumeram um checklist de critérios de aceite específico para cada uma das 36 US**.

**Ação restante:** quando houver critérios individuais aprovados, incorporá-los às Issues sem extrapolar o requisito de origem e as regras de negócio.

---

## P02 — Requisitos Não Funcionais canônicos — Issue #74 — RESOLVIDO

- RNF01 — Controle de acesso a dados pessoais e de saúde — #35;
- RNF02 — Imutabilidade e correção versionada — #82;
- RNF03 — Trilha de auditoria rastreável e preservada — #36.

RNF02 é a origem única da US-034. RNF03 é transversal e influencia RF29/US-033 sem virar segunda origem.

---

## P03 — Permissão de escrita por categoria — Issue #75 — RESOLVIDO

Decisão canônica de 2026-09-14:

- Familiar Principal pode criar registros compatíveis com o cuidado;
- Apoio e Emergência podem escrever quando forem Plantonista Atual ou tiverem responsabilidade operacional explicitamente atribuída;
- Profissional da Saúde escreve registros de saúde do seu domínio enquanto vinculado/autorizado;
- correção RN-006 pode ser criada por quem tiver permissão efetiva para produzir o mesmo tipo de registro;
- permissão somente de leitura não concede correção.

---

## P04 — Superfície de exibição das notificações — Issue #76 — RESOLVIDO

N01–N04 usam feedback transitório global no AppShell e telas já existentes:

- N01 → T04;
- N02 → T05;
- N03 → T05 ou T07, conforme o registro;
- N04 → T05, podendo também refletir resumo operacional em T03.

Não criar Central de Notificações, sino dedicado ou nova área principal fora do Site Map.

---

## P05 — Permissão de exportação (RF28) — Issue #77 — RESOLVIDO

Na primeira versão:

- somente o Familiar Principal pode exportar CSV;
- a ação permanece contextual em T07;
- o arquivo é limitado ao histórico autorizado da Pessoa Idosa selecionada;
- a operação é auditada conforme RF29/RNF03;
- Apoio, Emergência, Profissional da Saúde e Pessoa Idosa não exportam.

---

## P06 — Composição de permissões em papéis acumulados — Issue #78 — RESOLVIDO

Regra canônica de 2026-09-14:

- permissão efetiva = união das permissões positivas dos papéis acumulados;
- restrições explícitas de segurança, privacidade, escopo e condições operacionais prevalecem;
- acumular papéis não remove uma condição contextual exigida;
- Principal continua único;
- notificações não duplicam por acúmulo.

---

## P07 — Fonte operacional e Figma — Issue #79 — RESOLVIDO

- GitHub = fonte única operacional;
- Figma = fonte visual/prototípica;
- `Fluxo Final` é a página canônica para usuário final;
- agentes não dependem de tracker externo.

---

## P08 — Rastreabilidade RF/RNF → US → Tela — Issue #80 — RESOLVIDO

Registrada em:

- `REQUIREMENTS_INDEX.yaml`;
- `USER_STORIES_INDEX.yaml`;
- `../03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`;
- `../07_AI_CONTEXT/SCREEN_REGISTRY.yaml`.

RF13 e RNF03 permanecem transversais. RF30/US-036 estão aprovados e rastreados.

---

## P09 — Telas sem origem funcional completa — Issue #81 — RESOLVIDO

T01–T17 possuem mapeamento de User Stories/origens no `SCREEN_REGISTRY.yaml` e na matriz de rastreabilidade.

---

## RF30 / US-036 — APROVADOS

O acesso próprio da Pessoa Idosa deixou de ser proposta controlada em 2026-09-14.

Regras principais:

- mesma autenticação do aplicativo;
- próprio perfil/cuidado autorizado;
- somente leitura;
- sem papéis familiares e sem Plantonista Atual;
- sem escrita, correção, administração ou CSV;
- sem app separado;
- acessos negados sujeitos a RNF01/RNF03.

---

## Regra operacional para agentes

- resolver RF/RNF/US pelo `ISSUE_REGISTRY.yaml`;
- respeitar exatamente uma origem por US;
- tratar RF30/US-036 como escopo aprovado read-only;
- tratar P03/P04/P05/P06 como decisões fechadas e usar as regras canônicas correspondentes;
- não inventar critérios individuais ausentes em P01;
- Figma resolve design visual/prototípico, nunca lacuna funcional não aprovada.
