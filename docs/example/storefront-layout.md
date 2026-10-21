# T02 — Page container and grid

Status: runtime implementation available; see [implementation notes](./storefront-implementation.md). The design contract below remains authoritative; browser validation is pending.

## Shared frame

Every section uses one centered content container. Its width is the smaller of
`--store-content-max` and the viewport width minus two `--pad` gutters. The maximum
describes the usable content width, excluding those gutters. Do not nest containers:
nested sections inherit the existing frame rather than adding another pair of
margins.

Header, category navigation, favorites, discovery, new arrivals, benefits, and
footer content share these edges. Header/footer backgrounds may span the viewport.
The hero, promotional banner, and newsletter backgrounds stay inside the frame
and use `--radius-card`. Their text has internal `--pad` padding; product cards
have no extra panel inset. Section separation uses `--store-section-space`.

## Grid and split contract

| Layout | Up to 767px | From 768px |
| --- | --- | --- |
| Products: favorites / arrivals | Two equal columns | Four equal columns |
| Category discovery | Two equal columns | Four equal columns |
| Hero | Copy, then separate media | Copy left; media right, each half of the banner |
| Promotional banner | Image, then copy | Image left 60%; copy right 40% |
| Newsletter outer layout | Copy, then form | Two equal columns |

Product/category grid gutters use `--gap` in both directions. Split banners have
no seam gutter between adjoining panels; newsletter columns use `--gap`. All grid
tracks have a zero minimum so text cannot force the frame wider. Keep semantic
reading order identical at all sizes; do not use CSS ordering to move focusable
content. Header controls, navigation wrapping, benefits, footer columns, and the
newsletter's inner form arrangement are designed in their respective tasks.

The 768px breakpoint is a component layout rule, not a mutable CSS custom property.
Do not use the source dashboard `.grid`, whose 860px behavior would collapse these
catalog rows to a single column.

## Reference layout rules

These selectors are scoped beneath the future `.storefront` wrapper. T01's source
tokens and documented extensions must be available on that wrapper before use.
This block defines geometry only; component styling remains separate.

```css
.storefront,
.storefront *,
.storefront *::before,
.storefront *::after {
  box-sizing: border-box;
}

.storefront .store-container {
  width: min(var(--store-content-max), calc(100% - 2 * var(--pad)));
  margin-inline: auto;
  min-width: 0;
}

.storefront .store-section + .store-section {
  margin-block-start: var(--store-section-space);
}

.storefront .store-product-grid,
.storefront .store-category-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--gap);
  margin: 0;
  padding: 0;
  list-style: none;
}

.storefront .store-split {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  min-width: 0;
}

.storefront .store-newsletter {
  gap: var(--gap);
}

.storefront .store-product-grid > *,
.storefront .store-category-grid > *,
.storefront .store-split > * {
  min-width: 0;
  overflow-wrap: anywhere;
}

.storefront .store-copy {
  padding: var(--pad);
}

.storefront .store-media {
  min-width: 0;
  margin: 0;
  background: var(--raised);
}

.storefront .store-media img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.storefront .store-product-media {
  aspect-ratio: var(--store-product-ratio);
}

.storefront .store-category-media {
  aspect-ratio: var(--store-category-ratio);
}

.storefront .store-hero-media {
  aspect-ratio: var(--store-mobile-hero-ratio);
}

.storefront .store-promo-media {
  aspect-ratio: var(--store-promo-ratio);
}

@media (min-width: 768px) {
  .storefront .store-product-grid,
  .storefront .store-category-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .storefront .store-hero,
  .storefront .store-newsletter {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .storefront .store-promo {
    grid-template-columns: minmax(0, 3fr) minmax(0, 2fr);
  }

  .storefront .store-hero {
    min-height: calc(min(var(--store-content-max), 100vw - 2 * var(--pad)) / (var(--store-hero-ratio)));
    aspect-ratio: auto;
  }

  .storefront .store-hero-media {
    aspect-ratio: auto;
    position: relative;
  }

  .storefront .store-hero-media img {
    position: absolute;
    inset: 0;
  }
}
```

Use `.store-split` together with `.store-hero`, `.store-promo`, or
`.store-newsletter` on each outer split. Product and category figures combine
`.store-media` with their corresponding ratio class. The hero's media also uses
`.store-media`. Hero copy remains in normal flow; its content can increase banner
height beyond the preferred ratio. The desktop hero image fills that height
without its intrinsic dimensions enlarging the row.

Images are never stretched. Their frame may crop using `cover`; use `contain` for
product assets whose packaging would otherwise be clipped. Select focal positions
and verify crops when assets are available in T25. The mobile hero frame is
independent of the copy height. Promotional panels can grow with text and keep the
image's ratio; a neutral continuation below a shorter image is preferable to
stretching it. Round image/panel corners individually during component design;
do not clip the entire section or its focus outlines to obtain rounded corners.

## Width checks and implementation acceptance

With the T01 values (`--pad: 24px`, `--gap: 16px`, content maximum 1200px),
the intended geometry is:

| Viewport | Content width | Equal outside margins | Columns | Tile width | Product image height |
| --- | --- | --- | --- | --- | --- |
| 320px | 272px | 24px | 2 | 128px | 85.33px |
| 390px | 342px | 24px | 2 | 163px | 108.67px |
| 767px | 719px | 24px | 2 | 351.5px | 234.33px |
| 768px | 720px | 24px | 4 | 168px | 112px |
| 860px | 812px | 24px | 4 | 191px | 127.33px |
| 1440px | 1200px | 120px | 4 | 288px | 192px |

The grid equation is `(content width - (columns - 1) × gap) / columns`.
These checks establish positive tracks and matching edges, including both sides
of the breakpoint and the source dashboard breakpoint. They do not substitute
for a browser review of the later assembled components.

During implementation, check the widths above with actual images, long product
names, wrapped headings, and enlarged text. Confirm the document has no horizontal
overflow, focus rings remain visible, and intrinsic media dimensions cannot widen
tracks. Do not conceal overflow with page-level `overflow-x: hidden`. Any element
with an intrinsic width (input, flex child, image) must fit its track. Asset crop
approval belongs to T25; the assembled desktop/mobile review remains T26.
