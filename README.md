# Läromedelsportal – bionicreading.se

Samling av interaktiva läromedel och lärarverktyg, byggd av och för lärare. Sajten ligger på [bionicreading.se](https://bionicreading.se) och driftsätts via GitHub Pages – en push till `Main` går live direkt.

Innehållet spänner över SO, svenska, engelska och matematik för åk 7–9 och gymnasiet, plus verktyg för lärarens eget arbete: läroplanskoll, provträning, vikariematerial och klassrumsstöd.

## Kom igång

Verktygen är fristående HTML-filer utan byggkedja. Öppna vilken `.html`-fil som helst direkt i webbläsaren, eller starta en lokal server från projektroten:

```bash
python3 -m http.server 8080
# öppna http://localhost:8080/start.html
```

`start.html` är portalen som listar alla verktyg. `index.html` är verktyget för bionisk läsning som gett sajten dess namn.

## Så är projektet byggt

**Ett verktyg = en fil.** Varje verktyg är en fristående `.html` i projektroten med all CSS och JS inbakad. Ingen byggkedja, inga ramverk, inga CDN-beroenden. Det gör att verktygen fungerar även utan internet, överlever år av bitrot och kan öppnas direkt från en USB-sticka i ett klassrum.

Större datamängder ligger bredvid som JSON (`so-quiz-data.json`, `partierna-data.json`, `skolresultat-gy-data.json`) eller som delade skript i `js/`.

**Målgruppen styr utformningen.** Materialet används av elever med dyslexi, ADHD och autism. Korta meningar, tydlig struktur, visuella pauser och mobilanpassning är krav, inte finish. Granskningsdokumenten i roten (`granskning-tillganglighet.md`, `granskning-sprak.md`, `granskning-pedagogik.md`, `granskning-fakta.md`) visar nivån som gäller.

**AI-verktygen använder din egen nyckel.** De verktyg som anropar Claude gör det direkt från webbläsaren mot `api.anthropic.com`. Användaren matar in sin egen API-nyckel som sparas i `localStorage` – inga nycklar i koden, ingen server emellan.

## Struktur

```
├── start.html              Portalen med alla verktyg
├── index.html              Bionic Reading
├── *.html                  Ett fristående verktyg per fil
├── *.json                  Datafiler till verktygen
├── css/, js/               Delade resurser
├── scripts/                Python/Node-skript för datauppdatering
├── backend/                Node + PostgreSQL för AI Quiz Generator
├── ai-laromedel/           AI-läromedel i kapitelform
├── quiz-games/             Spelunderlag som JSON
├── larplattform/           Lärplattform (Vite, byggs och driftsätts separat)
├── np-engelska/            NP Engelska (Next.js, driftsätts på Vercel)
├── workshop-app/           Workshop-app (Next.js)
├── amnesomraden-grundskola/, franvaro-generator/, riksdag-skola/
└── .claude/                Slash commands och subagenter för Claude Code
```

Undermapparna med `package.json` är egna projekt med egen byggkedja – de är undantagen från regeln om fristående filer.

## Automatik

Två GitHub Actions sköter sig själva:

| Workflow | Vad den gör |
|---|---|
| `partierna-nyheter.yml` | Uppdaterar `partierna-data.json` varje timme |
| `deploy-larplattform.yml` | Bygger och driftsätter lärplattformen |

Commits märkta `Auto:` kommer härifrån – låt dem vara.

## Bidra

Nya verktyg läggs i projektroten och registreras med ett kort på `start.html`. Följ mönstret i en befintlig fil i samma genre.

För Claude Code finns färdiga kommandon i `.claude/commands/`:

| Kommando | Vad det gör |
|---|---|
| `/nytt-verktyg` | Skapar ett nytt verktyg enligt konventionerna ovan |
| `/startsidan` | Lägger till verktygskort på `start.html` |
| `/granska` | Granskar tillgänglighet, språk, pedagogik och fakta |
| `/lgr22` | Kontrollerar material mot kursplanen |
| `/quiz` | Genererar quizfrågor i projektets format |
| `/testa` | Kör ett verktyg lokalt och letar fel |
| `/publicera` | Kontrollerar, committar och pushar |

I `.claude/agents/` finns dessutom tre subagenter: `content-writer`, `curriculum-expert` och `quiz-designer`.

## Licens

Skapat för utbildningsändamål.
