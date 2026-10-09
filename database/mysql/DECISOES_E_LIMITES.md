# Contrato de hipóteses do DDL MySQL V0.1

**O solicitante autorizou construir SQL para prototipação e diagrama. Não houve aprovação explícita, alternativa por alternativa, das decisões DB-001/002/003/004/008/014/021/028/029/030/034/035/037.** A partir deste arquivo, o Codex deve distinguir **DDL experimental** de **regra funcional liberada**.

| ADR ou fonte | Estado da origem | Decisão de desenho **apenas para permitir o EER V0.1** | O que fica BLOQUEADO até revisão |
|---|---|---|---|
| DB-001 (redes por idoso) | PENDENTE A1/A2/B | não criar UNIQUE permanente no idoso; cada registro é contextual `rede_id` | permitir mais de uma rede operacional na API; compartilhar dados de R1 para R2 |
| DB-002 (bootstrap) | PENDENTE B1/B2/B3 | usar `rede_cuidado.situacao=EM_CONFIGURACAO` para representar construção | liberar `OPERACIONAL` com 0 Principal/Profissional; criar UX B1 como canônica |
| DB-003/027 (reingresso/vigência) | PENDENTE | membro por episódio; UNIQUE calculada apenas para vínculo não encerrado | reingresso automático, restaurar antigos papéis |
| DB-004/026 (Principal/categoria) | regra RN-001 CONFIRMADA, mecanismo PENDENTE | FK composta de categoria e UNIQUE gerada para Principal ativo | marcar rede operacional sem Principal ou transferir sem transação |
| DB-005 (plantões) | DEC-S01 explícita do solicitante, migration_required na main | aceitar sobreposição entre **diferentes** plantões | selecionar um único Plantonista Atual global |
| DB-006 (troca) | PENDENTE | tabela registra pedido de **um** plantão | permuta entre dois plantões sem nova modelagem |
| DB-007/032 (tarefas) | DEC-S03 parcial, reabertura pendente | tarefa+ciclo com uma única conclusão e `versao` | reabertura/salto de ciclo automático |
| DB-008/034/035 (correções) | versão original imutável CONFIRMADA, desenho PENDENTE | revisões tipadas para Diário, Consulta, Administração, snapshot completo dos campos editáveis | afirmar RNF02 inteiramente coberto para todos os recursos do app |
| DB-009 (consulta) | PENDENTE | compromisso opcional em consulta e consulta opcional em recomendação | obrigatoriedade de compromisso/consulta sem decisão |
| DB-010/015/029/033 (recorrência) | PENDENTE | hora local + zona IANA e ocorrência datada, com origem por FK real | executar regra automática de recorrência, DST e PRN sem definição |
| DB-011/021 (administração) | DEC-S02 plano/fato/alerta confirmado, regra clínica adicional PENDENTE | não impor UNIQUE clínica por ocorrência; retry por chave opcional | permitir segunda dose clínica por simples repetição de requisição |
| DB-012/019 (emergência) | PENDENTE | uma ficha atual por rede (UNIQUE rede+pessoa) | garantir política definitiva de versões/edição |
| DB-013/037 (anexo) | PENDENTE | um recurso original por FK: Diário/Consulta/Administração | anexar revisão corrigida sem regra de herança |
| DB-014/023 (notificação) | P04 canônico; transporte PENDENTE | `entrega_tecnica_notificacao` opcional, sem inbox | afirmar entrega online/offline/exactly-once |
| DB-016/017 (auth/titular) | acesso idoso RF30 aprovado; provedor/convite PENDENTE | usuários com tipos `CUIDADOR`/`PESSOA_IDOSA`; senha hash ou provedor | implementar fluxo definitivo de convite, recuperação ou auth |
| DB-018/038 (retenção/auditoria) | RNF03 auditável confirmado, mecanismo PENDENTE | auditoria sem dados de saúde; status e snapshots mínimos | alegar compliance LGPD, retenção ou auditoria de rollback provadas |
| DB-028 (saída de membro) | PENDENTE | histórico não deletável por FK | reatribuir ou cancelar tarefas/plantões por suposição |
| **DB-030 (N02 simultâneo)** | **PENDENTE** | ocorrência tem responsável **nullable**, sem regras de seleção no DDL | enviar N02 a todos, ao Principal ou ao primeiro sem homologação |

## Critérios de handoff ao Codex

1. Ler `AGENTS.md`, `docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md` e fontes RF/US aprovadas.
2. Para gerar **EER**, usar `001_rede_de_apoio_schema.sql` como **hipótese de diagrama**, podendo apontar inconsistências.
3. Para implementar caso de uso, resolver a Issue originadora; só utilizar uma alternativa de ADR marcada aprovada expressamente na fonte. Sem decisão, apresentar proposta e marcar `BLOCKED_BY_DECISION`; **não inferir aprovação pelo fato de a coluna existir em SQL**.
4. Nunca alterar a estrutura aprovada pela fonte em `main` ou criar role extra; `Plantonista Atual` é condição temporal.
5. Ao aprovar uma ADR, registrar autor, data, opção, RF/US afetados, evidências/aceite e então atualizar DDL e documentação juntos.
6. Não rodar este arquivo em produção; não criar seeds com dados pessoais/saúde.

**Nota de segurança**: uma FK entre `usuario` e `membro_rede` não autoriza leitura de todos os dados de uma rede. O backend deve verificar cada operação, tempo e escopo; o banco é a defesa estrutural complementar.

V0.1 é uma **prototipação de desenho**, não certificação de integridade clínica ou conformidade regulatória.
