// js/app.js - Updated Version

// Modules
import { CartManager } from './modules/cart/cartManager.js';
import { AuthService } from '../auth/auth.js'; // Updated path to use existing auth.js

// Components
import { Header } from '../components/header/header.js';
import { Footer } from '/components/footer/footer.js';

class TextilartApp {
  constructor() {
    this.cartManager = new CartManager();
    this.authService = new AuthService();
    this.init();
  }

  async init() {
    try {
      // Load and register components
      this.loadComponents();
      
      // Initialize auth session
      await this.initializeAuth();
      
      // Legacy compatibility
      this.initLegacyCompatibility();
      
      console.log('Application initialized successfully');
    } catch (error) {
      console.error('Initialization error:', error);
    }
  }

  loadComponents() {
    // Check if components exist before defining
    if (!customElements.get('app-header') && typeof Header !== 'undefined') {
      customElements.define('app-header', Header);
    }
    
    if (!customElements.get('app-footer') && typeof Footer !== 'undefined') {
      customElements.define('app-footer', Footer);
    }
  }

  async initializeAuth() {
    if (typeof this.authService.checkSession === 'function') {
      await this.authService.checkSession();
    } else {
      console.warn('AuthService.checkSession() not implemented');
    }
  }

  initLegacyCompatibility() {
    if (typeof window.legacyMain === 'function') {
      document.addEventListener('DOMContentLoaded', () => {
        window.legacyMain({
          cart: this.cartManager,
          auth: this.authService
        });
      });
    }
  }
}

// Error handling for module loading
window.addEventListener('error', (event) => {
  console.error('Module loading error:', event.error);
});

// Start application
document.addEventListener('DOMContentLoaded', () => {
  new TextilartApp();
});
