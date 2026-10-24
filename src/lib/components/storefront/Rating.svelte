<script lang="ts">
  import { IconStarFilled } from '@tabler/icons-svelte';
  let { score, count }: { score: number; count: number } = $props();
  let formattedScore = $derived(score.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 }));
</script>

<p class="product-rating">
  <IconStarFilled size={16} aria-hidden="true" focusable="false" />
  <span aria-hidden="true">{formattedScore} ({count.toLocaleString('id-ID')})</span>
  <span class="store-sr-only">Rating {formattedScore} dari 5, berdasarkan {count.toLocaleString('id-ID')} ulasan.</span>
</p>

<style>
  .product-rating { display: flex; align-items: center; gap: calc(var(--gap) / 2); color: var(--muted-foreground); font-size: var(--fs-small); line-height: 20px; }
  .product-rating :global(svg) { color: var(--store-rating-star); flex-shrink: 0; }
</style>
