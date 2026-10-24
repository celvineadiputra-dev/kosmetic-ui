<script lang="ts">
  import { page } from '$app/state';
  import CategoryDiscovery from '#lib/components/storefront/CategoryDiscovery.svelte';
  import PromoBanner from '#lib/components/storefront/PromoBanner.svelte';
  import ProductSection from '#lib/components/storefront/ProductSection.svelte';
  import { favorites, newArrivals } from '#lib/components/storefront/products.js';
  import Hero from '#lib/components/storefront/Hero.svelte';
  import Header from '#lib/components/storefront/Header.svelte';
  import CategoryNav from '#lib/components/storefront/CategoryNav.svelte';
  import ServiceBenefits from '#lib/components/storefront/ServiceBenefits.svelte';
  import NewsletterSection from '#lib/components/storefront/NewsletterSection.svelte';
  import StoreFooter from '#lib/components/storefront/StoreFooter.svelte';

  const categories = [
    { id: 'semua', label: 'Semua Produk' }, { id: 'wajah', label: 'Wajah' },
    { id: 'bibir', label: 'Bibir' }, { id: 'mata', label: 'Mata' },
    { id: 'tools', label: 'Brush & Tools' }, { id: 'promo', label: 'Promo' }
  ].map((item) => ({ ...item, href: item.id === 'promo' ? '?kategori=promo#promo' : item.id === 'semua' ? '?kategori=semua#koleksi' : `?kategori=${item.id}#jelajah-kategori` }));
  const discoveryCategories = [
    { id: 'wajah', label: 'Wajah', image: '/images/cushion.webp', alt: 'Cushion beige terbuka dengan puff untuk riasan wajah.' },
    { id: 'bibir', label: 'Bibir', image: '/images/lipstick.webp', alt: 'Lipstik rose nude dalam kemasan emas untuk riasan bibir.' },
    { id: 'mata', label: 'Mata', image: '/images/eyeshadow.webp', alt: 'Palet sembilan warna eyeshadow netral untuk riasan mata.' },
    { id: 'tools', label: 'Brush & Tools', image: '/images/brush-set.webp', alt: 'Lima kuas rias dengan pouch beige.' }
  ].map((item) => ({ ...item, href: `?kategori=${item.id}#jelajah-kategori` }));
  let activeCategory = $derived(categories.find((item) => item.id === page.url.searchParams.get('kategori')) ?? categories[0]);
  let selectedProduct = $derived([...favorites, ...newArrivals].find((product) => product.id === page.url.searchParams.get('produk')));
  let query = $derived(page.url.searchParams.get('q') ?? '');
  const infoLabels: Record<string, string> = { kontak: 'Hubungi Kami', 'cara-belanja': 'Cara Belanja', pengiriman: 'Pengiriman', pengembalian: 'Pengembalian', faq: 'FAQ', tentang: 'Tentang Kami', privasi: 'Kebijakan Privasi', syarat: 'Syarat & Ketentuan' };
  let infoTitle = $derived(infoLabels[page.url.searchParams.get('info') ?? '']);
</script>

<svelte:head>
  <title>KOSMETIK - Riasan simpel, cantik setiap hari.</title>
  <meta name="description" content="Temukan pilihan kosmetik harian, riasan natural, dan koleksi terbaru KOSMETIK." />
</svelte:head>

<div class="storefront">
  <a class="skip-link" href="#fondasi">Lewati ke konten</a>
  <Header homeHref="/" accountHref="#catatan" wishlistHref="#catatan" cartHref="/keranjang" searchAction="/#hasil-pratinjau" {query} />
  <CategoryNav items={categories} active={activeCategory.id} />
  <main id="fondasi" class="store-container">
    <Hero shopHref="#koleksi" />
    <div id="koleksi" class="store-section catalog">
      <ProductSection id="favorit" title="Pilihan Favorit" subtitle="Kosmetik esensial untuk setiap hari." products={favorites} />
      <CategoryDiscovery items={discoveryCategories} active={activeCategory.id} />
      <PromoBanner collectionHref="#baru" />
      <ProductSection id="baru" title="Baru untuk Kamu" subtitle="Lengkapi koleksi riasanmu." products={newArrivals} />
    </div>
    <ServiceBenefits />
    <NewsletterSection privacyHref="?info=privasi#informasi-pratinjau" />
    {#if selectedProduct}<p id="catatan-produk" class="preview-status" role="status">{selectedProduct.name} dipilih. Ini data contoh A1; detail produk dan checkout belum terhubung.</p>{:else}<span id="catatan-produk"></span>{/if}
    {#if query}<p id="hasil-pratinjau" class="preview-status" role="status">Pencarian: “{query}”. Hasil produk belum terhubung.</p>{:else}<span id="hasil-pratinjau"></span>{/if}
  </main>
  <StoreFooter {infoTitle} />
</div>

<style>
  .catalog { scroll-margin-top: var(--pad); }
  .preview-status { padding-block: var(--pad); color: var(--muted-foreground); overflow-wrap: anywhere; scroll-margin-top: var(--pad); }
  .skip-link { position: absolute; left: var(--pad); top: var(--pad); padding: var(--gap); background: var(--surface); color: var(--text); transform: translateY(-200%); z-index: 1; }
  .skip-link:focus { transform: none; }
</style>
