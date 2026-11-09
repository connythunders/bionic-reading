// @ts-check
import { test, assert } from '../../../tests/harness.js';
import { loadRealContent } from '../../../tests/helpers.js';
import { addDays, localDay, outcomeOf, nextBox, nextTypeRecord, isDue, INTERVALS } from '../practice/leitner.js';
import { createMemoryBackend } from './db.js';
import { createProgress } from './progressStore.js';
import { summarize } from './summary.js';
import { buildSession, makeVariant, sessionLesson } from '../practice/sessionBuilder.js';
import { answerToInput } from '../../lib/answers.js';

const DAY = '2026-11-10';

/** @param {{ today?: string, backend?: import('./db.js').Backend }} [o] */
function newProgress({ today = DAY, backend = createMemoryBackend() } = {}) {
  let day = today;
  const progress = createProgress({ backend, today: () => day });
  return { progress, backend, setDay: (/** @type {string} */ d) => { day = d; } };
}

// ---------- Leitner ----------

test('leitner: datum räknas rätt över månads- och årsskiften', () => {
  assert.equal(addDays('2026-11-10', 1), '2026-11-11');
  assert.equal(addDays('2026-11-30', 1), '2026-12-01');
  assert.equal(addDays('2026-12-31', 1), '2027-01-01');
  assert.equal(addDays('2028-02-28', 1), '2028-02-29');
  assert.equal(addDays('2026-11-10', 14), '2026-11-24');
  assert.equal(localDay(new Date(2026, 0, 5)), '2026-01-05');
});

test('leitner: rätt utan ledtråd går upp, med ledtråd stannar, inte klar börjar om', () => {
  assert.equal(outcomeOf({ correct: true, hintLevel: 0 }), 'up');
  assert.equal(outcomeOf({ correct: true, hintLevel: 2 }), 'same');
  assert.equal(outcomeOf({ correct: false, hintLevel: 4 }), 'again');
  assert.equal(nextBox(1, 'up'), 2);
  assert.equal(nextBox(5, 'up'), 5, 'högsta lådan är 5');
  assert.equal(nextBox(4, 'same'), 4);
  assert.equal(nextBox(4, 'again'), 1);
});

test('leitner: intervallen är 0, 1, 3, 7 och 14 dagar', () => {
  assert.deepEqual(INTERVALS, { 1: 0, 2: 1, 3: 3, 4: 7, 5: 14 });
  let rec = nextTypeRecord(undefined, 'up', DAY);
  assert.deepEqual(rec, { box: 2, due: '2026-11-11', lastSeen: DAY, reviews: 1 });
  rec = nextTypeRecord(rec, 'up', '2026-11-11');
  assert.equal(rec.box, 3);
  assert.equal(rec.due, '2026-11-14');
  rec = nextTypeRecord(rec, 'again', '2026-11-14');
  assert.equal(rec.box, 1);
  assert.equal(rec.due, '2026-11-14', 'låda 1 förfaller direkt');
  assert.ok(isDue(rec, '2026-11-14'));
  assert.ok(!isDue({ ...rec, due: '2026-11-15' }, '2026-11-14'));
});

// ---------- Lagring ----------

test('progression: övningsuppgift sparar försök, ledtrådar och flyttar uppgiftstypen', () => {
  const { progress } = newProgress();
  progress.recordStep({ id: 'p1', type: 'practice', itemType: 'procent-av-tal' }, { attempts: 2, hintLevel: 0, correct: true, wrongInputs: ['7'] });
  const item = progress.getItem('p1');
  assert.equal(item?.attempts, 2);
  assert.equal(item?.done, true);
  assert.equal(item?.lastSeen, DAY);
  assert.deepEqual(item?.wrongAnswers, ['7']);
  assert.equal(progress.getType('procent-av-tal')?.box, 2);
  assert.ok(progress.isDone('p1'));
  assert.ok(!progress.isDone('p2'));
});

test('progression: ledtråd ger samma låda, lösning ger låda 1, vanliga steg rör inga lådor', () => {
  const { progress } = newProgress();
  progress.recordStep({ id: 'a', type: 'practice', itemType: 't' }, { attempts: 1, correct: true });
  progress.recordStep({ id: 'b', type: 'practice', itemType: 't' }, { attempts: 1, hintLevel: 2, correct: true });
  assert.equal(progress.getType('t')?.box, 2, 'rätt med ledtråd: samma låda');
  assert.equal(progress.getItem('b')?.hintMax, 2);
  progress.recordStep({ id: 'c', type: 'practice', itemType: 't' }, { attempts: 3, hintLevel: 4, correct: false });
  assert.equal(progress.getType('t')?.box, 1, 'lösningen visades: tillbaka till låda 1');
  progress.recordStep({ id: 'ex', type: 'workedExample' }, {});
  assert.equal(progress.getType('t')?.reviews, 3, 'steg utan uppgiftstyp påverkar inte lådorna');
  assert.ok(progress.isDone('ex'));
});

