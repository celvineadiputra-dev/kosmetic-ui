<script lang="ts">
  import '#lib/components/storefront/foundation.css';
  import { page } from '$app/state';
  import ProductSection from '#lib/components/storefront/ProductSection.svelte';
  import { favorites, newArrivals } from '#lib/components/storefront/products.js';
  import Hero from '#lib/components/storefront/Hero.svelte';
  import Header from '#lib/components/storefront/Header.svelte';
  import CategoryNav from '#lib/components/storefront/CategoryNav.svelte';
  import Action from '#lib/components/storefront/Action.svelte';
  import IconControl from '#lib/components/storefront/IconControl.svelte';

  const categories = [
    { id: 'semua', label: 'Semua Produk' }, { id: 'wajah', label: 'Wajah' },
    { id: 'bibir', label: 'Bibir' }, { id: 'mata', label: 'Mata' },
    { id: 'tools', label: 'Brush & Tools' }, { id: 'promo', label: 'Promo' }
  ].map((item) => ({ ...item, href: `?kategori=${item.id}#tata-letak` }));
  let activeCategory = $derived(categories.find((item) => item.id === page.url.searchParams.get('kategori')) ?? categories[0]);
  let selectedProduct = $derived([...favorites, ...newArrivals].find((product) => product.id === page.url.searchParams.get('produk')));
  let query = $derived(page.url.searchParams.get('q') ?? '');
  let favorite = $state(false);
  let submitted = $state(false);
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

<svelte:head>
  <title>KOSMETIK — Riasan simpel, cantik setiap hari.</title>
  <meta name="description" content="Pratinjau implementasi fondasi KOSMETIK A1: token, tata letak responsif, tombol, kontrol ikon, header, dan hero kosmetik." />
</svelte:head>

<div class="storefront">
  <a class="skip-link" href="#fondasi">Lewati ke konten</a>
  <Header homeHref="/" accountHref="#catatan" wishlistHref="#catatan" cartHref="#catatan" searchAction="/#hasil-pratinjau" {query} />
  <CategoryNav items={categories} active={activeCategory.id} />
  <main id="fondasi" class="store-container">
    <Hero shopHref="#koleksi" />
    <div id="koleksi" class="store-section catalog">
      <ProductSection id="favorit" title="Pilihan Favorit" subtitle="Kosmetik esensial untuk setiap hari." products={favorites} />
      <ProductSection id="baru" title="Baru untuk Kamu" subtitle="Lengkapi koleksi riasanmu." products={newArrivals} />
    </div>
    <p id="catatan-produk" class="product-preview-note" role="status">{selectedProduct ? `${selectedProduct.name} dipilih. Ini data contoh A1; detail produk dan checkout belum terhubung.` : 'Koleksi pratinjau A1. Foto hasil AI; harga, varian, rating, dan jumlah ulasan adalah contoh dari referensi, bukan data toko aktif.'}</p>
    <p id="hasil-pratinjau" class="preview-status" role="status">{query.trim() ? `Pencarian: “${query}”. Ini pratinjau field; hasil produk belum terhubung.` : 'Pratinjau komponen A1 · T01–T16. Cari produk dengan mengetik, lalu tekan Enter.'}</p>

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
    <footer id="catatan" class="store-section">
      <h2>Fondasi siap dirangkai.</h2>
      <p>Pratinjau T01–T16. Kontrol akun, wishlist, dan keranjang di header mengarah ke catatan ini; integrasi belum tersedia. Favorit hanya disimpan selama halaman terbuka.</p>
      <p>Rasio gambar ditampilkan sebagai contoh tata letak. Hero dan foto produk memakai gambar hasil generasi AI. Bagian discovery, promosi, dan pendukung homepage A1 dikerjakan pada tugas berikutnya.</p>
      <a class="wordmark" href="#fondasi">KOSMETIK</a>
    </footer>
  </main>
</div>

<style>
  .catalog, .product-preview-note { scroll-margin-top: var(--pad); }
  .product-preview-note { margin-top: var(--gap); color: var(--muted); overflow-wrap: anywhere; }
  .preview-status { padding-block: var(--pad); color: var(--muted); overflow-wrap: anywhere; scroll-margin-top: var(--pad); }
  .category-status { margin-bottom: var(--gap); color: var(--muted); }
  .wordmark { font-size: var(--fs-title); font-weight: 700; letter-spacing: -0.03em; color: var(--text); text-decoration: none; }
  .section-heading p, .note, footer p, .swatch-caption span, .type-sample > span { color: var(--muted); }
  h2 { font-size: var(--fs-title); line-height: 1.2; font-weight: 600; letter-spacing: -0.02em; }
  h3 { font-size: var(--fs-section); font-weight: 600; }
  .section-heading { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: var(--gap); margin-bottom: var(--pad); }
  .swatch { height: 80px; border-radius: var(--radius-card); }
  .swatch-caption { display: flex; flex-direction: column; padding-block: calc(var(--gap) / 2); overflow-wrap: anywhere; }
  .swatch-caption span { font-size: var(--fs-small); }
  .type-sample { display: flex; align-items: center; gap: var(--pad); flex-wrap: wrap; padding: var(--card-pad); margin-top: var(--gap); background: var(--surface); border-radius: var(--radius-card); }
  .type-sample > strong { font-size: var(--fs-kpi); }
  .type-sample p { flex: 1 1 280px; }
  .ratio-sample { display: grid; place-items: center; border-radius: var(--radius-card); color: var(--muted); }
  .layout-samples p { margin-top: calc(var(--gap) / 2); }
  .split-sample { margin-top: var(--pad); background: var(--surface); border-radius: var(--radius-card); }
  .split-sample .store-copy:last-child { background: var(--raised); border-radius: var(--radius-card); }
  .split-sample p { margin-top: calc(var(--gap) / 2); }
  .specimen { padding: var(--card-pad); background: var(--surface); border-radius: var(--radius-card); display: grid; gap: var(--pad); }
  .action-row, form { display: flex; align-items: center; flex-wrap: wrap; gap: var(--gap); }
  form p { color: var(--muted); flex: 1 1 240px; }
  .icon-samples { display: flex; flex-wrap: wrap; gap: var(--pad); padding: var(--card-pad); background: var(--surface); border-radius: var(--radius-card); }
  .icon-sample { display: flex; flex-direction: column; align-items: start; gap: calc(var(--gap) / 2); }
  .raised-sample { background: var(--raised); margin-top: var(--gap); }
  .note { margin-top: var(--gap); }
  footer { padding-block: var(--pad); display: grid; gap: var(--gap); }
  footer p { max-width: 80ch; }
  footer .wordmark { margin-top: var(--pad); width: fit-content; }
  .skip-link { position: absolute; left: var(--pad); top: var(--pad); padding: var(--gap); background: var(--surface); color: var(--text); transform: translateY(-200%); z-index: 1; }
  .skip-link:focus { transform: none; }
</style>
