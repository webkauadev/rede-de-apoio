# Plano de diagramas para a Milestone 2

Este é um plano de modelagem, não contém diagramas nem cria IDs definitivos. A obrigatoriedade vem somente dos slides 6 e 60 enquanto o enunciado coletivo de M2 não estiver versionado.

| Artefato candidato | Pergunta / objetivo | Origem e elementos candidatos | Referência acadêmica | Dependências e pendências | Prioridade / condição |
|---|---|---|---|---|---|
| Casos de uso do sistema | Quem usa e para quais objetivos? | RF01–RF30, RNF01–02 e US-001–036; atores e casos agrupados por módulos. | slides 8–14, 53–58 | Matriz de permissões e aceites; não converter telas/DB em casos. | Alta / **confirmado** pela formulação do slide 6. |
| Classes de domínio | Quais conceitos de cuidado existem e como se relacionam? | Rede, pessoa, membro, cuidado, agenda, saúde, auditoria em recortes legíveis. | slides 16–26, 34 | Validar multiplicidades em RF/US/regras/decisões V1; separar do EER. | Alta / **confirmado**. |
| Sequências selecionadas | Como colaboram participantes em cenários principais e alternativos? | Exemplos prioritários: login; constituição/vínculo; troca de plantão; administração/alerta; correção/auditoria ou CSV. | slides 28–39 | Escolher cenários pelos critérios Gherkin; cada mensagem precisa de operação/contrato. | Alta / **confirmado**; quantidade não confirmada. |
| Atividades selecionadas | Como um processo percorre decisões, responsáveis e paralelismo? | Processos de plantão/troca, cuidado programado ou cadastro/rede, conforme aceites. | slides 41–46 | Só ações e guardas cobertas por fonte; avaliar partições. | Alta / **condicional**: slide 6 escreve “atividades/estados”, formato coletivo pendente. |
| Máquina de estados | Que objeto possui ciclo e transições válidas? | Candidatos: solicitação de troca, tarefa, plantão, ocorrência/registro corrigido. | slides 47–51 | Selecionar somente ciclo explícito e construir tabela de transições. | Alta / **condicional** para cada entidade; verificar exigência coletiva. |
| DER/EER do modelo físico | Como persistência materializa chaves, relações e restrições? | SQL/EER V1, dicionário, decisões e pacote `docs/11_ENTREGA_SQL_EER`. | Não há regra específica de DER nas aulas; usar fontes técnicas aprovadas. | Conferir artefato consolidado, 34 tabelas e limitações; não misturar com classes. | Média / **não confirmado** como requisito M2; artefato adicional solicitado pela equipe. |

## Organização visual futura no Figma

Cada diagrama terá título, escopo, fontes/IDs e legenda de notação quando necessária. Casos de uso por módulo; classes por recorte de domínio com relações entre recortes explicitadas; sequência por cenário; atividades por processo; estados por objeto. Usar fronteira do sistema, elipses, compartimentos, linhas de vida, fragmentos, nós/barra/partições e estados/transições conforme a notação dos slides. Não representar todos os requisitos em uma única prancha.

Antes de desenhar: fechar a convenção de nomes e IDs; validar cada linha da matriz; confirmar escopo acadêmico com o enunciado M2; decidir quais ciclos têm regra suficiente; e reconciliar o EER com o SQL vigente.
