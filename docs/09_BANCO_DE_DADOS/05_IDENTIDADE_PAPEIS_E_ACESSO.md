# 05 — Identidade, papéis e autorização

## Fatos canônicos

**Familiar** é uma categoria. **Principal, Apoio e Emergência** são papéis acumuláveis. **Profissional da Saúde** é categoria diferente. **Plantonista Atual** é condição temporária de um intervalo de plantão. **Pessoa Idosa** usa mesma autenticação mas leitura estrita do próprio cuidado; não recebe papéis familiares, não administra, não escreve, não corrige e não exporta CSV.

## Modelo proposto

Usuário (identidade) → Participação na Rede (contexto, categoria e vigência) → Atribuições de Papéis Familiares (vários simultâneos, históricos). Não armazenar um papel global de usuário; a autorização só existe em recurso autorizado dentro da rede.

### Algoritmo de decisão de permissão — contrato para implementar depois

1. Autenticar usuário; nunca acreditar em cliente/UI para decisão final.
2. Resolver rede e pessoa idosa do recurso diretamente no backend. Não confiar em ids avulsos recebidos na URL.
3. Se Pessoa Idosa: permitir somente leitura T03–T15 de seu próprio perfil/cuidado autorizado (T01/T02 para login/cadastro da própria conta). Bloquear T16/T17/CSV/escrita, mesmo por API direta.
4. Para Familiar/Profissional: vínculo vigente na mesma rede é obrigatório.
5. Para Familiar, calcular união das permissões positivas de papéis vigentes; aplicar restrições explícitas de recurso/contexto.
6. Principal pode escrever registros compatíveis; Apoio/Emergência só se Plantonista Atual OU responsabilidade operacional explícita para a ação.
7. Profissional escreve registros de saúde do seu domínio enquanto vinculado/autorizado; jamais receber papéis familiares.
8. Correção exige a permissão atual de criar aquele mesmo tipo de registro, não precisa ser autor original.
9. CSV exige Principal vigente do idoso/rede selecionado e trilha de auditoria.
10. Negação bloqueia acesso e gera auditoria sanitizada; não deixar dados sensíveis vazar na mensagem.

### Transações críticas a definir

- Transferência de Principal: bloquear e serializar sobre a rede; retirar papel anterior/conceder novo na mesma transação; verificar final exatamente um, com conflito de concorrência tratado.
- Remoção do último Profissional: operação deve ser recusada ou a rede passar a estado sem operação, dependendo da decisão de onboarding.
- Desvinculação: revogar acesso futuro, não deletar o vínculo/autorias antigas.
- Atribuição de plantão: candidato pertence à mesma rede e é elegível durante o intervalo.
- Papéis acumulados não geram N01/N03/N04 duplicadas; deduplicar pelo usuário efetivo, não pelo papel.

### Falhas que queremos impedir

- Usuário com permissão em rede A lendo idoso da rede B apenas mudando URL.
- Atribuir uma tarefa da rede A ao membro da rede B.
- Pessoa Idosa com credenciais válidas executando endpoint POST/PUT/DELETE.
- Apoio escrevendo fora de plantão e sem responsabilidade operacional.
- Profissional sem vínculo escrevendo registro de saúde.
- Principal transferido revogando histórico de autoria antiga.
- Tentar conceder dois Principais porque duas requisições concorrentes foram aprovadas.
- Expor logs de auditoria em T17 para a Pessoa Idosa.

**Fontes:** docs/02_BUSINESS_RULES/{BUSINESS_RULES,USERS_AND_ROLES,PERMISSIONS_MATRIX,ELDERLY_READ_ONLY_ACCESS}.md; RF04/05/08/28/30 e US-005/006/007/011/032/034/035/036.
