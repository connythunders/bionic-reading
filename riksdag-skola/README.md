# Riksdagsbevakaren - Skola & Utbildning

Automatisk bevakning av riksdagsdokument som rör skola och utbildning. Hämtar motioner, propositioner, betänkanden, interpellationer och frågor från riksdagens öppna API och visar dem i ett rent webbgränssnitt med e-postnotiser.

## Funktioner

- Automatisk hämtning av riksdagsdokument om skola/utbildning
- Filtrering per dokumenttyp, år och fritext
- E-postnotiser vid nya dokument (med dubbel opt-in)
- RSS-flöde
- Mörkt/ljust tema
- Mobilresponsiv design

## Kom igång

```bash
# Installera beroenden
npm install

# Kopiera och konfigurera miljövariabler
cp .env.example .env
# Redigera .env med dina SMTP-uppgifter

# Initiera databasen
npm run setup

# Starta appen
npm start
```

Öppna `http://localhost:3000` i webbläsaren.

## Manuell uppdatering

```bash
curl -X POST http://localhost:3000/api/refresh -H "x-key: din-nyckel"
```

## API

| Metod | Sökväg | Beskrivning |
|-------|--------|-------------|
| GET | `/api/documents?page=1&limit=20&type=Motion&year=2025` | Lista dokument |
| GET | `/api/documents/:id` | Enskilt dokument |
| GET | `/api/stats` | Statistik |
| POST | `/api/subscribe` | Prenumerera (`{ "email": "..." }`) |
| GET | `/api/confirm/:token` | Bekräfta prenumeration |
| POST | `/api/unsubscribe/:token` | Avprenumerera |
| POST | `/api/refresh` | Manuell uppdatering (kräver `x-key`-header) |
| GET | `/feed.xml` | RSS-flöde |

## Källa

Data hämtas från [Sveriges riksdags öppna API](https://data.riksdagen.se). Ange alltid Sveriges riksdag som källa.
