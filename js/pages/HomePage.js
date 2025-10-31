import { mountTemplateUrl } from '../utils/dom.js';
// Home Page Component
export class HomePage {
  constructor() {
    this.skills = [
      { name: 'JavaScript/TypeScript', icon: 'JS', description: 'ES3~ES6, TypeScript 기반 프론트엔드 개발' },
      { name: 'Tw.* 모듈', icon: 'Tw', description: 'Tw.Api · Tw.Popup · Tw.CommonHelper · Tw.Navigation 활용' },
      { name: 'BFF(Express)', icon: 'B', description: 'Node.js Express BFF 연동 및 예외 처리' },
      { name: 'Monitoring', icon: 'M', description: 'DataDog · 내부 API 로그 대시보드로 오류 패턴 분석' },
      { name: 'CI/CD & 협업', icon: 'C', description: 'Git · Jenkins · Jira · Confluence · Slack' },
      { name: 'Tools', icon: 'T', description: 'IntelliJ · Chrome DevTools · 접근성/성능 점검' }
    ];

    this.experience = [
      {
        period: '2022.10 - 현재',
        title: 'Front-End Developer',
        company: 'Softworks (SKT T world Front-End Team)',
        description: 'T world 모바일 웹 운영/신규 개발. 예외 처리·대시보드 구축으로 안정성과 가시성 개선(오류 이탈률 -15%, 중복 호출 -20%).',
        skills: ['JavaScript', 'TypeScript', 'Tw.*', 'Express(BFF)', 'DataDog', 'Jenkins']
      },
      {
        period: '2021 - 2022',
        title: 'Developer',
        company: '소프트웍스',
        description: '웹 애플리케이션 개발 및 유지보수. 사용자/데이터 관리 기능 구현.',
        skills: ['Java', 'Spring Boot', 'MySQL', 'JavaScript', 'HTML/CSS']
      }
    ];
  }

  async render() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Update page title
    document.title = '이력서-프로젝트 - Home';

    // Mount external template instead of inline <template>
    await mountTemplateUrl('/templates/pages/home.html', mainContent);

    // Render dynamic sections
    this.renderSkills();
    this.renderExperience();

    // Add scroll animations
    this.initAnimations();
  }

  // getTemplate() no longer needed; using template in index.html

  renderSkills() {
    const skillsGrid = document.getElementById('skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = this.skills.map(skill => `
      <div class="skill-card fade-in">
        <div class="skill-icon">${skill.icon}</div>
        <h3>${skill.name}</h3>
        <p>${skill.description}</p>
      </div>
    `).join('');
  }

  renderExperience() {
    const experienceTimeline = document.getElementById('experience-timeline');
    if (!experienceTimeline) return;

    experienceTimeline.innerHTML = this.experience.map(exp => `
      <div class="experience-item fade-in">
        <div class="experience-card">
          <div class="experience-period">${exp.period}</div>
          <h3 class="experience-title">${exp.title}</h3>
          <div class="experience-company">${exp.company}</div>
          <p class="experience-description">${exp.description}</p>
          <div class="experience-skills">
            ${exp.skills.map(skill => `<span class="experience-skill">${skill}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  initAnimations() {
    // Add staggered animation delay to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add staggered animation delay to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    experienceItems.forEach((item, index) => {
      item.style.animationDelay = `${(index + skillCards.length) * 0.1}s`;
    });

    // Trigger scroll check for animations
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
  }

  cleanup() {
    // Cleanup any event listeners or intervals if needed
  }
}
