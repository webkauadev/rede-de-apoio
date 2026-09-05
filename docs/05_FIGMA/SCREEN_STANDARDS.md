# Screen Standards

## Objetivo

Garantir consistência entre telas criadas por integrantes diferentes.

## Estrutura obrigatória

Toda tela deve possuir:

1. Identificação
- código Txx;
- responsável;
- RFs relacionados;
- US relacionada.

2. Shell padrão
- AppTopBar quando autenticado;
- conteúdo principal;
- BottomNavigation quando aplicável.

3. Estados
Estados são derivados da página base.

Nunca criar layouts independentes para:
- erro;
- loading;
- empty state;
- sucesso.

## Mobile

Referência:
- largura 390px;
- altura adaptável;
- conteúdo pode rolar.

## Critério de revisão

Antes de aprovar uma tela verificar:

- Existe requisito para cada ação?
- Usuário possui permissão?
- Componente já existe?
- O estado altera somente o necessário?
- Mantém identidade visual?
