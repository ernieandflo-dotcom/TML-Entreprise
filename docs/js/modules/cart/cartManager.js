export class CartManager {
    constructor() {
      this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }
  
    addItem(item) {
      this.cart.push(item);
      this._save();
    }
  
    _save() {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }