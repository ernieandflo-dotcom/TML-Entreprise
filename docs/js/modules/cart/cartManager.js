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
    const updatedCart = this.getCart().filter(item => item.id !== productId);
    this.saveCart(updatedCart);
  },

  updateQuantity(productId, quantity) {
    const cart = this.getCart();
    const item = cart.find(p => p.id === productId);

    if (item) {
      if (quantity <= 0) {
        this.removeProduct(productId);
      } else {
        item.quantity = quantity;
        this.saveCart(cart);
      }
    }
  },

  clearCart() {
    localStorage.removeItem(CART_KEY);
  },

  getTotalQuantity() {
    return this.getCart().reduce((sum, item) => sum + item.quantity, 0);
  },

  getTotalPrice() {
    return this.getCart().reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + price * item.quantity;
    }, 0);
  }
};
