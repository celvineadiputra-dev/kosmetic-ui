---
name: Clean Commerce
description: Rapi, profesional, ramah; dokumentasi fondasi visual yang sudah diimplementasikan.
colors:
  primary: oklch(0.747816 0.228938 137.629)
  primary-foreground: oklch(0.204627 0.000000 0.000)
  primary-hover: oklch(0.662373 0.201662 137.242)
  primary-deep: oklch(0.561938 0.169994 136.908)
  primary-soft: oklch(0.958865 0.045363 129.000)
  secondary: oklch(0.718142 0.151340 237.070)
  secondary-foreground: oklch(0.204627 0.000000 0.000)
  background: oklch(1.000000 0.000000 0.000)
  foreground: oklch(0.328942 0.010678 91.659)
  card: oklch(0.985310 0.002856 84.559)
  card-foreground: oklch(0.328942 0.010678 91.659)
  popover: oklch(1.000000 0.000000 0.000)
  muted: oklch(0.952284 0.007000 88.643)
  muted-foreground: oklch(0.528642 0.014648 86.873)
  text-dim: oklch(0.693198 0.015073 88.720)
  border: oklch(0.928125 0.007045 88.645)
  border-strong: oklch(0.867264 0.010089 87.478)
  input: oklch(0.928125 0.007045 88.645)
  ring: oklch(0.561938 0.169994 136.908)
  accent: oklch(0.958865 0.045363 129.000)
  accent-foreground: oklch(0.328942 0.010678 91.659)
  sidebar: oklch(0.985310 0.002856 84.559)
  sidebar-accent: oklch(0.952284 0.007000 88.643)
  xp: oklch(0.718142 0.151340 237.070)
  streak: oklch(0.766908 0.174838 63.065)
  streak-foreground: oklch(0.204627 0.000000 0.000)
  danger: oklch(0.670782 0.216544 25.193)
  danger-foreground: oklch(0.204627 0.000000 0.000)
  background-dark: oklch(0.259585 0.009212 97.702)
  foreground-dark: oklch(0.952284 0.007000 88.643)
  card-dark: oklch(0.306252 0.011325 84.588)
  card-foreground-dark: oklch(0.952284 0.007000 88.643)
  popover-dark: oklch(0.306252 0.011325 84.588)
  muted-dark: oklch(0.306252 0.011325 84.588)
  muted-foreground-dark: oklch(0.771178 0.015093 84.589)
  border-dark: oklch(0.349869 0.014574 84.582)
  border-strong-dark: oklch(0.528642 0.014648 86.873)
  input-dark: oklch(0.528642 0.014648 86.873)
  ring-dark: oklch(0.747816 0.228938 137.629)
  accent-dark: oklch(0.358108 0.053606 135.379)
  accent-foreground-dark: oklch(0.952284 0.007000 88.643)
  sidebar-dark: oklch(0.306252 0.011325 84.588)
  sidebar-accent-dark: oklch(0.349869 0.014574 84.582)
typography:
  display:
    fontFamily: '"Inter Variable", sans-serif'
    fontSize: clamp(1.5rem, 3vw, 2rem)
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.025em
  headline:
    fontFamily: '"Inter Variable", sans-serif'
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: '"Inter Variable", sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: '"Inter Variable", sans-serif'
    fontWeight: 600
  button:
    fontFamily: '"Inter Variable", sans-serif'
    fontWeight: 600
    lineHeight: 1.25rem
    fontSize: 0.875rem
  badge:
    fontFamily: '"Inter Variable", sans-serif'
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1rem
  numeral:
    fontFamily: '"Inter Variable", sans-serif'
    fontWeight: 700
  input:
    fontFamily: '"Inter Variable", sans-serif'
    fontSize: 0.875rem
    lineHeight: 1.25rem
rounded:
  input: 0.5rem
  card: 0.75rem
  button: 0.5rem
  pill: 999px
spacing:
  badge-gap: 0.25rem
  control-gap: 0.5rem
  input-block: 0.375rem
  badge-inline: 0.5rem
  control-block: 0.375rem
  control-inline: 1rem
  card-inset: 1rem
components:
  button-primary:
    backgroundColor: '{colors.primary}'
    textColor: '{colors.primary-foreground}'
    rounded: '{rounded.button}'
    padding: 0.375rem 1rem
    typography: '{typography.button}'
    height: 2.25rem
  button-primary-hover:
    backgroundColor: '{colors.primary-hover}'
  button-secondary:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.button}'
    padding: 0.375rem 1rem
    typography: '{typography.button}'
    height: 2.25rem
  button-secondary-hover:
    backgroundColor: '{colors.muted}'
  card:
    backgroundColor: '{colors.card}'
    textColor: '{colors.card-foreground}'
    rounded: '{rounded.card}'
    padding: 1rem
  input:
    backgroundColor: '{colors.background}'
    textColor: '{colors.foreground}'
    rounded: '{rounded.input}'
    padding: 0.375rem 0.75rem
    typography: '{typography.input}'
    height: 2.25rem
  badge-xp:
    backgroundColor: '{colors.xp}'
    textColor: '{colors.secondary-foreground}'
    rounded: '{rounded.pill}'
    padding: 0.125rem 0.5rem
    typography: '{typography.badge}'
  badge-streak:
    backgroundColor: '{colors.streak}'
    textColor: '{colors.streak-foreground}'
    rounded: '{rounded.pill}'
    padding: 0.125rem 0.5rem
    typography: '{typography.badge}'
  progress:
    backgroundColor: '{colors.muted}'
    height: 0.5rem
    rounded: '{rounded.pill}'
