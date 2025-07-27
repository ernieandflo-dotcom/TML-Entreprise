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
}

// Global error handling
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

// Start the application
new TextilartApp();

