// Main Application Entry Point
import { Router } from './router.js';
import { Navigation } from './components/Navigation.js';
import { Footer } from './components/Footer.js';
import { HomePage } from './pages/HomePage.js';
import { ProjectsPage } from './pages/ProjectsPage.js';
import { ContactPage } from './pages/ContactPage.js';
import { AboutPage } from './pages/AboutPage.js';

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
    
    // Setup routes
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
            .replace(/\\u002F/g, '/')
            .replace(/\\u003F/g, '?')
            .replace(/\\u0023/g, '#')
        );
        this.router.navigate(decoded.startsWith('/') ? decoded : `/${decoded}`);
        // Clean the query string after navigation
        window.history.replaceState(null, '', decoded);
      } else if (window.location.pathname === '/' || window.location.pathname === '') {
        // Ensure default route is /main
        this.router.navigate('/main');
      }
    } catch (e) {
      // Fallback to default route if URL parsing fails
      if (window.location.pathname === '/' || window.location.pathname === '') {
        this.router.navigate('/main');
      }
    }
    
    // Setup global event listeners
    this.setupGlobalEvents();
    
    // Initialize animations
    this.initAnimations();
  }

  setupRoutes() {
    this.router.addRoute('/main', () => new HomePage());
    this.router.addRoute('/about', () => new AboutPage());
    this.router.addRoute('/projects', () => new ProjectsPage());
    this.router.addRoute('/contact', () => new ContactPage());
  }

  setupGlobalEvents() {
    // Handle navigation clicks
    document.addEventListener('click', (e) => {
      // Global SPA route handler for any element with data-route
      const routeEl = e.target.closest('[data-route]');
      if (routeEl) {
        const pathRaw = routeEl.getAttribute('data-route');
        const path = pathRaw && pathRaw.startsWith('/') ? pathRaw : `/${pathRaw || ''}`;
        if (this.router && typeof this.router.navigate === 'function') {
          e.preventDefault();
          this.router.navigate(path);
          return;
        }
      }

      const navigateBtn = e.target.closest('[data-navigate]');
      if (navigateBtn) {
        e.preventDefault();
        const route = navigateBtn.dataset.navigate;
        this.router.navigate(route === 'home' ? '/main' : `/${route}`);
      }

      // Handle phone button click
      const phoneBtn = e.target.closest('#phone-btn');
      if (phoneBtn) {
        e.preventDefault();
        // Only show contact display on home page
        const currentRoute = window.location.pathname;
        if (currentRoute === '/main') {
          this.showContactDisplay();
          return;
        }
        // If not on home, navigate to home and then show
        this.router.navigate('/main');
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
      nav.classList.remove('active');
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
      phoneItem.classList.add('highlight');
      setTimeout(() => {
        phoneItem.classList.remove('highlight');
      }, 1000);
    }, 300);
  }

  hideContactDisplay() {
    const contactDisplay = document.getElementById('contact-display');
    contactDisplay.style.display = 'none';
    
    // Scroll back to hero section
    document.querySelector('.hero').scrollIntoView({ 
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
