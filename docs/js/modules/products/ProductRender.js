// docs/js/modules/products/ProductRender.js

import { CartManager } from "../cart/cartManager.js";

const cart = new CartManager();

// Mappage emojis par catégorie ou modèle
const emojiMap = {
  tshirt: "👕",
  hoodie: "🧥",
  classic: "🧵",
  premium: "💎"
};

export async function renderProducts(containerSelector = "#product-list") {
  try {
    const response = await fetch("/data/produits.json");
    const products = await response.json();

    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error("Container introuvable :", containerSelector);
      return;
    }

    container.innerHTML = ""; // Nettoie l'ancien contenu

    products.forEach((product) => {
      const productEl = createProductElement(product);
      container.appendChild(productEl);
    });

  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
  }
}

function createProductElement(product) {
  const wrapper = document.createElement("div");
  wrapper.className = "product-card";

  const emoji = emojiMap[product.category] || emojiMap[product.model] || "🛍️";

  wrapper.innerHTML = `
    <div class="product-image">${emoji}</div>
    <h3 class="product-name">${product.name}</h3>
    <p class="product-price">${product.price.toFixed(2)} $</p>
    <button class="add-to-cart" data-id="${product.id}">Ajouter au panier</button>
  `;

  wrapper.querySelector(".add-to-cart").addEventListener("click", () => {
    cart.addItem(product);
    wrapper.querySelector(".add-to-cart").textContent = "Ajouté ✅";
    setTimeout(() => {
      wrapper.querySelector(".add-to-cart").textContent = "Ajouter au panier";
    }, 1000);
  });

  return wrapper;
}
