import { CartManager } from '../cart/cartManager.js';
import { ExportService } from '../../services/ExportService.js';

const cartItemsContainer = document.getElementById('cart-items');
const exportBtn = document.getElementById('export-json');

function renderCart() {
  const cart = CartManager.getCart();

  cartItemsContainer.innerHTML = ''; // reset contenu

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<li>Votre panier est vide.</li>';
    return;
  }

  // Liste des produits dans le panier
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - ${item.quantity} × ${item.price.toFixed(2)} $ = ${(item.quantity * item.price).toFixed(2)} $`;
    cartItemsContainer.appendChild(li);
  });

  // Total général
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalLi = document.createElement('li');
  totalLi.style.fontWeight = 'bold';
  totalLi.textContent = `Total : ${total.toFixed(2)} $`;
  cartItemsContainer.appendChild(totalLi);
}

// Export JSON avec téléchargement
function exportCartAsJson() {
  const cart = CartManager.getCart();
  if (cart.length === 0) {
    alert('Le panier est vide, rien à exporter.');
    return;
  }

  // Générer la commande_TML.json via ExportService
  const commandeJson = ExportService.generateCommandeJson(cart);

  // Créer un blob et déclencher un téléchargement
  const blob = new Blob([JSON.stringify(commandeJson, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `commande_TML_${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

exportBtn.addEventListener('click', exportCartAsJson);

renderCart();
