# Editorial Home Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a responsive editorial storefront hero matching the approved Natural Beauty reference direction.

**Architecture:** Keep the hero self-contained in `Hero.svelte`, reuse the existing `Action` component and palette tokens, and add one optimized text-free image under `static/images`. Shared layout CSS changes are limited to removing obsolete hero split assumptions if they conflict with the component.

**Tech Stack:** Svelte 5, SvelteKit, TypeScript, component-scoped CSS, Tabler icons, Vite SSR, Node test runner.

**Spec:** `docs/superpowers/specs/2026-10-24-editorial-home-hero.md`

## Global Constraints

- Light mode only.
- CTA target remains `#koleksi`.
- All interface text remains semantic HTML, never rasterized into the hero image.
- Do not add unsupported cosmetic claims.
- Preserve the existing uncommitted storefront redesign and avoid unrelated edits.

## Review Focus

- The CTA must remain an actual link to `#koleksi`.
- The hero image must have stable dimensions and meaningful alternative text.
- The headline, description, and benefits must remain readable without the image.
- The mobile layout must not place text over the subject's face or product cluster.
- Reduced-motion users must not receive decorative image animation.

---

### Task 1: Semantic hero contract and photographic plate

**Files:**
- Create: `tests/hero.test.mjs`
- Create: `static/images/natural-beauty-editorial-hero.png`
- Modify: `src/lib/components/storefront/Hero.svelte`

**Interfaces:**
- Consumes: `shopHref: string` and the existing `Action` component.
- Produces: SSR-renderable hero markup with one heading, linked CTA, three benefits, and a stable hero image.

- [x] Write an SSR test that renders the real component and asserts its public content, link target, benefits, and image accessibility contract.
- [x] Run the test and verify it fails against the current hero.
- [x] Generate a text-free photographic plate from the supplied reference and save it in `static/images`.
- [x] Implement the semantic hero markup and minimal responsive styling.
- [x] Run the SSR test and verify it passes.

### Task 2: Responsive visual integration and verification

**Files:**
- Modify: `src/lib/components/storefront/Hero.svelte`
- Modify if required: `src/routes/layout.css`

**Interfaces:**
- Consumes: Task 1 hero markup and image asset.
- Produces: the approved desktop, tablet, and mobile editorial composition.

- [x] Refine desktop and mobile composition using existing palette tokens.
- [x] Run `npm run check` and fix any diagnostics in changed code.
- [x] Run `npm run build` and confirm a successful production build.
- [x] Inspect the live page at 1920×1087 and a mobile viewport; correct visible overlap, crop, focus, or contrast issues.

