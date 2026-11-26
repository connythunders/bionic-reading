// Uppgifter: Algebra och polynom + Linjär optimering och geometriska summor
// NP Matematik – fortsättning nivå 1b/1c (Ma3b/Ma3c) – se SCHEMA.md
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(

  // ===================== DEL A (utan digitala verktyg) =====================

  {
    id: "alg-001",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Rationella uttryck",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Förenkla uttrycket \\[\\frac{x^2-9}{x+3}\\] så långt som möjligt.</p>",
    svar: {
      alternativ: ["\\(x+3\\)", "\\(x-3\\)", "\\(x-9\\)", "\\(x^2-3\\)"],
      ratt: 1
    },
    ledtradar: [
      "Kan täljaren skrivas som en produkt? Titta på konjugatregeln i formelbladet.",
      "\\(x^2-9=x^2-3^2\\). Vilken faktor har täljaren gemensam med nämnaren?"
    ],
    losning: "<ol><li>Faktorisera täljaren med konjugatregeln: \\(x^2-9=(x+3)(x-3)\\).</li><li>Förkorta med den gemensamma faktorn \\((x+3)\\): \\[\\frac{(x+3)(x-3)}{x+3}=x-3\\quad (x\\neq -3)\\]</li></ol><p><strong>Svar:</strong> \\(x-3\\)</p><p>Vanligt fel är att \"stryka\" \\(x\\) eller \\(3\\) termvis, till exempel \\(\\frac{x^2-9}{x+3}\\to x-3\\) via \\(\\frac{x^2}{x}\\) och \\(\\frac{-9}{3}\\), vilket råkar ge rätt här men är en otillåten metod. Man får bara förkorta med <em>faktorer</em>.</p>"
  },

  {
    id: "alg-002",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Rationella uttryck",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>För vilka värden på \\(x\\) är uttrycket \\[\\frac{x+1}{x^2-4x}\\] inte definierat?</p>",
    svar: { varden: [0, 4], tolerans: 0 },
    ledtradar: [
      "Ett rationellt uttryck är inte definierat när nämnaren är noll.",
      "Lös \\(x^2-4x=0\\) genom att bryta ut \\(x\\)."
    ],
    losning: "<ol><li>Uttrycket är odefinierat när nämnaren är noll: \\(x^2-4x=0\\).</li><li>Bryt ut \\(x\\): \\(x(x-4)=0\\).</li><li>Nollproduktmetoden ger \\(x=0\\) eller \\(x=4\\).</li></ol><p><strong>Svar:</strong> \\(x=0\\) och \\(x=4\\)</p><p>Observera att täljarens nollställe \\(x=-1\\) inte spelar någon roll – där är uttrycket definierat och har värdet 0.</p>"
  },

  {
    id: "alg-003",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Polynom",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilket av följande uttryck är ett polynom?</p>",
    svar: {
      alternativ: ["\\(x^2+\\dfrac{1}{x}\\)", "\\(2^x+3\\)", "\\(3x^4-\\sqrt{2}\\,x+1\\)", "\\(\\sqrt{x}+4\\)"],
      ratt: 2
    },
    ledtradar: [
      "Ett polynom är en summa av termer av typen \\(a\\cdot x^n\\) där \\(n\\) är ett icke-negativt heltal.",
      "Skriv om \\(\\frac{1}{x}\\) och \\(\\sqrt{x}\\) som potenser av \\(x\\). Vilka exponenter får du?"
    ],
    losning: "<ol><li>I ett polynom får variabeln bara förekomma med exponenter \\(0, 1, 2, 3, \\ldots\\) Koefficienterna får vara vilka reella tal som helst.</li><li>\\(\\frac{1}{x}=x^{-1}\\) har negativ exponent – inte polynom.</li><li>\\(2^x\\) har variabeln i exponenten (exponentialfunktion) – inte polynom.</li><li>\\(\\sqrt{x}=x^{1/2}\\) har exponent som inte är ett heltal – inte polynom.</li><li>\\(3x^4-\\sqrt{2}\\,x+1\\) har exponenterna 4, 1 och 0. Att koefficienten är \\(\\sqrt{2}\\) spelar ingen roll.</li></ol><p><strong>Svar:</strong> \\(3x^4-\\sqrt{2}\\,x+1\\) (ett fjärdegradspolynom)</p>"
  },

  {
    id: "alg-004",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Polynomekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\[x(2x-1)(x+4)=0\\]</p>",
    svar: { varden: [0, 0.5, -4], tolerans: 0 },
    ledtradar: [
      "Vänsterledet är redan faktoriserat. Använd nollproduktmetoden.",
      "En produkt är noll om (minst) en av faktorerna är noll. Det finns tre faktorer."
    ],
    losning: "<ol><li>Nollproduktmetoden: produkten är noll om någon faktor är noll.</li><li>\\(x=0\\)</li><li>\\(2x-1=0\\Rightarrow x=\\frac{1}{2}\\)</li><li>\\(x+4=0\\Rightarrow x=-4\\)</li></ol><p><strong>Svar:</strong> \\(x_1=0\\), \\(x_2=0{,}5\\), \\(x_3=-4\\)</p><p>Multiplicera inte ihop parenteserna – då blir ekvationen onödigt svår.</p>"
  },

  {
    id: "alg-005",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Beräkna exakt \\[\\ln e^{3}+e^{\\ln 2}\\]</p>",
    svar: { varde: 5, tolerans: 0 },
    ledtradar: [
      "\\(\\ln\\) och \\(e^x\\) tar ut varandra: \\(\\ln y\\) är det tal som \\(e\\) ska upphöjas till för att ge \\(y\\).",
      "Vad ska \\(e\\) upphöjas till för att bli \\(e^3\\)?"
    ],
    losning: "<ol><li>Enligt definitionen \\(y=e^x \\Leftrightarrow x=\\ln y\\) gäller \\(\\ln e^{a}=a\\), så \\(\\ln e^3=3\\).</li><li>På samma sätt är \\(e^{\\ln b}=b\\), så \\(e^{\\ln 2}=2\\).</li><li>Summan: \\(3+2=5\\).</li></ol><p><strong>Svar:</strong> \\(5\\)</p>"
  },

  {
    id: "alg-006",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Lös ekvationen \\(e^x=6\\). Svara exakt.</p>",
    svar: {
      alternativ: ["\\(x=\\lg 6\\)", "\\(x=\\dfrac{6}{e}\\)", "\\(x=e^6\\)", "\\(x=\\ln 6\\)"],
      ratt: 3
    },
    ledtradar: [
      "Använd definitionen av naturlig logaritm i formelbladet: \\(y=e^x \\Leftrightarrow x=\\ln y\\).",
      "\\(\\lg\\) hör ihop med basen 10, inte med \\(e\\)."
    ],
    losning: "<ol><li>Definitionen av naturlig logaritm: \\(y=e^x \\Leftrightarrow x=\\ln y\\).</li><li>Med \\(y=6\\) får vi \\(x=\\ln 6\\).</li></ol><p><strong>Svar:</strong> \\(x=\\ln 6\\;(\\approx 1{,}79)\\)</p><p>\\(x=\\lg 6\\) hade varit rätt om ekvationen varit \\(10^x=6\\).</p>"
  },

  {
    id: "alg-007",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Rationella uttryck",
    niva: "C",
    poang: "0/1/0",
    typ: "text",
    fraga: "<p>Förenkla så långt som möjligt \\[\\frac{x^2-4x+4}{x^2-4}\\]</p><p>Skriv svaret med <code>/</code> för bråkstreck, t.ex. <code>(x+1)/(x-1)</code>.</p>",
    svar: {
      godkanda: ["(x-2)/(x+2)", "(-2+x)/(x+2)", "(x-2)/(2+x)", "(-2+x)/(2+x)"]
    },
    ledtradar: [
      "Faktorisera både täljare och nämnare med hjälp av formelbladets regler.",
      "Täljaren är en kvadrat: \\(x^2-4x+4=(x-2)^2\\). Nämnaren faktoriseras med konjugatregeln."
    ],
    losning: "<ol><li>Täljaren enligt andra kvadreringsregeln: \\(x^2-4x+4=(x-2)^2=(x-2)(x-2)\\).</li><li>Nämnaren enligt konjugatregeln: \\(x^2-4=(x-2)(x+2)\\).</li><li>Förkorta med \\((x-2)\\): \\[\\frac{(x-2)(x-2)}{(x-2)(x+2)}=\\frac{x-2}{x+2}\\]</li></ol><p><strong>Svar:</strong> \\(\\dfrac{x-2}{x+2}\\) (där \\(x\\neq \\pm 2\\))</p>"
  },

  {
    id: "alg-008",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Rationella uttryck",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Skriv som ett enda bråk: \\[\\frac{2}{x}+\\frac{3}{x+1}\\]</p>",
    svar: {
      alternativ: ["\\(\\dfrac{5}{2x+1}\\)", "\\(\\dfrac{5x+2}{x(x+1)}\\)", "\\(\\dfrac{5}{x(x+1)}\\)", "\\(\\dfrac{5x+3}{x(x+1)}\\)"],
      ratt: 1
    },
    ledtradar: [
      "Bråk adderas genom att man först gör liknämnigt. Använd \\(x(x+1)\\) som gemensam nämnare.",
      "Förläng det första bråket med \\((x+1)\\) och det andra med \\(x\\)."
    ],
    losning: "<ol><li>Gemensam nämnare: \\(x(x+1)\\).</li><li>Förläng: \\[\\frac{2(x+1)}{x(x+1)}+\\frac{3x}{x(x+1)}\\]</li><li>Addera täljarna: \\(2x+2+3x=5x+2\\).</li></ol><p><strong>Svar:</strong> \\(\\dfrac{5x+2}{x(x+1)}\\)</p><p>Att addera täljare för sig och nämnare för sig (\\(\\frac{5}{2x+1}\\)) är ett vanligt fel.</p>"
  },

  {
    id: "alg-009",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Polynomekvationer",
    niva: "C",
    poang: "0/1/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\[x^4-5x^2+4=0\\]</p>",
    svar: { varden: [-2, -1, 1, 2], tolerans: 0 },
    ledtradar: [
      "Inför en ny variabel: sätt \\(t=x^2\\). Då är \\(x^4=t^2\\).",
      "Lös andragradsekvationen i \\(t\\) och gå sedan tillbaka till \\(x\\). Varje positivt \\(t\\) ger två värden på \\(x\\)."
    ],
    losning: "<ol><li>Substitution: sätt \\(t=x^2\\). Ekvationen blir \\(t^2-5t+4=0\\).</li><li>pq-formeln: \\(t=\\frac{5}{2}\\pm\\sqrt{\\frac{25}{4}-4}=\\frac{5}{2}\\pm\\frac{3}{2}\\), så \\(t_1=4\\) och \\(t_2=1\\).</li><li>\\(x^2=4\\Rightarrow x=\\pm 2\\) och \\(x^2=1\\Rightarrow x=\\pm 1\\).</li></ol><p><strong>Svar:</strong> \\(x=-2,\\;-1,\\;1,\\;2\\)</p><p>En fjärdegradsekvation har högst fyra lösningar – här får vi alla fyra.</p>"
  },

  {
    id: "alg-010",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Lös ekvationen \\(3e^{2x}=12\\). Svara exakt.</p>",
    svar: {
      alternativ: ["\\(x=\\ln 4\\)", "\\(x=\\dfrac{\\ln 12}{6}\\)", "\\(x=\\ln 2\\)", "\\(x=\\ln 6\\)"],
      ratt: 2
    },
    ledtradar: [
      "Börja med att isolera potensen: dividera båda leden med 3.",
      "När du har \\(e^{2x}=4\\): logaritmera och dividera med 2. Kan \\(\\frac{\\ln 4}{2}\\) skrivas enklare?"
    ],
    losning: "<ol><li>Dividera med 3: \\(e^{2x}=4\\).</li><li>Definitionen av ln: \\(2x=\\ln 4\\).</li><li>\\(x=\\frac{\\ln 4}{2}=\\frac{\\ln 2^2}{2}=\\frac{2\\ln 2}{2}=\\ln 2\\) (logaritmlagen \\(\\ln a^p=p\\ln a\\)).</li></ol><p><strong>Svar:</strong> \\(x=\\ln 2\\)</p><p>Alternativet \\(\\ln 4\\) får den som glömmer att dividera med 2.</p>"
  },

  {
    id: "alg-011",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\[\\ln x+\\ln(x-2)=\\ln 3\\]</p>",
    svar: { varde: 3, tolerans: 0 },
    ledtradar: [
      "Logaritmlagen \\(\\ln a+\\ln b=\\ln(ab)\\) gäller på samma sätt som för lg i formelbladet.",
      "Du får en andragradsekvation. Kontrollera sedan dina lösningar – logaritmen är bara definierad för positiva tal."
    ],
    losning: "<ol><li>Logaritmlagen ger \\(\\ln\\big(x(x-2)\\big)=\\ln 3\\), alltså \\(x(x-2)=3\\).</li><li>\\(x^2-2x-3=0\\Rightarrow (x-3)(x+1)=0\\Rightarrow x=3\\) eller \\(x=-1\\).</li><li>Kontroll: För \\(x=-1\\) är \\(\\ln(-1)\\) inte definierat, så \\(x=-1\\) är en falsk rot. För \\(x=3\\): VL \\(=\\ln 3+\\ln 1=\\ln 3\\) = HL. ✓</li></ol><p><strong>Svar:</strong> \\(x=3\\)</p>"
  },

  {
    id: "alg-012",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Kubregler",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Faktorisera \\(x^3-8\\). Använd gärna formelbladet.</p>",
    svar: {
      alternativ: ["\\((x-2)^3\\)", "\\((x-2)(x^2-2x+4)\\)", "\\((x+2)(x^2-2x+4)\\)", "\\((x-2)(x^2+2x+4)\\)"],
      ratt: 3
    },
    ledtradar: [
      "Skriv \\(8\\) som en kub: \\(8=2^3\\).",
      "Formelbladet: \\(a^3-b^3=(a-b)(a^2+ab+b^2)\\)."
    ],
    losning: "<ol><li>\\(x^3-8=x^3-2^3\\), alltså \\(a=x\\) och \\(b=2\\).</li><li>Regeln \\(a^3-b^3=(a-b)(a^2+ab+b^2)\\) ger \\[x^3-8=(x-2)(x^2+2x+4)\\]</li></ol><p><strong>Svar:</strong> \\((x-2)(x^2+2x+4)\\)</p><p>Kontroll: \\((x-2)(x^2+2x+4)=x^3+2x^2+4x-2x^2-4x-8=x^3-8\\). ✓</p>"
  },

  {
    id: "alg-013",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Polynomfunktioner",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Figuren visar grafen till ett tredjegradspolynom \\(y=p(x)\\).</p><p>Vilket av följande uttryck kan vara \\(p(x)\\)?</p>",
    figur: "<svg viewBox='0 0 282 356' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' font-family='sans-serif' font-size='14' style='max-width:340px;width:100%'><path d='M26 330V30M56 330V30M86 330V30M116 330V30M146 330V30M176 330V30M206 330V30M236 330V30M266 330V30M26 330H266M26 300H266M26 270H266M26 240H266M26 210H266M26 180H266M26 150H266M26 120H266M26 90H266M26 60H266M26 30H266' stroke-width='0.6' opacity='0.3'/><path d='M26 210H274M116 330V22' stroke-width='1.3'/><path d='M274 210l-7 -3.5v7z M116 22l-3.5 7h7z' fill='currentColor' stroke='none'/><path d='M43.4 326.8L44.3 316.6L45.3 306.7L46.2 297.1L47.1 287.7L48 278.6L49 269.7L49.9 261L50.8 252.6L51.7 244.5L52.7 236.6L53.6 228.9L54.5 221.5L55.4 214.3L56.4 207.3L57.3 200.6L58.2 194.1L59.1 187.8L60.1 181.7L61 175.9L61.9 170.2L62.8 164.8L63.8 159.6L64.7 154.5L65.6 149.7L66.5 145.1L67.5 140.7L68.4 136.5L69.3 132.5L70.2 128.6L71.2 125L72.1 121.5L73 118.2L73.9 115.1L74.9 112.2L75.8 109.5L76.7 106.9L77.6 104.5L78.6 102.3L79.5 100.2L80.4 98.3L81.3 96.5L82.3 94.9L83.2 93.5L84.1 92.2L85 91L86 90L86.9 89.2L87.8 88.4L88.7 87.9L89.7 87.4L90.6 87.1L91.5 86.9L92.5 86.9L93.4 86.9L94.3 87.1L95.2 87.4L96.2 87.9L97.1 88.4L98 89L98.9 89.8L99.9 90.7L100.8 91.6L101.7 92.7L102.6 93.9L103.6 95.1L104.5 96.5L105.4 97.9L106.3 99.5L107.3 101.1L108.2 102.8L109.1 104.5L110 106.4L111 108.3L111.9 110.3L112.8 112.4L113.7 114.5L114.7 116.7L115.6 119L116.5 121.3L117.4 123.7L118.4 126.1L119.3 128.6L120.2 131.1L121.1 133.7L122.1 136.3L123 138.9L123.9 141.6L124.8 144.3L125.8 147.1L126.7 149.9L127.6 152.7L128.5 155.5L129.5 158.4L130.4 161.2L131.3 164.1L132.2 167L133.2 170L134.1 172.9L135 175.8L135.9 178.7L136.9 181.7L137.8 184.6L138.7 187.5L139.7 190.4L140.6 193.3L141.5 196.2L142.4 199.1L143.4 202L144.3 204.8L145.2 207.6L146.1 210.4L147.1 213.1L148 215.9L148.9 218.6L149.8 221.2L150.8 223.8L151.7 226.4L152.6 228.9L153.5 231.4L154.5 233.9L155.4 236.2L156.3 238.6L157.2 240.8L158.2 243L159.1 245.2L160 247.2L160.9 249.2L161.9 251.2L162.8 253L163.7 254.8L164.6 256.5L165.6 258.2L166.5 259.7L167.4 261.1L168.3 262.5L169.3 263.8L170.2 265L171.1 266L172 267L173 267.9L173.9 268.7L174.8 269.3L175.7 269.9L176.7 270.3L177.6 270.6L178.5 270.8L179.4 270.9L180.4 270.9L181.3 270.7L182.2 270.4L183.2 270L184.1 269.4L185 268.7L185.9 267.9L186.9 266.9L187.8 265.7L188.7 264.5L189.6 263L190.6 261.4L191.5 259.7L192.4 257.8L193.3 255.7L194.3 253.5L195.2 251.1L196.1 248.6L197 245.9L198 243L198.9 239.9L199.8 236.6L200.7 233.2L201.7 229.5L202.6 225.7L203.5 221.7L204.4 217.5L205.4 213.1L206.3 208.6L207.2 203.8L208.1 198.8L209.1 193.6L210 188.2L210.9 182.5L211.8 176.7L212.8 170.7L213.7 164.4L214.6 157.9L215.5 151.2L216.5 144.2L217.4 137.1L218.3 129.7L219.2 122L220.2 114.1L221.1 106L222 97.7L222.9 89.1L223.9 80.2L224.8 71.1L225.7 61.7L226.6 52.1L227.6 42.2L228.5 32.1' stroke-width='2.2'/><g fill='currentColor' stroke='none'><text x='270' y='202' font-style='italic'>x</text><text x='124' y='18' font-style='italic'>y</text><text x='26' y='227' text-anchor='middle'>−3</text><text x='56' y='227' text-anchor='middle'>−2</text><text x='86' y='227' text-anchor='middle'>−1</text><text x='146' y='227' text-anchor='middle'>1</text><text x='176' y='227' text-anchor='middle'>2</text><text x='206' y='227' text-anchor='middle'>3</text><text x='236' y='227' text-anchor='middle'>4</text><text x='266' y='227' text-anchor='middle'>5</text><text x='111' y='335' text-anchor='end'>−4</text><text x='111' y='305' text-anchor='end'>−3</text><text x='111' y='275' text-anchor='end'>−2</text><text x='111' y='245' text-anchor='end'>−1</text><text x='111' y='185' text-anchor='end'>1</text><text x='111' y='155' text-anchor='end'>2</text><text x='111' y='125' text-anchor='end'>3</text><text x='111' y='95' text-anchor='end'>4</text><text x='111' y='65' text-anchor='end'>5</text><text x='111' y='35' text-anchor='end'>6</text><text x='111' y='227' text-anchor='end'>0</text></g></svg>",
    svar: {
      alternativ: ["\\(0{,}5(x-2)(x+1)(x+3)\\)", "\\((x+2)(x-1)(x-3)\\)", "\\(0{,}5(x+2)(x-1)(x-3)\\)", "\\(-0{,}5(x+2)(x-1)(x-3)\\)"],
      ratt: 2
    },
    ledtradar: [
      "Läs av nollställena. Om \\(x=a\\) är ett nollställe innehåller polynomet faktorn \\((x-a)\\).",
      "Flera alternativ har rätt nollställen. Kontrollera var grafen skär \\(y\\)-axeln genom att beräkna \\(p(0)\\)."
    ],
    losning: "<ol><li>Grafen skär \\(x\\)-axeln i \\(x=-2\\), \\(x=1\\) och \\(x=3\\). Då innehåller \\(p(x)\\) faktorerna \\((x+2)\\), \\((x-1)\\) och \\((x-3)\\). Det utesluter det första alternativet.</li><li>Grafen skär \\(y\\)-axeln i \\(y=3\\), så \\(p(0)=3\\).</li><li>\\((0+2)(0-1)(0-3)=6\\). Med faktorn \\(0{,}5\\) blir \\(p(0)=3\\) ✓, med faktorn \\(1\\) blir \\(p(0)=6\\) och med faktorn \\(-0{,}5\\) blir \\(p(0)=-3\\).</li></ol><p><strong>Svar:</strong> \\(p(x)=0{,}5(x+2)(x-1)(x-3)\\)</p><p>Att grafen går mot \\(+\\infty\\) när \\(x\\) blir stort stämmer också med en positiv koefficient framför \\(x^3\\).</p>"
  },

  {
    id: "alg-014",
    kurser: ["3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Absolutbelopp",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\(|x-3|=5\\).</p>",
    svar: { varden: [-2, 8], tolerans: 0 },
    ledtradar: [
      "\\(|x-3|\\) kan tolkas som avståndet mellan \\(x\\) och \\(3\\) på tallinjen.",
      "Vilka tal ligger på avståndet 5 från talet 3? Det finns ett åt vardera hållet."
    ],
    losning: "<ol><li>\\(|x-3|=5\\) betyder att avståndet mellan \\(x\\) och \\(3\\) på tallinjen är 5.</li><li>Gå 5 steg åt höger: \\(x=3+5=8\\). Gå 5 steg åt vänster: \\(x=3-5=-2\\).</li><li>Algebraiskt: \\(x-3=5\\) eller \\(x-3=-5\\), vilket ger samma svar.</li></ol><p><strong>Svar:</strong> \\(x=-2\\) och \\(x=8\\)</p>"
  },

  {
    id: "alg-015",
    kurser: ["3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Absolutbelopp",
    niva: "A",
    poang: "0/0/1",
    typ: "val",
    fraga: "<p>Vilka värden på \\(x\\) uppfyller olikheten \\[|x+1|\\leq|x-3|\\;?\\]</p>",
    svar: {
      alternativ: ["\\(x\\geq 1\\)", "\\(x\\leq 1\\)", "\\(-1\\leq x\\leq 3\\)", "\\(x\\leq -1\\)"],
      ratt: 1
    },
    ledtradar: [
      "Tolka båda sidor som avstånd: \\(|x+1|=|x-(-1)|\\) är avståndet mellan \\(x\\) och \\(-1\\).",
      "Vilken punkt på tallinjen ligger lika långt från \\(-1\\) som från \\(3\\)? På vilken sida om den punkten är man närmare \\(-1\\)?"
    ],
    losning: "<ol><li>\\(|x+1|\\) är avståndet från \\(x\\) till \\(-1\\) och \\(|x-3|\\) är avståndet från \\(x\\) till \\(3\\).</li><li>Olikheten säger att \\(x\\) ligger minst lika nära \\(-1\\) som \\(3\\).</li><li>Mittpunkten mellan \\(-1\\) och \\(3\\) är \\(\\frac{-1+3}{2}=1\\). Där är avstånden lika (båda 2).</li><li>Alla punkter till vänster om 1 ligger närmare \\(-1\\).</li></ol><p><strong>Svar:</strong> \\(x\\leq 1\\)</p><p>Kontroll: \\(x=0\\) ger \\(1\\leq 3\\) ✓ och \\(x=2\\) ger \\(3\\leq 1\\), falskt.</p>"
  },

  {
    id: "alg-016",
    kurser: ["3b", "3c"],
    del: "A",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "A",
    poang: "0/0/1",
    typ: "val",
    fraga: "<p>Lös ekvationen \\[(\\ln x)^2=2\\ln x\\]</p>",
    svar: {
      alternativ: ["\\(x=e^2\\)", "\\(x=0\\) och \\(x=2\\)", "\\(x=1\\) och \\(x=2\\)", "\\(x=1\\) och \\(x=e^2\\)"],
      ratt: 3
    },
    ledtradar: [
      "Dividera inte med \\(\\ln x\\) – då kan du tappa en lösning. Flytta över allt till ena ledet.",
      "Bryt ut \\(\\ln x\\) och använd nollproduktmetoden."
    ],
    losning: "<ol><li>Flytta över: \\((\\ln x)^2-2\\ln x=0\\).</li><li>Bryt ut \\(\\ln x\\): \\(\\ln x\\,(\\ln x-2)=0\\).</li><li>Nollproduktmetoden: \\(\\ln x=0\\Rightarrow x=e^0=1\\), eller \\(\\ln x=2\\Rightarrow x=e^2\\).</li></ol><p><strong>Svar:</strong> \\(x=1\\) och \\(x=e^2\\)</p><p>Den som dividerar båda leden med \\(\\ln x\\) får bara \\(x=e^2\\) och missar \\(x=1\\), där \\(\\ln x=0\\).</p>"
  },

  {
    id: "alg-017",
    kurser: ["3b"],
    del: "A",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Geometriska summor",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Beräkna den geometriska summan \\[1+2+4+8+\\ldots+512\\]</p>",
    svar: { varde: 1023, tolerans: 0 },
    ledtradar: [
      "Bestäm första termen \\(a\\), kvoten \\(k\\) och antalet termer \\(n\\). Observera att \\(512=2^9\\).",
      "Termerna är \\(2^0, 2^1, \\ldots, 2^9\\). Hur många är de? Använd sedan formeln för geometrisk summa."
    ],
    losning: "<ol><li>Första termen \\(a=1\\), kvoten \\(k=2\\).</li><li>Sista termen \\(512=2^9\\), så termerna är \\(2^0,2^1,\\ldots,2^9\\), dvs. \\(n=10\\) termer.</li><li>Formeln: \\[s=\\frac{a(k^n-1)}{k-1}=\\frac{1\\cdot(2^{10}-1)}{2-1}=1024-1=1023\\]</li></ol><p><strong>Svar:</strong> \\(1023\\)</p><p>Vanligt fel: att räkna med \\(n=9\\), vilket ger 511.</p>"
  },

  {
    id: "alg-018",
    kurser: ["3b"],
    del: "A",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Linjär optimering",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Det skuggade området i figuren begränsas av olikheterna \\[x\\geq 0,\\quad y\\geq 0,\\quad x+y\\leq 6,\\quad x+2y\\leq 8\\]</p><p>Bestäm det största värdet som målfunktionen \\(z=2x+3y\\) antar i området.</p>",
    figur: "<svg viewBox='0 0 314 260' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' font-family='sans-serif' font-size='14' style='max-width:340px;width:100%'><path d='M26 234V30M60 234V30M94 234V30M128 234V30M162 234V30M196 234V30M230 234V30M264 234V30M298 234V30M26 234H298M26 200H298M26 166H298M26 132H298M26 98H298M26 64H298M26 30H298' stroke-width='0.6' opacity='0.3'/><path d='M26 234L230 234L162 166L26 98Z' fill='currentColor' fill-opacity='0.18' stroke='none'/><path d='M26 234H306M26 234V22' stroke-width='1.3'/><path d='M306 234l-7 -3.5v7z M26 22l-3.5 7h7z' fill='currentColor' stroke='none'/><path d='M26 30L230 234' stroke-width='2'/><path d='M26 98L298 234' stroke-width='2'/><g fill='currentColor' stroke='none'><text x='302' y='226' font-style='italic'>x</text><text x='34' y='18' font-style='italic'>y</text><text x='60' y='251' text-anchor='middle'>1</text><text x='94' y='251' text-anchor='middle'>2</text><text x='128' y='251' text-anchor='middle'>3</text><text x='162' y='251' text-anchor='middle'>4</text><text x='196' y='251' text-anchor='middle'>5</text><text x='230' y='251' text-anchor='middle'>6</text><text x='264' y='251' text-anchor='middle'>7</text><text x='298' y='251' text-anchor='middle'>8</text><text x='21' y='205' text-anchor='end'>1</text><text x='21' y='171' text-anchor='end'>2</text><text x='21' y='137' text-anchor='end'>3</text><text x='21' y='103' text-anchor='end'>4</text><text x='21' y='69' text-anchor='end'>5</text><text x='21' y='35' text-anchor='end'>6</text><text x='21' y='251' text-anchor='end'>0</text><text x='70.2' y='64' text-anchor='start'>x + y = 6</text><text x='209.6' y='174.5' text-anchor='start'>x + 2y = 8</text><circle cx='26' cy='234' r='3.2'/><circle cx='230' cy='234' r='3.2'/><circle cx='162' cy='166' r='3.2'/><circle cx='26' cy='98' r='3.2'/></g></svg>",
    svar: { varde: 14, tolerans: 0 },
    ledtradar: [
      "I linjär optimering antas det största värdet i någon av områdets hörnpunkter.",
      "Läs av hörnpunkterna i figuren och beräkna \\(z\\) i var och en."
    ],
    losning: "<ol><li>Hörnpunkterna är \\((0,0)\\), \\((6,0)\\), \\((4,2)\\) och \\((0,4)\\).</li><li>Beräkna \\(z=2x+3y\\): <br>\\((0,0)\\): \\(z=0\\)<br>\\((6,0)\\): \\(z=12\\)<br>\\((4,2)\\): \\(z=8+6=14\\)<br>\\((0,4)\\): \\(z=12\\)</li><li>Största värdet är 14, i punkten \\((4,2)\\).</li></ol><p><strong>Svar:</strong> \\(14\\)</p>"
  },

  {
    id: "alg-019",
    kurser: ["3b"],
    del: "A",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Linjär optimering",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Vilket av olikhetssystemen beskriver det skuggade området i figuren (inklusive randen)?</p>",
    figur: "<svg viewBox='0 0 314 294' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' font-family='sans-serif' font-size='14' style='max-width:340px;width:100%'><path d='M26 268V30M60 268V30M94 268V30M128 268V30M162 268V30M196 268V30M230 268V30M264 268V30M298 268V30M26 268H298M26 234H298M26 200H298M26 166H298M26 132H298M26 98H298M26 64H298M26 30H298' stroke-width='0.6' opacity='0.3'/><path d='M60 200L230 200L128 98L60 166Z' fill='currentColor' fill-opacity='0.18' stroke='none'/><path d='M26 234H306M60 268V22' stroke-width='1.3'/><path d='M306 234l-7 -3.5v7z M60 22l-3.5 7h7z' fill='currentColor' stroke='none'/><path d='M26 200L298 200' stroke-width='2'/><path d='M26 200L196 30' stroke-width='2'/><path d='M60 30L298 268' stroke-width='2'/><g fill='currentColor' stroke='none'><text x='302' y='226' font-style='italic'>x</text><text x='68' y='18' font-style='italic'>y</text><text x='26' y='251' text-anchor='middle'>−1</text><text x='94' y='251' text-anchor='middle'>1</text><text x='128' y='251' text-anchor='middle'>2</text><text x='162' y='251' text-anchor='middle'>3</text><text x='196' y='251' text-anchor='middle'>4</text><text x='230' y='251' text-anchor='middle'>5</text><text x='264' y='251' text-anchor='middle'>6</text><text x='298' y='251' text-anchor='middle'>7</text><text x='55' y='273' text-anchor='end'>−1</text><text x='55' y='205' text-anchor='end'>1</text><text x='55' y='171' text-anchor='end'>2</text><text x='55' y='137' text-anchor='end'>3</text><text x='55' y='103' text-anchor='end'>4</text><text x='55' y='69' text-anchor='end'>5</text><text x='55' y='35' text-anchor='end'>6</text><text x='55' y='251' text-anchor='end'>0</text><text x='168.8' y='47' text-anchor='end'>y = x + 2</text><text x='216.4' y='145.6' text-anchor='start'>x + y = 6</text><text x='294.6' y='220.4' text-anchor='end'>y = 1</text></g></svg>",
    svar: {
      alternativ: [
        "\\(\\begin{cases}x\\geq 0\\\\ y\\geq 1\\\\ y\\geq x+2\\\\ x+y\\leq 6\\end{cases}\\)",
        "\\(\\begin{cases}x\\geq 0\\\\ y\\leq 1\\\\ y\\leq x+2\\\\ x+y\\geq 6\\end{cases}\\)",
        "\\(\\begin{cases}x\\geq 0\\\\ y\\geq 1\\\\ y\\leq x+2\\\\ x+y\\leq 6\\end{cases}\\)",
        "\\(\\begin{cases}x\\geq 0\\\\ y\\geq 1\\\\ y\\leq x+2\\\\ x+y\\geq 6\\end{cases}\\)"
      ],
      ratt: 2
    },
    ledtradar: [
      "Gå igenom en randlinje i taget: ligger området ovanför eller under linjen?",
      "Testa med en punkt som säkert ligger i området, t.ex. \\((1,2)\\), i varje olikhet."
    ],
    losning: "<ol><li>Området ligger till höger om \\(y\\)-axeln: \\(x\\geq 0\\).</li><li>Området ligger ovanför linjen \\(y=1\\): \\(y\\geq 1\\).</li><li>Området ligger under linjen \\(y=x+2\\): \\(y\\leq x+2\\).</li><li>Området ligger under linjen \\(x+y=6\\) (mot origo): \\(x+y\\leq 6\\).</li><li>Kontroll med punkten \\((1,2)\\): \\(1\\geq 0\\), \\(2\\geq 1\\), \\(2\\leq 3\\), \\(3\\leq 6\\). ✓</li></ol><p><strong>Svar:</strong> \\(x\\geq 0,\\; y\\geq 1,\\; y\\leq x+2,\\; x+y\\leq 6\\)</p>"
  },

  // ===================== DEL B (digitala verktyg) =====================

  {
    id: "alg-020",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Algebra och polynom",
    moment: "Polynomekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>Bestäm samtliga nollställen till polynomfunktionen \\[p(x)=0{,}5x^3-3x^2+2x+4\\]</p><p>Svara med två decimaler.</p>",
    svar: { varden: [-0.83, 2, 4.83], tolerans: 0.01 },
    ledtradar: [
      "Ett tredjegradspolynom har högst tre nollställen.",
      "I GeoGebra: skriv in funktionen och använd <code>Nollställe(p)</code>, eller <code>Lös(p(x)=0)</code> i CAS."
    ],
    losning: "<ol><li>Skriv in <code>p(x)=0.5x^3-3x^2+2x+4</code> i GeoGebra.</li><li>Kommandot <code>Nollställe(p)</code> (eller <code>NLös(p(x)=0)</code> i CAS) ger tre skärningar med \\(x\\)-axeln.</li><li>\\(x_1\\approx -0{,}83\\), \\(x_2=2\\), \\(x_3\\approx 4{,}83\\). (Exakt: \\(x=2\\) och \\(x=2\\pm 2\\sqrt{2}\\).)</li></ol><p><strong>Svar:</strong> \\(x\\approx -0{,}83\\), \\(x=2\\) och \\(x\\approx 4{,}83\\)</p>"
  },

  {
    id: "alg-021",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\(5e^{0{,}3x}=40\\). Svara med två decimaler.</p>",
    svar: { varde: 6.93, tolerans: 0.01 },
    ledtradar: [
      "Dividera först med 5 så att potensen står ensam.",
      "\\(e^{0{,}3x}=8\\) ger \\(0{,}3x=\\ln 8\\). Eller använd <code>Lös()</code> i CAS."
    ],
    losning: "<ol><li>Dividera med 5: \\(e^{0{,}3x}=8\\).</li><li>Logaritmera: \\(0{,}3x=\\ln 8\\).</li><li>\\(x=\\frac{\\ln 8}{0{,}3}\\approx 6{,}93\\).</li></ol><p>I GeoGebra CAS: <code>NLös(5e^(0.3x)=40)</code> ger \\(x\\approx 6{,}93\\).</p><p><strong>Svar:</strong> \\(x\\approx 6{,}93\\)</p>"
  },

  {
    id: "alg-022",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Massan \\(m\\) gram av ett radioaktivt ämne avtar enligt modellen \\[m(t)=80\\,e^{-0{,}0231t}\\] där \\(t\\) är tiden i år.</p><p>Bestäm ämnets halveringstid, dvs. den tid det tar för massan att halveras. Svara i hela år.</p>",
    svar: { varde: 30, tolerans: 0.1, enhet: "år" },
    ledtradar: [
      "Från början är massan 80 g. Vilken massa har ämnet när hälften är kvar?",
      "Lös ekvationen \\(80e^{-0{,}0231t}=40\\), t.ex. med <code>Lös()</code> i CAS."
    ],
    losning: "<ol><li>Startmassan är \\(m(0)=80\\) g, halva massan är 40 g.</li><li>Ekvation: \\(80e^{-0{,}0231t}=40\\Leftrightarrow e^{-0{,}0231t}=0{,}5\\).</li><li>\\(-0{,}0231t=\\ln 0{,}5\\Rightarrow t=\\frac{\\ln 0{,}5}{-0{,}0231}\\approx 30{,}0\\).</li></ol><p>GeoGebra CAS: <code>NLös(80e^(-0.0231t)=40)</code> ger \\(t\\approx 30{,}0\\).</p><p><strong>Svar:</strong> Halveringstiden är ca 30 år.</p>"
  },

  {
    id: "alg-023",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En kopp kaffe har temperaturen 90 °C när den ställs på ett bord i ett rum med temperaturen 20 °C. Kaffets temperatur \\(T\\) °C efter \\(t\\) minuter kan beskrivas med modellen \\[T(t)=20+70e^{-kt}\\] där \\(k\\) är en konstant. Efter 10 minuter är temperaturen 62 °C.</p><p>Hur lång tid tar det, enligt modellen, från det att kaffet ställs på bordet tills temperaturen är 40 °C? Svara med en decimal.</p>",
    svar: { varde: 24.5, tolerans: 0.2, enhet: "min" },
    ledtradar: [
      "Bestäm först \\(k\\) med hjälp av att \\(T(10)=62\\).",
      "När du vet \\(k\\): lös \\(T(t)=40\\). I CAS kan du använda <code>Lös()</code> två gånger."
    ],
    losning: "<ol><li>Villkoret \\(T(10)=62\\): \\(20+70e^{-10k}=62\\Rightarrow e^{-10k}=\\frac{42}{70}=0{,}6\\).</li><li>\\(k=\\frac{\\ln 0{,}6}{-10}\\approx 0{,}0511\\).</li><li>Lös \\(T(t)=40\\): \\(70e^{-kt}=20\\Rightarrow e^{-kt}=\\frac{2}{7}\\Rightarrow t=\\frac{\\ln(2/7)}{-k}\\approx 24{,}5\\).</li></ol><p>GeoGebra CAS: <code>k:=NLös(20+70e^(-10k)=62)</code>, sedan <code>NLös(20+70e^(-k t)=40, t)</code>.</p><p><strong>Svar:</strong> Ca 24,5 minuter.</p>"
  },

  {
    id: "alg-024",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Algebra och polynom",
    moment: "Polynomfunktioner",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Av en rektangulär kartongbit med måtten 30 cm × 20 cm ska man tillverka en låda utan lock. Man klipper bort lika stora kvadrater med sidan \\(x\\) cm i varje hörn och viker sedan upp kanterna.</p><p>Bestäm \\(x\\) så att lådans volym blir \\(1000\\) cm³. Ange alla möjliga värden.</p>",
    svar: { facit: "\\(V(x)=x(30-2x)(20-2x)\\). \\(V(x)=1000\\) ger \\(x=5\\) eller \\(x\\approx 2{,}9\\) (lösningen \\(x\\approx 17{,}1\\) förkastas eftersom \\(0\\lt x\\lt 10\\))." },
    ledtradar: [
      "Rita en skiss. Vilken längd, bredd och höjd får lådan uttryckt i \\(x\\)?",
      "Ställ upp \\(V(x)=1000\\) och lös med CAS. Fundera på vilka värden \\(x\\) kan ha i verkligheten."
    ],
    losning: "<ol><li>När kvadraterna klippts bort och kanterna vikts upp får lådan längden \\(30-2x\\), bredden \\(20-2x\\) och höjden \\(x\\) (cm).</li><li>Volymen: \\(V(x)=x(30-2x)(20-2x)\\), ett tredjegradspolynom.</li><li>Lös \\(x(30-2x)(20-2x)=1000\\) i GeoGebra CAS: <code>NLös(x(30-2x)(20-2x)=1000)</code> ger \\(x\\approx 2{,}93\\), \\(x=5\\) och \\(x\\approx 17{,}07\\).</li><li>Definitionsmängd: bredden \\(20-2x\\) måste vara positiv, så \\(0\\lt x\\lt 10\\). Därför förkastas \\(x\\approx 17{,}07\\).</li><li>Kontroll: \\(x=5\\) ger \\(5\\cdot 20\\cdot 10=1000\\). ✓</li></ol><p><strong>Svar:</strong> \\(x=5\\) cm eller \\(x\\approx 2{,}9\\) cm</p>",
    bedomning: [
      "+E<sub>M</sub> för korrekt uppställt uttryck för volymen, \\(V(x)=x(30-2x)(20-2x)\\), och ekvationen \\(V(x)=1000\\)",
      "+C<sub>PL</sub> för båda giltiga lösningarna \\(x=5\\) och \\(x\\approx 2{,}9\\) med motivering till varför den tredje lösningen förkastas"
    ]
  },

  {
    id: "alg-025",
    kurser: ["3b", "3c"],
    del: "B",
    omrade: "Algebra och polynom",
    moment: "Polynomfunktioner",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Betrakta polynomfunktionen \\[p(x)=x^3-3x+k\\] där \\(k\\) är en konstant.</p><p>Bestäm för vilka värden på \\(k\\) som ekvationen \\(p(x)=0\\) har tre olika reella lösningar.</p>",
    svar: { facit: "\\(-2\\lt k\\lt 2\\)" },
    ledtradar: [
      "Rita grafen i GeoGebra med ett skjutreglage för \\(k\\). Hur påverkar \\(k\\) grafen?",
      "Grafen har en lokal maximipunkt och en lokal minimipunkt. Var måste de ligga i förhållande till \\(x\\)-axeln för att grafen ska skära axeln tre gånger?",
      "Vad händer precis när \\(k=2\\) eller \\(k=-2\\)?"
    ],
    losning: "<ol><li>Konstanten \\(k\\) förskjuter grafen till \\(y=x^3-3x\\) uppåt eller nedåt. Skapa ett skjutreglage <code>k</code> och skriv <code>p(x)=x^3-3x+k</code>.</li><li><code>Extrempunkt(p)</code> ger maximipunkten \\((-1,\\;2+k)\\) och minimipunkten \\((1,\\;k-2)\\) (med \\(k=0\\) får man \\((-1,2)\\) och \\((1,-2)\\)).</li><li>För tre olika nollställen måste grafen skära \\(x\\)-axeln tre gånger, dvs. maximipunkten ska ligga ovanför och minimipunkten under \\(x\\)-axeln: \\(2+k\\gt 0\\) och \\(k-2\\lt 0\\).</li><li>Det ger \\(-2\\lt k\\lt 2\\).</li><li>För \\(k=\\pm 2\\) tangerar grafen \\(x\\)-axeln i en extrempunkt (dubbelrot) och ekvationen har då bara två olika lösningar, t.ex. \\(x^3-3x+2=(x-1)^2(x+2)\\). Därför ska olikheterna vara stränga.</li></ol><p>Alternativ: \\(p(x)=0\\Leftrightarrow x^3-3x=-k\\). Den vågräta linjen \\(y=-k\\) skär grafen till \\(y=x^3-3x\\) tre gånger då \\(-2\\lt -k\\lt 2\\).</p><p><strong>Svar:</strong> \\(-2\\lt k\\lt 2\\)</p>",
    bedomning: [
      "+C<sub>PL</sub> för påbörjad lösning, t.ex. inser att extrempunkterna ska ligga på olika sidor om \\(x\\)-axeln eller undersöker grafen med skjutreglage",
      "+A<sub>PL</sub> för att bestämma gränsvärdena \\(k=-2\\) och \\(k=2\\)",
      "+A<sub>R</sub> för korrekt svar \\(-2\\lt k\\lt 2\\) med motivering till varför \\(k=\\pm 2\\) inte ingår"
    ]
  },

  {
    id: "alg-026",
    kurser: ["3c"],
    del: "B",
    omrade: "Algebra och polynom",
    moment: "Absolutbelopp",
    niva: "C",
    poang: "0/1/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\(|x^2-4|=3\\). Svara exakt eller med två decimaler.</p>",
    svar: { varden: [-2.6458, -1, 1, 2.6458], tolerans: 0.01 },
    ledtradar: [
      "Absolutbeloppet är 3 om uttrycket innanför är \\(3\\) eller \\(-3\\).",
      "Grafiskt: rita \\(y=|x^2-4|\\) (i GeoGebra <code>abs(x^2-4)</code>) och \\(y=3\\) och använd <code>Skärning()</code>. Hur många skärningspunkter finns?"
    ],
    losning: "<ol><li>\\(|x^2-4|=3\\) betyder \\(x^2-4=3\\) eller \\(x^2-4=-3\\).</li><li>\\(x^2=7\\Rightarrow x=\\pm\\sqrt{7}\\approx\\pm 2{,}65\\).</li><li>\\(x^2=1\\Rightarrow x=\\pm 1\\).</li></ol><p>Grafiskt i GeoGebra: <code>f(x)=abs(x^2-4)</code>, <code>g(x)=3</code>, <code>Skärning(f,g)</code> ger fyra punkter.</p><p><strong>Svar:</strong> \\(x=\\pm 1\\) och \\(x=\\pm\\sqrt{7}\\approx\\pm 2{,}65\\)</p>"
  },

  {
    id: "alg-027",
    kurser: ["3b"],
    del: "B",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Geometriska summor",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Elias sätter in 12 000 kr på ett sparkonto i början av varje år under 10 år. Räntesatsen är 3 % per år och oförändrad under hela tiden.</p><p>Hur mycket finns på kontot direkt efter den tionde insättningen? Svara i hela kronor.</p>",
    svar: { varde: 137567, tolerans: 2, enhet: "kr" },
    ledtradar: [
      "Den första insättningen hinner växa i 9 år, den andra i 8 år, …, den sista i 0 år.",
      "Summan \\(12\\,000+12\\,000\\cdot 1{,}03+\\ldots+12\\,000\\cdot 1{,}03^9\\) är geometrisk med \\(n=10\\) termer."
    ],
    losning: "<ol><li>Direkt efter den tionde insättningen är den sista insättningen värd 12 000 kr, den näst sista \\(12\\,000\\cdot 1{,}03\\) kr osv. Den första har vuxit i 9 år: \\(12\\,000\\cdot 1{,}03^9\\) kr.</li><li>Geometrisk summa med \\(a=12\\,000\\), \\(k=1{,}03\\), \\(n=10\\): \\[s=\\frac{12\\,000(1{,}03^{10}-1)}{1{,}03-1}\\approx 137\\,567\\]</li></ol><p>GeoGebra: <code>Summa(12000*1.03^i, i, 0, 9)</code> ger samma resultat.</p><p><strong>Svar:</strong> Ca 137 567 kr</p>"
  },

  {
    id: "alg-028",
    kurser: ["3b"],
    del: "B",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Geometriska summor",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En patient tar en tablett med 200 mg av ett läkemedel en gång per dygn. Under ett dygn bryts 60 % av den mängd läkemedel som finns i kroppen ned.</p><p>Hur mycket läkemedel finns i kroppen direkt efter att patienten tagit sin tionde tablett? Svara med en decimal.</p>",
    svar: { varde: 333.3, tolerans: 0.1, enhet: "mg" },
    ledtradar: [
      "Efter ett dygn finns 40 % kvar, dvs. mängden multipliceras med \\(0{,}4\\).",
      "Direkt efter tionde tabletten: \\(200+200\\cdot 0{,}4+200\\cdot 0{,}4^2+\\ldots+200\\cdot 0{,}4^9\\)."
    ],
    losning: "<ol><li>Av varje tablett finns efter ett dygn \\(40\\,\\%\\) kvar, så förändringsfaktorn är \\(0{,}4\\).</li><li>Direkt efter tablett nr 10 finns: den senaste tabletten (200 mg), tabletten före (\\(200\\cdot 0{,}4\\)) osv. ned till den första (\\(200\\cdot 0{,}4^9\\)).</li><li>Geometrisk summa med \\(a=200\\), \\(k=0{,}4\\), \\(n=10\\): \\[s=\\frac{200(0{,}4^{10}-1)}{0{,}4-1}\\approx 333{,}3\\]</li></ol><p>GeoGebra: <code>Summa(200*0.4^i, i, 0, 9)</code>.</p><p><strong>Svar:</strong> Ca 333,3 mg</p>"
  },

  {
    id: "alg-029",
    kurser: ["3b"],
    del: "B",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Linjär optimering",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>En möbelsnickare tillverkar bord och stolar. Ett bord kräver 4 timmar snickeri och 2 timmar lackering. En stol kräver 1 timme snickeri och 2 timmar lackering. Under en vecka finns högst 44 timmar för snickeri och högst 40 timmar för lackering. Vinsten är 700 kr per bord och 300 kr per stol.</p><p>a) Hur många bord och stolar ska tillverkas under en vecka för att vinsten ska bli så stor som möjligt? Hur stor blir vinsten?</p><p>b) Snickaren funderar på att höja priset på stolarna. Hur stor måste vinsten per stol minst vara för att det ska vara minst lika lönsamt att bara tillverka stolar?</p>",
    svar: { facit: "a) 8 bord och 12 stolar ger maximal vinst 9 200 kr. b) Minst 700 kr per stol." },
    ledtradar: [
      "Låt \\(x\\) vara antal bord och \\(y\\) antal stolar. Ställ upp en olikhet för snickeri, en för lackering och villkoren \\(x\\geq 0\\), \\(y\\geq 0\\).",
      "Rita området i GeoGebra (skriv in olikheterna) och bestäm hörnpunkterna med <code>Skärning()</code>. Beräkna vinsten \\(700x+300y\\) i varje hörn.",
      "I b): kalla vinsten per stol \\(v\\). Jämför vinsten i hörnet \\((0,20)\\) med vinsten i de övriga hörnen."
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Låt \\(x\\) = antal bord och \\(y\\) = antal stolar. Villkor: \\[4x+y\\leq 44,\\quad 2x+2y\\leq 40,\\quad x\\geq 0,\\quad y\\geq 0\\] Målfunktion: \\(V=700x+300y\\).</li><li>Rita området i GeoGebra genom att skriva in olikheterna, t.ex. <code>4x+y&lt;=44 ∧ x+y&lt;=20 ∧ x&gt;=0 ∧ y&gt;=0</code>.</li><li>Hörnpunkter: \\((0,0)\\), \\((11,0)\\), \\((0,20)\\) samt skärningen mellan \\(4x+y=44\\) och \\(x+y=20\\): <code>Skärning(4x+y=44, x+y=20)</code> ger \\((8,12)\\).</li><li>Vinst i hörnen: \\((11,0)\\): 7 700 kr, \\((8,12)\\): \\(5600+3600=9200\\) kr, \\((0,20)\\): 6 000 kr.</li></ol><p>Största vinsten fås med 8 bord och 12 stolar: 9 200 kr.</p><p><strong>b)</strong></p><ol><li>Med vinsten \\(v\\) kr per stol blir vinsten i hörnen \\((11,0)\\): 7 700, \\((8,12)\\): \\(5600+12v\\), \\((0,20)\\): \\(20v\\).</li><li>Bara stolar ska vara minst lika bra som båda de andra hörnen: \\(20v\\geq 5600+12v\\Rightarrow v\\geq 700\\) och \\(20v\\geq 7700\\Rightarrow v\\geq 385\\).</li><li>Båda villkoren uppfylls då \\(v\\geq 700\\).</li></ol><p><strong>Svar:</strong> a) 8 bord och 12 stolar, vinst 9 200 kr. b) Minst 700 kr per stol.</p>",
    bedomning: [
      "+E<sub>M</sub> för korrekt uppställda olikheter och målfunktion",
      "+C<sub>PL</sub> för korrekt bestämda hörnpunkter och korrekt slutsats: 8 bord och 12 stolar, vinst 9 200 kr",
      "+A<sub>PL</sub> för korrekt lösning av b), minst 700 kr per stol, där vinsten i \\((0,20)\\) jämförs med vinsten i övriga hörnpunkter"
    ]
  },

  {
    id: "alg-030",
    kurser: ["3b"],
    del: "B",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Geometriska summor",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Amira sätter in 24 000 kr på ett konto i slutet av varje år. Räntesatsen är 4 % per år. Den första insättningen görs i slutet av år 1.</p><p>Efter hur många insättningar överstiger saldot för första gången 500 000 kr?</p>",
    svar: { varde: 16, tolerans: 0, enhet: "insättningar" },
    ledtradar: [
      "Saldot direkt efter \\(n\\) insättningar är en geometrisk summa med \\(a=24\\,000\\) och \\(k=1{,}04\\).",
      "Lös olikheten \\(\\frac{24\\,000(1{,}04^n-1)}{0{,}04}\\gt 500\\,000\\), t.ex. genom att lösa motsvarande ekvation i CAS och avrunda uppåt."
    ],
    losning: "<ol><li>Saldot direkt efter \\(n\\) insättningar: \\[s(n)=\\frac{24\\,000(1{,}04^n-1)}{1{,}04-1}\\]</li><li>Lös \\(s(n)=500\\,000\\) i GeoGebra CAS: <code>NLös(24000(1.04^n-1)/0.04=500000)</code> ger \\(n\\approx 15{,}45\\).</li><li>\\(n\\) måste vara ett heltal. Kontroll: \\(s(15)\\approx 480\\,566\\) kr och \\(s(16)\\approx 523\\,789\\) kr.</li></ol><p><strong>Svar:</strong> Efter 16 insättningar.</p>"
  },

  // ===================== DEL C (enkel räknare) =====================

  {
    id: "alg-031",
    kurser: ["3b", "3c"],
    del: "C",
    omrade: "Algebra och polynom",
    moment: "Rationella uttryck",
    niva: "E",
    poang: "1/0/0",
    typ: "text",
    fraga: "<p>Förenkla så långt som möjligt \\[\\frac{x^2-6x+9}{2x-6}\\]</p><p>Skriv svaret med <code>/</code> för bråkstreck.</p>",
    svar: {
      godkanda: ["(x-3)/2", "(-3+x)/2", "x/2-3/2", "0.5x-1.5", "0.5(x-3)", "1/2(x-3)", "(1/2)(x-3)", "-1.5+0.5x", "-3/2+x/2"]
    },
    ledtradar: [
      "Faktorisera täljaren med en kvadreringsregel och bryt ut en faktor i nämnaren.",
      "\\(x^2-6x+9=(x-3)^2\\) och \\(2x-6=2(x-3)\\)."
    ],
    losning: "<ol><li>Täljaren: \\(x^2-6x+9=(x-3)^2\\) (andra kvadreringsregeln).</li><li>Nämnaren: \\(2x-6=2(x-3)\\).</li><li>Förkorta: \\[\\frac{(x-3)(x-3)}{2(x-3)}=\\frac{x-3}{2}\\]</li></ol><p><strong>Svar:</strong> \\(\\dfrac{x-3}{2}\\) (där \\(x\\neq 3\\))</p>"
  },

  {
    id: "alg-032",
    kurser: ["3b", "3c"],
    del: "C",
    omrade: "Algebra och polynom",
    moment: "Polynomekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\(x^3+2x^2-8x=0\\) algebraiskt.</p>",
    svar: { varden: [0, 2, -4], tolerans: 0 },
    ledtradar: [
      "Alla termer innehåller \\(x\\). Bryt ut det.",
      "Lös sedan andragradsekvationen som blir kvar, t.ex. med pq-formeln."
    ],
    losning: "<ol><li>Bryt ut \\(x\\): \\(x(x^2+2x-8)=0\\).</li><li>Nollproduktmetoden: \\(x=0\\) eller \\(x^2+2x-8=0\\).</li><li>pq-formeln: \\(x=-1\\pm\\sqrt{1+8}=-1\\pm 3\\), dvs. \\(x=2\\) eller \\(x=-4\\).</li></ol><p><strong>Svar:</strong> \\(x_1=0\\), \\(x_2=2\\), \\(x_3=-4\\)</p>"
  },

  {
    id: "alg-033",
    kurser: ["3b", "3c"],
    del: "C",
    omrade: "Algebra och polynom",
    moment: "Rationella uttryck",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Förenkla uttrycket så långt som möjligt: \\[\\frac{3}{x-2}-\\frac{12}{x^2-4}\\]</p>",
    svar: { facit: "\\(\\dfrac{3}{x+2}\\)" },
    ledtradar: [
      "Faktorisera \\(x^2-4\\). Vilken är då den minsta gemensamma nämnaren?",
      "Förläng det första bråket med \\((x+2)\\). Faktorisera täljaren efter subtraktionen – kanske går något att förkorta."
    ],
    losning: "<ol><li>Faktorisera: \\(x^2-4=(x-2)(x+2)\\). Gemensam nämnare: \\((x-2)(x+2)\\).</li><li>Förläng det första bråket: \\[\\frac{3(x+2)}{(x-2)(x+2)}-\\frac{12}{(x-2)(x+2)}=\\frac{3x+6-12}{(x-2)(x+2)}=\\frac{3x-6}{(x-2)(x+2)}\\]</li><li>Faktorisera täljaren: \\(3x-6=3(x-2)\\). Förkorta med \\((x-2)\\): \\[\\frac{3(x-2)}{(x-2)(x+2)}=\\frac{3}{x+2}\\]</li></ol><p><strong>Svar:</strong> \\(\\dfrac{3}{x+2}\\) (där \\(x\\neq\\pm 2\\))</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt skrivet på gemensam nämnare, t.ex. \\(\\frac{3x-6}{(x-2)(x+2)}\\)",
      "+C<sub>P</sub> för fullständigt förenklat uttryck \\(\\frac{3}{x+2}\\)"
    ]
  },

  {
    id: "alg-034",
    kurser: ["3b", "3c"],
    del: "C",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "C",
    poang: "0/1/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\[e^{2x}-5e^{x}+6=0\\] Svara med tre decimaler.</p>",
    svar: { varden: [0.693, 1.099], tolerans: 0.002 },
    ledtradar: [
      "Observera att \\(e^{2x}=(e^x)^2\\). Inför en ny variabel \\(t=e^x\\).",
      "Lös andragradsekvationen \\(t^2-5t+6=0\\) och gå sedan tillbaka till \\(x\\) med naturlig logaritm."
    ],
    losning: "<ol><li>Eftersom \\(e^{2x}=(e^x)^2\\) sätter vi \\(t=e^x\\): \\(t^2-5t+6=0\\).</li><li>pq-formeln: \\(t=\\frac{5}{2}\\pm\\sqrt{\\frac{25}{4}-6}=\\frac{5}{2}\\pm\\frac{1}{2}\\), dvs. \\(t=3\\) eller \\(t=2\\).</li><li>\\(e^x=2\\Rightarrow x=\\ln 2\\approx 0{,}693\\) och \\(e^x=3\\Rightarrow x=\\ln 3\\approx 1{,}099\\). (Båda \\(t\\)-värdena är positiva, så båda ger lösningar.)</li></ol><p><strong>Svar:</strong> \\(x=\\ln 2\\approx 0{,}693\\) och \\(x=\\ln 3\\approx 1{,}099\\)</p>"
  },

  {
    id: "alg-035",
    kurser: ["3b", "3c"],
    del: "C",
    omrade: "Algebra och polynom",
    moment: "Rationella uttryck",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Ekvationen \\[\\frac{x+a}{x-2}=3\\] där \\(a\\) är en konstant, har en lösning för nästan alla värden på \\(a\\).</p><p>För vilket värde på \\(a\\) saknar ekvationen lösning? Motivera ditt svar.</p>",
    svar: { facit: "\\(a=-2\\). Lösningen \\(x=\\frac{a+6}{2}\\) blir då \\(x=2\\), där vänsterledet inte är definierat." },
    ledtradar: [
      "Lös ekvationen med avseende på \\(x\\). Ditt svar kommer att innehålla \\(a\\).",
      "Vilket värde får \\(x\\) aldrig anta? För vilket \\(a\\) blir lösningen just det värdet?"
    ],
    losning: "<ol><li>Vänsterledet är definierat för \\(x\\neq 2\\). Multiplicera båda leden med \\((x-2)\\): \\(x+a=3(x-2)=3x-6\\).</li><li>Lös ut \\(x\\): \\(a+6=2x\\Rightarrow x=\\frac{a+6}{2}\\).</li><li>Denna lösning är giltig utom då den ger \\(x=2\\): \\(\\frac{a+6}{2}=2\\Leftrightarrow a=-2\\).</li><li>Kontroll: med \\(a=-2\\) blir vänsterledet \\(\\frac{x-2}{x-2}=1\\) för alla \\(x\\neq 2\\), vilket aldrig är lika med 3.</li></ol><p><strong>Svar:</strong> Ekvationen saknar lösning då \\(a=-2\\).</p>",
    bedomning: [
      "+C<sub>P</sub> för att lösa ut \\(x\\) uttryckt i \\(a\\), \\(x=\\frac{a+6}{2}\\)",
      "+A<sub>R</sub> för korrekt svar \\(a=-2\\) med motivering som bygger på att \\(x=2\\) inte är tillåtet"
    ]
  },

  {
    id: "alg-036",
    kurser: ["3b", "3c"],
    del: "C",
    omrade: "Algebra och polynom",
    moment: "Polynom",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Polynomet \\[p(x)=x^3+ax^2+bx+12\\] har nollställena \\(x=2\\) och \\(x=-3\\).</p><p>Bestäm konstanterna \\(a\\) och \\(b\\) samt samtliga nollställen till \\(p(x)\\).</p>",
    svar: { facit: "\\(a=-1\\), \\(b=-8\\). \\(p(x)=(x-2)^2(x+3)\\), så nollställena är \\(x=2\\) (dubbelrot) och \\(x=-3\\)." },
    ledtradar: [
      "Om \\(x=2\\) är ett nollställe så är \\(p(2)=0\\). Ställ upp två ekvationer.",
      "Lös ekvationssystemet för \\(a\\) och \\(b\\).",
      "För att hitta alla nollställen: \\(p(x)\\) innehåller faktorerna \\((x-2)\\) och \\((x+3)\\), dvs. \\(x^2+x-6\\). Vilken faktor \\((x-c)\\) saknas? Jämför konstanttermerna."
    ],
    losning: "<ol><li>\\(p(2)=0\\): \\(8+4a+2b+12=0\\Rightarrow 2a+b=-10\\).</li><li>\\(p(-3)=0\\): \\(-27+9a-3b+12=0\\Rightarrow 3a-b=5\\).</li><li>Addera ekvationerna: \\(5a=-5\\Rightarrow a=-1\\), och då \\(b=-10-2a=-8\\).</li><li>Alltså \\(p(x)=x^3-x^2-8x+12\\). Faktorerna \\((x-2)(x+3)=x^2+x-6\\) ingår. Ansätt \\(p(x)=(x^2+x-6)(x-c)\\). Konstanttermen: \\(-6\\cdot(-c)=6c=12\\Rightarrow c=2\\).</li><li>\\(p(x)=(x-2)^2(x+3)\\). Kontroll: \\((x^2-4x+4)(x+3)=x^3-x^2-8x+12\\). ✓</li></ol><p><strong>Svar:</strong> \\(a=-1\\), \\(b=-8\\). Nollställena är \\(x=2\\) (dubbelrot) och \\(x=-3\\). Det \"tredje\" nollstället sammanfaller alltså med \\(x=2\\).</p>",
    bedomning: [
      "+C<sub>P</sub> för korrekt uppställt ekvationssystem utifrån \\(p(2)=0\\) och \\(p(-3)=0\\)",
      "+A<sub>P</sub> för korrekt bestämda värden \\(a=-1\\) och \\(b=-8\\)",
      "+A<sub>PL</sub> för att med godtagbar motivering visa att nollställena är \\(x=2\\) (dubbelrot) och \\(x=-3\\)"
    ]
  },

  {
    id: "alg-037",
    kurser: ["3c"],
    del: "C",
    omrade: "Algebra och polynom",
    moment: "Absolutbelopp",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Lös ekvationen \\[|x-1|=2x+4\\]</p>",
    svar: { facit: "\\(x=-1\\) (fallet \\(x\\geq 1\\) ger \\(x=-5\\), som förkastas)" },
    ledtradar: [
      "Använd definitionen av absolutbelopp i formelbladet. Dela upp i fallen \\(x\\geq 1\\) och \\(x\\lt 1\\).",
      "Kontrollera att varje lösning verkligen tillhör det fall den kommer ifrån – eller pröva i ursprungsekvationen."
    ],
    losning: "<ol><li><strong>Fall 1:</strong> \\(x\\geq 1\\). Då är \\(|x-1|=x-1\\): \\(x-1=2x+4\\Rightarrow x=-5\\). Men \\(-5\\) uppfyller inte \\(x\\geq 1\\), så den förkastas.</li><li><strong>Fall 2:</strong> \\(x\\lt 1\\). Då är \\(|x-1|=-(x-1)=1-x\\): \\(1-x=2x+4\\Rightarrow x=-1\\). Detta uppfyller \\(x\\lt 1\\).</li><li>Kontroll: \\(x=-1\\): VL \\(=|-2|=2\\), HL \\(=-2+4=2\\). ✓ (Med \\(x=-5\\): VL \\(=6\\), HL \\(=-6\\).)</li></ol><p>Man kan också notera att vänsterledet aldrig är negativt, så \\(2x+4\\geq 0\\) krävs, dvs. \\(x\\geq -2\\).</p><p><strong>Svar:</strong> \\(x=-1\\)</p>",
    bedomning: [
      "+C<sub>P</sub> för att lösa båda fallen och få \\(x=-5\\) och \\(x=-1\\)",
      "+A<sub>R</sub> för korrekt svar \\(x=-1\\) med motivering till varför \\(x=-5\\) inte är en lösning"
    ]
  },

  {
    id: "alg-038",
    kurser: ["3c"],
    del: "C",
    omrade: "Algebra och polynom",
    moment: "Absolutbelopp",
    niva: "E",
    poang: "3/0/0",
    typ: "redovisning",
    fraga: "<p>a) Skriv en ekvation med absolutbelopp som beskriver att avståndet mellan talet \\(x\\) och talet \\(4\\) på tallinjen är \\(3\\).</p><p>b) Lös ekvationen i a).</p><p>c) Förklara varför ekvationen \\(|x-5|=-2\\) saknar lösning.</p>",
    svar: { facit: "a) \\(|x-4|=3\\) b) \\(x=1\\) och \\(x=7\\) c) Ett absolutbelopp är ett avstånd och kan aldrig vara negativt." },
    ledtradar: [
      "Avståndet mellan två tal \\(a\\) och \\(b\\) på tallinjen är \\(|a-b|\\).",
      "Vilka tal ligger 3 steg från 4? Och: kan ett avstånd vara negativt?"
    ],
    losning: "<p><strong>a)</strong> Avståndet mellan \\(x\\) och \\(4\\) är \\(|x-4|\\), så ekvationen är \\(|x-4|=3\\).</p><p><strong>b)</strong> \\(x-4=3\\Rightarrow x=7\\) eller \\(x-4=-3\\Rightarrow x=1\\). (På tallinjen: 3 steg åt höger respektive vänster från 4.)</p><p><strong>c)</strong> Enligt definitionen är \\(|a|=a\\) om \\(a\\geq 0\\) och \\(|a|=-a\\) om \\(a\\lt 0\\), så \\(|a|\\geq 0\\) för alla \\(a\\). \\(|x-5|\\) är avståndet mellan \\(x\\) och 5, och ett avstånd kan aldrig vara \\(-2\\). Ekvationen saknar därför lösning.</p>",
    bedomning: [
      "+E<sub>B</sub> för korrekt ekvation \\(|x-4|=3\\) (även \\(|4-x|=3\\) godtas)",
      "+E<sub>P</sub> för korrekta lösningar \\(x=1\\) och \\(x=7\\)",
      "+E<sub>R</sub> för godtagbar förklaring, t.ex. att ett absolutbelopp aldrig är negativt"
    ]
  },

  {
    id: "alg-039",
    kurser: ["3b", "3c"],
    del: "C",
    omrade: "Algebra och polynom",
    moment: "Talet e och naturlig logaritm",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\(\\ln(2x+1)=3\\). Svara med två decimaler.</p>",
    svar: { varde: 9.54, tolerans: 0.01 },
    ledtradar: [
      "Använd definitionen: \\(\\ln y=3\\Leftrightarrow y=e^3\\).",
      "Lös sedan den linjära ekvationen \\(2x+1=e^3\\)."
    ],
    losning: "<ol><li>Definitionen av ln: \\(2x+1=e^3\\).</li><li>\\(x=\\frac{e^3-1}{2}\\approx\\frac{20{,}0855-1}{2}\\approx 9{,}54\\).</li></ol><p><strong>Svar:</strong> \\(x=\\frac{e^3-1}{2}\\approx 9{,}54\\)</p>"
  },

  {
    id: "alg-040",
    kurser: ["3b"],
    del: "C",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Linjär optimering",
    niva: "C",
    poang: "2/1/0",
    typ: "redovisning",
    fraga: "<p>Ett område i ett koordinatsystem ges av olikheterna \\[x\\geq 0,\\quad y\\geq 0,\\quad x+y\\leq 10,\\quad 3x+y\\leq 18\\]</p><p>Bestäm det största värdet av \\(z=2x+y\\) i området.</p>",
    svar: { facit: "Hörnpunkter \\((0,0)\\), \\((6,0)\\), \\((4,6)\\), \\((0,10)\\). Största värdet är \\(z=14\\) i punkten \\((4,6)\\)." },
    ledtradar: [
      "Rita linjerna \\(x+y=10\\) och \\(3x+y=18\\) och skugga området. Bestäm var linjerna skär axlarna.",
      "Hörnet där de två linjerna skär varandra får du genom att lösa ekvationssystemet.",
      "Beräkna \\(z\\) i varje hörnpunkt och jämför."
    ],
    losning: "<ol><li>Linjen \\(x+y=10\\) går genom \\((0,10)\\) och \\((10,0)\\). Linjen \\(3x+y=18\\) går genom \\((0,18)\\) och \\((6,0)\\). Området ligger under båda linjerna i första kvadranten.</li><li>Skärningspunkt: \\(\\begin{cases}x+y=10\\\\3x+y=18\\end{cases}\\) Subtrahera: \\(2x=8\\Rightarrow x=4\\), \\(y=6\\).</li><li>Hörnpunkter: \\((0,0)\\), \\((6,0)\\), \\((4,6)\\), \\((0,10)\\).</li><li>\\(z=2x+y\\): \\(0\\), \\(12\\), \\(8+6=14\\), \\(10\\).</li><li>Det största värdet antas i ett hörn, så maximum är \\(14\\) i \\((4,6)\\).</li></ol><p><strong>Svar:</strong> Största värdet är \\(z=14\\), i punkten \\((4,6)\\).</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt ritat område eller korrekt bestämda hörnpunkter på axlarna, \\((6,0)\\) och \\((0,10)\\)",
      "+E<sub>P</sub> för korrekt bestämd skärningspunkt \\((4,6)\\)",
      "+C<sub>P</sub> för korrekt största värde \\(z=14\\) där \\(z\\) har beräknats i samtliga hörnpunkter"
    ]
  },

  {
    id: "alg-041",
    kurser: ["3b"],
    del: "C",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Geometriska summor",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Beräkna den geometriska summan \\[5+10+20+40+\\ldots+10\\,240\\]</p>",
    svar: { varde: 20475, tolerans: 0 },
    ledtradar: [
      "Kvoten är \\(k=2\\). Skriv sista termen som \\(5\\cdot 2^{m}\\). Vad är \\(m\\)?",
      "\\(10\\,240=5\\cdot 2048=5\\cdot 2^{11}\\). Hur många termer finns det då?"
    ],
    losning: "<ol><li>\\(a=5\\), \\(k=2\\).</li><li>Sista termen: \\(10\\,240=5\\cdot 2^{11}\\). Termerna är \\(5\\cdot 2^0,\\ldots,5\\cdot 2^{11}\\), alltså \\(n=12\\).</li><li>\\[s=\\frac{5(2^{12}-1)}{2-1}=5\\cdot 4095=20\\,475\\]</li></ol><p><strong>Svar:</strong> \\(20\\,475\\)</p>"
  },

  {
    id: "alg-042",
    kurser: ["3b"],
    del: "C",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Geometriska summor",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Klara sparar 500 kr i slutet av varje månad på ett konto med räntesatsen 0,2 % per månad. Hon sparar på detta sätt i 5 år.</p><p>a) Hur mycket finns på kontot direkt efter den sista insättningen?</p><p>b) Klara vill att det ska finnas minst 32 000 kr på kontot efter de 5 åren. Hur mycket måste hon då spara varje månad? Svara i hela kronor.</p>",
    svar: { facit: "a) Ca 31 840 kr b) 503 kr per månad" },
    ledtradar: [
      "5 år är 60 månader. Förändringsfaktorn per månad är \\(1{,}002\\).",
      "Den sista insättningen har inte hunnit växa, den första har vuxit i 59 månader. Ställ upp en geometrisk summa.",
      "I b): kalla månadsbeloppet \\(x\\). Summan blir \\(x\\) gånger samma faktor som i a)."
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Antal insättningar: \\(5\\cdot 12=60\\). Förändringsfaktor: \\(1{,}002\\).</li><li>Direkt efter sista insättningen: \\(500+500\\cdot 1{,}002+\\ldots+500\\cdot 1{,}002^{59}\\).</li><li>\\[s=\\frac{500(1{,}002^{60}-1)}{1{,}002-1}\\approx 31\\,840\\]</li></ol><p><strong>b)</strong></p><ol><li>Med månadsbeloppet \\(x\\) kr: \\(\\frac{x(1{,}002^{60}-1)}{0{,}002}\\geq 32\\,000\\).</li><li>\\(\\frac{1{,}002^{60}-1}{0{,}002}\\approx 63{,}681\\), så \\(x\\geq\\frac{32\\,000}{63{,}681}\\approx 502{,}5\\).</li><li>Avrundat uppåt till hela kronor: 503 kr (502 kr räcker inte).</li></ol><p><strong>Svar:</strong> a) Ca 31 840 kr b) 503 kr per månad</p>",
    bedomning: [
      "+E<sub>M</sub> för korrekt uppställd geometrisk summa med godtagbart svar, ca 31 840 kr",
      "+C<sub>PL</sub> för korrekt bestämt månadsbelopp, 503 kr"
    ]
  },

  {
    id: "alg-043",
    kurser: ["3b"],
    del: "C",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Geometriska summor",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Familjen Nilsson lånar 200 000 kr till en bil. Lånet ska betalas tillbaka med tio lika stora belopp (annuiteter), ett i slutet av varje år. Den första betalningen görs ett år efter att lånet tagits. Räntesatsen är 4 % per år.</p><p>Hur stor blir den årliga annuiteten? Svara i hela kronor.</p>",
    svar: { facit: "Ca 24 658 kr per år" },
    ledtradar: [
      "Tänk dig att både lånet och alla inbetalningar växer med 4 % per år fram till tidpunkten för den sista betalningen. Då måste de vara lika mycket värda.",
      "Lånet är efter 10 år värt \\(200\\,000\\cdot 1{,}04^{10}\\). Annuiteterna \\(x\\) är då värda \\(x+x\\cdot 1{,}04+\\ldots+x\\cdot 1{,}04^9\\).",
      "Beräkna summan med formeln för geometrisk summa och lös ut \\(x\\)."
    ],
    losning: "<ol><li>Låt annuiteten vara \\(x\\) kr. Jämför värdet av lånet och av betalningarna vid tidpunkten för den sista betalningen (efter 10 år).</li><li>Lånet har då vuxit till \\(200\\,000\\cdot 1{,}04^{10}\\) kr.</li><li>Den första betalningen har vuxit i 9 år, den andra i 8 år, …, den sista i 0 år: \\[x+x\\cdot 1{,}04+\\ldots+x\\cdot 1{,}04^9=\\frac{x(1{,}04^{10}-1)}{1{,}04-1}\\]</li><li>Lånet är återbetalt när värdena är lika: \\[\\frac{x(1{,}04^{10}-1)}{0{,}04}=200\\,000\\cdot 1{,}04^{10}\\]</li><li>\\[x=\\frac{200\\,000\\cdot 1{,}04^{10}\\cdot 0{,}04}{1{,}04^{10}-1}\\approx\\frac{11\\,841{,}95}{0{,}480244}\\approx 24\\,658\\]</li></ol><p>Alternativ: Summan av nuvärdena \\(\\frac{x}{1{,}04}+\\frac{x}{1{,}04^2}+\\ldots+\\frac{x}{1{,}04^{10}}\\) sätts lika med 200 000 kr, vilket ger samma svar.</p><p><strong>Svar:</strong> Annuiteten är ca 24 658 kr per år.</p>",
    bedomning: [
      "+C<sub>M</sub> för en godtagbar ansats, t.ex. inser att lånets värde efter 10 år ska vara lika med det sammanlagda värdet av annuiteterna (eller motsvarande med nuvärden)",
      "+A<sub>M</sub> för korrekt uppställd ekvation med geometrisk summa",
      "+A<sub>P</sub> för korrekt annuitet, ca 24 658 kr"
    ]
  },

  {
    id: "alg-044",
    kurser: ["3b"],
    del: "C",
    omrade: "Linjär optimering och geometriska summor",
    moment: "Linjär optimering",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Det skuggade området i figuren begränsas av olikheterna \\[x\\geq 0,\\quad y\\geq 0,\\quad x+y\\leq 6,\\quad x+2y\\leq 8\\]</p><p>Målfunktionen är \\(z=ax+y\\), där \\(a\\) är en positiv konstant.</p><p>För vilka värden på \\(a\\) antar \\(z\\) sitt största värde i punkten \\((4,2)\\)?</p>",
    figur: "<svg viewBox='0 0 314 260' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' font-family='sans-serif' font-size='14' style='max-width:340px;width:100%'><path d='M26 234V30M60 234V30M94 234V30M128 234V30M162 234V30M196 234V30M230 234V30M264 234V30M298 234V30M26 234H298M26 200H298M26 166H298M26 132H298M26 98H298M26 64H298M26 30H298' stroke-width='0.6' opacity='0.3'/><path d='M26 234L230 234L162 166L26 98Z' fill='currentColor' fill-opacity='0.18' stroke='none'/><path d='M26 234H306M26 234V22' stroke-width='1.3'/><path d='M306 234l-7 -3.5v7z M26 22l-3.5 7h7z' fill='currentColor' stroke='none'/><path d='M26 30L230 234' stroke-width='2'/><path d='M26 98L298 234' stroke-width='2'/><g fill='currentColor' stroke='none'><text x='302' y='226' font-style='italic'>x</text><text x='34' y='18' font-style='italic'>y</text><text x='60' y='251' text-anchor='middle'>1</text><text x='94' y='251' text-anchor='middle'>2</text><text x='128' y='251' text-anchor='middle'>3</text><text x='162' y='251' text-anchor='middle'>4</text><text x='196' y='251' text-anchor='middle'>5</text><text x='230' y='251' text-anchor='middle'>6</text><text x='264' y='251' text-anchor='middle'>7</text><text x='298' y='251' text-anchor='middle'>8</text><text x='21' y='205' text-anchor='end'>1</text><text x='21' y='171' text-anchor='end'>2</text><text x='21' y='137' text-anchor='end'>3</text><text x='21' y='103' text-anchor='end'>4</text><text x='21' y='69' text-anchor='end'>5</text><text x='21' y='35' text-anchor='end'>6</text><text x='21' y='251' text-anchor='end'>0</text><text x='70.2' y='64' text-anchor='start'>x + y = 6</text><text x='209.6' y='174.5' text-anchor='start'>x + 2y = 8</text><circle cx='26' cy='234' r='3.2'/><circle cx='230' cy='234' r='3.2'/><circle cx='162' cy='166' r='3.2'/><circle cx='26' cy='98' r='3.2'/></g></svg>",
    svar: { facit: "\\(0{,}5\\leq a\\leq 1\\)" },
    ledtradar: [
      "Det största värdet antas i ett hörn. Teckna \\(z\\) i hörnpunkterna \\((0,4)\\), \\((4,2)\\) och \\((6,0)\\) uttryckt i \\(a\\).",
      "Värdet i \\((4,2)\\) ska vara minst lika stort som värdet i vart och ett av de andra hörnen. Det ger två olikheter."
    ],
    losning: "<ol><li>Hörnpunkter: \\((0,0)\\), \\((6,0)\\), \\((4,2)\\), \\((0,4)\\).</li><li>\\(z=ax+y\\) i hörnen: \\((0,0)\\): \\(0\\); \\((6,0)\\): \\(6a\\); \\((4,2)\\): \\(4a+2\\); \\((0,4)\\): \\(4\\).</li><li>Villkor mot \\((6,0)\\): \\(4a+2\\geq 6a\\Leftrightarrow a\\leq 1\\).</li><li>Villkor mot \\((0,4)\\): \\(4a+2\\geq 4\\Leftrightarrow a\\geq 0{,}5\\).</li><li>Värdet i \\((0,0)\\) är 0, vilket alltid är mindre eftersom \\(a\\gt 0\\).</li></ol><p>Tolkning: nivålinjerna \\(y=-ax+z\\) ska ha en lutning mellan lutningarna för randlinjerna \\(x+2y=8\\) (lutning \\(-0{,}5\\)) och \\(x+y=6\\) (lutning \\(-1\\)). För \\(a=0{,}5\\) och \\(a=1\\) antas maximum längs en hel randsträcka, inklusive \\((4,2)\\).</p><p><strong>Svar:</strong> \\(0{,}5\\leq a\\leq 1\\)</p>",
    bedomning: [
      "+C<sub>PL</sub> för att teckna målfunktionens värden i hörnpunkterna uttryckta i \\(a\\)",
      "+A<sub>PL</sub> för att ställa upp båda villkoren \\(4a+2\\geq 6a\\) och \\(4a+2\\geq 4\\)",
      "+A<sub>R</sub> för korrekt slutsats \\(0{,}5\\leq a\\leq 1\\) (även strikta olikheter godtas om det framgår att maximum då antas enbart i \\((4,2)\\))"
    ]
  }

);
