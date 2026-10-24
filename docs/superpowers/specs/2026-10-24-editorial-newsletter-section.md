# Editorial Newsletter Section Redesign (Option A: Invitation Card)

## Goal

Redesign `NewsletterSection.svelte` and `NewsletterForm.svelte` from a plain split utility bar into a spacious, elegant editorial invitation card aligned with Casandra's Soft Natural Beauty design system.

## Approved Direction (Option A: Editorial Invitation Card)

- **Composition**: An integrated, spacious card with a Warm Cream background (`#F3EEE8`), rounded corners (`var(--radius-card)`), and generous padding (`clamp(2.5rem, 4.5vw, 4rem)`).
- **Typography & Content**:
  - Kicker: `WARTA EKSKLUSIF` (terracotta `#874E3C`, tracked uppercase, sans-serif)
  - Heading: `Inspirasi riasan natural<br />di inbox-mu.` (high-contrast `Playfair Display` serif, dark charcoal `#302823`)
  - Description: `Dapatkan kurasi tren kecantikan, panduan pemilihan warna natural, serta penawaran eksklusif anggota pertama kali.` (color `#50372B`, sans-serif)
  - Form:
    - Input: clean input with subtle border, `#FDFBF7` surface, warm terracotta focus outline, placeholder `Alamat email kamu`.
    - Submit Button: Primary [`Action`](file:///home/celvine/Downloads/kosmetic-ui/src/lib/components/storefront/Action.svelte) button with `Berlangganan` / `Mendaftarkan…`.
    - Privacy text: discreet `Dengan berlangganan, kamu menyetujui kebijakan privasi.` with linked policy.
    - Accessible live region for feedback (`Sedang mendaftarkan...`, `Terima kasih! Kamu sudah berlangganan kabar CASANDRA.`, error messages).
- **Responsiveness**:
  - Desktop (`min-width: 900px`): 2-column layout (left: copy block with kicker, heading, and description; right: form with input and submit button side-by-side or stacked cleanly).
  - Mobile (`max-width: 899px`): Stacked layout with full-width input and button, comfortable touch targets (min 44px), and legible text.
- **Visual Constraints**:
  - Follows Casandra Soft Natural Beauty palette: Warm Cream `#F3EEE8`, Deep Brown `#674536`, Terracotta `#874E3C`, Charcoal `#302823`.
  - Zero harsh card borders or resting drop shadows.
  - Reduced-motion users receive static transitions.

## Decisions Made

- Preserve existing `subscribe?: (email: string) => Promise<void>` and `privacyHref: string` props contract so page functionality and tests remain intact.
- Update feedback message in `NewsletterForm.svelte` to refer to `CASANDRA` instead of `KOSMETIK`.
- Remove obsolete `.store-newsletter` split rules in `layout.css` to allow component-scoped flex/grid control.

## Open Questions

- None. Requirements and design decisions are fully specified.
