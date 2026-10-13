# Entrega SQL + EER — Issue #124 / PR #125

Ensaio realizado em **2026-10-13**, exclusivamente na branch `chore/entrega-sql-eer-v1`. O pacote SQL único foi importado **uma vez** em schema previamente inexistente, no MySQL **8.4.11** local descartável. O modelo nativo foi salvo e reaberto pelo **MySQL Workbench 8.0.47-1ubuntu24.04**, em processos separados. Entrega técnica disponível para revisão humana; nenhum merge ou deploy autorizado.

## Evidência desta execução

| Verificação | Resultado real |
| --- | --- |
| Importação de `01_schema_completo_v1.sql` | PASS, uma importação, banco novo |
| Tabelas / engine | 34 / todas InnoDB |
| PRIMARY KEY | 34 |
| FOREIGN KEY | 79, nomes, tabelas, colunas ordenadas e regras conferidos |
| CHECK | 50 |
| UNIQUE secundárias | 44, além das 34 PK |
| Casos negativos estruturais | 8 PASS; rollback; todas as 34 tabelas vazias |
| `.mwb` reaberto em outro processo Workbench | 34 tabelas, 79 FKs completas |
| Diagrama geral reaberto | 34 figuras, 79 conexões |
| Vistas adicionais no mesmo modelo | 5; exportadas em SVG e PNG |
| Validações locais de contexto / SQL / snapshot / backlog / artefatos | PASS |

Arquivos de prova:

- [Importação e consultas reais](validacao_sql_real.json), incluindo `SHOW CREATE TABLE` dos recursos selecionados pelo runbook.
- [Metadados reais completos de FKs, CHECK e índices únicos](estrutura_fisica.json).
- [Oito casos negativos, códigos MySQL e rollback](testes_estruturais.json).
- [Criação nativa](workbench_criacao.json), [reabertura nativa e conferência das FKs](workbench_reabertura.json), [vistas temáticas](workbench_vistas.json).
- [Hashes SHA-256 dos artefatos e evidências](evidencias_integridade.json).

Estas provas foram produzidas na execução da Issue #124. Não reutilizam ensaios das US-002/003 como comprovação da importação consolidada.

## Modelo e diagramas

Abrir [rede_de_apoio_v1.mwb](rede_de_apoio_v1.mwb) no Workbench. O catálogo contém as 34 tabelas e as 79 relações; o documento contém seis diagramas. As vistas repetem figuras das mesmas tabelas do catálogo, sem duplicar tabelas físicas. Nas vistas temáticas, verde identifica as quatro tabelas de contexto comuns; azul identifica o recorte do domínio. Relações com tabelas fora do recorte ficam no diagrama geral.

| Diagrama | Tabelas / conexões | Exportações nativas |
| --- | --- | --- |
| Geral | 34 / 79 | [SVG](diagrama_geral.svg), [PNG](diagrama_geral.png) |
| Identidade e rede | 10 / 14 | [SVG](diagrama_identidade_rede.svg), [PNG](diagrama_identidade_rede.png) |
| Agenda e tarefas | 11 / 30 | [SVG](diagrama_agenda_tarefas.svg), [PNG](diagrama_agenda_tarefas.png) |
| Medicação | 10 / 22 | [SVG](diagrama_medicacao.svg), [PNG](diagrama_medicacao.png) |
| Diário e consultas | 11 / 25 | [SVG](diagrama_diario_consultas.svg), [PNG](diagrama_diario_consultas.png) |
| Suporte técnico | 10 / 20 | [SVG](diagrama_suporte_tecnico.svg), [PNG](diagrama_suporte_tecnico.png) |

Engenharia reversa executada **dentro do Workbench**, por seu módulo nativo `DbMySQLRE`, conectado ao servidor descartável. O módulo de parsing por tabela deixou referências futuras sem objeto pai: a primeira inspeção encontrou 79 FKs, mas somente 17 conexões renderizadas. Os vínculos GRT foram restaurados usando exclusivamente `information_schema` desse servidor: tabela pai, colunas compostas em ordem, `UPDATE_RULE` e `DELETE_RULE`. O banco e o DDL não foram alterados. O Workbench então salvou o modelo com `saveModelAs` e o reabriu com `openModel`; a conferência final exigiu **79 conexões**, e cada FK foi comparada aos metadados físicos. Nenhum XML do modelo foi escrito manualmente. Uma tentativa preliminar enquanto o DDL ainda importava também foi rejeitada pelo gate de 34 tabelas; só o modelo completo integra a entrega.

Exports produzidos pelas APIs nativas `exportSVG` / `exportPNG`. Diagrama geral e vistas foram inspecionados visualmente. A verificação offline adicional abre o ZIP nativo somente para leitura, resolve seus IDs e confere tabelas, referências, colunas, regras, conexões e arquivos de imagem.

## Ambiente e isolamento

Host Fedora 44, x86_64; Node 24.18.0, npm 11.16.0, Python 3.14.7. Podman rootless; dependência `mysql2/promise` já presente no projeto.

MySQL criado em contêiner novo `rede-apoio-sql-eer-6663949deeb6`, label `rede-apoio.sql-eer.disposable=true`, porta **127.0.0.1:43769**, sem montar volume preexistente. Imagem oficial `docker.io/library/mysql:8.4`, ID `8d132912e9d3c985237567595ec2aeae04936044eb1f9336e8e4da2326238b84`.

