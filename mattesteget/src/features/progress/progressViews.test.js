// @ts-check
// Tester i webbläsaren: lagring i IndexedDB, spelarens rapportering, Min resa och Dagens pass.
import { test, assert } from '../../../tests/harness.js';
import { loadRealContent, loadRealLesson } from '../../../tests/helpers.js';
import { createIdbBackend, createMemoryBackend } from './db.js';
import { createProgress } from './progressStore.js';
import { createLessonPlayer } from '../lesson/lessonPlayer.js';
import { journeyView } from './myJourney.js';
import { dailyView } from '../practice/dailySession.js';
import { buildSession } from '../practice/sessionBuilder.js';
import { answerToInput } from '../../lib/answers.js';

const DAY = '2026-11-10';

/** @param {ParentNode} root @param {string} text */
const button = (root, text) =>
  /** @type {HTMLButtonElement | undefined} */ ([...root.querySelectorAll('button')].find((b) => (b.textContent || '').replace(/\s/g, ' ') === text));

/** @param {HTMLElement} root @param {string} value */
function answer(root, value) {
  const input = /** @type {HTMLInputElement} */ (root.querySelector('input.answer-input'));
  input.value = value;
  /** @type {HTMLFormElement} */ (input.form).requestSubmit();
}

/** Ger upp på en skärm: visa svaret, eller gå hela ledtrådstrappan. @param {HTMLElement} root */
function giveUp(root) {
  answer(root, 'abc');
  answer(root, '-99999');
  const show = button(root, 'Visa svaret');
  if (show) show.click();
  else for (const l of ['Läs upp uppgiften igen', 'Visa en bild', 'Visa första steget', 'Visa hela lösningen']) button(root, l)?.click();
}

/** @param {HTMLElement} el @param {() => void | Promise<void>} body */
async function mounted(el, body) {
  document.body.append(el);
  try { await body(); } finally { el.remove(); }
}

function memoryProgress() {
  return createProgress({ backend: createMemoryBackend(), today: () => DAY });
}

test('IndexedDB: spara, läsa, lista, ta bort och rensa', async () => {
  const name = `mattesteget-test-${Date.now()}`;
  const db = createIdbBackend({ dbName: name });
  await db.set('item:a', { done: true, n: 1 });
  await db.set('type:b', { box: 2 });
  assert.deepEqual(await db.get('item:a'), { done: true, n: 1 });
  assert.deepEqual((await db.all()).map(([k]) => k).sort(), ['item:a', 'type:b']);
  await db.del('item:a');
  assert.equal(await db.get('item:a'), undefined);
  await db.clear();
  assert.deepEqual(await db.all(), []);
  indexedDB.deleteDatabase(name);
}, { browserOnly: true });

test('IndexedDB: progressionen finns kvar när appen startas om', async () => {
  const name = `mattesteget-test-${Date.now()}-b`;
  const first = createProgress({ backend: createIdbBackend({ dbName: name }), today: () => DAY });
  await first.ready;
  first.recordStep({ id: 'p1', type: 'practice', itemType: 'procent-av-tal' }, { attempts: 1, correct: true });
  await new Promise((r) => setTimeout(r, 150)); // skrivningarna är asynkrona

  const second = createProgress({ backend: createIdbBackend({ dbName: name }), today: () => DAY });
  await second.ready;
  assert.ok(second.isDone('p1'));
  assert.equal(second.getType('procent-av-tal')?.box, 2);
  assert.equal(second.isPersistent(), true);
  indexedDB.deleteDatabase(name);
}, { browserOnly: true });

