# CLAUDE.md – Mattesteget

Dyslexi- och dyskalkylivänlig övningsapp (PWA) för gymnasieelever. Se `PLAN.md` för arkitektur och byggsteg. Appen ligger i undermappen `mattesteget/` av ett större repo. Rör inga filer utanför den här mappen, förutom `.github/workflows/mattesteget.yml`.

**Appen har inget bygg- och installationssteg.** Node finns inte på utvecklingsdatorn. Använd inte `npm`, bundlers eller transpilering lokalt.

## Samarbetssätt

- Kommunicera på **svenska**. All synlig text i appen är på svenska.
- Bygg **ETT steg i taget** enligt PLAN.md. Efter varje steg: kör testsidan, visa vad som är klart, säg vad användaren ska testa manuellt i webbläsaren och föreslå commit-meddelande. Vänta på OK innan nästa steg.
- Är något oklart eller motstridigt: fråga, gissa inte.
- Committa bara när användaren ber om det.
- Ladda aldrig ner bibliotek eller filer utan att fråga först (namn, källa, storlek, licens).

## Kommandon (PowerShell, från `mattesteget/`)

```powershell
./tools/serve.ps1        # lokal server på http://localhost:8080/mattesteget/ (Ctrl+C stoppar)
./tools/precache.ps1     # skriver om precache.js (fillista + versionshash för offline)
./tools/make-icons.ps1   # ritar om PNG-ikonerna i icons/
```

- **Tester:** öppna `http://localhost:8080/mattesteget/tests/index.html`. Alla tester ska vara gröna.
- **CI (GitHub Actions, Node i molnet):** `node tests/run-node.mjs`, `tsc --noEmit --checkJs`, Playwright + axe (`tests/e2e/`) och Lighthouse (`lighthouserc.json`). Kör inte dessa lokalt. Webbläsartesterna i `tests/layout.test.js` (textavstånd och reflow) körs på testsidan.
- **Granskning:** se `TILLGANGLIGHET.md` för vad som testas automatiskt och den manuella checklistan.
- **Efter varje ändring av en fil som följer med offline** (allt utom tester, verktyg, `*.md`, `sw.js`, `precache.js`): kör `./tools/precache.ps1`. Annars misslyckas testet "precache.js är inte gammal", och elever som har appen installerad får inte den nya versionen.
- **Prova offline lokalt:** service workern registreras på localhost bara med `?sw=1` i adressen (annars cachar den gamla filer under utveckling). Stäng av servern och ladda om sidan för att se att allt fungerar. Avregistrera den efteråt (DevTools, Application, Service Workers).
- Nya filer som ska följa med offline hamnar automatiskt i listan när du kör `precache.ps1`. Reglerna för vad som utesluts finns både i `precache.ps1` och i `tests/precacheHash.js` och ska vara lika.

## Stack och konventioner

- Vanlig HTML, CSS och **ES-moduler** (`<script type="module">`). Inga beroenden i körtid. Inga CDN:er.
- Varje `.js`-fil börjar med `// @ts-check` och dokumenteras med JSDoc-typer. Inga `any` utan kommentar.
- Rena funktioner i `src/lib/` får inte röra DOM eller `window`, så att de kan testas i både webbläsare och Node.
- CSS med variabler (tokens i `src/styles/tokens.css`). Ingen CSS-in-JS. Inga inline-stilar i HTML (CSP förbjuder dem).
- Relativa sökvägar överallt. Hash-routing (`#/`).
- Formler: MathML via `src/lib/math.js` med `aria-label` = `speak`.
- Matematik: exakt bråkaritmetik med heltal (`fractions.js`), aldrig flyttal för att avgöra rätt eller inte rätt.
- Lagring: inställningar i `localStorage`, progression i IndexedDB. Allt är lokalt.
- Filnamn `camelCase.js`. Tester bredvid koden som `*.test.js` och registrerade i `tests/index.html`.
- Små moduler, inga globala variabler, inga sidoeffekter vid import.
- Kommentarer på svenska, korta, förklara varför.
- Typsnitt: kopiera lokalt från `../mattetraning/fonts/` och `../fonts/files/`. Hämta inget externt.

## Dataskydd (hårda regler)

- **Inga nätverksanrop** efter första laddningen och **inga externa domäner någonsin**: inga CDN:er, ingen typsnittstjänst, ingen analys, ingen spårning, inga tredjepartscookies.
- Inga personuppgifter. Elevprofil = valfritt smeknamn lokalt. Ingen inloggning, ingen e-post.
- Ingen AI/LLM i MVP. Framtida AI-tutor beskrivs bara i `src/ai/README.md`.
- Lärarkoden är ett skydd mot misstag, inte säkerhet. Beskriv den aldrig som säker.

