# 46 — Evidência de simulação conceitual: rede, Principal e episódios

**Execução ilustrativa de 2026-10-09.** Em memória JavaScript, sem MySQL, sem threads, sem SQL, sem migrações e sem autenticação real. **700 / 700 asserções conforme o modelo de referência; 0 falhas observadas.** Essas asserções não aprovam alternativas DB-001/DB-002/DB-003, que continuam abertas.

## 1. Distribuição exata das verificações

| Família de predicados | Cálculo | Total |
|---|---:|---:|
| Composição operacional por contagem de Principais e Profissionais de 0 a 5 | 6×6 estados × 4 predicados | **144** |
| Cardinalidade alternativa A1/A2/B por redes totais e operacionais | 3 alternativas × 15 combinações possíveis (0 ≤ operacional ≤ total ≤ 4) | **45** |
| Transferência familiar Principal, outros papéis, cópia original, desligamento, categoria e último Profissional | 11 asserções | **11** |
| Isolamento de rede R1/R2 com usuário fictício Ana | 100 asserções | **100** |
| Dois episódios fictícios de Bruno [0,100) e [200,∞), com lacuna [100,200) | 400 instantes inteiros verificados | **400** |
| **TOTAL** | | **700** |

## 2. Predicados do modelo de referência

- **Rede operacional completa:** `quantidade_principais==1 && quantidade_profissionais>=1`.
- **A1:** no máximo uma rede em todo o histórico.
- **A2:** no máximo uma rede operacional **simultaneamente**; redes históricas podem coexistir.
- **B:** múltiplas redes históricas e ativas são **admitidas na hipótese**; a simulação NÃO equivale a autorização automática de dados entre elas.
- **Transferência Principal:** clonar o estado, remover somente papel Principal de Ana, conceder somente Principal a Bruno Familiar, conservar Emergência/Apoio e publicar cópia se Principal único e Profissional presente; rejeitar transferência a Profissional.
- **Desvínculo:** recusar saída que deixaria rede sem Principal ou sem último Profissional; após transferir Principal, ex-Principal pode sair do ponto de vista da contagem, sem afirmar que plantões futuros foram tratados.
- **Escopo de rede:** Ana vinculada apenas a R1 não recebe acesso por R2.
- **Histórico de vínculo:** episódio de Bruno Xold vigente de 0 a 100 (exclusivo), lacuna entre 100 e 200 e novo episódio Xnew de 200 em diante. A existência de Xold não concede autorização em 150.

## 3. O que NÃO foi provado

1. Que uma rede com estado `EM_CONFIGURACAO` seja permitida pelas regras atuais — B1 é só hipótese.
2. Que uma Pessoa Idosa possa ter redes novas/ativas após outra — A1/A2/B são só hipóteses.
3. Que reingresso seja aprovado pelo produto — os episódios são cenários de teste de alternativa.
4. Que FK, índices, UNIQUE condicional ou transações InnoDB implementem as operações sem corrida.
5. Que a autenticação, os papéis no backend ou permissões do idoso sejam seguros.
6. Que múltiplos plantonistas recebam N02 corretamente — DB-030 permanece pendente.
7. Que o histórico e dados de saúde tenham prazo de retenção decidido.

**Não afirmar "700 testes de integração"**. São repetições de funções simples sobre entradas fictícias; servem para verificar coerência do raciocínio antes da discussão humana.

## 4. Próxima prova física, se e quando autorizada

Fixar DB-001/002/003/004/026/027; escolher esquema lógico e estratégia de isolamento; criar ambiente MySQL **descartável autorizado** com dados sintéticos; rodar duas sessões para bootstrap simultâneo, transferência de Principal, última saída de Profissional, reingresso e operações que concorrem com desvínculo; registrar DDL, consultas, SQLSTATE, transaction boundaries e resultados. Até então: **NÃO HOMOLOGADO EM MYSQL**.

Ver [41](41_DB001_CARDINALIDADE_E_ESCOPO_REDES.md), [42](42_DB002_CONSTITUICAO_E_ATIVACAO_REDE.md), [43](43_DB003_004_EPISODIOS_PRINCIPAL_AUDITORIA.md), [44](44_CASOS_BOOTSTRAP_E_VINCULOS.md) e [45](45_ROTEIRO_DELIBERACAO_PRIORIDADES.md).
