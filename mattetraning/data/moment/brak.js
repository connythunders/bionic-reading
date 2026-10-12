/*
  MOMENT: Bråk (område: Tal och räkning)

  ============ SÅ SKRIVER DU EN UPPGIFT ============
  {
    id: 'brak-01',                 // unikt namn
    niva: 1,                       // 1 = grund, 2 = lite svårare, 3 = svårast
    var: {                         // slumpade tal, så att uppgiften blir ny varje gång
      n: [3, 8],                   //   heltal från 3 till 8
      t: [1, 'n-1'],               //   gränserna får räknas ut från tidigare variabler
      X: { bland: [12, 20, 24] },  //   välj ett av talen i listan
      s: { ber: 't*2' }            //   räkna ut från andra variabler
    },
    villkor: 't*2 != n',           // (valfritt) slumpa om tills villkoret stämmer
    text: 'Hur stor del är färgad?',
    vis: { typ: 'stav', n: '{n}', t: '{t}' },   // (valfritt) bild: stav, cirkel eller tallinje
    svar: ...,                     // se nedan
    ledtradar: ['Ledtråd 1', 'Ledtråd 2 (tydligare)'],
    losning: ['Steg 1', 'Steg 2', 'Svar: ...'],
    vanligaFel: [{ svar: '{n}/{t}', text: 'Pekar på strategin, inte bara rätt/fel.' }]
  }

  I texten:  {n} byts mot talet n.  {=X/n} räknas ut.  [3/4] visas som ett bråk.
  Räkning:   + - * / ( ),  sgd(a,b) = största gemensamma delare,  jämförelser == != < > <= >=  och && ||

  Svarstyper:
    { typ: 'brak', varde: '{t}/{n}' }                  likvärdiga bråk godkänns ([2/4] = [1/2])
    { typ: 'brak', varde: '{a}/{b}', forkortat: true } bråket måste vara förkortat så långt det går
    { typ: 'tal', varde: '{=X/n*t}', enhet: 'kr' }     ett tal (komma eller punkt går bra)
    { typ: 'val', alternativ: ['A', 'B', 'C'], ratt: 0 } knappar; alternativen blandas
  För val-uppgifter kan vanligaFel peka på ett alternativ: { val: 1, text: '...' }
*/
window.MATTE_DATA.moment.brak = {
  id: 'brak',
  omrade: 'tal',
  namn: 'Bråk',
  kort: 'Delar av en hel',

  forsta: {
    text: [
      'Ett bråk visar en del av något som är delat i lika stora delar.',
      'Nämnaren, talet under strecket, säger hur många lika delar det hela är delat i.',
      'Täljaren, talet över strecket, säger hur många av delarna vi har.',
      'I [3/4] är det hela delat i 4 delar, och vi har 3 av dem.'
    ],
    vis: { typ: 'brakverkstad' },
    prova: [
      'Välj 4 delar och färga 3. Då ser du [3/4].',
      'Slå på jämförelsen. Hur många åttondelar behövs för att bli lika mycket som [1/2]?'
    ]
  },

  exempel: [
    {
      rubrik: 'Hur stor del är färgad?',
      uppgift: 'En chokladkaka är delad i 5 lika stora bitar. 2 bitar är uppätna. Hur stor del av kakan är uppäten?',
      steg: [
        { text: 'Hur många lika stora bitar finns det? 5 bitar. Det blir nämnaren, talet under strecket.', vis: { typ: 'stav', n: 5, t: 0 } },
        { text: 'Hur många bitar är uppätna? 2 bitar. Det blir täljaren, talet över strecket.', vis: { typ: 'stav', n: 5, t: 2 } },
        { text: 'Svar: [2/5] av kakan är uppäten.', vis: { typ: 'stav', n: 5, t: 2 } }
      ]
    },
    {
      rubrik: 'Bråk av ett antal',
      uppgift: 'Du har 20 kr. Du använder [3/4] av pengarna. Hur mycket använder du?',
      steg: [
        { text: 'Nämnaren är 4. Dela de 20 kronorna i 4 lika delar: 20 / 4 = 5. En fjärdedel är 5 kr.', vis: { typ: 'stav', n: 4, t: 0, etiketter: ['5 kr', '5 kr', '5 kr', '5 kr'] } },
        { text: 'Täljaren är 3. Du ska ha 3 sådana delar: 5 · 3 = 15.', vis: { typ: 'stav', n: 4, t: 3, etiketter: ['5 kr', '5 kr', '5 kr', '5 kr'] } },
        { text: 'Kolla om det är rimligt: [3/4] är lite mindre än det hela, och 15 kr är lite mindre än 20 kr. Svar: 15 kr.', vis: { typ: 'stav', n: 4, t: 3, etiketter: ['5 kr', '5 kr', '5 kr', '5 kr'] } }
      ]
    }
  ],

  uppgifter: [
    /* ---------------- NIVÅ 1 ---------------- */
    {
      id: 'brak-01', niva: 1,
      var: { n: [2, 8], t: [1, 'n-1'] },
      text: 'Hur stor del av stången är färgad?',
      vis: { typ: 'stav', n: '{n}', t: '{t}' },
      svar: { typ: 'brak', varde: '{t}/{n}' },
      ledtradar: [
        'Räkna först hur många lika stora delar stången har. Det blir talet under strecket.',
        'Stången har {n} delar. Hur många av dem är färgade? Det blir talet över strecket.'
      ],
      losning: ['Stången har {n} lika delar, så nämnaren är {n}.', '{t} delar är färgade, så täljaren är {t}.', 'Svar: [{t}/{n}]'],
      vanligaFel: [{ svar: '{n}/{t}', text: 'Du har vänt på bråket. Antalet färgade delar står överst, och antalet delar totalt står underst.' }]
    },
    {
      id: 'brak-02', niva: 1,
      var: { n: { bland: [2, 3, 4, 6, 8] }, t: [1, 'n-1'] },
      text: 'En pizza är delad i lika stora bitar. Hur stor del av pizzan är färgad?',
      vis: { typ: 'cirkel', n: '{n}', t: '{t}' },
      svar: { typ: 'brak', varde: '{t}/{n}' },
      ledtradar: ['Hur många bitar är pizzan delad i?', 'Pizzan har {n} bitar. Räkna de färgade bitarna.'],
      losning: ['Pizzan är delad i {n} bitar. Nämnaren är {n}.', '{t} bitar är färgade. Täljaren är {t}.', 'Svar: [{t}/{n}]'],
      vanligaFel: [{ svar: '{n}/{t}', text: 'Du har vänt på bråket. De färgade bitarna står överst.' }]
    },
    {
      id: 'brak-03', niva: 1,
      var: { n: [3, 9], t: [1, 'n-1'] },
      text: 'Titta på bråket [{t}/{n}]. Vilket tal är nämnaren?',
      svar: { typ: 'tal', varde: '{n}' },
      ledtradar: ['Nämnaren står under strecket.', 'Kom ihåg: Nämnaren står Nere.'],
      losning: ['Nämnaren är talet under strecket.', 'Svar: {n}'],
      vanligaFel: [{ svar: '{t}', text: 'Det är täljaren, talet över strecket. Nämnaren står nere.' }]
    },
    {
      id: 'brak-04', niva: 1,
      var: { n: [3, 9], t: [1, 'n-1'] },
      text: 'Titta på bråket [{t}/{n}]. Vilket tal är täljaren?',
      svar: { typ: 'tal', varde: '{t}' },
      ledtradar: ['Täljaren står över strecket.', 'Täljaren talar om hur många delar vi har. Den står överst.'],
      losning: ['Täljaren är talet över strecket.', 'Svar: {t}'],
      vanligaFel: [{ svar: '{n}', text: 'Det är nämnaren, talet under strecket. Täljaren står överst.' }]
    },
    {
      id: 'brak-05', niva: 1,
      var: { n: [3, 8], t: [1, 'n-1'] },
      text: 'Stången är delad i {n} lika delar och [{t}/{n}] är färgad. Hur många delar till behöver färgas för att hela stången ska bli färgad?',
      vis: { typ: 'stav', n: '{n}', t: '{t}' },
      svar: { typ: 'tal', varde: '{=n-t}', enhet: 'delar' },
      ledtradar: ['Hur många delar har stången totalt?', 'Stången har {n} delar och {t} är färgade. Hur många är vita?'],
      losning: ['Hela stången har {n} delar.', '{t} delar är redan färgade.', '{n} − {t} = {=n-t}', 'Svar: {=n-t} delar'],
      vanligaFel: [{ svar: '{n}', text: 'Det är alla delar. Några är redan färgade. Hur många är kvar att färga?' }]
    },
    {
      id: 'brak-06', niva: 1,
      var: { a: [2, 5], b: ['a+1', 10] },
      text: 'Vilket bråk är störst?',
      svar: { typ: 'val', alternativ: ['[1/{a}]', '[1/{b}]', 'De är lika stora'], ratt: 0 },
      ledtradar: [
        'Tänk på en pizza. Blir bitarna större eller mindre om du delar den i fler bitar?',
        '[1/{a}] betyder en bit av {a}. [1/{b}] betyder en bit av {b}. Vilken bit är störst?'
      ],
      losning: ['Ju fler delar det hela delas i, desto mindre blir varje del.', '{a} delar ger större bitar än {b} delar.', 'Svar: [1/{a}] är störst.'],
      vanligaFel: [{ val: 1, text: '{b} är ett större tal än {a}, men här betyder det att pizzan delas i fler bitar. Då blir varje bit mindre.' }]
    },
    {
      id: 'brak-07', niva: 1,
      var: { n: [4, 10], t: [1, 'n-2'], s: ['t+1', 'n-1'] },
      text: 'Vilket bråk är störst?',
      svar: { typ: 'val', alternativ: ['[{s}/{n}]', '[{t}/{n}]', 'De är lika stora'], ratt: 0 },
      ledtradar: ['Båda bråken har samma nämnare. Delarna är alltså lika stora.', 'Delarna är lika stora. Vilket bråk har flest delar?'],
      losning: ['Nämnaren är {n} i båda bråken, så delarna är lika stora.', '{s} delar är fler än {t} delar.', 'Svar: [{s}/{n}] är störst.']
    },
    {
      id: 'brak-08', niva: 1,
      var: { n: { bland: [2, 3, 4, 5, 10] }, k: [2, 6], X: { ber: 'n*k' } },
      text: 'Hur mycket är [1/{n}] av {X} kr?',
      vis: { typ: 'stav', n: '{n}', t: 1 },
      svar: { typ: 'tal', varde: '{k}', enhet: 'kr' },
      ledtradar: ['[1/{n}] betyder att du delar i {n} lika delar och tar en av dem.', 'Dela {X} kr i {n} lika delar: {X} / {n}.'],
      losning: ['Dela {X} kr i {n} lika delar.', '{X} / {n} = {k}', 'Svar: {k} kr'],
      vanligaFel: [{ svar: '{=X*n}', text: 'Du har gångrat. När du tar en del av något blir det mindre, så du ska dela.' }]
    },
    {
      id: 'brak-09', niva: 1,
      var: { n: { bland: [4, 6, 8] }, t: [1, 'n-1'] },
      text: 'En pizza är skuren i {n} lika stora bitar. Du äter {t} bitar. Hur stor del av pizzan har du ätit?',
      vis: { typ: 'cirkel', n: '{n}', t: '{t}' },
      svar: { typ: 'brak', varde: '{t}/{n}' },
      ledtradar: ['Hur många bitar fanns det från början? Det blir nämnaren.', 'Nämnaren är {n}. Hur många bitar åt du?'],
      losning: ['Pizzan har {n} bitar. Nämnaren är {n}.', 'Du åt {t} bitar. Täljaren är {t}.', 'Svar: [{t}/{n}]'],
      vanligaFel: [{ svar: '{=n-t}/{n}', text: 'Det är den del som finns kvar. Frågan gäller hur mycket du har ätit.' }]
    },
    {
      id: 'brak-10', niva: 1,
      var: { n: { bland: [4, 6, 8] }, t: [1, 'n-1'] },
      text: 'En pizza är skuren i {n} lika stora bitar. Du äter {t} bitar. Hur stor del av pizzan finns kvar?',
      vis: { typ: 'cirkel', n: '{n}', t: '{t}' },
      svar: { typ: 'brak', varde: '{=n-t}/{n}' },
      ledtradar: ['Hur många bitar finns kvar efter att du ätit?', '{n} bitar − {t} bitar. Svaret blir täljaren. Nämnaren är fortfarande {n}.'],
      losning: ['{n} − {t} = {=n-t} bitar är kvar.', 'Pizzan har fortfarande {n} bitar totalt, så nämnaren är {n}.', 'Svar: [{=n-t}/{n}]'],
      vanligaFel: [{ svar: '{t}/{n}', text: 'Det är den del du åt. Frågan gäller hur mycket som finns kvar.' }]
    },
    {
      id: 'brak-11', niva: 1,
      var: {},
      text: 'Hur skriver man "en halv" som bråk?',
      svar: { typ: 'val', alternativ: ['[1/2]', '[2/1]', '[1/3]'], ratt: 0 },
      ledtradar: ['En halv är en del av två lika delar.', 'Det hela är delat i 2 delar. Du har 1 av dem.'],
      losning: ['En halv betyder att det hela är delat i 2 delar och att du har 1 av dem.', 'Svar: [1/2]'],
      vanligaFel: [{ val: 1, text: 'Du har vänt på bråket. Antalet delar totalt, 2, ska stå under strecket.' }]
    },
    {
      id: 'brak-12', niva: 1,
      var: { n: { bland: [4, 6, 8, 10] }, t: [1, 'n-1'] },
      villkor: 't*2 != n',
      text: 'Är [{t}/{n}] mer eller mindre än en halv?',
      vis: { typ: 'stav', n: '{n}', t: '{t}', halv: true },
      svar: { typ: 'val', alternativ: ['Mer än en halv', 'Mindre än en halv'], ratt: '{=t*2>n ? 0 : 1}' },
      ledtradar: ['Hälften av {n} delar är {=n/2} delar. Titta på den streckade linjen.', 'Är {t} fler eller färre än {=n/2}?'],
      losning: ['En halv av {n} delar är {=n/2} delar.', 'Jämför {t} med {=n/2}.', 'Svar: {rattText}']
    },
    {
      id: 'brak-13', niva: 1,
      var: { n: [2, 9] },
      text: 'Hur mycket är [{n}/{n}]? Svara med ett heltal.',
      vis: { typ: 'stav', n: '{n}', t: '{n}' },
      svar: { typ: 'tal', varde: '1' },
      ledtradar: ['Om det hela är delat i {n} delar och du har alla {n}, hur mycket har du då?', 'Alla delar tillsammans är det hela.'],
      losning: ['Det hela är delat i {n} delar, och du har alla {n} delar.', 'Det är en hel.', 'Svar: 1'],
      vanligaFel: [{ svar: '{n}', text: 'Du har {n} delar, men tillsammans blir de bara en hel sak.' }]
    },
    {
      id: 'brak-14', niva: 1,
      var: { n: { bland: [2, 3, 4, 5, 8, 10] } },
      text: 'Hur många [1/{n}] behövs för att få en hel?',
      vis: { typ: 'stav', n: '{n}', t: 1 },
      svar: { typ: 'tal', varde: '{n}', enhet: 'st' },
      ledtradar: ['[1/{n}] är en del när det hela är delat i {n} delar.', 'Hur många delar har det hela?'],
      losning: ['Det hela är delat i {n} lika delar.', 'Svar: {n} stycken'],
      vanligaFel: [{ svar: '1', text: 'En del är bara [1/{n}]. Hur många sådana delar behövs för att få det hela?' }]
    },
    {
      id: 'brak-15', niva: 1,
      var: { k: { bland: [2, 3, 4] } },
      text: '[1/2] = [?/{=2*k}]. Vilket tal ska stå där frågetecknet är?',
      vis: { typ: 'jamfor', n1: 2, t1: 1, n2: '{=2*k}', t2: '{k}' },
      svar: { typ: 'tal', varde: '{k}' },
      ledtradar: ['Titta på bilden. Hur många av de mindre delarna fyller en halv?', 'Hälften av {=2*k} är {k}.'],
      losning: ['Det hela är delat i {=2*k} delar.', 'Hälften av {=2*k} delar är {k} delar.', 'Svar: [1/2] = [{k}/{=2*k}]'],
      vanligaFel: [{ svar: '1', text: 'Delarna är mindre nu. Det behövs fler av dem för att fylla en halv.' }]
    },
    {
      id: 'brak-16', niva: 1,
      var: { n: [3, 8], t: [1, 'n-1'] },
      text: 'Tallinjen mellan 0 och 1 är delad i {n} lika delar. Vilket bråk visar pricken?',
      vis: { typ: 'tallinje', n: '{n}', t: '{t}' },
      svar: { typ: 'brak', varde: '{t}/{n}' },
      ledtradar: ['Räkna hur många lika delar det finns mellan 0 och 1.', 'Det finns {n} delar. Hur många steg har pricken gått från 0?'],
      losning: ['Sträckan från 0 till 1 är delad i {n} delar. Nämnaren är {n}.', 'Pricken står {t} steg från 0. Täljaren är {t}.', 'Svar: [{t}/{n}]'],
      vanligaFel: [{ svar: '{t}/{=n+1}', text: 'Räkna mellanrummen, inte strecken. Det finns {n} mellanrum mellan 0 och 1.' }]
    },
    {
      id: 'brak-17', niva: 1,
      var: { n: [4, 10], t: [1, 'n-2'], s: [1, 'n-1-t'] },
      text: 'Räkna: [{t}/{n}] + [{s}/{n}]',
      vis: { typ: 'stav', n: '{n}', t: '{=t+s}' },
      svar: { typ: 'brak', varde: '{=t+s}/{n}' },
      ledtradar: ['Nämnarna är lika. Delarna är alltså lika stora, och du kan bara räkna hur många delar du får.', 'Lägg ihop täljarna: {t} + {s}. Nämnaren ändras inte.'],
      losning: ['Båda bråken har nämnaren {n}.', 'Lägg ihop täljarna: {t} + {s} = {=t+s}', 'Nämnaren är fortfarande {n}.', 'Svar: [{=t+s}/{n}]'],
      vanligaFel: [{ svar: '{=t+s}/{=n+n}', text: 'Du har lagt ihop nämnarna också. Delarna har samma storlek, så nämnaren ska vara {n}.' }]
    },
    {
      id: 'brak-18', niva: 1,
      var: { n: [4, 10], t: [2, 'n-1'], s: [1, 't-1'] },
      text: 'Räkna: [{t}/{n}] − [{s}/{n}]',
      vis: { typ: 'stav', n: '{n}', t: '{t}' },
      svar: { typ: 'brak', varde: '{=t-s}/{n}' },
      ledtradar: ['Nämnarna är lika. Du tar bort några delar.', 'Räkna bara täljarna: {t} − {s}. Nämnaren ändras inte.'],
      losning: ['Båda bråken har nämnaren {n}.', '{t} − {s} = {=t-s}', 'Svar: [{=t-s}/{n}]']
    },

    /* ---------------- NIVÅ 2 ---------------- */
    {
      id: 'brak-19', niva: 2,
      var: { n: { bland: [3, 4, 5] }, t: [2, 'n-1'], k: [2, 8], X: { ber: 'n*k' } },
      text: 'Hur mycket är [{t}/{n}] av {X} kr?',
      vis: { typ: 'stav', n: '{n}', t: '{t}' },
      svar: { typ: 'tal', varde: '{=k*t}', enhet: 'kr' },
      ledtradar: ['Börja med att räkna ut en del: [1/{n}] av {X} kr.', '{X} / {n} = {k}. Hur mycket är då {t} sådana delar?'],
      losning: ['En del: {X} / {n} = {k} kr', '{t} delar: {k} · {t} = {=k*t} kr', 'Svar: {=k*t} kr'],
      vanligaFel: [{ svar: '{k}', text: 'Det är en del, alltså [1/{n}]. Du ska ha {t} sådana delar.' }]
    },
    {
      id: 'brak-20', niva: 2,
      var: { a: [1, 4], b: ['a+1', 6], k: [2, 4] },
      villkor: 'sgd(a,b) == 1',
      text: 'Förkorta [{=a*k}/{=b*k}] så långt det går.',
      svar: { typ: 'brak', varde: '{a}/{b}', forkortat: true },
      ledtradar: ['Finns det ett tal som både {=a*k} och {=b*k} kan delas med?', 'Prova att dela både täljaren och nämnaren med {k}.'],
      losning: ['Både {=a*k} och {=b*k} går att dela med {k}.', '{=a*k} / {k} = {a}   och   {=b*k} / {k} = {b}', 'Svar: [{a}/{b}]']
    },
    {
      id: 'brak-21', niva: 2,
      var: { a: [1, 3], b: ['a+1', 5], k: [2, 5] },
      text: '[{a}/{b}] = [?/{=b*k}]. Vilket tal ska stå där frågetecknet är?',
      vis: { typ: 'jamfor', n1: '{b}', t1: '{a}', n2: '{=b*k}', t2: '{=a*k}' },
      svar: { typ: 'tal', varde: '{=a*k}' },
      ledtradar: ['Hur många gånger större är {=b*k} än {b}?', 'Nämnaren har gångrats med {k}. Gör samma sak med täljaren.'],
      losning: ['{b} · {k} = {=b*k}', 'Gör samma sak med täljaren: {a} · {k} = {=a*k}', 'Svar: [{a}/{b}] = [{=a*k}/{=b*k}]'],
      vanligaFel: [{ svar: '{a}', text: 'Nämnaren har blivit större, så täljaren måste också bli större för att bråket ska ha samma värde.' }]
    },
    {
      id: 'brak-22', niva: 2,
      // "fall": ett av fallen väljs. Fältet svar ersätter uppgiftens svar, övriga fält blir variabler.
      fall: [
        { svar: { typ: 'val', alternativ: ['[3/4]', '[2/3]'], ratt: 0 }, forklaring: '[3/4] = [9/12] och [2/3] = [8/12].' },
        { svar: { typ: 'val', alternativ: ['[3/5]', '[1/2]'], ratt: 0 }, forklaring: '[1/2] = [5/10] och [3/5] = [6/10].' },
        { svar: { typ: 'val', alternativ: ['[5/8]', '[3/4]'], ratt: 1 }, forklaring: '[3/4] = [6/8], och det är mer än [5/8].' },
        { svar: { typ: 'val', alternativ: ['[2/6]', '[1/2]'], ratt: 1 }, forklaring: '[1/2] = [3/6], och det är mer än [2/6].' }
      ],
      text: 'Vilket bråk är störst?',
      ledtradar: ['Gör om bråken så att de får samma nämnare. Då är det lätt att jämföra.', 'Tänk också: är bråket mer eller mindre än en halv?'],
      losning: ['Jämför bråken med samma nämnare.', '{forklaring}', 'Svar: {rattText}']
    },
    {
      id: 'brak-23', niva: 2,
      var: { n: { bland: [4, 5] }, t: [2, 'n-1'], k: { bland: [20, 25, 30, 40, 50] }, X: { ber: 'n*k' } },
      text: 'Amir har {X} kr. Han använder [{t}/{n}] av pengarna till en biobiljett. Hur mycket kostar biljetten?',
      svar: { typ: 'tal', varde: '{=k*t}', enhet: 'kr' },
      ledtradar: ['Räkna först ut [1/{n}] av {X} kr.', '{X} / {n} = {k} kr. Biljetten kostar {t} sådana delar.'],
      losning: ['[1/{n}] av {X} kr: {X} / {n} = {k} kr', '[{t}/{n}] av {X} kr: {k} · {t} = {=k*t} kr', 'Rimligt? Mindre än {X} kr. Ja.', 'Svar: {=k*t} kr'],
      vanligaFel: [{ svar: '{=X-k*t}', text: 'Det är pengarna som blir kvar. Frågan gäller vad biljetten kostar.' }, { svar: '{k}', text: 'Det är [1/{n}] av pengarna. Biljetten kostar [{t}/{n}].' }]
    },
    {
      id: 'brak-24', niva: 2,
      var: { n: { bland: [3, 4, 5, 6] }, t: [1, 'n-1'], h: [1, 3] },
      text: 'Hur många {n}-delar är {h} hela och [{t}/{n}]? Skriv svaret som ett bråk.',
      svar: { typ: 'brak', varde: '{=h*n+t}/{n}', forkortat: false, exaktNamnare: true },
      ledtradar: ['En hel är [{n}/{n}].', '{h} hela är {=h*n} {n}-delar. Lägg till {t} till.'],
      losning: ['En hel = [{n}/{n}], så {h} hela = [{=h*n}/{n}]', '[{=h*n}/{n}] + [{t}/{n}] = [{=h*n+t}/{n}]', 'Svar: [{=h*n+t}/{n}]']
    },

    /* ---------------- NIVÅ 3 ---------------- */
    {
      id: 'brak-25', niva: 3,
      var: { b: { bland: [2, 3, 4] }, k: { bland: [2, 3] }, d: { ber: 'b*k' }, a: [1, 'b-1'], c: [1, 'd-1'] },
      villkor: 'a*k + c < d',
      text: 'Räkna: [{a}/{b}] + [{c}/{d}]',
      svar: { typ: 'brak', varde: '{=a*k+c}/{d}' },
      ledtradar: ['Nämnarna är olika. Gör om [{a}/{b}] så att den får nämnaren {d}.', '[{a}/{b}] = [{=a*k}/{d}]. Lägg sedan ihop täljarna.'],
      losning: ['Gör om till samma nämnare: [{a}/{b}] = [{=a*k}/{d}]', '[{=a*k}/{d}] + [{c}/{d}] = [{=a*k+c}/{d}]', 'Svar: [{=a*k+c}/{d}]'],
      vanligaFel: [{ svar: '{=a+c}/{=b+d}', text: 'Man kan inte lägga ihop nämnarna. Gör först om bråken så att de får samma nämnare.' }]
    },
    {
      id: 'brak-26', niva: 3,
      fall: [
        { fraga: '[1/2]', ore: '50', svar: { typ: 'tal', varde: '0.5' } },
        { fraga: '[1/4]', ore: '25', svar: { typ: 'tal', varde: '0.25' } },
        { fraga: '[3/4]', ore: '75', svar: { typ: 'tal', varde: '0.75' } },
        { fraga: '[1/5]', ore: '20', svar: { typ: 'tal', varde: '0.2' } },
        { fraga: '[1/10]', ore: '10', svar: { typ: 'tal', varde: '0.1' } }
      ],
      text: 'Skriv {fraga} som ett decimaltal.',
      ledtradar: ['Tänk på pengar: hur många öre är {fraga} av en krona? En krona är 100 öre.', '{fraga} av en krona är {ore} öre. Hur skriver man {ore} öre i kronor?'],
      losning: ['{fraga} av en krona är {ore} öre.', '{ore} öre skrivs 0,{ore} kr. En nolla sist kan man ta bort.', 'Svar: {rattText}'],
      vanligaFel: [{ svar: '{ore}', text: 'Det är antalet öre. Skriv det i kronor, alltså som ett decimaltal mindre än 1.' }]
    },
    {
      id: 'brak-27', niva: 3,
      var: { n: { bland: [4, 5] }, t: [1, 'n-1'], k: { bland: [10, 20, 25] }, X: { ber: 'n*k' } },
      text: 'Ett recept behöver {X} g mjöl. Du gör bara [{t}/{n}] av receptet. Hur mycket mjöl behöver du?',
      svar: { typ: 'tal', varde: '{=k*t}', enhet: 'g' },
      ledtradar: ['Räkna först ut [1/{n}] av {X} g.', '{X} / {n} = {k} g. Du behöver {t} sådana delar.'],
      losning: ['[1/{n}] av {X} g = {X} / {n} = {k} g', '[{t}/{n}] = {k} · {t} = {=k*t} g', 'Svar: {=k*t} g']
    },
    {
      id: 'brak-28', niva: 3,
      var: { n: { bland: [3, 4, 5, 6] }, h: [1, 2], t: [1, 'n-1'] },
      text: 'Skriv [{=h*n+t}/{n}] i blandad form. Hur många hela blir det?',
      svar: { typ: 'tal', varde: '{h}', enhet: 'hela' },
      ledtradar: ['En hel är [{n}/{n}]. Hur många gånger får {n} plats i {=h*n+t}?', '{n} · {h} = {=h*n}. Det blir {t} över.'],
      losning: ['{=h*n+t} / {n} = {h} med {t} i rest.', 'Det blir {h} hela och [{t}/{n}].', 'Svar: {h} hela']
    }
  ]
};
