import { Page } from '../Page.js';

export class ResumeCareerPage extends Page {
  constructor() {
    super('resume-career');
    this.title = '김병관 - 경력기술서';
    this.description = '프론트엔드 개발자 김병관의 경력기술서';
  }

  async loadContent() {
    try {
      const response = await fetch(this.getTemplateUrl());
      if (!response.ok) throw new Error('Failed to load career statement template');
      const content = await response.text();
      
      // Load career statement CSS
      this.loadStylesheet('/styles/resume-career.css');
      
      return content;
    } catch (error) {
      console.error('Error loading career statement template:', error);
      return '<div>Error loading career statement</div>';
    }
  }

  getTemplateUrl() {
    return this.getBaseUrl('/templates/pages/resume-career.html');
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
