// @ts-check
import { test, assert } from '../../../tests/harness.js';
import { loadRealContent } from '../../../tests/helpers.js';
import { createTeacherCode } from './teacherCode.js';
import { createStudentsStore } from './studentsStore.js';
import { moduleOverview, practiceStats, byHints, withWrongAnswers } from './aggregate.js';
import { createMemoryBackend } from '../progress/db.js';
import { createProgress } from '../progress/progressStore.js';
import { parseStudentExport } from '../progress/exportData.js';

const DAY = '2026-11-10';

function fakeStorage() {
  /** @type {Record<string, string>} */
  const data = {};
  return {
    data,
    getItem: (/** @type {string} */ k) => (k in data ? data[k] : null),
    setItem: (/** @type {string} */ k, /** @type {string} */ v) => { data[k] = v; },
    removeItem: (/** @type {string} */ k) => { delete data[k]; },
  };
}

// ---------- Lärarkod ----------

test('lärarkod: sätts, låser och låser upp, och den riktiga koden sparas aldrig', async () => {
  const storage = fakeStorage();
  const code = createTeacherCode({ storage });
  assert.equal(code.hasCode(), false);
  assert.equal(await code.unlock('x'), false, 'ingen kod satt');

  assert.deepEqual(await code.setCode('abc'), { ok: false, error: 'Koden måste vara minst 4 tecken.' });
  assert.deepEqual(await code.setCode('x'.repeat(65)), { ok: false, error: 'Koden får vara högst 64 tecken.' });
  assert.deepEqual(await code.setCode('hemlig1'), { ok: true });
  assert.ok(code.hasCode());
  assert.ok(code.isUnlocked(), 'upplåst efter att koden satts');
  assert.ok(!JSON.stringify(storage.data).includes('hemlig1'), 'koden sparas inte i klartext');

  code.lock();
  assert.equal(code.isUnlocked(), false);
  assert.equal(await code.unlock('fel kod'), false);
  assert.equal(code.isUnlocked(), false);
  assert.equal(await code.unlock('hemlig1'), true);
  assert.equal(code.isUnlocked(), true);
});

test('lärarkod: samma kod ger olika sparade värden (salt), och koden kan tas bort', async () => {
  const a = fakeStorage();
  const b = fakeStorage();
  await createTeacherCode({ storage: a }).setCode('samma-kod');
  await createTeacherCode({ storage: b }).setCode('samma-kod');
  assert.notEqual(a.data['ms.teacher'], b.data['ms.teacher']);

  const code = createTeacherCode({ storage: a });
  code.clear();
  assert.equal(code.hasCode(), false);
  assert.equal(a.data['ms.teacher'], undefined);
});

test('lärarkod: fungerar även utan Web Crypto (adresser som inte är https) och klarar trasig lagring', async () => {
  const storage = fakeStorage();
  const code = createTeacherCode({ storage, subtle: undefined, randomBytes: (n) => new Uint8Array(n).fill(7) });
  await code.setCode('abcd1');
  code.lock();
  assert.equal(await code.unlock('abcd1'), true);
  assert.equal(await code.unlock('abcd2'), false);

  const broken = createTeacherCode({ storage: { getItem: () => { throw new Error('x'); }, setItem: () => { throw new Error('x'); }, removeItem: () => {} } });
  assert.equal(broken.hasCode(), false);
  const r = await broken.setCode('abcd1');
  assert.equal(r.ok, false);
});

// ---------- Elevlager ----------

test('elevlager: lägger till, ersätter samma elev, sorterar, tar bort och sparar', async () => {
  const backend = createMemoryBackend();
  const store = createStudentsStore({ backend, now: () => 'nu' });
  let calls = 0;
  store.subscribe(() => { calls++; });
  const student = (/** @type {string} */ id, /** @type {string | undefined} */ nickname) => ({ id, nickname, exportedAt: '', items: {}, types: {} });
  store.add(student('bbbbbbbb', 'Sam'));
  store.add(student('aaaaaaaa', 'Kim'));
  store.add({ ...student('aaaaaaaa', 'Kim'), exportedAt: 'nyare' });
  assert.deepEqual(store.list().map((s) => s.nickname), ['Kim', 'Sam']);
  assert.equal(store.list()[0].exportedAt, 'nyare', 'samma id ersätts');
  assert.equal(store.list()[0].importedAt, 'nu');
  assert.equal(calls, 3);

  await new Promise((r) => setTimeout(r, 0));
  const again = createStudentsStore({ backend });
  await again.ready;
  assert.equal(again.list().length, 2, 'finns kvar när appen startas om');

  store.remove('bbbbbbbb');
  assert.equal(store.list().length, 1);
  await store.clear();
  assert.equal(store.list().length, 0);
  assert.deepEqual((await backend.all()).filter(([k]) => k.startsWith('student:')), []);
});

