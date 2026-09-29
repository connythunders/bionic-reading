# Skrivcoach – serverdel för Skrivstöd

Den här serverfunktionen används av coachen på `skrivstod.html`. Coachen ställer frågor och ger tips till eleven, men skriver aldrig texten åt eleven. API-nyckeln ligger bara i Vercel och syns aldrig för eleven.

## Driftsätta i Vercel (en gång)

1. Gå till [vercel.com/new](https://vercel.com/new) och välj repot `bionic-reading`.
2. Sätt **Root Directory** till `skrivcoach`. Framework Preset: **Other**.
3. Under **Environment Variables** lägger du till:
   - `ANTHROPIC_API_KEY` = din nyckel från [console.anthropic.com](https://console.anthropic.com)
4. Klicka **Deploy**.
5. Kopiera adressen som Vercel ger projektet, till exempel `https://skrivcoach.vercel.app`. Lägg in den i `skrivstod.html` i konstanten `COACH_URL` (`https://…/api/coach`).

## Inställningar (valfria miljövariabler)

| Variabel | Standard | Vad den gör |
|---|---|---|
| `ANTHROPIC_WORKSPACE_ID` | – | Behövs om nyckeln inte är knuten till en workspace. Id:t börjar med `wrkspc_` och finns i Anthropic Console under Settings → Workspaces. |
| `DAILY_LIMIT` | `80` | Max antal coachfrågor per IP-adress och dygn. |
| `ALLOWED_ORIGINS` | `https://bionicreading.se,https://www.bionicreading.se` | Sidor som får använda coachen. |

Gränsen per dygn räknas i funktionens minne och nollställs när Vercel startar om funktionen. Den är ett skydd mot misstag, inte en exakt kvot. Sätt gärna en månadsgräns för kostnaden i Anthropic Console.

## Modell

Claude Opus 5.5 med låg effort. Om en fråga stoppas av säkerhetsfiltret skickas den automatiskt vidare till en reservmodell (`fallbacks: "default"`).

## Mattestöd

`api/matte.js` är serverdelen till `mattestod.html`. Den ligger i samma Vercel-projekt, så den driftsätts automatiskt med resten och använder samma nyckel och miljövariabler. Efter en ny driftsättning finns den på `https://…/api/matte`.

- Läge `las`: läser en bild eller text med en mattuppgift, skriver av den och delar upp den i "Det här vet vi" och "Det här ska vi ta reda på". Den löser aldrig uppgiften.
- Läge `coach`: sokratiskt samtal. Modellen räknar ut facit privat för att kunna bedöma elevens svar, men facit skickas aldrig till eleven.

Fotot förminskas i webbläsaren, skickas till Anthropic för avläsning och sparas inte.
