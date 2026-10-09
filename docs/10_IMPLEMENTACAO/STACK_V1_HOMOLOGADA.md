# ADR-STACK-V1 — Stack aprovada para o Codex

**Data:** 2026-10-09. **Autoridade:** delegação expressa do solicitante para definir e homologar a arquitetura e avançar. **Estado:** HOMOLOGADA PARA INÍCIO DA IMPLEMENTAÇÃO. O aplicativo **ainda não foi implementado** nesta rodada de SQL/contexto.

## Tecnologias do projeto

| Camada | Escolha V1 | Regra de implementação |
|---|---|---|
| Plataforma | **Web responsiva mobile-first / PWA** | V1 sem código nativo/React Native/Flutter e sem aplicativo separado da Pessoa Idosa |
| Linguagem | **TypeScript estrito** | `strict: true`, sem uso casual de `any` para dados sensíveis |
| UI | **React + Next.js App Router** | UI e rotas/API organizadas por domínio, foco em 390×844 e responsividade |
| Componentes | **Tailwind CSS + shadcn/ui + tokens da Rede de Apoio, Material 3 como UX** | reproduzir T01–T17 do snapshot GitHub e estados da matriz; Bottom Sheet onde canônico |
| Backend | **Route Handlers / serviços do Next.js em Node.js**, com camadas `domain`, `services`, `repositories` e `authorization` | regras, escrita e autenticação sempre verificadas no servidor |
| Banco | **MySQL 8.4, InnoDB, utf8mb4** | tomar `database/mysql/001_rede_de_apoio_schema.sql` consolidado como DDL da prototipação, sem execução automática nesta etapa |
| Data access | **mysql2/promise + SQL parametrizado**, com transações explícitas para invariantes | evita perda silenciosa de FKs geradas/composição no ORM; migrations posteriores sob controle, sem modificar DDL manualmente em prod |
| Validação | **Zod** nos limites de API/formulário | schemas de entrada, whitelists de campos e saída sanitizada |
| Auth | **Email + hash Argon2id** via biblioteca mantida; sessões persistentes por cookie `httpOnly`/`Secure`/`SameSite`, CSRF e rate limiting | mesma autenticação para Cuidador e Pessoa Idosa, sem papéis familiares para titular |
| Testes | **Vitest** unidade/serviço + **Playwright** E2E; testes reais de integração MySQL em instância descartável **após liberação do ambiente** | assertions negativas de autorização, concorrência, idempotência e snapshot visual |
| Qualidade | ESLint + formatter + validação do contexto/snapshot/SQL, PR por US | nenhum bypass de CI para merge |
| Infraestrutura | ambientes `local`, `test`, `staging`, `production`; segredos somente em variáveis de ambiente | `.env.example` sem valores reais, backups e proteção dos logs |

**Decisão de ORM:** não gerar Prisma automaticamente nesta V1. O SQL fonte tem chaves compostas, generated columns e transações/locks específicos do MySQL; usar `mysql2/promise` como camada tipada com repositórios para manter o desenho SQL sob controle. A migração para ORM no futuro exigirá ADR, validação de paridade e teste real.

**Política de versões:** não inventar versionamento concreto de pacotes que ainda não foi instalado; ao criar o scaffold, selecionar releases estáveis compatíveis com o Node LTS disponível, registrar versões exatas em `package-lock.json`, conferir suporte/segurança e atualizar documentação. Isto não atrasa a escolha arquitetural.

## Estrutura inicial sugerida (não criada nesta revisão)

```text
src/
  app/                # Next.js App Router, rotas UI e handlers API
  components/         # shadcn + design-system local; AppShell, BottomSheet
  domains/
    auth/
    pessoa-idosa/
    rede/
    plantoes/
    tarefas/
    diario/
    medicacoes/
    consultas/
    notificacoes/
    auditoria/
  server/
    auth/             # sessoes, CSRF, controles de acesso
    db/               # conexao mysql2, transacoes, repositorios
    security/         # gates e logs sanitizados
tests/
  unit/
  integration/
  e2e/
database/mysql/       # SQL V1, readme, esquema verificavel
docs/10_IMPLEMENTACAO # backlog, imagens e contrato Codex
```

As escolhas funcionais são as de [DECISOES_V1_HOMOLOGADAS.md](DECISOES_V1_HOMOLOGADAS.md), não de screenshots ou tabelas isoladas.

## Instrução de início do Codex

> Leia `AGENTS.md`, `docs/10_IMPLEMENTACAO/README.md`, `DECISOES_V1_HOMOLOGADAS.md`, `STACK_V1_HOMOLOGADA.md` e `IMPLEMENTATION_BACKLOG.json`. Inicie o scaffold web com Next.js + React + TypeScript strict + Tailwind/shadcn + mysql2/promise, em branch e PR de infraestrutura. **Não conecte/execute banco real sem ambiente autorizado; não implemente comportamentos fora dos RF/US e decisões V1.** Configure lint, testes e CI sem dados reais. Depois implemente por US, cada uma com testes e PR.

## Regras que permanecem inegociáveis

1. P01–P09 e aceites RF/US canônicos são fonte primária; decisão V1 complementa lacunas sem apagar aprovações históricas.
2. N01–N04 apenas feedback transitório no AppShell; N02 singular para responsável designado em plantão ativo.
3. Pessoa Idosa só leitura do próprio cuidado, sem T16/T17/CSV.
4. Original de saúde imutável, revisão por versão, auditoria sem dados clínicos completos.
5. Não implantar sem [gates operacionais](GATES_DE_IMPLANTACAO_V1.md) e sem revisão humana para cada futuro merge de código.
