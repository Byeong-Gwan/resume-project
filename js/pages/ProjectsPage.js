import { mountTemplateUrl } from '../utils/dom.js';
// Projects Page Component
export class ProjectsPage {
  constructor() {
    this.projects = [
      {
        id: 1,
        title: '보안 대시보드(Customer Security Info) 구축',
        description: '분산된 보안 기능(스팸차단, USIM 보호 등)을 단일 대시보드로 통합. 예외 처리 및 Tw.Api 연동 최적화로 VOC 60% 감소, 접근성 40% 개선.',
        category: 'web',
        tags: ['Tw.Api', 'Exception Handling', 'Dashboard', 'Security'],
        image: '🔒',
        features: [
          '보안 데이터 통합 및 단일 UI',
          '비동기 예외 처리 표준화',
          '사용 이력/상태 가시화',
          '운영 지표 대시보드'
        ],
        techStack: ['JavaScript', 'TypeScript', 'Tw.*', 'Express(BFF)'],
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 2,
        title: 'BFF 응답 불일치 대응(안정성 개선)',
        description: '배열→객체 응답 변경으로 인한 forEach 오류 발생. Array.isArray 검증 도입으로 오류율 0% 및 화면 정상화 100% 달성.',
        category: 'web',
        tags: ['BFF', 'Express', 'Error Handling'],
        image: '🧰',
        features: [
          'Array.isArray() 예외 처리',
          '무중단 롤아웃',
          '런북/가이드 정리',
          '회귀 테스트'
        ],
        techStack: ['Node.js', 'Express', 'JavaScript'],
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 3,
        title: '파일 업로드 검증 로직 강화',
        description: '3MB 제한 및 이미지 확장자 필터를 적용하여 대용량/비허용 업로드 이슈 해소. 업로드 오류 0% 달성.',
        category: 'web',
        tags: ['Validation', 'Upload', 'Stability'],
        image: '📤',
        features: [
          'Tw.MAX_UPLOAD_FILE_SIZE(3MB) 적용',
          '이미지 확장자 화이트리스트',
          '에러 메시지 및 UX 개선'
        ],
        techStack: ['JavaScript', 'Tw.*'],
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 4,
        title: '개인 포트폴리오 웹사이트',
        description: 'Vanilla JS로 구현한 반응형 포트폴리오. React 마이그레이션을 고려한 컴포넌트 기반 설계.',
        category: 'ui',
        tags: ['JavaScript', 'HTML', 'CSS'],
        image: '💼',
        features: [
          '컴포넌트 기반 구조',
          'SPA 라우팅',
          '반응형 디자인',
          '부드러운 애니메이션'
        ],
        techStack: ['Vanilla JavaScript', 'HTML5', 'CSS3', 'ES6 Modules'],
        demoUrl: '#',
        githubUrl: '#'
      },
      {
        id: 5,
        title: 'TechBoard (Q&A 게시판)',
        description: 'Spring Boot 3 + PostgreSQL 기반의 질문/답변 게시판. CRUD, Pagination, DTO 검증, Flyway, Docker Compose 구성.',
        category: 'web',
        tags: ['Spring Boot', 'PostgreSQL', 'MyBatis', 'Thymeleaf'],
        image: '🗂️',
        features: [
          'Q&A CRUD 및 페이지네이션',
          '유효성 검증(DTO)',
          'DB 마이그레이션(Flyway)',
          'Docker Compose 로컬 환경'
        ],
        techStack: ['Java 17', 'Spring Boot 3', 'PostgreSQL', 'MyBatis', 'Thymeleaf', 'Docker Compose'],
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
