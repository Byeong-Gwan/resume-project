// Main Application Entry Point
import { Router } from './router.js';
import { Navigation } from './components/Navigation.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { ProjectsPage } from './pages/ProjectsPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { AboutPage } from './pages/AboutPage.js';
import { ResumePage } from './pages/ResumePage.js';

/* ──────────────────────────────────────────────────────────────
   Base path support for GitHub Pages project pages
   e.g. https://byeong-gwan.github.io/resume-project/  => BASE="/resume-project"
   ────────────────────────────────────────────────────────────── */
const BASE = (() => {
  // 첫 번째 경로 세그먼트만 추출: "/resume-project"
  const m = window.location.pathname.match(/^\/[^/]+/);
  return m ? m[0] : '';
})();
const withBase = (p = '/') => {
  // '/xxx' 형태로 정규화 후 BASE 접두
  const full = p.startsWith('/') ? p : `/${p}`;
  const joined = `${BASE}${full}`;
  // 끝 슬래시 정리(루트는 그대로)
  return joined === '' ? '/' : joined.replace(/\/+$/, '') || '/';
};
const isAtBaseRoot = () => {
  const p = window.location.pathname;
  return p === '/' || p === '' || p === BASE || p === `${BASE}/`;
};

class App {
  constructor() {
    this.router = new Router();
    this.navigation = new Navigation();
    this.footer = new Footer();
    this.init();
  }

  init() {
    // Initialize components
    this.navigation.render();
    this.footer.render();

    // Setup routes (반드시 BASE 포함)
    this.setupRoutes();

    // Initialize router
    this.router.init();

    // Handle GitHub Pages redirect param ?p=... (from 404.html) for SPA routing
    try {
      const url = new URL(window.location.href);
      const p = url.searchParams.get('p');
      if (p) {
        // Decode escaped characters and navigate
        const decoded = decodeURIComponent(
            p
                .replace(/\u002F/g, '/')
                .replace(/\u003F/g, '?')
                .replace(/\u0023/g, '#')
        );
        // ✅ p가 "/resume-project/..."처럼 베이스를 포함하면 베이스 제거
        const clean = decoded.startsWith(BASE) ? decoded.slice(BASE.length) || '/' : decoded;
        const target = clean.startsWith('/') ? clean : `/${clean}`;
        this.router.navigate(withBase(target));
        // Clean the query string after navigation
        window.history.replaceState(null, '', withBase(target));
      } else if (isAtBaseRoot()) {
        // Ensure default route is /resume (BASE 포함)
        this.router.navigate(withBase('/resume'));
      }
    } catch (e) {
      // Fallback to default route if URL parsing fails
      if (isAtBaseRoot()) {
        this.router.navigate(withBase('/resume'));
      }
    }

    // Setup global event listeners
    this.setupGlobalEvents();

    // Initialize animations
    this.initAnimations();
  }

  setupRoutes() {
    // 라우트 등록 시 절대 경로 앞에 BASE를 붙여줌
    this.router.addRoute(withBase('/resume'),   () => new ResumePage());
    this.router.addRoute(withBase('/main'),     () => new HomePage());
    this.router.addRoute(withBase('/about'),    () => new AboutPage());
    this.router.addRoute(withBase('/projects'), () => new ProjectsPage());
    this.router.addRoute(withBase('/contact'),  () => new ContactPage());
  }

  setupGlobalEvents() {
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      // Global SPA route handler for any element with data-route
      const routeEl = e.target.closest('[data-route]');
      if (routeEl) {
        const pathRaw = routeEl.getAttribute('data-route'); // e.g. "main" or "/main"
        const path = pathRaw && pathRaw.startsWith('/') ? pathRaw : `/${pathRaw || ''}`;
        if (this.router && typeof this.router.navigate === 'function') {
          e.preventDefault();
          this.router.navigate(withBase(path));
          return;
        }
      }

      const navigateBtn = e.target.closest('[data-navigate]');
      if (navigateBtn) {
        e.preventDefault();
        const route = navigateBtn.dataset.navigate; // 'home' | 'about' | 'projects' | 'contact'
        const target = route === 'home' ? '/main' : `/${route}`;
        this.router.navigate(withBase(target));
      }

      // Handle phone button click
      const phoneBtn = e.target.closest('#phone-btn');
      if (phoneBtn) {
        e.preventDefault();
        // Only show contact display on home page
        const currentRoute = window.location.pathname;
        if (currentRoute === withBase('/main')) {
          this.showContactDisplay();
          return;
        }
        // If not on home, navigate to home and then show
        this.router.navigate(withBase('/main'));
        setTimeout(() => this.showContactDisplay(), 200);
      }

      // Handle copy button clicks
      const copyBtn = e.target.closest('.copy-btn');
      if (copyBtn) {
        e.preventDefault();
        this.handleCopyClick(copyBtn);
      }

      // Handle action button clicks
      const actionBtn = e.target.closest('.action-btn');
      if (actionBtn) {
        e.preventDefault();
        this.handleActionClick(actionBtn);
      }

      // Handle close contact display
      const closeBtn = e.target.closest('#close-contact');
      if (closeBtn) {
        e.preventDefault();
        this.hideContactDisplay();
      }
    });

    // Handle scroll animations
    window.addEventListener('scroll', this.handleScroll.bind(this));

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  handleScroll() {
    // Animate elements on scroll
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('visible');
      }
    });

    // Update navigation background
    const nav = document.getElementById('navigation');
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  }

  handleResize() {
    // Handle responsive behavior
    const nav = document.querySelector('.nav-menu');
    if (window.innerWidth > 768) {
      nav?.classList.remove('active');
    }
  }

  showContactDisplay() {
    const contactDisplay = document.getElementById('contact-display');
    if (!contactDisplay) {
      console.warn('Contact display element not found');
      return;
    }

    contactDisplay.style.display = 'block';

    // Smooth scroll to contact section
    contactDisplay.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Highlight phone number item
    setTimeout(() => {
      const phoneItem = contactDisplay.querySelector('.contact-item:first-child');
      phoneItem?.classList.add('highlight');
      setTimeout(() => {
        phoneItem?.classList.remove('highlight');
      }, 1000);
    }, 300);
  }

  hideContactDisplay() {
    const contactDisplay = document.getElementById('contact-display');
    if (contactDisplay) contactDisplay.style.display = 'none';

    // Scroll back to hero section
    document.querySelector('.hero')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  handleActionClick(button) {
    if (button.classList.contains('call-btn')) {
      // Handle phone call
      const phoneNumber = button.dataset.phone;
      window.location.href = `tel:${phoneNumber}`;
    } else if (button.classList.contains('email-btn')) {
      // Handle email compose
      const email = button.dataset.email;
      window.location.href = `mailto:${email}`;
    } else if (button.classList.contains('github-btn')) {
      // Handle GitHub link
      const url = button.dataset.url;
      window.open(url, '_blank');
    }
  }

  handleCopyClick(button) {
    const textToCopy = button.dataset.copy;
    const originalText = button.textContent;

    // Copy to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Show success feedback
      button.textContent = '복사됨!';
      button.classList.add('copied');

      // Reset after 2 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    }).catch(() => {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      // Show success feedback
      button.textContent = '복사됨!';
      button.classList.add('copied');

      // Reset after 2 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    });
  }

  initAnimations() {
    // Add fade-in class to elements that should animate
    const animatedElements = document.querySelectorAll('.card, .skill-card, .project-card, .contact-item');
    animatedElements.forEach(element => {
      element.classList.add('fade-in');
    });

    // Trigger initial scroll check
    this.handleScroll();
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
