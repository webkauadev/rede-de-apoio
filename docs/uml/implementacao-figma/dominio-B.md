# Implementação no Figma — Domínio B: Organização dos Cuidados

Status: **cinco frames construídos, editáveis e conferidos visualmente; aguardando validação acadêmica da equipe/professor**.

Data: 2026-10-15.
Repositório: `webkauadev/rede-de-apoio`.
Branch: `docs/estudo-uml-milestone2`.
Arquivo Figma: `tcyj2fkTXei2CJbqaRxqCp`, página **Apresentação — Milestone 2 · Protótipo e Modelagem**.
Formato: **1920 × 1080 (16:9)**, com tipografia Geist, paleta azul e layout inspirado nos slides existentes.

## Entregas visuais

| ID | Artefato | Frame editável / link | Node ID | Conteúdo conferido | Fontes |
|---|---|---|---|---|---|
| UC-02 | Casos de Uso — Organização dos Cuidados | [Abrir UC-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6262-3484) | `6262:3484` | 4 atores, 9 casos de uso, 9 associações ator–caso; N01 é nota e não elipse | `../especificacao-para-figma/dominio-B-organizacao/UC-02.md` |
| CL-02 | Classes — Organização dos Cuidados | [Abrir CL-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6263-3484) | `6263:3484` | 6 classes, 9 associações, três papéis distintos de `MembroRede`: solicitante, destinatário, respondente | `../especificacao-para-figma/dominio-B-organizacao/CL-02.md` |
| SQ-02 | Sequência — Solicitação e Resposta de Troca de Plantão | [Abrir SQ-02](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6265-3484) | `6265:3484` | 6 linhas de vida, 11 mensagens lógicas, `alt` aceite/recusa, N01 somente no aceite; solicitação criada por `«create»` | `../especificacao-para-figma/dominio-B-organizacao/SQ-02.md` |
| DB-B | Banco de Dados Físico — Organização dos Cuidados | [Abrir DB-B](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6266-3484) | `6266:3484` | 6 tabelas editáveis, 3 vínculos internos prioritários de FK; dependências interdomínios indicadas em painel | SQL V1 e EER V1 |
| EER-B | Exportação MySQL Workbench — Agenda e Tarefas | [Abrir EER-B](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6268-3484) | `6268:3484` | SVG vetorial original incorporado ao Figma, sem reconstrução manual, apresentado como visão panorâmica | `diagrama_agenda_tarefas.svg` |

## Rastreabilidade e conformidade UML

- UC-02: RF06–10, RF20–21; US-008–014, US-023–025. Associações contínuas sem ponta; nenhum `include`/`extend` artificial; notificação N01 tratada como consequência automática.
- CL-02: classes `MembroRede`, `Plantao`, `SolicitacaoTrocaPlantao`, `Tarefa`, `ConclusaoTarefa`, `Compromisso`, com multiplicidades, operações e papéis conforme contrato. Não há classe PlantonistaAtual.
- SQ-02: RF09–10 / US-012–014; solicitação e resposta representadas com atores distintos. O caminho de recusa não altera responsável e não emite N01. O serviço de notificação é uma abstração anotada, não um participante técnico adicional.
- Acadêmico: aulas de casos de uso (slides 8–14), classes e multiplicidades (slides 16–26), sequências (slides 28–39) e revisão cruzada (slides 53–58).
- DB-B: fontes `entrega/sql-eer/rede_de_apoio_v1.mwb` e `entrega/sql-eer/01_schema_completo_v1.sql`. Recorte físico intencionalmente seletivo, **não substitui** o EER ou o SQL completo.

## EER-B: incorporação exata da fonte

- Fonte nativa: `entrega/sql-eer/diagrama_agenda_tarefas.svg` ([abrir arquivo no GitHub](https://github.com/webkauadev/rede-de-apoio/blob/docs/estudo-uml-milestone2/entrega/sql-eer/diagrama_agenda_tarefas.svg)).
- O SVG original foi transferido e reconstituído integralmente (300.216 caracteres em ASCII); foi importado com `figma.createNodeFromSvg`, originando o nó `6268:3636` dentro do EER-B.
- A visualização recebeu zoom e ajuste de enquadramento **sem modificar a estrutura vetorial importada**. A área temporária de transferência foi removida após a importação.
- O EER-B é **vista panorâmica**: para examinar todos os campos pequenos, abrir o SVG original no GitHub/Workbench. O DB-B é a vista editável e simplificada para apresentação.

## Verificações realizadas

Foram produzidas e examinadas capturas reais dos cinco frames. Foram revistos título e hierarquia do slide, legibilidade, nomes, principais conexões e operações representadas.

No CL-02, a caixa `Plantao` foi alargada para impedir truncamento de assinaturas; as associações R01/R02 foram reconectadas. No EER-B, o conteúdo real do SVG foi ampliado após medição dos limites ocupados pelos elementos vetoriais.

**Não foram alterados** requisitos, critérios de aceite, código, esquema SQL, `.mwb`, arquivos de exportação nativos ou as telas do protótipo.

## Pendências / critérios de aceite finais

1. **Validação acadêmica final** pela equipe e pelo professor permanece pendente; as capturas constituem evidência visual, não substituem aprovação formal.
2. Os novos frames estão na página da apresentação, mas sua **posição/ordem definitiva na sequência da apresentação** poderá precisar de ajuste. Os slides anteriores não foram movidos ou apagados.
3. O recorte DB-B apresenta FKs e campos selecionados, não a totalidade das 79 FKs do modelo. Para avaliação detalhada do banco, usar EER-B/SQL nativo.
4. Se necessário, fazer um ajuste final de tamanho de rótulos no CL-02 em modo apresentação — sem modificar semântica, multiplicidades ou nomenclatura.

**Não iniciar automaticamente o Domínio C nesta entrega.**
