// js/app.js - Production Ready Version

// Core Modules
import { CartManager } from '/js/modules/cart/cartManager.js';
import { AuthService } from '/auth/auth.js';

// Web Components
import { Header } from '/components/header/header.js';
import { Footer } from '/components/footer/footer.js';

class TextilartApp {
  constructor() {
    this.cartManager = new CartManager();
    this.authService = new AuthService();
    this.init().catch(console.error);
  }

  async init() {
    this.registerComponents();
    await this.initAuth();
    this.setupLegacySupport();
    console.debug('App initialized');
  }

  registerComponents() {
    try {
      customElements.define('app-header', Header);
      customElements.define('app-footer', Footer);
    } catch (err) {
      console.warn('Component registration error:', err);
    }
  }

  async initAuth() {
    try {
      if (this.authService.checkSession) {
        await this.authService.checkSession();
      }
    } catch (err) {
      console.error('Auth initialization failed:', err);
    }
  }

  setupLegacySupport() {
    window.addEventListener('DOMContentLoaded', () => {
      if (window.legacyMain) {
        try {
          window.legacyMain({
            cart: this.cartManager,
            auth: this.authService
          });
        } catch (err) {
          console.error('Legacy init failed:', err);
        }
      }
    });
  }
}

// Error Handling
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

// Startup
new TextilartApp();
