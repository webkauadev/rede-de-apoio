# 29 — Arquivos, trilha de auditoria e exportação CSV: contrato de integridade

**Escopo confirmado:** RF23/US-027 anexar documentos/imagens de modo contextual; RF28/US-032 CSV contextual T07, só Familiar Principal e auditado; RF29/US-033 e RNF01/RNF03 auditoria, inclusive acesso negado; RF30/US-036 exclui Pessoa Idosa de CSV e T17. **Propostas técnicas abaixo ainda não são requisitos aprovados.**

## A1. Anexo e versão: associação por FK real

Metadados candidatos: anexo_id, recurso_pai_referenciado_por_FK, versão_pai se aplicável, autor_upload_id, nome_original_sanitizado, tipo_permitido_validado, tamanho_bytes, hash_conteudo, chave_privada_do_storage, instante, status_tecnico_upload e política de retenção.

**Invariante primária:** arquivo só é servido ao usuário com permissão de leitura **do registro pai naquele instante**, considerando rede e idoso. Guardar o arquivo por URL adivinhável ou armazenar recurso tipo+ID sem FK não fornece proteção suficiente.

**Alternativas de destino:**
- envelope-base comum com anexo→registro ou anexo→versão;
- associação por domínio com FK para registro de diário ou consulta, respeitando T06 e T10, sem polymorphic FK textual.
- Anexo da versão original vs. da versão corrigida é **DB-037**. Se anexos forem históricos, uma correção de registro não remove anexos anteriores sem decisão formal.

### Fluxo de upload seguro (proposta)

1. Validar autor, permissão de escrita e recurso pai real; proteger contra troca do recurso durante upload.
2. Impor allowlist de extensões, MIME/conteúdo e tamanho por tipo aprovado; não confiar apenas no nome ou Content-Type informado pelo cliente.
3. Gerar nome/chave opaca; armazenar fora da exposição pública direta; verificar malware/conteúdo quando aplicável.
4. Gravar metadados com referência ao registro e contexto correto, usando protocolo consistente entre armazenamento de objetos e banco.
5. Publicar arquivo para leitura somente após validação completa e confirmação do metadado, preferindo URL temporária e autorização no acesso.
6. Falha entre upload do objeto e transação de metadados não pode deixar documento órfão acessível; planejar reconciliação/limpeza de objetos técnicos.
7. Evento de auditoria registra upload/negação sem guardar conteúdo de saúde ou token de URL.

**Questões ainda em aberto:** tipos/tamanho máximos, antivírus/CDR, deduplicação por hash, limite, substituição por nova versão e retenção (DB-013/018/037). Não fabricar “biblioteca de documentos” no Site Map.

## A2. Três níveis de história separados

| Domínio | Pergunta respondida | Exemplo | Proteção |
|---|---|---|---|
| Registro original + versões | O que foi declarado e corrigido sobre o cuidado? | descrição e suas versões | RNF02: append-only |
| Auditoria | Quem tentou/realizou qual operação, quando e com que resultado? | CSV autorizado/negado, correção de registro | RNF03: log mínimo, segregado |
| Outbox técnico eventual | Que trabalho de transporte foi agendado/processado? | N02 retry | infraestrutura restrita, **não** inbox |

Não transformar auditoria em repositório de cópia integral de cada documento/anotação clínica. Evitar que logs internos sejam mais acessíveis que a fonte protegida.

## A3. Esquema conceitual de auditoria

- auditoria_id; instante_registrado_servidor;
- ator_usuario_id opcional para anonimato/erro de login;
- rede_id/pessoa_idosa_id quando identificáveis sem exposição;
- categoria e **papéis_snapshot** efetivos no instante, reduzidos ao necessário;
- acao, recurso_tipo, identificador de recurso restrito, resultado ALLOW/DENY/ERROR;
- correlacao_id para vincular tentativa/requisição e alteração confirmada;
- sem corpo de registro clínico, tokens, senha, anexo bruto ou SQL com parâmetros sensíveis.

**Risco de fidelidade histórica:** recalcular papel de hoje para auditoria de ontem distorce a história; snapshot no instante histórico é proposto. Desvincular ator não pode apagar evento antigo. Autorizações de T17 dependem de Principal ou permissão efetiva conforme matriz, nunca expor a Pessoa Idosa.

**Cuidado com negação:** uma tentativa que falha na própria transação de escrita pode precisar log em fluxo separado, sem gravar dados confidenciais de pedido. Garantia de trilha após rollback depende DB-038 (por exemplo pipeline de segurança/outbox separado), não assumir atomicidade impossível.

## A4. CSV contextual (T07)

1. Autenticar usuário e resolver rede/idoso; confirmar que é Familiar Principal **vigente**.
2. Aplicar escopo autorizado antes de compor a consulta e as versões do histórico; não exportar tudo e filtrar em JavaScript cliente.
3. Só incluir colunas aprovadas, de modo coerente com leitura autorizada do histórico.
4. Gravar tentativa/resultado na auditoria sem anexar cópia do conteúdo exportado.
5. Defender contra injeção de fórmulas CSV, conforme estratégia de codificação/escape futura.
6. Em eventual processo assíncrono, revalidar autorização no momento do download; papel Principal pode ter sido transferido desde a solicitação.
7. Se exportação for negada, auditar sem indicar ao solicitante a existência de dados de outro idoso.

**PENDENTE:** delimitador/codificação/fuso/seleção de versões no CSV, expiração de artefatos temporários e política de registro de auditoria; essas decisões não podem ampliar permissão.

## A5. Cenários negativos de acesso

- Conta de Pessoa Idosa em T07 lê histórico próprio mas não exporta CSV.
- Familiar de Apoio/Emergência, sem Principal, não exporta mesmo sendo Plantonista.
- Profissional da Saúde não obtém exportação por ser coautor de registro.
- Antigo Principal que perdeu papel deve ser negado ao exportar de novo.
- Um anexo da E2 não pode ser acessado por um usuário apenas autorizado à E1 mesmo que ID seja conhecido.
- “Extensão .jpg” com conteúdo executável não é considerado seguro apenas pelo sufixo.
- T17 deve mostrar eventos mínimos autorizados sem revelar texto clínico.
- Duas requisições que repetem upload/tentativa não devem criar metadados divergentes ou exposição de objetos órfãos.

## Referências

OWASP File Upload Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html ;
Logging Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html ;
Authorization Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html ;
MySQL Foreign Keys: https://dev.mysql.com/doc/refman/8.4/en/create-table-foreign-keys.html .
