// @ts-check
// Bygger Dagens pass. Regeln är enkel och går att förklara för eleven:
//   1. Bara uppgiftstyper eleven redan har övat kommer med.
//   2. Typer som det är dags att repetera (enligt Leitner-lådorna) kommer först.
//   3. Sedan fylls passet på med övriga övade typer, lägst låda först.
//   4. Typerna blandas: vi tar en uppgift från varje typ i tur och ordning.
//   5. Inom en typ väljs uppgiften som eleven sett längst sedan. Har eleven gjort alla
//      byts till uppgiftens parallella version med nya tal.
// Inget slumpas: samma läge ger alltid samma pass.
import { isDue } from './leitner.js';

export const DEFAULT_SIZE = 6;

/**
 * Alla övningsuppgifter med en uppgiftstyp.
 * @param {any[]} modules
 * @returns {{ moduleId: string, moduleTitle: string, lessonId: string, step: any }[]}
 */
export function collectPractices(modules) {
  return modules.flatMap((m) =>
    m.lessons.flatMap((/** @type {any} */ l) =>
      l.steps
        .filter((/** @type {any} */ s) => s.type === 'practice' && s.itemType)
        .map((/** @type {any} */ step) => ({ moduleId: m.id, moduleTitle: m.title, lessonId: l.id, step })),
    ),
  );
}

/** En övningsuppgift med de parallella talen. Har ingen ledtrådstrappa, eftersom ledtrådarna hör till de ursprungliga talen.
 * @param {any} step */
export function makeVariant(step) {
  return {
    type: 'practice', id: `${step.id}~p`, baseId: step.id,
    structure: step.structure, itemType: step.itemType, context: step.context,
    prompt: step.parallel.prompt, answer: step.parallel.answer,
  };
}

/**
 * @param {{
 *   modules: any[], items: Map<string, any>, types: Map<string, any>,
 *   today: string, size?: number
 * }} o
 * @returns {{ tasks: { itemId: string, moduleTitle: string, lessonId: string, itemType: string, reason: 'due' | 'mix', variant: boolean, step: any }[],
 *            dueCount: number }}
 */
export function buildSession({ modules, items, types, today, size = DEFAULT_SIZE }) {
  const practices = collectPractices(modules);
  /** @type {Map<string, typeof practices>} */
  const byType = new Map();
  for (const p of practices) {
    const list = byType.get(p.step.itemType) ?? [];
    list.push(p);
    byType.set(p.step.itemType, list);
  }

  // Bara typer som eleven har övat, och som finns i innehållet.
  const started = [...types.entries()].filter(([name]) => byType.has(name));
  const due = started
    .filter(([, rec]) => isDue(rec, today))
    .sort((a, b) => a[1].box - b[1].box || a[1].due.localeCompare(b[1].due) || a[0].localeCompare(b[0]));
  const rest = started
    .filter(([, rec]) => !isDue(rec, today))
    .sort((a, b) => a[1].box - b[1].box || a[1].lastSeen.localeCompare(b[1].lastSeen) || a[0].localeCompare(b[0]));
  const order = [...due.map(([n]) => ({ name: n, reason: /** @type {const} */ ('due') })), ...rest.map(([n]) => ({ name: n, reason: /** @type {const} */ ('mix') }))];

  /** @type {ReturnType<typeof buildSession>['tasks']} */
  const tasks = [];
  const used = new Set();
  if (order.length === 0) return { tasks, dueCount: 0 };

  // Uppgifter inom varje typ, den som setts längst sedan först.
  const queues = new Map(order.map(({ name }) => [
    name,
    [...(byType.get(name) ?? [])].sort((a, b) => {
      const la = items.get(a.step.id)?.lastSeen ?? '';
      const lb = items.get(b.step.id)?.lastSeen ?? '';
      return la.localeCompare(lb) || a.step.id.localeCompare(b.step.id);
    }),
  ]));

  for (let round = 0; tasks.length < size && round < size * 2; round++) {
    let added = false;
    for (const { name, reason } of order) {
      if (tasks.length >= size) break;
      const list = /** @type {typeof practices} */ (queues.get(name));
      const pick = list[round % list.length];
      const wantVariant = round >= list.length || (items.get(pick.step.id)?.reviews ?? 0) % 2 === 1;
      const variant = wantVariant && !!pick.step.parallel;
      const key = variant ? `${pick.step.id}~p` : pick.step.id;
      if (used.has(key)) continue;
      used.add(key);
      tasks.push({
        itemId: pick.step.id, moduleTitle: pick.moduleTitle, lessonId: pick.lessonId, itemType: name,
        reason, variant, step: variant ? makeVariant(pick.step) : pick.step,
      });
      added = true;
    }
    if (!added && round >= 1) break; // inget mer att välja
  }
  return { tasks, dueCount: tasks.filter((t) => t.reason === 'due').length };
}

/** En lektion av dagens uppgifter, så att den kan spelas av samma spelare som vanliga lektioner. @param {any[]} tasks */
export function sessionLesson(tasks) {
  return {
    id: 'dagens-pass', title: 'Dagens pass', representation: 'none',
    goal: { text: 'Repetera och blanda uppgifter från det du har övat.' },
    steps: tasks.map((t) => t.step),
  };
}
