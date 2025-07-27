// Must use 'export' to make the class available for import
export class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer style="background:#2c3e50; color:white; padding:1rem; margin-top:2rem">
        <div style="max-width:1200px; margin:0 auto; text-align:center">
          <p>© ${new Date().getFullYear()} Textilart Marchandises Limitée</p>
        </div>
      </footer>
    `;
  }
}

// Optional: Add this if you want to allow dynamic loading
if (!customElements.get('app-footer')) {
  customElements.define('app-footer', Footer);
}
