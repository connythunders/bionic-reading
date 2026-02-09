const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const fileParser = require('../services/fileParser');
const aiStudyHelper = require('../services/aiStudyHelper');

const router = express.Router();

// Multer-konfiguration
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
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const fileType = fileParser.validateFileType(file.mimetype);
    if (fileType) {
      cb(null, true);
    } else {
      cb(new Error('Endast PDF, DOCX och PPTX-filer är tillåtna'));
    }
  }
});

// POST /api/study/upload - Ladda upp fil och extrahera text
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Ingen fil uppladdad' });
    }

    const fileType = fileParser.validateFileType(req.file.mimetype);
    const filePath = req.file.path;
    const { text, wordCount } = await fileParser.parseFile(filePath, fileType);

    if (!text || text.length < 50) {
      await fs.unlink(filePath);
      return res.status(400).json({
        error: 'Filen innehåller för lite text. Minst 50 tecken krävs.'
      });
    }

    const pool = req.app.locals.pool;
    const result = await pool.query(
      `INSERT INTO documents (filename, original_filename, file_type, extracted_text, word_count)
       VALUES ($1, $2, $3, $4, $5) RETURNING id, original_filename, word_count, uploaded_at`,
      [req.file.filename, req.file.originalname, fileType, text, wordCount]
    );

    await fs.unlink(filePath);

    const document = result.rows[0];
    const chunks = aiStudyHelper.chunkText(text);

    res.json({
      documentId: document.id,
      filename: document.original_filename,
      wordCount: document.word_count,
      chunkCount: chunks.length,
      textPreview: text.substring(0, 300) + (text.length > 300 ? '...' : ''),
      uploadedAt: document.uploaded_at
    });
  } catch (error) {
    console.error('Study upload error:', error);
    if (req.file && req.file.path) {
      try { await fs.unlink(req.file.path); } catch (e) {}
    }
    res.status(500).json({ error: error.message || 'Kunde inte ladda upp filen' });
  }
});

// GET /api/study/document/:id - Hämta dokument med chunked text
router.get('/document/:id', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const result = await pool.query('SELECT * FROM documents WHERE id = $1', [req.params.id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Dokument hittades inte' });
    }

    const doc = result.rows[0];
    const bionicLevel = req.query.bionic || 'none';
    const chunks = aiStudyHelper.chunkText(doc.extracted_text);

    const processedChunks = chunks.map(chunk => ({
      ...chunk,
      bionicHtml: bionicLevel !== 'none'
        ? aiStudyHelper.convertToBionicReading(chunk.text, bionicLevel)
        : null
    }));

    res.json({
      id: doc.id,
      filename: doc.original_filename,
      wordCount: doc.word_count,
      chunks: processedChunks,
      totalChunks: processedChunks.length
    });
  } catch (error) {
    console.error('Get document error:', error);
    res.status(500).json({ error: 'Kunde inte hämta dokument' });
  }
});

// POST /api/study/flashcards - Generera flashcards
router.post('/flashcards', async (req, res) => {
  try {
    const { documentId, count = 15 } = req.body;
    if (!documentId) return res.status(400).json({ error: 'documentId krävs' });

    const pool = req.app.locals.pool;
    const docResult = await pool.query('SELECT * FROM documents WHERE id = $1', [documentId]);
    if (docResult.rows.length === 0) {
      return res.status(404).json({ error: 'Dokument hittades inte' });
    }

    // Kolla om flashcards redan finns
    const existing = await pool.query(
      'SELECT * FROM flashcards WHERE document_id = $1 ORDER BY id',
      [documentId]
    );

    if (existing.rows.length > 0) {
      return res.json({
        documentId,
        flashcards: existing.rows.map(fc => ({
          id: fc.id,
          front: fc.front_text,
          back: fc.back_text,
          difficulty: fc.difficulty,
          timesShown: fc.times_shown,
          timesCorrect: fc.times_correct
        })),
        cached: true
      });
    }

    const flashcards = await aiStudyHelper.generateFlashcards(
      docResult.rows[0].extracted_text, count
    );

    // Spara flashcards
    const savedCards = [];
    for (const fc of flashcards) {
      const insertResult = await pool.query(
        `INSERT INTO flashcards (document_id, front_text, back_text, difficulty)
         VALUES ($1, $2, $3, $4) RETURNING id`,
        [documentId, fc.front, fc.back, fc.difficulty]
      );
      savedCards.push({
        id: insertResult.rows[0].id,
        front: fc.front,
        back: fc.back,
        difficulty: fc.difficulty,
        timesShown: 0,
        timesCorrect: 0
      });
    }

    res.json({ documentId, flashcards: savedCards, cached: false });
  } catch (error) {
    console.error('Flashcard generation error:', error);
    res.status(500).json({ error: error.message || 'Kunde inte generera flashcards' });
  }
});

