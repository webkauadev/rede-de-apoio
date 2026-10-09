# 40 — Diagramas de duas alternativas para Pessoa Idosa ↔ Rede

**PROPOSTAS VISUAIS SEM DDL.** Ambos preservam a mesma arquitetura de identidade, rede, plantões simultâneos, tarefas e histórico. A **única alteração proposital** entre A e B é a cardinalidade de Pessoa Idosa→Rede, ainda pendente DB-001. Não tomar os desenhos como uma decisão já homologada.

## Variante A — uma rede por Pessoa Idosa (DB-001 ainda aberta)

**Hipótese:** cada Pessoa Idosa possui no máximo uma Rede de Cuidado. Poderia existir perfil idoso inicialmente sem rede durante bootstrap. **Implicaria** unicidade de `rede_cuidado.pessoa_idosa_id` na futura fase lógica/física, se a hipótese for aprovada. Não é fato atualmente canônico.

~~~mermaid
erDiagram
  USUARIO ||--o{ MEMBRO_REDE : participa
  USUARIO o|--o| PESSOA_IDOSA : conta_titular_opcional
  PESSOA_IDOSA ||--o| REDE_CUIDADO : hipotese_uma_rede
  REDE_CUIDADO ||--o{ MEMBRO_REDE : contem
  MEMBRO_REDE ||--o{ ATRIBUICAO_PAPEL_FAMILIAR : acumula_se_familiar
  REDE_CUIDADO ||--o{ PLANTAO : programa
  MEMBRO_REDE ||--o{ PLANTAO : responsavel
  PLANTAO ||--o{ SOLICITACAO_TROCA : recebe
  REDE_CUIDADO ||--o{ TAREFA : organiza
  MEMBRO_REDE ||--o{ TAREFA : atribuido_se_houver
  TAREFA ||--o{ CONCLUSAO_TAREFA : ate_uma_por_ciclo
  PESSOA_IDOSA ||--o{ MEDICAMENTO : utiliza
  MEDICAMENTO ||--o{ REGIME_MEDICAMENTO : possui
  REGIME_MEDICAMENTO ||--o{ HORARIO_REGIME : define
  REGIME_MEDICAMENTO ||--o{ ADMINISTRACAO_MEDICAMENTO : historico
  PESSOA_IDOSA ||--o{ REGISTRO_CUIDADO : historico
  REGISTRO_CUIDADO ||--o{ CORRECAO_REGISTRO : revisado_por
~~~

## Variante B — múltiplas redes por Pessoa Idosa (DB-001 ainda aberta)

**Hipótese:** uma Pessoa Idosa pode possuir várias redes diferentes. A aplicação precisaria identificar o contexto de rede a cada autorização, consulta, registro, plantão e histórico, para não duplicar/confundir cuidado. **Implicaria** não definir unicidade em `rede_cuidado.pessoa_idosa_id`. A fonte RF03/RF04 atual não determina esta possibilidade.

~~~mermaid
erDiagram
  USUARIO ||--o{ MEMBRO_REDE : participa
  USUARIO o|--o| PESSOA_IDOSA : conta_titular_opcional
  PESSOA_IDOSA ||--o{ REDE_CUIDADO : hipotese_varias_redes
  REDE_CUIDADO ||--o{ MEMBRO_REDE : contem
  MEMBRO_REDE ||--o{ ATRIBUICAO_PAPEL_FAMILIAR : acumula_se_familiar
  REDE_CUIDADO ||--o{ PLANTAO : programa
  MEMBRO_REDE ||--o{ PLANTAO : responsavel
  PLANTAO ||--o{ SOLICITACAO_TROCA : recebe
  REDE_CUIDADO ||--o{ TAREFA : organiza
  MEMBRO_REDE ||--o{ TAREFA : atribuido_se_houver
  TAREFA ||--o{ CONCLUSAO_TAREFA : ate_uma_por_ciclo
  PESSOA_IDOSA ||--o{ MEDICAMENTO : utiliza
  MEDICAMENTO ||--o{ REGIME_MEDICAMENTO : possui
  REGIME_MEDICAMENTO ||--o{ HORARIO_REGIME : define
  REGIME_MEDICAMENTO ||--o{ ADMINISTRACAO_MEDICAMENTO : historico
  PESSOA_IDOSA ||--o{ REGISTRO_CUIDADO : historico
  REGISTRO_CUIDADO ||--o{ CORRECAO_REGISTRO : revisado_por
~~~

## Legenda e restrições **não visíveis** nestes diagramas

- As relações sem atributos servem apenas para **navegação conceitual**; não definem nomes reais de tabelas nem PK/FK final.
- A ligação `MEMBRO_REDE → ATRIBUICAO_PAPEL_FAMILIAR` só é válida para categoria Familiar; FK simples não garante isso: DB-026.
- `MEMBRO_REDE → TAREFA` é opcional em tarefa sem responsável; a entidade de conclusão precisa verificar responsável real, RN-010 e US-025.
- `TAREFA → CONCLUSAO_TAREFA` 1:N é **histórico de ciclos possível**, **não** autorização de duas conclusões no mesmo ciclo. DEC-S03 impõe 0..1 conclusão por (tarefa,ciclo).
- `REDE_CUIDADO → PLANTAO` 1:N **não representa exclusão de horários**. P1 e P2 podem coincidir por DEC-S01; por instante há 0..N Plantonistas Atuais.
- A cardinalidade `USUARIO ↔ PESSOA_IDOSA` é simplificação provisória; identidade híbrida DB-025 permanece aberta.
- A possibilidade de múltiplas redes afeta como o medicamento, regime e registro de cuidado devem guardar/isolar contexto. Não decidir sem DB-001.
- O desenho não contém uma entidade definitiva de ocorrência programada, inbox ou envelope universal de registro; continuam DB-008/029/034.
- São **projeções de alternativas**, não um DER físico, normalização aprovada, especificação clínica ou migrations.

## Verificação futura

Confrontar A/B com T12/T13 e RF03–RF05; verificar caso de mesmo Profissional em duas redes; validar que o mesmo usuário nunca ganha acesso cruzado por participar de outra rede; homologar uma variante no registro DB-001 com autor/data e testes de cardinalidade. Não executar SQL a partir deste arquivo.

Veja [37](37_MODELO_LOGICO_CANDIDATO_RELACIONAMENTOS.md), [38](38_DECISAO_N02_MULTIPLOS_PLANTONISTAS.md) e [39](39_GATES_E_PLANO_DE_PROVA_LOGICA.md).
