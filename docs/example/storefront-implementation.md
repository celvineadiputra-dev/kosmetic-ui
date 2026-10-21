# T01–T04 — Runtime implementation (A1)

## Delivery by task

- **T01:** `src/lib/components/storefront/foundation.css` copies the source light
  foundation roles without changing names or values. Storefront extensions are
  in a separate block. The wrapper isolates conflicting application tokens.
  Inter is registered locally under the source family name. Skill CSS and global
  application theme values are unchanged.
- **T02:** the same stylesheet supplies `.store-container`, `.store-section`,
  `.store-product-grid`, `.store-category-grid`, `.store-split`, `.store-hero`,
  `.store-promo`, `.store-newsletter`, and media ratio classes. Desktop uses four
  columns from 768px; smaller widths use two. Split sections stack. Tracks have
  zero minimums. Images use `object-fit: cover`; product assets may override to
  `contain` when necessary. No page-level overflow hiding is used.
- **T03:** `Action.svelte` supports primary, section, and secondary variants,
  optional decorative arrows, section context, native submit buttons, disabled
  buttons, and plain unavailable link labels. Hover, focus, pressed, disabled,
  touch, and reduced-motion styles follow the contract. Standalone links use
  touch sizing; `class="inline"` opts prose links out of the standalone minimum.
- **T04:** `IconControl.svelte` uses Tabler's user, heart, shopping bag, and search
  glyphs at 20px with 1.5px strokes. Named controls have 44px minimum targets;
  favorites accept a controlled `pressed` value and emit native click events.
  Selected hearts are filled; wishlist navigation stays an outline. Ghost,
  outlined, disabled, and selected states are available.

## Usage

Import `foundation.css` once and place components under `.storefront`:

```svelte
<script lang="ts">
  import '#lib/components/storefront/foundation.css';
  import Action from '#lib/components/storefront/Action.svelte';
  import IconControl from '#lib/components/storefront/IconControl.svelte';
  let favorite = $state(false);
</script>

<div class="storefront">
  <main class="store-container">
    <Action href="/real-collection-destination" arrow>Belanja Sekarang</Action>
    <IconControl
      icon="favorite"
      label="Simpan Velvet Matte Lipstick ke favorit"
      pressed={favorite}
      onclick={() => favorite = !favorite}
    />
  </main>
</div>
```

Use real destinations when integrating navigation. `Action` defaults to
`type="button"`; pass `type="submit"` for forms. Native form, anchor, and button
attributes/events pass through. Use `disabled` for unavailable controls; this
handles behavior as well as appearance. Favorite state is owned by the caller;
apply persistence and error recovery there when an integration exists.

The `/` route demonstrates these foundations on surface and raised backgrounds,
responsive grids, split proportions, action variants, disabled states, native
submit, and an in-memory favorite toggle. Its navigation examples target real
sections in the preview. No account, cart, search, newsletter, or wishlist backend
is connected. T05–T26 and the complete A1 homepage remain separate work. Image
frames are explicitly labeled layout specimens, not product imagery.

## Verification and limits

- `npm run check`: 0 errors, 0 warnings.
- `npm run build`: passed, including client and SSR bundles.
- Source lint: pressed inset stroke is a documented T03 exception to the generic
  shadow ban. Control borders and Inter are explicit source requirements and
  account for the generic lint warnings.
- Browser inspector attempted at 1440, 768, and 390px but could not launch:
  no Chrome/Edge/Chromium executable is installed.
- The in-app browser fallback failed to bind preview tabs to this chat. No
  screenshot critique, measured overflow/contrast/focus checks, keyboard
  activation, or interactive browser pass is claimed.

Pending browser acceptance: review 320, 390, 767, 768, 860, and 1440px against
T02's geometry table; test enlarged text and wrapped labels; verify 32px base and
44px touch controls, icon centering, all focus/press/disabled combinations, native
keyboard activation, favorite toggling, form submit, and reduced motion. These
checks remain explicit rather than being inferred from a successful build.


## T05–T07 runtime continuation

The preview now includes the A1 header, persistent-label search field, and
category navigation. See [T05](./storefront-header.md),
[T06](./storefront-search.md), and [T07](./storefront-navigation.md) for contracts
and configuration. T08–T26 remain separate work. Existing T01–T04 specimens remain
available below the new header.

Verification: `npm run check` reports 0 errors/warnings; production build passes;
source lint reports 0 failures and the same three documented foundation warnings.
Eight HTTP/SSR requests verified all six active categories, invalid-category
fallback, one header landmark, accessible action names, search label association,
native GET submission markup, long query retention, and escaping. These HTTP
checks do not substitute for keyboard or visual browser checks. The inspector
was retried and still cannot launch: no Chrome/Edge/Chromium executable is present.

## T08–T09 runtime continuation

`Hero.svelte` now renders the A1 introduction, exact heading/description, one
shared CTA, and generated local cosmetics photography. See
[hero delivery and review](./storefront-hero.md) for the generation prompt, asset
provenance, responsive behavior, ratio-height correction, and final critique.
The reference direction is explicitly A1; no random direction or seed was used.

The browser availability issue was resolved for this task by locating Brave and
setting `CHROME_PATH`. Final hero geometry passes at five widths (320–1440px),
and desktop/tablet/mobile screenshots were reviewed. The generic inspector passes
with the specific task exceptions and remaining warnings listed in the hero notes.
Build and Svelte checks pass. T10–T26 remain separate work.

## T10–T16 runtime continuation

The preview now includes reusable SectionHeading, ProductCard, Rating, and
ProductSection components, typed reference product data, four favorites with
ratings, and four arrivals without ratings. See [product delivery and asset
prompts](./storefront-products.md) for each task's contract, sample-data limits,
eight local WebP image assets, and browser review.

Hero shopping and section-level collection links now target the eight-item
collection region. Product links retain selection in the URL and open a labeled
preview note. Full detail pages and checkout remain outside scope.

Final verification: Svelte checks and production build pass; inspector screenshots
at 1440/768/390px reviewed; focused browser checks at 320/390/767/768/860/1440px
confirm columns, image ratios/assets, price alignment, rating omission, accessible
rating names, and no horizontal overflow or nested controls. Generic inspector
exceptions and remaining foundation warnings are recorded in the product notes.
T17–T26 remain separate work; discovery/promotion can be inserted between favorites
and arrivals without changing the shared product components.
