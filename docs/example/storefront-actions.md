# T03 — Buttons and text links

Status: runtime implementation available; see [implementation notes](./storefront-implementation.md). The design contract below remains authoritative; browser validation is pending.

## Shared treatments

| Treatment | Appearance | Uses |
| --- | --- | --- |
| Filled CTA | `--primary` background, `--primary-ink` text, transparent 1px border, `--radius-control` corners | “Belanja Sekarang”, “Jelajahi Koleksi”, and newsletter “Berlangganan” |
| Section link | `--text`, no resting underline, optional trailing arrow | “Lihat Semua”; use the same treatment for “Jelajahi semua” where needed |
| Secondary link | `--text`, persistent underline | Supporting navigation such as collection and privacy links |

Use `--font` and `--fs-body`, weight 500, with a 20px line height for action labels.
The privacy sentence may use `--fs-small` with a 16px line height; its inline link
inherits that size and remains underlined. No additional color or typography
tokens are needed. Never substitute the application's existing green button
variant for the scoped storefront primary pair.

Filled controls use `min-height: var(--control-height)`, 12px inline padding and
5px block padding plus the 1px border. These are shared component geometry rules
matching the source's 32px single-line control height. Use a minimum rather than
a fixed height so wrapped labels and enlarged text can increase the control's
height. Set `max-width: 100%`, `min-width: 0`, and allow labels to wrap with
`overflow-wrap: anywhere`; never truncate an action label.

Buttons size to their content on desktop. On screens up to 767px or devices with
a coarse pointer, filled controls and standalone action links have a minimum
height of `--store-touch-target`; filled controls also have that minimum width.
Keep the base `--control-height` unchanged. Inline prose links wrap naturally;
give them adequate surrounding line spacing rather than turning each into a
44px block. Newsletter form stacking and full-width submit sizing belong to T21.

Section links have no inline padding so their labels align with the content edge.
Standalone secondary links use the same geometry. Underlines are 1px thick with
a 3px offset. The persistent underline distinguishes a secondary link within text.

## Optional arrow

Use one shared right-arrow outline icon at 16 × 16px, with a 1.5px stroke and
`currentColor`. Position it after the label using inline flex, centered alignment,
and a gap of `calc(var(--gap) / 2)`. Keep the icon from shrinking and vertically
center it against the whole label block when the label wraps. The label flex child
has `min-width: 0`.

The arrow is decorative (`aria-hidden="true"`, `focusable="false"`); it is part
of the same action, not another link or tab stop. Omitting it removes the gap as
well. Use it for hero/promotional CTAs and section links as pictured; the
newsletter submit button has no arrow. No arrow translation or extra hover motion.

## State contract

States use the same geometry, preventing layout shifts. Focus remains visible
when combined with hover or press; disabled appearance takes precedence over
hover and press.

| State | Filled CTA | Section / secondary link |
| --- | --- | --- |
| Default | Primary pair above | Text ink; secondary underline remains visible |
| Hover, on devices supporting hover | Keep primary pair and underline label | Underline section label; increase secondary underline to 2px |
| Keyboard focus | 2px solid `--accent` outline, 2px offset; keep fill and label ink | Same accent outline and offset, with visible underline |
| Pressed | Keep primary pair; add a 1px inset outline in `--primary-ink` with −3px offset; underline label | Keep text ink; underline at 2px thickness |
| Disabled | `--raised` fill, `--muted` label/icon, `--control` border; no underline or inset outline; not-allowed cursor | Render unavailable label in `--muted` without arrow or underline; default cursor |

Implement the filled pressed inset outline with an inset box shadow so it can
coexist with the external keyboard focus outline. It is an internal stroke, not
an elevation shadow. All treatments remain flat: no translation, scale, or bottom
shadow. Do not apply element opacity to disabled controls: the muted text retains
contrast on the raised fill. A disabled label must still be readable.

Use `--t-hover` for color or decoration-color transitions and `--t-press` for
pressed inset-stroke feedback, with `--ease-out`. Focus indicators appear
immediately. Under `prefers-reduced-motion: reduce`, remove these transitions;
the static states remain visible. Enable hover styles only under `(hover: hover)`
and only for enabled actions.

## Semantics and integration

- Navigation CTAs and text links use anchors with real destinations; actions use
  buttons. Newsletter submit uses a native `button` with `type="submit"` and the
  same filled treatment. Other action buttons explicitly use `type="button"`.
- Use native `disabled` for unavailable buttons; it removes activation and the
  tab stop. If a control must stay focusable to explain temporary unavailability,
  use `aria-disabled="true"`, preserve keyboard focus styling, and prevent all
  activation paths in code. Styling alone does not disable it.
- An unavailable navigation destination is plain text with
  `aria-disabled="true"`, no `href`, no link role, and no tab stop. Provide nearby
  explanatory text when the reason is needed. Never use a live `href="#"` as a
  disabled link. Do not show unavailable links as ordinary enabled actions.
- Enter activates a link; Enter or Space activates a button. Keep the visible
  Indonesian label as its accessible name. Where several “Lihat Semua” links
  coexist, append visually hidden section context, such as “Pilihan Favorit”,
  without replacing the visible label in the accessible name.
- Do not nest buttons or links. Keep focus outlines outside clipping regions.
  Loading labels, validation, success, and failure behavior for the newsletter
  remain T21 work; this task defines its normal and disabled visual treatment.

## Review evidence and remaining checks

Calculated from the source light tokens: primary ink against primary fill is
approximately 16.5:1, default link ink on surface is 18.9:1, disabled muted ink on
raised fill is 5.5:1, and the accent focus outline contrasts at least 5.4:1 against
surface/raised. These pairs preserve label legibility without new palette values.

During implementation, inspect all four interaction states plus default on both
surface and raised backgrounds. Check arrow/no-arrow variants, the three CTA
labels, section links, inline links, wrapped labels, keyboard activation, and
disabled activation prevention. Verify 32px base and 44px touch minimum heights,
visible focus with no clipping, and reduced motion. Runtime controls are now available; browser measurements and rendered QA remain pending.
