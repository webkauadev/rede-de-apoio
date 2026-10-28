# Termo de homologação documental — Modelagem Geral Integrada

**Projeto:** Rede de Apoio a Cuidadores de Idosos  
**Data de aceite do solicitante:** 27/10/2026 (America/Porto_Velho)  
**PR de entrega:** [#134 — Modelagem Geral Integrada](https://github.com/webkauadev/rede-de-apoio/pull/134)  
**Decisão:** **DOCUMENTAÇÃO HOMOLOGADA PELO SOLICITANTE COM RESSALVAS**, autorizada a incorporação na branch `main` por merge do PR #134.  
**Limite da homologação:** *documental e de versionamento*, não acadêmico nem funcional/de segurança. Esta instrução do solicitante não equivale a nota, avaliação ou parecer dos professores.

## Objeto da homologação

O aceite abrange os **arquivos em `docs/uml/modelagem-geral/`** que documentam as perspectivas do projeto e links aos respectivos frames no Figma:

| Artefato | Referência | Conteúdo aceito como documento |
|---|---|---|
| AT-G | [Figma](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6431-3326) | Diagrama seletivo da jornada de cuidado, com autorização antes da leitura/escrita e correção versionada |
| UC-G | [Figma](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6432-3326) | 16 casos de uso executivos, **não** cobertura integral de 36 US |
| CL-G | [Figma](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6434-3326) | 16 classes essenciais; 18 relações canônicas; 36 valores de multiplicidade |
| SQ-G | [Figma](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6433-3326) | 7 participantes; mensagens M01–M15 + retorno M09R; 9 barras de ativação; serviços inferidos |
| DB-G | [Figma](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6435-3326) | 17 das 34 tabelas reais, 11 trechos de relação física exemplificativos |
| EER-G | [Prancha de referência](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6438-3326) · [SVG integral](../../../entrega/sql-eer/diagrama_geral.svg) | EER geral preexistente com 34 tabelas/79 FKs; **a prancha do Figma não contém o SVG completo incorporado** |

Histórico técnico/rastreabilidade preservados nos documentos:
- [Auditoria inicial](AUDITORIA-2026-10-27.md).
- [Terceira rodada — achados e correções](AUDITORIA-RODADA-3-2026-10-27.md).
- [Quarta rodada — correção das cinco associações e barras UML](AUDITORIA-RODADA-4-2026-10-27.md).
- [Matriz de rastreabilidade UC/CL/SQ/DB](MATRIZ-RASTREABILIDADE-2026-10-27.md).
- [Manifesto estrutural do Figma](MANIFESTO-FIGMA.json).

## Aceite e ressalvas expressas

1. **Aprovado para versionamento:** o solicitante autorizou expressamente a incorporação e homologação da documentação nesta conversa, em 27/10/2026. O documento é uma base oficial de **documentação aprovada pelo projeto**, com trilha de auditoria.
2. **Não homologado academicamente:** não houve parecer independente/professor sobre cardinalidades, completude de objetivos, notação da banca ou leitura em projetor. As auditorias técnicas internas continuam como evidências, inclusive as limitações declaradas.
3. **Não comprova implementação:** serviços de sequência inferidos, fluxos alternativos não modelados e ausência de testes de runtime não podem ser apresentados como funcionalidades em produção.
4. **EER físico preservado:** a documentação referencia os artefatos MySQL/Workbench originais; não altera DDL, MWB, dados, nem simula que o EER integral está embutido no Figma.
5. **Exceção de CI documentada:** no PR #134 o job `application` **falhou no `npm audit --omit=dev --audit-level=high`** devido a advisories em Next.js (crítica) e Zod (alta). O job `validate-agent-context` passou. **O PR modifica apenas documentação**; não resolve ou altera dependências. O acompanhamento técnico está registrado na [issue de segurança #135](https://github.com/webkauadev/rede-de-apoio/issues/135). A `main` já apresentava CI vermelha por formatação no commit-base consultado.
6. **Sem autorização de deploy:** este aceite não libera aplicação para produção, uso de dados reais nem dispensa correções de segurança.

## Política após o merge

- **Status do diretório:** `HOMOLOGADO_DOCUMENTALMENTE_PELO_SOLICITANTE_COM_RESSALVAS`.
- **Escopo da mudança de status:** conteúdo e rastreabilidade da documentação geral, **não** homologação dos 19 artefatos anteriores, da UML completa ou do protótipo.
- A documentação homologada pode ser usada como **versão-base de apresentação**, identificando visivelmente os diagramas seletivos e as pendências.
- Ajustes futuros ao escopo, relações derivadas, PR de segurança e aprovação acadêmica devem ter registro próprio, sem reescrever o histórico destas auditorias.

**Assinatura de decisão:** autorização expressa do **solicitante na conversa de 27/10/2026**. Não foram colhidas assinatura externa nem aprovação dos professores; não as atribuir a este termo.
