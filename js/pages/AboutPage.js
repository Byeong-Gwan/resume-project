import { mountTemplateUrl } from '../utils/dom.js';
// About Page Component
export class AboutPage {
  constructor() {
    this.pageTitle = '소개';
    this.personalInfo = {
      name: '김병관',
      title: '풀스택 개발자',
      experience: '3년차',
      location: '대한민국',
      education: '', // 사용자가 추가할 내용
      interests: [], // 사용자가 추가할 내용
    };
    
    this.aboutSections = [
      {
        id: 'intro',
        title: '안녕하세요!',
        content: '프론트엔드 개발자 김병관입니다.'
        + '주로 JavaScript(ES3, TypeScript), T-World 프로젝트(요금/가입/데이터 모듈)를 운영 및 신규 개발해왔습니다.'+ `<br>`
        + '현재 티월드에서 VOC 시스템과 보안 관련 프로젝트를 진행하며, 고객 서비스 향상에 기여하고 있습니다.', // 사용자가 추가할 내용
        icon: '👋'
      },
      {
        id: 'background',
        title: '배경',
        content: '약 3년간 SK텔레콤 T-World 프로젝트 운영 및 신규 페이지 개발 경험 및 정보처리기사 자격증 보유', // 사용자가 추가할 내용
        icon: '🎓'
      },
      {
        id: 'philosophy',
        title: '개발 철학',
        content: '꾸준한 학습과 기록을 통해 성장한다고 믿습니다. (GitHub 커밋·블로그 정리 습관 갖는 중 입니다.)', // 사용자가 추가할 내용
        icon: '💡'
      },
      {
        id: 'goals',
        title: '목표',
        content: '프론트엔드 심화 역량(React, Next.js)을 강화하기, 함께 성장하기', // 사용자가 추가할 내용
        icon: '🎯'
      }
    ];
    
    this.hobbies = [
      // 사용자가 추가할 취미들
      { name: '독서', icon: '📚' },
      { name: '운동', icon: '🏃‍♂️' },
      { name: '여행', icon: '✈️' },
      { name: '음악', icon: '🎵' }
    ];

    // 프로젝트/성과 하이라이트 (타임라인 외 개별 작업 요약)
    this.highlights = [
      {
        title: '보안 4종 신규 페이지',
        period: '2024',
        description: '고객 보안 이슈 해결을 위한 신규 페이지 UI 설계 및 구현. 접근성/반응형/상태관리 고려해 컴포넌트화.',
        tags: ['JavaScript', 'ES6', '보안', 'UI/UX'],
        link: '#'
      },
      {
        title: 'VOC 시스템 운영/개선',
        period: '2022 - 현재',
        description: 'VOC 흐름 최적화 및 고객 응대 효율 향상 기능 개선. 알림/통계/대시보드 화면 개선.',
        tags: ['Java', 'Spring', 'Oracle DB', '대시보드'],
        link: '#'
      },
      {
        title: '개인 포트폴리오 웹사이트',
        period: '2025',
        description: '바닐라 JS 기반 SPA를 템플릿/로직/스타일로 분리 설계. React/Next 마이그레이션 친화 구조.',
        tags: ['Vanilla JS', 'SPA', 'Templates', 'Next.js 준비'],
        link: 'https://github.com/Byeong-Gwan'
      }
    ];
  }

