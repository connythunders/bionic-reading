# Uppgiftsformat – NP Matematik Matematik – fortsättning nivå 1b/1c (Ma3b/Ma3c)

Varje datafil är en vanlig JS-fil (fungerar även via file://) som lägger till uppgifter:

```js
window.NP_UPPGIFTER = window.NP_UPPGIFTER || [];
window.NP_UPPGIFTER.push(
  { ... },
  { ... }
);
```

## Fält

| Fält | Typ | Beskrivning |
|---|---|---|
| `id` | string | Unikt, prefix per fil, t.ex. `"alg-001"`, `"fun-014"`, `"geo-007"`, `"sta-022"` |
| `kurser` | array | Vilka nivåer uppgiften passar: delmängd av `["3b","3c"]` (3b = fortsättning nivå 1b, 3c = fortsättning nivå 1c) |
| `del` | `"A"`/`"B"`/`"C"` | A = utan räknare, B = digitala verktyg (grafritande och symbolhanterande, t.ex. GeoGebra CAS), C = enkel räknare |
| `omrade` | string | Ett av: `"Algebra och polynom"`, `"Derivata"`, `"Integraler"`, `"Trigonometri"`, `"Linjär optimering och geometriska summor"`, `"Problemlösning"` |
| `moment` | string | Kort underrubrik, t.ex. `"Andragradsekvationer"`, `"Logaritmer"`, `"Normalfördelning"` |
| `niva` | `"E"`/`"C"`/`"A"` | Svårighetsnivå (den högsta nivå uppgiften ger poäng på) |
| `poang` | string | NP-stil, t.ex. `"1/0/0"`, `"2/1/0"`, `"0/1/2"` (E/C/A-poäng) |
| `typ` | string | `"tal"`, `"flera"`, `"val"`, `"text"` eller `"redovisning"` (se nedan) |
| `fraga` | string (HTML) | Uppgiftstext. Matematik i KaTeX: `\\(...\\)` inline och `\\[...\\]` display. Glöm inte dubbla backslash i JS-strängar! |
| `figur` | string (valfri) | Inline-SVG (viewBox, inga fasta färger – använd `currentColor` och `fill="none"`) för figurer |
| `svar` | object | Beror på `typ`, se nedan |
| `ledtradar` | array av string | 1–3 stegvisa ledtrådar (HTML/KaTeX), utan att avslöja svaret direkt |
| `losning` | string (HTML) | Fullständig, stegvis lösning som en lärare skulle skriva. Använd `<ol>`/`<p>` |
| `bedomning` | array av string (valfri, krävs för `redovisning`) | Bedömningsanvisning i NP-stil: `"+E<sub>P</sub> för korrekt uppställd ekvation"` osv. Kompetenser: B (begrepp), P (procedur), PL (problemlösning), M (modellering), R (resonemang), K (kommunikation) |

## Svarstyper

- `"tal"`: ett numeriskt svar. `svar: { varde: 3.5, tolerans: 0.01, enhet: "cm" }`. Eleven skriver tal (komma eller punkt). `enhet` visas bredvid inmatningen (valfri). För exakta svar utan räknare, tolerans 0 eller mycket liten. Bråk som `3/4` accepteras automatiskt av appen.
- `"flera"`: flera numeriska svar, ordningen spelar ingen roll (t.ex. rötter). `svar: { varden: [-2, 3], tolerans: 0.01 }`. Eleven skriver separerat med semikolon eller "och".
- `"val"`: flerval. `svar: { alternativ: ["\\(x=2\\)", "..."], ratt: 0 }` (index, 0-baserat). 3–5 alternativ, rimliga distraktorer baserade på vanliga fel.
- `"text"`: kort uttryck/ord. `svar: { godkanda: ["2x+3", "3+2x"] }` – appen jämför efter att ha tagit bort mellanslag, gjort gemener och ersatt `*`→ ``, `·`→ ``, `,`→`.`. Använd sparsamt; lista alla rimliga skrivsätt.
- `"redovisning"`: öppen uppgift med självbedömning. `svar: { facit: "kort slutsvar i HTML/KaTeX" }` + obligatorisk `bedomning`. Eleven skriver/räknar på papper, jämför sedan med lösning och kryssar själv i vilka bedömningspunkter hen klarade.

## Krav på innehållet

- Svenska, NP-ton, korrekt notation (decimalkomma i text, `3{,}5` i KaTeX). Inuti KaTeX: använd `\\lt` och `\\gt` i stället för `<` och `>`.
- Provformat (Skolverket, tors 10 dec 2026): Del A 80 min, kortsvar utan digitala verktyg (typ tal/flera/val/text – ingen redovisning). Del B 40 min, digitala verktyg inkl. grafritande och symbolhanterande (GeoGebra, CAS) – svar i elevhäftet, blandat kortsvar och redovisning; skriv GeoGebra-kommandon i lösningen (`Derivata()`, `Integral()`, `Lös()`, `Extrempunkt()`, `Nollställe()`, `Skärning()`). Del C 120 min, enkel räknare (ingen grafritning, ingen ekvationslösning, ingen derivata) – fullständiga lösningar, mest redovisning.
- Del A: snälla tal, exakta svar (t.ex. ln 2, e^3, π/3 som decimaltal med liten tolerans eller som `val`/`text`).
- För typ `text` listar du flera godkända skrivsätt; appen kontrollerar dessutom algebraisk likvärdighet numeriskt (variabler med en bokstav, `^`, `sqrt`; e skrivs `e^x` – appen tolkar en ensam bokstav som variabel, så undvik `text` för svar som innehåller e eller ln, använd `val` eller `tal` i stället).
- Blanda nivåer: ungefär 45 % E, 35 % C, 20 % A.
- Varje svar måste vara matematiskt kontrollerat. Räkna om allt.
