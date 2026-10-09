# 42 — Pacote decisório DB-002: criar uma rede sem quebrar RN-001 e RN-004

**Status:** PENDENTE DE DECISÃO FUNCIONAL SOBRE O CICLO DE VIDA. **Data:** 2026-10-09. Fonte canônica: US-003/RF03 (Familiar Principal cadastra Pessoa Idosa em T12), US-005/RF04 (Principal vincula membros em T13), US-007/RF05 (transfere/gerencia papéis), RN-001 (exatamente um Familiar Principal ativo por pessoa idosa/rede, transferência atômica), RN-004 (≥1 Profissional vinculado à rede), RNF01 e RNF03. A fonte canônica **não determina em que transação** se criam Pessoa Idosa, Rede, Principal e Profissional.

## 1. Paradoxo lógico do primeiro cadastro

Se uma rede já for considerada operacional quando nasce, precisa conter 1 Principal e ≥1 Profissional **na primeira versão observável válida**. Mas um cadastro comum tem etapas independentes: primeiro perfil idoso; depois associar pessoas/profissionais. Um INSERT isolado de `rede_cuidado` não prova que os membros existem. Uma FK local não impõe mínimo de linhas em outra tabela, nem um UNIQUE prova "pelo menos um".

**Não inferir** que por ser o ator de US-003 "Familiar Principal", esse usuário já tem um vínculo Principal confirmado na rede ainda não constituída. A fonte exige semântica clara de autorização de bootstrap, não uma role fictícia ou a elevação automática de qualquer conta.

## 2. Três arquiteturas candidatas (sem aprovação)

| Alternativa | Ordem de constituição | Propriedade de segurança | Trade-off / cuidado |
|---|---|---|---|
| **B1 — Estado explícito não-operacional** | criar perfil/rede em `EM_CONFIGURACAO`, preparar vínculos, ativar após validar 1 Principal e ≥1 Profissional | operações de cuidado somente em rede `OPERACIONAL`; a configuração não pode ser usada como atalho de permissão | RN-001 literal exige avaliar se é permitido uma "rede em configuração" ainda sem Principal; não assumir exceção sem decisão formal |
| **B2 — Criação transacional completa** | coletar Principal e Profissional previamente, criar perfil/rede/membros/papéis na mesma transação e confirmar só quando completo | nenhum estado incompleto é observável após COMMIT | pode exigir Profissional já escolhido em T12; UI, autorização de quem cria e dependências de contas precisam revisão |
| **B3 — Perfil primeiro, rede criada somente depois** | cadastro de D02 sem D03; quando há pessoas elegíveis, constituir rede completa em uma transação | evita rede incompleta; perfil não significa rede operacional | US-003 "criar contexto de cuidado da rede" deve ser interpretada/compatibilizada; navegação T12→T13 e autoridade de atribuição precisam esclarecimento |

**Recomendação técnica de estudo:** B3 ou B2 evitam tornar observável um registro de rede sem as condições RN-001/RN-004; B1 pode facilitar UX, mas exige explicitar a diferença funcional entre "rede configurável" e "rede operacional". **Nenhuma foi aprovada**.

## 3. Contrato de ativação que TODAS devem garantir

- Antes de permitir operação de cuidados programados, plantões, tarefas e escrita em rede, existência de um Principal vigente **exatamente 1** e pelo menos um Profissional vinculado e autorizado.
- Principal pertence à categoria Familiar da **mesma rede**; Profissional pertence à categoria Profissional (não acumula papéis familiares).
- Criador do perfil, titular idoso e Principal vigente são identidades distintas em modelo; não atribuir Principal sem operação de concessão reconhecida.
- Checagem de contagem e ativação devem ocorrer **dentro da mesma transação e com serialização apropriada**. Dois ativadores não confirmam versões divergentes.
- Se houver falha em qualquer passo, rollback total da constituição operacional, sem rede "meio ativa".
- Contas de Pessoa Idosa podem ser habilitadas posteriormente (RF30); senha é definida pelo próprio titular e não pelo Familiar. Não fazer bootstrap depender de a Pessoa Idosa ter senha.
- O histórico de entrada/saída e a trilha de auditoria continuam exigidos após ativar; sem CASCADE destrutivo.

## 4. Estado e operação: desenho de referência PROPOSTO

```text
Pessoa Idosa cadastrada (sem inferir rede operável)
         |
         +-- B2: coleta de vínculos antes do primeiro COMMIT de rede
         |
         +-- B3: etapa preparatória fora de uma rede operacional
         |
         +-- B1: rede EM_CONFIGURACAO (se a regra funcional permitir)
         |
         v
Validar categoria, autorização, Principal=1, Profissionais>=1
         |
     [transação de ativação/constituição]
         |
         v
Rede OPERACIONAL — plantões, tarefas, histórico e registros permitidos por RN-010
```

Os nomes de status são ilustrativos; nenhum `ENUM` ou coluna ficou homologado. **RN-001 e RN-004 permanecem obrigatórias** para o estado operacional. Encerramento/suspensão de rede e preservação histórica requerem decisão adicional DB-018/028; não inventar direito de operar sem profissional em suspensão.

## 5. Operações perigosas e races

| Operação | Risco sem serialização | Condição de aceitação |
|---|---|---|
| Ativar rede duas vezes | duas inicializações/Principais divergentes | uma versão operacional válida, idempotência |
| Adicionar dois Principais no setup | exatamente 2 Principais vigentes | rejeitar ou transferir pelo fluxo atômico aprovado |
| Desvincular último Profissional | rede continua em operação sem Profissional | bloquear desvínculo ou estratégia explícita de suspensão, **a decidir** |
| Desvincular Principal único | rede segue sem Principal | bloquear ou executar transferência atômica na mesma operação |
| Duas redes criadas para mesmo idoso | violar DB-001 se A1/A2 | garantir política de unicidade decidida sob transação |
| Disparar N02 antes de ativação | aviso sem Plantonista Atual/escopo | não considerar rede incompleta operacional; estratégia de aviso DB-030/014 |
| Mesmo ator cria perfil e depois perde vínculo | autorização anterior pode vazar à nova operação | revalidar a cada etapa, não confiar apenas em sessão |

## 6. Questões de deliberação (não são respostas)

1. Em US-003, "Familiar Principal" já existe **em outra rede**, recebe habilitação transitória no cadastro, ou constitui a primeira rede na própria operação? A fonte não resolve a sequência.
2. Um perfil idoso pode ficar salvo sem rede operacional? Se sim, quem pode visualizar/editar nesse estado?
3. A equipe aceitará fase `EM_CONFIGURACAO` como tipo de objeto **não-operacional**, ou toda rede existente precisa cumprir RN-001 literalmente desde sua criação?
4. Quem insere o primeiro Profissional na constituição da rede e qual o procedimento se não houver profissional disponível?
5. A rede pode ser suspensa/encerrada quando sai o último Profissional? Se sim, quem pode reativar, e quais operações continuam de leitura? (DB-028).

## 7. Critérios para não congelar o esquema

**Bloqueado** até DB-001, DB-002, DB-004, DB-026 e DB-028 estarem suficientemente decididas. A revisão funcional precisa de evidência nos documentos/Issues originadores antes do DDL. Testes de mesa [44](44_CASOS_BOOTSTRAP_E_VINCULOS.md); contrato da transferência [19](19_ALTERNATIVAS_E_TRANSACOES_NUCLEO.md). Não criar SQL.
