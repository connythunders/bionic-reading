---
description: Skapa ett nytt fristående HTML-verktyg enligt projektets konventioner
argument-hint: <namn och kort beskrivning av verktyget>
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(python3 -m http.server:*), Bash(ls:*), Bash(git status:*)
---

Skapa ett nytt verktyg: **$ARGUMENTS**

## Innan du börjar

Om beskrivningen är för vag för att veta vad verktyget ska göra (målgrupp, vilket ämne, vilka funktioner) — ställ frågor först. Annars: bygg.

Titta på 1–2 befintliga verktyg i samma genre som förebild innan du skriver kod. Använd `Glob` på `*.html` i projektroten och läs det som liknar mest.

## Konventioner i det här projektet

**Filstruktur**
- En enda fristående `.html`-fil i projektroten. Kebab-case-namn på svenska, t.ex. `religion-prov.html`.
- All CSS i `<style>` och all JS i `<script>` inne i filen. Ingen byggkedja, inga npm-paket, inga ramverk.
- Inga CDN-beroenden. Verktyget ska fungera när man dubbelklickar på filen utan internet (undantag: verktyg som anropar ett API).
- Data som är för stor för filen läggs i en `.json` bredvid (se `so-quiz-data.json`, `arsenal-data.json`) eller i `js/`.

**HTML/UI**
- `<html lang="sv">`, `<meta name="viewport" content="width=device-width, initial-scale=1.0">`, svensk text i hela gränssnittet.
- Mobilanpassat först — verktygen används på elevernas telefoner och på klassrumsskärm.
- CSS-variabler i `:root` för färger, `prefers-color-scheme`-stöd om verktyget har längre lästexter.
- Spara elevens tillstånd i `localStorage` med ett unikt prefix per verktyg så inget krockar.

**Tillgänglighet (viktigt — målgruppen inkluderar elever med dyslexi, ADHD och autism)**
- Korta meningar, korta stycken, tydliga rubriker. Inget textblock utan visuell paus.
- Tillräcklig kontrast, klickytor ≥ 44px, fokusmarkering som syns.
- Semantisk HTML (`<button>` för knappar, inte `<div onclick>`), `aria-label` där ikoner står ensamma.
- Fungerar med tangentbord.

**Om verktyget använder AI**
- Anropa `https://api.anthropic.com/v1/messages` direkt från webbläsaren med användarens egen nyckel.
- Headers: `x-api-key`, `anthropic-version: 2023-06-01`, `anthropic-dangerous-direct-browser-access: true`.
- Nyckeln matas in av användaren och sparas i `localStorage` under ett verktygsunikt namn (`<verktyg>_api_key`). Hårdkoda aldrig en nyckel.
- Hantera fel synligt för användaren: nätverksfel, ogiltig nyckel, tomt svar.

## Efter att filen är skriven

1. Starta `python3 -m http.server 8080` och öppna verktyget för att verifiera att det faktiskt fungerar — inga konsolfel, inga trasiga flöden. Rapportera vad du testade.
2. Lägg till ett kort på `start.html` enligt mönstret där (se `/startsidan` för formatet).
3. Sammanfatta för mig: vad verktyget gör, vad du testade, vad som återstår.

Committa inte automatiskt — jag kör `/publicera` när jag sett resultatet.
