# Faktagranskning – AI-läromedel för gymnasiet

Granskare: faktagranskning utförd 2026-06-08
Underlag: Kapitel 1–5 (/tmp/k1.txt – k5.txt)

---

## Kapitel 1: Introduktion till AI

**1. ChatGPT "den första som släpptes på bred front" (avsnitt 1.1)**
Påståendet är vilseledande. ChatGPT var inte den första chattboten eller ens den första allmänna AI-tjänsten. Bland föregångare märks ELIZA (1966), Cleverbot, Google Assistant, Amazons Alexa och Microsoft Cortana. Mer korrekt formulering: "ChatGPT var den första generativa chattboten baserad på en stor språkmodell som fick massiv spridning bland allmänheten (november 2022)."

**2. John Searle (1932–2025) – dödsåret (avsnitt 1.1)**
Läromedlet anger att Searle levde 1932–2025. Searle avled i april 2023, inte 2025. Föreslagen korrigering: "(1932–2023)".

**3. Alan Turing beskrivs som "datavetare" (avsnitt 1.2)**
I bildtexten kallas Turing "brittisk datavetare". Turing var i första hand matematiker och logiker; begreppet "datavetenskap" som formellt fält uppstod efter hans tid. Mer korrekt: "brittisk matematiker och logiker".

**4. DEUCE – koppling till Alan Turing (avsnitt 1.2)**
Bildtexten säger att DEUCE "utvecklades … från ritningar av Alan Turing". DEUCE byggde på Turings ACE-design (Automatic Computing Engine), inte på "DEUCE" som en direktöversättning av Turings ritningar. Mer precist: "DEUCE var baserad på Turings ACE-design, framtagen vid National Physical Laboratory."

**5. Christopher Strachey "brittisk datavetare" (avsnitt 1.2)**
Strachey (1916–75) var matematiker och pionjär inom programmeringsspråk, inte typiskt "datavetare" i modern mening. Mer korrekt: "brittisk matematiker och programmeringspionjär".

**6. Arthur Samuel kallas "Arthur Samuels" (avsnitt 1.2)**
Personnamnet stavas fel genomgående. Det korrekta efternamnet är Samuel (utan s). Föreslagen korrigering: "Arthur Samuel (1901–90)".

**7. AlphaFold beskrivs som ett system som "kan förutsäga hur proteiner veckar sig" som om det vore ett framtida löfte (avsnitt 1.2)**
AlphaFold 2 publicerades 2020 och AlphaFold 3 2024 – det är inte en framtida möjlighet utan ett redan etablerat vetenskapligt verktyg. Formuleringen "öppnar möjligheter" bör kompletteras med att detta redan skett: "AlphaFold har sedan 2020 revolutionerat proteinforskningen och används i dag brett inom läkemedelsutveckling."

**8. GPT-4 – antalet tränade ord/tokens (avsnitt 1.4)**
Texten påstår att GPT-4 har tränats på "5 000 000 miljoner ord" (5 biljoner) och att detta är "25 000 gånger fler" än en vuxen människa. OpenAI har aldrig offentliggjort exakt träningsdatastorlek för GPT-4. Siffran bygger på uppskattningar och bör presenteras som en estimering, inte ett faktum. Texten bör tillägga: "Det exakta antalet har inte offentliggjorts av OpenAI."

**9. GPT som förkortning (avsnitt 1.5)**
Texten förklarar GPT som "Generative Pre-trained Transformer", vilket är korrekt. Men i ett par sammanhang i avsnitt 1.4 skrivs "ChatGPT-4" i stället för "GPT-4" (Chat är ett gränssnitt ovanpå modellen, inte modellnamnet). Korrekt modellnamn är GPT-4; ChatGPT-4 är informell blandning.

---

## Kapitel 2: AI i samhället

**10. Amazons rekryterings-AI utvecklades "2018" (avsnitt 2.1)**
Texten säger att Amazons AI-system "utvecklades 2018". Projektet startade runt 2014 och lades ned 2018 – det var alltså 2018 projektet avvecklades, inte startades. Mer korrekt: "Amazons rekryterings-AI, som hade utvecklats sedan 2014, lades ned 2018."

**11. UNESCO antog AI-rekommendationer "2021" (avsnitt 2.1)**
Korrekt – UNESCO:s rekommendation om AI-etik antogs vid generalkonferensen i november 2021. Inget fel här, men texten anger inte att dokumentet heter "Recommendation on the Ethics of Artificial Intelligence", vilket ger mer precision.

