// js/app.js - GitHub Pages-compatible version using relative paths

// Core Modules (relative paths from js/)
import { CartManager } from './modules/cart/cartManager.js';
import { AuthService } from '../auth/auth.js';

// Web Components (relative to js/)
import '../components/header/header.js';
import '../components/footer/footer.js';

class TextilartApp {
  constructor() {
    // Initialize services
    this.cartManager = new CartManager();
    this.authService = new AuthService();

    // Start app
    this.init().catch(error => {
      console.error('App initialization failed:', error);
    });
  }

  async init() {
    // Register custom elements (defined in imported modules)
    this.registerComponents();

    // Initialize authentication logic (e.g. session check)
    await this.initAuth();

    // Optional legacy support
    this.setupLegacySupport();

    // Page-specific logic
    this.initPageFeatures();

    console.log('✅ Application initialized');
  }

  registerComponents() {
    // Custom elements are self-registered inside their own modules
    console.debug('🧩 Components registered (via module side effects)');
  }

  async initAuth() {
    try {
      if (typeof this.authService.checkSession === 'function') {
        await this.authService.checkSession();
      }
    } catch (error) {
      console.warn('⚠️ Auth session check failed:', error);
    }
  }

  setupLegacySupport() {
    window.addEventListener('DOMContentLoaded', () => {
      if (typeof window.legacyMain === 'function') {
        try {
          window.legacyMain({
            cart: this.cartManager,
            auth: this.authService,
          });
        } catch (error) {
          console.error('Legacy init failed:', error);
        }
      }
    });
  }

  initPageFeatures() {
    document.addEventListener('DOMContentLoaded', () => {
      const panierContainer = document.querySelector('[data-cart-items]');
      const totalContainer = document.querySelector('[data-cart-total]');
      const viderBtn = document.querySelector('[data-cart-clear]');

      if (panierContainer) {
        this.renderCartItems(panierContainer, totalContainer);

        if (viderBtn) {
          viderBtn.addEventListener('click', () => {
            this.cartManager.clearCart();
            this.renderCartItems(panierContainer, totalContainer);
          });
        }
      }
    });
  }

  renderCartItems(container, totalContainer) {
    const items = this.cartManager.getItems();
    container.innerHTML = '';

    if (items.length === 0) {
      container.innerHTML = '<p>Votre panier est vide.</p>';
      if (totalContainer) {
        totalContainer.textContent = '0,00 $';
      }
      return;
    }

    let total = 0;

    items.forEach(item => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const itemEl = document.createElement('div');
      itemEl.classList.add('cart-item');
      itemEl.innerHTML = `
        <div class="cart-item__info">
          <strong>${item.name}</strong><br>
          ${item.price.toFixed(2)} $ × ${item.quantity}
        </div>
        <div class="cart-item__total">
          ${(itemTotal).toFixed(2)} $
        </div>
      `;
      container.appendChild(itemEl);
    });

    if (totalContainer) {
      totalContainer.textContent = `${total.toFixed(2)} $`;
    }
  }
}

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

// Start the application
new TextilartApp();
