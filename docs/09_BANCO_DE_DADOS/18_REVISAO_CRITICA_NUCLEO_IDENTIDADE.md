# 18 — Revisão crítica do núcleo de identidade, Pessoa Idosa e Rede de Cuidado

**Etapa:** aprofundamento de modelagem, 2026-10-09. **Resultado:** inconsistências potenciais identificadas e propostas de tratamento. **Nenhuma alteração de requisito aprovado ou implementação de banco.**

## 1. Bases funcionais confirmadas

Fontes internas revisadas:
- docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml (RF01–RF05 e RF30);
- docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml (US-001–US-007 e US-036);
- docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml (aprovação) e snapshot ACCEPTANCE_CRITERIA_DRAFT.yaml, cuja proveniência foi expressamente aprovada em 2026-09-15;
- docs/02_BUSINESS_RULES/BUSINESS_RULES.md (RN-001, RN-002, RN-003, RN-004, RN-007–RN-011);
- docs/02_BUSINESS_RULES/USERS_AND_ROLES.md, PERMISSIONS_MATRIX.md e ELDERLY_READ_ONLY_ACCESS.md;
- docs/03_INFORMATION_ARCHITECTURE/SCREENS_CATALOG.md: T12 inclui estados acesso não configurado/convite/enviado/ativo; T13 inclui vincular, papéis, transferir e desvincular.

**Não usar o desenho da tela como prova de atributos de cadastro nem da sequência exata das operações no servidor.**

## 2. Revisão de cada entidade e dependências

### K01 — Usuário

A identidade autentica; não é sinônimo de membro de uma rede, Familiar Principal, Profissional nem Pessoa Idosa. Atributos candidatos: identificador estável, nome exibido, identificador de autenticação e estado da conta. Email/hash próprios dependem da arquitetura de autenticação — DB-016. Regras: uma conta criada não ganha papel automaticamente, exceto durante operação de constituição da rede aprovada; desligamento da conta não apaga autoria anterior.

**Chaves:** PK estável; candidato a identificador de login único somente após política de normalização/recuperação; nunca usar email como FK operacional. **Risco:** senhas em texto claro ou autorização baseada em atributos do cliente.

### K02 — Pessoa Idosa

É a pessoa sobre quem se registram os cuidados, podendo inicialmente não ter conta própria. A conta de titular, quando habilitada, deve ser vinculada ao perfil com a mesma autenticação geral e permissão de leitura do **próprio** cuidado. Proposta: FK nullable usuario_titular_id com UNIQUE sobre valores não nulos se for permitido no máximo um perfil de titular por usuário; a recíproca e a troca/reativação exigem DB-025.

**Não presumir** CPF, diagnóstico, endereço, contato clínico ou senha como campos necessários porque o RF03 não enumera atributos. A definição fina deve vir do formulário aprovado/decisão explícita.

### K03 — Rede de Cuidado

É a fronteira de autorização e responsabilidade operacional. Proposta: uma rede possui FK para Pessoa Idosa; essa cardinalidade não prova que cada pessoa tem uma única rede (DB-001). Rede **em operação** deve respeitar um Familiar Principal ativo e ≥1 Profissional vinculado; o onboarding inicial requer protocolo (DB-002).

**Risco:** criar rede “ativa” com zero Profissionais por uma sequência de chamadas de cadastro e só lembrar da regra na tela de equipe.

### K04 — Participação na Rede

Associativa usuário↔rede, com **categoria de vínculo** (FAMILIAR/PROFISSIONAL_SAUDE) e vigência, separada da identidade. Proposta: PK membro_id, FKs rede_id+usuario_id; participação válida apenas naquela rede. Reingresso após desvinculação é DB-003.

**Recomendação técnica:** restringir referências de plantão, tarefa, troca e ação à mesma rede via par (rede_id,membro_id) e chave candidata correspondente, não duas FKs isoladas que permitam misturar redes.

### K05 — Papéis Familiares Concedidos

Múltiplas concessões de Principal, Apoio e Emergência sobre **participação familiar**; cada concessão tem vigência e autor quando aplicável. Uma única coluna papel no membro **contradiz** RN-002. Não permitir papel familiar em Profissional ou acesso de titular idoso. O Principal ativo é **único dentro da rede** e transferido atomicamente (DB-004).

**Ponto não resolvido por FK simples:** a tabela atribuicao_papel_familiar referencia membro_rede, mas membro_rede contém categoria. Uma FK apenas em membro_id comprova existência, **não comprova** categoria FAMILIAR. Avaliar subtipo específico de membro familiar OU chave composta com categoria fixa e validação própria (ver documento 19).

## 3. Matriz de achados e risco