## Tillgänglighetsregler (ska följas i varje steg)

WCAG 2.2 nivå AA, särskilt:

- 1.4.3 Kontrast: text ≥ 4,5:1, komponenter ≥ 3:1, i alla fyra bakgrunder.
- 1.4.12 Text Spacing: inget får brytas eller döljas med radhöjd 1,5, bokstavsavstånd 0,12em, ordavstånd 0,16em, styckeavstånd 2em. Använd `min-height`, aldrig fast höjd på textbehållare.
- 2.1.1 Tangentbord: allt går att göra utan mus.
- 2.4.7 och 2.4.11 Fokus synligt och aldrig dolt (ingen sticky header som täcker fokus, använd `scroll-padding`).
- 2.5.7 Alla dragmoment har klick-/tangentbordsalternativ.
- 2.5.8 Klickytor minst 44×44 px.
- 3.2.6 Hjälpknappen sitter på samma plats på alla sidor.
- 3.3.7 Ingen redundant inmatning. 3.3.8 Ingen inloggningsgåta.

Dyslexianpassning (BDA):

- Vänsterjusterad text, `max-width` 60–70 tecken (`65ch`).
- **Inga kursiver**, inga understrykningar utom länkar, **inga VERSALER i rubriker**, fetstil för betoning. Ingen `text-transform: uppercase`.
- Krämvit bakgrund som standard i stället för vit. Standardtypsnitt Atkinson Hyperlegible.
- Ett steg/en uppgift per skärm.
- Inga animationer som inte kan stängas av. Respektera `prefers-reduced-motion` och inställningen i appen.
- Semantisk HTML, korrekt rubriknivå (en `h1` per vy, inga hopp), `aria-live="polite"` för återkoppling, `lang="sv"` på `<html>`, uppdaterad `document.title` och fokus på `h1` vid vybyte.
- Färg är aldrig ensam informationsbärare.

## Pedagogiska regler

- Lektion: **Visa** (helt löst exempel) → **Tillsammans** (ett steg i taget med stöd) → **Själv**.
- Fading: första exemplet helt löst, nästa saknar sista steget, nästa saknar två steg.
- CRA: interaktiv representation först, sedan bild + symbol, sist bara symbol.
- Ledtrådstrappa på varje uppgift: (1) läs upp igen, (2) visa bild/representation, (3) visa första steget, (4) visa hela lösningen som löst exempel + ny parallell uppgift.
- Textuppgifter: max 2 korta meningar, vardagsord, en strukturtagg per uppgift ("delen-saknas", "helheten-saknas", "procenten-saknas" m.fl.).
- Återkoppling: **aldrig** rött kryss och **aldrig** ordet "fel". Exempel: "Inte riktigt – vill du se en bild?". Ingen synlig tidtagning, inga topplistor, inga jämförelser.
- Synlig progression: "Du har klarat 14 av 20 steg i Procent".
- Stil: neutral och vuxen (bank-/träningsapp). Ingen maskot, inga stjärnregn, inget barnsligt språk.
- Dagens pass: Leitner-lådor per uppgiftstyp, transparent och deterministisk. Ingen AI.

## Innehållsregler (valideras av tester)

- Varje formel har `expr` och `speak` (svensk talversion, t.ex. "tre fjärdedelar", "25 procent av 800"). Saknas `speak` ska ett test misslyckas.
- Varje övningsuppgift har facit, alla fyra ledtrådsnivåer och talversion.
- Fulla moduler (4 och 5): minst 3 lektioner med minst 1 löst exempel, 2 guidade steg och 6 övningsuppgifter vardera.
- Moduler 1–3: skelett + en lektion vardera.
- Vardagskontexter: lön, rabatter, mobilabonnemang, byggmaterial, enkla doser inom vård.
- Svarstolkning ska godta "0,25", "0.25", " 0,25 " och "1/4" där det är matematiskt korrekt.

## Definition of done för ett steg

1. Testsidan är grön och inga fel i webbläsarens konsol.
2. Verifierat i den inbyggda webbläsaren (sidan laddas utan nätverksanrop till andra domäner).
3. Allt nytt går att göra med enbart tangentbord.
4. Ingen ny text saknar svenska, innehåller versalrubriker, kursiv eller ordet "fel" i återkoppling.
5. `precache.ps1` körd om cachade filer ändrats (från steg 10).
6. Sammanfattning till användaren: klart, manuellt test, commit-förslag.
