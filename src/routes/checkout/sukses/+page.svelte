<script lang="ts">
  import { browser } from '$app/env';
  import { page } from '$app/state';
  import {
    IconCircleCheckFilled,
    IconCopy,
    IconCheck,
    IconQrcode,
    IconBuildingBank,
    IconCash,
    IconTruck,
    IconArrowRight,
    IconShoppingBag
  } from '@tabler/icons-svelte';

  let orderId = $derived(page.url.searchParams.get('orderId') || 'INV/20261022/KSM/948201');
  let orderData = $state<any>(null);
  let copiedText = $state('');

  $effect(() => {
    if (browser) {
      try {
        const stored = sessionStorage.getItem('kosmetik_last_order');
        if (stored) {
          orderData = JSON.parse(stored);
        }
      } catch {
        // ignore
      }
    }
  });

  function handleCopy(text: string, label: string) {
    if (browser) {
      navigator.clipboard.writeText(text);
      copiedText = label;
      setTimeout(() => {
        copiedText = '';
      }, 2000);
    }
  }

  // Virtual account mock
  const vaNumbers: Record<string, string> = {
    bca: '8277 0812 3456 7890',
    mandiri: '8870 8123 4567 8901',
    bri: '1029 8123 4567 8902'
  };
</script>

<svelte:head>
  <title>Pesanan Berhasil — KOSMETIK</title>
</svelte:head>

