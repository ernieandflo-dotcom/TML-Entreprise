// Modules
import { CartManager } from './modules/cart/CartManager.js';
import { AuthService } from './services/AuthService.js';

// Components
import { Header } from '../components/header/header.js';
import { Footer } from '../components/footer/footer.js';

class TextilartApp {
  constructor() {
    this.cartManager = new CartManager();
    this.authService = new AuthService();
    this.init();
  }

  async init() {
    // Load components
    this.loadComponents();
    
    // Initialize services
    await this.authService.checkSession();
    
    // Temporary legacy bridge
    this.initLegacyCompatibility();
  }

  loadComponents() {
    // Auto-initialize components when they exist in DOM
    customElements.define('app-header', Header);
    customElements.define('app-footer', Footer);
  }

  initLegacyCompatibility() {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.legacyMain) {
        window.legacyMain({
          cart: this.cartManager,
          auth: this.authService
        });
      }
    });
  }
}

// Start application
new TextilartApp();