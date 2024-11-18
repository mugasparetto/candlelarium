class SPA {
  constructor() {
    this.appContainer = document.getElementById('app');
    this.currentPage = null;

    this.init();
  }

  async init() {
    // Check initial URL hash
    const initialPage = window.location.hash.slice(1) || 'home';
    await this.navigate(initialPage);
  }

  async loadPage(pageName) {
    try {
      // Load HTML content
      const htmlResponse = await fetch(`./pages/${pageName}/index.html`);
      if (!htmlResponse.ok) throw new Error(`Failed to load ${pageName} HTML`);
      const htmlContent = await htmlResponse.text();

      // Load JavaScript module
      const pageModule = await import(`./pages/${pageName}/index.js`);

      return { htmlContent, pageModule };
    } catch (error) {
      console.error('Error loading page:', error);
      return {
        htmlContent: '<h1>Error</h1><p>Failed to load page content.</p>',
        pageModule: { init: () => {}, cleanup: () => {} },
      };
    }
  }

  async navigate(pageName) {
    // Cleanup current page if needed
    if (this.currentPage?.cleanup) {
      this.currentPage.cleanup();
    }

    // Load new page content and module
    const { htmlContent, pageModule } = await this.loadPage(pageName);

    const fadeDiv = document.querySelector('#fade');

    if (fadeDiv.style.opacity === '0') {
      fadeDiv.style.opacity = 1;
    }

    setTimeout(() => {
      // Update DOM
      this.appContainer.innerHTML = htmlContent;

      fadeDiv.style.opacity = 0;

      // Initialize new page
      if (pageModule.init) {
        pageModule.init();
      }

      // Store current page module
      this.currentPage = pageModule;
    }, 1000);
  }

  handleLinks() {
    // Handle links
    const links = this.appContainer.querySelectorAll('[data-link]');
    links.forEach((link) => {
      link.onclick = (event) => {
        event.preventDefault();

        if (link.dataset.value) {
          domain = link.dataset.value;
        }

        const page = link.dataset.link;
        this.navigate(page);
      };
    });
  }
}

var audioContext = null;
var meter = null;
const CELL_SIZE = 30;
const HEALTH_FACTOR = 32;
const BLOWN_OUT_THRESHOLD = HEALTH_FACTOR * 0.3;
const calibrationBlows = [];
let domain;
let spa;

document.addEventListener('DOMContentLoaded', () => {
  spa = new SPA();

  // monkeypatch Web Audio
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  // grab an audio context
  audioContext = new AudioContext();
});
