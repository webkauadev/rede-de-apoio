# Execução das microcorreções visuais Material 3 — 16/10/2026

**Situação:** alterações VIS-001–VIS-008 **aplicadas** na página experimental; verificação estrutural direcionada concluída; **regressão interativa curta em Presentation pendente**.

**Autorização:** pedido explícito do solicitante para aplicar as correções diretamente. Auditoria de origem: [README](README.md), [achados](ACHADOS_VIS.md) e [plano](PLANO_MICROCORRECOES.md). Esta execução ocorreu **depois** do commit de auditoria `65eae32ccfdbc4e8578c29da958b24fc68806055`.

## 1. Escopo e preservação

| Objeto | FileKey / ID | Situação |
|---|---|---|
| **Arquivo Figma original externo** | `tcyj2fkTXei2CJbqaRxqCp` | **Nenhuma chamada de escrita enviada** |
| **Página-base do arquivo duplicado** | `ljFSoPfNcvDgZtdR2sHmti` / `5926:1014` | **Nenhuma chamada de escrita enviada** |
| **Página experimental autorizada** | `ljFSoPfNcvDgZtdR2sHmti` / `6223:6270` | **Único escopo de escrita** |

**Figma trabalho:** https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6270

Todas as mutações utilizaram o conector Figma, `fileKey=ljFSoPfNcvDgZtdR2sHmti`, após selecionar a página `6223:6270`. Não foram editados componentes mestres, collections de variables, bibliotecas, exigências funcionais ou regras de permissão; não houve alteração de reactions, troca de destinos ou merge do PR #127.

## 2. Resultado por VIS e micro-lote

| MV | VIS | Alteração real | Verificação obtida |
|---|---|---|---|
| MV-01 | VIS-001 (P1) | Nos **15** containers `Actions` dos overlays T04/T08/T13, usar 326×48; secundário 104×48; primário 210×48; gap preservado de 12. Instâncias Button e textos originais preservados. | **15/15** com rótulo principal contido na largura real; exemplo `8016:14070`, `8017:14683`, `8018:15845`. Capturas de cancelamento e administração sem recorte de CTA. |
| MV-02 | VIS-002 (P2) | No overlay de cancelar plantão, o texto funcional **“O plantão será cancelado; o histórico será preservado.”** passou a um `TEXT` local de 326×40, sem recorte. O Input antigo de linha única `8016:14147` ficou **oculto**, não removido, para preservar histórico/rollback. | Novo texto `8059:17072`; `Field / Confirmação` `8016:14145` mede 326×66. Captura renderizada `8016:14055` confirma mensagem em duas linhas e CTAs legíveis. |
| MV-02 | VIS-003 (P2) | Orientação do acesso ativo em T12 `6223:8927`: altura de **40→60 px**, mantendo fonte de 14 px e line-height 20. Card existente `6223:8919` expandiu via Hug de **230→250 px**. | Captura `6223:8895`: frase integral em três linhas, inclusive `concedida.`; confirmar alcance do botão Editar perfil por scroll no Presentation. |
| MV-03 | VIS-004 (P2) | Seis inputs T06/T14 passaram a usar o token existente **`color/border-interactive`** (`VariableID:5639:164`), cor resolvida `#6E8496`, espessura local 1 px. Não modificar master Obra/shadcn. | **6/6** com bound variable correta. T06: `6223:9150`, `6223:9158`, `6223:9162`; T14: `8006:33705`, `8006:33708`, `8006:33711`. Captura `8006:33693` mostra campos legíveis. |
| MV-04 | VIS-005 (P2) | **10** destinos `Destination /...` da T12 nos estados normal/sucesso/acesso/RO passaram de frames com card branco, stroke e raio 16 para **Row visual transparente**, preservando iconografia, subtítulo, chevron, dimensão 358×72, node IDs, hierarquia e links. | **10/10** sem fills, strokes ou radius. Capturas `6223:6704` e `6223:8895` coerentes com linguagem de Rows do Settings. **Nota:** não se trocou o frame local por INSTANCE do master `5662:21869`; essa decisão conservadora evita risco a reactions e conteúdo de duas linhas. A conformidade visual foi corrigida; a substituição estrutural por instância continua uma melhoria opcional sujeita a decisão específica. |
| MV-04 | VIS-006 (P2) | Em quatro seleções da T13, padding horizontal do `Main Content / Scroll` passou de **24→16 px**, com filhos em `FILL` e largura **358 px**. | **4/4** com x=16/largura 358: `8010:11975`, `6223:8291`, `8010:12198`, `8010:12354`. Captura `8010:12352` confirma grid uniforme e ações legíveis. |
| MV-05 | VIS-007 (P3) | Link auxiliar em Login Loading `6223:6919` padronizado de “Criar conta” para **“Usar convite”**, largura 83 px; reação preservada. | Captura `6223:6894` mostra label consistente com estado default. |
| MV-05 | VIS-008 (P3) | **32 scrims** locais `Modal Scrim` em overlays operacionais passaram de opacidade **0,36→0,32** conforme a referência M3/Foundation. Inclui T06/T08/T09/T10/T11 e seus overlays correlatos T04/T13, todos na mesma página experimental. | **32/32** com opacity ≈0,32, sem alterar `VariableID:5673:566` nem master compartilhado; exemplo `6223:8967`, `8016:14056`. |

