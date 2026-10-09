# 01 — Fontes, autoridade, limites e escopo

## Fonte de verdade consultada (2026-10-09)

- `README.md`, `AGENTS.md`, `docs/00_PROJECT_CONTEXT.md`, `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md`: operação do repositório.
- `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml`: **RF01–RF30** e **RNF01–RNF03**.
- `docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml`: **US-001–US-036** com única origem RF/RNF.
- `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml`: índice canônico da aprovação; os critérios textuais aprovados constam das Issues e do snapshot `ACCEPTANCE_CRITERIA_DRAFT.yaml` identificado pela aprovação em 2026-09-15; não adotar sua antiga etiqueta de “pending” como status atual.
- `docs/02_BUSINESS_RULES/BUSINESS_RULES.md`, `USERS_AND_ROLES.md`, `PERMISSIONS_MATRIX.md`, `NOTIFICATIONS_RULES.md`, `ELDERLY_READ_ONLY_ACCESS.md`, `AUDIT_RULES.md`.
- `docs/03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`, `SCREENS_CATALOG.md`: superfície e contexto das funcionalidades, **não catálogo de tabelas**.
- Documentação técnica externa: [16_REFERENCIAS_TECNICAS.md](16_REFERENCIAS_TECNICAS.md).

### Confirmado

1. Pessoas usuárias e Pessoa Idosa compartilham autenticação, mas a Pessoa Idosa é read-only na própria rede (RF30/US-036), sem papéis familiares, Plantonista Atual, administração, CSV, T16 ou T17.
2. Familiar é categoria; papéis Principal, Apoio e Emergência são acumuláveis (RN-001, RN-002). Profissional da Saúde é categoria separada; ao menos um vinculado por rede (RN-004).
3. Plantonista Atual decorre de um intervalo ativo (RN-003). Plantões têm operações de criação/alteração/cancelamento e solicitação/aceite/recusa de troca (RF06–RF09).
4. Registros são imutáveis e correções vinculam versões, sem sobrescrever original (RN-005, RN-006, RNF02).
5. Atraso é **15 minutos** para ação programada sem registro; ausência de registro não comprova não execução; sintomas espontâneos não atrasam (RF26).
6. Notificações N01–N04 e regras de obrigatoriedade/contexto; sem central/histórico dedicado (P04).
7. CSV só Familiar Principal, dentro de T07 e auditado (P05).
8. Toda leitura/escrita sensível deve aplicar escopo de usuário/rede/idoso; logar tentativas negadas (RNF01/RNF03).

### Propostas de implementação — ainda não viraram requisitos

- Quantidade e nomes de tabelas, tipos físicos, nomes das PK/FK, uso de IDs artificiais.
- Estratégia de papéis (atribuições com datas de vigência), registro de trocas, evento-base de histórico e abordagem de revisão.
- Regras de deduplicação operacional, restrições temporais, índices, estratégias transacionais.
- Detalhes de permissões por campo e caminhos de armazenamento dos anexos.
- Forma de coletar status de convite/acesso da Pessoa Idosa (há estados visuais, mas o protocolo não está formalizado como modelo).

### Limite de escopo

**Incluído:** identidade, rede, papel/vínculo, escalas, trocas, tarefas, compromissos, diário, saúde, medicamento, anexos, contatos, emergência, preferências opcionais, auditoria e exportação contextual.

**Fora:** telas do sistema como tabelas; entidades GitHub (Issue, Milestone, Pull Request); administrativo não aprovado; central/histórico de notificações; motor clínico de prescrição ou diagnóstico; cobrança; chat; IA médica.

## Regras de normalização

1FN: atributos atômicos e relação independente para listas de papéis/horários. 2FN: atributos dependem da chave completa. 3FN: dados de usuário, rede e pessoa idosa não duplicados em tarefas/diário sem necessidade. Exceção consciente: snapshot mínimo de contexto em auditoria para preservação, com justificativa e acesso restrito.

## Mudanças em relação ao planejamento local v0.1

- Usar **36**, não 35, US. O RF30/US-036 já está aprovado.
- `membro_rede.papel VARCHAR` sozinho **não** representa múltiplos papéis; separar `atribuicao_papel_familiar`.
- `notificacao` persistida como histórico de inbox não está autorizada pelo requisito; no máximo outbox técnico candidato, invisível como histórico ao usuário.
- Não afirmar uma rede por pessoa idosa, cardinalidade de consulta/compromisso ou reabertura de tarefa como definitivas.
- O escopo exato de “registro de cuidado imutável” em cada domínio precisa de ADR.
- A fase corrente é **conhecimento e contrato**, não construção de schema.
