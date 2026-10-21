# T01 — KOSMETIK storefront foundation

Status: runtime implementation available; see [implementation notes](./storefront-implementation.md). The design contract below remains authoritative; browser validation is pending.

## Composition and authority

Use [A1](./A1.png): bold sans-serif wordmark, inset rounded hero, plain
product images, category labels below images, inset promotional split, and
rounded newsletter panel. Keep the page order in [design-tasks.md](./design-tasks.md).
Warmth comes from photography; interface surfaces remain neutral.

The light-theme tokens in
[app.css](../../.agents/skills/design-taste-frontend/assets/app.css) are authoritative
for this exercise. Preserve their names and values. The task document already
records their source values; this mapping references those names rather than
maintaining another copy of the palette. Extensions below are the only additional
storefront roles. Do not edit the skill CSS or import its dashboard rules wholesale.

The existing `src/routes/layout.css` and `DESIGN.md` describe a different application
foundation. In particular, `--primary`, `--accent`, `--muted`, and `--border` have
different meanings or values there. When implementing this storefront, place the
source light tokens on a storefront wrapper and scope component rules to it;
do not alias the storefront roles to the existing application values or change
global theme tokens. Descendant controls must use the scoped storefront rules;
existing Tailwind/button variants are not automatically compatible. The existing
font package exposes “Inter Variable”; register it under the source `--font`'s
“Inter” family when wiring the storefront, keeping `--font` unchanged.

## Component mapping

| Component / tasks | Foundation roles | Application |
| --- | --- | --- |
| Page, container, grids — T02 | `--ground`, `--surface`, `--pad`, `--gap` | Page ground; surface header and content regions; shared gutters. Use the content-width and section-space extensions below. Define storefront grids independently of `.grid`. |
| CTA and text links — T03, T08, T19, T21 | `--primary`, `--primary-ink`, `--text`, `--accent`, `--radius-control`, `--control-height`, `--fs-body` | All filled actions, including newsletter, use the primary pair. Section links use text ink and underline on hover; accent is available for focus. No screenshot-green CTA override. |
| Outline icon controls — T04 | `--text`, `--muted`, `--surface`, `--control`, `--raised`, `--accent` | Inherit text ink for strokes; outlined controls use control borders and surface fill, raised on hover. Selected wishlist uses accent plus filled-heart/pressed semantics. Use the touch-target extension where needed. |
| Header and wordmark — T05 | `--surface`, `--text`, `--font`, `--fs-title`, `--pad`, `--gap`, `--rule` | Bold sans-serif wordmark, vertically aligned header content, subtle lower divider. |
| Search and newsletter inputs — T06, T21 | `--surface`, `--control`, `--text`, `--faint`, `--radius-control`, `--fs-body` | Surface fill, control border, text value, faint placeholder. Source input height is a component rule of 38px, not `--control-height`. |
| Category navigation — T07 | `--surface`, `--text`, `--muted`, `--accent`, `--gap`, `--rule` | Active item uses accent text and underline; other items use text/muted roles. No dashboard navigation pill. Final link is “Promo”. |
| Hero — T08, T09 | `--surface`, `--text`, `--muted`, `--font`, `--fs-small`, `--fs-body`, `--radius-card`, `--pad` | Inset rounded composition; hero heading uses the display extension. Text sits in a neutral readable region, with warm product photography on the right. |
| Section heading row — T10 | `--text`, `--muted`, `--font`, `--fs-title`, `--fs-body`, `--gap` | A1 bold title, secondary subtitle, shared text-link treatment. |
| Product media — T11 | `--raised`, `--radius-card` | Quiet fallback behind imagery; shared product ratio below. A1 has no wishlist overlay. |
| Product information — T12 | `--text`, `--muted`, `--font`, `--fs-body`, `--fs-section` | Body-sized names and variants; section-sized bold prices. Wrap long names. |
| Rating — T13 | `--muted`, `--fs-small` | Rating and count use text; star uses the dedicated rating extension, never a chart or warning token. Include a readable rating equivalent. |
| Product card / rows — T14–T16 | `--text`, `--accent`, `--gap`, `--t-hover`, `--ease-out` | Plain image and information stack; no `.panel` border or card padding. Optional ratings create no empty row. A1 favorites omit filter tabs. |
| Category discovery — T17, T18 | `--surface`, `--raised`, `--text`, `--fs-section`, `--fs-title`, `--gap`, `--radius-card` | Image above centered label strip; discovery heading follows T10. Use the category ratio extension. |
| Promotional split — T19 | `--surface`, `--raised`, `--text`, `--muted`, `--radius-card`, `--pad` | Inset image left, neutral text panel right; title uses `--fs-kpi`. Keep shared CTA treatment. |
| Service benefits — T20 | `--text`, `--muted`, `--fs-body`, `--rule`, `--border`, `--gap` | Outline icons and readable copy; rule above row, border between items. No enclosing dashboard panels. |
| Newsletter — T21, T22 | `--raised`, `--text`, `--muted`, `--fs-title`, `--fs-body`, `--fs-small`, `--radius-card`, `--pad`, `--gap` | Rounded neutral panel, shared field and primary CTA, underlined privacy link. |
| Footer brand/social — T23 | `--surface`, `--text`, `--muted`, `--font`, `--fs-title`, `--fs-body`, `--gap` | Match header wordmark; outline/social icon ink follows text; reuse focus rules. |
| Footer navigation/legal — T24 | `--text`, `--muted`, `--faint`, `--fs-body`, `--fs-small`, `--rule`, `--gap`, `--pad` | Body-sized navigation, small copyright, shared divider; A1 left-aligned legal row. |
| Asset inventory / review — T25, T26 | Shared mapping and image extensions | Inventory crop and alt text per asset; review against this mapping and A1. These tasks add no visual token roles. |

