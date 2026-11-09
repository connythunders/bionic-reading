# Tillgänglighet och granskning – checklista

Den här listan är till för dig som lärare när du granskar Mattesteget på riktiga enheter. Automatiska tester hittar mycket, men inte hur det **låter** och **känns** att använda appen. Bocka av i den här filen (eller kopiera den) och skriv upp det du hittar.

Mål: WCAG 2.2 nivå AA, och dyslexianpassning enligt British Dyslexia Associations riktlinjer.

## 1. Vad de automatiska testerna redan kontrollerar

Du behöver inte upprepa det här för hand, men det är bra att veta vad som är täckt.

| Krav | Hur det testas | Var |
|---|---|---|
| 1.4.3 Kontrast, alla fyra bakgrunder | Beräknad kontrastkvot för text, länkar, kantlinjer, fokusring och uppläsningsmarkering | `tests/styles.test.js` (webbläsare) |
| 1.4.12 Textavstånd | Radhöjd 1,5, bokstavsavstånd 0,12 em, ordavstånd 0,16 em och styckeavstånd 2 em tvingas på alla vyer. Inget får klippas bort eller ge sidscroll | `tests/layout.test.js` |
| 1.4.10 Reflow | Alla vyer vid 320 px bredd utan sidscroll | `tests/layout.test.js` |
| 2.5.8 Klickytor | Knappar och menylänkar är minst 44 px höga. Miniräknarens knappar och bråkstavarnas delar likaså | `styles.test.js`, `interactives.test.js`, `calculator.test.js` |
| 2.5.3 Etikett i namn | Miniräknarens knappnamn innehåller alltid den synliga texten | `calculator.test.js` |
| 3.2.6 Hjälp på samma plats | Hjälpknappen är alltid sist i sidhuvudet | `views.test.js` |
| Semantik | En `h1` per vy, inga rubrikhopp, `lang="sv"`, inga inline-stilar | `views.test.js`, `pwa.test.js` |
| Dyslexi | Ingen kursiv, inga versaler eller understrykning utom länkar (CSS-kontroll), ingen text med ordet "fel" i återkopplingen | `styles.test.js`, `hints.test.js`, `lessonFlow.test.js` |
| Innehåll | Talversion på varje formel, max två meningar per uppgift, fyra ledtrådsnivåer | `validate.test.js`, `content.test.js` |
| Inga externa anrop | Ingen fil innehåller adresser till andra domäner. Playwright kontrollerar alla anrop i alla vyer | `pwa.test.js`, `tests/e2e/offline.spec.js` |
| axe-core | 0 allvarliga eller kritiska fel i alla vyer och alla fyra bakgrunder | `tests/e2e/a11y.spec.js` (bara i GitHub Actions) |
| Offline | Appen fungerar utan nätverk efter första besöket | `tests/e2e/offline.spec.js` (GitHub Actions) |
| Lighthouse | Tillgänglighet minst 95 | `lighthouserc.json` (GitHub Actions) |

Playwright, axe och Lighthouse körs bara i GitHub Actions. Kolla där om de är gröna: https://github.com/connythunders/bionic-reading/actions

## 2. Tangentbord (2.1.1, 2.4.7, 2.4.11)

Gör hela flödet utan mus, på dator eller Chromebook med tangentbord.

- [ ] Tabb går genom menyn i rimlig ordning, och "Hoppa till innehållet" fungerar (Tabb en gång från sidans topp, Enter).
- [ ] Fokusramen syns tydligt överallt, i alla fyra bakgrunder.
- [ ] Ingen fokuserad knapp döljs bakom något (till exempel miniräknaren).
- [ ] En hel lektion går att göra: svarsfält, Enter skickar, Fortsätt, ledtrådsknappar.
- [ ] Tallinjen: pilar flyttar markören, PageUp och PageDown hoppar tio steg, Home och End går till ändarna.
- [ ] Bråkstavar: Enter eller mellanslag på en del fyller upp till den. "Fler delar" och "Färre delar" fungerar.
- [ ] Pengar: "Lägg till" och "Ta bort" fungerar, och tio av samma sort växlas.
- [ ] Miniräknaren: öppnas med knappen, siffror och operatorer går att skriva, Esc stänger och fokus går tillbaka.
- [ ] Lärarvyn: kod, filval och tabeller går att använda med tangentbord.

## 3. Skärmläsare (4.1.2, aria-live)

Prova med minst två: NVDA med Chrome på Windows, TalkBack på Android, och ChromeVox på Chromebook.

- [ ] Rubriknavigering fungerar: en `h1` per sida, och skärmläsaren läser den efter vybyte.
- [ ] Efter "Fortsätt" läses den nya skärmens rubrik upp.
- [ ] Återkoppling efter ett svar läses upp utan att man behöver leta ("Rätt. Bra jobbat." eller "Inte riktigt. Prova igen …").
- [ ] Formler läses med talversionen, till exempel "tre fjärdedelar", inte som symboler.
- [ ] Tallinjens markör läses som en reglage med värde, och miniräknarens skärm läses begripligt.
- [ ] Bilderna (bråkstavar, procentstapel, pengar) har en förståelig beskrivning.
- [ ] Inget läses upp två gånger i onödan.

