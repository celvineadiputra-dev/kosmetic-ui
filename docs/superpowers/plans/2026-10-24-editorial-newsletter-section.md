# Editorial Newsletter Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `NewsletterSection.svelte` and `NewsletterForm.svelte` into an elegant editorial invitation card.

**Architecture:** Keep the component self-contained in `NewsletterSection.svelte` and `NewsletterForm.svelte`, preserve the existing prop contract (`privacyHref`, `subscribe`), remove obsolete `.store-newsletter` split rules in `layout.css`, and validate behavior with an SSR contract test in `tests/newsletter.test.mjs`.

**Tech Stack:** Svelte 5, SvelteKit, TypeScript, component-scoped CSS, Vite SSR, Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-24-editorial-newsletter-section.md`

## Global Constraints

- Light mode only.
- Palette: Warm Cream `#F3EEE8`, Deep Brown `#674536`, Terracotta `#874E3C`, Soft Nude `#D6B9A7`, Charcoal `#302823`.
- Input minimum touch target 44px on coarse pointers.
- No resting drop shadows or artificial borders.
- Reduced-motion users must receive static transitions.
- All interface text remains semantic HTML.

---

### Task 1: SSR contract test and semantic markup

**Files:**
- Create: `tests/newsletter.test.mjs`
- Modify: `src/lib/components/storefront/NewsletterSection.svelte`
- Modify: `src/lib/components/storefront/NewsletterForm.svelte`

**Interfaces:**
- Consumes: `privacyHref: string`, `subscribe?: (email: string) => Promise<void>` props and `Action` component.
- Produces: SSR-renderable newsletter card markup with kicker, serif heading, description, email input, submit button, and privacy link.

- [x] Write an SSR test in `tests/newsletter.test.mjs` asserting public content, input field, submit action, and privacy link contract.
- [x] Run the test and verify it fails against the current NewsletterSection.
- [x] Implement the semantic markup and styling in `NewsletterSection.svelte` and `NewsletterForm.svelte`.
- [x] Run the SSR test and verify it passes.

### Task 2: Responsive visual integration and verification

**Files:**
- Modify: `src/lib/components/storefront/NewsletterSection.svelte`
- Modify: `src/lib/components/storefront/NewsletterForm.svelte`
- Modify if required: `src/routes/layout.css`

**Interfaces:**
- Consumes: Task 1 newsletter markup and styling.
- Produces: Approved desktop, tablet, and mobile editorial invitation card composition.

- [x] Clean obsolete `.store-newsletter` rules from `src/routes/layout.css`.
- [x] Refine desktop (2-column spread) and mobile (stacked) responsive styling using design tokens.
- [x] Run `npm run check` and fix any diagnostics in changed code.
- [x] Run `npm run build` and confirm a successful production build.
- [x] Run all test suites (`hero`, `promo-banner`, `newsletter`).
- [x] Inspect the live page at 1920×1087 and mobile viewports with `inspect.mjs` to verify visual appeal and lack of overlap or contrast issues.
