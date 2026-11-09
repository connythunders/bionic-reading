// @ts-check
// Validering av innehåll (moduler, lektioner, uppgifter). Ren logik utan DOM, så den körs
// både i webbläsaren och i Node. Returnerar en lista med felmeddelanden på svenska.
// Tom lista = giltigt.

export const REPRESENTATIONS = ['numberLine', 'fractionBars', 'percentBar', 'money', 'none'];
export const INTERACTIVE_KINDS = ['numberLine', 'fractionBars', 'percentBar', 'money'];
export const STRUCTURES = [
  'delen-saknas', 'helheten-saknas', 'procenten-saknas',
  'storst-minst', 'placera', 'omvandla', 'berakna',
];
export const MODULE_STATUS = ['full', 'skeleton'];

/** Minimikrav från specen. En lektion (som inte är markerad draft) ska ha minst så här mycket. */
export const MIN = { workedExamples: 1, guidedSteps: 2, practice: 6, lessonsInFullModule: 3 };

const ID_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const KEBAB_RE = /^[a-zåäö0-9]+(-[a-zåäö0-9]+)*$/;
const FORMULA_EXPR_RE = /^[0-9.,\s/*·×÷+\-−=%()?a-zA-ZåäöÅÄÖ]+$/;
const FORBIDDEN_WORD = /\b(fel|felaktig|felaktigt|kryss)\b/i;
const FORBIDDEN_CHARS = /[✗✘❌]/;
/** Symboler som en talsyntes läser dåligt. De ska inte finnas i talversioner. */
const SPEAK_SYMBOLS = /[%/*=+×÷·−<>]|\{\{/;
/** Text med dessa tecken (eller "kr") måste ha en egen talversion. */
const NEEDS_SPEAK = /[%/=+×÷·−]|\bkr\b/;

/** @param {unknown} v @returns {v is Record<string, any>} */
function isObj(v) {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
/** @param {unknown} v @returns {v is string} */
function isStr(v) {
  return typeof v === 'string' && v.trim().length > 0;
}
/** @param {unknown} v @returns {v is number} */
function isNum(v) {
  return typeof v === 'number' && Number.isFinite(v);
}

class Collector {
  constructor() {
    /** @type {string[]} */
    this.errors = [];
    /** @type {Set<string>} */
    this.ids = new Set();
  }
  /** @param {string} path @param {string} msg */
  add(path, msg) {
    this.errors.push(`${path}: ${msg}`);
  }
}

/**
 * @param {Collector} c @param {unknown} v @param {string} path
 */
function checkId(c, v, path) {
  if (!isStr(v) || !ID_RE.test(v)) {
    c.add(path, 'id saknas eller har fel form (små bokstäver, siffror och bindestreck)');
    return;
  }
  if (c.ids.has(v)) c.add(path, `id "${v}" används mer än en gång`);
  c.ids.add(v);
}

/**
 * @param {Collector} c @param {unknown} v @param {string} path
 */
function checkFormula(c, v, path) {
  if (!isObj(v)) return c.add(path, 'formeln måste vara ett objekt med expr och speak');
  if (!isStr(v.expr)) c.add(`${path}.expr`, 'saknas');
  else if (!FORMULA_EXPR_RE.test(v.expr)) c.add(`${path}.expr`, `innehåller tecken som inte stöds: "${v.expr}"`);
  if (!isStr(v.speak)) c.add(`${path}.speak`, 'talversion saknas (varje formel måste kunna läsas upp)');
  else {
    if (SPEAK_SYMBOLS.test(v.speak)) c.add(`${path}.speak`, `talversionen ska skrivas med ord, inte symboler: "${v.speak}"`);
    if (FORBIDDEN_WORD.test(v.speak)) c.add(`${path}.speak`, 'innehåller förbjudet ord');
  }
}

/**
 * @param {Collector} c @param {unknown} v @param {string} path
 * @param {{ prompt?: boolean }} [opts]  prompt: max 2 meningar och 200 tecken
 */
function checkRichText(c, v, path, opts = {}) {
  if (!isObj(v)) return c.add(path, 'texten måste vara ett objekt med fältet text');
  if (!isStr(v.text)) return c.add(`${path}.text`, 'saknas');
  const text = v.text;

  if (v.formulas !== undefined && !isObj(v.formulas)) c.add(`${path}.formulas`, 'måste vara ett objekt');
  const formulas = isObj(v.formulas) ? v.formulas : {};
  for (const [key, f] of Object.entries(formulas)) checkFormula(c, f, `${path}.formulas.${key}`);

  const used = new Set([...text.matchAll(/\{\{(\w+)\}\}/g)].map((m) => m[1]));
  for (const key of used) if (!(key in formulas)) c.add(path, `platshållaren {{${key}}} saknar formel`);
  for (const key of Object.keys(formulas)) if (!used.has(key)) c.add(path, `formeln "${key}" används inte i texten`);

  const plain = text.replace(/\*\*[^*]+\*\*/g, '').replace(/\{\{\w+\}\}/g, '');
  if (/[*_<>]/.test(plain)) c.add(`${path}.text`, 'bara **fetstil** är tillåtet (ingen kursiv, understrykning eller html)');
  if (FORBIDDEN_WORD.test(text) || FORBIDDEN_CHARS.test(text)) c.add(`${path}.text`, 'innehåller ordet "fel" eller kryss (återkoppling ska vara vänlig)');

  if (v.speak !== undefined) {
    if (!isStr(v.speak)) c.add(`${path}.speak`, 'måste vara en text');
    else {
      if (SPEAK_SYMBOLS.test(v.speak)) c.add(`${path}.speak`, `talversionen ska skrivas med ord, inte symboler: "${v.speak}"`);
      if (FORBIDDEN_WORD.test(v.speak)) c.add(`${path}.speak`, 'innehåller förbjudet ord');
    }
  } else if (NEEDS_SPEAK.test(plain)) {
    c.add(`${path}.speak`, 'talversion saknas (texten innehåller symboler eller "kr")');
  }

  if (opts.prompt) {
    const sentences = (text.match(/[.!?](?=\s|$)/g) || []).length;
    if (sentences > 2) c.add(`${path}.text`, `uppgiftstexten har ${sentences} meningar (max 2)`);
    if (text.length > 200) c.add(`${path}.text`, `uppgiftstexten är ${text.length} tecken (max 200)`);
  }
}

/**
 * @param {Collector} c @param {unknown} v @param {string} path
 */
function checkAnswer(c, v, path) {
  if (!isObj(v)) return c.add(path, 'facit saknas');
  switch (v.kind) {
    case 'number':
      if (!isNum(v.value)) c.add(`${path}.value`, 'måste vara ett tal');
      if (v.tolerance !== undefined && (!isNum(v.tolerance) || v.tolerance < 0)) c.add(`${path}.tolerance`, 'måste vara ett tal som är 0 eller större');
      if (v.unit !== undefined && !isStr(v.unit)) c.add(`${path}.unit`, 'måste vara en text');
      break;
    case 'fraction':
      if (!Number.isInteger(v.num)) c.add(`${path}.num`, 'täljaren måste vara ett heltal');
      if (!Number.isInteger(v.den) || v.den <= 0) c.add(`${path}.den`, 'nämnaren måste vara ett positivt heltal');
      break;
    case 'choice':
      if (!Array.isArray(v.options) || v.options.length < 2) c.add(`${path}.options`, 'minst två alternativ krävs');
      else v.options.forEach((o, i) => checkRichText(c, o, `${path}.options[${i}]`));
      if (!Array.isArray(v.correct) || v.correct.length === 0) c.add(`${path}.correct`, 'minst ett rätt alternativ krävs');
      else if (Array.isArray(v.options)) {
        for (const i of v.correct) {
          if (!Number.isInteger(i) || i < 0 || i >= v.options.length) c.add(`${path}.correct`, `index ${i} finns inte bland alternativen`);
        }
      }
      break;
    case 'numberLine':
      if (!isNum(v.target)) c.add(`${path}.target`, 'måste vara ett tal');
      if (!isNum(v.tolerance) || v.tolerance <= 0) c.add(`${path}.tolerance`, 'måste vara ett tal större än 0');
      break;
    default:
      c.add(`${path}.kind`, `okänd svarstyp "${String(v.kind)}"`);
  }
}

/**
 * @param {Collector} c @param {unknown} v @param {string} path
 */
function checkStructure(c, v, path) {
  if (!isStr(v) || !STRUCTURES.includes(v)) {
    c.add(path, `strukturtagg saknas eller är okänd (tillåtna: ${STRUCTURES.join(', ')})`);
  }
}

/** Steg i en lösning. Dolda steg (fading) måste ha fråga och facit.
 * @param {Collector} c @param {unknown} steps @param {string} path @param {number} hidden */
function checkSolutionSteps(c, steps, path, hidden) {
  if (!Array.isArray(steps) || steps.length < 2) return c.add(path, 'minst två steg krävs');
  if (hidden >= steps.length) c.add(path, `fading ${hidden} kräver fler än ${hidden} steg`);
  steps.forEach((s, i) => {
    const p = `${path}[${i}]`;
    if (!isObj(s)) return c.add(p, 'steget måste vara ett objekt');
    checkRichText(c, s.text, `${p}.text`);
    if (s.formula !== undefined) checkFormula(c, s.formula, `${p}.formula`);
    if (i >= steps.length - hidden) {
      if (s.ask === undefined) c.add(`${p}.ask`, 'saknas (steget döljs för eleven och behöver en fråga)');
      else checkRichText(c, s.ask, `${p}.ask`, { prompt: true });
      if (s.answer === undefined) c.add(`${p}.answer`, 'saknas (steget döljs för eleven och behöver facit)');
      else checkAnswer(c, s.answer, `${p}.answer`);
    }
  });
}

/** @param {Collector} c @param {Record<string, any>} v @param {string} path */
function checkWorkedExample(c, v, path) {
  checkId(c, v.id, `${path}.id`);
  checkStructure(c, v.structure, `${path}.structure`);
  checkRichText(c, v.prompt, `${path}.prompt`, { prompt: true });
  const fading = v.fading === undefined ? 0 : v.fading;
  if (![0, 1, 2].includes(fading)) c.add(`${path}.fading`, 'måste vara 0, 1 eller 2');
  checkSolutionSteps(c, v.steps, `${path}.steps`, [0, 1, 2].includes(fading) ? fading : 0);
  checkAnswer(c, v.answer, `${path}.answer`);
}

/** @param {Collector} c @param {Record<string, any>} v @param {string} path */
function checkGuidedStep(c, v, path) {
  checkId(c, v.id, `${path}.id`);
  checkStructure(c, v.structure, `${path}.structure`);
  checkRichText(c, v.prompt, `${path}.prompt`, { prompt: true });
  if (!Array.isArray(v.parts) || v.parts.length < 2) return c.add(`${path}.parts`, 'minst två delsteg krävs');
  v.parts.forEach((part, i) => {
    const p = `${path}.parts[${i}]`;
    if (!isObj(part)) return c.add(p, 'delsteget måste vara ett objekt');
    checkRichText(c, part.prompt, `${p}.prompt`, { prompt: true });
    checkAnswer(c, part.answer, `${p}.answer`);
    if (part.hint !== undefined) checkRichText(c, part.hint, `${p}.hint`);
  });
}

/** Ledtrådstrappan: (1) läs upp igen, (2) representation, (3) första steget, (4) hela lösningen.
 * @param {Collector} c @param {unknown} h @param {string} path */
function checkHints(c, h, path) {
  if (!isObj(h)) return c.add(path, 'ledtrådar saknas (alla fyra nivåer krävs)');
  if (h.reread !== true) c.add(`${path}.reread`, 'nivå 1 (läs upp igen) måste vara true');
  const rep = h.representation;
  if (!isObj(rep)) c.add(`${path}.representation`, 'nivå 2 (bild/representation) saknas');
  else {
    if (!INTERACTIVE_KINDS.includes(rep.kind)) c.add(`${path}.representation.kind`, `okänd representation "${String(rep.kind)}"`);
    if (!isObj(rep.config)) c.add(`${path}.representation.config`, 'saknas');
    checkRichText(c, rep.caption, `${path}.representation.caption`);
  }
  if (h.firstStep === undefined) c.add(`${path}.firstStep`, 'nivå 3 (första steget) saknas');
  else checkRichText(c, h.firstStep, `${path}.firstStep`);
  if (!isObj(h.fullSolution)) c.add(`${path}.fullSolution`, 'nivå 4 (hela lösningen) saknas');
  else checkSolutionSteps(c, h.fullSolution.steps, `${path}.fullSolution.steps`, 0);
}

/** @param {Collector} c @param {Record<string, any>} v @param {string} path */
function checkPractice(c, v, path) {
  checkId(c, v.id, `${path}.id`);
  checkStructure(c, v.structure, `${path}.structure`);
  if (!isStr(v.itemType) || !KEBAB_RE.test(v.itemType)) c.add(`${path}.itemType`, 'uppgiftstyp (Leitner-låda) saknas eller har fel form');
  if (!isStr(v.context) || !KEBAB_RE.test(v.context)) c.add(`${path}.context`, 'vardagskontext saknas (t.ex. rabatt, lon, mobil)');
  checkRichText(c, v.prompt, `${path}.prompt`, { prompt: true });
  checkAnswer(c, v.answer, `${path}.answer`);
  checkHints(c, v.hints, `${path}.hints`);
  if (v.parallel !== undefined) {
    if (!isObj(v.parallel)) c.add(`${path}.parallel`, 'måste vara ett objekt');
    else {
      checkRichText(c, v.parallel.prompt, `${path}.parallel.prompt`, { prompt: true });
      checkAnswer(c, v.parallel.answer, `${path}.parallel.answer`);
    }
  }
  if (v.commonWrong !== undefined) {
    if (!Array.isArray(v.commonWrong)) c.add(`${path}.commonWrong`, 'måste vara en lista');
    else {
      v.commonWrong.forEach((w, i) => {
        const p = `${path}.commonWrong[${i}]`;
        if (!isObj(w) || !isStr(w.value)) return c.add(p, 'value saknas');
        checkRichText(c, w.message, `${p}.message`);
      });
    }
  }
}

/** @param {Collector} c @param {Record<string, any>} v @param {string} path */
function checkInteractive(c, v, path) {
  checkId(c, v.id, `${path}.id`);
  if (!INTERACTIVE_KINDS.includes(v.kind)) c.add(`${path}.kind`, `okänd representation "${String(v.kind)}"`);
  if (!isObj(v.config)) c.add(`${path}.config`, 'saknas');
  checkRichText(c, v.prompt, `${path}.prompt`, { prompt: true });
}

/**
 * @param {Collector} c @param {unknown} lesson @param {string} path
 */
function checkLesson(c, lesson, path) {
  if (!isObj(lesson)) return c.add(path, 'lektionen måste vara ett objekt');
  checkId(c, lesson.id, `${path}.id`);
  if (!isStr(lesson.title)) c.add(`${path}.title`, 'saknas');
  else if (/[A-ZÅÄÖ]{2,}/.test(lesson.title) && lesson.title === lesson.title.toUpperCase()) c.add(`${path}.title`, 'titlar ska inte skrivas med versaler');
  checkRichText(c, lesson.goal, `${path}.goal`);
  if (!REPRESENTATIONS.includes(lesson.representation)) c.add(`${path}.representation`, `måste vara en av ${REPRESENTATIONS.join(', ')}`);
  if (!Array.isArray(lesson.steps) || lesson.steps.length === 0) return c.add(`${path}.steps`, 'minst ett steg krävs');

  const counts = { workedExample: 0, guidedStep: 0, practice: 0 };
  let firstPractice = -1;
  let firstWorked = true;
  lesson.steps.forEach((step, i) => {
    const p = `${path}.steps[${i}]`;
    if (!isObj(step)) return c.add(p, 'steget måste vara ett objekt');
    switch (step.type) {
      case 'workedExample':
        counts.workedExample++;
        if (firstPractice >= 0) c.add(p, 'löst exempel kommer efter första övningsuppgiften (ordningen är Visa, Tillsammans, Själv)');
        if (firstWorked && step.fading !== undefined && step.fading !== 0) c.add(`${p}.fading`, 'det första lösta exemplet ska vara helt löst (fading 0)');
        firstWorked = false;
        checkWorkedExample(c, step, p);
        break;
      case 'guidedStep':
        counts.guidedStep++;
        if (firstPractice >= 0) c.add(p, 'guidat steg kommer efter första övningsuppgiften');
        checkGuidedStep(c, step, p);
        break;
      case 'practice':
        counts.practice++;
        if (firstPractice < 0) firstPractice = i;
        checkPractice(c, step, p);
        break;
      case 'interactive':
        checkInteractive(c, step, p);
        break;
      default:
        c.add(`${p}.type`, `okänd stegtyp "${String(step.type)}"`);
    }
  });

  if (lesson.draft !== true) {
    if (counts.workedExample < MIN.workedExamples) c.add(path, `minst ${MIN.workedExamples} löst exempel krävs (har ${counts.workedExample})`);
    if (counts.guidedStep < MIN.guidedSteps) c.add(path, `minst ${MIN.guidedSteps} guidade steg krävs (har ${counts.guidedStep})`);
    if (counts.practice < MIN.practice) c.add(path, `minst ${MIN.practice} övningsuppgifter krävs (har ${counts.practice})`);
  }
}

/**
 * Validerar en modul. Returnerar en lista med felmeddelanden (tom om allt är giltigt).
 * @param {unknown} mod
 * @returns {string[]}
 */
export function validateModule(mod) {
  const c = new Collector();
  const path = isObj(mod) && isStr(mod.id) ? `modul ${mod.id}` : 'modul';
  if (!isObj(mod)) return [`${path}: modulen måste vara ett objekt`];

  checkId(c, mod.id, `${path}.id`);
  if (!isStr(mod.title)) c.add(`${path}.title`, 'saknas');
  if (!isStr(mod.summary)) c.add(`${path}.summary`, 'saknas');
  if (!Number.isInteger(mod.order) || mod.order < 1) c.add(`${path}.order`, 'måste vara ett heltal från 1');
  if (!MODULE_STATUS.includes(mod.status)) c.add(`${path}.status`, `måste vara en av ${MODULE_STATUS.join(', ')}`);
  if (!Array.isArray(mod.lessons)) {
    c.add(`${path}.lessons`, 'måste vara en lista');
  } else {
    mod.lessons.forEach((l, i) => checkLesson(c, l, `${path}.lessons[${i}]`));
    if (mod.status === 'full') {
      if (mod.lessons.length < MIN.lessonsInFullModule) c.add(path, `en komplett modul kräver minst ${MIN.lessonsInFullModule} lektioner (har ${mod.lessons.length})`);
      if (mod.lessons.some((l) => isObj(l) && l.draft === true)) c.add(path, 'en komplett modul får inte ha lektioner markerade som draft');
    }
  }
  return c.errors;
}

/**
 * Validerar flera moduler och kontrollerar att id:n är unika över modulgränser.
 * @param {unknown[]} modules
 * @returns {string[]}
 */
export function validateModules(modules) {
  const errors = modules.flatMap((m) => validateModule(m));
  const seen = new Set();
  for (const m of modules) {
    if (isObj(m) && isStr(m.id)) {
      if (seen.has(m.id)) errors.push(`modul ${m.id}: modul-id används mer än en gång`);
      seen.add(m.id);
    }
  }
  return errors;
}
