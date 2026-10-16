# Relatório de auditoria técnica, funcional e acadêmica — Milestone 2

**Projeto:** Rede de Apoio a Cuidadores de Idosos

**Data:** 2026-10-16

**Parecer:** **REPROVADO PARA HOMOLOGAÇÃO**

**Natureza:** auditoria independente do estado atual; não é implementação nem homologação pelo professor.

## Resultado executivo

Foram examinados diretamente os **19 artefatos** especificados, incluindo capturas reais e estrutura do Figma. Resultado individual: **1 PASS e 18 FAIL**. Nenhum ficou exclusivamente sem inspeção. Há **13 achados agrupados: 0 P0, 7 P1, 6 P2 e 0 P3**. Existem pendências de evidência, especialmente sobre a demonstração navegável dos fluxos e a rubrica acadêmica efetiva; elas estão separadas dos erros comprovados.

O resultado geral é reprovação porque os P1 já comprovados impedem considerar a modelagem pronta, mesmo sem resolver todas as pendências. Não é necessário presumir um P0 nem classificar toda a auditoria como inconclusiva para reconhecer esses erros. FAIL pode decorrer de P2 importante e não significa que todo o conteúdo de um frame seja semanticamente errado. O único PASS, UC-01, refere-se ao frame atual: a sequência de apresentação ainda contém sua versão antiga.

Principais riscos:

1. **CL-02:** multiplicidades de solicitante, destinatário e respondente estão invertidas. Os números existem, mas estão nas extremidades erradas.
2. **DB-C2:** anexo aparece obrigado a pertencer a registro de diário, contrariando a FK anulável e a exclusividade entre três pais.
3. **Cinco EER:** o desenho nativo admite muitas redes para a mesma pessoa, apesar de `uq_rede_idoso_v1`. Há também flags de obrigatoriedade uniformes que exigem revisão para FKs opcionais.
4. **SQ-01/02/03:** chamadas declaradas síncronas usam ponta aberta; SQ-02 não demonstra validação de versão esperada no momento da resposta.
5. **CL-01 × SQ-01 / SQL:** autenticação aparece na entidade e no serviço com contratos incompatíveis; telefone opcional de ContatoImportante conflita com a coluna obrigatória.

## Escopo efetivamente auditado

- 3 UC: 35 associações, papéis, nomes, objetivos, fronteiras e consequências automáticas.
- 3 CL: 24 classes no total dos três recortes (inclui MembroRede compartilhado), respectivos atributos/operações e **24 associações**, com leitura nas duas direções. R06/R10 de CL-03 foram analisadas como omissões deliberadas.
- 3 SQ: 15 participantes somados por diagrama e **24 mensagens lógicas**; emissor, receptor, sequência, criação, retorno, ativação, guardas e consequências. Repetições gráficas em operandos não foram tratadas como mensagens indevidas.
- 5 DB: **158 ocorrências de campos exibidos** confrontadas, **28 relações desenhadas**, PK/FK, nulidade explícita, tipos e restrições relevantes. **62 ocorrências** têm tipo parcial sem UNSIGNED, agrupadas em um achado P2.
- 5 EER: origem temática, enquadramento, integridade visual, modelo XML e fonte SQL. **34 tabelas, 305 colunas e 79 FKs** no modelo; sem divergência estrutural nos atributos comparados, mas com defeito gráfico de cardinalidade.
- 17 cenários de consistência RF→US→CA→UC→CL→SQ→SQL→protótipo, respeitando cenários seletivos dos SQ e governança transversal.
- Apresentação: todos os frames atuais em **1920×1080**, inspeção de rótulos, fontes, rotas, símbolos e versões antigas. A leitura em projetor não foi ensaiada.

## Fontes e cadeia de evidência

### Documentação congelada

