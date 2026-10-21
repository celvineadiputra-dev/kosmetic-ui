# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Dasar kerja dari panduan yang ditunjuk pengguna: konsumen B2C di Indonesia yang membeli produk fisik dari katalog multi-kategori.
- Penggunaan mengutamakan ponsel, dengan dukungan desktop dan tablet.
- Segmentasi lebih rinci, kategori barang utama, dan kebutuhan khusus pengguna belum ditentukan atau divalidasi.

## Product Purpose

Memudahkan pengguna menemukan produk, membandingkan pilihan, memahami detail dan ongkir, memilih varian, menyelesaikan pembelian, serta memantau pesanan. Keberhasilan dinilai dari penyelesaian tugas belanja dan hasil bisnis yang diukur, bukan estetika saja.

## Positioning

Panduan menetapkan arah kerja “Clean Commerce + Smart Deals — Mobile First”: discovery yang mudah, informasi pembelian transparan, dan promosi kontekstual. Pembeda bisnis yang unik belum ditentukan; benchmark Tokopedia dan Shopee adalah referensi pola, bukan identitas atau bukti keunggulan produk ini.

## Operating Context

- Pasar awal Indonesia; bahasa antarmuka Indonesia dan mata uang IDR.
- Alur utama: beranda/pencarian → daftar produk → filter dan sortir → detail → pilih varian → keranjang → guest checkout → pengiriman → pembayaran → konfirmasi.
- Pembeli dapat meninjau biaya sebelum pembayaran dan memperbaiki input tanpa kehilangan progres.
- Pembelian tidak mensyaratkan akun. Wishlist, pembelian ulang, dan tracking lengkap termasuk pengembangan berikutnya sesuai panduan.

## Capabilities and Constraints

### Kondisi implementasi saat init

- Proyek menggunakan SvelteKit, Svelte, TypeScript, Tailwind CSS, dan Inter Variable; tersedia perintah Bun untuk development, pemeriksaan Svelte, dan build.
- Halaman utama masih berisi welcome page SvelteKit. Yang sudah dibuat adalah fondasi tema dan gaya komponen opt-in di `src/routes/layout.css`.
- Fitur katalog, keranjang, checkout, pembayaran, dan pelacakan belum diimplementasikan. Jangan menggambarkannya sebagai kemampuan yang sudah tersedia.

### Prioritas dari panduan

- P0: beranda, navigasi, pencarian, katalog, filter/sortir, detail produk, varian, keranjang, guest checkout, estimasi ongkir, total transparan, dan konfirmasi pesanan.
- P0 juga mencakup responsivitas, aksesibilitas, serta kondisi loading, kosong, dan gagal.
- P1: wishlist, ulasan terverifikasi, tracking lengkap, dan rekomendasi berbasis data.
- P2: eksperimen A/B, loyalty, dan personalisasi lanjutan.
- Pembayaran lokal hanya boleh ditampilkan jika integrasinya benar-benar tersedia. Penyedia pembayaran, ongkir, backend, dan deployment belum dipilih.
- Tangani kegagalan pembayaran dengan percobaan ulang yang aman tanpa duplikasi pesanan.
- Asumsi kerja panduan adalah toko B2C multi-kategori, bukan marketplace multi-vendor yang kompleks. Model penjual final masih perlu dikonfirmasi sebelum membangun fitur seller.

## Brand Commitments

- Nama produk, logo toko, dan identitas bisnis belum ditentukan. `my-app` adalah nama paket teknis, bukan merek yang disetujui.
- Pertahankan komitmen tema yang telah disetujui di `src/routes/layout.css`: warna utama hijau dan sekunder biru, seluruh nilai warna menggunakan OKLCH, serta tombol datar tanpa bayangan bawah atau gerakan turun saat ditekan.
- Palet dan geometri dalam panduan e-commerce adalah rekomendasi awal, bukan persetujuan untuk mengganti keputusan tema sebelumnya.
- Referensi pendidikan Notion × Duolingo adalah asal fondasi tema, bukan bukti bahwa produk ini aplikasi belajar. Konteks produk sekarang mengikuti panduan e-commerce yang ditunjuk pengguna.

## Evidence on Hand

- `docs/panduan_lengkap_ui_ux_ecommerce_2026.md`: sumber brief produk, alur, prioritas, dan kriteria UX. Dokumen menyatakan dirinya sebagai sintesis riset dan rekomendasi, bukan audit live menyeluruh atau hasil A/B test.
- `docs/notion-x-duolingo.md` dan `src/routes/layout.css`: referensi tema awal dan implementasi tema saat ini.
- Belum tersedia katalog nyata, foto produk toko, harga, stok, ulasan, data penjualan, kebijakan retur, atau klaim layanan yang dikonfirmasi dalam konteks ini. Jangan mengarang data tersebut sebagai fakta bisnis.
- KPI yang disarankan panduan: keberhasilan pencarian, hasil kosong, perpindahan daftar ke detail, add-to-cart, permulaan dan penyelesaian checkout, kegagalan bayar, konversi per perangkat/channel, serta performa web. Baseline dan target belum tersedia.

## Product Principles

1. Utamakan penemuan produk dan penyelesaian pembelian sebelum dekorasi atau kampanye kompleks.
2. Tampilkan harga akhir, ongkir, syarat promo, dan kebijakan yang berlaku sebelum pengguna berkomitmen membayar.
3. Dasarkan stok, rating, ulasan, status penjual, dan klaim layanan pada data yang dapat dibuktikan; hindari urgensi palsu dan biaya tersembunyi.
4. Jaga perjalanan belanja di ponsel tetap mudah, dengan pemulihan kesalahan yang jelas dan tanpa registrasi wajib.
5. Perlakukan benchmark sebagai hipotesis yang diuji dengan katalog nyata dan calon pengguna, bukan jaminan konversi.

## Accessibility & Inclusion

- Panduan merujuk WCAG 2.2; tingkat konformansi formal belum ditetapkan.
- Gunakan HTML semantik, label permanen, teks alternatif yang sesuai, navigasi keyboard, dan indikator fokus yang terlihat.
- Pastikan kontras memadai dan informasi penting tidak bergantung pada warna saja. Pertahankan dukungan reduced motion.
- Target sentuh direkomendasikan minimal 44 × 44 CSS px. Cegah overflow horizontal pada ukuran layar yang diuji.
- Pesan kesalahan harus spesifik dan dapat ditindaklanjuti; filter aktif dapat dilihat dan dihapus.
