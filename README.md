# Quiz om Första Världskriget 🌈

Ett interaktivt quiz om första världskriget med 15 frågor och en vacker regnbågsfärgad bakgrund.

## Funktioner

- 15 frågor om första världskriget
- Animerad regnbågsfärgad bakgrund
- Visuell feedback för rätta och felaktiga svar
- Framstegsindikator
- Resultatsammanfattning med betyg
- Responsiv design som fungerar på mobil och desktop

## Hur man använder

1. Öppna `index.html` i en webbläsare
2. Läs frågan och klicka på det svar du tror är rätt
3. När du svarar får du omedelbar feedback om svaret var rätt eller fel
4. Klicka på "Nästa fråga" för att fortsätta
5. Efter alla 15 frågor ser du ditt resultat med en procentandel och feedback

## Projektstruktur

```
super-broccoli/
├── index.html          # Huvudsidan
├── css/
│   └── styles.css      # Stilar med regnbågsbakgrund
├── js/
│   └── quiz.js         # Quiz-logik och frågor
└── README.md           # Dokumentation
```

## Quizfrågor

Quizet innehåller frågor om:
- Datum och viktiga händelser under första världskriget
- Allianser och länder som deltog
- Skyttegravskrig och nya vapen
- Fredsfördraget och krigets efterspel
- Betydelsefulla slag och händelser

## Anpassning

För att ändra frågorna, redigera `quizData` arrayen i `js/quiz.js`:

```javascript
const quizData = [
    {
        question: "Din fråga här?",
        options: ["Alternativ 1", "Alternativ 2", "Alternativ 3", "Alternativ 4"],
        correct: 0  // Index för rätt svar (0-3)
    },
    // Lägg till fler frågor här
];
```

## Teknologi

- HTML5
- CSS3 (med animerad regnbågsgradient)
- Vanilla JavaScript (inga externa bibliotek krävs)

## Kompatibilitet

Fungerar i alla moderna webbläsare:
- Chrome
- Firefox
- Safari
- Edge

## Licens

Detta projekt är skapat för utbildningsändamål.
