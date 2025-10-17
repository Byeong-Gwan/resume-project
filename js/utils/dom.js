// DOM utility helpers for mounting HTML templates

export function clearNode(node) {
  if (!node) return;
  while (node.firstChild) node.removeChild(node.firstChild);
}

export function mountTemplate(templateId, container) {
  const tpl = document.getElementById(templateId);
  if (!tpl || !tpl.content) {
    console.warn(`Template not found: ${templateId}`);
    return null;
  }
  clearNode(container);
  const fragment = tpl.content.cloneNode(true);
  container.appendChild(fragment);
  return container;
}

// ──────────────────────────────────────────────────────────────
// Base path helpers (for GitHub Pages project pages)
// e.g. https://byeong-gwan.github.io/resume-project/... => BASE="/resume-project"
// ──────────────────────────────────────────────────────────────
const BASE = (() => {
  const m = window.location.pathname.match(/^\/[^/]+/); // 첫 세그먼트
  return m ? m[0] : '';
})();

export const withBase = (p = '') => {
  if (/^https?:\/\//.test(p)) return p; // 외부 URL은 그대로
  const full = p.startsWith('/') ? p : `/${p}`;
  // '/resume-project' + '/templates/...' => '/resume-project/templates/...'
  return `${BASE}${full}`.replace(/\/+$/, '') || '/';
};

// Cached template loader for external HTML partials
const __templateCache = new Map();

export async function loadTemplate(url) {
  if (__templateCache.has(url)) return __templateCache.get(url);
  // 절대/상대 모두 withBase로 프로젝트 경로에 고정
  const finalUrl = withBase(url);
  const res = await fetch(finalUrl, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to load template: ${url}`);
  const html = await res.text();
  __templateCache.set(url, html);
  return html;
}

export async function mountTemplateUrl(url, container) {
  const html = await loadTemplate(url);
  clearNode(container);
  const tpl = document.createElement('template');
  tpl.innerHTML = html.trim();
  container.appendChild(tpl.content.cloneNode(true));
  return container;
}
