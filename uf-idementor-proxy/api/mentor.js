import Anthropic from '@anthropic-ai/sdk';

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://bionicreading.se';
const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 700;
const MAX_MESSAGES = 40;
const MAX_MESSAGE_LENGTH = 4000;
const MAX_SYSTEM_LENGTH = 6000;

function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

export default async function handler(req, res) {
  setCors(res);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { system, messages } = req.body || {};

  if (typeof system !== 'string' || !system.trim() || system.length > MAX_SYSTEM_LENGTH) {
    return res.status(400).json({ error: 'Ogiltig systemprompt' });
  }
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: 'Ogiltig konversation' });
  }
  for (const m of messages) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant') || typeof m.content !== 'string' || m.content.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({ error: 'Ogiltigt meddelandeformat' });
    }
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API-nyckel saknas på servern' });
  }

  try {
    const client = new Anthropic({ apiKey });

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system,
      messages
    });

    const answer = (response.content || []).map(c => c.text || '').join('\n').trim();

    return res.status(200).json({ answer });
  } catch (err) {
    console.error('UF-idémentor proxy error:', err);
    return res.status(500).json({ error: 'Serverfel: ' + err.message });
  }
}
