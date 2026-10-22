import { error } from '@sveltejs/kit';
import { getProductById, getRelatedProducts } from '#lib/components/storefront/products.js';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const product = getProductById(params.id);
  if (!product) {
    throw error(404, `Produk dengan ID "${params.id}" tidak ditemukan.`);
  }

  const relatedProducts = getRelatedProducts(product.id);

  return {
    product,
    relatedProducts
  };
};
