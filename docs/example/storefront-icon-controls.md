# T04 — Icon controls

Status: runtime implementation available; see [implementation notes](./storefront-implementation.md). The design contract below remains authoritative; browser validation is pending.

## Geometry and icon inventory

Use the existing Tabler icon family throughout: a 24 × 24 viewBox, rendered at
20 × 20px, with a 1.5px stroke, round caps/joins, no fill, and `currentColor`.
Center every icon in an inline-flex control with no baseline offset or shrinking.
The filled heart is the explicit selected-state exception. Avoid mixing icon
families or using Unicode symbols as substitutes.

| Control | Tabler symbol | Accessible name | Element / behavior |
| --- | --- | --- | --- |
| Account | User | “Akun saya” | Anchor to the account destination; if it opens a panel instead, use a button with expanded state and a reference to that panel |
| Header wishlist | Heart | “Daftar keinginan” | Anchor to the wishlist; this is navigation, not a pressed toggle |
| Shopping bag | ShoppingBag | “Keranjang” | Anchor to cart; a future item count, if shown, is included as “Keranjang, 2 barang” using the actual count |
| Search submit | Search | “Cari produk” | Native submit button for the search form, only when a distinct submit action is needed |
| Product favorite | Heart / HeartFilled | “Simpan {nama produk} ke favorit” | Native button with a stable label and `aria-pressed="false"` or `"true"` |

Icon-only interactive targets have minimum width and height
`--store-touch-target` (44px) at every viewport. This intentionally exceeds the
32px base control token without changing it. Set 0 padding, a transparent 1px
border, and `--radius-control` corners using border-box sizing. A 20px icon in a
44px frame has 12px space to each outside edge, including the border. Adjacent
controls have a gap of `calc(var(--gap) / 2)`; their hit areas never overlap.
At narrow widths the containing header must reflow rather than shrink targets.
Header layout is specified in [T05](./storefront-header.md).

“Outline controls” refers to the icon stroke treatment. A1 header controls have
transparent backgrounds and no visible resting frame. An optional outlined
variant uses a `--control` border and `--surface` fill, as allowed by T01; the
icon itself remains recognizable without relying on the subtle border.

A leading search icon inside the field is normally decorative: use the same
20px geometry, `--faint` ink, `aria-hidden="true"`, and no tab stop or hit target.
It is not a second search button. If the design uses it as the actual submit
control, apply the named 44px interactive treatment and provide only one submit
action. Field placement and persistent input labeling remain T06 work.

## Visual states

| State | Appearance |
| --- | --- |
| Default | Outline icon in `--text`; transparent background, or `--surface` in the outlined variant |
| Hover on a device supporting hover | `--raised` background; retain icon ink and dimensions |
| Keyboard focus | 2px `--accent` outline with 2px offset and the control radius; retain icon/background states |
| Pressed, while activating | `--active` background; no movement, scale, or elevation |
| Favorite selected | Filled heart in `--accent`; `aria-pressed="true"`; background follows default/hover/pressed state |
| Disabled | `--muted` icon; `--raised` background; optional outline remains `--control`; no hover or pressed feedback, no element opacity |

Unselected favorites use the outline heart and `aria-pressed="false"`. Selection
is communicated by fill shape as well as color and semantics. The accessible name
stays stable so assistive technology announces the pressed state consistently.
Selecting a favorite does not navigate or move focus. The header wishlist link
keeps its outline icon even when products have been saved; do not give a navigation
link `aria-pressed`.

Focus combines with hover, press, and selection instead of being overwritten.
Native disabled buttons have no tab stop; if `aria-disabled` is used to retain a
focusable explanatory control, preserve its focus outline and block activation
in code. Disabled navigation follows T03's plain unavailable-content treatment.
Transient press and persistent favorite selection are separate states.

Use `--t-hover` for background/color feedback, `--t-press` for pressed background
feedback, and `--ease-out`. Apply hover only to enabled controls under
`(hover: hover)`. Focus and heart shape/state updates are immediate. Remove
transitions under `prefers-reduced-motion: reduce`.

## Accessibility and integration

- Every interactive icon has an accessible name from the table, supplied through
  `aria-label` or visually hidden text. A tooltip or SVG title alone is insufficient.
  If a visible label such as “Keranjang” is included, use that text in the name
  and hide the decorative SVG from assistive technology.
- All SVGs inside named controls use `aria-hidden="true"` and
  `focusable="false"`; the control provides the single tab stop. Do not assign
  a separate role or label to its decorative icon.
- Buttons use `type="button"`, except search submit. Keyboard activation follows
  native button/link behavior. Panel triggers expose `aria-expanded` and
  `aria-controls` only when a real associated panel exists. Do not invent target
  routes or claim account/cart integrations are implemented by this specification.
- Optional product favorites sit as siblings to product links, never inside a
  link or another button. If later used over photography, give the control an
  opaque `--surface` backing; keep its 44px target and focus ring inside a safe
  inset so neither the image crop nor card corners clip it. A1 omits this overlay.
- Render counts from real application data. Avoid a separate badge tab stop or
  duplicated accessible count. Favorite persistence, error recovery, and updates
  to wishlist/cart data require later integration; do not show a successful
  selection when the save operation has failed.

## Verification and remaining review

Token contrast calculations give `--text` against `--surface` about 18.9:1;
selected `--accent` against `--surface` about 6.0:1 and against `--active` about
5.2:1; disabled `--muted` against `--raised` about 5.5:1. The dedicated solid
surface behind any future photographic overlay keeps these pairs predictable.

Geometry is specified consistently across all five roles. When implementing,
measure 44 × 44px minimum targets and centered 20px glyphs, then check keyboard
focus, native activation, accessible names, the decorative search alternative,
and selected/disabled combinations. Inspect both plain and outlined variants on
surface and raised backgrounds. Runtime controls are now available; screen-reader and browser checks remain pending. No backend behavior is implemented.
