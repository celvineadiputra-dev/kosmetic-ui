# T07 — Category navigation (A1)

Status: runtime implementation complete in
`src/lib/components/storefront/CategoryNav.svelte`; visual browser review pending.

A named “Kategori produk” navigation landmark contains one list of real links.
The A1 order follows the explicit task/T01 decision: **Semua Produk, Wajah, Bibir,
Mata, Brush & Tools, Promo**. This intentionally retains Bibir before Mata even
though the reference image reverses them.

Links use text ink, the shared font/body size, and 44px minimum target height.
The active link uses accent ink plus a 2px accent bottom border and
`aria-current="page"`. A transparent border reserves that space on inactive
items. Keyboard focus uses the shared 2px accent outline with 2px offset. Hover
underlines links on hover-capable devices; pressing uses accent ink. There is
no additional motion.

The navigation shares the content container, with pad-sized gaps and centered
alignment on desktop. Below 768px it aligns to the start with gap-sized spacing.
Items wrap onto additional rows, preserving DOM order and leaving every category
visible without document overflow or a clipped focus ring.

The component takes `items` (id, label, real href) and `active`. The preview uses
URL-driven category links (`?kategori=wajah#tata-letak`, etc.), so navigation and
active states also work on direct visits and without client JavaScript. Invalid
category values fall back to Semua Produk. The grid specimen explicitly states
that it is not a category result; catalog filtering is outside this task.

HTTP/SSR checks passed for all six active links and invalid-category fallback.
Production build and Svelte checks passed. Browser sizing, focus, back/forward,
zoom, and touch checks remain pending because the inspector cannot launch Chrome.
