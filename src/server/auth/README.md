# Autenticação futura — não implementada

Fonte: STACK_V1_HOMOLOGADA e DB-016/017/025. RF01→US-001 (#37), RF02→US-002 (#38),
RF30→US-036 (#72). Email + Argon2id, cookie httpOnly/Secure/SameSite, sessões persistentes,
CSRF, expiração/revogação, rate limiting e convite temporário com hash para titular.
A identidade autenticada nunca concede permissão de rede automaticamente.
Não há endpoints, cookies ou sessão de demonstração nesta infraestrutura.
