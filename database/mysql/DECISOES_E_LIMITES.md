# Limites do SQL físico V1 homologado

**Registro vigente:** [DECISOES_V1_HOMOLOGADAS.md](../../docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md) (38 ADRs decididas por delegação explícita do solicitante, 2026-10-09), [STACK_V1_HOMOLOGADA.md](../../docs/10_IMPLEMENTACAO/STACK_V1_HOMOLOGADA.md). Esta página substitui o painel histórico de opções abertas da V0.1. A homologação é **do desenho V1 para Codex e importação Workbench**, não uma certificação de produção.

## Resoluções que o SQL protege diretamente

| Invariante V1 | Implementação MySQL |
|---|---|
| Uma rede por pessoa idosa | `uq_rede_idoso_v1(pessoa_idosa_id)` |
| Pessoa Idosa não recebe papel Familiar | `usuario.tipo_acesso` com FK composta no `membro_rede`, e FK de categoria no papel |
| No máximo um Principal não revogado por rede | coluna gerada `principal_ativo_rede` + índice único |
| Reingresso histórico sem 2 episódios abertos simultâneos | `membro_rede.usuario_vinculado_ativo` gerada e UNIQUE por rede |
| Plantões simultâneos | ausência deliberada de `UNIQUE` temporal global |
| Uma conclusão por tarefa na V1, sem reabrir | `ciclo_atual=1`, `ciclo_numero=1`, UNIQUE `(rede_id,tarefa_id,ciclo_numero)` |
| Uma administração por ocorrência programada na V1 | UNIQUE `(rede_id,ocorrencia_id)`; `NULL` permite registro avulso autorizado explicitamente |
| Fato previsto e fato registrado distintos | `ocorrencia_programada` e `administracao_medicamento` com FK |
| Correção imutável por versão | tabelas por domínio, `numero_versao`, autor e FK original; serviço/credenciais SQL impedem UPDATE/DELETE indevidos |
| Convite de titular único | `habilitacao_acesso_idoso` com token só em hash, convite aberto único, FK composta perfil–titular |
| Histórico de escala | `historico_plantao` separado de `auditoria` |
| Outbox sem inbox | `entrega_tecnica_notificacao` é infraestrutura, sem histórico consultável |

## Regras que exigem código e teste

- Criar rede + Principal e primeiro Profissional na mesma transação: UNIQUE **não** garante existência mínima.
- Autorização por ator/vínculo/rede/recurso em toda operação; Pessoa Idosa apenas read-only.
- Troca de Principal com locks, revogação+concessão atômicas.
- Desvínculo com responsabilizações futuras explicitamente resolvidas, histórico preservado.
- N02 só ao responsável designado efetivamente em plantão; sem elegível, registrar pendência e **não** inventar destinatário.
- N04 em H+15 se não há registro confirmado, sem interpretar como omissão clínica.
- DST/fuso: bloquear horário ambíguo/inexistente sem resolução expressa; sem PRN automático.
- Convite único expira, hash de token, titular se autentica com Argon2id, não familiar.
- Append-only e auditar acesso negado fora do rollback do domínio.
- LGPD, retenção e segurança antes de operar dados reais.

## Não executado

**SQL ainda não importado num servidor MySQL ou Workbench pelo assistente.** CI GitHub valida estaticamente, não substitui execução MySQL 8.4 nem concorrência de duas sessões. Para EER usar [guia Workbench](README.md) e [validação após importar](002_validar_estrutura.sql). Segunda rede, reabertura de tarefa, permuta bilateral, múltiplas administrações clínicas, PRN e correção de anexo estão fora da V1.

Codex tem autonomia **dentro** da ratificação V1, sem autorização para ampliar comportamento ou executar banco de produção.
