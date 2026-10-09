# 43 — Pacote decisório: histórico de participação, vigência e Principal único

**Status:** propostas de arquitetura para DB-003/004/026/027/028; **nenhuma alternativa homologada**, e não criar tabelas sem resolução. Fontes aprovadas: RN-001 (Principal único e transferência atômica), RN-002 (papéis familiares acumuláveis), RN-004 (Profissional separado), RN-008 (auditoria), US-005/006/007 (vincular/desvincular sem apagar histórico, gerir papéis), RF30/US-036 (Pessoa Idosa read-only).

## 1. A identidade de quem entrou não é o período durante o qual podia agir

Um `usuario_id` é identidade; `membro_id` representa participação na rede; `atribuicao_papel` representa concessão familiar; `plantonista atual` é condição temporal derivada. Desvínculo encerra **autorização futura**, mas não remove a existência histórica nem reescreve autoria.

### Reingresso DB-003: duas arquiteturas viáveis

| Arquitetura | Identidade | Reingresso | Prós | Risco |
|---|---|---|---|---|
| **E1 — Episódio de membro** | cada vínculo em R possui `membro_id` próprio | novo `membro_id` depois do desligamento; versões/vínculos antigos continuam | consultas de autoria por episódio simples, histórico explícito | impedir dois episódios ativos do mesmo usuário/rede exige guarda única/operacional |
| **E2 — Membro estável + períodos separados** | par (R,U) identifica membro estável, e cada vigência tem `episodio_id` | criar novo período do mesmo membro; eventos apontam episódio quando precisam prova histórica | evita múltiplas identidades de membro; fácil mapear usuário | mais uma entidade, e operações que referem só membro_id não distinguem vigências |

**Não decidido:** se a regra de produto sequer permite reingresso, qual o impacto para convites e papéis herdados. Não reativar papéis de um episódio encerrado automaticamente sem política expressa.

### Temporalidade DB-027

**Proposta:** usar intervalos `[início,fim)`, no qual `fim=NULL` significa fim ainda não registrado (não significa sempre autorização atual). A validade também depende da categoria, do estado da conta, da situação da rede e da permissão do recurso. Não usar o horário da requisição do cliente para definir vigência.

Risco: se a concessão de Principal prevê início futuro, a coluna "não revogado" não é igual a "vigente agora"; índices gerados condicionais não admitem relógio não determinístico. Requer desenho real conforme MySQL e a versão temporal escolhida.

## 2. Principal: combinação de papéis e invariantes

- Na rede operacional, a projeção `PrincipalVigente(R,t)` possui **exatamente um membro familiar**, independentemente de quantos outros papéis ele acumule.
- Ao transferir de Ana (Principal+Emergência) para Bruno (Apoio), após confirmação Ana mantém Emergência, Bruno mantém Apoio e ganha Principal; histórico de concessões/revogação continua.
- Profissional de Saúde **não pode** virar Principal por trocar o valor de `categoria`; participação familiar só é elegível após regra de vinculação/reclassificação aprovada.
- Pessoa Idosa da conta própria nunca recebe papel familiar.
- **Duas fontes concorrentes** para o Principal (ponteiro em `rede` e concessão `papel`) podem divergir; se ambas existirem, explicitar qual é fonte da verdade e comprovar consistência transacional.
- **Uma constraint UNIQUE pode assegurar no máximo 1** por escopo, não garante **pelo menos 1**; a existência deve ser mantida pelo contrato de rede operacional, inclusive ao desvincular/revogar.
- Uma transferência do mesmo Principal A→B e A→C quase simultânea tem apenas um COMMIT válido; outra precisa conflito e rechecagem (coerente com DEC-S03 por padrão de atomicidade, mas RN-001 já impõe a invariância).

## 3. Escopo de FKs e temporalidade

| Vínculo | Garantia estrutural | Garantia além de FK |
|---|---|---|
| `plantao (rede_id,membro_id)`→`membro_rede (rede_id,membro_id)` | responsável existe na mesma R | o membro estava elegível no intervalo pretendido; autorização de edição atual |
| `tarefa (rede_id,responsavel)` | responsável pertence a R | US-025: concluinte correto; condições RN-010 |
| `papel (membro_id,categoria)`→membro Familiar | categoria corresponde, se subtipo/guarda escolhida | vigência, Principal único, permissão do ator concedente |
| `registro_cuidado/administracao`→autor | autor existe | pertenceu à rede no momento do evento e podia agir, com snapshot histórico mínimo |
| `auditoria`→identidade | autoria passada preservada | resultado da ação e papel/categoria **no instante histórico**, não reavaliados como hoje |

**Regra técnica candidata:** chaves de escopo `(rede_id,membro_id)` devem ter campos obrigatórios quando a participação for exigida; em FK composta MySQL, um `NULL` parcial pode escapar da checagem. Não duplicar `rede_id` em associação apenas por conveniência sem manter integridade.

## 4. Contrato de saída de vínculo (DB-028)

1. Verificar que o solicitante administra a própria rede; travar o agregado R e vínculo X dentro de transação.
2. Se X é o único Principal vigente ou último Profissional exigido, operação **não pode** terminar deixando rede operacional inválida; negar ou combinar com transferência/substituição/suspensão aprovada.
3. Encerrar concessões e vigência de X com evidência histórica, revogar acesso futuro; não excluir registros/plantões/conclusões anteriores.
4. Para plantões, tarefas e responsabilidades **futuras**, há lacuna: cancelar? reatribuir? deixar pendente sem Plantonista? Precisa **DB-028 funcional**, não inventar automação.
5. Negar leituras e novas escritas pós-desvínculo; arquivos, histórico e CSV submetidos ao contexto vigente, mesmo que X tenha sido autor antigo.
6. Auditar quem solicitou, quem perdeu acesso, quando e resultado, sem cópia clínica sensível.

### Race a impedir

Uma transação revoga vínculo X enquanto outra atribui tarefa a X ou aceita troca que põe X em plantão. Ambas devem serializar no estado da participação/rede necessário: **não permitir atribuição após revogação confirmada**, nem confirmar transações que deixem recurso com responsabilidade incompatível com a regra final escolhida. A autoria antiga de X permanece.

## 5. Gate de decisão

- DB-003: reingresso permitido? E1 ou E2? Qual a identidade persistente para autoria?
- DB-027: definição exata de ativo, data fim, futuras concessões e alteração retroativa;
- DB-004/026: método de unicidade Principal, fonte única de verdade e categoria Familiar íntegra;
- DB-028: reatribuição/suspensão de plantões e tarefas quando alguém sai;
- DB-018: prazo de retenção e eventual eliminação/anonimização legal.

Comparar as opções com [19](19_ALTERNATIVAS_E_TRANSACOES_NUCLEO.md), [33](33_CONTRATO_CONCORRENCIA_ATOMICA.md) e [44](44_CASOS_BOOTSTRAP_E_VINCULOS.md). A escolha técnica não muda RN-001/RN-004/RNF02/RNF03.
