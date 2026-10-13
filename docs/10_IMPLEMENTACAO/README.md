# Execucao orientada por GitHub para Codex

Esta pasta informa **como um agente executa**, sem depender do contexto privado de uma conversa.

1. [CODEX_PLAYBOOK.md](CODEX_PLAYBOOK.md): fontes, ordem de leitura, seguranca, Definition of Done, criterios de bloqueio e fluxo de PR.
2. [../09_BANCO_DE_DADOS/README.md](../09_BANCO_DE_DADOS/README.md): analise e ADRs estruturais; distinguir decisao do solicitante e estudo.
3. [../../database/mysql/README.md](../../database/mysql/README.md): script SQL V0.1 para MySQL Workbench e EER.
4. [../../database/mysql/DECISOES_E_LIMITES.md](../../database/mysql/DECISOES_E_LIMITES.md): hipoteses de prototipacao que NAO sao decisoes de produto.

O Codex deve iniciar por uma **Issue/US concreta**. Se o trabalho exige alternativa funcional ainda nao escolhida, apontar `BLOCKED_BY_DECISION`; nao concluir que banco prototipo e fonte superior aos requisitos canônicos.

O app ainda nao tem stack, backend/frontend, migrations ou auth definidos/implementados. SQL fisico publicado serve para importar e desenhar, **nao** para afirmar sistema funcional. Nao executar em producao e nao fazer merge automatico.


## Índice do pacote Codex — todos os arquivos locais ao repositório

| Leitura | Arquivo | Estado |
|---|---|---|
| **1. Contrato** | [CODEX_PLAYBOOK.md](CODEX_PLAYBOOK.md) | fonte operacional do handoff |
| **2. Visual** | [FIGMA_SNAPSHOT/README.md](FIGMA_SNAPSHOT/README.md) e [SCREENSHOTS_INDEX.json](FIGMA_SNAPSHOT/SCREENSHOTS_INDEX.json) | 17 capturas canônicas + 9 estados de exceção |
| **3. Backlog** | [IMPLEMENTATION_BACKLOG.json](IMPLEMENTATION_BACKLOG.json) e [BACKLOG_CODEX.md](BACKLOG_CODEX.md) | 36 US, Issues/origem/telas e dependências de decisão |
| **4. Execução** | [PROTOCOLO_PR_CODEX.md](PROTOCOLO_PR_CODEX.md) | início, testes, commit e formato do PR |
| **5. Stack** | [STACK_CANDIDATA.md](STACK_CANDIDATA.md) | sugestão web/PWA, **aguarda aprovação de tecnologia** |
| **6. Decisões** | [PORTOES_PENDENTES.md](PORTOES_PENDENTES.md) | DB-001/002/003/028/030, auth e ambiente |
| **7. Banco** | [../../database/mysql/README.md](../../database/mysql/README.md) | SQL V0.1 Workbench/EER, sem servidor executado |

**Preflight testável:** scripts `validate_agent_context.py` (com PyYAML), `validate_sql_prototype.py`, `validate_visual_snapshot.py` e `validate_implementation_backlog.py`; workflow GitHub Actions em `.github/workflows/`.

**Iniciar novo Codex sem conversar sobre o histórico:** "Leia AGENTS.md e docs/10_IMPLEMENTACAO/README.md. Escolha uma US do backlog com requisitos e decisões suficientes. Implemente em PR pequeno com testes, sem aprovar ADR não resolvida e sem merge automático." A escolha final da stack deve ocorrer antes de gerar aplicação.

## V1 homologada: início recomendado

**Primeira leitura:** [DECISOES_V1_HOMOLOGADAS.md](DECISOES_V1_HOMOLOGADAS.md) → [STACK_V1_HOMOLOGADA.md](STACK_V1_HOMOLOGADA.md) → [CODEX_PLAYBOOK.md](CODEX_PLAYBOOK.md) → [IMPLEMENTATION_BACKLOG.json](IMPLEMENTATION_BACKLOG.json) → [FIGMA_SNAPSHOT](FIGMA_SNAPSHOT/README.md) → [SQL MySQL V1](../../database/mysql/README.md).

