// @ts-check
import { createSettingsStore } from './features/settings/settingsStore.js';
import { applySettings } from './features/settings/applySettings.js';
import { buildLayout } from './app/layout.js';
import { startRouter } from './app/router.js';
import { routes } from './app/views.js';
import { loadContent, fetchReader } from './lib/contentLoader.js';
import { createSpeech } from './features/tts/speech.js';

// Inställningarna tillämpas först, så att tema och typografi är rätt innan något ritas.
const settings = createSettingsStore();
applySettings(settings.get());
settings.subscribe((s) => applySettings(s));

// Innehållet läses från den egna domänen. Valideringsfel visas bara i konsolen, inte för eleven.
/** @type {{ modules: any[], errors: string[] }} */
let content = { modules: [], errors: [] };
try {
  content = await loadContent(fetchReader(new URL('content/', document.baseURI).href));
  if (content.errors.length) console.warn('Innehållsfel:\n' + content.errors.join('\n'));
} catch (e) {
  console.warn('Innehållet kunde inte läsas in', e);
}

// Uppläsningen läser hastigheten från inställningarna varje gång en mening startar.
const speech = createSpeech({ getRate: () => settings.get().speechRate });
void speech.init();

const root = document.getElementById('app');
if (root) {
  const layout = buildLayout(root, routes);
  startRouter({ routes, layout, ctx: { settings, content, speech } });
}