## 4. Uppläsning (Web Speech API)

Prova på **Chromebook** och **Android** med svensk röst installerad, och en enhet **utan** svensk röst.

- [ ] "Läs upp" läser texten med svensk röst, och hastighetsreglaget (0,7 till 1,3) märks.
- [ ] Ord för ord markeras där webbläsaren stöder det. Annars markeras hela meningen.
- [ ] Pausa, Fortsätt läsa, Stopp och Läs igen fungerar.
- [ ] Automatisk uppläsning (Inställningar) läser ny text efter att man tryckt på Fortsätt.
- [ ] Miniräknaren läser knappar och resultat när det är påslaget.
- [ ] Utan svensk röst visas "Ingen svensk röst hittades" med en begriplig instruktion, och ingen uppläsning sker med fel språk.
- [ ] Uppläsningen låter naturlig för tal som "3 000 kronor", "25 procent" och "noll komma fem".

## 5. Zoom, textstorlek och avstånd (1.4.4, 1.4.10, 1.4.12)

- [ ] Webbläsarzoom 200 % och 400 %: inget innehåll försvinner och ingen sidscroll i sidled (förutom tabeller i lärarvyn, som scrollar i sin egen ruta).
- [ ] Inställningar: textstorlek 28 px, radavstånd 2,0 och bokstavsavstånd 0,12 em: allt går att läsa och ingenting överlappar.
- [ ] Prova med ett riktigt textavståndsverktyg, till exempel bokmärket "Text Spacing Bookmarklet", på alla huvudvyer.

## 6. Utseende och läsbarhet

- [ ] Alla fyra bakgrunder är bekväma att läsa. Fråga dina elever vilken de föredrar.
- [ ] Typsnitten fungerar: Atkinson Hyperlegible (standard), Verdana, Arial och OpenDyslexic.
- [ ] Texten är vänsterjusterad, raderna är inte för långa (högst ca 65 tecken) och ingenting är kursivt eller skrivet med VERSALER.
- [ ] Inget är rött eller markerat som "fel". Återkopplingen känns vuxen och vänlig.
- [ ] Mörkt läge blinkar inte krämvitt vid start.
- [ ] Appen ser inte barnslig ut. Ingen maskot och inga stjärnregn.
- [ ] Färg är aldrig det enda sättet att se skillnad (status i lärarvyn står med ord).

## 7. Pek och mobil (2.5.7, 2.5.8)

- [ ] Alla knappar är lätta att träffa på mobil, även miniräknaren och bråkstavarna.
- [ ] Tallinjens markör går att dra med fingret, och knapparna "Åt vänster" och "Åt höger" fungerar som alternativ.
- [ ] Sidan är användbar på smal skärm i både stående och liggande läge.

## 8. Rörelse (2.3.3)

- [ ] Med "Minska rörelse" i Inställningar, eller operativsystemets motsvarighet, finns ingen rörelse alls.

## 9. Offline och installation

- [ ] Öppna appen på nätet en gång. Stäng av wifi och ladda om: allt fungerar, inklusive lektioner, ordlista och uppläsning.
- [ ] Installera appen från webbläsaren (Chrome: installationsikonen i adressfältet, eller menyn). Ikonen ser bra ut och appen öppnas i eget fönster.
- [ ] Gör en ändring, publicera, och öppna appen igen: meddelandet "Det finns en ny version" visas, och "Uppdatera nu" fungerar.
- [ ] På en skoldator med hanterad Chromebook: fungerar installation och sparad progression? Fråga IT om webbplatsdata rensas vid utloggning.

## 10. Lighthouse (för hand, i Chrome)

1. Öppna appen i Chrome. Tryck F12, välj fliken Lighthouse.
2. Välj kategorierna Tillgänglighet och Bästa praxis, enhet Mobil, och tryck på Analysera.
3. Mål: Tillgänglighet minst 95.

## 11. Dataskydd

- [ ] I utvecklarverktygens nätverksflik syns bara anrop till appens egen adress, även efter flera minuters användning.
- [ ] Inga cookies (Application, Cookies).
- [ ] `INTEGRITET.md` stämmer med vad appen faktiskt sparar. Läs den tillsammans med skolans dataskyddsombud.

## Kända begränsningar

- Ordmarkeringen vid uppläsning beror på webbläsaren och rösten. Vissa röster ger bara meningsmarkering.
- Utan en svensk röst installerad finns ingen uppläsning. Appen förklarar hur man installerar en.
- Lärarkoden skyddar bara mot misstag (se `INTEGRITET.md`).
- Innehållet är skrivet som utkast och behöver granskas didaktiskt av en lärare.
