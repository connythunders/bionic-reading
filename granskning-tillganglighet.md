# Tillgänglighetsgranskning – AI-läromedel (Kapitel 1–5)
**Fokus:** NPF-tillgänglighet (dyslexi, ADHD, autism)  
**Granskade parametrar:** Meningslängd, styckeslängd, kognitiv belastning, visuella pauser, strukturtydlighet

---

## Övergripande bedömning

Läromedlet har ett ambitiöst innehåll och goda grundstrukturer (rubriker, punktlistor, faktarutor, sammanfattningar). Trots det finns återkommande tillgänglighetsproblem som belastar elever med dyslexi, ADHD eller autism oproportionerligt hårt. Problemen är ojämnt fördelade: Kapitel 3 (Programmering/Sökning) och Kapitel 4 (Inlärning) är avsevärt tyngre än Kapitel 2 och 5.

---

## Problem och förbättringsförslag per kategori

---

### 1. Meningslängd

#### Problem
Läromedlet innehåller genomgående mycket långa meningar – ofta 40–70 ord per mening. Elever med dyslexi eller arbetsminnessvårigheter tappar tråden innan meningen avslutas.

**Exempel på problemmeningar (direkt citerade):**

**K1, rad 87:**
> "I stället för att fastna i en enstaka definition av AI kan man beskriva tekniken i form av förmågor som den ofta uppvisar, exempelvis autonomi (att självständigt fatta beslut och agera mot mål utan direkt styrning av någon annan) och adaptivitet (att anpassa sitt beteende baserat på ny information)."

*Denna mening innehåller en huvudsats, en parentetisk förklaring, en bisats och ytterligare en parentetisk förklaring – allt i rad.*

**K1, rad 143:**
> "Det första steget i en AI-interaktion är att systemet uppfattar något om sin omvärld, till exempel bildpunkter i en kamera, text på internet eller data från sensorer. Utifrån indata skapar systemet en modell, en förenklad representation av verkligheten som det kan resonera utifrån."

*Bra att det är uppdelat på två meningar, men varje mening är ändå lång och innehåller flera begrepp.*

**K3, rad 554:**
> "Under träningen försöker modellen steg för steg att hitta mönster i pixlarna som brukar höra ihop med en viss märkning. När träningen är klar testar man modellen på bilder som inte använts vid träningen, där varje ny bild (input) producerar ett svar (output)."

**K4, rad 113:**
> "För mycket imputation kan därför skapa en falsk bild av variationen i datan."
*(Denna är bra – kort och tydlig. Se som förebild.)*

**K1, rad 341:**
> "Rekommendationssystem i exempelvis sociala medier och streamingtjänster kan styra innehållet i den information vi möter, hur länge vi stannar kvar och vilka åsikter eller intressen som förstärks över tid."

#### Förbättringsförslag
- **Riktlinje:** Sträva efter max 20–25 ord per mening i brödtext. Komplexa meningar bör delas upp.
- Parentetiska förklaringar bör lyftas ut som egna meningar eller footnotes/faktarutor i stället för att infogas mitt i en mening.
- Exempel på omskrivning (K1, rad 87):

  *Nuvarande:* "...exempelvis autonomi (att självständigt fatta beslut och agera mot mål utan direkt styrning av någon annan) och adaptivitet (att anpassa sitt beteende baserat på ny information)."

  *Föreslagen version:* "Två sådana förmågor är autonomi och adaptivitet. Autonomi betyder att systemet självständigt fattar beslut utan direkt styrning. Adaptivitet betyder att det anpassar sitt beteende efter ny information."

---

### 2. Styckeslängd och textblock

#### Problem
Flera avsnitt innehåller sammanhängande textblock utan visuell luft eller naturliga pauser. Långa stycken utan radbrytning är svåra för elever med dyslexi och ADHD.

**Allvarligaste exempel:**

**K1, rad 341–344** (avsnittet om AI och kritiskt tänkande): Tre till fyra meningar i rad utan mellanrubrik, trots att innehållet skiftar fokus från rekommendationssystem till inlärning.

