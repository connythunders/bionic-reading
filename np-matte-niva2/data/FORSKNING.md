# Forskning: Nationellt prov Matematik nivå 2a, 2b, 2c (Gy25)

Sammanställt 2026-11-24. Underlag för övningssajten inför provet **fredag 11 december 2026 kl. 9.00**.

---

## 0. Verifierat mot Skolverkets officiella källor (2026-11-24)

Det här avsnittet bygger på **helläsning av originalkällorna** (hämtade 2026-11-24) och gäller före allt annat i dokumentet.
Där avsnitt 1–5 säger något annat gäller avsnitt 0.

**Källor (lästa i sin helhet):**
- Skolverkets Syllabus-API, ämnet MATE (Gy25, i kraft 2025-07-01): https://api.skolverket.se/syllabus/v1/subjects/MATE?timespan=LATEST
  (centralt innehåll för MATE2A00X, MATE2B00X, MATE2C00X sparat ordagrant i `data/AMNESPLAN-MATE-NIVA2.txt`)
- Skolverket, Nationellt prov i matematik nivå 2 (lärarinformation, gymnasieskolan): https://www.skolverket.se/prov-och-bedomning/nationella-prov/lararinformation-for-gymnasieskolan/nationellt-prov-i-matematik-niva-2
  samt Skolverkets sida *Delprov och innehåll – gymnasieskolan*
- Skolverket, Formelblad Matematik nivå 2 och formelblad Matematik 2 (daterat 2025-06-26, 4 sidor): https://www.skolverket.se/download/18.3ad8749019c2712301fca0a/1770379884800/Formelblad_Ma_niva_2.pdf
- Skolverkets kommentarmaterial i matematik (Gy11-revisionen 2021/22), används bara som tolkningsstöd: https://www.skolverket.se/download/18.66960151804bed21fd1de9/1653898443913/pdf9917.pdf

### 0.1 Centralt innehåll per nivå (ordagrant enligt API:t, förkortat)

| Innehåll | 2a | 2b | 2c |
|---|:-:|:-:|:-:|
| Räta linjens ekvation. Metoder för att bestämma linjära funktioner | ✔ | – (förkunskap från 1b) | – (förkunskap från 1c) |
| Begreppet linjärt ekvationssystem, lösningsmetoder | ✔ | ✔ | ✔ |
| Begreppet potensfunktion | ✔ | – | – |
| Motivering och hantering av räkneregler för potenser. Metoder för att lösa potensekvationer | ✔ | (potensekvationer förutsätts, se nästa rader) | (dito) |
| Exponentialekvationer | **endast digitala metoder** | ✔ metoder (algebraiskt) | ✔ metoder (algebraiskt) |
| Begreppet logaritm | ✖ | ✔ | ✔ |
| Räkneregler för logaritmer | ✖ | hantering **i samband med lösning av exponentialekvationer** | **motivering** och hantering |
| Likheter och skillnader mellan exponential- och potensekvationer | – | ✔ | ✔ |
| Motivering och hantering av konjugatregeln och kvadreringsreglerna | ✔ | ✔ | ✔ |
| Andragradsfunktion (symmetrilinje, extrempunkt, nollställen), andragradsekvationer | ✔ | ✔ | ✔ |
| Rotekvationer | ✖ | ✖ | ✔ |
| Lägesmått och spridningsmått, däribland percentiler och standardavvikelse, samt digitala metoder | ✔ | ✔ | ✔ |
| Normalfördelning: begrepp och egenskaper | ✔ | ✔ | ✔ |
| Normalfördelning: beräkningar | **"enklare beräkningar"** | **digitala metoder** | **digitala metoder** |
| Regressionsanalys och korrelationskoefficient, digitala metoder för regression | ✖ | ✔ | ✔ |
| Implikation och ekvivalens. Definition, sats och bevis | ✖ | ✔ | ✔ |
| Motivering och användning av enklare geometriska satser om **vinklar och likformighet** | ✖ | ✔ | ✔ |
| Pythagoras sats (2a: "användning och motivering") med beräkningar i koordinatsystem | ✔ | ✔ | ✔ |
| Programmering som verktyg vid problemlösning, databearbetning, numeriska metoder | ✖ | ✖ | ✔ |
| Digitala verktyg för att effektivisera beräkningar och komplettera metoder | ✔ | ✔ | ✔ |
| Problemlösning (2a: arbets- och samhällsliv; 2b/2c: utbildningens karaktär och samhällsliv), hållbar utveckling, kritisk granskning, modeller, matematikhistoria | ✔ | ✔ | ✔ |
| Program- eller yrkesspecifikt innehåll (breddning/fördjupning, hjälpmedel) | ✔ | – | – |

