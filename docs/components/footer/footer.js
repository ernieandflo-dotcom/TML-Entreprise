class Footer {
  constructor() {
    this.init();
  }

  init() {
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Client login event
    document.getElementById('client-login-btn')?.addEventListener('click', this.handleLogin);
  }

  handleLogin(e) {
    e.preventDefault();
    // Add your auth logic here
    console.log('Client login clicked');
  }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  if (document.querySelector('[data-component="footer"]')) {
    new Footer();
  }
});