# TESTES_EFICIENTES_V1 — validação em camadas

**Status:** proposta operacional para revisão, branch `chore/testes-em-camadas-us002` baseada no Draft PR #121. **Não altera critérios de aceite, decisões SQL ou autorização para executar MySQL**. Este documento complementa `AGENTS.md`, `CODEX_PLAYBOOK.md` e os gates: em conflito, prevalecem a Issue aprovada e a segurança do domínio.

## Regra básica

**Durante a edição, rode somente o que foi afetado. Antes da revisão/merge, rode a validação integral do incremento; antes de aceitar regras de persistência, comprove-as no MySQL 8.4 descartável expressamente autorizado para aquela US.** Não aumentar cobertura contando variações de viewport como cenários funcionais distintos. Separar sempre unitários/mocks de integração física e de E2E com banco. Nunca chamar simulação de persistência real.

## Matriz de execução

| Momento | Comando ou evidência | Obrigatoriedade |
| --- | --- | --- |
| Após cada alteração focal | `npm test -- tests/unit/login.test.ts` (substituir pelo arquivo alterado) | Rápido; escolher os testes relacionados, sem rodar toda a suíte a cada edição |
| Ao estabilizar bloco de código | `npm run verify:fast` | Verifica formatter, lint, typecheck e todos os unitários; não inicia build/Chromium/MySQL |
| Antes de uma revisão visual breve | `npm run build && npm run test:e2e:smoke` | Smoke somente em mobile e build válido; não substitui E2E completo |
| Antes de abrir/atualizar PR pronto para revisão | CI existente: `npm ci`, audit runtime, formatter, lint, typecheck, **unitários completos**, build, **E2E completo configurado**, quatro validadores existentes | Obrigatório; falha bloqueia merge. Não remover gates já aprovados |
| Antes de aprovar **persistência real ou concorrência** | Integração MySQL 8.4 real + casos de navegador→API→banco afetados | Obrigatório com autorização específica, esquema novo, dados sintéticos, evidências e cleanup; se não autorizado, PR permanece draft e a prova segue pendente |
| Mudança transversal ou pré-publicação | Regressões ampliadas de segurança/autorização/contexto, restauração, e demais gates aplicáveis | Proporcional ao risco e às dependências efetivamente alteradas; sem liberação pública automática |

### Estratégia Playwright aprovada para este incremento

- **Mobile `mobile-chromium`** executa *todos* os E2E normais, inclusive falha fechada, validação, CSRF, navegação e mensagens. É a referência mobile-first da V1.
- **Desktop `desktop-chromium`** executa **somente testes identificados com `@responsive`**. Os testes de T01 e T02 com esta marca cobrem: baseline/targets, validação/foco e loading/geometria. Nova tela **deve** ter pelo menos baseline responsivo e fluxos de layout pertinentes identificados. Não significa dispensar testes desktop ao alterar um comportamento exclusivo do desktop.
- **`@smoke`** identifica quatro cenários rápidos (baseline T01, bloqueio real sem DB T01, baseline T02, bloqueio real sem DB T02) e é executado somente em mobile via `npm run test:e2e:smoke`. Não declara login ou cadastro persistido aprovado.
- **Revisão ampliada:** `npm run test:e2e:all-platforms` repete TODOS os cenários também em desktop (variável `PLAYWRIGHT_FULL_DESKTOP=1`), para regressões transversais, alterações exclusivas de desktop e revisão final quando necessário. Esse comando não é o CI padrão, que continua seletivo.
- **Todos os testes funcionais existentes continuam na suíte**; só deixamos de duplicar a maioria em dois tamanhos de tela. Na baseline atual: 18 cenários Playwright × 2 projetos = 36 execuções; com marcação T01/T02: **18 mobile + 6 desktop = 24 execuções**. Esses números são contagem planejada da configuração, não resultado executado do CI.
- Testes em `tests/e2e/mysql/` continuam excluídos do Playwright padrão e só rodam com harness MySQL explicitamente autorizado. Essa exclusão **não** é uma dispensa de G-DB.

### Controles que nunca são omitidos para encerrar a US afetada

- Negação sem autenticação/autorização; sem concessão implícita de rede, papéis ou dados de cuidado.
- Criptografia/senha/token/cookie e proteção contra reutilização; auditoria sanitizada de ações e negações; Origin/CSRF.
- Chaves/FKs/UNIQUE/CHECK, transações, rollback, falha de COMMIT, idempotência, concorrência, isolamento/revalidação do ator.
- Casos essenciais de sucesso e erro por contrato aprovado; qualquer falha de CI ou falha de integração exigida bloqueia homologação.
- A US-002 **não** pode ser aprovada por 148 unitários e 36 E2E simulados: requer execução física de `005` e provas positivas/negativas do banco. A autorização específica de teste consta da Issue #38 e **não libera outros ambientes ou US**.

## Desempenho do CI e métricas honestas

Comparação de quatro runs reais do workflow `Validate application V1` (GitHub Actions; segundos aproximados):

| Run | Total do job | setup-node | Unitários | E2E | Instalação Chromium |
| --- | ---: | ---: | ---: | ---: | ---: |
| 38401027140 (US-002) | 198s | 130s | 2s | 11s | 25s |
| 38397743564 (main) | 80s | 5s | 1s | 7s | 27s |
| 38020898359 (US-001) | 73s | 5s | 2s | 8s | 18s |
| 38011465809 (scaffold) | 85s | 5s | 1s | 10s | 27s |

O setup-node de 130s ocorreu **uma vez** nesses quatro runs; não há evidência suficiente de gargalo recorrente na instalação do Node. **Não trocar Node/cache/segurança por uma anomalia única**. A redução de E2E deve ser medida após este PR, comparando o job e registrando variação dos tempos, sem prometer percentuais de economia total. Instalação de navegador e provisionamento de runner também custam tempo fixo.

## Condições de adoção/rollback

- Este ajuste precisa ter `npm run test:e2e:smoke`, `npm run test:e2e` (todos os projetos selecionados), `npm run verify:fast`, build e demais checks verdes antes de ser incorporado.
- Conferir no output do Playwright que os 24 casos planejados realmente foram descobertos, incluindo **6 desktop**; nunca aceitar seleção vazia mascarada como sucesso.
- Se E2E ou CI falhar, corrigir/reverter a seleção, não remover testes de segurança para deixar verde.
- Próximas telas devem manter `@responsive` onde houver comportamento ou layout responsivo relevante; mudanças transversais devem executar o E2E completo. Nenhuma alteração de runner/Node foi feita.
- Para alterações transversais de layout ou navegação, executar também `npm run test:e2e:all-platforms` antes da revisão correspondente; o comando restaura a matriz móvel+desktop completa.
- Para a branch US-002, incorporar este ajuste somente após revisão do PR de otimização; **não fazer merge automático** de nenhuma branch.

**Objetivo:** menos ciclos redundantes de verificação, feedback de desenvolvimento rápido e evidências críticas preservadas.