Viktiga slutsatser:
- **Kongruens nämns inte** i något av nivå 2-kursernas centrala innehåll (bara "vinklar och likformighet"). Övningsbanken har därför ingen kongruensuppgift längre (geo-014 är omskriven till likformighet).
- **2a har ingen logik/geometri utöver Pythagoras sats** (inga vinkel- eller likformighetssatser, inga bevisbegrepp) och **ingen regression eller korrelation**.
- **Potensregler och potensfunktion står uttryckligen bara i 2a.** I 2b/2c förutsätts potensekvationer (jämförelsen exponential- och potensekvationer) och potensreglerna finns på formelbladet för alla.
- **Räta linjens ekvation står bara i 2a** men är förkunskap från 1b/1c. Formelbladet (gemensamt) har k₁·k₂ = −1 och ax + by + c = 0.
- Kommentarmaterialet (Gy11) säger dessutom att **linjära olikheter inte ingår i a-spåret** (1a/2a), och att 2a-algebran är mer tillämpningsnära än 2b/2c.

### 0.2 Formelbladet "Formelblad Matematik nivå 2 och formelblad Matematik 2" (2025-06-26)

Samma blad gäller för 2a, 2b, 2c och för Gy11-elever i Ma2. Innehåll (verifierat ord för ord ur PDF:en):
- **Algebra:** kvadreringsreglerna, konjugatregeln. Andragradsekvationer: **pq-formeln och abc-formeln** x = −b/(2a) ± √(b² − 4ac)/(2a).
- **Aritmetik:** prefix tera–piko (10¹² … 10⁻¹²). Potenslagar: aˣaʸ, aˣ/aʸ, (aˣ)ʸ, aˣbˣ = (ab)ˣ, aˣ/bˣ = (a/b)ˣ, a⁻ˣ = 1/aˣ, a^(1/n) = ⁿ√a, a⁰ = 1.
- **Logaritmer:** y = 10ˣ ⇔ x = lg y; lg x + lg y = lg xy; lg x − lg y = lg(x/y); lg xᵖ = p·lg x.
- **Funktioner:** räta linjen y = kx + m, k = (y₂ − y₁)/(x₂ − x₁), **k₁·k₂ = −1** (vinkelräta linjer), **ax + by + c = 0**. Andragradsfunktion y = ax² + bx + c. **Potensfunktion y = C·xᵃ.** Exponentialfunktion y = C·aˣ (a > 0, a ≠ 1).
- **Geometri:** area av triangel, parallellogram, parallelltrapets, cirkel (även πd²/4), omkrets, cirkelsektor (båge och area, även A = br/2). Volym av prisma, cylinder (och mantelarea), pyramid, kon (och mantelarea πrs), klot (och area 4πr²).
- **Likformighet:** definition via a/d = b/e = c/f. **Skala:** areaskala = (längdskala)², volymskala = (längdskala)³. **Topptriangelsatsen, bisektrissatsen, transversalsatsen.**
- **Vinklar:** sidovinklar, vertikalvinklar, likbelägna vinklar och alternatvinklar vid parallella linjer, vinkelsumman i en n-hörning S = (n − 2)·180°. **Yttervinkelsatsen, Pythagoras sats, kordasatsen (ab = cd), randvinkelsatsen (u = 2v).**
- **Avståndsformeln och mittpunktsformeln.**
- **Trigonometri:** sin, cos, tan i rätvinklig triangel.
- **Statistik och sannolikhet:** figur för **lådagram** och figur för **normalfördelning** (andelar per standardavvikelse).
- Obs: **ingen formel för standardavvikelse** syns i den extraherade texten (kan finnas som bild – kontrollera PDF:en visuellt), och inga procent-/förändringsfaktorformler.

### 0.3 Provet (Skolverkets NP-sida)

- Ett gemensamt prov, "Matematik nivå 2a, 2b, 2c", med **tre delprov samma dag**.
- **Delprov A:** kortsvarsuppgifter **utan digitala verktyg**, svar i provhäftet.
- **Delprov B:** uppgifter **med digitala verktyg**, svar i provhäftet.
- **Delprov C:** uppgifter med **enkel räknare**, fullständiga lösningar på separat papper.
- Uppgiftsformat: **flervalsfrågor, kortsvar och uppgifter med fullständiga lösningar**.
- Provet kan även skrivas av **Gy11-elever i Matematik 2a/2b/2c** (därav det dubbla namnet på formelbladet).

### 0.4 Status för tidigare osäkra påståenden

