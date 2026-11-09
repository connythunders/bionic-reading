// @ts-check
import { test, assert } from '../../../tests/harness.js';
import { pickSwedishVoice, normalizeLang } from './voices.js';
import { buildPlan, tokenize, tokenAt } from './speakPlan.js';
import { createSpeech } from './speech.js';

// ---------- Låtsastalsyntes ----------

/** @param {any[]} [voices] */
function fakeSynth(voices = []) {
  /** @type {Record<string, (() => void)[]>} */
  const listeners = {};
  const synth = {
    voices,
    /** @type {any[]} */ spoken: [],
    paused: false,
    cancels: 0,
    getVoices() { return this.voices; },
    addEventListener(/** @type {string} */ type, /** @type {() => void} */ fn) { (listeners[type] ||= []).push(fn); },
    fire(/** @type {string} */ type) { (listeners[type] || []).forEach((f) => f()); },
    speak(/** @type {any} */ u) { this.spoken.push(u); },
    cancel() { this.cancels++; },
    pause() { this.paused = true; },
    resume() { this.paused = false; },
  };
  return synth;
}
class FakeUtterance {
  /** @param {string} text */
  constructor(text) { this.text = text; }
}
const sv = { name: 'Svensk', lang: 'sv-SE', localService: true };

/** @param {any} synth @param {number} [rate] */
const speechFor = (synth, rate = 1) => createSpeech({ synth, Utterance: FakeUtterance, getRate: () => rate, voiceTimeout: 5 });

// ---------- Röstval ----------

test('röster: väljer sv-SE, föredrar röster på enheten, klarar Androids sv_SE', () => {
  assert.equal(normalizeLang('sv_SE'), 'sv-se');
  const net = { name: 'Nät', lang: 'sv-SE', localService: false };
  const local = { name: 'Lokal', lang: 'sv-SE', localService: true };
  const fi = { name: 'Finska', lang: 'fi-FI', localService: true };
  assert.equal(pickSwedishVoice([fi, net, local])?.name, 'Lokal');
  assert.equal(pickSwedishVoice([{ name: 'And', lang: 'sv_SE' }])?.name, 'And');
  assert.equal(pickSwedishVoice([{ name: 'Fin', lang: 'sv-FI' }])?.name, 'Fin');
});

test('röster: ingen svensk röst ger null', () => {
  assert.equal(pickSwedishVoice([{ name: 'En', lang: 'en-US' }]), null);
  assert.equal(pickSwedishVoice([]), null);
});

// ---------- Uppläsningsplan ----------

test('plan: delar upp i meningar och ord', () => {
  assert.deepEqual(tokenize('Hej du.').map((t) => t.text), ['Hej', 'du.']);
  const plan = buildPlan({ text: 'Hej du. Hur mår du?' });
  assert.deepEqual(plan.sentences.map((s) => s.text), ['Hej du.', 'Hur mår du?']);
  assert.equal(tokenAt(plan.sentences[1].tokens, 4), 1);
});

