// Metodbok EMI – API-proxy för "Fråga metodboken".
//
// Syfte: hålla Anthropic-nyckeln server-side så att ingen användare behöver en egen
// nyckel och nyckeln aldrig ligger i klientkoden. Distribueras som en Vercel
// serverless-funktion (Node). Nyckeln sätts som miljövariabeln ANTHROPIC_API_KEY
// i Vercels dashboard – aldrig i koden.
//
// Endpoint: POST /api/chat
// Body (samma form som metodboken redan skickar):
//   { model, max_tokens, system, messages }
// Svar: vidarebefordrar Anthropics svar oförändrat (så klienten kan läsa data.content).

// Tillåtna ursprung (CORS). Lägg till fler domäner vid behov.
const ALLOWED_ORIGINS = [
  'https://bionicreading.se',
  'https://www.bionicreading.se'
];

// Lås modell och storlek server-side så proxyn inte kan missbrukas till godtyckliga,
// dyra anrop. Klientens önskemål vägs in men kan inte överstiga taket.
const ALLOWED_MODELS = new Set(['claude-sonnet-4-6', 'claude-haiku-4-5-20251001']);
const DEFAULT_MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS_CAP = 1200;
const MAX_MESSAGES = 12;
const MAX_BODY_BYTES = 60 * 1024; // metodbokens system-prompt är ~15 kB; 60 kB ger marginal

// Enkel best-effort rate limit per IP (återställs vid cold start – inte vattentätt,
// men höjer tröskeln för missbruk utan extern beroende-tjänst).
const RATE = { windowMs: 60 * 1000, max: 20 };
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.start > RATE.windowMs) {
    hits.set(ip, { start: now, count: 1 });
    return false;
  }
  rec.count += 1;
  return rec.count > RATE.max;
}

function setCors(res, origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
}

module.exports = async (req, res) => {
  const origin = req.headers.origin || '';
  setCors(res, origin);

  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: { message: 'Endast POST stöds.' } }); return; }

  // Blockera anrop från andra webbplatsers webbläsare (skyddar inte mot rena skript,
  // men hindrar att andra sajter använder proxyn).
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    res.status(403).json({ error: { message: 'Otillåtet ursprung.' } });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: { message: 'Servern saknar ANTHROPIC_API_KEY. Sätt den i Vercels miljövariabler.' } });
    return;
  }

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    res.status(429).json({ error: { message: 'För många frågor just nu. Vänta en stund och försök igen.' } });
    return;
  }

  try {
    const body = req.body && typeof req.body === 'object' ? req.body : JSON.parse(req.body || '{}');
    if (JSON.stringify(body).length > MAX_BODY_BYTES) {
      res.status(413).json({ error: { message: 'Förfrågan är för stor.' } });
      return;
    }

    const messages = Array.isArray(body.messages) ? body.messages.slice(-MAX_MESSAGES) : [];
    if (!messages.length) {
      res.status(400).json({ error: { message: 'Inga meddelanden att besvara.' } });
      return;
    }

    const model = ALLOWED_MODELS.has(body.model) ? body.model : DEFAULT_MODEL;
    const maxTokens = Math.min(Number(body.max_tokens) || 1000, MAX_TOKENS_CAP);

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model,
        max_tokens: maxTokens,
        system: body.system,           // metodbokens system-prompt (med cache_control) skickas av klienten
        messages
      })
    });

    const data = await upstream.json().catch(() => ({}));
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(500).json({ error: { message: 'Internt fel i proxyn.' } });
  }
};
