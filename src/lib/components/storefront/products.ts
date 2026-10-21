export type Product = {
  id: string;
  name: string;
  variant: string;
  price: number;
  image: string;
  alt: string;
  rating?: { score: number; count: number };
};

// Reference A1 content for the design preview, not live inventory or verified reviews.
export const favorites: Product[] = [
  { id: 'lipstick', name: 'Velvet Matte Lipstick', variant: 'Rose Nude · 6 warna', price: 89000, image: '/images/lipstick.webp', alt: 'Lipstik rose nude dalam kemasan emas dengan tutup di sampingnya.', rating: { score: 4.8, count: 128 } },
  { id: 'cushion', name: 'Lightwear Cushion', variant: 'Natural Beige · 4 shade', price: 159000, image: '/images/cushion.webp', alt: 'Cushion beige terbuka dengan bingkai emas dan puff di sampingnya.', rating: { score: 4.9, count: 96 } },
  { id: 'blush', name: 'Soft Glow Blush', variant: 'Peach Bloom · 3 warna', price: 79000, image: '/images/blush.webp', alt: 'Blush peach dalam compact bulat berwarna emas yang terbuka.', rating: { score: 4.8, count: 84 } },
  { id: 'brow-pencil', name: 'Precision Brow Pencil', variant: 'Dark Brown · 3 warna', price: 59000, image: '/images/brow-pencil.webp', alt: 'Pensil alis cokelat dengan ujung runcing dan sikat spoolie di atas batu krem.', rating: { score: 4.7, count: 72 } }
];

export const newArrivals: Product[] = [
  { id: 'eyeshadow', name: 'Everyday Eyeshadow Palette', variant: 'Warm Neutrals · 9 warna', price: 189000, image: '/images/eyeshadow.webp', alt: 'Palet eyeshadow terbuka berisi sembilan warna netral hangat.' },
  { id: 'mascara', name: 'Lift & Define Mascara', variant: 'Black · 8 ml', price: 99000, image: '/images/mascara.webp', alt: 'Tabung maskara hitam terbuka dengan aplikator sikat di sampingnya.' },
  { id: 'loose-powder', name: 'Silky Loose Powder', variant: 'Translucent · 12 g', price: 119000, image: '/images/loose-powder.webp', alt: 'Bedak tabur beige dalam jar bening dengan tutup perunggu.' },
  { id: 'brush-set', name: 'Essential Brush Set', variant: '5 brush + pouch', price: 149000, image: '/images/brush-set.webp', alt: 'Lima kuas rias bergagang cokelat dengan pouch beige.' }
];
