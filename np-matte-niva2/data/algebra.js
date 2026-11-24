// Uppgifter: Taluppfattning, aritmetik och algebra (+ Problemlösning)
// NP Matematik nivå 2a/2b/2c – se SCHEMA.md
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(

  // ===================== DEL A (utan räknare) =====================

  {
    id: "alg-001",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Förenkla uttryck",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Förenkla uttrycket \\(3(x-2)-2(x-5)\\) så långt som möjligt.</p>",
    svar: {
      alternativ: ["\\(x+4\\)", "\\(x-16\\)", "\\(x-4\\)", "\\(5x+4\\)"],
      ratt: 0
    },
    ledtradar: [
      "Multiplicera in talen framför parenteserna, ett i taget.",
      "Var noga med tecknet: \\(-2\\cdot(-5)\\) blir positivt."
    ],
    losning: "<ol><li>Multiplicera in: \\(3(x-2)=3x-6\\) och \\(-2(x-5)=-2x+10\\).</li><li>Sätt ihop: \\(3x-6-2x+10\\).</li><li>Samla termer: \\((3x-2x)+(-6+10)=x+4\\).</li></ol><p><strong>Svar:</strong> \\(x+4\\)</p><p>Vanligt fel är att skriva \\(-2x-10\\), vilket ger \\(x-16\\).</p>"
  },

  {
    id: "alg-002",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Kvadreringsreglerna",
    niva: "E",
    poang: "1/0/0",
    typ: "text",
    fraga: "<p>Utveckla och förenkla \\((x+5)^2\\).</p><p>Skriv ditt svar med <code>^</code> för exponent, t.ex. <code>x^2</code>.</p>",
    svar: {
      godkanda: [
        "x^2+10x+25", "x²+10x+25", "x^2+25+10x", "x²+25+10x",
        "10x+x^2+25", "10x+x²+25", "25+10x+x^2", "25+10x+x²",
        "10x+25+x^2", "10x+25+x²", "25+x^2+10x", "25+x²+10x",
        "xx+10x+25", "x*x+10x+25"
      ]
    },
    ledtradar: [
      "Första kvadreringsregeln: \\((a+b)^2=a^2+2ab+b^2\\).",
      "Här är \\(a=x\\) och \\(b=5\\). Glöm inte dubbla produkten \\(2ab\\)."
    ],
    losning: "<ol><li>Använd \\((a+b)^2=a^2+2ab+b^2\\) med \\(a=x\\), \\(b=5\\).</li><li>\\((x+5)^2=x^2+2\\cdot x\\cdot 5+5^2=x^2+10x+25\\).</li></ol><p><strong>Svar:</strong> \\(x^2+10x+25\\)</p><p>Observera att \\((x+5)^2\\neq x^2+25\\) – mittentermen \\(10x\\) får inte glömmas.</p>"
  },

  {
    id: "alg-003",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Konjugatregeln",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Vilket uttryck är lika med \\((3a+4)(3a-4)\\)?</p>",
    svar: {
      alternativ: ["\\(9a^2-16\\)", "\\(3a^2-16\\)", "\\(9a^2-24a-16\\)", "\\(9a^2+16\\)"],
      ratt: 0
    },
    ledtradar: [
      "Konjugatregeln: \\((a+b)(a-b)=a^2-b^2\\).",
      "Vad blir \\((3a)^2\\)? Kom ihåg att både 3 och \\(a\\) ska kvadreras."
    ],
    losning: "<ol><li>Konjugatregeln ger \\((3a+4)(3a-4)=(3a)^2-4^2\\).</li><li>\\((3a)^2=9a^2\\) och \\(4^2=16\\).</li></ol><p><strong>Svar:</strong> \\(9a^2-16\\)</p>"
  },

  {
    id: "alg-004",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Konjugatregeln",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Beräkna \\(51\\cdot 49\\) utan räknare. Använd gärna konjugatregeln.</p>",
    svar: { varde: 2499, tolerans: 0 },
    ledtradar: [
      "Skriv \\(51=50+1\\) och \\(49=50-1\\).",
      "Då är produkten på formen \\((a+b)(a-b)\\)."
    ],
    losning: "<ol><li>\\(51\\cdot 49=(50+1)(50-1)\\).</li><li>Konjugatregeln: \\(=50^2-1^2=2500-1=2499\\).</li></ol><p><strong>Svar:</strong> \\(2499\\)</p>"
  },

  {
    id: "alg-005",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Linjära ekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\(5x-7=2x+8\\).</p>",
    svar: { varde: 5, tolerans: 0 },
    ledtradar: [
      "Samla alla \\(x\\)-termer på ena sidan och alla tal på den andra.",
      "Subtrahera \\(2x\\) och addera \\(7\\) på båda sidor."
    ],
    losning: "<ol><li>Subtrahera \\(2x\\) från båda leden: \\(3x-7=8\\).</li><li>Addera 7: \\(3x=15\\).</li><li>Dividera med 3: \\(x=5\\).</li></ol><p><strong>Kontroll:</strong> VL \\(=5\\cdot5-7=18\\), HL \\(=2\\cdot5+8=18\\). ✓</p><p><strong>Svar:</strong> \\(x=5\\)</p>"
  },

  {
    id: "alg-006",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Linjära ekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\[\\frac{2x+1}{3}=x-1\\]</p>",
    svar: { varde: 4, tolerans: 0 },
    ledtradar: [
      "Bli av med nämnaren genom att multiplicera båda leden med 3.",
      "Glöm inte att multiplicera <em>hela</em> högerledet med 3."
    ],
    losning: "<ol><li>Multiplicera båda leden med 3: \\(2x+1=3(x-1)=3x-3\\).</li><li>Subtrahera \\(2x\\) och addera 3: \\(4=x\\).</li></ol><p><strong>Kontroll:</strong> VL \\(=\\frac{9}{3}=3\\), HL \\(=4-1=3\\). ✓</p><p><strong>Svar:</strong> \\(x=4\\)</p>"
  },

  {
    id: "alg-007",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Andragradsekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\(x^2-6x=0\\).</p>",
    svar: { varden: [0, 6], tolerans: 0 },
    ledtradar: [
      "Ekvationen saknar konstantterm. Bryt ut \\(x\\).",
      "Nollproduktmetoden: en produkt är noll om någon faktor är noll."
    ],
    losning: "<ol><li>Bryt ut \\(x\\): \\(x(x-6)=0\\).</li><li>Nollproduktmetoden: \\(x=0\\) eller \\(x-6=0\\).</li><li>Alltså \\(x_1=0\\) och \\(x_2=6\\).</li></ol><p><strong>Svar:</strong> \\(x=0\\) och \\(x=6\\)</p><p>Dividera <em>inte</em> med \\(x\\) – då tappar man lösningen \\(x=0\\).</p>"
  },

  {
    id: "alg-008",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Andragradsekvationer",
    niva: "C",
    poang: "0/1/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\((x+3)(x-1)=2x+13\\).</p>",
    svar: { varden: [-4, 4], tolerans: 0 },
    ledtradar: [
      "Multiplicera ihop parenteserna i vänsterledet först.",
      "Förenkla – vissa termer tar ut varandra och du får en ofullständig andragradsekvation."
    ],
    losning: "<ol><li>Utveckla VL: \\((x+3)(x-1)=x^2-x+3x-3=x^2+2x-3\\).</li><li>Ekvationen blir \\(x^2+2x-3=2x+13\\).</li><li>Subtrahera \\(2x\\) och addera 3: \\(x^2=16\\).</li><li>\\(x=\\pm\\sqrt{16}=\\pm 4\\).</li></ol><p><strong>Svar:</strong> \\(x=4\\) och \\(x=-4\\)</p>"
  },

  {
    id: "alg-009",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Andragradsekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\(2x^2-12x+10=0\\) algebraiskt.</p>",
    svar: { varden: [1, 5], tolerans: 0 },
    ledtradar: [
      "För att använda pq-formeln måste koefficienten framför \\(x^2\\) vara 1. Dividera först med 2.",
      "pq-formeln: \\(x=-\\frac{p}{2}\\pm\\sqrt{\\left(\\frac{p}{2}\\right)^2-q}\\)."
    ],
    losning: "<ol><li>Dividera alla termer med 2: \\(x^2-6x+5=0\\).</li><li>pq-formeln med \\(p=-6\\), \\(q=5\\): \\[x=3\\pm\\sqrt{3^2-5}=3\\pm\\sqrt{4}=3\\pm 2\\]</li><li>\\(x_1=3-2=1\\), \\(x_2=3+2=5\\).</li></ol><p><strong>Kontroll:</strong> \\(2\\cdot 1-12+10=0\\) ✓ och \\(2\\cdot 25-60+10=0\\) ✓</p><p><strong>Svar:</strong> \\(x_1=1\\), \\(x_2=5\\)</p>"
  },

  {
    id: "alg-010",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Faktorisering",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Faktorisera uttrycket \\(6x^2+9x\\) så långt som möjligt.</p>",
    svar: {
      alternativ: ["\\(3x(2x+3)\\)", "\\(3(2x^2+3x)\\)", "\\(3x(2x+9)\\)", "\\(6x(x+9)\\)"],
      ratt: 0
    },
    ledtradar: [
      "Leta efter den största gemensamma faktorn i båda termerna – både tal och variabel.",
      "Båda termerna är delbara med 3 och innehåller \\(x\\)."
    ],
    losning: "<ol><li>Största gemensamma faktor för \\(6x^2\\) och \\(9x\\) är \\(3x\\).</li><li>\\(6x^2=3x\\cdot 2x\\) och \\(9x=3x\\cdot 3\\).</li><li>Alltså \\(6x^2+9x=3x(2x+3)\\).</li></ol><p><strong>Svar:</strong> \\(3x(2x+3)\\)</p><p>\\(3(2x^2+3x)\\) är rätt omskrivet men inte faktoriserat så långt som möjligt.</p>"
  },

  {
    id: "alg-011",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Rationella uttryck",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Förenkla uttrycket \\[\\frac{x^2-9}{2x+6}\\] så långt som möjligt.</p>",
    svar: {
      alternativ: ["\\(\\dfrac{x-3}{2}\\)", "\\(\\dfrac{x+3}{2}\\)", "\\(\\dfrac{x-9}{2}\\)", "\\(\\dfrac{x^2-3}{2}\\)"],
      ratt: 0
    },
    ledtradar: [
      "Faktorisera täljaren med konjugatregeln och nämnaren genom att bryta ut 2.",
      "Man får bara förkorta med gemensamma <em>faktorer</em>, inte med termer."
    ],
    losning: "<ol><li>Täljaren: \\(x^2-9=(x+3)(x-3)\\) (konjugatregeln).</li><li>Nämnaren: \\(2x+6=2(x+3)\\).</li><li>\\[\\frac{(x+3)(x-3)}{2(x+3)}=\\frac{x-3}{2}\\] (förkorta med \\(x+3\\), \\(x\\neq -3\\)).</li></ol><p><strong>Svar:</strong> \\(\\dfrac{x-3}{2}\\)</p>"
  },

  {
    id: "alg-012",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Potenser och kvadratrötter",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Beräkna \\[\\frac{2^3\\cdot 2^4}{2^5}+\\sqrt{3}\\cdot\\sqrt{12}\\]</p>",
    svar: { varde: 10, tolerans: 0 },
    ledtradar: [
      "Potenslagar: \\(a^m\\cdot a^n=a^{m+n}\\) och \\(\\frac{a^m}{a^n}=a^{m-n}\\).",
      "\\(\\sqrt{a}\\cdot\\sqrt{b}=\\sqrt{ab}\\)."
    ],
    losning: "<ol><li>\\(\\frac{2^3\\cdot 2^4}{2^5}=\\frac{2^7}{2^5}=2^2=4\\).</li><li>\\(\\sqrt{3}\\cdot\\sqrt{12}=\\sqrt{36}=6\\).</li><li>\\(4+6=10\\).</li></ol><p><strong>Svar:</strong> \\(10\\)</p>"
  },

  {
    id: "alg-013",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Potenser med rationella exponenter",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Beräkna \\(8^{\\frac{2}{3}}+16^{-\\frac{1}{2}}\\) utan räknare.</p>",
    svar: { varde: 4.25, tolerans: 0.001 },
    ledtradar: [
      "\\(a^{\\frac{1}{n}}=\\sqrt[n]{a}\\), så \\(8^{\\frac{2}{3}}=\\left(\\sqrt[3]{8}\\right)^2\\).",
      "Negativ exponent: \\(a^{-n}=\\frac{1}{a^n}\\)."
    ],
    losning: "<ol><li>\\(8^{\\frac{2}{3}}=\\left(8^{\\frac{1}{3}}\\right)^2=2^2=4\\).</li><li>\\(16^{-\\frac{1}{2}}=\\frac{1}{16^{\\frac{1}{2}}}=\\frac{1}{\\sqrt{16}}=\\frac{1}{4}\\).</li><li>\\(4+\\frac{1}{4}=4{,}25\\).</li></ol><p><strong>Svar:</strong> \\(4\\tfrac{1}{4}=4{,}25\\)</p>"
  },

  {
    id: "alg-014",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Potenslagar",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Förenkla \\(\\left(a^2b^{-1}\\right)^3\\cdot a^{-4}b^5\\) så långt som möjligt.</p>",
    svar: {
      alternativ: ["\\(a^2b^2\\)", "\\(a^2b^4\\)", "\\(a^{10}b^8\\)", "\\(a^{-24}b^{-15}\\)"],
      ratt: 0
    },
    ledtradar: [
      "\\((a^m)^n=a^{m\\cdot n}\\) – exponenten 3 gäller båda faktorerna i parentesen.",
      "Vid multiplikation av potenser med samma bas adderas exponenterna."
    ],
    losning: "<ol><li>\\(\\left(a^2b^{-1}\\right)^3=a^{6}b^{-3}\\).</li><li>\\(a^6b^{-3}\\cdot a^{-4}b^5=a^{6+(-4)}b^{-3+5}=a^2b^2\\).</li></ol><p><strong>Svar:</strong> \\(a^2b^2\\)</p>"
  },

  {
    id: "alg-015",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Logaritmer",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Beräkna \\(\\lg 1000-\\lg 0{,}01\\).</p>",
    svar: { varde: 5, tolerans: 0 },
    ledtradar: [
      "\\(\\lg x\\) är det tal som 10 ska upphöjas till för att få \\(x\\).",
      "\\(0{,}01=10^{-2}\\)."
    ],
    losning: "<ol><li>\\(1000=10^3\\) så \\(\\lg 1000=3\\).</li><li>\\(0{,}01=10^{-2}\\) så \\(\\lg 0{,}01=-2\\).</li><li>\\(3-(-2)=5\\).</li></ol><p><strong>Svar:</strong> \\(5\\)</p>"
  },

  {
    id: "alg-016",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Algebraiska bevis",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Visa att skillnaden mellan kvadraterna av två på varandra följande udda heltal alltid är delbar med 8.</p><p><em>Exempel:</em> \\(7^2-5^2=24=8\\cdot 3\\).</p>",
    svar: { facit: "Med de udda talen \\(2n-1\\) och \\(2n+1\\) blir skillnaden \\((2n+1)^2-(2n-1)^2=8n\\), som är delbar med 8." },
    ledtradar: [
      "Ett udda tal kan skrivas \\(2n+1\\) där \\(n\\) är ett heltal. Hur skriver du nästa udda tal (eller det föregående)?",
      "Utveckla med kvadreringsreglerna eller konjugatregeln och förenkla."
    ],
    losning: "<ol><li>Låt de två på varandra följande udda talen vara \\(2n-1\\) och \\(2n+1\\), där \\(n\\) är ett heltal.</li><li>Skillnaden mellan kvadraterna: \\[(2n+1)^2-(2n-1)^2=(4n^2+4n+1)-(4n^2-4n+1)=8n\\]</li><li>Eftersom \\(n\\) är ett heltal är \\(8n\\) alltid en multipel av 8.</li></ol><p><strong>Slutsats:</strong> Skillnaden är alltid delbar med 8, vilket skulle visas.</p><p>Alternativ: konjugatregeln ger \\(\\big((2n+1)-(2n-1)\\big)\\big((2n+1)+(2n-1)\\big)=2\\cdot 4n=8n\\).</p>",
    bedomning: [
      "+C<sub>R</sub> för att korrekt representera två på varandra följande udda tal algebraiskt och ställa upp skillnaden mellan kvadraterna",
      "+A<sub>R</sub> för fullständigt genomfört bevis med korrekt förenkling till \\(8n\\) och en slutsats om att uttrycket är delbart med 8 för alla heltal \\(n\\)"
    ]
  },

  {
    id: "alg-017",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Andragradsekvationer",
    niva: "A",
    poang: "0/0/1",
    typ: "flera",
    fraga: "<p>Bestäm alla värden på konstanten \\(k\\) så att ekvationen \\[x^2+kx+9=0\\] har exakt en lösning.</p>",
    svar: { varden: [-6, 6], tolerans: 0 },
    ledtradar: [
      "Använd pq-formeln med \\(p=k\\) och \\(q=9\\). Vad måste gälla för uttrycket under rottecknet för att det ska bli en enda lösning?",
      "Exakt en lösning när \\(\\left(\\frac{k}{2}\\right)^2-9=0\\)."
    ],
    losning: "<ol><li>pq-formeln ger \\(x=-\\frac{k}{2}\\pm\\sqrt{\\left(\\frac{k}{2}\\right)^2-9}\\).</li><li>Ekvationen har exakt en lösning (dubbelrot) när uttrycket under rottecknet är noll: \\[\\frac{k^2}{4}-9=0\\iff k^2=36\\]</li><li>\\(k=\\pm 6\\).</li></ol><p><strong>Kontroll:</strong> \\(k=6\\) ger \\(x^2+6x+9=(x+3)^2=0\\), endast \\(x=-3\\). \\(k=-6\\) ger \\((x-3)^2=0\\), endast \\(x=3\\). ✓</p><p><strong>Svar:</strong> \\(k=6\\) eller \\(k=-6\\)</p>"
  },

  {
    id: "alg-018",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Linjära ekvationssystem",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Lös ekvationssystemet.</p>\\[\\begin{cases}3x+2y=16\\\\5x-2y=0\\end{cases}\\]",
    svar: {
      alternativ: ["\\(x=2,\\; y=5\\)", "\\(x=5,\\; y=2\\)", "\\(x=2,\\; y=-5\\)", "\\(x=8,\\; y=-4\\)"],
      ratt: 0
    },
    ledtradar: [
      "Additionsmetoden: vad händer med \\(y\\)-termerna om du adderar ekvationerna?",
      "När du har \\(x\\), sätt in värdet i en av ekvationerna för att få \\(y\\)."
    ],
    losning: "<ol><li>Addera ekvationerna ledvis: \\((3x+5x)+(2y-2y)=16+0\\), dvs. \\(8x=16\\), så \\(x=2\\).</li><li>Sätt in \\(x=2\\) i första ekvationen: \\(6+2y=16\\Rightarrow 2y=10\\Rightarrow y=5\\).</li></ol><p><strong>Kontroll</strong> i andra ekvationen: \\(5\\cdot 2-2\\cdot 5=0\\). ✓</p><p><strong>Svar:</strong> \\(x=2\\), \\(y=5\\)</p>"
  },

  {
    id: "alg-019",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Linjära ekvationssystem",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>I koordinatsystemet visas graferna till de två linjerna \\(y=x-1\\) och \\(y=-x+3\\).</p><p>Använd figuren för att bestämma lösningen till ekvationssystemet \\[\\begin{cases}y=x-1\\\\y=-x+3\\end{cases}\\]</p>",
    figur: "<svg viewBox='0 0 280 280' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' font-family='sans-serif' font-size='12'><g stroke-width='0.5' opacity='0.35'><path d='M20 20V260M60 20V260M100 20V260M140 20V260M180 20V260M220 20V260M260 20V260'/><path d='M20 20H260M20 60H260M20 100H260M20 140H260M20 180H260M20 220H260M20 260H260'/></g><g stroke-width='1.2'><path d='M20 180H268'/><path d='M60 268V12'/><path d='M268 180l-6 -3v6z' fill='currentColor'/><path d='M60 12l-3 6h6z' fill='currentColor'/></g><g stroke-width='2'><path d='M20 260L260 20'/><path d='M20 20L260 260' stroke-dasharray='6 4'/></g><g fill='currentColor' stroke='none'><text x='264' y='196'>x</text><text x='66' y='18'>y</text><text x='96' y='195'>1</text><text x='136' y='195'>2</text><text x='176' y='195'>3</text><text x='216' y='195'>4</text><text x='48' y='144'>1</text><text x='48' y='104'>2</text><text x='48' y='64'>3</text><text x='48' y='196'>0</text><text x='212' y='94'>y = x − 1</text><text x='200' y='228' text-anchor='end'>y = −x + 3</text></g></svg>",
    svar: {
      alternativ: ["\\(x=2,\\; y=1\\)", "\\(x=1,\\; y=2\\)", "\\(x=0,\\; y=3\\)", "\\(x=3,\\; y=0\\)"],
      ratt: 0
    },
    ledtradar: [
      "Lösningen till ett ekvationssystem är den punkt som ligger på båda linjerna.",
      "Läs av skärningspunktens koordinater. Kom ihåg ordningen \\((x,\\,y)\\)."
    ],
    losning: "<ol><li>Linjerna skär varandra i punkten \\((2,\\,1)\\).</li><li>Kontroll: \\(y=x-1=2-1=1\\) ✓ och \\(y=-x+3=-2+3=1\\) ✓.</li></ol><p><strong>Svar:</strong> \\(x=2\\), \\(y=1\\)</p>"
  },

  {
    id: "alg-020",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Linjära olikheter",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Lös olikheten \\(7-2x\\geq 1\\).</p>",
    svar: {
      alternativ: ["\\(x\\leq 3\\)", "\\(x\\geq 3\\)", "\\(x\\leq -3\\)", "\\(x\\geq -3\\)"],
      ratt: 0
    },
    ledtradar: [
      "Lös som en ekvation, men tänk på vad som händer med olikhetstecknet.",
      "När man multiplicerar eller dividerar med ett negativt tal vänds olikhetstecknet."
    ],
    losning: "<ol><li>Subtrahera 7: \\(-2x\\geq -6\\).</li><li>Dividera med \\(-2\\) och <strong>vänd</strong> olikhetstecknet: \\(x\\leq 3\\).</li></ol><p><strong>Kontroll:</strong> \\(x=0\\) ger \\(7\\geq 1\\) ✓, \\(x=4\\) ger \\(-1\\geq 1\\) ✗.</p><p><strong>Svar:</strong> \\(x\\leq 3\\)</p>"
  },

  {
    id: "alg-021",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Formler – lösa ut variabel",
    niva: "A",
    poang: "0/0/1",
    typ: "val",
    fraga: "<p>Lös ut \\(x\\) ur sambandet \\[y=\\frac{2x+3}{x-1}\\]</p>",
    svar: {
      alternativ: ["\\(x=\\dfrac{y+3}{y-2}\\)", "\\(x=\\dfrac{y-3}{y-2}\\)", "\\(x=\\dfrac{y+3}{2-y}\\)", "\\(x=\\dfrac{y-3}{2}+1\\)"],
      ratt: 0
    },
    ledtradar: [
      "Multiplicera båda leden med \\(x-1\\) och multiplicera in.",
      "Samla alla termer med \\(x\\) på ena sidan och bryt ut \\(x\\)."
    ],
    losning: "<ol><li>Multiplicera med \\((x-1)\\): \\(y(x-1)=2x+3\\), dvs. \\(xy-y=2x+3\\).</li><li>Samla \\(x\\)-termerna: \\(xy-2x=y+3\\).</li><li>Bryt ut \\(x\\): \\(x(y-2)=y+3\\).</li><li>Dividera: \\(x=\\dfrac{y+3}{y-2}\\) (för \\(y\\neq 2\\)).</li></ol><p><strong>Kontroll:</strong> \\(x=2\\) ger \\(y=\\frac{7}{1}=7\\), och \\(\\frac{7+3}{7-2}=2\\). ✓</p><p><strong>Svar:</strong> \\(x=\\dfrac{y+3}{y-2}\\)</p>"
  },

  {
    id: "alg-022",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Problemlösning",
    moment: "Kvadreringsreglerna",
    niva: "A",
    poang: "0/0/1",
    typ: "tal",
    fraga: "<p>För två tal \\(a\\) och \\(b\\) gäller att \\(a+b=7\\) och \\(ab=10\\).</p><p>Bestäm värdet av \\(a^2+b^2\\).</p>",
    svar: { varde: 29, tolerans: 0 },
    ledtradar: [
      "Du behöver inte bestämma \\(a\\) och \\(b\\). Vad blir \\((a+b)^2\\) om du utvecklar det?",
      "\\((a+b)^2=a^2+2ab+b^2\\). Lös ut \\(a^2+b^2\\)."
    ],
    losning: "<ol><li>Kvadreringsregeln: \\((a+b)^2=a^2+b^2+2ab\\).</li><li>Alltså \\(a^2+b^2=(a+b)^2-2ab=7^2-2\\cdot 10=49-20=29\\).</li></ol><p><strong>Kontroll:</strong> talen är 2 och 5: \\(4+25=29\\). ✓</p><p><strong>Svar:</strong> \\(29\\)</p>"
  },

  // ===================== DEL B (digitala verktyg) =====================

  {
    id: "alg-023",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Linjära ekvationssystem",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Två mobilabonnemang kostar:</p><ul><li><strong>Abonnemang A:</strong> 149 kr per månad plus 0,39 kr per samtalsminut.</li><li><strong>Abonnemang B:</strong> 49 kr per månad plus 1,19 kr per samtalsminut.</li></ul><p>Hur många samtalsminuter per månad ska man ringa för att abonnemangen ska kosta lika mycket?</p>",
    svar: { varde: 125, tolerans: 0.5, enhet: "min" },
    ledtradar: [
      "Teckna kostnaden för varje abonnemang som funktion av antalet minuter \\(x\\).",
      "Rita båda graferna i GeoGebra och bestäm skärningspunkten, eller lös ekvationen \\(149+0{,}39x=49+1{,}19x\\)."
    ],
    losning: "<ol><li>Kostnader: \\(A(x)=149+0{,}39x\\) och \\(B(x)=49+1{,}19x\\).</li><li>I GeoGebra: skriv in båda funktionerna och använd <code>Skärning(A, B)</code>, eller CAS: <code>Lös(149+0.39x=49+1.19x)</code>.</li><li>Algebraiskt: \\(100=0{,}8x\\Rightarrow x=125\\).</li></ol><p><strong>Svar:</strong> 125 minuter (då kostar båda \\(197{,}75\\) kr).</p>"
  },

  {
    id: "alg-024",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Andragradsekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\(0{,}4x^2-2{,}3x-1{,}7=0\\). Svara med två decimaler.</p>",
    svar: { varden: [-0.66, 6.41], tolerans: 0.005 },
    ledtradar: [
      "Rita grafen till \\(y=0{,}4x^2-2{,}3x-1{,}7\\) och bestäm nollställena.",
      "I GeoGebra kan du använda <code>Nollställen(...)</code> eller <code>Lös(...)</code> i CAS."
    ],
    losning: "<ol><li>I GeoGebra: skriv <code>f(x)=0.4x^2-2.3x-1.7</code> och sedan <code>Nollställen(f)</code>. Alternativt CAS: <code>NLös(0.4x^2-2.3x-1.7=0)</code>.</li><li>Lösningarna blir \\(x_1\\approx -0{,}66\\) och \\(x_2\\approx 6{,}41\\).</li><li>(Med pq-formeln efter division med 0,4: \\(x^2-5{,}75x-4{,}25=0\\), \\(x=2{,}875\\pm\\sqrt{2{,}875^2+4{,}25}\\).)</li></ol><p><strong>Svar:</strong> \\(x_1\\approx -0{,}66\\), \\(x_2\\approx 6{,}41\\)</p>"
  },

  {
    id: "alg-025",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Procent och förändringsfaktor",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Lina sätter in pengar på ett sparkonto med räntan 3,5 % per år. Hon gör inga fler insättningar eller uttag.</p><p>Efter hur lång tid har beloppet fördubblats? Svara i år med en decimal.</p>",
    svar: { varde: 20.1, tolerans: 0.1, enhet: "år" },
    ledtradar: [
      "Förändringsfaktorn är \\(1{,}035\\). Startbeloppet spelar ingen roll – kalla det 1.",
      "Lös ekvationen \\(1{,}035^x=2\\) grafiskt: skärning mellan \\(y=1{,}035^x\\) och \\(y=2\\)."
    ],
    losning: "<ol><li>Efter \\(x\\) år har beloppet multiplicerats med \\(1{,}035^x\\). Fördubbling: \\(1{,}035^x=2\\).</li><li>I GeoGebra: rita \\(f(x)=1.035^x\\) och \\(g(x)=2\\), använd <code>Skärning(f, g)</code>. Eller CAS: <code>NLös(1.035^x=2)</code>.</li><li>\\(x\\approx 20{,}1\\).</li></ol><p><strong>Svar:</strong> Efter ca 20,1 år (alltså under det 21:a året).</p>"
  },

  {
    id: "alg-026",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Olikheter",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>För vilka värden på \\(x\\) gäller olikheten \\[0{,}5x^2-2x-3\\lt 0\\,?\\]</p>",
    svar: {
      alternativ: [
        "\\(-1{,}16\\lt x\\lt 5{,}16\\)",
        "\\(x\\lt -1{,}16\\) eller \\(x\\gt 5{,}16\\)",
        "\\(-5{,}16\\lt x\\lt 1{,}16\\)",
        "\\(x\\lt 5{,}16\\)"
      ],
      ratt: 0
    },
    ledtradar: [
      "Rita grafen till \\(y=0{,}5x^2-2x-3\\). Var ligger grafen <em>under</em> \\(x\\)-axeln?",
      "Bestäm nollställena – olikheten gäller mellan eller utanför dem?"
    ],
    losning: "<ol><li>I GeoGebra: rita \\(f(x)=0.5x^2-2x-3\\) och bestäm <code>Nollställen(f)</code>: \\(x\\approx -1{,}16\\) och \\(x\\approx 5{,}16\\).</li><li>Grafen är en parabel som öppnar sig uppåt (positiv \\(x^2\\)-koefficient), så den ligger under \\(x\\)-axeln <em>mellan</em> nollställena.</li><li>(Exakt: \\(x=2\\pm\\sqrt{10}\\).) Man kan också skriva olikheten direkt i GeoGebra CAS: <code>Lös(0.5x^2-2x-3&lt;0)</code>.</li></ol><p><strong>Svar:</strong> \\(-1{,}16\\lt x\\lt 5{,}16\\)</p>"
  },

  {
    id: "alg-027",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Ekvationer – grafisk lösning",
    niva: "C",
    poang: "0/1/0",
    typ: "flera",
    fraga: "<p>Lös ekvationen \\(2^x=3x+1\\). Svara med två decimaler där det behövs.</p>",
    svar: { varden: [0, 3.54], tolerans: 0.005 },
    ledtradar: [
      "Ekvationen kan inte lösas med vanliga algebraiska metoder. Rita båda leden som funktioner.",
      "Det finns mer än en skärningspunkt – zooma ut och undersök hela grafen."
    ],
    losning: "<ol><li>Rita \\(f(x)=2^x\\) och \\(g(x)=3x+1\\) i GeoGebra.</li><li>Använd <code>Skärning(f, g)</code> (eller <code>NLös(2^x=3x+1)</code> i CAS). Graferna skär varandra i två punkter.</li><li>\\(x_1=0\\) (kontroll: \\(2^0=1=3\\cdot0+1\\)) och \\(x_2\\approx 3{,}54\\).</li></ol><p><strong>Svar:</strong> \\(x_1=0\\), \\(x_2\\approx 3{,}54\\)</p>"
  },

  {
    id: "alg-028",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Procent och förändringsfaktor",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Priset på en biobiljett var 18,50 kr år 1975. Sju år senare var priset 27,90 kr.</p><p>Med hur många procent ökade priset i genomsnitt per år under denna period? Svara med en decimal.</p>",
    svar: { varde: 6.0, tolerans: 0.1, enhet: "%" },
    ledtradar: [
      "Kalla den genomsnittliga årliga förändringsfaktorn för \\(a\\). Då gäller \\(18{,}50\\cdot a^7=27{,}90\\).",
      "Lös ekvationen grafiskt eller med CAS, och översätt förändringsfaktorn till procent."
    ],
    losning: "<ol><li>Ekvation: \\(18{,}50\\cdot a^7=27{,}90\\).</li><li>GeoGebra CAS: <code>NLös(18.5a^7=27.9, a)</code> ger \\(a\\approx 1{,}0605\\). (Eller \\(a=\\left(\\frac{27{,}90}{18{,}50}\\right)^{1/7}\\).)</li><li>Förändringsfaktorn \\(1{,}0605\\) motsvarar en ökning med ca 6,0 % per år.</li></ol><p><strong>Svar:</strong> ca 6,0 % per år</p><p>Obs: att dela den totala ökningen (ca 50,8 %) med 7 ger fel svar, eftersom procentuella ökningar inte adderas.</p>"
  },

  {
    id: "alg-029",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Formler och modeller",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>En bils bromssträcka \\(s\\) meter på torr asfalt kan beräknas med formeln \\[s=0{,}2v+0{,}005v^2\\] där \\(v\\) är bilens hastighet i km/h.</p><p>En bilist bromsar och bromssträckan blir 60 meter. Vilken hastighet hade bilen? Svara i hela km/h.</p>",
    svar: { facit: "ca 91 km/h" },
    ledtradar: [
      "Sätt \\(s=60\\) och lös ekvationen \\(0{,}2v+0{,}005v^2=60\\).",
      "Grafiskt: skärning mellan \\(y=0{,}2x+0{,}005x^2\\) och \\(y=60\\). Bara positiv lösning är rimlig."
    ],
    losning: "<ol><li>Ekvation: \\(0{,}005v^2+0{,}2v=60\\).</li><li>I GeoGebra: rita \\(f(x)=0.2x+0.005x^2\\) och \\(g(x)=60\\), använd <code>Skärning(f, g)</code>. Eller CAS: <code>NLös(0.2v+0.005v^2=60, v)</code>.</li><li>Lösningarna är \\(v\\approx 91{,}4\\) och \\(v\\approx -131{,}4\\). Den negativa lösningen är inte rimlig.</li></ol><p><strong>Svar:</strong> Bilen hade hastigheten ca 91 km/h.</p>",
    bedomning: [
      "+E<sub>M</sub> för korrekt uppställd ekvation \\(0{,}2v+0{,}005v^2=60\\) (eller motsvarande grafisk metod)",
      "+C<sub>P</sub> för korrekt lösning med godtagbart svar (91 km/h) där den negativa lösningen förkastas"
    ]
  },

  {
    id: "alg-030",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Exponentialekvationer",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lös ekvationen \\(3\\cdot 10^{0{,}2x}=50\\). Svara med två decimaler.</p>",
    svar: { varde: 6.11, tolerans: 0.005 },
    ledtradar: [
      "Dividera först med 3. Använd sedan definitionen av \\(\\lg\\): om \\(10^y=a\\) så är \\(y=\\lg a\\).",
      "Du kan också lösa ekvationen grafiskt eller med <code>NLös</code> i GeoGebra."
    ],
    losning: "<ol><li>Dividera med 3: \\(10^{0{,}2x}=\\frac{50}{3}\\).</li><li>Logaritmera: \\(0{,}2x=\\lg\\frac{50}{3}\\approx 1{,}2218\\).</li><li>\\(x=\\frac{1{,}2218}{0{,}2}\\approx 6{,}11\\).</li><li>I GeoGebra CAS: <code>NLös(3*10^(0.2x)=50)</code> ger samma svar.</li></ol><p><strong>Svar:</strong> \\(x\\approx 6{,}11\\)</p>"
  },

  {
    id: "alg-031",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Problemlösning",
    moment: "Exponentialekvationer",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Två bakteriekulturer odlas i ett laboratorium. Antalet bakterier efter \\(t\\) timmar kan beskrivas med</p><p>Kultur A: \\(N_A=500\\cdot 1{,}12^t\\) &nbsp;&nbsp; Kultur B: \\(N_B=2000\\cdot 1{,}05^t\\)</p><p><strong>a)</strong> Efter hur lång tid är kulturerna lika stora?</p><p><strong>b)</strong> Hur stor skulle den procentuella ökningen per timme för kultur A behöva vara för att kulturerna ska vara lika stora redan efter 10 timmar?</p>",
    svar: { facit: "a) ca 21,5 timmar &nbsp; b) ca 20,6 % per timme" },
    ledtradar: [
      "a) Lös \\(500\\cdot 1{,}12^t=2000\\cdot 1{,}05^t\\) grafiskt.",
      "b) Kalla den nya förändringsfaktorn \\(a\\) och lös \\(500\\cdot a^{10}=2000\\cdot 1{,}05^{10}\\)."
    ],
    losning: "<p><strong>a)</strong></p><ol><li>Rita \\(f(x)=500\\cdot 1.12^x\\) och \\(g(x)=2000\\cdot 1.05^x\\) i GeoGebra och använd <code>Skärning(f, g)</code>.</li><li>Skärningspunkt vid \\(t\\approx 21{,}5\\).</li></ol><p><strong>b)</strong></p><ol><li>Efter 10 h har B: \\(2000\\cdot 1{,}05^{10}\\approx 3258\\) bakterier.</li><li>Ekvation: \\(500\\cdot a^{10}=2000\\cdot 1{,}05^{10}\\), dvs. \\(a^{10}=4\\cdot 1{,}05^{10}\\).</li><li>CAS: <code>NLös(500a^10=2000*1.05^10, a)</code> ger \\(a\\approx 1{,}206\\). (Exakt: \\(a=1{,}05\\cdot 4^{0{,}1}\\).)</li><li>Förändringsfaktorn \\(1{,}206\\) motsvarar en ökning med ca 20,6 % per timme.</li></ol><p><strong>Svar:</strong> a) ca 21,5 timmar &nbsp; b) ca 20,6 % per timme</p>",
    bedomning: [
      "+C<sub>P</sub> för korrekt lösning av a)-uppgiften (ca 21,5 h)",
      "+A<sub>PL</sub> för korrekt uppställd ekvation i b) och korrekt svar (ca 20,6 %)"
    ]
  },

  // ===================== DEL C (enkel räknare) =====================

  {
    id: "alg-032",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Procent",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En jacka kostar 1 200 kr. Under en rea sänks priset med 35 %.</p><p>Vad kostar jackan på rean?</p>",
    svar: { varde: 780, tolerans: 0.5, enhet: "kr" },
    ledtradar: [
      "Om priset sänks med 35 % återstår \\(100-35=65\\) % av priset.",
      "Förändringsfaktorn är \\(0{,}65\\)."
    ],
    losning: "<ol><li>Förändringsfaktor vid sänkning med 35 %: \\(1-0{,}35=0{,}65\\).</li><li>Nytt pris: \\(1200\\cdot 0{,}65=780\\) kr.</li></ol><p><strong>Svar:</strong> 780 kr</p>"
  },

  {
    id: "alg-033",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Procent och förändringsfaktor",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En ny bil kostar 280 000 kr. Bilens värde antas minska med 15 % per år.</p><p>Vad är bilens värde efter 6 år? Avrunda till hela hundratal kronor.</p>",
    svar: { varde: 105600, tolerans: 50, enhet: "kr" },
    ledtradar: [
      "Förändringsfaktorn per år är \\(0{,}85\\).",
      "Efter 6 år har värdet multiplicerats med \\(0{,}85\\) sex gånger."
    ],
    losning: "<ol><li>Förändringsfaktor per år: \\(1-0{,}15=0{,}85\\).</li><li>Värde efter 6 år: \\(280\\,000\\cdot 0{,}85^6\\approx 280\\,000\\cdot 0{,}3771\\approx 105\\,600\\) kr.</li></ol><p><strong>Svar:</strong> ca 105 600 kr</p><p>Vanligt fel: att räkna \\(6\\cdot 15=90\\) % minskning.</p>"
  },

  {
    id: "alg-034",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Procent och förändringsfaktor",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Hyran för en lägenhet har höjts med 4 % per år under tre år. Nu är hyran 7 874 kr per månad.</p><p>Vad var hyran för tre år sedan? Svara i hela kronor.</p>",
    svar: { varde: 7000, tolerans: 0.5, enhet: "kr" },
    ledtradar: [
      "Kalla den ursprungliga hyran \\(x\\). Teckna en ekvation med förändringsfaktorn \\(1{,}04\\).",
      "\\(x\\cdot 1{,}04^3=7874\\)."
    ],
    losning: "<ol><li>Ekvation: \\(x\\cdot 1{,}04^3=7874\\).</li><li>\\(1{,}04^3=1{,}124864\\).</li><li>\\(x=\\frac{7874}{1{,}124864}\\approx 7000\\) kr.</li></ol><p><strong>Svar:</strong> ca 7 000 kr</p><p>Vanligt fel: att räkna \\(7874\\cdot 0{,}96^3\\) eller att dra bort 12 %.</p>"
  },

  {
    id: "alg-035",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Procent och förändringsfaktor",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Priset på en vara höjs först med 20 %. Senare sänks det nya priset med 20 %.</p><p>Hur har priset förändrats totalt jämfört med det ursprungliga priset?</p>",
    svar: {
      alternativ: ["Det har minskat med 4 %", "Det är oförändrat", "Det har minskat med 2 %", "Det har ökat med 4 %"],
      ratt: 0
    },
    ledtradar: [
      "Använd förändringsfaktorer: en höjning med 20 % ger faktorn \\(1{,}20\\).",
      "Den totala förändringsfaktorn får man genom att multiplicera faktorerna."
    ],
    losning: "<ol><li>Förändringsfaktorer: \\(1{,}20\\) och \\(0{,}80\\).</li><li>Total förändringsfaktor: \\(1{,}20\\cdot 0{,}80=0{,}96\\).</li><li>\\(0{,}96\\) betyder att 96 % av priset finns kvar, alltså en minskning med 4 %.</li></ol><p><strong>Svar:</strong> Priset har minskat med 4 %.</p><p>Sänkningen räknas på ett större belopp än höjningen, därför blir det inte oförändrat.</p>"
  },

  {
    id: "alg-036",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Linjära ekvationssystem",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>En familj med 3 vuxna och 2 barn betalar 840 kr i entré till ett badhus. En annan familj med 2 vuxna och 5 barn betalar 1 000 kr.</p><p>Vad kostar en vuxenbiljett och vad kostar en barnbiljett?</p>",
    svar: { facit: "Vuxenbiljett 200 kr, barnbiljett 120 kr" },
    ledtradar: [
      "Kalla priset för en vuxenbiljett \\(x\\) kr och för en barnbiljett \\(y\\) kr. Teckna två ekvationer.",
      "Lös systemet med additionsmetoden, t.ex. genom att göra \\(x\\)-koefficienterna lika (multiplicera med 2 respektive 3)."
    ],
    losning: "<ol><li>Låt \\(x\\) = pris vuxen och \\(y\\) = pris barn (kr). \\[\\begin{cases}3x+2y=840\\\\2x+5y=1000\\end{cases}\\]</li><li>Multiplicera första ekvationen med 2 och andra med 3: \\(6x+4y=1680\\) och \\(6x+15y=3000\\).</li><li>Subtrahera: \\(11y=1320\\Rightarrow y=120\\).</li><li>Sätt in: \\(3x+240=840\\Rightarrow 3x=600\\Rightarrow x=200\\).</li></ol><p><strong>Kontroll:</strong> \\(2\\cdot 200+5\\cdot 120=400+600=1000\\). ✓</p><p><strong>Svar:</strong> Vuxenbiljett 200 kr, barnbiljett 120 kr.</p>",
    bedomning: [
      "+E<sub>M</sub> för korrekt uppställt ekvationssystem",
      "+C<sub>P</sub> för korrekt lösning av systemet med korrekt svar (200 kr och 120 kr)"
    ]
  },

  {
    id: "alg-037",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Andragradsekvationer",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>En boll kastas upp från en balkong. Bollens höjd \\(h\\) meter över marken efter \\(t\\) sekunder kan beskrivas med \\[h=-4{,}9t^2+12t+1{,}5\\]</p><p>Hur lång tid tar det innan bollen slår i marken? Svara med två decimaler.</p>",
    svar: { facit: "ca 2,57 s" },
    ledtradar: [
      "Bollen slår i marken när \\(h=0\\).",
      "Dividera ekvationen med \\(-4{,}9\\) och använd pq-formeln. Endast positiv tid är rimlig."
    ],
    losning: "<ol><li>Sätt \\(h=0\\): \\(-4{,}9t^2+12t+1{,}5=0\\).</li><li>Dividera med \\(-4{,}9\\): \\(t^2-2{,}449t-0{,}3061=0\\) (ungefärliga värden; behåll gärna fler decimaler i räknaren).</li><li>pq-formeln: \\(t=1{,}2245\\pm\\sqrt{1{,}2245^2+0{,}3061}\\approx 1{,}2245\\pm 1{,}3437\\).</li><li>\\(t_1\\approx 2{,}57\\) och \\(t_2\\approx -0{,}12\\). Den negativa lösningen förkastas.</li></ol><p><strong>Svar:</strong> ca 2,57 s</p>",
    bedomning: [
      "+E<sub>M</sub> för insikt om att \\(h=0\\) ger ekvationen \\(-4{,}9t^2+12t+1{,}5=0\\)",
      "+C<sub>P</sub> för korrekt lösning med godtagbart svar (ca 2,57 s) där den negativa lösningen förkastas"
    ]
  },

  {
    id: "alg-038",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Andragradsekvationer",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>En rektangulär gräsmatta är 8 m bred och 12 m lång. Runt gräsmattan ska man lägga en grusgång som är lika bred överallt.</p><p>Gräsmattan och gången ska tillsammans ha arean 165 m². Hur bred blir gången?</p>",
    svar: { facit: "Gången blir 1,5 m bred." },
    ledtradar: [
      "Kalla gångens bredd \\(x\\) m. Hur bred och hur lång blir hela ytan (gräsmatta + gång)? Gången finns på båda sidor.",
      "Ekvationen blir \\((8+2x)(12+2x)=165\\). Förenkla och använd pq-formeln."
    ],
    losning: "<ol><li>Låt gångens bredd vara \\(x\\) m. Hela ytan är \\((8+2x)\\) m bred och \\((12+2x)\\) m lång.</li><li>Ekvation: \\((8+2x)(12+2x)=165\\).</li><li>Utveckla: \\(96+16x+24x+4x^2=165\\Rightarrow 4x^2+40x-69=0\\).</li><li>Dividera med 4: \\(x^2+10x-17{,}25=0\\).</li><li>pq-formeln: \\(x=-5\\pm\\sqrt{25+17{,}25}=-5\\pm\\sqrt{42{,}25}=-5\\pm 6{,}5\\).</li><li>\\(x_1=1{,}5\\), \\(x_2=-11{,}5\\) (orimlig, en bredd kan inte vara negativ).</li></ol><p><strong>Kontroll:</strong> \\(11\\cdot 15=165\\). ✓</p><p><strong>Svar:</strong> Gången blir 1,5 m bred.</p>",
    bedomning: [
      "+C<sub>PL</sub> för korrekt uppställd ekvation, t.ex. \\((8+2x)(12+2x)=165\\)",
      "+A<sub>PL</sub> för korrekt lösning av ekvationen med korrekt svar (1,5 m) där den negativa lösningen förkastas"
    ]
  },

  {
    id: "alg-039",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Exponentialekvationer och logaritmer",
    niva: "E",
    poang: "1/0/0",
    typ: "redovisning",
    fraga: "<p>Lös ekvationen \\(5\\cdot 3^x=200\\). Svara med två decimaler.</p>",
    svar: { facit: "\\(x=\\frac{\\lg 40}{\\lg 3}\\approx 3{,}36\\)" },
    ledtradar: [
      "Dividera först båda leden med 5.",
      "Logaritmera båda leden och använd \\(\\lg a^x=x\\cdot\\lg a\\)."
    ],
    losning: "<ol><li>Dividera med 5: \\(3^x=40\\).</li><li>Logaritmera: \\(\\lg 3^x=\\lg 40\\Rightarrow x\\cdot\\lg 3=\\lg 40\\).</li><li>\\(x=\\frac{\\lg 40}{\\lg 3}\\approx\\frac{1{,}6021}{0{,}4771}\\approx 3{,}36\\).</li></ol><p><strong>Kontroll:</strong> \\(5\\cdot 3^{3{,}36}\\approx 200\\). ✓</p><p><strong>Svar:</strong> \\(x\\approx 3{,}36\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt lösning med logaritmer, \\(x=\\frac{\\lg 40}{\\lg 3}\\approx 3{,}36\\)"
    ]
  },

  {
    id: "alg-040",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Logaritmer",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En sjös surhetsgrad mäts med pH-värdet, som definieras som \\[\\text{pH}=-\\lg[\\text{H}^+]\\] där \\([\\text{H}^+]\\) är vätejonkoncentrationen i mol/liter.</p><p>Sjö A har pH 4,5 och sjö B har pH 6,0. Hur många gånger större är vätejonkoncentrationen i sjö A än i sjö B? Svara med en decimal.</p>",
    svar: { varde: 31.6, tolerans: 0.1, enhet: "gånger" },
    ledtradar: [
      "Lös ut \\([\\text{H}^+]\\) ur formeln: \\([\\text{H}^+]=10^{-\\text{pH}}\\).",
      "Bilda kvoten mellan koncentrationerna och använd potenslagarna."
    ],
    losning: "<ol><li>\\([\\text{H}^+]=10^{-\\text{pH}}\\).</li><li>Sjö A: \\(10^{-4{,}5}\\), sjö B: \\(10^{-6{,}0}\\).</li><li>Kvot: \\(\\frac{10^{-4{,}5}}{10^{-6{,}0}}=10^{-4{,}5+6{,}0}=10^{1{,}5}\\approx 31{,}6\\).</li></ol><p><strong>Svar:</strong> ca 31,6 gånger större</p><p>Vanligt fel: att svara 1,5 gånger. Skalan är logaritmisk – en enhet i pH motsvarar en faktor 10.</p>"
  },

  {
    id: "alg-041",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Exponentialekvationer och logaritmer",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Ahmed sätter in 10 000 kr på ett konto med räntan 2,5 % per år.</p><p>Hur många hela år tar det innan beloppet har vuxit till minst 15 000 kr? Lös uppgiften med logaritmer.</p>",
    svar: { facit: "17 år (\\(x\\approx 16{,}4\\))" },
    ledtradar: [
      "Ställ upp ekvationen \\(10\\,000\\cdot 1{,}025^x=15\\,000\\).",
      "Dividera med 10 000 och logaritmera båda leden. Tänk på att räntan bara läggs till vid varje årsskifte."
    ],
    losning: "<ol><li>Ekvation: \\(10\\,000\\cdot 1{,}025^x=15\\,000\\Rightarrow 1{,}025^x=1{,}5\\).</li><li>Logaritmera: \\(x\\cdot\\lg 1{,}025=\\lg 1{,}5\\).</li><li>\\(x=\\frac{\\lg 1{,}5}{\\lg 1{,}025}\\approx\\frac{0{,}17609}{0{,}010724}\\approx 16{,}4\\).</li><li>Efter 16 år: \\(10\\,000\\cdot 1{,}025^{16}\\approx 14\\,845\\) kr (för lite). Efter 17 år: \\(\\approx 15\\,216\\) kr.</li></ol><p><strong>Svar:</strong> Det tar 17 år.</p>",
    bedomning: [
      "+E<sub>M</sub> för korrekt uppställd ekvation \\(10\\,000\\cdot 1{,}025^x=15\\,000\\) (eller motsvarande)",
      "+C<sub>P</sub> för korrekt lösning med logaritmer och korrekt tolkat svar (17 år)"
    ]
  },

  {
    id: "alg-042",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Algebraiska bevis",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>Ett pris höjs med \\(p\\) % och det nya priset sänks sedan med \\(p\\) %, där \\(p>0\\).</p><p>Elsa påstår: <em>”Slutpriset blir alltid lägre än det ursprungliga priset.”</em></p><p>Visa att Elsa har rätt och bestäm med hur många procent priset totalt har minskat, uttryckt i \\(p\\).</p>",
    svar: { facit: "Total förändringsfaktor \\(1-\\frac{p^2}{10\\,000}<1\\). Priset minskar med \\(\\frac{p^2}{100}\\) %." },
    ledtradar: [
      "Skriv förändringsfaktorerna i \\(p\\): höjningen ger \\(1+\\frac{p}{100}\\). Vad ger sänkningen?",
      "Multiplicera faktorerna med konjugatregeln och tolka resultatet."
    ],
    losning: "<ol><li>Förändringsfaktorer: \\(1+\\frac{p}{100}\\) och \\(1-\\frac{p}{100}\\).</li><li>Total förändringsfaktor (konjugatregeln): \\[\\left(1+\\frac{p}{100}\\right)\\left(1-\\frac{p}{100}\\right)=1-\\frac{p^2}{10\\,000}\\]</li><li>Eftersom \\(p>0\\) är \\(\\frac{p^2}{10\\,000}>0\\), så den totala förändringsfaktorn är mindre än 1. Slutpriset är alltså alltid lägre – Elsa har rätt.</li><li>Minskningen är \\(\\frac{p^2}{10\\,000}=\\frac{p^2}{100}\\cdot\\frac{1}{100}\\), dvs. \\(\\frac{p^2}{100}\\) procent.</li></ol><p><strong>Exempel:</strong> \\(p=20\\) ger minskningen \\(\\frac{400}{100}=4\\) %, vilket stämmer med \\(1{,}2\\cdot 0{,}8=0{,}96\\).</p><p><strong>Svar:</strong> Priset minskar alltid, med \\(\\frac{p^2}{100}\\) %.</p>",
    bedomning: [
      "+C<sub>R</sub> för att uttrycka förändringsfaktorerna i \\(p\\) och teckna den totala förändringsfaktorn",
      "+A<sub>R</sub> för korrekt förenkling till \\(1-\\frac{p^2}{10\\,000}\\) och en välgrundad slutsats om att den är mindre än 1 för alla \\(p>0\\)",
      "+A<sub>K</sub> för korrekt tolkning av minskningen som \\(\\frac{p^2}{100}\\) % med en välstrukturerad och fullständig redovisning"
    ]
  },

  {
    id: "alg-043",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Andragradsekvationer",
    niva: "C",
    poang: "0/1/0",
    typ: "redovisning",
    fraga: "<p>Produkten av två på varandra följande positiva jämna heltal är 528.</p><p>Vilka är talen?</p>",
    svar: { facit: "22 och 24" },
    ledtradar: [
      "Kalla det minsta talet \\(x\\). Vad heter då nästa jämna tal?",
      "Ekvationen \\(x(x+2)=528\\) leder till en andragradsekvation."
    ],
    losning: "<ol><li>Låt talen vara \\(x\\) och \\(x+2\\). Ekvation: \\(x(x+2)=528\\).</li><li>\\(x^2+2x-528=0\\).</li><li>pq-formeln: \\(x=-1\\pm\\sqrt{1+528}=-1\\pm\\sqrt{529}=-1\\pm 23\\).</li><li>\\(x=22\\) (lösningen \\(x=-24\\) är inte positiv).</li></ol><p><strong>Kontroll:</strong> \\(22\\cdot 24=528\\). ✓</p><p><strong>Svar:</strong> Talen är 22 och 24.</p>",
    bedomning: [
      "+C<sub>PL</sub> för korrekt uppställd och löst andragradsekvation, t.ex. \\(x(x+2)=528\\), med korrekt svar 22 och 24"
    ]
  },

  {
    id: "alg-044",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Problemlösning",
    moment: "Problemlösning med ekvationer",
    niva: "A",
    poang: "0/1/2",
    typ: "redovisning",
    fraga: "<p>En grupp vänner ska hyra en stuga och dela kostnaden 7 200 kr lika. Två personer i gruppen hoppar av, och då måste var och en av de övriga betala 120 kr mer.</p><p>Hur många personer var det i gruppen från början?</p>",
    svar: { facit: "12 personer" },
    ledtradar: [
      "Kalla antalet personer från början \\(n\\). Vad betalar var och en från början? Efter att två hoppat av?",
      "Skillnaden mellan de två beloppen är 120 kr: \\(\\frac{7200}{n-2}-\\frac{7200}{n}=120\\). Multiplicera med \\(n(n-2)\\)."
    ],
    losning: "<ol><li>Låt \\(n\\) vara antalet personer från början. Kostnad per person: \\(\\frac{7200}{n}\\) kr från början och \\(\\frac{7200}{n-2}\\) kr efteråt.</li><li>Ekvation: \\[\\frac{7200}{n-2}-\\frac{7200}{n}=120\\]</li><li>Multiplicera med \\(n(n-2)\\): \\(7200n-7200(n-2)=120n(n-2)\\Rightarrow 14\\,400=120n^2-240n\\).</li><li>Dividera med 120: \\(n^2-2n-120=0\\).</li><li>pq-formeln: \\(n=1\\pm\\sqrt{1+120}=1\\pm 11\\), dvs. \\(n=12\\) eller \\(n=-10\\) (orimlig).</li></ol><p><strong>Kontroll:</strong> \\(\\frac{7200}{12}=600\\) kr och \\(\\frac{7200}{10}=720\\) kr; skillnad 120 kr. ✓</p><p><strong>Svar:</strong> Det var 12 personer från början.</p>",
    bedomning: [
      "+C<sub>PL</sub> för korrekt uppställd ekvation, t.ex. \\(\\frac{7200}{n-2}-\\frac{7200}{n}=120\\)",
      "+A<sub>PL</sub> för korrekt omskrivning till andragradsekvation och korrekt lösning",
      "+A<sub>K</sub> för välstrukturerad redovisning med tydligt införda beteckningar, förkastad negativ lösning och kontrollerat svar (12 personer)"
    ]
  },

  {
    id: "alg-045",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Taluppfattning, aritmetik och algebra",
    moment: "Potenser med rationella exponenter",
    niva: "C",
    poang: "0/1/0",
    typ: "redovisning",
    fraga: "<p>Enligt Keplers tredje lag gäller för planeterna i vårt solsystem att \\[T^2=a^3\\] där \\(T\\) är omloppstiden i år och \\(a\\) är medelavståndet till solen i astronomiska enheter (AE).</p><p>Mars har omloppstiden 1,88 år. Bestäm Mars medelavstånd till solen. Svara med två decimaler.</p>",
    svar: { facit: "ca 1,52 AE" },
    ledtradar: [
      "Lös ut \\(a\\): \\(a^3=T^2\\) ger \\(a=\\left(T^2\\right)^{\\frac{1}{3}}=T^{\\frac{2}{3}}\\).",
      "Beräkna först \\(1{,}88^2\\) och ta sedan tredjeroten (upphöj till \\(\\frac{1}{3}\\))."
    ],
    losning: "<ol><li>\\(a^3=T^2\\Rightarrow a=T^{\\frac{2}{3}}\\).</li><li>\\(T^2=1{,}88^2=3{,}5344\\).</li><li>\\(a=3{,}5344^{\\frac{1}{3}}\\approx 1{,}52\\) AE.</li></ol><p><strong>Kontroll:</strong> \\(1{,}52^3\\approx 3{,}51\\approx 1{,}88^2\\). ✓</p><p><strong>Svar:</strong> ca 1,52 AE</p>",
    bedomning: [
      "+C<sub>P</sub> för korrekt omskrivning till \\(a=T^{\\frac{2}{3}}\\) (eller motsvarande) och korrekt svar ca 1,52 AE"
    ]
  }
);
