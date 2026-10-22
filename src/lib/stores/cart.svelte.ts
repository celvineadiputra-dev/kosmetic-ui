import { browser } from '$app/env';
import type { Product, ProductShade } from '#lib/components/storefront/products.js';

export type CartItem = {
  id: string;
  productId: string;
  name: string;
  variant: string;
  shade?: { id: string; name: string; hex: string };
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
};

class CartStore {
  items = $state<CartItem[]>([]);
  isDrawerOpen = $state(false);
  voucherCode = $state('');
  discountPercent = $state(0);

  constructor() {
    if (browser) {
      try {
        const stored = localStorage.getItem('kosmetik_cart');
        if (stored) {
          this.items = JSON.parse(stored);
        }
      } catch {
        // ignore storage errors
      }
    }
  }

  private save() {
    if (browser) {
      try {
        localStorage.setItem('kosmetik_cart', JSON.stringify(this.items));
      } catch {
        // ignore storage errors
      }
    }
  }

  get totalCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get subtotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  get freeShippingThreshold() {
    return 150000;
  }

  get shippingFee() {
    if (this.subtotal === 0 || this.subtotal >= this.freeShippingThreshold) {
      return 0;
    }
    return 18000;
  }

  get discountAmount() {
    return Math.round((this.subtotal * this.discountPercent) / 100);
  }

  get grandTotal() {
    return Math.max(0, this.subtotal - this.discountAmount + this.shippingFee);
  }

  get freeShippingProgress() {
    if (this.subtotal >= this.freeShippingThreshold) return 100;
    return Math.min(100, Math.round((this.subtotal / this.freeShippingThreshold) * 100));
  }

  get remainingForFreeShipping() {
    return Math.max(0, this.freeShippingThreshold - this.subtotal);
  }

  openDrawer() {
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.isDrawerOpen = false;
  }

  addItem(product: Product, shade?: ProductShade | null, quantity = 1) {
    const itemId = `${product.id}-${shade?.id || 'default'}`;
    const existing = this.items.find((item) => item.id === itemId);

    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({
        id: itemId,
        productId: product.id,
        name: product.name,
        variant: product.variant,
        shade: shade ? { id: shade.id, name: shade.name, hex: shade.hex } : undefined,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity
      });
    }

    this.save();
    this.openDrawer();
  }

  updateQuantity(itemId: string, newQty: number) {
    if (newQty <= 0) {
      this.removeItem(itemId);
      return;
    }
    const item = this.items.find((i) => i.id === itemId);
    if (item) {
      item.quantity = Math.min(99, newQty);
      this.save();
    }
  }

  removeItem(itemId: string) {
    this.items = this.items.filter((i) => i.id !== itemId);
    this.save();
  }

  applyVoucher(code: string): { success: boolean; message: string } {
    const normalized = code.trim().toUpperCase();
    if (normalized === 'CANTIK10') {
      this.voucherCode = 'CANTIK10';
      this.discountPercent = 10;
      return { success: true, message: 'Voucher CANTIK10 berhasil digunakan! Diskon 10% diterapkan.' };
    }
    return { success: false, message: 'Kode voucher tidak valid atau telah kadaluarsa.' };
  }

  removeVoucher() {
    this.voucherCode = '';
    this.discountPercent = 0;
  }

  clearCart() {
    this.items = [];
    this.removeVoucher();
    this.save();
  }
}

export const cart = new CartStore();
