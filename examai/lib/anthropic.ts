import Anthropic from '@anthropic-ai/sdk'
import type { Question, Answer, Level } from './types'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const MODEL = 'claude-sonnet-4-20250514'

interface RawQuestion {
  text: string
  level: Level
  points: number
}

function parseQuestionsFromText(raw: string): RawQuestion[] {
  try {
    const match = raw.match(/\[[\s\S]*\]/)
    if (!match) return []
    return JSON.parse(match[0]) as RawQuestion[]
  } catch {
    return []
  }
}

export async function generateQuestionsFromTopic(
  topic: string,
  subject: string,
  levels: Level[]
): Promise<Omit<Question, 'id' | 'exam_id' | 'order_index'>[]> {
  const levelsStr = levels.join(', ')
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `Du är en erfaren svensk gymnasielärare i ${subject}.
Generera provfrågor om ämnet "${topic}" för betygsnivåerna: ${levelsStr}.
Skapa 3–4 frågor per nivå (E = grundläggande, C = tillämpande, A = analyserande).
Svara ENBART med ett JSON-array i exakt detta format:
[
  { "text": "frågetext", "level": "E", "points": 1 },
  { "text": "frågetext", "level": "C", "points": 2 },
  { "text": "frågetext", "level": "A", "points": 3 }
]
Inga kommentarer, ingen annan text, bara JSON.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') return []
  const raw = parseQuestionsFromText(content.text)
  return raw.map((q, i) => ({ text: q.text, level: q.level, points: q.points }))
}

export async function generateQuestionsFromText(
  text: string,
  subject: string
): Promise<Omit<Question, 'id' | 'exam_id' | 'order_index'>[]> {
  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `Du är en erfaren svensk gymnasielärare i ${subject}.
Baserat på följande text, generera provfrågor för betygsnivåerna E, C och A.
Skapa 3 frågor per nivå (totalt 9 frågor).

TEXT:
${text.slice(0, 4000)}

Svara ENBART med ett JSON-array i exakt detta format:
[
  { "text": "frågetext", "level": "E", "points": 1 },
  { "text": "frågetext", "level": "C", "points": 2 },
  { "text": "frågetext", "level": "A", "points": 3 }
]
Inga kommentarer, ingen annan text, bara JSON.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') return []
  const raw = parseQuestionsFromText(content.text)
  return raw.map((q) => ({ text: q.text, level: q.level, points: q.points }))
}

export async function selectNextAdaptiveQuestion(
  previousAnswers: Array<{ question: Question; answer: Answer }>,
  remainingQuestions: Question[]
): Promise<Question | null> {
  if (remainingQuestions.length === 0) return null
  if (previousAnswers.length === 0) {
    return remainingQuestions.find((q) => q.level === 'E') ?? remainingQuestions[0]
  }

  const historyText = previousAnswers
    .map(
      ({ question, answer }) =>
        `Fråga (nivå ${question.level}): ${question.text}\nSvar: ${answer.text} (${answer.word_count} ord)`
    )
    .join('\n\n')

  const remainingText = remainingQuestions
    .map((q, i) => `${i}: [${q.level}] ${q.text}`)
    .join('\n')

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 64,
    messages: [
      {
        role: 'user',
        content: `Baserat på elevens tidigare svar, välj nästa lämpliga fråga.

TIDIGARE SVAR:
${historyText}

TILLGÄNGLIGA FRÅGOR (index: nivå text):
${remainingText}

Svara ENBART med ett heltal (index i listan ovan). Ingen annan text.`,
      },
    ],
  })

  const content = message.content[0]
  if (content.type !== 'text') return remainingQuestions[0]
  const idx = parseInt(content.text.trim(), 10)
  if (isNaN(idx) || idx < 0 || idx >= remainingQuestions.length) return remainingQuestions[0]
  return remainingQuestions[idx]
}
