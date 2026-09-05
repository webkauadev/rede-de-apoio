# Matriz de Permissões

| Categoria | Consultar | Alterar | Administrar |
|---|---|---|---|
| Pessoa Idosa ⚠️ *proposta* | Sim (próprio cuidado) | Não | Não |
| Familiar Principal | Sim | Conforme regra | Sim na rede |
| Familiar Apoio | Sim conforme vínculo | Conforme permissão | Não |
| Familiar Emergência | Sim conforme vínculo | Limitado | Não |
| Profissional Saúde | Sim conforme vínculo | Conforme escopo | Não |

> ⚠️ A linha **Pessoa Idosa** refere-se a RF30 / US-036, que estão em
> **proposta controlada** até formalização no GitLab (RN-009, Decisão 003).
> Não usar como base para tela, componente ou frame no Figma.
>
> ⚠️ A coluna **Alterar** não é decidível no estado atual ("Conforme regra",
> "Conforme permissão", "Limitado", "Conforme escopo"). Ver pendência P03.

## Regras

- Principal é único.
- Apoio e Emergência podem ser múltiplos.
- Papéis familiares podem acumular.
- Plantonista Atual não é categoria de usuário.
- Acesso negado deve ser auditado.
