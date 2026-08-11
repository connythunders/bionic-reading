# Frånvaro-generator

En delbar webbapp där en lärare skriver in ämne/kurs, stadium, lektionslängd
och vad klassen jobbar med – och får ett komplett vikariematerial
(instruktioner till vikarien, elevuppgift, facit, buffertaktivitet), tydligt
kopplat till Skolverkets kunskapskrav/centrala innehåll.

Detta är serverdrivna versionen av den fristående `franvaro-generator.html`
(finns i repots rot, körs helt i webbläsaren med en egen API-nyckel per
person). Här ligger API-nyckeln bara på servern, så du kan dela **länken**
med kollegor utan att de behöver skaffa en egen Anthropic-nyckel.

## Teknik

- **Next.js 14** (App Router) + **TypeScript**
- Frontend: samma vanilla HTML/CSS/JS som den fristående versionen
  (`public/verktyg.html`), oförändrad förutom att den anropar `/api/generate`
  i stället för Anthropic direkt.
- Server-side API-route (`/api/generate`) håller `ANTHROPIC_API_KEY` hemlig
  och tvingar fram strukturerad JSON via ett Anthropic tool-anrop.
- Skolverkets Syllabus API anropas fortfarande direkt från webbläsaren
  (öppen data, ingen nyckel, CORS tillåtet) – bara Anthropic-anropet går via
  servern.
- Deploybar på **Vercel**. Ingen databas, ingen inloggning.

## Så fungerar det

1. Läraren fyller i ämne/kurs, stadium, lektionslängd och vad klassen jobbar
   med, och söker kunskapskrav (samma matchningslogik som den fristående
   versionen: hanterar informella namn som "matte 2b" eller "SVE").
2. Läraren bockar i vilka kunskapskrav/centralt innehåll som är relevanta.
3. Klientens `/api/generate`-anrop skickar bara formulärdata (inget
   känsligt) till servern, som bygger prompten, anropar Anthropic med den
   hemliga nyckeln, och returnerar färdig JSON.

## Kostnadsskydd

Länken är delbar, vilket betyder att vem som helst med länken kan generera
material på din räkning. Två skydd finns inbyggda:

- **Fast modell och `max_tokens`** (`claude-sonnet-5`, 4000 tokens per
  anrop) gör kostnaden per generering förutsägbar.
- **Mjuk daglig gräns** (`MAX_REQUESTS_PER_DAY`, standard 30) stoppar fler
  genereringar när gränsen nås för dagen.

**Viktigt att förstå:** den dagliga gränsen räknas i minnet i
serverfunktionen och nollställs vid ny driftsättning eller "cold start" –
den är alltså ett grovt, inte exakt, skydd, inte en hård kostnadsgaranti.
Med nuvarande inställningar kostar en generering uppskattningsvis
0,05–0,08 USD, så 30/dag ≈ högst 1,5–2,5 USD/dag i värsta fall per
serverinstans. Vill du ha en exakt, delad räknare mellan alla instanser
krävs extern lagring (t.ex. Vercel KV/Upstash Redis) – hör av dig om du
vill att jag lägger till det.

## Komma igång lokalt

```bash
cd franvaro-generator
npm install
cp .env.example .env.local   # fyll i ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```

### Miljövariabler

| Variabel                | Krävs | Beskrivning                                                        |
| ------------------------ | ----- | ------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY`     | Ja    | Server-side nyckel från console.anthropic.com.                     |
| `ANTHROPIC_MODEL`       | Nej   | Model-id. Standard: `claude-sonnet-5`.                              |
| `MAX_REQUESTS_PER_DAY`  | Nej   | Mjuk daglig gräns för antal genereringar. Standard: `30`.           |

## Deploy till Vercel

1. Skapa ett nytt Vercel-projekt med **Root Directory** satt till
   `franvaro-generator`.
2. Lägg in `ANTHROPIC_API_KEY` under **Settings → Environment Variables**.
   Klicka på låsikonen och välj **Sensitive** (visas ibland som
   **Encrypt**) innan du sparar – då krypteras värdet och kan aldrig visas
   igen i dashboarden av någon, inte ens en projektägare, bara skrivas
   över.
3. Lägg ev. in `MAX_REQUESTS_PER_DAY` om standardvärdet 30 inte passar.
4. Deploya. Ramverket (Next.js) detekteras automatiskt.

Kollegor som bara får **länken till den driftsatta appen** ser aldrig
nyckeln – den finns bara i Vercels servermiljö. Begränsa vilka som är
Member/Owner i Vercel-teamet till dem som faktiskt behöver komma åt
projektinställningarna; alla andra kan bara besöka appens URL.

`ANTHROPIC_API_KEY` ska aldrig committas. `.env.local` (där du lägger den
lokalt) ligger redan i `.gitignore`. Endast `.env.example` (utan riktigt
värde) checkas in.

## Datakälla

Källa: **Skolverkets öppna data (Syllabus API)**. Inga personuppgifter om
elever hanteras (GDPR): appen skickar bara ämne, stadium, lektionslängd och
lärarens fritextbeskrivning av vad klassen jobbar med.
