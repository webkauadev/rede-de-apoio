# Plano de microcorreções — proposta, não executado

**Aguardar análise e aprovação humana dos achados. Não executar automaticamente.** A navegação já aprovada deve permanecer íntegra. Nenhum lote abaixo autoriza novo requisito, permissão, rota, campo clínico ou modificação da Foundation.

| Ordem / lote | Escopo | Dependência | Risco | Critério de aceite visual |
|---|---|---|---|
| 1 · MV-01 | VIS-001: composição das ações nos 15 overlays medidos | Aprovação; reservar a largura útil antes de mexer em textos adjacentes | Médio | Nenhum rótulo cortado; confirmar texto de 163 px com padding; alvos ≥48×48 e gap ≥8; sem edição dos masters/reactions |
| 2 · MV-02 | VIS-002 e VIS-003: altura dinâmica da confirmação e do acesso ativo | MV-01 no cancelamento; acesso ativo pode ser corrigido independentemente | Baixo/médio | Frases completas, padding inferior, CTA seguinte alcançável e sem sobreposição |
| 3 · MV-03 | VIS-004: contorno semântico nas composições locais T06/T14 | Aprovação do recorte; não alterar kit global | Baixo local | Border Interactive resolvido e ≥3:1 na surface; Error/Disabled preservados; wrappers mantidos |
| 4 · MV-04 | VIS-005/006: Rows de T12 e grid de papéis T13 | Confirmar adequação da Row para duas linhas; independente do texto de acesso | Médio | Grid externo 16/358; conteúdo e targets íntegros; destino conserva ícone/apoio/chevron sem card decorativo |
| 5 · MV-05 | VIS-007/008: rótulo de Loading e opacidade local de scrim | Após os P1/P2 estáveis | Baixo | Usar convite consistente; scrim compatível com 32%; nenhum token global alterado |

## Cuidados para evitar retrabalho

- Não corrigir os quinze CTAs separadamente por troca de fonte ou abreviação. Corrigir primeiro o padrão local de largura de Actions; reavaliar rótulos longos no espaço resultante.
- Preservar as instâncias Button e os IDs de origem/destino. Alterações de largura/altura não devem substituir nós ou refazer operações.
- Usar Auto Layout/Hug/Fill nas composições; conferir altura e posição antes de propagar a irmãos. No acesso ativo, crescer o card em vez de diminuir a fonte.
- Tratar Border Subtle decorativo e Border Interactive essencial separadamente. Não tornar todos os cards de alto contraste.
- A adaptação de Row com texto de apoio pode exigir uma variante apropriada. Se não existir equivalente, registrar a decisão antes de criar componente compartilhado.
- SUG-01/02 são opcionais e ficam fora dos lotes obrigatórios. Redução global da altura dos Sheets depende de aprovação específica.

## Regressão proporcional após futura implementação

Executar somente os cenários visuais alterados e seus caminhos adjacentes: abrir o Sheet, ler os dois rótulos, cancelar, reabrir e confirmar o mesmo destino; verificar os quatro estados de papéis e seus resultados; verificar os estados de acesso e a posição de Editar perfil. Os testes devem ter evidência observável, sem converter medidas estáticas em aprovação de clique.

- [ ] Em MV-01, todos os rótulos completos e centralizados, inclusive Confirmar cancelamento; nenhuma sobreposição entre irmãos.
- [ ] A linha de ações respeita a largura útil e os mínimos de toque/gap; labels longos têm largura real suficiente.
- [ ] Em MV-02, texto completo antes do CTA e padding preservado; scroll sem conteúdo permanentemente cortado.
- [ ] Em MV-03, verificar valores resolvidos e contraste nas três surfaces afetadas; não aplicar critérios de enabled a disabled.
- [ ] Em MV-04, T12 mantém os mesmos destinos/permissões; T13 mantém seleção e exatamente um Principal.
- [ ] Em MV-05, delta visual mínimo no Loading e alpha do scrim compatível com a referência.
- [ ] Após os lotes aprovados, validar uma regressão curta dos caminhos que tiveram geometria alterada. Não repetir toda a auditoria funcional ou os lotes 00–06.
- [ ] Registrar capturas finais/IDs no PR; manter Draft e aguardar revisão humana antes de merge/promoção.

O plano não é autorização de execução. Esta entrega termina com o diagnóstico e as evidências disponíveis para decisão.