Workbench executado em contêiner novo `rede-apoio-eer-workbench-124`, mesma label de descarte, a partir da imagem local já disponível `localhost/mysql-workbench:2026-08-23`, ID `f7ae44d405cb862407d5c21fbac7d417863117351b0602f0162e60673c4c3f71`. Xvfb e xdotool foram instalados **apenas nesse contêiner novo**. O Xvfb forneceu uma tela virtual; os processos reais do Workbench criaram, reabriram e exportaram o documento. Nenhuma biblioteca do Fedora foi substituída. Os contêineres preexistentes `mysql-workbench` e `compat` não foram iniciados, reutilizados ou removidos.

Credenciais aleatórias e estado privado em diretório temporário com arquivos 0600, fora do repositório. A checagem de publicação verificou ausência da credencial efêmera nos arquivos de entrega e em cada entrada do `.mwb`.

**Limpeza:** realizada após salvar/reabrir/conferir/exportar o modelo. Apenas os dois contêineres próprios, o volume anônimo do MySQL próprio e o diretório temporário desta execução foram removidos, conferindo identificação e label. Imagens em cache e recursos preexistentes foram preservados.

## Comandos executados

A partir da raiz do repositório; `STATE` abaixo representa o caminho privado emitido pelo harness, sem credenciais:

```bash
node scripts/prepare_sql_eer_delivery.mjs --check
python3 scripts/validate_sql_prototype.py
node entrega/sql-eer/tools/disposable.mjs start
node entrega/sql-eer/tools/disposable.mjs import "$STATE"
node entrega/sql-eer/tools/structural-tests.mjs "$STATE"
node entrega/sql-eer/tools/capture-structure.mjs "$STATE"
# No contêiner exclusivo do Workbench, DISPLAY=:99:
mysql-workbench --run-script /delivery/tools/workbench_reverse.py --quit-when-done
mysql-workbench --run-script /delivery/tools/workbench_views.py --quit-when-done
mysql-workbench --run-script /delivery/tools/workbench_reopen.py --quit-when-done
python3 entrega/sql-eer/tools/verify-artifacts.py
python3 scripts/validate_agent_context.py
python3 scripts/validate_visual_snapshot.py
python3 scripts/validate_implementation_backlog.py
node entrega/sql-eer/tools/disposable.mjs stop "$STATE"
```

`import` executou o arquivo consolidado único, depois `02_validar_34_tabelas.sql` e `scripts/verify_mysql_sql_eer.mjs` com `SQL_EER_DISPOSABLE_CONFIRMED=YES` e configuração privada passada no ambiente do processo. O verificador imprimiu `PASS MySQL 8.4.11: 34 tabelas, 34 PK, 79 FKs, todas UNIQUE/CHECK conferidas; somente leitura.` Nenhum E2E, build, frontend ou API foi executado/alterado nesta entrega.

## Reprodução do modelo

Os [scripts](tools/) reproduzem as etapas: `start` cria recurso rootless próprio e emite o caminho privado; `import` recusa schema existente, verifica versão 8.4 e executa exatamente um arquivo. Os scripts de testes/captura/limpeza exigem identidade, label e binding loopback do contêiner.

Para repetir, use **outro** MySQL novo; aguarde o PASS completo de `import` antes da engenharia reversa. Disponibilize a pasta `entrega/sql-eer` como `/delivery` num Workbench isolado, e copie o estado privado para `/tmp/mysql-state.json` **somente nesse ambiente**, com permissão 0600. Inicie Xvfb se não houver desktop disponível e execute os três scripts Workbench na ordem indicada. Nenhum script provisiona Workbench ou acessa instância preexistente automaticamente. Se houver erro, confira os arquivos `/tmp/wb-error-*.txt` desse ambiente e não aceite evidências antigas. Após conferir os resultados, descarte somente os recursos criados no novo ensaio. Reexecuções alteram evidências/hashes; atualize-os em branch e PR próprios.

Para apenas revisar esta entrega, não é necessário iniciar MySQL: abra o `.mwb` e consulte as imagens/metadados. A importação manual posterior usa **01_schema_completo_v1.sql**, preservando `database/mysql/001...005` como fontes. O `.mwb` serve à inspeção visual; nenhum forward engineering ou reconstrução SQL a partir dele foi certificado.

## Limites e revisão

A DDL e os casos negativos comprovam integridade estrutural, não autorização contextual nem comportamento clínico. A exigência de pelo menos um Principal e um Profissional, elegibilidade de bootstrap DB-002, idempotência de serviços, serialização de operações e expiração efetiva de sessões continuam sob contratos e testes de aplicação. O CHECK de sessão testado assegura `expira_em > criado_em`; não certifica autenticação em runtime.

O workflow SQL-EER confere os artefatos offline e não executa MySQL, Workbench ou aplicativo. Checks do novo HEAD serão publicados no PR #125; revisão humana final continua pendente e o PR permanece Draft. SQL fontes, decisões, RF/RNF/US e critérios aprovados foram preservados. Nenhum dado real, produção, merge, deploy ou retomada do PR #123.
