// @ts-check
import { createSettingsStore } from './features/settings/settingsStore.js';
import { applySettings } from './features/settings/applySettings.js';
import { buildLayout } from './app/layout.js';
import { startRouter } from './app/router.js';
import { routes } from './app/views.js';

// Inställningarna tillämpas först, så att tema och typografi är rätt innan något ritas.
const settings = createSettingsStore();
applySettings(settings.get());
settings.subscribe((s) => applySettings(s));

const root = document.getElementById('app');
if (root) {
  const layout = buildLayout(root, routes);
  startRouter({ routes, layout, ctx: { settings } });
}
