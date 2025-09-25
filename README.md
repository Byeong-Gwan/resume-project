# 김병관 포트폴리오 웹사이트 📋

> 바닐라 JavaScript ES6로 구축된 모던 포트폴리오 웹사이트  
> React/Next.js 마이그레이션을 위한 컴포넌트 기반 아키텍처 설계

## 🚀 프로젝트 개요

3년차 풀스택 개발자 김병관의 개인 포트폴리오 웹사이트입니다. 현대적인 웹 기술을 활용하여 사용자 친화적인 인터페이스와 반응형 디자인을 구현했습니다.

## ✨ 주요 기능

### 🏠 홈페이지
- **히어로 섹션**: 개인 소개 및 주요 액션 버튼
- **스킬 카드**: 기술 스택 시각화
- **경력 타임라인**: 시간순 경력 표시
- **코드 애니메이션**: 동적 시각 효과

### 📱 인터랙티브 연락처 시스템
- **스마트 연락하기 버튼**: 클릭 시 연락처 카드 표시
- **모바일 최적화 기능**:
  - 📞 **전화 걸기**: `tel:` 프로토콜로 직접 통화 연결
  - ✉️ **이메일 작성**: `mailto:` 프로토콜로 기본 메일 앱 실행
  - 🔗 **GitHub 방문**: 새 탭에서 GitHub 프로필 열기
- **클립보드 복사**: 모든 연락처 정보 원클릭 복사
- **시각적 피드백**: 애니메이션과 상태 표시

### 🎨 디자인 시스템
- **모던 UI/UX**: 그라데이션, 그림자, 호버 효과
- **반응형 디자인**: 모바일 퍼스트 접근법
- **애니메이션**: 부드러운 전환 효과 및 스크롤 애니메이션
- **접근성**: 시맨틱 HTML 및 키보드 네비게이션

### 🔧 기술적 특징
- **SPA 라우팅**: 클라이언트 사이드 네비게이션
- **컴포넌트 기반**: React 패턴을 모방한 모듈 구조
- **ES6+ 문법**: 클래스, 모듈, async/await 활용
- **CSS 변수**: 일관된 디자인 토큰 시스템

## 🛠 기술 스택

### Frontend
- **JavaScript**: ES6+ (Classes, Modules, Arrow Functions)
- **HTML5**: 시맨틱 마크업
- **CSS3**: Grid, Flexbox, Custom Properties, Animations

### 개발 도구
- **Live Server**: 개발 서버 및 핫 리로드
- **NPM**: 패키지 관리 및 스크립트 실행

## 📁 프로젝트 구조

```
이력서-프로젝트/
├── 📄 index.html              # 메인 HTML 파일
├── 📁 js/
│   ├── 🚀 app.js              # 메인 애플리케이션 엔트리
│   ├── 🛣️ router.js           # SPA 라우터 시스템
│   ├── 📁 components/         # 재사용 컴포넌트
│   │   ├── Navigation.js      # 네비게이션 바
│   │   └── Footer.js          # 푸터
│   └── 📁 pages/              # 페이지 컴포넌트
│       ├── HomePage.js        # 홈페이지 로직
│       ├── ProjectsPage.js    # 프로젝트 페이지
│       └── ContactPage.js     # 연락처 페이지
├── 📁 styles/
│   ├── 🎨 global.css          # 전역 스타일 & CSS 변수
│   ├── 🏠 home.css            # 홈페이지 전용 스타일
│   ├── 💼 projects.css        # 프로젝트 페이지 스타일
│   └── 📧 contact.css         # 연락처 페이지 스타일
├── 📦 package.json            # 프로젝트 설정 & 의존성
└── 📋 README.md               # 프로젝트 문서
```

## 🚀 설치 및 실행

### 1. 저장소 클론
```bash
git clone <repository-url>
cd 이력서-프로젝트
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
# 또는
npm start
```

### 4. 브라우저 접속
```
http://localhost:3000
```

## 📱 모바일 기능 테스트

모바일 디바이스에서 다음 기능들을 테스트할 수 있습니다:

1. **전화 걸기**: "📞 통화" 버튼 클릭 → 전화 앱 실행
2. **이메일 작성**: "✉️ 메일" 버튼 클릭 → 기본 메일 앱 실행  
3. **GitHub 방문**: "🔗 방문" 버튼 클릭 → 브라우저에서 새 탭 열기
4. **복사 기능**: "복사" 버튼으로 클립보드에 정보 저장

## 🏗️ 아키텍처 설명

### 컴포넌트 기반 구조
이 프로젝트는 React의 컴포넌트 패턴을 모방하여 설계되었습니다:

