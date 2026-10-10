# Integração MySQL pendente

Não executada na Issue #117. Antes de usar uma instância MySQL 8.4 descartável,
obter autorização do ambiente e cumprir G-DB. Importar manualmente o SQL V1,
validar as 30 tabelas e testar integridade/concorrência/rollback em sessões reais.
Os testes unitários de conexão usam mocks; não comprovam comportamento MySQL.
