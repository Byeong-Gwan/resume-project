import { mountTemplateUrl } from '../utils/dom.js';
// Home Page Component
export class HomePage {
  constructor() {
    this.skills = [
      {
        name: 'JavaScript',
        icon: 'JS',
        description: 'ES6+, DOM 조작, 비동기 처리 및 웹 애플리케이션 개발'
      },
      {
        name: 'Java',
        icon: 'J',
        description: 'Spring Framework, 백엔드 API 개발 및 시스템 구축'
      },
      {
        name: 'VOC 시스템',
        icon: 'V',
        description: '고객 문의 처리, 운영 업무 및 서비스 개선'
      },
      {
        name: '보안 시스템',
        icon: 'S',
        description: '보안4종 프로젝트, 고객 보안 이슈 해결 페이지 개발'
      },
      {
        name: 'Database',
        icon: 'DB',
        description: 'SQL, 데이터 관리 및 운영 업무 지원'
      },
      {
        name: 'HTML/CSS',
        icon: 'H',
        description: '반응형 웹 디자인, 사용자 인터페이스 구현'
      }
    ];

    this.experience = [
      {
        period: '2022 - 현재',
        title: '개발자',
        company: '티월드 (T World)',
        description: 'VOC 시스템 운영 및 고객 서비스 개선 업무를 담당하며, 현재 보안4종 프로젝트를 통해 고객 보안 이슈 해결을 위한 신규 페이지를 개발하고 있습니다.',
        skills: ['Java', 'Spring', 'JavaScript', 'Oracle DB', 'VOC 시스템', '보안']
      },
      {
        period: '2021 - 2022',
        title: '개발자',
        company: '소프트웍스',
        description: '웹 애플리케이션 개발 및 유지보수 업무를 담당했습니다. 사용자 관리 시스템과 데이터 처리 시스템을 구축하며 개발 경험을 쌓았습니다.',
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
