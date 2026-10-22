# DB-G — Recorte seletivo de persistência

[Figma: diagrama editável DB-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6435-3326) · Frame `6435:3326`, 5500×3780 px · 17 tabelas reais em quatro agrupamentos, PKs e FKs destacadas.

## Fonte única
[DDL consolidada MySQL 8.4](../../../entrega/sql-eer/01_schema_completo_v1.sql); [relatório físico](../../../entrega/sql-eer/RELATORIO_FINAL.md); [modelo Workbench nativo](../../../entrega/sql-eer/rede_de_apoio_v1.mwb).

## Tabelas selecionadas
- Identidade e Rede: `usuario`, `pessoa_idosa`, `rede_cuidado`, `membro_rede`, `atribuicao_papel_familiar`.
- Plantões e Tarefas: `plantao`, `solicitacao_troca_plantao`, `tarefa`, `conclusao_tarefa`.
- Medicação e Programação: `medicamento`, `regime_medicamento`, `horario_regime`, `ocorrencia_programada`, `administracao_medicamento`.
- Registro e Auditoria: `registro_cuidado`, `correcao_registro_cuidado`, `auditoria`.

A prancha apresenta **amostras selecionadas** de ligações internas; referências cruzadas são exibidas em campos como `rede_id` e `membro_id`. Não presume exibir todas as ligações. O EER completo tem 34 tabelas, 79 FKs e seis vistas no `.mwb`.

## Pontos de atenção
- `rede_cuidado.pessoa_idosa_id` é UNIQUE; uma Pessoa Idosa tem no máximo uma Rede V1.
- FKs de contexto frequentemente são **compostas**, por exemplo `(rede_id, membro_responsavel_id)` em `plantao`, `(rede_id, pessoa_idosa_id)` em `medicamento`/`registro_cuidado`, e `(rede_id, horario_regime_id, ocorrencia_id)` em `administracao_medicamento`. Não representar como FK simples na especificação física canônica.
- `ocorrencia_programada` tem origem exclusiva por `tarefa_id` ou `horario_regime_id`; esta regra XOR depende do CHECK.
- `auditoria` pode registrar negações, não deve ser interpretada como detalhe dispensável ou composição clínica.
- Projeção e legendas têm caráter explicativo: validar cada PK/FK real contra o SQL, e **não usar o DB-G para engenharia reversa**.

**Pendente:** avaliação de legibilidade em projetor e comparação independente do recorte à fonte V1. Nenhuma migração, esquema ou configuração de banco foi alterada.
