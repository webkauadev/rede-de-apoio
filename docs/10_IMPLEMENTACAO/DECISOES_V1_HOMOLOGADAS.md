# Ratificação V1 de arquitetura, SQL e autonomia do Codex

**Aprovação delegada pelo solicitante:** 2026-10-09 (hora local). O solicitante explicitamente autorizou **definir, aprovar e consolidar as pendências** para desenvolvimento. Decisões listadas a seguir são escolhas de projeto da V1 e **não constavam como opções já aprovadas nas fontes anteriores**. Este documento é o registro novo; deve ser integrado à `main` e citado nas regras canônicas. Não reescreve retroativamente os critérios de aceite P01/#73.

**Escopo deliberado:** web mobile-first + SQL MySQL para importação posterior, papéis/permissões existentes, sem automação clínica especulativa. Ao transformar uma lacuna em escolha funcional da V1, a obrigação de segurança e de compatibilização com RF/US é mantida. **Não foi executado MySQL real nem entregue app funcional.**

## Configuração tecnológica homologada para início do código

- **Plataforma**: web mobile-first, com possibilidade de instalação como PWA, sem app nativo separado.
- **Frontend/backend**: Next.js (App Router) + React + TypeScript strict em um único repositório; rotas e serviços de domínio separados. Ajustar versões estáveis no primeiro `package-lock.json` de scaffold.
- **Design**: Tailwind CSS, shadcn/ui e tokens do design system do GitHub; Material Design 3 para comportamento, não para substituir a identidade.
- **Persistência**: MySQL 8.4 InnoDB/utf8mb4 com SQL de criação versionado e fonte `database/mysql/001_rede_de_apoio_schema.sql`. Não substituir suas FKs/constraints por ORM que as omita; preferir SQL explícito para serialização crítica. ORM opcional, desde que não altere DDL.
- **Auth**: conta própria por email e Argon2id, com convite/definição de senha pelo titular, sessões httpOnly Secure SameSite, limitação de tentativas e auditoria. Não armazenar senha de texto puro ou em logs.
- **Deploy**: desenvolver primeiro localmente; produção e armazenamento de dados reais dependem de segredos/backup, política LGPD, integração e autorização própria.
- **Modo Codex**: executar US por branch/PR com testes e rastreabilidade; não depender de Figma live para o snapshot V1; não fazer merge sem revisão humana explícita — **esta mensagem de aprovação é específica para consolidação dos PRs documentais SQL/contexto e decisões**, não é aprovação indiscriminada de futuros PRs de código.

## Deliberação de DB-001 a DB-038

