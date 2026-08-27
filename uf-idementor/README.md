# UF-idémentor (serverdriven version)

En delbar webbapp där gymnasieelever som ska starta UF-företag kan bolla
sina affärsidéer med en AI-mentor. Mentorn ger aldrig färdiga svar eller
idéer - den ställer reflekterande följdfrågor, ungefär som en skicklig
handledare gör i ett riktigt UF-handledarsamtal.

Detta är serverdrivna versionen av den fristående `uf-idementor.html`
(finns i repots rot, körs helt i webbläsaren med en egen API-nyckel per
person). Här ligger API-nyckeln bara på servern, så du kan dela **länken**
med kollegor utan att de behöver skaffa en egen Anthropic-nyckel.

## Teknik

- **Next.js 14** (App Router) + **TypeScript**
- Frontend: samma vanilla HTML/CSS/JS som den fristående versionen
  (`public/verktyg.html`), men utan inställningsruta för API-nyckel - den
  anropar `/api/chat` i stället för Anthropic direkt.
- Server-side API-route (`/api/chat`) håller `ANTHROPIC_API_KEY` hemlig,
  bygger mentorns systemprompt (pedagogisk grund + absoluta regler + vald
  fas) och anropar Anthropic med modellen `claude-sonnet-4-6`.
- Deploybar på **Vercel**. Ingen databas, ingen inloggning.

## Så fungerar det

1. Eleven väljer fas (Idé, Målgrupp, Marknad/konkurrenter, Ekonomi,
   Marknadsföring, Utvärdering) och skriver i chatten.
2. Klienten skickar bara `{ phase, messages }` (fasens id och samtalets
   text) till `/api/chat` - ingen nyckel, inga elevkonton.
3. Servern bygger mentorns fullständiga systemprompt utifrån vald fas,
   anropar Anthropic med den hemliga nyckeln, och returnerar mentorns svar
   som text.
4. Chatt-historik och elevens egna insikter sparas bara i elevens egen
   webbläsare (`localStorage`) - servern lagrar ingenting.

## Kostnadsskydd

Länken är delbar, vilket betyder att vem som helst med länken kan chatta
med mentorn på din räkning. Tre skydd finns inbyggda:

- **Fast modell och `max_tokens`** (`claude-sonnet-4-6`, 700 tokens per
  svar) gör kostnaden per mentor-svar liten och förutsägbar.
- **Gräns på hur mycket historik som skickas per anrop** (max 30
  meddelanden, max 3000 tecken per meddelande, max 20 000 tecken totalt)
  skyddar mot en manipulerad klient som försöker skicka orimligt mycket
  text.
- **Mjuk daglig gräns** (`MAX_REQUESTS_PER_DAY`, standard 150) stoppar fler
  mentor-svar när gränsen nås för dagen.

**Viktigt att förstå:** den dagliga gränsen räknas i minnet i
serverfunktionen och nollställs vid ny driftsättning eller "cold start" –
den är alltså ett grovt, inte exakt, skydd, inte en hård kostnadsgaranti.
Med nuvarande inställningar kostar ett mentor-svar uppskattningsvis
0,003-0,006 USD, så 150/dag ≈ högst 0,5-1 USD/dag i värsta fall per
serverinstans. Vill du ha en exakt, delad räknare mellan alla instanser
krävs extern lagring (t.ex. Vercel KV/Upstash Redis) – hör av dig om du
vill att jag lägger till det.

## Komma igång lokalt

```bash
cd uf-idementor
npm install
cp .env.example .env.local   # fyll i ANTHROPIC_API_KEY
npm run dev                  # http://localhost:3000
```

### Miljövariabler

| Variabel                | Krävs | Beskrivning                                                        |
| ------------------------ | ----- | ------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY`     | Ja    | Server-side nyckel från console.anthropic.com.                     |
| `ANTHROPIC_MODEL`       | Nej   | Model-id. Standard: `claude-sonnet-4-6`.                             |
| `MAX_REQUESTS_PER_DAY`  | Nej   | Mjuk daglig gräns för antal mentor-svar. Standard: `150`.            |

## Deploy till Vercel

1. Skapa ett nytt Vercel-projekt med **Root Directory** satt till
   `uf-idementor`.
2. Lägg in `ANTHROPIC_API_KEY` under **Settings → Environment Variables**.
   Klicka på låsikonen och välj **Sensitive** (visas ibland som
   **Encrypt**) innan du sparar – då krypteras värdet och kan aldrig visas
   igen i dashboarden av någon, inte ens en projektägare, bara skrivas
   över.
3. Lägg ev. in `MAX_REQUESTS_PER_DAY` om standardvärdet 150 inte passar.
4. Deploya. Ramverket (Next.js) detekteras automatiskt.

Kollegor som bara får **länken till den driftsatta appen** ser aldrig
nyckeln – den finns bara i Vercels servermiljö. Begränsa vilka som är
Member/Owner i Vercel-teamet till dem som faktiskt behöver komma åt
projektinställningarna; alla andra kan bara besöka appens URL.

`ANTHROPIC_API_KEY` ska aldrig committas. `.env.local` (där du lägger den
lokalt) ligger redan i `.gitignore`. Endast `.env.example` (utan riktigt
värde) checkas in.

## Uppdatera mentorns systemprompt/ämnesplan

Den fristående `uf-idementor.html` och den här serverdrivna versionen har
historiskt haft var sin kopia av systempromten. Sedan den här varianten
byggdes bygger **bara** `src/app/api/chat/route.ts` mentorns fullständiga
systemprompt (pedagogisk grund, absoluta regler och fasfrågor). Om
Skolverkets ämnesplan för Entreprenörskap uppdateras, eller om
mentorsreglerna ska ändras, uppdatera texten där - den fristående
`uf-idementor.html` i repots rot behöver uppdateras separat om ni vill
hålla de två i synk.

## Data och integritet

Inga elevkonton, inget personnummer, ingen känslig data. Chatt-historik
och elevens egna insikter lagras enbart i elevens egen webbläsare
(`localStorage`) - servern sparar ingenting mellan anrop.
