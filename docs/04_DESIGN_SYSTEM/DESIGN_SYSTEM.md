# Design System — Rede de Apoio

## Princípio

O projeto utiliza shadcn/ui como base de primitives e variantes, mas mantém identidade visual própria.

shadcn = estrutura de componentes.
Rede de Apoio = identidade visual + componentes de domínio.

## Diretrizes visuais

- Mobile first.
- Largura de referência: 390px.
- Geist como família tipográfica.
- Lucide para iconografia.
- Superfícies claras.
- Azul institucional/petróleo.
- Verde suave para estados ativos.
- Bordas discretas.
- Sombras leves.

## Regras

- Priorizar componentes reutilizáveis.
- Não criar componentes únicos sem necessidade.
- Estados devem derivar de uma tela base.
- Auto Layout no Figma.
- Componentes devem possuir variantes quando houver mudança de estado.
- Telas com destinos irmãos dentro da seção primária ativa devem usar o padrão canônico `LOCAL_SUBNAVIGATION_PATTERN.md`: submenu imediatamente abaixo do header, em linguagem M3 Tabs, separado da Navigation Bar inferior.
- A navegação local deve recolher no scroll para baixo e retornar no scroll para cima seguindo a adaptação `enterAlways` documentada; filtros, chips e controles de visualização não devem ser confundidos com LocalSubnav.

## Documentos canônicos relacionados

- `MATERIAL3_VISUAL_DIRECTION.md`
- `APP_HEADER_VISUAL_GRAMMAR.md`
- `COMPONENT_COLOR_GRAMMAR.md`
- `LOCAL_SUBNAVIGATION_PATTERN.md`
