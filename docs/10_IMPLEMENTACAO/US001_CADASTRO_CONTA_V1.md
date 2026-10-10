# US-001 — Cadastro de Conta: implementação parcial para revisão

**Issue:** [#37](https://github.com/webkauadev/rede-de-apoio/issues/37). **Branch:** `feat/us001-cadastro-conta-v1`. **Owner:** David, preservado. Base: scaffold revisado e incorporado em `ed75c72`, PR #118. Esta entrega não conclui a US e não libera cadastro em ambiente público.

## Fontes e escopo

- [Comentário técnico atual](https://github.com/webkauadev/rede-de-apoio/issues/37#issuecomment-6091789679), [aceite aprovado](https://github.com/webkauadev/rede-de-apoio/issues/37#issuecomment-5673832998), [RF01/#5](https://github.com/webkauadev/rede-de-apoio/issues/5), RNF01.
- [Aceites canônicos](../01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml), [decisões V1](DECISOES_V1_HOMOLOGADAS.md), [stack](STACK_V1_HOMOLOGADA.md), [gates](GATES_DE_IMPLANTACAO_V1.md), [permissões](../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md).
- T02: [baseline congelada](FIGMA_SNAPSHOT/assets/T02.png), [registry](../07_AI_CONTEXT/SCREEN_REGISTRY.yaml), [estados](../07_AI_CONTEXT/STATE_MATRIX.yaml), [tokens](../04_DESIGN_SYSTEM/DESIGN_TOKENS.md) e [componentes](../04_DESIGN_SYSTEM/COMPONENT_MAP.yaml). Nenhum snapshot, RF, aceite, permissão ou DDL foi alterado.

`/cadastro` implementa T02 com AuthShell, campos nome/e-mail/senha/confirmação, visibilidade de senha, validações associadas aos campos, foco no primeiro erro, loading sem duplo envio e feedback de indisponibilidade no mesmo shell. Não usa a navegação autenticada. Todos os controles têm pelo menos 48 × 48 px; scroll fica contido abaixo do header. Desktop centraliza a composição de 390 px da baseline; telas menores podem rolar. O botão Entrar permanece desabilitado até T01/US-002. Confirmação de criação no componente só pode aparecer com resposta 201 real; o resolver atual torna esse caminho inacessível. Não existe login automático, sessão ou redirecionamento funcional nesta entrega.

## Bloqueios explícitos

### BLOCKED_BY_DECISION — como comprovar usuário autorizado

RF01 e o aceite de US-001 exigem usuário autorizado, mas as fontes consultadas não definem mecanismo de autorização inicial para cadastro. O comentário técnico determina negar/restringir sem inventar requisito. `authorizeRegistration()` sempre nega; não há flag de ambiente, parâmetro do cliente, convite inventado ou bypass público para habilitar cadastro. A rota responde 403 com explicação, antes de hash ou conexão MySQL.

**migration_required:** registrar na Issue #37 uma decisão humana específica sobre a comprovação de autorização, seu contexto/validade e os testes negativos correspondentes. Isso é uma lacuna registrada, não novo critério aprovado. O serviço aceita uma dependência de autorização exclusivamente de servidor para viabilizar a decisão futura; permissões positivas nos testes são simuladas e não equivalem a autorização homologada.

### G-DB — persistência e concorrência reais pendentes

Nenhum MySQL foi instalado, provisionado, conectado ou executado. Não houve importação, migration, seed ou uso de dados reais. Não há ambiente MySQL 8.4 descartável explicitamente liberado para esta execução. O [SQL V1](../../database/mysql/001_rede_de_apoio_schema.sql) permanece intacto.

O repositório utiliza apenas `INSERT INTO usuario (nome, email_normalizado, senha_hash, tipo_acesso) VALUES (?, ?, ?, 'CUIDADOR')`, dentro da infraestrutura transacional existente. A restrição `uq_usuario_email` é a proteção definitiva contra duplicação. Não há consulta seguida de INSERT como garantia de unicidade. `ER_DUP_ENTRY` vira uma classificação sanitizada, sem SQL, e-mail, credenciais ou mensagem do driver; o serviço retorna erro genérico. Falha ao confirmar COMMIT continua descartando a conexão, sem rollback enganoso ou retry automático.

Testes com executor simulado comprovam o contrato e tratamento de erro; **não comprovam UNIQUE, rollback, charset ou concorrência no MySQL**. A integração futura deve executar o SQL homologado em ambiente descartável autorizado e verificar duas requisições concorrentes para o mesmo e-mail, uma identidade persistida, hash verificável, zero vínculos/papéis e reconciliação de COMMIT incerto. G-DB segue aberto; não encerrar a Issue.

## Contratos e segurança

- Zod estrito no cliente e no servidor: campos desconhecidos (papel, rede, tipo_acesso, admin) são rejeitados; somente quatro entradas são aceitas.
- Nome: trim, obrigatório, limite de 160 caracteres do schema. E-mail: trim/lowercase, formato válido, até 254 caracteres. Sem heurísticas de Gmail ou remoção de pontos. A collation MySQL `utf8mb4_0900_ai_ci` pode considerar equivalentes valores além dessa normalização; verificar no gate real, sem mudar o DDL por hipótese.
- Senha e confirmação são preservadas sem trim; obrigatórias e iguais. **Não há política aprovada de composição ou mínimo de oito caracteres**. Limite de 1024 bytes UTF-8 é proteção técnica contra custo excessivo, não novo requisito funcional; corpo HTTP limitado a 8192 bytes antes de JSON.parse. Revisão humana pode ajustar estes limites técnicos.
- Argon2id (`argon2` 0.45.1), memória 19456 KiB, duas iterações, paralelismo 1, hash 32 bytes, salt aleatório da biblioteca. Referência: [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html) e [node-argon2](https://github.com/ranisalt/node-argon2). Testes usam o algoritmo real e verificam hashes/salts.
- Cadastro preparado cria somente `usuario` com `CUIDADOR`; nenhum `membro_rede`, Familiar Principal, Plantonista Atual, rede, permissão clínica ou sessão é criado. `PESSOA_IDOSA`/convite pertence à US-036 e é rejeitado neste DTO.
- `/api/auth/cadastro`: aceita apenas JSON, exige Origin igual à origem canônica do servidor, respostas sem cache, erros sanitizados, sem logs de payload/senha. Não confia em X-Forwarded-Host. `APPLICATION_ORIGIN` define a origem pública quando a URL interna do Next.js difere; configuração inválida nega a solicitação. Ausência usa a origem da URL recebida pelo servidor.
- Rate limit, sessão, convite, recuperação e auditoria contextual não estão concluídos. G-AUTH continua aberto. Não liberar endpoint de cadastro enquanto faltarem decisão de autorização, controles aplicáveis e prova de integração. O resolver fechado atualmente impede processamento Argon2/SQL por requisições públicas.

## Reprodução no Fedora

Ambiente utilizado: Fedora 44 x86_64, Node 24.18.0, npm 11.16.0, Python 3.14.7. O Argon2 funcionou com o binário disponibilizado pelo pacote, sem instalar MySQL ou alterar bibliotecas do sistema.

```bash
npm ci
APPLICATION_ORIGIN=http://localhost:3000 npm run dev
# Abra http://localhost:3000/cadastro; cadastro será negado pelo resolver.
npm run format:check
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm audit --omit=dev --audit-level=high
.venv/bin/python scripts/validate_agent_context.py
.venv/bin/python scripts/validate_sql_prototype.py
.venv/bin/python scripts/validate_visual_snapshot.py
.venv/bin/python scripts/validate_implementation_backlog.py
```

Veja [runbook](RUNBOOK_LOCAL_V1.md) para preparar Python/PyYAML e Chromium. Playwright inicia o build em `http://127.0.0.1:3100`, configura essa origem no servidor e verifica mobile 390 × 844 e desktop. Somente o teste de loading intercepta resposta atrasada; os testes de autorização usam o handler HTTP real. Usam identidades sintéticas `example.invalid`. A vulnerabilidade de desenvolvimento preexistente permanece acompanhada em [#119](https://github.com/webkauadev/rede-de-apoio/issues/119); o audit de runtime é obrigatório.

## Rastreabilidade e próximos passos

Implementação parcial está registrada em `SCREEN_REGISTRY.yaml`, `COMPONENT_MAP.yaml` e `CURRENT_PROJECT_STATE.md`. O backlog histórico das 36 US e os aceites aprovados permanecem preservados; seu validador exige revisão manual antes de alterar estados de implementação. Este documento registra progresso em revisão sem afirmar conclusão ou transformar a projeção em tracker.

Para concluir US-001: homologar autorização na Issue, liberar ambiente descartável, provar persistência/concorrência e vínculos ausentes, revisar limites técnicos e UI, obter CI verde e revisão humana. Só então avaliar encerramento. US-002 reutilizará AuthShell e hash, mas login/sessões continuam em escopo próprio; US-036 terá convite separado. Nenhum merge ou deploy está autorizado.

## Evidências executadas no Fedora — 2026-10-09

| Comando | Resultado real |
|---|---|
| `npm ci` | PASS — instalação pelo lockfile; Argon2id executado depois da instalação limpa |
| `npm run format:check` | PASS |
| `npm run lint` | PASS — zero warnings |
| `npm run typecheck` | PASS |
| `npm test` | PASS — 52 testes em 4 arquivos |
| `npm run build` | PASS — `/cadastro` estática e `/api/auth/cadastro` dinâmica, sem MySQL |
| `npm run test:e2e` | PASS — 16 testes, mobile e desktop, 14 específicos deste incremento |
| `npm audit --omit=dev --audit-level=high` | PASS — zero vulnerabilidades de runtime |
| `validate_agent_context.py` | PASS — 17 telas, 36 US, 30 RF |
| `validate_sql_prototype.py` | PASS estático — 30 tabelas, 77 FKs, 120 constraints; não prova execução MySQL |
| `validate_visual_snapshot.py` | PASS — 26 PNGs canônicos preservados |
| `validate_implementation_backlog.py` | PASS — 36 US e comentários aprovados preservados |
| `git diff --check` | PASS |

Falhas corrigidas durante o desenvolvimento: teste Argon2 assumia ordem dos parâmetros PHC (a biblioteca ordena diferentemente; agora compara parâmetros sem depender da ordem); teste SQL inicialmente fora do setup dos mocks; seleção de alert confundia anunciação de rota do Next.js com formulário; origem externa distinta da URL interna do Next.js (correção testada por configuração explícita). Nenhuma falha local causada pela alteração permanece aberta.

Capturas de execução separadas do snapshot canônico:

- [T02 mobile default](EVIDENCIAS/US001/T02-mobile-default.png) e [desktop default](EVIDENCIAS/US001/T02-desktop-default.png).
- [Validation Error](EVIDENCIAS/US001/T02-mobile-validation.png).
- [Loading — resposta atrasada simulada](EVIDENCIAS/US001/T02-mobile-loading-simulated.png).
- [Negação pelo handler real](EVIDENCIAS/US001/T02-mobile-authorization-pending.png).

Revisão visual manual comparou estrutura, tokens, hierarquia, espaçamento e viewport com T02 congelada; não é certificação pixel-perfect. Capturas com campos preenchidos usam somente dados sintéticos. CI remoto será registrado no Draft PR; não confundir checks verdes com aceites funcionais integralmente comprovados.

## ATUALIZAÇÃO DE APROVAÇÃO — DEC-AUTH-001 (2026-10-09)

**Este adendo substitui apenas o status da lacuna decisória registrado acima**: o usuário aprovou cadastro de **CUIDADOR por convite individual** e bootstrap técnico restrito, com autorização para testes reais em **MySQL 8.4 local, isolado e descartável no Fedora, somente com dados sintéticos**. Registro canônico [Issue #37](https://github.com/webkauadev/rede-de-apoio/issues/37#issuecomment-6092864135). [Contrato completo](DEC_AUTH_001_CONVITES_CUIDADORES.md) e [SQL incremental 003](../../database/mysql/003_convite_cadastro_cuidador.sql). **O código atual ainda nega todo cadastro** e essa migração ainda não foi executada/validada; o Codex deve implementar o consumo atômico do convite, testar a persistência e atualizar este relatório. Não fechar US-001 nem publicar enquanto faltarem testes/revisão.
