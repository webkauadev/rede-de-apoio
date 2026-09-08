# Changelog

## 2026-09-08 — GitHub como fonte única operacional

Decisão de arquitetura: o repositório `webkauadev/rede-de-apoio` passa a ser a **única fonte operacional** para RF/RNF, User Stories, Issues/tarefas, critérios de aceitação, rastreabilidade, decisões e contexto de agentes. O Figma permanece como fonte do design visual vigente.

Alterações:
- `AGENTS.md`, `CLAUDE.md`, `README.md` e contratos de IA migrados para fluxo GitHub-only;
- criado `docs/06_GITHUB/` com workflow e estrutura de Issues;
- removida a documentação operacional do tracker legado;
- criado `REQUIREMENTS_INDEX.yaml` com RF01–RF30 e RNFs referenciados;
- criado `USER_STORIES_INDEX.yaml` com US-001–US-035, responsáveis e estado de migração;
- falta funcional no GitHub passa a ser marcada `migration_required`; agentes não consultam trackers externos nem inventam conteúdo;
- `PENDENCIAS_DOCUMENTAIS.md`, regras de negócio e permissões ajustadas ao novo modelo;
- validador/CI ampliado para garantir cobertura T01–T17, US-001–US-035, RF01–RF30, distribuição de responsáveis e ausência de dependência operacional externa;
- Pull Requests de design agora referenciam GitHub Issues/RF/RNF/US + nodes do Figma.

Dívida de migração ainda aberta:
- textos completos, critérios de aceite e origens de várias US-001–US-035;
- definições canônicas de RNF01 e RNF03;
- rastreabilidade funcional parcial e permissões ainda não decidíveis em alguns fluxos.

> As referências a GitLab nas entradas de 2026-09-05 abaixo são **históricas** e descrevem a arquitetura daquele momento. Elas não têm efeito operacional após a Decisão 006 em `docs/07_AI_CONTEXT/PROJECT_DECISIONS.md`.

## 2026-09-05 — Auditoria e correções da Fase 1/2

Auditoria de consistência do pack registrada em `AUDIT_CONTEXT_PACK.md`.

Adicionado:
- `01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md` — P01 a P09;
- `01_REQUIREMENTS/RNF_PROPOSTA.md` — RNF-P01 a RNF-P13, **proposta**, sem valor de requisito;
- `03_INFORMATION_ARCHITECTURE/SCREEN_STATES.md` — conjunto canônico de estados;
- `03_INFORMATION_ARCHITECTURE/T06_DIARIO_DE_CUIDADOS.md` — especificação da tela.

Corrigido:
- Design System passa a ter árvore única. `05_FIGMA/COMPONENT_ARCHITECTURE.md`
  agora referencia `04_DESIGN_SYSTEM` e não redefine componentes;
- `DESIGN_TOKENS.md` v2: `border` dividido em `border-subtle` (decorativo) e
  `border-interactive` (#6E8496, 3.89:1) por falha em WCAG 1.4.11; adicionados
  tokens semânticos, escala tipográfica, raio, elevação e alvo de toque de 48px;
- `PERMISSIONS_MATRIX.md`: Pessoa Idosa marcada como proposta (RF30/RN-009);
  coluna "Alterar" sinalizada como não decidível (P03);
- `TRACEABILITY_MATRIX.md`: cobertura real declarada; `Field`, `AuthCard` e
  `DayDetail` removidos por não existirem no Design System; notação `US-0NN`;
- `GITLAB.md`: fluxo unificado em 4 estados;
- `USERS_AND_ROLES.md`: "Profissional da Saúde";
- `NOTIFICATIONS_RULES.md`: N02 atribui a notificação ao usuário, não à condição;
- `README.md` e `CONTEXT_PACK_STATUS.md` atualizados.

Não alterado (necessita decisão no GitLab): catálogo de US, RNF01/RNF03,
permissões de escrita, RN-002, superfície de notificações, permissão de RF28.

## 2026-09-05

Sincronização inicial do Context Pack completo.

Decisões:
- RF → US → Tela → Estado → Componente é a cadeia oficial.
- Pessoa Idosa com acesso próprio permanece marcada como extensão em formalização até GitLab/validação.
- shadcn é base de componentes, não identidade visual completa.
- Estados devem derivar de uma Page Base.

Próximas sincronizações devem preservar esta estrutura.
