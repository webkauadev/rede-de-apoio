# State Management

## Princípio absoluto

STATE = PAGE BASE + DELTA MÍNIMO

States representam variações de uma mesma tela, não novas páginas.

## Exemplo

T01 Login

Page Base:
- logo
- card
- campos
- botão
- links

States:

### Default
Campos vazios ou preenchidos.

### Error
Somente:
- campo afetado;
- mensagem de erro;
- feedback necessário.

### Loading
Somente:
- estado do botão;
- indicador de carregamento.

## Entre estados manter igual

- grid;
- espaçamento;
- tipografia;
- componentes;
- navegação;
- dados não afetados.

## Regra para Stitch/Figma

Se dois states parecem telas de produtos diferentes, a implementação está incorreta.