test('spelaren rapporterar klara steg, försök, ledtrådar och felsvar', async () => {
  const lesson = await loadRealLesson('procent-vardag-1');
  /** @type {{ id: string, type: string, info: any }[]} */
  const events = [];
  const player = createLessonPlayer(lesson, { onStep: (step, info) => events.push({ id: step.id, type: step.type, info }) });
  const host = document.createElement('div');
  await mounted(host, () => {
    host.append(player.el);
    button(host, 'Fortsätt')?.click(); // ex1 klart
    assert.deepEqual(events.map((e) => e.id), ['pv1-ex1']);
    assert.deepEqual(events[0].info, {});

    // gå fram till första övningen
    for (let i = 0; i < 40 && !host.querySelector('.hints'); i++) {
      if (host.querySelector('input.answer-input')) giveUp(host);
      button(host, 'Fortsätt')?.click();
    }
    const before = events.length;
    answer(host, '7');
    assert.equal(events.length, before, 'inget rapporteras förrän uppgiften är löst');
    button(host, 'Visa en bild') ?? button(host, 'Läs upp uppgiften igen');
    button(host, 'Läs upp uppgiften igen')?.click();
    answer(host, '300');
    const last = events[events.length - 1];
    assert.equal(last.id, 'pv1-p1');
    assert.equal(last.type, 'practice');
    assert.deepEqual(last.info, { attempts: 2, hintLevel: 1, correct: true, wrongInputs: ['7'] });
    button(host, 'Fortsätt')?.click();
    assert.equal(events[events.length - 1].id, 'pv1-p1', 'övningar rapporteras inte en gång till vid "Fortsätt"');
  });
  player.dispose();
}, { browserOnly: true });

test('spelaren: att visa hela lösningen rapporteras som inte klar (correct false)', async () => {
  const lesson = await loadRealLesson('procent-vardag-1');
  /** @type {any[]} */
  const events = [];
  const player = createLessonPlayer(lesson, { onStep: (step, info) => events.push({ id: step.id, info }) });
  const host = document.createElement('div');
  await mounted(host, () => {
    host.append(player.el);
    for (let i = 0; i < 40 && !host.querySelector('.hints'); i++) {
      if (host.querySelector('input.answer-input')) giveUp(host);
      button(host, 'Fortsätt')?.click();
    }
    for (const l of ['Läs upp uppgiften igen', 'Visa en bild', 'Visa första steget', 'Visa hela lösningen']) button(host, l)?.click();
    const last = events[events.length - 1];
    assert.equal(last.id, 'pv1-p1');
    assert.equal(last.info.correct, false);
    assert.equal(last.info.hintLevel, 4);
  });
  player.dispose();
}, { browserOnly: true });

test('Min resa: visar framsteg per modul, sparar smeknamn och tar bort allt i två steg', async () => {
  const { modules } = await loadRealContent();
  const progress = memoryProgress();
  const view = journeyView({ progress, content: { modules } });
  // Antalet steg räknas ur innehållet, så testet följer med när lektioner läggs till.
  const stepsOf = (/** @type {any[]} */ ms) => ms.flatMap((m) => m.lessons).reduce((n, l) => n + l.steps.length, 0);
  const total = stepsOf(modules);
  const procTotal = stepsOf(modules.filter((m) => m.id === 'procent-vardag'));
  await mounted(view.el, async () => {
    assert.equal(view.el.querySelectorAll('h1').length, 1);
    assert.ok(view.el.textContent?.includes(`Du har klarat 0 av ${total} steg.`), view.el.textContent?.slice(0, 200));

    progress.recordStep({ id: 'pv1-ex1', type: 'workedExample' }, {});
    progress.recordStep({ id: 'pv1-p1', type: 'practice', itemType: 'procent-av-tal' }, { attempts: 1, correct: true });
    assert.ok(view.el.textContent?.includes(`Du har klarat 2 av ${procTotal} steg i Procent i vardagen.`));
    assert.ok(view.el.textContent?.includes(`Du har klarat 2 av ${total} steg.`));
    const bar = /** @type {HTMLProgressElement} */ (view.el.querySelector('progress[aria-label="Framsteg i Procent i vardagen"]'));
    assert.equal(bar.value, 2);
    assert.equal(bar.max, procTotal);

    const nick = /** @type {HTMLInputElement} */ (view.el.querySelector('#smeknamn'));
    nick.value = 'Kim';
    /** @type {HTMLFormElement} */ (nick.form).requestSubmit();
    assert.ok(view.el.textContent?.includes('Hej Kim!'));
    assert.equal(document.activeElement?.id, 'smeknamn', 'fokus stannar i fältet');

    const confirmBox = /** @type {HTMLElement} */ (view.el.querySelector('[role="alertdialog"]'));
    assert.equal(confirmBox.hidden, true);
    button(view.el, 'Ta bort mina uppgifter')?.click();
    assert.equal(confirmBox.hidden, false);
    button(view.el, 'Avbryt')?.click();
    assert.ok(progress.isDone('pv1-ex1'), 'inget togs bort vid avbryt');
    button(view.el, 'Ta bort mina uppgifter')?.click();
    await /** @type {HTMLButtonElement} */ (button(view.el, 'Ja, ta bort allt')).click();
    await new Promise((r) => setTimeout(r, 10));
    assert.ok(!progress.isDone('pv1-ex1'));
    assert.ok(view.el.textContent?.includes(`Du har klarat 0 av ${total} steg.`));
    assert.ok(!view.el.textContent?.includes('Hej Kim'));
  });
  view.dispose();
}, { browserOnly: true });

