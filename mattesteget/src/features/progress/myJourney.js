// @ts-check
// Min resa: hur långt eleven har kommit, ett valfritt smeknamn och möjlighet att ta bort allt.
import { h, createScope } from '../../lib/dom.js';
import { summarize } from './summary.js';
import { isDue } from '../practice/leitner.js';
import { shareSection } from './shareSection.js';

const STATUS_TEXT = { notStarted: 'Inte påbörjad', inProgress: 'Pågår', done: 'Klar' };

/**
 * @param {{
 *   progress?: ReturnType<typeof import('./progressStore.js').createProgress>,
 *   content?: { modules: any[] }
 * }} ctx
 * @returns {{ title: string, el: HTMLElement, dispose: () => void }}
 */
export function journeyView(ctx) {
  const scope = createScope();
  const progress = ctx.progress;
  const root = h('div', null, h('h1', null, 'Min resa'));

  if (!progress) {
    root.append(h('p', null, 'Min resa kan inte visas just nu. Ladda om sidan och försök igen.'));
    return { title: 'Min resa', el: root, dispose: () => scope.dispose() };
  }

  const body = h('div', null);
  const live = h('div', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
  root.append(body, live);
  root.querySelector('h1')?.setAttribute('tabindex', '-1');

  function draw() {
    const modules = (ctx.content?.modules ?? []).filter((m) => m.lessons.length > 0);
    const s = summarize(modules, (id) => progress?.isDone(id) ?? false);
    const profile = progress?.getProfile() ?? {};
    const today = progress?.today() ?? '';
    const dueTypes = [...(progress?.typesMap().values() ?? [])].filter((t) => isDue(t, today)).length;

    /** @type {any[]} */
    const parts = [];
    const nick = profile.nickname;
    parts.push(h('p', { class: 'lead' },
      nick ? `Hej ${nick}! ` : '',
      s.total === 0 ? 'Här kommer du se hur långt du har kommit.' : `Du har klarat ${s.done} av ${s.total} steg.`,
    ));
    if (progress && !progress.isPersistent()) {
      parts.push(h('p', { class: 'notice', role: 'note' }, 'Den här webbläsaren sparar inte dina uppgifter mellan besök. Det du gör nu försvinner när du stänger sidan.'));
    }

    parts.push(h('h2', null, 'Moduler'));
    for (const m of s.modules) {
      const bar = h('progress', { max: m.total, value: m.done, 'aria-label': `Framsteg i ${m.title}` }, `${m.done} av ${m.total}`);
      parts.push(h('section', { class: 'card journey-module' },
        h('h3', null, m.title),
        h('p', null, `Du har klarat ${m.done} av ${m.total} steg i ${m.title}.`),
        bar,
        h('ul', { class: 'lesson-list' },
          m.lessons.map((/** @type {any} */ l) => h('li', null,
            h('a', { href: `#/lektion/${l.id}` }, l.title),
            ` – ${STATUS_TEXT[/** @type {'notStarted' | 'inProgress' | 'done'} */ (l.status)]}, ${l.done} av ${l.total} steg`,
          )),
        ),
      ));
    }

    parts.push(
      h('h2', null, 'Dagens pass'),
      h('p', null, dueTypes > 0
        ? `Det finns ${dueTypes} sorters uppgifter att repetera idag.`
        : 'Inget måste repeteras just nu.'),
      h('p', null, h('a', { class: 'btn btn-secondary', href: '#/idag' }, 'Till Dagens pass')),
    );

    // Smeknamn
    const input = /** @type {HTMLInputElement} */ (h('input', {
      id: 'smeknamn', type: 'text', class: 'answer-input', maxlength: '30', autocomplete: 'off', value: nick ?? '',
    }));
    parts.push(
      h('h2', null, 'Smeknamn'),
      h('form', {
        class: 'answer-form',
        onsubmit: (/** @type {Event} */ e) => {
          e.preventDefault();
          progress?.setNickname(input.value); // ritar om vyn
          live.textContent = 'Smeknamnet är sparat.';
          document.getElementById('smeknamn')?.focus();
        },
      },
        h('label', { for: 'smeknamn', class: 'question' }, 'Smeknamn (valfritt)'),
        h('p', { class: 'lead' }, 'Använd inte ditt riktiga namn. Smeknamnet sparas bara på den här enheten.'),
        h('div', { class: 'input-row' }, input, h('button', { type: 'submit', class: 'btn' }, 'Spara')),
      ),
    );

    // Ta bort allt, i två steg så att det inte sker av misstag
    const confirmBox = h('div', { class: 'notice', role: 'alertdialog', 'aria-labelledby': 'ta-bort-rubrik', hidden: true, tabindex: '-1' },
      h('p', { id: 'ta-bort-rubrik' }, 'Vill du ta bort allt du har gjort? Det går inte att ångra.'),
      h('div', { class: 'actions' },
        h('button', {
          type: 'button', class: 'btn',
          onclick: async () => {
            await progress?.clearAll(); // ritar om vyn
            live.textContent = 'Allt är borttaget från den här enheten.';
            /** @type {HTMLElement | null} */ (root.querySelector('h1'))?.focus();
          },
        }, 'Ja, ta bort allt'),
        h('button', {
          type: 'button', class: 'btn btn-secondary',
          onclick: () => { confirmBox.hidden = true; askButton.focus(); },
        }, 'Avbryt'),
      ),
    );
    const askButton = h('button', {
      type: 'button', class: 'btn btn-secondary',
      onclick: () => { confirmBox.hidden = false; confirmBox.focus(); },
    }, 'Ta bort mina uppgifter');
    parts.push(...shareSection({ progress, modules: ctx.content?.modules ?? [] }));
    parts.push(
      h('h2', null, 'Dina uppgifter'),
      h('p', null, 'Allt du gör sparas bara på den här enheten. Inget skickas någonstans.'),
      askButton,
      confirmBox,
    );
    body.replaceChildren(...parts);
  }

  draw();
  scope.add(progress.subscribe(draw));
  return { title: 'Min resa', el: root, dispose: () => scope.dispose() };
}
