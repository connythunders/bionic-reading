# PLAN.md – Mattesteget (MVP), version 2: utan Node

Status: **UTKAST – väntar på godkännande. Ingen kod är skriven.**

Mattesteget är en dyslexi- och dyskalkylivänlig övningsapp (PWA) för gymnasieelever. Den tar eleven från taluppfattning (Lgr22 åk 7–9) mot Matematik 1a (Gy25).

Version 1 av planen krävde Node 22 (Vite, React, Zod, Vitest). Node går inte att installera på den här datorn (skolans policy blockerar det). Version 2 bygger därför appen **helt utan bygg- och installationssteg**: vanlig HTML, CSS och JavaScript-moduler som webbläsaren kör direkt. Det finns redan ett fungerande exempel på samma upplägg i repot (`mattetraning/`, med egen `sw.js` och `test.html`).

## 1. Beslut

| Fråga | Beslut |
|---|---|
| Placering | Undermappen `mattesteget/`. Rotens filer (`PLAN.md`, `README.md`, `CNAME`, workflows) rörs inte. |
| Adress och publicering | Mappen publiceras **som den är** av GitHub Pages på `bionicreading.se/mattesteget/`. Inget bygge, ingen `dist/`, inget publiceringsval. Alla sökvägar är relativa. Routing med hash (`#/`). |
| Node | Behövs inte lokalt. Används bara i GitHub Actions (i molnet) för att köra samma tester och e2e/axe. |
| Typsnitt | Buntas lokalt. Atkinson Hyperlegible kopieras från `mattetraning/fonts/`, OpenDyslexic från `fonts/files/` (OFL). Verdana och Arial är systemtypsnitt. Inga externa anrop. |
| Lärarkod | Skydd mot misstag, inte säkerhet. Dokumenteras så. QR-koden innehåller bara en sammanfattning. |

## 2. Vad som ersätter den ursprungliga stacken

| Kravet sa | Nu | Varför och konsekvens |
|---|---|---|
| Vite + React + TS strict | Vanliga ES-moduler + JSDoc med `// @ts-check` | Ingen kompilering. VS Code typkontrollerar JSDoc direkt. CI kör `tsc --checkJs` för strikt kontroll. Små vyfunktioner och en egen `h()`-hjälpare i stället för React. |
| KaTeX | **MathML** (inbyggt i Chrome 109+, alltså ChromeOS och Android Chrome) + `aria-label` = talversion | Ingen nedladdning och inga typsnitt att bunta. Räcker för bråk, ·, %, =. Kan bytas mot KaTeX senare om behovet uppstår. |
| Zod | Egen liten validator `src/lib/validate.js` | Körs i webbläsaren (dev-konsol och testsida) och i CI. Samma regler. |
| idb-keyval | Egen wrapper (ca 30 rader) över IndexedDB | Samma API-idé, inget beroende. |
| vite-plugin-pwa | Handskriven `sw.js` + `manifest.webmanifest` + skriptet `tools/precache.ps1` som listar filer | Samma modell som `mattetraning/sw.js`. |
| Vitest + Testing Library | Egen minimal testkörare. Testsida `tests/index.html` körs i webbläsaren, samma filer körs med Node i CI | Lokalt öppnar du testsidan. |
| Playwright + axe | **Bara i GitHub Actions**. Lokalt: manuell checklista + egna kontroller på testsidan (kontrast, rubriknivåer, klickytor, förbjudna ord) | Risk: första riktiga axe-körningen sker i CI, inte hos dig (se avsnitt 11). |
| `npm run dev` | `tools/serve.ps1` (PowerShell, `http://localhost:8080/mattesteget/`) | PowerShell finns redan. Ingen installation. Service worker och moduler kräver http, inte `file://`. |
| QR | Vendorad `qrcode-generator` (MIT, en fil) | Kräver en nedladdning i steg 9. Jag frågar då. Alternativ: egen kodare. |

## 3. Arkitektur

