<script lang="ts">
  import CategoryTile from './CategoryTile.svelte';
  import SectionHeading from './SectionHeading.svelte';
  let { items, active }: {
    items: { id: string; label: string; href: string; image: string; alt: string }[];
    active?: string;
  } = $props();
</script>

<section id="jelajah-kategori" class="store-section discovery" aria-labelledby="discovery-title">
  <SectionHeading id="discovery-title" title="Temukan Favoritmu" subtitle="Pilih sesuai kebutuhan riasanmu." />
  <ul class="store-category-grid">
    {#each items as item (item.id)}
      <li><CategoryTile label={item.label} href={item.href} image={item.image} alt={item.alt} selected={active === item.id} /></li>
    {/each}
  </ul>
</section>

<style>
  .discovery { scroll-margin-top: var(--pad); }
</style>