// POST /api/study/summary - Generera studiesammanfattning
router.post('/summary', async (req, res) => {
  try {
    const { documentId } = req.body;
    if (!documentId) return res.status(400).json({ error: 'documentId krävs' });

    const pool = req.app.locals.pool;
    const docResult = await pool.query('SELECT * FROM documents WHERE id = $1', [documentId]);
    if (docResult.rows.length === 0) {
      return res.status(404).json({ error: 'Dokument hittades inte' });
    }

    const summary = await aiStudyHelper.generateStudySummary(docResult.rows[0].extracted_text);

    res.json({ documentId, summary });
  } catch (error) {
    console.error('Summary generation error:', error);
    res.status(500).json({ error: error.message || 'Kunde inte generera sammanfattning' });
  }
});

// POST /api/study/bionic - Omvandla text till bionic reading
router.post('/bionic', (req, res) => {
  try {
    const { text, level = 'medium' } = req.body;
    if (!text) return res.status(400).json({ error: 'text krävs' });

    const bionicHtml = aiStudyHelper.convertToBionicReading(text, level);
    res.json({ bionicHtml });
  } catch (error) {
    console.error('Bionic conversion error:', error);
    res.status(500).json({ error: 'Kunde inte konvertera text' });
  }
});

// POST /api/study/progress - Uppdatera studieframsteg
router.post('/progress', async (req, res) => {
  try {
    const { documentId, xpEarned, studyTime, flashcardsMastered, quizScore } = req.body;
    if (!documentId) return res.status(400).json({ error: 'documentId krävs' });

    const pool = req.app.locals.pool;

    // Hämta eller skapa progresspost
    let progress = await pool.query(
      'SELECT * FROM student_progress WHERE document_id = $1', [documentId]
    );

    const today = new Date().toISOString().split('T')[0];

    if (progress.rows.length === 0) {
      await pool.query(
        `INSERT INTO student_progress (document_id, xp_earned, total_study_time, last_study_date, study_streak)
         VALUES ($1, $2, $3, $4, 1)`,
        [documentId, xpEarned || 0, studyTime || 0, today]
      );
    } else {
      const existing = progress.rows[0];
      const lastDate = existing.last_study_date
        ? new Date(existing.last_study_date).toISOString().split('T')[0]
        : null;

      let newStreak = existing.study_streak || 0;
      if (lastDate) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        if (lastDate === yesterdayStr) {
          newStreak += 1;
        } else if (lastDate !== today) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      const updates = [];
      const values = [];
      let paramIndex = 1;

      if (xpEarned) {
        updates.push(`xp_earned = xp_earned + $${paramIndex++}`);
        values.push(xpEarned);
      }
      if (studyTime) {
        updates.push(`total_study_time = total_study_time + $${paramIndex++}`);
        values.push(studyTime);
      }
      if (flashcardsMastered) {
        updates.push(`flashcards_mastered = flashcards_mastered + $${paramIndex++}`);
        values.push(flashcardsMastered);
      }
      if (quizScore !== undefined) {
        updates.push(`quizzes_completed = quizzes_completed + 1`);
        updates.push(`best_quiz_score = GREATEST(best_quiz_score, $${paramIndex++})`);
        values.push(quizScore);
      }

      updates.push(`last_study_date = $${paramIndex++}`);
      values.push(today);
      updates.push(`study_streak = $${paramIndex++}`);
      values.push(newStreak);
      updates.push(`updated_at = NOW()`);

      values.push(documentId);

      await pool.query(
        `UPDATE student_progress SET ${updates.join(', ')} WHERE document_id = $${paramIndex}`,
        values
      );
    }

    const updatedProgress = await pool.query(
      'SELECT * FROM student_progress WHERE document_id = $1', [documentId]
    );

    res.json(updatedProgress.rows[0]);
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ error: 'Kunde inte uppdatera framsteg' });
  }
});

// GET /api/study/progress/:documentId - Hämta framsteg
router.get('/progress/:documentId', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const result = await pool.query(
      'SELECT * FROM student_progress WHERE document_id = $1',
      [req.params.documentId]
    );

    if (result.rows.length === 0) {
      return res.json({
        xp_earned: 0,
        study_streak: 0,
        total_study_time: 0,
        flashcards_mastered: 0,
        quizzes_completed: 0,
        best_quiz_score: 0
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({ error: 'Kunde inte hämta framsteg' });
  }
});

// GET /api/study/documents - Lista alla uppladdade dokument
router.get('/documents', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const result = await pool.query(
      `SELECT d.id, d.original_filename, d.file_type, d.word_count, d.uploaded_at,
              sp.xp_earned, sp.study_streak, sp.total_study_time
       FROM documents d
       LEFT JOIN student_progress sp ON d.id = sp.document_id
       ORDER BY d.uploaded_at DESC
       LIMIT 50`
    );
    res.json(result.rows);
  } catch (error) {
    console.error('List documents error:', error);
    res.status(500).json({ error: 'Kunde inte hämta dokument' });
  }
});

module.exports = router;