- **Moduler:** `<script type="module">` från `index.html`. Ingen bundler. Filerna cachas av service worker.
- **Vyer:** varje vy är en funktion `(ctx) => HTMLElement`. Hash-router mappar `#/modul/4/lektion/2/steg/3` till vyer. Fokus flyttas till vyns `h1` vid varje byte och sidtiteln uppdateras (2.4.2, skärmläsare).
- **Innehåll:** JSON i `content/`, hämtat med `fetch` och validerat av `validate.js` vid inläsning. Fel visas i dev-konsolen och stoppar testsidan.
- **State:** ett litet `store.js` (get/set/subscribe). Lektionsflödet är en ren funktion (reducer) som kan testas utan DOM.
- **Lagring:** inställningar i `localStorage` (läses synkront före första målning så att temat inte blinkar), progression i IndexedDB.
- **Uppläsning:** `tts.js` över Web Speech API. Talversion (`speak`) används alltid i stället för symboler.
- **Formler:** `math.js` bygger MathML-noder (bråk `<mfrac>`, tal, operatorer) från en liten uttrycksnotation i datan och sätter `aria-label`.
- **CSP:** `default-src 'self'; img-src 'self' data:; style-src 'self'` i `index.html`. Utan KaTeX behövs ingen `unsafe-inline`.
- **Inga nätverksanrop** efter första laddningen, inga externa domäner.

## 4. Filstruktur

```
mattesteget/
  PLAN.md  CLAUDE.md  INTEGRITET.md  README.md
  index.html  manifest.webmanifest  sw.js  precache.json   (genereras av tools/precache.ps1)
  content/
    modules/ 01-tallinjen.json … 05-procent-vardag.json
    glossary.json
  fonts/                       (atkinson, opendyslexic: woff2/woff + fonts.css)
  icons/                       (PWA-ikoner)
  src/
    main.js                    (start, router, tema, service worker-registrering)
    app/                       (router.js, layout.js, helpButton.js, home.js, moduleList.js)
    features/
      lesson/                  (lessonFlow.js, workedExample.js, guidedStep.js, practice.js, hintLadder.js, feedback.js, answerInput.js)
      practice/                (dailySession.js, leitner.js, sessionBuilder.js)
      interactives/            (numberLine.js, fractionBars.js, percentBar.js, money.js)
      tts/                     (speech.js, voices.js, speakButton.js, speedControl.js)
      calculator/              (calculatorPanel.js, calcLogic.js)
      glossary/                (glossaryPage.js)
      settings/                (settingsStore.js, applySettings.js, settingsPage.js)
      progress/                (db.js, progressStore.js, myJourney.js, exportImport.js, qr.js)
      teacher/                 (teacherGate.js, teacherOverview.js, importStudents.js)
    lib/
      answers.js               (tolkning och kontroll av svar)
      fractions.js             (exakt bråkaritmetik med heltal)
      validate.js              (innehållsschema)
      math.js                  (MathML-hjälpare)
      dom.js                   (h(), focus-hjälpare, aria-live)
      speakNumbers.js
    styles/                    (tokens.css, base.css, typography.css, themes.css, components.css)
    ai/README.md
  tests/
    index.html                 (testsida: öppna i webbläsaren)
    harness.js  *.test.js
    run-node.mjs               (samma tester i Node, bara CI)
    e2e/                       (Playwright + axe, bara CI)
  tools/
    serve.ps1                  (lokal webbserver)
    precache.ps1               (genererar precache.json + höjer cache-version)
  package.json                 (ENDAST för CI: devDependencies playwright, @axe-core/playwright, typescript)
```

## 5. Datamodell

### 5.1 Innehåll (valideras av `validate.js`)

```js
Formula   = { expr: string, speak: string }      // speak är OBLIGATORISK. expr i enkel notation, t.ex. "3/4", "25% * 800"
RichText  = { text: string, speak?: string, formulas?: { [key]: Formula } }
            // text kan ha platshållare {{f1}}. Tillåtet: **fetstil**. Ingen kursiv.

Module  = { id, title, summary, order, status: 'full' | 'skeleton', lessons: Lesson[] }
Lesson  = { id, title, goal: RichText, representation: 'numberLine'|'fractionBars'|'percentBar'|'money'|'none', steps: Step[] }
Step    = WorkedExample | GuidedStep | Practice | InteractiveStep

WorkedExample = { type:'workedExample', id, structure, prompt: RichText,
                  steps: { text: RichText, formula?: Formula, ask?: RichText, answer?: Answer }[],
                  answer: Answer, fading?: 0|1|2 }
                  // De sista `fading` stegen döljs för eleven, som svarar på `ask` med facit `answer`.
                  // Lektion: draft?: true undantar den från minimikraven (skelett). Praktik: parallel är valfri;
                  // ledtråd 4 väljer annars nästa uppgift med samma strukturtagg.
                  // RichText med %, /, =, +, ×, ÷ eller "kr" kräver egen talversion (speak).
GuidedStep    = { type:'guidedStep', id, structure, prompt: RichText,
                  parts: { prompt: RichText, answer: Answer, hint?: RichText }[] }
Practice      = { type:'practice', id, structure, itemType, context, prompt: RichText, answer: Answer,
                  hints: { reread: true, representation: RepSpec, firstStep: RichText, fullSolution: WorkedExample },
                  parallel?: Practice, commonWrong?: { value: string, message: string }[] }
InteractiveStep = { type:'interactive', kind, config, prompt: RichText }

Answer = { kind:'number', value, tolerance? } | { kind:'fraction', num, den, mustBeSimplified? }
       | { kind:'choice', options: RichText[], correct: number[] } | { kind:'numberLine', target, tolerance }
structure = 'delen-saknas' | 'helheten-saknas' | 'procenten-saknas' | 'storst-minst' | 'placera' | 'omvandla' | …
```

