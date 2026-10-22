# Modelagem geral — entrega final aos professores

**Projeto:** Rede de Apoio a Cuidadores de Idosos  
**Status:** produção visual em andamento; **não homologado academicamente**  
**Ambiente:** Figma oficial, página separada [Modelagem Geral — Entrega Final](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6430-3326).  
**Política de proteção:** não modificar os 19 diagramas originais da Milestone 2, a página de apresentação final, o SQL V1 ou o modelo `.mwb` nativo.

## Proposta de escopo

Criar uma perspectiva **integrada e seletiva** de cada família de diagrama já adotada na Milestone 2, acrescida de **atividades** conforme aulas e objetivos pedagógicos:

| ID | Artefato | Situação em Figma | Link |
|---|---|---|---|
| AT-G | Atividades da jornada principal | Criado; revisão técnica e acadêmica pendente | [6431:3326](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6431-3326) |
| UC-G | Casos de uso essenciais, visão sistêmica | Criado; revisão técnica e acadêmica pendente | [6432:3326](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6432-3326) |
| SQ-G | Sequência de consulta e registro do cuidado | Criado; revisão de semântica/assinaturas pendente | [6433:3326](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6433-3326) |
| CL-G | Classes centrais do domínio | Planejado | — |
| DB-G | Projeção física seletiva do caminho crítico | Planejado | — |
| EER-G | EER físico integral | **Reutilizar existente**; nenhuma nova fonte de banco | [SVG geral](../../../entrega/sql-eer/diagrama_geral.svg) |

Os 19 artefatos originais permanecem referências de detalhamento, não são apagados, copiados como se fossem novos, nem contam duplamente. O EER geral é anterior a esta iniciativa e **não deve ser redesenhado com cardinalidades inferidas**.

## Fontes canônicas e hierarquia

1. [Diretrizes do professor](../diretrizes-professor.md), [contextualização UML](../contextualizacao-projeto.md), [especificações A/B/C](../especificacao-para-figma/README.md).
2. [Requisitos e US](../../01_REQUIREMENTS/REQUIREMENTS_INDEX.yaml), [regras de negócio](../../02_BUSINESS_RULES/BUSINESS_RULES.md), [matriz de permissões](../../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md), [decisões V1](../../10_IMPLEMENTACAO/DECISOES_V1_HOMOLOGADAS.md).
3. [SQL V1](../../../entrega/sql-eer/01_schema_completo_v1.sql), [modelo MWB](../../../entrega/sql-eer/rede_de_apoio_v1.mwb) e [relatório de reabertura nativa](../../../entrega/sql-eer/RELATORIO_WORKBENCH_NATIVO.md).
4. [Índice da Milestone 2](../implementacao-figma/INDICE-APRESENTACAO-MILESTONE-2.md), [correções](../auditoria-final/STATUS-CORRECOES-M2.md).

## AT-G — atividades da jornada principal

**Partições:** Familiar Iniciador/Principal (observar distinção temporal do bootstrap), Sistema/Serviços e Responsável Autorizado.  
**Percurso principal:** cadastrar perfil pendente → verificar pré-requisitos mínimos → constituir rede em transação com Principal e Profissional → planejar plantões/tarefas/regime → gerar programação conforme regras → consultar dia e realizar cuidado → verificar permissão efetiva → registrar fato → persistir original imutável/autoria/data-hora → acompanhar histórico → corrigir via nova versão somente quando necessário.

**Decisões:** D01 (mínimos de constituição), D02 (permissão e contexto), D03 (correção necessária). **Saídas alternativas:** perfil pendente sem acesso ao cuidado; operação negada e auditada; encerramento sem correção.  
**Nota de escopo:** o evento N02 é direcionado somente a responsável designado elegível no instante previsto; N04 em H+15 sem registro confirmado **não demonstra omissão clínica**. Notificações não são objetivos de ator.

**Ajuste semântico recomendado:** chamar a primeira partição de `Familiar Iniciador / Principal`, pois no bootstrap ainda não existe o papel Principal persistido.

## UC-G — visão de casos de uso (recorte de apresentação)

