# Antaganden gjorda under byggandet

Det här dokumentet listar rimliga antaganden som gjordes när något var oklart eller inte specificerat, istället för att arbetet stannade upp. Se även `docs/faktakontroll.md` för en fullständig genomgång av vilka juridiska påståenden som är verifierade respektive fortfarande osäkra.

## Innehåll och omfattning

- **Ingen specifik kurs angavs** för ämneskopplingen (uppdraget nämnde "[KURS, t.ex. ARTART01, Gy25]" som en valfri parentes). Vi kopplade istället sidans sektioner till ämnesplanerna i stort för historia, geografi och svenska på gymnasiet (Gy25), inte en enskild namngiven kurs. Se `content`-sektion 8 ("Om sidan") och `research/pedagogik.md` avsnitt 5.
- **Ansvarig-fältet** i sektion 8 hölls medvetet generiskt ("Skapad som undervisningsmaterial för gymnasieundervisning...") istället för att hitta på ett namn eller en organisation, eftersom inget sådant angavs i uppdraget.
- **AI:s miljöavtryck** (sektion 4) beskrivs kvalitativt utan en specifik kWh- eller CO2-siffra per AI-fråga, eftersom sådana siffror varierar kraftigt mellan modeller/leverantörer och en enskild, ospecificerad siffra riskerade att bli missvisande eller icke-verifierbar.
- **Statistiken om elevers AI-användning** (över hälften osäkra på om AI-användning var okej, en tredjedel har tydliga skolregler) kommer från Ungdomsbarometern/Internetstiftelsen via `research/elevperspektiv.md`, men är inte primärkällekontrollerad i faktagranskningsfasen (se `docs/faktakontroll.md`, punkt 19) — fokus där låg på de EU-rättsliga påståendena. Siffrorna bedöms rimliga men bör dubbelkollas mot originalrapporterna om de ska citeras i ett annat sammanhang.

## Juridiska osäkerheter som medvetet lämnades öppna på sidan

- **Tolkningen av "säkerhetsskäl"-undantaget** för förbudet mot känsloigenkänning i skolmiljö (artikel 5.1 f) är genuint oklar — bekräftat även efter läsning av EUR-Lex primärtext och skälen (recitals). Sidan formulerar detta försiktigt ("den exakta gränsen är inte fullt klarlagd") istället för att gissa. Se sektion 2 på sidan och `docs/faktakontroll.md` punkt 9.
- **Regulatoriska sandlådors uppskjutna datum** (2 aug 2027) nämns bara i en sekundärkälla och togs medvetet INTE med på sidan eftersom det inte kunde verifieras och inte är direkt elevrelevant.
- **Svensk tillsynsmyndighet** (PTS föreslås, men inte slutgiltigt beslutat enligt SOU 2025:101) nämns bara i källförteckningen, inte som ett sakpåstående i löptexten, eftersom frågan fortfarande är under lagstiftningsbehandling.

## Tekniska antaganden

- **Ingen Node.js eller Python fanns tillgängligt** i byggmiljön (endast Windows Store-aliaset, som inte fungerar utan installation). Sidan behöver INGET av detta för att köras — den är ren statisk HTML/CSS/JS. `serve.ps1` i projektroten är enbart ett hjälpskript vi skrev för att kunna testköra sidan lokalt under byggfasen (en enkel PowerShell-baserad statisk filserver) — det är inte en del av den publicerade leveransen och kan tas bort eller ignoreras vid driftsättning.
- **Typsnitt:** systemfontstack användes genomgående (inga Google Fonts eller andra externa teckensnitt), i linje med kravet på inga externa beroenden.
- **`assets/tidslinje.svg` och `assets/riskpyramid.svg`** skapades som fristående filer men refereras inte längre direkt av `index.html` — samma diagram finns istället inbäddade direkt i sidan (inline SVG) för att kunna färgläggas dynamiskt via CSS-variabler i ljust/mörkt läge. De fristående filerna kan tas bort utan att sidan påverkas, eller sparas som referensmaterial.
