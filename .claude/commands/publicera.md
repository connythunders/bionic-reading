---
description: Testa, committa och pusha ändringarna till GitHub Pages
argument-hint: [kort beskrivning av vad som ändrats]
allowed-tools: Read, Grep, Glob, Bash(git status:*), Bash(git diff:*), Bash(git add:*), Bash(git commit:*), Bash(git push:*), Bash(git log:*), Bash(git branch:*), Bash(python3 -m http.server:*)
---

Publicera ändringarna. Kontext: **$ARGUMENTS**

Sajten ligger på GitHub Pages (`bionicreading.se`) och går live direkt vid push — så kontrollera före, inte efter.

## 1. Kontrollera

- `git status` och `git diff` — gå igenom vad som faktiskt ändrats. Beskriv det för mig innan du committar.
- Har någon `.html`-fil ändrats: starta `python3 -m http.server 8080` och öppna den. Verifiera att sidan laddar utan konsolfel och att det ändrade flödet fungerar.
- Leta efter API-nycklar, personuppgifter om elever eller andra hemligheter i diffen. Hittar du något — stanna och säg till, committa inte.
- Ligger stora filer i diffen som inte hör hemma i repot (temporära filer, exporter, testdata)? Fråga innan de följer med.

## 2. Committa

- Committa bara det som hör till den här ändringen. Använd `git add <fil>`, aldrig `git add -A` utan att ha gått igenom listan.
- Commit-meddelande på svenska, en rad som säger vad ändringen gör: `Lägg till buddhism-quiz med 20 frågor`, inte `uppdatering`.
- Rör inte de automatiska nyhetsuppdateringarna (`Auto: Partierna-nyheter`, `Auto: Arsenal-nyheter`) — de sköts av GitHub Actions.

## 3. Pusha

- Kontrollera vilken branch du står på först. Pusha aldrig till en annan branch än den vi arbetar på utan att fråga.
- `git push -u origin <branch>`. Vid nätverksfel: försök igen upp till 4 gånger med ökande väntetid.
- Aldrig `--force` utan att jag uttryckligen bett om det.

## 4. Rapportera

Säg vad som committades, till vilken branch, och vad jag ska titta på när sidan gått live. Skapa ingen pull request om jag inte bett om det.
