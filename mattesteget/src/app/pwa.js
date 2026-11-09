// @ts-check
// Registrering av service worker och uppdateringar. Appen uppdateras aldrig av sig själv mitt i
// en uppgift: när en ny version finns får eleven ett meddelande och väljer själv.

/**
 * Ska service workern registreras? Den registreras på riktiga adresser (https). På localhost
 * används den bara om adressen har ?sw=1, så att den inte cachar gamla filer under utveckling.
 * @param {{ hostname: string, protocol: string, search: string }} loc
 */
export function shouldRegisterServiceWorker(loc) {
  const local = loc.hostname === 'localhost' || loc.hostname === '127.0.0.1' || loc.hostname === '[::1]';
  if (local) return /[?&]sw=1(&|$)/.test(loc.search);
  return loc.protocol === 'https:';
}

/**
 * @param {{ onUpdate: (apply: () => void) => void, nav?: Navigator, loc?: Location }} o
 * @returns {Promise<ServiceWorkerRegistration | null>}
 */
export async function registerServiceWorker({ onUpdate, nav = navigator, loc = location }) {
  if (!('serviceWorker' in nav) || !shouldRegisterServiceWorker(loc)) return null;

  /** @param {ServiceWorker} worker */
  const offer = (worker) => onUpdate(() => {
    // Ladda om först när den nya versionen tagit över.
    nav.serviceWorker.addEventListener('controllerchange', () => loc.reload(), { once: true });
    worker.postMessage({ type: 'SKIP_WAITING' });
  });

  try {
    const reg = await nav.serviceWorker.register('sw.js');
    // En ny version väntar redan från ett tidigare besök.
    if (reg.waiting && nav.serviceWorker.controller) offer(reg.waiting);
    reg.addEventListener('updatefound', () => {
      const worker = reg.installing;
      worker?.addEventListener('statechange', () => {
        // Första installationen (ingen controller) ska inte avbryta någon, bara nya versioner.
        if (worker.state === 'installed' && nav.serviceWorker.controller) offer(worker);
      });
    });
    return reg;
  } catch (e) {
    console.warn('Offlineläget kunde inte slås på', e);
    return null;
  }
}
