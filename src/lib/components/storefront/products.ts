export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  date: string;
  shade?: string;
  verified: boolean;
  comment: string;
  helpfulCount?: number;
};

export type ProductShade = {
  id: string;
  name: string;
  hex: string;
};

export type Product = {
  id: string;
  name: string;
  category: 'wajah' | 'bibir' | 'mata' | 'tools';
  variant: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  alt: string;
  rating?: { score: number; count: number };
  badge?: string;
  description: string;
  benefits?: string[];
  howToUse?: string[];
  ingredients?: string;
  bpomNumber?: string;
  shades?: ProductShade[];
  reviews?: ProductReview[];
};

export const favorites: Product[] = [
  {
    id: 'lipstick',
    name: 'Velvet Matte Lipstick',
    category: 'bibir',
    variant: 'Rose Nude · 6 warna',
    price: 89000,
    originalPrice: 119000,
    badge: 'Terlaris',
    image: '/images/lipstick.webp',
    alt: 'Lipstik rose nude dalam kemasan emas dengan tutup di sampingnya.',
    rating: { score: 4.8, count: 128 },
    description: 'Lipstik matte bertekstur velvet lembut yang memberikan warna intens dalam satu usapan tanpa membuat bibir terasa kering. Diperkaya dengan Vitamin E dan Jojoba Oil untuk menjaga kelembapan bibir seharian.',
    benefits: [
      'Formula velvet ringan & transfer-resistant',
      'Melembapkan dengan Vitamin E & Shea Butter',
      'Pigmentasi tinggi dengan hasil akhir soft matte alami',
      'Nyaman dipakai seharian hingga 12 jam'
    ],
    howToUse: [
      'Gunakan lip balm terlebih dahulu jika bibir sedang sangat kering.',
      'Aplikasikan lipstik mulai dari bagian tengah bibir atas mengikuti garis bibir.',
      'Ratakan ke seluruh bibir untuk warna penuh, atau tepuk-tepuk dengan jari untuk efek ombre.'
    ],
    ingredients: 'Dimethicone, Isododecane, Trimethylsiloxysilicate, Polyglyceryl-2 Triisostearate, Tocopherol (Vitamin E), Simmondsia Chinensis (Jojoba) Seed Oil, Butyrospermum Parkii (Shea) Butter, CI 77491, CI 77891, CI 15850.',
    bpomNumber: 'NA18251300941',
    shades: [
      { id: '01', name: 'Rose Nude', hex: '#b76e68' },
      { id: '02', name: 'Berry Chic', hex: '#8a3a46' },
      { id: '03', name: 'Coral Bliss', hex: '#c85e50' },
      { id: '04', name: 'Warm Terracotta', hex: '#9d4c38' },
      { id: '05', name: 'Peachy Peach', hex: '#d98272' },
      { id: '06', name: 'Classic Red', hex: '#991f27' }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Nadia S.',
        rating: 5,
        date: '2 hari yang lalu',
        shade: 'Rose Nude',
        verified: true,
        comment: 'Warnanya cantik banget di kulit sawo matang! Formulanya ringan dan nggak bikin bibir pecah-pecah sama sekali.',
        helpfulCount: 14
      },
      {
        id: 'rev-2',
        author: 'Rina Kartika',
        rating: 5,
        date: '1 minggu yang lalu',
        shade: 'Warm Terracotta',
        verified: true,
        comment: 'Tekstur velvetnya beneran buttery pas dioles. Tahan lama dipakai makan siang ringan masih ada stain-nya.',
        helpfulCount: 9
      },
      {
        id: 'rev-3',
        author: 'Dian Pratiwi',
        rating: 4,
        date: '2 minggu yang lalu',
        shade: 'Coral Bliss',
        verified: true,
        comment: 'Pigmentasinya mantap, packaging mewah terasa kokoh. Cuma pengirimannya agak lama 3 hari, overall produk top!',
        helpfulCount: 3
      }
    ]
  },
  {
    id: 'cushion',
    name: 'Lightwear Cushion',
    category: 'wajah',
    variant: 'Natural Beige · 4 shade',
    price: 159000,
    originalPrice: 199000,
    badge: 'Pilihan Editor',
    image: '/images/cushion.webp',
    alt: 'Cushion beige terbuka dengan bingkai emas dan puff di sampingnya.',
    rating: { score: 4.9, count: 96 },
    description: 'Cushion foundation bertekstur seringan udara dengan daya tutup medium to full yang dapat dibangun (buildable). Memberikan hasil akhir satin glowing alami yang tahan sepanjang hari tanpa cakey, dilengkapi SPF 35 PA+++.',
    benefits: [
      'Perlindungan SPF 35 PA+++ terhadap UVA & UVB',
      'Hasil akhir healthy glow yang tahan minyak hingga 10 jam',
      'Puff tear-drop presisi untuk area sudut mata dan lekuk hidung',
      'Non-comedogenic, teruji klinis untuk kulit sensitif'
    ],
    howToUse: [
      'Tekan puff perlahan pada spons cushion untuk mengambil produk secukupnya.',
      'Tepuk-tepuk lembut ke seluruh permukaan wajah secara merata.',
      'Tambahkan lapisan di area bekas jerawat atau kemerahan untuk coverage ekstra.'
    ],
    ingredients: 'Water, Cyclopentasiloxane, Titanium Dioxide, Ethylhexyl Methoxycinnamate, Niacinamide, Butylene Glycol, Centella Asiatica Extract, Zinc Oxide, Dimethicone, Tocopheryl Acetate.',
    bpomNumber: 'NA18250300482',
    shades: [
      { id: '01', name: 'Light Ivory', hex: '#f0d8c0' },
      { id: '02', name: 'Natural Beige', hex: '#e2c4a4' },
      { id: '03', name: 'Warm Sand', hex: '#cca785' },
      { id: '04', name: 'Golden Tan', hex: '#b98f68' }
    ],
    reviews: [
      {
        id: 'rev-c1',
        author: 'Aulia Rahma',
        rating: 5,
        date: '3 hari yang lalu',
        shade: 'Natural Beige',
        verified: true,
        comment: 'Cushion terenak yang pernah aku coba! Nggak kerasa berat sama sekali, pori-pori auto blur dan glowing sehat.',
        helpfulCount: 21
      },
      {
        id: 'rev-c2',
        author: 'Maya Safitri',
        rating: 5,
        date: '5 hari yang lalu',
        shade: 'Warm Sand',
        verified: true,
        comment: 'Shade Warm Sand pas banget buat warm undertone. Seharian kerja di AC muka tetap lembap dan nggak oxidize.',
        helpfulCount: 11
      }
    ]
  },
  {
    id: 'blush',
    name: 'Soft Glow Blush',
    category: 'wajah',
    variant: 'Peach Bloom · 3 warna',
    price: 79000,
    originalPrice: 99000,
    image: '/images/blush.webp',
    alt: 'Blush peach dalam compact bulat berwarna emas yang terbuka.',
    rating: { score: 4.8, count: 84 },
    description: 'Blush on bertekstur powder mikro-halus yang menyatu alami di pipi. Memberikan rona segar merona dengan pantulan kilau sehat natural sepanjang hari tanpa memperjelas tekstur pori-pori.',
    benefits: [
      'Partikel mikro halus yang mudah dibaurkan dengan jari maupun kuas',
      'Efek kilau natural tanpa glitter kasar',
      'Tahan hingga 8 jam tanpa pudar',
      'Diformulasikan dengan Hyaluronic Acid mikro'
    ],
    howToUse: [
      'Ambil blush dengan kuas lembut, ketuk perlahan untuk membuang sisa bubuk berlebih.',
      'Sapukan pada tulang pipi dengan gerakan memutar ke arah pelipis.',
      'Tambahkan tipis di ujung hidung untuk tampilan sun-kissed segar.'
    ],
    ingredients: 'Talc, Mica, Silica, Dimethicone, Magnesium Stearate, Caprylic/Capric Triglyceride, Sodium Hyaluronate, CI 77491, CI 77891, CI 15850.',
    bpomNumber: 'NA18251200371',
    shades: [
      { id: '01', name: 'Peach Bloom', hex: '#f49e8a' },
      { id: '02', name: 'Rosy Glow', hex: '#e27b88' },
      { id: '03', name: 'Sun-kissed Amber', hex: '#d68364' }
    ],
    reviews: [
      {
        id: 'rev-b1',
        author: 'Siti Hanifah',
        rating: 5,
        date: '4 hari yang lalu',
        shade: 'Peach Bloom',
        verified: true,
        comment: 'Warnanya fresh banget di muka! Bikin wajah kelihatan segar instan walaupun baru bangun tidur.',
        helpfulCount: 7
      }
    ]
  },
  {
    id: 'brow-pencil',
    name: 'Precision Brow Pencil',
    category: 'mata',
    variant: 'Dark Brown · 3 warna',
    price: 59000,
    image: '/images/brow-pencil.webp',
    alt: 'Pensil alis cokelat dengan ujung runcing dan sikat spoolie di atas batu krem.',
    rating: { score: 4.7, count: 72 },
    description: 'Pensil alis mekanik presisi dengan ujung mikro 1.5mm untuk membingkai dan menggambar serat alis helai demi helai. Dilengkapi spoolie lembut untuk meratakan arsiran agar tampak natural.',
    benefits: [
      'Ujung mikro 1.5mm sangat presisi',
      'Formula wax lembut tidak mudah patah',
      'Smudge-proof dan tahan air & keringat',
      'Termasuk spoolie sikat built-in berkualitas'
    ],
    howToUse: [
      'Putar pensil sedikit saja (sekitar 1-2 mm).',
      'Bingkai tipis bagian bawah alis sesuai bentuk alami.',
      'Arsir bagian yang kosong dengan gerakan searah tumbuhnya rambut.',
      'Gunakan spoolie untuk menyikat dan membaurkan warna agar natural.'
    ],
    ingredients: 'Hydrogenated Soybean Oil, Hydrogenated Coco-Glycerides, Zinc Stearate, Copernicia Cerifera (Carnauba) Wax, CI 77499, CI 77491, CI 77492.',
    bpomNumber: 'NA18251200115',
    shades: [
      { id: '01', name: 'Ash Brown', hex: '#63534b' },
      { id: '02', name: 'Dark Brown', hex: '#44342c' },
      { id: '03', name: 'Natural Grey', hex: '#4c4c4c' }
    ],
    reviews: [
      {
        id: 'rev-bp1',
        author: 'Clara Indah',
        rating: 5,
        date: '6 hari yang lalu',
        shade: 'Dark Brown',
        verified: true,
        comment: 'Ujung pensilnya kecil banget jadi gampang bikin helaian alis palsu yang natural. Nggak gampang bleber walau keringetan.',
        helpfulCount: 5
      }
    ]
  }
];

