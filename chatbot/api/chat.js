import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load chunks once at cold start
let chunks;
function getChunks() {
  if (!chunks) {
    const p = join(__dirname, '..', 'data', 'chunks.json');
    chunks = JSON.parse(readFileSync(p, 'utf-8'));
  }
  return chunks;
}

// Score a chunk against query keywords (simple TF overlap)
function scoreChunk(chunk, queryTokens) {
  const text = (chunk.heading + ' ' + chunk.text).toLowerCase();
  let score = 0;
  for (const tok of queryTokens) {
    if (tok.length < 3) continue;
    const re = new RegExp(tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = text.match(re);
    if (matches) score += matches.length;
  }
  return score;
}

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?;:()"]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 3);
}

function retrieveRelevantChunks(query, topK = 8) {
  const tokens = tokenize(query);
  const allChunks = getChunks();

  const scored = allChunks.map(c => ({ chunk: c, score: scoreChunk(c, tokens) }));
  scored.sort((a, b) => b.score - a.score);

  // Always include at least topK chunks, but also ensure both docs are represented
  const top = scored.slice(0, topK);

  // If all top chunks are from one doc and there are relevant chunks from the other, add some
  const docs = new Set(top.map(t => t.chunk.doc_label));
  if (docs.size === 1 && scored.length > topK) {
    const otherDoc = scored.find(s => s.chunk.doc_label !== [...docs][0]);
    if (otherDoc && otherDoc.score > 0) {
      top.push(otherDoc);
    }
  }

  return top.map(t => t.chunk);
}

function buildSystemPrompt(relevantChunks) {
  const contextBlocks = relevantChunks.map(c =>
    `[${c.id}] ${c.doc_name} – avsnitt: ${c.heading} (del ${c.position})\n${c.text}`
  ).join('\n\n---\n\n');

  return `Du är en hjälpsam assistent som UTESLUTANDE svarar utifrån nedanstående dokumentavsnitt. Du får ALDRIG använda din allmänna kunskap eller lägga till information som inte finns i texterna nedan.

STRIKTA REGLER:
1. Svara BARA utifrån de givna dokumentavsnitten.
2. Om svaret inte finns i materialet: skriv tydligt att det inte framgår av dokumenten. Lämna då sources-listan tom.
3. KÄLLHÄNVISNINGAR: Ange exakt chunk-ID (t.ex. DOK1-003), dokumentnamn, avsnittsrubrik och ett ordagrant citat (max 15 ord) som stöd. Hitta aldrig på citat eller sidnummer.
4. FÖLJDFRÅGOR: Föreslå 2–3 följdfrågor som faktiskt går att besvara utifrån dokumenten.
5. Svara på svenska, sakligt och pedagogiskt.
6. Returnera ALLTID ett giltigt JSON-objekt med exakt dessa fält:
   {
     "answer": "ditt svar här",
     "sources": [
       {
         "dokument": "dokumentnamn",
         "chunk_id": "t.ex. DOK1-003",
         "avsnitt": "avsnittsrubrik",
         "citat": "ordagrant citat max 15 ord"
       }
     ],
     "follow_up_questions": ["fråga 1", "fråga 2", "fråga 3"]
   }
   Returnera ENBART JSON, inga förklaringar utanför JSON-objektet.

DOKUMENTAVSNITT SOM DU FÅR ANVÄNDA:
---
${contextBlocks}
---`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body;
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Meddelande saknas' });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API-nyckel saknas på servern' });
  }

  try {
    const relevantChunks = retrieveRelevantChunks(message, 8);
    const systemPrompt = buildSystemPrompt(relevantChunks);

    const client = new Anthropic({ apiKey });

    // Build messages from history + current
    const messages = [
      ...history.map(m => ({ role: m.role, content: m.content })),
      { role: 'user', content: message }
    ];

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 2000,
      system: systemPrompt,
      messages
    });

    const rawText = response.content[0].text.trim();

    // Parse JSON safely
    let parsed;
    try {
      // Strip markdown code fences if present
      const cleaned = rawText.replace(/^```json?\s*/i, '').replace(/\s*```$/,'');
      parsed = JSON.parse(cleaned);
    } catch {
      // If JSON parsing fails, return raw text in answer field
      parsed = {
        answer: rawText,
        sources: [],
        follow_up_questions: []
      };
    }

    return res.status(200).json({
      answer: parsed.answer || '',
      sources: Array.isArray(parsed.sources) ? parsed.sources : [],
      follow_up_questions: Array.isArray(parsed.follow_up_questions) ? parsed.follow_up_questions : [],
      chunks_used: relevantChunks.map(c => c.id)
    });

  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: 'Serverfel: ' + err.message });
  }
}
