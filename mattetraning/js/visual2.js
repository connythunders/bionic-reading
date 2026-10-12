/* Fler bilder (för uppgifter) och interaktiva visualiseringar (för Förstå).
   Varje typ registreras i M.visTyper och anropas med vis-beskrivningen från datafilerna. */
(function () {
  'use strict';
  var M = window.MATTE = window.MATTE || {};
  var T = M.visTyper = M.visTyper || {};
  var S = function (tag, a, p) { return M.svgEl(tag, a, p); };
  function txt(p, x, y, s, cls, anchor) { var t = S('text', { x: x, y: y, 'text-anchor': anchor || 'middle', class: cls || 'liten-text' }, p); t.textContent = s; return t; }
  function tal(x) { return M.talText(x); }
  function div(cls, html) { var d = document.createElement('div'); if (cls) d.className = cls; if (html !== undefined) d.innerHTML = html; return d; }
  function num(v, d) { return (typeof v === 'number' && isFinite(v)) ? v : d; }

  /* ===================================================================
     STATISKA BILDER
     =================================================================== */

  // Tallinje med valfritt intervall. {min, max, steg, prickar:[..], namn:['A','B'], var: etikett var n:e steg}
  T.tallinje2 = function (v) {
    var min = num(v.min, 0), max = num(v.max, 10), steg = num(v.steg, 1);
    var n = Math.round((max - min) / steg), W = 640, x0 = 30, x1 = 610, y = 50;
    var s = M.svg(W, 100, 'Tallinje från ' + tal(min) + ' till ' + tal(max));
    var X = function (val) { return x0 + (x1 - x0) * (val - min) / (max - min); };
    S('line', { x1: x0 - 14, y1: y, x2: x1 + 14, y2: y, class: 'linje' }, s);
    var varN = num(v.var, n > 12 ? Math.ceil(n / 10) : 1);
    for (var i = 0; i <= n; i++) {
      var val = Math.round((min + i * steg) * 1e6) / 1e6, xx = X(val), stor = i % varN === 0;
      S('line', { x1: xx, y1: y - (stor ? 13 : 7), x2: xx, y2: y + (stor ? 13 : 7), class: 'linje' }, s);
      if (stor && v.etiketter !== false) txt(s, xx, y + 38, tal(val), val === 0 ? 'liten-text fet' : 'liten-text');
    }
    var pr = v.prickar !== undefined ? v.prickar : (v.prick !== undefined ? [v.prick] : []);
    pr.forEach(function (p, i) {
      S('circle', { cx: X(p), cy: y, r: 10, class: 'prick' }, s);
      if (v.namn && v.namn[i] !== undefined && v.namn[i] !== '') txt(s, X(p), y - 20, typeof v.namn[i] === 'number' ? tal(v.namn[i]) : v.namn[i], 'liten-text fet');
    });
    return s;
  };

  T.hundraruta = function (v) {
    var f = Math.round(num(v.fylld, 0)), s = M.svg(320, 320, f + ' av 100 rutor färgade'), k = 30;
    for (var i = 0; i < 100; i++) S('rect', { x: 10 + (i % 10) * k, y: 10 + Math.floor(i / 10) * k, width: k, height: k, class: i < f ? 'del fylld' : 'del', 'data-i': i }, s);
    s.classList.add('liten-bild');
    return s;
  };

  T.rektangel = function (v) {
    var b = num(v.b, 4), h = num(v.h, 3);
    var sk = Math.min(420 / b, 220 / h), w = b * sk, hh = h * sk, ox = 90, oy = 30;
    var s = M.svg(w + 180, hh + 80, 'Rektangel');
    S('rect', { x: ox, y: oy, width: w, height: hh, class: 'del fylld-ljus' }, s);
    if (v.rutor && b <= 20 && h <= 20 && b === Math.round(b) && h === Math.round(h)) {
      for (var i = 1; i < b; i++) S('line', { x1: ox + i * sk, y1: oy, x2: ox + i * sk, y2: oy + hh, class: 'rutlinje' }, s);
      for (var j = 1; j < h; j++) S('line', { x1: ox, y1: oy + j * sk, x2: ox + w, y2: oy + j * sk, class: 'rutlinje' }, s);
    }
    S('rect', { x: ox, y: oy, width: w, height: hh, class: 'kontur' }, s);
    var e = v.enhet ? ' ' + v.enhet : '';
    txt(s, ox + w / 2, oy + hh + 34, v.bText !== undefined ? String(v.bText) : tal(b) + e, 'liten-text fet');
    txt(s, ox - 12, oy + hh / 2 + 8, v.hText !== undefined ? String(v.hText) : tal(h) + e, 'liten-text fet', 'end');
    return s;
  };

  T.triangel = function (v) {
    var a = num(v.a, 3), b = num(v.b, 4), sk = Math.min(380 / b, 220 / a), w = b * sk, h = a * sk, ox = 90, oy = 20;
    var s = M.svg(w + 200, h + 70, 'Rätvinklig triangel');
    S('polygon', { points: ox + ',' + oy + ' ' + ox + ',' + (oy + h) + ' ' + (ox + w) + ',' + (oy + h), class: 'del fylld-ljus kontur' }, s);
    S('rect', { x: ox, y: oy + h - 22, width: 22, height: 22, class: 'kontur', fill: 'none' }, s);
    txt(s, ox - 12, oy + h / 2 + 8, v.la !== undefined ? String(v.la) : tal(a), 'liten-text fet', 'end');
    txt(s, ox + w / 2, oy + h + 34, v.lb !== undefined ? String(v.lb) : tal(b), 'liten-text fet');
    txt(s, ox + w / 2 + 18, oy + h / 2 - 6, v.lc !== undefined ? String(v.lc) : '?', 'liten-text fet', 'start');
    return s;
  };

  T.vinkel = function (v) {
    var g = num(v.grader, 60), s = M.svg(360, 220, 'Vinkel'), cx = 80, cy = 190, L = 240;
    var r = g * Math.PI / 180;
    S('line', { x1: cx, y1: cy, x2: cx + L, y2: cy, class: 'linje' }, s);
    S('line', { x1: cx, y1: cy, x2: cx + L * Math.cos(r), y2: cy - L * Math.sin(r), class: 'linje' }, s);
    if (Math.abs(g - 90) < 0.01) S('rect', { x: cx, y: cy - 30, width: 30, height: 30, class: 'kontur', fill: 'none' }, s);
    else S('path', { d: 'M' + (cx + 50) + ',' + cy + ' A50,50 0 ' + (g > 180 ? 1 : 0) + ' 0 ' + (cx + 50 * Math.cos(r)) + ',' + (cy - 50 * Math.sin(r)), class: 'bage' }, s);
    if (v.etikett !== '') txt(s, cx + 80 * Math.cos(r / 2), cy - 80 * Math.sin(r / 2) + 8, v.etikett !== undefined ? String(v.etikett) : tal(g) + '°', 'liten-text fet');
    return s;
  };

  T.staplar = function (v) {
    var d = v.data || [], lbl = v.etiketter || [], max = Math.max.apply(null, d.concat([1]));
    var topp = num(v.max, Math.ceil(max / 5) * 5 || 5);
    var W = 620, H = 300, ox = 50, oy = 20, bh = 220, bw = (W - ox - 20) / d.length;
    var s = M.svg(W, H, 'Stapeldiagram');
    for (var g = 0; g <= 5; g++) {
      var yy = oy + bh - bh * g / 5;
      S('line', { x1: ox, y1: yy, x2: W - 10, y2: yy, class: 'rutlinje' }, s);
      txt(s, ox - 8, yy + 7, tal(Math.round(topp * g / 5 * 100) / 100), 'liten-text', 'end');
    }
    d.forEach(function (val, i) {
      var h = bh * val / topp, x = ox + i * bw + bw * 0.18;
      S('rect', { x: x, y: oy + bh - h, width: bw * 0.64, height: h, class: 'del fylld' }, s);
      if (v.visaVarden !== false) txt(s, x + bw * 0.32, oy + bh - h - 8, tal(val), 'liten-text fet');
      txt(s, x + bw * 0.32, oy + bh + 30, String(lbl[i] !== undefined ? lbl[i] : i + 1), 'liten-text');
    });
    S('line', { x1: ox, y1: oy + bh, x2: W - 10, y2: oy + bh, class: 'linje' }, s);
    return s;
  };

  T.tabell = function (v) {
    var r = v.rader || [];
    var t = document.createElement('table');
    t.className = 'vis-tabell';
    t.innerHTML = r.map(function (rad, i) {
      return '<tr>' + rad.map(function (c) { var tag = i === 0 && v.rubrik !== false ? 'th' : 'td'; return '<' + tag + '>' + M.html(typeof c === 'number' ? tal(c) : String(c)) + '</' + tag + '>'; }).join('') + '</tr>';
    }).join('');
    return t;
  };

  var koordNr = 0;
  function koordSvg(v) {
    var min = num(v.min, -5), max = num(v.max, 5), W = 420, pad = 30, n = max - min;
    var k = (W - 2 * pad) / n, s = M.svg(W, W, 'Koordinatsystem');
    var X = function (x) { return pad + (x - min) * k; }, Y = function (y) { return W - pad - (y - min) * k; };
    for (var i = min; i <= max; i++) {
      S('line', { x1: X(i), y1: Y(min), x2: X(i), y2: Y(max), class: 'rutlinje' }, s);
      S('line', { x1: X(min), y1: Y(i), x2: X(max), y2: Y(i), class: 'rutlinje' }, s);
    }
    var y0 = Math.max(min, Math.min(max, 0));
    S('line', { x1: X(min), y1: Y(y0), x2: X(max) + 10, y2: Y(y0), class: 'linje' }, s);
    S('line', { x1: X(y0), y1: Y(min), x2: X(y0), y2: Y(max) - 10, class: 'linje' }, s);
    txt(s, X(max) + 6, Y(y0) - 8, 'x', 'liten-text fet', 'end'); txt(s, X(y0) + 14, Y(max) - 2, 'y', 'liten-text fet', 'start');
    var varN = n > 10 ? 2 : 1;
    for (var j = min; j <= max; j++) if (j !== 0 && j % varN === 0) {
      txt(s, X(j), Y(y0) + 22, String(j).replace('-', '−'), 'mini-text');
      txt(s, X(y0) - 8, Y(j) + 5, String(j).replace('-', '−'), 'mini-text', 'end');
    }
    var klippId = 'kl' + (++koordNr);
    var cp = S('clipPath', { id: klippId }, s); S('rect', { x: X(min), y: Y(max), width: n * k, height: n * k }, cp);
    (v.linjer || []).forEach(function (l, i) {
      var xa = min, xb = max;
      S('line', { x1: X(xa), y1: Y(l.k * xa + l.m), x2: X(xb), y2: Y(l.k * xb + l.m), class: 'graf graf' + (i % 2), 'clip-path': 'url(#' + klippId + ')' }, s);
      if (l.namn) { var yn = Math.max(min + 0.5, Math.min(max - 0.5, l.k * (max - 1) + l.m)); txt(s, X(max - 1), Y(yn) - 10, l.namn, 'liten-text fet', 'end'); }
    });
    (v.punkter || []).forEach(function (p) {
      S('circle', { cx: X(p[0]), cy: Y(p[1]), r: 8, class: 'prick' }, s);
      if (p[2]) txt(s, X(p[0]) + 12, Y(p[1]) - 10, p[2], 'liten-text fet', 'start');
    });
    s.classList.add('kvadrat-bild');
    s._X = X; s._Y = Y; s._k = k; s._min = min; s._max = max;
    return s;
  }
  T.koordinat = koordSvg;

  T.vag = function (v) {
    var s = M.svg(560, 230, 'Vågskål: ' + v.vanster + ' = ' + v.hoger);
    S('polygon', { points: '270,210 290,210 280,70', class: 'kontur fylld-ljus' }, s);
    S('line', { x1: 60, y1: 70, x2: 500, y2: 70, class: 'linje tjock' }, s);
    [[110], [450]].forEach(function (p, i) {
      S('line', { x1: p[0], y1: 70, x2: p[0] - 70, y2: 130, class: 'linje' }, s);
      S('line', { x1: p[0], y1: 70, x2: p[0] + 70, y2: 130, class: 'linje' }, s);
      S('path', { d: 'M' + (p[0] - 90) + ',130 Q' + p[0] + ',175 ' + (p[0] + 90) + ',130 Z', class: 'kontur fylld-ljus' }, s);
      txt(s, p[0], 122, String(i === 0 ? v.vanster : v.hoger), 'stor-text');
    });
    S('rect', { x: 230, y: 210, width: 100, height: 10, rx: 4, class: 'fylld-mork' }, s);
    return s;
  };

  T.kub = function (v) {
    var l = num(v.l, 4), b = num(v.b, 3), h = num(v.h, 2), sk = Math.min(36, 300 / (l + b * 0.6), 180 / (h + b * 0.4));
    var dx = b * sk * 0.6, dy = b * sk * 0.4, W = l * sk + dx + 120, H = h * sk + dy + 70, ox = 60, oy = dy + 15;
    var s = M.svg(W, H, 'Rätblock');
    var A = [ox, oy], B = [ox + l * sk, oy], C = [ox + l * sk, oy + h * sk], D = [ox, oy + h * sk];
    var up = function (p) { return [p[0] + dx, p[1] - dy]; };
    var pts = function (a) { return a.map(function (p) { return p.join(','); }).join(' '); };
    S('polygon', { points: pts([A, B, up(B), up(A)]), class: 'kontur fylld-ljus2' }, s);
    S('polygon', { points: pts([B, C, up(C), up(B)]), class: 'kontur fylld-ljus3' }, s);
    S('polygon', { points: pts([A, B, C, D]), class: 'kontur fylld-ljus' }, s);
    var e = v.enhet ? ' ' + v.enhet : '';
    txt(s, ox + l * sk / 2, oy + h * sk + 30, v.lText !== undefined ? String(v.lText) : tal(l) + e, 'liten-text fet');
    txt(s, ox - 10, oy + h * sk / 2 + 8, v.hText !== undefined ? String(v.hText) : tal(h) + e, 'liten-text fet', 'end');
    txt(s, B[0] + dx / 2 + 12, C[1] - dy / 2 + 14, v.bText !== undefined ? String(v.bText) : tal(b) + e, 'liten-text fet', 'start');
    return s;
  };

  // Mönster: figur k har a rader med k rutor + b extra rutor. {a, b, antal}
  T.monster = function (v) {
    var a = num(v.a, 1), b = num(v.b, 0), antal = num(v.antal, 3), k = 20, gap = 40;
    var bredd = 0, figs = [];
    for (var f = 1; f <= antal; f++) { var w = Math.max(f, b) * k; figs.push(w); bredd += w + gap; }
    var H = (a + (b ? 1 : 0)) * k + 50;
    var s = M.svg(bredd + 20, H, 'Mönster med ' + antal + ' figurer'), x = 20;
    figs.forEach(function (w, i) {
      var f = i + 1;
      for (var r = 0; r < a; r++) for (var c = 0; c < f; c++) S('rect', { x: x + c * k, y: 10 + r * k, width: k, height: k, class: 'del fylld' }, s);
      for (var e = 0; e < b; e++) S('rect', { x: x + e * k, y: 10 + a * k, width: k, height: k, class: 'del fylld2' }, s);
      txt(s, x + w / 2, H - 8, 'Figur ' + f, 'mini-text');
      x += w + gap;
    });
    return s;
  };

  T.positionstabell = function (v) {
    var str = String(v.tal).replace('.', ','), delar = str.split(','), hel = delar[0], dec = delar[1] || '';
    var namn = ['Tusental', 'Hundratal', 'Tiotal', 'Ental'].slice(4 - Math.max(hel.length, 1));
    var dn = ['Tiondelar', 'Hundradelar', 'Tusendelar'].slice(0, dec.length);
    var t = document.createElement('table');
    t.className = 'vis-tabell positions';
    t.innerHTML = '<tr>' + namn.concat(dn).map(function (n, i) { return '<th' + (i === namn.length && dn.length ? ' class="komma-fore"' : '') + '>' + n + '</th>'; }).join('') + '</tr>' +
      '<tr>' + hel.split('').concat(dec.split('')).map(function (d, i) { return '<td' + (i === namn.length && dn.length ? ' class="komma-fore"' : '') + '>' + (v.dolj === i ? '?' : d) + '</td>'; }).join('') + '</tr>';
    return t;
  };

  T.grupper = function (v) {
    var a = num(v.a, 3), b = num(v.b, 4), r = 13, k = 36;
    var s = M.svg(b * k + 20, a * k + 20, a + ' rader med ' + b + ' i varje');
    for (var i = 0; i < a; i++) for (var j = 0; j < b; j++) S('circle', { cx: 10 + k / 2 + j * k, cy: 10 + k / 2 + i * k, r: r, class: 'prick2' }, s);
    s.classList.add('liten-bild');
    return s;
  };

  T.glas = function (v) {
    var a = num(v.saft, 1), b = num(v.vatten, 4), tot = a + b, k = Math.min(40, 260 / tot);
    var s = M.svg(220, tot * k + 40, 'Glas med ' + a + ' delar saft och ' + b + ' delar vatten');
    for (var i = 0; i < tot; i++) S('rect', { x: 70, y: 20 + i * k, width: 80, height: k, class: i < b ? 'vatten' : 'saft' }, s);
    S('path', { d: 'M66,14 L66,' + (24 + tot * k) + ' L154,' + (24 + tot * k) + ' L154,14', class: 'linje', fill: 'none' }, s);
    txt(s, 162, 20 + (b * k) / 2 + 6, 'vatten ' + b, 'mini-text', 'start');
    txt(s, 162, 20 + b * k + (a * k) / 2 + 6, 'saft ' + a, 'mini-text', 'start');
    s.classList.add('liten-bild');
    return s;
  };

  T.kulor = function (v) {
    var f = [['roda', 'kula-rod'], ['bla', 'kula-bla'], ['grona', 'kula-gron'], ['gula', 'kula-gul']], lista = [];
    f.forEach(function (x) { for (var i = 0; i < num(v[x[0]], 0); i++) lista.push(x[1]); });
    var per = 8, k = 40, rader = Math.ceil(lista.length / per) || 1;
    var s = M.svg(per * k + 40, rader * k + 40, 'Påse med kulor');
    S('rect', { x: 6, y: 6, width: per * k + 28, height: rader * k + 28, rx: 24, class: 'kontur', fill: 'none' }, s);
    lista.forEach(function (c, i) { S('circle', { cx: 20 + k / 2 + (i % per) * k, cy: 20 + k / 2 + Math.floor(i / per) * k, r: 15, class: c }, s); });
    s.classList.add('liten-bild');
    return s;
  };

  T.termometer = function (v) {
    var min = num(v.min, -20), max = num(v.max, 20), g = num(v.grader, 0), H = 300, top = 20, bot = 250;
    var Y = function (t) { return bot - (bot - top) * (t - min) / (max - min); };
    var s = M.svg(200, H, 'Termometer som visar ' + tal(g) + ' grader');
    S('rect', { x: 80, y: top - 10, width: 30, height: bot - top + 20, rx: 15, class: 'kontur', fill: 'none' }, s);
    S('rect', { x: 88, y: Y(g), width: 14, height: bot - Y(g) + 10, class: 'saft' }, s);
    S('circle', { cx: 95, cy: bot + 22, r: 22, class: 'saft' }, s);
    for (var t = min; t <= max; t += 5) {
      S('line', { x1: 112, y1: Y(t), x2: 124, y2: Y(t), class: 'linje' }, s);
      txt(s, 130, Y(t) + 6, String(t).replace('-', '−') + '°', t === 0 ? 'mini-text fet' : 'mini-text', 'start');
    }
    s.classList.add('liten-bild');
    return s;
  };

  T.bana = function (v) {
    var b = num(v.b, 6), h = num(v.h, 4), k = 54, s = M.svg(b * k + 20, h * k + 20, 'Rutnät med robot');
    for (var i = 0; i < b; i++) for (var j = 0; j < h; j++) S('rect', { x: 10 + i * k, y: 10 + j * k, width: k, height: k, class: 'del' }, s);
    (v.hinder || []).forEach(function (p) { S('rect', { x: 14 + p[0] * k, y: 14 + p[1] * k, width: k - 8, height: k - 8, class: 'fylld-mork' }, s); });
    if (v.mal) txt(s, 10 + v.mal[0] * k + k / 2, 10 + v.mal[1] * k + k / 2 + 12, '⭐', 'stor-text');
    if (v.start) {
      var rot = { o: 0, s: 90, v: 180, n: 270 }[v.riktning || 'o'];
      var g = S('g', { transform: 'translate(' + (10 + v.start[0] * k + k / 2) + ',' + (10 + v.start[1] * k + k / 2) + ') rotate(' + rot + ')' }, s);
      S('polygon', { points: '-16,-14 18,0 -16,14', class: 'robot' }, g);
    }
    return s;
  };

  T.kvitto = function (v) {
    var d = div('kvitto');
    d.innerHTML = '<div class="kvitto-titel">' + M.esc(v.titel || 'Kvitto') + '</div>' + (v.rader || []).map(function (r) {
      return '<div class="kvitto-rad"><span>' + M.html(String(r[0])) + '</span><span>' + (typeof r[1] === 'number' ? tal(r[1]) + ' kr' : M.html(String(r[1]))) + '</span></div>';
    }).join('') + (v.summa !== undefined ? '<div class="kvitto-rad summa"><span>Summa</span><span>' + (typeof v.summa === 'number' ? tal(v.summa) + ' kr' : M.esc(String(v.summa))) + '</span></div>' : '');
    return d;
  };

  T.cirkelfigur = function (v) {
    var s = M.svg(260, 240, 'Cirkel'), cx = 130, cy = 120, r = 95;
    S('circle', { cx: cx, cy: cy, r: r, class: 'kontur fylld-ljus' }, s);
    S('circle', { cx: cx, cy: cy, r: 4, class: 'prick' }, s);
    if (v.d !== undefined) { S('line', { x1: cx - r, y1: cy, x2: cx + r, y2: cy, class: 'linje' }, s); txt(s, cx, cy - 10, String(v.d), 'liten-text fet'); }
    else { S('line', { x1: cx, y1: cy, x2: cx + r, y2: cy, class: 'linje' }, s); txt(s, cx + r / 2, cy - 10, String(v.r), 'liten-text fet'); }
    s.classList.add('liten-bild');
    return s;
  };

  T.figur = function (v) {
    var s = M.svg(300, 220, v.namn || 'Figur'), p;
    var former = {
      kvadrat: '60,20 220,20 220,180 60,180', rektangel: '30,50 270,50 270,170 30,170', triangel: '150,20 270,190 30,190',
      parallellogram: '80,40 280,40 220,180 20,180', romb: '150,15 260,110 150,205 40,110', parallelltrapets: '90,40 210,40 280,180 20,180',
      femhorning: '150,15 270,95 225,200 75,200 30,95', sexhorning: '90,20 210,20 270,110 210,200 90,200 30,110'
    };
    if (v.form === 'cirkel') S('circle', { cx: 150, cy: 110, r: 95, class: 'kontur fylld-ljus' }, s);
    else S('polygon', { points: former[v.form] || former.kvadrat, class: 'kontur fylld-ljus' }, s);
    s.classList.add('liten-bild');
    return s;
  };

  /* ===================================================================
     INTERAKTIVA VISUALISERINGAR (Förstå)
     Ramverk: tillstånd + reglage med − och +. render(st) ger { bild, text }.
     =================================================================== */
  function interaktiv(def) {
    var st = Object.assign({}, def.start);
    var root = div('interaktiv');
    var reg = div('reglage');
    (def.reglage || []).forEach(function (r) {
      var rad = div('verkstad-rad');
      rad.innerHTML = '<span class="verkstad-lbl">' + M.esc(r.lbl) + '</span>' +
        '<button type="button" class="rund" data-r="' + r.k + '" data-d="-1" aria-label="Minska ' + M.esc(r.lbl) + '">−</button>' +
        '<output class="verkstad-n" data-o="' + r.k + '"></output>' +
        '<button type="button" class="rund" data-r="' + r.k + '" data-d="1" aria-label="Öka ' + M.esc(r.lbl) + '">+</button>';
      reg.appendChild(rad);
    });
    root.appendChild(reg);
    if (def.knappar) { var kn = div('knapp-rad mitt'); kn.innerHTML = def.knappar; root.appendChild(kn); }
    var bild = div('verkstad-bild'), res = div('verkstad-resultat');
    res.setAttribute('aria-live', 'polite');
    root.appendChild(bild); root.appendChild(res);
    function rita() {
      (def.reglage || []).forEach(function (r) { root.querySelector('[data-o="' + r.k + '"]').textContent = r.fmt ? r.fmt(st[r.k]) : tal(st[r.k]); });
      var out = def.render(st, root);
      bild.innerHTML = '';
      if (out.bild) bild.appendChild(out.bild);
      res.innerHTML = out.text || '';
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (b && b.dataset.r) {
        var r = def.reglage.filter(function (x) { return x.k === b.dataset.r; })[0];
        var ny = Math.round((st[r.k] + (+b.dataset.d) * (r.steg || 1)) * 1e6) / 1e6;
        st[r.k] = Math.max(r.min, Math.min(r.max, ny));
        if (def.efter) def.efter(st, r.k);
        rita(); return;
      }
      if (def.klick && def.klick(st, e)) rita();
    });
    root.addEventListener('keydown', function (e) {
      if (def.tangent && def.tangent(st, e)) { e.preventDefault(); rita(); }
    });
    rita();
    return root;
  }
  function H(s) { return M.html(s); }

  T['i-tallinje'] = function (v) {
    var min = num(v.min, -10), max = num(v.max, 10), steg = num(v.steg, 1);
    return interaktiv({
      start: { p: num(v.start, 0) },
      reglage: [{ k: 'p', lbl: 'Pricken står på', min: min, max: max, steg: steg }],
      render: function (st) {
        var t = st.p < 0 ? 'under noll' : st.p > 0 ? 'över noll' : 'precis på noll';
        var extra = v.temperatur ? ' Om det är en termometer är det ' + tal(st.p) + ' grader, ' + t + '.' : '';
        return { bild: T.tallinje2({ min: min, max: max, steg: steg, prick: st.p }), text: 'Talet är <strong>' + tal(st.p) + '</strong>. ' + (st.p < 0 ? 'Det ligger till vänster om noll.' : st.p > 0 ? 'Det ligger till höger om noll.' : '') + extra };
      }
    });
  };

  T['i-position'] = function () {
    var plats = [['tusen', 'Tusental', 1000], ['hundra', 'Hundratal', 100], ['tio', 'Tiotal', 10], ['en', 'Ental', 1], ['tiondel', 'Tiondelar', 0.1], ['hundradel', 'Hundradelar', 0.01]];
    return interaktiv({
      start: { tusen: 0, hundra: 3, tio: 4, en: 7, tiondel: 0, hundradel: 0 },
      reglage: plats.map(function (p) { return { k: p[0], lbl: p[1], min: 0, max: 9 }; }),
      render: function (st) {
        var v = 0, delar = [];
        plats.forEach(function (p) { v += st[p[0]] * p[2]; if (st[p[0]]) delar.push(st[p[0]] + ' · ' + tal(p[2])); });
        v = Math.round(v * 100) / 100;
        return { bild: T.positionstabell({ tal: tal(v).replace('−', '-') }), text: 'Talet är <strong>' + tal(v) + '</strong>' + (delar.length > 1 ? '<br><span class="dampad">' + delar.join(' + ') + '</span>' : '') };
      }
    });
  };

  T['i-grupper'] = function (v) {
    return interaktiv({
      start: { a: 3, b: 4 },
      reglage: [{ k: 'a', lbl: 'Antal rader', min: 1, max: 9 }, { k: 'b', lbl: 'I varje rad', min: 1, max: 10 }],
      render: function (st) {
        return { bild: T.grupper(st), text: st.a + ' rader med ' + st.b + ' i varje: <strong>' + st.a + ' · ' + st.b + ' = ' + st.a * st.b + '</strong><br><span class="dampad">Delat: ' + st.a * st.b + ' / ' + st.a + ' = ' + st.b + '</span>' };
      }
    });
  };

  T['i-hundraruta'] = function (v) {
    var st0 = { f: num(v.start, 25) };
    return interaktiv({
      start: st0,
      reglage: [{ k: 'f', lbl: 'Färgade rutor', min: 0, max: 100, steg: v.steg || 5 }],
      knappar: '<span class="dampad">Du kan också klicka i rutorna.</span>',
      klick: function (st, e) { var r = e.target.closest('[data-i]'); if (!r) return false; var i = +r.getAttribute('data-i') + 1; st.f = st.f === i ? i - 1 : i; return true; },
      render: function (st) {
        var t = v.lage === 'decimal'
          ? '<strong>' + st.f + ' hundradelar = ' + tal(st.f / 100) + '</strong><br><span class="dampad">' + Math.floor(st.f / 10) + ' tiondelar och ' + st.f % 10 + ' hundradelar</span>'
          : '<strong>' + st.f + ' % </strong> = ' + H('[' + st.f + '/100]') + ' = ' + tal(st.f / 100) + '<br><span class="dampad">' + st.f + ' av 100 rutor är färgade.</span>';
        return { bild: T.hundraruta({ fylld: st.f }), text: t };
      }
    });
  };

  T['i-forhallande'] = function () {
    return interaktiv({
      start: { saft: 1, vatten: 4 },
      reglage: [{ k: 'saft', lbl: 'Delar saft', min: 1, max: 6 }, { k: 'vatten', lbl: 'Delar vatten', min: 1, max: 8 }],
      render: function (st) {
        var g = M.sgd(st.saft, st.vatten), enkel = g > 1 ? ' Det är samma blandning som ' + st.saft / g + ':' + st.vatten / g + '.' : '';
        return { bild: T.glas(st), text: 'Förhållandet saft till vatten är <strong>' + st.saft + ':' + st.vatten + '</strong>.' + enkel + '<br><span class="dampad">Saften är ' + H('[' + st.saft + '/' + (st.saft + st.vatten) + ']') + ' av hela glaset.</span>' };
      }
    });
  };

  T['i-overslag'] = function () {
    return interaktiv({
      start: { x: 47 },
      reglage: [{ k: 'x', lbl: 'Talet', min: 0, max: 100 }],
      render: function (st) {
        var ner = Math.floor(st.x / 10) * 10, upp = ner + 10, r = Math.round(st.x / 10) * 10;
        return { bild: T.tallinje2({ min: ner, max: upp === ner ? ner + 10 : upp, steg: 1, prick: st.x, var: 5 }),
          text: tal(st.x) + ' ligger mellan ' + ner + ' och ' + upp + '. Närmast är <strong>' + r + '</strong>.<br><span class="dampad">' + (st.x % 10 === 5 ? 'Siffran 5 avrundas uppåt.' : 'Titta på entalssiffran: 0–4 avrundas nedåt, 5–9 uppåt.') + '</span>' };
      }
    });
  };

  T['i-potens'] = function () {
    return interaktiv({
      start: { b: 2, e: 3 },
      reglage: [{ k: 'b', lbl: 'Bas', min: 1, max: 10 }, { k: 'e', lbl: 'Exponent', min: 0, max: 6 }],
      render: function (st) {
        var v = Math.pow(st.b, st.e), lang = st.e === 0 ? '1 (alla tal upphöjt till 0 blir 1)' : Array(st.e).fill(st.b).join(' · ');
        return { bild: st.e === 2 ? T.grupper({ a: st.b, b: st.b }) : null,
          text: H(st.b + '^' + st.e) + ' = ' + lang + (st.e > 0 ? ' = <strong>' + tal(v) + '</strong>' : '') + '<br><span class="dampad">Basen ' + st.b + ' gångras med sig själv ' + st.e + ' gånger.</span>' };
      }
    });
  };

  T['i-variabel'] = function (v) {
    var a = num(v.a, 3), b = num(v.b, 2);
    return interaktiv({
      start: { x: 1 },
      reglage: [{ k: 'x', lbl: 'x', min: 0, max: 10 }],
      render: function (st) {
        var rader = [['x', 'Uttrycket ' + a + 'x + ' + b, 'Värde']];
        for (var x = Math.max(0, st.x - 2); x <= st.x + 2; x++) rader.push([x === st.x ? '<b>' + x + '</b>' : x, a + ' · ' + x + ' + ' + b, a * x + b]);
        var t = T.tabell({ rader: rader });
        t.innerHTML = t.innerHTML.replace(/&lt;b&gt;/g, '<b>').replace(/&lt;\/b&gt;/g, '</b>');
        return { bild: t, text: 'När x = ' + st.x + ' blir ' + a + 'x + ' + b + ' = ' + a + ' · ' + st.x + ' + ' + b + ' = <strong>' + (a * st.x + b) + '</strong>' };
      }
    });
  };

  T['i-brickor'] = function () {
    return interaktiv({
      start: { x1: 2, e1: 3, x2: 1, e2: 2 },
      reglage: [{ k: 'x1', lbl: 'x-brickor, grupp 1', min: 0, max: 5 }, { k: 'e1', lbl: 'Ettor, grupp 1', min: 0, max: 6 },
        { k: 'x2', lbl: 'x-brickor, grupp 2', min: 0, max: 5 }, { k: 'e2', lbl: 'Ettor, grupp 2', min: 0, max: 6 }],
      render: function (st) {
        var d = div('brickor');
        function grupp(x, e) { var g = div('brick-grupp'); for (var i = 0; i < x; i++) g.appendChild(div('bricka x', 'x')); for (var j = 0; j < e; j++) g.appendChild(div('bricka ett', '1')); return g; }
        d.appendChild(grupp(st.x1, st.e1)); d.appendChild(div('brick-plus', '+')); d.appendChild(grupp(st.x2, st.e2));
        function u(x, e) { return (x ? (x === 1 ? 'x' : x + 'x') : '') + (x && e ? ' + ' : '') + (e ? e : '') || '0'; }
        return { bild: d, text: '(' + u(st.x1, st.e1) + ') + (' + u(st.x2, st.e2) + ') = <strong>' + u(st.x1 + st.x2, st.e1 + st.e2) + '</strong><br><span class="dampad">x-brickor för sig, ettor för sig.</span>' };
      }
    });
  };

  T['i-vag'] = function (v) {
    var a0 = num(v.a, 2), b0 = num(v.b, 3), x = num(v.x, 4);
    return interaktiv({
      start: { a: a0, b: b0, c: a0 * x + b0, steg: 0 },
      knappar: '<button type="button" class="knapp sekundar liten" data-g="minus">Ta bort ettorna på båda sidor</button><button type="button" class="knapp sekundar liten" data-g="dela">Dela båda sidor</button><button type="button" class="knapp sekundar liten" data-g="om">Börja om</button>',
      klick: function (st, e) {
        var b = e.target.closest('[data-g]'); if (!b) return false;
        if (b.dataset.g === 'minus' && st.b) { st.c -= st.b; st.b = 0; }
        else if (b.dataset.g === 'dela' && !st.b && st.a > 1) { st.c /= st.a; st.a = 1; }
        else if (b.dataset.g === 'om') { st.a = a0; st.b = b0; st.c = a0 * x + b0; }
        return true;
      },
      render: function (st) {
        var vans = (st.a === 1 ? 'x' : st.a + 'x') + (st.b ? ' + ' + st.b : '');
        var t = st.a === 1 && !st.b ? '🎉 <strong>x = ' + tal(st.c) + '</strong>. Vågen väger lika, så det stämmer!' :
          st.b ? 'Ta först bort ' + st.b + ' från båda sidor. Då väger vågen fortfarande lika.' : 'Nu finns ' + st.a + 'x på ena sidan. Dela båda sidor med ' + st.a + '.';
        return { bild: T.vag({ vanster: vans, hoger: tal(st.c) }), text: '<strong>' + vans + ' = ' + tal(st.c) + '</strong><br>' + t };
      }
    });
  };

  T['i-monster'] = function (v) {
    var a = num(v.a, 2), b = num(v.b, 1);
    return interaktiv({
      start: { f: 3 },
      reglage: [{ k: 'f', lbl: 'Antal figurer', min: 1, max: 6 }],
      render: function (st) {
        var rader = [['Figur'], ['Antal rutor']];
        for (var k = 1; k <= st.f; k++) { rader[0].push(k); rader[1].push(a * k + b); }
        var wrap = div(''); wrap.appendChild(T.monster({ a: a, b: b, antal: Math.min(st.f, 4) })); wrap.appendChild(T.tabell({ rader: rader }));
        return { bild: wrap, text: 'Varje ny figur får <strong>' + a + '</strong> rutor till. Figur n har ' + a + ' · n + ' + b + ' rutor.' };
      }
    });
  };

  T['i-robot'] = function () {
    var start = { x: 0, y: 3, r: 'o', prog: [] }, mal = [4, 0];
    var dir = { o: [1, 0], s: [0, 1], v: [-1, 0], n: [0, -1] }, vanster = { o: 'n', n: 'v', v: 's', s: 'o' }, hoger = { o: 's', s: 'v', v: 'n', n: 'o' };
    return interaktiv({
      start: { prog: [] },
      knappar: '<button type="button" class="knapp sekundar liten" data-p="F">⬆️ Gå fram</button><button type="button" class="knapp sekundar liten" data-p="V">↩️ Sväng vänster</button><button type="button" class="knapp sekundar liten" data-p="H">↪️ Sväng höger</button><button type="button" class="knapp sekundar liten" data-p="X">Börja om</button>',
      klick: function (st, e) { var b = e.target.closest('[data-p]'); if (!b) return false; if (b.dataset.p === 'X') st.prog = []; else st.prog = st.prog.concat(b.dataset.p); return true; },
      render: function (st) {
        var x = start.x, y = start.y, r = start.r, fel = false;
        st.prog.forEach(function (p) {
          if (p === 'F') { var nx = x + dir[r][0], ny = y + dir[r][1]; if (nx < 0 || ny < 0 || nx > 5 || ny > 3) fel = true; else { x = nx; y = ny; } }
          if (p === 'V') r = vanster[r]; if (p === 'H') r = hoger[r];
        });
        var namn = { F: 'fram', V: 'vänster', H: 'höger' };
        var t = 'Program: ' + (st.prog.length ? st.prog.map(function (p, i) { return (i + 1) + '. ' + namn[p]; }).join(', ') : '(tomt)') +
          (x === mal[0] && y === mal[1] ? '<br>🎉 <strong>Roboten nådde stjärnan!</strong>' : fel ? '<br>Roboten kan inte gå utanför rutnätet.' : '<br><span class="dampad">Hjälp roboten till stjärnan.</span>');
        return { bild: T.bana({ b: 6, h: 4, start: [x, y], riktning: r, mal: mal }), text: t };
      }
    });
  };

  T['i-figurer'] = function () {
    var lista = [
      ['kvadrat', 'Kvadrat', '4 lika långa sidor och 4 räta vinklar.'], ['rektangel', 'Rektangel', '4 sidor och 4 räta vinklar. Motstående sidor är lika långa.'],
      ['triangel', 'Triangel', '3 sidor och 3 hörn. Vinklarna är tillsammans 180°.'], ['parallellogram', 'Parallellogram', 'Två par parallella sidor.'],
      ['romb', 'Romb', '4 lika långa sidor, men vinklarna behöver inte vara räta.'], ['parallelltrapets', 'Parallelltrapets', 'Ett par parallella sidor.'],
      ['femhorning', 'Femhörning', '5 sidor och 5 hörn.'], ['sexhorning', 'Sexhörning', '6 sidor och 6 hörn.'], ['cirkel', 'Cirkel', 'Alla punkter på kanten är lika långt från mittpunkten.']
    ];
    return interaktiv({
      start: { i: 0 },
      reglage: [{ k: 'i', lbl: 'Byt figur', min: 0, max: lista.length - 1, fmt: function (i) { return lista[i][1]; } }],
      render: function (st) { var f = lista[st.i]; return { bild: T.figur({ form: f[0] }), text: '<strong>' + f[1] + '</strong>: ' + f[2] }; }
    });
  };

  T['i-rektangel'] = function (v) {
    return interaktiv({
      start: { b: 5, h: 3 },
      reglage: [{ k: 'b', lbl: 'Basen', min: 1, max: 12 }, { k: 'h', lbl: 'Höjden', min: 1, max: 8 }],
      render: function (st) {
        var omk = 2 * st.b + 2 * st.h, area = st.b * st.h;
        var t = v.lage === 'omkrets'
          ? 'Omkrets = ' + st.b + ' + ' + st.h + ' + ' + st.b + ' + ' + st.h + ' = <strong>' + omk + ' cm</strong><br><span class="dampad">Gå runt hela figuren och lägg ihop alla sidor.</span>'
          : 'Area = ' + st.b + ' · ' + st.h + ' = <strong>' + area + ' cm²</strong><br><span class="dampad">Räkna rutorna: ' + st.h + ' rader med ' + st.b + ' rutor i varje.</span>';
        return { bild: T.rektangel({ b: st.b, h: st.h, enhet: 'cm', rutor: true }), text: t };
      }
    });
  };

  T['i-kub'] = function () {
    return interaktiv({
      start: { l: 4, b: 3, h: 2 },
      reglage: [{ k: 'l', lbl: 'Längd', min: 1, max: 8 }, { k: 'b', lbl: 'Bredd', min: 1, max: 6 }, { k: 'h', lbl: 'Höjd', min: 1, max: 6 }],
      render: function (st) {
        return { bild: T.kub({ l: st.l, b: st.b, h: st.h, enhet: 'cm' }), text: 'Volym = ' + st.l + ' · ' + st.b + ' · ' + st.h + ' = <strong>' + st.l * st.b * st.h + ' cm³</strong><br><span class="dampad">Det får plats ' + st.l * st.b * st.h + ' små kuber som är 1 cm på varje sida.</span>' };
      }
    });
  };

  T['i-enheter'] = function () {
    var enh = ['km', 'm', 'dm', 'cm', 'mm'], fak = [1000, 1, 0.1, 0.01, 0.001];
    return interaktiv({
      start: { v: 3, e: 1 },
      reglage: [{ k: 'v', lbl: 'Värde', min: 1, max: 20 }, { k: 'e', lbl: 'Enhet', min: 0, max: 4, fmt: function (i) { return enh[i]; } }],
      render: function (st) {
        var m = st.v * fak[st.e];
        var rader = [['Enhet'].concat(enh), ['Värde'].concat(fak.map(function (f) { return Math.round(m / f * 1e6) / 1e6; }))];
        return { bild: T.tabell({ rader: rader }), text: '<strong>' + st.v + ' ' + enh[st.e] + '</strong> i alla enheter. Ett steg åt höger i tabellen (m → dm → cm → mm) betyder · 10. Från km till m är det · 1000.' };
      }
    });
  };

  T['i-skala'] = function () {
    var skalor = [100, 1000, 10000, 50000, 100000];
    return interaktiv({
      start: { cm: 4, s: 2 },
      reglage: [{ k: 'cm', lbl: 'På kartan (cm)', min: 1, max: 15 }, { k: 's', lbl: 'Skala', min: 0, max: 4, fmt: function (i) { return '1:' + skalor[i].toLocaleString('sv-SE'); } }],
      render: function (st) {
        var verkligCm = st.cm * skalor[st.s], m = verkligCm / 100;
        return { bild: T.tallinje2({ min: 0, max: Math.max(st.cm, 5), steg: 1, prick: st.cm, etiketter: true }),
          text: 'Skala 1:' + skalor[st.s].toLocaleString('sv-SE') + ' betyder att 1 cm på kartan är ' + skalor[st.s].toLocaleString('sv-SE') + ' cm i verkligheten.<br>' + st.cm + ' cm på kartan = <strong>' + (m >= 1000 ? tal(m / 1000) + ' km' : tal(m) + ' m') + '</strong> i verkligheten.' };
      }
    });
  };

  T['i-vinkel'] = function () {
    return interaktiv({
      start: { g: 60 },
      reglage: [{ k: 'g', lbl: 'Grader', min: 10, max: 180, steg: 10 }],
      render: function (st) {
        var typ = st.g < 90 ? 'spetsig vinkel (mindre än 90°)' : st.g === 90 ? 'rät vinkel (precis 90°)' : st.g < 180 ? 'trubbig vinkel (mellan 90° och 180°)' : 'rak vinkel (180°, en rak linje)';
        return { bild: T.vinkel({ grader: st.g }), text: '<strong>' + st.g + '°</strong> är en ' + typ + '.' };
      }
    });
  };

  T['i-pythagoras'] = function () {
    return interaktiv({
      start: { a: 3, b: 4 },
      reglage: [{ k: 'a', lbl: 'Kateten a', min: 1, max: 12 }, { k: 'b', lbl: 'Kateten b', min: 1, max: 12 }],
      render: function (st) {
        var c2 = st.a * st.a + st.b * st.b, c = Math.sqrt(c2), hel = Math.abs(c - Math.round(c)) < 1e-9;
        return { bild: T.triangel({ a: st.a, b: st.b, lc: 'c' }),
          text: H('a^2 + b^2 = c^2') + '<br>' + H(st.a + '^2 + ' + st.b + '^2') + ' = ' + st.a * st.a + ' + ' + st.b * st.b + ' = ' + c2 + '<br>c = √' + c2 + ' ' + (hel ? '= ' : '≈ ') + '<strong>' + tal(Math.round(c * 10) / 10) + '</strong>' };
      }
    });
  };

  function lagesmatt(d) {
    var s = d.slice().sort(function (a, b) { return a - b; }), n = s.length;
    var med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
    var medel = d.reduce(function (a, b) { return a + b; }, 0) / n;
    var cnt = {}, best = [], max = 0;
    d.forEach(function (x) { cnt[x] = (cnt[x] || 0) + 1; });
    Object.keys(cnt).forEach(function (k) { if (cnt[k] > max) { max = cnt[k]; best = [+k]; } else if (cnt[k] === max) best.push(+k); });
    return { sorterat: s, median: med, medel: medel, typ: max > 1 && best.length < n ? best : null };
  }
  M.lagesmatt = lagesmatt;
  T['i-staplar'] = function (v) {
    var lbl = v.etiketter || ['Mån', 'Tis', 'Ons', 'Tor', 'Fre'];
    var start = {}; (v.data || [3, 5, 2, 5, 4]).forEach(function (x, i) { start['d' + i] = x; });
    return interaktiv({
      start: start,
      reglage: lbl.map(function (l, i) { return { k: 'd' + i, lbl: l, min: 0, max: 10 }; }),
      render: function (st) {
        var d = lbl.map(function (_, i) { return st['d' + i]; }), lm = lagesmatt(d);
        var t = v.lage === 'tabell' ? 'Det största värdet är <strong>' + Math.max.apply(null, d) + '</strong> och det minsta är <strong>' + Math.min.apply(null, d) + '</strong>. Tillsammans: ' + d.reduce(function (a, b) { return a + b; }, 0) + '.'
          : 'Medelvärde: (' + d.join(' + ') + ') / ' + d.length + ' = <strong>' + tal(Math.round(lm.medel * 100) / 100) + '</strong><br>Median (mitten när de är sorterade: ' + lm.sorterat.join(', ') + '): <strong>' + tal(lm.median) + '</strong><br>Typvärde (vanligast): <strong>' + (lm.typ ? lm.typ.join(' och ') : 'inget') + '</strong>';
        return { bild: T.staplar({ data: d, etiketter: lbl, max: 10 }), text: t };
      }
    });
  };

  T['i-sannolikhet'] = function () {
    return interaktiv({
      start: { roda: 3, bla: 5, drag: 0, rodaDrag: 0 },
      reglage: [{ k: 'roda', lbl: 'Röda kulor', min: 0, max: 10 }, { k: 'bla', lbl: 'Blå kulor', min: 0, max: 10 }],
      knappar: '<button type="button" class="knapp sekundar liten" data-s="1">Dra 1 kula</button><button type="button" class="knapp sekundar liten" data-s="50">Dra 50 gånger</button>',
      efter: function (st) { st.drag = 0; st.rodaDrag = 0; },
      klick: function (st, e) {
        var b = e.target.closest('[data-s]'); if (!b || st.roda + st.bla === 0) return false;
        for (var i = 0; i < +b.dataset.s; i++) { st.drag++; if (Math.random() < st.roda / (st.roda + st.bla)) st.rodaDrag++; }
        return true;
      },
      render: function (st) {
        var tot = st.roda + st.bla;
        var t = tot ? 'Chansen att dra en röd kula är ' + H('[' + st.roda + '/' + tot + ']') + ' ≈ <strong>' + Math.round(100 * st.roda / tot) + ' %</strong>' : 'Påsen är tom.';
        if (st.drag) t += '<br><span class="dampad">Du har dragit ' + st.drag + ' gånger (och lagt tillbaka kulan). Röd: ' + st.rodaDrag + ' gånger ≈ ' + Math.round(100 * st.rodaDrag / st.drag) + ' %.</span>';
        return { bild: T.kulor(st), text: t };
      }
    });
  };

  T['i-proportion'] = function (v) {
    var pris = num(v.pris, 30), enhet = v.enhet || 'kg';
    return interaktiv({
      start: { m: 2 },
      reglage: [{ k: 'm', lbl: 'Antal ' + enhet, min: 0, max: 10 }],
      render: function (st) {
        return { bild: T.tabell({ rader: [[enhet, 0, 1, 2, 3, 4, 5], ['kr', 0, pris, 2 * pris, 3 * pris, 4 * pris, 5 * pris]] }),
          text: st.m + ' ' + enhet + ' kostar ' + st.m + ' · ' + pris + ' = <strong>' + st.m * pris + ' kr</strong>.<br><span class="dampad">Dubbelt så mycket kostar dubbelt så mycket. Det kallas proportionalitet.</span>' };
      }
    });
  };

  T['i-procentforandring'] = function () {
    return interaktiv({
      start: { pris: 200, p: 20, upp: 0 },
      reglage: [{ k: 'pris', lbl: 'Pris från början (kr)', min: 100, max: 1000, steg: 100 }, { k: 'p', lbl: 'Procent', min: 5, max: 50, steg: 5 },
        { k: 'upp', lbl: 'Höjning eller sänkning', min: 0, max: 1, fmt: function (u) { return u ? 'Höjning' : 'Sänkning'; } }],
      render: function (st) {
        var dl = st.pris * st.p / 100, ny = st.upp ? st.pris + dl : st.pris - dl;
        return { bild: T.staplar({ data: [st.pris, ny], etiketter: ['Före', 'Efter'], max: 1500 }),
          text: st.p + ' % av ' + st.pris + ' kr = ' + tal(dl) + ' kr.<br>Nytt pris: ' + st.pris + (st.upp ? ' + ' : ' − ') + tal(dl) + ' = <strong>' + tal(ny) + ' kr</strong><br><span class="dampad">Snabbare: ' + st.pris + ' · ' + tal(st.upp ? 1 + st.p / 100 : 1 - st.p / 100) + ' = ' + tal(ny) + '</span>' };
      }
    });
  };

  T['i-koordinat'] = function () {
    return interaktiv({
      start: { x: 2, y: 3 },
      reglage: [{ k: 'x', lbl: 'x (åt sidan)', min: -5, max: 5 }, { k: 'y', lbl: 'y (upp eller ner)', min: -5, max: 5 }],
      render: function (st) {
        return { bild: koordSvg({ punkter: [[st.x, st.y, 'P']] }), text: 'Punkten P har koordinaterna <strong>(' + tal(st.x) + '; ' + tal(st.y) + ')</strong>.<br><span class="dampad">Gå först ' + Math.abs(st.x) + ' steg ' + (st.x < 0 ? 'åt vänster' : 'åt höger') + ', sedan ' + Math.abs(st.y) + ' steg ' + (st.y < 0 ? 'nedåt' : 'uppåt') + '.</span>' };
      }
    });
  };

  T['i-funktion'] = function () {
    return interaktiv({
      start: { k: 2, m: 1 },
      reglage: [{ k: 'k', lbl: 'k (lutning)', min: -3, max: 3 }, { k: 'm', lbl: 'm (startvärde)', min: -4, max: 4 }],
      render: function (st) {
        var rader = [['x', 0, 1, 2, 3], ['y'].concat([0, 1, 2, 3].map(function (x) { return st.k * x + st.m; }))];
        var w = div(''); w.appendChild(koordSvg({ linjer: [{ k: st.k, m: st.m }], punkter: [[0, st.m, '']] })); w.appendChild(T.tabell({ rader: rader }));
        return { bild: w, text: '<strong>y = ' + (st.k === 0 ? '' : (st.k === 1 ? '' : st.k === -1 ? '−' : tal(st.k)) + 'x') + (st.m ? (st.k ? (st.m > 0 ? ' + ' : ' − ') : (st.m < 0 ? '−' : '')) + Math.abs(st.m) : (st.k ? '' : '0')) + '</strong><br><span class="dampad">Linjen skär y-axeln vid ' + tal(st.m) + '. För varje steg åt höger går den ' + (st.k >= 0 ? 'upp ' : 'ner ') + Math.abs(st.k) + ' steg.</span>' };
      }
    });
  };

  T['i-kvitto'] = function () {
    var varor = [['Mjölk', 18], ['Bröd', 32], ['Äpplen', 25], ['Ost', 79]];
    return interaktiv({
      start: { a: 1, b: 1, c: 0, d: 0, betalar: 1 },
      reglage: varor.map(function (vv, i) { return { k: 'abcd'[i], lbl: vv[0] + ' (' + vv[1] + ' kr)', min: 0, max: 5 }; }).concat([{ k: 'betalar', lbl: 'Du betalar med', min: 0, max: 2, fmt: function (i) { return [100, 200, 500][i] + ' kr'; } }]),
      render: function (st) {
        var rader = [], sum = 0;
        varor.forEach(function (vv, i) { var n = st['abcd'[i]]; if (n) { rader.push([n + ' st ' + vv[0], n * vv[1]]); sum += n * vv[1]; } });
        var bet = [100, 200, 500][st.betalar];
        return { bild: T.kvitto({ rader: rader, summa: sum }), text: 'Summa: <strong>' + sum + ' kr</strong>. ' + (bet >= sum ? 'Du betalar ' + bet + ' kr och får tillbaka ' + bet + ' − ' + sum + ' = <strong>' + (bet - sum) + ' kr</strong>.' : 'Det räcker inte med ' + bet + ' kr.') };
      }
    });
  };

  T['i-recept'] = function () {
    var bas = [['Mjölk', 6, 'dl'], ['Vetemjöl', 3, 'dl'], ['Ägg', 3, 'st'], ['Smör', 30, 'g']];
    return interaktiv({
      start: { p: 4 },
      reglage: [{ k: 'p', lbl: 'Antal portioner', min: 1, max: 12 }],
      render: function (st) {
        var f = st.p / 4;
        return { bild: T.tabell({ rader: [['Pannkakor', '4 portioner', st.p + ' portioner']].concat(bas.map(function (r) { return [r[0], r[1] + ' ' + r[2], tal(Math.round(r[1] * f * 100) / 100) + ' ' + r[2]]; })) }),
          text: 'Receptet är för 4 portioner. För ' + st.p + ' portioner gångrar du allt med ' + st.p + ' / 4 = <strong>' + tal(f) + '</strong>.' };
      }
    });
  };

  T['i-lon'] = function () {
    return interaktiv({
      start: { t: 10, l: 120 },
      reglage: [{ k: 't', lbl: 'Timmar', min: 1, max: 40 }, { k: 'l', lbl: 'Timlön (kr)', min: 100, max: 200, steg: 10 }],
      render: function (st) {
        var lon = st.t * st.l;
        return { bild: T.staplar({ data: [lon], etiketter: ['Lön före skatt'], max: 8000 }), text: st.t + ' timmar · ' + st.l + ' kr = <strong>' + lon + ' kr</strong> före skatt.<br><span class="dampad">Med ungefär 30 % skatt blir det cirka ' + Math.round(lon * 0.7) + ' kr kvar.</span>' };
      }
    });
  };

  T['i-resa'] = function () {
    return interaktiv({
      start: { v: 60, t: 2 },
      reglage: [{ k: 'v', lbl: 'Hastighet (km/h)', min: 10, max: 120, steg: 10 }, { k: 't', lbl: 'Tid (timmar)', min: 0.5, max: 5, steg: 0.5 }],
      render: function (st) {
        return { bild: T.tallinje2({ min: 0, max: 600, steg: 50, var: 2, prick: st.v * st.t }), text: 'Sträcka = hastighet · tid = ' + st.v + ' · ' + tal(st.t) + ' = <strong>' + tal(st.v * st.t) + ' km</strong><br><span class="dampad">' + st.v + ' km/h betyder ' + st.v + ' km varje timme.</span>' };
      }
    });
  };

  T['i-abonnemang'] = function () {
    return interaktiv({
      start: { gb: 5 },
      reglage: [{ k: 'gb', lbl: 'Surf per månad (GB)', min: 0, max: 20 }],
      render: function (st) {
        var a = 99 + 10 * st.gb, b = 249;
        return { bild: T.staplar({ data: [a, b], etiketter: ['Bas: 99 kr + 10 kr/GB', 'Fri surf: 249 kr'], max: 400 }),
          text: 'Bas: 99 + 10 · ' + st.gb + ' = ' + a + ' kr. Fri surf: 249 kr.<br><strong>' + (a < b ? 'Bas är billigast' : a > b ? 'Fri surf är billigast' : 'De kostar lika mycket') + '</strong> när du surfar ' + st.gb + ' GB.' };
      }
    });
  };

  T['i-textmodell'] = function (v) {
    var steg = v.steg || [];
    return interaktiv({
      start: { i: 0 },
      reglage: [{ k: 'i', lbl: 'Steg', min: 0, max: steg.length - 1, fmt: function (i) { return (i + 1) + ' av ' + steg.length; } }],
      render: function (st) {
        var d = div('uppgift-box'); d.innerHTML = M.html(v.text || '');
        if (steg[st.i] && steg[st.i].markera) steg[st.i].markera.forEach(function (m) { d.innerHTML = d.innerHTML.split(M.esc(m)).join('<mark>' + M.esc(m) + '</mark>'); });
        return { bild: d, text: steg[st.i] ? M.html(steg[st.i].text) : '' };
      }
    });
  };
})();
