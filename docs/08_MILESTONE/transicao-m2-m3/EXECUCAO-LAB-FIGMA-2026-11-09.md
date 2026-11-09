# M3 — Execução do laboratório isolado E06/E07/E16

**Data:** 09/11/2026  
**Natureza:** protótipo de validação acadêmica, sem backend, dados reais ou autorização funcional.  
**Arquivo Figma:** [Rede de Apoio](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/)  
**Página de desenvolvimento:** [M3 — LAB DE NAVEGAÇÃO E06 E07 E16 (SIMULAÇÃO)](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3326).  
**Proteção:** a página canônica `Fluxo Final` (`5926:1014`) e a apresentação M2 (`6103:3636`) **não foram alteradas**.

## 1. Construção realizada

Foram produzidos **15 frames** de demonstração (12 telas + 3 formulários contextuais), com **27 interações `ON_CLICK`**, incluindo **3 aberturas por `OVERLAY` de baixo para cima** e fechamentos de overlay com `CLOSE`. Os formulários mantêm a representação do padrão `PAGE BASE + SCRIM + BOTTOM SHEET`, sendo que a composição é feita pelo modo de protótipo Figma. Os formulários usam fontes Geist e cores aproximadas da identidade existente; esta construção não valida automaticamente reutilização dos componentes nativos do Design Foundation.

| Código | Finalidade | Frame |
|---|---|---|
| E06-A | Contexto T04 / plantão selecionado | [6480:3327](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3327) |
| E06-B | Bottom Sheet solicitar troca | [6480:3344](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3344) |
| E06-C | Solicitação pendente / responsável preservado | [6480:3361](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3361) |
| E07-A | Solicitações recebidas | [6480:3378](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3378) |
| E07-B | Responder troca / seleção de cenários | [6480:3392](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3392) |
| E07-C | Aceite, novo responsável e N01 | [6480:3410](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3410) |
| E07-D | Recusa, responsável preservado e sem N01 de aceite | [6480:3426](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3426) |
| E07-E | Versão obsoleta / conflito 409, sem alteração e sem N01 | [6480:3440](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3440) |
| E16-A | T08, medicamento existente | [6480:3455](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3455) |
| E16-B | Bottom Sheet registrar administração | [6480:3471](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3471) |
| E16-C | Administração confirmada + consequência N03 | [6480:3489](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3489) |
| E16-D | T07: original no histórico | [6480:3507](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3507) |
| E16-E | Bottom Sheet: correção versionada | [6480:3521](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3521) |
| E16-F | Histórico: original + nova versão | [6480:3536](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3536) |
| E16-G | Acesso negado: nenhum registro, sem N03; auditoria ilustrativa | [6480:3551](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6480-3551) |

## 2. Testes de navegação estática executados

Em sessão conectada ao Figma, a inspeção programática leu todos os **27 botões**, suas `reactions`, `destinationId` e `trigger`. O teste validou os percursos por IDs e verificou textos representando as pós-condições, sem executar cliques do modo apresentação. Uma primeira versão do assert de PT-02 procurava título no frame terminal errado; a asserção foi corrigida para o frame E07-A e toda a suíte foi reexecutada.

| Caso | Percurso validado | Resultado da verificação estrutural |
|---|---|---|
| PT-01 | E06-A → E06-B → E06-C | PASS |
| PT-02 | E06-C → E07-A | PASS |
| PT-03 | E07-A → E07-B → E07-C | PASS |
| PT-04 | E07-B → E07-D | PASS |
| PT-05 | E07-B → E07-E | PASS |
| PT-06 | E16-A → E16-B → E16-C | PASS |
| PT-07 | E16-C → E16-D | PASS |
| PT-08 | E16-D → E16-E → E16-F | PASS |
| PT-09 | E16-B → E16-G | PASS |
| PT-10 | E16-A → E16-B → E16-C | PASS |

**Resultado: 10/10 PASS na verificação estática de rotas e textos.** Em inspeção complementar de geometria, todas as quinze raízes ficaram sem overflow após aumentar as alturas dos formulários E06-B para 666 px e E16-B para 728 px. Foram observadas capturas dos dois formulários para confirmar conteúdo e botões completos.

### Limites dos testes

- **Não é teste manual clicado** em navegador/mode apresentação, nem prova de comportamento real, transação, idempotência, permissão, entrega de notificação, auditoria persistida ou integridade de banco.
- As saídas ACEITA / RECUSADA / 409 são **cenários alternativos explicitamente simulados**, não cálculos automáticos de estado.
- A data, as pessoas e os registros são **dados fictícios ilustrativos**; não são informação da Pessoa Idosa do projeto.
- O protótipo canônico ainda não recebeu os novos estados: **AUD-M2-013 continua pendente de revisão cruzada, validação interativa e promoção controlada**.
- O arquivo-base da M2 e a página canônica foram preservados, sem edição.