**K1, rad 391–417** (om deepfakes, fake news och AI slop): Flera stycken på 4–6 meningar var utan understödjande visuella markeringar. Innehållet är abstrakt och etiskt komplext – just sådana avsnitt behöver mer luft.

**K3, rad 554–565** (datorseende – från bild till beslut): Fyra stycken i rad med teknisk förklaringstext, inga underrubriker som guidar läsaren.

**K4, rad 93–117** (vanliga problem med data): Tre problem (brus, saknade värden, bias) beskrivs i löptext med stycken. Innehållet är faktabaserat och räkningsbart – det borde presenteras som numrerade punkter.

**K2, rad 99–107** (algoritmisk partiskhet – proxydata): Tätt och abstrakt resonemang om indirekt diskriminering via postnummer. Inget av stycket har visuellt stöd.

#### Förbättringsförslag
- **Riktlinje:** Max 4–5 meningar per stycke. Vid byte av delämne: lägg till en mellanrubrik eller ett tomradsseparerat inledningsord i fetstil.
- Avsnittet "Vanliga problem med data" i K4 bör omformas till en numrerad lista (Brus / Saknade värden / Bias) med en kort förklaring under varje rubrik – strukturen finns delvis redan, men är inbäddad i löptext.
- I K1 avsnittet om deepfakes: dela upp löptexten med underrubrikerna "Vad är deepfakes?", "Vad är AI slop?" och "Konsekvenser" som egna visuella block.

---

### 3. Kognitiv belastning

#### Problem
Läromedlet introducerar ibland flera nya begrepp i samma mening eller stycke, utan att befästa varje begrepp innan nästa introduceras. Detta är särskilt problematiskt för elever med autism (som behöver tydlig och förutsägbar sekvens) och ADHD (som tappar fokus vid informationstäthet).

**Konkreta exempel:**

**K1, rad 87:** Autonomi och adaptivitet introduceras med förklaringar i parentes i samma mening – två nya begrepp på en gång, inbyggda i löptexten.

**K3, rad 509:** "En problemdomän kan beskrivas matematiskt på två olika sätt: med träd och grafer." – Båda begreppen introduceras direkt, och sedan följer omedelbart djupgående tekniska förklaringar av båda.

**K4, rad 121–125** (AI-pipelinen): Fem steg presenteras i en enda inledande mening, följt av att varje steg förklaras i löptext. En tydlig numrerad processlista saknas vid introduktionen.

**K3, rad 643–655** (A*-algoritmen): Formlerna f(n) = g(n) + h(n) introduceras med förklaringar av g(n) och h(n) i punktform, vilket är bra. Men det föregående exemplet med skola och korridorer (rad 659–691) är väldigt detaljrikt och byggs på snabbt. Elever med kognitiva svårigheter kan behöva fler stopp längs vägen.

**K2, rad 99–107** (proxydata): Begreppen "proxyvariabel" och "proxydata" introduceras och förklaras i ett tätt stycke. Faktarutan som följer (rad 111–115) är bra – men den borde komma *innan* löpförklaringen, inte efter.

#### Förbättringsförslag
- **Riktlinje:** Introducera ett begrepp i taget. Låt det "landa" med ett kort exempel innan nästa begrepp introduceras.
- Flytta faktarutor och begreppsförklaringar så att de placeras *före* den löptext som förutsätter att läsaren känner till begreppet.
- I K4 (AI-pipelinen): lägg till en visuell numrerad lista av stegen (Steg 0–5) som en inledande översikt *innan* fördjupningen börjar. Helst i en ruta eller med tydlig typografisk markering.
- I K3 (träd och grafer): bekräfta skillnaden mellan träd och grafer i en faktaruta med en rad vardera *innan* det tekniska djupet.

---

### 4. Visuella pauser och orienterbarhet

#### Problem
Läromedlet har god rubrikhierarki men saknar tillräckliga visuella ankar och orienteringsmarkeringar inom långa avsnitt. För elever med ADHD är det svårt att hålla koll på var i texten man befinner sig utan sådana stöd.

**Exempel:**

