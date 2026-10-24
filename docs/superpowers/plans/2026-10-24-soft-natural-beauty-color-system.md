# Soft Natural Beauty Color System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the supplied Soft Natural Beauty palette across the application through the semantic tokens in `src/routes/layout.css`.

**Architecture:** Keep the established semantic CSS custom-property interface and replace only its color values and storefront aliases. Store exact visual equivalents in OKLCH, remove dark-mode overrides, and add browser-surface styling without altering component markup or layout.

**Tech Stack:** SvelteKit, CSS custom properties, Tailwind CSS v4, OKLCH

**Spec:** `docs/superpowers/specs/2026-10-24-soft-natural-beauty-color-system.md`

## Global Constraints

- The supplied HEX palette is the visual source of truth.
- Preserve existing semantic token names and storefront layout rules.
- Keep readable text at WCAG AA contrast: 4.5:1 for normal text and 3:1 for large text and UI boundaries.
- Modify no Svelte component for this palette migration.
- Preserve all pre-existing user changes.

## Review Focus

- Primary button text remains readable in the light theme.
- Secondary text remains at least 4.5:1 against its normal surfaces.
- Status colors remain semantically distinct from brand colors.
- Focus rings and browser surfaces remain visible in the light theme.
- Product-card layout and the existing subgrid correction remain unchanged.

---

### Task 1: Replace and extend semantic color tokens

**Files:**
- Modify: `src/routes/layout.css:7-157`

**Interfaces:**
- Consumes: existing CSS variables used throughout `src/`
- Produces: unchanged token names plus `--success`, `--success-foreground`, and their Tailwind color aliases

- [ ] **Step 1: Assert the current theme does not yet contain the new palette**

Run an `rg` assertion for the exact OKLCH values from the spec and confirm at least the new primary value is absent.

- [ ] **Step 2: Replace the light theme values**

Map every role in the spec table to its exact OKLCH equivalent, use white on Deep Brown, and make Terracotta the storefront accent.

- [ ] **Step 3: Remove dark mode**

Remove the dark custom variant and dark token override block so the application has one intentional light theme.

- [ ] **Step 4: Add explicit success aliases**

Expose `--success` and `--success-foreground` through `@theme inline`, then map storefront `--positive` to `--success`.

- [ ] **Step 5: Verify token coverage**

Run static assertions for every supplied palette value, both success aliases, and the `--positive` mapping.

### Task 2: Finish browser-level palette coverage

**Files:**
- Modify: `src/routes/layout.css:159-193`

**Interfaces:**
- Consumes: semantic tokens from Task 1
- Produces: palette-aware selection, caret, scrollbar, and link underline behavior

- [ ] **Step 1: Add browser-surface styles**

Theme `::selection`, `caret-color`, Firefox scrollbar properties, WebKit scrollbars, and anchor underline offset from existing semantic tokens.

- [ ] **Step 2: Run project validation**

Run `npm run check` and expect zero errors and warnings. Run `npm run build` and expect a successful production build.

- [ ] **Step 3: Inspect responsive rendering**

Check `/produk/mascara` at 1920×1087 and a mobile viewport; verify surfaces, text, actions, focus, and unchanged product-card alignment.