Repositório `webkauadev/rede-de-apoio`, branch-base `docs/estudo-uml-milestone2`, commit **88302e793d7a29cd60cad60483c6aaca357113e1**. A branch de auditoria foi criada a partir desse commit após conferir que não existia branch remota com o nome proposto. Os links de fontes nos achados apontam ao SHA, evitando alteração silenciosa da referência.

Foram consultados:

- `docs/uml/inventario-materiais.md`, `diretrizes-professor.md`, `contextualizacao-projeto.md`, `matriz-rastreabilidade.md`, `plano-diagramas-milestone-2.md`, `checklist-monitoria.md`.
- Os nove contratos UC/CL/SQ em `docs/uml/especificacao-para-figma/`, glossário, mapeamento EER, matriz, governança e pendências.
- Índice e relatórios A/B/C/D de `docs/uml/implementacao-figma/`, usados como contexto de montagem, **não como prova de correção**.
- Requisitos, índice das 36 histórias, registry de critérios aprovados e seu snapshot histórico; regras de negócio, permissões, auditoria e notificações; decisões **DB-001–DB-038** da V1 homologada.
- `entrega/sql-eer/01_schema_completo_v1.sql`, `.mwb` e exportações temáticas SVG/PNG. Nenhum deles foi alterado.
- `AGENTS.md` e registros canônicos de protótipo; a página Fluxo Final do arquivo indicado pelo usuário foi a referência visual, não um arquivo alternativo presumido.

### Figma e capturas

Arquivo `tcyj2fkTXei2CJbqaRxqCp`; página `6103:3636`. A [matriz](MATRIZ-VALIDACAO-19-ARTEFATOS.md) contém os 19 links e IDs exatos. Foram lidos nós, textos, dimensões e caminhos de vetores; capturas PNG reais estão em `evidencias/`. Nenhum frame foi redesenhado, movido, renomeado ou corrigido. A seleção de página necessária para leitura não altera o modelo.

A página de protótipo `5926:1014` foi inspecionada estruturalmente, com textos de baselines/estados e reactions de T04/T05/T08 e seu cadastro. Os JSONs `prototipo-acoes.json` e `prototipo-busca.json` delimitam as evidências da lacuna. Inspeção estática não equivale a teste de interação, autorização de servidor ou persistência.

### Materiais acadêmicos originais

A transcrição `Aula_UML_Transcricao.md` foi acessada no acervo disponibilizado (identificador `libfile_24cbc638c648819184ea10e9847d541c`, trechos retornados até a linha 2000). Também foi consultado texto extraído da página 37 de `Aula_UML_60_Slides_Integral.pdf` (`libfile_9a0a6025cad081918dc351cb67d5b1f5`). **Não se declara inspeção visual integral do PDF** nem acesso ao enunciado/rubrica específica da entrega. As referências a slides são cruzadas com os documentos acadêmicos derivados do repositório. Os arquivos do professor não foram republicados.

A recomendação aproximada de cinco lifelines não foi convertida em regra absoluta. A sexta lifeline de SQ-02 tem justificativa semântica: solicitante e destinatário são pessoas distintas. Ausência de diagramas de atividade/estado não foi catalogada como erro, pois estão fora do escopo expressamente autorizado; confirmar adequação do recorte com o professor é pendência acadêmica.

## Método nas cinco dimensões

| Dimensão | Método e limite |
|---|---|
| Conformidade acadêmica | Confronto dos símbolos e responsabilidades com contratos, documentos derivados e transcrição acessada; sem pretender conceder aprovação docente. |
| Consistência funcional | Reconstituir objetivos, permissões e cenários pelos critérios aprovados e decisões V1; não deduzir requisitos novos de SQL ou de UI. |
| Correção semântica | Ler cada associação nos dois sentidos e cada mensagem em sua condição temporal; distinguir obrigatório/opcional, máximo único, retorno e chamada. |
| Consistência cruzada | Comparar 17 cenários, operações receptoras, estados persistíveis e superfícies do protótipo; marcar correspondência não comprovada. |
| Apresentação | Inspeção de 19 PNGs reais e geometria; títulos, limites, conexões, rótulos e duplicatas; panorama EER aceito como panorama. |

