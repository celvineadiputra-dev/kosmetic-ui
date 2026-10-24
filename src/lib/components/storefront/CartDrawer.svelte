<script lang="ts">
  import { cart } from '#lib/stores/cart.svelte.js';
  import { IconX, IconTrash, IconPlus, IconMinus, IconShoppingBag, IconTruck, IconArrowRight } from '@tabler/icons-svelte';

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && cart.isDrawerOpen) {
      cart.closeDrawer();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

{#if cart.isDrawerOpen}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="cart-backdrop" onclick={() => cart.closeDrawer()} aria-hidden="true"></div>

  <!-- Drawer Container -->
  <div
    class="cart-drawer-panel storefront"
    role="dialog"
    aria-modal="true"
    aria-label="Keranjang Belanja"
  >
    <!-- Header -->
    <header class="drawer-header">
      <div class="header-title-group">
        <h2>Keranjang Belanja</h2>
        <span class="count-badge">{cart.totalCount}</span>
      </div>
      <button
        type="button"
        class="close-btn"
        onclick={() => cart.closeDrawer()}
        aria-label="Tutup keranjang"
      >
        <IconX size={20} stroke={1.5} aria-hidden="true" />
      </button>
    </header>

    <!-- Free Shipping Bar -->
    <div class="shipping-bar-container">
      <div class="shipping-text-row">
        <IconTruck size={18} class="truck-icon" aria-hidden="true" />
        {#if cart.remainingForFreeShipping > 0}
          <p>
            Tambah <strong>Rp{cart.remainingForFreeShipping.toLocaleString('id-ID')}</strong> lagi untuk <strong>Gratis Ongkir</strong>!
          </p>
        {:else if cart.items.length > 0}
          <p class="free-shipping-achieved">
            Selamat! Kamu berhak mendapatkan <strong>Gratis Ongkir</strong>.
          </p>
        {:else}
          <p>Gratis ongkir untuk pesanan mulai <strong>Rp150.000</strong>.</p>
        {/if}
      </div>
      <div class="progress-track" aria-hidden="true">
        <div class="progress-fill" style={`width: ${cart.freeShippingProgress}%;`}></div>
      </div>
    </div>

    <!-- Items List or Empty State -->
    <div class="drawer-body">
      {#if cart.items.length === 0}
        <div class="empty-state">
          <div class="empty-icon-circle">
            <IconShoppingBag size={32} stroke={1.5} aria-hidden="true" />
          </div>
          <h3>Keranjangmu masih kosong</h3>
          <p>Yuk, temukan kosmetik favoritmu untuk melengkapi riasan harian!</p>
          <a
            href="/#koleksi"
            class="start-shopping-btn"
            onclick={() => cart.closeDrawer()}
          >
            Mulai Belanja
          </a>
        </div>
      {:else}
        <ul class="items-list">
          {#each cart.items as item (item.id)}
            <li class="item-card">
              <a
                href={`/produk/${item.productId}`}
                class="item-thumbnail"
                onclick={() => cart.closeDrawer()}
              >
                <img src={item.image} alt={item.name} width="80" height="80" loading="lazy" />
              </a>

              <div class="item-details">
                <div class="item-name-row">
                  <a
                    href={`/produk/${item.productId}`}
                    class="item-name"
                    onclick={() => cart.closeDrawer()}
                  >
                    {item.name}
                  </a>
                  <button
                    type="button"
                    class="remove-btn"
                    onclick={() => cart.removeItem(item.id)}
                    aria-label={`Hapus ${item.name} dari keranjang`}
                  >
                    <IconTrash size={16} stroke={1.5} aria-hidden="true" />
                  </button>
                </div>

                {#if item.shade}
                  <div class="shade-badge">
                    <span class="shade-dot" style={`background-color: ${item.shade.hex};`} aria-hidden="true"></span>
                    <span>{item.shade.name}</span>
                  </div>
                {:else if item.variant}
                  <div class="variant-text">{item.variant}</div>
                {/if}

                <div class="item-footer">
                  <div class="item-price">Rp{item.price.toLocaleString('id-ID')}</div>

                  <div class="item-stepper" aria-label={`Jumlah ${item.name}`}>
                    <button
                      type="button"
                      class="step-btn"
                      onclick={() => cart.updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Kurangi jumlah"
                    >
                      <IconMinus size={14} aria-hidden="true" />
                    </button>
                    <span class="step-val">{item.quantity}</span>
                    <button
                      type="button"
                      class="step-btn"
                      onclick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Tambah jumlah"
                    >
                      <IconPlus size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Footer Summary & Checkout Action -->
    {#if cart.items.length > 0}
      <footer class="drawer-footer">
        <div class="summary-breakdown">
          <div class="summary-line">
            <span class="line-label">Subtotal</span>
            <span class="line-val">Rp{cart.subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div class="summary-line">
            <span class="line-label">Estimasi Ongkir</span>
            <span class="line-val" class:free={cart.shippingFee === 0}>
              {cart.shippingFee === 0 ? 'Gratis' : `Rp${cart.shippingFee.toLocaleString('id-ID')}`}
            </span>
          </div>
          {#if cart.discountAmount > 0}
            <div class="summary-line discount">
              <span class="line-label">Diskon ({cart.voucherCode})</span>
              <span class="line-val">-Rp{cart.discountAmount.toLocaleString('id-ID')}</span>
            </div>
          {/if}
          <div class="summary-total-line">
            <span>Total</span>
            <span class="grand-total">Rp{cart.grandTotal.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div class="actions-group">
          <a
            href="/checkout"
            class="checkout-action-btn"
            onclick={() => cart.closeDrawer()}
          >
            <span>Lanjut ke Pembayaran</span>
            <IconArrowRight size={18} stroke={1.5} aria-hidden="true" />
          </a>
          <a
            href="/keranjang"
            class="view-cart-link"
            onclick={() => cart.closeDrawer()}
          >
            Lihat Keranjang Lengkap
          </a>
        </div>
      </footer>
    {/if}
  </div>
{/if}

<style>
  .cart-backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    transition: opacity var(--t-ui) var(--ease-out);
  }

  .cart-drawer-panel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 101;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 440px;
    background-color: var(--surface, #ffffff);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.12);
    animation: drawerSlideIn 260ms var(--ease-out);
  }

  @keyframes drawerSlideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  /* Header */
  .drawer-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--pad);
    background-color: var(--surface, #ffffff);
    border-bottom: 1px solid var(--border);
  }
  .header-title-group {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .header-title-group h2 {
    font: 700 var(--fs-section)/1.2 var(--font);
    color: var(--text);
    margin: 0;
  }
  .count-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 22px;
    height: 22px;
    padding: 0 6px;
    border-radius: 999px;
    background: var(--primary);
    color: var(--primary-ink);
    font: 700 var(--fs-small)/1 var(--font);
  }
  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: none;
    border: none;
    border-radius: var(--radius-control);
    color: var(--muted-foreground);
    cursor: pointer;
    transition: background-color var(--t-hover) var(--ease-out), color var(--t-hover) var(--ease-out);
  }
  .close-btn:hover {
    background: var(--raised);
    color: var(--text);
  }

  /* Free Shipping Bar */
  .shipping-bar-container {
    padding: calc(var(--gap) * 0.75) var(--pad);
    background: var(--raised);
    border-bottom: 1px solid var(--border);
  }
  .shipping-text-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
  }
  :global(.truck-icon) {
    color: var(--store-accent);
    flex-shrink: 0;
  }
  .shipping-text-row p {
    font-size: var(--fs-small);
    color: var(--text);
    margin: 0;
  }
  .free-shipping-achieved {
    color: var(--positive);
  }
  .progress-track {
    width: 100%;
    height: 6px;
    background: var(--control);
    border-radius: 999px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: var(--store-accent);
    border-radius: 999px;
    transition: width 300ms var(--ease-out);
  }

  /* Body */
  .drawer-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--pad);
    background-color: var(--surface, #ffffff);
  }

  /* Empty State */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    padding: var(--pad);
  }
  .empty-icon-circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 999px;
    background: var(--raised);
    color: var(--muted-foreground);
    margin-bottom: var(--gap);
  }
  .empty-state h3 {
    font: 600 var(--fs-section)/1.3 var(--font);
    color: var(--text);
    margin: 0 0 6px 0;
  }
  .empty-state p {
    font-size: var(--fs-body);
    color: var(--muted-foreground);
    margin: 0 0 var(--pad) 0;
    max-width: 28ch;
  }
  .start-shopping-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--control-height);
    padding: 8px 20px;
    background: var(--primary);
    color: var(--primary-ink);
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.2 var(--font);
    text-decoration: none;
    transition: opacity var(--t-hover) var(--ease-out);
  }
  .start-shopping-btn:hover {
    opacity: 0.9;
  }

  /* Items List */
  .items-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }
  .item-card {
    display: flex;
    gap: var(--gap);
    padding-bottom: var(--gap);
    border-bottom: 1px solid var(--rule);
  }
  .item-thumbnail {
    width: 76px;
    height: 76px;
    flex-shrink: 0;
    background: var(--raised);
    border: 1px solid var(--border);
    border-radius: var(--radius-control);
    overflow: hidden;
  }
  .item-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .item-details {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .item-name-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }
  .item-name {
    font-weight: 600;
    font-size: var(--fs-body);
    color: var(--text);
    text-decoration: none;
    overflow-wrap: anywhere;
    transition: color var(--t-hover) var(--ease-out);
  }
  .item-name:hover {
    color: var(--store-accent);
  }
  .remove-btn {
    background: none;
    border: none;
    padding: 4px;
    color: var(--faint);
    cursor: pointer;
    border-radius: 4px;
    display: inline-flex;
    transition: color var(--t-hover) var(--ease-out), background-color var(--t-hover) var(--ease-out);
  }
  .remove-btn:hover {
    color: var(--negative);
    background: var(--raised);
  }
  .shade-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
    margin-top: 2px;
  }
  .shade-dot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    border: 1px solid var(--border);
  }
  .variant-text {
    font-size: var(--fs-small);
    color: var(--muted-foreground);
    margin-top: 2px;
  }
  .item-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
  }
  .item-price {
    font-weight: 700;
    font-size: var(--fs-body);
    color: var(--text);
  }
  .item-stepper {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    background: var(--surface);
    height: 30px;
  }
  .step-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 100%;
    background: none;
    border: none;
    color: var(--text);
    cursor: pointer;
    transition: background-color var(--t-hover) var(--ease-out);
  }
  .step-btn:hover {
    background: var(--raised);
  }
  .step-val {
    min-width: 24px;
    text-align: center;
    font-size: var(--fs-small);
    font-weight: 600;
  }

  /* Footer */
  .drawer-footer {
    padding: var(--pad);
    border-top: 1px solid var(--border);
    background-color: var(--surface, #ffffff);
  }
  .summary-breakdown {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: var(--pad);
  }
  .summary-line {
    display: flex;
    justify-content: space-between;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
  }
  .summary-line.discount {
    color: var(--positive);
  }
  .line-val.free {
    color: var(--positive);
    font-weight: 600;
  }
  .summary-total-line {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-top: 8px;
    border-top: 1px solid var(--rule);
    font-weight: 700;
    font-size: var(--fs-body);
    color: var(--text);
  }
  .grand-total {
    font-size: 20px;
    color: var(--text);
  }
  .actions-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .checkout-action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: var(--store-touch-target);
    padding: 10px 20px;
    background: var(--primary);
    color: var(--primary-ink);
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.2 var(--font);
    text-decoration: none;
    transition: opacity var(--t-hover) var(--ease-out), transform var(--t-press) var(--ease-out);
  }
  .checkout-action-btn:hover {
    opacity: 0.9;
  }
  .checkout-action-btn:active {
    transform: scale(0.98);
  }
  .view-cart-link {
    text-align: center;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
    text-decoration: none;
    padding: 4px;
    transition: color var(--t-hover) var(--ease-out);
  }
  .view-cart-link:hover {
    color: var(--text);
    text-decoration: underline;
  }
</style>
