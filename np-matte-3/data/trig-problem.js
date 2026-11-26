// Trigonometri och Problemlösning – NP Matematik – fortsättning nivå 1b/1c (Ma3b/Ma3c), Gy25
// Uppgifter tp-001 … tp-038. Format enligt data/SCHEMA.md.
// Trigonometri (tp-001 – tp-024) gäller endast 3c. Problemlösning (tp-025 – tp-038).
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(

  // ───────────── TRIGONOMETRI – DEL A ─────────────

  {
    id: "tp-001",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Enhetscirkeln",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Punkten \\(P\\) ligger på enhetscirkeln och har koordinaterna \\((-0{,}6;\\ 0{,}8)\\). Vinkeln \\(v\\) är vinkeln mellan den positiva \\(x\\)-axeln och sträckan \\(OP\\), se figuren.</p><p>Bestäm \\(\\cos v\\).</p>",
    figur: `<svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><line x1="20" y1="135" x2="285" y2="135"/><line x1="150" y1="250" x2="150" y2="15"/><polyline points="279,129 285,135 279,141"/><polyline points="144,21 150,15 156,21"/><circle cx="150" cy="135" r="100" stroke-width="1.5"/><line x1="150" y1="135" x2="90" y2="55"/><line x1="90" y1="55" x2="90" y2="135" stroke-dasharray="6 4" stroke-width="1.2"/><line x1="90" y1="55" x2="150" y2="55" stroke-dasharray="6 4" stroke-width="1.2"/><circle cx="90" cy="55" r="3.5" fill="currentColor"/><path d="M174,135 A24,24 0 0 0 135.6,115.8" stroke-width="1.5"/><text x="167" y="106" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">v</text><text x="78" y="47" fill="currentColor" stroke="none" text-anchor="end" font-style="italic">P</text><text x="256" y="153" fill="currentColor" stroke="none">1</text><text x="142" y="29" fill="currentColor" stroke="none" text-anchor="end">1</text><text x="280" y="125" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">x</text><text x="164" y="22" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">y</text><text x="142" y="153" fill="currentColor" stroke="none" text-anchor="end">O</text></svg>`,
    svar: { varde: -0.6, tolerans: 0 },
    ledtradar: [
      "Hur definieras \\(\\sin v\\) och \\(\\cos v\\) med hjälp av enhetscirkeln? Titta på formelbladet.",
      "För en punkt \\((x;\\ y)\\) på enhetscirkeln gäller \\(\\cos v = x\\) och \\(\\sin v = y\\)."
    ],
    losning: "<p>Enligt enhetscirkelns definition är \\(\\cos v\\) lika med \\(x\\)-koordinaten för punkten på enhetscirkeln.</p><p>\\[\\cos v = -0{,}6\\]</p><p>Att \\(\\cos v\\) är negativ stämmer med att \\(v\\) är en trubbig vinkel (punkten ligger i andra kvadranten). På samma sätt är \\(\\sin v = 0{,}8\\).</p>"
  },

  {
    id: "tp-002",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Exakta värden",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Bestäm det exakta värdet av \\(\\cos 120^\\circ\\).</p>",
    svar: { varde: -0.5, tolerans: 0 },
    ledtradar: [
      "Tänk på enhetscirkeln: i vilken kvadrant hamnar punkten som hör till \\(120^\\circ\\)? Vilket tecken har \\(x\\)-koordinaten där?",
      "\\(\\cos(180^\\circ - v) = -\\cos v\\). Använd \\(v = 60^\\circ\\)."
    ],
    losning: "<p>Punkten på enhetscirkeln som hör till \\(120^\\circ\\) ligger i andra kvadranten, så \\(x\\)-koordinaten (= cosinusvärdet) är negativ.</p><p>\\[\\cos 120^\\circ = \\cos(180^\\circ - 60^\\circ) = -\\cos 60^\\circ = -\\dfrac{1}{2}\\]</p><p>Svar: \\(-0{,}5\\) (finns även i tabellen på formelbladet).</p>"
  },

  {
    id: "tp-003",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Trigonometriska ekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\(\\sin v = 0{,}5\\) för \\(0^\\circ \\le v \\le 180^\\circ\\).</p><p>Ange alla lösningar i grader.</p>",
    svar: { varden: [30, 150], tolerans: 0 },
    ledtradar: [
      "\\(\\sin v\\) är \\(y\\)-koordinaten på enhetscirkeln. Hur många punkter på den övre halvan av enhetscirkeln har \\(y = 0{,}5\\)?",
      "Använd \\(\\sin v = \\sin(180^\\circ - v)\\)."
    ],
    losning: "<ol><li>Från tabellen: \\(\\sin 30^\\circ = 0{,}5\\), så \\(v_1 = 30^\\circ\\).</li><li>Linjen \\(y = 0{,}5\\) skär den övre halvan av enhetscirkeln i två punkter, symmetriskt kring \\(y\\)-axeln. Eftersom \\(\\sin(180^\\circ - v) = \\sin v\\) är även \\(v_2 = 180^\\circ - 30^\\circ = 150^\\circ\\) en lösning.</li></ol><p>Svar: \\(v = 30^\\circ\\) eller \\(v = 150^\\circ\\).</p>"
  },

  {
    id: "tp-004",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Enhetscirkeln",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilket av följande uttryck har samma värde som \\(\\sin 140^\\circ\\)?</p>",
    svar: {
      alternativ: [
        "\\(\\sin 40^\\circ\\)",
        "\\(-\\sin 40^\\circ\\)",
        "\\(\\cos 40^\\circ\\)",
        "\\(-\\cos 40^\\circ\\)",
        "\\(\\sin 220^\\circ\\)"
      ],
      ratt: 0
    },
    ledtradar: [
      "Rita enhetscirkeln och markera vinklarna \\(40^\\circ\\) och \\(140^\\circ\\). Jämför punkternas \\(y\\)-koordinater.",
      "Punkterna är spegelbilder av varandra i \\(y\\)-axeln."
    ],
    losning: "<p>Punkterna på enhetscirkeln för \\(40^\\circ\\) och \\(140^\\circ = 180^\\circ - 40^\\circ\\) är spegelbilder i \\(y\\)-axeln. De har alltså samma \\(y\\)-koordinat men motsatta \\(x\\)-koordinater:</p><p>\\[\\sin 140^\\circ = \\sin(180^\\circ - 40^\\circ) = \\sin 40^\\circ\\]</p><p>Däremot gäller \\(\\cos 140^\\circ = -\\cos 40^\\circ\\), vilket är en vanlig förväxling. \\(\\sin 220^\\circ\\) är negativt (tredje kvadranten).</p>"
  },

  {
    id: "tp-005",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Trubbiga vinklar",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vinkeln \\(v\\) är trubbig, dvs. \\(90^\\circ \\lt v \\lt 180^\\circ\\). Vilket påstående stämmer <strong>alltid</strong>?</p>",
    svar: {
      alternativ: [
        "\\(\\sin v \\gt 0\\) och \\(\\cos v \\lt 0\\)",
        "\\(\\sin v \\lt 0\\) och \\(\\cos v \\gt 0\\)",
        "\\(\\sin v \\lt 0\\) och \\(\\cos v \\lt 0\\)",
        "\\(\\sin v \\gt 0\\) och \\(\\tan v \\gt 0\\)"
      ],
      ratt: 0
    },
    ledtradar: [
      "En trubbig vinkel motsvarar en punkt i andra kvadranten på enhetscirkeln.",
      "Vilka tecken har \\(x\\) och \\(y\\) i andra kvadranten? Och \\(\\tan v = \\dfrac{y}{x}\\)?"
    ],
    losning: "<p>För en trubbig vinkel ligger punkten \\((x;\\ y)\\) på enhetscirkeln i andra kvadranten, där \\(x \\lt 0\\) och \\(y \\gt 0\\).</p><ul><li>\\(\\sin v = y \\gt 0\\)</li><li>\\(\\cos v = x \\lt 0\\)</li><li>\\(\\tan v = \\dfrac{y}{x} \\lt 0\\)</li></ul><p>Rätt alternativ: \\(\\sin v \\gt 0\\) och \\(\\cos v \\lt 0\\).</p>"
  },

  {
    id: "tp-006",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Areasatsen",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Bestäm arean av triangeln i figuren.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 205" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="40,175 264,175 185.5,91"/><path d="M74,175 A34,34 0 0 0 69.4,158" stroke-width="1.5"/><text x="94.1" y="165.5" fill="currentColor" stroke="none" text-anchor="middle">30°</text><text x="152" y="188" fill="currentColor" stroke="none" text-anchor="middle">8 cm</text><text x="100" y="118" fill="currentColor" stroke="none" text-anchor="end">6 cm</text></svg>`,
    svar: { varde: 12, tolerans: 0, enhet: "cm²" },
    ledtradar: [
      "Du känner två sidor och den mellanliggande vinkeln. Vilken sats på formelbladet passar?",
      "Areasatsen: \\(T = \\dfrac{ab\\sin C}{2}\\), och \\(\\sin 30^\\circ = \\dfrac{1}{2}\\)."
    ],
    losning: "<p>Två sidor och den mellanliggande vinkeln är kända, så vi använder areasatsen:</p><p>\\[T = \\dfrac{6 \\cdot 8 \\cdot \\sin 30^\\circ}{2} = \\dfrac{48 \\cdot \\frac{1}{2}}{2} = 12\\]</p><p>Svar: \\(12\\ \\text{cm}^2\\).</p>"
  },

  {
    id: "tp-007",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Cosinussatsen",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Bestäm längden \\(x\\) i triangeln.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="110,165 260,165 65,87.1"/><path d="M130,165 A20,20 0 0 0 100,147.7" stroke-width="1.5"/><text x="131" y="133.6" fill="currentColor" stroke="none" text-anchor="middle">120°</text><text x="185" y="178" fill="currentColor" stroke="none" text-anchor="middle">5 cm</text><text x="80.6" y="135" fill="currentColor" stroke="none" text-anchor="end">3 cm</text><text x="165.5" y="123.6" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">x</text><text x="97.2" y="179.5" fill="currentColor" stroke="none" text-anchor="middle">A</text><text x="275.6" y="173.5" fill="currentColor" stroke="none" text-anchor="middle">B</text><text x="51.6" y="83.3" fill="currentColor" stroke="none" text-anchor="middle">C</text></svg>`,
    svar: { varde: 7, tolerans: 0, enhet: "cm" },
    ledtradar: [
      "Två sidor och den mellanliggande vinkeln är kända. Använd cosinussatsen.",
      "\\(\\cos 120^\\circ = -\\dfrac{1}{2}\\). Var noga med tecknet!"
    ],
    losning: "<p>Cosinussatsen med vinkeln \\(A = 120^\\circ\\):</p><p>\\[x^2 = 3^2 + 5^2 - 2\\cdot 3\\cdot 5\\cdot \\cos 120^\\circ = 9 + 25 - 30\\cdot\\left(-\\tfrac{1}{2}\\right) = 34 + 15 = 49\\]</p><p>\\(x = 7\\) (endast positiv rot, eftersom \\(x\\) är en längd).</p><p>Svar: \\(7\\) cm.</p><p><em>Vanligt fel:</em> att räkna med \\(\\cos 120^\\circ = +\\frac12\\), vilket ger \\(x^2 = 19\\).</p>"
  },

  {
    id: "tp-008",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Areasatsen",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Triangeln i figuren har arean \\(10\\ \\text{cm}^2\\). Bestäm längden \\(x\\).</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="200,165 300,165 101.5,38.9"/><path d="M216,165 A16,16 0 0 0 190.1,152.4" stroke-width="1.5"/><text x="214" y="141.2" fill="currentColor" stroke="none" text-anchor="middle">150°</text><text x="250" y="178" fill="currentColor" stroke="none" text-anchor="middle">5 cm</text><text x="144.4" y="111.9" fill="currentColor" stroke="none" text-anchor="end" font-style="italic">x</text></svg>`,
    svar: { varde: 8, tolerans: 0, enhet: "cm" },
    ledtradar: [
      "Ställ upp areasatsen med den okända sidan \\(x\\).",
      "\\(\\sin 150^\\circ = \\sin 30^\\circ = \\dfrac{1}{2}\\)."
    ],
    losning: "<p>Areasatsen med de två sidorna \\(5\\) och \\(x\\) och den mellanliggande vinkeln \\(150^\\circ\\):</p><p>\\[10 = \\dfrac{5\\cdot x\\cdot \\sin 150^\\circ}{2}\\]</p><p>Eftersom \\(\\sin 150^\\circ = \\sin(180^\\circ - 30^\\circ) = \\frac{1}{2}\\) blir</p><p>\\[10 = \\dfrac{5x}{4} \\quad\\Rightarrow\\quad x = 8\\]</p><p>Svar: \\(8\\) cm.</p>"
  },

  {
    id: "tp-009",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Enhetscirkeln",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>För vinkeln \\(v\\) gäller att \\(90^\\circ \\lt v \\lt 180^\\circ\\) och \\(\\sin v = \\dfrac{3}{5}\\). Bestäm \\(\\cos v\\).</p>",
    svar: {
      alternativ: [
        "\\(\\dfrac{4}{5}\\)",
        "\\(-\\dfrac{4}{5}\\)",
        "\\(-\\dfrac{3}{5}\\)",
        "\\(\\dfrac{2}{5}\\)",
        "\\(-\\dfrac{5}{3}\\)"
      ],
      ratt: 1
    },
    ledtradar: [
      "Punkten \\((\\cos v;\\ \\sin v)\\) ligger på enhetscirkeln, som har radien 1. Vad säger Pythagoras sats om \\(x\\) och \\(y\\)?",
      "\\(x^2 + y^2 = 1\\). Tänk sedan på i vilken kvadrant punkten ligger."
    ],
    losning: "<ol><li>Punkten \\((x;\\ y) = (\\cos v;\\ \\sin v)\\) ligger på enhetscirkeln, så enligt Pythagoras sats är \\(x^2 + y^2 = 1\\).</li><li>\\(x^2 = 1 - \\left(\\tfrac{3}{5}\\right)^2 = 1 - \\tfrac{9}{25} = \\tfrac{16}{25}\\), så \\(x = \\pm\\tfrac{4}{5}\\).</li><li>Vinkeln är trubbig, punkten ligger i andra kvadranten och då är \\(x \\lt 0\\).</li></ol><p>Svar: \\(\\cos v = -\\dfrac{4}{5}\\).</p>"
  },

  {
    id: "tp-010",
    kurser: ["3c"],
    del: "A",
    omrade: "Trigonometri",
    moment: "Cosinus- och areasatsen",
    niva: "A",
    poang: "0/0/1",
    typ: "val",
    fraga: "<p>En triangel har sidlängderna \\(5\\) cm, \\(7\\) cm och \\(8\\) cm. Vilken är triangelns exakta area?</p>",
    svar: {
      alternativ: [
        "\\(10\\sqrt{3}\\ \\text{cm}^2\\)",
        "\\(20\\sqrt{3}\\ \\text{cm}^2\\)",
        "\\(5\\sqrt{3}\\ \\text{cm}^2\\)",
        "\\(20\\ \\text{cm}^2\\)",
        "\\(14\\ \\text{cm}^2\\)"
      ],
      ratt: 0
    },
    ledtradar: [
      "Bestäm först en av vinklarna med cosinussatsen. Välj vinkeln mot sidan 7 cm – då blir cosinusvärdet ett värde ur tabellen.",
      "När du har vinkeln mellan sidorna 5 cm och 8 cm kan du använda areasatsen."
    ],
    losning: "<ol><li>Låt \\(v\\) vara vinkeln mellan sidorna 5 cm och 8 cm (mittemot sidan 7 cm). Cosinussatsen: \\[7^2 = 5^2 + 8^2 - 2\\cdot 5\\cdot 8\\cos v \\;\\Rightarrow\\; 49 = 89 - 80\\cos v \\;\\Rightarrow\\; \\cos v = \\dfrac{40}{80} = \\dfrac12\\]</li><li>Alltså \\(v = 60^\\circ\\) och \\(\\sin v = \\dfrac{\\sqrt3}{2}\\).</li><li>Areasatsen: \\[T = \\dfrac{5\\cdot 8\\cdot \\frac{\\sqrt3}{2}}{2} = 10\\sqrt3\\]</li></ol><p>Svar: \\(10\\sqrt{3}\\ \\text{cm}^2\\) (\\(\\approx 17{,}3\\ \\text{cm}^2\\)).</p><p><em>Vanligt fel:</em> att glömma att dela med 2 i areasatsen, vilket ger \\(20\\sqrt3\\).</p>"
  },

  // ───────────── TRIGONOMETRI – DEL B ─────────────

  {
    id: "tp-011",
    kurser: ["3c"],
    del: "B",
    omrade: "Trigonometri",
    moment: "Sinussatsen",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>I triangeln \\(ABC\\) är vinkeln \\(A = 40^\\circ\\), vinkeln \\(B = 65^\\circ\\) och sidan \\(BC = 12\\) cm. Bestäm längden \\(x\\) av sidan \\(AC\\). Svara med en decimal.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="35,180 269.4,180 203.5,38.6"/><path d="M69,180 A34,34 0 0 0 61,158.1" stroke-width="1.5"/><text x="85.7" y="166.5" fill="currentColor" stroke="none" text-anchor="middle">40°</text><path d="M241.4,180 A28,28 0 0 1 257.6,154.6" stroke-width="1.5"/><text x="228.9" y="159.2" fill="currentColor" stroke="none" text-anchor="middle">65°</text><text x="243.7" y="110.9" fill="currentColor" stroke="none">12 cm</text><text x="114.1" y="108.2" fill="currentColor" stroke="none" text-anchor="end" font-style="italic">x</text><text x="19.9" y="190.3" fill="currentColor" stroke="none" text-anchor="middle">A</text><text x="283.9" y="191.8" fill="currentColor" stroke="none" text-anchor="middle">B</text><text x="209" y="28.6" fill="currentColor" stroke="none" text-anchor="middle">C</text></svg>`,
    svar: { varde: 16.9, tolerans: 0.05, enhet: "cm" },
    ledtradar: [
      "Sidan \\(BC\\) står mittemot vinkeln \\(A\\) och sidan \\(AC\\) står mittemot vinkeln \\(B\\).",
      "Sinussatsen: \\(\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b}\\)."
    ],
    losning: "<p>Sidan \\(a = BC = 12\\) cm står mot vinkeln \\(A = 40^\\circ\\), och \\(x = AC\\) står mot vinkeln \\(B = 65^\\circ\\). Sinussatsen ger</p><p>\\[\\dfrac{\\sin 65^\\circ}{x} = \\dfrac{\\sin 40^\\circ}{12} \\quad\\Rightarrow\\quad x = \\dfrac{12\\sin 65^\\circ}{\\sin 40^\\circ} \\approx 16{,}9\\]</p><p>GeoGebra (CAS, vinklar med gradtecken): <code>Lös(sin(65°)/x = sin(40°)/12, x)</code> ger \\(x \\approx 16{,}92\\).</p><p>Svar: \\(x \\approx 16{,}9\\) cm.</p>"
  },

  {
    id: "tp-012",
    kurser: ["3c"],
    del: "B",
    omrade: "Trigonometri",
    moment: "Sinussatsen – två fall",
    niva: "C",
    poang: "1/1/0",
    typ: "flera",
    fraga: "<p>I triangeln \\(ABC\\) är \\(BC = 7{,}0\\) cm, \\(AC = 10{,}0\\) cm och vinkeln \\(A = 35^\\circ\\).</p><p>Det finns <strong>två</strong> olika trianglar som uppfyller dessa villkor. Bestäm längden av sidan \\(AB\\) i båda fallen. Svara med en decimal.</p>",
    svar: { varden: [12.2, 4.2], tolerans: 0.05 },
    ledtradar: [
      "Bestäm först vinkeln \\(B\\) med sinussatsen. Kom ihåg att \\(\\sin B = \\sin(180^\\circ - B)\\).",
      "Kontrollera att båda vinklarna för \\(B\\) ger en vinkelsumma mindre än \\(180^\\circ\\). Bestäm sedan \\(C\\) och därefter \\(AB\\).",
      "Alternativ: ställ upp cosinussatsen \\(7^2 = 10^2 + c^2 - 2\\cdot 10\\cdot c\\cos 35^\\circ\\) och lös andragradsekvationen."
    ],
    losning: "<p><strong>Metod 1 (sinussatsen):</strong></p><ol><li>\\(\\dfrac{\\sin B}{10} = \\dfrac{\\sin 35^\\circ}{7}\\) ger \\(\\sin B = \\dfrac{10\\sin 35^\\circ}{7} \\approx 0{,}8194\\).</li><li>\\(B_1 \\approx 55{,}0^\\circ\\) eller \\(B_2 = 180^\\circ - 55{,}0^\\circ \\approx 125{,}0^\\circ\\). Båda fungerar eftersom \\(35^\\circ + 125{,}0^\\circ \\lt 180^\\circ\\).</li><li>\\(C_1 \\approx 90{,}0^\\circ\\) och \\(C_2 \\approx 20{,}0^\\circ\\).</li><li>\\(AB = \\dfrac{7\\sin C}{\\sin 35^\\circ}\\) ger \\(AB_1 \\approx 12{,}2\\) cm och \\(AB_2 \\approx 4{,}2\\) cm.</li></ol><p><strong>Metod 2 (cosinussatsen i GeoGebra CAS):</strong> <code>Lös(7^2 = 10^2 + c^2 - 2*10*c*cos(35°), c)</code> ger \\(c \\approx 4{,}18\\) eller \\(c \\approx 12{,}20\\).</p><p>Svar: \\(AB \\approx 12{,}2\\) cm eller \\(AB \\approx 4{,}2\\) cm.</p>"
  },

  {
    id: "tp-013",
    kurser: ["3c"],
    del: "B",
    omrade: "Trigonometri",
    moment: "Cosinussatsen – navigation",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En segelbåt seglar \\(8{,}5\\) km rakt fram till en vändpunkt. Där ändrar den kurs och seglar \\(6{,}2\\) km till målet. Vinkeln mellan de två sträckorna vid vändpunkten är \\(128^\\circ\\), se figuren.</p><p>Hur långt är det fågelvägen från start till mål? Svara med en decimal.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><line x1="30" y1="150" x2="172.3" y2="124.9"/><line x1="172.3" y1="124.9" x2="221.8" y2="31.8"/><line x1="30" y1="150" x2="221.8" y2="31.8" stroke-dasharray="6 4"/><path d="M156.5,127.7 A16,16 0 0 1 179.8,110.8" stroke-width="1.5"/><text x="153.5" y="104" fill="currentColor" stroke="none" text-anchor="middle">128°</text><text x="102.5" y="150.3" fill="currentColor" stroke="none" text-anchor="middle">8,5 km</text><text x="204.1" y="87.1" fill="currentColor" stroke="none">6,2 km</text><circle cx="30" cy="150" r="3.5" fill="currentColor"/><circle cx="172.3" cy="124.9" r="3.5" fill="currentColor"/><circle cx="221.8" cy="31.8" r="3.5" fill="currentColor"/><text x="28" y="172" fill="currentColor" stroke="none" text-anchor="middle">Start</text><text x="176.3" y="148.9" fill="currentColor" stroke="none" text-anchor="middle">Vändpunkt</text><text x="229.8" y="25.8" fill="currentColor" stroke="none">Mål</text></svg>`,
    svar: { varde: 13.3, tolerans: 0.05, enhet: "km" },
    ledtradar: [
      "Start, vändpunkt och mål bildar en triangel där två sidor och den mellanliggande vinkeln är kända.",
      "Använd cosinussatsen."
    ],
    losning: "<p>Kalla avståndet start–mål för \\(d\\). Cosinussatsen med vinkeln \\(128^\\circ\\) vid vändpunkten:</p><p>\\[d^2 = 8{,}5^2 + 6{,}2^2 - 2\\cdot 8{,}5\\cdot 6{,}2\\cdot\\cos 128^\\circ \\approx 175{,}6\\]</p><p>\\(d \\approx 13{,}3\\) km.</p><p>GeoGebra: <code>sqrt(8.5^2 + 6.2^2 - 2*8.5*6.2*cos(128°))</code> ger \\(13{,}25\\).</p><p>Svar: ca \\(13{,}3\\) km.</p>"
  },

  {
    id: "tp-014",
    kurser: ["3c"],
    del: "B",
    omrade: "Trigonometri",
    moment: "Cosinussatsen – optimering",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>I en triangel är vinkeln mellan två av sidorna \\(120^\\circ\\). Summan av längderna av dessa två sidor är \\(10\\) cm.</p><p>Bestäm den minsta möjliga längden av triangelns tredje sida.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="120,160 270,160 70,73.4"/><path d="M138,160 A18,18 0 0 0 111,144.4" stroke-width="1.5"/><text x="140" y="130.4" fill="currentColor" stroke="none" text-anchor="middle">120°</text><text x="195" y="173" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">10 − x</text><text x="88.1" y="125.7" fill="currentColor" stroke="none" text-anchor="end" font-style="italic">x</text><text x="173.2" y="114.4" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">c</text></svg>`,
    svar: { facit: "Minsta längden är \\(\\sqrt{75} = 5\\sqrt3 \\approx 8{,}7\\) cm (när båda sidorna är 5 cm)." },
    ledtradar: [
      "Kalla den ena sidan \\(x\\). Hur lång är då den andra sidan?",
      "Uttryck den tredje sidan \\(c\\) med cosinussatsen som en funktion av \\(x\\). Vilken definitionsmängd har funktionen?",
      "Bestäm minimum, t.ex. med <code>Extrempunkt()</code> eller genom att lösa \\(c'(x) = 0\\)."
    ],
    losning: "<ol><li>Låt sidorna vara \\(x\\) och \\(10 - x\\), där \\(0 \\lt x \\lt 10\\).</li><li>Cosinussatsen med \\(\\cos 120^\\circ = -\\frac12\\): \\[c^2 = x^2 + (10-x)^2 - 2x(10-x)\\cos 120^\\circ = x^2 + (10-x)^2 + x(10-x) = x^2 - 10x + 100\\]</li><li>Modell: \\(c(x) = \\sqrt{x^2 - 10x + 100}\\), \\(0 \\lt x \\lt 10\\).</li><li>GeoGebra: <code>c(x) = sqrt(x^2 - 10x + 100)</code>, <code>Extrempunkt(c, 0, 10)</code> ger \\((5;\\ 8{,}66)\\). Alternativt: <code>Lös(Derivata(c(x)) = 0, x)</code> ger \\(x = 5\\).</li><li>Det är ett minimum: \\(c^2 = (x-5)^2 + 75 \\ge 75\\) för alla \\(x\\).</li><li>\\(c(5) = \\sqrt{75} = 5\\sqrt3 \\approx 8{,}66\\).</li></ol><p>Svar: Den tredje sidan är minst \\(5\\sqrt3 \\approx 8{,}7\\) cm, vilket inträffar när båda sidorna är 5 cm.</p>",
    bedomning: [
      "+C<sub>PL</sub> för korrekt tillämpning av cosinussatsen med sidorna \\(x\\) och \\(10-x\\), t.ex. \\(c^2 = x^2 + (10-x)^2 + x(10-x)\\)",
      "+A<sub>M</sub> för en korrekt modell för den tredje sidan (eller dess kvadrat) som funktion av en variabel, med rimlig definitionsmängd",
      "+A<sub>PL</sub> för att med godtagbar metod bestämma den minsta längden till ca \\(8{,}7\\) cm och visa att det är ett minimum"
    ]
  },

  {
    id: "tp-015",
    kurser: ["3c"],
    del: "B",
    omrade: "Trigonometri",
    moment: "Sinussatsen – lantmäteri",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En lantmätare vill bestämma höjden \\(h\\) av ett radiotorn. Hon mäter höjdvinkeln till tornets topp \\(T\\) från två punkter \\(A\\) och \\(B\\) som ligger på en rät linje mot tornets fot, på samma horisontella mark. Avståndet \\(AB = 50\\) m. Från \\(A\\) är höjdvinkeln \\(32^\\circ\\) och från \\(B\\) är den \\(47^\\circ\\).</p><p>Bestäm tornets höjd \\(h\\). Svara i hela meter.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 320 225" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><line x1="10" y1="195" x2="310" y2="195" stroke-width="1.5"/><line x1="295" y1="195" x2="295" y2="52.7" stroke-width="3"/><line x1="67.3" y1="195" x2="295" y2="52.7"/><line x1="162.3" y1="195" x2="295" y2="52.7"/><polyline points="285,195 285,185 295,185" stroke-width="1.5"/><path d="M101.3,195 A34,34 0 0 0 96.2,177" stroke-width="1.5"/><text x="121.2" y="184.6" fill="currentColor" stroke="none" text-anchor="middle">32°</text><path d="M188.3,195 A26,26 0 0 0 180.1,176" stroke-width="1.5"/><text x="204.5" y="181.7" fill="currentColor" stroke="none" text-anchor="middle">47°</text><text x="67.3" y="214" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">A</text><text x="162.3" y="214" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">B</text><text x="114.8" y="214" fill="currentColor" stroke="none" text-anchor="middle">50 m</text><text x="295" y="44.7" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">T</text><text x="285" y="123.9" fill="currentColor" stroke="none" text-anchor="end" font-style="italic">h</text></svg>`,
    svar: { varde: 75, tolerans: 0.5, enhet: "m" },
    ledtradar: [
      "Titta på triangeln \\(ABT\\). Bestäm alla dess vinklar – vinkeln vid \\(B\\) är sidovinkel till \\(47^\\circ\\).",
      "Använd sinussatsen i triangeln \\(ABT\\) för att bestämma \\(BT\\). Använd sedan den rätvinkliga triangeln med \\(BT\\) som hypotenusa."
    ],
    losning: "<ol><li>I triangeln \\(ABT\\): vinkeln vid \\(B\\) är \\(180^\\circ - 47^\\circ = 133^\\circ\\), och vinkeln vid \\(T\\) är \\(180^\\circ - 32^\\circ - 133^\\circ = 15^\\circ\\).</li><li>Sinussatsen: \\(\\dfrac{BT}{\\sin 32^\\circ} = \\dfrac{50}{\\sin 15^\\circ}\\) ger \\(BT = \\dfrac{50\\sin 32^\\circ}{\\sin 15^\\circ} \\approx 102{,}4\\) m.</li><li>I den rätvinkliga triangeln med hypotenusan \\(BT\\): \\(h = BT\\sin 47^\\circ \\approx 74{,}9\\) m.</li></ol><p>GeoGebra: <code>50*sin(32°)/sin(15°)*sin(47°)</code> ger \\(74{,}87\\).</p><p>Svar: ca \\(75\\) m.</p>"
  },

  // ───────────── TRIGONOMETRI – DEL C ─────────────

  {
    id: "tp-016",
    kurser: ["3c"],
    del: "C",
    omrade: "Trigonometri",
    moment: "Areasatsen – tomter",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En triangelformad tomt har två sidor som är \\(45\\) m och \\(62\\) m. Vinkeln mellan dessa sidor är \\(105^\\circ\\).</p><p>Bestäm tomtens area. Svara i hela kvadratmeter.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="70,170 280.8,170 30.4,22.2"/><path d="M92,170 A22,22 0 0 0 64.3,148.7" stroke-width="1.5"/><text x="96.8" y="140.1" fill="currentColor" stroke="none" text-anchor="middle">105°</text><text x="175.4" y="183" fill="currentColor" stroke="none" text-anchor="middle">62 m</text><text x="42.5" y="103.2" fill="currentColor" stroke="none" text-anchor="end">45 m</text></svg>`,
    svar: { varde: 1347, tolerans: 0.5, enhet: "m²" },
    ledtradar: [
      "Två sidor och den mellanliggande vinkeln är kända.",
      "Areasatsen: \\(T = \\dfrac{ab\\sin C}{2}\\)."
    ],
    losning: "<p>Areasatsen:</p><p>\\[T = \\dfrac{45\\cdot 62\\cdot \\sin 105^\\circ}{2} \\approx \\dfrac{2790\\cdot 0{,}9659}{2} \\approx 1347\\]</p><p>Svar: ca \\(1\\,347\\ \\text{m}^2\\).</p><p><em>Kontroll:</em> \\(\\sin 105^\\circ = \\sin 75^\\circ \\approx 0{,}966\\), alltså positivt – arean blir positiv även för en trubbig vinkel.</p>"
  },

  {
    id: "tp-017",
    kurser: ["3c"],
    del: "C",
    omrade: "Trigonometri",
    moment: "Cosinussatsen",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En trädgårdsrabatt har formen av en triangel. Två av sidorna är \\(14\\) m och \\(9\\) m och vinkeln mellan dem är \\(72^\\circ\\). Bestäm längden \\(x\\) av den tredje sidan. Svara med en decimal.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="40,170 278,170 87.3,24.5"/><path d="M64,170 A24,24 0 0 0 47.4,147.2" stroke-width="1.5"/><text x="74" y="150.3" fill="currentColor" stroke="none" text-anchor="middle">72°</text><text x="159" y="183" fill="currentColor" stroke="none" text-anchor="middle">14 m</text><text x="56" y="99.8" fill="currentColor" stroke="none" text-anchor="end">9 m</text><text x="187.5" y="95.9" fill="currentColor" stroke="none" font-style="italic">x</text></svg>`,
    svar: { varde: 14.1, tolerans: 0.05, enhet: "m" },
    ledtradar: [
      "Två sidor och den mellanliggande vinkeln är kända – vilken sats ger den tredje sidan?",
      "\\(x^2 = 14^2 + 9^2 - 2\\cdot 14\\cdot 9\\cos 72^\\circ\\)"
    ],
    losning: "<p>Cosinussatsen:</p><p>\\[x^2 = 14^2 + 9^2 - 2\\cdot 14\\cdot 9\\cdot \\cos 72^\\circ = 196 + 81 - 252\\cdot 0{,}3090 \\approx 199{,}1\\]</p><p>\\(x \\approx \\sqrt{199{,}1} \\approx 14{,}1\\) m.</p><p>Svar: ca \\(14{,}1\\) m.</p>"
  },

  {
    id: "tp-018",
    kurser: ["3c"],
    del: "C",
    omrade: "Trigonometri",
    moment: "Cosinussatsen – vinkel",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En triangel har sidorna \\(4\\) cm, \\(6\\) cm och \\(9\\) cm. Bestäm triangelns största vinkel. Svara med en decimal.</p>",
    svar: { varde: 127.2, tolerans: 0.05, enhet: "°" },
    ledtradar: [
      "Den största vinkeln står mittemot den längsta sidan.",
      "Lös ut \\(\\cos v\\) ur cosinussatsen \\(9^2 = 4^2 + 6^2 - 2\\cdot 4\\cdot 6\\cos v\\). Ett negativt värde betyder att vinkeln är trubbig."
    ],
    losning: "<ol><li>Den största vinkeln \\(v\\) står mittemot sidan 9 cm.</li><li>Cosinussatsen: \\(81 = 16 + 36 - 48\\cos v\\), dvs. \\(48\\cos v = -29\\) och \\(\\cos v = -\\dfrac{29}{48} \\approx -0{,}6042\\).</li><li>\\(v = \\cos^{-1}(-0{,}6042) \\approx 127{,}2^\\circ\\). Cosinusvärdet är negativt, så vinkeln är trubbig, vilket räknaren också ger direkt.</li></ol><p>Svar: ca \\(127{,}2^\\circ\\).</p>"
  },

  {
    id: "tp-019",
    kurser: ["3c"],
    del: "C",
    omrade: "Trigonometri",
    moment: "Area- och cosinussatsen – två fall",
    niva: "A",
    poang: "0/2/1",
    typ: "redovisning",
    fraga: "<p>I triangeln \\(ABC\\) är \\(BC = 8\\) cm och \\(AC = 5\\) cm. Triangelns area är \\(12\\ \\text{cm}^2\\).</p><p>Bestäm alla möjliga längder av sidan \\(AB\\).</p>",
    svar: { facit: "\\(AB = 5{,}0\\) cm eller \\(AB = \\sqrt{153} \\approx 12{,}4\\) cm." },
    ledtradar: [
      "Använd areasatsen för att bestämma \\(\\sin C\\), där \\(C\\) är vinkeln mellan de kända sidorna.",
      "Ekvationen \\(\\sin C = k\\) har två lösningar mellan \\(0^\\circ\\) och \\(180^\\circ\\) – en spetsig och en trubbig vinkel.",
      "Använd cosinussatsen för varje vinkel."
    ],
    losning: "<ol><li>Areasatsen: \\(12 = \\dfrac{8\\cdot 5\\cdot \\sin C}{2} = 20\\sin C\\), så \\(\\sin C = 0{,}6\\).</li><li>Två möjliga vinklar: \\(C_1 \\approx 36{,}87^\\circ\\) eller \\(C_2 = 180^\\circ - 36{,}87^\\circ \\approx 143{,}13^\\circ\\). Båda ger en giltig triangel.</li><li>Cosinussatsen: \\(AB^2 = 8^2 + 5^2 - 2\\cdot 8\\cdot 5\\cos C = 89 - 80\\cos C\\).<ul><li>\\(C_1\\): \\(\\cos C_1 = 0{,}8\\) ger \\(AB^2 = 89 - 64 = 25\\), \\(AB = 5{,}0\\) cm.</li><li>\\(C_2\\): \\(\\cos C_2 = -0{,}8\\) ger \\(AB^2 = 89 + 64 = 153\\), \\(AB \\approx 12{,}4\\) cm.</li></ul></li></ol><p>Svar: \\(AB = 5{,}0\\) cm eller \\(AB \\approx 12{,}4\\) cm.</p>",
    bedomning: [
      "+C<sub>P</sub> för att med areasatsen bestämma \\(\\sin C = 0{,}6\\) (eller \\(C \\approx 36{,}9^\\circ\\))",
      "+C<sub>PL</sub> för att inse att det finns två möjliga vinklar, \\(C \\approx 36{,}9^\\circ\\) och \\(C \\approx 143{,}1^\\circ\\)",
      "+A<sub>PL</sub> för att med cosinussatsen korrekt bestämma båda längderna, \\(5{,}0\\) cm och \\(12{,}4\\) cm"
    ]
  },

  {
    id: "tp-020",
    kurser: ["3c"],
    del: "C",
    omrade: "Trigonometri",
    moment: "Bevis av areasatsen",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Triangeln \\(ABC\\) i figuren är spetsvinklig. Sträckan \\(AD\\) är höjden mot sidan \\(BC\\).</p><p>Bevisa areasatsen, dvs. att triangelns area \\(T\\) kan skrivas \\[T = \\dfrac{ab\\sin C}{2}\\]</p>",
    figur: `<svg viewBox="0 0 300 205" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="180,40 270,175 40,175"/><line x1="180" y1="40" x2="180" y2="175" stroke-dasharray="6 4" stroke-width="1.5"/><polyline points="190,175 190,165 180,165" stroke-width="1.5"/><path d="M70,175 A30,30 0 0 0 61.6,154.2" stroke-width="1.5"/><text x="82.7" y="162.8" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">C</text><text x="182.9" y="29.3" fill="currentColor" stroke="none" text-anchor="middle">A</text><text x="284.7" y="186.2" fill="currentColor" stroke="none" text-anchor="middle">B</text><text x="25" y="185.5" fill="currentColor" stroke="none" text-anchor="middle">C</text><text x="180" y="195" fill="currentColor" stroke="none" text-anchor="middle">D</text><text x="155" y="193" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">a</text><text x="104.4" y="106.7" fill="currentColor" stroke="none" text-anchor="end" font-style="italic">b</text><text x="188" y="110" fill="currentColor" stroke="none" font-style="italic">h</text></svg>`,
    svar: { facit: "I den rätvinkliga triangeln \\(ADC\\) är \\(\\sin C = \\dfrac{h}{b}\\), så \\(h = b\\sin C\\). Insatt i \\(T = \\dfrac{a\\cdot h}{2}\\) ger det \\(T = \\dfrac{ab\\sin C}{2}\\)." },
    ledtradar: [
      "Börja med den vanliga areaformeln för en triangel: bas gånger höjd delat med 2. Vilken är basen och vilken är höjden?",
      "Titta på den rätvinkliga triangeln \\(ADC\\). Uttryck \\(h\\) med hjälp av \\(b\\) och vinkeln \\(C\\)."
    ],
    losning: "<ol><li>Med basen \\(BC = a\\) och höjden \\(AD = h\\) är \\(T = \\dfrac{a\\cdot h}{2}\\).</li><li>Triangeln \\(ADC\\) är rätvinklig vid \\(D\\), med hypotenusan \\(AC = b\\). Sinus för vinkeln \\(C\\) är motstående katet genom hypotenusan: \\[\\sin C = \\dfrac{h}{b} \\quad\\Rightarrow\\quad h = b\\sin C\\]</li><li>Insättning ger \\[T = \\dfrac{a\\cdot b\\sin C}{2} = \\dfrac{ab\\sin C}{2}\\] V.S.B.</li></ol><p><em>Kommentar:</em> Om vinkeln \\(C\\) är trubbig hamnar \\(D\\) utanför triangeln. Då är \\(h = b\\sin(180^\\circ - C) = b\\sin C\\), så satsen gäller även då.</p>",
    bedomning: [
      "+E<sub>R</sub> för att ur den rätvinkliga triangeln \\(ADC\\) uttrycka höjden som \\(h = b\\sin C\\)",
      "+C<sub>R</sub> för ett fullständigt och generellt bevis där \\(h = b\\sin C\\) sätts in i \\(T = \\frac{ah}{2}\\) med tydligt motiverade steg"
    ]
  },

  {
    id: "tp-021",
    kurser: ["3c"],
    del: "C",
    omrade: "Trigonometri",
    moment: "Bevis av sinussatsen",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Figuren visar en triangel \\(ABC\\) med sidorna \\(a\\), \\(b\\) och \\(c\\).</p><p>Bevisa sinussatsen \\[\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b} = \\dfrac{\\sin C}{c}\\] Du får utgå från att areasatsen gäller.</p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="40,170 270,170 170,40"/><text x="25" y="180.4" fill="currentColor" stroke="none" text-anchor="middle">A</text><text x="284.9" y="180.9" fill="currentColor" stroke="none" text-anchor="middle">B</text><text x="171.8" y="29.1" fill="currentColor" stroke="none" text-anchor="middle">C</text><text x="226.3" y="105.1" fill="currentColor" stroke="none" font-style="italic">a</text><text x="99.3" y="104.3" fill="currentColor" stroke="none" text-anchor="end" font-style="italic">b</text><text x="155" y="183" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">c</text></svg>`,
    svar: { facit: "Arean kan skrivas på tre sätt: \\(T = \\frac{bc\\sin A}{2} = \\frac{ac\\sin B}{2} = \\frac{ab\\sin C}{2}\\). Multiplicera alla led med \\(\\frac{2}{abc}\\): \\(\\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}\\)." },
    ledtradar: [
      "Areasatsen kan användas med vilken vinkel som helst, så länge du använder de två sidor som bildar vinkeln.",
      "Skriv triangelns area på tre olika sätt och sätt uttrycken lika med varandra.",
      "Vad händer om du dividerar alla led med \\(abc\\)?"
    ],
    losning: "<ol><li>Triangelns area \\(T\\) kan med areasatsen skrivas med var och en av vinklarna och de sidor som bildar vinkeln: \\[T = \\dfrac{bc\\sin A}{2} = \\dfrac{ac\\sin B}{2} = \\dfrac{ab\\sin C}{2}\\]</li><li>Multiplicera alla led med 2: \\(bc\\sin A = ac\\sin B = ab\\sin C\\).</li><li>Dividera alla led med \\(abc\\) (som är skilt från noll eftersom det är sidlängder): \\[\\dfrac{bc\\sin A}{abc} = \\dfrac{ac\\sin B}{abc} = \\dfrac{ab\\sin C}{abc}\\]</li><li>Förenkla: \\[\\dfrac{\\sin A}{a} = \\dfrac{\\sin B}{b} = \\dfrac{\\sin C}{c}\\] V.S.B.</li></ol>",
    bedomning: [
      "+C<sub>R</sub> för att uttrycka triangelns area på minst två sätt med areasatsen och sätta uttrycken lika",
      "+A<sub>R</sub> för ett fullständigt och generellt bevis som omfattar alla tre kvoterna",
      "+A<sub>K</sub> för en välstrukturerad redovisning där stegen motiveras (t.ex. varför man får dividera med \\(abc\\)) och korrekt matematiskt språk används"
    ]
  },

  {
    id: "tp-022",
    kurser: ["3c"],
    del: "C",
    omrade: "Trigonometri",
    moment: "Bevis av cosinussatsen",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Triangeln \\(ABC\\) i figuren är spetsvinklig. Sträckan \\(CD\\) är höjden \\(h\\) mot sidan \\(AB\\), och \\(AD = x\\).</p><p>Bevisa cosinussatsen \\[a^2 = b^2 + c^2 - 2bc\\cos A\\]</p>",
    figur: `<svg viewBox="0 0 300 218" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="40,170 270,170 120,40"/><line x1="120" y1="40" x2="120" y2="170" stroke-dasharray="6 4" stroke-width="1.5"/><polyline points="130,170 130,160 120,160" stroke-width="1.5"/><path d="M62,170 A22,22 0 0 0 51.5,151.3" stroke-width="1.5"/><text x="25.2" y="181.2" fill="currentColor" stroke="none" text-anchor="middle">A</text><text x="285.1" y="180.2" fill="currentColor" stroke="none" text-anchor="middle">B</text><text x="115.8" y="29.6" fill="currentColor" stroke="none" text-anchor="middle">C</text><text x="120" y="190" fill="currentColor" stroke="none" text-anchor="middle">D</text><text x="200.2" y="104" fill="currentColor" stroke="none" font-style="italic">a</text><text x="73.2" y="105.8" fill="currentColor" stroke="none" text-anchor="end" font-style="italic">b</text><text x="128" y="110" fill="currentColor" stroke="none" font-style="italic">h</text><text x="88" y="162" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">x</text><text x="195" y="162" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">c − x</text><path d="M40,192 L270,192" stroke-width="1"/><path d="M40,186 L40,198 M270,186 L270,198" stroke-width="1"/><text x="155" y="210" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">c</text></svg>`,
    svar: { facit: "Pythagoras i \\(BDC\\): \\(a^2 = h^2 + (c-x)^2 = h^2 + x^2 + c^2 - 2cx\\). Pythagoras i \\(ADC\\): \\(h^2 + x^2 = b^2\\). Alltså \\(a^2 = b^2 + c^2 - 2cx\\), och eftersom \\(x = b\\cos A\\) blir \\(a^2 = b^2 + c^2 - 2bc\\cos A\\)." },
    ledtradar: [
      "Det finns två rätvinkliga trianglar i figuren, \\(ADC\\) och \\(BDC\\). Använd Pythagoras sats i båda.",
      "I triangeln \\(BDC\\) är kateterna \\(h\\) och \\(c - x\\). Utveckla kvadraten.",
      "Uttryck \\(x\\) med hjälp av \\(b\\) och \\(\\cos A\\) i triangeln \\(ADC\\)."
    ],
    losning: "<ol><li>Triangeln \\(BDC\\) är rätvinklig vid \\(D\\) med kateterna \\(h\\) och \\(c-x\\). Pythagoras sats: \\[a^2 = h^2 + (c-x)^2 = h^2 + x^2 - 2cx + c^2\\]</li><li>Triangeln \\(ADC\\) är rätvinklig vid \\(D\\) med hypotenusan \\(b\\). Pythagoras sats: \\(h^2 + x^2 = b^2\\). Insättning ger \\[a^2 = b^2 + c^2 - 2cx\\]</li><li>I triangeln \\(ADC\\) är \\(\\cos A = \\dfrac{x}{b}\\), dvs. \\(x = b\\cos A\\).</li><li>Alltså \\[a^2 = b^2 + c^2 - 2bc\\cos A\\] V.S.B.</li></ol>",
    bedomning: [
      "+C<sub>R</sub> för att korrekt tillämpa Pythagoras sats i båda de rätvinkliga trianglarna",
      "+A<sub>R</sub> för att eliminera \\(h\\) och använda \\(x = b\\cos A\\) så att ett fullständigt och generellt bevis erhålls",
      "+A<sub>K</sub> för en välstrukturerad redovisning med tydligt angivna trianglar och motiverade steg"
    ]
  },

  {
    id: "tp-023",
    kurser: ["3c"],
    del: "C",
    omrade: "Trigonometri",
    moment: "Cosinussatsen – navigation",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Två fartyg lämnar samma hamn samtidigt. Fartyg A håller kursen \\(040^\\circ\\) med farten 18 knop och fartyg B håller kursen \\(155^\\circ\\) med farten 24 knop. Kurser mäts medurs från norr och 1 knop = 1 nautisk mil per timme.</p><p>Hur långt från varandra är fartygen efter 1,5 timmar? Svara i nautiska mil med en decimal.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><line x1="100" y1="105" x2="100" y2="35" stroke-width="1.5"/><polyline points="94,41 100,35 106,41" stroke-width="1.5"/><text x="100" y="28" fill="currentColor" stroke="none" text-anchor="middle">N</text><line x1="100" y1="105" x2="162.5" y2="30.5"/><line x1="100" y1="105" x2="154.8" y2="222.5"/><line x1="162.5" y1="30.5" x2="154.8" y2="222.5" stroke-dasharray="6 4"/><path d="M100,83 A22,22 0 0 1 114.1,88.1" stroke-width="1.5"/><text x="113" y="74" fill="currentColor" stroke="none" text-anchor="middle">40°</text><path d="M100,55 A50,50 0 0 1 121.1,150.3" stroke-width="1.5"/><text x="124" y="120" fill="currentColor" stroke="none" text-anchor="middle">155°</text><circle cx="100" cy="105" r="3.5" fill="currentColor"/><circle cx="162.5" cy="30.5" r="3.5" fill="currentColor"/><circle cx="154.8" cy="222.5" r="3.5" fill="currentColor"/><text x="90" y="123" fill="currentColor" stroke="none" text-anchor="end">Hamn</text><text x="170.5" y="34.5" fill="currentColor" stroke="none">Fartyg A</text><text x="164.8" y="227.5" fill="currentColor" stroke="none">Fartyg B</text></svg>`,
    svar: { varde: 53.4, tolerans: 0.05, enhet: "nautiska mil" },
    ledtradar: [
      "Hur långt har varje fartyg färdats efter 1,5 timmar?",
      "Vinkeln mellan fartygens kurser är skillnaden mellan kursvinklarna: \\(155^\\circ - 40^\\circ\\).",
      "Använd cosinussatsen."
    ],
    losning: "<ol><li>Sträckor: fartyg A \\(18\\cdot 1{,}5 = 27\\) nautiska mil, fartyg B \\(24\\cdot 1{,}5 = 36\\) nautiska mil.</li><li>Vinkeln vid hamnen: \\(155^\\circ - 40^\\circ = 115^\\circ\\).</li><li>Cosinussatsen: \\[d^2 = 27^2 + 36^2 - 2\\cdot 27\\cdot 36\\cdot \\cos 115^\\circ \\approx 729 + 1296 + 821{,}6 = 2846{,}6\\]</li><li>\\(d \\approx 53{,}4\\) nautiska mil.</li></ol><p>Svar: ca \\(53{,}4\\) nautiska mil.</p>"
  },

  {
    id: "tp-024",
    kurser: ["3c"],
    del: "C",
    omrade: "Trigonometri",
    moment: "Enhetscirkeln – samband",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Punkten \\(P\\) på enhetscirkeln hör till vinkeln \\(v\\), där \\(0^\\circ \\lt v \\lt 90^\\circ\\). Punkten \\(Q\\) är spegelbilden av \\(P\\) i \\(y\\)-axeln, se figuren.</p><p>Visa med hjälp av enhetscirkeln att \\[\\sin(180^\\circ - v) = \\sin v \\quad\\text{och}\\quad \\cos(180^\\circ - v) = -\\cos v\\]</p>",
    figur: `<svg viewBox="0 0 300 260" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><line x1="20" y1="140" x2="285" y2="140"/><line x1="150" y1="250" x2="150" y2="15"/><polyline points="279,134 285,140 279,146"/><polyline points="144,21 150,15 156,21"/><circle cx="150" cy="140" r="100" stroke-width="1.5"/><line x1="150" y1="140" x2="231.9" y2="82.6"/><line x1="150" y1="140" x2="68.1" y2="82.6"/><line x1="231.9" y1="82.6" x2="68.1" y2="82.6" stroke-dasharray="6 4" stroke-width="1.2"/><line x1="231.9" y1="82.6" x2="231.9" y2="140" stroke-dasharray="6 4" stroke-width="1.2"/><line x1="68.1" y1="82.6" x2="68.1" y2="140" stroke-dasharray="6 4" stroke-width="1.2"/><circle cx="231.9" cy="82.6" r="3.5" fill="currentColor"/><circle cx="68.1" cy="82.6" r="3.5" fill="currentColor"/><path d="M180,140 A30,30 0 0 0 174.6,122.8" stroke-width="1.5"/><text x="190.1" y="132.4" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">v</text><path d="M120,140 A30,30 0 0 1 125.4,122.8" stroke-width="1.5"/><text x="109.9" y="132.4" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">v</text><text x="239.9" y="76.6" fill="currentColor" stroke="none" font-style="italic">P</text><text x="60.1" y="76.6" fill="currentColor" stroke="none" text-anchor="end" font-style="italic">Q</text><text x="280" y="130" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">x</text><text x="164" y="22" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">y</text><text x="256" y="158" fill="currentColor" stroke="none">1</text></svg>`,
    svar: { facit: "\\(P = (\\cos v;\\ \\sin v)\\). Speglingen i \\(y\\)-axeln ger \\(Q = (-\\cos v;\\ \\sin v)\\). \\(OQ\\) bildar vinkeln \\(v\\) med negativa \\(x\\)-axeln, alltså vinkeln \\(180^\\circ - v\\) med positiva \\(x\\)-axeln, så \\(Q = (\\cos(180^\\circ - v);\\ \\sin(180^\\circ - v))\\). Jämför koordinaterna." },
    ledtradar: [
      "Vilka koordinater har \\(P\\) enligt enhetscirkelns definition?",
      "Vad händer med koordinaterna vid spegling i \\(y\\)-axeln?",
      "Vilken vinkel bildar \\(OQ\\) med den positiva \\(x\\)-axeln? Skriv \\(Q\\):s koordinater på två sätt."
    ],
    losning: "<ol><li>Enligt definitionen är \\(P = (\\cos v;\\ \\sin v)\\).</li><li>Vid spegling i \\(y\\)-axeln byter \\(x\\)-koordinaten tecken medan \\(y\\)-koordinaten är oförändrad: \\(Q = (-\\cos v;\\ \\sin v)\\).</li><li>Speglingen bevarar vinklar, så \\(OQ\\) bildar vinkeln \\(v\\) med den negativa \\(x\\)-axeln. Vinkeln från den positiva \\(x\\)-axeln till \\(OQ\\) är därför \\(180^\\circ - v\\). Enligt definitionen är då \\(Q = (\\cos(180^\\circ - v);\\ \\sin(180^\\circ - v))\\).</li><li>Jämför koordinaterna: \\[\\cos(180^\\circ - v) = -\\cos v, \\qquad \\sin(180^\\circ - v) = \\sin v\\] V.S.V.</li></ol>",
    bedomning: [
      "+E<sub>R</sub> för att ange koordinaterna \\(P = (\\cos v;\\ \\sin v)\\) och \\(Q = (-\\cos v;\\ \\sin v)\\)",
      "+C<sub>R</sub> för en fullständig motivering av att \\(Q\\) hör till vinkeln \\(180^\\circ - v\\) och att båda sambanden följer"
    ]
  },

  // ───────────── PROBLEMLÖSNING – DEL A ─────────────

  {
    id: "tp-025",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Programmering – numerisk derivata",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Programmet nedan är skrivet i Python.</p><pre><code>def f(x):\n    return x**2\n\na = 3\nh = 0.001\nk = (f(a + h) - f(a)) / h\nprint(round(k, 4))</code></pre><p>Vilket tal skrivs ut när programmet körs?</p>",
    svar: {
      alternativ: [
        "\\(6{,}001\\)",
        "\\(9{,}006\\)",
        "\\(0{,}006\\)",
        "\\(3{,}001\\)"
      ],
      ratt: 0
    },
    ledtradar: [
      "Beräkna \\(f(3{,}001)\\) och \\(f(3)\\) för \\(f(x) = x^2\\).",
      "Programmet beräknar en ändringskvot: \\(\\dfrac{f(a+h) - f(a)}{h}\\)."
    ],
    losning: "<ol><li>\\(f(a+h) = 3{,}001^2 = 9{,}006001\\) och \\(f(a) = 9\\).</li><li>\\(f(a+h) - f(a) = 0{,}006001\\).</li><li>\\(k = \\dfrac{0{,}006001}{0{,}001} = 6{,}001\\).</li></ol><p>Programmet skriver ut <code>6.001</code>. Ändringskvoten är en numerisk uppskattning av derivatan \\(f'(3) = 2\\cdot 3 = 6\\).</p>"
  },

  {
    id: "tp-026",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Programmering – iteration",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>I en fiskodling ökar fiskens totala massa med 50 % varje år, och efter varje års tillväxt skördas 50 ton. Programmet nedan simulerar odlingen under några år, med start på 200 ton.</p><pre><code>x = 200\nfor ar in range(3):\n    x = 1.5 * x - 50\nprint(x)</code></pre><p>Vilket tal skrivs ut?</p>",
    svar: { varde: 437.5, tolerans: 0, enhet: "ton" },
    ledtradar: [
      "<code>range(3)</code> betyder att loopen körs tre gånger.",
      "Räkna varv för varv: efter första varvet är <code>x</code> \\(= 1{,}5\\cdot 200 - 50\\)."
    ],
    losning: "<ol><li>Varv 1: \\(x = 1{,}5\\cdot 200 - 50 = 250\\)</li><li>Varv 2: \\(x = 1{,}5\\cdot 250 - 50 = 325\\)</li><li>Varv 3: \\(x = 1{,}5\\cdot 325 - 50 = 487{,}5 - 50 = 437{,}5\\)</li></ol><p>Programmet skriver ut <code>437.5</code>, dvs. odlingen har 437,5 ton fisk efter tre år.</p>"
  },

  {
    id: "tp-027",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Matematikens historia",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Differential- och integralkalkylen utvecklades under senare delen av 1600-talet av två matematiker, oberoende av varandra. Det ledde till en lång och bitter strid om vem som var först. Beteckningarna \\(\\dfrac{dy}{dx}\\) och \\(\\displaystyle\\int\\) som vi använder i dag kommer från en av dem.</p><p>Vilka två matematiker avses?</p>",
    svar: {
      alternativ: [
        "Isaac Newton och Gottfried Wilhelm Leibniz",
        "Leonhard Euler och Carl Friedrich Gauss",
        "René Descartes och Pierre de Fermat",
        "Arkimedes och Euklides"
      ],
      ratt: 0
    },
    ledtradar: [
      "Den ena var engelsman och formulerade också gravitationslagen.",
      "Den andra var tysk filosof och matematiker och införde integraltecknet \\(\\int\\) (ett utdraget S för <em>summa</em>)."
    ],
    losning: "<p><strong>Isaac Newton</strong> (England) och <strong>Gottfried Wilhelm Leibniz</strong> (Tyskland) utvecklade differential- och integralkalkylen oberoende av varandra på 1660–1680-talen. Leibniz beteckningar \\(\\frac{dy}{dx}\\) och \\(\\int\\) används än i dag, medan Newtons punktnotation \\(\\dot{x}\\) främst lever kvar inom fysiken.</p><p>Descartes och Fermat (tidigt 1600-tal) lade viktig grund, t.ex. med koordinatsystemet och metoder för tangenter och extrempunkter. Euler och Gauss verkade på 1700- och 1800-talet. Arkimedes (ca 250 f.Kr.) använde tidiga gränsvärdesidéer.</p>"
  },

  {
    id: "tp-028",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Kritisk granskning",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Ett företag minskade sina koldioxidutsläpp med 20 % under 2024 och med ytterligare 20 % under 2025. I en reklamkampanj skriver företaget:</p><p><em>”Vi har minskat våra utsläpp med 40 % på två år!”</em></p><p>Vilket av följande påståenden stämmer?</p>",
    svar: {
      alternativ: [
        "Påståendet stämmer eftersom \\(20\\ \\% + 20\\ \\% = 40\\ \\%\\).",
        "Påståendet är fel. Den totala minskningen är \\(36\\ \\%\\).",
        "Påståendet är fel. Den totala minskningen är \\(44\\ \\%\\).",
        "Det går inte att avgöra utan att veta hur många ton företaget släppte ut."
      ],
      ratt: 1
    },
    ledtradar: [
      "En minskning med 20 % motsvarar förändringsfaktorn \\(0{,}8\\).",
      "Den andra minskningen räknas på den redan minskade mängden."
    ],
    losning: "<p>Förändringsfaktorn för en minskning med 20 % är \\(0{,}8\\). Efter två år är utsläppen</p><p>\\[0{,}8\\cdot 0{,}8 = 0{,}64\\]</p><p>gånger de ursprungliga, dvs. 64 %. Minskningen är \\(100\\ \\% - 64\\ \\% = 36\\ \\%\\), inte 40 %. Procentsatser kan inte adderas, eftersom den andra minskningen räknas på en mindre mängd. Resultatet gäller oavsett hur stora utsläppen var från början.</p>"
  },

  {
    id: "tp-029",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Matematikens historia – talet e",
    niva: "A",
    poang: "0/0/1",
    typ: "val",
    fraga: "<p>År 1683 undersökte Jacob Bernoulli ränta på ränta. Om årsräntan 100 % delas upp på \\(n\\) lika långa perioder blir kapitalet efter ett år \\(\\left(1 + \\frac{1}{n}\\right)^n\\) gånger så stort.</p><table><tr><th>\\(n\\)</th><td>1</td><td>12</td><td>365</td><td>10 000</td></tr><tr><th>\\(\\left(1+\\frac1n\\right)^n\\)</th><td>2</td><td>2,613…</td><td>2,7145…</td><td>2,7181…</td></tr></table><p>Leonhard Euler visade senare att uttrycket närmar sig ett tal som han betecknade \\(e\\). Vilket av följande påståenden om talet \\(e\\) är korrekt?</p>",
    svar: {
      alternativ: [
        "När \\(n\\) växer obegränsat växer också \\(\\left(1+\\frac1n\\right)^n\\) obegränsat.",
        "\\(e\\) är det enda positiva talet \\(a\\) sådant att derivatan av \\(a^x\\) är \\(a^x\\) för alla \\(x\\).",
        "\\(e = 2{,}71828\\) exakt.",
        "Derivatan av \\(e^x\\) är \\(0\\) då \\(x = 0\\)."
      ],
      ratt: 1
    },
    ledtradar: [
      "Titta på tabellen: hur förändras värdena när \\(n\\) blir stort?",
      "Formelbladet: derivatan av \\(a^x\\) är \\(a^x\\ln a\\). När är \\(\\ln a = 1\\)?"
    ],
    losning: "<ul><li>Tabellen visar att värdena ökar allt långsammare och närmar sig ca 2,718 – de växer inte obegränsat. Fel.</li><li>Derivatan av \\(a^x\\) är \\(a^x\\ln a\\). Den är lika med \\(a^x\\) för alla \\(x\\) endast om \\(\\ln a = 1\\), dvs. \\(a = e\\). <strong>Rätt.</strong> Det är därför \\(e\\) kallas den naturliga basen.</li><li>\\(e\\) är irrationellt (har oändligt många decimaler utan period), så \\(2{,}71828\\) är bara ett närmevärde. Fel.</li><li>Derivatan av \\(e^x\\) är \\(e^x\\), och \\(e^0 = 1\\). Tangenten i \\((0;\\ 1)\\) har lutningen 1. Fel.</li></ul>"
  },

  // ───────────── PROBLEMLÖSNING – DEL B ─────────────

  {
    id: "tp-030",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Hållbar utveckling – exponentialmodell",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Ett lands utsläpp av växthusgaser beskrivs med modellen \\[U(t) = 52\\cdot 0{,}96^t\\] där \\(U\\) är utsläppen i miljoner ton koldioxidekvivalenter per år och \\(t\\) är tiden i år efter år 2025.</p><p>Hur många år tar det enligt modellen innan utsläppen har halverats jämfört med år 2025? Svara med en decimal.</p>",
    svar: { varde: 17.0, tolerans: 0.05, enhet: "år" },
    ledtradar: [
      "Hälften av utsläppen år 2025 är \\(26\\) miljoner ton.",
      "Lös ekvationen \\(52\\cdot 0{,}96^t = 26\\), t.ex. med <code>Lös()</code> i GeoGebra."
    ],
    losning: "<p>Halverade utsläpp: \\(U(t) = 26\\).</p><p>\\[52\\cdot 0{,}96^t = 26 \\;\\Leftrightarrow\\; 0{,}96^t = 0{,}5 \\;\\Leftrightarrow\\; t = \\dfrac{\\lg 0{,}5}{\\lg 0{,}96} \\approx 16{,}98\\]</p><p>GeoGebra CAS: <code>NLös(52*0.96^t = 26, t)</code> ger \\(t \\approx 16{,}98\\).</p><p>Svar: ca \\(17{,}0\\) år.</p>"
  },

  {
    id: "tp-031",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Kritisk granskning – förändringshastighet",
    niva: "C",
    poang: "2/1/0",
    typ: "redovisning",
    fraga: "<p>En kommuns utsläpp av koldioxid beskrivs med modellen \\[U(t) = 60\\,e^{-0{,}04t}\\] där \\(U\\) är utsläppen i tusen ton per år och \\(t\\) är tiden i år efter år 2025.</p><p>I en debattartikel står två påståenden som sägs bygga på modellen:</p><ol><li><em>”År 2040 har utsläppen halverats jämfört med år 2025.”</em></li><li><em>”Utsläppen minskar allt snabbare.”</em></li></ol><p>Granska båda påståendena med hjälp av modellen.</p>",
    svar: { facit: "1. Fel: \\(U(15) \\approx 32{,}9\\) tusen ton, vilket är mer än hälften (30). 2. Fel: \\(U'(0) = -2{,}4\\) och \\(U'(15) \\approx -1{,}3\\) tusen ton/år, minskningstakten avtar." },
    ledtradar: [
      "År 2040 motsvarar \\(t = 15\\). Jämför \\(U(15)\\) med hälften av \\(U(0)\\).",
      "Hur snabbt utsläppen minskar beskrivs av derivatan \\(U'(t)\\). Beräkna den för några olika värden på \\(t\\).",
      "”Minskar allt snabbare” betyder att \\(U'(t)\\) blir allt mer negativ."
    ],
    losning: "<p><strong>Påstående 1:</strong> \\(U(0) = 60\\), så halverade utsläpp motsvarar 30. GeoGebra: <code>U(15)</code> ger \\(U(15) = 60e^{-0{,}6} \\approx 32{,}9\\). Det är mer än 30, så utsläppen har inte halverats (de har minskat med ca 45 %). Påståendet stämmer inte.</p><p><strong>Påstående 2:</strong> <code>Derivata(U)</code> ger \\(U'(t) = -2{,}4\\,e^{-0{,}04t}\\).</p><ul><li>\\(U'(0) = -2{,}4\\) tusen ton per år</li><li>\\(U'(15) \\approx -1{,}3\\) tusen ton per år</li></ul><p>Derivatan är negativ (utsläppen minskar), men dess belopp blir mindre med tiden, eftersom \\(e^{-0{,}04t}\\) avtar. Utsläppen minskar alltså allt <em>långsammare</em>. Påståendet stämmer inte.</p>",
    bedomning: [
      "+E<sub>M</sub> för att beräkna \\(U(15) \\approx 32{,}9\\) och dra slutsatsen att utsläppen inte har halverats",
      "+E<sub>P</sub> för att bestämma derivatan och beräkna förändringshastigheten vid minst två tidpunkter, t.ex. \\(-2{,}4\\) och \\(-1{,}3\\) tusen ton/år",
      "+C<sub>R</sub> för en välgrundad slutsats om påstående 2, där det framgår att minskningstakten avtar"
    ]
  },

  {
    id: "tp-032",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Programmering – numerisk integration",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Utsläppstakten från en industri beskrivs av \\(u(t) = 40 - 0{,}05t^2\\), där \\(u\\) är i tusen ton per år och \\(t\\) är tiden i år. För att uppskatta de totala utsläppen under perioden \\(0 \\le t \\le 20\\) har en elev skrivit följande Python-program:</p><pre><code>def u(t):\n    return 40 - 0.05 * t**2\n\na = 0\nb = 20\nn = 4\nh = (b - a) / n\nsumma = 0\nfor i in range(n):\n    x1 = a + i * h\n    x2 = x1 + h\n    summa = summa + (u(x1) + u(x2)) / 2 * h\nprint(summa)</code></pre><p>Hur stor är skillnaden mellan det värde som programmet skriver ut och det exakta värdet av de totala utsläppen? Svara i tusen ton med två decimaler.</p>",
    svar: { varde: 4.17, tolerans: 0.005, enhet: "tusen ton" },
    ledtradar: [
      "Programmet delar intervallet i <code>n = 4</code> delar och beräknar arean av fyra parallelltrapets (trapetsmetoden).",
      "Det exakta värdet är \\(\\displaystyle\\int_0^{20} u(t)\\,dt\\). Använd <code>Integral()</code>."
    ],
    losning: "<ol><li>Steglängd \\(h = 5\\). Funktionsvärden: \\(u(0) = 40\\), \\(u(5) = 38{,}75\\), \\(u(10) = 35\\), \\(u(15) = 28{,}75\\), \\(u(20) = 20\\).</li><li>Programmet summerar trapetsareor: \\[5\\left(\\tfrac{40 + 38{,}75}{2} + \\tfrac{38{,}75 + 35}{2} + \\tfrac{35 + 28{,}75}{2} + \\tfrac{28{,}75 + 20}{2}\\right) = 662{,}5\\] (programmet skriver ut <code>662.5</code>).</li><li>Exakt: <code>Integral(40 - 0.05t^2, 0, 20)</code> ger \\(\\left[40t - \\dfrac{0{,}05t^3}{3}\\right]_0^{20} = 800 - \\dfrac{400}{3} \\approx 666{,}67\\).</li><li>Skillnad: \\(666{,}67 - 662{,}5 \\approx 4{,}17\\).</li></ol><p>Svar: ca \\(4{,}17\\) tusen ton. Programmet underskattar, eftersom grafen till \\(u\\) är nedåtböjd (som en kulle), så trapetsens övre sidor ligger under kurvan. Med större <code>n</code> blir felet mindre.</p>"
  },

  {
    id: "tp-033",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Hållbar utveckling – koldioxidbudget",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Enligt en klimatplan ska utsläppen från en region minska enligt modellen \\[U(t) = 45\\,e^{-kt}\\] där \\(U\\) är utsläppen i miljoner ton (Mt) per år, \\(t\\) är tiden i år efter år 2025 och \\(k\\) är en positiv konstant.</p><p>Regionens totala utsläpp under perioden 2025–2050 får högst vara \\(300\\) Mt (en så kallad koldioxidbudget).</p><p>a) Bestäm det minsta värdet på \\(k\\) som gör att budgeten hålls.</p><p>b) Beskriv en begränsning hos modellen när den används för att planera utsläppen.</p>",
    svar: { facit: "a) \\(k \\approx 0{,}146\\) (utsläppen minskar med ca 14 % per år). b) T.ex.: utsläppen blir aldrig noll; år 2050 är de fortfarande ca 1,2 Mt/år och budgeten säger inget om tiden efter 2050." },
    ledtradar: [
      "De totala utsläppen under perioden ges av en integral av \\(U(t)\\) från \\(t = 0\\) till \\(t = 25\\).",
      "Ställ upp ekvationen \\(\\displaystyle\\int_0^{25} 45e^{-kt}\\,dt = 300\\) och lös den numeriskt.",
      "Ett större \\(k\\) ger snabbare minskning och mindre totala utsläpp."
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Totala utsläpp 2025–2050: \\(\\displaystyle\\int_0^{25} 45e^{-kt}\\,dt\\).</li><li>GeoGebra CAS: <code>Integral(45*exp(-k*t), t, 0, 25)</code> ger \\(\\dfrac{45\\left(1 - e^{-25k}\\right)}{k}\\).</li><li>Budgeten hålls exakt när \\(\\dfrac{45\\left(1 - e^{-25k}\\right)}{k} = 300\\). <code>NLös(45*(1 - exp(-25k))/k = 300, k)</code> ger \\(k \\approx 0{,}146\\).</li><li>Eftersom ett större \\(k\\) ger mindre totala utsläpp måste \\(k \\ge 0{,}146\\).</li></ol><p>Det minsta värdet är \\(k \\approx 0{,}146\\). Det motsvarar förändringsfaktorn \\(e^{-0{,}146} \\approx 0{,}864\\), dvs. en minskning med ca 14 % per år.</p><p><strong>b)</strong> Exempel på begränsningar:</p><ul><li>Enligt modellen blir utsläppen aldrig noll. År 2050 är de \\(U(25) \\approx 1{,}2\\) Mt per år, och modellen säger inget om hur mycket som släpps ut efter 2050.</li><li>Verkliga utsläpp minskar inte med samma procentsats varje år. De beror på politiska beslut, teknikskiften och konjunktur, och kan minska stegvis.</li><li>Att minska med 14 % per år direkt från 2025 kan vara orealistiskt i början, när omställningen ännu inte har kommit igång.</li></ul>",
    bedomning: [
      "+C<sub>M</sub> för att ställa upp en korrekt ekvation med integral för de totala utsläppen, \\(\\int_0^{25} 45e^{-kt}\\,dt = 300\\)",
      "+A<sub>PL</sub> för att med digitalt verktyg bestämma \\(k \\approx 0{,}146\\) och motivera att det är det minsta värdet",
      "+A<sub>M</sub> för en relevant och välgrundad värdering av modellens begränsning, t.ex. med stöd av beräkningen \\(U(25) \\approx 1{,}2\\) Mt/år"
    ]
  },

  {
    id: "tp-034",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Modellers begränsningar",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Den installerade effekten av solceller i ett land ökade snabbt åren 2020–2025. Data för den perioden beskrivs väl av modellen \\[P(t) = 2{,}5\\cdot 1{,}35^t\\] där \\(P\\) är effekten i gigawatt (GW) och \\(t\\) är tiden i år efter år 2020. Landets totala elbehov motsvarar en effekt på ungefär 20 GW.</p><p>Använd modellen för att beräkna \\(P\\) år 2060. Vilket påstående är mest rimligt?</p>",
    svar: {
      alternativ: [
        "Modellen ger ca \\(400\\,000\\) GW år 2060. Det är orimligt, så modellen bör bara användas för en kortare tid framåt, eftersom tillväxten begränsas av bland annat efterfrågan och tillgänglig yta.",
        "Modellen ger ca \\(400\\,000\\) GW år 2060. Det är rimligt, eftersom modellen passar data för 2020–2025 mycket bra.",
        "Modellen ger ca \\(110\\) GW år 2060. Det är rimligt, eftersom en exponentiell modell alltid stämmer på lång sikt.",
        "Modellen är orimlig eftersom en exponentialfunktion efter en tid blir negativ."
      ],
      ratt: 0
    },
    ledtradar: [
      "År 2060 motsvarar \\(t = 40\\).",
      "Jämför resultatet med landets totala elbehov. Kan exponentiell tillväxt fortsätta hur länge som helst?"
    ],
    losning: "<p>\\(P(40) = 2{,}5\\cdot 1{,}35^{40} \\approx 4{,}1\\cdot 10^5\\) GW, alltså ca \\(400\\,000\\) GW. Det är omkring \\(20\\,000\\) gånger landets elbehov och helt orimligt.</p><p>En exponentiell modell kan beskriva en tidig, snabb tillväxt bra, men tillväxten bromsas av efterfrågan, tillgänglig yta, nätkapacitet och ekonomi. Att modellen passar data väl under en kort period betyder inte att den går att använda för prognoser långt fram i tiden. En exponentialfunktion \\(C\\cdot a^t\\) med \\(C \\gt 0\\) blir aldrig negativ.</p>"
  },

  // ───────────── PROBLEMLÖSNING – DEL C ─────────────

  {
    id: "tp-035",
    kurser: ["3b", "3c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Programmering – intervallhalvering",
    niva: "C",
    poang: "0/1/0",
    typ: "flera",
    fraga: "<p>Ekvationen \\(x^3 + x - 5 = 0\\) har en lösning mellan 1 och 2. Programmet nedan använder intervallhalveringsmetoden för att ringa in lösningen.</p><pre><code>def f(x):\n    return x**3 + x - 5\n\na = 1\nb = 2\nfor i in range(4):\n    m = (a + b) / 2\n    if f(a) * f(m) &lt; 0:\n        b = m\n    else:\n        a = m\n    print(a, b)</code></pre><p>Programmet skriver ut fyra rader med två tal på varje rad. Vilka två tal skrivs ut på den <strong>sista</strong> raden?</p>",
    svar: { varden: [1.5, 1.5625], tolerans: 0.0001 },
    ledtradar: [
      "I varje varv beräknas mittpunkten <code>m</code>. Om \\(f(a)\\) och \\(f(m)\\) har olika tecken ligger lösningen mellan <code>a</code> och <code>m</code>.",
      "\\(f(1) = -3 \\lt 0\\). Beräkna \\(f(1{,}5)\\), \\(f(1{,}75)\\), … och följ hur <code>a</code> och <code>b</code> ändras."
    ],
    losning: "<p>\\(f(1) = -3\\), dvs. negativt. Om \\(f(m) \\lt 0\\) blir \\(f(a)\\cdot f(m) \\gt 0\\) och <code>a = m</code>; om \\(f(m) \\gt 0\\) blir <code>b = m</code>.</p><ol><li>\\(m = 1{,}5\\): \\(f(1{,}5) = 3{,}375 + 1{,}5 - 5 = -0{,}125 \\lt 0\\) ⇒ \\(a = 1{,}5\\). Utskrift: <code>1.5 2</code></li><li>\\(m = 1{,}75\\): \\(f(1{,}75) \\approx 2{,}11 \\gt 0\\) ⇒ \\(b = 1{,}75\\). Utskrift: <code>1.5 1.75</code></li><li>\\(m = 1{,}625\\): \\(f(1{,}625) \\approx 0{,}92 \\gt 0\\) ⇒ \\(b = 1{,}625\\). Utskrift: <code>1.5 1.625</code></li><li>\\(m = 1{,}5625\\): \\(f(1{,}5625) \\approx 0{,}38 \\gt 0\\) ⇒ \\(b = 1{,}5625\\). Utskrift: <code>1.5 1.5625</code></li></ol><p>Sista raden: \\(1{,}5\\) och \\(1{,}5625\\). Lösningen (\\(x \\approx 1{,}516\\)) ligger alltså i intervallet \\(1{,}5 \\lt x \\lt 1{,}5625\\).</p>"
  },

  {
    id: "tp-036",
    kurser: ["3b"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Programmering – simulering",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>Ett miljögift läcker ut i en sjö. I början av varje år tillförs 50 kg av giftet, och under året bryts 10 % av den mängd som finns i sjön ned. En miljötekniker gör en förenklad modell där mängden <code>m</code> (kg) uppdateras en gång per år. Hon skriver följande program:</p><pre><code>m = 0\nar = 0\nwhile m &lt; 400:\n    m = 0.9 * m + 50\n    ar = ar + 1\nprint(ar, round(m, 1))</code></pre><p>a) Beskriv vad programmet beräknar.</p><p>b) Bestäm, utan att köra programmet, vilket värde på <code>ar</code> som skrivs ut.</p><p>c) Visa att mängden gift i sjön enligt modellen aldrig kan bli 500 kg eller mer.</p>",
    svar: { facit: "a) Antal år tills mängden gift för första gången är minst 400 kg (och mängden då). b) 16. c) \\(m_n = 500(1 - 0{,}9^n) \\lt 500\\) eftersom \\(0{,}9^n \\gt 0\\)." },
    ledtradar: [
      "Vad är villkoret för att <code>while</code>-loopen ska fortsätta? Vad räknar variabeln <code>ar</code>?",
      "Skriv upp mängden efter 1, 2, 3 år. Du får en geometrisk summa: \\(m_n = 50 + 50\\cdot 0{,}9 + 50\\cdot 0{,}9^2 + \\dots\\)",
      "Använd formeln för geometrisk summa och logaritmer för att lösa \\(m_n \\ge 400\\)."
    ],
    losning: "<p><strong>a)</strong> Programmet simulerar mängden gift år för år. Raden <code>m = 0.9 * m + 50</code> betyder att 10 % av mängden bryts ned och att 50 kg tillförs. Loopen fortsätter så länge mängden är mindre än 400 kg, och <code>ar</code> räknar antalet år. Programmet skriver ut efter hur många år mängden för första gången är minst 400 kg, och vilken mängd det då är.</p><p><strong>b)</strong> Mängden efter \\(n\\) år: \\[m_n = 50 + 50\\cdot 0{,}9 + \\dots + 50\\cdot 0{,}9^{n-1} = \\dfrac{50(0{,}9^n - 1)}{0{,}9 - 1} = 500\\left(1 - 0{,}9^n\\right)\\]</p><p>\\(500(1 - 0{,}9^n) \\ge 400 \\Leftrightarrow 0{,}9^n \\le 0{,}2 \\Leftrightarrow n \\ge \\dfrac{\\lg 0{,}2}{\\lg 0{,}9} \\approx 15{,}3\\).</p><p>Minsta heltal är \\(n = 16\\). Kontroll: \\(m_{15} \\approx 397{,}1\\) och \\(m_{16} \\approx 407{,}3\\). Programmet skriver ut <code>16 407.3</code>.</p><p><strong>c)</strong> \\(m_n = 500(1 - 0{,}9^n)\\). Eftersom \\(0{,}9^n \\gt 0\\) för alla \\(n\\) är \\(1 - 0{,}9^n \\lt 1\\), alltså \\(m_n \\lt 500\\). När \\(n\\) växer går \\(0{,}9^n\\) mot 0, så mängden närmar sig 500 kg men når aldrig dit. (Vid 500 kg skulle nedbrytningen, 50 kg per år, exakt balansera tillförseln: \\(0{,}9\\cdot 500 + 50 = 500\\).)</p>",
    bedomning: [
      "+E<sub>M</sub> för en korrekt tolkning av vad programmet beräknar (antal år tills mängden är minst 400 kg)",
      "+C<sub>PL</sub> för att med godtagbar metod, t.ex. geometrisk summa och logaritmer, bestämma att 16 skrivs ut",
      "+A<sub>R</sub> för en fullständig och generell motivering av att mängden alltid är mindre än 500 kg, t.ex. via \\(m_n = 500(1 - 0{,}9^n)\\)"
    ]
  },

  {
    id: "tp-037",
    kurser: ["3b", "3c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Modeller och deras begränsningar",
    niva: "E",
    poang: "2/0/0",
    typ: "redovisning",
    fraga: "<p>Havsisens utbredning i Arktis är som minst i september varje år och har minskat sedan mätningarna började. En förenklad linjär modell är \\[A(t) = 7{,}2 - 0{,}08t\\] där \\(A\\) är havsisens utbredning i miljoner \\(\\text{km}^2\\) och \\(t\\) är tiden i år efter 1980.</p><p>Arktis brukar kallas isfritt om utbredningen är mindre än 1 miljon \\(\\text{km}^2\\).</p><p>a) Vilket år blir Arktis isfritt i september enligt modellen?</p><p>b) Ge ett skäl till att en linjär modell kan vara olämplig för en sådan prognos.</p>",
    svar: { facit: "a) År 2058 (\\(t = 77{,}5\\)). b) T.ex.: verkliga data varierar mycket från år till år och förändringen behöver inte vara linjär; modellen bygger på en extrapolation långt utanför mätperioden och ger negativa värden efter 2070." },
    ledtradar: [
      "Lös olikheten \\(7{,}2 - 0{,}08t \\lt 1\\).",
      "Vad händer med \\(A(t)\\) om \\(t\\) blir mycket stort? Är det rimligt att minskningen är exakt lika stor varje år?"
    ],
    losning: "<p><strong>a)</strong> \\(7{,}2 - 0{,}08t \\lt 1 \\Leftrightarrow 0{,}08t \\gt 6{,}2 \\Leftrightarrow t \\gt 77{,}5\\).</p><p>Kontroll: \\(A(77) = 1{,}04\\) och \\(A(78) = 0{,}96\\). Första septembermätningen under 1 miljon \\(\\text{km}^2\\) blir \\(t = 78\\), dvs. år \\(1980 + 78 = 2058\\).</p><p><strong>b)</strong> Exempel på godtagbara skäl:</p><ul><li>En linjär modell förutsätter att isen minskar lika mycket varje år. Den verkliga förändringen kan gå snabbare (t.ex. eftersom mörkt hav absorberar mer solvärme än is) eller långsammare.</li><li>Prognosen är en extrapolation långt utanför den period där data finns.</li><li>Modellen ger negativ utbredning för \\(t \\gt 90\\), vilket är omöjligt, så den kan inte gälla obegränsat.</li><li>Isutbredningen varierar mycket mellan enskilda år på grund av väder.</li></ul>",
    bedomning: [
      "+E<sub>M</sub> för att med modellen bestämma året till 2058 (eller \\(t \\approx 77{,}5\\), ca år 2057–2058)",
      "+E<sub>R</sub> för ett relevant skäl till modellens begränsning"
    ]
  },

  {
    id: "tp-038",
    kurser: ["3c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Matematikens historia – Arkimedes och π",
    niva: "C",
    poang: "2/1/0",
    typ: "redovisning",
    fraga: "<p>Arkimedes (ca 287–212 f.Kr.) uppskattade talet \\(\\pi\\) genom att jämföra en cirkel med regelbundna månghörningar inskrivna i cirkeln. Figuren visar en regelbunden tolvhörning inskriven i en cirkel med radien \\(r\\). Tolvhörningen kan delas in i 12 likadana trianglar.</p><p>a) Visa att tolvhörningens area är exakt \\(3r^2\\).</p><p>b) Beräkna på samma sätt arean av en inskriven regelbunden 24-hörning. Vad säger resultatet om talet \\(\\pi\\)?</p>",
    figur: `<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><circle cx="150" cy="125" r="100" stroke-width="1.5"/><polygon points="150,25 100,38.4 63.4,75 50,125 63.4,175 100,211.6 150,225 200,211.6 236.6,175 250,125 236.6,75 200,38.4"/><polygon points="150,125 250,125 236.6,75" fill="currentColor" fill-opacity="0.18" stroke-width="2"/><line x1="150" y1="125" x2="250" y2="125" stroke-width="1.5"/><line x1="150" y1="125" x2="236.6" y2="75" stroke-width="1.5"/><line x1="150" y1="125" x2="150" y2="25" stroke-width="0.6"/><line x1="150" y1="125" x2="100" y2="38.4" stroke-width="0.6"/><line x1="150" y1="125" x2="63.4" y2="75" stroke-width="0.6"/><line x1="150" y1="125" x2="50" y2="125" stroke-width="0.6"/><line x1="150" y1="125" x2="63.4" y2="175" stroke-width="0.6"/><line x1="150" y1="125" x2="100" y2="211.6" stroke-width="0.6"/><line x1="150" y1="125" x2="150" y2="225" stroke-width="0.6"/><line x1="150" y1="125" x2="200" y2="211.6" stroke-width="0.6"/><line x1="150" y1="125" x2="236.6" y2="175" stroke-width="0.6"/><line x1="150" y1="125" x2="200" y2="38.4" stroke-width="0.6"/><path d="M176,125 A26,26 0 0 0 172.5,112" stroke-width="1.5"/><text x="192.5" y="118.6" fill="currentColor" stroke="none" text-anchor="middle">30°</text><circle cx="150" cy="125" r="3" fill="currentColor"/><text x="205" y="144" fill="currentColor" stroke="none" text-anchor="middle" font-style="italic">r</text></svg>`,
    svar: { facit: "a) \\(12\\cdot \\frac{r\\cdot r\\cdot\\sin 30^\\circ}{2} = 3r^2\\). b) \\(24\\cdot\\frac{r^2\\sin 15^\\circ}{2} = 12\\sin 15^\\circ\\,r^2 \\approx 3{,}106\\,r^2\\). Cirkelns area \\(\\pi r^2\\) är större, så \\(\\pi \\gt 3{,}10\\)." },
    ledtradar: [
      "Varje triangel har två sidor som är radier, och vinkeln mellan dem är \\(\\dfrac{360^\\circ}{12}\\).",
      "Använd areasatsen på en triangel och multiplicera med antalet trianglar.",
      "Den inskrivna månghörningen ligger helt inuti cirkeln. Vad betyder det för areorna?"
    ],
    losning: "<p><strong>a)</strong> Medelpunktsvinkeln i varje triangel är \\(\\dfrac{360^\\circ}{12} = 30^\\circ\\), och de två sidorna som bildar vinkeln är radier. Areasatsen ger arean av en triangel: \\[T = \\dfrac{r\\cdot r\\cdot \\sin 30^\\circ}{2} = \\dfrac{r^2\\cdot\\frac12}{2} = \\dfrac{r^2}{4}\\]</p><p>Tolvhörningens area: \\(12\\cdot\\dfrac{r^2}{4} = 3r^2\\). V.S.V.</p><p><strong>b)</strong> För 24-hörningen är medelpunktsvinkeln \\(15^\\circ\\): \\[A_{24} = 24\\cdot\\dfrac{r^2\\sin 15^\\circ}{2} = 12\\sin 15^\\circ\\cdot r^2 \\approx 3{,}106\\,r^2\\]</p><p>24-hörningen ligger inuti cirkeln, så cirkelns area \\(\\pi r^2\\) är större än \\(3{,}106\\,r^2\\). Alltså är \\(\\pi \\gt 3{,}10\\). Ju fler hörn, desto närmare \\(\\pi\\) kommer man. En 96-hörning ger \\(48\\sin 3{,}75^\\circ \\approx 3{,}139\\).</p><p><em>Historisk kommentar:</em> Arkimedes använde både inskrivna och omskrivna 96-hörningar (och arbetade med omkretsar) och fick \\(3\\tfrac{10}{71} \\lt \\pi \\lt 3\\tfrac{1}{7}\\).</p>",
    bedomning: [
      "+E<sub>P</sub> för att med areasatsen bestämma arean av en av trianglarna till \\(\\dfrac{r^2}{4}\\)",
      "+E<sub>R</sub> för en fullständig motivering av att tolvhörningens area är \\(3r^2\\)",
      "+C<sub>PL</sub> för att bestämma 24-hörningens area till ca \\(3{,}11\\,r^2\\) och dra slutsatsen att \\(\\pi \\gt 3{,}1\\)"
    ]
  }

);
