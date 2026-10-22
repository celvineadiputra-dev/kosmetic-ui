<script lang="ts">
  import '#lib/components/storefront/foundation.css';
  import type { PageProps } from './$types';
  import { goto } from '$app/navigation';
  import { cart } from '#lib/stores/cart.svelte.js';
  import Header from '#lib/components/storefront/Header.svelte';
  import CategoryNav from '#lib/components/storefront/CategoryNav.svelte';
  import StoreFooter from '#lib/components/storefront/StoreFooter.svelte';
  import ProductCard from '#lib/components/storefront/ProductCard.svelte';
  import ProductReviews from '#lib/components/storefront/ProductReviews.svelte';
  import type { ProductShade } from '#lib/components/storefront/products.js';
  import {
    IconStarFilled,
    IconCheck,
    IconTruck,
    IconShieldCheck,
    IconRotateClockwise2,
    IconPlus,
    IconMinus,
    IconShoppingBag,
    IconArrowLeft,
    IconChevronDown
  } from '@tabler/icons-svelte';

  let { data }: PageProps = $props();
  let product = $derived(data.product);
  let relatedProducts = $derived(data.relatedProducts);

  const categories = [
    { id: 'semua', label: 'Semua Produk' },
    { id: 'wajah', label: 'Wajah' },
    { id: 'bibir', label: 'Bibir' },
    { id: 'mata', label: 'Mata' },
    { id: 'tools', label: 'Brush & Tools' },
    { id: 'promo', label: 'Promo' }
  ].map((item) => ({
    ...item,
    href: item.id === 'promo' ? '/?kategori=promo#promo' : item.id === 'semua' ? '/?kategori=semua#koleksi' : `/?kategori=${item.id}#jelajah-kategori`
  }));

  const categoryLabels: Record<string, string> = {
    wajah: 'Riasan Wajah',
    bibir: 'Riasan Bibir',
    mata: 'Riasan Mata',
    tools: 'Kuas & Alat Rias'
  };

  // PDP Interactive state
  let selectedShade = $state<ProductShade | null>(null);
  let quantity = $state(1);
  let activeTab = $state<'deskripsi' | 'cara-pakai' | 'kandungan'>('deskripsi');
  let cartToastMessage = $state('');
  let isAddingToCart = $state(false);

  // Update selected shade when product changes
  $effect(() => {
    selectedShade = product.shades && product.shades.length > 0 ? product.shades[0] : null;
    quantity = 1;
    activeTab = 'deskripsi';
  });

  function handleAddToCart() {
    isAddingToCart = true;
    cart.addItem(product, selectedShade, quantity);
    setTimeout(() => {
      isAddingToCart = false;
    }, 300);
  }

  function handleBuyNow() {
    cart.addItem(product, selectedShade, quantity);
    cart.closeDrawer();
    goto('/checkout');
  }

  function decrementQty() {
    if (quantity > 1) quantity--;
  }

  function incrementQty() {
    if (quantity < 99) quantity++;
  }
</script>

<svelte:head>
  <title>{product.name} — KOSMETIK</title>
  <meta name="description" content={product.description} />
</svelte:head>