| ID | Achado concreto da revisão | Severidade | Proposta / bloqueio |
|---|---|---|---|
| A01 | Unicidade do Principal ativo é entre linhas, não cabe em CHECK de uma linha | Crítica | operação transacional, proteção concorrente; alternativa de índice parcial simulado sujeita a prova |
| A02 | Rede vazia no primeiro INSERT conflita com exigência operacional de Principal e Profissional | Crítica | definir bootstrap/estado de configuração/ativação sem enfraquecer RN-001/RN-004 |
| A03 | FK papel→membro não impede que papel familiar seja atribuído a categoria Profissional | Crítica | subtipo familiar ou relação composta e verificação da categoria |
| A04 | “Usuário”, “Pessoa Idosa” e “membro_rede” têm significados diferentes | Alta | não transformar titular idoso em membro familiar fictício |
| A05 | Associação conta titular/perfil exige cardinalidade explícita e processo de recuperação | Alta | DB-025; não inferir pelo Figma fluxo completo de convite |
| A06 | UNIQUE(rede_id,usuario_id) permanente pode impedir reingresso histórico | Alta | DB-003; distinguir vínculo ativo dos encerrados |
| A07 | FKs isoladas aceitam membros de uma rede em tarefas/plantões de outra | Crítica | FK composta de escopo ou mecanismo equivalente comprovado |
| A08 | Revogar papel/vínculo pode apagar autoria ou alterar permissões históricas de logs | Alta | eventos e snapshots mínimos preservados |
| A09 | Categoria de participação alterada retroativamente pode invalidar papéis e registros | Alta | proibir troca direta e reclassificar por novo vínculo ou evento formal |
| A10 | Identificar “ativo” por relógio no índice/coluna gerada é instável | Alta | vigência e status definidos; evitar funções não determinísticas em índices |
| A11 | Pessoa Idosa read-only pode possuir conta igual a outro vínculo? A fonte não resolve explicitamente o caso cruzado | Alta | DB-025: política explícita para identidade mista |
| A12 | Excluir Pessoa Idosa/rede/membro com CASCADE pode apagar cuidado/autoria/auditoria | Crítica | política restritiva de exclusão e retenção a decidir |
| A13 | Ter dois papéis PRINCIPAL em redes diferentes não contradiz unicidade local | Média | sempre computar unicidade por rede, não por usuário global |
| A14 | T12/T13 são superfícies; estados “convite enviado” não provam a existência de uma tabela convite | Média | persistência de acesso idoso continua DB-017 |

## 4. Cardinalidades mínimas, distinguindo fatos de hipóteses

| Relação | Cardinalidade **candidata** | Limitação |
|---|---|---|
| Usuário → participação | 1 → 0..N | múltiplas redes possíveis sem globalizar papéis |
| Rede → participação | 1 → 0..N em configuração | para rede operacional há mínimo por categoria |
| Rede → Principal vigente | 1 → **exatamente 1** | CANÔNICO RN-001 |
| Rede → Profissional vigente | 1 → **1..N** | CANÔNICO RN-004 |
| Participação familiar → concessões de papéis | 1 → 0..N no histórico | CANÔNICO: papéis acumuláveis; mínimo vigente depende do contexto |
| Participação profissional → concessões familiares | 1 → **0** | CANÔNICO RN-004 |
| Pessoa Idosa → conta própria | 1 → 0..1 **candidata** | DB-025 |
| Pessoa Idosa → Rede | 1 → 0..1 OU 0..N | DB-001 sem resposta canônica |
| Usuário membro → vários perfis idosos na mesma rede | restrito pelo vínculo/contexto | não autorizar sem regra clara |
| Pessoa Idosa → Plantonista Atual | 0 | CANÔNICO RF30 |

**Nota:** a cardinalidade da rede em configuração não pode ser interpretada como permissão de operar sem Principal/Profissional. Necessita decisão de ciclo de vida.

## 5. Consultas lógicas que o modelo precisa responder

- Para usuário U, quais redes e pessoas idosas ele pode **consultar agora**?
- Em rede R, quem é o único Principal vigente, como membro e como usuário?
- Quem são os familiares de R e qual o conjunto de papéis acumulados de cada um?
- Quais Profissionais estão vinculados e efetivamente autorizados em R?
- Em que instante começou/terminou o vínculo que autorizou um registro histórico?
- Qual perfil de Pessoa Idosa está associado à conta U, sem acessar outro titular?
- Dado um evento histórico, quem o escreveu, com qual papel/categoria **naquele momento**?
- Após desvincular X, o que X não pode mais fazer e o que deve permanecer verificável para o Principal?
- Ao transferir Principal A→B, quais novas permissões surgem e quais desaparecem, sem duplicação?

## 6. Gate de revisão

**Nenhum DDL do núcleo K01–K05 antes de DB-001, DB-002, DB-003, DB-004, DB-016 e DB-025**. Nomes/campos deste documento não substituem RF/RNF/US. Alternativas e testes de mesa: [19](19_ALTERNATIVAS_E_TRANSACOES_NUCLEO.md) e [20](20_CENARIOS_RIGOROSOS_NUCLEO.md).
