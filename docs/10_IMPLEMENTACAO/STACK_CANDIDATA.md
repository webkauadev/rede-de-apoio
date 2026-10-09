# Stack candidata para a futura aplicação — ainda requer decisão técnica

**Estado:** recomendação de engenharia **não homologada como tecnologia oficial da V1**. O usuário pediu SQL MySQL para importar depois no Workbench e quer que o Codex consiga construir a aplicação consultando apenas o GitHub. **Nenhum frontend, backend, ORM, banco ativo, serviço de autenticação, conta, API ou migration de produção foi criado nesta entrega.**

## Configuração candidata de baixo atrito com protótipo web mobile-first

| Camada | Recomendação inicial | Justificativa técnica / condição |
|---|---|---|
| Linguagem | **TypeScript** estrito | contratos compartilhados entre UI e API, inferência menor para agentes |
| UI | **Next.js + React**, mobile-first | aplicação web responsiva/PWA candidata, arquitetura declarativa e componentes reutilizáveis |
| Design | **Tailwind CSS + shadcn/ui + Material 3 em tokens** | alinhamento com o `Fluxo Final` e componentes locais, Bottom Sheet, campos/rows/cards |
| Dados | **MySQL 8.4 / InnoDB** | corresponde ao SQL experimental de `database/mysql/`, sem migração automática implícita |
| Acesso a dados | **ORM tipo Prisma** ou query layer tipada | sugerido para CRUD, mas requer prova de FKs compostas, generated columns, LOCK e histórico append-only; SQL bruto transacional quando necessário |
| Auth | a escolher entre **provedor externo** ou credencial própria com hashing robusto | **DB-016 PENDENTE**; o SQL aceita metadados de ambos, não determina qual usar |
| Validação | schema de entrada server-side + testes por US | autorização por contexto independe de formulário/frontend |
| Testes | unidade, integração API/DB autorizada, E2E mobile 390×844 | imagens Figma capturadas permitem testes visuais em GitHub |
| Observabilidade | logs sanitizados + auditoria separada | não registrar conteúdo sensível; negações auditáveis exigem desenho de rollback |
| Deploy | ambiente local/dev/staging/produção separados | hospedar somente após autorização e política de segredos/banco |

**Risco de assumir PWA:** a existência de um protótipo de aplicativo mobile no Figma **não prova** que a equipe escolheu navegador/PWA em vez de React Native ou Flutter. Não criar Next.js/React por inferência sem a escolha de entrega.

## Decisões técnicas mínimas antes do primeiro scaffold de aplicação

1. **Plataforma:** web responsiva/PWA vs. app móvel nativo/híbrido. *Recomendação*: web/PWA para reduzir complexidade da V1.
2. **Frontend e backend:** Next.js full-stack no monorepo vs. frontend separado + API. *Recomendação*: Next.js modular com serviço API claro, caso web/PWA seja escolhido.
3. **Provedor de login:** banco de credenciais próprias vs. autenticação integrada/externa; definir requisitos de convite à Pessoa Idosa e recuperação de senha (DB-016/017).
4. **Estratégia de SQL/ORM:** Workbench DDL experimental permanece fonte do protótipo, mas migrations de produção só após ADRs G1 e teste real.
5. **Ambientes e segredos:** estratégia de banco local, staging, backup e gestão de `.env`, sem credencial em repo.

**Se a equipe delegar oficialmente essas escolhas técnicas ao Codex**, registrar uma ADR de stack com data, responsável e compromissos testáveis no GitHub. Antes disso, o Codex pode investigar e preparar contratos, mas não publicar backend/frontend como se essa stack estivesse decidida.

## Princípios de implementação que independem da stack

- `RF→US→T##→estado→teste` com consulta aos comentários canônicos de aceite.
- Autorização no servidor para *toda* leitura/escrita sensível; perfil Pessoa Idosa é somente leitura.
- Vínculo vigente ≠ usuário existente; Principal único por rede e Profissional separado.
- Plantões simultâneos entre recursos distintos são permitidos; comandos concorrentes da mesma versão/ocorrência têm efeito único.
- Registros de cuidados não se sobrescrevem; correções são encadeadas com autoria.
- N01–N04 são feedback contextual nas telas existentes; não existe Central de Notificações.
- SQL V0.1 é **hipótese física**, sem execução MySQL, sem autenticação real e sem promessas de exactly-once.

## Atualização posterior (2026-10-09)

**Esta proposta já foi ratificada e detalhada** em [STACK_V1_HOMOLOGADA.md](STACK_V1_HOMOLOGADA.md). As frases abaixo dizendo "ainda não homologada" descrevem o estágio histórico da primeira avaliação e não são o status V1 vigente.
