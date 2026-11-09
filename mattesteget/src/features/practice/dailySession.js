// @ts-check
// Vyn för Dagens pass: en kort, blandad omgång av uppgifter eleven redan har övat.
import { h, createScope } from '../../lib/dom.js';
import { buildSession, sessionLesson } from './sessionBuilder.js';
import { createLessonPlayer } from '../lesson/lessonPlayer.js';
import { createSpeech } from '../tts/speech.js';

/**
 * @param {{
 *   progress?: ReturnType<typeof import('../progress/progressStore.js').createProgress>,
 *   content?: { modules: any[] },
 *   speech?: ReturnType<typeof createSpeech>,
 *   settings?: ReturnType<typeof import('../settings/settingsStore.js').createSettingsStore>
 * }} ctx
 * @returns {{ title: string, el: HTMLElement, dispose: () => void }}
 */
export function dailyView(ctx) {
  const scope = createScope();
  const root = h('div', null, h('h1', null, 'Dagens pass'));
  const progress = ctx.progress;

  if (!progress) {
    root.append(h('p', null, 'Dagens pass kan inte användas just nu. Ladda om sidan och försök igen.'));
    return { title: 'Dagens pass', el: root, dispose: () => scope.dispose() };
  }

  const session = buildSession({
    modules: ctx.content?.modules ?? [], items: progress.itemsMap(), types: progress.typesMap(), today: progress.today(),
  });

  if (session.tasks.length === 0) {
    root.append(
      h('p', null, 'Du har inte övat på några uppgifter än. Gör en lektion först, så dyker uppgifterna upp här.'),
      h('p', null, h('a', { class: 'btn', href: '#/moduler' }, 'Till modulerna')),
    );
    return { title: 'Dagens pass', el: root, dispose: () => scope.dispose() };
  }

  const n = session.tasks.length;
  const mix = n - session.dueCount;
  const intro = h('div', null,
    h('p', { class: 'lead' }, `Ungefär 10–15 minuter. Du får ${n} uppgifter, blandade från det du redan har övat.`),
    h('p', null,
      session.dueCount > 0
        ? `${session.dueCount} av uppgifterna är repetition som det är dags för nu.${mix > 0 ? ` Resten är en blandning från tidigare.` : ''}`
        : 'Det finns ingen repetition som måste göras just nu, så passet är en blandning från tidigare.',
    ),
    h('p', null, 'Du kan sluta när du vill. Det du har gjort sparas.'),
    h('div', { class: 'actions' },
      h('button', {
        type: 'button', class: 'btn',
        onclick: () => {
          const player = createLessonPlayer(sessionLesson(session.tasks), {
            speech: ctx.speech, settings: ctx.settings,
            onStep: (step, info) => progress.recordStep(
              { id: step.baseId ?? step.id, type: step.type, itemType: step.itemType },
              info,
            ),
            labels: {
              step: 'Uppgift',
              doneTitle: 'Dagens pass är klart',
              doneText: 'Bra jobbat. Uppgifterna kommer tillbaka när det är dags att repetera dem.',
              restart: false,
              links: [{ href: '#/', text: 'Till startsidan' }, { href: '#/min-resa', text: 'Min resa' }],
            },
          });
          scope.add(() => player.dispose());
          intro.replaceWith(player.el);
          /** @type {HTMLElement | null} */ (player.el.querySelector('h2'))?.focus();
        },
      }, 'Starta Dagens pass'),
    ),
    h('details', { class: 'explain' },
      h('summary', null, 'Så väljs uppgifterna'),
      h('p', null, 'Uppgifter du klarar utan hjälp kommer tillbaka senare: efter 1, 3, 7 och sedan 14 dagar. Klarar du dem med hjälp kommer de tillbaka vid samma tid som förut. Fick du se lösningen kommer de tillbaka snabbt igen.'),
      h('p', null, 'Uppgifterna blandas så att du övar på olika saker i samma pass. Det hjälper dig att komma ihåg. Ingen annan ser vad du gör.'),
    ),
  );
  root.append(intro);
  return { title: 'Dagens pass', el: root, dispose: () => scope.dispose() };
}