| Tidigare påstående (avsnitt) | Status nu |
|---|---|
| Logik och geometri (bevis, likformighet, implikation) ingår i 2a (2.1, 2.3) | **AVGJORT: NEJ.** 2a har bara Pythagoras sats under "Logik och geometri". |
| Regression och korrelation saknas i 2a (2.2) | **AVGJORT: saknas i 2a**, ingår i 2b och 2c. |
| Normalfördelning digitalt i 2b/2c, "enklare beräkningar" i 2a (2.1, 2.3) | **AVGJORT: stämmer.** |
| Rotekvationer i 2c (2.2) | **AVGJORT: JA, ingår i 2c** ("Metoder för att lösa rotekvationer"), inte i 2a/2b. |
| Programmering i 2c | **AVGJORT: JA, bara 2c.** |
| Kongruens ingår i 2b/2c (2.2) | **AVGJORT: NEJ**, nämns inte i Gy25 nivå 2. |
| Randvinkelsatsen/kordasatsen ingår (2.2, 2.3, 5.4) | **AVGJORT: står på formelbladet** och täcks av "satser om vinklar" i 2b/2c. Ej 2a. |
| Potensregler/potensekvationer i 2b/2c (2.2) | **Delvis avgjort:** står uttryckligen bara i 2a; i 2b/2c förutsätts potensekvationer. Potenslagarna finns på formelbladet. |
| Räta linjens ekvation förkunskap i 2b/2c (2.2) | **AVGJORT:** står bara i 2a:s innehåll. Formelbladet (för alla) har k₁k₂ = −1 och ax + by + c = 0. |
| Formelbladets innehåll (3, 5.5) | **AVGJORT**, se 0.2. Nytt jämfört med antagandet: **abc-formeln, bisektrissatsen, kordasatsen, yttervinkelsatsen, vinkelsumma i n-hörning, prefix, ax + by + c = 0, lådagram.** Standardavvikelseformeln syns inte i texten. |
| 2c "mer abstrakt algebra och funktionslära" (2.1) | **Delvis avgjort:** det som skiljer 2c från 2b i texten är motivering av logaritmlagar, rotekvationer och programmering. |
| Kvadratkomplettering/härledning av pq-formeln (2.2) | **Fortfarande ej i texten** (bara "metoder för att lösa andragradsekvationer"). |
| Totalpoäng, E/C/A-märkning, förmågebeteckningar, andel gemensamma uppgifter (1.4, 1.5, 5.1–5.2, 5.6) | **Fortfarande EJ VERIFIERAT.** Bekräftat är bara att provet är gemensamt och har flerval, kortsvar och fullständiga lösningar. |

### 0.5 Konsekvenser för övningsbanken (genomfört 2026-11-24)

Alla 160 uppgifters `kurser` har granskats mot 0.1. Principen är att en uppgift får nivån bara om allt innehåll den kräver
ingår i nivån eller är tydlig förkunskap från nivå 1 i samma spår (procent, förändringsfaktor, exponentialfunktioner som
modeller, linjära ekvationer, area/volym, skala). Exponentialekvationer märks 2a bara i delprov B (digitalt). Följd:
17 taggar ändrade (16 uppgifter fick 2a, alg-020 med linjär olikhet förlorade 2a), geo-014 (kongruens) skrevs om till likformighet,
och momentnamnen slogs ihop till färre, konsekventa namn. Bankens saknade 2c-innehåll (rotekvationer, motivering av logaritmlagar,
programmering) behöver kompletteras separat.

> **Metodnotis för avsnitt 1–5 (äldre sammanställning; avsnitt 0 ovan går före).** Webbhämtning (WebFetch/curl) var blockerad i sessionen för skolverket.se,
> syllabuswebb.skolverket.se, gy25.se, umu.se, eddler.se m.fl. Avsnitt 1–5 bygger därför på **utdrag ur
> sökresultat** (WebSearch), inte på helläsning av dokumenten. Punkter märkta **[VERIFIERAT]** förekom
> konsekvent i flera utdrag, varav minst ett från Skolverket eller gy25.se (kopia av Skolverkets text).
> **[TROLIGT]** = en källa eller en icke-officiell källa. **[EJ VERIFIERAT]** = egen kunskap eller
> motstridiga källor. Kontrollera mot originalen när nätet tillåter det (se listan över källor sist).

---

## 1. Provets upplägg

### 1.1 Datum och tider [VERIFIERAT]

Enligt Skolverkets sida *Provdatum för gymnasieskolan* (läsåret 2026/27, prov enligt Gy25):

| Delprov | Tid | Hjälpmedel | Svarsform |
|---|---|---|---|
| **A** | 80 min | **Inga digitala verktyg / ingen räknare** | Kortsvarsuppgifter, svar skrivs i provhäftet |
| *kort rast* | | | |
| **B** | 40 min | **Digitala verktyg** (t.ex. grafritande, symbolhanterande verktyg) | Svar skrivs i provhäftet |
| *längre rast* | | | |
| **C** | 120 min | **Enkel räknare** | Fullständiga lösningar på separat papper |