**Atores:** Familiar Principal, Usuário com Permissão Efetiva, Profissional da Saúde, Pessoa Idosa.  
**Casos desenhados:** 16 objetivos essenciais em quatro linhas visuais (4 por papel). Os casos são **recortes** de UC-01/02/03, não uma substituição da cobertura integral RF/US; associações permanecem condicionadas à matriz de permissões e ao recurso.

- Familiar Principal: cadastrar/manter perfil; constituir/gerir rede; gerenciar plantões; exportar histórico CSV.
- Usuário com Permissão Efetiva: consultar calendário; criar/atribuir tarefa; registrar cuidado; corrigir registro.
- Profissional: cadastrar medicamento; registrar administração; registrar consulta; anexar documento (somente no domínio autorizado).
- Pessoa Idosa: consultar próprio perfil; consultar próprio cuidado; consultar histórico; consultar emergência (somente leitura).

**Notação:** atores externos, casos elípticos dentro de uma fronteira única, associações contínuas. Não foram fabricados `include`, `extend`, generalização de ator nem ator “Plantonista Atual”. A visualização é seletiva: outros atores também podem executar determinados casos quando sua permissão contextual permitir, sem afirmar exclusividade dos casos exibidos.

## SQ-G — consulta e registro de administração (cenário integrado)

**Pré-condição:** rede operacional, identidade e leitura de agenda autorizadas.  
**Participantes:** Responsável autorizado; Interface de Cuidados; Serviço de Agenda; Autorização Contextual; Serviço de Administração; AdministraçãoMedicamento; Serviço de Auditoria. Serviços explicitam responsabilidades **arquiteturais inferidas**, não classes de domínio nem tabelas SQL criadas.

**Mensagens M01–M15 (ordem visual):**
1. abrirDetalhamento(data), 2. obterDia(rede,data), 3. verificarLeitura(contexto), 4. acessoPermitido, 5. programaçãoAutorizada, 6. exibirCuidadosDoDia, 7. informarAdministracao(dados), 8. registrarAdministracao(dados), 9. verificarEscritaEContexto.
2. Fragmento `alt` com sucesso: M10 `registrar(realizadaEm, autor)` em AdministraçãoMedicamento, M11 `administracaoRegistrada`, M12 `registrarEvento(resultado, contexto)` (representação resumida), M13 `resultadoRegistro` com nota N03 conforme destinatários aprovados.
3. Alternativa de falha: M14 `registrarNegacao()` e M15 `acessoNegado()/conflito`. Nenhuma administração nem N03 são produzidos no ramo negado.

A `AdministracaoMedicamento.registrar(realizadaEm, autor)` corresponde a CL-03. **Atenção:** verificar na revisão o contrato exato de `registrarEvento` (CL-03 contém `contextoSanitizado`) e se negações são duráveis em transação separada, conforme DB-038. A ordenação gráfica não certifica implementação de runtime.

## Regras de invariância para todos os desenhos

- Perfil pode existir sem rede; rede operacional exige exatamente 1 Familiar Principal vigente e >= 1 Profissional vinculado, na mesma transação.
- Plantonista Atual é condição temporal, não tipo de conta; plantões simultâneos são admitidos.
- Pessoa Idosa tem acesso próprio somente leitura; CSV somente Familiar Principal.
- Administração real, programação e notificações são fatos diferentes; não inventar dose/omissão.
- Originais clínicos são imutáveis; correção cria versão e audita. Negação é auditada mesmo se a operação for revertida.
- EER físico deriva de 34 tabelas e 79 FKs; projeções não criam uma nova base.

## Gate antes da apresentação

1. Revisar notação e clareza em zoom/projetor, principalmente tamanho de rótulos, ligações e papel na constituição inicial.
2. Validar cada associação/multiplicidade e a assinatura de cada mensagem frente a RF/US/CL/SQL.
3. Resolver divergências por revisão documentada em nova branch/PR, nunca reescrever o diagnóstico histórico.
4. **Não declarar homologação acadêmica sem parecer efetivo da equipe/professor.**
