/**
 * chatbot-widget.js
 *
 * Självständig, drop-in sajt-chattbott för bionicreading.se.
 * Injicerar en flytande knapp (nere till höger) och en panel
 * där besökare kan ställa frågor om innehållet på sajten.
 *
 * Backend: POST {API_BASE_URL}/api/chat  →  { answer, sources[] }
 * Kräver ingen ytterligare CSS-fil.
 */
(function () {
  'use strict';

  if (window.__brcChatbotMounted) return;
  window.__brcChatbotMounted = true;

  // ---- Konfiguration ----------------------------------------------------
  const IS_LOCAL =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.protocol === 'file:';

  // Om window.BRC_API_BASE är satt (t.ex. via inline-script på sidan) används den.
  // Annars localhost under utveckling, och placeholder för produktion.
  const API_BASE_URL =
    (typeof window.BRC_API_BASE === 'string' && window.BRC_API_BASE) ||
    (IS_LOCAL ? 'http://localhost:3000' : 'https://api.bionicreading.se');

  const STATE_KEY = 'brc-chatbot-open';
  const WELCOME =
    'Hej! Jag kan svara på frågor om innehållet på bionicreading.se. Vad undrar du?';

  // ---- Styling ----------------------------------------------------------
  const css = `
  .brc-root, .brc-root * { box-sizing: border-box; }
  .brc-root {
    position: fixed; z-index: 2147483000;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    color: #1e293b;
  }
  .brc-toggle {
    position: fixed; right: 24px; bottom: 24px;
    width: 60px; height: 60px; border-radius: 50%;
    background: linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--accent, #8b5cf6) 100%);
    color: #fff; border: none; cursor: pointer;
    box-shadow: 0 12px 28px rgba(99, 102, 241, 0.35);
    display: flex; align-items: center; justify-content: center;
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .brc-toggle:hover { transform: translateY(-2px); box-shadow: 0 16px 36px rgba(99,102,241,.45); }
  .brc-toggle:focus-visible { outline: 3px solid #fff; outline-offset: 3px; }
  .brc-toggle svg { width: 28px; height: 28px; }

  .brc-panel {
    position: fixed; right: 24px; bottom: 96px;
    width: 380px; max-width: calc(100vw - 32px);
    height: 560px; max-height: calc(100vh - 120px);
    background: #fff; border-radius: 16px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.18);
    display: none; flex-direction: column; overflow: hidden;
    border: 1px solid #e2e8f0;
  }
  .brc-panel.brc-open { display: flex; animation: brc-pop .18s ease-out; }
  @keyframes brc-pop { from { transform: translateY(8px); opacity: 0; } to { transform: none; opacity: 1; } }

  .brc-header {
    padding: 14px 16px; color: #fff;
    background: linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--accent, #8b5cf6) 100%);
    display: flex; align-items: center; justify-content: space-between;
  }
  .brc-header h3 { margin: 0; font-size: 15px; font-weight: 600; }
  .brc-header p { margin: 2px 0 0; font-size: 12px; opacity: .85; }
  .brc-close {
    background: rgba(255,255,255,.15); color: #fff; border: none;
    width: 28px; height: 28px; border-radius: 50%; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px; line-height: 1;
  }
  .brc-close:hover { background: rgba(255,255,255,.28); }

  .brc-messages {
    flex: 1; overflow-y: auto; padding: 16px; background: #f8fafc;
    display: flex; flex-direction: column; gap: 10px;
  }
  .brc-msg { max-width: 85%; padding: 10px 14px; border-radius: 14px; font-size: 14px; line-height: 1.45; white-space: pre-wrap; word-wrap: break-word; }
  .brc-msg.brc-bot { background: #fff; border: 1px solid #e2e8f0; align-self: flex-start; border-bottom-left-radius: 4px; }
  .brc-msg.brc-user { background: linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--accent, #8b5cf6) 100%); color: #fff; align-self: flex-end; border-bottom-right-radius: 4px; }
  .brc-msg.brc-error { background: #fef2f2; color: #991b1b; border: 1px solid #fecaca; align-self: flex-start; }
  .brc-sources { margin-top: 8px; font-size: 12px; color: #64748b; }
  .brc-sources a { display: inline-block; margin: 4px 6px 0 0; padding: 3px 8px; background: #eef2ff; color: #4f46e5; border-radius: 999px; text-decoration: none; }
  .brc-sources a:hover { background: #e0e7ff; }

  .brc-typing { display: inline-flex; gap: 4px; align-self: flex-start; padding: 10px 14px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; border-bottom-left-radius: 4px; }
  .brc-typing span { width: 7px; height: 7px; border-radius: 50%; background: #94a3b8; animation: brc-blink 1.2s infinite both; }
  .brc-typing span:nth-child(2) { animation-delay: .15s; }
  .brc-typing span:nth-child(3) { animation-delay: .3s; }
  @keyframes brc-blink { 0%, 80%, 100% { opacity: .3; transform: scale(.8); } 40% { opacity: 1; transform: scale(1); } }

  .brc-footer { padding: 10px; border-top: 1px solid #e2e8f0; background: #fff; display: flex; gap: 8px; align-items: flex-end; }
  .brc-input {
    flex: 1; resize: none; border: 1px solid #e2e8f0; border-radius: 12px;
    padding: 10px 12px; font-size: 14px; font-family: inherit;
    max-height: 120px; min-height: 40px; outline: none; color: #1e293b; background: #f8fafc;
  }
  .brc-input:focus { border-color: var(--primary, #6366f1); background: #fff; }
  .brc-send {
    background: linear-gradient(135deg, var(--primary, #6366f1) 0%, var(--accent, #8b5cf6) 100%);
    color: #fff; border: none; border-radius: 12px; padding: 0 16px; height: 40px;
    cursor: pointer; font-weight: 600; font-size: 14px;
  }
  .brc-send:disabled { opacity: .5; cursor: not-allowed; }

  @media (max-width: 480px) {
    .brc-panel { right: 8px; left: 8px; bottom: 88px; width: auto; }
    .brc-toggle { right: 16px; bottom: 16px; }
  }
  `;

  // ---- DOM-konstruktion ------------------------------------------------
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
        <button class="brc-close" type="button" aria-label="Stäng">×</button>
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
  const messagesEl = root.querySelector('.brc-messages');
  const form = root.querySelector('.brc-footer');
  const input = root.querySelector('.brc-input');
  const sendBtn = root.querySelector('.brc-send');

  // ---- Hjälpfunktioner -------------------------------------------------
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function scrollToBottom() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

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
  }

  function addTyping() {
    const el = document.createElement('div');
    el.className = 'brc-typing';
    el.setAttribute('data-brc-typing', '1');
    el.innerHTML = '<span></span><span></span><span></span>';
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  function openPanel() {
    panel.classList.add('brc-open');
    try { localStorage.setItem(STATE_KEY, '1'); } catch (e) {}
    setTimeout(() => input.focus(), 80);
  }
  function closePanel() {
    panel.classList.remove('brc-open');
    try { localStorage.setItem(STATE_KEY, '0'); } catch (e) {}
  }

  // ---- Nätverksanrop ---------------------------------------------------
  async function askBackend(message) {
    const res = await fetch(API_BASE_URL + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    let data = null;
    try { data = await res.json(); } catch (e) {}
    if (!res.ok) {
      const err = (data && data.error) || ('HTTP ' + res.status);
      throw new Error(err);
    }
    return data;
  }

  async function sendMessage() {
    const text = (input.value || '').trim();
    if (!text) return;
    input.value = '';
    input.style.height = 'auto';
    addMessage(text, 'user');

    sendBtn.disabled = true;
    const typingEl = addTyping();

    try {
      const data = await askBackend(text);
      typingEl.remove();
      addMessage(data.answer || 'Inget svar.', 'bot', data.sources || []);
    } catch (err) {
      typingEl.remove();
      const msg = /Failed to fetch|NetworkError/i.test(err.message)
        ? 'Kunde inte nå servern. Är backend igång på ' + API_BASE_URL + '?'
        : 'Ursäkta, något gick fel: ' + err.message;
      addMessage(msg, 'error');
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  // ---- Eventbindning ---------------------------------------------------
  toggleBtn.addEventListener('click', () => {
    panel.classList.contains('brc-open') ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Auto-grow textarea
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  // Esc stänger
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.classList.contains('brc-open')) closePanel();
  });

  // ---- Init ------------------------------------------------------------
  addMessage(WELCOME, 'bot');
  try {
    if (localStorage.getItem(STATE_KEY) === '1') openPanel();
  } catch (e) {}
})();