test('progression: upprepning räknas, ledtrådar summeras och felsvar sparas utan dubbletter (max 5)', () => {
  const { progress } = newProgress();
  const meta = { id: 'p1', type: 'practice', itemType: 't' };
  progress.recordStep(meta, { attempts: 1, hintLevel: 1, correct: true, wrongInputs: ['1', '2'] });
  progress.recordStep(meta, { attempts: 1, hintLevel: 3, correct: true, wrongInputs: ['2', '3', '4', '5', '6'] });
  const item = progress.getItem('p1');
  assert.equal(item?.reviews, 1);
  assert.equal(item?.hintsUsed, 4);
  assert.equal(item?.hintMax, 3);
  assert.equal(item?.attempts, 2);
  assert.equal(item?.wrongAnswers.length, 5);
  assert.equal(new Set(item?.wrongAnswers).size, 5);
});

test('progression: sparas och läses in igen från samma lagring', async () => {
  const backend = createMemoryBackend();
  const a = newProgress({ backend });
  a.progress.recordStep({ id: 'p1', type: 'practice', itemType: 't' }, { attempts: 1, correct: true });
  a.progress.setNickname('  Sam  ');
  await new Promise((r) => setTimeout(r, 0));

  const b = newProgress({ backend });
  await b.progress.ready;
  assert.ok(b.progress.isDone('p1'));
  assert.equal(b.progress.getType('t')?.box, 2);
  assert.equal(b.progress.getProfile().nickname, 'Sam', 'smeknamnet trimmas');
});

test('progression: ta bort allt tömmer både minne och lagring', async () => {
  const backend = createMemoryBackend();
  const { progress } = newProgress({ backend });
  progress.recordStep({ id: 'p1', type: 'practice', itemType: 't' }, { correct: true });
  progress.setNickname('Sam');
  await progress.clearAll();
  assert.ok(!progress.isDone('p1'));
  assert.equal(progress.getProfile().nickname, undefined);
  assert.deepEqual(await backend.all(), []);
});

test('progression: lagring som felar stoppar inte appen', async () => {
  const broken = { ...createMemoryBackend(), kind: /** @type {const} */ ('idb'), set: async () => { throw new Error('full'); }, all: async () => { throw new Error('läsfel'); } };
  const { progress } = newProgress({ backend: broken });
  await progress.ready; // kastar inte
  assert.equal(progress.isPersistent(), false);
  progress.recordStep({ id: 'p1', type: 'practice', itemType: 't' }, { correct: true });
  assert.ok(progress.isDone('p1'), 'det som görs nu gäller under sessionen');
});

test('progression: smeknamn är valfritt och kan tas bort', () => {
  const { progress } = newProgress();
  progress.setNickname('Kim');
  assert.equal(progress.getProfile().nickname, 'Kim');
  progress.setNickname('   ');
  assert.equal(progress.getProfile().nickname, undefined);
  progress.setNickname('x'.repeat(100));
  assert.equal(progress.getProfile().nickname?.length, 30);
});

// ---------- Sammanfattning ----------

test('sammanfattning: räknar klara steg per lektion och modul', () => {
  const modules = [
    { id: 'm1', title: 'Procent', lessons: [
      { id: 'l1', title: 'A', steps: [{ id: 's1' }, { id: 's2' }, { id: 's3' }] },
      { id: 'l2', title: 'B', steps: [{ id: 's4' }] },
    ] },
  ];
  const done = new Set(['s1', 's2', 's4']);
  const s = summarize(modules, (id) => done.has(id));
  assert.equal(s.done, 3);
  assert.equal(s.total, 4);
  assert.equal(s.modules[0].lessons[0].status, 'inProgress');
  assert.equal(s.modules[0].lessons[1].status, 'done');
  assert.equal(summarize(modules, () => false).modules[0].lessons[0].status, 'notStarted');
});

// ---------- Dagens pass ----------

test('Dagens pass: tomt tills eleven har övat något', async () => {
  const { modules } = await loadRealContent();
  const s = buildSession({ modules, items: new Map(), types: new Map(), today: DAY });
  assert.deepEqual(s.tasks, []);
});

