<script lang="ts">
  import { cart } from '#lib/stores/cart.svelte.js';
  import { goto } from '$app/navigation';
  import {
    IconShieldCheck,
    IconLock,
    IconTruck,
    IconCreditCard,
    IconQrcode,
    IconBuildingBank,
    IconCash,
    IconCheck,
    IconArrowLeft,
    IconAlertCircle
  } from '@tabler/icons-svelte';

  // Shipping selection
  let selectedCourier = $state<'reguler' | 'nextday' | 'instant'>('reguler');

  // Payment method
  let selectedPayment = $state<'qris' | 'bca' | 'mandiri' | 'bri' | 'cod'>('qris');

  // Customer form inputs
  let fullName = $state('');
  let phone = $state('');
  let email = $state('');
  let streetAddress = $state('');
  let city = $state('Jakarta Selatan, DKI Jakarta');
  let postalCode = $state('12540');
  let deliveryNotes = $state('');
  let errorMessage = $state('');
  let isSubmitting = $state(false);

  // Dynamic courier shipping rates
  let courierRates = $derived.by(() => {
    const baseReguler = cart.shippingFee; // 0 if >= 150k, else 18000
    return {
      reguler: baseReguler,
      nextday: baseReguler + 12000,
      instant: baseReguler + 25000
    };
  });

  let currentShippingCost = $derived(courierRates[selectedCourier] || 0);

  let finalTotal = $derived(
    Math.max(0, cart.subtotal - cart.discountAmount + currentShippingCost)
  );

  function handleProcessPayment(e: SubmitEvent) {
    e.preventDefault();
    errorMessage = '';

    if (!fullName.trim() || !phone.trim() || !streetAddress.trim()) {
      errorMessage = 'Mohon lengkapi nama, nomor telepon, dan alamat pengiriman.';
      return;
    }

    if (cart.items.length === 0) {
      errorMessage = 'Keranjang belanjamu kosong. Silakan pilih produk terlebih dahulu.';
      return;
    }

    isSubmitting = true;

    // Simulate payment generation and order creation
    setTimeout(() => {
      const orderId = `INV/20261022/KSM/${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        orderId,
        date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        customer: {
          fullName,
          phone,
          email,
          address: `${streetAddress}, ${city}, ${postalCode}`,
          notes: deliveryNotes
        },
        courier: selectedCourier,
        paymentMethod: selectedPayment,
        items: [...cart.items],
        subtotal: cart.subtotal,
        discount: cart.discountAmount,
        shippingFee: currentShippingCost,
        total: finalTotal
      };

      try {
        sessionStorage.setItem('kosmetik_last_order', JSON.stringify(orderData));
      } catch {
        // ignore
      }

      cart.clearCart();
      isSubmitting = false;
      goto(`/checkout/sukses?orderId=${encodeURIComponent(orderId)}`);
    }, 900);
  }
</script>

<svelte:head>
  <title>Pembayaran & Checkout — KOSMETIK</title>
</svelte:head>

<div class="storefront checkout-page">
  <!-- Minimalist Checkout Header -->
  <header class="checkout-header">
    <div class="store-container checkout-header-row">
      <a href="/" class="wordmark" aria-label="KOSMETIK, kembali ke beranda">KOSMETIK</a>
      <div class="secure-badge">
        <IconLock size={16} aria-hidden="true" />
        <span>Transaksi 100% Aman & Terenkripsi</span>
      </div>
    </div>
  </header>

  <main class="store-container checkout-main">
    <div class="back-link-row">
      <a href="/keranjang" class="back-link">
        <IconArrowLeft size={16} aria-hidden="true" />
        <span>Kembali ke Keranjang</span>
      </a>
    </div>

    {#if cart.items.length === 0}
      <div class="empty-notice">
        <h2>Tidak ada produk untuk dicheckout</h2>
        <p>Keranjangmu saat ini kosong. Silakan pilih kosmetik terlebih dahulu.</p>
        <a href="/#koleksi" class="primary-btn">Mulai Belanja</a>
      </div>
    {:else}
      <form onsubmit={handleProcessPayment} class="checkout-grid">
        <!-- Left Column: Checkout Details -->
        <div class="checkout-forms-column">
          <!-- Step 1: Customer & Address -->
          <section class="checkout-card" aria-labelledby="shipping-heading">
            <div class="card-title-row">
              <span class="step-badge">1</span>
              <h2 id="shipping-heading">Alamat Pengiriman</h2>
            </div>

            <div class="form-fields">
              <div class="fields-row">
                <div class="field-group flex-1">
                  <label for="input-name">Nama Lengkap *</label>
                  <input
                    id="input-name"
                    type="text"
                    bind:value={fullName}
                    placeholder="Contoh: Sarah Azhari"
                    required
                  />
                </div>
                <div class="field-group flex-1">
                  <label for="input-phone">No. WhatsApp / Telepon *</label>
                  <input
                    id="input-phone"
                    type="tel"
                    bind:value={phone}
                    placeholder="0812-3456-7890"
                    required
                  />
                </div>
              </div>

              <div class="field-group">
                <label for="input-email">Email (Opsional)</label>
                <input
                  id="input-email"
                  type="email"
                  bind:value={email}
                  placeholder="Untuk pengiriman invoice digital"
                />
              </div>

              <div class="field-group">
                <label for="input-address">Alamat Lengkap (Jalan, No. Rumah, RT/RW) *</label>
                <textarea
                  id="input-address"
                  rows={3}
                  bind:value={streetAddress}
                  placeholder="Jl. Kemang Raya No. 45B, Mampang Prapatan"
                  required
                ></textarea>
              </div>

              <div class="fields-row">
                <div class="field-group flex-2">
                  <label for="input-city">Kota / Kabupaten & Provinsi *</label>
                  <input
                    id="input-city"
                    type="text"
                    bind:value={city}
                    placeholder="Kota, Provinsi"
                    required
                  />
                </div>
                <div class="field-group flex-1">
                  <label for="input-postal">Kode Pos *</label>
                  <input
                    id="input-postal"
                    type="text"
                    bind:value={postalCode}
                    placeholder="12540"
                    required
                  />
                </div>
              </div>

              <div class="field-group">
                <label for="input-notes">Catatan untuk Kurir (Opsional)</label>
                <input
                  id="input-notes"
                  type="text"
                  bind:value={deliveryNotes}
                  placeholder="Contoh: Titipkan di pos satpam / pagar hitam"
                />
              </div>
            </div>
          </section>

          <!-- Step 2: Courier Options -->
          <section class="checkout-card" aria-labelledby="courier-heading">
            <div class="card-title-row">
              <span class="step-badge">2</span>
              <h2 id="courier-heading">Pilihan Kurir Pengiriman</h2>
            </div>

            <div class="couriers-list" role="radiogroup" aria-label="Pilih layanan kurir">
              <!-- Reguler -->
              <label class="courier-option" class:selected={selectedCourier === 'reguler'}>
                <input
                  type="radio"
                  name="courier"
                  value="reguler"
                  checked={selectedCourier === 'reguler'}
                  onchange={() => (selectedCourier = 'reguler')}
                />
                <div class="courier-info">
                  <div class="courier-title-line">
                    <strong>Reguler (J&T / SiCepat / JNE)</strong>
                    <span class="cost-tag" class:free={courierRates.reguler === 0}>
                      {courierRates.reguler === 0 ? 'Gratis' : `Rp${courierRates.reguler.toLocaleString('id-ID')}`}
                    </span>
                  </div>
                  <p class="courier-time">Estimasi tiba: 2–3 hari kerja</p>
                </div>
              </label>

              <!-- Next Day -->
              <label class="courier-option" class:selected={selectedCourier === 'nextday'}>
                <input
                  type="radio"
                  name="courier"
                  value="nextday"
                  checked={selectedCourier === 'nextday'}
                  onchange={() => (selectedCourier = 'nextday')}
                />
                <div class="courier-info">
                  <div class="courier-title-line">
                    <strong>Next Day (JNE YES / SiCepat BEST)</strong>
                    <span class="cost-tag">Rp{courierRates.nextday.toLocaleString('id-ID')}</span>
                  </div>
                  <p class="courier-time">Estimasi tiba: Besok hari (1 hari kerja)</p>
                </div>
              </label>

              <!-- Instant -->
              <label class="courier-option" class:selected={selectedCourier === 'instant'}>
                <input
                  type="radio"
                  name="courier"
                  value="instant"
                  checked={selectedCourier === 'instant'}
                  onchange={() => (selectedCourier = 'instant')}
                />
                <div class="courier-info">
                  <div class="courier-title-line">
                    <strong>Instant (GoSend / GrabExpress)</strong>
                    <span class="cost-tag">Rp{courierRates.instant.toLocaleString('id-ID')}</span>
                  </div>
                  <p class="courier-time">Estimasi tiba: 3–4 jam (Khusus Jabodetabek)</p>
                </div>
              </label>
            </div>
          </section>

          <!-- Step 3: Payment Method -->
          <section class="checkout-card" aria-labelledby="payment-heading">
            <div class="card-title-row">
              <span class="step-badge">3</span>
              <h2 id="payment-heading">Metode Pembayaran</h2>
            </div>

            <div class="payments-list" role="radiogroup" aria-label="Pilih metode pembayaran">
              <!-- QRIS -->
              <label class="payment-option" class:selected={selectedPayment === 'qris'}>
                <input
                  type="radio"
                  name="payment"
                  value="qris"
                  checked={selectedPayment === 'qris'}
                  onchange={() => (selectedPayment = 'qris')}
                />
                <div class="payment-content">
                  <div class="payment-header">
                    <IconQrcode size={22} class="payment-ic" aria-hidden="true" />
                    <strong>QRIS (BCA, GoPay, OVO, Dana, ShopeePay)</strong>
                  </div>
                  <p class="payment-desc">Scan kode QR instan tanpa biaya admin. Terverifikasi otomatis dalam detik.</p>
                </div>
              </label>

              <!-- Virtual Account BCA -->
              <label class="payment-option" class:selected={selectedPayment === 'bca'}>
                <input
                  type="radio"
                  name="payment"
                  value="bca"
                  checked={selectedPayment === 'bca'}
                  onchange={() => (selectedPayment = 'bca')}
                />
                <div class="payment-content">
                  <div class="payment-header">
                    <IconBuildingBank size={22} class="payment-ic" aria-hidden="true" />
                    <strong>BCA Virtual Account</strong>
                  </div>
                  <p class="payment-desc">Transfer via BCA Mobile, myBCA, KlikBCA, atau ATM BCA.</p>
                </div>
              </label>

              <!-- Virtual Account Mandiri -->
              <label class="payment-option" class:selected={selectedPayment === 'mandiri'}>
                <input
                  type="radio"
                  name="payment"
                  value="mandiri"
                  checked={selectedPayment === 'mandiri'}
                  onchange={() => (selectedPayment = 'mandiri')}
                />
                <div class="payment-content">
                  <div class="payment-header">
                    <IconBuildingBank size={22} class="payment-ic" aria-hidden="true" />
                    <strong>Mandiri Virtual Account</strong>
                  </div>
                  <p class="payment-desc">Transfer via Livin' by Mandiri, ATM Mandiri, atau Internet Banking.</p>
                </div>
              </label>

              <!-- COD -->
              <label class="payment-option" class:selected={selectedPayment === 'cod'}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedPayment === 'cod'}
                  onchange={() => (selectedPayment = 'cod')}
                />
                <div class="payment-content">
                  <div class="payment-header">
                    <IconCash size={22} class="payment-ic" aria-hidden="true" />
                    <strong>Bayar di Tempat (COD)</strong>
                  </div>
                  <p class="payment-desc">Bayar tunai kepada kurir saat pesanan sampai di alamatmu.</p>
                </div>
              </label>
            </div>
          </section>

          {#if errorMessage}
            <div class="error-banner" role="alert">
              <IconAlertCircle size={20} aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          {/if}
        </div>

        <!-- Right Column: Order Summary & Place Order -->
        <aside class="checkout-summary-column" aria-labelledby="order-summary-title">
          <div class="summary-card">
            <h2 id="order-summary-title">Pesanan Kamu ({cart.totalCount} produk)</h2>

            <!-- Item Mini List -->
            <ul class="mini-items-list">
              {#each cart.items as item (item.id)}
                <li class="mini-item">
                  <div class="mini-thumb">
                    <img src={item.image} alt={item.name} width="56" height="56" loading="lazy" />
                  </div>
                  <div class="mini-details">
                    <span class="mini-name">{item.name}</span>
                    <span class="mini-variant">{item.shade ? item.shade.name : item.variant}</span>
                    <div class="mini-price-row">
                      <span>{item.quantity} × Rp{item.price.toLocaleString('id-ID')}</span>
                      <strong>Rp{(item.price * item.quantity).toLocaleString('id-ID')}</strong>
                    </div>
                  </div>
                </li>
              {/each}
            </ul>

            <!-- Calculation -->
            <div class="calc-lines">
              <div class="calc-row">
                <span>Subtotal Produk</span>
                <span>Rp{cart.subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div class="calc-row">
                <span>Ongkos Kirim ({selectedCourier.toUpperCase()})</span>
                <span class:free={currentShippingCost === 0}>
                  {currentShippingCost === 0 ? 'Gratis' : `Rp${currentShippingCost.toLocaleString('id-ID')}`}
                </span>
              </div>
              {#if cart.discountAmount > 0}
                <div class="calc-row discount">
                  <span>Diskon Voucher ({cart.voucherCode})</span>
                  <span>-Rp{cart.discountAmount.toLocaleString('id-ID')}</span>
                </div>
              {/if}
              <div class="calc-total-row">
                <span>Total Pembayaran</span>
                <span class="grand-total-val">Rp{finalTotal.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <button type="submit" class="submit-order-btn" disabled={isSubmitting}>
              {#if isSubmitting}
                <span>Memproses Pesanan...</span>
              {:else}
                <span>Bayar Sekarang · Rp{finalTotal.toLocaleString('id-ID')}</span>
              {/if}
            </button>

            <div class="assurance-block">
              <div class="assurance-item">
                <IconShieldCheck size={18} class="assure-ic" aria-hidden="true" />
                <span>Garansi Resmi & 100% Produk Original BPOM</span>
              </div>
              <div class="assurance-item">
                <IconTruck size={18} class="assure-ic" aria-hidden="true" />
                <span>Pengemasan Bubble Wrap Tebal & Rapi</span>
              </div>
            </div>
          </div>
        </aside>
      </form>
    {/if}
  </main>
</div>

<style>
  .checkout-page {
    background: var(--ground);
    min-height: 100vh;
  }
  .checkout-header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding-block: var(--gap);
  }
  .checkout-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .wordmark {
    color: var(--text);
    font: 700 var(--fs-title)/1.2 var(--font);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
  }
  .secure-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-small);
    color: var(--positive);
    font-weight: 600;
  }
  .checkout-main {
    padding-block: var(--pad);
  }
  .back-link-row {
    margin-bottom: var(--pad);
  }
  .back-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--muted-foreground);
    text-decoration: none;
  }
  .back-link:hover {
    color: var(--text);
    text-decoration: underline;
  }

  .empty-notice {
    text-align: center;
    padding: clamp(40px, 8vw, 80px) var(--pad);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
  }
  .empty-notice h2 {
    font: 700 var(--fs-title)/1.2 var(--font);
    color: var(--text);
    margin: 0 0 8px 0;
  }
  .empty-notice p {
    font-size: var(--fs-body);
    color: var(--muted-foreground);
    margin: 0 0 var(--pad) 0;
  }
  .primary-btn {
    display: inline-flex;
    padding: 10px 24px;
    background: var(--primary);
    color: var(--primary-ink);
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.3 var(--font);
    text-decoration: none;
  }

  /* Checkout Grid */
  .checkout-grid {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: var(--pad);
    align-items: start;
  }
  .checkout-forms-column {
    display: flex;
    flex-direction: column;
    gap: var(--pad);
  }
  .checkout-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: var(--pad);
  }
  .card-title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: var(--pad);
  }
  .step-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 999px;
    background: var(--primary);
    color: var(--primary-ink);
    font: 700 var(--fs-small)/1 var(--font);
    flex-shrink: 0;
  }
  .card-title-row h2 {
    font: 700 var(--fs-section)/1.2 var(--font);
    color: var(--text);
    margin: 0;
  }

  /* Form Fields */
  .form-fields {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
  }
  .fields-row {
    display: flex;
    gap: var(--gap);
  }
  .flex-1 {
    flex: 1;
  }
  .flex-2 {
    flex: 2;
  }
  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .field-group label {
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--text);
  }
  input[type='text'],
  input[type='tel'],
  input[type='email'],
  textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    background: var(--surface);
    color: var(--text);
    font: var(--fs-body)/1.4 var(--font);
    box-sizing: border-box;
    transition: border-color var(--t-hover) var(--ease-out);
  }
  input:focus,
  textarea:focus {
    border-color: var(--store-accent);
    outline: 2px solid var(--store-accent);
    outline-offset: 2px;
  }

  /* Couriers */
  .couriers-list,
  .payments-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .courier-option,
  .payment-option {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 14px 16px;
    border: 1px solid var(--border);
    border-radius: var(--radius-control);
    cursor: pointer;
    background: var(--surface);
    transition: all var(--t-hover) var(--ease-out);
  }
  .courier-option:hover,
  .payment-option:hover {
    border-color: var(--control);
    background: var(--raised);
  }
  .courier-option.selected,
  .payment-option.selected {
    border-color: var(--store-accent);
    background: color-mix(in srgb, var(--store-accent) 5%, var(--surface));
  }
  .courier-option input,
  .payment-option input {
    margin-top: 3px;
    accent-color: var(--store-accent);
  }
  .courier-info,
  .payment-content {
    flex: 1;
  }
  .courier-title-line {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    font-size: var(--fs-body);
    color: var(--text);
  }
  .cost-tag {
    font-weight: 700;
    color: var(--text);
  }
  .cost-tag.free {
    color: var(--positive);
  }
  .courier-time,
  .payment-desc {
    font-size: var(--fs-small);
    color: var(--muted-foreground);
    margin: 4px 0 0 0;
  }
  .payment-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--fs-body);
    color: var(--text);
  }
  :global(.payment-ic) {
    color: var(--store-accent);
    flex-shrink: 0;
  }

  /* Error Banner */
  .error-banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: color-mix(in srgb, var(--negative) 12%, transparent);
    color: var(--negative);
    border-radius: var(--radius-control);
    font-size: var(--fs-small);
    font-weight: 600;
  }

  /* Right Summary Box */
  .summary-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: var(--pad);
    position: sticky;
    top: calc(var(--gap) + 16px);
  }
  .summary-card h2 {
    font: 700 var(--fs-section)/1.2 var(--font);
    color: var(--text);
    margin: 0 0 var(--pad) 0;
  }
  .mini-items-list {
    list-style: none;
    padding: 0;
    margin: 0 0 var(--pad) 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 280px;
    overflow-y: auto;
  }
  .mini-item {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  .mini-thumb {
    width: 52px;
    height: 52px;
    border-radius: var(--radius-control);
    background: var(--raised);
    border: 1px solid var(--border);
    overflow: hidden;
    flex-shrink: 0;
  }
  .mini-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .mini-details {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .mini-name {
    font-weight: 600;
    font-size: var(--fs-small);
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mini-variant {
    font-size: 11px;
    color: var(--muted-foreground);
  }
  .mini-price-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
  }
  .mini-price-row strong {
    color: var(--text);
  }

  /* Calc */
  .calc-lines {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: var(--gap);
    border-top: 1px solid var(--rule);
    margin-bottom: var(--pad);
  }
  .calc-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
  }
  .calc-row span.free {
    color: var(--positive);
    font-weight: 600;
  }
  .calc-row.discount {
    color: var(--positive);
    font-weight: 600;
  }
  .calc-total-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-top: var(--gap);
    border-top: 1px solid var(--rule);
    font-weight: 700;
    color: var(--text);
  }
  .grand-total-val {
    font-size: 22px;
    color: var(--text);
  }

  .submit-order-btn {
    width: 100%;
    min-height: var(--store-touch-target);
    background: var(--primary);
    color: var(--primary-ink);
    border: none;
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.2 var(--font);
    cursor: pointer;
    transition: opacity var(--t-hover) var(--ease-out);
    margin-bottom: var(--pad);
  }
  .submit-order-btn:hover:not(:disabled) {
    opacity: 0.9;
  }
  .submit-order-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .assurance-block {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: var(--gap);
    border-top: 1px solid var(--rule);
  }
  .assurance-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
  }
  :global(.assure-ic) {
    color: var(--store-accent);
    flex-shrink: 0;
  }

  @media (max-width: 900px) {
    .checkout-grid {
      grid-template-columns: 1fr;
    }
    .summary-card {
      position: static;
    }
    .fields-row {
      flex-direction: column;
    }
  }
</style>
