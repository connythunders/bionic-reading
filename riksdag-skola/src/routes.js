const express = require('express');
const rateLimit = require('express-rate-limit');
const db = require('./db');
const scheduler = require('./scheduler');
const mailer = require('./mailer');
const riksdag = require('./riksdag');

const router = express.Router();

// Rate limiter for subscribe endpoint
const subscribeLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: { error: 'För många förfrågningar. Försök igen senare.' },
  standardHeaders: true,
  legacyHeaders: false
});

// GET /api/documents - List documents (paginated, filterable)
router.get('/api/documents', (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const type = req.query.type || null;
    const year = req.query.year || null;

    const result = db.getDocuments({ page, limit, type, year });
    res.json(result);
  } catch (err) {
    console.error('Fel vid hämtning av dokument:', err.message);
    res.status(500).json({ error: 'Kunde inte hämta dokument.' });
  }
});

// GET /api/documents/:id - Single document
router.get('/api/documents/:id', (req, res) => {
  try {
    const doc = db.getDocumentById(req.params.id);
    if (!doc) {
      return res.status(404).json({ error: 'Dokumentet hittades inte.' });
    }
    res.json(doc);
  } catch (err) {
    console.error('Fel vid hämtning av dokument:', err.message);
    res.status(500).json({ error: 'Kunde inte hämta dokumentet.' });
  }
});

// GET /api/stats - Statistics
router.get('/api/stats', (req, res) => {
  try {
    const stats = db.getStats();
    res.json(stats);
  } catch (err) {
    console.error('Fel vid hämtning av statistik:', err.message);
    res.status(500).json({ error: 'Kunde inte hämta statistik.' });
  }
});

// POST /api/subscribe - Subscribe to notifications
router.post('/api/subscribe', subscribeLimiter, async (req, res) => {
  try {
    const { email, frequency } = req.body;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'E-postadress krävs.' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: 'Ogiltig e-postadress.' });
    }

    const validFrequencies = ['immediate', 'daily', 'weekly'];
    const freq = validFrequencies.includes(frequency) ? frequency : 'immediate';

    const result = db.addSubscriber(email.trim().toLowerCase(), freq);

    if (!result.success) {
      return res.status(409).json({ error: result.error });
    }

    // Send confirmation email (double opt-in)
    await mailer.sendConfirmation({
      email: email.trim().toLowerCase(),
      confirmToken: result.confirmToken
    });

    res.json({
      message: 'Tack! Vi har skickat ett bekräftelsemejl till din e-postadress. Klicka på länken i mejlet för att aktivera prenumerationen.'
    });
  } catch (err) {
    console.error('Fel vid prenumeration:', err.message);
    res.status(500).json({ error: 'Kunde inte registrera prenumeration.' });
  }
});

// GET /api/confirm/:token - Confirm subscription (double opt-in)
router.get('/api/confirm/:token', (req, res) => {
  try {
    const success = db.confirmSubscriber(req.params.token);
    if (success) {
      res.redirect('/?confirmed=1');
    } else {
      res.redirect('/?confirmed=0');
    }
  } catch (err) {
    console.error('Fel vid bekräftelse:', err.message);
    res.status(500).json({ error: 'Kunde inte bekräfta prenumeration.' });
  }
});

// POST /api/unsubscribe/:token - Unsubscribe
router.post('/api/unsubscribe/:token', (req, res) => {
  try {
    const success = db.unsubscribe(req.params.token);
    if (success) {
      res.json({ message: 'Du har avprenumererats.' });
    } else {
      res.status(404).json({ error: 'Ogiltig avprenumerationslänk.' });
    }
  } catch (err) {
    console.error('Fel vid avprenumeration:', err.message);
    res.status(500).json({ error: 'Kunde inte avprenumerera.' });
  }
});

// Also support GET for unsubscribe (from email links)
router.get('/api/unsubscribe/:token', (req, res) => {
  try {
    const success = db.unsubscribe(req.params.token);
    if (success) {
      res.redirect('/?unsubscribed=1');
    } else {
      res.redirect('/?unsubscribed=0');
    }
  } catch (err) {
    console.error('Fel vid avprenumeration:', err.message);
    res.status(500).json({ error: 'Kunde inte avprenumerera.' });
  }
});

// POST /api/refresh - Manual refresh (protected with key)
router.post('/api/refresh', async (req, res) => {
  try {
    const key = req.headers['x-key'] || req.query.key;
    const refreshKey = process.env.REFRESH_KEY;

    if (refreshKey && key !== refreshKey) {
      return res.status(403).json({ error: 'Ogiltig nyckel.' });
    }

    const result = await scheduler.refreshDocuments();
    res.json(result);
  } catch (err) {
    console.error('Fel vid manuell uppdatering:', err.message);
    res.status(500).json({ error: 'Kunde inte uppdatera dokument.' });
  }
});

// GET /feed.xml - RSS feed
router.get('/feed.xml', (req, res) => {
  try {
    const { documents } = db.getDocuments({ page: 1, limit: 50 });
    const baseUrl = process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

    const items = documents.map(doc => `
    <item>
      <title>${escapeXml(doc.title)}</title>
      <link>${escapeXml(doc.url)}</link>
      <description>${escapeXml(doc.summary || doc.subtitle || '')}</description>
      <pubDate>${doc.date ? new Date(doc.date).toUTCString() : ''}</pubDate>
      <guid isPermaLink="false">${escapeXml(doc.id)}</guid>
      <category>${escapeXml(doc.type || '')}</category>
    </item>`).join('\n');

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Riksdagsbevakaren - Skola &amp; Utbildning</title>
    <link>${baseUrl}</link>
    <description>Riksdagsdokument om skola och utbildning</description>
    <language>sv</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

    res.set('Content-Type', 'application/rss+xml; charset=utf-8');
    res.send(rss);
  } catch (err) {
    console.error('Fel vid generering av RSS:', err.message);
    res.status(500).send('Kunde inte generera RSS-flöde.');
  }
});

function escapeXml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

module.exports = router;
