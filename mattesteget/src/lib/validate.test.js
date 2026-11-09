// @ts-check
import { test, assert } from '../../tests/harness.js';
import { validateModule, validateModules } from './validate.js';

/** @param {string} text @param {string} [speak] */
const rt = (text, speak) => (speak ? { text, speak } : { text });

const solution = () => ({ steps: [{ text: rt('Dela med 2.') }, { text: rt('Då är du klar.') }] });

/** @param {string} id */
function practice(id) {
  return {
    type: 'practice', id, structure: 'delen-saknas', itemType: 'procent-av-tal', context: 'rabatt',
    prompt: rt('Vad är hälften av 10? Svara med ett tal.'),
    answer: { kind: 'number', value: 5 },
    hints: {
      reread: true,
      representation: { kind: 'percentBar', config: {}, caption: rt('Stapeln visar tio.') },
      firstStep: rt('Dela med 2.'),
      fullSolution: solution(),
    },
  };
}

/** @param {string} id @param {number} [fading] */
function worked(id, fading = 0) {
  const steps = [
    { text: rt('Första steget.') },
    { text: rt('Andra steget.'), ask: rt('Vad blir det?'), answer: { kind: 'number', value: 5 } },
    { text: rt('Sista steget.'), ask: rt('Vad blir svaret?'), answer: { kind: 'number', value: 5 } },
  ];
  return {
    type: 'workedExample', id, structure: 'delen-saknas', fading,
    prompt: rt('Vad är hälften av 10? Visa hur.'), steps, answer: { kind: 'number', value: 5 },
  };
}

/** @param {string} id */
function guided(id) {
  return {
    type: 'guidedStep', id, structure: 'delen-saknas', prompt: rt('Vad är hälften av 10? Gör ett steg i taget.'),
    parts: [
      { prompt: rt('Hur många delar är det?'), answer: { kind: 'number', value: 2 } },
      { prompt: rt('Hur stor är en del?'), answer: { kind: 'number', value: 5 } },
    ],
  };
}

/** @param {string} [id] */
function lesson(id = 'l-1') {
  return {
    id, title: 'Testlektion', goal: rt('Du lär dig något.'), representation: 'percentBar',
    steps: [worked('t-ex1'), guided('t-g1'), guided('t-g2'), ...[1, 2, 3, 4, 5, 6].map((n) => practice(`t-p${n}`))],
  };
}

/** @param {object} [over] */
function mod(over = {}) {
  return { id: 'test-modul', title: 'Testmodul', summary: 'Test.', order: 1, status: 'skeleton', lessons: [lesson()], ...over };
}

/** @param {string[]} errors @param {string} part */
const has = (errors, part) => errors.some((e) => e.includes(part));

test('validering: en korrekt modul ger inga fel', () => {
  assert.deepEqual(validateModule(mod()), []);
});

test('validering: formel utan talversion (speak) ger fel', () => {
  const m = mod();
  /** @type {any} */ (m.lessons[0].steps[0]).steps[0].formula = { expr: '1/4' };
  assert.ok(has(validateModule(m), 'speak'), 'ska klaga på saknad speak');
});

test('validering: talversion med symboler ger fel', () => {
  const m = mod();
  /** @type {any} */ (m.lessons[0].steps[0]).steps[0].formula = { expr: '1/4', speak: '1/4' };
  assert.ok(has(validateModule(m), 'med ord'));
});

test('validering: text med procenttecken kräver talversion', () => {
  const m = mod();
  /** @type {any} */ (m.lessons[0].steps[3]).prompt = rt('Rabatten är 25 %. Vad blir det?');
  assert.ok(has(validateModule(m), 'talversion saknas'));
  /** @type {any} */ (m.lessons[0].steps[3]).prompt = rt('Rabatten är 25 %. Vad blir det?', 'Rabatten är 25 procent. Vad blir det?');
  assert.deepEqual(validateModule(m), []);
});

