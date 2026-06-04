# Metodbok EMI – API-proxy

Liten serverless-funktion som låter **Fråga metodboken** funka utan att varje
användare anger en egen API-nyckel. Nyckeln ligger som en miljövariabel på
servern (Vercel) – **aldrig i koden, aldrig hos användaren**.

`bionicreading.se` är en statisk GitHub Pages-sajt och kan inte köra kod själv,
därför hostas den här lilla proxyn separat på Vercel (precis som era
`np-engelska`-appar) och metodboken anropar den.

## Så här driftsätter du (engångs, ~5 min)

1. Gå till **vercel.com → Add New… → Project** och importera repot
   `connythunders/bionic-reading`.
2. Sätt **Root Directory** till `metodbok-api`.
   (Framework Preset: *Other*. Build/Output kan lämnas tomma.)
3. Under **Environment Variables**, lägg till:
   - Name: `ANTHROPIC_API_KEY`
   - Value: din nyckel från <https://console.anthropic.com/settings/keys>
4. Klicka **Deploy**. Du får en URL, t.ex. `https://metodbok-api.vercel.app`.
   Din endpoint blir då `https://metodbok-api.vercel.app/api/chat`.
5. Öppna `metodbok-emi.html` och sätt konstanten högst upp i AI-avsnittet:
   ```js
   const API_PROXY = "https://DIN-APP.vercel.app/api/chat";
   ```
   (Säg till Claude så fyller jag i den och pushar – det är konfiguration, inte
   en hemlighet.)

Klart. Nu kan vem som helst på `bionicreading.se` använda AI:n utan egen nyckel,
och nyckeln finns bara i Vercels miljövariabler.

## Säkerhet / kostnad

- **CORS** är låst till `bionicreading.se` så andra webbplatser inte kan anropa proxyn.
- **Rate limit** (best-effort, per IP) och **tak** på modell, max_tokens och antal
  meddelanden begränsar hur mycket en enskild användare kan dra.
- En låst CORS-origin stoppar andra sajters webbläsare men inte rena skript som
  förfalskar `Origin`. Vill du ha hårdare skydd kan vi lägga till en delad
  hemlighet eller flytta in metodbokens system-prompt på servern – säg till.
- Eftersom alla delar samma nyckel debiteras **din** Anthropic-faktura. Sätt en
  budget/spend-limit i Anthropic-konsolen.

## Lokalt test

```bash
cd metodbok-api
ANTHROPIC_API_KEY=sk-ant-... npx vercel dev
# POST http://localhost:3000/api/chat
```
