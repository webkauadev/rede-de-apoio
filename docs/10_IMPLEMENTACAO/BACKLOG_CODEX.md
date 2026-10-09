# Fila Codex — 36 User Stories rastreáveis

Este backlog é uma **projeção operacional de US-001–US-036** do catálogo canônico, não cria novas histórias nem altera seus status de GitHub. As 36 US têm origens únicas e comentários com critérios de aceite aprovados. O arquivo [IMPLEMENTATION_BACKLOG.json](IMPLEMENTATION_BACKLOG.json) contém `us`, `issue`, `owner`, `origin_requirement`, `screens` e dependências de ADR para ajudar o agente a trabalhar por unidade.

**Importante:** `decision_dependencies` não significa necessariamente bloqueio de toda a US: é um aviso para verificar se a mudança atual toca alguma alternativa ainda aberta. Exemplo: pode-se montar a UI de T09 sem decidir a reabertura de tarefa, mas não liberar uma segunda conclusão real sem DB-007. O status `NOT_STARTED_IN_THIS_REPOSITORY` descreve **este repositório**, que não possui aplicativo até esta fotografia; não afirma o andamento de trabalhos privados externos.

## Prioridade de engenharia sugerida (não muda prioridade das Issues)

| Ordem | US típicas | Entrega de engenharia | Dependência de decisão |
|---|---|---|---|
| 0 | nenhuma US nova | stack, estrutura, validação CI, ambiente e convenções | `STACK_SELECTION`, `DB-016` |
| 1 | US-001/002/036 | autenticação/autorização e Pessoa Idosa read-only | `DB-016/017` |
| 2 | US-003/004/005/006/007 | pessoa idosa, rede, membros e papéis | `DB-001/002/003/004/026/028` |
| 3 | US-008–014, 024/025 | plantões, trocas, agenda e tarefas | `DB-005` já decidido para overlap; `DB-006/007/030` onde aplicável |
| 4 | US-015–023, 027/034 | diário, correções, medicamentos, consultas, anexos, compromissos | `DB-008/010/011/021/029/034/037` |
| 5 | US-026/028–033/035 | contatos, emergência, N03/N04, preferências, CSV e auditoria | `DB-012/014/019/031/038` |

**Não passar para o próximo domínio por mera ordem numérica** se o anterior ainda estiver incompleto ou sua dependência bloqueante não tiver decisão. O agente deve escolher uma US com especificação suficientemente determinada, entregar pequeno PR rastreado e aguardar revisão; nunca criar código inventado para acelerar.

## Ciclo Codex

`Issue → RF/RNF/US → aceite aprovado → screenshot GitHub → ADR → implementação → testes → validador → PR → revisão humana`.

Os 26 PNGs do [snapshot visual](FIGMA_SNAPSHOT/README.md) permitem consulta da UI apenas no GitHub. Consulte os registries para todos os demais estados.

**Não confundir**: a aprovação do protótipo SQL e do planejamento documental não é prova de execução MySQL nem liberação da política de destinatário N02 com dois plantonistas.

## Atualização após ratificação (2026-10-09)

As dependências de ADR descritas nos quadros históricos foram selecionadas para a V1 pelo solicitante e estão em [DECISOES_V1_HOMOLOGADAS.md](DECISOES_V1_HOMOLOGADAS.md). Esse backlog continua apontando **36 US canônicas**; as dependências `decision_dependencies` passam a ser **referências de decisão já registrada**, não bloqueios funcionais por falta de escolha V1. As provas de execução e implantação constam em [GATES_DE_IMPLANTACAO_V1.md](GATES_DE_IMPLANTACAO_V1.md).
