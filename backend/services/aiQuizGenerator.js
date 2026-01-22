const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIQuizGenerator {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Genererar quiz-frågor från text med Google Gemini AI
   * @param {string} text - Text att skapa quiz från
   * @param {number} questionCount - Antal frågor (standard: 25)
   * @returns {Promise<Array>} - Array av quiz-frågor
   */
  async generateQuiz(text, questionCount = 25) {
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

FORMAT (strikt JSON):
Returnera ENDAST en JSON-array med frågor enligt följande format. Ingen annan text före eller efter JSON:

[
  {
    "question": "Tydlig fråga här?",
    "options": ["Alternativ A", "Alternativ B", "Alternativ C", "Alternativ D"],
    "correct": 0,
    "topic": "Huvudtema",
    "difficulty": "easy"
  },
  {
    "question": "Nästa fråga?",
    "options": ["Alt 1", "Alt 2", "Alt 3", "Alt 4"],
    "correct": 2,
    "topic": "Annat tema",
    "difficulty": "medium"
  }
]

difficulty kan vara: "easy", "medium", eller "hard"
correct är index (0-3) för det korrekta svaret

TEXT ATT SKAPA QUIZ FRÅN:
${truncatedText}

Returnera ENDAST JSON-arrayen med exakt ${questionCount} frågor. Ingen annan text.`;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const content = response.text();

      const questions = this.parseQuestions(content, questionCount);

      return questions;
    } catch (error) {
      console.error('AI Quiz Generation Error:', error);
      throw new Error(`AI kunde inte generera quiz: ${error.message}`);
    }
  }

  /**
   * Parsar och validerar quiz-frågor från AI-svar
   * @param {string} content - AI-svar
   * @param {number} expectedCount - Förväntat antal frågor
   * @returns {Array} - Validerade quiz-frågor
   */
  parseQuestions(content, expectedCount) {
    try {
      // Extrahera JSON från svaret
      // Ta bort eventuella markdown code blocks
      let cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '');

      // Försök först hitta JSON direkt
      let jsonMatch = cleanedContent.match(/\[[\s\S]*\]/);

      if (!jsonMatch) {
        // Om ingen JSON hittas, kasta fel
        throw new Error('Inget giltigt JSON-format hittades i AI-svaret');
      }

      const questions = JSON.parse(jsonMatch[0]);

      // Validera att det är en array
      if (!Array.isArray(questions)) {
        throw new Error('Svaret är inte en array');
      }

      // Validera antal frågor
      if (questions.length !== expectedCount) {
        console.warn(`Förväntade ${expectedCount} frågor, fick ${questions.length}`);
      }

      // Validera varje fråga
      questions.forEach((q, i) => {
        if (!q.question || typeof q.question !== 'string') {
          throw new Error(`Fråga ${i + 1}: Saknar eller ogiltig 'question'`);
        }
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          throw new Error(`Fråga ${i + 1}: Måste ha exakt 4 options`);
        }
        if (typeof q.correct !== 'number' || q.correct < 0 || q.correct > 3) {
          throw new Error(`Fråga ${i + 1}: 'correct' måste vara 0-3`);
        }
        if (!q.topic || typeof q.topic !== 'string') {
          throw new Error(`Fråga ${i + 1}: Saknar eller ogiltig 'topic'`);
        }
        if (!q.difficulty || !['easy', 'medium', 'hard'].includes(q.difficulty)) {
          // Sätt default om saknas
          q.difficulty = 'medium';
        }
      });

      return questions;
    } catch (error) {
      console.error('Question parsing error:', error);
      throw new Error(`Kunde inte tolka quiz-frågor: ${error.message}`);
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
