---
description: Granska ett läromedel för tillgänglighet (NPF), språk och pedagogik
argument-hint: <fil.html eller .md> [tillganglighet|sprak|pedagogik|fakta]
allowed-tools: Read, Grep, Glob, WebSearch, WebFetch, Bash(ls:*), Bash(wc:*)
---

Granska: **$ARGUMENTS**

Om ingen inriktning anges — granska alla fyra nedan. Om en inriktning anges, gör bara den, men gör den grundligt.

Läs `granskning-tillganglighet.md` och `granskning-sprak.md` i projektroten först. De visar nivån och formatet som gäller här: konkreta citat ur materialet, radnummer, och ett konkret förslag på omskrivning för varje problem. Generella råd utan citat är värdelösa.

## 1. Tillgänglighet (NPF: dyslexi, ADHD, autism)

- **Meningslängd** — flagga meningar över ~25 ord. Citera dem och skriv om dem uppdelat.
- **Styckeslängd** — flagga stycken utan visuell paus.
- **Kognitiv belastning** — flera nya begrepp i samma stycke, inskjutna parenteser, bisatskedjor.
- **Struktur** — går det att skumma via rubriker? Finns sammanfattning? Är ordningen förutsägbar?
- **Teknisk tillgänglighet** (för HTML): kontrast, fokusmarkering, klickytor, semantiska element, tangentbordsnavigering, `alt`-texter.

## 2. Språk

- Nivå för åk 7–9 respektive gymnasiet — vilket är materialet skrivet för, och träffar det rätt?
- Begrepp som används innan de förklaras.
- Onödigt formellt eller akademiskt språk där ett vardagligt ord räcker.
- Konsekvent terminologi genom hela materialet.

## 3. Pedagogik

- Finns ingång som väcker intresse, konkreta exempel, reflektionsfrågor, sammanfattning?
- Testas förståelse eller bara faktaminne?
- Progression: bygger avsnitten på varandra?
- Anknyter innehållet till elevernas verklighet?

## 4. Fakta

- Kontrollera påståenden om årtal, personer, siffror och religiösa/historiska förhållanden. Sök upp det du är osäker på — gissa inte.
- Var särskilt noga med framställningen av religioner: respektfull, saklig, och den beskriver hur troende själva ser på saken snarare än en utifrånblick som dömer.
- Flagga generaliseringar av typen "muslimer tycker att…" — religioner är inte enhetliga.

## Utdata

Skriv en rapport med:
- **Övergripande bedömning** — 3–5 meningar, ärligt. Är materialet bra eller inte?
- **Problem per kategori** — varje problem med citat, plats i filen, och konkret förslag på ny formulering.
- **Prioriterad åtgärdslista** — vad som ger störst effekt först.

Fråga om jag vill att du sparar rapporten som `granskning-<verktyg>.md`. Ändra inte i det granskade materialet utan att jag sagt till.