- Till detta kommer 5–10 minuter för instruktioner.
- Formelblad, kladdpapper och ritverktyg (t.ex. linjal) ska finnas tillgängliga vid **alla** delprov [VERIFIERAT].
- Skolverket påpekar att digitala verktyg inte får användas på delprov där det inte uttryckligen står att de är tillåtna.
- Eleven måste skriva alla delprov för att få ett provbetyg. Totalpoängen från alla delprov omvandlas till ett provbetyg via kravgränser ("rak totalpoäng") [VERIFIERAT].
- Nästa tillfälle är enligt flera källor onsdag 19 maj 2027 kl. 9.00 [TROLIGT].

### 1.2 Vad betyder "50" i schematabellen?

**Det är med stor sannolikhet veckonumret.** Fredag 11 december 2026 ligger i ISO-**vecka 50** (vecka 1 2026 börjar
måndag 29 dec 2025). En sökträff återgav Skolverkets tabell som "…11 december 2026 kl. 9.00, in week 50". Skolverkets
provdatumtabeller har kolumnen *Vecka*. Det är **inte** maxpoängen. [TROLIGT, mycket sannolikt]

### 1.3 Pappersprov eller digitalt? [VERIFIERAT för 2025/26, TROLIGT för 2026/27]

Arbetsgruppen för nationella prov i matematik (Umeå universitet) skriver att proven i matematik nivå 2abc
(och fortsättning nivå 1bc och nivå 2) läsåret 2025/26 **enbart erbjuds som pappersprov**. Inget utdrag tydde på
att provet i december 2026 skulle vara digitalt i Skolverkets provtjänst. Svar skrivs i häftet (A, B) och på
papper (C), så provet ska behandlas som ett **pappersprov där bara delprov B tillåter digitala verktyg**.

### 1.4 Poäng, poängtyper och betygsgränser

- **Totalpoäng för Gy25-provet i nivå 2: EJ VERIFIERAT.** Det gick inte att hitta i något utdrag.
- **Äldre Ma2-prov (Gy11)** hade 55–62 poäng totalt, t.ex. Ma2a vt22: **55 p (23 E, 20 C, 12 A)**, med provbetygsgränser
  ungefär E ≥ 15 p och A ≥ 44 p, varav minst 7 A-poäng [TROLIGT, från tredjepartskopior].
- **Poängnotation (Gy11-tradition):** varje uppgift märks med t.ex. **(2/1/0)** = max 2 E-, 1 C- och 0 A-poäng.
  Uppgifter märkta "Endast svar krävs" ger poäng för korrekt svar, övriga kräver redovisning.
  Bedömningsprincipen är **positiv bedömning**: poäng ges för det som är rätt, inget dras av för fel.
- Äldre prov markerade också vilken **förmåga** en poäng gällde (B = begrepp, P = procedur, PL = problemlösning,
  M = modellering, R = resonemang, K = kommunikation). **Om Gy25-proven behåller E/C/A-märkningen och
  förmågebeteckningarna är EJ VERIFIERAT**, men det är troligt att E/C/A-poäng finns kvar eftersom Gy25 har kvar betygsskalan A–F.
- Kravgränserna för Gy25-provet fastställs efter provet och publiceras i bedömningsanvisningarna (sekretessbelagda). **Inte kända.**

**Förslag för sajten:** sikta på cirka 50–60 poäng totalt med en E/C/A-fördelning på ungefär 40/35/25 %, och
märk uppgifterna (E/C/A), men redovisa det som en *uppskattning*.

### 1.5 Gemensamt prov för 2a, 2b och 2c

Skolverket listar ett prov, "Matematik nivå 2a, 2b, 2c" (delprov A+B+C). Umeå universitet redovisar
resultaten per nivå (2a, 2b, 2c). Hur många uppgifter som är gemensamma och hur många som är nivåspecifika
**är EJ VERIFIERAT**. De gamla Ma2-proven var separata häften per kurs med många gemensamma uppgifter.

---

## 2. Centralt innehåll, Matematik nivå 2a, 2b, 2c (Gy25)

Kurskoder: **MATE2A00X, MATE2B00X, MATE2C00X**, 100 poäng vardera (ämne MATE). Skolverket beskriver Gy25-nivåerna
2a, 2b och 2c som "mycket lika" de reviderade Ma2-kurserna i Gy11 (revisionen 2021). Rubrikerna i Gy25 är
*Aritmetik, algebra och funktioner*, *Statistik*, *Logik och geometri* och (för 2a) *Program- eller yrkesspecifikt innehåll*,
plus problemlösning och digitala verktyg.

### 2.1 Ordagranna punkter som kom fram i utdragen

