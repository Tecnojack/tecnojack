# Design System — estrategia Angular

## Fuente visual

El prototipo define Orbit Design System v3.0 con modo operativo oscuro, cian TECNOJACK y acento dorado. La implementación Angular será SCSS/CSS mantenible; no se copiarán Tailwind, MUI, Radix ni componentes React.

## Tokens iniciales aprobados para la Fase 1

- Marca: `#0097B2`, highlight `#39BDD1`, teal profundo `#063A45`, dorado `#FFB800`.
- Superficies oscuras: `#041217`, `#0B191E`, `#17272D`, `#1E3038`.
- Texto: `#EAF0F2`; secundario `#83949B`; sutil `#45575E`.
- Estados: success `#2EAD6B`, warning `#E7A522`, danger `#E25555`, info `#3D9BE9`.
- Tipografía: Montserrat para display, Inter para cuerpo, fallbacks del sistema; Playfair solo en invitaciones.
- Espaciado: base 4 px; ritmo principal 8 px.
- Radios: 4, 8, 12, 16, 20, 24 y full.
- Breakpoints de coordinación: 480, 768, 1024, 1280 y 1536 px.
- Movimiento: 120, 200, 320 y 480 ms; respetar `prefers-reduced-motion`.

## Organización prevista

```text
src/styles/
  _tokens.scss
  _typography.scss
  _theme.scss
  _utilities.scss
```

Se integrará con los estilos globales actuales sin renombrar clases ni alterar la apariencia pública. El tema ERP se limitará inicialmente al host del ERP.

## Componentes

Tres niveles:

1. UI: button, input, card, badge, dialog, drawer, tabs y estados genéricos.
2. Dominio: event status, payment status, client card, media asset card.
3. Feature: opportunity pipeline, production workspace, gallery builder.

Solo se extrae un primitivo cuando aparece en la pantalla activa o ya tiene reutilización comprobada. Angular CDK se reutilizará para overlays, accesibilidad y patrones interactivos donde aporte valor.

## Calidad visual

- Objetivo WCAG 2.2 AA.
- Touch targets de 44 px en móvil.
- Estados loading, empty, error, disabled, focus y success son parte de cada componente.
- Validación visual en 1440, 1024 y 390 px.
- Tablas se transforman en filas expandibles o tarjetas; no se comprimen hasta ser ilegibles.

