# 28 — Arquitetura de correções imutáveis e envelopes de registro

**Etapa:** revisão da modelagem, sem SQL nem decisão definitiva de tabela. **Autoridade:** RN-005/RN-006/RNF02; US-034 originada RNF02; RF11/12/13/16/18/19 e RF23; P03: pode corrigir quem possui **agora** permissão efetiva de criar o mesmo tipo. Fontes: docs/01_REQUIREMENTS/RNF02_IMUTABILIDADE_E_CORRECAO.md, docs/02_BUSINESS_RULES/BUSINESS_RULES.md, PERMISSIONS_MATRIX.md.

## C1. Problema central e requisitos de prova

Um registro de cuidado preserva o original, sua identidade de pessoa idosa/rede, autoria, data/hora de ocorrência e gravação; a correção **não atualiza nem apaga** o original, mas cria registro vinculado. Correção também preserva autor/hora próprios.

- **Histórico de cuidado** contém registros e versões (T06/T07), além de exibições do estado atual.
- **Auditoria** contém a operação executada, ator e contexto, inclusive negadas (T17), sem substituir a versão clínica.
- **Anexo** é objeto relacionado a um registro autorizado, não log nem simples URL solta.
- A permissão para criar **não** resulta automaticamente do vínculo de autoria original: precisa contexto, categoria/papéis, plantão/responsabilidade e tipo de registro efetivos no instante da correção.

## C2. Duas arquiteturas fortes, ambas PENDENTES (DB-008/034)

### Alternativa A: envelope-base com subtipos de domínio

**Candidatos conceituais:**
- registro_base: registro_id (PK), pessoa_idosa_id, rede_id/contexto, tipo, autor_usuario_id, ocorrido_em, registrado_em;
- registro_diario / registro_administracao / registro_consulta (subtipos 1:1 por FK real, se tais tipos integrarem o envelope);
- versao_registro: versao_id, registro_id (FK), numero_versao, criador_id, instante, conteúdo tipado em subtipo de versão ou estratégia homologada;
- anexo: FK para registro_base e eventualmente versão específica se for possível associar corretamente.

**Vantagens:** identidade única para referência de correção/anexo; consulta de histórico uniforme; autoria padronizada.

**Perigos reais:** uma FK subtipo→base não garante que exista exatamente um subtipo e que seu tipo esteja coerente; CHECK local da base não conta subtipos; constraints circulares não diferidas complicam criação atômica. JSON de campos clínicos genéricos sem regras por domínio perde validez estrutural. Persistir cópia de pessoa/rede em subtipo pode divergir sem chaves de escopo.

**Obrigação se escolhido:** contrato de constituição base+subtipo na mesma transação e integridade de categoria/tipo, com testes para ausência de subtipo, dois subtipos ou tipo incorreto.

### Alternativa B: fatos imutáveis separados por domínio

- registro_cuidado (diário/sintoma/intercorrência) e suas versões;
- administracao_medicamento e correções imutáveis com FK específica;
- consulta/recomendacao e revisões quando RNF02 determinar;
- anexos com associação tipada **referencial**, como tabelas anexo_registro/anexo_consulta com PK/FK concretas, não string tipo/id.

**Vantagens:** requisitos de integridade e colunas específicas de medicamento/consulta; FK verdadeira por domínio; validação de valores por tipo.

**Perigos:** repetição da lógica de correção e autorização; consulta de histórico precisa projeção UNION/serviço em vez de confiar num registro-base; anexos com múltiplos destinos precisam impedir orfandade/dupla associação.

**Recomendação para estudar:** prototipar os dois modelos com dados sintéticos em futura fase de MySQL, medir invariantes e clareza. Não implementar ambos simultaneamente por indecisão.

## C3. Versões completas versus deltas

**V1 — snapshot completo de conteúdo corrigido:** cada versão contém representação válida e completa do mesmo tipo; consulta do último estado é mais simples; maior armazenamento.

**V2 — delta/evento de alteração:** versão contém somente campos alterados; reconstrução exige replay determinístico em ordem; risco de conflito, campo não editável ou mudança de schema.

**Proposta inicial de menor risco:** versão completa tipada, após escolher domínio/envelope. Mas permanece DB-035 e não é decisão aprovada.

### Invariantes de cadeia

1. Um registro original possui identidade estável (registro_id); nunca recebe UPDATE corretivo nem DELETE no fluxo normal.
2. Versões têm número estritamente crescente por registro; no máximo uma versão por número (UNIQUE candidato).
3. Versão V(n) referencia o **mesmo** registro original, o mesmo titular e o mesmo tipo; esses fatos não podem ser editados por correção normal.
4. Consulta atual = última versão confirmada, ou original se não houver correções; consulta histórica = todas as versões ordenadas.
5. Cada versão tem autor e instante próprios, sem substituir os do registro original.
6. Uma correção por terceiro é permitida apenas se sua autorização **atual** de criação do mesmo tipo for válida.
7. Duas versões concorrentes com mesma expectativa devem produzir uma vitória e conflito/rebase explícito; não lost update.
8. Não converter correção em ação de “novo cuidado realizado” sem regra específica para N03.

## C4. Operação CORRIGIR — contrato transacional proposto

1. Receber registro_id, versão esperada e novo conteúdo/justificativa sem confiar em autor/titular do cliente.
2. Autenticar autor atual e resolver titular/tipo/rede a partir do registro original com controle de escopo.
3. Abrir transação; lock no registro-base/linha agregadora; reler versão vigente e autorização efetiva no mesmo contexto.
4. Exigir versão esperada igual à atual; caso contrário conflito com orientação de atualização/revisão, não sobrescrita silenciosa.
5. Validar conteúdo do mesmo tipo e relações (ex.: regime/horário/pessoa na administração).
6. Inserir versão N+1 e trilha de auditoria mínima na transação ou no mecanismo de consistência aprovado.
7. Commit; projetar novo conteúdo atual sem remover V0…Vn; rollback se parte falhar.
8. Acessos negados deixam evento sanitizado sem corpo clínico e sem inserir versão.

**Não se pode provar invariantes apenas com frontend desabilitado ou trigger genérica.** MySQL não permite a um trigger modificar livremente a mesma tabela que o acionou; privilegios DB e validação no servidor também são relevantes.

## C5. Campos e exclusões ainda não decididos

- Exatamente quais tipos de registro pertencem a RNF02 e US-034 (DB-008).
- Se correção pode alterar data/hora de ocorrência ou somente conteúdo (DB-036).
- Se correção pode ser retirada/cancelada e como representar justificativa sem apagar conteúdo histórico (DB-036).
- Como vínculo de anexos funciona para original ou versão específica (DB-013/037).
- Se log e registro/versionamento compartilham a mesma transação ou outbox persistente (DB-038).
- Retenção e eventual anonimização legal versus imutabilidade operacional (DB-018).
- Mudança de tipo/idoso do registro deve ser rejeitada ou seguir processo excepcional não previsto; não autorizar por inferência.

## C6. Critérios de revisão com a equipe

Escolher arquitetura que permita, **por FK e operação verificável**, perguntas: qual é o original? quem foi o autor? quais as versões? quem corrigiu? qual o conteúdo histórico em uma data? a qual pessoa/medicamento/consulta pertence? quem podia corrigir naquele instante? arquivos a qual versão pertencem?

Fontes técnicas: https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html ; https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html ; https://dev.mysql.com/doc/refman/8.4/en/stored-program-restrictions.html .
