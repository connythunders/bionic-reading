# Matteträning

Lugn matteträning för åk 7–9 (Lgr22), byggd för elever som behöver förstå grunderna. Ingen inloggning, ingen server, ingen AI. Allt sparas i webbläsaren.

**Adress:** https://bionicreading.se/mattetraning/
**Testa uppgifterna:** https://bionicreading.se/mattetraning/test.html

## Innehåll

6 områden och 35 moment. Varje moment har tre delar: **Förstå**, med kort förklaring och interaktiv bild, **Exempel**, där eleven klickar fram ett steg i taget, och **Träna**. Varje moment har minst 18 uppgifter på grundnivå, plus uppgifter på nivå 2 och 3. Talen slumpas om varje gång.

| Område | Moment |
|---|---|
| Tal och räkning | Positionssystemet, De fyra räknesätten, Negativa tal, Bråk, Decimaltal, Procent, Förhållanden, Överslag och rimlighet, Potenser |
| Algebra | Variabler, Uttryck, Förenkla uttryck, Enkla ekvationer, Mönster, Steg-för-steg-instruktioner |
| Geometri | Begrepp och figurer, Omkrets, Area, Volym, Enheter och omvandlingar, Skala, Vinklar, Pythagoras sats |
| Statistik och sannolikhet | Tabeller och diagram, Medelvärde/median/typvärde, Sannolikhet |
| Samband och förändring | Proportionalitet, Procentuell förändring, Koordinatsystem, Linjära funktioner och grafer |
| Problemlösning | Pengar och handla, Mat och recept, Jobb och lön, Resor och tid, Mobilabonnemang |

## Köra appen

- **På webben:** Appen publiceras med resten av repot. Pusha till `Main`, så är den uppe efter ett par minuter. Mappen `mattetraning` är tillagd i `.github/workflows/deploy-larplattform.yml`.
- **Offline:** När eleven har öppnat appen en gång på webben fungerar den även utan internet.
- **Som fil:** Mappen kan zippas och öppnas via `index.html`. Då fungerar allt utom offline-läget.

## Filer

```
mattetraning/
├── index.html            Sidans skal
├── test.html             Kontrollerar alla uppgifter
├── app.css               Utseende, teman och textstorlekar
├── sw.js                 Offline-stöd (höj VERSION när du ändrar filer)
├── fonts/                Atkinson Hyperlegible (lättläst typsnitt)
├── js/
│   ├── motor.js          Slumpar tal, räknar ut svar, rättar
│   ├── visual.js         Bråkstav, cirkel, tallinje, bråkverkstad
│   ├── visual2.js        Övriga bilder och interaktiva visualiseringar
│   ├── verktyg.js        Miniräknare, kladdyta, formelblad
│   ├── app.js            Vyer, framsteg, anpassning, diagnos, lärarvy
│   └── test.js           Testet som test.html kör
└── data/
    ├── omraden.js        Områden, moment, formelblad, PIN och mål
    ├── diagnos.js        Frågorna i "Var ska jag börja?"
    └── moment/           En fil per moment, till exempel brak.js
```

## Ändra eller lägga till uppgifter

Öppna momentets fil i `data/moment/`. Överst i `brak.js` står hur en uppgift skrivs. Kort version:

```js
{
  id: 'brak-30', niva: 1,
  var: { n: [3, 8], t: [1, 'n-1'], p: [100, 900, 50] },  // [min, max] eller [min, max, steg]
  text: 'En kaka delas i {n} bitar. Du äter {t}. Hur stor del åt du?',
  vis: { typ: 'stav', n: '{n}', t: '{t}' },             // bild (valfri)
  svar: { typ: 'brak', varde: '{t}/{n}' },
  ledtradar: ['Hur många bitar finns det?', 'Det blir talet under strecket.'],
  losning: ['Kakan har {n} bitar.', 'Du åt {t}.', 'Svar: [{t}/{n}]'],
  vanligaFel: [{ svar: '{n}/{t}', text: 'Du har vänt på bråket.' }]
}
```

- `{n}` byts mot talet, och `{=X/n}` räknas ut.
- `[3/4]` visas som ett bråk och läses upp som "tre fjärdedelar". `x^2` visas som en exponent.
- **Svarstyper:**
  - `tal`, med valfri `enhet` och `tolerans`
  - `brak`
  - `val` (knappar), där `fast: true` behåller ordningen
  - `uttryck`, till exempel `3x + 2`. Eleven kan skriva det på olika sätt.
  - `par`, till exempel koordinater (x; y)
- **Bildtyper:** stav, cirkel, tallinje, tallinje2, hundraruta, rektangel, triangel, vinkel, staplar, tabell, koordinat, vag, kub, monster, positionstabell, grupper, glas, kulor, termometer, bana, kvitto, cirkelfigur och figur. Exempel på alla finns i datafilerna.

**Kör alltid `test.html` efter en ändring.** Sidan skapar varje uppgift 150 gånger och visar om något inte stämmer.

## Nytt moment

1. Kopiera en fil i `data/moment/`, till exempel `procent.js`, till ett nytt namn. Byt `id`, `namn`, texterna och uppgifterna.
2. I `data/omraden.js` lägger du till `fil: 'filnamnet'` på momentet (utan `.js`).

Det är allt. Sidan och offline-läget läser själva in alla moment som har `fil:`. Höj gärna `VERSION` i `sw.js`.

## Så fungerar träningen

- **Fel svar:** eleven får ett strategi-tips och ledtråd 1, sedan ledtråd 2 och sist lösningen steg för steg. Därefter kan eleven prova en liknande uppgift med nya tal.
- **Ledtråd:** eleven kan själv be om en ledtråd innan hen svarar.
- **Anpassning:**
  - Tre rätt i rad på första försöket, utan ledtråd, ger en nivå upp.
  - Två uppgifter i rad som inte blev rätt direkt ger en nivå ner. Är eleven redan på nivå 1 föreslås Förstå och Exempel i stället.
- **Klarat moment:** 8 rätt utan visad lösning, varav minst 3 på nivå 2 eller 3. Det går att ändra i `data/omraden.js`.

## Var ska jag börja?

Ett frivilligt test med 10 frågor från olika moment, som du ändrar i `data/diagnos.js`. Eleven får inget rätt eller fel under testet, och kan trycka på "Jag vet inte". Efteråt föreslås de moment där frågan inte gick vägen, och förslagen visas också på startsidan.

## Lärarvy

Längst ner på startsidan. PIN-koden är `1234` från början; byt den i `data/omraden.js` (det är ingen riktig säkerhet).

- Lärarvyn visar framstegen per moment och markerar moment som verkar svåra. Den listar också de uppgifter som oftast inte blir rätt direkt.
- **Lås** döljer ett moment. **⭐** visar det som tips på elevens startsida.
- Lärarvyn visar framstegen på enheten. Du kan också öppna en elevfil som eleven har sparat under **Mina framsteg**. Om du ändrar i en elevfil: spara filen och låt eleven hämta den under **Mina framsteg**.