export const newArrivals: Product[] = [
  {
    id: 'eyeshadow',
    name: 'Everyday Eyeshadow Palette',
    category: 'mata',
    variant: 'Warm Neutrals · 9 warna',
    price: 189000,
    originalPrice: 229000,
    badge: 'Baru',
    image: '/images/eyeshadow.webp',
    alt: 'Palet eyeshadow terbuka berisi sembilan warna netral hangat.',
    rating: { score: 4.9, count: 48 },
    description: 'Palet eyeshadow sembilan warna bernuansa netral hangat dengan perpaduan tekstur matte beludru, satin sutra, dan shimmer mikro. Sangat mudah dibaurkan dan minim fall-out untuk riasan harian maupun malam hari.',
    benefits: [
      '9 warna terkurasi sempurna untuk daily makeup & glam look',
      'Pigmentasi tinggi dengan formula buttery smooth',
      'Tahan hingga 14 jam tanpa creasing',
      'Bebas paraben dan cruelty-free'
    ],
    howToUse: [
      'Gunakan shade transisi paling terang ke seluruh kelopak mata.',
      'Baurkan shade medium pada lipatan mata (crease) untuk dimensi.',
      'Tepuk shade shimmer di tengah kelopak mata atau sudut dalam mata.'
    ],
    ingredients: 'Mica, Talc, Magnesium Stearate, Polyethylene, Mineral Oil, Dimethicone, Ethylhexyl Palmitate, Phenoxyethanol, CI 77891, CI 77491, CI 77492, CI 77499.',
    bpomNumber: 'NA18251200612',
    shades: [
      { id: '01', name: 'Warm Neutrals (9 Shades)', hex: '#c79c7d' }
    ],
    reviews: [
      {
        id: 'rev-e1',
        author: 'Vina Febriani',
        rating: 5,
        date: '1 hari yang lalu',
        verified: true,
        comment: 'Palet terbaik! Semua 9 warnanya bener-bener kepake buat ngantor atau kondangan. Shimmer-nya halus mewah banget.',
        helpfulCount: 8
      }
    ]
  },
  {
    id: 'mascara',
    name: 'Lift & Define Mascara',
    category: 'mata',
    variant: 'Black · 8 ml',
    price: 99000,
    badge: 'Waterproof',
    image: '/images/mascara.webp',
    alt: 'Tabung maskara hitam terbuka dengan aplikator sikat di sampingnya.',
    rating: { score: 4.7, count: 62 },
    description: 'Maskara tahan air (waterproof) dan tahan keringat yang mengangkat, melentikkan, dan memisahkan setiap helai bulu mata tanpa menggumpal hingga 24 jam.',
    benefits: [
      'Formula waterproof tahan air, keringat, dan minyak',
      'Sikat melengkung ergonomis menjangkau bulu mata terpendek',
      'Tidak menggumpal (clump-free) dan tidak rontok di bawah mata',
      'Diperkaya Argan Oil untuk merawat bulu mata'
    ],
    howToUse: [
      'Jepit bulu mata dengan penjepit bulu mata terlebih dahulu.',
      'Posisikan sikat di akar bulu mata, lalu gerakkan zig-zag lembut ke arah ujung.',
      'Oleskan lapisan kedua sebelum lapisan pertama kering untuk volume maksimal.'
    ],
    ingredients: 'Isododecane, Polyethylene, Microcrystalline Wax, Dextrin Palmitate, Disteardimonium Hectorite, Argania Spinosa Kernel Oil, CI 77499.',
    bpomNumber: 'NA18251200720',
    shades: [
      { id: '01', name: 'Midnight Black', hex: '#1a1a1a' }
    ],
    reviews: [
      {
        id: 'rev-m1',
        author: 'Putri Maharani',
        rating: 5,
        date: '3 hari yang lalu',
        verified: true,
        comment: 'Bulu mata aku yang lurus dan turun langsung jegrak lentik seharian! Dipakai wudhu berkali-kali nggak luntur sama sekali.',
        helpfulCount: 12
      }
    ]
  },
  {
    id: 'loose-powder',
    name: 'Silky Loose Powder',
    category: 'wajah',
    variant: 'Translucent · 12 g',
    price: 119000,
    originalPrice: 139000,
    image: '/images/loose-powder.webp',
    alt: 'Bedak tabur beige dalam jar bening dengan tutup perunggu.',
    rating: { score: 4.8, count: 54 },
    description: 'Bedak tabur bertekstur mikro-halus (ultra-fine) yang menyamarkan pori-pori dan mengontrol kilap minyak berlebih tanpa mengubah warna foundation atau meninggalkan white cast.',
    benefits: [
      'Zero white cast, cocok untuk semua warna kulit',
      'Menahan minyak (oil-control) hingga 12 jam',
      'Pori-pori dan garis halus tersamarkan seketika',
      'Dilengkapi puff beludru ekstra lembut dan sifter praktis'
    ],
    howToUse: [
      'Balikkan jar perlahan agar bedak keluar di atas sifter mesh.',
      'Ambil bedak dengan puff atau kuas besar, tepuk perlahan ke seluruh wajah.',
      'Fokuskan pada area T-zone (dahi, hidung, dagu) yang cenderung berminyak.'
    ],
    ingredients: 'Corn Starch Modified, Silica, Mica, Dimethicone/Vinyl Dimethicone Crosspolymer, Caprylic/Capric Triglyceride, Phenoxyethanol, CI 77492, CI 77491.',
    bpomNumber: 'NA18250400519',
    shades: [
      { id: '01', name: 'Translucent', hex: '#f2e8dc' },
      { id: '02', name: 'Medium Beige', hex: '#dfcaa8' }
    ],
    reviews: [
      {
        id: 'rev-lp1',
        author: 'Desi Ratnasari',
        rating: 5,
        date: '4 hari yang lalu',
        shade: 'Translucent',
        verified: true,
        comment: 'Partikel bedaknya halus banget kayak asap! Muka langsung matte lembut tanpa dempul. Bagus banget buat baking.',
        helpfulCount: 6
      }
    ]
  },
  {
    id: 'brush-set',
    name: 'Essential Brush Set',
    category: 'tools',
    variant: '5 brush + pouch',
    price: 149000,
    originalPrice: 189000,
    image: '/images/brush-set.webp',
    alt: 'Lima kuas rias bergagang cokelat dengan pouch beige.',
    rating: { score: 4.9, count: 41 },
    description: 'Set lima kuas rias esensial dengan bulu sintetis ultra-lembut berkualitas premium yang tidak mudah rontok, ramah vegan, dan higienis. Dilengkapi travel pouch elegan bernuansa nude beige.',
    benefits: [
      'Termasuk Powder Brush, Foundation Brush, Blending Brush, Eyeshadow Brush & Brow Spoolie',
      'Bulu sintetis sehalus sutra, aman untuk kulit sensitif',
      'Gagang kayu kokoh dengan ferrule aluminium tahan karat',
      'Mudah dibersihkan dan cepat kering'
    ],
    howToUse: [
      'Gunakan kuas besar untuk bedak tabur dan bronzer.',
      'Gunakan kuas pipih untuk foundation atau cushion.',
      'Gunakan kuas kecil untuk mata dan alis sesuai kebutuhan.',
      'Cuci kuas secara berkala dengan sabun pembersih kuas dan keringkan mendatar.'
    ],
    ingredients: 'High-grade Vegan Synthetic Bristles, Solid Wood Handle, Aluminum Ferrule, PU Leather Travel Pouch.',
    bpomNumber: 'AKL11104810239',
    reviews: [
      {
        id: 'rev-bs1',
        author: 'Laras W.',
        rating: 5,
        date: '1 minggu yang lalu',
        verified: true,
        comment: 'Bulunya selembut sutra! Dicuci 3 kali nggak ada bulu rontok sama sekali. Pouch-nya juga estetik banget buat dibawa traveling.',
        helpfulCount: 10
      }
    ]
  }
];

export const allProducts: Product[] = [...favorites, ...newArrivals];

export function getProductById(id: string): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getRelatedProducts(productId: string): Product[] {
  const current = getProductById(productId);
  if (!current) return favorites.slice(0, 4);
  const sameCategory = allProducts.filter((p) => p.id !== productId && p.category === current.category);
  const others = allProducts.filter((p) => p.id !== productId && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, 4);
}
