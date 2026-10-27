# DB-G — Recorte seletivo de persistência

[Figma: diagrama editável DB-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6435-3326) · Frame `6435:3326`, 5500×3780 px · 17 tabelas reais em quatro agrupamentos, PKs e FKs destacadas; 11 segmentos exemplificativos rotulados.

## Fonte única
[DDL consolidada MySQL 8.4](../../../entrega/sql-eer/01_schema_completo_v1.sql); [relatório físico](../../../entrega/sql-eer/RELATORIO_FINAL.md); [modelo Workbench nativo](../../../entrega/sql-eer/rede_de_apoio_v1.mwb).

## Tabelas selecionadas
- Identidade e Rede: `usuario`, `pessoa_idosa`, `rede_cuidado`, `membro_rede`, `atribuicao_papel_familiar`.
- Plantões e Tarefas: `plantao`, `solicitacao_troca_plantao`, `tarefa`, `conclusao_tarefa`.
- Medicação e Programação: `medicamento`, `regime_medicamento`, `horario_regime`, `ocorrencia_programada`, `administracao_medicamento`.
- Registro e Auditoria: `registro_cuidado`, `correcao_registro_cuidado`, `auditoria`.

A prancha apresenta **11 amostras rotuladas** de ligações internas de FKs (`↑` orienta do filho ao pai), **sem pretensão de cardinalidade Crow's Foot**; referências cruzadas entre grupos são mostradas nos campos, não como grafo completo. Não presume exibir todas as ligações. O EER completo tem 34 tabelas, 79 FKs e seis vistas no `.mwb`.

## Pontos de atenção
- `rede_cuidado.pessoa_idosa_id` é UNIQUE; uma Pessoa Idosa tem no máximo uma Rede V1.
- FKs de contexto frequentemente são **compostas**, por exemplo `(rede_id, membro_responsavel_id)` em `plantao`, `(rede_id, pessoa_idosa_id)` em `medicamento`/`registro_cuidado`, e `(rede_id, horario_regime_id, ocorrencia_id)` em `administracao_medicamento`. Não representar como FK simples na especificação física canônica.
- `ocorrencia_programada` tem origem exclusiva por `tarefa_id` ou `horario_regime_id`; esta regra XOR depende do CHECK.
- `auditoria` pode registrar negações, não deve ser interpretada como detalhe dispensável ou composição clínica.
- Projeção e legendas têm caráter explicativo: validar cada PK/FK real contra o SQL, e **não usar o DB-G para engenharia reversa**.

**Revisão aplicada em 2026-10-27:** conferência por nome de todos os 17 `CREATE TABLE` e FKs de cada tabela contra `01_schema_completo_v1.sql`; os campos desenhados de `pessoa_idosa`, `membro_rede`, `atribuicao_papel_familiar`, `plantao`, `solicitacao_troca_plantao`, `tarefa`, `conclusao_tarefa`, `horario_regime`, `ocorrencia_programada`, `administracao_medicamento` e `correcao_registro_cuidado` foram ajustados/precisados, inclusive as colunas das FKs compostas. O caso de troca tem **três FKs compostas com papéis distintos**: solicitante, destinatário e respondente. Os onze vínculos internos mostrados receberam seus nomes físicos canônicos.

**Pendente:** legibilidade em projetor, ligações **interdomínios** representadas apenas em texto e comparação independente do diagrama ao SQL V1 completo. Nenhuma migração, esquema ou configuração de banco foi alterada.
