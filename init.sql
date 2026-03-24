-- Initialisera databas för quiz-applikationen

-- Skapa tabell för quiz-resultat
CREATE TABLE IF NOT EXISTS quiz_results (
    id SERIAL PRIMARY KEY,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skapa index för snabbare queries
CREATE INDEX idx_created_at ON quiz_results(created_at DESC);

-- Lägg till exempeldata (valfritt)
INSERT INTO quiz_results (score, total_questions, percentage) VALUES
    (12, 15, 80.00),
    (10, 15, 66.67),
    (15, 15, 100.00),
    (8, 15, 53.33);

-- Tabell för uppladdade dokument
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(10) NOT NULL,
    extracted_text TEXT NOT NULL,
    word_count INTEGER,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabell för genererade quiz-sessioner
CREATE TABLE IF NOT EXISTS quiz_sessions (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    questions JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Utökad tabell för AI quiz-resultat
CREATE TABLE IF NOT EXISTS ai_quiz_results (
    id SERIAL PRIMARY KEY,
    quiz_session_id INTEGER REFERENCES quiz_sessions(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    answers JSONB NOT NULL,
    ai_feedback TEXT,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index för prestanda
CREATE INDEX idx_documents_uploaded ON documents(uploaded_at DESC);
CREATE INDEX idx_quiz_sessions_document ON quiz_sessions(document_id);
CREATE INDEX idx_ai_quiz_results_session ON ai_quiz_results(quiz_session_id);

-- Visa tabellstruktur
\d quiz_results