// ---------- Sammanställning ----------

const modules = [
  { id: 'm1', title: 'Procent', lessons: [{ id: 'l1', title: 'Rabatt', steps: [
    { id: 'ex1', type: 'workedExample' },
    { id: 'p1', type: 'practice', prompt: { text: 'Första uppgiften.' } },
    { id: 'p2', type: 'practice', prompt: { text: 'Andra uppgiften.' } },
  ] }] },
  { id: 'm2', title: 'Tom', lessons: [] },
];

/** @param {string} id @param {string} nickname @param {Record<string, any>} items */
const student = (id, nickname, items) => ({ id, nickname, exportedAt: '', types: {}, items });
const rec = (/** @type {object} */ o) => ({ attempts: 1, hintsUsed: 0, hintMax: 0, done: true, lastSeen: DAY, reviews: 0, wrongAnswers: [], ...o });

const kim = student('kim00000', 'Kim', { ex1: rec({}), p1: rec({ hintMax: 3, hintsUsed: 3, attempts: 4, wrongAnswers: ['7', '12'] }) });
const sam = student('sam00000', 'Sam', { ex1: rec({}), p1: rec({ hintMax: 1, attempts: 2, wrongAnswers: ['7'] }), p2: rec({}) });
const ola = student('ola00000', 'Ola', {});

test('sammanställning: översikt per modul visar status i text, och hoppar över tomma moduler', () => {
  const rows = moduleOverview([kim, sam, ola], modules);
  assert.equal(rows[0].modules.length, 1, 'modulen utan lektioner är med inte');
  assert.deepEqual(rows.map((r) => r.modules[0].status), ['inProgress', 'done', 'notStarted']);
  assert.deepEqual(rows.map((r) => `${r.total.done}/${r.total.total}`), ['2/3', '3/3', '0/3']);
});

test('sammanställning: ledtrådar och försök per övningsuppgift', () => {
  const stats = practiceStats([kim, sam, ola], modules);
  assert.deepEqual(stats.map((s) => s.id), ['p1', 'p2']);
  const p1 = stats[0];
  assert.equal(p1.students, 2);
  assert.equal(p1.neededHint, 2);
  assert.equal(p1.avgHintMax, 2);
  assert.equal(p1.avgAttempts, 3);
  assert.equal(p1.prompt, 'Första uppgiften.');
  assert.equal(stats[1].neededHint, 0);
  assert.deepEqual(byHints(stats).map((s) => s.id), ['p1', 'p2'], 'mest hjälp först');
});

test('sammanställning: vanligaste felsvar räknas per elev, flest först', () => {
  const stats = practiceStats([kim, sam], modules);
  assert.deepEqual(stats[0].topWrong, [{ value: '7', count: 2 }, { value: '12', count: 1 }]);
  assert.deepEqual(withWrongAnswers(stats).map((s) => s.id), ['p1'], 'uppgifter utan felsvar tas inte med');
  assert.deepEqual(practiceStats([ola], modules), [], 'ingen har gjort något');
});

test('sammanställning: fungerar med riktiga filer från elever', async () => {
  const { modules: real } = await loadRealContent();
  const p = createProgress({ backend: createMemoryBackend(), today: () => DAY });
  p.setNickname('Kim');
  p.recordStep({ id: 'pv1-ex1', type: 'workedExample' }, {});
  p.recordStep({ id: 'pv1-p1', type: 'practice', itemType: 'procent-av-tal' }, { attempts: 2, hintLevel: 2, correct: true, wrongInputs: ['7'] });
  const parsed = parseStudentExport(JSON.stringify(p.exportData()));
  assert.ok(parsed.ok);
  if (!parsed.ok) return;
  const stats = practiceStats([parsed.student], real);
  assert.equal(stats.length, 1);
  assert.ok(stats[0].prompt.includes('jacka'));
  assert.equal(moduleOverview([parsed.student], real)[0].total.done, 2);
});

// ---------- Vyer (webbläsare) ----------

/** @param {HTMLElement} root @param {string} text */
const button = (root, text) =>
  /** @type {HTMLButtonElement | undefined} */ ([...root.querySelectorAll('button')].find((b) => (b.textContent || '').replace(/\s/g, ' ') === text));
const wait = (/** @type {number} */ ms = 30) => new Promise((r) => setTimeout(r, ms));