**Nivå 2a** [VERIFIERAT via gy25.se och Skolverkets utdrag]
- Räta linjens ekvation. Metoder för att bestämma linjära funktioner.
- Begreppet linjärt ekvationssystem. Metoder för att lösa linjära ekvationssystem.
- Motivering och hantering av räkneregler för potenser. Metoder för att lösa potensekvationer.
- Digitala metoder för att lösa exponentialekvationer.
- Motivering och hantering av konjugatregeln och kvadreringsreglerna.
- Begreppet andragradsfunktion och egenskaper hos andragradsfunktioner, däribland symmetrilinje, extrempunkt och nollställen. Metoder för att lösa andragradsekvationer.
- Lägesmått och spridningsmått, däribland percentiler och standardavvikelse, samt digitala metoder för att bestämma dessa.
- Begreppet normalfördelning och egenskaper hos normalfördelat material. *Metoder för att göra **enklare** beräkningar på normalfördelat material.*
- Logik och geometri: enligt ett utdrag ingår implikation/ekvivalens, definition/sats/bevis och enklare geometriska satser om vinklar och likformighet samt Pythagoras sats [TROLIGT, se 2.3].
- Problemlösning med koppling till karaktärsämnen/yrkesliv, privatekonomi och samhälle.

**Nivå 2b** [VERIFIERAT]
- Linjära ekvationssystem (begrepp och lösningsmetoder).
- *Hantering av räkneregler för logaritmer **i samband med lösning av exponentialekvationer**. Metoder för att lösa exponentialekvationer.*
- Konjugat- och kvadreringsregler, andragradsfunktioner, metoder för att lösa andragradsekvationer.
- Lägesmått och spridningsmått, däribland percentiler och standardavvikelse, samt digitala metoder.
- Begreppen **regressionsanalys och korrelationskoefficient** (digitala metoder).
- Normalfördelning med **digitala metoder** för beräkningar [TROLIGT].
- Begreppen implikation och ekvivalens. Begreppen definition, sats och bevis.
- Motivering och användning av enklare geometriska satser om vinklar och likformighet samt Pythagoras sats, inklusive beräkningar i koordinatsystem [TROLIGT].
- Problemlösning med koppling till samhällsliv och hållbar utveckling.

**Nivå 2c** [VERIFIERAT]
- Begreppet linjärt ekvationssystem. Metoder för att lösa linjära ekvationssystem.
- *Begreppet logaritm. **Motivering** och hantering av räkneregler för logaritmer.* Metoder för att lösa exponentialekvationer. Skillnaden mellan exponential- och potensekvationer.
- Konjugatregeln och kvadreringsreglerna. Andragradsfunktioner och andragradsekvationer [TROLIGT].
- Lägesmått och spridningsmått (percentiler, standardavvikelse), digitala metoder; **regressionsanalys och korrelationskoefficient**.
- Begreppet normalfördelning och egenskaper hos normalfördelat material. Digitala metoder för att göra beräkningar på normalfördelat material (Plan Digital/Skolverket-utdrag).
- Begreppen implikation och ekvivalens. Begreppen definition, sats och bevis.
- Mer abstrakt algebra och funktionslära (naturvetenskaps- och teknikinriktning).

Skolverkets kommentarmaterial (2022, Gy11-revisionen, som enligt Skolverket i stort motsvarar Gy25) bekräftar tre skillnader:
1. *"Logaritmer ingår i matematik 2b och 2c, men är inte obligatoriskt innehåll i a-spåret. Räkneregler för logaritmer är i 2b kopplat till lösning av exponentialekvationer, medan de behandlas bredare i 2c."*
2. *"2a omfattar metoder för att göra enklare beräkningar på normalfördelat material, medan 2b och 2c omfattar digitala metoder."*
3. *"I 2b och 2c ingår begreppen regressionsanalys och korrelationskoefficient samt digitala metoder för regressionsanalys."*

### 2.2 Tabell: ämnesområde per nivå

✔ = ingår, (✔) = ingår i begränsad form, ✖ = ingår inte, ? = oklart

