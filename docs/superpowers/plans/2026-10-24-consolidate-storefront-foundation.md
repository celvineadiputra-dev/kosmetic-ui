# Storefront Foundation Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `src/routes/layout.css` the single global stylesheet, remove `foundation.css`, and align storefront styling with the approved Clean Commerce theme, including dark mode.

**Architecture:** Keep the existing `.storefront` class API so component-local CSS does not need a broad rewrite. Define its legacy variable names as semantic aliases to the global OKLCH design tokens, move its layout primitives into `layout.css`, and rely on the root layout's global import.

**Tech Stack:** SvelteKit, Svelte 5, Tailwind CSS 4, CSS custom properties

**Spec:** Approved in chat on 2026-10-24: merge `foundation.css` into `layout.css`, follow the existing `layout.css` design, delete the old file, and inherit dark mode.

## Global Constraints

- Preserve existing storefront selectors and responsive layout behavior.
- Use the existing semantic OKLCH color system rather than a parallel hard-coded palette.
- Keep Inter Variable loaded only through the existing global package import.
- Do not change Svelte component behavior or public interfaces.

## Review Focus

- No route or component may continue importing the deleted stylesheet.
- Every legacy storefront variable consumed by component CSS must still resolve.
- `.dark` must flow through semantic aliases rather than being overridden by `color-scheme: light`.
- Responsive storefront grid and media-ratio rules must remain present.
- Svelte and production build validation must pass after consolidation.

---

### Task 1: Consolidate the storefront foundation

**Files:**
- Modify: `src/routes/layout.css`
- Modify: storefront route and component imports under `src/routes/**` and `src/lib/components/storefront/CartDrawer.svelte`
- Delete: `src/lib/components/storefront/foundation.css`

**Interfaces:**
- Consumes: the global semantic tokens declared by `layout.css`
- Produces: the existing `.storefront`, `.store-container`, grid, split, media, and accessibility class contract

- [x] **Step 1: Capture failing structural checks**

Verify that the old stylesheet exists and that imports still reference it.

- [x] **Step 2: Move and retheme the foundation**

Append the storefront primitives to `layout.css`, alias legacy variables to semantic global tokens, remove the duplicate font declaration, and allow inherited color scheme.

- [x] **Step 3: Remove redundant imports and source file**

Delete all direct `foundation.css` imports and delete the stylesheet.

- [x] **Step 4: Verify structure and compilation**

Run `rg` checks for stale references and unresolved legacy token declarations, then run `bun run check` and `bun run build`.

