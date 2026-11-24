// Uppgifter: Aritmetik och algebra (+ Problemlösning)
// NP Matematik nivå 1a/1b/1c (Gy25) – se SCHEMA.md
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(

  // ===================== DEL A (kortsvar, utan digitala verktyg) =====================

  {
    id: "alg-001",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Förenkla uttryck",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Förenkla uttrycket \\(4(x+3)-2(x-1)\\) så långt som möjligt.</p>",
    svar: {
      alternativ: ["\\(2x+14\\)", "\\(2x+10\\)", "\\(2x+11\\)", "\\(6x+14\\)"],
      ratt: 0
    },
    ledtradar: [
      "Multiplicera in talen framför parenteserna, ett i taget.",
      "Tänk på tecknet: \\(-2\\cdot(-1)\\) blir positivt."
    ],
    losning: "<ol><li>Multiplicera in: \\(4(x+3)=4x+12\\) och \\(-2(x-1)=-2x+2\\).</li><li>Sätt ihop: \\(4x+12-2x+2\\).</li><li>Samla termer: \\((4x-2x)+(12+2)=2x+14\\).</li></ol><p><strong>Svar:</strong> \\(2x+14\\)</p><p>Ett vanligt fel är att skriva \\(-2x-2\\), vilket ger \\(2x+10\\).</p>"
  },

  {
    id: "alg-002",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Linjära ekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\(7x-4=3x+16\\).</p>",
    svar: { varde: 5, tolerans: 0 },
    ledtradar: [
      "Samla alla \\(x\\)-termer i ena ledet och alla tal i det andra.",
      "Subtrahera \\(3x\\) och addera \\(4\\) i båda leden."
    ],
    losning: "<ol><li>Subtrahera \\(3x\\) från båda leden: \\(4x-4=16\\).</li><li>Addera 4: \\(4x=20\\).</li><li>Dividera med 4: \\(x=5\\).</li></ol><p><strong>Kontroll:</strong> VL \\(=7\\cdot 5-4=31\\), HL \\(=3\\cdot 5+16=31\\). ✓</p><p><strong>Svar:</strong> \\(x=5\\)</p>"
  },

  {
    id: "alg-003",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Faktorisering",
    niva: "E",
    poang: "1/0/0",
    typ: "text",
    fraga: "<p>Faktorisera uttrycket \\(6x+15\\) så långt som möjligt.</p>",
    svar: {
      godkanda: ["3(2x+5)", "3(5+2x)", "(2x+5)3", "(5+2x)3", "3*(2x+5)", "3·(2x+5)"]
    },
    ledtradar: [
      "Leta efter den största faktor som finns i båda termerna.",
      "Både 6 och 15 är delbara med 3."
    ],
    losning: "<ol><li>Den största gemensamma faktorn till \\(6x\\) och \\(15\\) är \\(3\\).</li><li>\\(6x=3\\cdot 2x\\) och \\(15=3\\cdot 5\\).</li><li>Bryt ut 3: \\(6x+15=3(2x+5)\\).</li></ol><p><strong>Kontroll:</strong> \\(3(2x+5)=6x+15\\). ✓</p><p><strong>Svar:</strong> \\(3(2x+5)\\)</p>"
  },

  {
    id: "alg-004",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Multiplicera uttryck",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilket uttryck är lika med \\((x+4)(x-2)\\)?</p>",
    svar: {
      alternativ: ["\\(x^2-8\\)", "\\(x^2+2x-8\\)", "\\(x^2-2x-8\\)", "\\(x^2+6x-8\\)", "\\(2x+2\\)"],
      ratt: 1
    },
    ledtradar: [
      "Varje term i den första parentesen ska multipliceras med varje term i den andra.",
      "Du får fyra produkter: \\(x\\cdot x\\), \\(x\\cdot(-2)\\), \\(4\\cdot x\\) och \\(4\\cdot(-2)\\)."
    ],
    losning: "<ol><li>\\((x+4)(x-2)=x\\cdot x+x\\cdot(-2)+4\\cdot x+4\\cdot(-2)\\)</li><li>\\(=x^2-2x+4x-8\\)</li><li>\\(=x^2+2x-8\\)</li></ol><p><strong>Svar:</strong> \\(x^2+2x-8\\)</p>"
  },

  {
    id: "alg-005",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Prefix och enheter",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Ett tunt plastskikt är \\(0{,}04\\) mm tjockt.</p><p>Hur många mikrometer (µm) är det?</p>",
    svar: { varde: 40, tolerans: 0, enhet: "µm" },
    ledtradar: [
      "Använd formelbladet: milli betyder \\(10^{-3}\\) och mikro betyder \\(10^{-6}\\).",
      "1 mm \\(=1000\\) µm."
    ],
    losning: "<ol><li>\\(1\\text{ mm}=10^{-3}\\text{ m}\\) och \\(1\\text{ µm}=10^{-6}\\text{ m}\\), alltså är \\(1\\text{ mm}=1000\\text{ µm}\\).</li><li>\\(0{,}04\\text{ mm}=0{,}04\\cdot 1000\\text{ µm}=40\\text{ µm}\\).</li></ol><p><strong>Svar:</strong> 40 µm</p>"
  },

  {
    id: "alg-006",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Tiopotenser och grundpotensform",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilket alternativ visar talet \\(0{,}000\\,52\\) skrivet i grundpotensform?</p>",
    svar: {
      alternativ: ["\\(5{,}2\\cdot 10^{4}\\)", "\\(52\\cdot 10^{-5}\\)", "\\(5{,}2\\cdot 10^{-3}\\)", "\\(5{,}2\\cdot 10^{-4}\\)"],
      ratt: 3
    },
    ledtradar: [
      "I grundpotensform skrivs talet som \\(a\\cdot 10^n\\) där \\(1\\le a\\lt 10\\).",
      "Hur många steg måste decimaltecknet flyttas åt höger för att få \\(5{,}2\\)?"
    ],
    losning: "<ol><li>Talet ska skrivas som \\(a\\cdot 10^n\\) med \\(1\\le a\\lt 10\\), alltså \\(a=5{,}2\\).</li><li>Från \\(0{,}000\\,52\\) till \\(5{,}2\\) flyttas decimaltecknet 4 steg åt höger, dvs. talet multipliceras med \\(10^4\\).</li><li>Då måste vi kompensera med \\(10^{-4}\\): \\(0{,}000\\,52=5{,}2\\cdot 10^{-4}\\).</li></ol><p><strong>Svar:</strong> \\(5{,}2\\cdot 10^{-4}\\)</p><p>\\(52\\cdot 10^{-5}\\) har rätt värde men är inte i grundpotensform eftersom \\(52\\gt 10\\).</p>"
  },

  {
    id: "alg-007",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Förändringsfaktor",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Priset på en jacka sänks med 15 %.</p><p>Vilken förändringsfaktor motsvarar sänkningen?</p>",
    svar: { varde: 0.85, tolerans: 0 },
    ledtradar: [
      "Förändringsfaktorn är den andel av det gamla priset som är kvar efter förändringen.",
      "Hela priset är 100 %. Hur många procent är kvar efter sänkningen?"
    ],
    losning: "<ol><li>Efter sänkningen återstår \\(100\\,\\%-15\\,\\%=85\\,\\%\\) av ursprungspriset.</li><li>\\(85\\,\\%=0{,}85\\).</li></ol><p><strong>Svar:</strong> Förändringsfaktorn är \\(0{,}85\\).</p><p>Obs! Förändringsfaktorn är inte \\(0{,}15\\) och inte \\(-0{,}15\\).</p>"
  },

  {
    id: "alg-008",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Tal i olika former",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilket av talen är störst?</p>",
    svar: {
      alternativ: ["\\(\\dfrac{3}{8}\\)", "\\(0{,}4\\)", "\\(35\\,\\%\\)", "\\(0{,}38\\)"],
      ratt: 1
    },
    ledtradar: [
      "Skriv alla tal i samma form, till exempel som decimaltal.",
      "\\(\\frac{3}{8}=3\\) delat med 8. Börja med \\(\\frac{1}{8}=0{,}125\\)."
    ],
    losning: "<ol><li>\\(\\frac{3}{8}=3\\cdot 0{,}125=0{,}375\\)</li><li>\\(0{,}4=0{,}400\\)</li><li>\\(35\\,\\%=0{,}350\\)</li><li>\\(0{,}38=0{,}380\\)</li></ol><p>Störst är \\(0{,}400\\).</p><p><strong>Svar:</strong> \\(0{,}4\\)</p>"
  },

  {
    id: "alg-009",
    kurser: ["1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Potensregler",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Förenkla \\[\\frac{a^5\\cdot a^3}{a^2}\\]</p>",
    svar: {
      alternativ: ["\\(a^{13}\\)", "\\(a^{6}\\)", "\\(a^{7{,}5}\\)", "\\(a^{4}\\)"],
      ratt: 1
    },
    ledtradar: [
      "Formelbladet: \\(a^x\\cdot a^y=a^{x+y}\\) och \\(\\frac{a^x}{a^y}=a^{x-y}\\).",
      "Förenkla täljaren först."
    ],
    losning: "<ol><li>Täljaren: \\(a^5\\cdot a^3=a^{5+3}=a^8\\).</li><li>Division: \\(\\frac{a^8}{a^2}=a^{8-2}=a^6\\).</li></ol><p><strong>Svar:</strong> \\(a^6\\)</p>"
  },

  {
    id: "alg-010",
    kurser: ["1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Linjära olikheter",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Lös olikheten \\(2x-3\\gt 7\\).</p>",
    svar: {
      alternativ: ["\\(x\\lt 5\\)", "\\(x\\gt 2\\)", "\\(x\\gt 5\\)", "\\(x\\gt 10\\)"],
      ratt: 2
    },
    ledtradar: [
      "Lös olikheten på samma sätt som en ekvation.",
      "Olikhetstecknet vänds bara om man multiplicerar eller dividerar med ett negativt tal."
    ],
    losning: "<ol><li>Addera 3 i båda leden: \\(2x\\gt 10\\).</li><li>Dividera med 2 (positivt tal, tecknet behålls): \\(x\\gt 5\\).</li></ol><p><strong>Svar:</strong> \\(x\\gt 5\\)</p>"
  },

  {
    id: "alg-011",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Linjära ekvationer",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\[\\frac{x+2}{3}=\\frac{x-1}{2}\\]</p>",
    svar: { varde: 7, tolerans: 0 },
    ledtradar: [
      "Multiplicera båda leden med 6 för att bli av med nämnarna.",
      "Glöm inte att multiplicera <em>hela</em> täljaren: \\(6\\cdot\\frac{x+2}{3}=2(x+2)\\)."
    ],
    losning: "<ol><li>Multiplicera båda leden med 6: \\(2(x+2)=3(x-1)\\).</li><li>Multiplicera in: \\(2x+4=3x-3\\).</li><li>Subtrahera \\(2x\\) och addera 3: \\(7=x\\).</li></ol><p><strong>Kontroll:</strong> VL \\(=\\frac{9}{3}=3\\), HL \\(=\\frac{6}{2}=3\\). ✓</p><p><strong>Svar:</strong> \\(x=7\\)</p>"
  },

  {
    id: "alg-012",
    kurser: ["1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Potensekvationer",
    niva: "C",
    poang: "0/1/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\(2x^4=162\\).</p>",
    svar: { varden: [-3, 3], tolerans: 0 },
    ledtradar: [
      "Dividera först båda leden med 2.",
      "Vilka tal upphöjt till 4 blir 81? Tänk på att en jämn exponent ger två lösningar."
    ],
    losning: "<ol><li>Dividera med 2: \\(x^4=81\\).</li><li>\\(3^4=81\\) och \\((-3)^4=81\\).</li><li>Alltså \\(x=\\pm\\sqrt[4]{81}=\\pm 3\\).</li></ol><p><strong>Svar:</strong> \\(x=3\\) och \\(x=-3\\)</p>"
  },

  {
    id: "alg-013",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Faktorisering",
    niva: "C",
    poang: "0/1/0",
    typ: "text",
    fraga: "<p>Faktorisera \\(4x^2-12x\\) så långt som möjligt.</p><p>Skriv ditt svar som en produkt, t.ex. <code>2x(x+5)</code>.</p>",
    svar: {
      godkanda: ["4x(x-3)", "4x(-3+x)", "(x-3)4x", "(x-3)(4x)", "4x*(x-3)", "4x·(x-3)", "x4(x-3)", "4(x-3)x"]
    },
    ledtradar: [
      "Båda termerna innehåller både en siffer-faktor och \\(x\\).",
      "Den största gemensamma faktorn är \\(4x\\)."
    ],
    losning: "<ol><li>\\(4x^2=4x\\cdot x\\) och \\(12x=4x\\cdot 3\\).</li><li>Bryt ut \\(4x\\): \\(4x^2-12x=4x(x-3)\\).</li></ol><p>Svaret \\(4(x^2-3x)\\) eller \\(x(4x-12)\\) är inte faktoriserat så långt som möjligt.</p><p><strong>Svar:</strong> \\(4x(x-3)\\)</p>"
  },

  {
    id: "alg-014",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Mönster och generella samband",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Saga bygger figurer av tändstickor. Tabellen visar hur många tändstickor varje figur består av.</p><table><tr><th>Figur \\(n\\)</th><td>1</td><td>2</td><td>3</td><td>4</td></tr><tr><th>Antal tändstickor</th><td>5</td><td>8</td><td>11</td><td>14</td></tr></table><p>Vilket uttryck ger antalet tändstickor i figur \\(n\\)?</p>",
    svar: {
      alternativ: ["\\(n+3\\)", "\\(5n\\)", "\\(3n+2\\)", "\\(3n+5\\)"],
      ratt: 2
    },
    ledtradar: [
      "Hur mycket ökar antalet tändstickor från en figur till nästa?",
      "Ökningen 3 per figur ger termen \\(3n\\). Vad måste läggas till för att figur 1 ska få 5 stickor?"
    ],
    losning: "<ol><li>Antalet ökar med 3 för varje ny figur, så uttrycket innehåller \\(3n\\).</li><li>För \\(n=1\\) ger \\(3n\\) bara 3, men figuren har 5. Alltså ska 2 läggas till.</li><li>Uttrycket blir \\(3n+2\\).</li></ol><p><strong>Kontroll:</strong> \\(n=4\\): \\(3\\cdot 4+2=14\\). ✓</p><p><strong>Svar:</strong> \\(3n+2\\)</p>"
  },

  {
    id: "alg-015",
    kurser: ["1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Intervall och olikheter",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Hur många heltal \\(x\\) uppfyller olikheten \\[-3\\lt 2x+1\\le 7\\ ?\\]</p>",
    svar: { varde: 5, tolerans: 0 },
    ledtradar: [
      "Subtrahera 1 i alla tre leden, och dividera sedan alla led med 2.",
      "Var noga med vilka gränser som är med (\\(\\le\\)) och vilka som inte är med (\\(\\lt\\))."
    ],
    losning: "<ol><li>Subtrahera 1 i alla led: \\(-4\\lt 2x\\le 6\\).</li><li>Dividera med 2: \\(-2\\lt x\\le 3\\).</li><li>Heltalen i intervallet är \\(-1,\\ 0,\\ 1,\\ 2,\\ 3\\) (\\(-2\\) är inte med, \\(3\\) är med).</li></ol><p><strong>Svar:</strong> 5 heltal</p>"
  },

  {
    id: "alg-016",
    kurser: ["1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Potensregler",
    niva: "A",
    poang: "0/0/1",
    typ: "val",
    fraga: "<p>Vilket alternativ är lika med \\(2^{10}+2^{10}\\)?</p>",
    svar: {
      alternativ: ["\\(2^{20}\\)", "\\(4^{10}\\)", "\\(2^{11}\\)", "\\(4^{20}\\)"],
      ratt: 2
    },
    ledtradar: [
      "Potensreglerna gäller för multiplikation och division – inte för addition.",
      "\\(2^{10}+2^{10}=2\\cdot 2^{10}\\)."
    ],
    losning: "<ol><li>Två lika termer: \\(2^{10}+2^{10}=2\\cdot 2^{10}\\).</li><li>\\(2=2^1\\), så \\(2^1\\cdot 2^{10}=2^{1+10}=2^{11}\\).</li></ol><p><strong>Svar:</strong> \\(2^{11}\\)</p><p>\\(2^{20}=2^{10}\\cdot 2^{10}\\) och \\(4^{10}=2^{20}\\) är produkter, inte summor.</p>"
  },

  {
    id: "alg-017",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Aritmetik och algebra",
    moment: "Linjära ekvationer",
    niva: "A",
    poang: "0/0/1",
    typ: "tal",
    fraga: "<p>Ekvationen \\[ax+3=2x+3a\\] där \\(a\\) är en konstant, har lösningen \\(x=5\\).</p><p>Bestäm \\(a\\).</p>",
    svar: { varde: 3.5, tolerans: 0 },
    ledtradar: [
      "Sätt in \\(x=5\\) i ekvationen. Då får du en ekvation där \\(a\\) är det okända.",
      "\\(5a+3=10+3a\\)."
    ],
    losning: "<ol><li>Sätt in \\(x=5\\): \\(5a+3=2\\cdot 5+3a\\), dvs. \\(5a+3=10+3a\\).</li><li>Subtrahera \\(3a\\) och 3: \\(2a=7\\).</li><li>\\(a=3{,}5\\).</li></ol><p><strong>Kontroll:</strong> VL \\(=3{,}5\\cdot 5+3=20{,}5\\), HL \\(=10+10{,}5=20{,}5\\). ✓</p><p><strong>Svar:</strong> \\(a=3{,}5\\)</p>"
  },

  // ===================== DEL B (1a: enkel räknare; 1b/1c: utan digitala verktyg) =====================

  {
    id: "alg-018",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Formler",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Sambandet mellan temperaturen \\(F\\) i grader Fahrenheit och temperaturen \\(C\\) i grader Celsius är \\[F=1{,}8C+32\\]</p><p>En sommardag i New York är det 77 °F. Hur många grader Celsius är det?</p>",
    svar: { varde: 25, tolerans: 0, enhet: "°C" },
    ledtradar: [
      "Sätt in \\(F=77\\) och lös ut \\(C\\).",
      "\\(1{,}8C=45\\). Dividera med \\(1{,}8\\) – det är samma sak som \\(\\frac{450}{18}\\)."
    ],
    losning: "<ol><li>Sätt in \\(F=77\\): \\(77=1{,}8C+32\\).</li><li>Subtrahera 32: \\(45=1{,}8C\\).</li><li>\\(C=\\frac{45}{1{,}8}=\\frac{450}{18}=25\\).</li></ol><p><strong>Svar:</strong> 25 °C</p>"
  },

  {
    id: "alg-019",
    kurser: ["1a"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Formler i arbetslivet",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En elektriker använder formeln \\[P=U\\cdot I\\] där \\(P\\) är effekten i watt (W), \\(U\\) är spänningen i volt (V) och \\(I\\) är strömmen i ampere (A).</p><p>En vattenkokare har effekten 2 000 W och är kopplad till 230 V. Hur stor är strömmen? Svara med en decimal.</p>",
    svar: { varde: 8.7, tolerans: 0.05, enhet: "A" },
    ledtradar: [
      "Sätt in \\(P=2000\\) och \\(U=230\\) i formeln.",
      "Lös ut \\(I\\) genom att dividera med 230."
    ],
    losning: "<ol><li>\\(2000=230\\cdot I\\)</li><li>\\(I=\\frac{2000}{230}\\approx 8{,}696\\)</li></ol><p><strong>Svar:</strong> ca 8,7 A</p>"
  },

  {
    id: "alg-020",
    kurser: ["1a"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Spill och förbrukningsmaterial",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En golvläggare ska lägga parkett i ett rektangulärt rum som är 4,2 m långt och 3,5 m brett. Man räknar med 10 % spill.</p><p>Hur många kvadratmeter parkett behöver köpas? Svara med en decimal.</p>",
    svar: { varde: 16.2, tolerans: 0.05, enhet: "m²" },
    ledtradar: [
      "Beräkna först golvets area.",
      "10 % spill betyder att arean ska multipliceras med förändringsfaktorn \\(1{,}10\\)."
    ],
    losning: "<ol><li>Golvets area: \\(4{,}2\\cdot 3{,}5=14{,}7\\) m².</li><li>Med 10 % spill: \\(14{,}7\\cdot 1{,}10=16{,}17\\) m².</li></ol><p><strong>Svar:</strong> ca 16,2 m² (i praktiken köper man hela paket, alltså minst så mycket).</p>"
  },

  {
    id: "alg-021",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Linjära ekvationer",
    niva: "E",
    poang: "2/0/0",
    typ: "redovisning",
    fraga: "<p>Lös ekvationen \\(5(x-3)=2x+9\\).</p>",
    svar: { facit: "\\(x=8\\)" },
    ledtradar: [
      "Börja med att multiplicera in 5 i parentesen.",
      "Samla \\(x\\)-termerna i vänsterledet och talen i högerledet."
    ],
    losning: "<ol><li>Multiplicera in: \\(5x-15=2x+9\\).</li><li>Subtrahera \\(2x\\): \\(3x-15=9\\).</li><li>Addera 15: \\(3x=24\\).</li><li>Dividera med 3: \\(x=8\\).</li></ol><p><strong>Kontroll:</strong> VL \\(=5(8-3)=25\\), HL \\(=2\\cdot 8+9=25\\). ✓</p><p><strong>Svar:</strong> \\(x=8\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt multiplicerad parentes, \\(5x-15\\)",
      "+E<sub>P</sub> för korrekt lösning, \\(x=8\\)"
    ]
  },

  {
    id: "alg-022",
    kurser: ["1b", "1c"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Linjära olikheter",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>a) Lös olikheten \\(5-2(x+4)\\lt 3x+7\\).</p><p>b) Vilket är det minsta heltal som uppfyller olikheten?</p>",
    svar: { facit: "a) \\(x\\gt -2\\) &nbsp; b) \\(-1\\)" },
    ledtradar: [
      "Multiplicera in \\(-2\\) i parentesen och förenkla vänsterledet.",
      "Om du dividerar med ett negativt tal måste olikhetstecknet vändas.",
      "Är \\(-2\\) självt med i lösningsmängden?"
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Multiplicera in: \\(5-2x-8\\lt 3x+7\\), dvs. \\(-3-2x\\lt 3x+7\\).</li><li>Addera \\(2x\\) och subtrahera 7: \\(-10\\lt 5x\\).</li><li>Dividera med 5 (positivt): \\(-2\\lt x\\), dvs. \\(x\\gt -2\\).</li></ol><p>(Om man i stället samlar \\(x\\) till vänster får man \\(-5x\\lt 10\\), och vid division med \\(-5\\) vänds tecknet: \\(x\\gt -2\\).)</p><p><strong>b)</strong> \\(-2\\) uppfyller inte olikheten (strikt olikhet), så det minsta heltalet är \\(-1\\).</p><p><strong>Svar:</strong> a) \\(x\\gt -2\\) b) \\(-1\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt förenklad olikhet, t.ex. \\(-3-2x\\lt 3x+7\\) eller \\(-10\\lt 5x\\)",
      "+C<sub>P</sub> för korrekt lösning \\(x\\gt -2\\) med korrekt hantering av olikhetstecknet samt korrekt minsta heltal \\(-1\\)"
    ]
  },

  {
    id: "alg-023",
    kurser: ["1b", "1c"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Potensregler",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Förenkla uttrycket \\[\\frac{(2x^3)^2\\cdot x^{-4}}{4x}\\] där \\(x\\neq 0\\).</p>",
    svar: {
      alternativ: ["\\(x\\)", "\\(x^{2}\\)", "\\(\\dfrac{x}{2}\\)", "\\(x^{0}\\)", "\\(\\dfrac{1}{x^{3}}\\)"],
      ratt: 0
    },
    ledtradar: [
      "\\((2x^3)^2=2^2\\cdot (x^3)^2\\). Använd \\((a^x)^y=a^{xy}\\).",
      "Samla sedan alla \\(x\\)-potenser och använd \\(a^x\\cdot a^y=a^{x+y}\\) och \\(\\frac{a^x}{a^y}=a^{x-y}\\)."
    ],
    losning: "<ol><li>\\((2x^3)^2=4x^6\\).</li><li>Täljaren: \\(4x^6\\cdot x^{-4}=4x^{6+(-4)}=4x^2\\).</li><li>\\(\\frac{4x^2}{4x}=x^{2-1}=x\\).</li></ol><p><strong>Svar:</strong> \\(x\\)</p><p>Vanligt fel: \\((2x^3)^2=2x^6\\) – även 2:an ska kvadreras.</p>"
  },

  {
    id: "alg-024",
    kurser: ["1b", "1c"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Motivera potensregler",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>På formelbladet står bland annat att \\(a^0=1\\) och \\(a^{-x}=\\dfrac{1}{a^x}\\) för positiva tal \\(a\\).</p><p>a) Motivera med hjälp av regeln \\(\\dfrac{a^x}{a^y}=a^{x-y}\\) varför det är rimligt att \\(a^0=1\\).</p><p>b) Motivera på liknande sätt varför det är rimligt att \\(a^{-2}=\\dfrac{1}{a^2}\\).</p>",
    svar: { facit: "a) \\(\\frac{a^n}{a^n}=1\\) men också \\(=a^{n-n}=a^0\\). b) \\(\\frac{a^3}{a^5}=\\frac{1}{a^2}\\) men också \\(=a^{3-5}=a^{-2}\\)." },
    ledtradar: [
      "Vad blir ett tal (skilt från noll) delat med sig självt?",
      "Skriv t.ex. \\(\\frac{a^3}{a^3}\\) på två sätt: genom att förkorta och genom att använda potensregeln.",
      "I b) kan du titta på \\(\\frac{a^3}{a^5}\\) och skriva ut faktorerna."
    ],
    losning: "<p><strong>a)</strong> Betrakta \\(\\frac{a^3}{a^3}\\).</p><ul><li>Ett tal (skilt från 0) delat med sig självt är 1, alltså \\(\\frac{a^3}{a^3}=1\\).</li><li>Med potensregeln blir \\(\\frac{a^3}{a^3}=a^{3-3}=a^0\\).</li></ul><p>Om potensregeln ska gälla även här måste \\(a^0=1\\). Samma resonemang fungerar för vilken exponent som helst: \\(\\frac{a^n}{a^n}=1=a^0\\).</p><p><strong>b)</strong> Betrakta \\(\\frac{a^3}{a^5}\\).</p><ul><li>Skriv ut faktorerna: \\(\\frac{a\\cdot a\\cdot a}{a\\cdot a\\cdot a\\cdot a\\cdot a}=\\frac{1}{a\\cdot a}=\\frac{1}{a^2}\\).</li><li>Med potensregeln: \\(\\frac{a^3}{a^5}=a^{3-5}=a^{-2}\\).</li></ul><p>För att regeln ska gälla även när exponenten blir negativ måste alltså \\(a^{-2}=\\frac{1}{a^2}\\).</p>",
    bedomning: [
      "+C<sub>R</sub> för godtagbar motivering av att \\(a^0=1\\), där en kvot \\(\\frac{a^n}{a^n}\\) beräknas på två sätt",
      "+A<sub>R</sub> för en fullständig och generell motivering av att \\(a^{-2}=\\frac{1}{a^2}\\), t.ex. genom att jämföra \\(\\frac{a^3}{a^5}\\) skrivet med faktorer och med potensregeln"
    ]
  },

  {
    id: "alg-025",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Förändringar i flera steg",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Priset på en cykel sänks först med 20 %. Senare höjs det nya priset med 25 %.</p><p>Med hur många procent har priset förändrats totalt jämfört med det ursprungliga priset?</p>",
    svar: { varde: 0, tolerans: 0, enhet: "%" },
    ledtradar: [
      "Skriv förändringarna som förändringsfaktorer: en sänkning med 20 % ger \\(0{,}80\\).",
      "Den totala förändringsfaktorn är produkten av förändringsfaktorerna."
    ],
    losning: "<ol><li>Förändringsfaktorer: sänkning 20 % \\(\\Rightarrow 0{,}80\\), höjning 25 % \\(\\Rightarrow 1{,}25\\).</li><li>Total förändringsfaktor: \\(0{,}80\\cdot 1{,}25=1{,}00\\).</li><li>Förändringsfaktorn 1 betyder att priset är oförändrat.</li></ol><p><strong>Svar:</strong> 0 % – priset är detsamma som från början.</p><p>Vanligt fel: att räkna \\(-20\\,\\%+25\\,\\%=+5\\,\\%\\). Procenten räknas på olika grundvärden och kan inte adderas.</p>"
  },

  {
    id: "alg-026",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Generella samband",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Elias påstår: <em>”Summan av tre på varandra följande heltal är alltid delbar med 3.”</em></p><p>Till exempel är \\(4+5+6=15\\) och \\(15\\) är delbart med 3.</p><p>Visa att Elias påstående gäller för alla heltal.</p>",
    svar: { facit: "\\(n+(n+1)+(n+2)=3n+3=3(n+1)\\), som alltid är delbart med 3." },
    ledtradar: [
      "Kalla det minsta talet för \\(n\\). Hur kan de två andra talen skrivas?",
      "Förenkla summan och försök bryta ut en faktor 3."
    ],
    losning: "<ol><li>Låt det minsta talet vara \\(n\\), där \\(n\\) är ett heltal. Då är de andra talen \\(n+1\\) och \\(n+2\\).</li><li>Summan: \\(n+(n+1)+(n+2)=3n+3\\).</li><li>Faktorisera: \\(3n+3=3(n+1)\\).</li><li>Eftersom \\(n+1\\) är ett heltal är \\(3(n+1)\\) alltid en multipel av 3.</li></ol><p><strong>Slutsats:</strong> Summan av tre på varandra följande heltal är alltid delbar med 3. (Dessutom ser man att summan är 3 gånger det mittersta talet.)</p><p>Observera att några exempel inte räcker som bevis – det krävs ett generellt resonemang.</p>",
    bedomning: [
      "+C<sub>R</sub> för att ställa upp ett korrekt generellt uttryck för summan, t.ex. \\(n+(n+1)+(n+2)=3n+3\\)",
      "+A<sub>R</sub> för fullständigt bevis med faktorisering, t.ex. \\(3(n+1)\\), och tydlig slutsats om delbarhet med 3"
    ]
  },

  {
    id: "alg-027",
    kurser: ["1a"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Förändringar i flera steg",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>I en butik höjdes priset på en kaffemaskin först med 12 %. Vid en rea sänktes sedan det nya priset med 8 %. Efter sänkningen kostade kaffemaskinen 1 288 kr.</p><p>Vad kostade kaffemaskinen från början?</p>",
    svar: { varde: 1250, tolerans: 0.5, enhet: "kr" },
    ledtradar: [
      "Kalla ursprungspriset \\(x\\). Vilka förändringsfaktorer hör till höjningen och sänkningen?",
      "\\(x\\cdot 1{,}12\\cdot 0{,}92=1288\\)."
    ],
    losning: "<ol><li>Förändringsfaktorer: \\(1{,}12\\) och \\(0{,}92\\).</li><li>Ekvation: \\(x\\cdot 1{,}12\\cdot 0{,}92=1288\\), dvs. \\(1{,}0304x=1288\\).</li><li>\\(x=\\frac{1288}{1{,}0304}=1250\\).</li></ol><p><strong>Kontroll:</strong> \\(1250\\cdot 1{,}12=1400\\), \\(1400\\cdot 0{,}92=1288\\). ✓</p><p><strong>Svar:</strong> 1 250 kr</p>"
  },

  {
    id: "alg-028",
    kurser: ["1b", "1c"],
    del: "B",
    omrade: "Aritmetik och algebra",
    moment: "Potensekvationer",
    niva: "A",
    poang: "0/0/1",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\(x^{2/3}=9\\) för \\(x\\gt 0\\).</p>",
    svar: { varde: 27, tolerans: 0 },
    ledtradar: [
      "Upphöj båda leden till samma tal så att exponenten för \\(x\\) blir 1.",
      "\\(\\left(x^{2/3}\\right)^{3/2}=x\\). Beräkna \\(9^{3/2}=\\left(\\sqrt{9}\\right)^3\\)."
    ],
    losning: "<ol><li>Upphöj båda leden till \\(\\frac{3}{2}\\): \\(\\left(x^{2/3}\\right)^{3/2}=9^{3/2}\\).</li><li>Vänsterled: \\(x^{\\frac{2}{3}\\cdot\\frac{3}{2}}=x^1=x\\).</li><li>Högerled: \\(9^{3/2}=\\left(9^{1/2}\\right)^3=3^3=27\\).</li></ol><p><strong>Kontroll:</strong> \\(27^{2/3}=\\left(\\sqrt[3]{27}\\right)^2=3^2=9\\). ✓</p><p><strong>Svar:</strong> \\(x=27\\)</p>"
  },

  // ===================== DEL C (enkel räknare, fullständiga lösningar) =====================

  {
    id: "alg-029",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Formler",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Ett taxibolag beräknar priset \\(K\\) kr för en resa med formeln \\[K=45+14{,}50s\\] där \\(s\\) är resans längd i kilometer.</p><p>Vad kostar en resa som är 7,4 km lång?</p>",
    svar: { varde: 152.3, tolerans: 0.05, enhet: "kr" },
    ledtradar: [
      "Sätt in \\(s=7{,}4\\) i formeln.",
      "Räkna multiplikationen före additionen."
    ],
    losning: "<ol><li>\\(K=45+14{,}50\\cdot 7{,}4\\)</li><li>\\(=45+107{,}30=152{,}30\\)</li></ol><p><strong>Svar:</strong> 152,30 kr</p>"
  },

  {
    id: "alg-030",
    kurser: ["1a"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Formler i arbetslivet",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En undersköterska ska ge ett dropp. Droppfarten \\(D\\) (droppar per minut) kan beräknas med formeln \\[D=\\frac{20V}{t}\\] där \\(V\\) är volymen i milliliter och \\(t\\) är tiden i <strong>minuter</strong>.</p><p>500 ml vätska ska ges under 4 timmar. Beräkna droppfarten. Avrunda till hela droppar per minut.</p>",
    svar: { varde: 42, tolerans: 0.5, enhet: "droppar/min" },
    ledtradar: [
      "Börja med att göra om 4 timmar till minuter.",
      "Sätt in \\(V=500\\) och \\(t=240\\) i formeln."
    ],
    losning: "<ol><li>Tiden: \\(4\\text{ h}=4\\cdot 60\\text{ min}=240\\text{ min}\\).</li><li>\\(D=\\frac{20\\cdot 500}{240}=\\frac{10\\,000}{240}\\approx 41{,}7\\).</li></ol><p><strong>Svar:</strong> ca 42 droppar per minut</p><p>Vanligt fel: att sätta in \\(t=4\\), vilket ger 2 500 droppar per minut – helt orimligt.</p>"
  },

  {
    id: "alg-031",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Mönster och generella samband",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>På en restaurang ställer man ihop kvadratiska bord i en lång rad. Vid ett bord får 4 personer plats, vid två bord i rad får 6 personer plats och vid tre bord i rad får 8 personer plats.</p><p>a) Hur många personer får plats om man ställer 15 bord i rad?</p><p>b) Ställ upp ett uttryck för hur många personer som får plats vid \\(n\\) bord i rad.</p>",
    svar: { facit: "a) 32 personer &nbsp; b) \\(2n+2\\)" },
    ledtradar: [
      "Rita gärna figur 1, 2 och 3. Hur många nya platser tillkommer för varje bord?",
      "Varje bord har en plats på varje långsida, och så finns det en plats på varje kortsida av raden."
    ],
    losning: "<p>För varje nytt bord tillkommer 2 platser (en på varje långsida). Dessutom finns alltid 2 platser på kortsidorna.</p><table><tr><th>Bord \\(n\\)</th><td>1</td><td>2</td><td>3</td><td>…</td><td>15</td></tr><tr><th>Personer</th><td>4</td><td>6</td><td>8</td><td>…</td><td>32</td></tr></table><p><strong>a)</strong> \\(2\\cdot 15+2=32\\) personer.</p><p><strong>b)</strong> \\(n\\) bord ger \\(2n\\) platser på långsidorna och 2 platser på kortsidorna: \\(P=2n+2\\).</p><p><strong>Kontroll:</strong> \\(n=3\\): \\(2\\cdot 3+2=8\\). ✓</p>",
    bedomning: [
      "+E<sub>PL</sub> för korrekt svar på a), 32 personer",
      "+C<sub>M</sub> för korrekt uttryck, \\(2n+2\\) eller motsvarande, t.ex. \\(2(n+1)\\)"
    ]
  },

  {
    id: "alg-032",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Linjära ekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\(0{,}4(x-15)=0{,}1x+3\\).</p>",
    svar: { varde: 30, tolerans: 0 },
    ledtradar: [
      "Multiplicera in \\(0{,}4\\) i parentesen.",
      "Samla \\(x\\)-termerna i vänsterledet: \\(0{,}4x-0{,}1x=0{,}3x\\)."
    ],
    losning: "<ol><li>Multiplicera in: \\(0{,}4x-6=0{,}1x+3\\).</li><li>Subtrahera \\(0{,}1x\\) och addera 6: \\(0{,}3x=9\\).</li><li>\\(x=\\frac{9}{0{,}3}=30\\).</li></ol><p><strong>Kontroll:</strong> VL \\(=0{,}4\\cdot 15=6\\), HL \\(=3+3=6\\). ✓</p><p><strong>Svar:</strong> \\(x=30\\)</p>"
  },

  {
    id: "alg-033",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Prefix och enheter",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Ett hårstrå är ungefär 70 µm tjockt.</p><p>Ungefär hur många hårstrån behöver läggas tätt bredvid varandra för att bredden ska bli 1 cm? Svara i hela tal.</p>",
    svar: { varde: 143, tolerans: 1 },
    ledtradar: [
      "Gör om båda längderna till samma enhet, t.ex. meter: \\(1\\text{ cm}=10^{-2}\\text{ m}\\) och \\(70\\text{ µm}=70\\cdot 10^{-6}\\text{ m}\\).",
      "Dividera den totala bredden med tjockleken för ett hårstrå."
    ],
    losning: "<ol><li>\\(1\\text{ cm}=10^{-2}\\text{ m}=0{,}01\\text{ m}\\).</li><li>\\(70\\text{ µm}=70\\cdot 10^{-6}\\text{ m}=0{,}000\\,07\\text{ m}\\).</li><li>Antal: \\(\\frac{0{,}01}{0{,}000\\,07}\\approx 142{,}9\\).</li></ol><p>Alternativt: \\(1\\text{ cm}=10\\,000\\text{ µm}\\) och \\(\\frac{10\\,000}{70}\\approx 143\\).</p><p><strong>Svar:</strong> ca 143 hårstrån</p>"
  },

  {
    id: "alg-034",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Procentuell förändring",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Elpriset för en familj ökade från 1,85 kr/kWh till 2,22 kr/kWh.</p><p>Hur många procent ökade elpriset?</p>",
    svar: { varde: 20, tolerans: 0.1, enhet: "%" },
    ledtradar: [
      "Beräkna först ökningen i kronor.",
      "Procentuell förändring \\(=\\dfrac{\\text{förändring}}{\\text{ursprungligt värde}}\\)."
    ],
    losning: "<ol><li>Ökning: \\(2{,}22-1{,}85=0{,}37\\) kr/kWh.</li><li>Andel: \\(\\frac{0{,}37}{1{,}85}=0{,}20=20\\,\\%\\).</li></ol><p>Alternativt med förändringsfaktor: \\(\\frac{2{,}22}{1{,}85}=1{,}20\\), dvs. en ökning med 20 %.</p><p><strong>Svar:</strong> 20 %</p>"
  },

  {
    id: "alg-035",
    kurser: ["1a"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Formler i arbetslivet",
    niva: "C",
    poang: "2/1/0",
    typ: "redovisning",
    fraga: "<p>En snickare använder tumregeln \\[2h+d=63\\] när hon bygger trappor. Här är \\(h\\) steghöjden och \\(d\\) stegdjupet, båda i centimeter.</p><p>En trappa ska gå från ett golv till ett annat som ligger 300 cm högre. Alla steg ska vara lika höga.</p><p>a) Trappan byggs med 16 steg. Beräkna steghöjden och stegdjupet.</p><p>b) Kunden vill att stegdjupet ska vara minst 27 cm. Hur många steg måste trappan då ha som minst?</p>",
    svar: { facit: "a) \\(h=18{,}75\\) cm, \\(d=25{,}5\\) cm &nbsp; b) minst 17 steg" },
    ledtradar: [
      "Steghöjden fås genom att dela den totala höjden med antalet steg.",
      "Sätt in \\(h\\) i tumregeln och lös ut \\(d\\).",
      "I b): vilken är den största steghöjd som ger \\(d\\ge 27\\)? Hur många steg krävs då för 300 cm?"
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Steghöjd: \\(h=\\frac{300}{16}=18{,}75\\) cm.</li><li>Tumregeln: \\(2\\cdot 18{,}75+d=63 \\Rightarrow 37{,}5+d=63 \\Rightarrow d=25{,}5\\) cm.</li></ol><p><strong>b)</strong></p><ol><li>Om \\(d=27\\): \\(2h+27=63 \\Rightarrow 2h=36 \\Rightarrow h=18\\) cm. Ett större stegdjup kräver en lägre steghöjd, så \\(h\\) får vara högst 18 cm.</li><li>Antal steg: \\(\\frac{300}{18}\\approx 16{,}7\\). Antalet steg måste vara ett heltal och steghöjden får inte bli större än 18 cm, så vi avrundar uppåt.</li><li>Kontroll med 17 steg: \\(h=\\frac{300}{17}\\approx 17{,}6\\) cm och \\(d\\approx 63-35{,}3=27{,}7\\) cm \\(\\ge 27\\) cm. ✓</li></ol><p><strong>Svar:</strong> a) Steghöjd 18,75 cm, stegdjup 25,5 cm. b) Minst 17 steg.</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt steghöjd, 18,75 cm",
      "+E<sub>P</sub> för korrekt stegdjup, 25,5 cm",
      "+C<sub>M</sub> för korrekt resonemang som leder till minst 17 steg, där avrundning uppåt motiveras"
    ]
  },

  {
    id: "alg-036",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Linjära ekvationer i tillämpningar",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Nora ska börja träna och jämför två gym.</p><ul><li><strong>Gym A:</strong> startavgift 450 kr och därefter 299 kr per månad.</li><li><strong>Gym B:</strong> ingen startavgift, 349 kr per månad.</li></ul><p>Efter hur många månader har Nora betalat lika mycket med båda alternativen? Från vilken månad är Gym A billigast totalt?</p>",
    svar: { facit: "Lika mycket efter 9 månader. Gym A är billigast totalt från och med månad 10." },
    ledtradar: [
      "Låt \\(x\\) vara antalet månader och teckna ett uttryck för den totala kostnaden för varje gym.",
      "Sätt uttrycken lika med varandra och lös ekvationen.",
      "Vilket gym ökar långsammast för varje ny månad?"
    ],
    losning: "<ol><li>Låt \\(x\\) vara antalet månader. Total kostnad:<br>Gym A: \\(450+299x\\) kr, Gym B: \\(349x\\) kr.</li><li>Lika kostnad: \\(450+299x=349x\\).</li><li>\\(450=50x \\Rightarrow x=9\\).</li><li>Kontroll: Gym A \\(450+299\\cdot 9=3141\\) kr, Gym B \\(349\\cdot 9=3141\\) kr. ✓</li><li>Gym A kostar 50 kr mindre per månad, så efter månad 9 blir Gym A billigare. Månad 10: A \\(3440\\) kr, B \\(3490\\) kr.</li></ol><p><strong>Svar:</strong> Efter 9 månader har hon betalat lika mycket. Från och med månad 10 är Gym A billigast.</p>",
    bedomning: [
      "+E<sub>M</sub> för korrekt uppställd ekvation, t.ex. \\(450+299x=349x\\), eller motsvarande systematisk prövning",
      "+C<sub>M</sub> för korrekt lösning (9 månader) och korrekt tolkning att Gym A är billigast från månad 10"
    ]
  },

  {
    id: "alg-037",
    kurser: ["1b", "1c"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Potensekvationer",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En klotformad vattenballong rymmer 5,0 liter. Volymen för ett klot är \\[V=\\frac{4\\pi r^3}{3}\\]</p><p>Bestäm ballongens radie i centimeter. Svara med en decimal.</p>",
    svar: { varde: 10.6, tolerans: 0.05, enhet: "cm" },
    ledtradar: [
      "Gör om volymen: \\(1\\text{ liter}=1\\text{ dm}^3=1000\\text{ cm}^3\\).",
      "Lös ut \\(r^3\\) och använd sedan \\(r=\\left(r^3\\right)^{1/3}\\) (tredjeroten)."
    ],
    losning: "<ol><li>\\(V=5{,}0\\text{ liter}=5000\\text{ cm}^3\\).</li><li>\\(\\frac{4\\pi r^3}{3}=5000 \\Rightarrow r^3=\\frac{3\\cdot 5000}{4\\pi}\\approx 1193{,}7\\).</li><li>\\(r=1193{,}7^{1/3}\\approx 10{,}6\\) cm.</li></ol><p><strong>Kontroll:</strong> \\(\\frac{4\\pi\\cdot 10{,}6^3}{3}\\approx 4989\\) cm³ \\(\\approx 5\\) liter. ✓</p><p><strong>Svar:</strong> ca 10,6 cm</p>"
  },

  {
    id: "alg-038",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Förändringsfaktor i flera steg",
    niva: "C",
    poang: "2/1/0",
    typ: "redovisning",
    fraga: "<p>Ali köper en bil för 280 000 kr. Man räknar med att bilens värde minskar med 15 % per år.</p><p>a) Vad är bilen värd efter 4 år?</p><p>b) Efter hur många hela år har bilen för första gången förlorat mer än hälften av sitt värde?</p>",
    svar: { facit: "a) ca 146 000 kr &nbsp; b) efter 5 år" },
    ledtradar: [
      "Förändringsfaktorn för en minskning med 15 % är \\(0{,}85\\).",
      "Efter 4 år har värdet multiplicerats med \\(0{,}85\\) fyra gånger.",
      "I b) kan du pröva olika antal år tills \\(0{,}85^n\\lt 0{,}5\\)."
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Förändringsfaktor per år: \\(0{,}85\\).</li><li>Värde efter 4 år: \\(280\\,000\\cdot 0{,}85^4\\approx 146\\,162\\) kr.</li></ol><p><strong>b)</strong> Bilen har förlorat mer än hälften när \\(0{,}85^n\\lt 0{,}5\\). Prövning:</p><ul><li>\\(0{,}85^4\\approx 0{,}522\\) (mer än hälften kvar)</li><li>\\(0{,}85^5\\approx 0{,}444\\) (mindre än hälften kvar)</li></ul><p><strong>Svar:</strong> a) ca 146 000 kr b) Efter 5 år.</p><p>Vanligt fel: att räkna \\(4\\cdot 15\\,\\%=60\\,\\%\\), vilket ger 112 000 kr.</p>",
    bedomning: [
      "+E<sub>M</sub> för korrekt modell, t.ex. \\(280\\,000\\cdot 0{,}85^4\\)",
      "+E<sub>P</sub> för korrekt värde, ca 146 000 kr",
      "+C<sub>PL</sub> för korrekt svar på b), 5 år, med godtagbar motivering (t.ex. prövning av \\(0{,}85^4\\) och \\(0{,}85^5\\))"
    ]
  },

  {
    id: "alg-039",
    kurser: ["1b", "1c"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Potensekvationer i tillämpningar",
    niva: "A",
    poang: "0/2/1",
    typ: "redovisning",
    fraga: "<p>Ett hus köptes för 2,4 miljoner kronor. Sex år senare såldes det för 3,1 miljoner kronor.</p><p>a) Beräkna den genomsnittliga årliga procentuella värdeökningen.</p><p>b) Lisa räknar så här: <em>”Värdet har ökat med \\(\\frac{3{,}1-2{,}4}{2{,}4}\\approx 29{,}2\\,\\%\\) på sex år. Det blir \\(\\frac{29{,}2}{6}\\approx 4{,}9\\,\\%\\) per år.”</em></p><p>Förklara varför Lisas metod inte ger den genomsnittliga årliga procentuella ökningen.</p>",
    svar: { facit: "a) ca 4,4 % per år &nbsp; b) Ökningen sker med förändringsfaktor varje år (ränta-på-ränta), så man kan inte dela den totala procentsatsen med antalet år." },
    ledtradar: [
      "Kalla den årliga förändringsfaktorn \\(x\\). Då gäller \\(2{,}4\\cdot x^6=3{,}1\\).",
      "Lös potensekvationen genom att upphöja båda leden till \\(\\frac{1}{6}\\).",
      "Pröva Lisas svar: vad blir \\(2{,}4\\cdot 1{,}049^6\\)?"
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Låt \\(x\\) vara den årliga förändringsfaktorn: \\(2{,}4\\cdot x^6=3{,}1\\).</li><li>\\(x^6=\\frac{3{,}1}{2{,}4}\\approx 1{,}2917\\).</li><li>\\(x=1{,}2917^{1/6}\\approx 1{,}0436\\) (\\(x\\gt 0\\) eftersom det är en förändringsfaktor).</li><li>Förändringsfaktorn \\(1{,}0436\\) motsvarar en ökning med ca 4,4 % per år.</li></ol><p><strong>b)</strong> Varje års ökning räknas på det värde huset har just det året, inte på ursprungsvärdet. Värdet multipliceras alltså med förändringsfaktorn sex gånger, och ökningarna växer år för år (”ränta på ränta”). Därför ger \\(29{,}2\\,\\%/6\\) en för stor årlig ökning. Kontroll: \\(2{,}4\\cdot 1{,}049^6\\approx 3{,}20\\) miljoner, vilket är mer än 3,1 miljoner.</p><p><strong>Svar:</strong> a) ca 4,4 % per år b) se resonemanget ovan.</p>",
    bedomning: [
      "+C<sub>M</sub> för korrekt uppställd modell, t.ex. \\(2{,}4\\cdot x^6=3{,}1\\) eller \\(x^6=\\frac{3{,}1}{2{,}4}\\)",
      "+C<sub>P</sub> för korrekt lösning med godtagbart svar, ca 4,4 %",
      "+A<sub>R</sub> för korrekt förklaring av att ökningen sker i flera steg med förändringsfaktor (ränta på ränta), gärna med en kontrollberäkning som visar att 4,9 % ger för stort värde"
    ]
  },

  {
    id: "alg-040",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Mönster och generella samband",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>En plattsättare lägger kvadratiska mönster av kakelplattor. I mitten finns en kvadrat med \\(n\\cdot n\\) vita plattor. Runt den läggs en ram av grå plattor. Figuren visar mönstret när \\(n=3\\).</p><p>a) Hur många grå plattor behövs när \\(n=10\\)?</p><p>b) Ställ upp ett uttryck för antalet grå plattor när den vita kvadraten har \\(n\\cdot n\\) plattor.</p><p>c) Visa algebraiskt att det totala antalet plattor, vita och grå, kan skrivas som \\((n+2)^2\\).</p>",
    figur: "<svg viewBox=\"0 0 120 120\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Kakelmönster med 3 gånger 3 vita plattor omgivna av en ram av 16 grå plattor\"><path d=\"M10 10H110V110H10ZM30 30V90H90V30Z\" fill=\"currentColor\" fill-opacity=\"0.3\" fill-rule=\"evenodd\"/><g stroke=\"currentColor\" stroke-width=\"1.5\" fill=\"none\"><rect x=\"10\" y=\"10\" width=\"100\" height=\"100\"/><path d=\"M30 10V110M50 10V110M70 10V110M90 10V110M10 30H110M10 50H110M10 70H110M10 90H110\"/></g></svg>",
    svar: { facit: "a) 44 grå plattor &nbsp; b) \\(4n+4\\) &nbsp; c) \\(n^2+4n+4=(n+2)^2\\)" },
    ledtradar: [
      "Rita mönstret för \\(n=1\\), \\(n=2\\) och \\(n=3\\) och räkna de grå plattorna.",
      "Ramen består av fyra sidor med \\(n\\) plattor vardera plus fyra hörnplattor.",
      "Hela mönstret är en kvadrat. Hur många plattor är en sida? Jämför med summan \\(n^2+(4n+4)\\)."
    ],
    losning: "<p><strong>a)</strong> Ramen har fyra sidor med 10 plattor vardera och fyra hörn: \\(4\\cdot 10+4=44\\) grå plattor.</p><p><strong>b)</strong> Antal grå plattor: \\(G=4n+4\\). (Kontroll \\(n=3\\): \\(4\\cdot 3+4=16\\), vilket stämmer med figuren.)</p><p><strong>c)</strong> Totalt antal plattor = vita + grå \\(=n^2+4n+4\\).</p><p>Hela mönstret är en kvadrat med sidan \\(n+2\\) plattor (en extra platta på varje sida), så totala antalet är också \\((n+2)^2\\). Algebraiskt:</p><p>\\((n+2)^2=(n+2)(n+2)=n^2+2n+2n+4=n^2+4n+4\\).</p><p>Alltså är \\(n^2+(4n+4)=(n+2)^2\\) för alla \\(n\\). ∎</p>",
    bedomning: [
      "+E<sub>PL</sub> för korrekt svar på a), 44 grå plattor",
      "+C<sub>M</sub> för korrekt uttryck för antalet grå plattor, t.ex. \\(4n+4\\), \\(4(n+1)\\) eller \\((n+2)^2-n^2\\) förenklat",
      "+A<sub>R</sub> för fullständig algebraisk visning att \\(n^2+4n+4=(n+2)^2\\), med korrekt multiplikation av parenteserna"
    ]
  },

  {
    id: "alg-041",
    kurser: ["1a"],
    del: "C",
    omrade: "Aritmetik och algebra",
    moment: "Formler och vinstmarginal",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>En cateringfirma ska leverera mat till en fest. Firman har en fast kostnad på 2 400 kr för transport och personal och dessutom en kostnad på 85 kr per kuvert. Kunden betalar 145 kr per kuvert.</p><p>a) Hur många kuvert måste beställas för att firman ska gå jämnt ut?</p><p>b) Firman vill ha en vinstmarginal på minst 20 %, det vill säga vinsten ska vara minst 20 % av intäkterna. Hur många kuvert måste då minst beställas?</p>",
    svar: { facit: "a) 40 kuvert &nbsp; b) minst 78 kuvert" },
    ledtradar: [
      "Låt \\(n\\) vara antalet kuvert. Intäkt: \\(145n\\). Kostnad: \\(2400+85n\\).",
      "Vinst = intäkt − kostnad. I a) ska vinsten vara 0.",
      "I b) ska vinsten vara lika med \\(0{,}20\\cdot 145n\\). Lös ekvationen och tänk på avrundningen."
    ],
    losning: "<p>Låt \\(n\\) vara antalet kuvert. Vinst \\(=145n-(2400+85n)=60n-2400\\).</p><p><strong>a)</strong> Jämnt ut när vinsten är 0: \\(60n-2400=0 \\Rightarrow n=40\\).</p><p><strong>b)</strong></p><ol><li>Vinsten ska vara minst 20 % av intäkten \\(145n\\), dvs. minst \\(0{,}20\\cdot 145n=29n\\).</li><li>Gränsfallet: \\(60n-2400=29n \\Rightarrow 31n=2400 \\Rightarrow n\\approx 77{,}4\\).</li><li>Vid 77 kuvert blir vinsten \\(60\\cdot 77-2400=2220\\) kr, och \\(\\frac{2220}{145\\cdot 77}\\approx 19{,}9\\,\\%\\) – för lite.</li><li>Vid 78 kuvert blir vinsten \\(2280\\) kr och \\(\\frac{2280}{145\\cdot 78}\\approx 20{,}2\\,\\%\\). ✓</li></ol><p><strong>Svar:</strong> a) 40 kuvert b) minst 78 kuvert</p>",
    bedomning: [
      "+C<sub>M</sub> för korrekt svar på a), 40 kuvert, med godtagbar metod",
      "+A<sub>M</sub> för korrekt modell för vinstmarginalen, t.ex. \\(60n-2400=0{,}20\\cdot 145n\\)",
      "+A<sub>PL</sub> för korrekt svar, 78 kuvert, med motiverad avrundning uppåt (t.ex. kontroll av 77 och 78 kuvert)"
    ]
  }

);
