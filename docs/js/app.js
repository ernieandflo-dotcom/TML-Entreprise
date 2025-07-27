// js/app.js - GitHub Pages Optimized Version

// Core Modules (using absolute paths for GitHub Pages)
import { CartManager } from '/TML-Entreprise/js/modules/cart/cartManager.js';
import { AuthService } from '/TML-Entreprise/auth/auth.js';

// Web Components (absolute paths with repo name)
import { Header } from '/TML-Entreprise/components/header/header.js';
import { Footer } from '/TML-Entreprise/components/footer/footer.js';

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
    // Register components first
    this.registerComponents();
    
    // Then initialize other features
    await this.initAuth();
    this.setupLegacySupport();
    
    console.log('Application initialized successfully');
  }

  registerComponents() {
    // Components now self-register (defined in their own files)
    console.debug('Components registered automatically');
  }

  async initAuth() {
    try {
      if (typeof this.authService.checkSession === 'function') {
        await this.authService.checkSession();
      }
    } catch (error) {
      console.warn('Auth session check failed:', error);
    }
  }

  setupLegacySupport() {
    window.addEventListener('DOMContentLoaded', () => {
      if (typeof window.legacyMain === 'function') {
        try {
          window.legacyMain({
            cart: this.cartManager,
            auth: this.authService
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
