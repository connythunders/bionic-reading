/* === AI-LÄROMEDEL – SHARED SCRIPT === */
'use strict';

// ─── STORAGE HELPERS ───────────────────────────────────────────────────────
const store = {
  get: (k, def) => { try { const v = localStorage.getItem(k); return v !== null ? JSON.parse(v) : def; } catch { return def; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

// ─── STATE ──────────────────────────────────────────────────────────────────
const state = {
  bionic: store.get('bionic', false),
  darkMode: store.get('darkMode', false),
  fontSize: store.get('fontSize', 18),
  lineHeight: store.get('lineHeight', 1.7),
  fontAccessible: store.get('fontAccessible', false)
};

// ─── APPLY SAVED PREFERENCES ────────────────────────────────────────────────
function applyPreferences() {
  if (state.darkMode) document.documentElement.setAttribute('data-theme', 'dark');
  document.documentElement.style.setProperty('--font-size', state.fontSize + 'px');
  document.documentElement.style.setProperty('--line-height', state.lineHeight);
  if (state.fontAccessible) document.body.classList.add('font-accessible');
  if (state.bionic) {
    document.addEventListener('DOMContentLoaded', () => {
      activateBionic();
      updateBionicBtn(true);
    });
  }
}
applyPreferences();

// ─── BIONIC READING ─────────────────────────────────────────────────────────

/**
 * Wraps the leading ~45% of each word in a <b class="bionic-bold"> tag.
 * Only processes Text nodes inside .content or .quiz-question / .quiz-option.
 * Never touches script, style, code, pre, or elements with data-no-bionic.
 */
function bionicTransform(text) {
  return text.replace(/\b([a-zA-ZåäöÅÄÖéèêëàáâüûùú]+)\b/g, (word) => {
    const len = Math.max(1, Math.ceil(word.length * 0.45));
    return `<b class="bionic-bold">${word.slice(0, len)}</b>${word.slice(len)}`;
  });
}

const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'CODE', 'PRE', 'KBD', 'SAMP', 'INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'H1', 'H2', 'H3', 'H4', 'A', 'LABEL']);

function walkAndBionic(root, activate) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      let el = node.parentElement;
      while (el && el !== root) {
        if (SKIP_TAGS.has(el.tagName)) return NodeFilter.FILTER_REJECT;
        if (el.dataset && el.dataset.noBionic) return NodeFilter.FILTER_REJECT;
        el = el.parentElement;
      }
      return node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });

  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  if (activate) {
    nodes.forEach(node => {
      const span = document.createElement('span');
      span.dataset.bionicOriginal = node.textContent;
      span.innerHTML = bionicTransform(node.textContent);
      node.parentNode.replaceChild(span, node);
    });
  } else {
    // Restore original text
    root.querySelectorAll('[data-bionic-original]').forEach(span => {
      span.replaceWith(span.dataset.bionicOriginal);
    });
  }
}

function getBionicRoots() {
  const roots = [];
  document.querySelectorAll('.content, .quiz-question, .quiz-option .option-text, .self-test .question-text').forEach(el => roots.push(el));
  return roots;
}

function activateBionic() {
  getBionicRoots().forEach(r => walkAndBionic(r, true));
}

function deactivateBionic() {
  getBionicRoots().forEach(r => walkAndBionic(r, false));
}

function updateBionicBtn(active) {
  const btn = document.getElementById('bionic-toggle');
  if (btn) btn.classList.toggle('active', active);
}