**12. Googles bildgenerator "Nano Banana Pro" (avsnitt 2.1 och 2.4)**
Inget AI-verktyg från Google heter "Nano Banana Pro". Det verkar vara ett fiktivt exempelnamn som används i läromedlet, men det presenteras som om det vore ett verkligt Googleverktyg. Om det är ett påhittat namn för pedagogiska syften bör detta klargöras explicit för att inte vilseleda elever. Googles faktiska bildgenereringstjänster heter Imagen och ImageFX.

**13. EU:s AI-förordning – beskrivning av risknivåer (avsnitt 2.1)**
Texten anger att AI Act delar in AI i "fyra risknivåer: oacceptabel, hög, begränsad och minimal". Det är korrekt enligt AI Act, men texten saknar den viktiga detaljen att en femte kategori tillkom under processen – "allmän AI" (GPAI/General Purpose AI). Sedan 2024 regleras GPAI-modeller (som GPT-4 och Gemini) separat. För gymnasieelever bör detta nämnas.

---

## Kapitel 3: Tekniken bakom AI – Programmering

**14. "Garanterat fungerande verktyg i biblioteket" (avsnitt 3.1)**
Texten påstår att Pythonbibliotek innehåller "garanterat fungerande verktyg". Detta är överdrivet – alla bibliotek kan ha buggar, säkerhetsproblem eller beroendekonflikter. Mer korrekt formulering: "noggrant testade och välbeprövade verktyg".

**15. Kodexempel: kommentaren anger fel datatyp (avsnitt 3.1)**
I kodexemplet under "Vanliga fel i Python" (punkt 3) skrivs:
```
x = "3"  # denna variabel har datatypen integer
```
Kommentaren är direkt felaktig. En variabel satt till `"3"` (med citattecken) har datatypen **string/sträng**, inte integer. Kommentaren bör lyda: `# denna variabel har datatypen sträng (string)`.

**16. Schack – antal distinkta tillstånd (avsnitt 3.3)**
Texten påstår att schack har "10^40 distinkta tillstånd". Det allmänt citerade uppskattade antalet legala schackpositioner (Shannon-talet) är ca 10^43 till 10^47, och antalet möjliga spelsekvenser (spelträd) är ca 10^120. Siffran 10^40 är en underskattning. Mer korrekt: "Det uppskattade antalet möjliga schackpartier överstiger 10^120."

**17. Förza Motorsport – AI baserad på hur "människor kör" (avsnitt 3.1)**
Texten påstår att bilarnas körstil i Forza Motorsport "bygger på att systemet lär sig av hur människor kör". Det stämmer delvis för Drivatar-systemet i Forza Motorsport, men systemet modellerar individuella spelarprofiler – inte en generell "mänsklig körstil". Mer precist: "Forza Motorsports Drivatar-system analyserar och imiterar individuella spelares körbeteenden."

---

## Kapitel 4: Tekniken bakom AI – Inlärning

**18. Parametrar i chattmodeller – "hundratals miljarder till biljoner" (avsnitt 4.2)**
Texten anger att en chattmodell har "i storleksordningen hundratals miljarder till biljoner parametrar". GPT-4:s faktiska parameterantal är inte offentliggjort av OpenAI. GPT-3 har 175 miljarder parametrar; Llama 3 (70B) har 70 miljarder. Formuleringar som "biljoner parametrar" är inte belagt för aktuella publicerade modeller. Mer korrekt: "moderna stora språkmodeller har typiskt tiotals till hundratals miljarder parametrar; det exakta antalet för de största modellerna är ofta inte offentliggjort."

**19. Spamfilterexemplet – precision kontra recall (avsnitt 4.2)**
Texten påstår att "ett spamfilter ska ha hög precision eftersom det är bättre att missa några skräppostmejl än att sortera bort viktiga meddelanden." Detta är korrekt resonemang, men exemplet på precision är logiskt omvänt jämfört med definitionen som ges. I sammanhanget är "positiv klass" = spam. Hög precision innebär att få viktiga mejl (FP) felklassificeras som spam – det är korrekt. Men meningen "ett sjukdomstest säger att du är frisk trots du inte är det" beskriver ett falskt negativt utfall (FN), inte ett falskt positivt (FP) – alltså recall-problemet, inte precision. Exemplet blandar ihop begreppen och bör förtydligas.