| ADR | Escolha V1 aprovada por delegação | Implementação/limite | Fonte |
|---|---|---|---|
| **DB-001** | A1: uma rede histórica por pessoa idosa | UNIQUE rede_cuidado(pessoa_idosa_id), histórico preservado dentro da rede; não criar R2 para o mesmo perfil | RF03/US-003, RF04/US-005 |
| **DB-002** | B3: cadastro de perfil primeiro; constituição operacional completa numa transação | rede nasce OPERACIONAL com Principal Familiar exatamente 1 e Profissional >=1 antes do COMMIT; bloquear acesso a perfil pendente pela ausência de rede | RN-001/RN-004/US-003/005 |
| **DB-003** | E1: reingresso com novo membro_id/episódio | revogação do episódio antigo e papéis antigos, novo vínculo explícito; não restaurar acesso anterior | US-005/006 |
| **DB-004** | Fonte do Principal é atribuicao_papel_familiar vigente | UNIQUE gerada para no máximo 1; transação serializada no agregado rede assegura exatamente 1 operacional; revogação+concessão atômicas | RN-001 |
| **DB-005** | Plantões de registros diferentes podem coincidir | um responsável por registro de plantão; 0..N plantonistas atuais na rede no mesmo instante | DEC-S01/RN-003 |
| **DB-006** | V1: troca de responsável de um plantão, não permuta bilateral | aceitar/refusar com versão esperada; conflito 409 se stale; não fazer troca cruzada automática | RF09/US-012/013/DEC-S03 |
| **DB-007** | V1: tarefa tem um responsável opcional antes da atribuição e somente uma conclusão; não reabre | ciclo único 1, não aceitar incremento do ciclo; futura reabertura exige nova decisão/migração | RF21/US-024/025 |
| **DB-008** | Correção por domínio com FK real e original imutável | Diário, Consulta e Administração com tabelas de revisão tipadas; negar UPDATE/DELETE de fato original | RNF02/US-034 |
| **DB-009** | Consulta independente do compromisso; recomendação pode ser sem consulta | FK de compromisso/consulta opcional; preservar escopo da mesma rede | RF19/RF20 |
| **DB-010** | V1: horários prescritos textualmente com agenda diária/semanal definida, sem PRN automático | não gerar dose, unidade clínica ou intervalo ad hoc; recurrency deve ser resolvida/validada pelo operador e app | RF14/RF15/DB-015 |
| **DB-011** | Registrar administração somente como fato realizado; sem registro não é omissão comprovada | sem status clínico automático omitida/parcial/adiada; justificativa e correção como histórico; no máximo 1 vínculo a uma ocorrência prevista por V1 | RF16/RN-005/DEC-S02 |
| **DB-012** | Uma ficha vigente de emergência por rede | UNIQUE rede+idoso; atualização por autorizado/auditoria; posterior versionamento se virar fato histórico | RF24 |
| **DB-013** | Anexo referenciado por FK a um único original de cuidado, consulta ou administração | não anexar a versões em V1; upload privado com metadados e acesso por permissão atual | RF23/US-027 |
| **DB-014** | Outbox técnica é permitida, mas interface apenas feedback transitório | N01–N04 via AppShell; sem inbox, sem promessa de entrega offline; outbox só para transporte/idempotência | P04/RF17/RF25/RF26 |
| **DB-015** | Fatos/ocorrências em instante UTC DATETIME(6) e fonte civil por fuso IANA | backend converte timezone, registra zona de recorrência; DB não converte DATETIME automaticamente | RF07/RF15 |
| **DB-016** | V1: autenticação própria por email + hash Argon2id, sessão em cookie seguro | senhas nunca em texto; recuperação por token temporário com hash, rate limit e revogação de sessão; credenciais de conta Pessoa Idosa só pelo titular | RF01/RF02/RF30 |
| **DB-017** | Ativação da Pessoa Idosa por convite temporário de uso único | habilitacao_acesso_idoso com token só em hash, expiração, revogação e uso; Familiar não define a senha do titular | RF30/US-036 |
| **DB-018** | Não aplicar exclusão automática a dado clínico; revisão LGPD obrigatória antes de dados reais | retenção, exportação/anonimização e prazo legal não podem ser inventados. Ambiente real bloqueado até política de privacidade formal | RNF01/RNF02/RNF03 |
| **DB-019** | Editar ficha de emergência somente Familiar Principal vigente na V1 | outros papéis apenas leitura se permissão contextual; Pessoa Idosa própria leitura; qualquer ampliação exige regra explícita | RF24/RN-010 |
| **DB-020** | Rede admite vários cuidadores/familiares e vários Profissionais | mínimo um Profissional ativo por rede operacional; uma pessoa pode estar em diferentes redes como cuidador, respeitando escopo | RN-004 |
| **DB-021** | Uma administração vinculada por ocorrência programada na V1 | UNIQUE(rede_id,ocorrencia_id) com NULL para administração avulsa autorizada; replay idem não gera novo fato. Não transformar registro avulso em dose extra por padrão | RF16/DEC-S02 |
| **DB-022** | Registrar histórico próprio de alterações efetivas de plantão | historico_plantao append-only com FK e versões antes/depois; auditoria segue separada de evento de negócio | RF06/RF09/RNF03 |
| **DB-023** | Outbox técnica com expiração por evento e limpeza sob política aprovada; auditoria retida sem TTL automático | não prometer SLA externo nem prazo legal definido; sem cleanup automático de log sensível antes de política | P04/RNF03 |
| **DB-024** | Snapshot mínimo de categoria e papéis na auditoria | sem conteúdo clínico, tokens, senha ou cópia integral de registros | RNF03 |
| **DB-025** | Contas Pessoa Idosa e CUIDADOR são mutuamente exclusivas nesta V1 | uma conta titular pode vincular só um perfil idoso; mesma conta não atua como Familiar/Profissional | RF30/RN-009 |
| **DB-026** | FK composta para garantir subtipo Familiar antes de papel | categoria membro imutável durante episódio; mudanças exigem desvincular e novo episódio autorizado | RN-002/RN-004 |
| **DB-027** | Intervalo de vínculo [vinculado_em,desvinculado_em); NULL = não encerrado | revogação de papéis junto à saída; tempo do servidor é referência e histórico não dá direito atual | US-006 |
| **DB-028** | Proibir saída do último Principal/Profissional sem transação de substituição | plantões/tarefas futuras devem ser reatribuídos/cancelados explicitamente antes do desligamento, mantendo histórico; recusar se pendente | US-006/RN-001/RN-004 |
| **DB-029** | Persistir ocorrências programadas versionadas por fonte/data | uma origem FK tarefa XOR horário; UNIQUE fonte,instante,geração; ausência de registro não equivale a não execução | RF15/RF17/RF26 |
| **DB-030** | N02-A: um responsável explícito da ocorrência, dentre plantonistas atuais elegíveis | no horário conferir vínculo+plantão; se ausente, NÃO enviar substituto, registrar falha de elegibilidade/auditoria e sinalizar pendência operacional existente; não criar inbox | RF17/US-020/DEC-S01 |
| **DB-031** | N04 na borda H+15 inclusive se ainda não há execução registrada confirmada | serializar verificação por ocorrência; evitar envio repetido; registro posterior não apaga aviso histórico nem atesta omissão | RF26/US-030/DEC-S02 |
| **DB-032** | Um commit por mesma tarefa/ciclo; idempotência por ator/chave/payload | múltiplos cliques conflitantes: segundo 409, replay igual retorna resultado; sem reabertura V1 | DEC-S03/US-025 |
| **DB-033** | DST ambíguo/inexistente impede geração silenciosa de ocorrência | exigir resolução explícita do horário local e auditoria; não deslocar automaticamente hora de medicação | RF15/DB-015 |
| **DB-034** | Revisão tipada por domínio | correcao_registro_cuidado, correcao_consulta, correcao_administracao_medicamento com FK real | RNF02 |
| **DB-035** | Snapshot completo por versão, não diff | conteúdo da versão atual vem do maior numero_versao confirmada; preservar original | RNF02 |
| **DB-036** | V1 permite corrigir descrição/observação e instante declarado com justificativa | não alterar identidade, vínculo de rede, autor original, regime/ocorrência por correção textual | RNF02/US-034 |
| **DB-037** | Anexo V1 vincula original e não migra automaticamente em correção | armazenamento privado, validação de conteúdo, acesso atual, rejeição de arquivos inválidos; revisão de anexo fica fora do escopo V1 | RF23/RNF01 |
| **DB-038** | Tentativas negadas auditadas em transação separada da ação rejeitada | log sanitizado confiável fora do rollback do domínio; resultado/ator/hora/rede, fail-closed se trilha requerida indisponível | RNF01/RNF03 |

