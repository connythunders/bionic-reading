// @ts-check
import { test, assert } from '../../../tests/harness.js';
import { exportFileName, summaryText, parseStudentExport, displayName } from './exportData.js';
import { createMemoryBackend } from './db.js';
import { createProgress } from './progressStore.js';

const DAY = '2026-11-10';
const modules = [
  { id: 'm1', title: 'Procent', lessons: [{ id: 'l1', title: 'A', steps: [{ id: 's1' }, { id: 's2' }, { id: 's3' }] }] },
  { id: 'm2', title: 'Bråk', lessons: [{ id: 'l2', title: 'B', steps: [{ id: 's4' }] }] },
  { id: 'm3', title: 'Tom', lessons: [] },
];

function newProgress() {
  const backend = createMemoryBackend();
  return { backend, progress: createProgress({ backend, today: () => DAY }) };
}

test('export: filnamn blir enkla och utan konstiga tecken', () => {
  assert.equal(exportFileName({ nickname: 'Kim', day: DAY }), 'mattesteget-kim-2026-11-10.json');
  assert.equal(exportFileName({ nickname: 'Åsa Öberg!', day: DAY }), 'mattesteget-asa-oberg-2026-11-10.json');
  assert.equal(exportFileName({ day: DAY }), 'mattesteget-elev-2026-11-10.json');
  assert.equal(exportFileName({ nickname: '???', day: DAY }), 'mattesteget-elev-2026-11-10.json');
});

test('export: sammanfattningen innehåller bara antal steg, utan ledtrådsdetaljer eller svar', () => {
  const text = summaryText({ nickname: 'Kim', modules, isDone: (id) => ['s1', 's4'].includes(id), helpedSteps: 2, day: DAY });
  assert.equal(text, [
    'Mattesteget – sammanfattning (2026-11-10)',
    'Smeknamn: Kim',
    'Procent: 1 av 3 steg',
    'Bråk: 1 av 1 steg',
    'Totalt: 2 av 4 steg',
    'Steg där jag använde ledtråd: 2',
  ].join('\n'));
  assert.ok(!summaryText({ modules, isDone: () => false, helpedSteps: 0, day: DAY }).includes('Smeknamn'), 'smeknamn är valfritt');
});

test('export: filen har app, version, ett slumpat id och smeknamnet, men inget annat om eleven', () => {
  const { progress } = newProgress();
  progress.setNickname('Kim');
  progress.recordStep({ id: 'p1', type: 'practice', itemType: 't' }, { attempts: 2, hintLevel: 1, correct: true, wrongInputs: ['7'] });
  const data = progress.exportData(new Date('2026-11-10T08:30:00Z'));
  assert.equal(data.app, 'mattesteget');
  assert.equal(data.version, 1);
  assert.equal(data.exportedAt, '2026-11-10T08:30:00.000Z');
  assert.equal(data.student.nickname, 'Kim');
  assert.atLeast(data.student.id.length, 8);
  assert.deepEqual(Object.keys(data).sort(), ['app', 'exportedAt', 'items', 'student', 'types', 'version']);
  assert.deepEqual(Object.keys(data.student).sort(), ['id', 'nickname']);
  assert.equal(data.items.p1.wrongAnswers[0], '7');
  assert.equal(progress.exportData().student.id, data.student.id, 'samma id varje gång');
});

test('export: ta bort allt ger ett nytt id men rör inte lärarens elevdata i samma lagring', async () => {
  const { progress, backend } = newProgress();
  const first = progress.exportData().student.id;
  progress.recordStep({ id: 'p1', type: 'practice', itemType: 't' }, { correct: true });
  await backend.set('student:abc-123-xyz', { id: 'abc-123-xyz' });
  await new Promise((r) => setTimeout(r, 0));
  await progress.clearAll();
  assert.deepEqual((await backend.all()).map(([k]) => k), ['student:abc-123-xyz']);
  assert.notEqual(progress.exportData().student.id, first);
});