## 3. CL-03 / AUD-M2-008 — verificação estrutural focal complementar

Na [cópia CL-03](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6466-3327), a inspeção programática e visual confirmou **11 classes**, **8 relações previstas** e **16 rótulos de multiplicidade**:

- R01 `Medicamento [1] — [0..*] RegimeMedicamento`;
- R02 `RegimeMedicamento [1] — [0..*] HorarioRegime`;
- R03 `HorarioRegime [0..1] — [0..*] OcorrenciaProgramada`;
- R04 `OcorrenciaProgramada [0..1] — [0..1] AdministracaoMedicamento`;
- R05 `RegistroCuidado [1] — [0..*] CorrecaoRegistro`;
- R07 `RegistroCuidado [0..1] — [0..*] Anexo`;
- R08 `Consulta [0..1] — [0..*] Anexo`;
- R09 `AdministracaoMedicamento [0..1] — [0..*] Anexo`.

A restrição `{exatamente um pai entre RegistroCuidado, Consulta ou AdministracaoMedicamento}` aparece visivelmente. R06 (Consulta–Recomendacao) e R10 (dependências da Auditoria) continuam justificadamente omitidas. A leitura visual indica que os rótulos estão separados das caixas, com uma linha horizontal longa atravessando a região de relações inferiores; a legibilidade dessa área em projetor continua **não verificada**. O original [CL-03 6272:3484](https://www.figma.com/design/tcyj2fkTXei2CJbqaRxqCp/?node-id=6272-3484) permanece intacto. **Não foi realizado aceite docente nem promoção para a apresentação original**.

## 4. Próximos gates para homologação

1. Testar manualmente no modo protótipo cada uma das 10 sequências, incluindo overlay, cancelar, retorno e ausência de navegação indevida.
2. Revisar autorização contextual e textos com os owners de US-012, US-013 e US-019; confirmar que estados fictícios representam apenas o contrato, sem afirmar validação real.
3. Revisar semanticamente a cópia CL-03 por segundo integrante e testá-la em projetor; somente então decidir promover para a apresentação canônica.
4. Completar a cadeia das 36 US (classes/dados/tela/prova) sem aceitar candidatos por inferência.
5. Confirmar com o professor/AVA a rubrica e o nível de protótipo exigido; documentar aceite acadêmico apenas quando ocorrer.
6. Registrar no GitLab institucional responsabilidades, decisões, métricas e evidências de participação (conexão não disponível nesta sessão).

**Parecer:** há entrega técnica nova e testes de grafo reproduzíveis, suficientes para solicitar revisão de M3, mas **não** para fechar AUD-008, AUD-013 ou declarar a Milestone 3 homologada.


## 5. Ajuste de ancoragem dos três Bottom Sheets (09/11/2026)

A inspeção da propriedade `overlayPositionType` revelou `CENTER` como padrão não editável dos novos frames. Embora a transição de entrada fosse `MOVE_IN BOTTOM`, isso **não bastava** para posicionar o formulário na borda inferior. O problema foi corrigido sem tocar na página canônica:

1. Os três destinos `E06-B`, `E16-B` e `E16-E` passaram a ser frames de overlay de **390×844 px**.
2. Cada frame ganhou um **scrim semitransparente** full-screen e uma superfície branca independente `Bottom Sheet / Surface` com todos os campos/botões preservados e alinhamento inferior.
3. O layout foi verificado geometricamente por Node IDs: as superfícies terminam em **y=844**. E06-B: `6484:3326` (y=203, h=641); E16-B: `6484:3327` (y=176, h=668); E16-E: `6484:3328` (y=281, h=563).
4. Capturas após ajuste confirmaram E06-B e E16-B legíveis sem botões cortados. Os frames originais `Fluxo Final` e `Apresentação M2` não sofreram mudança.

**Nota de teste:** o resultado 10/10 de navegação estrutural foi obtido **antes do reparenting visual**; uma tentativa de reexecutar toda a verificação após o ajuste falhou por erro interno da ferramenta Figma, embora a leitura de metadados confirme os novos filhos e os botões antigos preservados. Assim, **não declarar o pós-ajuste como 10/10 retestado** até conseguir nova inspeção das `reactions` ou testes manuais de clique. Isto não altera a natureza simulada ou o gate de revisão do laboratório.
