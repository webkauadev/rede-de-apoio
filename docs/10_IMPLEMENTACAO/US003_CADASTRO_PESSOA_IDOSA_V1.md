# US-003 / RF03 / T12 — implementação parcial bloqueada por decisão

Branch `feat/us003-cadastro-pessoa-idosa-v1`, base humana `5ab918a2e4831572afad0900f6971b52b3ac126e`.
Owner David preservado. **BLOCKED_BY_DECISION / migration_required: prova verificável da elegibilidade do
Familiar que será Principal inicial no bootstrap DB-002**. Draft para revisão; nenhuma concessão criada.

## Autoridade e impedimento preciso

- [Handoff técnico #6147135134](https://github.com/webkauadev/rede-de-apoio/issues/39#issuecomment-6147135134).
- [Aceites aprovados #5673834995](https://github.com/webkauadev/rede-de-apoio/issues/39#issuecomment-5673834995),
  indexados em ACCEPTANCE_CRITERIA.yaml; origem única RF03/#7, US-003/#39, T12/E21, owner David.
- AGENTS, DECISOES_V1_HOMOLOGADAS (DB-001/002/004), CODEX_PLAYBOOK, stack V1, permissões e testes eficientes.

DB-002/B3 e a compatibilização com US-003 autorizam perfil pendente por Familiar autenticado que será
Principal inicial, **sem** rede operacional antecipada. Não especificam **quem designa esse ator e qual
prova persistida/revogável vinculada ao ator comprova essa designação**. CUIDADOR identifica conta,
não categoria Familiar/papel/contexto. DEC-AUTH-001, seção “Compatibilidade com bootstrap B3”, é explícita:
**“não inventar Principal antecipado nem transformar convite em permissão”**.

Portanto primeiro usuário, convite OPERADOR_BOOTSTRAP, sessão válida, ausência de rede ou declaração
`principal=true` não foram usados como autorização. O handoff item 3 manda manter fail-closed se faltar
prova; item 7 manda registrar BLOCKED_BY_DECISION. A pendência não reabre os critérios aprovados nem a
escolha B3: falta uma decisão específica sobre fonte confiável/designação, vínculo ao ator/escopo,
vigência/revogação e uso/idempotência dessa prova antes de ligar INSERT ao fluxo do app.
Nenhuma CLI de emissão, token novo, papel, constraint de exclusividade ou bypass foi inventado.

| Critério aprovado | Situação honesta |
| --- | --- |
| Familiar Principal cadastra em T12 | Formulário/contrato/adaptador preparados; cadastro autorizado pelo app **bloqueado** |
| Perfil representa contexto ao qual rede será vinculada | Adaptador grava pessoa_idosa pendente no ensaio; não é prova de autorização nem de fluxo completo |
| Exatamente um Principal ativo por rede | Nenhuma rede/papel criado; constituição operacional com Principal+Profissional pertence às US-005/007, não foi simulada |

## Implementação autorizada

- `/pessoa-idosa/cadastro`: estado registration de T12/E21, header/back branco, hero de perfil vazio,
  nome e data civil de nascimento, Input/Button existentes, tokens, targets >=48 px, safe areas,
  viewport central contido. Não usa Bottom Sheet (T12 fora do padrão contextual).
- Fonte congelada `FIGMA_SNAPSHOT/assets/T12.png`, view `5926:2126`; registration `5926:35570`,
  validation_error `5926:35701`. Registration não possui PNG próprio no pacote; aplicação deriva
  `PAGE BASE + DELTA MÍNIMO`, trocando campos de leitura por entrada e usando avatar vazio de perfil
  ainda inexistente. Nenhuma fotografia/pessoa do exemplo foi copiada para dados ou UI operacional.
  Não há implementação de edit/Success/US-004 nem acesso do idoso US-036.
- Formulário deixa **indisponibilidade explícita**, foca erros/feedback, bloqueia envio duplo e mantém
  carregamento na mesma estrutura. Não exibe sucesso fictício nem concede acesso a T13/cuidado.
- Zod estrito: nome trim até160/control chars rejeitados, data civil válida ISO ou vazia→NULL, sem idade
  clínica presumida. Sem rede/papel/ator/titular no DTO. Conteúdo textual não vira HTML; SQL parametrizado.
- POST `/api/pessoas-idosas`: Origin configurada/Sec-Fetch-Site, JSON limitado a8192 bytes, validação,
  sessão revalidada, categoria e gate oficial. CUIDADOR recebe403 BLOCKED_BY_DECISION; Pessoa Idosa não
  escreve; sem ambiente/auditoria retorna503. Negação é sanitizada/auditada em transação separada.
- GET permanece fechado, inclusive para criador, até contexto autorizado; não consulta/exibe perfil
  de terceiro por ID/query. Nenhuma rota de edição foi implementada. Responses no-store/private/Vary Cookie.
- `insertPendingProfile` é adaptador server-only **não conectado a nenhum caminho HTTP de escrita**:
  recebe executor transacional e ator do servidor, insere somente nome/data/cadastrante/titular=NULL;
  ID string obtido na mesma conexão sem perda de precisão BIGINT; audit PERMITIDO na mesma transação.
  Não cria rede, vínculo, papel, login do titular ou exclusividade de perfil por cuidador.
- Nenhum retry automático; rollback/COMMIT incerto do adaptador existente são propagados. Idempotência
  do **cadastro autorizado positivo** e revalidação da prova na transação permanecem pendentes da decisão.
  Repetir o endpoint oficial bloqueado produz zero efeitos de perfil (negações são tentativas auditáveis).

## Ensaios MySQL autorizados — limites e interpretação

Handoff #6147135134 autorizou ambiente novo US-003 no Fedora, rootless/loopback e só dados sintéticos.
Perfil explícito `start us003` gera recursos/labels/marcador/credenciais separados. Perfis US-001/002
não foram reutilizados. Baseline001 + validação002 + adições003/004/005: **30/30/31/32/34 tabelas**,
MySQL **8.4.11**. Não houve migração nova nem alteração dos scripts existentes.

Primeiro ensaio: `rede-apoio-us003-3e5b30e8c358`, `127.0.0.1:33155`, state privado
`/tmp/rede-apoio-us003-BuUlZd/state.json`. Dez cenários físicos passaram, com repetição dirigida do
cenário de leitura após acrescentar fixture real de terceiro: 1 passou/9 não selecionados, sem inflar
contagem de cenários. DDL de pessoa_idosa e metadados estão em [mysql-structure.json](EVIDENCIAS/US003/mysql-structure.json),
sem linhas/segredos. Nenhum teste aprovou elegibilidade por mock, convite ou identidade.

Os dez cenários verificam FKs/metadados, INSERT parametrizado de **adaptador de teste** pendente,
NULL titular/zero rede/papéis, FK de cadastrante inválido, rollback de perfil+audit, falha física de
armazenamento de auditoria (rename temporário no schema próprio/restaurado em finally), COMMIT real
com falha de confirmação **injetada** sem retry, duas conexões distintas criando fixtures sem impor
unicidade de perfil por ator, serviço oficial CUIDADOR bloqueado em tentativas concorrentes, DTO/Origin,
leitura de perfil real de terceiro negada e categoria Pessoa Idosa impedida de cadastrar.
**Persistência de adaptador/fixture não equivale a cadastro autorizado ou aceite final.**
Não foi alegada queda física de rede; não se criou rede operacional para produzir cenários.

O primeiro E2E MySQL recebeu403 mas estourou timeout global30s ao ler body; **não foi aprovado**.
Após teardown, foi criado o segundo recurso novo/sequencial `rede-apoio-us003-dc20df3b0c7b`,
loopback127.0.0.1:39407, state privado `/tmp/rede-apoio-us003-lnQOv4/state.json`.
Orçamento60s não resolveu. A causa no cliente era resposta fetch sem consumo do body; o formulário
passou a aguardar JSON antes de encerrar feedback/loading. O timeout foi restaurado a30s: **1 E2E MySQL
passou**, cenário1,6s/execução4,4s. Testa sessão real + T12 + código BLOCKED_BY_DECISION, auditoria,
zero perfis/redes/papéis e leitura negada. **Não é cadastro autorizado positivo.**
[Metadados do segundo ensaio](EVIDENCIAS/US003/mysql-e2e-structure.json); também34 tabelas/8.4.11.

## Protocolo otimizado aplicado

Ambiente Fedora44 x86_64, Node24.18.0, npm11.16.0, Python3.14.7.

| Verificação executada localmente | Resultado |
| --- | --- |
| `npm test -- tests/unit/pessoa-idosa.test.ts` durante edição | 17 passaram |
| `npm run verify:fast` ao estabilizar | Formatter/lint/typecheck e **166 unitários passaram** |
| Build e `npx playwright test tests/e2e/pessoa-idosa.spec.ts` | **6 passaram**, 4mobile +2desktop @responsive |
| MySQL `npm run test:integration:profile` via executor privado | **10 cenários passaram**, adaptador/negações, não autorização positiva |
| E2E MySQL afetado | **1 passou**, somente negação oficial com sessão real |
| Quatro validadores Python | Passaram |
| `npm audit --omit=dev` | 0 vulnerabilidades de produção |

Após corrigir safe areas da tela própria, apenas build/testes T12 foram repetidos. Após ampliar a
fixture de terceiro, apenas o teste físico afetado foi repetido. Após corrigir consumo do body, apenas
build/E2E afetados foram repetidos; não se aumentou timeout para mascarar a falha. Não se repetiram suítes MySQL de
US-001/002 nem todos os viewports por cenário. Layouts transversais existentes não foram alterados:
classe profile-shell é isolada; não houve necessidade de all-platforms. CI padrão completo será
verificado no Draft e deve executar todos mobile + desktop @responsive, npm ci/unit/build e validadores.
Não se registram as30 execuções planejadas do CI como resultado antes da execução.

Comandos dos ensaios (state fora do Git, removido após verificação nome/ID/label):

```bash
node scripts/mysql-disposable.mjs start us003
node scripts/run-disposable-check.mjs <state-privado> npm run test:integration:profile
node scripts/run-disposable-check.mjs <state-privado> npm run test:integration:profile -- -t 'HTTP real'
node scripts/run-disposable-check.mjs <state-privado> npm run test:e2e:profile:mysql
node scripts/mysql-disposable.mjs stop <state-privado>
```

Varredura de segredos do primeiro ensaio passou. Recursos próprios foram removidos após identificação;
`mysql-workbench` (`7424faa44a7a`) e `compat` (`d60ba846e2ff`) preexistentes preservados. O segundo teardown
também foi conferido: contêiner/volume/diretório privados removidos, apenas recursos próprios. Nenhum servidor de produção/remoto ou dado real foi utilizado.

Capturas locais (não substituem o snapshot canônico): [Mobile registration](EVIDENCIAS/US003/T12-mobile-registration.png),
[Desktop registration](EVIDENCIAS/US003/T12-desktop-registration.png), [Validation](EVIDENCIAS/US003/T12-mobile-validation.png).
Capturas/trace/video de cenário com cookie real são desabilitados pela configuração MySQL.

## Continuidade necessária

Registrar no GitHub uma decisão **específica de prova verificável de bootstrap** vinculada ao ator,
sem usar identidade/convite como permissão e sem Principal antecipado. Só então implementar resolver,
revalidação/consumo/idempotência transacional e provar cadastro autorizado no app, sem rede operacional.
Depois, US-005/007 constituirão rede completa e papéis; US-004/036 permanecem fora deste incremento.
US-003/#39 e RF03/#7 continuam abertas, owner David. G-DB global/G-AUTH/G-SEC/G-PRIV/G-REL preservados.
Sem merge/deploy; Draft contém uma entrega parcial revisável e **não uma conclusão da US**.
