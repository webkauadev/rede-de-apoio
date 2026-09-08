# GitHub Workflow — Fonte Única Operacional

## Modelo

O repositório `webkauadev/rede-de-apoio` representa a fonte única operacional do projeto para:

- RF e RNF;
- User Stories;
- Issues e tarefas;
- responsáveis e prioridades;
- critérios de aceitação;
- decisões e rastreabilidade;
- contexto para agentes de IA;
- commits e Pull Requests.

O Figma é canônico apenas para o design visual vigente.

## Cadeia de rastreabilidade

`RF/RNF → US → Issue/Entrega → Tela → Estado → Componente → PR`

Regras:

- RF/RNF aprovados devem existir no GitHub como documento canônico e/ou Issue identificável.
- Cada US possui exatamente um requisito de origem.
- Um RF/RNF pode originar várias US.
- Uma entrega deve referenciar as US/Requisitos que atende.
- Não criar Task para substituir uma User Story.
- Pull Requests de design devem referenciar as Issues e nodes do Figma envolvidos.

## Política de migração

Conteúdo que existia em sistema legado só passa a valer para agentes depois de estar no GitHub.

Se um agente precisar de um requisito, RNF, US ou critério que não está no GitHub:

1. marcar `migration_required`;
2. não consultar tracker externo;
3. não reconstruir o texto de memória;
4. não inventar critérios;
5. permitir somente correções visuais/estruturais que não dependam da lacuna funcional.

A migração é uma dívida finita: depois que o conteúdo original é trazido para o GitHub e revisado, o sistema legado deixa de ter qualquer função operacional.

## Pull Requests

Alterações automatizadas podem chegar até Pull Request, mas o merge continua humano por padrão.

O PR deve registrar:

- T## e responsável;
- RF/RNF/US e Issues relacionados;
- nodes do Figma;
- estados alterados;
- componentes reutilizados/criados;
- pendências `migration_required`;
- resultado da auditoria visual/estrutural.
