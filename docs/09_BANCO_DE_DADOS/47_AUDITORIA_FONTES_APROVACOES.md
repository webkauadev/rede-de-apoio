# 47 — Auditoria cruzada das fontes oficiais e critérios aprovados

**Data da conferência:** 2026-10-09. **Status:** auditoria documental baseada em leitura direta da `main`, Issues e comentários de aceite no GitHub. Este arquivo relata **o que está nas fontes**, não homologa nova regra. Revisão referente ao PR #115, ainda draft. Nenhum banco de dados foi executado.

## 1. Hierarquia real dos critérios de aceite — achado A-C01

Em 2026-09-15, a pendência **P01/#73 foi encerrada como RESOLVIDA**. A fonte principal dos critérios de US-001–US-036 é a aprovação registrada em `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml` (metadados com 36 US e os IDs dos comentários), combinada com os **comentários de aprovação nas Issues**. O conteúdo textual aprovado é o snapshot em `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA_DRAFT.yaml` identificado pelo commit `8cdb03f10f69e1578010451a501381a935219c1b` e promovido em 2026-09-15.

**Descompasso confirmado:** alguns **corpos** das Issues originais ainda dizem “O Guia Mestre não fornece checklist individual desta US”, embora os comentários seguintes na **mesma Issue** contenham o critério expressamente aprovado. Isso é **texto histórico no corpo**, não prova de ausência de critérios, nem autorização para reescrever seus critérios.

### Amostra rastreada diretamente por GET nas Issues e comentários

