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

-- Tabell för studiesessioner
CREATE TABLE IF NOT EXISTS study_sessions (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    study_mode VARCHAR(20) NOT NULL DEFAULT 'read',
    duration_seconds INTEGER DEFAULT 0,
    chunks_completed INTEGER DEFAULT 0,
    total_chunks INTEGER DEFAULT 0,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- Tabell för flashcards
CREATE TABLE IF NOT EXISTS flashcards (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    front_text TEXT NOT NULL,
    back_text TEXT NOT NULL,
    difficulty VARCHAR(10) DEFAULT 'medium',
    times_shown INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabell för elevframsteg
CREATE TABLE IF NOT EXISTS student_progress (
    id SERIAL PRIMARY KEY,
    document_id INTEGER REFERENCES documents(id) ON DELETE CASCADE,
    xp_earned INTEGER DEFAULT 0,
    study_streak INTEGER DEFAULT 0,
    last_study_date DATE,
    total_study_time INTEGER DEFAULT 0,
    flashcards_mastered INTEGER DEFAULT 0,
    quizzes_completed INTEGER DEFAULT 0,
    best_quiz_score DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index for study features
CREATE INDEX idx_study_sessions_document ON study_sessions(document_id);
CREATE INDEX idx_flashcards_document ON flashcards(document_id);
CREATE INDEX idx_student_progress_document ON student_progress(document_id);

-- Visa tabellstruktur
\d quiz_results
