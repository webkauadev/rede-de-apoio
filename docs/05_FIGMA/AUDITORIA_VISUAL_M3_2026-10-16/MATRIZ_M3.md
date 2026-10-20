# Matriz de conformidade Material 3

Categorias: **Conforme**, **Divergente**, **Não aplicável**, **Não verificável**. Conforme refere-se somente ao recorte declarado. A matriz não é um parecer de homologação funcional.

| Diretriz | Resultado no recorte | Evidência / limite |
|---|---|---|
| Quatro destinos primários, ícone + label, seleção tonal | Conforme | Bases autenticadas; referência 6223:6681; variables Secondary Container #EBE8FA e On Secondary Container #00567C |
| Configurações no header/Management Sheet | Conforme | Settings 6223:8965 e master 5652:443 renderizados; funcionamento aceito manualmente em documento próprio |
| Largura e legibilidade de CTAs | Divergente | VIS-001, quinze composições medidas; rótulo de 163 px dentro de botão de 71,5 px |
| Altura/área mínima de toque dos controles inspecionados | Conforme | Botões críticos continuam acima de 48×48; Header Back 48×48; wrappers de Switch 48/68×48. Não é inventário de todos os hotspots |
| Separação dos botões adjacentes | Conforme | Linha problemática mantém gap 12; outras linhas inspecionadas 8/12. O problema é largura, não gap inferior a 8 |
| Filled / Outlined / Text por hierarquia | Conforme | CTAs primários, Cancelar secundário e links de menor ênfase na amostra; sem exigência de filled em toda ação |
| Botões Loading/Disabled existentes | Conforme | Login Loading e estados inválidos renderizados; mesma altura. VIS-007 é o rótulo auxiliar, não o spinner |
| Pressed/hover e acessibilidade nativa | Não verificável | Não houve interação nem aplicação executada; ausência de captura não foi classificada como ausência de variante |
| Conteúdo sem recorte acidental | Divergente | VIS-002 e VIS-003; limite da exportação foi tratado separadamente |
| Grid de página 390/16/358 | Divergente | VIS-006 nas quatro seleções de papéis; 17 roots medem 390×844 |
| Destino como Row e entidade como Card | Divergente | VIS-005 em T12; referência Settings/Destination Row verificada |
| Bottom Sheets dos cinco cadastros contextuais | Conforme | Geometria 358×704 em frame 390×844, padding 16 e controles adequados nas amostras; sem transformação em drawer/full-page |
| Tela-base sob Sheet, gesto, Back e scroll real | Não verificável | Capturas de overlay/painel não equivalem ao Presentation. Nenhuma reexecução funcional foi feita |
| Handle: geometria e legibilidade | Não verificável | Metadata confirma row de 48 e barra 40×4 nos cinco baselines; exports de alguns estados omitem layers. Não há conclusão global de presença visual em todo estado |
| Tipografia Geist e piso estrutural de 14 px | Conforme | Contextos consultados e capturas; sem nova varredura indiscriminada de centenas de estados |
| Contraste de textos e pares semânticos inspecionados | Conforme | Erros verificados resolvem #B3261E; conteúdo usa On Surface/Variant. Sem recertificar todos os textos, opacidades e imagens do arquivo |
| Contorno essencial de campo ≥3:1 / Border Interactive | Divergente | VIS-004; valor atual #E5E5E5 e contrastes 1,14–1,20 nas surfaces das composições |
| Surface / Container / On Container e scrim | Divergente | Seleção/nav em pares corretos; VIS-008: scrim ≈36% versus referência aprovada ≈32% |
| Consistência de rótulos em estados irmãos | Divergente | VIS-007: Loading troca o link auxiliar |
| Histórico de detach e mainComponent de toda instância | Não verificável | Ferramentas disponíveis não expõem integralmente esses vínculos. T12 é comprovadamente frame manual, sem alegação de detach |
| Responsividade desktop, Navigation Rail, SDK Material | Não aplicável | Escopo mobile 390×844; identidade e primitives do projeto preservadas |

## Cobertura por tela

