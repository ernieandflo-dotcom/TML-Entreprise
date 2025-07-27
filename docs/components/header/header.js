class Header extends HTMLElement {
  constructor() {
    super();
    this.cartCount = null;
  }

  // Called when component is inserted into DOM
  connectedCallback() {
    // Render if not already server-side rendered
    if (!this.innerHTML.trim()) {
      this.render();
    }
    this.init();
  }

  // Optional: Separate render method for clarity
  render() {
    this.innerHTML = `
      <div class="header__container">
        <a href="/" class="header__logo-link">
          <h1 class="header__title">
            <span class="header__logo-text">Textilart</span>
            <span class="header__logo-subtitle">Entreprise</span>
          </h1>
        </a>
        <nav class="header__nav">
          <ul class="header__nav-list">
            <li class="header__nav-item">
              <a href="index.html" class="header__nav-link" data-active="home">
                <i class="fas fa-home header__nav-icon"></i>
                <span class="header__nav-text">Accueil</span>
              </a>
            </li>
            <li class="header__nav-item">
              <a href="panier.html" class="header__nav-link header__cart" data-active="cart">
                <i class="fas fa-shopping-cart header__nav-icon"></i>
                <span class="header__nav-text">Panier</span>
                <span id="cart-count" class="header__cart-count">0</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  }

  init() {
    this.cartCount = this.querySelector('#cart-count');
    this.updateCartCount();
    this.setActiveLink();
    
    // Listen for cart updates
    document.addEventListener('cartUpdated', this.updateCartCount.bind(this));
  }

  updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCount.textContent = total;
  }

  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop();
    this.querySelectorAll('[data-active]').forEach(link => {
      link.classList.toggle('active', 
        (currentPage === 'index.html' && link.dataset.active === 'home') ||
        (currentPage === 'panier.html' && link.dataset.active === 'cart')
      );
    });
  }

  // Cleanup on disconnect
  disconnectedCallback() {
    document.removeEventListener('cartUpdated', this.updateCartCount);
  }
}


// Register the custom element
if (!customElements.get('app-header')) {
  customElements.define('app-header', Header);
}
