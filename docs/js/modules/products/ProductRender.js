// docs/js/modules/products/ProductRender.js

// Fonction principale de rendu
export async function renderProducts(containerSelector = "#product-list") {
  try {
    const response = await fetch('/data/produits.json');
    const products = await response.json();

    const container = document.querySelector(containerSelector);
    container.innerHTML = ""; // Nettoie l'ancien contenu

    products.forEach(product => {
      const productEl = createProductElement(product);
      container.appendChild(productEl);
    });

  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
  }
}

// Génère un bloc HTML pour un produit
function createProductElement(product) {
  const wrapper = document.createElement("div");
  wrapper.className = "product";

  wrapper.innerHTML = `
    <h3>${product.nom}</h3>
    <p>${product.description}</p>
    <p><strong>Prix:</strong> ${product.prix} ${product.devise || "$"}</p>
    <button data-id="${product.id}" class="add-to-cart">Ajouter au panier</button>
  `;

  wrapper.querySelector("button.add-to-cart").addEventListener("click", () => {
    addToCart(product);
  });

  return wrapper;
}

// Fonction basique d'ajout au panier (sera remplacée par cartManager plus tard)
function addToCart(product) {
  alert(`Produit ajouté : ${product.nom}`);
  // ➜ Intégration avec cartManager.js viendra ici plus tard
}
