import { Page } from '../Page.js';

export class ResumeModernPage extends Page {
  constructor() {
    super('resume-modern');
    this.title = '김병관 - 모던 이력서';
    this.description = '프론트엔드 개발자 김병관의 모던 이력서';
  }

  async loadContent() {
    try {
      const response = await fetch(this.getTemplateUrl());
      if (!response.ok) throw new Error('Failed to load resume template');
      const content = await response.text();
      
      // Load modern CSS
      this.loadStylesheet('/styles/resume-modern.css');
      
      return content;
    } catch (error) {
      console.error('Error loading resume template:', error);
      return '<div>Error loading resume</div>';
    }
  }

  getTemplateUrl() {
    return this.getBaseUrl('/templates/pages/resume-modern.html');
  }

  loadStylesheet(href) {
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = this.getBaseUrl(href);
      document.head.appendChild(link);
    }
  }

  getBaseUrl(path) {
    // Get the base path from the current URL
    const basePath = window.location.pathname.replace(/\/[^\/]*$/, '');
    return path.startsWith('/') ? `${basePath}${path}` : `${basePath}/${path}`;
  }
}
