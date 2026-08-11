---
description: Kör ett verktyg lokalt i webbläsaren och kontrollera att det fungerar
argument-hint: <fil.html>
allowed-tools: Read, Edit, Grep, Glob, Bash
---

Testa verktyget: **$ARGUMENTS**

Antag inte att koden fungerar för att den ser rätt ut — kör den.

## 1. Starta

Kör `python3 -m http.server 8080` i projektroten (i bakgrunden) och öppna `http://localhost:8080/$ARGUMENTS`.

Använd Playwright med Chromium för att faktiskt klicka runt. Finns inte Playwright installerat, säg det och beskriv istället vad jag ska testa manuellt — installera inte tunga beroenden utan att fråga.

## 2. Kontrollera

- **Konsolen** — samla alla fel och varningar. JS-fel som kastas tyst är det vanligaste problemet i de här filerna.
- **Nätverk** — 404:or på filer, bilder eller data-JSON.
- **Huvudflödet** — gå igenom verktygets faktiska användning från start till slut som en elev skulle göra. Quiz: svara på frågor hela vägen till resultatsidan. Generator: fyll i och generera.
- **Mobil** — sätt viewport till 390×844 och kontrollera att inget spiller över kanten eller blir oklickbart.
- **localStorage** — ladda om sidan och se att sparat tillstånd återställs som det ska.
- **Mörkt läge** — om verktyget stödjer det, kontrollera att texten går att läsa i båda lägena.

Om verktyget anropar ett API: testa vad som händer utan nyckel och med felaktig nyckel. Användaren ska få ett begripligt felmeddelande, inte en tyst sida som hänger.

## 3. Rapportera

- Ta skärmdumpar (desktop + mobil) och visa dem.
- Lista fynden ärligt: vad som fungerade, vad som inte gjorde det, exakt felmeddelande och var i koden det kommer ifrån.
- Fixa uppenbara buggar direkt och testa om. Är felet större eller en designfråga — beskriv det och fråga innan du bygger om.

Glöm inte att stoppa webbservern när du är klar.
