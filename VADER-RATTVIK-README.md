# Väderprognos – Stiernhööksgymnasiet, Rättvik

En enda fil: **`vader-rattvik.html`**. Ren vanilla HTML/CSS/JS, inga externa
beroenden utöver de två väder-API:erna (SMHI + Open-Meteo). Inga CDN:er, inga
npm-paket, inga externa bilder/ikoner (väderikoner är inline-SVG).

## Öppna / hosta
- **Lokalt:** dubbelklicka på `vader-rattvik.html` – den fungerar direkt i webbläsaren.
- **Teams:** ladda upp filen i en kanal, eller länka till den.
- **Webbserver / GitHub Pages:** lägg filen var som helst och öppna den. Inget byggsteg.

> Obs: filen heter `vader-rattvik.html` (inte `index.html`) eftersom repots
> `index.html` redan är startsidan för bionicreading.se. Kravet "en enda fil utan
> externa beroenden" är ändå uppfyllt.

## Funktioner
- **Vyer:** Nu · 1 dygn (timme för timme) · 3 dygn · 5 dygn · Lantbruk · Modelljämförelse.
- **Två källor sammanvägs:** SMHI (`snow1g` v1) och Open-Meteo. Numeriska värden
  medelvärdesbildas där båda finns.
- **Auto-uppdatering** varje timme, vid manuell knapp och när fliken får fokus igen.
  "Senast uppdaterad: HH:MM" visas alltid.
- **Robusta felstater:** faller en källa bort körs den andra vidare med diskret notis;
  faller båda visas senast sparade data (localStorage) med tydlig markering.
- **Lantbruk:** marktemperatur, markfukt, evapotranspiration (ET₀ – bevattningsbehov),
  UV-index, nederbördssannolikhet och **frostvarning** (luft ≤ 0 °C = Frost, ≤ 3 °C =
  Frostrisk; marktemp ≤ 0 °C förstärker till Frost).
- **Modelljämförelse:** SMHI vs Open-Meteo sida vid sida med samstämmighetsmarkering
  (liten skillnad = låg osäkerhet).
- **Tid & enheter:** allt i svensk lokaltid (SMHI levererar UTC och konverteras till
  `Europe/Stockholm`), Celsius, m/s, mm, 24-timmarsklocka, svenska datum.
- **Tillgänglighet (WCAG AA):** semantisk HTML, hög kontrast, `aria-label` på ikoner/
  knappar, full tangentbordsnavigering i flikarna (piltangenter/Home/End), synliga
  fokusmarkeringar, `prefers-reduced-motion`.

## Teknisk verifiering (gjord mot live-API mars-2026-versionen)
- SMHI `snow1g/version/1` svarar **HTTP 200** med `access-control-allow-origin: *`
  → **CORS tillåts** från webbläsaren. Fallback till enbart Open-Meteo finns ändå
  inbyggd om SMHI skulle falla.
- SMHI `data`-objektet är platt med läsbara namn; `symbol_code` är ett **heltal**
  (Wsymb2 1–27) – bekräftat, ej gissat.
- Open-Meteo anropas med `wind_speed_unit=ms` så vinden levereras direkt i m/s, och
  `timezone=Europe/Stockholm` ger lokala tider.

### QA-testkrok
Lägg `?test=1` i URL:en för att tvinga uppdatering var 10:e sekund (för att verifiera
auto-uppdateringen utan att vänta en timme).

## Attribution
Väderdata från **SMHI Open Data** och **Open-Meteo**, licens **CC BY 4.0**. Visas i sidfoten.