| Område | 2a | 2b | 2c | Säkerhet |
|---|:-:|:-:|:-:|---|
| Räta linjens ekvation, bestämma linjära funktioner (y = kx + m, k ur två punkter) | ✔ | (✔) förkunskap från 1b | (✔) förkunskap från 1c | VERIFIERAT för 2a och 1c. Flyttades 2021 från 2b/2c till 1b/1c. Används ändå i 2b/2c, t.ex. i ekvationssystem |
| Linjära ekvationssystem (grafiskt, substitution, addition) | ✔ | ✔ | ✔ | VERIFIERAT |
| Potensregler, potensekvationer (xⁿ = a) | ✔ | ✔ | ✔ | VERIFIERAT 2a, TROLIGT 2b/2c |
| Exponentialekvationer | ✔ **digitalt** / grafiskt | ✔ algebraiskt med lg | ✔ algebraiskt med lg | VERIFIERAT |
| Logaritmbegreppet (lg x, 10ˣ = a ⇔ x = lg a) | ✖ | ✔ | ✔ | VERIFIERAT |
| Logaritmlagar | ✖ | (✔) bara vid exponentialekvationer | ✔ inklusive **motivering/härledning** | VERIFIERAT |
| Konjugatregeln, kvadreringsreglerna | ✔ | ✔ | ✔ | VERIFIERAT |
| Andragradsfunktioner (symmetrilinje, extrempunkt, nollställen) | ✔ | ✔ | ✔ | VERIFIERAT 2a, TROLIGT 2b/2c |
| Andragradsekvationer, pq-formeln, nollproduktmetoden | ✔ | ✔ | ✔ | VERIFIERAT 2a. Eddler märker pq-formeln "ABC" |
| Kvadratkomplettering, härledning av pq-formeln | ? | ? | (✔) troligen | EJ VERIFIERAT |
| Rotekvationer | ✖ | ✖ | ? (fanns i Gy11 2c före 2021) | EJ VERIFIERAT |
| Lägesmått, spridningsmått, percentiler, lådagram, standardavvikelse | ✔ | ✔ | ✔ | VERIFIERAT |
| Normalfördelning | ✔ enklare beräkningar (68–95–99,7-regeln) | ✔ digitala metoder | ✔ digitala metoder | VERIFIERAT (kommentarmaterialet) |
| Regression, korrelationskoefficient | ✖ (inget hittat) | ✔ | ✔ | VERIFIERAT 2b/2c. 2a: EJ VERIFIERAT att det saknas |
| Implikation/ekvivalens, definition/sats/bevis | ? (ett utdrag säger ✔) | ✔ | ✔ | VERIFIERAT 2b/2c. 2a motstridigt |
| Likformighet (inklusive topptriangel- och transversalsatsen) | ? | ✔ | ✔ | TROLIGT. Eddler märker "BC" |
| Kongruens | ? | ✔ | ✔ | TROLIGT. Eddler märker "BC" |
| Vinkelsatser (sidovinklar, vertikalvinklar, likbelägna och alternatvinklar, triangelns vinkelsumma) | ? | ✔ | ✔ | TROLIGT |
| Randvinkelsatsen, kordasatsen | ? | ✔ troligen | ✔ troligen | EJ VERIFIERAT i Gy25-texten. Täcks troligen av "satser om vinklar". Finns i 2b-läromedel |
| Pythagoras sats, avståndsformeln, mittpunktsformeln i koordinatsystem | ✔ | ✔ | ✔ | TROLIGT. Eddler märker avståndsformeln "ABC" |
| Bevis (enkla geometriska och algebraiska bevis) | (✔)? | ✔ | ✔ (mest omfattande) | TROLIGT |
| Problemlösning kopplad till yrkes- och privatekonomi | ✔ | (✔) samhälle och hållbarhet | (✔) | TROLIGT |

**Praktisk slutsats för övningsbanken:**
- *Gemensam kärna (alla tre):* linjära ekvationssystem, potensekvationer, konjugat- och kvadreringsregler,
  andragradsfunktioner och andragradsekvationer (pq), lägesmått och spridningsmått, standardavvikelse, normalfördelning (grunder).
- *Bara 2b + 2c:* logaritmer och algebraisk lösning av exponentialekvationer, regression och korrelation (delprov B), digital normalfördelning,
  logik och bevis, likformighet, kongruens, randvinkelsatsen (troligen).
- *Extra i 2c:* motivering och härledning av logaritmlagar, mer abstrakt algebra och fler bevisuppgifter.
- *Särskilt i 2a:* räta linjens ekvation som eget innehåll, exponentialekvationer bara digitalt eller grafiskt (passar delprov B), yrkesanknytning.

### 2.3 Kända osäkerheter i innehållet
- Om **logik och geometri** (bevis, likformighet) ingår i Gy25 **2a** är motstridigt: ett gy25.se-utdrag säger ja, Eddler och Gy11-revisionen säger att det främst gäller 2b/2c.
- Om **randvinkelsatsen** står uttryckligen i Gy25-texten: hittades inte. Den finns i läromedel för Ma2b/2c och fanns på det tidigare formelbladet för Ma2 (se 3).
- Fanns **digitala metoder för normalfördelning** i 2a? Skolverkets ämnessida (utdrag) och gy25.se säger olika saker. Kommentarmaterialet säger "enklare beräkningar" för 2a.

---

## 3. Formelblad

Skolverket har ett officiellt **"Formelblad Matematik nivå 2"** (4 sidor, daterat **2025-06-26**):
`https://www.skolverket.se/download/18.3ad8749019c2712301fca0a/1770379884800/Formelblad_Ma_niva_2.pdf` [VERIFIERAT att det finns].
Det föregicks av "Formelblad matematik 2" (2021-06-24, Ma 2abc, 4 sidor), som det nya bladet troligen liknar.

