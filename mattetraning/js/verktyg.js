/* Verktyg: miniräknare, kladdyta och formelblad. Visas i en panel som glider upp. */
(function () {
  'use strict';
  var M = window.MATTE = window.MATTE || {};
  var panel, titel, kropp, aktivt = null, aterFokus = null;

  function initPanel() {
    panel = document.getElementById('verktygPanel');
    titel = document.getElementById('verktygTitel');
    kropp = document.getElementById('verktygKropp');
    document.getElementById('verktygStang').addEventListener('click', stang);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !panel.hidden) stang(); });
  }
  function oppna(namn, rubrik, innehall) {
    if (aktivt === namn && !panel.hidden) { stang(); return; }
    aterFokus = document.activeElement;
    aktivt = namn;
    titel.textContent = rubrik;
    kropp.innerHTML = '';
    kropp.appendChild(innehall);
    panel.hidden = false;
    panel.dataset.verktyg = namn;
    document.body.classList.add('panel-oppen');
    document.querySelectorAll('[data-verktyg-knapp]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.verktygKnapp === namn)); });
    var f = kropp.querySelector('button, [tabindex]'); if (f) f.focus();
  }
  function stang() {
    panel.hidden = true; aktivt = null;
    document.body.classList.remove('panel-oppen');
    document.querySelectorAll('[data-verktyg-knapp]').forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
    if (aterFokus && aterFokus.focus) aterFokus.focus();
  }
  M.stangVerktyg = function () { if (panel && !panel.hidden) stang(); };

  /* ---------- Miniräknare ---------- */
  var kalkUttryck = '';
  function miniraknare() {
    var d = document.createElement('div');
    d.className = 'kalk';
    var knappar = ['C', '(', ')', '⌫', '7', '8', '9', '÷', '4', '5', '6', '×', '1', '2', '3', '−', '0', ',', '=', '+'];
    d.innerHTML = '<div class="kalk-skarm" aria-live="polite"><div class="kalk-uttryck" data-k="u"></div><div class="kalk-svar" data-k="s"></div></div>' +
      '<div class="kalk-knappar">' + knappar.map(function (k) {
        var cls = /[÷×−+=]/.test(k) ? ' op' : (k === 'C' || k === '⌫' ? ' fn' : '');
        var lbl = { '÷': 'delat med', '×': 'gånger', '−': 'minus', '+': 'plus', '=': 'är lika med', '⌫': 'sudda', 'C': 'rensa', ',': 'komma' }[k] || k;
        return '<button type="button" class="kalk-k' + cls + '" data-k="' + k + '" aria-label="' + lbl + '">' + k + '</button>';
      }).join('') + '</div>';
    var u = d.querySelector('[data-k="u"]'), s = d.querySelector('[data-k="s"]');
    function visa(svar) { u.textContent = kalkUttryck || '0'; s.textContent = svar || ''; }
    function rakna() {
      if (!kalkUttryck) return;
      try {
        var expr = kalkUttryck.replace(/÷/g, '/').replace(/×/g, '*').replace(/−/g, '-').replace(/,/g, '.');
        var v = M.evaluate(expr, {});
        if (!isFinite(v)) { visa('Går inte att dela med 0'); return; }
        visa('= ' + M.talText(v));
        kalkUttryck = M.talText(v).replace('−', '−');
      } catch (e) { visa('Kolla uttrycket'); }
    }
    function tryck(k) {
      if (k === 'C') kalkUttryck = '';
      else if (k === '⌫') kalkUttryck = kalkUttryck.slice(0, -1);
      else if (k === '=') { rakna(); return; }
      else kalkUttryck += k;
      visa('');
    }
    d.addEventListener('click', function (e) { var b = e.target.closest('[data-k]'); if (b && b.tagName === 'BUTTON') tryck(b.dataset.k); });
    d.addEventListener('keydown', function (e) {
      var map = { '/': '÷', '*': '×', '-': '−', '+': '+', 'Enter': '=', '=': '=', 'Backspace': '⌫', 'Escape': null, '.': ',', ',': ',', '(': '(', ')': ')' };
      if (/^[0-9]$/.test(e.key)) { e.preventDefault(); tryck(e.key); }
      else if (map[e.key]) { e.preventDefault(); tryck(map[e.key]); }
    });
    visa('');
    return d;
  }

  /* ---------- Kladdyta ---------- */
  var kladdBild = null;
  function kladdyta() {
    var d = document.createElement('div');
    d.className = 'kladd';
    d.innerHTML = '<div class="kladd-verktyg">' +
      '<button type="button" class="knapp liten" data-p="penna" aria-pressed="true">✏️ Penna</button>' +
      '<button type="button" class="knapp liten" data-p="sudd" aria-pressed="false">🧽 Sudd</button>' +
      '<button type="button" class="knapp liten" data-p="rensa">🗑️ Rensa</button>' +
      '</div><canvas class="kladd-yta" aria-label="Kladdyta. Rita eller skriv med musen, fingret eller pennan."></canvas>';
    var c = d.querySelector('canvas'), ctx, laga = 'penna', ritar = false, senast = null;
    function farg() { return getComputedStyle(document.documentElement).getPropertyValue('--text').trim() || '#222'; }
    function storlek() {
      var r = c.getBoundingClientRect(), dpr = window.devicePixelRatio || 1;
      var spara = kladdBild;
      c.width = Math.max(1, r.width * dpr); c.height = Math.max(1, r.height * dpr);
      ctx = c.getContext('2d'); ctx.scale(dpr, dpr); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      if (spara) { var img = new Image(); img.onload = function () { ctx.drawImage(img, 0, 0, r.width, r.height); }; img.src = spara; }
    }
    function pos(e) { var r = c.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
    c.addEventListener('pointerdown', function (e) { ritar = true; senast = pos(e); c.setPointerCapture(e.pointerId); e.preventDefault(); });
    c.addEventListener('pointermove', function (e) {
      if (!ritar) return;
      var p = pos(e);
      ctx.globalCompositeOperation = laga === 'sudd' ? 'destination-out' : 'source-over';
      ctx.strokeStyle = farg(); ctx.lineWidth = laga === 'sudd' ? 26 : 3.5;
      ctx.beginPath(); ctx.moveTo(senast.x, senast.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      senast = p;
    });
    function slut() { if (ritar) { ritar = false; try { kladdBild = c.toDataURL(); } catch (e) {} } }
    c.addEventListener('pointerup', slut); c.addEventListener('pointercancel', slut);
    d.addEventListener('click', function (e) {
      var b = e.target.closest('[data-p]'); if (!b) return;
      if (b.dataset.p === 'rensa') { ctx.clearRect(0, 0, c.width, c.height); kladdBild = null; return; }
      laga = b.dataset.p;
      d.querySelectorAll('[data-p="penna"],[data-p="sudd"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    });
    requestAnimationFrame(storlek);
    return d;
  }

  /* ---------- Formelblad ---------- */
  function formelblad(omradeId) {
    var d = document.createElement('div');
    d.className = 'formelblad';
    var omr = (M.DATA.omraden.filter(function (o) { return o.id === omradeId; })[0]);
    var lista = omr ? [omr] : M.DATA.omraden;
    d.innerHTML = lista.map(function (o) {
      return '<h3>' + o.ikon + ' ' + M.esc(o.namn) + '</h3>' + (o.formelblad || []).map(function (f) {
        return '<section class="fb-del"><h4>' + M.esc(f.rubrik) + ' ' + M.lasKnapp(f.rubrik + '. ' + f.rader.join('. ')) + '</h4><ul>' +
          f.rader.map(function (r) { return '<li>' + M.html(r) + '</li>'; }).join('') + '</ul></section>';
      }).join('');
    }).join('') + (omr ? '<p><button type="button" class="lank-knapp" data-fb-alla>Visa formelblad för alla områden</button></p>' : '');
    d.addEventListener('click', function (e) {
      if (e.target.closest('[data-fb-alla]')) oppna('formelblad-alla', '📐 Formelblad', formelblad(null));
    });
    return d;
  }

  M.initVerktyg = function () {
    initPanel();
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-verktyg-knapp]'); if (!b) return;
      var v = b.dataset.verktygKnapp;
      if (v === 'kalk') oppna('kalk', '🧮 Miniräknare', miniraknare());
      if (v === 'kladd') oppna('kladd', '✏️ Kladdyta', kladdyta());
      if (v === 'formel') oppna('formel', '📐 Formelblad', formelblad(M.aktuelltOmrade()));
    });
  };
})();
