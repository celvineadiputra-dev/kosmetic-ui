# A1 hero — T08 and T09

## T08 — Hero copy

Implemented in `src/lib/components/storefront/Hero.svelte`, replacing the
foundation-only introduction on `/`. The hero is the page's sole h1 and appears
immediately after the header and category navigation, before preview notes.

- Introductory label: “Pilihan kosmetik harian”.
- Heading: “Riasan simpel, cantik setiap hari.” with a break after “simpel,”.
- Description: “Temukan kosmetik pilihan untuk tampilan terbaikmu.”
- One CTA: “Belanja Sekarang”, using the existing T03 Action and decorative arrow.

All typography uses Inter and the documented scale. The heading uses
`--store-display-size`, weight 700, 1.05 line height, and at most 18ch. The label
is the explicit A1/T08 exception to the generic skill's no-eyebrow rule; it stays
readable and does not introduce a new type token. The near-black primary pair,
neutral surfaces, and shared focus/disabled/motion styles remain authoritative.

`shopHref` is required so the component's caller supplies a real destination.
The preview points to `?kategori=semua#tata-letak`, which selects Semua Produk and
opens the existing labeled grid specimen. This is not a connected product catalog;
replace this destination when the shopping section is implemented.

## T09 — Hero photograph and composition

The inset hero uses the T02 shared frame, `.store-split`, `.store-hero`, and
media classes. From 768px it has equal copy/media columns with a preferred 4:1
outer ratio; copy remains in normal flow and may increase the height. Smaller
screens stack copy then the separate 4:3 media frame. Text never overlays the
photograph. Each image corner is rounded individually; the section does not clip
keyboard focus. Product media uses a centered cover crop and never stretches.

The supplied asset is `static/images/kosmetik-a1-hero.png`, 1536 × 1024px, generated
with the built-in imagegen tool. It is illustrative unbranded product imagery,
not a photograph of actual inventory. The original reference PNG is not cropped
or repurposed as an asset. Alt text names the depicted cosmetics; explicit image
dimensions reserve layout space, and eager/high-priority loading suits the hero.
The PNG is approximately 2 MB; responsive compressed renditions can be added in a
later media/performance task without altering the composition.

### Generation prompt (built-in imagegen)

> Use case: product-mockup. Asset type: local photographic hero image for Indonesian cosmetics storefront KOSMETIK, A1 composition. Create a photorealistic warm cosmetics still life: one open rose-nude lipstick in polished gold casing, one open round beige cushion compact, one warm beige foundation bottle with gold cap, and one open peach blush compact. All products unbranded. Arrange the complete four objects as a balanced group on pale cream stone with soft beige backdrop, delicate warm sunlight and subtle botanical shadows; small out-of-focus white blossoms at the far right. Wide landscape frame approximately 3:2. Keep the entire group in the middle 80% of the frame with ample space above and below and generous side breathing room, so it can be displayed in a wide right-hand hero panel and a 4:3 mobile frame without clipping packaging. Eye-level slightly elevated tabletop product photography, rich physical material detail, realistic reflections, quiet cream and champagne-gold photographic palette. No text, letters, logos, watermark, UI, collage, people, hands, or mock browser. Produce one final photograph.

## Verification

Svelte checks: 0 errors/warnings. Production build passes. Targeted source lint
for Hero and the assembled page: 0 failures/warnings. Browser review results are
recorded below after the final inspection. T10–T26 remain separate tasks.

### Final rendered checks

Brave was found at `/usr/bin/brave-origin` and used via `CHROME_PATH` with an
isolated temporary profile. The old Vite preview process needed a restart to
pick up dependencies added since T05–T07; no dependency or layout-shell edits
were needed for this task.

The first visual pass caught the tablet CTA overflowing its panel. The runtime
T02 hero rule now derives a **minimum height** from the documented ratio, rather
than enforcing an aspect ratio that can constrain the content. Banner height
therefore grows with text. The corresponding layout-contract example was updated.
Tracking was refined to −0.05em so the exact A1 headline also stays two lines at
320px without reducing the documented display size.

Read-only browser geometry checks passed at **320, 390, 767, 768, and 1440px**:
zero horizontal overflow, one h1, two heading lines, loaded image, CTA and media
inside the banner, and the expected stacked/split arrangement. Final screenshots
at 1440, 768, 390, and 320px were opened and reviewed, including full-page contact
sheets for the three standard viewports. All four cosmetics remain identifiable
within the final crops. Text is placed on the neutral copy surface, never over
the photograph. Keyboard activation and assistive-technology testing were not
performed in this visual pass; the existing native Action semantics are reused.

The final generic inspector reports **0 failures, 5 warnings**, with these explicit
brief/scope allowances: `eyebrow` (required A1 label and existing token specimens),
`hairline` (specified T05/T07 dividers), `body-size` (the mandatory foundation
scale), `few-pictures` (one image belongs to these two tasks), `focal-point` (A1's
specified size/proportions), and `still-page` (T01 does not authorize entrance or
scroll animation). These are documented exceptions, not an unqualified full-page
design-gate pass. Remaining warnings concern prescribed muted/12px text, the
specified tablet display size, no footage in this still-image task, and a long
paragraph in the existing foundation specimen. Those do not require expansion
into later homepage tasks.

### Final component critique

ROUND 3
Seen in one second: an everyday cosmetics hero with one shopping action and a warm product still life.
Idea (one sentence): A1's daily makeup selection becomes a direct text-and-product split.
Live thing: the existing shopping link opens the all-products grid specimen; no new widget is added.
Layout words by section: hero=neutral copy / warm still life; existing foundation specimens remain below.
Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.9 (hero scope only).
Caps applied: none within the requested hero scope; this is not a score for the unfinished full homepage.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Tablet CTA previously escaped the copy panel (`tablet-fold.jpg`, first pass); fixed by allowing content-driven banner height.
2. The 320px title previously wrapped to three lines; fixed by refining tracking without changing copy or display size.
3. The 2 MB PNG is larger than a production-optimized image; visual composition is complete, compressed responsive renditions remain a later media task.