---

# Design System: Clean Commerce

## Overview

**Creative North Star: "Clean Commerce"**

Clean Commerce terasa rapi, profesional, dan ramah: permukaan netral hangat menjaga konten mudah dibaca, sementara hijau daun mengarahkan perhatian ke aksi utama. Biru langit menjadi warna sekunder tanpa mengubah tombol sekunder biasa menjadi bidang biru.

Dokumen ini merekam fondasi CSS saat ini, bukan desain toko yang sudah lengkap. Identitas memakai Inter dan kontrol membulat yang datar; kedalaman berasal dari perbedaan nada dan border. Tema gelap mempertahankan karakter hangat dan warna aksi yang sama.

**Key Characteristics:**
- Hijau daun · Biru langit · Netral hangat.
- Inter Variable dengan hierarki tegas dan teks isi lega.
- Tombol datar; hover berupa perubahan warna, tanpa gerakan tekan.
- Tema terang dan gelap memakai peran warna semantik.

Sumber implementasi: `src/routes/layout.css` dan komponen Svelte button; Inter dimuat dari paket font lokal. Halaman utama masih welcome page. Penyesuaian densitas ini mengikuti permintaan pengguna untuk komponen e-commerce yang lebih ringkas. Pemindaian ini hanya berdasarkan kode, tanpa pemeriksaan browser sesuai permintaan pengguna. Nilai frontmatter adalah normatif; varian `-dark` merekam override `.dark`, bukan kelas baru.

## Colors

### Primary

**Hijau daun**: `primary` dipakai untuk tombol primer, isi progress, dan sidebar-primary. `primary-hover` menggelapkan tombol pada perangkat yang mendukung hover; `primary-deep` juga menjadi warna ring terang. `primary-soft` dan `accent` menyediakan latar hijau lembut; pada tema gelap, `accent-dark` lebih redup sementara `primary-soft` tetap terang.

Teks pada fill hijau memakai `primary-foreground` yang gelap, sesuai keputusan pengguna. Jangan menggantinya dengan putih berdasarkan referensi lama.

### Secondary

**Biru langit**: `secondary` dan alias `xp` berbagi warna. Biru tidak diterapkan pada tombol sekunder biasa: tombol itu memakai latar netral dan border kuat. Alias XP tetap tercatat sebagai peninggalan fondasi awal, bukan fitur e-commerce yang sudah diputuskan.

### Tertiary

**Sinyal kontekstual**: `streak` adalah oranye untuk badge streak yang sudah memiliki primitive CSS; `danger` dan alias destructive adalah merah untuk sinyal bahaya. Tidak ada komponen error terimplementasi yang dapat disimpulkan dari token saja.

### Neutral

**Netral hangat**: background putih, card putih hangat, muted bernada batu lembut, foreground arang, dan border bertingkat. Tema gelap memakai background arang hangat dan card lebih terang dengan teks pucat. Nilai tepat ada di frontmatter; gunakan pasangan tema dan foreground yang sesuai.

Token chart yang belum digunakan komponen tidak dipromosikan menjadi aturan warna kategoris baru. `text-dim` tersedia, tetapi bukan pengganti teks isi yang membutuhkan kontras tinggi.

**The OKLCH Rule.** Semua warna yang ditulis harus menggunakan OKLCH atau merujuk token OKLCH; jangan memperkenalkan palet paralel.

## Typography

Satu keluarga: Inter Variable dengan fallback sans-serif. Font 16px di akar mendasari ukuran rem; body menggunakan line-height 1.5. Heading pertama berukuran fluid 24–32px sesuai token display. Heading h2–h6 memakai bobot 600 dan leading 1.3, dengan ukuran h2 24px, h3 20px, h4 18px, dan h5–h6 16px.

Label, select, dan tombol native memakai bobot 600. Primitive tombol memakai 600; numeral memakai 700 dengan tabular figures. Badge memakai ukuran 12px dengan leading 16px pada semua viewport. Tidak ada keluarga monospace tersendiri.

## Layout

Fondasi menyediakan batas lebar reading (45rem), practice (30rem), shell (73.75rem), dan nav (15rem). Tiga batas konten pertama diekspos sebagai token container Tailwind. Nilai ini belum diterapkan menjadi tata letak halaman; nav belum memiliki implementasi komponen atau perilaku responsif.