test('Min resa: varnar när webbläsaren inte sparar mellan besök', async () => {
  const progress = createProgress({ backend: createMemoryBackend(), today: () => DAY });
  const view = journeyView({ progress, content: { modules: [] } });
  assert.ok(view.el.textContent?.includes('sparar inte dina uppgifter mellan besök'), 'minneslagring sparar inte mellan besök');
  const name = `mattesteget-test-${Date.now()}-c`;
  const real = createProgress({ backend: createIdbBackend({ dbName: name }), today: () => DAY });
  await real.ready;
  const view3 = journeyView({ progress: real, content: { modules: [] } });
  assert.ok(!view3.el.textContent?.includes('sparar inte'), 'IndexedDB sparar');
  view3.dispose();
  indexedDB.deleteDatabase(name);
  const broken = createProgress({ backend: { ...createMemoryBackend(), kind: 'idb', all: async () => { throw new Error('x'); } }, today: () => DAY });
  await broken.ready;
  const view2 = journeyView({ progress: broken, content: { modules: [] } });
  assert.ok(view2.el.textContent?.includes('sparar inte dina uppgifter mellan besök'));
  view.dispose();
  view2.dispose();
}, { browserOnly: true });

test('Dagens pass: tomt första gången, med länk till modulerna', async () => {
  const { modules } = await loadRealContent();
  const view = dailyView({ progress: memoryProgress(), content: { modules } });
  assert.ok(view.el.textContent?.includes('Du har inte övat på några uppgifter än'));
  assert.ok(view.el.querySelector('a[href="#/moduler"]'));
  assert.equal(button(view.el, 'Starta Dagens pass'), undefined);
  view.dispose();
}, { browserOnly: true });

test('Dagens pass: spela hela passet, resultaten sparas och lösning ger låda 1', async () => {
  const { modules } = await loadRealContent();
  const progress = memoryProgress();
  progress.recordStep({ id: 'pv1-p1', type: 'practice', itemType: 'procent-av-tal' }, { attempts: 1, correct: true });
  const view = dailyView({ progress, content: { modules } });
  await mounted(view.el, () => {
    assert.ok(view.el.textContent?.includes('Du får 6 uppgifter'));
    const planned = buildSession({ modules, items: progress.itemsMap(), types: progress.typesMap(), today: DAY });

    button(view.el, 'Starta Dagens pass')?.click();
    assert.ok(view.el.textContent?.includes('Uppgift 1 av 6'));

    // första uppgiften klaras med facit
    answer(view.el, /** @type {string} */ (answerToInput(planned.tasks[0].step.answer)));
    assert.equal(progress.getType('procent-av-tal')?.box, 3, 'rätt utan ledtråd: upp en låda');
    assert.ok(progress.isDone(planned.tasks[0].itemId));
    button(view.el, 'Fortsätt')?.click();

    // resten ger vi upp på
    for (let i = 0; i < 60 && view.el.querySelector('h2')?.textContent !== 'Dagens pass är klart'; i++) {
      if (view.el.querySelector('input.answer-input')) giveUp(view.el);
      button(view.el, 'Fortsätt')?.click();
    }
    assert.equal(view.el.querySelector('h2')?.textContent, 'Dagens pass är klart');
    assert.equal(progress.getType('procent-av-tal')?.box, 1, 'lösningen visades: tillbaka till låda 1');
    assert.equal(button(view.el, 'Gör om lektionen'), undefined, 'ingen "gör om" i Dagens pass');
    assert.ok(view.el.querySelector('a[href="#/min-resa"]'));
  });
  view.dispose();
}, { browserOnly: true });
