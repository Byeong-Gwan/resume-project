import { mountTemplateUrl } from '../utils/dom.js';
// Navigation Component
export class Navigation {
  constructor() {
    this.isMenuOpen = false;
  }

  async render() {
    const navElement = document.getElementById('navigation');
    if (!navElement) return;
    // Mount external template
    await mountTemplateUrl('/templates/components/navigation.html', navElement);
    this.attachEventListeners();
  }

  attachEventListeners() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-item a, .nav-logo');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const app = window.app;
        const raw = link.getAttribute('data-route') || link.getAttribute('href') || '/';
        const route = raw.startsWith('/') ? raw : `/${raw}`;
        if (app && app.router && typeof app.router.navigate === 'function') {
          e.preventDefault();
          app.router.navigate(route);
        } // else allow default navigation
        this.closeMenu();
      });

      // Keyboard accessibility for logo acting as button
      if (link.classList.contains('nav-logo')) {
        link.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const app = window.app;
            if (app && app.router && typeof app.router.navigate === 'function') {
              app.router.navigate('/main');
            }
            this.closeMenu();
          }
        });
      }
    });

    // Handle mobile menu toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        this.toggleMenu();
      });

      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
          this.closeMenu();
        }
      });
    }
  }

  toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    this.isMenuOpen = !this.isMenuOpen;
    
    if (this.isMenuOpen) {
      navMenu.classList.add('active');
      navToggle.innerHTML = '✕';
    } else {
      navMenu.classList.remove('active');
      navToggle.innerHTML = '☰';
    }
  }

  closeMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    this.isMenuOpen = false;
    navMenu.classList.remove('active');
    navToggle.innerHTML = '☰';
  }
}
