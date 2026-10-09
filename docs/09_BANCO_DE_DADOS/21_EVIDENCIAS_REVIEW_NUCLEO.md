# 21 — Relatório de revisão e simulação do núcleo (sem SQL)

**Data:** 2026-10-09. **Tipo de evidência:** revisão documental do GitHub oficial + simulação de predicados/regras em memória num mecanismo JavaScript temporário. Sem MySQL, sem transação InnoDB, sem esquema criado. Revisão técnica ainda depende de PR.

## Resultado medido nesta revisão

| Verificação | Quantidade | Resultado |
|---|---:|---|
| Combinações de papéis familiares de 3 usuários, cada um com subconjunto dos três papéis | 8³ = 512 | 512 classificações bateram com o predicado “exatamente um Principal” |
| Combinações válidas da enumeração com um Profissional adicional sempre vinculado | 192 | Confirmadas por enumeração |
| Outras asserções ilustrativas (transferência por cópia, preservação de outros papéis, desligamento, categoria profissional, intervalo, limiar, read-only, isolamento simbólico, deduplicação simbólica) | 48 | 48 resultados conforme esperado |
| Total de predicados executados | **560** | **560 conforme esperado**, 0 falhas do modelo simplificado |

**Por que existem 192 combinações válidas?** Com três familiares e três papéis independentes: escolher quem ocupa o único Principal dá 3 possibilidades; os outros dois papéis Apoio/Emergência podem estar presentes ou ausentes livremente em cada um dos três familiares, com 2⁶ = 64 combinações; 3×64=192. Esse cálculo verifica a representação acumulável de papéis, **não** o MySQL.

## Modelo exercitado (abstração proposital)

- Rede operacional = coleção de membros com categoria Familiar/Profissional e conjunto de papéis.
- Invariante ilustrativo: exatamente 1 membro familiar com Principal; ≥1 Profissional; Profissional não possui papéis familiares.
- Transferência ilustrativa: clonar estado; retirar Principal de A; acrescentar Principal a B familiar; validar invariantes; publicar cópia somente se válida.
- Desvinculação ilustrativa: clonar, desativar membro, validar; se inválido, manter estado anterior.
- Autorização read-only, limite semiaberto e atraso foram avaliados como expressões isoladas sem backend.
- As duas possíveis ordens seriais de transferência Alice→Bruno e Alice→Camila foram testadas: a segunda transferência com origem antiga falhou em ambas; **isso não testa threads nem locks reais**.

## Achados da revisão que permanecem A VALIDAR

1. O rascunho tinha uma única tabela de papéis para membro genérico sem garantia relacional de categoria Familiar.
2. A exclusividade de Principal é uma propriedade por rede, não usuário e nem por linha.
3. O protocolo de bootstrap para Principal+Profissional simultaneamente obrigatórios não foi especificado funcionalmente.
4. A conta da Pessoa Idosa e a participação do Familiar não devem ser confundidas; identidade mista ainda exige DB-025.
5. Reingresso, vigência e histórico dos vínculos mudam as chaves únicas propostas.
6. Uma FK direta para membro não garante correspondência de rede.
7. Campo derivado com NOW() não resolve unicidade temporal por índice e os detalhes dependem da versão do MySQL.

## O que 560 PASS **não** significam

- Não comprovam criação de tabelas, MySQL CHECK/FOREIGN KEY, indexação parcial simulada ou UPDATE atômico.
- Não comprovam ausência de race condition, deadlock, lost update, isolamento entre sessões ou durabilidade após queda de energia.
- Não comprovam exatidão do domínio, completude de cadastro, segurança do servidor ou validação de formulários.
- O número de asserções não corresponde a 560 casos independentes: **512 são combinações de um mesmo predicado**.
- Casos de rede em CONFIGURACAO, conta híbrida e protocolos de convite usam apenas hipóteses para explorar a arquitetura e continuam sujeitos às ADRs.

## Referências oficiais que embasaram a avaliação

- MySQL CHECK constraints: https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html — não valida dados de outras tabelas por subquery.
- MySQL Foreign Key: https://dev.mysql.com/doc/refman/8.4/en/constraint-foreign-key.html — restrições são verificadas imediatamente; não há FK deferida.
- InnoDB locking reads: https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html — SELECT FOR UPDATE protege linhas apropriadas dentro de transação.
- MySQL generated columns: https://dev.mysql.com/doc/refman/8.4/en/create-table-generated-columns.html — expressões requerem funções determinísticas.
- UNIQUE e NULL: https://dev.mysql.com/doc/refman/8.4/en/information-schema-columns-table.html — UNIQUE aceita múltiplos NULL.
- Consistent reads: https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html — snapshot comum não equivale a lock nem prova de autorização atual.

## Próxima validação obrigatória

**Não homologar DDL** enquanto DB-001/002/003/004/016/025/026/027 não tiverem resolução revisada. Na fase física, os testes C1–C6 precisam de no mínimo duas conexões reais de MySQL em banco descartável, com resultados e logs verificáveis. Documento 20 contém o roteiro do que executar.
