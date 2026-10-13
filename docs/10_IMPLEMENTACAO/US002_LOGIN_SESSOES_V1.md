# US-002 — Login T01 e infraestrutura de sessões V1

Incremento de 2026-10-13, branch exclusiva `feat/us002-login-sessoes-v1`, base humana
`53796a41303ebd0ef8135300b45441554d54c180` (PR #120 incorporado pelo responsável).
**Draft para nova revisão humana. Integração MySQL local descartável autorizada e executada nesta continuidade.**
Owner David preservado. US-002/#38 e RF02/#6 não encerradas; nenhuma alteração de atribuição.

## Autoridade e rastreabilidade

- Origem única: [RF02/#6](https://github.com/webkauadev/rede-de-apoio/issues/6) →
  [US-002/#38](https://github.com/webkauadev/rede-de-apoio/issues/38) → T01/E01.
- [Comentário técnico mais recente, 6145678447](https://github.com/webkauadev/rede-de-apoio/issues/38#issuecomment-6145678447).
- [Autorização específica MySQL, 6146197937](https://github.com/webkauadev/rede-de-apoio/issues/38#issuecomment-6146197937).
- [Parecer técnico, 5503943582](https://github.com/webkauadev/rede-de-apoio/pull/121#pullrequestreview-5503943582).
- [Aceites aprovados, 5673834103](https://github.com/webkauadev/rede-de-apoio/issues/38#issuecomment-5673834103),
  indexados em `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml`; snapshot histórico não é gate pendente.
- RNF01/RNF03 transversais, DB-016/025/038 e `PERMISSIONS_MATRIX.md`; requisitos imutáveis.
- Snapshot `FIGMA_SNAPSHOT/assets/T01.png`, baseline Figma `5926:1016`, estados
  `invalid_credentials` E01 `5926:32076` e `loading` `5926:32132`, conforme STATE_MATRIX.
- AGENTS, CLAUDE, CODEX_PLAYBOOK, stack/decisões V1 e gates públicos continuam aplicáveis.

| Critério aprovado | Código / teste | Evidência e limite |
| --- | --- | --- |
| Conta cadastrada autentica-se em T01 | LoginForm, loginAccount, Argon2id, POST login; login.test e login.spec | Convite/cadastro → T01 → sessão → logout comprovados em navegador/API/MySQL real; aceite humano pendente |
| Acesso somente por categoria, papéis e contexto | requireIdentity, denyCareAccess, API sessao e página técnica | Identidade atual não concede papéis; ausência de vínculos e negação de cuidado comprovadas. Matriz de domínios futuros não foi liberada |
| Credenciais inválidas/ausência de autorização não liberam protegido | dummy Argon, guardas, Origin, revalidação, testes negativos | HTTP/UI e banco reais comprovam negações, expiração/revogação/conta e rollback. CI padrão continua sem banco |

## Interface e arquitetura

`/login` implementa T01 no AuthShell existente, usando Input/Button e tokens homologados.
Campos têm labels/autocomplete, visibilidade de senha acessível e targets >=48×48 px.
Validação local foca o primeiro campo inválido; erro genérico de credenciais preserva shell,
limpa senha e foca/anuncia feedback. Ref bloqueia envio duplo; loading mantém geometria.
Scroll fica contido abaixo do header, inclusive 320×568; desktop mantém coluna mobile-first.
Auditoria visual comparou PNG renderizado com baseline congelada (sem alegar pixel-perfect).
T02 agora tem link real para T01. Criar conta segue `/cadastro` e exige convite DEC-AUTH-001.
“Esqueci minha senha” mantém posição visual, desabilitado; contrato `PasswordRecoveryRequest`
prepara a interface sem endpoint/fluxo de recuperação inventado.

Depois de confirmação do login, destino é `/sessao`, **verificação técnica provisória** de
identidade/categoria, sem dados clínicos, Home funcional, permissões ou rede. Guarda no servidor
revalida mesmo depois de sucesso anterior da API. Não é T03 ou novo requisito funcional.
A página técnica original `/` e navegação de scaffold permanecem sem dados de cuidado.

### Servidor

- Zod estrito; email trim/lowercase igual à US-001, senha literal (sem trim). Máximo técnico
  1024 bytes UTF-8 e corpo JSON 8192 bytes. Cliente não envia usuário/papel/contexto autorizado.
- Busca parametrizada de `usuario` ativo e `senha_hash IS NOT NULL`. Argon2id real; conta
  ausente/inativa/não ativada/hash inválido passa por dummy Argon2id. Dummy usa parâmetros da
  US-001 e senha CSPRNG desconhecida; cache desse hash não armazena sessão nem credenciais de usuário.
  Mitigação de timing, **não prova de tempos constantes**, especialmente no primeiro aquecimento.
- Rate limiting SQL independente antes de Argon2id: 60 tentativas globais/60s e 5 por email/900s.
  Chaves HMAC-SHA256 com SESSION_SECRET; não persistir email/IP bruto ou reutilizar cadastro_rate_limit.
  Global primeiro limita criação de buckets arbitrários. Negação ocorre depois de confirmar contadores.
  Coleta após adquirir o bucket global, em ordem consistente de locks, limitada a 100 buckets técnicos com janela >24h em cada tentativa; nenhuma auditoria/dado
  clínico é apagado. Limites são parâmetros técnicos locais, não novos aceites ou proteção pública comprovada.
- Sessão CSPRNG de 32 bytes/base64url, apenas SHA-256 no banco; absoluto **8 horas**, UTC do banco,
  sem extensão deslizante. SHA-256 do hash de senha invalida sessão após mudança de credencial.
- Criação serializa conta com FOR UPDATE e revalida ativo/hash/categoria após a verificação da senha.
  Revoga cookie anterior apresentado **somente se pertencer à conta autenticada**, cria token novo e audita LOGIN na mesma transação. Sem sessão fixa,
  promoção a Principal ou vínculo implícito. Pessoa Idosa usa a mesma infraestrutura, categoria distinta.
- Cookie somente Set-Cookie: HttpOnly, SameSite=Lax, Path=/, Max-Age absoluto, sem Domain. HTTPS utiliza
  Secure e prefixo __Host-. Token nunca retorna em JSON, HTML, URL, JS storage ou logs.
- Configuração só habilita perfil `AUTH_ENVIRONMENT=local` com APPLICATION_ORIGIN loopback e segredo
  >=32 bytes. HTTP só nesse perfil local; gates públicos continuam fechados. Não confiar em headers
  forwarded para escolher segurança/origem, nem habilitar produção mudando apenas NODE_ENV.
- POST login/logout exigem Origin canônica e rejeitam Sec-Fetch-Site cross-site. Origin inexistente/
  inválida, DTO/corpo inválido e tentativas negativas são auditados com texto fixo em transação separada.
  Auditoria/banco indisponível implica 503, sem cookie ou acesso; não há fallback em memória.
- `requireIdentity` revalida hash, expiração, revogação, ativo e credencial em cada chamada, sem cache.
  `/api/auth/sessao` retorna somente ID opaco/categoria atual, sem email/senha/token/papéis. Respostas API
  privadas usam no-store/private e Vary Cookie; página protegida é force-dynamic.
- `denyCareAccess` nega/audita qualquer cuidado até autorização contextual ser implementada pelo domínio.
  Usar guarda dentro de toda futura rota/página protegida; presença de cookie ou esconder botão não basta.
- Logout só altera hash do cookie apresentado. Revogação e auditoria de efeito são atômicas; update sem
  efeito não duplica evento de logout. Cookie só é limpo após confirmação. Anônimo/forjado não revoga
  sessões por ID de cliente. Repetição não comunica existência da sessão.
- COMMIT incerto do adaptador existente não é repetido: login não entrega token/cookie sem confirmação;
  sessão possivelmente criada permanece inacessível ao cliente e expira. Logout incerto mantém cookie,
  e sua repetição idempotente não duplica efeito. **Não foi simulada interrupção física de rede.**

## Migração e operação

`database/mysql/005_sessoes_login.sql` é aditiva após `001`/`003`/`004`, sem reescrever fontes históricas:

- `sessao_usuario`: PK token_hash ASCII binário, FK usuario, credencial_hash, criação/expiração/revogação
  UTC DATETIME(6), CHECK expiração > criação; índices por usuário/revogação/vencimento e por expiração.
- `login_rate_limit`: PK HMAC ASCII binário, contador e janela UTC, índice para coleta de buckets expirados.

Duas tabelas novas, contagem física 32→34 após 005 comprovada em MySQL 8.4.11. Não há exclusão automática
clínica, migration runner de produção ou seed com dados reais. Credenciais e fixtures são exclusivas do ensaio efêmero.
O harness agora exige perfil próprio US-002 para executar 005, com nomes/labels/credenciais e marcador separados; o perfil padrão US-001 continua limitado à sua sequência anterior.

Fedora 44 x86_64, Node **24.18.0**, npm **11.16.0**, Python **3.14.7**. Para reproduzir a base sem banco:

```bash
npm ci
npm run dev
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
python3 scripts/validate_agent_context.py
python3 scripts/validate_sql_prototype.py
python3 scripts/validate_visual_snapshot.py
python3 scripts/validate_implementation_backlog.py
npm audit --omit=dev
```

`/login` renderiza sem variáveis MySQL. POST/guardas falham fechado sem configuração. Para eventual ensaio
**após autorização específica**, criar ambiente novo/descartável, aplicar scripts sequenciados sob controle,
configurar DATABASE_* e APPLICATION_ORIGIN e gerar SESSION_SECRET >=32 bytes em arquivo privado fora do Git,
com `AUTH_ENVIRONMENT=local`. Não usar credenciais de produção nem dados reais. O `.env.example` tem nomes
sem valores secretos. Na fase inicial não houve segredo operacional; esta continuidade gerou somente credenciais efêmeras locais, já removidas.

## Resultados reais deste incremento

- npm ci, format:check, lint, typecheck e build: **passaram**.
- Vitest unitário: **149 testes passaram**, incluindo regressão de titularidade da rotação. Argon2id real; mocks unitários continuam explicitamente separados das novas provas físicas.
- Playwright: **36 passaram**, 18 existentes + 18 T01 (9 por projeto mobile390×844/desktop), sem MySQL.
  Validação, targets, navegação, senha, feedback e handler fechado reais. invalid_credentials/loading/
  encaminhamento de sucesso usam respostas interceptadas, nomeadas **simuladas**. A guarda real nega
  o destino sem banco mesmo após sucesso interceptado; isso não prova autenticação persistida.
- Quatro validadores Python e auditoria runtime: **passaram**, 0 vulnerabilidades de produção.
  Cinco vulnerabilidades de desenvolvimento preexistentes continuam no acompanhamento #119.
- Integração MySQL: **30 testes passaram**, com consultas/constraints/locks/COMMIT/rollback reais.
- Playwright com MySQL: **20 testes passaram**, 10 por projeto mobile/desktop, navegador/API/banco reais.
- Contêiner rootless novo `rede-apoio-us002-8a5e3fe4b756`, loopback `127.0.0.1:43945`, MySQL **8.4.11**.
  Sequência executada 001/002/003/004/005: **30/30/31/32/34 tabelas**. [DDL e estrutura](EVIDENCIAS/US002/mysql-structure.json).
- Credenciais efêmeras ficaram em diretório privado fora do Git; varredura dos arquivos versionáveis passou.
  Contêiner, volume anônimo e diretório privado foram removidos somente após conferir nome/ID/label.
  `mysql-workbench` e `compat` preexistentes permaneceram com os mesmos IDs; nenhum servidor existente foi alterado.
  Diagnósticos/trace/video/capturas com tokens reais desabilitados; arquivos privados de convite removidos no teardown.

Falhas corrigidas: tipagem da fixture RowDataPacket/categoria; seletor E2E de alert separado do
anunciador de rota Next.js. Validação final passou após as correções. [Resultados estruturados](EVIDENCIAS/US002/results.json)
e capturas da implementação (somente dados sintéticos; nenhuma alteração no snapshot canônico):

- [Mobile default](EVIDENCIAS/US002/T01-mobile-default.png)
- [Desktop default](EVIDENCIAS/US002/T01-desktop-default.png)
- [Validation](EVIDENCIAS/US002/T01-mobile-validation.png)
- [Invalid credentials simulado](EVIDENCIAS/US002/T01-mobile-invalid-credentials-simulated.png)
- [Loading simulado](EVIDENCIAS/US002/T01-mobile-loading-simulated.png)

CI padrão cobre testes novos sem MySQL, com AUTH_ENVIRONMENT e REGISTRATION_ENVIRONMENT vazios;
Playwright também remove configuração de banco herdada. Resultado remoto é registrado no Draft PR.
Checks estáticos/CI não certificam a migração nem concorrência física.

## Pendências para revisão / próximo incremento

A autorização #6146197937 e o parecer do PR #121 liberaram o ensaio específico, substituindo a pendência
anterior. As provas locais autorizadas foram executadas; **nova revisão humana permanece pendente**.
G-DB global de rede/plantão/tarefa, G-AUTH/G-SEC/G-PRIV/G-REL e gates públicos permanecem abertos.
Controle global e limites locais não certificam anti-abuso público. O pool mantém fila limitada a 20;
saturação falha fechado e não deve ser confundida com o limite lógico de tentativas.

## Continuidade física: correções e provas

A rotação passou a filtrar também `usuario_id`: autenticar outra conta não revoga sessão de terceiro.
Login/logout adquirem lock da conta antes da sessão. A limpeza de buckets provocou deadlock real
(InnoDB confirmou evento em login_rate_limit) quando vinha antes dos contadores; foi movida para
depois do lock global, sem retry cego. Os cenários concorrentes passaram após a correção.
O teste do limite global foi ajustado para lotes concorrentes de 8, respeitando a fila técnica do pool:
64 tentativas com emails distintos produziram 60 permissões e 4 limites, preservando os contadores.
Aguardar todas as tarefas com allSettled evita limpar fixtures enquanto uma requisição ainda finaliza.

30 testes físicos cobrem FK/CHECK/índices, categorias distintas, credenciais inválidas/NULL/inativas,
guarda anônima/forjada/expirada/revogada/credencial alterada, cuidado negado, logout idempotente,
rotação própria/troca de conta, login/login e login/logout, locks em duas conexões diferentes,
alteração de conta durante login/revogação, limites compartilhados/pool novo/coleta, CSRF,
auditoria independente e rollback de sessão/revogação quando auditoria está indisponível.
Renomear temporariamente auditoria no schema de ensaio produz falha real de armazenamento;
a tabela foi restaurada em finally. Porta loopback fechada comprova falha de conexão sem cookie.

Falha de confirmação de COMMIT é **injetada no driver após executar COMMIT real**. Login não retorna
token/cookie nem repete INSERT; permanece uma sessão desconhecida do cliente que expira. Logout
confirmado no banco e repetido não duplica efeito/auditoria. **Não houve queda física de rede simulada**.
Nenhum hash/token/email/senha entra no detalhe da auditoria. DDL/metadados versionados não contêm linhas
ou segredos. A API retorna só identidade; HttpOnly e armazenamento JS vazio foram verificados no browser.
Pessoa Idosa usa fixture sintética da categoria, **sem executar ativação/convite da US-036**.

Comandos realmente executados para o ensaio (caminho privado agora removido):

```bash
node scripts/mysql-disposable.mjs start us002
node scripts/run-disposable-check.mjs /tmp/rede-apoio-us002-EmtL0M/state.json npm run test:integration:login
node scripts/run-disposable-check.mjs /tmp/rede-apoio-us002-EmtL0M/state.json npm run test:e2e:login:mysql
node scripts/mysql-disposable.mjs stop /tmp/rede-apoio-us002-EmtL0M/state.json
```

`vitest.login-integration.config.ts` e `playwright.login-mysql.config.ts` selecionam exclusivamente
os novos testes; a suíte antiga US-001 não é executada contra o schema novo por acidente.
O `start us002` só deve ser reutilizado sob autorização de novo ensaio descartável, sem dados reais.
Não deixar o banco disponível após o ensaio nem publicar seu state.json. CI padrão permanece sem MySQL.

Recuperação exige escopo próprio. US-003/005/007/035/036 devem implementar suas permissões por recurso,
vínculos e leitura do próprio cuidado; este PR não libera T03–T17 ou declara aquelas histórias concluídas.
Aguardar revisão humana deste Draft antes de trabalhos dependentes de sua incorporação à main.
Sem merge, deploy, fechamento de Issues, novos requisitos/papéis ou dados reais.

Referências técnicas consultadas: [Next.js autenticação/DAL](https://nextjs.org/docs/app/guides/authentication)
e [OWASP Session Management](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html).
