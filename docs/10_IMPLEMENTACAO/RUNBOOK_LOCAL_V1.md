# Scaffold executável V1 — Issue #117

Base técnica provisória, sem autenticação funcional, dados clínicos ou conexão MySQL.
A página `/` não é uma implementação de T03 nem uma nova tela de produto.
Contrato: [stack homologada](STACK_V1_HOMOLOGADA.md), [decisões V1](DECISOES_V1_HOMOLOGADAS.md)
e [gates](GATES_DE_IMPLANTACAO_V1.md).

## Ambiente verificado

Fedora Linux 44 x86_64; Git 2.55.0; Node 24.18.0; npm 11.16.0;
Python 3.14.7; gh 2.97.0. Node/npm já estavam instalados. Dependências npm locais,
Chromium Playwright no cache do usuário e PyYAML 6.0.3 na `.venv` foram instalados.
Não houve instalação de MySQL nem alteração de bibliotecas do sistema.

Versões instaladas: Next 16.4.0, React/React DOM 19.3.0, TypeScript 6.0.3,
Tailwind 4.3.3, mysql2 3.24.5, Zod 4.6.5, Vitest 5.0.3, Playwright 1.64.0,
ESLint 9.39.5/config-next 16.4.0, Prettier 3.9.9. O lockfile registra dependências transitivas.

## Clone e inicialização no Fedora

Se faltarem ferramentas básicas: `sudo dnf install git python3 nodejs npm`.
Confirme a versão Node 24 antes de instalar as dependências. Se a distribuição oferecer
outra versão, use um gerenciador no usuário (por exemplo nvm já instalado):
`nvm install` e `nvm use`, que leem `.nvmrc`. Não instalar npm global com sudo.

```bash
git clone https://github.com/webkauadev/rede-de-apoio.git
cd rede-de-apoio
node --version
npm --version
npm ci
npm run dev
```

Abrir `http://localhost:3000`. Não precisa criar `.env.local` para o scaffold.
Quando houver ambiente de banco autorizado, copiar `.env.example` para `.env.local`
e preencher localmente; nunca versionar segredos ou usar prefixo NEXT_PUBLIC para eles.
A configuração de banco é validada só ao solicitar uma operação. `SESSION_SECRET` é
reservada, ainda não consumida. O exemplo contém apenas nomes, campos vazios e porta padrão.

## Checks reproduzíveis sem banco

