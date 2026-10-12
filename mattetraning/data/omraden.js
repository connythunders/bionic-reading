/*
  Områden och moment i Matteträning.

  - Ett moment med "fil" har innehåll i data/moment/<fil>.js och går att öppna.
  - Ett moment utan "fil" visas som "kommer snart".
  - Formelbladet visas när eleven trycker på 📐 Formelblad inne i området.
  - Bråk skrivs som [3/4] i all text. Då visas de som riktiga bråk och läses upp som "tre fjärdedelar".
*/
window.MATTE_DATA = window.MATTE_DATA || {};

window.MATTE_DATA.installningar = {
  larPin: '1234',            // PIN till lärarvyn. Byt gärna.
  klaratAntal: 8,            // Så många uppgifter rätt (utan visad lösning) krävs för att klara ett moment ...
  klaratNiva2: 3             // ... varav minst så många på nivå 2 eller 3.
};

window.MATTE_DATA.omraden = [
  {
    id: 'tal', namn: 'Tal och räkning', ikon: '🔢',
    beskrivning: 'Hur tal fungerar och hur man räknar med dem.',
    moment: [
      { id: 'position', namn: 'Positionssystemet', fil: 'position' },
      { id: 'raknesatt', namn: 'De fyra räknesätten', fil: 'raknesatt' },
      { id: 'negativa', namn: 'Negativa tal', fil: 'negativa' },
      { id: 'brak', namn: 'Bråk', fil: 'brak' },
      { id: 'decimal', namn: 'Decimaltal', fil: 'decimal' },
      { id: 'procent', namn: 'Procent', fil: 'procent' },
      { id: 'forhallande', namn: 'Förhållanden', fil: 'forhallande' },
      { id: 'overslag', namn: 'Överslag och rimlighet', fil: 'overslag' },
      { id: 'potenser', namn: 'Potenser', fil: 'potenser' }
    ],
    formelblad: [
      { rubrik: 'Bråk', rader: [
        'Täljaren (överst) = hur många delar du har.',
        'Nämnaren (nederst) = hur många lika stora delar det hela är delat i.',
        '[1/2] = [2/4] = [4/8] (samma värde)',
        'Förkorta: dela täljare och nämnare med samma tal. [6/8] = [3/4]',
        'Förläng: gånga täljare och nämnare med samma tal. [1/3] = [2/6]',
        '[3/4] av 20: först 20 / 4 = 5, sedan 5 · 3 = 15'
      ] },
      { rubrik: 'Bråk, decimaltal och procent', rader: [
        '[1/2] = 0,5 = 50 %',
        '[1/4] = 0,25 = 25 %',
        '[3/4] = 0,75 = 75 %',
        '[1/5] = 0,2 = 20 %',
        '[1/10] = 0,1 = 10 %'
      ] },
      { rubrik: 'Räknesätt', rader: [
        'Addition: +   Subtraktion: −',
        'Multiplikation: ·   Division: /',
        'Gånger och delat räknas före plus och minus.'
      ] }
    ]
  },
  {
    id: 'algebra', namn: 'Algebra', ikon: '🔤',
    beskrivning: 'Bokstäver som står för tal, uttryck och ekvationer.',
    moment: [
      { id: 'variabel', namn: 'Variabler', fil: 'variabel' },
      { id: 'uttryck', namn: 'Uttryck', fil: 'uttryck' },
      { id: 'forenkla', namn: 'Förenkla uttryck', fil: 'forenkla' },
      { id: 'ekvationer', namn: 'Enkla ekvationer', fil: 'ekvationer' },
      { id: 'monster', namn: 'Mönster', fil: 'monster' },
      { id: 'algoritmer', namn: 'Steg-för-steg-instruktioner', fil: 'algoritmer' }
    ],
    formelblad: [
      { rubrik: 'Algebra', rader: [
        'En variabel är en bokstav som står för ett tal, till exempel x.',
        '3x betyder 3 · x.',
        'Ekvation: gör samma sak på båda sidor om likhetstecknet.'
      ] }
    ]
  },
  {
    id: 'geometri', namn: 'Geometri', ikon: '📏',
    beskrivning: 'Figurer, mått, area, volym och vinklar.',
    moment: [
      { id: 'figurer', namn: 'Begrepp och figurer', fil: 'figurer' },
      { id: 'omkrets', namn: 'Omkrets', fil: 'omkrets' },
      { id: 'area', namn: 'Area', fil: 'area' },
      { id: 'volym', namn: 'Volym', fil: 'volym' },
      { id: 'enheter', namn: 'Enheter och omvandlingar', fil: 'enheter' },
      { id: 'skala', namn: 'Skala', fil: 'skala' },
      { id: 'vinklar', namn: 'Vinklar', fil: 'vinklar' },
      { id: 'pythagoras', namn: 'Pythagoras sats', fil: 'pythagoras' }
    ],
    formelblad: [
      { rubrik: 'Omkrets och area', rader: [
        'Omkrets = alla sidor tillsammans.',
        'Rektangel: area = basen · höjden',
        'Triangel: area = basen · höjden / 2',
        'Cirkel: omkrets = π · diametern, area = π · radien · radien'
      ] },
      { rubrik: 'Enheter', rader: [
        '1 m = 10 dm = 100 cm = 1000 mm',
        '1 km = 1000 m',
        '1 liter = 1 dm³ = 10 dl'
      ] }
    ]
  },
  {
    id: 'statistik', namn: 'Statistik och sannolikhet', ikon: '📊',
    beskrivning: 'Tabeller, diagram, medelvärde och chans.',
    moment: [
      { id: 'tabeller', namn: 'Tabeller och diagram', fil: 'tabeller' },
      { id: 'lagesmatt', namn: 'Medelvärde, median och typvärde', fil: 'lagesmatt' },
      { id: 'sannolikhet', namn: 'Sannolikhet', fil: 'sannolikhet' }
    ],
    formelblad: [
      { rubrik: 'Lägesmått', rader: [
        'Medelvärde: lägg ihop alla värden och dela med antalet.',
        'Median: värdet i mitten när du sorterat dem.',
        'Typvärde: det värde som finns flest gånger.',
        'Sannolikhet = antal gynnsamma utfall / antal möjliga utfall'
      ] }
    ]
  },
  {
    id: 'samband', namn: 'Samband och förändring', ikon: '📈',
    beskrivning: 'Proportionalitet, procentuell förändring och grafer.',
    moment: [
      { id: 'proportionalitet', namn: 'Proportionalitet', fil: 'proportionalitet' },
      { id: 'procentforandring', namn: 'Procentuell förändring', fil: 'procentforandring' },
      { id: 'koordinater', namn: 'Koordinatsystem', fil: 'koordinater' },
      { id: 'funktioner', namn: 'Linjära funktioner och grafer', fil: 'funktioner' }
    ],
    formelblad: [
      { rubrik: 'Samband', rader: [
        'Proportionellt: dubbelt så mycket av det ena ger dubbelt så mycket av det andra.',
        'En punkt skrivs (x, y). x går åt sidan, y går uppåt.',
        'Ökning med 10 %: gånga med 1,10'
      ] }
    ]
  },
  {
    id: 'problem', namn: 'Problemlösning', ikon: '🧩',
    beskrivning: 'Textuppgifter om pengar, mat, jobb och resor.',
    moment: [
      { id: 'pengar', namn: 'Pengar och handla', fil: 'pengar' },
      { id: 'mat', namn: 'Mat och recept', fil: 'mat' },
      { id: 'jobb', namn: 'Jobb och lön', fil: 'jobb' },
      { id: 'resor', namn: 'Resor och tid', fil: 'resor' },
      { id: 'mobil', namn: 'Mobilabonnemang', fil: 'mobil' }
    ],
    formelblad: [
      { rubrik: 'Så löser du en textuppgift', rader: [
        '1. Vad ska du ta reda på? Leta efter frågan.',
        '2. Vilka siffror behöver du? Stryk under dem.',
        '3. Vilket räknesätt passar?',
        '4. Räkna.',
        '5. Är svaret rimligt? Har du rätt enhet?'
      ] }
    ]
  }
];

window.MATTE_DATA.moment = window.MATTE_DATA.moment || {};
