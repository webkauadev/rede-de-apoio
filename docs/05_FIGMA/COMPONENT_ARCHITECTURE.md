# Arquitetura de Componentes Figma

## Estratégia

Utilizar shadcn/ui como base de componentes primitivos.

O projeto deve criar componentes de domínio próprios.

## Estrutura

```text
Design System
├── Foundations
├── Primitives (shadcn)
│   ├── Button
│   ├── Input
│   ├── Card
│   ├── Badge
│   ├── Switch
│   └── Dialog
└── App Components
    ├── AppTopBar
    ├── BottomNavigation
    ├── ShiftCard
    ├── CareRecordCard
    └── AccessStatusCard
```

## Boas práticas

- Preferir Auto Layout.
- Evitar posicionamento absoluto para estrutura.
- Componentes devem possuir variantes de estado.
- Não duplicar componentes por tela.
