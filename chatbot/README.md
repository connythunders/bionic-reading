# Dokumentassistent – Deploy till Vercel

Chattbot som svarar uteslutande utifrån Metodboken och Barn- och elevhälsoplanen för Rättviks kommun.

## Förutsättningar

- Konto på [vercel.com](https://vercel.com) (gratisnivån räcker)
- [Vercel CLI](https://vercel.com/docs/cli): `npm i -g vercel`
- En API-nyckel från [console.anthropic.com](https://console.anthropic.com)

## Deploy

### Alternativ 1: Via Vercel CLI

```bash
cd chatbot/
vercel deploy --prod
```

Följ instruktionerna. När det frågas om root directory, välj `chatbot/`.

### Alternativ 2: Via Vercel Dashboard (enklast)

1. Gå till [vercel.com/new](https://vercel.com/new).
2. Koppla ditt GitHub-repo.
3. Sätt **Root Directory** till `chatbot` i projektinställningarna.
4. Klicka **Deploy**.

## Sätta API-nyckeln

API-nyckeln får ALDRIG ligga i koden. Lägg den som en miljövariabel i Vercel:

1. Gå till ditt projekt i Vercel Dashboard → **Settings** → **Environment Variables**.
2. Skapa en variabel:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** din nyckel (börjar med `sk-ant-…`)
   - **Environments:** Production (och Preview om du vill)
3. Klicka **Save** och gör en ny deploy (eller kör `vercel --prod` igen).

## Lokal testning

```bash
cd chatbot/
npm install
ANTHROPIC_API_KEY=sk-ant-... vercel dev
```

Öppna [http://localhost:3000](http://localhost:3000).

## Filstruktur

```
chatbot/
├── api/
│   └── chat.js          # Serverless-funktion (Anthropic-anrop sker här)
├── data/
│   └── chunks.json      # Förberäknade dokumentavsnitt (82 st)
├── index.html           # Chattgränssnitt
├── package.json
├── vercel.json
├── PLAN.md              # Strategi för retrieval
└── README.md
```

## Säkerhet

- `ANTHROPIC_API_KEY` läses enbart från `process.env` på servern – aldrig i klientkod.
- Serverless-funktionen (`/api/chat`) är den enda platsen som kommunicerar med Anthropics API.
- Klientsidan skickar bara frågan och konversationshistorik (ej API-nyckel).
