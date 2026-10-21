# A1 product sections — T10–T16

Status: runtime implemented. The `/` route now orders header → category navigation
→ hero → Pilihan Favorit → Baru untuk Kamu → existing foundation specimens.
Discovery and promotion are now inserted between the two product sections by
[T17–T19](./storefront-discovery-promo.md). A2 styling and filter tabs are not selected.

## T10 — Section heading

`SectionHeading.svelte` takes `id`, `title`, optional `subtitle`, optional `href`,
and optional `linkLabel` (default “Lihat Semua”). It uses the A1 Inter title and
body tokens, aligns the link to the right, and wraps its flex row on narrow
screens. The link reuses T03's Action with an arrow and hidden section context.
The existing token contract overrides A2's serif treatment; no serif is added.

Both collection links target `#koleksi`, the region containing all eight preview
products. This does not imply a separate catalog route. Hero shopping now targets
that region too.

## T11 — Product media

Every card shares a 3:2 image frame, card-radius corners, raised fallback, centered
cover crop, explicit 768 × 512 dimensions, lazy loading, and async decoding. The
eight local WebP photographs were generated independently using the built-in
imagegen tool, reviewed, and exported through the browser's WebP codec at 0.88
quality. The export changes delivery size/format only. All products fit their
frames without cutting off the packaging. A1 uses plain images.

## T12 — Product information

`products.ts` holds typed reference data; `ProductCard.svelte` renders name,
variant, and bold price in the foundation roles. Prices use Indonesian number
formatting with the reference's `Rp89.000` spacing. Names and variants wrap without
clamping or ellipses. CSS subgrid shares the name/variant/price track heights among
cards in each row, so a wrapped name or variant does not displace adjacent prices.
Cards remain plain media/information stacks, without dashboard panel chrome.

## T13 — Rating

`Rating.svelte` renders one decorative filled Tabler star in
`--store-rating-star`, a decimal-comma score and review count, and a readable
screen-reader equivalent (“Rating 4,8 dari 5, berdasarkan 128 ulasan.”). The
product link's accessible name also includes this information. Ratings come from
the reference, not verified reviews. They are optional: arrivals omit the rating
component and use four shared layout tracks instead of favorites' five.

## T14 — Reusable card

`ProductCard.svelte` accepts `product` and required `href`. One anchor contains
its media and information, with the shared accent focus outline. Hover/focus
underlines the product name; press strengthens the underline without movement.
The wrapper does not clip focus.

Optional `onfavorite` and `favorite` props add T04's controlled favorite toggle.
The control is a sibling to the link with an opaque surface and safe inset;
it is never nested inside the anchor. A1 sections do not pass that callback, so
no overlays render. Persistence is the caller's responsibility. This optional
variant is implemented but is not part of the A1 screenshot review.

Product links use `?produk={id}#catatan-produk`, a real preview destination that
retains selection in the URL and names the selected item. No detail page,
checkout, account, wishlist backend, or inventory API is introduced.

## T15 — Pilihan Favorit

`ProductSection.svelte` combines the shared heading and four cards: Velvet Matte
Lipstick, Lightwear Cushion, Soft Glow Blush, and Precision Brow Pencil. It uses
“Pilihan Favorit” / “Kosmetik esensial untuk setiap hari.” and the four reference
ratings. A1 has no A2 tabs, filter state, or associated empty-result screen.

## T16 — Baru untuk Kamu

The same section/card components render Everyday Eyeshadow Palette, Lift & Define
Mascara, Silky Loose Powder, and Essential Brush Set, under “Baru untuk Kamu” /
“Lengkapi koleksi riasanmu.” Ratings and overlays are omitted. Four columns apply
from 768px and two below 768px, using T02's existing container/gap rules.

## Image inventory and generation prompts

Saved assets are under `static/images/`. They are illustrative AI-generated
unbranded products, not photographs of live inventory. Names, prices, variants,
ratings, and counts are reference/sample data and must be confirmed before launch.
The page states this next to the collections. There are no third-party photo
credits or licenses to attribute.

Each image used the following exact base prompt plus its product sentence below:

> Use case: product-mockup. Make ONE photorealistic cosmetics catalog photograph, landscape 3:2. Consistent KOSMETIK A1 art direction: warm cream stone tabletop, soft beige backdrop, gentle morning sunlight from upper left, champagne gold and natural material details, realistic studio photography. One product only as specified, centered with ample breathing room on all four sides, every package part entirely inside the central 70% of frame, no awkward cropping, no text, no writing, no labels, no logos, no watermarks, no humans, no interface. Product:

