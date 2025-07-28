// docs/js/app.js

import '../components/header/header.js';
import '../components/footer/footer.js';
import { CartManager } from './modules/cart/cartManager.js';

// Sélectionne les produits à afficher (placeholder d’exemple avec emojis)
const sampleProducts = [
  { id: 1, name: 'T-shirt', price: 25, emoji: '👕' },
  { id: 2, name: 'Pantalon', price: 45, emoji: '👖' },
  { id: 3, name: 'Haut', price: 35, emoji: '👚' },
  { id: 4, name: 'Manteau', price: 90, emoji: '🧥' }
];

// Rendu HTML d’un seul produit
function renderProduct(product) {
  const container = document.createElement('div');
  container.className = 'product';

  container.innerHTML = `
    <div class="product-emoji" style="font-size: 3rem">${product.emoji}</div>
    <h3 class="product-name">${product.name}</h3>
    <p class="product-price">${product.price} $</p>
    <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
  `;

  return container;
}

// Met à jour le compteur d’articles dans le panier
function updateCartCount() {
  const count = CartManager.getTotalQuantity();
  const countEl = document.querySelector('#cart-count');
  if (countEl) {
    countEl.textContent = count;
  }
}

// Initialisation de la page produits
function initProductPage() {
  const container = document.querySelector('#product-list');
  if (!container) return;

  container.innerHTML = '';
  sampleProducts.forEach(product => {
    const productEl = renderProduct(product);
    container.appendChild(productEl);
  });

  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
      const productId = parseInt(e.target.dataset.id, 10);
      const product = sampleProducts.find(p => p.id === productId);
      if (product) {
        CartManager.addProduct(product);
        updateCartCount();
      }
    }
  });
}

// Initialisation de l'application (selon la page)
document.addEventListener('DOMContentLoaded', () => {
  initProductPage();
  updateCartCount();
});
