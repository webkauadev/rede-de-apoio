# Mapeamento do EER vigente

Artefato canônico: `entrega/sql-eer/rede_de_apoio_v1.mwb`, modelo MySQL Workbench V1, commit `e7098aa` de 2026-10-13. Evidência: `entrega/sql-eer/RELATORIO_FINAL.md` registra 34 tabelas, 79 FKs e seis vistas. Fontes complementares: `01_schema_completo_v1.sql`, `02_manifest_estrutura.json` e exportações PNG/SVG existentes. Nenhum arquivo EER/SQL foi alterado.

| Domínio | Tabelas de negócio relacionadas | Tabelas técnicas | Correspondência UML / diferença |
|---|---|---|---|
| A | `usuario`, `pessoa_idosa`, `rede_cuidado`, `membro_rede`, `atribuicao_papel_familiar`, `contato_importante`, `informacao_emergencia`, `habilitacao_acesso_idoso`, `convite_cadastro_cuidador` | `cadastro_rate_limit`, `sessao_usuario`, `login_rate_limit` | CL-01 modela conceitos de domínio; sessão, convites, hash, rate limit e chaves não entram. |
| B | `plantao`, `solicitacao_troca_plantao`, `tarefa`, `conclusao_tarefa`, `compromisso`, `historico_plantao` | `idempotencia_comando` | CL-02 não mostra histórico técnico nem idempotência; Plantonista Atual é derivado, não tabela. |
| C | `registro_cuidado`, correções tipadas, `medicamento`, `regime_medicamento`, `horario_regime`, `ocorrencia_programada`, `administracao_medicamento`, `consulta`, `recomendacao`, `anexo` | — | CL-03 omite PK/FK, autor técnico e campos de storage; usa relações de domínio relevantes. |
| D | `auditoria`, `preferencia_notificacao`, `entrega_tecnica_notificacao` | `idempotencia_comando` | Auditoria é classe seletiva; entrega técnica/outbox não é Central de Notificações nem classe de domínio. |

## Integridade relevante à modelagem

| Evidência física | Leitura permitida | Limite |
|---|---|---|
| `uq_rede_idoso_v1` e FK `rede_cuidado.pessoa_idosa_id` | V1: no máximo uma rede histórica por Pessoa Idosa; perfil pode preceder rede. | Não prova sozinho constituição transacional completa. |
| `membro_rede` com vínculo/desvínculo | Episódio histórico e acesso futuro revogável. | Regras de autorização ficam na aplicação. |
| UNIQUE Principal ativo / FKs de categoria | No máximo um Principal e papel só para Familiar. | “Pelo menos um Principal/Profissional” depende de transação. |
| `plantao.membro_responsavel_id` | Cada plantão possui responsável; sobreposição de plantões é permitida. | Não transforma responsável em papel. |
| `conclusao_tarefa` UNIQUE por tarefa/ciclo | No máximo uma conclusão na V1. | Não infere fluxo de reabertura. |
| ocorrência XOR tarefa/horário e administração UNIQUE por ocorrência | Planejado e realizado são fatos distintos. | Administração avulsa continua possível sob autorização. |
| `ck_anexo_pai` | Anexo aponta para exatamente um original entre registro, consulta ou administração. | Não justifica composição UML. |
| correções tipadas/FKs ao original | Correção preserva vínculo com original. | Persistência não substitui RN-005/RN-006. |

Vistas existentes para apresentação: `diagrama_geral`, `diagrama_identidade_rede`, `diagrama_agenda_tarefas`, `diagrama_medicacao`, `diagrama_diario_consultas` e `diagrama_suporte_tecnico` em PNG/SVG. Não redesenhar nem reexportar.
