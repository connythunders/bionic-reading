/* Motor: uttryck, slumpade uppgifter och rättning. Ingen DOM här. */
(function () {
  'use strict';
  var M = window.MATTE = window.MATTE || {};

  /* ================= Uttryck =================
     Stöder + - * / % ^ ( ), jämförelser, && || , a ? b : c
     och funktionerna sgd, min, max, abs, avrunda. */
  function tokenize(src) {
    var toks = [], i = 0, s = String(src);
    while (i < s.length) {
      var c = s[i];
      if (/\s/.test(c)) { i++; continue; }
      var m = s.slice(i).match(/^(\d+(\.\d+)?|\.\d+)/);
      if (m) { toks.push({ t: 'num', v: parseFloat(m[0]) }); i += m[0].length; continue; }
      m = s.slice(i).match(/^[A-Za-zÅÄÖåäö_]\w*/);
      if (m) { toks.push({ t: 'id', v: m[0] }); i += m[0].length; continue; }
      m = s.slice(i).match(/^(==|!=|<=|>=|&&|\|\||[-+*\/%^()<>?:,])/);
      if (m) { toks.push({ t: 'op', v: m[0] }); i += m[0].length; continue; }
      throw new Error('Okänt tecken: ' + c);
    }
    return toks;
  }
  function sgd(a, b) { a = Math.abs(Math.round(a)); b = Math.abs(Math.round(b)); while (b) { var t = b; b = a % b; a = t; } return a || 1; }
  var FUNKS = {
    sgd: sgd, min: Math.min, max: Math.max, abs: Math.abs, rot: Math.sqrt, golv: Math.floor, tak: Math.ceil,
    avrunda: function (x, d) { var f = Math.pow(10, d || 0); return Math.round((x + 1e-9 * Math.sign(x)) * f) / f; }
  };
  function evaluate(src, vars) {
    var toks = tokenize(src), p = 0;
    function peek(v) { return toks[p] && toks[p].t === 'op' && toks[p].v === v; }
    function eat(v) { if (!peek(v)) throw new Error('Väntade ' + v + ' i ' + src); p++; }
    function ternary() { var c = or(); if (peek('?')) { p++; var a = ternary(); eat(':'); var b = ternary(); return c ? a : b; } return c; }
    function or() { var v = and(); while (peek('||')) { p++; var r = and(); v = v || r; } return v; }
    function and() { var v = cmp(); while (peek('&&')) { p++; var r = cmp(); v = v && r; } return v; }
    function cmp() {
      var v = add(), ops = ['==', '!=', '<=', '>=', '<', '>'];
      for (var k = 0; k < ops.length; k++) if (peek(ops[k])) {
        p++; var r = add();
        switch (ops[k]) { case '==': return Math.abs(v - r) < 1e-9; case '!=': return Math.abs(v - r) >= 1e-9; case '<=': return v <= r; case '>=': return v >= r; case '<': return v < r; default: return v > r; }
      }
      return v;
    }
    function add() { var v = mul(); while (peek('+') || peek('-')) { var o = toks[p++].v, r = mul(); v = o === '+' ? v + r : v - r; } return v; }
    function mul() { var v = unary(); while (peek('*') || peek('/') || peek('%')) { var o = toks[p++].v, r = unary(); v = o === '*' ? v * r : o === '/' ? v / r : v % r; } return v; }
    function unary() { if (peek('-')) { p++; return -unary(); } if (peek('+')) { p++; return unary(); } return pow(); }
    function pow() { var v = prim(); if (peek('^')) { p++; return Math.pow(v, unary()); } return v; }
    function prim() {
      var tk = toks[p];
      if (!tk) throw new Error('Uttrycket tog slut: ' + src);
      if (tk.t === 'num') { p++; return tk.v; }
      if (tk.t === 'id') {
        p++;
        if (peek('(')) {
          p++; var args = [];
          if (!peek(')')) { args.push(ternary()); while (peek(',')) { p++; args.push(ternary()); } }
          eat(')');
          if (!FUNKS[tk.v]) throw new Error('Okänd funktion: ' + tk.v);
          return FUNKS[tk.v].apply(null, args);
        }
        if (tk.v === 'pi' && !(vars && 'pi' in vars)) return Math.PI;
        if (!vars || !(tk.v in vars)) throw new Error('Okänd variabel: ' + tk.v);
        var v = vars[tk.v];
        return typeof v === 'number' ? v : parseFloat(v);
      }
      if (peek('(')) { p++; var e = ternary(); eat(')'); return e; }
      throw new Error('Oväntat: ' + tk.v + ' i ' + src);
    }
    var res = ternary();
    if (p < toks.length) throw new Error('Rester kvar i uttrycket: ' + src);
    if (typeof res === 'boolean') return res;
    return Math.round(res * 1e10) / 1e10;
  }
  M.evaluate = evaluate;
  M.sgd = sgd;

  /* ================= Format ================= */
  function talText(x) {
    if (typeof x !== 'number' || !isFinite(x)) return String(x);
    var r = Math.round(x * 1e10) / 1e10;
    return String(r).replace('.', ',').replace('-', '−');
  }
  M.talText = talText;

  // Byter {namn} och {=uttryck}. dec = '.' ger punkt som decimaltecken (för svar som ska räknas).
  function fyll(mall, vars, dec) {
    if (mall === undefined || mall === null) return mall;
    if (typeof mall === 'number') return mall;
    return String(mall).replace(/\{=([^}]+)\}/g, function (_, e) {
      var v = evaluate(e, vars);
      return dec === '.' ? String(v) : talText(v);
    }).replace(/\{(\w+)\}/g, function (all, k) {
      if (!(k in vars)) return all;
      var v = vars[k];
      return typeof v === 'number' ? (dec === '.' ? String(v) : talText(v)) : v;
    });
  }
  M.fyll = fyll;

  /* ================= Generera uppgift ================= */
  function slump(lo, hi) { return lo + Math.floor(Math.random() * (hi - lo + 1)); }
  function blanda(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  M.blanda = blanda;

  function varde(x, vars) { return typeof x === 'number' ? x : evaluate(x, vars); }

  // Villkor som "p % 100 == 0" blir steglängd för p, så att bara sådana tal slumpas.
  function stegFranVillkor(mall) {
    var steg = {}, re = /(^|[^\w])([A-Za-z_]\w*)\s*%\s*(\d+)\s*==\s*0/g, m;
    while (mall.villkor && (m = re.exec(mall.villkor))) {
      var spec = mall.var && mall.var[m[2]];
      if (Array.isArray(spec) && spec.length === 2) steg[m[2]] = +m[3];
    }
    return steg;
  }

  function genVars(mall) {
    var autoSteg = stegFranVillkor(mall);
    for (var forsok = 0; forsok < 500; forsok++) {
      var vars = {}, fall = null, ok = true;
      if (mall.fall && mall.fall.length) {
        fall = mall.fall[Math.floor(Math.random() * mall.fall.length)];
        Object.keys(fall).forEach(function (k) { if (k !== 'svar') vars[k] = fall[k]; });
      }
      var spec = mall.var || {};
      var keys = Object.keys(spec);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i], s = spec[k];
        if (Array.isArray(s)) {
          // [min, max] eller [min, max, steg], t.ex. [100, 900, 50] ger 100, 150, 200 …
          var steg = s.length > 2 ? varde(s[2], vars) : (autoSteg[k] || 1);
          var lo = Math.ceil(varde(s[0], vars) / steg) * steg, hi = Math.floor(varde(s[1], vars) / steg) * steg;
          if (hi < lo) { ok = false; break; }
          vars[k] = Math.round((lo + steg * slump(0, Math.round((hi - lo) / steg))) * 1e9) / 1e9;
        } else if (s && s.bland) {
          vars[k] = varde(s.bland[Math.floor(Math.random() * s.bland.length)], vars);
        } else if (s && s.ber !== undefined) {
          vars[k] = varde(s.ber, vars);
        } else {
          vars[k] = s;
        }
      }
      if (!ok) continue;
      if (mall.villkor && !evaluate(mall.villkor, vars)) continue;
      return { vars: vars, fall: fall };
    }
    throw new Error('Kunde inte slumpa tal till ' + mall.id + '. Kolla var och villkor.');
  }

  function brakFran(s) {
    var m = String(s).match(/^\s*(-?[\d.]+)\s*\/\s*(-?[\d.]+)\s*$/);
    if (!m) throw new Error('Inte ett bråk: ' + s);
    return { t: parseFloat(m[1]), n: parseFloat(m[2]) };
  }

  // Fyller i värden i en bild-beskrivning. Tal blir tal, text blir text, listor fylls i element för element.
  function fyllVis(v, vars) {
    if (Array.isArray(v)) return v.map(function (x) { return fyllVis(x, vars); });
    if (v && typeof v === 'object') { var o = {}; Object.keys(v).forEach(function (k) { o[k] = fyllVis(v[k], vars); }); return o; }
    if (typeof v !== 'string') return v;
    var f = fyll(v, vars, '.');
    return /^\s*-?(\d+\.?\d*|\.\d+)\s*$/.test(f) ? parseFloat(f) : fyll(v, vars);
  }
  function mkVars(namn, x) { var o = {}; o[namn] = x; return o; }

  function skapaUppgift(mall) {
    var g = genVars(mall), vars = g.vars;
    var svarMall = (g.fall && g.fall.svar) || mall.svar;
    var svar = { typ: svarMall.typ, enhet: svarMall.enhet || '' };
    var rattText;
    if (svar.typ === 'brak') {
      var b = brakFran(fyll(svarMall.varde, vars, '.'));
      svar.t = b.t; svar.n = b.n; svar.forkortat = !!svarMall.forkortat; svar.exaktNamnare = !!svarMall.exaktNamnare;
      rattText = '[' + b.t + '/' + b.n + ']';
    } else if (svar.typ === 'tal') {
      svar.varde = parseFloat(fyll(svarMall.varde, vars, '.'));
      rattText = talText(svar.varde) + (svar.enhet ? ' ' + svar.enhet : '');
      svar.tolerans = svarMall.tolerans ? parseFloat(fyll(String(svarMall.tolerans), vars, '.')) : 0;
    } else if (svar.typ === 'val') {
      var alt = svarMall.alternativ.map(function (a) { return fyll(a, vars); });
      var ratt = parseInt(fyll(String(svarMall.ratt), vars, '.'), 10);
      var ordning = svarMall.fast ? alt.map(function (_, i) { return i; }) : blanda(alt.map(function (_, i) { return i; }));
      svar.alternativ = ordning.map(function (i) { return { text: alt[i], orig: i }; });
      svar.ratt = ratt;
      rattText = alt[ratt];
    } else if (svar.typ === 'uttryck') {
      svar.varde = fyll(svarMall.varde, vars, '.');
      svar.variabel = svarMall.variabel || 'x';
      rattText = fyll(svarMall.visa || svarMall.varde, vars);
      evaluate(svar.varde, mkVars(svar.variabel, 1)); // kontroll att facit går att räkna
    } else if (svar.typ === 'par') {
      svar.a = parseFloat(fyll(svarMall.a, vars, '.'));
      svar.b = parseFloat(fyll(svarMall.b, vars, '.'));
      svar.etiketter = svarMall.etiketter || ['x', 'y'];
      rattText = '(' + talText(svar.a) + '; ' + talText(svar.b) + ')';
    } else {
      throw new Error('Okänd svarstyp i ' + mall.id);
    }
    var allaVars = Object.assign({}, vars, { rattText: rattText });
    var vis = null;
    if (mall.vis) {
      vis = {};
      Object.keys(mall.vis).forEach(function (k) { vis[k] = k === 'typ' ? mall.vis[k] : fyllVis(mall.vis[k], vars); });
    }
    return {
      id: mall.id, niva: mall.niva, vars: allaVars,
      text: fyll(mall.text, allaVars),
      vis: vis, svar: svar, rattText: rattText,
      ledtradar: (mall.ledtradar || []).map(function (s) { return fyll(s, allaVars); }),
      losning: (mall.losning || []).map(function (s) { return fyll(s, allaVars); }),
      vanligaFel: (mall.vanligaFel || []).map(function (f) {
        return f.val !== undefined ? { val: f.val, text: fyll(f.text, allaVars) } : { svar: fyll(f.svar, allaVars, '.'), text: fyll(f.text, allaVars) };
      })
    };
  }
  M.skapaUppgift = skapaUppgift;

  /* ================= Rättning =================
     Returnerar { ratt: true } eller
     { ratt: false, mjuk: true, text } (räknas inte som fel – t.ex. "förkorta mer") eller
     { ratt: false, text } (strategi-tips) */
  function lasTal(s) {
    var str = String(s || '').trim().replace(/\s+/g, '').replace('−', '-').replace(',', '.').replace(/[a-zåäö%]+$/i, '');
    if (!/^-?(\d+\.?\d*|\.\d+)$/.test(str)) return NaN;
    return parseFloat(str);
  }
  M.lasTal = lasTal;

  // Tolkar elevens uttryck, t.ex. "3x+2", "2(x+1)", "x·4". Returnerar en funktion av variabeln eller null.
  function tolkaUttryck(str, v) {
    var s = String(str || '').toLowerCase().replace(/\s+/g, '').replace(/−/g, '-').replace(/[·×]/g, '*').replace(/,/g, '.')
      .replace(/^[a-zåäö]=/, ''); // "y = 2x + 1" godkänns också
    if (!s || !new RegExp('^[0-9.+\\-*/()^' + v + ']+$').test(s)) return null;
    s = s.replace(new RegExp('(\\d)(' + v + '|\\()', 'g'), '$1*$2')
         .replace(new RegExp('(' + v + '|\\))(\\d|' + v + '|\\()', 'g'), '$1*$2')
         .replace(new RegExp('(' + v + '|\\))(\\d|' + v + '|\\()', 'g'), '$1*$2');
    try { evaluate(s, mkVars(v, 1)); } catch (e) { return null; }
    return function (x) { return evaluate(s, mkVars(v, x)); };
  }
  M.tolkaUttryck = tolkaUttryck;

  function lika(a, b) { return Math.abs(a - b) < 1e-9 * Math.max(1, Math.abs(b)); }

  function ratta(u, input) {
    var s = u.svar, i;
    if (s.typ === 'val') {
      var valt = s.alternativ[input];
      if (!valt) return { ratt: false, mjuk: true, text: 'Välj ett av svaren.' };
      if (valt.orig === s.ratt) return { ratt: true };
      for (i = 0; i < u.vanligaFel.length; i++) if (u.vanligaFel[i].val === valt.orig) return { ratt: false, text: u.vanligaFel[i].text };
      return { ratt: false, text: 'Läs frågan en gång till och tänk på vad som skiljer svaren åt.' };
    }

    if (s.typ === 'tal') {
      var x = lasTal(input);
      if (isNaN(x)) return { ratt: false, mjuk: true, text: 'Skriv bara ett tal, till exempel 15 eller 0,5.' };
      if (lika(x, s.varde)) return { ratt: true };
      if (s.tolerans && Math.abs(x - s.varde) <= s.tolerans + 1e-9) return { ratt: true };
      for (i = 0; i < u.vanligaFel.length; i++) {
        var f = u.vanligaFel[i];
        if (f.svar !== undefined && !isNaN(parseFloat(f.svar)) && lika(x, parseFloat(f.svar))) return { ratt: false, text: f.text };
      }
      if (s.varde !== 0 && (lika(x, s.varde * 10) || lika(x, s.varde / 10) || lika(x, s.varde * 100) || lika(x, s.varde / 100)))
        return { ratt: false, text: 'Siffrorna ser rätt ut, men kolla var decimaltecknet ska stå.' };
      if (lika(x, -s.varde)) return { ratt: false, text: 'Talet stämmer, men kolla om det ska vara plus eller minus.' };
      if (s.varde !== 0 && Math.abs(x - s.varde) / Math.abs(s.varde) <= 0.1) return { ratt: false, text: 'Du är nära! Räkna en gång till, steg för steg.' };
      return { ratt: false, text: 'Tänk på vilket räknesätt som passar, och testa om svaret är rimligt.' };
    }

    if (s.typ === 'par') {
      var pa = lasTal(input && input.a), pb = lasTal(input && input.b);
      if (isNaN(pa) || isNaN(pb)) return { ratt: false, mjuk: true, text: 'Skriv ett tal i varje ruta.' };
      if (lika(pa, s.a) && lika(pb, s.b)) return { ratt: true };
      if (lika(pa, s.b) && lika(pb, s.a)) return { ratt: false, text: 'Du har bytt plats på talen. ' + s.etiketter[0] + ' kommer först, sedan ' + s.etiketter[1] + '.' };
      if (lika(pa, s.a)) return { ratt: false, text: s.etiketter[0] + ' stämmer! Kolla ' + s.etiketter[1] + ' en gång till.' };
      if (lika(pb, s.b)) return { ratt: false, text: s.etiketter[1] + ' stämmer! Kolla ' + s.etiketter[0] + ' en gång till.' };
      return { ratt: false, text: 'Ta ett tal i taget. Börja med ' + s.etiketter[0] + '.' };
    }

    if (s.typ === 'uttryck') {
      var fx = tolkaUttryck(input, s.variabel);
      if (!fx) return { ratt: false, mjuk: true, text: 'Skriv ett uttryck, till exempel 3x + 2.' };
      var testa = [1.3, 2.7, -1.1, 0.4], alla = true;
      for (i = 0; i < testa.length; i++) {
        var va = fx(testa[i]), vb = evaluate(s.varde, mkVars(s.variabel, testa[i]));
        if (!lika(va, vb)) { alla = false; break; }
      }
      if (alla) return { ratt: true };
      for (i = 0; i < u.vanligaFel.length; i++) {
        var fe2 = u.vanligaFel[i];
        if (fe2.svar === undefined) continue;
        try { if (lika(fx(1.3), evaluate(fe2.svar, mkVars(s.variabel, 1.3))) && lika(fx(2.7), evaluate(fe2.svar, mkVars(s.variabel, 2.7)))) return { ratt: false, text: fe2.text }; } catch (e) {}
      }
      return { ratt: false, text: 'Räkna ' + s.variabel + ' för sig och vanliga tal för sig.' };
    }

    if (s.typ === 'brak') {
      var t = lasTal(input && input.t), n = lasTal(input && input.n);
      if (isNaN(t) || isNaN(n)) return { ratt: false, mjuk: true, text: 'Skriv ett tal överst (täljaren) och ett tal underst (nämnaren).' };
      if (n === 0) return { ratt: false, mjuk: true, text: 'Nämnaren kan inte vara 0. Den talar om hur många delar det hela är delat i.' };
      if (lika(t * s.n, s.t * n)) {
        if (s.forkortat && sgd(t, n) !== 1) return { ratt: false, mjuk: true, text: 'Rätt värde! Men bråket går att förkorta mer. Vilket tal kan du dela både täljaren och nämnaren med?' };
        if (s.exaktNamnare && !lika(n, s.n)) return { ratt: false, mjuk: true, text: 'Rätt värde! Men skriv bråket med nämnaren ' + s.n + '.' };
        return { ratt: true, likvardigt: !(lika(t, s.t) && lika(n, s.n)) };
      }
      for (i = 0; i < u.vanligaFel.length; i++) {
        var fe = u.vanligaFel[i];
        if (fe.svar === undefined) continue;
        var m = String(fe.svar).match(/^\s*(-?[\d.]+)\s*\/\s*(-?[\d.]+)\s*$/);
        if (m && lika(t, parseFloat(m[1])) && lika(n, parseFloat(m[2]))) return { ratt: false, text: fe.text };
      }
      if (lika(t, s.n) && lika(n, s.t)) return { ratt: false, text: 'Du har vänt på bråket. Antalet delar du har står överst, och antalet delar totalt står underst.' };
      if (lika(n, s.n)) return { ratt: false, text: 'Nämnaren stämmer! Titta en gång till på täljaren, talet överst.' };
      if (lika(t, s.t)) return { ratt: false, text: 'Täljaren stämmer! Kolla nämnaren, talet underst.' };
      return { ratt: false, text: 'Börja med nämnaren: hur många lika delar finns det?' };
    }
    return { ratt: false, text: 'Okänd uppgiftstyp.' };
  }
  M.ratta = ratta;

  /* ================= Bråk i text ================= */
  var NAMN = { 2: ['halv', 'halvor'], 3: ['tredjedel', 'tredjedelar'], 4: ['fjärdedel', 'fjärdedelar'], 5: ['femtedel', 'femtedelar'],
    6: ['sjättedel', 'sjättedelar'], 7: ['sjundedel', 'sjundedelar'], 8: ['åttondel', 'åttondelar'], 9: ['niondel', 'niondelar'],
    10: ['tiondel', 'tiondelar'], 11: ['elftedel', 'elftedelar'], 12: ['tolftedel', 'tolftedelar'], 100: ['hundradel', 'hundradelar'] };
  function brakOrd(t, n) {
    var ord = NAMN[n];
    if (!ord) return t + ' delat med ' + n;
    var ett = t === '1' || t === 1;
    return (ett ? (n == 2 ? 'en' : 'en') : t) + ' ' + (ett ? ord[0] : ord[1]);
  }
  M.brakOrd = brakOrd;

  // Gör om text till något som låter bra uppläst.
  M.talTillTal = function (text) {
    return String(text)
      .replace(/\[(-?\d+|\?)\/(\d+|\?)\]/g, function (_, t, n) { return t === '?' || n === '?' ? (t === '?' ? 'frågetecken' : t) + ' delat med ' + (n === '?' ? 'frågetecken' : n) : brakOrd(t, n); })
      .replace(/\s·\s/g, ' gånger ').replace(/\s\/\s/g, ' delat med ').replace(/\s[−-]\s/g, ' minus ')
      .replace(/\s\+\s/g, ' plus ').replace(/\s=\s/g, ' är lika med ').replace(/(\d)\s?%/g, '$1 procent')
      .replace(/−(\d)/g, 'minus $1')
      .replace(/(\S)\^2\b/g, '$1 i kvadrat').replace(/(\S)\^3\b/g, '$1 i kubik').replace(/\^(-?\d+)/g, ' upphöjt till $1')
      .replace(/√/g, 'roten ur ').replace(/°/g, ' grader').replace(/cm²|cm\^2/g, 'kvadratcentimeter').replace(/m²/g, 'kvadratmeter')
      .replace(/cm³/g, 'kubikcentimeter').replace(/dm³/g, 'kubikdecimeter').replace(/m³/g, 'kubikmeter')
      .replace(/\bkm\/h\b/g, 'kilometer i timmen').replace(/\bkr\/st\b/g, 'kronor styck');
  };
})();
