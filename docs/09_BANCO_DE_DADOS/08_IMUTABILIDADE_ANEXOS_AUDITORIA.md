# 08 — Registro imutável, correções, anexos, CSV e auditoria

## Fatos canônicos

RN-005/RN-006 e RNF02: após criação, registro de cuidado não pode ser apagado ou sobrescrito para correção; nova versão vinculada preserva original, autoria, data/hora e histórico. Quem corrige deve ter **agora** permissão efetiva de criar o mesmo tipo. RF13 exige autoria/hora. RF23 exige anexos contextuais. RF28/US-032 permite CSV só ao Principal e auditado. RF29/RNF03 exige trilha de auditoria.

## Duas arquiteturas para revisão (ADR obrigatória)

**Opção A — envelope comum:** tabela/entidade Registro com identidade única, tipo, titular, ator e data; conteúdos especializados com relações íntegras; tabela Correção referencia Registro e guarda versão/snapshot. Benefício: uma só FK para anexos/correções. Custo: impor existência exata de subtipo e validar conteúdo específico por transação, não simplesmente CHECK.

**Opção B — registros por domínio:** Diário, Administração, Consulta e outros possuem PK e tabelas de revisão próprias, com contrato comum de auditoria. Benefício: tipagem/fk forte em cada domínio. Custo: mais entidades, consultas UNION e repetição de rotinas. **Não** escolher genericamente “tipo_recurso + id_recurso” como único vínculo para anexo/correção: perde integridade referencial pelo banco.

Decisão de qual universo de registros RNF02 cobre (diário, medicação, consulta, recomendações, conclusão etc.) deve ser explicitada antes do SQL.

## Máquina de correção — contrato comportamental

1. Verificar permissão de criação do mesmo tipo **no instante da correção** e escopo do idoso.
2. Localizar registro original (imutável) e última versão confirmada.
3. Abrir transação e serializar versionamento para o mesmo registro.
4. Criar versão N+1 com autor atual, instante, justificativa e conteúdo corrigido completo ou delta verificável.
5. Não alterar nem remover o original/versões antigas.
6. Auditar resultado; projeção de “valor atual” passa a exibir maior versão válida, mantendo rastreabilidade.
7. Se a gravação falhar, rollback integral. Se duas correções concorrem, impedir dois N+1 (UNIQUE+lock).

**Não adotar:** UPDATE que substitui texto do original; sobrescrever o JSON original; apagar registro antigo; correção que troca titular ou tipo sem validação; usar apenas autoria original como permissão.

## Anexos

Metadados de documento/imagem: autor, recurso pai por FK, nome original, MIME validado, tamanho, checksum e chave de armazenamento opaca. Proposta: armazenamento privado de objetos e autorização antes de conceder URL temporária de leitura. Não fazer storage_path público. Verificar antivírus/limites/retencão antes da implementação.

Destinos visuais conhecidos: T06 e T10. **PENDENTE:** anexo também a recomendação/administração e vínculo com versões corrigidas? Não criar área principal Documentos.

## Auditoria — esquema conceitual

Por evento: identificador único, instante, ator (pode ser desconhecido), categoria/papéis vigentes no momento, rede/idoso quando aplicável, ação, tipo de recurso, resultado ALLOW/DENY/ERROR, correlacao_id para rastreio, resumo mínimo não sensível. Registrar exportações, acesso negado, escrita em saúde, alteração de papel/plantão e correções.

Auditoria é distinta do histórico clínico/cuidado:
- Histórico T07: fatos e versões **do cuidado**, filtrados por autorização.
- Auditoria T17: ações **sobre o sistema**, com acesso restrito; não deve conter senhas ou payload clínico em texto.
- Não apagar usuário/membro histórico em CASCADE quando usado em auditoria.
- Política de retenção, cumprimento de direitos de titulares e eventual anonimização precisam de avaliação legal/técnica.

## CSV

- Validar no servidor usuário Principal da rede/idoso selecionado, a cada solicitação.
- Aplicar o mesmo escopo de autorização do histórico T07; não exportar tudo e filtrar no browser.
- Registrar autor, contexto, instante, operação, resultado e identificador de correlação sem copiar arquivo para auditoria.
- CSV deve ser produzido somente pelo fluxo autorizado; separadores, codificação, fuso e proteção contra fórmula CSV são detalhes pendentes da implementação.
- Exportação rejeitada também é evento auditável de acesso indevido.

## Testes essenciais

- Correção de outro autor com direito atual: permitida; sem direito atual: negada.
- Duas correções simultâneas: versões distintas ou uma delas conflito; nunca duplica número.
- Desvinculação posterior: histórico anterior continua acessível a usuários autorizados, não ao desvinculado.
- Arquivo pertencente a idoso B nunca servido a sessão autorizada apenas para idoso A.
- Exportação por Apoio mesmo com papel acumulado Apoio/Emergência mas sem Principal: negada.


## Auditoria arquitetural posterior — 2026-10-09

Este capítulo inicial descreve os objetivos; os contratos detalhados foram separados em:
- [28 — Duas arquiteturas de correção e versões](28_ARQUITETURAS_CORRECAO_VERSIONADA.md);
- [29 — Anexo, auditoria e CSV](29_ANEXOS_AUDITORIA_EXPORTACAO.md);
- [30 — 36 cenários V-T](30_CASOS_DE_MESA_HISTORICO_PRIVACIDADE.md);
- [31 — 20.300 simulações em memória](31_EVIDENCIAS_SIMULACAO_CORRECOES.md).

**Atenção:** o termo “registro de cuidado” de RNF02 não define sozinho todos os subtipos clínicos; o DDL precisa aguardar DB-008/DB-034. A estratégia de append-only exige proibir atualizações corretivas diretas, preservar o original, garantir versão íntegra e resolver o caso de auditoria da negação após rollback (DB-038).
