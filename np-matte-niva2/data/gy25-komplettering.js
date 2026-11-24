// Uppgifter: Komplettering enligt Gy25:s centrala innehåll (nivå 2a/2b/2c)
// Rotekvationer, logik och bevis, logaritmlagar, potensfunktioner/potensekvationer,
// percentiler, normalfördelning, programmering, kritisk granskning/modeller, räta linjen.
// NP Matematik nivå 2a/2b/2c – se SCHEMA.md
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(

  // ===================== ROTEKVATIONER (2c) =====================

  {
    id: "gy-001",
    kurser: ["2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Rotekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\(\\sqrt{x+3}=4\\).</p>",
    svar: { varde: 13, tolerans: 0 },
    ledtradar: [
      "Kvadrera båda leden för att bli av med rottecknet.",
      "Pröva din lösning i den ursprungliga ekvationen."
    ],
    losning: "<ol><li>Kvadrera båda leden: \\(x+3=16\\).</li><li>Subtrahera 3: \\(x=13\\).</li></ol><p><strong>Prövning:</strong> VL \\(=\\sqrt{13+3}=\\sqrt{16}=4=\\) HL. ✓</p><p><strong>Svar:</strong> \\(x=13\\)</p>"
  },

  {
    id: "gy-002",
    kurser: ["2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Rotekvationer – falska rötter",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Amir löser ekvationen \\(\\sqrt{x+6}=x\\) genom att kvadrera båda leden. Han får andragradsekvationen \\(x^2-x-6=0\\) med lösningarna \\(x_1=3\\) och \\(x_2=-2\\).</p><p>Vilket av följande påståenden stämmer?</p>",
    svar: {
      alternativ: [
        "Både \\(x=3\\) och \\(x=-2\\) är lösningar till \\(\\sqrt{x+6}=x\\).",
        "Endast \\(x=3\\) är en lösning till \\(\\sqrt{x+6}=x\\).",
        "Endast \\(x=-2\\) är en lösning till \\(\\sqrt{x+6}=x\\).",
        "Ingen av dem är en lösning, eftersom man inte får kvadrera en ekvation."
      ],
      ratt: 1
    },
    ledtradar: [
      "När man kvadrerar en ekvation kan det dyka upp lösningar som inte stämmer i den ursprungliga ekvationen (falska rötter).",
      "Sätt in \\(x=3\\) och \\(x=-2\\) i \\(\\sqrt{x+6}=x\\). Kom ihåg att \\(\\sqrt{\\ }\\) alltid ger ett tal som är \\(\\geq 0\\)."
    ],
    losning: "<ol><li>Pröva \\(x=3\\): VL \\(=\\sqrt{9}=3\\), HL \\(=3\\). ✓</li><li>Pröva \\(x=-2\\): VL \\(=\\sqrt{4}=2\\), HL \\(=-2\\). Eftersom \\(2\\neq -2\\) är \\(x=-2\\) en <em>falsk rot</em>.</li><li>Den falska roten uppstod vid kvadreringen: både \\(2^2\\) och \\((-2)^2\\) blir 4, så kvadreringen \"ser inte\" tecknet.</li></ol><p><strong>Svar:</strong> Endast \\(x=3\\) är en lösning.</p><p>Det är tillåtet att kvadrera, men då <em>måste</em> man pröva lösningarna.</p>"
  },

  {
    id: "gy-003",
    kurser: ["2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Rotekvationer",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Lös ekvationen \\[\\sqrt{2x+7}=x+2\\]</p>",
    svar: { facit: "\\(x=1\\) (\\(x=-3\\) är en falsk rot)" },
    ledtradar: [
      "Kvadrera båda leden. Använd kvadreringsregeln i högerledet: \\((x+2)^2=x^2+4x+4\\).",
      "Lös andragradsekvationen och pröva båda lösningarna i den ursprungliga ekvationen."
    ],
    losning: "<ol><li>Kvadrera båda leden: \\(2x+7=(x+2)^2=x^2+4x+4\\).</li><li>Samla allt i ett led: \\(x^2+2x-3=0\\).</li><li>pq-formeln: \\(x=-1\\pm\\sqrt{1+3}=-1\\pm 2\\), dvs. \\(x_1=1\\) och \\(x_2=-3\\).</li><li>Prövning \\(x=1\\): VL \\(=\\sqrt{9}=3\\), HL \\(=1+2=3\\). ✓</li><li>Prövning \\(x=-3\\): VL \\(=\\sqrt{1}=1\\), HL \\(=-3+2=-1\\). Stämmer inte – falsk rot.</li></ol><p><strong>Svar:</strong> \\(x=1\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt kvadrering och lösning av andragradsekvationen, \\(x_1=1\\) och \\(x_2=-3\\)",
      "+C<sub>R</sub> för att genom prövning visa att \\(x=-3\\) är en falsk rot och ange endast \\(x=1\\) som svar"
    ]
  },

  {
    id: "gy-004",
    kurser: ["2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Rotekvationer",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Lös ekvationen \\[\\sqrt{x+1}+\\sqrt{x-4}=5\\]</p>",
    svar: { facit: "\\(x=8\\)" },
    ledtradar: [
      "Om du kvadrerar direkt får du kvar en dubbel produkt med rötter. Börja med att isolera en av rötterna, t.ex. \\(\\sqrt{x+1}=5-\\sqrt{x-4}\\).",
      "Efter första kvadreringen finns en rot kvar. Isolera den och kvadrera en gång till. Glöm inte prövningen!"
    ],
    losning: "<ol><li>Isolera en rot: \\(\\sqrt{x+1}=5-\\sqrt{x-4}\\).</li><li>Kvadrera: \\(x+1=25-10\\sqrt{x-4}+(x-4)\\).</li><li>Förenkla: \\(x+1=x+21-10\\sqrt{x-4}\\), alltså \\(10\\sqrt{x-4}=20\\) och \\(\\sqrt{x-4}=2\\).</li><li>Kvadrera igen: \\(x-4=4\\), dvs. \\(x=8\\).</li><li>Prövning: VL \\(=\\sqrt{9}+\\sqrt{4}=3+2=5=\\) HL. ✓</li></ol><p><strong>Svar:</strong> \\(x=8\\)</p>",
    bedomning: [
      "+C<sub>P</sub> för att isolera en rot, kvadrera och komma fram till en ekvation med endast en rot, t.ex. \\(\\sqrt{x-4}=2\\)",
      "+A<sub>P</sub> för fullständig lösning, \\(x=8\\), med prövning i den ursprungliga ekvationen"
    ]
  },

  {
    id: "gy-005",
    kurser: ["2c"],
    del: "B",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Rotekvationer i tillämpning",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Svängningstiden \\(T\\) sekunder för en pendel med längden \\(L\\) meter kan beräknas med formeln \\[T=2\\pi\\sqrt{\\frac{L}{9{,}82}}\\]</p><p>Hur lång ska pendeln vara för att svängningstiden ska bli \\(3{,}0\\) s? Svara i meter med två decimaler.</p>",
    svar: { varde: 2.24, tolerans: 0.01, enhet: "m" },
    ledtradar: [
      "Sätt \\(T=3{,}0\\) och lös ekvationen \\(3=2\\pi\\sqrt{L/9{,}82}\\).",
      "Algebraiskt: dela med \\(2\\pi\\) och kvadrera sedan båda leden."
    ],
    losning: "<ol><li>Ekvation: \\(3=2\\pi\\sqrt{\\dfrac{L}{9{,}82}}\\).</li><li>I GeoGebra (CAS): <code>Lös(3 = 2π sqrt(L/9.82), L)</code> ger \\(L\\approx 2{,}2387\\).</li><li>Alternativt för hand: \\(\\sqrt{L/9{,}82}=\\dfrac{3}{2\\pi}\\Rightarrow L=9{,}82\\cdot\\left(\\dfrac{3}{2\\pi}\\right)^2\\approx 2{,}24\\).</li><li>Prövning: \\(2\\pi\\sqrt{2{,}2387/9{,}82}\\approx 3{,}0\\). ✓</li></ol><p><strong>Svar:</strong> ca \\(2{,}24\\) m</p>"
  },

  // ===================== LOGIK OCH BEVIS (2b/2c) =====================

  {
    id: "gy-006",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Logik och bevis",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilken pil ska stå mellan påståendena för att det hela ska bli sant?</p><p style='text-align:center'>\\(x^2=9\\qquad\\boxed{\\ ?\\ }\\qquad x=3\\)</p>",
    svar: {
      alternativ: ["\\(\\Rightarrow\\)", "\\(\\Leftarrow\\)", "\\(\\Leftrightarrow\\)"],
      ratt: 1
    },
    ledtradar: [
      "\\(P\\Rightarrow Q\\) betyder: om \\(P\\) är sant så är \\(Q\\) sant.",
      "Om \\(x^2=9\\), måste då \\(x=3\\)? Tänk på negativa tal. Gäller det omvända?"
    ],
    losning: "<ol><li>Om \\(x=3\\) så är \\(x^2=9\\). Alltså gäller \\(x=3\\Rightarrow x^2=9\\), vilket skrivs \\(x^2=9\\Leftarrow x=3\\).</li><li>Om \\(x^2=9\\) kan \\(x=-3\\). Alltså gäller <em>inte</em> \\(x^2=9\\Rightarrow x=3\\).</li><li>Eftersom bara den ena riktningen gäller är det ingen ekvivalens.</li></ol><p><strong>Svar:</strong> \\(x^2=9\\Leftarrow x=3\\)</p>"
  },

  {
    id: "gy-007",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Logik och bevis",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Triangeln \\(ABC\\) har sidorna \\(a\\), \\(b\\) och \\(c\\), där \\(c\\) är den längsta sidan. Vilken pil ska stå mellan påståendena?</p><p style='text-align:center'>Triangeln är rätvinklig \\(\\qquad\\boxed{\\ ?\\ }\\qquad a^2+b^2=c^2\\)</p>",
    svar: {
      alternativ: ["\\(\\Rightarrow\\)", "\\(\\Leftarrow\\)", "\\(\\Leftrightarrow\\)"],
      ratt: 2
    },
    ledtradar: [
      "Pythagoras sats säger vad som gäller för sidorna <em>om</em> triangeln är rätvinklig.",
      "Finns det också en sats som går åt andra hållet (Pythagoras sats omvändning)?"
    ],
    losning: "<ol><li>Pythagoras sats: om triangeln är rätvinklig (med hypotenusan \\(c\\)) så gäller \\(a^2+b^2=c^2\\). Det ger \\(\\Rightarrow\\).</li><li>Omvändningen av Pythagoras sats: om \\(a^2+b^2=c^2\\) så är triangeln rätvinklig. Det ger \\(\\Leftarrow\\).</li><li>När båda riktningarna gäller har vi en ekvivalens.</li></ol><p><strong>Svar:</strong> \\(\\Leftrightarrow\\)</p>"
  },

  {
    id: "gy-008",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Logik och bevis",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Vilket av följande påståenden är sant för alla reella tal?</p>",
    svar: {
      alternativ: [
        "\\(x^2\\gt 4\\;\\Rightarrow\\; x\\gt 2\\)",
        "\\(x\\gt 2\\;\\Leftrightarrow\\; x^2\\gt 4\\)",
        "\\(ab\\gt 0\\;\\Rightarrow\\; a\\gt 0\\)",
        "\\(xy=0\\;\\Leftrightarrow\\; x=0\\text{ eller }y=0\\)"
      ],
      ratt: 3
    },
    ledtradar: [
      "Ett enda motexempel räcker för att visa att en implikation är falsk.",
      "Pröva negativa tal, t.ex. \\(x=-3\\) eller \\(a=b=-1\\)."
    ],
    losning: "<ol><li>\\(x^2\\gt 4\\Rightarrow x\\gt 2\\) är falskt: \\(x=-3\\) ger \\(x^2=9\\gt 4\\) men \\(x\\lt 2\\).</li><li>\\(x\\gt 2\\Leftrightarrow x^2\\gt 4\\) är falskt av samma skäl (pilen \\(\\Leftarrow\\) gäller inte).</li><li>\\(ab\\gt 0\\Rightarrow a\\gt 0\\) är falskt: \\(a=b=-1\\) ger \\(ab=1\\gt 0\\).</li><li>\\(xy=0\\Leftrightarrow x=0\\) eller \\(y=0\\) är sant: en produkt är noll om och endast om någon faktor är noll (nollproduktmetoden).</li></ol><p><strong>Svar:</strong> \\(xy=0\\Leftrightarrow x=0\\) eller \\(y=0\\)</p>"
  },

  {
    id: "gy-009",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Logik och bevis",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Påstående: <em>\"Summan av två primtal är alltid ett jämnt tal.\"</em></p><p>Vilket av följande är ett motexempel som visar att påståendet är falskt?</p>",
    svar: {
      alternativ: ["\\(3+5=8\\)", "\\(2+7=9\\)", "\\(9+15=24\\)", "\\(1+4=5\\)"],
      ratt: 1
    },
    ledtradar: [
      "Ett motexempel ska uppfylla förutsättningen (två primtal) men inte slutsatsen (jämn summa).",
      "Kontrollera att båda talen verkligen är primtal. Är 1 ett primtal? Är 9 det?"
    ],
    losning: "<ol><li>\\(3+5=8\\): båda primtal, men summan är jämn – inget motexempel.</li><li>\\(2+7=9\\): 2 och 7 är primtal och summan 9 är udda – detta är ett motexempel.</li><li>\\(9+15\\): varken 9 eller 15 är primtal.</li><li>\\(1+4\\): 1 är inte ett primtal (enligt definitionen) och 4 är inte ett primtal.</li></ol><p><strong>Svar:</strong> \\(2+7=9\\)</p><p>Ett enda motexempel räcker för att motbevisa ett påstående som ska gälla <em>alltid</em>.</p>"
  },

  {
    id: "gy-010",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Definition, sats och bevis",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilket av följande är en <strong>definition</strong> och inte en sats?</p>",
    svar: {
      alternativ: [
        "Vinkelsumman i en triangel är \\(180^\\circ\\).",
        "Ett primtal är ett positivt heltal som är större än 1 och endast delbart med 1 och sig självt.",
        "I en rätvinklig triangel gäller \\(a^2+b^2=c^2\\).",
        "Det finns oändligt många primtal."
      ],
      ratt: 1
    },
    ledtradar: [
      "En definition bestämmer vad ett ord eller begrepp betyder. En sats är ett påstående som har bevisats.",
      "Vilket av alternativen går inte att bevisa, eftersom det bara talar om vad vi menar med ett ord?"
    ],
    losning: "<ul><li>Vinkelsumman i en triangel, Pythagoras sats och att det finns oändligt många primtal är <em>satser</em> – påståenden som bevisas utifrån definitioner och tidigare kända satser.</li><li>Meningen om primtal talar om vad ordet <em>primtal</em> betyder. Den kan inte bevisas – den är en <em>definition</em>.</li></ul><p><strong>Svar:</strong> Ett primtal är ett positivt heltal som är större än 1 och endast delbart med 1 och sig självt.</p>"
  },

  {
    id: "gy-011",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Troliggöra och bevisa",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Elin undersöker uttrycket \\(n^2+n+41\\). Hon sätter in \\(n=0,1,2,\\dots,10\\) och får varje gång ett primtal: \\(41, 43, 47, 53, \\dots\\)</p><p>Hon drar slutsatsen: <em>\"\\(n^2+n+41\\) är ett primtal för alla naturliga tal \\(n\\).\"</em></p><p>Vilket påstående stämmer?</p>",
    svar: {
      alternativ: [
        "Elin har bevisat påståendet, eftersom hon har kontrollerat elva olika tal.",
        "Elin har troliggjort påståendet, men det är falskt. Till exempel ger \\(n=40\\) talet \\(1681=41\\cdot 41\\).",
        "Elin har troliggjort påståendet. Det är sant, men hon behöver pröva fler tal för att det ska räknas som ett bevis.",
        "Påståendet är falskt eftersom \\(n=1\\) ger 43, som inte är ett primtal."
      ],
      ratt: 1
    },
    ledtradar: [
      "Att pröva exempel kan göra ett påstående troligt, men räcker det som bevis för <em>alla</em> \\(n\\)?",
      "Pröva \\(n=40\\): \\(40^2+40+41=40\\cdot 41+41\\). Kan du bryta ut något?"
    ],
    losning: "<ol><li>Att pröva ett antal exempel kallas att <em>troliggöra</em>. Hur många exempel man än prövar blir det inget bevis för alla \\(n\\).</li><li>\\(n=40\\): \\(40^2+40+41=40\\cdot 41+41=41\\cdot 41=1681\\), som inte är ett primtal.</li><li>Alltså är påståendet falskt – \\(n=40\\) är ett motexempel. (43 är för övrigt ett primtal.)</li></ol><p><strong>Svar:</strong> Elin har troliggjort påståendet, men det är falskt; \\(n=40\\) ger \\(41\\cdot 41\\).</p>"
  },

  {
    id: "gy-012",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Logik och bevis",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Visa att summan av tre på varandra följande heltal alltid är delbar med 3.</p><p><em>Exempel:</em> \\(7+8+9=24=3\\cdot 8\\).</p>",
    svar: { facit: "\\(n+(n+1)+(n+2)=3n+3=3(n+1)\\), som är delbart med 3 eftersom \\(n+1\\) är ett heltal." },
    ledtradar: [
      "Kalla det minsta talet \\(n\\). Hur skriver du de två följande talen?",
      "Förenkla summan och försök bryta ut 3."
    ],
    losning: "<ol><li>Låt de tre på varandra följande heltalen vara \\(n\\), \\(n+1\\) och \\(n+2\\), där \\(n\\) är ett heltal.</li><li>Summan blir \\(n+(n+1)+(n+2)=3n+3=3(n+1)\\).</li><li>Eftersom \\(n+1\\) är ett heltal är \\(3(n+1)\\) en multipel av 3.</li></ol><p><strong>Slutsats:</strong> Summan är alltid delbar med 3, vilket skulle visas.</p><p>Alternativt: välj talen \\(n-1\\), \\(n\\), \\(n+1\\) vilket ger summan \\(3n\\).</p><p>Observera att exemplet i uppgiften bara <em>troliggör</em> påståendet – beviset måste gälla alla heltal.</p>",
    bedomning: [
      "+E<sub>R</sub> för att representera tre på varandra följande heltal algebraiskt och ställa upp summan, t.ex. \\(n+(n+1)+(n+2)\\)",
      "+C<sub>R</sub> för fullständigt bevis med förenkling till \\(3(n+1)\\) (eller \\(3n\\)) och en slutsats om delbarhet med 3 för alla heltal"
    ]
  },

  {
    id: "gy-013",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Logik och bevis",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Bevisa att produkten av två udda heltal alltid är udda.</p>",
    svar: { facit: "\\((2m+1)(2n+1)=4mn+2m+2n+1=2(2mn+m+n)+1\\), som är udda eftersom \\(2mn+m+n\\) är ett heltal." },
    ledtradar: [
      "Ett udda tal kan skrivas \\(2m+1\\) där \\(m\\) är ett heltal. Använd <em>olika</em> bokstäver för de två talen – de behöver inte vara lika.",
      "Multiplicera ihop och försök skriva resultatet på formen \\(2\\cdot(\\text{heltal})+1\\)."
    ],
    losning: "<ol><li>Låt de två udda talen vara \\(2m+1\\) och \\(2n+1\\), där \\(m\\) och \\(n\\) är heltal.</li><li>Produkten: \\((2m+1)(2n+1)=4mn+2m+2n+1\\).</li><li>Bryt ut 2 ur de tre första termerna: \\(=2(2mn+m+n)+1\\).</li><li>Eftersom \\(m\\) och \\(n\\) är heltal är \\(k=2mn+m+n\\) också ett heltal, och produkten kan skrivas \\(2k+1\\).</li></ol><p><strong>Slutsats:</strong> Produkten är på formen \\(2k+1\\) och därmed udda, vilket skulle bevisas.</p><p>Vanligt fel: att skriva båda talen som \\(2n+1\\). Då har man bara visat att kvadraten av ett udda tal är udda.</p>",
    bedomning: [
      "+C<sub>R</sub> för att representera två godtyckliga udda tal med olika variabler och korrekt utveckla produkten",
      "+A<sub>R</sub> för fullständigt bevis där produkten skrivs på formen \\(2k+1\\) med motivering att \\(k\\) är ett heltal och en tydlig slutsats"
    ]
  },

  // ===================== LOGARITMER (2b/2c) =====================

  {
    id: "gy-014",
    kurser: ["2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Motivering av logaritmlagarna",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>På formelbladet står logaritmlagen \\[\\lg x+\\lg y=\\lg xy\\qquad (x\\gt 0,\\ y\\gt 0)\\]</p><p>Motivera varför lagen gäller. Utgå från definitionen av logaritm, \\(y=10^x\\Leftrightarrow x=\\lg y\\), och potenslagarna.</p>",
    svar: { facit: "Sätt \\(a=\\lg x\\) och \\(b=\\lg y\\). Då är \\(x=10^a\\) och \\(y=10^b\\), så \\(xy=10^a\\cdot10^b=10^{a+b}\\). Enligt definitionen är \\(\\lg xy=a+b=\\lg x+\\lg y\\)." },
    ledtradar: [
      "Inför beteckningar: \\(a=\\lg x\\) och \\(b=\\lg y\\). Vad betyder det enligt definitionen?",
      "Skriv \\(x\\) och \\(y\\) som tiopotenser och använd \\(10^a\\cdot 10^b=10^{a+b}\\)."
    ],
    losning: "<ol><li>Sätt \\(a=\\lg x\\) och \\(b=\\lg y\\).</li><li>Enligt definitionen av logaritm betyder det att \\(x=10^a\\) och \\(y=10^b\\).</li><li>Då är \\(xy=10^a\\cdot 10^b=10^{a+b}\\) enligt potenslagen \\(a^x a^y=a^{x+y}\\).</li><li>Enligt definitionen igen: eftersom \\(xy=10^{a+b}\\) är \\(\\lg xy=a+b\\).</li><li>Sätt tillbaka: \\(\\lg xy=\\lg x+\\lg y\\).</li></ol><p><strong>Slutsats:</strong> Logaritmlagen följer direkt av definitionen av logaritm och potenslagen för multiplikation.</p><p>Observera: att kontrollera med siffror, t.ex. \\(\\lg 10+\\lg 100=1+2=3=\\lg 1000\\), <em>troliggör</em> lagen men motiverar inte varför den gäller generellt.</p>",
    bedomning: [
      "+C<sub>R</sub> för att med hjälp av definitionen skriva \\(x=10^a\\) och \\(y=10^b\\) (eller motsvarande) och påbörja en generell motivering",
      "+A<sub>R</sub> för fullständig och generell motivering med potenslag och korrekt användning av definitionen till slutsatsen \\(\\lg xy=\\lg x+\\lg y\\)"
    ]
  },

  {
    id: "gy-015",
    kurser: ["2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Motivering av logaritmlagarna",
    niva: "A",
    poang: "0/0/1",
    typ: "val",
    fraga: "<p>Fyra elever ska motivera logaritmlagen \\[\\lg x-\\lg y=\\lg\\frac{x}{y}\\qquad(x\\gt 0,\\ y\\gt 0)\\]</p><p>Vilken elev ger en korrekt och generell motivering?</p>",
    svar: {
      alternativ: [
        "Ali: \\(\\lg 1000-\\lg 10=3-1=2\\) och \\(\\lg\\frac{1000}{10}=\\lg 100=2\\). Det stämmer, alltså gäller lagen.",
        "Bea: Sätt \\(x=10^a\\) och \\(y=10^b\\). Då är \\(\\frac{x}{y}=\\frac{10^a}{10^b}=10^{a-b}\\), så \\(\\lg\\frac{x}{y}=a-b=\\lg x-\\lg y\\).",
        "Cem: \\(\\lg\\) fungerar som en faktor, så \\(\\lg\\frac{x}{y}=\\frac{\\lg x}{\\lg y}\\), och division blir subtraktion.",
        "Dana: Lagen står på formelbladet, därför är den sann."
      ],
      ratt: 1
    },
    ledtradar: [
      "En generell motivering måste gälla för <em>alla</em> positiva \\(x\\) och \\(y\\), inte bara för valda exempel.",
      "Utgå från definitionen \\(y=10^x\\Leftrightarrow x=\\lg y\\) och potenslagen \\(\\frac{a^x}{a^y}=a^{x-y}\\)."
    ],
    losning: "<ul><li><strong>Ali</strong> visar att lagen stämmer i ett exempel. Det <em>troliggör</em> lagen men är ingen generell motivering.</li><li><strong>Bea</strong> skriver godtyckliga positiva tal som tiopotenser (det går alltid, eftersom \\(a=\\lg x\\) och \\(b=\\lg y\\)), använder potenslagen och definitionen av logaritm. Det är en generell motivering.</li><li><strong>Cem</strong> påstår att \\(\\lg\\frac{x}{y}=\\frac{\\lg x}{\\lg y}\\), vilket är fel (t.ex. \\(\\lg\\frac{100}{10}=1\\) men \\(\\frac{\\lg100}{\\lg10}=2\\)).</li><li><strong>Dana</strong> hänvisar bara till en auktoritet; det förklarar inte <em>varför</em> lagen gäller.</li></ul><p><strong>Svar:</strong> Bea</p>"
  },

  {
    id: "gy-016",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Exponentialekvationer och logaritmlagar",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Lös ekvationen \\(4^x=32\\) genom att logaritmera båda leden. Använd sedan logaritmlagarna för att skriva svaret som ett exakt rationellt tal.</p>",
    svar: { facit: "\\(x=\\dfrac{\\lg 32}{\\lg 4}=\\dfrac{5\\lg 2}{2\\lg 2}=\\dfrac{5}{2}\\)" },
    ledtradar: [
      "Logaritmera: \\(\\lg 4^x=\\lg 32\\) och använd \\(\\lg x^p=p\\cdot\\lg x\\).",
      "Skriv \\(32=2^5\\) och \\(4=2^2\\) och använd samma lag igen."
    ],
    losning: "<ol><li>Logaritmera båda leden: \\(\\lg 4^x=\\lg 32\\).</li><li>Logaritmlagen \\(\\lg x^p=p\\lg x\\) ger \\(x\\cdot\\lg 4=\\lg 32\\), dvs. \\(x=\\dfrac{\\lg 32}{\\lg 4}\\).</li><li>Eftersom \\(32=2^5\\) och \\(4=2^2\\) är \\(\\lg 32=5\\lg 2\\) och \\(\\lg 4=2\\lg 2\\).</li><li>\\(x=\\dfrac{5\\lg 2}{2\\lg 2}=\\dfrac{5}{2}\\).</li></ol><p><strong>Kontroll:</strong> \\(4^{5/2}=(\\sqrt{4})^5=2^5=32\\). ✓</p><p><strong>Svar:</strong> \\(x=\\dfrac{5}{2}\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för att logaritmera och korrekt komma fram till \\(x=\\dfrac{\\lg 32}{\\lg 4}\\)",
      "+C<sub>P</sub> för att med logaritmlagar förenkla till det exakta svaret \\(x=\\dfrac{5}{2}\\)"
    ]
  },

  {
    id: "gy-017",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Exponentialekvationer och logaritmlagar",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Lös ekvationen \\[2\\cdot 3^x=5^x\\] Svara exakt, uttryckt med logaritmer.</p>",
    svar: { facit: "\\(x=\\dfrac{\\lg 2}{\\lg 5-\\lg 3}\\) \\(\\left(=\\dfrac{\\lg 2}{\\lg\\frac{5}{3}}\\approx 1{,}36\\right)\\)" },
    ledtradar: [
      "Logaritmera båda leden. Vänsterledet är en produkt – använd \\(\\lg xy=\\lg x+\\lg y\\).",
      "Samla alla termer med \\(x\\) på ena sidan och bryt ut \\(x\\). (Alternativ: dela först båda leden med \\(3^x\\).)"
    ],
    losning: "<ol><li>Logaritmera: \\(\\lg(2\\cdot 3^x)=\\lg 5^x\\).</li><li>Logaritmlagar: \\(\\lg 2+x\\lg 3=x\\lg 5\\).</li><li>Samla \\(x\\)-termer: \\(\\lg 2=x\\lg 5-x\\lg 3=x(\\lg 5-\\lg 3)\\).</li><li>\\(x=\\dfrac{\\lg 2}{\\lg 5-\\lg 3}=\\dfrac{\\lg 2}{\\lg\\frac{5}{3}}\\).</li></ol><p>Alternativ väg: dela med \\(3^x\\): \\(2=\\left(\\frac{5}{3}\\right)^x\\Rightarrow x=\\dfrac{\\lg 2}{\\lg\\frac{5}{3}}\\).</p><p>Närmevärde: \\(x\\approx 1{,}36\\). Kontroll: \\(2\\cdot 3^{1{,}357}\\approx 8{,}86\\) och \\(5^{1{,}357}\\approx 8{,}86\\). ✓</p><p><strong>Svar:</strong> \\(x=\\dfrac{\\lg 2}{\\lg 5-\\lg 3}\\)</p>",
    bedomning: [
      "+C<sub>P</sub> för att logaritmera och korrekt använda logaritmlagarna, t.ex. \\(\\lg 2+x\\lg 3=x\\lg 5\\)",
      "+A<sub>P</sub> för att bryta ut \\(x\\) och ange ett korrekt exakt svar, t.ex. \\(x=\\dfrac{\\lg 2}{\\lg 5-\\lg 3}\\)"
    ]
  },

  // ===================== POTENSER OCH POTENSFUNKTIONER =====================

  {
    id: "gy-018",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Potensekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\(4x^3=108\\).</p>",
    svar: { varde: 3, tolerans: 0 },
    ledtradar: [
      "Börja med att få \\(x^3\\) ensamt.",
      "Vilket tal upphöjt till 3 blir 27?"
    ],
    losning: "<ol><li>Dela båda leden med 4: \\(x^3=27\\).</li><li>Dra tredjeroten (eller upphöj till \\(\\frac13\\)): \\(x=\\sqrt[3]{27}=3\\).</li></ol><p><strong>Kontroll:</strong> \\(4\\cdot 3^3=4\\cdot 27=108\\). ✓</p><p><strong>Svar:</strong> \\(x=3\\)</p><p>En udda exponent ger bara en reell lösning.</p>"
  },

  {
    id: "gy-019",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Potensekvationer",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Lös ekvationerna</p><p><strong>a)</strong> \\(2x^4=32\\)</p><p><strong>b)</strong> \\(5x^{-2}=20\\)</p>",
    svar: { facit: "a) \\(x=\\pm 2\\) &nbsp; b) \\(x=\\pm\\dfrac12\\)" },
    ledtradar: [
      "a) En jämn exponent ger både en positiv och en negativ lösning.",
      "b) \\(x^{-2}=\\dfrac{1}{x^2}\\). Lös först ut \\(x^{-2}\\)."
    ],
    losning: "<p><strong>a)</strong></p><ol><li>\\(x^4=16\\).</li><li>Eftersom exponenten är jämn finns två reella lösningar: \\(x=\\pm\\sqrt[4]{16}=\\pm 2\\).</li></ol><p><strong>b)</strong></p><ol><li>\\(x^{-2}=4\\), dvs. \\(\\dfrac{1}{x^2}=4\\).</li><li>\\(x^2=\\dfrac14\\), så \\(x=\\pm\\dfrac12\\).</li><li>Kontroll: \\(5\\cdot\\left(\\frac12\\right)^{-2}=5\\cdot 4=20\\). ✓ (samma för \\(-\\frac12\\))</li></ol><p><strong>Svar:</strong> a) \\(x=\\pm 2\\) &nbsp; b) \\(x=\\pm\\frac12\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt lösning av a), \\(x_1=2\\) och \\(x_2=-2\\)",
      "+C<sub>P</sub> för korrekt lösning av b), \\(x_1=\\frac12\\) och \\(x_2=-\\frac12\\)"
    ]
  },

  {
    id: "gy-020",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Motivering av potensregler",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilken av följande motiveringar visar varför \\(a^0=1\\) (för \\(a\\neq 0\\))?</p>",
    svar: {
      alternativ: [
        "\\(a^0=a\\cdot 0=0\\), och sedan lägger man till 1.",
        "\\(\\dfrac{a^3}{a^3}=1\\), men enligt potenslagen är också \\(\\dfrac{a^3}{a^3}=a^{3-3}=a^0\\). Alltså måste \\(a^0=1\\).",
        "Det går inte att motivera; det är bara något man måste komma ihåg.",
        "\\(a^0=a^{1-1}=a-1\\), och för små tal är det ungefär 1."
      ],
      ratt: 1
    },
    ledtradar: [
      "Vad blir ett tal (skilt från 0) delat med sig självt?",
      "Använd potenslagen \\(\\dfrac{a^x}{a^y}=a^{x-y}\\) på samma kvot."
    ],
    losning: "<ol><li>Ett tal delat med sig självt är 1: \\(\\dfrac{a^3}{a^3}=1\\).</li><li>Potenslagen för division ger samtidigt \\(\\dfrac{a^3}{a^3}=a^{3-3}=a^0\\).</li><li>För att potenslagen ska gälla även här måste vi ha \\(a^0=1\\).</li></ol><p><strong>Svar:</strong> Alternativet med \\(\\dfrac{a^3}{a^3}\\).</p><p>\\(a^0=1\\) är alltså en definition som är vald så att potenslagarna fortsätter att gälla.</p>"
  },

  {
    id: "gy-021",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Motivering av potensregler",
    niva: "A",
    poang: "1/0/1",
    typ: "redovisning",
    fraga: "<p>Låt \\(a\\gt 0\\).</p><p><strong>a)</strong> Motivera med hjälp av uttrycket \\(\\dfrac{a^3}{a^5}\\) varför \\(a^{-2}=\\dfrac{1}{a^2}\\).</p><p><strong>b)</strong> Motivera varför det är rimligt att definiera \\(a^{\\frac12}=\\sqrt{a}\\).</p>",
    svar: { facit: "a) \\(\\frac{a^3}{a^5}=\\frac{a\\cdot a\\cdot a}{a\\cdot a\\cdot a\\cdot a\\cdot a}=\\frac{1}{a^2}\\) och \\(\\frac{a^3}{a^5}=a^{3-5}=a^{-2}\\). b) \\(\\left(a^{1/2}\\right)^2=a^{\\frac12\\cdot 2}=a\\), och \\(\\sqrt a\\) är det positiva tal vars kvadrat är \\(a\\)." },
    ledtradar: [
      "a) Beräkna kvoten på två sätt: genom att förkorta, och med potenslagen \\(\\frac{a^x}{a^y}=a^{x-y}\\).",
      "b) Vad blir \\(\\left(a^{1/2}\\right)^2\\) om lagen \\((a^x)^y=a^{xy}\\) ska gälla? Vilket tal har samma egenskap?"
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Förkorta: \\(\\dfrac{a^3}{a^5}=\\dfrac{a\\cdot a\\cdot a}{a\\cdot a\\cdot a\\cdot a\\cdot a}=\\dfrac{1}{a\\cdot a}=\\dfrac{1}{a^2}\\).</li><li>Potenslagen: \\(\\dfrac{a^3}{a^5}=a^{3-5}=a^{-2}\\).</li><li>Samma uttryck – alltså måste \\(a^{-2}=\\dfrac{1}{a^2}\\) för att potenslagen ska gälla.</li></ol><p><strong>b)</strong></p><ol><li>Om lagen \\((a^x)^y=a^{xy}\\) ska gälla även för \\(x=\\frac12\\) blir \\(\\left(a^{1/2}\\right)^2=a^{\\frac12\\cdot 2}=a^1=a\\).</li><li>Alltså är \\(a^{1/2}\\) ett tal vars kvadrat är \\(a\\).</li><li>\\(\\sqrt{a}\\) är just det icke-negativa tal vars kvadrat är \\(a\\). Eftersom \\(a\\gt 0\\) och potenser med positiv bas är positiva är det rimligt att definiera \\(a^{1/2}=\\sqrt a\\).</li></ol>",
    bedomning: [
      "+E<sub>R</sub> för korrekt motivering i a) där kvoten beräknas både genom förkortning och med potenslagen",
      "+A<sub>R</sub> för korrekt och generell motivering i b) med potenslagen \\((a^x)^y=a^{xy}\\) och koppling till definitionen av \\(\\sqrt a\\)"
    ]
  },

  {
    id: "gy-022",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Funktioner",
    moment: "Potensfunktioner",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Ett däggdjurs energibehov i vila kan uppskattas med Kleibers lag, som är en potensfunktion: \\[P=70\\cdot m^{0{,}75}\\] där \\(P\\) är energibehovet i kcal per dygn och \\(m\\) är djurets massa i kg.</p><p>Beräkna energibehovet för en häst som väger 500 kg. Avrunda till hundratal kcal.</p>",
    svar: { varde: 7400, tolerans: 5, enhet: "kcal/dygn" },
    ledtradar: [
      "Sätt in \\(m=500\\) i formeln.",
      "Med räknare/GeoGebra: <code>70*500^0.75</code>."
    ],
    losning: "<ol><li>\\(P=70\\cdot 500^{0{,}75}\\).</li><li>I GeoGebra eller på räknaren: <code>70*500^0.75</code> \\(\\approx 7402\\).</li></ol><p><strong>Svar:</strong> ca 7 400 kcal per dygn</p><p>Funktionen är en potensfunktion \\(y=C\\cdot x^a\\) med \\(C=70\\) och \\(a=0{,}75\\). Eftersom \\(0\\lt a\\lt 1\\) växer energibehovet långsammare än massan.</p>"
  },

  {
    id: "gy-023",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Funktioner",
    moment: "Potensfunktioner och potensekvationer",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Kleibers lag \\(P=70\\cdot m^{0{,}75}\\) beskriver ett däggdjurs energibehov \\(P\\) kcal per dygn som funktion av massan \\(m\\) kg.</p><p>Ett djur har energibehovet 3 000 kcal per dygn. Hur mycket väger djuret enligt modellen? Svara i hela kg.</p>",
    svar: { varde: 150, tolerans: 1, enhet: "kg" },
    ledtradar: [
      "Ställ upp potensekvationen \\(70\\cdot m^{0{,}75}=3000\\).",
      "Lös grafiskt eller med <code>Lös</code>. Algebraiskt: lös ut \\(m^{0{,}75}\\) och upphöj båda leden till \\(\\frac{1}{0{,}75}\\)."
    ],
    losning: "<ol><li>Ekvation: \\(70\\cdot m^{0{,}75}=3000\\).</li><li>GeoGebra CAS: <code>NLös(70 m^0.75 = 3000, m)</code> ger \\(m\\approx 150\\). Grafiskt: rita \\(f(x)=70x^{0.75}\\) och \\(y=3000\\) och använd <code>Skärning</code>.</li><li>Algebraiskt: \\(m^{0{,}75}=\\dfrac{3000}{70}\\Rightarrow m=\\left(\\dfrac{3000}{70}\\right)^{1/0{,}75}=\\left(\\dfrac{3000}{70}\\right)^{4/3}\\approx 150\\).</li><li>Kontroll: \\(70\\cdot 150^{0{,}75}\\approx 3000\\). ✓</li></ol><p><strong>Svar:</strong> ca 150 kg</p>"
  },

  {
    id: "gy-024",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Exponential- och potensekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilken av ekvationerna är en <strong>potensekvation</strong>?</p>",
    svar: {
      alternativ: ["\\(5^x=200\\)", "\\(x^5=200\\)", "\\(5\\cdot 2^x=200\\)", "\\(200\\cdot 1{,}05^x=500\\)"],
      ratt: 1
    },
    ledtradar: [
      "I en potensekvation är det basen som är okänd. I en exponentialekvation är det exponenten.",
      "Var står \\(x\\) i varje ekvation – i basen eller i exponenten?"
    ],
    losning: "<ul><li>\\(x^5=200\\): den okända står i <em>basen</em> och exponenten är ett känt tal – en potensekvation.</li><li>\\(5^x=200\\), \\(5\\cdot 2^x=200\\) och \\(200\\cdot 1{,}05^x=500\\): den okända står i <em>exponenten</em> – exponentialekvationer.</li></ul><p><strong>Svar:</strong> \\(x^5=200\\)</p>"
  },

  {
    id: "gy-025",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Exponential- och potensekvationer",
    niva: "C",
    poang: "2/1/0",
    typ: "redovisning",
    fraga: "<p><strong>a)</strong> Lös ekvationen \\(x^2=100\\).</p><p><strong>b)</strong> Lös ekvationen \\(2^x=100\\). Ange ett exakt svar och ett närmevärde med två decimaler. Du får använda att \\(\\lg 2\\approx 0{,}301\\).</p><p><strong>c)</strong> Beskriv en likhet och en skillnad mellan ekvationerna i a) och b), både vad gäller hur de ser ut och hur man löser dem.</p>",
    svar: { facit: "a) \\(x=\\pm 10\\) &nbsp; b) \\(x=\\dfrac{2}{\\lg 2}\\approx 6{,}64\\) &nbsp; c) T.ex. båda innehåller en potens med baserna/exponenterna 2; i a) är basen okänd (lös med rotutdragning, två lösningar), i b) är exponenten okänd (lös med logaritmer, en lösning)." },
    ledtradar: [
      "a) Glöm inte den negativa lösningen.",
      "b) Logaritmera: \\(x\\lg 2=\\lg 100=2\\).",
      "c) Var står den okända i respektive ekvation? Hur många lösningar fick du?"
    ],
    losning: "<p><strong>a)</strong> \\(x=\\pm\\sqrt{100}=\\pm 10\\).</p><p><strong>b)</strong></p><ol><li>Logaritmera: \\(\\lg 2^x=\\lg 100\\Rightarrow x\\lg 2=2\\).</li><li>\\(x=\\dfrac{2}{\\lg 2}\\approx\\dfrac{2}{0{,}301}\\approx 6{,}64\\).</li><li>Rimlighet: \\(2^6=64\\) och \\(2^7=128\\), så \\(x\\) ska ligga mellan 6 och 7. ✓</li></ol><p><strong>c)</strong> Exempel på svar:</p><ul><li><em>Likhet:</em> Båda ekvationerna innehåller en potens som ska vara lika med 100, och båda kan lösas grafiskt som skärning mellan en kurva och linjen \\(y=100\\).</li><li><em>Skillnad:</em> I a) är <em>basen</em> okänd (potensekvation) och löses genom rotutdragning – den har två lösningar eftersom exponenten är jämn. I b) är <em>exponenten</em> okänd (exponentialekvation) och löses med logaritmer – den har exakt en lösning.</li></ul>",
    bedomning: [
      "+E<sub>P</sub> för korrekt lösning av a), \\(x=\\pm 10\\)",
      "+E<sub>P</sub> för korrekt lösning av b) med exakt svar \\(x=\\frac{2}{\\lg 2}\\) (eller \\(\\frac{\\lg 100}{\\lg 2}\\)) och närmevärde \\(6{,}64\\)",
      "+C<sub>R</sub> för en korrekt beskriven likhet och skillnad som berör både var den okända står och lösningsmetod (eller antal lösningar)"
    ]
  },

  // ===================== PERCENTILER =====================

  {
    id: "gy-026",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Percentiler",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Lisa gör ett nationellt prov i engelska. Hennes resultat ligger på den 80:e percentilen.</p><p>Vad betyder det?</p>",
    svar: {
      alternativ: [
        "Lisa hade 80 % av uppgifterna rätt.",
        "Ungefär 80 % av de som gjorde provet fick ett lägre (eller lika) resultat än Lisa.",
        "Ungefär 80 % av de som gjorde provet fick ett bättre resultat än Lisa.",
        "Lisa kom på plats 80 av alla som skrev provet."
      ],
      ratt: 1
    },
    ledtradar: [
      "En percentil delar in ett ordnat datamaterial i hundradelar.",
      "Den 50:e percentilen är medianen. Vad betyder det att ligga på den 80:e?"
    ],
    losning: "<p>Den \\(p\\):e percentilen är det värde som ungefär \\(p\\) % av observationerna är mindre än eller lika med.</p><p>Att Lisa ligger på den 80:e percentilen betyder alltså att ungefär 80 % fick samma eller lägre resultat, och ungefär 20 % fick bättre resultat.</p><p><strong>Svar:</strong> Ungefär 80 % fick ett lägre (eller lika) resultat än Lisa.</p>"
  },

  {
    id: "gy-027",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Percentiler i lådagram",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lådagrammet visar resultaten på ett prov för 120 elever.</p><p>Vilket poängtal motsvarar den 75:e percentilen?</p>",
    figur: "<svg viewBox='0 0 360 120' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' font-family='sans-serif' font-size='12'><path d='M30 90H330' stroke-width='1.2'/><g stroke-width='1'><path d='M30 86V94M90 86V94M150 86V94M210 86V94M270 86V94M330 86V94'/><path d='M60 88V92M120 88V92M180 88V92M240 88V92M300 88V92'/></g><g fill='currentColor' stroke='none' text-anchor='middle'><text x='30' y='108'>0</text><text x='90' y='108'>10</text><text x='150' y='108'>20</text><text x='210' y='108'>30</text><text x='270' y='108'>40</text><text x='330' y='108'>50</text><text x='180' y='16'>Poäng</text></g><g stroke-width='2'><path d='M78 45H138M234 45H306'/><path d='M78 35V55M306 35V55'/><rect x='138' y='25' width='96' height='40'/><path d='M186 25V65'/></g></svg>",
    svar: { varde: 34, tolerans: 0, enhet: "poäng" },
    ledtradar: [
      "Ett lådagram visar minsta värde, nedre kvartil, median, övre kvartil och största värde.",
      "Den 25:e percentilen är nedre kvartilen och den 50:e är medianen. Vilken del av lådan motsvarar den 75:e?"
    ],
    losning: "<ol><li>Den 75:e percentilen är det värde som 75 % av resultaten är mindre än eller lika med – det är den <em>övre kvartilen</em>.</li><li>Den övre kvartilen är lådans högra kant, som ligger vid 34 poäng.</li></ol><p>(Diagrammet: min 8, nedre kvartil 18, median 26, övre kvartil 34, max 46.)</p><p><strong>Svar:</strong> 34 poäng</p>"
  },

  {
    id: "gy-028",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Percentiler i tillväxtkurvor",
    niva: "E",
    poang: "2/0/0",
    typ: "redovisning",
    fraga: "<p>På barnavårdscentralen används tillväxtkurvor. För ettåriga flickor gäller i en viss tillväxtkurva:</p><table style='margin:auto;border-collapse:collapse'><tr><th style='padding:2px 10px'>Percentil</th><td style='padding:2px 10px'>3:e</td><td style='padding:2px 10px'>50:e</td><td style='padding:2px 10px'>97:e</td></tr><tr><th style='padding:2px 10px'>Vikt (kg)</th><td style='padding:2px 10px'>8,0</td><td style='padding:2px 10px'>9,5</td><td style='padding:2px 10px'>11,6</td></tr></table><p><strong>a)</strong> Ettåriga Elsa väger 11,6 kg. Förklara vad det innebär i förhållande till andra ettåriga flickor.</p><p><strong>b)</strong> Ungefär hur många av 2 000 ettåriga flickor kan förväntas väga mellan 8,0 kg och 11,6 kg?</p>",
    svar: { facit: "a) Ungefär 97 % av ettåriga flickor väger 11,6 kg eller mindre, ca 3 % väger mer. &nbsp; b) ca 1 880 flickor" },
    ledtradar: [
      "a) Den \\(p\\):e percentilen är det värde som \\(p\\) % av observationerna understiger (eller är lika med).",
      "b) Hur stor andel ligger mellan den 3:e och den 97:e percentilen?"
    ],
    losning: "<p><strong>a)</strong> Elsa ligger på den 97:e percentilen. Det betyder att ungefär 97 % av ettåriga flickor väger lika mycket eller mindre än Elsa, och bara ungefär 3 % väger mer. Hon är alltså tung för sin ålder (men det behöver inte betyda att något är fel).</p><p><strong>b)</strong></p><ol><li>Mellan den 3:e och den 97:e percentilen ligger \\(97\\,\\%-3\\,\\%=94\\,\\%\\) av flickorna.</li><li>\\(0{,}94\\cdot 2000=1880\\).</li></ol><p><strong>Svar:</strong> b) ca 1 880 flickor</p>",
    bedomning: [
      "+E<sub>B</sub> för korrekt tolkning av den 97:e percentilen i a)",
      "+E<sub>P</sub> för korrekt svar i b), ca 1 880 flickor"
    ]
  },

  {
    id: "gy-029",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Percentiler och normalfördelning",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Resultaten på ett begåvningstest är normalfördelade med medelvärdet 100 och standardavvikelsen 15.</p><p>Vilket resultat motsvarar den 90:e percentilen? Svara med en decimal.</p>",
    svar: { varde: 119.2, tolerans: 0.15 },
    ledtradar: [
      "Den 90:e percentilen är det värde som 90 % av resultaten understiger.",
      "I GeoGebra: <code>InversNormal(100, 15, 0.9)</code>, eller använd sannolikhetskalkylatorn."
    ],
    losning: "<ol><li>Vi söker \\(x\\) så att andelen resultat under \\(x\\) är \\(0{,}90\\).</li><li>GeoGebra: <code>InversNormal(100, 15, 0.9)</code> ger \\(x\\approx 119{,}2\\). (Sannolikhetskalkylatorn: välj Normal, \\(\\mu=100\\), \\(\\sigma=15\\), vänstersidigt, ange sannolikheten 0,9.)</li><li>Rimlighet: \\(\\mu+\\sigma=115\\) motsvarar ca 84:e percentilen, och \\(\\mu+2\\sigma=130\\) ca 97,7:e, så svaret ska ligga mellan 115 och 130. ✓</li></ol><p><strong>Svar:</strong> ca \\(119{,}2\\)</p>"
  },

  // ===================== NORMALFÖRDELNING =====================

  {
    id: "gy-030",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En maskin fyller burkar med kaffe. Vikten av innehållet är normalfördelad med medelvärdet 500 g och standardavvikelsen 4 g.</p><p>Ungefär hur många procent av burkarna innehåller mellan 492 g och 508 g kaffe?</p>",
    svar: { varde: 95, tolerans: 0.5, enhet: "%" },
    ledtradar: [
      "Hur många standardavvikelser från medelvärdet ligger 492 g och 508 g?",
      "Använd figuren över normalfördelningen på formelbladet: ca 68 % inom en standardavvikelse, ca 95 % inom två."
    ],
    losning: "<ol><li>\\(508-500=8=2\\cdot 4\\) och \\(500-492=8=2\\cdot 4\\). Intervallet är alltså \\(\\mu\\pm 2\\sigma\\).</li><li>I en normalfördelning ligger ca 95 % av värdena inom två standardavvikelser från medelvärdet (\\(2\\cdot(34{,}1+13{,}6)\\,\\%\\approx 95\\,\\%\\)).</li></ol><p><strong>Svar:</strong> ca 95 %</p>"
  },

  {
    id: "gy-031",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning och percentiler",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Längden hos 18-åriga män i ett land är normalfördelad med medelvärdet 180 cm och standardavvikelsen 7 cm.</p><p>Vilken längd motsvarar ungefär den 84:e percentilen?</p>",
    svar: { varde: 187, tolerans: 0.5, enhet: "cm" },
    ledtradar: [
      "Hur stor andel av värdena ligger under medelvärdet? Hur stor andel ligger mellan \\(\\mu\\) och \\(\\mu+\\sigma\\)?",
      "\\(50\\,\\%+34\\,\\%=84\\,\\%\\)."
    ],
    losning: "<ol><li>I en normalfördelning ligger 50 % av värdena under medelvärdet.</li><li>Ungefär 34 % ligger mellan \\(\\mu\\) och \\(\\mu+\\sigma\\).</li><li>Alltså ligger ca \\(50+34=84\\) % under \\(\\mu+\\sigma=180+7=187\\) cm.</li></ol><p><strong>Svar:</strong> ca 187 cm</p>"
  },

  {
    id: "gy-032",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning med digitala verktyg",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Vikten av ägg från en hönsgård är normalfördelad med medelvärdet 62 g och standardavvikelsen 5 g. Ägg som väger mer än 70 g sorteras som storleken XL.</p><p>Hur många procent av äggen sorteras som XL? Svara med en decimal.</p>",
    svar: { varde: 5.5, tolerans: 0.1, enhet: "%" },
    ledtradar: [
      "Du söker andelen ägg med vikt större än 70 g, dvs. arean till höger om 70 under normalfördelningskurvan.",
      "I GeoGebra ger <code>Normal(62, 5, 70)</code> andelen <em>under</em> 70 g."
    ],
    losning: "<ol><li>GeoGebra: <code>Normal(62, 5, 70)</code> \\(\\approx 0{,}9452\\) är andelen ägg som väger högst 70 g.</li><li>Andelen som väger mer: \\(1-0{,}9452=0{,}0548\\).</li><li>Alternativt i sannolikhetskalkylatorn: Normal, \\(\\mu=62\\), \\(\\sigma=5\\), högersidigt \\(P(70\\le X)\\approx 0{,}0548\\).</li><li>Rimlighet: 70 g ligger \\(1{,}6\\) standardavvikelser över medelvärdet, och andelen över \\(\\mu+2\\sigma\\) är ca 2,3 %, över \\(\\mu+\\sigma\\) ca 16 %. ✓</li></ol><p><strong>Svar:</strong> ca 5,5 %</p>"
  },

  // ===================== PROGRAMMERING (2c) =====================

  {
    id: "gy-033",
    kurser: ["2c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Programmering",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Vilket tal skrivs ut när följande Python-program körs?</p><pre><code>s = 0\nfor k in range(1, 6):\n    s = s + k**2\nprint(s)</code></pre>",
    svar: { varde: 55, tolerans: 0 },
    ledtradar: [
      "<code>range(1, 6)</code> ger talen 1, 2, 3, 4, 5 (slutvärdet 6 kommer inte med). <code>k**2</code> betyder \\(k^2\\).",
      "Gör en tabell: värdet på <code>k</code> och värdet på <code>s</code> efter varje varv."
    ],
    losning: "<ol><li>Loopen går för \\(k=1,2,3,4,5\\) och lägger varje gång till \\(k^2\\) till <code>s</code>.</li><li>\\(s=1+4+9+16+25=55\\).</li></ol><table style='border-collapse:collapse'><tr><th style='padding:2px 8px'>k</th><td style='padding:2px 8px'>1</td><td style='padding:2px 8px'>2</td><td style='padding:2px 8px'>3</td><td style='padding:2px 8px'>4</td><td style='padding:2px 8px'>5</td></tr><tr><th style='padding:2px 8px'>s</th><td style='padding:2px 8px'>1</td><td style='padding:2px 8px'>5</td><td style='padding:2px 8px'>14</td><td style='padding:2px 8px'>30</td><td style='padding:2px 8px'>55</td></tr></table><p><strong>Svar:</strong> 55</p><p>Vanligt fel: att tro att <code>range(1, 6)</code> även ger 6, vilket skulle ge 91.</p>"
  },

  {
    id: "gy-034",
    kurser: ["2c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Programmering",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Ett läkemedel bryts ned i kroppen så att mängden minskar med 20 % per timme. Programmet nedan används för att undersöka förloppet när man börjar med 1000 mg.</p><pre><code>x = 1000\nn = 0\nwhile x &gt; 500:\n    x = x * 0.8\n    n = n + 1\nprint(n)</code></pre><p>Vilket tal skrivs ut?</p>",
    svar: { varde: 4, tolerans: 0 },
    ledtradar: [
      "Loopen fortsätter så länge <code>x</code> är större än 500. Varje varv multipliceras <code>x</code> med 0,8 och <code>n</code> ökar med 1.",
      "Räkna ut <code>x</code> efter varje varv: 800, 640, …"
    ],
    losning: "<ol><li>Start: \\(x=1000\\), \\(n=0\\).</li><li>Varv 1: \\(x=800\\), \\(n=1\\). Varv 2: \\(x=640\\), \\(n=2\\). Varv 3: \\(x=512\\), \\(n=3\\).</li><li>\\(512\\gt 500\\), så loopen körs igen. Varv 4: \\(x=409{,}6\\), \\(n=4\\).</li><li>Nu är \\(x\\gt 500\\) falskt och loopen avslutas. Programmet skriver ut 4.</li></ol><p><strong>Svar:</strong> 4</p><p>Tolkning: efter 4 hela timmar har mängden för första gången sjunkit under hälften. Programmet söker alltså (avrundat uppåt till hela timmar) lösningen till \\(1000\\cdot 0{,}8^n\\lt 500\\).</p>"
  },

  {
    id: "gy-035",
    kurser: ["2c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Programmering",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En bonde har mellan 500 och 1000 ägg. Om hon packar dem i grupper om 2, 3, 4, 5 eller 6 blir det alltid exakt ett ägg över. Om hon packar dem i grupper om 7 går det jämnt ut.</p><p>Rasmus skriver ett program som prövar alla möjliga antal, men han har inte skrivit klart villkoret för sjuor:</p><pre><code>for n in range(500, 1001):\n    if n % 2 == 1 and n % 3 == 1 and n % 4 == 1 and n % 5 == 1 and n % 6 == 1 and ______:\n        print(n)</code></pre><p>(<code>n % 7</code> ger resten när <code>n</code> divideras med 7.)</p><p>Komplettera programmet och kör det, eller lös problemet på annat sätt. Hur många ägg har bonden?</p>",
    svar: { varde: 721, tolerans: 0, enhet: "ägg" },
    ledtradar: [
      "\"Går jämnt ut i grupper om 7\" betyder att resten vid division med 7 är 0.",
      "Villkoret blir <code>n % 7 == 0</code>. Utan programmering: antalet minus 1 måste vara delbart med 60 (minsta gemensamma multipel av 2, 3, 4, 5, 6)."
    ],
    losning: "<ol><li>Det saknade villkoret är <code>n % 7 == 0</code>.</li><li>Det kompletta programmet skriver ut ett enda tal: <code>721</code>.</li><li>Kontroll utan dator: talet ska vara \\(60k+1\\) (eftersom MGM\\((2,3,4,5,6)=60\\)). Mellan 500 och 1000 ger det 541, 601, 661, 721, 781, 841, 901, 961. Endast \\(721=7\\cdot 103\\) är delbart med 7.</li></ol><p><strong>Svar:</strong> 721 ägg</p><p>Programmeringen används här som en strategi: systematisk prövning av alla möjliga fall.</p>"
  },

  {
    id: "gy-036",
    kurser: ["2c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Programmering – simulering",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Hur stor är sannolikheten att få minst en sexa när man kastar en vanlig tärning fyra gånger? Saga vill undersöka detta med en simulering och skriver programmet nedan. Ett villkor saknas.</p><pre><code>import random\nantal = 100000\nlyckade = 0\nfor i in range(antal):\n    sexor = 0\n    for kast in range(4):\n        if random.randint(1, 6) == 6:\n            sexor = sexor + 1\n    if ______:\n        lyckade = lyckade + 1\nprint(lyckade / antal)</code></pre><p><strong>a)</strong> Vilket villkor ska stå på den tomma raden? Kör gärna programmet och ange vilket ungefärligt resultat det ger.</p><p><strong>b)</strong> Beräkna den exakta sannolikheten och jämför med simuleringen. Förklara varför programmet inte ger exakt samma värde varje gång det körs.</p>",
    svar: { facit: "a) <code>sexor &gt;= 1</code> (eller <code>sexor &gt; 0</code>); resultat ca 0,52 &nbsp; b) \\(1-\\left(\\frac56\\right)^4\\approx 0{,}518\\). Simuleringen bygger på slumptal, så resultatet varierar något mellan körningar." },
    ledtradar: [
      "a) Variabeln <code>sexor</code> räknar antalet sexor i de fyra kasten. När räknas försöket som lyckat?",
      "b) Använd komplementhändelsen: sannolikheten att <em>ingen</em> av de fyra kasten blir en sexa är \\(\\left(\\frac56\\right)^4\\)."
    ],
    losning: "<p><strong>a)</strong> Försöket är lyckat om minst en sexa kom, alltså villkoret <code>sexor &gt;= 1</code> (eller <code>sexor &gt; 0</code>). Tre körningar gav t.ex. 0,5199, 0,5196 och 0,5174 – alltså ca 0,52.</p><p><strong>b)</strong></p><ol><li>Sannolikheten för ingen sexa på ett kast är \\(\\frac56\\), och på fyra oberoende kast \\(\\left(\\frac56\\right)^4=\\frac{625}{1296}\\approx 0{,}482\\).</li><li>P(minst en sexa) \\(=1-\\frac{625}{1296}=\\frac{671}{1296}\\approx 0{,}518\\).</li><li>Simuleringen ger värden mycket nära 0,518. Den ger inte exakt samma värde varje gång eftersom tärningskasten är slumpmässiga; med 100 000 försök blir avvikelsen oftast bara någon tusendel. Fler försök ger i regel ett säkrare resultat.</li></ol>",
    bedomning: [
      "+C<sub>PL</sub> för korrekt villkor, t.ex. <code>sexor &gt;= 1</code>, och ett rimligt resultat av simuleringen (ca 0,52)",
      "+A<sub>R</sub> för korrekt exakt sannolikhet \\(1-\\left(\\frac56\\right)^4\\approx 0{,}518\\) samt en jämförelse med simuleringen och en godtagbar förklaring till att resultatet varierar mellan körningar"
    ]
  },

  // ===================== KRITISK GRANSKNING OCH MODELLER =====================

  {
    id: "gy-037",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Kritisk granskning av påståenden",
    niva: "E",
    poang: "2/0/0",
    typ: "redovisning",
    fraga: "<p>En lokaltidning skriver:</p><p style='margin-left:1.5em'><em>\"Andelen av kommunens resor som görs med kollektivtrafik ökade från 20 % till 25 % på fem år. Det är en ökning med 5 %.\"</em></p><p>Granska påståendet. Är det korrekt? Hur stor var ökningen i procent?</p>",
    svar: { facit: "Påståendet är fel formulerat: andelen ökade med 5 <em>procentenheter</em>, vilket är en ökning med 25 %." },
    ledtradar: [
      "Vad är skillnaden mellan procentenheter och procent?",
      "Den procentuella ökningen är \\(\\dfrac{\\text{förändring}}{\\text{ursprungligt värde}}\\)."
    ],
    losning: "<ol><li>Andelen ökade från 20 % till 25 %, dvs. med \\(25-20=5\\) <em>procentenheter</em>.</li><li>Den procentuella ökningen: \\(\\dfrac{5}{20}=0{,}25=25\\,\\%\\).</li></ol><p><strong>Slutsats:</strong> Tidningens påstående är felaktigt. Det korrekta är att andelen ökade med 5 procentenheter, vilket motsvarar en ökning med 25 %. Tidningen underskattar alltså ökningen kraftigt.</p>",
    bedomning: [
      "+E<sub>R</sub> för att konstatera att ökningen är 5 procentenheter och att påståendet därför inte är korrekt",
      "+E<sub>P</sub> för korrekt beräknad procentuell ökning, 25 %"
    ]
  },

  {
    id: "gy-038",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Matematiska modeller – hållbar utveckling",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>En kommuns utsläpp av koldioxid var 120 000 ton år 2020 och 100 000 ton år 2025. Kommunen jämför två modeller för den fortsatta utvecklingen, där \\(t\\) är antalet år efter 2020:</p><ul><li><strong>Modell L</strong> (linjär): utsläppen minskar med lika många ton varje år.</li><li><strong>Modell E</strong> (exponentiell): \\(U=120\\,000\\cdot\\left(\\frac{5}{6}\\right)^{t/5}\\), dvs. utsläppen minskar med lika många procent varje år.</li></ul><p><strong>a)</strong> Vilket år blir utsläppen noll enligt modell L?</p><p><strong>b)</strong> Hur stora blir utsläppen år 2050 enligt modell E?</p><p><strong>c)</strong> Kommunen har som mål att utsläppen ska vara nära noll år 2050. Värdera de två modellernas egenskaper och begränsningar i förhållande till målet.</p>",
    svar: { facit: "a) År 2050 &nbsp; b) ca 40 000 ton &nbsp; c) T.ex.: L når noll 2050 men ger negativa (orimliga) utsläpp därefter; E når aldrig noll och visar att samma procentuella takt inte räcker för målet. Ingen av modellerna kan förutsäga politiska beslut eller teknikskiften." },
    ledtradar: [
      "a) Minskningen var 20 000 ton på 5 år. Hur många ton per år blir det, och hur många år tar det att minska 120 000 ton?",
      "b) 2050 betyder \\(t=30\\), så exponenten blir \\(\\frac{30}{5}=6\\).",
      "c) Vad händer med modell L efter nollpunkten? Kan modell E någonsin bli noll? Vilka antaganden bygger modellerna på?"
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Minskning: \\(\\dfrac{120\\,000-100\\,000}{5}=4000\\) ton per år, så \\(U=120\\,000-4000t\\).</li><li>\\(U=0\\) ger \\(t=\\dfrac{120\\,000}{4000}=30\\), dvs. år \\(2020+30=2050\\).</li></ol><p><strong>b)</strong></p><ol><li>\\(t=30\\): \\(U=120\\,000\\cdot\\left(\\frac56\\right)^6\\).</li><li>\\(\\left(\\frac56\\right)^6\\approx 0{,}335\\), så \\(U\\approx 120\\,000\\cdot 0{,}335\\approx 40\\,000\\) ton.</li></ol><p><strong>c)</strong> Exempel på värdering:</p><ul><li>Modell L förutsäger att målet nås exakt 2050. Men modellen ger negativa utsläpp efter 2050, vilket är orimligt – den kan bara gälla för \\(0\\le t\\le 30\\). Den förutsätter också att det är lika lätt att minska de sista tonnen som de första, vilket ofta inte stämmer.</li><li>Modell E blir aldrig noll, och år 2050 är utsläppen fortfarande ca en tredjedel av 2020 års nivå. Om utvecklingen följer E nås inte målet; minskningstakten måste i så fall öka.</li><li>Båda modellerna bygger på bara två mätvärden, så det går inte att avgöra vilken som passar bäst. Ingen av dem tar hänsyn till nya beslut, teknik eller ekonomiska förändringar.</li></ul>",
    bedomning: [
      "+E<sub>M</sub> för korrekt svar i a), år 2050",
      "+C<sub>M</sub> för korrekt svar i b), ca 40 000 ton",
      "+A<sub>R</sub> för en välgrundad värdering i c) som jämför båda modellerna, t.ex. att L ger negativa värden efter 2050 och att E aldrig når noll, och relaterar detta till målet"
    ]
  },

  {
    id: "gy-039",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Kritisk granskning – energi",
    niva: "E",
    poang: "2/0/0",
    typ: "redovisning",
    fraga: "<p>En villaägare får följande råd av en säljare:</p><p style='margin-left:1.5em'><em>\"Med vår nya värmepump minskar energiförbrukningen för uppvärmning med 30 %. Om ni dessutom tilläggsisolerar vinden minskar förbrukningen med ytterligare 20 %. Totalt sparar ni alltså 50 %.\"</em></p><p>Anta att båda procentsatserna stämmer var för sig och att isoleringens minskning räknas på förbrukningen efter att värmepumpen installerats. Granska säljarens påstående. Hur stor blir den totala minskningen?</p>",
    svar: { facit: "Påståendet är fel. Förändringsfaktorn blir \\(0{,}70\\cdot 0{,}80=0{,}56\\), dvs. en minskning med 44 %." },
    ledtradar: [
      "Procentuella förändringar i följd ska multipliceras med förändringsfaktorer, inte adderas.",
      "Pröva med ett tal, t.ex. 20 000 kWh per år."
    ],
    losning: "<ol><li>Förändringsfaktor för värmepumpen: \\(1-0{,}30=0{,}70\\). För isoleringen: \\(1-0{,}20=0{,}80\\).</li><li>Total förändringsfaktor: \\(0{,}70\\cdot 0{,}80=0{,}56\\).</li><li>Förbrukningen blir 56 % av den ursprungliga, dvs. minskningen är \\(100\\,\\%-56\\,\\%=44\\,\\%\\).</li><li>Exempel: 20 000 kWh \\(\\to\\) 14 000 kWh \\(\\to\\) 11 200 kWh. Minskningen är 8 800 kWh, vilket är 44 % av 20 000 kWh.</li></ol><p><strong>Slutsats:</strong> Säljarens påstående är fel. De 20 % räknas på en mindre förbrukning, så den totala minskningen blir 44 %, inte 50 %.</p>",
    bedomning: [
      "+E<sub>R</sub> för att visa att procentsatserna inte kan adderas, t.ex. med förändringsfaktorer eller ett räkneexempel",
      "+E<sub>P</sub> för korrekt total minskning, 44 %"
    ]
  },

  {
    id: "gy-040",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Matematiska modellers begränsningar",
    niva: "A",
    poang: "1/0/1",
    typ: "redovisning",
    fraga: "<p>Anta att antalet elbilar i ett land var 150 000 år 2020 och att antalet sedan dess har ökat med 35 % per år. En analytiker använder modellen \\[N(t)=150\\,000\\cdot 1{,}35^t\\] där \\(N\\) är antalet elbilar \\(t\\) år efter 2020. Det totala antalet personbilar i landet är ungefär 5 miljoner och har varit stabilt länge.</p><p><strong>a)</strong> Efter hur många år skulle antalet elbilar enligt modellen vara lika stort som det totala antalet personbilar?</p><p><strong>b)</strong> Värdera modellens giltighet på lång sikt och beskriv hur en mer realistisk modell skulle kunna se ut.</p>",
    svar: { facit: "a) ca 11,7 år (omkring år 2032) &nbsp; b) Modellen kan inte gälla på lång sikt: antalet elbilar kan inte överstiga det totala antalet bilar, så ökningstakten måste avta. En realistisk modell planar ut mot ett tak (ca 5 miljoner)." },
    ledtradar: [
      "a) Lös ekvationen \\(150\\,000\\cdot 1{,}35^t=5\\,000\\,000\\) grafiskt eller med <code>Lös</code>.",
      "b) Vad händer med \\(N(t)\\) om \\(t\\) fortsätter att öka? Finns det ett naturligt tak?"
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Ekvation: \\(150\\,000\\cdot 1{,}35^t=5\\,000\\,000\\).</li><li>GeoGebra: rita \\(f(x)=150000\\cdot 1.35^x\\) och \\(g(x)=5000000\\), använd <code>Skärning(f, g)</code>, eller CAS: <code>NLös(150000*1.35^t = 5000000, t)</code>. Det ger \\(t\\approx 11{,}7\\).</li></ol><p><strong>Svar a):</strong> efter ca 11,7 år, dvs. omkring år 2032.</p><p><strong>b)</strong> Exempel på värdering:</p><ul><li>Enligt modellen fortsätter antalet elbilar att öka obegränsat; efter 15 år skulle det vara drygt 12 miljoner, vilket är fler än alla bilar i landet. Modellen kan alltså högst gälla för de första åren.</li><li>I verkligheten byts bilar ut successivt och nästan alla bilar kan inte vara nya elbilar samtidigt. Ökningstakten måste därför avta när andelen elbilar blir stor.</li><li>En mer realistisk modell växer ungefär exponentiellt i början men planar sedan ut mot ett tak på högst ca 5 miljoner (en s-formad kurva). Även politiska beslut, priser och laddinfrastruktur påverkar utvecklingen.</li></ul>",
    bedomning: [
      "+E<sub>P</sub> för korrekt lösning av a), ca 11,7 år",
      "+A<sub>R</sub> för en välgrundad värdering i b) där det framgår att modellen inte kan gälla eftersom antalet begränsas av det totala antalet bilar, samt en beskrivning av en rimligare modell som planar ut"
    ]
  },

  {
    id: "gy-041",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Matematiska modellers begränsningar",
    niva: "E",
    poang: "2/0/0",
    typ: "redovisning",
    fraga: "<p>En glaciär var 2 000 m lång år 2000. Mätningar visar att den sedan dess har blivit ungefär 25 m kortare varje år. En forskare beskriver glaciärens längd \\(L\\) meter med modellen \\[L=2000-25t\\] där \\(t\\) är antalet år efter 2000.</p><p><strong>a)</strong> Vilket år är glaciären helt borta enligt modellen?</p><p><strong>b)</strong> Ge ett skäl till att modellen kanske inte ger en korrekt förutsägelse för glaciärens längd långt fram i tiden.</p>",
    svar: { facit: "a) År 2080 &nbsp; b) T.ex.: modellen förutsätter att minskningen är lika stor varje år, men klimatet och avsmältningstakten kan förändras; dessutom ger modellen negativa längder efter 2080." },
    ledtradar: [
      "a) Sätt \\(L=0\\) och lös ut \\(t\\).",
      "b) Vilket antagande bygger modellen på? Är det rimligt i 80 år?"
    ],
    losning: "<p><strong>a)</strong> \\(0=2000-25t\\Rightarrow t=\\dfrac{2000}{25}=80\\). År \\(2000+80=2080\\).</p><p><strong>b)</strong> Exempel på skäl:</p><ul><li>Modellen förutsätter att glaciären minskar med exakt lika mycket varje år. Avsmältningen beror på temperatur och nederbörd, som kan förändras – t.ex. kan uppvärmningen öka takten.</li><li>Modellen ger negativa längder efter 2080, vilket är orimligt. Den kan bara gälla för \\(0\\le t\\le 80\\).</li><li>Modellen bygger på en uppskattad medelminskning; enstaka år kan avvika mycket.</li></ul>",
    bedomning: [
      "+E<sub>M</sub> för korrekt svar i a), år 2080",
      "+E<sub>R</sub> för ett godtagbart skäl i b) som berör modellens antaganden eller giltighetsområde"
    ]
  },

  // ===================== RÄTA LINJEN =====================

  {
    id: "gy-042",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Funktioner",
    moment: "Räta linjens ekvation",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En rät linje har ekvationen \\(2x+3y-12=0\\).</p><p>Bestäm linjens riktningskoefficient \\(k\\).</p>",
    svar: { varde: -0.6667, tolerans: 0.001 },
    ledtradar: [
      "Skriv om ekvationen på formen \\(y=kx+m\\) genom att lösa ut \\(y\\).",
      "Flytta över \\(2x\\) och \\(-12\\) till högerledet och dela sedan med 3."
    ],
    losning: "<ol><li>\\(3y=-2x+12\\).</li><li>Dela med 3: \\(y=-\\dfrac23x+4\\).</li><li>Riktningskoefficienten är talet framför \\(x\\).</li></ol><p><strong>Svar:</strong> \\(k=-\\dfrac23\\)</p><p>Allmänt: linjen \\(ax+by+c=0\\) med \\(b\\neq 0\\) har \\(k=-\\dfrac{a}{b}\\).</p>"
  },

  {
    id: "gy-043",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Funktioner",
    moment: "Vinkelräta linjer",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Bestäm ekvationen för den räta linje som är vinkelrät mot linjen \\(2x-y+3=0\\) och som går genom punkten \\((4,\\,1)\\).</p><p>Svara på formen \\(ax+by+c=0\\).</p>",
    svar: { facit: "\\(x+2y-6=0\\)" },
    ledtradar: [
      "Skriv den givna linjen på formen \\(y=kx+m\\) för att hitta dess riktningskoefficient.",
      "Villkoret för vinkelräta linjer: \\(k_1\\cdot k_2=-1\\)."
    ],
    losning: "<ol><li>Den givna linjen: \\(y=2x+3\\), så \\(k_1=2\\).</li><li>Vinkelrät linje: \\(k_1\\cdot k_2=-1\\Rightarrow k_2=-\\dfrac12\\).</li><li>Sätt in punkten \\((4,1)\\) i \\(y=-\\dfrac12x+m\\): \\(1=-2+m\\Rightarrow m=3\\).</li><li>\\(y=-\\dfrac12x+3\\). Multiplicera med 2: \\(2y=-x+6\\), dvs. \\(x+2y-6=0\\).</li></ol><p><strong>Kontroll:</strong> \\(4+2\\cdot1-6=0\\). ✓</p><p><strong>Svar:</strong> \\(x+2y-6=0\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för att bestämma den vinkelräta linjens riktningskoefficient, \\(k=-\\frac12\\)",
      "+C<sub>P</sub> för korrekt ekvation på formen \\(ax+by+c=0\\), t.ex. \\(x+2y-6=0\\)"
    ]
  }

);
