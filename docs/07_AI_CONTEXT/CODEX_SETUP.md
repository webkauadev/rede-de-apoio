# Codex + Figma

Configuração operacional do projeto Rede de Apoio para uso no Codex.

- Repositório canônico: `webkauadev/rede-de-apoio`
- Contrato do agente: `AGENTS.md`
- Figma canônico: `tcyj2fkTXei2CJbqaRxqCp`
- Registry do Figma: `docs/05_FIGMA/FIGMA_REGISTRY.yaml`
- Contrato de design: `docs/07_AI_CONTEXT/AI_DESIGN_CONTRACT.md`

O Codex deve usar GitHub como fonte operacional e Figma como fonte visual, nunca inventar requisitos ausentes e sempre trabalhar em branch com Pull Request para revisão humana.

A integração com Figma deve usar preferencialmente o Figma MCP remoto. Antes de qualquer alteração ampla, validar leitura do arquivo canônico e uma escrita controlada fora dos frames canônicos.

Fluxo: GitHub Issue -> RF/RNF/US -> Context Pack -> Figma -> Auditoria -> Registry -> Commit -> Pull Request -> Revisão humana.