test('Dagens pass: blandar uppgifter från övade typer, och samma läge ger samma pass', async () => {
  const { modules } = await loadRealContent();
  const { progress } = newProgress();
  progress.recordStep({ id: 'pv1-p1', type: 'practice', itemType: 'procent-av-tal' }, { attempts: 1, correct: true });
  progress.recordStep({ id: 'pv1-p6', type: 'practice', itemType: 'procent-fran-delen' }, { attempts: 1, correct: true });
  const build = () => buildSession({ modules, items: progress.itemsMap(), types: progress.typesMap(), today: DAY, size: 6 });
  const a = build();
  assert.equal(a.tasks.length, 6);
  assert.deepEqual(JSON.stringify(build()), JSON.stringify(a), 'inget slumpas');

  const types = a.tasks.map((t) => t.itemType);
  assert.ok(new Set(types).size === 2, 'båda övade typerna med');
  // De fyra första alternerar. Sist kan samma typ komma två gånger, eftersom den andra typen
  // bara har en uppgift och en parallell version.
  for (let i = 1; i < 4; i++) assert.ok(types[i] !== types[i - 1], `typerna blandas: ${types.join(', ')}`);
  // Typer som inte övats kommer inte med (helheten-fran-procent har inte gjorts)
  assert.ok(!types.includes('helheten-fran-procent'));
  assert.equal(new Set(a.tasks.map((t) => t.step.id)).size, 6, 'inga dubbletter');
});

test('Dagens pass: repetition som är dags kommer först, lägst låda först', async () => {
  const { modules } = await loadRealContent();
  const types = new Map([
    ['procent-av-tal', { box: 3, due: '2026-11-09', lastSeen: '2026-11-06', reviews: 2 }],
    ['procent-fran-delen', { box: 1, due: '2026-11-10', lastSeen: '2026-11-10', reviews: 1 }],
    ['helheten-fran-procent', { box: 2, due: '2026-11-20', lastSeen: '2026-11-10', reviews: 1 }],
  ]);
  const s = buildSession({ modules, items: new Map(), types, today: DAY, size: 6 });
  assert.equal(s.dueCount, s.tasks.filter((t) => t.reason === 'due').length);
  assert.equal(s.tasks[0].itemType, 'procent-fran-delen', 'låda 1 före låda 3');
  assert.equal(s.tasks[1].itemType, 'procent-av-tal');
  assert.equal(s.tasks[2].itemType, 'helheten-fran-procent');
  assert.equal(s.tasks[2].reason, 'mix', 'inte förfallen, men blandas in');
  assert.ok(s.dueCount >= 2);
});

test('Dagens pass: uppgifter som setts längst sedan väljs först, och parallella versioner används när alla gjorts', async () => {
  const { modules } = await loadRealContent();
  const types = new Map([['procent-av-tal', { box: 2, due: DAY, lastSeen: DAY, reviews: 1 }]]);
  const items = new Map([
    ['pv1-p1', { lastSeen: '2026-11-09', reviews: 0 }],
    ['pv1-p2', { lastSeen: '2026-11-01', reviews: 0 }],
    ['pv1-p3', { lastSeen: '2026-11-05', reviews: 0 }],
    ['pv1-p4', { lastSeen: '2026-11-08', reviews: 0 }],
  ]);
  const s = buildSession({ modules, items, types, today: DAY, size: 6 });
  assert.deepEqual(s.tasks.slice(0, 4).map((t) => t.itemId), ['pv1-p2', 'pv1-p3', 'pv1-p4', 'pv1-p1']);
  assert.ok(s.tasks.slice(0, 4).every((t) => !t.variant));
  assert.ok(s.tasks.slice(4).every((t) => t.variant), 'därefter parallella versioner med nya tal');
  const v = s.tasks[4].step;
  assert.ok(v.id.endsWith('~p'));
  assert.equal(v.hints, undefined, 'parallella versioner har ingen ledtrådstrappa');
  assert.equal(v.baseId, 'pv1-p2');
  assert.equal(v.answer.value, 200);
});

test('Dagens pass: en uppgift som gjorts ett udda antal gånger visas som parallell version', async () => {
  const { modules } = await loadRealContent();
  const types = new Map([['procent-fran-delen', { box: 2, due: DAY, lastSeen: DAY, reviews: 1 }]]);
  const items = new Map([['pv1-p6', { lastSeen: DAY, reviews: 1 }]]);
  const s = buildSession({ modules, items, types, today: DAY, size: 2 });
  assert.equal(s.tasks[0].variant, true);
  assert.equal(s.tasks[0].step.prompt.text.includes('500'), true, 'parallella talen (500 kr)');
});

test('Dagens pass: passet blir en lektion som spelaren kan spela', async () => {
  const { modules } = await loadRealContent();
  const types = new Map([['procent-av-tal', { box: 1, due: DAY, lastSeen: DAY, reviews: 1 }]]);
  const s = buildSession({ modules, items: new Map(), types, today: DAY, size: 3 });
  const lesson = sessionLesson(s.tasks);
  assert.equal(lesson.steps.length, 3);
  assert.ok(lesson.steps.every((/** @type {any} */ st) => st.type === 'practice' && st.answer));
  const v = makeVariant({ id: 'x', structure: 'delen-saknas', itemType: 't', context: 'c', parallel: { prompt: { text: 'P' }, answer: { kind: 'number', value: 1 } } });
  assert.equal(v.id, 'x~p');
  assert.equal(answerToInput(v.answer), '1');
});
