# 17 — Verificações executadas na etapa de planejamento

Data: 2026-10-09. **Método:** consultas diretas ao repositório GitHub e asserts ilustrativos de regras em memória. **Não foi criado nem executado banco MySQL, schema, seed, API ou migração.**

## Verificação documental (efetivamente conferida no GitHub)

| Validação | Fonte | Resultado |
|---|---|---|
| US oficiais identificadas | docs/01_REQUIREMENTS/USER_STORIES_INDEX.yaml | **36** |
| US com entrada na matriz de persistência | 12_RASTREABILIDADE_REQUISITOS.md | **36/36**, nenhuma faltante ou extra |
| Núcleos candidatos com seção D01–D23 | 03_DICIONARIO_DE_DADOS.md | **23** |
| Extensões condicionais com seção C01–C04 | 03_DICIONARIO_DE_DADOS.md | **4** |
| Exercícios T01–T42 enumerados | 13_CENARIOS_TESTE_DE_MESA.md | **42/42**, sem número ausente |
| Documentos de planejamento anteriores ao relatório | docs/09_BANCO_DE_DADOS | **18 arquivos** (16 capítulos, índice, diagrama) |
| Arquivos .sql adicionados ao diretório | árvore Git da branch | **0** |
| Integração à navegação de contexto | README.md raiz + AGENTS.md | seção de modelagem adicionada na branch |

**O resultado documental confirma cobertura e organização**, não completude clínica, correção do modelo lógico/físico, integridade do SQL ou validação de requisitos além da documentação canônica.

## Simulações ilustrativas em memória (executadas sem banco)

Foram avaliadas **17 asserções simples** (17 resultados conforme esperado) para exemplificar expressões pretendidas:
1. conjunto de papéis acumulados; detecção do Principal;
2. ilustração de cardinalidade de Principal;
3. intervalo semiaberto antes/exatamente no limite;
4. atraso antes e exatamente no limiar de 15 min;
5. exclusão de sintoma espontâneo do atraso;
6. bloqueio de escrita à Pessoa Idosa;
7. escrita por Principal e por Apoio com atribuição operacional, vedada ao Apoio sem condição;
8. escrita de saúde por Profissional autorizado, vedada sem domínio/autorizações;
9. deduplicação N03 por usuário/evento/tipo, preservando destinatários distintos;
10. rejeição ilustrativa de referência a membro de outra rede.

**Limites explícitos:**
- São avaliações simples de predicados em memória, **não** execução SQL nem prova de correção.
- Não testam bloqueio de linhas, concorrência real, transferência atômica do Principal, integridade referencial do InnoDB, recuperação de falha, procedimentos, visão de histórico, autorização em endpoints ou performance.
- Cenários T01–T42 permanecem **propostos** e não devem ser marcados como PASS em MySQL.
- O script existente scripts/validate_agent_context.py **não foi executado neste ambiente**; registries RF/US não foram alterados. CI do PR deverá confirmar a validação de contexto aplicável.

## Testes obrigatórios antes de qualquer liberação para uso

- Migrações reais em MySQL descartável, consultas em INFORMATION_SCHEMA e engenharia reversa Workbench.
- Integridade PK/FK/UNIQUE/CHECK com entradas válidas e inválidas.
- Transações **concorrentes** de transferência de Principal, solicitação de troca, versão de correção e N02/N04 idempotentes.
- Autorização negativa testada no serviço/API e no caminho direto a dados.
- Exportação CSV, armazenamento de anexos, auditoria e proteção dos dados de saúde.
- Backup e restauração, compatibilidade de timezone e performance.

**Veredito:** organização documental e exemplos de invariantes verificados em nível inicial; **não homologado** para implementação de banco até ADRs e revisão humana.
