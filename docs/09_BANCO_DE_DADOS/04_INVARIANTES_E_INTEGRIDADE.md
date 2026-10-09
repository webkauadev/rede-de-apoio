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


## Revisão técnica complementar — garantias que exigem atenção

1. Em MySQL, uma expressão CHECK que avalia UNKNOWN por causa de NULL não falha. Portanto CHECK(inicio < fim) **não substitui** NOT NULL quando ambas as datas forem obrigatórias. Cf. https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html.
2. Uma FK atribuicao_papel_familiar(membro_id)→membro_rede(id) **não impede** atribuir papel a Profissional: a categoria precisa de integridade própria (subtipo familiar ou chave composta com validação de constante de categoria). DB-026.
3. UNIQUE condicional por rede em concessão Principal pode impor **no máximo um** Principal, não o mínimo de um. Precisa chave de escopo rede com FK verdadeira, sem valor calculado a partir de NOW(), e transação de bootstrap/transferência. DB-002/DB-004/DB-027.
4. FK composta (rede_id,membro_id) impede referências de um membro de outra rede, mas não garante vínculo **vigente**, responsabilidade operacional ou domínio profissional; checagem contextual atual permanece necessária.
5. A revogação de vínculo/categoria não deve produzir mudança retroativa de autoria ou permitir reaproveitamento de identidade histórica. DB-003/DB-026.
6. Em REPEATABLE READ, SELECT comum pode ler snapshot antigo; operações que tomam decisão de permissão e escrevem exigem travamento/checagem na transação, não leitura prévia isolada. Cf. https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html.
7. A documentação em [18](18_REVISAO_CRITICA_NUCLEO_IDENTIDADE.md), [19](19_ALTERNATIVAS_E_TRANSACOES_NUCLEO.md) e [20](20_CENARIOS_RIGOROSOS_NUCLEO.md) substitui quaisquer suposições implícitas sobre categorias e Principal em exemplos anteriores deste diretório.


## Extensão de invariantes temporais — 2026-10-09

- **I23 (proposta técnica):** para intervalos adotados como [início,fim), início<fim e a sobreposição A∩B ≠ ∅ ocorre quando A.início<B.fim e B.início<A.fim; a política para sobreposições continua DB-005.
- **I24:** um pedido de troca já decidido não produz uma segunda alteração da mesma versão do plantão quando reprocessado; conflitos/concorrência devem ser serializados no serviço.
- **I25:** execução registrada se associa à pessoa, regime e horário pertinentes, evitando vínculos cruzados por FKs compostas quando possível.
- **I26:** mudança no horário/regime não reinterpreta administrações já confirmadas; correções seguem RNF02.
- **I27:** identidade de ocorrência datada precisa distinguir datas repetidas e revisões da regra; materialização é DB-029.
- **I28:** N02 resolve Plantonista Atual verdadeiro no instante do evento; se houver zero ou múltiplos, o comportamento é DB-030, nunca escolher arbitrariamente.
- **I29:** N04 depende de horário programado + ausência de registro; não inferir omissão e não criar atraso em sintoma espontâneo.
- **I30:** apenas uma entrega técnica por evento/ocorrência/tipo/destinatário efetivo em processamento idempotente; existência de outbox permanece DB-014.
- **I31:** registro tardio preserva a história de “sem registro no instante do aviso”, sem apagar fato já auditado; a política do status corrente e da borda é DB-031.
- **I32:** diferenças entre instantes UTC e hora civil no fuso são explicitadas; regras de DST inexistente/duplicado dependem DB-033.

**Leitura complementar:** [22](22_REGRAS_TEMPORAIS_E_RECURRENCIA.md) e [25](25_N02_N04_EVENTOS_IDEMPOTENCIA.md); simuladores em [27](27_EVIDENCIAS_SIMULACAO_TEMPORAL.md).


## Extensão de invariantes de versões e privacidade

- **I33:** original e versões confirmadas permanecem imutáveis no fluxo operacional, preservando autor e tempos (RNF02).
- **I34:** uma correção refere o mesmo registro original e mesmo tipo/titular; nenhuma FK polimórfica textual é considerada garantia referencial suficiente.
- **I35:** versão única por (registro original, número) e checagem de versão esperada sob transação; duas correções concorrentes não produzem V2 duplicada.
- **I36:** ator de correção possui permissão de criar o mesmo tipo **agora**, independentemente de autoria original (P03).
- **I37:** anexos pertencem a um recurso existente e são servidos conforme autorização atual do recurso pai; url pública/metadata isolado não bastam.
- **I38:** falha entre arquivo no storage e metadado DB não publica conteúdo órfão; reconciliação é mecanismo técnico a validar.
- **I39:** trilha de auditoria contém ator/contexto/ação/resultado mas não senha, token ou cópia clínica desnecessária.
- **I40:** CSV é autorizado somente ao Principal vigente e limitado ao histórico da Pessoa Idosa selecionada, com registro da operação; conta idosa não exporta.
- **I41:** acesso negado é registrado de forma mínima inclusive quando gravação de cuidado foi revertida, via arquitetura DB-038 a escolher.
- **I42:** o perfil de leitura do idoso e os direitos de retenção/eliminação não são alterados por hipótese técnica sem RF/RNF/decisão formal.

A garantia integral destes invariantes requer combinar FKs, privilégios, transações, backend e eventualmente storage privado; nenhuma asserção em memória substitui essa validação real.