## Decisões operacionais críticas — exemplos de contratos

**Rede/Principal:** somente uma rede histórica por perfil (`UNIQUE pessoa_idosa_id`); perfil pode ser cadastrado sem rede. A constituição de rede, Principal Familiar e primeiro Profissional fica na **mesma transação**; nenhum COMMIT é permitido se os mínimos faltarem. Transferir Principal revoga uma concessão e concede a outra dentro da mesma transação com lock no agregado; o histórico continua.

**Autorização:** senha e conta não criam participação automaticamente. Cada endpoint verifica ator, conta ativa, rede, episódio vigente, papel/categoria e tipo de recurso, inclusive CSV e anexos. A Pessoa Idosa acessa apenas a própria informação em T03–T15 no modo somente leitura.

**Plantão/N02:** plantões diferentes podem coexistir. N02 para ocorrência programada consulta **responsável designado** e confirma que ele é Plantonista Atual no instante previsto. Se ninguém elegível: registrar anomalia/sinalizar na rotina existente e **não emitir N02 para outro membro nem para o Principal como fallback**. Não existe inbox.

**Medicação:** planejado, realizado e alerta N04 são três fatos. Reprocessar o mesmo pedido não produz administração nova; uma ocorrência possui no máximo uma administração confirmada na V1. Uma administração registrada avulsa requer ação explícita e autorização, nunca é gerada por retry. No horário inexistente ou ambíguo de DST, não inventar ou deslocar dose: exigir resolução explícita.

