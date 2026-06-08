# PLAN.md – Innehållskarta för AI-läromedlet

## Källfiler
- Kapitel 1: Introduktion till AI (~79 000 tecken)
- Kapitel 2: AI i samhället (~31 000 tecken)
- Kapitel 3: Tekniken bakom AI: Programmering (~53 000 tecken)
- Kapitel 4: Tekniken bakom AI: Inlärning (~70 000 tecken)
- Kapitel 5: Projektarbeten i AI (~10 000 tecken)

## Kapitelindelning och rubriker

### Kapitel 1: Introduktion till AI
- Avsnitt 1.1: Vad är artificiell intelligens?
  - Turingtestet
  - Smal AI vs. Stark AI (AGI)
  - AI:s förmågor (7 stycken)
  - Grundprincipen för AI
  - Det kinesiska rummet (Searle)
- Avsnitt 1.2: Utvecklingen av AI
  - Historisk tidslinje (1950–2022)
  - AI-vintrar
  - Maskininlärningens genombrott
  - Generativ AI
- Avsnitt 1.3: Stora idéer inom AI
  - AI-modell (principer)
  - Åtta principer som beskriver AI
  - Förstärkningsinlärning

### Kapitel 2: AI i samhället
- Avsnitt 2.1: AI och etik
  - Etiska principer (5 dimensioner)
  - Integritet och säkerhet
  - Desinformation och deepfakes
  - Förklarbarhet och transparens
  - Algoritmisk partiskhet (bias)
  - Proxydata
  - Plagiering och upphovsrätt
  - EU:s riktlinjer och AI Act
- Avsnitt 2.2: AI och demokrati
  - Filterbubblor
  - Informationskrig
  - Maktkoncentration
  - Arbetsmarknaden

### Kapitel 3: Tekniken bakom AI: Programmering
- Avsnitt 3.1: Programmering
  - Programspråket Python
  - Kodbibliotek (NumPy, Pandas, TensorFlow, PyTorch)
  - Grunderna: variabler, datatyper
  - Villkor (if/elif/else)
  - Loopar (for/while)
  - Funktioner (def)
  - Algoritmer (definition, egenskaper)
- Avsnitt 3.2: Algoritmer och problemlösning
  - Exempel och pseudokod
  - Programmeringsfel (syntax, körtid, logik)
  - Google Colab (hur man använder)
- Avsnitt 3.3: Sökning
  - BFS, DFS
  - A* (heuristisk sökning)
  - Minimax och alfa-beta-beskärning
  - Spelteori (schack, tre i rad)

### Kapitel 4: Tekniken bakom AI: Inlärning
- Avsnitt 4.1: Maskininlärning
  - Vad är maskininlärning?
  - Jämförelse med vanlig programmering
  - Data: typer, uppdelning (träning/validering/test)
  - Vanliga dataproblem (bias, brus, saknade värden)
  - Dataförbättring
  - AI-pipelinen (7 steg)
- Avsnitt 4.2: Typer av maskininlärning
  - Övervakad: regression och klassificering
  - Oövervakad: klustring, dimensionsreduktion
  - Förstärkningsinlärning
- Avsnitt 4.3: Neurala nätverk
  - Struktur (indatalager, dolda lager, utdatalager)
  - Aktivitetsfunktioner (ReLU, sigmoid)
  - Bakåtpropagering
  - Djupinlärning
  - CNN (konvolutionsnätverk)
  - Transformer-arkitekturen
  - LLM (stora språkmodeller)
  - Hallucination

### Kapitel 5: Projektarbeten i AI
- Projekt 1: AI i kultur och media (filmanalys etc.)
- Projekt 2: Praktisk tillämpning av AI (Google Colab)
- Projekt 3: AI och samhälle (samhällsanalys)
- Projekt 4: Granska ett AI-verktyg (strukturerad granskning)

## Nyckelbegrepp (totalt ~50 st)
Artificiell intelligens, Turingtestet, Smal AI, Stark AI/AGI, Generativ AI,
Maskininlärning, Övervakad inlärning, Oövervakad inlärning, Förstärkningsinlärning,
Regression, Klassificering, Klustring, Neuralt nätverk, Djupinlärning, LLM,
Transformer, Hallucination, Bias, Overfitting, Träningsdata, Valideringsdata,
Testdata, Python, Algoritm, Loop, Funktion, BFS, DFS, A*, Minimax,
Etik, Deepfake, Desinformation, Algoritmisk partiskhet, Proxydata,
Transparens, Filterbubbla, AI Act, Integritet, Plagiering

## Filstruktur (byggd)
```
ai-laromedel/
├── index.html        ← startsida med kapitelöversikt
├── kapitel-01.html   ← Introduktion till AI
├── kapitel-02.html   ← AI i samhället
├── kapitel-03.html   ← Programmering
├── kapitel-04.html   ← Inlärning
├── kapitel-05.html   ← Projektarbeten
├── quiz.html         ← Avslutande summering-quiz (20 frågor)
├── styles.css        ← Delad layout och typografi
└── script.js         ← Bionic Reading, tillgänglighet, quiz-motor
```