  async render() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;
    // Mount about template shell from external file
    await mountTemplateUrl('/templates/pages/about.html', mainContent);
    // Inject previous HTML into placeholder
    const mount = document.getElementById('about-dynamic');
    if (mount) {
      mount.innerHTML = this.getInnerHtml();
    }
    this.attachEventListeners();
    this.initAnimations();
  }

  getInnerHtml() {
    return `
      <div class="about-page">
        <!-- Hero Section -->
        <section class="about-hero">
          <div class="container">
            <div class="about-hero-content">
              <div class="about-avatar">
                <div class="avatar-placeholder">
                  <span class="avatar-text">${this.personalInfo.name.charAt(0)}</span>
                </div>
              </div>
              <div class="about-intro">
                <h1 class="about-title">
                  안녕하세요, <span class="highlight">${this.personalInfo.name}</span>입니다
                </h1>
                <p class="about-subtitle">
                  ${this.personalInfo.experience} ${this.personalInfo.title}
                </p>
                <div class="about-meta">
                  <span class="meta-item">
                    <i class="icon">📍</i>
                    ${this.personalInfo.location}
                  </span>
                  <span class="meta-item">
                    <i class="icon">💼</i>
                    ${this.personalInfo.experience} 경력
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- About Sections -->
        <section class="about-content">
          <div class="container">
            <div class="about-grid">
              ${this.aboutSections.map(section => `
                <div class="about-card fade-in" data-section="${section.id}">
                  <div class="card-header">
                    <span class="card-icon">${section.icon}</span>
                    <h3 class="card-title">${section.title}</h3>
                  </div>
                  <div class="card-content">
                    <p class="card-text">
                      ${section.content || '여기에 ' + section.title + ' 관련 내용을 추가해주세요.'}
                    </p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Personal Details -->
        <section class="personal-details">
          <div class="container">
            <h2 class="section-title">개인 정보</h2>
            <div class="details-grid">
              <div class="detail-card fade-in">
                <h3 class="detail-title">
                  <span class="detail-icon">🏆</span>
                  자격증
                </h3>
                <div class="detail-content">
                  <p>정보처리 기사</p>
                </div>
              </div>
              
              <div class="detail-card fade-in">
                <h3 class="detail-title">
                  <span class="detail-icon">🌟</span>
                  관심사
                </h3>
                <div class="detail-content">
                  <div class="hobbies-list">
                    ${this.hobbies.map(hobby => `
                      <span class="hobby-tag">
                        ${hobby.icon} ${hobby.name}
                      </span>
                    `).join('')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Timeline Section -->
        <section class="about-timeline">
          <div class="container">
            <h2 class="section-title">나의 여정</h2>
            <div class="timeline">
              <div class="timeline-item fade-in">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h4 class="timeline-title">현재</h4>
                  <p class="timeline-description">
                  <ul>
                    <li>티월드에서 VOC 시스템과 보안 관련 프로젝트 진행</li>
                    <li>보안 4종 신규 페이지 개발 담당</li>
                  </ul>
                  </p>
                </div>
              </div>
              
              <div class="timeline-item fade-in">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h4 class="timeline-title">과거 경력</h4>
                  <p class="timeline-description">
                    <ul>
                     <li>프론트엔드 개발자로 약 3년간 근무 (JavaScript/TypeScript, ES3, HBS 기반)</li>
                    </ul>
                  </p>
                </div>
              </div>
              
              <div class="timeline-item fade-in">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                  <h4 class="timeline-title">시작</h4>
                  <p class="timeline-description">
                    <ul>
                      <li>2024년 1월</li>
                      <li>비전공자로 시작했으나 꾸준한 학습과 자기 주도적인 프로젝트를 통해 성장</li>
                      <li>모던 자바스크립트 딥다이브 공부</li>
                    </ul>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Project Highlights -->
        <section class="about-highlights">
          <div class="container">
            <h2 class="section-title">프로젝트 하이라이트</h2>
            <div class="details-grid">
              ${this.highlights.map(h => `
                <div class="detail-card fade-in">
                  <h3 class="detail-title">${h.title}</h3>
                  <div class="detail-content">
                    <p class="detail-period">${h.period}</p>
                    <p>${h.description}</p>
                    <div class="project-tags">
                      ${(h.tags || []).map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    ${h.link ? `<a href="${h.link}" class="project-link" target="_blank">🔗 자세히 보기</a>` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </section>

        <!-- Call to Action -->
        <section class="about-cta">
          <div class="container">
            <div class="cta-content">
              <h2 class="cta-title">함께 일하고 싶으시다면</h2>
              <p class="cta-description">
                새로운 프로젝트나 협업 기회에 대해 언제든 연락주세요!
              </p>
              <div class="cta-actions">
                <button class="btn btn-primary" data-navigate="contact">
                  연락하기
                </button>
                <button class="btn btn-secondary" data-navigate="projects">
                  프로젝트 보기
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }

  attachEventListeners() {
    // Add event listeners for navigation buttons
    const navButtons = document.querySelectorAll('[data-navigate]');
    navButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const route = button.dataset.navigate;
        const app = window.app;
        if (app && app.router) {
          app.router.navigate(route === 'home' ? '/main' : `/${route}`);
        }
      });
    });
  }

  initAnimations() {
    // Add fade-in animations to elements
    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(element => {
      element.classList.add('fade-in');
    });

    // Trigger scroll-based animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  }

  cleanup() {
    // Clean up any observers or intervals if needed
  }
}