Innehållet kunde inte läsas direkt. Sammanfattningen nedan bygger på sökutdrag (algebra med andragradsekvation och
logaritmregler, funktioner: linjära, andragrads-, potens- och exponentialfunktioner, geometri: trianglar, cirklar,
prismor, koner, klot och likformighet) och på kunskap om 2021 års Ma2-blad. **Behandla detaljerna som [EJ VERIFIERAT]**:

**Algebra**
- Kvadreringsregler: (a + b)² = a² + 2ab + b², (a − b)² = a² − 2ab + b². Konjugatregeln: (a + b)(a − b) = a² − b².
- Andragradsekvation: x² + px + q = 0 ⇒ x = −p/2 ± √((p/2)² − q).
- Potenser: aˣ·aʸ = aˣ⁺ʸ, aˣ/aʸ = aˣ⁻ʸ, (aˣ)ʸ = aˣʸ, a⁻ˣ = 1/aˣ, a^(1/n) = ⁿ√a, a⁰ = 1.
- Logaritmer: y = 10ˣ ⇔ x = lg y. lg(xy) = lg x + lg y, lg(x/y) = lg x − lg y, lg(xᵖ) = p·lg x.

**Funktioner**
- Räta linjen: y = kx + m, k = (y₂ − y₁)/(x₂ − x₁). Parallella linjer: k₁ = k₂. Vinkelräta linjer: k₁·k₂ = −1.
- Andragradsfunktion: y = ax² + bx + c. Exponentialfunktion: y = C·aˣ. Potensfunktion: y = C·xᵃ.

**Geometri**
- Areor: triangel bh/2, parallellogram bh, parallelltrapets h(a + b)/2, cirkel πr², cirkelsektor (v/360°)·πr², båge (v/360°)·2πr.
- Volymer: prisma Bh, cylinder πr²h, pyramid Bh/3, kon πr²h/3, klot 4πr³/3. Mantelarea: cylinder 2πrh, kon πrs. Sfärens area 4πr².
- Likformighet: areaskala = (längdskala)², volymskala = (längdskala)³. Topptriangelsatsen och transversalsatsen.
- **Randvinkelsatsen** (medelpunktsvinkeln är dubbelt så stor som randvinkeln på samma båge). Fanns på 2021 års blad [EJ VERIFIERAT för 2025-bladet].
- Pythagoras sats. Avståndsformeln d = √((x₂ − x₁)² + (y₂ − y₁)²). Mittpunktsformeln.
- Trigonometri i rätvinklig triangel: sin, cos, tan.

**Statistik**
- Standardavvikelse (stickprov): s = √( Σ(x − x̄)² / (n − 1) ).
- Normalfördelningsfigur med andelarna ≈ 34 % / 13,5 % / 2,35 % / 0,15 % per standardavvikelse (68–95–99,7).

**Övrigt:** förändringsfaktor och procent från nivå 1, eventuellt prefix och enheter.

---

## 4. Gamla prov och uppgiftsstil

Gamla Ma2a/2b/2c-prov (Gy11) finns publicerade i Umeå universitets arkiv, `https://arkiv.edusci.umu.se/np/np-2-4-prov/`, till exempel:
- `Ma2a-vt14.pdf`, `Ma2b-vt15.pdf`, `Ma2b-ht14.pdf`, `Ma2c-vt14.pdf` (delprov B, C och D samt bedömningsanvisningar)
- Kopior hos eddler.se (`Ma2b-ht13.pdf`), allakando.se (`Ma2a-vt15.pdf`) och matteboken.se/provbank.

**Gy11-struktur (för jämförelse):** delprov B = korta svar utan räknare ("Endast svar krävs"), C = långsvar utan räknare,
D = långsvar med räknare/digitala verktyg. **Gy25 nivå 2 motsvarar ungefär A ≈ gamla B + korta C-uppgifter,
B = ny kort del med digitala verktyg och C ≈ gamla D med enkel räknare** [TOLKNING].

**Typiska uppgiftsmönster** (från gamla prov och läromedel):
- Kortsvar: förenkla med konjugat- eller kvadreringsregel, lös x² = 49 eller x² − 6x = 0, läs av symmetrilinje och nollställen ur en graf,
  bestäm k och m ur två punkter, avgör om (x, y) löser ett system, lg 1000 = ?, standardavvikelse ur ett diagram (jämförelse).
- Digitala verktyg (delprov B): regressionsanpassning och korrelationskoefficient, normalfördelningsberäkningar (normalcdf), grafisk lösning
  av exponentialekvationer och system, andragradsmodeller.
- Långsvar (delprov C): modellering med andragradsfunktion (maximal area eller vinst), tecknande och lösning av ekvationssystem i
  textproblem, exponentiell tillväxt med lg-lösning (2b/2c), geometriska bevis (likformighet, randvinkelsatsen) och generalisering
  eller bevis av algebraiska samband ("visa att summan av … alltid är delbar med …"), A-nivåuppgifter med resonemang och kommunikation.

