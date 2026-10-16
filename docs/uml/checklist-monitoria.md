# Checklist de monitoria — UML e dados

## Perguntas explícitas do professor (slide 58)

- [ ] Toda US aprovada possui cobertura por pelo menos um caso de uso, ou há justificativa de não aplicabilidade?
- [ ] Todo dado apresentado nas telas selecionadas existe como atributo/conceito no modelo de classes, ou foi marcado como dado técnico/pendente?
- [ ] Todo cenário principal selecionado possui sequência que explica a colaboração interna?
- [ ] Toda classe com status/situação/estado relevante tem máquina de estados, ou há justificativa de que não possui ciclo de vida?
- [ ] Toda classe aparece em alguma tela ou sequência, ou tem responsabilidade interna explicitamente justificada?

## Coerência UML exigida pelas aulas

- [ ] Casos de uso têm ator externo, fronteira e objetivo completo; não são telas, botões, endpoints ou tabelas.
- [ ] `include` parte do caso-base para o incluído; `extend` parte da extensão para o caso-base.
- [ ] Generalização de ator só ocorre com herança integral de comportamento.
- [ ] Classes usam vocabulário do domínio; multiplicidades foram lidas e justificadas nos dois sentidos.
- [ ] Agregação/composição expressam ciclo de vida, não apenas FK; dependência usa linha tracejada.
- [ ] Cada mensagem de sequência tem participante responsável e operação/contrato coerente com classes.
- [ ] `alt`, `opt`, `loop` e `par` têm guardas/propósito verificável; retornos e mensagens assíncronas não foram usados decorativamente.
- [ ] Atividades mostram ações, decisões com guardas completas, fork/join e partições quando necessários.
- [ ] Estados têm inicial/final quando aplicável; transições têm evento, guarda/ação se necessária e estados alcançáveis.

## Verificação técnica adicional do projeto

- [ ] A matriz rastreia RF/RNF → US → caso de uso → classes → cenário → atividade/estado → dados → tela → critério de aceite.
- [ ] Regras RN-001 a RN-011, permissões e V1 não conflitam com relações e transições propostas.
- [ ] Plantonista Atual é modelado como condição temporal, não perfil; Pessoa Idosa permanece read-only.
- [ ] Dados de saúde, acessos negados, CSV e auditoria mantêm suas restrições canônicas.
- [ ] Modelo de classes e EER são coerentes sem assumir equivalência classe=tabela; PK/FK/cardinalidades físicas foram verificadas no SQL/dicionário vigente.
- [ ] Cada lacuna está marcada como `migration_required`, “não aplicável” ou “a confirmar”; nenhuma célula vazia é apresentada como cobertura.
- [ ] Diagramas extensos foram divididos por pergunta/domínio e permanecem legíveis no Figma.
- [ ] M2 e ES-04 foram separados: confirmar o enunciado coletivo antes da entrega.
