# Decisão de integração e aceite de ressalvas — Milestone 2

**Data:** 2026-10-16  
**Projeto:** Rede de Apoio a Cuidadores de Idosos  
**Decisão solicitada pelo responsável no chat:** integrar as branches de auditoria e correções, aceitar as pendências documentais/operacionais como ressalvas e encaminhar a correção final do MySQL Workbench ao Codex.

## O que está autorizado

1. Integrar o histórico de `audit/uml-milestone2-final` à branch `docs/estudo-uml-milestone2`, preservando os relatórios que registraram **REPROVADO PARA HOMOLOGAÇÃO** em 16/10/2026.
2. Integrar os commits de `fix/uml-milestone2-homologacao` em `docs/estudo-uml-milestone2` e depois em `main`, com registro explícito do estado **"correções em andamento / não homologado"**.
3. **Aceitar administrativamente como ressalvas pendentes** os achados P2 (incluindo a cobertura navegável do protótipo), as pendências acadêmicas PE-01–PE-04 e as pendências P-UML-01–05, sem transformar ausência de evidência em PASS.
4. Prosseguir com a tarefa remanescente AUD-M2-003 por Codex no ambiente com acesso real ao MySQL Workbench, corrigindo e reexportando as cinco vistas EER e atualizando Figma depois de comprovar a fidelidade.

## O que a decisão NÃO certifica

- Não declara que professor ou banca aprovou os diagramas; apenas o usuário autorizou a **consolidação do repositório** e aceitou o registro de limitações como ressalvas.
- Não declara que `rede_de_apoio_v1.mwb` foi aberto ou salvo com êxito no Workbench gráfico, nem que os arquivos `diagrama_*.svg/png` já foram reexportados.
- Não autoriza a afirmar que os cinco EER atualmente incorporados no Figma estão corretos: eles mantêm avisos de **reexportação pendente**.
- Não converte em funcional a navegação não comprovada dos fluxos de troca de plantão e administração de medicamentos.
- Não autoriza alterações do DDL V1 `entrega/sql-eer/01_schema_completo_v1.sql`, migrações no banco de produção, criação de funcionalidades não aprovadas ou sobreposição de evidências históricas.
- Não encerra automaticamente AUD-M2-003 nem muda o parecer de auditoria para APROVADO.

## Critérios para encerramento operacional do AUD-M2-003

- Arquivo `.mwb` desta linha de integração abre no aplicativo Workbench, com 34 tabelas e 79 FKs;
- todas as 79 FKs têm obrigatoriedade e máximos interpretados conforme nulidade e UNIQUE reais do SQL;
- `fk_rede_pessoa` apresenta `PessoaIdosa [1] — [0..1] RedeCuidado`;
- comparação sem diferenças estruturais no SQL V1; CHECKs continuam fundamentados no SQL, não presumidos no EER;
- os cinco recortes EER nativos de Workbench são reexportados (SVG/PNG) e incorporados nos Node IDs atuais do Figma, sem excluir versões de backup;
- os alertas provisórios dos EER são removidos somente **após** inspeção real dos substitutos e registro de evidências.

## Pós-integração

O PR de auditoria #128 será mantido como evidência do parecer anterior, inclusive após o merge. O relatório [STATUS-CORRECOES-M2.md](STATUS-CORRECOES-M2.md) continua sendo a fonte do status de cada AUD-M2-001–013; este documento registra o **aceite de ressalvas para integração**, não uma nova auditoria.

**Estado da entrega na data desta decisão: INTEGRÁVEL COM RESSALVAS / AINDA NÃO HOMOLOGADA.** Um eventual parecer `APROVADO COM RESSALVAS` para apresentação depende da finalização do AUD-M2-003 e da verificação final correspondente.
