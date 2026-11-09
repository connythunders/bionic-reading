// @ts-check
// Ordlista: ord, enkel förklaring, exempel, bild och uppläsning.
import { h, createScope } from '../../lib/dom.js';
import { createSpeakable } from '../tts/speakable.js';
import { createSpeech } from '../tts/speech.js';
import { createVoiceNotice } from '../tts/voiceNotice.js';
import { createRepresentation } from '../interactives/representation.js';

/**
 * @param {{
 *   content?: { glossary?: { terms: any[] } },
 *   speech?: ReturnType<typeof createSpeech>
 * }} ctx
 * @returns {{ title: string, el: HTMLElement, dispose: () => void }}
 */
export function glossaryView(ctx) {
  const scope = createScope();
  const speech = ctx.speech ?? createSpeech({ synth: null });
  const terms = [...(ctx.content?.glossary?.terms ?? [])].sort((a, b) => a.term.localeCompare(b.term, 'sv'));
  const root = h('div', null, h('h1', null, 'Ordlista'));

  if (terms.length === 0) {
    root.append(h('p', null, 'Ordlistan kunde inte läsas in. Ladda om sidan och försök igen.'));
    return { title: 'Ordlista', el: root, dispose: () => scope.dispose() };
  }

  const cards = terms.map((t) => {
    const heading = h('h2', { id: `ord-${t.id}` }, t.term);
    const expl = createSpeakable(t.explanation, { speech, scope, label: `förklaringen av ${t.term.toLowerCase()}` });
    /** @type {any[]} */
    const children = [heading, h('p', null, expl.text), expl.controls];
    if (t.example) {
      const ex = createSpeakable(t.example, { speech, scope, label: `exemplet för ${t.term.toLowerCase()}` });
      children.push(h('p', null, h('strong', null, 'Exempel: '), ex.text), ex.controls);
    }
    if (t.representation) {
      const rep = createRepresentation({ kind: t.representation.kind, config: t.representation.config, interactive: false, label: t.term });
      const cap = createSpeakable(t.representation.caption, { speech, scope, label: `bildtexten för ${t.term.toLowerCase()}` });
      children.push(rep.el, h('p', { class: 'caption' }, cap.text), cap.controls);
    }
    return { term: t, el: h('section', { class: 'card term', 'aria-labelledby': `ord-${t.id}` }, children) };
  });

  const status = h('p', { class: 'lead', role: 'status' }, `Det finns ${terms.length} ord.`);
  const input = /** @type {HTMLInputElement} */ (h('input', {
    id: 'ordsok', type: 'search', class: 'answer-input', autocomplete: 'off', spellcheck: 'false',
    oninput: () => {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      for (const c of cards) {
        const hay = `${c.term.term} ${c.term.explanation.text} ${c.term.example?.text ?? ''}`.toLowerCase();
        const match = !q || hay.includes(q);
        c.el.hidden = !match;
        if (match) shown++;
      }
      status.textContent = shown === 0 ? 'Inga ord matchade. Prova ett annat ord.' : `Visar ${shown} av ${terms.length} ord.`;
    },
  }));

  root.append(
    h('p', { class: 'lead' }, 'Här förklaras ord du möter i matten. Tryck på Läs upp om du vill höra förklaringen.'),
    createVoiceNotice(speech, scope),
    h('div', { class: 'answer-form' },
      h('label', { for: 'ordsok', class: 'question' }, 'Sök ord'),
      h('div', { class: 'input-row' }, input),
    ),
    status,
    h('div', { class: 'glossary-list' }, cards.map((c) => c.el)),
  );
  return { title: 'Ordlista', el: root, dispose: () => scope.dispose() };
}
