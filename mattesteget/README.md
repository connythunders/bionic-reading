# Mattesteget

En dyslexi- och dyskalkylivänlig övningsapp (PWA) för gymnasieelever som behöver stärka taluppfattningen: från decimaltal, bråk och procent mot Matematik 1a. Allt är på svenska, och inget lämnar enheten.

Appen har **inget bygge och inga beroenden i körtid**. Den är vanlig HTML, CSS och JavaScript-moduler som webbläsaren kör direkt.

## Vad appen kan

- **Fem moduler** med lektioner enligt Visa, Tillsammans, Själv: löst exempel, guidade steg och egna uppgifter. Modul 4 och 5 har tre fulla lektioner var, modul 1 till 3 en vardera.
- **Ledtrådstrappa** på varje övning: läs upp igen, bild, första steget, hela lösningen och en parallell uppgift.
- **Dagens pass** med Leitner-lådor: kort, blandad repetition av det eleven redan övat. Genomskinligt och utan AI.
- **Uppläsning** med svensk röst (Web Speech API), ordmarkering, hastighet och talversion av varje formel.
- **Representationer**: tallinje, bråkstavar, procentstapel och pengar, alla med tangentbords- och klickalternativ till dragning.
- **Miniräknare** med exakta decimaler, och **ordlista** med bilder och uppläsning.
- **Inställningar**: typsnitt (Atkinson Hyperlegible, Verdana, Arial, OpenDyslexic), textstorlek, radavstånd, bokstavsavstånd, fyra bakgrunder och rörelse.
- **Min resa** och **lärarvy**: eleven delar bara det hen själv väljer (fil eller kort sammanfattning), och läraren ser översikt, ledtrådar och vanliga felsvar bakom en lärarkod.
- **Offline**: installerbar, och fungerar helt utan internet efter första besöket.

## Köra lokalt (PowerShell)

```powershell
cd mattesteget
./tools/serve.ps1
```

- Appen: http://localhost:8080/mattesteget/
- Tester: http://localhost:8080/mattesteget/tests/index.html (alla ska vara gröna)

Ingen installation behövs. Node behövs inte lokalt. GitHub Actions kör samma tester i Node, plus Playwright, axe och Lighthouse.

Efter varje ändring av en fil som följer med offline:

```powershell
./tools/precache.ps1
```

## Innehåll

Allt innehåll ligger som JSON i `content/` och valideras av `src/lib/validate.js`. Regler som kontrolleras bland annat: talversion (`speak`) på varje formel, högst två meningar per uppgift, ingen kursiv, alla fyra ledtrådsnivåer, unika id:n. Se `PLAN.md` för schemat.

## Dokument

| Fil | Innehåll |
|---|---|
| `PLAN.md` | Arkitektur, datamodell och byggsteg |
| `CLAUDE.md` | Konventioner och tillgänglighetsregler för utveckling |
| `TILLGANGLIGHET.md` | Vad som testas automatiskt, och en manuell checklista för granskning på riktiga enheter |
| `INTEGRITET.md` | Vad som sparas och var, för elever, vårdnadshavare och dataskyddsombud |
| `src/ai/README.md` | Hur en framtida AI-tutor skulle kunna kopplas in (finns inte i appen) |

## Teknik i korthet

- ES-moduler med JSDoc-typer (`// @ts-check`), egen minimal vyhjälpare i stället för ett ramverk.
- Formler som MathML med talversionen som `aria-label`.
- Progression i IndexedDB, inställningar i localStorage. Inga cookies och inga externa anrop.
- Service worker med fillista och versionshash (`precache.js`). Uppdateringar tas i bruk först när eleven väljer det.
- Hela appen är ca 430 kB i 76 filer.

## Offline och installation

Efter första besöket sparas appens filer på enheten och appen fungerar utan internet. Den kan installeras från webbläsaren (till exempel i Chrome på Chromebook eller Android). Service workern registreras på https-adresser. Lokalt aktiveras den bara med `?sw=1` i adressen, så att den inte cachar gamla filer under utveckling.

## Publicering

Mappen publiceras som den är av GitHub Pages på `bionicreading.se/mattesteget/`. GitHub Actions kör testerna i molnet vid varje push.