**K3, avsnitt 3.3 (Sökning):** Avsnittet är det längsta i hela materialet. Det innehåller BFS, DFS, heuristisk sökning, girig sökning, A* och Minimax i sekvens. Det saknas en initial "innehållsförteckning" för avsnittet eller visuella avdragare mellan de olika sökmetoderna.

**K1, avsnitt 1.2 (Drivkrafterna):** Fyra drivkrafter (data, datorkraft, algoritmer, ekonomi) presenteras med egna rubriker – det är bra. Men de inleds alla med en tung mening i stället för en sammanfattande nyckelfrening i fetstil.

**K4, avsnitt 4.2 (Regression, klassificering):** Matematiska formler (y = kx + m) presenteras med rad-för-rad-radbrytning i brödtexten (rad 333–343), vilket skapar ett visuellt kaosigt intryck som är förvirrande.

**K2, rad 63–71** (UNESCO och EU): Två organisationer presenteras i löptext med ett stycke var. Strukturen är tydlig men inte tillräckligt visuellt markerad – en jämförelsetabell (som finns i K1 för chattbot vs. sökmotor) skulle fungera bättre här.

#### Förbättringsförslag
- **K3, avsnitt 3.3:** Lägg till en inledande punktlista med de sökmetoder som avsnittet täcker, t.ex. "I detta avsnitt går vi igenom: BFS, DFS, Heuristisk sökning, Girig sökning, A*, Minimax." Lägg dessutom in tydliga visuella avdragare (linje, bakgrundsfärg eller ikonmarkering) mellan varje sökmetod.
- Använd en inledande fet nyckelening i varje rubriksection: en mening som ger kärnan av vad som gäller, *innan* fördjupningstexten börjar.
- Matematiska formler bör placeras i separat formaterade formelsektioner, inte inbäddade i löptext med radbrytning per term.
- UNESCO vs. EU i K2: omforma till en jämförelsetabell med raderna "Organisation", "Roll", "Mandat" och "Bindande?".

---

### 5. Instruktionsklarhet och uppgiftsformat

#### Problem
Instuderingsfrågorna i slutet av varje avsnitt är välformade och använder varierade kognitionsnivåer (från "beskriv" till "förklara varför"). Det är en styrka. Dock saknar de numrering som syns tydligt i layouten (i textfilerna visas de som "1." etc., men utan visuell separation). Frågorna i K3 avsnitt 3.3 är 8 stycken och täcker komplex algoritmisk logik – det är många frågor på svårt material, och de saknar en angivelse om svårighetsnivå.

Projektbeskrivningarna i K5 är välstrukturerade med Syfte / Mål / Arbetssätt / Redovisning. Det är bra för elever med autism som behöver förutsägbarhet. Däremot saknar projekt 1 och 3 en explicit tidsuppskattning eller omfångsbegränsning, vilket kan skapa ångest hos elever som behöver veta vad som förväntas.

**K3, rad 241–255** (promptexempel för Colab): Förklaringen av vad man ska göra med Gemini-prompten är lång och informationstät. Den riktar sig troligen till nybörjare men förutsätter mycket.

#### Förbättringsförslag
- Instuderingsfrågor: lägg till en svårighetsnivå (exv. en asterisk * för fördjupningsfrågor) och dela upp frågorna visuellt i grundläggande och fördjupande del.
- Projektbeskrivningar K5: lägg till ett kort stycke "Omfång och tid" per projekt, t.ex. "Rapporten bör vara ca 500–800 ord" eller "Projektet är planerat att ta 3–4 lektioner."
- Promptexempel i K3: bryt ut det i en faktaruta med numrerade steg (1. Öppna Colab, 2. Skriv denna prompt, 3. Kör koden) i stället för sammanhängande text.

---

### 6. Analogier och konkretiseringar

#### Styrkor att behålla
Läromedlet använder flera mycket effektiva analogier som hjälper elever med konkret tänkande (vanligt vid NPF):
- Tårtkaka-analogin för maskininlärning vs. klassisk algoritm (K1/K4) – utmärkt.
- Armhävningsliknelsen för kognitiv avlastning (K1, rad 431–433) – engagerande och minnesvärdig.
- Matsalssökning som illustration för BFS och DFS (K3) – intuitivt och bra.
- Fågelvägen/Manhattan-avstånd i A*-exemplet (K3) – visuellt tydligt.

