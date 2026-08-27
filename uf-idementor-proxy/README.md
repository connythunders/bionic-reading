# UF-idémentor – proxy för Anthropic-nyckeln

Liten serverless-funktion som gör att `uf-idementor.html` kan pratas med av dig
och dina kollegor utan att var och en behöver skaffa och skriva in en egen
Anthropic API-nyckel. Nyckeln ligger bara på servern, aldrig i sidans kod.

## Förutsättningar

- Konto på [vercel.com](https://vercel.com) (gratisnivån räcker)
- [Vercel CLI](https://vercel.com/docs/cli) (valfritt): `npm i -g vercel`
- En API-nyckel från [console.anthropic.com](https://console.anthropic.com)

## Deploy

### Via Vercel Dashboard (enklast)

1. Gå till [vercel.com/new](https://vercel.com/new).
2. Koppla GitHub-repot `bionic-reading`.
3. Sätt **Root Directory** till `uf-idementor-proxy` i projektinställningarna.
4. Klicka **Deploy**.

### Via Vercel CLI

```bash
cd uf-idementor-proxy/
vercel deploy --prod
```

## Sätta API-nyckeln

API-nyckeln får ALDRIG ligga i koden. Lägg den som miljövariabel i Vercel:

1. Gå till projektet i Vercel Dashboard → **Settings** → **Environment Variables**.
2. Skapa:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** din nyckel (börjar med `sk-ant-…`)
   - **Environments:** Production (och Preview om du vill testa där också)
3. (Valfritt) Sätt även `ALLOWED_ORIGIN` till `https://bionicreading.se` om du vill vara explicit – det är redan standardvärdet i koden.
4. Klicka **Save** och gör en ny deploy (eller kör `vercel --prod` igen).

## Koppla ihop med sidan

När funktionen är deployad får du en URL, t.ex. `https://uf-idementor-proxy.vercel.app`.

Öppna `uf-idementor.html` i repots rot och uppdatera konstanten `PROXY_URL`
längst upp i `<script>`-blocket:

```js
const PROXY_URL = 'https://uf-idementor-proxy.vercel.app/api/mentor';
```

Committa och pusha – nästa gång sidan laddas på bionicreading.se går alla
anrop via din proxy istället för direkt mot Anthropic.

## Viktigt om kostnad och missbruk

Sidan är öppen för alla som har länken (ingen inloggning). Proxyn begränsar
längden på konversationer och svar, men den kan ändå anropas av vem som
helst som hittar URL:en, inte bara dina kollegor och elever. Sätt därför en
**budgetgräns/spend limit** på din API-nyckel i
[console.anthropic.com](https://console.anthropic.com) (Settings → Limits)
så du inte kan bli fakturerad mer än du är bekväm med. Vill ni ha riktig
åtkomstkontroll (t.ex. bara inloggade lärare) behöver sidan byggas ut med
autentisering – hör av dig om ni vill ha hjälp med det.

## Lokal testning

```bash
cd uf-idementor-proxy/
npm install
ANTHROPIC_API_KEY=sk-ant-... vercel dev
```

## Filstruktur

```
uf-idementor-proxy/
├── api/
│   └── mentor.js       # Serverless-funktion (Anthropic-anropet sker här)
├── package.json
├── vercel.json
├── .env.example
└── README.md
```

## Säkerhet

- `ANTHROPIC_API_KEY` läses enbart från `process.env` på servern – aldrig i klientkod.
- Klienten (`uf-idementor.html`) skickar bara systemprompt och konversation, aldrig någon nyckel.
- CORS är begränsad till `ALLOWED_ORIGIN` (standard `https://bionicreading.se`).
