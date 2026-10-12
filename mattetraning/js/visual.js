/* Bilder (SVG) och den interaktiva bråkverkstaden. */
(function () {
  'use strict';
  var M = window.MATTE = window.MATTE || {};
  var NS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (parent) parent.appendChild(e);
    return e;
  }
  function svg(w, h, label) {
    var s = el('svg', { viewBox: '0 0 ' + w + ' ' + h, role: 'img', 'aria-label': label, class: 'vis-svg' });
    return s;
  }

  // Stav delad i n delar, t färgade. opts.etiketter = text i delarna, opts.halv = streckad mittlinje.
  function stav(n, t, opts) {
    opts = opts || {};
    var W = 600, H = opts.hojd || 90, pad = 4, w = (W - pad * 2) / n;
    var s = svg(W, H + (opts.halv ? 16 : 0), n + ' delar, ' + t + ' färgade');
    for (var i = 0; i < n; i++) {
      var r = el('rect', { x: pad + i * w, y: pad, width: w, height: H - pad * 2, rx: 4, class: i < t ? 'del fylld' : 'del', 'data-i': i }, s);
      if (opts.klickbar) { r.setAttribute('tabindex', '0'); r.setAttribute('role', 'button'); r.setAttribute('aria-label', 'Del ' + (i + 1) + (i < t ? ', färgad' : '')); }
      if (opts.etiketter && opts.etiketter[i]) {
        var tx = el('text', { x: pad + i * w + w / 2, y: H / 2 + 7, 'text-anchor': 'middle', class: 'del-text' }, s);
        tx.textContent = opts.etiketter[i];
      }
    }
    if (opts.halv) {
      el('line', { x1: W / 2, y1: 0, x2: W / 2, y2: H + 14, class: 'halvlinje' }, s);
      var ht = el('text', { x: W / 2, y: H + 14, 'text-anchor': 'middle', class: 'liten-text' }, s);
      ht.textContent = 'halva';
    }
    return s;
  }

  function cirkel(n, t, opts) {
    opts = opts || {};
    var R = 90, C = 100, s = svg(200, 200, 'Cirkel med ' + n + ' delar, ' + t + ' färgade');
    if (n === 1) {
      var c = el('circle', { cx: C, cy: C, r: R, class: t ? 'del fylld' : 'del', 'data-i': 0 }, s);
      if (opts.klickbar) c.setAttribute('tabindex', '0');
      return s;
    }
    for (var i = 0; i < n; i++) {
      var a0 = (i / n) * Math.PI * 2 - Math.PI / 2, a1 = ((i + 1) / n) * Math.PI * 2 - Math.PI / 2;
      var x0 = C + R * Math.cos(a0), y0 = C + R * Math.sin(a0), x1 = C + R * Math.cos(a1), y1 = C + R * Math.sin(a1);
      var stor = (a1 - a0) > Math.PI ? 1 : 0;
      var p = el('path', { d: 'M' + C + ',' + C + ' L' + x0 + ',' + y0 + ' A' + R + ',' + R + ' 0 ' + stor + ' 1 ' + x1 + ',' + y1 + ' Z', class: i < t ? 'del fylld' : 'del', 'data-i': i }, s);
      if (opts.klickbar) { p.setAttribute('tabindex', '0'); p.setAttribute('role', 'button'); p.setAttribute('aria-label', 'Bit ' + (i + 1)); }
    }
    return s;
  }

  function tallinje(n, t) {
    var W = 600, x0 = 30, x1 = 570, y = 50, s = svg(W, 90, 'Tallinje från 0 till 1 delad i ' + n + ' delar');
    el('line', { x1: x0, y1: y, x2: x1, y2: y, class: 'linje' }, s);
    for (var i = 0; i <= n; i++) {
      var x = x0 + (x1 - x0) * i / n, stor = i === 0 || i === n;
      el('line', { x1: x, y1: y - (stor ? 16 : 10), x2: x, y2: y + (stor ? 16 : 10), class: 'linje' }, s);
    }
    [[0, '0'], [n, '1']].forEach(function (p) {
      var tx = el('text', { x: x0 + (x1 - x0) * p[0] / n, y: y + 38, 'text-anchor': 'middle', class: 'liten-text' }, s);
      tx.textContent = p[1];
    });
    if (t !== undefined && t !== null) el('circle', { cx: x0 + (x1 - x0) * t / n, cy: y, r: 11, class: 'prick' }, s);
    return s;
  }

  function jamfor(n1, t1, n2, t2) {
    var wrap = document.createElement('div');
    wrap.className = 'vis-jamfor';
    wrap.appendChild(stav(n1, t1, { hojd: 60 }));
    wrap.appendChild(stav(n2, t2, { hojd: 60 }));
    return wrap;
  }

  // Ritar en bild utifrån en vis-beskrivning från uppgiftsdatan.
  M.ritaVis = function (v) {
    if (!v) return null;
    var box = document.createElement('div');
    box.className = 'vis';
    var n = Math.round(v.n), t = Math.round(v.t || 0);
    if (v.typ === 'stav') box.appendChild(stav(n, t, { etiketter: v.etiketter, halv: v.halv }));
    else if (v.typ === 'cirkel') box.appendChild(cirkel(n, t));
    else if (v.typ === 'tallinje') box.appendChild(tallinje(n, t));
    else if (v.typ === 'jamfor') box.appendChild(jamfor(Math.round(v.n1), Math.round(v.t1), Math.round(v.n2), Math.round(v.t2)));
    else if (v.typ === 'brakverkstad') box.appendChild(brakverkstad());
    else if (M.visTyper && M.visTyper[v.typ]) { var e = M.visTyper[v.typ](v); if (!e) return null; box.appendChild(e); }
    else return null;
    return box;
  };
  M.svgEl = el;
  M.svg = svg;
  M.stav = stav;

  /* ================= Bråkverkstaden =================
     Eleven väljer antal delar, klickar för att färga och kan jämföra med en andra stav. */
  function brakverkstad() {
    var st = { n: 4, t: 0, form: 'stav', jamfor: false, n2: 8, t2: 0 };
    var root = document.createElement('div');
    root.className = 'verkstad';
    root.innerHTML =
      '<div class="verkstad-rad">' +
        '<span class="verkstad-lbl">Antal delar</span>' +
        '<button type="button" class="rund" data-a="minus" aria-label="Färre delar">−</button>' +
        '<output class="verkstad-n" data-o="n">4</output>' +
        '<button type="button" class="rund" data-a="plus" aria-label="Fler delar">+</button>' +
        '<span class="seg verkstad-form" role="group" aria-label="Form">' +
          '<button type="button" data-form="stav" aria-pressed="true">Stav</button>' +
          '<button type="button" data-form="cirkel" aria-pressed="false">Cirkel</button>' +
        '</span>' +
      '</div>' +
      '<p class="verkstad-hjalp">Klicka på delarna för att färga dem.</p>' +
      '<div class="verkstad-bild" data-o="bild1"></div>' +
      '<div class="verkstad-resultat" data-o="res1" aria-live="polite"></div>' +
      '<label class="vaxel"><input type="checkbox" data-a="jamfor"> Jämför med en annan stav</label>' +
      '<div data-o="jamfor" hidden>' +
        '<div class="verkstad-rad">' +
          '<span class="verkstad-lbl">Antal delar</span>' +
          '<button type="button" class="rund" data-a="minus2" aria-label="Färre delar i stav 2">−</button>' +
          '<output class="verkstad-n" data-o="n2">8</output>' +
          '<button type="button" class="rund" data-a="plus2" aria-label="Fler delar i stav 2">+</button>' +
        '</div>' +
        '<div class="verkstad-bild" data-o="bild2"></div>' +
        '<div class="verkstad-resultat" data-o="res2" aria-live="polite"></div>' +
      '</div>';

    function q(s) { return root.querySelector('[data-o="' + s + '"]'); }
    function resultat(t, n) {
      if (t === 0) return 'Inget färgat än.';
      var b = M.html('[' + t + '/' + n + ']');
      var extra = t === n ? ' Det är en hel!' : (t * 2 === n ? ' Det är en halv!' : '');
      return 'Du har färgat ' + t + ' av ' + n + ' delar: ' + b + extra;
    }
    function rita() {
      q('n').textContent = st.n; q('n2').textContent = st.n2;
      var b1 = q('bild1'); b1.innerHTML = '';
      b1.appendChild(st.form === 'cirkel' ? cirkel(st.n, st.t, { klickbar: true }) : stav(st.n, st.t, { klickbar: true }));
      q('res1').innerHTML = resultat(st.t, st.n);
      q('jamfor').hidden = !st.jamfor;
      if (st.jamfor) {
        var b2 = q('bild2'); b2.innerHTML = '';
        b2.appendChild(stav(st.n2, st.t2, { klickbar: true }));
        var likt = st.t > 0 && st.t2 > 0 && st.t * st.n2 === st.t2 * st.n;
        q('res2').innerHTML = resultat(st.t2, st.n2) +
          (likt ? '<div class="lika">✨ Lika mycket! ' + M.html('[' + st.t + '/' + st.n + '] = [' + st.t2 + '/' + st.n2 + ']') + '</div>' : '');
      }
      $$('[data-form]', root).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.form === st.form)); });
    }
    function $$(s, r) { return Array.prototype.slice.call(r.querySelectorAll(s)); }

    function klickDel(target) {
      var del = target.closest('[data-i]'); if (!del) return;
      var i = +del.getAttribute('data-i');
      var i2 = !!target.closest('[data-o="bild2"]');
      // Klick på en del färgar fram till och med den delen. Klick på sista färgade delen tar bort den.
      if (i2) st.t2 = (st.t2 === i + 1) ? i : i + 1;
      else st.t = (st.t === i + 1) ? i : i + 1;
      rita();
      var ny = root.querySelector((i2 ? '[data-o="bild2"]' : '[data-o="bild1"]') + ' [data-i="' + i + '"]');
      if (ny && ny.focus) ny.focus();
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button, input');
      if (b && b.dataset.a) {
        var a = b.dataset.a;
        if (a === 'minus') { st.n = Math.max(1, st.n - 1); st.t = Math.min(st.t, st.n); }
        if (a === 'plus') { st.n = Math.min(12, st.n + 1); }
        if (a === 'minus2') { st.n2 = Math.max(1, st.n2 - 1); st.t2 = Math.min(st.t2, st.n2); }
        if (a === 'plus2') { st.n2 = Math.min(12, st.n2 + 1); }
        if (a === 'jamfor') { st.jamfor = b.checked; }
        rita(); return;
      }
      if (b && b.dataset.form) { st.form = b.dataset.form; rita(); return; }
      klickDel(e.target);
    });
    root.addEventListener('keydown', function (e) {
      if ((e.key === 'Enter' || e.key === ' ') && e.target.getAttribute && e.target.getAttribute('data-i') !== null) { e.preventDefault(); klickDel(e.target); }
    });
    rita();
    return root;
  }
})();