A comparação SQL×MWB foi estática e reproduzível. Verificou nomes, tipos/UNSIGNED, nulidade não gerada, PK/UNIQUE e composição/alvo das FKs. Não certifica defaults, expressões geradas, toda propriedade de collation, execução MySQL, transações ou concorrência. CHECKs continuam no SQL: foram contados **50**, contra nenhum objeto `db.CheckConstraint` no XML. Isso refuta a promessa de cobertura integral das restrições em DB-C2, sem afirmar que o banco em execução perdeu CHECKs.

## Correções mínimas e ordem recomendada

| Ordem | Grupo | IDs | Obrigatoriedade |
|---|---|---|---|
| 1 | Corrigir multiplicidades CL-02 e DB-C2; revisar cardinalidades da fonte EER e reexportações | 001–003 | Obrigatório antes de homologar. Mudanças de representação devem preservar DDL. |
| 2 | Corrigir pontas de chamadas e explicitar a proteção de versão na resposta de troca | 004, 006 | Obrigatório; revisar contrato do SQ-02 antes de montagem. |
| 3 | Resolver responsabilidade de autenticação e opcionalidade do telefone | 005, 007 | Obrigatório; decisões de modelagem precisam validação humana. |
| 4 | Resolver rotas, tipos parciais, assinaturas, rodapé e ordenação das versões | 008–012 | P2 material. Pode caber aprovação com ressalvas somente após resolver P1 e documentar limites; não apresentar versões antigas. |
| 5 | Identificar roteiro navegável ou delimitar formalmente a cobertura do protótipo; confirmar rubrica | 013, PE-01–04 | Obrigatório para reivindicar rastreabilidade completa e aprovação sem ressalvas. |

Não se recomenda reconstruir todos os diagramas. Preservar elementos corretos, condições negativas existentes, exclusividade de anexos do CL-03, distintos papéis da troca e recortes físicos declarados. Não criar classes, atores, casos de uso ou requisitos para preencher espaço.

## Resultado de homologação

**Os diagramas da Milestone 2 estão tecnicamente e academicamente prontos para homologação? Não.**

Decisão: **REPROVADO PARA HOMOLOGAÇÃO**. Para alterar a decisão é necessário resolver os sete P1 pelos critérios objetivos do catálogo, revisar os frames e exportações afetados contra as mesmas fontes, tratar os P2 ou aprovar ressalvas explícitas e confirmar o alcance acadêmico/prototípico pendente. APROVADO exige evidências suficientes e nenhuma inconsistência material pendente; APROVADO COM RESSALVAS exige que só restem ajustes não bloqueadores identificados.

A homologação anterior da V1 do banco não homologa automaticamente as representações UML/EER. Esta auditoria preservou requisitos, protótipo, SQL, Workbench e frames. O diagnóstico fica pronto para uma rodada de correção **somente após autorização**.

## Entregas e verificação documental

- [Matriz dos 19 artefatos](MATRIZ-VALIDACAO-19-ARTEFATOS.md).
- [13 inconsistências e critérios de resolução](INCONSISTENCIAS-E-CORRECOES.md).
- [Caderno por elemento, mensagem, campo e cenário](CADERNO-DE-VERIFICACAO.md).
- [Manifesto de evidências e fontes](evidencias/MANIFESTO.json).
- [Dados estruturais SQL×MWB](evidencias/sql-mwb-comparacao.json) e [comparador reproduzível](evidencias/comparar_sql_mwb.py).

`python scripts/validate_agent_context.py` passou nesta branch. Esse resultado valida integridade documental do contexto; não aprova diagramas nem demonstra segurança/funcionalidade do sistema.

Branch de entrega: `audit/uml-milestone2-final`. Somente `docs/uml/auditoria-final/` é versionado nesta missão. Commit/push e PR de revisão serão informados com seus identificadores efetivamente retornados; não há merge em main.
