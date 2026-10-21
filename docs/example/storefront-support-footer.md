# A1 supporting sections — T20–T24

Status: runtime implemented. The `/` route now follows the complete selected A1
section order through service benefits, newsletter, and footer. Existing token,
layout, and control specimens are preserved at `/komponen`; they no longer
interrupt the homepage. T25 inventory approval and T26 assembled-design acceptance
remain separate work.

## T20 — Service benefits

`ServiceBenefits.svelte` renders three outline Tabler icons (ShoppingBag,
CreditCard, Headset), each 32px with 1.5px strokes, next to the pictured title and
short description:

- Pilihan Kosmetik — Temukan produk sesuai kebutuhanmu.
- Pembayaran Aman — Pilihan pembayaran yang praktis.
- Butuh Bantuan? — Kami siap membantu belanjamu.

The desktop row uses three equal zero-minimum tracks, shared spacing, an upper
rule, and subtle item separators. Below 768px it stacks with pad-sized spacing
and removes the vertical separators. Icons are decorative; headings/copy carry
the content. All source colors, typography, and divider roles remain unchanged.

## T21 — Newsletter form

`NewsletterForm.svelte` accepts required `privacyHref` and optional
`subscribe: (email: string) => Promise<void>`. It reuses T03's submit Action,
without an arrow, and the existing field roles. The desktop field is at least
38px, the button keeps the base 32px height, and both become at least 44px on
compact/coarse-pointer devices. Below 768px the field/button stack, with the
button filling the row. Mobile field text uses the existing 16px token.

The field has a unique associated label independent of its placeholder,
`type="email"`, `autocomplete="email"`, `inputmode="email"`, and `required`.
Validation uses the native email validity result with custom readable feedback.
Input focus always uses the shared accent outline. Invalid borders use negative
ink, and `aria-invalid` is set for an invalid address. The privacy line remains
small, legible, and underlined; the feedback ID and privacy ID are associated
through `aria-describedby`. Feedback is announced from a persistent polite live
region; colors are accompanied by text.

| State | Behavior |
| --- | --- |
| Idle | Empty/fillable field and “Berlangganan”. No response is invented. |
| Invalid | Explain missing/invalid email, mark the field, and focus it; do not invoke the adapter. |
| Submitting | Set `aria-busy`, make the field read-only, disable submit, show “Mendaftarkan…” and progress text; prevent duplicate submission. |
| Success | Only after the supplied adapter resolves, show confirmation and disable repeat submit until the user edits the field. |
| Failure | Preserve the address, show readable failure text, and permit retry. Adapter rejection is caught. |
| No adapter | Explain that registration is unavailable and the address was not sent. No network request or successful signup occurs. |
| No JavaScript | Field/button remain disabled in server HTML, with a noscript explanation; hydration enables the form. This prevents a native fallback submission of the address. |

The production preview deliberately supplies **no adapter**. No endpoint, email
provider, persistence, or tracking was added. A real integration must resolve only
after a confirmed signup and reject on failure. The local `/komponen` fixture
supplies a clearly labeled 600ms simulation with selectable success/failure;
changing that selector resets the example. It never sends or stores an address.

## T22 — Newsletter section

`NewsletterSection.svelte` wraps the form in the T02 equal split layout. It uses
“Inspirasi cantik di inbox-mu.” and “Kabar koleksi terbaru dan penawaran pilihan.”
The word `inbox-mu.` stays together to avoid a dangling `mu.` line. Desktop aligns
copy/form; compact screens place copy above the stacked form. The inset panel
uses raised neutral fill, pad-sized inset, and the existing card radius. A1's
pale composition is retained with T01's neutral panel and primary pair. A2's
full-width green band is not selected.

## T23 — Footer brand and social controls

`StoreFooter.svelte` uses the same Inter 24px/700 wordmark treatment and home-link
name as Header, followed by “Kosmetik pilihan untuk riasan sehari-hari.” Tabler
Instagram, Facebook, YouTube, and TikTok glyphs are 20px with shared 44px targets
and 8px gaps. SVGs are decorative; each configured anchor has the platform name.
Links receive the shared focus outline and neutral hover/press surfaces.

