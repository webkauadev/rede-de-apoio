# Contrato de execução autossuficiente para Codex

**Estado:** handoff técnico versionado no GitHub. O repositório é fonte única de informação operacional; o agente NÃO deve precisar de histórico de chat para compreender o produto. **Esta branch apenas adiciona SQL protótipo**, não inicia a implementação de backend/frontend.

## Leitura mínima obrigatória em ordem

1. `/AGENTS.md` — instrução normativa para agentes; nunca ignorar.
2. `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md` — estado consolidado; conferir data e possíveis atualizações do registry.
3. `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml` — RF01–RF30, RNF01–03, origens.
4. `docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml` — US-001–US-036, owner, tela, issue originadora.
5. `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml` — metadados aprovados P01/#73 e `comment_id` por US; critérios textuais nos comentários de aprovação das Issues, snapshot histórico em `ACCEPTANCE_CRITERIA_DRAFT.yaml` (não tomar o antigo status pending como vigente).
6. `docs/02_BUSINESS_RULES/` — `BUSINESS_RULES.md`, `USERS_AND_ROLES.md`, `PERMISSIONS_MATRIX.md`, `NOTIFICATIONS_RULES.md`.
7. `docs/03_INFORMATION_ARCHITECTURE/`, `docs/04_DESIGN_SYSTEM/`, `docs/05_FIGMA/` — telas T01–T17 e normas M3; `Fluxo Final` é a autoridade visual.
8. `docs/09_BANCO_DE_DADOS/README.md`, `14_DECISOES_PENDENTES.md`, `32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md`, `48_GATE_G1_DECISOES_PARA_REVISAO_HUMANA.md` — fatos, aprovações e decisões ainda pendentes.
9. `database/mysql/README.md` + `DECISOES_E_LIMITES.md` + `001_rede_de_apoio_schema.sql` — físico **experimental**, sujeito a revisão.

## Fonte de autoridade e resolução de divergências

**Aprovado:** texto e critérios da Issue RF/US originadora, decisões canônicas da main, RN/perm/avisos. **Exemplificativo:** diagramas, layouts e DTOs candidatos. **Em estudo:** ADR PENDENTE e DDL V0.1. Quando DDL e RF/US divergem, **RF/US vence** até decisão explícita documentada; o agente não redefine requisitos.

A aprovação geral da documentação/banco pelo solicitante **autoriza construir o protótipo SQL**, mas não deve ser lida como escolha tácita de todas as alternativas A1/A2/B, B1/B2/B3, E1/E2, N02 A/B/C.

## Sequência por User Story ao implementar app futuramente

1. Obter a Issue e identificar RF/RNF de origem (uma única origem por US).
2. Ler aceites canônicos via `ACCEPTANCE_CRITERIA.yaml` (comentários + snapshot aprovado).
3. Listar invariantes de segurança, temporalidade, versões e notificações afetadas.
4. Marcar decisões `CONFIRMADO`, `PROPOSTA_TECNICA`, `PENDENTE` e `BLOCKED_BY_DECISION` onde necessário.
5. Projetar contrato de API/DB **dentro do escopo aprovado**; criar ramo e PR pequenos por US/etapa; manter referência de Issue/RF/US/T##.
6. Acrescentar testes de autorização negativa, escopo, sucesso, concorrência/rollback quando pertinente; executar testes e registrar evidências reais (não aceitar testes de mesa como integração).
7. Validar `python scripts/validate_agent_context.py` e `python scripts/validate_sql_prototype.py`, adicionar checks ao CI.
8. Documentar `migration_required` para nova regra e solicitar revisão humana. **Nunca auto-mergear.**

## Critérios de conclusão para uma US

- Critérios aprovados foram implementados sem ampliar o escopo.
- Há rastreabilidade **RF→US→T##/E##→teste→código**.
- Permissões verificadas no **servidor**; Pessoa Idosa read-only, Profissional separado, Principal único, Plantonista Atual temporal.
- Registros de cuidado imutáveis; corrigir cria versão com novo autor e instante.
- N01–N04 apenas superfícies aprovadas, sem Central; não enviar N02 indevidamente quando múltiplos plantonistas.
- Mudanças transacionais de mesmo plantão/versão e tarefa/ciclo não criam duplo efeito.
- CI/testes documentados; limitações e decisões pendentes declaradas; PR pronto para revisão, não mesclado por agente.

## Sequência recomendada para abrir o repositório de código

**A implantação do frontend/backend e a escolha final de stack ainda NÃO foram aprovadas como padrão do repositório.** A decisão precisa indicar runtime, framework, autenticação/provedor, versão MySQL, ORM ou query builder, configuração de ambientes e migrations. O agente não deve iniciar frontend/backend de forma autônoma sem isso. Quando aprovado:

1. criar `apps/` ou layout equivalente definido, lint/teste/CI e arquivos `.env.example` sem segredos;
2. autenticação (RF01/02), identidade Pessoa Idosa read-only (RF30);
3. Pessoa Idosa, rede, membro/papel (RF03–05), com decisão DB-001/002/003/004 antes de tornar rede operacional;
4. escala e tarefa (RF06–10/21), DEC-S01/S03 e N02 DB-030;
5. registros/correção/medicamentos/tempo (RF11–19/26) com DB-008/010/011/021/029 homologadas;
6. compromissos, anexos, emergência, notificações, CSV e auditoria conforme origens e gates.

