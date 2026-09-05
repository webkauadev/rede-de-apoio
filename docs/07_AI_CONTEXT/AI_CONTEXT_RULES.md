# AI Context Rules — Rede de Apoio

## Regra principal
Antes de sugerir qualquer mudança, consultar:

1. Requisitos;
2. Regras de negócio;
3. Site Map;
4. Design System;
5. Histórico de decisões.

## Rastreamento obrigatório
Toda sugestão deve respeitar:

RF → US → Tela → Estado → Componente

## Nunca fazer

- Criar funcionalidade sem requisito ou proposta explícita de mudança.
- Criar tela nova apenas para representar estado.
- Alterar papéis de usuário sem atualizar regras.
- Transformar Plantonista Atual em usuário.
- Criar chat, central de notificações ou funcionalidades fora do escopo.
- Criar versões visuais independentes para states.

## Prototipação

Sempre aplicar:

STATE = PAGE BASE + DELTA MÍNIMO

Uma página possui uma estrutura canônica. Estados alteram somente o necessário.

## Figma

Usar componentes shadcn/ui como base de primitives e variantes.
Preservar identidade visual do Rede de Apoio.