test('validering: kursiv, understrykning och html avvisas, fetstil tillåts', () => {
  const m = mod();
  /** @type {any} */ (m.lessons[0]).goal = rt('Det här är *kursivt*.');
  assert.ok(has(validateModule(m), 'fetstil'));
  /** @type {any} */ (m.lessons[0]).goal = rt('Det här är **fetstil**.');
  assert.deepEqual(validateModule(m), []);
});

test('validering: ordet "fel" och kryss i text ger fel', () => {
  const m = mod();
  /** @type {any} */ (m.lessons[0]).goal = rt('Det blev fel.');
  assert.ok(has(validateModule(m), 'vänlig'));
});

test('validering: uppgiftstext med fler än två meningar ger fel', () => {
  const m = mod();
  /** @type {any} */ (m.lessons[0].steps[3]).prompt = rt('Första. Andra. Tredje.');
  assert.ok(has(validateModule(m), 'meningar'));
});

test('validering: dolt steg (fading) utan fråga och facit ger fel', () => {
  const m = mod();
  const ex = /** @type {any} */ (m.lessons[0].steps[0]);
  ex.fading = 1;
  delete ex.steps[2].ask;
  delete ex.steps[2].answer;
  const errors = validateModule(m);
  assert.ok(has(errors, 'ask') && has(errors, 'answer'));
});

test('validering: det första lösta exemplet måste vara helt löst', () => {
  const m = mod();
  /** @type {any} */ (m.lessons[0].steps[0]).fading = 1;
  assert.ok(has(validateModule(m), 'helt löst'));
});

test('validering: saknad ledtrådsnivå ger fel', () => {
  const m = mod();
  delete /** @type {any} */ (m.lessons[0].steps[3]).hints.fullSolution;
  assert.ok(has(validateModule(m), 'nivå 4'));
});

test('validering: dubbla id:n ger fel', () => {
  const m = mod();
  /** @type {any} */ (m.lessons[0].steps[4]).id = 't-p1';
  assert.ok(has(validateModule(m), 'mer än en gång'));
  assert.ok(has(validateModules([mod(), mod()]), 'modul-id'));
});

test('validering: för få uppgifter ger fel, men draft-lektion är tillåten', () => {
  const m = mod();
  m.lessons[0].steps.pop();
  assert.ok(has(validateModule(m), 'minst 6 övningsuppgifter'));
  /** @type {any} */ (m.lessons[0]).draft = true;
  assert.deepEqual(validateModule(m), []);
});

test('validering: komplett modul kräver minst tre lektioner', () => {
  assert.ok(has(validateModule(mod({ status: 'full' })), 'minst 3 lektioner'));
  const three = [lesson('l-1'), lesson('l-2'), lesson('l-3')].map((l, i) => ({
    ...l,
    steps: l.steps.map((s) => ({ ...s, id: `${s.id}-${i}` })),
  }));
  assert.deepEqual(validateModule(mod({ status: 'full', lessons: three })), []);
});

test('validering: ordningen Visa, Tillsammans, Själv kontrolleras', () => {
  const m = mod();
  m.lessons[0].steps.push(/** @type {any} */ (worked('t-sent')));
  assert.ok(has(validateModule(m), 'efter första övningsuppgiften'));
});

test('validering: ogiltiga svar och okänd struktur ger fel', () => {
  const m = mod();
  /** @type {any} */ (m.lessons[0].steps[3]).answer = { kind: 'choice', options: [rt('A'), rt('B')], correct: [5] };
  /** @type {any} */ (m.lessons[0].steps[4]).structure = 'okand';
  const errors = validateModule(m);
  assert.ok(has(errors, 'finns inte bland alternativen'));
  assert.ok(has(errors, 'strukturtagg'));
});

test('validering: skräpindata kastar inte', () => {
  assert.ok(validateModule(null).length > 0);
  assert.ok(validateModule({}).length > 0);
  assert.ok(validateModule({ lessons: 'nej' }).length > 0);
});
