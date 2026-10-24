<script lang="ts">
  import type { Product } from './products';
  import IconControl from './IconControl.svelte';
  import Rating from './Rating.svelte';
  let { product, href, favorite = false, onfavorite }: {
    product: Product; href: string; favorite?: boolean; onfavorite?: () => void;
  } = $props();
  let price = $derived(`Rp${product.price.toLocaleString('id-ID')}`);
</script>

<article class="product-card" data-product={product.id}>
  <a class="product-link" {href} aria-label={`${product.name}, ${product.variant}, ${price}${product.rating ? `, rating ${product.rating.score.toLocaleString('id-ID')} dari 5, ${product.rating.count} ulasan` : ''}`}>
    <div class="store-media store-product-media product-media">
      <img src={product.image} alt={product.alt} width="768" height="512" loading="lazy" decoding="async" />
    </div>
    <h3>{product.name}</h3>
    <p class="product-variant">{product.variant}</p>
    <p class="product-price">{price}</p>
    {#if product.rating}<Rating score={product.rating.score} count={product.rating.count} />{/if}
  </a>
  {#if onfavorite}
    <div class="favorite-control"><IconControl icon="favorite" label={`Simpan ${product.name} ke favorit`} pressed={favorite} onclick={onfavorite} /></div>
  {/if}
</article>

<style>
  .product-card { position: relative; display: grid; grid-template-rows: subgrid; grid-row: span var(--product-rows, 4); min-width: 0; }
  .product-link { display: grid; grid-template-rows: subgrid; grid-row: span var(--product-rows, 4); min-width: 0; color: var(--text); text-decoration: none; border-radius: var(--radius-card); }
  .product-media, .product-media img { border-radius: var(--radius-card); }
  .product-media img { object-position: center; }
  h3 { font: 500 var(--fs-body)/20px var(--font); overflow-wrap: anywhere; }
  .product-variant { color: var(--muted-foreground); font-size: var(--fs-body); overflow-wrap: anywhere; }
  .product-price { color: var(--text); font-size: var(--fs-section); font-weight: 700; line-height: 24px; font-variant-numeric: tabular-nums; }
  .product-link:focus-visible h3 { text-decoration: underline; text-underline-offset: 3px; }
  .product-link:active h3 { text-decoration: underline; text-decoration-thickness: 2px; }
  .favorite-control { position: absolute; inset-block-start: calc(var(--gap) / 2); inset-inline-end: calc(var(--gap) / 2); background: var(--surface); border-radius: var(--radius-control); }
  @media (hover: hover) { .product-link:hover h3 { text-decoration: underline; text-underline-offset: 3px; } }
</style>
