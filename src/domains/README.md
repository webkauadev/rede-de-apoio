# Contratos de domínio V1

Ainda não há serviços funcionais. Cada US terá branch, critérios canônicos e PR próprios.

| Diretório futuro | Escopo e fonte |
|---|---|
| `auth` | RF01/RF02 e identidade RF30; US-001/002/036 |
| `pessoa-idosa` | RF03, bootstrap B3 DB-002; US-003/004 |
| `rede` | RF04/RF05, participação e papéis; US-005/006/007 |
| `plantoes` | RF06–10; US-008–014 |
| `tarefas` | RF21; US-024/025 |
| `diario` | RF11/12/18/28 e RNF02; US-015/016/021/032/034 |
| `medicacoes` | RF14–17; US-017–020 |
| `consultas` | RF19/20/23; US-022/023/027 |
| `notificacoes` | RF10/17/25/26/27, N01–N04; sem inbox |
| `auditoria` | RF29/RNF01/RNF03; US-033/035 |

Serviços orquestram regras e transações; repositórios contêm SQL estático parametrizado;
autorização verifica ator, vínculo, rede e recurso no servidor antes de ler ou escrever.
Route Handlers são limites de entrada Zod e saída sanitizada. Componentes não acessam banco.
Não gerar pastas/DTOs/regras sem uma necessidade efetiva da US.
