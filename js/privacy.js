/*
 * Integritetsskydd för sidor som skickar text till en extern AI-tjänst.
 *  1. Visar en tydlig påminnelse om att inte skriva personuppgifter.
 *  2. Maskerar personnummer, e-postadresser och svenska mobilnummer i den text
 *     som skickas till AI-tjänsten (sker i webbläsaren, före anropet).
 *
 * Namn och annan fritext kan inte maskeras automatiskt. Påminnelsen är därför viktig.
 * Lägg in på en sida med: <script src="js/privacy.js"></script> (före </head>).
 */
(function () {
  'use strict';
  if (window.__privacyGuard) return;
  window.__privacyGuard = true;

  var AI_HOSTS = ['api.anthropic.com', 'generativelanguage.googleapis.com', 'api.openai.com', 'api.elevenlabs.io'];

  var RULES = [
    { re: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, to: '[e-post borttagen]' },
    // Personnummer och samordningsnummer: ÅÅMMDD-NNNN eller ÅÅÅÅMMDD-NNNN (dag 01–31, samordning 61–91)
    { re: /(?<![\d])(?:19|20)?\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01]|[6-8]\d|9[01])[-+ ]?\d{4}(?![\d])/g, to: '[personnummer borttaget]' },
    // Svenska mobilnummer: 070-123 45 67, 0701234567, +46 70 123 45 67
    { re: /(?<![\d])(?:\+46|0046)[\s-]?\(?0?\)?[\s-]?7\d(?:[\s-]?\d){7}(?![\d])/g, to: '[telefonnummer borttaget]' },
    { re: /(?<![\d])07\d[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}(?![\d])/g, to: '[telefonnummer borttaget]' }
  ];

  function maskString(s, state) {
    var out = s;
    for (var i = 0; i < RULES.length; i++) {
      out = out.replace(RULES[i].re, function () { state.changed = true; return RULES[i].to; });
    }
    return out;
  }
  function maskDeep(v, state) {
    if (typeof v === 'string') return maskString(v, state);
    if (Array.isArray(v)) return v.map(function (x) { return maskDeep(x, state); });
    if (v && typeof v === 'object') {
      var o = {};
      Object.keys(v).forEach(function (k) { o[k] = maskDeep(v[k], state); });
      return o;
    }
    return v;
  }
  function maskBody(body) {
    var state = { changed: false };
    var out;
    try { out = JSON.stringify(maskDeep(JSON.parse(body), state)); }
    catch (e) { out = maskString(body, state); }
    return { body: state.changed ? out : body, changed: state.changed };
  }
  function isAiUrl(u) {
    try { return AI_HOSTS.indexOf(new URL(u, location.href).hostname) !== -1; } catch (e) { return false; }
  }

  function toast(msg) {
    var t = document.getElementById('pg-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'pg-toast';
      t.setAttribute('role', 'status');
      t.style.cssText = 'position:fixed;left:50%;bottom:64px;transform:translateX(-50%);max-width:92vw;background:#1f2a3d;color:#fff;padding:10px 16px;border-radius:12px;font:14px/1.4 system-ui,sans-serif;z-index:2147483646;box-shadow:0 4px 16px rgba(0,0,0,.3)';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(t._h);
    t._h = setTimeout(function () { t.style.display = 'none'; }, 6000);
  }

  if (typeof window.fetch === 'function') {
    var origFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      try {
        var url = typeof input === 'string' ? input : (input && input.url) || '';
        if (isAiUrl(url) && init && typeof init.body === 'string') {
          var r = maskBody(init.body);
          if (r.changed) {
            init = Object.assign({}, init, { body: r.body });
            if (document.body) toast('🔒 Jag tog bort något som såg ut som personuppgifter innan texten skickades.');
          }
        }
      } catch (e) { /* skicka vidare oförändrat hellre än att bryta sidan */ }
      return origFetch(input, init);
    };
  }

  function banner() {
    try { if (sessionStorage.getItem('pg-ok') === '1') return; } catch (e) {}
    var b = document.createElement('div');
    b.id = 'pg-banner';
    b.setAttribute('role', 'note');
    b.style.cssText = 'position:fixed;left:0;right:0;bottom:0;background:#fff7e0;color:#4a3a05;border-top:2px solid #f2a93b;padding:8px 12px;font:13px/1.4 system-ui,sans-serif;z-index:2147483645;display:flex;gap:12px;align-items:center;justify-content:center;flex-wrap:wrap';
    var txt = document.createElement('span');
    txt.textContent = '🔒 Det du skriver här skickas till en extern AI-tjänst (USA). Skriv inte namn, personnummer, hälsouppgifter eller annat som går att koppla till en person (elev, kollega eller förälder).';
    var ok = document.createElement('button');
    ok.type = 'button';
    ok.textContent = 'Jag förstår';
    ok.style.cssText = 'border:0;background:#f2a93b;color:#3b2c00;font:600 13px system-ui,sans-serif;padding:6px 12px;border-radius:8px;cursor:pointer';
    ok.addEventListener('click', function () {
      b.remove();
      try { sessionStorage.setItem('pg-ok', '1'); } catch (e) {}
    });
    b.appendChild(txt); b.appendChild(ok);
    document.body.appendChild(b);
    document.body.style.paddingBottom = 'max(' + (document.body.style.paddingBottom || '0px') + ', 56px)';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
  else banner();

  window.__privacyGuard = { maskBody: maskBody, maskString: function (s) { return maskString(s, { changed: false }); } };
})();
