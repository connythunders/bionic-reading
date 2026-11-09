// @ts-check
import { createSettingsStore } from './features/settings/settingsStore.js';
import { applySettings } from './features/settings/applySettings.js';
import { buildLayout } from './app/layout.js';
import { startRouter } from './app/router.js';
import { routes } from './app/views.js';
import { loadContent, fetchReader } from './lib/contentLoader.js';
import { createSpeech } from './features/tts/speech.js';
import { createProgress } from './features/progress/progressStore.js';
import { createBestBackend } from './features/progress/db.js';
import { registerServiceWorker } from './app/pwa.js';
import { createTeacherCode } from './features/teacher/teacherCode.js';
import { createStudentsStore } from './features/teacher/studentsStore.js';

// Inställningarna tillämpas först, så att tema och typografi är rätt innan något ritas.
const settings = createSettingsStore();
applySettings(settings.get());
settings.subscribe((s) => applySettings(s));

// Innehållet läses från den egna domänen. Valideringsfel visas bara i konsolen, inte för eleven.
/** @type {{ modules: any[], errors: string[], glossary?: { terms: any[] } }} */
let content = { modules: [], errors: [] };
try {
  content = await loadContent(fetchReader(new URL('content/', document.baseURI).href));
  if (content.errors.length) console.warn('Innehållsfel:\n' + content.errors.join('\n'));
} catch (e) {
  console.warn('Innehållet kunde inte läsas in', e);
}

// Progressionen sparas på enheten (IndexedDB) och läses in innan appen startar.
const backend = createBestBackend();
const progress = createProgress({ backend });
// Lärarens elevfiler ligger i samma lagring (andra nycklar) och rörs inte av elevens "ta bort allt".
const teacher = { code: createTeacherCode(), students: createStudentsStore({ backend }) };
await Promise.all([progress.ready, teacher.students.ready]);

// Uppläsningen läser hastigheten från inställningarna varje gång en mening startar.
const speech = createSpeech({ getRate: () => settings.get().speechRate });
void speech.init();

const root = document.getElementById('app');
if (root) {
  const layout = buildLayout(root, routes, { speech, settings });
  startRouter({ routes, layout, ctx: { settings, content, speech, progress, teacher } });
  // Offline: sparar appens filer på enheten efter första besöket.
  void registerServiceWorker({ onUpdate: (apply) => layout.offerUpdate(apply) });
}
