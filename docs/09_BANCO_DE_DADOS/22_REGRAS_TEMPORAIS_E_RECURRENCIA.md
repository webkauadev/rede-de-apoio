# 22 — Contrato temporal transversal: instantes, intervalos e recorrência

**Estado: proposta de arquitetura em revisão; NÃO constitui regra funcional nova.** Base canônica: RF06–RF10, RF15–RF17, RF20–RF21, RF26, RN-003/005/006/010, N01–N04. Relaciona-se às ADRs DB-005, DB-010, DB-011, DB-015, DB-021, DB-027 e novas DB-029–DB-033.

## T1. Três semânticas temporais que não podem ser fundidas

| Conceito | Significado | Exemplos | Representação candidata |
|---|---|---|---|
| Instante absoluto | Um acontecimento em um ponto da linha do tempo | ação gravada, início real, decisão de troca | instante UTC; origem do relógio confiável |
| Data civil + horário local | Intenção do usuário num calendário/fuso | tomar medicação às 08:00 em dias escolhidos | DATE/TIME + zona IANA e regra de repetição |
| Intervalo com início/fim | Período durante o qual uma condição vale | plantão, vínculo, regime de medicação | instantes com fronteiras definidas e comparação |

- Horário **previsto** não é prova de realização; **ocorrido_em** não é necessariamente igual a **registrado_em**, tampouco ao instante de recebimento no servidor.
- Proposta de guardar data/hora de auditoria proveniente do servidor, e hora alegada de execução separadamente.
- Evento de emissão de notificação não deve retroativamente alterar fato de cuidado.
- Armazenar zona como identificador IANA (ex. America/Sao_Paulo) é candidato técnico; requisito não define zona/região de implantação.

## T2. Fronteiras e igualdade

**Convenção proposta:** todos os intervalos são semiabertos [início,fim), validando início < fim. Nessa convenção, no instante exato do fim o plantão antigo termina e o seguinte pode começar sem dupla ocupação por simples contiguidade.

Para dois intervalos A=[a,b) e B=[c,d), sobreposição ocorre se a<d e c<b, independentemente da ordem de cadastro. Isso é **predicado**, não constraint MySQL já existente.

- [10:00,12:00) e [12:00,14:00) não se sobrepõem.
- [10:00,12:00) e [11:59,14:00) se sobrepõem.
- [10:00,12:00) e [10:00,12:00) se sobrepõem integralmente.
- Intervalos vazios e início>fim são inválidos.
- Plantonista Atual exige simultaneamente intervalo vigente, status de plantão ativo, vínculo elegível e escopo de rede correspondente.

**Crítico:** a regra canônica NÃO afirma se múltiplos plantonistas simultâneos são permitidos. O predicado de sobreposição só detecta coexistência; DB-005 deve definir o que fazer com ela. Se N02 pede “somente o usuário Plantonista Atual”, sobreposição sem decisão produz destinatário ambíguo.

## T3. Distinção entre tempo de negócio e tempo de gravação

Campos candidatos, sem imposição prematura de todos:
- previsto_para: instante da execução planejada, quando programação já materializada;
- executado_em: instante real declarado pelo autor autorizado;
- registrado_em: instante de persistência confirmado pelo servidor;
- alterado_em: mudança de planejamento, não reescrita de execução anterior;
- decidido_em: aceite/recusa de uma troca;
- zona_horaria e data/hora civil: quando necessários à recorrência;
- vigencia_inicio/fim: intervalo da versão de regime, do vínculo ou da regra.

Casos de cuidado inserido tardiamente (ex.: executar às 10:05, registrar às 10:45) exigem política de correção/alerta retrospectivo ainda não definida. Não usar o horário real alegado para ocultar uma notificação que já havia sido emitida às 10:15.

## T4. Recorrência não é um conjunto de instantes já executados

**Regra de repetição** = o plano (por exemplo dias da semana a 08:00), sujeito a vigência/alterações. **Ocorrência programada** = uma instância datada gerada pela regra (ex. dose de 09/out às 08:00). **Registro de execução** = fato de ação relativa a essa ocorrência, se ocorrer.

