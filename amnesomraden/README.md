# Ämnesövergripande arbetsområden – Stiernhööksgymnasiet

En webbapp där en lärare skriver in ett **tema** (t.ex. _imperialismen_), väljer
ett eller flera av **skolans egna program** och direkt får 3–4
ämnesövergripande arbetsområden – anpassade till elevernas yrkesvardag och
förankrade i **Skolverkets centrala innehåll** (Syllabus API).

Bara Stiernhööksgymnasiets program visas, så läraren slipper klicka sig igenom
hela Sveriges programutbud.

## Teknik

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- Server-side API-routes (Skolverket-anrop och Anthropic-anrop sker aldrig i
  klienten)
- Deploybar på **Vercel**. Ingen databas, ingen inloggning för v1.

## Så fungerar det

1. Läraren väljer ankarämne (default **Historia**) och skriver ett tema.
2. Läraren klickar i ett eller flera program.
3. `/api/skolverket` hämtar och cachar relevant centralt
   innehåll/betygskriterier för ankarämnet + de valda programmens
   karaktärsämnen.
4. `/api/generera` bygger underlaget, anropar Anthropic och returnerar
   strukturerad JSON med arbetsområden.

### Skolverkets Syllabus API

- Bas: `https://api.skolverket.se/syllabus` (öppen data, ingen nyckel).
- Endpoints som används: `/v1/subjects/{code}` (centralt innehåll och
  betygskriterier). Query: `timespan=CURRENT`, `reform=Gy25|Gy11`.
- **Gy25/Gy11:** appen försöker `Gy25` först och faller tillbaka på `Gy11`.
- **CORS:** anrop sker endast server-side.
- **Cache:** hämtad data cachas i minnet + som JSON i `os.tmpdir()` (skrivbart
  på Vercel) i en vecka.
- **Fallback:** om API:et inte kan nås, eller en ämneskod inte matchar, används
  medföljande exempeldata (`src/data/skolverket-sample.json`) och programmens
  karaktärsområden, så att appen fungerar även offline.

> Programmens karaktärsämnens exakta `subjectCode` i `src/lib/program.ts` är
> best-effort. Verifiera dem mot live-API:et (`/api/skolverket?...`) i drift och
> justera vid behov – grundningen faller annars tillbaka på karaktärsområdena.

## Komma igång lokalt

```bash
cd amnesomraden
npm install
cp .env.example .env.local   # fyll i ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```

### Miljövariabler

| Variabel             | Krävs | Beskrivning                                              |
| -------------------- | ----- | -------------------------------------------------------- |
| `ANTHROPIC_API_KEY`  | Ja    | Server-side nyckel från console.anthropic.com.           |
| `ANTHROPIC_MODEL`    | Nej   | Model-id. Standard: `claude-sonnet-4-6`.                 |
| `SKOLVERKET_LIVE`    | Nej   | Sätt `0` för att tvinga exempeldata (offline-utveckling).|

> Kontrollera giltigt model-id på <https://docs.claude.com> innan
> driftsättning om du vill byta modell.

## Deploy till Vercel

1. Skapa ett nytt Vercel-projekt med **Root Directory** satt till
   `amnesomraden`.
2. Lägg in `ANTHROPIC_API_KEY` under **Settings → Environment Variables**.
3. Deploya. Ramverket (Next.js) detekteras automatiskt.

`ANTHROPIC_API_KEY` ligger endast server-side och exponeras aldrig i
klientkoden.

## Tillgänglighet (NPF-vänligt)

Lugnt, rent gränssnitt med tydlig rubrikhierarki, stora klickbara
program-chips grupperade efter rubrik, tydligt laddningstillstånd, skannbara
resultatkort med expanderbara detaljer, "kopiera"-knapp per kort och sparade
senaste sökningar i `localStorage`.

## Datakälla

Källa: **Skolverkets öppna data (Syllabus API)** – Creative Commons. Skolverket
anges som källa i appens sidfot. Inga personuppgifter om elever hanteras
(GDPR): appen skickar bara tema, ämne och program.
