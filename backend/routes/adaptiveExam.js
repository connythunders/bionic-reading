const express = require('express');
const aiExamGenerator = require('../services/aiExamGenerator');

const router = express.Router();

const VALID_MODES = new Set(['topic', 'text']);

// GET /api/adaptive-exam/status - Kolla om AI-frågegenerering är konfigurerad
router.get('/status', (req, res) => {
  res.json({ aiEnabled: aiExamGenerator.isEnabled() });
});

// POST /api/adaptive-exam/sessions - Skapa en ny provsession
router.post('/sessions', async (req, res) => {
  try {
    const { studentName, subject, grade, mode, topic, sourceText, timeLimitMinutes } = req.body;

    if (!studentName || !subject || !grade || !mode || !topic || !timeLimitMinutes) {
      return res.status(400).json({ error: 'studentName, subject, grade, mode, topic och timeLimitMinutes krävs' });
    }

    if (!VALID_MODES.has(mode)) {
      return res.status(400).json({ error: 'mode måste vara "topic" eller "text"' });
    }

    if (mode === 'text' && !sourceText) {
      return res.status(400).json({ error: 'sourceText krävs för textbaserat läge' });
    }

    const pool = req.app.locals.pool;
    const result = await pool.query(
      `INSERT INTO adaptive_exam_sessions
        (student_name, subject, grade, exam_mode, topic, source_text, time_limit_minutes)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, created_at`,
      [studentName, subject, grade, mode, topic, sourceText || null, timeLimitMinutes]
    );

    res.status(201).json({
      sessionId: result.rows[0].id,
      createdAt: result.rows[0].created_at,
      aiEnabled: aiExamGenerator.isEnabled(),
    });
  } catch (error) {
    console.error('Create adaptive exam session error:', error);
    res.status(500).json({ error: 'Kunde inte skapa provsession' });
  }
});

// POST /api/adaptive-exam/sessions/:id/question - Generera nästa fråga med AI
router.post('/sessions/:id/question', async (req, res) => {
  try {
    const { id } = req.params;
    const { difficulty, askedQuestions } = req.body;

    if (difficulty === undefined || difficulty === null) {
      return res.status(400).json({ error: 'difficulty krävs' });
    }

    if (!aiExamGenerator.isEnabled()) {
      return res.status(200).json({ aiEnabled: false });
    }

    const pool = req.app.locals.pool;
    const sessionResult = await pool.query(
      'SELECT * FROM adaptive_exam_sessions WHERE id = $1',
      [id]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Provsession hittades inte' });
    }

    const session = sessionResult.rows[0];

    const { question, hints } = await aiExamGenerator.generateQuestion({
      subject: session.subject,
      topic: session.topic,
      grade: session.grade,
      difficulty,
      mode: session.exam_mode,
      sourceText: session.source_text,
      askedQuestions: Array.isArray(askedQuestions) ? askedQuestions : [],
    });

    res.json({ aiEnabled: true, question, hints, difficulty });
  } catch (error) {
    console.error('Generate adaptive exam question error:', error);
    // Låt klienten falla tillbaka till lokala frågemallar istället för att blockera provet
    res.status(200).json({ aiEnabled: true, error: 'AI-generering misslyckades' });
  }
});

// POST /api/adaptive-exam/sessions/:id/answers - Spara ett elevsvar
router.post('/sessions/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const { question, answer, difficulty, qualityScore } = req.body;

    if (!question || !answer || difficulty === undefined || difficulty === null) {
      return res.status(400).json({ error: 'question, answer och difficulty krävs' });
    }

    const pool = req.app.locals.pool;
    const result = await pool.query(
      `INSERT INTO adaptive_exam_answers (session_id, question, answer, difficulty, quality_score)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, answered_at`,
      [id, question, answer, difficulty, qualityScore ?? null]
    );

    res.status(201).json({ answerId: result.rows[0].id, answeredAt: result.rows[0].answered_at });
  } catch (error) {
    console.error('Save adaptive exam answer error:', error);
    res.status(500).json({ error: 'Kunde inte spara svaret' });
  }
});

// POST /api/adaptive-exam/sessions/:id/finish - Markera provet som avslutat
router.post('/sessions/:id/finish', async (req, res) => {
  try {
    const { id } = req.params;
    const { answeredQuestions, maxDifficulty, timeUsedSeconds } = req.body;

    const pool = req.app.locals.pool;
    const result = await pool.query(
      `UPDATE adaptive_exam_sessions
       SET answered_questions = $1, max_difficulty = $2, time_used_seconds = $3, finished_at = CURRENT_TIMESTAMP
       WHERE id = $4
       RETURNING id`,
      [answeredQuestions || 0, maxDifficulty || 0, timeUsedSeconds || 0, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Provsession hittades inte' });
    }

    res.json({ ok: true });
  } catch (error) {
    console.error('Finish adaptive exam session error:', error);
    res.status(500).json({ error: 'Kunde inte avsluta provsessionen' });
  }
});

// GET /api/adaptive-exam/sessions - Lista provsessioner (för lärarens granskning)
router.get('/sessions', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const result = await pool.query(
      `SELECT id, student_name, subject, grade, exam_mode, topic,
              answered_questions, max_difficulty, time_used_seconds,
              created_at, finished_at
       FROM adaptive_exam_sessions
       ORDER BY created_at DESC
       LIMIT 100`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('List adaptive exam sessions error:', error);
    res.status(500).json({ error: 'Kunde inte hämta provsessioner' });
  }
});

// GET /api/adaptive-exam/sessions/:id - Hämta en provsession med alla svar
router.get('/sessions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = req.app.locals.pool;

    const sessionResult = await pool.query(
      'SELECT * FROM adaptive_exam_sessions WHERE id = $1',
      [id]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Provsession hittades inte' });
    }

    const answersResult = await pool.query(
      'SELECT question, answer, difficulty, quality_score, answered_at FROM adaptive_exam_answers WHERE session_id = $1 ORDER BY answered_at ASC',
      [id]
    );

    res.json({
      session: sessionResult.rows[0],
      answers: answersResult.rows,
    });
  } catch (error) {
    console.error('Get adaptive exam session error:', error);
    res.status(500).json({ error: 'Kunde inte hämta provsessionen' });
  }
});

module.exports = router;