test('import: en exportfil läses in och går runt', () => {
  const { progress } = newProgress();
  progress.setNickname('Kim');
  progress.recordStep({ id: 'p1', type: 'practice', itemType: 't' }, { attempts: 3, hintLevel: 2, correct: true, wrongInputs: ['1', '2'] });
  const r = parseStudentExport(JSON.stringify(progress.exportData()));
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.student.nickname, 'Kim');
  assert.equal(r.student.items.p1.attempts, 3);
  assert.equal(r.student.items.p1.hintMax, 2);
  assert.deepEqual(r.student.items.p1.wrongAnswers, ['1', '2']);
  assert.equal(r.student.types.t.box, 1);
});

test('import: filer som inte är exportfiler avvisas med vänliga meddelanden', () => {
  const bad = (/** @type {string} */ text) => {
    const r = parseStudentExport(text);
    assert.equal(r.ok, false, text.slice(0, 40));
    return r.ok ? '' : r.error;
  };
  assert.ok(bad('inte json').includes('inte en exportfil'));
  assert.ok(bad('{"app":"annat"}').includes('inte en exportfil'));
  assert.ok(bad('null').includes('inte en exportfil'));
  assert.ok(bad('{"app":"mattesteget","version":2}').includes('annan version'));
  assert.ok(bad('{"app":"mattesteget","version":1,"student":{"id":"x"}}').includes('elev-id'));
  assert.ok(bad('x'.repeat(1_000_001)).includes('för stor'));
  for (const text of ['inte json', '{"app":"annat"}', '{"app":"mattesteget","version":2}']) assert.ok(!/\bfel\b/i.test(bad(text)));
});

test('import: oväntade värden rensas och farliga nycklar ignoreras', () => {
  const file = {
    app: 'mattesteget', version: 1, exportedAt: DAY,
    student: { id: 'abcdefgh-1234', nickname: `${'x'.repeat(100)}` },
    items: {
      a: { attempts: -5, hintsUsed: 'många', hintMax: 99, done: 'ja', lastSeen: 'igår', reviews: 1.5, wrongAnswers: ['1', 2, 'x'.repeat(200), '3', '4', '5', '6', '7'] },
      b: 'inte ett objekt',
    },
    types: { t: { box: 99, due: '2026-11-11', lastSeen: 'nej', reviews: 2 } },
  };
  const json = JSON.stringify(file).replace('"items":{', '"items":{"__proto__":{"done":true},');
  const r = parseStudentExport(json);
  assert.ok(r.ok);
  if (!r.ok) return;
  assert.equal(r.student.nickname?.length, 30);
  assert.deepEqual(Object.keys(r.student.items), ['a']);
  const a = r.student.items.a;
  assert.equal(a.attempts, 0);
  assert.equal(a.hintsUsed, 0);
  assert.equal(a.hintMax, 4);
  assert.equal(a.done, false, 'bara true räknas som klar');
  assert.equal(a.lastSeen, '');
  assert.equal(a.reviews, 0);
  assert.equal(a.wrongAnswers.length, 5);
  assert.ok(a.wrongAnswers.every((w) => typeof w === 'string' && w.length <= 40));
  assert.equal(r.student.types.t.box, 5);
  assert.equal(/** @type {any} */ ({}).done, undefined, 'globala objekt är orörda');
});

test('import: elever med samma smeknamn får en kort kod så att de går att skilja åt', () => {
  const all = [{ id: 'aaaa1111', nickname: 'Kim' }, { id: 'bbbb2222', nickname: 'Kim' }, { id: 'cccc3333', nickname: 'Sam' }, { id: 'dddd4444' }];
  assert.equal(displayName(all[0], all), 'Kim (aaaa)');
  assert.equal(displayName(all[1], all), 'Kim (bbbb)');
  assert.equal(displayName(all[2], all), 'Sam');
  assert.equal(displayName(all[3], all), 'Elev (dddd)');
});
