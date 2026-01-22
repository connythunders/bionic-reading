const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const fileParser = require('../services/fileParser');
const aiQuizGenerator = require('../services/aiQuizGenerator');
const aiEvaluator = require('../services/aiEvaluator');

const router = express.Router();

// Konfigurera Multer för filuppladdning
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
      cb(null, uploadDir);
    } catch (error) {
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10 MB
  },
  fileFilter: (req, file, cb) => {
    const fileType = fileParser.validateFileType(file.mimetype);
    if (fileType) {
      cb(null, true);
    } else {
      cb(new Error('Endast PDF och DOCX-filer är tillåtna'));
    }
  }
});

// POST /api/quiz/upload - Ladda upp och extrahera text från fil
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Ingen fil uppladdad' });
    }

    const fileType = fileParser.validateFileType(req.file.mimetype);
    const filePath = req.file.path;

    // Extrahera text från filen
    const { text, wordCount } = await fileParser.parseFile(filePath, fileType);

    if (!text || text.length < 100) {
      // Radera filen om den inte innehåller tillräckligt med text
      await fs.unlink(filePath);
      return res.status(400).json({
        error: 'Filen innehåller för lite text. Minst 100 tecken krävs.'
      });
    }

    // Spara dokument i databasen
    const pool = req.app.locals.pool;
    const result = await pool.query(
      `INSERT INTO documents (filename, original_filename, file_type, extracted_text, word_count)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, filename, original_filename, word_count, uploaded_at`,
      [req.file.filename, req.file.originalname, fileType, text, wordCount]
    );

    const document = result.rows[0];

    // Radera den uppladdade filen efter att texten extraherats
    await fs.unlink(filePath);

    res.json({
      documentId: document.id,
      filename: document.original_filename,
      wordCount: document.word_count,
      textPreview: text.substring(0, 500) + (text.length > 500 ? '...' : ''),
      uploadedAt: document.uploaded_at
    });

  } catch (error) {
    console.error('Upload error:', error);

    // Radera filen om något gick fel
    if (req.file && req.file.path) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    res.status(500).json({
      error: error.message || 'Kunde inte ladda upp filen'
    });
  }
});

// POST /api/quiz/generate - Generera quiz från dokument
router.post('/generate', async (req, res) => {
  try {
    const { documentId, questionCount = 25 } = req.body;

    if (!documentId) {
      return res.status(400).json({ error: 'documentId krävs' });
    }

    const pool = req.app.locals.pool;

    // Hämta dokument från databasen
    const docResult = await pool.query(
      'SELECT * FROM documents WHERE id = $1',
      [documentId]
    );

    if (docResult.rows.length === 0) {
      return res.status(404).json({ error: 'Dokument hittades inte' });
    }

    const document = docResult.rows[0];

    // Kontrollera om det redan finns ett quiz för detta dokument
    const existingQuiz = await pool.query(
      'SELECT * FROM quiz_sessions WHERE document_id = $1 ORDER BY created_at DESC LIMIT 1',
      [documentId]
    );

    let questions;
    let quizSessionId;

    if (existingQuiz.rows.length > 0 && existingQuiz.rows[0].questions.length === questionCount) {
      // Återanvänd befintligt quiz
      questions = existingQuiz.rows[0].questions;
      quizSessionId = existingQuiz.rows[0].id;
      console.log('Återanvänder befintligt quiz för dokument', documentId);
    } else {
      // Generera nytt quiz med AI
      console.log('Genererar nytt quiz med AI för dokument', documentId);
      questions = await aiQuizGenerator.generateQuiz(document.extracted_text, questionCount);

      // Spara quiz-session
      const sessionResult = await pool.query(
        'INSERT INTO quiz_sessions (document_id, questions) VALUES ($1, $2) RETURNING id',
        [documentId, JSON.stringify(questions)]
      );

      quizSessionId = sessionResult.rows[0].id;
    }

    res.json({
      quizSessionId: quizSessionId,
      documentId: documentId,
      documentName: document.original_filename,
      questionCount: questions.length,
      questions: questions
    });

  } catch (error) {
    console.error('Quiz generation error:', error);
    res.status(500).json({
      error: error.message || 'Kunde inte generera quiz'
    });
  }
});

// POST /api/quiz/evaluate - Utvärdera quiz och ge AI-feedback
router.post('/evaluate', async (req, res) => {
  try {
    const { quizSessionId, userAnswers } = req.body;

    if (!quizSessionId || !Array.isArray(userAnswers)) {
      return res.status(400).json({ error: 'quizSessionId och userAnswers krävs' });
    }

    const pool = req.app.locals.pool;

    // Hämta quiz-session
    const sessionResult = await pool.query(
      'SELECT * FROM quiz_sessions WHERE id = $1',
      [quizSessionId]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz-session hittades inte' });
    }

    const session = sessionResult.rows[0];
    const questions = session.questions;

    // Beräkna resultat
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct) {
        score++;
      }
    });

    const totalQuestions = questions.length;
    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    // Generera AI-feedback
    const aiFeedback = await aiEvaluator.generateFeedback({
      questions: questions,
      userAnswers: userAnswers,
      score: score,
      totalQuestions: totalQuestions
    });

    // Spara resultat i databasen
    const resultInsert = await pool.query(
      `INSERT INTO ai_quiz_results (quiz_session_id, score, total_questions, percentage, answers, ai_feedback)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, completed_at`,
      [quizSessionId, score, totalQuestions, percentage, JSON.stringify(userAnswers), aiFeedback]
    );

    const result = resultInsert.rows[0];

    res.json({
      resultId: result.id,
      score: score,
      totalQuestions: totalQuestions,
      percentage: parseFloat(percentage),
      aiFeedback: aiFeedback,
      completedAt: result.completed_at
    });

  } catch (error) {
    console.error('Evaluation error:', error);
    res.status(500).json({
      error: error.message || 'Kunde inte utvärdera quiz'
    });
  }
});

// GET /api/quiz/sessions/:id - Hämta en quiz-session
router.get('/sessions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const pool = req.app.locals.pool;

    const result = await pool.query(
      `SELECT qs.*, d.original_filename, d.word_count
       FROM quiz_sessions qs
       JOIN documents d ON qs.document_id = d.id
       WHERE qs.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Quiz-session hittades inte' });
    }

    res.json(result.rows[0]);

  } catch (error) {
    console.error('Get session error:', error);
    res.status(500).json({ error: 'Kunde inte hämta quiz-session' });
  }
});

// GET /api/quiz/history - Hämta quiz-historik
router.get('/history', async (req, res) => {
  try {
    const pool = req.app.locals.pool;

    const result = await pool.query(
      `SELECT
        aqr.id,
        aqr.score,
        aqr.total_questions,
        aqr.percentage,
        aqr.completed_at,
        d.original_filename
       FROM ai_quiz_results aqr
       JOIN quiz_sessions qs ON aqr.quiz_session_id = qs.id
       JOIN documents d ON qs.document_id = d.id
       ORDER BY aqr.completed_at DESC
       LIMIT 50`
    );

    res.json(result.rows);

  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Kunde inte hämta historik' });
  }
});

module.exports = router;
