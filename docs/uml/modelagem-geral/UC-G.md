# UC-G — Visão sistêmica de casos de uso essenciais

[Figma: diagrama editável UC-G](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6432-3326) · Frame `6432:3326`, 5000×3540 px · 4 atores selecionados, 16 elipses e 16 associações representativas.

## Elementos canônicos
Atores exteriores à fronteira: Familiar Principal; Familiar de Apoio / Emergência; Profissional da Saúde; Pessoa Idosa.

| Ator | Casos exemplificados |
|---|---|
| Familiar Principal | Cadastrar/manter perfil; constituir e gerir rede; gerenciar plantões; exportar histórico CSV |
| Familiar de Apoio / Emergência (com vínculo vigente e permissões contextuais) | Consultar calendário; solicitar troca de plantão conforme vínculo; registrar cuidado e corrigir registro somente quando a permissão efetiva para o tipo e a ação estiver satisfeita |
| Profissional da Saúde | Cadastrar medicamento; registrar administração; registrar consulta; anexar documento, sempre no domínio permitido |
| Pessoa Idosa | Consultar próprio perfil; consultar próprio cuidado; consultar histórico; consultar emergência — exclusivamente leitura |

**O posicionamento por linha não significa exclusividade**: os casos também podem ser acessados por outros atores sob condições autorizadas; esta prancha reduz ligações para leitura executiva e **não substitui UC-01–03**. A condição de **permissão efetiva** permanece exigida para cada operação; o ator Familiar Apoio/Emergência não ganha escrita automaticamente pelo vínculo, nem por acumular papéis.

## Restrições de notação
- Fronteira do sistema, elipses para objetivos, associações contínuas sem ponta; sem cardinalidades de classes no diagrama de uso.
- Sem `include`, `extend` ou generalização sem demonstração de herança integral.
- Plantonista Atual não é um ator ou categoria de conta; autenticação por si só não concede acesso.
- Notificações N01–N04 são consequências/feedback e não casos de uso espontâneos de destinatários.

Fontes: [UC-01](../especificacao-para-figma/dominio-A-pessoas-rede/UC-01.md), [UC-02](../especificacao-para-figma/dominio-B-organizacao/UC-02.md), [UC-03](../especificacao-para-figma/dominio-C-registros/UC-03.md), [permissões](../../02_BUSINESS_RULES/PERMISSIONS_MATRIX.md), [aulas 8–14](../diretrizes-professor.md).

**Revisão aplicada em 2026-10-27:** ator genérico substituído pelos familiares de Apoio/Emergência e o segundo objetivo substituído por *Solicitar troca de plantão*, baseado em UC-02. As condições de escrita/correção constam do rodapé da prancha. **Pendente:** validação completa das 16 associações e sua cobertura RF/US, não inferir equivalência com o UC integral. Para cobertura integral, consultar os três UC existentes.
