# AUD-M2-003 — abertura e reexportação nativas (2026-10-16)

**Resultado no GitHub:** modelo corrigido e salvo no MySQL Workbench real; reabertura em processo independente e seis exportações SVG/PNG concluídas. Atualização dos cinco frames do Figma permanece etapa posterior, fora desta missão. Não se declara homologação global da auditoria nem atualização do Figma.

## Ambiente executado

Ubuntu 24.04.5 LTS amd64, MySQL Workbench CE 8.0.47, build 5817297, Cairo 1.18.0 e Xvfb 21.1.12. Pacote Oracle oficial [mysql-workbench-community_8.0.47-1ubuntu24.04_amd64.deb](https://cdn.mysql.com/Downloads/MySQLGUITools/mysql-workbench-community_8.0.47-1ubuntu24.04_amd64.deb), SHA-256 `55b6700e23177596bd6cce0da22aaec4f942a58d3ffe2176e94029e1ec0e5f3a`. Dependências dos repositórios Ubuntu, versões e hashes em [packages.tsv](evidencias-workbench/packages.tsv).

Pacotes extraídos em diretório temporário, sem sudo, instalação no sistema ou acesso ao Docker existente. HOME/configuração próprios, locale en_US.UTF-8 gerado localmente, Xvfb sem TCP e renderização por software. Nenhum MySQL Server foi iniciado, inspecionado ou conectado; nenhuma credencial foi necessária.

Docker foi descartado por acesso negado ao socket; sudo requer senha. A execução direta sem privilégios foi viável, portanto não foi necessário recorrer a runner remoto. A primeira inicialização falhou por locale ausente; a geração local resolveu. `dir()` não enumera os métodos dinâmicos GRT: isso não prova ausência de uma função. Chamadas efetivas a `Workbench.exportSVG` e `Workbench.exportPNG` retornaram **0** nas 12 exportações. `saveModelAs(path)` é a assinatura de salvamento com destino; `saveModel()` não recebe argumento. Há aviso não bloqueador de descoberta de libproj; a biblioteca é resolvida via LD_LIBRARY_PATH e não participa do EER.

## Evidências executadas

- [Captura do aplicativo](evidencias-workbench/workbench-open.png): documento carregado, seis vistas e `Tables (34 items)` na GUI real em Xvfb.
- [Correção pela API nativa](evidencias-workbench/native-correction.json): flags anteriores e posteriores das 79 FKs; 34 tabelas; seis vistas; retornos e hashes das exportações; salvamento nativo.
- [Reabertura independente](evidencias-workbench/native-export.json): `inputSha256` corresponde exatamente ao `.mwb` entregue. Todas as flags `before` já coincidem com o valor validado; nenhuma correção adicional foi necessária. As imagens entregues são as exportações desse processo de reabertura.
- [Log Workbench](evidencias-workbench/wb.log) (somente whitespace normalizado para git diff --check), [log do processo](evidencias-workbench/process.log), [versão](evidencias-workbench/version.txt) e [Xvfb](evidencias-workbench/xvfb.log).
- [Comparação SQL↔MWB atual](evidencias-workbench/sql-mwb-comparacao.json): 34 tabelas, 305 colunas, 79 FKs, seis vistas; `comparison_differences: []` para tipos, nulidade, colunas FK, PK e UNIQUE. O verificador de artefatos também confere regras ON UPDATE/DELETE contra os metadados físicos históricos. As definições completas das tabelas antes/depois do salvamento foram comparadas e permaneceram iguais, exceto os três flags gráficos de cardinalidade.

Esta execução **não repete a importação MySQL**. As provas físicas anteriores permanecem históricas e intactas. Os 50 CHECKs continuam no SQL, sem alteração; o modelo Workbench não contém objetos CHECK, portanto as vistas não substituem a consulta dessas restrições no DDL.

## Cardinalidades

A inspeção do renderer oficial esclareceu a inversão da validação anterior: [update_line_ends](https://github.com/mysql/mysql-workbench/blob/8.0/backend/wbpublic/wbcanvas/workbench_physical_connection_impl.cpp) passa `mandatory/many` à extremidade inicial (tabela filha) e `referencedMandatory` à extremidade final (pai), conforme [update_relationship_figure](https://github.com/mysql/mysql-workbench/blob/8.0/backend/wbpublic/wbcanvas/workbench_physical_model_impl.cpp).

Revisão individual das **79 FKs** pela GRT e nova proteção no verificador versionado:

- `many=0` nas quatro FKs cujas colunas contêm uma chave única; `many=1` nas outras 75.
- `mandatory=0` nas 79 extremidades filhas: o DDL não exige que cada pai tenha filho.
- `referencedMandatory=1` nas 58 FKs com todas as colunas NOT NULL; `0` nas 21 FKs com alguma coluna anulável. FKs compostas seguem a semântica de nulidade do MySQL.
- `fk_rede_pessoa`: **many=0, mandatory=0, referencedMandatory=1**. A pessoa tem zero ou uma rede; cada rede tem exatamente uma pessoa. A UNIQUE `uq_rede_idoso_v1(pessoa_idosa_id)` e NOT NULL foram preservadas.

[PNG diagnóstico nativo](evidencias-workbench/fk_rede_pessoa-native.png) / [SVG diagnóstico nativo](evidencias-workbench/fk_rede_pessoa-native.svg) mostram exclusivamente essa conexão, com `||` junto a pessoa e `o|` junto a rede. Para esse diagnóstico, outras conexões foram ocultadas temporariamente e restauradas antes do salvamento; os seis diagramas entregues preservam todas as conexões aplicáveis. O desenho geral tem cruzamentos inerentes às 79 relações; as vistas temáticas e o diagnóstico auxiliam a revisão.

## Exportações nativas entregues

| Vista | Tabelas / conexões | SVG | PNG |
|---|---|---|---|
| Geral | 34 / 79 | [SVG](diagrama_geral.svg) | [PNG](diagrama_geral.png) |
| Identidade e rede | 10 / 14 | [SVG](diagrama_identidade_rede.svg) | [PNG](diagrama_identidade_rede.png) |
| Agenda e tarefas | 11 / 30 | [SVG](diagrama_agenda_tarefas.svg) | [PNG](diagrama_agenda_tarefas.png) |
| Medicação | 10 / 22 | [SVG](diagrama_medicacao.svg) | [PNG](diagrama_medicacao.png) |
| Diário e consultas | 11 / 25 | [SVG](diagrama_diario_consultas.svg) | [PNG](diagrama_diario_consultas.png) |
| Suporte técnico | 10 / 20 | [SVG](diagrama_suporte_tecnico.svg) | [PNG](diagrama_suporte_tecnico.png) |

SVGs parseados, com conteúdo vetorial; PNGs decodificados e não uniformes, dimensões mínimas superiores a 1000 px. O check versionado valida também CRC e descompressão de cada PNG. Arquivos anteriores só foram substituídos após abertura, comparação estrutural e validação de todas as imagens em staging. [Manifesto SHA-256](evidencias_integridade.json) atualizado, incluindo novas provas e scripts.

## Reprodução sem instalação no sistema

Requer host Ubuntu 24.04 amd64 com dependências básicas GTK/Python do desktop, apt, curl, dpkg-deb, localedef, timeout e acesso de leitura aos repositórios oficiais. Não é uma imagem universal de distribuição nem instala dependências faltantes no sistema.

```bash
entrega/sql-eer/tools/run_native_workbench.sh \
  entrega/sql-eer/rede_de_apoio_v1.mwb /tmp/rda-wb-primeira
entrega/sql-eer/tools/run_native_workbench.sh \
  /tmp/rda-wb-primeira/rede_de_apoio_v1.mwb /tmp/rda-wb-reabertura
python3 entrega/sql-eer/tools/verify-artifacts.py
```

O [script de provisionamento](tools/run_native_workbench.sh) foi executado com sucesso nesta sessão, incluindo novo download com SHA fixado, extração, locale, Xvfb com display livre, abertura, 12 exportações, diagnóstico e salvamento. Ele limpa apenas seu próprio diretório temporário e seu processo Xvfb, preservando o diretório de saída. Não aponte a saída para `entrega/sql-eer/`: valide o staging antes de promover arquivos.

Parâmetros consultados no [manual oficial](https://dev.mysql.com/doc/workbench/en/wb-command-line-options.html): `--model` abre modelo, `--run-python` recebe código, `--run-script` recebe arquivo Python, `--quit-when-done` encerra após execução. Foram executados `--model`, `--run-script` e `--quit-when-done`. O script chama também `Workbench.openModel` explicitamente, pois a execução de script pode anteceder a abertura agendada por `--model`.

Publicação e checks da revisão ficam registrados no PR. O merge desta missão foi expressamente autorizado pelo solicitante, condicionado aos checks necessários verdes. Nenhum UML, protótipo, SQL ou frame Figma foi alterado.