Regler som valideras (testsidan och CI):
- Varje `Formula` har icke-tom `speak`. Annars misslyckas testet.
- Prompt max 2 meningar och ca 200 tecken i fulla moduler.
- Varje `practice` har alla fyra ledtrådsnivåer.
- Fulla moduler: minst 1 workedExample, 2 guidedStep, 6 practice per lektion, minst 3 lektioner.
- Unika, stabila ID. Inga kursiv-markeringar, inga versalrubriker, inget "fel" i återkopplingstexter.

### 5.2 Progression (IndexedDB)

```
progress:<itemId>   = { attempts, hintsUsed, hintMax, done, lastSeen, box: 1..5, due, wrongAnswers: string[≤5] }
lessonState:<id>    = { stepIndex, phase }
profile             = { nickname?, teacherCodeHash?, createdAt }
```
Export: JSON `{ version, exportedAt, nickname?, items }`. QR: bara `{ v, nick?, perModule: { id: { done, total } } }`.

### 5.3 Inställningar (localStorage `ms.settings`)
`font`, `fontSize` (18–28), `lineHeight` (1.5–2.0), `letterSpacing`, `background` (cream|grey|blue|dark), `autoRead`, `speechRate` (0.7–1.3), `representation`, `reducedMotion`.

## 6. Algoritmer

- **Svarstolkning:** trimma, ta bort alla mellanslag (även hårda), `,` ⇒ `.`, tolka `a/b`, `a b/c` och `%`. Bråkuppgifter jämförs exakt med heltal. `0,25`, `0.25`, ` 0,25 ` och `1/4` godtas där det är matematiskt korrekt. Kräver uppgiften förenklat bråk: "Rätt värde – kan du förkorta?".
- **Leitner:** 5 lådor, intervall 0/1/3/7/14 dagar. Rätt utan ledtråd ⇒ upp en låda, rätt med ledtråd ⇒ samma, inte klar ⇒ låda 1.
- **Dagens pass:** 2–3 förfallna repetitionsuppgifter, fyll till 5–8 blandat över moduler (aldrig samma `itemType` två i rad om det går att undvika). Deterministisk sortering med fast tie-break på ID.

## 7. Tillgänglighet och design

Samma krav som tidigare (se CLAUDE.md): WCAG 2.2 AA, BDA-riktlinjer, ett steg per skärm, `max-width: 65ch`, krämvit bakgrund, hjälpknappen på samma plats, klick-/tangentbordsalternativ till alla dragmoment, ingen tidtagning och inget rött. Kontrast för alla fyra teman kontrolleras av en uträkning på testsidan.

## 8. Testplan

| Nivå | Var | Täcker |
|---|---|---|
| Enhet och innehåll | `tests/index.html` (webbläsare) och CI (Node) | `answers`, `fractions`, Leitner, sessionBuilder, exportImport, QR-sammanfattning, `validate`, `speakNumbers`. Innehållsregler: `speak` finns, ledtrådar finns, minimiantal, unika ID, förbjudna ord, inga kursiver. |
| Komponent | `tests/index.html` | AnswerInput, HintLadder-ordning, Feedback utan rött/"fel", SpeakButton med mockad `speechSynthesis`, NumberLine tangentbord |
| Egna tillgänglighetskontroller | `tests/index.html` | Kontrastkvot per tema, rubriknivåer, klickytor ≥ 44 px, att alla `img` har alt, textavstånd enligt 1.4.12 injicerat via CSS |
| E2E + axe | Bara GitHub Actions | Hel lektion, Dagens pass, offline utan nätverksanrop, tangentbordsnavigering, axe på alla vyer och teman |
| Manuellt | Checklista | Chromebook och Android Chrome med svensk röst, NVDA/TalkBack stickprov, Lighthouse (kan köras i Chrome/Edge DevTools, kräver ingen installation) |