| Saved asset | Product sentence | Bytes |
| --- | --- | ---: |
| `lipstick.webp` | An open rose nude matte lipstick in polished gold casing, with matching gold cap standing next to it. | 34304 |
| `cushion.webp` | An open round beige cushion foundation compact with polished gold rim and lid, and a clean beige powder puff resting beside it. | 68144 |
| `blush.webp` | An open circular peach blush compact, champagne gold reflective case, lid tilted upward, finely textured peach pink pressed powder. | 65564 |
| `brow-pencil.webp` | A dark brown eyebrow pencil with pointed cosmetic tip and a small spoolie brush at its other end, lying diagonally across a low pale stone block, its cap alongside. | 57256 |
| `eyeshadow.webp` | An open rectangular eyeshadow palette in a slim dark bronze case with nine warm neutral powder pans arranged in a 3 by 3 grid, tilted slightly toward camera. | 71382 |
| `mascara.webp` | A slim elegant black mascara tube with an open cap and its black spoolie wand leaning beside the standing tube, realistic black brush bristles, no writing. | 39736 |
| `loose-powder.webp` | An open small clear glass loose face powder jar filled with pale translucent beige powder, a round bronze lid leaning next to it, tidy fine powder texture. | 45332 |
| `brush-set.webp` | A coordinated set of five makeup brushes with warm brown handles, champagne metal ferrules and soft dark brown bristles, neatly standing and leaning beside a small beige zippered pouch. | 55254 |

Total: 436972 bytes (about 427 KiB) for the eight product images. Originals remain
in the imagegen output directory; runtime uses the exported workspace assets only.
Alt text is stored per asset in `products.ts`.

## Verification and limits

- `npm run check`: 0 errors/warnings. Production build passes.
- Source lint: 0 failures; the same three previously documented foundation warnings.
- Inspector at 1440/768/390px: 0 failures with the existing explicit A1 allowances
  `eyebrow`, `hairline`, `body-size`, `focal-point`, and `still-page`. The earlier
  `few-pictures` allowance is no longer necessary: nine images now render.
- All inspector screenshots (folds and full-page sheets) were opened. Product crops,
  mobile wrapping, section order within scope, and desktop price alignment reviewed.
- Remaining generic warnings reflect specified muted/small text and tablet type,
  no footage in the requested still-photo sections, and an existing long foundation
  specimen paragraph. No new token overrides or extra animation were added.

This is a design preview, not a verified commerce catalog. Full discovery,
promotional/supporting sections, asset approval, and assembled-page acceptance
remain T17–T26 work. No claim is made about a screen-reader or keyboard-user test.

### Focused browser acceptance

Browser geometry and DOM checks pass at **320, 390, 767, 768, 860, and 1440px**:
each section has four cards; columns switch from two to four at 768px; horizontal
overflow is zero; prices share a baseline within each row; image frames stay 3:2;
all eight WebP assets decode to 768 × 512; rupiah labels match the reference;
favorites have four ratings; arrivals have no ratings or reserved fifth track;
A1 has no wishlist overlays or nested links/buttons; accessible product names
include ratings where present. A direct product URL retains its selection and
renders the corresponding preview note. A 320px catalog screenshot was also opened
and reviewed. These checks inspect real browser output without claiming keyboard
or assistive-technology coverage.

### Final critique (requested product sections only)

ROUND 1
Seen in one second: a consistent warm cosmetics collection with clearly readable names and prices.
Idea (one sentence): the A1 product still lifes become a shared, quiet catalog rhythm.
Live thing: product links retain selection and open an honest preview note.
Layout words by section: favorites=four-column image/name/variant/price/rating stacks; arrivals=same shared grid without ratings; compact=two columns with natural wrapping.
Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.9.
Caps applied: none within T10–T16; this is not an assessment of the unfinished full homepage.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. No unresolved crop, overflow, or price-alignment defect in the reviewed product sections; both full-page sheets and 320px catalog screenshot checked.
2. Reference/sample data is not commerce inventory; it is labeled in the catalog note and requires confirmation before launch.
3. The page still shows foundation specimens after the collections; they are existing preview content, while discovery/promotion/supporting sections remain later tasks.