## Checklist de segurança de operação

- [ ] Nenhum acesso a dado de outra rede por inferir apenas o ID da Pessoa Idosa.
- [ ] Nenhuma senha/token/registro clínico real em PR, log, seed ou evidência.
- [ ] Nenhuma exclusão/UPDATE destrutivo de fato de saúde imutável.
- [ ] Nenhuma alteração de texto de RF/US sem decisão e rastreabilidade.
- [ ] Nenhum destino N02 assumido quando vários Plantonistas Atuais.
- [ ] Nenhum banco MySQL/SQL executado ou schema criado sem ambiente autorizado e backup.
- [ ] Nenhum merge sem aprovação humana explícita.

**Próximo objetivo quando a equipe quiser iniciar código:** aprovar stack e protocolo de autenticação; resolver as decisões G1 que bloqueiam o primeiro módulo, depois criar PR incremental de scaffold. O SQL V0.1 pode ser usado imediatamente para EER como **modelo de trabalho**, não como contrato de produção.


## Modo GitHub-only — pacote fechado de contexto (2026-10-09)

Quando o Codex não tiver conexão com Figma, usar esta ordem complementar:
1. [FIGMA_SNAPSHOT/SCREENSHOTS_INDEX.json](FIGMA_SNAPSHOT/SCREENSHOTS_INDEX.json) — 17 capturas dos T01–T17 canônicos e 9 estados escolhidos, com `node_id` e PNG relativo versionado.
2. [FIGMA_SNAPSHOT/README.md](FIGMA_SNAPSHOT/README.md) — galeria visual base e limites da captura; os outros estados vêm da matriz oficial `STATE_MATRIX.yaml`.
3. [IMPLEMENTATION_BACKLOG.json](IMPLEMENTATION_BACKLOG.json) — 36 US, Issues, RF/RNF e telas projetados do registry canônico (não substituir a Issue).
4. [PROTOCOLO_PR_CODEX.md](PROTOCOLO_PR_CODEX.md) — fluxo operacional, testes e protocolo de bloqueio/PR.
5. [PORTOES_PENDENTES.md](PORTOES_PENDENTES.md) — decisões de negócio que não devem ser tomadas silenciosamente.
6. [STACK_CANDIDATA.md](STACK_CANDIDATA.md) — recomendação **não aprovada** para iniciar app futuramente.

**Comandos de preflight offline:** `python scripts/validate_agent_context.py` (dependência PyYAML), `python scripts/validate_sql_prototype.py`, `python scripts/validate_visual_snapshot.py` e `python scripts/validate_implementation_backlog.py`. Os três últimos não precisam de MySQL/Figma/rede.

**Importante:** `CODEX_SETUP.md` legado falava em "inspecionar node do Fluxo Final antes de escrita"; isso continua necessário apenas para **novas alterações ao Figma**. Para implementar a tela já congelada no GitHub, consultar seu PNG e registries é suficiente como referência de primeira versão; ainda são necessários testes de UI.

**Risco conhecido de UI:** o contrato de agentes registra problemas de clipping/scroll no T04/T06. Ao implementar, **seguir o padrão de viewport contido**, não copiar eventual sobreposição visual do screenshot. Não criar páginas independentes para forms já migrados para Bottom Sheet.

**Mecanismo de autonomia:** executar tarefas independentes aprovadas, abrir PR, publicar evidências e parar apenas na função afetada por `BLOCKED_BY_DECISION` ou por falta de escolha de stack. Autonomia não autoriza o agente a homologar política clínica, privacidade ou N02 para vários plantonistas.

## V1 ratificada posteriormente — precedência obrigatória (2026-10-09)

**Leia primeiro** [DECISOES_V1_HOMOLOGADAS.md](DECISOES_V1_HOMOLOGADAS.md) e [STACK_V1_HOMOLOGADA.md](STACK_V1_HOMOLOGADA.md), além de `AGENTS.md`. A pauta antiga `PORTOES_PENDENTES.md` e a stack candidata de V0.1 são arquivos históricos, **não bloqueiam o scaffold V1**.

Você pode iniciar **implementação de aplicação** em branch/PR por US após consultar `IMPLEMENTATION_BACKLOG.json` (36 US), `FIGMA_SNAPSHOT` (17 baselines + 9 estados), `BUSINESS_RULES.md`/permissões/avisos e aceites da Issue. Não precisa Figma live para os PNGs da V1. Você **não** pode executar em produção, provisionar banco real sem ambiente autorizado, inferir novas regras clínicas, liberar segunda rede, reabrir tarefa, enviar N02 para todos os plantonistas ou criar inbox.

A orientação antiga "stack ainda não aprovada" anterior a este complemento foi **superada por homologação explícita do solicitante**. Merge de futuros PRs de implementação continua a exigir revisão humana.
