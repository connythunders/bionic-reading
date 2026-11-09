// Läser elevens sparade inställningar direkt när sidan börjar ritas, så att tema, typsnitt och
// textstorlek är rätt från första stund. Utan det blinkar sidan krämvit en kort stund för den
// som valt mörkt läge. Det här är ett vanligt skript (inte en modul) eftersom moduler körs först
// när sidan redan har börjat ritas. Reglerna ska vara lika som i
// src/features/settings/settingsStore.js (sanitize) och applySettings.js. Ett test kontrollerar det.
(function () {
  try {
    var raw = localStorage.getItem('ms.settings');
    if (!raw) return;
    var s = JSON.parse(raw);
    var root = document.documentElement;
    var has = function (list, v) { return typeof v === 'string' && list.indexOf(v) >= 0; };
    var num = function (v, min, max) { return typeof v === 'number' && isFinite(v) ? Math.min(max, Math.max(min, v)) : null; };

    if (has(['cream', 'grey', 'blue', 'dark'], s.background)) root.dataset.bg = s.background;
    if (has(['atkinson', 'verdana', 'arial', 'opendyslexic'], s.font)) root.dataset.font = s.font;
    if (has(['system', 'reduce'], s.motion)) root.dataset.motion = s.motion;

    var size = num(s.fontSize, 18, 28);
    if (size !== null) root.style.setProperty('--fs', Math.round(size) + 'px');
    var line = num(s.lineHeight, 1.5, 2.0);
    if (line !== null) root.style.setProperty('--lh', String(Math.round(line * 100) / 100));
    var letter = num(s.letterSpacing, 0, 0.12);
    if (letter !== null) {
      letter = Math.round(letter * 100) / 100;
      root.style.setProperty('--ls', letter + 'em');
      root.style.setProperty('--ws', Math.round(letter * 1.33 * 1000) / 1000 + 'em');
    }
  } catch (e) {
    // Sparade inställningar går inte att läsa: använd standardvärdena.
  }
})();