// ─── ACCESSIBILITY CONTROLS ──────────────────────────────────────────────────
function initA11yToolbar() {
  // Bionic toggle
  const bionicBtn = document.getElementById('bionic-toggle');
  if (bionicBtn) {
    bionicBtn.classList.toggle('active', state.bionic);
    bionicBtn.addEventListener('click', () => {
      state.bionic = !state.bionic;
      store.set('bionic', state.bionic);
      if (state.bionic) activateBionic(); else deactivateBionic();
      updateBionicBtn(state.bionic);
    });
  }

  // Dark mode
  const darkBtn = document.getElementById('dark-toggle');
  if (darkBtn) {
    darkBtn.classList.toggle('active', state.darkMode);
    darkBtn.textContent = state.darkMode ? '☀️ Ljust' : '🌙 Mörkt';
    darkBtn.addEventListener('click', () => {
      state.darkMode = !state.darkMode;
      store.set('darkMode', state.darkMode);
      document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : '');
      darkBtn.classList.toggle('active', state.darkMode);
      darkBtn.textContent = state.darkMode ? '☀️ Ljust' : '🌙 Mörkt';
    });
  }

  // Font size
  const fsUp = document.getElementById('fs-up');
  const fsDown = document.getElementById('fs-down');
  if (fsUp) {
    fsUp.addEventListener('click', () => {
      state.fontSize = Math.min(state.fontSize + 2, 28);
      store.set('fontSize', state.fontSize);
      document.documentElement.style.setProperty('--font-size', state.fontSize + 'px');
    });
  }
  if (fsDown) {
    fsDown.addEventListener('click', () => {
      state.fontSize = Math.max(state.fontSize - 2, 14);
      store.set('fontSize', state.fontSize);
      document.documentElement.style.setProperty('--font-size', state.fontSize + 'px');
    });
  }

  // Line height
  const lhUp = document.getElementById('lh-up');
  if (lhUp) {
    lhUp.addEventListener('click', () => {
      state.lineHeight = state.lineHeight >= 2.2 ? 1.5 : +(state.lineHeight + 0.2).toFixed(1);
      store.set('lineHeight', state.lineHeight);
      document.documentElement.style.setProperty('--line-height', state.lineHeight);
    });
  }

  // Accessible font
  const fontBtn = document.getElementById('font-toggle');
  if (fontBtn) {
    fontBtn.classList.toggle('active', state.fontAccessible);
    fontBtn.addEventListener('click', () => {
      state.fontAccessible = !state.fontAccessible;
      store.set('fontAccessible', state.fontAccessible);
      document.body.classList.toggle('font-accessible', state.fontAccessible);
      fontBtn.classList.toggle('active', state.fontAccessible);
    });
  }
}

// ─── READING PROGRESS BAR ────────────────────────────────────────────────────
function initProgressBar() {
  const fill = document.querySelector('.progress-fill');
  if (!fill) return;
  function update() {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    fill.style.width = docH > 0 ? (scrollTop / docH * 100) + '%' : '0%';
  }
  window.addEventListener('scroll', update, { passive: true });
  update();
}

// ─── SELF-TEST (chapter pages) ───────────────────────────────────────────────
function initSelfTest() {
  document.querySelectorAll('.option-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const qItem = this.closest('.question-item');
      if (!qItem || qItem.dataset.answered) return;
      qItem.dataset.answered = '1';

      const correct = this.dataset.correct === 'true';
      qItem.querySelectorAll('.option-btn').forEach(b => {
        b.disabled = true;
        if (b.dataset.correct === 'true') b.classList.add('correct');
      });
      if (!correct) this.classList.add('wrong');

      const facit = qItem.querySelector('.facit');
      if (facit) facit.classList.add('visible');
    });
  });
}

// ─── QUIZ ENGINE ─────────────────────────────────────────────────────────────
let quizQuestions = [];
let quizOrder = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswers = [];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function initQuiz(questions) {
  if (!questions || !questions.length) return;
  quizQuestions = questions;
  startQuiz();
}

function startQuiz() {
  quizOrder = shuffle(quizQuestions.map((_, i) => i));
  quizIndex = 0;
  quizScore = 0;
  quizAnswers = [];

  const result = document.getElementById('quiz-result');
  const review = document.getElementById('quiz-review');
  const quizMain = document.getElementById('quiz-main');
  if (result) result.classList.remove('visible');
  if (review) review.classList.remove('visible');
  if (quizMain) quizMain.style.display = '';

  showQuestion();
}

