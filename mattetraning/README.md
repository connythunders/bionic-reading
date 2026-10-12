# Matteträning

Lugn matteträning för åk 7–9 (Lgr22), byggd för elever som behöver förstå grunderna. Ingen inloggning, ingen server, ingen AI. Allt sparas i webbläsaren.

**Adress:** https://bionicreading.se/mattetraning/

## Köra appen

- **På webben:** Appen publiceras med resten av repot via GitHub Pages. Pusha till `Main`, så är den uppe efter någon minut.
- **Offline:** När eleven har öppnat appen en gång på webben fungerar den även utan internet.
- **Som fil:** Mappen `mattetraning` kan zippas och öppnas lokalt via `index.html`. Då fungerar allt utom offline-läget.

## Filer

```
mattetraning/
├── index.html            Sidans skal
├── app.css               Utseende, teman och textstorlekar
├── sw.js                 Offline-stöd (höj VERSION när du ändrar filer)
├── manifest.webmanifest  Gör att appen kan läggas på hemskärmen
├── fonts/                Atkinson Hyperlegible (lättläst typsnitt)
├── js/
│   ├── motor.js          Slumpar tal, räknar ut svar, rättar
│   ├── visual.js         Bilder: bråkstav, cirkel, tallinje, bråkverkstad
│   ├── verktyg.js        Miniräknare, kladdyta, formelblad
│   └── app.js            Vyer, framsteg, anpassning, lärarvy
└── data/
    ├── omraden.js        Områden, moment, formelblad, PIN och mål
    └── moment/
        └── brak.js       Allt innehåll i momentet Bråk
```

## Lägga till eller ändra uppgifter

Öppna `data/moment/brak.js`. Överst i filen står hur en uppgift skrivs. Kort version:

```js
{
  id: 'brak-30', niva: 1,
  var: { n: [3, 8], t: [1, 'n-1'] },          // slumpade tal
  text: 'En kaka delas i {n} bitar. Du äter {t}. Hur stor del åt du?',
  vis: { typ: 'stav', n: '{n}', t: '{t}' },    // bild (valfri)
  svar: { typ: 'brak', varde: '{t}/{n}' },
  ledtradar: ['Hur många bitar finns det?', 'Det blir talet under strecket.'],
  losning: ['Kakan har {n} bitar.', 'Du åt {t}.', 'Svar: [{t}/{n}]'],
  vanligaFel: [{ svar: '{n}/{t}', text: 'Du har vänt på bråket.' }]
}
```

- `{n}` byts mot talet, och `{=X/n}` räknas ut.
- `[3/4]` visas som ett riktigt bråk och läses upp som "tre fjärdedelar".
- Svarstyperna är `brak`, `tal` (med valfri `enhet`) och `val` (knappar).

## Nytt moment

1. Kopiera `data/moment/brak.js` till till exempel `data/moment/procent.js` och byt `id`, `namn`, texterna och uppgifterna.
2. I `data/omraden.js`, lägg till `fil: 'procent'` på momentet.
3. I `index.html`, lägg till `<script src="data/moment/procent.js"></script>` före `js/motor.js`.
4. I `sw.js`, lägg till filen i listan och höj `VERSION`.

## Så fungerar träningen

- **Fel svar:** eleven får först ett strategi-tips och ledtråd 1, sedan ledtråd 2 och sist lösningen steg för steg. Därefter kan eleven prova en liknande uppgift med nya tal.
- **Ledtråd:** eleven kan själv be om en ledtråd innan hen svarar.
- **Anpassning:**
  - Tre rätt i rad på första försöket, utan ledtråd, ger en nivå upp.
  - Två uppgifter i rad som inte blev rätt direkt ger en nivå ner. Är eleven redan på nivå 1 föreslås Förstå och Exempel i stället.
- **Klarat moment:** 8 rätt utan visad lösning, varav minst 3 på nivå 2 eller 3. Det går att ändra i `data/omraden.js`.

## Lärarvy

Längst ner på startsidan. PIN-koden är `1234` från början; byt den i `data/omraden.js` (det är ingen riktig säkerhet).

- Lärarvyn visar framstegen på enheten. Du kan också öppna en elevfil som eleven har sparat under **Mina framsteg**.
- **Lås** döljer ett moment. **⭐** visar det som tips på elevens startsida.
- Om du ändrar i en elevfil: spara filen och låt eleven hämta den under **Mina framsteg**.

## Testa

1. Öppna appen och gå igenom **Tal och räkning → Bråk → Förstå, Exempel och Träna**.
2. Svara fel med flit och kontrollera att ledtrådarna och lösningen kommer.
3. Testa i mobilformat, med större text, lättläst typsnitt och mörkt läge.
