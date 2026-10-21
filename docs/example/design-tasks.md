# Cosmetics storefront — small design tasks

## References and scope

- [A1.png](./A1.png): sans-serif typography, rounded inset hero and promotional banner, warm cream imagery, emerald actions.
- [A2.png](./A2.png): editorial serif headings and wordmark, full-width hero and promotional banner, dark green actions, flatter edges.
- Both references depict an Indonesian cosmetics homepage named **KOSMETIK**.
- This is a component design backlog. T01–T16 now have runtime implementations; backend integrations and remaining components are separate work.
- Use [app.css](../../.agents/skills/design-taste-frontend/assets/app.css) as the source of truth for design tokens. Choose A1 or A2 for composition, content, image placement, and section order.
- Mobile layouts and interactive states below are proposed requirements: the references show desktop layouts only.
- Where screenshot styling or a task below conflicts with `app.css`, the token mapping below takes precedence. Screenshot color and type descriptions record the references, not required overrides.
- Preserve the source token names and values. Document missing storefront roles separately; do not modify the skill's source CSS.

## Design token source and component mapping

| Role | app.css token(s) | Source value(s) |
| --- | --- | --- |
| Page and surfaces | `--ground`, `--surface`, `--raised`, `--active` | `#f9fafb`, `#ffffff`, `#f4f5f6`, `#eeeeee` |
| Borders and dividers | `--border`, `--rule`, `--control` | `#e8e8e8`, `#f1f2f3`, `#d1d5db` |
| Text | `--text`, `--muted`, `--faint` | `#111111`, `#5f6368`, `#6b6b6b` |
| Accent and focus | `--accent` | `#1f6f5c` |
| Primary action | `--primary`, `--primary-ink` | `#1d1f20`, `#ffffff` |
| Feedback | `--positive`, `--negative`, `--warning` | `#247b50`, `#c4242a`, `#92400e` |
| Typography | `--font` | `"Inter", system-ui, -apple-system, "Segoe UI", sans-serif` |
| Type sizes | `--fs-title`, `--fs-section`, `--fs-kpi`, `--fs-body`, `--fs-small` | `24px`, `16px`, `28px`, `14px`, `12px` |
| Spacing | `--pad`, `--gap`, `--card-pad` | `24px`, `16px`, `20px` |
| Corners | `--radius-card`, `--radius-control` | `8px`, `6px` |
| Control height | `--control-height` | `32px` |
| Motion | `--t-press`, `--t-hover`, `--t-ui` | `120ms`, `150ms`, `200ms` |
| Easing | `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |

- **Buttons (T03, T08, T19, T21):** primary buttons use `--primary` and `--primary-ink`, replacing the screenshot's green CTA. Use `--radius-control` and `--control-height`.
- **Typography (T05, T08, T10, T18, T22, T23):** use `--font`, including A2 headings and wordmark. Use the existing type scale for ordinary headings and text; document any additional hero display size as a storefront extension.
- **Sections (T09, T19, T22):** preserve inset/full-width composition but use `--surface` or `--raised`, `--text`, and `--radius-card` where corners are rounded. A2's dark newsletter band becomes a neutral surface with the standard primary button.
- **Cards and navigation (T07, T11–T18):** use `--gap` for grid gutters, `--accent` for category selection, and the shared text roles. Do not add dashboard panel borders or padding around product cards solely because `.panel` exists.
- **Inputs and focus (T04, T06, T21):** reuse `--control`, `--surface`, `--faint`, and `--radius-control`. The source input height is `38px`, a component rule rather than a token. Focus uses a `2px` accent outline with `2px` offset.
- **Extensions to specify in T01:** content max-width, hero display size, section spacing, image ratios, and a dedicated rating-star color. These are not existing `app.css` tokens; do not repurpose chart or warning colors for ratings.
- **Responsive and motion:** retain reduced-motion support and provide comfortable touch targets on mobile without changing the base height token. Define storefront grids separately from the source `.grid`, which collapses to one column below `860px`.
- **Scope:** use the light-theme foundation only. Sidebar, tables, charts, status pills, and dashboard shell styles are not required for this homepage.

## Page order

Header → category navigation → hero → favorite products → category discovery → promotional banner → new products → service benefits → newsletter → footer.

## Foundation tasks

### T01 — Map app.css design tokens

- [x] Map components to the existing `app.css` tokens using the table above, without duplicating raw values in component styles.
- [x] Document storefront extensions for missing layout, display typography, and imagery roles separately from the foundation.
- **Delivery:** [T01 storefront foundation](./storefront-foundation.md) selects A1 and records the component mapping, extension values, responsive assumptions, and intentional deviations. Runtime: `src/lib/components/storefront/foundation.css` scopes the exact source light tokens and documented extensions to `.storefront`.
- **Done when:** every component uses an existing token or a documented extension; screenshot styling does not silently override the foundation.
- **Dependency:** read `app.css` and choose A1 or A2 composition.

### T02 — Create the page container and grid

- [x] Define consistent content margins and a four-column desktop product grid.
- [x] Specify two-column product grids on narrow screens and stacked layouts for split sections.
- **Delivery:** [T02 storefront layout](./storefront-layout.md) defines the shared frame, responsive grids and splits, image proportions, and width checks. Runtime: `foundation.css` implements the shared container, two/four-column grids, split layouts, and image frames. Assembled-page browser validation remains pending.
- **Done when:** section edges align, content has no horizontal overflow, and images preserve their proportions.
- **Dependency:** T01.

### T03 — Design buttons and text links

- [x] Create a filled CTA using `--primary` and `--primary-ink` with optional trailing arrow, a section-level “Lihat Semua” link, and a secondary underlined link.
- [x] Define hover, keyboard focus, pressed, and disabled appearances; use the shared primary treatment for the newsletter button.
- **Delivery:** [T03 storefront actions](./storefront-actions.md) specifies shared geometry, optional arrows, interaction states, touch sizing, and accessible semantics, including the newsletter submit treatment. Runtime: `src/lib/components/storefront/Action.svelte` implements CTA/link variants and their states. Browser validation remains pending.
- **Done when:** labels remain legible and button dimensions, padding, and arrow alignment are consistent.
- **Dependency:** T01.

### T04 — Design icon buttons

- [x] Create shared outline controls for account, wishlist, shopping bag, search, and product favorite actions.
- [x] Specify accessible names, visible focus, and comfortably sized interaction areas; define selected favorite styling.
- **Delivery:** [T04 storefront icon controls](./storefront-icon-controls.md) defines the shared icon family, geometry, accessible names, states, and optional favorite variant. Runtime: `src/lib/components/storefront/IconControl.svelte` implements named Tabler controls, outlined/disabled variants, and controlled favorites. A1 product tiles retain plain images; browser validation remains pending.
- **Done when:** icons share stroke weight and alignment, and icon-only controls have labels available to assistive technology.
- **Dependency:** T01.

## Header tasks

### T05 — Design the main header

- [x] Arrange the KOSMETIK wordmark, wide search field, and account/wishlist/cart actions in one desktop row.
- [x] Use the bold sans-serif wordmark for A1 or serif wordmark for A2; show the cart count as illustrated in A2.
- **Delivery:** [T05 storefront header](./storefront-header.md) specifies A1's sans-serif wordmark, desktop alignment, action group, and compact reflow. A1 omits the A2 count badge. Runtime: `Header.svelte` implements the desktop row and compact reflow using the shared field and icon controls; visual browser validation remains pending.
- **Done when:** the wordmark, search, and actions align vertically and fit without crowding.
- **Dependencies:** T02, T04, T06.

### T06 — Design the search field

- [x] Add a leading search icon, subtle border, and Indonesian placeholder matching the chosen reference.
- [x] Specify empty, focused, and filled states, with a persistent accessible label independent of the placeholder.
- **Delivery:** [T06 search field](./storefront-search.md), implemented in `SearchField.svelte`; native GET submission and retained query, with visual browser validation pending.
- **Done when:** long queries fit or scroll inside the field and focus is clearly visible.
- **Dependencies:** T01, T04.

### T07 — Design category navigation

- [x] Add Semua Produk, Wajah, Bibir, Mata, Brush & Tools, and the reference-specific final link: Promo for A1 or Koleksi Baru for A2.
- [x] Match the reference's item order; mark the active item with green text and an underline.
- **Delivery:** [T07 category navigation](./storefront-navigation.md), implemented in `CategoryNav.svelte`; URL-driven active category and wrapping compact layout. The explicit task order keeps Bibir before Mata, as documented in T01. Visual browser validation remains pending.
- **Done when:** items have consistent spacing and a defined compact-screen treatment without overflow.
- **Dependencies:** T01, T02.

## Hero tasks

### T08 — Design the hero text block

- [x] A1: include the small introductory label, “Riasan simpel, cantik setiap hari.” heading, description, and “Belanja Sekarang” CTA.
- [ ] A2: include “Cantik dengan caramu sendiri.” heading, description, “Temukan Favoritmu” CTA, and “Lihat koleksi baru” secondary link.
- **Delivery:** [T08 hero copy](./storefront-hero.md#t08--hero-copy), implemented in `Hero.svelte` with A1 copy and the shared CTA. A2 is not selected.
- **Done when:** line breaks and text width resemble the chosen reference, with one clear primary action.
- **Dependencies:** T01, T03.

### T09 — Design the hero media and composition

- [x] Place warm cosmetics photography to the right while preserving readable space behind the left-hand text.
- [x] A1: use an inset rounded banner. A2: use a full-width image section with a taller editorial heading.
- **Delivery:** [T09 hero media](./storefront-hero.md#t09--hero-photograph-and-composition), implemented with a generated local still life and the responsive T02 inset split.
- **Done when:** products remain visible at desktop and mobile sizes, and text never loses contrast over the image.
- **Dependencies:** T02, T08; suitable source imagery.

## Product tasks

### T10 — Design the section heading row

- [x] Create a reusable title row with an optional subtitle and right-aligned “Lihat Semua” or “Jelajahi semua” link.
- [x] Support A1's compact sans-serif title/subtitle and A2's large serif heading.
- **Delivery:** [Runtime and review](./storefront-products.md#t10--section-heading). `SectionHeading.svelte`: optional subtitle/link, wrapped row, shared Action; A1 Inter treatment selected.
- **Done when:** the same component supports favorites and new arrivals, including a wrapped narrow-screen layout.
- **Dependencies:** T01–T03.

### T11 — Design the product image tile

- [x] Define consistent image crops and warm product photography across lipstick, cushion, blush, pencil, palette, mascara, powder, and brushes.
- [x] Include the top-right wishlist overlay for A2; A1 has plain product images.
- **Delivery:** [Runtime and review](./storefront-products.md#t11--product-media). Shared media in `ProductCard.svelte` and eight locally generated WebP assets; A1 omits overlays.
- **Done when:** tiles align across each row, product details are not awkwardly cropped, and optional controls remain visible.
- **Dependencies:** T01, T04; suitable source imagery.

### T12 — Design product information

- [x] Place product name, shade/variant details, and bold Indonesian rupiah price below the image.
- [x] Use the pictured information hierarchy, for example Velvet Matte Lipstick → Rose Nude · 6 warna → Rp89.000.
- **Delivery:** [Runtime and review](./storefront-products.md#t12--product-information). Typed reference data in `products.ts` and shared name/variant/price markup with aligned grid tracks.
- **Done when:** longer names wrap cleanly and adjacent cards retain a consistent visual rhythm.
- **Dependency:** T01.

### T13 — Design the rating row

- [x] Add a gold star, decimal-comma rating, and review count, such as “4,8 (128)”.
- [x] Make ratings optional: the pictured favorites have them; new arrivals do not.
- **Delivery:** [Runtime and review](./storefront-products.md#t13--rating). `Rating.svelte`: optional gold star, locale-formatted score/count, accessible equivalent; reference data only.
- **Done when:** the rating has a readable text equivalent and its omission leaves no empty placeholder row.
- **Dependency:** T01.

### T14 — Assemble the reusable product card

- [x] Combine image, information, optional rating, and optional wishlist into one component.
- [x] Specify product-link focus/hover styling and keep the wishlist action separate from the product link.
- **Delivery:** [Runtime and review](./storefront-products.md#t14--reusable-card). `ProductCard.svelte`: one product link, optional sibling favorite control, hover/focus states, all eight products.
- **Done when:** the card supports every pictured product without a separate layout per item.
- **Dependencies:** T11–T13.

### T15 — Design the favorites section

- [x] Combine the heading row and four product cards: lipstick, cushion, blush, and brow pencil.
- [ ] A2 only: add Semua, Wajah, Bibir, and Mata filter tabs with an underlined active state; define the no-results appearance for filtering. **Not applicable to the selected A1 composition.**
- **Delivery:** [Runtime and review](./storefront-products.md#t15--pilihan-favorit). `ProductSection.svelte` renders four favorites with ratings; A2-only filter tabs are not applicable.
- **Done when:** the four-column desktop row matches the selected reference and tabs have a documented selection state.
- **Dependencies:** T02, T10, T14.

### T16 — Design the new-arrivals section

- [x] Reuse the heading row and product cards for eyeshadow palette, mascara, loose powder, and brush set.
- [x] Use A1's “Baru untuk Kamu” or A2's “Baru, untuk kamu” heading treatment and omit ratings as pictured.
- **Delivery:** [Runtime and review](./storefront-products.md#t16--baru-untuk-kamu). The same section/card components render four new arrivals without rating slots.
- **Done when:** the section uses the shared components and keeps image and price alignment consistent.
- **Dependencies:** T02, T10, T14.


## Discovery and promotional tasks

### T17 — Design the category tile

- [ ] Support Wajah, Bibir, Mata, and Brush & Tools with matching category imagery.
- [ ] A1: image above a centered label strip. A2: label and arrow above the image, with subtle vertical separators between tiles.
- **Done when:** the entire tile has one clear link target and labels remain readable across sizes.
- **Dependencies:** T01–T03; suitable source imagery.

### T18 — Assemble category discovery

- [ ] Add A1's “Temukan Favoritmu” title/subtitle or A2's “Mulai dari yang kamu suka.” heading.
- [ ] Arrange four category tiles in one desktop row and a two-column narrow-screen grid.
- **Done when:** categories appear in the reference order and use one consistent tile treatment.
- **Dependencies:** T02, T17.

### T19 — Design the promotional split banner

- [ ] A1: cosmetics still life on the left; cream text panel with “Tampil natural, setiap hari.” and “Jelajahi Koleksi” CTA on the right.
- [ ] A2: beauty portrait on the left; pale green panel with “Sedikit riasan. Banyak percaya diri.” and “Eksplorasi Natural Look” CTA on the right.
- [ ] Define a stacked narrow-screen composition with readable heading, description, and button.
- **Done when:** the image and text panels have balanced proportions and follow the reference's inset/full-width treatment.
- **Dependencies:** T02, T03; suitable source imagery.

## Supporting section tasks

### T20 — Design a service-benefit item and row

- [ ] Create an outline icon plus short title/description for shopping help, payment, and customer support.
- [ ] Arrange three desktop items with subtle separators; stack them with suitable spacing on mobile.
- **Done when:** icon scale, text alignment, and separator placement match the selected reference.
- **Dependencies:** T01, T02, T04.

### T21 — Design the newsletter form

- [ ] Add an email field, “Berlangganan” button, and small privacy-policy sentence with a visible link.
- [ ] Specify focus, invalid email, submitting, success, and failure states, with accessible validation messages.
- **Done when:** the form fits inline on desktop and stacks without crowding on mobile; submission states are documented for later integration.
- **Dependencies:** T01, T03, T06.

### T22 — Design the newsletter section

- [ ] A1: rounded pale panel with “Inspirasi cantik di inbox-mu.” and supporting text.
- [ ] A2: full-width dark green band with “Kabar cantik, sesekali.”, light heading/body text, and light submit button.
- **Done when:** the copy and form feel balanced and contrast remains readable, including the privacy line.
- **Dependencies:** T02, T21.

### T23 — Design footer brand and social links

- [ ] Place the KOSMETIK wordmark, short brand description, and Instagram, Facebook, YouTube, and TikTok icons.
- [ ] Specify link focus states and accessible names for each social icon.
- **Done when:** the brand treatment matches the header and the social row has consistent spacing.
- **Dependencies:** T01, T04, T05.

### T24 — Design footer navigation and legal row

- [ ] Add three link groups: Belanja, Bantuan, and Informasi (A1) or Tentang (A2), following the pictured link lists.
- [ ] Add the lower divider and copyright line; follow A2's split left/right legal alignment when using A2.
- [ ] Define a readable stacked or wrapped mobile arrangement.
- **Done when:** all columns align, links have clear focus states, and no footer text is clipped.
- **Dependencies:** T01, T02, T23.

## Final review tasks

### T25 — Prepare an image and icon inventory

- [ ] List required hero, product, category, promotional, and social/icon assets with intended crop and alternative text.
- [ ] Locate original assets or approved replacements; the reference PNGs are visual guides, not a source of full-resolution individual product photographs.
- **Done when:** every image slot has a documented asset or an explicit missing-asset note.
- **Dependency:** review T09, T11, T17, T19, and T23.

### T26 — Review the assembled design

- [ ] Compare the full desktop page against the chosen reference for section order, typography, spacing, imagery, and alignment.
- [ ] Review proposed tablet/mobile layouts, keyboard focus, text contrast, form states, and long product names.
- [ ] Record any intentional deviations and any links or behavior awaiting implementation.
- **Done when:** all selected components are represented, no unintended style mixing remains, and unresolved items are explicitly listed.
- **Dependencies:** T01–T25.

## Suggested delivery order

1. Choose A1 or A2; define tokens, layout, and asset inventory: T01, T02, T25.
2. Design shared controls: T03, T04, T06.
3. Complete header/navigation and hero: T05, T07–T09.
4. Complete product components and sections: T10–T16.
5. Complete discovery and promotion: T17–T19.
6. Complete service benefits, newsletter, and footer: T20–T24.
7. Review the assembled design: T26.

Keep each numbered task as a separate work item. Product detail pages, checkout, account screens, search results, and backend integrations are outside this screenshot-based homepage design backlog.

## T01–T04 runtime verification

The `/` route is a component preview for these four tasks, not the assembled
homepage. See [implementation notes](./storefront-implementation.md) for usage,
verification, and remaining browser checks. T05–T26 are outside this implementation.
