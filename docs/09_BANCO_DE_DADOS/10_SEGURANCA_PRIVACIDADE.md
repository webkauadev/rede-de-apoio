# 10 — Segurança, LGPD e ameaças ao modelo

Dados de saúde e da vida de uma pessoa são especialmente sensíveis. **Orientações abaixo são requisitos técnicos propostos**, não substituem análise legal, definição de controlador/operador, base legal, finalidades ou política de retenção.

## Proteções indispensáveis a especificar

- **Menor privilégio:** autenticação não equivale a autorização; cada operação de leitura/escrita valida usuário, categoria, papéis atuais, contexto, rede, idoso e recurso.
- **Deny by default:** rota sem política explícita bloqueada, sem retorno de conteúdo clínico; log sanitizado do resultado.
- **Isolamento por rede/idoso:** todas as consultas, JOINs, downloads de anexo, agregações e exportações devem aplicar escopo do contexto, inclusive buscas por IDs diretos (evitar IDOR/BOLA).
- **Senha:** nunca texto claro, logs, histórico de versão ou e-mail. Se autenticação própria, hash lento aprovado (Argon2id recomendado pela OWASP ou alternativa adequada); o algoritmo real dependerá da stack.
- **Segredos:** fora do GitHub, dados de teste sintéticos; sem arquivos reais, dumps, certificados, URLs assinadas ou tokens no diretório.
- **Transporte/armazenamento:** TLS, controles de criptografia, backup/restauração e gestão de acesso a chaves conforme arquitetura escolhida.
- **Auditoria:** registrar negações, exportações e acesso sensível com detalhes mínimos; ocultar hashes de senha, tokens de sessão, textos clínicos e anexos.
- **Uploads:** limite de tamanho, tipo validado no conteúdo, verificação de malware e arquivo privado; acesso ao anexo sempre herda recurso-pai.
- **Privilégios do banco:** conta da aplicação sem DROP/ALTER; conta de migração separada; contas de análise com SELECT limitado; proibir UPDATE/DELETE direto nos originais de cuidado, conforme estratégia de retenção.
- **Retenção:** preservar conforme RNF02 no fluxo operacional, mas não declarar retenção eterna. Políticas de eliminação legal, acesso do titular, anonymização e backups precisam de decisão formal.
- **Logs públicos e telemetry:** nunca emitir conteúdo de saúde ou nomes completos na URL/stacktrace; controle de acesso também aos observadores do sistema.

## Modelo de ameaças mínimo (exemplos de testes futuros)

| Ataque/erro | Como deve reagir |
|---|---|
| Pessoa Idosa tenta POST /registros | 403, sem escrita e com evento auditável |
| Familiar da rede X consulta /idosos/Y | negação e auditoria sanitizada |
| Profissional removido tenta corrigir registro anterior | negar pela autorização atual |
| URL de objeto de anexo compartilhada | não permitir acesso sem autorização/validade |
| CSV gerado com dados de várias redes | falha de teste; consulta deve ser contextual |
| Log armazena medicamento/CPF/senha | falha de privacidade; minimizar dados |
| Arquivo malicioso com nome .jpg | verificar MIME real/conteúdo, rejeitar |
| Acesso negado gera log contendo payload secreto | sanitizar e testar limites |

## Questões de política ainda abertas

- Finalidade/base legal e responsável pelo tratamento; aviso/transparência.
- Campos concretos de saúde coletados e minimização por formulário.
- Retenção por categoria de dado e tratamento após desativação do usuário/término da rede.
- Localização de hospedagem, backup, rotação de chaves, incidentes e revisão de acessos.
- Direito à correção e à eliminação vs. necessidade de preservar rastreabilidade: especificação jurídica/funcional antes do DDL.
- Anonimização e ambientes de teste: somente dados fictícios nesta fase.

## Fontes externas estudadas

OWASP Authorization Cheat Sheet (verificação a cada requisição), Password Storage Cheat Sheet, Logging Cheat Sheet; documentação MySQL sobre integridade/locks; orientação ANPD para segurança da informação e identificação de dados de saúde como sensíveis. Links em [16_REFERENCIAS_TECNICAS.md](16_REFERENCIAS_TECNICAS.md).


## Complemento — modelo de acesso a anexos e logs

No estágio de desenho do banco, revisar [29](29_ANEXOS_AUDITORIA_EXPORTACAO.md): anexo somente por FK real e autorização herdada do recurso pai em toda leitura, armazenamento privado, validação de tipo real/tamanho e reconciliação de falhas upload↔metadado; auditoria sem payload clínico, senha ou token. Referências OWASP de File Upload, Logging e Authorization registradas em [16](16_REFERENCIAS_TECNICAS.md).

**Ponto não encerrado:** RNF02 preserva fatos históricos na operação comum, mas política LGPD de retenção/acesso/eliminação precisa de avaliação jurídica e decisão DB-018. Não afirmar dados guardados para sempre.
