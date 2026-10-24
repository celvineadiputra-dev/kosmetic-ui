# Soft Natural Beauty Color System

## Goal

Replace the existing green-and-blue application theme with a warm, elegant beauty-commerce palette while preserving the current semantic token API and all storefront layouts.

## Direction

The visual hierarchy uses warm cream and white for most surfaces, charcoal and deep brown for readable structure and primary actions, and terracotta plus soft nude as restrained accents. The supplied HEX values are the visual source of truth; `layout.css` stores their equivalent OKLCH values to match the existing color architecture.

## Light theme mapping

| Semantic role | Source color |
| --- | --- |
| Background | Warm Cream `#F3EEE8` |
| Card / Popover | White `#FFFFFF` |
| Alternate / Muted surface | Background Alt `#FAF7F3` |
| Foreground | Charcoal `#302823` |
| Muted foreground | Text Secondary `#73665E` |
| Border / Input | Border `#E6DCD4` |
| Primary | Deep Brown `#674536` |
| Primary hover / deep | Hover Primary `#503629` |
| Secondary / storefront accent | Terracotta `#A66B55` |
| Accent / primary soft | Soft Nude `#D6B9A7` |
| Success | `#39765A` |
| Error / destructive | `#B54747` |
| Warning / rating | `#A66B27` |

Primary buttons use white text for an 8.46:1 contrast ratio. Secondary and warning hues are not used as small text on white because those pairings fall below 4.5:1; they remain accents, large indicators, or use charcoal text on a soft tinted surface.

## Scope

- Modify only `src/routes/layout.css` plus this design and implementation documentation.
- Preserve every existing token name so component code does not require churn.
- Add explicit success aliases so success messaging no longer borrows the primary brand color.
- Use darker tonal derivatives only for success/error text on tinted surfaces so normal text maintains WCAG AA contrast while the supplied status colors remain the canonical fills.
- Provide a light theme only; remove the dark variant and dark token overrides.
- Theme text selection, caret, and scrollbars from the palette.
- Preserve the existing related-product subgrid fix and all layout primitives.

## Verification

- Run static token assertions for all supplied brand colors and semantic aliases.
- Run `npm run check` and `npm run build`.
- Inspect `/produk/mascara` at desktop and mobile widths, including product cards, focus rings, text selection, and status colors.

