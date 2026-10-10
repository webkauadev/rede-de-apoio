# US-001 / RF01 / T02 — cadastro de CUIDADOR por convite

**Estado:** fluxo local implementado, em validação/revisão humana no **Draft PR #120**, branch `feat/us001-cadastro-conta-v1`. Owner David preservado. Nenhum merge, deploy ou encerramento automático da Issue.

## Fontes canônicas

- [Issue #37](https://github.com/webkauadev/rede-de-apoio/issues/37), [três aceites aprovados](https://github.com/webkauadev/rede-de-apoio/issues/37#issuecomment-5673832998), RF01/RNF01.
- **[DEC-AUTH-001 homologada](DEC_AUTH_001_CONVITES_CUIDADORES.md)** e [aprovação na Issue](https://github.com/webkauadev/rede-de-apoio/issues/37#issuecomment-6092864135) resolvem a lacuna de autorização de cadastro. Não permanece BLOCKED_BY_DECISION para esse modelo.
- [Instruções de continuação do PR](https://github.com/webkauadev/rede-de-apoio/pull/120#issuecomment-6092916927), [decisões V1](DECISOES_V1_HOMOLOGADAS.md), [stack](STACK_V1_HOMOLOGADA.md), [aceites](../01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml), [permissões](../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md), [gates](GATES_DE_IMPLANTACAO_V1.md).
- [T02 congelada](FIGMA_SNAPSHOT/assets/T02.png), [estados](../07_AI_CONTEXT/STATE_MATRIX.yaml), [tokens](../04_DESIGN_SYSTEM/DESIGN_TOKENS.md). Baseline e critérios não foram alterados.

## Fluxo e segurança

1. Operador técnico local, autenticado pelo SO e por credenciais do MySQL descartável autorizado, emite o primeiro convite pela CLI. Não existe endpoint de emissão, formulário público, usuário admin ou papel do operador no app.
2. T02 aceita código individual mascarado ou fragmento `#convite=...`. O navegador remove o fragmento do histórico antes de preencher o campo; token não vai em query/referrer, storage ou analytics. A página usa `no-referrer`. Dados inválidos têm mensagens ligadas aos campos e foco; loading mantém o AuthShell. A adição de código/ajuda é o delta necessário da DEC-AUTH-001; demais campos/tokens/controles são reutilizados. Conteúdo maior rola no viewport abaixo do header, inclusive em 320×568; targets ≥48×48.
3. Backend exige origem canônica **explicitamente configurada** e JSON limitado a 8192 bytes. Zod estrito rejeita campos de papel/rede/categoria/autorização/emitente. Senhas são preservadas sem trim, confirmação igual e limite técnico 1024 bytes. E-mail usa trim/lowercase, formato e limite 254; nome trim/limite 160. Não foi inventada política de composição de senha.
4. Antes de Argon2id, aplica limite persistente por janela UTC no MySQL e verifica token SHA-256, e-mail exato, expiração, uso e revogação. Nenhum erro expõe existência de e-mail, SQL, credenciais ou token. O retorno 409 genérico também cobre convite usado e conflito de unicidade.
5. Argon2id real (`argon2` 0.45.1), m=19456 KiB, t=2, p=1, salt aleatório, hash 32 bytes. [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [node-argon2](https://github.com/ranisalt/node-argon2).
6. Transação confirma novamente convite com `SELECT ... FOR UPDATE`, insere somente `usuario/CUIDADOR`, consome convite exigindo uma linha alterada e grava auditoria PERMITIDO. Qualquer falha reverte esses efeitos juntos. UNIQUE do e-mail é a garantia final. DENY de convite/dados é sanitizado e persiste fora do rollback; limitações ficam nos contadores persistentes, sem eventos ilimitados por tentativas bloqueadas.
7. COMMIT sem confirmação descarta a conexão; não faz rollback enganoso ou repetição de INSERT. Reconcilia somente leitura: convite consumido + e-mail + hash Argon2id aleatório **desta operação**. Sem essa prova, 503 informa resultado não confirmado. Repetição normal de convite usado retorna 409, sem efeito novo.
8. Cadastro não cria sessão, `membro_rede`, papel familiar, rede, plantão ou acesso clínico. Identidade fica disponível no modelo comum de autenticação; login/sessões continuam US-002. Pessoa Idosa e convites de titular continuam US-036/DB-017. Emissão posterior pelo Principal depende de US-002/005/007; não foi fabricada integração de administração de rede.

## Bootstrap local controlado

Token CSPRNG de 32 bytes em base64url; somente SHA-256 é persistido. CLI exige `--confirm-local-disposable`, usuário de SO não-root, ambiente local autorizado, origem/host loopback, arquivo novo (`O_EXCL`, 0600) e diretório privado do próprio operador (0700). Não aceita token como argumento e não imprime token. A entrega a um destinatário depende de canal privado autorizado, fora de logs; nenhuma mensagem externa foi enviada nesta execução.

Emissão e cadastro usam o mesmo lock nomeado na **mesma conexão** da transação, preservando ausência de cuidadores e único bootstrap aberto diante de corrida. Isso serializa a seção final de criação e o bootstrap nesta V1 local; o hash fica antes da seção crítica. [Locks nomeados MySQL 8.4](https://dev.mysql.com/doc/refman/8.4/en/locking-functions.html) precisam de liberação explícita na conexão, inclusive após commit; falha de liberação destrói conexão. FOR UPDATE e índices permanecem como proteção dos dados.

Convite vencido ainda ocupa “aberto”. Reemitir exige `--revoke-previous` explícito e zero CUIDADOR. `--revoke` revoga somente bootstrap aberto. `--hours` aceita 1–168 horas como limite técnico de operação, padrão 24. Falha de escrita/COMMIT na emissão pode exigir revogação/reconciliação operacional; **não repetir automaticamente**. Depois de existir CUIDADOR, a CLI nega nova emissão bootstrap.

## Controle técnico de abuso e limites de publicação

`004_cadastro_rate_limit.sql` é aditivo, sem alteração do `001`/`003` e sem nova regra funcional. Acrescenta buckets persistentes sem IP/e-mail/token bruto: global **30 tentativas/minuto**, por hash de convite **5/15 minutos**, ambos parâmetros de engenharia para revisão. Incremento é atômico, nega antes do hash e confirma contagem mesmo se cadastro falhar. Bucket global nega antes de criar buckets arbitrários; contadores sobrevivem a novo pool/processo. Indisponibilidade do banco/limitador nega o cadastro, sem fallback em memória.

A aplicação só habilita este fluxo no perfil explícito `REGISTRATION_ENVIRONMENT=local-disposable`, com banco loopback e origem local. Esse perfil **não comprova autorização**: convite válido continua obrigatório. Fora dele permanece 403. Rate limit global conservador é adequado ao ensaio, não certificação anti-abuso para exposição pública. G-AUTH/G-SEC/G-PRIV/G-REL continuam exigindo revisão; sessão/recovery e operação pública estão fora desta entrega.

## MySQL real autorizado e reprodução no Fedora

Fedora 44 x86_64; Podman 5.8.7 rootless; Node 24.18.0; npm 11.16.0; Python 3.14.7. Harness usa `mysql:8.4`, verifica versão/destino, cria nome/rótulo exclusivos e volume anônimo novo, mapeia só `127.0.0.1:<porta-livre>:3306`. Credenciais CSPRNG ficam em diretório temporário 0700/arquivos 0600 fora do Git. Container e volume preexistentes, inclusive MySQL do host, não são utilizados.

```bash
npm ci
podman pull docker.io/library/mysql:8.4
node scripts/mysql-disposable.mjs start
# Copie somente o caminho state.json informado, nunca seu conteúdo/segredos.
# Exemplo abaixo: substitua <estado-privado> pelo caminho emitido.
node scripts/run-disposable-check.mjs <estado-privado> npm run test:integration
npm run build
node scripts/run-disposable-check.mjs <estado-privado> npm run test:e2e:mysql
# Para desenvolvimento com este ambiente: npm run dev -- --hostname 127.0.0.1 --port 3100 via run-disposable-check.
# Bootstrap manual, com destino em diretório 0700 do operador:
node scripts/run-disposable-check.mjs <estado-privado> npm run invite:bootstrap -- --email synthetic@example.invalid --token-file /caminho/privado/convite --confirm-local-disposable
# Somente recursos criados pelo harness; identidade/rótulo são conferidos:
node scripts/mysql-disposable.mjs stop <estado-privado>
```

Se prontidão expirar, `initialize <estado-privado>` permite retomar **somente no container identificado**, e só importa em schema vazio. Não inicialize host:3306 ou servidor externo. `run-disposable-check` confere nome/rótulo/ID antes de executar comando com ambiente privado. Ensaios usam somente `example.invalid` e dados sintéticos; arquivos de token são removidos ao final.

O harness executa `001` (30 tabelas), `002` de leitura ainda no baseline de 30, `003` (31) e `004` (32). Salva metadados/SHOW CREATE TABLE sem valores de usuários ou tokens. [Evidência estrutural](EVIDENCIAS/US001/mysql-structure.json). `001` e `002` permanecem intactos; contagens históricas não foram alteradas para esconder a migração.

## Resultados reais

Verificações executadas após `npm ci` limpo no Fedora:

| Comando | Resultado real |
|---|---|
| `npm ci` | PASS — lockfile, Argon2 e CLI TypeScript nativa verificados |
| `npm run format:check`, `npm run lint`, `npm run typecheck` | PASS |
| `npm test` | **67 PASS** em 5 arquivos |
| `npm run build` | PASS — página/handler, sem banco necessário para build |
| `npm run test:e2e` | **18 PASS** mobile/desktop sem MySQL |
| `npm run test:integration` via harness | **18 PASS**, MySQL 8.4.11 real |
| `npm run test:e2e:mysql` via harness | **6 PASS**, navegador/CLI/API/MySQL real, mobile/desktop |
| Quatro validadores Python | PASS — contexto, SQL baseline, 26 imagens, backlog/aceites |
| `npm audit --omit=dev --audit-level=high` | PASS — zero vulnerabilidades de runtime |
| `git diff --check` | PASS |
| Scanner de credenciais efêmeras em arquivos versionáveis | PASS — nenhum segredo encontrado |

Corridas comprovaram uma conta, um convite consumido e um evento PERMITIDO; segunda requisição negada, sem efeitos duplicados. Os 18 ensaios SQL incluem conexão concorrente realmente bloqueada por FOR UPDATE, índices UNIQUE, rollback após consumo, convite expirado/revogado/token/e-mail incorreto antes de Argon2id, bootstrap concorrente, reemissão explícita, persistência do limitador após novo pool e segurança da CLI. As duas suites de navegador verificaram também 403/422/409/429 reais.

**Cleanup confirmado:** `node scripts/mysql-disposable.mjs stop` removeu somente `rede-apoio-us001-e55972cbcfcc` e seu volume anônimo após validar ID/nome/rótulo. Diretório de credenciais apagado; `mysql-workbench`, `compat` e MySQL preexistente do host preservados. Cache da imagem permanece disponível. Nenhum ensaio tocou produção.

[Estrutura física](EVIDENCIAS/US001/mysql-structure.json) / [Resumo verificável](EVIDENCIAS/US001/results.json) / [T02 mobile](EVIDENCIAS/US001/T02-mobile-default.png) / [desktop](EVIDENCIAS/US001/T02-desktop-default.png) / [validação](EVIDENCIAS/US001/T02-mobile-validation.png) / [loading simulado](EVIDENCIAS/US001/T02-mobile-loading-simulated.png) / [ambiente fechado](EVIDENCIAS/US001/T02-mobile-authorization-pending.png). As capturas foram atualizadas após o delta do convite, sem alterar snapshots canônicos. CI do head publicado será registrado no PR. As suítes são separadas: `npm test` unitário; `npm run test:e2e` interface/negação sem MySQL; `test:integration` MySQL real; `test:e2e:mysql` navegador/API/banco real. CI padrão valida aplicação/contexto e continua sem conexão MySQL; a autorização de ensaio físico desta entrega foi aplicada no Fedora local.

Na integração, todas as respostas SQL vêm do MySQL real. Testes de confirmação incerta **injetam perda de confirmação após COMMIT real**, incluindo descarte da conexão real pelo driver, ou antes de qualquer efeito, e verificam reconciliação; não afirmam ter causado uma queda real de rede/produção. Traces/vídeos/capturas e snapshot DOM automático de falha dos testes com token real ficam desativados (PLAYWRIGHT_NO_COPY_PROMPT), e os campos são limpos no teardown para impedir vazamento; capturas visuais usam código sintético inválido mascarado.

Falha de desenvolvimento encontrada/corrigida: expressão de vigência retorna `"0"` com opções BIGINT do driver; conversão explícita impede hash de convite vencido. Também corrigidos fixtures sem o novo campo e comparação de posição em loading que ignorava scroll necessário do botão. Primeiro prazo de startup MySQL expirou antes de prontidão; execução retomada somente no container próprio identificado.

## Aceites e revisão

1. Usuário com convite autorizado cria identidade por T02: comprovado localmente por CLI → navegador → handler → MySQL.
2. Identidade usa estrutura comum `usuario`/e-mail/Argon2id e não ganha acesso além do atribuído: hash verificado e ausência de sessão/vínculos comprovadas. Login comum ponta a ponta ainda pertence à US-002; **não declarar esse fluxo concluído nem fechar a US agora**.
3. Cadastro não concede papel/permissão: zero vínculos/papéis/redes/plantões, DTO privilegiado rejeitado e SQL restrito comprovados.

Revisão humana dos três aceites permanece obrigatória. Evidência de US-001 não encerra **G-DB global**: concorrência de Principal/tarefa/plantão e outras US ainda exigem seus ensaios. GHSA dev preexistente continua em [#119](https://github.com/webkauadev/rede-de-apoio/issues/119); audit de runtime é obrigatório. Não marcar RF01/US-001 finalizadas, mudar owner, fazer merge ou deploy.
