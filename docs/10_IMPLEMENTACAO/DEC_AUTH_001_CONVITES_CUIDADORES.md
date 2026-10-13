# DEC-AUTH-001 — Convite individual para cadastro de CUIDADOR (V1)

**Status:** HOMOLOGADA pelo responsável do projeto em 2026-10-09, resposta explícita “aprovo e segue”. **Autoridade primária:** [US-001/#37, comentário de decisão](https://github.com/webkauadev/rede-de-apoio/issues/37#issuecomment-6092864135). Esta é uma decisão **nova** para resolver a lacuna de “usuário autorizado” da RF01/US-001; **não** altera os critérios originais da [aprovação P01](https://github.com/webkauadev/rede-de-apoio/issues/37#issuecomment-5673832998) ou as 38 decisões DB já homologadas. Owner US-001 continua David.

## Regra aprovada

1. Cadastro de conta **CUIDADOR** em T02 é condicionado a **convite individual**, destinado a um e-mail normalizado. Informar um e-mail não é prova de autorização.
2. A credencial de convite é aleatória, secreta, expira, pode ser revogada e só pode ser consumida uma vez. Confirmação de autorização e criação do usuário devem ser uma **única transação**.
3. Para a **primeira conta**, um operador técnico autorizado emite convite usando processo **local controlado, fora do aplicativo**. Não há formulário de administração público, bypass HTTP, conta admin ou papel automático.
4. Para outras contas, o Familiar Principal efetivamente autorizado poderá emitir convites para sua rede quando os serviços de autenticação e administração de rede estiverem disponíveis. A emissão server-side deverá conferir vínculo/papel efetivo; não foi criada autorização para usuários comuns emitirem convites.
5. O registro inicial cria somente `usuario`, do tipo `CUIDADOR`. Sem vínculo `membro_rede`, rede `rede_cuidado`, papel, turno, sessão ou acesso a cuidado. A conta da Pessoa Idosa permanece separada (DB-017/US-036 e tabela `habilitacao_acesso_idoso`).
6. Adoção desse modelo remove `BLOCKED_BY_DECISION` no sentido **funcional**, mas não prova persistência, segurança, autenticação ou conclusão da US.

## Especificação técnica decorrente (parâmetros de engenharia, não novos critérios de aceite)

- Token gerado via CSPRNG, mínimo 32 bytes, serializado em base64url. Apenas **SHA-256 hexadecimal** (64 chars) é persistido; não guardar token bruto em banco, captura, commit, logs ou histórico de comandos. Envio **fora de logs**, por canal privado autorizado; não usar query string com token em URL/referrer. Entrada manual ou fragmento de URL processado no navegador sem analytics.
- Validade padrão **24 horas** como parâmetro operacional técnico configurável, não uma permissão adicional. Validar em UTC e com data/hora de banco para não depender do relógio do navegador.
- Tabela **independente** `convite_cadastro_cuidador`: [migração SQL 003](../../database/mysql/003_convite_cadastro_cuidador.sql), exclusivamente **aditiva** após `001`. Token hash único, convite aberto por e-mail único, bootstrap aberto único, checks de vigência/uso/revogação e emitente opcional para operador técnico. Convite vencido que segue não-usado/não-revogado continua ocupando a unicidade “aberto” e precisa ser revogado explicitamente sob transação antes de emitir outro. Não modificar `001` silenciosamente.
- Primeiro convite: CLI de operação **local**, sem rota HTTP de emissão e sem depender de credenciais embutidas no código. Verificar instância de desenvolvimento aprovada, ausência de cuidadores existentes e convite bootstrap ativo; serializar emissão concorrente (por exemplo lock nomeado + unique); permitir reemissão apenas mediante revogação controlada de convite anterior não utilizado e enquanto não houver nenhuma conta CUIDADOR. O operador não vira usuário de app.
- Convite posterior: somente com ator autenticado e autorização contextual para administrar a rede (Familiar Principal); essa interface de emissão requer integrações US-002/US-005/US-007. Não conferir tal direito com dados fornecidos pelo cliente. Prova de rede requer sessão/escopo, e emissão não cria vínculo automaticamente.
- Consumir convite por `token_hash` dentro da transação, com `SELECT ... FOR UPDATE`; conferir e-mail, estado e expiração no banco, então `INSERT usuario` e `UPDATE ... SET usado_em = NOW(6)` **na mesma transação**, com verificação de 1 linha alterada; conflitos geram rollback e respostas genéricas, sem vazamento de existência de e-mail. Token diferente, expirado, usado, revogado ou e-mail divergente deve falhar **antes do Argon2id**. Confiar na UNIQUE `uq_usuario_email`; sem `SELECT`-then-`INSERT` como substituto da constraint.
- Impor limites de tentativas antes de hash/verificação cara, distinguindo uso local/testes de exposição pública. A funcionalidade **não** fica pública até rate limit/abuso, CSRF/Origin, auditoria pertinente e demais gates G-AUTH/G-SEC estarem prontos. Tratamento de COMMIT incerto não faz retry automático: reconciliar pelo estado persistido, nunca duplicar efeitos.
- Privilégios: autorização no servidor, nunca por flags `admin`, `tipo_acesso`, `rede`, `role`, `authorized` ou `invite_issuer` vindos da requisição de cadastro.

## Ambiente descartável de testes autorizado

A aprovação **permite Codex no Fedora** executar MySQL **8.4** em instância **local, isolada e descartável**, com credenciais efêmeras fora do Git e dados totalmente sintéticos, para validar **001 + 003**, estruturas e concorrência. Preferir Podman rootless e porta mapeada **somente para 127.0.0.1**. Nunca reutilizar um servidor ou volume existente, nem executar os comandos contra `localhost:3306` sem confirmar a instância. Manter contêiner/volume com identificadores exclusivos para este ensaio; destruir somente os próprios recursos de teste depois de confirmar os identificadores. Registre comando, versão, `SHOW CREATE TABLE`, resultados e falhas em runbook/PR **sem segredos**.

**Gate G-DB:** comprovar MySQL de verdade, não só mocks: importa 001 (30 tabelas), aplica 003 (tabela 31), consulta metadados, testa UNIQUE de e-mail e token, 2 sessões concorrentes consumindo mesmo token, dois convites para mesmo e-mail, revogação/expiração, hashes Argon2id, zero papéis/vínculos criados por cadastro e comportamento de confirmação incerta. Se o ambiente físico não estiver disponível, manter draft e informar impedimento.

A autorização **não** abrange MySQL remoto, dados reais, produção, deployment, migração destrutiva, contêiner/volume preexistente, gerência de segredos de terceiros ou provisionamento fora do Fedora de desenvolvimento. **Não declarar DB G-DB global do projeto encerrado**: as demais transações clínicas/escala ainda requerem integração futura.

## Continuidade do PR #120

O Codex deve puxar a branch `feat/us001-cadastro-conta-v1`, ler comentário canônico, implementar emissão controlada e ativação de convites, autorização no servidor, migração, testes unitários/E2E/integração, executar validadores existentes e adicionar checks de integração reprodutíveis sem expor credenciais. Preservar T02, RF/US, papel do David e DDL 001. Documentar testes efetivamente executados, impactos no fluxo visual e pendências G-AUTH (login/sessões/recovery fora da US). **PR #120 deve permanecer draft, sem auto-merge, até nova revisão humana e verificação dos três critérios.**

## Compatibilidade com bootstrap B3

Esta decisão trata de **criação de identidade de cuidador**, não da concessão do papel Familiar Principal. O cuidador inicial autenticado que será o Principal da futura rede continua sujeito a DB-002/US-003/US-005. O vínculo efetivo e o primeiro Profissional só surgem no bootstrap operacional transacional da rede. Fluxo de convite do primeiro Profissional antes de existir rede operacional deve ser combinado com o bootstrap restrito nessas US futuras; **não inventar Principal antecipado nem transformar convite em permissão**.
