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

-- Visa tabellstruktur
\d quiz_results