Alternativas propostas:
A. gerar ocorrências virtualmente em consultas a uma regra; guardar apenas execução real;
B. materializar uma janela curta de ocorrências com PK e chave natural de deduplicação;
C. abordagem híbrida: materializar somente ocorrências com pendência/lembrete/execução.

Não considerar C04 ocorrencia_programada uma tabela aprovada: DB-021/DB-029. Cada alternativa deve preservar a identidade de uma ocorrência quando a regra é atualizada e impedir que o mesmo agendamento seja alertado duas vezes.

## T5. Fuso, horário de verão e ambiguidades

- UTC é uma escolha de representação para **instantes**, não substitui a zona da intenção de “08:00 todo dia” no calendário.
- Em alguns fusos, horário local pode não existir durante avanço de relógio ou ocorrer duas vezes quando o relógio recua. Antes do DDL, definir política explícita: pular/reagendar instantes inexistentes? Qual das duas ocorrências repetir? Registrar escolha e versão da zona.
- Hora local e instante UTC **não** são intercambiáveis sem zona/data. Datas civis devem ser calculadas no calendário do idoso/rede aprovado, não fuso do servidor por acaso.
- Não confiar em NOW() para índice gerado ou unicidade determinística; “ativo agora” é consulta temporal, com instante avaliado.
- O suporte a zonas nomeadas e comportamento da sessão em MySQL exige configuração/atualização de tabelas de zona e testes de conversão.

## T6. Tipos e relógio (candidatos, não fixados)

- DATETIME(6) com acordo de aplicação “UTC” ou TIMESTAMP com cuidados de faixa/sessão; escolher e testar na versão MySQL concreta.
- DATE para datas civis; TIME para hora do dia sem assumir timezone implícito.
- Precision de tempo e igualdade de fronteira devem ser consistentes entre app, API, banco e fila.
- Relógio de autoridade: servidor confiável; clientes podem indicar executado_em mas não decidir unilateralmente N02/N04 ou permissão temporal.
- Planejamento e consulta devem validar inclusive horários ao virar o dia.

## T7. Invariantes de aceite para modelagem futura

1. Sem duplicação de ocorrência idêntica na mesma versão da regra, de acordo com uma chave revisada.
2. Mudança de regime/plantão não muda o passado confirmado nem uma execução anterior.
3. Resolver Plantonista Atual no instante exigido e escopo de rede, não por texto global.
4. Evitar notificações falsas de sintomas espontâneos.
5. Ausência de registro significa só ausência de informação no sistema, não prova de omissão.
6. Devolver estado indeterminado ou rejeitar operação quando houver zero/múltiplos responsáveis sem política de negócio, ao invés de inventar destinatário.

## Referências MySQL

- Tipos DATE/TIME/DATETIME/TIMESTAMP: https://dev.mysql.com/doc/refman/8.4/en/date-and-time-types.html
- Configuração de zonas e tabelas IANA: https://dev.mysql.com/doc/refman/8.4/en/time-zone-support.html
- Event Scheduler (repetição e concorrência possível): https://dev.mysql.com/doc/refman/8.4/en/events-overview.html
- Limites de CHECK (NOW() não determinístico): https://dev.mysql.com/doc/refman/8.4/en/create-table-check-constraints.html

Os links explicam capacidades técnicas; o GitHub do produto continua sendo a autoridade funcional.


## Decisão DEC-S01 posterior: sobreposição é permitida

Em 2026-10-09, o solicitante aprovou que plantões possam se sobrepor, portanto a DB-005 está fechada nesse aspecto e a cardinalidade do conjunto de Plantonistas Atuais por rede/instante pode ser 0..N, **não** 0..1. O predicado matemático do item T2 identifica intervalos coincidentes, não é regra de exclusão. **Sobreposição não equivale a comando concorrente conflitante.**

A conta read-only da Pessoa Idosa ainda não pode ser Plantonista Atual. O vínculo e categoria devem ser válidos para cada plantonista. A decisão **não** homologou o que fazer quando N02 encontra vários plantonistas (DB-030). Ver [32](32_DECISOES_SOLICITANTE_PLANTOES_CONCORRENCIA.md)–[34](34_CASOS_PLANTOES_SIMULTANEOS_CONFLITOS.md).
