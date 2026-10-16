# Governança transversal

| Elemento | Domínios / diagramas | Regra aprovada | Representação |
|---|---|---|---|
| Autenticação | A; UC-01, SQ-01 | Login identifica a conta; não concede papel nem acesso de cuidado. | Caso `Autenticar-se`; serviço técnico em SQ-01. |
| Autorização contextual | A–D; todos | Categoria, vínculo, papel e contexto limitam leitura/escrita; Pessoa Idosa é read-only. | Pré-condição/guarda; não classe de papel improvisada. |
| Papéis e condição temporal | A/B/D; UC-01, UC-02, CL-01/02 | Papéis familiares acumulam permissões positivas; Plantonista Atual depende de plantão ativo. | `AtribuicaoPapelFamiliar`; nota/guarda para Plantonista Atual. |
| Auditoria | D; UC-03, CL-03, SQ-01/03 | Registra ator, categoria/papéis quando aplicável, pessoa, data/hora, operação, recurso e resultado; negação e CSV são auditáveis. | `Auditoria`; participante técnico em sequência. |
| Correção versionada | C/D; UC-03, CL-03, SQ-03 | Original não é apagado/sobrescrito; correção cria nova versão por quem pode produzir o tipo. | associações `RegistroCuidado–CorrecaoRegistro`; alternativa em SQ-03. |
| Notificações | B/C/D; UC-02/03, SQ-02/03 | N01–N04 são feedback transitório; sem central; obrigatoriedade e destinatários seguem regras específicas. | Evento/nota de sistema nos casos de uso; consequência explícita ou serviço técnico abstraído nas sequências, nunca objetivo automático de ator. |
| CSV | D; UC-03 | Só Familiar Principal; histórico autorizado; operação auditada. | caso `Exportar histórico em CSV`, sem `include` artificial para auditoria. |

Fontes: [REQUISITO] `BUSINESS_RULES.md`, `PERMISSIONS_MATRIX.md`, `NOTIFICATIONS_RULES.md`, `AUDIT_RULES.md`, RF/RNF/US canônicos. A autorização é uma responsabilidade de serviço em sequências por ser [INFERENCIA] arquitetural; não é nova classe de domínio.
