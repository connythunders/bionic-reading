# AI-workshop för lärare

En webbapp för lärarworkshops om AI i undervisningen. Deltagare svarar på reflektionsfrågor i sina arbetslag och en administratör kan se och exportera alla svar.

## Funktioner

- **Deltagarvy** – Välj arbetslag, svara på frågor uppdelade i teman, skicka in
- **Adminvy** (`/admin`) – Lösenordsskyddad vy med alla svar grupperade per lag
- **Export** – Ladda ner sammanställning som Markdown eller skriv ut
- **Responsiv design** – Fungerar på mobil, surfplatta och dator
- **Lokal lagring** – SQLite-databas, ingen internetanslutning krävs

## Snabbstart

```bash
# Installera beroenden
npm install

# Skapa databasen
npx prisma migrate dev

# Generera Prisma-klient
npx prisma generate

# Starta utvecklingsservern
npm run dev
```

Öppna [http://localhost:3000](http://localhost:3000) i webbläsaren.

## Adminvy

Gå till [http://localhost:3000/admin](http://localhost:3000/admin) och logga in med lösenordet:

```
workshop2025
```

Du kan ändra lösenordet genom att sätta miljövariabeln `ADMIN_PASSWORD` i `.env`:

```
ADMIN_PASSWORD=ditt-eget-lösenord
```

## Teknisk stack

- [Next.js](https://nextjs.org/) med TypeScript
- [Tailwind CSS](https://tailwindcss.com/) för styling
- [Prisma](https://www.prisma.io/) med SQLite för lokal datalagring
