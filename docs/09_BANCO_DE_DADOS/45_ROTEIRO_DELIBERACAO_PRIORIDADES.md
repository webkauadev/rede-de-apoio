# 45 — Agenda de deliberação: fechar arquitetura sem inventar requisitos

**Estado:** checklist de decisões para equipe; **não é registro de decisão concluída**. Faz ponte entre os documentos do PR #115 e as Issues RF/RNF/US da `main`.

## 1. Ordem racional para uma reunião de arquitetura

| Ordem | Decisão e material | Pergunta objetiva | Saída exigida |
|---|---|---|---|
| 1 | **DB-001** — [41](41_DB001_CARDINALIDADE_E_ESCOPO_REDES.md) | Uma pessoa idosa pode ter várias redes simultâneas? Uma rede nova após encerramento? | A1, A2 ou B + compartilhamento de dados/cuidado |
| 2 | **DB-002** — [42](42_DB002_CONSTITUICAO_E_ATIVACAO_REDE.md) | Como T12 cadastra a pessoa e T13 vincula Principal/Profissional antes de liberar operação? | B1, B2 ou B3 + responsável pelo bootstrap |
| 3 | **DB-003/027** — [43](43_DB003_004_EPISODIOS_PRINCIPAL_AUDITORIA.md) | Usuário desligado pode reingressar? Um episódio por vínculo ou um membro com períodos? | sim/não, E1/E2 se sim, vigência |
| 4 | **DB-004/026** — [43](43_DB003_004_EPISODIOS_PRINCIPAL_AUDITORIA.md) + [19](19_ALTERNATIVAS_E_TRANSACOES_NUCLEO.md) | Como garantir Principal único e Família/Profissional íntegros no banco? | fonte única de verdade + mecanismo a testar MySQL |
| 5 | **DB-028** — [43](43_DB003_004_EPISODIOS_PRINCIPAL_AUDITORIA.md) | O que fazer com plantões e tarefas futuras de usuário desvinculado? | fluxo de reatribuição/cancelamento/suspensão |
| 6 | **DB-030** — [38](38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md) | Quem recebe N02 se vários plantonistas estão ativos? | alternativa A/B/C ou regra explícita e exceções |

## 2. Registro padronizado de cada decisão

Para cada DB:
- descrição da situação de negócio e trecho RF/US/RN de origem;
- alternativas estudadas, efeitos em T12/T13/T04/T05 e segurança;
- escolha explícita + autor + data + justificativa;
- `migration_required` se critérios canônicos ou regra funcional mudarem;
- entidades/cardinalidades/PK/FK/UNIQUE afetadas;
- ao menos um caso positivo, um negativo, um de conflito e um histórico conforme [44](44_CASOS_BOOTSTRAP_E_VINCULOS.md);
- condição que fará o assunto voltar a ser debatido (por exemplo exigência de segunda rede operacional);
- aprovação humana no PR antes de qualquer DDL ou merge.

## 3. Regra de coerência entre decisões

- A1/A2/B (DB-001) deve ser escolhida **antes** de decidir se `pessoa_idosa_id` será UNIQUE em `rede_cuidado`; a exclusividade apenas de rede ativa (A2) não é a mesma coisa que UNIQUE permanente.
- B1/B2/B3 (DB-002) não deve ser usado para dispensar RN-001 ou RN-004. Uma fase sem os mínimos, se existir, **não** é rede operacional e precisa de revisão funcional.
- E1/E2 (DB-003) e versão/vigência (DB-027) definem chaves históricas antes de qualquer FK de plantão/autoria.
- O método de Principal único (DB-004) precisa impedir tanto segundo Principal como remoção do último Principal operacional; `UNIQUE` só cobre o primeiro lado.
- A decisão de simultaneidade de plantões (DEC-S01) **já foi tomada pelo solicitante** e não deve ser desfeita ao deliberar DB-001/002. Vários plantonistas fazem DB-030 obrigatória.
- A mesma tarefa/ciclo não pode ser concluída duas vezes (DEC-S03); se DB-028 provocar reatribuição, o ciclo/versão precisa ser revisto, não duplicado silenciosamente.
- Uma pessoa idosa é titular read-only; isso não é permissão familiar nem acesso global a várias redes.

## 4. O que avançar tecnicamente depois

Com G1 funcional resolvido:
1. Ajustar [37](37_MODELO_LOGICO_CANDIDATO_RELACIONAMENTOS.md), [40](40_DIAGRAMAS_ALTERNATIVOS_REDE.md), dicionário e matriz de requisitos.
2. Aprovar formato de identidade e relação da rede, episódios de membro e mecanismo de concessão de Principal.
3. Preparar testes de integridade no banco descartável **somente mediante autorização**; cenários [44](44_CASOS_BOOTSTRAP_E_VINCULOS.md) e [39](39_GATES_E_PLANO_DE_PROVA_LOGICA.md).
4. Validar em duas conexões MySQL transações de principal/ativação e desvínculo; não usar apenas simulação em memória como prova.
5. Somente então decidir scripts de migração/produção, plano de rollback e segurança de dados.

**Nenhum aceite é inferido deste roteiro.** O PR não transforma recomendações em regras canônicas automaticamente.


## Anexo para a reunião: origem e critério aprovado (2026-10-09)

Use [48 — Gate G1](48_GATE_G1_DECISOES_PARA_REVISAO_HUMANA.md) como pauta de decisões e [47 — Auditoria](47_AUDITORIA_FONTES_APROVACOES.md) para comprovar que as US já têm critério individual aprovado em comentários no GitHub. Não julgar P01 pendente por texto legado na Issue. Confirmar na reunião **qual opção foi escolhida, por quem, quando e qual mudança deve ser migrada**; não escrever `aprovado` antes disso.

O plano de atualização após aceite encontra-se em [49](49_PLANO_REVISAO_REGISTROS_E_CI.md).