All text uses `--font`. Ordinary title/body sizes come from the existing scale;
`--fs-kpi` can serve the promotional heading without importing a KPI component.
Use `--card-pad` only for an intentionally padded content surface, never as an
automatic inset on product cards.

## Storefront extensions

These proposed values are specific to this homepage and must live separately
from the skill foundation. They are design decisions, not measurements guaranteed
by the screenshot. Future component styles reference the names below rather than
repeating their raw values.

| Extension | Value | Role |
| --- | --- | --- |
| `--store-content-max` | `1200px` | Maximum shared content width; centered with equal inline gutters from `--pad`. |
| `--store-display-size` | `clamp(28px, 4vw, 48px)` | Hero heading only; weight 700, line-height 1.05, measure at most 18ch. Other headings retain the existing scale. |
| `--store-section-space` | `clamp(32px, 5vw, 64px)` | Vertical separation between major sections; internal spacing uses the foundation. |
| `--store-hero-ratio` | `4 / 1` | Desktop inset hero media frame. Content determines minimum height; never clip text to enforce this ratio. |
| `--store-product-ratio` | `3 / 2` | Consistent product image frames in favorites and arrivals. |
| `--store-category-ratio` | `4 / 3` | Category photograph only, excluding its label strip. |
| `--store-promo-ratio` | `8 / 5` | Photograph inside the desktop promotional split. |
| `--store-mobile-hero-ratio` | `4 / 3` | Separate media frame below hero copy on compact screens. |
| `--store-rating-star` | `#946200` | Dedicated gold star ink; approximately 5.2:1 against `--surface`. Pair with rating text; do not convey score through color alone. |
| `--store-touch-target` | `44px` | Minimum control height and icon-control width on compact screens or coarse pointers; overrides component sizing without changing `--control-height`. |

Images use these frame ratios, `object-fit: cover`, and slot-specific focal
positions chosen during T25. Never stretch images; use `contain` when cover would
cut off a product. Neutral fallback backgrounds use `--raised`. Do not add a cream
surface token solely to imitate photographic backgrounds.

At widths up to 767px, use two-column product/category grids, stack split sections,
and let the hero copy size independently of the media frame. At larger widths,
use four columns. This is the storefront breakpoint decision for T02, separate
from the source `.grid` collapse at 860px. Mobile treatment is proposed because
A1 contains only a desktop reference; [T02](./storefront-layout.md) specifies the
layout rules and width checks, with browser overflow checks required during implementation.

## Shared states and accessibility

- Keyboard focus: source rule, 2px accent outline with 2px offset. Keep it visible
  against both surface and raised backgrounds and clear of clipping containers.
- Neutral interactive hover: `--raised`; selected fill, where needed: `--active`.
  Selected categories still require accent text and an underline. Primary actions
  keep the primary/ink pair; detailed button states are specified in
  [T03](./storefront-actions.md).
- Validation: `--negative` for errors, `--positive` for success, `--warning` for
  warnings, always accompanied by text. Field labels remain independent of
  placeholders. T21 specifies the submitting and response states.
- Motion: press uses `--t-press`, hover uses `--t-hover`, other UI changes use
  `--t-ui` and `--ease-out`. Preserve reduced-motion behavior. Tokens do not
  authorize new entrance or scroll animations.
- Icon geometry, border thickness, font weights, and line heights are component
  rules rather than new color/spacing tokens; keep repeated geometry in shared
  component definitions during their respective tasks.

## Intentional deviations and remaining work

A1 green buttons become the source near-black primary pair; cream panels become
neutral surfaces; all rounded containers use the source card radius. Typography
uses the source Inter scale except the documented hero display size. The screenshot
navigation places Mata before Bibir; follow T07's explicit requested order:
Semua Produk, Wajah, Bibir, Mata, Brush & Tools, Promo.

This document records the foundation mapping; T01–T04 runtime delivery is documented in [implementation notes](./storefront-implementation.md). T02 is specified separately
in [the layout contract](./storefront-layout.md), and T03 in
[the action contract](./storefront-actions.md). T04 is specified in
[the icon control contract](./storefront-icon-controls.md), and T05 in
[the header contract](./storefront-header.md); T06–T26 remain unfinished.
New imagery, asset approval, and browser review remain pending. Sidebar, tables, charts, pills, dashboard shell, and dark-theme
rules are outside this homepage foundation.
