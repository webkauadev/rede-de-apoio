# Matriz US ↔ casos de uso canônicos — verificação literal

**Escopo:** referência textual comprovada nos contratos UC-01, UC-02, UC-03 versus as 36 US do registry. **Não** equivale a prova de implementação ou homologação acadêmica.

**Critério:** o contrato possui linha `U-xx` mencionando literalmente `US-xxx`; as 5 US sem linha `U-xx` foram classificadas como regras automáticas ou de segurança em vez de inventar uma elipse.

| US / origem | Título | Caso(s) U-xx evidenciado(s) | Natureza e ressalva |
|---|---|---|---|
| US-001 / RF01 | Cadastrar conta | [UC-01 U-01](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md) | Referência literal ao contrato |
| US-002 / RF02 | Entrar | [UC-01 U-02](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md) | Referência literal ao contrato |
| US-003 / RF03 | Cadastrar pessoa idosa | [UC-01 U-03](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md) | Referência literal ao contrato |
| US-004 / RF03 | Atualizar perfil | [UC-01 U-04](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md) | Referência literal ao contrato |
| US-005 / RF04 | Vincular membro | [UC-01 U-05](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md) | Referência literal ao contrato |
| US-006 / RF04 | Desvincular membro | [UC-01 U-06](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md) | Referência literal ao contrato |
| US-007 / RF05 | Gerenciar papéis acumuláveis | [UC-01 U-07](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md); [UC-01 U-08](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md) | US referenciada por mais de um objetivo U-xx; não contar como requisito duplicado |
| US-008 / RF06 | Criar/alterar/cancelar plantão | [UC-02 U-12](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md) | Referência literal ao contrato |
| US-009 / RF07 | Consultar escala calendário | [UC-02 U-13](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md) | Referência literal ao contrato |
| US-010 / RF07 | Consultar detalhes/histórico de um dia | [UC-02 U-14](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md) | Referência literal ao contrato |
| US-011 / RF08 | Atribuir plantonista | [UC-02 U-15](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md) | Referência literal ao contrato |
| US-012 / RF09 | Solicitar troca | [UC-02 U-16](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md) | Referência literal ao contrato |
| US-013 / RF09 | Responder troca | [UC-02 U-17](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md) | Referência literal ao contrato |
| US-014 / RF10 | Receber avisos de mudanças no plantão | NÃO HÁ U-xx EXCLUSIVO | [N01](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/SQ-02.md): SQ-02, aceite de troca e notificação; evento automático |
| US-015 / RF11 | Registrar ocorrência no diário | [UC-03 U-22](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-016 / RF12 | Consultar histórico | [UC-03 U-23](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-017 / RF14 | Cadastrar medicamento | [UC-03 U-24](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-018 / RF15 | Registrar posologia/horários | [UC-03 U-25](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-019 / RF16 | Registrar administração de medicamento | [UC-03 U-26](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-020 / RF17 | Receber lembrete obrigatório | NÃO HÁ U-xx EXCLUSIVO | [N02](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md): destinatário designado e elegível no horário; evento automático |
| US-021 / RF18 | Registrar sintoma/intercorrência | [UC-03 U-28](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-022 / RF19 | Registrar consulta/recomendação | [UC-03 U-29](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-023 / RF20 | Registrar compromisso | [UC-02 U-19](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md) | Referência literal ao contrato |
| US-024 / RF21 | Criar/atribuir tarefa | [UC-02 U-20](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md) | Referência literal ao contrato |
| US-025 / RF21 | Concluir tarefa | [UC-02 U-21](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-B-organizacao/UC-02.md) | Referência literal ao contrato |
| US-026 / RF22 | Manter contatos importantes | [UC-01 U-09](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md) | Referência literal ao contrato |
| US-027 / RF23 | Anexar documento/imagem | [UC-03 U-30](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-028 / RF24 | Consultar informações de emergência | [UC-01 U-10](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md) | Referência literal ao contrato |
| US-029 / RF25 | Receber notificação de cuidado realizado | NÃO HÁ U-xx EXCLUSIVO | [N03](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/SQ-03.md): consequência de administração confirmada, não objetivo iniciado pelo destinatário |
| US-030 / RF26 | Receber alerta de atraso após 15 min | NÃO HÁ U-xx EXCLUSIVO | [N04](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md): ocorrência programada sem registro em H+15 não comprova omissão; evento automático |
| US-031 / RF27 | Configurar notificações opcionais | [UC-03 U-33](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-032 / RF28 | Exportar históricos CSV | [UC-03 U-34](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-033 / RF29 | Consultar log de auditoria | [UC-03 U-35](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-034 / RNF02 | Corrigir registro sem apagar original | [UC-03 U-36](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | Referência literal ao contrato |
| US-035 / RNF01 | Bloquear e registrar acesso não autorizado | NÃO HÁ U-xx EXCLUSIVO | [RNF01/RNF03](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/SQ-01.md): acesso negado e auditoria técnica, M05–M07 do SQ-01 |
| US-036 / RF30 | Acessar informações do próprio cuidado | [UC-01 U-02](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md); [UC-01 U-10](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md); [UC-01 U-11](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md); [UC-03 U-23](https://github.com/webkauadev/rede-de-apoio/blob/main/docs/uml/especificacao-para-figma/dominio-C-registros/UC-03.md) | US referenciada por mais de um objetivo U-xx; não contar como requisito duplicado |

## Resultado e limites
- **36/36** US no registry; **31** com referências U-xx literais; **5** tratadas como efeitos N01–N04 ou RNF01/RNF03, com fontes explícitas.
- **US-007** aparece em U-07 e U-08 (gestão de papéis versus transferência do Principal).
- **US-036** aparece em U-02, U-10, U-11, U-23: autenticação não é autorização automática; consulta própria continua read-only.
- **US-014, 020, 029, 030:** notificações são efeitos de sistema; não criar casos U-xx fictícios.
- **US-035:** negar/auditar é política transversal em SQ-01, distinto de U-35 Consultar Auditoria (US-033).
- **Próxima etapa:** comprovar separadamente as relações UC→classes/dados e a navegação das telas. Os valores candidatos na [matriz de 36 US](MATRIZ-36-US.md) não são promovidos a PASS automaticamente.
