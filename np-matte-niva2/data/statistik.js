// Statistik och sannolikhet – NP Matematik nivå 2a/2b/2c
// Standardavvikelse: genomgående stickprovsstandardavvikelse s (division med n − 1),
// i linje med NP:s formelblad. I GeoGebra: SampleSD(lista), i kalkylblad: STDAV.S(...).
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(
  // ===================== DEL A =====================
  {
    id: "sta-001",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Lägesmått",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Åtta elever fick svara på hur många timmar de tränade förra veckan. Svaren blev</p>\\[4,\\; 7,\\; 2,\\; 9,\\; 7,\\; 5,\\; 3,\\; 8\\]<p>Bestäm medianen.</p>",
    svar: { varde: 6, tolerans: 0, enhet: "timmar" },
    ledtradar: [
      "Börja med att sortera värdena i storleksordning.",
      "Med ett jämnt antal värden finns det två värden i mitten. Medianen är medelvärdet av dessa två."
    ],
    losning: "<ol><li>Sortera: \\(2,\\,3,\\,4,\\,5,\\,7,\\,7,\\,8,\\,9\\).</li><li>Det finns 8 värden, så de två mittersta är det 4:e och 5:e värdet: \\(5\\) och \\(7\\).</li><li>Medianen är \\(\\dfrac{5+7}{2}=6\\).</li></ol><p><strong>Svar:</strong> Medianen är 6 timmar.</p>"
  },
  {
    id: "sta-002",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Födelsevikten hos nyfödda barn i ett land är normalfördelad med medelvärdet 3500 g och standardavvikelsen 500 g.</p><p>Vilken födelsevikt motsvarar ungefär den 84:e percentilen?</p>",
    svar: { varde: 4000, tolerans: 0, enhet: "g" },
    ledtradar: [
      "Den 84:e percentilen är den vikt som 84 % av barnen väger mindre än.",
      "Hur stor andel ligger under \\(\\mu\\)? Hur stor andel ligger mellan \\(\\mu\\) och \\(\\mu + \\sigma\\)?"
    ],
    losning: "<ol><li>Den 84:e percentilen är det värde som 84 % av observationerna ligger under.</li><li>I en normalfördelning ligger 50 % under medelvärdet och ca 34 % mellan \\(\\mu\\) och \\(\\mu+\\sigma\\) (hälften av 68 %).</li><li>Alltså ligger ca \\(50\\,\\% + 34\\,\\% = 84\\,\\%\\) under \\(\\mu + \\sigma = 3500 + 500 = 4000\\) g.</li></ol><p><strong>Svar:</strong> Ungefär 4000 g</p>"
  },
  {
    id: "sta-003",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Lägesmått",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Eleverna i en klass fick svara på hur många syskon de har. Resultatet visas i tabellen.</p><table><tr><th>Antal syskon</th><td>0</td><td>1</td><td>2</td><td>3</td></tr><tr><th>Antal elever</th><td>4</td><td>9</td><td>6</td><td>1</td></tr></table><p>Vilket är typvärdet för antalet syskon?</p>",
    svar: { alternativ: ["0", "1", "2", "9"], ratt: 1 },
    ledtradar: [
      "Typvärdet är det värde som förekommer flest gånger.",
      "Tänk på att det är <em>antal syskon</em> som är variabeln – inte antalet elever."
    ],
    losning: "<p>Typvärdet är det värde som är vanligast. Flest elever (9 stycken) har <strong>1 syskon</strong>.</p><p>Observera att 9 är <em>frekvensen</em>, inte typvärdet. Typvärdet är det värde variabeln (antal syskon) oftast antar.</p><p><strong>Svar:</strong> Typvärdet är 1.</p>"
  },
  {
    id: "sta-004",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Lådagram och kvartiler",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Lådagrammet visar hur många minuter det tog för eleverna i en klass att ta sig till skolan en viss dag.</p><p>Bestäm kvartilavståndet.</p>",
    figur: "<svg viewBox='10 15 460 120' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2'><line x1='40' y1='100' x2='440' y2='100'/><g stroke-width='1.5'><line x1='40' y1='95' x2='40' y2='105'/><line x1='90' y1='95' x2='90' y2='105'/><line x1='140' y1='95' x2='140' y2='105'/><line x1='190' y1='95' x2='190' y2='105'/><line x1='240' y1='95' x2='240' y2='105'/><line x1='290' y1='95' x2='290' y2='105'/><line x1='340' y1='95' x2='340' y2='105'/><line x1='390' y1='95' x2='390' y2='105'/><line x1='440' y1='95' x2='440' y2='105'/></g><g fill='currentColor' stroke='none' font-size='20' text-anchor='middle'><text x='40' y='126'>0</text><text x='90' y='126'>5</text><text x='140' y='126'>10</text><text x='190' y='126'>15</text><text x='240' y='126'>20</text><text x='290' y='126'>25</text><text x='340' y='126'>30</text><text x='390' y='126'>35</text><text x='440' y='126'>40</text></g><line x1='140' y1='55' x2='180' y2='55'/><line x1='300' y1='55' x2='380' y2='55'/><line x1='140' y1='45' x2='140' y2='65'/><line x1='380' y1='45' x2='380' y2='65'/><rect x='180' y='35' width='120' height='40'/><line x1='220' y1='35' x2='220' y2='75'/></svg>",
    svar: { varde: 12, tolerans: 0, enhet: "min" },
    ledtradar: [
      "Lådans vänstra kant är nedre kvartilen \\(Q_1\\) och högra kanten är övre kvartilen \\(Q_3\\).",
      "Kvartilavståndet är \\(Q_3 - Q_1\\)."
    ],
    losning: "<ol><li>Avläs i lådagrammet: nedre kvartil \\(Q_1 = 14\\) min och övre kvartil \\(Q_3 = 26\\) min.</li><li>Kvartilavståndet är \\(Q_3 - Q_1 = 26 - 14 = 12\\) min.</li></ol><p>(Variationsbredden är \\(34-10=24\\) min – blanda inte ihop de två måtten.)</p><p><strong>Svar:</strong> 12 minuter</p>"
  },
  {
    id: "sta-005",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Korrelation",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Spridningsdiagrammet visar ett antal mätpunkter \\((x,\\,y)\\).</p><p>Vilket av följande värden passar bäst som korrelationskoefficient \\(r\\) för mätpunkterna?</p>",
    figur: "<svg viewBox='0 0 460 260' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2'><line x1='50' y1='230' x2='450' y2='230'/><line x1='50' y1='230' x2='50' y2='15'/><polyline points='444,224 450,230 444,236'/><polyline points='44,21 50,15 56,21'/><g fill='currentColor' stroke='none' font-size='20'><text x='436' y='254'>x</text><text x='28' y='26'>y</text><circle cx='90' cy='46' r='4.5'/><circle cx='130' cy='68' r='4.5'/><circle cx='170' cy='78' r='4.5'/><circle cx='210' cy='110' r='4.5'/><circle cx='250' cy='120' r='4.5'/><circle cx='290' cy='148' r='4.5'/><circle cx='330' cy='158' r='4.5'/><circle cx='370' cy='190' r='4.5'/><circle cx='410' cy='202' r='4.5'/></g></svg>",
    svar: { alternativ: ["\\(r = 0{,}99\\)", "\\(r = -0{,}99\\)", "\\(r = -0{,}3\\)", "\\(r = 0\\)"], ratt: 1 },
    ledtradar: [
      "Avgör först om sambandet är positivt (stigande) eller negativt (avtagande).",
      "Ju närmare en rät linje punkterna ligger, desto närmare \\(1\\) eller \\(-1\\) är \\(r\\)."
    ],
    losning: "<ol><li>Punkterna ligger längs en avtagande linje: när \\(x\\) ökar minskar \\(y\\). Sambandet är alltså <strong>negativt</strong>, så \\(r<0\\).</li><li>Punkterna ligger mycket nära en rät linje, alltså är sambandet starkt och \\(r\\) ligger nära \\(-1\\).</li></ol><p><strong>Svar:</strong> \\(r = -0{,}99\\)</p>"
  },
  {
    id: "sta-006",
    kurser: ["2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Korrelation och kausalitet",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>En kommun har under flera år noterat antalet sålda glassar och antalet drunkningsolyckor varje månad. Det visar sig att det finns ett starkt positivt samband (korrelationskoefficienten är \\(r = 0{,}8\\)).</p><p>Vilken är den troligaste förklaringen till sambandet?</p>",
    svar: {
      alternativ: [
        "Att äta glass ökar risken att drunkna.",
        "Drunkningsolyckor gör att människor köper mer glass.",
        "En bakomliggande faktor, t.ex. varmt väder, påverkar både glassförsäljningen och antalet badande.",
        "Sambandet är bara slump eftersom \\(r\\) inte är exakt 1."
      ],
      ratt: 2
    },
    ledtradar: [
      "Vad är skillnaden mellan ett <em>samband</em> (korrelation) och ett <em>orsakssamband</em> (kausalitet)?",
      "Finns det någon tredje faktor som kan påverka båda variablerna samtidigt?"
    ],
    losning: "<p>Ett starkt samband (korrelation) betyder bara att variablerna tenderar att variera tillsammans. Det säger inte att den ena variabeln <em>orsakar</em> den andra (kausalitet).</p><p>Här finns troligen en bakomliggande (tredje) variabel: vädret/årstiden. När det är varmt äter fler glass och fler badar, vilket gör att drunkningsolyckorna ökar. Båda variablerna beror alltså på temperaturen, inte på varandra. Och \\(r = 0{,}8\\) är ett starkt samband – det behöver inte vara exakt 1 för att vara verkligt.</p><p><strong>Svar:</strong> En bakomliggande faktor, t.ex. varmt väder, påverkar båda variablerna.</p>"
  },
  {
    id: "sta-007",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>Längden hos 18-åriga män i ett land kan beskrivas med en normalfördelning med medelvärdet 180 cm och standardavvikelsen 6 cm.</p><p>Inom vilket intervall ligger längden för de mittersta 95 % av männen? Ange intervallets två gränser.</p>",
    svar: { varden: [168, 192], tolerans: 0 },
    ledtradar: [
      "I en normalfördelning ligger ungefär 68 %, 95 % respektive 99,7 % av värdena inom 1, 2 respektive 3 standardavvikelser från medelvärdet.",
      "95 % ligger inom \\(\\mu \\pm 2\\sigma\\)."
    ],
    losning: "<ol><li>Ungefär 95 % av värdena i en normalfördelning ligger inom två standardavvikelser från medelvärdet, dvs. mellan \\(\\mu-2\\sigma\\) och \\(\\mu+2\\sigma\\).</li><li>\\(\\mu - 2\\sigma = 180 - 2\\cdot 6 = 168\\) cm</li><li>\\(\\mu + 2\\sigma = 180 + 2\\cdot 6 = 192\\) cm</li></ol><p><strong>Svar:</strong> Mellan 168 cm och 192 cm.</p>"
  },
  {
    id: "sta-008",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En maskin fyller kaffepaket. Vikten av kaffet i paketen är normalfördelad med medelvärdet 500 g och standardavvikelsen 4 g.</p><p>Ungefär hur många procent av paketen väger mindre än 492 g?</p>",
    svar: { varde: 2.5, tolerans: 0.01, enhet: "%" },
    ledtradar: [
      "Hur många standardavvikelser under medelvärdet ligger 492 g?",
      "Mellan \\(\\mu-2\\sigma\\) och \\(\\mu+2\\sigma\\) ligger ca 95 %. Resten delas lika på de två svansarna."
    ],
    losning: "<ol><li>\\(500 - 492 = 8 = 2\\cdot 4\\), så 492 g ligger två standardavvikelser under medelvärdet.</li><li>Inom \\(\\mu\\pm 2\\sigma\\) ligger ca 95 %. Utanför ligger alltså \\(100\\,\\% - 95\\,\\% = 5\\,\\%\\).</li><li>Normalfördelningen är symmetrisk, så hälften av dessa, \\(2{,}5\\,\\%\\), ligger under 492 g.</li></ol><p><strong>Svar:</strong> Ungefär 2,5 %</p>"
  },
  {
    id: "sta-009",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Lägesmått",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Fem positiva heltal har följande egenskaper:</p><ul><li>medianen är 6</li><li>typvärdet är 4</li><li>medelvärdet är 7</li><li>variationsbredden är 8</li></ul><p>Bestäm de fem talen.</p>",
    svar: { facit: "\\(4,\\;4,\\;6,\\;9,\\;12\\)" },
    ledtradar: [
      "Kalla talen \\(a \\le b \\le c \\le d \\le e\\). Vilket av dem är medianen?",
      "Typvärdet 4 betyder att 4 förekommer minst två gånger. Var måste fyrorna stå om medianen är 6?",
      "Medelvärdet 7 ger summan av talen, och variationsbredden ger sambandet mellan minsta och största talet."
    ],
    losning: "<ol><li>Sortera talen: \\(a \\le b \\le c \\le d \\le e\\). Medianen är det mittersta talet, alltså \\(c = 6\\).</li><li>Typvärdet är 4, så 4 måste förekomma minst två gånger. Eftersom \\(c=6\\) kan 4 bara stå före medianen: \\(a = b = 4\\).</li><li>Variationsbredden är 8: \\(e - a = 8 \\Rightarrow e = 12\\).</li><li>Medelvärdet är 7, så summan är \\(5 \\cdot 7 = 35\\). Då är \\(d = 35 - 4 - 4 - 6 - 12 = 9\\).</li><li>Kontroll: \\(4,4,6,9,12\\) har median 6, typvärde 4 (enda värdet som förekommer två gånger), medelvärde \\(35/5=7\\) och variationsbredd \\(12-4=8\\). ✓</li></ol><p><strong>Svar:</strong> 4, 4, 6, 9 och 12</p>",
    bedomning: [
      "+C<sub>PL</sub> för att korrekt använda minst två av villkoren, t.ex. kommit fram till \\(c = 6\\) och \\(a = b = 4\\), eller att summan är 35",
      "+A<sub>PL</sub> för korrekt bestämda tal med en lösning där alla villkor används och kontrolleras"
    ]
  },
  {
    id: "sta-010",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Urval och felkällor",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Elevrådet vill ta reda på vad skolans 900 elever tycker om skollunchen. Man har bara tid att fråga 60 elever.</p><p>Vilket av följande urval ger troligen det mest representativa resultatet?</p>",
    svar: {
      alternativ: [
        "Elevrådets medlemmar frågar sina kompisar.",
        "Man frågar de 60 första eleverna i matkön en måndag.",
        "Man lottar fram 60 elever ur skolans elevregister.",
        "Man lägger ut en enkät på skolans Instagram och använder de 60 första svaren."
      ],
      ratt: 2
    },
    ledtradar: [
      "Ett representativt urval ska likna hela gruppen (populationen).",
      "Vilka elever kommer <em>aldrig</em> med i de olika urvalen?"
    ],
    losning: "<p>Ett <strong>slumpmässigt urval</strong> ger alla elever samma chans att komma med, vilket gör urvalet representativt.</p><ul><li>Kompisar till elevrådet liknar ofta varandra (bekvämlighetsurval).</li><li>I matkön finns bara de som äter skollunch – de som tycker att maten är dålig och avstår kommer inte med.</li><li>Instagram-enkäten ger ett självselekterat urval: de som svarar först är ofta de mest engagerade.</li></ul><p><strong>Svar:</strong> Att lotta fram 60 elever ur elevregistret.</p>"
  },
  {
    id: "sta-011",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Vilseledande diagram",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Ett företag visar diagrammet nedan i sin reklam med rubriken <em>”Försäljningen har exploderat!”</em></p><p>Med hur många procent ökade försäljningen från 2024 till 2025?</p>",
    figur: "<svg viewBox='0 0 380 260' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2'><line x1='60' y1='220' x2='360' y2='220'/><line x1='60' y1='220' x2='60' y2='25'/><g stroke-width='1.5'><line x1='54' y1='220' x2='60' y2='220'/><line x1='54' y1='160' x2='60' y2='160'/><line x1='54' y1='100' x2='60' y2='100'/><line x1='54' y1='40' x2='60' y2='40'/></g><rect x='110' y='160' width='80' height='60'/><rect x='240' y='40' width='80' height='180'/><g fill='currentColor' stroke='none' font-size='16'><text x='48' y='224' text-anchor='end'>195</text><text x='48' y='164' text-anchor='end'>200</text><text x='48' y='104' text-anchor='end'>205</text><text x='48' y='44' text-anchor='end'>210</text><text x='150' y='245' text-anchor='middle'>2024</text><text x='280' y='245' text-anchor='middle'>2025</text><text x='66' y='17'>Försäljning (tusen kr)</text></g></svg>",
    svar: { alternativ: ["5 %", "10 %", "200 %", "300 %"], ratt: 0 },
    ledtradar: [
      "Titta noga på den lodräta axeln – var börjar den?",
      "Avläs försäljningen båda åren och beräkna ökningen i förhållande till 2024 års värde."
    ],
    losning: "<ol><li>Avläs: 2024 var försäljningen 200 tusen kr och 2025 var den 210 tusen kr.</li><li>Ökningen är \\(210 - 200 = 10\\) tusen kr.</li><li>Procentuell ökning: \\(\\dfrac{10}{200} = 0{,}05 = 5\\,\\%\\).</li></ol><p>Diagrammet är vilseledande eftersom den lodräta axeln börjar på 195 och inte på 0. Därför ser stapeln för 2025 ut att vara tre gånger så hög.</p><p><strong>Svar:</strong> 5 %</p>"
  },
  {
    id: "sta-012",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Standardavvikelse",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>En datamängd består av värdena</p>\\[2,\\; 4,\\; 6,\\; 8,\\; 10\\]<p>a) Alla värden ökas med 5. Hur påverkas medelvärdet och standardavvikelsen? Motivera.</p><p>b) Man lägger i stället till ett sjätte värde, 6, till den ursprungliga datamängden. Hur påverkas medelvärdet och standardavvikelsen? Motivera.</p>",
    svar: { facit: "a) Medelvärdet ökar med 5 (från 6 till 11), standardavvikelsen är oförändrad. b) Medelvärdet är oförändrat (6), standardavvikelsen minskar (från \\(\\sqrt{10}\\approx 3{,}2\\) till \\(\\sqrt{8}\\approx 2{,}8\\))." },
    ledtradar: [
      "Standardavvikelsen mäter hur långt värdena ligger från medelvärdet. Ändras avstånden om alla värden flyttas lika mycket?",
      "Använd \\(s=\\sqrt{\\dfrac{\\sum (x-\\bar{x})^2}{n-1}}\\). Vad händer med täljaren respektive nämnaren när man lägger till ett värde som är lika med medelvärdet?"
    ],
    losning: "<p><strong>a)</strong> Medelvärdet ökar med 5, från 6 till 11. Alla värden flyttas lika mycket, så avstånden till medelvärdet blir desamma: avvikelserna är fortfarande \\(-4,-2,0,2,4\\). Standardavvikelsen är därför <strong>oförändrad</strong>.</p><p><strong>b)</strong> Det nya värdet 6 är lika med medelvärdet, så summan blir \\(30+6=36\\) och medelvärdet \\(36/6 = 6\\) – <strong>oförändrat</strong>.</p><p>Det nya värdet har avvikelsen 0, så kvadratsumman är oförändrad: \\(\\sum(x-\\bar x)^2 = 16+4+0+4+16 = 40\\). Men nämnaren \\(n-1\\) ökar från 4 till 5:</p>\\[s_{\\text{före}} = \\sqrt{\\tfrac{40}{4}} = \\sqrt{10} \\approx 3{,}2 \\qquad s_{\\text{efter}} = \\sqrt{\\tfrac{40}{5}} = \\sqrt{8} \\approx 2{,}8\\]<p>Standardavvikelsen <strong>minskar</strong>. (Med fler värden nära medelvärdet blir den genomsnittliga spridningen mindre.)</p>",
    bedomning: [
      "+C<sub>R</sub> för korrekt slutsats med motivering i a) (medelvärdet ökar med 5, standardavvikelsen oförändrad eftersom avstånden till medelvärdet inte ändras)",
      "+A<sub>R</sub> för korrekt slutsats med välgrundad motivering i b), t.ex. att kvadratsumman är oförändrad medan nämnaren ökar"
    ]
  },
  {
    id: "sta-013",
    kurser: ["2a", "2b", "2c"],
    del: "A",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Livslängden för en viss typ av lampa är normalfördelad med medelvärdet 1200 timmar. Det visar sig att ungefär 16 % av lamporna har en livslängd som är kortare än 1050 timmar.</p><p>Bestäm standardavvikelsen.</p>",
    svar: { varde: 150, tolerans: 0, enhet: "h" },
    ledtradar: [
      "Hur stor andel ligger under \\(\\mu - \\sigma\\) i en normalfördelning?",
      "Inom \\(\\mu \\pm \\sigma\\) ligger ca 68 %. Hur mycket blir det kvar i varje svans?"
    ],
    losning: "<ol><li>Inom \\(\\mu\\pm\\sigma\\) ligger ca 68 %, så utanför ligger 32 %. Under \\(\\mu-\\sigma\\) ligger hälften av dessa, dvs. 16 %.</li><li>Alltså är \\(1050 = \\mu - \\sigma = 1200 - \\sigma\\).</li><li>\\(\\sigma = 1200 - 1050 = 150\\) timmar.</li></ol><p><strong>Svar:</strong> Standardavvikelsen är 150 timmar.</p>"
  },

  // ===================== DEL B =====================
  {
    id: "sta-014",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Standardavvikelse",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Tolv elever registrerade sin skärmtid (minuter) en viss dag:</p><table><tr><td>135</td><td>210</td><td>95</td><td>180</td><td>240</td><td>160</td></tr><tr><td>125</td><td>300</td><td>175</td><td>145</td><td>220</td><td>190</td></tr></table><p>Bestäm standardavvikelsen för skärmtiden. Använd stickprovsstandardavvikelsen \\(s\\) (division med \\(n-1\\)). Svara med en decimal.</p>",
    svar: { varde: 56.0, tolerans: 0.05, enhet: "min" },
    ledtradar: [
      "Skriv in värdena i en lista eller ett kalkylblad.",
      "I GeoGebra: <code>SampleSD({135, 210, ...})</code>. I kalkylblad: <code>=STDAV.S(A1:A12)</code>."
    ],
    losning: "<p><strong>GeoGebra:</strong> Skriv <code>data = {135, 210, 95, 180, 240, 160, 125, 300, 175, 145, 220, 190}</code> och sedan <code>SampleSD(data)</code>. Alternativt: markera värdena i Kalkylbladet och välj <em>Analys av en variabel</em> – avläs \\(s\\).</p><p><strong>Kalkylblad (Excel):</strong> Skriv värdena i A1:A12 och använd <code>=STDAV.S(A1:A12)</code>.</p><p>Medelvärdet är \\(181{,}25\\) min och standardavvikelsen blir \\(s \\approx 56{,}0\\) min.</p><p>(Populationsstandardavvikelsen \\(\\sigma\\), division med \\(n\\), blir ca 53,6 min – här efterfrågas \\(s\\).)</p><p><strong>Svar:</strong> \\(s \\approx 56{,}0\\) minuter</p>"
  },
  {
    id: "sta-015",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Vikten hos ägg från ett hönseri är normalfördelad med medelvärdet 62 g och standardavvikelsen 4,5 g. Ägg som väger mer än 68 g sorteras som storlek XL.</p><p>Hur många procent av äggen blir storlek XL? Svara med en decimal.</p>",
    svar: { varde: 9.1, tolerans: 0.05, enhet: "%" },
    ledtradar: [
      "<code>Normal(μ, σ, x)</code> i GeoGebra ger andelen som är <em>mindre än</em> \\(x\\).",
      "Andelen större än 68 g är \\(1 - \\text{Normal}(62, 4.5, 68)\\)."
    ],
    losning: "<p><strong>GeoGebra:</strong> <code>1 - Normal(62, 4.5, 68)</code> ger \\(0{,}0912\\).<br>Alternativt: Sannolikhetskalkylatorn, välj Normalfördelning med \\(\\mu = 62\\), \\(\\sigma = 4{,}5\\) och beräkna \\(P(X > 68)\\).</p><p><strong>Kalkylblad:</strong> <code>=1-NORM.FÖRD(68;62;4,5;SANT)</code>.</p><p>Andelen är \\(0{,}0912 \\approx 9{,}1\\,\\%\\).</p><p><strong>Svar:</strong> Ungefär 9,1 %</p>"
  },
  {
    id: "sta-016",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Batteritiden för en viss mobiltelefon är normalfördelad med medelvärdet 9,4 timmar och standardavvikelsen 1,1 timmar.</p><p>Hur stor är sannolikheten att batteriet i en slumpvis vald telefon räcker mellan 8 och 10 timmar? Svara i procent med en decimal.</p>",
    svar: { varde: 60.6, tolerans: 0.05, enhet: "%" },
    ledtradar: [
      "Andelen mellan två värden får du som skillnaden mellan två andelar <em>mindre än</em>.",
      "Beräkna \\(\\text{Normal}(9.4, 1.1, 10) - \\text{Normal}(9.4, 1.1, 8)\\)."
    ],
    losning: "<p><strong>GeoGebra:</strong> <code>Normal(9.4, 1.1, 10) - Normal(9.4, 1.1, 8)</code> \\(\\approx 0{,}7073 - 0{,}1016 = 0{,}6057\\).<br>Eller i Sannolikhetskalkylatorn: \\(P(8 \\le X \\le 10)\\).</p><p><strong>Kalkylblad:</strong> <code>=NORM.FÖRD(10;9,4;1,1;SANT)-NORM.FÖRD(8;9,4;1,1;SANT)</code>.</p><p>Sannolikheten är ca \\(0{,}606 = 60{,}6\\,\\%\\).</p><p><strong>Svar:</strong> Ungefär 60,6 %</p>"
  },
  {
    id: "sta-017",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Livslängden för en viss diskmaskin är normalfördelad med medelvärdet 6,5 år och standardavvikelsen 1,2 år. Tillverkaren vill ge en garanti som är så lång som möjligt, men högst 2 % av maskinerna får gå sönder under garantitiden.</p><p>Hur lång garanti kan tillverkaren ge? Svara med en decimal.</p>",
    svar: { varde: 4.0, tolerans: 0.06, enhet: "år" },
    ledtradar: [
      "Du söker det värde \\(x\\) där andelen som är mindre än \\(x\\) är exakt 2 %.",
      "Lös ekvationen \\(\\text{Normal}(6.5, 1.2, x) = 0.02\\) eller använd <code>InversNormal</code>."
    ],
    losning: "<p>Vi söker \\(x\\) så att \\(P(X < x) = 0{,}02\\).</p><p><strong>GeoGebra:</strong> <code>InversNormal(6.5, 1.2, 0.02)</code> (engelska: <code>InverseNormal</code>) eller <code>Lös(Normal(6.5, 1.2, x) = 0.02)</code> ger \\(x \\approx 4{,}04\\).</p><p><strong>Kalkylblad:</strong> <code>=NORM.INV(0,02;6,5;1,2)</code>.</p><p>Garantin kan alltså vara ca 4,0 år (avrundat nedåt för att inte överskrida 2 %).</p><p><strong>Svar:</strong> Ungefär 4,0 år</p>"
  },
  {
    id: "sta-018",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Korrelation",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Familjen Ek har under åtta vinterdagar noterat utomhustemperaturen och husets elförbrukning.</p><table><tr><th>Temperatur (°C)</th><td>−8</td><td>−5</td><td>−2</td><td>0</td><td>3</td><td>6</td><td>9</td><td>12</td></tr><tr><th>Elförbrukning (kWh)</th><td>52</td><td>44</td><td>47</td><td>38</td><td>39</td><td>30</td><td>33</td><td>27</td></tr></table><p>Bestäm korrelationskoefficienten \\(r\\) för sambandet mellan temperatur och elförbrukning. Svara med två decimaler.</p>",
    svar: { varde: -0.94, tolerans: 0.006 },
    ledtradar: [
      "Lägg in värdena som punkter, eller som två kolumner i ett kalkylblad.",
      "GeoGebra: <code>Korrelationskoefficient(lista)</code> (eng. <code>CorrelationCoefficient</code>). Kalkylblad: <code>=KORREL(...)</code>."
    ],
    losning: "<p><strong>GeoGebra:</strong> Skriv in temperaturerna i kolumn A och elförbrukningen i kolumn B i Kalkylbladet. Markera och välj <em>Analys av två variabler</em> – där visas \\(r\\). Alternativt: skapa en punktlista och skriv <code>CorrelationCoefficient(lista1)</code>.</p><p><strong>Kalkylblad (Excel):</strong> <code>=KORREL(A2:A9;B2:B9)</code>.</p><p>Resultat: \\(r \\approx -0{,}94\\). Sambandet är starkt och negativt – ju varmare det är, desto lägre elförbrukning.</p><p><strong>Svar:</strong> \\(r \\approx -0{,}94\\)</p>"
  },
  {
    id: "sta-019",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Linjär regression",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>Tabellen visar längden hos ett barn vid olika åldrar.</p><table><tr><th>Ålder (år)</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td></tr><tr><th>Längd (cm)</th><td>76</td><td>87</td><td>96</td><td>103</td><td>110</td><td>116</td></tr></table><p>a) Bestäm en ekvation för den räta linje som bäst anpassar sig till mätvärdena (linjär regression).</p><p>b) Använd modellen för att uppskatta barnets längd vid 7 års ålder.</p><p>c) Korrelationskoefficienten är nära 1. Använd modellen för att beräkna barnets längd vid 30 års ålder och kommentera resultatet. Vad säger detta om modellens giltighet?</p>",
    svar: { facit: "a) \\(y \\approx 7{,}89x + 70{,}4\\) b) ca 126 cm c) ca 307 cm – orimligt. Modellen gäller bara i (eller nära) intervallet där mätvärdena finns; tillväxten avtar och upphör." },
    ledtradar: [
      "Använd <code>FitLine</code> i GeoGebra eller verktyget <em>Analys av två variabler</em> → Linjär regression.",
      "Sätt in \\(x = 7\\) respektive \\(x = 30\\) i ekvationen.",
      "Ett högt värde på \\(r\\) beskriver hur väl linjen passar de <em>mätta</em> punkterna. Gäller sambandet även långt utanför mätområdet?"
    ],
    losning: "<p><strong>a)</strong> GeoGebra: Skriv in punkterna \\((1,76), (2,87), \\ldots, (6,116)\\) i en lista och använd <code>FitLine(lista1)</code>, eller markera kolumnerna i Kalkylbladet → <em>Analys av två variabler</em> → Regressionsmodell: Linjär. Kalkylblad: <code>=LUTNING(B2:B7;A2:A7)</code> och <code>=SKÄRNINGSPUNKT(B2:B7;A2:A7)</code>.</p><p>Resultat: \\(y \\approx 7{,}89x + 70{,}4\\), där \\(y\\) är längden i cm och \\(x\\) åldern i år. (\\(r \\approx 0{,}994\\))</p><p><strong>b)</strong> \\(y(7) \\approx 7{,}886\\cdot 7 + 70{,}4 \\approx 125{,}6\\). Barnet är ca 126 cm vid 7 år.</p><p><strong>c)</strong> \\(y(30) \\approx 7{,}886 \\cdot 30 + 70{,}4 \\approx 307\\) cm, dvs. drygt 3 meter – helt orimligt.</p><p>Att \\(r\\) är nära 1 betyder bara att linjen beskriver mätvärdena väl <em>i intervallet 1–6 år</em>. Människor växer inte linjärt hela livet; tillväxten avtar och upphör i tonåren. Modellen bör därför bara användas inom (eller strax utanför) det intervall där vi har data – att extrapolera långt utanför ger orimliga resultat.</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt bestämd regressionslinje, \\(y \\approx 7{,}9x + 70\\) (rimlig avrundning)",
      "+C<sub>M</sub> för korrekt uppskattning vid 7 år (ca 126 cm) samt beräkning vid 30 år (ca 307 cm)",
      "+A<sub>M</sub> för välgrundad kommentar om att modellen endast är giltig inom ett begränsat intervall och att ett högt \\(r\\)-värde inte motiverar extrapolation"
    ]
  },
  {
    id: "sta-020",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Lägesmått och spridningsmått",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Två klasser skrev samma prov. Resultaten (poäng) visas i tabellen.</p><table><tr><th>Klass A</th><td>12</td><td>15</td><td>18</td><td>20</td><td>21</td><td>22</td><td>23</td><td>25</td><td>26</td><td>28</td><td>30</td><td>32</td></tr><tr><th>Klass B</th><td>17</td><td>19</td><td>20</td><td>21</td><td>22</td><td>22</td><td>23</td><td>23</td><td>24</td><td>25</td><td>26</td><td>30</td></tr></table><p>a) Bestäm medelvärde och standardavvikelse för båda klasserna.</p><p>b) Läraren säger: <em>”Klasserna presterade lika bra.”</em> Kommentera påståendet med hjälp av lämpliga läges- och spridningsmått.</p>",
    svar: { facit: "a) Klass A: \\(\\bar x \\approx 22{,}7\\), \\(s \\approx 6{,}0\\). Klass B: \\(\\bar x \\approx 22{,}7\\), \\(s \\approx 3{,}4\\). b) Samma medelvärde (och median 22,5), men klass A har betydligt större spridning – klass B presterade jämnare." },
    ledtradar: [
      "Använd ett kalkylblad eller listor i GeoGebra: <code>Medelvärde(lista)</code> och <code>SampleSD(lista)</code>.",
      "Lägesmåtten säger något om nivån. Vad säger standardavvikelsen?"
    ],
    losning: "<p><strong>a)</strong> GeoGebra: <code>A = {12, 15, ..., 32}</code>, <code>Medelvärde(A)</code> och <code>SampleSD(A)</code>; samma för B. Kalkylblad: <code>=MEDEL(...)</code> och <code>=STDAV.S(...)</code>.</p><ul><li>Klass A: medelvärde \\(272/12 \\approx 22{,}7\\) poäng, \\(s \\approx 6{,}0\\) poäng</li><li>Klass B: medelvärde \\(272/12 \\approx 22{,}7\\) poäng, \\(s \\approx 3{,}4\\) poäng</li></ul><p><strong>b)</strong> Lägesmåtten är lika: båda klasserna har medelvärdet ca 22,7 och medianen 22,5. Sett till genomsnittet presterade klasserna alltså lika bra.</p><p>Men spridningen skiljer sig: klass A har standardavvikelsen ca 6,0 och variationsbredden 20, medan klass B har ca 3,4 och variationsbredden 13. Resultaten i klass B är mer samlade kring medelvärdet, medan klass A har både fler svaga och fler starka resultat. Påståendet stämmer därför bara delvis – klass B presterade jämnare.</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt bestämda medelvärden och standardavvikelser för båda klasserna",
      "+C<sub>R</sub> för en kommentar som jämför både läge och spridning, t.ex. att medelvärdena är lika men att klass A har större spridning"
    ]
  },
  {
    id: "sta-021",
    kurser: ["2a", "2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Lådagram och kvartiler",
    niva: "E",
    poang: "1/0/0",
    typ: "flera",
    fraga: "<p>På en friidrottstävling mättes 13 deltagares resultat i längdhopp (dm):</p><table><tr><td>42</td><td>55</td><td>31</td><td>47</td><td>58</td><td>38</td><td>51</td><td>63</td><td>44</td><td>35</td><td>55</td><td>49</td><td>38</td></tr></table><p>Man vill rita ett lådagram över resultaten. Bestäm nedre kvartilen och övre kvartilen.</p>",
    svar: { varden: [38, 55], tolerans: 0 },
    ledtradar: [
      "Sortera värdena. Medianen är det 7:e värdet.",
      "I GeoGebra: <code>Q1(lista)</code> och <code>Q3(lista)</code>, eller <code>Lådagram(...)</code>/Analys av en variabel."
    ],
    losning: "<p><strong>GeoGebra:</strong> <code>L = {42, 55, 31, 47, 58, 38, 51, 63, 44, 35, 55, 49, 38}</code>, sedan <code>Q1(L)</code> och <code>Q3(L)</code>. Med <em>Analys av en variabel</em> kan du även rita lådagrammet direkt.</p><p><strong>Kalkylblad:</strong> <code>=KVARTIL.INK(A1:A13;1)</code> och <code>=KVARTIL.INK(A1:A13;3)</code>.</p><p><strong>För hand (kontroll):</strong> Sorterat: \\(31, 35, 38, 38, 42, 44, \\mathbf{47}, 49, 51, 55, 55, 58, 63\\). Medianen är 47. Undre halvan \\(31, 35, 38, 38, 42, 44\\) har median 38 och övre halvan \\(49, 51, 55, 55, 58, 63\\) har median 55.</p><p><strong>Svar:</strong> \\(Q_1 = 38\\) dm och \\(Q_3 = 55\\) dm</p>"
  },
  {
    id: "sta-022",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "C",
    poang: "0/1/0",
    typ: "flera",
    fraga: "<p>Resultaten på ett högskoleprov kan beskrivas med en normalfördelning med medelvärdet 64 poäng och standardavvikelsen 9 poäng.</p><p>Bestäm det intervall, symmetriskt kring medelvärdet, som innehåller de mittersta 90 % av resultaten. Ange gränserna med en decimal.</p>",
    svar: { varden: [49.2, 78.8], tolerans: 0.05 },
    ledtradar: [
      "Om de mittersta 90 % ligger i intervallet, hur många procent ligger då under den nedre gränsen?",
      "Lös \\(\\text{Normal}(64, 9, x) = 0.05\\) och \\(\\text{Normal}(64, 9, x) = 0.95\\)."
    ],
    losning: "<ol><li>Utanför intervallet ligger 10 %, alltså 5 % i varje svans.</li><li>Nedre gräns: \\(P(X\\lt a)=0{,}05\\). GeoGebra: <code>InversNormal(64, 9, 0.05)</code> \\(\\approx 49{,}2\\).</li><li>Övre gräns: \\(P(X\\lt b)=0{,}95\\). GeoGebra: <code>InversNormal(64, 9, 0.95)</code> \\(\\approx 78{,}8\\).</li><li>Kalkylblad: <code>=NORM.INV(0,05;64;9)</code> respektive <code>=NORM.INV(0,95;64;9)</code>.</li></ol><p>Kontroll: intervallet är symmetriskt, \\(64 \\pm 14{,}8\\).</p><p><strong>Svar:</strong> Mellan ca 49,2 och 78,8 poäng.</p>"
  },
  {
    id: "sta-023",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>En maskin fyller påsar med godis. På påsen står det att innehållet är 500 g. Vikten är normalfördelad med medelvärdet 505 g och standardavvikelsen 3,2 g.</p><p>a) Hur stor andel av påsarna väger mindre än 500 g?</p><p>b) Företaget vill att högst 1 % av påsarna ska väga mindre än 500 g. Standardavvikelsen kan inte ändras, men maskinens medelvärde kan ställas om. Vilket medelvärde ska maskinen minst ställas in på?</p>",
    svar: { facit: "a) ca 5,9 % b) ca 507,4 g" },
    ledtradar: [
      "a) Använd <code>Normal(505, 3.2, 500)</code>.",
      "b) Medelvärdet \\(\\mu\\) är okänt. Ställ upp ekvationen \\(\\text{Normal}(\\mu, 3.2, 500) = 0.01\\).",
      "b) Alternativt: hur många standardavvikelser under medelvärdet ligger den nedre 1 %-gränsen? (<code>InversNormal(0, 1, 0.01)</code>)"
    ],
    losning: "<p><strong>a)</strong> GeoGebra: <code>Normal(505, 3.2, 500)</code> \\(\\approx 0{,}0591\\). Kalkylblad: <code>=NORM.FÖRD(500;505;3,2;SANT)</code>. Ca 5,9 % av påsarna väger under 500 g.</p><p><strong>b)</strong> Vi söker \\(\\mu\\) så att \\(P(X<500)=0{,}01\\).</p><p><em>Metod 1:</em> GeoGebra: <code>Lös(Normal(m, 3.2, 500) = 0.01, m)</code> ger \\(m \\approx 507{,}44\\).</p><p><em>Metod 2:</em> I en standardnormalfördelning ligger 1 % under \\(z \\approx -2{,}326\\) (<code>InversNormal(0, 1, 0.01)</code>). Alltså ska 500 g ligga 2,326 standardavvikelser under medelvärdet:</p>\\[\\mu = 500 + 2{,}326\\cdot 3{,}2 \\approx 507{,}4 \\text{ g}\\]<p><strong>Svar:</strong> a) ca 5,9 % &nbsp; b) Medelvärdet ska ställas in på minst ca 507,4 g.</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt andel i a), ca 5,9 %",
      "+C<sub>PL</sub> för en godtagbar ansats i b), t.ex. ställer upp \\(\\text{Normal}(\\mu, 3.2, 500)=0{,}01\\) eller bestämmer att gränsen ligger ca 2,33 standardavvikelser under medelvärdet",
      "+A<sub>PL</sub> för korrekt bestämt medelvärde, ca 507,4 g"
    ]
  },
  {
    id: "sta-024",
    kurser: ["2b", "2c"],
    del: "B",
    omrade: "Statistik och sannolikhet",
    moment: "Linjär regression",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Tabellen visar antalet publika laddstolpar för elbilar i en kommun i slutet av respektive år.</p><table><tr><th>År</th><td>2018</td><td>2019</td><td>2020</td><td>2021</td><td>2022</td><td>2023</td><td>2024</td></tr><tr><th>Antal laddstolpar</th><td>12</td><td>19</td><td>27</td><td>33</td><td>42</td><td>48</td><td>57</td></tr></table><p>Anpassa en linjär modell till mätvärdena med linjär regression, där \\(x\\) är antal år efter 2018. Hur många år efter 2018 når antalet laddstolpar 100 enligt modellen? Svara med en decimal.</p>",
    svar: { varde: 11.9, tolerans: 0.05, enhet: "år" },
    ledtradar: [
      "Låt \\(x = 0\\) motsvara år 2018, \\(x = 1\\) år 2019 osv.",
      "Bestäm regressionslinjen \\(y = kx + m\\) och lös sedan ekvationen \\(kx + m = 100\\)."
    ],
    losning: "<ol><li>Punkterna blir \\((0,12), (1,19), (2,27), (3,33), (4,42), (5,48), (6,57)\\).</li><li>GeoGebra: <code>f = FitLine({(0,12), (1,19), (2,27), (3,33), (4,42), (5,48), (6,57)})</code> ger \\(f(x) \\approx 7{,}43x + 11{,}71\\). Kalkylblad: <code>=LUTNING(...)</code> och <code>=SKÄRNINGSPUNKT(...)</code>.</li><li>Lös \\(7{,}43x + 11{,}71 = 100\\), t.ex. med <code>Lös(f(x) = 100)</code> eller genom att skära linjen med \\(y = 100\\):<br>\\(x = \\dfrac{100 - 11{,}714}{7{,}4286} \\approx 11{,}9\\).</li></ol><p>Enligt modellen nås 100 laddstolpar ca 11,9 år efter 2018, alltså mot slutet av år 2029 (förutsatt att den linjära trenden håller i sig).</p><p><strong>Svar:</strong> Ca 11,9 år efter 2018</p>"
  },

  // ===================== DEL C =====================
  {
    id: "sta-025",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Lägesmått",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Tabellen visar antalet mål som ett fotbollslag gjorde per match under en säsong.</p><table><tr><th>Antal mål</th><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr><tr><th>Antal matcher</th><td>6</td><td>9</td><td>7</td><td>5</td><td>2</td><td>1</td></tr></table><p>Beräkna medelvärdet för antalet mål per match.</p>",
    svar: { varde: 1.7, tolerans: 0.01, enhet: "mål" },
    ledtradar: [
      "Hur många matcher spelades totalt? Hur många mål gjordes totalt?",
      "Totalt antal mål = \\(0\\cdot 6 + 1\\cdot 9 + 2 \\cdot 7 + \\ldots\\)"
    ],
    losning: "<ol><li>Antal matcher: \\(6+9+7+5+2+1 = 30\\).</li><li>Antal mål: \\(0\\cdot6 + 1\\cdot9 + 2\\cdot7 + 3\\cdot5 + 4\\cdot2 + 5\\cdot1 = 0+9+14+15+8+5 = 51\\).</li><li>Medelvärde: \\(\\dfrac{51}{30} = 1{,}7\\) mål per match.</li></ol><p>(Ett vanligt fel är att dividera med 6, antalet kolumner, i stället för med antalet matcher.)</p><p><strong>Svar:</strong> 1,7 mål per match</p>"
  },
  {
    id: "sta-026",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Standardavvikelse",
    niva: "E",
    poang: "2/0/0",
    typ: "redovisning",
    fraga: "<p>Fem elever mätte hur många armhävningar de klarade:</p>\\[4,\\; 7,\\; 8,\\; 10,\\; 11\\]<p>Beräkna standardavvikelsen med formeln</p>\\[s = \\sqrt{\\frac{\\sum (x - \\bar{x})^2}{n-1}}\\]<p>Svara med en decimal.</p>",
    svar: { facit: "\\(\\bar x = 8\\), \\(s = \\sqrt{7{,}5} \\approx 2{,}7\\)" },
    bedomning: [
      "+E<sub>P</sub> för korrekt beräknat medelvärde (8) och korrekta kvadrerade avvikelser (summa 30)",
      "+E<sub>P</sub> för korrekt standardavvikelse, \\(s \\approx 2{,}7\\)"
    ],
    ledtradar: [
      "Börja med att beräkna medelvärdet \\(\\bar x\\).",
      "Beräkna varje värdes avvikelse från medelvärdet, kvadrera och summera. Dela sedan med \\(n - 1 = 4\\)."
    ],
    losning: "<ol><li>Medelvärde: \\(\\bar x = \\dfrac{4+7+8+10+11}{5} = \\dfrac{40}{5} = 8\\).</li><li>Avvikelser \\(x-\\bar x\\): \\(-4,\\,-1,\\,0,\\,2,\\,3\\).</li><li>Kvadrater: \\(16,\\,1,\\,0,\\,4,\\,9\\). Summa: \\(30\\).</li><li>\\(s = \\sqrt{\\dfrac{30}{5-1}} = \\sqrt{7{,}5} \\approx 2{,}7\\).</li></ol><p><strong>Svar:</strong> \\(s \\approx 2{,}7\\) armhävningar</p>"
  },
  {
    id: "sta-027",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Lägesmått",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>I klass 2A finns 24 elever och deras medelresultat på ett prov var 14,5 poäng. I klass 2B finns 30 elever och deras medelresultat var 16,3 poäng.</p><p>Vilket är medelresultatet för alla elever i de två klasserna tillsammans?</p>",
    svar: { facit: "15,5 poäng" },
    bedomning: [
      "+E<sub>P</sub> för korrekt beräknad total poängsumma för minst en av klasserna (348 respektive 489)",
      "+C<sub>P</sub> för korrekt gemensamt medelvärde, 15,5 poäng"
    ],
    ledtradar: [
      "Det är <em>inte</em> rätt att bara ta medelvärdet av 14,5 och 16,3 – klasserna är olika stora.",
      "Beräkna den totala poängsumman för varje klass."
    ],
    losning: "<ol><li>Total poäng i 2A: \\(24 \\cdot 14{,}5 = 348\\).</li><li>Total poäng i 2B: \\(30 \\cdot 16{,}3 = 489\\).</li><li>Totalt: \\(348 + 489 = 837\\) poäng fördelat på \\(24+30 = 54\\) elever.</li><li>Medelvärde: \\(\\dfrac{837}{54} = 15{,}5\\) poäng.</li></ol><p>(Att ta \\(\\frac{14{,}5+16{,}3}{2} = 15{,}4\\) blir fel eftersom klasserna har olika många elever.)</p><p><strong>Svar:</strong> 15,5 poäng</p>"
  },
  {
    id: "sta-028",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Korrelation och kausalitet",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>I en undersökning av 120 elever fann man att korrelationskoefficienten mellan antal timmar som eleverna pluggat inför ett prov och deras provresultat var \\(r = 0{,}85\\).</p><p>Vilket av påståendena stämmer?</p>",
    svar: {
      alternativ: [
        "85 % av eleverna som pluggade fick ett bra resultat.",
        "Det finns ett starkt positivt linjärt samband mellan pluggtid och provresultat.",
        "Undersökningen bevisar att mer pluggande orsakar bättre resultat.",
        "För varje extra timme pluggande ökar resultatet med 0,85 poäng."
      ],
      ratt: 1
    },
    ledtradar: [
      "Korrelationskoefficienten är ett mått på hur starkt det <em>linjära sambandet</em> är, och ligger mellan \\(-1\\) och \\(1\\).",
      "Är \\(r\\) en andel, en lutning eller ett bevis för orsakssamband?"
    ],
    losning: "<p>Ett värde på \\(r\\) nära 1 betyder att det finns ett <strong>starkt positivt linjärt samband</strong>: elever som pluggat mer tenderar att få högre resultat.</p><ul><li>\\(r\\) är ingen procentandel av eleverna.</li><li>Korrelation bevisar inte orsakssamband (kausalitet) – t.ex. kan motivation påverka både pluggtid och resultat.</li><li>\\(r\\) är inte regressionslinjens lutning.</li></ul><p><strong>Svar:</strong> Det finns ett starkt positivt linjärt samband mellan pluggtid och provresultat.</p>"
  },
  {
    id: "sta-029",
    kurser: ["2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Linjär regression",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En glasskiosk har undersökt sambandet mellan dagens maxtemperatur \\(x\\) (°C) och antal sålda glassar \\(y\\). Med linjär regression fick man modellen</p>\\[y = 14{,}5x + 120\\]<p>Vid vilken temperatur förutsäger modellen att kiosken säljer 500 glassar? Svara med en decimal.</p>",
    svar: { varde: 26.2, tolerans: 0.05, enhet: "°C" },
    ledtradar: [
      "Sätt \\(y = 500\\) och lös ut \\(x\\)."
    ],
    losning: "<ol><li>\\(14{,}5x + 120 = 500\\)</li><li>\\(14{,}5x = 380\\)</li><li>\\(x = \\dfrac{380}{14{,}5} \\approx 26{,}2\\)</li></ol><p><strong>Svar:</strong> Ungefär 26,2 °C</p>"
  },
  {
    id: "sta-030",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>300 elever skrev ett prov där man kunde få högst 54 poäng. En lärare påstår att resultaten kan beskrivas med en normalfördelning med medelvärdet 40 poäng och standardavvikelsen 8 poäng.</p><p>a) Hur många elever fick mellan 32 och 48 poäng enligt lärarens modell?</p><p>b) Hur många elever fick mer än 56 poäng enligt lärarens modell?</p><p>c) Diskutera hur väl lärarens modell beskriver provresultaten.</p>",
    svar: { facit: "a) ca 204 elever b) ca 7–8 elever c) Orimligt, eftersom maxpoängen är 54. Modellen beskriver inte den övre delen av fördelningen väl – resultaten kan inte vara normalfördelade så nära taket." },
    ledtradar: [
      "Hur många standardavvikelser från medelvärdet ligger 32, 48 och 56 poäng?",
      "Använd att ca 68 % ligger inom \\(\\mu\\pm\\sigma\\) och ca 95 % inom \\(\\mu \\pm 2\\sigma\\).",
      "c) Jämför svaret i b) med provets maxpoäng. Vad borde en normalfördelning ha för egenskaper (t.ex. symmetri)?"
    ],
    losning: "<p><strong>a)</strong> \\(32 = 40 - 8 = \\mu - \\sigma\\) och \\(48 = \\mu + \\sigma\\). Inom \\(\\mu\\pm\\sigma\\) ligger ca 68 %:<br>\\(0{,}68 \\cdot 300 = 204\\) elever.</p><p><strong>b)</strong> \\(56 = 40 + 2\\cdot 8 = \\mu + 2\\sigma\\). Över \\(\\mu+2\\sigma\\) ligger ca \\(\\dfrac{100\\,\\% - 95\\,\\%}{2} = 2{,}5\\,\\%\\):<br>\\(0{,}025 \\cdot 300 = 7{,}5\\), alltså ca 7–8 elever.</p><p><strong>c)</strong> Enligt modellen skulle ca 7–8 elever ha fått mer än 56 poäng, men provet hade bara 54 poäng som maximum. Modellen ger alltså orimliga resultat i den övre delen. Medelvärdet ligger bara \\(14\\) poäng (\\(1{,}75\\) standardavvikelser) från maxpoängen, så fördelningen kan inte vara symmetrisk – den är troligen ”avhuggen” eller sned uppåt. En normalfördelning kan möjligen fungera som grov modell för resultaten nära medelvärdet, men inte för de högsta resultaten.</p>",
    bedomning: [
      "+E<sub>M</sub> för korrekt antal i a), ca 204 elever",
      "+C<sub>M</sub> för korrekt antal i b), ca 7–8 elever",
      "+A<sub>R</sub> för välgrundad diskussion som kopplar resultatet i b) till maxpoängen och drar en slutsats om modellens begränsningar"
    ]
  },
  {
    id: "sta-031",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Lägesmått",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Sju tal har medelvärdet 12. När ett av talen tas bort blir medelvärdet för de återstående talen 11.</p><p>Vilket tal togs bort?</p>",
    svar: { varde: 18, tolerans: 0 },
    ledtradar: [
      "Bestäm summan av de sju talen och summan av de sex återstående talen.",
      "Skillnaden mellan summorna är det borttagna talet."
    ],
    losning: "<ol><li>Summan av de sju talen: \\(7 \\cdot 12 = 84\\).</li><li>Summan av de sex återstående: \\(6 \\cdot 11 = 66\\).</li><li>Det borttagna talet: \\(84 - 66 = 18\\).</li></ol><p><strong>Svar:</strong> 18</p>"
  },
  {
    id: "sta-032",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Normalfördelning",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>Ett bryggeri ska köpa en ny maskin för att fylla flaskor. Varje flaska måste innehålla minst 248 ml. Volymen som maskinerna fyller är normalfördelad.</p><table><tr><th></th><th>Medelvärde</th><th>Standardavvikelse</th></tr><tr><th>Maskin A</th><td>251 ml</td><td>1,5 ml</td></tr><tr><th>Maskin B</th><td>249,5 ml</td><td>0,5 ml</td></tr></table><p>Vilken maskin bör bryggeriet välja? Motivera ditt svar med beräkningar.</p>",
    svar: { facit: "Maskin B: ca 0,15 % av flaskorna under 248 ml (mot ca 2,5 % för A), och B fyller i genomsnitt 1,5 ml mindre per flaska, vilket sparar dryck." },
    ledtradar: [
      "Hur många standardavvikelser under respektive maskins medelvärde ligger 248 ml?",
      "Använd 68–95–99,7-regeln för att bestämma andelen underfyllda flaskor för varje maskin.",
      "Finns det fler aspekter än andelen underfyllda flaskor, t.ex. hur mycket dryck som går åt?"
    ],
    losning: "<p><strong>Maskin A:</strong> \\(251 - 248 = 3 = 2 \\cdot 1{,}5\\). Gränsen ligger 2 standardavvikelser under medelvärdet. Under \\(\\mu - 2\\sigma\\) ligger ca \\(\\dfrac{5\\,\\%}{2} = 2{,}5\\,\\%\\).</p><p><strong>Maskin B:</strong> \\(249{,}5 - 248 = 1{,}5 = 3 \\cdot 0{,}5\\). Gränsen ligger 3 standardavvikelser under medelvärdet. Under \\(\\mu - 3\\sigma\\) ligger ca \\(\\dfrac{100\\,\\% - 99{,}7\\,\\%}{2} = 0{,}15\\,\\%\\).</p><p><strong>Jämförelse:</strong> Maskin B ger betydligt färre underfyllda flaskor (ca 0,15 % mot 2,5 %). Dessutom fyller B i genomsnitt \\(251 - 249{,}5 = 1{,}5\\) ml mindre per flaska, så bryggeriet ”ger bort” mindre dryck. Trots att B har lägre medelvärde är den bättre, eftersom den har mycket mindre spridning.</p><p><strong>Svar:</strong> Bryggeriet bör välja maskin B.</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt bestämd andel underfyllda flaskor för en av maskinerna",
      "+C<sub>M</sub> för korrekt bestämda andelar för båda maskinerna (ca 2,5 % och ca 0,15 %)",
      "+A<sub>R</sub> för välgrundad slutsats där även standardavvikelsens betydelse och/eller den genomsnittliga överfyllnaden vägs in"
    ]
  },
  {
    id: "sta-033",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Urval och felkällor",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>Ett tv-program frågade tittarna: <em>”Bör sommarlovet förlängas?”</em> Tittarna kunde rösta genom att skicka ett sms. Av de 12 000 som röstade svarade 80 % ja. Programledaren sa: <em>”Fyra av fem svenskar vill ha längre sommarlov.”</em></p><p>Vilken är den största felkällan i undersökningen?</p>",
    svar: {
      alternativ: [
        "Det var för få som röstade för att resultatet ska gå att använda.",
        "De som röstade valde själva att delta och är troligen inte representativa för alla svenskar.",
        "Procentsatsen är felräknad.",
        "Frågan borde ha haft fler svarsalternativ."
      ],
      ratt: 1
    },
    ledtradar: [
      "Vem ser på programmet, och vem bryr sig om att skicka ett sms?",
      "Ett stort urval hjälper inte om urvalet är skevt."
    ],
    losning: "<p>Undersökningen bygger på ett <strong>självselekterat urval</strong>: bara de som tittar på programmet och som själva vill rösta deltar. De har ofta starka åsikter (t.ex. elever och föräldrar som vill ha längre lov), så urvalet är inte representativt för alla svenskar.</p><p>12 000 svar är många, men ett stort urval kompenserar inte för att urvalet är skevt.</p><p><strong>Svar:</strong> De som röstade valde själva att delta och är troligen inte representativa.</p>"
  },
  {
    id: "sta-034",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Urval och felkällor",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Ett gym skickade en enkät till 800 slumpvis valda medlemmar. 320 medlemmar svarade, och av dem var 75 % nöjda med gymmet. I gymmets reklam står det: <em>”75 % av våra medlemmar är nöjda!”</em></p><p>a) Hur många av de tillfrågade medlemmarna svarade att de var nöjda?</p><p>b) Hur stor andel av de 800 tillfrågade kan som minst respektive som mest vara nöjda? Kommentera reklamens påstående.</p>",
    svar: { facit: "a) 240 medlemmar b) Minst 30 %, högst 90 %. Bortfallet (60 %) är stort, så påståendet ”75 %” är osäkert – de som inte svarade kan skilja sig från de som svarade." },
    ledtradar: [
      "a) Beräkna 75 % av 320.",
      "b) Tänk dig två ytterlighetsfall: att alla som inte svarade är missnöjda, och att alla som inte svarade är nöjda."
    ],
    losning: "<p><strong>a)</strong> \\(0{,}75 \\cdot 320 = 240\\) medlemmar svarade att de var nöjda.</p><p><strong>b)</strong> Bortfallet är \\(800 - 320 = 480\\) medlemmar.</p><ul><li>Minst: om ingen av de 480 är nöjd: \\(\\dfrac{240}{800} = 0{,}30 = 30\\,\\%\\).</li><li>Mest: om alla 480 är nöjda: \\(\\dfrac{240 + 480}{800} = \\dfrac{720}{800} = 0{,}90 = 90\\,\\%\\).</li></ul><p>Andelen nöjda bland de tillfrågade kan alltså ligga någonstans mellan 30 % och 90 %. Bortfallet är 60 %, och det är troligt att de som inte svarar skiljer sig från de som svarar (t.ex. att missnöjda medlemmar som slutat gå inte bryr sig om enkäten). Reklamens påstående är därför mycket osäkert.</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt antal i a), 240 medlemmar",
      "+C<sub>R</sub> för korrekt bestämda gränser (30 % och 90 %) och en kommentar om att bortfallet gör påståendet osäkert"
    ]
  },
  {
    id: "sta-035",
    kurser: ["2a", "2b", "2c"],
    del: "C",
    omrade: "Statistik och sannolikhet",
    moment: "Lägesmått",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>På ett litet företag arbetar 9 personer. Medellönen är 32 000 kr per månad och medianlönen är 29 000 kr. Företagets vd har den högsta lönen, 60 000 kr. Vd:ns lön höjs till 87 000 kr medan övrigas löner är oförändrade.</p><p>a) Hur påverkas medellönen respektive medianlönen?</p><p>b) Facket vill beskriva en ”typisk” lön på företaget. Vilket lägesmått är lämpligast? Motivera.</p>",
    svar: { facit: "a) Medellönen ökar till 35 000 kr, medianlönen är oförändrad 29 000 kr. b) Medianen, eftersom den inte påverkas av enstaka extrema värden." },
    ledtradar: [
      "Hur mycket ökar den totala lönesumman? Fördela ökningen på 9 personer.",
      "Medianen är den femte lönen i storleksordning. Ändras den om den högsta lönen blir ännu högre?"
    ],
    losning: "<p><strong>a)</strong> Lönesumman ökar med \\(87\\,000 - 60\\,000 = 27\\,000\\) kr. Medellönen ökar med \\(\\dfrac{27\\,000}{9} = 3\\,000\\) kr, till <strong>35 000 kr</strong>.</p><p>Medianen är den 5:e lönen när lönerna sorteras. Vd:ns lön var redan högst och är fortfarande högst, så ordningen ändras inte och medianen är <strong>oförändrad, 29 000 kr</strong>.</p><p><strong>b)</strong> Medianen är lämpligast. Medelvärdet påverkas kraftigt av enstaka höga värden (här vd:ns lön), och redan före höjningen låg medellönen över medianlönen. Efter höjningen har medellönen ökat med 3 000 kr trots att 8 av 9 anställda inte fått någon löneförhöjning. Medianen beskriver bättre vad en typisk anställd tjänar.</p>",
    bedomning: [
      "+C<sub>P</sub> för korrekt ny medellön (35 000 kr) och korrekt slutsats om att medianen är oförändrad",
      "+A<sub>R</sub> för välgrundad motivering till val av medianen, kopplad till att medelvärdet påverkas av extremvärden i just detta fall"
    ]
  }
);
