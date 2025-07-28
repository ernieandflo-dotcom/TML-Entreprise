// cartManager.js

const CART_KEY = 'vlm_cart';

export const CartManager = {
  getCart() {
    const raw = localStorage.getItem(CART_KEY);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Erreur de parsing du panier:', e);
      return [];
    }
  },

  saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  },

  addProduct(product) {
    const cart = this.getCart();

    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    this.saveCart(cart);
  },

  removeProduct(productId) {
    const cart = this.getCart().filter(item => item.id !== productId);
    this.saveCart(cart);
  },

  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(p => p.id === productId);
    if (item) {
      item.quantity = quantity;
      this.saveCart(cart);
    }
  },

  clearCart() {
    localStorage.removeItem(CART_KEY);
  },

  getTotalQuantity() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  }
};
