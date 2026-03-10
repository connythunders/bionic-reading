const tidsformerPool = [
    // --- PRESENS (4 meningar) ---
    {
        id: 1,
        sentence: "Varje morgon _____ Erik en kopp kaffe innan han går till skolan.",
        hint: "Verb: dricka | Tid: Presens",
        tense: "Presens",
        answers: ["dricker"],
        explanation: "Presens av oregelbundet verb 'dricka' → dricker. Oregelbundna verb böjs inte med ändelsen -ar/-er utan har egna former."
    },
    {
        id: 2,
        sentence: "Klimatförändringarna _____ hela planeten och kräver gemensamma lösningar.",
        hint: "Verb: påverka | Tid: Presens",
        tense: "Presens",
        answers: ["påverkar"],
        explanation: "Presens av regelbundet verb (grupp 1) 'påverka' → påverkar. Grupp 1-verb får ändelsen -ar i presens."
    },
    {
        id: 3,
        sentence: "De flesta elever på gymnasiet _____ minst ett främmande språk utöver engelska.",
        hint: "Verb: läsa | Tid: Presens",
        tense: "Presens",
        answers: ["läser"],
        explanation: "Presens av regelbundet verb (grupp 2) 'läsa' → läser. Grupp 2-verb får ändelsen -er i presens."
    },
    {
        id: 4,
        sentence: "När det regnar _____ Lina alltid sin cykel och tar bussen istället.",
        hint: "Verb: lämna | Tid: Presens",
        tense: "Presens",
        answers: ["lämnar"],
        explanation: "Presens av regelbundet verb (grupp 1) 'lämna' → lämnar. Observera att verbet slutar på -a i infinitiv och får -ar i presens."
    },

    // --- PRETERITUM (5 meningar) ---
    {
        id: 5,
        sentence: "Under nationella provet förra veckan _____ alla elever i stor tystnad.",
        hint: "Verb: sitta | Tid: Preteritum (imperfekt)",
        tense: "Preteritum",
        answers: ["satt"],
        explanation: "Preteritum av oregelbundet verb 'sitta' → satt. Vanligt oregelbundet verb med vokalväxling i stammen."
    },
    {
        id: 6,
        sentence: "Förra sommaren _____ familjen tre veckor i norra Sverige.",
        hint: "Verb: tillbringa | Tid: Preteritum (imperfekt)",
        tense: "Preteritum",
        answers: ["tillbringade"],
        explanation: "Preteritum av regelbundet verb (grupp 1) 'tillbringa' → tillbringade. Grupp 1-verb får ändelsen -ade i preteritum."
    },
    {
        id: 7,
        sentence: "Maja _____ hela natten för att hinna klart med sin inlämningsuppgift.",
        hint: "Verb: arbeta | Tid: Preteritum (imperfekt)",
        tense: "Preteritum",
        answers: ["arbetade"],
        explanation: "Preteritum av regelbundet verb (grupp 1) 'arbeta' → arbetade. Grupp 1-verb får ändelsen -ade i preteritum."
    },
    {
        id: 8,
        sentence: "Riksdagen _____ ett nytt beslut om skolans finansiering i måndags.",
        hint: "Verb: fatta | Tid: Preteritum (imperfekt)",
        tense: "Preteritum",
        answers: ["fattade"],
        explanation: "Preteritum av regelbundet verb (grupp 1) 'fatta' → fattade. Grupp 1-verb med dubbel konsonant (-tt-) före ändelsen -ade."
    },
    {
        id: 9,
        sentence: "När strömmen gick _____ alla elever upp sina telefoner för att se om det var ett avbrott.",
        hint: "Verb: ta fram | Tid: Preteritum (imperfekt)",
        tense: "Preteritum",
        answers: ["tog fram"],
        explanation: "Preteritum av oregelbundet verb 'ta' (i partikelverbet 'ta fram') → tog fram. 'Ta' är oregelbundet och bildar preteritum med vokalväxling: ta → tog."
    },

    // --- PERFEKT (4 meningar) ---
    {
        id: 10,
        sentence: "Läraren har _____ ut läxan, men många elever har inte börjat än.",
        hint: "Verb: dela (ut) | Tid: Perfekt — auxiliaret 'har' är redan på plats, fyll i supinum",
        tense: "Perfekt",
        answers: ["delat"],
        explanation: "Supinum av regelbundet verb (grupp 1) 'dela' → delat. Perfekt bildas med 'har' + supinum. Grupp 1-verb får ändelsen -at i supinum."
    },
    {
        id: 11,
        sentence: "Sverige har _____ stora framsteg inom förnybar energi de senaste tio åren.",
        hint: "Verb: göra | Tid: Perfekt — auxiliaret 'har' är redan på plats, fyll i supinum",
        tense: "Perfekt",
        answers: ["gjort"],
        explanation: "Supinum av oregelbundet verb 'göra' → gjort. Perfekt bildas med 'har' + supinum. Notera den oregelbundna formen gjort (inte *görat)."
    },
    {
        id: 12,
        sentence: "Jag har aldrig _____ till ett annat land, men jag hoppas kunna resa snart.",
        hint: "Verb: resa | Tid: Perfekt — auxiliaret 'har' är redan på plats, fyll i supinum",
        tense: "Perfekt",
        answers: ["rest"],
        explanation: "Supinum av oregelbundet verb 'resa' → rest. Perfekt bildas med 'har' + supinum. 'Resa' tillhör grupp 2 men bildar supinum oregelbundet: rest."
    },
    {
        id: 13,
        sentence: "Kommunen har _____ ett nytt ungdomscenter i stadsdelen för att ge unga en mötesplats.",
        hint: "Verb: bygga | Tid: Perfekt — auxiliaret 'har' är redan på plats, fyll i supinum",
        tense: "Perfekt",
        answers: ["byggt"],
        explanation: "Supinum av oregelbundet verb 'bygga' → byggt. Perfekt bildas med 'har' + supinum. Oregelbundet verb med supinum på -t utan vokal: byggt."
    },

    // --- PLUSKVAMPERFEKT (3 meningar) ---
    {
        id: 14,
        sentence: "När läraren kom in i klassrummet hade eleverna redan _____ sina datorer.",
        hint: "Verb: stänga | Tid: Pluskvamperfekt — auxiliaret 'hade' är redan på plats, fyll i supinum",
        tense: "Pluskvamperfekt",
        answers: ["stängt"],
        explanation: "Supinum av regelbundet verb (grupp 2) 'stänga' → stängt. Pluskvamperfekt bildas med 'hade' + supinum och beskriver något som skett före ett annat förflutet skeende."
    },
    {
        id: 15,
        sentence: "Hon insåg att hon hade _____ fel busslinje och var nu på fel sida av staden.",
        hint: "Verb: ta | Tid: Pluskvamperfekt — auxiliaret 'hade' är redan på plats, fyll i supinum",
        tense: "Pluskvamperfekt",
        answers: ["tagit"],
        explanation: "Supinum av oregelbundet verb 'ta' → tagit. Pluskvamperfekt bildas med 'hade' + supinum. Notera att supinum av 'ta' är tagit, inte *tat."
    },
    {
        id: 16,
        sentence: "Innan projektet startade hade gruppen redan _____ upp arbetsuppgifterna sinsemellan.",
        hint: "Verb: dela | Tid: Pluskvamperfekt — auxiliaret 'hade' är redan på plats, fyll i supinum",
        tense: "Pluskvamperfekt",
        answers: ["delat"],
        explanation: "Supinum av regelbundet verb (grupp 1) 'dela' → delat. Pluskvamperfekt bildas med 'hade' + supinum och placerar händelsen före en annan händelse i dåtid."
    },

    // --- FUTURUM (2 meningar) ---
    {
        id: 17,
        sentence: "Nästa år _____ gymnasieskolan bygga ut sin naturvetenskapliga avdelning med ett nytt labb.",
        hint: "Verb: bygga ut | Tid: Futurum med 'ska'",
        tense: "Futurum",
        answers: ["ska"],
        explanation: "Futurum bildas med hjälpverbet 'ska' (eller 'kommer att') följt av infinitiv. Här är 'ska' det som saknas; 'bygga ut' är infinitiven. 'Ska' uttrycker en plan eller avsikt."
    },
    {
        id: 18,
        sentence: "Forskarna tror att medeltemperaturen på jorden _____ att stiga med ytterligare två grader till år 2100.",
        hint: "Verb: fortsätta (futurum med 'kommer att') | Tid: Futurum",
        tense: "Futurum",
        answers: ["kommer"],
        explanation: "Futurum med 'kommer att' + infinitiv används för att beskriva framtida händelser, särskilt prognoser. Hela konstruktionen är 'kommer att stiga'. Eleven fyller i 'kommer'."
    },

    // --- KONDITIONALIS / KONJUNKTIV (2 meningar) ---
    {
        id: 19,
        sentence: "Om jag _____ mer tid, skulle jag läsa fler böcker och träna mer.",
        hint: "Verb: ha | Tid: Konditionalis — 'om'-sats med konditionalis presens",
        tense: "Konditionalis",
        answers: ["hade"],
        explanation: "I en hypotetisk 'om'-sats används preteritumformen 'hade' för att markera att situationen är osannolik eller tänkt. Detta kallas konditionalis och bildar ett par med 'skulle' i huvudsatsen."
    },
    {
        id: 20,
        sentence: "Om vi hade sorterat soporna bättre, _____ vi ha minskat koldioxidutsläppen avsevärt.",
        hint: "Verb: skulle | Tid: Konditionalis perfekt — 'om'-sats med hade + supinum",
        tense: "Konditionalis",
        answers: ["skulle"],
        explanation: "Konditionalis perfekt bildas med 'skulle ha' + supinum i huvudsatsen, medan 'om'-satsen har 'hade' + supinum. Konstruktionen beskriver ett hypotetiskt förflutet: något som kunde ha hänt men inte hände."
    }
];