```javascript
// 메인 애플리케이션
class App {
  constructor() {
    this.router = new Router();
    this.navigation = new Navigation();
    this.footer = new Footer();
  }
  
  // 연락처 기능
  showContactDisplay() {
    // 연락처 카드 표시 및 스크롤
  }
  
  handleActionClick(button) {
    // 모바일 액션 처리 (전화, 이메일, GitHub)
  }
}
```

### 주요 기능 구현

**연락처 시스템**:
- 전화: `tel:` 프로토콜 사용
- 이메일: `mailto:` 프로토콜 사용  
- GitHub: `window.open()` 새 탭 열기
- 복사: Clipboard API + 폴백 지원

## 🎯 React/Next.js 마이그레이션 계획

### 현재 아키텍처의 마이그레이션 준비 상태

✅ **준비 완료된 요소들**:
- **컴포넌트 기반 구조**: 각 JS 파일이 React 컴포넌트로 쉽게 변환 가능
- **모듈화된 CSS**: CSS 모듈 또는 Styled Components로 마이그레이션 용이
- **라우터 시스템**: Next.js App Router 또는 React Router로 전환 가능
- **ES6+ 문법**: 최신 JavaScript 문법으로 React와 호환성 우수
- **상태 관리 패턴**: 클래스 기반 상태 관리로 React Hooks 전환 준비

### 마이그레이션 로드맵

#### Phase 1: React 기본 전환
```bash
# 1. Next.js 프로젝트 생성
npx create-next-app@latest portfolio-nextjs --typescript --tailwind --app

# 2. 컴포넌트 변환 순서
components/Navigation.js → components/Navigation.tsx
components/Footer.js → components/Footer.tsx
pages/HomePage.js → app/page.tsx
pages/ProjectsPage.js → app/projects/page.tsx
pages/ContactPage.js → app/contact/page.tsx
```

#### Phase 2: 스타일링 현대화
- **CSS Modules** 또는 **Tailwind CSS** 도입
- **Framer Motion**으로 애니메이션 업그레이드
- **CSS-in-JS** (Styled Components/Emotion) 적용

#### Phase 3: 기능 확장
- **TypeScript** 완전 적용
- **React Query/SWR** 데이터 페칭
- **Zustand/Redux Toolkit** 상태 관리
- **React Hook Form** 폼 관리

#### Phase 4: 성능 최적화
- **Image Optimization** (Next.js Image)
- **SEO 최적화** (Meta tags, Sitemap)
- **PWA 기능** 추가
- **Analytics** 통합

### 예상 변환 예시

**현재 (Vanilla JS)**:
```javascript
class HomePage {
  constructor() {
    this.skills = [...];
    this.experience = [...];
  }
  
  render() {
    // DOM 조작 코드
  }
}
```

**변환 후 (React/Next.js)**:
```tsx
'use client';

interface HomePageProps {
  skills: Skill[];
  experience: Experience[];
}

export default function HomePage({ skills, experience }: HomePageProps) {
  const [contactVisible, setContactVisible] = useState(false);
  
  return (
    <div className="home-page">
      {/* JSX 컴포넌트 */}
    </div>
  );
}
```

## 🔧 개발 스크립트

```json
{
  "scripts": {
    "start": "npx live-server --port=3000 --open=/",
    "dev": "npx live-server --port=3000 --open=/ --watch=.",
    "build": "echo 'No build process needed for vanilla JS'",
    "test": "echo 'No tests specified'"
  }
}
```

## 🎨 스타일링 시스템

### CSS 변수 시스템
```css
:root {
  --primary-color: #6366f1;
  --accent-color: #8b5cf6;
  --text-primary: #1e293b;
  --background: #ffffff;
  --spacing-md: 1rem;
  --radius-lg: 0.75rem;
}
```

### 반응형 디자인
- **Mobile First**: 모바일 우선 설계
- **Breakpoints**: 480px, 768px, 1024px
- **Touch Friendly**: 터치 인터페이스 최적화

## 🚀 배포 가이드

### 정적 호스팅 옵션
- **Netlify**: 드래그 앤 드롭 배포
- **Vercel**: Git 연동 자동 배포
- **GitHub Pages**: 무료 호스팅

### 배포 체크리스트
- [ ] 모든 링크 및 경로 확인
- [ ] 연락처 정보 업데이트
- [ ] 메타 태그 SEO 최적화
- [ ] 모바일 기능 테스트

## 📞 연락처 정보

- **전화**: 010-4695-9120
- **이메일**: ansd43@gmail.com  
- **GitHub**: https://github.com/Byeong-Gwan

## 📄 라이선스

MIT License

---

