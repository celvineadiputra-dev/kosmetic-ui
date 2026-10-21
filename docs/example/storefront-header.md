# T05 — Main header

Status: A1 runtime implemented in `src/lib/components/storefront/Header.svelte`,
using T02's frame, T04's icon controls, and [T06's field](./storefront-search.md).
The `/` preview now renders this header followed by
[T07 navigation](./storefront-navigation.md). Production build, Svelte, and
HTTP/SSR semantic checks pass; visual browser validation remains pending.

## Desktop composition

Use a full-width `--surface` header with one shared `.store-container` inside.
Do not add another inline inset: its left and right edges align with the hero
and product sections. Place a single row in this order:

1. KOSMETIK home link.
2. Flexible, wide search form.
3. Account, wishlist, and shopping-bag actions.

Use CSS grid with `auto minmax(0, 1fr) auto`, `align-items: center`, and `--gap`
between tracks. The row has `calc(var(--gap) / 2)` block padding and a minimum
content height of `--store-touch-target`; its normal total height is 60px.
Allow it to grow rather than fixing the height. A 1px `--rule` divider separates
the header from the category navigation, which remains a separate T07 section.
The header stays in normal document flow; no sticky behavior is required.

The search form fills the middle track without its own max-width or external
margins. Both form and input have `min-width: 0`; long queries scroll within the
input rather than widening the track. Center the source's 38px desktop field
vertically against the 44px action targets. On coarse pointers, its minimum
height increases to `--store-touch-target` in T06 without changing alignment.

## Wordmark and actions

Render “KOSMETIK” as real text in `--font`, `--fs-title`, weight 700, line-height
1.2, `--text` ink, with normal letter spacing. This is A1's bold sans-serif
treatment; do not introduce a serif font. Its home link has at least
`--store-touch-target` height, vertically centered text, and the shared accent
focus outline. Its accessible name is “KOSMETIK, beranda”. The wordmark is not
the page's h1; that belongs to the hero.

The action group is inline flex with centered alignment and
`calc(var(--gap) / 2)` gaps. Account and wishlist each use T04's 44px icon-only
target and accessible name. Shopping bag uses the same icon geometry, plus the
visible label “Keranjang” on desktop. The icon and text are one link with a
single accessible name, not separate interactive elements. The label uses
`--fs-small`, `--text`, and a 16px line-height, with an 8px icon-to-label gap.
Give this combined link 8px inline padding and at least 44px height; allow its
text to wrap if needed. These dimensions are shared component geometry rules,
not new tokens.

A1 does not require the A2 cart-count badge: omit the count. Do not insert a
sample quantity or add an empty badge. Keep the wishlist icon outlined; it is
navigation rather than a pressed favorite toggle. All actions reuse T04's hover,
press, focus, and unavailable states.

## Compact composition

At viewport widths below 1024px, switch the header to a single-column grid with
an 8px row gap, retaining DOM and keyboard order: wordmark, search, actions.
Keep the wordmark at the start, search full width, and the action group aligned
to the end. Hide only the cart's visible text on compact screens; its accessible
name remains “Keranjang”. The three targets occupy 148px including their two
8px gaps. Do not shrink the wordmark or icon hit areas to force a single row.

This three-row layout is an intentional mobile proposal: it preserves the wide
search field and consistent reading/focus order without moving interactive
elements visually ahead of the search. Do not duplicate header controls for
different breakpoints. At text zoom or with longer localized labels, the row
heights can grow and the action group may wrap inside the container. Keep
`min-width: 0` on grid/flex children and permit text wrapping; never hide document
overflow to conceal sizing problems.

The header breakpoint differs from the catalog's 768px breakpoint deliberately:
four product columns fit on tablet while the wordmark, wide search, and full
action group need more horizontal room. At 1024px, the shared content width is
976px. Budgeting 160px for the wordmark, 240px for the desktop action group,
and two 16px gaps leaves 544px for search. These are conservative layout budgets,
not measured font widths or additional component width constraints. Compact
search width is 272px at a 320px viewport and 720px at 768px.

## Semantics and review

Use one top-level header/banner landmark. Keep the wordmark link, search form,
and named account/wishlist/cart links as distinct controls with no nesting. The
search landmark has an accessible name, and T06 provides the input's persistent
label independently of its placeholder. Navigation destinations and backend
behavior are outside this homepage design task; do not imply those integrations
exist or create placeholder `href="#"` actions.

All focus outlines use 2px `--accent` with 2px offset. Leave them clear of the
divider and container edges; do not clip the header. Icon-only compact controls
retain T04's accessible names when the cart text is hidden. No header animation
or additional palette roles are introduced.

The frame and target arithmetic have been checked against T01/T02. During
implementation, inspect 320, 390, 768, 1023, 1024, and 1440px widths and enlarged
text: confirm aligned centers, shared section edges, search flexibility, visible
focus, and no crowding or horizontal overflow. Font-width, screen-reader, and
browser checks remain pending, including integration with T06's field states.


## Runtime configuration

`Header` accepts `homeHref`, `searchAction`, `query`, `accountHref`,
`wishlistHref`, and `cartHref`. When an action destination is absent, render it
as unavailable content through T04 rather than inventing routes. The preview
passes `#catatan` for account, wishlist, and cart, where their pending integrations
are explained. The shopping bag reuses `IconControl`'s new optional `visibleLabel`;
that text is hidden below 1024px while its accessible name stays unchanged.

SSR checks confirm one header landmark and named account/wishlist/cart links.
The wishlist remains navigation without a pressed state. A1 has no count badge.
