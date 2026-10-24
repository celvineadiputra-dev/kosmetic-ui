# Editorial Promo Banner Redesign (Option 1: Magazine Spread)

## Goal

Redesign `PromoBanner.svelte` from a plain split card into an asymmetrical luxury editorial magazine spread featuring the portrait artwork `Sunlit Beauty Still Life with Blossoms.png`.

## Approved Direction (Option 1: Magazine Spread)

- **Composition**: An integrated editorial layout pairing the 1:1 sunlit portrait plate with a refined editorial copy column on a warm cream canvas (`#F3EEE8`).
- **Typography**: High-contrast serif headline (`Playfair Display`, `Georgia`) paired with clean sans-serif interface copy (`Inter Variable`).
- **Asset**: Uses `static/images/Sunlit Beauty Still Life with Blossoms.png` with stable dimensions and meaningful alt text.
- **Content**:
  - Kicker / Eyebrow: `Koleksi Unggulan`
  - Heading: `Tampil natural,<br />cantik setiap hari.`
  - Description: `Pilihan formula lembut dan warna esensial untuk riasan harian yang selalu terasa ringan seperti kulitmu sendiri.`
  - Highlights: `Formula Ringan` · `Pigmentasi Halus` · `Nyaman Seharian`
  - CTA: `Action` component with `Jelajahi Koleksi` linking to `collectionHref` (default `#baru`).
- **Responsiveness**:
  - Desktop (`min-width: 900px`): Asymmetric 2-column layout (left: photo plate, right: vertically centered editorial copy with generous padding).
  - Mobile (`max-width: 899px`): Photo plate placed cleanly above the text with comfortable padding and touch targets below.
- **Visual Constraints**:
  - Follows Casandra Soft Natural Beauty palette: Warm Cream `#F3EEE8`, Deep Brown `#674536`, Terracotta `#874E3C`, Charcoal `#302823`.
  - Zero resting drop shadows or artificial borders.
  - Respects reduced-motion preferences with static transitions.

## Decisions Made

- Use the existing `Action` component for brand-consistent button styling and active states.
- Retain `collectionHref` prop interface so existing page navigation is preserved.
- Keep image in semantic `<figure>` and `<img>` tags for SEO and accessibility.

## Open Questions

- None. Requirements and visual direction are fully aligned with the storefront design system.