---

## 5. Det som behöver kontrolleras (sammanfattning)

1. Maxpoäng och E/C/A-fördelning för Gy25-provet i nivå 2: **okänt**.
2. Om förmågebeteckningarna (B/P/PL/M/R/K) används i Gy25-proven: **okänt**.
3. Exakt Gy25-text för 2a om logik och geometri, och om regression saknas i 2a.
4. Om randvinkelsatsen står i Gy25-ämnesplanen eller på formelbladet från 2025.
5. Exakta formuleringar på Formelblad Matematik nivå 2 (2025-06-26).
6. Andelen gemensamma och nivåspecifika uppgifter.
7. Att "50" är veckonumret (nästan säkert).

---

## Källor

Officiella (lästa via sökutdrag):
- Skolverket, Nationellt prov i matematik nivå 2 (lärarinformation, gymnasieskolan): https://www.skolverket.se/prov-och-bedomning/nationella-prov/lararinformation-for-gymnasieskolan/nationellt-prov-i-matematik-niva-2
- Skolverket, Provdatum för gymnasieskolan: https://www.skolverket.se/prov-och-bedomning/nationella-prov/provdatum/provdatum-for-gymnasieskolan
- Skolverket, Delprov och innehåll (gymnasieskolan): https://www.skolverket.se/prov-och-bedomning/nationella-prov/nationella-prov-pa-papper/delprov-och-innehall/delprov-och-innehall---gymnasieskolan
- Skolverket, Nationellt prov i matematik nivå 2 (komvux, 4 delprov till 2028): https://www.skolverket.se/prov-och-bedomning/nationella-prov/lararinformation-for-komvux-pa-gymnasial-niva/nationellt-prov-i-matematik-niva-2---komvux-pa-gymnasial-niva
- Skolverket, Formelblad Matematik nivå 2 (2025-06-26): https://www.skolverket.se/download/18.3ad8749019c2712301fca0a/1770379884800/Formelblad_Ma_niva_2.pdf
- Skolverket, Formelblad Ma 2abc 2021: https://www.skolverket.se/download/18.645f1c0e17821f1d15c5fa4/1625491482263/Formelblad%20Ma%202abc%202021.pdf
- Skolverket, Ämnet Matematik (MATE, Gy25): https://www.skolverket.se/undervisning/gymnasieskolan/program-och-amnen-i-gymnasieskolan/gymnasieprogrammen-gy25/riksrekryterande-utbildningar-med-egna-examensmal/programs/TA25/MATE
- Skolverket, Kommentarmaterial matematik (2022): https://www.skolverket.se/download/18.66960151804bed21fd1de9/1653898443913/pdf9917.pdf
- Skolverket, Kommentarmaterial Gy25 matematik: https://www.skolverket.se/download/18.6a3421f41969f369f2c50b3/1746795041422/Kommentarmaterial_gymnasieskolan_matematik.pdf
- Skolverket, ämnesplan MATE (syllabuswebb): https://syllabuswebb.skolverket.se/subject/MATE/1/pdf
- Umeå universitet, Resultat nivå 2abc ht25: https://arkiv.edusci.umu.se/np/np-2-4-info/Resultat-niva2c-%20ht25.pdf
- Umeå universitet, Resultatrapport vt2025 (pappersprov 25/26): https://arkiv.edusci.umu.se/np/np-2-4-info/Resultatrapport_vt2025.pdf
- Umeå universitet, information till lärare: https://www.umu.se/institutionen-for-tillampad-utbildningsvetenskap/np/np-2-4/info/
- Gamla prov: https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2a-vt14.pdf, https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2b-vt15.pdf, https://arkiv.edusci.umu.se/np/np-2-4-prov/Ma2c-vt14.pdf

Sekundära (kopior av kursplanen eller kommersiella):
- gy25.se: https://gy25.se/gy25/mate/mate2a00x/, https://gy25.se/gy25/mate/mate2b00x/, https://gy25.se/gy25/mate/mate2c00x/
- Plan Digital: https://masterdata.plandigital.se/gy/gy25/courses/mate2c00x
- Komvux Stockholm 2a: https://komvux.stockholm.se/vux/courseinfo/%C3%85V2610MATE2A0Q13
- Eddler nivå 2abc (A/B/C-märkning per lektion): https://eddler.se/kurser/matematik-niva-2abc/
- vidma.se, räta linjen NP2: https://vidma.se/np2ratalinjen/
- Studocu Ma2a vt22 (poängfördelning): https://www.studocu.com/sv/document/procivitas-privata-gymnasium-malmo/matematik/nationella-prov/67585224