#### Problem
Trots goda analogier finns avsnitt som saknar dem helt och är abstrakta rakt igenom:

**K2, rad 99–107** (proxydata via postnummer): Exemplet med postnummer och etnicitet är faktiskt en bra analogi – men det döljs i ett tätt stycke i stället för att lyftas fram som ett tydligt illustrationsexempel.

**K4, rad 155–173** (val av modell i AI-pipelinen): Listan med modelltyper (regression, klassificering, klustring etc.) ges utan vardagsanknuten förklaring av *när* man väljer vad. En enkel beslutsfråga ("Vill du förutsäga ett tal? → Regression. Vill du sortera i grupper? → Klassificering.") skulle avsevärt sänka tröskeln.

#### Förbättringsförslag
- Lyfta fram postnummerexemplet i K2 i en tydlig faktaruta eller "Exempel"-block med rubriken "Proxydata i praktiken".
- Lägg till ett beslutsträd-liknande schema i K4 för val av modelltyp: en enkel fråga-svar-kedja som hjälper eleven välja rätt utan att behöva läsa all löptext.

---

### 7. Konsistens i terminologi

#### Problem
Vissa begrepp används omväxlande med svenska och engelska beteckningar utan tydlig signal om vilket som är "huvudordet":
- "Feature" / "egenskap" (K4)
- "Label" / "etikett" (K4)
- "Bias" / "partiskhet" / "snedvridning" (K1, K2, K4) – används med tre olika svenska ord utan att det klargörs att det är samma sak
- "Input" / "indata" / "inmatning" – tre varianter

För elever med dyslexi är det extra ansträngande att möta samma begrepp i flera skepnader och behöva förstå att de är synonyma.

#### Förbättringsförslag
- Välj ett primärt ord per begrepp och håll dig till det konsekvent i brödtexten. Det engelska alternativet kan finnas med i parentes vid första introduktionen, men sedan bör det primära svenska ordet användas.
- Lägg till en konsekvent begreppsformatering: förslagsvis kursivering vid första introduktion, fetstil i faktarutor.

---

## Prioriteringslista – mest akuta åtgärder

| Prioritet | Åtgärd | Berört kapitel |
|-----------|--------|----------------|
| 1 | Dela upp meningar längre än 30 ord | K1, K3, K4 |
| 2 | Lägg till visuella avdragare mellan sökmetoder i avsnitt 3.3 | K3 |
| 3 | Flytta faktarutor till *före* löptext som förutsätter begreppet | K2, K4 |
| 4 | Omforma "Vanliga problem med data" till numrerad lista | K4 |
| 5 | Lägg till inledande strukturöversikt för AI-pipelinen (Steg 0–5) | K4 |
| 6 | Standardisera terminologi (bias/partiskhet/snedvridning) | K1, K2, K4 |
| 7 | Lägg till omfångsbeskrivning i projektuppgifter | K5 |
| 8 | Omforma UNESCO/EU-stycket till jämförelsetabell | K2 |

---

## Vad fungerar bra – behåll och förstärk

- Sammanfattningsrutor i slutet av varje avsnitt: tydliga, välskrivna och konsekventa. Dessa är mycket värdefulla för elever som behöver repetition.
- Faktarutor ("FAKTA", "TIPS", "VISSTE DU?") med tydliga etiketter: hjälper elever att snabbt hitta centralt innehåll.
- Numrerade instuderingsfrågor med varierade kognitionsnivåer.
- Projektstrukturen i K5 med Syfte / Mål / Arbetssätt / Redovisning.
- Jämförelsetabellen chattbot vs. sökmotor (K1) – förebild för andra liknande avsnitt.
- Analogier som tårtkaka, armhävningar och matsalssökning.
- Punktlistor används redan på många ställen – principen är rätt, tillämpningen kan utökas.

---

*Granskning genomförd 2026-06-08. Inga faktaändringar har föreslagits – enbart strukturella och textuella anpassningar för ökad NPF-tillgänglighet.*
