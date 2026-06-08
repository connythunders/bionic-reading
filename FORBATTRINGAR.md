# FÖRBÄTTRINGAR.md – Prioriterad åtgärdslista

Sammanställd från: granskning-fakta.md, granskning-pedagogik.md,
granskning-tillganglighet.md, granskning-sprak.md

---

## PRIORITET 1 – Faktafel (tillämpad i webbplatsen)

| # | Problem | Källa | Åtgärd |
|---|---------|-------|--------|
| F1 | "ChatGPT var den första AI:n som släpptes på bred front" – felaktig formulering | K1 | Omformulerat till "ChatGPT lanserades på bred front 2022" |
| F2 | Alan Turing kallas "datavetare" – han var matematiker/logiker | K1 | Korrigerat till "brittiske matematikern Alan Turing" |
| F3 | Kodkommentar `"3"` kallas "integer" men är en sträng | K3 | Korrekt kommentar i HTML-versionen av kodexempel |
| F4 | Bakåtpropagering: "fel" propageras bakåt → ska vara "gradienter" | K4 | Korrigerat till "gradienter propageras bakåt" |
| F5 | Amazons rekryterings-AI "utvecklades 2018" – projektet startade 2014, lades ned 2018 | K2 | Referensen till konkret år undvikits |

## PRIORITET 2 – Pedagogiska förbättringar (delvis tillämpad)

| # | Problem | Åtgärd |
|---|---------|--------|
| P1 | Saknas sammanfattningar i källtexten | Lagts till i alla kapitel som "Sammanfattnings-box" |
| P2 | Inga självtestfrågor i källtexten | 4 frågor per kapitel skapade (20 totalt), inkl. facit |
| P3 | Faktarutor placerade efter löptext som förutsätter begreppet | Omstrukturerat: faktarutor placeras FÖRE relaterad löptext |
| P4 | K5 saknar begrepsankare till tidigare kapitel | Lagt till hänvisningar till K3 och K4 i projektbeskrivningar |
| P5 | K3 och K4 är tekniskt tunga | Lagt till info-boxar med förtydliganden och jämförelser |

## PRIORITET 3 – Tillgänglighet NPF (tillämpad i webbplatsen)

| # | Problem | Åtgärd |
|---|---------|--------|
| T1 | Långa meningar (40–70 ord) | Brutna till kortare meningar i HTML-versionen (max ~25 ord) |
| T2 | Täta textblock utan visuell luft | Lagt till section-dividers, faktarutor och listor |
| T3 | Okonsekventa synonymer (bias/partiskhet/snedvridning) | Bias används genomgående med "partiskhet" som förklaring |
| T4 | Saknad strukturöversikt i K3 avsnitt 3.3 | Inledande lista med sökmetoder lagd till |
| T5 | Ord introduceras utan förklaring | Nyckelbegrepp-sektion i slutet av varje kapitel |

## PRIORITET 4 – Språkliga förbättringar (delvis tillämpad)

| # | Problem | Åtgärd |
|---|---------|--------|
| S1 | Dubblerade ord ("att att", "kan can") | Rättat i HTML-versionen |
| S2 | "stämmer överrens" → "stämmer överens" | Rättat |
| S3 | "tredemisnionella" → "tredimensionella" | Rättat i K3 |
| S4 | Engelska rubriker (t.ex. "Hallucination") | Använt förklaring på svenska med engelska termen i parentes |
| S5 | "AI-vår" med inkonsekvent bindestreck | Konsekvent bindestrecksanvändning i HTML |

## TILLÄMPADE GENOMGRIPANDE FÖRBÄTTRINGAR

### Läsbarhet
- Alla stycken begränsade till 3–5 meningar
- Listor används för uppräkningar (aldrig inbäddade i löptext)
- Faktarutor lyfter ut nyckelinformation

### Tillgänglighet
- Bionic Reading-toggle (script.js)
- Justerbar textstorlek (A+/A−)
- Justerbart radavstånd
- Byt till Atkinson Hyperlegible (lättläst typsnitt)
- Mörkt/ljust läge
- Alla inställningar sparas i localStorage

### Navigation
- Föregående/Nästa-knappar på alla kapitel
- Brödsmulor på alla sidor
- Läsframstegsindikator (progress bar)

### Quiz
- 20 frågor från alla kapitel
- Slumpad ordning (Fisher-Yates shuffle)
- Omedelbar återkoppling med förklaring
- Genomgång av alla svar efteråt
- Knapp för att göra om quizet
