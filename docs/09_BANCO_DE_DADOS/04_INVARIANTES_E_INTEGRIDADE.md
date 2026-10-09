# 04 — Invariantes formais e níveis de garantia

**Canônico é o comportamento; o mecanismo abaixo é proposta de arquitetura.**

| Invariante | Regra | Como verificar/modelar |
|---|---|---|
| I01 Principal único | RN-001 | exatamente um Principal vigente em rede operacional; transação e serialização da transferência |
| I02 papéis acumuláveis | RN-002 | relação papel-familiar N:M; proibir coluna papel único |
| I03 Profissional separado | RN-004 | proibir atribuição de papéis familiares a categoria profissional |
| I04 ≥1 profissional | RN-004 | não liberar rede operacional sem Profissional; validar desvínculo |
| I05 Pessoa Idosa read-only | RN-009 | autorização no serviço/consulta, sem papéis nem CSV |
| I06 integridade de escopo | RNF01 | nenhum responsável/autor de outra rede vinculado por engano; FKs compostas quando possível |
| I07 Plantonista Atual | RN-003 | vínculo elegível e intervalo ativo, não atributo permanente |
| I08 troca | RF09 | aceitação aplica alteração uma vez; recusa não altera; rollback integral |
| I09 original preservado | RN-005 | sem UPDATE/DELETE corretivos; novo registro de versão |
| I10 sequência de versões | RN-006 | UNIQUE(registro,versao) + bloqueio contra concorrência |
| I11 permissão correção | P03 | mesmo tipo de permissão efetiva de criação no instante da correção |
| I12 atraso 15 minutos | RF26 | apenas evento programado, sem registro, previsto+15min |
| I13 sem registro ≠ não executado | RN estados | classificação textual semanticamente correta |
| I14 N01 | RF10 | afetado + Principal; aviso distinto por usuário/evento |
| I15 N02 | RF17 | somente Plantonista Atual no instante, sempre obrigatório |
| I16 N03/N04 | RF25/RF26 | Principal obrigatório, outros elegíveis opcionais |
| I17 sem duplicidade | P06 | papéis acumulados produzem no máximo um evento por destinatário |
| I18 CSV restrito | RF28 | somente Principal; dados do idoso selecionado; auditar |
| I19 acesso negado | RNF01/RNF03 | bloquear antes da leitura e auditar sem exposição |
| I20 anexo íntegro | RF23 | FK real para destino e herdar autorização |
| I21 autoria/hora | RF13 | preservar autor, ocorreu_em e registrado_em conforme caso |
| I22 profissional histórico | RF04 | desligamento futuro sem eliminar autoria pretérita |

## Não confiar apenas em CHECK, FK ou UNIQUE

- CHECK verifica expressões da linha: não consegue contar “exatamente um Principal em toda a rede” nem garantir “ao menos um profissional” atravessando tabelas.
- Uma rede recém-criada vazia exige um protocolo de bootstrap: inserir tudo em transação e expor/ativar apenas quando consistente (proposta pendente).
- UNIQUE(rede_id,papel) seria incorreta com históricos e não resolve a janela de transferência.
- FK composta (rede_id,membro_id) elimina muitas associações entre redes, mas não valida datas de vigência nem permissões de escrita.
- Conflitos concorrentes devem produzir rollback e retorno controlado. Não declarar teste aprovado sem MySQL executado.

## Políticas futuras de integridade

1. Colunas identificadoras numéricas ou UUID coerentes entre PK/FK; identificar oficialmente antes do DDL.
2. Domínios de status com valores permitidos decididos; CHECK em versões MySQL compatíveis.
3. Validação temporal inicio < fim e regra de sobreposição aprovada.
4. Restrição de DELETE para histórico sensível; requisitos legais de retenção/eliminação ainda precisam de projeto.
5. Escopo de rede/idoso obrigatório em consulta, inclusive em subqueries, anexos, CSV e auditoria.
6. Criar índice somente baseado em consulta de verdade; transações de transferência/correção não podem varrer tabelas grandes desnecessariamente.
7. Dependências cruzadas que não podem ser garantidas por DDL devem virar contrato de operação transacional com testes de concorrência obrigatórios.
