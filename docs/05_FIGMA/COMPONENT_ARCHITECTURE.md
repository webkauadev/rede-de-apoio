# Arquitetura de Componentes no Figma — REFERÊNCIA

> **Este arquivo não define componentes.**
>
> Fonte oficial única: [`../04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md`](../04_DESIGN_SYSTEM/COMPONENT_ARCHITECTURE.md)
> Tokens: [`../04_DESIGN_SYSTEM/DESIGN_TOKENS.md`](../04_DESIGN_SYSTEM/DESIGN_TOKENS.md)
>
> Motivo: até a versão anterior existiam duas árvores divergentes com o mesmo nome
> de arquivo. A versão que estava aqui omitia 8 componentes, entre eles
> `MedicationCard`, `TaskCard` e `AuditEntryCard` — o que levaria integrantes a
> recriar cards já existentes ao desenhar T08, T09, T10/T11, T14 e T17.
> Achado C3 da auditoria.

## Regra

Um único Design System. Se um componente não estiver em `04_DESIGN_SYSTEM`,
ele **não existe** — e criá-lo exige o formulário de novo componente abaixo.

## Organização da página Figma

```text
Design System
├── Foundations        ← espelha DESIGN_TOKENS.md
├── Primitives         ← shadcn/ui
└── App Components     ← componentes de domínio Rede de Apoio
```

## Nomenclatura obrigatória (fecha o achado M12)

| Elemento | Padrão | Exemplo |
|---|---|---|
| Página | `Txx — Nome` | `T06 — Diário de Cuidados` |
| Frame de tela | `Txx / Estado` | `T06 / Empty` |
| Componente | `PascalCase` | `CareRecordCard` |
| Propriedade de variante | `camelCase` | `state`, `isCorrection` |
| Valor de variante | `kebab-case` | `default`, `superseded` |
| Cover da tela | `Txx · Nome · @responsável` | `T06 · Diário · @kaua` |

## Formulário obrigatório para novo componente

Todo componente novo entra em `04_DESIGN_SYSTEM` com:

```
Nome:
Origem (RF/RNF/RN):
Uso (telas):
Variantes:
Justificativa de não reuso:
```

## Boas práticas

- Auto Layout sempre; posicionamento absoluto só para decoração.
- Variantes para estado, nunca cópias de componente.
- Não duplicar componente visualmente equivalente.