The component accepts an optional `socialLinks` mapping with `instagram`,
`facebook`, `youtube`, and `tiktok` URLs. No official brand handles were supplied.
Therefore the homepage shows named, unavailable social controls in muted ink,
without fake account URLs or active tab stops. Provide approved URLs to turn
those controls into links; no extra visual change is necessary. This integration
is explicitly disclosed in the footer preview note.

## T24 — Footer navigation and legal row

The footer has one contentinfo landmark outside main. Desktop uses a brand
column and three navigation groups: Belanja, Bantuan, Informasi. Their link lists
follow A1. Compact screens give the brand a full row and wrap the three groups
into a two-column grid. Text wraps naturally, and mobile/coarse links retain 44px
minimum heights. Group labels are headings; each nav has a distinct accessible
name. Footer rules, left-aligned copyright, text roles, and focus styles follow
T01. Copyright is the reference's “© 2026 KOSMETIK. Seluruh hak cipta dilindungi.”

Belanja links point to real local collection/category anchors. Existing header
category links were updated to these homepage sections after the foundation
fixtures moved. Help/information links retain a known `info` value in the URL and
open `#informasi-pratinjau`, which explicitly says the selected content is not yet
available. The newsletter privacy link uses that same destination. **No privacy
policy, commercial terms, shipping promises, contact details, or account URLs
were fabricated.** The footer's sample-data/integration note remains visible.

## Verification and remaining integration

- `npm run check`: 0 errors/warnings. Production build passes.
- Targeted source lint: 0 failures/warnings.
- Read-only browser geometry/DOM checks at **320, 390, 767, 768, 860, 1440px** pass:
  section order, three/one service columns, inline/stacked form, 38px/32px desktop
  and 44px compact controls, associated email label/descriptions, live feedback,
  one footer, three named groups, four unavailable social controls, valid fragment
  targets, unique IDs, and zero horizontal overflow.
- `/komponen` retains the original specimens plus the newsletter fixture. A direct
  privacy URL explicitly identifies its unavailable policy. Server HTML has the
  newsletter disabled while the hydrated client enables it.
- Final inspector at 1440/768/390px: 0 failures with the explicit A1 exceptions
  `eyebrow`, `hairline`, `body-size`, `small-text`, `focal-point`, `still-page`.
  The added `small-text` exception is required by the 12px rating/privacy/legal
  token roles, not a silent typography override. Three generic warnings remain:
  prescribed muted body text, no footage in the still reference, and the specified
  tablet hero type size.
- All final folds/full-page sheets were opened, plus focused 320/1440px supporting
  section screenshots. No unresolved clipping or alignment defect was observed.
- The in-app browser failed to open its test tab (`net::ERR_ABORTED`). Consequently
  submit/keyboard interaction and screen-reader announcements have **not** been
  exercised end-to-end. State handlers were implemented and type-checked; the
  local fixture makes their subsequent interactive review concrete. No successful
  live signup, actual policy, or configured social-account integration is claimed.

Pending before launch: supply a newsletter adapter and approved policy/help/social
destinations; confirm sample catalog/service copy; perform interactive form and
assistive-technology checks, and T25/T26 acceptance. No new images were needed:
T20/T23 reuse the installed Tabler icon family.

### Final visual critique (T20–T24 scope)

ROUND 2
Seen in one second: a complete A1 storefront with a quiet shopping-support row, clear email signup, and readable footer groups.
Idea (one sentence): the same neutral surfaces and outline controls carry A1's shopping flow through its closing sections.
Live thing: the newsletter validates locally; only an explicitly supplied adapter can report a real signup.
Layout words by section: services=three icon/text items; newsletter=inset copy/form split; footer=brand plus three nav columns; compact=stacked services/form and wrapped footer.
Scores: design 8 · usability 8 · creativity 7 · content 8 → overall 7.9 for the implemented visual scope.
Caps applied: no visual caps; interactive and live-integration acceptance remains explicitly pending.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. The 390px newsletter heading previously split inbox-mu after the hyphen; the word now stays together.
2. A privacy full stop could wrap alone on tablet; it now stays inside the final linked word.
3. Long preview notes made the footer hard to scan; their measure is capped at 60ch. Missing external destinations remain clearly identified rather than invented.
