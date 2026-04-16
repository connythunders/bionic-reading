/**
 * chatbot-widget.js
 *
 * Helt client-side sajt-chattbott för bionicreading.se.
 * - Laddar data/content-index.json vid första fråga
 * - TF-IDF-sökning i webbläsaren
 * - Anropar Google Gemini direkt med användarens egen API-nyckel
 *   (samma mönster och samma localStorage-nyckel som ai-language-coach.html)
 *
 * Drop-in: <script src="js/chatbot-widget.js" defer></script>
 */
(function () {
  'use strict';

  if (window.__brcChatbotMounted) return;
  window.__brcChatbotMounted = true;

  // ---- Konfiguration ----------------------------------------------------
  const INDEX_URL = 'data/content-index.json';
  const LS_API_KEY = 'gemini_api_key';   // delas med ai-language-coach.html
  const LS_STATE = 'brc-chatbot-open';
  const GEMINI_ENDPOINT =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  const WELCOME =
    'Hej! Jag kan svara på frågor om innehållet på bionicreading.se. Vad undrar du?';

  const STOPWORDS = new Set([
    'och','att','det','som','en','på','är','för','av','med','till','den','har',
    'de','inte','om','ett','men','var','jag','sig','från','han','vi','så','kan',
    'man','när','här','där','eller','vid','också','nu','då','ska','skulle','kunde',
    'blir','blev','blivit','vara','varit','hade','haft','alla','andra','denna',
    'dessa','detta','dem','dig','din','dina','ditt','du','efter','eftersom','ej',
    'endast','er','era','ert','finns','få','får','genom','hans','hennes','honom',
    'hur','i','ja','mer','mig','min','mina','mitt','mot','ni','någon','något',
    'några','oss','över','samma','sin','sina','sitt','själv','sätt','under','upp',
    'ur','utan','vad','vem','vilka','vilken','vilket','vår','våra','vårt','ända',
    'även','the','a','an','and','or','is','to','of','in'
  ]);

  // ---- Styling ----------------------------------------------------------
  const css = `
  .brc-root, .brc-root * { box-sizing: border-box; }
  .brc-root { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; }
  .brc-toggle {
    position: fixed; right: 24px; bottom: 24px; z-index: 2147483000;
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, var(--primary,#6366f1) 0%, var(--accent,#8b5cf6) 100%);
    color: #fff; border: none; cursor: pointer;
    box-shadow: 0 12px 28px rgba(99,102,241,.35);
    display: flex; align-items: center; justify-content: center;
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .brc-toggle:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(99,102,241,.45); }
  .brc-toggle:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
  .brc-toggle svg { width: 28px; height: 28px; }

  .brc-panel {
    position: fixed; right: 24px; bottom: 96px; z-index: 2147483000;
    width: 380px; max-width: calc(100vw - 32px);
    height: 560px; max-height: calc(100vh - 120px);
    background: #fff; border-radius: 16px;
    box-shadow: 0 24px 64px rgba(0,0,0,.18);
    display: none; flex-direction: column; overflow: hidden;
    border: 1px solid #e2e8f0;
  }
  .brc-panel.brc-open { display: flex; animation: brc-pop .18s ease-out; }
  @keyframes brc-pop { from { transform: translateY(8px); opacity: 0; } to { transform: none; opacity: 1; } }

  .brc-header {
    padding: 14px 16px; color: #fff;
    background: linear-gradient(135deg, var(--primary,#6366f1) 0%, var(--accent,#8b5cf6) 100%);
    display: flex; align-items: center; justify-content: space-between;
  }
  .brc-header h3 { margin: 0; font-size: 15px; font-weight: 600; }
  .brc-header p { margin: 2px 0 0; font-size: 12px; opacity: .85; }
  .brc-header-actions { display: flex; gap: 6px; }
  .brc-iconbtn {
    background: rgba(255,255,255,.15); color: #fff; border: none;
    width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; line-height: 1;
  }
  .brc-iconbtn:hover { background: rgba(255,255,255,.28); }

  .brc-messages {
    flex: 1; overflow-y: auto; padding: 16px; background: #f8fafc;
    display: flex; flex-direction: column; gap: 10px;
  }
  .brc-msg { max-width: 85%; padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.45; white-space: pre-wrap; word-wrap: break-word; }
  .brc-msg.brc-bot { background: #fff; border: 1px solid #e2e8f0; align-self: flex-start; border-bottom-left-radius: 4px; }
  .brc-msg.brc-user { background: linear-gradient(135deg, var(--primary,#6366f1) 0%, var(--accent,#8b5cf6) 100%); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  .brc-msg.brc-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; align-self: flex-start; }
  .brc-sources { margin-top: 8px; font-size: 12px; color: #64748b; }
  .brc-sources a { display: inline-block; margin: 4px 6px 0 0; padding: 3px 8px; background: #eef2ff; color: #4f46e5; border-radius: 999px; text-decoration: none; }
  .brc-sources a:hover { background: #e0e7ff; }

  .brc-setup { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px; align-self: stretch; font-size: 13px; }
  .brc-setup h4 { margin: 0 0 6px; font-size: 14px; color: #4f46e5; }
  .brc-setup p { margin: 4px 0; color: #475569; }
  .brc-setup a { color: #6366f1; }
  .brc-setup input { width: 100%; padding: 8px 10px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; margin-top: 6px; font-family: inherit; }
  .brc-setup button { margin-top: 8px; padding: 8px 14px; border: none; border-radius: 8px; color: #fff; font-weight: 600; cursor: pointer; background: linear-gradient(135deg, var(--primary,#6366f1) 0%, var(--accent,#8b5cf6) 100%); }

  .brc-typing { display: inline-flex; gap: 4px; align-self: flex-start; padding: 10px 14px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; border-bottom-left-radius: 4px; }
  .brc-typing span { width: 7px; height: 7px; border-radius: 50%; background: #94a3b8; animation: brc-blink 1.2s infinite both; }
  .brc-typing span:nth-child(2) { animation-delay: .15s; }
  .brc-typing span:nth-child(3) { animation-delay: .3s; }
  @keyframes brc-blink { 0%,80%,100% { opacity: .3; transform: scale(.8); } 40% { opacity: 1; transform: scale(1); } }

  .brc-footer { padding: 10px; border-top: 1px solid #e2e8f0; background: #fff; display: flex; gap: 8px; align-items: flex-end; }
  .brc-input {
    flex: 1; resize: none; border: 1px solid #e2e8f0; border-radius: 12px;
    padding: 10px 12px; font-size: 14px; font-family: inherit;
    max-height: 120px; min-height: 40px; outline: none; color: #1e293b; background: #f8fafc;
  }
  .brc-input:focus { border-color: var(--primary,#6366f1); background: #fff; }
  .brc-send {
    background: linear-gradient(135deg, var(--primary,#6366f1) 0%, var(--accent,#8b5cf6) 100%);
    color: #fff; border: none; border-radius: 12px; padding: 0 16px; height: 40px;
    cursor: pointer; font-weight: 600; font-size: 14px;
  }
  .brc-send:disabled { opacity: .5; cursor: not-allowed; }

  @media (max-width: 480px) {
    .brc-panel { right: 8px; left: 8px; bottom: 88px; width: auto; }
    .brc-toggle { right: 16px; bottom: 16px; }
  }
  `;

  // ---- DOM --------------------------------------------------------------
  const style = document.createElement('style');
  style.setAttribute('data-brc', 'chatbot');
  style.textContent = css;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.className = 'brc-root';
  root.innerHTML = `
    <button class="brc-toggle" type="button" aria-label="Öppna chattassistent" title="Fråga sajt-assistenten">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9A2.5 2.5 0 0 1 17.5 17H9l-4 4v-4H6.5A2.5 2.5 0 0 1 4 14.5v-9Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
        <circle cx="9" cy="10" r="1" fill="currentColor"/>
        <circle cx="12" cy="10" r="1" fill="currentColor"/>
        <circle cx="15" cy="10" r="1" fill="currentColor"/>
      </svg>
    </button>
    <div class="brc-panel" role="dialog" aria-label="Sajt-chattassistent">
      <div class="brc-header">
        <div>
          <h3>Fråga om sajten</h3>
          <p>Svar baserade på bionicreading.se</p>
        </div>
        <div class="brc-header-actions">
          <button class="brc-iconbtn brc-settings" type="button" aria-label="Inställningar" title="Byt API-nyckel">⚙</button>
          <button class="brc-iconbtn brc-close" type="button" aria-label="Stäng" title="Stäng">×</button>
        </div>
      </div>
      <div class="brc-messages" aria-live="polite"></div>
      <form class="brc-footer" autocomplete="off">
        <textarea class="brc-input" rows="1" placeholder="Ställ en fråga…" maxlength="500" aria-label="Din fråga"></textarea>
        <button class="brc-send" type="submit">Skicka</button>
      </form>
    </div>
  `;
  document.body.appendChild(root);

  const toggleBtn = root.querySelector('.brc-toggle');
  const panel = root.querySelector('.brc-panel');
  const closeBtn = root.querySelector('.brc-close');
  const settingsBtn = root.querySelector('.brc-settings');
  const messagesEl = root.querySelector('.brc-messages');
  const form = root.querySelector('.brc-footer');
  const input = root.querySelector('.brc-input');
  const sendBtn = root.querySelector('.brc-send');

  // ---- Hjälp ------------------------------------------------------------
  function scrollToBottom() { messagesEl.scrollTop = messagesEl.scrollHeight; }

  function addMessage(text, who, sources) {
    const el = document.createElement('div');
    el.className = 'brc-msg ' + (who === 'user' ? 'brc-user' : who === 'error' ? 'brc-error' : 'brc-bot');
    el.textContent = text;
    if (sources && sources.length) {
      const s = document.createElement('div');
      s.className = 'brc-sources';
      const label = document.createElement('span');
      label.textContent = 'Läs mer: ';
      s.appendChild(label);
      for (const src of sources) {
        const a = document.createElement('a');
        a.href = src.url;
        a.textContent = src.title || src.url;
        a.target = '_self';
        s.appendChild(a);
      }
      el.appendChild(s);
    }
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  function addTyping() {
    const el = document.createElement('div');
    el.className = 'brc-typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  function addSetup() {
    const el = document.createElement('div');
    el.className = 'brc-setup';
    el.innerHTML = `
      <h4>Engångskonfiguration</h4>
      <p>Chatten använder Google Gemini. Klistra in din egen API-nyckel (gratis att skapa).
         Nyckeln sparas bara lokalt i din webbläsare.</p>
      <p><a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Hämta nyckel hos Google AI Studio ↗</a></p>
      <input type="password" placeholder="AIza…" autocomplete="off" />
      <button type="button">Spara nyckel</button>
    `;
    messagesEl.appendChild(el);
    const inp = el.querySelector('input');
    const btn = el.querySelector('button');
    btn.addEventListener('click', () => {
      const key = (inp.value || '').trim();
      if (!key) { inp.focus(); return; }
      localStorage.setItem(LS_API_KEY, key);
      el.remove();
      addMessage('Nyckeln är sparad. Ställ gärna din fråga nu!', 'bot');
      input.focus();
    });
    inp.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
    });
    scrollToBottom();
    setTimeout(() => inp.focus(), 50);
    return el;
  }

  function openPanel() {
    panel.classList.add('brc-open');
    try { localStorage.setItem(LS_STATE, '1'); } catch (e) {}
    setTimeout(() => input.focus(), 80);
  }
  function closePanel() {
    panel.classList.remove('brc-open');
    try { localStorage.setItem(LS_STATE, '0'); } catch (e) {}
  }

  // ---- Index-laddning ---------------------------------------------------
  let indexPromise = null;
  function loadIndex() {
    if (indexPromise) return indexPromise;
    indexPromise = fetch(INDEX_URL, { cache: 'force-cache' })
      .then(r => {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .catch(err => {
        indexPromise = null;
        throw new Error('Kunde inte ladda innehållsindex: ' + err.message);
      });
    return indexPromise;
  }

  // ---- TF-IDF-sökning i webbläsaren ------------------------------------
  function tokenize(text) {
    if (!text) return [];
    return text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, ' ')
      .split(/\s+/)
      .filter(t => t.length >= 2 && t.length <= 30 && !STOPWORDS.has(t) && !/^\d+$/.test(t));
  }

  function search(index, query, topK) {
    topK = topK || 5;
    const qTokens = tokenize(query);
    if (!qTokens.length) return [];
    const qTf = {};
    for (const t of qTokens) qTf[t] = (qTf[t] || 0) + 1;
    const idf = index.idf;
    const results = [];

    for (const doc of index.documents) {
      const titleTokens = new Set(tokenize(doc.title));
      let titleBoost = 0;
      for (const qt of Object.keys(qTf)) if (titleTokens.has(qt)) titleBoost += 0.5;

      for (const chunk of doc.chunks) {
        let score = 0, matches = 0;
        for (const term in qTf) {
          const c = chunk.tf[term] || 0;
          if (!c) continue;
          const w = idf[term] || 1;
          score += qTf[term] * c * w * w;
          matches++;
        }
        if (!matches) continue;
        score *= (1 + 0.15 * matches);
        score += titleBoost;
        results.push({
          docId: doc.id, url: doc.url, title: doc.title,
          heading: chunk.heading, text: chunk.text, score
        });
      }
    }
    results.sort((a, b) => b.score - a.score);

    const seen = new Map(), out = [];
    for (const r of results) {
      const n = seen.get(r.docId) || 0;
      if (n >= 2) continue;
      seen.set(r.docId, n + 1);
      out.push(r);
      if (out.length >= topK) break;
    }
    return out;
  }

  // ---- Gemini-anrop -----------------------------------------------------
  function buildPrompt(question, chunks) {
    const sources = chunks.length
      ? chunks.map((c, i) => {
          const h = c.heading && c.heading !== c.title ? ' — Rubrik: ' + c.heading : '';
          return '[' + (i + 1) + '] Titel: ' + c.title + ' — URL: ' + c.url + h + '\n' + c.text;
        }).join('\n\n')
      : '(Inga relevanta utdrag hittades på sajten.)';

    return (
      'Du är en hjälpsam assistent för bionicreading.se, en svensk utbildningssajt ' +
      'med läromedel och verktyg för årskurs 7–9 (religion, historia, svenska, engelska, SO).\n\n' +
      'Regler:\n' +
      '- Svara ALLTID på svenska.\n' +
      '- Basera ditt svar ENBART på nedanstående utdrag. Gissa inte.\n' +
      '- Om svaret inte finns i utdragen, säg vänligt att du inte hittar informationen och föreslå relevanta sidor baserat på titlarna.\n' +
      '- Nämn gärna sidan du refererar till (t.ex. "Läs mer på /islam-ovningar.html").\n' +
      '- Håll svaret kort (max 150 ord), vänligt tonfall.\n' +
      '- Besvara inte frågor helt utanför sajtens tema (nyheter, personliga råd). Säg då artigt att du bara hjälper till med innehållet på bionicreading.se.\n\n' +
      'KÄLLOR:\n' + sources + '\n\n' +
      'FRÅGA: ' + question + '\n\nSVAR:'
    );
  }

  async function callGemini(apiKey, prompt) {
    const res = await fetch(GEMINI_ENDPOINT + '?key=' + encodeURIComponent(apiKey), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 500, topP: 0.9 }
      })
    });
    let data = null;
    try { data = await res.json(); } catch (e) {}
    if (!res.ok) {
      const msg = (data && data.error && data.error.message) || ('HTTP ' + res.status);
      throw new Error(msg);
    }
    const text =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text;
    return (text || '').trim();
  }

  // ---- Huvudflöde -------------------------------------------------------
  async function sendMessage() {
    const question = (input.value || '').trim();
    if (!question) return;

    const apiKey = localStorage.getItem(LS_API_KEY);
    if (!apiKey) {
      addMessage(question, 'user');
      input.value = ''; input.style.height = 'auto';
      addMessage('Jag behöver en Gemini API-nyckel för att svara. Klistra in den nedan – du skaffar den gratis hos Google AI Studio.', 'bot');
      addSetup();
      return;
    }

    input.value = ''; input.style.height = 'auto';
    addMessage(question, 'user');
    sendBtn.disabled = true;
    const typingEl = addTyping();

    try {
      const index = await loadIndex();
      const hits = search(index, question, 5);
      const prompt = buildPrompt(question, hits);
      const answer = await callGemini(apiKey, prompt);

      typingEl.remove();

      const seen = new Set(), sources = [];
      for (const h of hits) {
        if (seen.has(h.url)) continue;
        seen.add(h.url);
        sources.push({ title: h.title, url: h.url });
      }

      addMessage(answer || 'Inget svar.', 'bot', sources);
    } catch (err) {
      typingEl.remove();
      const msg = /API key not valid|API_KEY_INVALID|invalid api key/i.test(err.message)
        ? 'API-nyckeln verkar inte vara giltig. Klicka på ⚙ och klistra in en ny.'
        : /fetch|Failed to fetch|NetworkError/i.test(err.message)
          ? 'Kunde inte nå Gemini eller innehållsindexet. Kontrollera din anslutning.'
          : 'Ursäkta, något gick fel: ' + err.message;
      addMessage(msg, 'error');
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // ---- Event ------------------------------------------------------------
  toggleBtn.addEventListener('click', () => {
    panel.classList.contains('brc-open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);

  settingsBtn.addEventListener('click', () => {
    const existing = localStorage.getItem(LS_API_KEY);
    if (existing && !confirm('Vill du byta API-nyckel? Den nuvarande raderas.')) return;
    localStorage.removeItem(LS_API_KEY);
    addMessage('API-nyckeln är borttagen. Klistra in en ny nedan.', 'bot');
    addSetup();
  });

  form.addEventListener('submit', (e) => { e.preventDefault(); sendMessage(); });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('brc-open')) closePanel();
  });

  // ---- Init -------------------------------------------------------------
  addMessage(WELCOME, 'bot');
  if (!localStorage.getItem(LS_API_KEY)) {
    addMessage('Första gången behöver du klistra in din Gemini API-nyckel (gratis). Den sparas bara lokalt i din webbläsare.', 'bot');
    addSetup();
  }
  try {
    if (localStorage.getItem(LS_STATE) === '1') openPanel();
  } catch (e) {}
})();
