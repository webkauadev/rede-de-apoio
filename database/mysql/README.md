# Protótipo físico MySQL — Rede de Apoio (V1)

**Status:** SQL V1 de desenho/experimentação homologado pelo solicitante; ainda não executado para MySQL **8.4** (mínimo recomendado: 8.0.16 para CHECK). **Não executado em servidor**, não aprovado para produção e sem dados reais. A criação deste protótipo foi pedida explicitamente pelo solicitante. O planejamento de origem está em [docs/09_BANCO_DE_DADOS](../../docs/09_BANCO_DE_DADOS/README.md) — PR #115.

## Arquivos

- [`001_rede_de_apoio_schema.sql`](001_rede_de_apoio_schema.sql) — script **único** `CREATE DATABASE + CREATE TABLE` com 30 tabelas em ordem de dependência, InnoDB, `utf8mb4`, PK/FK, índices, CHECK e comentários. Não usa `DROP`, nem cria dados/usuários/grants/triggers.
- [`002_validar_estrutura.sql`](002_validar_estrutura.sql) — consultas **somente leitura** de `INFORMATION_SCHEMA` **após** execução em instância local; mostra quantidade de tabelas, chaves e índices.
- [`DECISOES_E_LIMITES.md`](DECISOES_E_LIMITES.md) — escolhas de engenharia explícitas e quais decisões funcionais continuam abertas.
- [`../../docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md`](../../docs/10_IMPLEMENTACAO/CODEX_PLAYBOOK.md) — instruções de trabalho autossuficiente para Codex, preservando aprovações existentes.

## Caminho A — gerar EER **sem executar banco**

No **MySQL Workbench**:
1. Baixe `001_rede_de_apoio_schema.sql` do GitHub em sua máquina.
2. No menu **File > Import > Reverse Engineer MySQL Create Script**.
3. Selecione o arquivo `.sql` (UTF-8).
4. Selecione **Place imported objects on a diagram**, avance e conclua.
5. Salve o modelo como `.mwb` e organize o diagrama por módulos.

Esse modo lê o SQL e constrói o modelo EER; **não exige servidor MySQL ativo nem executa o script na instância**. A importação é um recurso documentado do Workbench.

## Caminho B — criar em MySQL local e depois gerar EER

1. Faça backup e conecte-se **somente a uma instância local descartável**, nunca produção.
2. Confira que o servidor é MySQL >= 8.0.16 (recomendado 8.4) e seu usuário tem permissão de criar banco/tabelas.
3. No Workbench: **File > Open SQL Script**, selecione `001_rede_de_apoio_schema.sql`.
4. Confira o banco `rede_de_apoio` no cabeçalho e execute o script.
5. Execute `002_validar_estrutura.sql` para **inspecionar** as tabelas, PKs, FKs e checks; confirme 30 tabelas.
6. No Workbench, use **Database > Reverse Engineer**, selecione `rede_de_apoio`, habilite diagrama e salve o modelo EER.

**IMPORTANTE:** `CREATE TABLE IF NOT EXISTS` evita recriação em uma execução posterior, **não** faz migração de estrutura. Não editar tabelas diretamente em produção, não rodar a mesma versão sobre banco populado com esquemas diferentes.

## O que o protótipo concretamente protege

- PKs, FKs e chaves compostas restringem cruzamentos acidentais de redes para membro, tarefa, plantão, consulta, medicação e anexo.
- Categoria `PROFISSIONAL_SAUDE` não pode receber concessão de `papel_familiar`; `usuario` do tipo `PESSOA_IDOSA` não entra como `membro_rede` pelo tipo de FK composto.
- UNIQUE calculado limita **no máximo um** Principal vigente por rede.
- Plantões distintos **podem se sobrepor** (DEC-S01).
- Conclusão de tarefa tem UNIQUE `(rede_id,tarefa_id,ciclo_numero)` e comando idempotente opcional (DEC-S03).
- Programação (`ocorrencia_programada`) e fato realizado (`administracao_medicamento`) têm identidades separadas (DEC-S02).
- Correções do Diário, Consulta e Administração possuem identidade/versão própria e FK para fato original; anexos possuem FK para **um** pai concreto.
- Notificações são só **outbox técnica**, nunca central/caixa de entrada acessível ao usuário.

## O que o SQL NÃO garante sozinho

O MySQL **não sabe quem foi autenticado na aplicação**, nem se o usuário tem permissão naquele instante: exige API, autorização por rede, categoria, papel, estado da conta e momento de execução.

A exigência de **pelo menos um Principal e um Profissional** para uma rede `OPERACIONAL` requer transação serializada. A UNIQUE de Principal cobre "no máximo um", não "pelo menos um". Reingresso, ativação da rede, reconciliação de plantões/tarefas futuras e entrega N02 para vários plantonistas exigem decisões de negócio antes de liberar essas rotinas.

**Não tratar V1 como schema definitivamente homologado**, porque DB-001/002/003/004/008/014/021/028/029/030/034/035/037 ainda contêm opções. Veja [DECISOES_E_LIMITES.md](DECISOES_E_LIMITES.md).

## Arquitetura de dados e design

Identificadores são `BIGINT UNSIGNED`; instantes auditáveis/previstos são `DATETIME(6)` interpretados como **UTC pela aplicação** (o MySQL não converte `DATETIME` automaticamente). `horario_regime` guarda também a hora civil e zona IANA; resolver DST continua pendente.

Dados de saúde **não** devem ir em logs, nomes de arquivos de storage públicos ou exemplos do GitHub. Testar só com valores sintéticos.

## Leitura oficial da ferramenta

- [MySQL Workbench — Reverse Engineer using a Create Script](https://dev.mysql.com/doc/workbench/en/wb-reverse-engineer-create-script.html)
- [MySQL 8.4 — Foreign Key Constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html)
- [MySQL 8.4 — CHECK Constraints](https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html)

**Status de validação:** análise estática automatizada no repositório (seção CI), sem teste real de execução/compatibilidade InnoDB. A prova física deverá ocorrer depois que você importar localmente.

## CONSOLIDAÇÃO V1 (posterior à V1) — HOMOLOGADA 2026-10-09

O arquivo `001_rede_de_apoio_schema.sql` foi consolidado para **30 tabelas MySQL 8.4**, em vez de 28. Inclui `habilitacao_acesso_idoso`, `historico_plantao` e as guardas da V1: UNIQUE de uma rede por idoso, um registro de administração por ocorrência (quando programada), tarefa sem reabertura e rede operacional nascida em transação com Principal + Profissional. O registro das escolhas é [DECISOES_V1_HOMOLOGADAS.md](../../docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md).

**A sequência de importação no Workbench permanece a mesma.** O validador `scripts/validate_sql_prototype.py` e o arquivo `002_validar_estrutura.sql` agora verificam **30 tabelas**. Nenhuma sessão MySQL foi executada; o uso em banco real de teste e o EER definitivo exigem sua importação posterior. As referências numéricas de V1 no início deste README são histórico.

**Contrato mínimo do Codex:** [STACK_V1_HOMOLOGADA.md](../../docs/10_IMPLEMENTACAO/STACK_V1_HOMOLOGADA.md), [GATES_DE_IMPLANTACAO_V1.md](../../docs/10_IMPLEMENTACAO/GATES_DE_IMPLANTACAO_V1.md) e [MAPA_RELACIONAMENTOS.md](MAPA_RELACIONAMENTOS.md). Prazo legal de retenção e critérios clínicos excepcionais não são fabricados pelo SQL.
