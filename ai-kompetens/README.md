# AI-kompetens för gymnasiet

En statisk, svensk webbsida om AI-kompetens, byggd på EU:s AI-förordning (Förordning (EU) 2024/1689, ändrad genom Förordning (EU) 2026/1744, "Digital Omnibus on AI"). Ingen build-process, inga externa beroenden, inga spårare, ingen inloggning.

Sidan har två spår, länkade till varandra via en banner högst upp:
- **`index.html`** — för gymnasieelever (16–19 år).
- **`larare.html`** — för lärare: artikel 4 ur personalens perspektiv, AI i planering/undervisning, bedömning och otillåten hjälp, dataskydd i yrkesrollen, lokala riktlinjer (platshållare, se nedan) och en lokal självskattning inspirerad av DigCompEdu.

## Köra sidan lokalt

Sidan är ren HTML/CSS/vanilla JS — det räcker att öppna `index.html` direkt i en webbläsare via `file://`. Om din webbläsare blockerar lokala script-anrop över `file://` (ovanligt, men förekommer), starta valfri enkel statisk filserver i projektmappen, till exempel:

```bash
npx serve .
```

eller, om du har Python installerat:

```bash
python -m http.server 8000
```

och öppna sedan `http://localhost:8000`.

(Ett `serve.ps1`-skript finns också i projektroten — en minimal PowerShell-baserad filserver som användes för att testköra sidan under byggfasen i en miljö utan Node/Python. Kör med `powershell -ExecutionPolicy Bypass -File .\serve.ps1` och öppna `http://localhost:8934`. Den är inte nödvändig för driftsättning.)

## Deploya

Sidan är helt statisk och kan läggas var som helst som serverar filer, till exempel:

- **Vercel / Netlify:** dra och släpp mappen, eller koppla ett Git-repo — ingen build-konfiguration behövs (statisk HTML).
- **GitHub Pages:** lägg filerna i ett repo och aktivera Pages på `main`-grenen.
- **Skolans egen webbserver:** kopiera hela mappen (`index.html`, `styles.css`, `js/`, `assets/`) till valfri webbserver.

Se till att `index.html`, `styles.css`, `js/interactions-data.js`, `js/interactions.js`, `js/ui.js` och `assets/` följer med i samma katalogstruktur — sökvägarna i `index.html` är relativa.

## Filstruktur

```
index.html                     Elevsidan (8 sektioner)
larare.html                    Lärarspåret (7 sektioner)
styles.css                     Allt CSS, delas av båda sidorna, designsystem-dokumentation högst upp i filen
js/ui.js                       Tema-växling, mobilmeny, fokushantering — delas av båda sidorna
js/interactions-data.js        All data för elevsidans quiz, riskpyramid, scenarier, faktakoll
js/interactions.js             Renderingslogik för elevsidans interaktiva övningar (sektion 5)
js/larare.js                   Renderingslogik för lärarspårets självskattning (sektion 6)
assets/*.svg                   Fristående kopior av diagrammen (ej refererade av sidan, se docs/antaganden.md)
docs/faktakontroll.md          Faktagranskning av elevsidans juridiska påståenden, med källor
docs/faktakontroll-larare.md   Faktagranskning av lärarspårets påståenden (Skolverket, skollagen, IMY, UNESCO, DigCompEdu m.fl.)
docs/antaganden.md             Antaganden gjorda där uppdraget var öppet eller information saknades
```

**Att fylla i:** `larare.html`, sektion "Lokala riktlinjer" är en medveten platshållare — vi har inte haft tillgång till Rättviks kommuns/Stiernhööksgymnasiets faktiska AI-riktlinjer, godkända verktyg eller kontaktväg för AI-frågor. Lägg in dem där så snart de finns, istället för att lämna platshållartexten kvar.

## Vad läraren/ansvarig bör uppdatera när lagtexten ändras

AI-förordningen är under aktiv utveckling — flera tidsfrister har redan skjutits fram en gång (via "Digital Omnibus on AI", i kraft 27 juli 2026). Innan sidan används ett nytt läsår, kontrollera särskilt:

1. **Tidslinjen i sektion 2** (`index.html`, sök på `class="timeline"`): är datumen för högriskreglerna (idag 2 dec 2027 för Bilaga III, 2 aug 2028 för Bilaga I) fortfarande aktuella, eller har de skjutits fram igen?
2. **Artikel 4-texten i sektion 3**: om artikeln ändras igen, uppdatera både "Detta är lag"-rutan och "Så ändrades artikel 4..."-rutan.
3. **Källförteckningen i sektion 7**: EUR-Lex-länkarna pekar på specifika CELEX-nummer (32024R1689, 32026R1744) — om en ny ändringsförordning tillkommer får den ett eget CELEX-nummer och en egen rad.
4. **`docs/faktakontroll.md`**: uppdatera verifieringstabellen vid varje större kontroll, så att dokumentet fortsätter spegla vad som faktiskt är dubbelkollat och när.
5. **"Senast uppdaterad"-datumet** i sidfoten och i sektion 8 ("Om sidan").

Ett enkelt sätt att kontrollera aktuellt läge: sök på "EUR-Lex CELEX 32024R1689" och "AI Act timeline" för att se om EU-kommissionen eller AI Office publicerat någon ny konsoliderad tidslinje.

## Tillgänglighet

Sidan är byggd mot WCAG 2.2 AA: semantisk HTML, tangentbordsnavigerbara interaktiva övningar (klicka-välj istället för drag-and-drop i riskpyramid-sorteraren), synliga fokusindikatorer, `aria-live`-regioner för dynamisk feedback, stöd för `prefers-reduced-motion` och `prefers-color-scheme`, samt kontrollerade kontrastförhållanden i både ljust och mörkt läge. Den har granskats manuellt mot WCAG 2.2 AA-kriterierna (se granskningen som låg till grund för byggfasen) — kör gärna ett automatiserat verktyg som Lighthouse eller axe DevTools som ett komplement innan skarp lansering.
