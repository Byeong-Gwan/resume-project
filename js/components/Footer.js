import { mountTemplateUrl, withBase } from '../utils/dom.js';

// Footer Component
export class Footer {
  async render() {
    const footerElement = document.getElementById('footer');
    if (!footerElement) return;

    // 절대경로 대신 withBase 사용
    await mountTemplateUrl('/templates/components/footer.html', footerElement);
    const yearEl = footerElement.querySelector('#footer-year');
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    this.attachEventListeners();
  }

  attachEventListeners() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const app = window.app;
        const raw = link.getAttribute('data-route') || link.getAttribute('href') || '/';
        const route = raw.startsWith('/') ? raw : `/${raw}`;
        if (app && app.router && typeof app.router.navigate === 'function') {
          e.preventDefault();
          app.router.navigate(withBase(route));  // ← 베이스 포함
        } // else allow default navigation
      });
    });
  }
}