| Tela | Composições inspecionadas | Resultado visual no recorte | Achados |
|---|---|---|---|
| T01 | default, invalid_credentials e loading | Divergente | VIS-007 |
| T02 | default, validation_error e confirmação sem sessão | Conforme — amostra sem novo defeito confirmado | — |
| T03 | default e N04 transitório | Conforme — amostra sem novo defeito confirmado | — |
| T04 | semana comum/read-only; criar, cancelar e responder troca; seis operações medidas | Divergente | VIS-001, VIS-002 |
| T05 | base de detalhamento do dia | Conforme — amostra sem novo defeito confirmado | — |
| T06 | base comum/read-only; Sheet normal/erro | Divergente | VIS-004, VIS-008 |
| T07 | base e versão vinculada | Conforme — amostra sem novo defeito confirmado | — |
| T08 | lista, empty, Sheet normal/erro; posologia/administração A; oito ações de A/B/C/Item A medidas | Divergente | VIS-001, VIS-008 |
| T09 | base, todas concluídas e Sheet normal/erro | Divergente | VIS-008 |
| T10 | base, empty, Sheet normal/erro e anexo | Divergente | VIS-008 |
| T11 | base e Sheet normal/erro | Divergente | VIS-008 |
| T12 | view, acesso inativo, convite enviado e acesso ativo | Divergente | VIS-003, VIS-005 |
| T13 | base, seleção de papéis 3 e constituição; quatro seleções medidas | Divergente | VIS-001, VIS-006 |
| T14 | base, edição e resultado de Carlos | Divergente | VIS-004 |
| T15 | base, com render alternativo do header/contexto | Conforme — amostra sem novo defeito confirmado | — |
| T16 | Principal, Apoio opcional e saved | Conforme — amostra sem novo defeito confirmado | — |
| T17 | base, detalhe e forbidden | Conforme — amostra sem novo defeito confirmado | — |

## Referências de componentes verificadas no arquivo de trabalho

| Componente/padrão | ID atual confirmado | Evidência / limite |
|---|---|---|
| Design Foundation | 5639:21448 | Metadata da página; arquivo ljFSoPfNcvDgZtdR2sHmti |
| Button - Nova | 1953:29720 | Descrição de componente no contexto de Login, papéis e novos overlays |
| Action / Touch Target 48 | 5644:324 | Símbolo presente na Foundation; exemplos 5641:155 renderizados |
| Field / Control / Touch Target 48 | 5644:330 | Símbolo, render e definições de variáveis atuais |
| Input / valor | 1953:19055 | Definição retornada no contexto de edição do contato; instâncias 8006:33705/33708/33711 medidas |
| Select / Categoria | 6223:9150 | Instância atual, metadata 36 px dentro de wrapper 48 e variables resolvidas; mainComponent exato não foi certificado |
| Checkbox | I8010:12368;2255:18606 e I8010:12369;2255:18606 | Instâncias reais do estado de papéis; wrappers 342×48. Vínculo completo com o master não certificado |
| Switch | 6223:6828 / 6223:6834 | Instâncias e wrappers 48×48 no contexto; Disabled checked distinto de opção editável |
| Card | 5640:21509; card local 6223:8919 | BaseCard existe na Foundation; card de acesso local possui clipping confirmado |
| Badge | 6223:6650 / 6223:6655 | Instâncias reais em T09, categoria/estado com ênfases distintas |
| AppHeader Root / Tinted e Back | 5746:157 / 5640:21512 | IDs resolvidos por metadata no arquivo de trabalho; Back renderizado e referenciado pelo contexto |
| NavigationBar | 5652:442; instância 6223:6681 | Foundation e render atual; quatro destinos e cores resolvidas |
| LocalSubnav Saúde, Diário, Controle | 5810:1005 / 5830:358 / 5912:1699 | IDs encontrados em Foundation/contextos; instância Saúde 8029:17028 mede 424 px |
| Settings Sheet e Destination Row | 5652:443 / 5662:21869 | IDs verificados; comparação visual com 6223:8965 |
| Bottom Sheets operacionais | 6223:9143 / 8968 / 9021 / 9053 / 9104 | Frames de composição; não foi inventado um master de Bottom Sheet ausente do contrato |

IDs abreviados na última linha mantêm o prefixo 6223:. A existência de um símbolo não garante que toda instância do arquivo o reutilize corretamente. Nenhuma Foundation foi modificada.