| US / Issue | Comentário aprovado | Alcance efetivo do critério (resumo sem expansão) |
|---|---|---|
| US-003 / [#39](https://github.com/webkauadev/rede-de-apoio/issues/39) | `5673834995` | Principal cadastra Pessoa Idosa T12, perfil representa contexto de rede ao qual será vinculado, manter Principal único |
| US-005 / [#41](https://github.com/webkauadev/rede-de-apoio/issues/41) | `5673836678` | Principal vincula membro T13, restrições de categoria/papéis e Principal único |
| US-006 / [#42](https://github.com/webkauadev/rede-de-apoio/issues/42) | `5673837538` | desvínculo tira acesso futuro, preserva ações/registros anteriores |
| US-007 / [#43](https://github.com/webkauadev/rede-de-apoio/issues/43) | `5673838448` | papéis acumulados, união positiva, Principal único e transferência atômica |
| US-011 / [#47](https://github.com/webkauadev/rede-de-apoio/issues/47) | `5673842203` | atribuir responsável a intervalo; Plantonista Atual temporário; profissional mantém categoria |
| US-013 / [#49](https://github.com/webkauadev/rede-de-apoio/issues/49) | `5673844056` | aceitar/refusar solicitação; aceita muda escala, recusada não muda |
| US-020 / [#56](https://github.com/webkauadev/rede-de-apoio/issues/56) | `5673850618` | N02 no previsto, somente Plantonista Atual, obrigatório, navegação T05 |
| US-025 / [#61](https://github.com/webkauadev/rede-de-apoio/issues/61) | `5673856095` | responsável conclui tarefa e atualiza estado/histórico |
| US-036 / [#72](https://github.com/webkauadev/rede-de-apoio/issues/72) | `5673868957` | conta própria da Pessoa Idosa, T03–T15 read-only, sem T16/T17, sem editar/exportar |

A amostra não autoriza dizer que 36 corpos de Issues estão desatualizados: **foram lidos especificamente os nove exemplos acima**. Todos os nove tiveram comentário de aprovação identificado. A aprovação global de 36/36 é sustentada por P01/#73 e `ACCEPTANCE_CRITERIA.yaml`.

**Como usar a fonte:** resolver US via `USER_STORIES_INDEX.yaml` → Issue → comentário aprovado pelo `comment_id` no arquivo `ACCEPTANCE_CRITERIA.yaml` → critério textual do snapshot aprovado; em caso de divergência futura, parar e registrar conflito, não “corrigir” critérios por conta própria.

## 2. Achados sobre o modelo de dados (A-C02 a A-C08)

| Achado | Fonte aprovada efetivamente observada | Limite: o que NÃO está decidido |
|---|---|---|
| **A-C02 — cadastro e primeira rede** | US-003/#39: perfil passa a ser contexto de cuidado ao qual rede **será vinculada**. RN-001 exige Principal, RN-004 Profissional. | não está decidido se cria D03 na mesma ação, rede em configuração, transação conjunta, nem quem concede primeiro Principal — DB-002 |
| **A-C03 — número de redes** | RF03/#7: perfil da Pessoa Idosa **vinculado à rede**; RF04/#8: membros **da rede** | nenhuma fonte consultada define no máximo 1 rede histórica, 1 operacional ou N simultâneas — DB-001 |
| **A-C04 — plantões sobrepostos** | RN-003 define Plantonista Atual como condição por intervalo; US-011/#47 refere responsável por um plantão | DEC-S01 **do solicitante** autoriza plantões distintos simultâneos no PR; as Issues da `main` ainda precisam `migration_required` antes de tratar como fonte canônica |
| **A-C05 — aviso N02** | RF17/#21, US-020/#56 e N02 dizem “somente o usuário” Plantonista Atual | não especificam selecionar qual com **dois ou mais** plantonistas simultâneos; DB-030 continua PENDENTE; não inventar destinatário |
| **A-C06 — conclusão tarefa** | RF21/#25 e US-025/#61: **usuário responsável** conclui, atualiza histórico | não autorizam cuidador qualquer concluir tarefa alheia; DEC-S03 aprovou efeito único por tarefa/ciclo no PR; reabertura ainda DB-007 |
| **A-C07 — histórico de desvínculo** | US-006/#42: tira acesso futuro e preserva histórico | não define reingresso com novo membro/episódio nem reparação de plantão/tarefa futura — DB-003/027/028 |
| **A-C08 — separação de autorizações** | RN-002/004/009/010; US-036/#72 | ser titular read-only não confere vínculo Familiar; categoria Profissional não aceita papéis familiares; FK não prova permissão atual |

## 3. Condições e intensidade dos achados

- **ALTO / exige decisão funcional:** A-C02, A-C03 e A-C05 bloqueiam partes do modelo lógico ou N02. Não são bugs provados do protótipo e não se deve alterar RF/US por inferência.
- **ALTO / proteção da semântica:** A-C06 e A-C07 devem permanecer como restrições de contexto durante todo teste futuro. Um botão desabilitado não basta como prova de autorização.
- **MÉDIO / documentação:** A-C01 é dívida de legibilidade de Issues, **não** pendência P01 reaberta. Não reabrir #73 nem republicar comentários duplicados.
- **CONTROLE DE MUDANÇA:** A-C04 (DEC-S01) precisa atualização de origem se alterou comportamento, mantendo o PR #115 em draft. O desenvolvimento arquitetural não substitui revisão humana e aprovação de critérios alterados.

## 4. Fontes e verificação executada

- `main`: `docs/01_REQUIREMENTS/{REQUIREMENTS_INDEX,USER_STORIES_INDEX,ACCEPTANCE_CRITERIA,ACCEPTANCE_CRITERIA_DRAFT}.yaml`; `docs/02_BUSINESS_RULES/{BUSINESS_RULES,NOTIFICATIONS_RULES,USERS_AND_ROLES,PERMISSIONS_MATRIX}.md`; `docs/01_REQUIREMENTS/PENDENCIAS_DOCUMENTAIS.md`; `docs/07_AI_CONTEXT/CURRENT_PROJECT_STATE.md`.
- Issues verificadas individualmente: RF03/#7, RF04/#8, RF05/#9, RF08/#12, RF09/#13, RF17/#21, RF21/#25; US-003/#39, US-005/#41, US-006/#42, US-007/#43, US-011/#47, US-013/#49, US-020/#56, US-025/#61, US-036/#72; P01/#73.
- Comentários aprovados recuperados via `/issues/{n}/comments` para os nove exemplos. **Não foram alteradas nenhuma Issue, comentário, regra funcional ou `main`.**

**Resultado da auditoria:** critérios de aceite de P01 permanecem canônicos; pendências arquiteturais DB-001/002/030 continuam sem aprovação; as recomendações dos documentos 41–45 não têm autoridade funcional própria.
