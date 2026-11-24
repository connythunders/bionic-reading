# Uppgiftsformat – NP Matematik nivå 2a/2b/2c

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
| `kurser` | array | Vilka nivåer uppgiften passar: delmängd av `["2a","2b","2c"]` |
| `del` | `"A"`/`"B"`/`"C"` | A = utan räknare, B = digitala verktyg (grafräknare/GeoGebra/kalkylblad), C = enkel räknare |
| `omrade` | string | Ett av: `"Taluppfattning, aritmetik och algebra"`, `"Funktioner"`, `"Geometri"`, `"Statistik och sannolikhet"`, `"Problemlösning"` |
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

- Svenska, NP-ton, korrekt matematisk notation (decimalkomma i text: `3{,}5` i KaTeX eller `3,5` i text).
- Del A-uppgifter måste gå att lösa utan räknare (snälla tal).
- Del B-uppgifter ska kräva/gynnas av digitala verktyg (grafisk lösning, regression, kalkylblad, normalfördelningsberäkning). Skriv i lösningen hur man gör i GeoGebra (t.ex. `Lös(...)`, `Regression...`, `Normal(μ, σ, x)`).
- Del C: längre, sammansatta uppgifter, modellering och problemlösning med enkel räknare (fyra räknesätt, kvadratrot, ev. potens – ingen grafritning).
- Blanda nivåer: ungefär 45 % E, 35 % C, 20 % A.
- Varje svar måste vara matematiskt kontrollerat. Räkna om allt.
