# Revisão de risco de dependências do scaffold V1 — PR #118

**Data:** 2026-10-09. **Natureza:** parecer técnico para revisão humana, **não aceitação de risco em produção**. **Escopo:** commit `46031f5` da branch `feat/infra-scaffold-v1`, `package-lock.json` versionado, advisory [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm).

## Problema e evidência

O `npm audit` completo relatou cinco entradas **high** no grafo de ferramentas de desenvolvimento. O nó de origem conhecido é `braces@3.0.3`, associado à [CVE-2026-93687](https://nvd.nist.gov/vuln/detail/CVE-2026-93687): padrões de chaves artificialmente profundos podem levar a exaustão de pilha/negação de serviço.

Cadeia **comprovada no lockfile deste PR**:

```text
eslint-config-next@16.4.0 (dev)
  └─ @next/eslint-plugin-next@16.4.0 (dev)
       └─ fast-glob@3.3.1 (dev)
            └─ micromatch@4.0.8 (dev)
                 └─ braces@3.0.3 (dev)
```

Os cinco avisos da cadeia **não equivalem a cinco CVEs independentes**. `braces`, `micromatch`, `fast-glob`, `@next/eslint-plugin-next` e `eslint-config-next` aparecem marcados com `dev: true` no lockfile. A inspeção do lockfile não comprova, sozinha, impossibilidade absoluta de execução de código de desenvolvimento em circunstâncias imprevistas.

**Situação upstream em 2026-10-09:** a ficha do GitHub Advisory indica `braces <=3.0.3` como afetado, **sem versão corrigida disponível**. A sugestão automática de `npm audit fix --force` levaria a alterações potencialmente incompatíveis com a stack homologada (incluindo downgrade do ecossistema Next/ESLint). Portanto **não foi executada**. Não introduzir forks/packages de origem não auditada, remendos manuais de `node_modules`, `overrides` artificiais nem dispensar a verificação de dependências apenas para ocultar alertas.

## Ameaça e alcance operacional

| Aspecto | Avaliação |
|---|---|
| Categoria | Disponibilidade / recursão excessiva em padrões de `braces` |
| Severidade do advisory | **High**, preservada como high no inventário |
| Superfície atual | Ferramentas de **desenvolvimento/CI** que executam lint/globbing |
| Exposição pública na aplicação | **Não identificada no lockfile de runtime**; a aplicação ainda é scaffold, sem dados reais |
| Pré-condição relevante | Atingir um caminho de execução que entregue padrão profundamente aninhado à API vulnerável |
| Controle atual | Padrões de lint/configuração fixados no repositório, CI com `permissions: contents: read`, sem segredo ou MySQL, `pull_request` sem `pull_request_target` |
| Impacto residual | Falha/interrupção de ferramenta de desenvolvimento ou job de CI; não provar explorabilidade nula |
| Decisão | **Recomendação condicionada para revisão humana do scaffold, sem aceitação de segurança de produção** |

Padrões/arquivos vindos de terceiros ou PRs devem continuar tratados como dados não confiáveis. Não acrescentar feature que permita enviar globs/padrões externos arbitrários ao servidor ou scripts de lint. A presença de `braces` em pacote `dev` reduz a superfície conhecida, mas **não anula** o aviso.

## Controle adicional introduzido neste PR

O workflow `.github/workflows/application-validation.yml` agora executa, após `npm ci`:

```bash
npm audit --omit=dev --audit-level=high
```

A etapa **falha o CI** se a auditoria de dependências de runtime retornar vulnerabilidade high/critical (ou falhar tecnicamente na consulta). Isso não significa que o `npm audit` completo esteja limpo: **os alertas no conjunto de desenvolvimento permanecem conhecidos**. O resultado anterior de `npm audit --omit=dev` era zero; a nova execução precisa ser comprovada pelo GitHub Actions neste commit.

## Critérios para seguir

1. CI de app deve passar incluindo novo gate de runtime; testes unitários, build e Playwright continuam obrigatórios.
2. Status do PR pode passar de **draft** para **ready for review** após essa prova, pois o risco está identificado e documentado, **sem afirmar correção upstream**.
3. **Merge não é autorizado automaticamente.** Revisor humano deve decidir conscientemente sobre o risco residual dev e verificar também o diff e os controles. Só após isso considerar publicação da infraestrutura na `main`.
4. Reavaliar o advisory a cada atualização de dependências/lockfile e **antes de merge**; quando houver release compatível corrigida ou árvore que dispense `braces`, atualizar em PR com `npm ci`, `npm audit`, lint, testes e CI completos.
5. Abrir/usar acompanhamento GitHub caso o aviso ainda não possa ser eliminado; não fechar como `fixed` sem pacote realmente atualizado.

**Não confundir:** mitigação do risco de runtime por auditoria contínua ≠ correção do `braces` vulnerável ≠ liberação de dados clínicos em produção. Os gates G-DB, G-AUTH, G-SEC e G-PRIV continuam abertos conforme `GATES_DE_IMPLANTACAO_V1.md`.
