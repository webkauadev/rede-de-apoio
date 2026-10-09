# Protocolo de trabalho autônomo do Codex por PR

**Objetivo:** trabalhar só com fontes já acessíveis no GitHub. Não criar novo RF/US; não alterar requisitos, labels ou atribuições humanas por impulso de automação.

## Antes de modificar código

1. Confirmar branch alvo e último commit; ler `AGENTS.md` e `docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md`.
2. Abrir `IMPLEMENTATION_BACKLOG.json`, escolher uma **US existente** e ler sua Issue no GitHub e o comentário aprovado indicado por `ACCEPTANCE_CRITERIA.yaml`.
3. Ler RF/RNF de origem, matriz de permissões, RN, N01–N04, estados T## e [imagens congeladas](FIGMA_SNAPSHOT/README.md).
4. Checar `decision_dependencies`. ADR PENDENTE é hipótese, não contrato; uma lacuna que impede a ação vira `BLOCKED_BY_DECISION` no PR/Issue, com pergunta precisa.
5. Definir plano curto e testes observáveis. Não criar tabela apenas porque existe tela; não inventar role/destinatário/mudança clínica.

## Branch/commit/PR

- Branch pequena `feat/us-###-assunto`, `fix/us-###-assunto`, `docs/...`, `test/...`.
- Commits com mensagem descritiva e referência à US/Issue.
- PR aponta origem única `RF/RNF → US → T##/E## → testes`, traz prints/evidência de UI quando pertinente e registra `migration_required` se a fonte divergir.
- Rodar validators de contexto, SQL e snapshot quando arquivos relacionados forem modificados. CI **não substitui** testes funcionais em runtime.
- **Não mergear nem marcar como ready sem revisão/aprovação humana autorizadora**, conforme contrato de agentes. Abrir draft para trabalho parcial.

## Critérios mínimos de prova por natureza

| Natureza | Testes |
|---|---|
| Auth | credencial inválida, sessão vencida, autorização por titular/rede, sem revelar dados |
| Pessoa Idosa | T03–T15 leitura; tentar POST/PUT/DELETE e CSV deve negar e auditar |
| Rede/Papéis | 1 Principal, ≥1 Profissional, categoria Familiar, simultaneidade/escopo; concorrência precisa teste DB real autorizado |
| Plantão | overlaps P1/P2 permitidos; atualização concorrente do mesmo P rejeitada por versão |
| Tarefa | somente responsável autorizado; uma conclusão por tarefa/ciclo, replay sem efeito duplicado |
| Medicação | plano vs administração vs falta de registro; horários/fuso; não deduzir não administração de aviso N04 |
| Imutabilidade | escrita corretiva cria versão, preserva original e autores, nega leitor |
| Anexos/CSV | escopo por registro; CSV só Principal; storage protegido |
| Avisos | N01–N04 destinatários canônicos, sem inbox; N02 multilateral é gate DB-030 |
| UX | captura T## comparada aos PNG do GitHub, estados `PAGE BASE+DELTA`, 390px, target 48px |

## Saída padronizada do Codex em cada PR

```text
US/Issue:
RF/RNF origem:
Telas/estados:
Regras/ADRs usados (aprovado/proposto/pendente):
O que foi implementado:
O que NÃO foi implementado:
Testes reais executados e comandos/evidências:
Riscos restantes e BLOCKED_BY_DECISION:
Arquivos/contratos alterados:
Status: draft / pronto para revisão humana
```

**Handoff entre chats/agentes:** basta ler GitHub; não presumir memória da conversa. O status de cada tarefa e os logs reais precisam estar em commit/PR/Issue, não só em resposta de chat.
