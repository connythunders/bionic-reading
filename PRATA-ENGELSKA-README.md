# Prata engelska – trygg talträning

Fil: `prata-engelska.html` (en fristående sida, ingen server behövs utöver GitHub Pages).

## Kom igång (lärare)
1. Skaffa en Gemini API-nyckel på https://aistudio.google.com/apikey
2. Öppna sidan, gå till **Inställningar → För läraren**, klistra in nyckeln och tryck **Testa**.
3. Tryck **Kopiera elevlänk** och dela länken med klassen. Nyckeln läggs då in i elevens webbläsare och tas bort ur adressfältet.
4. Eleverna använder **Chrome eller Edge** (Firefox saknar taligenkänning, Safari är begränsat).

Utan nyckel fungerar fliken **Läs högt** ändå, eftersom den inte använder AI.

## Viktigt innan ni använder det med elever
- **Begränsa nyckeln** i Google Cloud Console (HTTP-referrer `bionicreading.se/*`, lågt dagstak). Den som har elevlänken kan se nyckeln.
- **Personuppgifter:** webbläsaren skickar elevens tal till sin taligenkänningstjänst (Google i Chrome, Microsoft i Edge) och den transkriberade texten går till Google Gemini. Appen själv sparar inga ljud eller samtal. Kontrollera med skolans dataskyddsansvarige och använd gärna en betald nivå av Gemini API (de gratis nivåerna kan använda data för att förbättra tjänsten). Eleverna uppmanas att inte ange riktiga namn eller personuppgifter.
- **Alla framsteg sparas bara lokalt** i elevens webbläsare. Eleven kan själv kopiera en sammanfattning att visa dig.

## Hur återkopplingen fungerar (och dess gränser)
- **Samtal:** Gemini får texten som webbläsaren uppfattade, tillsammans med taligenkänningens säkerhet och ungefärlig talhastighet. Ord som ser konstiga ut i sammanhanget (t.ex. "sink" i stället för "think") tas som ledtråd om uttalet. AI:n kan inte höra ljudet och formulerar sig därefter ("det lät som…"). Max en rättning per tur, alltid med beröm först.
- **Läs högt:** de uppläsna orden matchas mot målmeningen. Gula ord = hördes inte tydligt. Tryck på ordet för att lyssna och få ett uttalstips för svenska talare (th, w/v, j, sh/ch, -ed, tysta bokstäver m.fl.).
- **Begränsning:** taligenkänning är *snäll* och gissar ofta vad man menade, så en grön markering betyder "begripligt", inte "perfekt uttal". Använd det som övning och trygghet, inte som betygsunderlag. Webbläsarens API ger inte ljud på fonemnivå.
- **Nivåanpassning:** Sam skattar efter varje svar om det var för lätt/svårt och justerar mellan A1–A2, B1 och B2. Eleven kan alltid välja själv med knapparna Lättare/Svårare.

## Trygghetsdesign (medvetna val)
Ingen tidspress, ingen poängjakt eller ranking, Sam börjar alltid samtalet, eleven ser och kan ändra texten innan den skickas, och det finns alltid svensk hjälp, långsam uppläsning och ett skriv-alternativ.