```bash
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`typecheck` gera os tipos de rotas do Next antes do `tsc`, inclusive num clone sem `.next`.
`test:e2e` inicia e encerra o build de produção em `127.0.0.1:3100`; executar build primeiro
e deixar a porta livre. Chromium emula 390×844 e também desktop. Playwright usa fallback
Ubuntu no Fedora, que funcionou neste ambiente. Se faltarem bibliotecas, inspecionar o erro
e instalar somente as dependências Fedora correspondentes; `install --with-deps` é usado
no CI Ubuntu, não recomendado automaticamente no Fedora. Relatório: `playwright-report/index.html`.

```bash
python3 -m venv .venv
.venv/bin/python -m pip install PyYAML==6.0.3
.venv/bin/python scripts/validate_agent_context.py
.venv/bin/python scripts/validate_sql_prototype.py
.venv/bin/python scripts/validate_visual_snapshot.py
.venv/bin/python scripts/validate_implementation_backlog.py
```

`npm run format` formata os arquivos novos de código/configuração. `.prettierignore` preserva
os documentos canônicos e workflows anteriores; os novos documentos Markdown são revisados
separadamente. `npm run start` serve o build em 3000. `test:watch` oferece Vitest interativo.

## Arquitetura efetiva

- `src/app`: App Router, metadados, CSS/tokens e página técnica estática.
- `src/components/layout/app-shell.tsx`: header → slot opcional LocalSubnav → viewport com
  clipping/scroll central → navegação. `100dvh`, `min-height: 0`, isolamento e safe areas
  preservam shell. Destinos só viram links quando a rota for fornecida; isso não é autorização.
- `src/components/ui/card.tsx`: Card gerado com shadcn, adaptado para padding 16, raio 12,
  elevação canônica e título semântico. `components.json` prepara novas primitives.
- `src/lib/utils.ts`: composição/merge de classes Tailwind.
- `src/domains/README.md`: mapa dos domínios futuros; sem dezenas de módulos vazios.
- `src/server/auth` e `src/server/security`: contratos documentados das US futuras, sem endpoints.
- `src/server/db`: módulo `server-only`, pool lazy, executor tipado e transações explícitas.
- `tests/unit`: configuração, renderização e driver simulado; `tests/e2e`: HTTP/UI/scroll.
- `tests/integration`: gate documentado para MySQL real, ainda não executado.

Tailwind v4 usa configuração CSS em `globals.css` + PostCSS; não exige `tailwind.config.js`.
Tokens vêm de `DESIGN_TOKENS.md`; Geist está empacotada com Fontsource para build sem download
de fontes. A revisão React manteve Server Components, sem effects/hooks ou fetches desnecessários.

Para US futuras: Route Handler valida entrada Zod, serviço autoriza e orquestra regras,
repositório executa SQL parametrizado. A autorização contextual permanece no servidor.
Auth será email/Argon2id com sessão persistente e cookies httpOnly/Secure/SameSite,
CSRF, revogação e limitação de tentativas, conforme as decisões aprovadas; não foi implementada aqui.
Bottom Sheet operacional T06/T08/T09/T10/T11 será implementado na respectiva US, sem drawer lateral.

## Contrato da camada de dados

`database.select<T>(sql, parameters)` e `database.execute(sql, parameters)` usam prepared
statements (`execute`). SQL deve ser constante do repositório, com placeholders para valores;
nunca passar SQL, tabela ou ordenação vindos diretamente do usuário. `withTransaction(callback)`
entrega executor ligado à mesma conexão; confirma no sucesso, reverte na falha e libera a conexão.
Rollback falho destrói a conexão. Erros do driver são substituídos por mensagem fixa sem credenciais;
erros de domínio do callback são preservados para mapeamento futuro de conflitos/validação.
Handlers futuros devem sanitizar também esses erros de domínio antes de responder.
Não há retry automático: idempotência, locks e códigos de conflito pertencem ao serviço de cada US.

BIGINT vem como string e DATETIME como string, preservando precisão; instantes devem ser
interpretados como UTC no domínio. Isso não implementa conversão DST ou recorrência.
`closeDatabase()` encerra o pool sob demanda. Nenhuma rota deste scaffold importa/acessa o banco.

SQL: [001_rede_de_apoio_schema.sql](../../database/mysql/001_rede_de_apoio_schema.sql),
30 tabelas, preservado integralmente. Sem migrations, seeds, Prisma, banco/usuário físico ou
importação Workbench nesta Issue. A execução real exige autorização e G-DB; os testes do driver
são mocks e não comprovam integridade, isolamento ou concorrência MySQL 8.4.

## Evidências e limites

Em 2026-10-09: lint sem warnings, typecheck, build, 20 testes unitários e 2 E2E passaram;
os quatro validadores existentes passaram. O E2E confirmou HTTP 200, texto provisório, ausência
de formulários, targets ≥48×48, ausência de overflow horizontal e header/nav estáveis ao rolar.
[Captura mobile](evidencias/issue-117/mobile.png) e [desktop](evidencias/issue-117/desktop.png)
foram inspecionadas; são evidências do scaffold, não novas baselines Figma.

Falhas corrigidas: export anônimo PostCSS gerava warning de lint; import `cn` gerado foi
redirecionado à utilidade local; configuração ESM do Vitest e geração dos tipos em clone limpo
foram ajustadas. O Next dev 16.4 adicionava regras ao AGENTS.md: `agentRules: false`
desabilita essa geração e o contrato original foi restaurado integralmente. Dev em
`127.0.0.1:3101` também respondeu HTTP 200 com conteúdo técnico confirmado. Rollback falho passou a descartar conexão e erro de domínio foi preservado.

`npm audit --omit=dev`: zero vulnerabilidades. Audit completo: cinco entradas high na mesma
cadeia dev `eslint-config-next → plugin-next → fast-glob → micromatch → braces`,
[GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).
A release consultada de braces é 3.0.3, ainda afetada. O `audit fix --force` sugeria retroceder
config-next para 14.2.35; não foi aplicado porque quebraria o alinhamento com Next 16.
ESLint 9 também emite aviso de fim de suporte; eslint-plugin-react da configuração Next declara
peer até 9.7, impedindo assumir paridade com ESLint 10. A resolução upstream dessa cadeia é
pendência de revisão; o PR fica draft. Não é prova de vulnerabilidade clínica em runtime.

O workflow `application-validation.yml` executa npm ci, formatter, lint, typecheck, unit,
build e E2E em Ubuntu/Node fixado. Workflows anteriores ficam intactos. CI não conecta MySQL.
Status remoto e links de execução serão registrados no PR; êxito local não implica êxito de CI.

## Continuidade e fontes canônicas

Ler AGENTS → playbook → decisões/stack → backlog → Issue/comentário aprovado indicado
em `ACCEPTANCE_CRITERIA.yaml`. `STATE_MATRIX.yaml`, `SCREEN_REGISTRY.yaml`, tokens e
`FIGMA_SNAPSHOT/SCREENSHOTS_INDEX.json` explicam T01–T17 e estados. Não deduzir permissões de PNG/DDL.

[Plano incremental](CONTINUIDADE_V1.md): próxima US recomendada é US-001/#37,
após revisão e incorporação humana desta infraestrutura. Persistência real depende de autorização
para ambiente descartável e G-DB; escopo/testes serão definidos a partir do comentário canônico.

## Revisão de segurança transacional do PR #118 — 2026-10-09

Após revisão, a camada `withTransaction` distingue erro **antes de tentar COMMIT** de erro **depois de iniciar COMMIT**. Uma exceção de `commit()` **não demonstra que a transação foi revertida**: pode ter sido confirmada no servidor e a resposta ter sido perdida. Nesse caso o módulo agora:

- não tenta um `ROLLBACK` enganoso após o COMMIT incerto;
- destrói a conexão em vez de devolvê-la ao pool;
- retorna `TransactionOutcomeUnknownError` sem detalhes internos;
- não faz retry implícito (operações posteriores deverão usar a estratégia aprovada de idempotência/reconciliação).

Foi adicionado teste unitário sintético para falha de COMMIT, descarte da conexão e ausência de `rollback`/retry. Isso **não comprova** comportamento de duas sessões em MySQL real, que continua sujeito ao gate G-DB.

**Dependências de desenvolvimento:** o `npm audit` registrado no PR identificou cinco achados high na cadeia de ferramentas de lint/transitivas; em runtime o audit anterior `--omit=dev` indicou zero vulnerabilidades. Não aplicar `npm audit fix --force` com downgrade incompatível. O PR permanecerá **draft** enquanto a avaliação/aceitação do risco de dependências estiver pendente. Atualizações devem ser compatíveis com Node/Next homologados e comprovadas por CI, sem prometer que esse commit saneia o advisory.

## Avaliação consolidada do GHSA-vfj7-8cjw-p6xm — 2026-10-09

A cadeia de desenvolvimento `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces` foi auditada. A ficha oficial não disponibiliza versão corrigida de `braces` nesta data. Não aplicar `npm audit fix --force` nem alterar stack Next/ESLint incompatível. Avaliação integral, limites e critérios de revisão estão em [AVALIACAO_RISCO_DEPENDENCIAS_V1.md](AVALIACAO_RISCO_DEPENDENCIAS_V1.md). O CI agora executa `npm audit --omit=dev --audit-level=high` para reprovar novas vulnerabilidades high/critical em runtime. Os avisos dev permanecem como risco residual a ser avaliado no merge humano; **não estão corrigidos**.
