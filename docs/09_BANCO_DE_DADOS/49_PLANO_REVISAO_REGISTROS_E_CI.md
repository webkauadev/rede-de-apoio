# 49 — Reconciliação canônica e procedimento de revisão do PR

**Status:** plano de atualização e controles de qualidade. Não foi executada alteração da `main`, de Issue ou de critérios. O projeto aprovou P01/#73 em 2026-09-15; a documentação de banco nesta branch está em draft no PR #115.

## 1. Não reabrir nem substituir critérios aprovados por texto histórico

- `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml` é **registro canônico da aprovação**, com `issue_promotion` e `comment_id`; **não contém a lista completa dos textos dos 36 critérios**.
- Os textos estão nos **comentários aprovados das Issues**, com snapshot textual aprovado em `ACCEPTANCE_CRITERIA_DRAFT.yaml` (`criteria_source_snapshot.source_commit`).
- O YAML chamado `DRAFT` ainda contém `status: pending_human_review` por ser **arquivo histórico**; essa etiqueta antiga **não revoga P01/#73**.
- O corpo antigo de US-003/#39 e US-005/#41, por exemplo, ainda traz instrução do Guia Mestre sem checklist, mas seus comentários `5673834995` e `5673836678` contêm critérios aprovados.
- Quando consultar a US, seguir `USER_STORIES_INDEX.yaml` → Issue → `ACCEPTANCE_CRITERIA.yaml.issue_promotion[US]` → comentário aprovado → snapshot. Se houver divergência futura entre critérios publicados e snapshot, **registrar conflito** e solicitar resolução humana.
- Não criar comentários duplicados, não reescrever corpos de Issues sem autorização e não alterar o arquivo de critérios na branch apenas para alinhar título ou status histórico.

## 2. Trilha de mudanças do PR #115 após decisões humanas

| Evento autorizado | Registro a modificar | Não modificar sem razão |
|---|---|---|
| Aprovar A1/A2/B para DB-001 | ADR e originador RF03/US-003 se muda comportamento; depois modelo e registries afetados | tipo/fuso de medicação ou acesso entre redes por inferência |
| Aprovar B1/B2/B3 para DB-002 | US-003 e US-005, regras RN-001/RN-004 se exceção formal, T12/T13 quando afetados | conceder papel Principal a quem apenas criou conta |
| Aprovar política N02 DB-030 | RF17/#21, US-020/#56, `NOTIFICATIONS_RULES.md` e critério correspondente | criar Central de Notificações ou destinatário Principal automático |
| Reconciliar DEC-S01/03 | RF06/08/09/21, US-008/011/012/013/025 e critérios se novo comportamento | abrir novas US sem necessidade ou alterar status histórico sem decisão |
| Homologar reingresso DB-003/027 | RF04/US-005/006, entidade de vínculo e contrato de auditoria | apagar autoria anterior ou restaurar acesso automaticamente |
| Homologar entrega de notificações DB-014 | infraestrutura interna técnica conforme critério N01–N04 | criar inbox histórica do usuário |

## 3. Prova documental de qualidade exigida no review

1. Revalidar no commit final todos os links relativos do índice e dos documentos novos.
2. Confirmar a presença e integridade da numeração `DB-001–DB-038` e marcar **status atualizado**, sem interpretar anexos históricos como novas ADRs.
3. Confirmar que a enumeração de casos de mesa permanece completa e que testes condicionais de alternativas são expressamente rotulados como **não aprovados**.
4. Comparar textos RF/US alterados (caso existam) com comentários de critérios aprovados; não substituir criterios de P01 sem deliberação.
5. Rodar `python scripts/validate_agent_context.py` com o repositório completo conforme `AGENTS.md`; **não está registrado como executado nesta rodada**.
6. Inspecionar diff e documentação em PR #115, status draft, CI e aprovações requeridas; merge **somente após aprovação humana explícita**.
7. Caso haja conflito entre a `main` atual e esta branch, realizar atualização/rebase somente com verificação cuidadosa de registros e sem force-push não solicitado.

## 4. Gates por tipo de resultado

- **Documental:** os links, ids, fontes e linguagem `CONFIRMADO/PROPOSTA/PENDENTE/migration_required` podem ser auditados agora.
- **Funcional:** deliberação humana e reconciliação de RF/US/aceite; não pode ser simulada por asserções em memória.
- **Lógico:** entidades, FKs e cardinalidades após decisões.
- **Físico:** somente em fase autorizada, com banco MySQL descartável, SQL, logs, 2 conexões para concorrência, privacidade e plano de reversão.

**Não apresentar "48 arquivos", "224 cenários" ou outro número histórico como prova de que G1 foi aprovado.** O volume de documentação não substitui decisão de cardinalidade ou comportamento.
