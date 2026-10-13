# Autenticação V1

RF01 → US-001 (#37): convite CUIDADOR/Argon2id incorporados pelo PR #120.
RF02 → US-002 (#38): T01, serviço de login e sessões persistentes preparados nesta branch;
[relatório](../../../docs/10_IMPLEMENTACAO/US002_LOGIN_SESSOES_V1.md) separa mocks de integração real pendente.
RF30 → US-036 (#72): autenticação comum aceita categoria Pessoa Idosa já ativada; este incremento
não implementa sua ativação nem concede acesso a cuidado.

`login.ts` limita tentativas antes de Argon2id; `sessions.ts` persiste token apenas por SHA-256,
revalida conta/sessão a cada acesso e revoga no logout. `session-config.ts` mantém liberação
pública fechada: perfil local explícito, origem loopback e segredo de ao menos 32 bytes.

Use `requireIdentity` dentro de cada rota/página protegida. Identidade não é autorização de rede.
`denyCareAccess` permanece fechado até as US de domínio implementarem a matriz contextual.
Não substituir essas guardas por esconder botões, cookie-presence em proxy ou cache de sessão.
Não há fallback em memória, JWT de autorização, senha/token em logs ou recuperação funcional.
Migração aditiva `005_sessoes_login.sql` **não executada**; exige nova autorização de MySQL.