test('plan: ordmarkering när visade och upplästa ord stämmer', () => {
  const plan = buildPlan({
    text: 'En jacka kostar 800 kr och rabatten är 25 %.',
    speak: 'En jacka kostar 800 kronor och rabatten är 25 procent.',
  });
  assert.equal(plan.sentences.length, 1);
  assert.deepEqual(plan.sentences[0].wordMap, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
});

test('plan: faller tillbaka på meningsmarkering när ordantalet skiljer sig', () => {
  const plan = buildPlan({ text: 'Den kostar 3 000 kr.', speak: 'Den kostar 3000 kronor.' });
  assert.equal(plan.sentences[0].wordMap, null);
  assert.ok(plan.sentences[0].units.length > 0, 'meningen ska ändå kunna markeras');
});

test('plan: formler läses med sin talversion och markeras som en enhet', () => {
  const plan = buildPlan({ text: 'Det är {{f1}}.', formulas: { f1: { expr: '1/4', speak: 'en fjärdedel' } } });
  assert.equal(plan.spoken, 'Det är en fjärdedel.');
  assert.deepEqual(plan.sentences[0].wordMap, [0, 1, 2, 2]);
});

test('plan: extra uppläst text (separat formel) stör inte markeringen av den visade texten', () => {
  const plan = buildPlan({ text: 'Dela med 4.' }, { extraSpeech: '800 delat med 4 är lika med 200' });
  assert.equal(plan.sentences.length, 2);
  assert.ok(plan.sentences[0].units.length > 0);
  assert.equal(plan.sentences[1].units.length, 0, 'extra mening har ingenting att markera');
});

// ---------- Kontroller ----------

test('uppläsning: röster som laddas asynkront (voiceschanged) hittas', async () => {
  const synth = fakeSynth([]);
  const speech = speechFor(synth);
  assert.equal(speech.getState().support, 'loading');
  const ready = speech.init();
  synth.voices = [sv];
  synth.fire('voiceschanged');
  await ready;
  assert.equal(speech.getState().support, 'ready');
  assert.equal(speech.getState().voice, sv);
});

test('uppläsning: utan svensk röst blir läget "no-swedish" och uppläsning blockeras', async () => {
  const synth = fakeSynth([{ name: 'En', lang: 'en-US' }]);
  const speech = speechFor(synth);
  /** @type {string[]} */
  const events = [];
  speech.subscribe((_, e) => events.push(e.type));
  await speech.init();
  assert.equal(speech.getState().support, 'no-swedish');
  assert.equal(await speech.speak('a', buildPlan({ text: 'Hej.' })), false);
  assert.ok(events.includes('blocked'));
  assert.equal(synth.spoken.length, 0, 'ingen uppläsning med fel språk');
});

test('uppläsning: enheter som aldrig skickar voiceschanged får ändå besked', async () => {
  const speech = speechFor(fakeSynth([]));
  await speech.init(); // väntar på timeout
  assert.equal(speech.getState().support, 'no-swedish');
});

test('uppläsning: webbläsare utan talsyntes ger "unsupported"', async () => {
  const speech = createSpeech({ synth: null });
  assert.equal(speech.getState().support, 'unsupported');
  assert.equal(await speech.speak('a', buildPlan({ text: 'Hej.' })), false);
});

test('uppläsning: läser mening för mening med svensk röst och inställd hastighet', async () => {
  const synth = fakeSynth([sv]);
  const speech = speechFor(synth, 1.2);
  await speech.init();
  await speech.speak('a', buildPlan({ text: 'Hej. Hur mår du?' }));
  assert.equal(synth.spoken.length, 1);
  assert.equal(synth.spoken[0].text, 'Hej.');
  assert.equal(synth.spoken[0].lang, 'sv-SE');
  assert.equal(synth.spoken[0].voice, sv);
  assert.equal(synth.spoken[0].rate, 1.2);

  synth.spoken[0].onstart();
  synth.spoken[0].onend();
  assert.equal(synth.spoken.length, 2);
  assert.equal(synth.spoken[1].text, 'Hur mår du?');

  synth.spoken[1].onboundary({ name: 'word', charIndex: 4 });
  assert.equal(speech.getState().sentence, 1);
  assert.equal(speech.getState().word, 1);

  synth.spoken[1].onend();
  assert.equal(speech.getState().status, 'idle');
  assert.equal(speech.getState().finishedId, 'a');
});

test('uppläsning: stopp avbryter, och sena händelser från den gamla uppläsningen ignoreras', async () => {
  const synth = fakeSynth([sv]);
  const speech = speechFor(synth);
  await speech.init();
  await speech.speak('a', buildPlan({ text: 'Hej. Hur mår du?' }));
  const first = synth.spoken[0];
  speech.stop();
  first.onend(); // skulle annars starta nästa mening
  assert.equal(synth.spoken.length, 1);
  assert.equal(speech.getState().status, 'idle');
  assert.equal(speech.getState().activeId, null);
});

test('uppläsning: pausa och fortsätt', async () => {
  const synth = fakeSynth([sv]);
  const speech = speechFor(synth);
  await speech.init();
  await speech.speak('a', buildPlan({ text: 'Hej.' }));
  speech.pause();
  assert.equal(synth.paused, true);
  assert.equal(speech.getState().status, 'paused');
  speech.resume();
  assert.equal(synth.paused, false);
  assert.equal(speech.getState().status, 'speaking');
});

test('uppläsning: ny uppläsning ersätter den som pågår', async () => {
  const synth = fakeSynth([sv]);
  const speech = speechFor(synth);
  await speech.init();
  await speech.speak('a', buildPlan({ text: 'Första.' }));
  await speech.speak('b', buildPlan({ text: 'Andra.' }));
  assert.equal(speech.getState().activeId, 'b');
  assert.equal(synth.spoken.at(-1).text, 'Andra.');
});

// ---------- Uppläsningsbar text (DOM) ----------

test('uppläsningsbar text: knappar byter läge och ord markeras', async () => {
  const { createSpeakable } = await import('./speakable.js');
  const synth = fakeSynth([sv]);
  const speech = speechFor(synth);
  await speech.init();
  const disposers = /** @type {(() => void)[]} */ ([]);
  const t = createSpeakable(
    { text: 'En jacka kostar 800 kr och rabatten är 25 %.', speak: 'En jacka kostar 800 kronor och rabatten är 25 procent.' },
    { speech, scope: { add: (fn) => disposers.push(fn) }, label: 'uppgiften' },
  );
  document.body.append(t.text, t.controls);
  try {
    const primary = /** @type {HTMLButtonElement} */ (t.controls.querySelector('.speak-btn'));
    const stop = /** @type {HTMLButtonElement} */ (t.controls.querySelector('.speak-stop'));
    assert.equal(primary.textContent, 'Läs upp');
    assert.equal(primary.getAttribute('aria-label'), 'Läs upp uppgiften');
    assert.equal(stop.hidden, true);

    primary.click();
    await Promise.resolve();
    await Promise.resolve();
    assert.equal(primary.textContent, 'Pausa');
    assert.equal(stop.hidden, false);

    synth.spoken[0].onboundary({ name: 'word', charIndex: 3 }); // "jacka"
    assert.equal(t.text.querySelector('.reading-word')?.textContent, 'jacka');
    assert.ok(t.text.querySelectorAll('.reading-sentence').length > 1, 'meningen ska vara markerad');

    primary.click();
    assert.equal(primary.textContent, 'Fortsätt läsa');
    primary.click();
    synth.spoken[0].onend();
    assert.equal(primary.textContent, 'Läs igen');
    assert.equal(t.text.querySelector('.reading-word'), null, 'markeringen tas bort när uppläsningen är klar');
    assert.equal(stop.hidden, true);
  } finally {
    t.text.remove();
    t.controls.remove();
    disposers.forEach((d) => d());
  }
}, { browserOnly: true });

test('röstmeddelande: visas med instruktion när svensk röst saknas', async () => {
  const { createVoiceNotice } = await import('./voiceNotice.js');
  const synth = fakeSynth([{ name: 'En', lang: 'en-US' }]);
  const speech = speechFor(synth);
  const notice = createVoiceNotice(speech, { add: () => {} });
  assert.equal(notice.hidden, true, 'dolt medan rösterna laddas');
  await speech.init();
  assert.equal(notice.hidden, false);
  assert.ok(notice.textContent?.includes('Ingen svensk röst hittades'));
  assert.ok(notice.textContent?.includes('Chromebook'));
  assert.ok(!/\bfel\b/i.test(notice.textContent || ''));
}, { browserOnly: true });
