<script lang="ts">
  let { items, active = 'semua' }: {
    items: readonly { id: string; label: string; href: string }[];
    active?: string;
  } = $props();
</script>

<nav class="store-category-nav" aria-label="Kategori produk">
  <ul class="store-container category-list">
    {#each items as item (item.id)}
      <li><a href={item.href} aria-current={active === item.id ? 'page' : undefined}>{item.label}</a></li>
    {/each}
  </ul>
</nav>

<style>
  .store-category-nav { background: var(--surface); border-bottom: 1px solid var(--rule); } /* taste-skill-ignore: A1 foundation explicitly maps the header/navigation divider to --rule. */
  .category-list { display: flex; justify-content: center; flex-wrap: wrap; gap: 0 var(--pad); padding: 0; list-style: none; }
  li { min-width: 0; }
  a { display: inline-flex; align-items: center; min-height: var(--store-touch-target); max-width: 100%; padding-block: calc(var(--gap) / 2); border-bottom: 2px solid transparent; color: var(--text); font: 500 var(--fs-body)/20px var(--font); text-decoration: none; text-underline-offset: 3px; overflow-wrap: anywhere; }
  a[aria-current='page'] { color: var(--accent); border-bottom-color: var(--accent); }
  a:active { color: var(--accent); }
  @media (hover: hover) { a:hover { text-decoration: underline; } }
  @media (max-width: 767px) { .category-list { justify-content: start; column-gap: var(--gap); } }
</style>
