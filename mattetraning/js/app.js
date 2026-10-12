/* Matteträning – vyer, framsteg, inställningar och uppläsning. */
(function () {
  'use strict';
  var M = window.MATTE = window.MATTE || {};
  var D = M.DATA = window.MATTE_DATA;
  var INST = D.installningar;
  var root = document.documentElement;
  var main = document.getElementById('huvud');

  /* ================= Hjälpfunktioner ================= */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  M.esc = esc;
  // Text med [t/n] blir riktiga bråk.
  function html(s) {
    return esc(s).replace(/\[(-?\d+|\?)\/(\d+|\?)\]/g, function (_, t, n) {
      var lbl = (t === '?' || n === '?') ? t + ' delat med ' + n : M.brakOrd(t, n);
      return '<span class="frac" role="img" aria-label="' + esc(lbl) + '"><span class="t">' + t + '</span><span class="n">' + n + '</span></span>';
    });
  }
  M.html = html;
  function lasKnapp(text, etikett) {
    return '<button type="button" class="las" data-las="' + esc(text) + '" aria-label="' + esc(etikett || 'Läs upp') + '" title="Läs upp">🔊</button>';
  }
  M.lasKnapp = lasKnapp;
  var toastTimer;
  function toast(t) { var e = $('#toast'); e.textContent = t; e.classList.add('visa'); clearTimeout(toastTimer); toastTimer = setTimeout(function () { e.classList.remove('visa'); }, 2200); }

  var lager = {
    las: function (k, d) { try { var v = localStorage.getItem('mattetraning:' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    spara: function (k, v) { try { localStorage.setItem('mattetraning:' + k, JSON.stringify(v)); } catch (e) {} }
  };

  /* ================= Uppläsning ================= */
  var synth = window.speechSynthesis;
  function las(text) {
    if (!synth) { toast('Uppläsning fungerar inte i den här webbläsaren.'); return; }
    synth.cancel();
    var u = new SpeechSynthesisUtterance(M.talTillTal(text));
    u.lang = 'sv-SE';
    u.rate = inst.tempo === 'langsam' ? 0.75 : 0.95;
    var rost = synth.getVoices().filter(function (v) { return /^sv/i.test(v.lang); })[0];
    if (rost) u.voice = rost;
    u.onend = u.onerror = function () { $('#tystKnapp').hidden = true; };
    $('#tystKnapp').hidden = false;
    synth.speak(u);
  }
  $('#tystKnapp').addEventListener('click', function () { if (synth) synth.cancel(); this.hidden = true; });
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-las]'); if (b) las(b.getAttribute('data-las')); });
  if (synth && synth.onvoiceschanged !== undefined) synth.onvoiceschanged = function () {};

  /* ================= Inställningar ================= */
  var inst = Object.assign({ storlek: 2, radavstand: 'normal', typsnitt: 'vanligt', tema: 'auto', lugn: 'av', tempo: 'normal' }, lager.las('installningar', {}));
  function tillampa() {
    root.setAttribute('data-storlek', inst.storlek);
    root.setAttribute('data-radavstand', inst.radavstand);
    root.setAttribute('data-typsnitt', inst.typsnitt);
    root.setAttribute('data-lugn', inst.lugn);
    if (inst.tema === 'auto') root.removeAttribute('data-tema'); else root.setAttribute('data-tema', inst.tema);
    lager.spara('installningar', inst);
  }
  tillampa();

  /* ================= Framsteg ================= */
  function tomtFramsteg() { return { version: 1, senast: null, moment: {}, larare: { last: {}, rek: {} } }; }
  var P = lager.las('framsteg', null) || tomtFramsteg();
  if (!P.larare) P.larare = { last: {}, rek: {} };
  function sparaP() { lager.spara('framsteg', P); }
  function ms(id, data) {
    data = data || P;
    if (!data.moment[id]) data.moment[id] = { niva: 1, rattIRad: 0, felIRad: 0, gjorda: 0, forsta: 0, ledtrad: 0, losning: 0, nivaRatt: { 1: 0, 2: 0, 3: 0 }, klarat: false, senasteMallar: [], mallStat: {} };
    return data.moment[id];
  }
  function klaratPoang(s) { return { ratt: s.forsta + s.ledtrad, svarare: (s.nivaRatt[2] || 0) + (s.nivaRatt[3] || 0) }; }
  function arKlarat(s) { var k = klaratPoang(s); return k.ratt >= INST.klaratAntal && k.svarare >= INST.klaratNiva2; }

  /* ================= Data-uppslag ================= */
  function hittaMoment(id) {
    for (var i = 0; i < D.omraden.length; i++) for (var j = 0; j < D.omraden[i].moment.length; j++) {
      var m = D.omraden[i].moment[j];
      if (m.id === id) return { omrade: D.omraden[i], info: m, data: m.fil ? D.moment[m.fil] : null };
    }
    return null;
  }
  function hittaOmrade(id) { return D.omraden.filter(function (o) { return o.id === id; })[0]; }
  var aktuelltOmradeId = null;
  M.aktuelltOmrade = function () { return aktuelltOmradeId; };

  function momentStatus(id, data) {
    data = data || P;
    var s = data.moment[id];
    if (data.larare.last[id]) return { cls: '', text: '🔒 Låst' };
    if (s && s.klarat) return { cls: 'klar', text: '✓ Klarat' };
    if (s && s.gjorda > 0) return { cls: 'pagar', text: 'Påbörjat' };
    if (data.larare.rek[id]) return { cls: 'rek', text: '⭐ Läraren tipsar' };
    return null;
  }

  /* ================= Routing ================= */
  function route() {
    if (synth) synth.cancel();
    if (M.stangVerktyg) M.stangVerktyg();
    main.onclick = null; // varje vy sätter sin egen klick-lyssnare
    var h = location.hash.replace(/^#\/?/, '').split('/');
    aktuelltOmradeId = null;
    if (h[0] === 'omrade' && h[1]) vyOmrade(h[1]);
    else if (h[0] === 'moment' && h[1]) vyMoment(h[1], h[2] || 'forsta');
    else if (h[0] === 'installningar') vyInstallningar();
    else if (h[0] === 'framsteg') vyFramsteg();
    else if (h[0] === 'larare') vyLarare();
    else vyStart();
    window.scrollTo(0, 0);
    main.focus({ preventScroll: true });
  }
  window.addEventListener('hashchange', route);

  /* ================= Startsida ================= */
  function vyStart() {
    document.title = 'Matteträning';
    var h = '<h1>Matteträning</h1><p class="inledning">Här tränar du i lugn och ro, ett steg i taget. Det gör inget om det blir fel. Då får du en ledtråd.</p>';
    if (P.senast) {
      var f = hittaMoment(P.senast.moment);
      if (f && f.data) {
        var delNamn = { forsta: 'Förstå', exempel: 'Exempel', trana: 'Träna' }[P.senast.del] || 'Förstå';
        h += '<div class="kort fortsatt"><div><span class="dampad">Fortsätt där du var</span><br><strong>' + esc(f.info.namn) + ' · ' + delNamn + '</strong></div>' +
          '<a class="knapp" href="#/moment/' + f.info.id + '/' + (P.senast.del || 'forsta') + '">Fortsätt →</a></div>';
      }
    }
    var rek = Object.keys(P.larare.rek).filter(function (id) { return P.larare.rek[id] && hittaMoment(id) && hittaMoment(id).data && !P.larare.last[id]; });
    if (rek.length) {
      h += '<div class="kort"><strong>⭐ Din lärare tipsar om</strong><div class="knapp-rad">' + rek.map(function (id) {
        return '<a class="knapp sekundar" href="#/moment/' + id + '/forsta">' + esc(hittaMoment(id).info.namn) + '</a>';
      }).join('') + '</div></div>';
    }
    h += '<h2>Välj område</h2><div class="rutnat">' + D.omraden.map(function (o) {
      var finns = o.moment.filter(function (m) { return m.fil; });
      var klara = finns.filter(function (m) { return P.moment[m.id] && P.moment[m.id].klarat; }).length;
      var pct = finns.length ? Math.round(100 * klara / finns.length) : 0;
      return '<a class="omrade-kort" href="#/omrade/' + o.id + '"><span class="omrade-ikon" aria-hidden="true">' + o.ikon + '</span><strong>' + esc(o.namn) + '</strong>' +
        '<span class="dampad">' + esc(o.beskrivning) + '</span>' +
        (finns.length ? '<div class="mätare" aria-hidden="true"><span style="width:' + pct + '%"></span></div><span class="liten-info">' + klara + ' av ' + finns.length + ' moment klarade</span>'
          : '<span class="liten-info">Kommer snart</span>') + '</a>';
    }).join('') + '</div>';
    h += '<div class="kort"><h3>🧭 Var ska jag börja?</h3><p class="dampad">Ett kort test med ungefär 10 frågor som föreslår var du kan börja. Testet kommer när fler moment är klara.</p></div>';
    h += '<div class="sidfot-lankar"><a class="knapp sekundar liten" href="#/framsteg">📈 Mina framsteg</a><a class="knapp sekundar liten" href="#/installningar">⚙️ Inställningar</a><a class="knapp sekundar liten" href="#/larare">👩‍🏫 Lärarvy</a></div>';
    main.innerHTML = h;
  }

  /* ================= Område ================= */
  function vyOmrade(id) {
    var o = hittaOmrade(id);
    if (!o) { vyStart(); return; }
    aktuelltOmradeId = o.id;
    document.title = o.namn + ' – Matteträning';
    var h = '<a href="#/" class="lank-knapp">← Alla områden</a><h1>' + o.ikon + ' ' + esc(o.namn) + '</h1><p class="inledning">' + esc(o.beskrivning) + '</p>' +
      '<div class="knapp-rad"><button type="button" class="knapp sekundar liten" data-verktyg-knapp="formel">📐 Formelblad</button></div>' +
      '<h2>Välj moment</h2><ul class="moment-lista">' + o.moment.map(function (m) {
        var st = momentStatus(m.id), last = P.larare.last[m.id];
        if (!m.fil || last) {
          return '<li><div class="moment-knapp ej" aria-disabled="true"><span>' + esc(m.namn) + '</span><span class="chip">' + (last ? '🔒 Låst av läraren' : 'Kommer snart') + '</span></div></li>';
        }
        return '<li><a class="moment-knapp" href="#/moment/' + m.id + '/forsta"><span>' + esc(m.namn) + '</span>' +
          (st ? '<span class="chip ' + st.cls + '">' + st.text + '</span>' : '<span class="chip">Börja här</span>') + '</a></li>';
      }).join('') + '</ul>';
    main.innerHTML = h;
  }

  /* ================= Moment ================= */
  function vyMoment(id, del) {
    var f = hittaMoment(id);
    if (!f || !f.data || P.larare.last[id]) { location.hash = '#/'; return; }
    aktuelltOmradeId = f.omrade.id;
    P.senast = { moment: id, del: del }; sparaP();
    document.title = f.info.namn + ' – Matteträning';
    var flik = function (d, namn) { return '<a href="#/moment/' + id + '/' + d + '"' + (d === del ? ' aria-current="page"' : '') + '>' + namn + '</a>'; };
    main.innerHTML = '<a href="#/omrade/' + f.omrade.id + '" class="lank-knapp">← ' + esc(f.omrade.namn) + '</a>' +
      '<h1>' + esc(f.info.namn) + '</h1>' +
      '<nav class="flikar" aria-label="Delar av momentet">' + flik('forsta', '1. Förstå') + flik('exempel', '2. Exempel') + flik('trana', '3. Träna') + '</nav>' +
      '<div id="momentInnehall"></div>';
    var box = $('#momentInnehall');
    if (del === 'exempel') delExempel(box, f);
    else if (del === 'trana') delTrana(box, f);
    else delForsta(box, f);
  }

  function delForsta(box, f) {
    var fo = f.data.forsta;
    box.innerHTML = '<div class="kort"><div class="las-rad"><div>' + fo.text.map(function (t) { return '<p>' + html(t) + '</p>'; }).join('') + '</div>' +
      lasKnapp(fo.text.join(' '), 'Läs upp förklaringen') + '</div></div>' +
      '<div class="kort" id="forstaVis"><h3>Prova själv</h3>' +
      (fo.prova ? '<ul class="prova">' + fo.prova.map(function (p) { return '<li>' + html(p) + ' ' + lasKnapp(p) + '</li>'; }).join('') + '</ul>' : '') +
      '</div>' +
      '<div class="knapp-rad"><a class="knapp" href="#/moment/' + f.info.id + '/exempel">Gå vidare till Exempel →</a></div>';
    var vis = M.ritaVis(fo.vis);
    if (vis) $('#forstaVis').appendChild(vis);
  }

  function delExempel(box, f) {
    var ex = f.data.exempel;
    box.innerHTML = '<p class="inledning">Här ser du hur man löser en uppgift. Klicka fram ett steg i taget.</p>' +
      ex.map(function (e, i) {
        return '<div class="kort" data-ex="' + i + '"><h3>Exempel ' + (i + 1) + ': ' + esc(e.rubrik) + '</h3>' +
          '<div class="las-rad"><div class="uppgift-box">' + html(e.uppgift) + '</div>' + lasKnapp(e.uppgift, 'Läs upp uppgiften') + '</div>' +
          '<ol class="steg-lista" data-steg-lista></ol>' +
          '<div class="knapp-rad"><button type="button" class="knapp" data-nasta-steg>Visa första steget</button>' +
          '<button type="button" class="knapp sekundar liten" data-borja-om hidden>Börja om</button></div></div>';
      }).join('') +
      '<div class="knapp-rad"><a class="knapp" href="#/moment/' + f.info.id + '/trana">Börja träna →</a></div>';
    box.addEventListener('click', function (e) {
      var kort = e.target.closest('[data-ex]'); if (!kort) return;
      var exempel = ex[+kort.dataset.ex], lista = $('[data-steg-lista]', kort), knapp = $('[data-nasta-steg]', kort);
      if (e.target.closest('[data-borja-om]')) { lista.innerHTML = ''; knapp.hidden = false; knapp.textContent = 'Visa första steget'; e.target.hidden = true; return; }
      if (!e.target.closest('[data-nasta-steg]')) return;
      var i = lista.children.length, steg = exempel.steg[i];
      var li = document.createElement('li');
      li.className = 'steg';
      li.innerHTML = '<div class="las-rad"><p><span class="steg-nr">' + (i + 1) + '</span>' + html(steg.text) + '</p>' + lasKnapp(steg.text) + '</div>';
      var v = M.ritaVis(steg.vis); if (v) li.appendChild(v);
      lista.appendChild(li);
      if (i + 1 >= exempel.steg.length) { knapp.hidden = true; $('[data-borja-om]', kort).hidden = false; }
      else knapp.textContent = 'Visa nästa steg';
      li.scrollIntoView({ block: 'nearest' });
    });
  }

  /* ================= Träna ================= */
  var BEROM = ['Snyggt!', 'Rätt! Bra tänkt.', 'Ja, det stämmer!', 'Bra jobbat!', 'Precis rätt!', 'Helt rätt!'];

  function valjMall(f, s, sammaId) {
    var mallar = f.data.uppgifter;
    if (sammaId) { var m = mallar.filter(function (x) { return x.id === sammaId; })[0]; if (m) return m; }
    var pa = mallar.filter(function (x) { return x.niva === s.niva; });
    for (var n = s.niva; !pa.length && n > 0; n--) pa = mallar.filter(function (x) { return x.niva === n; });
    if (!pa.length) pa = mallar;
    var nya = pa.filter(function (x) { return s.senasteMallar.indexOf(x.id) === -1; });
    var val = (nya.length ? nya : pa)[Math.floor(Math.random() * (nya.length ? nya : pa).length)];
    return val;
  }

  function delTrana(box, f) {
    var s = ms(f.info.id);
    var T = { u: null, fel: 0, ledtradar: 0, losning: false, losSteg: 0, klar: false, valt: null, fardig: false };

    function nyUppgift(sammaId) {
      var mall = valjMall(f, s, sammaId);
      try { T.u = M.skapaUppgift(mall); }
      catch (err) { console.error(err); box.innerHTML = '<div class="kort"><p>Uppgiften ' + esc(mall.id) + ' gick inte att skapa. Säg till din lärare.</p></div>'; return; }
      T.fel = 0; T.ledtradar = 0; T.losning = false; T.losSteg = 0; T.klar = false; T.valt = null; T.fardig = false;
      s.senasteMallar = s.senasteMallar.concat(mall.id).slice(-3);
      rita();
      var forst = $('.svar-input, .val-knapp', box); if (forst) forst.focus({ preventScroll: true });
    }

    function malHtml() {
      var k = klaratPoang(s), pct = Math.min(100, Math.round(100 * (Math.min(k.ratt, INST.klaratAntal) + Math.min(k.svarare, INST.klaratNiva2)) / (INST.klaratAntal + INST.klaratNiva2)));
      if (s.klarat) return '<div class="mal"><span class="chip klar">✓ Du har klarat det här momentet</span> <span class="liten-info">Du kan fortsätta träna så mycket du vill.</span></div>';
      return '<div class="mal"><div class="mätare" aria-hidden="true"><span style="width:' + pct + '%"></span></div>' +
        '<span class="liten-info">Mot målet: ' + Math.min(k.ratt, INST.klaratAntal) + ' av ' + INST.klaratAntal + ' rätt, varav ' + Math.min(k.svarare, INST.klaratNiva2) + ' av ' + INST.klaratNiva2 + ' på nivå 2 eller 3</span></div>';
    }

    function svarHtml(u) {
      if (u.svar.typ === 'val') {
        return '<div class="val-lista" role="group" aria-label="Svarsalternativ">' + u.svar.alternativ.map(function (a, i) {
          return '<button type="button" class="val-knapp" data-val="' + i + '" aria-pressed="false">' + html(a.text) + '</button>';
        }).join('') + '</div>';
      }
      if (u.svar.typ === 'brak') {
        return '<div class="svar-omrade"><label class="frac-input"><span class="hoppa">Täljare</span>' +
          '<input class="svar-input" data-t inputmode="numeric" autocomplete="off" aria-label="Täljare, talet överst">' +
          '<span class="frac-linje" aria-hidden="true"></span>' +
          '<input class="svar-input" data-n inputmode="numeric" autocomplete="off" aria-label="Nämnare, talet underst"></label></div>';
      }
      return '<div class="svar-omrade"><input class="svar-input" data-tal inputmode="decimal" autocomplete="off" aria-label="Ditt svar">' +
        (u.svar.enhet ? '<span class="enhet">' + esc(u.svar.enhet) + '</span>' : '') + '</div>';
    }

    function rita() {
      var u = T.u;
      M._aktuellUppgift = u; // för automatiska tester
      var h = '<div class="kort uppgift-kort">' +
        '<div class="niva-rad"><span>Nivå ' + s.niva + ' av 3<span class="niva-prickar" aria-hidden="true">' +
        [1, 2, 3].map(function (n) { return '<span class="' + (n <= s.niva ? 'pa' : '') + '"></span>'; }).join('') + '</span></span></div>' +
        '<div class="las-rad"><p class="uppg-text">' + html(u.text) + '</p>' +
        lasKnapp(u.text + (u.svar.typ === 'val' ? ' Svaren du kan välja: ' + u.svar.alternativ.map(function (a) { return a.text; }).join('. Eller: ') + '.' : ''), 'Läs upp uppgiften') + '</div>' +
        '<div data-vis></div>' + svarHtml(u) +
        '<div class="knapp-rad" data-knappar>' +
        (u.svar.typ !== 'val' ? '<button type="button" class="knapp" data-kolla>Kolla svaret</button>' : '') +
        '<button type="button" class="knapp sekundar" data-ledtrad>💡 Ledtråd</button></div>' +
        '<div class="respons" data-respons aria-live="polite"></div></div>' + malHtml();
      box.innerHTML = h;
      var v = M.ritaVis(u.vis); if (v) $('[data-vis]', box).appendChild(v);
      uppdateraLedtradKnapp();
    }

    function uppdateraLedtradKnapp() {
      var b = $('[data-ledtrad]', box); if (!b) return;
      b.hidden = T.klar || T.losning;
      b.textContent = T.ledtradar === 0 ? '💡 Ledtråd' : T.ledtradar === 1 && T.u.ledtradar.length > 1 ? '💡 Tydligare ledtråd' : '📖 Visa lösningen';
    }

    function respons(htmlStr, typ, lasText) {
      var r = $('[data-respons]', box);
      var d = document.createElement('div');
      d.className = 'ruta ' + typ;
      d.innerHTML = (lasText ? lasKnapp(lasText) : '') + htmlStr;
      r.appendChild(d);
      d.scrollIntoView({ block: 'nearest' });
      return d;
    }

    function visaLedtrad() {
      if (T.ledtradar >= T.u.ledtradar.length) { visaLosning(); return; }
      var t = T.u.ledtradar[T.ledtradar];
      T.ledtradar++;
      respons('<strong>💡 Ledtråd ' + T.ledtradar + ':</strong> ' + html(t), 'info', 'Ledtråd. ' + t);
      uppdateraLedtradKnapp();
    }

    function visaLosning() {
      T.losning = true;
      $$('input, .val-knapp, [data-kolla]', box).forEach(function (x) { x.disabled = true; });
      uppdateraLedtradKnapp();
      var d = respons('<strong>📖 Så här kan man lösa uppgiften</strong><ol class="steg-lista" data-los></ol><div class="knapp-rad" data-los-knappar></div>', 'info');
      nastaLosSteg(d);
    }
    function nastaLosSteg(d) {
      var lista = $('[data-los]', d), knappar = $('[data-los-knappar]', d);
      var t = T.u.losning[T.losSteg++];
      var li = document.createElement('li');
      li.className = 'steg';
      li.innerHTML = '<div class="las-rad"><p><span class="steg-nr">' + T.losSteg + '</span>' + html(t) + '</p>' + lasKnapp(t) + '</div>';
      lista.appendChild(li);
      if (T.losSteg < T.u.losning.length) {
        knappar.innerHTML = '<button type="button" class="knapp" data-los-nasta>Visa nästa steg</button>';
      } else {
        knappar.innerHTML = '<button type="button" class="knapp" data-liknande>🔁 Prova en liknande uppgift</button>';
        if (!T.fardig) avsluta('losning');
      }
      $('button', knappar).focus({ preventScroll: true });
      li.scrollIntoView({ block: 'nearest' });
    }

    function avsluta(utfall) {
      T.fardig = true;
      var foreKlarat = s.klarat;
      s.gjorda++;
      s[utfall]++;
      if (utfall !== 'losning') s.nivaRatt[s.niva] = (s.nivaRatt[s.niva] || 0) + 1;
      var st = s.mallStat[T.u.id] || (s.mallStat[T.u.id] = { g: 0, f: 0, l: 0 });
      st.g++; if (utfall === 'forsta') st.f++; if (utfall === 'losning') st.l++;
      var meddelande = null, foreslaForsta = false;
      if (utfall === 'forsta') {
        s.felIRad = 0; s.rattIRad++;
        if (s.rattIRad >= 3 && s.niva < 3) { s.niva++; s.rattIRad = 0; meddelande = '💪 Tre rätt i rad! Nu blir uppgifterna lite svårare.'; }
      } else {
        s.rattIRad = 0; s.felIRad++;
        if (s.felIRad >= 2) {
          s.felIRad = 0;
          if (s.niva > 1) { s.niva--; meddelande = 'Vi tar lite lättare uppgifter en stund. Det är så man bygger upp sig.'; }
          else { foreslaForsta = true; }
        }
      }
      s.klarat = s.klarat || arKlarat(s);
      sparaP();
      if (!foreKlarat && s.klarat) respons('<strong>🎉 Du har klarat momentet ' + esc(f.info.namn) + '!</strong> Du kan fortsätta träna, eller välja ett nytt moment.', 'bra');
      if (meddelande) respons(meddelande, 'info', meddelande);
      if (foreslaForsta) respons('Det här var klurigt. Vill du titta på förklaringen igen? Det är helt okej att gå tillbaka. <div class="knapp-rad"><a class="knapp sekundar liten" href="#/moment/' + f.info.id + '/forsta">Till Förstå</a><a class="knapp sekundar liten" href="#/moment/' + f.info.id + '/exempel">Till Exempel</a></div>', 'info');
      var mal = $('.mal', box); if (mal) mal.outerHTML = malHtml();
    }

    function hamtaSvar() {
      var u = T.u;
      if (u.svar.typ === 'val') return T.valt;
      if (u.svar.typ === 'brak') return { t: $('[data-t]', box).value, n: $('[data-n]', box).value };
      return $('[data-tal]', box).value;
    }

    function kolla() {
      if (T.klar || T.losning) return;
      var r = M.ratta(T.u, hamtaSvar());
      if (r.ratt) {
        T.klar = true;
        $$('input, .val-knapp, [data-kolla]', box).forEach(function (x) { x.disabled = true; });
        if (T.u.svar.typ === 'val') { var vb = $('.val-knapp[data-val="' + T.valt + '"]', box); if (vb) vb.classList.add('ratt'); }
        uppdateraLedtradKnapp();
        var utfall = T.fel === 0 && T.ledtradar === 0 ? 'forsta' : 'ledtrad';
        var berom = BEROM[Math.floor(Math.random() * BEROM.length)];
        var extra = utfall === 'ledtrad' ? ' Du gav inte upp, och ledtrådarna hjälpte dig fram.' : '';
        if (r.likvardigt) extra += ' Ditt bråk har samma värde som ' + T.u.rattText + '.';
        respons('<strong>' + berom + '</strong>' + html(extra) + '<div class="knapp-rad"><button type="button" class="knapp" data-nasta>Nästa uppgift →</button></div>', 'bra', berom + extra);
        avsluta(utfall);
        $('[data-nasta]', box).focus({ preventScroll: true });
        return;
      }
      if (r.mjuk) { respons(html(r.text), 'tips', r.text); return; }
      T.fel++;
      respons('<strong>Inte riktigt än.</strong> ' + html(r.text), 'tips', 'Inte riktigt än. ' + r.text);
      if (T.ledtradar < T.u.ledtradar.length) visaLedtrad();
      else visaLosning();
    }

    box.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b || b.disabled) return;
      if (b.dataset.val !== undefined) {
        T.valt = +b.dataset.val;
        $$('.val-knapp', box).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
        kolla(); return;
      }
      if (b.hasAttribute('data-kolla')) kolla();
      else if (b.hasAttribute('data-ledtrad')) { if (T.ledtradar < T.u.ledtradar.length) visaLedtrad(); else visaLosning(); }
      else if (b.hasAttribute('data-los-nasta')) nastaLosSteg(b.closest('.ruta'));
      else if (b.hasAttribute('data-liknande')) nyUppgift(T.u.id);
      else if (b.hasAttribute('data-nasta')) nyUppgift();
    });
    box.addEventListener('keydown', function (e) {
      if (e.key !== 'Enter' || !e.target.matches('.svar-input')) return;
      e.preventDefault();
      if (e.target.hasAttribute('data-t')) { $('[data-n]', box).focus(); return; }
      kolla();
    });
    nyUppgift();
  }

  /* ================= Inställningar ================= */
  function vyInstallningar() {
    document.title = 'Inställningar – Matteträning';
    function seg(namn, val) {
      return '<span class="seg" role="group">' + val.map(function (v) {
        return '<button type="button" data-inst="' + namn + '" data-v="' + v[0] + '" aria-pressed="' + (String(inst[namn]) === String(v[0])) + '">' + v[1] + '</button>';
      }).join('') + '</span>';
    }
    main.innerHTML = '<a href="#/" class="lank-knapp">← Start</a><h1>⚙️ Inställningar</h1><p class="inledning">Ställ in så att det blir skönt att läsa. Inställningarna sparas på den här enheten.</p>' +
      '<div class="kort">' +
      '<div class="inst-rad"><strong>Textstorlek</strong>' + seg('storlek', [[1, 'A'], [2, 'A+'], [3, 'A++'], [4, 'A+++']]) + '</div>' +
      '<div class="inst-rad"><strong>Radavstånd</strong>' + seg('radavstand', [['normal', 'Normalt'], ['stort', 'Stort']]) + '</div>' +
      '<div class="inst-rad"><strong>Typsnitt</strong>' + seg('typsnitt', [['vanligt', 'Vanligt'], ['lattlast', 'Lättläst']]) + '</div>' +
      '<div class="inst-rad"><strong>Färger</strong>' + seg('tema', [['auto', 'Som datorn'], ['ljust', '☀️ Ljust'], ['morkt', '🌙 Mörkt']]) + '</div>' +
      '<div class="inst-rad"><strong>Lugnt läge</strong><span class="dampad" style="flex:1 1 200px">Inga rörelser eller animationer.</span>' + seg('lugn', [['av', 'Av'], ['pa', 'På']]) + '</div>' +
      '<div class="inst-rad"><strong>Uppläsning</strong>' + seg('tempo', [['normal', 'Normal'], ['langsam', 'Långsam']]) + lasKnapp('Så här låter uppläsningen. Tre fjärdedelar skrivs [3/4].', 'Testa uppläsningen') + '</div>' +
      '</div>';
    main.onclick = function (e) {
      var b = e.target.closest('[data-inst]'); if (!b) return;
      var v = b.dataset.v; inst[b.dataset.inst] = b.dataset.inst === 'storlek' ? +v : v;
      tillampa();
      $$('[data-inst="' + b.dataset.inst + '"]').forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    };
  }

  /* ================= Framsteg ================= */
  function laddaNer(data, namn) {
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = namn;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function lasFil(input, klar) {
    var fil = input.files && input.files[0]; if (!fil) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var d = JSON.parse(r.result);
        if (!d || d.version !== 1 || typeof d.moment !== 'object') throw new Error('fel format');
        if (!d.larare) d.larare = { last: {}, rek: {} };
        klar(d);
      } catch (e) { toast('Filen gick inte att läsa. Är det en fil från Matteträning?'); }
      input.value = '';
    };
    r.readAsText(fil);
  }
  function datum() { return new Date().toISOString().slice(0, 10); }

  function vyFramsteg() {
    document.title = 'Mina framsteg – Matteträning';
    var h = '<a href="#/" class="lank-knapp">← Start</a><h1>📈 Mina framsteg</h1>' +
      D.omraden.map(function (o) {
        var finns = o.moment.filter(function (m) { return m.fil; });
        if (!finns.length) return '';
        return '<div class="kort"><h3>' + o.ikon + ' ' + esc(o.namn) + '</h3><ul class="moment-lista">' + finns.map(function (m) {
          var s = P.moment[m.id], st = momentStatus(m.id);
          return '<li><div class="moment-knapp"><span>' + esc(m.namn) + (s ? '<span class="liten-info">' + s.gjorda + ' uppgifter gjorda · nivå ' + s.niva + '</span>' : '') + '</span>' +
            (st ? '<span class="chip ' + st.cls + '">' + st.text + '</span>' : '<span class="chip">Inte börjat</span>') + '</div></li>';
        }).join('') + '</ul></div>';
      }).join('') +
      '<div class="kort"><h3>Spara och flytta</h3><p class="dampad">Dina framsteg sparas bara på den här enheten. Spara dem som en fil om du vill byta dator eller visa din lärare.</p>' +
      '<div class="knapp-rad"><button type="button" class="knapp" data-export>💾 Spara framsteg som fil</button>' +
      '<label class="knapp sekundar">📂 Hämta framsteg från fil<input type="file" accept=".json,application/json" data-import hidden></label></div>' +
      '<div class="knapp-rad"><button type="button" class="lank-knapp" data-nollstall>Börja om från början</button></div></div>';
    main.innerHTML = h;
    main.onclick = function (e) {
      if (e.target.closest('[data-export]')) laddaNer(P, 'mattetraning-framsteg-' + datum() + '.json');
      if (e.target.closest('[data-nollstall]') && confirm('Vill du ta bort alla framsteg på den här enheten?')) { P = tomtFramsteg(); sparaP(); vyFramsteg(); toast('Framstegen är borttagna.'); }
    };
    $('[data-import]').onchange = function () {
      lasFil(this, function (d) {
        if (!confirm('Vill du ersätta framstegen på den här enheten med filens framsteg?')) return;
        P = d; sparaP(); vyFramsteg(); toast('Framstegen är hämtade.');
      });
    };
  }

  /* ================= Lärarvy ================= */
  var larareInloggad = false, larData = null, larKalla = 'enhet';
  function vyLarare() {
    document.title = 'Lärarvy – Matteträning';
    try { larareInloggad = larareInloggad || sessionStorage.getItem('mattetraning:larare') === '1'; } catch (e) {}
    if (!larareInloggad) {
      main.innerHTML = '<a href="#/" class="lank-knapp">← Start</a><h1>👩‍🏫 Lärarvy</h1><div class="kort"><form data-pin><label for="pin"><strong>PIN-kod</strong></label>' +
        '<div class="knapp-rad"><input type="password" id="pin" inputmode="numeric" autocomplete="off"><button class="knapp" type="submit">Öppna</button></div></form></div>';
      $('[data-pin]').onsubmit = function (e) {
        e.preventDefault();
        if ($('#pin').value === String(INST.larPin)) { larareInloggad = true; try { sessionStorage.setItem('mattetraning:larare', '1'); } catch (er) {} vyLarare(); }
        else toast('Fel PIN-kod.');
      };
      $('#pin').focus();
      return;
    }
    var data = larKalla === 'fil' && larData ? larData : P;
    var rader = [];
    D.omraden.forEach(function (o) {
      o.moment.forEach(function (m) {
        var s = data.moment[m.id], g = s ? s.gjorda : 0;
        var svart = s && g >= 4 && (s.losning / g > 0.35 || s.forsta / g < 0.35);
        rader.push('<tr><td>' + esc(m.namn) + (m.fil ? '' : ' <span class="liten-info">(kommer snart)</span>') + '</td>' +
          '<td>' + (s ? (s.klarat ? '✓ Klarat' : 'Påbörjat') + (svart ? ' · ⚠️ Svårt' : '') : '–') + '</td>' +
          '<td>' + (s ? s.niva : '–') + '</td><td>' + g + '</td>' +
          '<td>' + (g ? Math.round(100 * s.forsta / g) + ' %' : '–') + '</td>' +
          '<td>' + (s ? s.ledtrad : '–') + '</td><td>' + (s ? s.losning : '–') + '</td>' +
          '<td><button type="button" class="knapp liten ' + (data.larare.last[m.id] ? '' : 'sekundar') + '" data-las-mom="' + m.id + '" aria-pressed="' + !!data.larare.last[m.id] + '">' + (data.larare.last[m.id] ? '🔒 Låst' : 'Lås') + '</button> ' +
          '<button type="button" class="knapp liten ' + (data.larare.rek[m.id] ? '' : 'sekundar') + '" data-rek="' + m.id + '" aria-pressed="' + !!data.larare.rek[m.id] + '">⭐</button></td></tr>');
      });
    });
    var svaraste = [];
    Object.keys(data.moment).forEach(function (id) {
      var f = hittaMoment(id); if (!f || !f.data) return;
      Object.keys(data.moment[id].mallStat || {}).forEach(function (mid) {
        var st = data.moment[id].mallStat[mid], mall = f.data.uppgifter.filter(function (x) { return x.id === mid; })[0];
        if (st.g >= 2 && mall) svaraste.push({ id: mid, text: mall.text, andel: (st.g - st.f) / st.g, g: st.g, l: st.l || 0 });
      });
    });
    svaraste.sort(function (a, b) { return b.andel - a.andel; });
    main.innerHTML = '<a href="#/" class="lank-knapp">← Start</a><h1>👩‍🏫 Lärarvy</h1>' +
      '<div class="kort"><strong>Visar:</strong> ' + (larKalla === 'fil' ? 'en elevfil' : 'framstegen på den här enheten') +
      '<div class="knapp-rad"><label class="knapp sekundar liten">📂 Öppna en elevfil<input type="file" accept=".json,application/json" data-lar-import hidden></label>' +
      (larKalla === 'fil' ? '<button type="button" class="knapp sekundar liten" data-lar-enhet>Visa den här enheten</button><button type="button" class="knapp liten" data-lar-spara>💾 Spara filen med dina ändringar</button>' : '') +
      '</div><p class="liten-info">Lås döljer ett moment för eleven. ⭐ visar momentet som tips på elevens startsida. Ändringar för en elevfil följer med när eleven hämtar den sparade filen.</p></div>' +
      '<div class="kort tabell-wrap"><table><thead><tr><th>Moment</th><th>Status</th><th>Nivå</th><th>Gjorda</th><th>Rätt direkt</th><th>Med ledtråd</th><th>Lösning visad</th><th>Styr</th></tr></thead><tbody>' + rader.join('') + '</tbody></table></div>' +
      '<div class="kort"><h3>Uppgifter som varit svåra</h3>' + (svaraste.length ? '<ul class="prova">' + svaraste.slice(0, 6).map(function (x) {
        return '<li><strong>' + esc(x.id) + '</strong>: ' + html(x.text.replace(/\{=?[^}]*\}/g, '…')) + '<br><span class="liten-info">' + x.g + ' försök, ' + Math.round(x.andel * 100) + ' % inte rätt direkt, lösning visad ' + x.l + ' gånger</span></li>';
      }).join('') + '</ul>' : '<p class="dampad">Inga data än.</p>') + '</div>' +
      '<div class="knapp-rad"><button type="button" class="lank-knapp" data-lar-ut>Logga ut</button></div>';
    main.onclick = function (e) {
      var b = e.target.closest('button'); if (!b) return;
      if (b.dataset.lasMom) { data.larare.last[b.dataset.lasMom] = !data.larare.last[b.dataset.lasMom]; if (data === P) sparaP(); vyLarare(); }
      else if (b.dataset.rek) { data.larare.rek[b.dataset.rek] = !data.larare.rek[b.dataset.rek]; if (data === P) sparaP(); vyLarare(); }
      else if (b.hasAttribute('data-lar-enhet')) { larKalla = 'enhet'; vyLarare(); }
      else if (b.hasAttribute('data-lar-spara')) laddaNer(larData, 'mattetraning-framsteg-larare-' + datum() + '.json');
      else if (b.hasAttribute('data-lar-ut')) { larareInloggad = false; try { sessionStorage.removeItem('mattetraning:larare'); } catch (er) {} location.hash = '#/'; }
    };
    $('[data-lar-import]').onchange = function () { lasFil(this, function (d) { larData = d; larKalla = 'fil'; vyLarare(); }); };
  }

  /* ================= Start ================= */
  M.initVerktyg();
  route();

  if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) {
    navigator.serviceWorker.register('sw.js').catch(function () {});
  }
})();
