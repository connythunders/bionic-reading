/* NP Matematik nivå 1 – provträning. Ingen server, allt sparas lokalt. */
(function () {
  'use strict';

  /* ---------- Konstanter ---------- */
  var PROVDATUM = new Date('2026-12-15T09:00:00+01:00');
  var OMRADEN = [
    'Aritmetik och algebra',
    'Funktioner',
    'Sannolikhet och statistik',
    'Privatekonomi och vardagsmatematik',
    'Geometri och trigonometri',
    'Vektorer',
    'Problemlösning'
  ];
  var DELAR = {
    A: { namn: 'Del A', verktyg: 'Utan räknare', tid: 60, kort: 15, ikon: '✎',
         info: 'Kortsvarsuppgifter utan digitala verktyg. Formelblad, kladdpapper och linjal är tillåtna. Svaren skrivs i elevhäftet.' },
    B: { namn: 'Del B', verktyg: 'Utan räknare', tid: 60, kort: 15, ikon: '✎', info: '' },
    C: { namn: 'Del C', verktyg: 'Enkel räknare', tid: 120, kort: 30, ikon: '▦',
         info: 'Enkel räknare och formelblad. Lösningarna skrivs på separat papper – redovisa fullständigt.' }
  };
  /* Del B skiljer sig: 1a har enkel räknare, 1b/1c inga digitala verktyg alls. */
  function uppdateraDelB(kurs) {
    if (kurs === '1a') {
      DELAR.B.verktyg = 'Enkel räknare'; DELAR.B.ikon = '▦';
      DELAR.B.info = 'För 1a är enkel räknare tillåten. Lösningarna skrivs i elevhäftet.';
    } else {
      DELAR.B.verktyg = 'Utan räknare'; DELAR.B.ikon = '✎';
      DELAR.B.info = 'För 1b och 1c är digitala verktyg inte tillåtna – ingen räknare. Lösningarna skrivs i elevhäftet.';
    }
  }
  /* Poängmål per del i provsimuleringen. Tidigare NP i Ma1 hade cirka 55–65 poäng. */
  var PROVMAL = { hel: { A: 16, B: 16, C: 26 }, kort: { A: 5, B: 5, C: 9 } };
  /* Ungefärliga betygsgränser som andel av maxpoäng, baserade på tidigare NP i Ma1. */
  var GRANSER = [
    { betyg: 'A', tot: 0.78, a: 0.14 },
    { betyg: 'B', tot: 0.65, a: 0.08 },
    { betyg: 'C', tot: 0.51, ca: 0.19 },
    { betyg: 'D', tot: 0.40, ca: 0.13 },
    { betyg: 'E', tot: 0.24 }
  ];
  var LS_KEY = 'npma1_v1';

  /* ---------- Lagring ---------- */
  var store = load();
  function load() {
    var d = null;
    try { d = JSON.parse(localStorage.getItem(LS_KEY) || 'null'); } catch (e) { d = null; }
    d = d || {};
    d.kurs = d.kurs || '1b';
    d.hist = d.hist || {};
    d.prov = d.prov || [];
    d.dagar = d.dagar || {};
    return d;
  }
  function save() { try { localStorage.setItem(LS_KEY, JSON.stringify(store)); } catch (e) { /* privat läge */ } }

  /* ---------- Data ---------- */
  /* "<" och ">" inuti \( \) eller \[ \] tolkas annars som HTML-taggar och förstör formeln */
  function texSakra(html) {
    if (typeof html !== 'string') return html;
    return html.replace(/\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/g, function (m) { return m.replace(/</g, '&lt;').replace(/>/g, '&gt;'); });
  }
  var ALLA = (window.NP_UPPGIFTER || []).filter(function (u) { return u && u.id && u.fraga; });
  ALLA.forEach(function (u) {
    u.fraga = texSakra(u.fraga);
    u.losning = texSakra(u.losning);
    if (u.ledtradar) u.ledtradar = u.ledtradar.map(texSakra);
    if (u.bedomning) u.bedomning = u.bedomning.map(texSakra);
    if (u.svar && u.svar.alternativ) u.svar.alternativ = u.svar.alternativ.map(texSakra);
    if (u.svar && u.svar.facit) u.svar.facit = texSakra(u.svar.facit);
  });
  var BYID = {};
  ALLA.forEach(function (u) { BYID[u.id] = u; });
  function uppgifter() {
    return ALLA.filter(function (u) { return !u.kurser || u.kurser.indexOf(store.kurs) !== -1; });
  }

  /* ---------- Hjälpfunktioner ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function math(el) {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(el, {
          delimiters: [{ left: '\\[', right: '\\]', display: true }, { left: '\\(', right: '\\)', display: false }, { left: '$$', right: '$$', display: true }],
          throwOnError: false
        });
      } catch (e) { /* visa råtext */ }
    }
  }
  function parsePoang(p) {
    var m = String(p || '1/0/0').split('/').map(function (x) { return parseInt(x, 10) || 0; });
    return { E: m[0] || 0, C: m[1] || 0, A: m[2] || 0 };
  }
  function sumP(p) { return p.E + p.C + p.A; }
  function poangText(p) { return p.E + '/' + p.C + '/' + p.A; }
  function nivaPill(n) { return '<span class="pill pill-' + String(n || 'E').toLowerCase() + '">' + esc(n || 'E') + '-nivå</span>'; }
  function idag() { var d = new Date(); return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate(); }
  function fmtTid(sek) {
    sek = Math.max(0, Math.round(sek));
    var h = Math.floor(sek / 3600), m = Math.floor((sek % 3600) / 60), s = sek % 60;
    return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s).padStart(2, '0');
  }

  /* ---------- Rättning ---------- */
  function parseNum(raw) {
    if (raw == null) return NaN;
    var s = String(raw).trim().toLowerCase();
    if (!s) return NaN;
    if (s.indexOf('=') !== -1) s = s.slice(s.lastIndexOf('=') + 1);
    s = s.replace(/[\s   ]/g, '')
      .replace(/[−–]/g, '-')
      .replace(/,/g, '.')
      .replace(/[·×]/g, '*')
      .replace(/π/g, 'pi')
      .replace(/√\(/g, 'sqrt(')
      .replace(/√([0-9.]+)/g, 'sqrt($1)');
    s = s.replace(/(kr|st|cm|mm|dm|km|m|g|kg|h|min|s|år|ml|l|cl|°|grader|%|procent|ggr|personer|liter|meter|kronor|dagar|timmar)+(\^?[23²³])?$/, '');
    s = s.replace(/²/g, '^2').replace(/³/g, '^3');
    if (!/^[0-9.+\-*/()^a-z]*$/.test(s)) return NaN;
    var test = s.replace(/sqrt|pi/g, '');
    if (/[a-z]/.test(test)) return NaN;
    s = s.replace(/\^/g, '**').replace(/sqrt/g, 'Math.sqrt').replace(/pi/g, 'Math.PI');
    s = s.replace(/(\d)(Math|\()/g, '$1*$2').replace(/\)(\d|Math|\()/g, ')*$1');
    try {
      var v = Function('"use strict";return (' + s + ');')();
      return typeof v === 'number' && isFinite(v) ? v : NaN;
    } catch (e) { return NaN; }
  }
  function splitFlera(raw) {
    var s = String(raw || '').replace(/\b(och|eller)\b/gi, ';').replace(/,\s+/g, ';').replace(/\|/g, ';');
    return s.split(';').map(function (x) { return x.trim(); }).filter(Boolean);
  }
  function near(a, b, tol) {
    var t = tol > 0 ? tol : Math.max(1e-9, Math.abs(b) * 1e-6);
    return Math.abs(a - b) <= t + 1e-12;
  }
  function normText(s) {
    return String(s || '').toLowerCase().replace(/[\s ]/g, '').replace(/[*·⋅]/g, '').replace(/,/g, '.').replace(/[−–]/g, '-').replace(/²/g, '^2').replace(/³/g, '^3');
  }
  /* Algebraisk likvärdighet: jämför uttryck numeriskt i slumpade punkter. */
  function kompilera(raw) {
    var s = String(raw || '').toLowerCase().replace(/[\s\u00a0]/g, '').replace(/[·⋅×]/g, '*').replace(/,/g, '.').replace(/[−–]/g, '-').replace(/²/g, '^2').replace(/³/g, '^3');
    if (s.indexOf('=') !== -1) s = s.slice(s.lastIndexOf('=') + 1);
    if (!s || !/^[0-9.+\-*/()^a-z]+$/.test(s) || /[a-z]{2,}/.test(s.replace(/sqrt/g, ''))) return null;
    var vars = (s.replace(/sqrt/g, '').match(/[a-z]/g) || []).filter(function (c, i, a) { return a.indexOf(c) === i; });
    var js = s.replace(/sqrt/g, '#')
      .replace(/(\d|\))(?=[a-z#(])/g, '$1*')
      .replace(/([a-z])(?=[a-z#(\d])/g, '$1*')
      .replace(/(^|\()-/g, '$10-') /* JS tillåter inte -x**2 */
      .replace(/\^/g, '**').replace(/#/g, 'Math.sqrt');
    try { return { vars: vars, f: Function(vars.join(','), '"use strict";return (' + js + ');') }; } catch (e) { return null; }
  }
  function likvardiga(a, b) {
    /* oförenklade svar (med parentes) godtas bara om facit självt har parentes */
    var ra = String(a).replace(/^[^=]*=/, ''), rb = String(b).replace(/^[^=]*=/, '');
    if (rb.indexOf('(') !== -1 && ra.indexOf('(') === -1) return false;
    var A = kompilera(a), B = kompilera(b);
    if (!A || !B) return false;
    var vars = A.vars.slice(); B.vars.forEach(function (v) { if (vars.indexOf(v) === -1) vars.push(v); });
    if (vars.length > 4) return false;
    for (var t = 0; t < 6; t++) {
      var pt = {}; vars.forEach(function (v) { pt[v] = 0.5 + Math.random() * 3; });
      try {
        var x = A.f.apply(null, A.vars.map(function (v) { return pt[v]; }));
        var y = B.f.apply(null, B.vars.map(function (v) { return pt[v]; }));
        if (typeof x !== 'number' || typeof y !== 'number' || !isFinite(x) || !isFinite(y)) return false;
        if (Math.abs(x - y) > 1e-7 * Math.max(1, Math.abs(x))) return false;
      } catch (e) { return false; }
    }
    return true;
  }
  /* returnerar true/false eller null (kan ej rättas automatiskt) */
  function ratta(u, svar) {
    var s = u.svar || {};
    if (u.typ === 'redovisning') return null;
    if (svar == null || svar === '') return false;
    if (u.typ === 'val') return Number(svar) === Number(s.ratt);
    if (u.typ === 'tal') {
      /* godta att eleven skriver uppgiftens egen enhet efter talet, t.ex. "12 paket" eller "3,5 kr/kg" */
      var raw = String(svar).toLowerCase().replace(/\s/g, ''), enh = String(s.enhet || '').toLowerCase().replace(/\s/g, '');
      if (enh && raw.length > enh.length && raw.slice(-enh.length) === enh) svar = raw.slice(0, -enh.length);
      var v = parseNum(svar); return !isNaN(v) && near(v, Number(s.varde), Number(s.tolerans) || 0); }
    if (u.typ === 'flera') {
      var delar = splitFlera(svar).map(parseNum);
      var facit = (s.varden || []).slice();
      if (delar.length !== facit.length || delar.some(isNaN)) return false;
      var tol = Number(s.tolerans) || 0;
      return delar.every(function (d) {
        for (var i = 0; i < facit.length; i++) { if (near(d, facit[i], tol)) { facit.splice(i, 1); return true; } }
        return false;
      });
    }
    if (u.typ === 'text') {
      var n = normText(svar);
      if ((s.godkanda || []).some(function (g) { return normText(g) === n; })) return true;
      return (s.godkanda || []).some(function (g) { return likvardiga(g, svar); });
    }
    return false;
  }
  /* Bedömningsrader -> poäng per rad, t.ex. "+E<sub>P</sub> ..." */
  function radPoang(rad) {
    var p = { E: 0, C: 0, A: 0 };
    var txt = String(rad).replace(/<[^>]+>/g, ' ');
    var re = /\+\s*(\d+\s*)?([ECA])(?=[^a-zåäöA-ZÅÄÖ]|$|[A-Z]{1,2}\b)/g, m;
    var raw = String(rad);
    var re2 = /\+\s*(\d+\s*)?([ECA])(?![a-zåäö])/g;
    while ((m = re2.exec(raw)) !== null) { p[m[2]] += m[1] ? parseInt(m[1], 10) : 1; }
    if (!sumP(p)) { while ((m = re.exec(txt)) !== null) { p[m[2]] += m[1] ? parseInt(m[1], 10) : 1; } }
    return p;
  }
  function rubricMax(u) {
    var t = { E: 0, C: 0, A: 0 };
    (u.bedomning || []).forEach(function (r) { var p = radPoang(r); t.E += p.E; t.C += p.C; t.A += p.A; });
    return t;
  }
  /* poäng för en uppgift: auto (rätt => alla poäng) eller självbedömd */
  function poangFor(u, svar, sjalv) {
    var max = parsePoang(u.poang);
    if (u.typ === 'redovisning') {
      if (!sjalv) return { E: 0, C: 0, A: 0 };
      if (sjalv.helt != null) {
        var f = sjalv.helt;
        return { E: Math.round(max.E * f), C: Math.round(max.C * f), A: Math.round(max.A * f) };
      }
      var t = { E: 0, C: 0, A: 0 };
      (u.bedomning || []).forEach(function (r, i) { if (sjalv[i]) { var p = radPoang(r); t.E += p.E; t.C += p.C; t.A += p.A; } });
      return { E: Math.min(t.E, max.E), C: Math.min(t.C, max.C), A: Math.min(t.A, max.A) };
    }
    return ratta(u, svar) ? max : { E: 0, C: 0, A: 0 };
  }
  function harRubrikPoang(u) { return sumP(rubricMax(u)) > 0; }

  function logga(u, korrekt, frac) {
    var h = store.hist[u.id] || { n: 0, ratt: 0 };
    h.n++;
    if (korrekt) h.ratt++;
    h.senast = korrekt ? 1 : (frac || 0);
    h.t = Date.now();
    store.hist[u.id] = h;
    store.dagar[idag()] = (store.dagar[idag()] || 0) + 1;
    save();
  }

  /* ---------- Uppgiftsrendering ---------- */
  function svarHjalp(u) {
    if (u.typ === 'tal') return 'Skriv ett tal. Decimalkomma, bråk (t.ex. 3/4) och √ går bra.';
    if (u.typ === 'flera') return 'Skriv alla svar, separerade med semikolon, t.ex. -2; 3';
    if (u.typ === 'text') return 'Skriv ditt svar som ett uttryck, t.ex. 2x+3 eller x^2-4.';
    return '';
  }
  function verktygsNot(del) {
    var calc = ' <button type="button" class="btn btn-ghost small" data-open-calc>Öppna enkel räknare</button>';
    if (del === 'A') return '<div class="tool-note"><strong>Del A – utan räknare.</strong> Räkna för hand. Formelbladet får användas.</div>';
    if (del === 'B') return store.kurs === '1a'
      ? '<div class="tool-note"><strong>Del B – enkel räknare (1a).</strong>' + calc + '</div>'
      : '<div class="tool-note"><strong>Del B – utan räknare (1b/1c).</strong> Inga digitala verktyg. Räkna för hand och redovisa.</div>';
    return '<div class="tool-note"><strong>Del C – enkel räknare.</strong>' + calc + '</div>';
  }
  function uppgiftHTML(u, opts) {
    opts = opts || {};
    var p = parsePoang(u.poang);
    var head = '<div class="task-head">' +
      (opts.nr ? '<strong>Uppgift ' + opts.nr + '</strong>' : '') +
      '<span class="pill pill-del">' + esc(DELAR[u.del] ? DELAR[u.del].namn : 'Del ' + u.del) + '</span>' +
      nivaPill(u.niva) +
      '<span class="pill">' + esc(u.moment || u.omrade || '') + '</span>' +
      '<span class="spacer"></span><span class="pill" title="E-, C- och A-poäng">(' + poangText(p) + ')</span></div>';
    var q = '<div class="task-q">' + u.fraga + '</div>';
    if (u.figur) q += '<div class="figure">' + u.figur + '</div>';
    var ans = '<div class="answer-box">';
    if (u.typ === 'val') {
      var ordning = opts.ordning || (u.svar.alternativ || []).map(function (_, i) { return i; });
      ans += '<div class="options" role="radiogroup" aria-label="Svarsalternativ">' + ordning.map(function (i) {
        return '<label class="option" data-i="' + i + '"><input type="radio" name="val-' + esc(u.id) + '" value="' + i + '"' + (String(opts.svar) === String(i) ? ' checked' : '') + '><span>' + u.svar.alternativ[i] + '</span></label>';
      }).join('') + '</div>';
    } else if (u.typ === 'redovisning') {
      ans += '<label class="small muted" for="scr-' + esc(u.id) + '">Anteckningar (valfritt) – lös helst på papper och redovisa tydligt som på provet.</label>' +
        '<textarea class="scratch" id="scr-' + esc(u.id) + '" data-svar>' + esc(opts.svar || '') + '</textarea>';
    } else {
      ans += '<div class="answer-row"><input type="text" data-svar aria-label="Ditt svar" autocomplete="off" spellcheck="false" value="' + esc(opts.svar || '') + '">' +
        (u.svar && u.svar.enhet ? '<span class="unit">' + esc(u.svar.enhet) + '</span>' : '') + '</div>' +
        '<p class="answer-hint">' + svarHjalp(u) + '</p>';
    }
    ans += '</div>';
    return head + q + ans;
  }
  function lasSvar(u, root) {
    if (u.typ === 'val') { var r = $('input[type=radio]:checked', root); return r ? r.value : ''; }
    var el = $('[data-svar]', root);
    return el ? el.value : '';
  }
  function losningHTML(u) {
    var s = '<div class="sol"><h4>Lösning</h4>' + (u.losning || '') ;
    if (u.typ === 'redovisning' && u.svar && u.svar.facit && !/Svar\s*(<\/[a-z]+>\s*)?:/i.test(u.losning || '')) s += '<p><strong>Svar:</strong> ' + u.svar.facit + '</p>';
    s += '</div>';
    return s;
  }
  function facitText(u) {
    var s = u.svar || {};
    if (u.typ === 'val') return s.alternativ ? s.alternativ[s.ratt] : '';
    if (u.typ === 'tal') return String(s.varde).replace('.', ',') + (s.enhet ? ' ' + esc(s.enhet) : '');
    if (u.typ === 'flera') return (s.varden || []).map(function (v) { return String(v).replace('.', ','); }).join('; ');
    if (u.typ === 'text') return esc((s.godkanda || [''])[0]);
    return s.facit || '';
  }
  function rubricHTML(u, sjalv) {
    sjalv = sjalv || {};
    if (!u.bedomning || !u.bedomning.length || !harRubrikPoang(u)) {
      var max = parsePoang(u.poang);
      return '<div class="rubric" data-rubric="helt"><p><strong>Bedöm dig själv:</strong> Hur väl stämde din lösning med lösningsförslaget? (max ' + poangText(max) + ')</p>' +
        (u.bedomning || []).map(function (r) { return '<p class="small">• ' + r + '</p>'; }).join('') +
        '<div class="row">' + [[1, 'Helt rätt'], [0.5, 'Delvis'], [0, 'Inte alls']].map(function (o) {
          return '<label class="chip"><input type="radio" name="helt-' + esc(u.id) + '" value="' + o[0] + '"' + (sjalv.helt === o[0] ? ' checked' : '') + '> ' + o[1] + '</label>';
        }).join('') + '</div></div>';
    }
    return '<div class="rubric" data-rubric="rader"><p><strong>Bedöm dig själv</strong> – kryssa i de punkter din lösning uppfyller:</p>' +
      u.bedomning.map(function (r, i) {
        return '<label><input type="checkbox" data-rad="' + i + '"' + (sjalv[i] ? ' checked' : '') + '><span>' + r + '</span></label>';
      }).join('') + '</div>';
  }
  function lasRubric(u, root) {
    var box = $('[data-rubric]', root);
    if (!box) return null;
    if (box.getAttribute('data-rubric') === 'helt') {
      var r = $('input[type=radio]:checked', box);
      return r ? { helt: Number(r.value) } : null;
    }
    var o = {}, any = false;
    $$('input[data-rad]', box).forEach(function (c) { o[c.getAttribute('data-rad')] = c.checked; any = true; });
    return any ? o : null;
  }

  /* ---------- Router ---------- */
  var timerId = null;
  var VIEWS = {};
  function route() {
    if (timerId) { clearInterval(timerId); timerId = null; }
    var h = (location.hash || '#hem').slice(1).split('/')[0] || 'hem';
    if (!VIEWS[h]) h = 'hem';
    $$('.tabs a').forEach(function (a) { if (a.getAttribute('data-nav') === h) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    var view = $('#view');
    view.innerHTML = '';
    VIEWS[h](view);
    math(view);
    window.scrollTo(0, 0);
  }
  function go(h) { if (location.hash === '#' + h) route(); else location.hash = h; }

  /* ---------- Hem ---------- */
  VIEWS.hem = function (v) {
    var lista = uppgifter();
    var gjorda = lista.filter(function (u) { return store.hist[u.id]; }).length;
    v.innerHTML =
      '<section class="hero">' +
        '<div class="card">' +
          '<h1>Träna inför NP i Matematik nivå ' + store.kurs + '</h1>' +
          '<p class="pill" style="margin:0 0 8px">Läsåret 26/27 · Gy25</p>' +
          '<p class="muted">Provet skrivs <strong>tisdag 15 december 2026 kl. 9.00</strong>. Det består av del A, B och C. Du tränar just nu på nivå <strong>' + store.kurs + '</strong> – byt nivå uppe till höger.</p>' +
          '<div class="countdown" id="cd" aria-live="off"></div>' +
          '<p class="small muted">' + lista.length + ' uppgifter finns för nivå ' + store.kurs + '. Du har övat på ' + gjorda + ' av dem.</p>' +
          '<div class="row"><a class="btn btn-primary" href="#trana">Börja träna</a><a class="btn" href="#prov">Gör en provsimulering</a></div>' +
        '</div>' +
        '<div class="card"><h2 style="margin-top:0">Så ser provdagen ut</h2><div class="parts">' +
          ['A', 'B', 'C'].map(function (d, i) {
            var x = DELAR[d];
            return '<div class="part"><div class="part-letter">' + d + '</div><p><strong>' + x.verktyg + ' · ' + x.tid + ' min</strong>' + x.info + '</p></div>' +
              (i === 0 ? '<p class="small muted" style="margin:0 0 0 54px">Kort rast</p>' : i === 1 ? '<p class="small muted" style="margin:0 0 0 54px">Längre rast</p>' : '');
          }).join('') +
        '</div><p class="small muted">Total skrivtid 240 minuter exklusive raster, plus 5–10 minuter för instruktioner per delprov. Formelblad, kladdpapper och linjal får användas på alla delar. Från och med 2026 är inga avancerade digitala verktyg tillåtna på provet i nivå 1.</p></div>' +
      '</section>' +
      '<h2>Välj hur du vill träna</h2>' +
      '<div class="grid grid-3">' +
        modeCard('#trana', '🎯', 'Träna fritt', 'Välj område, del och nivå. Rätta direkt, få ledtrådar och se lösningar steg för steg.') +
        modeCard('#trana/smart', '🧠', 'Smart repetition', 'Blandade uppgifter där du får mer av det du missat och sådant du inte provat än.') +
        modeCard('#prov', '⏱', 'Provsimulering', 'Gör ett helt prov (A+B+C, 240 min) eller en kortversion på ca 1 timme med tidtagning.') +
        modeCard('#framsteg', '📈', 'Mina framsteg', 'Se vilka områden du behärskar och vilka du behöver öva mer på.') +
        modeCard('#formler', '📐', 'Formler & tips', 'Formelbladets innehåll, provstrategier och en checklista inför provdagen.') +
      '</div>';
    tickCountdown();
    timerId = setInterval(tickCountdown, 1000);
  };
  function modeCard(href, ikon, titel, text) {
    return '<a class="card mode-card" href="' + href + '"><span class="mode-icon" aria-hidden="true">' + ikon + '</span><h3>' + titel + '</h3><p>' + text + '</p></a>';
  }
  function tickCountdown() {
    var el = $('#cd'); if (!el) return;
    var ms = PROVDATUM - new Date();
    if (ms <= 0) { el.innerHTML = '<div><b>Lycka till!</b><span>Provdagen är här</span></div>'; return; }
    var d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24, m = Math.floor(ms / 6e4) % 60, s = Math.floor(ms / 1e3) % 60;
    el.innerHTML = [[d, 'dagar'], [h, 'timmar'], [m, 'min'], [s, 'sek']].map(function (x) { return '<div><b>' + x[0] + '</b><span>' + x[1] + '</span></div>'; }).join('');
  }

  /* ---------- Träna ---------- */
  var session = null;
  var filt = { omr: [], del: [], niva: [], ejKlarade: false, antal: 10 };
  VIEWS.trana = function (v) {
    var sub = (location.hash.split('/')[1] || '');
    if (sub === 'smart') { startSession(smartUrval(10), 'Smart repetition'); }
    if (sub === 'pass' && session) { renderSession(v); return; }
    if (sub === 'smart' && session) { history.replaceState(null, '', '#trana/pass'); renderSession(v); return; }
    var lista = uppgifter();
    function cnt(fn) { return lista.filter(fn).length; }
    v.innerHTML =
      '<h1>Träna</h1><p class="muted">Välj vad du vill öva på. Lämnar du en grupp tom ingår allt.</p>' +
      '<div class="card"><div class="filters">' +
        chipGroup('Område', 'omr', OMRADEN.filter(function (o) { return cnt(function (u) { return u.omrade === o; }); }).map(function (o) { return [o, o + ' (' + cnt(function (u) { return u.omrade === o; }) + ')']; })) +
        chipGroup('Del', 'del', ['A', 'B', 'C'].map(function (d) { return [d, d + ' – ' + DELAR[d].verktyg.toLowerCase()]; })) +
        chipGroup('Nivå', 'niva', [['E', 'E'], ['C', 'C'], ['A', 'A']]) +
        '<div class="field"><label for="antal">Antal uppgifter</label><select id="antal">' + [5, 10, 15, 20, 30, 0].map(function (n) { return '<option value="' + n + '"' + (filt.antal === n ? ' selected' : '') + '>' + (n || 'Alla som matchar') + '</option>'; }).join('') + '</select>' +
        '<label class="chip" style="margin-top:8px"><input type="checkbox" id="ejKlarade"' + (filt.ejKlarade ? ' checked' : '') + '> Bara uppgifter jag inte klarat</label></div>' +
      '</div><div class="row"><button class="btn btn-primary" id="startTrana">Starta</button><span class="muted small" id="matchCount"></span></div></div>' +
      '<h2>Snabbstart per område</h2><div class="grid grid-2" id="snabb">' +
        OMRADEN.map(function (o) {
          var n = cnt(function (u) { return u.omrade === o; }); if (!n) return '';
          var momenten = {}; lista.forEach(function (u) { if (u.omrade === o && u.moment) momenten[u.moment] = 1; });
          return '<button class="card mode-card" style="text-align:left;cursor:pointer" data-omr="' + esc(o) + '"><h3>' + esc(o) + '</h3><p>' + n + ' uppgifter · ' + esc(Object.keys(momenten).slice(0, 6).join(', ')) + (Object.keys(momenten).length > 6 ? ' …' : '') + '</p></button>';
        }).join('') + '</div>';
    function upd() {
      filt.omr = $$('input[data-g=omr]:checked', v).map(function (c) { return c.value; });
      filt.del = $$('input[data-g=del]:checked', v).map(function (c) { return c.value; });
      filt.niva = $$('input[data-g=niva]:checked', v).map(function (c) { return c.value; });
      filt.ejKlarade = $('#ejKlarade', v).checked;
      filt.antal = Number($('#antal', v).value);
      $('#matchCount', v).textContent = filtrera().length + ' uppgifter matchar';
    }
    /* lyssna på filterkortet, inte #view som återanvänds mellan vyer */
    $('.filters', v).parentNode.addEventListener('change', upd);
    upd();
    $('#startTrana', v).addEventListener('click', function () {
      var l = shuffle(filtrera());
      if (!l.length) { alert('Inga uppgifter matchar ditt urval. Prova att bredda filtret.'); return; }
      l = sortNiva(filt.antal ? l.slice(0, filt.antal) : l);
      startSession(l, 'Träningspass'); go('trana/pass');
    });
    $$('[data-omr]', v).forEach(function (b) {
      b.addEventListener('click', function () {
        var o = b.getAttribute('data-omr');
        var l = sortNiva(shuffle(lista.filter(function (u) { return u.omrade === o; })).slice(0, 10));
        startSession(l, o); go('trana/pass');
      });
    });
  };
  function chipGroup(label, g, items) {
    return '<fieldset class="field"><legend>' + label + '</legend><div class="chips">' + items.map(function (it) {
      return '<label class="chip"><input type="checkbox" data-g="' + g + '" value="' + esc(it[0]) + '"' + (filt[g].indexOf(it[0]) !== -1 ? ' checked' : '') + '> ' + esc(it[1]) + '</label>';
    }).join('') + '</div></fieldset>';
  }
  function filtrera() {
    return uppgifter().filter(function (u) {
      if (filt.omr.length && filt.omr.indexOf(u.omrade) === -1) return false;
      if (filt.del.length && filt.del.indexOf(u.del) === -1) return false;
      if (filt.niva.length && filt.niva.indexOf(u.niva) === -1) return false;
      if (filt.ejKlarade) { var h = store.hist[u.id]; if (h && h.senast === 1) return false; }
      return true;
    });
  }
  function sortNiva(l) { var o = { E: 0, C: 1, A: 2 }; return l.slice().sort(function (a, b) { return (o[a.niva] || 0) - (o[b.niva] || 0); }); }
  function smartUrval(n) {
    var lista = uppgifter();
    var omrStat = omradesStat(lista);
    var vikt = lista.map(function (u) {
      var h = store.hist[u.id];
      var w = !h ? 3 : h.senast === 1 ? 0.5 : 5;
      var s = omrStat[u.omrade];
      if (s && s.forsok >= 3) w *= 1 + (1 - s.andel) * 1.5;
      if (h && h.t && Date.now() - h.t < 10 * 60 * 1000) w *= 0.2;
      return { u: u, k: Math.pow(Math.random(), 1 / w) };
    });
    vikt.sort(function (a, b) { return b.k - a.k; });
    return sortNiva(vikt.slice(0, n).map(function (x) { return x.u; }));
  }
  function startSession(lista, titel) {
    session = { titel: titel, lista: lista, i: 0, state: lista.map(function (u) {
      return { svar: '', klar: false, korrekt: null, ledtrad: 0, visaLos: false, sjalv: null, ordning: u.typ === 'val' ? shuffle(u.svar.alternativ.map(function (_, i) { return i; })) : null };
    }) };
  }
  function renderSession(v) {
    var S = session, u = S.lista[S.i], st = S.state[S.i];
    var klara = S.state.filter(function (x) { return x.klar; }).length;
    var ratt = S.state.filter(function (x) { return x.korrekt === true; }).length;
    v.innerHTML =
      '<div class="row" style="margin-bottom:10px"><a class="btn btn-ghost" href="#trana">← Tillbaka</a><strong>' + esc(S.titel) + '</strong><span class="spacer"></span>' +
      '<span class="counter">Uppgift ' + (S.i + 1) + ' av ' + S.lista.length + ' · ' + ratt + ' rätt av ' + klara + ' rättade</span></div>' +
      '<div class="bar" style="margin-bottom:14px"><i style="width:' + Math.round(100 * (S.i + 1) / S.lista.length) + '%"></i></div>' +
      verktygsNot(u.del) +
      '<article class="card" id="task" data-id="' + esc(u.id) + '">' + uppgiftHTML(u, { svar: st.svar, ordning: st.ordning }) +
      '<div id="fb"></div>' +
      '<div class="task-nav">' +
        (u.typ === 'redovisning' ? '<button class="btn btn-primary" id="visaBed">Visa lösning och bedöm dig själv</button>' : '<button class="btn btn-primary" id="kontroll">Rätta</button>') +
        ((u.ledtradar || []).length ? '<button class="btn" id="ledtrad">Ledtråd (' + st.ledtrad + '/' + u.ledtradar.length + ')</button>' : '') +
        (u.typ !== 'redovisning' ? '<button class="btn btn-ghost" id="visaLos">Visa lösning</button>' : '') +
        '<span class="spacer"></span>' +
        '<button class="btn" id="prev"' + (S.i === 0 ? ' disabled' : '') + '>← Föregående</button>' +
        (S.i < S.lista.length - 1 ? '<button class="btn" id="next">Nästa →</button>' : '<button class="btn" id="klar">Avsluta passet</button>') +
      '</div></article>';
    var task = $('#task', v);
    function rita() {
      var fb = $('#fb', v), html = '';
      for (var k = 0; k < st.ledtrad; k++) html += '<div class="hint" style="margin-top:10px"><strong>Ledtråd ' + (k + 1) + ':</strong> ' + u.ledtradar[k] + '</div>';
      if (st.korrekt === true) html += '<div class="feedback ok" style="margin-top:10px" role="status">Rätt! Bra jobbat.</div>';
      if (st.korrekt === false) html += '<div class="feedback bad" style="margin-top:10px" role="status">Inte riktigt. ' + (st.visaLos ? '' : 'Försök igen, ta en ledtråd eller titta på lösningen.') + '</div>';
      if (st.visaLos) {
        if (u.typ !== 'redovisning') html += '<p style="margin:10px 0 0"><strong>Facit:</strong> ' + facitText(u) + '</p>';
        html += losningHTML(u);
        if (u.typ === 'redovisning') html += rubricHTML(u, st.sjalv) + '<div class="row" style="margin-top:8px"><button class="btn btn-primary" id="sparaBed">Spara min bedömning</button><span id="bedRes" class="muted small"></span></div>';
      }
      fb.innerHTML = html;
      math(fb);
      if (u.typ === 'val' && st.korrekt !== null) {
        $$('.option', task).forEach(function (o) {
          var i = Number(o.getAttribute('data-i'));
          o.classList.toggle('is-right', (st.visaLos || st.korrekt === true) && i === u.svar.ratt);
          o.classList.toggle('is-wrong', String(i) === String(st.svar) && st.korrekt === false);
        });
      }
      var sb = $('#sparaBed', v);
      if (sb) sb.addEventListener('click', function () {
        var sj = lasRubric(u, fb);
        if (!sj) { $('#bedRes', v).textContent = 'Välj först hur det gick.'; return; }
        st.sjalv = sj;
        var p = poangFor(u, null, sj), max = parsePoang(u.poang);
        var frac = sumP(max) ? sumP(p) / sumP(max) : 0;
        if (!st.klar) { logga(u, frac >= 0.999, frac); st.klar = true; }
        else if (store.hist[u.id]) { store.hist[u.id].senast = frac >= 0.999 ? 1 : frac; save(); }
        st.korrekt = frac >= 0.999 ? true : null;
        $('#bedRes', v).textContent = 'Sparat: ' + poangText(p) + ' av ' + poangText(max) + ' poäng.';
      });
    }
    rita();
    function spara() { st.svar = lasSvar(u, task); }
    task.addEventListener('input', spara);
    task.addEventListener('change', spara);
    var k = $('#kontroll', v);
    if (k) k.addEventListener('click', function () {
      spara();
      if (st.svar === '') { $('#fb', v).innerHTML = '<div class="feedback info" style="margin-top:10px" role="status">Skriv eller välj ett svar först.</div>'; return; }
      st.korrekt = ratta(u, st.svar);
      if (u.typ !== 'val' && !st.korrekt && isNaN(parseNum(st.svar)) && (u.typ === 'tal')) {
        $('#fb', v).innerHTML = '<div class="feedback info" style="margin-top:10px" role="status">Jag kunde inte tolka svaret som ett tal. Skriv t.ex. 12,5 eller 3/4.</div>'; st.korrekt = null; return;
      }
      if (!st.klar) { logga(u, st.korrekt, 0); st.klar = true; }
      rita();
    });
    var vb = $('#visaBed', v);
    if (vb) vb.addEventListener('click', function () { spara(); st.visaLos = true; rita(); });
    var vl = $('#visaLos', v);
    if (vl) vl.addEventListener('click', function () {
      spara(); st.visaLos = true;
      if (!st.klar) { logga(u, false, 0); st.klar = true; if (st.korrekt === null) st.korrekt = false; }
      rita();
    });
    var lt = $('#ledtrad', v);
    if (lt) lt.addEventListener('click', function () {
      if (st.ledtrad < u.ledtradar.length) st.ledtrad++;
      lt.textContent = 'Ledtråd (' + st.ledtrad + '/' + u.ledtradar.length + ')';
      rita();
    });
    var inp = $('input[data-svar]', task);
    if (inp) inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && k) { e.preventDefault(); k.click(); } });
    function flytta(d) { spara(); S.i += d; route(); }
    var pv = $('#prev', v); if (pv) pv.addEventListener('click', function () { flytta(-1); });
    var nx = $('#next', v); if (nx) nx.addEventListener('click', function () { flytta(1); });
    var kl = $('#klar', v); if (kl) kl.addEventListener('click', function () { spara(); renderSessionSlut(v); });
  }
  function renderSessionSlut(v) {
    var S = session;
    var ratt = S.state.filter(function (x) { return x.korrekt === true; }).length;
    var missade = S.lista.filter(function (u, i) { return S.state[i].klar && S.state[i].korrekt !== true; });
    v.innerHTML = '<div class="card"><h1>Passet är klart</h1><p class="score-big">' + ratt + ' / ' + S.lista.length + '</p><p class="muted">uppgifter helt rätt</p>' +
      (missade.length ? '<h3>Värda att öva mer på</h3><ul>' + missade.map(function (u) { return '<li>' + esc(u.moment || u.omrade) + ' (' + esc(DELAR[u.del].namn) + ', ' + esc(u.niva) + '-nivå)</li>'; }).join('') + '</ul>' : '<p>Snyggt – inga missar!</p>') +
      '<div class="row"><button class="btn btn-primary" id="igen">Nytt smart pass</button>' + (missade.length ? '<button class="btn" id="omMiss">Gör om missade</button>' : '') + '<a class="btn" href="#trana">Till träningsmenyn</a></div></div>';
    window.scrollTo(0, 0);
    $('#igen', v).addEventListener('click', function () { startSession(smartUrval(10), 'Smart repetition'); go('trana/pass'); });
    var om = $('#omMiss', v); if (om) om.addEventListener('click', function () { startSession(missade, 'Gör om missade'); go('trana/pass'); });
  }

  /* ---------- Provsimulering ---------- */
  var EXAM_KEY = LS_KEY + '_exam';
  function laddaProv() { try { return JSON.parse(localStorage.getItem(EXAM_KEY) || 'null'); } catch (e) { return null; } }
  function sparaProv(p) { try { if (p) localStorage.setItem(EXAM_KEY, JSON.stringify(p)); else localStorage.removeItem(EXAM_KEY); } catch (e) { /* ignorera */ } }
  var prov = laddaProv();

  function byggProv(typ) {
    var mal = PROVMAL[typ];
    var lista = uppgifter();
    var delar = ['A', 'B', 'C'].map(function (d) {
      var pool = shuffle(lista.filter(function (u) { return u.del === d; }));
      var target = mal[d];
      /* fördela ungefär E 45 %, C 35 %, A 20 % */
      var andel = { E: 0.45, C: 0.35, A: 0.2 }, vald = [], tot = 0;
      ['E', 'C', 'A'].forEach(function (n) {
        var mal2 = Math.round(target * andel[n]), sum = 0;
        pool.filter(function (u) { return u.niva === n; }).forEach(function (u) {
          var p = sumP(parsePoang(u.poang));
          if (sum < mal2 && tot + p <= target + 1) { vald.push(u); sum += p; tot += p; }
        });
      });
      pool.forEach(function (u) { if (tot < target && vald.indexOf(u) === -1) { var p = sumP(parsePoang(u.poang)); if (tot + p <= target + 1) { vald.push(u); tot += p; } } });
      vald = sortNiva(vald);
      var minuter = typ === 'hel' ? DELAR[d].tid : DELAR[d].kort;
      return { del: d, ids: vald.map(function (u) { return u.id; }), sek: minuter * 60, deadline: null };
    }).filter(function (d) { return d.ids.length; });
    var ordning = {};
    delar.forEach(function (d) { d.ids.forEach(function (id) { var u = BYID[id]; if (u.typ === 'val') ordning[id] = shuffle(u.svar.alternativ.map(function (_, i) { return i; })); }); });
    return { typ: typ, kurs: store.kurs, delar: delar, d: 0, q: 0, svar: {}, flagg: {}, ordning: ordning, fas: 'intro', start: Date.now(), sjalv: {} };
  }

  VIEWS.prov = function (v) {
    if (prov && prov.fas && prov.fas !== 'klar') { renderProv(v); return; }
    if (prov && prov.fas === 'klar') { renderResultat(v); return; }
    var lista = uppgifter();
    var antal = { A: 0, B: 0, C: 0 };
    lista.forEach(function (u) { antal[u.del]++; });
    v.innerHTML = '<h1>Provsimulering</h1><p class="muted">Skriv ett prov under tidspress, precis som på riktigt. Du ser inte facit förrän du lämnat in. Redovisningsuppgifterna bedömer du själv efteråt med hjälp av bedömningsanvisningen.</p>' +
      '<div class="grid grid-2">' +
        '<div class="card"><h2 style="margin-top:0">Helt prov</h2><p>Del A 60 min, del B 60 min, del C 120 min. Cirka 58 poäng, ungefär som tidigare nationella prov. Raster mellan delarna.</p><button class="btn btn-primary" data-start="hel">Starta helt prov</button></div>' +
        '<div class="card"><h2 style="margin-top:0">Kortprov</h2><p>Del A 15 min, del B 15 min, del C 30 min. Cirka 20 poäng – bra för att testa formen på en dryg timme.</p><button class="btn btn-primary" data-start="kort">Starta kortprov</button></div>' +
      '</div>' +
      '<p class="small muted">Nivå: <strong>' + store.kurs + '</strong> · Uppgiftsbank: ' + antal.A + ' st del A, ' + antal.B + ' st del B, ' + antal.C + ' st del C.</p>' +
      (store.prov.length ? '<h2>Tidigare provsimuleringar</h2><div class="card">' + store.prov.slice().reverse().slice(0, 10).map(function (p) {
        return '<div class="bar-row"><span>' + new Date(p.datum).toLocaleDateString('sv-SE') + ' · ' + (p.typ === 'hel' ? 'Helt prov' : 'Kortprov') + ' · ' + esc(p.kurs) + '</span><div class="bar"><i style="width:' + Math.round(100 * p.tot / Math.max(1, p.max)) + '%"></i></div><span class="bar-val">' + p.tot + '/' + p.max + ' ' + (p.betyg ? '(' + p.betyg + ')' : '') + '</span></div>';
      }).join('') + '</div>' : '');
    $$('[data-start]', v).forEach(function (b) {
      b.addEventListener('click', function () { prov = byggProv(b.getAttribute('data-start')); sparaProv(prov); route(); });
    });
  };

  function renderProv(v) {
    var D = prov.delar[prov.d];
    if (prov.fas === 'intro' || prov.fas === 'rast') {
      var x = DELAR[D.del];
      var poang = D.ids.reduce(function (s, id) { return s + sumP(parsePoang(BYID[id].poang)); }, 0);
      v.innerHTML = '<div class="card">' +
        (prov.fas === 'rast' ? '<p class="pill">Rast</p><h1>Dags för en paus</h1><p>Sträck på benen och drick vatten. Starta nästa del när du är redo.</p>' : '<h1>' + (prov.typ === 'hel' ? 'Helt prov' : 'Kortprov') + ' – nivå ' + esc(prov.kurs) + '</h1>') +
        '<h2>' + x.namn + ': ' + x.verktyg + '</h2><p>' + x.info + '</p>' +
        '<ul><li>' + D.ids.length + ' uppgifter, ' + poang + ' poäng</li><li>Skrivtid: ' + Math.round(D.sek / 60) + ' minuter</li>' +
        '<li>Uppgifter med svarsruta rättas automatiskt. Vid redovisningsuppgifter skriver du lösningen på papper och bedömer dig själv efteråt.</li></ul>' +
        '<div class="row"><button class="btn btn-primary" id="startDel">Starta ' + x.namn + '</button><button class="btn btn-ghost" id="avbryt">Avbryt provet</button></div></div>';
      $('#startDel', v).addEventListener('click', function () { prov.fas = 'skriv'; prov.q = 0; D.deadline = Date.now() + D.sek * 1000; sparaProv(prov); route(); });
      $('#avbryt', v).addEventListener('click', avbrytProv);
      return;
    }
    var id = D.ids[prov.q], u = BYID[id];
    v.innerHTML =
      '<div class="exam-bar"><strong>' + DELAR[D.del].namn + ' · ' + DELAR[D.del].verktyg + '</strong><span class="timer" id="timer" role="timer" aria-label="Återstående tid"></span>' +
        '<span class="spacer"></span>' + (D.del === 'C' || (D.del === 'B' && prov.kurs === '1a') ? '<button class="btn small" data-open-calc>Räknare</button>' : '') +
        '<button class="btn small" id="lamna">' + (prov.d < prov.delar.length - 1 ? 'Lämna in del ' + D.del : 'Lämna in provet') + '</button>' +
        '<button class="btn btn-ghost small" id="avbrytSkriv">Avbryt</button></div>' +
      '<nav class="qdots" aria-label="Uppgifter i delen">' + D.ids.map(function (qid, i) {
        return '<button class="qdot' + (prov.svar[qid] !== undefined && prov.svar[qid] !== '' ? ' answered' : '') + (i === prov.q ? ' current' : '') + (prov.flagg[qid] ? ' flag' : '') + '" data-q="' + i + '"' + (i === prov.q ? ' aria-current="step"' : '') + ' aria-label="Uppgift ' + (i + 1) + (prov.flagg[qid] ? ', markerad' : '') + '">' + (i + 1) + '</button>';
      }).join('') + '</nav>' +
      '<article class="card" id="task" data-id="' + esc(id) + '" style="margin-top:12px">' + uppgiftHTML(u, { nr: prov.q + 1, svar: prov.svar[id] || '', ordning: prov.ordning[id] }) +
      '<div class="task-nav"><button class="btn" id="prev"' + (prov.q === 0 ? ' disabled' : '') + '>← Föregående</button>' +
      '<label class="chip"><input type="checkbox" id="flagga"' + (prov.flagg[id] ? ' checked' : '') + '> Markera för att återkomma</label><span class="spacer"></span>' +
      (prov.q < D.ids.length - 1 ? '<button class="btn btn-primary" id="next">Nästa →</button>' : '') + '</div></article>';
    var task = $('#task', v);
    function spara() { prov.svar[id] = lasSvar(u, task); sparaProv(prov); var dot = $('.qdot.current', v); if (dot) dot.classList.toggle('answered', prov.svar[id] !== ''); }
    task.addEventListener('input', spara);
    task.addEventListener('change', function (e) { if (e.target.id === 'flagga') { prov.flagg[id] = e.target.checked; sparaProv(prov); $('.qdot.current', v).classList.toggle('flag', e.target.checked); } else spara(); });
    $$('.qdot', v).forEach(function (b) { b.addEventListener('click', function () { spara(); prov.q = Number(b.getAttribute('data-q')); sparaProv(prov); route(); }); });
    var pv = $('#prev', v); if (pv) pv.addEventListener('click', function () { spara(); prov.q--; sparaProv(prov); route(); });
    var nx = $('#next', v); if (nx) nx.addEventListener('click', function () { spara(); prov.q++; sparaProv(prov); route(); });
    $('#lamna', v).addEventListener('click', function () {
      spara();
      var tomma = D.ids.filter(function (q) { return BYID[q].typ !== 'redovisning' && !prov.svar[q]; }).length;
      if (!confirm((tomma ? 'Du har ' + tomma + ' obesvarade uppgifter. ' : '') + 'Vill du lämna in ' + DELAR[D.del].namn + '? Du kan inte gå tillbaka till den.')) return;
      nastaDel();
    });
    $('#avbrytSkriv', v).addEventListener('click', function () { spara(); avbrytProv(); });
    function tick() {
      var kvar = (D.deadline - Date.now()) / 1000, t = $('#timer');
      if (!t) return;
      t.textContent = fmtTid(kvar);
      t.classList.toggle('low', kvar < 300);
      if (kvar <= 0) { spara(); clearInterval(timerId); timerId = null; alert('Tiden för ' + DELAR[D.del].namn + ' är slut.'); nastaDel(); }
    }
    tick();
    timerId = setInterval(tick, 1000);
  }
  function nastaDel() {
    if (prov.d < prov.delar.length - 1) { prov.d++; prov.q = 0; prov.fas = 'rast'; }
    else { prov.fas = 'klar'; prov.slut = Date.now(); }
    sparaProv(prov); route();
  }
  function avbrytProv() { if (confirm('Avbryta provet? Dina svar sparas inte.')) { prov = null; sparaProv(null); route(); } }

  function provResultat() {
    var tot = { E: 0, C: 0, A: 0 }, max = { E: 0, C: 0, A: 0 }, perOmr = {}, perDel = {}, obedomda = 0;
    prov.delar.forEach(function (D) {
      D.ids.forEach(function (id) {
        var u = BYID[id]; if (!u) return;
        var m = parsePoang(u.poang), p = poangFor(u, prov.svar[id], prov.sjalv[id]);
        if (u.typ === 'redovisning' && !prov.sjalv[id]) obedomda++;
        ['E', 'C', 'A'].forEach(function (k) { tot[k] += p[k]; max[k] += m[k]; });
        var o = perOmr[u.omrade] = perOmr[u.omrade] || { p: 0, m: 0 }; o.p += sumP(p); o.m += sumP(m);
        var d = perDel[D.del] = perDel[D.del] || { p: 0, m: 0 }; d.p += sumP(p); d.m += sumP(m);
      });
    });
    return { tot: tot, max: max, perOmr: perOmr, perDel: perDel, obedomda: obedomda };
  }
  function betyg(r) {
    var T = sumP(r.tot), M = sumP(r.max);
    if (!M) return '–';
    for (var i = 0; i < GRANSER.length; i++) {
      var g = GRANSER[i];
      if (T < g.tot * M) continue;
      if (g.a && r.tot.A < g.a * M) continue;
      if (g.ca && r.tot.C + r.tot.A < g.ca * M) continue;
      return g.betyg;
    }
    return 'F';
  }
  function renderResultat(v) {
    var r = provResultat();
    var T = sumP(r.tot), M = sumP(r.max), b = betyg(r);
    var html = '<div class="card"><h1>Resultat – ' + (prov.typ === 'hel' ? 'helt prov' : 'kortprov') + ', nivå ' + esc(prov.kurs) + '</h1>' +
      '<div class="grid grid-4" style="margin:12px 0">' +
        '<div class="stat"><b>' + T + '/' + M + '</b><span>Totalt</span></div>' +
        '<div class="stat"><b style="color:var(--e)">' + r.tot.E + '/' + r.max.E + '</b><span>E-poäng</span></div>' +
        '<div class="stat"><b style="color:var(--c)">' + r.tot.C + '/' + r.max.C + '</b><span>C-poäng</span></div>' +
        '<div class="stat"><b style="color:var(--a)">' + r.tot.A + '/' + r.max.A + '</b><span>A-poäng</span></div>' +
      '</div>' +
      '<p><strong>Ungefärlig betygsnivå: ' + b + '</strong> <span class="small muted">(grov uppskattning utifrån andelar av maxpoängen på tidigare prov – de riktiga gränserna sätts för varje prov)</span></p>' +
      (r.obedomda ? '<div class="feedback info">Du har ' + r.obedomda + ' redovisningsuppgifter kvar att bedöma längre ned. Resultatet uppdateras när du bedömer dem.</div>' : '') +
      '<h3>Per del</h3><div class="bars">' + Object.keys(r.perDel).map(function (d) { var x = r.perDel[d]; return barRow(DELAR[d].namn + ' – ' + DELAR[d].verktyg.toLowerCase(), x.p, x.m); }).join('') + '</div>' +
      '<h3>Per område</h3><div class="bars">' + Object.keys(r.perOmr).map(function (o) { var x = r.perOmr[o]; return barRow(o, x.p, x.m); }).join('') + '</div>' +
      '<div class="row" style="margin-top:14px"><button class="btn btn-primary" id="sparaRes">Spara resultat och avsluta</button><button class="btn btn-ghost" id="kasta">Avsluta utan att spara</button></div></div>' +
      '<h2>Genomgång</h2>';
    prov.delar.forEach(function (D) {
      html += '<h3>' + DELAR[D.del].namn + ' – ' + DELAR[D.del].verktyg + '</h3>';
      D.ids.forEach(function (id, i) {
        var u = BYID[id]; if (!u) return;
        var p = poangFor(u, prov.svar[id], prov.sjalv[id]), m = parsePoang(u.poang);
        var status = u.typ === 'redovisning' ? (prov.sjalv[id] ? '<span>' + poangText(p) + ' av ' + poangText(m) + '</span>' : '<span class="tag-wrong">Ej bedömd</span>')
          : ratta(u, prov.svar[id]) ? '<span class="tag-right">✓ Rätt</span>' : '<span class="tag-wrong">✗ ' + (prov.svar[id] ? 'Fel' : 'Obesvarad') + '</span>';
        var dittSvar = u.typ === 'val' ? (prov.svar[id] !== undefined && prov.svar[id] !== '' ? u.svar.alternativ[prov.svar[id]] : '–') : esc(prov.svar[id] || '–');
        html += '<div class="card review-item" data-id="' + esc(id) + '">' + uppgiftHTML(u, { nr: i + 1, svar: prov.svar[id], ordning: prov.ordning[id] }).replace(/<div class="answer-box">[\s\S]*$/, '') +
          '<p><strong>Status:</strong> ' + status + '</p>' +
          (u.typ !== 'redovisning' ? '<p><strong>Ditt svar:</strong> ' + dittSvar + ' · <strong>Facit:</strong> ' + facitText(u) + '</p>' : (prov.svar[id] ? '<p><strong>Dina anteckningar:</strong> ' + esc(prov.svar[id]) + '</p>' : '')) +
          '<details' + (u.typ === 'redovisning' && !prov.sjalv[id] ? ' open' : '') + '><summary>Visa lösning' + (u.typ === 'redovisning' ? ' och bedöm' : '') + '</summary>' + losningHTML(u) +
          (u.typ === 'redovisning' ? rubricHTML(u, prov.sjalv[id]) + '<button class="btn btn-primary" data-bed="' + esc(id) + '" style="margin-top:8px">Spara bedömning</button>' : '') + '</details></div>';
      });
    });
    v.innerHTML = html;
    math(v);
    $$('[data-bed]', v).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-bed'), u = BYID[id];
        var sj = lasRubric(u, btn.closest('.review-item'));
        if (!sj) { alert('Välj först hur det gick.'); return; }
        prov.sjalv[id] = sj; sparaProv(prov);
        var y = window.scrollY; route(); window.scrollTo(0, y);
      });
    });
    $('#sparaRes', v).addEventListener('click', function () {
      if (r.obedomda && !confirm('Du har ' + r.obedomda + ' obedömda uppgifter (räknas som 0 poäng). Spara ändå?')) return;
      prov.delar.forEach(function (D) {
        D.ids.forEach(function (id) {
          var u = BYID[id]; if (!u) return;
          var p = poangFor(u, prov.svar[id], prov.sjalv[id]), m = parsePoang(u.poang);
          if (u.typ === 'redovisning' && !prov.sjalv[id]) return;
          var frac = sumP(m) ? sumP(p) / sumP(m) : 0;
          logga(u, frac >= 0.999, frac);
        });
      });
      store.prov.push({ datum: Date.now(), typ: prov.typ, kurs: prov.kurs, tot: T, max: M, E: r.tot.E, C: r.tot.C, A: r.tot.A, betyg: b });
      save(); prov = null; sparaProv(null); go('framsteg');
    });
    $('#kasta', v).addEventListener('click', function () { if (confirm('Avsluta utan att spara resultatet?')) { prov = null; sparaProv(null); route(); } });
  }
  function barRow(label, p, m) {
    var pct = m ? Math.round(100 * p / m) : 0;
    return '<div class="bar-row"><span>' + esc(label) + '</span><div class="bar" role="img" aria-label="' + pct + ' procent"><i style="width:' + pct + '%"></i></div><span class="bar-val">' + p + '/' + m + '</span></div>';
  }

  /* ---------- Framsteg ---------- */
  function omradesStat(lista) {
    var s = {};
    lista.forEach(function (u) {
      var h = store.hist[u.id];
      var o = s[u.omrade] = s[u.omrade] || { tot: 0, provade: 0, klarade: 0, forsok: 0, andel: 0 };
      o.tot++;
      if (h) { o.provade++; o.forsok += h.n; if (h.senast === 1) o.klarade++; }
    });
    Object.keys(s).forEach(function (k) { s[k].andel = s[k].provade ? s[k].klarade / s[k].provade : 0; });
    return s;
  }
  VIEWS.framsteg = function (v) {
    var lista = uppgifter();
    var s = omradesStat(lista);
    var provade = lista.filter(function (u) { return store.hist[u.id]; });
    var klarade = provade.filter(function (u) { return store.hist[u.id].senast === 1; });
    var dagar = Object.keys(store.dagar).length;
    var mom = {};
    provade.forEach(function (u) {
      var k = u.moment || u.omrade, m = mom[k] = mom[k] || { p: 0, k: 0 };
      m.p++; if (store.hist[u.id].senast === 1) m.k++;
    });
    var svaga = Object.keys(mom).filter(function (k) { return mom[k].p >= 1 && mom[k].k / mom[k].p < 0.6; })
      .sort(function (a, b) { return mom[a].k / mom[a].p - mom[b].k / mom[b].p; }).slice(0, 8);
    v.innerHTML = '<h1>Mina framsteg</h1><p class="muted">Nivå ' + store.kurs + '. Statistiken sparas bara i den här webbläsaren.</p>' +
      '<div class="grid grid-4">' +
        '<div class="card stat"><b>' + provade.length + '</b><span>uppgifter provade av ' + lista.length + '</span></div>' +
        '<div class="card stat"><b>' + klarade.length + '</b><span>klarade senast</span></div>' +
        '<div class="card stat"><b>' + dagar + '</b><span>dagar du tränat</span></div>' +
        '<div class="card stat"><b>' + store.prov.length + '</b><span>provsimuleringar</span></div>' +
      '</div>' +
      '<h2>Täckning per område</h2><div class="card"><p class="small muted">Stapeln visar hur stor del av områdets uppgifter du klarat.</p><div class="bars">' +
        OMRADEN.filter(function (o) { return s[o]; }).map(function (o) { return barRow(o, s[o].klarade, s[o].tot); }).join('') + '</div></div>' +
      (svaga.length ? '<h2>Öva mer på</h2><div class="card"><ul>' + svaga.map(function (k) { return '<li><strong>' + esc(k) + '</strong> – ' + mom[k].k + ' av ' + mom[k].p + ' klarade</li>'; }).join('') + '</ul><button class="btn btn-primary" id="ovaSvaga">Träna på dessa</button></div>' : '') +
      '<h2>Inför provet</h2><div class="card"><p>' + rad(provade.length, lista.length) + '</p></div>' +
      '<div class="row" style="margin-top:20px"><button class="btn btn-ghost" id="nollstall">Nollställ min statistik</button></div>';
    var os = $('#ovaSvaga', v);
    if (os) os.addEventListener('click', function () {
      var l = sortNiva(shuffle(lista.filter(function (u) { return svaga.indexOf(u.moment || u.omrade) !== -1; })).slice(0, 12));
      startSession(l, 'Öva mer på svaga moment'); go('trana/pass');
    });
    $('#nollstall', v).addEventListener('click', function () {
      if (!confirm('Ta bort all statistik och alla sparade provresultat?')) return;
      store.hist = {}; store.prov = []; store.dagar = {}; save(); route();
    });
  };
  function rad(gjort, tot) {
    var dagarKvar = Math.ceil((PROVDATUM - new Date()) / 864e5);
    if (dagarKvar <= 0) return 'Provdagen är här. Lycka till!';
    var kvar = Math.max(0, tot - gjort);
    var perDag = Math.ceil(kvar / Math.max(1, dagarKvar - 1));
    return 'Det är <strong>' + dagarKvar + ' dagar</strong> kvar. ' + (kvar ? 'Om du gör cirka <strong>' + perDag + ' nya uppgifter om dagen</strong> hinner du gå igenom hela banken, och gör gärna minst en hel provsimulering under tidspress innan provet.' : 'Du har provat alla uppgifter – fokusera nu på provsimuleringar och de moment du missat.');
  }

  /* ---------- Formler & tips ---------- */
  VIEWS.formler = function (v) {
    var k = store.kurs;
    var INNEHALL = {
      '1a': ['Yrkesrelevanta begrepp: proportionalitet, skala, likformighet, vinklar, Pythagoras sats, procent och andelar, indexmått, vinstmarginal, felmarginaler', 'Beräkningsmetoder: uppskattning, överslagsräkning, avrundning, mätfel, spill och svinn, kontrollberäkning', 'Enhetsbyten, storheter, kostnadsberäkningar och säkerhetsmarginaler', 'Formler och algebraiska uttryck, faktorisering och multiplicering av uttryck', 'Funktioner: ord, uttryck, tabeller och grafer; grafisk lösning av f(x) = a', 'Linjära funktioner och linjära ekvationer', 'Exponentialfunktioner – likheter och skillnader med linjära funktioner', 'Förändringsfaktor och förändringar i flera steg', 'Sannolikhet: oberoende och beroende händelser, komplementhändelse, flera steg', 'Statistiska begrepp: signifikans, korrelation, kausalitet, urvalsmetoder och felkällor', 'Ränta och amortering', 'Problemlösning, modeller och kritisk granskning'],
      '1b': ['Formler och algebraiska uttryck, faktorisering och multiplicering av uttryck', 'Funktion, definitionsmängd och värdemängd; ord, uttryck, tabeller och grafer', 'Funktionsvärden och grafisk lösning av f(x) = a', 'Linjära funktioner, räta linjens ekvation och linjära ekvationer', 'Intervall och linjära olikheter', 'Exponentialfunktioner – likheter och skillnader med linjära funktioner', 'Räkneregler för potenser, potensekvationer och potensfunktioner', 'Förändringsfaktor och förändringar i flera steg', 'Index', 'Sannolikhet: oberoende och beroende händelser, komplementhändelse, flera steg', 'Statistiska begrepp: signifikans, korrelation, kausalitet, urvalsmetoder och felkällor', 'Ränta och amortering', 'Problemlösning, generella samband, modeller och kritisk granskning'],
      '1c': ['Formler och algebraiska uttryck, faktorisering och multiplicering av uttryck', 'Funktion, definitionsmängd och värdemängd; ord, uttryck, tabeller och grafer', 'Funktionsvärden och grafisk lösning av f(x) = a', 'Linjära funktioner, räta linjens ekvation och linjära ekvationer', 'Intervall och linjära olikheter', 'Exponentialfunktioner – likheter och skillnader med linjära funktioner', 'Räkneregler för potenser, potensekvationer och potensfunktioner', 'Förändringsfaktor och förändringar i flera steg', 'Trigonometri: sinus, cosinus, tangens och arcusfunktioner', 'Vektorer: koordinatform, addition, subtraktion, belopp och multiplikation med skalär', 'Sannolikhet: oberoende och beroende händelser, komplementhändelse, flera steg', 'Statistiska begrepp: signifikans, korrelation, kausalitet, urvalsmetoder och felkällor', 'Ränta och amortering', 'Programmering som verktyg vid problemlösning', 'Problemlösning, generella samband, modeller och kritisk granskning']
    };
    var FB = 'https://www.skolverket.se/download/18.3a18923119dd772e4f9221cf/1789106862118/Formelblad_Matematik_niva_1-2.pdf';
    v.innerHTML = '<h1>Formler &amp; tips</h1><p class="muted">På provet får du Skolverkets <strong>Formler till nationellt prov i matematik nivå 1</strong> (gäller för 1a, 1b och 1c). Här är innehållet sammanställt så att du kan lära dig hitta i det. ' +
      '<a href="' + FB + '" target="_blank" rel="noopener">Öppna det officiella formelbladet (PDF) ↗</a></p>' +
      '<div class="card" style="margin-bottom:14px"><h2 style="margin-top:0">Det här ingår i nivå ' + k + '</h2><p class="small muted">Centralt innehåll enligt Skolverkets ämnesplan i matematik (Gy25).</p><ul class="tips">' +
        INNEHALL[k].map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>' +
      '<div class="formula-grid">' +
      card('Prefix och potenser', '<p>T 10<sup>12</sup>, G 10<sup>9</sup>, M 10<sup>6</sup>, k 10<sup>3</sup>, h 10<sup>2</sup>, da 10<sup>1</sup>, d 10<sup>−1</sup>, c 10<sup>−2</sup>, m 10<sup>−3</sup>, µ 10<sup>−6</sup>, n 10<sup>−9</sup>, p 10<sup>−12</sup></p>' +
        '<p>För reella tal \\(x\\) och \\(y\\) och positiva tal \\(a\\) och \\(b\\) gäller</p>\\[a^x a^y=a^{x+y}\\]\\[\\frac{a^x}{a^y}=a^{x-y}\\]\\[(a^x)^y=a^{xy}\\]\\[a^x b^x=(ab)^x\\]\\[\\frac{a^x}{b^x}=\\left(\\frac{a}{b}\\right)^x\\]\\[a^{-x}=\\frac{1}{a^x}\\]\\[a^{\\frac{1}{n}}=\\sqrt[n]{a}\\]\\[a^0=1\\]') +
      card('Funktioner', '<p>Räta linjen</p>\\[y=kx+m\\]\\[k=\\frac{y_2-y_1}{x_2-x_1}\\]<p>\\(ax+by+c=0\\), där inte både \\(a\\) och \\(b\\) är noll.</p>' +
        '<p>Exponentialfunktion: \\(y=Ca^x\\), där \\(a\\gt 0\\) och \\(a\\neq 1\\). \\(C\\) = startvärde, \\(a\\) = förändringsfaktor. Ökning med 5 % ger \\(a=1{,}05\\), minskning med 5 % ger \\(a=0{,}95\\).</p>' +
        '<p>Potensfunktion: \\(y=Cx^a\\)</p>') +
      card('Geometri – area och volym', '<p>Triangel \\(A=\\frac{bh}{2}\\) · Parallellogram \\(A=bh\\) · Parallelltrapets \\(A=\\frac{h(a+b)}{2}\\)</p>' +
        '<p>Cirkel \\(A=\\pi r^2=\\frac{\\pi d^2}{4}\\), \\(O=2\\pi r=\\pi d\\)</p><p>Cirkelsektor \\(A=\\frac{v}{360^\\circ}\\cdot \\pi r^2\\), båglängd \\(b_l=\\frac{v}{360^\\circ}\\cdot 2\\pi r\\)</p>' +
        '<p>Rätblock och prisma \\(V=Bh\\) · Cylinder \\(V=Bh\\), mantelarea \\(A_m=2\\pi rh\\)</p><p>Pyramid \\(V=\\frac{Bh}{3}\\) · Kon \\(V=\\frac{Bh}{3}\\), mantelarea \\(A_m=\\pi rs\\)</p><p>Klot \\(V=\\frac{4\\pi r^3}{3}\\), \\(A=4\\pi r^2\\)</p>') +
      card('Skala, Pythagoras och trigonometri', '<p>Areaskala = (längdskala)², volymskala = (längdskala)³</p>' +
        '<p>För sidorna \\(a\\), \\(b\\) och \\(c\\) i en rätvinklig triangel gäller</p><p>Pythagoras sats: \\(a^2+b^2=c^2\\)</p>' +
        '<p>Trigonometri' + (k === '1c' ? '' : ' <span class="small muted">(ingår i 1c)</span>') + ':</p>\\[\\sin v=\\frac{a}{c}\\quad \\cos v=\\frac{b}{c}\\quad \\tan v=\\frac{a}{b}\\]') +
      card('Vektorer' + (k === '1c' ? '' : ' <span class="small muted">(ingår i 1c)</span>'), '<p>För vektorerna \\(\\vec u=(a_x,a_y)\\) och \\(\\vec v=(b_x,b_y)\\) samt skalären \\(s\\) gäller</p>' +
        '\\[\\vec u+\\vec v=(a_x+b_x,\\; a_y+b_y)\\]\\[\\vec u-\\vec v=(a_x-b_x,\\; a_y-b_y)\\]\\[s\\cdot\\vec u=(sa_x,\\; sa_y)\\]\\[|\\vec u|=\\sqrt{a_x^2+a_y^2}\\]') +
      card('Bra att kunna utantill', '<p>Står <strong>inte</strong> på formelbladet:</p><ul class="tips"><li>Förändringsfaktor = nytt värde / gammalt värde</li><li>Procentenheter = skillnad mellan två procentsatser</li>' +
        '<li>Sannolikhet: \\(P(\\text{inte }A)=1-P(A)\\). Oberoende händelser i flera steg: multiplicera sannolikheterna längs grenarna i ett träddiagram.</li>' +
        '<li>Korrelation betyder samvariation – inte nödvändigtvis orsakssamband (kausalitet).</li><li>Ränta = skuld · räntesats. Rak amortering = lika stort belopp varje gång.</li></ul>') +
      '</div>' +
      '<h2>Strategier för varje del</h2><div class="grid grid-3">' +
      card('Del A – utan räknare', '<ul class="tips"><li>Talen är valda så att de går jämnt ut. Får du ett konstigt svar – kontrollräkna.</li><li>Öva på bråk, negativa tal, potenser och huvudräkning.</li><li>Skriv mellanled – det ger poäng även om slutsvaret blir fel.</li><li>Hoppa över och kom tillbaka om du fastnar.</li></ul>') +
      card('Del B – ' + (k === '1a' ? 'enkel räknare (1a)' : 'utan räknare (1b/1c)'), '<ul class="tips"><li>Lösningarna skrivs i elevhäftet – visa hur du tänkt, inte bara svaret.</li>' + (k === '1a' ? '<li>Använd räknaren till beräkningarna men skriv uppställningen.</li>' : '<li>Talen är valda så att de går att räkna för hand. Öva på procent, bråk och potenser utan räknare.</li>') + '<li>Rimlighetsbedöm svaret i sammanhanget.</li></ul>') +
      card('Del C – enkel räknare', '<ul class="tips"><li>Läs hela uppgiften och stryk under vad som efterfrågas.</li><li>Rita figur, inför beteckningar och förklara dem.</li><li>A-uppgifter kräver generella resonemang och tydlig kommunikation – motivera varje steg.</li><li>Avsluta med ett tydligt svar med enhet.</li></ul>') +
      '</div>' +
      '<h2>Bedömning på provet</h2><div class="card"><p>Uppgifterna ger <strong>E-, C- och A-poäng</strong>, skrivna som t.ex. (2/1/0). Bedömningen gäller förmågorna <em>begrepp (B), procedur (P), problemlösning (PL), modellering (M), resonemang (R)</em> och <em>kommunikation (K)</em>. För de högre betygen krävs både tillräckligt många poäng totalt och tillräckligt många poäng på C- och A-nivå.</p>' +
      '<p>För att få full poäng på redovisningsuppgifter ska lösningen vara lätt att följa: skriv ekvationer, förklara beteckningar, motivera steg och skriv ett tydligt svar.</p></div>' +
      '<h2>Checklista inför provdagen</h2><div class="card"><ul class="tips">' +
      '<li>Gör minst en hel provsimulering under tidspress (240 min).</li><li>Kontrollera att din räknare är en enkel räknare (inte grafritande) och har fräscha batterier.</li><li>Packa enkel räknare, linjal, gradskiva, pennor och sudd.</li><li>Ät frukost och ta med vatten och något att äta på rasterna.</li><li>Var på plats i god tid före kl. 9.00.</li></ul></div>';
  };
  function card(t, body) { return '<div class="card"><h3>' + t + '</h3>' + body + '</div>'; }

  /* ---------- Räknare ---------- */
  var calc = $('#calc'), disp = $('#calcDisplay');
  function calcEval() {
    var s = disp.value.replace(/,/g, '.').replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-');
    s = s.replace(/(\d+(?:\.\d+)?)%/g, '($1/100)');
    if (!/^[0-9.+\-*/()^sqrt ]*$/.test(s)) { disp.value = 'Fel'; return; }
    s = s.replace(/\s+/g, '').replace(/([\d.)])(?=\(|sqrt)/g, '$1*').replace(/\)(?=[\d.])/g, ')*');
    s = s.replace(/\^/g, '**').replace(/sqrt/g, 'Math.sqrt');
    try {
      var v = Function('"use strict";return (' + s + ');')();
      if (typeof v !== 'number' || !isFinite(v)) throw 0;
      disp.value = String(Math.round(v * 1e10) / 1e10).replace('.', ',');
    } catch (e) { disp.value = 'Fel'; }
  }
  calc.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    if (b.getAttribute('data-calc') === 'close') { calc.hidden = true; return; }
    var k = b.getAttribute('data-k'); if (!k) return;
    if (disp.value === 'Fel') disp.value = '';
    if (k === 'C') disp.value = '';
    else if (k === 'DEL') disp.value = disp.value.slice(0, -1);
    else if (k === '=') calcEval();
    else disp.value += k;
  });
  disp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); calcEval(); } if (e.key === 'Escape') calc.hidden = true; });
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-open-calc]')) { calc.hidden = !calc.hidden; if (!calc.hidden) disp.focus(); }
  });

  /* ---------- Kurs och tema ---------- */
  function setKurs(k) {
    store.kurs = k; save(); uppdateraDelB(k);
    $$('.course-switch button').forEach(function (b) { b.setAttribute('aria-checked', String(b.getAttribute('data-kurs') === k)); });
  }
  $$('.course-switch button').forEach(function (b) {
    b.addEventListener('click', function () {
      if (prov && prov.fas !== 'klar' && !confirm('Du har ett pågående prov. Byter du nivå avbryts det. Fortsätta?')) return;
      if (prov && prov.fas !== 'klar') { prov = null; sparaProv(null); }
      session = null;
      setKurs(b.getAttribute('data-kurs'));
      var h = (location.hash || '#hem').slice(1).split('/')[0];
      go(h === 'trana' ? 'trana' : h);
    });
  });
  setKurs(store.kurs);
  var tema = null;
  try { tema = localStorage.getItem(LS_KEY + '_tema'); } catch (e) { tema = null; }
  if (tema) document.documentElement.setAttribute('data-theme', tema);
  $('#themeBtn').addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme');
    var dark = cur ? cur === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    var ny = dark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', ny);
    try { localStorage.setItem(LS_KEY + '_tema', ny); } catch (e) { /* ignorera */ }
  });

  /* provlisten ska fästa precis under den klibbiga toppraden, vars höjd varierar */
  function topbarH() { document.documentElement.style.setProperty('--topbar-h', $('.topbar').offsetHeight + 'px'); }
  topbarH();
  window.addEventListener('resize', topbarH);

  window.addEventListener('hashchange', route);
  /* exponera för test */
  window.NPMA2 = { parseNum: parseNum, ratta: ratta, radPoang: radPoang, splitFlera: splitFlera };
  route();
})();
