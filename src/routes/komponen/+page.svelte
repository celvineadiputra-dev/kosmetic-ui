<script lang="ts">
  import Action from '#lib/components/storefront/Action.svelte';
  import IconControl from '#lib/components/storefront/IconControl.svelte';
  import NewsletterSection from '#lib/components/storefront/NewsletterSection.svelte';
  let favorite = $state(false);
  let submitted = $state(false);
  let outcome = $state('success');
  const activeCategory = { label: 'Semua Produk' };
  async function simulateSubscription(_email: string) {
    const result = outcome;
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (result === 'failure') throw new Error('Simulated failure');
  }
  const swatches = [
    { name: 'Ground', token: '--ground' }, { name: 'Surface', token: '--surface' },
    { name: 'Raised', token: '--raised' }, { name: 'Active', token: '--active' },
    { name: 'Text', token: '--text' }, { name: 'Accent', token: '--accent' },
    { name: 'Primary', token: '--primary' }, { name: 'Rating', token: '--store-rating-star' }
  ];
  const roles = [
    { icon: 'account', label: 'Akun saya' }, { icon: 'wishlist', label: 'Daftar keinginan' },
    { icon: 'bag', label: 'Keranjang' }, { icon: 'search', label: 'Cari produk' }
  ] as const;
</script>