<div class="storefront success-page">
  <header class="checkout-header">
    <div class="store-container checkout-header-row">
      <a href="/" class="wordmark" aria-label="KOSMETIK, kembali ke beranda">KOSMETIK</a>
      <div class="secure-badge">
        <IconCircleCheckFilled size={18} aria-hidden="true" />
        <span>Pesanan Terverifikasi</span>
      </div>
    </div>
  </header>

  <main class="store-container success-container">
    <div class="success-card">
      <!-- Success Icon & Title -->
      <div class="success-icon-wrap">
        <IconCircleCheckFilled size={56} class="check-icon" aria-hidden="true" />
      </div>

      <h1>Pesanan Berhasil Dibuat!</h1>
      <p class="success-subtitle">
        Terima kasih atas pesananmu di KOSMETIK. Detail pesanan dan invoice telah kami siapkan.
      </p>

      <!-- Invoice Code Bar -->
      <div class="invoice-box">
        <div class="invoice-details">
          <span class="inv-label">Nomor Invoice</span>
          <span class="inv-code">{orderId}</span>
        </div>
        <button
          type="button"
          class="copy-btn"
          onclick={() => handleCopy(orderId, 'invoice')}
          aria-label="Salin nomor invoice"
        >
          {#if copiedText === 'invoice'}
            <IconCheck size={16} class="copied-ic" aria-hidden="true" />
            <span>Tersalin!</span>
          {:else}
            <IconCopy size={16} aria-hidden="true" />
            <span>Salin</span>
          {/if}
        </button>
      </div>

      <!-- Payment Instructions Box -->
      {#if orderData?.paymentMethod === 'qris' || !orderData}
        <div class="payment-instruction-card qris-card">
          <div class="payment-title-row">
            <IconQrcode size={22} class="accent-ic" aria-hidden="true" />
            <h3>Pembayaran via QRIS</h3>
          </div>
          <p class="pay-note">
            Scan kode QRIS di bawah ini dengan aplikasi mobile banking atau e-wallet pilihanmu (BCA, GoPay, OVO, Dana, ShopeePay).
          </p>
          <div class="qris-frame">
            <!-- Simulated Authentic QRIS Graphic -->
            <div class="qris-badge-top">QRIS · GPN</div>
            <div class="qris-mock-code">
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="160" height="160" fill="white" />
                <rect x="12" y="12" width="40" height="40" stroke="#111" stroke-width="6" />
                <rect x="24" y="24" width="16" height="16" fill="#111" />
                <rect x="108" y="12" width="40" height="40" stroke="#111" stroke-width="6" />
                <rect x="120" y="24" width="16" height="16" fill="#111" />
                <rect x="12" y="108" width="40" height="40" stroke="#111" stroke-width="6" />
                <rect x="24" y="120" width="16" height="16" fill="#111" />
                <!-- Center patterns -->
                <rect x="68" y="20" width="12" height="24" fill="#111" />
                <rect x="88" y="12" width="8" height="32" fill="#111" />
                <rect x="60" y="60" width="40" height="40" fill="#1f6f5c" />
                <rect x="12" y="68" width="32" height="12" fill="#111" />
                <rect x="116" y="68" width="32" height="12" fill="#111" />
                <rect x="68" y="116" width="24" height="12" fill="#111" />
                <rect x="108" y="108" width="40" height="40" fill="#111" />
              </svg>
            </div>
            <div class="qris-total-text">
              Total: <strong>Rp{(orderData?.total || 148000).toLocaleString('id-ID')}</strong>
            </div>
          </div>
        </div>
      {:else if orderData?.paymentMethod === 'bca' || orderData?.paymentMethod === 'mandiri' || orderData?.paymentMethod === 'bri'}
        {@const vaKey = orderData.paymentMethod}
        <div class="payment-instruction-card va-card">
          <div class="payment-title-row">
            <IconBuildingBank size={22} class="accent-ic" aria-hidden="true" />
            <h3>Virtual Account {vaKey.toUpperCase()}</h3>
          </div>
          <p class="pay-note">Silakan transfer tepat sesuai total nominal ke nomor Virtual Account berikut:</p>
          <div class="va-display-box">
            <div>
              <span class="va-label">Nomor Virtual Account</span>
              <strong class="va-number">{vaNumbers[vaKey] || '8277 0812 3456 7890'}</strong>
            </div>
            <button
              type="button"
              class="copy-btn"
              onclick={() => handleCopy(vaNumbers[vaKey] || '8277 0812 3456 7890', 'va')}
              aria-label="Salin nomor virtual account"
            >
              {#if copiedText === 'va'}
                <IconCheck size={16} class="copied-ic" aria-hidden="true" />
                <span>Tersalin!</span>
              {:else}
                <IconCopy size={16} aria-hidden="true" />
                <span>Salin</span>
              {/if}
            </button>
          </div>
        </div>
      {:else if orderData?.paymentMethod === 'cod'}
        <div class="payment-instruction-card cod-card">
          <div class="payment-title-row">
            <IconCash size={22} class="accent-ic" aria-hidden="true" />
            <h3>Pembayaran di Tempat (COD)</h3>
          </div>
          <p class="pay-note">
            Pesananmu akan segera dikemas. Mohon siapkan uang tunai pas sebesar
            <strong>Rp{(orderData?.total || 148000).toLocaleString('id-ID')}</strong> saat kurir menyerahkan paket.
          </p>
        </div>
      {/if}

      <!-- Order Recap Details -->
      <div class="order-details-grid">
        <!-- Delivery info -->
        <div class="detail-box">
          <h3>Tujuan Pengiriman</h3>
          <p class="customer-name">{orderData?.customer?.fullName || 'Sarah Azhari'}</p>
          <p class="customer-phone">{orderData?.customer?.phone || '0812-3456-7890'}</p>
          <p class="customer-address">{orderData?.customer?.address || 'Jl. Kemang Raya No. 45B, Jakarta Selatan, 12540'}</p>
          {#if orderData?.customer?.notes}
            <p class="courier-note">Catatan: “{orderData.customer.notes}”</p>
          {/if}
        </div>

        <!-- Items recap -->
        <div class="detail-box">
          <h3>Ringkasan Pembayaran</h3>
          <div class="summary-line-row">
            <span>Metode</span>
            <strong class="capitalize">{orderData?.paymentMethod?.toUpperCase() || 'QRIS'}</strong>
          </div>
          <div class="summary-line-row">
            <span>Pengiriman</span>
            <strong class="capitalize">{orderData?.courier?.toUpperCase() || 'REGULER'}</strong>
          </div>
          <div class="summary-line-row">
            <span>Ongkos Kirim</span>
            <span>{orderData?.shippingFee === 0 ? 'Gratis' : `Rp${(orderData?.shippingFee || 0).toLocaleString('id-ID')}`}</span>
          </div>
          {#if orderData?.discount > 0}
            <div class="summary-line-row discount">
              <span>Diskon Voucher</span>
              <span>-Rp{orderData.discount.toLocaleString('id-ID')}</span>
            </div>
          {/if}
          <div class="summary-line-row total-row">
            <span>Total Tagihan</span>
            <strong class="final-total">Rp{(orderData?.total || 148000).toLocaleString('id-ID')}</strong>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="actions-row">
        <a href="/" class="home-btn">
          <span>Kembali ke Beranda</span>
        </a>
        <a href="/#koleksi" class="shop-more-btn">
          <IconShoppingBag size={18} stroke={1.5} aria-hidden="true" />
          <span>Belanja Produk Lain</span>
        </a>
      </div>
    </div>
  </main>
</div>

<style>
  .success-page {
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

  .success-container {
    padding-block: clamp(32px, 5vw, 64px);
    max-width: 760px;
  }
  .success-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    padding: clamp(24px, 5vw, 48px);
    text-align: center;
    box-shadow: 0 4px 24px -2px rgba(0, 0, 0, 0.04);
  }
  .success-icon-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: var(--gap);
  }
  :global(.check-icon) {
    color: var(--positive);
  }
  .success-card h1 {
    font: 700 clamp(24px, 3.5vw, 32px)/1.2 var(--font);
    color: var(--text);
    margin: 0 0 8px 0;
  }
  .success-subtitle {
    font-size: var(--fs-body);
    color: var(--muted-foreground);
    max-width: 50ch;
    margin: 0 auto var(--pad) auto;
    text-wrap: pretty;
  }

  /* Invoice Box */
  .invoice-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 18px;
    background: var(--raised);
    border: 1px solid var(--border);
    border-radius: var(--radius-control);
    margin-bottom: var(--pad);
  }
  .invoice-details {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 2px;
  }
  .inv-label {
    font-size: 11px;
    color: var(--muted-foreground);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .inv-code {
    font-size: var(--fs-body);
    font-weight: 700;
    color: var(--text);
  }
  .copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    background: var(--surface);
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    font-size: var(--fs-small);
    font-weight: 600;
    color: var(--text);
    cursor: pointer;
    transition: all var(--t-hover) var(--ease-out);
  }
  .copy-btn:hover {
    background: var(--raised);
    border-color: var(--text);
  }
  :global(.copied-ic) {
    color: var(--positive);
  }

  /* Payment Instructions */
  .payment-instruction-card {
    text-align: left;
    padding: var(--pad);
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-control);
    margin-bottom: var(--pad);
  }
  .payment-title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }
  .payment-title-row h3 {
    font: 600 var(--fs-section)/1.2 var(--font);
    color: var(--text);
    margin: 0;
  }
  :global(.accent-ic) {
    color: var(--store-accent);
  }
  .pay-note {
    font-size: var(--fs-small);
    color: var(--muted-foreground);
    margin: 0 0 var(--gap) 0;
    line-height: 1.5;
  }

  /* QRIS */
  .qris-frame {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--gap);
    background: #ffffff;
    border: 1px solid var(--border);
    border-radius: var(--radius-card);
    width: fit-content;
    margin: 0 auto;
  }
  .qris-badge-top {
    font: 700 12px/1 var(--font);
    letter-spacing: 0.1em;
    color: #c4242a;
    margin-bottom: 8px;
  }
  .qris-mock-code {
    padding: 8px;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  }
  .qris-total-text {
    margin-top: 10px;
    font-size: var(--fs-small);
    color: var(--text);
  }

  /* Virtual Account */
  .va-display-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 18px;
    background: var(--raised);
    border: 1px solid var(--border);
    border-radius: var(--radius-control);
  }
  .va-label {
    display: block;
    font-size: 11px;
    color: var(--muted-foreground);
    text-transform: uppercase;
  }
  .va-number {
    font-size: 18px;
    color: var(--text);
    letter-spacing: 0.05em;
  }

  /* Order Details Grid */
  .order-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--pad);
    text-align: left;
    margin-bottom: var(--pad);
  }
  .detail-box {
    padding: var(--gap);
    background: var(--raised);
    border-radius: var(--radius-control);
  }
  .detail-box h3 {
    font: 600 var(--fs-small)/1.2 var(--font);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--muted-foreground);
    margin: 0 0 10px 0;
  }
  .customer-name {
    font-weight: 600;
    color: var(--text);
    margin: 0 0 2px 0;
  }
  .customer-phone,
  .customer-address {
    font-size: var(--fs-small);
    color: var(--muted-foreground);
    margin: 0 0 4px 0;
    line-height: 1.4;
  }
  .courier-note {
    font-size: var(--fs-small);
    font-style: italic;
    color: var(--muted-foreground);
    margin-top: 8px;
  }
  .summary-line-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--fs-small);
    color: var(--muted-foreground);
    margin-bottom: 6px;
  }
  .summary-line-row.discount {
    color: var(--positive);
  }
  .summary-line-row.total-row {
    border-top: 1px solid var(--border);
    padding-top: 8px;
    margin-top: 8px;
    font-size: var(--fs-body);
    font-weight: 700;
    color: var(--text);
  }
  .final-total {
    font-size: 16px;
    color: var(--text);
  }
  .capitalize {
    text-transform: capitalize;
  }

  /* Actions */
  .actions-row {
    display: flex;
    justify-content: center;
    gap: var(--gap);
    flex-wrap: wrap;
  }
  .home-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--store-touch-target);
    padding: 10px 24px;
    background: var(--primary);
    color: var(--primary-ink);
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.2 var(--font);
    text-decoration: none;
    transition: opacity var(--t-hover) var(--ease-out);
  }
  .home-btn:hover {
    opacity: 0.9;
  }
  .shop-more-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: var(--store-touch-target);
    padding: 10px 20px;
    background: var(--surface);
    color: var(--text);
    border: 1px solid var(--control);
    border-radius: var(--radius-control);
    font: 600 var(--fs-body)/1.2 var(--font);
    text-decoration: none;
    transition: background-color var(--t-hover) var(--ease-out);
  }
  .shop-more-btn:hover {
    background: var(--raised);
  }

  @media (max-width: 767px) {
    .order-details-grid {
      grid-template-columns: 1fr;
    }
    .actions-row {
      flex-direction: column;
    }
    .home-btn,
    .shop-more-btn {
      width: 100%;
    }
  }
</style>