function showQuestion() {
  const qi = quizOrder[quizIndex];
  const q = quizQuestions[qi];
  const total = quizOrder.length;

  const counter = document.getElementById('quiz-counter');
  const progressFill = document.getElementById('quiz-progress-fill');
  if (counter) counter.textContent = `Fråga ${quizIndex + 1} av ${total}`;
  if (progressFill) progressFill.style.width = (quizIndex / total * 100) + '%';

  const card = document.getElementById('quiz-card');
  if (!card) return;

  const optLetters = ['A', 'B', 'C', 'D'];
  const shuffledOpts = shuffle(q.options.map((o, i) => ({ text: o, correct: i === q.correctIndex })));

  card.innerHTML = `
    <div class="quiz-chapter-tag">Kapitel ${q.chapter}</div>
    <div class="quiz-question">${q.question}</div>
    <div class="quiz-options" id="quiz-options">
      ${shuffledOpts.map((opt, i) => `
        <button class="quiz-option" data-correct="${opt.correct}" onclick="selectOption(this)">
          <span class="option-letter">${optLetters[i]}</span>
          <span class="option-text">${opt.text}</span>
        </button>
      `).join('')}
    </div>
    <div class="quiz-explanation" id="quiz-explanation">${q.explanation}</div>
  `;

  const nextBtn = document.getElementById('quiz-next');
  if (nextBtn) nextBtn.classList.remove('visible');

  if (state.bionic) {
    card.querySelectorAll('.quiz-question, .option-text').forEach(el => walkAndBionic(el, true));
  }
}

function selectOption(btn) {
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach(o => { o.disabled = true; o.classList.remove('selected'); });

  const correct = btn.dataset.correct === 'true';
  btn.classList.add('selected', correct ? 'correct' : 'wrong');

  opts.forEach(o => {
    if (o.dataset.correct === 'true') o.classList.add('correct');
  });

  const qi = quizOrder[quizIndex];
  if (correct) quizScore++;
  quizAnswers.push({ qi, correct, userText: btn.querySelector('.option-text').textContent });

  const exp = document.getElementById('quiz-explanation');
  if (exp) exp.classList.add('visible');

  const nextBtn = document.getElementById('quiz-next');
  if (nextBtn) nextBtn.classList.add('visible');
}

function nextQuestion() {
  quizIndex++;
  if (quizIndex >= quizOrder.length) {
    showResult();
  } else {
    showQuestion();
  }
}

function showResult() {
  const total = quizOrder.length;
  const pct = Math.round(quizScore / total * 100);

  const quizMain = document.getElementById('quiz-main');
  if (quizMain) quizMain.style.display = 'none';

  const result = document.getElementById('quiz-result');
  if (!result) return;
  result.classList.add('visible');

  const scoreEl = result.querySelector('.result-score');
  const labelEl = result.querySelector('.result-label');
  const feedbackEl = result.querySelector('.result-feedback');
  const correctEl = result.querySelector('.stat-correct');
  const wrongEl = result.querySelector('.stat-wrong');

  if (scoreEl) scoreEl.textContent = pct + '%';
  if (labelEl) labelEl.textContent = `${quizScore} av ${total} rätt`;
  if (correctEl) correctEl.textContent = quizScore;
  if (wrongEl) wrongEl.textContent = total - quizScore;

  let feedback = '';
  if (pct >= 90) feedback = '🏆 Utmärkt! Du behärskar AI-kunskapen på en hög nivå.';
  else if (pct >= 70) feedback = '👍 Bra jobbat! Du har ett solitt grepp om ämnet.';
  else if (pct >= 50) feedback = '📖 Halvvägs! Repetera kapitlen och försök igen.';
  else feedback = '💪 Fortsätt läsa! Läromedlet hjälper dig att komma upp i fart.';
  if (feedbackEl) feedbackEl.textContent = feedback;

  // Build review
  const reviewEl = document.getElementById('quiz-review');
  if (reviewEl) {
    reviewEl.innerHTML = '<h3 style="margin-bottom:1rem">Genomgång</h3>' +
      quizAnswers.map(a => {
        const q = quizQuestions[a.qi];
        const correctOpt = q.options[q.correctIndex];
        return `<div class="review-item ${a.correct ? 'correct' : 'wrong'}">
          <div class="review-q">${q.question}</div>
          <div class="review-a">
            ${a.correct ? '✅' : '❌'} Du svarade: ${a.userText}<br>
            ${!a.correct ? `✅ Rätt svar: ${correctOpt}<br>` : ''}
            <em>${q.explanation}</em>
          </div>
        </div>`;
      }).join('');
  }
}

function showReview() {
  const review = document.getElementById('quiz-review');
  if (review) review.classList.toggle('visible');
}

// ─── INIT ─────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initA11yToolbar();
  initProgressBar();
  initSelfTest();
  if (state.bionic) activateBionic();
});
