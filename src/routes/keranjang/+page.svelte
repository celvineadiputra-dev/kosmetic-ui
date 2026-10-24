<script lang="ts">
  import Header from '#lib/components/storefront/Header.svelte';
  import CategoryNav from '#lib/components/storefront/CategoryNav.svelte';
  import StoreFooter from '#lib/components/storefront/StoreFooter.svelte';
  import { cart } from '#lib/stores/cart.svelte.js';
  import {
    IconTrash,
    IconPlus,
    IconMinus,
    IconShoppingBag,
    IconTruck,
    IconArrowRight,
    IconArrowLeft,
    IconTag,
    IconShieldCheck,
    IconRotateClockwise2
  } from '@tabler/icons-svelte';

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

  let voucherInput = $state('');
  let voucherFeedback = $state<{ success: boolean; message: string } | null>(null);

  function handleApplyVoucher() {
    if (!voucherInput.trim()) return;
    const res = cart.applyVoucher(voucherInput);
    voucherFeedback = res;
    if (res.success) {
      voucherInput = '';
    }
  }

  function handleRemoveVoucher() {
    cart.removeVoucher();
    voucherFeedback = null;
  }
</script>

<svelte:head>
  <title>Keranjang Belanja — KOSMETIK</title>
</svelte:head>

<div class="storefront">
  <Header homeHref="/" searchAction="/#hasil-pratinjau" />
  <CategoryNav items={categories} />

  <main class="store-container cart-page-container">
    <nav class="breadcrumb-trail" aria-label="Breadcrumb">
      <ol>
        <li><a href="/">Beranda</a></li>
        <li aria-hidden="true" class="breadcrumb-separator">/</li>
        <li aria-current="page" class="current-crumb">Keranjang Belanja</li>
      </ol>
    </nav>

    <h1 class="page-title">Keranjang Belanja</h1>

    {#if cart.items.length === 0}
      <div class="empty-cart-card">
        <div class="empty-icon-wrap">
          <IconShoppingBag size={48} stroke={1.5} aria-hidden="true" />
        </div>
        <h2>Keranjangmu masih kosong</h2>
        <p>Temukan kosmetik pilihan untuk melengkapi riasan harianmu.</p>
        <a href="/#koleksi" class="start-btn">Mulai Belanja</a>
      </div>
    {:else}
      <!-- Free Shipping Tracker -->
      <div class="shipping-banner">
        <div class="shipping-info-row">
          <IconTruck size={20} class="truck-icon" aria-hidden="true" />
          {#if cart.remainingForFreeShipping > 0}
            <p>
              Tambah <strong>Rp{cart.remainingForFreeShipping.toLocaleString('id-ID')}</strong> lagi untuk menikmati <strong>Gratis Ongkir</strong> ke seluruh Indonesia!
            </p>
          {:else}
            <p class="free-badge-text">
              Selamat! Kamu berhak mendapatkan <strong>Gratis Ongkir</strong>.
            </p>
          {/if}
        </div>
        <div class="progress-track" aria-hidden="true">
          <div class="progress-fill" style={`width: ${cart.freeShippingProgress}%;`}></div>
        </div>
      </div>

      <div class="cart-grid-layout">
        <!-- Left: Items list -->
        <section class="items-column" aria-label="Daftar produk di keranjang">
          <div class="items-header-bar">
            <span>Produk ({cart.totalCount})</span>
            <span>Jumlah & Subtotal</span>
          </div>

          <ul class="cart-items-table">
            {#each cart.items as item (item.id)}
              <li class="cart-row">
                <a href={`/produk/${item.productId}`} class="product-thumb">
                  <img src={item.image} alt={item.name} width="96" height="96" loading="lazy" />
                </a>

                <div class="product-info-block">
                  <a href={`/produk/${item.productId}`} class="product-title-link">
                    {item.name}
                  </a>

                  {#if item.shade}
                    <div class="shade-indicator">
                      <span class="color-dot" style={`background-color: ${item.shade.hex};`} aria-hidden="true"></span>
                      <span>{item.shade.name}</span>
                    </div>
                  {:else if item.variant}
                    <div class="variant-text">{item.variant}</div>
                  {/if}

                  <div class="unit-price">
                    Rp{item.price.toLocaleString('id-ID')}
                    {#if item.originalPrice && item.originalPrice > item.price}
                      <span class="strikethrough">Rp{item.originalPrice.toLocaleString('id-ID')}</span>
                    {/if}
                  </div>
                </div>

                <div class="quantity-and-total">
                  <div class="stepper-box" aria-label={`Jumlah ${item.name}`}>
                    <button
                      type="button"
                      class="step-control"
                      onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Kurangi jumlah"
                    >
                      <IconMinus size={14} aria-hidden="true" />
                    </button>
                    <span class="step-count">{item.quantity}</span>
                    <button
                      type="button"
                      class="step-control"
                      onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Tambah jumlah"
                    >
                      <IconPlus size={14} aria-hidden="true" />
                    </button>
                  </div>

                  <div class="row-subtotal">
                    Rp{(item.price * item.quantity).toLocaleString('id-ID')}
                  </div>

                  <button
                    type="button"
                    class="delete-item-btn"
                    onclick={() => cart.removeItem(item.id)}
                    aria-label={`Hapus ${item.name} dari keranjang`}
                  >
                    <IconTrash size={18} stroke={1.5} aria-hidden="true" />
                  </button>
                </div>
              </li>
            {/each}
          </ul>

          <div class="cart-actions-bottom">
            <a href="/#koleksi" class="continue-shopping-link">
              <IconArrowLeft size={16} aria-hidden="true" />
              <span>Lanjut Belanja</span>
            </a>
            <button
              type="button"
              class="clear-all-btn"
              onclick={() => cart.clearCart()}
            >
              Kosongkan Keranjang
            </button>
          </div>
        </section>

        <!-- Right: Summary Box -->
        <aside class="summary-column" aria-labelledby="summary-heading">
          <div class="summary-card">
            <h2 id="summary-heading">Ringkasan Pesanan</h2>

            <!-- Voucher Section -->
            <div class="voucher-box">
              <label for="voucher-input" class="voucher-label">
                <IconTag size={16} class="tag-icon" aria-hidden="true" />
                <span>Punya Kode Voucher?</span>
              </label>

              {#if cart.voucherCode}
                <div class="applied-voucher-badge">
                  <div>
                    <strong>{cart.voucherCode}</strong>
                    <span>(Diskon 10% Aktif)</span>
                  </div>
                  <button type="button" class="remove-voucher-btn" onclick={handleRemoveVoucher}>
                    Hapus
                  </button>
                </div>
              {:else}
                <div class="voucher-input-group">
                  <input
                    id="voucher-input"
                    type="text"
                    bind:value={voucherInput}
                    placeholder="Gunakan: CANTIK10"
                  />
                  <button type="button" class="apply-btn" onclick={handleApplyVoucher}>
                    Pakai
                  </button>
                </div>
              {/if}

              {#if voucherFeedback}
                <p class="voucher-msg" class:error={!voucherFeedback.success}>
                  {voucherFeedback.message}
                </p>
              {/if}
            </div>

            <!-- Price Breakdown -->
            <div class="breakdown-lines">
              <div class="breakdown-row">
                <span>Total Harga ({cart.totalCount} produk)</span>
                <span>Rp{cart.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div class="breakdown-row">
                <span>Biaya Pengiriman</span>
                <span class:free-text={cart.shippingFee === 0}>
                  {cart.shippingFee === 0 ? 'Gratis' : `Rp${cart.shippingFee.toLocaleString('id-ID')}`}
                </span>
              </div>
              {#if cart.discountAmount > 0}
                <div class="breakdown-row discount-row">
                  <span>Diskon Promo</span>
                  <span>-Rp{cart.discountAmount.toLocaleString('id-ID')}</span>
                </div>
              {/if}
              <div class="breakdown-total">
                <span>Total Pembayaran</span>
                <span class="final-price">Rp{cart.grandTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <a href="/checkout" class="checkout-btn">
              <span>Lanjut ke Pembayaran</span>
              <IconArrowRight size={18} stroke={1.5} aria-hidden="true" />
            </a>

            <!-- Assurance Perks -->
            <div class="perks-list">
              <div class="perk-row">
                <IconShieldCheck size={16} class="perk-ic" aria-hidden="true" />
                <span>100% Produk Original & Terdaftar BPOM</span>
              </div>
              <div class="perk-row">
                <IconRotateClockwise2 size={16} class="perk-ic" aria-hidden="true" />
                <span>Garansi Pengembalian Mudah 7 Hari</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    {/if}
  </main>

  <StoreFooter />
</div>

<style>
  .cart-page-container {
    padding-block: var(--pad);
  }
  .breadcrumb-trail {
    margin-bottom: var(--gap);
  }
  .breadcrumb-trail ol {
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
    list-style: none;
    font-size: var(--fs-small);
  }
  .breadcrumb-trail a {
    color: var(--muted-foreground);
    text-decoration: none;
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
  .page-title {
    font: 700 var(--fs-title)/1.2 var(--font);
    color: var(--text);
    margin: 0 0 var(--pad) 0;
  }

  /* Empty state */
  .empty-cart-card {
    text-align: center;
    padding: clamp(40px, 8vw, 80px) var(--pad);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
  }
  .empty-icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    border-radius: 999px;
    background: var(--raised);
    color: var(--muted-foreground);
    margin-bottom: var(--gap);
  }
  .empty-cart-card h2 {
    font: 700 var(--fs-title)/1.2 var(--font);
    color: var(--text);
    margin: 0 0 8px 0;
  }
  .empty-cart-card p {
    font-size: var(--fs-body);
    color: var(--muted-foreground);
    margin: 0 0 var(--pad) 0;
  }
  .start-btn {
    display: inline-flex;
    align-items: center;
    padding: 10px 24px;
    background: var(--primary);
    color: var(--primary-ink);
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.3 var(--font);
    text-decoration: none;
    transition: opacity var(--t-hover) var(--ease-out);
  }
  .start-btn:hover {
    opacity: 0.9;
  }

  /* Free Shipping Banner */
  .shipping-banner {
    padding: var(--gap) var(--pad);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    margin-bottom: var(--pad);
  }
  .shipping-info-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
  }
  :global(.truck-icon) {
    color: var(--store-accent);
    flex-shrink: 0;
  }
  .shipping-info-row p {
    font-size: var(--fs-body);
    color: var(--text);
    margin: 0;
  }
  .free-badge-text {
    color: var(--positive);
  }
  .progress-track {
    width: 100%;
    height: 8px;
    background: var(--rule);
    border-radius: 999px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: var(--store-accent);
    border-radius: 999px;
    transition: width 300ms var(--ease-out);
  }

  /* 2-column layout */
  .cart-grid-layout {
    display: grid;
    grid-template-columns: 1fr 380px;
    gap: var(--pad);
    align-items: start;
  }

  /* Items Table */
  .items-column {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: var(--pad);
  }
  .items-header-bar {
    display: flex;
    justify-content: space-between;
    padding-bottom: var(--gap);
    border-bottom: 1px solid var(--rule);
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--muted-foreground);
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .cart-items-table {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .cart-row {
    display: grid;
    grid-template-columns: 88px 1fr auto;
    gap: var(--gap);
    align-items: center;
    padding-block: var(--pad);
    border-bottom: 1px solid var(--rule);
  }
  .product-thumb {
    width: 88px;
    height: 88px;
    border-radius: var(--radius-control);
    background: var(--raised);
    border: 1px solid var(--border);
    overflow: hidden;
  }
  .product-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .product-info-block {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }
  .product-title-link {
    font: 600 var(--fs-body)/1.3 var(--font);
    color: var(--text);
    text-decoration: none;
    overflow-wrap: anywhere;
    transition: color var(--t-hover) var(--ease-out);
  }
  .product-title-link:hover {
    color: var(--store-accent);
  }
  .shade-indicator {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
  }
  .color-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    border: 1px solid var(--border);
  }
  .variant-text {
    font-size: var(--fs-small);
    color: var(--muted-foreground);
  }
  .unit-price {
    font-size: var(--fs-small);
    color: var(--muted-foreground);
  }
  .strikethrough {
    text-decoration: line-through;
    color: var(--faint);
    margin-inline-start: 4px;
  }
  .quantity-and-total {
    display: flex;
    align-items: center;
    gap: var(--gap);
  }
  .stepper-box {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    background: var(--surface);
    height: 32px;
  }
  .step-control {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 100%;
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
  }
  .step-control:hover {
    background: var(--raised);
  }
  .step-count {
    min-width: 28px;
    text-align: center;
    font-size: var(--fs-small);
    font-weight: 600;
  }
  .row-subtotal {
    font: 700 var(--fs-body)/1 var(--font);
    color: var(--text);
    min-width: 90px;
    text-align: right;
  }
  .delete-item-btn {
    background: none;
    border: none;
    color: var(--faint);
    cursor: pointer;
    padding: 6px;
    border-radius: var(--radius-control);
    display: inline-flex;
    transition: all var(--t-hover) var(--ease-out);
  }
  .delete-item-btn:hover {
    color: var(--negative);
    background: var(--raised);
  }
  .cart-actions-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: var(--pad);
  }
  .continue-shopping-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--text);
    text-decoration: none;
  }
  .continue-shopping-link:hover {
    text-decoration: underline;
  }
  .clear-all-btn {
    background: none;
    border: none;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
    cursor: pointer;
    text-decoration: underline;
  }
  .clear-all-btn:hover {
    color: var(--negative);
  }

  /* Right Summary Column */
  .summary-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: var(--pad);
    position: sticky;
    top: calc(var(--store-touch-target) + var(--gap) + 16px);
  }
  .summary-card h2 {
    font: 700 var(--fs-section)/1.2 var(--font);
    color: var(--text);
    margin: 0 0 var(--pad) 0;
  }
  .voucher-box {
    margin-bottom: var(--pad);
    padding-bottom: var(--gap);
    border-bottom: 1px solid var(--rule);
  }
  .voucher-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--text);
    margin-bottom: 8px;
  }
  :global(.tag-icon) {
    color: var(--store-accent);
  }
  .voucher-input-group {
    display: flex;
    gap: 8px;
  }
  .voucher-input-group input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    font-size: var(--fs-small);
  }
  .voucher-input-group input:focus {
    border-color: var(--store-accent);
    outline: 2px solid var(--store-accent);
    outline-offset: 2px;
  }
  .apply-btn {
    padding: 8px 16px;
    background: var(--primary);
    color: var(--primary-ink);
    border: none;
    border-radius: var(--radius-control);
    font-size: var(--fs-small);
    font-weight: 600;
    cursor: pointer;
  }
  .applied-voucher-badge {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    background: color-mix(in srgb, var(--positive) 12%, transparent);
    color: var(--positive);
    border-radius: var(--radius-control);
    font-size: var(--fs-small);
  }
  .remove-voucher-btn {
    background: none;
    border: none;
    color: var(--negative);
    font-size: var(--fs-small);
    font-weight: 600;
    cursor: pointer;
  }
  .voucher-msg {
    font-size: var(--fs-small);
    color: var(--positive);
    margin: 6px 0 0 0;
  }
  .voucher-msg.error {
    color: var(--negative);
  }

  .breakdown-lines {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: var(--pad);
  }
  .breakdown-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
  }
  .discount-row {
    color: var(--positive);
    font-weight: 600;
  }
  .free-text {
    color: var(--positive);
    font-weight: 600;
  }
  .breakdown-total {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-top: var(--gap);
    border-top: 1px solid var(--rule);
    font-weight: 700;
    color: var(--text);
  }
  .final-price {
    font-size: 22px;
    color: var(--text);
  }
  .checkout-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: var(--store-touch-target);
    background: var(--primary);
    color: var(--primary-ink);
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.2 var(--font);
    text-decoration: none;
    margin-bottom: var(--pad);
    transition: opacity var(--t-hover) var(--ease-out);
  }
  .checkout-btn:hover {
    opacity: 0.9;
  }
  .perks-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: var(--gap);
    border-top: 1px solid var(--rule);
  }
  .perk-row {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
  }
  :global(.perk-ic) {
    color: var(--store-accent);
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    .cart-grid-layout {
      grid-template-columns: 1fr;
    }
    .summary-card {
      position: static;
    }
    .cart-row {
      grid-template-columns: 72px 1fr;
    }
    .quantity-and-total {
      grid-column: 1 / -1;
      justify-content: space-between;
    }
  }
</style>
