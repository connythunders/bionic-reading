// @ts-check
// Små hjälpare för att bygga DOM utan innerHTML.

/**
 * Skapar ett element. Barn kan vara text, element eller (nästlade) listor.
 * Ingen innerHTML används, och style-attribut är förbjudna (CSP tillåter dem inte).
 * @param {string} tag
 * @param {Record<string, any> | null} [attrs]
 * @param {...any} children
 * @returns {HTMLElement}
 */
export function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value === false || value == null) continue;
      if (key === 'style') throw new Error('style-attribut är inte tillåtet (CSP). Använd en CSS-klass.');
      if (key.startsWith('on') && typeof value === 'function') {
        el.addEventListener(key.slice(2).toLowerCase(), value);
      } else if (key === 'class') {
        el.className = String(value);
      } else if (value === true) {
        el.setAttribute(key, '');
      } else {
        el.setAttribute(key, String(value));
      }
    }
  }
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    el.append(child instanceof Node ? child : document.createTextNode(String(child)));
  }
  return el;
}

/**
 * Flyttar fokus till första rubriken i en behållare, så att skärmläsare
 * läser upp den nya vyn efter ett sidbyte.
 * @param {HTMLElement} root
 */
export function focusHeading(root) {
  const heading = root.querySelector('h1');
  if (heading instanceof HTMLElement) {
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: false });
  }
}