<div class="storefront">
  <Header homeHref="/" searchAction="/#hasil-pratinjau" />
  <CategoryNav items={categories} active={product.category} />

  <main class="store-container pdp-container">
    <!-- Breadcrumb Trail -->
    <nav class="breadcrumb-trail" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Beranda</a></li>
        <li aria-hidden="true" class="breadcrumb-separator">/</li>
        <li><a href={`/?kategori=${product.category}#jelajah-kategori`}>{categoryLabels[product.category] || 'Produk'}</a></li>
        <li aria-hidden="true" class="breadcrumb-separator">/</li>
        <li aria-current="page" class="current-crumb">{product.name}</li>
      </ol>
    </nav>

    <!-- Buy Box Split Showcase -->
    <div class="pdp-showcase">
      <!-- Media Gallery -->
      <div class="pdp-gallery">
        <div class="main-image-frame">
          <img
            src={product.image}
            alt={product.alt}
            width="768"
            height="512"
            fetchpriority="high"
            decoding="async"
          />
          {#if product.badge}
            <span class="badge-overlay">{product.badge}</span>
          {/if}
          {#if product.bpomNumber}
            <div class="bpom-pill" title={`Terdaftar resmi BPOM RI: ${product.bpomNumber}`}>
              <IconShieldCheck size={14} aria-hidden="true" />
              <span>BPOM Resmi</span>
            </div>
          {/if}
        </div>
      </div>

      <!-- Buy Box & Specifications -->
      <div class="pdp-buybox">
        <div class="category-tag">{categoryLabels[product.category] || 'KOSMETIK'}</div>
        <h1 class="product-title">{product.name}</h1>

        <!-- Rating summary snippet -->
        {#if product.rating}
          <div class="rating-strip">
            <a href="#ulasan" class="rating-jump-link">
              <span class="stars-icon">
                <IconStarFilled size={16} aria-hidden="true" />
              </span>
              <span class="rating-score">{product.rating.score.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</span>
              <span class="rating-count">({product.rating.count} ulasan)</span>
            </a>
            <span class="meta-separator">·</span>
            <span class="stock-status">Stok Tersedia</span>
          </div>
        {/if}

        <!-- Price -->
        <div class="price-row">
          <span class="main-price">Rp{product.price.toLocaleString('id-ID')}</span>
          {#if product.originalPrice && product.originalPrice > product.price}
            <span class="original-price">Rp{product.originalPrice.toLocaleString('id-ID')}</span>
            <span class="discount-badge">
              Hemat {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          {/if}
        </div>

        <p class="quick-description">{product.description}</p>

        <!-- Shade Selector -->
        {#if product.shades && product.shades.length > 0}
          <div class="shade-selector-section">
            <div class="shade-label-row">
              <span class="selector-title">Pilihan Warna:</span>
              <span class="active-shade-name">{selectedShade?.name}</span>
            </div>
            <div class="swatches-grid" role="radiogroup" aria-label="Pilih varian warna">
              {#each product.shades as shade}
                <button
                  type="button"
                  class="swatch-btn"
                  class:selected={selectedShade?.id === shade.id}
                  style={`--swatch-color: ${shade.hex};`}
                  onclick={() => (selectedShade = shade)}
                  aria-label={`Pilih warna ${shade.name}`}
                  aria-checked={selectedShade?.id === shade.id}
                  role="radio"
                >
                  <span class="swatch-color-circle">
                    {#if selectedShade?.id === shade.id}
                      <IconCheck size={14} stroke={3} class="swatch-check" aria-hidden="true" />
                    {/if}
                  </span>
                </button>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Quantity & CTA Actions -->
        <div class="purchase-controls">
          <div class="quantity-stepper" aria-label="Jumlah produk">
            <button
              type="button"
              class="stepper-btn"
              onclick={decrementQty}
              disabled={quantity <= 1}
              aria-label="Kurangi jumlah"
            >
              <IconMinus size={16} aria-hidden="true" />
            </button>
            <span class="quantity-value" aria-live="polite">{quantity}</span>
            <button
              type="button"
              class="stepper-btn"
              onclick={incrementQty}
              disabled={quantity >= 99}
              aria-label="Tambah jumlah"
            >
              <IconPlus size={16} aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            class="btn-add-to-cart"
            class:is-active={isAddingToCart}
            onclick={handleAddToCart}
          >
            <IconShoppingBag size={18} stroke={1.5} aria-hidden="true" />
            <span>Tambah ke Keranjang</span>
          </button>

          <button
            type="button"
            class="btn-buy-now"
            onclick={handleBuyNow}
          >
            Beli Sekarang
          </button>
        </div>

        <!-- Toast Feedback -->
        {#if cartToastMessage}
          <div class="cart-toast" role="status" aria-live="polite">
            <IconCheck size={18} stroke={2.5} class="toast-check" aria-hidden="true" />
            <span>{cartToastMessage}</span>
          </div>
        {/if}

        <!-- Trust Badges & Service Perks -->
        <div class="service-perks-grid">
          <div class="perk-item">
            <IconTruck size={20} class="perk-icon" aria-hidden="true" />
            <div>
              <strong>Pengiriman Cepat</strong>
              <p>Dikirim dalam 24 jam dengan kemasan bubble wrap tebal.</p>
            </div>
          </div>
          <div class="perk-item">
            <IconShieldCheck size={20} class="perk-icon" aria-hidden="true" />
            <div>
              <strong>100% Produk Original</strong>
              <p>Resmi terdaftar BPOM RI: {product.bpomNumber || 'Terdaftar'}</p>
            </div>
          </div>
          <div class="perk-item">
            <IconRotateClockwise2 size={20} class="perk-icon" aria-hidden="true" />
            <div>
              <strong>Garansi Retur 7 Hari</strong>
              <p>Pengembalian barang mudah jika rusak saat diterima.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Deep-Dive Tabs -->
    <div class="pdp-details-tabs">
      <div class="tabs-nav" role="tablist">
        <button
          type="button"
          role="tab"
          class="tab-btn"
          class:active={activeTab === 'deskripsi'}
          aria-selected={activeTab === 'deskripsi'}
          onclick={() => (activeTab = 'deskripsi')}
        >
          Deskripsi & Keunggulan
        </button>
        <button
          type="button"
          role="tab"
          class="tab-btn"
          class:active={activeTab === 'cara-pakai'}
          aria-selected={activeTab === 'cara-pakai'}
          onclick={() => (activeTab = 'cara-pakai')}
        >
          Cara Penggunaan
        </button>
        <button
          type="button"
          role="tab"
          class="tab-btn"
          class:active={activeTab === 'kandungan'}
          aria-selected={activeTab === 'kandungan'}
          onclick={() => (activeTab = 'kandungan')}
        >
          Kandungan & BPOM
        </button>
      </div>

      <div class="tab-content" role="tabpanel">
        {#if activeTab === 'deskripsi'}
          <div class="tab-pane">
            <p class="tab-description">{product.description}</p>
            {#if product.benefits && product.benefits.length > 0}
              <div class="benefits-block">
                <h3>Keunggulan Formula</h3>
                <ul class="benefits-list">
                  {#each product.benefits as benefit}
                    <li>
                      <IconCheck size={16} stroke={2.5} class="benefit-check" aria-hidden="true" />
                      <span>{benefit}</span>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
          </div>
        {:else if activeTab === 'cara-pakai'}
          <div class="tab-pane">
            {#if product.howToUse && product.howToUse.length > 0}
              <ol class="how-to-steps">
                {#each product.howToUse as step, i}
                  <li class="step-item">
                    <span class="step-number" aria-hidden="true">{i + 1}</span>
                    <div class="step-text">{step}</div>
                  </li>
                {/each}
              </ol>
            {:else}
              <p>Aplikasikan produk secara merata pada area yang diinginkan sesuai kebutuhan riasan harianmu.</p>
            {/if}
          </div>
        {:else if activeTab === 'kandungan'}
          <div class="tab-pane">
            <div class="bpom-info-row">
              <span class="info-label">Nomor Notifikasi BPOM:</span>
              <span class="info-val">{product.bpomNumber || 'Tersertifikasi Resmi BPOM RI'}</span>
            </div>
            <h3 class="ingredients-title">Daftar Komposisi (Ingredients):</h3>
            <p class="ingredients-text">{product.ingredients || 'Formula teruji dermatologis, bebas alkohol berbahaya dan paraben.'}</p>
          </div>
        {/if}
      </div>
    </div>

    <!-- Ratings & Reviews Section -->
    <ProductReviews
      reviews={product.reviews || []}
      ratingScore={product.rating?.score}
      shades={product.shades || []}
    />

    <!-- Related Products -->
    {#if relatedProducts.length > 0}
      <section class="related-products-section" aria-labelledby="related-heading">
        <h2 id="related-heading">Produk Pilihan Lainnya</h2>
        <ul class="store-product-grid">
          {#each relatedProducts as related (related.id)}
            <li>
              <ProductCard product={related} href={`/produk/${related.id}`} />
            </li>
          {/each}
        </ul>
      </section>
    {/if}
  </main>

  <StoreFooter />
</div>

<style>
  .pdp-container {
    padding-block: var(--pad);
  }

  /* Breadcrumb */
  .breadcrumb-trail {
    margin-bottom: var(--pad);
  }
  .breadcrumb-trail ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fs-small);
  }
  .breadcrumb-trail a {
    color: var(--muted);
    text-decoration: none;
    transition: color var(--t-hover) var(--ease-out);
  }
  .breadcrumb-trail a:hover {
    color: var(--text);
    text-decoration: underline;
  }
  .breadcrumb-separator {
    color: var(--control);
  }
  .current-crumb {
    color: var(--text);
    font-weight: 600;
  }

  /* Showcase Split */
  .pdp-showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: clamp(24px, 4vw, 48px);
    align-items: start;
  }

  /* Media Gallery */
  .pdp-gallery {
    position: sticky;
    top: calc(var(--store-touch-target) + var(--gap) + 16px);
  }
  .main-image-frame {
    position: relative;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    aspect-ratio: 3 / 2;
    overflow: hidden;
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.03);
  }
  .main-image-frame img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .badge-overlay {
    position: absolute;
    top: 14px;
    left: 14px;
    padding: 4px 10px;
    background: var(--primary);
    color: var(--primary-ink);
    border-radius: 999px;
    font-size: var(--fs-small);
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .bpom-pill {
    position: absolute;
    bottom: 14px;
    left: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(8px);
    color: var(--accent);
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: var(--fs-small);
    font-weight: 600;
  }

  /* Buy Box */
  .pdp-buybox {
    display: flex;
    flex-direction: column;
  }
  .category-tag {
    font-size: var(--fs-small);
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 6px;
  }
  .product-title {
    font: 700 clamp(24px, 3vw, 32px)/1.2 var(--font);
    color: var(--text);
    margin: 0 0 12px 0;
    text-wrap: balance;
  }
  .rating-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: var(--fs-small);
    margin-bottom: 16px;
  }
  .rating-jump-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--text);
    text-decoration: none;
    transition: opacity var(--t-hover) var(--ease-out);
  }
  .rating-jump-link:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
  .stars-icon {
    color: var(--store-rating-star);
    display: inline-flex;
  }
  .rating-score {
    font-weight: 700;
  }
  .rating-count {
    color: var(--muted);
  }
  .meta-separator {
    color: var(--control);
  }
  .stock-status {
    color: var(--positive);
    font-weight: 600;
  }

  /* Price */
  .price-row {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 16px;
  }
  .main-price {
    font: 700 28px/1.1 var(--font);
    color: var(--text);
  }
  .original-price {
    font-size: var(--fs-body);
    color: var(--faint);
    text-decoration: line-through;
  }
  .discount-badge {
    padding: 2px 8px;
    background: color-mix(in srgb, var(--accent) 12%, transparent);
    color: var(--accent);
    border-radius: 999px;
    font-size: var(--fs-small);
    font-weight: 700;
  }

  .quick-description {
    font-size: var(--fs-body);
    line-height: 1.6;
    color: var(--muted);
    margin: 0 0 var(--pad) 0;
    text-wrap: pretty;
  }

  /* Shade Selector */
  .shade-selector-section {
    padding-top: var(--gap);
    border-top: 1px solid var(--rule);
    margin-bottom: var(--pad);
  }
  .shade-label-row {
    display: flex;
    gap: 8px;
    font-size: var(--fs-body);
    margin-bottom: 10px;
  }
  .selector-title {
    color: var(--muted);
  }
  .active-shade-name {
    font-weight: 600;
    color: var(--text);
  }
  .swatches-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }
  .swatch-btn {
    position: relative;
    width: 38px;
    height: 38px;
    padding: 3px;
    background: var(--surface);
    border: 2px solid transparent;
    border-radius: 999px;
    cursor: pointer;
    transition: transform var(--t-press) var(--ease-out), border-color var(--t-hover) var(--ease-out);
  }
  .swatch-btn:hover {
    transform: scale(1.08);
  }
  .swatch-btn.selected {
    border-color: var(--text);
  }
  .swatch-color-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: var(--swatch-color);
    border-radius: 999px;
    box-shadow: inset 0 0 0 1px var(--border);
  }
  :global(.swatch-check) {
    color: #ffffff;
    filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.4));
  }

  /* Purchase Controls */
  .purchase-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-bottom: var(--gap);
  }
  .quantity-stepper {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    background: var(--surface);
    height: var(--store-touch-target);
  }
  .stepper-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 100%;
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
    transition: background-color var(--t-hover) var(--ease-out);
  }
  .stepper-btn:hover:not(:disabled) {
    background: var(--raised);
  }
  .stepper-btn:disabled {
    color: var(--control);
    cursor: not-allowed;
  }
  .quantity-value {
    min-width: 32px;
    text-align: center;
    font-weight: 600;
    font-size: var(--fs-body);
  }
  .btn-add-to-cart {
    flex: 1;
    min-width: 160px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: var(--store-touch-target);
    padding-inline: 16px;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.2 var(--font);
    cursor: pointer;
    transition: all var(--t-hover) var(--ease-out);
  }
  .btn-add-to-cart:hover {
    background: var(--raised);
    border-color: var(--text);
  }
  .btn-add-to-cart.is-active {
    transform: scale(0.97);
  }
  .btn-buy-now {
    flex: 1;
    min-width: 140px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: var(--store-touch-target);
    padding-inline: 16px;
    background: var(--primary);
    color: var(--primary-ink);
    border: none;
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.2 var(--font);
    cursor: pointer;
    transition: opacity var(--t-hover) var(--ease-out), transform var(--t-press) var(--ease-out);
  }
  .btn-buy-now:hover {
    opacity: 0.9;
  }
  .btn-buy-now:active {
    transform: scale(0.98);
  }

  /* Cart Toast */
  .cart-toast {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: color-mix(in srgb, var(--positive) 12%, transparent);
    color: var(--positive);
    border: 1px solid color-mix(in srgb, var(--positive) 25%, transparent);
    border-radius: var(--radius-control);
    font-weight: 600;
    font-size: var(--fs-body);
    margin-bottom: var(--gap);
  }
  :global(.toast-check) {
    flex-shrink: 0;
  }

  /* Service Perks */
  .service-perks-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: var(--pad);
    background: var(--raised);
    border-radius: var(--radius-card);
    margin-top: var(--gap);
  }
  .perk-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  :global(.perk-icon) {
    color: var(--accent);
    flex-shrink: 0;
    margin-top: 2px;
  }
  .perk-item strong {
    display: block;
    font-size: var(--fs-small);
    color: var(--text);
  }
  .perk-item p {
    font-size: 12px;
    color: var(--muted);
    margin: 2px 0 0 0;
  }

  /* Tabs */
  .pdp-details-tabs {
    margin-top: calc(var(--store-section-space) * 0.85);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    overflow: hidden;
  }
  .tabs-nav {
    display: flex;
    border-bottom: 1px solid var(--border);
    background: var(--raised);
    overflow-x: auto;
  }
  .tab-btn {
    padding: 14px 20px;
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    color: var(--muted);
    font: 600 var(--fs-body)/1.2 var(--font);
    cursor: pointer;
    white-space: nowrap;
    transition: all var(--t-hover) var(--ease-out);
  }
  .tab-btn:hover {
    color: var(--text);
  }
  .tab-btn.active {
    color: var(--accent);
    border-bottom-color: var(--accent);
    background: var(--surface);
  }
  .tab-content {
    padding: var(--pad);
  }
  .tab-description {
    font-size: var(--fs-body);
    line-height: 1.7;
    color: var(--text);
    margin: 0 0 var(--gap) 0;
  }
  .benefits-block h3 {
    font: 600 var(--fs-section)/1.3 var(--font);
    color: var(--text);
    margin: 0 0 10px 0;
  }
  .benefits-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 10px;
  }
  .benefits-list li {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--fs-body);
    color: var(--muted);
  }
  :global(.benefit-check) {
    color: var(--accent);
    flex-shrink: 0;
  }
  .how-to-steps {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .step-item {
    display: flex;
    align-items: flex-start;
    gap: 14px;
  }
  .step-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: var(--primary);
    color: var(--primary-ink);
    font: 700 12px/1 var(--font);
    flex-shrink: 0;
  }
  .step-text {
    font-size: var(--fs-body);
    line-height: 1.6;
    color: var(--text);
  }
  .bpom-info-row {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    font-size: var(--fs-body);
  }
  .info-label {
    color: var(--muted);
  }
  .info-val {
    font-weight: 600;
    color: var(--text);
  }
  .ingredients-title {
    font: 600 var(--fs-section)/1.3 var(--font);
    color: var(--text);
    margin: 0 0 8px 0;
  }
  .ingredients-text {
    font-size: var(--fs-small);
    line-height: 1.6;
    color: var(--muted);
    margin: 0;
  }

  /* Related Products */
  .related-products-section {
    margin-top: calc(var(--store-section-space) * 0.85);
    padding-top: var(--pad);
  }
  .related-products-section h2 {
    font: 700 var(--fs-title)/1.2 var(--font);
    color: var(--text);
    margin: 0 0 var(--pad) 0;
  }

  @media (max-width: 900px) {
    .pdp-showcase {
      grid-template-columns: 1fr;
    }
    .pdp-gallery {
      position: static;
    }
  }
</style>
