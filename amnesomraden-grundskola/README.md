# Ämnesövergripande arbetsområden – Årskurs 7–9

En webbapp där en lärare skriver in ett **tema** (t.ex. _hållbar utveckling_),
väljer ett eller flera **ämnen att väva in** och direkt får 3
ämnesövergripande arbetsområden för högstadiet – förankrade i det centrala
innehållet i **Lgr22** (Skolverkets Syllabus API, grundskolans ämnen).

Detta är en syskonapp till [`../amnesomraden`](../amnesomraden), som gör
samma sak för ett gymnasiums program. Den här varianten är byggd för
grundskolans årskurs 7–9: i stället för yrkes-/högskoleförberedande program
väljer läraren bland högstadiets kärnämnen (språk, SO, NO, praktisk-estetiska
ämnen, matematik och teknik).

## Teknik

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- Server-side API-routes (Skolverket-anrop och Anthropic-anrop sker aldrig i
  klienten)
- Deploybar på **Vercel**. Ingen databas, ingen inloggning för v1.

## Så fungerar det

1. Läraren väljer ankarämne (default **Svenska**) och skriver ett tema.
2. Läraren klickar i ett eller flera ämnen att väva in.
3. `/api/skolverket` hämtar och cachar centralt innehåll/betygskriterier för
   ankarämnet + de valda ämnena, filtrerat till **årskurs 7–9**.
4. `/api/generera` bygger underlaget, anropar Anthropic och returnerar
   strukturerad JSON med arbetsområden.

### Skolverkets Syllabus API

- Bas: `https://api.skolverket.se/syllabus` (öppen data, ingen nyckel).
- Endpoint: `GET /v1/subjects/{code}?timespan=CURRENT`, t.ex.
  `GRGRHIS01` för Historia (grundskolans ämneskoder börjar `GRGR`).
- Grundskoleämnen saknar kurser – centralt innehåll och betygskriterier är i
  stället indelade per stadium (`"year": "1-3" | "4-6" | "7-9"`). Appen
  filtrerar alltid till `"7-9"` för centralt innehåll och betygssteg E/A vid
  `"9"` (slutet av årskurs 9).
- **CORS:** anrop sker endast server-side.
- **Cache:** hämtad data cachas i minnet + som JSON i `os.tmpdir()` (skrivbart
  på Vercel) i en vecka.
- **Fallback:** om API:et inte kan nås används medföljande exempeldata
  (`src/data/skolverket-sample.json`, hämtad från samma API), så att appen
  fungerar även offline.

## Komma igång lokalt

```bash
cd amnesomraden-grundskola
npm install
cp .env.example .env.local   # fyll i ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```

### Miljövariabler

| Variabel             | Krävs | Beskrivning                                              |
| --------------------- | ----- | -------------------------------------------------------- |
| `ANTHROPIC_API_KEY`  | Ja    | Server-side nyckel från console.anthropic.com.           |
| `ANTHROPIC_MODEL`    | Nej   | Model-id. Standard: `claude-haiku-4-5-20251001`.          |
| `SKOLVERKET_LIVE`    | Nej   | Sätt `0` för att tvinga exempeldata (offline-utveckling).|

> Kontrollera giltigt model-id på <https://docs.claude.com> innan
> driftsättning om du vill byta modell.

## Deploy till Vercel

1. Skapa ett nytt Vercel-projekt med **Root Directory** satt till
   `amnesomraden-grundskola`.
2. Lägg in `ANTHROPIC_API_KEY` under **Settings → Environment Variables**.
   Klicka **Encrypt**/**Sensitive** när du sparar värdet (se nedan).
3. Deploya. Ramverket (Next.js) detekteras automatiskt.

`ANTHROPIC_API_KEY` ligger endast server-side och exponeras aldrig i
klientkoden – den skickas aldrig till webbläsaren, oavsett vem som
använder appen.

### Dölj nyckeln för kollegor

Kollegor som bara får **länken till den driftsatta appen** ser aldrig
nyckeln – den finns bara i Vercels servermiljö, inte i sidan de öppnar i
webbläsaren. Det som återstår är att se till att kollegor med tillgång
till **Vercel-projektet eller GitHub-repot** inte heller kan läsa den:

- **I Vercel:** när du skapar variabeln `ANTHROPIC_API_KEY` under
  **Settings → Environment Variables**, klicka på låsikonen och välj
  **Sensitive** (visas ibland som **Encrypt**) innan du sparar. Då krypteras
  värdet och kan aldrig visas igen i dashboarden eller CLI:t av någon –
  inte ens en projektägare – bara skrivas över. Går inte att slå på i
  efterhand, så ta bort en redan sparad variabel och lägg in den på nytt
  med Sensitive ikryssat om du redan hunnit spara den utan.
- **Begränsa vilka som är Member/Owner** i Vercel-teamet till dem som
  faktiskt behöver komma åt projektinställningarna. Alla andra kan bara
  besöka appens URL.
- **I git:** nyckeln ska aldrig committas. `.env.local` (där du lägger den
  lokalt) är redan listad i `.gitignore` och ligger bara på din egen dator.
  Endast `.env.example` (utan riktigt värde) checkas in.

Med detta ser kollegor bara den färdiga appen – ingen av dem behöver eller
kan se själva API-nyckeln.

## Tillgänglighet (NPF-vänligt)

Lugnt, rent gränssnitt med tydlig rubrikhierarki, stora klickbara
ämnes-chips grupperade efter rubrik, tydligt laddningstillstånd, skannbara
resultatkort med expanderbara detaljer, "kopiera"-knapp per kort och sparade
senaste sökningar i `localStorage`.

## Datakälla

Källa: **Skolverkets öppna data (Syllabus API)** – Lgr22. Skolverket anges
som källa i appens sidfot. Inga personuppgifter om elever hanteras (GDPR):
appen skickar bara tema, ämne och valda ämnen.
