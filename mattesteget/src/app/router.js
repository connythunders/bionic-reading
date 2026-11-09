// @ts-check
import { parseHash, matchRoute } from '../lib/route.js';
import { focusHeading } from '../lib/dom.js';
import { notFoundView } from './views.js';

/**
 * Hash-router. Vid varje vybyte: byt innehåll, uppdatera sidtitel och flytta fokus till h1.
 * @param {{
 *   routes: import('./views.js').RouteDef[],
 *   layout: ReturnType<typeof import('./layout.js').buildLayout>,
 *   ctx: import('./views.js').Ctx
 * }} o
 */
export function startRouter({ routes, layout, ctx }) {
  let first = true;

  function render() {
    const path = parseHash(location.hash);
    const match = matchRoute(path, routes);
    const view = match ? match.route.view(ctx, match.params) : notFoundView();
    layout.main.replaceChildren(view.el);
    document.title = `${view.title} – Mattesteget`;
    layout.setCurrent(path);
    window.scrollTo(0, 0);
    // Första laddningen ska inte stjäla fokus, men senare vybyten ska flytta det.
    if (!first) focusHeading(layout.main);
    first = false;
  }

  window.addEventListener('hashchange', render);
  render();
}
