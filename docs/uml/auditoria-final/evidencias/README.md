# Evidências de auditoria

Os PNGs de nome `node-id.png` são capturas reais dos 19 frames atuais, sem reconstrução ou anotação sobre o desenho. JSONs homônimos contêm resposta de leitura do Figma; `*-conexoes.json` guardam paths/dashes/fills das linhas e pontas.

Para JSON com envelope MCP: ler `content[0].text` como JSON. Nos diagramas editáveis, cada linha de `nodes` tem `[id, parentId, type, name, x, y, width, height, characters, fontSizeOuRotacao]`; coordenadas são locais ao pai. Nos EER há metadados dos filhos importados. Dimensões de vetores antes da transformação não representam necessariamente seu tamanho visual.

`inventario-pagina.json` registra a faixa da apresentação, incluindo quatro versões antigas. `prototipo-acoes.json` registra textos e reactions de T04/T05/T08/cadastro; `prototipo-busca.json` registra busca estrutural de troca/regime/administração na página canônica.

`comparar_sql_mwb.py` usa Python + lxml, lê SQL e XML do `.mwb` em modo somente leitura e atualiza `sql-mwb-comparacao.json` nesta pasta. Executar da raiz com `python docs/uml/auditoria-final/evidencias/comparar_sql_mwb.py`. É ferramenta de evidência estática delimitada, não teste de execução MySQL nem validador universal de DDL. `achados.json` é catálogo estruturado dos mesmos 13 achados do relatório.

O manifesto registra SHA-256 das fontes físicas e evidências presentes. Figma pode mudar depois da captura; os PNGs documentam o estado auditado. Arquivos acadêmicos originais não foram republicados. Nenhum dado real de cuidado foi coletado; textos de demonstração são os já existentes no protótipo do projeto.