## 3. Nós de MV-01 alterados

Os 15 containers preservados são:

`8016:13876`, `8016:13967`, `8016:14070`, `8016:14173`, `8016:14264`, `8016:15442`, `8017:14566`, `8017:14683`, `8017:15268`, `8017:15385`, `8017:15970`, `8017:16087`, `8018:15845`, `8025:16770`, `8025:16924`.

Os dois filhos Button de cada container também receberam largura explícita. A geometria, a identidade dos nós e o conteúdo dos rótulos foram verificados depois da operação. O exemplo de maior comprimento `Confirmar cancelamento` tem texto intrínseco de 163 px dentro do primário de 210 px, mantendo espaço interno.

## 4. Capturas inspecionadas nesta execução

Capturas renderizadas do Figma consultadas diretamente durante a correção, **não anexadas como arquivos binários ao GitHub nesta rodada**:

- [T04 — cancelar plantão](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8016-14055): mensagem e dois botões íntegros.
- [T08 — registrar administração de Medicamento A](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8017-14668): CTA Confirmar registro inteiro.
- [T06 — Novo registro](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-9141): campos e scrim após tokenização.
- [T12 — view](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6704): destinos apresentados como Rows.
- [T12 — access_active](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-8895): orientação legível e card ampliado.
- [T13 — papéis seleção 3](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8010-12352): grid 16/358.
- [T14 — editar Dr. Carlos](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=8006-33693): três inputs com bordas visíveis.
- [T01 — Login Loading](https://www.figma.com/design/ljFSoPfNcvDgZtdR2sHmti?node-id=6223-6894): link auxiliar consistente.

Amostras observadas não substituem testes por clique, gesto ou scroll. Capturas Figma visualizadas nesta sessão não são hashes/version history, nem prova pixel-a-pixel de todas as 32 composições.

## 5. Conferência estrutural direcionada (após as edições)

| Verificação | Resultado |
|---|---|
| 15 Actions com 326/104/210 e rótulo principal contido | **15/15** |
| VIS-002 nota visível e Input antigo oculto | **Confirmado** |
| VIS-003 texto 60 px / card 250 px | **Confirmado** |
| 6 inputs vinculados ao Border Interactive | **6/6** |
| Destinos T12 sem visual de Card | **10/10** |
| Grid T13 x=16 / largura 358 | **4/4** |
| Login Loading com `Usar convite` | **Confirmado** |
| Scrims locais com opacity 0,32 | **32/32** |

As oito ocorrências/padrões visuais receberam alteração. Não há evidência de defeito funcional novo nesta inspeção.

## 6. Regressão manual curta — recomendada antes do aceite final

No Presentation **local** do usuário, evitando repetir os 39 cenários H07:

1. T04 cancelar plantão: abrir Sheet, ler confirmação inteira, **Cancelar** e depois **Confirmar cancelamento** em fixture adequada; destinos/fechamento como antes.
2. T08 administração e posologia: ler os rótulos de T08; cancelar/confirmar sem sobreposição de botões; destino mantém medicamento correto.
3. T12: abrir Rede de Cuidado e Acesso ao aplicativo pelos Rows e retornar; no estado access_active, rolar para visualizar **Editar perfil** integralmente; RO sem ações de escrita.
4. T13: percorrer as quatro seleções de papéis e preservar um único Familiar Principal e os resultados correspondentes.
5. T06/T14: conferir contornos/legibilidade de categorias, datas, horas e inputs. No Login Loading, verificar o texto `Usar convite`.

Registrar somente o que foi efetivamente testado. A aprovação humana anterior do Login e da navegação básica permanece válida e **não precisa ser refeita integralmente**.

## 7. Estado da entrega

- **Correção visual:** aplicada; propriedades dos oito VIS verificadas.
- **Revisão interativa de regressão:** pendente.
- **Sugestões opcionais SUG-01 e SUG-02:** não executadas.
- **PR #127:** permanece Draft. Não executar merge automático.
- **Original externo e página-base interna:** preservados por escopo de operações (sem chamadas de escrita); não é alegação de auditoria de edições simultâneas por terceiros.