**Arquivos históricos:** [STACK_CANDIDATA.md](STACK_CANDIDATA.md) e [PORTOES_PENDENTES.md](PORTOES_PENDENTES.md) foram preparados antes da ratificação. Ver [GATES_DE_IMPLANTACAO_V1.md](GATES_DE_IMPLANTACAO_V1.md) para pendências de execução física/produção que permanecem reais. Não criar o aplicativo nesta revisão do SQL; o Codex já tem especificação para iniciar o código como tarefa posterior.

## Infraestrutura de aplicação — Issue #117

[Runbook local V1](RUNBOOK_LOCAL_V1.md): scaffold, versões instaladas, testes reais e limites de segurança. [Continuidade incremental](CONTINUIDADE_V1.md): sequência das 36 US, sem mudar o tracker canônico. A incorporação do scaffold exige revisão humana; nenhum banco foi executado.

## US-001 — cadastro em revisão

[Handoff US-001 / Issue #37](US001_CADASTRO_CONTA_V1.md): T02 executável e serviço de identidade preparado. DEC-AUTH-001 resolve o modelo de autorização; fluxo local por convite e integração MySQL real registrados no handoff. Revisão humana, login US-002 e gates de publicação continuam pendentes; não encerrar a Issue.

## DEC-AUTH-001 — convites CUIDADOR (homologada 2026-10-09)

[Decisão de convites](DEC_AUTH_001_CONVITES_CUIDADORES.md), homologada na [Issue #37](https://github.com/webkauadev/rede-de-apoio/issues/37#issuecomment-6092864135). **O impedimento de decisão funcional para US-001 foi resolvido**, mas a autorização por convite, o backend, a migração incremental e a prova real com MySQL descartável ainda precisam ser implementados/testados no PR #120. Não confundir com convites de Pessoa Idosa DB-017/US-036 e não considerar a US concluída.

## US-002 — login e sessões em Draft

[Handoff US-002 / Issue #38](US002_LOGIN_SESSOES_V1.md): T01 e infraestrutura de sessões,
base humana `53796a4`, com testes sem MySQL. A instrução mais recente da Issue #38 supera
os estados históricos do PR #120 acima. Migração 005 preparada; persistência/concorrência
deste incremento aguardam nova autorização específica. Nenhum aceite, gate global ou
outra US foi declarado concluído por esta implementação.

### US-002 — integração física da continuidade

A autorização específica da Issue #38 liberou o ensaio novo: 005 executada em MySQL 8.4.11,
34 tabelas, **30 testes físicos e 20 E2E com banco real** passaram. [Relatório US-002](US002_LOGIN_SESSOES_V1.md)
registra correções de rotação/concorrência e cleanup. A pendência histórica anterior foi suprida somente
nesse escopo local. PR #121 segue Draft para nova revisão humana; gates públicos/globais não encerrados.

## Política de testes em camadas — PR #122

[TESTES_EFICIENTES_V1.md](TESTES_EFICIENTES_V1.md) define ciclos rápidos no Codex, smoke mobile, E2E padrão com seleção desktop `@responsive` e regressão completa opcional nas duas plataformas. Os gates de MySQL físico, integridade, concorrência e autorização continuam obrigatórios por US. O protocolo é aplicável após aprovação e incorporação do PR #122.

## US-003 — implementação parcial bloqueada

[Relatório US-003/T12](US003_CADASTRO_PESSOA_IDOSA_V1.md): formulário, contrato e adaptador SQL preparados;
serviço oficial permanece BLOCKED_BY_DECISION enquanto faltar prova canônica do ator elegível no bootstrap.
Testes físicos do adaptador/negações não certificam cadastro autorizado. Nenhuma rede/papel antecipado.
