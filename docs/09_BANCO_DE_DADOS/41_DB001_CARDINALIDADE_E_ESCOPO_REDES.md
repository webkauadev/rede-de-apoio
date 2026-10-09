# 41 — Pacote decisório DB-001: quantas Redes por Pessoa Idosa?

**Status:** PENDENTE DE DECISÃO FUNCIONAL. **Data:** 2026-10-09. Este texto organiza alternativas; **não modifica RF03/RF04/US-003–US-007 nem escolhe cardinalidade por inferência**. Fonte canônica: US-003 "cadastrar a pessoa idosa para criar o contexto de cuidado da rede", US-005/006 sobre vincular/desvincular membro, RF30/US-036 consulta da própria pessoa, RN-001 (Principal único por pessoa/rede), RN-004 (≥1 Profissional por rede), RNF01 (isolamento). Referências: [02](02_MODELO_CONCEITUAL.md), [37](37_MODELO_LOGICO_CANDIDATO_RELACIONAMENTOS.md), [40](40_DIAGRAMAS_ALTERNATIVOS_REDE.md).

## 1. A pergunta não é apenas "1 ou N"

A restrição pode contar **redes históricas** ou apenas **redes operacionais ao mesmo tempo**; isso altera a definição do que significa `UNIQUE(pessoa_idosa_id)`.

| Alternativa | Semântica | Estrutura candidata | Risco/impacto |
|---|---|---|---|
| **A1 — No máximo uma rede em toda a vida do cadastro** | E1 nunca pode possuir rede R2 se já teve R1, ainda que encerrada | uma FK de pessoa por rede e UNIQUE permanente na pessoa | Simples isolamento, mas impede reconstituição de rede com identidade histórica distinta |
| **A2 — No máximo uma rede operacional de cada vez** | R1 pode ser encerrada e R2 criada, mas duas redes não operam em paralelo | múltiplas linhas históricas; regra temporal de unicidade da rede operacional | Preserva histórico; impõe transação no encerramento→ativação e definição de continuidade dos registros |
| **B — Múltiplas redes operacionais para a mesma pessoa** | E1 pode participar de R1 e R2 simultâneas com famílias/profissionais distintos | sem UNIQUE em pessoa_idosa_id; toda operação contextual especifica R | Mais flexível, porém risco elevado de vazamento, duplicidade de registros/cuidados e destinatários incompatíveis |

**Nenhuma alternativa foi aprovada.** A versão A do diagrama 40 cobre A1; a variante A2 é refinamento temporal da mesma hipótese de exclusividade operacional. A origem RF03/US-003 **não** responde se criar "contexto de cuidado" cria automaticamente R1 nem se cria várias redes.

## 2. Critérios canônicos que qualquer alternativa deve manter

1. A rede operacional mantém **um único Familiar Principal vigente** (RN-001), mesmo que existam várias redes para a mesma pessoa.
2. Cada rede mantém **pelo menos um Profissional vinculado** (RN-004). Dois Profissionais não são a mesma coisa que dois Principais.
3. A autorização de U para R1 nunca concede automaticamente acesso a R2, mesmo que ambas tratem da pessoa E1, sem regra específica aprovada.
4. O login read-only da Pessoa Idosa consulta somente dados **do próprio cuidado autorizado**, não administra redes nem ganha papéis familiares (RF30).
5. Cadastrar/editar a Pessoa Idosa (T12) não autoriza alterar retroativamente origem/autoria dos cuidados já registrados.
6. **DEC-S01**: dentro de qualquer rede é permitido haver plantões diferentes em horários simultâneos; **não confundir simultaneidade de plantões com cardinalidade de redes**.
7. **DEC-S03**: trocar o mesmo plantão e concluir a mesma tarefa/ciclo são operações de efeito único, sem conflito entre recursos independentes.

## 3. Dados "da pessoa" versus "do trabalho de uma rede"

