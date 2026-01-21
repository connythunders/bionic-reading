# AI Quiz Generator

En intelligent quiz-applikation som automatiskt genererar quiz-frågor från dina studiematerial (PDF eller Word-dokument) med hjälp av AI.

## Funktioner

- **Automatisk Quiz-Generering**: Ladda upp ett PDF eller Word-dokument och få 25 quiz-frågor automatiskt genererade
- **AI-Driven Feedback**: Efter quizet får eleven personlig feedback baserat på sina svar, med tips om vad de behärskar och vad de behöver träna mer på
- **Flervalsfrågor**: Alla frågor har 4 svarsalternativ med endast ett korrekt svar
- **Användarvänligt Gränssnitt**: Drag-and-drop filuppladdning, progress bar och tydlig feedback
- **Databaslagring**: Alla quiz och resultat sparas för framtida referens

## Teknisk Stack

### Frontend
- Vanilla JavaScript (ingen externa ramverk)
- HTML5 & CSS3
- Responsiv design

### Backend
- Node.js med Express.js
- PostgreSQL databas
- Anthropic Claude AI API för quiz-generering och feedback
- Multer för filuppladdning
- pdf-parse för PDF-textextraktion
- mammoth för Word-textextraktion

## Installation

### 1. Installera Dependencies

```bash
cd backend
npm install
```

### 2. Konfigurera Environment Variables

Skapa en `.env` fil i `backend/` mappen baserad på `.env.example`:

```bash
cp .env.example .env
```

Redigera `.env` och lägg till din Anthropic API-nyckel:

```
ANTHROPIC_API_KEY=din_api_nyckel_här
```

Få din API-nyckel från: https://console.anthropic.com/

### 3. Sätt upp Databasen

Om du använder Docker:

```bash
docker-compose up -d
```

Databasen kommer automatiskt att initialiseras med rätt tabeller från `init.sql`.

Om du använder en lokal PostgreSQL-instans, kör:

```bash
psql -U postgres -d quizdb -f init.sql
```

### 4. Starta Backend

```bash
cd backend
npm run dev
```

Backend körs nu på `http://localhost:3000`

### 5. Öppna Applikationen

Öppna `ai-quiz-generator.html` i din webbläsare, eller navigera till den från huvudsidan `index.html`.

## Användning

### För Elever

1. **Ladda upp dokument**
   - Klicka på "Välj fil" eller dra och släpp en PDF eller Word-fil
   - Max filstorlek: 10MB
   - Filen måste innehålla minst 100 tecken text

2. **Generera Quiz**
   - Klicka på "Generera Quiz med AI"
   - Vänta medan AI analyserar dokumentet och skapar 25 frågor
   - Detta tar vanligtvis 10-30 sekunder

3. **Genomför Quiz**
   - Svara på alla 25 frågor genom att klicka på ett svarsalternativ
   - Grönt = rätt svar, Rött = fel svar
   - Progress bar visar hur långt du kommit

4. **Se Resultat**
   - Efter sista frågan får du ditt resultat och procent
   - AI genererar personlig feedback baserat på dina svar
   - Feedbacken visar vad du kan bra och vad du behöver träna mer på

### För Lärare

Applikationen kan användas för att:
- Skapa quiz snabbt från läromaterial
- Ge eleverna personlig feedback automatiskt
- Spåra elevernas resultat i databasen
- Återanvända quiz för samma dokument

## API Endpoints

### `POST /api/quiz/upload`
Laddar upp och extraherar text från fil.

**Request:**
- FormData med `file` field (PDF eller DOCX)

**Response:**
```json
{
  "documentId": 123,
  "filename": "dokument.pdf",
  "wordCount": 1500,
  "textPreview": "Första 500 tecken...",
  "uploadedAt": "2026-01-21T10:30:00Z"
}
```

### `POST /api/quiz/generate`
Genererar quiz från dokument med AI.

**Request:**
```json
{
  "documentId": 123,
  "questionCount": 25
}
```

**Response:**
```json
{
  "quizSessionId": 456,
  "questions": [
    {
      "question": "Vad är...?",
      "options": ["A", "B", "C", "D"],
      "correct": 0,
      "topic": "Huvudtema",
      "difficulty": "medium"
    }
  ]
}
```

### `POST /api/quiz/evaluate`
Utvärderar quiz och genererar AI-feedback.

**Request:**
```json
{
  "quizSessionId": 456,
  "userAnswers": [0, 2, 1, ...]
}
```

**Response:**
```json
{
  "resultId": 789,
  "score": 18,
  "totalQuestions": 25,
  "percentage": 72.00,
  "aiFeedback": "Bra jobbat! Du visar god förståelse...",
  "completedAt": "2026-01-21T11:00:00Z"
}
```

## Databasschema

### `documents`
- `id`: SERIAL PRIMARY KEY
- `filename`: VARCHAR(255) - Filnamn på servern
- `original_filename`: VARCHAR(255) - Originalfilnamn
- `file_type`: VARCHAR(10) - 'pdf' eller 'docx'
- `extracted_text`: TEXT - Extraherad text från dokumentet
- `word_count`: INTEGER - Antal ord i texten
- `uploaded_at`: TIMESTAMP - När dokumentet laddades upp

### `quiz_sessions`
- `id`: SERIAL PRIMARY KEY
- `document_id`: INTEGER - Referens till documents
- `questions`: JSONB - Array av quiz-frågor
- `created_at`: TIMESTAMP - När quizet skapades

### `ai_quiz_results`
- `id`: SERIAL PRIMARY KEY
- `quiz_session_id`: INTEGER - Referens till quiz_sessions
- `score`: INTEGER - Antal rätt svar
- `total_questions`: INTEGER - Totalt antal frågor
- `percentage`: DECIMAL(5,2) - Procent rätt
- `answers`: JSONB - Array av användarens svar
- `ai_feedback`: TEXT - AI-genererad feedback
- `completed_at`: TIMESTAMP - När quizet slutfördes

## Säkerhet

- **Filvalidering**: Endast PDF och DOCX-filer accepteras
- **Storleksbegränsning**: Max 10MB per fil
- **CORS**: Konfigurerat för localhost
- **Environment Variables**: API-nycklar lagras aldrig i koden
- **File Cleanup**: Uppladdade filer raderas efter textextraktion

## Troubleshooting

### "AI kunde inte generera quiz"
- Kontrollera att `ANTHROPIC_API_KEY` är korrekt satt i `.env`
- Verifiera att du har credits kvar på ditt Anthropic-konto
- Kontrollera att dokumentet innehåller tillräckligt med text

### "Databasanslutning misslyckades"
- Kontrollera att PostgreSQL körs
- Verifiera databasuppgifter i `.env`
- Kör `docker-compose up -d` om du använder Docker

### "Filen kunde inte laddas upp"
- Kontrollera filstorleken (max 10MB)
- Verifiera att filen är PDF eller DOCX
- Se till att backend körs på port 3000

## Framtida Förbättringar

- Anpassad svårighetsgrad och antal frågor
- Stöd för bilder i PDF (OCR)
- Exportera quiz som PDF
- Dela quiz via länk
- Analytics och visualisering av resultat
- Flashcards från samma dokument
- Flerspråkigt stöd

## Licens

Detta projekt är en del av Bionic Reading projektet.
