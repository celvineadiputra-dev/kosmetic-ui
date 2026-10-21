# Panduan Lengkap UI/UX E-Commerce 2026

**Riset desain, benchmark Tokopedia & Shopee, design system, spesifikasi halaman, wireframe, dan roadmap implementasi**

> **Tanggal riset:** 21 Oktober 2026  
> **Bahasa:** Indonesia  
> **Cakupan:** Website e-commerce responsif, mobile-first, berorientasi pasar Indonesia.  
> **Metode:** Sintesis referensi publik dan panduan usability; bukan audit live yang menyeluruh ataupun hasil A/B test. Antarmuka situs dapat berubah.

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Tujuan dan Asumsi](#2-tujuan-dan-asumsi)
3. [Hasil Penelusuran & Shortlist Inspirasi](#3-hasil-penelusuran--shortlist-inspirasi)
4. [Benchmark Marketplace Indonesia: Tokopedia vs Shopee](#4-benchmark-marketplace-indonesia-tokopedia-vs-shopee)
5. [Pilihan Konsep dan Alasan](#5-pilihan-konsep-dan-alasan)
6. [Prinsip UX Berbasis Riset](#6-prinsip-ux-berbasis-riset)
7. [Struktur Informasi (Sitemap)](#7-struktur-informasi-sitemap)
8. [Spesifikasi Halaman](#8-spesifikasi-halaman)
9. [Design System — Rekomendasi Awal](#9-design-system--rekomendasi-awal)
10. [Wireframe Tekstual](#10-wireframe-tekstual)
11. [Alur Pengguna Utama](#11-alur-pengguna-utama)
12. [Prioritas Pengerjaan](#12-prioritas-pengerjaan)
13. [Kriteria Penerimaan UX](#13-kriteria-penerimaan-ux)
14. [KPI dan Validasi](#14-kpi-dan-validasi)
15. [Hal yang Sebaiknya Dihindari](#15-hal-yang-sebaiknya-dihindari)
16. [Kesimpulan dan Rekomendasi Akhir](#16-kesimpulan-dan-rekomendasi-akhir)
17. [Referensi dan Sumber](#17-referensi-dan-sumber)

## 1. Ringkasan Eksekutif

**Rekomendasi utama: Clean Commerce + Smart Deals (Mobile First).** Gunakan landasan *Modern Minimalist Commerce* dari inspirasi Allbirds, Gymshark, dan Glossier; kombinasikan **kemudahan navigasi, pencarian, dan kategori yang diasosiasikan dengan Tokopedia** serta **kejelasan promosi, voucher, dan social proof yang diasosiasikan dengan Shopee**. Jangan menyalin UI merek secara identik.

**Urutan desain yang disarankan:** pengguna menemukan produk → membandingkan pilihan → membaca detail dan ongkir → menambahkan ke keranjang → menyelesaikan checkout → melacak pesanan. Promo mendukung perjalanan ini, bukan menghalanginya.

**Keputusan desain:** satu hero promo utama, search dominan, kategori sederhana, kartu produk informatif, filter yang persisten, CTA pembelian jelas, dan checkout dengan total transparan. Nilai estetika atau prioritas di sini bersifat penilaian kualitatif, bukan skor ilmiah.

## 2. Tujuan dan Asumsi

- Sasaran: pengalaman belanja cepat, jelas, nyaman, dapat dipercaya, dan responsif.
- Target perangkat: ponsel lebih dulu, diikuti desktop dan tablet.
- Asumsi: e-commerce B2C untuk produk fisik dengan katalog multi-kategori; bukan marketplace multi-vendor yang kompleks.
- Pasar awal: Indonesia; gunakan IDR, metode pembayaran lokal dan bahasa Indonesia sesuai penyedia/operasional yang tersedia.
- Keberhasilan diukur dengan performa tugas pengguna dan hasil bisnis, bukan hanya estetika.

## 3. Hasil Penelusuran & Shortlist Inspirasi

| Referensi | Pola yang layak diadaptasi | Kekuatan utama | Perhatian |
|---|---|---|---|
| [Allbirds](https://www.allbirds.com/) | Visual minimal, fotografi lifestyle, copy produk dan trust messaging | Identitas visual premium dan narasi brand | Jangan sampai cerita visual menyembunyikan harga/CTA |
| [Gymshark](https://www.gymshark.com/) | Navigasi kategori, discovery produk, tampilan responsif | Memudahkan eksplorasi kategori | Menu perlu diuji pada katalog aktual |
| [Glossier](https://www.glossier.com/) | Produk unggulan, product card, CTA add-to-bag | Membantu aksi belanja cepat | CTA cepat harus tetap menghormati pilihan varian |
| [Thesus](https://www.thesusoutdoors.com/) | Kejelasan informasi pengiriman, retur, ukuran | Membangun kepercayaan sebelum pembelian | Jaminan harus sesuai kebijakan toko |
| [Welly](https://www.getwelly.com/) | Identitas warna kuat, CTA jelas | Brand yang mudah diingat | Kontras dan keterbacaan harus dijaga |
| [Klur](https://klur.co/) | Tipografi konsisten, whitespace, visual produk bersih | Pengalaman premium, fokus pada produk | Sesuaikan dengan jumlah SKU |

**Sumber evaluasi inspirasi:**
- Shopify (2026), *25 Best Ecommerce Website Design Examples*: https://www.shopify.com/blog/best-ecommerce-sites
- Shopify, *Best Website Designs: 12 Ecommerce Examples*: https://www.shopify.com/blog/best-website-design
- Shopify, *Small Business Website Design*: https://www.shopify.com/blog/website-design-for-small-business

> Contoh brand adalah inspirasi desain, bukan penetapan peringkat independen berbasis data konversi tiap brand. Situs dapat berubah dari waktu ke waktu.

## 4. Benchmark Marketplace Indonesia: Tokopedia vs Shopee

### Tokopedia — pola navigasi dan discovery

- **Referensi visual:** identitas hijau-putih; pola beranda yang dikenal menonjolkan pencarian, kategori dan modul produk.
- **Adaptasi:** search yang terlihat, pengelompokan kategori yang mudah dipahami, ruang kosong cukup, konteks toko dan penjual.
- **Risiko:** banyak modul di homepage bisa membuat halaman panjang dan mengurangi fokus.
- Situs: https://www.tokopedia.com/

### Shopee — pola promo dan dorongan pembelian

- **Referensi visual:** identitas oranye-putih; pola promosi, voucher, diskon dan penawaran terbatas.
- **Adaptasi:** penawaran yang mudah dipahami, social proof faktual, informasi harga dan diskon jelas, trust badges yang dapat dibuktikan.
- **Risiko:** terlalu banyak banner, badge, notifikasi, dan urgensi palsu menciptakan beban kognitif.
- Situs: https://shopee.co.id/ dan https://shopee.co.id/mall

> Karakterisasi ini merupakan benchmark kualitatif berdasarkan referensi publik, termasuk visual yang mungkin berasal dari versi sebelumnya. Ini bukan verifikasi antarmuka live pada setiap platform dan tidak membuktikan mana yang lebih tinggi konversinya.

### Matriks perbandingan dan keputusan implementasi

| Dimensi | Tokopedia (pola referensi) | Shopee (pola referensi) | Saran implementasi |
|---|---|---|---|
| Visual | Lebih lega dan terstruktur | Lebih promosional dan padat | Ambil struktur Tokopedia; satu aksen CTA dan promo |
| Pencarian | Berorientasi pencarian dan kategori | Pencarian dipadukan dengan kampanye | Sticky search, autocomplete, riwayat pencarian |
| Navigasi kategori | Taksonomi kategori menonjol | Kategori dan shortcut promo/layanan | Maksimum 6–10 kategori unggulan di homepage |
| Product card | Fokus pada keterbacaan dan pilihan | Penekanan harga, diskon, jumlah terjual | Nama 2 baris, harga besar, rating, toko, ongkir |
| Promosi | Banner dan penawaran kontekstual | Voucher, flash sale, deal yang menonjol | Satu hero promo; section deals tersendiri |
| Trust | Konteks penjual dan toko | Shopee Mall dan klaim benefit resmi | Verified seller, kebijakan retur, estimasi pengiriman |
| Checkout | Perlu diuji langsung untuk perbandingan mutakhir | Perlu diuji langsung untuk perbandingan mutakhir | Form ringkas dan transparansi biaya |

**Catatan:** Matriks adalah sintesis desain, bukan hasil A/B test atau skor audit live.

### Prinsip sintesis

1. Gunakan **search, kategori, serta struktur konten yang lega** sebagai dasar.
2. Tambahkan **voucher dan flash deals pada area khusus**, bukan memenuhi seluruh beranda.
3. Tampilkan **rating, ulasan, identitas toko, estimasi kirim, serta kebijakan retur** secara transparan.
4. Pastikan promosi tetap bisa diakses dan tidak menciptakan *dark pattern*.
5. Uji dengan calon pengguna dan katalog yang nyata; jangan menganggap benchmark sebagai hasil usability testing.

## 5. Pilihan Konsep dan Alasan

### Opsi A — Modern Minimalist Commerce (**FONDASI YANG DIPILIH**)
- Tampilan rapi, latar netral, fotografi produk sebagai pusat perhatian.
- Navigasi konsisten, CTA kuat, informasi produk mudah dipindai.
- Fleksibel untuk beragam kategori dengan penyesuaian identitas merek.

### Opsi B — Bold Campaign Commerce
- Visual promosi besar, warna ekspresif, storytelling kampanye.
- Tepat untuk brand dengan koleksi atau kampanye yang kuat.
- Risiko: promosi dan animasi berlebihan dapat mengganggu product finding.

### Opsi C — Dense Marketplace Commerce
- Kepadatan informasi tinggi, banyak kategori, promo dan modul rekomendasi.
- Tepat untuk marketplace besar dengan kebutuhan discovery kompleks.
- Risiko: beban kognitif meningkat untuk toko brand tunggal.

**Keputusan:** gunakan Opsi A sebagai fondasi dan tambahkan elemen marketplace serta smart deals secara selektif sesuai jumlah SKU dan kebutuhan bisnis. Penilaian ini bersifat rekomendasi desain, bukan skor usability empiris.

## 6. Prinsip UX Berbasis Riset

1. **Product discovery lebih penting daripada dekorasi:** navigasi, search, filter, dan sort menentukan apakah pengguna menemukan produk. Baymard mencatat masih banyak masalah usability pada daftar produk dan filter.
2. **Filter harus terlihat dan dapat dikombinasikan:** kategori, harga, ukuran/varian, rating, ketersediaan, dan atribut yang relevan; tampilkan filter aktif dan aksi `Reset`.
3. **Product card informatif:** foto jelas, nama, harga akhir, perbedaan harga sebelum diskon, opsi varian bila relevan, rating yang valid, dan stok hanya jika data akurat.
4. **Product detail membantu keputusan:** galeri beberapa foto, pilihan varian berbentuk tombol, ukuran, pengiriman, retur, ulasan, dan satu CTA primer.
5. **Checkout tanpa hambatan:** utamakan guest checkout, label form jelas, ringkasan biaya transparan, pesan kesalahan spesifik, serta informasi estimasi pengiriman.
6. **Mobile tidak boleh jadi versi desktop yang diperkecil:** desain filter, sticky CTA, area sentuh, dan ritme layar dibuat khusus perangkat kecil.
7. **Aksesibilitas sejak awal:** semantik yang baik, fokus keyboard, label form, kontras memadai, alternatif teks, serta target sentuh nyaman.

**Riset utama:**
- Baymard — Product Lists & Filtering: https://baymard.com/research/ecommerce-product-lists
- Baymard — Product List UX 2025: https://baymard.com/research-articles/current-state-product-list-and-filtering
- Baymard — Checkout UX 2025: https://baymard.com/research-articles/current-state-of-checkout-ux
- Baymard — Mobile App UX Trends 2026: https://baymard.com/research-articles/mobile-app-ux-trends
- NN/g — Search, Filters, and Routing Pages: https://www.nngroup.com/reports/ecommerce-ux-search-including-faceted-search/
- NN/g — Homepages and Category Pages: https://www.nngroup.com/reports/ecommerce-ux-homepages-and-category-pages/
- W3C — WCAG 2.2: https://www.w3.org/TR/WCAG22/

## 7. Struktur Informasi (Sitemap)

```text
Beranda
├── Kategori
│   ├── Subkategori
│   └── Daftar Produk (PLP)
├── Hasil Pencarian
├── Detail Produk (PDP)
│   ├── Galeri Foto
│   ├── Varian dan Jumlah
│   ├── Pengiriman / Retur
│   └── Ulasan
├── Wishlist
├── Keranjang
├── Checkout
│   ├── Kontak dan Alamat
│   ├── Pengiriman
│   ├── Pembayaran
│   └── Konfirmasi
├── Lacak Pesanan
├── Akun (opsional untuk membeli)
└── Bantuan, FAQ, Kebijakan Retur
```

## 8. Spesifikasi Halaman

### Beranda
**Urutan yang disarankan:**
1. Announcement bar tipis (hanya untuk informasi relevan dan benar).
2. Header: logo, search menonjol, kategori, akun, wishlist, keranjang.
3. Hero utama: proposisi nilai + satu CTA `Belanja Sekarang`.
4. Pintasan kategori populer.
5. Best sellers / new arrivals dengan foto dan harga.
6. Value proposition: pembayaran aman, estimasi pengiriman, dukungan/retur.
7. Pilihan editorial / curated collection.
8. Footer: bantuan, kontak, kebijakan, kanal sosial.

### Product Listing Page (PLP)
- Breadcrumb, judul kategori dan jumlah produk.
- Search dalam katalog jika diperlukan.
- Filter desktop sebagai sidebar; di mobile gunakan drawer/bottom sheet dengan tombol `Terapkan` dan `Reset`.
- Sort: relevansi, terbaru, harga termurah, harga tertinggi, dan terlaris jika data tersedia.
- Chip untuk filter aktif; pengguna dapat menghapus per filter.
- Grid rekomendasi: 2 kolom mobile, 3–4 desktop (disesuaikan ukuran).
- Nyatakan kondisi `loading`, tidak ada hasil, dan gagal memuat.

### Product Detail Page (PDP)
- Galeri foto multi-angle, zoom, dan indikasi jumlah foto.
- Nama, harga, status promo, ringkasan nilai produk.
- Varian warna/ukuran sebagai kontrol jelas; stok per varian yang akurat.
- Ukuran/fit guide untuk pakaian atau spesifikasi untuk elektronik.
- CTA primer `Tambah ke Keranjang`; opsi `Beli Sekarang` sebagai sekunder.
- Estimasi ongkir/pengiriman dan informasi retur sebelum checkout.
- Ulasan autentik; tawarkan ringkasan rating bila datanya tersedia.
- Mobile: sticky area aksi di bawah bila tidak menghalangi isi.

### Keranjang
- Item, foto, varian, harga, kuantitas `−/+`, hapus item.
- Subtotal dan indikasi biaya lain dengan teks jelas.
- Kode promo opsional, tidak mendominasi desain.
- CTA `Lanjut ke Checkout`.
- Jangan gunakan countdown kelangkaan palsu atau biaya mendadak.

### Checkout
- Guest checkout tersedia dan mudah ditemukan.
- Alur ringkas: alamat → pengiriman → pembayaran → tinjau/konfirmasi.
- Form dengan autofill yang sesuai, label permanen, validasi inline.
- Opsi pembayaran hanya yang benar-benar didukung sistem (mis. transfer bank/VA, e-wallet, kartu, QRIS sesuai integrasi).
- Total biaya jelas sebelum membayar; rincian ongkir, diskon, dan pajak jika berlaku.
- Status pembayaran dan bukti pesanan mudah ditemukan.

### Tracking & After-sales
- Status pesanan, nomor order, daftar item, alamat ringkas, estimasi dan nomor resi jika ada.
- Bantuan, retur/pengembalian dana, dan kontak customer service.

### Adaptasi khusus marketplace Indonesia

- **Beranda desktop:** header sticky (logo, kategori, pencarian, wishlist, keranjang, akun); satu hero kampanye; 6–10 kategori utama; produk relevan; satu modul deals; brand/toko tepercaya.
- **Beranda mobile:** sticky search dan keranjang; promo ringkas; kategori horizontal; grid produk dua kolom; bottom navigation 4–5 tujuan jika relevan.
- **Kartu produk:** gambar konsisten, nama maksimal dua baris, harga final, harga coret hanya jika valid, rating beserta jumlah ulasan, nama toko/lokasi asal, opsi ongkir dan status verified yang faktual.
- **PDP:** tampilkan diskon/voucher yang berlaku, varian, ketersediaan, informasi penjual dan ulasan, opsi pengiriman serta kebijakan retur; CTA *Tambah ke Keranjang* dan *Beli Sekarang*.
- **Checkout:** alamat, item, kuantitas, pengiriman, voucher, metode pembayaran dan total akhir; boleh ubah data tanpa kehilangan progres; tidak menyembunyikan biaya.

## 9. Design System — Rekomendasi Awal

**Arah visual:** clean, modern, tepercaya; aksen promosi dipisahkan dari warna CTA utama.

| Token | Nilai awal | Penggunaan |
|---|---|---|
| `color.bg` | `#FFFFFF` | Latar utama |
| `color.surface` | `#F7F7F5` | Surface sekunder |
| `color.text` | `#171717` | Teks utama |
| `color.muted` | `#595959` | Teks pendukung |
| `color.primary` | `#155E45` | CTA / identitas |
| `color.promo` | `#F97316` | Aksen diskon/promosi, tidak untuk semua CTA |
| `color.primaryText` | `#FFFFFF` | Teks tombol primer |
| `color.border` | `#DEDEDB` | Garis pembatas |
| `color.error` | `#B42318` | Error (cek kontras untuk penerapan) |
| `radius.card` | `12px` | Kartu |
| `radius.button` | `10px` | Tombol |
| `spacing` | `4, 8, 12, 16, 24, 32, 48, 64px` | Skala jarak |
| `font` | `Inter` atau `Plus Jakarta Sans` | Tipografi UI |

**Catatan aksesibilitas:** verifikasi kombinasi warna nyata terhadap WCAG 2.2, termasuk state hover/disabled/focus. Gunakan minimal target sentuh nyaman (rekomendasi desain 44×44 CSS px), dengan pengecekan kriteria WCAG yang relevan. Jangan mengandalkan warna saja untuk informasi penting.

**Ukuran dan layout awal**:
- Mobile baseline 375–390 px; desain responsif hingga 320 px jika menjadi target.
- Desktop 1280–1440 px, max-width konten ~1200–1280 px.
- Body text 16 px; heading disesuaikan hierarki, line height ~1.4–1.6 untuk teks panjang.
- Layout desktop 12 kolom; mobile 4 kolom secara konseptual.
- Gambar produk konsisten, mis. rasio 4:5 untuk fashion atau 1:1 untuk aksesori; tentukan menurut kategori.

**Adaptasi marketplace:** untuk katalog multi-vendor, tambahkan identitas toko, kota pengiriman, verified seller yang valid, badge ongkir, dan tab khusus promo. Untuk toko satu brand, modul seller bisa dihilangkan. Gunakan hanya satu warna CTA utama; oranye cukup sebagai aksen deal.

## 10. Wireframe Tekstual

### Beranda Desktop
```text
┌──────────────────────────────────────────────────────────────────┐
│ Info layanan / kebijakan                                        │
├──────────────────────────────────────────────────────────────────┤
│ LOGO       KATEGORI     [ Cari produk................ ]   ♡  BAG │
├──────────────────────────────────────────────────────────────────┤
│               FOTO HERO / VALUE PROPOSITION                      │
│             Judul + Subjudul + [ Belanja Sekarang ]               │
├──────────────────────────────────────────────────────────────────┤
│ Kategori:   [A]        [B]        [C]        [D]                 │
├──────────────────────────────────────────────────────────────────┤
│ Best Sellers                                         Lihat Semua │
│ [foto/produk] [foto/produk] [foto/produk] [foto/produk]          │
├──────────────────────────────────────────────────────────────────┤
│ Alasan Berbelanja / Koleksi Pilihan / FAQ / Footer                │
└──────────────────────────────────────────────────────────────────┘
```

### Detail Produk Mobile
```text
┌──────────────────────────────┐
│ ←         Produk         ♡  │
├──────────────────────────────┤
│        FOTO PRODUK           │
│      • ○ ○ ○                 │
├──────────────────────────────┤
│ Nama Produk                  │
│ Rp399.000     ★ 4,8         │
│ Pilih warna: [●] [○] [○]    │
│ Pilih ukuran: [S] [M] [L]   │
│ [Panduan ukuran]             │
│ Pengiriman / Retur           │
│ Detail & Ulasan              │
├──────────────────────────────┤
│ [− 1 +] [Tambah Keranjang]  │
└──────────────────────────────┘
```

## 11. Alur Pengguna Utama

**Browse to purchase:** Beranda → Kategori → Filter/Sort → Detail → Pilih varian → Keranjang → Guest Checkout → Pengiriman → Pembayaran → Konfirmasi.

**Search to purchase:** Search → Suggestions → Hasil → Detail → Checkout.

**Return customer:** Riwayat/Wishlist → Detail → Beli ulang (jika produk tersedia) → Checkout.

**Error recovery:** Search tanpa hasil → saran kata/clear filters; payment error → pesan spesifik dan retry aman tanpa duplikasi order.

## 12. Prioritas Pengerjaan

| Tahap | Fitur | Prioritas |
|---|---|---|
| MVP 1 | Header, navigasi, search, beranda, katalog, PLP | P0 |
| MVP 1 | Filter, sorting, detail produk dan pilihan varian | P0 |
| MVP 1 | Keranjang dan checkout guest | P0 |
| MVP 1 | Estimasi ongkir, total jelas, konfirmasi pesanan | P0 |
| MVP 1 | Responsif, aksesibilitas dasar, loading/empty/error | P0 |
| MVP 2 | Wishlist, review terverifikasi, tracking lengkap | P1 |
| MVP 2 | Rekomendasi produk dan personalisasi berbasis data | P1 |
| Lanjutan | A/B testing, loyalty, rekomendasi canggih | P2 |

## 13. Kriteria Penerimaan UX

- Pengguna dapat mencari barang, menyaring hasil, memilih varian, dan menyelesaikan pembelian tanpa diwajibkan membuat akun.
- Harga akhir serta biaya pengiriman dapat ditinjau sebelum pembayaran.
- Filter aktif terlihat dan dapat dihapus.
- Semua CTA bekerja dengan keyboard dan memiliki label bermakna; state fokus terlihat.
- Form menampilkan kesalahan yang spesifik dan mudah diperbaiki.
- Tampilan tidak overflow horizontal pada viewport yang diuji.
- Pengujian dilakukan dengan produk yang stok/variannya realistis dan data pembayaran sandbox.

## 14. KPI dan Validasi

**KPI awal** (ukur baseline dulu, jangan anggap target generik sebagai janji):
- Search success rate dan zero-result rate.
- Product-list → product-detail click-through rate.
- Product-detail → add-to-cart rate.
- Cart → checkout start rate.
- Checkout completion rate dan alasan gagal bayar.
- Conversion rate berdasarkan channel dan device.
- Core Web Vitals dan metrik aksesibilitas.

**Uji pengguna:** lakukan usability testing pada 5–8 partisipan target untuk iterasi awal (bukan sampel representatif statistik); tugas: cari item tertentu, terapkan filter ganda, temukan ongkir/retur, lakukan checkout, dan lacak order. Ulangi setelah perbaikan; validasi keputusan dengan data perilaku aktual.

## 15. Hal yang Sebaiknya Dihindari

- Slider hero otomatis yang menutupi produk penting.
- Popup diskon sebelum pengunjung memahami penawaran.
- Filter tersembunyi atau tidak dapat digabungkan.
- Product card tanpa harga jelas.
- Tombol beli ambigu saat produk memiliki varian wajib.
- Checkout yang memaksa registrasi.
- Dark pattern: stok palsu, timer palsu, biaya tersembunyi, pre-check add-on.
- Animasi berat yang mengganggu interaksi.

## 16. Kesimpulan dan Rekomendasi Akhir

Pilih **Clean Commerce + Smart Deals — Mobile First**. Pertahankan estetika minimalis dari Allbirds/Klur, navigasi kategori ala Gymshark, CTA produk yang jelas ala Glossier; gabungkan pola pencarian dan informasi penjual dari Tokopedia dengan voucher/promosi kontekstual ala Shopee. Optimalkan discovery, product detail, checkout, dan kinerja sebelum membuat kampanye yang rumit.

**Untuk single-brand store:** tampilkan katalog ringkas dan narasi produk, kurangi modul penjual. **Untuk marketplace multi-vendor:** tambahkan seller rating, verified status, lokasi seller, pilihan ongkir, dan relevansi pencarian. Pilihan final harus diuji melalui usability testing dan KPI produk.

## 17. Referensi dan Sumber

### Panduan usability dan inspirasi desain

1. Baymard Institute. *E-Commerce Product Lists & Filtering UX*. https://baymard.com/research/ecommerce-product-lists
2. Baymard Institute. *Product List UX 2025: 8 Common Pitfalls & Best Practices*. https://baymard.com/research-articles/current-state-product-list-and-filtering
3. Baymard Institute. *Checkout UX 2025: 10 Pitfalls and Best Practices*. https://baymard.com/research-articles/current-state-of-checkout-ux
4. Baymard Institute. *Mobile App UX Trends 2026*. https://baymard.com/research-articles/mobile-app-ux-trends
5. Nielsen Norman Group. *Ecommerce UX: Search, Filters, and Routing Pages*. https://www.nngroup.com/reports/ecommerce-ux-search-including-faceted-search/
6. Nielsen Norman Group. *Ecommerce UX: Homepages, Navigation, and Product Comparisons*. https://www.nngroup.com/reports/ecommerce-ux-homepages-and-category-pages/
7. Shopify. *25 Best Ecommerce Website Design Examples (2026)*. https://www.shopify.com/blog/best-ecommerce-sites
8. Shopify. *Best Website Designs: 12 Ecommerce Examples*. https://www.shopify.com/blog/best-website-design
9. Shopify. *Small Business Website Design*. https://www.shopify.com/blog/website-design-for-small-business
10. W3C. *Web Content Accessibility Guidelines (WCAG) 2.2*. https://www.w3.org/TR/WCAG22/

---
*Dokumen riset dan rekomendasi; tidak mengklaim telah mengaudit seluruh situs atau melakukan usability test mandiri.*

### Referensi Tokopedia, Shopee, dan studi pembanding

1. Shopee Mall (resmi): https://shopee.co.id/mall
2. Shopee Help Center — Shopee Mall: https://help.shopee.co.id/portal/4/article/73221-Apa-kelebihan-berbelanja-di-Shopee-Mall%3F?seo=1
3. Baymard — Ecommerce Search UX: https://baymard.com/research/eCommerce-search
4. Baymard — Product Lists and Filtering: https://baymard.com/research/ecommerce-product-lists
5. Baymard — Checkout Usability: https://baymard.com/research/checkout-usability
6. UGM (2026) — Kajian Shopee dan Tokopedia: https://metsi.ft.ugm.ac.id/2026/09/30/jessica-sugiarto-kaji-perbandingan-kualitas-layanan-dan-usability-shopee-vs-tokopedia-di-jawa-tengah-dan-diy/
7. Studi UEQ (2024): https://e-journals2.unmul.ac.id/index.php/atasi/article/view/1183?articlesBySameAuthorPage=2
8. Jurnal usability (2025): https://jurnal.stkippgritulungagung.ac.id/index.php/jipi/article/view/6742/0

**Rekomendasi akhir:** Jangan menggabungkan semua modul Tokopedia dan Shopee. Ambil kebiasaan yang mempermudah pencarian/keputusan, lalu pilih 1–2 modul promosi yang mendukung bisnis. Validasi final lewat pengujian pada target pengguna dan audit langsung versi produk terbaru.

> Referensi berasal dari kedua dokumen awal. Tautan dan tampilan aktual mungkin berubah. Studi pihak ketiga tidak otomatis membuktikan kinerja versi terbaru aplikasi.

---

*Dokumen gabungan dari dua riset UI/UX e-commerce; dirapikan dan dikonsolidasikan pada 21 Oktober 2026.*