## 9. Komponentlista

App: layout, header, hjälpknapp, start, modulista, modulsida. Lektion: lessonFlow, workedExample, guidedStep, practice, hintLadder, feedback (aria-live), answerInput, stegframsteg. Interaktiva: numberLine (`role="slider"`), fractionBars, percentBar, money. Tal: speakButton, speedControl, noVoiceNotice. Matte: formel (MathML). Övrigt: räknare, ordlista, inställningar, Min resa, export, QR, lärargrind, lärarvy, import.

## 10. Byggsteg (ett i taget, väntar på ditt OK efter varje)

Varje steg slutar med: testsidan körd, vad som är klart, vad du testar manuellt, förslag på commit-meddelande.

1. **Setup (ca 2 h).** Mappstruktur, `index.html` med `lang="sv"`, CSP, hash-router, tema- och typografitokens, lokala typsnitt (kopieras från repot), header med fast hjälpknapp, tomma vyer, `tools/serve.ps1`, `tests/index.html` med testharness och första tester, CI-workflow (Node i molnet, kör tester + typkontroll), `package.json` bara för CI.
2. **Innehållsschema (ca 1,5 h).** `validate.js`, innehållsregler som tester, en exempellektion (Procent i vardagen, lektion 1).
3. **Lektionsmotor (ca 2 h).** lessonFlow, workedExample, guidedStep, practice, answerInput, `answers.js` med tester, fading.
4. **Talsyntes (ca 2 h).** `speech.js`, röstval, `voiceschanged`, saknad röst-meddelande, ordmarkering via `onboundary` med reserv till meningsmarkering, hastighet, paus/stopp, MathML-formler med `aria-label`, test för obligatoriskt `speak`.
5. **Interaktiva representationer (ca 2 h).** numberLine, fractionBars, percentBar, money med tangentbords- och klickalternativ. Kan delas i 5a/5b.
6. **Ledtrådstrappa och återkoppling (ca 1,5 h).** Nivå 1–4, parallell uppgift, återkopplingstexter, riktade meddelanden för vanliga felsvar.
7. **Progression och Dagens pass (ca 2 h).** IndexedDB, Min resa, Leitner, sessionBuilder, Dagens pass.
8. **Inställningar, miniräknare, ordlista (ca 2 h).**
9. **Lärarvy, export, import, QR (ca 2 h).** Här behövs en nedladdning av `qrcode-generator`. Jag frågar först.
10. **PWA och offline (ca 1,5 h).** `sw.js`, `precache.ps1`, manifest, ikoner, offlinetest (manuellt i DevTools lokalt, automatiskt i CI). Publicering sker automatiskt när mappen pushas.
11. **Innehåll (flera pass).** 11a modul 4, 11b modul 5, 11c modul 1–3 (skelett + en lektion vardera). Du granskar 11a didaktiskt innan 11b.
12. **Granskning (ca 2 h).** Manuell checklista, 1.4.12-test, Lighthouse, prestanda, README, `INTEGRITET.md`, `src/ai/README.md`.

`INTEGRITET.md` och `src/ai/README.md` skrivs som utkast i steg 1 och slutförs i steg 12.

## 11. Risker och öppna frågor

- **axe och Playwright körs bara i CI.** Jag kan inte köra dem här, så första körningen kan visa fel som jag fixar i efterhand. Lokalt testar jag i den inbyggda webbläsaren och med egna kontroller.
- **Ingen typkontroll lokalt** utöver redigerarens `// @ts-check`. Strikt `tsc` körs i CI.
- **MathML i skärmläsare:** stödet varierar, därför sätts `aria-label` med talversionen på hela formeln och MathML är `aria-hidden`.
- **Röstkvalitet:** olika svenska röster i Chrome på ChromeOS/Android, vissa utan `onboundary`. Reserven (meningsmarkering) är ett krav.
- **Cache-versioner:** utan bygge måste `precache.ps1` köras (eller CI göra det) när filer ändras, annars serveras gamla filer offline. Jag lägger in en kontroll i CI som misslyckas om listan är föråldrad.
- **Innehållsmängden** är största arbetet. Jag skriver utkast, du granskar.
- **Skolans Chromebooks** kan blockera PWA-installation eller rensa IndexedDB. Nämns i `INTEGRITET.md`.