/** @param {HTMLInputElement} input @param {string} value */
function type(input, value) {
  input.value = value;
}

test('lärarvy: sätta kod, låsa, låsa upp med vänliga meddelanden', async () => {
  const { teacherView } = await import('./teacherView.js');
  const { modules: real } = await loadRealContent();
  const teacher = { code: createTeacherCode({ storage: fakeStorage() }), students: createStudentsStore({ backend: createMemoryBackend() }) };
  const view = teacherView({ teacher, content: { modules: real } });
  document.body.append(view.el);
  try {
    assert.equal(view.el.querySelectorAll('h1').length, 1);
    assert.ok(view.el.textContent?.includes('Välj en lärarkod'));
    assert.ok(view.el.textContent?.includes('inte ett säkert lösenord'), 'ärligt om vad koden är');

    const submit = async (/** @type {string[]} */ values) => {
      const inputs = /** @type {HTMLInputElement[]} */ ([...view.el.querySelectorAll('input[type="password"]')]);
      values.forEach((v, i) => type(inputs[i], v));
      /** @type {HTMLFormElement} */ (inputs[0].form).requestSubmit();
      await wait(250);
    };
    const alertText = () => view.el.querySelector('[role="alert"]:not([hidden])')?.textContent ?? '';

    await submit(['abc', 'abc']);
    assert.equal(alertText(), 'Koden måste vara minst 4 tecken.');
    await submit(['hemlig1', 'hemlig2']);
    assert.ok(alertText().includes('inte lika'));
    await submit(['hemlig1', 'hemlig1']);
    assert.ok(view.el.textContent?.includes('Läs in elevfiler'), 'lärarvyn öppnas när koden satts');
    assert.ok(view.el.textContent?.includes('Inga elever är inlästa än.'));

    button(view.el, 'Lås lärarvyn')?.click();
    assert.ok(view.el.textContent?.includes('Lås upp lärarvyn'));
    await submit(['nej nej']);
    assert.equal(alertText(), 'Koden stämde inte. Prova igen.');
    assert.ok(!/\bfel\b/i.test(view.el.textContent || ''));
    await submit(['hemlig1']);
    assert.ok(view.el.textContent?.includes('Läs in elevfiler'));
  } finally {
    view.dispose();
    view.el.remove();
  }
}, { browserOnly: true });

test('lärarvy: glömd kod kan tas bort med bekräftelse, och vyn låses när man lämnar den', async () => {
  const { teacherView } = await import('./teacherView.js');
  const teacher = { code: createTeacherCode({ storage: fakeStorage() }), students: createStudentsStore({ backend: createMemoryBackend() }) };
  await teacher.code.setCode('hemlig1');
  teacher.code.lock();
  const view = teacherView({ teacher, content: { modules: [] } });
  document.body.append(view.el);
  try {
    assert.ok(view.el.textContent?.includes('Lås upp lärarvyn'));
    button(view.el, 'Jag har glömt koden')?.click();
    button(view.el, 'Ta bort koden')?.click();
    assert.equal(teacher.code.hasCode(), false);
    assert.ok(view.el.textContent?.includes('Välj en lärarkod'));
  } finally {
    view.el.remove();
  }
  await teacher.code.setCode('ny-kod1');
  view.dispose();
  assert.equal(teacher.code.isUnlocked(), false, 'låses när läraren lämnar vyn');
}, { browserOnly: true });

