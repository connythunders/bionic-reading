const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL pool
const pool = new Pool({
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'quizdb',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
});

// Test databasanslutning
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Databasanslutning misslyckades:', err);
  } else {
    console.log('Databasanslutning lyckades:', res.rows[0].now);
  }
});

// Gör pool tillgänglig för routes
app.locals.pool = pool;

// Import routes
const quizRoutes = require('./routes/quiz');
const studyRoutes = require('./routes/study');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend körs!' });
});

// AI Quiz routes
app.use('/api/quiz', quizRoutes);

// Study platform routes
app.use('/api/study', studyRoutes);

// Hämta alla quiz-resultat
app.get('/api/results', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM quiz_results ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte hämta resultat' });
  }
});

// Spara ett quiz-resultat
app.post('/api/results', async (req, res) => {
  const { score, total_questions, percentage } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO quiz_results (score, total_questions, percentage) VALUES ($1, $2, $3) RETURNING *',
      [score, total_questions, percentage]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Kunde inte spara resultat' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend körs på port ${PORT}`);
});
