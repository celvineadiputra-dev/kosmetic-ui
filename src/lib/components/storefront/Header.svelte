<script lang="ts">
  import IconControl from './IconControl.svelte';
  import SearchField from './SearchField.svelte';
  import { cart } from '#lib/stores/cart.svelte.js';

  let { homeHref = '/', accountHref, wishlistHref, cartHref, searchAction = '/', query = '' }: {
    homeHref?: string;
    accountHref?: string;
    wishlistHref?: string;
    cartHref?: string;
    searchAction?: string;
    query?: string;
  } = $props();
</script>

<header class="store-header">
  <div class="store-container header-row">
    <a class="wordmark" href={homeHref} aria-label="KOSMETIK, beranda">KOSMETIK</a>
    <div class="header-search">
      <SearchField action={searchAction} value={query} />
    </div>
    <div class="header-actions">
      <IconControl icon="account" label="Akun saya" href={accountHref ?? ''} disabled={!accountHref} />
      <IconControl icon="wishlist" label="Daftar keinginan" href={wishlistHref ?? ''} disabled={!wishlistHref} />
      {#if cartHref}
        <IconControl icon="bag" label={`Keranjang belanja, ${cart.totalCount} produk`} visibleLabel="Keranjang" href={cartHref} badgeCount={cart.totalCount} />
      {:else}
        <IconControl icon="bag" label={`Keranjang belanja, ${cart.totalCount} produk`} visibleLabel="Keranjang" badgeCount={cart.totalCount} onclick={() => cart.openDrawer()} />
      {/if}
    </div>
  </div>
</header>

<style>
  .store-header {
    position: sticky;
    top: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.94);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--rule);
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
    transition: background-color var(--t-ui) var(--ease-out), box-shadow var(--t-ui) var(--ease-out);
  }
  .header-row {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: var(--gap);
    min-height: calc(var(--store-touch-target) + var(--gap));
    padding-block: calc(var(--gap) / 2);
  }
  .wordmark {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    min-height: var(--store-touch-target);
    color: var(--text);
    font: 700 var(--fs-title)/1.2 var(--font);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    overflow-wrap: anywhere;
    transition: opacity var(--t-hover) var(--ease-out), transform var(--t-press) var(--ease-out);
  }
  .wordmark:active {
    transform: scale(0.98);
  }
  @media (hover: hover) {
    .wordmark:hover {
      opacity: 0.82;
    }
  }
  .header-search {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 520px;
    margin-inline: auto;
    min-width: 0;
  }
  .header-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: end;
    gap: calc(var(--gap) / 2);
    min-width: 0;
  }
  @media (max-width: 1023px) {
    .header-row {
      grid-template-columns: 1fr auto;
      row-gap: calc(var(--gap) / 2);
    }
    .wordmark {
      grid-column: 1;
      grid-row: 1;
    }
    .header-actions {
      grid-column: 2;
      grid-row: 1;
    }
    .header-search {
      grid-column: 1 / -1;
      grid-row: 2;
      max-width: 100%;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .store-header,
    .wordmark {
      transition: none;
    }
  }
</style>
