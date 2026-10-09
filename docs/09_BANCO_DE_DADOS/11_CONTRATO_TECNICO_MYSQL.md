# 11 — Contrato técnico futuro de MySQL (sem DDL)

## Status

Somente orientações para futura modelagem física. **Não há CREATE TABLE, migrations, banco provisionado, procedures ou triggers nesta branch.** Decisões de tipos/índices a seguir são propostas revisáveis.

## SGBD e compatibilidade

- Alvo de estudo: MySQL 8.x com InnoDB (fixar versão patch, collations e ambiente no início da implementação).
- Chaves primárias para todas as tabelas, identificadores imutáveis, índices de FK, restrições de unicidade e CHECK quando viáveis.
- Charset recomendado: utf8mb4; collation escolhida com consciência de acentos e comparações em e-mail/login. Normalizar e-mail na aplicação e decidir a equivalência de caixa/Unicode.
- Timestamps de ocorrências no banco com estratégia de UTC e fuso IANA para recorrências **a definir**. DATETIME e TIMESTAMP têm semântica e faixa distintas; não improvisar nos cálculos de atraso ou plantão. Calendário é exibido no fuso do contexto.
- Dados sensíveis mínimos e nenhuma senha em claro. Campo de credencial hash somente se autenticação própria; autenticação terceirizada muda a estrutura.
- Não usar CPF/telefone como PK de pessoa idosa/usuário sem necessidade de negócio aprovada.

## Tipos candidatos e critérios

| Domínio | Tipo MySQL candidato | Cuidado |
|---|---|---|
| PK/FK | BIGINT UNSIGNED ou INT UNSIGNED de forma consistente | mesma exata definição entre colunas relacionadas |
| Nome/texto curto | VARCHAR com limite fundamentado por entrada/UX | não usar VARCHAR(255) para tudo indiscriminadamente |
| Descrição/observações | TEXT conforme limite esperado | sensível; consultas e auditoria com escopo |
| Status/papel | VARCHAR curto + CHECK/domínio aprovado | ENUM pode dificultar evolução, escolha deliberada |
| Data civil | DATE | não converter aniversário/agenda para datetime |
| Hora local de recorrência | TIME + zona e regra de recorrência | horário local não é instante absoluto |
| Instante auditável | DATETIME(6) UTC ou tipo compatível | decidir conversão timezone em transações |
| Booleans | BOOLEAN/TINYINT(1) + semântica | NULL ≠ false |
| Contagens/versões | INT UNSIGNED | limites positivos, UNIQUE para versão |
| Arquivo | BIGINT tamanho + checksum + chave | armazenar binário fora do banco é proposta |
| Dosagem (se aprovada) | DECIMAL e unidade normalizada | jamais FLOAT para quantidade clínica exata |

## Regras e mecanismos

**Garantível por DDL:** PK, UNIQUE simples, FK com mesmo contexto quando composta, NOT NULL, algumas CHECK locais (inicio < fim; versão >=1; domínio de status). Avaliar compatibilidade exata do MySQL selecionado.

**Não garantido por DDL simples:** Principal único ativo com histórico, ao menos um Profissional por rede, autorização contextual temporal, ausência de sobreposição arbitrária de intervalos, atualização versionada concorrente, não duplicar lembretes entre eventos distintos e política legal de retenção. Esses exigem contrato transacional de serviço e testes.

**Trigger/procedure:** usar somente quando a regra e proprietário da transação estiverem decididos. Separar triggers de auditoria (quando adequados) do controle de permissão que depende da identidade do usuário autenticado. Não confiar que a conexão SQL conhece corretamente os papéis do aplicativo sem um mecanismo definido.

**Views:** candidatas para calendário (projeção de múltiplas origens), histórico autorizado e último conteúdo corrigido. Atenção: view não substitui autorização por usuário; mecanismos de segurança de invocador/definidor devem ser revisados.

**Índices:** perfil/participação por rede+usuário+vigência, plantão por rede+início+fim, tarefa por rede+prazo+estado, cuidado por pessoa+ocorrência, auditoria por contexto+data, notificação por usuário+tipo se houver outbox. Especificação de índices somente após consultas e EXPLAIN.

**Exclusão referencial:** ON DELETE RESTRICT por padrão para dados e histórico, com exceções justificadas e retenção definida; não copiar CASCADE do exemplo acadêmico sem análise.

## Sequência física futura (não executar ainda)

1. Fixar ADRs e dicionário lógico; revisão humana.
2. Selecionar versão MySQL, charset/collation, política temporal e identidades.
3. Criar script DDL idempotente versionado em uma etapa posterior e migrar por ordem de dependências.
4. Preencher somente dados sintéticos; executar testes PK/FK/UNIQUE/CHECK, JOIN, concorrência, rollback e permissões.
5. Gerar modelo físico por engenharia reversa no MySQL Workbench; confrontar com modelo conceitual; corrigir divergências.
6. Testar backup/restauração, limitação de privilégios, performance e regressão antes de permitir uso.

## Evidência necessária de teste real

Executou em MySQL? Versão, script/commit, base descartável, comandos e saídas, dados sintéticos, pass/fail, diagnósticos. Até então, todos os testes deste diretório são **exercícios de mesa**, não SQL comprovado.

Referências: https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html ; https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html .


## Restrições MySQL específicas da revisão temporal

- **Overlap:** MySQL/InnoDB não possui constraint declarativa geral do tipo excluir intervalos sobrepostos; uma UNIQUE(rede_id,inicio) não impede [10,12) e [11,13). Se sobreposição for proibida, exigir transação e lock de linha agregadora estável/estratégia equivalente, com índices e teste de concorrência (DB-005).
- **Locks dependem dos índices e da consulta:** range scans podem bloquear mais linhas; sem índice um UPDATE/locking read pode ter bloqueios amplos. Testar EXPLAIN e concorrência real.
- **REPEATABLE READ:** uma leitura de snapshot não é trava para decisões críticas de autorização/execução; ler e gravar em operação transacional apropriada.
- **Eventos agendados:** Event Scheduler MySQL pode iniciar instâncias sobrepostas quando uma execução dura além do intervalo; não usá-lo como garantia automática de entrega única.
- **Fuso:** event_scheduler e conexões têm semântica de time_zone; UTC para instantes e zona nomeada para recorrência são recomendações a validar.
- **Datas:** DATE, TIME, DATETIME e TIMESTAMP não são sinônimos; fixar versão/precisão e testar DST.
- **Mínimo de prova antes do DDL:** cenário L-T01–L-T42, DB-005/010/011/015/021/029–033 e FKs compostas de escopo.

Fontes: https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-transaction-model.html ; https://dev.mysql.com/doc/refman/8.4/en/events-overview.html ; https://dev.mysql.com/doc/refman/8.4/en/time-zone-support.html .
