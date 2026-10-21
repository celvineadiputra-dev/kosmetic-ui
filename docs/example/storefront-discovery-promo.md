# A1 discovery and promotion — T17–T19

Status: runtime implemented. The catalog now follows the reference sequence:
Pilihan Favorit → Temukan Favoritmu → promotional banner → Baru untuk Kamu.
The existing A1 direction and T01 tokens remain authoritative; no random direction
or seed, new dependencies, or foundation token changes were introduced.

## T17 — Category tile

`CategoryTile.svelte` is one anchor containing a photograph above a centered
label strip. It accepts `label`, `href`, `image`, `alt`, and optional `selected`.
The photograph uses the shared 4:3 category frame, centered cover crop, explicit
image dimensions, lazy loading, and async decoding. The strip uses `--raised`,
`--fs-section`, and a 44px minimum height; text wraps naturally. Image and strip
corners use `--radius-card` individually, leaving the focus ring unclipped.

All links have an accessible name (“Jelajahi kategori Wajah”, etc.) and the shared
accent focus outline. Hover/focus underlines the label; press thickens it.
An optional selected tile uses accent text, an underline, and `aria-current`.
No arrow or vertical divider from A2 is added. There are no nested links/buttons
and no animation that requires a reduced-motion override.

## T18 — Category discovery

`CategoryDiscovery.svelte` reuses SectionHeading with “Temukan Favoritmu” and
“Pilih sesuai kebutuhan riasanmu.” Four instances of CategoryTile follow A1's order:
Wajah, Bibir, Mata, Brush & Tools. The existing category grid supplies four columns
from 768px and two below it, with the shared container edges and gap.

The tiles reuse existing generated product photographs without additional image
requests. All four crops were reviewed at desktop and mobile widths:

| Category | Asset under `static/images/` | Alternative text |
| --- | --- | --- |
| Wajah | `cushion.webp` | Cushion beige terbuka dengan puff untuk riasan wajah. |
| Bibir | `lipstick.webp` | Lipstik rose nude dalam kemasan emas untuk riasan bibir. |
| Mata | `eyeshadow.webp` | Palet sembilan warna eyeshadow netral untuk riasan mata. |
| Brush & Tools | `brush-set.webp` | Lima kuas rias dengan pouch beige. |

These existing 768 × 512 files remain unchanged; CSS provides the 4:3 frame.
Each full tile links to `?kategori={id}#jelajah-kategori`, retaining the category in
the URL and showing its selection in both tile and existing category navigation.
This is preview navigation, not product filtering or a connected category page.

## T19 — Promotional split banner

`PromoBanner.svelte` accepts a required `collectionHref`. It uses the T02
`.store-split` / `.store-promo` layout: photograph left 60%, text right 40% from
768px; photograph then copy stacked below that breakpoint. The photographic
frame is 8:5. All panels stay inside the shared inset frame with rounded outside
corners, without clipping the entire section or its focus outline.

The copy is “Tampil natural, setiap hari.”, with a break after “natural,”,
“Pilihan warna lembut untuk riasan yang terasa seperti dirimu.”, and one shared
T03 CTA, “Jelajahi Koleksi”. The heading uses `--fs-kpi`; body text uses the shared
body/muted roles. The neutral raised panel and near-black primary button follow
the token mapping, intentionally replacing A1's cream panel/green button. Warmth
comes from the photograph. A2's portrait, copy, and full-width treatment are not
selected. The caller points the CTA to the existing new-arrivals section `#baru`.
The existing header's Promo link now points to this real banner.

### New image asset and provenance

`static/images/kosmetik-a1-promo.webp` is an illustrative AI-generated still life,
not photography of verified inventory. It contains a neutral eyeshadow palette,
a brush, rose-nude lipstick, stone plinths, and white blossoms. Alt text names the
objects; text stays outside the image. It is 1200 × 800px, exported without
changing composition through the browser's WebP codec at quality 0.88:
**121768 bytes (about 119 KiB)**. The original generated PNG is retained in the
imagegen output directory, while runtime uses only the workspace WebP file.
No third-party photography or credits were introduced. The pre-existing preview
note continues to identify generated photography and sample inventory data.

Built-in imagegen prompt:

> Use case: product-mockup. Asset type: photographic left panel of an Indonesian KOSMETIK cosmetics storefront A1 promotional banner. Create ONE photorealistic warm tabletop still life with an open bronze eyeshadow palette showing nine warm neutral shades on the left, a single soft makeup brush leaning diagonally in the middle, and one open rose-nude lipstick in a polished champagne-gold case on the right. Small cream stone plinths and subtle white blossoms near the outer edges. Warm pale cream stone tabletop and beige backdrop, gentle morning light from upper left, soft natural shadows, realistic powder texture, delicate realistic reflections. Landscape approximately 3:2. All three cosmetic objects completely visible within the central 75% of the frame with generous breathing room, to survive an 8:5 cover crop. No writing, text, labels, logos, watermarks, people, hands, UI, mockups, collage or split panels. Match the restrained warm cosmetics photography already used on KOSMETIK A1. Photograph only; HTML will supply all copy outside the image.

## Verification

- Svelte checks: 0 errors/warnings. Production build passes.
- Targeted source lint for the three new components and page: 0 failures/warnings.
- Browser checks at **320, 390, 767, 768, 860, and 1440px** pass: no horizontal
  overflow, correct section/category order, two/four category columns, one link
  per tile, 44px minimum targets, 4:3 category frames, loaded images, 8:5 promo
  media, desktop 60/40 or compact stacked split, two-line promo heading, contained
  CTA and valid `#baru` destination. A direct category URL retains exactly one
  selected tile.
- All inspector folds/full-page sheets at 1440/768/390px were opened and reviewed,
  as were focused discovery/promotion screenshots at 320 and 1440px. Category
  objects and the three promotional cosmetics remain visible in their crops.
- Generic inspector: 0 failures with the same explicit A1 allowances as T10–T16
  (`eyebrow`, `hairline`, `body-size`, `focal-point`, `still-page`). Five existing
  warnings remain: prescribed muted/small text and tablet hero type, no footage
  in these still-image tasks, and a long paragraph in a foundation specimen.
- Keyboard-user and screen-reader sessions were not performed; native anchors,
  accessible names, and existing focus behavior are used. Live category filtering,
  asset approval, and the remaining assembled-page review are outside these tasks.

### Final visual critique (T17–T19 only)

ROUND 1
Seen in one second: four familiar makeup categories followed by one natural-look collection story.
Idea (one sentence): A1's warm product still lifes carry category discovery into a focused collection banner.
Live thing: whole-tile category links retain selection; the promotion opens new arrivals.
Layout words by section: discovery=four image/label tiles; promotion=60/40 image/copy split; compact=two-column discovery then stacked promotion.
Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.9.
Caps applied: none in the requested component scope; not a score for the unfinished full homepage.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. No unresolved crop, overflow, or CTA-containment defect in the reviewed discovery/promotion screenshots.
2. Neutral panel differs from reference cream; this is the explicit T01 mapping, so no color override is added.
3. Foundation specimens remain below arrivals in the existing preview; services, newsletter, footer, and final acceptance remain T20–T26.
