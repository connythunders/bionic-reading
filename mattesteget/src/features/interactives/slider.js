// @ts-check
// Gemensam reglagelogik för tallinje och procentstapel: drag med pekare, klick på linjen
// och tangentbord. Dragning är alltid ett extra sätt, aldrig det enda (WCAG 2.5.7).

/**
 * Runda till närmaste steg och håll värdet inom intervallet.
 * @param {number} v @param {number} min @param {number} max @param {number} step
 */
export function snap(v, min, max, step) {
  const clamped = Math.min(max, Math.max(min, v));
  const k = Math.round((clamped - min) / step);
  const snapped = Number((min + k * step).toFixed(10)); // undviker 0,30000000000000004
  return Math.min(max, Math.max(min, snapped));
}

/**
 * Kopplar pekare och tangentbord till ett reglage.
 * @param {{
 *   track: HTMLElement, thumb: HTMLElement, min: number, max: number, step: number,
 *   bigStep?: number, getValue: () => number, onInput: (v: number) => void
 * }} o
 */
export function attachSlider({ track, thumb, min, max, step, bigStep = step * 10, getValue, onInput }) {
  let dragging = false;

  /** @param {number} clientX */
  const fromClientX = (clientX) => {
    const rect = track.getBoundingClientRect();
    const ratio = rect.width > 0 ? (clientX - rect.left) / rect.width : 0;
    return snap(min + ratio * (max - min), min, max, step);
  };

  track.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    dragging = true;
    try { track.setPointerCapture(e.pointerId); } catch { /* ignorera */ }
    onInput(fromClientX(e.clientX));
    thumb.focus();
    e.preventDefault();
  });
  track.addEventListener('pointermove', (e) => {
    if (dragging) onInput(fromClientX(e.clientX));
  });
  const stop = () => { dragging = false; };
  track.addEventListener('pointerup', stop);
  track.addEventListener('pointercancel', stop);

  thumb.addEventListener('keydown', (e) => {
    const v = getValue();
    /** @type {number | null} */
    let next = null;
    switch (e.key) {
      case 'ArrowLeft': case 'ArrowDown': next = v - step; break;
      case 'ArrowRight': case 'ArrowUp': next = v + step; break;
      case 'PageDown': next = v - bigStep; break;
      case 'PageUp': next = v + bigStep; break;
      case 'Home': next = min; break;
      case 'End': next = max; break;
      default: return;
    }
    e.preventDefault();
    onInput(snap(next, min, max, step));
  });
}
