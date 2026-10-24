<script lang="ts">
  let { label, href, image, alt, selected = false }: {
    label: string; href: string; image: string; alt: string; selected?: boolean;
  } = $props();
</script>

<a class="category-tile" {href} aria-label={`Jelajahi kategori ${label}`} aria-current={selected ? 'page' : undefined}>
  <div class="store-media store-category-media category-media">
    <img src={image} {alt} width="768" height="512" loading="lazy" decoding="async" />
  </div>
  <span class="category-label">{label}</span>
</a>

<style>
  .category-tile { display: block; min-width: 0; color: var(--text); text-decoration: none; border-radius: var(--radius-card); }
  .category-media, .category-media img { border-radius: var(--radius-card) var(--radius-card) 0 0; }
  .category-media img { object-position: center; }
  .category-label { display: flex; align-items: center; justify-content: center; min-height: var(--store-touch-target); padding: calc(var(--gap) / 2); background: var(--raised); border-radius: 0 0 var(--radius-card) var(--radius-card); font: 600 var(--fs-section)/1.4 var(--font); text-align: center; overflow-wrap: anywhere; text-underline-offset: 3px; }
  .category-tile[aria-current='page'] .category-label { color: var(--store-accent); text-decoration: underline; }
  .category-tile:focus-visible .category-label { text-decoration: underline; }
  .category-tile:active .category-label { text-decoration: underline; text-decoration-thickness: 2px; }
  @media (hover: hover) { .category-tile:hover .category-label { text-decoration: underline; } }
</style>
