# T06 — Search field (A1)

Status: runtime implementation complete in
`src/lib/components/storefront/SearchField.svelte`; visual browser review pending.

The field uses the T01 surface, control border, text, faint placeholder, and
control-radius tokens. The placeholder and persistent visually hidden label are
“Cari produk kosmetik”. Each instance gets a unique label/input ID. The search
landmark is named “Pencarian produk”. The leading Tabler search glyph is decorative,
20px with a 1.5px stroke, and does not introduce another tab stop.

Default height is 38px; below 768px or with coarse pointers it is at least 44px.
Mobile input text uses the existing 16px token. An empty field shows the faint
placeholder. A filled field keeps full text ink; the value remains editable and
scrolls inside the input. Focus adds the accent border and a 2px accent outline
with 2px offset, including mouse focus. Plugin focus shadows are explicitly reset.
No clipping wrapper or page overflow hiding is used.

The form submits a native GET query named `q` on Enter. Pass `action` to connect
it to the real destination and `value` to retain the query. In the preview,
`action="/#hasil-pratinjau"` returns to the page and states that results are not
connected. This is field and submission behavior, not product search integration.

Verified through Svelte checks, production build, and HTTP/SSR checks: search
landmark, associated label, native GET method, escaped query values, and retention
of a long query. Browser keyboard, zoom, touch, focus, and horizontal-overflow
measurements remain pending because the inspector has no Chrome executable.
