import { mountTemplateUrl } from '../utils/dom.js';
// Projects Page Component
export class ProjectsPage {
  constructor() {
    this.projects = [
      {
        id: 1,
        title: '티월드 보안4종 프로젝트',
        description: '고객 보안 이슈 해결을 위한 신규 페이지 개발 프로젝트입니다. 사용자 친화적인 보안 서비스 인터페이스를 구현했습니다.',
        category: 'web',
        tags: ['Java', 'Spring', 'JavaScript', 'Security'],
        image: '🔒',
        features: [
          '보안 이슈 진단 시스템',
          '실시간 보안 상태 모니터링',
          '사용자 맞춤형 보안 가이드',
          '관리자 대시보드',
          '보안 로그 관리'
        ],
        techStack: ['Java', 'Spring Framework', 'JavaScript', 'HTML/CSS', 'Oracle DB'],
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 2,
        title: '티월드 VOC 시스템 운영',
        description: '고객 문의 및 불만 처리를 위한 VOC 시스템 운영 및 개선 업무를 담당했습니다.',
        category: 'web',
        tags: ['VOC', 'Customer Service', 'Database'],
        image: '📞',
        features: [
          '고객 문의 분류 및 처리',
          '실시간 응답 시스템',
          '통계 및 분석 대시보드',
          '자동 알림 시스템',
          '고객 만족도 조사'
        ],
        techStack: ['Java', 'Spring', 'Oracle DB', 'JavaScript', 'Chart.js'],
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 3,
        title: '소프트웍스 웹 애플리케이션',
        description: '소프트웍스 재직 시 개발한 웹 애플리케이션으로, 사용자 관리 및 데이터 처리 시스템을 구축했습니다.',
        category: 'web',
        tags: ['Java', 'Spring', 'MySQL'],
        image: '💻',
        features: [
          '사용자 권한 관리',
          '데이터 CRUD 시스템',
          '파일 업로드/다운로드',
          '검색 및 필터링',
          '리포트 생성'
        ],
        techStack: ['Java', 'Spring Boot', 'MySQL', 'Thymeleaf', 'Bootstrap'],
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 4,
        title: '개인 포트폴리오 웹사이트',
        description: '순수 JavaScript ES6로 구현한 반응형 포트폴리오 웹사이트입니다. React 마이그레이션을 고려한 컴포넌트 기반 구조로 설계했습니다.',
        category: 'ui',
        tags: ['JavaScript', 'HTML', 'CSS'],
        image: '💼',
        features: [
          '컴포넌트 기반 구조',
          'SPA 라우팅 시스템',
          '반응형 디자인',
          '부드러운 애니메이션',
          '폼 검증 시스템'
        ],
        techStack: ['Vanilla JavaScript', 'HTML5', 'CSS3', 'ES6 Modules'],
        demoUrl: '#',
        githubUrl: '#'
      }
    ];
    
    this.currentFilter = 'all';
    this.modal = null;
  }

  async render() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Update page title
    document.title = '이력서-프로젝트 - Projects';
    // Mount external template-based layout for projects
    await mountTemplateUrl('/templates/pages/projects.html', mainContent);

    // Render projects
    this.renderProjects();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initialize animations
    this.initAnimations();
  }

  renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;

    const source = Array.isArray(this.projects) ? this.projects : [];
    const filteredProjects = this.currentFilter === 'all'
      ? source
      : source.filter(project => project && project.category === this.currentFilter);

    projectsGrid.innerHTML = filteredProjects.map(project => `
      <div class="project-card fade-in" data-category="${project.category}" data-project-id="${project.id}">
        <div class="project-image">
          ${project.image}
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${(project.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <div class="project-links">
            <a href="${project.demoUrl}" class="project-link" target="_blank">
              🔗 데모 보기
            </a>
            <a href="${project.githubUrl}" class="project-link" target="_blank">
              📁 GitHub
            </a>
          </div>
        </div>
      </div>
    `).join('');
  }

  setupEventListeners() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.handleFilterChange(e.target.dataset.filter);
      });
    });

    // Project cards click
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't open modal if clicking on links
        if (e.target.closest('.project-link')) return;
        
        const projectId = parseInt(card.dataset.projectId);
        this.openProjectModal(projectId);
      });
    });

    // Modal close
    const modal = document.getElementById('project-modal');
    if (modal) {
      const modalOverlay = modal.querySelector('.modal-overlay');
      const modalClose = modal.querySelector('.modal-close');

      modalOverlay?.addEventListener('click', () => this.closeProjectModal());
      modalClose?.addEventListener('click', () => this.closeProjectModal());
    }

    // Escape key to close modal
    this.handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        this.closeProjectModal();
      }
    };
    document.addEventListener('keydown', this.handleEscapeKey);
  }

  handleFilterChange(filter) {
    this.currentFilter = filter;
    
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filter);
    });

    // Animate out current projects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
      card.classList.add('hidden');
    });

    // Re-render projects after animation
    setTimeout(() => {
      this.renderProjects();
      this.initAnimations();
    }, 300);
  }

  openProjectModal(projectId) {
    const project = this.projects.find(p => p.id === projectId);
    if (!project) return;

    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
      <div class="modal-header">
        <h2 class="modal-title">${project.title}</h2>
        <p class="modal-subtitle">${project.description}</p>
      </div>
      
      <div class="modal-image">
        ${project.image}
      </div>
      
      <div class="modal-section">
        <h3>주요 기능</h3>
        <ul class="modal-features">
          ${project.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
      </div>
      
      <div class="modal-section">
        <h3>기술 스택</h3>
        <div class="modal-tech-stack">
          ${project.techStack.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
      </div>
      
      <div class="modal-actions">
        <a href="${project.demoUrl}" class="btn btn-primary" target="_blank">데모 보기</a>
        <a href="${project.githubUrl}" class="btn btn-secondary" target="_blank">GitHub</a>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  initAnimations() {
    // Add staggered animation delay to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
      card.classList.remove('hidden');
      card.classList.add('visible');
    });

    // Trigger scroll check for animations
    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 100);
  }

  cleanup() {
    // Close modal if open
    this.closeProjectModal();
    
    // Remove event listeners
    if (this.handleEscapeKey) {
      document.removeEventListener('keydown', this.handleEscapeKey);
    }
  }
}
