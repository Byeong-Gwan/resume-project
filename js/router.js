// Simple Router for SPA Navigation
export class Router {
  constructor() {
    this.routes = new Map();
    this.currentPage = null;
  }

  addRoute(path, pageFactory) {
    this.routes.set(path, pageFactory);
  }

  init() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
      this.handleRoute();
    });

    // Handle initial route
    this.handleRoute();
  }

  navigate(path) {
    const target = path || '/';
    if (target !== window.location.pathname) {
      history.pushState(null, '', target);
    }
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    // Redirect legacy root path to /main
    if (path === '/' || path === '') {
      this.navigate('/main');
      return;
    }
    console.log('Navigating to:', path);
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
    } else {
      console.log('Route not found, redirecting to home');
      // Fallback to home page
      if (path !== '/main') {
        this.navigate('/main');
      }
    }
  }

  updateNavigation(currentPath) {
    const path = currentPath || '/main';
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const routeAttr = link.getAttribute('data-route');
      const hrefAttr = link.getAttribute('href');
      const linkPath = routeAttr || hrefAttr || '/';
      if (linkPath === path || (path === '/' && linkPath === '/')) {
        link.classList.add('active');
      }
    });
  }
}
