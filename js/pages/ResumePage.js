import { mountTemplateUrl } from '../utils/dom.js';

export class ResumePage {
  async render() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    document.title = '이력서-프로젝트 - Resume (1 Page)';
    await mountTemplateUrl('/templates/pages/resume.html', mainContent);

    const btn = document.getElementById('btn-print');
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.print();
      });
    }
  }

  cleanup() {}
}
