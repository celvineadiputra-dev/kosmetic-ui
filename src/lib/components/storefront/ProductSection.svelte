<script lang="ts">
  import SectionHeading from './SectionHeading.svelte';
  import ProductCard from './ProductCard.svelte';
  import type { Product } from './products';
  let { id, title, subtitle, products }: { id: string; title: string; subtitle?: string; products: Product[] } = $props();
  let withRatings = $derived(products.some((product) => product.rating));
</script>

<section {id} class="store-section product-section" aria-labelledby={`${id}-title`}>
  <SectionHeading id={`${id}-title`} {title} {subtitle} href="#koleksi" />
  <ul class="store-product-grid product-list" class:with-ratings={withRatings}>
    {#each products as product (product.id)}
      <li><ProductCard {product} href={`?produk=${product.id}#catatan-produk`} /></li>
    {/each}
  </ul>
</section>

<style>
  .product-section { scroll-margin-top: var(--pad); }
  .product-list { --product-rows: 4; row-gap: calc(var(--gap) / 4); }
  .product-list.with-ratings { --product-rows: 5; }
  li { display: grid; grid-template-rows: subgrid; grid-row: span var(--product-rows); }
  /* Separate wrapped card rows while sharing text track sizes within each row. */
  li { margin-bottom: var(--gap); }
</style>
