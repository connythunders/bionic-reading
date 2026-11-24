// Geometri, trigonometri, vektorer och problemlösning – NP Matematik nivå 1a/1b/1c (Gy25)
// Uppgifter gtv-001 … gtv-042. Format enligt data/SCHEMA.md.
// Geometri (yrkesinriktat) taggas 1a; trigonometri, vektorer och programmering endast 1c;
// generella samband för alla nivåer.
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(

  {
    id: "gtv-001",
    kurser: ["1a"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Skala",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En snickare har en ritning i skala \\(1:50\\). På ritningen är en vägg \\(6{,}4\\) cm lång.</p><p>Hur lång är väggen i verkligheten? Svara i meter.</p>",
    svar: {"varde": 3.2, "tolerans": 0.001, "enhet": "m"},
    ledtradar: ["Skala \\(1:50\\) betyder att 1 cm på ritningen motsvarar 50 cm i verkligheten.", "Räkna först ut längden i cm och gör sedan om till meter (100 cm = 1 m)."],
    losning: "<ol><li>Skala \\(1:50\\): verkliga längden är 50 gånger så lång som på ritningen.</li><li>\\(6{,}4 \\cdot 50 = 320\\) cm.</li><li>\\(320\\ \\text{cm} = 3{,}2\\ \\text{m}\\).</li></ol><p>Väggen är \\(3{,}2\\) m lång.</p>"
  },

  {
    id: "gtv-002",
    kurser: ["1a"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Areaskala",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En planritning över en lägenhet är gjord i skala \\(1:100\\). Ett sovrum har arean \\(12\\ \\text{cm}^2\\) på ritningen.</p><p>Hur stor area har sovrummet i verkligheten? Svara i \\(\\text{m}^2\\).</p>",
    svar: {"varde": 12, "tolerans": 0.001, "enhet": "m²"},
    ledtradar: ["Om längdskalan är \\(1:100\\) så är areaskalan \\((1:100)^2\\).", "Areaskalan \\(1:10\\,000\\) betyder att \\(1\\ \\text{cm}^2\\) på ritningen motsvarar \\(10\\,000\\ \\text{cm}^2\\) i verkligheten. Hur många \\(\\text{cm}^2\\) är \\(1\\ \\text{m}^2\\)?"],
    losning: "<ol><li>Längdskala \\(1:100\\) ger areaskala \\(1:100^2 = 1:10\\,000\\).</li><li>Verklig area: \\(12 \\cdot 10\\,000 = 120\\,000\\ \\text{cm}^2\\).</li><li>Eftersom \\(1\\ \\text{m}^2 = 100\\ \\text{cm} \\cdot 100\\ \\text{cm} = 10\\,000\\ \\text{cm}^2\\) blir arean \\(\\dfrac{120\\,000}{10\\,000} = 12\\ \\text{m}^2\\).</li></ol><p>Alternativt: 1 cm på ritningen är 1 m i verkligheten, så \\(1\\ \\text{cm}^2\\) motsvarar \\(1\\ \\text{m}^2\\).</p><p>Vanligt fel: att bara multiplicera med 100 och få \\(1200\\ \\text{cm}^2 = 0{,}12\\ \\text{m}^2\\).</p>"
  },

  {
    id: "gtv-003",
    kurser: ["1a"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Vinklar",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Figuren visar en takstol som har formen av en likbent triangel. Vinkeln i nocken (toppen) är \\(110^\\circ\\).</p><p>Hur stor är takvinkeln \\(v\\)?</p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="30,175 270,175 150,91.0"/><path d="M 64.0 175.0 A 34 34 0 0 0 57.9 155.5" stroke-width="1.5"/><path d="M 128.7 105.9 A 26 26 0 0 0 171.3 105.9" stroke-width="1.5"/><text x="72" y="167" fill="currentColor" stroke="none" font-style="italic">v</text><text x="133" y="136.975" fill="currentColor" stroke="none">110°</text><line x1="86" y1="145" x2="94" y2="152" stroke-width="1.5"/><line x1="206" y1="145" x2="214" y2="152" stroke-width="1.5"/><text x="120" y="196" fill="currentColor" stroke="none" font-size="14">takbjälke</text></svg>`,
    svar: {"varde": 35, "tolerans": 0, "enhet": "°"},
    ledtradar: ["Vinkelsumman i en triangel är \\(180^\\circ\\).", "I en likbent triangel är de två basvinklarna lika stora."],
    losning: "<ol><li>Vinkelsumman i triangeln är \\(180^\\circ\\), så basvinklarna är tillsammans \\(180^\\circ - 110^\\circ = 70^\\circ\\).</li><li>Triangeln är likbent, så basvinklarna är lika stora: \\(v = \\dfrac{70^\\circ}{2} = 35^\\circ\\).</li></ol>"
  },

  {
    id: "gtv-004",
    kurser: ["1a"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Likformighet",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En solig dag är en \\(1{,}8\\) m lång person skugga \\(1{,}2\\) m lång. Samtidigt är skuggan av en flaggstång \\(9\\) m lång.</p><p>Hur hög är flaggstången?</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><line x1="10" y1="175" x2="310" y2="175"/><line x1="40" y1="175" x2="40" y2="133"/><circle cx="40" cy="127" r="6"/><line x1="40" y1="121" x2="68" y2="175" stroke-dasharray="5 4" stroke-width="1.5"/><text x="10" y="160" fill="currentColor" stroke="none" font-size="14">1,8 m</text><text x="36" y="194" fill="currentColor" stroke="none" font-size="14">1,2 m</text><line x1="180" y1="175" x2="180" y2="30" stroke-width="3"/><line x1="180" y1="30" x2="300" y2="175" stroke-dasharray="5 4" stroke-width="1.5"/><text x="162" y="108" fill="currentColor" stroke="none" font-style="italic">h</text><text x="222" y="194" fill="currentColor" stroke="none" font-size="14">9 m</text><polyline points="190,175 190,165 180,165" stroke-width="1.5"/></svg>`,
    svar: {"varde": 13.5, "tolerans": 0.01, "enhet": "m"},
    ledtradar: ["Solstrålarna kommer in med samma vinkel mot marken, så de två trianglarna är likformiga.", "Hur många gånger längre är flaggstångens skugga än personens skugga?"],
    losning: "<ol><li>Trianglarna (person–skugga och stång–skugga) är likformiga eftersom båda har en rät vinkel och solstrålarna har samma vinkel mot marken.</li><li>Skalfaktor: \\(\\dfrac{9}{1{,}2} = 7{,}5\\).</li><li>Flaggstångens höjd: \\(h = 7{,}5 \\cdot 1{,}8 = 13{,}5\\) m.</li></ol><p>Kontroll med förhållande: \\(\\dfrac{h}{9} = \\dfrac{1{,}8}{1{,}2} = 1{,}5\\) ger \\(h = 13{,}5\\) m.</p>"
  },

  {
    id: "gtv-005",
    kurser: ["1a"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Pythagoras sats",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En \\(2{,}5\\) m lång stege står lutad mot en vägg. Stegens fot står \\(0{,}7\\) m från väggen.</p><p>Hur högt upp på väggen når stegen?</p>",
    figur: `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><line x1="20" y1="185" x2="280" y2="185"/><line x1="220" y1="25" x2="220" y2="185" stroke-width="3"/><line x1="178" y1="185" x2="220" y2="41" stroke-width="2.5"/><polyline points="208,185 208,173 220,173" stroke-width="1.5"/><text x="150" y="112" fill="currentColor" stroke="none">2,5 m</text><text x="174" y="204" fill="currentColor" stroke="none">0,7 m</text><text x="230" y="118" fill="currentColor" stroke="none" font-style="italic">h</text></svg>`,
    svar: {"varde": 2.4, "tolerans": 0.001, "enhet": "m"},
    ledtradar: ["Stegen, väggen och marken bildar en rätvinklig triangel. Vilken sida är hypotenusa?", "\\(h^2 + 0{,}7^2 = 2{,}5^2\\)"],
    losning: "<ol><li>Stegen är hypotenusa: \\(h^2 + 0{,}7^2 = 2{,}5^2\\).</li><li>\\(h^2 = 6{,}25 - 0{,}49 = 5{,}76\\).</li><li>\\(h = \\sqrt{5{,}76} = 2{,}4\\) (eftersom \\(24^2 = 576\\)).</li></ol><p>Stegen når \\(2{,}4\\) m upp på väggen.</p>"
  },

  {
    id: "gtv-006",
    kurser: ["1a"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Avrundning och mätfel",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Lukas mäter en bräda och skriver upp längden \\(2{,}4\\) m. Längden är avrundad till närmaste decimeter.</p><p>Vilken är den kortaste längd brädan kan ha?</p>",
    svar: {"alternativ": ["\\(2{,}3\\) m", "\\(2{,}35\\) m", "\\(2{,}39\\) m", "\\(2{,}395\\) m"], "ratt": 1},
    ledtradar: ["Vilka längder avrundas till \\(2{,}4\\) m när man avrundar till en decimal?", "Avrundningsgränsen ligger mitt emellan \\(2{,}3\\) och \\(2{,}4\\)."],
    losning: "<p>Alla längder från \\(2{,}35\\) m upp till (men inte med) \\(2{,}45\\) m avrundas till \\(2{,}4\\) m. Den kortaste möjliga längden är därför \\(2{,}35\\) m.</p><p>\\(2{,}39\\) m och \\(2{,}395\\) m avrundas visserligen också till \\(2{,}4\\) m, men det finns kortare längder som gör det. \\(2{,}3\\) m avrundas till \\(2{,}3\\) m.</p>"
  },

  {
    id: "gtv-007",
    kurser: ["1a"],
    del: "B",
    omrade: "Geometri och trigonometri",
    moment: "Materialåtgång",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En plattsättare ska sätta kakel på en vägg som är \\(2{,}4\\) m bred och \\(1{,}5\\) m hög. Hon räknar med \\(10\\ \\%\\) spill.</p><p>Kaklet säljs i paket som räcker till \\(0{,}96\\ \\text{m}^2\\). Hur många paket behöver hon köpa?</p>",
    svar: {"varde": 5, "tolerans": 0, "enhet": "paket"},
    ledtradar: ["Beräkna väggens area och lägg sedan till \\(10\\ \\%\\) (multiplicera med \\(1{,}10\\)).", "Man kan bara köpa hela paket – avrunda uppåt."],
    losning: "<ol><li>Väggens area: \\(2{,}4 \\cdot 1{,}5 = 3{,}6\\ \\text{m}^2\\).</li><li>Med \\(10\\ \\%\\) spill: \\(3{,}6 \\cdot 1{,}10 = 3{,}96\\ \\text{m}^2\\).</li><li>Antal paket: \\(\\dfrac{3{,}96}{0{,}96} \\approx 4{,}1\\).</li><li>Fyra paket räcker inte, så hon måste köpa <strong>5 paket</strong>.</li></ol>"
  },

  {
    id: "gtv-008",
    kurser: ["1a"],
    del: "B",
    omrade: "Geometri och trigonometri",
    moment: "Volym och svinn",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En betongplatta till ett förråd ska vara \\(4{,}0\\) m lång, \\(3{,}0\\) m bred och \\(15\\) cm tjock. Man räknar med \\(5\\ \\%\\) svinn.</p><p>Hur många kubikmeter betong ska beställas?</p>",
    svar: {"varde": 1.89, "tolerans": 0.005, "enhet": "m³"},
    ledtradar: ["Gör om tjockleken till meter innan du räknar volymen.", "\\(5\\ \\%\\) svinn innebär att volymen ska multipliceras med \\(1{,}05\\)."],
    losning: "<ol><li>Tjocklek: \\(15\\ \\text{cm} = 0{,}15\\ \\text{m}\\).</li><li>Volym: \\(4{,}0 \\cdot 3{,}0 \\cdot 0{,}15 = 1{,}8\\ \\text{m}^3\\).</li><li>Med \\(5\\ \\%\\) svinn: \\(1{,}8 \\cdot 1{,}05 = 1{,}89\\ \\text{m}^3\\).</li></ol><p>Man ska beställa \\(1{,}89\\ \\text{m}^3\\) (i praktiken ofta avrundat uppåt till \\(1{,}9\\ \\text{m}^3\\)).</p>"
  },

  {
    id: "gtv-009",
    kurser: ["1a"],
    del: "C",
    omrade: "Geometri och trigonometri",
    moment: "Spill och svinn",
    niva: "C",
    poang: "1/1/0",
    typ: "tal",
    fraga: "<p>Figuren visar ett L-format golv sett ovanifrån. Golvet ska läggas med laminat som säljs i paket om \\(2{,}22\\ \\text{m}^2\\). Golvläggaren räknar med \\(8\\ \\%\\) spill.</p><p>Hur många paket behöver köpas?</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 320 270" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polygon points="40,30 180,30 180,110 280,110 280,230 40,230"/><text x="135" y="252" fill="currentColor" stroke="none">6,0 m</text><text x="4" y="136" fill="currentColor" stroke="none">5,0 m</text><text x="206" y="102" fill="currentColor" stroke="none">2,5 m</text><text x="186" y="76" fill="currentColor" stroke="none">2,0 m</text></svg>`,
    svar: {"varde": 13, "tolerans": 0, "enhet": "paket"},
    ledtradar: ["Beräkna arean som en stor rektangel minus det bortskurna hörnet, eller dela upp golvet i två rektanglar.", "Lägg till \\(8\\ \\%\\) spill och avrunda antalet paket uppåt."],
    losning: "<ol><li>Golvets area: \\(6{,}0 \\cdot 5{,}0 - 2{,}5 \\cdot 2{,}0 = 30 - 5 = 25\\ \\text{m}^2\\).</li><li>Med spill: \\(25 \\cdot 1{,}08 = 27\\ \\text{m}^2\\).</li><li>Antal paket: \\(\\dfrac{27}{2{,}22} \\approx 12{,}2\\).</li><li>12 paket räcker inte, så det behövs <strong>13 paket</strong>.</li></ol><p>Vanligt fel: att glömma spillet, vilket ger \\(25/2{,}22 \\approx 11{,}3\\), dvs. 12 paket.</p>"
  },

  {
    id: "gtv-010",
    kurser: ["1a"],
    del: "C",
    omrade: "Geometri och trigonometri",
    moment: "Volym och enhetsbyten",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En cylinderformad vattentank har innerdiametern \\(1{,}2\\) m och höjden \\(1{,}8\\) m.</p><p>Hur många liter rymmer tanken? Avrunda till hela liter.</p>",
    svar: {"varde": 2036, "tolerans": 3, "enhet": "liter"},
    ledtradar: ["Volymen av en cylinder är basytans area gånger höjden, \\(V = \\pi r^2 h\\). Radien är halva diametern.", "\\(1\\ \\text{m}^3 = 1000\\ \\text{dm}^3 = 1000\\) liter."],
    losning: "<ol><li>Radie: \\(r = 0{,}6\\) m.</li><li>\\(V = \\pi \\cdot 0{,}6^2 \\cdot 1{,}8 \\approx 2{,}0358\\ \\text{m}^3\\).</li><li>\\(2{,}0358\\ \\text{m}^3 = 2035{,}8\\ \\text{dm}^3 \\approx 2036\\) liter.</li></ol><p>Tanken rymmer ungefär 2036 liter.</p>"
  },

  {
    id: "gtv-011",
    kurser: ["1a"],
    del: "C",
    omrade: "Geometri och trigonometri",
    moment: "Pythagoras sats och materialåtgång",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>Ett förråd har ett symmetriskt sadeltak. Figuren visar ett tvärsnitt av förrådet. Förrådet är \\(8{,}0\\) m brett och \\(12{,}0\\) m långt. Taknocken ligger \\(2{,}4\\) m över väggarnas överkant. På båda långsidorna sticker taket ut \\(0{,}5\\) m (mätt längs taket) utanför väggen. Taket sticker inte ut vid gavlarna.</p><p>Taket ska täckas med plåt som kostar \\(245\\) kr/m². Man räknar med \\(10\\ \\%\\) spill.</p><p>a) Beräkna den totala kostnaden för plåten.</p><p>b) En tumregel säger att takets area är ungefär \\(1{,}2\\) gånger förrådets grundarea. Hur väl stämmer tumregeln för det här taket? Motivera.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 250" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polyline points="50.4,155.8 150,96.0 249.6,155.8" stroke-width="2.5"/><line x1="60" y1="150" x2="60" y2="225"/><line x1="240" y1="150" x2="240" y2="225"/><line x1="60" y1="150" x2="240" y2="150" stroke-dasharray="5 4" stroke-width="1.5"/><line x1="150" y1="96" x2="150" y2="150" stroke-dasharray="3 3" stroke-width="1.5"/><text x="156" y="136" fill="currentColor" stroke="none" font-size="14">2,4 m</text><line x1="60" y1="238" x2="240" y2="238" stroke-width="1"/><line x1="60" y1="232" x2="60" y2="244" stroke-width="1"/><line x1="240" y1="232" x2="240" y2="244" stroke-width="1"/><text x="128" y="232" fill="currentColor" stroke="none" font-size="14">8,0 m</text><text x="6" y="182" fill="currentColor" stroke="none" font-size="14">takfot</text><text x="6" y="198" fill="currentColor" stroke="none" font-size="14">0,5 m</text></svg>`,
    svar: {"facit": "a) Ca \\(33\\,400\\) kr (takarea \\(\\approx 124\\ \\text{m}^2\\)). b) Tumregeln ger \\(115\\ \\text{m}^2\\). Den stämmer bra utan takfot (\\(\\approx 112\\ \\text{m}^2\\), faktor \\(\\approx 1{,}17\\)) men underskattar när takfoten räknas med (faktor \\(\\approx 1{,}29\\))."},
    ledtradar: ["Halva bredden (4,0 m), höjden (2,4 m) och taksidan bildar en rätvinklig triangel.", "Varje taksida är en rektangel. Glöm inte takfoten på 0,5 m och de 10 % spill.", "Jämför takarean både med och utan takfot med \\(1{,}2 \\cdot\\) grundarean."],
    losning: "<p><strong>a)</strong></p><ol><li>Taksidans längd från vägg till nock (Pythagoras): \\(\\sqrt{4{,}0^2 + 2{,}4^2} = \\sqrt{21{,}76} \\approx 4{,}665\\) m.</li><li>Med takfot: \\(4{,}665 + 0{,}5 = 5{,}165\\) m.</li><li>Takets area (två rektanglar): \\(2 \\cdot 5{,}165 \\cdot 12{,}0 \\approx 124{,}0\\ \\text{m}^2\\).</li><li>Med spill: \\(124{,}0 \\cdot 1{,}10 \\approx 136{,}3\\ \\text{m}^2\\).</li><li>Kostnad: \\(136{,}3 \\cdot 245 \\approx 33\\,400\\) kr.</li></ol><p><strong>b)</strong></p><ol><li>Grundarea: \\(8{,}0 \\cdot 12{,}0 = 96\\ \\text{m}^2\\). Tumregeln ger \\(1{,}2 \\cdot 96 = 115{,}2\\ \\text{m}^2\\).</li><li>Takarea utan takfot: \\(2 \\cdot 4{,}665 \\cdot 12 \\approx 112\\ \\text{m}^2\\), dvs. faktorn \\(112/96 \\approx 1{,}17\\). Här stämmer tumregeln bra (ca \\(3\\ \\%\\) för mycket).</li><li>Med takfot blir arean \\(124\\ \\text{m}^2\\), dvs. faktorn \\(\\approx 1{,}29\\). Då underskattar tumregeln takarean med ca \\(9\\ \\text{m}^2\\) (ca \\(7\\ \\%\\)).</li></ol><p>Slutsats: tumregeln fungerar för själva taket över huset vid den här taklutningen, men den tar inte hänsyn till takfoten. Faktorn beror dessutom på taklutningen – ett brantare tak ger en större faktor.</p>",
    bedomning: ["+E<sub>P</sub> för korrekt beräknad längd på taksidan med Pythagoras sats, \\(\\approx 4{,}66\\) m", "+C<sub>M</sub> för korrekt beräknad kostnad med takfot och spill, ca \\(33\\,400\\) kr", "+A<sub>M</sub> för en välgrundad värdering av tumregeln där takarean jämförs med \\(1{,}2 \\cdot 96 = 115{,}2\\ \\text{m}^2\\) och det framgår att takfoten (eller taklutningen) påverkar hur väl regeln stämmer"]
  },

  {
    id: "gtv-012",
    kurser: ["1a"],
    del: "C",
    omrade: "Geometri och trigonometri",
    moment: "Mätosäkerhet",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>Elin ska lägga nytt golv i ett rektangulärt rum. Hon mäter rummet till \\(4{,}2\\) m gånger \\(3{,}6\\) m. Båda måtten är avrundade till närmaste decimeter.</p><p>Elin räknar ut arean till \\(15{,}12\\ \\text{m}^2\\) och köper \\(15{,}5\\ \\text{m}^2\\) golv. Hon tycker att det ger god marginal.</p><p>a) Mellan vilka värden ligger rummets verkliga area?</p><p>b) Kan Elin vara säker på att golvet räcker? Bortse från spill. Motivera ditt svar.</p>",
    svar: {"facit": "a) \\(14{,}73\\ \\text{m}^2 \\le A \\lt 15{,}51\\ \\text{m}^2\\) (ungefär). b) Nej, den verkliga arean kan vara större än \\(15{,}5\\ \\text{m}^2\\)."},
    ledtradar: ["Ett mått som avrundats till \\(4{,}2\\) m kan vara mellan \\(4{,}15\\) m och \\(4{,}25\\) m.", "Minsta area får du med de minsta möjliga måtten, största area med de största.", "Jämför den största möjliga arean med \\(15{,}5\\ \\text{m}^2\\)."],
    losning: "<p><strong>a)</strong></p><ol><li>Längden ligger mellan \\(4{,}15\\) m och \\(4{,}25\\) m, bredden mellan \\(3{,}55\\) m och \\(3{,}65\\) m.</li><li>Minsta area: \\(4{,}15 \\cdot 3{,}55 \\approx 14{,}73\\ \\text{m}^2\\).</li><li>Största area: \\(4{,}25 \\cdot 3{,}65 \\approx 15{,}51\\ \\text{m}^2\\).</li></ol><p>Arean ligger alltså mellan ca \\(14{,}73\\ \\text{m}^2\\) och \\(15{,}51\\ \\text{m}^2\\) (den övre gränsen nås inte exakt, eftersom \\(4{,}25\\) avrundas till \\(4{,}3\\)).</p><p><strong>b)</strong> Nej. Även om marginalen \\(15{,}5 - 15{,}12 = 0{,}38\\ \\text{m}^2\\) verkar stor kan rummet vara t.ex. \\(4{,}249 \\cdot 3{,}649 \\approx 15{,}50\\ \\text{m}^2\\) eller nästan \\(15{,}51\\ \\text{m}^2\\), vilket är mer än \\(15{,}5\\ \\text{m}^2\\). Elin kan därför inte vara helt säker, även om det är mycket troligt att golvet räcker.</p>",
    bedomning: ["+E<sub>P</sub> för korrekta gränser för längd och bredd, \\(4{,}15\\)–\\(4{,}25\\) m och \\(3{,}55\\)–\\(3{,}65\\) m", "+C<sub>P</sub> för korrekt intervall för arean, ca \\(14{,}73\\ \\text{m}^2\\) till \\(15{,}51\\ \\text{m}^2\\)", "+A<sub>R</sub> för en välgrundad slutsats som jämför största möjliga area med \\(15{,}5\\ \\text{m}^2\\) och visar att golvet inte säkert räcker"]
  },

  {
    id: "gtv-013",
    kurser: ["1c"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Tangens",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Figuren visar en rätvinklig triangel. Sidlängderna anges i cm.</p><p>Bestäm \\(\\tan v\\).</p>",
    figur: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="16"><polygon points="40,190 240,190 240,40"/><polyline points="226,190 226,176 240,176" stroke-width="1.5"/><path d="M 78.0 190.0 A 38 38 0 0 0 70.4 167.2" stroke-width="1.5"/><text x="86" y="182" fill="currentColor" stroke="none" font-style="italic">v</text><text x="132" y="212" fill="currentColor" stroke="none">4</text><text x="250" y="120" fill="currentColor" stroke="none">3</text><text x="122" y="106" fill="currentColor" stroke="none">5</text></svg>`,
    svar: {"varde": 0.75, "tolerans": 0.001},
    ledtradar: ["\\(\\tan v = \\dfrac{\\text{motstående katet}}{\\text{närliggande katet}}\\)", "Hypotenusan behövs inte för tangens."],
    losning: "<p>Den katet som ligger mitt emot \\(v\\) är 3 cm och den katet som ligger intill \\(v\\) är 4 cm.</p><p>\\[\\tan v = \\frac{3}{4} = 0{,}75\\]</p><p>Vanliga fel: \\(\\tfrac{3}{5}\\) (det är \\(\\sin v\\)) eller \\(\\tfrac{4}{3}\\).</p>"
  },

  {
    id: "gtv-014",
    kurser: ["1c"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Sinus, cosinus och tangens",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>I den rätvinkliga triangeln i figuren betecknas sidorna \\(p\\), \\(q\\) och \\(r\\).</p><p>Vilket uttryck är lika med \\(\\cos v\\)?</p>",
    figur: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="16"><polygon points="40,190 240,190 240,40"/><polyline points="226,190 226,176 240,176" stroke-width="1.5"/><path d="M 78.0 190.0 A 38 38 0 0 0 70.4 167.2" stroke-width="1.5"/><text x="86" y="182" fill="currentColor" stroke="none" font-style="italic">v</text><text x="132" y="212" fill="currentColor" stroke="none" font-style="italic">q</text><text x="250" y="120" fill="currentColor" stroke="none" font-style="italic">p</text><text x="122" y="106" fill="currentColor" stroke="none" font-style="italic">r</text></svg>`,
    svar: {"alternativ": ["\\(\\dfrac{p}{r}\\)", "\\(\\dfrac{q}{r}\\)", "\\(\\dfrac{p}{q}\\)", "\\(\\dfrac{q}{p}\\)"], "ratt": 1},
    ledtradar: ["Vilken sida är hypotenusa? Vilken katet ligger intill vinkeln \\(v\\)?", "\\(\\cos v = \\dfrac{\\text{närliggande katet}}{\\text{hypotenusa}}\\)"],
    losning: "<p>Hypotenusan (mitt emot den räta vinkeln) är \\(r\\). Den katet som ligger intill \\(v\\) är \\(q\\) och den motstående kateten är \\(p\\).</p><p>\\[\\cos v = \\frac{\\text{närliggande katet}}{\\text{hypotenusa}} = \\frac{q}{r}\\]</p><p>(\\(\\tfrac{p}{r} = \\sin v\\) och \\(\\tfrac{p}{q} = \\tan v\\).)</p>"
  },

  {
    id: "gtv-015",
    kurser: ["1c"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Sinus",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>I den rätvinkliga triangeln i figuren är hypotenusan \\(15\\) cm och \\(\\sin v = 0{,}6\\).</p><p>Bestäm längden \\(x\\).</p>",
    figur: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="16"><polygon points="40,190 240,190 240,40"/><polyline points="226,190 226,176 240,176" stroke-width="1.5"/><path d="M 78.0 190.0 A 38 38 0 0 0 70.4 167.2" stroke-width="1.5"/><text x="86" y="182" fill="currentColor" stroke="none" font-style="italic">v</text><text x="104" y="106" fill="currentColor" stroke="none">15 cm</text><text x="250" y="120" fill="currentColor" stroke="none" font-style="italic">x</text></svg>`,
    svar: {"varde": 9, "tolerans": 0.001, "enhet": "cm"},
    ledtradar: ["\\(\\sin v = \\dfrac{\\text{motstående katet}}{\\text{hypotenusa}} = \\dfrac{x}{15}\\)"],
    losning: "<p>\\[\\sin v = \\frac{x}{15} \\quad\\Rightarrow\\quad x = 15 \\cdot \\sin v = 15 \\cdot 0{,}6 = 9\\]</p><p>Sidan \\(x\\) är 9 cm.</p>"
  },

  {
    id: "gtv-016",
    kurser: ["1c"],
    del: "C",
    omrade: "Geometri och trigonometri",
    moment: "Vinklar i koordinatsystem",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Linjen \\(y = 0{,}75x\\) bildar vinkeln \\(v\\) med den positiva \\(x\\)-axeln.</p><p>Bestäm \\(v\\). Svara med en decimal.</p>",
    figur: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="16"><line x1="20" y1="180" x2="279" y2="180" stroke-width="1.5"/><polygon points="290.0,180.0 279.0,185.0 279.0,175.0" fill="currentColor" stroke="none"/><line x1="40" y1="205" x2="40" y2="26" stroke-width="1.5"/><polygon points="40.0,15.0 45.0,26.0 35.0,26.0" fill="currentColor" stroke="none"/><text x="278" y="200" fill="currentColor" stroke="none" font-style="italic">x</text><text x="48" y="24" fill="currentColor" stroke="none" font-style="italic">y</text><line x1="20" y1="195" x2="280" y2="0" stroke-width="2.5"/><path d="M 90.0 180.0 A 50 50 0 0 0 80.0 150.0" stroke-width="1.5"/><text x="96" y="168" fill="currentColor" stroke="none" font-style="italic">v</text><text x="200" y="64" fill="currentColor" stroke="none" font-style="italic">y = 0,75x</text><text x="26" y="198" fill="currentColor" stroke="none">O</text></svg>`,
    svar: {"varde": 36.9, "tolerans": 0.1, "enhet": "°"},
    ledtradar: ["Välj en punkt på linjen, t.ex. \\(x = 4\\). Vilket \\(y\\)-värde får du?", "Lutningen \\(k = \\dfrac{\\Delta y}{\\Delta x}\\) är lika med \\(\\tan v\\)."],
    losning: "<ol><li>Punkten \\((4,\\ 3)\\) ligger på linjen. Den bildar tillsammans med origo och \\((4,\\ 0)\\) en rätvinklig triangel med kateterna 4 och 3.</li><li>\\(\\tan v = \\dfrac{3}{4} = 0{,}75\\) (lutningen).</li><li>\\(v = \\tan^{-1}(0{,}75) \\approx 36{,}9^\\circ\\).</li></ol>"
  },

  {
    id: "gtv-017",
    kurser: ["1c"],
    del: "A",
    omrade: "Geometri och trigonometri",
    moment: "Arcusfunktioner",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vad betyder det att \\(\\sin^{-1}(0{,}5) = 30^\\circ\\)?</p>",
    svar: {"alternativ": ["Att \\(\\sin 30^\\circ = 0{,}5\\)", "Att \\(\\dfrac{1}{\\sin 0{,}5} = 30\\)", "Att \\(\\sin 0{,}5 = 30^\\circ\\)", "Att \\(\\sin 30^\\circ = \\dfrac{1}{0{,}5} = 2\\)"], "ratt": 0},
    ledtradar: ["\\(\\sin^{-1}\\) (arcsin) är den inversa funktionen till sinus. Den \"går baklänges\": från ett sinusvärde till en vinkel.", "Exponenten \\(-1\\) betyder här <em>invers funktion</em>, inte \"ett delat med\"."],
    losning: "<p>\\(\\sin^{-1}(0{,}5)\\) är den (spetsiga) vinkel vars sinusvärde är \\(0{,}5\\). Att \\(\\sin^{-1}(0{,}5) = 30^\\circ\\) betyder alltså att \\(\\sin 30^\\circ = 0{,}5\\).</p><p>Beteckningen \\(\\sin^{-1}\\) betyder invers funktion, inte \\(\\dfrac{1}{\\sin}\\).</p>"
  },

  {
    id: "gtv-018",
    kurser: ["1c"],
    del: "B",
    omrade: "Geometri och trigonometri",
    moment: "Cosinus",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>I en rätvinklig triangel är hypotenusan \\(20\\) cm. För en av de spetsiga vinklarna \\(v\\) gäller att \\(\\cos v = 0{,}8\\).</p><p>Beräkna triangelns area.</p>",
    svar: {"varde": 96, "tolerans": 0.001, "enhet": "cm²"},
    ledtradar: ["Använd \\(\\cos v\\) för att bestämma den katet som ligger intill \\(v\\).", "Den andra kateten får du med Pythagoras sats."],
    losning: "<ol><li>Närliggande katet: \\(20 \\cdot \\cos v = 20 \\cdot 0{,}8 = 16\\) cm.</li><li>Andra kateten: \\(\\sqrt{20^2 - 16^2} = \\sqrt{400 - 256} = \\sqrt{144} = 12\\) cm.</li><li>Area: \\(\\dfrac{16 \\cdot 12}{2} = 96\\ \\text{cm}^2\\).</li></ol>"
  },

  {
    id: "gtv-019",
    kurser: ["1c"],
    del: "B",
    omrade: "Geometri och trigonometri",
    moment: "Trigonometri i koordinatsystem",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Punkten \\(P = (8,\\ 6)\\) är markerad i koordinatsystemet. Sträckan \\(OP\\) bildar vinkeln \\(v\\) med den positiva \\(x\\)-axeln, där \\(O\\) är origo.</p><p>a) Bestäm \\(\\sin v\\) och \\(\\cos v\\) exakt.</p><p>b) Punkten \\(Q\\) ligger på samma stråle från origo som \\(P\\), och avståndet \\(OQ = 25\\). Bestäm koordinaterna för \\(Q\\).</p>",
    figur: `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="16"><line x1="20" y1="180" x2="279" y2="180" stroke-width="1.5"/><polygon points="290.0,180.0 279.0,185.0 279.0,175.0" fill="currentColor" stroke="none"/><line x1="40" y1="200" x2="40" y2="23" stroke-width="1.5"/><polygon points="40.0,12.0 45.0,23.0 35.0,23.0" fill="currentColor" stroke="none"/><text x="280" y="172" fill="currentColor" stroke="none" font-style="italic">x</text><text x="48" y="22" fill="currentColor" stroke="none" font-style="italic">y</text><line x1="80" y1="176" x2="80" y2="184" stroke-width="1.5"/><text x="76" y="200" fill="currentColor" stroke="none" font-size="14">2</text><line x1="120" y1="176" x2="120" y2="184" stroke-width="1.5"/><text x="116" y="200" fill="currentColor" stroke="none" font-size="14">4</text><line x1="160" y1="176" x2="160" y2="184" stroke-width="1.5"/><text x="156" y="200" fill="currentColor" stroke="none" font-size="14">6</text><line x1="200" y1="176" x2="200" y2="184" stroke-width="1.5"/><text x="196" y="200" fill="currentColor" stroke="none" font-size="14">8</text><line x1="240" y1="176" x2="240" y2="184" stroke-width="1.5"/><text x="236" y="200" fill="currentColor" stroke="none" font-size="14">10</text><line x1="36" y1="140" x2="44" y2="140" stroke-width="1.5"/><text x="18" y="145" fill="currentColor" stroke="none" font-size="14">2</text><line x1="36" y1="100" x2="44" y2="100" stroke-width="1.5"/><text x="18" y="105" fill="currentColor" stroke="none" font-size="14">4</text><line x1="36" y1="60" x2="44" y2="60" stroke-width="1.5"/><text x="18" y="65" fill="currentColor" stroke="none" font-size="14">6</text><line x1="40" y1="180" x2="200" y2="60" stroke-width="2.5"/><circle cx="200" cy="60" r="4" fill="currentColor" stroke="none"/><line x1="200" y1="60" x2="200" y2="180" stroke-dasharray="4 4" stroke-width="1.5"/><text x="208" y="54" fill="currentColor" stroke="none">P = (8, 6)</text><path d="M 84.0 180.0 A 44 44 0 0 0 75.2 153.6" stroke-width="1.5"/><text x="92" y="168" fill="currentColor" stroke="none" font-style="italic">v</text></svg>`,
    svar: {"facit": "a) \\(\\sin v = 0{,}6\\), \\(\\cos v = 0{,}8\\) b) \\(Q = (20,\\ 15)\\)"},
    ledtradar: ["Rita en rätvinklig triangel med hörnen \\(O\\), \\(P\\) och \\((8,\\ 0)\\). Hur lång är \\(OP\\)?", "För en punkt på avståndet \\(r\\) från origo gäller \\(x = r\\cos v\\) och \\(y = r\\sin v\\)."],
    losning: "<p><strong>a)</strong> Triangeln med hörnen \\(O\\), \\((8,\\ 0)\\) och \\(P\\) är rätvinklig med kateterna 8 och 6.</p><p>\\(OP = \\sqrt{8^2 + 6^2} = \\sqrt{100} = 10\\)</p><p>\\[\\sin v = \\frac{6}{10} = 0{,}6 \\qquad \\cos v = \\frac{8}{10} = 0{,}8\\]</p><p><strong>b)</strong> \\(Q\\) har samma vinkel \\(v\\) men avståndet 25 från origo:</p><p>\\[x_Q = 25\\cos v = 25 \\cdot 0{,}8 = 20, \\qquad y_Q = 25 \\sin v = 25 \\cdot 0{,}6 = 15\\]</p><p>\\(Q = (20,\\ 15)\\). (Alternativt: \\(OQ = 2{,}5 \\cdot OP\\), så \\(Q = (2{,}5 \\cdot 8,\\ 2{,}5 \\cdot 6)\\).)</p>",
    bedomning: ["+E<sub>P</sub> för korrekt \\(\\sin v = 0{,}6\\) och \\(\\cos v = 0{,}8\\) (med \\(OP = 10\\))", "+C<sub>PL</sub> för korrekt bestämda koordinater \\(Q = (20,\\ 15)\\) med godtagbar motivering"]
  },

  {
    id: "gtv-020",
    kurser: ["1c"],
    del: "B",
    omrade: "Geometri och trigonometri",
    moment: "Trigonometriska samband",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Vinkeln \\(v\\) är en spetsig vinkel i en rätvinklig triangel.</p><p>a) Det gäller att \\(\\sin v = \\dfrac{5}{13}\\). Bestäm \\(\\tan v\\) exakt.</p><p>b) Visa att \\((\\sin v)^2 + (\\cos v)^2 = 1\\) gäller för alla spetsiga vinklar \\(v\\) i en rätvinklig triangel.</p>",
    svar: {"facit": "a) \\(\\tan v = \\dfrac{5}{12}\\) b) Med kateterna \\(a\\), \\(b\\) och hypotenusan \\(c\\): \\(\\dfrac{a^2}{c^2} + \\dfrac{b^2}{c^2} = \\dfrac{a^2+b^2}{c^2} = \\dfrac{c^2}{c^2} = 1\\)."},
    ledtradar: ["Rita en triangel där motstående katet är 5 och hypotenusan 13. Använd Pythagoras sats för den tredje sidan.", "I b): kalla sidorna \\(a\\) (mitt emot \\(v\\)), \\(b\\) och \\(c\\) (hypotenusa) och uttryck \\(\\sin v\\) och \\(\\cos v\\) med dem.", "Vilket samband mellan \\(a\\), \\(b\\) och \\(c\\) ger Pythagoras sats?"],
    losning: "<p><strong>a)</strong> Välj en triangel med motstående katet 5 och hypotenusa 13 (alla trianglar med samma \\(v\\) är likformiga). Närliggande katet: \\(\\sqrt{13^2 - 5^2} = \\sqrt{169 - 25} = \\sqrt{144} = 12\\).</p><p>\\[\\tan v = \\frac{5}{12}\\]</p><p><strong>b)</strong> Låt \\(a\\) vara kateten mitt emot \\(v\\), \\(b\\) kateten intill \\(v\\) och \\(c\\) hypotenusan. Då är \\(\\sin v = \\dfrac{a}{c}\\) och \\(\\cos v = \\dfrac{b}{c}\\).</p><p>\\[(\\sin v)^2 + (\\cos v)^2 = \\frac{a^2}{c^2} + \\frac{b^2}{c^2} = \\frac{a^2 + b^2}{c^2}\\]</p><p>Enligt Pythagoras sats är \\(a^2 + b^2 = c^2\\), så uttrycket blir \\(\\dfrac{c^2}{c^2} = 1\\). Eftersom vi inte använt några särskilda värden gäller sambandet för alla spetsiga vinklar \\(v\\). \\(\\blacksquare\\)</p>",
    bedomning: ["+C<sub>P</sub> för korrekt bestämt \\(\\tan v = \\dfrac{5}{12}\\)", "+A<sub>R</sub> för ett korrekt generellt bevis som använder definitionerna av sinus och cosinus samt Pythagoras sats", "+A<sub>K</sub> för en välstrukturerad redovisning med tydligt definierade beteckningar och en klar slutsats"]
  },

  {
    id: "gtv-021",
    kurser: ["1c"],
    del: "C",
    omrade: "Geometri och trigonometri",
    moment: "Sinus och tangens i tillämpningar",
    niva: "C",
    poang: "2/1/0",
    typ: "redovisning",
    fraga: "<p>En ramp för rullstolar är \\(6{,}0\\) m lång (mätt längs rampen) och lutar \\(4{,}0^\\circ\\) mot marken.</p><p>a) Hur stor höjdskillnad \\(h\\) övervinner rampen?</p><p>b) Enligt en rekommendation får en ramp luta högst \\(1:12\\). Det betyder att höjdskillnaden högst får vara \\(\\tfrac{1}{12}\\) av den horisontella längden. Uppfyller rampen rekommendationen? Motivera.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 320 160" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="16"><polygon points="20,130 290,130 290,60"/><polyline points="278,130 278,118 290,118" stroke-width="1.5"/><path d="M 80.0 130.0 A 60 60 0 0 0 78.1 114.9" stroke-width="1.5"/><text x="88" y="124" fill="currentColor" stroke="none">4,0°</text><text x="130" y="82" fill="currentColor" stroke="none">6,0 m</text><text x="298" y="100" fill="currentColor" stroke="none" font-style="italic">h</text></svg>`,
    svar: {"facit": "a) \\(h \\approx 0{,}42\\) m b) Ja, \\(\\tan 4{,}0^\\circ \\approx 0{,}070 \\lt \\tfrac{1}{12} \\approx 0{,}083\\)."},
    ledtradar: ["Rampens längd är hypotenusan och \\(h\\) är motstående katet till vinkeln \\(4{,}0^\\circ\\).", "I b) kan du beräkna den horisontella längden med cosinus och jämföra \\(h\\) med \\(\\tfrac{1}{12}\\) av den. Eller jämför \\(\\tan 4{,}0^\\circ\\) med \\(\\tfrac{1}{12}\\)."],
    losning: "<p><strong>a)</strong> \\(\\sin 4{,}0^\\circ = \\dfrac{h}{6{,}0}\\) ger \\(h = 6{,}0 \\cdot \\sin 4{,}0^\\circ \\approx 0{,}419\\) m. Höjdskillnaden är ca \\(0{,}42\\) m.</p><p><strong>b)</strong> Horisontell längd: \\(6{,}0 \\cdot \\cos 4{,}0^\\circ \\approx 5{,}985\\) m.</p><p>Lutningen \\(\\dfrac{h}{\\text{horisontell längd}} = \\dfrac{0{,}419}{5{,}985} \\approx 0{,}070\\) (vilket är \\(\\tan 4{,}0^\\circ\\)).</p><p>Högsta tillåtna lutning är \\(\\tfrac{1}{12} \\approx 0{,}083\\). Eftersom \\(0{,}070 \\lt 0{,}083\\) uppfyller rampen rekommendationen.</p><p>(Alternativt: största tillåtna vinkel är \\(\\tan^{-1}\\!\\left(\\tfrac{1}{12}\\right) \\approx 4{,}8^\\circ\\), och \\(4{,}0^\\circ \\lt 4{,}8^\\circ\\).)</p>",
    bedomning: ["+E<sub>P</sub> för korrekt beräknad höjdskillnad, \\(h \\approx 0{,}42\\) m", "+E<sub>M</sub> för en godtagbar metod i b), t.ex. beräknad horisontell längd \\(\\approx 5{,}99\\) m eller beräknat \\(\\tan 4{,}0^\\circ\\)", "+C<sub>R</sub> för korrekt jämförelse med \\(\\tfrac{1}{12}\\) och en korrekt motiverad slutsats"]
  },

  {
    id: "gtv-022",
    kurser: ["1c"],
    del: "C",
    omrade: "Geometri och trigonometri",
    moment: "Cosinus",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Enligt en säkerhetsregel ska en stege luta \\(75^\\circ\\) mot marken. En stege är \\(4{,}5\\) m lång.</p><p>Hur långt från väggen ska stegens fot placeras? Svara i meter med två decimaler.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="16"><line x1="20" y1="195" x2="280" y2="195"/><line x1="230" y1="20" x2="230" y2="195" stroke-width="3"/><line x1="188" y1="195" x2="230" y2="38" stroke-width="2.5"/><polyline points="218,195 218,183 230,183" stroke-width="1.5"/><path d="M 195.8 166.0 A 30 30 0 0 0 158.0 195.0" stroke-width="1.5"/><text x="148" y="175" fill="currentColor" stroke="none">75°</text><text x="128" y="112" fill="currentColor" stroke="none">4,5 m</text><text x="200" y="214" fill="currentColor" stroke="none" font-style="italic">x</text></svg>`,
    svar: {"varde": 1.16, "tolerans": 0.01, "enhet": "m"},
    ledtradar: ["Stegen är hypotenusa. Avståndet \\(x\\) är den katet som ligger intill vinkeln \\(75^\\circ\\).", "\\(\\cos 75^\\circ = \\dfrac{x}{4{,}5}\\)"],
    losning: "<p>\\[\\cos 75^\\circ = \\frac{x}{4{,}5} \\quad\\Rightarrow\\quad x = 4{,}5 \\cdot \\cos 75^\\circ \\approx 4{,}5 \\cdot 0{,}2588 \\approx 1{,}16\\ \\text{m}\\]</p><p>Foten ska stå ca \\(1{,}16\\) m från väggen.</p><p>Vanligt fel: att använda \\(\\sin 75^\\circ\\), vilket ger höjden \\(\\approx 4{,}35\\) m.</p>"
  },

  {
    id: "gtv-023",
    kurser: ["1c"],
    del: "C",
    omrade: "Geometri och trigonometri",
    moment: "Cosinus i tillämpningar",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Ett hus har ett symmetriskt sadeltak med taklutningen \\(24^\\circ\\). Huset är \\(9{,}0\\) m brett. Varje sparre (takbjälke) går från nocken, förbi väggen och sticker ut \\(0{,}6\\) m (mätt längs sparren) utanför väggen.</p><p>Hur lång är en sparre? Svara i meter med två decimaler.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><polyline points="18.7,146.3 150,87.9 281.3,146.3" stroke-width="2.5"/><line x1="33" y1="140" x2="33" y2="185"/><line x1="267" y1="140" x2="267" y2="185"/><line x1="33" y1="140" x2="267" y2="140" stroke-dasharray="5 4" stroke-width="1.5"/><path d="M 73.0 140.0 A 40 40 0 0 0 69.5 123.7" stroke-width="1.5"/><text x="77" y="136" fill="currentColor" stroke="none">24°</text><line x1="33" y1="198" x2="267" y2="198" stroke-width="1"/><text x="130" y="192" fill="currentColor" stroke="none" font-size="14">9,0 m</text><text x="2" y="178" fill="currentColor" stroke="none" font-size="14">0,6 m</text></svg>`,
    svar: {"varde": 5.53, "tolerans": 0.01, "enhet": "m"},
    ledtradar: ["Halva husbredden, \\(4{,}5\\) m, är den närliggande kateten till vinkeln \\(24^\\circ\\). Sparren (till väggen) är hypotenusa.", "\\(\\cos 24^\\circ = \\dfrac{4{,}5}{s}\\). Lägg sedan till utsticket."],
    losning: "<ol><li>Från vägg till nock: \\(\\cos 24^\\circ = \\dfrac{4{,}5}{s}\\) ger \\(s = \\dfrac{4{,}5}{\\cos 24^\\circ} \\approx 4{,}926\\) m.</li><li>Med utsticket: \\(4{,}926 + 0{,}6 \\approx 5{,}53\\) m.</li></ol><p>Sparren är ca \\(5{,}53\\) m lång.</p><p>Vanliga fel: att använda hela bredden \\(9{,}0\\) m, eller att räkna \\(4{,}5 \\cdot \\cos 24^\\circ\\).</p>"
  },

  {
    id: "gtv-024",
    kurser: ["1c"],
    del: "C",
    omrade: "Geometri och trigonometri",
    moment: "Höjdbestämning med trigonometri",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Amir vill bestämma höjden \\(h\\) av ett torn. Från punkten \\(A\\) ser han tornets topp under vinkeln \\(32^\\circ\\) mot marken. Han går sedan \\(40\\) m rakt mot tornet till punkten \\(B\\), där han ser toppen under vinkeln \\(51^\\circ\\).</p><p>Beräkna tornets höjd. Bortse från Amirs ögonhöjd. Marken är horisontell.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="16"><line x1="10" y1="190" x2="310" y2="190"/><line x1="280" y1="190" x2="280" y2="58.4461" stroke-width="3"/><line x1="69.4698" y1="190" x2="280" y2="58.4461" stroke-dasharray="5 4" stroke-width="1.5"/><line x1="173.47" y1="190" x2="280" y2="58.4461" stroke-dasharray="5 4" stroke-width="1.5"/><polyline points="270,190 270,180 280,180" stroke-width="1.5"/><path d="M 103.5 190.0 A 34 34 0 0 0 98.3 172.0" stroke-width="1.5"/><path d="M 199.5 190.0 A 26 26 0 0 0 189.8 169.8" stroke-width="1.5"/><text x="105.47" y="184" fill="currentColor" stroke="none" font-size="14">32°</text><text x="199.47" y="180" fill="currentColor" stroke="none" font-size="14">51°</text><text x="63.4698" y="210" fill="currentColor" stroke="none">A</text><text x="167.47" y="210" fill="currentColor" stroke="none">B</text><text x="107.47" y="210" fill="currentColor" stroke="none" font-size="14">40 m</text><text x="288" y="124.223" fill="currentColor" stroke="none" font-style="italic">h</text></svg>`,
    svar: {"facit": "\\(h \\approx 51\\) m (\\(50{,}6\\) m)"},
    ledtradar: ["Kalla avståndet från \\(B\\) till tornets fot för \\(x\\). Då är avståndet från \\(A\\) lika med \\(x + 40\\).", "Ställ upp två uttryck för \\(h\\) med tangens: ett från \\(A\\) och ett från \\(B\\).", "Sätt uttrycken lika med varandra och lös ut \\(x\\)."],
    losning: "<ol><li>Låt \\(x\\) vara avståndet från \\(B\\) till tornets fot.</li><li>Från \\(B\\): \\(\\tan 51^\\circ = \\dfrac{h}{x}\\), dvs. \\(h = x \\tan 51^\\circ\\).</li><li>Från \\(A\\): \\(\\tan 32^\\circ = \\dfrac{h}{x + 40}\\), dvs. \\(h = (x + 40)\\tan 32^\\circ\\).</li><li>Likställ: \\(x \\tan 51^\\circ = x \\tan 32^\\circ + 40\\tan 32^\\circ\\), så \\(x(\\tan 51^\\circ - \\tan 32^\\circ) = 40 \\tan 32^\\circ\\).</li><li>\\(x = \\dfrac{40 \\tan 32^\\circ}{\\tan 51^\\circ - \\tan 32^\\circ} \\approx \\dfrac{40 \\cdot 0{,}6249}{1{,}2349 - 0{,}6249} \\approx 40{,}97\\) m.</li><li>\\(h = x \\tan 51^\\circ \\approx 40{,}97 \\cdot 1{,}2349 \\approx 50{,}6\\) m.</li></ol><p>Kontroll: \\((40{,}97 + 40) \\cdot \\tan 32^\\circ \\approx 80{,}97 \\cdot 0{,}6249 \\approx 50{,}6\\) m. Tornet är ca 51 m högt.</p>",
    bedomning: ["+C<sub>PL</sub> för att ställa upp minst ett korrekt samband med tangens där det okända avståndet ingår, t.ex. \\(h = x \\tan 51^\\circ\\)", "+A<sub>PL</sub> för att kombinera de två sambanden och lösa ut \\(x\\) (eller \\(h\\)) korrekt", "+A<sub>P</sub> för korrekt höjd, \\(h \\approx 51\\) m, med en fullständig redovisning"]
  },

  {
    id: "gtv-025",
    kurser: ["1c"],
    del: "A",
    omrade: "Vektorer",
    moment: "Addition av vektorer",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vektorerna \\(\\vec{u} = (3,\\ -2)\\) och \\(\\vec{v} = (-1,\\ 5)\\) är givna.</p><p>Vilken av följande är \\(\\vec{u} + \\vec{v}\\)?</p>",
    svar: {"alternativ": ["\\((2,\\ 3)\\)", "\\((4,\\ -7)\\)", "\\((2,\\ -7)\\)", "\\((-3,\\ -10)\\)"], "ratt": 0},
    ledtradar: ["Addera \\(x\\)-koordinaterna för sig och \\(y\\)-koordinaterna för sig."],
    losning: "<p>\\[\\vec{u} + \\vec{v} = (3 + (-1),\\ -2 + 5) = (2,\\ 3)\\]</p><p>\\((4,\\ -7)\\) är \\(\\vec{u} - \\vec{v}\\) och \\((-3,\\ -10)\\) fås om man felaktigt multiplicerar koordinaterna.</p>"
  },

  {
    id: "gtv-026",
    kurser: ["1c"],
    del: "A",
    omrade: "Vektorer",
    moment: "Absolutbelopp",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Bestäm \\(|\\vec{u}|\\) då \\(\\vec{u} = (6,\\ -8)\\).</p>",
    svar: {"varde": 10, "tolerans": 0},
    ledtradar: ["Absolutbeloppet är vektorns längd: \\(|\\vec{u}| = \\sqrt{u_x^2 + u_y^2}\\).", "Tänk på att \\((-8)^2 = 64\\)."],
    losning: "<p>\\[|\\vec{u}| = \\sqrt{6^2 + (-8)^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\]</p>"
  },

  {
    id: "gtv-027",
    kurser: ["1c"],
    del: "A",
    omrade: "Vektorer",
    moment: "Vektorer i koordinatsystem",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vektorn \\(\\vec{u}\\) är ritad i rutnätet. Varje ruta har sidan 1 längdenhet. Vilken koordinatform har \\(\\vec{u}\\)?</p>",
    figur: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="17"><line x1="30" y1="20" x2="30" y2="180" stroke-width="1" opacity="0.35"/><line x1="70" y1="20" x2="70" y2="180" stroke-width="1" opacity="0.35"/><line x1="110" y1="20" x2="110" y2="180" stroke-width="1" opacity="0.35"/><line x1="150" y1="20" x2="150" y2="180" stroke-width="1" opacity="0.35"/><line x1="190" y1="20" x2="190" y2="180" stroke-width="1" opacity="0.35"/><line x1="230" y1="20" x2="230" y2="180" stroke-width="1" opacity="0.35"/><line x1="270" y1="20" x2="270" y2="180" stroke-width="1" opacity="0.35"/><line x1="30" y1="20" x2="270" y2="20" stroke-width="1" opacity="0.35"/><line x1="30" y1="60" x2="270" y2="60" stroke-width="1" opacity="0.35"/><line x1="30" y1="100" x2="270" y2="100" stroke-width="1" opacity="0.35"/><line x1="30" y1="140" x2="270" y2="140" stroke-width="1" opacity="0.35"/><line x1="30" y1="180" x2="270" y2="180" stroke-width="1" opacity="0.35"/><line x1="70" y1="140" x2="220.161" y2="64.9193" stroke-width="3"/><polygon points="230.0,60.0 222.4,69.4 217.9,60.4" fill="currentColor" stroke="none"/><circle cx="70" cy="140" r="3.5" fill="currentColor" stroke="none"/><text x="146" y="90" fill="currentColor" stroke="none" font-style="italic" font-weight="bold">u</text></svg>`,
    svar: {"alternativ": ["\\((4,\\ 2)\\)", "\\((2,\\ 4)\\)", "\\((5,\\ 3)\\)", "\\((-4,\\ -2)\\)"], "ratt": 0},
    ledtradar: ["Utgå från vektorns startpunkt (svans). Hur många steg åt höger och hur många steg uppåt kommer du till spetsen?"],
    losning: "<p>Från startpunkten till spetsen går vektorn 4 steg åt höger (\\(x\\)-led) och 2 steg uppåt (\\(y\\)-led). Alltså är \\(\\vec{u} = (4,\\ 2)\\).</p><p>Koordinaterna beskriver förflyttningen – inte var vektorn är placerad. Ordningen är alltid \\((x,\\ y)\\).</p>"
  },

  {
    id: "gtv-028",
    kurser: ["1c"],
    del: "A",
    omrade: "Vektorer",
    moment: "Multiplikation med skalär",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Låt \\(\\vec{u} = (1,\\ 4)\\) och \\(\\vec{v} = (2,\\ -1)\\).</p><p>Vilken av följande är \\(2\\vec{u} - 3\\vec{v}\\)?</p>",
    svar: {"alternativ": ["\\((-4,\\ 11)\\)", "\\((-4,\\ 5)\\)", "\\((8,\\ 5)\\)", "\\((-1,\\ 5)\\)"], "ratt": 0},
    ledtradar: ["Beräkna först \\(2\\vec{u}\\) och \\(3\\vec{v}\\) var för sig.", "Var noga med tecknen: \\(8 - (-3) = 8 + 3\\)."],
    losning: "<ol><li>\\(2\\vec{u} = (2,\\ 8)\\) och \\(3\\vec{v} = (6,\\ -3)\\).</li><li>\\(2\\vec{u} - 3\\vec{v} = (2 - 6,\\ 8 - (-3)) = (-4,\\ 11)\\).</li></ol><p>\\((-4,\\ 5)\\) är ett vanligt teckenfel, \\((8,\\ 5)\\) är \\(2\\vec{u} + 3\\vec{v}\\) och \\((-1,\\ 5)\\) är \\(\\vec{u} - \\vec{v}\\).</p>"
  },

  {
    id: "gtv-029",
    kurser: ["1c"],
    del: "A",
    omrade: "Vektorer",
    moment: "Vektor mellan två punkter",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Punkterna \\(A = (2,\\ -1)\\) och \\(B = (-3,\\ 11)\\) är givna.</p><p>Bestäm \\(|\\overline{AB}|\\).</p>",
    svar: {"varde": 13, "tolerans": 0},
    ledtradar: ["Vektorn \\(\\overline{AB}\\) fås som \"slutpunkt minus startpunkt\": \\((x_B - x_A,\\ y_B - y_A)\\).", "Beräkna sedan längden med \\(\\sqrt{x^2 + y^2}\\)."],
    losning: "<ol><li>\\(\\overline{AB} = (-3 - 2,\\ 11 - (-1)) = (-5,\\ 12)\\).</li><li>\\(|\\overline{AB}| = \\sqrt{(-5)^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13\\).</li></ol>"
  },

  {
    id: "gtv-030",
    kurser: ["1c"],
    del: "B",
    omrade: "Vektorer",
    moment: "Parallella vektorer",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilken av vektorerna är parallell med \\(\\vec{a} = (2,\\ -3)\\)?</p>",
    svar: {"alternativ": ["\\((-4,\\ 6)\\)", "\\((3,\\ -2)\\)", "\\((4,\\ 6)\\)", "\\((-2,\\ -3)\\)"], "ratt": 0},
    ledtradar: ["Två vektorer är parallella om den ena är en skalär gånger den andra, \\(\\vec{b} = s \\cdot \\vec{a}\\).", "Finns det ett tal \\(s\\) så att båda koordinaterna multipliceras med samma tal?"],
    losning: "<p>\\((-4,\\ 6) = -2 \\cdot (2,\\ -3)\\), så den vektorn är parallell med \\(\\vec{a}\\) (men motriktad).</p><p>För \\((4,\\ 6)\\) skulle \\(x\\)-koordinaten kräva \\(s = 2\\) men \\(y\\)-koordinaten \\(s = -2\\) – inte samma tal. På samma sätt finns ingen gemensam skalär för \\((3,\\ -2)\\) eller \\((-2,\\ -3)\\).</p>"
  },

  {
    id: "gtv-031",
    kurser: ["1c"],
    del: "B",
    omrade: "Vektorer",
    moment: "Absolutbelopp",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Vektorn \\(\\vec{u} = (a,\\ 15)\\) har absolutbeloppet \\(|\\vec{u}| = 17\\). Bestäm \\(a\\) om \\(a \\gt 0\\).</p>",
    svar: {"varde": 8, "tolerans": 0},
    ledtradar: ["Ställ upp \\(\\sqrt{a^2 + 15^2} = 17\\) och kvadrera båda leden.", "\\(17^2 = 289\\) och \\(15^2 = 225\\)."],
    losning: "<ol><li>\\(\\sqrt{a^2 + 15^2} = 17 \\Rightarrow a^2 + 225 = 289\\).</li><li>\\(a^2 = 64\\), så \\(a = \\pm 8\\).</li><li>Eftersom \\(a \\gt 0\\) är \\(a = 8\\).</li></ol>"
  },

  {
    id: "gtv-032",
    kurser: ["1c"],
    del: "C",
    omrade: "Vektorer",
    moment: "Subtraktion av vektorer",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Vektorerna \\(\\vec{u}\\) och \\(\\vec{v}\\) är ritade i rutnätet. Varje ruta har sidan 1 längdenhet.</p><p>a) Bestäm vektorn \\(\\vec{w}\\) så att \\(\\vec{u} + \\vec{w} = \\vec{v}\\). Svara i koordinatform.</p><p>b) Beräkna \\(|\\vec{w}|\\) och beskriv vad \\(|\\vec{w}|\\) betyder i figuren.</p>",
    figur: `<svg viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="17"><line x1="30" y1="20" x2="30" y2="220" stroke-width="1" opacity="0.35"/><line x1="70" y1="20" x2="70" y2="220" stroke-width="1" opacity="0.35"/><line x1="110" y1="20" x2="110" y2="220" stroke-width="1" opacity="0.35"/><line x1="150" y1="20" x2="150" y2="220" stroke-width="1" opacity="0.35"/><line x1="190" y1="20" x2="190" y2="220" stroke-width="1" opacity="0.35"/><line x1="230" y1="20" x2="230" y2="220" stroke-width="1" opacity="0.35"/><line x1="270" y1="20" x2="270" y2="220" stroke-width="1" opacity="0.35"/><line x1="30" y1="20" x2="270" y2="20" stroke-width="1" opacity="0.35"/><line x1="30" y1="60" x2="270" y2="60" stroke-width="1" opacity="0.35"/><line x1="30" y1="100" x2="270" y2="100" stroke-width="1" opacity="0.35"/><line x1="30" y1="140" x2="270" y2="140" stroke-width="1" opacity="0.35"/><line x1="30" y1="180" x2="270" y2="180" stroke-width="1" opacity="0.35"/><line x1="30" y1="220" x2="270" y2="220" stroke-width="1" opacity="0.35"/><line x1="70" y1="180" x2="219.328" y2="142.668" stroke-width="3"/><polygon points="230.0,140.0 220.5,147.5 218.1,137.8" fill="currentColor" stroke="none"/><line x1="70" y1="180" x2="106.521" y2="70.4355" stroke-width="3"/><polygon points="110.0,60.0 111.3,72.0 101.8,68.9" fill="currentColor" stroke="none"/><circle cx="70" cy="180" r="3.5" fill="currentColor" stroke="none"/><text x="158" y="182" fill="currentColor" stroke="none" font-style="italic" font-weight="bold">u</text><text x="74" y="114" fill="currentColor" stroke="none" font-style="italic" font-weight="bold">v</text></svg>`,
    svar: {"facit": "a) \\(\\vec{w} = \\vec{v} - \\vec{u} = (-3,\\ 2)\\) b) \\(|\\vec{w}| = \\sqrt{13} \\approx 3{,}6\\) l.e., avståndet mellan pilspetsarna på \\(\\vec{u}\\) och \\(\\vec{v}\\)."},
    ledtradar: ["Läs av \\(\\vec{u}\\) och \\(\\vec{v}\\) i koordinatform genom att räkna rutor.", "\\(\\vec{u} + \\vec{w} = \\vec{v}\\) ger \\(\\vec{w} = \\vec{v} - \\vec{u}\\).", "Rita \\(\\vec{w}\\) med start i spetsen av \\(\\vec{u}\\). Var hamnar den?"],
    losning: "<p><strong>a)</strong> Ur figuren: \\(\\vec{u} = (4,\\ 1)\\) och \\(\\vec{v} = (1,\\ 3)\\).</p><p>\\(\\vec{w} = \\vec{v} - \\vec{u} = (1 - 4,\\ 3 - 1) = (-3,\\ 2)\\).</p><p><strong>b)</strong> \\(|\\vec{w}| = \\sqrt{(-3)^2 + 2^2} = \\sqrt{13} \\approx 3{,}6\\) l.e.</p><p>Om \\(\\vec{w}\\) ritas med start i spetsen av \\(\\vec{u}\\) slutar den i spetsen av \\(\\vec{v}\\). \\(|\\vec{w}|\\) är alltså avståndet mellan pilspetsarna på \\(\\vec{u}\\) och \\(\\vec{v}\\).</p>",
    bedomning: ["+E<sub>P</sub> för korrekt \\(\\vec{w} = (-3,\\ 2)\\)", "+C<sub>B</sub> för korrekt \\(|\\vec{w}| = \\sqrt{13} \\approx 3{,}6\\) l.e. och en korrekt geometrisk tolkning (avståndet mellan pilspetsarna)"]
  },

  {
    id: "gtv-033",
    kurser: ["1c"],
    del: "C",
    omrade: "Vektorer",
    moment: "Vektorer i tillämpningar",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>En motorbåt ska korsa en \\(120\\) m bred flod. Båten styrs rakt mot norra stranden och har farten \\(4{,}0\\) m/s i förhållande till vattnet. Floden strömmar österut med farten \\(3{,}0\\) m/s.</p><p>a) Beräkna båtens fart i förhållande till land.</p><p>b) Hur långt nedströms (österut) från startpunkten kommer båten i land?</p><p>c) I vilken riktning ska båten i stället styras för att komma i land rakt norr om startpunkten? Ange vinkeln mot rakt norrut.</p><p><em>Figuren är inte skalenlig.</em></p>",
    figur: `<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="15"><line x1="10" y1="30" x2="310" y2="30"/><line x1="10" y1="180" x2="310" y2="180"/><text x="14" y="22" fill="currentColor" stroke="none" font-size="14">norra stranden</text><text x="14" y="202" fill="currentColor" stroke="none" font-size="14">södra stranden</text><line x1="90" y1="175" x2="90" y2="86" stroke-width="3"/><polygon points="90.0,75.0 95.0,86.0 85.0,86.0" fill="currentColor" stroke="none"/><text x="98" y="112" fill="currentColor" stroke="none">4,0 m/s</text><line x1="200" y1="120" x2="269" y2="120" stroke-width="3"/><polygon points="280.0,120.0 269.0,125.0 269.0,115.0" fill="currentColor" stroke="none"/><text x="200" y="108" fill="currentColor" stroke="none" font-size="14">ström 3,0 m/s</text><line x1="90" y1="180" x2="180" y2="30" stroke-dasharray="5 4" stroke-width="1.5"/></svg>`,
    svar: {"facit": "a) \\(5{,}0\\) m/s b) \\(90\\) m c) ca \\(49^\\circ\\) västerut från norr (mot strömmen)"},
    ledtradar: ["Lägg in ett koordinatsystem med \\(x\\)-axeln österut och \\(y\\)-axeln norrut. Båtens hastighet i förhållande till land är summan av två vektorer.", "Tiden över floden bestäms av farten norrut.", "I c) ska båtens egen hastighetsvektor ha \\(x\\)-koordinaten \\(-3{,}0\\) och längden \\(4{,}0\\)."],
    losning: "<p>Inför ett koordinatsystem med \\(x\\) österut och \\(y\\) norrut. Båtens hastighet relativt vattnet är \\(\\vec{b} = (0,\\ 4{,}0)\\) och strömmen är \\(\\vec{s} = (3{,}0,\\ 0)\\).</p><p><strong>a)</strong> \\(\\vec{b} + \\vec{s} = (3{,}0,\\ 4{,}0)\\). Farten är \\(\\sqrt{3{,}0^2 + 4{,}0^2} = \\sqrt{25} = 5{,}0\\) m/s.</p><p><strong>b)</strong> Tiden över floden: \\(\\dfrac{120}{4{,}0} = 30\\) s. Under den tiden förs båten \\(3{,}0 \\cdot 30 = 90\\) m österut.</p><p><strong>c)</strong> Båtens egen hastighet måste ta ut strömmen: \\(\\vec{b} = (-3{,}0,\\ b_y)\\) med \\(|\\vec{b}| = 4{,}0\\). Om \\(v\\) är vinkeln mellan \\(\\vec{b}\\) och rakt norrut gäller \\(\\sin v = \\dfrac{3{,}0}{4{,}0} = 0{,}75\\), så \\(v = \\sin^{-1}(0{,}75) \\approx 48{,}6^\\circ\\).</p><p>Båten ska styras ca \\(49^\\circ\\) väster om norr, dvs. snett uppströms. (Farten över floden blir då \\(\\sqrt{16 - 9} = \\sqrt{7} \\approx 2{,}6\\) m/s.)</p>",
    bedomning: ["+E<sub>P</sub> för korrekt fart i förhållande till land, \\(5{,}0\\) m/s", "+C<sub>M</sub> för korrekt beräknad sträcka nedströms, \\(90\\) m", "+A<sub>PL</sub> för korrekt bestämd riktning, ca \\(49^\\circ\\) väster om norr, med godtagbar motivering"]
  },

  {
    id: "gtv-034",
    kurser: ["1c"],
    del: "C",
    omrade: "Vektorer",
    moment: "Vektorer och geometri",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Punkterna \\(A = (1,\\ 2)\\), \\(B = (5,\\ 3)\\), \\(C = (6,\\ 7)\\) och \\(D = (2,\\ 6)\\) är hörn i fyrhörningen \\(ABCD\\).</p><p>a) Visa med hjälp av vektorer att \\(ABCD\\) är en parallellogram.</p><p>b) Undersök om \\(ABCD\\) är en romb och om den är en kvadrat.</p>",
    svar: {"facit": "a) \\(\\overline{AB} = \\overline{DC} = (4,\\ 1)\\). b) Alla sidor är \\(\\sqrt{17}\\), så det är en romb. Diagonalen \\(AC\\) har längden \\(\\sqrt{50}\\) och \\(17 + 17 \\ne 50\\), så vinkeln vid \\(B\\) är inte rät – ingen kvadrat."},
    ledtradar: ["En fyrhörning är en parallellogram om \\(\\overline{AB} = \\overline{DC}\\) (lika långa och parallella motstående sidor).", "En romb har fyra lika långa sidor. Jämför \\(|\\overline{AB}|\\) och \\(|\\overline{AD}|\\).", "För att undersöka om en vinkel är rät kan du använda Pythagoras sats baklänges i triangeln \\(ABC\\)."],
    losning: "<p><strong>a)</strong> \\(\\overline{AB} = (5 - 1,\\ 3 - 2) = (4,\\ 1)\\) och \\(\\overline{DC} = (6 - 2,\\ 7 - 6) = (4,\\ 1)\\).</p><p>Eftersom \\(\\overline{AB} = \\overline{DC}\\) är sidorna \\(AB\\) och \\(DC\\) parallella och lika långa. En fyrhörning med ett par motstående sidor som är parallella och lika långa är en parallellogram.</p><p><strong>b)</strong> \\(\\overline{AD} = (2 - 1,\\ 6 - 2) = (1,\\ 4)\\).</p><p>\\(|\\overline{AB}| = \\sqrt{4^2 + 1^2} = \\sqrt{17}\\) och \\(|\\overline{AD}| = \\sqrt{1^2 + 4^2} = \\sqrt{17}\\).</p><p>I en parallellogram är motstående sidor lika långa, så alla fyra sidor är \\(\\sqrt{17}\\). Alltså är \\(ABCD\\) en <strong>romb</strong>.</p><p>Kvadrat? Då måste vinkeln vid \\(B\\) vara rät. \\(\\overline{AC} = (5,\\ 5)\\), så \\(|\\overline{AC}|^2 = 50\\). Men \\(|\\overline{AB}|^2 + |\\overline{BC}|^2 = 17 + 17 = 34 \\ne 50\\). Enligt Pythagoras sats (omvändningen) är vinkeln vid \\(B\\) inte rät, så \\(ABCD\\) är <strong>inte en kvadrat</strong>.</p><p>(Kontroll: i en kvadrat skulle diagonalerna vara lika långa, men \\(|\\overline{BD}| = |(-3,\\ 3)| = \\sqrt{18} \\ne \\sqrt{50}\\).)</p>",
    bedomning: ["+C<sub>R</sub> för att visa att \\(\\overline{AB} = \\overline{DC}\\) (eller \\(\\overline{AD} = \\overline{BC}\\)) och dra slutsatsen att det är en parallellogram", "+A<sub>R</sub> för att visa att alla sidor är \\(\\sqrt{17}\\) och dra slutsatsen att det är en romb", "+A<sub>R</sub> för en korrekt motivering till att \\(ABCD\\) inte är en kvadrat, t.ex. med Pythagoras sats eller olika långa diagonaler"]
  },

  {
    id: "gtv-035",
    kurser: ["1c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Programmering",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Vilket tal skrivs ut när följande Pythonprogram körs?</p><pre><code>s = 0\nfor k in range(1, 5):\n    s = s + 2*k\nprint(s)</code></pre><p><em>Kom ihåg: <code>range(1, 5)</code> ger talen 1, 2, 3, 4.</em></p>",
    svar: {"varde": 20, "tolerans": 0},
    ledtradar: ["Gå igenom loopen varv för varv och skriv upp värdet på <code>s</code> efter varje varv.", "Efter första varvet är <code>s = 2</code>."],
    losning: "<p>Loopen körs för \\(k = 1, 2, 3, 4\\):</p><ul><li>\\(k = 1\\): \\(s = 0 + 2 = 2\\)</li><li>\\(k = 2\\): \\(s = 2 + 4 = 6\\)</li><li>\\(k = 3\\): \\(s = 6 + 6 = 12\\)</li><li>\\(k = 4\\): \\(s = 12 + 8 = 20\\)</li></ul><p>Programmet skriver ut <strong>20</strong>.</p>"
  },

  {
    id: "gtv-036",
    kurser: ["1c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Programmering",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Ett läkemedel bryts ned i kroppen så att mängden minskar med \\(20\\ \\%\\) varje timme. Programmet nedan använder detta.</p><pre><code>x = 100\nn = 0\nwhile x &gt; 50:\n    x = 0.8 * x\n    n = n + 1\nprint(n)</code></pre><p>Vilket tal skrivs ut?</p>",
    svar: {"varde": 4, "tolerans": 0},
    ledtradar: ["Loopen fortsätter så länge <code>x</code> är större än 50. Följ värdet på <code>x</code> och <code>n</code> varv för varv.", "\\(100 \\to 80 \\to 64 \\to \\ldots\\)"],
    losning: "<p>Värdena efter varje varv:</p><ul><li>Varv 1: \\(x = 80\\), \\(n = 1\\)</li><li>Varv 2: \\(x = 64\\), \\(n = 2\\)</li><li>Varv 3: \\(x = 51{,}2\\), \\(n = 3\\)</li><li>Varv 4: \\(x = 40{,}96\\), \\(n = 4\\)</li></ul><p>Nu är \\(x \\gt 50\\) falskt, så loopen avbryts och programmet skriver ut <strong>4</strong>. Programmet beräknar alltså hur många hela timmar det tar innan mängden har sjunkit under hälften.</p>"
  },

  {
    id: "gtv-037",
    kurser: ["1c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Programmering",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Sara vill att programmet nedan ska beräkna summan \\(1 + 2 + 3 + \\ldots + 10 = 55\\). Men programmet skriver ut 45.</p><pre><code>summa = 0\nfor i in range(1, 10):\n    summa = summa + i\nprint(summa)</code></pre><p>Vad är felet?</p>",
    svar: {"alternativ": ["<code>range(1, 10)</code> ger bara talen 1 till 9. Det ska stå <code>range(1, 11)</code>.", "<code>summa</code> ska börja på 1 i stället för 0.", "<code>print(summa)</code> ska stå inne i loopen.", "Raden <code>summa = summa + i</code> ska vara <code>summa = i</code>."], "ratt": 0},
    ledtradar: ["Vilka värden antar <code>i</code>? Tänk på att slutvärdet i <code>range</code> inte kommer med.", "\\(55 - 45 = 10\\). Vilket tal saknas i summan?"],
    losning: "<p><code>range(1, 10)</code> ger talen \\(1, 2, \\ldots, 9\\) – slutvärdet 10 kommer inte med. Därför blir summan \\(1 + 2 + \\ldots + 9 = 45\\). Med <code>range(1, 11)</code> blir summan 55.</p><p>Om <code>summa</code> började på 1 skulle svaret bli 46. Med <code>print</code> i loopen skrivs många delsummor ut, och <code>summa = i</code> ger bara sista talet, 9.</p>"
  },

  {
    id: "gtv-038",
    kurser: ["1c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Programmering – numerisk metod",
    niva: "A",
    poang: "0/2/1",
    typ: "redovisning",
    fraga: "<p>Programmet nedan använder en numerisk metod som kallas <em>intervallhalvering</em>.</p><pre><code>a = 2\nb = 3\nfor i in range(3):\n    m = (a + b) / 2\n    if m**3 &lt; 20:\n        a = m\n    else:\n        b = m\nprint(a, b)</code></pre><p>a) Vad skrivs ut när programmet körs?</p><p>b) Förklara vad programmet beräknar en uppskattning av.</p><p>c) Hur många varv måste loopen köras för att skillnaden mellan <code>b</code> och <code>a</code> ska bli mindre än \\(0{,}001\\)? Motivera.</p>",
    svar: {"facit": "a) <code>2.625 2.75</code> b) Lösningen till \\(x^3 = 20\\), dvs. \\(\\sqrt[3]{20} \\approx 2{,}714\\), ligger mellan <code>a</code> och <code>b</code>. c) 10 varv, eftersom \\(\\tfrac{1}{2^{10}} = \\tfrac{1}{1024} \\lt 0{,}001\\) men \\(\\tfrac{1}{2^9} = \\tfrac{1}{512} \\gt 0{,}001\\)."},
    ledtradar: ["Följ programmet varv för varv. Räkna \\(m^3\\) och jämför med 20.", "Vad händer med intervallet \\([a,\\ b]\\) i varje varv? Vilket tal ligger alltid kvar inuti intervallet?", "Intervallets längd är från början 1 och halveras i varje varv."],
    losning: "<p><strong>a)</strong></p><ul><li>Varv 1: \\(m = 2{,}5\\), \\(m^3 = 15{,}625 \\lt 20\\) ⇒ \\(a = 2{,}5\\).</li><li>Varv 2: \\(m = 2{,}75\\), \\(m^3 \\approx 20{,}80 \\gt 20\\) ⇒ \\(b = 2{,}75\\).</li><li>Varv 3: \\(m = 2{,}625\\), \\(m^3 \\approx 18{,}09 \\lt 20\\) ⇒ \\(a = 2{,}625\\).</li></ul><p>Programmet skriver ut <code>2.625 2.75</code>.</p><p><strong>b)</strong> I varje varv behålls den halva av intervallet där \\(m^3\\) passerar 20: \\(a^3 \\lt 20\\) och \\(b^3 \\ge 20\\) hela tiden. Lösningen till ekvationen \\(x^3 = 20\\), dvs. \\(x = \\sqrt[3]{20} \\approx 2{,}714\\), ligger därför alltid mellan <code>a</code> och <code>b</code>. Programmet ringar in \\(\\sqrt[3]{20}\\).</p><p><strong>c)</strong> Intervallets längd är från början \\(3 - 2 = 1\\) och halveras varje varv. Efter \\(n\\) varv är längden \\(\\dfrac{1}{2^n}\\). \\(2^9 = 512\\) ger \\(\\tfrac{1}{512} \\approx 0{,}00195 \\gt 0{,}001\\), medan \\(2^{10} = 1024\\) ger \\(\\tfrac{1}{1024} \\approx 0{,}00098 \\lt 0{,}001\\). Det krävs alltså <strong>10 varv</strong>, dvs. <code>range(10)</code>.</p>",
    bedomning: ["+C<sub>P</sub> för korrekt utskrift, <code>2.625 2.75</code>", "+C<sub>B</sub> för en godtagbar förklaring att programmet ringar in lösningen till \\(x^3 = 20\\) (\\(\\sqrt[3]{20}\\))", "+A<sub>R</sub> för korrekt antal varv, 10, med motivering att intervallets längd halveras varje varv, \\(\\tfrac{1}{2^n} \\lt 0{,}001\\)"]
  },

  {
    id: "gtv-039",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Generella samband",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Figurerna är byggda av tändstickor. Figur 1 består av 4 stickor, figur 2 av 7 stickor och figur 3 av 10 stickor. Mönstret fortsätter på samma sätt.</p><p>Hur många tändstickor behövs för figur 10?</p>",
    figur: `<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="14"><rect x="16" y="26" width="26" height="26"/><rect x="76" y="26" width="26" height="26"/><rect x="102" y="26" width="26" height="26"/><rect x="166" y="26" width="26" height="26"/><rect x="192" y="26" width="26" height="26"/><rect x="218" y="26" width="26" height="26"/><text x="8" y="92" fill="currentColor" stroke="none" font-size="14">Figur 1</text><text x="78" y="92" fill="currentColor" stroke="none" font-size="14">Figur 2</text><text x="192" y="92" fill="currentColor" stroke="none" font-size="14">Figur 3</text></svg>`,
    svar: {"varde": 31, "tolerans": 0, "enhet": "stickor"},
    ledtradar: ["Hur många stickor tillkommer för varje ny figur?", "Figur 1 har 4 stickor. Från figur 1 till figur 10 tillkommer 9 kvadrater."],
    losning: "<p>För varje ny kvadrat behövs 3 nya stickor. Antalet stickor i figur \\(n\\) är \\(4 + 3(n - 1) = 3n + 1\\).</p><p>Figur 10: \\(3 \\cdot 10 + 1 = 31\\) stickor.</p>"
  },

  {
    id: "gtv-040",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Generella samband",
    niva: "C",
    poang: "0/1/0",
    typ: "text",
    fraga: "<p>Figurerna består av prickar. Figur 1 har 2 prickar, figur 2 har 6 prickar och figur 3 har 12 prickar. Mönstret fortsätter på samma sätt.</p><p>Skriv ett uttryck för antalet prickar i figur \\(n\\).</p>",
    figur: `<svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="14"><circle cx="30" cy="50" r="4.5" fill="currentColor" stroke="none"/><circle cx="46" cy="50" r="4.5" fill="currentColor" stroke="none"/><circle cx="100" cy="42" r="4.5" fill="currentColor" stroke="none"/><circle cx="116" cy="42" r="4.5" fill="currentColor" stroke="none"/><circle cx="132" cy="42" r="4.5" fill="currentColor" stroke="none"/><circle cx="100" cy="58" r="4.5" fill="currentColor" stroke="none"/><circle cx="116" cy="58" r="4.5" fill="currentColor" stroke="none"/><circle cx="132" cy="58" r="4.5" fill="currentColor" stroke="none"/><circle cx="200" cy="34" r="4.5" fill="currentColor" stroke="none"/><circle cx="216" cy="34" r="4.5" fill="currentColor" stroke="none"/><circle cx="232" cy="34" r="4.5" fill="currentColor" stroke="none"/><circle cx="248" cy="34" r="4.5" fill="currentColor" stroke="none"/><circle cx="200" cy="50" r="4.5" fill="currentColor" stroke="none"/><circle cx="216" cy="50" r="4.5" fill="currentColor" stroke="none"/><circle cx="232" cy="50" r="4.5" fill="currentColor" stroke="none"/><circle cx="248" cy="50" r="4.5" fill="currentColor" stroke="none"/><circle cx="200" cy="66" r="4.5" fill="currentColor" stroke="none"/><circle cx="216" cy="66" r="4.5" fill="currentColor" stroke="none"/><circle cx="232" cy="66" r="4.5" fill="currentColor" stroke="none"/><circle cx="248" cy="66" r="4.5" fill="currentColor" stroke="none"/><text x="14" y="108" fill="currentColor" stroke="none" font-size="14">Figur 1</text><text x="94" y="108" fill="currentColor" stroke="none" font-size="14">Figur 2</text><text x="200" y="108" fill="currentColor" stroke="none" font-size="14">Figur 3</text></svg>`,
    svar: {"godkanda": ["n(n+1)", "(n+1)n", "n(1+n)", "(1+n)n", "n^2+n", "n+n^2", "n²+n", "n+n²", "nn+n", "n+nn"]},
    ledtradar: ["Hur många rader och hur många kolumner har varje figur?", "Figur 3 har 3 rader. Hur många prickar finns i varje rad, uttryckt med figurens nummer?"],
    losning: "<p>Figur \\(n\\) har \\(n\\) rader med \\(n + 1\\) prickar i varje rad. Antalet prickar är därför</p><p>\\[n(n + 1) = n^2 + n\\]</p><p>Kontroll: figur 3 ger \\(3 \\cdot 4 = 12\\) ✓.</p>"
  },

  {
    id: "gtv-041",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Generella samband",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>En kvadratisk pool har sidan \\(n\\) meter. Runt poolen läggs en kant av kvadratiska plattor med sidan 1 m. Figuren visar en pool med \\(n = 3\\), som behöver 16 plattor.</p><p>a) Hur många plattor behövs för en pool med \\(n = 5\\)?</p><p>b) Ställ upp en formel för antalet plattor \\(P\\) som behövs för en pool med sidan \\(n\\) meter. Motivera varför formeln gäller.</p>",
    figur: `<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="16"><rect x="20" y="18" width="32" height="32" stroke-width="1.5"/><rect x="20" y="50" width="32" height="32" stroke-width="1.5"/><rect x="20" y="82" width="32" height="32" stroke-width="1.5"/><rect x="20" y="114" width="32" height="32" stroke-width="1.5"/><rect x="20" y="146" width="32" height="32" stroke-width="1.5"/><rect x="52" y="18" width="32" height="32" stroke-width="1.5"/><rect x="52" y="146" width="32" height="32" stroke-width="1.5"/><rect x="84" y="18" width="32" height="32" stroke-width="1.5"/><rect x="84" y="146" width="32" height="32" stroke-width="1.5"/><rect x="116" y="18" width="32" height="32" stroke-width="1.5"/><rect x="116" y="146" width="32" height="32" stroke-width="1.5"/><rect x="148" y="18" width="32" height="32" stroke-width="1.5"/><rect x="148" y="50" width="32" height="32" stroke-width="1.5"/><rect x="148" y="82" width="32" height="32" stroke-width="1.5"/><rect x="148" y="114" width="32" height="32" stroke-width="1.5"/><rect x="148" y="146" width="32" height="32" stroke-width="1.5"/><rect x="52" y="50" width="96" height="96" stroke-dasharray="5 4" stroke-width="1.5"/><text x="84" y="103" fill="currentColor" stroke="none">Pool</text><text x="200" y="70" fill="currentColor" stroke="none" font-style="italic">n = 3</text><text x="196" y="96" fill="currentColor" stroke="none" font-size="14">16 plattor</text></svg>`,
    svar: {"facit": "a) 24 plattor b) \\(P = 4n + 4\\) (t.ex. \\(n\\) plattor längs varje sida plus 4 hörnplattor)"},
    ledtradar: ["Rita en pool med \\(n = 5\\) och räkna, eller tänk på hur många plattor som ligger längs varje sida.", "Längs varje sida av poolen ligger \\(n\\) plattor. Vilka plattor har du då inte räknat med?"],
    losning: "<p><strong>a)</strong> Längs varje sida ligger 5 plattor, dvs. \\(4 \\cdot 5 = 20\\), och dessutom en platta i vart och ett av de 4 hörnen. Totalt \\(24\\) plattor.</p><p><strong>b)</strong> Längs var och en av poolens fyra sidor ligger \\(n\\) plattor, totalt \\(4n\\). Dessutom behövs 4 hörnplattor. Alltså \\(P = 4n + 4\\).</p><p>Alternativ motivering: hela området (pool + kant) är en kvadrat med sidan \\(n + 2\\). Kanten är det området minus poolen: \\((n + 2)^2 - n^2 = n^2 + 4n + 4 - n^2 = 4n + 4\\).</p><p>Kontroll: \\(n = 3\\) ger \\(4 \\cdot 3 + 4 = 16\\) ✓.</p>",
    bedomning: ["+E<sub>P</sub> för korrekt antal plattor, 24", "+C<sub>R</sub> för korrekt formel, \\(P = 4n + 4\\) (eller likvärdig), med en godtagbar motivering som bygger på figurens struktur"]
  },

  {
    id: "gtv-042",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Generella samband",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>Figurerna är trappor byggda av kvadrater med sidan 1 cm. Mönstret fortsätter på samma sätt.</p><p>a) Hur många kvadrater behövs till figur 6?</p><p>b) Visa att omkretsen av figur \\(n\\) är \\(4n\\) cm.</p><p>c) Bestäm ett uttryck för antalet kvadrater i figur \\(n\\). Motivera att uttrycket gäller för alla \\(n\\).</p>",
    figur: `<svg viewBox="0 0 320 130" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" fill="none" stroke-width="2" font-family="sans-serif" font-size="14"><rect x="24" y="74" width="16" height="16" stroke-width="1.5"/><rect x="84" y="74" width="16" height="16" stroke-width="1.5"/><rect x="100" y="74" width="16" height="16" stroke-width="1.5"/><rect x="100" y="58" width="16" height="16" stroke-width="1.5"/><rect x="170" y="74" width="16" height="16" stroke-width="1.5"/><rect x="186" y="74" width="16" height="16" stroke-width="1.5"/><rect x="186" y="58" width="16" height="16" stroke-width="1.5"/><rect x="202" y="74" width="16" height="16" stroke-width="1.5"/><rect x="202" y="58" width="16" height="16" stroke-width="1.5"/><rect x="202" y="42" width="16" height="16" stroke-width="1.5"/><text x="8" y="116" fill="currentColor" stroke="none" font-size="14">Figur 1</text><text x="74" y="116" fill="currentColor" stroke="none" font-size="14">Figur 2</text><text x="172" y="116" fill="currentColor" stroke="none" font-size="14">Figur 3</text></svg>`,
    svar: {"facit": "a) 21 b) Trappans konturer har sammanlagt \\(2n\\) cm vågräta och \\(2n\\) cm lodräta sträckor. c) \\(\\dfrac{n(n+1)}{2}\\)"},
    ledtradar: ["Figur \\(n\\) har kolumner med \\(1, 2, 3, \\ldots, n\\) kvadrater.", "För omkretsen: skjut alla små \"trappsteg\" utåt i tanken. Vilken figur får samma omkrets?", "Lägg två likadana trappor mot varandra (den ena upp och ned). Vilken figur bildas?"],
    losning: "<p><strong>a)</strong> \\(1 + 2 + 3 + 4 + 5 + 6 = 21\\) kvadrater.</p><p><strong>b)</strong> Trappan är \\(n\\) cm bred och \\(n\\) cm hög. Botten är \\(n\\) cm och vänstra sidan \\(n\\) cm. Trappstegens vågräta delar är tillsammans \\(n\\) cm (de täcker hela bredden) och de lodräta delarna tillsammans \\(n\\) cm (de täcker hela höjden). Omkretsen är \\(n + n + n + n = 4n\\) cm – samma som för en kvadrat med sidan \\(n\\).</p><p><strong>c)</strong> Två likadana trappor, där den ena vänds upp och ned, passar ihop till en rektangel med \\(n\\) rader och \\(n + 1\\) kolumner, alltså \\(n(n + 1)\\) kvadrater. En trappa är hälften:</p><p>\\[\\text{antal} = \\frac{n(n+1)}{2}\\]</p><p>Kontroll: \\(n = 6\\) ger \\(\\dfrac{6 \\cdot 7}{2} = 21\\) ✓. Eftersom resonemanget inte bygger på något särskilt \\(n\\) gäller det för alla \\(n\\).</p>",
    bedomning: ["+E<sub>P</sub> för korrekt antal kvadrater i figur 6, 21", "+C<sub>R</sub> för en godtagbar generell motivering till att omkretsen är \\(4n\\) cm", "+A<sub>R</sub> för korrekt uttryck \\(\\dfrac{n(n+1)}{2}\\) med en generell motivering, t.ex. att två trappor bildar en rektangel \\(n \\times (n+1)\\)"]
  }

);
