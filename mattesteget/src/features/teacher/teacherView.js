// @ts-check
// Lärarvy: bakom en lärarkod som sätts på enheten. Läraren läser in elevers exportfiler och ser
// översikt per modul, ledtrådar per uppgift och vanligaste felsvar. Allt stannar på enheten.
import { h, createScope } from '../../lib/dom.js';
import { parseStudentExport, displayName } from '../progress/exportData.js';
import { moduleOverview, practiceStats, byHints, withWrongAnswers } from './aggregate.js';

const STATUS_TEXT = { notStarted: 'Ej påbörjad', inProgress: 'Pågår', done: 'Klar' };

/** @param {number} n */
const dec = (n) => (Math.round(n * 10) / 10).toString().replace('.', ',');

/**
 * @param {{
 *   teacher?: {
 *     code: ReturnType<typeof import('./teacherCode.js').createTeacherCode>,
 *     students: ReturnType<typeof import('./studentsStore.js').createStudentsStore>
 *   },
 *   content?: { modules: any[] }
 * }} ctx
 * @returns {{ title: string, el: HTMLElement, dispose: () => void }}
 */
export function teacherView(ctx) {
  const scope = createScope();
  const root = h('div', null, h('h1', { tabindex: '-1' }, 'Lärarvy'));
  const body = h('div', null);
  const live = h('div', { class: 'visually-hidden', role: 'status', 'aria-live': 'polite' });
  root.append(body, live);
  const teacher = ctx.teacher;
  const modules = ctx.content?.modules ?? [];

  if (!teacher) {
    body.append(h('p', null, 'Lärarvyn kan inte användas just nu. Ladda om sidan och försök igen.'));
    return { title: 'Lärarvy', el: root, dispose: () => scope.dispose() };
  }

  /** @type {string[]} */
  let importMessages = [];

  function render() {
    if (!teacher) return;
    if (!teacher.code.hasCode()) renderSetCode();
    else if (!teacher.code.isUnlocked()) renderUnlock();
    else renderOverview();
  }

  /** Formulär med ett eller två kodfält. @param {{ title: string, intro: any[], fields: [string, string, string][], button: string, onSubmit: (values: string[]) => Promise<string | null> }} o */
  function codeForm({ title, intro, fields, button, onSubmit }) {
    const error = h('p', { class: 'form-error', role: 'alert', hidden: true });
    const inputs = fields.map(([id, , autocomplete]) => /** @type {HTMLInputElement} */ (h('input', {
      id, type: 'password', class: 'answer-input', autocomplete, spellcheck: 'false', maxlength: '64',
    })));
    const form = h('form', {
      class: 'answer-form',
      onsubmit: async (/** @type {Event} */ e) => {
        e.preventDefault();
        const message = await onSubmit(inputs.map((i) => i.value));
        if (message) {
          error.textContent = message;
          error.hidden = false;
          inputs[0].focus();
        }
      },
    },
      ...fields.map(([id, label], i) => [
        h('label', { for: id, class: 'question' }, label),
        h('div', { class: 'input-row' }, inputs[i]),
      ]),
      error,
      h('button', { type: 'submit', class: 'btn' }, button),
    );
    return [h('h2', null, title), ...intro, form];
  }

  function renderSetCode() {
    body.replaceChildren(...codeForm({
      title: 'Välj en lärarkod',
      intro: [
        h('p', null, 'Lärarvyn skyddas av en kod som du väljer själv. Koden sparas bara på den här enheten.'),
        h('p', { class: 'notice', role: 'note' }, 'Koden skyddar bara mot misstag, till exempel att någon klickar sig in av nyfikenhet. Den är inte ett säkert lösenord.'),
      ],
      fields: [['kod1', 'Lärarkod (minst 4 tecken)', 'new-password'], ['kod2', 'Upprepa koden', 'new-password']],
      button: 'Spara koden',
      onSubmit: async ([a, b]) => {
        if (a !== b) return 'Koderna är inte lika. Skriv samma kod två gånger.';
        const r = await teacher.code.setCode(a);
        if (!r.ok) return r.error;
        render();
        return null;
      },
    }));
  }

  function renderUnlock() {
    const forgot = h('div', { class: 'notice', hidden: true, tabindex: '-1' },
      h('p', null, 'Om du tar bort koden kan du välja en ny. Elevfilerna som du redan läst in finns kvar.'),
      h('div', { class: 'actions' },
        h('button', { type: 'button', class: 'btn', onclick: () => { teacher.code.clear(); render(); } }, 'Ta bort koden'),
        h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => { forgot.hidden = true; } }, 'Avbryt'),
      ),
    );
    body.replaceChildren(
      ...codeForm({
        title: 'Lås upp lärarvyn',
        intro: [h('p', null, 'Skriv lärarkoden för att se elevernas framsteg.')],
        fields: [['kod', 'Lärarkod', 'current-password']],
        button: 'Lås upp',
        onSubmit: async ([code]) => {
          if (await teacher.code.unlock(code)) { render(); return null; }
          return 'Koden stämde inte. Prova igen.';
        },
      }),
      h('p', null, h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => { forgot.hidden = false; forgot.focus(); } }, 'Jag har glömt koden')),
      forgot,
    );
  }

  /** Läser in valda filer. @param {FileList | null} files */
  async function importFiles(files) {
    if (!teacher || !files || files.length === 0) return;
    /** @type {string[]} */
    const messages = [];
    for (const file of Array.from(files)) {
      const parsed = parseStudentExport(await file.text());
      if (parsed.ok) {
        teacher.students.add(parsed.student);
        messages.push(`${parsed.student.nickname ?? 'En elev'}: inläst från ${file.name}.`);
      } else {
        messages.push(`${file.name}: kunde inte läsas. ${parsed.error}`);
      }
    }
    importMessages = messages;
    live.textContent = `${messages.length} ${messages.length === 1 ? 'fil' : 'filer'} behandlades.`;
    renderOverview(); // ritas även om av prenumerationen, men det säkrar att meddelandena visas
  }

  function renderOverview() {
    if (!teacher) return;
    const students = teacher.students.list();
    const names = new Map(students.map((s) => [s.id, displayName(s, students)]));
    /** @type {any[]} */
    const parts = [];

    parts.push(
      h('p', { class: 'actions' },
        h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => { teacher.code.lock(); render(); /** @type {HTMLElement | null} */ (root.querySelector('h1'))?.focus(); } }, 'Lås lärarvyn'),
      ),
      h('h2', null, 'Läs in elevfiler'),
      h('p', null, 'Eleverna sparar sin progression som en fil under Min resa. Välj en eller flera filer här. Samma elev ersätts om du läser in en nyare fil.'),
      h('div', { class: 'answer-form' },
        h('label', { for: 'elevfiler', class: 'question' }, 'Elevfiler (.json)'),
        h('input', {
          id: 'elevfiler', type: 'file', multiple: true, accept: '.json,application/json', class: 'file-input',
          onchange: (/** @type {Event} */ e) => {
            const input = /** @type {HTMLInputElement} */ (e.target);
            const files = input.files;
            void importFiles(files).then(() => { input.value = ''; });
          },
        }),
      ),
      importMessages.length ? h('ul', { class: 'import-result' }, importMessages.map((m) => h('li', null, m))) : null,
    );

    if (students.length === 0) {
      parts.push(h('p', { class: 'lead' }, 'Inga elever är inlästa än.'));
      body.replaceChildren(...parts);
      return;
    }

    const overview = moduleOverview(students, modules);
    const stats = practiceStats(students, modules);
    const hintRows = byHints(stats).slice(0, 12);
    const wrongRows = withWrongAnswers(stats).slice(0, 8);

    parts.push(
      h('h2', null, `Översikt per modul (${students.length} ${students.length === 1 ? 'elev' : 'elever'})`),
      h('div', { class: 'table-wrap' },
        h('table', { class: 'data' },
          h('caption', null, 'Hur långt varje elev har kommit i varje modul'),
          h('thead', null, h('tr', null,
            h('th', { scope: 'col' }, 'Elev'),
            overview[0].modules.map((m) => h('th', { scope: 'col' }, m.title)),
            h('th', { scope: 'col' }, 'Totalt'),
            h('th', { scope: 'col' }, 'Åtgärd'),
          )),
          h('tbody', null, overview.map((row) => {
            const name = names.get(row.student.id) ?? 'Elev';
            return h('tr', null,
              h('th', { scope: 'row' }, name),
              row.modules.map((m) => h('td', null, m.total === 0 ? '–' : `${STATUS_TEXT[m.status]}, ${m.done} av ${m.total}`)),
              h('td', null, `${row.total.done} av ${row.total.total}`),
              h('td', null, h('button', {
                type: 'button', class: 'btn btn-secondary', 'aria-label': `Ta bort ${name}`,
                onclick: () => { teacher.students.remove(row.student.id); live.textContent = `${name} togs bort.`; },
              }, 'Ta bort')),
            );
          })),
        ),
      ),

      h('h2', null, 'Ledtrådar per uppgift'),
      h('p', null, 'Ledtrådsnivå: 1 läs upp igen, 2 bild, 3 första steget, 4 hela lösningen. Uppgifterna där eleverna behövt mest hjälp står först.'),
      hintRows.length === 0
        ? h('p', null, 'Ingen elev har gjort några övningsuppgifter än.')
        : h('div', { class: 'table-wrap' },
          h('table', { class: 'data' },
            h('caption', null, 'Ledtrådar och försök per övningsuppgift'),
            h('thead', null, h('tr', null,
              ['Uppgift', 'Elever som gjort den', 'Behövde ledtråd', 'Snitt högsta nivå', 'Snitt försök'].map((t) => h('th', { scope: 'col' }, t)),
            )),
            h('tbody', null, hintRows.map((r) => h('tr', null,
              h('th', { scope: 'row' }, r.prompt),
              h('td', null, String(r.students)),
              h('td', null, `${r.neededHint} av ${r.students}`),
              h('td', null, dec(r.avgHintMax)),
              h('td', null, dec(r.avgAttempts)),
            ))),
          ),
        ),

      h('h2', null, 'Vanligaste felsvar'),
      wrongRows.length === 0
        ? h('p', null, 'Inga felsvar har sparats än.')
        : h('div', null, wrongRows.map((r) => h('section', { class: 'card' },
          h('h3', null, r.prompt),
          h('ul', null, r.topWrong.map((w) => h('li', null, `"${w.value}" – ${w.count} ${w.count === 1 ? 'elev' : 'elever'}`))),
        ))),

      h('h2', null, 'Ta bort elevdata'),
      h('p', null, 'Elevfilerna finns bara på den här enheten. Du kan ta bort alla på en gång.'),
      clearAllBlock(),
    );
    body.replaceChildren(...parts);
  }

  function clearAllBlock() {
    const box = h('div', { class: 'notice', role: 'alertdialog', 'aria-labelledby': 'rensa-rubrik', hidden: true, tabindex: '-1' },
      h('p', { id: 'rensa-rubrik' }, 'Vill du ta bort alla inlästa elevfiler? Det går inte att ångra.'),
      h('div', { class: 'actions' },
        h('button', {
          type: 'button', class: 'btn',
          onclick: async () => { await teacher?.students.clear(); live.textContent = 'Alla elevfiler är borttagna.'; },
        }, 'Ja, ta bort alla'),
        h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => { box.hidden = true; ask.focus(); } }, 'Avbryt'),
      ),
    );
    const ask = h('button', { type: 'button', class: 'btn btn-secondary', onclick: () => { box.hidden = false; box.focus(); } }, 'Ta bort alla elevfiler');
    return h('div', null, ask, box);
  }

  render();
  scope.add(teacher.students.subscribe(() => { if (teacher.code.isUnlocked()) renderOverview(); }));
  // Lärarvyn låses när man lämnar den.
  scope.add(() => teacher.code.lock());
  return { title: 'Lärarvy', el: root, dispose: () => scope.dispose() };
}
