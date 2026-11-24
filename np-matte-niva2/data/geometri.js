// Geometri – NP Matematik nivå 2a/2b/2c (GY25)
// Uppgifter geo-001 … geo-035. Format enligt data/SCHEMA.md.
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(


  {
    id: "geo-001",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Vinkelsatser",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Två räta linjer skär varandra enligt figuren. Bestäm vinkeln \\(v\\).</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><line x1="30" y1="40" x2="270" y2="160"/><line x1="60" y1="180" x2="240" y2="20"/><text x="190" y="105" fill="currentColor" stroke="none">38°</text><text x="143" y="68" fill="currentColor" stroke="none" font-style="italic">v</text></svg>`,
    svar: { varde: 142, tolerans: 0, enhet: "°" },
    ledtradar: [
      "Vinkeln \\(v\\) och vinkeln \\(38^\\circ\\) ligger bredvid varandra längs samma räta linje. Vad kallas sådana vinklar?",
      "Sidovinklar har summan \\(180^\\circ\\)."
    ],
    losning: "<p>Vinkeln \\(v\\) och \\(38^\\circ\\)-vinkeln är <strong>sidovinklar</strong> (de bildar tillsammans en rak vinkel).</p><p>\\[v = 180^\\circ - 38^\\circ = 142^\\circ\\]</p><p><em>Obs:</em> Vinkeln mitt emot \\(38^\\circ\\) (vertikalvinkeln) är också \\(38^\\circ\\), men det är inte den som efterfrågas.</p>"
  },

  {
    id: "geo-002",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Vinkelsatser",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>I en triangel förhåller sig vinklarna till varandra som \\(2:3:4\\). Hur stor är triangelns största vinkel?</p>",
    svar: { varde: 80, tolerans: 0, enhet: "°" },
    ledtradar: [
      "Kalla vinklarna \\(2x\\), \\(3x\\) och \\(4x\\).",
      "Vinkelsumman i en triangel är \\(180^\\circ\\)."
    ],
    losning: "<ol><li>Vinklarna kan skrivas \\(2x\\), \\(3x\\) och \\(4x\\).</li><li>Vinkelsumman ger \\(2x+3x+4x = 180^\\circ\\), dvs. \\(9x = 180^\\circ\\) och \\(x = 20^\\circ\\).</li><li>Största vinkeln är \\(4x = 4\\cdot 20^\\circ = 80^\\circ\\).</li></ol><p>Kontroll: \\(40^\\circ + 60^\\circ + 80^\\circ = 180^\\circ\\).</p>"
  },

  {
    id: "geo-003",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Vinkelsatser",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>I triangeln \\(ABC\\) har sidan \\(AB\\) förlängts förbi \\(B\\). Bestäm vinkeln \\(x\\).</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="40,170 220,170 140,40"/><line x1="220" y1="170" x2="290" y2="170"/><text x="22" y="190" fill="currentColor" stroke="none">A</text><text x="214" y="190" fill="currentColor" stroke="none">B</text><text x="134" y="32" fill="currentColor" stroke="none">C</text><text x="66" y="162" fill="currentColor" stroke="none">55°</text><text x="232" y="160" fill="currentColor" stroke="none">130°</text><text x="135" y="72" fill="currentColor" stroke="none" font-style="italic">x</text></svg>`,
    svar: { varde: 75, tolerans: 0, enhet: "°" },
    ledtradar: [
      "Vinkeln \\(130^\\circ\\) är en yttervinkel till triangeln.",
      "Yttervinkelsatsen: en yttervinkel är lika stor som summan av de två motstående inre vinklarna."
    ],
    losning: "<p>Enligt <strong>yttervinkelsatsen</strong> är yttervinkeln vid \\(B\\) lika med summan av de inre vinklarna vid \\(A\\) och \\(C\\):</p><p>\\[55^\\circ + x = 130^\\circ \\quad\\Rightarrow\\quad x = 75^\\circ\\]</p><p>Alternativt: inre vinkeln vid \\(B\\) är \\(180^\\circ-130^\\circ = 50^\\circ\\) och då är \\(x = 180^\\circ - 55^\\circ - 50^\\circ = 75^\\circ\\).</p>"
  },

  {
    id: "geo-004",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Pythagoras sats",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Sidlängderna i fyra trianglar anges nedan (i cm). Vilken av trianglarna är rätvinklig?</p>",
    svar: {
      alternativ: [
        "\\(4,\\ 5,\\ 6\\)",
        "\\(6,\\ 8,\\ 11\\)",
        "\\(5,\\ 12,\\ 13\\)",
        "\\(7,\\ 24,\\ 26\\)"
      ],
      ratt: 2
    },
    ledtradar: [
      "Använd Pythagoras sats baklänges (omvändningen): om \\(a^2+b^2=c^2\\) där \\(c\\) är längsta sidan, så är triangeln rätvinklig.",
      "Jämför summan av kvadraterna på de två kortaste sidorna med kvadraten på den längsta."
    ],
    losning: "<p>Enligt omvändningen av Pythagoras sats är triangeln rätvinklig om kvadraterna på de två kortare sidorna har summan lika med kvadraten på den längsta sidan.</p><ul><li>\\(4^2+5^2 = 41 \\neq 36\\)</li><li>\\(6^2+8^2 = 100 \\neq 121\\)</li><li>\\(5^2+12^2 = 25+144 = 169 = 13^2\\) ✓</li><li>\\(7^2+24^2 = 625 = 25^2 \\neq 26^2 = 676\\)</li></ul><p>Triangeln med sidorna \\(5,\\ 12,\\ 13\\) är rätvinklig.</p>"
  },

  {
    id: "geo-005",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Topptriangelsatsen",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>I triangeln \\(ABC\\) är sträckan \\(DE\\) parallell med \\(BC\\). Längderna i figuren anges i cm. Bestäm längden \\(x\\).</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="150,20 30,190 270,190"/><line x1="70" y1="133" x2="230" y2="133"/><text x="144" y="14" fill="currentColor" stroke="none">A</text><text x="14" y="200" fill="currentColor" stroke="none">B</text><text x="276" y="200" fill="currentColor" stroke="none">C</text><text x="52" y="134" fill="currentColor" stroke="none">D</text><text x="236" y="134" fill="currentColor" stroke="none">E</text><text x="96" y="78" fill="currentColor" stroke="none">4</text><text x="36" y="166" fill="currentColor" stroke="none">2</text><text x="145" y="126" fill="currentColor" stroke="none">6</text><text x="145" y="210" fill="currentColor" stroke="none" font-style="italic">x</text></svg>`,
    svar: { varde: 9, tolerans: 0, enhet: "cm" },
    ledtradar: [
      "Triangeln \\(ADE\\) är likformig med triangeln \\(ABC\\) (topptriangelsatsen).",
      "Observera att \\(AB = 4 + 2 = 6\\) cm, inte 2 cm."
    ],
    losning: "<p>Eftersom \\(DE \\parallel BC\\) är \\(\\triangle ADE \\sim \\triangle ABC\\) (topptriangelsatsen). Motsvarande sidor har samma förhållande:</p><p>\\[\\frac{x}{6} = \\frac{AB}{AD} = \\frac{4+2}{4} = \\frac{6}{4}\\]</p><p>\\[x = 6\\cdot \\frac{6}{4} = 9\\ \\text{cm}\\]</p><p>Vanligt fel: att jämföra med \\(DB = 2\\) i stället för hela sidan \\(AB = 6\\).</p>"
  },

  {
    id: "geo-006",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Avstånd och mittpunkt i koordinatsystem",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Bestäm avståndet mellan punkterna \\((2,\\ 1)\\) och \\((8,\\ 9)\\) i ett koordinatsystem med längdenheten 1 l.e.</p>",
    svar: { varde: 10, tolerans: 0, enhet: "l.e." },
    ledtradar: [
      "Rita en rätvinklig triangel där sträckan mellan punkterna är hypotenusan.",
      "Kateterna är \\(\\Delta x = 8-2\\) och \\(\\Delta y = 9-1\\)."
    ],
    losning: "<p>Med avståndsformeln (Pythagoras sats):</p><p>\\[d = \\sqrt{(8-2)^2 + (9-1)^2} = \\sqrt{6^2+8^2} = \\sqrt{36+64} = \\sqrt{100} = 10\\]</p><p>Avståndet är 10 l.e.</p>"
  },

  {
    id: "geo-007",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Avstånd och mittpunkt i koordinatsystem",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Sträckan \\(AB\\) har ändpunkterna \\(A = (-3,\\ 5)\\) och \\(B = (7,\\ -1)\\). Vilka koordinater har sträckans mittpunkt?</p>",
    svar: {
      alternativ: [
        "\\((5,\\ -3)\\)",
        "\\((2,\\ 2)\\)",
        "\\((4,\\ 4)\\)",
        "\\((-5,\\ 3)\\)"
      ],
      ratt: 1
    },
    ledtradar: [
      "Mittpunktens koordinater är medelvärdet av ändpunkternas koordinater.",
      "\\(x_M = \\dfrac{x_A + x_B}{2}\\) och \\(y_M = \\dfrac{y_A+y_B}{2}\\)."
    ],
    losning: "<p>\\[x_M = \\frac{-3+7}{2} = \\frac{4}{2} = 2, \\qquad y_M = \\frac{5+(-1)}{2} = \\frac{4}{2} = 2\\]</p><p>Mittpunkten är \\((2,\\ 2)\\).</p><p>Vanliga fel: att halvera differensen \\(\\left(\\tfrac{7-(-3)}{2},\\ \\tfrac{-1-5}{2}\\right) = (5,\\,-3)\\), eller att glömma dividera med 2 och få \\((4,\\ 4)\\).</p>"
  },

  {
    id: "geo-008",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Skala, areaskala och volymskala",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Två trianglar är likformiga. I den mindre triangeln är den kortaste sidan 4 cm och i den större triangeln är den kortaste sidan 6 cm. Den mindre triangeln har arean \\(12\\ \\text{cm}^2\\).</p><p>Bestäm den större triangelns area.</p>",
    svar: { varde: 27, tolerans: 0, enhet: "cm²" },
    ledtradar: [
      "Bestäm först längdskalan (förhållandet mellan motsvarande sidor).",
      "Areaskalan är längdskalan i kvadrat."
    ],
    losning: "<ol><li>Längdskala: \\(\\dfrac{6}{4} = \\dfrac{3}{2}\\).</li><li>Areaskala: \\(\\left(\\dfrac{3}{2}\\right)^2 = \\dfrac{9}{4}\\).</li><li>Större arean: \\(12\\cdot\\dfrac{9}{4} = 27\\ \\text{cm}^2\\).</li></ol><p>Vanligt fel: att multiplicera med längdskalan och få \\(18\\ \\text{cm}^2\\).</p>"
  },

  {
    id: "geo-009",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Randvinkelsatsen",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Punkterna \\(A\\), \\(B\\) och \\(C\\) ligger på en cirkel med medelpunkten \\(O\\). Medelpunktsvinkeln \\(AOB\\) är \\(110^\\circ\\). Bestäm randvinkeln \\(x\\).</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><circle cx="150" cy="110" r="80"/><line x1="150" y1="30" x2="80.7" y2="150"/><line x1="150" y1="30" x2="219.3" y2="150"/><line x1="150" y1="110" x2="80.7" y2="150"/><line x1="150" y1="110" x2="219.3" y2="150"/><circle cx="150" cy="110" r="2.5" fill="currentColor"/><text x="144" y="22" fill="currentColor" stroke="none">C</text><text x="62" y="162" fill="currentColor" stroke="none">A</text><text x="226" y="162" fill="currentColor" stroke="none">B</text><text x="145" y="102" fill="currentColor" stroke="none">O</text><text x="135" y="140" fill="currentColor" stroke="none">110°</text><text x="145" y="60" fill="currentColor" stroke="none" font-style="italic">x</text></svg>`,
    svar: { varde: 55, tolerans: 0, enhet: "°" },
    ledtradar: [
      "Randvinkeln \\(ACB\\) och medelpunktsvinkeln \\(AOB\\) står på samma båge \\(AB\\).",
      "Randvinkelsatsen: randvinkeln är hälften så stor som medelpunktsvinkeln på samma båge."
    ],
    losning: "<p>Randvinkeln \\(x = \\angle ACB\\) och medelpunktsvinkeln \\(\\angle AOB\\) står på samma båge \\(AB\\). Enligt <strong>randvinkelsatsen</strong> är</p><p>\\[x = \\frac{110^\\circ}{2} = 55^\\circ\\]</p>"
  },

  {
    id: "geo-010",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Geometriskt bevis",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>I triangeln \\(ABC\\) har sidan \\(AB\\) förlängts förbi \\(B\\). Yttervinkeln vid \\(B\\) kallas \\(u\\) och de inre vinklarna vid \\(A\\) och \\(C\\) kallas \\(v\\) respektive \\(w\\).</p><p>Visa att \\(u = v + w\\).</p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="40,170 220,170 140,40"/><line x1="220" y1="170" x2="290" y2="170"/><text x="22" y="190" fill="currentColor" stroke="none">A</text><text x="214" y="190" fill="currentColor" stroke="none">B</text><text x="134" y="32" fill="currentColor" stroke="none">C</text><text x="68" y="162" fill="currentColor" stroke="none" font-style="italic">v</text><text x="240" y="160" fill="currentColor" stroke="none" font-style="italic">u</text><text x="135" y="72" fill="currentColor" stroke="none" font-style="italic">w</text></svg>`,
    svar: { facit: "Med inre vinkeln \\(b\\) vid \\(B\\): \\(u = 180^\\circ - b\\) (sidovinklar) och \\(v + w = 180^\\circ - b\\) (vinkelsumman), alltså \\(u = v + w\\)." },
    ledtradar: [
      "Inför ett namn, t.ex. \\(b\\), på den inre vinkeln vid \\(B\\).",
      "Uttryck både \\(u\\) och \\(v+w\\) med hjälp av \\(b\\)."
    ],
    losning: "<ol><li>Låt \\(b\\) vara triangelns inre vinkel vid \\(B\\).</li><li>Vinklarna \\(u\\) och \\(b\\) är sidovinklar, alltså \\(u + b = 180^\\circ\\), dvs. \\(u = 180^\\circ - b\\).</li><li>Vinkelsumman i triangeln ger \\(v + w + b = 180^\\circ\\), dvs. \\(v + w = 180^\\circ - b\\).</li><li>Båda uttrycken är lika med \\(180^\\circ - b\\). Alltså gäller \\(u = v + w\\). \\(\\blacksquare\\)</li></ol>",
    bedomning: [
      "+E<sub>R</sub> för att använda sidovinklar <em>eller</em> vinkelsumman korrekt, t.ex. \\(u = 180^\\circ - b\\)",
      "+C<sub>R</sub> för ett fullständigt och generellt bevis där båda sambanden kombineras till \\(u = v + w\\) (gäller inte om beviset bygger på specifika vinkelvärden)"
    ]
  },

  {
    id: "geo-011",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Geometriskt bevis",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Sträckan \\(AB\\) är en diameter i en cirkel med medelpunkten \\(O\\). Punkten \\(C\\) ligger på cirkeln (skild från \\(A\\) och \\(B\\)).</p><p>Visa, utan att använda randvinkelsatsen, att vinkeln \\(ACB\\) alltid är \\(90^\\circ\\).</p>",
    figur: `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><circle cx="150" cy="110" r="80"/><polygon points="70,110 230,110 190,40.7"/><line x1="150" y1="110" x2="190" y2="40.7"/><circle cx="150" cy="110" r="2.5" fill="currentColor"/><text x="52" y="115" fill="currentColor" stroke="none">A</text><text x="236" y="115" fill="currentColor" stroke="none">B</text><text x="192" y="32" fill="currentColor" stroke="none">C</text><text x="145" y="128" fill="currentColor" stroke="none">O</text></svg>`,
    svar: { facit: "Trianglarna \\(AOC\\) och \\(BOC\\) är likbenta (radier). Med basvinklarna \\(\\alpha\\) och \\(\\beta\\) ger vinkelsumman i \\(ABC\\): \\(2\\alpha + 2\\beta = 180^\\circ\\), så \\(\\angle ACB = \\alpha + \\beta = 90^\\circ\\)." },
    ledtradar: [
      "Dra sträckan \\(OC\\). Vad vet du om längderna \\(OA\\), \\(OB\\) och \\(OC\\)?",
      "Trianglarna \\(AOC\\) och \\(BOC\\) är likbenta. Kalla basvinklarna \\(\\alpha\\) och \\(\\beta\\).",
      "Använd vinkelsumman i hela triangeln \\(ABC\\)."
    ],
    losning: "<ol><li>\\(OA = OB = OC = r\\) (alla är radier). Därför är trianglarna \\(AOC\\) och \\(BOC\\) likbenta.</li><li>I en likbent triangel är basvinklarna lika stora. Låt \\(\\angle OAC = \\angle OCA = \\alpha\\) och \\(\\angle OBC = \\angle OCB = \\beta\\).</li><li>Vinkeln vid \\(C\\) i triangeln \\(ABC\\) är \\(\\angle ACB = \\alpha + \\beta\\).</li><li>Vinkelsumman i triangeln \\(ABC\\): \\(\\alpha + \\beta + (\\alpha+\\beta) = 180^\\circ\\), dvs. \\(2(\\alpha+\\beta) = 180^\\circ\\).</li><li>Alltså är \\(\\angle ACB = \\alpha + \\beta = 90^\\circ\\). Eftersom \\(C\\) valdes godtyckligt på cirkeln gäller detta alltid. \\(\\blacksquare\\)</li></ol>",
    bedomning: [
      "+C<sub>R</sub> för att inse att trianglarna \\(AOC\\) och \\(BOC\\) är likbenta och att basvinklarna därför är lika stora",
      "+A<sub>R</sub> för att genomföra ett fullständigt, generellt bevis med vinkelsumman",
      "+A<sub>K</sub> för en välstrukturerad redovisning där varje steg motiveras och lämpliga beteckningar införs"
    ]
  },

  {
    id: "geo-012",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Vinkelsatser",
    niva: "C",
    poang: "0/1/0",
    typ: "flera",
    fraga: "<p>En likbent triangel har en vinkel som är \\(40^\\circ\\). Vilka värden kan triangelns <strong>största</strong> vinkel ha? Ange alla möjligheter.</p>",
    svar: { varden: [100, 70], tolerans: 0 },
    ledtradar: [
      "Vinkeln \\(40^\\circ\\) kan antingen vara en av basvinklarna eller toppvinkeln.",
      "Undersök båda fallen med hjälp av vinkelsumman \\(180^\\circ\\)."
    ],
    losning: "<p>Två fall måste undersökas:</p><ol><li><strong>\\(40^\\circ\\) är en basvinkel.</strong> Då är båda basvinklarna \\(40^\\circ\\) och toppvinkeln \\(180^\\circ - 2\\cdot 40^\\circ = 100^\\circ\\). Största vinkeln: \\(100^\\circ\\).</li><li><strong>\\(40^\\circ\\) är toppvinkeln.</strong> Då är basvinklarna \\(\\dfrac{180^\\circ - 40^\\circ}{2} = 70^\\circ\\) vardera. Största vinkeln: \\(70^\\circ\\).</li></ol><p>Svar: \\(100^\\circ\\) eller \\(70^\\circ\\).</p>"
  },

  {
    id: "geo-013",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Geometriskt bevis",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Triangeln \\(ABC\\) är rätvinklig med den räta vinkeln vid \\(C\\). Sträckan \\(CD\\) är höjden mot hypotenusan \\(AB\\).</p><p>a) Visa att trianglarna \\(ACD\\) och \\(ABC\\) är likformiga.</p><p>b) Visa att \\(AC^2 = AD \\cdot AB\\).</p>",
    figur: `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="30,180 270,180 103.8,69.2"/><line x1="103.8" y1="69.2" x2="103.8" y2="180"/><polyline points="103.8,168 115.8,168 115.8,180" stroke-width="1.5"/><polyline points="97.2,79.2 107.2,85.9 113.8,75.9" stroke-width="1.5"/><text x="14" y="195" fill="currentColor" stroke="none">A</text><text x="274" y="195" fill="currentColor" stroke="none">B</text><text x="97" y="60" fill="currentColor" stroke="none">C</text><text x="98" y="198" fill="currentColor" stroke="none">D</text></svg>`,
    svar: { facit: "a) Gemensam vinkel \\(A\\) och båda har en rät vinkel (vid \\(D\\) resp. \\(C\\)) ⇒ likformiga (vv). b) \\(\\dfrac{AC}{AB} = \\dfrac{AD}{AC}\\) ⇒ \\(AC^2 = AD\\cdot AB\\)." },
    ledtradar: [
      "Två trianglar är likformiga om två vinklar i den ena är lika stora som två vinklar i den andra.",
      "Vilken vinkel har trianglarna \\(ACD\\) och \\(ABC\\) gemensamt? Var finns de räta vinklarna?",
      "I b): para ihop motsvarande sidor. \\(AC\\) i den lilla triangeln motsvarar \\(AB\\) i den stora."
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Vinkeln vid \\(A\\) är gemensam för trianglarna \\(ACD\\) och \\(ABC\\).</li><li>\\(\\angle ADC = 90^\\circ\\) (eftersom \\(CD\\) är höjd) och \\(\\angle ACB = 90^\\circ\\) (given).</li><li>Två par vinklar är lika stora, alltså är även tredje vinkeln lika (vinkelsumman). Trianglarna är likformiga: \\(\\triangle ADC \\sim \\triangle ACB\\).</li></ol><p><strong>b)</strong> Motsvarande hörn: \\(A \\leftrightarrow A\\), \\(D \\leftrightarrow C\\), \\(C \\leftrightarrow B\\). Motsvarande sidor:</p><ul><li>hypotenusor: \\(AC\\) (i \\(\\triangle ADC\\)) och \\(AB\\) (i \\(\\triangle ACB\\))</li><li>kateter vid \\(A\\): \\(AD\\) och \\(AC\\)</li></ul><p>\\[\\frac{AC}{AB} = \\frac{AD}{AC} \\quad\\Longrightarrow\\quad AC^2 = AD\\cdot AB. \\quad\\blacksquare\\]</p>",
    bedomning: [
      "+C<sub>R</sub> för korrekt motivering av likformigheten (gemensam vinkel och rät vinkel) i a)",
      "+A<sub>R</sub> för att i b) korrekt para ihop motsvarande sidor och ställa upp förhållandet \\(\\dfrac{AC}{AB} = \\dfrac{AD}{AC}\\)",
      "+A<sub>K</sub> för en fullständig och tydlig redovisning med korrekt matematiskt språk och tydligt angivna motsvarande hörn"
    ]
  },

  {
    id: "geo-014",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Likformighet",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilket av villkoren nedan räcker <strong>inte</strong> för att två trianglar säkert ska vara likformiga?</p>",
    svar: {
      alternativ: [
        "Två vinklar i den ena triangeln är lika stora som två vinklar i den andra.",
        "Alla tre sidor i den ena triangeln är dubbelt så långa som motsvarande sidor i den andra.",
        "Två sidor i den ena triangeln är tre gånger så långa som motsvarande sidor i den andra, och vinkeln mellan dessa sidor är lika stor i båda trianglarna.",
        "Alla tre sidor i den ena triangeln är 2 cm längre än motsvarande sidor i den andra."
      ],
      ratt: 3
    },
    ledtradar: [
      "Likformiga trianglar har samma form men kan ha olika storlek: motsvarande vinklar är lika stora och motsvarande sidor har samma <em>kvot</em>.",
      "Jämför att <em>multiplicera</em> alla sidor med samma tal med att <em>addera</em> samma tal till alla sidor."
    ],
    losning: "<p>Trianglar är likformiga om motsvarande vinklar är lika stora, vilket är samma sak som att motsvarande sidor har samma kvot (formelbladet: \\(\\frac{a}{d}=\\frac{b}{e}=\\frac{c}{f}\\)).</p><ul><li>Två vinklar lika: eftersom vinkelsumman är \\(180^\\circ\\) blir även den tredje vinkeln lika. Räcker.</li><li>Alla sidor dubbelt så långa: alla kvoter är 2. Räcker.</li><li>Två sidor med kvoten 3 och lika stor mellanliggande vinkel: den ena triangeln är en förstoring av den andra. Räcker.</li><li>Alla sidor 2 cm längre: kvoterna blir olika. Motexempel: sidorna 3, 4, 5 cm och 5, 6, 7 cm ger kvoterna \\(\\frac{5}{3}\\approx 1{,}67\\) och \\(\\frac{7}{5}=1{,}4\\). Den första triangeln är rätvinklig (\\(3^2+4^2=5^2\\)) men inte den andra (\\(5^2+6^2=61\\neq 49\\)). Räcker <strong>inte</strong>.</li></ul>"
  },


  {
    id: "geo-015",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Geometri",
    moment: "Optimering med digitala verktyg",
    niva: "C",
    poang: "0/2/0",
    typ: "tal",
    fraga: "<p>En rektangel är inskriven i en halvcirkel med radien 5 cm så att en sida ligger längs diametern och två hörn ligger på cirkelbågen, se figuren.</p><p>Bestäm den största möjliga arean som rektangeln kan ha. Använd digitala verktyg.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><path d="M30,170 A120,120 0 0 1 270,170 Z"/><rect x="65" y="85" width="170" height="85"/><line x1="150" y1="170" x2="254" y2="110" stroke-dasharray="5 4"/><circle cx="150" cy="170" r="2.5" fill="currentColor"/><text x="176" y="129" fill="currentColor" stroke="none">5 cm</text><text x="144" y="190" fill="currentColor" stroke="none" font-style="italic">x</text><line x1="150" y1="178" x2="235" y2="178" stroke-width="1"/></svg>`,
    svar: { varde: 25, tolerans: 0.05, enhet: "cm²" },
    ledtradar: [
      "Låt \\(x\\) vara halva rektangelns bredd (avståndet från medelpunkten till ett hörn längs diametern).",
      "Höjden fås med Pythagoras sats: \\(h = \\sqrt{25 - x^2}\\).",
      "Arean blir \\(A(x) = 2x\\sqrt{25-x^2}\\). Rita grafen i GeoGebra och sök maximum för \\(0 < x < 5\\)."
    ],
    losning: "<ol><li>Låt \\(x\\) vara halva bredden. Hörnet på bågen ligger på avståndet 5 cm från medelpunkten, så höjden är \\(h = \\sqrt{25-x^2}\\) (Pythagoras).</li><li>Arean: \\(A(x) = 2x\\cdot\\sqrt{25-x^2}\\), där \\(0 < x < 5\\).</li><li>I GeoGebra: skriv <code>A(x) = 2x sqrt(25 - x^2)</code> och sedan <code>Max(A, 0, 5)</code> (eller använd verktyget <em>Extrempunkt</em>).</li><li>Maximum fås för \\(x \\approx 3{,}54\\) cm med \\(A \\approx 25{,}0\\ \\text{cm}^2\\).</li></ol><p>Största arean är \\(25\\ \\text{cm}^2\\) (rektangeln är då ca \\(7{,}07\\) cm bred och \\(3{,}54\\) cm hög).</p>"
  },

  {
    id: "geo-016",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Geometri",
    moment: "Optimering med digitala verktyg",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>En rak cirkulär cylinder ska placeras inuti ett klot med radien 10 cm så att cylinderns båda cirkelkanter ligger på klotets yta.</p><p>Bestäm den största möjliga volymen som cylindern kan ha. Använd digitala verktyg.</p>",
    svar: { facit: "Största volymen är ca \\(2\\,420\\ \\text{cm}^3\\) (för höjden \\(h \\approx 11{,}5\\) cm och radien \\(r \\approx 8{,}2\\) cm)." },
    ledtradar: [
      "Rita ett tvärsnitt genom klotets medelpunkt. Där syns en rektangel (cylindern) inskriven i en cirkel med radien 10 cm.",
      "Om cylinderns höjd är \\(h\\) och radie \\(r\\) gäller enligt Pythagoras \\(r^2 + \\left(\\tfrac{h}{2}\\right)^2 = 10^2\\).",
      "Uttryck volymen \\(V = \\pi r^2 h\\) som funktion av enbart \\(h\\) och bestäm maximum grafiskt."
    ],
    losning: "<ol><li>I ett tvärsnitt genom klotets medelpunkt syns en rektangel med bredd \\(2r\\) och höjd \\(h\\) inskriven i en cirkel med radien 10. Från medelpunkten till ett hörn: \\(r^2 + \\left(\\tfrac{h}{2}\\right)^2 = 100\\), alltså \\(r^2 = 100 - \\dfrac{h^2}{4}\\).</li><li>Volymen: \\(V(h) = \\pi r^2 h = \\pi\\left(100 - \\dfrac{h^2}{4}\\right)h\\), där \\(0 < h < 20\\).</li><li>I GeoGebra: <code>V(x) = pi (100 - x^2/4) x</code>, därefter <code>Max(V, 0, 20)</code>.</li><li>Maximum: \\(h \\approx 11{,}55\\) cm och \\(V \\approx 2\\,418\\ \\text{cm}^3\\). Då är \\(r = \\sqrt{100 - 11{,}55^2/4} \\approx 8{,}16\\) cm.</li></ol><p>Största volymen är ca \\(2\\,420\\ \\text{cm}^3\\) (\\(\\approx 2{,}4\\) liter).</p>",
    bedomning: [
      "+C<sub>PL</sub> för att med Pythagoras sats korrekt ställa upp sambandet mellan cylinderns radie och höjd",
      "+A<sub>M</sub> för att ställa upp en korrekt modell för volymen som funktion av en variabel, med rimlig definitionsmängd",
      "+A<sub>PL</sub> för att med digitalt verktyg bestämma maximal volym, ca \\(2\\,420\\ \\text{cm}^3\\), med godtagbar redovisning"
    ]
  },

  {
    id: "geo-017",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Geometri",
    moment: "Konstruktion i GeoGebra",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En triangel har sidorna 7 cm, 9 cm och 12 cm. Konstruera triangeln med ett digitalt verktyg, t.ex. GeoGebra, och bestäm triangelns största vinkel. Svara med en decimal.</p>",
    svar: { varde: 96.4, tolerans: 0.05, enhet: "°" },
    ledtradar: [
      "Rita sträckan med längden 12 och rita cirklar med radierna 7 och 9 kring ändpunkterna.",
      "Cirklarnas skärningspunkt blir det tredje hörnet. Den största vinkeln ligger mitt emot den längsta sidan."
    ],
    losning: "<ol><li>I GeoGebra: <code>A = (0, 0)</code>, <code>B = (12, 0)</code>.</li><li><code>c1 = Cirkel(A, 7)</code> och <code>c2 = Cirkel(B, 9)</code>. <code>C = Skärning(c1, c2)</code> (välj punkten ovanför \\(x\\)-axeln).</li><li>Rita <code>Polygon(A, B, C)</code> och mät vinkeln vid \\(C\\) med <code>Vinkel(A, C, B)</code> (eller verktyget <em>Vinkel</em>).</li><li>Vinkeln vid \\(C\\) (mitt emot sidan 12 cm) är ca \\(96{,}4^\\circ\\).</li></ol><p>Rimlighetskontroll: \\(7^2 + 9^2 = 130 < 144 = 12^2\\), så vinkeln ska vara större än \\(90^\\circ\\) – triangeln är trubbvinklig.</p>"
  },

  {
    id: "geo-018",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Geometri",
    moment: "Avstånd och mittpunkt i koordinatsystem",
    niva: "E",
    poang: "2/0/0",
    typ: "tal",
    fraga: "<p>En triangel har hörnen \\(A = (1,\\ 2)\\), \\(B = (9,\\ 4)\\) och \\(C = (3,\\ 8)\\). Bestäm triangelns omkrets. Svara med två decimaler.</p>",
    svar: { varde: 21.78, tolerans: 0.005, enhet: "l.e." },
    ledtradar: [
      "Beräkna längden av varje sida med avståndsformeln \\(d = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}\\).",
      "I GeoGebra kan du skriva <code>Polygon(A, B, C)</code> och sedan <code>Omkrets(t1)</code>."
    ],
    losning: "<ol><li>\\(AB = \\sqrt{(9-1)^2 + (4-2)^2} = \\sqrt{68} \\approx 8{,}246\\)</li><li>\\(BC = \\sqrt{(3-9)^2 + (8-4)^2} = \\sqrt{52} \\approx 7{,}211\\)</li><li>\\(AC = \\sqrt{(3-1)^2 + (8-2)^2} = \\sqrt{40} \\approx 6{,}325\\)</li><li>Omkrets: \\(\\sqrt{68}+\\sqrt{52}+\\sqrt{40} \\approx 21{,}78\\) l.e.</li></ol><p>I GeoGebra: skriv in punkterna, <code>t1 = Polygon(A, B, C)</code> och <code>Omkrets(t1)</code> ger \\(21{,}78\\).</p>"
  },

  {
    id: "geo-019",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Likformighet och optimering",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Ett 2 m högt staket står 1 m från en husvägg. En stege ska ställas på marken utanför staketet, luta över staketet och nå husväggen, se figuren.</p><p>Hur lång måste stegen minst vara? Använd digitala verktyg och svara med två decimaler.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 260 240" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="14"><line x1="40" y1="10" x2="40" y2="200" stroke-width="3"/><line x1="20" y1="200" x2="250" y2="200"/><line x1="90" y1="200" x2="90" y2="100" stroke-width="3"/><line x1="169" y1="200" x2="40" y2="37"/><text x="96" y="155" fill="currentColor" stroke="none">2 m</text><line x1="40" y1="215" x2="90" y2="215" stroke-width="1"/><text x="54" y="228" fill="currentColor" stroke="none">1 m</text><text x="125" y="226" fill="currentColor" stroke="none" font-style="italic">x</text><line x1="90" y1="208" x2="169" y2="208" stroke-width="1" stroke-dasharray="3 3"/><text x="2" y="30" fill="currentColor" stroke="none">vägg</text></svg>`,
    svar: { facit: "Stegen måste vara minst ca \\(4{,}16\\) m (foten ca \\(1{,}59\\) m från staketet)." },
    ledtradar: [
      "Låt \\(x\\) vara avståndet från stegens fot till staketet. Stegen, marken och väggen bildar en stor rätvinklig triangel; stegen, marken och staketet en liten.",
      "Trianglarna är likformiga. Höjden \\(y\\) där stegen når väggen uppfyller \\(\\dfrac{y}{x+1} = \\dfrac{2}{x}\\).",
      "Stegens längd: \\(L(x) = \\sqrt{(x+1)^2 + y^2}\\). Sök minimum grafiskt."
    ],
    losning: "<ol><li>Låt \\(x\\) (m) vara avståndet från stegens fot till staketet och \\(y\\) höjden där stegen når väggen.</li><li>Den lilla triangeln (fot–staketets bas–staketets topp) och den stora triangeln (fot–väggens bas–stegens topp) har en gemensam vinkel vid foten och var sin rät vinkel, alltså är de likformiga: \\[\\frac{y}{x+1} = \\frac{2}{x} \\quad\\Rightarrow\\quad y = \\frac{2(x+1)}{x}\\]</li><li>Pythagoras: \\(L(x) = \\sqrt{(x+1)^2 + \\left(\\dfrac{2(x+1)}{x}\\right)^2}\\), \\(x > 0\\).</li><li>I GeoGebra: <code>L(x) = sqrt((x+1)^2 + (2(x+1)/x)^2)</code> och <code>Min(L, 0.1, 10)</code>.</li><li>Minimum: \\(x \\approx 1{,}59\\) m och \\(L \\approx 4{,}16\\) m.</li></ol><p>Stegen måste vara minst ca \\(4{,}16\\) m lång.</p>",
    bedomning: [
      "+C<sub>PL</sub> för att med likformighet uttrycka höjden vid väggen i en variabel, t.ex. \\(y = \\dfrac{2(x+1)}{x}\\)",
      "+A<sub>M</sub> för en korrekt modell för stegens längd som funktion av en variabel",
      "+A<sub>PL</sub> för att med digitalt verktyg bestämma minsta längd till \\(4{,}16\\) m"
    ]
  },


  {
    id: "geo-020",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Pythagoras sats",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En 5,2 m lång stege står lutad mot en lodrät vägg. Stegens fot står 1,4 m från väggen på horisontell mark. Hur högt upp på väggen når stegen? Svara med en decimal.</p>",
    svar: { varde: 5.0, tolerans: 0.05, enhet: "m" },
    ledtradar: [
      "Stegen, väggen och marken bildar en rätvinklig triangel. Vilken sida är hypotenusa?",
      "Stegen är hypotenusan: \\(h^2 + 1{,}4^2 = 5{,}2^2\\)."
    ],
    losning: "<p>Stegen är hypotenusa i en rätvinklig triangel. Pythagoras sats ger</p><p>\\[h^2 + 1{,}4^2 = 5{,}2^2 \\quad\\Rightarrow\\quad h^2 = 27{,}04 - 1{,}96 = 25{,}08\\]</p><p>\\[h = \\sqrt{25{,}08} \\approx 5{,}0\\ \\text{m}\\]</p>"
  },

  {
    id: "geo-021",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Pythagoras sats",
    niva: "C",
    poang: "1/1/0",
    typ: "flera",
    fraga: "<p>En rätvinklig triangel har två sidor som är 6 cm och 8 cm. Hur lång kan den tredje sidan vara? Ange alla möjligheter med två decimaler.</p>",
    svar: { varden: [10, 5.29], tolerans: 0.005 },
    ledtradar: [
      "Det står inte vilka sidor som är kateter. Den längsta sidan i en rätvinklig triangel är alltid hypotenusan.",
      "Fall 1: 6 och 8 är kateter. Fall 2: 8 är hypotenusa och 6 en katet."
    ],
    losning: "<ol><li><strong>Fall 1:</strong> 6 cm och 8 cm är kateter. \\(c = \\sqrt{6^2+8^2} = \\sqrt{100} = 10\\) cm.</li><li><strong>Fall 2:</strong> 8 cm är hypotenusa och 6 cm en katet. \\(b = \\sqrt{8^2-6^2} = \\sqrt{28} \\approx 5{,}29\\) cm.</li></ol><p>(6 cm kan inte vara hypotenusa eftersom hypotenusan är längre än varje katet.)</p><p>Svar: 10 cm eller ca 5,29 cm.</p>"
  },

  {
    id: "geo-022",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Skala, areaskala och volymskala",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>På en karta i skala \\(1:20\\,000\\) har ett skogsområde arean \\(3{,}2\\ \\text{cm}^2\\). Hur stor är skogsområdets verkliga area? Svara i hektar (\\(1\\ \\text{ha} = 10\\,000\\ \\text{m}^2\\)).</p>",
    svar: { facit: "Ca \\(12{,}8\\) ha \\((128\\,000\\ \\text{m}^2)\\)" },
    ledtradar: [
      "Längdskalan är \\(1:20\\,000\\). Vad blir areaskalan?",
      "Areaskalan är \\(1:20\\,000^2 = 1:400\\,000\\,000\\).",
      "Tänk på enheterna: \\(1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2\\)."
    ],
    losning: "<ol><li>Areaskala: \\(1 : 20\\,000^2 = 1 : 400\\,000\\,000\\).</li><li>Verklig area: \\(3{,}2 \\cdot 400\\,000\\,000 = 1\\,280\\,000\\,000\\ \\text{cm}^2\\).</li><li>Omvandling: \\(1\\,280\\,000\\,000\\ \\text{cm}^2 = 128\\,000\\ \\text{m}^2\\) (dela med \\(10\\,000\\)).</li><li>\\(128\\,000\\ \\text{m}^2 = 12{,}8\\ \\text{ha}\\).</li></ol><p><em>Alternativ:</em> 1 cm på kartan motsvarar 200 m, så \\(1\\ \\text{cm}^2\\) motsvarar \\(200\\cdot 200 = 40\\,000\\ \\text{m}^2\\). \\(3{,}2 \\cdot 40\\,000 = 128\\,000\\ \\text{m}^2 = 12{,}8\\ \\text{ha}\\).</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt användning av skalan, t.ex. att 1 cm motsvarar 200 m, eller korrekt areaskala \\(1:400\\,000\\,000\\)",
      "+C<sub>P</sub> för korrekt beräknad area med korrekt enhetsbyte, \\(12{,}8\\) ha"
    ]
  },

  {
    id: "geo-023",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Skala, areaskala och volymskala",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En dryckesflaska är 20 cm hög och rymmer 0,5 liter. En annan flaska är likformig med den första men är 30 cm hög. Hur mycket rymmer den större flaskan? Svara i liter med två decimaler.</p>",
    svar: { varde: 1.69, tolerans: 0.005, enhet: "liter" },
    ledtradar: [
      "Längdskalan är \\(\\dfrac{30}{20} = 1{,}5\\).",
      "Volymskalan är längdskalan i kubik."
    ],
    losning: "<ol><li>Längdskala: \\(\\dfrac{30}{20} = 1{,}5\\).</li><li>Volymskala: \\(1{,}5^3 = 3{,}375\\).</li><li>Volym: \\(0{,}5 \\cdot 3{,}375 = 1{,}6875 \\approx 1{,}69\\) liter.</li></ol><p>Vanligt fel: att multiplicera med 1,5 (ger 0,75 liter) eller med \\(1{,}5^2\\) (ger ca 1,13 liter).</p>"
  },

  {
    id: "geo-024",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Likformighet",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En solig dag kastar en flaggstång en 12,6 m lång skugga på horisontell mark. Samtidigt kastar Ella, som är 1,80 m lång, en 2,4 m lång skugga. Hur hög är flaggstången? Svara med två decimaler.</p>",
    svar: { varde: 9.45, tolerans: 0.005, enhet: "m" },
    ledtradar: [
      "Solstrålarna är (nästan) parallella, så trianglarna som bildas av föremål, skugga och solstråle är likformiga.",
      "Ställ upp \\(\\dfrac{h}{12{,}6} = \\dfrac{1{,}80}{2{,}4}\\)."
    ],
    losning: "<p>Flaggstången med sin skugga och Ella med sin skugga bildar två likformiga rätvinkliga trianglar (samma solvinkel och rät vinkel mot marken).</p><p>\\[\\frac{h}{12{,}6} = \\frac{1{,}80}{2{,}4} \\quad\\Rightarrow\\quad h = 12{,}6\\cdot \\frac{1{,}80}{2{,}4} = 9{,}45\\ \\text{m}\\]</p>"
  },

  {
    id: "geo-025",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Likformighet",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>För att bestämma bredden \\(AB\\) av en å gör Oskar mätningar enligt figuren. Punkterna \\(B\\), \\(E\\) och \\(C\\) ligger på en rät linje, liksom \\(A\\), \\(E\\) och \\(D\\). Sträckan \\(CD\\) är parallell med \\(AB\\). Oskar mäter \\(BE = 30\\) m, \\(EC = 8\\) m och \\(CD = 12\\) m.</p><p>Bestäm åns bredd \\(AB\\). Motivera varför metoden fungerar.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="14"><path d="M10,40 Q80,30 150,42 T295,38" stroke-width="1" stroke-dasharray="4 4"/><path d="M10,168 Q80,160 150,170 T295,166" stroke-width="1" stroke-dasharray="4 4"/><text x="210" y="105" fill="currentColor" stroke="none" font-style="italic">ån</text><line x1="40" y1="30" x2="40" y2="180"/><line x1="40" y1="180" x2="242.7" y2="180"/><line x1="242.7" y1="180" x2="242.7" y2="220"/><line x1="40" y1="30" x2="242.7" y2="220"/><text x="24" y="28" fill="currentColor" stroke="none">A</text><text x="24" y="192" fill="currentColor" stroke="none">B</text><text x="182" y="198" fill="currentColor" stroke="none">E</text><text x="248" y="186" fill="currentColor" stroke="none">C</text><text x="248" y="226" fill="currentColor" stroke="none">D</text><text x="105" y="196" fill="currentColor" stroke="none">30 m</text><text x="229" y="198" fill="currentColor" stroke="none" text-anchor="middle">8</text><text x="252" y="206" fill="currentColor" stroke="none">12</text></svg>`,
    svar: { facit: "\\(AB = 45\\) m (trianglarna \\(ABE\\) och \\(DCE\\) är likformiga)." },
    ledtradar: [
      "Jämför trianglarna \\(ABE\\) och \\(DCE\\). Vilka vinklar är lika stora?",
      "Vinklarna vid \\(E\\) är vertikalvinklar. Eftersom \\(AB \\parallel CD\\) är även \\(\\angle ABE = \\angle DCE\\) (alternatvinklar).",
      "Ställ upp \\(\\dfrac{AB}{CD} = \\dfrac{BE}{CE}\\)."
    ],
    losning: "<ol><li>\\(\\angle AEB = \\angle DEC\\) eftersom de är vertikalvinklar.</li><li>\\(\\angle ABE = \\angle DCE\\) eftersom \\(AB \\parallel CD\\) (alternatvinklar).</li><li>Två vinklar lika ⇒ \\(\\triangle ABE \\sim \\triangle DCE\\). Motsvarande sidor: \\(AB \\leftrightarrow DC\\) och \\(BE \\leftrightarrow CE\\).</li><li>\\[\\frac{AB}{12} = \\frac{30}{8} \\quad\\Rightarrow\\quad AB = 12\\cdot\\frac{30}{8} = 45\\ \\text{m}\\]</li></ol><p>Åns bredd är 45 m.</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt uppställt förhållande och svar \\(AB = 45\\) m",
      "+C<sub>R</sub> för korrekt motivering av likformigheten (vertikalvinklar och alternatvinklar/parallella linjer)"
    ]
  },

  {
    id: "geo-026",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Area och volym",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En altan har formen av en rektangel med en halvcirkel i ena änden, se figuren. Bestäm altanens area. Svara med en decimal.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><path d="M40,60 H200 A50,50 0 0 1 200,160 H40 Z"/><line x1="200" y1="60" x2="200" y2="160" stroke-dasharray="5 4" stroke-width="1"/><text x="105" y="182" fill="currentColor" stroke="none">8 m</text><text x="5" y="115" fill="currentColor" stroke="none">5 m</text></svg>`,
    svar: { varde: 49.8, tolerans: 0.05, enhet: "m²" },
    ledtradar: [
      "Dela upp figuren i en rektangel och en halvcirkel.",
      "Halvcirkelns diameter är 5 m, så radien är 2,5 m."
    ],
    losning: "<ol><li>Rektangel: \\(8\\cdot 5 = 40\\ \\text{m}^2\\).</li><li>Halvcirkel med radien \\(2{,}5\\) m: \\(\\dfrac{\\pi\\cdot 2{,}5^2}{2} \\approx 9{,}82\\ \\text{m}^2\\).</li><li>Totalt: \\(40 + 9{,}82 \\approx 49{,}8\\ \\text{m}^2\\).</li></ol>"
  },

  {
    id: "geo-027",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Area och volym",
    niva: "E",
    poang: "2/0/0",
    typ: "redovisning",
    fraga: "<p>Ett tält har formen av ett prisma med en likbent triangel som gavel, se figuren. Gavelns bas är 2,4 m och de lutande sidorna är 1,5 m. Tältet är 3 m långt.</p><p>Bestäm tältets volym.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="14"><polygon points="40,170 160,170 100,125"/><line x1="100" y1="125" x2="190" y2="85"/><line x1="160" y1="170" x2="250" y2="130"/><line x1="190" y1="85" x2="250" y2="130"/><line x1="40" y1="170" x2="130" y2="130" stroke-dasharray="4 4" stroke-width="1"/><line x1="130" y1="130" x2="250" y2="130" stroke-dasharray="4 4" stroke-width="1"/><line x1="130" y1="130" x2="190" y2="85" stroke-dasharray="4 4" stroke-width="1"/><text x="80" y="190" fill="currentColor" stroke="none">2,4 m</text><text x="20" y="145" fill="currentColor" stroke="none">1,5 m</text><text x="212" y="166" fill="currentColor" stroke="none">3 m</text></svg>`,
    svar: { facit: "\\(3{,}24\\ \\text{m}^3\\)" },
    ledtradar: [
      "Volymen av ett prisma är basytans area gånger längden.",
      "Gavelns höjd fås med Pythagoras sats i en halva av triangeln: hypotenusa 1,5 m och katet 1,2 m."
    ],
    losning: "<ol><li>Gavelns höjd: \\(h = \\sqrt{1{,}5^2 - 1{,}2^2} = \\sqrt{2{,}25 - 1{,}44} = \\sqrt{0{,}81} = 0{,}9\\) m.</li><li>Gavelns area: \\(\\dfrac{2{,}4\\cdot 0{,}9}{2} = 1{,}08\\ \\text{m}^2\\).</li><li>Volym: \\(1{,}08 \\cdot 3 = 3{,}24\\ \\text{m}^3\\).</li></ol>",
    bedomning: [
      "+E<sub>P</sub> för korrekt beräknad höjd i gaveltriangeln, \\(0{,}9\\) m",
      "+E<sub>P</sub> för korrekt beräknad volym, \\(3{,}24\\ \\text{m}^3\\)"
    ]
  },

  {
    id: "geo-028",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Pythagoras sats",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>En snickare vill kontrollera att ett hörn i en ram är rätvinkligt. Hon mäter 60 cm längs den ena sidan och 80 cm längs den andra sidan från hörnet, och sedan avståndet mellan de två markeringarna. Det avståndet är 101 cm.</p><p>a) Är hörnet rätvinkligt? Motivera.</p><p>b) Är vinkeln i hörnet större eller mindre än \\(90^\\circ\\)? Motivera.</p>",
    svar: { facit: "a) Nej, \\(60^2 + 80^2 = 10\\,000 \\neq 101^2 = 10\\,201\\). b) Större än \\(90^\\circ\\) (diagonalen är längre än 100 cm, som den skulle vara vid rät vinkel)." },
    ledtradar: [
      "Om hörnet vore rätvinkligt skulle avståndet vara \\(\\sqrt{60^2+80^2}\\).",
      "Tänk dig att du öppnar vinkeln mer och mer: blir avståndet mellan markeringarna längre eller kortare?"
    ],
    losning: "<p><strong>a)</strong> Enligt omvändningen av Pythagoras sats är vinkeln rät om och endast om \\(60^2 + 80^2 = 101^2\\).</p><p>\\(60^2 + 80^2 = 3\\,600 + 6\\,400 = 10\\,000\\) men \\(101^2 = 10\\,201\\). Likheten gäller inte, så hörnet är <strong>inte</strong> rätvinkligt.</p><p><strong>b)</strong> Vid en rät vinkel skulle avståndet vara \\(\\sqrt{10\\,000} = 100\\) cm. Om vinkeln mellan sidorna (med fasta längder 60 och 80 cm) ökas så ökar avståndet mellan ändpunkterna. Eftersom avståndet är 101 cm &gt; 100 cm är vinkeln <strong>större</strong> än \\(90^\\circ\\) (något trubbig).</p>",
    bedomning: [
      "+E<sub>R</sub> för korrekt slutsats i a) med motivering via Pythagoras sats (jämförelse av \\(10\\,000\\) och \\(10\\,201\\))",
      "+C<sub>R</sub> för korrekt slutsats i b) med godtagbar motivering, t.ex. jämförelse med att diagonalen skulle vara 100 cm vid rät vinkel"
    ]
  },

  {
    id: "geo-029",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Likformighet – generellt resonemang",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Ett papper i A-formatet (t.ex. A4) har egenskapen att om man viker det på mitten, så att den långa sidan halveras, får man en ny rektangel som är likformig med den ursprungliga.</p><p>a) Bestäm förhållandet mellan den långa och den korta sidan i ett sådant papper. Svara exakt.</p><p>b) Ett A4-papper är 297 mm × 210 mm. Undersök om det stämmer med ditt svar i a).</p>",
    svar: { facit: "a) \\(\\dfrac{a}{b} = \\sqrt{2}\\). b) \\(297/210 \\approx 1{,}414 \\approx \\sqrt{2}\\), stämmer (avrundat till hela mm)." },
    ledtradar: [
      "Kalla den långa sidan \\(a\\) och den korta \\(b\\). Vilka sidor har den vikta rektangeln?",
      "Efter vikningen är sidorna \\(b\\) (lång) och \\(\\tfrac{a}{2}\\) (kort).",
      "Likformighet: förhållandet lång/kort är detsamma i båda rektanglarna."
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Låt ursprungsrektangeln ha långsidan \\(a\\) och kortsidan \\(b\\).</li><li>Efter vikning blir sidorna \\(b\\) och \\(\\tfrac{a}{2}\\). Eftersom \\(b > \\tfrac{a}{2}\\) (annars kunde rektanglarna inte vara likformiga) är \\(b\\) nu långsidan.</li><li>Likformighet ger \\[\\frac{a}{b} = \\frac{b}{a/2} = \\frac{2b}{a}\\]</li><li>Korsmultiplikation: \\(a^2 = 2b^2\\), alltså \\(\\left(\\dfrac{a}{b}\\right)^2 = 2\\) och \\(\\dfrac{a}{b} = \\sqrt{2}\\) (positiv kvot).</li></ol><p><strong>b)</strong> \\(\\dfrac{297}{210} \\approx 1{,}4143\\) och \\(\\sqrt{2} \\approx 1{,}4142\\). Det stämmer mycket väl – skillnaden beror på avrundning till hela millimeter.</p>",
    bedomning: [
      "+C<sub>PL</sub> för att korrekt ange sidorna i den vikta rektangeln och ställa upp ett likformighetsvillkor",
      "+A<sub>PL</sub> för att lösa problemet fullständigt med exakt svar \\(\\dfrac{a}{b} = \\sqrt{2}\\)",
      "+A<sub>K</sub> för en välstrukturerad redovisning med införda beteckningar, samt en jämförelse i b) som tydligt kopplas till svaret i a)"
    ]
  },

  {
    id: "geo-030",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Avstånd och mittpunkt i koordinatsystem",
    niva: "C",
    poang: "0/2/0",
    typ: "tal",
    fraga: "<p>Punkten \\(P\\) ligger på \\(y\\)-axeln och är lika långt från punkterna \\(A = (2,\\ 1)\\) och \\(B = (6,\\ 5)\\). Bestäm \\(P\\):s \\(y\\)-koordinat.</p>",
    svar: { varde: 7, tolerans: 0.001 },
    ledtradar: [
      "En punkt på \\(y\\)-axeln har koordinaterna \\((0,\\ y)\\).",
      "Sätt avståndet \\(PA\\) lika med avståndet \\(PB\\). Det blir enklare om du kvadrerar båda leden direkt.",
      "\\((0-2)^2 + (y-1)^2 = (0-6)^2 + (y-5)^2\\)"
    ],
    losning: "<ol><li>\\(P = (0,\\ y)\\). Villkoret \\(PA = PB\\) är ekvivalent med \\(PA^2 = PB^2\\).</li><li>\\((0-2)^2 + (y-1)^2 = (0-6)^2 + (y-5)^2\\)</li><li>\\(4 + y^2 - 2y + 1 = 36 + y^2 - 10y + 25\\)</li><li>\\(8y = 56 \\Rightarrow y = 7\\)</li></ol><p>Kontroll: \\(PA^2 = 4 + 36 = 40\\) och \\(PB^2 = 36 + 4 = 40\\). ✓</p><p>\\(P = (0,\\ 7)\\).</p>"
  },

  {
    id: "geo-031",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Geometri",
    moment: "Geometriskt bevis",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Kordorna \\(AB\\) och \\(CD\\) i en cirkel skär varandra i punkten \\(P\\), se figuren.</p><p>a) Visa att \\(AP \\cdot PB = CP \\cdot PD\\).</p><p>b) Använd resultatet för att bestämma \\(PD\\) om \\(AP = 4\\) cm, \\(PB = 9\\) cm och \\(CP = 3\\) cm.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 230" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><circle cx="150" cy="120" r="90"/><line x1="63.1" y1="96.7" x2="236.9" y2="143.3"/><line x1="119.2" y1="35.4" x2="119.2" y2="204.6"/><line x1="63.1" y1="96.7" x2="119.2" y2="35.4" stroke-dasharray="5 4" stroke-width="1.5"/><line x1="119.2" y1="204.6" x2="236.9" y2="143.3" stroke-dasharray="5 4" stroke-width="1.5"/><text x="45" y="96" fill="currentColor" stroke="none">A</text><text x="242" y="152" fill="currentColor" stroke="none">B</text><text x="112" y="27" fill="currentColor" stroke="none">C</text><text x="112" y="222" fill="currentColor" stroke="none">D</text><text x="124" y="102" fill="currentColor" stroke="none">P</text></svg>`,
    svar: { facit: "a) \\(\\triangle APC \\sim \\triangle DPB\\) (vertikalvinklar vid \\(P\\) och randvinklar på bågen \\(CB\\)) ⇒ \\(\\dfrac{AP}{DP} = \\dfrac{CP}{BP}\\). b) \\(PD = 12\\) cm." },
    ledtradar: [
      "Dra sträckorna \\(AC\\) och \\(DB\\) (streckade i figuren) och jämför trianglarna \\(APC\\) och \\(DPB\\).",
      "Vinklarna vid \\(P\\) är vertikalvinklar. Vinklarna \\(\\angle CAB\\) och \\(\\angle CDB\\) är randvinklar som står på samma båge.",
      "Ställ upp förhållandet mellan motsvarande sidor och korsmultiplicera."
    ],
    losning: "<p><strong>a)</strong></p><ol><li>\\(\\angle APC = \\angle DPB\\) eftersom de är vertikalvinklar.</li><li>\\(\\angle CAP = \\angle CAB\\) och \\(\\angle BDP = \\angle BDC\\) är randvinklar som står på samma båge \\(CB\\). Enligt randvinkelsatsen är de lika stora.</li><li>Två vinklar lika ⇒ \\(\\triangle APC \\sim \\triangle DPB\\), med \\(A \\leftrightarrow D\\), \\(P \\leftrightarrow P\\), \\(C \\leftrightarrow B\\).</li><li>Motsvarande sidor: \\(\\dfrac{AP}{DP} = \\dfrac{CP}{BP}\\). Korsmultiplikation ger \\(AP\\cdot BP = CP \\cdot DP\\). \\(\\blacksquare\\)</li></ol><p><strong>b)</strong> \\(4\\cdot 9 = 3\\cdot PD \\Rightarrow PD = \\dfrac{36}{3} = 12\\) cm.</p>",
    bedomning: [
      "+C<sub>R</sub> för att identifiera lämpliga trianglar och motivera minst ett par lika vinklar korrekt (vertikalvinklar eller randvinkelsatsen)",
      "+A<sub>R</sub> för ett fullständigt bevis med korrekt motiverad likformighet och korrekt uppställt förhållande mellan motsvarande sidor",
      "+A<sub>K</sub> för en välstrukturerad redovisning där det tydligt framgår vilka hörn som motsvarar varandra, samt korrekt svar \\(PD = 12\\) cm i b)"
    ]
  },

  {
    id: "geo-032",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Skala, areaskala och volymskala",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>En modellbil är byggd i skala \\(1:18\\). Modellen är 25 cm lång. Hur lång är den verkliga bilen?</p>",
    svar: {
      alternativ: [
        "1,4 m",
        "45 m",
        "4,5 m",
        "0,45 m"
      ],
      ratt: 2
    },
    ledtradar: [
      "Skala \\(1:18\\) betyder att verkligheten är 18 gånger större än modellen.",
      "\\(25 \\cdot 18\\) cm, och omvandla sedan till meter."
    ],
    losning: "<p>Skala \\(1:18\\): varje längd i verkligheten är 18 gånger längre än på modellen.</p><p>\\[25 \\cdot 18 = 450\\ \\text{cm} = 4{,}5\\ \\text{m}\\]</p><p>Vanliga fel: att dividera (\\(25/18 \\approx 1{,}4\\)) eller att göra fel vid enhetsbytet (45 m eller 0,45 m).</p>"
  },

  {
    id: "geo-033",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Skala, areaskala och volymskala",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>En rektangulär bild förstoras så att både längd och bredd ökar med 20 %. Med hur många procent ökar bildens area?</p>",
    svar: {
      alternativ: [
        "20 %",
        "40 %",
        "44 %",
        "120 %"
      ],
      ratt: 2
    },
    ledtradar: [
      "En ökning med 20 % motsvarar förändringsfaktorn 1,2 för varje längd.",
      "Arean förändras med faktorn \\(1{,}2^2\\) (areaskalan)."
    ],
    losning: "<p>Längdskalan är \\(1{,}2\\). Areaskalan är \\(1{,}2^2 = 1{,}44\\).</p><p>Arean blir \\(1{,}44\\) gånger så stor, dvs. den ökar med <strong>44 %</strong>.</p><p>Kontroll med exempel: \\(10 \\times 5\\) ger area 50. Förstorad: \\(12\\times 6\\) ger area 72. \\(72/50 = 1{,}44\\).</p><p>Vanligt fel: att addera procenten (\\(20+20 = 40\\) %).</p>"
  },

  {
    id: "geo-034",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Kortaste väg – spegling och Pythagoras",
    niva: "A",
    poang: "1/1/2",
    typ: "redovisning",
    fraga: "<p>Två lodräta stolpar står på horisontell mark 20 m från varandra. Den ena stolpen är 6 m hög och den andra 9 m hög. En lina ska spännas från toppen av den lägre stolpen ned till en punkt \\(P\\) på marken mellan stolparna och sedan upp till toppen av den högre stolpen.</p><p>Var ska punkten \\(P\\) placeras för att linan ska bli så kort som möjligt, och hur lång blir linan då?</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 280 215" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="14"><line x1="20" y1="180" x2="260" y2="180"/><line x1="40" y1="180" x2="40" y2="120" stroke-width="3"/><line x1="240" y1="180" x2="240" y2="90" stroke-width="3"/><polyline points="40,120 120,180 240,90"/><circle cx="120" cy="180" r="3" fill="currentColor"/><text x="115" y="172" fill="currentColor" stroke="none">P</text><text x="8" y="155" fill="currentColor" stroke="none">6 m</text><text x="246" y="140" fill="currentColor" stroke="none">9 m</text><line x1="40" y1="196" x2="240" y2="196" stroke-width="1"/><text x="128" y="211" fill="currentColor" stroke="none">20 m</text></svg>`,
    svar: { facit: "\\(P\\) ska ligga 8 m från den lägre stolpen. Linan blir då \\(10 + 15 = 25\\) m." },
    ledtradar: [
      "Spegla den lägre stolpens topp i marken. Linans längd från den speglade punkten till \\(P\\) är densamma som från den verkliga toppen.",
      "Den kortaste vägen mellan två punkter är en rät linje. Vilken rätvinklig triangel bildas med den speglade punkten och den högre stolpens topp?",
      "För att hitta \\(P\\): de två rätvinkliga trianglarna (vid respektive stolpe) är likformiga."
    ],
    losning: "<ol><li>Spegla toppen \\(T_1\\) på den 6 m höga stolpen i marken till en punkt \\(T_1'\\) som ligger 6 m <em>under</em> marken. För varje punkt \\(P\\) på marken gäller \\(PT_1 = PT_1'\\).</li><li>Linans längd \\(T_1P + PT_2 = T_1'P + PT_2\\) blir minst när \\(T_1'\\), \\(P\\) och \\(T_2\\) ligger på en rät linje.</li><li>Den räta linjen \\(T_1'T_2\\) är hypotenusa i en rätvinklig triangel med kateterna 20 m (horisontellt) och \\(6 + 9 = 15\\) m (lodrätt): \\[L = \\sqrt{20^2 + 15^2} = \\sqrt{625} = 25\\ \\text{m}\\]</li><li>Läget för \\(P\\): Låt \\(x\\) vara avståndet från den lägre stolpen. Trianglarna vid stolparna är likformiga (vertikalvinklar vid \\(P\\) och räta vinklar), så \\[\\frac{x}{6} = \\frac{20-x}{9} \\Rightarrow 9x = 120 - 6x \\Rightarrow x = 8\\ \\text{m}\\]</li><li>Kontroll: \\(\\sqrt{8^2+6^2} + \\sqrt{12^2+9^2} = 10 + 15 = 25\\) m.</li></ol><p>\\(P\\) ska ligga 8 m från den lägre stolpen och linan blir 25 m.</p>",
    bedomning: [
      "+E<sub>P</sub> för att korrekt beräkna linans längd för något valt läge på \\(P\\) med Pythagoras sats",
      "+C<sub>PL</sub> för en godtagbar metod som leder mot minimum (t.ex. spegling, systematisk prövning eller funktion av en variabel)",
      "+A<sub>PL</sub> för korrekt läge, \\(P\\) 8 m från den lägre stolpen, och längden 25 m",
      "+A<sub>R</sub> för en motivering till varför lösningen verkligen ger den kortaste linan (t.ex. via spegling och att rät linje är kortast)"
    ]
  },

  {
    id: "geo-035",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Geometri",
    moment: "Likformighet",
    niva: "C",
    poang: "0/2/0",
    typ: "tal",
    fraga: "<p>Triangeln \\(ABC\\) är rätvinklig med den räta vinkeln vid \\(C\\). Höjden \\(CD\\) mot hypotenusan delar den i delarna \\(AD = 4\\) cm och \\(DB = 9\\) cm.</p><p>Bestäm triangelns area.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="30,180 270,180 103.8,69.2"/><line x1="103.8" y1="69.2" x2="103.8" y2="180"/><polyline points="103.8,168 115.8,168 115.8,180" stroke-width="1.5"/><polyline points="97.2,79.2 107.2,85.9 113.8,75.9" stroke-width="1.5"/><text x="14" y="195" fill="currentColor" stroke="none">A</text><text x="274" y="195" fill="currentColor" stroke="none">B</text><text x="97" y="60" fill="currentColor" stroke="none">C</text><text x="98" y="198" fill="currentColor" stroke="none">D</text><text x="60" y="174" fill="currentColor" stroke="none">4</text><text x="180" y="174" fill="currentColor" stroke="none">9</text></svg>`,
    svar: { varde: 39, tolerans: 0.01, enhet: "cm²" },
    ledtradar: [
      "Trianglarna \\(ACD\\) och \\(CBD\\) är likformiga (båda är likformiga med \\(ABC\\)).",
      "Likformigheten ger \\(\\dfrac{CD}{AD} = \\dfrac{DB}{CD}\\), alltså \\(CD^2 = AD\\cdot DB\\).",
      "Arean är \\(\\dfrac{AB\\cdot CD}{2}\\)."
    ],
    losning: "<ol><li>\\(\\triangle ADC\\) och \\(\\triangle CDB\\) är likformiga: båda har en rät vinkel vid \\(D\\), och \\(\\angle ACD = 90^\\circ - \\angle A = \\angle B\\).</li><li>Motsvarande sidor: \\(\\dfrac{CD}{AD} = \\dfrac{DB}{CD}\\), så \\(CD^2 = AD\\cdot DB = 4\\cdot 9 = 36\\) och \\(CD = 6\\) cm.</li><li>Hypotenusan: \\(AB = 4 + 9 = 13\\) cm.</li><li>Area: \\(\\dfrac{13 \\cdot 6}{2} = 39\\ \\text{cm}^2\\).</li></ol><p>Kontroll med Pythagoras: \\(AC^2 = 16+36 = 52\\), \\(BC^2 = 81+36 = 117\\), \\(52 + 117 = 169 = 13^2\\). ✓</p>"
  }
);
