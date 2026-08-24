const Anthropic = require('@anthropic-ai/sdk');
const { z } = require('zod/v4');
const { zodOutputFormat } = require('@anthropic-ai/sdk/helpers/zod');

const MODEL = 'claude-opus-5';

const QuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correct: z.number().int().min(0).max(3),
  topic: z.string(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

class AIQuizGenerator {
  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY;
    this.enabled = Boolean(this.apiKey && this.apiKey !== 'your_api_key_here');

    if (this.enabled) {
      this.client = new Anthropic({ apiKey: this.apiKey });
    }
  }

  /**
   * Genererar quiz-frågor från text med Claude
   * @param {string} text - Text att skapa quiz från
   * @param {number} questionCount - Antal frågor (standard: 25)
   * @returns {Promise<Array>} - Array av quiz-frågor
   */
  async generateQuiz(text, questionCount = 25) {
    if (!this.enabled) {
      throw new Error('AI är inte konfigurerad på servern (ANTHROPIC_API_KEY saknas)');
    }

    // Begränsa textlängd för att undvika token limits
    const maxChars = 50000;
    const truncatedText = text.substring(0, maxChars);

    const prompt = `Du är en expert pedagogisk assistent specialiserad på att skapa engagerande och pedagogiska quiz-frågor för elever i årskurs 7-9.

Baserat på följande text, skapa exakt ${questionCount} flervalsfrågor för att testa förståelsen av materialet.

KRAV:
1. Varje fråga ska ha exakt 4 svarsalternativ
2. Endast ett alternativ är korrekt
3. Frågorna ska täcka olika delar av texten
4. Variera svårighetsgraden (30% lätt, 50% medel, 20% svår)
5. Frågor ska vara tydliga och otvetydiga
6. Undvik trick-frågor
7. Fokusera på faktakunskap och förståelse, inte obscura detaljer

TOPICS: Identifiera 5-7 huvudteman i texten och fördela frågorna jämnt mellan dessa teman.

correct är index (0-3) för det korrekta svaret bland options.

TEXT ATT SKAPA QUIZ FRÅN:
${truncatedText}

Skapa exakt ${questionCount} frågor enligt kraven ovan.`;

    try {
      const response = await this.client.messages.parse({
        model: MODEL,
        max_tokens: 16000,
        messages: [{ role: 'user', content: prompt }],
        output_config: {
          format: zodOutputFormat(z.object({ questions: z.array(QuestionSchema).length(questionCount) })),
        },
      });

      if (!response.parsed_output) {
        throw new Error('Kunde inte tolka AI-svaret');
      }

      return response.parsed_output.questions;
    } catch (error) {
      console.error('AI Quiz Generation Error:', error);
      throw new Error(`AI kunde inte generera quiz: ${error.message}`);
    }
  }

  /**
   * Analyserar text för att ge statistik
   * @param {string} text
   * @returns {Object}
   */
  analyzeText(text) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    return {
      wordCount: words.length,
      sentenceCount: sentences.length,
      averageWordsPerSentence: Math.round(words.length / sentences.length),
      characterCount: text.length
    };
  }
}

module.exports = new AIQuizGenerator();
