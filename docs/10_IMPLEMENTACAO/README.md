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

[Handoff US-001 / Issue #37](US001_CADASTRO_CONTA_V1.md): T02 executável e serviço de identidade preparado. **Cadastro ainda bloqueado** por decisão de autorização ausente e integração MySQL não executada. Não tratar testes simulados como prova de persistência nem encerrar a Issue.

## DEC-AUTH-001 — convites CUIDADOR (homologada 2026-10-09)

[Decisão de convites](DEC_AUTH_001_CONVITES_CUIDADORES.md), homologada na [Issue #37](https://github.com/webkauadev/rede-de-apoio/issues/37#issuecomment-6092864135). **O impedimento de decisão funcional para US-001 foi resolvido**, mas a autorização por convite, o backend, a migração incremental e a prova real com MySQL descartável ainda precisam ser implementados/testados no PR #120. Não confundir com convites de Pessoa Idosa DB-017/US-036 e não considerar a US concluída.