> **개발자 노트**: 이 프로젝트는 바닐라 JavaScript의 한계를 탐구하고 React/Next.js 마이그레이션을 위한 최적의 아키텍처를 설계하는 실험적 프로젝트입니다. 컴포넌트 기반 사고와 모던 웹 개발 패턴을 바닐라 환경에서 구현해보았습니다.

---

## 🧭 분석/학습 순서 로드맵 (권장)

이 프로젝트를 빠르게 이해하고 확장하기 위한 단계별 학습 루트를 제공합니다. 각 단계에서 반드시 열어볼 파일/디렉토리를 명시했습니다.

1) 기본 골격 파악 (템플릿 중심)
- 열어보기: `index.html`
- 확인 포인트:
  - `<template id="navigation-template">`, `<template id="footer-template">`
  - `<template id="home-template">`, `<template id="projects-template">`, `<template id="contact-template">`, `<template id="about-template">`
  - `#main-content`가 비어 있고, 각 페이지 JS가 템플릿을 마운트한다는 점

2) 앱 부트스트랩/라우팅 이해
- 열어보기: `js/app.js`, `js/router.js`
- 확인 포인트:
  - `App` 생성 시 Navigation/Footer 렌더, 라우트 등록, 전역 이벤트 위임
  - 홈 라우트는 `/main`, 다른 라우트: `/projects`, `/contact`, `/about`
  - `Router.navigate(path)` 흐름과 `updateNavigation()`의 active 처리

3) 공통 컴포넌트 로직(Nav/Footer)
- 열어보기: `js/components/Navigation.js`, `js/components/Footer.js`
- 확인 포인트:
  - 템플릿 클론 마운트 → 이벤트 바인딩만 담당(JS에는 로직만)
  - 모바일 메뉴 토글, `[data-route]` 클릭 시 SPA 네비게이션

4) 페이지 렌더링 패턴 익히기 (템플릿 + 동적 렌더)
- 열어보기: `js/pages/HomePage.js`, `js/pages/ProjectsPage.js`, `js/pages/ContactPage.js`, `js/pages/AboutPage.js`
- 확인 포인트:
  - `mountTemplate(templateId, container)`로 템플릿 마운트
  - DOM 동적 채움: 예) `HomePage.renderSkills()`, `ProjectsPage.renderProjects()`, `ContactPage.renderGrid()`
  - 페이지 간 이동 시 `cleanup()` 훅이 있다면 정리 로직 확인

5) 공용 유틸리티 확인
- 열어보기: `js/utils/dom.js`
- 확인 포인트:
  - `clearNode(node)`, `mountTemplate(templateId, container)`의 동작과 활용 패턴

6) 스타일 살펴보기 (토큰 → 컴포넌트/페이지)
- 열어보기: `styles/global.css`, `styles/home.css`, `styles/projects.css`, `styles/contact.css`, `styles/about.css`
- 확인 포인트:
  - CSS 변수(색/간격/타이포)와 반응형 브레이크포인트
  - 페이지/컴포넌트 단위로 분리된 스타일 구조

7) 실행/개발 환경
- 열어보기: `package.json`
- 확인 포인트:
  - `npm run dev`가 `/main`으로 열리도록 `--entry-file=index.html` 설정

8) React/Next.js 전환을 염두에 둔 관찰 포인트
- 컴포넌트/페이지 파일은 곧바로 JSX 컴포넌트로 옮기기 쉬운 형태(로직만)인지 확인
- 템플릿 → JSX로 변환 시, 각 템플릿 블록이 하나의 React 컴포넌트가 됨
- 전역 이벤트 위임 로직은 React의 이벤트 핸들러/훅으로 대체 가능

### 📚 1~2일 집중 학습 루틴 예시
- Day 1 오전: `index.html` 템플릿 구조, `js/app.js`, `js/router.js` 흐름 파악
- Day 1 오후: `Navigation.js`/`Footer.js` 로직 점검, `global.css` 토큰 숙지
- Day 2 오전: `HomePage`/`ProjectsPage` 동적 렌더 코드와 데이터 구조 이해
- Day 2 오후: `ContactPage`/`AboutPage` 마무리, 유틸(`dom.js`) 활용 패턴 정리

### 🧪 실습 과제(권장)
- 과제 A: 프로젝트 카드에 정렬/정렬 기준(최신순 등) 토글 버튼 추가
- 과제 B: `ContactPage`에 새로운 연락 수단(LinkedIn 등) 한 개 추가
- 과제 C: `AboutPage`에 타임라인 아이템 1개 추가 + 애니메이션 확인

위 순서를 따르면, 템플릿-로직-스타일이 분리된 구조를 자연스럽게 이해하고, React/Next.js로의 전환 포인트도 명확히 파악할 수 있습니다.
# resume-project
