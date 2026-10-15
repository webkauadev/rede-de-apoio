# Contextualização UML — Rede de Apoio a Cuidadores de Idosos

Data de referência: 2026-10-15. Autoridade: `REQUIREMENTS_INDEX.yaml` (2026-09-14), `USER_STORIES_INDEX.yaml` e `ACCEPTANCE_CRITERIA.yaml` (2026-09-15), regras de negócio e decisões V1 homologadas (2026-10-09). A UI é evidência de tela; não cria comportamento fora dessas fontes.

## Escopo confirmado

O sistema possui autenticação/cadastro; perfil da Pessoa Idosa e rede de cuidado; membros e papéis; agenda/plantões/trocas; diário e histórico; medicamentos/posologia/administração; sintomas, consultas, compromissos e tarefas; contatos/emergência/anexos; notificações transitórias; CSV e auditoria. A cadeia RF/RNF→US→tela está em `docs/03_INFORMATION_ARCHITECTURE/TRACEABILITY_MATRIX.md`; o site map enumera T01–T17.

## Atores candidatos para casos de uso

São candidatos, não uma generalização UML já decidida: usuário autorizado/cadastrado, Familiar Principal, Familiar de Apoio/Emergência conforme condição, Profissional da Saúde, Pessoa Idosa, membro vinculado/afetado, e serviço técnico de notificação quando houver interação externa relevante. **Plantonista Atual é condição temporal, não ator/perfil**. A generalização entre categorias só será usada se a herança integral de casos for demonstrada (diretriz do slide 14).

## Conceitos de domínio e processos candidatos

| Recorte | Conceitos candidatos | Processos/ciclos candidatos |
|---|---|---|
| Identidade/rede | Conta/Usuário, Pessoa Idosa, Rede de Cuidado, Membro, papel familiar, vínculo | cadastro, constituição de rede, vínculo/desvínculo, transferência de Principal |
| Agenda | Plantão, responsável, solicitação/histórico de troca, tarefa, conclusão, compromisso | planejar/alterar/cancelar plantão; solicitar/responder troca; atribuir/concluir tarefa |
| Cuidado/saúde | Registro de Cuidado, Medicamento, Regime/Horário, Ocorrência Programada, Administração, Consulta, Recomendação, Anexo | registrar ocorrência, programar e administrar medicamento, registrar consulta/recomendação e anexar |
| Suporte/controle | Contato Importante, Informação de Emergência, Preferência, entrega técnica de notificação, Auditoria, exportação | consultar emergência, configurar preferências, emitir notificações, exportar, auditar |

As classes finais devem representar o vocabulário do domínio, não a lista de tabelas. Campos técnicos, outbox e idempotência podem surgir em sequência/projeto ou EER quando necessários, mas não são automaticamente classes de domínio.

## Persistência existente

Há documentação conceitual em `docs/09_BANCO_DE_DADOS/`, decisões V1 em `docs/10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md`, SQL MySQL em `database/mysql/` e pacote de entrega EER em `docs/11_ENTREGA_SQL_EER/`. A V1 homologou MySQL 8.4/InnoDB e um modelo físico que separa planejamento, fato de execução, correções, auditoria e outbox técnica. O SQL e o EER não substituem RF/US, nem todas as tabelas devem ser classes UML.

Entidades persistentes candidatas incluem usuário, pessoa idosa, rede, membro/vínculo, atribuição de papel, plantão/troca/histórico, tarefa/conclusão, medicamento/regime/horário/ocorrência/administração, registro/consulta/recomendação/correções/anexo, contato, emergência, preferências, auditoria e estruturas técnicas de notificação/sessão/idempotência. PK/FK, nulidade e restrições devem ser obtidas do SQL V1 e do dicionário vigente na etapa de EER, não inferidas deste plano.

## Máquinas de estado que merecem avaliação

Não são diagramas criados nem obrigação confirmada. Há evidência para investigar ciclo de vida de Plantão (criar/alterar/cancelar), solicitação de troca (solicitar/aceitar/recusar), tarefa (uma conclusão, sem reabertura V1), ocorrência programada/alerta e registros corrigidos. A modelagem deve separar estado de domínio de estado visual e só desenhar transições documentadas.

## Conflitos, versões e pendências

| Tema | Situação e fonte prioritária | Impacto |
|---|---|---|
| M2 versus ES-04 | Aula: M2/M3 indica quatro grupos de entrega (slide 6); ES-04 é individual (slide 60). Não há enunciado coletivo M2 local. | Confirmar quantidade/formato dos diagramas antes da entrega. |
| Atividades/estados | “atividades/estados” no slide 6; slides 47–51 tornam estados condicionais a ciclo de vida. | Planejar ambos como candidatos; não afirmar que ambos são universalmente obrigatórios. |
| Estado de BD histórico | Vários arquivos em `docs/09` conservam avisos históricos de decisão pendente/não execução; AGENTS e decisões V1 posteriores ratificam escolhas e evidências mais recentes. | Citar a data e priorizar V1/SQL de entrega; não usar texto histórico como decisão atual. |
| Evidência SQL/EER | `database/mysql/README.md` contém histórico de 30/31/34 tabelas; `docs/11_ENTREGA_SQL_EER/README.md` é o pacote vigente de 34 tabelas. | Para DER, validar o artefato consolidado e a data antes de declarar contagem. |
| Requisitos ausentes | Não foi localizado no repositório o enunciado oficial completo da Milestone 2 além dos slides. | `migration_required`: anexar/linkar enunciado oficial se houver exigência adicional. |
