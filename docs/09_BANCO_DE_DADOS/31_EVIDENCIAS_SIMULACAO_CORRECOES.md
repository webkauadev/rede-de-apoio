# 31 — Revisão de raciocínio: imutabilidade, ACL de anexos e CSV

**Data:** 2026-10-09. **Método:** 20.300 verificações de predicados em memória com objetos fictícios em JavaScript temporário. **Todas as 20.300 satisfeitas no modelo simplificado; nenhuma prova de MySQL, storage ou API.**

## Resultado e composição exata

| Classe | Instâncias | Asserções |
|---|---:|---:|
| Criação append-only, versão N, original preservado, negação por permissão/escopo/tipo, versão obsoleta, versão N+1 | 1.500 iterações × 9 | **13.500** |
| Verificação simplificada de CSV para Principal ativo no contexto e negação entre contextos | 2.000 × 2 | **4.000** |
| ACL de anexo por titular autorizado, vínculo ativo, recurso existente e arquivo validado | 1.200 × 1 | **1.200** |
| Sanitização ilustrativa de campos senha/token/anotação sensível e preservação de resultado | 400 × 4 | **1.600** |
| **TOTAL** | | **20.300** |

**Limitação da demonstração:** os exemplos usam igualdade de valores/objetos de teste e modelos simples, não autorização real em banco; a origem do contexto é sintética, não houve conexão MySQL, verificação de FK/constraint, upload de arquivo, log persistido, escape CSV, lock, concorrência ou execução de endpoint. Não declarar as 20.300 asserções como “20.300 testes de integração”. Não somá-las indevidamente às baterias das etapas de núcleo e temporal.

## Regras de referência simuladas

- A versão nova é acrescentada a uma cópia da lista de versões, com número N+1; objeto de conteúdo original não foi modificado.
- Uma solicitação com permissão atual ausente, titular errado ou tipo diferente é rejeitada na abstração.
- Uma tentativa de usar expectedVersion já obsoleta gera conflito em vez de sobrescrever.
- CSV é permitido apenas para usuário que seja simultaneamente Principal, ativo e no contexto de exportação.
- Anexo só é lido se recurso existe, estado READY, ator ativo e ator autorizado ao titular no predicado.
- Log sanitizado remove campos simulados de senha, token e nota clínica, preservando operação e resultado.

## Problemas que continuam sem resposta técnica aprovada

- O modelo único de registro+subtipos versus fatos específicos por domínio (DB-008/034).
- A possibilidade de corrigir ocorrência/hora real/tipo e como lidar com revogação de versão (DB-036).
- Associação de anexo com original/versão, upload bifásico e limites (DB-013/037).
- Auditoria de operação negada quando há rollback do dado protegido (DB-038).
- Direitos de titulares e retenção legal (DB-018).
- CSV assíncrono após transferência de Principal (DB-038).

## Próximo passo de validação MySQL

Criar schema descartável **apenas em etapa autorizada**, formalizar FKs/categorias; simular 2 sessões concorrentes criando V2, uso de trigger/SQL com privilégios restritos, rejeições entre redes, transações e política de log; testar armazenamento privado real. Todos os resultados precisam de SQL/commits/logs reproduzíveis.

## Referências

https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html ;
https://dev.mysql.com/doc/refman/8.4/en/stored-program-restrictions.html ;
https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html ;
https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html .
