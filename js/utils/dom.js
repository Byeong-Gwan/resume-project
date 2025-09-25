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

// Cached template loader for external HTML partials
const __templateCache = new Map();

export async function loadTemplate(url) {
  if (__templateCache.has(url)) return __templateCache.get(url);
  const res = await fetch(url, { cache: 'no-cache' });
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