<svelte:head><title>Komponen KOSMETIK — Pratinjau A1</title></svelte:head>
<div class="storefront">
  <main class="store-container component-preview">
    <a href="/">← Kembali ke homepage</a>
    <h1>Komponen KOSMETIK</h1>
    <section class="store-section state-demo" aria-labelledby="state-demo-title">
      <h2 id="state-demo-title">Uji state newsletter</h2>
      <p>Simulasi lokal. Tidak ada email yang dikirim atau pendaftaran sungguhan.</p>
      <label for="demo-outcome">Hasil simulasi</label>
      <select id="demo-outcome" bind:value={outcome}><option value="success">Berhasil</option><option value="failure">Gagal</option></select>
      {#key outcome}<NewsletterSection privacyHref="/?info=privasi#informasi-pratinjau" subscribe={simulateSubscription} />{/key}
    </section>
    <section class="store-section" aria-labelledby="token-title">
      <div class="section-heading"><h2 id="token-title">Token & tipografi</h2><p>T01 · Fondasi netral, aksen emerald.</p></div>
      <ul class="store-product-grid swatches">
        {#each swatches as swatch}
          <li><div class="swatch" style:background="var({swatch.token})"></div><div class="swatch-caption"><strong>{swatch.name}</strong><span>{swatch.token}</span></div></li>
        {/each}
      </ul>
      <div class="type-sample"><strong>Inter</strong><p>Satu keluarga huruf. Judul yang jelas, teks yang mudah dibaca, dan ukuran kontrol yang konsisten.</p><span>24 / 16 / 28 / 14 / 12 px · Skala fondasi</span></div>
    </section>

    <section id="tata-letak" class="store-section" aria-labelledby="layout-title">
      <div class="section-heading"><h2 id="layout-title">Satu bingkai, semua layar</h2><p>T02 · Empat kolom desktop, dua kolom di bawah 768 px.</p></div>
      <p class="category-status" role="status">Kategori aktif: {activeCategory.label}. Bingkai di bawah adalah contoh grid, bukan hasil kategori.</p>
      <ul class="store-product-grid layout-samples">
        {#each ['Wajah', 'Bibir', 'Mata', 'Brush & Tools'] as category}
          <li><div class="store-media store-product-media ratio-sample"><span>3 : 2</span></div><p>{category}</p></li>
        {/each}
      </ul>
      <div class="store-split store-promo split-sample"><div class="store-copy"><h3>Ruang untuk gambar</h3><p>Panel kiri 60% pada desktop.</p></div><div class="store-copy"><h3>Ruang untuk cerita</h3><p>Panel kanan 40%. Keduanya bertumpuk pada layar kecil.</p></div></div>
    </section>

    <section id="aksi" class="store-section" aria-labelledby="actions-title">
      <div class="section-heading"><h2 id="actions-title">Aksi yang konsisten</h2><p>T03 · Tombol utama, tautan bagian, dan tautan pendukung.</p></div>
      <div class="specimen">
        <div class="action-row"><Action href="#tata-letak" arrow>Belanja Sekarang</Action><Action href="#tata-letak" arrow>Jelajahi Koleksi</Action><Action href="#ikon" variant="section" arrow context="Kontrol ikon">Lihat Semua</Action><Action href="#catatan" variant="secondary">Lihat koleksi baru</Action></div>
        <div class="action-row"><Action disabled arrow>Belanja Sekarang</Action><Action href="#tata-letak" variant="section" disabled>Lihat Semua</Action><Action href="#catatan" variant="secondary" disabled>Lihat koleksi baru</Action></div>
        <form onsubmit={(event) => { event.preventDefault(); submitted = true; }}>
          <Action type="submit">Berlangganan</Action><p role="status">{submitted ? 'Tombol submit berfungsi. Ini pratinjau, belum ada langganan yang dikirim.' : 'Contoh tombol submit tanpa panah. Tekan Tab untuk melihat fokus keyboard.'}</p>
        </form>
      </div>
    </section>

    <section id="ikon" class="store-section" aria-labelledby="icons-title">
      <div class="section-heading"><h2 id="icons-title">Kecil, tetap mudah dijangkau</h2><p>T04 · Ikon 20 px, area interaksi minimal 44 × 44 px.</p></div>
      <div class="icon-samples">
        {#each roles as role}
          <div class="icon-sample"><IconControl icon={role.icon} label={role.label} href="#catatan" /><span>{role.label}</span></div>
        {/each}
        <div class="icon-sample"><IconControl icon="favorite" label="Simpan Velvet Matte Lipstick ke favorit" pressed={favorite} onclick={() => favorite = !favorite} /><span>Favorit · {favorite ? 'tersimpan' : 'belum dipilih'}</span></div>
      </div>
      <div class="icon-samples raised-sample">
        <div class="icon-sample"><IconControl icon="account" label="Akun saya, contoh dengan bingkai" outlined href="#catatan" /><span>Dengan bingkai</span></div>
        <div class="icon-sample"><IconControl icon="favorite" label="Contoh favorit terpilih" pressed outlined /><span>Terpilih</span></div>
        <div class="icon-sample"><IconControl icon="bag" label="Keranjang tidak tersedia" disabled outlined /><span>Tidak tersedia</span></div>
        <div class="icon-sample"><IconControl icon="favorite" label="Favorit terpilih tidak tersedia" pressed disabled /><span>Terpilih, nonaktif</span></div>
      </div>
      <p class="note" role="status">{favorite ? 'Velvet Matte Lipstick dipilih sebagai favorit dalam pratinjau ini.' : 'Coba ikon hati untuk mengubah status favorit.'}</p>
    </section>

    <p id="catatan" class="preview-note">Pratinjau komponen dan state lokal. Akun, wishlist, keranjang, dan newsletter tidak terhubung ke layanan luar.</p>
  </main>
</div>
<style>
  .component-preview { padding-block: var(--pad); }
  .component-preview > a { color: var(--text); text-decoration: underline; }
  h1 { margin-block: var(--pad); font-size: var(--fs-title); font-weight: 700; }
  .state-demo { margin-bottom: var(--store-section-space); }
  .state-demo > p { margin-block: var(--gap); color: var(--muted-foreground); }
  .state-demo > label { display: block; margin-bottom: calc(var(--gap) / 2); }
  select { min-height: var(--store-touch-target); max-width: 100%; padding: calc(var(--gap) / 2); background: var(--surface); color: var(--text); border: 1px solid var(--control); border-radius: var(--radius-control); }
  .preview-note { padding-block: var(--pad); color: var(--muted-foreground); }

  .category-status { margin-bottom: var(--gap); color: var(--muted-foreground); }
  .section-heading p, .note, .swatch-caption span, .type-sample > span { color: var(--muted-foreground); }
  h2 { font-size: var(--fs-title); line-height: 1.2; font-weight: 600; letter-spacing: -0.02em; }
  h3 { font-size: var(--fs-section); font-weight: 600; }
  .section-heading { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: var(--gap); margin-bottom: var(--pad); }
  .swatch { height: 80px; border-radius: var(--radius-card); }
  .swatch-caption { display: flex; flex-direction: column; padding-block: calc(var(--gap) / 2); overflow-wrap: anywhere; }
  .swatch-caption span { font-size: var(--fs-small); }
  .type-sample { display: flex; align-items: center; gap: var(--pad); flex-wrap: wrap; padding: var(--card-pad); margin-top: var(--gap); background: var(--surface); border-radius: var(--radius-card); }
  .type-sample > strong { font-size: var(--fs-kpi); }
  .type-sample p { flex: 1 1 280px; }
  .ratio-sample { display: grid; place-items: center; border-radius: var(--radius-card); color: var(--muted-foreground); }
  .layout-samples p { margin-top: calc(var(--gap) / 2); }
  .split-sample { margin-top: var(--pad); background: var(--surface); border-radius: var(--radius-card); }
  .split-sample .store-copy:last-child { background: var(--raised); border-radius: var(--radius-card); }
  .split-sample p { margin-top: calc(var(--gap) / 2); }
  .specimen { padding: var(--card-pad); background: var(--surface); border-radius: var(--radius-card); display: grid; gap: var(--pad); }
  .action-row, form { display: flex; align-items: center; flex-wrap: wrap; gap: var(--gap); }
  form p { color: var(--muted-foreground); flex: 1 1 240px; }
  .icon-samples { display: flex; flex-wrap: wrap; gap: var(--pad); padding: var(--card-pad); background: var(--surface); border-radius: var(--radius-card); }
  .icon-sample { display: flex; flex-direction: column; align-items: start; gap: calc(var(--gap) / 2); }
  .raised-sample { background: var(--raised); margin-top: var(--gap); }
  .note { margin-top: var(--gap); }
</style>
