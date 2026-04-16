/**
 * chat.js – Express-router för /api/chat
 *
 * POST /api/chat
 *   body:    { message: string }
 *   returns: { answer: string, sources: Array<{title,url}> }
 */

const express = require('express');
const contentSearch = require('../services/contentSearch');
const aiChatbot = require('../services/aiChatbot');

const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body || {};

  if (typeof message !== 'string') {
    return res.status(400).json({ error: 'Fältet "message" måste vara en sträng' });
  }
  const trimmed = message.trim();
  if (trimmed.length < 1) {
    return res.status(400).json({ error: 'Frågan får inte vara tom' });
  }
  if (trimmed.length > 500) {
    return res.status(400).json({ error: 'Frågan är för lång (max 500 tecken)' });
  }

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({
      error: 'Chatten är inte konfigurerad (GEMINI_API_KEY saknas på servern).'
    });
  }

  try {
    const chunks = contentSearch.search(trimmed, 5);
    const { answer, sources } = await aiChatbot.answer(trimmed, chunks);
    res.json({ answer, sources });
  } catch (err) {
    console.error('[/api/chat] fel:', err.message);
    res.status(500).json({ error: 'Något gick fel när svaret genererades.' });
  }
});

// Hälsokoll – praktiskt för debug
router.get('/health', (req, res) => {
  res.json({
    ready: contentSearch.isReady(),
    hasApiKey: Boolean(process.env.GEMINI_API_KEY)
  });
});

module.exports = router;
