// Sannolikhet och statistik + Privatekonomi och vardagsmatematik – NP Matematik nivå 1a/1b/1c (Gy25)
// Kurstaggning enligt centralt innehåll: sannolikhet, statistiska begrepp, ränta/amortering och
// förändringsfaktor finns i alla tre nivåerna. Begreppet index: 1b (1a har "indexmått" i det
// yrkesspecifika innehållet) – taggas ["1a","1b"]. Vinstmarginal: endast 1a.
// Del B-uppgifter för 1b/1c är räknarfria; uppgifter som kräver räknare i del B taggas bara ["1a"].
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(
  // =====================================================================
  //  SANNOLIKHET OCH STATISTIK – DEL A
  // =====================================================================
  {
    id: "sanek-001",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Komplementhändelse",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Enligt en väderprognos är sannolikheten att det regnar i Umeå i morgon \\(0{,}35\\).</p><p>Vad är sannolikheten att det <strong>inte</strong> regnar i Umeå i morgon?</p>",
    svar: { varde: 0.65, tolerans: 0.001 },
    ledtradar: [
      "Antingen regnar det eller så regnar det inte. Vad blir summan av de två sannolikheterna?",
      "Använd komplementhändelsen: \\(P(\\text{inte } A) = 1 - P(A)\\)."
    ],
    losning: "<ol><li>Händelserna \"regn\" och \"inte regn\" är varandras komplementhändelser, så deras sannolikheter har summan 1.</li><li>\\(P(\\text{inte regn}) = 1 - 0{,}35 = 0{,}65\\)</li></ol><p><strong>Svar:</strong> \\(0{,}65\\)</p>"
  },
  {
    id: "sanek-002",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Oberoende händelser",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Du singlar en slant och kastar samtidigt en vanlig sexsidig tärning.</p><p>Bestäm sannolikheten att du får krona <strong>och</strong> en sexa. Svara i bråkform.</p>",
    svar: { varde: 0.083333, tolerans: 0.0005 },
    ledtradar: [
      "Slanten och tärningen påverkar inte varandra – händelserna är oberoende.",
      "För oberoende händelser gäller \\(P(A \\text{ och } B) = P(A) \\cdot P(B)\\)."
    ],
    losning: "<ol><li>\\(P(\\text{krona}) = \\dfrac{1}{2}\\) och \\(P(\\text{sexa}) = \\dfrac{1}{6}\\).</li><li>Händelserna är oberoende, så sannolikheterna multipliceras: \\(\\dfrac{1}{2} \\cdot \\dfrac{1}{6} = \\dfrac{1}{12}\\).</li></ol><p>Kontroll: det finns \\(2 \\cdot 6 = 12\\) lika sannolika utfall och bara ett av dem är (krona, 6).</p><p><strong>Svar:</strong> \\(\\dfrac{1}{12}\\)</p>"
  },
  {
    id: "sanek-003",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Beroende och oberoende händelser",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>I vilket av följande exempel är de två händelserna <strong>beroende</strong> av varandra?</p>",
    svar: {
      alternativ: [
        "Man kastar en tärning två gånger. Händelserna är \"sexa i första kastet\" och \"sexa i andra kastet\".",
        "Man drar två kort ur en kortlek utan att lägga tillbaka det första. Händelserna är \"första kortet är ett ess\" och \"andra kortet är ett ess\".",
        "Man singlar en slant två gånger. Händelserna är \"krona första gången\" och \"krona andra gången\".",
        "Man snurrar ett lyckohjul två gånger. Händelserna är \"vinst första gången\" och \"vinst andra gången\"."
      ],
      ratt: 1
    },
    ledtradar: [
      "Två händelser är beroende om utfallet av den första ändrar sannolikheten för den andra.",
      "I vilket exempel ändras förutsättningarna inför det andra försöket?"
    ],
    losning: "<p>En tärning, en slant och ett lyckohjul \"minns\" inte vad som hände förra gången – sannolikheten är densamma vid varje försök. De händelserna är alltså oberoende.</p><p>När man drar kort <em>utan återläggning</em> ändras kortleken. Om det första kortet är ett ess finns bara 3 ess kvar bland 51 kort, så \\(P(\\text{ess andra gången}) = \\dfrac{3}{51}\\) i stället för \\(\\dfrac{4}{52}\\). Händelserna är beroende.</p><p><strong>Svar:</strong> Dragningen av två kort utan återläggning.</p>"
  },
  {
    id: "sanek-004",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Beroende händelser",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>I en påse finns 3 röda och 5 blå kulor. Du drar slumpmässigt två kulor, en i taget, utan att lägga tillbaka den första.</p><p>Bestäm sannolikheten att båda kulorna är röda. Svara i bråkform.</p>",
    svar: { varde: 0.107143, tolerans: 0.0005 },
    ledtradar: [
      "Hur stor är sannolikheten att den första kulan är röd?",
      "Om den första kulan var röd – hur många kulor och hur många röda finns kvar inför andra dragningen?"
    ],
    losning: "<ol><li>Första dragningen: 3 röda av 8 kulor, \\(P(\\text{röd}) = \\dfrac{3}{8}\\).</li><li>Andra dragningen: nu finns 2 röda av 7 kulor kvar, \\(P(\\text{röd igen}) = \\dfrac{2}{7}\\).</li><li>\\(P(\\text{båda röda}) = \\dfrac{3}{8} \\cdot \\dfrac{2}{7} = \\dfrac{6}{56} = \\dfrac{3}{28}\\)</li></ol><p>Vanligt fel: att räkna \\(\\dfrac{3}{8}\\cdot\\dfrac{3}{8}\\) som om kulan lades tillbaka.</p><p><strong>Svar:</strong> \\(\\dfrac{3}{28}\\)</p>"
  },
  {
    id: "sanek-005",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Korrelation och kausalitet",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>En undersökning bland gymnasieelever visar att elever som äter frukost varje dag i genomsnitt har högre betyg än elever som sällan äter frukost.</p><p>Vilken slutsats kan man dra av undersökningen?</p>",
    svar: {
      alternativ: [
        "Att äta frukost gör att man får högre betyg.",
        "Att ha höga betyg gör att man äter frukost.",
        "Det finns ett samband (korrelation), men undersökningen visar inte att frukosten är orsaken till de högre betygen.",
        "Sambandet måste bero på slumpen eftersom alla elever inte följer mönstret."
      ],
      ratt: 2
    },
    ledtradar: [
      "Vad är skillnaden mellan korrelation (samband) och kausalitet (orsakssamband)?",
      "Kan det finnas andra faktorer, t.ex. sömn eller hemförhållanden, som påverkar både frukostvanor och betyg?"
    ],
    losning: "<p>Undersökningen visar ett <strong>samband</strong>: frukostätare har i genomsnitt högre betyg. Men ett samband (korrelation) betyder inte automatiskt ett orsakssamband (kausalitet).</p><p>Det kan finnas bakomliggande faktorer – till exempel att elever som sover tillräckligt eller har regelbundna rutiner hemma både äter frukost och presterar bättre. För att visa ett orsakssamband krävs t.ex. ett kontrollerat experiment.</p><p>Att inte alla elever följer mönstret gör inte sambandet slumpmässigt – ett samband gäller i genomsnitt.</p><p><strong>Svar:</strong> Det finns en korrelation, men ingen visad kausalitet.</p>"
  },
  {
    id: "sanek-006",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Urvalsmetoder",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>En kommun vill ta reda på vad invånarna tycker om kollektivtrafiken.</p><p>Vilket av följande urval ger troligen den mest rättvisande bilden av vad <em>alla</em> invånare tycker?</p>",
    svar: {
      alternativ: [
        "Fråga 1000 resenärer på centralstationen en vardagsmorgon.",
        "Lägga ut en enkät på kommunens Facebooksida och låta alla som vill svara.",
        "Slumpmässigt välja ut 1000 invånare ur folkbokföringen och skicka enkäten till dem.",
        "Fråga alla som arbetar på kommunens trafikkontor."
      ],
      ratt: 2
    },
    ledtradar: [
      "Ett bra urval ska ge alla invånare samma chans att komma med.",
      "Vilka grupper missas eller överrepresenteras i de andra urvalen?"
    ],
    losning: "<p>Ett <strong>slumpmässigt urval</strong> ur hela befolkningen (folkbokföringen) ger alla invånare samma chans att bli tillfrågade. Det minskar risken för ett snedvridet urval.</p><ul><li>Resenärer på centralstationen: de som inte åker kollektivt kommer inte med.</li><li>Facebookenkät: bara de som följer sidan och vill svara deltar (självselektion).</li><li>Trafikkontorets anställda: inte representativa och kan ha egna intressen.</li></ul><p><strong>Svar:</strong> Ett slumpmässigt urval ur folkbokföringen.</p>"
  },
  {
    id: "sanek-007",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Komplementhändelse i flera steg",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Du kastar tre vanliga sexsidiga tärningar.</p><p>Bestäm sannolikheten att du får <strong>minst en</strong> sexa. Svara i bråkform.</p>",
    svar: { varde: 0.421296, tolerans: 0.0005 },
    ledtradar: [
      "\"Minst en sexa\" har många fall. Vad är komplementhändelsen?",
      "Komplementhändelsen är \"ingen sexa på någon av tärningarna\". Den sannolikheten är lätt att räkna ut."
    ],
    losning: "<ol><li>Komplementhändelsen till \"minst en sexa\" är \"ingen sexa alls\".</li><li>\\(P(\\text{ingen sexa på en tärning}) = \\dfrac{5}{6}\\). Tärningarna är oberoende, så \\(P(\\text{ingen sexa}) = \\left(\\dfrac{5}{6}\\right)^3 = \\dfrac{125}{216}\\).</li><li>\\(P(\\text{minst en sexa}) = 1 - \\dfrac{125}{216} = \\dfrac{91}{216} \\approx 0{,}42\\)</li></ol><p>Vanligt fel: \\(\\dfrac{1}{6}+\\dfrac{1}{6}+\\dfrac{1}{6} = \\dfrac{1}{2}\\) – då räknas fallen med flera sexor flera gånger.</p><p><strong>Svar:</strong> \\(\\dfrac{91}{216}\\)</p>"
  },
  {
    id: "sanek-008",
    kurser: ["1a", "1b"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Index",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Ett prisindex för livsmedel har basåret 2020, då indexet var 100. År 2025 var indexet 118.</p><p>En matkasse kostade 250 kr år 2020. Vad kostade samma matkasse år 2025 om priset har följt indexet?</p>",
    svar: { varde: 295, tolerans: 0, enhet: "kr" },
    ledtradar: [
      "Index 118 jämfört med 100 betyder att priserna har ökat med 18 %.",
      "Multiplicera priset år 2020 med förändringsfaktorn \\(\\dfrac{118}{100}\\)."
    ],
    losning: "<ol><li>Indexet har ökat från 100 till 118, alltså med 18 %. Förändringsfaktorn är \\(1{,}18\\).</li><li>Nytt pris: \\(250 \\cdot 1{,}18 = 250 + 0{,}18 \\cdot 250 = 250 + 45 = 295\\) kr.</li></ol><p><strong>Svar:</strong> 295 kr</p>"
  },
  {
    id: "sanek-009",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Signifikans",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>En forskargrupp jämförde ett nytt blodtrycksläkemedel med placebo (overksamma tabletter). I rapporten står det att skillnaden i blodtryck mellan grupperna var <em>statistiskt signifikant på 5 %-nivån</em>.</p><p>Vad betyder det?</p>",
    svar: {
      alternativ: [
        "Läkemedlet sänker blodtrycket med minst 5 %.",
        "Det är osannolikt att en så stor skillnad hade uppstått bara av slumpen om läkemedlet inte hade någon effekt.",
        "Det är 95 % säkert att alla patienter som tar läkemedlet blir hjälpta.",
        "Skillnaden är så stor att den är viktig i praktiken för patienterna."
      ],
      ratt: 1
    },
    ledtradar: [
      "Även om ett läkemedel saknar effekt blir grupperna sällan exakt lika – slumpen ger alltid lite skillnad.",
      "Signifikans handlar om hur troligt det är att resultatet bara beror på slumpen – inte om hur stor eller viktig effekten är."
    ],
    losning: "<p>Ett resultat är <strong>statistiskt signifikant</strong> om det är osannolikt att det skulle ha uppstått enbart genom slumpmässig variation. Med signifikansnivån 5 % menas att en så stor skillnad skulle uppträda i mindre än 5 % av fallen om läkemedlet egentligen inte hade någon effekt.</p><ul><li>Signifikans säger inget om <em>hur mycket</em> blodtrycket sänks (alternativ 1).</li><li>Det handlar om grupper i genomsnitt, inte om att alla patienter blir hjälpta (alternativ 3).</li><li>En signifikant skillnad kan vara liten och ha liten praktisk betydelse (alternativ 4).</li></ul><p><strong>Svar:</strong> Det är osannolikt att skillnaden bara beror på slumpen.</p>"
  },
  {
    id: "sanek-010",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Träddiagram",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Lisa åker först buss och byter sedan till tåg för att komma till jobbet. Träddiagrammet visar sannolikheterna för att bussen respektive tåget är i tid. De två färdmedlen påverkar inte varandra.</p><p>Bestäm sannolikheten att <strong>minst ett</strong> av färdmedlen är försenat.</p>",
    figur: "<svg viewBox='0 0 420 260' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2'><line x1='20' y1='145' x2='150' y2='85'/><line x1='20' y1='145' x2='150' y2='205'/><line x1='215' y1='85' x2='340' y2='50'/><line x1='215' y1='85' x2='340' y2='120'/><line x1='215' y1='205' x2='340' y2='170'/><line x1='215' y1='205' x2='340' y2='240'/><circle cx='20' cy='145' r='3' fill='currentColor'/><g fill='currentColor' stroke='none' font-size='16' text-anchor='middle'><text x='182' y='20' font-weight='bold'>Buss</text><text x='375' y='20' font-weight='bold'>Tåg</text><text x='182' y='90'>I tid</text><text x='182' y='210'>Sen</text><text x='375' y='55'>I tid</text><text x='375' y='125'>Sen</text><text x='375' y='175'>I tid</text><text x='375' y='245'>Sen</text><text x='72' y='103'>0,9</text><text x='72' y='200'>0,1</text><text x='265' y='56'>0,7</text><text x='265' y='124'>0,3</text><text x='265' y='176'>0,7</text><text x='265' y='244'>0,3</text></g></svg>",
    svar: { varde: 0.37, tolerans: 0.001 },
    ledtradar: [
      "Det finns tre grenar där minst ett färdmedel är sent, men bara en gren där båda är i tid.",
      "Räkna ut sannolikheten att båda är i tid och använd komplementhändelsen."
    ],
    losning: "<ol><li>Komplementhändelsen till \"minst ett försenat\" är \"båda i tid\".</li><li>\\(P(\\text{båda i tid}) = 0{,}9 \\cdot 0{,}7 = 0{,}63\\)</li><li>\\(P(\\text{minst ett försenat}) = 1 - 0{,}63 = 0{,}37\\)</li></ol><p>Kontroll med grenarna: \\(0{,}9\\cdot 0{,}3 + 0{,}1 \\cdot 0{,}7 + 0{,}1 \\cdot 0{,}3 = 0{,}27 + 0{,}07 + 0{,}03 = 0{,}37\\).</p><p><strong>Svar:</strong> \\(0{,}37\\)</p>"
  },
  {
    id: "sanek-011",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Sannolikhet och statistik",
    moment: "Beroende händelser",
    niva: "A",
    poang: "0/0/1",
    typ: "tal",
    fraga: "<p>I en låda finns 4 röda kulor och ett okänt antal blå kulor. Man drar slumpmässigt två kulor utan återläggning.</p><p>Sannolikheten att båda kulorna är röda är \\(\\dfrac{2}{15}\\). Hur många blå kulor finns det i lådan?</p>",
    svar: { varde: 6, tolerans: 0, enhet: "st" },
    ledtradar: [
      "Kalla det totala antalet kulor \\(n\\). Ställ upp ett uttryck för sannolikheten att båda är röda.",
      "\\(\\dfrac{4}{n} \\cdot \\dfrac{3}{n-1} = \\dfrac{2}{15}\\) ger \\(n(n-1) = 90\\). Vilka två på varandra följande heltal har produkten 90?"
    ],
    losning: "<ol><li>Låt \\(n\\) vara det totala antalet kulor. Då är \\(P(\\text{två röda}) = \\dfrac{4}{n} \\cdot \\dfrac{3}{n-1} = \\dfrac{12}{n(n-1)}\\).</li><li>\\(\\dfrac{12}{n(n-1)} = \\dfrac{2}{15} \\Rightarrow n(n-1) = \\dfrac{12 \\cdot 15}{2} = 90\\).</li><li>\\(10 \\cdot 9 = 90\\), så \\(n = 10\\). Antalet blå kulor är \\(10 - 4 = 6\\).</li><li>Kontroll: \\(\\dfrac{4}{10} \\cdot \\dfrac{3}{9} = \\dfrac{12}{90} = \\dfrac{2}{15}\\) ✓</li></ol><p><strong>Svar:</strong> 6 blå kulor</p>"
  },

  // =====================================================================
  //  SANNOLIKHET OCH STATISTIK – DEL B
  // =====================================================================
  {
    id: "sanek-012",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Sannolikhet och statistik",
    moment: "Risk- och säkerhetsbedömning",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En klättrare säkrar sig med två separata förankringar som fungerar oberoende av varandra. Klättraren faller bara till marken om <em>båda</em> förankringarna brister.</p><p>Sannolikheten att en förankring brister vid ett fall är \\(0{,}02\\). Bestäm sannolikheten att båda förankringarna brister.</p>",
    svar: { varde: 0.0004, tolerans: 0.000001 },
    ledtradar: [
      "Förankringarna är oberoende. Hur räknar man sannolikheten att två oberoende händelser båda inträffar?",
      "Tänk på att \\(0{,}02 = \\dfrac{2}{100}\\)."
    ],
    losning: "<ol><li>Händelserna är oberoende, så sannolikheterna multipliceras.</li><li>\\(0{,}02 \\cdot 0{,}02 = \\dfrac{2}{100} \\cdot \\dfrac{2}{100} = \\dfrac{4}{10\\,000} = 0{,}0004\\)</li></ol><p>Med två förankringar har risken alltså minskat från 2 % till 0,04 % – det är därför man har dubbla säkerhetssystem.</p><p><strong>Svar:</strong> \\(0{,}0004\\)</p>"
  },
  {
    id: "sanek-013",
    kurser: ["1a", "1b"],
    del: "B",
    omrade: "Sannolikhet och statistik",
    moment: "Index",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>Tabellen visar ett index för elpriset för hushåll i en region. Basår är 2015.</p><table><tr><th>År</th><td>2015</td><td>2020</td><td>2025</td></tr><tr><th>Index</th><td>100</td><td>125</td><td>150</td></tr></table><p><strong>a)</strong> Ett hushålls elkostnad var 800 kr per månad år 2015. Vad var elkostnaden år 2025 om den har följt indexet och förbrukningen är densamma?</p><p><strong>b)</strong> En tidning skriver: <em>\"Elpriset steg med 25 procent mellan 2020 och 2025.\"</em> Stämmer påståendet? Motivera ditt svar.</p>",
    svar: { facit: "a) 1200 kr &nbsp; b) Nej, ökningen var 20 % (25 indexenheter av 125)." },
    ledtradar: [
      "a) Index 150 betyder att priset är 150 % av priset basåret.",
      "b) En ökning med 25 <em>indexenheter</em> är inte samma sak som 25 procent. Vad ska ökningen jämföras med?",
      "b) Räkna ut \\(\\dfrac{150}{125}\\)."
    ],
    losning: "<p><strong>a)</strong> Index 150 betyder att priset är \\(\\dfrac{150}{100} = 1{,}5\\) gånger så högt som 2015.<br>\\(800 \\cdot 1{,}5 = 1200\\) kr.</p><p><strong>b)</strong> Indexet ökade från 125 till 150, alltså med 25 indexenheter. Den procentuella ökningen ska jämföras med värdet år 2020:</p>\\[\\dfrac{150}{125} = \\dfrac{6}{5} = 1{,}20\\]<p>Förändringsfaktorn 1,20 betyder en ökning med 20 %, inte 25 %. Tidningen har förväxlat indexenheter med procent (25 % hade bara stämt om man jämförde med basåret, då indexet var 100).</p><p><strong>Svar:</strong> a) 1200 kr &nbsp; b) Nej, elpriset steg med 20 %.</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt beräknad elkostnad 1200 kr",
      "+C<sub>R</sub> för korrekt motivering att ökningen är 20 %, t.ex. via \\(\\frac{150}{125} = 1{,}2\\) eller \\(\\frac{25}{125} = 0{,}2\\)"
    ]
  },
  {
    id: "sanek-014",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Sannolikhet och statistik",
    moment: "Felkällor",
    niva: "E",
    poang: "1/0/0",
    typ: "val",
    fraga: "<p>En tidning vill undersöka hur mycket svenska ungdomar tränar. De lägger ut en enkät i en app för medlemmar på en gymkedja. Av de 2000 ungdomar som svarade tränar 85 % minst tre gånger i veckan. Tidningen skriver: <em>\"85 % av Sveriges ungdomar tränar minst tre gånger i veckan.\"</em></p><p>Vilken är den allvarligaste felkällan i undersökningen?</p>",
    svar: {
      alternativ: [
        "2000 svar är alldeles för få för att man ska kunna dra någon slutsats.",
        "Urvalet är inte representativt, eftersom bara gymmedlemmar kunde svara.",
        "Man borde ha angett resultatet i antal personer i stället för i procent.",
        "Enkäten borde ha gjorts på papper i stället för i en app."
      ],
      ratt: 1
    },
    ledtradar: [
      "Vem kunde svara på enkäten – och vem kunde inte svara?",
      "Är gymmedlemmar typiska för alla ungdomar när det gäller träning?"
    ],
    losning: "<p>Det stora problemet är <strong>urvalet</strong>. Bara medlemmar i en gymkedja kunde svara, och de tränar troligen mer än ungdomar i allmänhet. Resultatet går därför inte att generalisera till alla ungdomar i Sverige – det blir systematiskt för högt.</p><p>2000 svar är egentligen ett ganska stort urval; problemet är inte antalet utan <em>vilka</em> som svarade. Att redovisa i procent är helt i sin ordning.</p><p><strong>Svar:</strong> Urvalet är inte representativt.</p>"
  },
  {
    id: "sanek-015",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Sannolikhet och statistik",
    moment: "Risk- och säkerhetsbedömning",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En mobiltelefon har en fyrsiffrig PIN-kod, alltså någon av koderna 0000–9999. Efter tre felaktiga försök låses telefonen.</p><p>En tjuv gissar slumpmässigt men provar aldrig samma kod två gånger. Bestäm sannolikheten att tjuven kommer in i telefonen innan den låses.</p>",
    svar: { varde: 0.0003, tolerans: 0.000001 },
    ledtradar: [
      "Hur många möjliga koder finns det? Hur stor är chansen att det första försöket är rätt?",
      "Om första försöket var fel finns en kod färre att välja bland. Räkna sannolikheten att lyckas på andra respektive tredje försöket.",
      "Ett snabbare sätt: tjuven provar tre <em>olika</em> koder av 10 000. Hur stor är chansen att den rätta koden är en av dem?"
    ],
    losning: "<ol><li>Det finns \\(10\\,000\\) möjliga koder.</li><li>Rätt på försök 1: \\(\\dfrac{1}{10\\,000}\\).</li><li>Fel på försök 1, rätt på försök 2: \\(\\dfrac{9999}{10\\,000} \\cdot \\dfrac{1}{9999} = \\dfrac{1}{10\\,000}\\).</li><li>Fel, fel, rätt: \\(\\dfrac{9999}{10\\,000} \\cdot \\dfrac{9998}{9999} \\cdot \\dfrac{1}{9998} = \\dfrac{1}{10\\,000}\\).</li><li>Totalt: \\(\\dfrac{3}{10\\,000} = 0{,}0003\\).</li></ol><p>Enklare resonemang: tjuven provar 3 olika koder av 10 000, så chansen att den rätta finns bland dem är \\(\\dfrac{3}{10\\,000}\\).</p><p><strong>Svar:</strong> \\(0{,}0003\\) (dvs. \\(0{,}03\\) %)</p>"
  },
  {
    id: "sanek-016",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Sannolikhet och statistik",
    moment: "Risk- och säkerhetsbedömning",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>I en fabrikslokal sitter rökdetektorer. Varje detektor upptäcker en brand med sannolikheten \\(0{,}9\\), oberoende av de andra detektorerna. Larmet går om minst en detektor upptäcker branden.</p><p><strong>a)</strong> Bestäm sannolikheten att larmet går vid en brand om det finns två detektorer.</p><p><strong>b)</strong> Enligt ett säkerhetskrav ska sannolikheten att larmet går vid brand vara minst \\(0{,}9999\\). Hur många detektorer behövs minst? Motivera.</p>",
    svar: { facit: "a) \\(0{,}99\\) &nbsp; b) 4 detektorer" },
    ledtradar: [
      "Använd komplementhändelsen: larmet går <em>inte</em> om alla detektorer missar branden.",
      "Sannolikheten att en detektor missar är \\(0{,}1\\). Hur stor är sannolikheten att \\(n\\) detektorer alla missar?",
      "b) Undersök \\(0{,}1^n\\) för \\(n = 1, 2, 3, \\ldots\\) och jämför med \\(1 - 0{,}9999\\)."
    ],
    losning: "<p><strong>a)</strong> Sannolikheten att en detektor missar branden är \\(1 - 0{,}9 = 0{,}1\\). Larmet går inte bara om båda missar:</p>\\[P(\\text{inget larm}) = 0{,}1 \\cdot 0{,}1 = 0{,}01\\]\\[P(\\text{larm}) = 1 - 0{,}01 = 0{,}99\\]<p><strong>b)</strong> Med \\(n\\) detektorer är \\(P(\\text{larm}) = 1 - 0{,}1^n\\). Kravet \\(1 - 0{,}1^n \\ge 0{,}9999\\) betyder att \\(0{,}1^n \\le 0{,}0001\\).</p><ul><li>\\(n = 3\\): \\(0{,}1^3 = 0{,}001\\) ger \\(P(\\text{larm}) = 0{,}999\\) – räcker inte.</li><li>\\(n = 4\\): \\(0{,}1^4 = 0{,}0001\\) ger \\(P(\\text{larm}) = 0{,}9999\\) – kravet uppfylls.</li></ul><p><strong>Svar:</strong> a) \\(0{,}99\\) &nbsp; b) Minst 4 detektorer.</p>",
    bedomning: [
      "+C<sub>P</sub> för korrekt sannolikhet \\(0{,}99\\) i a), t.ex. via komplementhändelsen",
      "+A<sub>PL</sub> för korrekt antal detektorer (4) med en motivering som visar att 3 inte räcker men att 4 gör det"
    ]
  },
  {
    id: "sanek-017",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Sannolikhet och statistik",
    moment: "Beroende händelser",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Under en influensasäsong undersöktes 400 personer. Tabellen visar hur många som var vaccinerade och hur många som blev sjuka.</p><table><tr><th></th><th>Blev sjuk</th><th>Blev inte sjuk</th><th>Summa</th></tr><tr><th>Vaccinerad</th><td>12</td><td>228</td><td>240</td></tr><tr><th>Ovaccinerad</th><td>32</td><td>128</td><td>160</td></tr></table><p>En av de <strong>ovaccinerade</strong> personerna väljs slumpmässigt. Bestäm sannolikheten att personen blev sjuk.</p>",
    svar: { varde: 0.2, tolerans: 0.001 },
    ledtradar: [
      "Du väljer bara bland de ovaccinerade. Hur många är de?",
      "Hur många av de ovaccinerade blev sjuka?"
    ],
    losning: "<ol><li>Det finns 160 ovaccinerade personer, och av dem blev 32 sjuka.</li><li>\\(P(\\text{sjuk} \\mid \\text{ovaccinerad}) = \\dfrac{32}{160} = \\dfrac{1}{5} = 0{,}2\\)</li></ol><p>Jämför med de vaccinerade: \\(\\dfrac{12}{240} = 0{,}05\\). Att bli sjuk och att vara vaccinerad är alltså beroende händelser.</p><p><strong>Svar:</strong> \\(0{,}2\\)</p>"
  },

  // =====================================================================
  //  SANNOLIKHET OCH STATISTIK – DEL C
  // =====================================================================
  {
    id: "sanek-018",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Sannolikhet och statistik",
    moment: "Tillämpningar inom spel",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>På en skolmarknad erbjuds ett tärningsspel. Det kostar 10 kr att spela en gång. Man kastar två vanliga tärningar och vinner om summan blir 7 eller 11. Vid vinst får man 40 kr (insatsen ingår inte i vinsten, dvs. man får 40 kr totalt tillbaka).</p><p>Lönar det sig för spelaren att spela många gånger?</p>",
    svar: {
      alternativ: [
        "Ja, i genomsnitt går spelaren med ungefär 1 kr i vinst per spel.",
        "Nej, i genomsnitt förlorar spelaren ungefär 1,11 kr per spel.",
        "Nej, i genomsnitt förlorar spelaren ungefär 3,33 kr per spel.",
        "Spelet är rättvist – i genomsnitt går spelaren jämnt ut."
      ],
      ratt: 1
    },
    ledtradar: [
      "Gör en tabell över alla 36 utfall för två tärningar. Hur många ger summan 7? Summan 11?",
      "Om man spelar 36 gånger och utfallen fördelar sig som förväntat – hur mycket betalar man och hur mycket får man tillbaka?"
    ],
    losning: "<ol><li>Summan 7 fås på 6 sätt: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Summan 11 fås på 2 sätt: (5,6), (6,5).</li><li>\\(P(\\text{vinst}) = \\dfrac{8}{36} = \\dfrac{2}{9}\\).</li><li>Tänk dig 9 spel: man betalar \\(9 \\cdot 10 = 90\\) kr och vinner i genomsnitt 2 gånger, alltså får man tillbaka \\(2 \\cdot 40 = 80\\) kr.</li><li>Förlust: \\(90 - 80 = 10\\) kr på 9 spel, dvs. \\(\\dfrac{10}{9} \\approx 1{,}11\\) kr per spel.</li></ol><p>(Svaret 3,33 kr får man om man glömmer summan 11 och räknar med \\(P = \\dfrac{1}{6}\\).)</p><p><strong>Svar:</strong> Nej, i genomsnitt förlorar spelaren ca 1,11 kr per spel.</p>"
  },
  {
    id: "sanek-019",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Sannolikhet och statistik",
    moment: "Träddiagram",
    niva: "E",
    poang: "2/0/0",
    typ: "redovisning",
    fraga: "<p>På väg till skolan passerar Omar två trafikljus. Sannolikheten att det första ljuset visar grönt när han kommer fram är \\(0{,}4\\) och sannolikheten att det andra visar grönt är \\(0{,}5\\). Trafikljusen fungerar oberoende av varandra.</p><p><strong>a)</strong> Bestäm sannolikheten att båda trafikljusen visar grönt.</p><p><strong>b)</strong> Bestäm sannolikheten att <strong>exakt ett</strong> av trafikljusen visar grönt.</p>",
    svar: { facit: "a) \\(0{,}2\\) &nbsp; b) \\(0{,}5\\)" },
    ledtradar: [
      "Rita ett träddiagram med två steg: första ljuset (grönt/inte grönt) och andra ljuset (grönt/inte grönt).",
      "Sannolikheten för \"inte grönt\" vid första ljuset är \\(1 - 0{,}4\\).",
      "b) Exakt ett grönt kan inträffa på två sätt. Addera sannolikheterna för de två grenarna."
    ],
    losning: "<p>Träddiagram (G = grönt, R = inte grönt):</p><svg viewBox='0 0 420 220' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2' style='max-width:420px;width:100%'><line x1='20' y1='115' x2='150' y2='60'/><line x1='20' y1='115' x2='150' y2='170'/><line x1='200' y1='60' x2='320' y2='30'/><line x1='200' y1='60' x2='320' y2='90'/><line x1='200' y1='170' x2='320' y2='140'/><line x1='200' y1='170' x2='320' y2='200'/><circle cx='20' cy='115' r='3' fill='currentColor'/><g fill='currentColor' stroke='none' font-size='16' text-anchor='middle'><text x='175' y='65'>G</text><text x='175' y='175'>R</text><text x='340' y='35'>G</text><text x='340' y='95'>R</text><text x='340' y='145'>G</text><text x='340' y='205'>R</text><text x='72' y='78'>0,4</text><text x='72' y='166'>0,6</text><text x='255' y='36'>0,5</text><text x='255' y='94'>0,5</text><text x='255' y='146'>0,5</text><text x='255' y='204'>0,5</text><text x='395' y='35'>0,2</text><text x='395' y='95'>0,2</text><text x='395' y='145'>0,3</text><text x='395' y='205'>0,3</text></g></svg><p><strong>a)</strong> Ljusen är oberoende: \\(P(\\text{GG}) = 0{,}4 \\cdot 0{,}5 = 0{,}2\\).</p><p><strong>b)</strong> Exakt ett grönt: grenarna GR och RG.</p>\\[P(\\text{GR}) + P(\\text{RG}) = 0{,}4 \\cdot 0{,}5 + 0{,}6 \\cdot 0{,}5 = 0{,}2 + 0{,}3 = 0{,}5\\]<p>Kontroll: alla fyra grenarna har summan \\(0{,}2 + 0{,}2 + 0{,}3 + 0{,}3 = 1\\).</p><p><strong>Svar:</strong> a) \\(0{,}2\\) &nbsp; b) \\(0{,}5\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt sannolikhet \\(0{,}2\\) i a)",
      "+E<sub>P</sub> för korrekt sannolikhet \\(0{,}5\\) i b) med båda grenarna medräknade"
    ]
  },
  {
    id: "sanek-020",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Sannolikhet och statistik",
    moment: "Beroende händelser",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>I en låda med 20 lampor är 3 trasiga. En kund tar slumpmässigt två lampor ur lådan.</p><p><strong>a)</strong> Bestäm sannolikheten att båda lamporna är trasiga.</p><p><strong>b)</strong> Bestäm sannolikheten att <strong>minst en</strong> av lamporna är trasig.</p>",
    svar: { facit: "a) \\(\\dfrac{3}{190} \\approx 0{,}016\\) &nbsp; b) \\(\\dfrac{27}{95} \\approx 0{,}28\\)" },
    ledtradar: [
      "Kunden tar två olika lampor – det är dragning utan återläggning, så händelserna är beroende.",
      "a) Efter att en trasig lampa tagits finns 2 trasiga av 19 kvar.",
      "b) Komplementhändelsen till \"minst en trasig\" är \"båda hela\"."
    ],
    losning: "<p><strong>a)</strong></p>\\[P(\\text{båda trasiga}) = \\dfrac{3}{20} \\cdot \\dfrac{2}{19} = \\dfrac{6}{380} = \\dfrac{3}{190} \\approx 0{,}016\\]<p><strong>b)</strong> Det finns 17 hela lampor. Komplementhändelsen är att båda är hela:</p>\\[P(\\text{båda hela}) = \\dfrac{17}{20} \\cdot \\dfrac{16}{19} = \\dfrac{272}{380}\\]\\[P(\\text{minst en trasig}) = 1 - \\dfrac{272}{380} = \\dfrac{108}{380} = \\dfrac{27}{95} \\approx 0{,}28\\]<p><strong>Svar:</strong> a) ca \\(0{,}016\\) &nbsp; b) ca \\(0{,}28\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt sannolikhet i a), \\(\\frac{3}{190}\\) eller ca \\(0{,}016\\)",
      "+C<sub>P</sub> för korrekt sannolikhet i b), \\(\\frac{27}{95}\\) eller ca \\(0{,}28\\), där det framgår att dragningen sker utan återläggning"
    ]
  },
  {
    id: "sanek-021",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Sannolikhet och statistik",
    moment: "Risk- och säkerhetsbedömning",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>I en befolkning har 2 % en viss sjukdom. Ett snabbtest för sjukdomen ger positivt utslag för 95 % av dem som är sjuka. Testet ger också (felaktigt) positivt utslag för 10 % av dem som är friska. Träddiagrammet beskriver situationen.</p><p><strong>a)</strong> Bestäm sannolikheten att en slumpmässigt vald person är sjuk och testar positivt.</p><p><strong>b)</strong> Bestäm sannolikheten att en slumpmässigt vald person testar positivt.</p><p><strong>c)</strong> Lina testar positivt. Hur stor är sannolikheten att hon verkligen är sjuk? Kommentera resultatet.</p>",
    figur: "<svg viewBox='0 0 440 260' xmlns='http://www.w3.org/2000/svg' fill='none' stroke='currentColor' stroke-width='2'><line x1='20' y1='140' x2='150' y2='75'/><line x1='20' y1='140' x2='150' y2='205'/><line x1='210' y1='75' x2='330' y2='40'/><line x1='210' y1='75' x2='330' y2='110'/><line x1='210' y1='205' x2='330' y2='170'/><line x1='210' y1='205' x2='330' y2='240'/><circle cx='20' cy='140' r='3' fill='currentColor'/><g fill='currentColor' stroke='none' font-size='16'><text x='158' y='80'>Sjuk</text><text x='155' y='210'>Frisk</text><text x='338' y='45'>Positivt</text><text x='338' y='115'>Negativt</text><text x='338' y='175'>Positivt</text><text x='338' y='245'>Negativt</text></g><g fill='currentColor' stroke='none' font-size='16' text-anchor='middle'><text x='70' y='96'>0,02</text><text x='70' y='196'>0,98</text><text x='258' y='46'>0,95</text><text x='258' y='114'>0,05</text><text x='258' y='176'>0,10</text><text x='258' y='244'>0,90</text></g></svg>",
    svar: { facit: "a) \\(0{,}019\\) &nbsp; b) \\(0{,}117\\) &nbsp; c) ca \\(0{,}16\\), dvs. bara ca 16 % av de positiva är sjuka" },
    ledtradar: [
      "a) Multiplicera sannolikheterna längs grenen Sjuk → Positivt.",
      "b) Man kan testa positivt på två sätt: sjuk och positiv, eller frisk och positiv.",
      "c) Tänk dig 10 000 personer. Hur många är sjuka och positiva? Hur många testar positivt totalt?"
    ],
    losning: "<p><strong>a)</strong> \\(P(\\text{sjuk och positiv}) = 0{,}02 \\cdot 0{,}95 = 0{,}019\\)</p><p><strong>b)</strong> \\(P(\\text{frisk och positiv}) = 0{,}98 \\cdot 0{,}10 = 0{,}098\\)</p>\\[P(\\text{positiv}) = 0{,}019 + 0{,}098 = 0{,}117\\]<p><strong>c)</strong> Av alla som testar positivt är andelen sjuka</p>\\[\\dfrac{0{,}019}{0{,}117} \\approx 0{,}16\\]<p>Med 10 000 personer: 200 är sjuka, varav 190 testar positivt. 9800 är friska, varav 980 testar positivt. Totalt 1170 positiva, men bara 190 av dem är sjuka: \\(\\dfrac{190}{1170} \\approx 16\\) %.</p><p><em>Kommentar:</em> Trots att testet hittar 95 % av de sjuka är bara ca 16 % av de positiva verkligen sjuka. Det beror på att sjukdomen är ovanlig – de friska är så många att även 10 % falskt positiva blir fler än de sjuka. Ett positivt snabbtest bör därför följas upp med ett säkrare test.</p><p><strong>Svar:</strong> a) \\(0{,}019\\) &nbsp; b) \\(0{,}117\\) &nbsp; c) ca \\(0{,}16\\)</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt sannolikhet \\(0{,}019\\) i a)",
      "+C<sub>P</sub> för korrekt sannolikhet \\(0{,}117\\) i b) där båda grenarna med positivt utslag räknas med",
      "+A<sub>R</sub> för korrekt beräknad sannolikhet ca \\(0{,}16\\) i c) med en kommentar som förklarar varför den är så låg, t.ex. att de friska är så många fler än de sjuka"
    ]
  },
  {
    id: "sanek-022",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Sannolikhet och statistik",
    moment: "Korrelation och kausalitet",
    niva: "C",
    poang: "1/1/0",
    typ: "redovisning",
    fraga: "<p>En undersökning av 50 svenska kommuner visar ett starkt positivt samband mellan antalet pizzerior i kommunen och antalet anmälda brott i kommunen under ett år. En debattör skriver:</p><p><em>\"Pizzerior leder uppenbarligen till brottslighet. Kommunerna borde begränsa antalet pizzerior.\"</em></p><p><strong>a)</strong> Förklara varför debattörens slutsats inte kan dras utifrån undersökningen.</p><p><strong>b)</strong> Ge en trolig förklaring till sambandet och beskriv hur man kunde göra jämförelsen mellan kommunerna mer rättvisande.</p>",
    svar: { facit: "a) Korrelation visar inte kausalitet. b) Befolkningsmängden påverkar båda; jämför antal per 1000 invånare." },
    ledtradar: [
      "Betyder ett starkt samband att den ena variabeln orsakar den andra?",
      "Vad har en stor kommun mer av än en liten kommun?",
      "Hur kan man ta hänsyn till att kommunerna har olika många invånare?"
    ],
    losning: "<p><strong>a)</strong> Undersökningen visar bara en <strong>korrelation</strong> (ett samband), inte ett orsakssamband (<strong>kausalitet</strong>). Att två storheter ökar samtidigt betyder inte att den ena orsakar den andra.</p><p><strong>b)</strong> En trolig förklaring är en bakomliggande variabel: <em>antalet invånare</em>. I en stor kommun med många invånare finns både fler pizzerior och fler anmälda brott, helt enkelt för att det bor fler människor där.</p><p>För att jämförelsen ska bli mer rättvisande bör man räkna med <em>relativa</em> tal, t.ex. antal pizzerior per 1000 invånare och antal anmälda brott per 1000 invånare, och sedan undersöka om det fortfarande finns ett samband.</p>",
    bedomning: [
      "+E<sub>R</sub> för en godtagbar förklaring att ett samband (korrelation) inte innebär ett orsakssamband (kausalitet)",
      "+C<sub>R</sub> för att ange befolkningsmängden (eller motsvarande bakomliggande variabel) som förklaring och föreslå en relevant förbättring, t.ex. jämförelse per invånare"
    ]
  },
  {
    id: "sanek-023",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Sannolikhet och statistik",
    moment: "Urvalsmetoder",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En kommun har 24 000 invånare. Av dem bor 6 000 på landsbygden och resten i tätorten. Kommunen gör en enkätundersökning med ett <em>stratifierat urval</em> på 600 personer, där landsbygd och tätort är representerade i proportion till hur många som bor där.</p><p>Hur många av de 600 personerna ska väljas från landsbygden?</p>",
    svar: { varde: 150, tolerans: 0, enhet: "personer" },
    ledtradar: [
      "Hur stor andel av kommunens invånare bor på landsbygden?",
      "Samma andel av urvalet ska komma från landsbygden."
    ],
    losning: "<ol><li>Andelen som bor på landsbygden: \\(\\dfrac{6\\,000}{24\\,000} = \\dfrac{1}{4} = 25\\) %.</li><li>I ett stratifierat urval ska samma andel av urvalet komma från landsbygden: \\(\\dfrac{1}{4} \\cdot 600 = 150\\).</li></ol><p>Resten, \\(600 - 150 = 450\\) personer, väljs slumpmässigt bland tätortsborna.</p><p><strong>Svar:</strong> 150 personer</p>"
  },
  {
    id: "sanek-024",
    kurser: ["1a", "1b"],
    del: "C",
    omrade: "Sannolikhet och statistik",
    moment: "Index och reallön",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>Konsumentprisindex (KPI) mäter hur priserna utvecklas. Tabellen visar KPI (avrundade värden) och Miras månadslön.</p><table><tr><th>År</th><td>2020</td><td>2025</td></tr><tr><th>KPI</th><td>335</td><td>415</td></tr><tr><th>Miras månadslön</th><td>27 500 kr</td><td>33 000 kr</td></tr></table><p><strong>a)</strong> Med hur många procent har priserna enligt KPI ökat från 2020 till 2025?</p><p><strong>b)</strong> Mira säger att hon har fått det bättre ekonomiskt eftersom lönen har ökat med 20 %. Undersök om hennes köpkraft (reallön) har ökat eller minskat.</p><p><strong>c)</strong> Vilken månadslön hade Mira behövt år 2025 för att hennes reallön skulle ha ökat med 5 % jämfört med 2020?</p>",
    svar: { facit: "a) ca 24 % &nbsp; b) Reallönen har minskat med ca 3 % (ca 26 600 kr i 2020 års penningvärde). &nbsp; c) ca 35 800 kr" },
    ledtradar: [
      "a) Beräkna förändringsfaktorn \\(\\dfrac{415}{335}\\).",
      "b) Räkna om lönen 2025 till 2020 års penningvärde: \\(33\\,000 \\cdot \\dfrac{335}{415}\\). Jämför med 27 500 kr.",
      "c) Lönen ska både kompensera för prisökningen och dessutom öka med 5 %. Vilka förändringsfaktorer ska multipliceras?"
    ],
    losning: "<p><strong>a)</strong> \\(\\dfrac{415}{335} \\approx 1{,}239\\). Priserna har ökat med ca 24 %.</p><p><strong>b)</strong> Lönen 2025 uttryckt i 2020 års penningvärde:</p>\\[33\\,000 \\cdot \\dfrac{335}{415} \\approx 26\\,639 \\text{ kr}\\]<p>Det är mindre än 27 500 kr. \\(\\dfrac{26\\,639}{27\\,500} \\approx 0{,}969\\), så reallönen har minskat med ca 3 %.</p><p>Alternativt: lönen har ökat med faktorn 1,20 men priserna med faktorn ca 1,24. Eftersom priserna har ökat mer än lönen har köpkraften minskat. Mira har fel.</p><p><strong>c)</strong> Reallönen ska öka med 5 %: i 2020 års penningvärde ska lönen vara \\(27\\,500 \\cdot 1{,}05 = 28\\,875\\) kr. Räknat i 2025 års priser:</p>\\[28\\,875 \\cdot \\dfrac{415}{335} \\approx 35\\,771 \\text{ kr}\\]<p><strong>Svar:</strong> a) ca 24 % &nbsp; b) Reallönen har minskat med ca 3 %. &nbsp; c) ca 35 800 kr</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt beräknad prisökning, ca 24 %",
      "+C<sub>R</sub> för korrekt slutsats att köpkraften har minskat, med en godtagbar jämförelse (reallön ca 26 600 kr eller jämförelse av förändringsfaktorerna 1,20 och 1,24)",
      "+A<sub>PL</sub> för korrekt lön ca 35 800 kr i c) med en lösning där både prisökningen och reallöneökningen hanteras"
    ]
  },
  {
    id: "sanek-025",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Sannolikhet och statistik",
    moment: "Sannolikhet i flera steg",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>I en stor serie skraplotter är var femte lott en vinstlott, dvs. sannolikheten att en lott vinner är \\(0{,}2\\). Serien är så stor att lotterna kan betraktas som oberoende av varandra.</p><p>Elsa köper tre lotter. Bestäm sannolikheten att <strong>ingen</strong> av hennes lotter vinner.</p>",
    svar: { varde: 0.512, tolerans: 0.001 },
    ledtradar: [
      "Hur stor är sannolikheten att en lott <em>inte</em> vinner?",
      "Alla tre lotterna ska vara nitlotter. Lotterna är oberoende."
    ],
    losning: "<ol><li>\\(P(\\text{nit}) = 1 - 0{,}2 = 0{,}8\\)</li><li>Tre oberoende nitlotter: \\(0{,}8 \\cdot 0{,}8 \\cdot 0{,}8 = 0{,}8^3 = 0{,}512\\)</li></ol><p>Det är alltså ungefär 51 % risk att Elsa inte vinner något alls, trots att hon har köpt tre lotter.</p><p><strong>Svar:</strong> \\(0{,}512\\)</p>"
  },
  {
    id: "sanek-026",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Sannolikhet och statistik",
    moment: "Tillämpningar inom spel",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Ali och Bea spelar ett tärningsspel. De kastar en vanlig tärning turvis och Ali börjar. Den som först får en sexa vinner. Varje spelare får kasta högst två gånger, så spelet slutar oavgjort om ingen har fått en sexa efter fyra kast.</p><p>Bea tycker att spelet är orättvist. Bestäm sannolikheten att Ali vinner och sannolikheten att Bea vinner, och avgör om Bea har rätt.</p>",
    svar: { facit: "\\(P(\\text{Ali}) = \\dfrac{61}{216} \\approx 0{,}28\\), \\(P(\\text{Bea}) = \\dfrac{305}{1296} \\approx 0{,}24\\). Bea har rätt – Ali har större chans." },
    ledtradar: [
      "Rita ett träddiagram där varje kast ger \"sexa\" eller \"inte sexa\". Spelet tar slut på en gren så snart någon får en sexa.",
      "Ali kan vinna i kast 1 eller i kast 3. För att Ali ska vinna i kast 3 måste kast 1 och 2 vara \"inte sexa\".",
      "Bea kan vinna i kast 2 eller i kast 4."
    ],
    losning: "<p>Sannolikheten för sexa är \\(\\dfrac{1}{6}\\) och för inte sexa \\(\\dfrac{5}{6}\\) i varje kast. Kasten är oberoende.</p><p><strong>Ali</strong> vinner i kast 1 eller kast 3:</p>\\[P(\\text{Ali}) = \\dfrac{1}{6} + \\dfrac{5}{6} \\cdot \\dfrac{5}{6} \\cdot \\dfrac{1}{6} = \\dfrac{36}{216} + \\dfrac{25}{216} = \\dfrac{61}{216} \\approx 0{,}282\\]<p><strong>Bea</strong> vinner i kast 2 eller kast 4:</p>\\[P(\\text{Bea}) = \\dfrac{5}{6} \\cdot \\dfrac{1}{6} + \\left(\\dfrac{5}{6}\\right)^3 \\cdot \\dfrac{1}{6} = \\dfrac{180}{1296} + \\dfrac{125}{1296} = \\dfrac{305}{1296} \\approx 0{,}235\\]<p>Kontroll: \\(P(\\text{oavgjort}) = \\left(\\dfrac{5}{6}\\right)^4 = \\dfrac{625}{1296}\\) och \\(\\dfrac{366 + 305 + 625}{1296} = 1\\) ✓</p><p><strong>Slutsats:</strong> Ali vinner med sannolikheten ca 0,28 och Bea med ca 0,24. Bea har rätt – spelet gynnar den som börjar, eftersom Ali alltid får kasta före Bea i varje omgång.</p>",
    bedomning: [
      "+C<sub>P</sub> för korrekt beräknad sannolikhet för minst en av spelarna, t.ex. \\(P(\\text{Ali}) = \\frac{61}{216} \\approx 0{,}28\\)",
      "+A<sub>R</sub> för korrekta sannolikheter för båda spelarna och en motiverad slutsats om att spelet gynnar Ali"
    ]
  },

  // =====================================================================
  //  PRIVATEKONOMI OCH VARDAGSMATEMATIK – DEL A
  // =====================================================================
  {
    id: "sanek-027",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Moms",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En cykelhjälm kostar 480 kr exklusive moms. Momsen är 25 %.</p><p>Vad kostar cykelhjälmen inklusive moms?</p>",
    svar: { varde: 600, tolerans: 0, enhet: "kr" },
    ledtradar: [
      "25 % är en fjärdedel.",
      "Räkna ut momsen och lägg till den, eller multiplicera med förändringsfaktorn \\(1{,}25\\)."
    ],
    losning: "<ol><li>Momsen är 25 % av 480 kr: \\(\\dfrac{480}{4} = 120\\) kr.</li><li>Pris inklusive moms: \\(480 + 120 = 600\\) kr.</li></ol><p>Alternativt: \\(480 \\cdot 1{,}25 = 600\\) kr.</p><p><strong>Svar:</strong> 600 kr</p>"
  },
  {
    id: "sanek-028",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Procent och procentenheter",
    niva: "C",
    poang: "0/1/0",
    typ: "val",
    fraga: "<p>Räntan på ett bolån höjdes från 4 % till 5 %.</p><p>Vilket påstående är korrekt?</p>",
    svar: {
      alternativ: [
        "Räntan höjdes med 1 %.",
        "Räntan höjdes med 1 procentenhet, vilket är en ökning med 20 %.",
        "Räntan höjdes med 1 procentenhet, vilket är en ökning med 25 %.",
        "Räntan höjdes med 25 procentenheter."
      ],
      ratt: 2
    },
    ledtradar: [
      "Skillnaden mellan två procentsatser mäts i procentenheter.",
      "Den procentuella ökningen jämför förändringen med det ursprungliga värdet, alltså med 4 %."
    ],
    losning: "<ol><li>Från 4 % till 5 % är en ökning med \\(5 - 4 = 1\\) <strong>procentenhet</strong>.</li><li>Den procentuella ökningen är förändringen delad med ursprungsvärdet: \\(\\dfrac{1}{4} = 0{,}25 = 25\\) %.</li></ol><p>(20 % får man om man felaktigt jämför med det nya värdet: \\(\\dfrac{1}{5}\\).)</p><p><strong>Svar:</strong> Räntan höjdes med 1 procentenhet, vilket är en ökning med 25 %.</p>"
  },
  {
    id: "sanek-029",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Hållbar utveckling – energi",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Familjen Berg installerade en värmepump. Deras årliga elförbrukning minskade då från 20 000 kWh till 15 000 kWh.</p><p>Med hur många procent minskade elförbrukningen?</p>",
    svar: { varde: 25, tolerans: 0, enhet: "%" },
    ledtradar: [
      "Hur stor var minskningen i kWh?",
      "Jämför minskningen med den ursprungliga förbrukningen."
    ],
    losning: "<ol><li>Minskning: \\(20\\,000 - 15\\,000 = 5\\,000\\) kWh.</li><li>Andel av ursprungsvärdet: \\(\\dfrac{5\\,000}{20\\,000} = \\dfrac{1}{4} = 25\\) %.</li></ol><p><strong>Svar:</strong> 25 %</p>"
  },
  {
    id: "sanek-030",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Förändringsfaktor i flera steg",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Ett företag har som klimatmål att minska sina koldioxidutsläpp med 20 % per år. Ange den totala förändringsfaktorn för utsläppen efter två år om målet uppfylls.</p>",
    svar: { varde: 0.64, tolerans: 0.001 },
    ledtradar: [
      "Vilken förändringsfaktor motsvarar en minskning med 20 %?",
      "Vid förändringar i flera steg multipliceras förändringsfaktorerna."
    ],
    losning: "<ol><li>En minskning med 20 % ger förändringsfaktorn \\(1 - 0{,}20 = 0{,}8\\).</li><li>Två år i rad: \\(0{,}8 \\cdot 0{,}8 = 0{,}64\\).</li></ol><p>Utsläppen har alltså minskat med 36 % totalt – inte med 40 %, eftersom den andra minskningen räknas på ett mindre värde.</p><p><strong>Svar:</strong> \\(0{,}64\\)</p>"
  },
  {
    id: "sanek-031",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Ränta",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Elin lånar 120 000 kr för att köpa en bil. Årsräntan är 5 %.</p><p>Hur mycket ränta ska Elin betala för den första månaden?</p>",
    svar: { varde: 500, tolerans: 0, enhet: "kr" },
    ledtradar: [
      "Räkna först ut räntan för ett helt år.",
      "Ett år har 12 månader."
    ],
    losning: "<ol><li>Ränta för ett år: \\(0{,}05 \\cdot 120\\,000 = 6\\,000\\) kr.</li><li>Ränta för en månad: \\(\\dfrac{6\\,000}{12} = 500\\) kr.</li></ol><p><strong>Svar:</strong> 500 kr</p>"
  },
  {
    id: "sanek-032",
    kurser: ["1a", "1b", "1c"],
    del: "A",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Förändringsfaktor i flera steg",
    niva: "A",
    poang: "0/0/1",
    typ: "tal",
    fraga: "<p>Priset på en vara sänks först med 20 %. Några veckor senare sänks det nya priset med ytterligare 20 %.</p><p>Med hur många procent måste priset nu höjas för att varan ska kosta lika mycket som från början? Ange svaret exakt.</p>",
    svar: { varde: 56.25, tolerans: 0.01, enhet: "%" },
    ledtradar: [
      "Vilken total förändringsfaktor ger de två sänkningarna?",
      "Kalla förändringsfaktorn för höjningen \\(x\\). Priset ska tillbaka till ursprungspriset, så \\(0{,}64 \\cdot x = 1\\).",
      "\\(\\dfrac{1}{0{,}64} = \\dfrac{100}{64}\\). Förenkla bråket."
    ],
    losning: "<ol><li>Två sänkningar med 20 %: \\(0{,}8 \\cdot 0{,}8 = 0{,}64\\). Priset är nu 64 % av ursprungspriset.</li><li>Höjningens förändringsfaktor \\(x\\) ska uppfylla \\(0{,}64 \\cdot x = 1\\), så \\(x = \\dfrac{1}{0{,}64} = \\dfrac{100}{64} = \\dfrac{25}{16}\\).</li><li>\\(\\dfrac{25}{16} = 1 + \\dfrac{9}{16} = 1{,}5625\\). Priset måste höjas med 56,25 %.</li></ol><p>Kontroll: om varan kostade 100 kr kostar den nu 64 kr, och \\(64 \\cdot 1{,}5625 = 100\\) kr ✓. (40 % är fel eftersom höjningen räknas på det lägre priset.)</p><p><strong>Svar:</strong> 56,25 %</p>"
  },

  // =====================================================================
  //  PRIVATEKONOMI OCH VARDAGSMATEMATIK – DEL B
  // =====================================================================
  {
    id: "sanek-033",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Jämförpris",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Ett paket pasta som väger 500 g kostar 18 kr.</p><p>Bestäm jämförpriset i kronor per kilogram.</p>",
    svar: { varde: 36, tolerans: 0, enhet: "kr/kg" },
    ledtradar: [
      "Hur många paket på 500 g behövs för att få 1 kg?",
      "Jämförpris = pris per kilogram."
    ],
    losning: "<ol><li>1 kg = 1000 g, vilket är 2 paket på 500 g.</li><li>Jämförpris: \\(2 \\cdot 18 = 36\\) kr/kg.</li></ol><p><strong>Svar:</strong> 36 kr/kg</p>"
  },
  {
    id: "sanek-034",
    kurser: ["1a", "1b", "1c"],
    del: "B",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Kritisk granskning av reklam",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En chipsförpackning brukade innehålla 400 g och kosta 30 kr. Nu står det på förpackningen:</p><p style='text-align:center'><strong>\"NU 50 % MER – TILL SAMMA PRIS!\"</strong></p><p>Den nya förpackningen innehåller 600 g och kostar fortfarande 30 kr. Daniel tror att kilopriset har sjunkit med 50 %.</p><p>Med hur många procent har kilopriset sjunkit? Avrunda till en decimal.</p>",
    svar: { varde: 33.3, tolerans: 0.35, enhet: "%" },
    ledtradar: [
      "Beräkna kilopriset före och efter förändringen.",
      "Jämför minskningen med det <em>ursprungliga</em> kilopriset."
    ],
    losning: "<ol><li>Kilopris före: 400 g kostar 30 kr, så 1 kg kostar \\(30 \\cdot \\dfrac{1000}{400} = 75\\) kr/kg.</li><li>Kilopris efter: 600 g kostar 30 kr, så 1 kg kostar \\(30 \\cdot \\dfrac{1000}{600} = 50\\) kr/kg.</li><li>Minskning: \\(75 - 50 = 25\\) kr/kg, vilket är \\(\\dfrac{25}{75} = \\dfrac{1}{3} \\approx 33{,}3\\) % av det ursprungliga kilopriset.</li></ol><p>Daniel har fel: 50 % mer innehåll betyder att kilopriset multipliceras med \\(\\dfrac{1}{1{,}5} = \\dfrac{2}{3}\\), alltså en sänkning med ca 33 %.</p><p><strong>Svar:</strong> ca 33,3 %</p>"
  },
  {
    id: "sanek-035",
    kurser: ["1a"],
    del: "B",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Vinstmarginal",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>En sportbutik köper in ett par löparskor för 600 kr exklusive moms och säljer dem för 1 000 kr inklusive 25 % moms.</p><p>Bestäm butikens vinstmarginal i procent.</p>",
    svar: { varde: 25, tolerans: 0.1, enhet: "%" },
    ledtradar: [
      "Momsen går till staten. Räkna först ut försäljningspriset exklusive moms.",
      "Vinstmarginal = \\(\\dfrac{\\text{vinst}}{\\text{försäljningspris exkl. moms}}\\)."
    ],
    losning: "<ol><li>Försäljningspris exklusive moms: \\(\\dfrac{1000}{1{,}25} = 800\\) kr.</li><li>Vinst: \\(800 - 600 = 200\\) kr.</li><li>Vinstmarginal: \\(\\dfrac{200}{800} = 0{,}25 = 25\\) %.</li></ol><p>Vanligt fel: att dra av 25 % av 1000 kr (750 kr) i stället för att dividera med 1,25.</p><p><strong>Svar:</strong> 25 %</p>"
  },
  {
    id: "sanek-036",
    kurser: ["1a"],
    del: "B",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Vinstmarginal",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>En elektronikbutik köper in hörlurar för 360 kr per styck exklusive moms. Butiken vill ha en vinstmarginal på 25 %. Momsen är 25 %.</p><p><strong>a)</strong> Vilket pris inklusive moms ska butiken sätta på hörlurarna?</p><p><strong>b)</strong> Under en rea sänks priset inklusive moms med 20 %. Vilken vinstmarginal får butiken då?</p>",
    svar: { facit: "a) 600 kr &nbsp; b) 6,25 %" },
    ledtradar: [
      "Vinstmarginalen räknas på priset exklusive moms. Om vinsten är 25 % av priset exkl. moms, hur stor andel av priset är inköpspriset?",
      "a) Inköpspriset 360 kr motsvarar 75 % av priset exkl. moms.",
      "b) Räkna ut reapriset inkl. moms, ta bort momsen och beräkna den nya vinsten."
    ],
    losning: "<p><strong>a)</strong> Vinsten ska vara 25 % av priset exklusive moms. Då är inköpspriset 75 % av priset exklusive moms:</p>\\[0{,}75 \\cdot P = 360 \\Rightarrow P = \\dfrac{360}{0{,}75} = 480 \\text{ kr (exkl. moms)}\\]<p>Kontroll: vinst \\(480 - 360 = 120\\) kr och \\(\\dfrac{120}{480} = 0{,}25\\) ✓.<br>Pris inklusive moms: \\(480 \\cdot 1{,}25 = 600\\) kr.</p><p><strong>b)</strong> Reapris inklusive moms: \\(600 \\cdot 0{,}8 = 480\\) kr.<br>Exklusive moms: \\(\\dfrac{480}{1{,}25} = 384\\) kr.<br>Vinst: \\(384 - 360 = 24\\) kr.<br>Vinstmarginal: \\(\\dfrac{24}{384} = 0{,}0625 = 6{,}25\\) %.</p><p><strong>Svar:</strong> a) 600 kr &nbsp; b) 6,25 %</p>",
    bedomning: [
      "+C<sub>P</sub> för korrekt pris 600 kr inklusive moms i a), där vinstmarginalen räknas på priset exklusive moms",
      "+A<sub>PL</sub> för korrekt vinstmarginal 6,25 % i b) med korrekt hantering av både rea och moms"
    ]
  },

  // =====================================================================
  //  PRIVATEKONOMI OCH VARDAGSMATEMATIK – DEL C
  // =====================================================================
  {
    id: "sanek-037",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Ränta och amortering",
    niva: "C",
    poang: "2/1/0",
    typ: "redovisning",
    fraga: "<p>Jonas lånar 180 000 kr för att köpa en bil. Lånet ska betalas tillbaka med <em>rak amortering</em> varje månad under 5 år, dvs. han amorterar lika mycket varje månad. Årsräntan är 6 % och räntan betalas varje månad på den skuld som är kvar.</p><p><strong>a)</strong> Hur mycket amorterar Jonas varje månad?</p><p><strong>b)</strong> Hur mycket ska Jonas betala totalt (amortering + ränta) den första månaden?</p><p><strong>c)</strong> Hur mycket ränta betalar Jonas sammanlagt under det första året?</p>",
    svar: { facit: "a) 3 000 kr &nbsp; b) 3 900 kr &nbsp; c) 9 810 kr" },
    ledtradar: [
      "a) Hur många månader är 5 år?",
      "b) Månadsräntan är \\(\\dfrac{6}{12} = 0{,}5\\) % av skulden.",
      "c) Skulden minskar med 3 000 kr varje månad, så räntan minskar med lika mycket varje månad. Räkna ut räntan för månad 1 och månad 12."
    ],
    losning: "<p><strong>a)</strong> 5 år = 60 månader. Amortering: \\(\\dfrac{180\\,000}{60} = 3\\,000\\) kr per månad.</p><p><strong>b)</strong> Månadsränta: \\(\\dfrac{0{,}06}{12} = 0{,}005\\). Ränta första månaden: \\(0{,}005 \\cdot 180\\,000 = 900\\) kr.<br>Totalt: \\(3\\,000 + 900 = 3\\,900\\) kr.</p><p><strong>c)</strong> Varje månad minskar skulden med 3 000 kr, så räntan minskar med \\(0{,}005 \\cdot 3\\,000 = 15\\) kr per månad.</p><ul><li>Månad 1: 900 kr</li><li>Månad 2: 885 kr</li><li>…</li><li>Månad 12: skulden är \\(180\\,000 - 11 \\cdot 3\\,000 = 147\\,000\\) kr, ränta \\(0{,}005 \\cdot 147\\,000 = 735\\) kr</li></ul><p>Räntorna minskar jämnt, så summan är antalet månader gånger medelvärdet av första och sista räntan:</p>\\[12 \\cdot \\dfrac{900 + 735}{2} = 12 \\cdot 817{,}5 = 9\\,810 \\text{ kr}\\]<p>(Man kan också lägga ihop alla tolv räntorna en och en, eller kontrollera med ett kalkylprogram.)</p><p><strong>Svar:</strong> a) 3 000 kr &nbsp; b) 3 900 kr &nbsp; c) 9 810 kr</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt amortering 3 000 kr per månad",
      "+E<sub>P</sub> för korrekt total betalning 3 900 kr första månaden",
      "+C<sub>PL</sub> för korrekt total ränta 9 810 kr under första året, med en metod som tar hänsyn till att skulden minskar varje månad"
    ]
  },
  {
    id: "sanek-038",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Ränta på ränta",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>Sara sätter in 20 000 kr på ett sparkonto med 3 % årlig ränta. Räntan läggs till kontot i slutet av varje år och hon gör inga fler insättningar eller uttag.</p><p>Hur mycket finns på kontot efter 5 år? Avrunda till hela kronor.</p>",
    svar: { varde: 23185, tolerans: 1, enhet: "kr" },
    ledtradar: [
      "Vilken förändringsfaktor motsvarar en ökning med 3 %?",
      "Beloppet multipliceras med förändringsfaktorn en gång per år, alltså fem gånger: \\(20\\,000 \\cdot 1{,}03^5\\)."
    ],
    losning: "<ol><li>Förändringsfaktor per år: \\(1{,}03\\).</li><li>Efter 5 år: \\(20\\,000 \\cdot 1{,}03^5 \\approx 20\\,000 \\cdot 1{,}159274 \\approx 23\\,185\\) kr.</li></ol><p>Observera att det blir mer än \\(20\\,000 \\cdot 1{,}15 = 23\\,000\\) kr, eftersom räntan varje år också räknas på tidigare års ränta (ränta på ränta).</p><p><strong>Svar:</strong> 23 185 kr</p>"
  },
  {
    id: "sanek-039",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Rabatt i flera steg",
    niva: "C",
    poang: "0/1/0",
    typ: "tal",
    fraga: "<p>Under Black Friday säljer en butik en jacka som ordinarie kostar 1 299 kr. På skylten står:</p><p style='text-align:center'><strong>\"40 % rabatt + extra 10 % i kassan = 50 % rabatt!\"</strong></p><p>Den extra rabatten på 10 % dras från det redan nedsatta priset. Hur många procent rabatt får kunden egentligen räknat på ordinarie pris?</p>",
    svar: { varde: 46, tolerans: 0.1, enhet: "%" },
    ledtradar: [
      "Skriv förändringsfaktorerna för de två rabatterna.",
      "Den totala förändringsfaktorn är produkten av de två. Hur stor rabatt motsvarar den?"
    ],
    losning: "<ol><li>40 % rabatt ger förändringsfaktorn \\(0{,}60\\) och 10 % rabatt ger \\(0{,}90\\).</li><li>Total förändringsfaktor: \\(0{,}60 \\cdot 0{,}90 = 0{,}54\\).</li><li>Kunden betalar 54 % av ordinarie pris, dvs. rabatten är \\(100 - 54 = 46\\) %.</li></ol><p>Med jackans pris: \\(1\\,299 \\cdot 0{,}54 \\approx 701\\) kr, medan 50 % rabatt hade gett ca 650 kr. Skylten är alltså missvisande.</p><p><strong>Svar:</strong> 46 %</p>"
  },
  {
    id: "sanek-040",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Hållbar utveckling – energi",
    niva: "E",
    poang: "1/0/0",
    typ: "tal",
    fraga: "<p>En skola byter ut 200 lysrör på vardera 36 W mot LED-rör på vardera 18 W. Belysningen är tänd 2 000 timmar per år.</p><p>Hur många kWh el sparar skolan per år?</p>",
    svar: { varde: 7200, tolerans: 0, enhet: "kWh" },
    ledtradar: [
      "Hur många watt sparas per rör? Och för alla 200 rör?",
      "Energi = effekt · tid. Tänk på att \\(1 \\text{ kWh} = 1000 \\text{ Wh}\\)."
    ],
    losning: "<ol><li>Besparing per rör: \\(36 - 18 = 18\\) W. För 200 rör: \\(200 \\cdot 18 = 3\\,600\\) W \\(= 3{,}6\\) kW.</li><li>Energi per år: \\(3{,}6 \\text{ kW} \\cdot 2\\,000 \\text{ h} = 7\\,200\\) kWh.</li></ol><p>Med ett elpris på t.ex. 1,50 kr/kWh motsvarar det ca 10 800 kr per år.</p><p><strong>Svar:</strong> 7 200 kWh</p>"
  },
  {
    id: "sanek-041",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Ränta på ränta",
    niva: "A",
    poang: "1/1/1",
    typ: "redovisning",
    fraga: "<p>Noah sätter in 50 000 kr på ett sparkonto med 4 % årlig ränta. Räntan läggs till i slutet av varje år och han gör inga fler insättningar eller uttag.</p><p><strong>a)</strong> Hur mycket finns på kontot efter 10 år?</p><p><strong>b)</strong> Efter hur många hela år har beloppet för första gången fördubblats? Visa hur du kommer fram till svaret.</p><p><strong>c)</strong> Noahs kompis påstår: <em>\"Om räntan i stället är 8 % tar det halva tiden för beloppet att fördubblas.\"</em> Undersök hur väl påståendet stämmer.</p>",
    svar: { facit: "a) ca 74 012 kr &nbsp; b) 18 år &nbsp; c) Med 8 % fördubblas beloppet först efter 10 hela år (\\(1{,}08^9 \\approx 1{,}999\\)). Påståendet stämmer ungefär men inte exakt." },
    ledtradar: [
      "a) Använd förändringsfaktorn \\(1{,}04\\) tio gånger.",
      "b) Beloppet har fördubblats när förändringsfaktorn \\(1{,}04^n\\) är minst 2. Pröva olika värden på \\(n\\) med räknaren.",
      "c) Undersök på samma sätt när \\(1{,}08^n\\) blir minst 2 och jämför med svaret i b)."
    ],
    losning: "<p><strong>a)</strong> \\(50\\,000 \\cdot 1{,}04^{10} \\approx 50\\,000 \\cdot 1{,}4802 \\approx 74\\,012\\) kr.</p><p><strong>b)</strong> Beloppet har fördubblats när \\(1{,}04^n \\ge 2\\). Prövning:</p><ul><li>\\(1{,}04^{15} \\approx 1{,}80\\)</li><li>\\(1{,}04^{17} \\approx 1{,}948\\) – inte fördubblat</li><li>\\(1{,}04^{18} \\approx 2{,}026\\) – fördubblat</li></ul><p>Beloppet har fördubblats för första gången efter 18 år.</p><p><strong>c)</strong> Med 8 % ränta:</p><ul><li>\\(1{,}08^{9} \\approx 1{,}999\\) – precis under 2</li><li>\\(1{,}08^{10} \\approx 2{,}159\\) – fördubblat</li></ul><p>Med 8 % ränta har beloppet fördubblats först efter 10 hela år, jämfört med 18 år vid 4 %. Halva tiden hade varit 9 år. Efter 9 år saknas bara ca 0,1 % – fördubblingstiden är i verkligheten strax över 9 år (och vid 4 % ca 17,7 år). Påståendet stämmer alltså <em>ungefär</em> men inte exakt: det tar lite mer än halva tiden.</p><p><strong>Svar:</strong> a) ca 74 012 kr &nbsp; b) 18 år &nbsp; c) Påståendet stämmer ungefär, men inte exakt.</p>",
    bedomning: [
      "+E<sub>P</sub> för korrekt belopp ca 74 000 kr i a)",
      "+C<sub>PL</sub> för korrekt antal år (18) i b) med en redovisning som visar att 17 år inte räcker men 18 år gör det",
      "+A<sub>R</sub> för en välgrundad värdering av påståendet i c), t.ex. att fördubblingen sker efter 10 hela år (eller strax över 9 år) och att påståendet därför bara stämmer ungefär"
    ]
  },
  {
    id: "sanek-042",
    kurser: ["1a", "1b", "1c"],
    del: "C",
    omrade: "Privatekonomi och vardagsmatematik",
    moment: "Sparande",
    niva: "A",
    poang: "0/1/1",
    typ: "redovisning",
    fraga: "<p>Ella sätter in 10 000 kr på ett sparkonto i början av varje år i tre år, alltså tre insättningar totalt. Kontot har 5 % årlig ränta som läggs till i slutet av varje år.</p><p>Hur mycket finns på kontot i slutet av det tredje året?</p>",
    svar: { facit: "ca 33 101 kr" },
    ledtradar: [
      "Följ varje insättning för sig. Hur många år hinner den första insättningen växa?",
      "Den första insättningen växer i 3 år, den andra i 2 år och den tredje i 1 år.",
      "Summera: \\(10\\,000 \\cdot 1{,}05^3 + 10\\,000 \\cdot 1{,}05^2 + 10\\,000 \\cdot 1{,}05\\)."
    ],
    losning: "<p>Varje insättning växer med förändringsfaktorn 1,05 per år fram till slutet av år 3.</p><ul><li>Insättning 1 (början av år 1) växer i 3 år: \\(10\\,000 \\cdot 1{,}05^3 = 11\\,576{,}25\\) kr</li><li>Insättning 2 (början av år 2) växer i 2 år: \\(10\\,000 \\cdot 1{,}05^2 = 11\\,025\\) kr</li><li>Insättning 3 (början av år 3) växer i 1 år: \\(10\\,000 \\cdot 1{,}05 = 10\\,500\\) kr</li></ul>\\[11\\,576{,}25 + 11\\,025 + 10\\,500 = 33\\,101{,}25 \\text{ kr}\\]<p>Alternativt år för år: slutet av år 1: \\(10\\,000 \\cdot 1{,}05 = 10\\,500\\); slutet av år 2: \\((10\\,500 + 10\\,000) \\cdot 1{,}05 = 21\\,525\\); slutet av år 3: \\((21\\,525 + 10\\,000) \\cdot 1{,}05 = 33\\,101{,}25\\) kr.</p><p><strong>Svar:</strong> ca 33 101 kr</p>",
    bedomning: [
      "+C<sub>PL</sub> för en godtagbar ansats där minst en insättning räknas upp korrekt med ränta på ränta, t.ex. \\(10\\,000 \\cdot 1{,}05^3 \\approx 11\\,576\\) kr",
      "+A<sub>PL</sub> för korrekt slutbelopp ca 33 101 kr där alla insättningar har växt rätt antal år"
    ]
  }
);