**20. Humanoid robot springer halvmaraton "7 minuter snabbare än det mänskliga världsrekordet" (avsnitt 4.4, bildtext)**
Bildtexten påstår att roboten klarade ett halvmaraton på 50:26 och att detta är "7 minuter snabbare än det mänskliga världsrekordet". Det mänskliga halvmaraton-världsrekordet är ca 57:31 (Jacob Kiplimo, 2021). 57:31 minus 50:26 är ca 7 minuter, vilket alltså skulle innebära att roboten slår världsrekordet. Det finns ingen bekräftad källa för att en humanoid robot 2026 sprang snabbare än världsrekordet på halvmaraton. Påståendet bör källhänvisas eller modereras.

**21. Sigmoid-funktionens beskrivning (avsnitt 4.5)**
Texten beskriver Sigmoid som att den "pressar normeras värdena till intervallet mellan 0 och 1". Formuleringen "pressar normeras" är grammatiskt och tekniskt oklar; dessutom normerar Sigmoid inte i strikt mening utan applicerar en icke-linjär transformation. Korrekt: "Sigmoid omvandlar värden till intervallet (0, 1), vilket gör den lämplig för sannolikhetsberäkningar."

**22. Bakåtpropagering – formuleringen "felen rinner bakåt" (avsnitt 4.5)**
Uttrycket är pedagogiskt men tekniskt oprecist. Det är inte "felen" (residualerna) som propageras bakåt utan gradienten av förlustefunktionen. Mer korrekt: "gradienten av förlustefunktionen beräknas bakåt genom lagren med hjälp av kedjeregeln, och vikterna justeras i riktning mot minskad förlust."

---

## Kapitel 5: Projektarbeten

**23. I, Robot – bokår angivet fel (avsnitt 5.1)**
Texten anger "I, Robot (bok från 1950)". Isaac Asimovs samling "I, Robot" gavs ut 1950, vilket stämmer. Däremot bör det noteras att enskilda berättelserna i samlingen publicerades under 1940-talet (1940–1950), vilket kan vara relevant för en litterär analys. Inget faktafel, men en precision som höjer kvaliteten.

**24. Black Mirror – startår (avsnitt 5.1)**
Texten anger "Black Mirror (tv-serie från 2011)". Serien hade premiär i december 2011 i Storbritannien, vilket är korrekt. Observera dock att serien sedan 2016 producerats av Netflix och till stor del är en annan produktion. Ingen fel men kan förtydligas: "brittisk tv-serie, från 2011, numera producerad av Netflix."

**25. Her – filmår (avsnitt 5.1)**
"Her (film från 2013)" – korrekt (Spike Jonze, 2013). Inget fel.

**26. MNIST-datasetet – beskrivningen (avsnitt 5.2)**
Projektet beskriver MNIST som ett dataset för att "känna igen handskrivna siffror 0–9". Det är korrekt. Dock bör nämnas att MNIST är ett välkänt benchmark-dataset med 60 000 träningsexempel och 10 000 testexempel, framtaget av LeCun m.fl. 1998. Att ge denna kontext ökar trovärdigheten och källkritiken.

---

## Övriga tekniska unexaktheter

**27. "Garanterat fungerande" om kodbibliotek (avsnitt 3.1) – se punkt 14 ovan**

**28. "Kognitiv avlastning" – ofullständig nyansering (avsnitt 1.2)**
Texten framställer kognitiv avlastning (cognitive offloading) som entydigt negativt. Forskning visar att kognitiv avlastning i rätt sammanhang ökar prestanda och frigör kognitiva resurser för mer avancerade uppgifter. GPS-exemplet nämns men utan att källhänvisa till forskningen. Texten bör nyansera att detta är ett aktivt debatterat forskningsområde, inte ett etablerat faktum.

**29. Påvens dunjacka – Midjourney (avsnitt 1.2)**
Texten påstår att bilden på påven i dunjacka "skapades med AI-verktyget Midjourney". Den virala bilden från mars 2023 skapades med Midjourney v5 – det stämmer. Inget faktafel, men det saknas källhänvisning.

**30. "Tre i rad har 362 880 dragsekvenser" (avsnitt 3.3)**
Texten påstår att Tre i rad har "362 880 dragsekvenser (9 · 8 · 7 · … · 2 · 1)". Det är 9! = 362 880 sekvenser om alla rutor fylls, men en stor andel av dessa slutar i vinst innan alla rutor är fyllda. Antalet faktiska giltiga spelsekvenser i Tre i rad är ca 255 168, inte 362 880. Formeln ignorerar att spelet avslutas vid vinst. Textens formulering bör förtydligas: "upp till 362 880 möjliga dragsekvenser om spelet alltid fortsätter till sista rutan."

---

*Totalt: 30 punkter identifierade.*