test('lärarvy: läs in elevfiler, se tabeller, ta bort en elev och alla', async () => {
  const { teacherView } = await import('./teacherView.js');
  const { modules: real } = await loadRealContent();
  const teacher = { code: createTeacherCode({ storage: fakeStorage() }), students: createStudentsStore({ backend: createMemoryBackend() }) };
  await teacher.code.setCode('hemlig1');

  const p = createProgress({ backend: createMemoryBackend(), today: () => DAY });
  p.setNickname('Kim');
  p.recordStep({ id: 'pv1-ex1', type: 'workedExample' }, {});
  p.recordStep({ id: 'pv1-p1', type: 'practice', itemType: 'procent-av-tal' }, { attempts: 2, hintLevel: 2, correct: true, wrongInputs: ['7'] });

  const view = teacherView({ teacher, content: { modules: real } });
  document.body.append(view.el);
  try {
    const input = /** @type {HTMLInputElement} */ (view.el.querySelector('#elevfiler'));
    const dt = new DataTransfer();
    dt.items.add(new File([JSON.stringify(p.exportData())], 'kim.json', { type: 'application/json' }));
    dt.items.add(new File(['det här är ingen exportfil'], 'trasig.json', { type: 'application/json' }));
    input.files = dt.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await wait(150);

    const text = view.el.textContent || '';
    assert.ok(text.includes('Kim: inläst från kim.json.'), text.slice(0, 400));
    assert.ok(text.includes('trasig.json: kunde inte läsas. Filen är inte en exportfil från Mattesteget.'));
    assert.equal(teacher.students.list().length, 1);

    const tables = [...view.el.querySelectorAll('table')];
    assert.equal(tables.length, 2, 'översikt och ledtrådar');
    assert.ok(tables.every((t) => t.querySelector('caption') && t.querySelector('th[scope="col"]') && t.querySelector('th[scope="row"]')), 'tabeller med rubriker');
    assert.ok(tables[0].textContent?.includes('Pågår, 2 av 11'), 'status skrivs med ord, inte bara färg');
    assert.ok(tables[1].textContent?.includes('jacka'), 'ledtrådstabellen visar uppgiftens text');
    assert.ok(tables[1].textContent?.includes('1 av 1'), 'en elev av en behövde ledtråd');
    assert.ok(text.includes('"7" – 1 elev'), 'vanligaste felsvar');

    // samma elev igen ersätter
    input.files = dt.files;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await wait(150);
    assert.equal(teacher.students.list().length, 1);

    button(view.el, 'Ta bort')?.click();
    assert.equal(teacher.students.list().length, 0);
    assert.ok(view.el.textContent?.includes('Inga elever är inlästa än.'));

    teacher.students.add(/** @type {any} */ (parseStudentExport(JSON.stringify(p.exportData())).ok && parseStudentExport(JSON.stringify(p.exportData()))).student);
    button(view.el, 'Ta bort alla elevfiler')?.click();
    assert.equal(teacher.students.list().length, 1, 'inget togs bort före bekräftelsen');
    button(view.el, 'Ja, ta bort alla')?.click();
    await wait();
    assert.equal(teacher.students.list().length, 0);
    assert.equal(view.el.querySelectorAll('[style]').length, 0);
  } finally {
    view.dispose();
    view.el.remove();
  }
}, { browserOnly: true });

test('delning i Min resa: fil och sammanfattning, med reserv när urklipp är blockerat', async () => {
  const { shareSection } = await import('../progress/shareSection.js');
  const { modules: real } = await loadRealContent();
  const progress = createProgress({ backend: createMemoryBackend(), today: () => DAY });
  progress.setNickname('Kim');
  progress.recordStep({ id: 'pv1-p1', type: 'practice', itemType: 'procent-av-tal' }, { attempts: 1, hintLevel: 1, correct: true });

  /** @type {{ name: string, text: string }[]} */
  const downloads = [];
  /** @type {string[]} */
  const copied = [];
  const host = document.createElement('div');
  let clipboardWorks = true;
  host.append(...shareSection({
    progress, modules: real,
    download: (name, text) => downloads.push({ name, text }),
    clipboard: { writeText: async (t) => { if (!clipboardWorks) throw new Error('blockerat'); copied.push(t); } },
    now: () => new Date('2026-11-10T08:00:00Z'),
  }));
  document.body.append(host);
  try {
    button(host, 'Spara som fil')?.click();
    assert.equal(downloads.length, 1);
    assert.equal(downloads[0].name, 'mattesteget-kim-2026-11-10.json');
    assert.ok(parseStudentExport(downloads[0].text).ok, 'filen går att läsa in i lärarvyn');
    assert.ok(host.querySelector('.share-status')?.textContent?.includes('mattesteget-kim-2026-11-10.json'));

    button(host, 'Kopiera sammanfattning')?.click();
    await wait();
    assert.equal(copied.length, 1);
    assert.ok(copied[0].includes('Smeknamn: Kim') && copied[0].includes('Totalt: 1 av 16 steg') && copied[0].includes('Steg där jag använde ledtråd: 1'));
    assert.equal(host.querySelector('.share-status')?.textContent, 'Sammanfattningen är kopierad. Klistra in den där du vill dela den.');

    clipboardWorks = false;
    button(host, 'Kopiera sammanfattning')?.click();
    await wait();
    const box = /** @type {HTMLTextAreaElement} */ (host.querySelector('.share-fallback'));
    assert.equal(box.hidden, false);
    assert.ok(box.value.includes('Totalt:'));
    assert.ok(host.querySelector('.share-status')?.textContent?.includes('Markera texten'));
  } finally {
    host.remove();
  }
}, { browserOnly: true });
