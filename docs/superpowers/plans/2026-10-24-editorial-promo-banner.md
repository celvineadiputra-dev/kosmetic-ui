# Editorial Promo Banner Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign `PromoBanner.svelte` into an asymmetrical luxury magazine spread using `Sunlit Beauty Still Life with Blossoms.png`.

**Architecture:** Keep the promotional banner self-contained in `PromoBanner.svelte`, reuse `Action.svelte` and design system tokens, clean up any conflicting `.store-promo` split rules in `src/routes/layout.css`, and validate behavior with an SSR contract test in `tests/promo-banner.test.mjs`.

**Tech Stack:** Svelte 5, SvelteKit, TypeScript, component-scoped CSS, Vite SSR, Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-24-editorial-promo-banner.md`

## Global Constraints

- Light mode only.
- Palette: Warm Cream `#F3EEE8`, Deep Brown `#674536`, Terracotta `#874E3C`, Soft Nude `#D6B9A7`, Charcoal `#302823`.
- CTA target remains `collectionHref` (default `#baru` or as passed by props).
- No resting drop shadows or artificial borders.
- Reduced-motion users must receive static transitions.
- All interface text remains semantic HTML, not rasterized into images.

---

### Task 1: SSR contract test and semantic markup

**Files:**
- Create: `tests/promo-banner.test.mjs`
- Modify: `src/lib/components/storefront/PromoBanner.svelte`

**Interfaces:**
- Consumes: `collectionHref: string` prop and `Action` component.
- Produces: SSR-renderable promo banner markup with kicker, serif heading, description, 3 highlights, linked CTA, and image with stable dimensions.

- [x] Write an SSR test in `tests/promo-banner.test.mjs` asserting public content, link target, 3 highlights, and image accessibility contract.
- [x] Run the test and verify it fails against the current PromoBanner.
- [x] Implement the semantic promo banner markup and styling in `PromoBanner.svelte`.
- [x] Run the SSR test and verify it passes.

### Task 2: Responsive visual integration and verification

**Files:**
- Modify: `src/lib/components/storefront/PromoBanner.svelte`
- Modify if required: `src/routes/layout.css`

**Interfaces:**
- Consumes: Task 1 promo markup and styling.
- Produces: Approved desktop, tablet, and mobile magazine spread composition.

- [x] Refine desktop (asymmetrical 2-column spread) and mobile (stacked plate above copy) styling using design tokens.
- [x] Run `npm run check` and fix any diagnostics in changed code.
- [x] Run `npm run build` and confirm a successful production build.
- [x] Inspect the live page at 1920×1087 and mobile viewports with `inspect.mjs` to verify visual appeal and lack of overlap or contrast issues.
