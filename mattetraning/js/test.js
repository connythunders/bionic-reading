/* Kontrollerar alla moment: att uppgifterna går att skapa, att rätt svar godkänns,
   att texterna blir hela och att bilderna går att rita. Används av test.html. */
(function () {
  'use strict';
  var M = window.MATTE, D = window.MATTE_DATA;
  function bra(s) { return !/\{|\}|NaN|undefined|Infinity|\[object/.test(s); }
  function svarFor(u) {
    var s = u.svar;
    if (s.typ === 'val') return s.alternativ.findIndex(function (a) { return a.orig === s.ratt; });
    if (s.typ === 'brak') return { t: String(s.t), n: String(s.n) };
    if (s.typ === 'par') return { a: M.talText(s.a), b: M.talText(s.b) };
    if (s.typ === 'uttryck') return s.varde;
    return M.talText(s.varde);
  }
  M.testaAllt = function (varv) {
    varv = varv || 150;
    var fel = [], info = [];
    D.omraden.forEach(function (o) {
      o.moment.forEach(function (mi) {
        if (!mi.fil) return;
        var m = D.moment[mi.fil];
        if (!m) { fel.push(mi.id + ': datafilen saknas eller är inte inlagd i index.html'); return; }
        var per = [1, 2, 3].map(function (n) { return m.uppgifter.filter(function (x) { return x.niva === n; }).length; });
        info.push({ id: mi.id, namn: mi.namn, per: per });
        if (per[0] < 15) fel.push(mi.id + ': bara ' + per[0] + ' uppgifter på nivå 1 (minst 15)');
        if (m.forsta.text.length > 4) fel.push(mi.id + ': förklaringen har fler än 4 meningar');
        try { if (!M.ritaVis(m.forsta.vis)) fel.push(mi.id + ': Förstå saknar bild'); } catch (e) { fel.push(mi.id + ' Förstå-bild: ' + e.message); }
        m.exempel.forEach(function (ex, i) {
          ex.steg.forEach(function (st) {
            try { if (st.vis && !M.ritaVis(st.vis)) fel.push(mi.id + ' exempel ' + (i + 1) + ': okänd bild ' + st.vis.typ); }
            catch (e) { fel.push(mi.id + ' exempel ' + (i + 1) + ': ' + e.message); }
          });
        });
        var ids = {};
        m.uppgifter.forEach(function (mall) {
          if (ids[mall.id]) fel.push(mall.id + ': id används två gånger'); ids[mall.id] = 1;
          if (!mall.ledtradar || mall.ledtradar.length < 2) fel.push(mall.id + ': färre än 2 ledtrådar');
          for (var i = 0; i < varv; i++) {
            var u;
            try { u = M.skapaUppgift(mall); } catch (e) { fel.push(mall.id + ': ' + e.message); break; }
            var r = M.ratta(u, svarFor(u));
            if (!r.ratt) { fel.push(mall.id + ': rätt svar underkänns (' + JSON.stringify(svarFor(u)) + ') i "' + u.text + '"'); break; }
            var allt = [u.text, u.rattText].concat(u.ledtradar, u.losning, (u.svar.alternativ || []).map(function (a) { return a.text; }), u.vanligaFel.map(function (f) { return f.text; })).join(' ');
            if (!bra(allt)) { fel.push(mall.id + ': trasig text: …' + (allt.match(/.{0,40}(\{|\}|NaN|undefined|Infinity).{0,40}/) || [''])[0] + '…'); break; }
            if (u.svar.typ === 'tal' && !isFinite(u.svar.varde)) { fel.push(mall.id + ': svaret är inte ett tal'); break; }
            if (u.svar.typ === 'tal' && Math.abs(u.svar.varde * 1e4 - Math.round(u.svar.varde * 1e4)) > 1e-6 && !u.svar.tolerans) { fel.push(mall.id + ': svaret har för många decimaler (' + u.svar.varde + ')'); break; }
            if (u.svar.typ === 'val') {
              var texter = u.svar.alternativ.map(function (a) { return a.text; });
              if (texter.some(function (t, j) { return texter.indexOf(t) !== j; })) { fel.push(mall.id + ': två svarsalternativ är lika (' + texter.join(' | ') + ')'); break; }
            }
            if (u.vis) { try { if (!M.ritaVis(u.vis)) { fel.push(mall.id + ': okänd bild ' + u.vis.typ); break; } } catch (e) { fel.push(mall.id + ': bilden gick inte att rita: ' + e.message); break; } }
          }
        });
      });
    });
    (D.diagnos || []).forEach(function (q) {
      var m = D.moment[q.moment];
      if (!m) { fel.push('Diagnos: momentet ' + q.moment + ' finns inte'); return; }
      if (!m.uppgifter.some(function (x) { return x.id === q.uppgift; })) fel.push('Diagnos: uppgiften ' + q.uppgift + ' finns inte i ' + q.moment);
    });
    return { fel: fel, info: info };
  };
})();