**Imutabilidade:** manter original e gravar nova versão por domínio, com justificativa e autoria efetiva; anexos privados permanecem no original. Acesso negado deve ser auditável ainda que a transação de negócio reverta.

## Condições de segurança que NÃO podem ser consideradas provadas por esta homologação

1. **LGPD/retention:** DB-018/023 escolhem não excluir automaticamente, mas **não fixam prazo legal**. Nenhum dado clínico real em produção antes de avaliação de retenção, backups, DPIA/LGPD, direitos do titular e controles.
2. **Clínica:** DB-010/011/021/033 definem limites de software, **não são prescrição, instrução médica ou permissão para alteração de dose**. Fluxos excepcionais, PRN, múltiplas administrações ou agendamento sob DST ambíguo devem bloquear/solicitar regra clínica.
3. **Segurança efetiva:** FK/CHECK não substituem autorização do servidor; criptografia, sessões, auditoria independente e concorrência precisam testes de integração e hardening no app.
4. **Validação física:** CI atual é estática. Workbench EER e execução MySQL 8.4 com transações em duas sessões não ocorreram; primeiro uso real requer conferência.
5. **Critérios P01:** os comentários aprovados nas Issues e a aprovação original persistem. Esta ratificação complementa lacunas específicas do design da V1, sem apagar histórico.

## Diretriz de atualização canônica

Após registrar este documento na branch, atualizar `BUSINESS_RULES.md`, `NOTIFICATIONS_RULES.md`, `AGENTS.md`, o guia Codex, o dicionário SQL e validadores. O texto base dos RF/US aprovado não deve ser substituído sem rastreabilidade. Após merge na `main`, **este registro versionado** é decisão de arquitetura homologada e referência adicional para os RF/US relacionados, respeitando o aceite já aprovado.

### Política de mudança futura

Nova necessidade de segunda rede, reabertura de tarefa, permuta bilateral, dose PRN/múltiplas doses, regras de DST, exportação por outro ator, correção de anexo ou política de retenção diferente exige nova ADR/Issue e testes. O Codex pode prosseguir autonomamente com o V1 aprovado e deve parar quando a tarefa exigir hipótese clínica/regulatória fora deste escopo.

## Compatibilização do bootstrap B3 com US-003

O ator da US-003 é descrito como **Familiar Principal**. Antes de existir rede não há `membro_rede` nem `papel PRINCIPAL` persistido. Para a constituição inicial, o Familiar **autenticado que será o Principal inicial** pode cadastrar um perfil ainda **não operacional** dentro de um **fluxo restrito de bootstrap**, sem poder consultar cuidados ou editar uma rede ainda inexistente. O vínculo de Principal efetivo e o primeiro Profissional serão concedidos juntos na criação de `rede_cuidado` em uma transação. Se o primeiro Profissional não estiver disponível, o perfil pode aguardar a conclusão do bootstrap, sem expor dados clínicos a outros usuários. A criação do perfil não dá papel Familiar por si só.

Essa regra torna a US-003 executável sem inventar um Principal persistido de rede inexistente, preservando a RN-001/RN-004 após o primeiro COMMIT de rede operacional.
