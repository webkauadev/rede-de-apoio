# Requisitos Não Funcionais — PROPOSTA

> **STATUS: PROPOSTA CONTROLADA.**
> Nenhum item deste documento é requisito aprovado.
> Prefixo `RNF-P` = proposta. Só vira `RNF` após formalização no GitLab.
> Enquanto isso, nenhum item aqui pode ser usado para justificar funcionalidade nova.

Contexto: o pack referencia RNF01 e RNF03 sem que exista documento de RNF (P02).
Este arquivo cobre as cinco categorias exigidas na Fase 2 sem substituir os originais.

---

## Acessibilidade

### RNF-P01 — Conformidade WCAG 2.1 nível AA
Origem: público-alvo declarado em `00_PROJECT_CONTEXT.md` inclui pessoa idosa;
critério "acessibilidade" exigido em `CLAUDE.md` e no processo de revisão de tela.

- texto normal: contraste mínimo 4.5:1;
- texto grande (≥ 24px, ou ≥ 19px em peso semibold): mínimo 3:1;
- bordas de componente de interface e ícones informativos: mínimo 3:1 (WCAG 1.4.11).

### RNF-P02 — Alvo de toque mínimo 48 × 48 px
Origem: redução de destreza fina é característica do público-alvo.
Nenhum elemento acionável abaixo de 48 × 48 px, com espaçamento mínimo de 8 px entre alvos.

### RNF-P03 — Tipografia legível e escalável
- corpo de texto base: 16 px, nunca abaixo de 14 px;
- suportar escala de fonte do sistema operacional até 200% sem perda de conteúdo ou função;
- altura de linha mínima de 1.5 para texto corrido.

### RNF-P04 — Informação nunca por cor isolada
Todo estado comunicado por cor deve ter reforço textual ou de ícone.
Consequência direta em `CareRecordCard`, que usa badge para registro corrigido.

---

## Segurança

### RNF-P05 — Controle de acesso por categoria e papel
Origem: RN-007. Toda leitura ou escrita de dado de saúde verifica a categoria do
usuário e o vínculo com a pessoa idosa antes de retornar conteúdo.

### RNF-P06 — Negação de acesso auditada
Origem: RN-008 e `AUDIT_RULES.md` ("access denied attempts are also recorded").
Tentativa negada registra usuário, papel no momento, recurso, data/hora e resultado.

---

## Privacidade

### RNF-P07 — Minimização de exibição
Dado de saúde só é exibido na tela em que é necessário à tarefa.
Nenhuma tela agrega dado sensível sem origem em RF.

### RNF-P08 — Preservação de registro original
Origem: RN-005 e RN-006. A interface não pode oferecer ação de editar ou excluir
registro de cuidado. Correção é sempre um novo registro vinculado.

---

## Usabilidade

### RNF-P09 — Consistência de shell entre telas
Origem: `SCREEN_STANDARDS.md`. Mesmo AppTopBar, mesma BottomNavigation,
mesma escala de espaçamento em todas as telas autenticadas.

### RNF-P10 — Estados sempre derivados da página base
Origem: Decisão 001. Loading, empty e error alteram apenas o necessário.

### RNF-P11 — Confirmação explícita para ação irreversível
Origem: RN-005. Como registro é imutável, a criação é o ponto de não retorno.
A tela deve deixar isso claro antes de salvar.

---

## Desempenho

### RNF-P12 — Feedback de carregamento
Nenhuma tela pode ficar sem retorno visual. Skeleton para listas, estado de
botão para ações. Origem: `STATE_MANAGEMENT.md`, que já exige estado Loading.

### RNF-P13 — Carregamento incremental de listas cronológicas
Origem: RF11/RF12 produzem listas que crescem indefinidamente.
Diário e Histórico carregam por período ou paginação, não a coleção inteira.

> RNF-P13 tem implicação de escopo (paginação/período). **Não implementado em T06**
> até decisão. Registrado aqui apenas como proposta.
