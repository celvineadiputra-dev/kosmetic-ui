<script lang="ts">
  import IconControl from './IconControl.svelte';
  import SearchField from './SearchField.svelte';

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
    <SearchField action={searchAction} value={query} />
    <div class="header-actions">
      <IconControl icon="account" label="Akun saya" href={accountHref ?? ''} disabled={!accountHref} />
      <IconControl icon="wishlist" label="Daftar keinginan" href={wishlistHref ?? ''} disabled={!wishlistHref} />
      <IconControl icon="bag" label="Keranjang" visibleLabel="Keranjang" href={cartHref ?? ''} disabled={!cartHref} />
    </div>
  </div>
</header>

<style>
  .store-header { background: var(--surface); border-bottom: 1px solid var(--rule); } /* taste-skill-ignore: A1 foundation explicitly maps the header/navigation divider to --rule. */
  .header-row { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: var(--gap); min-height: calc(var(--store-touch-target) + var(--gap)); padding-block: calc(var(--gap) / 2); }
  .wordmark { display: inline-flex; align-items: center; width: fit-content; max-width: 100%; min-height: var(--store-touch-target); color: var(--text); font: 700 var(--fs-title)/1.2 var(--font); letter-spacing: normal; text-decoration: none; overflow-wrap: anywhere; }
  .header-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: end; gap: calc(var(--gap) / 2); min-width: 0; }
  @media (max-width: 1023px) { .header-row { grid-template-columns: minmax(0, 1fr); row-gap: calc(var(--gap) / 2); } }
</style>
