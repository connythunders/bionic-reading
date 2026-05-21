# Onboarding – Hemtjänsten

Interaktiv onboardingapp för nyanställda inom hemtjänsten. Körs direkt i webbläsaren – ingen installation eller server behövs.

## Kom igång

Öppna `index.html` i en webbläsare.

## Personalisera innehållet

Öppna `data.js` och sök efter dessa platshållare och byt ut dem:

| Platshållare | Byt till |
|---|---|
| `[KOMMUN]` | Kommunens namn, t.ex. `Sundsvalls` |
| `[SCHEMASYSTEM, t.ex. Medvind eller Time Care Pool]` | Ert schemasystem |
| `[TELEFON]` | Relevanta telefonnummer |
| `[CHEFENS NAMN]` | Enhetschefens namn |
| `[E-POST]` | Chefens e-postadress |
| `[TIDER]` | När chefen är nåbar |
| `[SYSTEM]` | Ert verksamhetssystem |
| `[TELEFONNUMMER FÖR SJUKANMÄLAN]` | Sjukanmälningsnummer |
| `[NAMN]` | Kontaktpersoners namn |
| `[VIKARIESAMORDNARE/TELEFON]` | Vikariebokningsnummer |
| `[STATION]` | Tankstation för tjänstebilar |

## Lägga till eller ändra innehåll

Varje avsnitt i `data.js` ser ut så här:

```javascript
{
  id: "unik-nyckel",
  icon: "👋",
  title: "Titeln",
  summary: "Kort beskrivning (visas på kortet)",
  content: `<p>HTML-innehåll...</p>`,
  checklist: [
    { id: "unik1", text: "Checklistetext" },
    { id: "unik2", text: "Checklistetext" }
  ]
}
```

**Viktigt:** `id` på checklistepunkter måste vara unika. Framsteg sparas med dessa som nyckel i webbläsarens localStorage.

## Filer

- `index.html` – hela appen (HTML, CSS, JavaScript)
- `data.js` – allt innehåll
- `README.md` – den här filen
