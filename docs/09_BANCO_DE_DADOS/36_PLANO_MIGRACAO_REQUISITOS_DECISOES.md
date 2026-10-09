# 36 — Plano de incorporação formal das decisões DEC-S01–DEC-S03

**Status: migration_required, não executado.** A palavra "aprovado" em [32](32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md) significa decisão expressa **pelo solicitante nesta conversa**, não aprovação/merge da alteração nas Issues/RF/US atuais. Segundo AGENTS.md, as Issues aprovadas e os documentos canônicos da `main` continuam prevalecendo até a revisão e atualização de origem.

## Proposta de mudanças mínimas, preservando escopo

| Decisão | Origem GitHub a revisar | Texto funcional proposto | Cuidado |
|---|---|---|---|
| DEC-S01: sobreposição | RF06 (#10) / US-008 (#44), RF08 (#12) / US-011 (#47) | "A escala admite plantões de membros distintos com intervalos coincidentes; Plantonista Atual é uma condição válida de cada participante no seu intervalo." | Não criar categoria de usuário; não impor um único plantonista por rede; não decidir múltiplos responsáveis por um único plantão |
| DEC-S03: mesma troca | RF09 (#13) / US-013 (#49) e US-012 (#48) | "A resposta a uma solicitação de troca é atômica. Duas alterações incompatíveis do mesmo plantão na mesma versão não podem ambas confirmar; uma recebe conflito e deve atualizar seu estado. Retry idempotente não duplica alteração." | Não determinar se troca unilateral ou permuta de dois plantões sem DB-006 |
| DEC-S03: tarefa | RF21 (#25) / US-025 (#61, confirmado em USER_STORIES_INDEX.yaml; verificar estado antes de editar) | "A mesma tarefa no mesmo ciclo não pode ter duas conclusões confirmadas por requisições concorrentes; uma só conclusão e seus eventos relacionados são preservados." | Reabertura e múltiplos responsáveis são DB-007 |
| DEC-S02: fatos distintos | RF15 (#19), RF16 (#20), RF26 (#30) e US correspondentes | "Programação prevista, execução registrada e sinalização de ausência de registro são fatos distintos, com instantes e identidades próprias." | Não afirmar omissão clínica, dose extra permitida ou prescrição automática |
| N02 com múltiplos plantonistas | RF17 (#21) / US-020 (#56); docs/02_BUSINESS_RULES/NOTIFICATIONS_RULES.md | **NÃO EDITAR AINDA:** escolher a política de destinatário para uma ocorrência quando >1 plantonista válido; registrar decisão DB-030 | Requisito hoje é singular: "somente o usuário ... Plantonista Atual". Não inferir “todos” ou “primeiro da consulta” |

## Checklist de validação institucional

1. Revisar e aprovar a formulação nas **Issues de origem** e critérios de aceitação correspondentes sem criar RF/US redundante.
2. Atualizar `docs/01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml`, `USER_STORIES_INDEX.yaml`, `ACCEPTANCE_CRITERIA.yaml` quando necessário para espelhar as Issues; preservar origem única de cada US.
3. Atualizar `docs/02_BUSINESS_RULES/BUSINESS_RULES.md`, `NOTIFICATIONS_RULES.md`, `docs/03_INFORMATION_ARCHITECTURE/SCREENS_CATALOG.md` e registries de design/estado se alguma reação real da UI mudar. Não alterar Figma apenas porque o banco permite sobreposição.
4. Manter rastreabilidade RF→US→condição/conflito→teste, inclusive 32 casos C-T e revalidação de L-T02/L-T12/L-T17.
5. Rodar o validador `python scripts/validate_agent_context.py` no repositório completo em ambiente adequado; este PR documental ainda **não** executou o validador.
6. Fazer revisão humana do PR. Só então promover a `main`; nenhuma migração SQL neste PR.

## Lacunas explicitamente não preenchidas

- Quem recebe N02 quando vários plantonistas têm condição atual em R1 e o cuidado não tem responsável escolhido.
- Se um único plantão possui 1 ou N responsáveis.
- Se tarefa pode ser reaberta num segundo ciclo ou ter N responsáveis.
- Se uma medicação pode ter múltiplas administrações clínicas legítimas numa mesma ocorrência; não é equivalente a retry duplicado.
- Quais limitações adicionais de privacidade, direitos e retenção recaem sobre os registros.

**Nota:** os números de issue exibidos são os conhecidos dos índices consultados nesta fase; antes de editar Issues conferir identificador e estado atual no registry do GitHub.


## Proveniência confirmada das fontes de aceite — revisão 2026-10-09

Antes de alterar a origem aprovada após uma nova decisão:
- conferir `docs/01_REQUIREMENTS/ACCEPTANCE_CRITERIA.yaml`, que relaciona comentário canônico por US; ler o comentário nas Issues e o snapshot do commit `8cdb03f10f69e1578010451a501381a935219c1b`;
- US-003/#39 tem comentário de aprovação `5673834995`, US-011/#47 `5673842203`, US-013/#49 `5673844056`, US-020/#56 `5673850618`, US-025/#61 `5673856095`; o corpo de algumas Issues permanece legado;
- P01/#73 está encerrada e não deve ser reaberta ao modificar regra específica; qualquer novo critério exige deliberação nova conforme a política do arquivo canônico;
- [47](47_AUDITORIA_FONTES_APROVACOES.md) registra a verificação; [48](48_GATE_G1_DECISOES_PARA_REVISAO_HUMANA.md) prepara a deliberação ainda necessária; [49](49_PLANO_REVISAO_REGISTROS_E_CI.md) define verificação de consistência depois de aprovação.

**Nenhuma Issue, comentário ou requisito foi editado nesta revisão de banco.**
