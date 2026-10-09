# 30 — Casos de mesa: versões, anexos, auditoria e CSV

**Novos 36 cenários V-T01–V-T36 (não confundir com T, K-T ou L-T).** São testes planejados, não executados no MySQL. Fontes RNF02, RF13/23/28/29/30, P03/P05 e RNF01/03. Os detalhes marcados ADR dependem de revisão.

### V-T01–V-T12 — Correção e histórico

| ID | Condição | Resultado esperado |
|---|---|---|
| V-T01 | Registrar diário original | Preservar autor, instante e conteúdo original |
| V-T02 | Autor autorizado atual insere correção | Novo registro de versão ligado, original intacto |
| V-T03 | Autor original perdeu vínculo e tenta corrigir | Negar; não basta ter sido autor |
| V-T04 | Outro usuário autorizado ao mesmo tipo corrige | Permitir mesmo que não seja autor original |
| V-T05 | Pessoa Idosa somente leitura tenta corrigir | Negar e auditar |
| V-T06 | Correção para recurso de outro idoso/rede | Negar mesmo com ID de registro válido |
| V-T07 | Versão V1 criada sobre V0 | Consulta atual V1; histórico preserva V0 |
| V-T08 | Nova versão V2 criada sobre V1 | Consulta atual V2; histórico mantém V0/V1/V2 |
| V-T09 | Duas solicitações querem criar V2 simultaneamente | Só uma versão 2; outra rejeitada/revalidada, sem lost update |
| V-T10 | UPDATE destrutivo de conteúdo original | Bloquear conforme política append-only |
| V-T11 | DELETE corretivo de original ou versão | Bloquear no fluxo de cuidado |
| V-T12 | Uma correção tenta mudar idoso/tipo do original | Rejeitar salvo processo excepcional aprovado (DB-036) |

### V-T13–V-T24 — Tipo, anexos e storage

| ID | Condição | Resultado esperado |
|---|---|---|
| V-T13 | Usar uma string tipo+id sem FK real para linkar anexo | Modelo considerado insuficiente, exigir desenho íntegro |
| V-T14 | Anexo ao diário da E1 tem FK do registro E1 | Associação válida se autor autorizado |
| V-T15 | Anexo ao registro E2 feito por usuário só da E1 | Negar; sem metadado publicado |
| V-T16 | Registro T10 possui anexo autorizado | Herda ACL do recurso pai, não permissões globais |
| V-T17 | Anexo aponta registro inexistente | Rejeitar por FK/contrato de criação |
| V-T18 | URL de objeto privado divulgada a sessão não autorizada | Não deve dar acesso a bytes protegidos |
| V-T19 | Arquivo .jpg com conteúdo real inválido | Rejeitar por validação profunda, não confiar em nome |
| V-T20 | Upload de tamanho acima do limite aprovado | Rejeitar antes de publicação (limite DB-037) |
| V-T21 | Objeto gravado mas metadado falha | Sem URL pública, objeto órfão técnico reconciliado |
| V-T22 | Metadado criado mas verificação do arquivo falha | Não disponibilizar conteúdo |
| V-T23 | Anexo de V0 e registro corrigido V1 | Preservação e vínculo por versão dependem DB-037 |
| V-T24 | Usuário revogado tenta baixar anexo antigo | Negar novo download por autorização vigente |

### V-T25–V-T36 — Auditoria e exportação

| ID | Condição | Resultado esperado |
|---|---|---|
| V-T25 | Negação de escrita em saúde | Operação bloqueada, evento sanitizado de negação |
| V-T26 | Log contém senha, token ou corpo de saúde | Falha de privacidade; remover da política de logging |
| V-T27 | Correção aceita | Auditoria correlaciona ação, autor, contexto e resultado |
| V-T28 | Usuário desvinculado no dia seguinte | Autoria anterior permanece, snapshot histórico não reescrito |
| V-T29 | Principal atual exporta CSV da E1 em T07 | Permitir histórico autorizado e auditar |
| V-T30 | Principal R1 tenta CSV da E2/R2 | Negar e auditar |
| V-T31 | Apoio/Profissional/Pessoa Idosa tenta exportar CSV | Negar independentemente de autoria ou plantão |
| V-T32 | Transferência de Principal confirmada antes da exportação | Ex-Principal negado na nova tentativa |
| V-T33 | Exportação iniciada, papel revogado antes do download tardio | Revalidar e bloquear se não autorizado; estratégia DB-038 |
| V-T34 | Campo CSV começa por comando de planilha potencialmente perigoso | Aplicar política de neutralização/escape definida |
| V-T35 | Auditoria em T17 consultada por conta idosa | Negar mesmo que a tentativa idosa tenha sido auditada |
| V-T36 | Falha de operação com rollback e acesso negado | Trilha de negação preservada conforme RNF03; garantia arquitetural DB-038 |

## Testes reais a executar posteriormente

- Confirmar constraints e privilégios de SQL impedindo UPDATE/DELETE corretivos de registros e versões.
- Corridas de duas conexões para inserir a mesma versão; error/rollback real.
- Testar FK de subtipo, FK composta e validação de presença/ausência de subtipo se adotar envelope.
- Validar links de anexo e descargas apenas sob autorização contextual, incluindo após desvinculação.
- Forçar falha entre storage e metadados para observar reconciliação.
- Auditar exportações negadas e bem-sucedidas, sanitização de logs, proteção de CSV e política de retenção.
- Registrar versão MySQL/servidor, fixtures sintéticas, saídas e PR de homologação. Sem essas evidências, V-T01–V-T36 permanecem **planejamento**.