Padding kartu 1rem, padding kontrol dan badge mengikuti frontmatter. Densitas UI memakai langkah 4px: kelompok kecil 4–8px dan inset kontrol/kartu 12–16px. Belum ada grid katalog atau ritme section yang diimplementasikan. Pada `pointer: coarse`, tombol dan input memiliki tinggi minimum 44px; tombol juga memiliki lebar minimum 44px. Input memakai font 16px pada perangkat sentuh untuk menghindari zoom otomatis saat fokus. Jangan menganggap rekomendasi layout pada brief sebagai CSS yang sudah terpasang.

## Elevation & Depth

Permukaan dan tombol datar, dipisahkan oleh border atau perubahan nada. Tidak ada bayangan kartu atau tombol. Progress mempertahankan highlight inset di bagian atas isinya; ini bukan bayangan bawah tombol.

Terdapat token warna `modal-shadow`, tetapi belum ada modal atau deklarasi box-shadow modal. Jangan mengarang ukuran blur/elevasi modal dari token warna tersebut. Sidecar hanya merekam highlight yang benar-benar digunakan.

**The Flat Controls Rule.** Tombol tidak memiliki bayangan bawah atau transformasi saat ditekan; pertahankan hover dan fokus yang terlihat.

## Shapes

Sudut tombol dan input ringkas (0.5rem), sedangkan kartu memakai sudut 0.75rem. Badge dan progress berbentuk pill (999px). Border tombol, kartu, dan input 1px. Radius dasar Tailwind 0.75rem dengan turunan berbasis faktor tetap; primitive memakai ukuran eksplisit di frontmatter.

## Components

Fondasi menyediakan kelas CSS opt-in dan komponen Svelte button dengan varian serta ukuran. API dan perilaku button/link tetap dipertahankan. Snippet sidecar memakai kelas berawalan `ds-` dan mempertahankan token CSS host.

### Buttons

Primer: hijau daun, teks gelap, bobot 600, tinggi minimum 2.25rem dan font 14px. Sekunder: latar background, teks foreground, border-strong. Keduanya memakai padding dan radius pada frontmatter. Ukuran komponen Svelte: xs 28px, sm 32px, default 36px, lg 40px; varian icon mengikuti dimensi yang sama. Minimum 44px untuk perangkat sentuh mengesampingkan ukuran ringkas. Label panjang membungkus dan tombol dapat bertambah tinggi. Hover hanya berlaku pada perangkat yang mendukung hover, dengan perubahan warna 120ms ease. Tidak ada active transform atau tactile shadow.

Fokus keyboard menggunakan outline ring 2px dengan offset 2px. Disabled dan aria-disabled mengurangi opacity menjadi 0.5. Primitive CSS memakai cursor not-allowed dan aplikasi perlu menangani aktivasi elemen non-native. Komponen Svelte memblokir pointer saat disabled dan menghapus href/tab stop pada link disabled. Reduced motion menonaktifkan transisi tombol.

### Cards / Containers

Kartu berisi bidang card, teks card-foreground, border tipis, dan padding lega. Hover mengganti latar menjadi muted dan border menjadi border-strong tanpa elevasi. Hover ini tidak berarti kartu otomatis interaktif.

### Inputs / Fields

Input selebar container dengan min-width nol, tinggi minimum 36px, font UI 14px, dan placeholder muted-foreground. Teks input naik ke 16px dan tinggi minimum 44px untuk pointer coarse. Fokus mengubah border serta menambahkan outline ring 2px dengan offset 2px, tanpa glow. Disabled memakai opacity 0.5 dan cursor not-allowed. Validasi/error field belum tersedia.

### Progress

Track muted setinggi 0.5rem dengan clipping pill. Isi memakai primary dan highlight inset 2px. Konsumen menetapkan width dan aria-valuenow dari nilai aplikasi yang sama; gunakan role progressbar dan accessible label. Primitive ini tidak membuktikan adanya alur progress pada toko.

### Badges & Numerals

Badge XP biru langit dan badge streak oranye memakai teks gelap, bobot 600, ukuran 12px, dan gap 4px. Numeral dapat diberi tabular figures dan bobot 700. Kedua badge berasal dari fondasi lama; penggunaannya pada e-commerce memerlukan konteks yang benar, bukan dekorasi atau klaim fitur baru.

## Do's and Don'ts

### Do:
- Do gunakan token semantik sesuai tema, termasuk foreground yang berpasangan dengan fill.
- Do pertahankan Inter, indikator fokus, dan preferensi reduced motion.
- Do gunakan hijau daun untuk aksi utama; tombol sekunder biasa tetap netral.
- Do bedakan komponen yang sudah tersedia dari fitur atau halaman yang belum dibangun.

### Don't:
- Don't mengembalikan bottom shadow atau gerakan turun pada tombol.
- Don't mengganti warna yang sudah disetujui dengan palet rekomendasi awal dokumen e-commerce.
- Don't menganggap token XP/streak sebagai persetujuan menambahkan gamifikasi pada toko.
- Don't menyatakan navigasi, grid katalog, modal, atau komponen error sudah tersedia hanya karena ada rencana atau token terkait.
