---
description: Skapa quizfrågor om ett ämne, i projektets JSON-format
argument-hint: <ämne> [antal frågor] [åk 7-9 | gymnasiet]
allowed-tools: Read, Write, Edit, Glob, Grep, Agent
---

Skapa quiz om: **$ARGUMENTS**

Standard är 15 frågor för åk 7–9 om inget annat anges. Använd subagenten `quiz-designer` för frågekonstruktionen.

## Fördelning

Blanda frågetyper — ett quiz där alla frågor testar årtal är ett dåligt quiz:
- ca 40 % kunskapsfrågor (vad, när, vem)
- ca 40 % förståelse- och tillämpningsfrågor (varför, hur hänger X ihop med Y, ge ett exempel)
- ca 20 % analys- och jämförelsefrågor (skillnaden mellan, jämför)

Blanda även svårighetsgrad: ungefär en tredjedel lätta, en tredjedel medel, en tredjedel svåra.

## Kvalitetskrav på flervalsfrågor

- Alla fyra alternativ ska vara rimliga. Skämtsvar och uppenbart orimliga alternativ gör frågan gratis.
- Distraktorer ska bygga på vanliga elevmissuppfattningar — det är där lärvärdet finns.
- Ingen fråga får avslöjas av ett annat alternativs formulering (längd, detaljnivå, grammatik).
- Varje fråga får en förklaring som lär ut något, inte bara "Rätt!".
- Om ämnet är religion: skriv om hur troende själva ser på saken, undvik "alla muslimer/kristna/judar…".

## Format

Skriv i det format som passar målfilen. För fristående datafiler, följ mönstret i `so-quiz-data.json`:

```json
{
  "id": "unikt-id",
  "theme": "tema",
  "question": "Frågan?",
  "options": ["A", "B", "C", "D"],
  "correct": 1,
  "explanation": "Varför svaret är rätt – och vad eleven ska ta med sig."
}
```

För quiz som bakas in i ett HTML-verktyg, följ den array-struktur som redan finns i filen.

## Efter genereringen

Gå igenom dina egna frågor en gång till och kontrollera: är faktan korrekt, är exakt ett alternativ rätt, och är språket begripligt för målgruppen? Rapportera om du ändrade något i den granskningen.