**Perguntas obrigatórias antes de definir FKs:**
- D13 `medicamento` e D14 `regime` são informações globais da Pessoa Idosa E1 compartilhadas pelas suas redes, ou pertencem à rede que os registrou?
- Um registro de saúde criado em R1 pode ser consultado por usuários de R2 que cuidam da mesma E1? O simples `pessoa_idosa_id=E1` não prova essa autorização.
- Quem administra um vínculo que transfere uma pessoa de R1 para R2? É transferência de rede, encerramento, ou duas redes legítimas?
- A própria Pessoa Idosa vê a união dos próprios registros ou apenas os registros da rede selecionada? Ambos necessitam de regra contextual explícita.
- Como N03/N04 resolve o Principal obrigatório quando o mesmo cuidado aparece em mais de uma rede?
- Como evitar agendar a mesma dose duas vezes em redes diferentes se a intenção é uma medicação só? **Não inventar deduplicação clínica** sem RF/ADR.

**Risco de desenho:** colocar `rede_id` opcional em toda tabela e depois inferir rede a partir da pessoa idosa causaria consultas sem escopo suficiente na alternativa B. Inversamente, duplicar automaticamente fatos de saúde entre redes violaria histórico e não está especificado.

## 4. Chaves e entidades impactadas

| Domínio | A1 | A2 | B |
|---|---|---|---|
| D03 Rede | UNIQUE por pessoa candidata | máximo uma **rede operacional** por pessoa, preservando históricas; mecanismo transacional/índice a provar | nenhuma unicidade de `pessoa_idosa_id` |
| D04 Membro | mesmo usuário pode ter múltiplos papéis dentro da mesma rede | novo episódio/papel após nova rede | membros inteiramente separados por rede |
| D06 Plantão / D08 Tarefa | FK de escopo `rede_id` | registros antigos permanecem em R1, novos em R2 | cada evento deve carregar contexto explícito de R |
| D13–D16 Medicação | idoso e rede frequentemente inferíveis, mas não inventar política | compartilhar ou não plano antigo depende decisão | evitar evento em R2 apontar a regime protegido de R1 sem regra |
| D17–D19 Registros/anexos | histórico da pessoa contextualizado | preserva origem histórica R1 | controle de acesso por rede+recurso é essencial |
| D22–D23 Preferência/auditoria | contexto ainda útil | contexto histórico sempre obrigatório | notificações/auditoria jamais misturam R1/R2 |

## 5. Perguntas de decisão para revisão humana

**DB-001.1:** uma Pessoa Idosa pode ter mais de uma Rede **operando simultaneamente**? (A1/A2: não; B: sim).

**DB-001.2:** se a anterior for "não", pode haver uma nova rede depois de encerrar a antiga? (A1: não; A2: sim).

**DB-001.3:** se existir mais de uma rede histórica/ativa, que registros de cuidado são compartilhados entre redes, e por quais usuários? (**NÃO especificado nas fontes**).

**DB-001.4:** o ato de cadastrar Pessoa Idosa constitui a rede imediatamente ou apenas cria o perfil? Isso depende também de DB-002.

## 6. Recomendações não aprovadas

Como estratégia de menor complexidade para **primeira versão**, avaliar **A1** se a intenção for um único grupo de apoio por idoso. Como alternativa que preserva reconfiguração histórica sem duas redes simultâneas, avaliar A2. Não declarar A1 "melhor" sem consultar a equipe, porque a possibilidade de nova rede pode ser necessária no domínio.

Não criar `UNIQUE(pessoa_idosa_id)`, colunas de escopo anuláveis, replicação de administração ou exclusão automática de uma rede até DB-001/DB-002 e retenção DB-018 serem deliberadas.

## 7. Gates

G1: escolher A1/A2/B com autor/data/justificativa; esclarecer escopo de medicamentos/diário em B; registrar `migration_required` se novo comportamento precisar de RF/US/critério. G2: ajustar diagrama e dicionário, enumerar FKs e autorizações. G3: no MySQL descartável provar inserções inválidas, encerramento/ativação (A2), isolamento entre R1/R2 (B) e papel Principal por rede. Ver [44](44_CASOS_BOOTSTRAP_E_VINCULOS.md).
