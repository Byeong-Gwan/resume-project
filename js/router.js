// Simple Router for SPA Navigation (base-path aware)

const BASE = (() => {
  const m = window.location.pathname.match(/^\/[^/]+/); // "/resume-project"
  return m ? m[0] : '';
})();

const norm = (p) => {
  let s = (p || '/').trim();
  s = s.split('?')[0].split('#')[0];
  s = s.replace(/\/+$/, '') || '/';
  return s;
};

const withBase = (p = '/') => {
  const full = p.startsWith('/') ? p : `/${p}`;
  return norm(`${BASE}${full}`);
};

const isBaseRoot = (p) => {
  const s = norm(p);
  return s === '/' || s === norm(BASE);
};

export class Router {
  constructor() {
    this.routes = new Map();
    this.currentPage = null;
  }

  addRoute(path, pageFactory) {
    // 라우트 등록 시에도 정규화
    this.routes.set(norm(path), pageFactory);
  }

  init() {
    window.addEventListener('popstate', () => this.handleRoute());
    this.handleRoute();
  }

  navigate(path) {
    const target = norm(path || '/');
    if (target !== norm(window.location.pathname)) {
      history.pushState(null, '', target);
    }
    this.handleRoute();
  }

  handleRoute() {
    const path = norm(window.location.pathname);

    // 베이스 루트(/ 또는 /resume-project)로 들어오면 홈으로
    if (isBaseRoot(path)) {
      if (path !== withBase('/resume')) {
        this.navigate(withBase('/resume'));
        return;
      }
    }

    // 라우트 찾기
    const pageFactory = this.routes.get(path);

    if (pageFactory) {
      // Cleanup current page
      if (this.currentPage && this.currentPage.cleanup) {
        this.currentPage.cleanup();
      }

      // Create and render new page
      this.currentPage = pageFactory();
      this.currentPage.render();

      // Update navigation active state
      this.updateNavigation(path);

      // Reset scroll position to top after route change
      try {
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
      } catch (e) {}

      const scrollToTop = () => window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // Use rAF to ensure DOM update completed
      if (window.requestAnimationFrame) {
        requestAnimationFrame(scrollToTop);
      } else {
        setTimeout(scrollToTop, 0);
      }

      // Focus main content for accessibility without scrolling
      const main = document.getElementById('main-content');
      if (main) {
        main.setAttribute('tabindex', '-1');
        if (main.focus) {
          try { main.focus({ preventScroll: true }); } catch (e) { main.focus(); }
        }
      }

      // Close mobile nav menu if open
      const navMenu = document.getElementById('nav-menu');
      if (navMenu && navMenu.classList) {
        navMenu.classList.remove('active');
      }
    } else {
      console.warn('Route not found, redirecting to home');
      if (path !== withBase('/resume')) {
        this.navigate(withBase('/resume'));
      }
    }
  }

  updateNavigation(currentPath) {
    const path = norm(currentPath || withBase('/resume'));
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const routeAttr = link.getAttribute('data-route');
      const hrefAttr = link.getAttribute('href');
      const linkPath = norm(routeAttr || hrefAttr || '/');
      // 링크는 /main 같은 짧은 경로일 수 있으므로 베이스 포함 비교
      if (withBase(linkPath) === path) {
        link.classList.add('active');
      }
    });
  }
}
